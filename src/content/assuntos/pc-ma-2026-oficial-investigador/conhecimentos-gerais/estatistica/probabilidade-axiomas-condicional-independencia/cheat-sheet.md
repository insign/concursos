# Probabilidade — revisão rápida

## Mapa central

**experimento → espaço amostral → evento → axiomas → condicionamento → independência**

- \(\Omega\): espaço amostral;
- \(A\subseteq\Omega\): evento;
- \(\varnothing\): evento impossível;
- \(A^c\): não \(A\);
- \(A\cap B\): \(A\) e \(B\);
- \(A\cup B\): \(A\) ou \(B\), normalmente inclusivo.

## Axiomas

1. **não negatividade:** \(P(A)\ge0\);
2. **normalização:** \(P(\Omega)=1\);
3. **aditividade:** eventos disjuntos somam suas probabilidades.

Consequências:

\[
P(\varnothing)=0,\qquad 0\le P(A)\le1,
\]

\[
P(A^c)=1-P(A),
\]

\[
P(A\cup B)=P(A)+P(B)-P(A\cap B).
\]

Se \(A\subseteq B\):

\[
P(A)\le P(B).
\]

## Equiprobabilidade

Em espaço finito com resultados elementares <abbr title="com a mesma probabilidade de ocorrer">equiprováveis</abbr>:

\[
P(A)=\frac{|A|}{|\Omega|}.
\]

Sem equiprobabilidade, a simples contagem de casos não basta.

## Probabilidade condicional

Se \(P(B)>0\):

\[
P(A\mid B)=\frac{P(A\cap B)}{P(B)}.
\]

**Ideia:** saber \(B\) restringe o universo de referência a \(B\).

Regra do produto:

\[
P(A\cap B)=P(A\mid B)P(B).
\]

Em geral:

\[
P(A\mid B)\ne P(B\mid A).
\]

Forma elementar de Bayes:

\[
P(A\mid B)=\frac{P(B\mid A)P(A)}{P(B)}.
\]

## Independência

\[
P(A\cap B)=P(A)P(B).
\]

Se \(P(B)>0\):

\[
P(A\mid B)=P(A).
\]

**Interpretação:** saber que \(B\) ocorreu não altera a chance de \(A\).

## Independentes × mutuamente exclusivos

| Relação | Condição |
|---|---|
| mutuamente exclusivos | \(A\cap B=\varnothing\) |
| independentes | \(P(A\cap B)=P(A)P(B)\) |

Se dois eventos mutuamente exclusivos têm probabilidades positivas, eles **não são independentes**.

## Complementos

Se \(A\) e \(B\) são independentes, também são independentes:

- \(A\) e \(B^c\);
- \(A^c\) e \(B\);
- \(A^c\) e \(B^c\).

## Reposição

- sem reposição: a composição normalmente muda → pode gerar dependência;
- com reposição: em urnas simples, restaura a composição → pode preservar independência.

Teste sempre pela probabilidade, não pela palavra “reposição”.

## Pegadinhas

- casos favoráveis / possíveis sem equiprobabilidade → **não**;
- \(A\subseteq B\Rightarrow P(A)>P(B)\) → **não**;
- mutuamente exclusivos = independentes → **não**;
- \(P(A\mid B)=P(B\mid A)\) → **não em geral**;
- independência = interseção zero → **não**;
- condicionar pela fórmula com \(P(B)=0\) → **não**.

## Recuperação em uma frase

**Condicionar muda o universo; independência é justamente o caso em que essa informação não muda a probabilidade do outro evento.**
