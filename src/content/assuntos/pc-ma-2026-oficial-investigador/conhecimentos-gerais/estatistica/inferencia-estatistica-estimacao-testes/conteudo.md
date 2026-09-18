---
schemaVersion: 1
title: "Inferência estatística: estimação e testes"
description: "Estimação pontual e intervalar, propriedades e suficiência de estimadores, intervalos de confiança e credibilidade e testes de hipóteses t e qui-quadrado."
order: 54
storageId: pc-u054
---

# Inferência estatística: estimação e testes

Na U053, aprendemos que uma estatística muda de amostra para amostra e, por isso, tem uma **distribuição amostral**. Agora essa variabilidade vira ferramenta.

A pergunta central é:

> **como usar uma amostra para aprender algo sobre um parâmetro desconhecido sem confundir evidência com certeza?**

O fluxo desta unidade é:

> **parâmetro desconhecido → estatística da amostra → estimador → incerteza → intervalo ou teste → conclusão limitada pela evidência**

O edital reúne três frentes:

1. **estimação pontual** — escolher um único valor para representar o parâmetro;
2. **estimação intervalar** — construir uma faixa compatível com a incerteza;
3. **teste de hipóteses** — confrontar uma afirmação sobre o parâmetro com os dados.

Regressão linear e técnicas de amostragem possuem itens próprios no edital e permanecem para U055.

## 1. Parâmetro, estimador e estimativa: três papéis diferentes

Um **parâmetro** é uma característica da população ou do modelo probabilístico, como:

\[
\mu,\qquad \sigma^2,\qquad p,\qquad \theta.
\]

Ele é desconhecido no problema de inferência.

Um **estimador** é uma estatística usada para aprender sobre esse parâmetro. Antes de observar os dados, é variável aleatória. Por exemplo,

\[
\bar X=\frac{1}{n}\sum_{i=1}^n X_i
\]

pode ser estimador de \(\mu\).

Depois que a amostra produz valores \(x_1,\ldots,x_n\), o número calculado,

\[
\bar x=\frac{1}{n}\sum_{i=1}^n x_i,
\]

é a **estimativa** observada.

Retenha:

> **parâmetro = alvo; estimador = regra aleatória; estimativa = valor obtido.**

## 2. O que torna um estimador desejável?

Não basta produzir um número. Queremos entender como a regra se comporta se o experimento de amostragem fosse repetido.

### 2.1 Viés

Se \(T\) estima \(\theta\), seu viés é

\[
\operatorname{Bias}(T)
=
E(T)-\theta.
\]

O estimador é **não viesado** ou **centrado** quando

\[
E(T)=\theta.
\]

Não viesado não significa que cada estimativa será igual ao parâmetro. Significa que, sob repetição, o centro da distribuição de \(T\) coincide com \(\theta\).

### 2.2 Variância e eficiência

Entre estimadores comparáveis e não viesados para o mesmo parâmetro, menor variância significa maior concentração em torno do alvo.

Em uma comparação restrita a uma classe de estimadores, chamamos de **mais eficiente** aquele que alcança menor variância, quando as condições da comparação são satisfeitas.

A palavra “eficiente” não autoriza comparar regras que estimam parâmetros diferentes ou ignorar viés sem explicar o critério.

### 2.3 Erro quadrático médio

O **erro quadrático médio** combina dispersão e viés:

\[
E[(T-\theta)^2]
=
\operatorname{Var}(T)
+
[\operatorname{Bias}(T)]^2.
\]

Isso permite comparar um estimador pouco viesado e muito estável com outro não viesado, porém muito disperso.

### 2.4 Consistência

Uma sequência de estimadores \(T_n\) é consistente para \(\theta\) quando

\[
T_n\xrightarrow{P}\theta
\qquad\text{quando }n\to\infty.
\]

Ou seja: com o crescimento da amostra, a regra tende a se concentrar arbitrariamente perto do parâmetro.

**Não confunda:**

- não viés é uma propriedade de \(E(T_n)\);
- consistência é um comportamento assintótico;
- um estimador pode ser viesado em amostras finitas e ainda assim ser consistente.

## 3. Método dos momentos: igualar comportamento teórico e amostral

Os momentos da U052 reaparecem como método de estimação.

Se um modelo possui parâmetro \(\theta\) e

\[
E_\theta(X)=m_1(\theta),
\]

podemos igualar o primeiro momento teórico ao primeiro momento amostral:

\[
m_1(\theta)
=
\frac{1}{n}\sum_{i=1}^n X_i.
\]

Com vários parâmetros, igualamos tantos momentos quanto forem necessários.

### Exemplo hipotético

Se \(X\) é exponencial com média \(\theta\), então

\[
E(X)=\theta.
\]

Igualando o momento teórico à média amostral,

\[
\hat\theta_{\text{momentos}}
=
\bar X.
\]

O princípio é:

> **momento teórico = momento amostral → resolver para o parâmetro.**

O método dos momentos não é definido por minimizar soma de quadrados. Esse é outro critério de estimação, tratado de modo próprio no item de regressão.

## 4. Máxima verossimilhança: qual parâmetro torna os dados observados mais compatíveis com o modelo?

Suponha uma amostra independente \(x_1,\ldots,x_n\) de uma distribuição com função \(f(x;\theta)\).

A **função de verossimilhança** trata os dados observados como fixos e o parâmetro como argumento:

\[
L(\theta)
=
\prod_{i=1}^{n} f(x_i;\theta),
\]

no caso independente.

O estimador de máxima verossimilhança escolhe o valor de \(\theta\) que maximiza \(L(\theta)\).

Na prática, costuma-se trabalhar com a log-verossimilhança,

\[
\ell(\theta)=\log L(\theta),
\]

porque produtos se transformam em somas e o ponto de máximo é preservado quando o logaritmo é crescente.

### Exemplo hipotético: Bernoulli

Se \(X_i\in\{0,1\}\) e

\[
P(X_i=1)=p,
\]

então

\[
L(p)
=
p^{\sum x_i}(1-p)^{n-\sum x_i}.
\]

A maximização conduz a

\[
\hat p
=
\frac{1}{n}\sum x_i.
\]

Aqui a proporção amostral surge como estimador de máxima verossimilhança.

**Pegadinha:** máxima verossimilhança maximiza uma função do parâmetro para os dados observados; não é o mesmo que declarar “qual é a probabilidade de o parâmetro ser verdadeiro” em uma análise <abbr title="abordagem em que o parâmetro é fixo e a aleatoriedade vem da amostra">frequentista</abbr>.

## 5. Suficiência: resumir sem perder informação sobre o parâmetro

Uma estatística \(T(X_1,\ldots,X_n)\) é **suficiente** para \(\theta\) quando, conhecido \(T\), o restante da amostra não acrescenta informação sobre \(\theta\) no sentido probabilístico da definição.

Uma forma operacional poderosa é o **teorema da fatoração**. Se a função conjunta da amostra puder ser escrita como

\[
f(x_1,\ldots,x_n;\theta)
=
g(T(x_1,\ldots,x_n),\theta)\,
h(x_1,\ldots,x_n),
\]

em que \(h\) não depende de \(\theta\), então \(T\) é suficiente para \(\theta\).

### Exemplo: amostra de Poisson

Se \(X_1,\ldots,X_n\) são independentes e

\[
X_i\sim\operatorname{Poisson}(\theta),
\]

a função conjunta é proporcional, em relação a \(\theta\), a

\[
e^{-n\theta}\theta^{\sum x_i}.
\]

Toda a dependência dos dados em relação a \(\theta\) ocorre por

\[
T=\sum_{i=1}^{n}X_i.
\]

Logo, a soma é estatística suficiente para \(\theta\).

Uma soma que omite parte da amostra, como \(X_1+X_2\) quando há \(X_3\), em geral não carrega toda essa informação.

## 6. Estimação intervalar: reconhecer a incerteza em vez de escondê-la

Uma estimativa pontual não mostra quão incerta é a informação.

Um intervalo acrescenta duas peças:

- um centro, geralmente ligado a um estimador;
- uma margem associada à variabilidade amostral e ao nível adotado.

A forma típica de muitos intervalos é

\[
\text{estimativa}
\pm
\text{quantil}
\times
\text{erro padrão}.
\]

A distribuição usada depende do problema e das hipóteses.

## 7. Intervalo de confiança: a probabilidade pertence ao procedimento

Considere, por exemplo, uma população normal com média \(\mu\) e desvio padrão populacional conhecido \(\sigma\).

Um intervalo de confiança bilateral de nível \(1-\alpha\) para \(\mu\) é

\[
\bar X
\pm
z_{1-\alpha/2}
\frac{\sigma}{\sqrt n}.
\]

O ponto conceitual mais importante é a interpretação frequentista.

Antes de observar a amostra, os limites do intervalo são aleatórios. O procedimento é construído para que, sob repetição, uma fração \(1-\alpha\) dos intervalos produzidos cubra o parâmetro verdadeiro.

Depois que um intervalo específico foi calculado, \(\mu\) é tratado como constante. Portanto, na interpretação frequentista usual, não se diz que “há 95% de probabilidade de \(\mu\) estar neste intervalo já observado”.

### O que alarga ou estreita o intervalo?

Mantidas as demais condições:

- maior nível de confiança → quantil maior → intervalo mais largo;
- amostra maior → erro padrão menor → intervalo mais estreito;
- maior dispersão → intervalo mais largo.

## 8. Média com variância desconhecida: a distribuição t entra na estimativa intervalar

Se a população é normal, \(\sigma\) é desconhecido e usamos o desvio padrão amostral \(S\), então

\[
T
=
\frac{\bar X-\mu}{S/\sqrt n}
\sim
t_{n-1}.
\]

Assim, o intervalo bilateral para \(\mu\) é

\[
\bar X
\pm
t_{1-\alpha/2,n-1}
\frac{S}{\sqrt n}.
\]

Em amostras pequenas, as caudas mais pesadas da distribuição t refletem a incerteza adicional introduzida pela estimação de \(\sigma\).

À medida que os graus de liberdade crescem, a t se aproxima da normal padrão.

## 9. Intervalo de credibilidade: a probabilidade pertence ao parâmetro no modelo bayesiano

A estimação <abbr title="abordagem que combina informação prévia e dados para obter uma distribuição posterior">bayesiana</abbr> muda a estrutura probabilística.

Começamos com:

1. uma distribuição **<abbr title="distribuição do parâmetro antes de incorporar os dados atuais">a priori</abbr>** para o parâmetro;
2. uma verossimilhança para os dados;
3. a regra de Bayes para obter a distribuição **<abbr title="distribuição do parâmetro após combinar informação prévia e dados">a posteriori</abbr>**.

Em forma proporcional,

\[
\pi(\theta\mid x)
\propto
L(\theta\mid x)\pi(\theta).
\]

Um intervalo de credibilidade de \(95\%\) é construído para conter \(95\%\) da probabilidade **a posteriori** atribuída a \(\theta\), conforme o critério escolhido para o intervalo.

Por isso, no modelo bayesiano, faz sentido afirmar uma probabilidade posterior sobre o parâmetro.

### Confiança × credibilidade

| Aspecto | Intervalo de confiança | Intervalo de credibilidade |
|---|---|---|
| paradigma | frequentista | bayesiano |
| parâmetro | fixo e desconhecido | tratado probabilisticamente |
| aleatoriedade central | procedimento/amostra | distribuição posterior do parâmetro |
| interpretação de 95% | cobertura de longo prazo do procedimento | 95% de probabilidade posterior no intervalo |
| usa distribuição a priori? | não | sim |

Dois intervalos podem ter os mesmos números em algum caso particular e ainda assim ter interpretações diferentes.

## 10. Teste de hipóteses: medir a incompatibilidade dos dados com uma afirmação de referência

Um teste começa com duas afirmações:

- \(H_0\): hipótese nula;
- \(H_1\) ou \(H_A\): hipótese alternativa.

O procedimento escolhe uma estatística cujo comportamento sob \(H_0\) seja conhecido ou aproximável.

A lógica é:

> **se \(H_0\) fosse verdadeira, quão extremo seria observar evidência como a obtida?**

Se os dados caem em uma região considerada suficientemente incompatível com \(H_0\), rejeitamos \(H_0\).

Se não, **não rejeitamos** \(H_0\).

Não rejeitar não equivale a provar que \(H_0\) é verdadeira.

## 11. Hipótese simples e hipótese composta

Uma hipótese é **simples** quando especifica completamente a distribuição relevante.

Exemplo, em um modelo normal com variância conhecida:

\[
H_0:\mu=10
\]

é simples em relação ao parâmetro \(\mu\).

Uma hipótese é **composta** quando contém vários valores possíveis.

Por exemplo,

\[
H_1:\mu>10
\]

é composta, pois inclui infinitos valores de \(\mu\).

A distinção importa porque probabilidades de erro e potência podem depender de qual valor da hipótese composta é o verdadeiro.

## 12. Erros do teste, significância e potência

Há duas formas clássicas de errar:

### Erro do tipo I

Rejeitar \(H_0\) quando \(H_0\) é verdadeira.

O nível de significância \(\alpha\) controla a probabilidade desse erro no desenho do teste:

\[
\alpha
=
P(\text{rejeitar }H_0\mid H_0\text{ verdadeira}),
\]

na situação simples ou na formulação correspondente do teste.

### Erro do tipo II

Não rejeitar \(H_0\) quando a alternativa relevante é verdadeira.

Denotamos essa probabilidade por

\[
\beta.
\]

### Potência

A potência é a probabilidade de rejeitar \(H_0\) quando o valor alternativo considerado é verdadeiro:

\[
\text{potência}
=
1-\beta.
\]

Logo:

- potência alta = boa capacidade de detectar uma diferença real;
- potência não é a probabilidade de “não rejeitar uma nula falsa”.

Em geral, para um efeito fixo e demais condições comparáveis, aumentar o tamanho da amostra tende a aumentar a potência.

## 13. Valor-p: evidência contra a nula, não probabilidade da nula

O **valor-p** é calculado supondo \(H_0\) e mede quão extremo é o resultado observado, ou mais extremo, segundo a estatística escolhida.

Uma formulação operacional:

\[
p\le\alpha
\quad\Rightarrow\quad
\text{rejeitar }H_0.
\]

Se

\[
p>\alpha,
\]

não rejeitamos \(H_0\).

Pegadinhas:

- valor-p não é \(P(H_0\text{ verdadeira}\mid \text{dados})\);
- valor-p pequeno não mede, sozinho, o tamanho ou a importância prática do efeito;
- valor-p grande não prova ausência de efeito.

## 14. Teste t de Student para uma média

Suponha uma amostra aleatória de população normal, com média desconhecida \(\mu\) e variância desconhecida.

Para testar

\[
H_0:\mu=\mu_0,
\]

usamos

\[
T
=
\frac{\bar X-\mu_0}{S/\sqrt n}.
\]

Sob \(H_0\),

\[
T\sim t_{n-1}.
\]

A alternativa define a cauda:

- \(H_1:\mu<\mu_0\) → cauda esquerda;
- \(H_1:\mu>\mu_0\) → cauda direita;
- \(H_1:\mu\neq\mu_0\) → duas caudas.

### Exemplo hipotético

Uma amostra de tamanho \(n=25\) tem

\[
\bar x=52,\qquad s=10.
\]

Queremos testar

\[
H_0:\mu=50
\]

contra

\[
H_1:\mu>50.
\]

A estatística é

\[
t
=
\frac{52-50}{10/\sqrt{25}}
=
1.
\]

A decisão exige comparar esse valor com a distribuição \(t_{24}\) no nível de significância escolhido ou calcular o valor-p.

A fórmula produz a evidência; o nível e a alternativa determinam a regra de decisão.

## 15. Teste qui-quadrado para independência

Duas variáveis categóricas podem ser organizadas em uma tabela de contingência.

A hipótese nula é:

\[
H_0:\text{as variáveis são independentes}.
\]

Sob independência, a frequência esperada da célula \((i,j)\) é

\[
E_{ij}
=
\frac{(\text{total da linha }i)(\text{total da coluna }j)}
{\text{total geral}}.
\]

A estatística é

\[
\chi^2
=
\sum_{i,j}
\frac{(O_{ij}-E_{ij})^2}{E_{ij}},
\]

em que \(O_{ij}\) é a frequência observada.

Com \(r\) linhas e \(c\) colunas, os graus de liberdade são

\[
(r-1)(c-1).
\]

Valores grandes de \(\chi^2\) indicam maior discrepância entre observado e esperado sob independência.

Se a estatística observada fica abaixo do valor crítico da cauda direita, não rejeitamos \(H_0\).

## 16. Outros usos do qui-quadrado dentro do mesmo mecanismo

O nome “teste qui-quadrado” pode aparecer em diferentes problemas.

### Aderência

Compara frequências observadas com frequências esperadas por um modelo categórico:

\[
\chi^2
=
\sum
\frac{(O_i-E_i)^2}{E_i}.
\]

Os graus de liberdade dependem do número de categorias e de parâmetros estimados a partir dos dados.

### Variância de uma população normal

Se a população é normal, para testar uma hipótese sobre \(\sigma^2\), pode-se usar

\[
\chi^2
=
\frac{(n-1)S^2}{\sigma_0^2},
\]

que, sob a hipótese nula apropriada, segue uma distribuição qui-quadrado com \(n-1\) graus de liberdade.

O contexto da questão determina qual estatística qui-quadrado é pertinente.

## 17. Como intervalos e testes se conectam

Para muitos procedimentos bilaterais construídos pela mesma distribuição e pelo mesmo nível:

- se o valor postulado por \(H_0\) fica **fora** do intervalo de confiança de nível \(1-\alpha\), o teste bilateral no nível \(\alpha\) rejeita \(H_0\);
- se fica **dentro**, o teste correspondente não rejeita.

A equivalência depende de usar procedimentos compatíveis. Não é uma regra para misturar qualquer intervalo com qualquer teste.

## 18. Pegadinhas de alto rendimento

1. **Estimador = estimativa.** Não: o primeiro é uma regra aleatória; a segunda é o valor observado.
2. **Não viesado = sempre correto.** Não: é uma propriedade de esperança.
3. **Consistente = não viesado em todo \(n\).** Não: consistência é assintótica.
4. **Método dos momentos minimiza soma de quadrados.** Não: iguala momentos amostrais e teóricos.
5. **Verossimilhança é probabilidade posterior do parâmetro.** Não no paradigma frequentista.
6. **Intervalo de confiança de 95% dá 95% de probabilidade ao parâmetro fixo depois de observado o intervalo.** Não na interpretação frequentista.
7. **Intervalo de credibilidade tem a mesma interpretação do intervalo de confiança.** Não.
8. **\(\alpha\) é a probabilidade de erro do tipo II.** Não: controla erro do tipo I.
9. **Potência = \(\beta\).** Não: potência \(=1-\beta\).
10. **Não rejeitar \(H_0\) significa aceitá-la como verdadeira.** Não.
11. **Valor-p é a probabilidade de \(H_0\) ser verdadeira.** Não.
12. **Teste t de uma média com \(\sigma\) desconhecido usa \(\sigma/\sqrt n\).** Na forma clássica, usa \(S/\sqrt n\).
13. **Qui-quadrado de independência mede diferença entre médias.** Não: compara frequências observadas e esperadas.

## 19. Fronteira com U055

U054 encerra o item 3 do edital.

U055 tratará os itens 4 e 5: regressão linear, mínimos quadrados e máxima verossimilhança no contexto do modelo de regressão, análise de variância, resíduos, técnicas de amostragem e tamanho amostral.

Retenha a sequência:

> **estimar um parâmetro → quantificar incerteza → formular hipótese → medir evidência → decidir sem ultrapassar o que os dados sustentam.**
