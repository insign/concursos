---
schemaVersion: 1
title: Lógica de argumentação, analogias, inferências, deduções e conclusões
description: Identificação e avaliação de argumentos em linguagem natural, com foco em premissas, conclusões, validade, dedução, indução, analogia e força inferencial.
order: 37
storageId: logica-argumentacao-inferencias
---

## 1. Recorte do assunto

No edital do TCE/MA 2026, **lógica de argumentação** aparece acompanhada de **analogias, inferências, deduções e conclusões**. Os tópicos seguintes tratam separadamente de proposições, tabelas-verdade, equivalências, leis de De Morgan, diagramas lógicos, lógica de primeira ordem, contagem, probabilidade e conjuntos.

O foco deste assunto é, portanto, **entender e avaliar a passagem de razões para conclusões**, sobretudo em linguagem natural.

Aqui entram:

- identificação de premissas e conclusão;
- reconstrução de pressupostos e conclusões intermediárias;
- distinção entre verdade, validade e solidez;
- dedução e teste por contraexemplo;
- indução e grau de apoio;
- analogias e diferenças relevantes;
- conclusões necessárias, prováveis e apenas possíveis;
- padrões condicionais básicos usados para avaliar argumentos.

Não é necessário transformar este assunto em um curso autônomo de lógica proposicional, metodologia científica ou catálogo de falácias. Esses aprofundamentos só são úteis quando esclarecem diretamente a qualidade de uma inferência.

## 2. Argumento, premissa, conclusão e inferência

Um **argumento** é uma estrutura em que uma ou mais afirmações são apresentadas como razões para aceitar outra afirmação.

- **premissa:** afirmação usada como razão;
- **conclusão:** afirmação que recebe apoio;
- **inferência:** passagem das premissas para a conclusão.

Exemplo:

> O número de atendimentos aumentou e a fila dobrou. Portanto, o horário de atendimento deve ser ampliado.

Premissas:

1. o número de atendimentos aumentou;
2. a fila dobrou.

Conclusão:

> o horário de atendimento deve ser ampliado.

A conclusão pode aparecer no início, no meio ou no final. A posição não define sua função.

## 3. Nem todo texto é argumento

### 3.1. Relato

Um relato apenas informa fatos, sem apresentar uma afirmação como razão para outra:

> A sessão começou às nove. O relatório foi lido às dez. A votação terminou ao meio-dia.

### 3.2. Explicação

Uma explicação normalmente toma um fato como aceito e procura mostrar **por que** ele ocorreu:

> O portal ficou lento porque houve aumento excepcional de acessos.

Se a lentidão já é aceita, o aumento de acessos explica o fato. Se a própria ocorrência da lentidão estiver em discussão e o aumento de acessos for usado como evidência, a função argumentativa poderá ser diferente.

### 3.3. Opinião sem apoio

> A proposta é inadequada.

Há uma posição, mas não há ainda uma razão apresentada para aceitá-la.

### 3.4. Indicadores linguísticos

| Função provável | Indicadores frequentes |
|---|---|
| conclusão | portanto, logo, assim, por isso, consequentemente, daí se conclui |
| premissa | porque, pois, já que, visto que, dado que, uma vez que |

Essas palavras são **pistas**, não regras automáticas. “Então” pode ser apenas temporal; “pois” pode aparecer depois da conclusão; e argumentos podem não ter marcador algum.

## 4. Organização das premissas

### 4.1. Premissas ligadas

Precisam atuar em conjunto:

1. Todo processo urgente recebe prioridade.
2. O processo P é urgente.
3. Logo, P recebe prioridade.

Nenhuma das duas premissas, isoladamente, produz a conclusão.

### 4.2. Premissas independentes

Cada uma oferece algum apoio próprio à conclusão. Uma pode permanecer relevante mesmo se a outra for retirada.

### 4.3. Conclusão intermediária

Uma conclusão pode se tornar premissa de um passo seguinte:

1. O prazo expirou.
2. Logo, o recurso é intempestivo.
3. Recursos intempestivos não são conhecidos.
4. Portanto, o recurso não será conhecido.

“O recurso é intempestivo” é conclusão do primeiro passo e premissa do segundo.

## 5. Pressupostos

Argumentos em linguagem natural frequentemente omitem uma ponte que o autor espera que o leitor aceite.

> Rui domina a ferramenta; portanto, deve ministrar o treinamento.

Para que a passagem funcione, é preciso algum pressuposto como:

> nas circunstâncias consideradas, dominar a ferramenta é condição suficiente para estar apto a ministrar o treinamento.

Ao reconstruir um pressuposto:

1. identifique a conclusão;
2. identifique as razões expressas;
3. pergunte o que falta para ligar essas razões à conclusão;
4. não invente uma premissa apenas para “salvar” o argumento.

Um bom candidato a pressuposto deve ser compatível com o texto e relevante para a inferência.

## 6. Verdade, validade e solidez

Essas três ideias não são sinônimas.

| Conceito | Aplica-se a | Critério |
|---|---|---|
| verdade/falsidade | afirmações | conteúdo da afirmação |
| validade/invalidade | argumento dedutivo | relação entre premissas e conclusão |
| solidez | argumento dedutivo | validade + premissas verdadeiras |

### 6.1. Validade

Um argumento dedutivo é **válido** quando não há situação possível em que todas as premissas sejam verdadeiras e a conclusão seja falsa.

Exemplo:

1. Todo parecer publicado é acessível ao público.
2. O parecer P foi publicado.
3. Logo, P é acessível ao público.

Tomadas as premissas como verdadeiras, a conclusão não pode ser falsa.

### 6.2. Premissa falsa não implica invalidade

Considere:

1. Todo planeta é feito de vidro.
2. Marte é um planeta.
3. Logo, Marte é feito de vidro.

A primeira premissa é falsa no mundo real, mas a forma é válida: **se** as premissas fossem verdadeiras, a conclusão teria de ser verdadeira.

### 6.3. Conclusão verdadeira não prova validade

Uma conclusão pode ser verdadeira por acaso em um argumento inválido. Para avaliar validade, examine a relação inferencial, não apenas o valor de verdade da conclusão.

### 6.4. Solidez

Um argumento dedutivo é **sólido** quando:

1. é válido; e
2. todas as suas premissas são verdadeiras.

Todo argumento sólido tem conclusão verdadeira. O inverso não é garantido.

## 7. Contraexemplo

Para mostrar que um argumento dedutivo é inválido, basta construir um cenário coerente em que:

- todas as premissas sejam verdadeiras; e
- a conclusão seja falsa.

Exemplo:

1. Todo documento protocolado recebe número.
2. O documento D tem número.
3. Logo, D foi protocolado.

Contraexemplo: D recebeu um número interno antes do protocolo e ainda não foi protocolado.

Nesse cenário, as duas premissas podem ser verdadeiras e a conclusão falsa. Logo, a inferência não é válida.

> Contraexemplo à validade não precisa ter ocorrido de fato; precisa apenas ser logicamente compatível com as premissas.

## 8. Força das conclusões

### 8.1. Necessária

Uma conclusão é necessária relativamente às premissas quando não pode ser falsa se elas forem verdadeiras.

### 8.2. Provável

Uma conclusão provável recebe apoio relevante, mas ainda pode ser falsa.

### 8.3. Possível

Uma conclusão possível é apenas compatível com o que se sabe. Isso não basta para dizer que seja provável.

| Grau | Ideia central |
|---|---|
| necessário | não pode falhar dadas as premissas |
| provável | tem apoio, mas pode falhar |
| possível | não foi excluído |

**Possível ≠ provável ≠ necessário.**

A força da linguagem deve acompanhar a força do apoio. Evidência limitada não justifica automaticamente “sempre”, “todos”, “necessariamente” ou “sem exceção”.

## 9. Dedução

Na **dedução**, as premissas pretendem garantir a conclusão.

Características:

- a conclusão é apresentada como inevitável relativamente às premissas;
- validade independe de a premissa ser verdadeira no mundo real;
- um único contraexemplo adequado destrói a validade;
- conclusão verdadeira, por si só, não confirma a forma.

Exemplo:

1. Nenhum relatório sem assinatura é protocolado.
2. R não possui assinatura.
3. Logo, R não é protocolado.

Se as premissas forem verdadeiras, a conclusão é necessária.

## 10. Indução

Na **indução**, casos observados sustentam generalizações ou previsões sem garantia absoluta.

Exemplo:

> Em amostra ampla e representativa, a maioria dos usuários preferiu o canal digital. É provável que essa preferência também apareça no conjunto dos usuários.

A força da indução aumenta quando:

- a amostra é adequada ao universo;
- há diversidade e representatividade;
- o número de casos é suficiente para a conclusão pretendida;
- não há seleção enviesada;
- a conclusão é proporcional aos dados.

Ela enfraquece quando:

- poucos casos são transformados em regra geral;
- a amostra exclui grupos relevantes;
- a conclusão universal excede a base disponível;
- existem exceções relevantes ignoradas.

Premissas verdadeiras podem sustentar uma indução forte sem tornar a conclusão necessária.

## 11. Analogia

Um argumento por analogia usa semelhanças entre um caso conhecido e outro caso para sustentar uma conclusão sobre este último.

Exemplo:

> Duas unidades usam o mesmo sistema, têm equipes e volume de atendimento semelhantes e executam o mesmo fluxo. Uma mudança reduziu retrabalho na unidade A. Isso fornece razão para esperar benefício semelhante em B, embora não garanta resultado idêntico.

### 11.1. Como avaliar

Pergunte:

1. as semelhanças têm relação com a característica que se quer transferir?
2. existe diferença relevante entre os casos?
3. a característica está realmente presente no caso conhecido?
4. a conclusão é proporcional ao grau de semelhança?

Uma única diferença decisiva pode enfraquecer mais a analogia do que várias semelhanças superficiais a fortalecem.

Exemplo de diferença decisiva:

> A unidade B possui restrição que impede justamente a mudança responsável pelo resultado obtido em A.

Nesse caso, a analogia perde força.

## 12. Padrões condicionais em linguagem natural

Considere a regra:

> Se A ocorre, então B ocorre.

Aqui, o objetivo é avaliar a inferência verbal. O cálculo formal de proposições e equivalências pertence aos assuntos seguintes.

### 12.1. Afirmação da condição — válida

1. Se A, então B.
2. A.
3. Logo, B.

Esse padrão é tradicionalmente chamado **modus ponens**.

### 12.2. Negação da consequência — válida

1. Se A, então B.
2. Não B.
3. Logo, não A.

Esse padrão é tradicionalmente chamado **modus tollens**.

### 12.3. Afirmação da consequência — inválida

1. Se A, então B.
2. B.
3. Logo, A.

A conclusão não é garantida porque B pode ocorrer por outra razão.

Exemplo:

> Se choveu, a rua está molhada. A rua está molhada. Logo, choveu.

A rua poderia ter sido lavada.

### 12.4. Negação da condição — inválida

1. Se A, então B.
2. Não A.
3. Logo, não B.

B pode ocorrer por outro caminho.

Exemplo:

> Se o relatório foi enviado por e-mail, chegou hoje. Não foi enviado por e-mail. Logo, não chegou hoje.

Ele poderia ter chegado por outro canal.

## 13. Relevância e suficiência do apoio

Além da validade dedutiva, muitas questões pedem reconhecer se as razões efetivamente sustentam a conclusão.

### 13.1. Relevância

A razão precisa dizer respeito à propriedade afirmada.

> A proposta é popular; logo, é juridicamente válida.

Popularidade, sozinha, não demonstra legalidade.

### 13.2. Suficiência

Uma razão pode ser relevante e ainda ser insuficiente.

> Dois usuários reclamaram; logo, todos os usuários rejeitam o serviço.

As reclamações têm relação com satisfação, mas a base é pequena demais para a conclusão universal.

### 13.3. Conclusão proporcional

Quanto mais forte e ampla a conclusão, maior deve ser o apoio.

- “pode ocorrer” exige menos que “provavelmente ocorrerá”;
- “provavelmente” exige menos que “necessariamente”;
- um caso não sustenta automaticamente uma regra universal.

## 14. Método de resolução

### Passo 1 — encontre a conclusão

Pergunte: **qual afirmação o autor quer que eu aceite?**

### Passo 2 — identifique as premissas

Quais afirmações são oferecidas como razões?

### Passo 3 — reconstrua a ligação

Há pressuposto omitido ou conclusão intermediária?

### Passo 4 — determine a força pretendida

A conclusão é apresentada como:

- necessária;
- provável;
- possível;
- sustentada por analogia?

### Passo 5 — aplique o teste adequado

- **dedução:** procure contraexemplo;
- **indução:** examine quantidade, representatividade e alcance;
- **analogia:** procure semelhanças relevantes e diferenças decisivas;
- **condicional:** confira a direção da regra.

### Passo 6 — compare a conclusão com o apoio

A razão é relevante? É suficiente? A conclusão exagera o que as premissas permitem?

## 15. Armadilhas frequentes

1. **Conclusão verdadeira = argumento válido.** Não.
2. **Premissa falsa = argumento inválido.** Não.
3. **Válido = sólido.** Não: solidez também exige premissas verdadeiras.
4. **Um exemplo favorável prova necessidade.** Não.
5. **Possível = provável.** Não.
6. **Provável = necessário.** Não.
7. **“Antes ocorreu X, depois Y” prova que X causou Y.** Não necessariamente.
8. **Muitas semelhanças superficiais garantem boa analogia.** Não.
9. **Um caso permite concluir sobre todos.** Não.
10. **Se A leva a B e B ocorreu, então A ocorreu.** Não.
11. **Se A leva a B e A não ocorreu, então B não ocorreu.** Não.
12. **Indicador como “logo” resolve sozinho a estrutura.** Não: o contexto continua necessário.
13. **Pressuposto pode ser qualquer frase que torne o argumento válido.** Não: deve ser compatível com a passagem real.

## 16. Síntese operacional

Para resolver questões de lógica de argumentação:

1. separe premissas e conclusão;
2. identifique pressupostos e etapas intermediárias quando houver;
3. não confunda verdade com validade nem validade com solidez;
4. teste deduções por contraexemplo;
5. trate induções como apoio graduado, não como garantia;
6. avalie analogias por semelhanças relevantes e diferenças decisivas;
7. diferencie conclusão necessária, provável e possível;
8. em condicionais, respeite a direção da regra;
9. verifique se o apoio é relevante e suficiente para a força da conclusão.

## Referências

- CEBRASPE. [Edital nº 1 — TCE/MA, de 6 de julho de 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Conteúdo programático do Cargo 1.
- DUTIH NOVAES, Catarina; BENTHEM, Johan van; HITCHCOCK, David. [Argument and Argumentation](https://plato.stanford.edu/archives/fall2024/entries/argument/). Stanford Encyclopedia of Philosophy, edição de outono de 2024.
- HAWTHORNE, James. [Inductive Logic](https://plato.stanford.edu/entries/logic-inductive/). Stanford Encyclopedia of Philosophy, revisão substantiva de 24 fev. 2025.
- ALMEIDA, Aires. [Validade, verdade e solidez de argumentos](https://ensina.rtp.pt/explicador/validade-verdade-e-solidez-de-argumentos/). RTP Ensina, 2020.
