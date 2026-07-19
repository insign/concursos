---
schemaVersion: 1
title: "Gestão aplicada da execução contratual"
description: "Indicadores, SLA, IMR, evidências, fiscalização, preposto, incidentes, governança, transição e acompanhamento da execução contratual."
order: 136
storageId: "gestao-aplicada-execucao"
---

# Gestão aplicada da execução contratual

## 1. Delimitação do assunto

Este assunto converte as regras da execução contratual em uma rotina de controle. O foco está em quatro perguntas práticas:

1. como transformar a obrigação contratual em nível de serviço verificável;
2. como o fiscalizador acompanha, mede, registra e encaminha ocorrências;
3. como o preposto representa a contratada e organiza sua resposta;
4. como manter um ciclo de acompanhamento capaz de sustentar correções e decisões.

A base geral está na Lei nº 14.133/2021, especialmente nos arts. 92, 115, 117, 118 e 123. A IN SEGES/MP nº 5/2017 e os Decretos nº 11.246/2022 e nº 13.031/2026 oferecem modelos operacionais federais úteis, mas não vinculam automaticamente o TCE-MA. A IN SEGES/ME nº 98/2022 autorizou a aplicação da IN nº 5/2017, **no que couber**, às contratações federais de serviços regidas pela Lei nº 14.133/2021.

> **Corte de atualização:** legislação e orientações consultadas até 19 de julho de 2026.

O Assunto 128 apresenta o regime geral da execução, da fiscalização e das alterações na Lei nº 14.133/2021. Aqui, esses fundamentos são pressupostos e o recorte passa a ser sua aplicação por indicadores, evidências, comunicação e rotinas de acompanhamento. Também não se repetem a arquitetura completa da fiscalização da IN nº 5/2017 e os requisitos do modelo interno federal de 2026, estudados no Assunto 133, nem os procedimentos financeiros de medição, recebimento, glosa e pagamento, estudados no Assunto 134. O Decreto nº 13.031/2026 aparece aqui somente como referência de acompanhamento documentado. Registro formal de irregularidades e aplicação de penalidades e sanções serão aprofundados no Assunto 137.


<!-- REVISAO-GESTAO-APLICADA-2026 -->

## 1.1 Matriz de fontes e âmbito

A execução contratual pode combinar norma geral, modelos federais e regras internas. A fonte deve ser identificada antes de transportar uma solução para o TCE-MA.

| Fonte | Papel no assunto | Âmbito principal |
|---|---|---|
| Lei nº 14.133/2021 | Base geral para execução, fiscalização, preposto, registros e decisões | Administração Pública abrangida pela lei |
| IN SEGES/MP nº 5/2017 | Modelo operacional de contratação e fiscalização de serviços | Administração federal direta, autárquica e fundacional, no que couber |
| IN SEGES/ME nº 98/2022 | Autoriza o uso da IN nº 5/2017 sob a Lei nº 14.133/2021 | Modelo federal |
| Decreto nº 11.246/2022 | Papéis de gestor e fiscais, assistência e recebimento | Administração federal direta, autárquica e fundacional |
| Decreto nº 13.031/2026 | Contratos.gov.br e atualização do modelo federal | Administração federal direta, autárquica e fundacional |
| Norma interna do ente | Competências, fluxos, alçadas, documentos e sistemas | TCE-MA ou ente competente |
| Contrato e anexos | Obrigações, indicadores, evidências e consequências do caso concreto | Partes do contrato |

> **Corte de atualização desta revisão:** 19 de julho de 2026.

A aplicação de um modelo federal ao TCE-MA exige base normativa ou decisão administrativa competente. Utilizá-lo como referência técnica não o transforma em norma interna automática.

## 2. Do contrato ao controle observável

O contrato deve ser executado fielmente pelas partes, conforme suas cláusulas e a Lei nº 14.133/2021. Para que essa obrigação seja fiscalizável, o modelo de gestão precisa ligar quatro elementos:

| Elemento | Função |
|---|---|
| Obrigação | Define o que a parte deve fazer ou entregar |
| Indicador | Traduz parte relevante da obrigação em medida verificável |
| Evidência | Demonstra o que ocorreu na execução |
| Consequência | Indica o tratamento contratual de conformidade ou desvio |

Uma cláusula que exige “atendimento de qualidade” sem definir padrão, forma de aferição ou evidência deixa margem excessiva à avaliação subjetiva. No outro extremo, dezenas de indicadores sem relação com o resultado consomem recursos e podem ocultar o que realmente importa.

O desenho adequado começa pelo resultado pretendido e pergunta:

- qual obrigação é crítica para o usuário ou para a Administração;
- qual fato demonstrará seu cumprimento;
- de onde virá a informação;
- com que frequência será medida;
- qual margem de tolerância é justificável;
- quem coleta, confere e valida;
- como divergências serão tratadas;
- qual efeito já está previsto no contrato.


## 2.1 Medida, objetivo e compromisso

Termos próximos não devem ser confundidos:

| Conceito | Função |
|---|---|
| Medida bruta ou **SLI** | Resultado observado, como tempo de resposta ou disponibilidade |
| Meta ou **SLO** | Desempenho pretendido pela Administração |
| **SLA** | Compromisso contratual de nível de serviço |
| **IMR** | Estrutura de aferição de resultados no modelo da IN nº 5/2017 |
| Critério de aceitação | Condição para receber determinada entrega |
| Consequência | Efeito previsto para o resultado medido |

SLI e SLO são terminologia técnica frequente, não categorias jurídicas universais. O contrato pode usar outras denominações, desde que a obrigação e a forma de aferição sejam claras.

### Exemplo

```text
SLI observado: 96,8% dos chamados críticos solucionados em até 2 horas
SLO pretendido: 98%
SLA contratual: mínimo de 98%
IMR: faixas que relacionam o desempenho ao valor devido
```

O indicador informa o resultado. Ele não cria sozinho a obrigação nem a consequência.

## 3. Cláusulas e indicadores de nível de serviço

### 3.1 O que é nível de serviço

Nível de serviço é o padrão de desempenho exigido para a prestação. Ele pode abranger disponibilidade, prazo, qualidade, capacidade, segurança, continuidade, precisão, satisfação do usuário ou outra dimensão pertinente ao objeto.

Na prática administrativa, a expressão inglesa **Service Level Agreement (SLA)** costuma designar o conjunto de compromissos de nível de serviço. O SLA não é uma licença para criar obrigações durante a execução: seus critérios relevantes devem estar previstos no edital, no contrato ou em anexo que o integre.

O **Instrumento de Medição de Resultado (IMR)** da IN nº 5/2017 é uma técnica de estruturação e aferição desses resultados. SLA e IMR podem se relacionar, mas não são sinônimos necessários: SLA descreve o compromisso de desempenho; IMR organiza indicadores, faixas e efeitos da medição no modelo federal de serviços.


### 3.1.1 Ficha técnica completa do indicador

Uma ficha auditável precisa definir, além do nome e da fórmula:

- evento que inicia o relógio;
- evento que encerra o relógio;
- horário corrido ou horário útil;
- calendário, feriados e fuso horário;
- classes de severidade e autoridade para classificá-las;
- regra de reabertura;
- tratamento de duplicidade;
- precisão e arredondamento;
- período de agregação;
- versão da fórmula e data de vigência;
- regra para dado ausente;
- tratamento de evento contestado;
- fonte primária, fonte derivada e conciliação;
- prazo de retenção dos registros.

### Exemplo de reabertura

Um chamado foi encerrado pela contratada em quarenta minutos e reaberto pelo usuário dez minutos depois. O instrumento deve dizer se houve:

1. resolução válida seguida de novo incidente;
2. resolução frustrada e continuidade do incidente original;
3. pausa do relógio;
4. evento excluído por regra contratual específica.

Sem essa definição, a medição pode ser manipulada.

### 3.2 Componentes de um indicador auditável

Um indicador completo deve especificar:

| Componente | Exemplo de pergunta |
|---|---|
| Nome e finalidade | O que se pretende proteger? |
| Fórmula ou critério | Como o resultado será calculado ou classificado? |
| Unidade | Percentual, horas, quantidade, índice ou conceito? |
| População e exclusões | Quais eventos entram ou saem da conta? |
| Fonte dos dados | Sistema, formulário, teste, foto ou relatório? |
| Periodicidade | Medição contínua, diária, semanal ou mensal? |
| Meta | Qual desempenho é esperado? |
| Tolerância | Qual desvio limitado ainda é aceito? |
| Evidência | Que registro permite reproduzir a apuração? |
| Responsáveis | Quem coleta, confere, comunica e decide? |
| Consequência | Que efeito contratual corresponde a cada faixa? |

Sem população definida, um percentual pode induzir a erro. Sem fonte confiável, a fórmula não é reproduzível. Sem regra para exclusões, eventos semelhantes podem receber tratamentos diferentes. Sem consequência previamente estabelecida, a medição se torna apenas informativa.


### 3.2.1 Integridade do relógio e dos eventos

A medição temporal deve preservar, quando aplicável:

| Dado | Finalidade |
|---|---|
| criação | início potencial do prazo |
| classificação inicial | severidade aplicável |
| alterações | detectar reclassificação ou edição |
| aceite da demanda | identificar efetivo recebimento |
| contenção | limitar o impacto |
| restauração | recuperar o serviço |
| resolução | eliminar ou tratar a causa prevista |
| validação | confirmar o resultado |
| reabertura | detectar solução frustrada |
| encerramento | concluir o fluxo |

A data lançada pela contratada não prevalece automaticamente sobre logs primários, protocolos ou registros do usuário. Relógios dos sistemas precisam ser sincronizados e o fuso deve ser conhecido.

### 3.3 Exemplos de indicadores

Considere um serviço de suporte com janela contratual de atendimento.

**Disponibilidade:**

$$
\text{Disponibilidade} = \frac{\text{tempo previsto} - \text{indisponibilidade computável}}{\text{tempo previsto}} \times 100
$$

O contrato deve definir o que conta como tempo previsto e quais indisponibilidades podem ser excluídas, como uma manutenção programada validamente comunicada, se essa exclusão tiver sido prevista.

**Cumprimento de prazo:**

$$
\text{Índice de prazo} = \frac{\text{demandas concluídas no prazo}}{\text{demandas concluídas computáveis}} \times 100
$$

A apuração exige classificar corretamente cada demanda, registrar início e fim e impedir que a própria contratada altere unilateralmente a categoria para ampliar o prazo.

**Conformidade de entregas:**

$$
\text{Conformidade} = \frac{\text{entregas aceitas sem correção}}{\text{entregas avaliadas}} \times 100
$$

Esse indicador não dispensa verificar a gravidade dos defeitos. Dez falhas leves e uma falha crítica podem produzir percentuais semelhantes, embora os riscos sejam diferentes. Quando necessário, o modelo deve ponderar criticidade ou criar indicador específico.


### 3.3.1 Manipulação de métricas

Indicadores podem incentivar comportamento oportunista. Sinais comuns:

| Manipulação | Efeito aparente |
|---|---|
| dividir um incidente em vários registros | altera volume e médias |
| fechar e reabrir chamados | reduz artificialmente o tempo de resolução |
| rebaixar severidade | amplia o prazo aplicável |
| excluir eventos desfavoráveis | melhora numerador ou denominador |
| registrar início tardio | encurta a duração |
| escolher amostra favorável | superestima conformidade |
| chamar indisponibilidade de manutenção | reduz tempo computável |
| editar dado sem trilha | impede auditoria |

Controles úteis incluem fonte primária independente, identificador único, trilha imutável, segregação de perfis, relatório de alterações, relógio sincronizado e reexecução da memória de cálculo.

### 3.3.2 Média, percentis e caudas

Uma média pode esconder poucos eventos muito ruins. Considere tempos, em minutos:

```text
1, 1, 1, 1, 1, 1, 1, 1, 1 e 51
```

A média é seis minutos, mas um usuário aguardou cinquenta e um. Conforme o risco, o painel deve combinar:

- média;
- mediana;
- percentil 90, 95 ou 99;
- máximo;
- proporção dentro do prazo;
- distribuição por severidade.

### 3.3.3 Piso crítico e não compensação

Um escore global não deve permitir que desempenho excelente em item secundário compense falha essencial. Alternativas:

- requisito eliminatório;
- piso mínimo;
- teto para o escore global;
- indicador crítico independente;
- consequência própria;
- regra explícita de não compensação.

### 3.4 Metas, tolerâncias e faixas

Meta é o desempenho esperado. Tolerância é uma margem limitada, tecnicamente justificável e previamente conhecida. A tolerância não transforma descumprimento em direito permanente da contratada, nem autoriza a Administração a aceitar resultado abaixo do mínimo legal ou essencial.

As faixas devem evitar dois erros:

- **efeito penhasco:** uma diferença mínima produz consequência desproporcional;
- **zona sem tratamento:** o resultado não atinge a meta, mas o instrumento não diz como classificá-lo.

O fator de ajuste deve guardar relação com o resultado efetivamente entregue e com a disciplina contratual. Redimensionar o valor devido por prestação ausente ou desconforme não equivale, por si só, a aplicar sanção. A sanção responde a infração e exige fundamento, competência, contraditório e procedimento próprios.

### 3.5 Indicadores quantitativos e qualitativos

Indicadores quantitativos facilitam comparação, mas não capturam tudo. Qualidade técnica pode exigir teste funcional, inspeção por amostragem, avaliação especializada ou rubrica com critérios objetivos.

Uma rubrica qualitativa confiável descreve antecipadamente o que caracteriza cada nível. Termos como “bom”, “regular” e “ruim”, isolados, não permitem auditoria. É preferível associá-los a fatos observáveis, por exemplo:

- completo, correto e sem necessidade de retrabalho;
- utilizável após correção limitada;
- incompleto ou incompatível com requisito essencial.

Pesquisa de satisfação pode complementar a fiscalização, mas não substitui critérios técnicos. Usuário satisfeito não torna conforme uma obrigação legal descumprida; reclamação isolada também não prova automaticamente falha contratual.

### 3.6 Integridade dos dados

O indicador só é confiável quando os dados também o são. O modelo deve prever, conforme o risco:

- rastreabilidade de criação e alteração dos registros;
- perfis de acesso e segregação entre registrar e validar;
- preservação de documentos e logs;
- tratamento de dados ausentes, duplicados ou inconsistentes;
- conferência por amostragem ou fonte independente;
- possibilidade de reprodução da memória de cálculo.

Relatório produzido pela contratada pode ser fonte de informação, mas não deve ser aceito automaticamente. A validação pertence à Administração. A IN nº 5/2017 veda atribuir à própria contratada a avaliação de seu desempenho.

### 3.7 Indicadores não alteram o contrato

O fiscal não pode criar meta nova, mudar fórmula, eliminar tolerância ou ampliar obrigação por decisão informal. Uma alteração material no nível de serviço precisa seguir o regime jurídico de alteração contratual, com competência, justificativa e preservação do equilíbrio econômico-financeiro quando cabível.

Ajustes meramente operacionais podem ser possíveis quando já autorizados pelo contrato e não alteram objeto, obrigação, risco ou remuneração. A distinção depende do conteúdo, não do nome dado ao documento.

## 4. Papel do fiscalizador do contrato

### 4.1 Fiscalizador como função de acompanhamento

O edital usa a expressão “fiscalizador do contrato” em sentido funcional. Na Lei nº 14.133/2021, a execução é acompanhada e fiscalizada por um ou mais fiscais especialmente designados. Regulamentos podem distribuir a atividade entre fiscal técnico, administrativo e setorial, além do gestor.

O núcleo da fiscalização aplicada é:

1. conhecer o contrato e o modelo de gestão;
2. observar a execução real;
3. comparar fatos com critérios;
4. produzir e validar evidências;
5. registrar ocorrências;
6. determinar correções dentro da competência;
7. verificar o atendimento;
8. informar tempestivamente o que excede sua competência.

Fiscalização não é presença simbólica nem assinatura automática de relatório. Também não é gestão empresarial da contratada.

### 4.2 Preparação do fiscalizador

Antes do início, o fiscal deve dispor, conforme o objeto, de:

- contrato, edital, termo de referência ou projeto;
- proposta aceita e planilhas relevantes;
- matriz de riscos e modelo de gestão;
- indicadores, fórmulas, faixas e fontes de dados;
- cronograma, ordens de serviço e critérios de aceitação;
- identificação do gestor, demais fiscais, substitutos e preposto;
- canais de comunicação e regras de escalonamento;
- histórico existente, quando assumir contrato em curso.

Sem esses elementos, a designação formal não gera capacidade real de controle. Dúvida técnica ou limitação material deve ser comunicada, e a Administração deve fornecer capacitação, apoio ou redistribuição compatível.


### 4.2.1 Hierarquia e integridade das evidências

| Evidência | Força típica |
|---|---|
| Registro primário protegido | Demonstra o evento na origem |
| Log íntegro | Demonstra criação, alteração, autor e horário |
| Teste reproduzível | Demonstra comportamento funcional |
| Documento assinado | Demonstra declaração e autoria |
| Fotografia ou vídeo | Demonstra condição visual em um instante |
| Relatório derivado | Depende dos dados de origem |
| Entrevista | Explica contexto e exige corroboração |
| Captura de tela | Pode apoiar, mas raramente basta isoladamente |

Para evidência digital, registrar origem, data e hora, fuso, integridade, cadeia de custódia, retenção, autor, alterações e vínculo com a obrigação.

### 4.2.2 Amostragem documentada

| Método | Uso |
|---|---|
| Aleatória | Reduz viés de seleção |
| Estratificada | Representa unidades, turnos, severidades ou tipos |
| Sistemática | Seleciona em intervalos definidos |
| Dirigida por risco | Examina eventos críticos, atípicos ou reincidentes |
| Censitária | Verifica toda população pequena ou crítica |
| Reexecução | Repete cálculo ou teste sobre a amostra |

O registro deve indicar população, período, unidade amostral, método, tamanho, exclusões, critério de seleção, resultado, possibilidade de extrapolação e limitações. A contratada não escolhe sozinha os itens que serão fiscalizados.

### 4.3 Atuação durante a execução

O fiscalizador deve calibrar sua atuação ao risco. Objetos críticos, falhas recorrentes, dados frágeis ou etapas irreversíveis justificam controle mais intenso. Baixo risco pode admitir amostragem, desde que o método seja adequado e documentado.

Ferramentas possíveis incluem:

- inspeção presencial;
- teste funcional;
- checklist técnico;
- relatório fotográfico ou audiovisual;
- leitura de registros de sistema;
- amostragem estatística ou dirigida por risco;
- entrevista e pesquisa com usuários;
- conciliação entre fontes independentes;
- reunião de acompanhamento com ata.

O instrumento deve ser proporcional e capaz de provar a obrigação examinada. Foto demonstra uma condição visual, mas talvez não comprove disponibilidade ao longo do mês. Log comprova evento do sistema, mas pode não demonstrar qualidade percebida pelo usuário.


### 4.3.1 Matriz de responsabilidades

| Atividade | Fiscal | Gestor | Preposto | Autoridade | Apoio técnico |
|---|---|---|---|---|---|
| Coletar evidência | Executa ou coordena | Acompanha | Fornece dados | — | Auxilia |
| Validar medição | Executa conforme atribuição | Consolida | Manifesta-se | — | Analisa |
| Exigir correção prevista | Executa | Acompanha | Mobiliza a empresa | — | Apoia |
| Alterar contrato | Instrui | Propõe | Representa a contratada | Decide | Subsidia |
| Aplicar sanção | Registra e encaminha | Instrui | Exerce defesa | Decide conforme competência | Subsidia |
| Atestar ou receber provisoriamente | Atua conforme designação | Consolida o fluxo | Toma ciência | — | Apoia |
| Decidir pleito | Instrui | Encaminha | Formula | Decide | Emite análise |

### 4.3.2 Assistência por terceiros

A Lei nº 14.133/2021 admite assistência e subsídio por terceiros. Isso não terceiriza a competência do fiscal.

- o terceiro pode produzir laudo, teste ou análise;
- o produto deve ser avaliado pela Administração;
- o terceiro responde pelas informações e técnicas fornecidas, conforme o vínculo;
- a responsabilidade funcional do fiscal permanece;
- a decisão continua com o agente competente.

### 4.4 Limites da atuação

O fiscalizador não pode:

- alterar informalmente o objeto ou a remuneração;
- aceitar prestação incompatível com requisito essencial sem decisão competente;
- dirigir os empregados da contratada como superior hierárquico;
- assumir a execução que cabe ao contratado;
- aplicar sanção sem competência e procedimento;
- atestar sem suporte documental;
- deixar de escalar situação que ultrapasse sua alçada.

Determinar a correção de falta ou defeito já coberto pelo contrato integra a fiscalização. Criar obrigação nova não integra. A linha divisória está no vínculo entre a ordem e o conteúdo contratual preexistente.

### 4.5 Registro útil e ateste responsável

O registro deve permitir que outra pessoa compreenda e reproduza a conclusão. Em regra, identifica:

- período, local e responsável;
- cláusula, obrigação ou indicador;
- método e fonte de verificação;
- fatos e evidências;
- memória de cálculo, quando houver;
- manifestação do preposto;
- correção solicitada, prazo e resultado;
- impacto e encaminhamento.

O ateste não é mera formalidade. Ele certifica fatos relevantes para o fluxo de recebimento e pagamento. Se houver parcela não comprovada, divergência ou falha, o registro deve delimitar o que foi e o que não foi reconhecido, sem transformar o ateste em decisão sobre matéria alheia à competência do fiscal.

## 5. Papel do preposto da contratada

### 5.1 Representação na execução

O art. 118 da Lei nº 14.133/2021 determina que o contratado mantenha preposto aceito pela Administração no local da obra ou do serviço para representá-lo na execução. A IN nº 5/2017 detalha, no âmbito federal dos serviços, sua designação formal antes do início e a definição expressa de poderes e deveres.

O preposto:

- representa a contratada, não a Administração;
- recebe comunicações e solicitações relativas à execução;
- mobiliza a estrutura da empresa para responder;
- apresenta informações, justificativas e evidências;
- acompanha medições e toma ciência das avaliações;
- organiza correções sob responsabilidade da contratada;
- mantém interlocução sem substituir os responsáveis técnicos exigidos.

### 5.2 Aceitação e substituição

A Administração pode avaliar se o preposto possui poderes, disponibilidade e condições para representar a empresa. A recusa ou exigência de substituição deve ser motivada e relacionada à execução, sem interferência arbitrária na organização empresarial.

A aceitação inicial não torna o preposto imutável. Ausência reiterada, falta de poderes, quebra do canal de comunicação ou atuação incompatível com o contrato podem justificar sua substituição conforme o instrumento aplicável. A troca deve preservar histórico, pendências e continuidade.

### 5.3 Poderes e disponibilidade

O preposto precisa ter poderes compatíveis com a função. Isso não significa competência ilimitada para alterar o contrato ou renunciar a direitos da empresa. O instrumento deve indicar, por exemplo:

- comunicações que pode receber;
- providências operacionais que pode determinar internamente;
- documentos que pode apresentar ou assinar;
- prazo e canal de resposta;
- substituto ou contato de contingência;
- hipóteses que exigem representante com poder específico.

A permanência física contínua no local somente deve ser exigida quando a natureza do objeto justificar. Em outros casos, disponibilidade por canal formal e comparecimento quando convocado podem atender à necessidade.


### 5.3.1 Solicitações diretas: regra e exceção

A regra é dirigir solicitações, reclamações e cobranças ao preposto, evitando subordinação direta dos empregados terceirizados.

No modelo federal da IN nº 5/2017, podem existir tarefas específicas previamente definidas no contrato em que usuários ou agentes notificam diretamente a demanda operacional, como em certos serviços de recepção ou apoio. Isso não autoriza:

- ordens pessoais estranhas ao objeto;
- gestão de jornada, folgas ou disciplina;
- escolha informal de trabalhadores;
- alteração do modo de execução reservado à contratada;
- criação de nova obrigação.

O contrato e a norma aplicável definem a exceção. O fiscal continua exigindo resultado, e a empresa continua organizando seus empregados.

### 5.4 Canal sem subordinação trabalhista

As solicitações aos empregados terceirizados devem passar ordinariamente pelo preposto. O fiscal define o resultado contratual esperado e aponta desvios; a contratada decide como organizar seus trabalhadores para cumprir a obrigação, dentro da lei e do contrato.

Assim:

- o fiscal pode exigir a correção do resultado;
- o preposto organiza a resposta empresarial;
- o fiscal não escolhe rotinas de gestão de pessoal fora do contrato;
- o preposto não limita o acesso do fiscal às evidências e locais legitimamente fiscalizáveis.


## 5.5 Taxonomia de eventos da execução

| Evento | Pergunta principal |
|---|---|
| Incidente | Houve interrupção ou degradação? |
| Não conformidade | Requisito contratual foi descumprido? |
| Solicitação de serviço | Foi pedida atividade prevista? |
| Mudança | Pretende-se alterar ambiente ou solução? |
| Pleito ou *claim* | Uma parte pede reconhecimento jurídico ou econômico? |
| Risco materializado | Evento previsto ocorreu? |
| Problema ou causa-raiz | Por que incidentes continuam acontecendo? |

Misturar categorias distorce prazos, indicadores e encaminhamentos.

### Ciclo de incidentes

```text
detectar
→ classificar
→ preservar evidência
→ comunicar
→ conter
→ restaurar
→ resolver
→ validar
→ analisar causa
→ implementar ação corretiva
→ prevenir recorrência
→ encerrar
```

Tempo de resposta, contenção, restauração, resolução definitiva e validação são medidas diferentes. Uma solução temporária pode restaurar o serviço sem eliminar a causa.

## 6. Acompanhamento da execução contratual

### 6.1 Preparar, observar, tratar e aprender

O acompanhamento é contínuo e pode ser organizado em quatro fases:

| Fase | Atividades principais |
|---|---|
| Preparar | Distribuir papéis, alinhar canais, validar indicadores e organizar evidências |
| Observar | Coletar dados, inspecionar, testar e ouvir usuários |
| Tratar | Registrar desvios, comunicar, corrigir, verificar e escalar |
| Aprender | Consolidar histórico, atualizar riscos e melhorar futuras contratações |

Essas fases se repetem durante o contrato. O relatório mensal não substitui a atuação imediata diante de falha crítica.


### 6.1.1 Calendário de governança

| Rito | Finalidade |
|---|---|
| Reunião inicial | Ativar papéis, canais, dados e riscos |
| Reunião operacional | Acompanhar pendências e eventos recentes |
| Revisão mensal do serviço | Fechar indicadores e manifestações |
| Revisão de incidente crítico | Tratar impacto, causa e prevenção |
| Revisão de riscos | Atualizar probabilidade, impacto e controles |
| Revisão de mudança | Avaliar efeito operacional e contratual |
| Transição | Transferir histórico, acessos e responsabilidades |
| Encerramento | Concluir pendências, dados, ativos e conhecimento |

Cada rito relevante deve produzir decisões, ações, responsável, prazo, estado e evidência de conclusão.

### 6.2 Reunião inicial

A reunião inicial é útil para tornar executável o que o contrato já definiu. Ela pode alinhar:

- responsáveis titulares e substitutos;
- escopo e limites de cada papel;
- cronograma e marcos;
- indicadores, fontes e datas de corte;
- formato dos registros;
- canais e prazos de resposta;
- acesso a instalações e sistemas;
- riscos prioritários e contingências;
- processo de correção e escalonamento.

A ata registra o alinhamento, mas não altera o contrato por si só. Divergência identificada nessa reunião deve ser encaminhada à instância competente antes de produzir uma modificação material informal.

### 6.3 Plano de acompanhamento

Um plano aplicado pode usar uma matriz simples:

| Obrigação | Risco | Indicador ou teste | Fonte | Frequência | Responsável | Destino do registro |
|---|---|---|---|---|---|---|
| Disponibilidade | Interrupção do serviço | Percentual mensal e alerta crítico | Logs validados | Contínua/mensal | Fiscal técnico | Histórico e relatório |
| Prazo de resposta | Acúmulo de demandas | Percentual no prazo | Sistema de chamados | Semanal | Fiscal técnico | Painel e ocorrência |
| Material especificado | Queda de qualidade | Inspeção e amostra | Nota, foto e teste | Por entrega | Fiscal | Termo de inspeção |
| Comunicação | Resposta tardia | Prazo do preposto | Protocolo | Por evento | Fiscal/gestor | Processo contratual |

A matriz não substitui o contrato. Ela organiza o modo de provar e acompanhar obrigações já existentes.

### 6.4 Frequência orientada por risco

Periodicidade mensal não significa observação apenas mensal. A frequência deve considerar:

- velocidade com que o dano pode ocorrer;
- possibilidade de corrigir a falha depois;
- volume e variabilidade da prestação;
- criticidade para usuários e continuidade;
- confiabilidade dos dados;
- histórico da contratada.

Uma etapa que ficará oculta por obra posterior deve ser inspecionada antes de ser coberta. Um serviço essencial pode exigir alerta em tempo real. Prestação padronizada e de baixo risco pode admitir amostra periódica.


### 6.4.1 Tratamento separado de resultado e responsabilidade

Quatro trilhas podem coexistir:

1. restaurar ou corrigir a prestação;
2. medir o resultado efetivamente entregue;
3. decidir o valor devido conforme o contrato;
4. apurar eventual infração e responsabilidade.

A correção rápida reduz impacto, mas não apaga o fato. O redimensionamento do valor devido não é automaticamente sanção. A discussão de sanção não autoriza manter defeito sem tratamento.

### 6.4.2 Ação corretiva e preventiva

Uma ação é mais robusta quando identifica:

- ocorrência;
- contenção imediata;
- causa-raiz;
- correção definitiva;
- responsável;
- prazo;
- evidência de implementação;
- teste de eficácia;
- atualização de risco;
- prevenção de recorrência.

### 6.5 Tratamento de desvios

Ao identificar desvio, o fluxo aplicado é:

1. preservar a evidência;
2. relacionar o fato à obrigação ou ao indicador;
3. avaliar urgência, impacto e competência;
4. comunicar o preposto pelo canal adequado;
5. definir correção e prazo quando estiver na alçada do fiscal;
6. receber e analisar manifestação;
7. verificar se a correção foi efetiva;
8. atualizar registro, riscos e medição;
9. encaminhar ao gestor ou à autoridade o que exceder a competência.

Correção do serviço e apuração de responsabilidade são trilhas distintas. Corrigir rapidamente reduz o dano, mas não apaga automaticamente a ocorrência. Da mesma forma, discutir eventual sanção não autoriza deixar a prestação defeituosa sem tratamento imediato.

### 6.6 Comunicação e decisões

Comunicação eficaz é formal, rastreável e dirigida ao interlocutor correto. Conversa urgente pode iniciar a resposta, mas deve ser reduzida a registro quando produzir providência relevante.

O art. 123 da Lei nº 14.133/2021 impõe decisão explícita sobre solicitações e reclamações relacionadas à execução, ressalvados requerimentos manifestamente impertinentes, meramente protelatórios ou sem interesse para a boa execução. Concluída a instrução, o prazo geral é de um mês, prorrogável uma vez por igual período mediante motivação, salvo prazo legal ou contratual específico.

No modelo federal, o art. 28 do Decreto nº 11.246/2022 conta o prazo de um mês do protocolo do requerimento. Em prova, a fonte normativa pedida define o termo inicial.


### 6.6.1 Transição e saída

Na troca de fiscal, gestor, preposto ou empresa, transferir formalmente:

- pendências;
- incidentes abertos;
- pleitos e decisões aguardadas;
- medições e memórias;
- acessos e credenciais;
- ativos e documentos;
- dados e conhecimento;
- contatos e prazos;
- riscos e controles;
- responsabilidades temporárias.

A transição deve possuir critérios de aceite. “Realizar treinamento” é insuficiente sem conteúdo, público, evidência e verificação de assimilação. Credenciais antigas devem ser revogadas tempestivamente.

### 6.7 Histórico e transição

O histórico de gerenciamento deve reunir ordens, ocorrências, medições, comunicações, alterações, decisões e providências. Ele serve para:

- sustentar recebimento e pagamento;
- evitar perda de informação na troca de agentes;
- identificar reincidência e tendência;
- atualizar o relatório de riscos;
- instruir alterações, prorrogação, sanção ou extinção;
- aperfeiçoar novo planejamento e novos indicadores.

Na mudança de fiscal ou preposto, pendências, prazos, acessos e evidências devem ser transferidos formalmente. Trocar a pessoa não zera o histórico do contrato.

## 7. Modelo interno federal de 2026

O Decreto nº 13.031/2026 instituiu o Sistema Contratos.gov.br para a Administração Pública federal direta, autárquica e fundacional. Os requisitos completos de seu modelo interno pertencem ao Assunto 133. Para o recorte aplicado deste assunto, importa observar que o modelo federal exige canal entre representantes da Administração e preposto e método de avaliação da conformidade, integrando comunicação e evidência ao acompanhamento.

O sistema busca comunicação documentada, padronização, relatórios gerenciais e transparência. Os órgãos e entidades abrangidos devem assegurar a integridade dos dados e protegê-los contra danos e usos indevidos ou não autorizados. Sua obrigatoriedade federal não implica adoção automática pelo TCE-MA.


## 7.1 Casos aplicados

### Caso A — média mensal e falha crítica

A disponibilidade mensal foi de 99,6%, acima da meta de 99,5%, mas ocorreu interrupção de duas horas na janela de fechamento da folha.

Perguntas:

1. existe indicador específico para janela crítica?
2. o escore global admite compensação?
3. qual fonte comprova a interrupção?
4. há ajuste de pagamento?
5. a correção e eventual responsabilização seguem trilhas próprias?

### Caso B — manipulação de severidade

Chamados críticos foram reclassificados como comuns antes do fechamento mensal. O fiscal deve preservar logs, identificar autoria, recalcular a medição, ouvir o preposto, verificar falha de controle ou intenção e encaminhar eventual responsabilização.

### Caso C — amostra escolhida pela contratada

A empresa apresenta apenas ordens de serviço “representativas”. A seleção não é independente. O fiscal define a população, obtém a lista completa e seleciona ou valida a amostra.

### Caso D — ausência do preposto

O serviço continua, mas o preposto fica indisponível e não há substituto formal. A continuidade não elimina a falha do canal de representação. A Administração registra, exige regularização e avalia os efeitos previstos.

## 8. Caso integrado

Imagine contrato de manutenção com meta de disponibilidade de 99,5% no horário definido:

1. o contrato define janela, fórmula, exclusões, fonte dos logs e faixas de desempenho;
2. a reunião inicial confirma acessos e canais, sem mudar a fórmula;
3. o sistema registra indisponibilidade e o fiscal preserva os logs;
4. o fiscal confere se o evento integra a população computável;
5. o preposto recebe a comunicação e mobiliza a equipe da contratada;
6. o serviço é restabelecido e a causa é documentada;
7. o fiscal verifica a correção e registra duração e impacto;
8. ao fechar o período, a memória de cálculo mostra 99,2%;
9. a manifestação da contratada é analisada segundo as exclusões previstas;
10. o resultado segue para o tratamento contratual competente.

O fiscal não pode excluir o evento por mera cortesia, nem criar penalidade não prevista. O preposto não pode apagar ou reclassificar unilateralmente o registro. A correção técnica, a medição do resultado e eventual responsabilização permanecem trilhas relacionadas, mas juridicamente distintas.


## 8.1 Sinais de alerta de auditoria

- reclassificação frequente de severidade;
- chamados encerrados e reabertos em sequência;
- exclusões sem fundamento contratual;
- dados alterados sem log;
- amostra escolhida pela própria contratada;
- média adequada com cauda extrema;
- indicador secundário compensando falha crítica;
- atraso entre ocorrência e registro;
- ateste sem memória reproduzível;
- apoio técnico tratado como transferência de responsabilidade;
- preposto sem poderes ou indisponível;
- reuniões sem decisões, responsáveis ou prazos;
- troca de fiscal sem transição;
- credenciais mantidas após encerramento.

## 9. Erros recorrentes e pegadinhas

| Afirmação | Avaliação |
|---|---|
| SLA pode ser definido informalmente depois da contratação. | Errada. Obrigações e critérios materiais exigem previsão contratual válida. |
| Todo indicador precisa ser percentual. | Errada. A unidade depende do objeto. |
| Relatório da contratada dispensa validação. | Errada. A Administração deve verificar a evidência. |
| IMR é sinônimo de sanção. | Errada. Medição e responsabilização são institutos distintos. |
| Fiscalizar é apenas observar. | Errada. Inclui medir, registrar, corrigir e escalar. |
| Fiscal pode criar obrigação para resolver falha do edital. | Errada. Não pode alterar informalmente o contrato. |
| Preposto representa a Administração. | Errada. Representa a contratada. |
| Fiscal pode dirigir empregados terceirizados. | Errada. A organização do pessoal cabe à contratada. |
| Reunião inicial pode alterar meta contratual. | Errada. Ata não substitui alteração competente. |
| Acompanhamento mensal dispensa reação imediata. | Errada. Falha crítica exige tratamento tempestivo. |
| Correção elimina automaticamente a ocorrência. | Errada. O fato e seu tratamento devem permanecer registrados. |
| Contratos.gov.br é obrigatório para o TCE-MA. | Errada. O Decreto nº 13.031/2026 delimita âmbito federal. |

## 10. Checklist aplicado

- [ ] obrigação e resultado esperado identificados;
- [ ] indicador ligado ao objeto e ao risco;
- [ ] fórmula, unidade, população e exclusões definidas;
- [ ] meta, tolerância e consequência previstas;
- [ ] fonte e memória de cálculo reproduzíveis;
- [ ] fiscalizador conhece documentos, competência e escalonamento;
- [ ] preposto aceito, com poderes e canais claros;
- [ ] comunicação preserva autonomia da contratada;
- [ ] frequência de controle compatível com o risco;
- [ ] ocorrência ligada a cláusula e evidência;
- [ ] correção solicitada e posteriormente verificada;
- [ ] decisão fora da competência encaminhada em tempo hábil;
- [ ] histórico preservado para transição e aprendizado;
- [ ] norma geral separada dos modelos federais infralegais.


## 10.1 Síntese decisória

Para resolver uma situação-problema:

1. identifique a obrigação e a fonte;
2. confirme o âmbito da norma;
3. defina o evento e a população;
4. valide dados, relógio e evidência;
5. calcule ou classifique o resultado;
6. ouça a contratada quando cabível;
7. trate a correção;
8. separe pagamento de sanção;
9. encaminhe o que excede a competência;
10. preserve histórico, risco e aprendizado.

## Referências


- BRASIL. Presidência da República. [Lei nº 14.133, de 1º de abril de 2021](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm). Arts. 92, 115, 117, 118 e 123; texto consolidado consultado em 19 jul. 2026.
- BRASIL. Ministério da Gestão e da Inovação em Serviços Públicos. [Instrução Normativa SEGES/MP nº 5, de 26 de maio de 2017 — versão atualizada](https://www.gov.br/compras/pt-br/acesso-a-informacao/legislacao/instrucoes-normativas/instrucao-normativa-no-5-de-26-de-maio-de-2017-atualizada). Gestão, fiscalização, preposto, reunião inicial e IMR; consultada em 19 jul. 2026.
- BRASIL. Ministério da Economia. [Instrução Normativa SEGES/ME nº 98, de 26 de dezembro de 2022](https://www.gov.br/compras/pt-br/acesso-a-informacao/legislacao/instrucoes-normativas/instrucao-normativa-seges-me-no-98-de-26-de-dezembro-de-2022). Aplicação da IN nº 5/2017 no que couber.
- BRASIL. Presidência da República. [Decreto nº 11.246, de 27 de outubro de 2022](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/decreto/d11246.htm). Gestores, fiscais, assistência por terceiros e recebimentos; texto consolidado.
- BRASIL. Presidência da República. [Decreto nº 13.031, de 17 de junho de 2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d13031.htm). Sistema Contratos.gov.br e alterações do modelo federal.
- BRASIL. Tribunal de Contas da União. [Critérios de medição e de pagamento](https://licitacoesecontratos.tcu.gov.br/4-3-7-criterios-de-medicao-e-de-pagamento-2/). Orientações e Jurisprudência do TCU.
- BRASIL. Presidência da República. [Lei nº 14.133, de 1º de abril de 2021 — Lei de Licitações e Contratos Administrativos](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm). Arts. 92, 115, 117, 118 e 123; texto consolidado vigente no corte de 19 jul. 2026. Acesso em: 19 jul. 2026.
- BRASIL. Ministério da Gestão e da Inovação em Serviços Públicos. [Instrução Normativa SEGES/MP nº 5, de 26 de maio de 2017](https://www.gov.br/compras/pt-br/acesso-a-informacao/legislacao/instrucoes-normativas/instrucao-normativa-no-5-de-26-de-maio-de-2017-atualizada). Arts. 39 a 48 e Anexos V-B e VIII-A, em texto atualizado. Acesso em: 19 jul. 2026.
- BRASIL. Ministério da Economia. [Instrução Normativa SEGES/ME nº 98, de 26 de dezembro de 2022](https://www.gov.br/compras/pt-br/acesso-a-informacao/legislacao/instrucoes-normativas/instrucao-normativa-seges-me-no-98-de-26-de-dezembro-de-2022). Aplicação da IN nº 5/2017 no que couber. Acesso em: 19 jul. 2026.
- BRASIL. Presidência da República. [Decreto nº 11.246, de 27 de outubro de 2022](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/decreto/d11246.htm). Atuação de gestores e fiscais no âmbito federal, em texto consolidado. Acesso em: 19 jul. 2026.
- BRASIL. Presidência da República. [Decreto nº 13.031, de 17 de junho de 2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d13031.htm). Sistema Contratos.gov.br, modelo interno de gestão e alterações do Decreto nº 11.246/2022; publicado no DOU de 18 jun. 2026. Acesso em: 19 jul. 2026.
- BRASIL. Tribunal de Contas da União. [Critérios de medição e de pagamento](https://licitacoesecontratos.tcu.gov.br/4-3-7-criterios-de-medicao-e-de-pagamento-2/). Licitações e Contratos: Orientações e Jurisprudência do TCU. Acesso em: 19 jul. 2026.
- BRASIL. Tribunal de Contas da União. [Início da execução do contrato](https://licitacoesecontratos.tcu.gov.br/6-1-3-inicio-da-execucao-do-contrato/). Licitações e Contratos: Orientações e Jurisprudência do TCU. Acesso em: 19 jul. 2026.
