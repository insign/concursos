---
schemaVersion: 1
title: Previsão e controle de estoque
description: Planejamento e políticas de estoque, previsão de demanda, níveis, ressuprimento, estoque de segurança, lote econômico, classificações, indicadores e avaliação contábil.
order: 119
storageId: previsao-controle-estoque
---

# Previsão e controle de estoque

Estoque separa, no tempo, a disponibilidade do material e sua utilização. Ele protege a continuidade do serviço, mas também imobiliza recursos, ocupa espaço e se expõe a perda, deterioração e obsolescência. Por isso, controlar estoque não significa maximizar quantidades nem reduzi-las indiscriminadamente: significa decidir **o que manter, quanto manter, quando repor, quanto pedir e como avaliar** cada item.

> **Ideia central:** a política de estoque equilibra custo de falta e custo de excesso com base em demanda, tempo de ressuprimento, criticidade, nível de serviço e capacidade de controle.

Este material considera as normas vigentes até **15 de julho de 2026**. A Lei nº 4.320/1964 e as normas contábeis tratam da avaliação patrimonial dos estoques. A Instrução Normativa SEDAP nº 205/1988 oferece fórmulas e procedimentos operacionais do **SISG federal**; ela é referência de estudo, mas não se aplica automaticamente ao Estado do Maranhão ou ao TCE-MA.

## 1. Por que planejar estoques

### 1.1 Funções do estoque

O estoque pode:

- assegurar material durante o tempo de aquisição;
- absorver variações de consumo e atrasos de fornecimento;
- atender sazonalidade, campanhas ou emergências;
- desacoplar etapas de um processo;
- viabilizar lotes de compra ou produção;
- manter itens estratégicos ou de reposição difícil;
- evitar interrupção de uma atividade essencial.

Essas funções não tornam qualquer quantidade desejável. Estoque excessivo pode esconder previsão ruim, compra sem planejamento ou item sem uso. Estoque insuficiente pode transferir o custo para compras emergenciais, atraso e descontinuidade do serviço.

### 1.2 Custos relevantes

| Grupo | Exemplos |
| --- | --- |
| aquisição | preço, frete, seguro, tributos não recuperáveis e custos diretamente atribuíveis |
| pedido ou obtenção | especificação, processamento, contratação, emissão, acompanhamento e recebimento |
| manutenção ou posse | capital imobilizado, espaço, seguro, manuseio, controle, deterioração e obsolescência |
| falta ou ruptura | serviço interrompido, urgência, atraso, improdutividade e risco operacional |
| perda de informação | saldo incorreto, parâmetro desatualizado, falta de rastreabilidade e decisão errada |

O custo de aquisição contábil não é idêntico ao custo gerencial total. Custo de falta, por exemplo, é essencial à política, embora não seja incorporado ao valor contábil do material armazenado.

### 1.3 Política e processo

Uma política de estoque deve definir, por item ou classe:

1. finalidade e unidade de medida;
2. fonte, horizonte e padrão da demanda;
3. criticidade e consequência da falta;
4. nível de serviço pretendido;
5. sistema e frequência de revisão;
6. tempo de ressuprimento e sua variabilidade;
7. estoque de segurança, ponto de pedido e lote;
8. limites físicos, financeiros, orçamentários e de validade;
9. papéis para registrar, revisar parâmetros, autorizar e acompanhar;
10. indicadores, alertas e periodicidade de reavaliação.

O processo forma um ciclo:

1. obter dados confiáveis de consumo, saldo e pedidos em trânsito;
2. limpar eventos atípicos e explicar mudanças de contexto;
3. classificar demanda, valor e criticidade;
4. prever a necessidade no horizonte relevante;
5. medir tempo de ressuprimento e incerteza;
6. definir parâmetros e restrições;
7. acompanhar consumo, entrega, ruptura e excesso;
8. comparar previsão e realização;
9. recalibrar a política.

Automação não corrige cadastro ou consumo distorcido. Saídas não registradas reduzem artificialmente a demanda histórica; requisições represadas podem produzir picos que não representam consumo normal; mudança de serviço pode invalidar toda a série anterior.

## 2. Demanda e previsão

### 2.1 Demanda dependente e independente

- **Demanda independente:** não é calculada diretamente a partir da necessidade de outro item. Exemplo: consumo de papel pelas unidades. Em geral, exige previsão, contrato de atendimento ou observação do consumo.
- **Demanda dependente:** decorre da necessidade de outro item, produto, serviço ou programação. Exemplo: quatro cartuchos específicos para cada conjunto de equipamentos programado. Pode ser calculada pela relação técnica e pelo plano do item-pai.

Também se deve observar o padrão:

| Padrão | Característica | Cuidado |
| --- | --- | --- |
| estável | nível aproximadamente constante | média pode funcionar bem |
| tendência | crescimento ou queda persistente | média simples reage com atraso |
| sazonal | padrão se repete em ciclos | comparar períodos equivalentes |
| intermitente | muitos períodos com zero | média pode ocultar frequência e tamanho dos eventos |
| errático | picos sem regularidade clara | combinar análise causal, criticidade e cenários |

### 2.2 Métodos qualitativos

Métodos qualitativos são úteis para item novo, pouca história, alteração normativa, mudança estrutural ou evento extraordinário. Exemplos:

- julgamento de especialistas;
- método Delphi, com rodadas independentes e convergência;
- analogia com item ou serviço semelhante;
- pesquisa com unidades usuárias;
- cenários e informações causais.

Opinião não dispensa documentação das premissas. Uma previsão qualitativa precisa registrar quem estimou, quais dados utilizou, qual horizonte considerou e como será revisada.

### 2.3 Médias

Considere demanda real $A_t$ no período $t$ e previsão $F_t$, sempre na mesma unidade por período.

**Média aritmética simples de $n$ observações:**

$$
F_{t+1}=\frac{\sum_{i=1}^{n}A_i}{n}
$$

Ela usa toda a amostra com igual peso. Quanto mais longa a série, maior a suavização e menor a resposta a mudanças recentes.

**Média móvel simples de $n$ períodos:**

$$
F_{t+1}=\frac{A_t+A_{t-1}+\cdots+A_{t-n+1}}{n}
$$

Ao entrar uma observação nova, sai a mais antiga da janela. Janela curta reage mais; janela longa suaviza mais.

**Média móvel ponderada:**

$$
F_{t+1}=\sum_{i=0}^{n-1}w_iA_{t-i},\qquad \sum w_i=1
$$

Os pesos devem ser explícitos. Dar peso maior ao período recente pode acompanhar uma mudança, mas também amplifica ruído.

### 2.4 Suavização exponencial simples

$$
F_{t+1}=\alpha A_t+(1-\alpha)F_t,\qquad 0<\alpha\leq1
$$

O parâmetro $\alpha$ controla a resposta:

- $\alpha$ alto dá mais peso ao valor recente e reage rapidamente;
- $\alpha$ baixo produz maior suavização;
- a forma simples é adequada quando tendência e sazonalidade não são materiais.

Se $\alpha=1$, a previsão seguinte coincide com a última demanda observada. Isso não a torna necessariamente melhor: a escolha deve ser validada pelo erro fora da amostra ou ao longo do uso.

### 2.5 Tendência e sazonalidade

Uma tendência linear pode ser representada por:

$$
\widehat{D_t}=a+bt
$$

em que $a$ é o nível estimado e $b$ é a variação por período. Regressão, suavização com tendência e outros modelos exigem diagnóstico dos resíduos e não transformam crescimento passado em certeza futura.

Na sazonalidade, o efeito pode ser:

- **aditivo:** acréscimo ou redução de magnitude aproximadamente constante;
- **multiplicativo:** variação proporcional ao nível da série.

Métodos como Holt-Winters separam nível, tendência e sazonalidade, mas precisam de ciclos suficientes e comparáveis. Campanha única, pandemia, mudança de competência ou estoque acumulado não devem ser tratados automaticamente como sazonalidade.

### 2.6 Erro e viés

Defina primeiro a convenção. Neste material:

$$
e_t=A_t-F_t
$$

| Medida | Fórmula | Leitura principal |
| --- | --- | --- |
| erro médio | $MFE=\frac{\sum e_t}{n}$ | sinal persistente indica viés; erros positivos e negativos se anulam |
| desvio absoluto médio | $MAD=\frac{\sum\lvert e_t\rvert}{n}$ | erro típico na unidade original |
| erro quadrático médio | $MSE=\frac{\sum e_t^2}{n}$ | penaliza mais os erros grandes |
| raiz do erro quadrático | $RMSE=\sqrt{MSE}$ | volta à unidade original |
| erro percentual absoluto | $MAPE=\frac{100}{n}\sum\lvert e_t/A_t\rvert$ | problemático quando $A_t$ é zero ou muito baixo |
| erro absoluto ponderado | $WAPE=\frac{\sum\lvert e_t\rvert}{\sum A_t}$ | razão agregada, quando o denominador é significativo |

Não existe limite universal de erro. A tolerância depende de criticidade, custo da falta, custo do excesso e capacidade de reação. Sinal de rastreamento e limites como $\pm4$ são convenções de determinados modelos, não obrigação normativa.

## 3. Níveis e posição de estoque

### 3.1 Conceitos que não devem ser confundidos

| Conceito | Sentido |
| --- | --- |
| estoque disponível | quantidade fisicamente apta e não comprometida, conforme regra do sistema |
| estoque cíclico | parcela formada pelo lote normal de reposição |
| estoque de segurança | proteção contra incerteza de demanda ou prazo |
| estoque mínimo | piso definido pela política; pode coincidir com segurança em uma convenção, mas não universalmente |
| ponto de pedido | posição que dispara a reposição |
| estoque máximo | teto ou nível-alvo admitido pela política |
| estoque médio | média da quantidade durante o ciclo |
| estoque em trânsito | material já pedido ou transferido, ainda não disponível para uso |

A **posição de estoque** usada em um sistema de reposição pode ser escrita como:

$$
IP=\text{estoque disponível}+\text{pedidos em trânsito}-\text{faltas pendentes}
$$

A organização deve declarar se reservas, materiais bloqueados e requisições já comprometidas entram em cada parcela. Comparar apenas saldo físico com o ponto de pedido pode duplicar compras ao ignorar pedidos já emitidos.

### 3.2 Tempo de ressuprimento

O **lead time** ou tempo de ressuprimento é o período entre marcos definidos e a disponibilidade efetiva do item. Pode incluir:

- preparação e aprovação da necessidade;
- contratação ou acionamento da ata/contrato;
- emissão e confirmação da ordem;
- produção e transporte;
- recebimento, inspeção e liberação para uso.

A IN SEDAP nº 205/1988 define, em sua convenção federal, tempo de aquisição como o período entre emissão do pedido de compra e recebimento no almoxarifado, em meses. Outro sistema pode adotar marcos mais amplos. Sem definir início e fim, a média do prazo não é comparável.

Unidades precisam ser coerentes. Se $d$ está em unidades por dia, $L$ deve estar em dias; então $dL$ resulta em unidades.

## 4. Sistemas de reposição

### 4.1 Revisão contínua

No sistema de revisão contínua, a posição é acompanhada a cada evento ou com frequência suficiente. Quando $IP$ atinge o ponto de pedido, emite-se uma reposição, frequentemente de lote fixo $Q$.

Com demanda determinística:

$$
PP=dL
$$

Com estoque de segurança:

$$
PP=dL+SS
$$

Sob recebimento instantâneo, demanda uniforme e lote fixo:

$$
E_{máx}\approx Q+SS
$$

$$
E_{médio}\approx\frac{Q}{2}+SS
$$

O ponto de pedido responde **quando**; o lote responde **quanto**. Um ponto alto não implica necessariamente lote alto.

### 4.2 Revisão periódica

No sistema periódico, o estoque é revisto a cada $R$ períodos. O pedido eleva a posição a um nível-alvo $S$:

$$
Q_{pedido}=S-IP
$$

O período protegido é $R+L$: após uma revisão, a próxima oportunidade normal de pedir ocorrerá em $R$, e a entrega ainda levará $L$. O nível-alvo deve cobrir a demanda esperada nesse intervalo e a segurança correspondente.

Revisão periódica facilita consolidar pedidos, mas deixa a posição variar entre observações. Mantidas as demais condições, tende a exigir proteção maior que a revisão contínua.

### 4.3 Duas gavetas e máximos e mínimos

No sistema de **duas gavetas**, consome-se a primeira; ao esvaziá-la, dispara-se a reposição e utiliza-se a segunda. A segunda precisa cobrir a demanda durante o ressuprimento e a margem de segurança. O método visual não elimina cálculo nem registro.

Em um sistema de **máximos e mínimos**, atingir o mínimo dispara reposição suficiente para recompor o máximo definido. Os nomes variam entre autores: “mínimo” pode representar segurança, ponto de pedido ou outro piso. A fórmula e a convenção devem acompanhar o termo.

### 4.4 Convenção da IN SEDAP nº 205/1988

No âmbito do SISG federal, a IN utiliza:

- $c$: consumo médio mensal dos últimos 12 meses;
- $T$: tempo de aquisição, em meses;
- $I$: intervalo entre aquisições normais e sucessivas, em meses;
- $f$: parcela temporal de segurança, em princípio de $0{,}25T$ a $0{,}50T$;
- $Em$: estoque mínimo ou de segurança;
- $EM$: estoque máximo;
- $Pp$: ponto de pedido;
- $Q$: quantidade a ressuprir.

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

Como $c$ está em unidades/mês, $T$, $I$ e a parcela representada por $f$ precisam corresponder a tempo em meses para os resultados estarem em unidades. Esses parâmetros devem ser redimensionados conforme os resultados do controle. A faixa sugerida para $f$ não é regra universal fora do âmbito e da convenção da IN.

## 5. Estoque de segurança

Estoque de segurança é proteção contra a diferença entre o esperado e o realizado. Ele não corrige fornecedor sistematicamente atrasado nem previsão enviesada: primeiro se trata a causa; depois se dimensiona a incerteza residual.

### 5.1 Modelo determinístico

Se demanda e lead time são conhecidos, constantes e sem falha:

$$
SS=0\qquad\text{e}\qquad PP=dL
$$

Uma organização pode manter reserva por decisão de risco, mas ela não decorre matematicamente da incerteza nesse modelo.

### 5.2 Modelos estatísticos

Se a demanda por período varia, o prazo é fixo e as observações são independentes:

$$
SS=z\sigma_d\sqrt{L}
$$

Se a demanda por período é constante e apenas o prazo varia:

$$
SS=zd\sigma_L
$$

Se demanda e prazo variam de forma independente:

$$
SS=z\sqrt{\bar{L}\sigma_d^2+d^2\sigma_L^2}
$$

em que:

- $z$ corresponde ao nível de serviço do modelo;
- $\sigma_d$ é o desvio-padrão da demanda por período;
- $\bar L$ é o prazo médio, em períodos;
- $\sigma_L$ é o desvio-padrão do prazo, em períodos.

Essas fórmulas dependem de hipóteses de distribuição, independência, estabilidade e unidade. Correlação entre demanda e prazo exige modelo próprio. Em revisão periódica, a incerteza alcança o período protegido $R+L$, não apenas $L$.

### 5.3 Heurística de máximos

Uma fórmula didática comum é:

$$
SS=(d_{máx}L_{máx})-(\bar d\bar L)
$$

Ela protege contra um cenário histórico extremo escolhido, mas não associa diretamente o resultado a uma probabilidade de serviço. Deve ser identificada como heurística, não como regra estatística universal.

## 6. Lote econômico de compra

O lote econômico de compra, LEC ou EOQ, equilibra custo de pedir e custo de manter:

$$
Q^*=\sqrt{\frac{2DS}{H}}
$$

onde:

- $D$: demanda anual, em unidades/ano;
- $S$: custo por pedido, em reais/pedido;
- $H$: custo anual de manutenção, em reais/unidade-ano.

Se $H=iC$, com taxa anual de manutenção $i$ e custo unitário $C$:

$$
Q^*=\sqrt{\frac{2DS}{iC}}
$$

Os componentes relevantes no modelo básico são:

$$
C_{pedidos}=\frac{D}{Q}S
$$

$$
C_{manutenção}=\frac{Q}{2}H
$$

No ponto ótimo contínuo, esses componentes se igualam. O custo de aquisição $DC$ é constante quando não há desconto e, por isso, não altera o lote ótimo, embora integre o custo total.

### 6.1 Hipóteses e limites

O modelo básico pressupõe:

- demanda conhecida e constante;
- prazo conhecido;
- recebimento instantâneo e integral;
- ausência de ruptura;
- custos constantes;
- inexistência de desconto por quantidade;
- item analisado isoladamente.

Restrições orçamentárias, validade, capacidade de armazenamento, lote mínimo do fornecedor, calendário de contratação e criticidade podem afastar a solução matemática. Com desconto por quantidade, é preciso comparar o custo total nos lotes viáveis, não aplicar cegamente a fórmula básica.

**Exemplo:** para $D=12.000$ unidades/ano, $S=R\$75$ por pedido e $H=R\$3$ por unidade-ano:

$$
Q^*=\sqrt{\frac{2\times12.000\times75}{3}}\approx775\text{ unidades}
$$

O arredondamento e o lote efetivo devem respeitar embalagem, capacidade, validade e regras de aquisição.

## 7. Classificação seletiva

### 7.1 Curva ABC

A curva ABC costuma ordenar itens pelo valor anual de consumo:

$$
VAC=D_{anual}\times C_{unitário}
$$

Depois de ordenar do maior para o menor, calculam-se participações acumuladas. Em geral:

- **A:** maior impacto financeiro relativo e controle mais rigoroso;
- **B:** impacto intermediário;
- **C:** menor impacto financeiro relativo e controle simplificado compatível com risco.

Não existem percentuais universais obrigatórios como 80-15-5 ou quantidade fixa de itens. Os cortes devem refletir a distribuição real e a finalidade da classificação.

### 7.2 Criticidade XYZ

Neste material, XYZ representa **criticidade**:

- **X:** falta de baixo impacto ou substituição fácil;
- **Y:** impacto intermediário;
- **Z:** falta compromete atividade essencial, segurança ou continuidade.

Outra literatura usa XYZ para variabilidade de demanda. A letra, isoladamente, é ambígua; a convenção precisa ser declarada.

ABC não substitui XYZ. Um item de baixo valor anual de consumo pode ser **CZ**: baixo impacto financeiro, mas alta criticidade. A matriz combinada orienta nível de serviço, segurança, frequência de revisão e rigor de controle.

## 8. Indicadores

### 8.1 Giro

$$
Giro=\frac{\text{consumo anual a custo}}{\text{estoque médio a custo}}
$$

O resultado indica quantas vezes o estoque médio é renovado no ano. Numerador e denominador devem usar a mesma base. Giro alto pode indicar eficiência ou risco de ruptura; giro baixo pode indicar reserva necessária ou excesso.

### 8.2 Cobertura

$$
Cobertura=\frac{\text{estoque disponível}}{\text{demanda média por período}}
$$

O resultado é tempo: dias, semanas ou meses. Deve-se declarar se o numerador inclui segurança, reservas e material bloqueado.

### 8.3 Serviço e ruptura

“Nível de serviço” pode significar:

- **nível de serviço por ciclo:** probabilidade de não ocorrer ruptura em um ciclo de reposição;
- **fill rate:** fração das unidades demandadas atendida imediatamente.

Não são métricas equivalentes. Um ciclo com pequena falta pode reduzir o primeiro indicador, mas afetar pouco o segundo.

Ruptura pode ser medida por ocorrências, dias, unidades não atendidas ou percentual de requisições. A fórmula deve acompanhar o resultado.

### 8.4 Acurácia e obsolescência

- **acurácia de estoque:** aderência entre registro e quantidade física;
- **acurácia de previsão:** aderência entre previsão e demanda realizada;
- **itens sem movimento:** quantidade ou valor sem saída no período definido;
- **perda e obsolescência:** quantidade, valor, causa e recorrência;
- **lead time realizado:** distribuição dos prazos, não apenas média;
- **excesso:** quantidade acima do limite ou cobertura definida.

Indicador isolado não explica causa. Ruptura pode decorrer de previsão ruim, atraso de entrega, saldo incorreto ou consumo excepcional.

## 9. Avaliação contábil de estoques

### 9.1 Lei nº 4.320/1964

O art. 106 estabelece critérios de avaliação dos elementos patrimoniais. Para os **bens de almoxarifado**, o inciso III determina o **preço médio ponderado das compras**.

Essa regra de valoração não se confunde com:

- PEPS físico para evitar envelhecimento;
- ponto de pedido e estoque de segurança;
- preço da última compra;
- valor anual de consumo da curva ABC.

### 9.2 NBC TSP 04 (R1)

A NBC TSP 04 (R1), aprovada em 13 de novembro de 2025 e publicada no DOU em 17 de março de 2026, entrou em vigor na publicação e se aplica aos exercícios iniciados a partir de **1º de janeiro de 2027**, salvo prazo nacional específico.

Pela norma:

- em regra, estoque é mensurado pelo menor entre custo e valor realizável líquido;
- estoque para distribuição gratuita ou por valor irrisório é mensurado pelo menor entre custo e custo corrente de reposição;
- estoque recebido sem contraprestação tem custo inicial pelo valor justo no recebimento;
- custo inclui aquisição, transformação e outros gastos para trazer o item à condição e localização atuais;
- descontos e abatimentos reduzem o custo;
- desperdício anormal, armazenamento não necessário ao processo, administração sem contribuição à condição/local e comercialização são despesas do período;
- perda e redução são reconhecidas no resultado; reversão posterior limita-se à redução original.

Valor realizável líquido é específico para a entidade: preço estimado de venda no curso normal, menos custos de conclusão e de venda, troca ou distribuição. Ele não é sinônimo de valor justo líquido de despesas de venda.

### 9.3 Critérios de atribuição de custo

| Critério | Aplicação |
| --- | --- |
| identificação específica | itens não intercambiáveis ou segregados para projeto específico |
| PEPS contábil | primeiros custos entram primeiro nas saídas; saldo tende a refletir custos recentes |
| média ponderada periódica | média do custo disponível no período |
| média ponderada móvel | média recalculada a cada recebimento |
| UEPS | não consta entre os critérios permitidos pela NBC TSP 04 (R1) |

Para estoques de natureza e uso semelhantes, aplica-se o mesmo critério. Localização geográfica diferente, sozinha, não justifica critério distinto.

**Exemplo:** há 100 unidades a R$10 e entram 100 a R$14. Saem 120.

- custo médio ponderado: custo disponível de R$2.400 / 200 = R$12; saída de R$1.440 e saldo de 80 unidades por R$960;
- PEPS: saem 100 a R$10 e 20 a R$14 = R$1.280; restam 80 a R$14 = R$1.120.

O exemplo evidencia por que o método altera custo da saída e saldo quando os preços variam. No setor público brasileiro, a aplicação precisa respeitar conjuntamente a Lei nº 4.320/1964, o MCASP e a norma contábil vigente para o exercício.

### 9.4 PEPS físico e PEPS contábil

A IN SEDAP nº 205/1988 recomenda fornecer primeiro o material estocado há mais tempo para evitar envelhecimento. Trata-se de rotação **física** federal. A NBC TSP usa PEPS como critério de atribuição de **custos**. O item fisicamente retirado e a camada de custo atribuída são decisões conceitualmente diferentes, ainda que possam coincidir.

## 10. Casos integrados

### Caso 1: saldo alto e item crítico em falta

O estoque total possui grande valor, mas um insumo de baixo valor anual de consumo interrompe atividade essencial. A curva ABC, sozinha, pode classificá-lo como C. A criticidade Z revela a necessidade de segurança, fornecedor alternativo ou revisão frequente. Valor total não substitui análise por item.

### Caso 2: pedido duplicado

O saldo físico atinge o ponto de pedido, mas há lote já contratado em trânsito. Se o sistema comparar apenas o saldo físico, emitirá nova compra. A decisão deve usar a posição de estoque e conferir pedidos válidos, faltas e reservas.

### Caso 3: consumo crescente

A média dos últimos doze meses fica abaixo dos meses recentes porque há tendência de crescimento. A equipe deve medir o erro, investigar a causa, testar modelo com tendência e rever ponto de pedido e segurança. Aumentar arbitrariamente o estoque máximo oculta o problema.

### Caso 4: prazo médio estável, cauda de atrasos

O fornecedor entrega em média em 20 dias, mas algumas entregas levam 45. Usar apenas a média ignora variabilidade. A política deve analisar distribuição, causa dos atrasos, nível de serviço e alternativas antes de dimensionar a segurança.

### Caso 5: material para distribuição gratuita

Um órgão mantém kits para distribuição sem cobrança. A NBC TSP 04 (R1) determina, para essa finalidade, o menor entre custo e custo corrente de reposição. Aplicar automaticamente o valor realizável líquido de uma venda inexistente seria inadequado.

## 11. Pegadinhas de prova

1. **Estoque de segurança não é ponto de pedido.** O segundo inclui demanda durante o prazo e, quando adotada, segurança.
2. **Ponto de pedido responde quando; lote responde quanto.**
3. **Revisão periódica protege $R+L$.** Não apenas o lead time.
4. **Saldo físico não é posição de estoque.** Pedidos em trânsito e faltas mudam a decisão.
5. **Média longa suaviza, mas reage lentamente.**
6. **MAPE falha com demanda zero.**
7. **LEC não é obrigação legal.** É um modelo com hipóteses restritas.
8. **ABC não tem percentuais universais.**
9. **ABC mede impacto financeiro; XYZ precisa de convenção declarada.**
10. **Item C pode ser crítico.** Baixo valor não implica baixa importância operacional.
11. **Giro alto não é sempre bom.** Pode ocultar falta recorrente.
12. **Nível de serviço por ciclo não é fill rate.**
13. **Preço médio ponderado do art. 106 não é preço da última compra.**
14. **PEPS físico não é necessariamente PEPS contábil.**
15. **UEPS não é critério admitido pela NBC TSP 04 (R1).**
16. **A NBC TSP 04 (R1) tem aplicação indicada a partir dos exercícios de 2027.**
17. **A IN SEDAP nº 205/1988 tem âmbito federal do SISG.** Não é norma automática do TCE-MA.

## Referências

- BRASIL. [Lei nº 4.320, de 17 de março de 1964](https://www.planalto.gov.br/ccivil_03/leis/l4320compilado.htm). Art. 106, especialmente inciso III. Texto vigente até 15 jul. 2026. Acesso em 16 jul. 2026.
- BRASIL. Secretaria de Administração Pública da Presidência da República. [Instrução Normativa nº 205, de 8 de abril de 1988](https://www.gov.br/compras/pt-br/acesso-a-informacao/legislacao/instrucoes-normativas/instrucao-normativa-no-205-de-08-de-abril-de-1988). Itens 7.3 a 7.8; referência operacional do SISG federal. Acesso em 16 jul. 2026.
- BRASIL. Secretaria do Tesouro Nacional. [Manual de Contabilidade Aplicada ao Setor Público, 11ª edição](https://www.gov.br/tesouronacional/pt-br/contabilidade-e-custos/manuais/manual-de-contabilidade-aplicada-ao-setor-publico-mcasp-1). Edição vigente no corte editorial de 2026. Acesso em 16 jul. 2026.
- CONSELHO FEDERAL DE CONTABILIDADE. [NBC TSP 04 (R1) — Estoques](https://www1.cfc.org.br/sisweb/SRE/docs/NBCTSP04%28R1%29.pdf). Aprovada em 13 nov. 2025; publicada no DOU em 17 mar. 2026; aplicação aos exercícios iniciados a partir de 1º jan. 2027, salvo prazo nacional específico. Acesso em 16 jul. 2026.
- ESCOLA NACIONAL DE ADMINISTRAÇÃO PÚBLICA. [Gestão de Materiais](https://repositorio.enap.gov.br/handle/1/2259). Material didático sobre administração e controle de estoques; referência técnica, não norma vinculante. Acesso em 16 jul. 2026.
- PEINADO, Jurandir; GRAEML, Alexandre Reis. [Administração da Produção](https://paginapessoal.utfpr.edu.br/jurandirpeinado/livro-administracao-da-producao/livro-administracao-da-producao/livro2folhas.pdf). UTFPR; referência acadêmica para previsão, estoques e lote econômico. Acesso em 16 jul. 2026.
