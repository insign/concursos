# Proposições, conectivos e tabelas-verdade

**Filtro:** afirmação declarativa, com contexto e sentido fixados, recebe verdadeiro ou falso. Desconhecer seu valor não a exclui. Pergunta e ordem não são afirmações falsas; sentença com variável livre permanece aberta. Uma exclamação pode conter afirmação avaliável.

**Unidades:** conte afirmações simples distintas, não verbos, palavras “e” nem repetições de letras. Cada letra mantém o mesmo significado. Uma relação como “Ana e Bruno são irmãos” não se divide apenas por conter “e”.

## Decisões dos conectivos

| Operação | Forma | Critério |
|---|---|---|
| Negação | $\neg p$ ou $\sim p$ | Inverte o valor da expressão alcançada. |
| Conjunção | $p\land q$ | Verdadeira só com ambas verdadeiras. |
| Disjunção inclusiva | $p\lor q$ | Falsa só com ambas falsas; admite ambas verdadeiras. |
| Disjunção exclusiva | $p\veebar q$ ou $p\oplus q$ | Verdadeira só com valores diferentes. |
| Condicional | $p\to q$ | Falsa só com p verdadeira e q falsa. |
| Bicondicional | $p\leftrightarrow q$ | Verdadeira com valores iguais, inclusive ambas falsas. |

“Ou” é inclusivo na leitura usual de prova, salvo indicação de exclusividade. “Mas” pode conjugar duas afirmações; o contraste linguístico não muda a regra de verdade.

Na condicional, p é **antecedente** e q é **consequente**. Antecedente falso ou consequente verdadeiro tornam a condicional verdadeira. Isso não comprova ocorrência, causalidade nem ordem temporal.

| Linguagem | Direção |
|---|---|
| p **se** q | $q\to p$ |
| p **somente se** q | $p\to q$ |
| p suficiente para q; q necessária para p | $p\to q$ |
| p **se e somente se** q | $p\leftrightarrow q$ |

Quando a condicional vale como regra, o antecedente basta para o consequente; o consequente é exigido para o antecedente. A seta não se inverte por isso.

## Alcance e cálculo

- $\neg(p\land q)$: calcule a conjunção inteira e negue o resultado.
- $(\neg p)\land q$: negue só p e depois faça a conjunção.
- Em $(p\lor q)\land\neg r$, a conjunção externa é o **conectivo principal**, aplicado por último. Resolva as partes internas antes dela.
- Negar “mais de 80” inclui “80”: a negação é “no máximo 80”.

**Tabela completa:** n letras distintas → $2^n$ linhas. Uma, duas, três e quatro letras dão 2, 4, 8 e 16 linhas. Repetição e nome da fórmula inteira não aumentam n. Enumere cada combinação uma vez; com três letras, alterne valores em blocos de 4, 2 e 1 linha. Respeite os parênteses e a prioridade indicada.

Uma **atribuição** fixa um valor para cada letra. **Valores já dados:** calcule só a atribuição indicada. **Valor da fórmula dado:** volte às partes sem concluir além do que foi forçado:

- condicional falsa → antecedente verdadeiro e consequente falso;
- condicional verdadeira + consequente falso → antecedente falso;
- conjunção verdadeira → todas as partes verdadeiras;
- disjunção inclusiva falsa → todas as partes falsas.

Essas regras também valem quando as partes são fórmulas compostas.

| Coluna final | Classe |
|---|---|
| Todas verdadeiras | <abbr title="Fórmula verdadeira em toda atribuição de valores">Tautologia</abbr> |
| Todas falsas | <abbr title="Fórmula falsa em toda atribuição de valores">Contradição</abbr> |
| Alguma verdadeira e outra falsa | <abbr title="Fórmula que varia de valor conforme a atribuição">Contingência</abbr> |

Uma linha falsa exclui tautologia; uma verdadeira exclui contradição. As duas juntas provam contingência, sem exigir metade das linhas de cada valor.
