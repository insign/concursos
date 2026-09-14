---
schemaVersion: 1
title: "Inteligência artificial e aprendizado de máquina"
description: "Noções de inteligência artificial, aprendizado de máquina, dados, treinamento, avaliação, modelos generativos e limites de uso."
order: 33
storageId: pc-u033
---

# Inteligência artificial e aprendizado de máquina

## 1. Comece pela pergunta certa: regra, aprendizagem ou geração?

Um sistema recebe uma entrada e produz uma saída. Isso, sozinho, **não prova que exista inteligência artificial**.

Compare três situações hipotéticas:

1. uma regra fixa encaminha todo registro marcado como “financeiro” para uma fila predeterminada;
2. um modelo foi treinado com exemplos anteriores e estima a categoria mais provável de um novo registro;
3. um modelo recebe uma instrução e produz um resumo textual.

No primeiro caso, há **automação determinística**: a regra já foi escrita. No segundo, há <abbr title="Aprendizado de Máquina">ML</abbr>, isto é, aprendizado de máquina: o modelo ajustou padrões a partir de dados. No terceiro, há uma aplicação de <abbr title="Inteligência Artificial">IA</abbr> generativa: o sistema produz conteúdo novo a partir dos padrões aprendidos.

A distinção que mais resolve questões é:

```text
regra explícita → automação determinística
dados + treinamento → modelo de aprendizado de máquina
modelo generativo + entrada → conteúdo novo
```

**Algoritmo** é uma sequência de instruções para executar uma tarefa. Portanto, algoritmo não é sinônimo de <abbr title="Inteligência Artificial">IA</abbr>. Um algoritmo pode simplesmente ordenar números, buscar um valor ou aplicar uma regra fixa.

<abbr title="Inteligência Artificial">IA</abbr> é um campo mais amplo. <abbr title="Aprendizado de Máquina">ML</abbr> é uma das abordagens usadas dentro desse campo.

---

## 2. O que um modelo aprende

No aprendizado de máquina, não se programa uma regra específica para cada situação futura. Define-se uma tarefa e fornece-se um conjunto de dados para que um procedimento de treinamento ajuste um **modelo**.

Um modelo é uma representação computacional que transforma entradas em saídas. Durante o treinamento, seus **parâmetros** — valores internos ajustáveis — são alterados para reduzir o erro segundo um objetivo.

Para acompanhar esse processo, diferencie:

| Termo | Ideia operacional |
|---|---|
| exemplo | uma observação do conjunto de dados |
| atributo ou <abbr title="característica de entrada usada pelo modelo">feature</abbr> | informação fornecida ao modelo como entrada |
| rótulo ou alvo | resposta conhecida que se deseja prever no aprendizado supervisionado |
| parâmetro | valor interno aprendido durante o treinamento |
| hiperparâmetro | configuração escolhida para controlar como o treinamento/modelo funciona |
| treinamento | etapa em que o modelo ajusta parâmetros com base nos dados |
| inferência | uso do modelo já treinado para produzir saída sobre nova entrada |

Exemplo hipotético: para prever uma categoria de documento, as palavras, metadados ou outras representações podem funcionar como atributos; a categoria correta dos exemplos de treinamento funciona como rótulo.

A qualidade do resultado depende não só do algoritmo, mas também do problema formulado, dos dados, dos rótulos, da forma de avaliação e das condições de uso.

---

## 3. Três formas básicas de aprendizado

### 3.1 Aprendizado supervisionado

No **aprendizado supervisionado**, os exemplos de treinamento trazem entradas e respostas esperadas. O modelo aprende a relacionar os atributos aos rótulos ou valores-alvo.

Duas tarefas aparecem com frequência:

- **classificação:** prevê uma categoria, como “classe A” ou “classe B”;
- **regressão:** prevê um valor numérico, como uma quantidade ou medida.

A pergunta prática é:

```text
saída categórica → classificação
saída numérica contínua → regressão
```

Um classificador pode produzir probabilidades ou pontuações antes de convertê-las em uma classe. A presença de probabilidade não transforma a tarefa em regressão: o que importa é o **objetivo final da previsão**.

### 3.2 Aprendizado não supervisionado

No **aprendizado não supervisionado**, não há rótulo correto fornecido para cada exemplo. O modelo procura estrutura nos próprios dados.

O exemplo clássico é o **agrupamento**, ou <abbr title="formação de grupos de exemplos semelhantes sem rótulos prévios">clustering</abbr>: itens semelhantes são reunidos segundo um critério de proximidade ou estrutura.

Agrupar não equivale a descobrir automaticamente uma verdade jurídica, causal ou semântica. O algoritmo encontra padrões segundo os dados e o método usados; a interpretação dos grupos é uma etapa distinta.

### 3.3 Aprendizado por reforço

No **aprendizado por reforço**, um agente interage com um ambiente, escolhe ações e recebe sinais de recompensa ou penalização. O objetivo é aprender uma política de ação que maximize a recompensa acumulada.

O contraste principal é:

| Abordagem | Sinal de aprendizagem |
|---|---|
| supervisionado | rótulo/valor correto nos exemplos |
| não supervisionado | padrões nos dados sem rótulos |
| por reforço | recompensa decorrente das ações |

Aprendizado por reforço não significa simplesmente “corrigir o modelo uma vez”. Ele envolve uma sequência de interações entre agente e ambiente.

---

## 4. Treinar não é testar: generalização

O objetivo de um modelo não é decorar os exemplos já vistos. Ele deve funcionar adequadamente em **dados novos**. Essa capacidade é a <abbr title="capacidade de manter bom desempenho em exemplos não usados no treinamento">generalização</abbr>.

Por isso, é comum separar os dados em conjuntos com papéis distintos:

| Conjunto | Função |
|---|---|
| treinamento | ajustar os parâmetros do modelo |
| validação | comparar escolhas e ajustar configurações durante o desenvolvimento |
| teste | estimar o desempenho final em dados que não foram usados para ajustar o modelo |

A proporção exata entre esses conjuntos **não é uma regra universal**. O ponto conceitual é manter dados independentes para avaliar o modelo.

### Sobreajuste e subajuste

**Sobreajuste** — <abbr title="modelo se ajusta demais aos dados de treinamento e perde desempenho em dados novos">overfitting</abbr> — ocorre quando o modelo vai muito bem no treinamento, mas generaliza mal.

**Subajuste** — <abbr title="modelo é simples ou inadequado demais e nem aprende bem os padrões do treinamento">underfitting</abbr> — ocorre quando o modelo não captura suficientemente a relação relevante, apresentando desempenho fraco já no treinamento e também fora dele.

Um modelo mais complexo não é automaticamente melhor. A meta é desempenho adequado em dados novos.

### Vazamento de dados

<abbr title="informação do teste ou do futuro entra indevidamente no treinamento ou nas entradas">Vazamento de dados</abbr> ocorre quando o processo dá ao modelo informação que ele não deveria possuir no momento real da previsão.

Exemplo hipotético: usar, no treinamento, um campo criado **depois** do resultado que se deseja prever. O modelo pode aparentar excelente desempenho sem ter aprendido uma relação utilizável na prática.

---

## 5. Como avaliar um classificador

Considere uma tarefa binária em que existe uma classe definida como “positiva”. Cada previsão cai em uma das quatro combinações:

| Resultado | Significado |
|---|---|
| verdadeiro positivo | caso positivo previsto como positivo |
| verdadeiro negativo | caso negativo previsto como negativo |
| falso positivo | caso negativo previsto como positivo |
| falso negativo | caso positivo previsto como negativo |

A partir dessas contagens surgem métricas diferentes.

### Acurácia

A **acurácia** mede a proporção total de previsões corretas:

\[
\text{acurácia}=\frac{VP+VN}{VP+VN+FP+FN}
\]

Ela pode enganar quando as classes são muito desbalanceadas. Se apenas uma pequena parcela dos casos for positiva, prever sempre a classe majoritária pode gerar acurácia alta e ainda assim ser inútil para detectar positivos.

### Precisão e sensibilidade

A **precisão** responde:

> Entre os casos que o modelo marcou como positivos, quantos eram realmente positivos?

\[
\text{precisão}=\frac{VP}{VP+FP}
\]

A **sensibilidade**, também chamada de <abbr title="proporção dos positivos reais que o modelo consegue identificar">recall</abbr>, responde:

> Entre os casos realmente positivos, quantos o modelo encontrou?

\[
\text{recall}=\frac{VP}{VP+FN}
\]

O <abbr title="média harmônica que combina precisão e sensibilidade">F1</abbr> combina precisão e sensibilidade em uma única medida. Nenhuma dessas métricas é “a melhor” em qualquer situação: a escolha depende do custo de falsos positivos e falsos negativos.

Uma prova pode explorar exatamente essa troca. Se perder um positivo for o erro mais grave, a sensibilidade tende a ganhar importância; se um falso alarme for muito caro, a precisão ou a taxa de falso positivo pode ser mais relevante.

---

## 6. Redes neurais, aprendizado profundo e <abbr title="Inteligência Artificial">IA</abbr> generativa

Uma **rede neural artificial** é um modelo composto por unidades conectadas organizadas em camadas. O **aprendizado profundo** usa redes neurais com múltiplas camadas e capacidade de aprender representações complexas.

A relação conceitual é:

```text
Inteligência artificial
└── aprendizado de máquina
    └── aprendizado profundo
```

Nem todo aprendizado de máquina usa redes neurais, e nem toda <abbr title="Inteligência Artificial">IA</abbr> é generativa.

<abbr title="Inteligência Artificial">IA</abbr> generativa é voltada à criação de conteúdo novo, como texto, imagem, áudio, vídeo ou código. Um <abbr title="Grande Modelo de Linguagem">LLM</abbr> é um modelo de linguagem de grande escala que aprende relações estatísticas em grandes coleções de texto e produz sequências durante a inferência.

### Treinamento, token e inferência

Um <abbr title="Grande Modelo de Linguagem">LLM</abbr> processa unidades chamadas **tokens**, que podem corresponder a palavras, partes de palavras, sinais ou outros fragmentos. Durante o treinamento, parâmetros são ajustados; durante a inferência, o modelo já treinado recebe uma entrada e gera uma saída.

A entrada de uma conversa não se torna automaticamente “novo treinamento” dos parâmetros. Retenção e eventual reúso dos dados dependem do sistema, da configuração e das regras do ambiente utilizado.

---

## 7. Prompt, alucinação, ajuste fino e <abbr title="Geração Aumentada por Recuperação">RAG</abbr>

**Prompt** é a instrução e o contexto fornecidos ao modelo. Um prompt mais claro pode reduzir ambiguidades, mas não transforma o modelo em fonte oficial nem garante verdade.

**Alucinação** é uma saída plausível, porém falsa, sem suporte ou incompatível com a fonte. Fluência não prova correção.

Há ainda três mecanismos que não devem ser confundidos:

| Mecanismo | O que muda |
|---|---|
| prompt/contexto | muda a entrada daquela interação |
| <abbr title="treinamento adicional para adaptar um modelo">ajuste fino</abbr> | altera parâmetros por treinamento adicional |
| <abbr title="Geração Aumentada por Recuperação">RAG</abbr> | busca informação externa e a coloca no contexto antes da geração |

<abbr title="Geração Aumentada por Recuperação">RAG</abbr> não é sinônimo de ajuste fino e não garante que a fonte recuperada esteja correta ou atualizada.

---

## 8. Dados, vieses e mudança do ambiente

Um modelo aprende relações presentes nos dados. Se o conjunto de treinamento omite grupos relevantes, contém rótulos ruins ou reflete distorções do processo observado, o modelo pode reproduzir ou ampliar esses problemas.

**Viés** aqui não significa apenas intenção discriminatória. Pode surgir da coleta, amostragem, rotulagem, escolha de atributos, objetivo do modelo ou forma de implantação.

Também existe **deriva**: os dados ou o ambiente mudam com o tempo e o desempenho observado na implantação se distancia do desempenho anterior. Por isso, avaliação não termina no momento do treinamento.

Dois lembretes resolvem muitas pegadinhas:

- correlação aprendida pelo modelo não prova, por si só, relação causal;
- acurácia média alta não prova que o desempenho seja adequado para todos os grupos ou classes.

Questões de proteção de dados, segurança da informação e cadeia de custódia possuem unidades próprias no edital. Aqui, o ponto é apenas reconhecer que **qualidade e governança dos dados fazem parte do funcionamento de um modelo**.

---

## 9. Método de prova

Ao encontrar uma situação de <abbr title="Inteligência Artificial">IA</abbr> ou <abbr title="Aprendizado de Máquina">ML</abbr>, pergunte nesta ordem:

1. **há regra fixa ou aprendizagem a partir de dados?**
2. **há rótulos?** Se sim, pense em aprendizado supervisionado; se não, pode haver aprendizado não supervisionado.
3. **qual é a saída?** Categoria sugere classificação; valor numérico sugere regressão; grupos sem rótulos sugerem agrupamento.
4. **o enunciado fala de treinamento ou inferência?**
5. **o desempenho foi medido em dados novos?** Treino excelente não garante generalização.
6. **qual erro importa?** Falso positivo e falso negativo têm custos diferentes.
7. **é geração de conteúdo?** Não confunda <abbr title="Inteligência Artificial">IA</abbr> generativa com todo o campo de <abbr title="Inteligência Artificial">IA</abbr>.
8. **o contexto veio de busca ou de treinamento?** <abbr title="Geração Aumentada por Recuperação">RAG</abbr> recupera contexto; ajuste fino altera parâmetros.

### Contrastes de alto rendimento

- algoritmo ≠ <abbr title="Inteligência Artificial">IA</abbr>;
- automação ≠ <abbr title="Aprendizado de Máquina">ML</abbr>;
- classificação ≠ regressão;
- agrupamento ≠ classificação supervisionada;
- treinamento ≠ inferência;
- validação ≠ teste final;
- bom desempenho no treino ≠ generalização;
- acurácia alta ≠ desempenho adequado em classe rara;
- <abbr title="Inteligência Artificial">IA</abbr> generativa ≠ todo aprendizado de máquina;
- <abbr title="Geração Aumentada por Recuperação">RAG</abbr> ≠ ajuste fino.
