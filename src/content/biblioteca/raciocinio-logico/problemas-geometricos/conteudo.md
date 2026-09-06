---
schemaVersion: 1
title: Problemas geométricos
description: Resolução de problemas geométricos com ângulos, triângulos, semelhança, áreas, círculos, escalas, volumes e unidades.
order: 44
storageId: problemas-geometricos
---

## 1. Antes da fórmula, descubra o que está sendo medido

Problemas geométricos costumam parecer uma coleção de fórmulas, mas a decisão mais importante vem antes da conta: **qual objeto o enunciado descreve e qual grandeza ele pede?**

Considere um cenário hipotético: um terreno retangular receberá uma cerca, parte do piso será revestida e um reservatório será instalado. As três perguntas podem usar o mesmo desenho, mas exigem grandezas diferentes:

- cerca ao redor do terreno → **perímetro**, isto é, comprimento do contorno;
- piso a revestir → **área**, isto é, medida da superfície;
- água que cabe no reservatório → **volume ou capacidade**, isto é, medida do espaço ocupado.

Essa distinção impede um dos erros mais comuns em prova: escolher uma fórmula conhecida, mas para a grandeza errada.

Use este fluxo:

1. identifique a figura ou configuração;
2. separe o que foi **dado** do que apenas parece verdadeiro no desenho;
3. determine se a pergunta envolve comprimento, ângulo, perímetro, área, volume ou capacidade;
4. verifique qual propriedade ou teorema pode ser usado e se suas hipóteses estão presentes;
5. torne as unidades compatíveis;
6. calcule e confira se a unidade e a ordem de grandeza da resposta fazem sentido.

Um desenho fora de escala ajuda a organizar o raciocínio, mas não prova paralelismo, perpendicularidade, igualdade de lados ou medidas angulares.

O recorte é **raciocínio lógico envolvendo problemas geométricos**. Operações aritméticas gerais são aprofundadas no Assunto 043; problemas matriciais, no Assunto 045. Aqui entram as ferramentas geométricas necessárias para modelar e resolver a situação.

## 2. Comprimentos e ângulos: use relações, não aparência

### 2.1. Perímetro

Perímetro é a soma dos comprimentos que formam o contorno. Em um retângulo de lados $a$ e $b$,

$$
P=2a+2b=2(a+b).
$$

Em um quadrado de lado $l$,

$$
P=4l.
$$

Se a figura tiver recortes, conte apenas os segmentos que realmente pertencem à borda pedida. Uma linha interna não entra no perímetro externo.

### 2.2. Relações angulares básicas

Dois ângulos são **complementares** quando somam $90^\circ$ e **suplementares** quando somam $180^\circ$. Ângulos opostos pelo vértice têm a mesma medida, e os ângulos ao redor de um ponto somam $360^\circ$.

Quando duas retas paralelas são cortadas por uma **transversal**, isto é, uma reta que intercepta ambas, surgem relações específicas:

- ângulos correspondentes são iguais;
- ângulos alternos internos e alternos externos são iguais;
- ângulos colaterais internos e colaterais externos são suplementares.

A palavra decisiva é **paralelas**. Sem essa hipótese, essas igualdades e suplementaridades não podem ser usadas automaticamente.

## 3. Triângulos: a forma mais frequente de criar relações

A soma dos ângulos internos de qualquer triângulo é

$$
180^\circ.
$$

Um ângulo externo é igual à soma dos dois ângulos internos não adjacentes.

Se $c$ é o maior entre três comprimentos positivos $a$, $b$ e $c$, eles formam um triângulo não degenerado somente se

$$
c<a+b.
$$

A igualdade $c=a+b$ produz uma figura achatada, não um triângulo com área positiva.

### 3.1. Isósceles e equilátero

Em um triângulo isósceles, lados iguais ficam opostos a ângulos iguais. Em um equilátero, os três lados são iguais e os três ângulos medem $60^\circ$.

A área de qualquer triângulo é

$$
A=\frac{bh}{2},
$$

em que $h$ é a altura **perpendicular** à base escolhida.

Para um triângulo equilátero de lado $l$, essa fórmula leva a

$$
A=\frac{l^2\sqrt3}{4}.
$$

Esse resultado é útil quando o enunciado fornece apenas o lado ou o perímetro do equilátero.

Dois triângulos que usam bases sobre a mesma reta e têm a mesma altura têm áreas proporcionais às bases. Assim, se uma base é três quartos da outra, a área também é três quartos, desde que a altura seja a mesma.

### 3.2. Teorema de Pitágoras

Pitágoras só vale em triângulo retângulo. Se $a$ e $b$ são os catetos e $c$ é a hipotenusa,

$$
a^2+b^2=c^2.
$$

Uma diagonal de retângulo ou quadrado costuma criar o triângulo retângulo necessário. No quadrado de lado $l$,

$$
d^2=l^2+l^2
\quad\Longrightarrow\quad
d=l\sqrt2.
$$

Em prova, o ponto não é apenas reconhecer a fórmula: é confirmar de onde vem o ângulo reto.

## 4. Semelhança, Tales e escala: o mesmo desenho em tamanhos diferentes

Figuras semelhantes têm a mesma forma: ângulos correspondentes são iguais e comprimentos correspondentes guardam uma mesma razão.

Se uma figura é obtida da outra multiplicando todos os comprimentos por $k$, então:

$$
\frac{L_2}{L_1}=k,
\qquad
\frac{A_2}{A_1}=k^2,
\qquad
\frac{V_2}{V_1}=k^3.
$$

A mudança de expoente acompanha a dimensão da grandeza: comprimento é unidimensional, área é bidimensional e volume é tridimensional.

Isso também explica o comportamento do perímetro: se todos os comprimentos são multiplicados por $k$, o perímetro também é multiplicado por $k$.

### 4.1. Teorema de Tales

Quando retas paralelas cortam duas transversais, os segmentos correspondentes determinados nelas são proporcionais. Por exemplo,

$$
\frac{4}{6}=\frac{x}{9}
\quad\Longrightarrow\quad
x=6.
$$

Dois cuidados evitam a maior parte dos erros:

1. o paralelismo precisa estar dado ou demonstrado;
2. os segmentos comparados devem manter a mesma correspondência.

### 4.2. Escalas

Escala $1:n$ significa que uma unidade no desenho representa $n$ unidades reais na dimensão linear.

Em escala $1:50$, um segmento de 8 cm representa

$$
8\cdot50=400\text{ cm}=4\text{ m}.
$$

Se o problema comparar áreas de figuras semelhantes, a razão passa ao quadrado; para volumes de sólidos semelhantes, ao cubo. Uma maquete em escala linear $1:10$, por exemplo, tem áreas correspondentes na razão $1:100$ e volumes na razão $1:1000$.

## 5. Áreas planas: escolha a figura e identifique a altura correta

As fórmulas mais frequentes são:

| Figura | Área |
|---|---:|
| quadrado | $l^2$ |
| retângulo | $ab$ |
| paralelogramo | $bh$ |
| triângulo | $\dfrac{bh}{2}$ |
| trapézio | $\dfrac{(B+b)h}{2}$ |
| losango | $\dfrac{Dd}{2}$ |

A tabela só funciona se as letras estiverem associadas às medidas corretas. Em paralelogramo, triângulo e trapézio, a altura $h$ é a distância **perpendicular** à base; um lado inclinado não é automaticamente uma altura.

### 5.1. Figuras compostas

Quando a região não coincide com uma fórmula única, reconstrua-a com figuras conhecidas:

- **decomposição:** divida a região em partes sem sobreposição e some as áreas;
- **subtração:** calcule uma região maior e retire os recortes.

Se um retângulo de $10\text{ cm}\times8\text{ cm}$ perde um quadrado de lado $3\text{ cm}$, a área restante é

$$
10\cdot8-3^2=80-9=71\text{ cm}^2.
$$

### 5.2. Polígonos

Para um polígono simples de $n$ lados,

$$
S_i=(n-2)180^\circ,
$$

onde $S_i$ é a soma dos ângulos internos. Um quadrilátero, por exemplo, tem soma interna de $360^\circ$.

Em um polígono regular, todos os lados e todos os ângulos internos são iguais. Quando o número de vértices é par, há pares de vértices opostos que ficam alinhados com o centro; em um polígono regular convexo, esses pares realizam a maior distância entre vértices.

## 6. Circunferência e círculo: primeiro decida se a pergunta é de contorno ou superfície

A **circunferência** é o contorno; o **círculo** é a região interna. Se $r$ é o raio e $d$ o diâmetro,

$$
d=2r.
$$

O comprimento da circunferência é

$$
C=2\pi r=\pi d,
$$

e a área do círculo é

$$
A=\pi r^2.
$$

Preserve $\pi$ quando o enunciado não fornecer aproximação.

### 6.1. Arcos e setores

Um ângulo central seleciona a mesma fração do contorno e da área. Se $\theta$ está em graus,

$$
L_{\text{arco}}
=
\frac{\theta}{360^\circ}\,2\pi r,
$$

$$
A_{\text{setor}}
=
\frac{\theta}{360^\circ}\,\pi r^2.
$$

Assim, $90^\circ$ corresponde a um quarto e $60^\circ$ a um sexto.

### 6.2. Coroa circular e tangência

Entre círculos concêntricos de raios $R>r$, a área da coroa é a diferença entre as áreas:

$$
A=\pi(R^2-r^2).
$$

Não substitua essa expressão por $\pi(R-r)^2$.

Quando duas circunferências são tangentes externamente, elas se tocam em um único ponto e a distância entre seus centros é a soma dos raios. Essa relação permite transformar problemas de tangência em equações de comprimentos.

## 7. Sólidos: diferencie espaço interno de material da superfície

Em sólidos, duas perguntas parecidas usam grandezas diferentes:

- **quanto cabe dentro?** → volume ou capacidade;
- **quanto material cobre as faces?** → área de superfície.

### 7.1. Prismas, paralelepípedos e cubos

Para um prisma de área da base $A_b$ e altura perpendicular $h$,

$$
V=A_bh.
$$

Num prisma reto, cada face lateral é um retângulo. Se $P_b$ é o perímetro da base, a área lateral é

$$
A_L=P_bh,
$$

e a área total é

$$
A_T=A_L+2A_b.
$$

Para um paralelepípedo retângulo de dimensões $a$, $b$ e $c$,

$$
V=abc.
$$

Para um cubo de aresta $l$,

$$
V=l^3.
$$

Em problemas de material, conte apenas as faces existentes. Uma caixa retangular sem tampa de base $a\times b$ e altura $h$, por exemplo, usa

$$
A=ab+2ah+2bh.
$$

A face superior não entra na soma.

### 7.2. Cilindro

No cilindro circular reto,

$$
V=\pi r^2h.
$$

A área lateral é o retângulo obtido ao “abrir” a superfície lateral: sua largura é o comprimento da circunferência e sua altura é $h$. Portanto,

$$
A_L=2\pi rh.
$$

Se o cilindro é fechado, a área total inclui também as duas bases:

$$
A_T=2\pi rh+2\pi r^2.
$$

### 7.3. Pirâmides e cones

Para uma pirâmide,

$$
V=\frac{A_bh}{3}.
$$

No cone circular reto,

$$
V=\frac{\pi r^2h}{3}.
$$

Com a mesma área de base e a mesma altura,

$$
V_{\text{cone}}=\frac13V_{\text{cilindro}},
$$

e a pirâmide tem um terço do volume do prisma correspondente.

A semelhança continua valendo em sólidos. Se todas as medidas lineares de um cone são reduzidas à metade, o volume é multiplicado por

$$
\left(\frac12\right)^3=\frac18.
$$

Esse é o mecanismo por trás de problemas em que um líquido ocupa apenas parte da altura de um recipiente cônico semelhante ao recipiente inteiro.

## 8. Conversões: a unidade também tem dimensão

Se

$$
1\text{ m}=100\text{ cm},
$$

então uma área quadrada de lado 1 m tem

$$
1\text{ m}^2=(100\text{ cm})^2=10\,000\text{ cm}^2,
$$

e um cubo de aresta 1 m tem

$$
1\text{ m}^3=(100\text{ cm})^3=1\,000\,000\text{ cm}^3.
$$

O fator de conversão linear precisa ser elevado ao quadrado para áreas e ao cubo para volumes.

Para capacidade,

$$
1\text{ L}=1\text{ dm}^3=1000\text{ cm}^3,
$$

$$
1\text{ m}^3=1000\text{ L}.
$$

Quando o enunciado fornece uma unidade agrária ou outra equivalência específica, transforme tudo para uma unidade comum antes de comparar áreas.

## 9. Como validar a resposta em prova

Antes de marcar a alternativa, faça três verificações rápidas:

1. **hipótese:** o teorema usado realmente podia ser aplicado? Paralelas para Tales; ângulo reto para Pitágoras; semelhança para usar uma razão comum;
2. **dimensão:** a resposta saiu em unidade linear, quadrada ou cúbica compatível com o que foi pedido?;
3. **ordem de grandeza:** o resultado cabe na figura e no contexto?

Alguns contrastes concentram as principais armadilhas:

- desenho aparente não substitui propriedade declarada;
- perímetro mede contorno; área mede superfície; volume mede espaço;
- raio é metade do diâmetro;
- comprimento da circunferência não é área do círculo;
- altura é perpendicular à base;
- escala linear não passa diretamente para área ou volume;
- cone e pirâmide usam o fator $1/3$ no volume;
- caixa sem tampa não inclui a face superior;
- conversão de área e volume não usa o fator linear sem elevar a potência.

O objetivo final é reconhecer **qual relação geométrica está escondida no enunciado**, e não procurar uma fórmula pela aparência da figura.