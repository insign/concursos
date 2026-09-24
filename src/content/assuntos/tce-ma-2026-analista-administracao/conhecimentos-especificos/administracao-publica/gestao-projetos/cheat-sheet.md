# Gestão de projetos

## Escolha primeiro a unidade e o efeito

| Pergunta | Recuperação |
| --- | --- |
| Há começo e fim e uma entrega singular? | **Projeto**; temporário não significa breve, nem singular exige novidade absoluta. |
| O trabalho sustenta continuamente a entrega? | **Operação**. O produto pode sobreviver ao projeto. |
| Componentes relacionados produzem benefícios coordenados? | **Programa**; não é projeto grande. |
| Componentes são escolhidos pelos objetivos estratégicos? | **Portfólio**; não exige relação técnica entre eles e pode incluir operações. |

**Entrega → resultado do uso → benefício mensurável → valor público.** Portal implantado não prova adoção nem redução do tempo de atendimento; prazo, custo e escopo não bastam para inferir valor. O caso de negócio (*business case*: justificativa da escolha entre alternativas, custos, riscos e benefícios) apoia a decisão; o termo de abertura <abbr title="Termo de Abertura do Projeto">TAP</abbr> autoriza o projeto e designa autoridade ao gerente; o plano de benefícios define indicador, responsável e momento de mensuração, inclusive após o encerramento.

| Decisão | Quem/qual referência |
| --- | --- |
| Direção, prioridades, alçadas e supervisão | Governança; patrocinador apoia recursos e decisões acima da alçada do gerente. |
| Integração e execução | Gerente e equipe, dentro das alçadas. Cliente/representante autorizado pode aceitar; usuário utiliza. |
| Medir desvio sem apagá-lo | Linha de base: versão aprovada de escopo, cronograma ou custo; mudança pede controle formal. |
| Estruturar apoio | <abbr title="Escritório de Gerenciamento de Projetos">EGP</abbr>/<abbr title="Project Management Office">PMO</abbr> de suporte aconselha (baixo controle); de controle exige conformidade (moderado); diretivo gerencia diretamente (alto). |

O Decreto nº 9.203/2017 descreve **liderança, estratégia e controle** e o ciclo **avaliar, direcionar e monitorar** na administração pública **federal** abrangida; não estenda automaticamente suas obrigações ao tribunal estadual.

## Abordagem, ciclo e edição

**Fases** organizam entregas do início à conclusão; **grupos de processos** organizam atividades gerenciais e podem repetir-se em várias fases. Preditiva detalha cedo requisitos estáveis; iterativa refina; incremental soma parcelas utilizáveis; adaptativa aprende e replaneja frequentemente; híbrida combina deliberadamente abordagens. *Tailoring* (adaptação consciente ao contexto) preserva controles e exigências legais.

| Fonte identificada no enunciado | Estrutura a recuperar |
| --- | --- |
| <abbr title="Project Management Body of Knowledge">PMBOK</abbr> 6ª edição (2017) | **49 processos, cinco grupos, dez áreas:** integração, escopo, cronograma, custos, qualidade, recursos, comunicações, riscos, aquisições e partes interessadas. |
| <abbr title="Project Management Body of Knowledge">PMBOK</abbr> 7ª edição (2021) | **12 princípios, oito domínios:** partes interessadas, equipe, abordagem/ciclo de vida, planejamento, trabalho, entrega, medição e incerteza. Ênfase em valor e adaptação; processos não foram proibidos. |
| <abbr title="Project Management Body of Knowledge">PMBOK</abbr> 8ª edição (novembro de 2025) | **Seis princípios, sete domínios, cinco áreas de foco.** Princípios: visão holística, valor, qualidade, liderança responsável, sustentabilidade, autonomia com responsabilidade; domínios: governança, escopo, cronograma, finanças, partes interessadas, recursos e riscos; focos: iniciação, planejamento, execução, monitoramento/controle e encerramento. |
| *Process Groups: A Practice Guide* (2022) | **49 processos, cinco grupos** na orientação preditiva, documento separado. |

A <abbr title="International Organization for Standardization">ISO</abbr> 21502:2020 oferece **diretrizes** de projetos para organizações e abordagens diversas, sem prescrever método único nem detalhar programas e portfólios. Não atribua à 8ª edição as dez áreas da 6ª, nem transforme foco/grupo em fase. A edição técnica depende da fonte da questão; a 8ª já fora publicada antes do edital de julho de 2026.

## Escopo, prazo e custo: perguntas decisivas

| Se a questão pede... | Critério |
| --- | --- |
| Funções da entrega × trabalho necessário | Escopo do **produto** × escopo do **projeto**. |
| Decomposição de entregas | <abbr title="Estrutura Analítica do Projeto">EAP</abbr> ou <abbr title="Work Breakdown Structure">WBS</abbr>: regra dos **100%** sem omissão/duplicação; nível inferior = pacote de trabalho. Declaração aprovada + estrutura + dicionário constituem a linha de base tradicional do escopo. Não é cronograma, organograma nem lista de atividades. |
| Aceitação × inspeção | Validar escopo = aceite formal; controlar qualidade = conformidade técnica. Planejar qualidade estabelece requisitos; gerenciar melhora o processo; controlar verifica resultados. Grau de sofisticação não define qualidade. |
| Alteração | Registrar → analisar impacto integrado → decidir pela autoridade → atualizar referências se aprovada → comunicar/implementar. Solicitação não é aprovação; configuração controla versões e características. |
| Sequência | Marco = duração zero. Término–início <abbr title="Término–início">TI</abbr>: sucessora inicia após término; término–término <abbr title="Término–término">TT</abbr>: termina após término; início–início <abbr title="Início–início">II</abbr>: inicia após início; início–término <abbr title="Início–término">IT</abbr>: termina após início, ressalvadas antecipação (*lead*) e espera (*lag*). |
| Estimação | Análoga usa similar; paramétrica usa relação quantitativa; *bottom-up* estima partes detalhadas e agrega. |

<abbr title="Program Evaluation and Review Technique">PERT</abbr>, na aproximação de três pontos, usa otimista $O$, mais provável $M$ e pessimista $P$:

$$
TE=\frac{O+4M+P}{6},\qquad \sigma=\frac{P-O}{6},\qquad \sigma^2=\left(\frac{P-O}{6}\right)^2
$$

<abbr title="Tempo Esperado">TE</abbr> e $\sigma$ usam unidade de tempo; variância usa unidade ao quadrado. Média triangular é $(O+M+P)/3$. **Caminho crítico**: sequência mais longa na rede, que determina a menor duração calculada; folga total usualmente zero, pode haver mais de um e pode mudar. Folga total preserva o término do projeto; folga livre preserva o início mais cedo da sucessora. Nivelamento adequa datas à disponibilidade e pode alongar o prazo; *crashing* adiciona recursos com maior custo; *fast tracking* sobrepõe atividades com maior risco de retrabalho. Acelerar caminho não crítico pode não alterar o fim.

A reserva de **contingência** cobre riscos identificados e entra na linha de base de custos; a **gerencial** atende imprevisto no escopo e fica fora da linha de base, embora no orçamento total. No gerenciamento do valor agregado, a comparação usa uma mesma data:

| Símbolo em fórmula | O que mede |
| --- | --- |
| <abbr title="Planned Value">PV</abbr> ou <abbr title="Valor Planejado">VP</abbr> | Orçamento do trabalho planejado. |
| <abbr title="Earned Value">EV</abbr> ou <abbr title="Valor Agregado">VA</abbr> | Orçamento do trabalho **concluído**, não gasto nem benefício. |
| <abbr title="Actual Cost">AC</abbr> ou <abbr title="Custo Real">CR</abbr> | Custo efetivamente incorrido. |

$$
CV=EV-AC,\qquad SV=EV-PV,\qquad CPI=\frac{EV}{AC},\qquad SPI=\frac{EV}{PV}
$$

<abbr title="Cost Variance">CV</abbr> e <abbr title="Schedule Variance">SV</abbr> positivos, ou <abbr title="Cost Performance Index">CPI</abbr> e <abbr title="Schedule Performance Index">SPI</abbr> acima de 1, favorecem custo e prazo, respectivamente (denominadores não nulos). <abbr title="Schedule Variance">SV</abbr> é **dinheiro**, não dias; ao finalizar todo o escopo, pode zerar apesar de atraso. A previsão final depende da hipótese:

$$
EAC=\frac{BAC}{CPI}\quad\text{se a eficiência observada continuar};\qquad
EAC=AC+(BAC-EV)\quad\text{se o desvio passado não se repetir}
$$

<abbr title="Estimate at Completion">EAC</abbr> é estimativa no término; <abbr title="Budget at Completion">BAC</abbr> é orçamento da linha de base no término; $ETC=EAC-AC$ estima custo restante e $VAC=BAC-EAC$ compara orçamento e custo final projetado. <abbr title="Estimate to Complete">ETC</abbr> e <abbr title="Variance at Completion">VAC</abbr> têm unidade monetária. As duas projeções de <abbr title="Estimate at Completion">EAC</abbr> não são intercambiáveis.

## Riscos, pessoas e contratação

**Risco** é evento/condição incerta (ameaça ou oportunidade); evento ocorrido vira problema atual. Identificar → analisar probabilidade/impacto → priorizar → responder → monitorar. Evitar/mitigar/transferir/aceitar ameaças; explorar/melhorar/compartilhar/aceitar oportunidades. Escalonar se fora da alçada. **Residual** resta após resposta; **secundário** nasce da resposta; **gatilho** sinaliza acionamento. Transferência não elimina a incerteza.

Partes interessadas podem afetar ou ser afetadas; o **registro** conserva informações sobre interesses e influência. Comunicar informação não equivale a engajar para participação. Na matriz <abbr title="Responsible, Accountable, Consulted, Informed">RACI</abbr>, <abbr title="Responsible">R</abbr> executa, <abbr title="Accountable">A</abbr> responde pelo resultado/aprovação, <abbr title="Consulted">C</abbr> é consultado e <abbr title="Informed">I</abbr> é informado; em geral, um único responsável final por atividade.

Contratação gerencial por preço fixo tende a transferir mais risco de custo ao fornecedor; custos reembolsáveis, ao comprador; tempo e materiais combina elementos. Essas categorias não substituem a Lei nº 14.133/2021:

| Documento legal | Função, sem trocar por instrumento gerencial |
| --- | --- |
| <abbr title="Estudo Técnico Preliminar">ETP</abbr> | Necessidade pública e melhor solução; fundamenta elaboração posterior se viável. Não é automaticamente *business case*. |
| <abbr title="Termo de Referência">TR</abbr> | Objeto e condições de aquisição de bens/serviços, execução, gestão, medição, pagamento e valor. Não é o <abbr title="Termo de Abertura do Projeto">TAP</abbr>. |
| Projeto básico | Dimensão técnica da obra ou serviço, suficiente para custos, métodos e prazos. |
| Matriz de riscos | Alocação contratual de riscos e responsabilidades, não todo o registro gerencial de riscos. |

A alta administração responde pela governança da contratação e seu alinhamento; métodos de projeto não ampliam competência legal do gerente.

## Scrum 2020: objetivo, inspeção e adaptação

**Empirismo** usa observação para adaptar; pilares: transparência, inspeção, adaptação. Valores: comprometimento, foco, abertura, respeito, coragem. A equipe é multifuncional e autogerenciável, normalmente com dez pessoas ou menos.

| Responsabilidade | Núcleo |
| --- | --- |
| Product Owner (pessoa, não comitê) | Maximiza valor, gere Product Backlog; pode delegar tarefas sem transferir responsabilidade. |
| Scrum Master | Promove efetividade e remoção de impedimentos; não distribui tarefas como chefe. |
| Developers | Planejam e criam incremento utilizável conforme qualidade requerida. |

| Artefato → compromisso | Como decidir |
| --- | --- |
| Product Backlog → Meta do Produto | Lista emergente e ordenada, única fonte de trabalho da equipe; refinamento é contínuo, não evento formal. |
| Sprint Backlog → Meta da Sprint | Meta + itens selecionados + plano para entregá-los. |
| Incremento → Definição de Pronto | Entrega utilizável conforme medidas de qualidade; pode ser liberada antes da Review. |

Sprint dura **até um mês**. Planning (até **oito horas** em Sprint mensal) decide por quê, o quê e como; Daily Scrum (**15 minutos**, para Developers) inspeciona progresso à meta; Review (até **quatro horas**) inspeciona resultado com interessados e adapta o produto; Retrospective (até **três horas**) melhora modo de trabalho. Sprints menores costumam ter eventos menores. Durante a Sprint não se reduz a qualidade nem se põe a meta em risco; escopo pode ser renegociado com Product Owner. **Só ele cancela a Sprint se a meta ficar obsoleta.** História de usuário, pontos, velocidade, *burndown* e Kanban podem apoiar, mas não são prescritos pelo Guia.

## Fechamento

Dados de desempenho (observações) → informações analisadas → relatórios para decisão; ação corretiva realinha o futuro, preventiva reduz chance de desvio, reparo corrige defeito. Encerrar, mesmo se cancelado: aceite cabível, transição à operação, obrigações contratuais, recursos, arquivo e lições aprendidas. A operação pode acompanhar benefícios posteriores; lições devem ser colhidas durante e consolidadas ao final.
