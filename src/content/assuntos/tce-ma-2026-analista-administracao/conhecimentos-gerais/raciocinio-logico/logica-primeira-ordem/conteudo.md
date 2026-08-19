---
schemaVersion: 1
title: Lógica de primeira ordem
description: Linguagem, quantificadores, tradução, negação, ordem dos quantificadores, modelos e inferências elementares da lógica de primeira ordem.
order: 40
storageId: logica-primeira-ordem
---

## 1. Recorte do assunto

A **lógica de primeira ordem (LPO)**, ou lógica de predicados, amplia a lógica proposicional ao explicitar a estrutura interna de enunciados como:

- todo servidor é agente público;
- algum processo contém informação sigilosa;
- cada auditor analisa algum processo;
- existe um processo analisado por todos os auditores.

Na LPO, os quantificadores percorrem **objetos de um domínio**. Quantificar propriedades, relações ou conjuntos pertence a lógicas de ordem superior e não integra este recorte.

O foco de prova é reconhecer a linguagem, traduzir enunciados, negar quantificadores, distinguir ordens de quantificação e avaliar inferências simples.

## 2. Elementos da linguagem

### 2.1. Domínio

O **domínio** ou **universo do discurso** é o conjunto de objetos sobre os quais se fala. Na semântica clássica usual, ele é não vazio:

$$
U\neq\varnothing.
$$

O mesmo enunciado pode mudar de valor lógico quando o domínio muda. Por isso, antes de avaliar uma fórmula, identifique sobre quais objetos as variáveis estão quantificando.

### 2.2. Constantes, variáveis, funções e predicados

| Elemento | Papel | Exemplo |
|---|---|---|
| constante | nomeia um objeto | $a$ |
| variável | ocupa o lugar de um objeto | $x$ |
| função | recebe objetos e devolve objeto | $chefia(x)$ |
| predicado unário | expressa propriedade | $Servidor(x)$ |
| predicado binário | expressa relação | $Analisa(x,y)$ |
| igualdade | afirma identidade | $a=b$ |

A **aridade** é o número de argumentos exigidos. Se $R$ é binário, $R(a,b)$ é bem formada; $R(a)$ e $R(a,b,c)$ não são.

Constantes diferentes não precisam nomear objetos diferentes. Sem premissa como $a\neq b$, é possível que $a$ e $b$ tenham o mesmo referente.

### 2.3. Termos e fórmulas

**Termos** designam objetos:

$$
a,\quad x,\quad f(a),\quad g(x,a).
$$

**Fórmulas** afirmam algo e podem ser verdadeiras ou falsas:

$$
P(a),\quad R(x,a),\quad a=b,\quad \neg P(a).
$$

Regra útil: função produz **termo**; predicado aplicado a termos produz **fórmula**.

## 3. Quantificadores

### 3.1. Universal

$$
\forall x\,P(x)
$$

Significa: **para todo objeto $x$ do domínio, $P(x)$**.

### 3.2. Existencial

$$
\exists x\,P(x)
$$

Significa: **existe ao menos um objeto $x$ do domínio para o qual $P(x)$**.

O existencial não significa “exatamente um” nem “algum, mas não todos”. Ele admite um ou vários objetos.

## 4. Escopo, variáveis livres e sentenças

O **escopo** de um quantificador é a subfórmula sobre a qual ele atua.

Em

$$
\forall x(P(x)\to\exists y\,R(x,y)),
$$

$\forall x$ alcança toda a condicional e $\exists y$ alcança $R(x,y)$.

Uma ocorrência é **ligada** quando está no escopo de um quantificador para a mesma variável; caso contrário, é **livre**.

| Fórmula | Situação |
|---|---|
| $P(x)$ | $x$ livre |
| $\forall xP(x)$ | $x$ ligada |
| $\forall xR(x,y)$ | $x$ ligada; $y$ livre |
| $P(x)\land\exists xQ(x)$ | $x$ livre em $P$ e ligada em $Q$ |

Uma **sentença** ou fórmula fechada não possui variável livre. Fórmulas abertas dependem também de uma atribuição às variáveis livres.

## 5. Traduções que mais caem

Considere $A(x)$ para “$x$ é $A$” e $B(x)$ para “$x$ é $B$”.

| Português | Fórmula |
|---|---|
| Todo $A$ é $B$ | $\forall x(A(x)\to B(x))$ |
| Nenhum $A$ é $B$ | $\forall x(A(x)\to\neg B(x))$ |
| Algum $A$ é $B$ | $\exists x(A(x)\land B(x))$ |
| Algum $A$ não é $B$ | $\exists x(A(x)\land\neg B(x))$ |

### 5.1. Universal restrita usa implicação

“Todo servidor é treinado”:

$$
\forall x(Servidor(x)\to Treinado(x)).
$$

Não use

$$
\forall x(Servidor(x)\land Treinado(x)),
$$

pois isso diria que **todo objeto do domínio** é servidor e treinado.

### 5.2. Existencial restrita usa conjunção

“Algum servidor é treinado”:

$$
\exists x(Servidor(x)\land Treinado(x)).
$$

Não use

$$
\exists x(Servidor(x)\to Treinado(x)),
$$

porque um objeto que não seja servidor já tornaria a condicional verdadeira.

## 6. “Somente”, “nem todo” e “algum”

“Somente servidores acessam o sistema” significa:

$$
\forall x(Acessa(x)\to Servidor(x)).
$$

A palavra **somente** aponta a condição necessária: quem acessa deve ser servidor. A frase não afirma que todo servidor acessa.

“Nem todo servidor é treinado” significa:

$$
\exists x(Servidor(x)\land\neg Treinado(x)).
$$

“Algum” significa **ao menos um**, sem excluir que todos satisfaçam a propriedade.

## 7. Ordem dos quantificadores

Predicados relacionais tornam a ordem decisiva.

### 7.1. Cada auditor analisa algum processo

$$
\forall x\bigl(Auditor(x)\to\exists y(Processo(y)\land Analisa(x,y))\bigr).
$$

O processo pode variar conforme o auditor.

### 7.2. Existe um processo analisado por todos os auditores

$$
\exists y\bigl(Processo(y)\land\forall x(Auditor(x)\to Analisa(x,y))\bigr).
$$

Agora há um **mesmo** processo que funciona para todos.

Em geral:

$$
\forall x\exists y\,R(x,y)\not\equiv\exists y\forall x\,R(x,y).
$$

Quantificadores consecutivos do mesmo tipo podem trocar de ordem:

$$
\forall x\forall yR(x,y)\equiv\forall y\forall xR(x,y),
$$

$$
\exists x\exists yR(x,y)\equiv\exists y\exists xR(x,y).
$$

## 8. Negação de quantificadores

As equivalências fundamentais são:

$$
\neg\forall x\,\varphi(x)\equiv\exists x\,\neg\varphi(x),
$$

$$
\neg\exists x\,\varphi(x)\equiv\forall x\,\neg\varphi(x).
$$

Procedimento:

1. troque $\forall$ por $\exists$, ou $\exists$ por $\forall$;
2. negue o escopo;
3. aplique De Morgan e a negação da condicional, se necessário.

Exemplo:

$$
\neg\forall x(A(x)\to B(x))
\equiv
\exists x(A(x)\land\neg B(x)).
$$

Logo, a negação de **“todo $A$ é $B$”** é **“algum $A$ não é $B$”**, e não “nenhum $A$ é $B$”.

Para quantificadores sucessivos:

$$
\neg\forall x\exists yR(x,y)
\equiv
\exists x\forall y\neg R(x,y).
$$

## 9. Existência e universais categóricas

Como o domínio global é não vazio:

$$
\forall xP(x)\models\exists xP(x).
$$

Mas a universal categórica

$$
\forall x(A(x)\to B(x))
$$

**não** garante que exista algum $A$.

Se $A$ tiver extensão vazia, não haverá contraexemplo $A\land\neg B$, e a universal será verdadeira. Portanto:

$$
\forall x(A(x)\to B(x))\not\models\exists xA(x).
$$

Essa distinção é uma pegadinha recorrente: domínio não vazio não significa que toda classe definida por predicado tenha elementos.

## 10. Distribuições úteis

São válidas:

$$
\forall x(P(x)\land Q(x))
\equiv
(\forall xP(x))\land(\forall xQ(x)),
$$

$$
\exists x(P(x)\lor Q(x))
\equiv
(\exists xP(x))\lor(\exists xQ(x)).
$$

Não são equivalências em geral:

$$
\forall x(P(x)\lor Q(x))
\not\equiv
(\forall xP(x))\lor(\forall xQ(x)),
$$

$$
\exists x(P(x)\land Q(x))
\not\equiv
(\exists xP(x))\land(\exists xQ(x)).
$$

Na última forma, os dois existenciais do lado direito podem ter testemunhos diferentes.

## 11. Modelos, validade e contramodelos

Uma **interpretação** dá significado aos símbolos da linguagem. Uma interpretação que torna verdadeira uma sentença é um **modelo** dela.

- **satisfatível**: verdadeira em ao menos uma interpretação;
- **válida**: verdadeira em todas as interpretações admissíveis;
- **insatisfatível**: falsa em todas as interpretações admissíveis.

Exemplos:

$$
\exists xP(x)
$$

é satisfatível, mas não válida.

$$
\forall x(P(x)\lor\neg P(x))
$$

é válida na lógica clássica.

$$
\exists x(P(x)\land\neg P(x))
$$

é insatisfatível.

Para mostrar que uma conclusão **não** decorre das premissas, basta construir um **contramodelo**: premissas verdadeiras e conclusão falsa.

Exemplo inválido:

$$
\exists xP(x),\qquad\exists xQ(x)
\quad\therefore\quad
\exists x(P(x)\land Q(x)).
$$

Tome

$$
U=\{a,b\},\qquad P^I=\{a\},\qquad Q^I=\{b\}.
$$

As premissas são verdadeiras, mas nenhum mesmo objeto possui $P$ e $Q$.

## 12. Inferências elementares

### Instanciação universal

$$
\forall xP(x)\quad\therefore\quad P(a).
$$

Se vale para todo objeto, vale para o objeto nomeado por $a$.

### Generalização existencial

$$
P(a)\quad\therefore\quad\exists xP(x).
$$

Se um objeto possui $P$, então existe objeto com $P$.

### Cuidado com testemunhos

De

$$
\exists xP(x)
$$

não se conclui $P(a)$ para uma constante previamente escolhida: o testemunho pode ser outro objeto.

### Cuidado com generalização universal

De $P(a)$ para um indivíduo particular não segue $\forall xP(x)$. Para generalizar, o objeto considerado precisa ser arbitrário.

### Cadeia válida frequente

$$
\forall x(A(x)\to B(x)),
$$

$$
\forall x(B(x)\to C(x)),
$$

$$
\exists xA(x)
$$

implicam

$$
\exists xC(x).
$$

## 13. Padrão oficial do CEBRASPE

Em item oficial da prova de Escrivão da <abbr title="Polícia Civil do Distrito Federal">PCDF</abbr>, o <abbr title="Centro Brasileiro de Pesquisa em Avaliação e Seleção e de Promoção de Eventos">CEBRASPE</abbr> julgou errada a afirmação de que a negação de “Todos são iguais perante a lei” seria “Todos são diferentes perante a lei”. A justificativa oficial aponta a forma existencial: **nem todos** possuem a propriedade, isto é, **existe ao menos um contraexemplo**.

O padrão é exatamente:

$$
\neg\forall xP(x)\equiv\exists x\neg P(x).
$$

## 14. Pegadinhas e roteiro de resolução

### Pegadinhas

- termo não é fórmula;
- função não é predicado;
- preserve aridade e ordem dos argumentos;
- universal restrita usa implicação;
- existencial restrita usa conjunção;
- “somente $A$ são $B$” significa $B\to A$;
- “nem todo” não significa “nenhum”;
- negar quantificador troca $\forall$ e $\exists$;
- $\forall\exists$ não equivale a $\exists\forall$;
- universal categórica não garante existência da classe-sujeito;
- testemunhos de duas existenciais podem ser diferentes;
- uma interpretação favorável mostra satisfatibilidade, não validade;
- um contramodelo basta para refutar uma consequência lógica.

### Roteiro

1. Identifique o domínio.
2. Defina predicados e relações com suas aridades.
3. Localize “todo”, “algum”, “nenhum”, “somente” e negações.
4. Use implicação na universal restrita e conjunção na existencial restrita.
5. Marque o escopo dos quantificadores.
6. Confira a ordem de $\forall$ e $\exists$.
7. Para negar, troque o quantificador e negue o escopo.
8. Para testar invalidade, tente um domínio pequeno que torne premissas verdadeiras e conclusão falsa.

## Referências

- CEBRASPE. [Edital do concurso público do TCE/MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Edital nº 1, de 6 de julho de 2026. Raciocínio Lógico, item 4, “Lógica de primeira ordem”.
- CEBRASPE. [Matriz com justificativas da prova de Escrivão da Polícia Civil do Distrito Federal](https://cdn.cebraspe.org.br/concursos/PC_DF_19_ESCRIVAO/arquivos/MATRIZ_519_PCDF_001_00_BONECA_COMJUSTIFICATIVA.PDF). Item 117.
- PONTIFÍCIA UNIVERSIDADE CATÓLICA DE SÃO PAULO. [O cálculo de predicados de primeira ordem](https://www4.pucsp.br/~logica/CalculodePredicados.htm).
- UNIVERSIDADE DE ÉVORA. [Sintaxe da lógica de primeira ordem](https://home.uevora.pt/~fc/lc/lpo/sintaxe.html).
- UNIVERSIDADE DE ÉVORA. [Interpretação](https://home.uevora.pt/~fc/lc/lpo/interpretacao.html).
- UNIVERSIDADE DE ÉVORA. [Consequência semântica de primeira ordem](https://home.uevora.pt/~fc/lc/lpo/consequencia-semantica.html).
