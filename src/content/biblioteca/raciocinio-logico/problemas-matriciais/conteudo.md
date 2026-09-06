---
schemaVersion: 1
title: Problemas matriciais
description: Leitura, padrões, operações elementares e modelagem de problemas com matrizes, com ênfase em linhas, colunas, transposição e produto matricial.
order: 45
storageId: problemas-matriciais
---

## 1. Comece perguntando o que cada posição significa

Uma matriz é, antes de tudo, uma **disposição retangular de valores em linhas e colunas**. Em problema de prova, o quadro só ganha significado quando você sabe o que as linhas, as colunas e cada entrada representam.

Considere este cenário hipotético:

$$
Q=\begin{bmatrix}
12&8&5\\
9&11&7
\end{bmatrix}.
$$

Se as linhas representam setores e as colunas representam materiais, a entrada da segunda linha e terceira coluna informa o consumo do terceiro material pelo segundo setor: **7 unidades**. Se o enunciado mudasse os rótulos, a mesma matriz numérica passaria a representar outra situação.

Por isso, antes de calcular, faça três perguntas:

1. o que significam as **linhas**?
2. o que significam as **colunas**?
3. o que significa cada **valor** e qual é sua unidade?

O edital cobra **raciocínio lógico envolvendo problemas matriciais**. Aqui entram leitura de posições, padrões em quadros, matrizes definidas por regras, operações elementares, transposição, produto matricial e modelagens simples. Determinantes, matriz inversa, escalonamento e resolução de sistemas lineares não são nomeados nesse recorte e não serão desenvolvidos como tópicos autônomos. Aritmética geral pertence ao Assunto 043 e geometria ao Assunto 044.

## 2. Ordem e índices: a linguagem das posições

Uma matriz com $m$ linhas e $n$ colunas tem **ordem** $m\times n$:

$$
A=\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & \ddots & \vdots\\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}.
$$

Em $a_{ij}$:

- $i$ indica a **linha**;
- $j$ indica a **coluna**.

Logo, $a_{23}$ é o elemento da segunda linha e terceira coluna. Na matriz $Q$ da abertura, $Q$ tem ordem $2\times3$, $q_{12}=8$ e $q_{23}=7$.

> Ordem $2\times3$ significa duas linhas e três colunas. Trocar para $3\times2$ muda a estrutura, ainda que o total de seis posições permaneça o mesmo.

### 2.1. Quando o elemento é definido por uma regra

Às vezes o enunciado não fornece todos os valores: ele diz como calcular cada entrada a partir de sua posição.

Se

$$
a_{ij}=2i+j,
$$

então, para encontrar $a_{32}$, substitua os números da linha e da coluna:

$$
a_{32}=2\cdot3+2=8.
$$

A estratégia é sempre a mesma:

1. identifique a posição pedida;
2. associe corretamente $i$ à linha e $j$ à coluna;
3. substitua esses índices na regra;
4. só então calcule.

Se a definição for por casos — por exemplo, uma fórmula para $i<j$, outra para $i=j$ e outra para $i>j$ — primeiro compare os índices para escolher a regra correta.

### 2.2. Diagonal principal

Em uma matriz quadrada, isto é, com o mesmo número de linhas e colunas, a diagonal principal contém

$$
a_{11},a_{22},\ldots,a_{nn}.
$$

Essas são exatamente as posições em que $i=j$. A diagonal pode participar de uma regra, mas não deve ser privilegiada em um quadro de padrões sem indicação do enunciado ou regularidade consistente.

## 3. Padrões: a matriz pode ser apenas o tabuleiro do raciocínio

Nem toda questão que apresenta uma matriz quer uma operação matricial formal. Muitas usam linhas e colunas apenas para organizar um padrão.

Considere

$$
\begin{bmatrix}
2&3&5\\
4&7&11\\
6&x&15
\end{bmatrix}.
$$

Nas duas primeiras linhas, o terceiro número é a soma dos dois anteriores. Se a mesma regra vale na terceira,

$$
6+x=15\Rightarrow x=9.
$$

O ponto decisivo não é encontrar uma regra que funcione uma vez, mas **confirmá-la em outras partes do quadro**.

Use esta sequência:

1. compare os elementos dentro de cada linha;
2. compare as colunas;
3. verifique diagonais somente se houver motivo;
4. teste a regra em mais de uma linha, coluna ou posição;
5. rejeite uma hipótese que explica apenas parte dos dados.

> Não existe uma regra universal para “completar matrizes”. A regra é inferida das informações do próprio problema.

## 4. Operações posição a posição

### 4.1. Igualdade

Duas matrizes são iguais somente quando:

1. têm a mesma ordem;
2. cada par de elementos correspondentes é igual.

Ter a mesma quantidade de elementos ou a mesma soma total não basta.

### 4.2. Soma e subtração

Só fazem sentido entre matrizes de **mesma ordem**:

$$
(A+B)_{ij}=a_{ij}+b_{ij},
$$

$$
(A-B)_{ij}=a_{ij}-b_{ij}.
$$

Se duas matrizes registram as mesmas grandezas em períodos diferentes, a soma pode agregar os períodos. Se $N$ contém os valores novos e $A$ os antigos, a variação é

$$
N-A,
$$

porque valor final menos valor inicial deixa aumentos positivos e reduções negativas.

### 4.3. Multiplicação por um número

Quando um único número $k$ multiplica uma matriz, ele multiplica **todas** as entradas:

$$
(kA)_{ij}=ka_{ij}.
$$

Esse número é chamado **escalar**. Se todos os valores aumentam $10\%$, os novos valores formam

$$
1{,}10A.
$$

Já $0{,}10A$ representa somente o acréscimo de $10\%$, não o total reajustado.

## 5. Transposta: trocar os dois eixos

A **transposta** de $A$, indicada por $A^T$, transforma linhas em colunas:

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

A ideia é concreta: uma tabela “setores nas linhas × produtos nas colunas” passa a ser “produtos nas linhas × setores nas colunas”, preservando o valor associado a cada par.

## 6. Produto matricial: linha da primeira com coluna da segunda

Soma trabalha posição com posição. **Produto matricial é outro mecanismo:** cada entrada do resultado vem da combinação de uma linha da primeira matriz com uma coluna da segunda.

Se

$$
A_{m\times n}B_{n\times p},
$$

então $AB$ existe porque as dimensões internas coincidem e o resultado tem ordem

$$
m\times p.
$$

A conferência visual é

$$
(m\times\cancel n)(\cancel n\times p)\longrightarrow m\times p.
$$

Se as dimensões internas forem diferentes, o produto não existe.

### 6.1. Como nasce uma entrada do produto

Considere

$$
A=\begin{bmatrix}1&2\\3&4\end{bmatrix},
\qquad
B=\begin{bmatrix}5&0\\2&1\end{bmatrix}.
$$

Para obter a entrada $(2,1)$ de $AB$, use a segunda linha de $A$ e a primeira coluna de $B$:

$$
\begin{bmatrix}3&4\end{bmatrix}
\begin{bmatrix}5\\2\end{bmatrix}
=3\cdot5+4\cdot2=23.
$$

A mesma lógica produz qualquer outra entrada. Em forma geral,

$$
(AB)_{ij}=a_{i1}b_{1j}+a_{i2}b_{2j}+\cdots+a_{in}b_{nj}.
$$

Portanto, produto matricial **não** é multiplicação posição a posição.

### 6.2. A ordem dos fatores importa

Em geral,

$$
AB\ne BA.
$$

Além disso, $AB$ existir não garante que $BA$ exista: a compatibilidade das dimensões precisa ser verificada novamente quando a ordem dos fatores muda.

## 7. Produto como modelagem

### 7.1. Totais ponderados

Uma matriz com uma só coluna pode ser usada como **vetor coluna**. Suponha que

$$
Q=\begin{bmatrix}
2&3\\
1&5
\end{bmatrix}
$$

registre quantidades de dois materiais em dois setores, e

$$
p=\begin{bmatrix}10\\4\end{bmatrix}
$$

registre os respectivos preços unitários.

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

Cada linha de quantidades é combinada com a coluna de preços. O resultado traz um total para cada setor.

A unidade ajuda a verificar se a modelagem faz sentido:

$$
\text{quantidade}\times\frac{\text{valor}}{\text{unidade}}=\text{valor}.
$$

### 7.2. Etapas sucessivas

Com vetores-coluna, imagine uma entrada $x$ que passa primeiro por uma transformação representada por $B$ e depois por outra representada por $A$:

$$
x\longmapsto Bx\longmapsto A(Bx)=ABx.
$$

É daí que vem a regra: **o fator da direita atua primeiro**. Trocar $AB$ por $BA$ troca a ordem das etapas e pode mudar o resultado ou até tornar o produto impossível.

Essa mesma ideia permite modelar transições sucessivas: quando uma matriz registra como uma situação pode passar de um estado para outro, produtos sucessivos compõem essas etapas. A interpretação concreta depende do enunciado; o mecanismo continua sendo linha com coluna.

## 8. Identidade e potência: o mínimo necessário

A **matriz identidade** $I_n$ é quadrada, tem 1 na diagonal principal e 0 nas demais posições. Por exemplo,

$$
I_3=\begin{bmatrix}
1&0&0\\
0&1&0\\
0&0&1
\end{bmatrix}.
$$

Ela funciona como elemento neutro do produto matricial. Para $A_{m\times n}$,

$$
I_mA=A
\qquad\text{e}\qquad
AI_n=A.
$$

Repare que a identidade usada à esquerda tem ordem $m$ e a usada à direita tem ordem $n$; isso decorre da compatibilidade das dimensões.

A potência

$$
A^2=AA
$$

só está definida pelo produto matricial usual quando $A$ é quadrada, pois o número de colunas precisa coincidir com o número de linhas.

Não é necessário desenvolver uma teoria extensa de matrizes especiais além do que a própria questão exigir.

## 9. Fluxo de resolução

1. **Dê significado ao quadro:** o que representam linhas, colunas, entradas e unidades?
2. **Leia a posição:** em $a_{ij}$, qual é a linha e qual é a coluna?
3. **Veja como a matriz foi dada:** valores prontos, regra $a_{ij}$ ou padrão a completar?
4. **Escolha o mecanismo:** leitura, padrão, soma/subtração, transposição ou produto?
5. **Confira as ordens antes da conta:** soma exige mesma ordem; produto exige dimensões internas iguais.
6. **Antecipe a forma do resultado:** em $(m\times n)(n\times p)$, a resposta é $m\times p$.
7. **Calcule preservando o significado:** posição, sinal e unidade importam.
8. **Interprete o resultado:** diga o que o número ou a matriz representa no contexto.

## 10. Pegadinhas que merecem reconhecimento imediato

- $a_{23}$ = segunda linha, terceira coluna; não o contrário.
- Matriz $2\times3$ não é matriz $3\times2$.
- Em regra $a_{ij}=f(i,j)$, escolha corretamente os índices antes de substituir.
- Mesmo total de elementos não garante igualdade nem compatibilidade para soma.
- Soma e subtração são posição a posição; produto matricial, não.
- Produto: colunas da primeira = linhas da segunda.
- A existência de $AB$ não garante a de $BA$.
- Mesmo quando ambos existem, $AB$ e $BA$ podem ser diferentes.
- Transposta troca linhas e colunas; não altera arbitrariamente os valores.
- Matriz identidade não é uma matriz cheia de 1: os 1 ficam na diagonal principal e os demais elementos são 0.
- Em padrões, confirme a regra em mais de uma linha, coluna ou posição.
- Não puxe determinante, inversa, escalonamento ou sistemas lineares para uma questão que não os exija.
