# Variáveis aleatórias e distribuições — revisão rápida

## Mapa central

**resultado → variável → distribuição → momentos → modelo especial → condicionamento → transformação**

## Discreta × contínua

- **discreta:** valores finitos/enumeráveis; usa massas \(p_X(x)=P(X=x)\);
- **contínua:** probabilidades são áreas sob densidade; \(P(X=x_0)=0\) em ponto isolado.

## Funções da distribuição

**Discreta:**

\[
p_X(x)\ge0,\qquad \sum_xp_X(x)=1.
\]

**Contínua:**

\[
f_X(x)\ge0,\qquad \int_{-\infty}^{\infty}f_X(x)dx=1.
\]

\[
P(a\le X\le b)=\int_a^b f_X(x)dx.
\]

**Acumulada:**

\[
F_X(x)=P(X\le x).
\]

- discreta: soma massas até \(x\);
- contínua: integra densidade até \(x\).

## Esperança e momentos

Discreta:

\[
E(X)=\sum_xx p_X(x).
\]

Contínua:

\[
E(X)=\int xf_X(x)dx.
\]

Momento bruto de ordem \(k\):

\[
E(X^k).
\]

Variância:

\[
\operatorname{Var}(X)=E(X^2)-[E(X)]^2.
\]

Se \(Y=a+bX\):

\[
E(Y)=a+bE(X),\qquad
\operatorname{Var}(Y)=b^2\operatorname{Var}(X).
\]

## Distribuições especiais

| Modelo | Mecanismo | Média | Variância |
|---|---|---:|---:|
| Bernoulli \((p)\) | uma tentativa 0/1 | \(p\) | \(p(1-p)\) |
| Binomial \((n,p)\) | sucessos em \(n\) tentativas independentes | \(np\) | \(np(1-p)\) |
| Poisson \((\lambda)\) | contagem de eventos | \(\lambda\) | \(\lambda\) |
| Uniforme \((a,b)\) | densidade constante no intervalo | \((a+b)/2\) | \((b-a)^2/12\) |
| Exponencial por taxa \((\lambda)\) | tempo de espera/taxa constante | \(1/\lambda\) | \(1/\lambda^2\) |
| Normal \((\mu,\sigma^2)\) | distribuição simétrica contínua | \(\mu\) | \(\sigma^2\) |

Poisson independentes somam parâmetros:

\[
X\sim P(\lambda_1),\ Y\sim P(\lambda_2)
\Rightarrow X+Y\sim P(\lambda_1+\lambda_2).
\]

Desvio padrão da Poisson:

\[
\sqrt{\lambda}.
\]

Normal padronizada:

\[
Z=\frac{X-\mu}{\sigma}.
\]

## Conjunta, marginal e condicional

Discreta:

\[
p_X(x)=\sum_y p_{X,Y}(x,y).
\]

\[
p_{Y\mid X}(y\mid x)=\frac{p_{X,Y}(x,y)}{p_X(x)}.
\]

Contínua: troque somas por integrais e massas por densidades.

## Independência

Discreta:

\[
p_{X,Y}(x,y)=p_X(x)p_Y(y).
\]

Contínua:

\[
f_{X,Y}(x,y)=f_X(x)f_Y(y).
\]

Independência **não** exige marginais iguais.

## Transformação

Se \(Y=g(X)\):

- discreta: some as massas de todos os \(x\) que geram o mesmo \(y\);
- contínua: método da acumulada é geral;
- transformação um a um com inversa \(x=v(y)\):

\[
f_Y(y)=f_X(v(y))|v'(y)|.
\]

## Pegadinhas

- densidade = probabilidade pontual → **não**;
- densidade não pode superar 1 → **não**;
- esperança deve ser valor possível → **não**;
- Poisson: desvio padrão = \(\lambda\) → **não; é \(\sqrt\lambda\)**;
- soma de Poisson dispensa independência → **não**;
- independência exige mesma distribuição → **não**;
- transformar variável = apenas substituir na densidade → **não**.

## Recuperação em uma frase

**A distribuição descreve a lei da variável; esperança e momentos resumem essa lei; condicionamento muda a lei diante de informação; transformação produz uma nova lei.**