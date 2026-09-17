---
schemaVersion: 1
title: "Probabilidade: axiomas, condicionamento e independência"
description: "Fundamentos de probabilidade, espaço amostral, eventos, axiomas, regras derivadas, probabilidade condicional e independência."
order: 51
storageId: pc-u051
---

# Probabilidade: axiomas, condicionamento e independência

A primeira pergunta de probabilidade não é “qual fórmula uso?”. É **qual é o experimento, quais resultados são possíveis e qual evento estou medindo?**

O mapa desta unidade é:

> **experimento → espaço amostral → evento → axiomas → regras → condicionamento → independência**

Há uma distinção que evita muitos erros: contar casos favoráveis e dividir pelo total só funciona diretamente quando os resultados elementares considerados têm **a mesma probabilidade de ocorrer**. A teoria da probabilidade é mais geral: ela parte de regras coerentes para atribuir probabilidades aos eventos.

Variáveis aleatórias, funções de probabilidade ou densidade, distribuições, esperança, momentos, leis dos grandes números e distribuições amostrais pertencem às próximas unidades. Aqui o objetivo é dominar o alicerce sobre o qual esses temas serão construídos.

## 1. Experimento, resultado, espaço amostral e evento

Um **experimento aleatório** é um procedimento cujo resultado específico não é conhecido antes de sua realização, embora o conjunto de resultados possíveis possa ser descrito.

O **espaço amostral**, denotado por \(\Omega\), reúne os resultados elementares possíveis do experimento.

Exemplo hipotético: ao lançar uma moeda duas vezes, registrando a ordem e usando C para cara e K para coroa,

\[
\Omega=\{CC,CK,KC,KK\}.
\]

Um **evento** é um conjunto de resultados do espaço amostral. Por exemplo,

\[
A=\{CC,CK,KC\}
\]

pode representar “ocorre pelo menos uma cara”.

Dois eventos especiais aparecem o tempo todo:

- \(\Omega\): evento certo;
- \(\varnothing\): evento impossível.

Em formulação matemática completa, a probabilidade é atribuída aos eventos de uma coleção apropriada de subconjuntos de \(\Omega\), fechada para as operações necessárias. Em problemas elementares finitos, a banca normalmente trabalha diretamente com os subconjuntos relevantes do espaço amostral.

## 2. Traduzindo “não”, “e” e “ou”

Antes dos axiomas, domine a linguagem de conjuntos.

### Complemento: “não A”

O complemento de \(A\), escrito \(A^c\), contém os resultados de \(\Omega\) que não pertencem a \(A\).

### Interseção: “A e B”

\[
A\cap B
\]

reúne os resultados que pertencem simultaneamente a \(A\) e \(B\).

### União: “A ou B”

\[
A\cup B
\]

reúne os resultados que pertencem a pelo menos um dos eventos. Em probabilidade, o “ou” é normalmente inclusivo: admite \(A\), \(B\) ou ambos.

### Eventos mutuamente exclusivos

Dois eventos são **mutuamente exclusivos** quando não podem ocorrer simultaneamente:

\[
A\cap B=\varnothing.
\]

Esse conceito será contrastado com independência mais adiante. Eles não são sinônimos.

## 3. Os três axiomas de probabilidade

Uma função de probabilidade \(P\) obedece a três regras fundamentais.

### 3.1. Não negatividade

Para todo evento \(A\),

\[
P(A)\ge 0.
\]

Probabilidade negativa não é admitida.

### 3.2. Normalização

\[
P(\Omega)=1.
\]

O evento certo tem probabilidade 1.

### 3.3. Aditividade para eventos disjuntos

Se \(A_1,A_2,\ldots\) são dois a dois mutuamente exclusivos, então

\[
P\left(\bigcup_{i=1}^{\infty}A_i\right)
=\sum_{i=1}^{\infty}P(A_i).
\]

Em problemas finitos, a consequência mais usada é:

\[
A\cap B=\varnothing
\quad\Longrightarrow\quad
P(A\cup B)=P(A)+P(B).
\]

Os axiomas são o ponto de partida. Várias fórmulas familiares são consequências deles, e não axiomas adicionais.

## 4. Regras que derivam dos axiomas

### 4.1. Evento impossível

\[
P(\varnothing)=0.
\]

Isso não significa que todo evento de probabilidade zero seja logicamente impossível em modelos contínuos; essa sutileza será relevante quando distribuições contínuas forem estudadas. Aqui, retenha a direção segura: **evento impossível tem probabilidade zero**.

### 4.2. Limites

Para qualquer evento \(A\),

\[
0\le P(A)\le 1.
\]

### 4.3. Complemento

Como \(A\) e \(A^c\) são disjuntos e formam todo o espaço amostral,

\[
P(A^c)=1-P(A).
\]

Essa é a ferramenta natural para expressões como “nenhum”, “não ocorrer” e, em muitos problemas repetidos, “pelo menos um”.

### 4.4. Monotonicidade

Se \(A\subseteq B\), então

\[
P(A)\le P(B).
\]

O evento menor não pode ter probabilidade maior que um evento que contém todos os seus resultados e talvez outros.

Se, além disso, \(B\setminus A\) possui probabilidade positiva, então

\[
P(A)<P(B).
\]

### 4.5. Regra geral da união

Quando \(A\) e \(B\) podem ocorrer juntos, somar \(P(A)+P(B)\) conta a interseção duas vezes. Corrija:

\[
P(A\cup B)=P(A)+P(B)-P(A\cap B).
\]

Somente no caso mutuamente exclusivo a interseção vale zero e a fórmula se reduz à soma simples.

## 5. Casos favoráveis sobre casos possíveis: quando pode usar?

Em um espaço amostral **finito** cujos resultados elementares sejam <abbr title="com a mesma probabilidade de ocorrer">equiprováveis</abbr>, vale:

\[
P(A)=\frac{|A|}{|\Omega|}.
\]

Exemplo hipotético: em um dado honesto de seis faces,

\[
P(\text{resultado par})=\frac{3}{6}=\frac12.
\]

A palavra “honesto” sustenta a equiprobabilidade das faces. Sem essa hipótese, simplesmente contar faces não basta.

Outra pegadinha: categorias derivadas podem não ser equiprováveis mesmo quando os resultados elementares são. Em dois dados honestos distinguíveis existem 36 pares ordenados equiprováveis, mas as somas de 2 a 12 não aparecem com a mesma frequência.

## 6. Probabilidade condicional: a informação muda o universo

A expressão “qual é a probabilidade de \(A\), **sabendo que \(B\) ocorreu**?” muda o universo de referência. Resultados fora de \(B\) deixam de ser considerados.

Se \(P(B)>0\),

\[
P(A\mid B)=\frac{P(A\cap B)}{P(B)}.
\]

Leia \(P(A\mid B)\) como “probabilidade de \(A\) dado \(B\)”.

### Exemplo hipotético

Lance um dado honesto. Defina:

- \(A\): resultado é par = \(\{2,4,6\}\);
- \(B\): resultado é maior que 3 = \(\{4,5,6\}\).

Sabendo que \(B\) ocorreu, o universo relevante é \(\{4,5,6\}\). Entre esses três resultados, dois pertencem a \(A\):

\[
P(A\mid B)=\frac23.
\]

Pela fórmula,

\[
P(A\cap B)=\frac{2}{6},
\qquad
P(B)=\frac{3}{6},
\]

logo

\[
P(A\mid B)
=\frac{2/6}{3/6}
=\frac23.
\]

Condicionar não significa “multiplicar por alguma coisa”; significa **restringir a referência ao evento condicionante**.

## 7. A regra do produto

Reorganizando a definição de probabilidade condicional,

\[
P(A\cap B)=P(A\mid B)P(B),
\]

quando \(P(B)>0\).

Também,

\[
P(A\cap B)=P(B\mid A)P(A),
\]

quando \(P(A)>0\).

Essas expressões são especialmente úteis em sequências: “primeiro acontece isto; dado isso, depois acontece aquilo”.

Exemplo hipotético: uma urna tem 3 bolas vermelhas e 2 azuis. Em duas retiradas **sem reposição**,

\[
P(\text{duas vermelhas})
=\frac35\cdot\frac24
=\frac3{10}.
\]

A segunda probabilidade mudou porque a primeira retirada alterou a composição da urna.

## 8. A ordem do condicionamento importa

Em geral,

\[
P(A\mid B)\ne P(B\mid A).
\]

Os dois cálculos usam a mesma interseção, mas denominadores diferentes:

\[
P(A\mid B)=\frac{P(A\cap B)}{P(B)},
\qquad
P(B\mid A)=\frac{P(A\cap B)}{P(A)}.
\]

Trocar “probabilidade da evidência dado o evento” por “probabilidade do evento dada a evidência” é uma das confusões mais frequentes em problemas condicionais.

Como consequência algébrica, quando as probabilidades necessárias são positivas,

\[
P(A\mid B)
=\frac{P(B\mid A)P(A)}{P(B)}.
\]

Essa é a forma elementar da regra de Bayes. Nesta unidade, ela importa como **inversão de condicionamento**; modelos de distribuição e inferência ficam para os capítulos próprios.

## 9. Independência: informação que não altera a probabilidade

Dois eventos \(A\) e \(B\) são **independentes** quando a ocorrência de um não altera a probabilidade do outro.

A condição algébrica central é:

\[
P(A\cap B)=P(A)P(B).
\]

Se \(P(B)>0\), isso equivale a

\[
P(A\mid B)=P(A).
\]

E, se \(P(A)>0\), também equivale a

\[
P(B\mid A)=P(B).
\]

Portanto, independência não significa “eventos sem relação verbal”. É uma propriedade probabilística testável pelas igualdades acima.

## 10. Independência não é exclusão mútua

Este contraste é obrigatório.

### Mutuamente exclusivos

\[
A\cap B=\varnothing.
\]

Se \(A\) ocorre, \(B\) não pode ocorrer.

### Independentes

\[
P(A\cap B)=P(A)P(B).
\]

Saber que um ocorreu não muda a chance do outro.

Se \(A\) e \(B\) são mutuamente exclusivos e ambos têm probabilidade positiva,

\[
P(A\cap B)=0,
\]

mas

\[
P(A)P(B)>0.
\]

Logo, **não são independentes**.

A intuição ajuda: se eu souber que \(A\) ocorreu e isso torna \(B\) impossível, a informação alterou radicalmente a probabilidade de \(B\).

## 11. Complementos preservam independência

Se \(A\) e \(B\) são independentes, então também são independentes:

- \(A\) e \(B^c\);
- \(A^c\) e \(B\);
- \(A^c\) e \(B^c\).

Por exemplo,

\[
P(A\cap B^c)
=P(A)-P(A\cap B)
=P(A)-P(A)P(B)
=P(A)[1-P(B)]
=P(A)P(B^c).
\]

Não é uma nova hipótese: decorre da independência original e da regra do complemento.

## 12. Reposição pode mudar a dependência

No exemplo da urna com 3 vermelhas e 2 azuis, duas retiradas **com reposição** restauram a composição entre etapas. Assim,

\[
P(\text{vermelha na 2ª}\mid\text{vermelha na 1ª})=\frac35,
\]

igual à probabilidade marginal de vermelha na segunda retirada. Nesse modelo, os resultados das duas retiradas são independentes.

Sem reposição, a composição muda, e a segunda probabilidade passa a \(2/4\) depois de uma vermelha. Nesse caso, há dependência.

Não transforme “com reposição = independência” em regra universal fora do modelo. O teste seguro continua sendo verificar se a informação altera a probabilidade ou se a igualdade do produto é satisfeita.

## 13. Um roteiro de prova que evita fórmulas trocadas

Diante de uma questão:

1. identifique \(\Omega\) e os eventos;
2. traduza “não”, “e” e “ou” em complemento, interseção e união;
3. verifique se há equiprobabilidade antes de usar casos favoráveis/possíveis;
4. se aparecer “sabendo que”, mude o universo para o condicionante;
5. para interseção em sequência, pense na regra do produto;
6. para independência, teste \(P(A\cap B)=P(A)P(B)\);
7. não confunda independência com exclusão mútua;
8. confira qual evento está antes e qual está depois da barra em \(P(A\mid B)\).

## 14. Pegadinhas de alto rendimento

**“Toda probabilidade é casos favoráveis dividido por casos possíveis.”** Errado. Essa razão exige, no modelo finito usual, resultados elementares equiprováveis.

**“Se \(A\subseteq B\), então \(P(A)>P(B)\).”** Errado. Vale \(P(A)\le P(B)\).

**“Se dois eventos não podem ocorrer juntos, eles são independentes.”** Errado quando ambos têm probabilidade positiva: são mutuamente exclusivos e dependentes.

**“\(P(A\mid B)=P(B\mid A)\).”** Em geral, não. Os denominadores são diferentes.

**“Independência significa \(P(A\cap B)=0\).”** Errado. A condição é \(P(A\cap B)=P(A)P(B)\).

**“Condicionar em \(B\) é permitido mesmo quando \(P(B)=0\) pela fórmula elementar.”** Errado. A razão \(P(A\cap B)/P(B)\) exige \(P(B)>0\).

**“Se \(A\) e \(B\) são independentes, seus complementos deixam de ser.”** Errado. A independência é preservada ao complementar um ou ambos.

## 15. Fronteira com as próximas unidades

Esta unidade ensinou o **sistema de regras dos eventos**: espaço amostral, axiomas, complemento/união/interseção, condicionamento e independência.

A partir da U052, a pergunta muda: em vez de trabalhar apenas com eventos, passaremos a associar números aos resultados e estudar **variáveis aleatórias, funções/distribuições de probabilidade, esperança e modelos especiais**.

Retenha o núcleo:

> **axiomas tornam a probabilidade coerente; condicionamento muda o universo; independência significa que a informação não muda a chance.**
