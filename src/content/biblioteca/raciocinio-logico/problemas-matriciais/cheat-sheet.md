# Problemas matriciais

## Fluxo

1. O que significam linhas e colunas?
2. É um **padrão no quadro** ou uma **operação matricial**?
3. Qual posição ou grandeza foi pedida?
4. As ordens permitem a operação?
5. O resultado tem a ordem e a unidade esperadas?

## Leitura

$$
A_{m\times n}
$$

$m$ = linhas; $n$ = colunas.

$$
a_{ij}=\text{linha }i,\ \text{coluna }j.
$$

> $a_{23}$ = **2ª linha, 3ª coluna**.

## Padrões em quadros

Teste nesta ordem:

1. regra nas linhas;
2. regra nas colunas;
3. diagonais, se fizer sentido;
4. consistência em mais de uma posição.

Regra que explica só uma linha **não está confirmada**.

## Operações

| Operação | Condição | Regra |
|---|---|---|
| igualdade | mesma ordem | elementos correspondentes iguais |
| soma/subtração | mesma ordem | posição a posição |
| escalar $kA$ | qualquer ordem | multiplica todos os elementos |
| transposta | sempre | troca linhas por colunas |
| produto $AB$ | colunas de $A$ = linhas de $B$ | linha × coluna |

Variação:

$$
\text{novo}-\text{antigo}.
$$

Aumento uniforme de 10%:

$$
1{,}10A.
$$

## Transposta

$$
(A^T)_{ij}=a_{ji}
$$

$$
m\times n\to n\times m.
$$

Interpretação: “setores × produtos” vira “produtos × setores”.

## Produto matricial

$$
A_{m\times n}B_{n\times p}=C_{m\times p}.
$$

Macete:

$$
(m\times\cancel n)(\cancel n\times p)\to m\times p.
$$

Entrada $c_{ij}$:

$$
\text{linha }i\text{ de }A\cdot\text{coluna }j\text{ de }B.
$$

Produto matricial **não** é produto posição a posição.

## Ordem dos fatores

Em geral:

$$
AB\ne BA.
$$

- $AB$ existir não garante que $BA$ exista.
- Em composição de etapas, o fator da **direita atua primeiro**.

## Totais ponderados

Se $Q$ contém quantidades por linha e $p$ é vetor coluna de preços:

$$
Qp
$$

fornece um total ponderado para cada linha.

Cheque a unidade:

$$
\text{quantidade}\times\frac{\text{valor}}{\text{unidade}}=\text{valor}.
$$

## Fatos secundários

Identidade compatível:

$$
I_mA=A,
\qquad
AI_n=A
$$

para $A_{m\times n}$.

Potência:

$$
A^2=AA
$$

só está definida quando $A$ é quadrada.

## Pegadinhas

- $2\times3\ne3\times2$.
- Mesmo número de elementos não significa mesma ordem.
- Soma: ordens iguais.
- Produto: dimensões **internas** iguais.
- Resultado do produto: dimensões **externas**.
- $AB$ não costuma ser $BA$.
- Transposta troca eixos; não muda valores arbitrariamente.
- Em padrões, confirme a regra em várias posições.
- Não puxe determinante, inversa, escalonamento ou sistemas lineares para este recorte.

## Conferência final

- Rotulei linhas e colunas?
- Li corretamente os índices?
- Diferenciei padrão de operação?
- Conferi a ordem antes do cálculo?
- No produto, usei linha × coluna?
- Interpretei a unidade e o significado do resultado?
