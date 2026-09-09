---
schemaVersion: 1
title: "Gestão aplicada da execução contratual"
description: "Indicadores, SLA, IMR, evidências, fiscalização, preposto, incidentes, governança, transição e acompanhamento da execução contratual."
order: 136
storageId: "gestao-aplicada-execucao"
---

# Gestão aplicada da execução contratual

Um contrato pode estar juridicamente perfeito e, mesmo assim, ser mal executado. O problema prático é descobrir **se a obrigação foi cumprida, com que evidência e qual providência cabe diante do resultado**.

Considere um **exemplo hipotético**. Um serviço contínuo prevê que pelo menos 95% das demandas computáveis sejam concluídas no prazo. A contratada apresenta 97%, mas a fiscalização percebe que cinco demandas atrasadas foram excluídas sem base contratual. O ponto decisivo não é “qual planilha parece melhor”, e sim reconstruir uma cadeia verificável:

**obrigação pactuada → critério de aferição → dado confiável → comparação com a meta → registro → correção ou encaminhamento competente**

Esse é o modelo mental do assunto. Indicadores, preposto, fiscal, reuniões e sistemas só são úteis quando ajudam essa cadeia a funcionar.

> **Corte de prova:** legislação vigente em **6 de julho de 2026**, data do Edital nº 1 do <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr>. O Decreto nº 13.031/2026, publicado em 18 de junho de 2026, já integrava o corte. A <abbr title="Instrução Normativa">IN</abbr> nº 5/2017 e os Decretos nº 11.246/2022 e nº 13.031/2026 têm âmbito federal próprio; sua presença como referência de gestão não os transforma automaticamente em regulamento interno do <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr>.

## 1. O contrato precisa virar um padrão observável

A fiscalização não cria depois da execução o padrão que usará para julgar o serviço. Ela parte do que foi contratado: objeto, quantidade, qualidade, prazos, condições, critérios de medição, modelo de gestão e demais obrigações aplicáveis.

Por isso, toda boa aferição responde primeiro a quatro perguntas:

1. **qual obrigação está sendo examinada?**
2. **qual fato demonstra cumprimento ou descumprimento?**
3. **de onde virá a evidência?**
4. **qual consequência o contrato associa ao resultado?**

“Prestar serviço com qualidade” é uma obrigação pouco útil para aferição se o próprio instrumento não indicar como a qualidade será reconhecida. Já “concluir ao menos 95% das demandas computáveis em até quatro horas, segundo os registros do sistema, no período mensal” permite testar o resultado.

A ideia central é transformar uma obrigação em **critério verificável**, sem inventar exigência nova.

### 1.1 Indicador, meta e consequência não são a mesma coisa

Na linguagem de gestão de serviços, é comum separar três camadas:

- <abbr title="Indicador de Nível de Serviço">SLI</abbr>: o **indicador medido**, como percentual de demandas concluídas no prazo;
- <abbr title="Objetivo de Nível de Serviço">SLO</abbr>: a **meta** esperada para esse indicador, como 95%;
- <abbr title="Acordo de Nível de Serviço">SLA</abbr>: o **compromisso de nível de serviço** associado a consequências definidas para o atendimento ou o descumprimento.

Essas siglas ajudam a raciocinar, mas não substituem o contrato nem constituem, por si sós, categorias obrigatórias da Lei nº 14.133/2021.

No modelo federal de serviços, a <abbr title="Instrução Normativa">IN</abbr> nº 5/2017 usa o **<abbr title="Instrumento de Medição de Resultado">IMR</abbr>** como mecanismo que define níveis esperados de qualidade em bases compreensíveis, objetivamente observáveis e comprováveis, com as correspondentes adequações de pagamento. O <abbr title="Instrumento de Medição de Resultado">IMR</abbr> não é sinônimo automático de <abbr title="Acordo de Nível de Serviço">SLA</abbr>: ele é um instrumento normativamente previsto para aferição e eventual redimensionamento do pagamento no âmbito em que a <abbr title="Instrução Normativa">IN</abbr> se aplica.

### 1.2 A ficha mínima de um indicador

Um indicador auditável precisa permitir que outra pessoa reproduza a apuração. Antes de calcular, identifique:

| Elemento | Pergunta |
| --- | --- |
| objeto observado | o que exatamente está sendo medido? |
| população | quais eventos entram no universo da medição? |
| regra de inclusão e exclusão | que eventos contam e quais podem ser retirados? |
| fonte | de qual registro os dados serão obtidos? |
| período | qual janela de tempo será considerada? |
| cálculo | como se chega ao resultado? |
| meta ou faixa | qual resultado caracteriza conformidade? |
| consequência | o que o instrumento prevê se a meta não for atingida? |

A ordem importa. **Primeiro se define quem entra na conta; depois se calcula.** Alterar a população depois de conhecer o resultado compromete a confiabilidade da medição.

Um indicador simples de prazo pode ser expresso assim:

\[
\text{Índice no prazo} =
\frac{\text{demandas computáveis concluídas no prazo}}
{\text{total de demandas computáveis}}
\times 100
\]

Se 92 de 100 demandas computáveis ficaram no prazo, o índice é 92%.

Outro indicador frequente é a disponibilidade:

\[
\text{Disponibilidade} =
\frac{\text{tempo computável} - \text{indisponibilidade computável}}
{\text{tempo computável}}
\times 100
\]

A fórmula só é útil quando “tempo computável” e “indisponibilidade computável” já têm critérios definidos. Manutenção programada, indisponibilidade causada por terceiro ou período fora do horário contratado não podem ser excluídos por conveniência: a exclusão precisa encontrar fundamento no instrumento aplicável.

### 1.3 Média, percentil e valores extremos

Uma média pode esconder poucos eventos muito ruins. Por isso, alguns contratos usam **percentis**, isto é, pontos da distribuição que indicam até que valor determinada proporção das observações se encontra.

Se um relatório informa <abbr title="percentil 95">P95</abbr> de tempo de resposta, a leitura geral é que, segundo o método de cálculo adotado, 95% das observações ficaram naquele valor ou abaixo dele. Isso não significa que o pior evento tenha aquele tempo.

Há diferentes convenções para calcular percentis. Quando o instrumento define uma delas, a fiscalização deve aplicá-la de modo consistente; não se escolhe o método depois de ver qual resultado favorece uma conclusão.

## 2. Evidência: medir não é apenas receber um relatório

O dado apresentado pela contratada pode ser parte da prova, mas não se torna verdadeiro apenas porque foi colocado em uma planilha ou em um sistema. A fiscalização precisa avaliar se a evidência realmente demonstra o fato que se pretende provar.

Uma boa evidência tem, conforme a natureza do objeto, cinco propriedades:

- **pertinência:** prova o aspecto relevante da obrigação;
- **origem identificável:** permite saber de onde o dado veio;
- **integridade:** não foi alterada sem registro;
- **temporalidade:** corresponde ao período efetivamente medido;
- **reprodutibilidade:** outra pessoa consegue refazer a apuração a partir da base e da regra utilizadas.

Registros primários do sistema, testes reproduzíveis e documentos produzidos no momento do fato costumam exigir menos inferência do que uma captura de tela isolada ou uma declaração genérica. Isso não cria uma hierarquia absoluta: a força da prova depende do fato que se quer demonstrar e da qualidade concreta do registro.

### 2.1 Relatório derivado deve voltar à base

Imagine que o relatório mensal informe 97% de cumprimento. A pergunta de controle é: **quais eventos formaram numerador e denominador?**

A apuração deve permitir:

1. localizar a população original;
2. identificar cada exclusão e seu fundamento;
3. conferir datas, horários e estados dos eventos;
4. refazer o cálculo;
5. comparar o resultado reproduzido com o relatório apresentado.

Se um dado primário foi sobrescrito ou se o sistema permite editar resultados sem registrar autoria, data ou versão, a trilha de verificação fica enfraquecida. A digitalização, por si só, não garante integridade.

### 2.2 Amostragem: reduzir o volume sem perder o método

Nem todo contrato exige conferência integral de cada evento. A amostragem pode ser adequada quando a natureza do objeto e o modelo aplicável a admitirem, mas deve ter método documentado.

É preciso saber, no mínimo:

- qual é a população;
- qual é a unidade examinada;
- como os itens foram selecionados;
- quantos itens foram verificados;
- quais grupos, períodos ou unidades ficaram de fora;
- quais limites existem para generalizar a conclusão.

Uma seleção dirigida a eventos de maior risco é útil para encontrar problemas, mas não equivale automaticamente a uma amostra aleatória representativa da população. Também é inadequado deixar a seleção exclusivamente sob controle de quem será avaliado.

### 2.3 Sinais de que a métrica pode estar sendo distorcida

A fiscalização deve olhar além do percentual final. Merecem conferência, por exemplo:

- exclusões sem fundamento;
- mudança de categoria depois do evento;
- encerramento e reabertura usados para reiniciar prazo sem previsão;
- alteração do relógio ou do marco inicial;
- duplicidades eliminadas sem trilha;
- concentração de falhas em unidade, turno ou tipo de demanda que a média geral esconde;
- relatório derivado que diverge da base primária.

A resposta correta não é presumir fraude. É **preservar os dados, reconstruir a regra, registrar a divergência e apurar o resultado correto**.

## 3. Fiscal e preposto ocupam lados diferentes da execução

A Lei nº 14.133/2021 exige que a execução seja acompanhada e fiscalizada por um ou mais fiscais especialmente designados, ou por seus substitutos. O fiscal representa a Administração no acompanhamento; o **preposto** representa o contratado na execução.

Essa diferença resolve várias pegadinhas.

| Fiscal | Preposto |
| --- | --- |
| representa a Administração | representa a contratada |
| observa a execução | organiza a resposta da empresa |
| registra ocorrências | recebe e encaminha comunicações da contratada |
| determina regularização dentro de sua competência | adota ou coordena as providências que cabem à empresa |
| informa aos superiores o que excede sua competência | não decide pela Administração |

O <abbr title="artigo">art.</abbr> 117 da Lei nº 14.133/2021 fornece o ciclo mínimo do fiscal: **acompanhar → registrar → determinar a regularização necessária → informar tempestivamente o que ultrapassa sua competência**.

Isso não autoriza o fiscal a:

- alterar objeto, preço, fórmula ou obrigação por comunicação informal;
- aplicar critério criado depois da execução;
- atestar prestação sem suporte;
- assumir a própria execução do serviço;
- decidir matéria reservada a gestor ou autoridade competente.

Terceiro contratado pode assistir e subsidiar a fiscalização com informações, mas não pode exercer atribuição própria e exclusiva de fiscal; a assistência também não elimina a responsabilidade do fiscal nos limites das informações recebidas.

### 3.1 O preposto é o canal da contratada, não um empregado da Administração

O <abbr title="artigo">art.</abbr> 118 da Lei nº 14.133/2021 determina que o contratado mantenha preposto aceito pela Administração no local da obra ou do serviço para representá-lo na execução.

No modelo federal da <abbr title="Instrução Normativa">IN</abbr> nº 5/2017, o preposto deve ser formalmente designado antes do início da prestação, com poderes e deveres expressos. A Administração pode recusar sua indicação ou manutenção de forma justificada, e a contratada designa outro.

A lógica prática é:

**Administração cobra o resultado → preposto recebe a comunicação → contratada dirige seus trabalhadores e organiza a resposta.**

A <abbr title="Instrução Normativa">IN</abbr> nº 5/2017 veda ingerência que produza subordinação direta dos empregados da contratada. A regra é reportar-se ao preposto ou responsável indicado. Há exceção quando o próprio objeto prevê notificação direta para tarefas previamente descritas; essa exceção não autoriza transformar a Administração em gestora cotidiana da mão de obra da empresa.

A assinatura ou ciência do preposto em uma avaliação prova que ele tomou conhecimento. **Ciência não significa concordância**, nem transfere à empresa a avaliação que compete à fiscalização.

## 4. Acompanhamento é um ciclo contínuo

O relatório mensal é apenas uma fotografia consolidada. A boa gestão ocorre antes, durante e depois do fechamento do período.

### 4.1 Antes da primeira medição

A equipe precisa saber:

- quais obrigações são críticas;
- que fontes produzirão as evidências;
- quem terá acesso aos registros;
- quais relógios, marcos e períodos serão usados;
- quais exclusões são permitidas;
- quem recebe comunicações e quem decide cada tipo de matéria.

No modelo federal da <abbr title="Instrução Normativa">IN</abbr> nº 5/2017, a reunião inicial pode apresentar obrigações, mecanismos de fiscalização, estratégia de execução, método de aferição e sanções aplicáveis. A reunião organiza a execução; **não altera livremente o contrato**.

### 4.2 Durante a execução

O ciclo operacional pode ser memorizado assim:

**observar → registrar → comunicar → corrigir → verificar → escalar**

Um bom registro permite reconstruir o caminho. Deve ligar, de forma proporcional ao caso:

**fato → obrigação → evidência → providência → responsável → prazo → resposta → resultado**

Uma falha crítica não deve aguardar a reunião ordinária do mês seguinte apenas porque existe calendário de governança. A frequência do acompanhamento acompanha o risco do evento.

### 4.3 Nem todo evento é a mesma coisa

Uma solicitação normal de serviço não é, por si só, descumprimento. Um incidente que interrompe o serviço não é automaticamente infração sancionável. Uma não conformidade é uma divergência em relação ao padrão aplicável. Um pedido econômico da contratada é um pleito que exige instrução e decisão por quem tenha competência.

Classificar corretamente o evento evita aplicar o fluxo errado.

Em incidentes relevantes, também é útil separar:

**contenção do impacto → restauração do serviço → solução definitiva → validação → análise de causa e prevenção, quando cabíveis**

Restaurar provisoriamente o serviço não prova, por si só, que a causa foi eliminada.

### 4.4 Troca de fiscal ou preposto não apaga o histórico

A continuidade da fiscalização depende da memória do contrato. Em transições, devem ser preservados e transferidos, conforme o caso, medições em aberto, ocorrências, comunicações, pedidos, riscos, acessos necessários, evidências e critérios utilizados.

Mudar a pessoa responsável não reinicia prazos nem transforma pendência antiga em assunto novo. Da mesma forma, credenciais que perderam finalidade devem ser revogadas segundo os controles aplicáveis.

## 5. Um mesmo fato pode abrir trilhas diferentes

Esta é uma das distinções mais importantes do assunto.

Imagine que uma parcela do serviço fique abaixo do nível contratado. A mesma ocorrência pode exigir respostas distintas:

| Trilha | Pergunta central | Exemplo de resposta |
| --- | --- | --- |
| **correção operacional** | como regularizar a execução? | refazer, reparar ou corrigir a prestação |
| **medição e valor devido** | quanto da prestação foi efetivamente reconhecido? | aplicar o critério de medição e eventual redimensionamento previsto |
| **responsabilização** | houve infração que justifique sanção? | instruir e encaminhar para o rito e a autoridade competentes |
| **pedido ou controvérsia** | há matéria que exige decisão administrativa? | instruir o requerimento e encaminhá-lo a quem possa decidir |

Essas trilhas se relacionam, mas **não são sinônimas**.

A correção rápida não apaga necessariamente o registro da ocorrência. O redimensionamento do pagamento previsto no modelo de medição não é automaticamente multa. E a existência de possível infração não autoriza o fiscal a aplicar sanção fora de sua competência ou sem o processo exigido.

No <abbr title="Instrumento de Medição de Resultado">IMR</abbr> federal, a <abbr title="Instrução Normativa">IN</abbr> nº 5/2017 admite redimensionar o pagamento conforme indicadores previamente estabelecidos quando os resultados, atividades, qualidade ou recursos exigidos não forem entregues como pactuado. A própria norma admite que outros mecanismos de avaliação coexistam e trata separadamente as sanções cabíveis.

### 5.1 Encaminhar não é silenciar

O <abbr title="artigo">art.</abbr> 123 da Lei nº 14.133/2021 impõe à Administração o dever de decidir explicitamente solicitações e reclamações relacionadas à execução, salvo requerimentos manifestamente impertinentes, meramente protelatórios ou sem interesse para a boa execução.

Salvo prazo legal ou contratual específico, **depois de concluída a instrução**, a Administração tem um mês para decidir, admitida prorrogação motivada por igual período.

O fiscal que recebe um pedido fora de sua competência não deve decidir por conveniência nem deixá-lo parado: registra, instrui no que lhe cabe e encaminha tempestivamente.

## 6. O modelo federal de 2026 e o Contratos.gov.br

O Decreto nº 13.031/2026 instituiu o Sistema Contratos.gov.br no âmbito da Administração Pública federal direta, autárquica e fundacional e alterou o Decreto nº 11.246/2022.

No regime federal alcançado pelo decreto, o modelo interno de gestão deve conter, no mínimo:

- responsáveis pelas atividades de gestão e fiscalização e seus substitutos;
- forma de comunicação entre Administração e contratada, por seus representantes e pelo preposto;
- método de avaliação da conformidade;
- prazos para respostas a determinados pedidos econômicos;
- procedimentos para sanções, redimensionamentos do valor reconhecido e extinção.

O sistema organiza registros; ele **não substitui** gestor, fiscal, preposto, critério contratual ou autoridade competente. O próprio decreto exige que os órgãos e entidades assegurem a integridade dos dados e das informações nele registrados.

Para a prova, mantenha a fronteira: esse é um **modelo federal vigente no corte**. O decreto não torna o Contratos.gov.br automaticamente obrigatório ao <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr>.

## 7. Aplicação integrada: refazendo a medição

Volte ao exemplo inicial.

O contrato hipotético exige que 95% das demandas computáveis sejam concluídas no prazo. Houve 100 demandas no período. A contratada excluiu cinco atrasos sem base contratual e, com isso, apresentou aproximadamente 97%: 92 demandas no prazo entre 95 que manteve no denominador.

A fiscalização deve seguir a cadeia:

1. **obrigação:** meta de 95% das demandas computáveis no prazo;
2. **população:** 100 demandas, porque as cinco exclusões não têm fundamento;
3. **evidência:** registros primários dos eventos e regra contratual de contagem;
4. **cálculo reproduzido:** 92 ÷ 100 = 92%;
5. **registro:** documentar as exclusões indevidas, a memória de cálculo e a divergência;
6. **comunicação:** cientificar o preposto e receber a manifestação da contratada;
7. **correção:** exigir a regularização que caiba na execução e no relatório;
8. **efeito financeiro:** aplicar somente o mecanismo previamente previsto no contrato, se houver;
9. **escalonamento:** encaminhar eventual matéria sancionatória, alteração contratual ou decisão fora da competência do fiscal.

Observe o que **não** cabe fazer: aceitar a exclusão porque melhora o indicador; criar depois uma tolerância; transformar redimensionamento em multa; alterar o contrato por e-mail; ou dirigir pessoalmente os empregados da contratada para “compensar” o atraso.

## 8. Fechamento: as perguntas que resolvem o caso

Diante de qualquer problema de execução, percorra estas perguntas na ordem:

1. **Qual obrigação contratual está em jogo?**
2. **Qual critério transforma essa obrigação em algo verificável?**
3. **Qual é a população, a fonte e a regra de exclusão dos dados?**
4. **A evidência permite reproduzir a conclusão?**
5. **Quem pode registrar, corrigir, representar e decidir?**
6. **O efeito é correção, medição do valor, decisão administrativa ou possível responsabilização?**

Se essas seis respostas estiverem claras, indicadores, <abbr title="Acordo de Nível de Serviço">SLA</abbr>, <abbr title="Instrumento de Medição de Resultado">IMR</abbr>, fiscal, preposto e sistemas deixam de ser peças soltas e passam a formar um único mecanismo de controle da execução.
