# Proposições e tabelas-verdade

## Proposição

- Afirmação declarativa com exatamente um valor lógico no contexto: **V** ou **F**.
- Não conhecer o valor não significa que a frase não seja proposição.
- Contexto deve fixar referentes, tempo e sentido necessários à avaliação.
- Na lógica clássica bivalente, não há terceiro valor.

### Não são proposições

- pergunta;
- ordem, pedido ou conselho;
- exclamação sem afirmação avaliável;
- sentença aberta com variável não fixada;
- formulação sem valor lógico consistente.

> Pergunta e ordem não são falsas: simplesmente não recebem V/F.

## Simples e composta

- **Simples/atômica:** não é formada, na análise, pela combinação de outras proposições.
- **Composta/molecular:** resulta da aplicação de conectivo a uma ou mais proposições.
- Conte letras proposicionais distintas, não verbos nem ocorrências repetidas.

Exemplo:

- $p$: “A auditoria começou.”
- $q$: “O relatório está pronto.”
- $p \land q$: “A auditoria começou e o relatório está pronto.”

## Conectivos

| Operação | Forma | Verdadeira quando |
|---|---:|---|
| negação | $\neg p$ | $p$ é F |
| conjunção | $p \land q$ | ambas são V |
| disjunção inclusiva | $p \lor q$ | ao menos uma é V |
| disjunção exclusiva | $p \veebar q$ | exatamente uma é V |
| condicional | $p \to q$ | exceto no caso V/F |
| bicondicional | $p \leftrightarrow q$ | os valores são iguais |

## Negação

| $p$ | $\neg p$ |
|:---:|:---:|
| V | F |
| F | V |

- Inverte V e F.
- O alcance depende dos parênteses.
- $\neg(p \land q)$ nega a composta inteira.
- $(\neg p) \land q$ nega somente $p$.

## Conjunção

| $p$ | $q$ | $p \land q$ |
|:---:|:---:|:---:|
| V | V | V |
| V | F | F |
| F | V | F |
| F | F | F |

- Exige todas as componentes verdadeiras.
- Uma componente F já torna o resultado F.
- “e”, “mas”, “embora” e “tanto... quanto” normalmente usam essa regra básica.

## Disjunção inclusiva

| $p$ | $q$ | $p \lor q$ |
|:---:|:---:|:---:|
| V | V | V |
| V | F | V |
| F | V | V |
| F | F | F |

- Exige ao menos uma componente verdadeira.
- O “ou” simples inclui o caso V/V.
- Uma componente V já torna o resultado V.

## Disjunção exclusiva

| $p$ | $q$ | $p \veebar q$ |
|:---:|:---:|:---:|
| V | V | F |
| V | F | V |
| F | V | V |
| F | F | F |

- Exatamente uma componente deve ser verdadeira.
- Indícios: “mas não ambos”, “exatamente uma”, “exclusivamente”.
- Pode aparecer como $\veebar$ ou $\oplus$.

## Condicional

| $p$ | $q$ | $p \to q$ |
|:---:|:---:|:---:|
| V | V | V |
| V | F | **F** |
| F | V | V |
| F | F | V |

> Condicional só é falsa em **V → F**.

- $p$: antecedente.
- $q$: consequente.
- Antecedente falso torna a condicional verdadeira.
- Consequente verdadeiro torna a condicional verdadeira.
- A tabela não exige causalidade, ordem temporal nem tema comum.

## Suficiente e necessária

Em $p \to q$:

- $p$ é **suficiente** para $q$;
- $q$ é **necessária** para $p$.

| Frase | Forma |
|---|---|
| se $p$, então $q$ | $p \to q$ |
| $p$ implica $q$ | $p \to q$ |
| $p$ é suficiente para $q$ | $p \to q$ |
| $q$ é necessário para $p$ | $p \to q$ |
| $p$ somente se $q$ | $p \to q$ |
| $p$ se $q$ | $q \to p$ |

> “Somente se” introduz a condição necessária, no lado direito da seta.

## Bicondicional

| $p$ | $q$ | $p \leftrightarrow q$ |
|:---:|:---:|:---:|
| V | V | V |
| V | F | F |
| F | V | F |
| F | F | V |

- Verdadeira quando os valores são iguais.
- Expressa necessidade e suficiência recíprocas.
- Leituras: “se e somente se”, “exatamente quando”, “condição necessária e suficiente”.

## Bicondicional × exclusiva

| Valores de $p$ e $q$ | $p \leftrightarrow q$ | $p \veebar q$ |
|---|:---:|:---:|
| iguais | V | F |
| diferentes | F | V |

## Parênteses

- Resolva das subfórmulas internas para a externa.
- Parênteses fixam o agrupamento.
- $p \lor (q \land r)$ pode diferir de $(p \lor q) \land r$.
- A negação atua sobre a fórmula imediatamente seguinte.
- Se a banca declarar precedência, siga-a.
- Ao formalizar, use parênteses sempre que houver risco de ambiguidade.

## Número de linhas

$$
\text{linhas}=2^n
$$

$n$ = quantidade de proposições simples **distintas**.

| $n$ | Linhas |
|:---:|:---:|
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |
| 4 | 16 |
| 5 | 32 |

- Repetições de $p$ não aumentam $n$.
- $(p \land q) \lor (p \land \neg q)$ tem duas letras distintas e quatro linhas.

## Enumeração para três letras

| $p$ | $q$ | $r$ |
|:---:|:---:|:---:|
| V | V | V |
| V | V | F |
| V | F | V |
| V | F | F |
| F | V | V |
| F | V | F |
| F | F | V |
| F | F | F |

- Primeira coluna: blocos de 4.
- Segunda coluna: blocos de 2.
- Terceira coluna: alterna a cada linha.
- Outra ordem é válida se listar todas as combinações uma única vez.

## Construção da tabela

1. Liste as letras distintas.
2. Calcule $2^n$.
3. Enumere V/F sem omitir combinações.
4. Identifique o conectivo principal.
5. Crie uma coluna por subfórmula.
6. Resolva das operações internas para as externas.
7. Confira a coluna final.

## Exemplo rápido

Para $(p \lor q) \land \neg p$:

| $p$ | $q$ | $p \lor q$ | $\neg p$ | resultado |
|:---:|:---:|:---:|:---:|:---:|
| V | V | V | F | F |
| V | F | V | F | F |
| F | V | V | V | V |
| F | F | F | V | F |

## Atalhos seguros

- Conjunção com uma componente F: F.
- Disjunção inclusiva com uma componente V: V.
- Condicional com antecedente F: V.
- Condicional com consequente V: V.
- Bicondicional: compare se os valores são iguais.
- Exclusiva: compare se os valores são diferentes.

## Classificação pela coluna final

| Padrão | Classificação |
|---|---|
| somente V | tautologia |
| somente F | contradição |
| ao menos um V e ao menos um F | contingência |

- $p \lor \neg p$: tautologia.
- $p \land \neg p$: contradição.
- $p \to q$: contingência.

> A classificação exige a coluna completa. Uma linha isolada fornece apenas o valor naquela atribuição.

## Linguagem natural

- Defina letras para afirmações inteiras.
- Localize “se”, “somente se”, “e”, “ou”, “não”.
- Preserve o alcance com parênteses.
- Não presuma “ou exclusivo” sem indicação.
- Não inverta condição suficiente e necessária.

Exemplo:

- $p$: “O cadastro está completo.”
- $q$: “O comprovante será emitido.”
- “O comprovante será emitido **se** o cadastro estiver completo”: $p \to q$.
- “O comprovante será emitido **somente se** o cadastro estiver completo”: $q \to p$.

## Pegadinhas

- Valor desconhecido ≠ ausência de valor lógico.
- Pergunta não é proposição falsa.
- Ordem não é proposição falsa.
- Conte letras distintas, não ocorrências.
- “Ou” simples é inclusivo.
- V/F é a única linha falsa da condicional.
- F/F torna a bicondicional verdadeira.
- Valores iguais tornam a exclusiva falsa.
- “Somente se” aponta para o consequente.
- Contingente não significa sempre falsa.
- Uma linha falsa elimina tautologia, mas não decide sozinha entre contradição e contingência.

## Checklist final

1. Os enunciados básicos recebem V/F?
2. Quantas letras distintas existem?
3. Qual é o alcance de cada conectivo?
4. Qual conectivo é executado por último?
5. Todas as $2^n$ atribuições foram listadas?
6. A linha V/F da condicional foi tratada como F?
7. O caso V/V do “ou” inclusivo foi tratado como V?
8. Os lados iguais da bicondicional foram tratados como V?
9. A classificação considerou toda a coluna final?
