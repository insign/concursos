import type { TransitionBeforePreparationEvent } from 'astro:transitions/client';
import { runAfterLocalWritesSettled } from './pwa-update';

type EventMapFor<T> = T extends Window ? WindowEventMap : T extends Document ? DocumentEventMap : T extends MediaQueryList ? MediaQueryListEventMap : HTMLElementEventMap;

export class PageScope {
  private controller = new AbortController();
  private disposers: Array<() => void> = [];
  readonly signal = this.controller.signal;

  on<T extends EventTarget, K extends string>(
    target: T,
    type: K,
    listener: (event: K extends keyof EventMapFor<T> ? EventMapFor<T>[K] : Event) => void,
    options: AddEventListenerOptions = {},
  ): void {
    target.addEventListener(type, listener as EventListener, { ...options, signal: this.signal });
  }

  defer(dispose: () => void): void {
    if (this.signal.aborted) dispose();
    else this.disposers.push(dispose);
  }

  dispose(): void {
    this.controller.abort();
    for (const dispose of this.disposers.splice(0).reverse()) dispose();
  }
}

const mounts = new Set<() => void>();
const cleanups = new Set<() => void>();

export function onPageMount(mount: (scope: PageScope) => void): void {
  if (typeof document === 'undefined') return;
  let body: HTMLElement | null = null;
  let scope: PageScope | null = null;
  const dispose = () => {
    scope?.dispose();
    scope = null;
    body = null;
  };
  const run = () => {
    if (body === document.body) return;
    dispose();
    body = document.body;
    scope = new PageScope();
    mount(scope);
  };
  mounts.add(run);
  cleanups.add(dispose);
  if (document.readyState !== 'loading') run();
}

if (typeof document !== 'undefined') {
  // O router restaura coordenadas explicitamente; em reload com history.state
  // existente, Astro 7 não reafirma este modo e a restauração nativa pode competir.
  window.history.scrollRestoration = 'manual';
  document.addEventListener('astro:page-load', () => {
    for (const mount of mounts) mount();
  });
  document.addEventListener('DOMContentLoaded', () => {
    for (const mount of mounts) mount();
  }, { once: true });
  document.addEventListener('astro:before-swap', () => {
    for (const dispose of cleanups) dispose();
  });
  document.addEventListener('astro:before-preparation', (event) => {
    const preparation = event as TransitionBeforePreparationEvent;
    const load = preparation.loader;
    preparation.loader = async () => {
      try {
        await runAfterLocalWritesSettled(() => undefined);
      } catch (error) {
        preparation.preventDefault();
        window.dispatchEvent(new CustomEvent('concursos:navigation-error', { detail: error }));
        // Abortar impede o fallback documental, que descartaria o estado não salvo.
        throw error;
      }
      if (preparation.signal.aborted) return;
      await load();
      if (preparation.defaultPrevented || preparation.newDocument.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
        const error = new Error('Esta página offline precisa ser atualizada. Conecte-se à internet e tente novamente.');
        window.dispatchEvent(new CustomEvent('concursos:navigation-error', { detail: error }));
        throw error;
      }
      await runAfterLocalWritesSettled(() => undefined);
    };
  });
}
