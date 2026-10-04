---
schemaVersion: 1
title: Princípios de contagem e probabilidade
description: Princípios de contagem, permutações, arranjos, combinações e fundamentos de probabilidade, condicionamento e independência.
order: 240
storageId: per-u024
---

# Princípios de contagem e probabilidade

## 1. A pergunta que vem antes da fórmula

Muitos erros deste assunto nascem antes da conta. A questão descreve uma situação — filas, comissões, senhas, urnas, dados — e o primeiro trabalho é decidir **o que conta como um resultado diferente**.

Compare:

- escolher 3 pessoas para uma comissão sem cargos;
- escolher presidente, vice-presidente e secretário entre as mesmas pessoas.

Nos dois casos há 3 escolhidos, mas trocar duas pessoas de posição só cria novo resultado no segundo. É essa diferença que separa <abbr title="seleção em que trocar a ordem não muda o resultado">combinação</abbr> de <abbr title="seleção em que posições ou funções distinguem os resultados">arranjo</abbr>.

Use este roteiro antes de procurar uma fórmula:

1. há **alternativas** ou **etapas sucessivas**?
2. a **ordem** altera o resultado?
3. usam-se todos os objetos ou apenas parte deles?
4. repetição é permitida? Há objetos indistinguíveis?
5. existe restrição de posição, adjacência ou composição?
6. em um círculo, rotações representam a mesma disposição?

A ideia central é simples: **modele primeiro; conte depois**. Probabilidade virá em seguida como uma medida aplicada aos resultados possíveis. Todos os cenários de ensino desta aula são hipotéticos.

## 2. Somar ou multiplicar: a base da contagem

### 2.1. Alternativas: princípio aditivo

Se uma escolha pode ocorrer por caminhos que não se sobrepõem, somam-se as possibilidades.

Exemplo hipotético: há 5 rotas rodoviárias e 3 ferroviárias, e nenhuma rota pertence às duas categorias. Escolher uma rota significa usar uma alternativa **ou** a outra:

$$
5+3=8.
$$

Um **conjunto** reúne os objetos ou resultados que satisfazem uma condição; sua **cardinalidade**, escrita $|A|$, é o número de elementos distintos. A **união**, $A\cup B$, reúne quem está em pelo menos um deles; a **interseção**, $A\cap B$, reúne quem está nos dois. Conjuntos **disjuntos** não têm elemento comum.

Se houver sobreposição, a soma direta conta duas vezes o que está nas duas categorias. Para dois conjuntos finitos:

$$
|A\cup B|=|A|+|B|-|A\cap B|.
$$

### 2.2. Etapas: princípio multiplicativo

Se o resultado é construído em etapas sucessivas, multiplique o número de opções disponíveis em cada etapa, desde que essa quantidade seja a mesma para cada escolha anterior. Ela pode diminuir de uma etapa para a seguinte. Se variar conforme o caminho escolhido, separe os caminhos em casos e some suas contagens.

Exemplo hipotético: com 4 camisas e 3 calças, cada escolha de camisa pode ser combinada com cada escolha de calça:

$$
4\cdot3=12.
$$

Se as opções diminuem porque não há repetição, a multiplicação acompanha essa mudança. Uma sequência de 3 letras distintas escolhidas entre 26 pode ser formada de

$$
26\cdot25\cdot24
$$

maneiras.

Esses dois princípios sustentam as fórmulas seguintes. Quando uma fórmula parecer obscura, volte a contar posição por posição.

## 3. Ordem, escolha e fatorial

O **fatorial** de um inteiro $n\ge1$, escrito $n!$, é o produto de todos os inteiros de $n$ até 1:

$$
n!=n(n-1)\cdots2\cdot1,
\qquad 0!=1.
$$

O fatorial aparece quando o número de opções cai sucessivamente de $n$ até 1.

### 3.1. Permutação: usar todos e ordenar

Com $n$ objetos distintos, usando todos e considerando a ordem:

$$
P_n=n!.
$$

Se 6 pessoas distintas formam uma fila, há

$$
6!=720
$$

filas.

### 3.2. Arranjo: escolher parte e ordenar

Escolhendo $p$ objetos distintos entre $n$, com posições distintas e sem repetir objetos, para inteiros $0\le p\le n$:

$$
A_{n,p}=\frac{n!}{(n-p)!}.
$$

A mesma contagem pode ser escrita $A(n,p)$.

Primeiro e segundo lugares entre 10 concorrentes:

$$
A_{10,2}=10\cdot9=90.
$$

### 3.3. Combinação: escolher parte sem ordenar

Se a ordem dos $p$ escolhidos não muda o resultado, para inteiros $0\le p\le n$:

$$
\binom np=C_{n,p}=\frac{n!}{p!(n-p)!}.
$$

Também se usa $C(n,p)$ para essa combinação.

Uma comissão sem cargos de 3 pessoas entre 10 pode ser formada de

$$
\binom{10}{3}=120
$$

maneiras.

A divisão por $p!$ elimina as $p!$ ordens que representam a mesma comissão. Por isso,

$$
A_{n,p}=\binom np\,p!.
$$

O mesmo modelo escolhe posições: em uma **sequência binária**, formada apenas por 0 e 1, definir quais posições recebem 1 determina o restante.

**Teste de prova:** se trocar duas pessoas escolhidas produz um resultado novo, a ordem importa; se nada muda, não importa.

## 4. Quando os objetos ou as posições não são todos distintos

### 4.1. Permutação com repetição

Se há $n$ posições e grupos de objetos indistinguíveis com quantidades $a_1,\ldots,a_r$, cuja soma é $n$, as trocas entre cópias iguais não criam novas disposições:

$$
\frac{n!}{a_1!\cdots a_r!}.
$$

Reordenar todas as letras de uma palavra produz seus **anagramas**, mesmo que a sequência resultante não forme outra palavra. Em ARARA, há 5 letras, sendo 3 A e 2 R:

$$
\frac{5!}{3!2!}=10.
$$

### 4.2. Combinação com repetição

Agora a repetição é permitida, mas a ordem não interessa. Considere escolher 4 unidades entre 3 tipos. Um resultado pode ser descrito pelas quantidades de cada tipo: $(2,0,2)$, por exemplo. Para representá-lo, escreva quatro marcas e dois separadores: $\star\star\,|\,|\,\star\star$. Cada trecho corresponde a um tipo; separadores juntos permitem quantidade zero.

Toda escolha corresponde a uma disposição dessas 6 posições, das quais escolhemos 4 para as marcas. Portanto, há $\binom64=15$ escolhas. Em geral, são $p$ marcas e $n-1$ separadores; para inteiros $n\ge1$ e $p\ge0$, a contagem é

$$
\binom{n+p-1}{p}.
$$

Exemplo hipotético: escolher 4 bolas de sorvete entre 6 sabores, podendo repetir sabor:

$$
\binom94=126.
$$

### 4.3. Permutação circular

Em uma mesa redonda sem lugar marcado, girar todos os participantes ao mesmo tempo não cria uma disposição nova. Com $n\ge1$ pessoas distintas, fixe uma como referência e ordene as demais:

$$
P_n^{\text{circular}}=(n-1)!.
$$

Reflexões continuam distintas, salvo se o enunciado disser que também devem ser identificadas.

## 5. Restrições: conte a estrutura antes dos detalhes

### 5.1. Posições fixas

Se um objeto já tem posição determinada, fixe-o e conte apenas o restante. Dez objetos distintos com dois deles presos a posições específicas deixam 8 objetos livres, portanto $8!$ disposições.

### 5.2. Objetos juntos: forme um bloco

Exemplo hipotético: 5 pessoas distintas, com Ana e Bruno obrigatoriamente juntos.

O par funciona primeiro como uma unidade. Assim há 4 unidades a ordenar e, dentro do bloco, 2 ordens possíveis:

$$
4!\cdot2!=48.
$$

### 5.3. Objetos separados: lacunas ou complemento

Com 6 pessoas, para Ana e Bruno não ficarem adjacentes, duas estratégias dão o mesmo resultado. O **complemento** da condição desejada reúne as filas em que eles ficam juntos: conte todas e retire as que violam a separação.

Pelo complemento:

$$
6!-2\cdot5!=480.
$$

Pelas lacunas, ordene primeiro as outras 4 pessoas. Surgem 5 lacunas; escolha uma para Ana e outra, diferente, para Bruno:

$$
4!\cdot5\cdot4=480.
$$

### 5.4. Primeiro algarismo

Zero pode ser usado em um número, mas não como primeiro algarismo. Para números de quatro algarismos distintos:

$$
9\cdot9\cdot8\cdot7=4\,536.
$$

O primeiro fator é 9 porque há 9 escolhas não nulas; depois restam 9 algarismos, incluindo o zero se ainda não foi usado.

## 6. Complemento, inclusão-exclusão e casa dos pombos

### 6.1. Contar o que não queremos

Quando a condição desejada é ampla, o complemento costuma ser menor e mais fácil:

$$
N(\text{desejado})=N(\text{total})-N(\text{indesejado}).
$$

Em 4 lançamentos de dado, o número de sequências com pelo menos um 6 é

$$
6^4-5^4=671.
$$

O complemento de “pelo menos um” é **nenhum**, não “exatamente um”.

### 6.2. Inclusão-exclusão

Para dois conjuntos:

$$
|A\cup B|=|A|+|B|-|A\cap B|.
$$

Para três:

$$
|A\cup B\cup C|
=|A|+|B|+|C|
-|A\cap B|-|A\cap C|-|B\cap C|
+|A\cap B\cap C|.
$$

A lógica é corrigir contagens repetidas: somam-se os grupos, subtraem-se as sobreposições de pares e devolve-se a região tripla, que foi retirada em excesso.

Na região tripla, 3 somas e 3 subtrações deixam zero; a última parcela repõe a única contagem que deve ficar.

As interseções de pares incluem quem está nos três conjuntos. Para obter uma região de exatamente dois, retire dela a interseção tripla. As operações necessárias foram definidas na seção 2; aqui não se exige outro capítulo de conjuntos.

### 6.3. Princípio da casa dos pombos

Ao distribuir um inteiro $N\ge0$ de objetos em um inteiro $r\ge1$ de caixas, alguma caixa recebe pelo menos

$$
\left\lceil\frac Nr\right\rceil
$$

objetos. Os sinais $\lceil\ \rceil$ indicam arredondamento para o menor inteiro maior ou igual ao quociente.

Com 13 pessoas distribuídas pelos 12 meses de aniversário, algum mês contém ao menos 2 aniversariantes. Com 31 processos entre 6 equipes, alguma equipe recebe ao menos 6: se todas recebessem no máximo 5, só haveria 30 processos. A distribuição $6,5,5,5,5,5$ mostra que não se pode garantir 7.

A conclusão é de **existência mínima garantida**: o princípio não identifica a caixa nem afirma que o limite é exato.

## 7. Da contagem à probabilidade

Contagem pergunta “quantos resultados existem?”. Probabilidade pergunta “qual é o peso do evento entre os resultados possíveis?”.

Um **experimento aleatório** tem resultados possíveis conhecidos, mas o resultado de uma realização não é determinado antecipadamente. O **espaço amostral** $\Omega$ reúne os resultados elementares possíveis; um **evento** é um subconjunto de $\Omega$.

Em dois lançamentos de moeda, distinguindo a ordem e usando C para cara e K para coroa:

$$
\Omega=\{CC,CK,KC,KK\}.
$$

O evento “exatamente uma cara” é

$$
\{CK,KC\}.
$$

Em espaço amostral finito e não vazio, se os resultados elementares têm a mesma probabilidade — são **equiprováveis** — então

$$
P(A)=\frac{|A|}{|\Omega|}.
$$

Essa razão não vale automaticamente para categorias finais que não sejam equiprováveis. Em dois dados honestos distinguíveis lançados de forma independente, as 36 duplas ordenadas são equiprováveis; as somas 2,3,\ldots,12 não são. A soma 7 vem de seis duplas: $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$; sua probabilidade é $6/36=1/6$, e não $1/11$.

Propriedades básicas:

$$
0\le P(A)\le1,
\qquad P(\Omega)=1,
\qquad P(\varnothing)=0.
$$

## 8. “Não”, “ou” e eventos incompatíveis

O complemento reúne tudo o que está fora de $A$:

$$
P(A^c)=1-P(A).
$$

Para a união de dois eventos:

$$
P(A\cup B)=P(A)+P(B)-P(A\cap B).
$$

Eventos são **mutuamente exclusivos** quando não podem ocorrer juntos:

$$
A\cap B=\varnothing.
$$

Nesse caso,

$$
P(A\cup B)=P(A)+P(B).
$$

Em linguagem de prova, “$A$ ou $B$” normalmente é inclusivo: admite $A$, $B$ ou ambos. Só se elimina a interseção quando o contexto indicar exclusividade.

A interseção não pode ter probabilidade maior que qualquer um dos dois eventos, e a união não pode exceder 1. Assim,

$$
\max(0,P(A)+P(B)-1)\le P(A\cap B)\le\min(P(A),P(B)).
$$

Se $P(A)=0{,}6$ e $P(B)=0{,}8$, a sobreposição vai de $0{,}4$ a $0{,}6$. Ela é obrigatória, mas isso não decide a independência: o produto $0{,}48$ está dentro do intervalo possível.

## 9. Condicionar é mudar o universo de referência

A informação “sabendo que $B$ ocorreu” elimina resultados fora de $B$. Por exemplo, escolha uniformemente um dos números de 1 a 6. Seja $A$ “maior que 3” e $B$ “par”. Sem informação, $P(A)=3/6$. Sabendo que saiu par, restam apenas $\{2,4,6\}$; dois deles são maiores que 3, portanto $P(A\mid B)=2/3$.

Esse novo denominador explica a **probabilidade condicional**. Se $P(B)>0$,

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}.
$$

O denominador deixa de ser o espaço original e passa a ser o evento condicionante $B$.

Da definição vem a regra do produto:

$$
P(A\cap B)=P(A\mid B)P(B).
$$

Também, se $P(A)>0$,

$$
P(A\cap B)=P(B\mid A)P(A).
$$

A interseção é a mesma nas duas expressões, mas os universos condicionantes são diferentes. Portanto, em geral,

$$
P(A\mid B)\ne P(B\mid A).
$$

## 10. Independência, exclusão mútua e reposição

Eventos $A$ e $B$ são **independentes** quando saber que um ocorreu não altera a probabilidade do outro. Algebricamente,

$$
P(A\cap B)=P(A)P(B).
$$

Quando a condicional está definida, isso equivale a

$$
P(A\mid B)=P(A).
$$

### 10.1. Exclusão mútua não é independência

Se $A$ e $B$ são mutuamente exclusivos e ambos têm probabilidade positiva,

$$
P(A\cap B)=0
\neq P(A)P(B).
$$

Logo, são dependentes. Exclusão mútua significa “não ocorrem juntos”; independência significa “a ocorrência de um não muda a chance do outro”.

### 10.2. Complementos de eventos independentes

Se $A$ e $B$ são independentes, complementar um ou ambos preserva a independência. Por exemplo,

$$
P(A\cap B^c)=P(A)P(B^c).
$$

Isso segue de

$$
P(A\cap B^c)=P(A)-P(A\cap B)
=P(A)-P(A)P(B)
=P(A)(1-P(B)).
$$

### 10.3. Com e sem reposição

Considere uma urna com 3 bolas vermelhas e 2 azuis, cada bola com igual chance de ser retirada em cada sorteio. Com reposição, a urna é misturada novamente e os sorteios são independentes.

Sem reposição, retirar uma vermelha altera a composição:

$$
P(\text{duas vermelhas})
=\frac35\cdot\frac24
=\frac3{10}.
$$

Com reposição, a composição é restaurada entre as retiradas:

$$
P(\text{duas vermelhas})
=\frac35\cdot\frac35
=\frac9{25}.
$$

Não conclua apenas pela palavra “reposição” que quaisquer eventos são independentes; verifique o experimento. Em urnas simples como esta, essas condições mantêm as probabilidades e a independência entre etapas.

## 11. “Pelo menos um” em tentativas repetidas

Em $n$ tentativas independentes, cada uma com probabilidade $p$ de sucesso, “ao menos um sucesso” é o complemento de “nenhum sucesso”:

$$
P(\text{ao menos um sucesso})
=1-(1-p)^n.
$$

A fórmula exige independência e a mesma probabilidade de fracasso $1-p$ em cada tentativa. Sem essas condições, calcule o complemento etapa por etapa.

Exemplo: em 3 lançamentos independentes de moeda honesta,

$$
P(\text{ao menos uma cara})
=1-\left(\frac12\right)^3
=\frac78.
$$

Para **exatamente** duas caras, o raciocínio é outro: escolha quais 2 das 3 posições terão cara. Há $\binom32=3$ sequências favoráveis entre $2^3=8$ sequências <abbr title="com a mesma probabilidade de ocorrer">equiprováveis</abbr>, logo $3/8$.

## 12. Probabilidade total e Bayes: dividir por origens

Considere um lote hipotético com 1.000 peças: 600 vieram da máquina 1, com taxa de defeito de 2%; 400 vieram da máquina 2, com taxa de 5%. Há 12 defeituosas da primeira e 20 da segunda, totalizando 32. Uma peça escolhida uniformemente tem chance $32/1000=0{,}032$ de defeito: soma dos dois caminhos.

Se já sabemos que a peça é defeituosa, olhamos apenas para as 32 defeituosas. Vinte vieram da máquina 2, portanto a chance dessa origem é $20/32=5/8$. Esse valor não é 5%, que responde a “qual a chance de defeito entre as peças da máquina 2?”. Mudou a referência: das peças da máquina 2 para todas as defeituosas.

Para generalizar, chame o defeito de $A$ e as origens de $B_1,\ldots,B_k$. As origens não se sobrepõem e cobrem todo o espaço amostral: formam uma **partição** de $\Omega$, na qual cada resultado pertence a exatamente uma origem.

Se $P(B_i)>0$, a probabilidade de $A$ pode ser reconstruída somando os caminhos que levam a $A$:

$$
P(A)=\sum_{i=1}^k P(A\mid B_i)P(B_i).
$$

Esse é o teorema da probabilidade total. O símbolo $\sum$ manda somar a parcela de cada origem.

Bayes responde à pergunta inversa: depois de observar $A$, qual é a probabilidade de a origem ser $B_j$?

$$
P(B_j\mid A)
=
\frac{P(A\mid B_j)P(B_j)}
{\sum_i P(A\mid B_i)P(B_i)},
$$

desde que $P(A)>0$.

A probabilidade inicial $P(B_j)$ — a **taxa-base**, isto é, a chance da origem antes da nova evidência — participa do cálculo. Por isso não se pode trocar automaticamente $P(A\mid B)$ por $P(B\mid A)$.

No lote, $P(B_2\mid A)=0{,}05\cdot0{,}4/0{,}032=5/8$. A contagem e a fórmula de Bayes realizam a mesma mudança de referência.

## 13. A conferência que evita responder ao problema errado

Uma contagem precisa respeitar o que distingue resultados, a ordem, a repetição e as restrições. Uma probabilidade exige ainda o modelo do sorteio: resultados equiprováveis ou pesos informados, universo condicionado e dependência entre etapas. “Aleatório” não garante sozinho que todas as categorias finais tenham igual chance.

Se duas fórmulas parecem possíveis, retorne à pergunta inicial: **quais resultados são diferentes e como são gerados?** Depois confira se contou cada resultado uma vez e se a probabilidade está entre 0 e 1. Um valor nesse intervalo pode continuar errado se o denominador ou o evento forem outros.

**Recorte:** item 4 de Raciocínio Lógico e Científico do Cargo 1 — Agente de Perícia Criminal — Generalista. A leitura lógica de “e”, “ou” e negação se relaciona a **Proposições, conectivos e tabelas-verdade** e **Equivalências e leis de De Morgan**; as operações necessárias à contagem foram ensinadas aqui. Fontes e limites de consulta estão nas referências.
