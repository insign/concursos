# Gestão de processos

## Comece pela entrega ao usuário

**Processo:** atividades relacionadas transformam entradas em saídas para um destinatário. Recursos viabilizam; regras condicionam. **Instância:** cada caso; **modelo:** representação do fluxo. **Procedimento:** modo de executar uma atividade; **projeto:** esforço temporário para entrega única; sistema informatizado apenas apoia o processo.

**Ponta a ponta:** delimite demanda e entrega; meta de unidade pode piorar a espera total. Cadeia de valor reúne entregas da missão. Decomposição didática: macroprocesso → processo → subprocesso → atividade → tarefa, sem nomenclatura universal.

| Papel do processo | Critério |
| --- | --- |
| Primário ou finalístico | Entrega ligada diretamente à missão e ao destinatário externo, mesmo com etapas internas. |
| Apoio | Provê recursos e capacidades aos demais. |
| Gerencial | Orienta, mede e ajusta o conjunto. |

## Disciplina, papéis e ciclo

<abbr title="Business Process Management, gerenciamento de processos de negócio">BPM</abbr> é a **gestão contínua** de processos, informatizados ou não. <abbr title="Business Process Model and Notation, notação para representar processos">BPMN</abbr> é **notação**; <abbr title="Business Process Management Suite, suíte tecnológica de gestão de processos">BPMS</abbr> é **suíte de software** que pode orquestrar etapas e acompanhar instâncias; fluxo de trabalho ou <abbr title="encaminhamento de tarefas conforme regras definidas">workflow</abbr> descreve o encaminhamento. Nenhum desenho aprovado implementa mudança por si.

| Etapa didática do ciclo | Pergunta decisiva |
| --- | --- |
| Planejamento e estratégia | Que resultado, escopo, prioridade e responsabilidade? |
| Análise | Como funciona **hoje**, com dados e participantes? |
| Desenho e modelagem | Como deveria funcionar e como representar? |
| Implementação | Quem muda normas, sistemas, responsabilidades e rotinas? |
| Monitoramento e controle | A entrega melhorou dentro dos limites esperados? |
| Refinamento | O que aprender e ajustar no ciclo seguinte? |

A sequência pode variar por referencial. <abbr title="as is, estado atual observado do processo">AS IS</abbr> exige validar a prática. <abbr title="to be, estado futuro proposto do processo">TO BE</abbr> exige viabilidade jurídica, recursos, transição e acompanhamento para virar resultado.

**Patrocinador:** apoio e recursos. **Dono:** desempenho completo e articulação, sem executar tudo. **Gestor:** operação. **Analista:** modelagem e investigação. **Escritório:** método e prioridades. A matriz <abbr title="Responsible, Accountable, Consulted, Informed: executa, responde, é consultado, é informado">RACI</abbr> distingue quem **executa** (<abbr title="Responsible, pessoa que executa">R</abbr>), **responde** (<abbr title="Accountable, pessoa responsável pela entrega">A</abbr>), **é consultado** (<abbr title="Consulted, pessoa que contribui">C</abbr>) e **é informado** (<abbr title="Informed, pessoa que recebe informação">I</abbr>). A matriz gerencial não transfere competência legal.

## Representar somente o detalhe útil

<abbr title="Supplier, Input, Process, Output, Customer: fornecedor, entrada, processo, saída, cliente">SIPOC</abbr> delimita fronteiras e participantes; **fluxograma** mostra sequência e decisões. Diagrama simples, mapa de relações e modelo mais detalhado servem a propósitos diversos, sem escala universal rígida.

| Elemento <abbr title="Business Process Model and Notation, notação para representar processos">BPMN</abbr> | Leitura |
| --- | --- |
| Evento / atividade | Acontecimento de início, meio ou fim / trabalho. |
| <abbr title="ponto que divide ou reúne caminhos do fluxo">Gateway</abbr> | Exclusivo escolhe alternativa; paralelo abre caminhos simultâneos e pode sincronizá-los. |
| Fluxo de sequência / mensagem | Ordem **dentro de um participante** / comunicação **entre participantes**. |
| <abbr title="participante representado no modelo">Pool</abbr> / <abbr title="subdivisão de um participante por papel ou unidade">lane</abbr> | Participante / faixa que evidencia responsável e transferência. Sequência não cruza pools. |
| Subprocesso | Encapsula detalhes quando o nível geral precisa permanecer legível. |

**Tarefa de usuário:** pessoa com aplicativo, execução gerenciada pelo motor. **Tarefa manual:** sem auxílio ou gerenciamento do motor, ainda que o fluxo inclua partes automatizadas. **Tarefa de serviço:** automática. Diagrama não vira executável sozinho.

## Analise a restrição real

| Sinal | Diagnóstico |
| --- | --- |
| Gargalo | Etapa cuja capacidade limita a vazão, não necessariamente a de maior custo. Se entram 15 casos/dia e saem 10, a fila cresce em 5/dia, mantidas as condições. |
| Transferência (<abbr title="passagem de trabalho ou informação entre pessoas, equipes ou sistemas">handoff</abbr>) | Pode gerar espera e perda de informação, mas também ser necessária à especialização ou separação de funções incompatíveis. |
| Retrabalho | Trabalho repetido por falha, distinto de qualquer transferência. |
| <abbr title="tempo total entre demanda e entrega, inclusive esperas">Lead time</abbr> / <abbr title="tempo de trabalho efetivo sobre o caso">touch time</abbr> | Prazo total / tempo efetivo; <abbr title="duração de ciclo cujo marco varia segundo o referencial">cycle time</abbr> exige definição dos marcos pelo enunciado. |

Compare tempo total, pendências, custo, qualidade e conformidade. Separe valor ao usuário, necessidade de administração ou legalidade e desperdício: simplifique exigência legal sem suprimir garantia.

**Melhoria:** investigue causa; padronize, simplifique, automatize o fluxo adequado ou redesenhe. **Reengenharia** propõe mudança radical; automatizar processo ruim acelera desperdício. Pareto prioriza categorias; Ishikawa e cinco porquês levantam hipóteses causais; simulação depende de dados. <abbr title="Plan, Do, Check, Act: planejar, executar, verificar e agir">PDCA</abbr>, Lean (desperdícios) e Seis Sigma (variação) são pontes com qualidade.

**Mineração de processos:** registros de eventos ligados a casos revelam fluxo, conformidade e melhorias. **Mineração de tarefas:** passos em aplicações. Registros não explicam sozinhos causas ou validade normativa.

## Limite público

Valor público combina entrega, legalidade, transparência, acessibilidade e proteção de dados. A Lei nº 14.129/2021 orienta simplificação e Governo Digital; para **demais entes federados**, a aplicação de seus comandos depende da adoção por atos normativos próprios (art. 2º, III). Não presuma aplicação automática ao <abbr title="Tribunal de Contas do Estado do Maranhão">TCE/MA</abbr>, nem elimine atendimento necessário por digitalizar o fluxo.

**Em questão:** delimite entrega → diferencie processo, modelo e caso → identifique papel e etapa do ciclo → encontre espera e restrição → escolha mudança viável → confira resultado completo.
