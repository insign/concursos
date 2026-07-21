---
schemaVersion: 1
title: Princípios de contagem e probabilidade
description: Modelagem de contagens, permutações, arranjos, combinações e fundamentos de probabilidade, condicionamento, independência e Bayes.
order: 41
storageId: contagem-probabilidade
---

## 1. Contar antes de calcular probabilidades

Contagem e probabilidade aparecem juntas porque, em muitos problemas finitos, a probabilidade é obtida por uma razão entre quantidades:

$$
P(A)=\frac{\text{número de resultados favoráveis a }A}{\text{número total de resultados possíveis}}.
$$

Essa fórmula só pode ser usada diretamente quando os resultados elementares são **equiprováveis**. Antes de dividir, portanto, é necessário:

1. definir o que constitui um resultado elementar;
2. verificar se esses resultados têm a mesma probabilidade;
3. contar corretamente o espaço amostral;
4. contar os resultados favoráveis sem omissões nem duplicações.

O maior risco não costuma ser a aritmética. É escolher um modelo incompatível com a ordem, a repetição ou as restrições do enunciado.

### 1.1. Fronteiras deste assunto

| Recurso | Tratamento aqui |
|---|---|
| união, interseção e complemento | linguagem mínima para eventos e inclusão-exclusão |
| operações gerais com conjuntos | Assunto 042 |
| problemas aritméticos, geométricos e matriciais | Assuntos 043 a 045 |
| variáveis aleatórias, esperança e distribuições | fora do item introdutório do edital |

## 2. Diagnóstico do problema de contagem

Antes de escolher uma fórmula, responda:

1. há alternativas excludentes ou etapas sucessivas?
2. todos os objetos serão usados ou apenas parte deles?
3. a ordem altera o resultado?
4. há repetição permitida ou objetos indistinguíveis?
5. posições circulares que diferem apenas por rotação são equivalentes?
6. há restrição de posição, adjacência, composição ou quantidade?

Compare:

| Situação | Ordem importa? | Repetição? | Modelo inicial |
|---|---:|---:|---|
| formar comissão de 3 entre 10 pessoas | não | não | combinação |
| atribuir presidência, vice e secretaria | sim | não | arranjo |
| ordenar 10 pessoas em fila | sim | não | permutação |
| criar PIN de 4 algarismos | sim | conforme o enunciado | produto por etapas |
| sentar pessoas em mesa redonda | sim, salvo rotação | não | permutação circular |
| escolher 4 bolas de sorvete entre 6 sabores | não | sim | combinação com repetição |

> Fórmulas são atalhos para modelos já compreendidos. Se o modelo estiver errado, a fórmula apenas acelera o erro.

## 3. Princípio aditivo

Se uma escolha pode ser feita por alternativas **mutuamente excludentes**, somam-se as quantidades.

Se há 5 rotas exclusivamente rodoviárias e 3 exclusivamente ferroviárias, o número de maneiras de escolher uma dessas rotas é

$$
5+3=8.
$$

### 3.1. Cuidado com sobreposição

Se um resultado pertence a duas categorias, a soma direta o conta duas vezes. Nesse caso, é preciso separar os casos ou usar inclusão-exclusão:

$$
|A\cup B|=|A|+|B|-|A\cap B|.
$$

## 4. Princípio multiplicativo

Se um processo ocorre em etapas sucessivas, multiplica-se o número de escolhas disponíveis em cada etapa.

Com 4 camisas e 3 calças, há

$$
4\cdot3=12
$$

trajes formados por uma camisa e uma calça.

### 4.1. Quantidades que mudam entre etapas

Para formar uma sequência de 3 letras distintas escolhidas entre 26:

$$
26\cdot25\cdot24.
$$

Sem repetição, cada escolha reduz as opções seguintes.

### 4.2. Restrições desde a primeira etapa

Quantos números de quatro algarismos distintos existem?

- primeiro algarismo: 9 opções, pois zero é proibido;
- segundo: 9 opções, incluindo zero, mas excluindo o primeiro;
- terceiro: 8 opções;
- quarto: 7 opções.

Logo,

$$
9\cdot9\cdot8\cdot7=4\,536.
$$

Não conte todas as sequências para depois esquecer que números não começam por zero.

## 5. Fatorial

Para inteiro $n\ge1$:

$$
n!=n(n-1)(n-2)\cdots2\cdot1.
$$

Por convenção:

$$
0!=1.
$$

Essa convenção mantém fórmulas como

$$
A_{n,n}=\frac{n!}{(n-n)!}=\frac{n!}{0!}=n!.
$$

## 6. Permutação simples

Uma permutação simples ordena todos os $n$ objetos distintos:

$$
P_n=n!.
$$

Seis pessoas distintas podem ocupar uma fila de

$$
6!=720
$$

maneiras.

### 6.1. Posições fixas

Se duas posições de uma fila de 10 objetos já estão ocupadas por objetos determinados, restam 8 objetos para 8 posições:

$$
8!.
$$

### 6.2. Objetos juntos: método do bloco

Para ordenar 5 pessoas distintas mantendo Ana e Bruno juntos:

1. trate o par como um bloco;
2. ordene o bloco e as outras 3 pessoas: $4!$;
3. ordene Ana e Bruno dentro do bloco: $2!$.

Portanto:

$$
4!\cdot2!=48.
$$

Se a ordem interna estiver fixada, o fator $2!$ desaparece.

### 6.3. Objetos separados: método das lacunas

Para evitar adjacência entre duas pessoas:

1. ordene primeiro os demais objetos;
2. identifique as lacunas antes, entre e depois deles;
3. escolha lacunas distintas para os objetos que devem permanecer separados.

Com 4 pessoas-base, há 5 lacunas. Colocar duas pessoas distintas em duas lacunas distintas produz

$$
4!\cdot5\cdot4=480.
$$

## 7. Permutação com repetição

Se há $n$ posições e grupos de objetos indistinguíveis com multiplicidades $a_1,a_2,\ldots,a_r$, em que

$$
a_1+a_2+\cdots+a_r=n,
$$

o número de ordenações distintas é

$$
\frac{n!}{a_1!a_2!\cdots a_r!}.
$$

Na palavra ARARA, há 5 letras, com 3 letras A e 2 letras R:

$$
\frac{5!}{3!2!}=10.
$$

Dividir corrige as trocas entre cópias indistinguíveis, que não criam nova palavra.

## 8. Permutação circular

Em uma mesa redonda sem lugar marcado, rotações representam a mesma disposição. Fixe uma pessoa como referência e ordene as restantes:

$$
P_n^{\text{circular}}=(n-1)!.
$$

Para 7 pessoas:

$$
(7-1)!=720.
$$

### 8.1. Rotação não é reflexão

Em uma mesa, inverter o sentido horário normalmente produz outra disposição. Reflexões só são identificadas quando o enunciado trata de colar, pulseira ou outra estrutura em que virar o objeto preserva a configuração.

## 9. Arranjo simples

Um arranjo escolhe $p$ objetos entre $n$ e os coloca em posições distintas. A ordem importa:

$$
A_{n,p}=n(n-1)\cdots(n-p+1)=\frac{n!}{(n-p)!}.
$$

Escolher campeão, vice e terceiro entre 10 participantes produz

$$
A_{10,3}=10\cdot9\cdot8=720.
$$

Trocar campeão e vice altera o resultado.

## 10. Combinação simples

Uma combinação escolhe $p$ objetos entre $n$ sem considerar a ordem:

$$
\binom np=C_{n,p}=\frac{n!}{p!(n-p)!}.
$$

Escolher uma comissão de 3 pessoas entre 10 produz

$$
\binom{10}{3}=120.
$$

As seleções {Ana, Bruno, Carla} e {Carla, Ana, Bruno} são a mesma comissão.

### 10.1. Relação entre arranjo e combinação

Cada grupo não ordenado de $p$ elementos possui $p!$ ordenações. Por isso:

$$
A_{n,p}=\binom np p!.
$$

### 10.2. Selecionar e depois atribuir funções

Escolher 2 pessoas entre 8 e, entre elas, designar uma como coordenadora:

$$
\binom82\cdot2=28\cdot2=56.
$$

Isso equivale a $A_{8,2}$, mas a decomposição pode refletir melhor o enunciado.

## 11. Combinação com repetição

Quando se escolhem $p$ unidades entre $n$ tipos, a repetição é permitida e a ordem não importa, usa-se

$$
CR_{n,p}=\binom{n+p-1}{p}.
$$

Escolher 4 bolas de sorvete entre 6 sabores, permitindo repetir sabores, produz

$$
\binom{6+4-1}{4}=\binom94=126.
$$

O modelo também é conhecido como **estrelas e barras**: as unidades são estrelas, e $n-1$ separadores dividem as quantidades atribuídas aos tipos.

## 12. Como decidir entre as fórmulas

| Pergunta | Sim | Não |
|---|---|---|
| todos os objetos distintos são usados? | permutação | prossiga |
| apenas parte é escolhida e a ordem importa? | arranjo | combinação |
| há objetos indistinguíveis? | dividir pelas repetições | não dividir |
| a repetição é permitida e a ordem não importa? | combinação com repetição | combinação simples |
| rotações são equivalentes? | permutação circular | arranjo linear |

Não aplique essa tabela mecanicamente. Uma questão com restrições pode exigir princípio multiplicativo, blocos, lacunas ou complemento, mesmo que o modelo-base seja uma permutação ou combinação.

## 13. Contagem por complemento

Quando a condição desejada é “pelo menos um”, “não todos”, “nenhum adjacente” ou outra condição ampla, pode ser mais simples contar o total e retirar o indesejado:

$$
N(\text{desejado})=N(\text{total})-N(\text{indesejado}).
$$

### 13.1. Exemplo com dados

Quantas sequências de 4 lançamentos de dado contêm pelo menos um resultado 6?

- total: $6^4$;
- sem nenhum 6: $5^4$.

Logo:

$$
6^4-5^4=1\,296-625=671.
$$

O complemento de “pelo menos um 6” é “nenhum 6”, não “exatamente um 6”.

## 14. Inclusão-exclusão

### 14.1. Dois grupos

Se 40 pessoas dominam planilhas, 35 dominam bancos de dados e 15 dominam ambos:

$$
|P\cup B|=40+35-15=60.
$$

A interseção é subtraída porque foi contada uma vez em cada grupo.

### 14.2. Três grupos

$$
|A\cup B\cup C|
=|A|+|B|+|C|
-|A\cap B|-|A\cap C|-|B\cap C|
+|A\cap B\cap C|.
$$

A interseção tripla é adicionada no fim porque foi somada três vezes e subtraída três vezes, ficando temporariamente com contagem zero.

Use apenas a linguagem de conjuntos necessária ao cálculo. O estudo geral de operações com conjuntos pertence ao assunto seguinte.

## 15. Princípio da casa dos pombos

Distribuir $N$ objetos em $r$ caixas garante que alguma caixa contenha pelo menos

$$
\left\lceil\frac Nr\right\rceil
$$

objetos.

Exemplos:

- entre 13 pessoas, pelo menos duas fazem aniversário no mesmo mês;
- distribuindo 31 processos entre 6 equipes, alguma equipe recebe pelo menos $\lceil31/6\rceil=6$ processos.

O princípio prova existência. Ele não identifica qual caixa possui a concentração garantida.

## 16. Experimento, espaço amostral e evento

Um **experimento aleatório** tem resultados possíveis conhecidos, mas seu resultado particular não é determinado antecipadamente.

O **espaço amostral** $\Omega$ reúne todos os resultados elementares possíveis. Um **evento** $A$ é um subconjunto de $\Omega$.

Para dois lançamentos de moeda:

$$
\Omega=\{CC,CK,KC,KK\},
$$

em que $C$ representa cara e $K$, coroa.

O evento “exatamente uma cara” é

$$
A=\{CK,KC\}.
$$

### 16.1. Escolha resultados elementares adequados

Ao lançar dois dados, as 36 duplas ordenadas $(i,j)$ são equiprováveis. As somas de 2 a 12 não são equiprováveis: soma 7 ocorre de 6 maneiras, mas soma 2 ocorre de uma única maneira.

## 17. Probabilidade em espaço finito equiprovável

Se todos os resultados elementares de um espaço finito são igualmente prováveis:

$$
P(A)=\frac{|A|}{|\Omega|}.
$$

Em um dado honesto:

$$
P(\text{resultado maior que 4})=\frac{2}{6}=\frac13.
$$

### 17.1. Axiomas e consequências

Para qualquer evento $A$:

$$
0\le P(A)\le1,
$$

$$
P(\Omega)=1,
$$

$$
P(\varnothing)=0.
$$

Se $A\subseteq B$, então

$$
P(A)\le P(B).
$$

## 18. Complemento

O evento complementar $A^c$ ocorre quando $A$ não ocorre:

$$
P(A^c)=1-P(A).
$$

Se a probabilidade de falha é $0{,}28$, a probabilidade de não falhar é

$$
1-0{,}28=0{,}72.
$$

### 18.1. Pelo menos um sucesso

Em $n$ tentativas independentes, cada uma com probabilidade $p$ de sucesso:

$$
P(\text{pelo menos um sucesso})=1-(1-p)^n.
$$

O expoente só pode ser usado dessa maneira quando as tentativas são independentes e têm a mesma probabilidade de fracasso.

## 19. União e interseção de eventos

Para quaisquer eventos $A$ e $B$:

$$
P(A\cup B)=P(A)+P(B)-P(A\cap B).
$$

Se


$$
P(A)=0{,}6,\quad P(B)=0{,}5,\quad P(A\cap B)=0{,}3,
$$

então


$$
P(A\cup B)=0{,}6+0{,}5-0{,}3=0{,}8.
$$

### 19.1. Eventos mutuamente exclusivos

Se $A$ e $B$ não podem ocorrer juntos:

$$
A\cap B=\varnothing
$$

e


$$
P(A\cup B)=P(A)+P(B).
$$

O “ou” probabilístico é normalmente inclusivo: $A\cup B$ admite que ambos ocorram. Só eventos mutuamente exclusivos eliminam a interseção.

## 20. Probabilidade condicional

A probabilidade de $A$ sabendo que $B$ ocorreu é

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)},
$$

desde que $P(B)>0$.

Condicionar restringe o universo de referência aos resultados pertencentes a $B$.

Se


$$
P(A\cap B)=0{,}2\quad\text{e}\quad P(B)=0{,}5,
$$

então


$$
P(A\mid B)=\frac{0{,}2}{0{,}5}=0{,}4.
$$

Não troque $P(A\mid B)$ por $P(B\mid A)$.

## 21. Regra do produto

Quando $P(B)>0$, reorganizar a definição de probabilidade condicional fornece:

$$
P(A\cap B)=P(A\mid B)P(B).
$$

Quando $P(A)>0$, vale também:

$$
P(A\cap B)=P(B\mid A)P(A).
$$

Para etapas sucessivas, quando todas as condicionais indicadas estão definidas:

$$
P(A_1\cap A_2\cap\cdots\cap A_n)
=P(A_1)P(A_2\mid A_1)\cdots P(A_n\mid A_1\cap\cdots\cap A_{n-1}).
$$

Árvores de probabilidade ajudam a visualizar os ramos condicionais.

## 22. Independência

Eventos $A$ e $B$ são independentes quando a ocorrência de um não altera a probabilidade do outro. Uma condição equivalente é

$$
P(A\cap B)=P(A)P(B).
$$

Quando as condicionais estão definidas:

$$
P(A\mid B)=P(A)
$$

e


$$
P(B\mid A)=P(B).
$$

### 22.1. Independência não é exclusão mútua

Se $A$ e $B$ são mutuamente exclusivos e têm probabilidades positivas, então

$$
P(A\cap B)=0
$$

mas


$$
P(A)P(B)>0.
$$

Logo, não são independentes. Saber que $A$ ocorreu torna impossível a ocorrência de $B$.

### 22.2. Complementos preservam independência

Se $A$ e $B$ são independentes, também são independentes:

- $A$ e $B^c$;
- $A^c$ e $B$;
- $A^c$ e $B^c$.

## 23. Com e sem reposição

Uma urna contém 3 bolas vermelhas e 2 azuis.

### 23.1. Sem reposição

A probabilidade de retirar duas vermelhas é

$$
\frac35\cdot\frac24=\frac3{10}.
$$

A primeira retirada altera a composição da urna; as etapas são dependentes.

### 23.2. Com reposição

Se a primeira bola volta à urna:

$$
\frac35\cdot\frac35=\frac9{25}.
$$

A composição original é restaurada, e as retiradas são independentes no modelo usual.

## 24. Probabilidade total

Se $B_1,B_2,\ldots,B_k$ formam uma partição de $\Omega$, isto é, são mutuamente exclusivos, cobrem todo o espaço e satisfazem $P(B_i)>0$, então

$$
P(A)=\sum_{i=1}^{k}P(A\mid B_i)P(B_i).
$$

### 24.1. Exemplo

Uma empresa recebe 60% das peças da máquina $M_1$ e 40% da máquina $M_2$. As taxas de defeito são, respectivamente, 2% e 5%.

$$
P(D)=0{,}02\cdot0{,}60+0{,}05\cdot0{,}40=0{,}032.
$$

A taxa global de defeito é 3,2%.

## 25. Teorema de Bayes

Quando $P(A)>0$, Bayes inverte o condicionamento:

$$
P(B_j\mid A)=
\frac{P(A\mid B_j)P(B_j)}{\sum_iP(A\mid B_i)P(B_i)}.
$$

No exemplo das máquinas, sabendo que uma peça é defeituosa:

$$
P(M_2\mid D)
=\frac{0{,}05\cdot0{,}40}{0{,}032}
=\frac{0{,}020}{0{,}032}
=\frac58.
$$

Embora $M_2$ forneça apenas 40% das peças, sua taxa de defeito maior faz com que ela responda por 62,5% das peças defeituosas.

> A taxa-base $P(B_j)$ não pode ser descartada. $P(A\mid B_j)$ e $P(B_j\mid A)$ são, em geral, diferentes.

## 26. Modelos recorrentes

### 26.1. Moedas

Em 3 lançamentos independentes de moeda honesta, há $2^3=8$ sequências equiprováveis.

- exatamente duas caras: $\binom32=3$ sequências;
- probabilidade: $3/8$;
- pelo menos uma cara: $1-(1/2)^3=7/8$.

### 26.2. Dados

Em dois dados honestos distinguíveis, há $6^2=36$ duplas ordenadas. A soma 7 possui 6 resultados favoráveis:

$$
(1,6),(2,5),(3,4),(4,3),(5,2),(6,1).
$$

Assim:

$$
P(\text{soma }7)=\frac6{36}=\frac16.
$$

### 26.3. Cartas e urnas

Identifique:

- se as retiradas são ordenadas;
- se há reposição;
- se as cartas ou bolas são distinguíveis;
- se a informação condicionante altera o denominador.

### 26.4. Senhas e códigos

Defina para cada posição:

- conjunto de símbolos permitido;
- possibilidade de repetição;
- restrições de primeiro caractere;
- exigência de ao menos um símbolo de certo tipo.

Condições como “ao menos um dígito” frequentemente favorecem complemento.

## 27. Leitura de itens Cebraspe

Em prova de julgamento, a banca costuma propor uma contagem ou uma desigualdade numérica. Não basta reconhecer o tema; é necessário verificar a expressão inteira.

### 27.1. Tabuleiro colorido

Em item oficial do BNB 2018, um tabuleiro tinha 144 quadrados: 54 azuis, 30 marrons, 40 amarelos e 20 verdes.

As probabilidades relevantes são:

$$
P(\text{azul})=\frac{54}{144}=\frac38,
$$

$$
P(\text{não marrom})=\frac{114}{144}=\frac{19}{24},
$$

$$
P(\text{amarelo ou verde})=\frac{60}{144}=\frac5{12}.
$$

As cores são excludentes; por isso amarelo e verde podem ser somados diretamente.

### 27.2. Animais em fila

O mesmo caderno considerou 10 animais distintos, entre eles camelo, elefante e leão.

- camelo na primeira posição e elefante na sexta: $8!$;
- os três nas primeiras posições, em qualquer ordem: $3!\cdot7!$;
- os três juntos em ordem interna fixa: trate-os como um bloco, obtendo $8!$.

Esses exemplos mostram que uma pequena expressão como $3$ no lugar de $3!$ muda o julgamento.

### 27.3. Inclusão-exclusão em três pontos turísticos

Outro bloco do caderno informa totais e interseções entre três visitas. A resolução exige distinguir:

- interseção inclusiva, que contém quem visitou os três lugares;
- região “somente dois”, obtida retirando a interseção tripla;
- região “somente um”, obtida retirando todas as sobreposições pertinentes.

## 28. Erros recorrentes

### 28.1. Somar etapas

Escolher camisa **e** calça multiplica. Escolher ônibus **ou** trem entre alternativas excludentes soma.

### 28.2. Ignorar a ordem

Comissão não tem cargos; pódio tem. Se trocar dois escolhidos cria novo resultado, a ordem importa.

### 28.3. Esquecer a repetição

Com reposição ou repetição permitida, a quantidade disponível pode permanecer constante. Sem reposição, ela diminui.

### 28.4. Tratar objetos iguais como distintos

Permutações de letras repetidas exigem divisão pelos fatoriais das multiplicidades.

### 28.5. Confundir círculo e fila

Em círculo sem referência fixa, rotações coincidem. Em fila, posições inicial e final são distintas.

### 28.6. Somar probabilidades sobrepostas

Para $A$ ou $B$, subtraia $P(A\cap B)$, salvo exclusão mútua.

### 28.7. Multiplicar probabilidades marginais sem independência

Quando $P(B)>0$, vale

$$
P(A\cap B)=P(A\mid B)P(B).
$$

A forma $P(A)P(B)$ exige independência.

### 28.8. Inverter condicionais

$P(A\mid B)$ restringe o universo a $B$. Bayes é necessário para inverter a direção usando as taxas-base.

### 28.9. Supor equiprobabilidade

Os valores possíveis de uma soma de dados não têm probabilidades iguais. Conte resultados elementares equiprováveis, não apenas rótulos finais.

### 28.10. Confundir exclusão mútua e independência

Eventos positivos e mutuamente exclusivos são dependentes, pois a ocorrência de um impede o outro.

## 29. Roteiro de resolução

### 29.1. Para contagem

1. Defina exatamente um resultado.
2. Separe alternativas de etapas.
3. Pergunte se a ordem importa.
4. Verifique repetição, indistinguibilidade e circularidade.
5. Incorpore restrições antes de calcular.
6. Teste complemento, blocos, lacunas ou inclusão-exclusão.
7. Faça uma checagem de grandeza com casos pequenos.

### 29.2. Para probabilidade

1. Defina $\Omega$ e o evento.
2. Verifique equiprobabilidade.
3. Traduza “não”, “ou”, “e” e “sabendo que”.
4. Identifique reposição e dependência.
5. Use complemento para “pelo menos um”.
6. Use árvore ou partição para probabilidade total.
7. Em Bayes, escreva taxa-base, verossimilhança e evidência.
8. Confirme que o resultado está entre 0 e 1.

## 30. Síntese

- Alternativas excludentes somam; etapas sucessivas multiplicam.
- Permutação usa todos e considera ordem.
- Arranjo escolhe parte e considera ordem.
- Combinação escolhe parte e ignora ordem.
- Objetos indistinguíveis exigem divisão pelas repetições.
- Em círculo sem referência, fixe um objeto: $(n-1)!$.
- Blocos tratam adjacência; lacunas tratam separação.
- Complemento simplifica condições como “pelo menos um”.
- Inclusão-exclusão corrige dupla contagem.
- Casas dos pombos garantem concentração mínima.
- Probabilidade clássica por contagem exige equiprobabilidade.
- $P(A^c)=1-P(A)$.
- $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.
- $P(A\mid B)=P(A\cap B)/P(B)$, com $P(B)>0$.
- Com $P(B)>0$, $P(A\cap B)=P(A\mid B)P(B)$; $P(A)P(B)$ exige independência.
- Exclusão mútua e independência não são sinônimos.
- Sem reposição, as probabilidades normalmente mudam.
- Probabilidade total soma ramos de uma partição; Bayes inverte o condicionamento.

## Referências

- CEBRASPE. [Edital do concurso público do TCE/MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Edital nº 1, de 6 de julho de 2026. Conteúdo comum de Raciocínio Lógico, item 5, “Princípios de contagem e probabilidade”. Consultado em 18 jul. 2026.
- CEBRASPE. [Caderno de Conhecimentos Básicos do BNB, Cargo 1](https://cdn.cebraspe.org.br/concursos/BANCO_DO_NORDESTE_18/arquivos/MATRIZ_424_BNBCB1__PAG_4.PDF). Aplicação em 2 dez. 2018, itens 33 a 42, sobre probabilidade, permutações e inclusão-exclusão. Consultado em 18 jul. 2026.
- CEBRASPE. [Gabarito definitivo de Conhecimentos Básicos do BNB, Cargo 1](https://cdn.cebraspe.org.br/concursos/BANCO_DO_NORDESTE_18/arquivos/GAB_DEFINITIVO_424_BNB_CB1_00_MATRIZ.PDF). Edital nº 1 — BNB, de 14 de setembro de 2018. Consultado em 18 jul. 2026.
- BEZERRA, Maria de Nazaré Carvalho. [Análise combinatória e probabilidade](https://livroaberto.ufpa.br/items/d9c8e9d1-f7d4-4c2f-8607-3380768d43e9). Belém: EditAedi/Universidade Federal do Pará, 2018. E-book, 198 p. Consultado em 18 jul. 2026.
- VASCONCELOS, Cleiton Batista; ROCHA, Manoel Américo. [Análise combinatória e probabilidade](https://educapes.capes.gov.br/handle/capes/552535). Universidade Estadual do Ceará, eduCAPES, 2019. Consultado em 18 jul. 2026.
- FRANCO, Tertuliano. [Princípios de combinatória e probabilidade](https://impa.br/books/principios-de-combinatoria-e-probabilidade/). Instituto de Matemática Pura e Aplicada, 1ª ed., 2020. Consultado em 18 jul. 2026.
- ILLOWSKY, Barbara; DEAN, Susan. [Formula Review — Introductory Statistics 2e](https://openstax.org/books/introductory-statistics-2e/pages/3-formula-review). OpenStax, Rice University, 2023. Fórmulas de probabilidade condicional, adição, multiplicação, independência e exclusão mútua. Consultado em 18 jul. 2026.
