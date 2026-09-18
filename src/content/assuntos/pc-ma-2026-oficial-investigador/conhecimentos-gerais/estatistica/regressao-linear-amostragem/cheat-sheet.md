# Regressão linear e amostragem — revisão rápida

## Mapa

**regressão:** relação → ajuste → inferência → resíduos  
**amostragem:** população → plano → seleção → precisão

## Regressão linear simples

\[
Y_i=\beta_0+\beta_1x_i+\varepsilon_i
\]

\[
E(Y\mid x)=\beta_0+\beta_1x.
\]

- \(\beta_0\): intercepto;
- \(\beta_1\): mudança média em \(Y\) por unidade de \(X\);
- regressão \(\neq\) causalidade.

## Mínimos quadrados

Minimiza:

\[
\sum e_i^2
=
\sum(y_i-b_0-b_1x_i)^2.
\]

\[
b_1=
\frac{\sum(x_i-\bar x)(y_i-\bar y)}
{\sum(x_i-\bar x)^2},
\qquad
b_0=\bar y-b_1\bar x.
\]

Resíduo:

\[
e_i=y_i-\hat y_i.
\]

## Máxima verossimilhança

Com erros normais independentes e variância constante:

**maximizar a verossimilhança nos coeficientes = minimizar a soma dos quadrados.**

## Regressão múltipla

\[
Y=\beta_0+\beta_1X_1+\cdots+\beta_kX_k+\varepsilon.
\]

\(\beta_j\): efeito linear médio de \(X_j\), **mantidas constantes** as demais explicativas.

## Inferência

Coeficiente individual:

\[
t=\frac{b_j-\beta_{j,0}}{SE(b_j)}.
\]

Teste global:

\[
H_0:\beta_1=\cdots=\beta_k=0.
\]

No modelo simples:

\[
F=t^2.
\]

## Análise de variância

\[
\text{SQ total}
=
\text{SQ regressão}
+
\text{SQ erro}.
\]

Modelo simples:

- total: \(n-1\);
- regressão: \(1\);
- erro: \(n-2\).

## Coeficiente de determinação

\[
R^2
=
1-\frac{\text{SQ erro}}{\text{SQ total}}.
\]

\(R^2\) alto não prova causalidade nem bom diagnóstico.

## Resíduos

Esperado:

- em torno de zero;
- sem curva;
- dispersão aproximadamente constante;
- sem padrão de dependência.

Funil → variância não constante.  
Curva → possível não linearidade.

## Planos amostrais

| Plano | Mecanismo |
|---|---|
| aleatória simples | sorteio probabilístico direto de unidades |
| estratificada | amostra dentro de **todos** os estratos |
| sistemática | início aleatório + cada \(k\)-ésima unidade |
| conglomerados | seleciona alguns grupos naturais |

**Estratos:** representar todos os grupos.  
**Conglomerados:** reduzir custo/logística selecionando alguns grupos.

## Tamanho amostral — média

\[
n_0
=
\left(
\frac{z\sigma}{e}
\right)^2.
\]

## Tamanho amostral — proporção

\[
n_0
=
\frac{z^2p^\*(1-p^\*)}{e^2}.
\]

Sem informação:

\[
p^\*=0{,}5.
\]

## População finita

\[
n
=
\frac{Nn_0}{N-1+n_0}.
\]

## Relações

- confiança ↑ → \(n\) ↑;
- variabilidade ↑ → \(n\) ↑;
- margem de erro ↓ → \(n\) ↑;
- margem pela metade → \(n\) aproximadamente ×4.

## Pegadinhas

- mínimos quadrados maximiza erros → **não**;
- inclinação prova causa → **não**;
- resíduo = erro verdadeiro → **não**;
- gráfico de resíduos deve seguir a reta ajustada → **não; deve oscilar em torno de zero**;
- estratificada seleciona só alguns estratos → **não**;
- conglomerados = estratos → **não**;
- sistemática sem início aleatório → **não**;
- \(p\) desconhecido impede tamanho amostral → **não; use 0,5 como planejamento conservador**.
