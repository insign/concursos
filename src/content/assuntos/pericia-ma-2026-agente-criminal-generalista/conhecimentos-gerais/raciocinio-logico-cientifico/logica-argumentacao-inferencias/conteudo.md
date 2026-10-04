---
schemaVersion: 1
title: Argumentação e inferências lógicas
description: Identificação de premissas e conclusões, avaliação de validade e solidez, regras de inferência proposicional e distinção entre apoio necessário, provável e possível.
order: 230
storageId: per-u023
---

## 1. A mesma regra permite duas passagens diferentes?

Compare estes raciocínios hipotéticos:

> Se um processo é urgente, recebe prioridade. O processo P é urgente. Logo, P recebe prioridade.

> Se um processo é urgente, recebe prioridade. O processo P recebeu prioridade. Logo, P é urgente.

No primeiro, aplicar a regra ao caso obriga a última afirmação. No segundo, a prioridade poderia decorrer de outro motivo: a regra não disse que **somente** processos urgentes a recebem. Para resolver uma questão, examine essa passagem entre as afirmações, mesmo quando todas parecem plausíveis.

## 2. Separe o que sustenta do que é sustentado

Um **argumento** apresenta afirmações como razões para aceitar outra. As razões são as **premissas**; a afirmação defendida é a **conclusão**. Fazer uma **inferência** é passar das premissas à conclusão.

Em “O atendimento deve ser ampliado, pois a demanda cresceu e a fila dobrou”, a conclusão aparece primeiro: **o atendimento deve ser ampliado**. As outras duas afirmações são razões oferecidas para isso. Identificar a conclusão não significa já concordar com ela ou provar que decorre necessariamente dessas razões.

“Pois” e “porque” podem introduzir razões; “logo” e “portanto” podem anunciar o que se pretende concluir. São pistas, não regras mecânicas. Um relato como “a sessão começou e depois terminou” apenas organiza eventos. Uma opinião sem razões apenas afirma uma posição. Uma **explicação** procura indicar por que ocorreu um fato tomado como aceito: se a lentidão do portal já está estabelecida, atribuí-la ao aumento de acessos pode exercer essa função. Se a lentidão está em discussão, razões para aceitá-la exercem função argumentativa.

As premissas podem trabalhar **em conjunto**. No exemplo da prioridade, a regra geral e a informação sobre P precisam ser combinadas: nenhuma delas, sozinha, garante a conclusão sobre P. Também podem oferecer apoios **independentes**: economia de papel e redução do tempo de atendimento podem ser razões distintas em favor de uma mudança, embora cada uma possa ser discutida separadamente.

Uma conclusão pode virar premissa do passo seguinte. Sob as regras hipotéticas “cadastros incompletos exigem correção” e “cadastros que exigem correção ficam pendentes”, saber que um cadastro está incompleto permite concluir que exige correção; daí, que fica pendente. **Exige correção** é a conclusão intermediária, e **fica pendente**, a final.

### Uma razão omitida precisa fazer a ponte correta

“Rui domina o sistema; logo, deve ministrar o treinamento” omite uma ligação entre domínio e dever de ensinar. Acrescentar apenas “quem domina o sistema está apto a ensinar” ainda não garante que Rui **deva** ministrá-lo: aptidão e dever não são a mesma afirmação. Uma regra como “nas condições consideradas, quem domina o sistema deve ministrar o treinamento” faria a ponte. Isso reconstrói um argumento hipotético; não comprova que a regra exista ou seja aceitável.

Ao reconstruir uma premissa implícita, escreva o que falta e avalie-o. Não transforme silenciosamente uma possibilidade, uma preferência ou uma capacidade em obrigação.

## 3. Verdade das afirmações e garantia da passagem

Uma afirmação é verdadeira ou falsa em relação ao que ela diz e ao contexto considerado. Já a **validade dedutiva** é uma propriedade do argumento: **não pode existir caso em que todas as premissas sejam verdadeiras e a conclusão seja falsa**. Uma dedução pretende garantir a conclusão sob a condição de que as premissas sejam verdadeiras.

“Todos os planetas são de vidro; Marte é um planeta; logo, Marte é de vidro” conserva a forma de uma dedução válida. A premissa sobre vidro é falsa: validade não transforma uma premissa falsa em fato. Um argumento **sólido** combina validade e todas as premissas verdadeiras; nessas condições, sua conclusão também é verdadeira.

Uma conclusão verdadeira não prova validade. “O cadastro está correto; logo, o céu é azul” pode apresentar afirmações verdadeiras numa situação, mas a primeira não garante a segunda. A pergunta da validade considera **todos os casos compatíveis com as premissas**, não apenas a situação observada.

| Pergunta | O que se avalia |
| --- | --- |
| Esta afirmação corresponde ao caso considerado? | Verdade de uma afirmação. |
| Há premissas verdadeiras com conclusão falsa? | <abbr title="Garantia de que premissas verdadeiras não conduzem a conclusão falsa">Validade dedutiva</abbr>. |
| O argumento é válido e todas as premissas são verdadeiras? | <abbr title="Validade do argumento combinada com a verdade de todas as premissas">Solidez</abbr>. |

Para demonstrar invalidade, basta um **contraexemplo**: uma situação que mantém **todas** as premissas verdadeiras e torna a conclusão falsa. No segundo argumento da seção 1, imagine P sem urgência, mas com prioridade por outra regra. A regra “urgente recebe prioridade” continua respeitada; P recebeu prioridade; entretanto, P não é urgente. As duas premissas são verdadeiras e a conclusão, falsa.

Não basta imaginar uma conclusão falsa quebrando uma premissa. E descobrir uma premissa falsa afasta a solidez, mas não decide, sozinho, se a forma do argumento é válida.

## 4. Represente as afirmações sem trocar seu sentido

Uma **proposição** é uma afirmação declarativa que, em contexto determinado, recebe verdadeiro ou falso. Podemos representá-la por uma letra. Para um cadastro específico, fixe:

- p: “O cadastro foi concluído.”
- q: “O comprovante foi emitido.”

A letra mantém esse significado durante a análise desse argumento. “O cadastro foi concluído” e “o cadastro poderá ser concluído” não são a mesma proposição. Em outro exemplo, podemos fixar outros significados. Os símbolos abaixo ligam ou negam afirmações:

| Operação | Leitura | Quando é verdadeira |
| --- | --- | --- |
| $\neg p$ | Não p. | Quando p é falsa. |
| $p \land q$ | p e q. | Quando ambas são verdadeiras. |
| $p \lor q$ | p ou q, no sentido inclusivo. | Quando pelo menos uma é verdadeira, inclusive quando ambas são. |
| $p \to q$ | Se p, então q. | Em todos os casos, exceto p verdadeira com q falsa. |

Na **condicional** $p \to q$, p é o **antecedente** e q, o **consequente**. A regra afirma que a conclusão do cadastro basta para a emissão do comprovante. Não afirma que só esse caminho emite comprovantes, nem que p seja a causa de q. Trataremos as regras dos exemplos como premissas hipotéticas, sem exceções internas não anunciadas.

## 5. A condicional: dois passos válidos e dois erros parecidos

### Partir da condição cumprida

Se $p \to q$ e p são verdadeiras, q precisa ser verdadeira; do contrário, a própria condicional seria falsa. É o **<abbr title="Regra que, de se p então q e de p, permite concluir q">modus ponens</abbr>**: afirmar o antecedente permite afirmar o consequente.

> Se o cadastro foi concluído, o comprovante foi emitido. O cadastro foi concluído. Portanto, o comprovante foi emitido.

### Partir da consequência ausente

Se $p \to q$ e $\neg q$ são verdadeiras, p precisa ser falsa: p verdadeira com q falsa quebraria a regra. É o **<abbr title="Regra que, de se p então q e de não q, permite concluir não p">modus tollens</abbr>**: negar o consequente permite negar o antecedente.

> Se o cadastro foi concluído, o comprovante foi emitido. O comprovante não foi emitido. Portanto, o cadastro não foi concluído.

### Os caminhos que a regra não garante

De $p \to q$ e q, não se pode concluir p. A emissão poderia ocorrer por outro caminho: é o erro de **afirmar o consequente**. De $p \to q$ e $\neg p$, também não se pode concluir $\neg q$: é o erro de **negar o antecedente**. O mesmo cenário, p falsa e q verdadeira, refuta ambas as passagens.

| Premissas | Conclusão pretendida | Resultado |
| --- | --- | --- |
| $p \to q$ e p | q | Válida: <abbr title="De se p então q e de p, conclui-se q">modus ponens</abbr>. |
| $p \to q$ e $\neg q$ | $\neg p$ | Válida: <abbr title="De se p então q e de não q, conclui-se não p">modus tollens</abbr>. |
| $p \to q$ e q | p | Inválida: <abbr title="Erro de concluir a condição a partir da consequência, sem excluir outros caminhos">afirmação do consequente</abbr>. |
| $p \to q$ e $\neg p$ | $\neg q$ | Inválida: <abbr title="Erro de concluir a ausência da consequência apenas porque a condição não ocorreu">negação do antecedente</abbr>. |

O exercício formal assume a regra dada. Se, no mundo real, o sistema permite concluir o cadastro sem emitir comprovante, a dificuldade está na verdade da premissa “se p, então q”. Isso não invalida a regra de inferência que parte dela e de p.

## 6. Combine passos, mas não acrescente informações sem apoio

### Encadeamento

Acrescente r: “O envio foi liberado”. Se $p \to q$ e $q \to r$, então $p \to r$: o primeiro elo leva a q, e o segundo, a r. Com p, obtemos q e depois r. Com $\neg r$, obtemos $\neg q$ e depois $\neg p$. Esse encadeamento é chamado **silogismo hipotético** quando liga as duas condicionais à condicional resultante.

Em relações entre pessoas ou objetos, também é preciso conhecer a regra. A relação “antes de” é **transitiva**: se Ana vem antes de Bruno e Bruno antes de Caio, Ana vem antes de Caio. “Conhece”, em geral, não tem essa propriedade: Ana conhecer Bruno e Bruno conhecer Caio não garante que Ana conheça Caio. A aparência de cadeia não cria uma regra ausente.

### Alternativas

Neste exemplo, p significa “há uma cópia do arquivo no servidor A” e q, “há uma cópia no servidor B”. Se há cópia em A **ou** em B e não há em A, precisa haver em B: de $p \lor q$ e $\neg p$, conclua q. É o **silogismo disjuntivo**. No “ou” inclusivo, saber que p é verdadeira não permite negar q; pode haver cópias em ambos. Se o enunciado impõe “um ou outro, mas não ambos”, há uma condição adicional de exclusão.

### Informações reunidas e informações enfraquecidas

De “o arquivo foi recebido **e** conferido”, podemos obter cada afirmação separadamente. Tendo recebido e tendo conferido como informações disponíveis, podemos reuni-las com “e”. Mas “recebido **ou** conferido” não permite extrair qualquer das duas como fato certo.

Fixando agora p como “foi recebido” e q como “foi conferido”, de p podemos concluir $p \lor q$: pelo menos uma das alternativas é verdadeira, qualquer que seja q. Isso enfraquece a informação; **não demonstra q**. Receber o arquivo garante “foi recebido ou conferido”, mas não garante que tenha sido conferido.

## 7. Teste a validade pelas possibilidades

Uma **tabela-verdade** enumera as combinações de verdadeiro e falso das proposições e calcula as fórmulas. Para avaliar um argumento, procure apenas as linhas em que **todas as premissas são verdadeiras**; nessas linhas, a conclusão também precisa ser verdadeira.

Veja $p \to q$, q; conclusão p. A coluna q é uma das premissas:

| p | q | $p \to q$ | Todas as premissas verdadeiras? | Conclusão p |
| --- | --- | --- | --- | --- |
| Verdadeira | Verdadeira | Verdadeira | Sim | Verdadeira |
| Verdadeira | Falsa | Falsa | Não | Verdadeira |
| Falsa | Verdadeira | Verdadeira | **Sim** | **Falsa** |
| Falsa | Falsa | Verdadeira | Não | Falsa |

A terceira linha é um contraexemplo. A primeira linha favorável não salva o argumento; as linhas com alguma premissa falsa não decidem sua validade. Se **nenhuma** combinação torna todas as premissas verdadeiras, não existe contraexemplo; o critério clássico considera o argumento válido, embora premissas incompatíveis não possam compor um argumento sólido.

Outra maneira de expressar o mesmo teste é reunir as premissas com “e” e formar “se todas as premissas, então a conclusão”. O argumento é válido quando essa fórmula é uma **tautologia**, isto é, verdadeira em todas as combinações. Para a primeira regra da seção 5, a fórmula é $((p \to q) \land p) \to q$. Não confunda o valor de uma fórmula numa linha com a validade do argumento em todas as linhas relevantes.

## 8. Quando o apoio não pretende garantir a conclusão

Na **indução**, observações sustentam uma generalização ou previsão, sem excluir toda possibilidade de erro. Examinar atendimentos de diferentes turnos e verificar atrasos recorrentes pode apoiar a previsão de novos atrasos. A força depende da quantidade e da variedade dos casos, de como foram escolhidos e de serem comparáveis à situação prevista. Observar só um turno pode deixar outros grupos sem representação.

“A maioria dos servidores com bom desempenho recebe bônus; Lia teve bom desempenho; logo, Lia recebe bônus” não é uma dedução válida. Lia pode estar entre os bons servidores não contemplados. Mesmo que a maioria seja grande, ela não se transforma em “todos”, nem garante o caso individual.

Na **analogia**, semelhanças relevantes entre situações apoiam uma transferência limitada. Um procedimento que reduziu filas numa unidade pode funcionar em outra se as condições decisivas forem semelhantes. Compartilhar o mesmo sistema não basta quando uma unidade tem equipe menor ou uma demanda muito diferente. A pergunta é: **a diferença interfere no mecanismo que produziu o resultado?**

Na **abdução**, propõe-se uma hipótese explicativa para um fato. Não encontrar um livro no lugar habitual pode levar à hipótese de que alguém o retirou. O livro também pode ter sido guardado em outro lugar pela própria pessoa. A hipótese precisa ser comparada com alternativas e confrontada com evidências; sua capacidade de explicar o fato não a torna necessária.

| Força da afirmação | O que se pode dizer |
| --- | --- |
| Necessária dadas as premissas | Não há caso de todas as premissas verdadeiras com conclusão falsa. |
| Provável | Há apoio favorável, mas a conclusão ainda pode ser falsa. |
| Apenas possível | A hipótese não foi excluída; isso, sozinho, não a torna mais provável que as alternativas. |

Esses modos de raciocinar podem ser úteis. Classificá-los como não dedutivos não significa rejeitá-los; significa avaliar seu apoio sem exigir ou anunciar uma garantia que não oferecem.

## 9. Avalie a qualidade da razão e o alcance da afirmação

Uma razão é **relevante** quando tem ligação com a conclusão discutida. Precisa também oferecer apoio **suficiente para a força dessa conclusão**. Dois usuários insatisfeitos podem justificar examinar problemas; não bastam para afirmar que todos rejeitam o serviço.

Uma **falácia** é um defeito de raciocínio que aparenta oferecer bom apoio. Para reconhecê-la, explique a passagem defeituosa, em vez de apenas decorar um nome:

- **Generalização apressada:** poucos casos ou casos inadequadamente escolhidos sustentam uma afirmação ampla demais. Três atendimentos rápidos não demonstram que a unidade atende todos rapidamente em qualquer época.
- **Falsa causa:** a sequência temporal é tratada como prova causal. A fila diminuiu depois de trocar o formulário; sem afastar mudanças de equipe ou de demanda, isso não demonstra que a troca causou a redução.
- **Apelo à popularidade:** muitas pessoas acreditarem na correção de um procedimento não comprova sua correção técnica ou jurídica.
- **Razão deslocada:** alguém ter se esforçado muito não demonstra que um cálculo esteja correto. O esforço pode ser relevante para outra decisão, mas não substitui a conferência do cálculo.

O contexto importa. Competência de um especialista no tema e evidências que ele apresenta podem ser razões pertinentes; a fama em área alheia não fornece o mesmo apoio. Consequências previstas podem orientar uma decisão prática, como escolher entre procedimentos. A mera desejabilidade de uma conclusão, porém, não prova que uma afirmação factual seja verdadeira.

Para resolver: identifique a conclusão; separe as premissas; explicite a ponte que faltar; verifique se o apoio pretende ser necessário ou apenas provável; aplique as regras ou procure um contraexemplo; ajuste a resposta à força efetivamente sustentada.

O foco deste assunto é a passagem das razões às conclusões. A construção completa das tabelas e as equivalências recebem aprofundamento nos assuntos próprios; as aplicações à investigação científica também serão desenvolvidas separadamente. A ponte apresentada aqui permite avaliar os argumentos sem depender dessas leituras.
