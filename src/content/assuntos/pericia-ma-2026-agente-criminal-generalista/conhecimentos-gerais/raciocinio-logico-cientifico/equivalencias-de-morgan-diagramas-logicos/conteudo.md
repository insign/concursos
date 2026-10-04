---
schemaVersion: 1
title: Equivalências e leis de De Morgan
description: Negação de proposições compostas, equivalências da condicional e da bicondicional e simplificação segura de fórmulas da lógica proposicional.
order: 220
storageId: per-u022
---

## 1. O que precisa falhar para negar a frase inteira?

Em uma situação hipotética, considere:

- $p$: “O laudo está pronto.”
- $q$: “O registro está atualizado.”

Dizer **“não é verdade que o laudo está pronto e o registro está atualizado”** permite que uma das ações esteja concluída. Basta que a outra falhe. Já dizer **“o laudo não está pronto e o registro não está atualizado”** exige que ambas falhem. Essas frases têm alcances diferentes: acrescentar “não” a cada parte sem observar o conectivo pode mudar o que foi afirmado.

Na lógica proposicional, uma proposição é uma afirmação que recebe verdadeiro ou falso no contexto considerado. Letras representam essas afirmações; conectivos determinam como combiná-las:

| Símbolo | Leitura e regra de verdade |
|---|---|
| $\neg p$ | “não $p$”: inverte o valor de $p$. |
| $p\land q$ | “$p$ e $q$”: verdadeira somente se ambas forem verdadeiras. |
| $p\lor q$ | “$p$ ou $q$”: verdadeira se ao menos uma for verdadeira, inclusive ambas. |
| $p\to q$ | “se $p$, então $q$”: falsa somente com $p$ verdadeira e $q$ falsa. |
| $p\leftrightarrow q$ | “$p$ se e somente se $q$”: verdadeira quando os valores forem iguais. |

Os parênteses indicam o que é combinado ou negado. Em $\neg(p\land q)$, a negação alcança a combinação inteira das duas partes por “e”, chamada conjunção; em $(\neg p)\land q$, alcança somente $p$. A avaliação de tabelas-verdade é aprofundada em **Proposições, conectivos e tabelas-verdade**. Aqui, essas regras permitem **reescrever ou negar fórmulas preservando exatamente o sentido lógico pretendido**.

## 2. De Morgan: negar a exigência de todas ou de alguma

Uma conjunção exige todas as suas partes verdadeiras. Negar essa exigência significa que **ao menos uma parte é falsa**. No exemplo inicial:

> O laudo não está pronto **ou** o registro não está atualizado.

O “ou” continua inclusivo: também admite que as duas partes sejam falsas. Essa é a primeira lei de De Morgan:

$$\neg(p\land q)\equiv\neg p\lor\neg q.$$

Uma disjunção inclusiva, a combinação por “ou” que admite ambas as partes verdadeiras, exige ao menos uma parte verdadeira. Para negá-la, **nenhuma pode ser verdadeira**. Assim, “não é verdade que o laudo está pronto ou o registro está atualizado” equivale a:

> O laudo não está pronto **e** o registro não está atualizado.

A segunda lei é:

$$\neg(p\lor q)\equiv\neg p\land\neg q.$$

O símbolo $\equiv$ indica equivalência lógica: os dois lados têm o mesmo valor em todas as combinações possíveis. A tabela confirma a primeira lei; nela, $V$ significa verdadeiro e $F$, falso:

| $p$ | $q$ | $\neg(p\land q)$ | $\neg p\lor\neg q$ |
|:---:|:---:|:---:|:---:|
| $V$ | $V$ | $F$ | $F$ |
| $V$ | $F$ | $V$ | $V$ |
| $F$ | $V$ | $V$ | $V$ |
| $F$ | $F$ | $V$ | $V$ |

Depois de compreender o mecanismo, use o lembrete: **negue cada parte e troque “e” por “ou”, ou “ou” por “e”**. As duas operações são inseparáveis. $\neg(p\land q)$ não equivale a $\neg p\land\neg q$: com $p$ verdadeira e $q$ falsa, a primeira é verdadeira e a segunda é falsa.

### 2.1. Negação que alcança várias partes

A regra vale para cadeias do mesmo conectivo:

$$\neg(p\land q\land r)\equiv\neg p\lor\neg q\lor\neg r,$$

$$\neg(p\lor q\lor r)\equiv\neg p\land\neg q\land\neg r.$$

Em uma expressão com agrupamentos internos, cada grupo deve ser negado como uma unidade antes de ser aberto:

$$
\neg\bigl(p\lor(q\land r)\bigr)
\equiv\neg p\land\neg(q\land r)
\equiv\neg p\land(\neg q\lor\neg r).
$$

A negação externa primeiro troca a disjunção principal por conjunção. A negação que passa a alcançar $(q\land r)$ depois troca esse conectivo interno por disjunção. O resultado mantém os parênteses: $\neg p\land\neg q\lor\neg r$, sem convenção de agrupamento, pode expressar outra estrutura.

Se uma parte já estiver negada, negá-la de novo recupera seu valor original: $\neg\neg p\equiv p$. Por exemplo,

$$\neg(\neg p\lor q)\equiv\neg\neg p\land\neg q\equiv p\land\neg q.$$

Na linguagem usual, **“nem $p$ nem $q$”** afirma $\neg p\land\neg q$, equivalente a $\neg(p\lor q)$. “Não ambos” e “nenhum dos dois” devem permanecer distintos.

## 3. Equivalência exige todas as combinações

Duas fórmulas $P$ e $Q$ são logicamente equivalentes quando suas colunas finais coincidem **linha por linha** na tabela-verdade. As letras maiúsculas podem representar fórmulas inteiras, com várias proposições simples.

Uma coincidência isolada não basta. $p\land q$ e $p\lor q$ são ambas verdadeiras com $p$ e $q$ verdadeiras, mas divergem quando somente uma delas é verdadeira. Para provar equivalência por tabela, examine todas as combinações; para refutá-la, basta um **contraexemplo**, uma atribuição em que os resultados sejam diferentes.

Uma **tautologia** é uma fórmula verdadeira em todas as atribuições. Como a bicondicional, escrita com $\leftrightarrow$, é verdadeira quando as duas fórmulas têm valores iguais,

$$P\equiv Q\quad\text{se e somente se}\quad P\leftrightarrow Q\text{ é tautologia}.$$

Isso não exige que $P$ e $Q$ sejam individualmente tautologias: elas podem ser ambas falsas em certas linhas, desde que coincidam em todas.

A equivalência permite substituir uma parte por outra em uma fórmula maior. Como $\neg(p\lor q)\equiv\neg p\land\neg q$, também vale:

$$r\lor\neg(p\lor q)\equiv r\lor(\neg p\land\neg q).$$

A substituição preserva o agrupamento. Não autoriza apagar símbolos nem trocar conectivos fora da parte transformada.

## 4. Condicional: preservar a regra ou mostrar sua violação

Retome uma regra hipotética: **“Se o laudo está pronto, então o registro está atualizado”**, representada por $p\to q$. Nessa condicional, $p$ é o antecedente, a condição que vem depois de “se”; $q$ é o consequente, o resultado que vem depois de “então”. A condicional material usa a regra de verdade da seção 1; não afirma por si só causalidade ou sequência temporal.

### 4.1. Eliminar a seta

A regra falha somente quando $p$ é verdadeira e $q$ é falsa. A expressão $\neg p\lor q$ também falha exatamente nessa combinação: seus dois termos ficam falsos. Logo,

$$p\to q\equiv\neg p\lor q\equiv\neg(p\land\neg q).$$

| $p$ | $q$ | $p\to q$ | $\neg p\lor q$ |
|:---:|:---:|:---:|:---:|
| $V$ | $V$ | $V$ | $V$ |
| $V$ | $F$ | $F$ | $F$ |
| $F$ | $V$ | $V$ | $V$ |
| $F$ | $F$ | $V$ | $V$ |

A forma equivalente permite reorganizar uma condicional composta. Se $r$ significar “a assinatura foi conferida”, então:

$$p\to(q\lor r)\equiv\neg p\lor q\lor r\equiv\neg q\to(\neg p\lor r).$$

Na última passagem, eliminar a seta de $\neg q\to(\neg p\lor r)$ produz $q\lor\neg p\lor r$, a mesma disjunção em outra ordem. Não é preciso que a nova frase tenha a mesma aparência da original.

### 4.2. Contrapositiva, conversa e inversa

A **contrapositiva** inverte a ordem e nega os dois termos:

$$p\to q\equiv\neg q\to\neg p.$$

No exemplo: “Se o registro não está atualizado, então o laudo não está pronto”. Ela proíbe a mesma combinação da regra original: laudo pronto com registro não atualizado.

A **conversa** troca os termos sem negá-los: $q\to p$. A **inversa** nega os termos sem trocar a ordem: $\neg p\to\neg q$. Nenhuma equivale, em geral, à original. Com $p$ verdadeira e $q$ falsa, $p\to q$ é falsa, mas tanto a conversa quanto a inversa são verdadeiras. A conversa e a inversa, por sua vez, são equivalentes entre si: uma é a contrapositiva da outra.

### 4.3. Negar a regra

Negar a condicional afirma justamente sua violação:

$$\neg(p\to q)\equiv p\land\neg q.$$

No cenário: **“O laudo está pronto e o registro não está atualizado”**. A contrapositiva conserva a verdade da regra; essa conjunção inverte seu valor. Pela eliminação da seta e por De Morgan:

$$\neg(p\to q)\equiv\neg(\neg p\lor q)\equiv p\land\neg q.$$

A mesma regra vale quando o antecedente ou o consequente é composto:

$$\neg\bigl((p\land q)\to r\bigr)\equiv p\land q\land\neg r,$$

$$\neg\bigl(p\to(q\lor r)\bigr)\equiv p\land\neg q\land\neg r.$$

Na primeira, mantenha o antecedente inteiro e negue $r$. Na segunda, mantenha $p$ e negue o consequente inteiro; só depois use De Morgan. Não troque a negação de uma condicional por outra condicional.

## 5. Bicondicional: concordância ou diferença de valores

$p\leftrightarrow q$ exige as duas direções: sempre que $p$, então $q$; e sempre que $q$, então $p$. Por isso,

$$p\leftrightarrow q\equiv(p\to q)\land(q\to p).$$

Outra forma separa os dois casos de concordância: ambas verdadeiras ou ambas falsas.

$$p\leftrightarrow q\equiv(p\land q)\lor(\neg p\land\neg q).$$

Sua negação reúne os casos de diferença:

$$\neg(p\leftrightarrow q)\equiv(p\land\neg q)\lor(\neg p\land q).$$

Esse resultado é a **disjunção exclusiva**, verdadeira quando exatamente uma das partes é verdadeira. Também pode ser escrito exigindo ao menos uma e excluindo ambas:

$$\neg(p\leftrightarrow q)\equiv(p\lor q)\land\neg(p\land q).$$

Não use $\neg p\leftrightarrow\neg q$ para negar a bicondicional original: negar os dois lados mantém a igualdade ou a diferença entre os valores. Essa nova bicondicional continua equivalente a $p\leftrightarrow q$.

## 6. Simplificar sem perder informação

Equivalências também podem encurtar fórmulas. Em

$$(p\land q)\lor(p\land\neg q),$$

$p$ aparece nas duas alternativas. Colocando-o em evidência pela **distributividade**, resulta $p\land(q\lor\neg q)$. A parte $q\lor\neg q$ é sempre verdadeira; exigir $p$ e algo sempre verdadeiro equivale a exigir apenas $p$. Assim:

$$(p\land q)\lor(p\land\neg q)\equiv p.$$

A **absorção** tem outro mecanismo: em $p\lor(p\land q)$, se $p$ for verdadeira, a fórmula já é verdadeira; se $p$ for falsa, ambas as parcelas serão falsas. Portanto, a fórmula tem exatamente o valor de $p$. Em $p\land(p\lor q)$, a exigência de $p$ também decide todo o resultado.

O quadro reúne as transformações. $\top$ indica uma fórmula sempre verdadeira; $\bot$, uma fórmula sempre falsa, chamada **contradição**.

| Lei | Equivalências |
|---|---|
| Dupla negação | $\neg\neg p\equiv p$ |
| <abbr title="Repetir a mesma proposição com o mesmo conectivo não muda o valor">Idempotência</abbr> | $p\land p\equiv p$; $p\lor p\equiv p$ |
| <abbr title="Trocar a ordem das parcelas não muda o valor">Comutatividade</abbr> | $p\land q\equiv q\land p$; $p\lor q\equiv q\lor p$ |
| <abbr title="Reagrupar parcelas ligadas pelo mesmo conectivo não muda o valor">Associatividade</abbr> | $(p\land q)\land r\equiv p\land(q\land r)$; $(p\lor q)\lor r\equiv p\lor(q\lor r)$ |
| Distributividade | $p\land(q\lor r)\equiv(p\land q)\lor(p\land r)$; $p\lor(q\land r)\equiv(p\lor q)\land(p\lor r)$ |
| Complemento | $p\lor\neg p\equiv\top$; $p\land\neg p\equiv\bot$ |
| Identidade | $p\land\top\equiv p$; $p\lor\bot\equiv p$ |
| <abbr title="Uma parte sempre verdadeira no ou, ou sempre falsa no e, decide o resultado">Dominação</abbr> | $p\lor\top\equiv\top$; $p\land\bot\equiv\bot$ |
| Absorção | $p\lor(p\land q)\equiv p$; $p\land(p\lor q)\equiv p$ |

A associatividade permite reagrupar conectivos iguais. Não permite trocar $p\lor(q\land r)$ por $(p\lor q)\land r$: com $p$ verdadeira e $r$ falsa, a primeira é verdadeira e a segunda é falsa.

## 7. Escolha a transformação pelo comando

Primeiro determine se a questão pede uma **equivalente**, que mantém o valor, ou uma **negação**, que o inverte. Depois identifique o conectivo principal, a operação que une as maiores partes da fórmula. Respeite os parênteses e transforme uma etapa por vez.

- Para equivalência de condicional, elimine a seta ou forme a <abbr title="Condicional que inverte a ordem e nega os dois termos">contrapositiva</abbr>.
- Para negação de condicional, conserve o antecedente inteiro e negue o consequente inteiro, unidos por “e”.
- Para negação de conjunção ou disjunção inclusiva, aplique De Morgan a cada agrupamento alcançado.
- Para bicondicional, pense em valores iguais; para sua negação, em valores diferentes.
- Para refutar uma equivalência, procure uma atribuição divergente; para confirmá-la por tabela, compare todas as linhas.

Tente recuperar sem olhar as fórmulas: por que “não ambos” admite que somente um falhe? Por que a contrapositiva preserva uma condicional, enquanto $p\land\neg q$ a nega? Por que negar os dois lados de uma bicondicional não a nega? As respostas vêm das condições de verdade, e permitem reconstruir as regras quando a memória falhar.
