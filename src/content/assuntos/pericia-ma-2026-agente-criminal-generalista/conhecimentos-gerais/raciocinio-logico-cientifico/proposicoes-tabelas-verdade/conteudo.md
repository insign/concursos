---
schemaVersion: 1
title: Proposições, conectivos e tabelas-verdade
description: Reconhecimento de proposições, leitura dos conectivos e do alcance das operações, construção de tabelas-verdade e análise dos valores de fórmulas proposicionais.
order: 210
storageId: per-u021
---

## 1. Uma frase inteira pode ser falsa mesmo tendo uma parte verdadeira

Considere este cenário hipotético, com uma coleta e um relatório determinados:

- p: “A coleta terminou.”
- q: “O relatório está pronto.”

Se a coleta terminou, mas o relatório ainda não está pronto, a frase “a coleta terminou **e** o relatório está pronto” é falsa. A primeira parte verdadeira não salva a segunda parte falsa.

A **lógica sentencial**, também chamada **proposicional**, estuda esse mecanismo: **como o valor da afirmação inteira depende dos valores de suas partes e da operação que as liga**. Ela não consulta os fatos para descobrir se a coleta terminou; recebe ou considera os valores possíveis e calcula o resultado.

Uma **tabela-verdade** organiza todas essas possibilidades. Para construí-la, primeiro reconheça as afirmações, depois identifique a operação e seu alcance, e só então calcule.

## 2. O que pode receber verdadeiro ou falso?

Uma **proposição** é uma afirmação declarativa que, em contexto determinado, recebe exatamente um valor lógico: **verdadeiro** ou **falso**. Nas tabelas, usaremos <abbr title="Verdadeiro">V</abbr> e <abbr title="Falso">F</abbr>.

“O número 10 é par” é uma proposição verdadeira; “o número 10 é ímpar” é uma proposição falsa. **Ser falsa não impede que uma afirmação seja proposição.** Também não é necessário que o candidato saiba seu valor: “o relatório tem 80 páginas” pode ser avaliada, desde que o contexto identifique qual relatório está sendo mencionado.

Esse uso de dois valores exclusivos é chamado **bivalência**. Na lógica clássica adotada aqui, uma proposição não recebe os dois valores ao mesmo tempo, mantidos o sentido e o contexto.

### 2.1. Não confunda uma afirmação falsa com uma frase sem valor lógico

Perguntas como “o relatório está pronto?” e ordens como “entregue o relatório” não afirmam algo verdadeiro ou falso. Uma pergunta pode receber resposta; uma ordem pode ser cumprida. Isso não as transforma em proposições.

Uma exclamação pode conter uma afirmação avaliável: em “o relatório finalmente está pronto!”, a afirmação sobre o relatório pode ser representada logicamente. O ponto de exclamação, o número de verbos e a extensão da frase não decidem sua classificação.

Uma **sentença aberta** contém variável livre: algo ainda não determinado na afirmação. Em $x+2=7$, sem valor atribuído a $x$, não há uma afirmação fechada sobre um número específico. Substituir $x$ por 5 produz uma proposição verdadeira; substituir por 3 produz uma falsa. Também é possível fechar sentenças por expressões como “para todo” e “existe”, mas sua formalização pertence à <abbr title="Estudo de propriedades e relações entre objetos, com expressões como todo e existe">lógica de predicados</abbr>, fora deste recorte. A abertura decorre da variável livre, não apenas de ser difícil descobrir o valor.

O contexto também precisa fixar referências e sentidos. “Ele chegou hoje” pode expressar uma proposição quando sabemos quem é “ele” e a que dia “hoje” se refere. Uma ambiguidade precisa ser resolvida antes da formalização; ela não autoriza escolher silenciosamente a leitura mais conveniente.

Um limite diferente aparece no **paradoxo do mentiroso**: “esta própria frase é falsa”. Se a tratarmos como verdadeira, ela afirma sua falsidade; se a tratarmos como falsa, o que ela afirma passa a ser verdadeiro. Por isso, não a usamos como uma proposição comum com valor estável nesta abordagem bivalente. Isso é diferente de uma afirmação simplesmente falsa, como $10=11$.

## 3. Separe as afirmações, não apenas as palavras

Uma proposição **simples**, ou **atômica**, é tratada como uma unidade. Uma proposição **composta** é construída ao aplicar operações lógicas a uma ou mais proposições. Essas operações são os **conectivos**.

No cenário hipotético, p e q representam duas afirmações. “A coleta terminou e o relatório está pronto” combina ambas pela <abbr title="Operação que exige as duas afirmações verdadeiras">conjunção</abbr>, escrita $p\land q$. A <abbr title="Operação que inverte verdadeiro e falso">negação</abbr> “a coleta não terminou” é escrita $\neg p$.

Não conte mecanicamente palavras “e” ou “ou”. “Ana e Bruno são irmãos”, em um exemplo hipotético, pode ser tratada como uma única relação entre duas pessoas; separar “Ana é irmão” e “Bruno é irmão” perde o sentido da frase. Já “Ana chegou e Bruno saiu” contém duas afirmações ligadas por um conectivo. Uma afirmação sobre relação causal também pode ser tratada como unidade: a palavra “consequência” não cria, sozinha, a estrutura “se... então”.

Cada letra representa uma afirmação completa e mantém o mesmo significado durante o problema. Se q é “o relatório está pronto”, não pode passar a significar “o relatório foi entregue” na metade da resolução.

## 4. Negação e alcance: qual parte está sendo invertida?

A **negação** troca verdadeiro por falso e falso por verdadeiro. Os símbolos $\neg p$ e $\sim p$ são formas usuais de escrever “não p”.

| p | $\neg p$ |
|:---:|:---:|
| <abbr title="Verdadeiro">V</abbr> | <abbr title="Falso">F</abbr> |
| <abbr title="Falso">F</abbr> | <abbr title="Verdadeiro">V</abbr> |

O **alcance** é a parte sobre a qual o conectivo atua. Compare:

- “Não é verdade que a coleta terminou e o relatório está pronto”: $\neg(p\land q)$, negação da afirmação composta inteira.
- “A coleta não terminou e o relatório está pronto”: $(\neg p)\land q$, negação apenas de p, seguida de conjunção com q.

Para avaliar a primeira, calcule a conjunção e inverta seu resultado. Para avaliar a segunda, inverta p e só então faça a conjunção. Os parênteses delimitam o alcance.

Negar é excluir **exatamente** a afirmação original. Trocar uma palavra por seu contrário pode não bastar: negar “o relatório tem mais de 80 páginas” é afirmar que ele tem **no máximo 80**, incluindo a igualdade. Não é apenas afirmar “tem menos de 80”.

## 5. “E”, “ao menos uma” e “exatamente uma”

A **conjunção**, $p\land q$, exige que as duas partes sejam verdadeiras. Retomando o cenário: para afirmar que a coleta terminou **e** o relatório está pronto, ambos os requisitos devem passar. Uma parte falsa derruba o conjunto. “Mas” e “embora”, quando ligam duas afirmações nessa leitura proposicional, preservam a exigência das duas; a formalização não registra o tom de contraste ou concessão.

A **disjunção inclusiva**, $p\lor q$, exige ao menos uma parte verdadeira. Se a coleta terminou, a disjunção já é verdadeira, esteja o relatório pronto ou não. Ambas verdadeiras também satisfazem a frase.

A **disjunção exclusiva**, $p\veebar q$ ou $p\oplus q$, exige exatamente uma parte verdadeira. Ela aparece quando o enunciado impõe “ou uma ou outra, **mas não ambas**”. Com as duas verdadeiras, a inclusiva passa e a exclusiva falha; com as duas falsas, ambas falham. Na leitura usual de prova, “ou” é inclusivo, salvo indicação de exclusividade pelo texto ou contexto.

Agora a tabela sintetiza esses critérios:

| p | q | $p\land q$ | $p\lor q$ | $p\veebar q$ |
|:---:|:---:|:---:|:---:|:---:|
| <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Falso">F</abbr> |
| <abbr title="Verdadeiro">V</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> |
| <abbr title="Falso">F</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> |
| <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> |

## 6. Condicional: a situação que quebra a promessa

Leia a **condicional** $p\to q$ como “se p, então q”. p é o **antecedente**, a condição apresentada; q é o **consequente**, aquilo que se afirma sob essa condição.

Use uma promessa hipotética: “se a coleta terminou, então o relatório está pronto”. A promessa é descumprida quando a coleta terminou **e** o relatório não está pronto. Se a coleta não terminou, a condição da promessa não se realizou; a frase não prometeu que o relatório estaria pronto nesse caso, nem que estaria ausente.

A **condicional material** é definida por essa regra de valores: só é falsa com antecedente verdadeiro e consequente falso.

| p | q | $p\to q$ |
|:---:|:---:|:---:|
| <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> |
| <abbr title="Verdadeiro">V</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> |
| <abbr title="Falso">F</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> |
| <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Verdadeiro">V</abbr> |

Assim, antecedente falso ou consequente verdadeiro garantem que **a condicional** seja verdadeira. Isso não prova que a coleta ocorreu, nem que uma ação causou a outra. A promessa é uma ajuda para entender o único caso proibido; a tabela define uma operação sobre valores, sem exigir causalidade, ordem temporal ou tema comum entre as partes.

### 6.1. Suficiente e necessário: a seta tem direção

Quando $p\to q$ é aceita como uma regra verdadeira, p **basta** para garantir q: p é condição **suficiente** para q. Por outro lado, p não pode ser verdadeira com q falsa sem violar a regra: q é condição **necessária** para p.

Mas q pode ser verdadeira com p falsa. Portanto, a regra não autoriza inverter a seta.

| Expressão | Forma |
|---|---|
| Se p, então q; p implica q | $p\to q$ |
| p é suficiente para q; q é necessária para p | $p\to q$ |
| p **somente se** q | $p\to q$ |
| p **se** q | $q\to p$ |

Compare, em regras hipotéticas sobre um botão e um sinal:

- “O sinal acende **se** o botão é pressionado”: pressionar basta para acender; botão pressionado → sinal aceso.
- “O sinal acende **somente se** o botão é pressionado”: pressionar é exigido para acender; sinal aceso → botão pressionado.

“Somente se” apresenta a condição necessária, no lado para o qual a seta aponta.

## 7. Bicondicional: as duas direções

A **bicondicional**, $p\leftrightarrow q$, é lida “p se e somente se q”. Ela exige a relação nas duas direções: p garante q e q garante p.

Se os valores forem diferentes, uma dessas exigências falhará. Se ambos forem falsos, nenhuma direção terá antecedente verdadeiro e consequente falso. Por isso, a bicondicional é verdadeira quando os valores coincidem, **inclusive quando ambos são falsos**.

| p | q | $p\leftrightarrow q$ |
|:---:|:---:|:---:|
| <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> |
| <abbr title="Verdadeiro">V</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> |
| <abbr title="Falso">F</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Falso">F</abbr> |
| <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Verdadeiro">V</abbr> |

Também pode ser lida “p é condição necessária e suficiente para q”. Ela testa igualdade de valores; a disjunção exclusiva testa diferença.

## 8. Qual operação vem por último?

Uma **fórmula** é uma expressão construída com letras proposicionais e conectivos. Uma parte que também forma uma expressão completa é uma **subfórmula**. Em $(p\lor q)\land\neg r$, primeiro avalie $p\lor q$ e $\neg r$; depois combine seus resultados pela conjunção.

O conectivo que governa a fórmula inteira, aplicado por último, é o **conectivo principal**. Nesse caso, é a conjunção externa.

Compare $p\lor(q\land r)$ e $(p\lor q)\land r$. Com p verdadeira e r falsa, a primeira é verdadeira, qualquer que seja q; a segunda é falsa. O agrupamento muda o resultado.

Respeite os parênteses e a convenção de prioridade informada pela prova. Se a escrita abreviada permitir mais de um agrupamento, é preciso fixar a leitura antes do cálculo. Não existe uma escolha livre de parênteses para fazer uma alternativa funcionar.

## 9. Como construir a tabela completa

Cada letra distinta admite dois valores. Para duas letras, há $2\times2=4$ combinações; para três, $2\times2\times2=8$. Com **n letras proposicionais distintas**, a tabela completa tem $2^n$ linhas.

Repetir uma letra não cria outra proposição: $(p\land q)\lor(p\land\neg q)$ tem apenas p e q, portanto quatro linhas. Nomear a fórmula inteira por S também não acrescenta uma letra independente a ser contada.

Para evitar linhas repetidas ou ausentes, use blocos. Com três letras, p alterna a cada quatro linhas; q, a cada duas; r, a cada linha:

| p | q | r |
|:---:|:---:|:---:|
| <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> |
| <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Falso">F</abbr> |
| <abbr title="Verdadeiro">V</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Verdadeiro">V</abbr> |
| <abbr title="Verdadeiro">V</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> |
| <abbr title="Falso">F</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> |
| <abbr title="Falso">F</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Falso">F</abbr> |
| <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Verdadeiro">V</abbr> |
| <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> |

Outra ordem é válida se cada combinação aparecer uma vez. Depois, dê uma coluna a cada passo necessário e calcule de dentro para fora. Para $(p\lor q)\land\neg p$:

| p | q | $p\lor q$ | $\neg p$ | $(p\lor q)\land\neg p$ |
|:---:|:---:|:---:|:---:|:---:|
| <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> |
| <abbr title="Verdadeiro">V</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> |
| <abbr title="Falso">F</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Verdadeiro">V</abbr> |
| <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Falso">F</abbr> | <abbr title="Verdadeiro">V</abbr> | <abbr title="Falso">F</abbr> |

Na terceira linha, a disjunção é verdadeira porque q é verdadeira, e a negação é verdadeira porque p é falsa. A conjunção de ambos os resultados é verdadeira. Nas duas primeiras linhas, a negação falsa já torna a fórmula inteira falsa.

## 10. Quando basta uma atribuição — ou um raciocínio de trás para frente

Uma **atribuição** escolhe um valor para cada letra, correspondendo a uma linha da tabela. Se a prova já fixa os valores, avalie somente essa linha. Por exemplo, em $(p\to q)\leftrightarrow\neg r$, com p verdadeira, q falsa e r verdadeira:

1. a condicional é falsa;
2. a negação de r é falsa;
3. a bicondicional de dois valores iguais é verdadeira.

A falsidade de uma parte não torna toda fórmula falsa: o resultado depende do conectivo que a combina com as outras.

Se a prova fornece o valor da fórmula inteira, use o caso decisivo para voltar às partes. Por exemplo, se $(p\land q)\to r$ é falsa, seu antecedente é verdadeiro e seu consequente é falso. Portanto, p e q são verdadeiras e r é falsa.

Se uma condicional é **verdadeira** e seu consequente é **falso**, o antecedente precisa ser falso. Já saber apenas que ela é verdadeira não permite afirmar que as duas partes sejam verdadeiras: três combinações satisfazem a condicional. Em cada passo, conclua somente os valores que a informação realmente força.

## 11. O que a última coluna revela?

Depois de considerar todas as atribuições, a fórmula pode ser classificada:

| Resultado na coluna final | Classificação | Exemplo |
|---|---|---|
| Verdadeira em todas as linhas | **Tautologia** | $p\lor\neg p$ |
| Falsa em todas as linhas | **Contradição** | $p\land\neg p$ |
| Verdadeira em alguma linha e falsa em outra | **Contingência** | $p\to q$ |

No primeiro exemplo, p ou sua negação será verdadeira, qualquer que seja o valor de p. No segundo, nunca poderão ser verdadeiras ao mesmo tempo. No terceiro, a linha com p verdadeira e q falsa produz falsidade, mas as demais produzem verdade.

Uma única linha falsa elimina a possibilidade de tautologia, mas não prova contradição. Para provar contingência, basta encontrar uma linha verdadeira e outra falsa; não é necessário haver quantidades iguais dos dois valores.

Essas classificações dizem respeito à **estrutura da fórmula sob as atribuições**, não ao quanto sabemos sobre os fatos. A tabela constrói os resultados sem precisar transformar a fórmula. O assunto [Equivalências e leis de De Morgan](/concursos/pericia-ma-2026-agente-criminal-generalista/equivalencias-de-morgan-diagramas-logicos/) desenvolve como obter outras expressões com os mesmos resultados em todas as linhas.
