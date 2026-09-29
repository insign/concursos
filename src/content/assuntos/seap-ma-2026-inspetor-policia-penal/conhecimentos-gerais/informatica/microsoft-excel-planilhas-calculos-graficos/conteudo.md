---
schemaVersion: 1
title: "Microsoft Excel: formatação, cálculos, condicional e gráficos"
description: "Formatação de planilhas e células, cálculos com as quatro operações básicas, formatação condicional e representação de dados por gráficos no Microsoft Excel."
order: 43
storageId: "seap-u043"
---

# Microsoft Excel: valor, cálculo e aparência

Em prova, três camadas precisam ficar separadas: **o valor armazenado**, **a fórmula que produz um resultado** e **a aparência usada para exibi-lo**. Uma célula pode guardar `0,25`, exibir `25%` e participar de cálculos como número; mudar a formatação não transforma automaticamente o valor.

O item do edital é estreito. Aqui entram apenas formatação, as quatro operações, formatação condicional e gráficos. Funções avançadas, buscas, Tabela Dinâmica, macros e tratamento extensivo de dados ficam fora deste recorte.

## 1. Planilha, célula e intervalo

A **pasta de trabalho** é o arquivo do Excel; cada aba é uma **planilha**. A célula é identificada por coluna e linha: `D7` significa coluna D, linha 7. Um intervalo como `B2:E5` inclui todas as células entre os extremos.

A **Barra de Fórmulas** mostra o conteúdo da célula ativa. Se a célula exibe `125` por causa de `=A2+B2`, a grade mostra o resultado e a barra preserva a fórmula.

## 2. Formatação não é conteúdo

Formatar altera a apresentação. Entre os formatos mais comuns estão Número, Moeda, Contábil, Porcentagem, Data e Hora.

- `0,25` formatado como porcentagem aparece como `25%`;
- digitar `15%` normalmente armazena `0,15`;
- reduzir casas decimais geralmente arredonda apenas a exibição, não o valor usado no cálculo;
- o **Pincel de Formatação** copia aparência, não fórmula ou valor.

Também podem ser ajustados fonte, cor, alinhamento, orientação, preenchimento, bordas, largura de coluna e altura de linha.

**Limpar conteúdo** remove valor ou fórmula e conserva a estrutura da célula; **Limpar formatos** remove a aparência aplicada. Excluir células, linhas ou colunas muda a estrutura e pode alterar referências.

## 3. Quatro operações e precedência

Uma fórmula normalmente começa com `=`. Os quatro operadores básicos são:

| Operação | Operador | Exemplo |
|---|---|---|
| adição | `+` | `=A1+B1` |
| subtração | `-` | `=A1-B1` |
| multiplicação | `*` | `=A1*B1` |
| divisão | `/` | `=A1/B1` |

Multiplicação e divisão têm precedência sobre adição e subtração. Assim, `=2+3*4` resulta em 14. Com `=(2+3)*4`, os parênteses fazem a soma primeiro e o resultado é 20.

Em operações de mesma prioridade, o cálculo segue da esquerda para a direita. Parênteses são a forma mais segura de deixar explícita a ordem pretendida.

Uma divisão por zero ou por célula vazia usada como zero pode gerar erro; texto não numérico em operação aritmética pode produzir erro de tipo. O ponto de prova é reconhecer que fórmula e dado precisam ser compatíveis.

## 4. Referências ao copiar fórmulas

Referências relativas se deslocam quando a fórmula é copiada. Se `C2` contém `=A2+B2` e é copiada para `C3`, o padrão é `=A3+B3`.

O cifrão fixa coluna ou linha:

- `A1`: nada fixo;
- `$A$1`: coluna e linha fixas;
- `$A1`: coluna fixa;
- `A$1`: linha fixa.

Isso é útil quando um cálculo usa um parâmetro comum. A referência absoluta não impede alterações estruturais feitas diretamente na planilha; ela controla o deslocamento na cópia da fórmula.

## 5. Formatação condicional

A **Formatação Condicional** aplica aparência conforme uma regra. Ela pode destacar valores acima de um limite, duplicatas, faixas, escalas de cor, barras de dados ou conjuntos de ícones.

O princípio é:

**regra verdadeira → aplica o formato; regra falsa → não aplica aquele formato.**

Ela **não altera por si só o valor armazenado**. Também não é a mesma coisa que validação de entrada: uma célula pode ficar vermelha porque descumpre uma condição e ainda conservar o dado.

Em regras baseadas em fórmula, as referências relativas e absolutas importam porque a regra é avaliada para o intervalo ao qual foi aplicada.

## 6. Gráficos: escolher pela pergunta

Gráfico não corrige dado incorreto. Primeiro identifique o que se quer mostrar.

| Pergunta | Tipo frequentemente adequado |
|---|---|
| comparar categorias | colunas ou barras |
| acompanhar evolução no tempo | linhas |
| mostrar participação simples em um total | pizza ou rosca, com poucas categorias |
| relacionar duas variáveis numéricas | dispersão |

Elementos comuns incluem título, eixos, séries, legenda, rótulos e área de plotagem. Uma **série** é o conjunto de valores representados; categorias identificam grupos ou períodos.

Para criar um gráfico, selecione os dados e use a guia **Inserir**. O tipo deve ser coerente com a relação que se quer comunicar. Escalas mal escolhidas, excesso de efeitos tridimensionais ou categorias demais podem dificultar a interpretação.

O Excel oferece **Gráficos Recomendados**, mas a sugestão do programa não elimina a análise do objetivo.

## 7. Roteiro de prova

1. identifique se a questão trata de valor, fórmula ou aparência;
2. em cálculo, escreva a ordem das operações antes de executar mentalmente;
3. ao copiar fórmula, verifique o que é relativo e o que está fixo;
4. em formatação condicional, pergunte se a regra muda o valor ou só a aparência;
5. em gráfico, associe o tipo à relação: comparação, tempo, composição ou relação numérica.

A regra central é simples: **conteúdo → cálculo → apresentação**.