# Lógica de primeira ordem

## Mapa básico

| Elemento | Regra de prova |
|---|---|
| domínio $U\neq\varnothing$ | objetos percorridos pelas variáveis |
| constante $a$ | nomeia objeto |
| variável $x$ | representa objeto |
| função $f(x)$ | recebe objeto(s) e devolve objeto |
| predicado $P(x)$ | produz afirmação |
| relação $R(x,y)$ | predicado com mais de um argumento |
| aridade | quantidade fixa de argumentos |
| igualdade $a=b$ | identidade entre objetos designados |

**Termo ≠ fórmula:** $f(a)$ é termo; $P(f(a))$ é fórmula.

## Traduções obrigatórias

| Português | Fórmula |
|---|---|
| Todo $A$ é $B$ | $\forall x(A\to B)$ |
| Nenhum $A$ é $B$ | $\forall x(A\to\neg B)$ |
| Algum $A$ é $B$ | $\exists x(A\land B)$ |
| Algum $A$ não é $B$ | $\exists x(A\land\neg B)$ |

> **Universal restrita → implicação. Existencial restrita → conjunção.**

## Palavras que invertem ou restringem

| Frase | Leitura |
|---|---|
| Somente $A$ são $B$ | todo $B$ é $A$: $B\to A$ |
| Nem todo $A$ é $B$ | existe $A$ que não é $B$ |
| Algum $A$ é $B$ | ao menos um; pode ser todos |

“Somente servidores acessam”:

$$
Acessa(x)\to Servidor(x).
$$

Não conclua $Servidor(x)\to Acessa(x)$.

## Negação sem erro

$$
\neg\forall x\varphi\equiv\exists x\neg\varphi
$$

$$
\neg\exists x\varphi\equiv\forall x\neg\varphi
$$

| Original | Negação |
|---|---|
| todo $A$ é $B$ | algum $A$ não é $B$ |
| nenhum $A$ é $B$ | algum $A$ é $B$ |
| algum $A$ é $B$ | nenhum $A$ é $B$ |
| algum $A$ não é $B$ | todo $A$ é $B$ |

**CEBRASPE:** negar “todos” não produz “nenhum”; produz **contraexemplo existencial**.

## Ordem dos quantificadores

$$
\forall x\exists yR(x,y)
$$

→ para cada $x$, pode haver um $y$ diferente.

$$
\exists y\forall xR(x,y)
$$

→ um mesmo $y$ funciona para todo $x$.

Em geral:

$$
\forall x\exists yR(x,y)\not\equiv\exists y\forall xR(x,y).
$$

Trocas seguras:

$$
\forall x\forall yR\equiv\forall y\forall xR
$$

$$
\exists x\exists yR\equiv\exists y\exists xR.
$$

## Escopo e variáveis

| Fórmula | Situação |
|---|---|
| $P(x)$ | $x$ livre |
| $\forall xP(x)$ | $x$ ligada |
| $\forall xR(x,y)$ | $x$ ligada; $y$ livre |
| $P(x)\land\exists xQ(x)$ | $x$ livre em $P$ e ligada em $Q$ |

**Sentença:** fórmula sem variável livre.

## Existência: pegadinha central

Domínio clássico não vazio:

$$
\forall xP(x)\models\exists xP(x).
$$

Mas:

$$
\forall x(A(x)\to B(x))\not\models\exists xA(x).
$$

A classe $A$ pode ser vazia. **Universal categórica não cria existência.**

## Distribuições

Válidas:

$$
\forall x(P\land Q)\equiv(\forall xP)\land(\forall xQ)
$$

$$
\exists x(P\lor Q)\equiv(\exists xP)\lor(\exists xQ)
$$

Não válidas em geral:

$$
\forall x(P\lor Q)\not\equiv(\forall xP)\lor(\forall xQ)
$$

$$
\exists x(P\land Q)\not\equiv(\exists xP)\land(\exists xQ)
$$

Na última, os testemunhos podem ser diferentes.

## Validade e contramodelo

| Conceito | Atalho |
|---|---|
| satisfatível | verdadeira em alguma interpretação |
| válida | verdadeira em todas |
| insatisfatível | verdadeira em nenhuma |
| contramodelo | premissas verdadeiras + conclusão falsa |

Uma interpretação favorável prova **satisfatibilidade**, não validade.

Um único contramodelo refuta a consequência lógica.

## Inferências rápidas

Válida:

$$
\forall x(P\to Q),\ \exists xP\models\exists xQ.
$$

Inválidas:

$$
\forall x(P\to Q)\not\models\forall x(Q\to P)
$$

$$
\forall x(P\to Q)\not\models\exists xP
$$

$$
\exists xP,\ \exists xQ\not\models\exists x(P\land Q)
$$

$$
\forall x\exists yR\not\models\exists y\forall xR.
$$

## Checklist de questão

1. Qual é o domínio?
2. Predicados e relações têm qual aridade?
3. Há “todo”, “algum”, “nenhum”, “somente” ou “nem todo”?
4. Universal restrita usa $\to$; existencial restrita usa $\land$.
5. Qual é o escopo de cada quantificador?
6. $\forall\exists$ ou $\exists\forall$?
7. Negou? Troque $\forall\leftrightarrow\exists$ e negue o escopo.
8. A conclusão inventou existência ou unificou testemunhos diferentes?
9. Suspeita de invalidade? Monte domínio com 1 ou 2 objetos.

## Pegadinhas finais

- Função não é predicado.
- Termo não recebe valor lógico isoladamente.
- Preserve aridade e ordem dos argumentos.
- Constantes diferentes podem nomear o mesmo objeto.
- “Somente” aponta condição necessária.
- “Nem todo” ≠ “nenhum”.
- Negação de universal é existencial.
- Quantificadores mistos não comutam em geral.
- Universal categórica não garante existência da classe-sujeito.
- Duas existenciais podem usar testemunhos distintos.
