---
schemaVersion: 1
title: Operações com conjuntos
description: Representação, pertinência, inclusão, conjunto das partes, operações, leis algébricas, cardinalidade, diagramas, produto cartesiano, intervalos e partições.
order: 42
storageId: operacoes-conjuntos
---

## 1. Linguagem para classificar e relacionar objetos

Um **conjunto** é uma coleção bem determinada de objetos, chamados **elementos**. A teoria elementar dos conjuntos fornece uma linguagem para representar classificações, comparar grupos e calcular quantidades sem contar o mesmo objeto duas vezes.

Três perguntas organizam quase todo problema deste assunto:

1. o enunciado fala de um elemento ou de um conjunto?
2. qual operação traduz palavras como “ou”, “e”, “não” e “somente”?
3. a pergunta pede os elementos de uma região ou sua cardinalidade?

### 1.1. Fronteiras deste assunto

| Recurso | Tratamento aqui |
|---|---|
| união, interseção, diferença e complemento | desenvolvimento completo |
| cardinalidade e inclusão-exclusão | aplicação a conjuntos finitos |
| diagramas de Venn | representação e resolução por regiões |
| probabilidade e eventos | Assunto 041 |
| relações binárias e funções | fora do item 6 do edital |
| problemas aritméticos, geométricos e matriciais | Assuntos 043 a 045 |

## 2. Universo e formas de representar conjuntos

O **conjunto universo** $U$ reúne os objetos admitidos no contexto. Declarar o universo é indispensável para interpretar complementos.

Um conjunto pode ser descrito de diferentes formas.

### 2.1. Por extensão

Listam-se seus elementos entre chaves:

$$
A=\{1,2,3,4\}.
$$

A ordem e a repetição não alteram um conjunto:

$$
\{1,2,2,3\}=\{3,2,1\}.
$$

### 2.2. Por compreensão

Declara-se a propriedade comum aos elementos:

$$
B=\{x\in\mathbb Z\mid -2\le x<3\}.
$$

Por extensão:

$$
B=\{-2,-1,0,1,2\}.
$$

O símbolo $\mid$ pode ser lido como “tal que”. O domínio $\mathbb Z$ evita dúvida sobre quais objetos podem satisfazer a propriedade.

### 2.3. Por diagramas

Em diagramas de Venn, o retângulo representa $U$ e regiões fechadas representam subconjuntos. A área fora dos círculos, mas dentro do retângulo, também pertence ao universo e importa em perguntas sobre complemento ou “nenhum”.

## 3. Pertinência: elemento e conjunto

Se $x$ é elemento de $A$, escreve-se

$$
x\in A.
$$

Se não pertence:

$$
x\notin A.
$$

Para

$$
A=\{1,\{2\},3\},
$$

valem:

- $1\in A$;
- $\{2\}\in A$;
- $2\notin A$.

O objeto $2$ e o conjunto unitário $\{2\}$ são diferentes.

## 4. Igualdade e cardinalidade

Dois conjuntos são iguais quando possuem exatamente os mesmos elementos:

$$
A=B
\quad\Longleftrightarrow\quad
\forall x\,(x\in A\leftrightarrow x\in B).
$$

A **cardinalidade** $|A|$ é o número de elementos distintos de um conjunto finito.

Se

$$
A=\{a,a,b,c\},
$$

então $A=\{a,b,c\}$ e $|A|=3$.

> Ter a mesma cardinalidade não significa ser o mesmo conjunto. Por exemplo, $\{1,2\}$ e $\{a,b\}$ possuem dois elementos, mas não são iguais.

## 5. Inclusão: relação entre conjuntos

Diz-se que $A$ é subconjunto de $B$ quando todo elemento de $A$ também pertence a $B$:

$$
A\subseteq B
\quad\Longleftrightarrow\quad
\forall x\,(x\in A\rightarrow x\in B).
$$

Se $A\subseteq B$ e $A\ne B$, então $A$ é **subconjunto próprio** de $B$:

$$
A\subsetneq B.
$$

Neste material:

- $\subseteq$ permite igualdade;
- $\subsetneq$ exige inclusão própria.

Essa escolha evita a ambiguidade do símbolo $\subset$, usado com sentidos diferentes por autores distintos.

### 5.1. Elemento não é subconjunto

Para qualquer objeto $x$ e qualquer conjunto $A$:

$$
x\in A
\quad\Longleftrightarrow\quad
\{x\}\subseteq A.
$$

Mas $\{x\}\in A$ é outra afirmação: ela diz que o próprio conjunto unitário aparece como elemento de $A$.

## 6. Conjuntos especiais

### 6.1. Conjunto vazio

O conjunto sem elementos é denotado por $\varnothing$:

$$
|\varnothing|=0.
$$

O vazio é subconjunto de todo conjunto:

$$
\varnothing\subseteq A.
$$

Isso não significa que $\varnothing\in A$. A pertinência só vale se o vazio tiver sido colocado como elemento.

### 6.2. Conjunto unitário

Um conjunto com exatamente um elemento é **unitário**. O conjunto $\{\varnothing\}$ é unitário:

$$
|\{\varnothing\}|=1.
$$

Logo, $\varnothing$ e $\{\varnothing\}$ não são iguais.

### 6.3. Conjuntos disjuntos

Dois conjuntos são disjuntos quando não possuem elemento comum:

$$
A\cap B=\varnothing.
$$

## 7. Conjunto das partes

O conjunto das partes, ou conjunto potência, reúne todos os subconjuntos de $A$:

$$
\mathcal P(A)=\{X\mid X\subseteq A\}.
$$

Se $A=\{a,b\}$:

$$
\mathcal P(A)=\{\varnothing,\{a\},\{b\},\{a,b\}\}.
$$

Para um conjunto finito com $n$ elementos:

$$
|\mathcal P(A)|=2^n.
$$

Cada elemento de $A$ oferece duas escolhas para formar um subconjunto: entrar ou não entrar. A contagem inclui $\varnothing$ e o próprio $A$.

## 8. União

A união contém os elementos que pertencem a $A$, a $B$ ou a ambos:

$$
A\cup B=\{x\mid x\in A\text{ ou }x\in B\}.
$$

O “ou” é inclusivo.

Se

$$
A=\{1,2,3\}
\quad\text{e}\quad
B=\{3,4\},
$$

então

$$
A\cup B=\{1,2,3,4\}.
$$

O elemento $3$ aparece uma única vez no resultado.

## 9. Interseção

A interseção contém os elementos comuns:

$$
A\cap B=\{x\mid x\in A\text{ e }x\in B\}.
$$

No exemplo anterior:

$$
A\cap B=\{3\}.
$$

Em linguagem verbal, “pertence aos dois”, “simultaneamente” e “ambos” costumam indicar interseção.

## 10. Diferença

A diferença $A\setminus B$ contém os elementos de $A$ que não pertencem a $B$:

$$
A\setminus B=\{x\mid x\in A\text{ e }x\notin B\}.
$$

Para $A=\{1,2,3\}$ e $B=\{3,4\}$:

$$
A\setminus B=\{1,2\},
$$

$$
B\setminus A=\{4\}.
$$

A diferença não é comutativa.

## 11. Complemento

O complemento de $A$ em relação ao universo $U$ é

$$
A^c=U\setminus A.
$$

Se

$$
U=\{1,2,3,4,5\}
\quad\text{e}\quad
A=\{1,3,5\},
$$

então

$$
A^c=\{2,4\}.
$$

Sem declarar $U$, o complemento pode mudar. O complemento de $\{1,3,5\}$ nos naturais não é o mesmo complemento dentro de $\{1,2,3,4,5\}$.

## 12. Diferença simétrica

A diferença simétrica contém os elementos que pertencem a exatamente um dos conjuntos:

$$
A\mathbin{\triangle}B
=(A\setminus B)\cup(B\setminus A).
$$

Também:

$$
A\mathbin{\triangle}B
=(A\cup B)\setminus(A\cap B).
$$

Para $A=\{1,2,3\}$ e $B=\{3,4\}$:

$$
A\mathbin{\triangle}B=\{1,2,4\}.
$$

## 13. Álgebra dos conjuntos

As operações obedecem a identidades úteis para simplificar expressões.

| Propriedade | União | Interseção |
|---|---|---|
| comutativa | $A\cup B=B\cup A$ | $A\cap B=B\cap A$ |
| associativa | $(A\cup B)\cup C=A\cup(B\cup C)$ | $(A\cap B)\cap C=A\cap(B\cap C)$ |
| idempotência | $A\cup A=A$ | $A\cap A=A$ |
| identidade | $A\cup\varnothing=A$ | $A\cap U=A$ |
| dominação | $A\cup U=U$ | $A\cap\varnothing=\varnothing$ |

### 13.1. Distributividade

As duas operações distribuem uma sobre a outra:

$$
A\cap(B\cup C)
=(A\cap B)\cup(A\cap C),
$$

$$
A\cup(B\cap C)
=(A\cup B)\cap(A\cup C).
$$

### 13.2. Absorção

$$
A\cup(A\cap B)=A,
$$

$$
A\cap(A\cup B)=A.
$$

### 13.3. Complementares

$$
A\cup A^c=U,
$$

$$
A\cap A^c=\varnothing,
$$

$$
(A^c)^c=A,
$$

$$
U^c=\varnothing,
\qquad
\varnothing^c=U.
$$

### 13.4. Reescrever diferença

$$
A\setminus B=A\cap B^c.
$$

Essa identidade permite tratar diferenças com as mesmas leis usadas para interseção e complemento.

## 14. Leis de De Morgan

O complemento troca união por interseção e interseção por união:

$$
(A\cup B)^c=A^c\cap B^c,
$$

$$
(A\cap B)^c=A^c\cup B^c.
$$

Em palavras:

- não pertencer a $A$ nem a $B$ equivale a não pertencer à união;
- não pertencer simultaneamente aos dois equivale a estar fora de pelo menos um deles.

Mantenha os parênteses: o complemento se aplica à expressão inteira.

## 15. Como verificar igualdade entre conjuntos

Uma igualdade $X=Y$ pode ser demonstrada pelo método do elemento genérico:

1. suponha $x\in X$;
2. use as definições para concluir $x\in Y$;
3. prove também que $x\in Y$ implica $x\in X$.

Isso estabelece a dupla inclusão:

$$
X\subseteq Y
\quad\text{e}\quad
Y\subseteq X.
$$

Por exemplo:

$$
x\in A\setminus B
\Longleftrightarrow
x\in A\text{ e }x\notin B
\Longleftrightarrow
x\in A\cap B^c.
$$

Logo, $A\setminus B=A\cap B^c$.

## 16. Cardinalidade da união de dois conjuntos

Para conjuntos finitos:

$$
|A\cup B|=|A|+|B|-|A\cap B|.
$$

A interseção é subtraída porque foi contada em $|A|$ e novamente em $|B|$.

Se 80 servidores dominam planilhas, 55 dominam bancos de dados e 35 dominam ambos:

$$
|A\cup B|=80+55-35=100.
$$

### 16.1. Somente um dos conjuntos

$$
|A\setminus B|=|A|-|A\cap B|,
$$

$$
|B\setminus A|=|B|-|A\cap B|.
$$

No exemplo:

$$
|A\setminus B|=45,
\qquad
|B\setminus A|=20.
$$

Portanto, exatamente uma habilidade aparece para

$$
45+20=65
$$

servidores.

### 16.2. Nenhum dos conjuntos

Se o universo possui 120 servidores:

$$
|(A\cup B)^c|=120-100=20.
$$

### 16.3. Diferença simétrica

Para conjuntos finitos:

$$
|A\mathbin{\triangle}B|
=|A|+|B|-2|A\cap B|.
$$

## 17. Limites para a interseção

Se $A,B\subseteq U$ e $|U|=N$, então:

$$
\max(0,|A|+|B|-N)
\le |A\cap B|
\le \min(|A|,|B|).
$$

Com $N=50$, $|A|=30$ e $|B|=28$:

- a interseção mínima é $30+28-50=8$;
- a interseção máxima é $28$.

O mínimo surge porque a união não pode exceder o universo. O máximo surge porque a interseção não pode ter mais elementos que o menor conjunto.

## 18. Três conjuntos e inclusão-exclusão

Para conjuntos finitos:

$$
|A\cup B\cup C|
=|A|+|B|+|C|
-|A\cap B|-|A\cap C|-|B\cap C|
+|A\cap B\cap C|.
$$

As interseções de pares são **inclusivas**: cada uma contém quem também pertence ao terceiro conjunto.

Considere um universo de 200 pessoas com:

$$
|A|=110,\quad |B|=90,\quad |C|=80,
$$

$$
|A\cap B|=50,\quad
|A\cap C|=40,\quad
|B\cap C|=30,
$$

$$
|A\cap B\cap C|=20.
$$

Então:

$$
|A\cup B\cup C|
=110+90+80-50-40-30+20
=180.
$$

Logo, 20 pessoas não pertencem a nenhum dos três conjuntos.

## 19. Preenchimento de diagramas com três conjuntos

Preencha do centro para fora.

### 19.1. Interseções de exatamente dois

Retire a região tripla de cada interseção inclusiva:

$$
|A\cap B\text{ somente}|=50-20=30,
$$

$$
|A\cap C\text{ somente}|=40-20=20,
$$

$$
|B\cap C\text{ somente}|=30-20=10.
$$

### 19.2. Regiões exclusivas

$$
|A\text{ somente}|=110-30-20-20=40,
$$

$$
|B\text{ somente}|=90-30-10-20=30,
$$

$$
|C\text{ somente}|=80-20-10-20=30.
$$

### 19.3. Exatamente um e ao menos dois

Exatamente um:

$$
40+30+30=100.
$$

Ao menos dois:

$$
30+20+10+20=80.
$$

Outra forma para “ao menos dois” é somar as três interseções de pares e retirar duas cópias extras da região tripla:

$$
50+40+30-2\cdot20=80.
$$

## 20. Produto cartesiano

O produto cartesiano de $A$ por $B$ é o conjunto de pares ordenados cujo primeiro componente vem de $A$ e o segundo, de $B$:

$$
A\times B=\{(a,b)\mid a\in A\text{ e }b\in B\}.
$$

Se $A=\{1,2\}$ e $B=\{x,y\}$:

$$
A\times B
=\{(1,x),(1,y),(2,x),(2,y)\}.
$$

Para conjuntos finitos:

$$
|A\times B|=|A|\cdot|B|.
$$

Em geral, $A\times B\ne B\times A$, pois pares ordenados distinguem posição.

### 20.1. Igualdade de pares ordenados

$$
(a,b)=(c,d)
\quad\Longleftrightarrow\quad
a=c\text{ e }b=d.
$$

Se um dos fatores é vazio:

$$
A\times\varnothing=\varnothing.
$$

O desenvolvimento de relações binárias e funções não pertence a este assunto.

## 21. Famílias de conjuntos

Uma família $\{A_i\}_{i\in I}$ é um conjunto indexado de conjuntos.

A união generalizada satisfaz:

$$
x\in\bigcup_{i\in I}A_i
\quad\Longleftrightarrow\quad
\text{existe }i\in I\text{ tal que }x\in A_i.
$$

A interseção generalizada de uma família não vazia, com $I\ne\varnothing$, satisfaz:

$$
x\in\bigcap_{i\in I}A_i
\quad\Longleftrightarrow\quad
x\in A_i\text{ para todo }i\in I.
$$

Para

$$
A_1=\{1,2\},\quad
A_2=\{2,3\},\quad
A_3=\{2,4\},
$$

temos

$$
\bigcap_{i=1}^{3}A_i=\{2\}.
$$

## 22. Partições

Uma família $\{B_1,\ldots,B_k\}$ é uma partição de $U$ quando:

1. cada $B_i$ é não vazio;
2. conjuntos distintos da família são disjuntos;
3. a união de todos os blocos é $U$.

Assim, cada elemento de $U$ pertence a exatamente um bloco.

Para $U=\{1,2,3,4\}$:

$$
\big\{\{1,3\},\{2\},\{4\}\big\}
$$

é uma partição.

Já $\{\{1,2\},\{2,3\},\{4\}\}$ não é, pois os dois primeiros blocos se sobrepõem.

## 23. Operações com intervalos reais

Intervalos representam subconjuntos de $\mathbb R$.

| Intervalo | Condição |
|---|---|
| $[a,b]$ | $a\le x\le b$ |
| $(a,b)$ | $a<x<b$ |
| $[a,b)$ | $a\le x<b$ |
| $(a,b]$ | $a<x\le b$ |

Parênteses em $\infty$ e $-\infty$ são obrigatórios, pois infinito não é um número real incluído como extremo.

Se

$$
A=[-1,4)
\quad\text{e}\quad
B=(2,6],
$$

então:

$$
A\cap B=(2,4),
$$

$$
A\cup B=[-1,6],
$$

$$
A\setminus B=[-1,2],
$$

$$
B\setminus A=[4,6].
$$

Em relação a $\mathbb R$:

$$
[a,b)^c=(-\infty,a)\cup[b,\infty).
$$

Observe a troca de inclusão nos extremos finitos.

## 24. Tradução de expressões verbais

| Linguagem do enunciado | Região |
|---|---|
| pertence a pelo menos um | $A\cup B$ |
| pertence a ambos | $A\cap B$ |
| pertence a $A$, mas não a $B$ | $A\setminus B$ |
| pertence a exatamente um | $A\mathbin{\triangle}B$ |
| não pertence a nenhum | $(A\cup B)^c$ |
| não pertence aos dois simultaneamente | $(A\cap B)^c$ |
| pertence somente a $A$ entre três grupos | $A\setminus(B\cup C)$ |
| pertence a pelo menos dois entre três | regiões duplas exclusivas e tripla |

“Não pertence a nenhum” e “não pertence a ambos” são diferentes:

$$
(A\cup B)^c=A^c\cap B^c,
$$

$$
(A\cap B)^c=A^c\cup B^c.
$$

## 25. Erros recorrentes

### 25.1. Confundir $\in$ e $\subseteq$

$x\in A$ compara elemento e conjunto. $B\subseteq A$ compara dois conjuntos.

### 25.2. Tratar repetição como novo elemento

Em conjuntos, $\{a,a,b\}=\{a,b\}$.

### 25.3. Esquecer vazio e conjunto total em $\mathcal P(A)$

Os $2^n$ subconjuntos incluem $\varnothing$ e $A$.

### 25.4. Supor que diferença comuta

$A\setminus B$ preserva elementos de $A$; $B\setminus A$ preserva elementos de $B$.

### 25.5. Calcular complemento sem universo

O resultado depende do conjunto universo declarado.

### 25.6. Ler “ou” como exclusivo

A união contém também a interseção. Exatamente um corresponde à diferença simétrica.

### 25.7. Subtrair a região tripla duas vezes

Na inclusão-exclusão de três conjuntos, a interseção tripla é adicionada ao final.

### 25.8. Interpretar interseções de pares como exclusivas

$A\cap B$ inclui elementos que também pertencem a $C$. Para obter “somente $A$ e $B$”, retire $A\cap B\cap C$.

### 25.9. Trocar componentes de um par ordenado

Em geral, $(a,b)\ne(b,a)$ e $A\times B\ne B\times A$.

### 25.10. Errar extremos de intervalos

Interseção exige satisfazer simultaneamente as condições. Complemento troca extremo incluído por excluído e vice-versa.

## 26. Roteiro de resolução

1. Declare ou identifique o universo.
2. Diferencie elementos de subconjuntos.
3. Traduza “ou”, “e”, “não”, “somente” e “exatamente”.
4. Se houver cardinalidades, desenhe e preencha primeiro a interseção mais interna.
5. Converta interseções inclusivas em regiões exclusivas antes de subtrair totais.
6. Use inclusão-exclusão para evitar dupla contagem.
7. Verifique se as regiões são não negativas e se a soma não excede o universo.
8. Em intervalos, teste cada extremo separadamente.
9. Em produtos cartesianos, preserve a ordem dos componentes.

## 27. Síntese

- Elementos relacionam-se por $\in$; conjuntos, por $\subseteq$.
- Igualdade exige os mesmos elementos; cardinalidade igual não basta.
- $\varnothing$ é subconjunto de todo conjunto, mas não é automaticamente elemento.
- Se $|A|=n$, então $|\mathcal P(A)|=2^n$.
- União traduz “ou” inclusivo; interseção traduz “e”.
- Diferença não é comutativa; complemento depende do universo.
- Diferença simétrica contém quem pertence a exatamente um conjunto.
- De Morgan troca união e interseção ao complementar.
- $|A\cup B|=|A|+|B|-|A\cap B|$.
- Em três conjuntos, preencha a região tripla antes das demais.
- $|A\times B|=|A|\,|B|$ para conjuntos finitos.
- Uma partição cobre o universo com blocos não vazios e disjuntos.
- Colchetes incluem extremos finitos; parênteses excluem.

## Referências

- CEBRASPE. [Edital do concurso público do TCE/MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Edital nº 1, de 6 de julho de 2026. Conteúdo comum de Raciocínio Lógico, item 6, “Operações com conjuntos”. Consultado em 18 jul. 2026.
- TRIBUNAL DE CONTAS DO ESTADO DO MARANHÃO. [Diário Oficial Eletrônico, publicação 9485](https://diario.apps.tcema.tc.br/publicacao/pdf/9485). Publicação do Edital nº 1 — TCE/MA, de 6 de julho de 2026. Consultado em 18 jul. 2026.
- BEMM, Laerte. [Lógica e teoria de conjuntos](https://prh.uem.br/kit/topicos-especiais/logica-e-teoria-de-conjuntos.pdf). Universidade Estadual de Maringá. Módulos sobre noções intuitivas, operações, propriedades, De Morgan, conjunto das partes e produto cartesiano. Consultado em 18 jul. 2026.
- ROISENBERG, Mauro. [Teoria dos conjuntos](https://www.inf.ufsc.br/~mauro.roisenberg/ine5403/slide/Conjuntos.PDF). Universidade Federal de Santa Catarina. Material sobre pertinência, inclusão, operações, produto cartesiano e cardinalidade. Consultado em 18 jul. 2026.
- UNIVERSIDADE FEDERAL DE JUIZ DE FORA. [Fundamentos de Matemática Elementar I](https://www2.ufjf.br/mat/files/2009/05/fundamentosdematemticaelementari.pdf). Programa da disciplina MAT003, com operações, conjunto das partes, diferença simétrica, produto cartesiano e cardinalidade. Consultado em 18 jul. 2026.
- UNIVERSIDADE FEDERAL DE UBERLÂNDIA. [Fundamentos de Lógica e Conjuntos](https://ime.ufu.br/system/files/conteudo/ges001.pdf). Ficha do componente GES001 do Bacharelado em Estatística. Consultado em 18 jul. 2026.
