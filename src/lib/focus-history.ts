type FocusPopstateHandler = (event: PopStateEvent) => boolean;

let handler: FocusPopstateHandler | null = null;
let installed = false;

/**
 * O modo de leitura usa um subpasso de histórico na mesma rota (`#focus`). O
 * router do Astro escuta `popstate` e trocaria o documento ao voltar desse
 * subpasso, destruindo o estado do modo de leitura. No próprio alvo, os
 * listeners rodam na ordem de registro, então este precisa ser instalado antes
 * do script do `ClientRouter` (por isso vive no `<head>`); só assim
 * `stopImmediatePropagation` impede a navegação indevida.
 */
export function installFocusHistoryGuard(): void {
  if (installed || typeof window === 'undefined') return;
  installed = true;
  window.addEventListener(
    'popstate',
    (event) => {
      if (handler?.(event)) event.stopImmediatePropagation();
    },
    { capture: true },
  );
}

export function setFocusPopstateHandler(next: FocusPopstateHandler | null): void {
  handler = next;
}
