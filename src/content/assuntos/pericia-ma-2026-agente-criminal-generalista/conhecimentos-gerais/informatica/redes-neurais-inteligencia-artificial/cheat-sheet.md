# Redes neurais e inteligência artificial — recuperação

## Relações essenciais

- **Automação:** execução de tarefas com menor intervenção humana; uma condição fixa pode automatizar sem aprender.
- **Inteligência artificial:** campo com aprendizagem de máquina e abordagens simbólicas/baseadas em conhecimento. Usar regras não exclui inteligência artificial; apenas produzir entrada/saída não a comprova.
- **Aprendizado de máquina:** ajusta modelos com dados. **Rede neural:** família de modelos conectados. **Aprendizado profundo:** várias camadas de transformação. Rede neural não implica geração de conteúdo.
- **Algoritmo:** procedimento; **modelo:** representação usada para relacionar entradas e saídas.

## Unidade neural e camadas

$$z=w_1x_1+w_2x_2+b,\qquad a=f(z)$$

$x_1,x_2$: entradas; $w_1,w_2$: pesos; $b$: deslocamento; $z$: combinação; $f$: ativação; $a$: saída. Pesos e deslocamentos ajustáveis são parâmetros.

| Conceito | Recuperação e limite |
|---|---|
| <abbr title="Termo de deslocamento na combinação das entradas">Bias</abbr> | Não é sinônimo de discriminação ou viés dos dados |
| <abbr title="Rectified Linear Unit — unidade linear retificada">ReLU</abbr> | Valor negativo vira zero; valor não negativo é conservado. Saída não é necessariamente probabilidade |
| Entrada / ocultas / saída | Dados recebidos / representações intermediárias / valores da resposta |
| Ativação não linear | Amplia relações representáveis; empilhar somente combinações lineares com deslocamentos mantém transformação equivalente dessa família |

## Treino e inferência

**Saída → perda → gradientes → atualização dos parâmetros.** A perda mede desacordo com o alvo; a retropropagação calcula como os parâmetros afetam a perda; o otimizador usa essa informação para atualizá-los. Não há garantia de solução ótima.

- **Parâmetro:** peso aprendido. **Hiperparâmetro:** escolha que orienta o treino, como taxa de aprendizagem ou número de camadas; pode ser escolhida por busca automática.
- **Inferência de versão fixa:** calcula saída com parâmetros aprendidos. Uma consulta não implica novo treino. Aprendizagem contínua precisa estar descrita.

## Sinal de aprendizagem e avaliação

| Distinção | Condição decisiva |
|---|---|
| Atributo / rótulo | Entrada / resposta conhecida usada no treino supervisionado |
| Classificação / regressão | Categoria / valor numérico; categoria codificada em número continua categoria |
| Não supervisionado | Estrutura sem rótulos da resposta; agrupamento não nomeia automaticamente o significado dos grupos |
| Reforço | Ações no ambiente e recompensa acumulada; política orienta escolhas |
| Treino / validação / teste | Ajustar parâmetros / auxiliar escolhas / avaliar a versão escolhida |
| <abbr title="Adaptação excessiva ao treino com desempenho pior em exemplos novos">Sobreajuste</abbr> / <abbr title="Captura insuficiente do padrão relevante, inclusive no treino">subajuste</abbr> | Muito bom no treino e pior fora / insuficiente inclusive no treino |
| Vazamento | Informação futura ou contaminação treino/teste infla a avaliação |

Generalização exige casos novos pertinentes às condições de uso. Mais dados, camadas ou acerto no treino não garantem desempenho novo; mudança de contexto exige reavaliação.

## Erros e geração

- **Falso positivo:** negativo real previsto positivo. **Falso negativo:** positivo real previsto negativo. Defina a classe positiva antes de interpretar.
- **Acurácia:** acertos/todos. **Precisão:** positivos corretos/previstos positivos. **Sensibilidade**, ou <abbr title="Proporção de positivos reais que foram detectados">recall</abbr>: positivos corretos/positivos reais. Denominador zero não produz uma proporção comum; classe rara pode coexistir com acurácia alta e detecção zero.
- **Generativa:** produz conteúdo. **<abbr title="Large Language Model — grande modelo de linguagem">LLM</abbr>:** grande modelo de linguagem. **<abbr title="Unidade de texto processada pelo modelo, como palavra, fragmento ou caractere">Token</abbr>:** não equivale sempre a palavra.
- **<abbr title="Entrada com instruções, contexto ou exemplos para o modelo">Prompt</abbr>:** orienta a inferência, sem necessariamente alterar pesos. **Ajuste fino:** treino adicional que modifica parâmetros.
- **Alucinação:** conteúdo plausível, mas incorreto ou sem suporte. Fluência, citação gerada e média de desempenho não comprovam verdade, causalidade ou igualdade de desempenho entre grupos.
