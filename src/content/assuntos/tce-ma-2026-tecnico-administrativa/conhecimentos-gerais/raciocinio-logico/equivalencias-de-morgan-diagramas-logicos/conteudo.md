---
schemaVersion: 1
title: Equivalências, leis de De Morgan e diagramas lógicos
description: Transformação segura de fórmulas proposicionais, negação de compostas e análise de relações categóricas por diagramas lógicos.
order: 39
storageId: tec-equivalencias-de-morgan
---

## 1. Escopo

Este assunto reúne três blocos do edital:

- **equivalências lógicas** entre fórmulas proposicionais;
- **leis de De Morgan** e negação de fórmulas compostas;
- **diagramas lógicos** para relações de inclusão, exclusão e existência entre classes.

As tabelas-verdade e as regras básicas dos conectivos foram estudadas no assunto anterior. Aqui elas aparecem como ferramenta de conferência. A lógica de primeira ordem, a notação formal de quantificadores e as operações gerais com conjuntos ficam para assuntos próprios.

## 2. Equivalência lógica

Duas fórmulas $P$ e $Q$ são **logicamente equivalentes** quando recebem o mesmo valor lógico em todas as atribuições possíveis de suas proposições simples.

$$
P \equiv Q
$$

Na tabela-verdade, isso significa que as colunas finais são idênticas linha por linha.

Exemplo central:

$$
p \to q \equiv \neg p \lor q.
$$

| $p$ | $q$ | $p \to q$ | $\neg p \lor q$ |
|:---:|:---:|:---:|:---:|
| V | V | V | V |
| V | F | F | F |
| F | V | V | V |
| F | F | V | V |

Uma coincidência em apenas uma ou algumas linhas não prova equivalência. Para refutá-la, basta uma atribuição em que as fórmulas tenham valores diferentes.

Outra forma de testar:

$$
P \equiv Q
\quad\Longleftrightarrow\quad
P \leftrightarrow Q\text{ é tautologia}.
$$

## 3. Substituição por equivalente

Se uma subfórmula é substituída por outra equivalente, o valor da fórmula maior é preservado, desde que se mantenham corretamente o agrupamento e o alcance dos conectivos.

Como:

$$
p \to q \equiv \neg p \lor q,
$$

então:

$$
r \land (p \to q)
\equiv
r \land (\neg p \lor q).
$$

Equivalência não autoriza apagar termos, trocar conectivos arbitrariamente nem mover parênteses sem justificativa.

## 4. Leis úteis de equivalência

As leis abaixo são suficientes para a maior parte das simplificações cobradas neste recorte.

| Lei | Forma |
|---|---|
| dupla negação | $\neg\neg p \equiv p$ |
| idempotência | $p \land p \equiv p$; $p \lor p \equiv p$ |
| comutatividade | $p \land q \equiv q \land p$; $p \lor q \equiv q \lor p$ |
| associatividade | $(p \land q)\land r \equiv p\land(q\land r)$; idem para $\lor$ |
| distributividade | $p\land(q\lor r)\equiv(p\land q)\lor(p\land r)$ |
| distributividade dual | $p\lor(q\land r)\equiv(p\lor q)\land(p\lor r)$ |
| complemento | $p\lor\neg p\equiv\top$; $p\land\neg p\equiv\bot$ |
| identidade | $p\land\top\equiv p$; $p\lor\bot\equiv p$ |
| absorção | $p\lor(p\land q)\equiv p$; $p\land(p\lor q)\equiv p$ |

Não é necessário decorar o nome de cada lei para resolver a questão, mas é importante reconhecer as transformações válidas. Quando houver dúvida, confira por tabela-verdade.

### Exemplo de simplificação

$$
(p\land q)\lor(p\land\neg q)
$$

Pela distributividade:

$$
p\land(q\lor\neg q).
$$

Como $q\lor\neg q$ é tautologia:

$$
p\land\top\equiv p.
$$

## 5. Equivalências da condicional

A condicional material possui três formas de alto rendimento:

$$
p \to q
\equiv
\neg p \lor q
\equiv
\neg(p\land\neg q).
$$

A terceira forma destaca o único caso proibido pela condicional: antecedente verdadeiro e consequente falso.

### 5.1. Contrapositiva

$$
p \to q
\equiv
\neg q \to \neg p.
$$

Se:

> Se o processo foi arquivado, então houve decisão.

uma forma equivalente é:

> Se não houve decisão, então o processo não foi arquivado.

### 5.2. Conversa, inversa e contrapositiva

Partindo de $p\to q$:

| Forma | Expressão | Relação com a original |
|---|---:|---|
| conversa | $q\to p$ | não equivale em geral |
| inversa | $\neg p\to\neg q$ | não equivale em geral |
| contrapositiva | $\neg q\to\neg p$ | equivalente |

Uma atribuição divergente basta para mostrar que a conversa não é equivalente à original. Por exemplo, com $p=V$ e $q=F$, $p\to q$ é F e $q\to p$ é V.

### 5.3. Negação da condicional

$$
\neg(p\to q)
\equiv
p\land\neg q.
$$

Negar “se $p$, então $q$” é afirmar exatamente a situação que torna a condicional falsa: $p$ ocorre e $q$ não ocorre.

## 6. Equivalências da bicondicional

A bicondicional exige as duas direções condicionais:

$$
p\leftrightarrow q
\equiv
(p\to q)\land(q\to p).
$$

Ela também pode ser escrita como:

$$
p\leftrightarrow q
\equiv
(p\land q)\lor(\neg p\land\neg q).
$$

A fórmula é verdadeira quando $p$ e $q$ possuem o mesmo valor.

Sua negação seleciona os casos de valores diferentes:

$$
\neg(p\leftrightarrow q)
\equiv
(p\land\neg q)\lor(\neg p\land q).
$$

Essa última forma corresponde à disjunção exclusiva.

## 7. Leis de De Morgan

As duas formas fundamentais são:

$$
\neg(p\land q)
\equiv
\neg p\lor\neg q
$$

$$
\neg(p\lor q)
\equiv
\neg p\land\neg q.
$$

A regra operacional tem dois movimentos simultâneos:

1. negar cada componente;
2. trocar $\land$ por $\lor$, ou $\lor$ por $\land$.

### 7.1. Linguagem natural

> Não é verdade que Ana protocolou o pedido **e** Bruno emitiu o recibo.

Equivale a:

> Ana não protocolou o pedido **ou** Bruno não emitiu o recibo.

O “ou” continua inclusivo: uma ou as duas ações podem ter falhado.

Já:

> Não é verdade que Ana protocolou o pedido **ou** Bruno emitiu o recibo.

Equivale a:

> Ana não protocolou o pedido **e** Bruno não emitiu o recibo.

### 7.2. Mais de duas componentes

$$
\neg(p\land q\land r)
\equiv
\neg p\lor\neg q\lor\neg r
$$

$$
\neg(p\lor q\lor r)
\equiv
\neg p\land\neg q\land\neg r.
$$

### 7.3. Fórmulas aninhadas

Em:

$$
\neg\bigl(p\lor(q\land r)\bigr),
$$

aplique De Morgan de fora para dentro:

$$
\neg p\land\neg(q\land r)
\equiv
\neg p\land(\neg q\lor\neg r).
$$

### 7.4. “Nem... nem...”

Na leitura proposicional usual:

$$
\text{nem }p\text{ nem }q
\equiv
\neg p\land\neg q
\equiv
\neg(p\lor q).
$$

## 8. Roteiro para transformar fórmulas

1. Preserve os parênteses e identifique o conectivo principal.
2. Elimine $\to$ ou $\leftrightarrow$ quando isso simplificar a expressão.
3. Aplique De Morgan respeitando o alcance da negação.
4. Elimine duplas negações.
5. Procure complementos, distributividade, identidade e absorção.
6. Registre apenas transformações justificadas.
7. Se houver dúvida, compare tabelas-verdade ou encontre uma atribuição divergente.

Exemplo:

$$
\neg(p\to q)
\equiv
\neg(\neg p\lor q)
\equiv
\neg\neg p\land\neg q
\equiv
p\land\neg q.
$$

## 9. Diagramas lógicos

Nos diagramas deste assunto, círculos ou regiões representam **classes de objetos**. A finalidade é visualizar relações de inclusão, exclusão e existência e verificar se uma conclusão decorre necessariamente das premissas.

Não confunda esse uso com letras proposicionais: em $p\to q$, $p$ e $q$ representam afirmações inteiras; no diagrama, $A$, $B$ e $C$ representam classes.

### 9.1. Convenção operacional

Neste material, use:

- região **hachurada**: vazia;
- **X**: existe ao menos um objeto naquela região;
- região em branco: existência não determinada;
- X sobre uma fronteira: existe um objeto, mas as premissas não determinam em qual das sub-regiões adjacentes ele está.

![Quatro diagramas categóricos: todo A é B, nenhum A é B, algum A é B e algum A não é B.](./images/formas-categoricas.svg)

## 10. Quatro formas categóricas

| Afirmação | Leitura diagramática |
|---|---|
| Todo $A$ é $B$ | a região de $A$ fora de $B$ fica vazia |
| Nenhum $A$ é $B$ | a interseção $A\cap B$ fica vazia |
| Algum $A$ é $B$ | existe X em $A\cap B$ |
| Algum $A$ não é $B$ | existe X em $A$ fora de $B$ |

### 10.1. Todo A é B

$$
A\subseteq B.
$$

A inclusão não autoriza inverter a relação. De “todo auditor é servidor” não se conclui “todo servidor é auditor”.

### 10.2. Nenhum A é B

$$
A\cap B=\varnothing.
$$

A exclusão é simétrica: se nenhum $A$ é $B$, nenhum $B$ é $A$.

### 10.3. Algum A é B

$$
A\cap B\neq\varnothing.
$$

Há pelo menos um objeto na interseção.

### 10.4. Algum A não é B

$$
A\setminus B\neq\varnothing.
$$

Há pelo menos um objeto em $A$ que está fora de $B$.

## 11. Negação das formas categóricas

| Afirmação | Negação correta |
|---|---|
| Todo $A$ é $B$ | Algum $A$ não é $B$ |
| Nenhum $A$ é $B$ | Algum $A$ é $B$ |
| Algum $A$ é $B$ | Nenhum $A$ é $B$ |
| Algum $A$ não é $B$ | Todo $A$ é $B$ |

A ideia central é simples: negar uma universal exige um contraexemplo; negar uma existência elimina todos os casos daquele tipo.

## 12. Existência no diagrama

Como convenção operacional de Venn adotada neste material:

- uma premissa universal **restringe regiões**, mas não autoriza inserir X por si só;
- uma premissa existencial, como “algum”, autoriza inserir X;
- informação sobre um indivíduo determinado também pode fornecer existência;
- se a questão declarar convenção diferente, siga expressamente o enunciado.

Assim, de “todo $A$ é $B$” não se deve concluir automaticamente “algum $A$ é $B$”.

## 13. Diagramas com três classes

Quando houver três classes:

1. desenhe as sobreposições ainda possíveis;
2. lance primeiro as premissas universais, hachurando as regiões proibidas;
3. depois posicione os X das premissas existenciais;
4. se o X puder ocupar duas sub-regiões, mantenha-o sobre a fronteira pertinente;
5. não acrescente relação que não esteja nas premissas.

A ordem ajuda a evitar que um X seja colocado em região que uma universal já tornou impossível.

## 14. Padrões de inferência diagramática

### 14.1. Inclusões encadeadas

Se:

$$
A\subseteq B
\quad\text{e}\quad
B\subseteq C,
$$

então:

$$
A\subseteq C.
$$

Logo, de “todo auditor é servidor” e “todo servidor é capacitado” segue “todo auditor é capacitado”.

### 14.2. Existência no conjunto menor sobe para o maior

Premissas:

1. Todo auditor é servidor.
2. Algum auditor é gestor.

O objeto que é auditor e gestor também é servidor. Portanto, algum servidor é gestor.

### 14.3. Existência no conjunto maior não desce para o menor

Premissas:

1. Todo auditor é servidor.
2. Algum servidor é gestor.

O servidor gestor pode estar fora da classe dos auditores. Portanto, não é necessário que algum auditor seja gestor.

### 14.4. Inclusão e exclusão

Se todo $A$ é $B$ e nenhum $B$ é $C$, então nenhum $A$ é $C$.

### 14.5. Existência e exclusão

Se algum $A$ é $B$ e nenhum $B$ é $C$, o objeto existente em $A\cap B$ está fora de $C$. Logo, algum $A$ não é $C$.

## 15. Necessário, possível e incompatível

Uma conclusão é:

- **necessária** quando vale em todos os diagramas compatíveis com as premissas;
- **possível** quando vale em pelo menos um diagrama admissível, mas não em todos;
- **incompatível** quando viola alguma restrição das premissas.

Para refutar a necessidade de uma conclusão, basta construir um único diagrama compatível em que ela seja falsa.

## 16. Pegadinhas recorrentes

- Mesma verdade em uma linha não prova equivalência.
- Conversa não é contrapositiva.
- $\neg(p\to q)\equiv p\land\neg q$.
- De Morgan nega cada parcela **e troca o conectivo**.
- Parênteses definem o alcance da negação.
- Não existe cancelamento informal de letras proposicionais.
- “Todo $A$ é $B$” não implica “todo $B$ é $A$”.
- No método diagramático adotado, universal sozinha não autoriza inserir X.
- Região em branco não significa região ocupada.
- X não deve ser colocado na posição mais conveniente quando as premissas deixam alternativas.
- Conclusão apenas possível não é conclusão necessária.

## 17. Roteiro de resolução

### Equivalências e De Morgan

1. Preserve agrupamentos.
2. Identifique a fórmula que precisa ser transformada.
3. Use equivalências centrais de $\to$ e $\leftrightarrow$ quando necessário.
4. Aplique De Morgan e dupla negação.
5. Simplifique por leis reconhecíveis.
6. Confira por tabela ou contraexemplo se houver dúvida.

### Diagramas

1. Defina as classes.
2. Traduza “todo”, “nenhum”, “algum” e “algum não”.
3. Hachure regiões proibidas pelas universais.
4. Posicione X apenas quando houver informação existencial.
5. Preserve posições indeterminadas.
6. Teste a conclusão em todos os arranjos compatíveis.

## 18. Síntese

- Equivalência exige o mesmo valor em todas as atribuições.
- Uma linha divergente refuta equivalência.
- $p\to q\equiv\neg p\lor q\equiv\neg q\to\neg p$.
- $\neg(p\to q)\equiv p\land\neg q$.
- $p\leftrightarrow q$ exige valores iguais; sua negação exige valores diferentes.
- De Morgan troca $\land$ por $\lor$ e vice-versa, negando todas as parcelas.
- Diagramas representam classes e restrições de inclusão, exclusão e existência.
- No método adotado, universais hachuram regiões; existenciais inserem X.
- Uma conclusão categórica necessária deve valer em todo diagrama compatível.

## Referências

- CEBRASPE. [Edital do concurso público do TCE/MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Conteúdo programático vigente consultado em 2026.
- UNIVERSIDADE FEDERAL DE MINAS GERAIS. [Fundamentos da lógica](https://homepages.dcc.ufmg.br/~loureiro/md/md_1FundamentosDaLogica.pdf). Departamento de Ciência da Computação.
- UNIVERSIDADE FEDERAL DE MATO GROSSO DO SUL. [Lógica proposicional](https://www.facom.ufms.br/~eah/ftc/logica-4p.pdf). Faculdade de Computação.
