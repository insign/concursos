/**
 * Classificadores de contagem para estimate-scale.mjs.
 *
 * Um `vinculo.json` de assunto marca um diretório de assunto; um
 * `mega-revisao/vinculo.json` marca um vínculo de mega revisão canônica
 * (#715) e nunca um assunto. Funções puras para cobertura unitária.
 */

export function isSubjectMarkerFile(file) {
  const normalized = file.replaceAll('\\', '/');
  if (!normalized.endsWith('/vinculo.json') && !normalized.endsWith('/questoes.json')) {
    return false;
  }
  if (normalized.endsWith('/mega-revisao/vinculo.json')) {
    return false;
  }
  return true;
}

export function isMegaReviewRouteFile(file) {
  const normalized = file.replaceAll('\\', '/');
  return (
    normalized.endsWith('/mega-revisao/index.md') ||
    normalized.endsWith('/mega-revisao/vinculo.json')
  );
}
