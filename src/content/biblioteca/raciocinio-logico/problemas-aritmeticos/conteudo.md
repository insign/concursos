---
schemaVersion: 1
title: Problemas aritméticos
description: Modelagem e resolução de problemas com razões, proporções, porcentagens, médias, equações, taxas, misturas, juros, sequências e unidades.
order: 43
storageId: problemas-aritmeticos
---

## 1. O problema vem antes da conta

Em problemas aritméticos, a dificuldade principal raramente é executar uma soma, uma divisão ou uma regra de três. O ponto decisivo é **traduzir o texto para uma relação numérica correta**.

Considere este cenário hipotético:

> Uma equipe processa 480 documentos em 6 horas com 4 servidores, todos com a mesma produtividade. Quantos documentos 10 servidores processariam em 3 horas, mantidas as mesmas condições?

Antes de calcular, identifique o mecanismo: há uma **quantidade produzida**, uma **taxa de produção**, um **número de agentes** e um **tempo**. A produção por servidor e por hora é

$$
\frac{480}{4\cdot6}=20.
$$

Logo,

$$
20\cdot10\cdot3=600.
$$

A mesma postura resolve grande parte deste assunto: descubra **qual grandeza varia, qual base está sendo usada e qual relação permanece válida**.

Um roteiro eficiente é:

1. escreva o que foi dado e o que se pede;
2. associe uma unidade a cada grandeza;
3. identifique a base de comparação: total inicial, restante, distância, tempo, quantidade de trabalho etc.;
4. escolha a relação que traduz o texto;
5. só então faça as contas;
6. ao final, confira unidade, sinal, ordem de grandeza e restrições do contexto.

O recorte do edital é **raciocínio lógico envolvendo problemas aritméticos**. Por isso, entram aqui frações, razões, proporções, porcentagens, médias, equações, taxas, misturas, conversões, restos e padrões quando funcionam como ferramentas de modelagem. Se a essência do item for área, perímetro, ângulo ou volume, o aprofundamento está em Problemas geométricos; se depender de operações estruturadas com matrizes, está em Problemas matriciais.

## 2. A primeira pergunta: “fração ou percentual de quê?”

Muitos erros acontecem porque a operação está certa, mas a **base** está errada.

### 2.1. Fração de uma quantidade

A expressão “$3/5$ de 350” significa

$$
\frac35\cdot350=210.
$$

Já “$1/4$ do restante” muda a base. Se alguém gasta primeiro $1/3$ de um valor, resta $2/3$. Gastar depois $1/4$ do restante significa gastar

$$
\frac14\cdot\frac23=\frac16
$$

do valor inicial. Portanto, após os dois gastos, resta

$$
1-\frac13-\frac16=\frac12.
$$

A ideia que deve ficar é simples: **cada fração atua sobre a quantidade indicada pelo enunciado naquele momento**.

### 2.2. Múltiplos, divisores e restos

Problemas de repetição periódica costumam pedir quando dois ciclos voltarão a coincidir. Nessa situação, procure o primeiro múltiplo comum dos períodos; é o papel do <abbr title="mínimo múltiplo comum">MMC</abbr>.

Problemas de agrupamento máximo em lotes iguais, sem sobra, apontam para o maior divisor comum; é o papel do <abbr title="máximo divisor comum">MDC</abbr>.

Para restos, use a divisão euclidiana:

$$
n=dq+r,\qquad 0\le r<d.
$$

Assim, dizer que um número deixa resto 3 na divisão por 7 significa que ele pode ser escrito como

$$
7q+3.
$$

Esse modelo evita testar alternativas sem critério e ajuda a reconhecer padrões de restos.

## 3. Razão e proporção: compare grandezas antes de montar a regra de três

Uma **razão** compara duas grandezas por quociente. Se há $a$ unidades de uma grandeza para $b$ de outra, a razão é

$$
\frac ab.
$$

Uma **proporção** afirma que duas razões são iguais:

$$
\frac ab=\frac cd
\iff ad=bc,
$$

com denominadores não nulos.

A regra de três não cria essa relação: ela apenas organiza uma proporcionalidade que já precisa existir.

### 3.1. Proporcionalidade direta

Se dobrar $x$ dobra $y$, triplicar $x$ triplica $y$ e a razão $y/x$ permanece constante, então

$$
y=kx.
$$

No cenário inicial, mantidas produtividade e tempo, dobrar o número de servidores dobra a produção.

### 3.2. Proporcionalidade inversa

Se o produto de duas grandezas permanece constante,

$$
xy=k,
$$

elas são inversamente proporcionais.

Exemplo: para uma quantidade fixa de trabalho, se a produtividade aumenta 25%, o tempo não diminui 25%. A nova produtividade é multiplicada por $1{,}25$; para manter o mesmo trabalho, o tempo deve ser dividido por $1{,}25$.

Se antes eram necessárias 16 horas:

$$
t_{novo}=\frac{16}{1{,}25}=12{,}8\text{ h}.
$$

O simples fato de uma grandeza subir enquanto outra desce **não basta** para concluir proporcionalidade inversa. É preciso que o produto relevante permaneça constante nas condições do problema.

### 3.3. Taxa unitária: uma alternativa robusta

Quando várias grandezas aparecem ao mesmo tempo, calcule quanto corresponde a **uma unidade da base**.

No cenário inicial:

$$
\frac{480}{4\cdot6}=20
$$

documentos por servidor-hora. Depois, reconstrua a quantidade pedida.

Esse método costuma ser mais seguro do que decorar posições em uma regra de três composta.

### 3.4. Divisão proporcional

Para dividir um total $T$ diretamente na razão $a:b:c$, pense em “partes de mesmo tamanho”. Há $a+b+c$ partes ao todo. Assim,

$$
x=T\frac{a}{a+b+c},\quad
y=T\frac{b}{a+b+c},\quad
z=T\frac{c}{a+b+c}.
$$

Se a divisão é **inversamente proporcional** a $a$ e $b$, os pesos passam a ser $1/a$ e $1/b$. Por exemplo, ser inversamente proporcional a 2 e 3 equivale a dividir diretamente na razão

$$
\frac12:\frac13=3:2.
$$

## 4. Porcentagem é um fator aplicado a uma base

Porcentagem significa “por cem”:

$$
p\%=\frac p{100}.
$$

A maneira mais econômica de trabalhar é transformar a variação em um **fator multiplicativo**.

Aumento de $p\%$:

$$
V_f=V_0\left(1+\frac p{100}\right).
$$

Desconto de $p\%$:

$$
V_f=V_0\left(1-\frac p{100}\right).
$$

Se um valor de R$ 240 corresponde a 80% do valor original, não se deve “devolver 20%” calculando 20% de 240. O número 240 já é uma nova base. A relação correta é

$$
0{,}8V_0=240
\quad\Longrightarrow\quad
V_0=\frac{240}{0{,}8}=300.
$$

### 4.1. Variações sucessivas

Cada percentual atua sobre o valor que existe naquele momento. Portanto, variações sucessivas multiplicam fatores:

$$
V_f=V_0f_1f_2\cdots.
$$

Aumentar 20% e depois reduzir 20% produz

$$
1{,}2\cdot0{,}8=0{,}96,
$$

isto é, redução líquida de 4%.

A simetria aparente dos percentuais engana porque as bases são diferentes.

### 4.2. Percentual relativo e ponto percentual

Se uma taxa passa de 40% para 50%, a diferença é **10 pontos percentuais**. O aumento relativo, porém, compara a diferença com a taxa inicial:

$$
\frac{50-40}{40}=25\%.
$$

São duas perguntas diferentes:

- “quantos pontos a taxa ganhou?” → 10 pontos percentuais;
- “quanto ela cresceu em relação ao valor inicial?” → 25%.

## 5. Médias: reconstrua a soma antes de combinar grupos

A média aritmética simples de $n$ valores é

$$
\bar x=\frac{\sum x_i}{n}.
$$

Daí vem uma ferramenta importante:

$$
\text{soma}=\text{média}\cdot\text{quantidade de valores}.
$$

Se 20 pessoas têm média 70, a soma do grupo é 1.400. Se outras 30 têm média 80, a soma é 2.400. Juntando os grupos:

$$
\frac{1400+2400}{20+30}=76.
$$

Fazer $(70+80)/2$ daria peso igual a grupos de tamanhos diferentes.

A média ponderada formaliza essa ideia:

$$
\bar x_p=\frac{\sum w_ix_i}{\sum w_i}.
$$

Os pesos representam quanto cada valor contribui para o total: quantidade de pessoas, massa, volume, número de itens ou outra grandeza pertinente.

### 5.1. Velocidade média não é média automática das velocidades

Velocidade média é sempre

$$
v_m=\frac{d_{total}}{t_{total}}.
$$

Se duas distâncias iguais são percorridas a velocidades $v_1$ e $v_2$, os tempos de cada trecho são diferentes. A expressão resultante é

$$
v_m=\frac{2v_1v_2}{v_1+v_2}.
$$

A fórmula não deve ser decorada sem a origem: ela aparece porque **as distâncias são iguais**, e não porque existam simplesmente duas velocidades.

## 6. Equações: dê nome ao que o texto não informa

Quando o enunciado descreve relações simultâneas, defina uma incógnita e traduza cada frase.

> O triplo de um número, somado a 7, é 40.

Se o número é $x$:

$$
3x+7=40.
$$

O objetivo não é “achar uma equação que funcione”, mas fazer cada termo representar uma afirmação do problema.

### 6.1. Soma e diferença

Se dois números somam $S$ e o maior excede o menor em $D$:

$$
x+y=S,
\qquad
x-y=D.
$$

Somando as equações,

$$
x=\frac{S+D}{2},
\qquad
y=\frac{S-D}{2}.
$$

### 6.2. Inteiros consecutivos

Três inteiros consecutivos podem ser escritos como

$$
x-1,\quad x,\quad x+1.
$$

Essa representação mantém automaticamente a distância de uma unidade entre eles.

### 6.3. Problemas de idade

Se hoje uma pessoa tem $x$ anos, daqui a $t$ anos terá $x+t$; há $t$ anos tinha $x-t$.

O ponto-chave é que todos avançam ou recuam **o mesmo intervalo de tempo**. A diferença entre duas idades permanece constante.

### 6.4. Números formados por algarismos

Se $x$ é o algarismo das dezenas e $y$ o das unidades, o número é

$$
10x+y.
$$

O número com os algarismos invertidos é

$$
10y+x.
$$

Essa tradução transforma frases sobre soma de algarismos, inversão e diferença entre números em equações comuns.

## 7. Taxas: quantidade = taxa × tempo

Produção, trabalho, vazão e movimento parecem temas diferentes, mas compartilham a mesma estrutura:

$$
\text{quantidade}=\text{taxa}\cdot\text{tempo}.
$$

A taxa diz **quanto da quantidade ocorre por unidade de tempo**. Antes de somar ou comparar taxas, deixe as unidades compatíveis.

### 7.1. Trabalho e produção

Se uma pessoa conclui um serviço inteiro em $t$ dias, sua taxa é

$$
\frac1t
$$

do serviço por dia.

Se duas pessoas trabalham ao mesmo tempo, com taxas constantes e aditivas,

$$
r_{total}=r_1+r_2.
$$

Quem faz sozinho em 6 dias tem taxa $1/6$; quem faz em 3 dias tem taxa $1/3$. Juntos:

$$
\frac16+\frac13=\frac12,
$$

portanto realizam metade do serviço por dia e concluem o total em 2 dias.

Mais trabalhadores só implicam menos tempo quando a quantidade de trabalho é fixa e as condições de produtividade e jornada são comparáveis.

### 7.2. Vazão

Vazão é volume por tempo:

$$
Q=\frac Vt.
$$

Entradas aumentam o volume; saídas diminuem. Se entram 100 litros por minuto e saem 25, a vazão líquida é

$$
100-25=75\text{ L/min}.
$$

É essa taxa líquida que determina a variação do reservatório.

### 7.3. Movimento uniforme

No movimento com velocidade constante,

$$
d=vt.
$$

Se dois móveis se aproximam em sentidos opostos, a distância entre eles diminui à soma das velocidades. Se um persegue o outro no mesmo sentido, a distância diminui à diferença das velocidades.

O que se soma ou subtrai não é uma regra verbal isolada: é a **taxa com que a distância relativa muda**.

## 8. Misturas: acompanhe a quantidade que precisa ser conservada

Em problemas de mistura, primeiro pergunte: **qual substância ou valor estou rastreando?**

Se uma solução de volume $V$ tem concentração decimal $c$, a quantidade de soluto é

$$
S=cV.
$$

Por exemplo, 20 litros a 30% contêm

$$
0{,}30\cdot20=6
$$

litros de soluto.

Se forem adicionados 10 litros de água, a quantidade de soluto continua 6, mas o volume total passa a 30 litros. Logo,

$$
c_f=\frac6{30}=20\%.
$$

Ao misturar duas soluções, admitindo volumes aditivos,

$$
c_f=\frac{c_1V_1+c_2V_2}{V_1+V_2}.
$$

A mesma lógica aparece em custo médio: some o custo total de cada parcela e divida pela quantidade total. Em ambos os casos, trata-se de média ponderada construída a partir das quantidades efetivas.

Se é adicionado **soluto puro**, tanto o numerador quanto o volume total aumentam. Se é adicionada **água**, o soluto fica constante e apenas o total aumenta.

## 9. Unidades: a equação só faz sentido se as grandezas forem compatíveis

Antes de calcular, converta grandezas para unidades compatíveis.

| Grandeza | Relação |
|---|---|
| tempo | $1\text{ h}=60\text{ min}=3600\text{ s}$ |
| comprimento | $1\text{ km}=1000\text{ m}$ |
| massa | $1\text{ kg}=1000\text{ g}$ |
| capacidade | $1\text{ L}=1000\text{ mL}$ |
| velocidade | $1\text{ m/s}=3{,}6\text{ km/h}$ |

Para converter 90 km/h em m/s:

$$
\frac{90}{3{,}6}=25\text{ m/s}.
$$

O tempo também exige atenção. Quinze minutos são

$$
\frac{15}{60}=0{,}25\text{ h}.
$$

Logo,

$$
2\text{ h }15\text{ min}=2{,}25\text{ h},
$$

e não 2,15 h.

## 10. Padrões numéricos: procure a regra mais simples que o enunciado sustenta

Uma sequência de poucos termos pode admitir várias continuações matematicamente possíveis. Em prova, procure a regra compatível com os dados e com a forma da pergunta.

Uma ordem útil de inspeção é:

1. diferenças entre termos consecutivos;
2. razões entre termos consecutivos;
3. alternância de duas regras;
4. relação entre o termo e sua posição;
5. recorrência explicitamente indicada.

Na sequência

$$
2,5,10,17,\ldots
$$

as diferenças são $3,5,7,\ldots$, o que sugere diferenças ímpares sucessivas. Se o enunciado ainda informa que o termo de posição $n$ é $n^2+1$, a regra deixa de ser apenas uma hipótese e passa a estar determinada.

Não force uma progressão aritmética ou geométrica quando o padrão não a sustenta.

## 11. Juros como aplicação de porcentagem e base

Neste recorte, juros interessam sobretudo como problema de **percentual aplicado ao capital correto**.

Em juros simples, os juros de cada período incidem sobre o capital inicial; o crescimento é linear no número de períodos. Em juros compostos, cada período aplica um novo fator ao montante já acumulado.

Em compras parceladas, cuidado para não usar automaticamente o preço total como capital financiado. Se uma parte é paga no ato, o capital efetivamente financiado é o saldo que deixou de ser pago naquele momento.

Exemplo hipotético: um bem custa R$ 1.000 à vista. O comprador paga R$ 600 no ato e R$ 440 um mês depois. O saldo financiado foi R$ 400; os juros cobrados foram R$ 40. Portanto, a taxa mensal foi

$$
\frac{40}{400}=10\%.
$$

O mesmo princípio das porcentagens reaparece: **identifique a base antes de calcular a taxa**.

## 12. Como reconhecer a estrutura em prova

Quando o enunciado parecer longo, procure sinais do mecanismo matemático:

| Pista no texto | Pergunta que organiza o raciocínio |
|---|---|
| “do restante”, “do novo valor” | qual é a base agora? |
| “na razão”, “proporcionalmente” | direta ou inversa? quais são os pesos? |
| “aumentou/descontou x%” | qual fator multiplica a base? |
| médias de grupos | quais são as somas e os tamanhos dos grupos? |
| “juntos”, “por hora”, “por dia” | quais são as taxas e suas unidades? |
| entrada e saída simultâneas | qual é a taxa líquida? |
| mistura/concentração | qual quantidade é conservada? |
| algarismos invertidos | como escrever o número pelas posições decimais? |
| ciclos que voltam a coincidir | qual é o primeiro múltiplo comum? |
| divisão com resto | como escrever $n=dq+r$? |

Antes de marcar a alternativa, faça quatro conferências finais:

1. **Pergunta:** respondi exatamente à grandeza pedida?
2. **Base:** fração, percentual ou taxa incidiu sobre a quantidade correta?
3. **Unidade:** as grandezas estavam compatíveis durante a conta?
4. **Contexto:** a solução respeita as restrições do enunciado, como positividade, integralidade ou limites físicos?

Uma resposta numericamente obtida, mas incompatível com essas quatro verificações, ainda não é uma solução do problema.