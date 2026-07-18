# Lógica de primeira ordem

## Estrutura básica

| Elemento | Função |
|---|---|
| domínio $U\neq\varnothing$ | objetos sobre os quais se fala |
| constante $a$ | nomeia um objeto |
| variável $x$ | ocupa o lugar de um objeto |
| função $f(x)$ | recebe objetos e devolve objeto |
| predicado $P(x)$ | propriedade, produz fórmula |
| relação $R(x,y)$ | liga objetos, produz fórmula |
| igualdade $t_1=t_2$ | termos designam o mesmo objeto |

- Quantificadores de primeira ordem percorrem **objetos**.
- $\forall P$ quantificaria predicado e seria lógica de ordem superior.
- Constantes diferentes podem designar o mesmo objeto, salvo $a\neq b$.
- Aridade e ordem dos argumentos são fixas.

## Termo ou fórmula

| Expressão | Tipo |
|---|---|
| $a$, $x$, $f(a)$ | termo |
| $P(a)$, $R(x,y)$ | fórmula atômica |
| $a=b$ | fórmula atômica com igualdade |
| $\neg P(a)$ | fórmula |
| $\forall xP(x)$ | fórmula quantificada |

- Termo designa objeto.
- Fórmula pode ser verdadeira ou falsa.
- Função devolve termo; predicado forma fórmula.

## Quantificadores

$$
\forall x\,P(x)
$$

- $P$ vale para todo objeto do domínio.

$$
\exists x\,P(x)
$$

- ao menos um objeto satisfaz $P$;
- não significa exatamente um;
- não significa algum, mas não todos.

## Escopo e variáveis

| Fórmula | Ocorrências |
|---|---|
| $P(x)$ | $x$ livre |
| $\forall xP(x)$ | $x$ ligada |
| $\forall xR(x,y)$ | $x$ ligada; $y$ livre |
| $P(x)\land\exists xQ(x)$ | $x$ livre em $P$ e ligada em $Q$ |

- A classificação livre/ligada é feita por ocorrência.
- Sentença ou fórmula fechada não possui variável livre.
- Fórmula aberta exige atribuição às variáveis livres.
- Se $x$ não ocorre livre em $\varphi$, então, em domínio não vazio, $\forall x\varphi\equiv\varphi\equiv\exists x\varphi$.
- O nome de variável ligada pode mudar com renomeação segura:

$$
\forall xP(x)\equiv\forall zP(z).
$$

## Capture a ideia, não a variável

Em

$$
\exists yR(x,y),
$$

substituir $x$ por $y$ diretamente produziria $\exists yR(y,y)$ e capturaria a ocorrência.

Forma segura:

1. renomeie a ligada: $\exists zR(x,z)$;
2. faça a substituição desejada.

## Traduções categóricas

| Português | Fórmula |
|---|---|
| Todo $A$ é $B$ | $\forall x(A(x)\to B(x))$ |
| Nenhum $A$ é $B$ | $\forall x(A(x)\to\neg B(x))$ |
| Algum $A$ é $B$ | $\exists x(A(x)\land B(x))$ |
| Algum $A$ não é $B$ | $\exists x(A(x)\land\neg B(x))$ |

> Universal restrita usa implicação; existencial restrita usa conjunção.

## Formas erradas frequentes

“Todo $A$ é $B$” não é:

$$
\forall x(A(x)\land B(x)).
$$

Essa forma diz que todo objeto do domínio é $A$ e $B$.

“Algum $A$ é $B$” não é:

$$
\exists x(A(x)\to B(x)).
$$

Essa forma pode ser satisfeita por objeto que não seja $A$.

## Somente, nem todo e algum

“Somente $A$ são $B$”:

$$
\forall x(B(x)\to A(x)).
$$

“Nem todo $A$ é $B$”:

$$
\exists x(A(x)\land\neg B(x)).
$$

“Algum, mas não todos, tem $P$”:

$$
\exists xP(x)\land\exists x\neg P(x).
$$

## Relações e ordem dos quantificadores

Cada $A$ se relaciona com algum $B$:

$$
\forall x\bigl(A(x)\to
\exists y(B(y)\land R(x,y))\bigr).
$$

Existe um mesmo $B$ relacionado com todo $A$:

$$
\exists y\bigl(B(y)\land
\forall x(A(x)\to R(x,y))\bigr).
$$

Em geral:

$$
\forall x\exists yR(x,y)
\not\equiv
\exists y\forall xR(x,y).
$$

- $\forall x\exists y$: o testemunho pode variar.
- $\exists y\forall x$: um testemunho comum serve para todos.

## Trocas permitidas

$$
\forall x\forall yR(x,y)
\equiv
\forall y\forall xR(x,y)
$$

$$
\exists x\exists yR(x,y)
\equiv
\exists y\exists xR(x,y)
$$

Quantificadores mistos não trocam de ordem em geral.

## Negação de quantificadores

$$
\neg\forall x\varphi
\equiv
\exists x\neg\varphi
$$

$$
\neg\exists x\varphi
\equiv
\forall x\neg\varphi
$$

Regra:

1. troque $\forall$ e $\exists$;
2. negue o escopo;
3. continue De Morgan e demais equivalências.

## Negações essenciais

$$
\neg\forall x(A\to B)
\equiv
\exists x(A\land\neg B)
$$

- negação de “todo $A$ é $B$”: “algum $A$ não é $B$”.

$$
\neg\exists x(A\land B)
\equiv
\forall x(A\to\neg B)
$$

- negação de “algum $A$ é $B$”: “nenhum $A$ é $B$”.

$$
\neg\forall x\exists yR(x,y)
\equiv
\exists x\forall y\neg R(x,y)
$$

## Domínio e existência

Domínio clássico:

$$
U\neq\varnothing.
$$

Por isso:

$$
\forall xP(x)\models\exists xP(x).
$$

Mas:

$$
\forall x(A(x)\to B(x))
\not\models
\exists xA(x).
$$

- o domínio global possui objeto;
- a classe $A$ pode estar vazia;
- universal categórica não importa existência da classe-sujeito.

## Distribuições

Válidas:

$$
\forall x(P\land Q)
\equiv
(\forall xP)\land(\forall xQ)
$$

$$
\exists x(P\lor Q)
\equiv
(\exists xP)\lor(\exists xQ)
$$

Não válidas em geral:

$$
\forall x(P\lor Q)
\not\equiv
(\forall xP)\lor(\forall xQ)
$$

$$
\exists x(P\land Q)
\not\equiv
(\exists xP)\land(\exists xQ)
$$

Na última, o lado direito pode usar testemunhos diferentes.

## Existência e unicidade

Ao menos um:

$$
\exists xP(x)
$$

Ao menos dois distintos:

$$
\exists x\exists y(P(x)\land P(y)\land x\neq y)
$$

No máximo um:

$$
\forall x\forall y((P(x)\land P(y))\to x=y)
$$

Exatamente um:

$$
\exists x\bigl(P(x)\land\forall y(P(y)\to y=x)\bigr)
$$

## Semântica

| Conceito | Critério |
|---|---|
| $I,s\models\varphi$ | fórmula aberta verdadeira em $I$ sob a atribuição $s$ |
| $I\models\varphi$ | sentença $\varphi$ verdadeira em $I$ |
| modelo | interpretação que satisfaz a sentença/premissas |
| satisfatível | verdadeira em alguma interpretação e atribuição |
| válida | verdadeira em toda interpretação e atribuição |
| insatisfatível | falsa em toda interpretação e atribuição |
| $\Gamma\models\varphi$ | toda interpretação e atribuição que satisfazem $\Gamma$ satisfazem $\varphi$ |

Exemplos:

$$
\exists xP(x)
$$

- satisfatível, mas não válida.

$$
\forall x(P(x)\lor\neg P(x))
$$

- válida na lógica clássica.

$$
\exists x(P(x)\land\neg P(x))
$$

- insatisfatível.

## Contramodelo

Para refutar $\Gamma\models\varphi$:

1. torne todas as premissas verdadeiras;
2. torne a conclusão falsa.

Para refutar

$$
\exists xP(x),\ \exists xQ(x)
\models
\exists x(P(x)\land Q(x)),
$$

use:

$$
U=\{a,b\},\quad P^I=\{a\},\quad Q^I=\{b\}.
$$

## Regras elementares

Instanciação universal:

$$
\forall xP(x)\therefore P(t)
$$

- $t$ deve ser livre para $x$.

Generalização existencial:

$$
P(t)\therefore\exists xP(x)
$$

Testemunha existencial:

- de $\exists xP(x)$ não conclua $P(a)$ para constante já escolhida;
- use nome novo e temporário em demonstração.

Generalização universal:

- o objeto deve ser arbitrário;
- de $P(a)$ particular não segue $\forall xP(x)$.

Igualdade:

$$
a=b,\ P(a)\therefore P(b).
$$

## Inferências rápidas

Válida:

$$
\forall x(P\to Q),\ \exists xP
\models
\exists xQ.
$$

Inválidas:

$$
\forall x(P\to Q)
\not\models
\forall x(Q\to P)
$$

$$
\forall x(P\to Q)
\not\models
\exists xP
$$

$$
\exists xP,\ \exists xQ
\not\models
\exists x(P\land Q)
$$

$$
\forall x\exists yR
\not\models
\exists y\forall xR
$$

## Pegadinhas

- Termo não é fórmula.
- Função não é predicado.
- Preserve aridade e ordem dos argumentos.
- Parênteses definem o escopo.
- Universal restrita usa implicação.
- Existencial restrita usa conjunção.
- “Somente $A$ são $B$” inverte a direção: $B\to A$.
- “Nem todo” não significa “nenhum”.
- Negação troca quantificador.
- $\forall\exists$ não é $\exists\forall$.
- Universais categóricas não garantem classe-sujeito não vazia.
- Testemunhos de duas existenciais podem ser diferentes.
- Constantes distintas podem coincidir.
- Uma interpretação e atribuição favoráveis provam satisfatibilidade, não validade.
- Uma interpretação e atribuição contrárias bastam para refutar validade.
