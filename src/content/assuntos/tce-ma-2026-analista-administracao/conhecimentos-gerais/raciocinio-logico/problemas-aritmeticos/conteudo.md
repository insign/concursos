---
schemaVersion: 1
title: Problemas aritméticos
description: Modelagem e resolução de problemas com razões, proporções, porcentagens, médias, equações, taxas, misturas, juros, sequências e unidades.
order: 43
storageId: problemas-aritmeticos
---

## 1. Aritmética como modelagem de situações

Resolver um problema aritmético não é apenas executar contas. É transformar uma situação verbal em relações numéricas, escolher uma estratégia compatível com as hipóteses e conferir se o resultado responde à pergunta.

Um roteiro seguro tem cinco etapas:

1. identificar dados, incógnitas e unidades;
2. traduzir palavras em operações ou equações;
3. verificar que relações são constantes;
4. calcular sem arredondar prematuramente;
5. testar o resultado no contexto.

### 1.1. Fronteiras deste assunto

| Recurso | Tratamento |
|---|---|
| operações, frações, divisibilidade e restos | ferramentas aritméticas |
| razões, proporções, porcentagens e médias | desenvolvimento completo |
| equações e sistemas elementares | modelagem sem método matricial |
| trabalho, produção, vazão, movimento e misturas | problemas de taxas e conservação |
| juros e sequências numéricas | tratamento aritmético |
| áreas, perímetros, ângulos e volumes geométricos | Assunto 044 |
| operações e padrões em matrizes | Assunto 045 |

Conversões de unidades pertencem a este assunto quando a tarefa é numérica. Se for necessário descobrir uma área ou um volume por propriedades de figuras, a parte central é geométrica.

## 2. Operações, frações e ordem de cálculo

Em expressões numéricas, respeite esta ordem:

1. parênteses, colchetes e chaves, de dentro para fora;
2. potências e raízes;
3. multiplicações e divisões, da esquerda para a direita;
4. adições e subtrações, da esquerda para a direita.

### 2.1. Frações

Para denominadores não nulos:

$$
\frac ab+\frac cd=\frac{ad+bc}{bd},
$$

$$
\frac ab\cdot\frac cd=\frac{ac}{bd},
$$

$$
\frac ab\div\frac cd=\frac ab\cdot\frac dc,
\qquad c\ne0.
$$

“Três quintos de 350” significa

$$
\frac35\cdot350=210.
$$

Se uma fração é retirada do **restante**, sua base mudou. Gastar metade de um valor e depois um quarto do que restou não significa gastar três quartos do valor inicial:

$$
1-\frac12-\frac14\cdot\frac12=\frac38.
$$

### 2.2. Decimais e arredondamento

Converta decimal finito em fração quando isso simplificar a conta:

$$
0{,}125=\frac{125}{1000}=\frac18.
$$

Mantenha valores exatos durante o desenvolvimento. Arredonde apenas ao final e somente quando o enunciado autorizar ou exigir aproximação.

## 3. Divisibilidade, múltiplos e restos

O máximo divisor comum, $\operatorname{mdc}(a,b)$, é útil para formar o maior número de grupos idênticos sem sobra. O mínimo múltiplo comum, $\operatorname{mmc}(a,b)$, aparece em coincidência de ciclos.

Exemplo: dois eventos repetem-se a cada 8 e 12 dias. Se ocorreram juntos hoje, voltarão a coincidir após

$$
\operatorname{mmc}(8,12)=24
$$

dias.

Na divisão euclidiana de um inteiro $n$ por um inteiro positivo $d$:

$$
n=dq+r,
\qquad 0\le r<d.
$$

O resto deve ser menor que o divisor. Padrões de restos permitem resolver problemas periódicos sem listar todos os casos.

## 4. Razões e proporções

A razão entre duas grandezas comparáveis é um quociente:

$$
a:b=\frac ab,
\qquad b\ne0.
$$

Antes de formar a razão, coloque as grandezas em unidades compatíveis. A razão entre 2 m e 50 cm é

$$
\frac{200\text{ cm}}{50\text{ cm}}=4.
$$

Uma proporção é uma igualdade de razões:

$$
\frac ab=\frac cd
\quad\Longleftrightarrow\quad
ad=bc,
$$

desde que $b$ e $d$ sejam não nulos.

### 4.1. Proporcionalidade direta

Se $y$ é diretamente proporcional a $x$:

$$
y=kx.
$$

Multiplicar $x$ por um fator multiplica $y$ pelo mesmo fator. Com preço unitário constante, quantidade e custo são diretamente proporcionais.

### 4.2. Proporcionalidade inversa

Se $y$ é inversamente proporcional a $x$:

$$
xy=k.
$$

Multiplicar $x$ por um fator divide $y$ por esse fator. Sob produtividade total proporcional ao número de trabalhadores, mais trabalhadores exigem menos tempo para o mesmo serviço.

> Não classifique grandezas apenas porque uma aumenta e a outra diminui. A relação inversa exige produto constante nas condições do problema.

## 5. Regra de três

A regra de três organiza uma proporcionalidade já justificada; ela não substitui a análise da relação.

### 5.1. Regra de três simples direta

Se 5 unidades custam R$ 140,00, então 8 unidades custam $x$:

$$
\frac{x}{140}=\frac85
\quad\Longrightarrow\quad
x=224.
$$

### 5.2. Regra de três simples inversa

Se 6 trabalhadores realizam um serviço em 15 dias, então, sob produtividade igual e jornada constante, 10 trabalhadores realizam o mesmo serviço em $t$ dias:

$$
6\cdot15=10t
\quad\Longrightarrow\quad
t=9.
$$

### 5.3. Regra de três composta

Compare cada grandeza com a incógnita, mantendo as demais constantes. Por exemplo, a produção é diretamente proporcional ao número de máquinas e ao tempo quando a produtividade de cada máquina é constante:

$$
P=kmt.
$$

Se 4 máquinas produzem 480 peças em 6 horas, a taxa por máquina-hora é

$$
\frac{480}{4\cdot6}=20.
$$

Logo, 10 máquinas em 3 horas produzem

$$
20\cdot10\cdot3=600
$$

peças.

## 6. Divisão proporcional

Para dividir um total $T$ diretamente na razão $a:b:c$, some os pesos:

$$
x=T\frac{a}{a+b+c},
\quad
y=T\frac{b}{a+b+c},
\quad
z=T\frac{c}{a+b+c}.
$$

Dividindo 720 na razão $2:3:4$, as parcelas são 160, 240 e 320.

Na divisão inversamente proporcional a $a$ e $b$, use os pesos $1/a$ e $1/b$. Para evitar frações, multiplique ambos por um múltiplo comum.

Exemplo: dividir 600 inversamente a 2 e 3 equivale a usar a razão

$$
\frac12:\frac13=3:2.
$$

As parcelas associadas a 2 e 3 são, respectivamente, 360 e 240.

## 7. Porcentagens

Porcentagem é uma razão com denominador 100:

$$
p\%=\frac p{100}.
$$

Para calcular $p\%$ de $V$:

$$
V\frac p{100}.
$$

### 7.1. Aumento e desconto

Um aumento de $p\%$ multiplica o valor por

$$
1+\frac p{100}.
$$

Um desconto de $p\%$ multiplica por

$$
1-\frac p{100}.
$$

Se um valor de R$ 800,00 recebe desconto de 15%:

$$
800(1-0{,}15)=680.
$$

### 7.2. Descobrir o valor original

Se o valor final $F$ resulta de desconto de $p\%$ sobre o valor inicial $V$:

$$
F=V\left(1-\frac p{100}\right).
$$

O valor inicial é obtido por divisão, não por somar o mesmo percentual ao final. Se R$ 240,00 correspondem ao preço após desconto de 20%:

$$
V=\frac{240}{0{,}8}=300.
$$

### 7.3. Variações sucessivas

Percentuais sucessivos atuam por multiplicação de fatores:

$$
V_f=V_0(1+p_1)(1+p_2)\cdots,
$$

com cada taxa escrita em forma decimal e sinal adequado.

Aumentar 20% e depois reduzir 20% produz

$$
1{,}2\cdot0{,}8=0{,}96,
$$

isto é, redução líquida de 4%.

Dois descontos de 10% e 20% resultam em

$$
0{,}9\cdot0{,}8=0{,}72,
$$

equivalente a desconto total de 28%, não de 30%.

### 7.4. Pontos percentuais

Passar de 40% para 50% representa:

- aumento de 10 **pontos percentuais**;
- aumento relativo de $10/40=25\%$.

As duas medidas respondem a perguntas diferentes.

## 8. Médias

### 8.1. Média aritmética simples

Para $n$ valores:

$$
\bar x=\frac{x_1+x_2+\cdots+x_n}{n}.
$$

A média permite recuperar a soma:

$$
x_1+\cdots+x_n=n\bar x.
$$

Se cinco valores têm média 18, sua soma é 90. Acrescentando o valor 24, a nova média é

$$
\frac{90+24}{6}=19.
$$

### 8.2. Média ponderada

Com pesos $w_i$:

$$
\bar x_p=\frac{\sum w_ix_i}{\sum w_i},
$$

desde que a soma dos pesos seja não nula.

Ao combinar grupos, os tamanhos dos grupos funcionam como pesos. Um grupo de 20 pessoas com média 70 e outro de 30 com média 80 têm média conjunta

$$
\frac{20\cdot70+30\cdot80}{50}=76.
$$

### 8.3. Média de velocidades

Velocidade média é sempre

$$
v_m=\frac{\text{distância total}}{\text{tempo total}}.
$$

Em duas distâncias iguais percorridas a velocidades $v_1$ e $v_2$:

$$
v_m=\frac{2v_1v_2}{v_1+v_2}.
$$

Para 60 km/h e 40 km/h, a média é 48 km/h, e não 50 km/h.

## 9. Equações como tradução

Escolha a incógnita, escreva cada relação e preserve a igualdade ao operar os dois lados.

Exemplo:

> O triplo de um número, somado a 7, é 40.

$$
3x+7=40
\quad\Longrightarrow\quad
x=11.
$$

Verifique restrições do contexto. Uma solução algébrica negativa não serve para uma quantidade que deve ser positiva.

## 10. Sistemas elementares

Duas incógnitas independentes exigem, em geral, duas relações independentes.

Se dois números somam 30 e diferem por 6:

$$
\begin{cases}
x+y=30,\\
x-y=6.
\end{cases}
$$

Somando as equações:

$$
2x=36
\quad\Longrightarrow\quad
x=18,
\qquad y=12.
$$

Em geral, se a soma é $S$ e a diferença entre o maior e o menor é $D$:

$$
x=\frac{S+D}{2},
\qquad
y=\frac{S-D}{2}.
$$

As fórmulas resultam, respectivamente, da soma e da subtração das duas equações.

Aqui o sistema é resolvido por eliminação aritmética. Métodos baseados em matrizes pertencem ao Assunto 045.

## 11. Problemas de idades

A diferença de idade entre duas pessoas permanece constante. Organize os dados em presente, passado e futuro.

Exemplo: hoje, a idade de um pai é quatro vezes a do filho. Daqui a 12 anos, será o dobro:

$$
4x+12=2(x+12).
$$

Logo, $x=6$: hoje o filho tem 6 anos e o pai, 24. Daqui a 12 anos, terão 18 e 36 anos.

> Não multiplique o intervalo de tempo pela razão das idades. Todas as pessoas envelhecem o mesmo número de anos.

## 12. Taxas: uma estrutura comum

Muitos problemas obedecem ao modelo

$$
\text{quantidade}=\text{taxa}\cdot\text{tempo}.
$$

Antes de combinar taxas, expresse-as na mesma unidade.

### 12.1. Trabalho e produção

Se uma pessoa conclui um serviço em $t$ unidades de tempo, sua taxa é

$$
\frac1t
$$

do serviço por unidade de tempo.

Se A conclui em 6 dias e B em 3 dias, trabalhando juntos sob taxas constantes:

$$
\frac16+\frac13=\frac12.
$$

Juntos concluem o serviço em 2 dias.

Para trabalhadores ou máquinas idênticos:

$$
P=rnt,
$$

em que $P$ é produção, $r$ é produtividade individual, $n$ é o número de agentes e $t$ é o tempo.

Se a produtividade aumenta 25% para o mesmo trabalho, o novo tempo é dividido por 1,25:

$$
t_{novo}=\frac{t_{antigo}}{1{,}25}=0{,}8t_{antigo}.
$$

### 12.2. Vazão

Vazão é volume por tempo:

$$
Q=\frac Vt.
$$

Entradas somam vazões; saídas subtraem. Uma entrada de 100 L/min e uma saída de 25 L/min geram vazão líquida de 75 L/min, desde que ambas permaneçam constantes.

### 12.3. Movimento uniforme

$$
d=vt.
$$

Em sentidos opostos e aproximação, a distância entre dois móveis diminui pela soma das velocidades. No mesmo sentido, a velocidade relativa é a diferença, quando o mais rápido persegue o mais lento.

Uniformize horas, minutos, quilômetros e metros antes de substituir.

## 13. Misturas e concentrações

Em uma mistura sem reação ou perda, conserve a quantidade da substância de interesse.

Se uma solução possui volume $V$ e concentração decimal $c$, a quantidade de soluto é

$$
S=cV.
$$

Ao misturar soluções:

$$
c_f=\frac{c_1V_1+c_2V_2}{V_1+V_2},
$$

quando volumes são aditivos e as concentrações usam a mesma base.

Exemplo: 10 kg de mistura a 20% e 15 kg a 40% contêm

$$
10\cdot0{,}2+15\cdot0{,}4=8
$$

kg da substância em 25 kg totais. A concentração final é 32%.

Adicionar água mantém o soluto e aumenta o total. Adicionar soluto puro aumenta simultaneamente soluto e total.

## 14. Juros simples e compostos

Use taxa e tempo na mesma unidade de período.

### 14.1. Juros simples

Os juros incidem sempre sobre o capital inicial $C$:

$$
J=Cit,
$$

$$
M=C+J=C(1+it).
$$

Para R$ 2.000,00 a 2% ao mês por 5 meses:

$$
J=2000\cdot0{,}02\cdot5=200.
$$

### 14.2. Juros compostos

Cada período aplica a taxa ao montante acumulado:

$$
M=C(1+i)^n.
$$

R$ 1.000,00 a 10% por dois períodos produzem

$$
1000(1{,}1)^2=1210.
$$

No mesmo caso, juros simples produziriam R$ 1.200,00. A diferença surge porque os juros do primeiro período também rendem no segundo sob capitalização composta.

## 15. Sequências e padrões

Antes de escolher uma fórmula, teste diferenças, razões, alternância, posição e recorrência.

A sequência

$$
2,5,10,17,26,\ldots
$$

segue $a_n=n^2+1$.

### 15.1. Progressão aritmética

Uma PA possui diferença constante $r$ entre termos consecutivos:

$$
a_n=a_1+(n-1)r.
$$

A soma dos $n$ primeiros termos é

$$
S_n=\frac{n(a_1+a_n)}2.
$$

Em uma PA com $a_1=7$ e $r=4$:

$$
a_{12}=7+11\cdot4=51.
$$

Não suponha que toda sequência é PA. Em uma recorrência como $a_n=2a_{n-1}+1$, cada termo depende do anterior por outra regra.

## 16. Conversão de unidades

Use fatores que valem 1 e cancele unidades:

$$
1{,}5\text{ km}\cdot\frac{1000\text{ m}}{1\text{ km}}=1500\text{ m}.
$$

Conversões frequentes:

| Grandeza | Relação |
|---|---|
| tempo | $1\text{ h}=60\text{ min}=3600\text{ s}$ |
| comprimento | $1\text{ km}=1000\text{ m}$ |
| massa | $1\text{ kg}=1000\text{ g}$ |
| capacidade | $1\text{ L}=1000\text{ mL}$ |
| velocidade | $1\text{ m/s}=3{,}6\text{ km/h}$ |

Logo:

$$
90\text{ km/h}=\frac{90}{3{,}6}\text{ m/s}=25\text{ m/s}.
$$

Em unidades quadradas ou cúbicas, o fator de comprimento também é elevado ao quadrado ou ao cubo; os cálculos geométricos correspondentes são desenvolvidos no Assunto 044.

## 17. Dígitos e números inteiros

Um número de dois algarismos, com dezena $x$ e unidade $y$, vale

$$
10x+y.
$$

O número invertido vale $10y+x$. Se a soma dos algarismos é 11 e o original excede o invertido em 27:

$$
\begin{cases}
x+y=11,\\
9x-9y=27.
\end{cases}
$$

Daí $x-y=3$, $x=7$ e $y=4$: o número é 74.

## 18. Como montar alternativas e eliminar erros

Em uma prova, distratores frequentemente correspondem a um destes erros:

- somar percentuais sucessivos em vez de multiplicar fatores;
- usar a média simples quando os pesos diferem;
- inverter uma relação direta ou deixar de inverter uma relação inversa;
- somar tempos em vez de somar taxas de trabalho;
- tirar média simples de concentrações com quantidades diferentes;
- misturar minutos com horas ou metros com quilômetros;
- aplicar juros simples em situação composta;
- responder uma grandeza intermediária, não a solicitada.

Se o cálculo ficar longo, estime a ordem de grandeza. Um desconto deve reduzir o valor; uma média ponderada positiva deve ficar entre o menor e o maior valor; uma concentração de duas misturas deve ficar entre as concentrações iniciais, salvo adição de substância pura.

## 19. Roteiro de resolução por tipo

### 19.1. Percentual

1. identifique a base;
2. converta a taxa em fator;
3. aplique os fatores sucessivamente;
4. compare valor final e inicial na mesma base.

### 19.2. Taxas

1. escreva a taxa de cada agente;
2. uniformize unidades;
3. some entradas e subtraia saídas;
4. use quantidade = taxa líquida × tempo.

### 19.3. Equações

1. defina incógnitas com unidade;
2. traduza cada frase;
3. resolva;
4. teste no texto e nas restrições.

### 19.4. Sequências

1. calcule diferenças e razões;
2. teste alternância e recorrência;
3. procure relação com a posição;
4. valide a regra em todos os termos disponíveis.

## 20. Erros recorrentes

### 20.1. Confundir parte e restante

“Um quarto do restante” não é um quarto do total original.

### 20.2. Aplicar regra de três sem proporcionalidade

A simples coexistência de duas grandezas não garante relação direta ou inversa.

### 20.3. Usar base percentual errada

Percentuais de aumento e redução geralmente incidem sobre valores diferentes.

### 20.4. Somar taxas com unidades diferentes

Converta, por exemplo, L/s e L/min para uma unidade comum.

### 20.5. Fazer média das médias sem pesos

Use o tamanho de cada grupo como peso.

### 20.6. Confundir capital, juros e montante

Montante é capital mais juros. A pergunta pode solicitar apenas uma dessas parcelas.

### 20.7. Supor padrão cedo demais

Poucos termos podem admitir várias regras. Em prova objetiva, use a regra simples compatível com todos os dados e com o contexto.

## 21. Síntese

- Frações sucessivas podem incidir sobre bases diferentes.
- MMC resolve coincidência de ciclos; MDC, agrupamentos máximos sem sobra.
- Proporcionalidade direta mantém quociente; inversa mantém produto.
- Percentuais sucessivos são multiplicativos.
- Média conjunta exige pesos dos grupos.
- Trabalho, vazão e movimento usam quantidade = taxa × tempo.
- Em misturas, conserve a quantidade da substância relevante.
- Juros simples crescem linearmente; compostos, por fatores acumulados.
- Uma PA tem diferença constante e termo geral $a_n=a_1+(n-1)r$.
- Toda conta com grandezas exige unidades compatíveis.
- A resposta deve ser validada no contexto, não apenas na equação.

## Referências

- CEBRASPE. [Edital do concurso público do TCE/MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Edital nº 1, de 6 de julho de 2026. Conteúdo comum de Raciocínio Lógico, item 7. Consultado em 18 jul. 2026.
- TRIBUNAL DE CONTAS DO ESTADO DO MARANHÃO. [Notícia oficial sobre a publicação do edital](https://www.tcema.tc.br/index.php/noticias-concurso-tcema/3449-tce-publica-edital-de-concurso-publico). Publicada em 8 de julho de 2026. Consultada em 18 jul. 2026.
- IMPA; OBMEP. [Razões e Proporções](https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=57&tipo=7). Módulo do Portal da Matemática sobre razões, proporcionalidade direta e inversa e regras de três simples e composta. Consultado em 18 jul. 2026.
- IMPA; OBMEP. [Porcentagem e Juros](https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=26&tipo=7). Módulo do Portal da Matemática sobre porcentagens, juros simples e compostos. Consultado em 18 jul. 2026.
- IMPA; OBMEP. [Sistemas de Equações do Primeiro Grau](https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=24&tipo=7). Módulo do Portal da Matemática com modelagem de situações-problema. Consultado em 18 jul. 2026.
- IMPA; OBMEP. [Sistemas de Medidas e Medidas de Tempo](https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=43). Módulo do Portal da Matemática sobre unidades, conversões e operações com medidas. Consultado em 18 jul. 2026.
- IMPA; OBMEP. [Progressões Aritméticas](https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=79&tipo=7). Módulo do Portal da Matemática sobre termo geral, soma e aplicações de progressões aritméticas. Consultado em 18 jul. 2026.
