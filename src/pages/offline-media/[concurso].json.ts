import type { APIRoute, GetStaticPaths } from 'astro';
import { getCatalog } from '../../lib/catalog';

/**
 * Inventario de midias por concurso, para o download offline.
 *
 * O manifesto do pacote offline nao muda: ele descreve o conteudo do
 * concurso e seu hash de integridade. A midia tem contrato proprio,
 * versionado, porque e opcional, enderecada por conteudo e compartilhada
 * entre concursos.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const { contests } = await getCatalog();
  return contests.map((contest) => ({
    params: { concurso: contest.storageId },
    props: { inventory: contest.offlineMediaInventory },
  }));
};

export const GET: APIRoute = ({ props }) =>
  new Response(JSON.stringify(props.inventory), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
