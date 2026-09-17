# Estatística descritiva — revisão rápida

## Mapa central

**dados → tabela/gráfico → posição → dispersão → forma**

| Pergunta | Ferramenta típica |
|---|---|
| onde os dados se concentram? | média, mediana, moda, quartis |
| quanto variam? | amplitude, variância, desvio padrão, amplitude interquartil |
| para qual lado se alongam? | assimetria |
| como são as caudas? | curtose |

## Tabelas de frequência

- absoluta: número de observações;
- relativa: frequência / total;
- acumulada: soma progressiva.

## Gráficos

- **barras:** categorias; barras separadas;
- **histograma:** variável quantitativa agrupada em intervalos contíguos;
- **setores:** participações de um total, melhor com poucas categorias;
- **diagrama de caixa:** quartis, mediana, dispersão central e possíveis valores atípicos;
- **dispersão:** pares quantitativos e padrões de associação; regressão fica para unidade própria.

## Posição

\[
\bar{x}=\frac{\sum x_i}{n}
\]

- média: usa todos os valores; sensível a extremos;
- mediana: centro dos dados ordenados; mais resistente;
- moda: maior frequência; pode existir mais de uma;
- \(Q_1\): 25%; \(Q_2\): 50% = mediana; \(Q_3\): 75%.

## Dispersão

**Amplitude:**

\[
A=x_{\max}-x_{\min}
\]

**Variância populacional:**

\[
\sigma^2=\frac{1}{N}\sum (x_i-\mu)^2
\]

**Variância amostral corrigida:**

\[
s^2=\frac{1}{n-1}\sum (x_i-\bar{x})^2
\]

**Desvio padrão:**

\[
s=\sqrt{s^2}
\]

**Amplitude interquartil:**

\[
Q_3-Q_1
\]

- variância: unidade ao quadrado;
- desvio padrão: mesma unidade dos dados;
- amplitude total depende só dos extremos;
- amplitude interquartil usa a metade central e é mais resistente.

## Transformação linear

Se \(Y=a+bX\):

\[
\bar Y=a+b\bar X,\qquad \operatorname{Var}(Y)=b^2\operatorname{Var}(X),\qquad s_Y=|b|s_X.
\]

Logo:
- somar constante não muda variância/desvio padrão;
- multiplicar por \(b\) multiplica o desvio padrão por \(|b|\) e a variância por \(b^2\).

## Assimetria

- positiva → cauda à direita;
- negativa → cauda à esquerda;
- média × mediana pode dar pista, mas não é regra universal.

## Curtose

- caracteriza peso das caudas em comparação com a normal;
- curtose bruta da normal = 3;
- excesso de curtose da normal = 0;
- leia a convenção da questão.

## Resistência a extremos

Mais sensíveis: **média, amplitude, variância, desvio padrão**.

Mais resistentes: **mediana e amplitude interquartil**.

## Pegadinhas

- histograma = barras → **não**;
- \(Q_3\) = 25% acumulado → **não; 75%**;
- desvio padrão tem unidade ao quadrado → **não**;
- somar constante aumenta variância → **não**;
- assimetria positiva = cauda esquerda → **não**;
- ponto atípico deve ser excluído automaticamente → **não**.

## Recuperação em uma frase

**posição diz onde; dispersão diz quanto varia; assimetria diz para que lado a cauda vai; curtose diz quão pesadas são as caudas.**
