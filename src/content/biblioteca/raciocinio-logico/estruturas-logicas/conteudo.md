---
schemaVersion: 1
title: Estruturas lógicas
description: Organização e dedução em cenários finitos de ordenação, associação, distribuição, agrupamento e relações sujeitas a restrições.
order: 36
storageId: estruturas-logicas
---

## 1. Recorte do assunto

No edital do TCE/MA 2026, **Estruturas lógicas** aparece como item próprio de Raciocínio Lógico. Os itens seguintes tratam separadamente de argumentação, lógica proposicional, equivalências, lógica de primeira ordem, contagem e probabilidade, conjuntos e problemas aritméticos, geométricos e matriciais.

Neste assunto, o foco é resolver **cenários finitos de relações**: pessoas, objetos, lugares, setores, posições, tarefas ou eventos devem ser organizados conforme condições fornecidas pelo enunciado.

São situações típicas:

- ordenar elementos em fila, ranking ou agenda;
- associar pessoas a setores, funções, locais ou datas;
- distribuir itens entre grupos, salas ou equipes;
- formar grupos com regras de inclusão, exclusão ou capacidade;
- interpretar relações direcionais, como chefia, precedência e parentesco;
- decidir o que **pode**, **deve** ou **não pode** ocorrer em uma configuração.

Sequências numéricas, cálculo autônomo de calendários, tabelas-verdade, equivalências formais e técnicas de contagem pertencem aos demais itens do edital e não são aprofundados aqui.

> A regra de ouro é simples: **não complete o enunciado com suposições próprias**. Trabalhe apenas com as condições dadas e com o que delas decorre necessariamente.

## 2. Modelo mental: elementos, possibilidades e restrições

Uma forma útil de organizar o problema é separar três componentes:

1. **elementos:** quem ou o que precisa ser organizado;
2. **possibilidades:** posições, setores, grupos ou valores ainda admissíveis;
3. **restrições:** condições que eliminam combinações ou forçam escolhas.

Exemplo: Ana, Bruno e Carla serão distribuídos, um por dia, entre segunda, terça e quarta.

- elementos: Ana, Bruno e Carla;
- possibilidades iniciais: segunda, terça e quarta para cada pessoa;
- restrições: por exemplo, “Ana não será atendida na segunda” e “Bruno será atendido antes de Carla”.

Uma **solução** é uma configuração completa que satisfaz **simultaneamente** todas as condições. Uma disposição que atende algumas regras e viola outra não é solução.

A linguagem de “variável”, “domínio” e “restrição” pode ser usada como apoio, mas não é necessário transformar a questão em teoria especializada de satisfação de restrições.

## 3. Tradução precisa da linguagem

A maior fonte de erro é traduzir a frase de modo mais forte ou mais fraco do que ela realmente diz.

| Enunciado | Leitura operacional |
|---|---|
| A antes de B | A ocupa posição anterior à de B; pode haver intervalo |
| A imediatamente antes de B | A e B são consecutivos, nessa ordem |
| A depois de B | B vem antes de A |
| A ao lado de B | posições consecutivas, sem direção fixada |
| A não ao lado de B | as posições não são consecutivas |
| A com B | mesmo grupo, salvo definição diversa |
| A sem B | grupos diferentes |
| se A, então B | ocorrendo A, B também deve ocorrer |
| A somente se B | A exige B; B é condição necessária para A |
| somente A pode fazer X | se X ocorrer, o agente deve ser A; não afirma que X ocorrerá |
| exatamente um | um e somente um |
| pelo menos um | um ou mais |
| no máximo um | zero ou um |
| A ou B, mas não ambos | exatamente um entre A e B |

### 3.1. Precedência não é adjacência

“A antes de B” não significa “A imediatamente antes de B”. Se a fila for `A, C, D, B`, A continua antes de B.

### 3.2. Adjacência não define orientação

“A ao lado de B” admite `[A B]` e `[B A]`, até que outra condição elimine uma das ordens.

### 3.3. Necessário não é suficiente

“Lia participa somente se Nuno participar” significa:

- Lia participa → Nuno participa.

Não significa que a presença de Nuno force a presença de Lia.

### 3.4. Exclusão não é atribuição

Se Paulo não está no setor X e ainda pode estar em Y ou Z, apenas X foi eliminado. A escolha entre Y e Z depende de novas condições.

## 4. Estruturas mais cobradas

### 4.1. Ordenação

Use posições numeradas quando houver fila, ordem de apresentação, prioridade ou sequência de eventos.

```text
posição:  1   2   3   4   5
ocupante: _   _   _   _   _
```

Regras úteis:

- una precedências: `A < B` e `B < C` produzem `A < B < C`;
- transforme “imediatamente antes” em bloco: `[A B]`;
- em “A ao lado de B”, considere `[A B]` e `[B A]`;
- fixe extremos logo no início;
- verifique se bloco ou cadeia cabe no espaço restante.

**Exemplo**

Ana, Beto, Caio, Dora e Eva ocupam cinco posições:

1. Caio está imediatamente depois de Ana;
2. Dora está antes de Ana;
3. Beto está na quinta posição;
4. Eva está antes de Dora.

Temos `Eva < Dora < [Ana Caio]` e Beto em 5º. Logo:

```text
1 Eva | 2 Dora | 3 Ana | 4 Caio | 5 Beto
```

### 4.2. Associação

Use tabela ou grade quando categorias diferentes precisam ser relacionadas.

| Pessoa | Setor | Dia |
|---|---|---|
| Lia | ? | ? |
| Nuno | ? | ? |
| Olga | ? | ? |

Em uma associação **um a um**:

- confirmar Lia = <abbr title="tecnologia da informação">TI</abbr> elimina os demais setores para Lia;
- também elimina TI para as demais pessoas;
- uma pista como “a pessoa de TI trabalha na quarta” liga duas categorias mesmo antes de identificar a pessoa.

**Exemplo**

Lia, Nuno e Olga trabalham em setores distintos — Compras, Pessoal e TI — e em dias distintos — segunda, terça e quarta.

1. Lia não trabalha em Compras nem na segunda;
2. Nuno trabalha em TI e na quarta;
3. Compras corresponde à segunda.

Nuno ocupa TI/quarta. Compras/segunda não pode ser Lia, então fica com Olga. Sobra Pessoal/terça para Lia.

### 4.3. Distribuição e agrupamento

Use caixas quando itens devem ocupar equipes, salas, grupos ou turnos.

```text
Equipe 1: [   ] [   ]
Equipe 2: [   ] [   ]
```

Antes de distribuir, registre:

- capacidade de cada destino;
- quantidade mínima ou máxima;
- itens obrigatoriamente juntos;
- itens incompatíveis;
- condições do tipo “se entra A, entra B”.

**Capacidade:** se uma sala comporta duas tarefas e já recebeu duas, ela está fechada para as demais.

**Mínimo:** se uma comissão de quatro precisa de pelo menos dois auditores e, após três escolhas, há apenas um auditor, a última vaga deve ser preenchida por auditor.

**Núcleo:** se A deve ficar com C e os grupos são duplas, `{A,C}` já forma uma dupla completa.

### 4.4. Relações direcionais

Em chefia, precedência, dependência e parentesco, defina a direção antes de combinar relações.

- “A chefia B” não é o mesmo que “A é chefiado por B”;
- “A está acima de B” e “B está acima de C” permitem concluir que A está acima de C;
- “A trabalha diretamente com B” e “B trabalha diretamente com C” não obrigam contato direto entre A e C.

Em parentesco, organize gerações em níveis e não presuma vínculos, gênero ou convenções não informadas.

### 4.5. Declarações verdadeiras e falsas como restrições

Quando o enunciado informa que exatamente uma, duas ou outra quantidade de falas é verdadeira, trate essa quantidade como condição global do cenário:

1. liste os cenários possíveis;
2. avalie cada fala em cada cenário;
3. conte quantas ficam verdadeiras;
4. conserve apenas os cenários compatíveis com a quantidade exigida.

Este uso é apenas uma aplicação relacional. O cálculo formal de proposições e tabelas-verdade pertence aos itens posteriores do edital.

## 5. Como escolher a representação

| Situação | Representação eficiente |
|---|---|
| fila, ranking, ordem de eventos | linha de posições |
| pessoa × setor × dia | tabela ou grade |
| equipes, salas, grupos | caixas com capacidade |
| chefia, dependência, precedência | setas com direção definida |
| poucas alternativas restantes | casos separados |

A melhor representação é a que deixa as restrições visíveis e reduz a necessidade de guardar informações mentalmente.

## 6. Método de resolução

### Passo 1 — leia primeiro o comando

Identifique se a pergunta pede:

- o que **pode ser**;
- o que **deve ser**;
- o que **não pode ser**;
- uma configuração completa.

Isso determina a prova necessária.

### Passo 2 — liste elementos e possibilidades

Conte pessoas, posições, grupos, vagas e categorias. Verifique se cada valor deve ser usado uma vez, se pode haver repetição e quais capacidades existem.

### Passo 3 — registre as condições fortes

Comece por:

- posição fixa;
- bloco de adjacência;
- quantidade exata;
- capacidade;
- incompatibilidade;
- elemento com poucas possibilidades.

Essas regras costumam produzir mais eliminações.

### Passo 4 — propague cada descoberta

Depois de atribuir ou eliminar algo:

- atualize a linha e a coluna de uma associação um a um;
- feche destinos cuja capacidade foi atingida;
- reserve vagas quando um mínimo ainda precisa ser cumprido;
- reaplique condições ativadas;
- procure elemento ou posição com única possibilidade restante.

### Passo 5 — abra casos apenas quando necessário

Se a dedução direta parar, divida o problema em poucos ramos explícitos.

```text
Caso 1: A está no grupo X.
Caso 2: A está no grupo Y.
```

Cada ramo continua sujeito a **todas** as regras originais. Ao surgir contradição, descarte o ramo inteiro.

### Passo 6 — valide a configuração

Antes de responder, releia cada condição. Uma grade completamente preenchida pode estar errada se violar uma única regra negativa ou de capacidade.

## 7. Deduções que economizam tempo

### 7.1. Única possibilidade restante

Se Paula só pode estar na terça, a atribuição é forçada.

### 7.2. Único lugar possível para um valor

Se cada setor deve ser usado exatamente uma vez e “Jurídico” só pode pertencer a Rui, Jurídico é de Rui, mesmo que Rui ainda apareça com outras possibilidades.

### 7.3. Subconjunto confinado

Se A e B só podem ocupar as posições 2 e 4, nenhum terceiro elemento pode usar 2 ou 4, embora ainda não se saiba qual dos dois ocupa cada posição.

### 7.4. Contradição por ordem

`A < B < C < A` é impossível. Uma ordem estrita não pode retornar ao ponto de partida.

### 7.5. Contradição por capacidade

Se uma distribuição exige mais itens em um destino do que sua capacidade permite, o caso deve ser eliminado.

## 8. Pode, deve e não pode

### 8.1. “Pode ser verdadeiro”

Basta construir **uma configuração completa válida** em que a alternativa ocorra.

### 8.2. “Deve ser verdadeiro”

A alternativa precisa ocorrer em **todas** as configurações válidas. Um bom método é tentar construir um contraexemplo.

### 8.3. “Não pode ser verdadeiro”

Assuma a alternativa e aplique as condições. Ela é impossível se todos os caminhos compatíveis com a hipótese levam a contradição.

### 8.4. Solução única

Encontrar uma solução não prova unicidade. Para afirmar que a solução é única, é preciso mostrar que os valores foram forçados ou que todas as demais possibilidades foram eliminadas.

## 9. Armadilhas frequentes

1. **Acrescentar regra não escrita.** Plausibilidade cotidiana não cria condição lógica.
2. **Confundir antes com imediatamente antes.**
3. **Fixar orientação em “ao lado”.**
4. **Inverter condição.** De `A → B` não se conclui `B → A`.
5. **Confundir “somente se” com “se”.**
6. **Ler “pelo menos” como “exatamente”.**
7. **Ignorar capacidade ou quantidade mínima.**
8. **Confirmar associação sem eliminar a mesma opção das demais linhas.**
9. **Transformar uma exclusão em atribuição antes da hora.**
10. **Aceitar solução parcial.**
11. **Usar um exemplo para provar “deve”.**
12. **Encontrar uma solução e presumir que é única.**
13. **Tratar relação não transitiva como transitiva.**
14. **Esquecer regras negativas durante a validação.**
15. **Abrir casos e deixar de aplicar uma condição original em algum ramo.**

## 10. Checklist de prova

Antes de marcar:

- [ ] usei somente as informações do enunciado?
- [ ] distingui precedência de adjacência?
- [ ] respeitei direção das relações condicionais?
- [ ] conferi capacidades, mínimos e quantidades exatas?
- [ ] propaguei associações um a um em linha e coluna?
- [ ] mantive todas as regras em cada caso?
- [ ] validei também as condições negativas?
- [ ] minha demonstração corresponde a “pode”, “deve” ou “não pode”?
