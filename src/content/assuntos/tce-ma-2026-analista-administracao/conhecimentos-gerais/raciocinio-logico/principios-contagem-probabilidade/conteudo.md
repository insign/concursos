---
schemaVersion: 1
title: Princípios de contagem e probabilidade
description: Princípios de contagem, permutações, arranjos, combinações e fundamentos de probabilidade, condicionamento e independência.
order: 41
storageId: contagem-probabilidade
---

## 1. Recorte do assunto

O edital cobra **princípios de contagem e probabilidade**. O foco desta revisão é resolver problemas de prova com segurança, sem transformar o tópico em um curso de combinatória ou estatística.

O núcleo estudável é:

- princípios aditivo e multiplicativo;
- fatorial;
- permutações, arranjos e combinações;
- repetição, posições, blocos, lacunas e contagem por complemento;
- inclusão-exclusão e princípio da casa dos pombos;
- espaço amostral, eventos e probabilidade em casos equiprováveis;
- complemento, união e interseção de eventos;
- probabilidade condicional, regra do produto, independência e reposição;
- probabilidade total e Bayes em nível operacional.

Operações gerais com conjuntos pertencem ao assunto 042. Problemas aritméticos, geométricos e matriciais têm assuntos próprios.

## 2. Antes da fórmula: modele o resultado

Pergunte:

1. há **alternativas** ou **etapas sucessivas**?
2. a **ordem** altera o resultado?
3. todos os objetos serão usados ou apenas parte?
4. há repetição permitida ou objetos indistinguíveis?
5. existe restrição de posição, adjacência ou composição?
6. em problemas circulares, rotações contam como a mesma disposição?

| Situação | Modelo inicial |
|---|---|
| escolher ônibus **ou** trem entre alternativas disjuntas | princípio aditivo |
| escolher camisa **e depois** calça | princípio multiplicativo |
| ordenar todos os objetos distintos | permutação |
| escolher parte dos objetos com ordem | arranjo |
| escolher parte sem ordem | combinação |
| letras repetidas | permutação com repetição |
| mesa redonda sem lugar marcado | permutação circular |

> A fórmula correta depende do que conta como resultado diferente.

## 3. Princípios aditivo e multiplicativo

### 3.1. Princípio aditivo

Se uma escolha ocorre por alternativas **mutuamente excludentes**, somam-se as possibilidades.

Com 5 rotas rodoviárias e 3 ferroviárias, sem sobreposição:

$$
5+3=8.
$$

Se as categorias se sobrepõem, a soma direta conta a interseção duas vezes:

$$
|A\cup B|=|A|+|B|-|A\cap B|.
$$

### 3.2. Princípio multiplicativo

Se um processo ocorre em etapas sucessivas, multiplicam-se as quantidades de opções disponíveis em cada etapa.

Com 4 camisas e 3 calças:

$$
4\cdot3=12.
$$

Para uma sequência de 3 letras distintas entre 26:

$$
26\cdot25\cdot24.
$$

As quantidades podem mudar de etapa para etapa.

## 4. Fatorial e modelos básicos

Para $n\ge1$:

$$
n!=n(n-1)\cdots2\cdot1,
\qquad 0!=1.
$$

### 4.1. Permutação simples

Usa todos os $n$ objetos distintos e a ordem importa:

$$
P_n=n!.
$$

Exemplo: 6 pessoas em fila:

$$
6!=720.
$$

### 4.2. Arranjo simples

Escolhe $p$ entre $n$ objetos distintos e a ordem importa:

$$
A_{n,p}=\frac{n!}{(n-p)!}.
$$

Exemplo: primeiro e segundo lugares entre 10 concorrentes:

$$
A_{10,2}=10\cdot9=90.
$$

### 4.3. Combinação simples

Escolhe $p$ entre $n$ objetos e a ordem não importa:

$$
\binom np=C_{n,p}=\frac{n!}{p!(n-p)!}.
$$

Exemplo: comissão de 3 pessoas entre 10:

$$
\binom{10}{3}=120.
$$

Relação útil:

$$
A_{n,p}=\binom np\,p!.
$$

## 5. Repetição e circularidade

### 5.1. Permutação com repetição

Se $n$ posições contêm grupos indistinguíveis com multiplicidades $a_1,\ldots,a_r$:

$$
\frac{n!}{a_1!\cdots a_r!}.
$$

Na palavra ARARA:

$$
\frac{5!}{3!2!}=10.
$$

### 5.2. Combinação com repetição

Quando se escolhem $p$ unidades entre $n$ tipos, com repetição permitida e sem considerar ordem:

$$
CR_{n,p}=\binom{n+p-1}{p}.
$$

Exemplo: 4 bolas de sorvete entre 6 sabores:

$$
\binom94=126.
$$

### 5.3. Permutação circular

Em mesa redonda sem lugar marcado, rotações são equivalentes:

$$
P_n^{\text{circular}}=(n-1)!.
$$

Reflexões continuam distintas, salvo indicação diferente do enunciado.

## 6. Restrições de contagem

### 6.1. Posições fixas

Se objetos e posições já estão determinados, retire-os do problema e permute o restante.

### 6.2. Objetos juntos: bloco

Para 5 pessoas, com Ana e Bruno juntos:

- trate o par como uma unidade;
- ordene 4 unidades: $4!$;
- ordene o par internamente: $2!$.

Logo:

$$
4!\cdot2!=48.
$$

### 6.3. Objetos separados: lacunas ou complemento

Com 6 pessoas, para Ana e Bruno não ficarem adjacentes:

$$
6!-2\cdot5!=480.
$$

Também é possível ordenar as outras 4 pessoas e colocar Ana e Bruno em duas das 5 lacunas distintas:

$$
4!\cdot5\cdot4=480.
$$

### 6.4. Primeiro algarismo

Número não pode começar com zero. Para números de quatro algarismos distintos:

$$
9\cdot9\cdot8\cdot7=4\,536.
$$

## 7. Contagem por complemento

Quando a condição desejada é ampla, pode ser mais simples contar o total e retirar o indesejado:

$$
N(\text{desejado})
=N(\text{total})-N(\text{indesejado}).
$$

Exemplo: sequências de 4 lançamentos de dado com pelo menos um 6:

$$
6^4-5^4=671.
$$

O complemento de “pelo menos um” é **nenhum**, não “exatamente um”.

## 8. Inclusão-exclusão

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

A interseção de dois conjuntos pode incluir elementos que também pertencem ao terceiro. Em questões com regiões “somente dois”, retire a interseção tripla quando necessário.

## 9. Princípio da casa dos pombos

Ao distribuir $N$ objetos em $r$ caixas, alguma caixa recebe pelo menos

$$
\left\lceil\frac Nr\right\rceil
$$

objetos.

Exemplos:

- 13 pessoas e 12 meses: algum mês contém ao menos 2 aniversariantes;
- 31 processos em 6 equipes: alguma equipe recebe ao menos 6 processos.

O princípio garante existência, não identifica qual caixa atinge o limite.

## 10. Experimento, espaço amostral e evento

Um **experimento aleatório** possui resultados possíveis conhecidos, mas não se sabe antecipadamente qual ocorrerá.

O **espaço amostral** $\Omega$ reúne os resultados elementares possíveis. Um **evento** é um subconjunto de $\Omega$.

Dois lançamentos de moeda:

$$
\Omega=\{CC,CK,KC,KK\}.
$$

O evento “exatamente uma cara” é:

$$
\{CK,KC\}.
$$

Escolher corretamente os resultados elementares é essencial. Em dois dados honestos distinguíveis, as 36 duplas ordenadas são equiprováveis; as somas 2,3,\ldots,12 não são.

## 11. Probabilidade em espaço finito equiprovável

Se os resultados elementares são equiprováveis:

$$
P(A)=\frac{|A|}{|\Omega|}.
$$

A razão entre cardinalidades **não** deve ser aplicada automaticamente quando os resultados elementares têm probabilidades diferentes.

Propriedades básicas:

$$
0\le P(A)\le1,
\qquad
P(\Omega)=1,
\qquad
P(\varnothing)=0.
$$

## 12. Complemento, união e exclusão mútua

Complemento:

$$
P(A^c)=1-P(A).
$$

União de dois eventos:

$$
P(A\cup B)
=P(A)+P(B)-P(A\cap B).
$$

Se $A$ e $B$ são mutuamente exclusivos:

$$
P(A\cap B)=0,
$$

portanto:

$$
P(A\cup B)=P(A)+P(B).
$$

Em probabilidade, “$A$ ou $B$” normalmente é inclusivo.

## 13. Probabilidade condicional e regra do produto

Se $P(B)>0$:

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}.
$$

O condicionamento restringe o universo de referência a $B$.

Da definição:

$$
P(A\cap B)=P(A\mid B)P(B).
$$

Também, quando $P(A)>0$:

$$
P(A\cap B)=P(B\mid A)P(A).
$$

Não confunda:

$$
P(A\mid B)
\quad\text{e}\quad
P(B\mid A).
$$

## 14. Independência e reposição

Eventos $A$ e $B$ são independentes quando:

$$
P(A\cap B)=P(A)P(B).
$$

Quando a condicional está definida, isso equivale a:

$$
P(A\mid B)=P(A).
$$

### 14.1. Exclusão mútua não é independência

Se $A$ e $B$ são mutuamente exclusivos e têm probabilidades positivas:

$$
P(A\cap B)=0
\neq P(A)P(B).
$$

Logo, são dependentes.

### 14.2. Com e sem reposição

Urna com 3 bolas vermelhas e 2 azuis.

Sem reposição:

$$
P(\text{duas vermelhas})
=\frac35\cdot\frac24
=\frac3{10}.
$$

Com reposição:

$$
P(\text{duas vermelhas})
=\frac35\cdot\frac35
=\frac9{25}.
$$

Sem reposição, a composição normalmente muda; com reposição, o experimento pode manter as mesmas probabilidades entre etapas.

## 15. Pelo menos um sucesso

Em $n$ tentativas independentes, cada uma com probabilidade $p$ de sucesso:

$$
P(\text{ao menos um sucesso})
=1-(1-p)^n.
$$

A fórmula exige independência e a mesma probabilidade de fracasso em cada tentativa.

## 16. Probabilidade total e Bayes

Essas ferramentas são úteis quando o espaço é dividido em origens ou hipóteses.

Se $B_1,\ldots,B_k$ formam uma <abbr title="eventos disjuntos cuja união é o espaço amostral">partição</abbr> de $\Omega$ e $P(B_i)>0$:

$$
P(A)
=\sum_{i=1}^k P(A\mid B_i)P(B_i).
$$

Bayes permite inverter o condicionamento:

$$
P(B_j\mid A)
=
\frac{P(A\mid B_j)P(B_j)}
{\sum_i P(A\mid B_i)P(B_i)},
$$

desde que $P(A)>0$.

A taxa-base $P(B_j)$ participa do cálculo. Em geral:

$$
P(A\mid B)\ne P(B\mid A).
$$

## 17. Modelos clássicos de prova

### 17.1. Moedas

Em $n$ lançamentos independentes de moeda honesta, há $2^n$ sequências equiprováveis.

Em 3 lançamentos:

- exatamente duas caras: $\binom32=3$ sequências;
- probabilidade: $3/8$;
- ao menos uma cara: $1-(1/2)^3=7/8$.

### 17.2. Dados

Dois dados honestos distinguíveis geram 36 duplas ordenadas equiprováveis.

A soma 7 ocorre em 6 delas:

$$
P(\text{soma }7)=\frac6{36}=\frac16.
$$

### 17.3. Senhas

Conte posição por posição e verifique:

- caracteres permitidos;
- repetição;
- restrição no primeiro caractere;
- exigência de ao menos um símbolo de certo tipo.

### 17.4. Urnas e cartas

Identifique:

- se a ordem das retiradas importa;
- se há reposição;
- se o denominador muda;
- se o enunciado fornece informação condicionante.

## 18. Cobrança oficial do CEBRASPE

No <abbr title="Banco do Nordeste do Brasil">BNB</abbr> 2018, o <abbr title="Centro Brasileiro de Pesquisa em Avaliação e Seleção e de Promoção de Eventos">CEBRASPE</abbr> cobrou no mesmo bloco:

- probabilidade por razão entre casos favoráveis e total;
- complemento;
- união de eventos excludentes;
- permutações com posições fixas;
- bloco de elementos adjacentes;
- inclusão-exclusão com três conjuntos.

O padrão reforça que a dificuldade está principalmente em **modelar corretamente o resultado e as restrições**.

## 19. Pegadinhas

- Comissão não é pódio: cargos tornam a ordem relevante.
- Repetição permitida não deve ser presumida.
- “Pelo menos um” tem complemento “nenhum”.
- Resultados finais como as somas de dois dados podem não ser equiprováveis.
- Em números, zero não ocupa a primeira posição.
- Letras repetidas não devem ser tratadas como objetos distintos.
- Em círculo sem referência, rotações coincidem; reflexões não necessariamente.
- Para $A\cup B$, subtraia a interseção quando houver sobreposição.
- Multiplicar probabilidades marginais exige independência.
- Sem reposição, as probabilidades normalmente mudam.
- $P(A\mid B)$ não é $P(B\mid A)$.
- Eventos positivos mutuamente exclusivos são dependentes.

## 20. Roteiro de resolução

### Contagem

1. Defina o que é um resultado diferente.
2. Separe alternativas de etapas.
3. Pergunte se a ordem importa.
4. Verifique repetição, indistinguibilidade e circularidade.
5. Incorpore restrições antes de calcular.
6. Teste bloco, lacunas, complemento ou inclusão-exclusão.

### Probabilidade

1. Defina $\Omega$ e o evento.
2. Verifique se os resultados elementares são equiprováveis.
3. Traduza “não”, “ou”, “e” e “sabendo que”.
4. Identifique reposição e dependência.
5. Use complemento para “pelo menos um”.
6. Use condicional quando a informação altera o universo.
7. Confirme que o resultado está entre 0 e 1.

## Referências

- CEBRASPE. [Edital do concurso público do TCE/MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Edital nº 1, de 6 de julho de 2026. Raciocínio Lógico, item 5, “Princípios de contagem e probabilidade”.
- CEBRASPE. [Caderno de Conhecimentos Básicos do BNB, Cargo 1](https://cdn.cebraspe.org.br/concursos/BANCO_DO_NORDESTE_18/arquivos/MATRIZ_424_BNBCB1__PAG_4.PDF). Prova aplicada em 2 dez. 2018, itens 33 a 42.
- CEBRASPE. [Gabarito definitivo de Conhecimentos Básicos do BNB, Cargo 1](https://cdn.cebraspe.org.br/concursos/BANCO_DO_NORDESTE_18/arquivos/GAB_DEFINITIVO_424_BNB_CB1_00_MATRIZ.PDF). Concurso BNB 2018.
- BEZERRA, Maria de Nazaré Carvalho. [Análise combinatória e probabilidade](https://livroaberto.ufpa.br/items/d9c8e9d1-f7d4-4c2f-8607-3380768d43e9). Universidade Federal do Pará, 2018.
- FRANCO, Tertuliano. [Princípios de combinatória e probabilidade](https://impa.br/books/principios-de-combinatoria-e-probabilidade/). IMPA, 2020.
