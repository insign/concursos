import { resolutionRoute, type ResolutionArticleRequest } from './resolution-routes';

declare global {
  interface Window {
    concursosRenderResolutionMermaid?: (root: HTMLElement) => Promise<void>;
  }
}

interface ResolutionDocumentCache {
  articles: Map<string, HTMLElement>;
}

const documentCache = new Map<string, Promise<ResolutionDocumentCache>>();
const mermaidRuntimeCache = new Map<string, Promise<(root: HTMLElement) => Promise<void>>>();

async function fetchResolutionDocument(
  contestStorageId: string,
  subjectStorageId: string,
): Promise<ResolutionDocumentCache> {
  const url = resolutionRoute(contestStorageId, subjectStorageId);
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Não foi possível carregar a resolução (${response.status}).`);

  const document = new DOMParser().parseFromString(await response.text(), 'text/html');
  const container = document.querySelector<HTMLElement>('[data-resolution-document]');
  if (!container) throw new Error('Documento de resolução inválido.');

  const runtimeMarker = document.querySelector<HTMLMetaElement>('[data-resolution-mermaid-runtime]');
  const runtimeScript = runtimeMarker?.nextElementSibling?.matches('script[src]')
    ? runtimeMarker.nextElementSibling as HTMLScriptElement
    : null;
  const runtimeSource = runtimeScript?.getAttribute('src');
  const mermaidRuntimeSource = runtimeSource
    ? new URL(runtimeSource, window.location.href).href
    : null;

  const articles = new Map<string, HTMLElement>();
  const referencesBlock = container.querySelector<HTMLElement>('[data-document-references]');
  referencesBlock?.querySelectorAll('script').forEach((script) => script.remove());
  container.querySelectorAll<HTMLElement>('article[data-resolution-question-id]').forEach((article) => {
    article.querySelectorAll('script').forEach((script) => script.remove());
    if (mermaidRuntimeSource) article.dataset.resolutionMermaidSrc = mermaidRuntimeSource;
    if (referencesBlock) article.appendChild(referencesBlock.cloneNode(true));
    const questionId = article.dataset.resolutionQuestionId;
    if (questionId) articles.set(questionId, article);
  });
  return { articles };
}

function cachedResolutionDocument(contestStorageId: string, subjectStorageId: string): Promise<ResolutionDocumentCache> {
  const key = resolutionRoute(contestStorageId, subjectStorageId);
  const cached = documentCache.get(key);
  if (cached) return cached;
  const pending = fetchResolutionDocument(contestStorageId, subjectStorageId).catch((error) => {
    documentCache.delete(key);
    throw error;
  });
  documentCache.set(key, pending);
  return pending;
}

export async function loadResolutionArticle(request: ResolutionArticleRequest): Promise<HTMLElement> {
  const document = await cachedResolutionDocument(request.contestStorageId, request.subjectStorageId);
  const article = document.articles.get(request.questionId);
  if (!article) throw new Error('Esta questão não possui resolução passo a passo.');

  const revision = Number(article.dataset.resolutionQuestionRevision);
  if (!Number.isInteger(revision) || revision !== request.questionRevision) {
    throw new Error('A resolução não corresponde à revisão atual desta questão.');
  }
  return article;
}

async function loadResolutionMermaidRuntime(
  source: string,
): Promise<(root: HTMLElement) => Promise<void>> {
  const cached = mermaidRuntimeCache.get(source);
  if (cached) return cached;

  const pending = import(/* @vite-ignore */ source).then(() => {
    const renderer = window.concursosRenderResolutionMermaid;
    if (!renderer) throw new Error('Runtime Mermaid da resolução indisponível.');
    return renderer;
  }).catch((error) => {
    mermaidRuntimeCache.delete(source);
    throw error;
  });
  mermaidRuntimeCache.set(source, pending);
  return pending;
}

export async function renderResolutionMermaid(root: HTMLElement, runtimeSource: string): Promise<void> {
  const diagrams = [...root.querySelectorAll<HTMLElement>('pre.mermaid')];
  if (diagrams.length === 0) return;
  if (!runtimeSource) throw new Error('Runtime Mermaid da resolução indisponível.');
  const sourceUrl = new URL(runtimeSource, window.location.href);
  if (sourceUrl.origin !== window.location.origin) throw new Error('Runtime Mermaid externo bloqueado.');
  const renderer = await loadResolutionMermaidRuntime(sourceUrl.href);
  await renderer(root);
}

function markMermaidRenderFailure(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>('pre.mermaid').forEach((diagram) => {
    diagram.dataset.processed = 'true';
    diagram.dataset.renderStatus = 'error';
  });
}

export interface ResolutionDialogController {
  open(request: ResolutionArticleRequest, trigger: HTMLButtonElement): Promise<void>;
}

export function createResolutionDialog(root: ParentNode): ResolutionDialogController | null {
  const dialog = root.querySelector<HTMLDialogElement>('[data-resolution-dialog]');
  const closeButton = root.querySelector<HTMLButtonElement>('[data-resolution-close]');
  const title = root.querySelector<HTMLElement>('[data-resolution-title]');
  const status = root.querySelector<HTMLElement>('[data-resolution-status]');
  const content = root.querySelector<HTMLElement>('[data-resolution-content]');
  if (!dialog || !closeButton || !title || !status || !content) return null;

  let trigger: HTMLButtonElement | null = null;
  let requestVersion = 0;

  const reset = () => {
    // A close followed immediately by showModal can queue the old close event after
    // the new dialog is open. Only reset state for an actually closed dialog.
    if (dialog.open) return;
    content.replaceChildren();
    status.hidden = true;
    status.textContent = '';
    const previousTrigger = trigger;
    trigger = null;
    previousTrigger?.focus();
  };

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', reset);

  return {
    async open(request, nextTrigger) {
      requestVersion += 1;
      const version = requestVersion;
      if (dialog.open) dialog.close();
      trigger = nextTrigger;
      title.textContent = 'Resolução passo a passo';
      content.replaceChildren();
      status.hidden = false;
      status.textContent = 'Carregando resolução…';
      dialog.showModal();
      closeButton.focus();

      try {
        const article = await loadResolutionArticle(request);
        if (version !== requestVersion || !dialog.open) return;
        content.replaceChildren(document.importNode(article, true));
        const runtimeSource = content.querySelector<HTMLElement>('article')?.dataset.resolutionMermaidSrc ?? '';
        try {
          await renderResolutionMermaid(content, runtimeSource);
        } catch {
          // The article remains readable as Mermaid source when its lazy runtime is unavailable.
          markMermaidRenderFailure(content);
        }
        if (version === requestVersion && dialog.open) {
          status.hidden = true;
          status.textContent = '';
        }
      } catch (error) {
        if (version !== requestVersion || !dialog.open) return;
        status.hidden = false;
        const offline = error instanceof TypeError || (typeof navigator !== 'undefined' && !navigator.onLine);
        status.textContent = offline
          ? 'Não foi possível carregar a resolução. Baixe ou atualize o concurso para uso offline.'
          : error instanceof Error
            ? error.message
            : 'Não foi possível carregar a resolução.';
      }
    },
  };
}
