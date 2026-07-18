---
schemaVersion: 1
title: Problemas geométricos
description: Resolução de problemas de geometria plana e espacial com ângulos, triângulos, polígonos, semelhança, áreas, círculos, coordenadas, escalas e sólidos.
order: 44
storageId: problemas-geometricos
---

## 1. Geometria como raciocínio aplicado

Um problema geométrico combina propriedades de figuras com relações numéricas. A primeira tarefa não é escolher uma fórmula, mas identificar o objeto, as hipóteses declaradas e a grandeza pedida.

Use este roteiro:

1. registre os dados e as unidades;
2. marque somente propriedades dadas ou demonstradas;
3. identifique ângulos, comprimentos, áreas ou volumes relacionados;
4. aplique o teorema ou a fórmula com todas as hipóteses satisfeitas;
5. verifique unidade, sinal e ordem de grandeza.

### 1.1. Fronteiras deste assunto

O edital reúne problemas aritméticos, geométricos e matriciais em um único item. Neste assunto, o foco é a estrutura geométrica do problema:

- relações angulares e paralelismo;
- triângulos, congruência, semelhança, Tales e Pitágoras;
- polígonos, perímetros e áreas;
- circunferências, círculos e regiões circulares;
- escalas e coordenadas cartesianas elementares;
- poliedros, corpos redondos, planificações, áreas e volumes.

Operações aritméticas gerais pertencem ao Assunto 043. Problemas cuja estrutura central é uma matriz pertencem ao Assunto 045. Não são necessários, neste recorte, trigonometria, cônicas, vetores ou geometria analítica avançada.

## 2. Hipóteses valem mais que a aparência

Um desenho auxilia a organização, mas pode estar fora de escala. Não conclua apenas pela aparência que:

- dois segmentos têm a mesma medida;
- duas retas são paralelas ou perpendiculares;
- um ângulo é reto;
- um ponto é médio;
- uma figura é regular;
- um sólido é reto.

Cada propriedade deve vir do enunciado, de uma marcação convencional ou de uma consequência demonstrada.

## 3. Objetos básicos e ângulos

- **Reta:** prolonga-se indefinidamente nos dois sentidos.
- **Semirreta:** possui origem e prolonga-se em um sentido.
- **Segmento:** parte da reta limitada por dois extremos.
- **Plano:** superfície bidimensional ilimitada no modelo geométrico.

Ângulos são medidos, neste nível, em graus.

| Tipo | Medida |
|---|---:|
| agudo | entre $0^\circ$ e $90^\circ$ |
| reto | $90^\circ$ |
| obtuso | entre $90^\circ$ e $180^\circ$ |
| raso | $180^\circ$ |
| completo | $360^\circ$ |

### 3.1. Relações fundamentais

- Ângulos **complementares** somam $90^\circ$.
- Ângulos **suplementares** somam $180^\circ$.
- Ângulos **opostos pelo vértice** têm a mesma medida.
- Ângulos adjacentes sobre uma reta somam $180^\circ$.
- Ângulos ao redor de um ponto somam $360^\circ$.

Se um ângulo mede $38^\circ$, seu complemento mede

$$
90^\circ-38^\circ=52^\circ.
$$

## 4. Paralelas cortadas por transversal

Quando duas retas **paralelas** são cortadas por uma transversal:

- ângulos correspondentes são congruentes;
- ângulos alternos internos são congruentes;
- ângulos alternos externos são congruentes;
- ângulos colaterais internos são suplementares;
- ângulos colaterais externos são suplementares.

> Essas conclusões dependem do paralelismo. Duas retas quaisquer cortadas por uma terceira não garantem essas igualdades.

## 5. Triângulos

Um triângulo possui três lados e três ângulos internos.

### 5.1. Classificação

Por lados:

- equilátero: três lados congruentes;
- isósceles: pelo menos dois lados congruentes;
- escaleno: três lados com medidas diferentes.

Por ângulos:

- acutângulo: três ângulos agudos;
- retângulo: um ângulo reto;
- obtusângulo: um ângulo obtuso.

Todo triângulo equilátero é equiângulo, com três ângulos de $60^\circ$.

### 5.2. Soma angular e ângulo externo

Os ângulos internos somam

$$
180^\circ.
$$

Um ângulo externo é igual à soma dos dois ângulos internos não adjacentes a ele.

Se dois ângulos internos medem $35^\circ$ e $72^\circ$, o ângulo externo não adjacente a ambos mede

$$
35^\circ+72^\circ=107^\circ.
$$

### 5.3. Desigualdade triangular

Três comprimentos positivos $a$, $b$ e $c$ formam um triângulo não degenerado se cada lado for menor que a soma dos outros dois:

$$
a<b+c,
\quad
b<a+c,
\quad
c<a+b.
$$

Na prática, ordene os lados e confira se o maior é estritamente menor que a soma dos outros dois.

### 5.4. Triângulo isósceles

Em um triângulo isósceles, os ângulos opostos aos lados congruentes também são congruentes. Se o ângulo do vértice mede $40^\circ$, cada ângulo da base mede

$$
\frac{180^\circ-40^\circ}{2}=70^\circ.
$$

## 6. Congruência e semelhança

### 6.1. Congruência

Figuras congruentes têm a mesma forma e as mesmas medidas. Para triângulos, critérios usuais incluem:

- LLL: três lados correspondentes congruentes;
- LAL: dois lados e o ângulo compreendido congruentes;
- ALA: dois ângulos e o lado compreendido congruentes.

Três ângulos iguais não garantem congruência: garantem apenas semelhança.

### 6.2. Semelhança

Figuras semelhantes têm a mesma forma e medidas correspondentes proporcionais. Para triângulos, critérios usuais são:

- AA: dois ângulos correspondentes congruentes;
- LAL proporcional: dois pares de lados proporcionais e ângulo compreendido congruente;
- LLL proporcional: três pares de lados proporcionais.

Se a razão linear da figura original para a ampliada é $k$:

$$
\frac{\text{comprimento ampliado}}{\text{comprimento original}}=k,
$$

$$
\frac{\text{área ampliada}}{\text{área original}}=k^2,
$$

$$
\frac{\text{volume ampliado}}{\text{volume original}}=k^3.
$$

Dobrar comprimentos quadruplica áreas e multiplica volumes por oito.

## 7. Teorema de Tales

Um feixe de retas paralelas determina segmentos proporcionais em transversais. Na configuração triangular mais comum, uma reta paralela a um lado do triângulo forma um triângulo menor semelhante ao original.

Se segmentos correspondentes medem 4 e 6 em uma transversal e $x$ e 9 na outra:

$$
\frac46=\frac x9
\quad\Longrightarrow\quad
x=6.
$$

> A proporcionalidade depende de retas paralelas e de segmentos correspondentes corretamente associados.

## 8. Triângulo retângulo

### 8.1. Teorema de Pitágoras

Em um triângulo retângulo, se $a$ e $b$ são catetos e $c$ é a hipotenusa:

$$
a^2+b^2=c^2.
$$

A hipotenusa é o lado oposto ao ângulo reto e é o maior lado.

Para catetos 6 e 8:

$$
c=\sqrt{6^2+8^2}=\sqrt{100}=10.
$$

### 8.2. Relações métricas

Se a altura relativa à hipotenusa divide $c$ nas projeções $m$ e $n$, com $m$ correspondente ao cateto $a$ e $n$ ao cateto $b$:

$$
c=m+n,
$$

$$
a^2=cm,
\qquad
b^2=cn,
$$

$$
h^2=mn,
$$

$$
ab=ch.
$$

Essas relações valem nessa configuração específica de triângulo retângulo e altura sobre a hipotenusa.

## 9. Polígonos

Um polígono simples é formado por segmentos consecutivos sem cruzamentos indevidos. Um polígono regular possui todos os lados e todos os ângulos congruentes.

### 9.1. Soma dos ângulos internos

Para um polígono simples de $n$ lados:

$$
S_i=(n-2)180^\circ.
$$

Se o polígono é regular, cada ângulo interno mede

$$
\alpha_i=\frac{(n-2)180^\circ}{n}.
$$

Tomando um ângulo externo em cada vértice, com a mesma orientação, a soma é $360^\circ$. Em um polígono regular:

$$
\alpha_e=\frac{360^\circ}{n}.
$$

### 9.2. Diagonais

O número total de diagonais de um polígono convexo de $n$ vértices é

$$
D=\frac{n(n-3)}2.
$$

Cada vértice liga-se por diagonal a $n-3$ vértices; a divisão por 2 evita contar cada diagonal duas vezes.

## 10. Perímetros e áreas planas

Perímetro mede o contorno, em unidade linear. Área mede a superfície, em unidade quadrada.

| Figura | Área |
|---|---:|
| quadrado de lado $l$ | $l^2$ |
| retângulo de lados $a$ e $b$ | $ab$ |
| paralelogramo | $bh$ |
| triângulo | $\dfrac{bh}{2}$ |
| trapézio, bases $B$ e $b$ | $\dfrac{(B+b)h}{2}$ |
| losango, diagonais $D$ e $d$ | $\dfrac{Dd}{2}$ |

A altura é a distância **perpendicular** à base escolhida. Em paralelogramos e trapézios inclinados, o lado oblíquo não é automaticamente a altura.

### 10.1. Polígono regular

Dividindo um polígono regular em triângulos de vértice no centro:

$$
A=\frac{P\cdot a}{2},
$$

em que $P$ é o perímetro e $a$ é o apótema.

### 10.2. Figuras compostas

Decomponha a região em figuras conhecidas ou subtraia recortes. Um retângulo de $10\times8$ do qual se retira um quadrado de lado 3 possui área

$$
10\cdot8-3^2=71.
$$

Somente some ou subtraia áreas expressas na mesma unidade quadrada.

## 11. Circunferência e círculo

- **Circunferência:** linha fechada cujos pontos estão à mesma distância do centro.
- **Círculo:** região interna limitada pela circunferência.
- **Raio $r$:** segmento do centro à circunferência.
- **Diâmetro $d$:** corda que passa pelo centro, com $d=2r$.

Comprimento da circunferência:

$$
C=2\pi r=\pi d.
$$

Área do círculo:

$$
A=\pi r^2.
$$

### 11.1. Arcos e setores

Para ângulo central $\theta$ em graus:

$$
L_{arco}=\frac{\theta}{360^\circ}\cdot2\pi r,
$$

$$
A_{setor}=\frac{\theta}{360^\circ}\cdot\pi r^2.
$$

### 11.2. Coroa circular

Entre círculos concêntricos de raios $R$ e $r$, com $R>r$:

$$
A_{coroa}=\pi(R^2-r^2).
$$

Não substitua $R^2-r^2$ por $(R-r)^2$; as expressões são diferentes.

## 12. Escalas

Uma escala $1:n$ significa que uma unidade no desenho representa $n$ unidades reais, na mesma dimensão.

Em uma planta na escala $1:50$, 8 cm representam

$$
8\cdot50=400\text{ cm}=4\text{ m}.
$$

Para áreas e volumes de figuras semelhantes:

- razão linear $1:n$;
- razão de áreas $1:n^2$;
- razão de volumes $1:n^3$.

Converta as unidades antes ou depois da escala, mas mantenha a equivalência dimensional.

## 13. Coordenadas cartesianas elementares

Para pontos $A(x_1,y_1)$ e $B(x_2,y_2)$:

### 13.1. Distância

$$
AB=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}.
$$

Essa fórmula é uma aplicação do Teorema de Pitágoras.

### 13.2. Ponto médio

$$
M=\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right).
$$

Em malhas, também é possível decompor figuras em retângulos e triângulos para calcular áreas. Este recorte não exige equações de cônicas nem tratamento vetorial avançado.

## 14. Sólidos geométricos

### 14.1. Poliedros e corpos redondos

- Poliedros possuem faces poligonais, arestas e vértices.
- Prismas têm duas bases paralelas e congruentes.
- Pirâmides têm uma base e faces laterais triangulares.
- Cilindros, cones e esferas são corpos redondos.

Não presuma que um prisma ou cilindro é reto se o problema não declarar ou não fornecer a altura perpendicular necessária.

### 14.2. Relação de Euler

Para poliedros convexos:

$$
V-E+F=2,
$$

em que $V$ é o número de vértices, $E$ o de arestas e $F$ o de faces.

A relação não deve ser aplicada automaticamente a sólidos não poliédricos nem a poliedros fora das hipóteses estudadas.

### 14.3. Planificações

Uma planificação abre a superfície do sólido no plano sem criar nem eliminar faces. Para validá-la, observe:

- quantidade e forma das faces;
- arestas que serão unidas;
- sobreposição impossível ao dobrar;
- adjacências incompatíveis.

Toda planificação de um cubo possui seis quadrados congruentes, mas nem todo arranjo de seis quadrados forma um cubo.

## 15. Prismas e cilindros

Para um prisma de área da base $A_b$ e altura perpendicular $h$:

$$
V=A_bh.
$$

Em um prisma reto, se $P_b$ é o perímetro da base:

$$
A_l=P_bh,
$$

$$
A_t=2A_b+A_l.
$$

Para um cilindro circular reto:

$$
V=\pi r^2h,
$$

$$
A_l=2\pi rh,
$$

$$
A_t=2\pi r^2+2\pi rh.
$$

## 16. Pirâmides e cones

Para pirâmides e cones, com área da base $A_b$ e altura perpendicular $h$:

$$
V=\frac{A_bh}{3}.
$$

No cone circular reto:

$$
V=\frac{\pi r^2h}{3}.
$$

Um cone e um cilindro com bases de mesma área e alturas iguais satisfazem

$$
V_{cone}=\frac13V_{cilindro}.
$$

Para áreas laterais de cones ou pirâmides, não confunda altura perpendicular com geratriz ou apótema lateral.

## 17. Esfera

Para esfera de raio $r$:

$$
A=4\pi r^2,
$$

$$
V=\frac43\pi r^3.
$$

Raio e diâmetro devem ser distinguidos antes da substituição.

## 18. Unidades lineares, quadradas e cúbicas

Se

$$
1\text{ m}=100\text{ cm},
$$

então

$$
1\text{ m}^2=10\,000\text{ cm}^2
$$

e

$$
1\text{ m}^3=1\,000\,000\text{ cm}^3.
$$

Relações de capacidade:

$$
1\text{ L}=1\text{ dm}^3=1000\text{ cm}^3,
$$

$$
1\text{ m}^3=1000\text{ L}.
$$

O fator de conversão linear deve ser elevado ao quadrado para áreas e ao cubo para volumes.

## 19. Estratégias para figuras e sólidos compostos

### 19.1. Decomposição

Divida a figura em partes sem sobreposição e some suas medidas.

### 19.2. Subtração

Calcule uma figura envolvente simples e retire vazios ou recortes.

### 19.3. Conservação

Em cortes e rearranjos sem perda:

- a área total é conservada no plano;
- o volume é conservado no espaço.

### 19.4. Simetria

Use partes congruentes para reduzir cálculos, mas somente quando a simetria estiver assegurada.

## 20. Como interpretar alternativas

Distratores geométricos frequentemente correspondem a:

- usar diâmetro no lugar do raio;
- confundir perímetro com área;
- esquecer o fator $1/2$ do triângulo;
- esquecer o fator $1/3$ da pirâmide ou do cone;
- usar lado inclinado como altura;
- aplicar Pitágoras em triângulo sem ângulo reto;
- transferir escala linear diretamente para área ou volume;
- converter unidade quadrada ou cúbica com fator linear;
- somar áreas com unidades diferentes;
- inferir propriedades pela aparência do desenho.

Elimine resultados dimensionalmente incompatíveis antes de refazer todas as contas.

## 21. Erros recorrentes

### 21.1. Fórmula certa, dado errado

Em $A=bh/2$, $h$ deve ser perpendicular à base $b$.

### 21.2. Teorema sem hipótese

Pitágoras exige triângulo retângulo; Tales exige paralelismo na configuração estudada; Euler exige poliedro convexo.

### 21.3. Confundir círculo e circunferência

Comprimento usa $2\pi r$; área usa $\pi r^2$.

### 21.4. Escala sem potência

Razão linear $k$ implica razão de áreas $k^2$ e de volumes $k^3$.

### 21.5. Arredondar $\pi$ sem autorização

Preserve a resposta em função de $\pi$ quando o enunciado não fornecer aproximação.

### 21.6. Misturar área lateral e total

Área total inclui as bases quando elas fazem parte da superfície pedida.

## 22. Síntese

- Desenho não é prova de medida, paralelismo ou perpendicularidade.
- Complementares somam $90^\circ$; suplementares, $180^\circ$.
- Triângulos têm soma angular $180^\circ$ e obedecem à desigualdade triangular.
- Semelhança preserva ângulos e cria proporcionalidade entre lados correspondentes.
- Razão linear $k$ gera razão de áreas $k^2$ e de volumes $k^3$.
- Pitágoras vale apenas em triângulos retângulos.
- Perímetro usa unidade linear; área, quadrada; volume, cúbica.
- Circunferência mede contorno; círculo inclui a região interna.
- Prismas e cilindros usam $A_bh$; pirâmides e cones usam $A_bh/3$.
- A altura usada em áreas e volumes é perpendicular à base.
- A relação de Euler vale para poliedros convexos.
- Toda resposta deve ser testada nas hipóteses e nas unidades do problema.

## Referências

- CEBRASPE. [Edital do concurso público do TCE/MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Edital nº 1, de 6 de julho de 2026. Conteúdo comum de Raciocínio Lógico, item 7. Consultado em 18 jul. 2026.
- IMPA; OBMEP. [Elementos Básicos de Geometria Plana - Parte 1](https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=17&tipo=7). Módulo do Portal da Matemática sobre conceitos fundamentais, ângulos, paralelismo e triângulos. Consultado em 18 jul. 2026.
- IMPA; OBMEP. [Semelhança de Triângulos e Teorema de Tales](https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=10&tipo=7). Módulo do Portal da Matemática sobre Tales, semelhança, relações métricas e aplicações. Consultado em 18 jul. 2026.
- IMPA; OBMEP. [Relações Métricas em Triângulos Retângulos](https://cdnportaldaobmep.impa.br/portaldaobmep/uploads/material_teorico/ofbsnucvbhcks.pdf). Material teórico do Portal da Matemática, com ênfase no Teorema de Pitágoras. Consultado em 18 jul. 2026.
- IMPA; OBMEP. [Relações Métricas no Círculo](https://cdnportaldaobmep.impa.br/portaldaobmep/uploads/material_teorico/gt0q4eskz688w.pdf). Material teórico do Portal da Matemática sobre cordas e relações circulares. Consultado em 18 jul. 2026.
- IMPA; OBMEP. [Geometria Espacial 2 - Volumes e Áreas](https://cdnportaldaobmep.impa.br/portaldaobmep/uploads/material_teorico/5wnumy4t030o0.pdf). Material teórico de 8 de setembro de 2018 sobre semelhança, áreas e volumes de sólidos. Consultado em 18 jul. 2026.
