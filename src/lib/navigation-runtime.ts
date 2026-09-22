import { getActiveAlias } from './identity';
import {
  markLocalStatePending,
  registerLocalStateFlusher,
} from './local-durability';
import {
  clearContestReadingPosition,
  findNavigationByRoute,
  getNavigationContestRecord,
  hasPendingNavigation,
  listNavigationContestRecords,
  saveNavigationShard,
} from './navigation-db';
import {
  contestShardFingerprint,
  createNavigationDocument,
  isResumablePoint,
  navigationPendingRouteKey,
  navigationCatalogSchema,
  navigationDestination,
  navigationFingerprint,
  navigationSessionKey,
  newestContestResume,
  newestGlobalResume,
  normalizeReadingPositionForResume,
  normalizeTextQuote,
  upsertContestPoint,
  type NavigationCatalog,
  type NavigationCatalogEntry,
  type NavigationContext,
  type NavigationDocument,
  type ReadingPosition,
} from './navigation';
import { bootstrapNavigation } from './navigation-sync';
import { requestNavigationProfileSync } from './simulados-profile-sync';
import { isStudied, loadStudied, studiedSubjectId } from './studied';

const BLOCK_SELECTOR = 'h1,h2,h3,h4,h5,h6,p,li,pre,blockquote,table,figure';
const CAPTURE_DEBOUNCE_MS = 800;
const TOP_NAVIGATION_IDLE_MS = 200;
const TOP_NAVIGATION_SCROLL_EPSILON_PX = 1;
const RESTORE_CAPTURE_SUPPRESSION_MS = 3_000;
const PERIODIC_SYNC_MS = 30_000;
const INITIAL_AUTOMATIC_SYNC_DELAY_MS = 12_000;
const NAVIGATION_CATALOG_TIMEOUT_MS = 8_000;
const NAVIGATION_TABS = new Set<NavigationContext['activeTab']>([
  'catalog',
  'content',
  'cheat-sheet',
  'questions',
  'reading',
  'simulados',
  'settings',
  'other',
]);
let started = false;
let runtimeProfileId: string | null | undefined;
const readyProfiles = new Set<string>();
const readyWaiters = new Map<string, Set<() => void>>();
type TopNavigationPhase = 'idle' | 'settling' | 'parked';
type InitialCaptureIntent = 'none' | 'semantic-preserve' | 'user-capture';

export function whenNavigationReady(profileId: string): Promise<void> {
  if (runtimeProfileId !== undefined && runtimeProfileId !== profileId) return Promise.resolve();
  if (readyProfiles.has(profileId)) return Promise.resolve();
  return new Promise((resolve) => {
    const waiters = readyWaiters.get(profileId) ?? new Set<() => void>();
    waiters.add(resolve);
    readyWaiters.set(profileId, waiters);
  });
}

function resolveReadyWaiters(profileId: string): void {
  for (const resolve of readyWaiters.get(profileId) ?? []) resolve();
  readyWaiters.delete(profileId);
}

function setRuntimeProfile(profileId: string | null): void {
  runtimeProfileId = profileId;
  for (const waitingProfileId of readyWaiters.keys()) {
    if (waitingProfileId !== profileId) resolveReadyWaiters(waitingProfileId);
  }
}

function announceNavigationReady(profileId: string): void {
  if (readyProfiles.has(profileId)) return;
  readyProfiles.add(profileId);
  resolveReadyWaiters(profileId);
  window.dispatchEvent(new CustomEvent('concursos:navigation-ready', { detail: { profileId } }));
}

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

function currentDestination(): string {
  return `${currentRoute()}${location.hash === '#focus' ? '#focus' : ''}`;
}

async function loadNavigationCatalog(): Promise<NavigationCatalog> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), NAVIGATION_CATALOG_TIMEOUT_MS);
  try {
    const response = await fetch('/navigation-catalog.json', {
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Não foi possível carregar o catálogo de navegação: ${response.status}`);
    return navigationCatalogSchema.parse(await response.json());
  } finally {
    clearTimeout(timeout);
  }
}

function catalogEntryForRoute(
  catalog: NavigationCatalog | null,
  route: string,
): NavigationCatalogEntry | null {
  if (!catalog) return null;
  try {
    const pathname = new URL(route, location.origin).pathname;
    return catalog.routes.find((entry) => entry.route === pathname) ?? null;
  } catch {
    return null;
  }
}

function documentEntryForCurrentRoute(): NavigationCatalogEntry | null {
  const root = document.querySelector<HTMLElement>('[data-navigation-root]');
  const tab = root?.dataset.navigationTab as NavigationContext['activeTab'] | undefined;
  if (!root || !tab || !NAVIGATION_TABS.has(tab)) return null;

  return {
    route: location.pathname,
    contestStorageId: root.dataset.navigationContest ?? null,
    subjectStorageId: root.dataset.navigationSubject ?? null,
    activeTab: tab,
    readingMode: tab === 'content' && location.hash === '#focus',
  };
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

function distanceFromLine(element: HTMLElement, anchorLine: number): number {
  const rect = element.getBoundingClientRect();
  if (rect.top <= anchorLine && rect.bottom >= anchorLine) return 0;
  return Math.min(Math.abs(rect.top - anchorLine), Math.abs(rect.bottom - anchorLine));
}

function visibleQuestionId(): string | null {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-question-id]'));
  if (cards.length === 0) return null;
  const anchorLine = window.innerHeight * 0.35;
  const nearest = cards.reduce((best, card) =>
    distanceFromLine(card, anchorLine) < distanceFromLine(best, anchorLine) ? card : best,
  );
  return nearest.dataset.questionId ?? null;
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
    readingMode: tab === 'content' && location.hash === '#focus',
    questionOrigin: origin === 'all' || origin === 'authorial' || origin === 'previous_exam' ? origin : null,
    questionLayout: layout === 'single' || layout === 'ten' || layout === 'all' ? layout : null,
    shuffleQuestions: shuffle ? shuffle.checked : null,
  };
}

async function waitForQuestionnaire(): Promise<HTMLElement | null> {
  const root = document.querySelector<HTMLElement>('[data-questionnaire]');
  if (!root) return null;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (root.dataset.navigationReady === 'true') return root;
    await wait(50);
  }
  return null;
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
  const loadMore = questionnaire.querySelector<HTMLButtonElement>('[data-load-more]');
  const advance = context.questionLayout === 'all' ? loadMore : next;

  for (let attempt = 0; attempt < 500; attempt += 1) {
    const target = Array.from(questionnaire.querySelectorAll<HTMLElement>('[data-question-id]')).find(
      (card) => card.dataset.questionId === context.questionId,
    );
    if (target) {
      target.scrollIntoView({ block: 'center', behavior: 'auto' });
      return;
    }
    if (!advance || advance.disabled || advance.hidden) return;
    advance.click();
    await wait(0);
  }
}

async function restoreDocument(document: NavigationDocument): Promise<void> {
  await restoreQuestionContext(document.context);
  if (document.context.activeTab !== 'questions') {
    await restoreReadingPosition(document.readingPosition);
  }
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
  setRuntimeProfile(profileId);
  if (!profileId) return;

  const routeAtStart = currentRoute();
  const sessionKey = navigationSessionKey(profileId);
  const pendingRouteKey = navigationPendingRouteKey(profileId);
  const pendingRoute = sessionStorage.getItem(pendingRouteKey);
  const shouldRestorePendingRoute = pendingRoute === routeAtStart;
  const shouldOfferInitialResume = !sessionStorage.getItem(sessionKey) && routeAtStart === '/';
  const markSessionStarted = () => sessionStorage.setItem(sessionKey, String(Date.now()));
  sessionStorage.removeItem(pendingRouteKey);
  if (routeAtStart !== '/') markSessionStarted();

  const offerUi = offerElements();
  const catalogPromise = loadNavigationCatalog().catch(() => null);
  let ready = false;
  let captureTimer: ReturnType<typeof setTimeout> | undefined;
  const pendingCaptures = new Set<Promise<void>>();
  let runningSync: Promise<boolean> | null = null;
  let runningRestore: Promise<void> | null = null;
  let initialization: Promise<void> | null = null;
  let navigationRedirectPending = false;
  let navigationRevision = 0;
  const initialCapture = { intent: 'none' as InitialCaptureIntent };

  const markNavigationPending = () => {
    navigationRevision += 1;
    markLocalStatePending();
  };
  let offered: NavigationDocument | null = null;
  const lastFingerprints = new Map<string, string>();
  const lastRemoteVersions = new Map<string, { version: number | null; createdAt: string | null }>();
  let suppressCaptureUntil = 0;
  let suppressedCaptureRequested = false;
  let semanticCaptureRequested = false;
  let restoreInProgress = false;
  let captureGeneration = 0;
  let explicitNavigation = false;
  let studiedClearPendingBeforeReady = false;
  let topNavigationPhase: TopNavigationPhase = 'idle';
  let topNavigationTimer: ReturnType<typeof setTimeout> | undefined;
  let topNavigationObservedScroll = false;
  let topNavigationInterrupted = false;
  let topNavigationAllowsProgrammaticInterruption = false;
  let topNavigationParkedY = 0;
  const automaticSyncAfter = Date.now() + INITIAL_AUTOMATIC_SYNC_DELAY_MS;

  const hideOffer = () => {
    if (offerUi) offerUi.root.hidden = true;
    offered = null;
  };

  const showOffer = (document: NavigationDocument, localPending = false) => {
    offered = document;
    if (!offerUi) return;
    offerUi.message.textContent =
      document.route === currentRoute()
        ? `Há um ponto de leitura mais recente salvo ${localPending ? 'neste' : 'em outro'} dispositivo.`
        : `Há uma navegação mais recente salva ${localPending ? 'neste' : 'em outro'} dispositivo.`;
    offerUi.root.hidden = false;
  };

  const saveCurrent = async (
    requestSync = true,
    forcePersist = false,
    ignoreSuppression = false,
    preservedReadingPosition?: ReadingPosition,
  ): Promise<void> => {
    if (
      topNavigationPhase !== 'idle' ||
      !ready ||
      offered ||
      (!ignoreSuppression && Date.now() < suppressCaptureUntil)
    ) return;
    const generation = captureGeneration;
    const catalog = await catalogPromise;
    if (generation !== captureGeneration || offered) return;
    const entry =
      catalogEntryForRoute(catalog, currentRoute()) ??
      documentEntryForCurrentRoute();
    if (!entry) return;

    const context = captureContext(entry);
    const contestStorageId = context.contestStorageId;
    // Rotas fora de concurso (/, /simulados/, /configuracoes/) não persistem:
    // a retomada global deriva dos shards dos concursos.
    if (!contestStorageId) return;
    const contentRoot = document.querySelector<HTMLElement>('[data-navigation-content]');
    let readingPosition: ReadingPosition | null = null;
    let isStudiedForCurrent = false;
    if (context.subjectStorageId) {
      // O estado estudado vale para qualquer aba do assunto (inclusive questões).
      const studied = isStudied(
        await loadStudied(profileId),
        studiedSubjectId(contestStorageId, context.subjectStorageId),
      );
      isStudiedForCurrent = studied;
      if (generation !== captureGeneration || offered) return;
      if (context.activeTab !== 'questions' && contentRoot) {
        readingPosition = studied
          ? null
          : preservedReadingPosition ?? captureReadingPosition(contentRoot);
      }
    }
    const normalizedReadingPosition = normalizeReadingPositionForResume(readingPosition);
    const snapshot = createNavigationDocument(currentRoute(), context, normalizedReadingPosition);
    const record = await getNavigationContestRecord(profileId, contestStorageId);
    if (generation !== captureGeneration || offered) return;

    if (isStudiedForCurrent && context.subjectStorageId) {
      // Assunto estudado nunca avança o cursor: registra/valida a lápide e sai.
      // clearContestReadingPosition é idempotente (não reescreve lápide existente).
      if (captureTimer) clearTimeout(captureTimer);
      captureTimer = undefined;
      captureGeneration += 1;
      suppressedCaptureRequested = false;
      semanticCaptureRequested = false;
      suppressCaptureUntil = Date.now() + RESTORE_CAPTURE_SUPPRESSION_MS;
      await clearSubjectReadingPosition(contestStorageId, context.subjectStorageId);
      return;
    }

    const updated = upsertContestPoint(record?.current ?? null, snapshot);
    if (!forcePersist && record) {
      const currentFingerprint = contestShardFingerprint(record.current);
      const updatedFingerprint = contestShardFingerprint(updated);
      if (currentFingerprint === updatedFingerprint) {
        lastFingerprints.set(contestStorageId, currentFingerprint);
        return;
      }
      if (!forcePersist && updatedFingerprint === lastFingerprints.get(contestStorageId)) return;
    }

    const saved = await saveNavigationShard(
      profileId,
      contestStorageId,
      updated,
      () => generation === captureGeneration && !offered && topNavigationPhase === 'idle',
    );
    if (generation !== captureGeneration || offered) return;
    lastFingerprints.set(contestStorageId, contestShardFingerprint(saved?.current ?? updated));
    if (requestSync && saved) {
        window.dispatchEvent(new CustomEvent('concursos:navigation-updated', { detail: { profileId } }));
    }
  };

  const runSaveCurrent = (
    requestSync = true,
    forcePersist = false,
    ignoreSuppression = false,
    trackActivity = true,
    preservedReadingPosition?: ReadingPosition,
  ): Promise<void> => {
    if (trackActivity) markNavigationPending();
    const capture = saveCurrent(
      requestSync,
      forcePersist,
      ignoreSuppression,
      preservedReadingPosition,
    );
    pendingCaptures.add(capture);
    void capture.finally(() => pendingCaptures.delete(capture)).catch(() => undefined);
    return capture;
  };

  const scheduleCapture = (
    delay = CAPTURE_DEBOUNCE_MS,
    intent: 'user' | 'semantic' = 'user',
  ) => {
    markNavigationPending();
    if (!ready) {
      if (intent === 'user') initialCapture.intent = 'user-capture';
      else if (initialCapture.intent === 'none') initialCapture.intent = 'semantic-preserve';
      return;
    }
    if (offered || topNavigationPhase !== 'idle') return;
    if (captureTimer) clearTimeout(captureTimer);
    const run = () => {
      if (restoreInProgress) {
        suppressedCaptureRequested = true;
        captureTimer = setTimeout(run, 100);
        return;
      }
      const remainingSuppression = suppressCaptureUntil - Date.now();
      if (remainingSuppression > 0) {
        suppressedCaptureRequested = true;
        captureTimer = setTimeout(run, remainingSuppression);
        return;
      }
      captureTimer = undefined;
      suppressedCaptureRequested = false;
      semanticCaptureRequested = false;
      void runSaveCurrent();
    };
    const remainingSuppression = Math.max(0, suppressCaptureUntil - Date.now());
    suppressedCaptureRequested ||= remainingSuppression > 0;
    captureTimer = setTimeout(run, Math.max(delay, remainingSuppression));
  };

  const clearTopNavigationTimer = () => {
    if (topNavigationTimer) clearTimeout(topNavigationTimer);
    topNavigationTimer = undefined;
  };

  const finishTopNavigation = () => {
    if (topNavigationPhase !== 'settling') return;
    clearTopNavigationTimer();
    if (topNavigationInterrupted && window.scrollY > TOP_NAVIGATION_SCROLL_EPSILON_PX) {
      topNavigationPhase = 'idle';
      topNavigationAllowsProgrammaticInterruption = false;
      scheduleCapture(0);
      return;
    }
    topNavigationPhase = 'parked';
    topNavigationParkedY = window.scrollY;
    topNavigationAllowsProgrammaticInterruption = false;
  };

  const armTopNavigationFallback = () => {
    clearTopNavigationTimer();
    topNavigationTimer = setTimeout(finishTopNavigation, TOP_NAVIGATION_IDLE_MS);
  };

  const beginTopNavigation = (allowProgrammaticInterruption = false) => {
    if (captureTimer) clearTimeout(captureTimer);
    captureTimer = undefined;
    clearTopNavigationTimer();
    captureGeneration += 1;
    suppressedCaptureRequested = false;
    semanticCaptureRequested = false;
    topNavigationPhase = 'settling';
    topNavigationObservedScroll = false;
    topNavigationInterrupted = false;
    topNavigationAllowsProgrammaticInterruption = allowProgrammaticInterruption;
    armTopNavigationFallback();
  };

  const restoreCurrentDocument = async (document: NavigationDocument): Promise<void> => {
    restoreInProgress = true;
    suppressCaptureUntil = Date.now() + RESTORE_CAPTURE_SUPPRESSION_MS;
    try {
      await restoreDocument(document);
    } finally {
      restoreInProgress = false;
      suppressCaptureUntil = Date.now() + RESTORE_CAPTURE_SUPPRESSION_MS;
      if (suppressedCaptureRequested) scheduleCapture(0);
    }
  };

  const runRestoreCurrentDocument = (document: NavigationDocument): Promise<void> => {
    markNavigationPending();
    const restore = restoreCurrentDocument(document);
    runningRestore = restore;
    void restore.finally(() => {
      if (runningRestore === restore) runningRestore = null;
    }).catch(() => undefined);
    return restore;
  };

  registerLocalStateFlusher(async () => {
    if (initialization) await initialization;
    while (true) {
      if (navigationRedirectPending) {
        throw new Error('Atualização adiada durante a navegação para o ponto de leitura salvo.');
      }
      const revision = navigationRevision;
      if (runningRestore) await runningRestore;
      if (navigationRedirectPending) {
        throw new Error('Atualização adiada durante a navegação para o ponto de leitura salvo.');
      }
      const captures = [...pendingCaptures];
      if (captures.length > 0) await Promise.all(captures);
      if (navigationRedirectPending) {
        throw new Error('Atualização adiada durante a navegação para o ponto de leitura salvo.');
      }
      if (captureTimer) clearTimeout(captureTimer);
      captureTimer = undefined;
      suppressedCaptureRequested = false;
      semanticCaptureRequested = false;
      await runSaveCurrent(false, false, true, false);
      if (navigationRedirectPending) {
        throw new Error('Atualização adiada durante a navegação para o ponto de leitura salvo.');
      }
      if (
        navigationRevision === revision &&
        runningRestore === null &&
        captureTimer === undefined &&
        pendingCaptures.size === 0
      ) return;
    }
  });

  const synchronize = (force = false): Promise<boolean> => {
    if (!ready || !navigator.onLine || (!force && Date.now() < automaticSyncAfter)) {
      return Promise.resolve(false);
    }
    if (runningSync) return runningSync;
    runningSync = (async () => {
      const catalog = await catalogPromise;
      // A rota de índice do concurso não tem [data-navigation-root]: resolve o
      // concurso pelo catálogo para que o shard ativo sempre faça leitura completa.
      const currentContest =
        catalogEntryForRoute(catalog, currentRoute())?.contestStorageId ??
        documentEntryForCurrentRoute()?.contestStorageId ??
        null;
      return requestNavigationProfileSync(profileId, currentContest);
    })().finally(() => {
      runningSync = null;
    });
    return runningSync;
  };

  const clearSubjectReadingPosition = async (
    contestStorageId: string,
    subjectStorageId: string,
  ): Promise<boolean> => {
    const record = await clearContestReadingPosition(
      profileId,
      contestStorageId,
      subjectStorageId,
    );
    // No-op (já invalidado) não é atividade local: não muda a revisão de durabilidade.
    if (!record) return false;
    markNavigationPending();
    if (!ready) studiedClearPendingBeforeReady = true;
    hideOffer();
    lastFingerprints.set(contestStorageId, contestShardFingerprint(record.current));
    window.dispatchEvent(
      new CustomEvent('concursos:navigation-updated', { detail: { profileId } }),
    );
    return true;
  };

  // Invalida pontos e cursores de assuntos estudados em todos os shards.
  const clearStudiedHistory = async (): Promise<void> => {
    const records = await listNavigationContestRecords(profileId);
    if (records.length === 0) return;
    const studied = await loadStudied(profileId);
    for (const record of records) {
      const { contestStorageId } = record.current;
      const subjects = new Set(Object.keys(record.current.points));
      const cursorSubject = record.current.cursor?.context.subjectStorageId;
      if (cursorSubject) subjects.add(cursorSubject);
      for (const subjectStorageId of subjects) {
        if (isStudied(studied, studiedSubjectId(contestStorageId, subjectStorageId))) {
          await clearSubjectReadingPosition(contestStorageId, subjectStorageId);
        }
      }
    }
  };

  const inspectRemoteChange = async () => {
    try {
      if (!ready) return;
      await clearStudiedHistory();
      const fresh = await listNavigationContestRecords(profileId);
      const global = newestGlobalResume(fresh.map((record) => record.current));
      if (!global) {
        // Sem candidato vigente: uma oferta anterior ficou obsoleta.
        if (offered) hideOffer();
        return;
      }
      // Candidato global mudou de concurso/rota: a oferta anterior não vale mais.
      if (
        offered &&
        (offered.context.contestStorageId !== global.document.context.contestStorageId ||
          offered.route !== global.document.route)
      ) {
        hideOffer();
      }
      const owner = fresh.find((record) => record.current.contestStorageId === global.contestStorageId);
      if (!owner || owner.remoteVersion === null) return;

      const seen = lastRemoteVersions.get(global.contestStorageId);
      const incarnationChanged =
        (seen !== undefined &&
          seen.createdAt !== null &&
          owner.remoteCreatedAt !== null &&
          owner.remoteCreatedAt !== seen.createdAt) ||
        (seen !== undefined && seen.version !== null && owner.remoteVersion < seen.version);
      const newer =
        incarnationChanged ||
        seen === undefined ||
        seen.version === null ||
        owner.remoteVersion > seen.version;

      lastRemoteVersions.set(global.contestStorageId, {
        version: incarnationChanged ? owner.remoteVersion : Math.max(seen?.version ?? 0, owner.remoteVersion),
        createdAt: owner.remoteCreatedAt,
      });
      if (!newer) return;

      const fingerprint = contestShardFingerprint(owner.current);
      if (
        fingerprint !== lastFingerprints.get(global.contestStorageId) &&
        owner.outboxState === 'clean'
      ) {
        showOffer(global.document);
      }
    } catch {
      // Uma falha de leitura local mantém a navegação atual e será reavaliada no próximo gatilho.
    }
  };

  offerUi?.resume.addEventListener('click', () => {
    const document = offered;
    if (!document) return;
    captureGeneration += 1;
    if (captureTimer) clearTimeout(captureTimer);
    captureTimer = undefined;
    suppressedCaptureRequested = false;
    semanticCaptureRequested = false;
    hideOffer();
    markSessionStarted();
    const destination = navigationDestination(document);
    if (destination !== currentDestination()) {
      suppressCaptureUntil = Date.now() + RESTORE_CAPTURE_SUPPRESSION_MS;
      // Não grava fingerprint de ponto único em lastFingerprints (formato de shard):
      // a próxima captura recalcula pelo shard e evita reoferta falsa.
      const contestStorageId = document.context.contestStorageId;
      if (contestStorageId) lastFingerprints.delete(contestStorageId);
      if (document.route !== currentRoute()) {
        sessionStorage.setItem(pendingRouteKey, document.route);
        navigationRedirectPending = true;
        markNavigationPending();
        location.assign(destination);
        return;
      }
      location.assign(destination);
      void runRestoreCurrentDocument(document);
      return;
    }
    const contestStorageId = document.context.contestStorageId;
    if (contestStorageId) lastFingerprints.delete(contestStorageId);
    void runRestoreCurrentDocument(document);
  });

  offerUi?.stay.addEventListener('click', () => {
    topNavigationPhase = 'idle';
    clearTopNavigationTimer();
    hideOffer();
    markSessionStarted();
    void runSaveCurrent(true, true).then(() => synchronize(true));
  });

  window.addEventListener('scroll', () => {
    if (topNavigationPhase === 'settling') {
      topNavigationObservedScroll = true;
      if (
        topNavigationAllowsProgrammaticInterruption &&
        window.scrollY > TOP_NAVIGATION_SCROLL_EPSILON_PX
      ) topNavigationInterrupted = true;
      armTopNavigationFallback();
      return;
    }
    if (topNavigationPhase === 'parked') {
      if (Math.abs(window.scrollY - topNavigationParkedY) <= TOP_NAVIGATION_SCROLL_EPSILON_PX) return;
      topNavigationPhase = 'idle';
    }
    scheduleCapture();
  }, { passive: true });
  window.addEventListener('scrollend', () => {
    if (topNavigationPhase === 'settling' && topNavigationObservedScroll) finishTopNavigation();
  });
  const markTopNavigationInterrupted = () => {
    if (topNavigationPhase === 'settling') topNavigationInterrupted = true;
  };
  window.addEventListener('wheel', markTopNavigationInterrupted, { passive: true });
  window.addEventListener('touchstart', markTopNavigationInterrupted, { passive: true });
  window.addEventListener('pointerdown', markTopNavigationInterrupted, { passive: true });
  document.addEventListener('keydown', (event) => {
    if (
      ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)
    ) {
      markTopNavigationInterrupted();
    }
  });
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
    const link = target.closest<HTMLAnchorElement>('a[href]');
    if (
      link &&
      link.target !== '_blank' &&
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      !event.defaultPrevented
    ) {
      if (link.getAttribute('href') === '#study-top') {
        // Conta como navegação explícita (cancela restauração pendente), mas não
        // consome a oferta inicial: não existe `#study-top` na rota `/`.
        explicitNavigation = true;
        beginTopNavigation();
      } else {
        // Um clique que não sai da rota atual (logo, Catálogo em `/`, âncoras)
        // não consome a oferta inicial pendente nem conta como navegação explícita.
        try {
          const destination = new URL(link.href, location.href);
          const leavesRoute =
            destination.origin !== location.origin ||
            `${destination.pathname}${destination.search}` !== currentRoute();
          if (leavesRoute) {
            explicitNavigation = true;
            markSessionStarted();
          }
        } catch {
          explicitNavigation = true;
          markSessionStarted();
        }
      }
    }
    if (
      target.closest(
        '[data-previous-questions],[data-next-questions],[data-load-more],[data-reshuffle-questions]',
      )
    ) {
      scheduleCapture(400);
    }
  });
  document.addEventListener('submit', () => {
    explicitNavigation = true;
    markSessionStarted();
  });
  window.addEventListener('pagehide', () => {
    if ((explicitNavigation || semanticCaptureRequested) && suppressedCaptureRequested) {
      if (captureTimer) clearTimeout(captureTimer);
      captureTimer = undefined;
      suppressedCaptureRequested = false;
      semanticCaptureRequested = false;
      void runSaveCurrent(false, true, true);
      return;
    }
    explicitNavigation = true;
    void runSaveCurrent(false);
  });
  window.addEventListener('online', () => void synchronize().then(inspectRemoteChange));
  window.addEventListener('focus', () => void synchronize().then(inspectRemoteChange));
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') void runSaveCurrent(false);
    else void synchronize().then(inspectRemoteChange);
  });
  window.addEventListener('concursos:navigation-synced', () => void inspectRemoteChange());
  window.addEventListener('concursos:navigation-updated', () => void synchronize(true));
  const handleStudiedUpdate = async (detail: {
    profileId?: unknown;
    contestStorageId?: unknown;
    subjectStorageId?: unknown;
    studied?: unknown;
  }): Promise<void> => {
    if (
      detail.profileId !== profileId ||
      getActiveAlias() !== profileId ||
      detail.studied !== true ||
      typeof detail.contestStorageId !== 'string' ||
      typeof detail.subjectStorageId !== 'string'
    ) {
      return;
    }
    const currentStudied = await loadStudied(profileId);
    if (
      getActiveAlias() !== profileId ||
      !isStudied(
        currentStudied,
        studiedSubjectId(detail.contestStorageId, detail.subjectStorageId),
      )
    ) {
      return;
    }

    if (captureTimer) clearTimeout(captureTimer);
    captureTimer = undefined;
    captureGeneration += 1;
    suppressedCaptureRequested = false;
    semanticCaptureRequested = false;
    suppressCaptureUntil = Date.now() + RESTORE_CAPTURE_SUPPRESSION_MS;
    await clearSubjectReadingPosition(detail.contestStorageId, detail.subjectStorageId);
  };

  window.addEventListener('concursos:studied-updated', (event) => {
    void handleStudiedUpdate((event as CustomEvent<{
      profileId?: unknown;
      contestStorageId?: unknown;
      subjectStorageId?: unknown;
      studied?: unknown;
    }>).detail ?? {}).catch(() => undefined);
  });
  window.addEventListener('concursos:subject-unread', () => {
    beginTopNavigation(true);
    window.scrollTo({ top: 0 });
  });
  if ('BroadcastChannel' in window) {
    const studiedBroadcast = new BroadcastChannel('concursos-studied');
    studiedBroadcast.addEventListener('message', (event) => {
      void handleStudiedUpdate(
        (event.data as Parameters<typeof handleStudiedUpdate>[0]) ?? {},
      ).catch(() => undefined);
    });
  }
  window.addEventListener('concursos:sync-status', (event) => {
    const detail = (event as CustomEvent<{ profileId?: unknown; state?: unknown }>).detail;
    if (detail?.profileId === profileId && detail.state === 'synced') {
      void inspectRemoteChange();
    }
  });
  window.addEventListener('concursos:reading-focus-change', () => {
    semanticCaptureRequested = true;
    scheduleCapture(0, 'semantic');
  });

  window.setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    void runSaveCurrent().then(() => synchronize()).then(inspectRemoteChange);
  }, PERIODIC_SYNC_MS);

  initialization = (async () => {
    const catalog = await catalogPromise;
    const initialContest =
      catalogEntryForRoute(catalog, currentRoute())?.contestStorageId ??
      documentEntryForCurrentRoute()?.contestStorageId ??
      null;
    if (navigator.onLine) {
      try {
        await bootstrapNavigation(profileId, initialContest);
      } catch {
        // A cópia local continua utilizável quando o bootstrap remoto falha.
      }
    }
    // Estado estudado (inclusive adotado do remoto no bootstrap) é aplicado
    // antes de calcular a oferta/retomada inicial.
    await clearStudiedHistory();
    const rows = await listNavigationContestRecords(profileId);
    const global = newestGlobalResume(rows.map((row) => row.current));
    const resumeDocument = global?.document ?? null;
    const target = resumeDocument ? catalogEntryForRoute(catalog, resumeDocument.route) : null;
    const currentEntry =
      catalogEntryForRoute(catalog, currentRoute()) ?? documentEntryForCurrentRoute();
    const initialResumeOffered =
      shouldOfferInitialResume &&
      !explicitNavigation &&
      resumeDocument &&
      target &&
      resumeDocument.route !== currentRoute();
    if (initialResumeOffered) {
      const owner = rows.find((row) => row.current.contestStorageId === global!.contestStorageId);
      showOffer(resumeDocument, owner?.outboxState === 'pending');
    } else {
      markSessionStarted();
    }

    if (resumeDocument) {
      for (const row of rows) {
        lastFingerprints.set(row.contestStorageId, contestShardFingerprint(row.current));
        lastRemoteVersions.set(row.contestStorageId, {
          version: row.remoteVersion,
          createdAt: row.remoteCreatedAt,
        });
      }
      const restored = shouldRestorePendingRoute
        ? await findNavigationByRoute(profileId, currentRoute())
        : null;
      if (!explicitNavigation && restored && target) {
        await runRestoreCurrentDocument(restored);
      }
    }
    ready = true;
    // Preservação independe de autorização pendente: reabrir o assunto
    // (deep link #focus incluído) não pode regredir o ponto salvo.
    const currentPoint = await findNavigationByRoute(profileId, currentRoute());
    const preserveInitialReadingPosition = Boolean(
      currentPoint &&
        currentPoint.route === currentRoute() &&
        currentPoint.context.activeTab === 'content' &&
        currentPoint.readingPosition !== null &&
        currentEntry?.activeTab === 'content',
    );
    const preservePositionDuringInitialCapture =
      preserveInitialReadingPosition &&
      initialCapture.intent !== 'user-capture';
    if (preservePositionDuringInitialCapture) {
      await runSaveCurrent(
        false,
        false,
        true,
        false,
        currentPoint!.readingPosition ?? undefined,
      );
    } else if (preserveInitialReadingPosition) {
      await runSaveCurrent(false, false, true, false);
    } else {
      if (!resumeDocument || !target) {
        await runSaveCurrent(false);
      } else {
        await runSaveCurrent();
      }
    }
    announceNavigationReady(profileId);
    // Publica reparos/capturas silenciosas do init sem aguardar o ciclo
    // periódico: o bootstrap já assentou o estado remoto.
    if (await hasPendingNavigation(profileId)) {
      void synchronize(true).then(inspectRemoteChange);
    }
    if (studiedClearPendingBeforeReady && await hasPendingNavigation(profileId)) {
      void synchronize(true).then(inspectRemoteChange);
    }
  })().catch(() => {
    ready = true;
    announceNavigationReady(profileId);
  });
  void initialization;
}
