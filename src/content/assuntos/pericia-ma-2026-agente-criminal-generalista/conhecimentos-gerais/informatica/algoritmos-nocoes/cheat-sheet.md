# Noções de algoritmos — recuperação

## Tarefa, dados e resultado

- **Algoritmo:** instruções precisas e organizadas para resolver uma tarefa. No modelo de tarefa finita, deve concluir para as entradas admitidas. Clareza e término não garantem resultado correto.
- **Entrada:** dados disponíveis; **processamento:** operações/decisões; **saída:** resultados apresentados. Entrada não exige teclado; saída não exige papel.
- **Programa:** implementação com regras de uma linguagem. A mesma solução pode ter implementações diferentes.

## Estado e sequência

- **Variável:** nome com valor atual que pode mudar, mesmo que não mude em um percurso. **Constante:** valor definido como fixo, sem alteração permitida durante a execução.
- `x ← expressão`: calcular a direita com os valores atuais e substituir o valor de `x`. Não é igualdade permanente nem histórico automático.
- `x ← 2; y ← x + 3; x ← y × 2` termina com **x = 10, y = 5**. Alterar x não recalcula y.
- Ordem e parênteses importam. Multiplicação/divisão precedem adição/subtração na notação ensinada.

## Decisões

- Condição: verdadeiro ou falso. Aqui, `←` atribui e `=` compara; `≥`/`≤` incluem igualdade, `>`/`<` não.
- **SE simples:** executa o bloco quando verdadeiro; quando falso, segue após ele.
- **SE...SENÃO:** escolhe um dos dois ramos em cada avaliação; depois continua a sequência.
- **E:** ambas verdadeiras; **OU inclusivo:** ao menos uma, inclusive ambas; **NÃO:** inverte o resultado.
- Dois SE independentes podem executar duas ações. Na cadeia SE/SENÃO SE/SENÃO, executa-se o primeiro ramo verdadeiro; critérios sobrepostos tornam a ordem decisiva.
- Decisão aninhada: a interna só é alcançada pelo caminho que a contém.

## Repetições

| Representação ensinada | Teste/percurso | Condição de continuação ou término |
|---|---|---|
| ENQUANTO | Teste antes; pode executar zero vezes | Continua enquanto verdadeiro |
| REPITA...ATÉ | Teste depois; ao menos uma execução | Para quando verdadeiro |
| PARA de 1 até 3 | Extremos incluídos e passo 1 neste material | Executa para 1, 2 e 3 |
| PARA CADA item | Cada item uma vez, na ordem dada | Lista vazia: zero execuções |

Cada execução do bloco é uma **iteração**. Observe valor inicial, teste, ações e avanço. No exemplo `i = 1`, somando i e acrescentando 1 enquanto `i ≤ 3`, a saída é **soma = 6, i = 4**. Sem avanço e sem outra mudança da condição, a repetição não termina.

## Somar, contar e rastrear

- **Contador:** acrescenta uma unidade por ocorrência. **Acumulador:** reúne valores sucessivos.
- Inicializar antes do laço preserva os resultados anteriores. Zerar a soma dentro de cada iteração apaga esse acúmulo.
- Lista 10, 25, 17: somar quantidades dá **52**; contar caixas com quantidade ≥ 20 dá **1**. Lista vazia dá 0 e 0 com as inicializações ensinadas.
- **Teste de mesa:** acompanhar instruções e registrar os valores após cada etapa; use o estado atual, sem pular o teste final.

## Representação e conferência

- **Pseudocódigo:** descrição estruturada da lógica, sem sintaxe universal. Siga as convenções indicadas.
- **Fluxograma:** setas mostram o caminho; no modelo tradicional ensinado, retângulo representa operação e losango representa decisão. Leia os rótulos dos ramos.
- Para “pelo menos 20”, conferir 19/20/21 examina o limite. Lista vazia/um item/vários itens examina o percurso. Entrada inválida exige resposta definida.
- **Depuração:** localizar/corrigir defeitos e conferir os efeitos. Alguns casos aprovados não provam correção geral. Menos operações não garante o resultado exigido.
