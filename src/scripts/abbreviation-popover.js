// @ts-check

const triggers = Array.from(
  document.querySelectorAll('.reading-surface article abbr[title]'),
).filter((trigger) => trigger instanceof HTMLElement);

if (triggers.length > 0) {
  /** @typedef {{ trigger: HTMLElement, tooltip: HTMLElement }} Popover */
  /** @type {Popover | null} */
  let active = null;
  /** @type {Popover | null} */
  let pinned = null;
  /** @type {Popover | null} */
  let dismissed = null;
  let positionFrame = 0;
  let closeTimer = 0;

  const cancelClose = () => {
    if (!closeTimer) return;
    window.clearTimeout(closeTimer);
    closeTimer = 0;
  };

  /** @param {Popover} popover */
  const position = (popover) => {
    const gap = 8;
    const margin = 8;
    const triggerBounds = popover.trigger.getBoundingClientRect();
    popover.tooltip.style.visibility = 'hidden';
    popover.tooltip.hidden = false;
    popover.tooltip.dataset.placement = 'bottom';

    const tooltipBounds = popover.tooltip.getBoundingClientRect();
    const maximumLeft = Math.max(margin, window.innerWidth - tooltipBounds.width - margin);
    const left = Math.min(
      maximumLeft,
      Math.max(margin, triggerBounds.left + triggerBounds.width / 2 - tooltipBounds.width / 2),
    );
    let top = triggerBounds.bottom + gap;
    if (
      top + tooltipBounds.height > window.innerHeight - margin &&
      triggerBounds.top - tooltipBounds.height - gap >= margin
    ) {
      top = triggerBounds.top - tooltipBounds.height - gap;
      popover.tooltip.dataset.placement = 'top';
    }
    const maximumTop = Math.max(margin, window.innerHeight - tooltipBounds.height - margin);
    top = Math.min(maximumTop, Math.max(margin, top));

    popover.tooltip.style.left = `${Math.round(left)}px`;
    popover.tooltip.style.top = `${Math.round(top)}px`;
    popover.tooltip.style.visibility = 'visible';
  };

  const schedulePosition = () => {
    if (!active || positionFrame) return;
    positionFrame = window.requestAnimationFrame(() => {
      positionFrame = 0;
      if (active) position(active);
    });
  };

  /** @param {Popover | null} [popover] */
  const close = (popover = active) => {
    if (!popover) return;
    cancelClose();
    popover.tooltip.hidden = true;
    popover.tooltip.style.visibility = '';
    if (active === popover) active = null;
    if (pinned === popover) pinned = null;
  };

  /**
   * @param {Popover} popover
   * @param {boolean} [pin]
   * @param {boolean} [direct] Somente interação direta limpa uma dispensa por Escape.
   */
  const open = (popover, pin = false, direct = true) => {
    cancelClose();
    if (active && active !== popover) close(active);
    if (direct && dismissed === popover) dismissed = null;
    active = popover;
    if (pin) pinned = popover;
    position(popover);
  };

  /** @param {Popover} popover */
  const scheduleClose = (popover) => {
    cancelClose();
    closeTimer = window.setTimeout(() => {
      closeTimer = 0;
      if (active === popover && pinned !== popover && document.activeElement !== popover.trigger) {
        close(popover);
        const focused = popovers.find((candidate) => candidate.trigger === document.activeElement);
        if (focused && focused !== dismissed) open(focused, false, false);
      }
    }, 120);
  };

  /** @type {Popover[]} */
  const popovers = [];
  for (const [index, trigger] of triggers.entries()) {
    const title = trigger.getAttribute('title')?.trim();
    if (!title) continue;

    const tooltip = document.createElement('span');
    let tooltipId = `abbreviation-popover-${index + 1}`;
    while (document.getElementById(tooltipId)) tooltipId += '-next';
    tooltip.id = tooltipId;
    tooltip.className = 'abbreviation-popover';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.textContent = title;
    tooltip.hidden = true;
    (trigger.closest('.reading-surface') ?? document.querySelector('main') ?? document.body).append(tooltip);

    const describedBy = new Set((trigger.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean));
    describedBy.add(tooltipId);
    trigger.setAttribute('aria-describedby', Array.from(describedBy).join(' '));
    if (!trigger.hasAttribute('tabindex')) trigger.tabIndex = 0;
    trigger.dataset.abbreviationPopoverTrigger = '';
    trigger.removeAttribute('title');

    const popover = { trigger, tooltip };
    popovers.push(popover);

    trigger.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'touch') open(popover);
    });
    trigger.addEventListener('pointerleave', (event) => {
      if (
        event.pointerType !== 'touch' &&
        pinned !== popover &&
        document.activeElement !== trigger
      ) {
        scheduleClose(popover);
      }
    });
    trigger.addEventListener('focus', () => open(popover));
    trigger.addEventListener('blur', () => {
      if (pinned !== popover) scheduleClose(popover);
    });
    trigger.addEventListener('pointerup', (event) => {
      if (event.pointerType !== 'touch') return;
      event.preventDefault();
      if (active === popover && pinned === popover) close(popover);
      else open(popover, true);
    });
    tooltip.addEventListener('pointerenter', cancelClose);
    tooltip.addEventListener('pointerleave', () => scheduleClose(popover));
  }

  if (popovers.length > 0) {
    window.addEventListener('pointerdown', (event) => {
      if (
        !active ||
        event.composedPath().includes(active.trigger) ||
        event.composedPath().includes(active.tooltip)
      ) return;
      close(active);
    }, { capture: true });
    window.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !active) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      dismissed = active;
      close(active);
    }, { capture: true });
    window.addEventListener('scroll', schedulePosition, { capture: true, passive: true });
    window.addEventListener('resize', schedulePosition, { passive: true });
  }
}
