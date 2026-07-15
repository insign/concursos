# Gestão de processos

## Núcleo

- Processo = entradas → atividades de transformação → saídas com valor.
- Gestão de processos = identificar + modelar + analisar + melhorar + implantar + acompanhar.
- Ponta a ponta: do gatilho à entrega, atravessando áreas e sistemas.
- Organograma mostra posições; processo mostra o fluxo do trabalho.
- Otimização local pode piorar o desempenho global.

## Elementos

| Elemento | Pergunta |
| --- | --- |
| Gatilho | o que inicia? |
| Fornecedor | quem fornece? |
| Entrada | o que será transformado? |
| Atividade | que trabalho transforma? |
| Saída | o que é entregue? |
| Usuário/cliente | quem recebe ou usa? |
| Regra | o que condiciona? |
| Recurso | o que viabiliza? |
| Limite | onde começa e termina? |
| Proprietário | quem responde ponta a ponta? |

- Entrada ≠ recurso.
- Regra ≠ recurso.
- Saída pode abastecer outro processo interno.

## Distinções

| Conceito | Núcleo |
| --- | --- |
| Processo | fluxo recorrente orientado à entrega |
| Função | especialidade ou trabalho semelhante |
| Unidade | componente da estrutura formal |
| Projeto | empreendimento temporário e entrega única |
| Procedimento | método para executar parte do trabalho |
| Sistema | recurso tecnológico de apoio/automação |

- Projeto pode criar ou redesenhar processo.
- Digitalizar não significa melhorar.

## Arquitetura

1. cadeia de valor;
2. macroprocesso;
3. processo;
4. subprocesso;
5. atividade;
6. tarefa.

- Nomes e quantidade de níveis variam entre metodologias.
- Cadeia de valor = visão agregada, não fluxograma operacional.
- Rastreie do valor institucional ao trabalho elementar.

## Classificação

| Tipo | Função |
| --- | --- |
| Primário/finalístico | entrega diretamente ligada à missão |
| Apoio/suporte | fornece condições aos demais processos |
| Gerencial/gestão | dirige, governa, monitora e melhora |

- Finalístico não significa que suporte seja dispensável.
- Critério é relação com a entrega, não posição hierárquica.

## Vertical × horizontal

| Funcional/vertical | Processual/horizontal |
| --- | --- |
| área e especialidade | fluxo e entrega |
| coordenação hierárquica | coordenação transversal |
| desempenho do setor | desempenho ponta a ponta |
| risco de silos | risco de conflito sem governança |

- Gestão por processos não extingue departamentos.
- Funções e processos são perspectivas complementares.

## Papéis

- Patrocinador: prioridade, recursos e remoção de barreiras.
- Proprietário: desempenho, coerência e evolução ponta a ponta.
- Gestor operacional: execução cotidiana.
- Executores: prática, exceções e validação.
- Escritório de processos: método, notação, repositório e capacitação.
- Governança: alinhamento e arbitragem.
- Proprietário não precisa executar tudo nem chefiar todos.
- Escritório não é dono de todos os processos.

## BPM

- BPM = disciplina gerencial contínua.
- BPMN = notação gráfica; não é BPM nem método de melhoria.

Ciclo ampliado:

1. estratégia e arquitetura;
2. identificação e inventário;
3. priorização;
4. descoberta/modelagem AS IS;
5. análise;
6. desenho TO BE;
7. implementação;
8. monitoramento;
9. melhoria contínua.

- MGI: planejar, analisar, desenhar, implantar e monitorar.
- Nomes e agrupamento de fases variam.
- Publicar diagrama não encerra a gestão.

## Inventário e prioridade

Inventário: nome + objetivo + limites + usuário + saída + dono + classificação + criticidade + relações.

Priorizar por:

- valor público e usuário;
- estratégia;
- risco e obrigação legal;
- volume, custo e tempo;
- erro, retrabalho e reclamação;
- dependências;
- viabilidade.

## AS IS e TO BE

- AS IS = prática real atual, com espera, exceção e retrabalho.
- TO BE = estado futuro viável, com regras, papéis, medidas e transição.
- Norma isolada não prova o AS IS.
- TO BE sem implementação é desejo, não mudança.
- Validar com executores, dono, fornecedores, receptores e especialistas.

## Ferramentas

| Ferramenta | Uso |
| --- | --- |
| Cadeia de valor | visão institucional agregada |
| SIPOC | fornecedor, entrada, processo, saída, cliente |
| Fluxograma | sequência e decisões simples |
| BPMN | processo/colaboração com notação padronizada |
| Ficha | objetivo, escopo, regras, papéis e medidas |

- SIPOC não detalha exceções.
- Fluxograma não substitui análise.
- BPMN não prova automação.

## BPMN essencial

| Elemento | Lembrete |
| --- | --- |
| Pool | participante da colaboração |
| Lane | subdivisão para organizar atividades |
| Evento | algo acontece: início, intermediário ou fim |
| Atividade | trabalho atômico ou composto |
| Tarefa | atividade atômica |
| Subprocesso | atividade com fluxo interno |
| Gateway | controla divergência/convergência |
| Sequência | ordem dentro do processo/pool |
| Mensagem | comunicação entre pools |

- Lane não é obrigatoriamente departamento.
- Sequência cruza lanes, não cruza pool.
- Mensagem conecta pools distintos, não objetos do mesmo pool.
- XOR: uma alternativa.
- AND: caminhos paralelos.
- OR: uma ou mais alternativas.
- Gateway não executa trabalho.

## Análise

| Conceito | Núcleo |
| --- | --- |
| Gargalo | capacidade limita o todo |
| Handoff | transferência entre participantes |
| Fila | itens esperando |
| Tempo de ciclo | início ao fim, inclui espera |
| Processamento | tempo de trabalho efetivo |
| Capacidade | itens por período |
| Retrabalho | repetir/corrigir trabalho |
| Causa raiz | fator subjacente |

- Handoff favorece espera e perda de informação.
- Sintoma ≠ causa.
- Atividade obrigatória pode não agregar valor percebido e ainda ser necessária.

## Medidas

- Tempo: ciclo, fila, prazo.
- Custo: por demanda ou entrega.
- Qualidade: erro, devolução, retrabalho.
- Volume: entradas, saídas, estoque.
- Capacidade/produtividade: itens por período ou recurso.
- Quantidade isolada não prova bom processo.

## Transformação

- Padronizar: reduzir variação indevida; não congelar.
- Simplificar: remover carga e etapa desnecessárias.
- Automatizar: apoiar atividade com tecnologia.
- Melhorar: ajustar incrementalmente.
- Redesenhar: alterar substancialmente o fluxo.
- Reengenharia: transformação radical.
- Automatizar processo ruim acelera burocracia e erro.
- Software ou diagramas não provam maturidade.

## Lei nº 14.129/2021

- Eficiência por desburocratização, inovação, transformação digital e participação.
- Tecnologia deve otimizar processos.
- Simplificação, integração e interoperabilidade.
- Eliminar exigência cujo custo supere o risco.
- Não exigir prova de fato já comprovado por informação válida.
- Manter atendimento presencial quando necessário.
- Identificar etapas, acompanhar entrega e medir satisfação.
- Aplicação direta federal; demais entes somente com adoção por ato normativo próprio.

## Pegadinhas

- Processo ≠ setor.
- Processo ≠ projeto.
- Procedimento ≠ fluxo inteiro.
- BPM ≠ BPMN.
- AS IS ≠ fluxo ideal.
- TO BE ≠ mudança implantada.
- Pool ≠ lane.
- Gateway ≠ atividade.
- Fila ≠ trabalho concluído.
- Tempo de ciclo inclui espera.
- Automação ≠ simplificação.
