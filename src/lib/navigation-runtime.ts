import { getActiveAlias } from './identity';
import { getNavigationRecord, saveNavigationDocument } from './navigation-db';
import {
  createNavigationDocument,
  navigationCatalogSchema,
  navigationFingerprint,
  normalizeTextQuote,
  type NavigationCatalog,
  type NavigationCatalogEntry,
  type NavigationContext,
  type NavigationDocument,
  type ReadingPosition,
} from './navigation';
import { bootstrapNavigation } from './navigation-sync';
import { requestNavigationProfileSync } from './simulados-profile-sync';

const BLOCK_SELECTOR = 'h1,h2,h3,h4,h5,h6,p,li,pre,blockquote,table,figure';
const SESSION_PREFIX = 'concursos:navigation-restored:';
const CAPTURE_DEBOUNCE_MS = 800;
const PERIODIC_SYNC_MS = 30_000;
let started = false;

interface ReadingTarget {
  element: HTMLElement | null;
  relativeOffset: number;
  progress: number;
}

interface NavigationOfferElements {
  root: HTMLElement;
  message: HTMLElement;
  resume: HTMLButtonElement;
  stay: HTMLButtonElement;
}

function currentRoute(): string {
  return `${location.pathname}${location.search}`;
}

async function loadNavigationCatalog(): Promise<NavigationCatalog> {
  const response = await fetch('/navigation-catalog.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`Não foi possível carregar o catálogo de navegação: ${response.status}`);
  return navigationCatalogSchema.parse(await response.json());
}

function catalogEntryForRoute(catalog: NavigationCatalog, route: string): NavigationCatalogEntry | null {
  try {
    const pathname = new URL(route, location.origin).pathname;
    return catalog.routes.find((entry) => entry.route === pathname) ?? null;
  } catch {
    return null;
  }
}

function stableSlug(value: string): string {
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return normalized || 'bloco';
}

function readingBlocks(root: HTMLElement): HTMLElement[] {
  const blocks = Array.from(root.querySelectorAll<HTMLElement>(BLOCK_SELECTOR)).filter(
    (element) => normalizeTextQuote(element.textContent ?? '').length > 0,
  );
  let sectionId = 'inicio';
  let sectionOffset = 0;

  blocks.forEach((block, index) => {
    if (/^H[1-6]$/.test(block.tagName)) {
      sectionId = block.id || `secao-${stableSlug(block.textContent ?? '')}`;
      sectionOffset = 0;
    }
    const blockId = block.id || `${sectionId}-bloco-${sectionOffset}`;
    block.dataset.navigationSectionId = sectionId;
    block.dataset.navigationBlockId = blockId;
    block.dataset.navigationBlockIndex = String(index);
    sectionOffset += 1;
  });
  return blocks;
}

export function captureReadingPosition(root: HTMLElement): ReadingPosition | null {
  const blocks = readingBlocks(root);
  if (blocks.length === 0) return null;
  const anchorLine = Math.max(0, window.innerHeight * 0.3);
  let selected = blocks[0];
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const block of blocks) {
    const rect = block.getBoundingClientRect();
    if (rect.top <= anchorLine && rect.bottom >= anchorLine) {
      selected = block;
      bestDistance = 0;
      break;
    }
    const distance = Math.min(Math.abs(rect.top - anchorLine), Math.abs(rect.bottom - anchorLine));
    if (distance < bestDistance) {
      selected = block;
      bestDistance = distance;
    }
  }

  const rect = selected.getBoundingClientRect();
  const relativeOffset = rect.height > 0 ? Math.min(1, Math.max(0, (anchorLine - rect.top) / rect.height)) : 0;
  const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const navigationRoot = document.querySelector<HTMLElement>('[data-navigation-root]');

  return {
    contentVersion: navigationRoot?.dataset.navigationContentVersion ?? null,
    sectionId: selected.dataset.navigationSectionId ?? null,
    blockId: selected.dataset.navigationBlockId ?? null,
    blockIndex: Number(selected.dataset.navigationBlockIndex ?? 0),
    relativeOffset,
    textQuote: normalizeTextQuote(selected.textContent ?? ''),
    progress: Math.min(1, Math.max(0, window.scrollY / scrollable)),
  };
}

export function resolveReadingTarget(root: HTMLElement, position: ReadingPosition): ReadingTarget {
  const blocks = readingBlocks(root);
  let element = position.blockId
    ? blocks.find((block) => block.dataset.navigationBlockId === position.blockId) ?? null
    : null;

  if (!element && position.textQuote) {
    const quote = normalizeTextQuote(position.textQuote).toLocaleLowerCase('pt-BR');
    element =
      blocks.find((block) =>
        normalizeTextQuote(block.textContent ?? '').toLocaleLowerCase('pt-BR').includes(quote),
      ) ?? null;
  }

  if (!element && position.sectionId) {
    const sectionBlocks = blocks.filter((block) => block.dataset.navigationSectionId === position.sectionId);
    element =
      sectionBlocks.find((block) => Number(block.dataset.navigationBlockIndex) >= position.blockIndex) ??
      sectionBlocks.at(-1) ??
      null;
  }

  if (!element) element = blocks[position.blockIndex] ?? null;
  return { element, relativeOffset: position.relativeOffset, progress: position.progress };
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function waitForLayout(): Promise<void> {
  await Promise.race([document.fonts?.ready ?? Promise.resolve(), wait(1_500)]);
  const images = Array.from(document.images).filter((image) => !image.complete);
  await Promise.race([
    Promise.all(
      images.map(
        (image) =>
          new Promise<void>((resolve) => {
            image.addEventListener('load', () => resolve(), { once: true });
            image.addEventListener('error', () => resolve(), { once: true });
          }),
      ),
    ),
    wait(1_500),
  ]);
  await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
}

async function restoreReadingPosition(position: ReadingPosition | null): Promise<void> {
  if (!position) return;
  const root = document.querySelector<HTMLElement>('[data-navigation-content]');
  if (!root) return;
  await waitForLayout();
  const target = resolveReadingTarget(root, position);
  const scroll = () => {
    if (!target.element) {
      const scrollable = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      window.scrollTo({ top: scrollable * target.progress, behavior: 'auto' });
      return;
    }
    const rect = target.element.getBoundingClientRect();
    const top = window.scrollY + rect.top + rect.height * target.relativeOffset - window.innerHeight * 0.3;
    window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
  };
  scroll();
  await wait(250);
  scroll();
}

function checkedValue(name: string): string | null {
  return document.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value ?? null;
}

function visibleQuestionId(): string | null {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-question-id]'));
  if (cards.length === 0) return null;
  const anchorLine = window.innerHeight * 0.35;
  return (
    cards.find((card) => {
      const rect = card.getBoundingClientRect();
      return rect.top <= anchorLine && rect.bottom >= anchorLine;
    }) ?? cards[0]
  ).dataset.questionId ?? null;
}

function captureContext(entry: NavigationCatalogEntry): NavigationContext {
  const root = document.querySelector<HTMLElement>('[data-navigation-root]');
  const tab = root?.dataset.navigationTab ?? entry.activeTab;
  const origin = checkedValue('question-origin');
  const layout = checkedValue('question-layout');
  const shuffle = document.querySelector<HTMLInputElement>('[data-shuffle-questions]');
  return {
    contestStorageId: root?.dataset.navigationContest ?? entry.contestStorageId,
    groupId: root?.dataset.navigationGroup ?? null,
    subjectStorageId: root?.dataset.navigationSubject ?? entry.subjectStorageId,
    questionId: tab === 'questions' ? visibleQuestionId() : null,
    activeTab: tab as NavigationContext['activeTab'],
    readingMode: root?.dataset.navigationMode === 'reading' || entry.readingMode,
    questionOrigin: origin === 'all' || origin === 'authorial' || origin === 'previous_exam' ? origin : null,
    questionLayout: layout === 'single' || layout === 'ten' || layout === 'all' ? layout : null,
    shuffleQuestions: shuffle ? shuffle.checked : null,
  };
}

async function waitForQuestionnaire(): Promise<HTMLElement | null> {
  const root = document.querySelector<HTMLElement>('[data-questionnaire]');
  if (!root) return null;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (root.dataset.mounted === 'true') return root;
    await wait(50);
  }
  return root;
}

function applyRadio(name: string, value: string | null): void {
  if (!value) return;
  const input = document.querySelector<HTMLInputElement>(`input[name="${name}"][value="${value}"]`);
  if (!input || input.checked) return;
  input.checked = true;
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

async function restoreQuestionContext(context: NavigationContext): Promise<void> {
  if (context.activeTab !== 'questions') return;
  const questionnaire = await waitForQuestionnaire();
  if (!questionnaire) return;
  applyRadio('question-origin', context.questionOrigin);
  applyRadio('question-layout', context.questionLayout);
  const shuffle = questionnaire.querySelector<HTMLInputElement>('[data-shuffle-questions]');
  if (shuffle && context.shuffleQuestions !== null && shuffle.checked !== context.shuffleQuestions) {
    shuffle.checked = context.shuffleQuestions;
    shuffle.dispatchEvent(new Event('change', { bubbles: true }));
  }
  await wait(0);

  if (!context.questionId) return;
  const next = questionnaire.querySelector<HTMLButtonElement>('[data-next-questions]');
  for (let attempt = 0; attempt < 500; attempt += 1) {
    const target = Array.from(questionnaire.querySelectorAll<HTMLElement>('[data-question-id]')).find(
      (card) => card.dataset.questionId === context.questionId,
    );
    if (target) {
      target.scrollIntoView({ block: 'center', behavior: 'auto' });
      return;
    }
    if (!next || next.disabled) return;
    next.click();
    await wait(0);
  }
}

async function restoreDocument(document: NavigationDocument): Promise<void> {
  await restoreQuestionContext(document.context);
  await restoreReadingPosition(document.readingPosition);
}

function offerElements(): NavigationOfferElements | null {
  const root = document.querySelector<HTMLElement>('[data-navigation-offer]');
  const message = root?.querySelector<HTMLElement>('[data-navigation-offer-message]');
  const resume = root?.querySelector<HTMLButtonElement>('[data-navigation-resume]');
  const stay = root?.querySelector<HTMLButtonElement>('[data-navigation-stay]');
  return root && message && resume && stay ? { root, message, resume, stay } : null;
}

export function startNavigationRuntime(): void {
  if (started || typeof window === 'undefined') return;
  started = true;
  const profileId = getActiveAlias();
  if (!profileId) return;

  const offerUi = offerElements();
  const catalogPromise = loadNavigationCatalog();
  let ready = false;
  let captureTimer: ReturnType<typeof setTimeout> | undefined;
  let runningSync: Promise<boolean> | null = null;
  let offered: NavigationDocument | null = null;
  let lastFingerprint: string | null = null;
  let lastRemoteVersion: number | null = null;
  let suppressCaptureUntil = 0;

  const hideOffer = () => {
    if (offerUi) offerUi.root.hidden = true;
    offered = null;
  };

  const showOffer = (document: NavigationDocument) => {
    offered = document;
    if (!offerUi) return;
    offerUi.message.textContent =
      document.route === currentRoute()
        ? 'Há um ponto de leitura mais recente salvo em outro dispositivo.'
        : 'Há uma navegação mais recente salva em outro dispositivo.';
    offerUi.root.hidden = false;
  };

  const saveCurrent = async (requestSync = true): Promise<void> => {
    if (!ready || offered || Date.now() < suppressCaptureUntil) return;
    const catalog = await catalogPromise;
    const entry = catalogEntryForRoute(catalog, currentRoute());
    if (!entry) return;
    const contentRoot = document.querySelector<HTMLElement>('[data-navigation-content]');
    const readingPosition = contentRoot ? captureReadingPosition(contentRoot) : null;
    const snapshot = createNavigationDocument(currentRoute(), captureContext(entry), readingPosition);
    const fingerprint = navigationFingerprint(snapshot);
    const record = await getNavigationRecord(profileId);
    if (fingerprint === lastFingerprint || (record && fingerprint === navigationFingerprint(record.current))) return;
    await saveNavigationDocument(profileId, snapshot);
    lastFingerprint = fingerprint;
    if (requestSync) {
      window.dispatchEvent(new CustomEvent('concursos:navigation-updated', { detail: { profileId } }));
    }
  };

  const scheduleCapture = (delay = CAPTURE_DEBOUNCE_MS) => {
    if (!ready || offered || Date.now() < suppressCaptureUntil) return;
    if (captureTimer) clearTimeout(captureTimer);
    captureTimer = setTimeout(() => {
      captureTimer = undefined;
      void saveCurrent();
    }, delay);
  };

  const synchronize = (): Promise<boolean> => {
    if (!ready || !navigator.onLine) return Promise.resolve(false);
    if (runningSync) return runningSync;
    runningSync = requestNavigationProfileSync(profileId).finally(() => {
      runningSync = null;
    });
    return runningSync;
  };

  const inspectRemoteChange = async () => {
    if (!ready) return;
    const record = await getNavigationRecord(profileId);
    if (!record || record.remoteVersion === null) return;
    const newer = lastRemoteVersion === null || record.remoteVersion > lastRemoteVersion;
    lastRemoteVersion = Math.max(lastRemoteVersion ?? 0, record.remoteVersion);
    if (!newer) return;
    const fingerprint = navigationFingerprint(record.current);
    if (fingerprint !== lastFingerprint && record.outboxState === 'clean') showOffer(record.current);
  };

  offerUi?.resume.addEventListener('click', () => {
    const document = offered;
    if (!document) return;
    hideOffer();
    sessionStorage.setItem(`${SESSION_PREFIX}${profileId}`, String(Date.now()));
    if (document.route !== currentRoute()) {
      location.assign(document.route);
      return;
    }
    suppressCaptureUntil = Date.now() + 1_500;
    lastFingerprint = navigationFingerprint(document);
    void restoreDocument(document);
  });

  offerUi?.stay.addEventListener('click', () => {
    hideOffer();
    void saveCurrent().then(() => synchronize());
  });

  window.addEventListener('scroll', () => scheduleCapture(), { passive: true });
  window.addEventListener('resize', () => scheduleCapture(1_200), { passive: true });
  document.addEventListener('change', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (
      input.name === 'question-origin' ||
      input.name === 'question-layout' ||
      input.matches('[data-shuffle-questions]')
    ) {
      scheduleCapture(250);
    }
  });
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (
      target.closest(
        '[data-previous-questions],[data-next-questions],[data-load-more],[data-reshuffle-questions]',
      )
    ) {
      scheduleCapture(400);
    }
  });
  window.addEventListener('pagehide', () => void saveCurrent(false));
  window.addEventListener('online', () => void synchronize().then(inspectRemoteChange));
  window.addEventListener('focus', () => void synchronize().then(inspectRemoteChange));
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') void saveCurrent(false);
    else void synchronize().then(inspectRemoteChange);
  });
  window.addEventListener('concursos:navigation-synced', () => void inspectRemoteChange());
  window.addEventListener('concursos:navigation-updated', () => void synchronize());

  window.setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    void saveCurrent().then(() => synchronize()).then(inspectRemoteChange);
  }, PERIODIC_SYNC_MS);

  void (async () => {
    const catalog = await catalogPromise;
    if (navigator.onLine) {
      try {
        await bootstrapNavigation(profileId);
      } catch {
        // A cópia local continua utilizável quando o bootstrap remoto falha.
      }
    }
    const record = await getNavigationRecord(profileId);
    const sessionKey = `${SESSION_PREFIX}${profileId}`;
    const target = record ? catalogEntryForRoute(catalog, record.current.route) : null;
    if (record && target && !sessionStorage.getItem(sessionKey) && record.current.route !== currentRoute()) {
      sessionStorage.setItem(sessionKey, String(record.remoteVersion ?? record.updatedAt));
      location.replace(record.current.route);
      return;
    }

    sessionStorage.setItem(sessionKey, String(record?.remoteVersion ?? record?.updatedAt ?? Date.now()));
    if (record) {
      lastFingerprint = navigationFingerprint(record.current);
      lastRemoteVersion = record.remoteVersion;
      if (target && record.current.route === currentRoute()) {
        suppressCaptureUntil = Date.now() + 1_500;
        await restoreDocument(record.current);
      }
    }
    ready = true;
    if (!record || !target) {
      await saveCurrent(false);
      window.setTimeout(() => void synchronize(), 12_000);
    }
  })().catch(() => {
    ready = true;
  });
}
