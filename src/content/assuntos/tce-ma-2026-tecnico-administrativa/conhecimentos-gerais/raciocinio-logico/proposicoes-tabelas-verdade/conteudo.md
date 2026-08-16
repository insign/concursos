---
schemaVersion: 1
title: Proposições simples e compostas e tabelas-verdade
description: Reconhecimento de proposições, formalização por conectivos e construção e interpretação de tabelas-verdade de fórmulas proposicionais.
order: 38
storageId: tec-proposicoes-tabelas
---

## 1. Recorte do assunto

Este assunto cobre o núcleo da **lógica proposicional** exigido nos itens 3.1 e 3.2 do edital: reconhecer proposições, distinguir simples e compostas, traduzir conectivos e construir ou interpretar tabelas-verdade.

Aqui entram:

- proposições e valores V/F;
- proposições simples e compostas;
- negação, conjunção, disjunção inclusiva, disjunção exclusiva, condicional e bicondicional;
- condições suficiente e necessária;
- alcance dos conectivos e uso de parênteses;
- quantidade de linhas e montagem de tabelas-verdade;
- avaliação de fórmulas em atribuições dadas;
- reconhecimento, pela coluna final, de tautologia, contradição e contingência.

Ficam para o assunto seguinte as **equivalências**, as **leis de De Morgan** e os **diagramas lógicos**. Aqui uma fórmula pode ser avaliada por tabela, mas não é transformada em outra por leis de equivalência.

## 2. Proposição e valor lógico

Uma **proposição** é uma afirmação declarativa à qual se pode atribuir, em contexto determinado, exatamente um dos valores:

- **V** — verdadeiro;
- **F** — falso.

Exemplos:

- “São Luís é a capital do Maranhão.” — proposição verdadeira;
- “O número 10 é ímpar.” — proposição falsa.

Não é necessário conhecer previamente o valor de uma afirmação para reconhecê-la como proposição. O ponto é saber se, no contexto considerado, ela afirma algo que pode ser verdadeiro ou falso.

Na lógica clássica bivalente adotada neste assunto, uma proposição recebe **um e somente um** dos valores V ou F em cada interpretação.

## 3. O que não é proposição

Não recebem V/F, em regra:

- **perguntas:** “O relatório foi entregue?”;
- **ordens ou pedidos:** “Entregue o relatório.”;
- **exclamações sem afirmação avaliável:** “Que surpresa!”;
- **sentenças abertas:** “x + 2 = 7”, sem valor fixado para x.

Uma sentença aberta pode tornar-se proposição quando a variável é substituída por valor determinado ou quando o enunciado é fechado por recurso próprio da lógica de primeira ordem.

> Pergunta ou ordem não é “proposição falsa”: simplesmente não recebe valor lógico.

## 4. Proposições simples e compostas

Uma **proposição simples** ou **atômica** é tratada como unidade, sem combinação proposicional por conectivos.

Exemplos:

- p: “A auditoria começou.”
- q: “O relatório está pronto.”

Uma **proposição composta** resulta da aplicação de um ou mais conectivos a proposições:

- ¬p — “A auditoria não começou.”
- p ∧ q — “A auditoria começou e o relatório está pronto.”
- p ∨ q — “A auditoria começou ou o relatório está pronto.”
- p → q — “Se a auditoria começou, então o relatório está pronto.”
- p ↔ q — “A auditoria começou se e somente se o relatório está pronto.”

Na prova, use a decomposição indicada pelo enunciado e identifique os conectivos efetivamente presentes. Não conte proposições apenas pelo número de palavras ou verbos.

## 5. Conectivos fundamentais

| Operação | Forma | Regra de verdade |
|---|---:|---|
| negação | ¬p | inverte o valor de p |
| conjunção | p ∧ q | V somente em V/V |
| disjunção inclusiva | p ∨ q | F somente em F/F |
| disjunção exclusiva | p ⊻ q | V quando exatamente uma é V |
| condicional | p → q | F somente em V/F |
| bicondicional | p ↔ q | V quando os valores são iguais |

A disjunção exclusiva também pode aparecer com outros símbolos, como ⊕. O essencial é a regra: **exatamente uma** componente verdadeira.

## 6. Negação

A negação inverte o valor lógico:

| p | ¬p |
|:---:|:---:|
| V | F |
| F | V |

O alcance é decisivo:

- ¬p nega apenas p;
- ¬(p ∧ q) nega a conjunção inteira;
- (¬p) ∧ q nega p e depois combina o resultado com q.

Neste assunto, avalie cada fórmula pela tabela ou pelos valores fornecidos. A transformação de ¬(p ∧ q) em fórmula equivalente pertence ao estudo de De Morgan.

## 7. Conjunção

A conjunção p ∧ q é verdadeira somente quando **ambas** são verdadeiras.

| p | q | p ∧ q |
|:---:|:---:|:---:|
| V | V | V |
| V | F | F |
| F | V | F |
| F | F | F |

Na formalização básica, palavras como “e”, “mas”, “embora” e “tanto... quanto” normalmente combinam as afirmações pela regra da conjunção.

**Atalho:** uma componente F já torna toda a conjunção F.

## 8. Disjunções

### 8.1. Disjunção inclusiva

O “ou” lógico simples é inclusivo, salvo indicação de exclusividade.

| p | q | p ∨ q |
|:---:|:---:|:---:|
| V | V | V |
| V | F | V |
| F | V | V |
| F | F | F |

**Atalho:** uma componente V já torna a disjunção inclusiva V.

### 8.2. Disjunção exclusiva

A disjunção exclusiva é verdadeira quando exatamente uma componente é verdadeira.

| p | q | p ⊻ q |
|:---:|:---:|:---:|
| V | V | F |
| V | F | V |
| F | V | V |
| F | F | F |

Indícios:

- “ou p ou q, mas não ambos”;
- “exatamente uma”; 
- “um ou outro, exclusivamente”.

Não presuma exclusividade quando o enunciado disser apenas “ou”.

## 9. Condicional

A condicional p → q é lida “se p, então q”.

- p = **antecedente**;
- q = **consequente**.

| p | q | p → q |
|:---:|:---:|:---:|
| V | V | V |
| V | F | **F** |
| F | V | V |
| F | F | V |

A única linha falsa é **V → F**.

Consequências práticas:

- antecedente F torna a condicional V;
- consequente V torna a condicional V;
- a tabela da condicional material não exige causalidade, ordem temporal nem assunto comum entre p e q.

## 10. Condição suficiente e condição necessária

Em p → q:

- p é condição **suficiente** para q;
- q é condição **necessária** para p.

| Linguagem | Forma |
|---|---|
| se p, então q | p → q |
| p implica q | p → q |
| p é suficiente para q | p → q |
| q é necessário para p | p → q |
| p somente se q | p → q |
| p se q | q → p |

### Se × somente se

- “Rui será nomeado **se** for aprovado” → aprovação é suficiente: a → n.
- “Rui será nomeado **somente se** for aprovado” → aprovação é necessária: n → a.

> “Somente se” introduz a condição necessária, isto é, o lado direito da seta.

## 11. Bicondicional

A bicondicional p ↔ q é verdadeira quando p e q têm o **mesmo valor**.

| p | q | p ↔ q |
|:---:|:---:|:---:|
| V | V | V |
| V | F | F |
| F | V | F |
| F | F | V |

Leituras usuais:

- “p se e somente se q”;
- “p exatamente quando q”;
- “p é condição necessária e suficiente para q”.

Compare:

| Valores de p e q | p ↔ q | p ⊻ q |
|---|:---:|:---:|
| iguais | V | F |
| diferentes | F | V |

## 12. Fórmula, subfórmula e parênteses

Em

(p ∨ q) ∧ ¬r,

há três etapas relevantes:

1. p ∨ q;
2. ¬r;
3. a conjunção entre os dois resultados.

O conectivo executado por último é o **conectivo principal** da fórmula.

Os parênteses fixam o agrupamento. Compare:

- p ∨ (q ∧ r);
- (p ∨ q) ∧ r.

As estruturas podem produzir valores diferentes. Ao formalizar, use parênteses sempre que houver risco de ambiguidade e respeite a convenção indicada pela banca.

## 13. Quantidade de linhas

Se uma fórmula contém n proposições simples **distintas**, a tabela completa possui:

**2ⁿ linhas.**

| n | Linhas |
|:---:|:---:|
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |
| 4 | 16 |
| 5 | 32 |

Conta-se cada letra distinta uma única vez. Repetições não aumentam o número de linhas.

Exemplo: (p ∧ q) ∨ (p ∧ ¬q) contém apenas p e q; portanto, a tabela tem 2² = 4 linhas.

## 14. Como montar a tabela-verdade

### 14.1. Enumere as atribuições

Para p, q e r:

| p | q | r |
|:---:|:---:|:---:|
| V | V | V |
| V | V | F |
| V | F | V |
| V | F | F |
| F | V | V |
| F | V | F |
| F | F | V |
| F | F | F |

Outra ordem é válida desde que todas as combinações apareçam uma única vez.

### 14.2. Resolva por subfórmulas

Para (p ∨ q) ∧ ¬p:

| p | q | p ∨ q | ¬p | resultado |
|:---:|:---:|:---:|:---:|:---:|
| V | V | V | F | F |
| V | F | V | F | F |
| F | V | V | V | V |
| F | F | F | V | F |

Método:

1. liste as letras distintas;
2. calcule 2ⁿ;
3. enumere V/F;
4. identifique o conectivo principal;
5. crie colunas para as subfórmulas;
6. resolva das partes internas para a fórmula completa;
7. leia a coluna final.

## 15. Avaliação sem tabela completa

Se os valores das letras já forem fornecidos, substitua-os e resolva as subfórmulas.

Exemplo:

(p → q) ↔ ¬r, com p=V, q=F e r=V.

1. p → q = F;
2. ¬r = F;
3. F ↔ F = V.

Logo, a fórmula vale V nessa atribuição.

Também é possível usar atalhos diretos das tabelas fundamentais:

- conjunção com F → F;
- disjunção inclusiva com V → V;
- condicional com antecedente F → V;
- condicional com consequente V → V;
- bicondicional: compare igualdade;
- exclusiva: compare diferença.

## 16. Tautologia, contradição e contingência

A classificação considera a **coluna final completa**:

| Coluna final | Classificação |
|---|---|
| somente V | tautologia |
| somente F | contradição |
| pelo menos um V e um F | contingência |

Exemplos:

- p ∨ ¬p — tautologia;
- p ∧ ¬p — contradição;
- p → q — contingência.

Uma única linha F já mostra que a fórmula **não é tautologia**, mas as demais linhas ainda precisam ser examinadas para distinguir contradição de contingência.

## 17. Tradução da linguagem natural

Defina primeiro as proposições básicas e depois traduza os conectivos.

Se:

- p: “O cadastro está completo.”
- q: “O comprovante será emitido.”

então:

- “O comprovante será emitido **se** o cadastro estiver completo” → p → q;
- “O comprovante será emitido **somente se** o cadastro estiver completo” → q → p;
- “Não é verdade que o cadastro está completo e o comprovante foi emitido” → ¬(p ∧ q);
- “O cadastro não está completo e o comprovante foi emitido” → (¬p) ∧ q.

Preserve sempre o alcance da negação e não acrescente exclusividade que o enunciado não informou.

## 18. Pegadinhas de prova

1. **Valor desconhecido = não proposição.** Errado: o valor pode ser desconhecido pelo candidato e ainda assim existir no modelo.
2. **Pergunta ou ordem = proposição falsa.** Errado: não recebem V/F.
3. **Número de linhas = número de ocorrências de letras.** Errado: use letras distintas.
4. **“Ou” simples é exclusivo.** Errado: em regra é inclusivo.
5. **Condicional é falsa com antecedente F.** Errado: F → V e F → F são verdadeiras.
6. **Bicondicional exige V/V.** Errado: F/F também produz V.
7. **“p somente se q” = q → p.** Errado: significa p → q.
8. **Parênteses são decorativos.** Errado: mudam o agrupamento.
9. **Uma linha F torna a fórmula contradição.** Errado: apenas elimina a possibilidade de tautologia.
10. **Negar p ∧ q é o mesmo que negar apenas p.** Errado: o alcance é diferente.

## 19. Síntese

- proposição recebe V ou F; pergunta, ordem e sentença aberta não;
- simples é tratada como unidade; composta usa conectivos;
- ¬ inverte;
- ∧ exige todas V;
- ∨ inclusiva exige ao menos uma V;
- ⊻ exige exatamente uma V;
- → só é F em V/F;
- ↔ é V com valores iguais;
- em p → q, p é suficiente e q é necessária;
- p somente se q = p → q;
- n letras distintas geram 2ⁿ linhas;
- tabelas são resolvidas por subfórmulas;
- coluna final só V = tautologia; só F = contradição; mistura = contingência.

## Referências

- CEBRASPE. [Edital do concurso público do TCE/MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Conteúdo programático vigente consultado em 18 jul. 2026.
- UNIVERSIDADE FEDERAL DE MINAS GERAIS. [Fundamentos da lógica](https://homepages.dcc.ufmg.br/~loureiro/md/md_1FundamentosDaLogica.pdf). Departamento de Ciência da Computação. Material didático consultado em 18 jul. 2026.
- UNIVERSIDADE FEDERAL DE MATO GROSSO DO SUL. [Lógica proposicional](https://www.facom.ufms.br/~eah/ftc/logica-4p.pdf). Faculdade de Computação. Material didático consultado em 18 jul. 2026.
