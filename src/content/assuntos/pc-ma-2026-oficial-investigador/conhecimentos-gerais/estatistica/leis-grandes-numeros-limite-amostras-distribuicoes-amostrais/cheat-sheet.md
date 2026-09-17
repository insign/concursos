# Grandes números, limite central e distribuições amostrais — revisão rápida

## Mapa

**população → amostra aleatória → estatística → distribuição amostral → concentração → aproximação normal**

## Amostra aleatória

No modelo desta unidade, \(X_1,\ldots,X_n\):

- são independentes;
- têm a mesma distribuição.

## Média amostral

\[
\bar X=\frac{1}{n}\sum X_i
\]

\[
E(\bar X)=\mu,
\qquad
\operatorname{Var}(\bar X)=\frac{\sigma^2}{n},
\qquad
EP(\bar X)=\frac{\sigma}{\sqrt n}.
\]

Quadruplicar \(n\) → erro padrão cai pela metade.

## Lei fraca dos grandes números

\[
\bar X_n\xrightarrow{P}\mu.
\]

Equivalente para a soma:

\[
\frac{S_n}{n}\xrightarrow{P}\mu.
\]

**Não:** \(S_n\to\mu\).

## Lei forte

No caso clássico apropriado:

\[
\bar X_n\to\mu
\]

quase certamente.

Quase certa ⇒ em probabilidade.

## Teorema central do limite

\[
\frac{\bar X_n-\mu}{\sigma/\sqrt n}
\xrightarrow{d}
N(0,1).
\]

Para \(S_n=\sum X_i\):

\[
\frac{S_n-n\mu}{\sigma\sqrt n}
\xrightarrow{d}
N(0,1).
\]

**Lei dos grandes números:** onde a média se concentra.  
**Teorema central do limite:** forma da flutuação padronizada.

## Normal exata × aproximada

Se a população é normal:

\[
\bar X\sim N\left(\mu,\frac{\sigma^2}{n}\right)
\]

para qualquer \(n\).

Se a população não é normal, o teorema central do limite fornece aproximação para \(n\) grande, sob suas condições. Não há “\(n=30\)” universal.

## Proporção amostral

\[
E(\hat p)=p,
\qquad
\operatorname{Var}(\hat p)=\frac{p(1-p)}{n}.
\]

## População normal: distribuições amostrais

\[
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}.
\]

\[
T=\frac{\bar X-\mu}{S/\sqrt n}\sim t_{n-1}.
\]

Duas amostras normais independentes:

\[
\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}
\sim F_{n_1-1,n_2-1}.
\]

## Pegadinhas

- população vira normal → **não**;
- soma sem padronizar converge a normal padrão → **não**;
- erro padrão = \(\sigma/n\) → **não**;
- média de população normal é só aproximadamente normal → **não**;
- t usa \(\sigma\) desconhecido → **não; usa \(S\)**;
- mais observações causam “compensação” do acaso → **não**.
