# Proposições e tabelas-verdade

**Primeiro traduza, depois avalie.** Proposição é afirmação que, no contexto, recebe exatamente um valor lógico: verdadeiro (`V`) ou falso (`F`). Desconhecer o valor não retira sua condição de proposição. Pergunta, ordem e sentença aberta como `x + 2 = 7` (sem valor de `x`) não recebem `V` ou `F`.

Uma proposição **simples** é tratada como unidade; uma **composta** combina unidades por conectivos. O número de verbos não determina quantas unidades lógicas há: identifique as afirmações independentes do enunciado.

## Tabela de decisões dos conectivos

| Operação | Forma | Quando é verdadeira? | Linha que costuma decidir |
|---|---|---|---|
| Negação | `¬p` | Quando `p` é `F`. | Inverte o valor de `p`. |
| Conjunção | `p ∧ q` | Quando ambas são `V`. | Uma componente `F` já a torna `F`. |
| Ou inclusivo | `p ∨ q` | Quando ao menos uma é `V`, inclusive ambas. | Só `F/F` a torna `F`. |
| Ou exclusivo | `p ⊻ q` | Quando exatamente uma é `V`. | Valores iguais a tornam `F`. |
| Condicional | `p → q` | Em todos os casos, exceto `V/F`. | Antecedente `V` e consequente `F` a tornam `F`. |
| Bicondicional | `p ↔ q` | Quando os valores coincidem, inclusive `F/F`. | Valores diferentes a tornam `F`. |

O “ou” simples é inclusivo; exija indicação de exclusividade (“ou um ou outro, mas não ambos”) para usar `⊻`. Na condicional material, `p` é **antecedente e suficiente** para `q`; `q` é **consequente e necessário** para `p`. Antecedente `F` ou consequente `V` garantem valor `V` da condicional, sem afirmar ocorrência ou causalidade no mundo.

| Frase | Direção |
|---|---|
| `p` **se** `q` | `q → p`: `q` basta para `p`. |
| `p` **somente se** `q` | `p → q`: `q` é exigida para `p`. |
| `p` **se e somente se** `q` | `p ↔ q`: as duas direções. |

## Agrupe e conte

**Alcance:** `¬(p ∧ q)` nega a expressão inteira; `(¬p) ∧ q` nega só `p`. Em `(p ∨ q) ∧ ¬r`, resolva `p ∨ q` e `¬r` antes da conjunção, que é o conectivo principal. Respeite parênteses e a convenção dada; avaliar a fórmula não exige substituí-la por outra equivalente (H039).

Com `n` proposições simples **distintas**, a tabela completa tem `2^n` linhas: cada letra pode ser `V` ou `F`, e repetir a mesma letra não cria nova possibilidade. Assim, quatro letras distintas dão `16` atribuições. Enumere cada combinação uma vez, calcule as subfórmulas internas e leia a coluna final. Se o enunciado já fixa uma atribuição, avalie só essa linha; **uma condicional inteira falsa força antecedente verdadeiro e consequente falso**, inclusive quando ambos são subfórmulas.

| Coluna final, após todas as atribuições | Classe |
|---|---|
| Só `V` | Tautologia: sempre verdadeira. |
| Só `F` | Contradição: sempre falsa. |
| `V` e `F` | Contingência: depende da atribuição. |

Uma linha `F` exclui tautologia, mas não basta para provar contradição. Em prova, confira **quantas letras distintas**, **onde aponta “somente se”**, **qual expressão é negada** e **qual é o valor da última coluna**, nessa ordem.
