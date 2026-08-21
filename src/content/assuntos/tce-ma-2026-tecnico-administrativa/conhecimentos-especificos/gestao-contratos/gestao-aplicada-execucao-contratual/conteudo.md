---
schemaVersion: 1
title: "Gestão aplicada da execução contratual: cláusulas, indicadores de nível de serviço, fiscalizador, preposto e acompanhamento"
description: "Cláusulas e indicadores de nível de serviço, atuação do fiscalizador, papel do preposto e rotinas de acompanhamento da execução contratual."
order: 110
storageId: tec-gestao-aplicada-execucao
---

# Gestão aplicada da execução contratual

## 1. Delimitação do assunto

O edital do **Cargo 16 — Técnico Estadual de Controle Externo, Especialidade Técnico-Administrativa** exige, em Gestão de Contratos, o estudo aplicado de:

- cláusulas e indicadores de nível de serviço;
- papel do fiscalizador do contrato;
- papel do preposto da contratada;
- acompanhamento da execução contratual.

A base normativa central é a **Lei nº 14.133/2021**, especialmente os arts. 6º, XXIII, 92, 115, 117, 118, 119 e 123. O foco aqui não é repetir todo o regime jurídico dos contratos administrativos, mas transformar obrigações contratuais em acompanhamento verificável.

> **Corte de prova:** legislação vigente em **6 de julho de 2026**, data do Edital nº 1 do TCE/MA. A versão consolidada do edital, com as retificações disponíveis até 29 de julho de 2026, foi usada para confirmar o recorte programático. Consultas posteriores servem à conferência editorial e não deslocam o corte jurídico.

A lógica do assunto pode ser resumida assim:

```text
obrigação contratual
→ critério ou indicador
→ evidência
→ comparação com a meta
→ registro
→ correção ou encaminhamento
→ acompanhamento da providência
```

## 2. Da cláusula contratual ao resultado verificável

### 2.1 Cláusulas relevantes para a execução

O art. 92 da Lei nº 14.133/2021 exige cláusulas necessárias em todo contrato. Para a gestão aplicada, merecem destaque as que definem:

- objeto e elementos característicos;
- vinculação ao edital e à proposta;
- legislação aplicável;
- regime de execução ou forma de fornecimento;
- preço e condições de pagamento;
- **critérios e periodicidade da medição**, quando cabível;
- prazos de início, conclusão, entrega e recebimento;
- garantias, quando exigidas;
- direitos, obrigações e responsabilidades das partes;
- modelo de gestão e demais condições necessárias à execução.

O art. 6º, XXIII, reforça essa lógica ao prever que o termo de referência deve conter, entre outros elementos:

| Elemento | Pergunta prática |
|---|---|
| modelo de execução | Como o objeto produzirá o resultado pretendido? |
| modelo de gestão | Como a execução será acompanhada e fiscalizada? |
| critérios de medição e pagamento | Como se comprovará e dimensionará a prestação? |

Uma cláusula útil à fiscalização deve permitir identificar **o que é devido, quando, com qual padrão e como o cumprimento será demonstrado**.

### 2.2 Obrigações claras e critérios objetivos

Compare:

| Redação vaga | Redação controlável |
|---|---|
| “prestar serviço com qualidade” | “resolver chamados críticos no prazo contratual, conforme classificação e fonte de dados definidas” |
| “manter alta disponibilidade” | “manter o serviço disponível no percentual, janela e fórmula previstos no contrato” |
| “entregar relatórios adequados” | “entregar relatório com campos, periodicidade, validação e critérios de aceitação definidos” |

Quanto mais vaga a obrigação, maior o risco de:

- avaliações subjetivas;
- divergências sobre o que foi contratado;
- dificuldade de prova;
- tratamento desigual de situações semelhantes;
- criação informal de exigências durante a execução.

O fiscalizador aplica o contrato: **não pode corrigir uma deficiência do planejamento criando obrigação nova por e-mail, ata ou ordem verbal**.

## 3. Indicadores de nível de serviço

### 3.1 Conceito e finalidade

Indicador de nível de serviço é uma medida usada para acompanhar aspecto relevante do desempenho contratado. Pode medir, conforme o objeto:

- disponibilidade;
- prazo de resposta ou solução;
- quantidade produzida;
- conformidade da entrega;
- taxa de erro;
- continuidade;
- qualidade técnica;
- tempestividade;
- satisfação do usuário, quando pertinente e combinada com critérios objetivos.

A expressão **SLA — Service Level Agreement** costuma designar o compromisso contratual de nível de serviço. Em prova, o essencial é compreender que o nível de serviço deve estar ligado a uma obrigação válida e a critérios previamente definidos.

> **Pegadinha:** indicador não cria obrigação por si só. Ele mede uma obrigação ou resultado já inserido validamente na contratação.

### 3.2 Características de um bom indicador

Um indicador adequado deve ser:

- **relevante** — ligado a resultado importante do objeto;
- **objetivo** — baseado em regra compreensível;
- **mensurável** — passível de cálculo, classificação ou teste;
- **reproduzível** — outra pessoa deve conseguir refazer a apuração;
- **proporcional** — sem complexidade maior que o benefício do controle;
- **auditável** — sustentado por evidências rastreáveis;
- **previamente definido** — sem mudança oportunista após conhecido o resultado.

Indicadores em excesso também são problema. Um painel com dezenas de métricas secundárias pode ocultar a falha que realmente compromete o resultado principal.

### 3.3 Ficha mínima do indicador

Para evitar ambiguidades, a definição do indicador deve esclarecer, conforme o caso:

| Item | Conteúdo |
|---|---|
| finalidade | qual resultado se pretende proteger |
| fórmula ou critério | como o desempenho será calculado ou classificado |
| unidade | percentual, horas, quantidade, índice, conceito etc. |
| população | quais eventos entram na apuração |
| exclusões | quais eventos podem ser desconsiderados e por quê |
| fonte | sistema, protocolo, inspeção, teste, documento etc. |
| periodicidade | quando ocorre a medição |
| meta | desempenho esperado |
| tolerância | margem previamente admitida, se houver |
| evidência | registro que sustenta o resultado |
| responsável | quem coleta, confere, registra e encaminha |
| consequência | tratamento previsto para o resultado |

Sem população definida, o percentual pode ser manipulado. Sem fonte confiável, a fórmula não é reproduzível. Sem regra de exclusão, eventos semelhantes podem receber tratamento diferente.

### 3.4 Exemplos de fórmulas

**Disponibilidade:**

$$
\text{Disponibilidade} = \frac{\text{tempo previsto} - \text{indisponibilidade computável}}{\text{tempo previsto}} \times 100
$$

Se a janela computável for de 1.000 minutos e houver 8 minutos de indisponibilidade computável:

$$
\frac{1000 - 8}{1000} \times 100 = 99{,}2\%
$$

**Cumprimento de prazo:**

$$
\text{Índice de prazo} = \frac{\text{demandas concluídas no prazo}}{\text{demandas concluídas computáveis}} \times 100
$$

Se 90 de 100 demandas computáveis forem concluídas no prazo, o índice será **90%**.

**Conformidade de entregas:**

$$
\text{Conformidade} = \frac{\text{entregas aceitas sem correção}}{\text{entregas avaliadas}} \times 100
$$

O percentual não substitui a análise de criticidade. Uma falha grave pode exigir tratamento próprio mesmo quando a média global é elevada.

### 3.5 Meta, tolerância e consequência

Não confunda:

| Conceito | Função |
|---|---|
| indicador | mede o desempenho |
| meta | fixa o resultado esperado |
| tolerância | admite variação limitada, quando previamente prevista |
| evidência | demonstra o fato medido |
| consequência | define o tratamento contratual do resultado |

A meta não deve ser alterada retroativamente. Tolerância também não é “perdão” concedido depois do fato.

Em indicadores críticos, pode haver piso mínimo ou regra de não compensação. Isso evita que ótimo desempenho em aspecto secundário esconda falha essencial.

### 3.6 Integridade dos dados

A qualidade do indicador depende dos dados. Controles úteis incluem:

- identificação da fonte primária;
- registro de criação e alteração;
- data, hora e período de referência;
- perfis de acesso adequados;
- preservação de documentos e logs;
- tratamento de duplicidades e dados ausentes;
- memória de cálculo;
- possibilidade de conferência por amostragem ou fonte independente.

Relatório elaborado pela contratada pode fornecer informação, mas **não dispensa a validação administrativa**.

### 3.7 Evidência adequada ao que se quer provar

| Evidência | O que pode demonstrar |
|---|---|
| protocolo | data e conteúdo de uma comunicação |
| log íntegro | evento, horário e histórico de sistema |
| teste reproduzível | comportamento funcional |
| documento assinado | declaração e autoria |
| fotografia ou vídeo | condição visual em determinado momento |
| inspeção registrada | estado do objeto no momento fiscalizado |
| relatório derivado | síntese que precisa ser confrontada com a fonte |

Uma fotografia isolada, por exemplo, pode demonstrar a existência de um equipamento, mas normalmente não prova disponibilidade contínua durante todo o mês.

## 4. Papel do fiscalizador do contrato

### 4.1 Base legal

O art. 117 da Lei nº 14.133/2021 determina que a execução do contrato seja acompanhada e fiscalizada por **um ou mais fiscais do contrato**, representantes da Administração especialmente designados, ou pelos respectivos substitutos.

A lei também permite a contratação de terceiros para assistir e subsidiar a fiscalização, mas o terceiro **não pode exercer atribuição própria e exclusiva do fiscal**, e sua contratação não elimina a responsabilidade funcional do agente público nos limites legais.

### 4.2 Núcleo da atuação

O fiscalizador deve:

1. conhecer contrato, anexos e critérios de execução;
2. observar a prestação real;
3. comparar fatos com cláusulas e indicadores;
4. coletar ou validar evidências;
5. registrar ocorrências;
6. determinar a regularização de faltas ou defeitos dentro de sua competência;
7. conferir se a correção ocorreu;
8. informar tempestivamente aos superiores o que ultrapassar sua competência.

Esse fluxo decorre diretamente do art. 117, §§ 1º e 2º.

### 4.3 O que o fiscalizador pode e não pode fazer

| Pode | Não pode |
|---|---|
| exigir cumprimento de obrigação já prevista | criar obrigação nova informalmente |
| registrar ocorrência | apagar fato desfavorável por conveniência |
| conferir evidências | aceitar relatório sem qualquer validação |
| determinar correção dentro da competência | alterar preço ou objeto sem procedimento competente |
| escalar matéria aos superiores | reter decisão que ultrapassa sua alçada |
| usar apoio técnico | transferir a terceiros a função exclusiva de fiscal |

O art. 119 reforça que o contratado deve reparar, corrigir, remover, reconstruir ou substituir, às suas expensas, o objeto em que se verifiquem vícios, defeitos ou incorreções resultantes da execução ou dos materiais empregados.

### 4.4 Registro próprio das ocorrências

O registro de fiscalização deve permitir compreender:

- qual obrigação ou indicador estava sendo examinado;
- o período e o fato observado;
- a evidência utilizada;
- a divergência constatada;
- a comunicação feita à contratada;
- a providência solicitada;
- o prazo, quando cabível;
- o resultado da correção;
- o encaminhamento a gestor ou autoridade, se necessário.

> **Pegadinha:** registrar não é apenas “anotar que houve problema”. O registro deve ligar **fato + critério + evidência + providência**.

### 4.5 Fiscalização orientada por risco

A intensidade do acompanhamento deve guardar relação com o risco. Merecem controle mais próximo situações como:

- atividade crítica para continuidade do serviço;
- etapa que se tornará difícil de verificar depois;
- histórico de falhas recorrentes;
- dados produzidos por fonte pouco confiável;
- risco de dano elevado ou irreversível;
- entregas de grande impacto para o usuário.

Podem ser utilizados, conforme o objeto:

- inspeção presencial;
- checklist;
- teste funcional;
- leitura de registros de sistema;
- conferência documental;
- amostragem;
- registro fotográfico;
- reunião de acompanhamento;
- manifestação de usuários.

O método deve ser adequado à obrigação que se pretende provar.

## 5. Papel do preposto da contratada

### 5.1 Conceito legal

O art. 118 da Lei nº 14.133/2021 estabelece que o contratado deve manter **preposto aceito pela Administração no local da obra ou do serviço para representá-lo na execução do contrato**.

O preposto é, portanto, representante da **contratada**, e não da Administração.

### 5.2 Funções práticas

No acompanhamento da execução, o preposto pode:

- receber comunicações relativas ao contrato;
- apresentar informações e documentos;
- encaminhar justificativas da contratada;
- mobilizar internamente a empresa para corrigir falhas;
- acompanhar reuniões e medições;
- organizar a resposta operacional da contratada;
- manter o canal de interlocução com fiscalização e gestão.

O preposto não substitui:

- o fiscal do contrato;
- o gestor público;
- a autoridade competente;
- responsável técnico legalmente exigido.

### 5.3 Fiscalizador x preposto

| Fiscalizador | Preposto |
|---|---|
| representa a Administração na fiscalização | representa a contratada na execução |
| verifica cumprimento | organiza a resposta empresarial |
| registra ocorrências | recebe e responde comunicações |
| exige correção prevista | mobiliza meios da empresa para corrigir |
| escala decisão fora da competência | leva a demanda à estrutura interna da contratada |
| não dirige a empresa | não decide pela Administração |

Essa distinção evita ingerência indevida na organização empresarial. A Administração exige **resultado contratual**; cabe à contratada organizar seus meios para alcançá-lo, ressalvadas as condições e controles previstos no contrato e na lei.

### 5.4 Aceitação e substituição

A aceitação do preposto não torna sua indicação imutável. Se a representação se mostrar ineficaz — por exemplo, falta de disponibilidade, impossibilidade de encaminhar providências ou quebra persistente do canal de comunicação — a Administração pode adotar as medidas previstas no contrato e exigir solução adequada, com motivação e registro.

Divergência técnica respeitosa ou apresentação de defesa da contratada, por si sós, não justificam tratamento arbitrário do preposto.

## 6. Acompanhamento da execução contratual

### 6.1 Ciclo básico

Uma rotina de acompanhamento pode ser organizada em quatro movimentos:

```text
PREPARAR
↓
OBSERVAR
↓
TRATAR
↓
VERIFICAR E REGISTRAR
↺
```

**Preparar:** identificar obrigações, responsáveis, indicadores, fontes, canais, periodicidade e riscos.

**Observar:** coletar dados, inspecionar, testar e comparar a execução com o contrato.

**Tratar:** comunicar desvios e determinar providências dentro da competência.

**Verificar e registrar:** conferir se a providência funcionou, atualizar o histórico e encaminhar decisões pendentes.

### 6.2 Preparação para o início da execução

Antes de fiscalizar, é importante reunir:

- contrato e anexos;
- termo de referência ou projeto aplicável;
- proposta aceita;
- cronograma e ordens de serviço, quando houver;
- indicadores, fórmulas, metas e critérios de aceitação;
- matriz de riscos, quando existente;
- designação dos agentes;
- identificação do preposto;
- canais formais de comunicação;
- fontes de dados e forma de preservação da evidência.

Reunião inicial pode ser útil para alinhar esses elementos, mas sua ata **não altera por si só cláusulas materiais do contrato**.

### 6.3 Plano de acompanhamento

Uma matriz simples ajuda a organizar a fiscalização:

| Obrigação | Risco | Indicador/teste | Fonte | Frequência | Responsável |
|---|---|---|---|---|---|
| disponibilidade | interrupção | percentual previsto | logs validados | contínua/mensal | fiscal |
| prazo de resposta | atraso | índice de prazo | sistema de chamados | periódica | fiscal |
| qualidade de entrega | retrabalho | inspeção/critério | teste e documento | por entrega | fiscal |
| comunicação | resposta tardia | prazo contratual | protocolo | por evento | fiscal/preposto |

A matriz organiza a prova; não cria obrigações que o contrato não contenha.

### 6.4 Tratamento de um desvio

Ao identificar descumprimento ou risco de descumprimento:

1. preserve a evidência;
2. identifique a cláusula, obrigação ou indicador relacionado;
3. avalie urgência e impacto;
4. comunique o preposto pelo canal adequado;
5. determine a correção que estiver dentro da competência do fiscal;
6. registre a manifestação da contratada;
7. verifique a correção;
8. atualize a medição e o histórico;
9. encaminhe ao superior o que exigir decisão além da competência do fiscal.

A correção rápida reduz o impacto, mas **não apaga a ocorrência**. O histórico serve para identificar reincidência, tendências e riscos futuros.

### 6.5 Comunicação rastreável

Uma comunicação útil identifica:

- contrato e fato;
- obrigação relacionada;
- evidência disponível;
- providência esperada;
- prazo, se previsto ou cabível;
- responsável pelo retorno;
- registro de atendimento.

Em situação urgente, contato telefônico ou mensagem instantânea pode iniciar a resposta, mas providências relevantes devem ser formalizadas no processo ou sistema adequado.

### 6.6 Solicitações e reclamações: art. 123

A Administração deve emitir decisão explícita sobre solicitações e reclamações relacionadas à execução, ressalvados os requerimentos manifestamente impertinentes, meramente protelatórios ou sem interesse para a boa execução.

Salvo prazo legal ou contratual específico, **concluída a instrução**, o prazo legal para decidir é de **um mês**, admitida prorrogação motivada por igual período.

> **Pegadinha:** o prazo de um mês não começa necessariamente no protocolo; o art. 123 fala em prazo contado após a conclusão da instrução, salvo disciplina específica.

### 6.7 Continuidade e transição

Troca de fiscal ou de preposto não reinicia o contrato. Devem ser preservados e transferidos:

- pendências;
- prazos;
- medições;
- ocorrências;
- evidências;
- comunicações;
- acessos necessários;
- decisões aguardadas;
- riscos identificados.

O histórico deve permanecer íntegro para evitar perda de informação e descontinuidade do controle.

## 7. Casos aplicados

### Caso 1 — meta alterada por e-mail

O contrato prevê 95% de atendimento no prazo. Depois de conhecido o resultado do mês, o fiscal envia e-mail elevando a meta para 98% e pretende recalcular o desempenho.

**Conclusão:** incorreto. O fiscal não pode inovar materialmente no contrato por comunicação informal nem modificar retroativamente o critério de medição.

### Caso 2 — relatório sem memória de cálculo

A contratada informa disponibilidade de 99,7%, mas não apresenta logs, eventos excluídos ou memória de cálculo.

**Conclusão:** o percentual, isoladamente, não é auditável. A Administração deve validar fonte, população, exclusões e cálculo.

### Caso 3 — falha crítica antes do fechamento mensal

O relatório é mensal, mas ocorre interrupção grave no meio do período.

**Conclusão:** a periodicidade do relatório não autoriza esperar o fim do mês. O acompanhamento deve reagir tempestivamente ao risco e depois consolidar o registro.

### Caso 4 — preposto sem capacidade de encaminhamento

O preposto recebe mensagens, mas não consegue mobilizar a contratada nem fornecer retorno dentro dos prazos.

**Conclusão:** há falha no canal de representação. A situação deve ser documentada e tratada conforme o contrato, sem o fiscal assumir a gestão da empresa.

### Caso 5 — apoio técnico externo

A Administração contrata especialista para realizar ensaio técnico e produzir laudo.

**Conclusão:** o laudo pode subsidiar o fiscal, mas o terceiro não assume atribuição exclusiva da fiscalização e a contratação não elimina a responsabilidade funcional prevista no art. 117.

## 8. Pegadinhas de prova

| Afirmação | Julgamento |
|---|---|
| Indicador cria obrigação mesmo sem previsão contratual. | Errada. |
| SLA é compromisso de desempenho ligado ao contrato. | Certa. |
| Toda métrica deve ser percentual. | Errada. |
| Relatório da contratada dispensa validação. | Errada. |
| Fiscal pode determinar correção de defeito já abrangido pelo contrato. | Certa. |
| Fiscal pode alterar objeto ou preço por e-mail. | Errada. |
| Terceiro pode auxiliar a fiscalização. | Certa. |
| Terceiro substitui integralmente o fiscal. | Errada. |
| Preposto representa a contratada. | Certa. |
| Preposto decide pela Administração. | Errada. |
| Reunião inicial pode alterar a meta contratual por ata. | Errada. |
| Relatório mensal dispensa reação a falha crítica durante o mês. | Errada. |
| Correção posterior apaga o registro da ocorrência. | Errada. |
| Troca de fiscal reinicia o histórico. | Errada. |

## 9. Síntese para resolução de questões

Diante de uma situação-problema, siga a sequência:

1. **identifique a obrigação** contratual;
2. **localize o critério** ou indicador;
3. **confira a fonte e a evidência**;
4. **compare fato e meta**;
5. **verifique a competência** do fiscal;
6. **comunique o preposto** quando cabível;
7. **determine a correção prevista**;
8. **escale o que ultrapassar a competência**;
9. **verifique a providência**;
10. **preserve o histórico**.
