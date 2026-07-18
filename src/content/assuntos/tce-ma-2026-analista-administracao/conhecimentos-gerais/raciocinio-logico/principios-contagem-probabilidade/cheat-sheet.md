# Princípios de contagem e probabilidade

## Diagnóstico rápido

1. O problema oferece alternativas ou etapas?
2. A ordem altera o resultado?
3. Todos os objetos são usados?
4. Há repetição ou objetos indistinguíveis?
5. Rotações são equivalentes?
6. Existe restrição de posição, adjacência ou composição?

## Princípios básicos

| Situação | Operação |
|---|---|
| alternativas mutuamente excludentes | somar |
| etapas sucessivas | multiplicar |
| categorias sobrepostas | inclusão-exclusão |
| “pelo menos um” | tentar complemento |

## Fatorial

$$
n!=n(n-1)\cdots2\cdot1,
\qquad 0!=1.
$$

## Modelos de contagem

| Modelo | Fórmula | Critério |
|---|---|---|
| permutação simples | $P_n=n!$ | usa todos; ordem importa |
| arranjo simples | $A_{n,p}=\dfrac{n!}{(n-p)!}$ | escolhe $p$; ordem importa |
| combinação simples | $\binom np=\dfrac{n!}{p!(n-p)!}$ | escolhe $p$; ordem não importa |
| permutação com repetição | $\dfrac{n!}{a_1!\cdots a_r!}$ | cópias indistinguíveis |
| permutação circular | $(n-1)!$ | rotações equivalentes |
| combinação com repetição | $\binom{n+p-1}{p}$ | ordem não importa; repetição permitida |

Relação:

$$
A_{n,p}=\binom np p!.
$$

## Restrições

- **Juntos:** forme um bloco e conte sua ordem interna.
- **Separados:** ordene os demais e use lacunas distintas.
- **Posição fixa:** retire objeto e posição antes de permutar.
- **Primeiro algarismo:** zero não pode iniciar número.
- **Letras repetidas:** divida pelos fatoriais das multiplicidades.
- **Círculo:** fixe uma pessoa; não identifique reflexões salvo indicação.

## Complemento

$$
N(\text{desejado})=N(\text{total})-N(\text{indesejado}).
$$

Exemplo, pelo menos um 6 em quatro dados:

$$
6^4-5^4=671.
$$

## Inclusão-exclusão

Dois grupos:

$$
|A\cup B|=|A|+|B|-|A\cap B|.
$$

Três grupos:

$$
|A\cup B\cup C|
=\sum|A|-\sum|A\cap B|+|A\cap B\cap C|.
$$

Interseção inclusiva contém quem está nos três grupos. Para obter “somente dois”, retire a interseção tripla.

## Casas dos pombos

$$
N\text{ objetos em }r\text{ caixas}
\Rightarrow
\text{alguma caixa tem ao menos }
\left\lceil\frac Nr\right\rceil.
$$

## Vocabulário probabilístico

| Conceito | Ideia |
|---|---|
| experimento aleatório | resultado particular não conhecido previamente |
| espaço amostral $\Omega$ | resultados elementares possíveis |
| evento $A$ | subconjunto de $\Omega$ |
| equiprobabilidade | resultados elementares com a mesma probabilidade |

Em espaço finito equiprovável:

$$
P(A)=\frac{|A|}{|\Omega|}.
$$

## Propriedades

$$
0\le P(A)\le1,
\qquad P(\Omega)=1,
\qquad P(\varnothing)=0.
$$

Complemento:

$$
P(A^c)=1-P(A).
$$

União:

$$
P(A\cup B)=P(A)+P(B)-P(A\cap B).
$$

Se $A$ e $B$ são mutuamente exclusivos:

$$
P(A\cap B)=0.
$$

## Pelo menos um sucesso

Para $n$ tentativas independentes, com probabilidade $p$ de sucesso em cada uma:

$$
P(\text{ao menos um})=1-(1-p)^n.
$$

## Condicional

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)},
\qquad P(B)>0.
$$

Condicionar muda o universo de referência para $B$.

## Regra do produto

Com $P(B)>0$:

$$
P(A\cap B)=P(A\mid B)P(B).
$$

Somente com independência:

$$
P(A\cap B)=P(A)P(B).
$$

## Independência

Equivalências, quando as condicionais estão definidas:

$$
P(A\cap B)=P(A)P(B),
$$

$$
P(A\mid B)=P(A),
\qquad
P(B\mid A)=P(B).
$$

- Eventos positivos e mutuamente exclusivos não são independentes.
- Se $A$ e $B$ são independentes, seus complementos também preservam independência.

## Reposição

Urna com 3 vermelhas e 2 azuis; duas vermelhas:

Sem reposição:

$$
\frac35\cdot\frac24=\frac3{10}.
$$

Com reposição:

$$
\frac35\cdot\frac35=\frac9{25}.
$$

## Probabilidade total

Se $B_1,\ldots,B_k$ formam partição e $P(B_i)>0$:

$$
P(A)=\sum_iP(A\mid B_i)P(B_i).
$$

## Bayes

Com $P(A)>0$:

$$
P(B_j\mid A)=
\frac{P(A\mid B_j)P(B_j)}{\sum_iP(A\mid B_i)P(B_i)}.
$$

Não descarte as taxas-base $P(B_j)$ e não inverta condicionais diretamente.

## Modelos clássicos

- $n$ moedas honestas: $2^n$ sequências equiprováveis.
- Dois dados distinguíveis: 36 duplas ordenadas.
- Exatamente $k$ sucessos em $n$ posições: escolha posições com $\binom nk$.
- Senhas: conte posição por posição e verifique repetição.
- Urnas/cartas: identifique ordem e reposição.

## Valores oficiais BNB 2018

Tabuleiro com 144 quadrados: 54 azuis, 30 marrons, 40 amarelos e 20 verdes.

$$
P(\text{azul})=\frac38,
\quad
P(\text{não marrom})=\frac{19}{24},
\quad
P(\text{amarelo ou verde})=\frac5{12}.
$$

Fila com 10 animais distintos:

- dois animais determinados em posições fixas: $8!$;
- três determinados nas primeiras posições, qualquer ordem: $3!\cdot7!$;
- três juntos em ordem interna fixa: $8!$.

## Pegadinhas

- Comissão não é pódio.
- Repetição permitida não é reposição implícita; leia o enunciado.
- “Pelo menos um” tem complemento “nenhum”.
- “Ou” é inclusivo, salvo exclusividade expressa.
- Somar eventos sobrepostos exige retirar a interseção.
- Multiplicar marginais exige independência.
- Sem reposição, o denominador muda.
- $P(A\mid B)$ não é $P(B\mid A)$.
- Somas de dois dados não são equiprováveis.
- Rotação e reflexão são equivalências diferentes.

## Checklist final

1. Defini um resultado elementar?
2. Verifiquei ordem e repetição?
3. Tratei restrições antes da fórmula?
4. Os casos contados são equiprováveis?
5. Traduzi “não”, “ou”, “e” e “sabendo que” corretamente?
6. Usei condicional quando há dependência?
7. O valor probabilístico ficou entre 0 e 1?
