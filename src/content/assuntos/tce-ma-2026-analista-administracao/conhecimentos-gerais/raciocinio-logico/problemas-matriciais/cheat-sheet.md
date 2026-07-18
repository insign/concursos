# Problemas matriciais

## Leitura básica

$$
A_{m\times n}
$$

tem $m$ linhas e $n$ colunas.

$$
a_{ij}=\text{elemento da linha }i\text{ e coluna }j.
$$

Primeiro índice: linha. Segundo índice: coluna.

Antes de calcular, identifique:

- significado das linhas;
- significado das colunas;
- unidade dos elementos;
- operação pedida.

## Formas frequentes

| Forma | Característica |
|---|---|
| matriz linha | $1\times n$ |
| matriz coluna | $m\times1$ |
| quadrada | $n\times n$ |
| nula | todos os elementos iguais a zero |
| diagonal | quadrada; zeros fora da diagonal principal |
| identidade $I_n$ | diagonal principal igual a $1$ |
| simétrica | $A^T=A$ |

Diagonal principal:

$$
a_{11},a_{22},\ldots,a_{nn}.
$$

## Igualdade

$$
A=B
$$

somente se:

1. $A$ e $B$ têm a mesma ordem;
2. $a_{ij}=b_{ij}$ em todas as posições.

## Adição e subtração

Exigem a mesma ordem:

$$
(A+B)_{ij}=a_{ij}+b_{ij},
$$

$$
(A-B)_{ij}=a_{ij}-b_{ij}.
$$

Aplicações:

- total de períodos: $A+B$;
- variação: novo menos antigo.

## Multiplicação por escalar

$$
(kA)_{ij}=ka_{ij}.
$$

Multiplique todos os elementos.

Novo valor após aumento de $p\%$:

$$
\left(1+\frac p{100}\right)A.
$$

## Transposta

Troca linhas por colunas:

$$
(A^T)_{ij}=a_{ji}.
$$

Ordem:

$$
m\times n\longrightarrow n\times m.
$$

Propriedades:

$$
(A^T)^T=A,
$$

$$
(A+B)^T=A^T+B^T,
$$

$$
(kA)^T=kA^T,
$$

$$
(AB)^T=B^TA^T.
$$

No produto transposto, inverta os fatores.

## Produto matricial

Condição e ordem:

$$
A_{m\times n}B_{n\times p}=C_{m\times p}.
$$

Dimensões internas iguais; dimensões externas no resultado.

Elemento do produto:

$$
c_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}.
$$

Regra prática:

1. escolha a linha $i$ de $A$;
2. escolha a coluna $j$ de $B$;
3. multiplique termos correspondentes;
4. some os produtos;
5. grave o resultado na posição $(i,j)$.

Produto matricial não é produto posição a posição.

## Propriedades do produto

$$
A(BC)=(AB)C,
$$

$$
A(B+C)=AB+AC,
$$

$$
(A+B)C=AC+BC.
$$

Em geral:

$$
AB\ne BA.
$$

A existência de $AB$ não garante a de $BA$.

## Identidade

Para $A_{m\times n}$:

$$
I_mA=A,
$$

$$
AI_n=A.
$$

Identidade à esquerda: número de linhas de $A$.

Identidade à direita: número de colunas de $A$.

## Potências

Exigem matriz quadrada:

$$
A^2=AA,
$$

$$
A^3=AAA.
$$

Para expoentes positivos:

$$
A^rA^s=A^{r+s}.
$$

Idempotente:

$$
A^2=A.
$$

## Totais ponderados

Se $Q_{m\times n}$ contém quantidades e $p_{n\times1}$ contém preços unitários:

$$
Qp
$$

é uma matriz $m\times1$ com o total de cada linha.

Cheque as unidades:

$$
\text{quantidade}\times\frac{\text{valor}}{\text{unidade}}
=\text{valor}.
$$

## Etapas sucessivas

Se $B$ atua primeiro e $A$ depois, a composição é:

$$
AB.
$$

O fator da direita atua primeiro.

$$
R_{2\times3}P_{3\times4}=C_{2\times4}.
$$

## Matrizes de relações

Matriz binária:

$$
r_{ij}=1
$$

se a relação existe, e $0$ caso contrário.

- relação recíproca: matriz simétrica;
- relação direcionada: $r_{ij}$ pode diferir de $r_{ji}$.

## Padrões em quadros

Teste, nesta ordem:

1. regra dentro das linhas;
2. regra dentro das colunas;
3. diagonais;
4. consistência em mais de uma posição.

Uma regra que explica apenas uma linha não está confirmada.

## Pegadinhas

- $a_{23}$: segunda linha, terceira coluna.
- Mesmo total de elementos não garante mesma ordem.
- Soma: ordens iguais.
- Produto: colunas da primeira = linhas da segunda.
- Potência: matriz quadrada.
- $AB$ não costuma ser igual a $BA$.
- $(AB)^T=B^TA^T$, não $A^TB^T$.
- Uma tabela só deve ser combinada com outra quando linhas, colunas e unidades forem compatíveis.
- Determinante, inversa, escalonamento e sistemas lineares não integram este recorte do edital.

## Conferência final

1. Rotulei linhas e colunas?
2. Li corretamente os índices?
3. Verifiquei as ordens antes da operação?
4. Antecipei a ordem do resultado?
5. No produto, usei linha por coluna?
6. Preservei a ordem das etapas?
7. Conferi a unidade e o significado da resposta?
