---
schemaVersion: 1
title: Previsão e controle de estoque
description: Previsão de demanda, políticas de reposição, níveis, tempo de ressuprimento, estoque de segurança e métodos de avaliação de estoques.
order: 119
storageId: previsao-controle-estoque
---

# Previsão e controle de estoque

Comprar cedo demais imobiliza recursos e aumenta risco de perda; comprar tarde demais interrompe o serviço. O controle de estoque existe para administrar essa tensão: **estimar o que será necessário, decidir quando e quanto repor, manter proteção contra incerteza e saber quanto o estoque representa**.

> **Modelo mental:** demanda observada → previsão → política de reposição → níveis de estoque → pedido e ressuprimento → acompanhamento → avaliação do saldo.

O Edital nº 1 do <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr>, publicado em **6 de julho de 2026**, delimita este assunto a planejamento, processos e políticas de administração de estoques; determinação de níveis; tempo de ressuprimento e estoque de segurança; e métodos de avaliação de estoques.

A Instrução Normativa <abbr title="Secretaria de Administração Pública da Presidência da República">SEDAP</abbr> nº 205/1988 é referência operacional do <abbr title="Sistema de Serviços Gerais">SISG</abbr> federal. Ela ajuda a compreender fórmulas e decisões de reposição, mas não se aplica automaticamente ao Estado do Maranhão nem ao <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr>. Na avaliação contábil, a Lei nº 4.320/1964 e a 11ª edição do <abbr title="Manual de Contabilidade Aplicada ao Setor Público">MCASP</abbr> são referências centrais no corte da prova. A <abbr title="Norma Brasileira de Contabilidade Técnica do Setor Público 04, revisão 1">NBC TSP 04 (R1)</abbr> já havia sido publicada, mas sua própria cláusula de vigência determina aplicação aos exercícios iniciados a partir de **1º de janeiro de 2027**, salvo prazo nacional específico.

<!-- REVISAO-PREVISAO-ESTOQUE-2026 -->

## 1. O que o estoque resolve — e o que ele custa

Estoque é material mantido para atender necessidade futura. Ele funciona como uma **reserva entre fluxos que não coincidem perfeitamente**: o consumo ocorre em um ritmo, enquanto compra, entrega, recebimento e liberação ocorrem em outro.

Manter estoque pode:

- evitar interrupções por atraso ou oscilação da demanda;
- permitir compras ou entregas em lotes economicamente convenientes;
- absorver diferenças entre consumo e reposição;
- sustentar serviços essenciais enquanto uma nova aquisição chega.

Mas estoque também consome recursos. Seus custos podem ser agrupados em quatro famílias:

1. **aquisição:** preço e gastos diretamente ligados à obtenção do material;
2. **pedido ou reposição:** esforço administrativo para cada compra ou ressuprimento;
3. **manutenção:** espaço, seguro, manuseio, capital imobilizado, deterioração e obsolescência;
4. **falta:** atraso, compra emergencial, paralisação ou nível de serviço perdido quando o material não está disponível.

A política de estoque não busca “o menor saldo possível” nem “zero ruptura a qualquer custo”. Busca um nível coerente com **risco, criticidade, custo, prazo de reposição e nível de serviço**.

### 1.1 Planejamento, processo e política

Essas três ideias aparecem juntas no edital, mas não são sinônimas:

| Ideia | Pergunta principal | Exemplo |
| --- | --- | --- |
| **planejamento** | o que se espera consumir e quais riscos existem? | estimar demanda e prazo de reposição |
| **processo** | quais etapas transformam necessidade em material disponível? | identificar necessidade → pedir → comprar → receber → registrar → disponibilizar |
| **política** | quais regras disparam e dimensionam a reposição? | pedir ao atingir o ponto de pedido; revisar a cada mês |

Uma política só funciona se o processo produzir dados confiáveis. Saldo incorreto, pedido em trânsito não registrado ou consumo lançado com atraso podem fazer uma fórmula correta gerar uma decisão errada.

## 2. Prever demanda: primeiro entenda o padrão

Previsão não é adivinhação. É uma estimativa apoiada em histórico, contexto e hipótese explícita. Antes de escolher um método, observe **como a demanda se comporta**.

### 2.1 Demanda independente e dependente

- **independente:** decorre diretamente da necessidade do usuário ou do serviço; é estimada a partir de consumo, pedidos, população atendida ou outra variável relevante;
- **dependente:** deriva da necessidade de outro item ou plano conhecido; se cada kit usa duas baterias e serão montados 300 kits, a necessidade bruta é 600 baterias.

Materiais de expediente e itens de manutenção costumam apresentar demanda independente; componentes de um conjunto programado podem ter demanda dependente.

### 2.2 Padrões que mudam o método

| Padrão | Sinal nos dados | Consequência |
| --- | --- | --- |
| estável | oscila em torno de um nível | médias e suavização simples podem funcionar bem |
| tendência | cresce ou cai de forma persistente | média simples tende a atrasar a mudança |
| sazonalidade | padrão se repete em períodos regulares | é preciso representar o ciclo |
| intermitência | muitos períodos com zero e consumos esporádicos | médias comuns podem reagir mal |
| evento excepcional | pico por campanha, crise ou mudança de regra | o histórico precisa ser interpretado, não apenas repetido |

**Demanda registrada não é necessariamente demanda real.** Se o item faltou, uma requisição não atendida pode desaparecer do histórico de saídas. Usar apenas o consumo registrado pode perpetuar a subprevisão. Sempre que possível, confronte saídas com requisições, faltas, cancelamentos e mudanças de atendimento.

### 2.3 Métodos básicos de previsão

Quando o histórico é insuficiente ou houve mudança estrutural, a previsão pode incorporar **julgamento de especialistas, consulta às unidades usuárias e informação sobre eventos futuros**. O método qualitativo não significa estimativa sem critério: hipóteses e fontes devem ser registradas para posterior comparação com o realizado.

Com histórico utilizável, métodos quantitativos simples são um bom ponto de partida. Considere demandas observadas $A_t$ e previsão $F_t$.

#### Média móvel

A média dos últimos $n$ períodos é:

$$
F_{t+1}=\frac{A_t+A_{t-1}+\cdots+A_{t-n+1}}{n}
$$

Ela suaviza ruído, mas reage lentamente a mudanças. Uma janela curta reage mais rápido; uma janela longa é mais estável.

#### Média móvel ponderada

Atribui pesos diferentes às observações:

$$
F_{t+1}=w_1A_t+w_2A_{t-1}+\cdots+w_nA_{t-n+1},
\qquad \sum w_i=1
$$

Pesos maiores nos períodos recentes tornam a previsão mais sensível a mudanças recentes.

#### Suavização exponencial simples

Atualiza a previsão usando o último erro:

$$
F_{t+1}=\alpha A_t+(1-\alpha)F_t,
\qquad 0<\alpha<1
$$

Quanto maior $\alpha$, maior a reação ao dado recente. A forma simples é adequada quando não há tendência ou sazonalidade relevantes; quando esses componentes são importantes, modelos que os representem explicitamente são preferíveis.

### 2.4 Medir o erro antes de confiar no método

Adote uma convenção e mantenha-a. Aqui:

$$
e_t=A_t-F_t
$$

Erro positivo significa que a demanda realizada superou a previsão; erro negativo significa previsão acima do realizado.

Métricas frequentes:

- **erro médio:** $\frac{1}{n}\sum e_t$ — evidencia viés, pois sinais opostos podem se cancelar;
- <abbr title="Mean Absolute Deviation, desvio absoluto médio">MAD</abbr>: $\frac{1}{n}\sum |e_t|$ — mede erro típico na unidade original;
- <abbr title="Mean Squared Error, erro quadrático médio">MSE</abbr>: $\frac{1}{n}\sum e_t^2$ — penaliza fortemente erros grandes;
- <abbr title="Root Mean Squared Error, raiz do erro quadrático médio">RMSE</abbr>: $\sqrt{\frac{1}{n}\sum e_t^2}$ — volta à unidade original;
- <abbr title="Mean Absolute Percentage Error, erro percentual absoluto médio">MAPE</abbr>: $\frac{100}{n}\sum\left|\frac{e_t}{A_t}\right|$ — facilita comparação percentual, mas é problemático quando $A_t=0$ ou muito pequeno.

Não escolha método apenas porque ele ajustou bem os mesmos dados usados para estimá-lo. Separe períodos anteriores para ajuste e posteriores para validação; compare também com uma regra simples, como repetir o último valor. Um modelo complexo que não supera uma referência simples não ganha mérito por ser complexo.

## 3. O saldo que importa para a reposição

“Há 100 unidades em estoque” pode ser insuficiente para decidir. Parte delas pode estar reservada, bloqueada ou vencida, enquanto outra parte já foi comprada e está em trânsito.

Distinga:

- **estoque físico:** quantidade realmente presente;
- **estoque utilizável:** parte física efetivamente disponível para atender demanda;
- **estoque em trânsito:** quantidade já pedida e ainda não recebida ou liberada;
- **faltas pendentes:** demanda reconhecida que ainda precisa ser atendida;
- **posição de estoque:** visão usada para decidir reposição.

Uma forma usual de posição de estoque é:

$$
IP=\text{utilizável}+\text{em trânsito}-\text{faltas pendentes}
$$

**Exemplo hipotético.** Há 80 unidades utilizáveis, 40 em trânsito e 10 unidades de faltas pendentes. A posição é $80+40-10=110$. Decidir com base apenas nas 80 unidades físicas ignoraria uma compra já em curso.

### 3.1 Níveis de estoque

Os principais níveis formam uma lógica única:

| Nível | Função |
| --- | --- |
| **estoque de segurança** | absorver incerteza de demanda e/ou prazo |
| **estoque mínimo** | piso operacional; em algumas fontes coincide com o estoque de segurança |
| **ponto de pedido** | nível que dispara uma nova reposição |
| **estoque máximo** | teto ou alvo superior da política |
| **estoque médio** | média mantida no período; útil para custos e indicadores |

Não memorize nomes isolados. Pergunte **qual evento cada nível controla**: proteção, disparo, limite superior ou medida média.

## 4. Tempo de ressuprimento e ponto de pedido

<abbr title="Tempo total entre iniciar a reposição e ter o material disponível">Lead time</abbr> é o tempo total entre iniciar a reposição e ter o item efetivamente disponível para uso. Pode incluir:

```text
preparar a necessidade
→ aprovar/processar a compra
→ fornecedor preparar e transportar
→ receber e conferir
→ registrar/liberar para uso
```

Atraso em qualquer etapa aumenta o tempo de exposição do estoque. Por isso, prazo contratual de entrega e <abbr title="Tempo total entre iniciar a reposição e ter o material disponível">lead time</abbr> administrativo não são necessariamente iguais.

Se a demanda média por período é $d$, o tempo de ressuprimento é $L$ e o estoque de segurança é $ES$, uma forma básica do ponto de pedido é:

$$
PP=dL+ES
$$

**Exemplo hipotético.** Consumo médio de 12 unidades por dia, tempo de ressuprimento de 5 dias e segurança de 20 unidades:

$$
PP=12\times5+20=80
$$

Ao atingir 80 unidades de posição de estoque, a política dispara a reposição. O ponto de pedido **não é** a quantidade a comprar; ele responde **quando pedir**.

## 5. Políticas de reposição: quando revisar e quanto pedir

### 5.1 Revisão contínua

A posição é acompanhada continuamente. Quando alcança o ponto de pedido $r$, emite-se um pedido de quantidade $Q$.

É comum representar essa política como $(Q,r)$.

**Vantagem:** reage rapidamente à queda do saldo.  
**Custo:** exige registro confiável e acompanhamento frequente.

### 5.2 Revisão periódica

A posição é verificada a cada intervalo fixo $R$. Na data de revisão, pede-se o necessário para elevar a posição a um nível-alvo $S$:

$$
Q=S-IP
$$

Como o estoque só é observado em datas específicas, a proteção precisa cobrir o tempo até a próxima revisão **mais** o tempo de ressuprimento.

### 5.3 Sistema de duas gavetas e mínimo–máximo

No sistema de duas gavetas, a primeira atende o consumo normal e a segunda funciona como reserva para o período de reposição. É uma implementação visual de uma política de ponto de pedido.

Na política mínimo–máximo, um nível inferior dispara a reposição e o pedido procura recompor o estoque até o máximo definido. O nome é simples; a qualidade depende de como mínimo, máximo e posição foram calculados.

### 5.4 A regra federal da Instrução Normativa nº 205/1988

A Instrução Normativa <abbr title="Secretaria de Administração Pública da Presidência da República">SEDAP</abbr> nº 205/1988 define, no <abbr title="Sistema de Serviços Gerais">SISG</abbr> federal:

- consumo médio mensal $c$: média aritmética do consumo dos últimos 12 meses;
- tempo de aquisição $T$: período entre emissão do pedido de compra e recebimento no almoxarifado;
- intervalo de aquisição $I$: período entre aquisições normais sucessivas;
- estoque mínimo ou de segurança $Em$;
- estoque máximo $EM$;
- ponto de pedido $Pp$;
- quantidade a ressuprir $Q$.

As fórmulas da norma são:

$$
Em=c\times f
$$

$$
EM=Em+cI
$$

$$
Pp=Em+cT
$$

$$
Q=cI
$$

A fração $f$, segundo a norma, deve em princípio variar de $0{,}25T$ a $0{,}50T$, e o estoque mínimo é indicado para itens indispensáveis ao serviço. Essas fórmulas pertencem a uma regra federal específica; não transforme seus parâmetros em lei universal da gestão de estoques.

## 6. Estoque de segurança: proteção contra incerteza

O estoque de segurança existe porque previsão e prazo não são perfeitamente certos. Ele não é “estoque parado sem função”: é a parcela destinada a reduzir o risco de falta durante a reposição.

A lógica é:

```text
demanda esperada durante o ressuprimento
+ margem para incerteza
= nível de proteção para o ciclo
```

### 6.1 Quando a demanda varia e o prazo é fixo

Se a demanda por período tem desvio-padrão $\sigma_d$, o prazo fixo é $L$ períodos e se adota fator de serviço $z$:

$$
ES=z\sigma_d\sqrt{L}
$$

Quanto maior a variabilidade, o prazo ou o nível de serviço pretendido, maior tende a ser a segurança.

**Exemplo hipotético.** Se $z=1{,}65$, $\sigma_d=4$ unidades e $L=9$ períodos:

$$
ES=1{,}65\times4\times\sqrt{9}=19{,}8\approx20
$$

### 6.2 Quando o prazo varia e a demanda por período é estável

Se a demanda média é $d$ e o desvio-padrão do prazo é $\sigma_L$:

$$
ES=zd\sigma_L
$$

A fórmula muda porque a fonte de incerteza mudou. Em problemas reais, demanda e prazo podem variar ao mesmo tempo; a banca deve fornecer ou pressupor um modelo para combinar essas variabilidades. Não misture fórmulas sem verificar a hipótese.

### 6.3 Serviço e ruptura

Aumentar o estoque de segurança tende a reduzir a probabilidade de ruptura, mas aumenta manutenção e capital imobilizado. O nível ótimo de proteção depende da consequência da falta.

Dois indicadores não devem ser confundidos:

- **nível de serviço por ciclo:** probabilidade ou proporção de ciclos sem ruptura, conforme a definição adotada;
- <abbr title="Fração da demanda atendida imediatamente com o estoque disponível">fill rate</abbr>: fração das unidades demandadas atendidas imediatamente.

Um ciclo pode sofrer pequena falta e, ainda assim, manter alto <abbr title="Fração da demanda atendida imediatamente com o estoque disponível">fill rate</abbr>. Sempre declare o que o indicador mede.

## 7. Quanto pedir: lote econômico de compra

O <abbr title="Lote Econômico de Compra">LEC</abbr>, também conhecido pela sigla inglesa <abbr title="Economic Order Quantity, lote econômico de compra">EOQ</abbr>, equilibra dois custos que se movem em sentidos opostos:

- pedidos grandes → menos pedidos, mas mais estoque médio;
- pedidos pequenos → menos estoque médio, mas mais pedidos.

No modelo clássico:

$$
Q^*=\sqrt{\frac{2DS}{H}}
$$

em que:

- $D$ = demanda no período;
- $S$ = custo de emitir um pedido;
- $H$ = custo de manter uma unidade em estoque no mesmo período.

**Exemplo hipotético.** Demanda anual de 3.600 unidades, custo de pedido de R$ 50 e manutenção de R$ 2 por unidade/ano:

$$
Q^*=\sqrt{\frac{2\times3.600\times50}{2}}\approx424
$$

O resultado só é interpretável se $D$ e $H$ usam a mesma unidade de tempo.

O modelo clássico pressupõe, entre outras simplificações, demanda conhecida e relativamente estável, reposição sem ruptura e custos de pedido/manutenção tratáveis como constantes. Se essas hipóteses não valem, o <abbr title="Lote Econômico de Compra">LEC</abbr> funciona como referência, não como ordem automática de compra.

## 8. Controle seletivo: valor e criticidade

Nem todo item merece o mesmo esforço de controle. A classificação <abbr title="Classificação por valor anual de consumo">ABC</abbr> prioriza o **impacto econômico** do consumo anual:

$$
\text{valor anual de consumo}=\text{quantidade anual}\times\text{custo unitário}
$$

Ordenam-se os itens do maior para o menor valor anual, calcula-se a participação acumulada e formam-se classes. Os cortes percentuais são convenções gerenciais, não limites legais universais.

Em termos usuais:

- classe A: poucos itens concentram parcela elevada do valor;
- classe B: faixa intermediária;
- classe C: muitos itens representam parcela menor do valor.

A classificação <abbr title="Classificação por criticidade na convenção deste capítulo">XYZ</abbr>, na convenção adotada aqui, mede **criticidade**:

- X: baixa consequência da falta;
- Y: consequência intermediária;
- Z: alta criticidade ou difícil substituição.

Alguns autores usam as letras X, Y e Z para previsibilidade da demanda, e não criticidade. Por isso, a letra isolada nunca deve substituir a definição do critério.

A combinação evita um erro comum: item barato pode ser classe C pelo valor e Z pela criticidade. Se sua falta paralisa serviço essencial, tratá-lo como pouco importante apenas porque custa pouco seria inadequado.

## 9. Indicadores para saber se a política funciona

Indicadores precisam ser lidos em conjunto. Um giro alto pode significar uso eficiente ou estoque enxuto demais se houver rupturas frequentes.

### 9.1 Giro

$$
\text{giro}=\frac{\text{consumo no período}}{\text{estoque médio}}
$$

Numerador e denominador devem usar base compatível: unidades com unidades ou valores com valores.

### 9.2 Cobertura

$$
\text{cobertura}=\frac{\text{estoque utilizável}}{\text{demanda média por período}}
$$

Se há 600 unidades utilizáveis e demanda média de 30 por dia, a cobertura simples é 20 dias.

### 9.3 Ruptura e atendimento

A organização deve declarar o denominador: ocorrências, dias, linhas de requisição ou unidades não atendidas. Não existe uma única fórmula universal de “índice de ruptura”.

Para atendimento imediato em unidades:

$$
\text{atendimento imediato}=\frac{\text{unidades atendidas imediatamente}}{\text{unidades demandadas}}
$$

### 9.4 Acurácia de estoque

Acurácia de estoque compara **registro e físico**. Acurácia de previsão compara **previsto e realizado**. Confundir as duas impede diagnosticar se o problema está no cadastro ou no modelo de demanda.

## 10. Avaliação de estoques: separar fluxo físico de valor contábil

O edital cobra “avaliação de estoques — métodos”. Aqui há duas perguntas diferentes:

1. **qual unidade sai fisicamente primeiro?** — regra de rotação e armazenagem;
2. **qual custo é atribuído à saída e ao saldo?** — critério de valoração.

A Instrução Normativa <abbr title="Secretaria de Administração Pública da Presidência da República">SEDAP</abbr> nº 205/1988 recomenda, no âmbito federal que disciplina, fornecer primeiro os materiais estocados há mais tempo: <abbr title="Primeiro a Entrar, Primeiro a Sair">PEPS</abbr> físico, para evitar envelhecimento.

Na contabilidade pública, a Lei nº 4.320/1964 estabelece no artigo 106, III, que **os bens de almoxarifado são avaliados pelo preço médio ponderado das compras**. A 11ª edição do <abbr title="Manual de Contabilidade Aplicada ao Setor Público">MCASP</abbr> reproduz essa regra e, para estoques em geral, admite identificação específica quando possível; quando não for possível, apresenta <abbr title="Primeiro a Entrar, Primeiro a Sair">PEPS</abbr> ou custo médio ponderado, mantendo a regra legal específica dos bens de almoxarifado.

### 10.1 Métodos clássicos

#### Identificação específica

Cada item individualizado conserva seu próprio custo. É adequado quando os itens não são normalmente intercambiáveis ou estão segregados para projeto específico.

#### <abbr title="Primeiro a Entrar, Primeiro a Sair">PEPS</abbr>

As primeiras unidades que entram são as primeiras consideradas na saída para fins de custo. Assim, o saldo final tende a refletir custos de aquisições mais recentes.

#### Custo médio ponderado

Cada nova entrada altera o custo médio das unidades disponíveis. Em média móvel após uma compra:

$$
\text{novo custo médio}=\frac{\text{valor do saldo anterior}+\text{valor da entrada}}
{\text{quantidade do saldo anterior}+\text{quantidade da entrada}}
$$

**Exemplo hipotético.** Saldo de 100 unidades a R$ 10 e entrada de 50 unidades a R$ 16:

$$
\frac{100\times10+50\times16}{150}=R\$12
$$

Uma saída posterior de 60 unidades, usando esse custo médio, é avaliada em R$ 720.

#### <abbr title="Último a Entrar, Primeiro a Sair">UEPS</abbr>

É o método em que os custos mais recentes são atribuídos primeiro às saídas. Ele é importante como conceito comparativo, mas **não é o critério dos bens de almoxarifado da Lei nº 4.320/1964** e não aparece entre os critérios admitidos pela <abbr title="Norma Brasileira de Contabilidade Técnica do Setor Público 04, revisão 1">NBC TSP 04 (R1)</abbr> para estoques intercambiáveis.

### 10.2 A norma contábil revisada e o corte temporal

A <abbr title="Norma Brasileira de Contabilidade Técnica do Setor Público 04, revisão 1">NBC TSP 04 (R1)</abbr> foi publicada no Diário Oficial da União em 17 de março de 2026 e estava formalmente em vigor na data do edital. A cláusula de vigência, porém, determina **aplicação aos exercícios iniciados a partir de 1º de janeiro de 2027**, salvo prazo nacional específico.

Ela prevê, entre outros pontos:

- identificação específica para itens não intercambiáveis ou segregados para projetos específicos;
- <abbr title="Primeiro a Entrar, Primeiro a Sair">PEPS</abbr> ou custo médio ponderado para os demais estoques de natureza e uso semelhantes;
- regra geral de mensuração pelo menor entre custo e valor realizável líquido, com tratamentos específicos para certas hipóteses do setor público.

Para uma questão que peça a regra dos **bens de almoxarifado**, priorize a literalidade do artigo 106, III, da Lei nº 4.320/1964: **preço médio ponderado das compras**. Para questão que indique outra fonte normativa, siga o comando e o recorte temporal apresentados.

## 11. Como resolver questões sem misturar conceitos

Use esta sequência:

1. **Identifique a decisão.** É prever demanda, decidir quando pedir, quanto pedir, proteger contra incerteza ou avaliar o saldo?
2. **Fixe a unidade de tempo.** Dia, mês e ano não podem ser combinados sem conversão.
3. **Escolha a variável correta.** Saldo físico, utilizável e posição de estoque não são equivalentes.
4. **Leia a hipótese da fórmula.** Demanda variável com prazo fixo exige modelo diferente de prazo variável com demanda estável.
5. **Separe disparo de quantidade.** Ponto de pedido responde quando; lote ou quantidade de ressuprimento responde quanto.
6. **Identifique a fonte normativa.** Fórmula gerencial, Instrução Normativa federal, Lei nº 4.320/1964, <abbr title="Manual de Contabilidade Aplicada ao Setor Público">MCASP</abbr> e <abbr title="Norma Brasileira de Contabilidade Técnica do Setor Público 04, revisão 1">NBC TSP 04 (R1)</abbr> não são intercambiáveis.
7. **Separe fluxo físico de valoração.** “Sai o mais antigo primeiro” não responde sozinho qual custo contábil deve ser atribuído.

Se esses sete passos estiverem claros, a maior parte das pegadinhas de estoque deixa de ser memorização e vira diagnóstico do mecanismo correto.
