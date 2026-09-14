---
schemaVersion: 1
title: "Inteligência artificial e aprendizado de máquina — revisão rápida"
description: "Mapa de revisão sobre IA, aprendizado supervisionado/não supervisionado, treinamento, avaliação e modelos generativos."
order: 33
storageId: pc-u033
---

# Inteligência artificial e aprendizado de máquina — revisão rápida

## Mapa central

```text
regra fixa → automação determinística
dados + treinamento → aprendizado de máquina
modelo generativo + entrada → conteúdo novo
```

Algoritmo ≠ <abbr title="Inteligência Artificial">IA</abbr>.
<abbr title="Aprendizado de Máquina">ML</abbr> ⊂ <abbr title="Inteligência Artificial">IA</abbr>.

## Tipos de aprendizado

| Tipo | Sinal | Tarefa típica |
|---|---|---|
| supervisionado | rótulos/valores corretos | classificação, regressão |
| não supervisionado | dados sem rótulos | agrupamento |
| por reforço | recompensa por ação | aprender política de ação |

```text
categoria → classificação
valor numérico → regressão
grupos sem rótulo → clustering
```

## Vocabulário

- atributo/<abbr title="característica de entrada usada pelo modelo">feature</abbr>: entrada;
- rótulo/alvo: resposta conhecida no supervisionado;
- parâmetro: valor aprendido;
- hiperparâmetro: configuração do treinamento/modelo;
- treinamento: ajusta parâmetros;
- inferência: usa o modelo treinado.

## Dados

```text
treino → ajusta
validação → escolhe/ajusta
teste → estima desempenho final
```

- <abbr title="ajuste excessivo ao treino com perda em dados novos">overfitting</abbr>: treino bom, generalização ruim;
- <abbr title="modelo aprende insuficientemente até no treino">underfitting</abbr>: desempenho ruim já no treino;
- vazamento: informação indevida do teste/futuro entra no treinamento;
- generalização: funcionar bem em dados novos.

## Classificação

```text
acurácia = (VP + VN) / (VP + VN + FP + FN)
precisão = VP / (VP + FP)
recall   = VP / (VP + FN)
```

- precisão: dos previstos positivos, quantos eram positivos;
- <abbr title="proporção dos positivos reais identificados">recall</abbr>: dos positivos reais, quantos foram encontrados;
- acurácia pode enganar em classe rara;
- métrica depende do custo do erro.

## Hierarquia

```text
IA
└─ aprendizado de máquina
   └─ aprendizado profundo
```

Nem todo <abbr title="Aprendizado de Máquina">ML</abbr> é rede neural.
Nem toda <abbr title="Inteligência Artificial">IA</abbr> é generativa.

## Generativa

- <abbr title="Grande Modelo de Linguagem">LLM</abbr>: modelo de linguagem de grande escala;
- token: unidade processada;
- prompt: instrução + contexto;
- inferência: geração com modelo já treinado;
- alucinação: saída plausível sem suporte;
- ajuste fino: treinamento adicional, altera parâmetros;
- <abbr title="Geração Aumentada por Recuperação">RAG</abbr>: busca fonte e a põe no contexto.

<abbr title="Geração Aumentada por Recuperação">RAG</abbr> ≠ treinamento.
Prompt melhor ≠ verdade garantida.

## Pegadinhas

- probabilidade de classe não transforma classificação em regressão;
- agrupamento sem rótulo ≠ classificação supervisionada;
- treino excelente ≠ teste excelente;
- correlação aprendida ≠ causalidade;
- média alta ≠ desempenho bom em todos os grupos;
- dados/ambiente podem mudar → deriva;
- conteúdo fluente ≠ conteúdo verdadeiro.
