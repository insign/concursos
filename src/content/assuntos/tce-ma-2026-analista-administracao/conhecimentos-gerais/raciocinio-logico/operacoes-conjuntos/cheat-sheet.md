# Operações com conjuntos

## Fluxo

1. Qual é o **universo**?
2. A frase fala de elemento ($\in$) ou subconjunto ($\subseteq$)?
3. Traduza a região.
4. Se houver números, preencha primeiro a região mais interna.
5. Corrija dupla contagem com inclusão-exclusão.
6. Confira se as regiões são possíveis e não negativas.

## Notação que não pode confundir

| Símbolo | Leitura |
|---|---|
| $x\in A$ | $x$ é elemento de $A$ |
| $x\notin A$ | $x$ não pertence a $A$ |
| $A\subseteq B$ | todo elemento de $A$ está em $B$ |
| $A\subsetneq B$ | inclusão própria |
| $|A|$ | <abbr title="número de elementos distintos do conjunto">cardinalidade</abbr> |

$$
x\in A
\iff
\{x\}\subseteq A.
$$

Mas $\{x\}\in A$ é outra afirmação.

## Vazio

$$
|\varnothing|=0,
\qquad
|\{\varnothing\}|=1.
$$

$$
\varnothing\subseteq A
$$

para todo conjunto $A$.

**Subconjunto de todo conjunto ≠ elemento de todo conjunto.**

## Tradução rápida

| Expressão | Região |
|---|---|
| pelo menos um / $A$ ou $B$ | $A\cup B$ |
| ambos / simultaneamente | $A\cap B$ |
| $A$, mas não $B$ | $A\setminus B$ |
| exatamente um | $A\triangle B$ |
| nenhum | $(A\cup B)^c$ |
| não ambos | $(A\cap B)^c$ |
| somente $A$ entre três | $A\setminus(B\cup C)$ |

> “Ou” na união é **inclusivo**.

## Operações

$$
A\cup B=\{x:x\in A\text{ ou }x\in B\}
$$

$$
A\cap B=\{x:x\in A\text{ e }x\in B\}
$$

$$
A\setminus B=A\cap B^c
$$

$$
A^c=U\setminus A
$$

$$
A\triangle B
=(A\cup B)\setminus(A\cap B)
$$

- diferença: ordem importa;
- complemento: universo importa;
- diferença simétrica: **exatamente um**.

## Leis de uma linha

$$
A\cup A=A,
\qquad
A\cap A=A
$$

$$
A\cup\varnothing=A,
\qquad
A\cap U=A
$$

$$
A\cup U=U,
\qquad
A\cap\varnothing=\varnothing
$$

Absorção:

$$
A\cup(A\cap B)=A,
\qquad
A\cap(A\cup B)=A.
$$

Distributividade:

$$
A\cap(B\cup C)=(A\cap B)\cup(A\cap C),
$$

$$
A\cup(B\cap C)=(A\cup B)\cap(A\cup C).
$$

## De Morgan

$$
(A\cup B)^c=A^c\cap B^c
$$

$$
(A\cap B)^c=A^c\cup B^c
$$

**Complementou? Troque $\cup$ por $\cap$ e vice-versa.**

## Dois conjuntos: fórmulas

$$
|A\cup B|=|A|+|B|-|A\cap B|
$$

Somente $A$:

$$
|A|-|A\cap B|
$$

Exatamente um:

$$
|A\triangle B|
=|A|+|B|-2|A\cap B|
$$

Nenhum:

$$
|U|-|A\cup B|
$$

Limites:

$$
\max(0,|A|+|B|-|U|)
\le |A\cap B|
\le \min(|A|,|B|).
$$

## Três conjuntos

$$
|A\cup B\cup C|
=|A|+|B|+|C|
-|A\cap B|-|A\cap C|-|B\cap C|
+|A\cap B\cap C|.
$$

### Ordem de preenchimento

1. tripla;
2. exatamente dois;
3. somente um;
4. fora da união.

Interseção de pares é **inclusiva**:

$$
|A\cap B\text{ somente}|
=|A\cap B|-|A\cap B\cap C|.
$$

Pelo menos dois:

$$
|A\cap B|+|A\cap C|+|B\cap C|
-2|A\cap B\cap C|.
$$

## Pegadinhas

- $x\in A$ ≠ $x\subseteq A$.
- $\varnothing\subseteq A$ não implica $\varnothing\in A$.
- $\varnothing\ne\{\varnothing\}$.
- Repetição não aumenta cardinalidade.
- Mesma cardinalidade não implica igualdade.
- União inclui quem está na interseção.
- $A\setminus B\ne B\setminus A$ em geral.
- Complemento sem universo está incompleto.
- “Nenhum” ≠ “não ambos”.
- $A\cap B$ inclui quem também está em $C$.
- Na fórmula de três conjuntos, a região tripla volta com sinal **positivo**.

## Conferência final

- Identifiquei o universo?
- Traduzi a frase antes de calcular?
- Diferenciei elemento de subconjunto?
- Comecei pela região mais interna?
- Corrigi a dupla contagem?
- O total das regiões respeita $|U|$?
