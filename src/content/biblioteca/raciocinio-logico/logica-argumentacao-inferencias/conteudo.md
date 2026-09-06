---
schemaVersion: 1
title: Lógica de argumentação, analogias, inferências, deduções e conclusões
description: Identificação e avaliação de argumentos em linguagem natural, com foco em premissas, conclusões, validade, dedução, indução, analogia e força inferencial.
order: 37
storageId: logica-argumentacao-inferencias
---

## 1. Quando uma conclusão realmente decorre das razões?

Considere dois raciocínios:

> Se um processo é urgente, recebe prioridade. O processo P é urgente. Logo, P recebe prioridade.

> Se um processo é urgente, recebe prioridade. O processo P recebeu prioridade. Logo, P é urgente.

Os dois parecem semelhantes, mas só o primeiro obriga a conclusão. No segundo, P poderia ter recebido prioridade por outro motivo.

Esse contraste resume o problema central deste assunto: **avaliar a passagem das razões para a conclusão**. Em prova, isso exige reconhecer a estrutura do argumento, descobrir o tipo de apoio pretendido e perguntar se esse apoio é suficiente para a força da conclusão.

No edital do <abbr title="Tribunal de Contas do Estado do Maranhão">TCE/MA</abbr> 2026, o recorte inclui lógica de argumentação, analogias, inferências, deduções e conclusões. Proposições, tabelas-verdade, equivalências e outros instrumentos formais aparecem em assuntos seguintes; aqui, eles entram apenas na medida necessária para compreender argumentos em linguagem natural.

## 2. A estrutura mínima de um argumento

Um **argumento** apresenta uma ou mais afirmações como razões para aceitar outra afirmação.

- **premissa:** afirmação oferecida como razão;
- **conclusão:** afirmação que recebe o apoio;
- **inferência:** passagem das premissas para a conclusão.

Exemplo hipotético:

> A fila dobrou e o número de atendimentos aumentou. Portanto, o horário de atendimento deve ser ampliado.

As duas primeiras informações funcionam como premissas; a ampliação do horário é a conclusão. A conclusão poderia aparecer no início ou no meio: **posição no texto não determina função lógica**.

Uma pergunta simples costuma revelar a estrutura:

> **O que o autor quer que eu aceite e quais razões oferece para isso?**

Palavras como “logo”, “portanto”, “assim” e “por isso” frequentemente anunciam conclusões; “porque”, “pois”, “já que” e “visto que” frequentemente introduzem razões. São pistas, não comandos automáticos. “Então” pode ter sentido apenas temporal, “pois” pode aparecer depois da conclusão e um argumento pode não usar marcador algum.

## 3. Nem toda sequência de afirmações é um argumento

Compare três trechos.

### 3.1. Relato

> A sessão começou às nove. O relatório foi lido às dez. A votação terminou ao meio-dia.

O texto organiza fatos, mas nenhuma afirmação é oferecida como razão para aceitar outra.

### 3.2. Explicação

> O portal ficou lento porque houve aumento excepcional de acessos.

Se a lentidão já é aceita e a pergunta é “por que isso aconteceu?”, temos uma explicação. Se a própria lentidão estivesse em dúvida e o aumento de acessos fosse apresentado como evidência de que ela ocorreu, a função poderia ser argumentativa.

### 3.3. Opinião sem apoio

> A proposta é inadequada.

Há uma tese, mas ainda não há argumento: faltam razões apresentadas em apoio.

A diferença decisiva é funcional: **argumentar é oferecer razões para sustentar uma conclusão**.

## 4. Como as premissas trabalham juntas

Nem toda razão atua do mesmo modo.

### 4.1. Premissas ligadas

Precisam ser combinadas:

1. Todo processo urgente recebe prioridade.
2. O processo P é urgente.
3. Logo, P recebe prioridade.

A primeira premissa fornece a regra; a segunda enquadra P nessa regra. Isoladamente, nenhuma produz a conclusão.

### 4.2. Premissas independentes

Cada uma oferece algum apoio próprio. Se uma for retirada, a outra ainda pode continuar relevante para a conclusão.

### 4.3. Conclusão intermediária

Uma conclusão pode virar premissa do passo seguinte:

1. O prazo expirou.
2. Logo, o recurso é intempestivo.
3. Recursos intempestivos não são conhecidos.
4. Portanto, o recurso não será conhecido.

“O recurso é intempestivo” é conclusão do primeiro passo e premissa do segundo. Em argumentos longos, reconhecer essas etapas evita tratar tudo como uma única inferência.

## 5. Pressupostos: a ponte que ficou implícita

A linguagem natural frequentemente omite uma premissa que o autor espera que o leitor complete.

> Rui domina a ferramenta; portanto, deve ministrar o treinamento.

A passagem depende de alguma ponte, por exemplo:

> Nas circunstâncias consideradas, dominar a ferramenta é suficiente para estar apto a ministrar o treinamento.

Para localizar um pressuposto, faça três movimentos:

1. identifique premissas e conclusão expressas;
2. pergunte o que precisa ser aceito para ligar umas à outra;
3. teste se a ponte é realmente compatível com o texto.

Não vale inventar qualquer frase apenas para tornar o argumento melhor. O pressuposto reconstruído deve corresponder à passagem efetivamente sugerida.

## 6. Verdade, validade e solidez

Esses conceitos respondem a perguntas diferentes.

| Conceito | Pergunta |
|---|---|
| verdade ou falsidade | a afirmação corresponde ou não ao que se considera verdadeiro? |
| validade | seria possível ter todas as premissas verdadeiras e a conclusão falsa? |
| solidez | o argumento é válido e, além disso, todas as premissas são verdadeiras? |

### 6.1. Validade olha para a relação

Um argumento dedutivo é **válido** quando não existe situação possível em que todas as premissas sejam verdadeiras e a conclusão seja falsa.

Exemplo:

1. Todo parecer publicado é acessível ao público.
2. O parecer P foi publicado.
3. Logo, P é acessível ao público.

Se as premissas forem verdadeiras, a conclusão não pode falhar.

### 6.2. Premissa falsa não torna a forma inválida

1. Todo planeta é feito de vidro.
2. Marte é um planeta.
3. Logo, Marte é feito de vidro.

A primeira premissa é falsa no mundo real, mas a forma é válida: **se** as premissas fossem verdadeiras, a conclusão teria de ser verdadeira.

### 6.3. Conclusão verdadeira não prova validade

Uma conclusão pode ser verdadeira por coincidência dentro de um argumento mal construído. Validade depende da ligação entre premissas e conclusão, não do fato isolado de a conclusão ser verdadeira.

### 6.4. Solidez acrescenta a verdade das premissas

Um argumento dedutivo é **sólido** quando é válido e todas as premissas são verdadeiras. Por isso, todo argumento sólido tem conclusão verdadeira; o inverso não é garantido.

## 7. O teste decisivo da dedução: procure um contraexemplo

Para mostrar que um argumento dedutivo é inválido, basta construir um cenário coerente em que:

- todas as premissas sejam verdadeiras; e
- a conclusão seja falsa.

Exemplo:

1. Todo documento protocolado recebe número.
2. O documento D tem número.
3. Logo, D foi protocolado.

Imagine que D recebeu um número interno antes do protocolo e ainda não foi protocolado. Nesse cenário, as premissas podem ser verdadeiras e a conclusão falsa. A inferência, portanto, é inválida.

O contraexemplo não precisa ter ocorrido de fato; precisa apenas ser compatível com as premissas. Esse é o teste mais econômico para muitos argumentos dedutivos em linguagem natural.

## 8. Nem toda inferência pretende garantir a conclusão

A força do apoio pode ser diferente.

### 8.1. Dedução

Na **dedução**, as premissas pretendem garantir a conclusão. Se a forma é válida e as premissas são verdadeiras, a conclusão é necessária.

### 8.2. Indução

Na **indução**, casos observados apoiam uma generalização ou previsão sem eliminarem a possibilidade de erro.

Exemplo hipotético:

> Em uma amostra ampla e representativa, a maioria dos usuários preferiu o canal digital. É provável que essa preferência também apareça no conjunto dos usuários.

A força aumenta quando a base é suficiente, representativa e adequada ao universo. Enfraquece quando poucos casos são universalizados, grupos relevantes ficam de fora ou a conclusão diz mais do que os dados permitem.

Premissas verdadeiras podem formar uma boa indução sem tornar a conclusão necessária.

### 8.3. Analogia

Na **analogia**, semelhanças entre um caso conhecido e outro caso sustentam uma conclusão sobre este último.

Exemplo hipotético:

> Duas unidades usam o mesmo sistema, têm equipes semelhantes e executam o mesmo fluxo. Uma mudança reduziu retrabalho na unidade A. Isso dá razão para esperar benefício semelhante em B.

A analogia fica mais forte quando as semelhanças têm relação direta com o resultado que se pretende transferir. Ela enfraquece se houver diferença relevante justamente nesse ponto.

Imagine que a unidade B possua uma restrição que impede a mudança responsável pelo resultado obtido em A. Uma única diferença desse tipo pode pesar mais que várias semelhanças superficiais.

## 9. Necessário, provável e possível

A conclusão deve ser tão forte quanto o apoio recebido.

| Grau | Significado |
|---|---|
| necessária | não pode ser falsa se as premissas forem verdadeiras |
| provável | recebe apoio relevante, mas ainda pode ser falsa |
| possível | não foi excluída pelo que se sabe |

**Possível não significa provável; provável não significa necessário.**

Essa distinção aparece em pegadinhas com palavras como “sempre”, “todos”, “necessariamente” e “sem exceção”. Uma base limitada raramente sustenta uma conclusão universal.

## 10. Condicionais: respeite a direção da regra

Considere:

> Se A ocorre, então B ocorre.

O objetivo aqui é reconhecer inferências verbais; a formalização completa pertence ao assunto de proposições e tabelas-verdade.

### 10.1. Aconteceu A: conclua B

1. Se A, então B.
2. A.
3. Logo, B.

Esse padrão válido é chamado <abbr title="Regra que afirma a condição e conclui sua consequência">modus ponens</abbr>.

### 10.2. B não ocorreu: conclua que A não ocorreu

1. Se A, então B.
2. Não B.
3. Logo, não A.

Esse padrão válido é chamado <abbr title="Regra que nega a consequência e conclui a negação da condição">modus tollens</abbr>.

### 10.3. Aconteceu B: isso não prova A

1. Se A, então B.
2. B.
3. Logo, A.

A inferência é inválida porque B pode ter outra causa.

> Se choveu, a rua está molhada. A rua está molhada. Logo, choveu.

A rua poderia ter sido lavada.

### 10.4. A não ocorreu: isso não prova que B não ocorreu

1. Se A, então B.
2. Não A.
3. Logo, não B.

B pode acontecer por outro caminho.

> Se o relatório foi enviado por e-mail, chegou hoje. Não foi enviado por e-mail. Logo, não chegou hoje.

Ele poderia ter chegado por outro canal.

## 11. Relevância, suficiência e proporcionalidade

Mesmo fora de uma dedução estrita, três perguntas ajudam a avaliar o apoio.

### 11.1. A razão é relevante?

> A proposta é popular; logo, é juridicamente válida.

Popularidade, sozinha, não demonstra legalidade. A razão não atinge a propriedade afirmada na conclusão.

### 11.2. A razão é suficiente?

> Dois usuários reclamaram; logo, todos os usuários rejeitam o serviço.

As reclamações são relevantes para satisfação, mas a base é insuficiente para uma conclusão universal.

### 11.3. A força da linguagem é proporcional?

“Pode ocorrer” exige menos apoio que “provavelmente ocorrerá”; “provavelmente” exige menos que “necessariamente”. Ao resolver a questão, compare a força da conclusão com a força efetiva das premissas.

## 12. Um método único para resolver a questão

Em vez de decorar listas separadas para cada tipo de argumento, percorra esta sequência:

1. **Ache a conclusão.** Qual afirmação o autor quer que você aceite?
2. **Separe as premissas.** Quais razões foram apresentadas?
3. **Reconstrua a passagem.** Há pressuposto ou conclusão intermediária?
4. **Identifique a pretensão.** A conclusão é necessária, provável, possível ou sustentada por analogia?
5. **Escolha o teste.** Dedução pede contraexemplo; indução pede exame da base; analogia pede diferenças relevantes; condicional pede atenção à direção da regra.
6. **Compare apoio e conclusão.** A razão é relevante? É suficiente? A linguagem exagera o que as premissas permitem?

## 13. Armadilhas que valem reconhecer de imediato

- conclusão verdadeira não torna o argumento válido;
- premissa falsa não torna a forma inválida;
- argumento válido não é necessariamente sólido;
- um exemplo favorável não prova necessidade;
- um caso não sustenta automaticamente uma regra universal;
- possível, provável e necessário são graus diferentes;
- sucessão temporal, por si só, não prova relação causal;
- muitas semelhanças superficiais não compensam uma diferença decisiva numa analogia;
- de “se A, então B” e “B”, não se conclui A;
- de “se A, então B” e “não A”, não se conclui “não B”;
- marcadores como “logo” ajudam a localizar a estrutura, mas não tornam a inferência correta;
- um pressuposto deve reconstruir a passagem do texto, não ser inventado apenas para salvá-la.

## 14. Síntese para retenção

A lógica de argumentação não pergunta apenas **se a conclusão parece razoável**. Ela pergunta **que tipo de apoio as premissas oferecem e até onde esse apoio permite ir**.

Ao final, retenha quatro contrastes:

1. **premissa × conclusão:** razão oferecida × tese sustentada;
2. **verdade × validade:** conteúdo da afirmação × qualidade da ligação dedutiva;
3. **dedução × indução/analogia:** garantia × apoio graduado;
4. **possível × provável × necessário:** compatibilidade × apoio relevante × impossibilidade de falha dadas as premissas.