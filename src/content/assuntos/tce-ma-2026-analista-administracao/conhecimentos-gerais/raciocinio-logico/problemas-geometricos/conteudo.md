---
schemaVersion: 1
title: Problemas geométricos
description: Resolução de problemas geométricos com ângulos, triângulos, semelhança, áreas, círculos, escalas, volumes e unidades.
order: 44
storageId: problemas-geometricos
---

## 1. Recorte

O edital cobra **raciocínio lógico envolvendo problemas geométricos**. O objetivo deste assunto é reconhecer a estrutura geométrica de uma situação, escolher a relação adequada e validar a resposta — não transformar o item em um curso completo de geometria.

Priorize:

- ângulos e paralelismo quando necessários ao problema;
- triângulos, semelhança, Teorema de Tales e Teorema de Pitágoras;
- perímetros e áreas usuais;
- figuras compostas;
- circunferência, círculo, arcos e setores em aplicações diretas;
- escalas e semelhança;
- volumes e capacidade de prismas, cilindros, pirâmides e cones;
- conversões de unidades lineares, quadradas e cúbicas.

Operações aritméticas gerais pertencem ao Assunto 043. Problemas matriciais pertencem ao Assunto 045.

## 2. Fluxo de resolução

1. Identifique a figura ou configuração.
2. Separe dados declarados de propriedades apenas aparentes no desenho.
3. Determine a grandeza pedida: comprimento, ângulo, área, volume ou capacidade.
4. Confira as hipóteses do teorema ou fórmula.
5. Uniformize unidades.
6. Calcule e valide dimensão e ordem de grandeza.

> Um desenho fora de escala organiza o raciocínio, mas não prova paralelismo, perpendicularidade, igualdade de lados ou medidas angulares.

## 3. Ângulos e paralelas

Relações básicas:

| Relação | Regra |
|---|---:|
| complementares | somam $90^\circ$ |
| suplementares | somam $180^\circ$ |
| opostos pelo vértice | são iguais |
| ao redor de um ponto | somam $360^\circ$ |

Quando **duas retas paralelas** são cortadas por uma transversal:

- correspondentes são iguais;
- alternos internos e alternos externos são iguais;
- colaterais internos e colaterais externos são suplementares.

Sem o paralelismo, essas conclusões não são automáticas.

## 4. Triângulos

A soma dos ângulos internos é

$$
180^\circ.
$$

Um ângulo externo é igual à soma dos dois ângulos internos não adjacentes.

### 4.1. Desigualdade triangular

Se $c$ é o maior dos três comprimentos positivos, existe triângulo não degenerado se

$$
c<a+b.
$$

### 4.2. Isósceles e equilátero

- isósceles: ângulos opostos aos lados congruentes são iguais;
- equilátero: três lados iguais e três ângulos de $60^\circ$.

### 4.3. Teorema de Pitágoras

Somente em triângulo retângulo:

$$
a^2+b^2=c^2,
$$

em que $c$ é a hipotenusa.

A diagonal de um retângulo ou quadrado pode criar um triângulo retângulo e permitir a aplicação de Pitágoras.

## 5. Semelhança e Tales

Figuras semelhantes preservam ângulos correspondentes e possuem comprimentos correspondentes proporcionais.

Se a razão linear é $k$:

$$
\frac{L_2}{L_1}=k,
\qquad
\frac{A_2}{A_1}=k^2,
\qquad
\frac{V_2}{V_1}=k^3.
$$

### 5.1. Teorema de Tales

Em configurações com retas paralelas, segmentos correspondentes nas transversais são proporcionais. A correspondência precisa ser mantida na mesma ordem.

Exemplo:

$$
\frac{4}{6}=\frac{x}{9}
\quad\Longrightarrow\quad
x=6.
$$

## 6. Polígonos e áreas

Para um polígono simples de $n$ lados:

$$
S_i=(n-2)180^\circ.
$$

### 6.1. Fórmulas de maior rendimento

| Figura | Área |
|---|---:|
| quadrado | $l^2$ |
| retângulo | $ab$ |
| paralelogramo | $bh$ |
| triângulo | $\dfrac{bh}{2}$ |
| trapézio | $\dfrac{(B+b)h}{2}$ |
| losango | $\dfrac{Dd}{2}$ |

Perímetro mede o contorno e usa unidade linear. Área mede superfície e usa unidade quadrada.

A altura $h$ é **perpendicular** à base escolhida; um lado inclinado não é automaticamente a altura.

### 6.2. Figuras compostas

Duas estratégias dominam:

- **decomposição:** dividir em figuras conhecidas e somar áreas;
- **subtração:** calcular uma região maior e retirar vazios ou recortes.

Somente some ou subtraia grandezas com unidades compatíveis.

## 7. Circunferência e círculo

- circunferência: contorno;
- círculo: região interna;
- diâmetro: $d=2r$.

Comprimento:

$$
C=2\pi r=\pi d.
$$

Área:

$$
A=\pi r^2.
$$

Preserve $\pi$ quando o enunciado não fornecer aproximação.

### 7.1. Arcos e setores

Se $\theta$ é o ângulo central em graus:

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

A ideia central é proporcional: $90^\circ$ corresponde a um quarto; $60^\circ$, a um sexto.

### 7.2. Coroa circular

Entre círculos concêntricos de raios $R>r$:

$$
A=\pi(R^2-r^2).
$$

Não confunda $R^2-r^2$ com $(R-r)^2$.

## 8. Escalas

Escala $1:n$ significa que uma unidade no desenho representa $n$ unidades reais na dimensão linear.

Assim:

- comprimento: fator $n$;
- área de figuras semelhantes: fator $n^2$;
- volume de sólidos semelhantes: fator $n^3$.

Exemplo: em escala $1:50$, 8 cm representam

$$
8\cdot50=400\text{ cm}=4\text{ m}.
$$

## 9. Volumes e capacidade

A altura usada nas fórmulas é a distância **perpendicular** entre base e plano oposto.

### 9.1. Prismas e paralelepípedos

$$
V=A_bh.
$$

Para um paralelepípedo retângulo de dimensões $a$, $b$ e $c$:

$$
V=abc.
$$

Para um cubo:

$$
V=l^3.
$$

Em problemas de área de material, conte somente as faces realmente presentes. Uma caixa sem tampa, por exemplo, não inclui a face superior.

### 9.2. Cilindro circular reto

$$
V=\pi r^2h.
$$

### 9.3. Pirâmides e cones

$$
V=\frac{A_bh}{3}.
$$

No cone circular reto:

$$
V=\frac{\pi r^2h}{3}.
$$

Logo, com a mesma área de base e a mesma altura:

$$
V_{\text{cone}}=\frac13V_{\text{cilindro}},
$$

e analogamente uma pirâmide tem um terço do volume do prisma correspondente.

## 10. Conversões dimensionais

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

Relações úteis:

$$
1\text{ L}=1\text{ dm}^3=1000\text{ cm}^3,
$$

$$
1\text{ m}^3=1000\text{ L}.
$$

O fator linear deve ser elevado ao quadrado para áreas e ao cubo para volumes.

## 11. Pegadinhas

- Desenho não prova propriedade.
- Paralelas são hipótese necessária para as relações da transversal e para Tales.
- Pitágoras exige triângulo retângulo.
- Perímetro, área e volume têm dimensões diferentes.
- Altura é perpendicular à base.
- Raio não é diâmetro.
- Comprimento da circunferência não é área do círculo.
- Escala linear não passa diretamente para área ou volume.
- Cone e pirâmide têm fator $1/3$ no volume.
- Em caixa sem tampa, não conte a tampa.
- Conversão de área e volume não usa fator linear.
- Resultado deve ser compatível com a figura e com a unidade pedida.

## 12. Referências

- CEBRASPE. [Edital do concurso público do TCE/MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Edital nº 1, de 6 de julho de 2026. Conteúdo comum de Raciocínio Lógico, item 7.
- IMPA; OBMEP. [Elementos Básicos de Geometria Plana - Parte 1](https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=17&tipo=7).
- IMPA; OBMEP. [Semelhança de Triângulos e Teorema de Tales](https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=10&tipo=7).
- IMPA; OBMEP. [Relações Métricas em Triângulos Retângulos](https://cdnportaldaobmep.impa.br/portaldaobmep/uploads/material_teorico/ofbsnucvbhcks.pdf).
- IMPA; OBMEP. [Geometria Espacial 2 - Volumes e Áreas](https://cdnportaldaobmep.impa.br/portaldaobmep/uploads/material_teorico/5wnumy4t030o0.pdf).
