---
schemaVersion: 1
title: "Estatística descritiva e análise exploratória de dados"
description: "Organização e exploração de dados com tabelas, gráficos e medidas de posição, dispersão, assimetria e curtose."
order: 50
storageId: pc-u050
---

# Estatística descritiva e análise exploratória de dados

Um conjunto de dados pode ter milhares de valores. Antes de perguntar por probabilidade, estimar parâmetros ou ajustar modelos, é preciso responder a perguntas mais básicas: **o que os dados mostram, onde se concentram, quanto variam e qual é a forma da distribuição?**

O mapa desta unidade é:

> **dados brutos → organização → visualização → posição → dispersão → forma**

A **estatística descritiva** organiza, resume e apresenta os dados. A **análise exploratória de dados** vai além de produzir um número-resumo: combina tabelas, medidas e, sobretudo, representações gráficas para revelar padrões, assimetrias, valores atípicos e estruturas que poderiam desaparecer em um único resumo numérico.

Probabilidade, inferência, regressão e amostragem pertencem às próximas unidades. Aqui o objetivo é aprender a **ler e descrever o que está nos dados**.

## 1. Comece pela variável, não pela fórmula

Antes de escolher gráfico ou medida, identifique que tipo de informação está sendo observada.

- **variável qualitativa:** registra categorias, como setor, tipo sanguíneo ou resposta “sim/não”;
- **variável quantitativa:** registra valores numéricos para os quais operações aritméticas fazem sentido;
- **quantitativa discreta:** normalmente resulta de contagem, como número de ocorrências;
- **quantitativa contínua:** pode assumir valores em um intervalo, como tempo, massa ou temperatura.

Essa classificação orienta a representação. Um gráfico de barras funciona naturalmente para categorias; um histograma organiza uma variável quantitativa em intervalos.

## 2. Tabelas de frequência: transformar dados em estrutura

Uma **frequência absoluta** é a quantidade de observações em uma categoria ou classe. A **frequência relativa** é essa quantidade dividida pelo total de observações.

Se uma amostra tem 40 registros e 10 pertencem à categoria A:

\[
f_A = 10, \qquad f_{rel,A}=\frac{10}{40}=0{,}25=25\%.
\]

A **frequência acumulada** soma progressivamente as frequências até determinada categoria ordenável ou limite de classe. Ela é especialmente útil para responder perguntas como “quantos valores estão até este ponto?” ou “qual proporção não ultrapassa este limite?”.

### Classes de intervalo

Quando há muitos valores quantitativos, pode ser útil agrupá-los em intervalos. Esse agrupamento facilita a leitura da distribuição, mas perde detalhe: depois de substituir valores individuais por classes, já não se enxerga exatamente cada observação.

Esse é um princípio geral da estatística descritiva:

> **resumir facilita enxergar a estrutura, mas pode ocultar detalhes.**

## 3. Gráfico de barras × histograma

Esses dois gráficos são visualmente parecidos, mas representam coisas diferentes.

### Gráfico de barras

É adequado para categorias ou valores discretos tratados como categorias. Cada barra corresponde a uma categoria, e a separação entre barras reforça que as categorias são entidades distintas.

### Histograma

O histograma resume a distribuição de uma variável quantitativa dividindo sua faixa em **classes** e mostrando quantas observações caem em cada intervalo.

As barras são adjacentes porque os intervalos representam partes contíguas de uma escala numérica. Um histograma pode revelar:

- localização aproximada do centro;
- dispersão;
- assimetria;
- valores atípicos;
- presença de mais de um pico ou modo.

A aparência do histograma depende da escolha das classes. Classes excessivamente largas podem esconder estrutura; classes estreitas demais podem produzir ruído visual.

## 4. Gráfico de setores e outros diagramas

O **gráfico de setores**, também chamado gráfico de pizza, representa partes de um total por áreas angulares. Ele funciona melhor quando há poucas categorias e o objetivo é comparar participações relativas claramente distintas.

Não confunda utilidade com obrigatoriedade: uma tabela ou gráfico de barras frequentemente comunica as mesmas proporções com comparação mais direta.

Um **diagrama de dispersão** representa pares de valores quantitativos e permite observar visualmente associação, agrupamentos e pontos incomuns. Nesta unidade ele é apenas uma ferramenta exploratória; correlação e regressão serão aprofundadas nas unidades próprias.

## 5. O diagrama de caixa resume posição e dispersão

O **diagrama de caixa** (*box plot*) sintetiza a parte central da distribuição por meio de quartis.

Os três marcos principais são:

- primeiro quartil \(Q_1\): aproximadamente 25% dos dados ficam até esse ponto;
- mediana \(Q_2\): aproximadamente 50% ficam até esse ponto;
- terceiro quartil \(Q_3\): aproximadamente 75% ficam até esse ponto.

A caixa vai de \(Q_1\) a \(Q_3\), e a linha interna marca a mediana. A diferença

\[
Q_3-Q_1
\]

é a **amplitude interquartil**, medida de dispersão da metade central dos dados.

Uma convenção comum de diagrama de caixa usa limites internos em

\[
Q_1-1{,}5(Q_3-Q_1) \quad \text{e} \quad Q_3+1{,}5(Q_3-Q_1)
\]

para sinalizar observações potencialmente atípicas. Esses pontos merecem investigação; não devem ser apagados automaticamente.

Os algoritmos exatos de cálculo de quartis podem variar entre livros e programas. Em prova, siga a convenção fornecida ou aquela claramente adotada pelo enunciado.

## 6. Medidas de posição: onde os dados se concentram?

### Média aritmética

Para \(n\) observações \(x_1,\ldots,x_n\):

\[
\bar{x}=\frac{x_1+x_2+\cdots+x_n}{n}.
\]

A média usa todos os valores. Por isso, reage fortemente a observações extremas.

### Mediana

Ordene os valores.

- se \(n\) for ímpar, a mediana é o valor central;
- se \(n\) for par, na convenção usual para dados não agrupados ela é a média dos dois valores centrais.

Como depende principalmente da posição ordenada, a mediana é mais resistente a valores extremos que a média.

### Moda

A moda é o valor ou categoria de maior frequência. Um conjunto pode ser:

- unimodal: um modo predominante;
- multimodal: mais de um modo;
- sem moda, quando nenhuma frequência se destaca segundo a definição adotada.

A moda é a única dessas três medidas que também pode ser usada naturalmente em dados puramente categóricos.

## 7. Um exemplo que mostra por que uma medida não basta

Considere os tempos hipotéticos, em minutos:

\[
4,\ 5,\ 5,\ 6,\ 30.
\]

A média é

\[
\bar{x}=\frac{4+5+5+6+30}{5}=10.
\]

A mediana é 5 e a moda também é 5.

O valor 30 desloca bastante a média, embora quatro das cinco observações estejam entre 4 e 6. Isso não torna a média “errada”; mostra que **centro e forma da distribuição precisam ser lidos juntos**.

A amplitude é

\[
30-4=26,
\]

revelando uma dispersão grande causada principalmente pelo extremo superior.

## 8. Quartis, percentis e posição relativa

Um **percentil de ordem \(p\)** é um ponto da distribuição relacionado à proporção \(p\%\) dos dados abaixo ou até aquele nível, conforme a convenção de cálculo adotada.

Relações úteis:

- \(Q_1\) corresponde ao 25º percentil;
- \(Q_2\) corresponde ao 50º percentil e coincide com a mediana;
- \(Q_3\) corresponde ao 75º percentil.

Questões de prova frequentemente cobram essa interpretação, mais do que um algoritmo específico de interpolação.

## 9. Medidas de dispersão: quanto os valores se afastam?

Duas distribuições podem ter a mesma média e dispersões completamente diferentes. Por isso, medidas de posição não bastam.

### Amplitude total

\[
A=x_{\max}-x_{\min}.
\]

É simples, mas depende apenas dos dois extremos.

### Variância populacional

Para uma população com \(N\) valores e média \(\mu\):

\[
\sigma^2=\frac{1}{N}\sum_{i=1}^{N}(x_i-\mu)^2.
\]

### Variância amostral corrigida

Quando uma amostra é usada para estimar a variância populacional, é comum empregar:

\[
s^2=\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2.
\]

Não transforme o denominador em regra cega. Alguns enunciados definem explicitamente outra medida descritiva com divisor \(n\). **Leia a definição fornecida.**

### Desvio padrão

É a raiz quadrada da variância:

\[
s=\sqrt{s^2}.
\]

O desvio padrão volta à mesma unidade de medida dos dados; a variância fica em unidades ao quadrado.

### Amplitude interquartil

\[
Q_3-Q_1.
\]

Como utiliza a metade central da distribuição, é menos sensível aos extremos que a amplitude total, a variância e o desvio padrão.

### Coeficiente de variação

Uma forma comum de comparar dispersão relativa é

\[
\frac{s}{|\bar{x}|}\times 100\%.
\]

É uma medida adimensional. Seu uso requer cuidado quando a média é zero ou muito próxima de zero e quando a escala não admite interpretação de razão.

## 10. Como transformações alteram média e dispersão

Se

\[
Y=a+bX,
\]

então:

\[
\bar{Y}=a+b\bar{X},
\]

\[
\operatorname{Var}(Y)=b^2\operatorname{Var}(X),
\]

\[
s_Y=|b|s_X.
\]

Consequências de alto rendimento:

- somar uma constante muda a posição, mas não a variância nem o desvio padrão;
- multiplicar todos os valores por \(b\) multiplica o desvio padrão por \(|b|\);
- a variância é multiplicada por \(b^2\).

## 11. Assimetria: para qual lado a cauda se prolonga?

Uma distribuição é simétrica quando suas partes à esquerda e à direita do centro têm comportamento aproximadamente espelhado.

Na **assimetria positiva**, a cauda mais longa se estende para a direita. Na **assimetria negativa**, a cauda mais longa se estende para a esquerda.

Em muitas distribuições unimodais, uma cauda longa à direita tende a puxar a média para valores maiores que a mediana; com cauda à esquerda pode ocorrer o contrário. Isso é uma **heurística útil, não um teorema universal** para qualquer conjunto de dados.

Um coeficiente de assimetria positivo indica assimetria à direita; negativo, à esquerda. Valor zero do coeficiente não basta, isoladamente, para provar que toda a distribuição é perfeitamente simétrica.

## 12. Curtose: peso das caudas, não apenas “altura do pico”

A curtose ajuda a caracterizar quão pesadas ou leves são as caudas em comparação com uma distribuição normal de referência.

- valores maiores de curtose estão associados a caudas mais pesadas e maior propensão a observações extremas;
- valores menores indicam caudas mais leves, na comparação adotada.

Há duas convenções numéricas comuns:

1. **curtose bruta:** a distribuição normal tem valor 3;
2. **excesso de curtose:** subtrai-se 3, de modo que a normal tem valor 0.

Se uma questão disser apenas “curtose”, verifique qual convenção ela fornece. Uma banca pode usar as mesmas palavras com fórmulas que diferem por 3.

## 13. Resistência a valores extremos

Algumas medidas mudam muito quando aparece um valor muito distante dos demais.

| Medida | Sensibilidade a extremos |
|---|---|
| média | alta |
| mediana | menor |
| amplitude total | muito alta |
| variância e desvio padrão | alta |
| amplitude interquartil | menor |

Isso explica por que uma análise exploratória usa medidas e gráficos em conjunto. Uma média pode esconder um extremo; um histograma ou diagrama de caixa pode fazê-lo saltar aos olhos.

## 14. Método de prova em seis passos

Diante de tabela, gráfico ou conjunto de dados:

1. identifique o tipo de variável;
2. veja se a representação escolhida faz sentido para esse tipo;
3. localize o centro: média, mediana, moda ou quantis;
4. avalie a dispersão: amplitude, variância, desvio padrão ou amplitude interquartil;
5. examine a forma: simetria, caudas, modos e valores atípicos;
6. confira a convenção da fórmula antes de calcular.

## 15. Pegadinhas de alto rendimento

**“Histograma e gráfico de barras são sinônimos.”** Errado. O histograma representa intervalos contíguos de variável quantitativa; barras representam categorias ou valores discretos tratados como categorias.

**“A média é sempre a melhor medida de centro.”** Errado. A escolha depende da distribuição e do objetivo; extremos podem deslocar fortemente a média.

**“O terceiro quartil deixa 25% dos dados abaixo dele.”** Errado. Ele se relaciona ao ponto de 75% da distribuição acumulada.

**“Desvio padrão tem unidade ao quadrado.”** Errado. Quem tem unidade ao quadrado é a variância.

**“Somar 10 a todos os dados aumenta a variância.”** Errado. A translação altera a posição, não a dispersão.

**“Assimetria positiva significa cauda à esquerda.”** Errado. A cauda longa fica à direita.

**“Curtose mede apenas a altura do pico.”** Incompleto e enganoso. A interpretação moderna de prova deve enfatizar o comportamento das caudas.

**“Um ponto marcado como atípico deve ser eliminado.”** Errado. Ele precisa ser investigado; pode ser erro, evento raro ou observação legítima.

## 16. Fronteira com as próximas unidades

Aqui você aprendeu a **descrever e explorar os dados observados**. As unidades seguintes acrescentarão a linguagem probabilística e os mecanismos de inferência, regressão e amostragem.

Retenha o mapa:

> **tabela organiza; gráfico revela; posição localiza; dispersão mede variação; assimetria indica o lado da cauda; curtose caracteriza o peso das caudas.**
