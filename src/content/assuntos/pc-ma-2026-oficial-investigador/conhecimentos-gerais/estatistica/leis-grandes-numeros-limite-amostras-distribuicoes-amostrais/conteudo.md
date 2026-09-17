---
schemaVersion: 1
title: "Leis dos grandes números, teorema central do limite e distribuições amostrais"
description: "Amostras aleatórias, leis dos grandes números, teorema central do limite e distribuições amostrais da média, proporção e variância."
order: 53
storageId: pc-u053
---

# Leis dos grandes números, teorema central do limite e distribuições amostrais

Uma observação aleatória pode ser muito instável. **O que muda quando repetimos o mesmo mecanismo muitas vezes e resumimos os resultados por uma média, uma proporção ou outra estatística?**

O mapa desta unidade é:

> **população → amostra aleatória → estatística → distribuição amostral → concentração pela lei dos grandes números → forma aproximada pelo teorema central do limite**

A U052 ensinou a distribuição de uma variável aleatória. Aqui o foco passa a ser a distribuição de **funções de várias observações**, especialmente a média amostral. Essa ponte é o que permitirá, na U054, usar a amostra para fazer inferência sobre parâmetros desconhecidos.

## 1. Da população para uma amostra aleatória

Suponha uma população modelada por uma variável aleatória \(X\), com média

\[
E(X)=\mu
\]

e variância finita

\[
\operatorname{Var}(X)=\sigma^2.
\]

Uma **amostra aleatória de tamanho \(n\)**, no modelo probabilístico desta unidade, é uma coleção

\[
X_1,X_2,\ldots,X_n
\]

em que as variáveis:

1. são independentes entre si; e
2. têm a mesma distribuição da população.

Antes da coleta, \(X_1,\ldots,X_n\) são variáveis aleatórias. Depois de observar os dados, obtemos valores concretos \(x_1,\ldots,x_n\).

Essa distinção é importante: uma **estatística** é uma função da amostra aleatória e, portanto, também é uma variável aleatória antes da observação dos dados.

Exemplos:

\[
\bar X=\frac{1}{n}\sum_{i=1}^{n}X_i
\]

é a média amostral, e

\[
S^2=\frac{1}{n-1}\sum_{i=1}^{n}(X_i-\bar X)^2
\]

é a variância amostral usual.

O desenho de amostragem em populações finitas — inclusive amostragem sem reposição e outros planos — pertence ao item 5 do edital, tratado em U055. Aqui usamos o modelo probabilístico de observações independentes e com mesma distribuição para construir os resultados de 2.11 a 2.14.

## 2. Distribuição amostral: repetir a amostra, não a população

Se pudéssemos repetir o mesmo procedimento de amostragem muitas vezes, cada amostra produziria um valor diferente de \(\bar X\), \(S^2\), uma proporção amostral ou outra estatística.

A **distribuição amostral** é a distribuição de probabilidade desses possíveis valores da estatística sob repetição do mecanismo de amostragem.

Isso separa três objetos:

| Objeto | O que descreve |
|---|---|
| distribuição da população | comportamento de uma observação \(X\) |
| amostra | conjunto \(X_1,\ldots,X_n\) de observações |
| distribuição amostral | comportamento de uma estatística calculada da amostra |

A prova frequentemente explora a troca indevida entre esses níveis. A população pode ser assimétrica e, ainda assim, a distribuição da média amostral se aproximar de uma normal quando o tamanho da amostra cresce e as condições do teorema central do limite são atendidas.

## 3. Média amostral: centro preservado, dispersão reduzida

Para observações independentes, com mesma média \(\mu\) e mesma variância \(\sigma^2\),

\[
\bar X=\frac{X_1+\cdots+X_n}{n}.
\]

Pela linearidade da esperança,

\[
E(\bar X)=\mu.
\]

A média amostral está, portanto, centrada na média populacional.

Pela independência,

\[
\operatorname{Var}(\bar X)
=
\frac{\sigma^2}{n}.
\]

Logo o desvio padrão da distribuição amostral da média é

\[
\frac{\sigma}{\sqrt n}.
\]

Esse desvio padrão da estatística é chamado **erro padrão** da média.

A consequência operacional é decisiva: aumentar \(n\) não muda o centro \(\mu\), mas comprime a distribuição de \(\bar X\) em torno dele.

**Pegadinha:** quadruplicar \(n\) reduz o erro padrão pela metade, não para um quarto.

## 4. Lei fraca dos grandes números: a média se concentra

A lei fraca dos grandes números formaliza a ideia de estabilidade da média.

No caso clássico de observações independentes e com mesma distribuição, com média \(\mu\) e variância finita, para todo \(\varepsilon>0\),

\[
P\left(|\bar X_n-\mu|\ge \varepsilon\right)\longrightarrow 0
\qquad\text{quando }n\to\infty.
\]

Equivalentemente,

\[
\bar X_n \xrightarrow{P} \mu.
\]

A notação \(\xrightarrow{P}\) significa **convergência em probabilidade**: para qualquer tolerância positiva fixa, a probabilidade de a média ficar fora dessa tolerância tende a zero.

A lei fala sobre a **média**. Se

\[
S_n=X_1+\cdots+X_n,
\]

então

\[
\frac{S_n}{n}=\bar X_n\xrightarrow{P}\mu.
\]

Em geral, não se conclui que a soma \(S_n\) convirja para \(\mu\) ou para uma distribuição normal fixa.

### Exemplo hipotético

Suponha observações independentes com média 20 e variância 25. A média de uma amostra de tamanho \(n\) tem

\[
E(\bar X)=20,
\qquad
\operatorname{Var}(\bar X)=\frac{25}{n}.
\]

Quando \(n\) cresce, a variância da média cai. Essa redução de dispersão é o mecanismo por trás da concentração descrita pela lei fraca.

## 5. Lei forte dos grandes números: convergência ao longo da sequência

A expressão “leis dos grandes números”, no plural, também abrange uma forma mais forte de convergência.

No caso clássico de observações independentes e identicamente distribuídas com \(E(|X_1|)<\infty\), a lei forte afirma que

\[
\bar X_n\longrightarrow \mu
\]

<abbr title="a sequência converge com probabilidade 1">quase certamente</abbr>.

Em linguagem direta: com probabilidade 1, uma realização da sequência de médias acaba se aproximando de \(\mu\) e permanece arbitrariamente próxima dele.

A relação de força é:

\[
\text{convergência quase certa}
\quad\Longrightarrow\quad
\text{convergência em probabilidade}.
\]

Para a prova, a distinção essencial é reconhecer **qual objeto converge e em qual sentido**. A lei dos grandes números não afirma que a distribuição dos dados originais se torna normal e não cria “compensação” de resultados passados.

## 6. Teorema central do limite: a forma da flutuação

A lei dos grandes números responde:

> **para onde a média vai?**

O teorema central do limite responde outra pergunta:

> **qual é a forma aproximada das flutuações da média ao redor de \(\mu\)?**

Na forma clássica, se \(X_1,\ldots,X_n\) são independentes e identicamente distribuídas, com

\[
E(X_i)=\mu
\]

e

\[
0<\operatorname{Var}(X_i)=\sigma^2<\infty,
\]

então

\[
Z_n
=
\frac{\bar X_n-\mu}{\sigma/\sqrt n}
\xrightarrow{d}
N(0,1).
\]

A notação \(\xrightarrow{d}\) significa **convergência em distribuição**: a distribuição da variável padronizada se aproxima da distribuição normal padrão.

Em termos da soma \(S_n\),

\[
\frac{S_n-n\mu}{\sigma\sqrt n}
\xrightarrow{d}
N(0,1).
\]

Observe os dois ajustes necessários:

- centralizar a soma por \(n\mu\);
- dividir por \(\sigma\sqrt n\).

O teorema não diz que a soma sem padronização converge para uma normal fixa.

## 7. Exato e assintótico não são a mesma coisa

Há duas situações que a prova costuma misturar.

### População normal

Se a própria população é normal,

\[
X_i\sim N(\mu,\sigma^2),
\]

então, para qualquer \(n\ge1\),

\[
\bar X\sim N\left(\mu,\frac{\sigma^2}{n}\right).
\]

Esse resultado é **exato**.

### População não necessariamente normal

Se a população não é normal, mas atende às condições do teorema central do limite, então, para \(n\) suficientemente grande,

\[
\bar X
\approx
N\left(\mu,\frac{\sigma^2}{n}\right).
\]

Esse resultado é **aproximado**.

Não existe um tamanho universal, como “\(n=30\)”, que transforme automaticamente qualquer distribuição em um caso de boa aproximação. A qualidade da aproximação depende também da forma da distribuição de origem, de caudas e de assimetrias.

## 8. Lei dos grandes números × teorema central do limite

Depois de entender os dois mecanismos, vale sintetizar:

| Ponto | Leis dos grandes números | Teorema central do limite |
|---|---|---|
| pergunta principal | a média se aproxima de quê? | como a média flutua ao redor do centro? |
| objeto típico | \(\bar X_n\) | média ou soma padronizada |
| resultado | \(\bar X_n\to\mu\) | forma limite normal padrão |
| tipo de convergência | probabilidade ou quase certa | distribuição |
| efeito principal | concentração | forma aproximada da distribuição |
| exige normalidade da população? | não, nas condições próprias | não, na forma clássica com variância finita |

Uma frase de recuperação:

> **lei dos grandes números = localização; teorema central do limite = forma da flutuação.**

## 9. Proporção amostral como média de indicadores

Uma proporção amostral cabe no mesmo mecanismo.

Defina \(I_i=1\) se a observação apresenta determinada característica e \(I_i=0\) caso contrário, com

\[
P(I_i=1)=p.
\]

A proporção amostral é

\[
\hat p=\frac{1}{n}\sum_{i=1}^{n}I_i.
\]

Como cada \(I_i\) é Bernoulli,

\[
E(\hat p)=p
\]

e

\[
\operatorname{Var}(\hat p)=\frac{p(1-p)}{n}.
\]

Assim, o erro padrão é

\[
\sqrt{\frac{p(1-p)}{n}}.
\]

Para amostras grandes, nas condições usuais da aproximação, o teorema central do limite conduz a uma distribuição aproximadamente normal para \(\hat p\).

Isso mostra que médias e proporções não são dois mundos separados: a proporção é uma média de variáveis indicadoras.

## 10. Distribuições amostrais exatas em população normal

A distribuição normal produz resultados exatos que reaparecem em inferência. Aqui o objetivo é reconhecer o mecanismo, não executar testes ou intervalos de confiança.

### 10.1 Média

Para amostra aleatória de uma população normal,

\[
\bar X
\sim
N\left(\mu,\frac{\sigma^2}{n}\right).
\]

### 10.2 Variância e qui-quadrado

Se a população é normal e

\[
S^2=\frac{1}{n-1}\sum_{i=1}^{n}(X_i-\bar X)^2,
\]

então

\[
\frac{(n-1)S^2}{\sigma^2}
\sim
\chi^2_{n-1}.
\]

O número \(n-1\) é o número de **graus de liberdade**: depois que a média amostral é determinada, os \(n\) desvios \(X_i-\bar X\) somam zero, deixando \(n-1\) componentes livres.

Além disso, para amostra normal,

\[
\bar X
\quad\text{e}\quad
S^2
\]

são independentes. Essa independência é especial da população normal e sustenta o resultado seguinte.

### 10.3 Distribuição t de Student

Quando \(\sigma\) é desconhecido e a população é normal,

\[
T
=
\frac{\bar X-\mu}{S/\sqrt n}
\sim
t_{n-1}.
\]

A distribuição t é simétrica, tem caudas mais pesadas que a normal padrão e se aproxima dela à medida que os graus de liberdade aumentam.

A troca de \(\sigma\) por \(S\) não é gratuita: ela introduz a variabilidade adicional capturada pela distribuição t.

### 10.4 Distribuição F

Se duas amostras normais são independentes, com tamanhos \(n_1\) e \(n_2\), então

\[
\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}
\sim
F_{n_1-1,n_2-1}.
\]

A distribuição F surge de uma razão entre variáveis qui-quadrado independentes, cada uma dividida por seus graus de liberdade.

Se \(\sigma_1^2=\sigma_2^2\), a razão acima se reduz a

\[
\frac{S_1^2}{S_2^2}.
\]

O uso dessas distribuições para estimação e testes fica em U054. Aqui basta saber **de qual estatística e de quais hipóteses cada distribuição amostral nasce**.

## 11. Um caso que conecta soma, lei dos grandes números e teorema central do limite

Considere, hipoteticamente, \(X_1,\ldots,X_n\) independentes com distribuição exponencial de média 2.

Então

\[
E(X_i)=2,
\qquad
\operatorname{Var}(X_i)=4.
\]

Para

\[
S_n=X_1+\cdots+X_n,
\]

temos

\[
E(S_n)=2n,
\qquad
\operatorname{Var}(S_n)=4n.
\]

Pela lei fraca,

\[
\frac{S_n}{n}\xrightarrow{P}2.
\]

Pelo teorema central do limite,

\[
\frac{S_n-2n}{2\sqrt n}
\xrightarrow{d}
N(0,1).
\]

E há ainda um resultado exato particular: como uma exponencial de média 2 coincide com uma qui-quadrado com 2 graus de liberdade, a soma \(S_n\) tem distribuição qui-quadrado com \(2n\) graus de liberdade.

O exemplo é útil porque separa três afirmações que parecem semelhantes, mas não são:

- a média \(S_n/n\) converge para 2;
- a soma padronizada converge em distribuição para a normal padrão;
- a soma não padronizada possui, neste caso específico, uma distribuição qui-quadrado exata para cada \(n\).

## 12. Pegadinhas de alto rendimento

1. **“A população fica normal quando \(n\) cresce.”** Não. O teorema trata da distribuição de uma estatística padronizada, não transforma a população.
2. **“A soma \(S_n\) converge para \(\mu\).”** Não. A lei dos grandes números trata de \(S_n/n=\bar X_n\).
3. **“O teorema central do limite diz que \(S_n\) converge para uma normal padrão.”** Falta centralizar e escalar.
4. **“Se \(n\ge30\), a aproximação normal é sempre boa.”** Não existe limiar universal.
5. **“O erro padrão da média é \(\sigma/n\).”** Não: é \(\sigma/\sqrt n\).
6. **“A média de amostra normal é apenas aproximadamente normal.”** Não: é exatamente normal.
7. **“A estatística t usa \(\sigma\) no denominador.”** Não: a forma clássica usa \(S\), pois \(\sigma\) é desconhecido.
8. **“Qui-quadrado e t surgem sem hipótese de normalidade em qualquer tamanho de amostra.”** Os resultados exatos apresentados nesta seção dependem da população normal.
9. **“Lei dos grandes números corrige sequências passadas.”** Não. Independência não cria memória ou compensação.

## 13. Fronteira com U054

Esta unidade entrega as distribuições e os limites que tornam a inferência possível.

A U054 começa no item 3 do edital e responde à pergunta seguinte: **como usar essas distribuições amostrais para estimar parâmetros, construir intervalos e testar hipóteses?**

Retenha o mecanismo:

> **amostra aleatória → estatística → distribuição amostral → concentração/normalização → inferência.**
