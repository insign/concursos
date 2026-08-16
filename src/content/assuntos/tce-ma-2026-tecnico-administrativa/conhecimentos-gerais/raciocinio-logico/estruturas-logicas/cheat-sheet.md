# Estruturas lógicas

## Recorte

**Aqui:** relações finitas entre pessoas, lugares, objetos ou eventos; ordenação; associação; distribuição; agrupamento; hierarquia/parentesco; dedução de configurações possíveis, necessárias ou impossíveis.

**Em outros assuntos:** argumentação formal, proposições e tabelas-verdade, equivalências, primeira ordem, contagem/probabilidade, conjuntos e problemas aritméticos, geométricos e matriciais.

> Não crie regra por “bom senso”. Vale o que foi dado e o que decorre logicamente.

## Tradução de prova

| Linguagem | Leitura |
|---|---|
| A antes de B | `A < B`; pode haver intervalo |
| A imediatamente antes de B | bloco `[A B]` |
| A ao lado de B | `[A B]` ou `[B A]` |
| A com B | mesmo grupo |
| A sem B | grupos diferentes |
| se A, então B | A força B |
| A somente se B | A exige B |
| somente A pode fazer X | se X ocorrer, será A |
| exatamente um | 1 |
| pelo menos um | ≥ 1 |
| no máximo um | 0 ou 1 |
| A ou B, mas não ambos | exatamente um dos dois |

### Não confunda

- antes ≠ imediatamente antes;
- ao lado não fixa orientação;
- `A → B` não autoriza `B → A`;
- “A somente se B” = B é necessário para A;
- “somente A pode” não afirma que o evento ocorrerá;
- exclusão de uma opção ≠ atribuição imediata.

## Representação

| Estrutura | Ferramenta |
|---|---|
| fila / ranking / ordem | posições numeradas |
| pessoa × setor × dia | grade |
| equipes / salas / grupos | caixas |
| chefia / dependência | setas com direção |
| poucas alternativas | casos separados |

## Ordem e blocos

```text
posição:  1   2   3   4   5
ocupante: _   _   _   _   _
```

- `A < B < C`: precedência transitiva;
- `[A B]`: adjacência orientada;
- A ao lado de B: teste `[A B]` e `[B A]`;
- fixe extremos primeiro;
- confira se cadeia/bloco cabe no espaço restante;
- adjacência **não** é transitiva.

## Associação um a um

Ao confirmar `Lia = TI`:

1. elimine outros setores de Lia;
2. elimine TI das outras pessoas;
3. transporte pistas compostas ligadas a TI;
4. procure linha ou coluna com uma única possibilidade.

**Valor em único lugar:** se todos os valores devem ser usados e Jurídico só cabe em Rui → `Rui = Jurídico`.

## Distribuição e agrupamento

Antes de distribuir, anote:

- capacidade;
- mínimo/máximo;
- pares obrigatórios;
- incompatibilidades;
- condicionais.

Regras rápidas:

- caixa cheia → destino fechado;
- mínimo ainda não atingido → reserve vagas suficientes;
- “A com C” em duplas → núcleo `{A,C}`;
- “se D entra, E entra” não implica o inverso;
- se grupos forem meros rótulos idênticos, trocar seus nomes pode não gerar solução substantivamente nova.

## Propagação

Depois de cada descoberta:

- risque incompatíveis;
- feche capacidade atingida;
- aplique exclusividade;
- reaplique condicionais ativadas;
- procure única possibilidade restante;
- confira valores que só cabem em um lugar.

## Contradição

Descarte o ramo se:

- elemento fica sem opção;
- vaga exclusiva recebe dois elementos;
- capacidade é excedida;
- mínimo torna-se impossível;
- quantidade exata é ultrapassada;
- surge ciclo como `A < B < C < A`;
- qualquer regra original é violada.

## Pode × deve × não pode

| Comando | Prova suficiente |
|---|---|
| **pode ser** | uma configuração completa válida |
| **deve ser** | vale em todas; tente contraexemplo |
| **não pode ser** | hipótese leva sempre a contradição |
| **solução única** | demais configurações foram eliminadas |

**Pegadinha:** uma solução encontrada prova existência, não unicidade.

## Relações direcionais

- defina o sentido da seta;
- superioridade hierárquica pode ser transitiva;
- contato direto não é transitivo;
- em parentesco, organize gerações;
- não presuma vínculo ou convenção que o enunciado não informou.

## Verdade/mentira como restrição

Se o enunciado fixa a quantidade de falas verdadeiras:

1. liste cenários;
2. avalie as falas;
3. conte as verdadeiras;
4. mantenha só os cenários com a quantidade exigida.

Não transforme isso em tabelas-verdade formais neste assunto.

## Método em 6 passos

1. Leia o comando: **pode, deve ou não pode?**
2. Liste elementos, categorias, vagas e capacidades.
3. Registre primeiro fixações, blocos e quantidades.
4. Propague cada atribuição ou exclusão.
5. Abra poucos casos apenas se necessário.
6. Releia **todas** as regras antes de responder.

## Checklist

- [ ] nenhuma regra inventada?
- [ ] antes × imediatamente antes?
- [ ] direção correta das condicionais?
- [ ] capacidades e mínimos conferidos?
- [ ] associação propagada em linha e coluna?
- [ ] regras negativas verificadas?
- [ ] todos os ramos mantêm as condições originais?
- [ ] o tipo de prova corresponde ao comando?
