---
schemaVersion: 1
title: "Regressão linear e técnicas de amostragem"
description: "Regressão linear, mínimos quadrados, máxima verossimilhança, inferência, análise de variância, resíduos, planos de amostragem e tamanho amostral."
order: 55
storageId: pc-u055
---

# Regressão linear e técnicas de amostragem

Esta unidade fecha Estatística com duas perguntas práticas:

1. **como representar e avaliar uma relação linear entre variáveis?**
2. **como escolher observações de uma população de modo que a inferência tenha base probabilística e precisão planejada?**

O mapa é:

> **dados → modelo linear → ajuste → inferência → diagnóstico**  
> **população → plano amostral → seleção → estimador → precisão**

Regressão não substitui desenho amostral, e desenho amostral não corrige um modelo mal especificado. Cada parte controla uma fonte diferente de incerteza.

## 1. O modelo de regressão linear simples

Considere uma variável resposta \(Y\) e uma variável explicativa \(X\). O modelo linear simples é

\[
Y_i=\beta_0+\beta_1x_i+\varepsilon_i,
\]

em que:

- \(\beta_0\) é o intercepto;
- \(\beta_1\) é a inclinação;
- \(\varepsilon_i\) é o erro aleatório;
- \(x_i\) é o valor observado ou fixado da variável explicativa.

A média condicional da resposta é

\[
E(Y_i\mid x_i)=\beta_0+\beta_1x_i.
\]

A inclinação responde:

> **quanto a média de \(Y\) muda, no modelo, quando \(X\) aumenta uma unidade?**

Se \(\beta_1=-2\), o modelo associa um aumento de uma unidade em \(X\) a uma redução média de 2 unidades em \(Y\).

Isso é interpretação **associativa do modelo**. Regressão, por si só, não prova causalidade.

## 2. Erro verdadeiro e resíduo observado

O erro verdadeiro é

\[
\varepsilon_i
=
Y_i-E(Y_i\mid x_i).
\]

Ele depende da relação populacional desconhecida.

Depois de estimar a reta,

\[
\hat Y_i=b_0+b_1x_i,
\]

calculamos o **resíduo**:

\[
e_i=y_i-\hat y_i.
\]

O resíduo é a diferença entre o valor observado e o valor previsto pelo modelo ajustado. Ele serve como aproximação observável do comportamento dos erros e é central no diagnóstico do modelo.

## 3. Mínimos quadrados: escolher a reta que reduz os erros ao quadrado

O critério de mínimos quadrados escolhe \(b_0\) e \(b_1\) para minimizar

\[
\sum_{i=1}^{n}e_i^2
=
\sum_{i=1}^{n}(y_i-b_0-b_1x_i)^2.
\]

Ele **minimiza**, não maximiza, a soma dos quadrados dos resíduos.

No modelo simples com intercepto,

\[
b_1
=
\frac{\sum (x_i-\bar x)(y_i-\bar y)}
{\sum (x_i-\bar x)^2},
\]

e

\[
b_0=\bar y-b_1\bar x.
\]

A reta de mínimos quadrados passa pelo ponto

\[
(\bar x,\bar y).
\]

### Exemplo hipotético

Suponha que um modelo ajustado seja

\[
\hat y=10-0{,}5x.
\]

Para \(x=8\),

\[
\hat y=10-0{,}5(8)=6.
\]

Se o valor observado for \(y=6{,}7\), o resíduo é

\[
e=6{,}7-6=0{,}7.
\]

Resíduo positivo significa que o observado ficou acima da previsão.

## 4. Máxima verossimilhança no modelo normal

A máxima verossimilhança reaparece agora dentro do modelo de regressão.

Se os erros são independentes e

\[
\varepsilon_i\sim N(0,\sigma^2)
\]

com variância comum, a verossimilhança é proporcional a

\[
(\sigma^2)^{-n/2}
\exp\left[
-\frac{1}{2\sigma^2}
\sum e_i^2
\right].
\]

Para \(\sigma^2\) fixada, maximizar essa verossimilhança em relação aos coeficientes equivale a **minimizar a soma dos quadrados dos resíduos**.

Assim, sob erros normais independentes com variância constante:

> **mínimos quadrados e máxima verossimilhança produzem os mesmos estimadores dos coeficientes da regressão.**

Isso não significa que os critérios sejam conceitualmente idênticos em qualquer modelo. A equivalência decorre da estrutura normal adotada.

## 5. Modelo de regressão linear múltipla

Quando há várias variáveis explicativas,

\[
Y
=
\beta_0+\beta_1X_1+\cdots+\beta_kX_k+\varepsilon.
\]

A interpretação de \(\beta_j\) muda:

> \(\beta_j\) representa a variação média em \(Y\) associada ao aumento de uma unidade em \(X_j\), **mantidas constantes as demais variáveis explicativas do modelo**.

Esse “mantidas constantes” é essencial. Sem ele, a interpretação de um coeficiente múltiplo fica incompleta.

O modelo continua sendo chamado linear porque é linear **nos parâmetros** \(\beta_0,\ldots,\beta_k\). Uma variável explicativa pode aparecer transformada, como \(X^2\), sem retirar a linearidade nos coeficientes.

## 6. Hipóteses usuais do modelo linear

Para construir inferência clássica, o modelo costuma assumir:

1. média condicional correta:
   \[
   E(\varepsilon_i\mid X)=0;
   \]
2. variância constante dos erros — **homocedasticidade**:
   \[
   \operatorname{Var}(\varepsilon_i\mid X)=\sigma^2;
   \]
3. erros independentes ou, conforme o desenho, não correlacionados;
4. normalidade dos erros para resultados exatos de pequenas amostras em testes e intervalos clássicos;
5. ausência de combinação linear perfeita entre explicativas no modelo múltiplo.

A normalidade não é o que define a reta de mínimos quadrados. Ela é especialmente importante para a forma exata da inferência clássica em pequenas amostras.

## 7. Inferência sobre os coeficientes

Depois de estimar um coeficiente \(b_j\), precisamos medir sua incerteza.

Um teste individual típico é

\[
H_0:\beta_j=0
\]

contra uma alternativa apropriada.

A estatística tem a forma

\[
t
=
\frac{b_j-0}{SE(b_j)},
\]

em que \(SE(b_j)\) é o erro padrão do coeficiente.

No modelo simples com intercepto e hipóteses clássicas, o teste da inclinação usa \(n-2\) graus de liberdade.

Um intervalo de confiança correspondente tem forma

\[
b_j
\pm
t_{\text{crítico}}\,SE(b_j).
\]

Se o intervalo para \(\beta_1\) não contém zero, isso corresponde, no procedimento bilateral compatível, à rejeição de \(H_0:\beta_1=0\) no nível associado.

## 8. Análise de variância da regressão

A variação total da resposta em torno de sua média pode ser decomposta em:

\[
\sum (y_i-\bar y)^2
=
\sum (\hat y_i-\bar y)^2
+
\sum (y_i-\hat y_i)^2.
\]

Em palavras:

> **variação total = variação explicada pela regressão + variação residual.**

No modelo linear simples com intercepto:

- graus de liberdade total: \(n-1\);
- regressão: \(1\);
- erro: \(n-2\).

O quadrado médio do erro é

\[
MSE
=
\frac{\sum e_i^2}{n-2}.
\]

A estatística de teste global é

\[
F
=
\frac{MS_{\text{regressão}}}{MSE}.
\]

No modelo simples, o teste \(F\) global para existência de relação linear é equivalente ao teste \(t\) bilateral da inclinação:

\[
F=t^2.
\]

No modelo múltiplo, o teste global costuma confrontar

\[
H_0:\beta_1=\cdots=\beta_k=0
\]

contra a alternativa de que pelo menos um coeficiente angular é diferente de zero.

## 9. Coeficiente de determinação

O coeficiente de determinação é

\[
R^2
=
1-
\frac{\sum e_i^2}
{\sum (y_i-\bar y)^2}.
\]

Com intercepto, ele mede a fração da variação amostral de \(Y\) contabilizada pelo modelo linear ajustado.

Se

\[
R^2=0{,}80,
\]

o ajuste contabiliza 80% da variação observada de \(Y\) em torno de sua média, no conjunto usado.

Isso **não** significa automaticamente:

- causalidade;
- boa previsão fora da faixa observada;
- ausência de viés;
- modelo corretamente especificado.

Um \(R^2\) alto pode coexistir com resíduos problemáticos.

## 10. Resíduos: o diagnóstico vem depois do ajuste

Um bom ajuste numérico não basta. Precisamos perguntar se os resíduos são compatíveis com as hipóteses do modelo.

### 10.1 O que esperamos

Em um gráfico de resíduos contra valores ajustados ou contra uma explicativa, buscamos, em linhas gerais:

- pontos espalhados em torno de zero;
- ausência de curva sistemática;
- dispersão aproximadamente constante;
- ausência de padrões de dependência;
- poucos pontos extremos ou excessivamente influentes.

### 10.2 Curvatura

Se os resíduos desenham uma curva, a relação média pode não ser adequadamente linear.

A questão não é “a nuvem está em torno da reta estimada”. No gráfico de resíduos, a referência é **zero**.

### 10.3 Forma de funil

Se a dispersão dos resíduos aumenta ou diminui com o nível ajustado, há indício de **variância não constante**, também chamada heterocedasticidade.

Isso viola a hipótese de variância comum e pode comprometer erros padrão e testes usuais.

### 10.4 Dependência

Sequências longas de resíduos positivos e negativos, ciclos ou padrões ordenados no tempo podem indicar dependência entre erros.

### 10.5 Normalidade

Um gráfico de quantis normais ou outros diagnósticos podem avaliar se a distribuição dos resíduos é compatível com a normalidade necessária a certos procedimentos inferenciais.

## 11. Média prevista e observação nova não têm a mesma incerteza

Para um valor \(x_0\), há duas perguntas:

1. qual é a **média da resposta** quando \(X=x_0\)?
2. qual será uma **nova observação individual** de \(Y\) quando \(X=x_0\)?

O intervalo de previsão para uma nova observação é mais largo que o intervalo de confiança para a resposta média no mesmo \(x_0\), porque inclui:

- incerteza na posição da reta;
- variabilidade individual ao redor da reta.

## 12. Da modelagem para o desenho amostral

Até aqui, tratamos do que fazer **depois que os dados existem**.

Agora a pergunta é anterior:

> **como selecionar os elementos que formarão a amostra?**

Um plano probabilístico dá a cada unidade uma regra conhecida de seleção e permite conectar a amostra à população-alvo.

Os quatro planos do edital têm mecanismos diferentes.

## 13. Amostragem aleatória simples

Na amostragem aleatória simples sem reposição, uma amostra de tamanho \(n\) é selecionada de uma população de tamanho \(N\) de modo que as amostras possíveis de mesmo tamanho tenham a mesma probabilidade.

Isso implica probabilidades de inclusão iguais para os elementos.

Exemplo hipotético: numerar \(N=2.000\) registros e sortear aleatoriamente \(n=200\) números distintos.

Vantagens:

- mecanismo simples;
- estimadores diretos;
- boa referência para comparação com outros planos.

Limitações:

- exige uma lista adequada dos elementos;
- pode ser cara quando a população está geograficamente dispersa;
- ignora informação auxiliar que poderia aumentar precisão.

## 14. Amostragem estratificada

Primeiro dividimos a população em **estratos**: grupos que não se sobrepõem e que, juntos, cobrem a população.

Depois selecionamos uma amostra dentro de **cada** estrato.

Exemplo hipotético: separar servidores por região e sortear pessoas em todas as regiões.

Se \(N_h\) é o tamanho do estrato \(h\) e \(N\) é o total, o peso populacional do estrato é

\[
W_h=\frac{N_h}{N}.
\]

Uma média estratificada pode ser estimada por

\[
\bar y_{st}
=
\sum_h W_h\bar y_h.
\]

### Alocação proporcional

Se o tamanho total da amostra é \(n\), uma escolha simples é

\[
n_h
=
n\frac{N_h}{N}.
\]

A estratificação tende a ajudar quando os estratos são internamente homogêneos para a variável de interesse e diferem entre si. Ela não é automaticamente superior se a variável usada para formar os estratos pouco se relaciona com o que se pretende medir.

## 15. Amostragem sistemática

Ordene as unidades, escolha um início aleatório e depois selecione unidades em intervalos regulares.

Se a razão de amostragem é aproximadamente \(1/k\), uma amostra pode ser formada por:

\[
r,\ r+k,\ r+2k,\ldots
\]

com início aleatório \(r\) entre \(1\) e \(k\).

Exemplo: sortear um número de 1 a 10 e, a partir dele, selecionar cada décima unidade.

Vantagem: simplicidade operacional.

Risco: se a ordenação da população tiver uma periodicidade alinhada com \(k\), o plano pode produzir uma amostra ruim.

Amostragem sistemática não significa “pegar os primeiros \(n\)” nem “selecionar qualquer sequência regular sem início aleatório”.

## 16. Amostragem por conglomerados

Agora a população é dividida em **conglomerados**, que são grupos naturais de unidades: quarteirões, escolas, equipes, domicílios por setor, por exemplo.

Selecionamos alguns conglomerados e observamos:

- todas as unidades dentro deles, em um desenho de um estágio; ou
- uma subamostra dentro dos conglomerados selecionados, em desenho de múltiplos estágios.

A lógica é diferente da estratificação:

| Estratificada | Por conglomerados |
|---|---|
| amostra unidades em **todos** os estratos | seleciona **alguns** conglomerados |
| quer garantir representação dos estratos | quer reduzir custo/logística |
| estratos bons tendem a ser internamente homogêneos | conglomerados úteis costumam reunir unidades próximas e podem ser internamente parecidas |

Se unidades dentro do mesmo conglomerado são muito semelhantes, a informação adicional de observar várias delas pode ser menor que na amostragem aleatória simples. Por isso, conglomerados podem aumentar a variância para o mesmo número de elementos, embora reduzam custo.

Não é correto afirmar que o tamanho necessário **sempre** será maior: isso depende da correlação dentro dos conglomerados, do estimador, do custo e do critério de precisão.

## 17. Estratificada × conglomerados: a distinção que mais cai

Use a pergunta:

> **eu seleciono elementos em todos os grupos ou seleciono só alguns grupos?**

- em **estratificação**, seleciono elementos em todos os estratos;
- em **conglomerados**, seleciono alguns conglomerados.

Um plano pode combinar as duas ideias em estágios diferentes, mas a distinção conceitual permanece.

## 18. Tamanho amostral: precisão planejada

Não existe um tamanho amostral universal.

Ele depende de:

- nível de confiança;
- margem de erro desejada;
- variabilidade da população;
- parâmetro de interesse;
- plano amostral;
- tamanho da população quando a correção finita é relevante;
- perdas, não resposta e restrições de custo.

## 19. Tamanho para estimar uma média

Em uma amostragem aleatória simples de população grande, se o desvio padrão populacional \(\sigma\) é conhecido ou planejado e queremos margem de erro \(e\) para um intervalo normal bilateral de nível \(1-\alpha\),

\[
n_0
=
\left(
\frac{z_{1-\alpha/2}\sigma}{e}
\right)^2.
\]

O resultado é arredondado **para cima**.

Relações:

- confiança maior → \(z\) maior → \(n\) maior;
- variabilidade maior → \(n\) maior;
- margem de erro menor → \(n\) cresce com \(1/e^2\).

Reduzir a margem de erro pela metade, mantendo o resto fixo, multiplica aproximadamente \(n\) por 4.

## 20. Tamanho para estimar uma proporção

Para população grande, a aproximação usual é

\[
n_0
=
\frac{
z_{1-\alpha/2}^2
p^\*(1-p^\*)
}{e^2},
\]

em que \(p^\*\) é uma estimativa de planejamento para a proporção.

Se não há informação prévia, usa-se frequentemente

\[
p^\*=0{,}5,
\]

porque o produto

\[
p(1-p)
\]

é máximo em \(0{,}5\).

Assim, essa escolha é conservadora em relação à variabilidade da proporção.

### Exemplo hipotético

Para 95% de confiança, \(z=1{,}96\), \(e=0{,}05\) e \(p^\*=0{,}5\):

\[
n_0
=
\frac{1{,}96^2(0{,}5)(0{,}5)}{0{,}05^2}
\approx
384{,}16.
\]

Arredondamos para

\[
n=385.
\]

## 21. Correção para população finita

Quando a população tem tamanho finito \(N\) e a amostragem é sem reposição, uma forma usual de ajustar o tamanho calculado \(n_0\) é

\[
n
=
\frac{Nn_0}
{N-1+n_0}.
\]

O ajuste reduz o tamanho necessário quando a fração amostral é relevante.

A mesma ideia aparece na variância da média sob amostragem aleatória simples sem reposição por meio do fator

\[
1-\frac{n}{N}.
\]

Em populações muito grandes comparadas à amostra, a correção é pequena.

## 22. Planos complexos mudam a conta

As fórmulas simples das seções anteriores são referências para planejamento sob amostragem aleatória simples.

Em planos estratificados, sistemáticos, por conglomerados ou em múltiplos estágios, a precisão depende da estrutura do plano.

Um **efeito do plano amostral** pode ser pensado como a razão entre:

\[
\operatorname{Var}(\text{estimador no plano real})
\]

e

\[
\operatorname{Var}(\text{estimador sob amostragem aleatória simples comparável}).
\]

Se o plano aumenta a variância, pode ser necessário aumentar \(n\) para manter a mesma precisão. Se a estratificação for informativa, o plano pode reduzir a variância.

Por isso, não transforme frases como “conglomerados exigem amostra maior” em regra universal.

## 23. Pegadinhas de alto rendimento

### Regressão

1. **Mínimos quadrados maximiza a soma dos quadrados.** Não: minimiza.
2. **Inclinação prova causalidade.** Não.
3. **No modelo múltiplo, \(\beta_j\) ignora as demais explicativas.** Não: sua interpretação é condicional a mantê-las constantes.
4. **\(R^2\) alto prova modelo correto.** Não.
5. **Resíduo é o erro verdadeiro.** Não: é sua contraparte observável após o ajuste.
6. **Gráfico de resíduos deve se alinhar à reta \(\hat y=b_0+b_1x\).** Não: resíduos devem oscilar em torno de zero.
7. **Forma de funil é compatível com variância constante.** Não.
8. **Intervalo de previsão para nova observação é mais estreito que o intervalo da média.** Em geral, não; ele é mais largo.

### Amostragem

9. **Estratificada seleciona apenas alguns estratos.** Não: amostra dentro de todos os estratos planejados.
10. **Conglomerados e estratos são sinônimos.** Não.
11. **Sistemática dispensa início aleatório.** Não.
12. **Amostra aleatória simples é “qualquer amostra feita ao acaso”.** Não: há um mecanismo probabilístico específico.
13. **Sem informação sobre \(p\), não dá para planejar tamanho para proporção.** Dá: \(p^\*=0{,}5\) fornece planejamento conservador.
14. **Dobrar a precisão significa dobrar \(n\).** Se “dobrar a precisão” significar reduzir a margem pela metade, o tamanho cresce aproximadamente quatro vezes.
15. **Conglomerados sempre exigem amostra maior.** Não: depende do plano e da estrutura de correlação/custo.

## 24. Fechamento do bloco de Estatística

U050–U055 constroem uma sequência única:

> **descrever dados → modelar probabilidade → estudar variáveis aleatórias → entender distribuições amostrais → inferir parâmetros → modelar relações e planejar amostras**

Em U055, a pergunta final é dupla:

- **o modelo linear descreve adequadamente a relação observada?**
- **a amostra foi selecionada e dimensionada de modo compatível com a inferência pretendida?**

Essas duas perguntas evitam dois erros comuns: confiar em um modelo sem diagnóstico e confiar em uma amostra sem desenho.
