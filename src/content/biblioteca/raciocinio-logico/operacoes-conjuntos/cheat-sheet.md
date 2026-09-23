# Operações com conjuntos

**Qual é o universo e que região a frase seleciona?** Fixe $U$ antes de falar em “fora” ou “nenhum”; complemente apenas em relação a ele. $|A|$ é a <abbr title="número de elementos distintos de um conjunto">cardinalidade</abbr> de $A$: repetição e ordem de escrita não contam.

## Elemento, conjunto e região

| Notação | Leia sem trocar as unidades |
|---|---|
| $x\in A$ | Objeto $x$ pertence a $A$. |
| $A\subseteq B$ | Todo elemento de $A$ pertence a $B$; igualdade é possível. |
| $A\subsetneq B$ | $A$ está contido em $B$ e $A\ne B$. |
| $\varnothing\subseteq A$ | O vazio está contido em todo conjunto; isso não diz $\varnothing\in A$. |

$x\in A$ equivale a $\{x\}\subseteq A$, mas **não** a $\{x\}\in A$. Ainda, $|\varnothing|=0$ e $|\{\varnothing\}|=1$; mesma cardinalidade entre conjuntos não implica igualdade de elementos.

| Frase | Região / operação |
|---|---|
| A ou B, pelo menos um | $A\cup B$: inclui quem está em ambos. |
| A e B, ambos | $A\cap B$: exige as duas condições. |
| A, mas não B | $A\setminus B=A\cap B^c$: a ordem importa. |
| Exatamente um dos dois | $A\triangle B=(A\cup B)\setminus(A\cap B)$. |
| Nenhum dos dois | $(A\cup B)^c$: fora dos dois. |
| Não ambos | $(A\cap B)^c$: basta faltar uma condição. |
| Somente A entre três | $A\setminus(B\cup C)$. |

O complemento é $A^c=U\setminus A$; conjuntos **disjuntos** têm $A\cap B=\varnothing$. “Nenhum” e “não ambos” normalmente escolhem regiões diferentes.

## Simplifique sem mudar a região

| Lei | Formas para recuperar |
|---|---|
| Repetição e extremos | $A\cup A=A$, $A\cap A=A$; $A\cup\varnothing=A$, $A\cap U=A$, $A\cup U=U$, $A\cap\varnothing=\varnothing$. |
| Troca e agrupamento | União e interseção admitem comutatividade e associatividade, sem trocar a operação. |
| Absorção | $A\cup(A\cap B)=A$; $A\cap(A\cup B)=A$. |
| Distributividade | $A\cap(B\cup C)=(A\cap B)\cup(A\cap C)$; $A\cup(B\cap C)=(A\cup B)\cap(A\cup C)$. |
| De Morgan | $(A\cup B)^c=A^c\cap B^c$; $(A\cap B)^c=A^c\cup B^c$. |

Ao complementar uma expressão composta, **complemente cada parcela e troque união/interseção**. Valem também $A\cup A^c=U$, $A\cap A^c=\varnothing$ e $(A^c)^c=A$.

## Conte sem sobrepor regiões

Para conjuntos finitos $A,B\subseteq U$, a <abbr title="regra que corrige a contagem repetida das interseções">inclusão-exclusão</abbr> retira quem foi contado duas vezes:

$$
|A\cup B|=|A|+|B|-|A\cap B|,\qquad
|A\triangle B|=|A|+|B|-2|A\cap B|.
$$

Somente $A$: $|A|-|A\cap B|$; nenhum: $|U|-|A\cup B|$. Para conferir dados com $U$ finito:

$$
\max(0,|A|+|B|-|U|)\le |A\cap B|\le\min(|A|,|B|).
$$

**Três conjuntos: comece pelo centro.** Uma interseção de pares, como $A\cap B$, **inclui** a região tripla; a região “A e B, mas não C” é $|A\cap B|-|A\cap B\cap C|$. Preencha tripla → pares exclusivos → conjuntos exclusivos → fora da união.

$$
|A\cup B\cup C|
=|A|+|B|+|C|
-|A\cap B|-|A\cap C|-|B\cap C|
+|A\cap B\cap C|.
$$

“Pelo menos dois” = soma das três interseções de pares **menos duas vezes** a tripla. Ao final, nenhuma região pode ser negativa e a soma de todas, inclusive fora da união, deve ser $|U|$.
