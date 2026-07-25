import {
  buildSimuladoDocumentId,
  getActiveAlias,
  validateSimuladoId,
} from './identity';
import { loadSimuladoDocument } from './simulados';
import {
  simuladosCatalogSchema,
  type SimuladosCatalog,
} from './simulados-catalog';

function query<T extends Element>(selector: string): T | null {
  return document.querySelector<T>(selector);
}

let catalogPromise: Promise<SimuladosCatalog | null> | null = null;

function loadCatalog(): Promise<SimuladosCatalog | null> {
  catalogPromise ??= fetch('/simulados/catalog.json', { cache: 'no-store' })
    .then(async (response) => {
      if (!response.ok) return null;
      return simuladosCatalogSchema.parse(await response.json());
    })
    .catch(() => null);
  return catalogPromise;
}

function subjectTitle(
  catalog: SimuladosCatalog | null,
  contestStorageId: string,
  subjectStorageId: string,
): string {
  const contest = catalog?.contests.find((item) => item.storageId === contestStorageId);
  return contest?.subjects.find((item) => item.storageId === subjectStorageId)?.title ?? subjectStorageId;
}

export function startSimuladoResultBreakdown(): void {
  const resultSummary = query<HTMLElement>('[data-result]');
  const breakdown = query<HTMLElement>('[data-result-by-subject]');
  const list = query<HTMLUListElement>('[data-result-by-subject-list]');
  if (!resultSummary || !breakdown || !list) return;

  let renderRevision = 0;
  const hide = (): void => {
    breakdown.hidden = true;
    list.replaceChildren();
  };

  const render = async (): Promise<void> => {
    const revision = ++renderRevision;
    const alias = getActiveAlias();
    const rawSimulationId = new URLSearchParams(location.search).get('id');
    if (!alias || !rawSimulationId || resultSummary.hidden) {
      hide();
      return;
    }

    try {
      const simulationId = validateSimuladoId(rawSimulationId);
      const documentId = buildSimuladoDocumentId(alias, simulationId);
      const simulation = await loadSimuladoDocument(documentId);
      if (
        revision !== renderRevision ||
        simulation?.status !== 'completed' ||
        simulation.result === null
      ) {
        hide();
        return;
      }

      const catalog = await loadCatalog();
      if (revision !== renderRevision) return;

      list.replaceChildren();
      for (const result of simulation.result.bySubject) {
        const item = document.createElement('li');
        const title = subjectTitle(
          catalog,
          simulation.configuration.contestStorageId,
          result.subjectStorageId,
        );
        const incorrect = result.answered - result.correct;
        const unanswered = result.total - result.answered;
        item.textContent = `${title}: ${result.correct}/${result.total} acertos, ${incorrect} erros e ${unanswered} não respondidas.`;
        list.append(item);
      }
      breakdown.hidden = false;
    } catch {
      hide();
    }
  };

  const observer = new MutationObserver(() => void render());
  observer.observe(resultSummary, {
    attributes: true,
    attributeFilter: ['hidden'],
    childList: true,
    characterData: true,
    subtree: true,
  });
  window.addEventListener('popstate', () => void render());
  window.addEventListener('concursos:simulados-updated', () => void render());
  window.addEventListener('concursos:simulados-synced', () => void render());
  void render();
}
