---
schemaVersion: 1
title: Lógica de primeira ordem
description: Linguagem, interpretação, quantificadores, variáveis, tradução, modelos, validade e inferências elementares da lógica de primeira ordem.
order: 40
storageId: logica-primeira-ordem
---

## 1. Por que a lógica proposicional não basta

A lógica proposicional trata cada proposição simples como um bloco indivisível. Ela permite estudar a forma

$$
p \to q,
$$

mas não mostra a estrutura interna de frases como:

- todo servidor é agente público;
- algum processo contém informação sigilosa;
- cada auditor examinou algum relatório;
- existe um relatório examinado por todos os auditores.

A **lógica de primeira ordem**, também chamada de **lógica de predicados de primeira ordem**, amplia a linguagem proposicional. Ela permite representar:

1. os objetos sobre os quais se fala;
2. propriedades desses objetos;
3. relações entre dois ou mais objetos;
4. expressões como “todo”, “algum” e “nenhum”;
5. a identidade entre objetos.

Compare:

| Linguagem | Representação | O que fica visível |
|---|---|---|
| proposicional | $p$ | apenas o valor lógico da frase completa |
| primeira ordem | $Servidor(a)$ | o predicado e o objeto ao qual ele se aplica |
| primeira ordem | $\forall x(Servidor(x)\to AgentePublico(x))$ | a propriedade comum a todos os servidores |

O termo **primeira ordem** indica que os quantificadores percorrem objetos do domínio. Quantificar propriedades, relações ou conjuntos, como em $\forall P$, exigiria uma lógica de ordem superior e está fora deste assunto.

## 2. Limites e pré-requisitos

Este assunto pressupõe os conectivos já estudados:

$$
\neg,\quad \land,\quad \lor,\quad \to,\quad \leftrightarrow.
$$

Também formaliza os enunciados categóricos do assunto anterior:

- todo $A$ é $B$;
- nenhum $A$ é $B$;
- algum $A$ é $B$;
- algum $A$ não é $B$.

O foco agora é a linguagem quantificada, não a repetição dos diagramas de classes. Permanecem para outros assuntos:

| Tema | Assunto próprio |
|---|---|
| operações gerais e cardinalidade de conjuntos | Assunto 042 |
| contagem e probabilidade | Assunto 041 |
| lógica modal e lógica de ordem superior | fora do edital |
| teoria de modelos e sistemas formais avançados | fora do recorte introdutório |

## 3. Domínio ou universo do discurso

Toda interpretação de primeira ordem possui um **domínio**, também chamado de **universo do discurso**. Ele reúne os objetos sobre os quais as variáveis e os símbolos da linguagem serão interpretados.

Exemplos de domínio:

- todos os servidores de um órgão;
- todos os processos de um acervo;
- os números naturais;
- pessoas, processos e unidades administrativas reunidos no mesmo universo.

Na semântica clássica usual adotada neste material, o domínio $U$ é **não vazio**:

$$
U\neq\varnothing.
$$

O domínio altera o sentido das fórmulas. A sentença

$$
\forall x\, MaiorQueZero(x)
$$

pode ser verdadeira em um domínio formado apenas pelos inteiros positivos e falsa no domínio de todos os inteiros.

> Antes de avaliar uma fórmula, identifique sobre quais objetos os quantificadores variam.

## 4. Vocabulário da linguagem

Uma linguagem de primeira ordem contém símbolos de tipos diferentes.

### 4.1. Constantes

Uma **constante** nomeia um objeto do domínio.

Exemplos:

$$
a,\quad b,\quad maria,\quad processo1.
$$

Se $a$ representa Ana, a fórmula $Servidor(a)$ afirma que Ana é servidora.

Dois símbolos constantes diferentes não precisam nomear objetos diferentes. Sem uma premissa como $a\neq b$, é possível que $a$ e $b$ tenham o mesmo referente.

### 4.2. Variáveis

Uma **variável** ocupa o lugar de um objeto ainda não fixado:

$$
x,\quad y,\quad z.
$$

Variáveis de primeira ordem percorrem objetos do domínio. Elas não percorrem predicados, funções ou fórmulas.

### 4.3. Símbolos funcionais

Uma **função** recebe objetos do domínio e devolve um objeto do mesmo domínio.

Exemplos:

- $chefia(x)$: a chefia de $x$;
- $sucessor(x)$: o sucessor de $x$;
- $soma(x,y)$: a soma de $x$ e $y$ em um domínio numérico.

Uma função unária tem aridade 1; uma função binária, aridade 2. Em geral:

$$
f^I:U^n\to U.
$$

Na semântica usual, o símbolo funcional é interpretado como função total: para toda entrada adequada, há uma saída no domínio.

### 4.4. Predicados e relações

Um **predicado unário** representa uma propriedade:

$$
Servidor(x),\quad Sigiloso(x).
$$

Um **predicado binário** representa uma relação entre dois objetos:

$$
Analisa(x,y),\quad SuperiorA(x,y).
$$

Predicados podem ter qualquer aridade fixa. Um predicado $n$-ário é interpretado como um conjunto de $n$-uplas:

$$
R^I\subseteq U^n.
$$

A ordem dos argumentos importa. $Analisa(a,p)$ não tem o mesmo sentido de $Analisa(p,a)$.

### 4.5. Igualdade

Quando a linguagem possui igualdade, a fórmula

$$
t_1=t_2
$$

afirma que os dois termos designam o mesmo objeto. A igualdade é identidade no domínio, não mera semelhança.

## 5. Termos e fórmulas atômicas

### 5.1. Termos

**Termos** designam objetos. São termos:

1. constantes;
2. variáveis;
3. aplicações completas de funções a termos.

Exemplo: se $a$ é constante, $x$ é variável, $f$ é unária e $g$ é binária, então são termos:

$$
a,\quad x,\quad f(a),\quad g(x,f(a)).
$$

Um símbolo funcional isolado não é termo quando seus argumentos obrigatórios estão ausentes.

### 5.2. Fórmulas atômicas

Uma aplicação completa de predicado a termos forma uma **fórmula atômica**:

$$
P(a),\quad Q(x),\quad R(x,f(a)).
$$

Com igualdade, $t_1=t_2$ também é fórmula atômica.

Não confunda os tipos:

| Expressão | Tipo |
|---|---|
| $f(a)$ | termo, designa objeto |
| $P(a)$ | fórmula, pode ser verdadeira ou falsa |
| $a$ | termo |
| $a=b$ | fórmula atômica |
| $P$ isolado, se unário | expressão incompleta |

## 6. Formação de fórmulas

As fórmulas complexas são construídas recursivamente:

1. toda fórmula atômica é fórmula;
2. se $\varphi$ e $\psi$ são fórmulas, então $\neg\varphi$, $(\varphi\land\psi)$, $(\varphi\lor\psi)$, $(\varphi\to\psi)$ e $(\varphi\leftrightarrow\psi)$ são fórmulas;
3. se $\varphi$ é fórmula e $x$ é variável, então $\forall x\,\varphi$ e $\exists x\,\varphi$ são fórmulas.

Exemplos:

$$
\forall x(P(x)\to Q(x)),
$$

$$
\exists x(P(x)\land R(x,a)),
$$

$$
\forall x\exists y\,Analisa(x,y).
$$

Use parênteses para deixar o alcance explícito. A escrita

$$
\forall x(P(x)\to Q(x))
$$

é mais segura que uma sequência sem agrupamento visível.

## 7. Quantificadores

### 7.1. Quantificador universal

O quantificador universal significa “para todo”:

$$
\forall x\,\varphi(x).
$$

A fórmula é verdadeira sob uma interpretação e uma atribuição às demais variáveis livres quando $\varphi$ vale para cada objeto do domínio atribuído a $x$.

### 7.2. Quantificador existencial

O quantificador existencial significa “existe ao menos um”:

$$
\exists x\,\varphi(x).
$$

A fórmula é verdadeira sob uma interpretação e uma atribuição às demais variáveis livres quando ao menos um objeto do domínio, atribuído a $x$, satisfaz $\varphi$.

O quantificador existencial não significa “exatamente um” nem “algum, mas não todos”. Ele exige somente um ou mais testemunhos.

### 7.3. Testemunho

Um objeto que torna verdadeira uma fórmula existencial é chamado de **testemunho**.

Se

$$
\exists x\,Servidor(x)
$$

é verdadeira, algum objeto do domínio satisfaz $Servidor$. A fórmula, sozinha, não informa qual nome da linguagem designa esse objeto.

## 8. Escopo, ocorrências livres e ligadas

O **escopo** de um quantificador é a subfórmula sobre a qual ele atua.

Em

$$
\forall x(P(x)\to \exists y\,R(x,y)),
$$

o quantificador $\forall x$ alcança toda a condicional, enquanto $\exists y$ alcança apenas $R(x,y)$.

### 8.1. Ocorrência ligada

Uma ocorrência de $x$ é **ligada** quando está no escopo de um quantificador $\forall x$ ou $\exists x$ correspondente.

### 8.2. Ocorrência livre

Uma ocorrência é **livre** quando nenhum quantificador correspondente a alcança.

Exemplos:

| Fórmula | Situação das variáveis |
|---|---|
| $P(x)$ | $x$ livre |
| $\forall xP(x)$ | $x$ ligada |
| $\forall xR(x,y)$ | $x$ ligada, $y$ livre |
| $P(x)\land\exists xQ(x)$ | primeira ocorrência de $x$ livre; ocorrência em $Q$ ligada |

A mesma letra pode ter ocorrências livres e ligadas na mesma fórmula. A classificação é feita por ocorrência.

### 8.3. Sentença ou fórmula fechada

Uma **sentença** é uma fórmula sem ocorrências livres. Ela pode ser avaliada como verdadeira ou falsa apenas a partir da interpretação.

Uma fórmula aberta, como $P(x)$, depende também do objeto atribuído à variável livre $x$.

### 8.4. Quantificação vácua

Se $x$ não ocorre livre em uma fórmula $\varphi$, quantificar $x$ não altera seu valor. Em domínio não vazio:

$$
\forall x\varphi\equiv\varphi\equiv\exists x\varphi.
$$

Isso ocorre porque o valor de $\varphi$ não depende do objeto atribuído a $x$. A ressalva do domínio não vazio é relevante para o quantificador existencial.

## 9. Renomeação e captura de variável

O nome de uma variável ligada pode ser alterado sem mudar o sentido, desde que a troca seja consistente e não capture ocorrências livres:

$$
\forall xP(x)\equiv\forall zP(z).
$$

Essa operação é chamada de **renomeação de variável ligada** ou renomeação alfa.

Há captura quando uma substituição faz uma variável antes livre cair indevidamente sob um quantificador.

Considere:

$$
\exists y\,R(x,y).
$$

Substituir ingenuamente o $x$ livre por $y$ produziria

$$
\exists y\,R(y,y),
$$

que diz outra coisa. Para evitar a captura, primeiro renomeie a variável ligada:

$$
\exists z\,R(x,z),
$$

e só então faça a substituição desejada.

> Regras de instanciação exigem que o termo usado seja livre para a variável na fórmula.

## 10. Interpretação dos símbolos

Uma fórmula possui forma sintática; a interpretação fornece significado aos símbolos.

Uma interpretação $I$ em domínio $U$ atribui:

- a cada constante, um objeto de $U$;
- a cada função $n$-ária, uma função $U^n\to U$;
- a cada predicado $n$-ário, uma relação contida em $U^n$;
- à igualdade, a identidade entre objetos de $U$.

Exemplo:

$$
U=\{Ana,Bruno\}.
$$

Defina:

$$
Servidor^I=\{Ana\},
$$

$$
Treinado^I=\{Ana,Bruno\}.
$$

Então:

- $\exists xServidor(x)$ é verdadeira;
- $\forall xServidor(x)$ é falsa;
- $\forall xTreinado(x)$ é verdadeira;
- $\forall x(Servidor(x)\to Treinado(x))$ é verdadeira;
- $\exists x(Servidor(x)\land\neg Treinado(x))$ é falsa.

Mudar as extensões dos predicados pode mudar esses valores sem alterar a fórmula escrita.

## 11. Tradução dos quatro enunciados categóricos

Considere $A(x)$ para “$x$ é $A$” e $B(x)$ para “$x$ é $B$”.

| Enunciado | Fórmula |
|---|---|
| Todo $A$ é $B$ | $\forall x(A(x)\to B(x))$ |
| Nenhum $A$ é $B$ | $\forall x(A(x)\to\neg B(x))$ |
| Algum $A$ é $B$ | $\exists x(A(x)\land B(x))$ |
| Algum $A$ não é $B$ | $\exists x(A(x)\land\neg B(x))$ |

Regra prática:

- em universal restrita, use **implicação**;
- em existencial restrita, use **conjunção**.

### 11.1. Por que a universal usa implicação

“Todo servidor é treinado” restringe apenas os objetos que são servidores:

$$
\forall x(Servidor(x)\to Treinado(x)).
$$

A forma

$$
\forall x(Servidor(x)\land Treinado(x))
$$

afirmaria que todo objeto do domínio é, simultaneamente, servidor e treinado. É muito mais forte.

### 11.2. Por que a existencial usa conjunção

“Algum servidor é treinado” exige um mesmo objeto com as duas propriedades:

$$
\exists x(Servidor(x)\land Treinado(x)).
$$

A forma

$$
\exists x(Servidor(x)\to Treinado(x))
$$

pode ser satisfeita por um objeto que nem sequer seja servidor, pois uma condicional com antecedente falso é verdadeira.

## 12. “Somente”, “nem todo” e outras traduções

### 12.1. Somente

“Somente servidores acessam o sistema” significa que qualquer pessoa que acessa é servidora:

$$
\forall x(Acessa(x)\to Servidor(x)).
$$

Não significa, por si só, que todos os servidores acessam.

> “Somente $A$ são $B$” traduz-se como “todo $B$ é $A$”.

### 12.2. Nem todo

“Nem todo servidor é treinado” significa que existe servidor não treinado:

$$
\exists x(Servidor(x)\land\neg Treinado(x)).
$$

Não equivale a dizer que nenhum servidor é treinado.

### 12.3. Todos não

A expressão “todos não” pode ser ambígua na linguagem corrente. Prefira uma forma inequívoca:

- “nenhum $A$ é $B$”: $\forall x(A(x)\to\neg B(x))$;
- “nem todo $A$ é $B$”: $\exists x(A(x)\land\neg B(x))$.

### 12.4. Algum

Em lógica, “algum” significa “ao menos um”. Para afirmar “algum, mas não todos”, são necessárias duas condições:

$$
\exists xP(x)\land\exists x\neg P(x).
$$

## 13. Relações e quantificadores múltiplos

Predicados relacionais tornam a ordem dos quantificadores decisiva.

### 13.1. Cada servidor analisa algum processo

$$
\forall x\bigl(Servidor(x)\to
\exists y(Processo(y)\land Analisa(x,y))\bigr).
$$

O processo pode variar conforme o servidor.

### 13.2. Existe um processo analisado por todos os servidores

$$
\exists y\bigl(Processo(y)\land
\forall x(Servidor(x)\to Analisa(x,y))\bigr).
$$

Agora há um mesmo processo que serve de testemunho para todos os servidores.

### 13.3. Ordem não intercambiável

Em geral:

$$
\forall x\exists y\,R(x,y)
\not\equiv
\exists y\forall x\,R(x,y).
$$

Exemplo: cada pessoa pode ter uma mãe, sem que exista uma única pessoa que seja mãe de todos.

Com o domínio não vazio, a forma $\exists y\forall xR(x,y)$ implica $\forall x\exists yR(x,y)$, mas a conversa não vale em geral.

### 13.4. Quantificadores do mesmo tipo

Quantificadores universais consecutivos podem trocar de ordem:

$$
\forall x\forall y\,R(x,y)
\equiv
\forall y\forall x\,R(x,y).
$$

O mesmo vale para dois existenciais:

$$
\exists x\exists y\,R(x,y)
\equiv
\exists y\exists x\,R(x,y).
$$

## 14. Negação de quantificadores

As equivalências fundamentais são:

$$
\neg\forall x\,\varphi(x)
\equiv
\exists x\,\neg\varphi(x),
$$

$$
\neg\exists x\,\varphi(x)
\equiv
\forall x\,\neg\varphi(x).
$$

Para levar a negação para dentro:

1. troque $\forall$ por $\exists$, ou $\exists$ por $\forall$;
2. negue a fórmula que estava no escopo;
3. continue aplicando as equivalências proposicionais necessárias.

### 14.1. Negação de “todo”

$$
\neg\forall x(A(x)\to B(x))
$$

$$
\equiv
\exists x\neg(A(x)\to B(x))
$$

$$
\equiv
\exists x(A(x)\land\neg B(x)).
$$

Logo, a negação de “todo $A$ é $B$” é “algum $A$ não é $B$”.

### 14.2. Negação de “algum”

$$
\neg\exists x(A(x)\land B(x))
$$

$$
\equiv
\forall x\neg(A(x)\land B(x))
$$

$$
\equiv
\forall x(A(x)\to\neg B(x)).
$$

Logo, a negação de “algum $A$ é $B$” é “nenhum $A$ é $B$”.

### 14.3. Vários quantificadores

Negue um quantificador por vez:

$$
\neg\forall x\exists y\,R(x,y)
\equiv
\exists x\forall y\,\neg R(x,y).
$$

A negação diz que existe um objeto $x$ que não se relaciona por $R$ com nenhum $y$.

Em uma universal restrita mais completa:

$$
\neg\forall x\bigl(A(x)\to\exists y(B(y)\land R(x,y))\bigr)
$$

$$
\equiv
\exists x\bigl(A(x)\land\forall y(B(y)\to\neg R(x,y))\bigr).
$$

Existe um $A$ que não se relaciona com nenhum $B$.

### 14.4. Cobrança oficial do CEBRASPE

Em matriz oficial da PCDF, o CEBRASPE julgou **errada** a afirmação de que a negação de “Todos são iguais perante a lei” seria “Todos são diferentes perante a lei”. A justificativa oficial registra como negação “Nem todos são iguais perante a lei” ou “Existem indivíduos que são diferentes perante a lei”.

O padrão cobrado é exatamente:

$$
\neg\forall xP(x)\equiv\exists x\neg P(x).
$$

## 15. Domínio não vazio e importação existencial

Este ponto exige precisão.

### 15.1. O domínio global possui objeto

Como $U\neq\varnothing$, a fórmula

$$
\forall xP(x)
$$

implica

$$
\exists xP(x).
$$

Se todo objeto do domínio tem $P$ e o domínio contém ao menos um objeto, então algum objeto tem $P$.

### 15.2. A classe-sujeito pode estar vazia

Já a fórmula categórica

$$
\forall x(A(x)\to B(x))
$$

não implica $\exists xA(x)$.

Contraexemplo:

$$
U=\{u\},\qquad A^I=\varnothing.
$$

O domínio não está vazio, mas nenhum objeto é $A$. Para o único objeto $u$, o antecedente $A(u)$ é falso; portanto, a condicional é verdadeira e a universal também.

Essa é a ausência de **importação existencial da classe-sujeito**:

> “Todo $A$ é $B$” não garante que exista algum $A$.

Não confunda essa regra com a permissão de domínio global vazio, que não é a convenção adotada aqui.

## 16. Distribuição de quantificadores

Algumas distribuições são equivalências:

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

Outras falham:

$$
\forall x(P(x)\lor Q(x))
\not\equiv
(\forall xP(x))\lor(\forall xQ(x)).
$$

Cada objeto pode satisfazer ao menos uma das propriedades sem que uma mesma propriedade valha para todos.

Também:

$$
\exists x(P(x)\land Q(x))
\not\equiv
(\exists xP(x))\land(\exists xQ(x)).
$$

O lado direito permite testemunhos diferentes: um objeto pode satisfazer $P$ e outro, $Q$.

## 17. Existência e unicidade com igualdade

### 17.1. Ao menos um

$$
\exists xP(x).
$$

### 17.2. Ao menos dois distintos

$$
\exists x\exists y(P(x)\land P(y)\land x\neq y).
$$

### 17.3. No máximo um

$$
\forall x\forall y((P(x)\land P(y))\to x=y).
$$

### 17.4. Exatamente um

Uma forma compacta é:

$$
\exists x\bigl(P(x)\land\forall y(P(y)\to y=x)\bigr).
$$

Ela reúne:

1. existência de um objeto $x$ com $P$;
2. unicidade, pois qualquer $y$ com $P$ deve ser o próprio $x$.

A igualdade também permite substituição de idênticos. De $a=b$ e $P(a)$, conclui-se $P(b)$.

## 18. Verdade, modelo, satisfatibilidade e validade

### 18.1. Verdade em uma interpretação

Uma fórmula aberta depende tanto da interpretação $I$ quanto de uma atribuição $s$ às variáveis livres. Escreve-se

$$
I,s\models\varphi
$$

quando $\varphi$ é verdadeira sob essa interpretação e essa atribuição. Se $\varphi$ é uma sentença, a atribuição não interfere; nesse caso, abrevia-se a notação para

$$
I\models\varphi
$$

quando a interpretação $I$ satisfaz a sentença $\varphi$.

### 18.2. Modelo

Uma interpretação que torna verdadeira uma sentença ou todas as sentenças de um conjunto é um **modelo** dessa sentença ou desse conjunto.

### 18.3. Satisfatível

Uma fórmula é **satisfatível** quando existe ao menos uma interpretação e uma atribuição que a satisfazem. Para uma sentença, isso equivale a possuir ao menos um modelo.

Exemplo:

$$
\exists xP(x)
$$

é satisfatível: basta interpretar $P$ como uma propriedade possuída por algum objeto.

### 18.4. Válida

Uma fórmula é **válida** quando é verdadeira em toda interpretação e sob toda atribuição admissíveis:

$$
\models\varphi.
$$

Exemplo:

$$
\forall x(P(x)\lor\neg P(x))
$$

é válida na lógica clássica.

### 18.5. Contraditória ou insatisfatível

Uma fórmula é insatisfatível quando nenhuma interpretação e atribuição a satisfazem. Para uma sentença, isso equivale a não possuir modelo.

Exemplo:

$$
\exists x(P(x)\land\neg P(x)).
$$

Nenhum objeto pode satisfazer simultaneamente $P$ e $\neg P$.

### 18.6. Não confunda

| Conceito | Pergunta |
|---|---|
| fórmula verdadeira em $I,s$ | vale nesta interpretação e atribuição? |
| sentença verdadeira em $I$ | vale nesta interpretação? |
| satisfatível | vale em alguma interpretação e atribuição? |
| válida | vale em todas as interpretações e atribuições? |
| insatisfatível | falha em todas as interpretações e atribuições? |

Uma sentença pode ser verdadeira em certo modelo sem ser válida.

## 19. Consequência lógica e validade de argumentos

Escreve-se

$$
\Gamma\models\varphi
$$

quando, em toda interpretação e atribuição, a satisfação de todas as fórmulas de $\Gamma$ implica a satisfação de $\varphi$. Se premissas e conclusão são sentenças, a atribuição não interfere: todo modelo das premissas também deve ser modelo da conclusão.

Exemplo:

$$
\forall x(P(x)\to Q(x)),
$$

$$
\exists xP(x).
$$

Logo:

$$
\exists xQ(x).
$$

Justificativa:

1. a existencial fornece um testemunho com $P$;
2. a universal garante $P\to Q$ para esse testemunho;
3. ele também possui $Q$;
4. portanto, existe algo com $Q$.

A validade depende da preservação da verdade, não do tema concreto das frases.

## 20. Contramodelos

Para mostrar que uma fórmula não é válida ou que uma conclusão não decorre das premissas, basta apresentar um **contramodelo**.

Um contramodelo de argumento deve:

1. tornar todas as premissas verdadeiras;
2. tornar a conclusão falsa.

Exemplo de inferência inválida:

$$
\exists xP(x),\qquad \exists xQ(x)
\quad\therefore\quad
\exists x(P(x)\land Q(x)).
$$

Use:

$$
U=\{a,b\},\qquad P^I=\{a\},\qquad Q^I=\{b\}.
$$

As duas premissas são verdadeiras, mas nenhum mesmo objeto possui $P$ e $Q$. A conclusão é falsa.

Outro exemplo:

$$
\forall x(P(x)\to Q(x))
\quad\therefore\quad
\exists xP(x).
$$

Tome $U=\{a\}$ e $P^I=\varnothing$. A premissa é verdadeira por vacuidade e a conclusão é falsa.

## 21. Inferências quantificadas elementares

### 21.1. Instanciação universal

De uma universal, pode-se obter uma instância adequada:

$$
\forall xP(x)
\quad\therefore\quad
P(t),
$$

desde que o termo $t$ seja livre para $x$ na fórmula.

Exemplo:

$$
\forall x(Servidor(x)\to Treinado(x)),
$$

$$
Servidor(a).
$$

Logo, $Treinado(a)$.

### 21.2. Generalização existencial

De uma instância, conclui-se uma existência:

$$
P(t)
\quad\therefore\quad
\exists xP(x).
$$

### 21.3. Uso de testemunho existencial

De $\exists xP(x)$, não se pode concluir diretamente $P(a)$ para uma constante já conhecida e arbitrária. O objeto que satisfaz $P$ pode não ser o objeto nomeado por $a$.

Em uma demonstração formal, introduz-se um nome novo e temporário para representar um testemunho, sem atribuir a ele propriedades não dadas.

### 21.4. Generalização universal

Para concluir $\forall xP(x)$, o objeto usado no raciocínio deve ser **arbitrário**. Não é legítimo generalizar a partir de:

- um indivíduo especial;
- uma constante com premissas particulares;
- um testemunho retirado de uma existencial.

De $P(a)$ isoladamente, não segue $\forall xP(x)$.

### 21.5. Igualdade

Se $a=b$, toda propriedade de $a$ também vale para $b$:

$$
a=b,\quad P(a)
\quad\therefore\quad
P(b).
$$

Em relações, a substituição pode ocorrer em qualquer posição compatível.

## 22. Inferências válidas e inválidas frequentes

### 22.1. Válida: cadeia universal com existência

$$
\forall x(A(x)\to B(x)),
$$

$$
\forall x(B(x)\to C(x)),
$$

$$
\exists xA(x).
$$

Logo:

$$
\exists xC(x).
$$

### 22.2. Inválida: conversa

$$
\forall x(A(x)\to B(x))
\not\models
\forall x(B(x)\to A(x)).
$$

### 22.3. Inválida: criação de existência

$$
\forall x(A(x)\to B(x))
\not\models
\exists xA(x).
$$

### 22.4. Inválida: testemunhos diferentes

$$
\exists xA(x),\quad\exists xB(x)
\not\models
\exists x(A(x)\land B(x)).
$$

### 22.5. Inválida: troca de quantificadores mistos

$$
\forall x\exists yR(x,y)
\not\models
\exists y\forall xR(x,y).
$$

## 23. Erros recorrentes de prova

### 23.1. Tratar termo como fórmula

$f(a)$ designa um objeto; $P(f(a))$ afirma algo sobre ele.

### 23.2. Ignorar aridade

Se $R$ é binário, $R(a)$ e $R(a,b,c)$ não são fórmulas bem formadas.

### 23.3. Confundir variável livre com ligada

O fato de haver um $\forall x$ em alguma parte da fórmula não liga todo $x$ escrito fora de seu escopo.

### 23.4. Usar conjunção na universal restrita

“Todo $A$ é $B$” usa $A\to B$, não $A\land B$.

### 23.5. Usar implicação na existencial restrita

“Algum $A$ é $B$” usa $A\land B$, não $A\to B$.

### 23.6. Negar “todo” como “nenhum”

A negação de “todo $A$ é $B$” é “algum $A$ não é $B$”.

### 23.7. Trocar $\forall\exists$ por $\exists\forall$

O primeiro pode usar testemunhos diferentes; o segundo exige um testemunho comum.

### 23.8. Reutilizar testemunha existencial indevidamente

De “existe alguém” não se conclui que seja a pessoa nomeada por uma constante anterior.

### 23.9. Generalizar indivíduo particular

Uma propriedade de $a$ não se torna universal sem que $a$ tenha sido tratado como arbitrário.

### 23.10. Supor nomes distintos

Constantes diferentes podem designar o mesmo objeto, salvo premissa de desigualdade.

### 23.11. Confundir satisfatível com válida

Uma interpretação e uma atribuição favoráveis provam satisfatibilidade; validade exige todas as interpretações e atribuições. Para sentenças, basta falar em modelos porque a atribuição não interfere.

### 23.12. Ignorar captura

Substituições devem preservar a liberdade das variáveis envolvidas.

## 24. Roteiro de resolução

### 24.1. Simbolização

1. Identifique o domínio.
2. Defina constantes, funções e predicados com aridade.
3. Localize “todo”, “algum”, “nenhum”, “somente” e negações.
4. Use implicação na restrição universal.
5. Use conjunção na restrição existencial.
6. Marque os parênteses e o escopo.
7. Confira a ordem dos argumentos e dos quantificadores.

### 24.2. Negação

1. Negue o quantificador externo.
2. Troque $\forall$ por $\exists$, ou o contrário.
3. Leve a negação para a fórmula interna.
4. Aplique De Morgan e a negação da condicional.
5. Traduza o resultado novamente para a linguagem natural.

### 24.3. Validade de argumento

1. Formalize as premissas e a conclusão.
2. Procure uma cadeia de instanciações e inferências válidas.
3. Não crie testemunhos nem existências ausentes.
4. Se suspeitar de invalidade, construa domínio pequeno.
5. Faça as premissas verdadeiras e tente falsificar a conclusão.
6. Um contramodelo basta para refutar a consequência.

## 25. Síntese

- O domínio clássico de primeira ordem é não vazio.
- Constantes e termos designam objetos; fórmulas expressam fatos.
- Funções devolvem objetos; predicados produzem afirmações.
- A aridade e a ordem dos argumentos devem ser preservadas.
- Quantificadores percorrem objetos, não predicados.
- Ocorrências dentro do escopo correspondente são ligadas; as demais são livres.
- Sentenças não possuem variáveis livres.
- “Todo $A$ é $B$” usa $\forall x(A\to B)$.
- “Algum $A$ é $B$” usa $\exists x(A\land B)$.
- “Somente $A$ são $B$” significa $\forall x(B\to A)$.
- $\neg\forall$ torna-se $\exists\neg$; $\neg\exists$ torna-se $\forall\neg$.
- Quantificadores mistos não podem ser trocados em geral.
- Universais categóricas não garantem existência da classe-sujeito.
- Verdade de uma sentença em um modelo, satisfatibilidade e validade são conceitos distintos.
- Um contramodelo torna premissas verdadeiras e conclusão falsa.
- Instanciação universal e generalização existencial são seguras com suas condições.
- Testemunhas existenciais e generalizações universais exigem cuidado.

## Referências

- CEBRASPE. [Edital do concurso público do TCE/MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Edital nº 1, de 6 de julho de 2026. Conteúdo comum de Raciocínio Lógico, item 4, “Lógica de primeira ordem”. Consultado em 18 jul. 2026.
- CEBRASPE. [Matriz com justificativas da prova de Escrivão da Polícia Civil do Distrito Federal](https://cdn.cebraspe.org.br/concursos/PC_DF_19_ESCRIVAO/arquivos/MATRIZ_519_PCDF_001_00_BONECA_COMJUSTIFICATIVA.PDF). Aplicação em 2021, item 117, sobre negação do quantificador universal. Consultado em 18 jul. 2026.
- PONTIFÍCIA UNIVERSIDADE CATÓLICA DE SÃO PAULO. [O cálculo de predicados de primeira ordem](https://www4.pucsp.br/~logica/CalculodePredicados.htm). Material de Celina Abar sobre linguagem, quantificadores, negações, enunciados categóricos e regras de inferência. Consultado em 18 jul. 2026.
- UNIVERSIDADE DE ÉVORA. [Sintaxe da lógica de primeira ordem](https://home.uevora.pt/~fc/lc/lpo/sintaxe.html). Lógica e Computação: termos, fórmulas, funções, relações, igualdade e aridade. Consultado em 18 jul. 2026.
- UNIVERSIDADE DE ÉVORA. [Tratamento das variáveis](https://home.uevora.pt/~fc/lc/lpo/tratamento-variaveis.html). Lógica e Computação: ocorrências livres e ligadas, substituição e captura de variável. Consultado em 18 jul. 2026.
- UNIVERSIDADE DE ÉVORA. [Interpretação](https://home.uevora.pt/~fc/lc/lpo/interpretacao.html). Lógica e Computação: universo não vazio, interpretação de constantes, funções, relações e igualdade. Consultado em 18 jul. 2026.
- UNIVERSIDADE DE ÉVORA. [Consequência semântica de primeira ordem](https://home.uevora.pt/~fc/lc/lpo/consequencia-semantica.html). Lógica e Computação: modelos, satisfatibilidade, validade e consequência. Consultado em 18 jul. 2026.
- UNIVERSIDADE DE ÉVORA. [Quantificador universal](https://home.uevora.pt/~fc/lc/lpo/dn-quantificador-universal.html). Lógica e Computação: eliminação e introdução do universal. Consultado em 18 jul. 2026.
- UNIVERSIDADE DE ÉVORA. [Quantificador existencial](https://home.uevora.pt/~fc/lc/lpo/dn-quantificador-existencial.html). Lógica e Computação: introdução, eliminação e condições sobre testemunhos. Consultado em 18 jul. 2026.
