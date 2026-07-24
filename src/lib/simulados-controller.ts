import {
  buildSimuladoDocumentId,
  getActiveAlias,
  validateSimuladoId,
} from './identity';
import {
  buildSimuladoSummary,
  createSimuladoDocument,
  drawSimuladoQuestions,
  finalizeSimuladoDocument,
  loadSimuladoDocument,
  loadSimuladosIndex,
  persistSimuladoDocument,
  saveSimuladoSummary,
  setSimuladoAnswer,
  simuladoQuestionKey,
  type SimuladoConfig,
  type SimuladoDocument,
  type SimuladoOriginFilter,
} from './simulados';
import {
  simuladoPoolSchema,
  simuladosCatalogSchema,
  type SimuladoCatalogContest,
  type SimuladoCatalogSubject,
  type SimuladosCatalog,
} from './simulados-catalog';
import { requestCompleteProfileSync } from './simulados-profile-sync';

function query<T extends Element>(selector: string): T | null {
  return document.querySelector<T>(selector);
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}

function initializeSimulados(): void {
  const alias = getActiveAlias();
  const form = query<HTMLFormElement>('[data-simulado-form]');
  const aliasWarning = query<HTMLElement>('[data-alias-warning]');
  const contestSelect = query<HTMLSelectElement>('[data-contest]');
  const subjectsFieldset = query<HTMLFieldSetElement>('[data-subjects]');
  const subjectList = query<HTMLElement>('[data-subject-list]');
  const selectAllSubjects = query<HTMLInputElement>('[data-select-all-subjects]');
  const originSelect = query<HTMLSelectElement>('[data-origin]');
  const countInput = query<HTMLInputElement>('[data-count]');
  const availabilityOutput = query<HTMLElement>('[data-availability]');
  const configSummary = query<HTMLElement>('[data-config-summary]');
  const generateButton = query<HTMLButtonElement>('[data-generate]');
  const recentList = query<HTMLElement>('[data-recent-list]');
  const resolver = query<HTMLElement>('[data-resolver]');
  const resolverEyebrow = query<HTMLElement>('[data-resolver-eyebrow]');
  const resolverTitle = query<HTMLElement>('[data-resolver-title]');
  const resolverMeta = query<HTMLElement>('[data-resolver-meta]');
  const resultBox = query<HTMLElement>('[data-result]');
  const questionList = query<HTMLOListElement>('[data-question-list]');
  const resolverActions = query<HTMLElement>('[data-resolver-actions]');
  const statusOutput = query<HTMLElement>('[data-status]');

  if (
    !form ||
    !contestSelect ||
    !subjectsFieldset ||
    !subjectList ||
    !selectAllSubjects ||
    !originSelect ||
    !countInput ||
    !availabilityOutput ||
    !configSummary ||
    !generateButton ||
    !recentList ||
    !resolver ||
    !resolverEyebrow ||
    !resolverTitle ||
    !resolverMeta ||
    !resultBox ||
    !questionList ||
    !resolverActions ||
    !statusOutput
  ) {
    return;
  }

  let catalog: SimuladosCatalog | null = null;
  let activeDocument: SimuladoDocument | null = null;
  let activeDocumentId: string | null = null;
  let busy = false;

  const setStatus = (message: string): void => {
    statusOutput.textContent = message;
  };

  const currentContest = (): SimuladoCatalogContest | null =>
    catalog?.contests.find((contest) => contest.storageId === contestSelect.value) ?? null;

  const selectedSubjects = (): string[] =>
    [...subjectList.querySelectorAll<HTMLInputElement>('input[data-subject]:checked')].map(
      (input) => input.value,
    );

  const originCount = (
    subject: SimuladoCatalogSubject,
    origin: SimuladoOriginFilter,
  ): number => (origin === 'all' ? subject.counts.all : subject.counts[origin]);

  const currentAvailability = (): number => {
    const contest = currentContest();
    if (!contest) return 0;
    const selected = new Set(selectedSubjects());
    const origin = originSelect.value as SimuladoOriginFilter;
    return contest.subjects
      .filter((subject) => selected.has(subject.storageId))
      .reduce((total, subject) => total + originCount(subject, origin), 0);
  };

  const updateConfigurationState = (): void => {
    const contest = currentContest();
    const selected = selectedSubjects();
    const available = currentAvailability();
    const requested = Number.parseInt(countInput.value, 10);
    const valid = Boolean(
      alias &&
        contest &&
        selected.length > 0 &&
        requested > 0 &&
        requested <= available,
    );

    countInput.max = String(Math.max(available, 1));
    generateButton.disabled = !valid || busy;
    availabilityOutput.textContent =
      selected.length === 0
        ? 'Selecione pelo menos um assunto.'
        : `${available} questão${available === 1 ? '' : 'ões'} disponível${available === 1 ? '' : 'is'} para esta combinação.`;
    configSummary.textContent = valid
      ? `${requested} questão${requested === 1 ? '' : 'ões'} em ${selected.length} assunto${selected.length === 1 ? '' : 's'}, sem repetição.`
      : requested > available && available > 0
        ? 'Reduza a quantidade para não ultrapassar a disponibilidade real.'
        : '';

    document.querySelectorAll<HTMLButtonElement>('[data-quick-count]').forEach((button) => {
      button.disabled = Number(button.dataset.quickCount) > available;
    });
  };

  const renderSubjects = (contest: SimuladoCatalogContest): void => {
    subjectList.replaceChildren();
    for (const subject of [...contest.subjects].sort((a, b) => a.order - b.order)) {
      const label = document.createElement('label');
      label.className = 'simulado-subject-option';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.value = subject.storageId;
      input.dataset.subject = '';
      input.addEventListener('change', () => {
        const inputs = [...subjectList.querySelectorAll<HTMLInputElement>('[data-subject]')];
        selectAllSubjects.checked = inputs.length > 0 && inputs.every((item) => item.checked);
        selectAllSubjects.indeterminate =
          inputs.some((item) => item.checked) && !selectAllSubjects.checked;
        updateConfigurationState();
      });
      const text = document.createElement('span');
      text.textContent = `${subject.title} (${subject.counts.all})`;
      label.append(input, text);
      subjectList.append(label);
    }
    subjectsFieldset.disabled = false;
    selectAllSubjects.checked = false;
    selectAllSubjects.indeterminate = false;
    updateConfigurationState();
  };

  const renderContestOptions = (payload: SimuladosCatalog): void => {
    contestSelect.replaceChildren();
    for (const contest of [...payload.contests].sort((a, b) => a.order - b.order)) {
      const option = document.createElement('option');
      option.value = contest.storageId;
      option.textContent = contest.title;
      contestSelect.append(option);
    }
    contestSelect.disabled = payload.contests.length === 0;
    const requestedContest = new URLSearchParams(location.search).get('concurso');
    if (
      requestedContest &&
      payload.contests.some((contest) => contest.storageId === requestedContest)
    ) {
      contestSelect.value = requestedContest;
    }
    const contest = currentContest();
    if (contest) renderSubjects(contest);
  };

  const contestTitle = (storageId: string): string =>
    catalog?.contests.find((contest) => contest.storageId === storageId)?.title ?? storageId;

  const renderRecent = async (): Promise<void> => {
    if (!alias) {
      recentList.replaceChildren();
      const item = document.createElement('li');
      item.textContent = 'Defina um alias para manter o histórico.';
      recentList.append(item);
      return;
    }

    const index = await loadSimuladosIndex(alias);
    recentList.replaceChildren();
    if (index.simulados.length === 0) {
      const item = document.createElement('li');
      item.textContent = 'Nenhum simulado criado ainda.';
      recentList.append(item);
      return;
    }

    for (const summary of index.simulados) {
      const item = document.createElement('li');
      const title = document.createElement('strong');
      title.textContent = contestTitle(summary.contestStorageId);
      const link = document.createElement('a');
      link.href = `/simulados/?id=${encodeURIComponent(summary.id)}`;
      link.textContent =
        summary.status === 'completed' ? 'Revisar simulado' : 'Continuar simulado';
      const meta = document.createElement('span');
      meta.className = 'simulado-meta';
      const score =
        summary.correctCount === null
          ? ''
          : ` · ${summary.correctCount}/${summary.questionCount} acertos`;
      meta.textContent = `${summary.questionCount} questões · ${formatDate(summary.updatedAt)}${score}`;
      item.append(title, link, meta);
      recentList.append(item);
    }
  };

  const saveSummaryAndScheduleSync = async (simulation: SimuladoDocument): Promise<void> => {
    if (!alias) return;
    await saveSimuladoSummary(alias, buildSimuladoSummary(simulation));
    window.dispatchEvent(
      new CustomEvent('concursos:simulados-updated', { detail: { profileId: alias } }),
    );
  };

  const renderDocument = (simulation: SimuladoDocument, documentId: string): void => {
    activeDocument = simulation;
    activeDocumentId = documentId;
    resolver.hidden = false;
    resolver.scrollIntoView({ behavior: 'smooth', block: 'start' });
    resolverEyebrow.textContent =
      simulation.status === 'completed' ? 'Simulado concluído' : 'Simulado em andamento';
    resolverTitle.textContent = contestTitle(simulation.configuration.contestStorageId);
    resolverMeta.textContent = `${simulation.questions.length} questões · ${Object.keys(simulation.answers).length} respondidas · atualizado em ${formatDate(simulation.updatedAt)}`;

    if (simulation.status === 'completed' && simulation.result) {
      resultBox.hidden = false;
      resultBox.textContent = `${simulation.result.correct} acertos, ${simulation.result.incorrect} erros e ${simulation.result.unanswered} não respondidas — ${simulation.result.percent}%.`;
    } else {
      resultBox.hidden = true;
      resultBox.textContent = '';
    }

    questionList.replaceChildren();
    for (const question of simulation.questions) {
      const key = simuladoQuestionKey(question);
      const item = document.createElement('li');
      item.className = 'simulado-question';
      const fieldset = document.createElement('fieldset');
      fieldset.disabled = simulation.status === 'completed';
      const legend = document.createElement('legend');
      legend.textContent = question.prompt;
      const options = document.createElement('div');
      options.className = 'simulado-options';
      const stored = simulation.answers[key];

      for (const option of question.options) {
        const label = document.createElement('label');
        label.className = 'simulado-option';
        if (simulation.status === 'completed') {
          if (option.id === question.correctOptionId) label.dataset.correct = 'true';
          if (stored?.optionId === option.id && option.id !== question.correctOptionId) {
            label.dataset.incorrect = 'true';
          }
        }
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `simulado-${key}`;
        input.value = option.id;
        input.checked = stored?.optionId === option.id;
        input.addEventListener('change', async () => {
          if (!alias || busy) return;
          busy = true;
          try {
            const now = new Date().toISOString();
            const saved = await persistSimuladoDocument(alias, documentId, (current) =>
              setSimuladoAnswer(
                current ?? simulation,
                key,
                {
                  optionId: option.id,
                  questionRevision: question.questionRevision,
                },
                now,
              ),
            );
            activeDocument = saved;
            resolverMeta.textContent = `${saved.questions.length} questões · ${Object.keys(saved.answers).length} respondidas · atualizado em ${formatDate(saved.updatedAt)}`;
            await saveSummaryAndScheduleSync(saved);
            setStatus('Resposta salva localmente.');
          } catch (error) {
            setStatus(
              error instanceof Error ? error.message : 'Não foi possível salvar a resposta.',
            );
            renderDocument(activeDocument ?? simulation, documentId);
          } finally {
            busy = false;
          }
        });
        const text = document.createElement('span');
        text.textContent = option.text;
        label.append(input, text);
        options.append(label);
      }

      fieldset.append(legend, options);
      if (simulation.status === 'completed') {
        const explanation = document.createElement('p');
        explanation.className = 'simulado-explanation';
        explanation.textContent = question.explanation;
        fieldset.append(explanation);
      }
      item.append(fieldset);
      questionList.append(item);
    }

    resolverActions.replaceChildren();
    if (simulation.status === 'in_progress') {
      const finalize = document.createElement('button');
      finalize.type = 'button';
      finalize.textContent = 'Finalizar e corrigir';
      finalize.addEventListener('click', async () => {
        if (!alias || busy) return;
        busy = true;
        finalize.disabled = true;
        try {
          const saved = await persistSimuladoDocument(alias, documentId, (current) =>
            finalizeSimuladoDocument(
              current ?? simulation,
              new Date().toISOString(),
            ),
          );
          await saveSummaryAndScheduleSync(saved);
          await renderRecent();
          renderDocument(saved, documentId);
          setStatus('Simulado finalizado e resultado salvo.');
        } catch (error) {
          setStatus(
            error instanceof Error ? error.message : 'Não foi possível finalizar o simulado.',
          );
          finalize.disabled = false;
        } finally {
          busy = false;
        }
      });
      resolverActions.append(finalize);
    }

    const repeat = document.createElement('button');
    repeat.type = 'button';
    repeat.className = 'secondary';
    repeat.textContent = 'Nova tentativa com esta configuração';
    repeat.addEventListener('click', () => {
      void generateFromConfiguration(simulation.configuration);
    });
    resolverActions.append(repeat);
  };

  const generateFromConfiguration = async (
    configuration?: SimuladoConfig,
  ): Promise<void> => {
    if (!alias || busy) return;
    const contest = configuration
      ? catalog?.contests.find(
          (item) => item.storageId === configuration.contestStorageId,
        ) ?? null
      : currentContest();
    const subjectStorageIds = configuration?.subjectStorageIds ?? selectedSubjects();
    const origin =
      configuration?.origin ?? (originSelect.value as SimuladoOriginFilter);
    const questionCount =
      configuration?.questionCount ?? Number.parseInt(countInput.value, 10);
    if (!contest || subjectStorageIds.length === 0 || questionCount < 1) return;

    busy = true;
    updateConfigurationState();
    setStatus('Carregando questões e montando o simulado…');
    try {
      const response = await fetch(
        `/simulados/pool/${encodeURIComponent(contest.storageId)}.json`,
        { cache: 'no-store' },
      );
      if (!response.ok) {
        throw new Error(`Não foi possível carregar o pool de questões (${response.status}).`);
      }
      const pool = simuladoPoolSchema.parse(await response.json());
      const config: SimuladoConfig = {
        contestStorageId: contest.storageId,
        subjectStorageIds,
        origin,
        questionCount,
      };
      const simulationId = crypto.randomUUID();
      const now = new Date().toISOString();
      const questions = drawSimuladoQuestions(pool, config);
      const created = createSimuladoDocument({
        simulationId,
        configuration: config,
        questions,
        now,
      });
      const documentId = buildSimuladoDocumentId(alias, simulationId);
      const saved = await persistSimuladoDocument(
        alias,
        documentId,
        (current) => current ?? created,
      );
      await saveSummaryAndScheduleSync(saved);
      history.pushState(null, '', `/simulados/?id=${encodeURIComponent(simulationId)}`);
      await renderRecent();
      renderDocument(saved, documentId);
      setStatus('Simulado criado e salvo localmente.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Não foi possível gerar o simulado.');
    } finally {
      busy = false;
      updateConfigurationState();
    }
  };

  const loadRequestedDocument = async (): Promise<void> => {
    if (!alias) return;
    const rawId = new URLSearchParams(location.search).get('id');
    if (!rawId) return;
    try {
      const simulationId = validateSimuladoId(rawId);
      const documentId = buildSimuladoDocumentId(alias, simulationId);
      let simulation = await loadSimuladoDocument(documentId);
      if (!simulation && navigator.onLine) {
        setStatus('Buscando o simulado sincronizado…');
        await requestCompleteProfileSync(alias);
        simulation = await loadSimuladoDocument(documentId);
      }
      if (!simulation) throw new Error('Simulado não encontrado para o alias ativo.');
      renderDocument(simulation, documentId);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'ID de simulado inválido.');
    }
  };

  if (aliasWarning) aliasWarning.hidden = Boolean(alias);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    void generateFromConfiguration();
  });
  contestSelect.addEventListener('change', () => {
    const contest = currentContest();
    if (contest) renderSubjects(contest);
  });
  originSelect.addEventListener('change', updateConfigurationState);
  countInput.addEventListener('input', updateConfigurationState);
  selectAllSubjects.addEventListener('change', () => {
    subjectList.querySelectorAll<HTMLInputElement>('[data-subject]').forEach((input) => {
      input.checked = selectAllSubjects.checked;
    });
    selectAllSubjects.indeterminate = false;
    updateConfigurationState();
  });
  document.querySelectorAll<HTMLButtonElement>('[data-quick-count]').forEach((button) => {
    button.addEventListener('click', () => {
      countInput.value = button.dataset.quickCount ?? '10';
      updateConfigurationState();
    });
  });
  window.addEventListener('popstate', () => void loadRequestedDocument());
  window.addEventListener('concursos:profile-changed', () => location.reload());
  window.addEventListener('concursos:simulados-updated', (event) => {
    if ((event as CustomEvent<{ profileId?: string }>).detail?.profileId === alias) {
      void renderRecent();
    }
  });
  window.addEventListener('concursos:simulados-synced', (event) => {
    if ((event as CustomEvent<{ profileId?: string }>).detail?.profileId === alias) {
      void renderRecent();
    }
  });

  void (async () => {
    try {
      const response = await fetch('/simulados/catalog.json', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Não foi possível carregar o catálogo (${response.status}).`);
      }
      catalog = simuladosCatalogSchema.parse(await response.json());
      renderContestOptions(catalog);
      await renderRecent();
      await loadRequestedDocument();
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : 'Não foi possível iniciar os simulados.',
      );
    }
  })();
}

if (typeof document !== 'undefined') initializeSimulados();
