# Princípios de contagem e probabilidade

## Matriz de decisão

| Pergunta | Se sim |
|---|---|
| alternativas mutuamente excludentes? | somar |
| etapas sucessivas? | multiplicar |
| usa todos os objetos distintos e ordem importa? | permutação |
| escolhe parte e ordem importa? | arranjo |
| escolhe parte e ordem não importa? | combinação |
| há cópias indistinguíveis? | dividir pelos fatoriais das repetições |
| repetição permitida e ordem não importa? | combinação com repetição |
| rotações são equivalentes? | permutação circular |

## Fórmulas de contagem

$$
n!,\qquad 0!=1
$$

$$
P_n=n!
$$

$$
A_{n,p}=\frac{n!}{(n-p)!}
$$

$$
C_{n,p}=\binom np=\frac{n!}{p!(n-p)!}
$$

$$
A_{n,p}=C_{n,p}\,p!
$$

Permutação com repetição:

$$
\frac{n!}{a_1!\cdots a_r!}
$$

Circular:

$$
(n-1)!
$$

Combinação com repetição:

$$
\binom{n+p-1}{p}
$$

## Restrições

- **Juntos:** forme um bloco; conte a ordem interna se ela puder variar.
- **Separados:** use lacunas ou total menos adjacentes.
- **Posição fixa:** retire objeto e posição antes de permutar.
- **Número:** zero não inicia numeral.
- **Repetidos:** trocas de cópias iguais não criam novo resultado.
- **Círculo:** rotações coincidem; reflexão só coincide se o enunciado disser.

## Complemento e inclusão-exclusão

Contagem:

$$
N(\text{desejado})
=N(\text{total})-N(\text{indesejado})
$$

Dois conjuntos:

$$
|A\cup B|=|A|+|B|-|A\cap B|
$$

Três:

$$
|A\cup B\cup C|
=\sum|A|-\sum|A\cap B|+|A\cap B\cap C|
$$

> “Pelo menos um” → pense primeiro em **nenhum**.

## Casa dos pombos

$$
N\text{ objetos em }r\text{ caixas}
\Rightarrow
\text{alguma caixa tem ao menos }
\left\lceil\frac Nr\right\rceil
$$

## Probabilidade básica

Em espaço finito **equiprovável**:

$$
P(A)=\frac{|A|}{|\Omega|}
$$

$$
0\le P(A)\le1
$$

$$
P(A^c)=1-P(A)
$$

$$
P(A\cup B)
=P(A)+P(B)-P(A\cap B)
$$

Se mutuamente exclusivos:

$$
P(A\cap B)=0
$$

## Condicional × independência

Condicional:

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)},
\qquad P(B)>0
$$

Produto:

$$
P(A\cap B)=P(A\mid B)P(B)
$$

Independência:

$$
P(A\cap B)=P(A)P(B)
$$

Quando definida:

$$
P(A\mid B)=P(A)
$$

> **Não confunda exclusão mútua com independência.** Eventos positivos mutuamente exclusivos são dependentes.

## Reposição

Sem reposição: composição e denominador normalmente mudam.

Com reposição: composição é restaurada.

Exemplo, urna com 3 vermelhas e 2 azuis:

$$
P(VV\text{ sem reposição})
=\frac35\frac24=\frac3{10}
$$

$$
P(VV\text{ com reposição})
=\frac35\frac35=\frac9{25}
$$

## Pelo menos um sucesso

Se as $n$ tentativas são independentes e cada uma tem sucesso com probabilidade $p$:

$$
P(\ge1\text{ sucesso})
=1-(1-p)^n
$$

## Probabilidade total e Bayes

Se $B_1,\ldots,B_k$ formam partição:

$$
P(A)=\sum_iP(A\mid B_i)P(B_i)
$$

Bayes:

$$
P(B_j\mid A)
=
\frac{P(A\mid B_j)P(B_j)}
{\sum_iP(A\mid B_i)P(B_i)}
$$

> Taxa-base importa. Em geral, $P(A\mid B)\ne P(B\mid A)$.

## Modelos rápidos

- $n$ moedas honestas → $2^n$ sequências equiprováveis.
- dois dados distinguíveis → 36 duplas ordenadas.
- exatamente $k$ posições especiais em $n$ → $\binom nk$.
- senha/código → conte posição por posição.
- urna/cartas → verifique ordem e reposição.

## Pegadinhas

- Comissão ≠ pódio.
- Alternativas somam; etapas multiplicam.
- Repetição não é automática.
- “Pelo menos um” → complemento “nenhum”.
- Somas de dois dados não são equiprováveis.
- Zero não pode ocupar o primeiro algarismo.
- União sobreposta exige subtrair a interseção.
- Multiplicar $P(A)P(B)$ exige independência.
- Sem reposição, a segunda probabilidade muda.
- $P(A\mid B)$ ≠ $P(B\mid A)$.
- Rotação ≠ reflexão.

## Checklist

1. O que conta como resultado diferente?
2. A ordem importa?
3. Há repetição ou objetos iguais?
4. Existem restrições de posição ou adjacência?
5. Os resultados elementares são equiprováveis?
6. Há informação condicionante?
7. Há reposição?
8. O resultado probabilístico ficou entre 0 e 1?
