import { setRuntimeActivity } from './runtime-activity';

let engine: HTMLMediaElement | null = null;
let initialized = false;
let reveal = () => {};

export function selectGlobalMedia(kind: 'audio' | 'video', title: string, href: string): HTMLMediaElement {
  const host = document.getElementById('global-media-player')!;
  const next = host.querySelector<HTMLMediaElement>(kind === 'video' ? '[data-global-media-video]' : '[data-global-media-audio]')!;
  if (engine && engine !== next) engine.pause();
  engine = next;
  host.querySelector<HTMLVideoElement>('video')!.hidden = kind !== 'video';
  const link = host.querySelector<HTMLAnchorElement>('[data-media-title]')!;
  link.textContent = title;
  link.href = href;
  return next;
}

export function revealGlobalMedia(): void { reveal(); }

export function startGlobalMediaPlayer(): void {
  if (initialized) return;
  initialized = true;
  const host = document.getElementById('global-media-player')!;
  const toggle = host.querySelector<HTMLButtonElement>('[data-media-toggle]')!;
  const seek = host.querySelector<HTMLInputElement>('[data-media-seek]')!;
  const time = host.querySelector<HTMLOutputElement>('[data-media-time]')!;
  const speed = host.querySelector<HTMLSelectElement>('[data-media-speed]')!;
  let eligible = false;
  let pauseTimer = 0;
  let previousY = window.scrollY;
  let reservedHeight = 0;
  // Um toque para revelar pode acontecer no meio de uma rolagem suave ou de
  // inércia. Os eventos restantes dessa rolagem não podem esconder de volta o
  // player que o usuário acabou de pedir para ver.
  let revealUntil = 0;
  const hasFocus = () => host.contains(document.activeElement);
  const measure = () => {
    const height = host.hidden ? 0 : Math.ceil(host.getBoundingClientRect().height);
    if (height > 0) reservedHeight = height;
    document.documentElement.style.setProperty('--media-dock-height', `${height}px`);
    // Recolher não muda a geometria do documento: scroll anchoring poderia
    // interpretar a revelação como scroll para baixo e esconder a barra de novo.
    document.documentElement.style.setProperty('--media-dock-space', `${eligible ? reservedHeight : 0}px`);
  };
  const activity = () => setRuntimeActivity('media', Boolean(engine && !engine.paused) || eligible || hasFocus());
  const show = () => { if (!eligible) return; host.hidden = false; measure(); activity(); };
  reveal = show;
  const hide = () => { if (hasFocus()) return; host.hidden = true; measure(); };
  const format = (value: number) => { const n = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0; return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`; };
  const render = () => {
    if (!engine) return;
    toggle.textContent = engine.paused ? '▶' : 'Ⅱ';
    toggle.setAttribute('aria-label', engine.paused ? 'Reproduzir' : 'Pausar');
    const duration = Number.isFinite(engine.duration) ? engine.duration : 0;
    seek.disabled = duration <= 0;
    seek.max = String(duration);
    seek.value = String(engine.currentTime);
    time.value = `${format(engine.currentTime)} / ${format(duration)}`;
    seek.setAttribute('aria-valuetext', time.value);
    speed.value = String(engine.playbackRate);
  };
  const linger = () => {
    clearTimeout(pauseTimer);
    if (!eligible) return;
    pauseTimer = window.setTimeout(() => {
      if (hasFocus()) { linger(); return; }
      eligible = false;
      hide();
      activity();
    }, 5 * 60_000);
  };
  host.addEventListener('play', (event) => {
    if (event.target !== engine) return;
    clearTimeout(pauseTimer); eligible = true; show(); render(); activity();
  }, true);
  host.addEventListener('pause', () => { render(); linger(); activity(); }, true);
  host.addEventListener('ended', () => { render(); linger(); activity(); }, true);
  for (const type of ['timeupdate', 'durationchange', 'loadedmetadata', 'ratechange', 'seeked']) host.addEventListener(type, render, true);
  toggle.addEventListener('click', () => {
    if (!engine) return;
    if (!engine.paused) engine.pause();
    else void engine.play().catch(() => { host.querySelector('[data-subject-media-status]')!.textContent = 'Não foi possível reproduzir a mídia. Tente novamente.'; });
  });
  const skip = (delta: number) => { if (engine && Number.isFinite(engine.duration)) engine.currentTime = Math.min(engine.duration, Math.max(0, engine.currentTime + delta)); };
  host.querySelector('[data-media-back]')!.addEventListener('click', () => skip(-15));
  host.querySelector('[data-media-forward]')!.addEventListener('click', () => skip(15));
  seek.addEventListener('input', () => { if (engine && !seek.disabled) engine.currentTime = Number(seek.value); });
  speed.addEventListener('change', () => { if (engine) engine.playbackRate = Number(speed.value); });
  host.querySelector('[data-media-close]')!.addEventListener('click', () => {
    engine?.pause(); clearTimeout(pauseTimer); eligible = false;
    (document.activeElement as HTMLElement | null)?.blur();
    hide(); activity();
  });
  host.addEventListener('focusin', () => { show(); activity(); });
  host.addEventListener('focusout', () => { queueMicrotask(() => { if (engine?.paused) linger(); activity(); }); });
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (Math.abs(y - previousY) < 12) return;
    if (y > previousY && y > 80 && performance.now() >= revealUntil) hide(); else show();
    previousY = y;
  }, { passive: true });
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element) || event.target.closest('a,button,input,select,textarea,summary,[role="button"],audio,video')) return;
    if (window.getSelection()?.toString()) return;
    revealUntil = performance.now() + 800;
    show();
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Tab') show(); });
  document.addEventListener('astro:after-swap', () => { previousY = window.scrollY; measure(); });
  window.addEventListener('concursos:reading-focus-change', show);
  document.addEventListener('fullscreenchange', show);
  new ResizeObserver(measure).observe(host);
}
