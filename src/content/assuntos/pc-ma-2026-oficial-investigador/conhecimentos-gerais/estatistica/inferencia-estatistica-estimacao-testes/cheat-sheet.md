# Inferência estatística — revisão rápida

## Mapa

**parâmetro → estimador → incerteza → intervalo/teste → conclusão**

## Parâmetro × estimador × estimativa

- **parâmetro:** alvo desconhecido;
- **estimador:** estatística usada para estimá-lo;
- **estimativa:** valor observado do estimador.

## Propriedades

Viés:

\[
\operatorname{Bias}(T)=E(T)-\theta.
\]

Não viesado:

\[
E(T)=\theta.
\]

Erro quadrático médio:

\[
E[(T-\theta)^2]
=
\operatorname{Var}(T)+[\operatorname{Bias}(T)]^2.
\]

Consistência:

\[
T_n\xrightarrow{P}\theta.
\]

Não viés \(\neq\) consistência.

## Métodos de estimação

**Momentos:** igualar momentos amostrais e teóricos.

\[
M_k
=
\frac1n\sum X_i^k
\quad\leftrightarrow\quad
E(X^k).
\]

**Máxima verossimilhança:**

\[
L(\theta)=\prod f(x_i;\theta)
\]

e escolher \(\hat\theta\) que maximiza \(L\).

## Suficiência

Fatoração:

\[
f(x_1,\ldots,x_n;\theta)
=
g(T(x),\theta)h(x),
\]

com \(h\) sem depender de \(\theta\).

Poisson:

\[
T=\sum X_i
\]

é suficiente para \(\theta\).

## Intervalo de confiança

Forma típica:

\[
\text{estimativa}\pm
\text{quantil}\times\text{erro padrão}.
\]

Média, \(\sigma\) conhecido:

\[
\bar X
\pm
z_{1-\alpha/2}\frac{\sigma}{\sqrt n}.
\]

Média normal, \(\sigma\) desconhecido:

\[
\bar X
\pm
t_{1-\alpha/2,n-1}\frac{S}{\sqrt n}.
\]

Interpretação frequentista: **cobertura do procedimento**, não probabilidade posterior do parâmetro fixo.

## Intervalo de credibilidade

\[
\pi(\theta\mid x)
\propto
L(\theta\mid x)\pi(\theta).
\]

Um intervalo de 95% contém 95% da probabilidade posterior segundo o critério adotado.

**Confiança \(\neq\) credibilidade.**

## Testes

- \(H_0\): referência;
- \(H_1\): alternativa;
- simples: especifica completamente;
- composta: admite vários valores.

Tipo I:

\[
\alpha=P(\text{rejeitar }H_0\mid H_0).
\]

Tipo II:

\[
\beta=P(\text{não rejeitar }H_0\mid H_1\text{ relevante}).
\]

Potência:

\[
1-\beta.
\]

## Valor-p

- calculado supondo \(H_0\);
- \(p\le\alpha\) → rejeitar \(H_0\);
- \(p>\alpha\) → não rejeitar;
- **não** é a probabilidade de \(H_0\) ser verdadeira.

## Teste t de uma média

\[
T=\frac{\bar X-\mu_0}{S/\sqrt n}
\sim t_{n-1}
\]

sob \(H_0\), nas condições clássicas.

## Qui-quadrado de independência

Esperada:

\[
E_{ij}
=
\frac{(\text{total linha})(\text{total coluna})}
{\text{total geral}}.
\]

Estatística:

\[
\chi^2
=
\sum\frac{(O-E)^2}{E}.
\]

Graus de liberdade:

\[
(r-1)(c-1).
\]

## Variância normal

\[
\chi^2
=
\frac{(n-1)S^2}{\sigma_0^2}
\sim\chi^2_{n-1}.
\]

## Pegadinhas

- não viesado = sempre acertar → **não**;
- consistente = não viesado em qualquer amostra → **não**;
- momentos = mínimos quadrados → **não**;
- confiança 95% = 95% de probabilidade posterior → **não**;
- \(\alpha\) = erro tipo II → **não**;
- potência = \(\beta\) → **não; é \(1-\beta\)**;
- não rejeitar = aceitar \(H_0\) → **não**;
- valor-p = probabilidade de \(H_0\) → **não**.
