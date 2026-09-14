---
schemaVersion: 1
title: "Problemas aritméticos, geométricos e matriciais"
description: "Modelagem e resolução de problemas com relações aritméticas, geometria e matrizes."
order: 42
storageId: pc-u042
---

# Problemas aritméticos, geométricos e matriciais

## 1. Antes da conta: qual relação governa o enunciado?

Três problemas podem usar os mesmos números e exigir raciocínios completamente diferentes.

- **Aritmético:** “Uma equipe conclui `3/5` de uma tarefa e faltam 48 itens.” A pergunta central é **qual relação entre parte e todo** transforma o texto em uma equação?
- **Geométrico:** “Uma faixa de largura uniforme contorna uma área retangular.” A pergunta central é **qual grandeza geométrica mudou**: comprimento, perímetro, área ou volume?
- **Matricial:** “Uma tabela registra quantidades por linha e custos por coluna.” A pergunta central é **como os índices e as operações organizam as combinações**?

Em prova, o ganho de velocidade vem de reconhecer o **modelo** antes de calcular.

Use sempre este ciclo:

1. **nomeie a incógnita** e a unidade;
2. **traduza cada frase em relação matemática**;
3. **represente** a relação por fração, proporção, equação, desenho ou matriz;
4. **calcule só depois**;
5. **volte ao enunciado** e confira unidade, ordem de grandeza e restrições.

Um resultado numericamente correto pode responder à pergunta errada. A checagem final faz parte da resolução.

---

## 2. Problemas aritméticos: transformar texto em relação

### 2.1 Frações: parte, todo e o que ainda falta

Se uma quantidade total é \(T\) e a parte conhecida é a fração \(f\), então:

\[
\text{parte}=fT.
\]

Se o enunciado informa o que **restou**, escreva a fração complementar.

**Exemplo hipotético:** foram concluídos `3/5` de uma tarefa e restam 48 itens.

A parte restante é `2/5`:

\[
\frac{2}{5}T=48 \Rightarrow T=120.
\]

A pegadinha é usar `3/5` sobre os 48. Os 48 representam o que **falta**, não o que já foi feito.

Quando aparecem vários denominadores, o <abbr title="mínimo múltiplo comum">MMC</abbr> ajuda a colocá-los em uma base comum. Em problemas de repetição periódica, o <abbr title="mínimo múltiplo comum">MMC</abbr> também identifica o primeiro instante em que ciclos inteiros voltam a coincidir.

O <abbr title="máximo divisor comum">MDC</abbr>, por outro lado, aparece quando se quer dividir quantidades em **maiores blocos iguais**, sem sobra.

### 2.2 Razão, proporção e divisão proporcional

A razão entre \(a\) e \(b\), com \(b\neq0\), é:

\[
\frac{a}{b}.
\]

Se homens e mulheres estão na razão `3:5`, isso não significa 3 homens e 5 mulheres necessariamente. Significa que as quantidades podem ser escritas como:

\[
3k \quad\text{e}\quad 5k.
\]

Se o total é 64:

\[
3k+5k=64 \Rightarrow k=8.
\]

Logo, as quantidades são 24 e 40.

Em uma **proporção**, duas razões são iguais:

\[
\frac{a}{b}=\frac{c}{d}.
\]

Antes de multiplicar em cruz, pergunte o que varia.

- **Diretamente proporcional:** uma grandeza aumenta e a outra também aumenta na mesma razão.
- **Inversamente proporcional:** uma aumenta enquanto a outra diminui de modo que o produto relevante permaneça constante.

**Exemplo hipotético:** 6 pessoas executam uma tarefa em 10 dias, mantendo produtividade igual. Com 12 pessoas, o tempo cai para 5 dias:

\[
6\cdot10=12\cdot t.
\]

Em divisão proporcional, o total é repartido segundo pesos. Se 600 deve ser dividido na razão `2:3:5`, some os pesos:

\[
2+3+5=10.
\]

Cada parte corresponde a 60; as parcelas são 120, 180 e 300.

### 2.3 Porcentagem: sempre identifique a base

Porcentagem é uma razão de base 100:

\[
p\%=\frac{p}{100}.
\]

Se \(V\) recebe aumento de \(p\%\):

\[
V_{\text{novo}}=V\left(1+\frac{p}{100}\right).
\]

Se recebe desconto:

\[
V_{\text{novo}}=V\left(1-\frac{p}{100}\right).
\]

A base pode mudar entre etapas. Por isso, percentuais sucessivos **não se somam em geral**.

**Exemplo hipotético:** aumento de 20% e depois desconto de 20%:

\[
1{,}20 \cdot 0{,}80=0{,}96.
\]

O valor final fica 4% abaixo do inicial.

Não confunda **porcentagem** com **ponto percentual**. Se uma taxa passa de 20% para 25%, a variação é de 5 pontos percentuais; a variação relativa é de 25%.

### 2.4 Médias: some o que a média representa

Para \(n\) valores:

\[
\bar{x}=\frac{x_1+\cdots+x_n}{n}.
\]

O erro mais comum é fazer “média das médias” sem considerar quantidades diferentes.

Se um grupo de 20 pessoas tem média 70 e outro de 30 tem média 80:

\[
\bar{x}=\frac{20\cdot70+30\cdot80}{50}=76.
\]

A ideia geral é reconstruir a **soma ponderada** antes de dividir.

### 2.5 Equações: idade, consecutivos, dígitos e relações

Problemas verbais ficam mais fáceis quando cada frase vira uma equação.

**Exemplo hipotético:** “Ana tem 4 anos a mais que Bia”:

\[
A=B+4.
\]

“Daqui a 6 anos” não altera a diferença:

\[
A+6=(B+4)+6.
\]

Para inteiros consecutivos, escolha:

\[
x,\;x+1,\;x+2.
\]

Para um número de dois algarismos, com dezena \(a\) e unidade \(b\):

\[
10a+b.
\]

A ordem invertida é:

\[
10b+a.
\]

Essas traduções impedem que a conta fique solta do texto.

### 2.6 Taxas: trabalho, movimento, vazão e mistura

Taxa é “quantidade por unidade de outra grandeza”.

No movimento uniforme:

\[
d=vt.
\]

Se duas partes do percurso têm velocidades diferentes, a velocidade média é:

\[
v_{\text{média}}=\frac{\text{distância total}}{\text{tempo total}},
\]

e não, em geral, a média simples das velocidades.

Em trabalho ou vazão, some **taxas**, não tempos.

Se uma máquina faz `1/6` do serviço por hora e outra faz `1/4`:

\[
\frac16+\frac14=\frac5{12}
\]

do serviço por hora.

O tempo conjunto é:

\[
\frac{1}{5/12}=\frac{12}{5}\text{ h}.
\]

Em mistura, conserve a quantidade do componente relevante.

Se \(x\) litros de solução a 20% são misturados com \(y\) litros a 50%, a quantidade do componente é:

\[
0{,}20x+0{,}50y.
\]

A concentração final vem dessa quantidade dividida pelo volume total.

### 2.7 Unidades: converta antes de comparar

A conta só faz sentido quando as grandezas usam unidades compatíveis.

Algumas relações úteis:

- `1 km = 1000 m`;
- `1 m = 100 cm`;
- `1 m² = 10 000 cm²`;
- `1 m³ = 1000 L`;
- `1 L = 1000 mL`;
- `1 m/s = 3,6 km/h`.

Atenção: ao converter comprimento por fator 100, a **área** muda pelo quadrado do fator e o **volume** pelo cubo.

---

## 3. Problemas geométricos: primeiro identifique a grandeza

A geometria costuma punir quem escolhe a fórmula antes de entender o que se pede.

Pergunte:

- mede **contorno**? → perímetro ou comprimento;
- mede **superfície**? → área;
- mede **espaço ocupado**? → volume;
- mede **abertura**? → ângulo.

### 3.1 Perímetro não é área

Retângulo de lados \(a\) e \(b\):

\[
P=2(a+b), \qquad A=ab.
\]

Quadrado de lado \(l\):

\[
P=4l, \qquad A=l^2.
\]

Se o lado dobra, o perímetro dobra, mas a área quadruplica.

Essa diferença explica por que escalas lineares e escalas de área não usam o mesmo fator.

### 3.2 Ângulos e triângulos

Em qualquer triângulo, a soma dos ângulos internos é \(180^\circ\).

Num triângulo retângulo, com catetos \(a,b\) e hipotenusa \(c\):

\[
c^2=a^2+b^2.
\]

Antes de usar Pitágoras, confirme que existe ângulo reto e que \(c\) é o lado oposto a ele.

A desigualdade triangular também serve como filtro:

\[
|a-b|<c<a+b.
\]

Se os comprimentos propostos violam essa relação, o triângulo não existe.

### 3.3 Semelhança, Teorema de Tales e escala

Figuras semelhantes têm ângulos correspondentes iguais e lados correspondentes proporcionais.

Se o fator linear é \(k\):

- comprimentos multiplicam por \(k\);
- áreas multiplicam por \(k^2\);
- volumes, quando se trata de sólidos semelhantes, multiplicam por \(k^3\).

O Teorema de Tales é uma forma de reconhecer proporcionalidade criada por paralelas.

Em mapas, escala `1:n` significa:

\[
\frac{\text{medida no mapa}}{\text{medida real}}=\frac1n
\]

na mesma unidade.

**Pegadinha:** se um mapa muda de escala linear, a área representada muda pelo **quadrado** da razão entre as escalas lineares.

### 3.4 Áreas essenciais

Triângulo:

\[
A=\frac{bh}{2}.
\]

Paralelogramo:

\[
A=bh.
\]

Trapézio:

\[
A=\frac{(B+b)h}{2}.
\]

Losango, pelas diagonais \(D\) e \(d\):

\[
A=\frac{Dd}{2}.
\]

Não confunda lado inclinado com altura. A altura é a distância perpendicular entre as bases ou entre a base e o vértice, conforme a figura.

Em figuras compostas, decomponha:

\[
A_{\text{total}}=\sum A_{\text{partes}}
\]

ou use área maior menos área retirada.

### 3.5 Circunferência e círculo

Para raio \(r\):

\[
C=2\pi r,
\qquad
A=\pi r^2.
\]

Se o diâmetro é \(d\), então \(r=d/2\).

Comprimento de arco de ângulo central \(\theta\):

\[
L=\frac{\theta}{360^\circ}\cdot2\pi r.
\]

Área de setor:

\[
A_{\text{setor}}=\frac{\theta}{360^\circ}\cdot\pi r^2.
\]

### 3.6 Sólidos, volume e capacidade

Prisma ou paralelepípedo:

\[
V=A_{\text{base}}\cdot h.
\]

Cilindro:

\[
V=\pi r^2h.
\]

Pirâmide:

\[
V=\frac13 A_{\text{base}}h.
\]

Cone:

\[
V=\frac13\pi r^2h.
\]

A capacidade costuma exigir conversão:

\[
1\,m^3=1000\,L.
\]

Se o problema pede material de revestimento, provavelmente a grandeza é **área de superfície**, não volume.

---

## 4. Problemas matriciais: posição primeiro, operação depois

Uma matriz é uma tabela retangular de elementos.

\[
A=(a_{ij})
\]

O índice \(i\) indica a **linha** e \(j\) a **coluna**.

Se \(A\) tem 3 linhas e 4 colunas, sua ordem é:

\[
3\times4.
\]

Assim, \(a_{23}\) é o elemento da linha 2, coluna 3.

### 4.1 Regra de formação

Se:

\[
a_{ij}=2i-j,
\]

então, em uma matriz de ordem \(2\times3\):

\[
A=
\begin{bmatrix}
1 & 0 & -1\\
3 & 2 & 1
\end{bmatrix}.
\]

Calcule cada posição com seus próprios índices. Não transforme \(i\) e \(j\) em valores fixos para toda a matriz.

### 4.2 Igualdade, soma e multiplicação por escalar

Duas matrizes são iguais quando têm a mesma ordem e elementos correspondentes iguais.

Soma e subtração também exigem **mesma ordem**:

\[
(A+B)_{ij}=a_{ij}+b_{ij}.
\]

Para um número \(k\):

\[
(kA)_{ij}=ka_{ij}.
\]

### 4.3 Transposição

A transposta troca linhas por colunas:

\[
(A^T)_{ij}=a_{ji}.
\]

Se \(A\) é \(2\times3\), então \(A^T\) é \(3\times2\).

### 4.4 Produto de matrizes: confira as dimensões

Se \(A\) é \(m\times n\) e \(B\) é \(n\times p\), então \(AB\) existe e tem ordem:

\[
m\times p.
\]

A condição é:

\[
\text{colunas de }A=\text{linhas de }B.
\]

Cada entrada é o produto escalar de uma linha de \(A\) por uma coluna de \(B\):

\[
(AB)_{ij}=\sum_k a_{ik}b_{kj}.
\]

**Exemplo hipotético:**

\[
A=
\begin{bmatrix}
1&2\\
3&4
\end{bmatrix},
\quad
B=
\begin{bmatrix}
5&6\\
7&8
\end{bmatrix}.
\]

A entrada da linha 1, coluna 2 de \(AB\) é:

\[
1\cdot6+2\cdot8=22.
\]

Em geral,

\[
AB\neq BA.
\]

A ordem dos fatores importa tanto para a existência do produto quanto para o resultado.

### 4.5 Matrizes como modelo de problema

Matrizes não servem apenas para “fazer contas”. Elas organizam situações com duas dimensões.

Considere:

- linhas = equipes;
- colunas = tipos de tarefa;
- \(Q\) = quantidades produzidas;
- \(c\) = vetor de custo por tarefa.

O produto \(Qc\) pode representar o custo total de cada equipe.

A pergunta de prova costuma esconder uma destas operações:

- comparar posições → índice;
- combinar tabelas iguais → soma;
- aplicar mesmo fator → multiplicação por escalar;
- trocar perspectiva linha/coluna → transposição;
- agregar combinações linha × coluna → produto matricial.

---

## 5. Como escolher o modelo em menos tempo

### Se o enunciado fala em...

**parte, total, razão, aumento, desconto, média, idade, trabalho, velocidade, mistura**  
→ procure uma relação aritmética.

**comprimento, contorno, área, ângulo, escala, raio, capacidade, sólido**  
→ desenhe e identifique a grandeza geométrica.

**linha, coluna, posição, tabela, índice, combinação entre categorias**  
→ teste uma representação matricial.

### Checagens finais

1. **Unidade:** reais, horas, metros, metros quadrados, litros, índices.
2. **Sinal:** quantidade, idade, comprimento e tempo não podem ficar negativos no contexto usual.
3. **Ordem de grandeza:** desconto de 10% não deve triplicar um preço.
4. **Restrição geométrica:** lado e ângulo devem formar figura possível.
5. **Dimensão matricial:** confirme a ordem antes de multiplicar.
6. **Pergunta final:** o enunciado pediu o total, a parte, a diferença, a área, o volume ou um elemento específico?

O objetivo não é decorar dezenas de fórmulas isoladas. É reconhecer **qual relação conserva o sentido do problema** e só então executar a conta.
