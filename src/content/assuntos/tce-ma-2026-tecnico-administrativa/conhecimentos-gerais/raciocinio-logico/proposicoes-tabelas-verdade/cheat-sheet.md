# Proposições e tabelas-verdade

## Recorte

**Aqui:** proposições, conectivos, formalização, alcance, `2^n`, construção e leitura de tabelas-verdade.

**Depois:** equivalências, De Morgan e diagramas lógicos.

## Proposição

- afirmação declarativa com valor **V** ou **F** no contexto;
- desconhecer o valor ≠ não existir valor lógico;
- pergunta, ordem e sentença aberta **não** são proposições.

## Simples × composta

| Tipo | Regra |
|---|---|
| simples/atômica | tratada como unidade |
| composta/molecular | usa um ou mais conectivos |

Não conte verbos ou palavras; siga a estrutura lógica indicada.

## Matriz dos conectivos

| Operação | Forma | Regra rápida |
|---|---:|---|
| negação | `¬p` | inverte V/F |
| conjunção | `p ∧ q` | V só em V/V |
| disjunção inclusiva | `p ∨ q` | F só em F/F |
| disjunção exclusiva | `p ⊻ q` | V quando exatamente uma é V |
| condicional | `p → q` | F só em V/F |
| bicondicional | `p ↔ q` | V quando os valores são iguais |

## Linhas críticas

- `V ∧ V = V`; qualquer F derruba a conjunção.
- `F ∨ F = F`; qualquer V garante a disjunção inclusiva.
- `V → F = F`; todas as outras linhas da condicional são V.
- `V ↔ V = V` e `F ↔ F = V`.
- `V ⊻ F = V` e `F ⊻ V = V`.

## Condicional

Em `p → q`:

- `p` = antecedente;
- `q` = consequente;
- `p` é **suficiente** para `q`;
- `q` é **necessária** para `p`.

### Tradução

| Frase | Forma |
|---|---|
| se p, então q | `p → q` |
| p implica q | `p → q` |
| p é suficiente para q | `p → q` |
| q é necessário para p | `p → q` |
| p somente se q | `p → q` |
| p se q | `q → p` |

> **Somente se** aponta para a condição necessária, no lado direito da seta.

## Bicondicional × exclusiva

| Valores dos lados | `p ↔ q` | `p ⊻ q` |
|---|:---:|:---:|
| iguais | V | F |
| diferentes | F | V |

## Alcance da negação

- `¬p`: nega apenas `p`.
- `¬(p ∧ q)`: nega a composta inteira.
- `(¬p) ∧ q`: nega somente `p` e depois conjuga com `q`.

Não aplique De Morgan aqui; apenas respeite o alcance e avalie a fórmula.

## Parênteses e conectivo principal

- parênteses fixam o agrupamento;
- resolva das subfórmulas internas para a externa;
- o conectivo executado por último é o **principal**.

Exemplo: em `(p ∨ q) ∧ ¬r`, o conectivo principal é `∧`.

## Número de linhas

`linhas = 2^n`

`n` = número de proposições simples **distintas**.

| n | linhas |
|:---:|:---:|
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |
| 4 | 16 |
| 5 | 32 |

Repetição de uma letra não aumenta `n`.

## Enumeração para três letras

| p | q | r |
|:---:|:---:|:---:|
| V | V | V |
| V | V | F |
| V | F | V |
| V | F | F |
| F | V | V |
| F | V | F |
| F | F | V |
| F | F | F |

A ordem pode variar; todas as combinações devem aparecer exatamente uma vez.

## Fluxo de resolução

1. Identifique as letras distintas.
2. Calcule `2^n`.
3. Enumere V/F.
4. Localize o conectivo principal.
5. Crie colunas para subfórmulas.
6. Resolva de dentro para fora.
7. Leia a coluna final.

## Atalhos seguros

- conjunção + uma F → F;
- disjunção inclusiva + uma V → V;
- condicional + antecedente F → V;
- condicional + consequente V → V;
- bicondicional → compare igualdade;
- exclusiva → compare diferença.

## Classificação pela coluna final

| Coluna final | Classe |
|---|---|
| só V | tautologia |
| só F | contradição |
| V e F | contingência |

Uma linha F elimina tautologia, mas **não** prova contradição.

## Linguagem natural

Se:

- `p`: cadastro completo;
- `q`: comprovante emitido.

Então:

- “q **se** p” → `p → q`;
- “q **somente se** p” → `q → p`;
- “não é verdade que p e q” → `¬(p ∧ q)`;
- “não p e q” → `(¬p) ∧ q`.

## Pegadinhas

- valor desconhecido ≠ não proposição;
- pergunta/ordem ≠ proposição falsa;
- conte letras distintas, não ocorrências;
- “ou” simples é inclusivo;
- condicional só é F em V/F;
- antecedente F torna a condicional V;
- F/F torna a bicondicional V;
- valores iguais tornam a exclusiva F;
- `p somente se q = p → q`;
- parênteses não são decorativos;
- uma linha F ≠ contradição automática.

## Checklist final

- [ ] As frases básicas recebem V/F?
- [ ] Quantas letras distintas há?
- [ ] O “ou” é inclusivo ou há exclusividade expressa?
- [ ] O alcance da negação está correto?
- [ ] “Se” e “somente se” foram orientados corretamente?
- [ ] O conectivo principal foi identificado?
- [ ] Todas as `2^n` atribuições foram consideradas?
- [ ] V/F da condicional foi tratado como F?
- [ ] A classificação considerou a coluna final inteira?
