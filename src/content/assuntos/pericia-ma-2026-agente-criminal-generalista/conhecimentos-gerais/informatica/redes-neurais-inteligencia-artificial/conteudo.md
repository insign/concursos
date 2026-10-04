---
schemaVersion: 1
title: Redes neurais e inteligência artificial
description: Pesos, camadas, aprendizagem e inferência nas redes neurais; tipos de aprendizado, avaliação e limites da inteligência artificial.
order: 330
storageId: per-u033
---

## 1. O que o sistema faz e como foi construído

Imagine três recursos **hipotéticos** de uma equipe que recebe documentos. O primeiro encaminha um arquivo conforme uma condição fixa escrita pelo programador: se o campo «tipo» for X, enviar à pasta X. O segundo aprende com documentos já classificados e sugere a classe de documentos novos. O terceiro redige uma síntese do material recebido. A tarefa automatizada, a aprendizagem a partir de dados e a geração de conteúdo são características diferentes; podem coexistir em um sistema.

**Automação** é executar tarefas com menor intervenção humana. Uma rotina de cópia de arquivos pode ser automatizada sem aprendizagem. **Inteligência artificial** é um campo mais amplo, com sistemas que, para determinados objetivos, inferem como produzir previsões, recomendações, decisões ou conteúdo a partir de entradas. Isso não significa consciência, acerto garantido ou autonomia total.

Há abordagens de inteligência artificial **simbólicas ou baseadas em conhecimento**, que representam fatos e relações para realizar inferências, e abordagens que aprendem padrões a partir de dados. Portanto, «usa regras» não exclui, por si só, inteligência artificial. Também não basta observar uma entrada e uma saída para classificar qualquer programa como inteligente: uma soma programada produz saída sem demonstrar aprendizagem ou raciocínio baseado em conhecimento.

**Aprendizado de máquina** é uma abordagem de inteligência artificial na qual um modelo é ajustado com dados para cumprir uma tarefa. O programador define procedimento, objetivo e estrutura de aprendizagem, mas não precisa escrever uma regra individual para cada documento futuro. O **modelo** é a representação utilizada para relacionar entradas e saídas; o **algoritmo** é o procedimento que executa operações, inclusive as que treinam ou usam esse modelo. Nem todo algoritmo é um modelo aprendido.

As **redes neurais artificiais** são uma família de modelos de aprendizado de máquina. Antes de discutir aplicações, precisamos entender o cálculo que seus componentes realizam.

## 2. Do dado ao neurônio artificial

Um documento precisa ser representado por valores que o sistema possa processar. **Atributos** são informações de entrada: quantidade de páginas, presença de uma expressão ou outras características. No <abbr title="Aprendizagem orientada por exemplos com respostas conhecidas">aprendizado supervisionado</abbr>, o **rótulo ou alvo** é a resposta conhecida usada para orientar o ajuste. Se o objetivo for prever a classe «X» ou «Y», essa classe é o rótulo; não é um atributo que já deva estar disponível para o documento novo.

Um **neurônio artificial**, no modelo simples que estudaremos, combina entradas numéricas. Cada entrada é multiplicada por um **peso**, que determina sua contribuição; soma-se ainda um termo de deslocamento, chamado **viés** ou <abbr title="Termo somado à combinação das entradas, independentemente de seus valores">bias</abbr>. Para duas entradas:

$$z=w_1x_1+w_2x_2+b$$

Aqui, $x_1$ e $x_2$ são os valores recebidos; $w_1$ e $w_2$, os pesos; $b$, o deslocamento; e $z$, o resultado da combinação. Peso negativo também é possível. O sinal e o tamanho do peso afetam a contribuição da entrada, considerando sua escala e as demais partes do modelo. Um peso alto isolado não prova que uma característica seja a causa do resultado observado.

Depois da combinação, uma **função de ativação** transforma $z$ na saída do neurônio, indicada por $a=f(z)$. A função $f$ estabelece essa transformação. Uma ativação comum é a unidade linear retificada, <abbr title="Rectified Linear Unit — unidade linear retificada">ReLU</abbr>: devolve zero quando recebe um valor negativo e conserva um valor não negativo.

Em um cálculo **hipotético**, tome $x_1=1$, $x_2=0$, $w_1=2$, $w_2=-1$ e $b=-0{,}5$. A combinação é $z=1{,}5$ e a saída dessa ativação é $a=1{,}5$. Se as entradas passarem a $x_1=0$ e $x_2=1$, conservando os pesos e o deslocamento, teremos $z=-1{,}5$ e $a=0$. A mudança veio das entradas; não houve treino entre os dois cálculos. Esses valores são saídas de uma unidade, **não probabilidades nem percentuais de certeza**.

Pesos e deslocamentos ajustáveis são **parâmetros** do modelo. O viés matemático $b$ não é sinônimo do viés que produz tratamento desigual de grupos: o primeiro nomeia um componente do cálculo; o segundo será discutido entre os limites do sistema.

## 3. Camadas e aprendizagem profunda

Os neurônios são conectados para que saídas de uma parte da rede alimentem outra. Em uma rede simples com fluxo da entrada para a saída, distinguimos:

| Parte | Papel no processamento |
|---|---|
| Camada de entrada | Recebe a representação numérica dos dados |
| Camada oculta | Transforma os valores recebidos e produz representações intermediárias |
| Camada de saída | Produz valores utilizados na resposta da tarefa |

«Oculta» significa intermediária entre entrada e saída; não garante sigilo de dados. Cada unidade de uma camada pode combinar valores da anterior com seus próprios pesos e deslocamento. A rede pode ter mais de uma camada oculta. A resposta final depende do problema e da interpretação da saída: estimar duração é diferente de decidir entre classes ou gerar texto.

**Ativações não lineares** permitem representar relações que não se resumem a uma única combinação linear das entradas. Apenas empilhar camadas que façam combinações lineares, mesmo com deslocamentos, mantém uma transformação equivalente dessa mesma família. Logo, aumentar a quantidade de camadas sem examinar suas operações não explica sozinho a capacidade do modelo.

O **aprendizado profundo**, também chamado <abbr title="Aprendizado profundo com redes neurais de várias camadas de transformação">deep learning</abbr>, utiliza redes com várias camadas de transformação, capazes de aprender representações em níveis sucessivos. Uma rede pode aprender características intermediárias úteis à tarefa em vez de receber todas elas prontas. Isso não torna qualquer resultado interpretável ou correto.

O campo de inteligência artificial contém o aprendizado de máquina; dentro dele estão as redes neurais e o aprendizado profundo. Há modelos de aprendizado de máquina que não são redes neurais. Uma rede neural não precisa ser profunda ou generativa: pode apenas classificar uma entrada ou estimar um número. Quantidade de camadas, finalidade da saída e forma de aprendizagem são critérios distintos.

## 4. O que muda durante o treino

Considere a rede classificadora de documentos e seus exemplos com classe conhecida. Primeiro ela calcula uma saída com os parâmetros atuais. A **função de perda** mede o desacordo entre essa saída e o alvo, de acordo com a tarefa. O treino busca parâmetros que reduzam essa perda.

Na **retropropagação**, conhecida como <abbr title="Cálculo da influência dos parâmetros na perda, da saída em direção às camadas anteriores">backpropagation</abbr>, calculam-se os **gradientes**: indicações matemáticas de como pequenas mudanças dos parâmetros afetam a perda. Esse cálculo percorre as dependências da rede a partir da saída. Um **otimizador** utiliza essas indicações para atualizar pesos e deslocamentos; a descida do gradiente é um procedimento comum, que busca diminuir a perda dando passos no sentido contrário ao gradiente.

A sequência é: calcular a saída, medir a perda, calcular gradientes e atualizar parâmetros. Ela se repete com os dados de treinamento. Retropropagação calcula as informações para o ajuste; não cria automaticamente novas camadas, não fornece rótulos ausentes e não garante encontrar a melhor solução possível.

A **taxa de aprendizagem** controla o tamanho dos passos de atualização. É um **hiperparâmetro**: uma escolha que orienta o processo, como também pode ser o número de camadas. Já os pesos ajustados pelo treino são parâmetros. Hiperparâmetros podem ser escolhidos por busca automática; a distinção não é «tudo manual» contra «tudo automático».

**Inferência** é usar uma versão do modelo para produzir uma saída a partir de uma entrada. Na inferência comum de uma versão fixa, os parâmetros aprendidos são utilizados, sem ser atualizados por cada solicitação. Sistemas podem incluir aprendizagem contínua ou etapas de novo treinamento; isso precisa ser descrito, e não presumido porque alguém fez uma pergunta ao sistema.

## 5. Como os sinais de aprendizagem diferem

No **aprendizado supervisionado**, os exemplos trazem respostas conhecidas. Prever uma categoria é **classificação**; estimar um valor numérico, como tempo de processamento, é **regressão**. O fato de a categoria ser codificada como 0 ou 1 não transforma a classificação em regressão: interessa o significado da saída.

No **aprendizado não supervisionado**, procuram-se estruturas sem os rótulos da resposta desejada. Formar grupos de documentos semelhantes é **agrupamento**. Os grupos encontrados não chegam automaticamente com o significado «urgente» ou «rotina»; essa interpretação exige análise.

No **aprendizado por reforço**, um agente escolhe ações em um ambiente, recebe sinais de recompensa e aprende uma **política**, isto é, uma estratégia de escolha de ações. O objetivo envolve recompensa acumulada; a melhor ação imediata pode não produzir o melhor resultado ao longo da sequência. Não se exige uma resposta correta rotulada para cada ação possível.

Essas formas de aprendizagem podem empregar redes neurais, mas não dependem exclusivamente delas. «Usa rede neural» descreve uma família de modelos; «supervisionado» descreve o sinal que orienta a aprendizagem. A **inteligência artificial generativa** descreve outra característica: produzir conteúdo. Não é uma quarta opção necessariamente incompatível com as três formas de aprendizagem.

## 6. Aprender exemplos e funcionar em casos novos

**Generalização** é a capacidade de funcionar em exemplos novos pertinentes à tarefa. O acerto nos próprios exemplos de treino não basta para estimá-la. No desenvolvimento usual, o conjunto de **treinamento** ajusta parâmetros, o de **validação** auxilia escolhas como hiperparâmetros, e o de **teste** é reservado para avaliar a versão escolhida. Usar repetidamente os resultados do teste para mudar o modelo compromete sua função de avaliação independente.

No **sobreajuste** ou <abbr title="Adaptação excessiva aos exemplos de treino, com prejuízo em exemplos novos">overfitting</abbr>, o modelo funciona muito bem no treino, mas acompanha peculiaridades que não se sustentam fora dele. No **subajuste** ou <abbr title="Modelo que não captura adequadamente o padrão relevante nem nos dados de treino">underfitting</abbr>, nem o desempenho no treino é satisfatório para a tarefa. Maior complexidade pode ajudar um modelo insuficiente, mas também facilitar sobreajuste; «mais camadas» não é garantia de generalização.

Há **vazamento de dados** quando informação indevida entra no desenvolvimento ou na avaliação. Imagine prever, na chegada do documento, se ele exigirá correção. Usar como atributo o campo «correção realizada», preenchido somente depois, oferece informação que não existirá no momento real da previsão. Uma cópia de um documento de treino no conjunto de teste também pode inflar a avaliação. Dividir arquivos em pastas não corrige essas contaminações por si só.

Os dados avaliados precisam representar as condições de uso. Um sistema treinado com imagens de um equipamento pode falhar diante de imagens com características distintas de outro. Mudanças nos dados ou nas relações relevantes ao longo do tempo podem exigir nova avaliação. Não se presume que uma medida antiga continue válida em qualquer contexto.

## 7. O que uma medida de acerto permite concluir

Em uma classificação binária, defina primeiro o que é a classe **positiva**. Se for «documento que exige correção», um **falso positivo** é um documento que não exige correção, mas foi marcado como positivo; um **falso negativo** exige correção e foi marcado como negativo. «Positivo» não significa desejável, e os dois erros podem ter custos diferentes.

**Acurácia** é a proporção de classificações corretas entre todas as classificações. Ela pode esconder o fracasso na classe rara. Em um lote hipotético de 1.000 documentos, dos quais 10 exigem correção, marcar todos como negativos acerta 990: acurácia de 99%, com nenhum dos dez positivos detectado.

Outras medidas respondem a perguntas diferentes:

| Medida | Pergunta e denominador |
|---|---|
| Precisão | Entre os previstos como positivos, qual proporção era realmente positiva? |
| Sensibilidade ou <abbr title="Proporção de positivos reais identificados como positivos">recall</abbr> | Entre os positivos reais, qual proporção foi detectada? |

No lote anterior, a sensibilidade é zero. Como não houve previsão positiva, a razão que define a precisão tem denominador zero; não se pode concluir «precisão de 99%» a partir da acurácia. A escolha de métricas deve considerar a finalidade e os erros relevantes. Uma média global também pode ocultar desempenho pior em determinado grupo.

## 8. Geração de conteúdo, contexto e limites

Modelos generativos produzem texto, imagens ou outros conteúdos a partir de padrões aprendidos. Um **grande modelo de linguagem**, frequentemente chamado <abbr title="Large Language Model — grande modelo de linguagem">LLM</abbr>, processa texto em **tokens**: unidades que podem corresponder a palavras, partes de palavras ou caracteres, inclusive pontuação. Portanto, contar tokens não equivale necessariamente a contar palavras.

Grandes modelos de linguagem atuais utilizam redes neurais profundas para representar e relacionar unidades do texto. O neurônio de duas entradas da seção 2 é uma simplificação para compreender operações, não uma descrição completa da arquitetura desses modelos.

Na geração textual, o modelo utiliza o contexto para atribuir possibilidades a unidades que continuem a sequência. Produzir um resumo é diferente de copiar um arquivo: o sistema gera uma saída, que pode omitir ou acrescentar informações. **Fluência e plausibilidade não comprovam veracidade.** Uma **alucinação ou confabulação** é conteúdo apresentado de modo convincente que é incorreto, não tem sustentação ou contradiz o material de referência. Até uma justificativa ou citação gerada precisa ser conferida.

Um **prompt** é a entrada que apresenta instruções, contexto ou exemplos ao modelo. Pedir «resuma somente o documento anexado e indique os trechos usados» orienta a resposta, mas não elimina erros. Mudar o contexto de uma consulta não equivale a atualizar os pesos. **Ajuste fino**, ou <abbr title="Treinamento adicional de um modelo já treinado para adaptá-lo a uma tarefa">fine-tuning</abbr>, é uma etapa adicional de treinamento que modifica parâmetros; a mera inclusão de exemplos no pedido utiliza o modelo existente.

Dados com lacunas, erros de rotulagem ou desigualdades podem levar a resultados enviesados. O sistema pode ter desempenho desigual entre tipos de documento ou grupos, mesmo com boa média global. A rede aprende relações úteis a um objetivo; isso não comprova por si só causalidade, autenticidade de um arquivo ou a verdade de uma alegação. Seu resultado deve ser confrontado com evidências e com as condições em que foi avaliado.

Para analisar uma situação de prova, localize o mecanismo descrito: regras ou aprendizagem, existência de alvos, forma da saída, alteração de parâmetros e condições da avaliação. A expressão «inteligente» no nome de um recurso não resolve essas distinções. O recorte aqui é conceitual: não depende de marca, catálogo de produtos ou promessa de desempenho em uma atividade pericial real.
