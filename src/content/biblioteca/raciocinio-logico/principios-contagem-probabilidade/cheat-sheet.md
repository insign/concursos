# Princípios de contagem e probabilidade

**Defina o resultado antes da fórmula:** trocar duas pessoas muda uma comissão sem cargos? Não. Muda presidente e vice? Sim. Alternativas **disjuntas** somam; etapas sucessivas multiplicam as opções efetivamente disponíveis em cada etapa.

## Escolha a contagem

Considere $n$ objetos/tipos e $k$ escolhas. Em fatoriais, $0!=1$.

| Resultado diferente quando... | Contagem | Condições |
|---|---|---|
| Usa todos os distintos e troca a ordem | $n!$ (permutação) | $n\ge0$. |
| Escolhe parte, com ordem/cargos | $A_{n,k}=\dfrac{n!}{(n-k)!}$ | $0\le k\le n$; sem reposição. |
| Escolhe parte, sem ordem | $C_{n,k}=\dfrac{n!}{k!(n-k)!}$ | $0\le k\le n$; sem reposição. |
| Escolhe em etapas, com repetição e ordem | $n^k$ | $n\ge1$, $k\ge0$; todas as opções disponíveis em cada etapa. |
| Ordena $n$ itens com cópias iguais | $\dfrac{n!}{a_1!\cdots a_r!}$ | Grupos indistinguíveis de tamanhos $a_i$, com $\sum_i a_i=n$. |
| Escolhe $k$ entre $n$ tipos, repetição sem ordem | $\binom{n+k-1}{k}$ | $n\ge1$, $k\ge0$. |
| Dispõe $n$ distintos em círculo sem assento marcado | $(n-1)!$ | $n\ge1$; rotações equivalem; reflexões só se o comando permitir. |

**Restrição:** fixe posições antes de contar; junte vizinhos em bloco e conte sua ordem interna; para separar, use lacunas ou total menos adjacentes. Em numeral, zero não ocupa a primeira posição. Trocas de cópias iguais não criam novas ordens. “Pelo menos um” costuma favorecer o complemento “nenhum”.

Para alternativas sobrepostas, subtraia a interseção: $|A\cup B|=|A|+|B|-|A\cap B|$. Em três conjuntos, subtraia as três interseções de pares e devolva a interseção tripla. Ao distribuir $N\ge0$ objetos em $r\ge1$ caixas, **alguma** contém ao menos $\lceil N/r\rceil$; isso não identifica qual nem garante quantidade exata. Com 31 objetos e 6 caixas, o maior mínimo garantido é 6: se cada caixa tivesse no máximo 5, só caberiam 30.

## Probabilidade: identifique o universo

Em espaço finito de resultados elementares <abbr title="que têm a mesma probabilidade de ocorrer">equiprováveis</abbr>, $P(A)=|A|/|\Omega|$ para evento $A$ em $\Omega$, o conjunto de todos os resultados possíveis. Em dois dados honestos distinguíveis, **36 duplas ordenadas** são <abbr title="que têm a mesma probabilidade de ocorrer">equiprováveis</abbr>; as somas não são.

| Gatilho | Regra e condição |
|---|---|
| Não A | $P(A^c)=1-P(A)$. |
| A ou B, incluindo ambos | $P(A\cup B)=P(A)+P(B)-P(A\cap B)$; se disjuntos, interseção zero. |
| A sabendo que B | $P(A\mid B)=P(A\cap B)/P(B)$, **se $P(B)>0$**; $P(A\cap B)=P(A\mid B)P(B)$. |
| A e B independentes | $P(A\cap B)=P(A)P(B)$; com $P(B)>0$, $P(A\mid B)=P(A)$. |
| Ao menos um sucesso | $1-(1-p)^t$, se $t\ge1$ tentativas independentes têm, cada uma, sucesso com chance $0\le p\le1$. |

**Exclusão mútua não é independência:** se ambos os eventos têm probabilidade positiva e não ocorrem juntos, conhecer um elimina o outro. Sem reposição, composição e chance seguinte em geral mudam; com reposição, a composição é restaurada, mas verifique as condições reais do experimento. $P(A\mid B)$ e $P(B\mid A)$ respondem a perguntas diferentes.

**Origens possíveis:** se $B_1,\ldots,B_m$ formam uma <abbr title="divisão do espaço em eventos que não se sobrepõem e cobrem todos os resultados">partição</abbr>, com $P(B_i)>0$, então $P(A)=\sum_i P(A\mid B_i)P(B_i)$. Observado $A$ com $P(A)>0$, $P(B_j\mid A)=P(A\mid B_j)P(B_j)/P(A)$. O peso inicial $P(B_j)$ é a <abbr title="probabilidade de uma origem antes de observar a nova evidência">taxa-base</abbr>; não o omita ao inverter o condicionamento.

**Conferência final:** ordem, repetição, restrição, resultados <abbr title="que têm a mesma probabilidade de ocorrer">equiprováveis</abbr>, evento condicionante e reposição; a probabilidade calculada deve estar entre 0 e 1.
