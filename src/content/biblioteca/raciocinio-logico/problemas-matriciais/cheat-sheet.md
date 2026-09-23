# Problemas matriciais

**A pergunta decide a operação.** Rotule o que representam linhas, colunas, entradas e unidades. Depois identifique se há apenas um quadro com padrão/condições ou se o enunciado pede uma operação matricial. Uma matriz de ordem $m\times n$ tem $m$ linhas e $n$ colunas; $a_{ij}$ fica na linha $i$, coluna $j$.

## 1. Entradas dadas por índice ou por restrições

| Forma de fornecer o quadro | Decisão rápida |
|---|---|
| $a_{ij}=f(i,j)$ | substitua **linha** em $i$ e **coluna** em $j$; confira os limites $1\le i\le m$, $1\le j\le n$ |
| regra por casos | antes de calcular, escolha o ramo $i<j$, $i=j$ ou $i>j$; em matriz retangular, nem toda linha tem posição na diagonal $i=j$ |
| contar entradas com certa propriedade | conte pares $(i,j)$ que a satisfazem, linha por linha ou coluna por coluna; limite a contagem aos índices existentes |
| somas de linhas e colunas, valores distintos | use todas as somas e a condição de que os valores são distintos **simultaneamente**; não fixe uma posição por uma soma isolada |
| completar padrão | confronte linhas, colunas e, se houver motivo, diagonais; confirme a mesma regra em mais de uma posição |

A **diagonal principal** tem índices $i=j$ em matrizes quadradas. Em quadros retangulares, a condição $i=j$ só alcança as posições existentes. A disposição visual, sozinha, não determina uma regra única para padrões.

## 2. Escolha o mecanismo pela forma da resposta

| Operação | Quando existe | Como interpretar |
|---|---|---|
| igualdade $A=B$ | mesma ordem **e** entradas correspondentes iguais | mesmo número total de elementos não basta |
| soma/subtração $A\pm B$ | mesma ordem | posição a posição; variação é **novo menos antigo** |
| escalar $kA$ | qualquer ordem | um número $k$ multiplica **todas** as entradas; aumento de 10% dá $1{,}10A$, não $0{,}10A$ |
| transposta $A^T$ | sempre | troca eixos: $(A^T)_{ij}=a_{ji}$ e $m\times n\to n\times m$ |
| produto $AB$ | $A_{m\times n}$ e $B_{n\times p}$ | resultado $m\times p$; cada entrada combina linha de $A$ com coluna de $B$ |

**No produto**, a entrada $(i,j)$ é $\sum_{k=1}^{n}a_{ik}b_{kj}$: multiplique pares da linha pela coluna e **some**. Não é produto posição a posição. Mesmo quando $AB$ existe, $BA$ pode não existir; quando ambos existem, em geral $AB\ne BA$.

Uma matriz de quantidades por setor $Q_{m\times n}$ vezes um vetor coluna de preços $p_{n\times1}$ (uma matriz com uma coluna) fornece $m$ totais, um por setor. Confira a unidade: quantidade $\times$ preço por unidade $=$ valor. Em etapas sucessivas aplicadas a um vetor, $ABx=A(Bx)$: o fator à **direita age primeiro**.

## 3. Casos curtos e conferência

A identidade $I_n$ tem 1 na diagonal principal e 0 fora dela. Para $A_{m\times n}$, $I_mA=A$ e $AI_n=A$: a ordem da identidade depende do lado. A potência $A^2=AA$ requer matriz quadrada.

Antes de responder: li $a_{23}$ como segunda linha, terceira coluna? Escolhi o ramo correto da definição? Usei todas as restrições de linhas, colunas e elementos? Conferi a ordem da operação e a unidade do resultado? Determinante, inversa e escalonamento não integram este mapa de decisões da aula.
