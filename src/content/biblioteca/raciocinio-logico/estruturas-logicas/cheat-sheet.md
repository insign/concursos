# Estruturas lógicas

**Organize pessoas, lugares, objetos ou eventos e conserve apenas configurações que satisfaçam todas as condições.** Não invente capacidade, preferência ou vínculo por “bom senso”.

## O comando decide a prova

| Comando | O que demonstrar |
|---|---|
| **Pode ser** | Uma configuração **completa e válida** em que a afirmação ocorre. |
| **Deve ser** | A afirmação ocorre em **todas** as configurações válidas. Um contraexemplo — solução válida em que ela é falsa — derruba a necessidade. |
| **Não pode ser** | Nenhuma configuração válida admite a afirmação; todos os casos sob essa hipótese levam a contradição. |
| **Solução única** | Existe uma solução e todas as demais configurações foram eliminadas. |

**Uma solução prova existência, não necessidade nem unicidade.** Uma disposição parcial sem contradição imediata ainda não prova possibilidade.

## Traduza sem acrescentar condições

| Expressão | Leitura correta |
|---|---|
| A antes de B | `A < B`; pode haver intervalo. |
| A imediatamente antes de B | Bloco `[A B]`, consecutivos nessa ordem. |
| A ao lado de B | `[A B]` ou `[B A]`; orientação em aberto. |
| Exatamente uma pessoa entre A e B | Posições com diferença 2, em qualquer orientação. |
| A e B devem ficar juntos / não podem ficar juntos | Mesmo grupo / grupos diferentes. |
| Se A, então B; A somente se B | `A → B`: A exige B. Não autoriza `B → A`. |
| Somente Marta pode autorizar X | Se houver autorização, será de Marta; não afirma que o ato ocorrerá. |
| Exatamente um / pelo menos um / no máximo um | Apenas 1 / 1 ou mais / 0 ou 1. |
| A ou B, mas não ambos | Exatamente um dos dois. |

**Excluir não é atribuir:** “Paulo não está em X” mantém Y e Z enquanto ambos continuarem possíveis.

## Represente e aplique as regras mais fortes

Use **posições numeradas** para ordem, **grade** para pessoa × setor × dia, **caixas com capacidade** para grupos e **setas com sentido definido** para relações direcionais. Confira se valores podem repetir e se todos precisam ser usados.

**Ordem:** fixe posições dadas e una cadeias e blocos. `A < B < C` implica `A < C`, mas não cria vizinhança. Confira se o bloco cabe nas vagas restantes. Estar ao lado **não é transitivo**: em `[A B C]`, A não está ao lado de C.

**Associação um a um — exemplo hipotético:** ao confirmar Lia = Compras, elimine os outros setores de Lia e Compras das outras pessoas. Se Compras corresponde à segunda, transporte também essa informação. A exclusão cruzada depende de a associação ser um a um.

## Propague até não surgir nova dedução

Propagar é aplicar as consequências de cada atribuição ou exclusão. Reaplique também as condições do tipo “se” ativadas.

| Situação | Consequência |
|---|---|
| Um elemento ficou com uma única opção | Atribuição forçada. |
| Um valor obrigatório só cabe em um elemento | Atribua-o a esse elemento, mesmo que ele tenha outras opções. |
| A e B só cabem nas vagas exclusivas 2 e 4 | **Reserve ambas:** nenhum terceiro pode usá-las; ainda não se sabe quem ocupa qual. |
| Um destino atingiu a capacidade | Elimine-o das opções dos demais elementos. |
| Falta atingir um mínimo | Reserve vagas suficientes; se faltar um auditor e restar uma vaga, ela será de auditor. |
| A deve ficar com C em grupos de duas pessoas | `{A,C}` fecha uma dupla, **sem ordem interna**. |

## Abra casos; descarte por contradição

Quando a propagação parar, escolha um elemento com poucas possibilidades e separe os casos. **Cada ramo conserva todas as regras originais.**

Descarte o ramo se houver elemento sem opção, disputa por vaga exclusiva, capacidade ou quantidade exata ultrapassada, mínimo inalcançável, ciclo como `A < B < C < A` ou outra regra violada.

Antes de responder, confira a configuração completa contra **todas** as condições, inclusive negativas, e retome o tipo de prova pedido no comando.

## Relações e falas: cuidados próprios

**Hierarquia e parentesco:** defina a direção das setas. “Acima de” pode encadear níveis; chefia ou contato **direto** não se conclui por esse encadeamento. Em parentesco, organize gerações e use somente os vínculos informados.

**Verdade e mentira:** em cada cenário, avalie **todas** as falas, conte as verdadeiras e mantenha apenas os cenários com a quantidade exigida. A plausibilidade de uma fala isolada não resolve a restrição global.
