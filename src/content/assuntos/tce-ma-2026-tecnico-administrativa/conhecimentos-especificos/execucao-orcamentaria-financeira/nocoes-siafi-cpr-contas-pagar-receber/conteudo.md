---
schemaVersion: 1
title: "Noções de SIAFI e CPR — contas a pagar e a receber"
description: SIAFI e subsistema CPR, com Documento Hábil, contas a pagar e a receber, compromissos, pré-docs, realização e controles essenciais.
order: 151
storageId: tec-siafi-cpr-151
---

# Noções de <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> e <abbr title="Contas a Pagar e a Receber">CPR</abbr> — contas a pagar e a receber

## 1. Como uma obrigação vira algo que o sistema pode pagar?

Considere uma situação **hipotética**. Uma unidade federal recebeu um serviço, conferiu a documentação e reconheceu que deve pagar o fornecedor. Em outro processo, a mesma unidade tem um valor a receber de terceiro.

O sistema precisa representar os dois fatos sem confundir quatro coisas diferentes:

1. **o fato que deu origem ao direito ou à obrigação**;
2. **o registro desse fato**;
3. **o valor que ainda precisa ser pago, recolhido ou recebido**;
4. **a efetiva realização desse valor**.

É para organizar esse encadeamento que aparece o <abbr title="Contas a Pagar e a Receber">CPR</abbr>, dentro do <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr>. O mapa conceitual é:

**fato documentado → Documento Hábil → compromissos → pendências e dados de realização → realização**

Esse mapa é mais importante do que decorar posição de botão. Registrar a obrigação **não significa pagá-la**; gerar um compromisso **não significa que ele já esteja realizável**; e uma conta a receber não usa exatamente os mesmos polos de uma conta a pagar.

> **Corte da prova:** este capítulo considera o <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr>/<abbr title="Contas a Pagar e a Receber">CPR</abbr> no recorte do Edital nº 1 do <abbr title="Tribunal de Contas do Estado do Maranhão">TCE/MA</abbr>, de **6 de julho de 2026**. A documentação operacional do Tesouro é viva; por isso, o estudo privilegia conceitos e fluxos estáveis e distingue deles detalhes de interface. O <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> é sistema **federal**: sua cobrança no edital não o transforma em sistema de execução próprio do <abbr title="Tribunal de Contas do Estado do Maranhão">TCE/MA</abbr>.

A unidade 149 já ensina empenho, liquidação e pagamento como estágios jurídicos da despesa. Aqui a pergunta é outra: **como o sistema federal registra e conduz as informações até a realização?**

## 2. <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr>: ambiente integrado, não simples sistema de pagamento

O <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> é o principal instrumento federal de registro, acompanhamento e controle da execução **orçamentária, financeira e patrimonial**. Entre suas finalidades institucionais estão o controle diário da execução, o apoio à programação financeira, a padronização de rotinas e a produção de informações contábeis e gerenciais.

“Integrado” não quer dizer “tudo é a mesma etapa”. Um fato pode produzir efeitos orçamentários, financeiros e patrimoniais relacionados, mas cada dimensão conserva sua natureza. Um empenho, por exemplo, não é o próprio pagamento; a existência de um direito a receber também não significa que o ingresso já ocorreu.

A estrutura institucional do <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> é organizada por exercícios, subsistemas, módulos e transações. O <abbr title="Contas a Pagar e a Receber">CPR</abbr> aparece nessa estrutura como recurso de aplicação específica voltado ao tratamento de contas a pagar e a receber.

Duas relações devem ficar estáveis:

- **<abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> > <abbr title="Contas a Pagar e a Receber">CPR</abbr>:** o segundo integra o primeiro; não é sistema concorrente;
- **<abbr title="Contas a Pagar e a Receber">CPR</abbr> ≠ apenas pagamentos:** ele também trata direitos e recebimentos.

## 3. <abbr title="Contas a Pagar e a Receber">CPR</abbr>: dois núcleos para acompanhar o fluxo

A documentação do Tesouro organiza o <abbr title="Contas a Pagar e a Receber">CPR</abbr> em torno de dois núcleos funcionais: **Documento Hábil** e **Compromissos**.

O **Documento Hábil** descreve o fato que deve ser processado no módulo: quem está no polo da operação, qual é o valor, qual é a origem e quais informações orçamentárias, financeiras ou patrimoniais se aplicam.

O **compromisso**, por sua vez, representa valor que precisa seguir para alguma forma de realização. Ele nasce do processamento do Documento Hábil quando a configuração do fato assim exigir.

A relação é, portanto:

**Documento Hábil registra e organiza o fato → o processamento pode gerar compromissos → os compromissos são preparados e realizados**

Esse encadeamento impede um erro frequente: tratar Documento Hábil, compromisso e pagamento como nomes diferentes para a mesma coisa.

## 4. Documento Hábil: primeiro descreva corretamente o fato

### 4.1 Pagamento e Recebimento são naturezas diferentes

O Manual <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> distingue duas naturezas de Documento Hábil:

| Natureza | Polo principal | Ideia central |
|---|---|---|
| **Pagamento** | credor/favorecido | existe obrigação ou valor a realizar em favor de alguém |
| **Recebimento** | devedor/recolhedor | existe direito ou valor a receber de alguém |

O **tipo** do Documento Hábil condiciona sua natureza e o conjunto de informações aplicáveis. Por isso, não é correto imaginar um formulário universal em que todo Documento Hábil seja “nota para pagar fornecedor”.

A identificação do documento também preserva elementos como unidade emitente, exercício, tipo e número. Esses dados permitem localizar o registro e relacioná-lo a outros documentos do <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr>.

### 4.2 O registro pode conversar com o orçamento sem substituí-lo

Quando a operação envolve despesa apoiada em execução orçamentária, o Documento Hábil pode conter o bloco **Principal com Orçamento**, relacionando a apropriação ao empenho correspondente.

Isso não cria crédito nem substitui o empenho. O <abbr title="Contas a Pagar e a Receber">CPR</abbr> recebe e organiza informação de uma execução orçamentária que já possui fundamento próprio.

Também existem blocos para situações sem apropriação orçamentária no mesmo formato, créditos, deduções, encargos, variações patrimoniais e outros lançamentos conforme o tipo e a situação do documento. Para a prova de **noções**, o essencial não é memorizar todas as abas: é perceber que a configuração do fato determina quais informações entram no Documento Hábil.

### 4.3 Dedução não é encargo

Uma **dedução** destaca valor do fluxo principal e pode gerar compromisso próprio. Se uma retenção tributária for juridicamente devida, por exemplo, o <abbr title="Contas a Pagar e a Receber">CPR</abbr> pode tratar separadamente o líquido devido ao fornecedor e o valor a recolher.

O fundamento da retenção não nasce do sistema; ele vem da legislação estudada na unidade 150.

Um **encargo** também pode gerar compromisso próprio, mas é categoria distinta de dedução. A classificação correta importa porque cada parcela pode ter favorecido, documento de realização e condições próprios.

## 5. Registrar o Documento Hábil não é realizar o valor

Quando um Documento Hábil é registrado, o sistema valida as informações, processa a contabilização cabível e pode gerar compromissos. Esse é um marco de processamento, não a prova de que o dinheiro já saiu ou entrou.

A documentação oficial de integração do Tesouro expõe, para consulta de compromissos, os tipos **Líquido, Encargo, Dedução e Variação Patrimonial**. Isso evita transformar a tríade líquido–dedução–encargo em lista exaustiva.

Para compreender o mecanismo:

- **Líquido:** parcela principal que permanece a pagar ou receber depois dos destaques aplicáveis;
- **Dedução:** parcela destacada que segue tratamento próprio;
- **Encargo:** obrigação adicional tratada como compromisso distinto;
- **Variação Patrimonial:** categoria própria prevista na documentação do sistema para compromissos de natureza patrimonial.

Nem todo Documento Hábil gera todos esses tipos, e nem toda operação gera compromisso.

### 5.1 Um exemplo reaproveitável

Suponha, **hipoteticamente**, que um Documento Hábil de Pagamento reconheça R$ 100.000 e exista retenção juridicamente válida de R$ 5.000.

No <abbr title="Contas a Pagar e a Receber">CPR</abbr>, a configuração pode produzir:

- compromisso líquido de R$ 95.000 para o favorecido;
- compromisso de dedução de R$ 5.000 para o recolhimento correspondente.

O exemplo ensina apenas a representação operacional. **Qual tributo deve ser retido, qual alíquota se aplica e para quem recolher são perguntas jurídicas anteriores**, tratadas na unidade 150.

## 6. Compromisso existente ainda pode não estar pronto

Depois de gerado, o compromisso pode depender de requisitos adicionais antes de sua realização. A documentação do <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> trabalha com situações como pendência de execução orçamentária, pendência de homologação e pendência de informações para o documento de realização.

É aqui que aparece o <abbr title="Conjunto de dados prévios que prepara o documento de realização">pré-doc</abbr>. Ele reúne informações necessárias para que o compromisso seja posteriormente realizado pelo documento adequado. Portanto:

- Documento Hábil registra o fato;
- compromisso representa valor a realizar;
- <abbr title="Conjunto de dados prévios que prepara o documento de realização">pré-doc</abbr> prepara dados para a realização;
- documento de realização efetiva a operação.

A sequência **pendente → realizável → realizado** é uma boa intuição, mas não deve ser confundida com uma lista única de estados do Documento Hábil. Na consulta de Documentos Hábeis, o Manual distingue estados como **Pendente de Realização, Realizado, Cancelado e Não Realizável**; já determinadas pendências, como **Pendente de Homologação**, qualificam compromissos vinculados ao documento.

Essa separação é importante: **estado do Documento Hábil e condição de um compromisso relacionado não são exatamente a mesma informação**.

## 7. Realização: o compromisso encontra seu documento adequado

**Realizar** um compromisso significa efetivá-lo pelo instrumento previsto para aquela operação. O documento não é universal.

Conforme a natureza do compromisso, o <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> admite documentos como <abbr title="Ordem Bancária">OB</abbr>, <abbr title="Guia de Recolhimento da União">GRU</abbr>, <abbr title="Documento de Arrecadação de Receitas Federais">DARF</abbr> e outros instrumentos próprios.

Duas consequências ajudam a resolver questões:

1. nem todo compromisso de pagamento é realizado por <abbr title="Ordem Bancária">OB</abbr>;
2. uma <abbr title="Guia de Recolhimento da União">GRU</abbr> não se torna documento universal de pagamento só porque pode aparecer como documento de realização em operações compatíveis.

O <abbr title="Conjunto de dados prévios que prepara o documento de realização">pré-doc</abbr> antecede essa efetivação. Se ele ainda está incompleto quando exigido, a simples existência do compromisso não autoriza concluir que a realização já ocorreu.

## 8. Um mecanismo, duas direções: pagar e receber

A lógica do <abbr title="Contas a Pagar e a Receber">CPR</abbr> funciona em duas direções.

### Conta a pagar

**obrigação documentada → Documento Hábil de Pagamento → credor/favorecido → compromissos → preparação → realização**

### Conta a receber

**direito documentado → Documento Hábil de Recebimento → devedor/recolhedor → compromissos cabíveis → preparação → realização**

O Manual diferencia inclusive campos temporais de pagamento e de recebimento. Isso mostra que a segunda direção não é mero “espelho de palavras”: natureza, polos e dados do fluxo mudam.

Ao mesmo tempo, o <abbr title="Contas a Pagar e a Receber">CPR</abbr> não revoga os estágios legais da despesa. Empenho, liquidação e pagamento continuam sujeitos às normas próprias. O módulo organiza registros e compromissos no ambiente do <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr>; ele não cria autorização orçamentária nem transforma registro em desembolso.

## 9. Alteração, cancelamento e rastreabilidade dependem do estágio

O sistema preserva histórico das operações sobre o Documento Hábil. Corrigir um registro não significa simplesmente apagar o fato anterior.

Também não se pode tratar da mesma forma:

- documento ainda sem compromissos realizados;
- documento com parte dos compromissos realizada;
- documento cujos compromissos foram integralmente realizados.

O estágio do processamento condiciona alteração, cancelamento, baixa, estorno ou tratamento dos itens pendentes. Para uma prova de noções, basta compreender a regra de raciocínio: **quanto mais o fluxo avançou, menos correta é a ideia de que basta “apagar e refazer” o Documento Hábil**.

## 10. Como resolver questões sobre <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr>/<abbr title="Contas a Pagar e a Receber">CPR</abbr>

Percorra o fluxo em vez de procurar uma palavra isolada:

1. **Qual é o ambiente?** O <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> é o sistema integrado; o <abbr title="Contas a Pagar e a Receber">CPR</abbr> integra sua estrutura.
2. **O fato é pagamento ou recebimento?** Isso define a natureza do Documento Hábil e o polo principal.
3. **Que informações o fato exige?** Pode haver relação orçamentária, dedução, encargo, variação patrimonial e outros dados conforme a situação.
4. **O Documento Hábil foi apenas registrado ou já gerou compromissos?** Não salte do registro para o pagamento.
5. **Que tipo de compromisso existe?** Não reduza a taxonomia atual a apenas líquido, dedução e encargo.
6. **Há alguma pendência?** Verifique execução orçamentária, homologação e dados de realização quando aplicáveis.
7. **O <abbr title="Conjunto de dados prévios que prepara o documento de realização">pré-doc</abbr> está completo quando exigido?** Ele prepara o instrumento que efetivará o compromisso.
8. **O compromisso está realizável ou já foi realizado?** São momentos diferentes.
9. **Qual documento de realização é compatível?** <abbr title="Ordem Bancária">OB</abbr>, <abbr title="Guia de Recolhimento da União">GRU</abbr>, <abbr title="Documento de Arrecadação de Receitas Federais">DARF</abbr> ou outro previsto para a operação.
10. **A questão confundiu sistema e regra jurídica?** O <abbr title="Contas a Pagar e a Receber">CPR</abbr> operacionaliza registros; não cria empenho, fundamento tributário ou autorização orçamentária por conta própria.

Se o fluxo estiver claro, as distinções mais cobradas deixam de ser uma lista de pegadinhas: **Documento Hábil ≠ compromisso; compromisso ≠ realização; Pagamento ≠ Recebimento; dedução ≠ encargo; <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> ≠ <abbr title="Contas a Pagar e a Receber">CPR</abbr>; integração ≠ fusão das etapas.**
