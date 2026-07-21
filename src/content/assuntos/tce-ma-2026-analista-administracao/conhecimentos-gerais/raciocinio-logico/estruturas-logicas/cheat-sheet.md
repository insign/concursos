# Estruturas lógicas

## Modelo central

- **Entidades:** pessoas, objetos, lugares, datas ou eventos.
- **Variáveis:** elementos cujo valor precisa ser determinado.
- **Domínio:** valores que cada variável ainda pode assumir.
- **Restrição:** condição que elimina combinações.
- **Solução:** atribuição completa que satisfaz todas as restrições.

> Não acrescente fatos “naturais” ao cenário. Use somente as condições dadas e suas consequências.

## Recorte

- Aqui: ordenação, associação, distribuição, agrupamento, sequências, calendários, horários, hierarquias, parentesco e verdade/mentira como restrição.
- Depois: argumentação, proposições, tabelas-verdade, equivalências, primeira ordem, contagem, probabilidade e conjuntos.

## Tradução rápida

| Linguagem | Restrição |
|---|---|
| A antes de B | `pos(A) < pos(B)` |
| A imediatamente antes de B | `pos(B) = pos(A) + 1` |
| A ao lado de B | posições consecutivas; duas orientações possíveis |
| A junto de B | mesmo grupo |
| A separado de B | grupos diferentes |
| se A, então B | A força B; não vale automaticamente o inverso |
| A somente se B | B é necessário para A |
| exatamente um | um e somente um |
| pelo menos um | um ou mais |
| no máximo um | zero ou um |
| A ou B, mas não ambos | exatamente um entre A e B |

### Não confunda

- antes ≠ imediatamente antes;
- ao lado não define a orientação;
- pelo menos ≠ exatamente;
- no máximo dois inclui zero e um;
- implicação ≠ equivalência;
- condição necessária ≠ condição suficiente;
- eliminação de uma opção ≠ determinação imediata do valor.

## Tipos de restrição

- **Unária:** uma variável; “A não está em 1º”.
- **Binária:** duas variáveis; “A antes de B”.
- **Global:** várias variáveis; “todas as posições são distintas”.
- **Igualdade:** mesmo dia, grupo ou valor.
- **Diferença:** valores distintos.
- **Precedência:** ordem relativa.
- **Adjacência:** posições consecutivas.
- **Implicação:** A ativa B.
- **Incompatibilidade:** A e B não coexistem.
- **Cardinalidade:** mínimo, máximo ou quantidade exata.

## Representação

| Estrutura | Representação preferida |
|---|---|
| fila, ranking, agenda | linha de posições |
| pessoa × setor × dia | tabela ou grade de associação |
| equipes, salas, recipientes | caixas com capacidade |
| chefia, dependência, precedência | grafo com direção definida |
| poucas alternativas | lista explícita de casos |

### Linha de posições

```text
posição:  1   2   3   4   5
ocupante: _   _   _   _   _
```

- Adjacência orientada: `[A B]`.
- Adjacência sem direção: `[A B]` ou `[B A]`.
- Cadeia: `A < B < C`.
- Verifique se bloco ou cadeia cabe no espaço restante.

### Grade de associação

- `✓`: associação confirmada.
- `×`: associação impossível.
- Relação um a um: cada `✓` elimina as demais células da linha e da coluna.
- Pista entre categorias deve ser transportada quando uma delas for identificada.

### Caixas

- anote capacidade, mínimo e máximo;
- caixa cheia elimina novos elementos;
- combine vagas restantes com incompatibilidades;
- controle quantidades globais depois de cada atribuição.

## Método em 7 passos

1. **Comando:** pode, deve, não pode, configuração ou quantidade?
2. **Elementos:** liste categorias, domínios, vagas e capacidades.
3. **Regras fortes:** fixe posições, blocos, quantidades e exclusões amplas.
4. **Propagação:** risque incompatíveis e atualize vagas e domínios.
5. **Casos:** abra poucos ramos apenas se a dedução parar.
6. **Validação:** releia e confira cada condição.
7. **Prova adequada:** exemplo, universalidade ou contradição.

## Propagação

- domínio com um valor → atribuição forçada;
- se todo valor deve ser usado, valor possível em um único lugar → lugar forçado;
- par confinado a duas posições → outros não usam essas posições;
- capacidade atingida → destino fechado;
- mínimo ainda necessário → reserve vagas suficientes;
- implicação ativada → aplique sua consequência;
- nova atribuição → percorra novamente todas as relações afetadas.

## Contradições

Descarte o caso quando:

- uma variável fica sem valor;
- uma vaga exclusiva recebe dois elementos;
- a capacidade é excedida;
- um mínimo se torna inalcançável;
- uma quantidade exata é ultrapassada;
- surge ciclo de precedência, como `A < B < C < A`;
- alguma condição original é violada.

## Tipo de pergunta

### Pode ser

- basta uma configuração completa válida;
- a alternativa funciona como hipótese de construção;
- um exemplo é prova de existência.

### Deve ser

- precisa valer em todas as soluções;
- procure contraexemplo;
- um caso favorável não prova necessidade.

### Não pode ser

- assuma a alternativa;
- propague as regras;
- elimine-a somente se todos os ramos levarem a contradição.

### Unicidade

- encontrar uma solução não prova que ela é única;
- prove que todos os valores foram forçados ou descarte os demais casos.

## Estados do sistema

- **Inconsistente:** nenhuma solução.
- **Subdeterminado:** duas ou mais soluções.
- **Único:** exatamente uma solução.
- Problema subdeterminado ainda pode ter consequência obrigatória comum a todas as soluções.

## Ordenação

- una precedências em cadeias;
- transforme “imediatamente” em bloco;
- conte o espaço necessário para cadeias e blocos;
- use extremos fixos primeiro;
- não imponha adjacência a uma mera precedência.

Exemplo:

```text
Eva < Dora < [Ana Caio] < Beto
```

Com cinco pessoas e Beto em 5º: `Eva, Dora, Ana, Caio, Beto`.

## Associação

- confirme se a relação é bijetiva;
- elimine na linha e na coluna;
- conecte pistas compostas entre categorias;
- só converta exclusão em atribuição quando restar uma opção;
- valide cada categoria separadamente.

## Distribuição

- faça balanço de itens e vagas;
- uma caixa cheia fecha o destino;
- incompatibilidade restringe a vaga restante;
- “ao menos” exige reserva de capacidade;
- mais de uma distribuição válida significa que valores não determinados não podem ser afirmados.

## Agrupamento

- “A com C” forma núcleo;
- “A sem B” cria incompatibilidade;
- “se D entra, E entra” não força D quando E entra;
- grupos sem características próprias podem ter simetria de nomes;
- grupos como “manhã” e “tarde” não são intercambiáveis.

## Sequências

1. separe atributos;
2. examine diferenças e transformações;
3. teste periodicidade;
4. separe posições ímpares e pares;
5. exija que a regra explique todos os termos relevantes.

Exemplo: `2, 5, 4, 7, 6, 9, ...` → ímpares `2,4,6,8`; próximo = `8`.

## Calendários e horários

- dia da semana: use o resto por 7;
- múltiplo de 7 mantém o dia da semana;
- “três dias depois de segunda” = quinta;
- de segunda a quinta, com extremos incluídos = quatro dias;
- converta horas e minutos para unidade comum;
- desenhe intervalos para detectar sobreposição.

## Hierarquia e parentesco

- defina a direção da seta;
- superioridade hierárquica pode ser transitiva;
- contato direto e adjacência não são transitivos;
- disponha gerações em níveis;
- não presuma gênero, vínculo ou convenção não informada;
- regra específica do enunciado prevalece sobre uso informal.

## Verdade e mentira

1. liste cenários possíveis;
2. avalie cada fala em cada cenário;
3. conte as falas verdadeiras;
4. mantenha apenas cenários com a cardinalidade exigida.

Não presuma que cada pessoa mente sempre ou diz sempre a verdade, salvo regra expressa.

## Teste eficiente de alternativas

- **Pode ser:** construa até achar uma solução.
- **Deve ser:** tente produzir contraexemplo.
- **Não pode ser:** procure contradição rápida.
- Priorize posições fixas, blocos, quantidades exatas e incompatibilidades.
- Não resolva a grade inteira quando a alternativa pode ser decidida antes.

## Checklist final

- [ ] Todas as entidades foram usadas corretamente?
- [ ] Todos os valores pertencem aos domínios?
- [ ] Exclusividades e capacidades foram respeitadas?
- [ ] Precedência e adjacência foram distinguidas?
- [ ] Implicações foram usadas na direção correta?
- [ ] Mínimos, máximos e quantidades exatas fecham?
- [ ] Todas as regras negativas foram conferidas?
- [ ] A resposta prova exatamente “pode”, “deve” ou “não pode”?

## Pegadinhas

- conhecimento externo não cria regra;
- plausível não significa logicamente permitido;
- uma solução parcial não é solução;
- um exemplo não prova necessidade;
- uma solução encontrada não prova unicidade;
- repetição local não prova o padrão da sequência;
- contagem temporal deve declarar se inclui extremos;
- cada ramo de caso conserva todas as regras originais.
