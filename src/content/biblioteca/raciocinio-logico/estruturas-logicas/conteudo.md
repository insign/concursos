---
schemaVersion: 1
title: Estruturas lógicas
description: Organização e dedução em cenários finitos de ordenação, associação, distribuição, agrupamento e relações sujeitas a restrições.
order: 36
storageId: estruturas-logicas
---

## 1. O problema por trás de “estruturas lógicas”

Imagine que cinco pessoas precisam ocupar cinco posições. O enunciado informa:

- Caio vem imediatamente depois de Ana;
- Dora vem antes de Ana;
- Beto ocupa a quinta posição;
- Eva vem antes de Dora.

A questão não quer saber qual ordem parece mais natural. Ela quer saber **quais disposições satisfazem todas as condições ao mesmo tempo**.

Traduza as regras:

- “Caio imediatamente depois de Ana” forma o bloco `[Ana Caio]`;
- “Eva antes de Dora” e “Dora antes de Ana” formam `Eva < Dora < Ana`;
- Beto fica em 5º.

Então:

```text
Eva < Dora < [Ana Caio] < Beto
```

e a ordem fica forçada:

```text
1 Eva | 2 Dora | 3 Ana | 4 Caio | 5 Beto
```

Esse é o mecanismo central do assunto: **transformar linguagem em restrições, reduzir possibilidades e conservar somente configurações compatíveis com todas as regras**.

> Uma solução não é uma disposição plausível. É uma configuração completa que respeita simultaneamente as condições dadas.

Não acrescente capacidades, preferências, vínculos ou convenções que o enunciado não informou.

## 2. Elementos, possibilidades e restrições

Quase todo problema pode ser organizado em três partes:

1. **elementos:** quem ou o que precisa ser organizado;
2. **possibilidades:** posições, setores, grupos ou valores ainda admissíveis;
3. **restrições:** condições que eliminam possibilidades ou forçam escolhas.

Exemplo hipotético: Lia, Nuno e Olga trabalham em setores distintos — Compras, Pessoal e <abbr title="Tecnologia da Informação">TI</abbr> — e em dias distintos — segunda, terça e quarta.

Se:

1. Lia não trabalha em Compras nem na segunda;
2. Nuno trabalha em <abbr title="Tecnologia da Informação">TI</abbr> e na quarta;
3. Compras corresponde à segunda;

então Nuno fecha <abbr title="Tecnologia da Informação">TI</abbr>/quarta. Compras/segunda não pode ser de Lia e também não pode ser de Nuno, logo fica com Olga. Sobra Pessoal/terça para Lia.

A resposta surgiu por **eliminação e consequência**, não por tentativa aleatória.

## 3. Traduzir a linguagem sem fortalecê-la

A maior fonte de erro é ler uma condição como se ela dissesse mais do que realmente diz.

### 3.1. Ordem e posição

| Enunciado | Leitura correta |
|---|---|
| A antes de B | A ocupa posição anterior à de B; pode haver intervalo |
| A imediatamente antes de B | A e B são consecutivos, nessa ordem |
| A depois de B | B vem antes de A |
| A ao lado de B | A e B são consecutivos; a orientação ainda não está definida |
| A não está ao lado de B | A e B não ocupam posições consecutivas |
| exatamente uma pessoa entre A e B | as posições de A e B diferem por 2 |

**Precedência não é adjacência.** Em `A, C, D, B`, A continua antes de B.

**Adjacência não fixa orientação.** “A ao lado de B” admite `[A B]` e `[B A]`.

### 3.2. Quantidades

- **exatamente um:** um e somente um;
- **pelo menos um:** um ou mais;
- **no máximo um:** zero ou um;
- **pelo menos dois:** dois ou mais.

“Pelo menos dois” fixa um mínimo; não fixa exatamente dois.

### 3.3. Condições do tipo “se”

“Se A, então B” significa: ocorrendo A, B também precisa ocorrer.

De `A → B`, **não** se conclui `B → A`.

“Lia participa somente se Nuno participar” significa:

> se Lia participa, Nuno participa.

A presença de Nuno, sozinha, não força Lia.

“Somente Marta pode autorizar X” significa:

> se X for autorizado, a autorização será de Marta.

A frase restringe o agente; não afirma que X será autorizado.

### 3.4. Exclusão não é atribuição

Se Paulo não trabalha no setor X e ainda pode estar em Y ou Z, apenas X foi eliminado. Não escolha Y ou Z antes de outra dedução.

## 4. Escolha a representação que exponha as regras

A representação serve para tirar informação da memória e colocá-la de forma visível.

| Situação | Representação eficiente |
|---|---|
| fila, ranking, ordem de eventos | posições numeradas |
| pessoa × setor × dia | tabela ou grade |
| equipes, salas, turnos | caixas com capacidade |
| chefia, dependência, precedência | setas com sentido definido |
| poucas alternativas restantes | casos separados |

A melhor representação é a que torna as restrições fáceis de aplicar.

## 5. Ordenação: posições, cadeias e blocos

Em fila, agenda ou ranking, numere as posições.

```text
posição:  1   2   3   4   5
ocupante: _   _   _   _   _
```

Se `A < B` e `B < C`, então `A < B < C`. A precedência pode ser encadeada, mas isso não cria adjacência.

“A imediatamente antes de B” forma:

```text
[A B]
```

Em cinco posições, esse bloco só pode começar em 1, 2, 3 ou 4.

Se houver apenas “A ao lado de B”, mantenha:

```text
[A B]   ou   [B A]
```

Também confira o **encaixe**. Um ramo que exige um bloco de três elementos em apenas duas vagas restantes é impossível, mesmo que a ordem interna do bloco esteja correta.

## 6. Associação um a um: feche linha e coluna

Em problemas que relacionam categorias distintas, uma grade evita perder exclusões.

| Pessoa | Setor | Dia |
|---|---|---|
| Lia | ? | ? |
| Nuno | ? | ? |
| Olga | ? | ? |

Quando a associação é **um a um**, confirmar

> `Lia = <abbr title="Tecnologia da Informação">TI</abbr>`

produz duas consequências:

1. Lia deixa de poder ocupar os outros setores;
2. <abbr title="Tecnologia da Informação">TI</abbr> deixa de ser opção para as outras pessoas.

Pistas também podem ligar categorias antes de identificar a pessoa. Se “a pessoa de <abbr title="Tecnologia da Informação">TI</abbr> trabalha na quarta”, setor e dia passam a ficar vinculados.

Há ainda duas deduções muito úteis:

- **única opção para um elemento:** se Paula só pode estar na terça, então Paula = terça;
- **único lugar para um valor:** se todos os setores devem ser usados e Jurídico só cabe em Rui, então Rui = Jurídico.

## 7. Distribuição e agrupamento: capacidade é parte da lógica

Quando elementos são distribuídos entre equipes, salas ou turnos, anote:

- capacidade máxima;
- quantidade mínima ou exata;
- pares obrigatórios;
- incompatibilidades;
- condições como “se A entra, B entra”.

```text
Equipe 1: [   ] [   ]
Equipe 2: [   ] [   ]
```

**Capacidade atingida:** se uma sala comporta duas tarefas e já recebeu A e B, ela fecha para as demais.

**Mínimo ainda não atingido:** uma comissão de quatro precisa de pelo menos dois auditores. Se três vagas já têm um auditor e dois não auditores, a última vaga deve ser de auditor.

**Núcleo:** se A deve ficar com C e os grupos são duplas, `{A,C}` já forma uma dupla completa. Agrupamento não cria ordem interna.

## 8. Relações direcionais: defina o sentido antes de combinar

Em hierarquia, dependência ou parentesco, fixe o significado da relação.

Se:

```text
A → B
```

significa “A chefia B”, mantenha essa convenção.

Nem toda relação permite o mesmo encadeamento:

- se A está acima de B e B está acima de C, então A está acima de C;
- se A trabalha **diretamente** com B e B trabalha diretamente com C, não se conclui que A trabalha diretamente com C.

Em parentesco, organize gerações e vínculos informados. Não presuma gênero, casamento, filiação ou outro vínculo pelo nome ou por costume.

## 9. Propagação: cada descoberta deve gerar consequências

Não basta registrar pistas. Depois de cada atribuição ou exclusão:

1. elimine opções incompatíveis;
2. feche linhas, colunas ou destinos completos;
3. reavalie capacidades, mínimos e quantidades exatas;
4. reaplique condições ativadas;
5. procure elementos ou valores com única possibilidade;
6. repita enquanto houver nova dedução.

Esse ciclo é **propagação de restrições**: uma informação reduz o espaço de possibilidades e pode forçar outra.

### 9.1. Subconjunto confinado

Se A e B só podem ocupar as posições 2 e 4, essas posições ficam reservadas aos dois. Ainda não sabemos quem ocupa qual, mas nenhum terceiro elemento pode usar 2 ou 4.

### 9.2. Contradição

Descarte uma hipótese se ela produzir, por exemplo:

- elemento sem opção;
- duas pessoas na mesma vaga exclusiva;
- capacidade ultrapassada;
- mínimo impossível de alcançar;
- quantidade exata excedida;
- ciclo de precedência como `A < B < C < A`;
- violação de qualquer regra negativa.

Contradição é violação das condições, não apenas um caso difícil de completar.

## 10. Quando a dedução parar: abra poucos casos

Se restarem poucas possibilidades, separe os ramos explicitamente:

```text
Caso 1: A está no grupo X.
Caso 2: A está no grupo Y.
```

Prefira uma escolha com poucos valores possíveis. Em cada ramo, reaplique **todas** as regras originais. Se surgir contradição, descarte o ramo inteiro.

Abrir casos é teste controlado, não tentativa aleatória.

## 11. O comando define o tipo de prova

### 11.1. “Pode ser verdadeiro”

Basta construir **uma configuração completa válida** em que a alternativa ocorra.

### 11.2. “Deve ser verdadeiro”

A alternativa precisa ocorrer em **todas** as configurações válidas.

Uma técnica eficiente é tentar construir um **contraexemplo**: uma configuração válida em que a alternativa seja falsa. Se ele existir, a alternativa não é obrigatória.

### 11.3. “Não pode ser verdadeiro”

Assuma a alternativa e aplique as regras. Ela é impossível se todos os caminhos compatíveis com a hipótese levarem a contradição.

### 11.4. Solução única

Encontrar uma solução prova existência, não unicidade. Para afirmar unicidade, mostre que as escolhas foram forçadas ou que todas as outras configurações foram eliminadas.

## 12. Verdade e mentira como restrição global

Algumas questões fixam quantas declarações são verdadeiras. Trate essa quantidade como mais uma regra do cenário.

Exemplo hipotético: exatamente uma entre Ana, Beto e Caio retirou um documento.

- Ana: “Beto retirou.”
- Beto: “Caio retirou.”
- Caio: “Eu não retirei.”

Se exatamente duas falas são verdadeiras:

- se Ana retirou: apenas a fala de Caio é verdadeira;
- se Beto retirou: falas de Ana e Caio são verdadeiras;
- se Caio retirou: apenas a fala de Beto é verdadeira.

Logo, Beto retirou.

Aqui, a contagem de verdades apenas filtra cenários. O estudo formal de proposições e tabelas-verdade pertence ao assunto próprio.

## 13. Um método de resolução que serve para quase toda questão

### Passo 1 — leia o comando

A questão pede o que **pode**, **deve** ou **não pode** ocorrer? Ou exige a configuração completa?

### Passo 2 — conte os recursos

Liste elementos, posições, categorias, vagas e capacidades. Verifique exclusividade e repetição.

### Passo 3 — traduza as regras

Transforme frases em posição fixa, precedência, bloco, exclusão, associação, capacidade, mínimo/máximo ou condição do tipo “se”.

### Passo 4 — aplique primeiro as regras mais fortes

Priorize fixações, blocos, quantidades exatas, capacidades quase completas e elementos com poucas opções.

### Passo 5 — propague antes de abrir casos

Toda atribuição deve produzir novas eliminações. Só ramifique quando esse ciclo parar.

### Passo 6 — valide tudo

Antes de responder, releia cada condição original, inclusive as negativas. Uma grade preenchida não é prova de correção se uma regra foi esquecida.

## 14. Armadilhas que mais custam pontos

- acrescentar regra de “bom senso” não informada;
- confundir “antes” com “imediatamente antes”;
- fixar orientação em “ao lado” sem apoio;
- inverter `A → B` para `B → A`;
- confundir “somente se” com “se”;
- ler “pelo menos” como “exatamente”;
- esquecer capacidade, mínimo ou exclusividade;
- confirmar associação um a um sem fechar também a coluna;
- transformar exclusão em atribuição cedo demais;
- tratar toda relação como se permitisse encadeamento;
- usar um exemplo para provar “deve”;
- encontrar uma solução e presumir unicidade;
- abrir casos e esquecer alguma regra original.

## 15. Checklist de fechamento

Antes de marcar:

- [ ] usei somente informações do enunciado?
- [ ] traduzi corretamente ordem, adjacência e quantidades?
- [ ] respeitei o sentido das condições do tipo “se”?
- [ ] conferi capacidades, mínimos e exclusividades?
- [ ] propaguei cada atribuição ou exclusão?
- [ ] mantive todas as regras em cada caso?
- [ ] validei também as condições negativas?
- [ ] minha prova corresponde a “pode”, “deve” ou “não pode”?
- [ ] se afirmei unicidade, eliminei as demais configurações?
