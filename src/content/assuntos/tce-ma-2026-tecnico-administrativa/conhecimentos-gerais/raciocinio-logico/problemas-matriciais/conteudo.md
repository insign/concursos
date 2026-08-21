---
schemaVersion: 1
title: Problemas matriciais
description: Leitura, padrões, operações elementares e modelagem de problemas com matrizes, com ênfase em linhas, colunas, transposição e produto matricial.
order: 45
storageId: tec-problemas-matriciais
---

## 1. Recorte

O edital cobra **raciocínio lógico envolvendo problemas matriciais**. O foco, portanto, é usar uma disposição em linhas e colunas para interpretar dados, reconhecer padrões, escolher operações e modelar situações simples — sem transformar o item em um curso de álgebra linear.

Neste assunto, priorize:

- leitura de linhas, colunas, ordem e índices;
- interpretação de quadros e padrões matriciais;
- igualdade, soma, subtração e multiplicação por escalar;
- transposição como troca de eixos;
- produto matricial em nível elementar;
- totais ponderados e composição simples de etapas.

Determinantes, matriz inversa, escalonamento e resolução de sistemas lineares **não são nomeados no edital** e ficam fora deste recorte. Aritmética geral pertence ao Assunto 043 e geometria ao Assunto 044.

## 2. Leia a estrutura antes de calcular

Uma matriz com $m$ linhas e $n$ colunas tem ordem $m\times n$:

$$
A=\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & \ddots & \vdots\\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}.
$$

O elemento $a_{ij}$ está na **linha $i$** e na **coluna $j$**. O primeiro índice indica a linha; o segundo, a coluna.

Considere

$$
Q=\begin{bmatrix}
12&8&5\\
9&11&7
\end{bmatrix}.
$$

$Q$ tem ordem $2\times3$, $q_{12}=8$ e $q_{23}=7$.

Se as linhas representam setores e as colunas materiais, então $q_{23}=7$ significa: **o segundo setor utiliza sete unidades do terceiro material**.

> A mesma matriz numérica pode representar grandezas diferentes. O significado vem dos rótulos das linhas, das colunas e das unidades.

### 2.1. Diagonais quando o problema as usa

Em uma matriz quadrada, a diagonal principal contém

$$
a_{11},a_{22},\ldots,a_{nn}.
$$

Em um quadro numérico, a diagonal pode participar de uma regra, mas não deve ser privilegiada sem indicação ou padrão consistente.

## 3. Padrões em quadros matriciais

Em questões de raciocínio, a matriz pode funcionar apenas como **organização do padrão**. Antes de procurar uma operação matricial formal, teste relações simples.

Use esta ordem:

1. compare os elementos de cada linha;
2. compare os elementos de cada coluna;
3. verifique diagonais, se fizer sentido;
4. teste a mesma regra em mais de uma linha ou coluna;
5. rejeite regras que explicam apenas uma parte do quadro.

Exemplo:

$$
\begin{bmatrix}
2&3&5\\
4&7&11\\
6&x&15
\end{bmatrix}.
$$

Se, em cada linha, o terceiro elemento é a soma dos dois primeiros, então

$$
6+x=15\Rightarrow x=9.
$$

A regra é confiável porque também vale nas duas linhas anteriores.

> Não existe uma regra universal para “completar matrizes”. A regra deve ser inferida dos dados do enunciado.

## 4. Igualdade e operações posição a posição

### 4.1. Igualdade

Duas matrizes são iguais somente se:

1. têm a mesma ordem;
2. possuem elementos correspondentes iguais.

Ter o mesmo número total de elementos não basta.

### 4.2. Soma e subtração

Exigem matrizes de mesma ordem:

$$
(A+B)_{ij}=a_{ij}+b_{ij},
$$

$$
(A-B)_{ij}=a_{ij}-b_{ij}.
$$

Se duas matrizes registram as mesmas grandezas em períodos diferentes, a soma pode representar o total dos períodos.

Se $N$ contém valores novos e $A$ os antigos, a variação é

$$
N-A.
$$

Assim, aumento aparece positivo e redução, negativa.

### 4.3. Multiplicação por escalar

Para um número $k$:

$$
(kA)_{ij}=ka_{ij}.
$$

Todos os elementos são multiplicados por $k$. Um aumento uniforme de $10\%$ nos valores de uma matriz produz

$$
1{,}10A,
$$

não $0{,}10A$, que representa apenas o acréscimo.

## 5. Transposta: trocar os eixos

A transposta de $A$, indicada por $A^T$, troca linhas por colunas:

$$
(A^T)_{ij}=a_{ji}.
$$

Se

$$
A=\begin{bmatrix}
1&4&7\\
2&5&8
\end{bmatrix},
$$

então

$$
A^T=\begin{bmatrix}
1&2\\
4&5\\
7&8
\end{bmatrix}.
$$

A ordem muda de

$$
m\times n\longrightarrow n\times m.
$$

Aplicação típica: uma tabela “setores nas linhas × produtos nas colunas” pode ser reorganizada como “produtos nas linhas × setores nas colunas” por meio da transposição.

## 6. Produto matricial

O produto matricial combina uma **linha da primeira matriz** com uma **coluna da segunda**.

Se

$$
A_{m\times n}B_{n\times p},
$$

então $AB$ existe e tem ordem

$$
m\times p.
$$

Regra visual:

$$
(m\times\cancel n)(\cancel n\times p)\longrightarrow m\times p.
$$

Se as dimensões internas não coincidirem, o produto não existe.

### 6.1. Cálculo de uma entrada

Para

$$
A=\begin{bmatrix}1&2\\3&4\end{bmatrix},
\qquad
B=\begin{bmatrix}5&0\\2&1\end{bmatrix},
$$

o elemento $(2,1)$ de $AB$ usa a segunda linha de $A$ e a primeira coluna de $B$:

$$
3\cdot5+4\cdot2=23.
$$

O produto matricial **não** é multiplicação posição a posição.

### 6.2. A ordem dos fatores importa

Em geral,

$$
AB\ne BA.
$$

Mesmo a existência de $AB$ não garante a existência de $BA$. A ordem dos fatores também pode representar a ordem de etapas de um processo.

## 7. Modelagem com matrizes

### 7.1. Totais ponderados

Suponha que

$$
Q=\begin{bmatrix}
2&3\\
1&5
\end{bmatrix}
$$

registre quantidades de dois materiais em dois setores, e que

$$
p=\begin{bmatrix}10\\4\end{bmatrix}
$$

contenha os preços unitários.

Então

$$
Qp=
\begin{bmatrix}
2\cdot10+3\cdot4\\
1\cdot10+5\cdot4
\end{bmatrix}
=
\begin{bmatrix}32\\30\end{bmatrix}.
$$

Cada entrada do resultado é o custo total do setor correspondente.

A unidade ajuda a validar a modelagem:

$$
\text{quantidade}\times\frac{\text{valor}}{\text{unidade}}=\text{valor}.
$$

### 7.2. Etapas sucessivas

Se $B$ representa a primeira etapa e $A$ a etapa seguinte, a composição é

$$
AB.
$$

O fator da direita atua primeiro. Trocar para $BA$ inverte a ordem e pode mudar o resultado ou até tornar o produto impossível.

## 8. Fatos secundários úteis

Algumas noções podem aparecer como apoio, sem merecer aprofundamento autônomo:

- a matriz identidade $I_n$ é o elemento neutro do produto quando as ordens são compatíveis;
- para $A_{m\times n}$, $I_mA=A$ e $AI_n=A$;
- a potência $A^2=AA$ exige que $A$ seja quadrada.

Não é necessário desenvolver teoria de matrizes especiais além do que a própria questão exigir.

## 9. Fluxo de resolução

1. **Rotule os eixos:** o que significam linhas e colunas?
2. **Leia a posição:** qual elemento ou padrão foi pedido?
3. **Decida o tipo de raciocínio:** padrão no quadro ou operação matricial?
4. **Confira as ordens:** soma exige mesma ordem; produto exige dimensões internas iguais.
5. **Antecipe o resultado:** no produto, $(m\times n)(n\times p)\to m\times p$.
6. **Calcule com significado:** acompanhe linha, coluna e unidade.
7. **Interprete:** diga o que o número ou matriz resultante representa.

## 10. Pegadinhas

- $a_{23}$ = segunda linha, terceira coluna.
- Matriz $2\times3$ não é matriz $3\times2$.
- Mesmo total de elementos não garante igualdade nem compatibilidade para soma.
- Soma e subtração são posição a posição; produto matricial, não.
- Produto: colunas da primeira = linhas da segunda.
- A existência de $AB$ não garante a de $BA$.
- Mesmo quando ambos existem, $AB$ e $BA$ podem ser diferentes.
- Transposta troca os eixos; não altera arbitrariamente os valores.
- Em padrão matricial, confirme a regra em mais de uma linha ou coluna.
- Não introduza determinante, inversa ou sistemas lineares se o problema não os exigir expressamente.
