import { createHash } from 'node:crypto';

export const MEDIA_DOCUMENT_KEY_LENGTH = 16;

/**
 * Chave determinística do documento de mídia de um assunto consumidor.
 *
 * O ID remoto tem 100 caracteres e o par de identidades persistidas pode ocupar
 * até 53, então o par é condensado em um hash curto. A chave é calculada no
 * build e entregue ao cliente pronta, para que o navegador nunca precise
 * derivar hash e para que o cálculo não dependa do runtime.
 */
export function mediaDocumentKey(contestStorageId: string, subjectStorageId: string): string {
  return createHash('sha256')
    .update(`${contestStorageId}--${subjectStorageId}`, 'utf8')
    .digest('hex')
    .slice(0, MEDIA_DOCUMENT_KEY_LENGTH);
}
