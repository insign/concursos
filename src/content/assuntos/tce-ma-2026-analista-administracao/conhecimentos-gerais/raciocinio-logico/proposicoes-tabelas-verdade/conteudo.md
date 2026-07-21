---
schemaVersion: 1
title: Proposições simples e compostas e tabelas-verdade
description: Reconhecimento de proposições, formalização por conectivos e construção e interpretação de tabelas-verdade de fórmulas proposicionais.
order: 38
storageId: proposicoes-tabelas-verdade
---

## 1. Escopo

Este assunto apresenta as unidades e as operações básicas da lógica proposicional. O candidato deve reconhecer o que pode receber valor lógico, distinguir proposições simples e compostas, traduzir conectivos da linguagem natural e construir tabelas-verdade sem depender de intuição sobre o tema das frases.

O recorte inclui:

- proposições e valores verdadeiro e falso;
- proposições simples e compostas;
- negação, conjunção, disjunções, condicional e bicondicional;
- leitura de condições suficientes e necessárias;
- número de linhas e construção de tabelas-verdade;
- avaliação de fórmulas e classificação por sua coluna final;
- tautologia, contradição e contingência reconhecidas diretamente pela tabela.

Ficam para assuntos próprios as transformações por equivalência, as leis de De Morgan, os diagramas lógicos, a lógica de primeira ordem, os princípios de contagem e probabilidade e as operações com conjuntos. Aqui uma fórmula pode ser avaliada integralmente por tabela, mas não será substituída por outra mediante leis de equivalência.

## 2. Proposição e valor lógico

Uma **proposição** é uma afirmação declarativa à qual, em um contexto determinado, se pode atribuir exatamente um dos dois valores lógicos:

- **V**, verdadeiro;
- **F**, falso.

Exemplos:

- “São Luís é a capital do Maranhão.” é uma proposição verdadeira;
- “O número 10 é ímpar.” é uma proposição falsa;
- “O relatório foi entregue em 17 de julho de 2026.” é uma proposição se o relatório e a data estiverem identificados, ainda que seja necessário consultar os fatos para descobrir seu valor.

### 2.1. Valor desconhecido não significa ausência de valor

Não é preciso conhecer o valor para reconhecer uma proposição. A frase “Há vida microbiana fora da Terra” pretende afirmar algo que é verdadeiro ou falso, embora o examinando talvez não consiga determinar qual valor corresponde aos fatos.

Assim, diferencie:

- **ter valor lógico:** a afirmação admite verdade ou falsidade;
- **conhecer o valor lógico:** o avaliador dispõe de informação para decidir entre V e F.

### 2.2. O contexto precisa fixar a afirmação

Expressões vagas podem depender do contexto:

> O processo está concluído.

Se o processo e o momento de referência estiverem determinados, a frase pode ser avaliada e funciona como proposição. Sem essa identificação, a prova pode tratá-la como enunciado insuficientemente determinado.

Pronomes, tempo e lugar não impedem proposição por si: o problema surge quando o contexto não permite saber qual afirmação está sendo feita.

### 2.3. Princípio bivalente

Na lógica proposicional clássica usada neste assunto, cada proposição recebe um, e somente um, dos valores V ou F. Não há terceiro valor, nem uma proposição é simultaneamente verdadeira e falsa na mesma interpretação.

Isso é uma regra do modelo lógico adotado. Dúvida, opinião ou falta de informação do candidato não criam um terceiro valor.

## 3. O que não é proposição

### 3.1. Perguntas

> O processo foi concluído?

A frase solicita uma resposta; não afirma que o processo foi ou não foi concluído. Portanto, não recebe V ou F.

### 3.2. Ordens, pedidos e conselhos

> Conclua o processo hoje.

Uma ordem pode ser obedecida ou desobedecida, adequada ou inadequada, mas não é verdadeira nem falsa.

### 3.3. Exclamações sem afirmação completa

> Que resultado surpreendente!

A expressão manifesta reação, sem formular necessariamente uma afirmação avaliável. Uma frase exclamativa declarativa, porém, ainda pode ser proposição: “O resultado foi surpreendente!” afirma algo cujo valor depende de um critério contextual.

### 3.4. Sentenças abertas

> $x + 2 = 7$

Sem valor atribuído a $x$ ou outra forma de fechar a expressão, o resultado depende da variável. Trata-se de uma **sentença aberta**, não de uma proposição determinada.

Ao substituir $x$ por 5, obtém-se “$5 + 2 = 7$”, que é proposição verdadeira. O tratamento formal de variáveis, predicados e quantificadores pertence à lógica de primeira ordem.

### 3.5. Paradoxos e formulações sem valor estável

> Esta frase é falsa.

Essa formulação autorreferente não recebe coerentemente um dos dois valores do modelo bivalente: se for verdadeira, diz ser falsa; se for falsa, o que diz parece verdadeiro. Questões de concurso normalmente usam casos mais diretos, mas o exemplo mostra que ter forma declarativa não basta quando não se pode atribuir valor lógico consistente.

## 4. Proposição simples

Uma **proposição simples**, também chamada **atômica**, não é construída, na análise adotada, pela combinação de outras proposições por conectivos lógicos.

Exemplos:

- $p$: “A auditoria começou.”
- $q$: “O relatório está pronto.”
- $r$: “A equipe foi convocada.”

As letras minúsculas representam proposições inteiras. Seu conteúdo interno não é decomposto neste nível.

### 4.1. A gramática superficial pode enganar

Não se deve contar proposições apenas pelo número de verbos ou substantivos. Considere:

> Ana e Bruno compareceram.

Conforme a finalidade da formalização, a frase pode ser tratada como uma afirmação atômica ou analisada como “Ana compareceu e Bruno compareceu”. A prova costuma deixar clara a decomposição pretendida ou fornecer proposições básicas. O critério lógico é a estrutura escolhida para a análise, não uma contagem mecânica de palavras.

## 5. Proposição composta

Uma **proposição composta**, também chamada **molecular**, resulta da aplicação de um ou mais conectivos a proposições.

Se:

- $p$: “A auditoria começou.”
- $q$: “O relatório está pronto.”

então são compostas:

- $\neg p$: “A auditoria não começou.”
- $p \land q$: “A auditoria começou e o relatório está pronto.”
- $p \lor q$: “A auditoria começou ou o relatório está pronto.”
- $p \to q$: “Se a auditoria começou, então o relatório está pronto.”
- $p \leftrightarrow q$: “A auditoria começou se e somente se o relatório está pronto.”

O valor de uma composta é determinado pelos valores das proposições componentes e pela regra do conectivo.

## 6. Conectivos fundamentais

| Operação | Símbolo | Leitura básica | Condição de verdade |
|---|---:|---|---|
| negação | $\neg p$ | não $p$ | verdadeira quando $p$ é falsa |
| conjunção | $p \land q$ | $p$ e $q$ | verdadeira somente quando ambas são verdadeiras |
| disjunção inclusiva | $p \lor q$ | $p$ ou $q$ | falsa somente quando ambas são falsas |
| disjunção exclusiva | $p \veebar q$ | ou $p$ ou $q$, mas não ambos | verdadeira quando exatamente uma é verdadeira |
| condicional | $p \to q$ | se $p$, então $q$ | falsa somente quando $p$ é verdadeira e $q$ é falsa |
| bicondicional | $p \leftrightarrow q$ | $p$ se e somente se $q$ | verdadeira quando $p$ e $q$ têm o mesmo valor |

Algumas bancas usam símbolos diferentes para a disjunção exclusiva, como $\oplus$. A regra semântica é mais importante que a forma gráfica: exatamente uma componente deve ser verdadeira.

## 7. Negação

A negação inverte o valor lógico da proposição.

| $p$ | $\neg p$ |
|:---:|:---:|
| V | F |
| F | V |

Se $p$ significa “O parecer foi publicado”, então $\neg p$ significa “O parecer não foi publicado”.

### 7.1. Alcance da negação

Parênteses identificam o trecho negado:

- $\neg p$: nega somente $p$;
- $\neg(p \land q)$: nega o resultado completo da conjunção;
- $(\neg p) \land q$: primeiro nega $p$ e depois combina o resultado com $q$.

As duas últimas fórmulas não devem ser confundidas. Neste assunto, o valor de cada uma pode ser calculado por sua própria tabela. Regras para transformar uma em outra ficam no estudo de equivalências e leis de De Morgan.

## 8. Conjunção

A conjunção $p \land q$ exige que as duas componentes sejam verdadeiras.

| $p$ | $q$ | $p \land q$ |
|:---:|:---:|:---:|
| V | V | V |
| V | F | F |
| F | V | F |
| F | F | F |

Em linguagem natural, aparecem formulações como:

- “$p$ e $q$”;
- “$p$, mas $q$”;
- “tanto $p$ quanto $q$”;
- “$p$, embora $q$”.

“Mas” e “embora” podem acrescentar contraste discursivo, porém, na avaliação proposicional básica, normalmente conectam duas afirmações pela regra da conjunção.

## 9. Disjunção inclusiva

Na lógica proposicional, o “ou” simples é **inclusivo**, salvo indicação de exclusividade. $p \lor q$ é verdadeira quando ao menos uma componente é verdadeira, inclusive quando ambas são verdadeiras.

| $p$ | $q$ | $p \lor q$ |
|:---:|:---:|:---:|
| V | V | V |
| V | F | V |
| F | V | V |
| F | F | F |

Exemplo:

> O pedido pode ser protocolado presencialmente ou pela internet.

Sem restrição adicional, a disponibilidade dos dois meios não torna a frase falsa. O enunciado afirma que pelo menos um meio está disponível.

## 10. Disjunção exclusiva

A disjunção exclusiva é verdadeira quando exatamente uma componente é verdadeira e falsa quando as duas têm o mesmo valor.

| $p$ | $q$ | $p \veebar q$ |
|:---:|:---:|:---:|
| V | V | F |
| V | F | V |
| F | V | V |
| F | F | F |

Indícios linguísticos:

- “ou $p$ ou $q$, mas não ambos”;
- “exatamente uma das alternativas”;
- “um ou outro, exclusivamente”.

A palavra “ou” isolada não autoriza presumir exclusividade. Leia o contexto e eventuais expressões restritivas.

## 11. Condicional

A condicional $p \to q$ é lida “se $p$, então $q$”. $p$ é o **antecedente** e $q$ é o **consequente**.

| $p$ | $q$ | $p \to q$ |
|:---:|:---:|:---:|
| V | V | V |
| V | F | F |
| F | V | V |
| F | F | V |

A única linha falsa apresenta antecedente verdadeiro e consequente falso. É justamente a situação que viola o compromisso: $p$ ocorreu, mas $q$ não.

### 11.1. Antecedente falso

Se $p$ é falso, $p \to q$ é verdadeira na semântica da condicional material, qualquer que seja $q$. Isso não afirma que o antecedente causou o consequente nem que a frase seja informativa no cotidiano. É a regra de valor usada pelo cálculo proposicional.

Exemplo:

> Se 10 é ímpar, então São Luís é a capital do Maranhão.

O antecedente é falso e o consequente é verdadeiro; a condicional material recebe V, ainda que não exista relação temática entre as frases.

### 11.2. Condicional não exige causalidade

$p \to q$ registra uma condição de verdade. Ela não afirma automaticamente:

- que $p$ causa $q$;
- que $p$ ocorreu antes de $q$;
- que as frases compartilham assunto;
- que $q$ só pode ocorrer por causa de $p$.

Em problemas contextualizados, uma relação causal pode ser parte do conteúdo, mas não integra a tabela-verdade do conectivo.

## 12. Condição suficiente e condição necessária

Na condicional $p \to q$:

- $p$ é condição **suficiente** para $q$;
- $q$ é condição **necessária** para $p$.

O compromisso da fórmula é: sempre que $p$ for verdadeira, $q$ também será. Ela não exige que $q$ dependa exclusivamente de $p$.

### 12.1. Formas linguísticas frequentes

| Linguagem natural | Forma |
|---|---|
| se $p$, então $q$ | $p \to q$ |
| $p$ implica $q$ | $p \to q$ |
| $p$ é suficiente para $q$ | $p \to q$ |
| $q$ é necessário para $p$ | $p \to q$ |
| $p$ somente se $q$ | $p \to q$ |
| $p$ se $q$ | $q \to p$ |

### 12.2. “Se” e “somente se”

Compare:

- “Rui será nomeado **se** for aprovado”: aprovação é suficiente para nomeação, $a \to n$;
- “Rui será nomeado **somente se** for aprovado”: aprovação é necessária para nomeação, $n \to a$.

“Somente se” introduz a condição necessária, isto é, o consequente da seta. Inverter essa leitura é uma pegadinha recorrente.

## 13. Bicondicional

A bicondicional $p \leftrightarrow q$ é lida “$p$ se e somente se $q$”. Ela é verdadeira quando as duas componentes têm o mesmo valor.

| $p$ | $q$ | $p \leftrightarrow q$ |
|:---:|:---:|:---:|
| V | V | V |
| V | F | F |
| F | V | F |
| F | F | V |

A bicondicional expressa necessidade e suficiência recíprocas: no modelo, $p$ e $q$ devem ocorrer juntas ou deixar de ocorrer juntas.

Formulações usuais:

- “$p$ se e somente se $q$”;
- “$p$ é condição necessária e suficiente para $q$”;
- “$p$ exatamente quando $q$”.

## 14. Fórmula e subfórmula

Uma fórmula composta pode conter várias etapas. Em

$$
(p \lor q) \land \neg r,
$$

há as subfórmulas:

1. $p \lor q$;
2. $\neg r$;
3. $(p \lor q) \land \neg r$, a fórmula completa.

Cada coluna intermediária da tabela pode corresponder a uma dessas etapas. Essa decomposição reduz erros e deixa explícito qual operação é executada por último.

## 15. Parênteses e precedência

Os parênteses fixam o agrupamento:

- $p \lor (q \land r)$ combina $q$ com $r$ antes da disjunção;
- $(p \lor q) \land r$ combina $p$ com $q$ antes da conjunção.

Essas fórmulas podem produzir resultados diferentes.

A negação normalmente atua primeiro sobre a fórmula imediatamente seguinte. Entre conectivos binários, materiais didáticos podem adotar convenções de precedência distintas. Por isso:

1. respeite os parênteses fornecidos;
2. siga a convenção expressamente indicada pela banca;
3. ao formalizar, use parênteses sempre que o agrupamento influenciar o resultado.

Não se deve alterar o agrupamento por intuição linguística depois que a fórmula está fixada.

## 16. Quantidade de linhas

Se a fórmula contém $n$ proposições simples **distintas**, sua tabela-verdade completa possui

$$
2^n
$$

linhas.

| Proposições distintas | Linhas |
|:---:|:---:|
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |
| 4 | 16 |
| 5 | 32 |

Conta-se cada letra distinta apenas uma vez. A fórmula $(p \land q) \lor (p \land \neg q)$ contém muitas ocorrências, mas somente duas proposições distintas, $p$ e $q$; sua tabela possui quatro linhas.

### 16.1. Por que $2^n$?

Cada proposição simples admite duas escolhas, V ou F. Com $n$ proposições independentes na enumeração, há duas escolhas para cada uma, totalizando o produto de $n$ fatores iguais a 2.

Essa justificativa apenas explica o tamanho da tabela; os princípios gerais de contagem serão estudados em assunto próprio.

## 17. Como preencher as colunas básicas

Para três proposições $p$, $q$ e $r$, uma enumeração sistemática é:

| $p$ | $q$ | $r$ |
|:---:|:---:|:---:|
| V | V | V |
| V | V | F |
| V | F | V |
| V | F | F |
| F | V | V |
| F | V | F |
| F | F | V |
| F | F | F |

Nesse método:

- a primeira coluna alterna em blocos de quatro;
- a segunda, em blocos de dois;
- a terceira, a cada linha.

Outra ordem pode ser usada, desde que todas as combinações apareçam exatamente uma vez. O valor da fórmula em cada combinação não depende da ordem escolhida para as linhas.

## 18. Método de construção

Para montar a tabela de uma fórmula:

1. identifique as proposições simples distintas;
2. calcule $2^n$ e enumere todas as combinações de V e F;
3. localize o conectivo principal, executado por último;
4. crie colunas para as subfórmulas, das internas para as externas;
5. aplique a regra de cada conectivo linha a linha;
6. confira a coluna da fórmula completa.

Evite resolver uma expressão longa “de uma vez”. Uma coluna por etapa torna a conferência objetiva.

## 19. Exemplo com duas proposições

Avalie

$$
(p \lor q) \land \neg p.
$$

As etapas são $p \lor q$, $\neg p$ e, por fim, a conjunção entre esses resultados.

| $p$ | $q$ | $p \lor q$ | $\neg p$ | $(p \lor q) \land \neg p$ |
|:---:|:---:|:---:|:---:|:---:|
| V | V | V | F | F |
| V | F | V | F | F |
| F | V | V | V | V |
| F | F | F | V | F |

Na terceira linha, a disjunção é verdadeira porque $q$ é verdadeira; a negação de $p$ também é verdadeira. Por isso, a conjunção final é verdadeira.

## 20. Exemplo com três proposições

Avalie

$$
\neg p \lor (q \land r).
$$

| $p$ | $q$ | $r$ | $\neg p$ | $q \land r$ | $\neg p \lor (q \land r)$ |
|:---:|:---:|:---:|:---:|:---:|:---:|
| V | V | V | F | V | V |
| V | V | F | F | F | F |
| V | F | V | F | F | F |
| V | F | F | F | F | F |
| F | V | V | V | V | V |
| F | V | F | V | F | V |
| F | F | V | V | F | V |
| F | F | F | V | F | V |

Quando $p$ é falsa, $\neg p$ é verdadeira e já basta para tornar a disjunção final verdadeira. Quando $p$ é verdadeira, o resultado depende de $q \land r$.

## 21. Avaliação por atribuição

Nem toda questão exige construir a tabela completa. Se os valores das proposições forem fornecidos, substitua-os e avance das subfórmulas internas para a externa.

Considere:

$$
(p \to q) \leftrightarrow \neg r,
$$

com $p=V$, $q=F$ e $r=V$.

1. $p \to q = F$, pois ocorre V $\to$ F;
2. $\neg r = F$;
3. $F \leftrightarrow F = V$, pois os lados têm o mesmo valor.

Logo, a fórmula completa é verdadeira nessa atribuição.

## 22. Atalhos semânticos seguros

Os conectivos permitem concluir o valor de uma composta antes de conhecer todos os componentes:

| Conectivo | Informação decisiva |
|---|---|
| $p \land q$ | uma componente F torna a conjunção F |
| $p \lor q$ | uma componente V torna a disjunção inclusiva V |
| $p \veebar q$ | é preciso saber se exatamente uma é V |
| $p \to q$ | antecedente F ou consequente V torna a condicional V |
| $p \leftrightarrow q$ | é preciso comparar se os valores são iguais |

Esses atalhos são aplicações diretas das tabelas fundamentais, não mudanças na fórmula.

## 23. Tautologia, contradição e contingência

A classificação depende de **todas** as linhas da coluna final.

### 23.1. Tautologia

Uma fórmula é **tautológica** quando é verdadeira em todas as atribuições possíveis.

| $p$ | $\neg p$ | $p \lor \neg p$ |
|:---:|:---:|:---:|
| V | F | V |
| F | V | V |

Como a coluna final contém somente V, $p \lor \neg p$ é tautologia.

### 23.2. Contradição

Uma fórmula é **contraditória** quando é falsa em todas as atribuições possíveis.

| $p$ | $\neg p$ | $p \land \neg p$ |
|:---:|:---:|:---:|
| V | F | F |
| F | V | F |

Como a coluna final contém somente F, $p \land \neg p$ é contradição.

### 23.3. Contingência

Uma fórmula é **contingente** quando é verdadeira em pelo menos uma atribuição e falsa em pelo menos outra.

| $p$ | $q$ | $p \to q$ |
|:---:|:---:|:---:|
| V | V | V |
| V | F | F |
| F | V | V |
| F | F | V |

Como a coluna final mistura V e F, $p \to q$ é contingência.

### 23.4. Classificação não é valor de uma linha

Uma fórmula contingente pode ser verdadeira em uma linha específica. “Contingente” não significa “falsa” nem “duvidosa”: significa variar de valor entre atribuições.

Do mesmo modo, basta uma linha falsa para demonstrar que a fórmula não é tautologia, mas é necessário examinar as demais linhas para decidir se ela é contradição ou contingência.

## 24. Leitura de tabelas incompletas

Em vez de pedir a construção inteira, a banca pode omitir uma coluna ou um valor.

Procedimento:

1. identifique qual conectivo produz a coluna;
2. use os valores já fornecidos na mesma linha;
3. aplique somente a regra desse conectivo;
4. confira se o padrão se repete corretamente nas demais linhas.

Exemplo: se uma coluna de $p \to q$ contém F, então necessariamente naquela linha $p=V$ e $q=F$. Nenhuma outra combinação produz F na condicional.

## 25. Tradução da linguagem natural

### 25.1. Formalize afirmações inteiras

Defina primeiro as letras:

- $p$: “O cadastro está completo.”
- $q$: “O comprovante será emitido.”

Depois traduza:

> O comprovante será emitido se o cadastro estiver completo.

O trecho após “se” é a condição suficiente: $p \to q$.

### 25.2. Preserve o alcance

Compare:

- “Não é verdade que o cadastro está completo e o comprovante foi emitido”: $\neg(p \land q)$;
- “O cadastro não está completo e o comprovante foi emitido”: $(\neg p) \land q$.

A primeira nega a composta inteira; a segunda nega apenas $p$. A tabela permite avaliar ambas sem antecipar as regras de transformação do assunto seguinte.

### 25.3. Não acrescente exclusividade

> O recurso será analisado pelo relator ou pelo colegiado.

A tradução padrão é inclusiva, $p \lor q$. Somente uma expressão como “por exatamente um deles” autoriza a disjunção exclusiva.

## 26. Erros recorrentes de prova

### 26.1. Confundir desconhecido com indeterminado

Não saber se a afirmação é verdadeira não a transforma em não proposição. Pergunte se ela admite V ou F em contexto fixado.

### 26.2. Tratar pergunta ou ordem como falsa

Perguntas e ordens não são proposições; por isso, não recebem F apenas porque não foram respondidas ou cumpridas.

### 26.3. Contar ocorrências em vez de letras distintas

Em $p \land (p \lor q)$, aparecem três ocorrências de letras, mas apenas duas proposições distintas. A tabela tem $2^2=4$ linhas.

### 26.4. Fazer o “ou” sempre exclusivo

O “ou” lógico simples inclui o caso V/V. Exclusividade precisa ser indicada pelo texto ou pelo símbolo próprio.

### 26.5. Inverter a condicional

“$p$ somente se $q$” corresponde a $p \to q$, não a $q \to p$. A condição introduzida por “somente se” é necessária.

### 26.6. Tornar V/F uma condicional com antecedente falso

A condicional é falsa somente em V $\to$ F. F $\to$ V e F $\to$ F são verdadeiras na semântica material.

### 26.7. Confundir bicondicional com disjunção exclusiva

- bicondicional: verdadeira quando os valores são iguais;
- disjunção exclusiva: verdadeira quando os valores são diferentes.

### 26.8. Classificar por uma única linha

Tautologia, contradição e contingência descrevem o padrão da coluna completa. Uma atribuição isolada fornece apenas o valor naquela linha.

### 26.9. Ignorar o conectivo principal

Em $\neg(p \lor q) \land r$, o conectivo principal é a conjunção externa. Resolver primeiro essa conjunção sem calcular a negação da subfórmula altera a estrutura.

## 27. Roteiro de resolução

1. Verifique se os enunciados básicos são proposições.
2. Defina uma letra para cada proposição simples distinta.
3. Traduza os conectivos e fixe o alcance com parênteses.
4. Identifique o conectivo principal.
5. Se houver tabela completa, calcule $2^n$.
6. Enumere todas as atribuições sem repetição nem omissão.
7. Calcule as subfórmulas das internas para as externas.
8. Leia a coluna final e responda exatamente ao que foi pedido.
9. Para classificação, procure somente V, somente F ou mistura.
10. Refaça as linhas críticas: V/F da condicional, V/V do “ou” e valores iguais da bicondicional.

## 28. Síntese

- Proposição é afirmação declarativa com exatamente um valor lógico no contexto.
- Proposição simples não contém combinação proposicional na análise; composta usa conectivos.
- Negação inverte; conjunção exige ambas; disjunção inclusiva exige ao menos uma.
- Disjunção exclusiva exige exatamente uma.
- Condicional só é falsa em V $\to$ F.
- Bicondicional é verdadeira quando os lados têm o mesmo valor.
- “$p$ somente se $q$” significa $p \to q$.
- $n$ proposições distintas geram $2^n$ linhas.
- Colunas intermediárias devem seguir as subfórmulas e os parênteses.
- Coluna final só V indica tautologia; só F, contradição; mistura, contingência.

## Referências

- CEBRASPE. [Edital do concurso público do TCE/MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Centro Brasileiro de Pesquisa em Avaliação e Seleção e de Promoção de Eventos. Conteúdo programático vigente consultado em 18 jul. 2026.
- UNIVERSIDADE FEDERAL DE MINAS GERAIS. [Fundamentos da lógica](https://homepages.dcc.ufmg.br/~loureiro/md/md_1FundamentosDaLogica.pdf). Departamento de Ciência da Computação. Material didático consultado em 18 jul. 2026.
- UNIVERSIDADE FEDERAL DE MATO GROSSO DO SUL. [Lógica proposicional](https://www.facom.ufms.br/~eah/ftc/logica-4p.pdf). Faculdade de Computação. Material didático consultado em 18 jul. 2026.
