# Estruturas lógicas

**Só valem as configurações completas que obedecem a todas as condições.** Não crie capacidade, equilíbrio, vínculo ou exclusividade por costume.

## Tradução rápida

| Expressão | Restrição |
|---|---|
| A antes de B | `A < B`; intervalo permitido |
| A imediatamente antes de B | bloco `[A B]` |
| A ao lado de B | `[A B]` ou `[B A]` |
| k pessoas entre A e B | diferença de k + 1 entre posições |
| exatamente / pelo menos / no máximo um | 1 / 1 ou mais / 0 ou 1 |
| A somente se B | A exige B; ausência de B exclui A |
| A se B | B exige A |
| A ou B, mas não ambos | exatamente um |

**Excluir não é atribuir.** “Não está em X” mantém Y e Z enquanto ambos forem possíveis.

## Representar e propagar

- **Fila:** posições numeradas; <abbr title="Ordem relativa sem exigência de vizinhança">precedência</abbr> não cria <abbr title="Ocupação de posições consecutivas">adjacência</abbr>. Confira orientação e encaixe dos blocos.
- **Círculo:** último e primeiro são vizinhos. Girar o desenho preserva posições relativas; inverter o sentido pode trocar esquerda/direita.
- **Trocas sucessivas:** cada troca usa a disposição produzida pela anterior.
- **Associação um a um:** confirmação fecha a linha do elemento e a coluna do valor. Transporte também vínculos entre categorias.
- **Grupos:** anote capacidade, mínimo, quantidade exata e pares obrigatórios/proibidos. Agrupar não cria ordem interna.

**Escolhas forçadas:** um elemento com uma única opção; ou um valor obrigatório que só cabe em um elemento.

**Reserva conjunta:** A e B só cabem nas vagas exclusivas 2 e 4 → nenhum terceiro pode usá-las, mesmo sem distinguir A de B.

Repita as consequências de cada descoberta. Quando a <abbr title="Aplicação sucessiva das consequências de atribuições e exclusões">propagação</abbr> parar, escolha um elemento com poucas opções e abra um caso por opção, conservando todas as regras em cada um. Descarte por violação demonstrada: elemento sem opção, disputa por vaga exclusiva, capacidade excedida, mínimo inalcançável ou ciclo `A < B < C < A`.

## O comando decide a prova

| Comando | Basta / exige |
|---|---|
| **Pode** | uma solução completa válida que realize a afirmação |
| **Deve** | afirmação presente em todas as soluções; um <abbr title="Solução válida em que a afirmação é falsa">contraexemplo</abbr> elimina a necessidade |
| **Não pode** | ausência de qualquer solução válida com a afirmação |
| **Única** | existência de uma solução e eliminação de todas as demais |

Uma solução prova existência. Uma conclusão pode ser necessária mesmo com várias soluções. O que é necessário também é possível quando o sistema tem solução.

## Relações e falas

**Relação <abbr title="Relação cujo encadeamento garante a mesma relação entre os extremos">transitiva</abbr>:** “antes de” encadeia; “ao lado de” e contato direto não autorizam o mesmo encadeamento. Defina o sentido de cada seta e use somente os vínculos familiares informados.

**Falas:** avalie todas em cada cenário e conte as verdadeiras. “E” exige todas; “ou” inclusivo exige ao menos uma. Uma composta falsa não obriga todas as partes a serem falsas.

**Fechamento:** conferir todas as condições originais, inclusive negativas, capacidades, quantidades e exclusividades; responder ao tipo de prova pedido.
