---
schemaVersion: 1
title: Problemas matriciais
description: Leitura, modelagem e resolução de problemas com matrizes, incluindo ordem, índices, operações, transposição, produto matricial, identidade, potências e aplicações.
order: 45
storageId: problemas-matriciais
---

## 1. Matrizes como organização do raciocínio

Uma matriz organiza dados em linhas e colunas. Essa estrutura permite localizar informações, comparar quadros, combinar tabelas e representar operações sucessivas de modo compacto.

Em problemas matriciais, o cálculo só faz sentido depois de interpretar:

1. o significado de cada linha;
2. o significado de cada coluna;
3. a unidade de cada elemento;
4. a operação exigida pelo contexto;
5. a ordem em que eventuais transformações ocorrem.

Uma mesma disposição retangular pode representar quantidades, custos, notas, fluxos ou relações lógicas. O contexto determina o significado dos números.

### 1.1. Fronteiras deste assunto

O item 7 do edital reúne problemas aritméticos, geométricos e matriciais. Este assunto cobre a parte matricial elementar e aplicada:

- leitura de quadros em linhas e colunas;
- ordem, elementos e índices;
- igualdade, adição, subtração e multiplicação por escalar;
- transposição;
- produto matricial;
- matriz identidade e potências pequenas;
- modelagem de totais ponderados e de etapas sucessivas;
- padrões e relações representados por matrizes.

Determinantes, matriz inversa, escalonamento e resolução de sistemas lineares formam extensões próprias da álgebra linear. Eles não são nomeados no item do TCE/MA e ficam fora deste recorte. Aritmética geral pertence ao Assunto 043, e geometria ao Assunto 044.

## 2. Representação, ordem e índices

Uma matriz com $m$ linhas e $n$ colunas tem ordem $m\times n$:

$$
A=\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & \ddots & \vdots\\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}.
$$

O elemento $a_{ij}$ ocupa a linha $i$ e a coluna $j$. O primeiro índice sempre indica a linha; o segundo, a coluna.

Considere

$$
Q=\begin{bmatrix}
12 & 8 & 5\\
9 & 11 & 7
\end{bmatrix}.
$$

A matriz $Q$ tem ordem $2\times3$. Nela:

- $q_{12}=8$;
- $q_{23}=7$;
- a primeira linha é $(12,8,5)$;
- a terceira coluna é $(5,7)^T$.

> Uma matriz $2\times3$ não é uma matriz $3\times2$. Trocar linhas por colunas altera a estrutura.

### 2.1. Significado de uma tabela matricial

Suponha que as linhas de $Q$ representem dois setores e as colunas representem três materiais. Então $q_{23}=7$ significa que o segundo setor utiliza sete unidades do terceiro material.

Antes de calcular, registre mentalmente:

$$
\text{linha}=\text{setor},
\qquad
\text{coluna}=\text{material}.
$$

Sem essa leitura, é fácil somar dados que representam grandezas diferentes.

## 3. Formas frequentes

### 3.1. Matriz linha e matriz coluna

Uma matriz com uma única linha é uma matriz linha:

$$
L=\begin{bmatrix}3&5&2\end{bmatrix}_{1\times3}.
$$

Uma matriz com uma única coluna é uma matriz coluna:

$$
C=\begin{bmatrix}3\\5\\2\end{bmatrix}_{3\times1}.
$$

### 3.2. Matriz quadrada e diagonais

Uma matriz é quadrada quando possui o mesmo número de linhas e colunas. Em uma matriz $n\times n$, a diagonal principal contém os elementos $a_{11},a_{22},\ldots,a_{nn}$.

Na matriz

$$
A=\begin{bmatrix}
2&4&1\\
0&3&5\\
7&6&9
\end{bmatrix},
$$

a diagonal principal é formada por $2$, $3$ e $9$.

A diagonal secundária de uma matriz $3\times3$ é formada, nesse exemplo, por $1$, $3$ e $7$.

### 3.3. Matriz nula, diagonal e identidade

- **Matriz nula:** todos os elementos são zero.
- **Matriz diagonal:** é quadrada e todos os elementos fora da diagonal principal são zero.
- **Matriz identidade $I_n$:** é diagonal, com $1$ na diagonal principal.

$$
I_3=\begin{bmatrix}
1&0&0\\
0&1&0\\
0&0&1
\end{bmatrix}.
$$

A identidade desempenha no produto matricial papel análogo ao número $1$ na multiplicação comum.

## 4. Igualdade de matrizes

Duas matrizes são iguais se, e somente se:

1. têm a mesma ordem;
2. seus elementos correspondentes são iguais.

Se

$$
\begin{bmatrix}
x&2\\
3&y
\end{bmatrix}
=
\begin{bmatrix}
5&2\\
3&-1
\end{bmatrix},
$$

então $x=5$ e $y=-1$.

Mesmo que duas matrizes possuam os mesmos números, elas não serão iguais se esses números estiverem em posições diferentes.

## 5. Adição e subtração

Só é possível somar ou subtrair matrizes de mesma ordem. A operação ocorre elemento a elemento:

$$
(A+B)_{ij}=a_{ij}+b_{ij},
$$

$$
(A-B)_{ij}=a_{ij}-b_{ij}.
$$

Exemplo:

$$
A=\begin{bmatrix}4&1\\2&3\end{bmatrix},
\qquad
B=\begin{bmatrix}2&5\\1&4\end{bmatrix}.
$$

Logo,

$$
A+B=\begin{bmatrix}6&6\\3&7\end{bmatrix},
$$

$$
A-B=\begin{bmatrix}2&-4\\1&-1\end{bmatrix}.
$$

### 5.1. Interpretação

Se $A$ registra quantidades do primeiro período e $B$ registra quantidades do segundo, ambos com as mesmas linhas, colunas e unidades, então $A+B$ registra o total dos dois períodos.

Se $N$ registra os valores novos e $A$ os antigos, a variação é

$$
N-A.
$$

A ordem da subtração importa: variação nova menos antiga é diferente de antiga menos nova.

## 6. Multiplicação por escalar

Ao multiplicar uma matriz $A$ por um número real $k$, todos os elementos são multiplicados por $k$:

$$
(kA)_{ij}=ka_{ij}.
$$

Se

$$
A=\begin{bmatrix}8&5\\10&7\end{bmatrix},
$$

então

$$
3A=\begin{bmatrix}24&15\\30&21\end{bmatrix}.
$$

Essa operação modela, por exemplo, uma conversão uniforme de unidade ou a repetição integral de um quadro de quantidades.

Um reajuste de $10\%$ corresponde a multiplicar por $1{,}10$, e não por $0{,}10$, quando se deseja o novo valor completo.

## 7. Transposta

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

Uma matriz $m\times n$ torna-se $n\times m$.

Propriedades úteis:

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

Na última propriedade, a ordem dos fatores é invertida.

### 7.1. Matriz simétrica

Uma matriz quadrada é simétrica quando

$$
A^T=A.
$$

Isso exige $a_{ij}=a_{ji}$. Exemplo:

$$
\begin{bmatrix}
2&5\\
5&1
\end{bmatrix}.
$$

## 8. Produto matricial

O produto matricial combina linhas da primeira matriz com colunas da segunda.

Se $A$ tem ordem $m\times n$ e $B$ tem ordem $n\times p$, então $AB$ existe e tem ordem $m\times p$:

$$
A_{m\times n}B_{n\times p}=C_{m\times p}.
$$

As dimensões internas devem coincidir. As dimensões externas formam a ordem do resultado:

$$
\bigl(m\times\cancel{n}\bigr)\bigl(\cancel{n}\times p\bigr)
\longrightarrow m\times p.
$$

Mais precisamente,

$$
c_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}.
$$

### 8.1. Cálculo linha por coluna

Considere

$$
A=\begin{bmatrix}
1&2&3\\
4&5&6
\end{bmatrix},
\qquad
B=\begin{bmatrix}
1&0\\
2&1\\
0&3
\end{bmatrix}.
$$

O produto $AB$ tem ordem $2\times2$. Seus elementos são:

$$
c_{11}=1\cdot1+2\cdot2+3\cdot0=5,
$$

$$
c_{12}=1\cdot0+2\cdot1+3\cdot3=11,
$$

$$
c_{21}=4\cdot1+5\cdot2+6\cdot0=14,
$$

$$
c_{22}=4\cdot0+5\cdot1+6\cdot3=23.
$$

Portanto,

$$
AB=\begin{bmatrix}5&11\\14&23\end{bmatrix}.
$$

> Produto matricial não é multiplicação posição a posição. Cada entrada resulta de uma linha inteira combinada com uma coluna inteira.

### 8.2. O produto geralmente não é comutativo

Mesmo quando $AB$ e $BA$ existem, em geral,

$$
AB\ne BA.
$$

Além disso, a existência de $AB$ não garante a existência de $BA$.

Exemplo de ordens:

$$
A_{2\times3}B_{3\times4}
$$

existe e resulta em uma matriz $2\times4$. Já $BA$ exigiria que $4=2$, o que não ocorre; portanto, $BA$ não existe.

### 8.3. Propriedades válidas

Quando as ordens permitem as operações:

$$
A(BC)=(AB)C,
$$

$$
A(B+C)=AB+AC,
$$

$$
(A+B)C=AC+BC.
$$

A propriedade comutativa não integra essa lista.

## 9. Identidade e potências

Para uma matriz $A$ de ordem $m\times n$:

$$
I_mA=A,
\qquad
AI_n=A.
$$

As identidades dos dois lados podem ter ordens diferentes quando $A$ não é quadrada.

Potências como $A^2=AA$ e $A^3=AAA$ exigem que $A$ seja quadrada. Para expoentes positivos,

$$
A^rA^s=A^{r+s}.
$$

Se

$$
D=\begin{bmatrix}2&0\\0&3\end{bmatrix},
$$

então

$$
D^2=\begin{bmatrix}4&0\\0&9\end{bmatrix}.
$$

Uma matriz idempotente satisfaz $A^2=A$. Esse comportamento pode aparecer em um problema de padrão, mas deve ser verificado pelo produto, não presumido.

## 10. Modelagem de totais ponderados

Suponha que a matriz de quantidades de três materiais em dois setores seja

$$
Q=\begin{bmatrix}
4&2&3\\
1&5&2
\end{bmatrix},
$$

e que os preços unitários sejam

$$
p=\begin{bmatrix}10\\6\\4\end{bmatrix}.
$$

O produto

$$
Qp
$$

tem ordem $2\times1$ e fornece o custo total de cada setor:

$$
Qp=
\begin{bmatrix}
4\cdot10+2\cdot6+3\cdot4\\
1\cdot10+5\cdot6+2\cdot4
\end{bmatrix}
=
\begin{bmatrix}64\\48\end{bmatrix}.
$$

A compatibilidade das unidades confirma a modelagem:

$$
(\text{unidades de material})
\times
(\text{reais por unidade})
=
(\text{reais}).
$$

## 11. Composição de etapas

O produto também representa operações sucessivas.

Se $B$ transforma dados de uma etapa inicial em dados intermediários e $A$ transforma os dados intermediários em resultados finais, então a transformação conjunta é

$$
AB.
$$

O fator mais à direita atua primeiro. Trocar para $BA$ muda a ordem das etapas e, muitas vezes, torna o produto impossível.

Exemplo: uma matriz $R_{2\times3}$ distribui três tipos de recurso entre dois programas. Uma matriz $P_{3\times4}$ detalha cada tipo de recurso em quatro categorias. A composição

$$
RP
$$

tem ordem $2\times4$ e descreve as quatro categorias por programa.

## 12. Matrizes de relações e padrões

Uma matriz binária usa apenas $0$ e $1$. Ela pode representar a existência de uma relação:

$$
r_{ij}=
\begin{cases}
1, & \text{se o elemento }i\text{ se relaciona com }j;\\
0, & \text{caso contrário.}
\end{cases}
$$

Se a relação for recíproca, a matriz será simétrica. Se for direcionada, não há razão para exigir $r_{ij}=r_{ji}$.

Em questões de padrão matricial:

1. verifique primeiro relações internas em cada linha;
2. compare as colunas;
3. examine diagonais;
4. teste uma regra em mais de uma posição;
5. rejeite regras que explicam apenas parte do quadro.

Não existe uma operação universal para completar matrizes numéricas. A regra deve ser inferida dos dados do enunciado.

## 13. Roteiro para resolver problemas

### Passo 1: rotule linhas e colunas

Anote o que cada eixo representa. Isso evita transpor mentalmente os dados.

### Passo 2: confira as ordens

- soma e subtração: ordens iguais;
- produto $AB$: colunas de $A$ iguais às linhas de $B$;
- potência: matriz quadrada;
- igualdade: mesma ordem e elementos correspondentes iguais.

### Passo 3: antecipe a ordem do resultado

Antes de multiplicar,

$$
(m\times n)(n\times p)\to m\times p.
$$

Se o resultado calculado tiver outra ordem, houve erro estrutural.

### Passo 4: calcule com rótulos

No produto, combine uma linha da esquerda com uma coluna da direita. No problema aplicado, acompanhe também as unidades.

### Passo 5: interprete o resultado

Um número isolado não encerra a solução. Diga a que linha e coluna ele pertence e qual grandeza representa.

## 14. Erros recorrentes de prova

### 14.1. Inverter os índices

$a_{23}$ está na segunda linha e terceira coluna, não na terceira linha e segunda coluna.

### 14.2. Somar matrizes de ordens diferentes

Ter o mesmo número total de elementos não basta. Uma matriz $2\times3$ não pode ser somada a uma $3\times2$.

### 14.3. Multiplicar elemento a elemento

O produto matricial usa linha por coluna. A multiplicação posição a posição é outra operação e não substitui $AB$.

### 14.4. Verificar apenas se as matrizes têm a mesma ordem

Matrizes de mesma ordem sempre podem ser somadas, mas nem sempre podem ser multiplicadas. Uma matriz $2\times3$ não pode multiplicar outra $2\times3$ pelo produto matricial usual.

### 14.5. Supor $AB=BA$

A ordem dos fatores carrega significado e altera o resultado.

### 14.6. Transpor um produto sem inverter os fatores

A fórmula correta é

$$
(AB)^T=B^TA^T.
$$

### 14.7. Usar identidade de ordem inadequada

Para $A_{m\times n}$, a identidade à esquerda é $I_m$; à direita, $I_n$.

### 14.8. Ampliar o edital

Problemas matriciais elementares não exigem automaticamente determinantes, inversas ou sistemas lineares. Esses tópicos só devem ser estudados como parte deste recorte se uma retificação ou orientação oficial os incluir.

## 15. Síntese

Para dominar problemas matriciais:

- leia linhas, colunas e unidades antes de calcular;
- interprete corretamente $a_{ij}$;
- exija mesma ordem para soma, subtração e igualdade;
- aplique escalares a todos os elementos;
- troque linhas por colunas na transposta;
- confira dimensões internas no produto;
- calcule cada entrada por linha vezes coluna;
- preserve a ordem dos fatores;
- use a identidade como elemento neutro;
- restrinja potências a matrizes quadradas;
- interprete produtos como totais ponderados ou composição de etapas.

## Referências

- CEBRASPE. [Edital nº 1 do concurso TCE/MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Item 14.2.3, Raciocínio Lógico, item 7; publicado em 6 jul. 2026. Consultado em 18 jul. 2026.
- INSTITUTO FEDERAL DE SANTA CATARINA. [Álgebra Linear: Matrizes](https://docente.ifsc.edu.br/grazielli.vassoler/al_2017_1/Matrizes_Apostila_alunos.pdf). Definições, índices, igualdade, operações, produto, transposta e identidade. Consultado em 18 jul. 2026.
- INSTITUTO DE MATEMÁTICA E ESTATÍSTICA DA UNIVERSIDADE DE SÃO PAULO. [Sistemas Lineares e Matrizes](https://www.ime.usp.br/~lymber/teaching/3457-sislin_mat/sect0001.html). Organização conceitual das operações matriciais e de suas extensões. Consultado em 18 jul. 2026.
- CEBRASPE. [Edital nº 1 do concurso CGM Porto Velho 2026](https://cdn.cebraspe.org.br/concursos/CGM_PORTO_VELHO_RO_26/arquivos/077D09FB6DBAD0094243EF612506FF0B93821C913C069BFB5F9A839E5DB7B5B0.html). Referência comparativa em que matrizes, determinantes e sistemas lineares são nomeados separadamente. Consultado em 18 jul. 2026.
