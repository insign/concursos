---
schemaVersion: 1
title: "Inteligência artificial e automação de serviços públicos"
description: Fundamentos, aplicações, riscos e governança de IA generativa, chatbots e atendimento automatizado no setor público.
order: 33
storageId: ia-automacao-servicos-publicos
---

## 1. O problema antes da tecnologia

Imagine um órgão que recebe milhares de pedidos. Há tarefas de natureza muito diferente: conferir se um campo foi preenchido, encaminhar um processo à unidade competente, estimar risco, redigir uma minuta e responder perguntas do cidadão. **Automatizar** significa usar tecnologia para executar alguma dessas tarefas; usar <abbr title="Inteligência Artificial">IA</abbr> significa acrescentar um sistema capaz de inferir saídas a partir de entradas.

Essa distinção organiza todo o assunto: **nem toda automação usa <abbr title="Inteligência Artificial">IA</abbr> e nem todo uso de <abbr title="Inteligência Artificial">IA</abbr> deve produzir uma decisão administrativa**.

Um bom raciocínio para prova e para gestão pública é:

```text
problema público → processo → dados → tecnologia → efeito → risco → controle
```

A tecnologia vem depois do problema e do processo. Automatizar uma exigência inútil apenas torna o desperdício mais rápido.

### Exemplo-guia

Considere, como exemplo hipotético, um serviço digital que recebe requerimentos de cidadãos.

- uma regra fixa separa pedidos por assunto;
- um modelo estima a fila mais provável;
- um chatbot responde dúvidas;
- um modelo generativo prepara uma minuta;
- um servidor confere a fonte, corrige a minuta e pratica o ato quando competente.

Ao longo do capítulo, use esse fluxo para distinguir **regra**, **modelo**, **sistema**, **serviço** e **decisão**.

---

## 2. Automação, algoritmo e aprendizado de máquina

Uma **automação determinística** executa uma ação previamente definida quando determinada condição ocorre. Se “assunto = tributo” leva sempre à fila fiscal, não é necessário aprendizado de máquina.

Um **algoritmo** é uma sequência de instruções para realizar uma tarefa. Algoritmo, portanto, não é sinônimo de <abbr title="Inteligência Artificial">IA</abbr>.

O <abbr title="Aprendizado de Máquina">ML</abbr>, ou aprendizado de máquina, é uma abordagem em que um modelo ajusta padrões a partir de dados para executar uma tarefa. Em vez de escrever uma regra específica para cada caso, treina-se um modelo para produzir uma classificação, previsão ou outra saída.

| Mecanismo | Como funciona | Exemplo no serviço hipotético |
|---|---|---|
| regra fixa | condição explícita → ação prevista | assunto “tributo” → fila fiscal |
| <abbr title="Automação Robótica de Processos">RPA</abbr> | software reproduz ações em interfaces | copiar dados entre sistemas |
| <abbr title="Aprendizado de Máquina">ML</abbr> | modelo aprende padrões em dados | estimar a fila mais provável |
| <abbr title="Inteligência Artificial">IA</abbr> generativa | modelo produz novo conteúdo | redigir uma minuta |

A <abbr title="Automação Robótica de Processos">RPA</abbr> não é robô físico e não exige <abbr title="Inteligência Artificial">IA</abbr>. Ela pode clicar, copiar, preencher, consultar e mover itens entre sistemas por passos predefinidos. Ainda precisa de credenciais restritas, tratamento de exceções, monitoramento e manutenção.

A <abbr title="Gestão de Processos de Negócio">BPM</abbr>, ou gestão de processos de negócio, olha o processo de forma mais ampla: modela, analisa e melhora o fluxo ponta a ponta. Por isso, <abbr title="Automação Robótica de Processos">RPA</abbr> e <abbr title="Gestão de Processos de Negócio">BPM</abbr> não são estratégias excludentes; uma automação de tarefa pode integrar uma estratégia maior de melhoria do processo.

### Antes de automatizar

Pergunte, nesta ordem:

1. qual problema público será resolvido;
2. quais etapas são realmente necessárias;
3. qual órgão ou agente tem competência;
4. quais exceções existem;
5. quais dados são indispensáveis;
6. qual canal alternativo atende quem não consegue usar o fluxo digital;
7. como será possível corrigir, contestar ou interromper o processo;
8. qual resultado será medido.

---

## 3. Do modelo ao serviço público

Um erro frequente é tratar “o modelo” como se fosse todo o sistema.

- **modelo:** componente treinado que produz uma saída, como classificação, previsão ou texto;
- **sistema de <abbr title="Inteligência Artificial">IA</abbr>:** modelo mais dados, interface, instruções, integrações, usuários, regras e controles;
- **serviço público digital:** sistema inserido em competência, procedimento, prazos, atendimento e mecanismos de revisão;
- **ato administrativo:** manifestação assumida pelo agente ou órgão competente, com os requisitos jurídicos aplicáveis.

Um <abbr title="Grande Modelo de Linguagem">LLM</abbr> pode redigir texto, mas não recebe competência administrativa por isso. No exemplo-guia, a minuta gerada é apenas um insumo até que seja validada e assumida por quem pode decidir.

### O efeito importa mais do que o rótulo

A saída tecnológica pode cumprir papéis diferentes:

| Papel | O que acontece |
|---|---|
| apoio | a pessoa usa a saída como insumo |
| triagem | o sistema ordena ou encaminha casos |
| recomendação | o sistema sugere uma ação |
| decisão | a saída produz ou determina efeito administrativo |

Chamar uma saída de “recomendação” não reduz o risco se, na prática, ela for seguida automaticamente. Quanto maior o efeito sobre benefício, sanção, prioridade, fiscalização ou serviço essencial, maior deve ser a robustez de dados, testes, explicação, supervisão, segurança e contestação.

---

## 4. <abbr title="Inteligência Artificial">IA</abbr> generativa e modelos de linguagem

A <abbr title="Inteligência Artificial">IA</abbr> generativa produz conteúdo novo — texto, imagem, áudio, vídeo ou código — a partir de padrões aprendidos.

Um <abbr title="Grande Modelo de Linguagem">LLM</abbr> processa unidades chamadas **tokens**, aprende relações estatísticas durante o treinamento e, na **inferência**, gera uma saída para uma nova entrada. Ele não é, por natureza, uma base oficial de normas nem garante verdade, atualidade ou completude.

### Conceitos que a prova pode separar

| Conceito | Significado operacional |
|---|---|
| token | unidade de processamento; pode ser palavra, parte de palavra ou símbolo |
| treinamento | ajuste de parâmetros do modelo com dados e objetivo |
| ajuste fino | treinamento adicional para adaptar o modelo a tarefa ou domínio |
| inferência | uso do modelo treinado para produzir nova saída |
| janela de contexto | quantidade limitada de informação considerada em uma interação |
| temperatura | parâmetro que influencia a variabilidade da geração |

Diminuir a temperatura pode tornar as respostas menos variadas, mas **não transforma plausibilidade em verdade**.

### Contexto não é necessariamente treinamento

Fornecer um documento durante uma interação não significa, por si só, retreinar os parâmetros do modelo. Entretanto, retenção, armazenamento e eventual reúso das entradas dependem do contrato, da configuração, da política do fornecedor e do ambiente institucional. Por isso, ferramenta pública ou gratuita não deve ser presumida confidencial.

---

## 5. Prompt, alucinação e verificação

**Prompt** é a instrução e o contexto fornecidos ao sistema. Um prompt melhor reduz ambiguidade; não substitui fonte nem revisão.

No exemplo-guia, uma instrução adequada poderia limitar a tarefa à norma e à Carta de Serviços fornecidas, exigir indicação da fonte e ordenar que o sistema declare insuficiência de base em vez de inventar requisito.

Uma **alucinação** ocorre quando a saída parece plausível, mas é falsa, não tem suporte, contradiz a fonte ou inventa uma citação. Fluência e tom confiante não comprovam correção.

Pedir ao mesmo modelo que “confirme” a própria resposta pode ajudar a detectar inconsistências, mas não equivale a verificação independente. Para um uso administrativo relevante, confronte a saída com norma vigente, processo, sistema oficial, base institucional ou revisão humana competente.

### Padrões de prompt que podem aparecer em prova

Esses nomes descrevem **como o exemplo é fornecido no prompt**, não uma nova fase de treinamento do modelo:

| Padrão | Ideia central |
|---|---|
| <abbr title="Prompt sem exemplos demonstrativos da tarefa">zero-shot</abbr> | a instrução pede a tarefa sem apresentar exemplo |
| <abbr title="Prompt com poucos exemplos demonstrativos da tarefa">few-shot</abbr> | alguns exemplos orientam o formato ou padrão esperado |
| <abbr title="Prompt que solicita decomposição do problema em etapas intermediárias">chain-of-thought</abbr> | a instrução induz resolução em etapas |
| <abbr title="Decomposição em etapas sem exemplos demonstrativos prévios">zero-shot chain-of-thought</abbr> | combina ausência de exemplos com pedido de decomposição |

Essas técnicas podem orientar a geração, mas **não tornam a resposta verdadeira nem dispensam fonte e validação**.

---

## 6. <abbr title="Geração Aumentada por Recuperação">RAG</abbr>: responder com acervo institucional

A <abbr title="Geração Aumentada por Recuperação">RAG</abbr> combina três etapas:

```text
buscar trechos → colocar trechos no contexto → gerar a resposta
```

Ela pode aproximar o modelo de um acervo institucional sem alterar seus parâmetros a cada pergunta. Isso facilita atualização e citação de fontes, mas não elimina erros.

No serviço hipotético, um chatbot pode buscar a Carta de Serviços e uma norma antes de responder. Ainda assim, é preciso conferir:

- se o documento recuperado é o correto;
- se está vigente;
- se o trecho realmente sustenta a afirmação;
- se o índice foi atualizado;
- se a fonte contém instrução maliciosa;
- se o sistema sabe responder que não encontrou fundamento.

**Fonte autêntica e revogada continua sendo fonte inadequada para orientar o cidadão.**

A <abbr title="Geração Aumentada por Recuperação">RAG</abbr> não é ajuste fino: recuperar documentos para o contexto é diferente de alterar os parâmetros do modelo.

---

## 7. Chatbots e atendimento automatizado

**Chatbot** descreve uma interface de conversa, não uma tecnologia única. Ele pode funcionar por menus e regras, recuperar respostas cadastradas, interpretar linguagem, gerar conteúdo ou combinar essas técnicas.

O controle necessário depende principalmente do que o chatbot pode fazer:

| Função | Risco dominante | Controle central |
|---|---|---|
| informar requisito geral | fonte desatualizada | fonte oficial vigente |
| orientar caso concreto | orientação inadequada | finalidade, limites e revisão |
| mostrar informação pessoal | exposição indevida | autenticação e autorização |
| protocolar manifestação | perda ou duplicidade | confirmação e integridade |
| alterar cadastro | ação indevida | autorização, confirmação e registro |
| recomendar prioridade | desigualdade ou erro | critérios, teste e revisão |
| produzir decisão | efeito jurídico indevido | competência e salvaguardas reforçadas |

O usuário precisa saber, de modo compreensível, que interage com automação, qual é a finalidade, quais são os limites, se houve protocolo ou transação, quem responde pelo serviço e como obter atendimento humano, correção ou contestação.

### Acessibilidade e continuidade

Atendimento automatizado deve funcionar para diferentes pessoas e condições de uso: leitor de tela, teclado, dispositivo móvel, conexão limitada, linguagem simples, pessoas com deficiência e pessoas com baixo letramento digital.

Quando o sistema não compreende a solicitação, não encontra fonte ou identifica risco, o comportamento seguro é um **fallback**, isto é, uma rota alternativa: informar a limitação, não inventar e encaminhar o caso ao canal adequado preservando apenas o contexto necessário.

---

## 8. Responsabilidade, transparência e supervisão humana

A ferramenta não adquire competência administrativa. O órgão e os agentes continuam responsáveis pela finalidade pública, pela base normativa, pelos fatos, pela motivação, pela versão final e pelos efeitos produzidos. Contratar um fornecedor não transfere esses deveres estatais.

### Três perguntas diferentes

- **transparência:** o cidadão entende que há automação, para que ela serve, quais dados e limites importam e quem responde pelo serviço?
- **explicabilidade:** é possível apresentar os fatores, fontes, critérios ou etapas relevantes para compreender a saída?
- **rastreabilidade:** existem registros proporcionais que permitam reconstruir versão, entrada relevante, fonte, saída, intervenção e decisão final?

Explicabilidade não significa necessariamente divulgar código-fonte, segredo comercial ou detalhe que crie novo risco.

### Supervisão humana efetiva

| Arranjo | Participação humana |
|---|---|
| <abbr title="Pessoa intervém antes de o sistema produzir efeito operacional">human-in-the-loop</abbr> | revisão antes do efeito |
| <abbr title="Pessoa monitora o sistema e pode intervir durante a operação">human-on-the-loop</abbr> | monitoramento com poder de intervenção |
| <abbr title="Não há intervenção humana operacional no caso individual">human-out-of-the-loop</abbr> | operação sem intervenção no caso |

A presença formal de uma pessoa não basta. Supervisão efetiva exige informação, tempo, capacitação, acesso à fonte e poder real de discordar, corrigir ou interromper. Se alguém recebe centenas de recomendações e apenas confirma todas em segundos, existe **viés de automação** e a revisão pode ser apenas aparente.

---

## 9. Equidade, dados pessoais e <abbr title="Lei Geral de Proteção de Dados Pessoais">LGPD</abbr>

Modelos aprendem com dados e podem reproduzir desigualdades presentes no conjunto de treinamento ou no desenho do serviço. Riscos surgem, por exemplo, de grupos sub-representados, rótulos incorretos, variáveis que funcionam como aproximação indireta de atributo sensível, exclusão digital ou ciclos de retroalimentação.

Acurácia média alta não demonstra tratamento equitativo. Quando legítimo e necessário, a avaliação pode comparar falsos positivos, falsos negativos, encaminhamentos, abandono e outros efeitos entre grupos.

Na <abbr title="Lei Geral de Proteção de Dados Pessoais">LGPD</abbr>, princípios como finalidade, adequação, necessidade, transparência, segurança, prevenção, não discriminação e prestação de contas continuam relevantes para sistemas automatizados.

### Art. 20 da <abbr title="Lei Geral de Proteção de Dados Pessoais">LGPD</abbr>

O titular pode solicitar revisão de decisões tomadas **unicamente com base em tratamento automatizado de dados pessoais** que afetem seus interesses. Também pode pedir informações claras e adequadas sobre critérios e procedimentos utilizados, observados os segredos comercial e industrial protegidos.

A redação vigente do art. 20 não exige expressamente que a revisão seja feita por pessoa natural. Isso não impede que uma revisão humana efetiva seja adotada como salvaguarda quando o risco do caso justificar.

---

## 10. Segurança: dados, instruções maliciosas e agentes

Informação pública, dado pessoal, informação interna, dado sensível, documento sigiloso e credencial não recebem o mesmo tratamento. O ponto de partida é a política institucional e o regime jurídico aplicável, com minimização, controle de acesso e ambiente autorizado.

Nunca presuma que uma ferramenta externa é adequada apenas porque é gratuita ou popular. Senhas, chaves e segredos não devem ser usados como contexto comum; dados pessoais, sensíveis ou sigilosos exigem avaliação e controles compatíveis.

### <abbr title="Ataque que tenta fazer o sistema obedecer a instruções maliciosas em vez das regras legítimas">prompt injection</abbr>

O ataque pode ser:

- **direto:** o usuário envia a instrução maliciosa;
- **indireto:** a instrução está escondida em documento, página ou mensagem recuperada pelo sistema.

Um documento recuperado deve ser tratado como **dado**, não como nova autoridade para dar comandos ao sistema. Controles úteis incluem menor privilégio, lista fechada de ferramentas, validação de parâmetros, confirmação antes de ações sensíveis, limites de quantidade ou valor, registros e capacidade de interrupção.

### Agentes e ferramentas

Há uma diferença crescente de capacidade:

```text
chatbot → assistente com busca → assistente com ferramentas → agente
```

Um agente pode planejar etapas e acionar ferramentas. Quanto maior a autonomia, maior deve ser o controle sobre autenticação, autorização por operação, confirmação, limites, registro, reversão e supervisão. Gerar uma instrução não é autorização para executá-la.

---

## 11. Governança do ciclo de vida

Governança de <abbr title="Inteligência Artificial">IA</abbr> não termina na implantação. O ciclo é contínuo:

```text
problema → finalidade → inventário → avaliação de impacto →
desenvolvimento/contratação → testes → produção → monitoramento →
incidente ou mudança → correção, restrição ou desativação
```

Um inventário útil registra finalidade, área responsável, fornecedor, modelo e versão, dados, integrações, usuários, efeitos, risco, controles e data de reavaliação.

Uma avaliação de impacto algorítmico pode examinar direitos afetados, grupos expostos, dados, erros previsíveis, explicabilidade, contestação, segurança e risco residual. Ela não substitui o <abbr title="Relatório de Impacto à Proteção de Dados Pessoais">RIPD</abbr>, a análise de segurança, a auditoria ou a decisão administrativa competente.

Na contratação, “<abbr title="Inteligência Artificial">IA</abbr>” não pode virar caixa-preta contratual. Conforme o caso, o instrumento deve delimitar finalidade, dados, retenção, subcontratação, segurança, registros, testes, métricas, incidentes, auditoria, portabilidade, reversibilidade e mudança de modelo.

### Teste e operação

Antes da produção, teste casos normais e raros, dados ausentes, grupos diferentes, entradas hostis, acessibilidade, permissões, fontes desatualizadas, fallback e intervenção humana.

Depois da implantação, monitore o **serviço real**, não só uma métrica de laboratório. Observe erro, abandono, retrabalho, correção, satisfação, equidade e incidentes.

**Deriva** é a degradação de desempenho quando dados, comportamento, vocabulário, normas ou ambiente mudam. A resposta pode exigir investigação, atualização, restrição, suspensão ou desativação.

---

## 12. Corte normativo para o concurso

O edital foi publicado em **6 de julho de 2026**. Para este assunto, separe o que integra o corte garantido do edital de acontecimentos posteriores.

- Constituição, <abbr title="Lei Geral de Proteção de Dados Pessoais">LGPD</abbr>, Lei nº 13.460/2017 e Lei nº 14.129/2021 já estavam vigentes e fornecem bases gerais relevantes.
- A Portaria <abbr title="Ministério da Gestão e da Inovação em Serviços Públicos">MGI</abbr> nº 3.485/2026 já estava vigente e instituiu uma política de governança de <abbr title="Inteligência Artificial">IA</abbr> **no âmbito institucional que ela própria delimita**. Não é lei geral nacional aplicável indistintamente a todos os órgãos e Poderes.
- O <abbr title="Projeto de Lei">PL</abbr> nº 2.338/2023 continua sendo **projeto de lei**, em tramitação na Câmara dos Deputados. Não o trate como lei vigente.
- A Portaria <abbr title="Secretaria de Governo Digital">SGD</abbr>/<abbr title="Ministério da Gestão e da Inovação em Serviços Públicos">MGI</abbr> nº 5.921/2026 foi publicada após o edital e entrou em vigor em **1º de setembro de 2026**. Ela altera um modelo específico de contratação para órgãos e entidades do <abbr title="Sistema de Administração dos Recursos de Tecnologia da Informação">SISP</abbr>; por ser posterior ao edital, não deve ser confundida com norma abrangida automaticamente pelo corte de 6/7/2026.

A situação acima foi revalidada em **6 de setembro de 2026**. Em prova, primeiro identifique o corte exigido; depois, se a questão trouxer norma posterior expressamente, aplique o enunciado.

---

## 13. Como resolver questões

Quando aparecer um caso de automação no setor público, siga a sequência:

1. **mecanismo:** é regra fixa, <abbr title="Automação Robótica de Processos">RPA</abbr>, <abbr title="Aprendizado de Máquina">ML</abbr> ou <abbr title="Inteligência Artificial">IA</abbr> generativa?
2. **camada:** a questão fala do modelo, do sistema ou do serviço completo?
3. **efeito:** apoio, triagem, recomendação ou decisão?
4. **dados:** há necessidade, finalidade, autorização e segurança compatíveis?
5. **fonte:** a resposta generativa tem suporte oficial e vigente?
6. **controle:** existe revisão, canal humano, contestação e rastreabilidade proporcionais?
7. **segurança:** ferramentas e ações obedecem a menor privilégio e confirmação?
8. **norma:** qual é o âmbito e qual é a data de vigência em relação ao edital?

### Quatro contrastes que resolvem muitas pegadinhas

- **automação ≠ <abbr title="Inteligência Artificial">IA</abbr>**: regra fixa pode automatizar sem aprender;
- **modelo ≠ sistema**: o risco depende também de dados, interface, integração e processo;
- **fonte autêntica ≠ fonte vigente**: <abbr title="Geração Aumentada por Recuperação">RAG</abbr> pode recuperar norma revogada;
- **humano presente ≠ supervisão efetiva**: revisão exige tempo, informação e poder real de intervenção.
