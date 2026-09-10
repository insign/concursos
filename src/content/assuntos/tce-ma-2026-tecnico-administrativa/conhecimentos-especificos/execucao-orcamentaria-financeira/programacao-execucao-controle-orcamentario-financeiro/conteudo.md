---
schemaVersion: 1
title: "Programação, execução e controle de recursos orçamentários e financeiros"
description: Programação financeira, estágios da despesa, GRU, sistemas de informação, restos a pagar, despesas de exercícios anteriores, suprimento de fundos, conformidade e rol de responsáveis.
order: 149
storageId: tec-exec-orc-fin-149
---

# Programação, execução e controle de recursos orçamentários e financeiros

## 1. A autorização para gastar não é o mesmo que ter dinheiro para pagar

Imagine uma situação **hipotética**: uma unidade pública precisa contratar manutenção de equipamentos. O orçamento contém dotação suficiente, o fornecedor executa o serviço e apresenta a documentação. Ainda assim, entre “há orçamento” e “o dinheiro foi pago” existem decisões diferentes.

O fluxo básico da despesa é:

```text
crédito/dotação disponível
        ↓
      empenho
        ↓
 execução do objeto
        ↓
     liquidação
        ↓
 ordem de pagamento
        ↓
     pagamento
```

Esse fluxo corre sobre duas dimensões:

- **orçamentária:** existe autorização para assumir e executar a despesa?
- **financeira:** existe programação e disponibilidade para realizar o desembolso?

Por isso, **crédito orçamentário não é dinheiro em caixa**. O crédito autoriza a despesa; o recurso financeiro viabiliza o pagamento. Uma unidade pode ter dotação suficiente e, ainda assim, precisar aguardar o limite financeiro correspondente.

> **Corte da prova:** este capítulo considera as regras e rotinas vigentes em **6 de julho de 2026**, data do Edital nº 1 do <abbr title="Tribunal de Contas do Estado do Maranhão">TCE/MA</abbr>. Alguns instrumentos cobrados — como <abbr title="Guia de Recolhimento da União">GRU</abbr>, <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> e <abbr title="Cartão de Pagamento do Governo Federal">CPGF</abbr> — pertencem ao regime federal. Eles são estudados porque aparecem no recorte programático; isso não autoriza presumir aplicação automática de toda rotina federal ao <abbr title="Tribunal de Contas do Estado do Maranhão">TCE/MA</abbr>.

O capítulo cobre o encadeamento da execução, os efeitos da virada do exercício, a via excepcional do suprimento de fundos e os controles de sistemas, conformidade e responsáveis. Retenção tributária, operação detalhada do <abbr title="Contas a Pagar e a Receber">CPR</abbr>, <abbr title="Manual de Contabilidade Aplicada ao Setor Público">MCASP</abbr> e Lei de Responsabilidade Fiscal possuem unidades próprias.

## 2. Programação financeira: controlar o ritmo do desembolso

A **programação financeira** organiza quando os compromissos poderão produzir saída de caixa. Ela não cria autorização orçamentária e não substitui o orçamento: coordena o ritmo financeiro da execução com a disponibilidade de recursos.

No regime federal, o Decreto nº 93.872/1986 disciplina essa relação. Entre os pontos relevantes:

- o empenho não pode exceder o saldo disponível da dotação;
- o cronograma de pagamento não pode exceder o limite de saques fixado;
- compromissos financeiros ficam subordinados à programação aprovada;
- <abbr title="Restos a Pagar">RP</abbr> integram a programação financeira em item específico.

A lógica prática é:

```text
orçamento: posso assumir esta despesa?
financeiro: posso desembolsar este valor neste momento?
```

O controle acompanha as duas respostas. Por isso, registrar corretamente uma despesa exige enxergar saldo orçamentário, estágio da obrigação, limite financeiro, documentação e pagamento como partes relacionadas, mas não intercambiáveis.

## 3. Empenho, liquidação e pagamento: três perguntas diferentes

A Lei nº 4.320/1964 organiza a execução da despesa em **empenho → liquidação → pagamento**. Cada estágio responde a uma pergunta própria.

### 3.1 Empenho: qual crédito fica comprometido?

O artigo 58 define **empenho** como o ato da autoridade competente que cria para o Estado obrigação de pagamento, pendente ou não de implemento de condição.

Para a prova, conecte a definição à função operacional: o empenho compromete crédito orçamentário para determinada despesa e reduz o saldo disponível da dotação correspondente. Ele ainda **não comprova que o credor já adquiriu o direito ao pagamento**.

A regra da Lei nº 4.320/1964 é a vedação de realizar despesa sem prévio empenho. No regime federal, o Decreto nº 93.872/1986 admite, em situação de urgência caracterizada na legislação, que o ato do empenho seja contemporâneo à realização da despesa. A exceção não transforma empenho posterior em rotina.

O empenho é formalizado por **Nota de Empenho**, com elementos necessários ao controle da execução, como credor, especificação e valor. Em ambiente informatizado, isso não exige imaginar necessariamente uma folha física: o registro pode permanecer no sistema conforme a disciplina aplicável.

#### Modalidades de empenho

A classificação tradicional, também adotada pelo <abbr title="Manual de Contabilidade Aplicada ao Setor Público">MCASP</abbr> 11ª edição, distingue:

| Modalidade | Situação | Ideia de controle |
|---|---|---|
| **ordinário** | valor fixo e previamente determinado, com pagamento de uma só vez | compromisso de valor certo |
| **estimativo** | montante não pode ser previamente determinado | valor inicialmente estimado e ajustável |
| **global** | despesa contratual ou semelhante, de valor determinado e sujeita a parcelamento | compromisso global com execução parcelada |

A Lei nº 4.320/1964 prevê expressamente o empenho por estimativa quando o montante não puder ser determinado e admite empenho global para despesas contratuais e outras sujeitas a parcelamento.

Retome o exemplo: se a manutenção custar R$ 12.000 em doze parcelas mensais conhecidas, o empenho global pode comprometer o valor correspondente. Isso **não liquida antecipadamente as doze parcelas**.

### 3.2 Liquidação: o credor realmente adquiriu o direito?

A **liquidação** verifica o direito adquirido pelo credor com base nos títulos e documentos comprobatórios do crédito.

O artigo 63 da Lei nº 4.320/1964 exige apurar:

1. a origem e o objeto do que se deve pagar;
2. a importância exata a pagar;
3. a quem se deve pagar para extinguir a obrigação.

Em fornecimentos e serviços, a verificação considera, conforme o caso, contrato ou ajuste, Nota de Empenho e comprovantes da entrega do material ou da efetiva prestação do serviço.

No exemplo, o fato de haver empenho global de R$ 12.000 não permite reconhecer automaticamente R$ 12.000 como devidos. Se apenas a primeira parcela do serviço foi executada e comprovada, a liquidação deve refletir aquilo que efetivamente constitui direito do credor.

### 3.3 Ordem de pagamento e pagamento: quando ocorre o desembolso?

Depois da regular liquidação, vem a **ordem de pagamento**, o despacho da autoridade competente determinando que a despesa seja paga.

O artigo 62 da Lei nº 4.320/1964 condiciona o pagamento à ordem emitida **após a regular liquidação**. O pagamento é o estágio em que ocorre o desembolso ao credor pelos meios admitidos.

A sequência, portanto, não é mera memorização:

- **empenho:** compromete a autorização orçamentária;
- **liquidação:** comprova e quantifica o direito do credor;
- **pagamento:** satisfaz financeiramente a obrigação já liquidada e ordenada.

## 4. A virada de 31 de dezembro: <abbr title="Restos a Pagar">RP</abbr> ou <abbr title="Despesas de Exercícios Anteriores">DEA</abbr>?

A mudança de exercício cria uma bifurcação importante. O primeiro filtro é perguntar: **a despesa foi validamente empenhada no exercício de origem e permaneceu inscrita para pagamento posterior?**

### 4.1 <abbr title="Restos a Pagar">RP</abbr>: houve empenho, mas faltou pagar

O artigo 36 da Lei nº 4.320/1964 define <abbr title="Restos a Pagar">RP</abbr> como despesas empenhadas, mas não pagas até 31 de dezembro.

A situação em 31 de dezembro determina a classificação:

| Situação | Classificação |
|---|---|
| empenhada + liquidada + não paga | <abbr title="Restos a Pagar">RP</abbr> **processado** |
| empenhada + não liquidada + não paga | <abbr title="Restos a Pagar">RP</abbr> **não processado** |

No processado, o direito do credor já foi liquidado; falta pagar. No não processado, a despesa ainda precisa passar por liquidação válida antes do pagamento.

No regime federal, o Decreto nº 93.872/1986 determina registro por exercício e credor e condiciona a inscrição de <abbr title="Restos a Pagar Não Processados">RPNP</abbr> à indicação do ordenador da despesa.

Também há uma regra temporal relevante: <abbr title="Restos a Pagar Não Processados">RPNP</abbr> que não forem liquidados são, em regra, **bloqueados em 30 de junho do segundo ano subsequente ao da inscrição**, ressalvadas as hipóteses que o próprio decreto exclui do bloqueio e as regras de desbloqueio e cancelamento.

**Bloqueio não é cancelamento.** O bloqueio restringe a movimentação do saldo dentro da disciplina do decreto; o cancelamento é evento posterior e possui pressupostos próprios.

### 4.2 <abbr title="Despesas de Exercícios Anteriores">DEA</abbr>: a obrigação antiga será processada no orçamento atual

<abbr title="Despesas de Exercícios Anteriores">DEA</abbr> não é sinônimo de “qualquer conta velha”.

O artigo 37 da Lei nº 4.320/1964 permite pagamento à conta de dotação específica do orçamento atual para três grupos:

1. despesas de exercícios encerrados para as quais havia crédito próprio com saldo suficiente, mas que não se processaram na época própria;
2. <abbr title="Restos a Pagar">RP</abbr> com prescrição interrompida;
3. compromissos reconhecidos após o encerramento do exercício correspondente.

O Decreto nº 93.872/1986 detalha, no regime federal, que pagamento reclamado após cancelamento da inscrição em <abbr title="Restos a Pagar">RP</abbr> pode ser atendido à conta de <abbr title="Despesas de Exercícios Anteriores">DEA</abbr>, se os requisitos estiverem presentes.

A diferença central é a origem orçamentária do pagamento:

```text
empenho do exercício anterior permaneceu validamente inscrito
                    ↓
             restos a pagar

obrigação de exercício encerrado enquadrada no art. 37
e processada com dotação específica do orçamento atual
                    ↓
     despesas de exercícios anteriores
```

## 5. Suprimento de fundos: exceção ao processo normal, não exceção ao controle

Há despesas que, por sua natureza, não conseguem seguir o processo normal de aplicação. Para essas hipóteses existe o **suprimento de fundos**, regime de adiantamento em que numerário é entregue a servidor para aplicação posterior e prestação de contas.

A Lei nº 4.320/1964 e, no plano federal, o Decreto nº 93.872/1986 preservam quatro ideias:

- é mecanismo **excepcional**;
- é concedido a **servidor**;
- é **precedido de empenho** na dotação própria;
- exige **prestação de contas**.

No Decreto nº 93.872/1986, o suprimento pode atender, entre outras hipóteses:

1. despesas eventuais, inclusive em viagens ou serviços especiais, que exijam pronto pagamento;
2. despesas de caráter sigiloso, conforme a classificação regulamentar;
3. despesas de pequeno vulto, dentro dos limites fixados pela disciplina competente.

### 5.1 Quem não pode receber

No regime federal, o decreto veda concessão, entre outros casos:

- a responsável por **dois suprimentos**;
- a servidor encarregado da guarda ou utilização do material a adquirir, salvo inexistência de outro servidor na repartição;
- a responsável por suprimento cujo prazo de prestação de contas terminou sem que as contas tenham sido apresentadas;
- a servidor declarado <abbr title="Servidor com prestação de contas não apresentada ou impugnada">em alcance</abbr>.

O termo “em alcance” identifica, em linhas gerais, situação do servidor que não comprovou tempestivamente os recursos recebidos ou teve a prestação de contas recusada ou impugnada.

Se o suprido não prestar contas no prazo, o Decreto nº 93.872/1986 prevê tomada de contas automática, sem prejuízo das demais providências para apurar responsabilidades.

### 5.2 <abbr title="Cartão de Pagamento do Governo Federal">CPGF</abbr>

No regime federal, as despesas com suprimento de fundos são efetivadas por meio do <abbr title="Cartão de Pagamento do Governo Federal">CPGF</abbr>. A modalidade saque é vedada como regra e só aparece nas exceções previstas no próprio decreto.

A mensagem de prova é simples: **suprimento flexibiliza a forma de aplicação, mas não dispensa empenho, documentação, prestação de contas nem responsabilização**.

## 6. <abbr title="Guia de Recolhimento da União">GRU</abbr>: agora o dinheiro faz o caminho inverso

Até aqui, o fluxo principal era de **despesa**, isto é, dinheiro saindo para satisfazer obrigação. A <abbr title="Guia de Recolhimento da União">GRU</abbr> aparece em outra direção: é instrumento federal de **arrecadação e recolhimento de receitas e outros valores à União**.

Ela pode ser utilizada para taxas, multas, aluguéis, serviços e outras receitas de órgãos e entidades abrangidos pelo sistema. Sua finalidade é permitir que o ingresso seja identificado e direcionado adequadamente para a Conta Única do Tesouro Nacional.

Por isso, uma <abbr title="Guia de Recolhimento da União">GRU</abbr> não é:

- Nota de Empenho;
- documento de liquidação;
- ordem de pagamento de fornecedor.

### 6.1 Mudança pré-edital em 2026

O Tesouro Nacional informou que, a partir de **3 de abril de 2026**, a emissão avulsa de <abbr title="Guia de Recolhimento da União">GRU</abbr> Simples e Judicial fora do PagTesouro seria descontinuada. A emissão e o pagamento dessas guias passaram a ser concentrados no Portal PagTesouro–<abbr title="Guia de Recolhimento da União">GRU</abbr>, com meios digitais conforme as opções disponíveis para cada serviço.

Essa alteração ocorreu antes do corte do edital. Material que ensine a antiga emissão avulsa como rotina atual precisa ser lido com cautela.

## 7. Sistemas de informação: cada sistema responde a uma parte do ciclo

O edital menciona “sistemas de informações”. Para esta unidade, o objetivo é reconhecer a função, não decorar telas.

O <abbr title="Sistema Integrado de Planejamento e Orçamento">SIOP</abbr> é sistema estruturante que dá suporte aos processos de planejamento e orçamento federal. Nele se relacionam, entre outros processos, elaboração e acompanhamento do <abbr title="Plano Plurianual">PPA</abbr>, do projeto da <abbr title="Lei Orçamentária Anual">LOA</abbr> e do projeto da <abbr title="Lei de Diretrizes Orçamentárias">LDO</abbr>, além de alterações orçamentárias.

O <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> é o principal instrumento federal de registro, acompanhamento e controle da execução orçamentária, financeira e patrimonial.

A comparação suficiente para esta unidade é:

| Sistema | Pergunta predominante |
|---|---|
| <abbr title="Sistema Integrado de Planejamento e Orçamento">SIOP</abbr> | como o planejamento e o orçamento federal são estruturados e acompanhados? |
| <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> | como a execução orçamentária, financeira e patrimonial federal é registrada e controlada? |

O funcionamento detalhado do <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> e do <abbr title="Contas a Pagar e a Receber">CPR</abbr> pertence à unidade 151. Aqui basta entender que o sistema registra o ciclo; ele não transforma empenho, liquidação e pagamento em uma única etapa.

## 8. Conformidade: registro correto precisa de suporte documental

Registrar uma operação no sistema não basta. O controle precisa responder duas perguntas:

1. o registro foi feito de acordo com as normas e com o fato ocorrido?
2. existe documento hábil que comprove a operação?

Na terminologia institucional da Secretaria do Tesouro Nacional, a **Conformidade dos Registros de Gestão** certifica os registros dos atos e fatos de execução orçamentária, financeira e patrimonial incluídos no <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> e a existência de documentos hábeis que comprovem as operações.

O Manual <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> explicita a ponte com a redação do edital: a Conformidade dos Registros de Gestão **abrange as conformidades diárias e documental**.

Assim, “diária” e “documental” não devem ser estudadas como palavras soltas:

- **dimensão diária:** examina os registros dos atos e fatos realizados no período e sua aderência às normas;
- **dimensão documental:** verifica se há documentação hábil que sustente as operações registradas.

Não confunda esse controle com a **Conformidade Contábil**, realizada pelas unidades setoriais contábeis para assegurar o registro fiel e tempestivo dos dados contábeis das unidades gestoras.

A função de controle aparece justamente no vínculo entre sistema e evidência: lançamento correto sem documento suficiente é problema; documento existente com registro incorreto também é problema.

## 9. Rol de responsáveis: identificar quem exerceu responsabilidades de gestão

O termo **rol de responsáveis** aparece tanto em rotinas do <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> quanto na prestação de contas ao <abbr title="Tribunal de Contas da União">TCU</abbr>. É importante separar o cadastro operacional da regra atual de composição das contas.

O Manual <abbr title="Sistema Integrado de Administração Financeira do Governo Federal">SIAFI</abbr> descreve módulo de Rol de Responsáveis alimentado pelas unidades para registrar agentes, naturezas de responsabilidade e períodos de gestão. Algumas passagens históricas desse manual ainda remetem à antiga Instrução Normativa <abbr title="Tribunal de Contas da União">TCU</abbr> nº 47/2004, já revogada. Para a composição **atual** do rol de responsáveis das contas perante o <abbr title="Tribunal de Contas da União">TCU</abbr>, a referência vigente é a Instrução Normativa <abbr title="Tribunal de Contas da União">TCU</abbr> nº 84/2020.

Segundo o artigo 7º dessa instrução, compõem o rol os titulares e respectivos substitutos que, no período das contas, tenham ocupado:

1. o cargo de **dirigente máximo** da <abbr title="Unidade Prestadora de Contas">UPC</abbr>;
2. cargo de diretoria ou direção no nível hierárquico imediatamente inferior e sucessivo ao dirigente máximo, conforme a estrutura aprovada da <abbr title="Unidade Prestadora de Contas">UPC</abbr>;
3. posição que, por definição legal, regimental ou estatutária, atribua responsabilidade por ato de gestão capaz de afetar objetivos ou impactar legalidade, economicidade, eficiência ou eficácia da gestão.

Duas conclusões evitam erros:

- o rol **não é uma lista de todos os servidores** da unidade;
- constar do rol **não equivale a declaração automática de culpa**.

O objetivo é manter rastreabilidade de quem exerceu responsabilidades relevantes e em quais períodos. A disciplina do <abbr title="Tribunal de Contas da União">TCU</abbr> é federal; não deve ser transformada, sem fonte própria, em regra orgânica do <abbr title="Tribunal de Contas do Estado do Maranhão">TCE/MA</abbr>.

## 10. Um único roteiro para acompanhar a execução

Quando a questão apresentar um caso, acompanhe o caminho do fato em vez de procurar palavras isoladas:

1. **Existe crédito orçamentário?** Sem autorização, não se presume que a despesa possa ser assumida.
2. **Há programação financeira suficiente?** Crédito e disponibilidade para desembolso são dimensões diferentes.
3. **Houve empenho?** Identifique o valor comprometido e, se relevante, a modalidade.
4. **O objeto foi executado e comprovado?** Só então se pode verificar o direito do credor na liquidação.
5. **Houve ordem e pagamento?** Pagamento pressupõe liquidação regular.
6. **Chegou 31 de dezembro sem pagamento?** Teste <abbr title="Restos a Pagar">RP</abbr> processado ou não processado.
7. **A obrigação de exercício encerrado será processada no orçamento atual?** Teste as hipóteses de <abbr title="Despesas de Exercícios Anteriores">DEA</abbr>.
8. **A despesa realmente não comporta o processo normal de aplicação?** Só então examine suprimento de fundos e suas vedações.
9. **O caso envolve recolhimento à União?** Verifique a função da <abbr title="Guia de Recolhimento da União">GRU</abbr>, sem confundi-la com documento de despesa.
10. **O registro tem suporte e responsável identificável?** Relacione sistema, conformidade e rol de responsáveis.

A estrutura que une a unidade é esta:

```text
autorização orçamentária
        ↓
programação financeira
        ↓
empenho → liquidação → pagamento
        ↓
virada do exercício: RP ou DEA?
        ↓
registro + documento + responsável
```

O caminho excepcional do suprimento de fundos e o caminho arrecadatório da <abbr title="Guia de Recolhimento da União">GRU</abbr> se encaixam nesse mesmo sistema de controle: mudam a operação, mas não eliminam a necessidade de autorização, registro, documentação e responsabilização.
