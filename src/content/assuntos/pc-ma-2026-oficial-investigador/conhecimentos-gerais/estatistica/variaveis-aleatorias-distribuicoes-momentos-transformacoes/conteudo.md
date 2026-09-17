---
schemaVersion: 1
title: "Variáveis aleatórias, distribuições, momentos e transformações"
description: "Variáveis aleatórias discretas e contínuas, funções de probabilidade e densidade, esperança, momentos, distribuições especiais, condicionamento e transformações."
order: 52
storageId: pc-u052
---

# Variáveis aleatórias, distribuições, momentos e transformações

Em U051, a pergunta era “qual é a chance de um evento ocorrer?”. Agora a pergunta muda: **como transformar o resultado aleatório em um número e descrever o comportamento desse número?**

O mapa desta unidade é:

> **resultado → variável aleatória → distribuição → esperança e momentos → modelo especial → distribuição conjunta/condicional → transformação**

Uma variável aleatória cria uma ponte entre o experimento e as ferramentas numéricas da Estatística. Depois de definir a variável, precisamos dizer **quais valores ela pode assumir e como a probabilidade se distribui entre eles**.

## 1. Variável aleatória: uma função aplicada ao resultado

Uma **variável aleatória** associa um número real a cada resultado do experimento.

Exemplo hipotético: três moedas são lançadas. Em vez de trabalhar com sequências como `CCK` ou `KCC`, defina

\[
X=\text{número de caras nos três lançamentos}.
\]

A variável \(X\) pode assumir apenas

\[
0,1,2,3.
\]

Os resultados elementares continuam existindo; a variável apenas os resume por uma característica numérica de interesse.

O conjunto de valores que uma variável pode assumir é chamado aqui de <abbr title="conjunto de valores possíveis da variável">suporte</abbr>.

### Discreta

Uma variável aleatória é **discreta** quando assume um conjunto finito ou enumerável de valores. Contagens são o exemplo típico:

- número de chamadas;
- número de falhas;
- número de acertos;
- número de ocorrências em certo período.

### Contínua

Uma variável aleatória é **contínua** quando é modelada em uma escala contínua, como:

- tempo de espera;
- distância;
- temperatura;
- massa.

A diferença entre discreta e contínua determina como a distribuição será representada.

## 2. Distribuição: a lei probabilística da variável

A **distribuição de probabilidade** descreve como a probabilidade é atribuída aos valores de uma variável aleatória.

Há várias formas de representar a mesma distribuição. Três delas são centrais nesta unidade:

1. função de probabilidade, para variável discreta;
2. função densidade, para variável contínua;
3. função de distribuição acumulada, que serve para ambos os casos.

## 3. Função de probabilidade: massa em pontos discretos

Para uma variável discreta \(X\), escrevemos

\[
p_X(x)=P(X=x).
\]

Para ser uma função de probabilidade válida:

\[
p_X(x)\ge 0
\]

para todo \(x\), e

\[
\sum_x p_X(x)=1.
\]

Exemplo hipotético: se \(X\) é o número de caras em dois lançamentos independentes de moeda honesta,

\[
P(X=0)=\frac14,\qquad P(X=1)=\frac12,\qquad P(X=2)=\frac14.
\]

As três massas somam 1.

## 4. Densidade: probabilidade é área, não altura

Para uma variável contínua \(X\), uma função densidade \(f_X(x)\) deve ser não negativa e ter área total 1:

\[
f_X(x)\ge 0,
\qquad
\int_{-\infty}^{\infty}f_X(x)\,dx=1.
\]

A probabilidade de um intervalo é

\[
P(a\le X\le b)=\int_a^b f_X(x)\,dx.
\]

Duas consequências são essenciais:

- para uma variável contínua com densidade, \(P(X=x_0)=0\) para qualquer ponto isolado \(x_0\);
- o valor de \(f_X(x)\) **não é uma probabilidade pontual** e pode até ser maior que 1; o que precisa ficar entre 0 e 1 é a área correspondente a uma probabilidade.

Assim, em variáveis contínuas,

\[
P(a<X<b)=P(a\le X\le b),
\]

porque acrescentar ou retirar os extremos, que são pontos isolados, não muda a probabilidade.

## 5. A função acumulada unifica discreto e contínuo

A função de distribuição acumulada é

\[
F_X(x)=P(X\le x).
\]

Ela é não decrescente, assume valores entre 0 e 1 e satisfaz

\[
\lim_{x\to-\infty}F_X(x)=0,
\qquad
\lim_{x\to+\infty}F_X(x)=1.
\]

No caso discreto, a acumulada soma as massas até \(x\). No caso contínuo, integra a densidade até \(x\):

\[
F_X(x)=\int_{-\infty}^{x}f_X(t)\,dt.
\]

Quando \(F_X\) é diferenciável,

\[
f_X(x)=F'_X(x).
\]

Uma vantagem prática: a acumulada responde diretamente a perguntas como \(P(X\le c)\). Para intervalos,

\[
P(a<X\le b)=F_X(b)-F_X(a).
\]

## 6. Esperança: o centro teórico da distribuição

A **esperança** ou valor esperado é uma média ponderada pela própria distribuição.

Para \(X\) discreta:

\[
E(X)=\sum_x x\,p_X(x),
\]

quando a soma existe.

Para \(X\) contínua:

\[
E(X)=\int_{-\infty}^{\infty}x f_X(x)\,dx,
\]

quando a integral existe.

A esperança não precisa ser um valor que a variável possa assumir. Em um dado honesto,

\[
E(X)=3{,}5,
\]

embora nenhuma face mostre 3,5.

### Funções da variável

Mais geralmente,

\[
E[g(X)]
=\sum_x g(x)p_X(x)
\]

no caso discreto, ou

\[
E[g(X)]
=\int g(x)f_X(x)\,dx
\]

no contínuo.

Isso permite obter momentos e outras medidas sem encontrar primeiro a distribuição de \(g(X)\).

## 7. Momentos: resumir potência, centro e dispersão

O **momento bruto de ordem \(k\)** é

\[
E(X^k),
\]

quando existe.

O primeiro momento bruto é a média:

\[
E(X)=\mu.
\]

O **momento central de ordem \(k\)** é

\[
E[(X-\mu)^k].
\]

O segundo momento central é a variância:

\[
\operatorname{Var}(X)=E[(X-\mu)^2].
\]

Uma identidade de alto rendimento é

\[
\operatorname{Var}(X)=E(X^2)-[E(X)]^2.
\]

O desvio padrão é

\[
\sigma_X=\sqrt{\operatorname{Var}(X)}.
\]

### Transformações lineares e momentos

Se

\[
Y=a+bX,
\]

então

\[
E(Y)=a+bE(X)
\]

e

\[
\operatorname{Var}(Y)=b^2\operatorname{Var}(X).
\]

A constante \(a\) desloca a posição, mas não altera a dispersão; o fator \(b\) muda a escala.

## 8. Distribuições especiais: reconhecer o mecanismo antes da fórmula

O edital usa a expressão ampla “distribuições especiais”. Para prova, o melhor caminho é associar cada família a um mecanismo típico.

### 8.1 Bernoulli

Uma única tentativa com dois resultados codificados como 1 (sucesso) e 0 (fracasso):

\[
P(X=1)=p,\qquad P(X=0)=1-p.
\]

Então

\[
E(X)=p,
\qquad
\operatorname{Var}(X)=p(1-p).
\]

### 8.2 Binomial

Conta sucessos em \(n\) tentativas independentes de Bernoulli, cada uma com a mesma probabilidade \(p\):

\[
P(X=x)=\binom nx p^x(1-p)^{n-x},
\qquad x=0,1,\ldots,n.
\]

Se \(X\sim\operatorname{Binomial}(n,p)\),

\[
E(X)=np,
\qquad
\operatorname{Var}(X)=np(1-p).
\]

A palavra-chave não é apenas “contagem”: é **número fixo de tentativas, dois resultados por tentativa, mesma probabilidade de sucesso e independência**.

### 8.3 Poisson

Modela contagens de eventos em uma região de tempo, espaço ou outra exposição, em um modelo com parâmetro \(\lambda>0\):

\[
P(X=x)=e^{-\lambda}\frac{\lambda^x}{x!},
\qquad x=0,1,2,\ldots
\]

Uma propriedade decisiva é

\[
E(X)=\operatorname{Var}(X)=\lambda.
\]

Logo o desvio padrão é

\[
\sqrt{\lambda},
\]

não \(\lambda\), salvo no caso particular em que isso coincida.

Se \(X_1,\ldots,X_m\) são variáveis de Poisson **independentes**, com parâmetros \(\lambda_1,\ldots,\lambda_m\), então

\[
X_1+\cdots+X_m
\sim
\operatorname{Poisson}(\lambda_1+\cdots+\lambda_m).
\]

A independência é condição importante para essa regra de soma.

### 8.4 Uniforme contínua

Na distribuição uniforme em \((a,b)\), a densidade é constante no intervalo:

\[
f(x)=\frac{1}{b-a},\qquad a<x<b.
\]

Seu centro e sua variância são

\[
E(X)=\frac{a+b}{2},
\qquad
\operatorname{Var}(X)=\frac{(b-a)^2}{12}.
\]

### 8.5 Exponencial

Na parametrização por taxa \(\lambda>0\),

\[
f(x)=\lambda e^{-\lambda x},\qquad x\ge0.
\]

Tem

\[
E(X)=\frac1\lambda,
\qquad
\operatorname{Var}(X)=\frac1{\lambda^2}.
\]

É usada como modelo de tempo de espera em mecanismos com taxa constante. Na forma exponencial clássica, vale a propriedade de falta de memória:

\[
P(X>s+t\mid X>s)=P(X>t).
\]

### 8.6 Normal

Uma variável normal é descrita por média \(\mu\) e variância \(\sigma^2\), com densidade simétrica em torno de \(\mu\):

\[
f(x)=\frac{1}{\sigma\sqrt{2\pi}}
\exp\left[-\frac12\left(\frac{x-\mu}{\sigma}\right)^2\right],
\qquad \sigma>0.
\]

Se

\[
X\sim N(\mu,\sigma^2),
\]

a padronização

\[
Z=\frac{X-\mu}{\sigma}
\]

produz uma normal padrão, de média 0 e variância 1.

As distribuições qui-quadrado, t e F serão tratadas no contexto em que ganham função operacional neste programa: distribuições amostrais e inferência, nas unidades seguintes. Isso evita decorar famílias antes de entender para que servem.

## 9. Duas variáveis: distribuição conjunta e marginais

Quando duas variáveis aleatórias \(X\) e \(Y\) são observadas no mesmo experimento, precisamos descrever seu comportamento conjunto.

No caso discreto, uma função conjunta pode ser escrita como

\[
p_{X,Y}(x,y)=P(X=x,Y=y).
\]

A distribuição marginal de \(X\) é obtida somando a outra coordenada:

\[
p_X(x)=\sum_y p_{X,Y}(x,y).
\]

Analogamente,

\[
p_Y(y)=\sum_x p_{X,Y}(x,y).
\]

No caso contínuo, a soma é substituída por integração:

\[
f_X(x)=\int_{-\infty}^{\infty}f_{X,Y}(x,y)\,dy.
\]

O princípio é sempre o mesmo: **marginalizar é eliminar da descrição a variável que não está sendo perguntada**.

## 10. Distribuição condicional: fixar informação sobre outra variável

No caso discreto, se \(p_X(x)>0\), a distribuição condicional de \(Y\) dado \(X=x\) é

\[
p_{Y\mid X}(y\mid x)
=
\frac{p_{X,Y}(x,y)}{p_X(x)}.
\]

No caso contínuo, quando \(f_X(x)>0\), a densidade condicional correspondente é

\[
f_{Y\mid X}(y\mid x)
=
\frac{f_{X,Y}(x,y)}{f_X(x)}.
\]

A lógica vem diretamente de U051: a informação \(X=x\) muda o universo de referência.

Também podemos calcular momentos condicionais, como

\[
E(Y\mid X=x)
\]

e

\[
\operatorname{Var}(Y\mid X=x).
\]

## 11. Independência de variáveis aleatórias

Duas variáveis são independentes quando sua distribuição conjunta se fatoriza no produto das marginais.

No caso discreto:

\[
p_{X,Y}(x,y)=p_X(x)p_Y(y)
\]

para todos os pares relevantes.

No caso contínuo:

\[
f_{X,Y}(x,y)=f_X(x)f_Y(y)
\]

nos pontos pertinentes do suporte.

Quando há independência, conhecer o valor de uma não altera a distribuição da outra. Por isso, quando a condicional está definida,

\[
p_{Y\mid X}(y\mid x)=p_Y(y)
\]

no caso discreto, com relação análoga para densidades.

**Pegadinha:** independência não significa que \(X\) e \(Y\) tenham a mesma distribuição. Duas variáveis podem ser independentes e ter leis completamente diferentes.

## 12. Transformação de variável: criar uma nova variável a partir da antiga

Se

\[
Y=g(X),
\]

então \(Y\) é outra variável aleatória e precisa ter sua própria distribuição.

### Caso discreto

Para obter \(P(Y=y)\), some as probabilidades de todos os valores de \(X\) que são enviados para \(y\):

\[
P(Y=y)=\sum_{x:g(x)=y}P(X=x).
\]

Se \(Y=X^2\), por exemplo, valores \(X=2\) e \(X=-2\) produzem o mesmo \(Y=4\); as massas correspondentes precisam ser somadas.

### Caso contínuo: método da acumulada

Uma estratégia geral é calcular

\[
F_Y(y)=P(g(X)\le y)
\]

em termos da distribuição de \(X\) e, quando for apropriado, derivar para obter a densidade de \(Y\).

### Mudança de variável em transformação invertível

Se \(Y=g(X)\) é uma transformação contínua um a um, com inversa \(X=v(Y)\), então, sob as condições usuais de diferenciabilidade,

\[
f_Y(y)=f_X(v(y))\left|v'(y)\right|.
\]

O fator \(\left|v'(y)\right|\) é o <abbr title="fator que corrige a mudança de escala da transformação">ajuste de escala</abbr>: ele compensa o estiramento ou a compressão produzidos pela transformação.

Para uma transformação linear \(Y=a+bX\), com \(b\ne0\), a regra se reduz de modo consistente aos efeitos já vistos sobre média e variância.

## 13. Como reconhecer o caminho em prova

Antes de calcular, responda:

1. a variável é discreta ou contínua?
2. pediram probabilidade em um ponto ou em um intervalo?
3. há uma função de probabilidade, densidade ou acumulada disponível?
4. a questão pede média, variância ou outro momento?
5. o mecanismo corresponde a uma família especial conhecida?
6. há duas variáveis e é preciso marginalizar ou condicionar?
7. foi declarada independência — ou ela precisa ser verificada pela fatoração?
8. a variável pedida é uma transformação da variável original?

## 14. Pegadinhas de alto rendimento

**“Densidade em \(x\) é igual a \(P(X=x)\).”** Errado para variável contínua: a probabilidade do ponto é zero; a densidade é uma altura cuja integral gera probabilidade.

**“Uma densidade nunca pode ultrapassar 1.”** Errado. A área total precisa ser 1; a altura pode superar 1.

**“Esperança é sempre um valor possível da variável.”** Errado. Ela é um resumo teórico da distribuição.

**“Na Poisson, o desvio padrão é \(\lambda\).”** Errado. A variância é \(\lambda\), e o desvio padrão é \(\sqrt{\lambda}\).

**“A soma de Poisson é Poisson sem qualquer condição.”** A regra ensinada exige independência das variáveis somadas.

**“Independência exige distribuições marginais iguais.”** Errado. Exige fatoração da conjunta.

**“Para achar a distribuição de \(g(X)\), basta substituir \(x\) por \(g(x)\) na densidade.”** Errado em geral. É preciso considerar a imagem da transformação e o ajuste de escala; quando vários valores de \(X\) levam ao mesmo \(Y\), todas as contribuições contam.

## 15. Fronteira com U053

Esta unidade encerra o núcleo de **variáveis aleatórias e suas distribuições** até o item 2.10 do edital.

A U053 começa no item 2.11 e muda o foco: **o que acontece quando repetimos o experimento e agregamos muitas observações?** Nela entram leis dos grandes números, teorema central do limite, amostras aleatórias e distribuições amostrais.

Retenha a estrutura:

> **a variável transforma o resultado em número; a distribuição diz como a probabilidade se reparte; os momentos resumem a distribuição; condicionamento altera a lei; transformação cria uma nova lei.**