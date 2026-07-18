# Operações com conjuntos

## Notação básica

| Símbolo | Leitura |
|---|---|
| $x\in A$ | $x$ pertence a $A$ |
| $x\notin A$ | $x$ não pertence a $A$ |
| $A\subseteq B$ | todo elemento de $A$ pertence a $B$ |
| $A\subsetneq B$ | $A\subseteq B$ e $A\ne B$ |
| $|A|$ | cardinalidade de $A$ |
| $\mathcal P(A)$ | conjunto de todos os subconjuntos de $A$ |

Use $\subseteq$ para inclusão que permite igualdade e $\subsetneq$ para inclusão própria.

## Elemento versus subconjunto

$$
x\in A
\iff
\{x\}\subseteq A.
$$

$\{x\}\in A$ é outra afirmação: o conjunto unitário é elemento de $A$.

## Regras fundamentais

- Ordem e repetição não alteram conjuntos.
- Igualdade exige exatamente os mesmos elementos.
- Mesma cardinalidade não implica igualdade.
- $\varnothing\subseteq A$ para todo $A$.
- $|\varnothing|=0$, mas $|\{\varnothing\}|=1$.
- Conjuntos disjuntos satisfazem $A\cap B=\varnothing$.

## Conjunto das partes

$$
\mathcal P(A)=\{X\mid X\subseteq A\}.
$$

Se $|A|=n$:

$$
|\mathcal P(A)|=2^n.
$$

Inclui $\varnothing$ e $A$.

## Operações

$$
A\cup B=\{x\mid x\in A\text{ ou }x\in B\},
$$

$$
A\cap B=\{x\mid x\in A\text{ e }x\in B\},
$$

$$
A\setminus B=\{x\mid x\in A\text{ e }x\notin B\},
$$

$$
A^c=U\setminus A,
$$

$$
A\mathbin{\triangle}B
=(A\setminus B)\cup(B\setminus A)
=(A\cup B)\setminus(A\cap B).
$$

- União usa “ou” inclusivo.
- Diferença não é comutativa.
- Complemento exige universo declarado.
- Diferença simétrica significa “exatamente um”.

## Leis algébricas

| Lei | Identidade |
|---|---|
| comutativa | $A\cup B=B\cup A$; $A\cap B=B\cap A$ |
| associativa | $(A\cup B)\cup C=A\cup(B\cup C)$; análoga para $\cap$ |
| idempotência | $A\cup A=A$; $A\cap A=A$ |
| identidade | $A\cup\varnothing=A$; $A\cap U=A$ |
| dominação | $A\cup U=U$; $A\cap\varnothing=\varnothing$ |
| absorção | $A\cup(A\cap B)=A$; $A\cap(A\cup B)=A$ |

Distributivas:

$$
A\cap(B\cup C)=(A\cap B)\cup(A\cap C),
$$

$$
A\cup(B\cap C)=(A\cup B)\cap(A\cup C).
$$

Complementares:

$$
A\cup A^c=U,
\qquad
A\cap A^c=\varnothing,
\qquad
(A^c)^c=A.
$$

Diferença:

$$
A\setminus B=A\cap B^c.
$$

## De Morgan

$$
(A\cup B)^c=A^c\cap B^c,
$$

$$
(A\cap B)^c=A^c\cup B^c.
$$

Ao complementar, troque união por interseção e vice-versa.

## Cardinalidade de dois conjuntos

$$
|A\cup B|=|A|+|B|-|A\cap B|.
$$

$$
|A\setminus B|=|A|-|A\cap B|.
$$

$$
|A\mathbin{\triangle}B|
=|A|+|B|-2|A\cap B|.
$$

Se $A,B\subseteq U$ e $|U|=N$:

$$
\max(0,|A|+|B|-N)
\le |A\cap B|
\le \min(|A|,|B|).
$$

Nenhum:

$$
|(A\cup B)^c|=|U|-|A\cup B|.
$$

## Três conjuntos

$$
|A\cup B\cup C|
=|A|+|B|+|C|
-|A\cap B|-|A\cap C|-|B\cap C|
+|A\cap B\cap C|.
$$

Preencha o diagrama nesta ordem:

1. interseção tripla;
2. regiões de exatamente dois;
3. regiões exclusivas;
4. região externa.

As interseções $A\cap B$, $A\cap C$ e $B\cap C$ incluem a região tripla.

Ao menos dois entre três:

$$
|A\cap B|+|A\cap C|+|B\cap C|
-2|A\cap B\cap C|.
$$

## Tradução verbal

| Expressão | Região |
|---|---|
| ao menos um | $A\cup B$ |
| ambos | $A\cap B$ |
| $A$, mas não $B$ | $A\setminus B$ |
| exatamente um | $A\mathbin{\triangle}B$ |
| nenhum | $(A\cup B)^c$ |
| não ambos | $(A\cap B)^c$ |
| somente $A$ entre três | $A\setminus(B\cup C)$ |

## Produto cartesiano

$$
A\times B=\{(a,b)\mid a\in A,\ b\in B\}.
$$

Para conjuntos finitos:

$$
|A\times B|=|A|\,|B|.
$$

$$
(a,b)=(c,d)
\iff
a=c\text{ e }b=d.
$$

Em geral, $A\times B\ne B\times A$.

$$
A\times\varnothing=\varnothing.
$$

## Famílias e partições

$$
x\in\bigcup_i A_i
\iff
\exists i\;(x\in A_i),
$$

Para $I\ne\varnothing$:

$$
x\in\bigcap_{i\in I} A_i
\iff
\forall i\in I\;(x\in A_i).
$$

Uma partição de $U$ possui blocos:

- não vazios;
- dois a dois disjuntos;
- com união igual a $U$.

## Intervalos

| Intervalo | Extremos |
|---|---|
| $[a,b]$ | ambos incluídos |
| $(a,b)$ | ambos excluídos |
| $[a,b)$ | inclui $a$, exclui $b$ |
| $(a,b]$ | exclui $a$, inclui $b$ |

$\infty$ e $-\infty$ sempre usam parênteses.

Em relação a $\mathbb R$:

$$
[a,b)^c=(-\infty,a)\cup[b,\infty).
$$

## Pegadinhas

- $\varnothing\subseteq A$ não implica $\varnothing\in A$.
- $\varnothing\ne\{\varnothing\}$.
- $x\in A$ não é $x\subseteq A$.
- União inclui a interseção.
- Complemento sem universo é incompleto.
- $A\setminus B$ não é $B\setminus A$.
- Interseção de pares inclui quem está nos três conjuntos.
- Pares ordenados preservam posição.
- Igual cardinalidade não significa igualdade.
- No complemento de intervalo, troque a inclusão dos extremos finitos.

## Checklist

1. Identifiquei o universo?
2. Diferenciei elemento e subconjunto?
3. Traduzi “ou”, “e”, “não”, “somente” e “exatamente”?
4. Comecei o diagrama pela região mais interna?
5. Corrigi a dupla contagem?
6. A soma das regiões respeita o total do universo?
7. Preservei a ordem no produto cartesiano?
8. Testei os extremos dos intervalos?
