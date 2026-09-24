# Previsão e controle de estoque — revisão rápida

> Diagnostique nesta ordem: **demanda → saldo útil → prazo → quando pedir → quanto pedir → proteção → valor do saldo**. Estoque excessivo imobiliza e deteriora; estoque insuficiente interrompe o serviço.

## 1. Previsão: o que o histórico realmente mede?

**Demanda independente** vem da necessidade do usuário; **dependente** deriva de outro item ou plano (por exemplo, componentes por kit). Série estável aceita média ou suavização simples; tendência pede método que acompanhe direção; sazonalidade pede ciclo explícito; intermitência tem muitos períodos sem consumo. Sem histórico confiável, registre hipóteses das unidades usuárias e eventos futuros.

**Saída registrada não é toda a demanda** se houve falta, requisição não atendida, substituição ou cancelamento. Ajuste unidade de medida e leia picos à luz do serviço antes de extrapolar. Diferencie planejamento (necessidade esperada), processo (pedir, adquirir, receber, disponibilizar) e política (gatilho e quantidade).

| Método da aula | Regra e condição |
| --- | --- |
| Média móvel | $F_{t+1}=(A_t+\cdots+A_{t-n+1})/n$: janela maior suaviza, mas demora a captar mudança. |
| Média ponderada | $F_{t+1}=\sum w_iA_{t-i}$, com $\sum w_i=1$: maior peso recente responde mais rápido. |
| Suavização exponencial simples | $F_{t+1}=\alpha A_t+(1-\alpha)F_t$, $0<\alpha<1$: $\alpha$ maior reage mais; não modela tendência ou sazonalidade por si. |

$A_t$ é demanda observada, $F_t$ previsão e $n$ número de períodos. Na convenção $e_t=A_t-F_t$, erro positivo é subprevisão. Erro médio assinado pode se cancelar; <abbr title="desvio absoluto médio">MAD</abbr> é a média de $|e_t|$ na unidade; <abbr title="erro quadrático médio">MSE</abbr> eleva o erro ao quadrado; <abbr title="raiz do erro quadrático médio">RMSE</abbr> volta à unidade; <abbr title="erro percentual absoluto médio">MAPE</abbr> divide pelo realizado e falha com zero ou valor muito baixo. Valide em períodos posteriores aos do ajuste e compare com uma regra simples; bom ajuste no passado não garante previsão futura.

## 2. Qual saldo dispara a compra?

| Medida | Função na decisão |
| --- | --- |
| Físico | Material presente; pode incluir vencido, bloqueado ou reservado. |
| Utilizável | Material efetivamente apto e livre para atender nova demanda. |
| Em trânsito | Pedido válido ainda não recebido/liberado; confira atrasos, cancelamentos e entrega parcial. |
| Posição | $IP=\text{utilizável}+\text{trânsito válido}-\text{faltas pendentes}$, na convenção da aula. |

Exemplo: 80 utilizáveis, 40 em trânsito válido e 10 faltas pendentes dão posição **110**. Não emitir pedido duplicado olhando só o físico, nem tratar ordem emitida como recebimento certo. **Estoque de segurança** protege contra incerteza; **ponto de pedido** aciona reposição; **máximo** limita ou almeja saldo; **médio** serve a custos/indicadores. “Mínimo” depende da fonte: na <abbr title="Instrução Normativa">IN</abbr> nº 205/1988 coincide com segurança.

**Tempo de ressuprimento** (<abbr title="tempo total de reposição até a disponibilidade">lead time</abbr>) deve ter começo e fim declarados: preparação/aprovação, compra, fornecedor, transporte, recebimento, inspeção e liberação podem integrá-lo. Prazo contratual de entrega não cobre necessariamente todo o tempo administrativo. Converta unidades: consumo diário pede prazo em dias.

## 3. Quando e quanto?

Para demanda média $d$ por período, prazo $L$ em períodos e segurança $ES$:

$$PP=dL+ES$$

$PP$ responde **quando**; não é a quantidade a pedir. Em revisão contínua $(Q,r)$, observa-se a posição e pede-se lote $Q$ ao atingir $r$. Em revisão periódica $(R,S)$, a cada $R$ períodos pede-se $Q=S-IP$ para elevar ao alvo $S$; a proteção normalmente abrange $R+L$. Duas gavetas são um sinal visual do consumo da reserva; ainda exigem dimensionamento e registro.

**Convenção federal da <abbr title="Secretaria de Administração Pública da Presidência da República">SEDAP</abbr> nº 205/1988, itens 7.6–7.8:** $c$ é média mensal dos últimos 12 meses; $T$ vai da emissão do pedido ao recebimento no almoxarifado, em meses; $I$ é intervalo entre aquisições normais. Para itens indispensáveis, o mínimo/segurança $Em=cf$, com $f$ em princípio de $0{,}25T$ a $0{,}50T$; máximo $EM=Em+cI$; ponto $Pp=Em+cT$; ressuprimento $Q=cI$. São parâmetros daquela instrução e podem ser revistos à luz dos resultados. Ela rege o âmbito federal indicado, sem aplicação automática ao <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr>.

**Segurança exige a hipótese da fórmula:** com demanda variável independente por período e prazo fixo, $ES=z\sigma_d\sqrt L$; com demanda constante e prazo variável, $ES=zd\sigma_L$. $z$ é fator de serviço no modelo adotado; $\sigma$ é desvio padrão da variável indicada. Não misture as fórmulas quando ambos variam sem modelo fornecido. Mais proteção custa mais; compare risco de falta com custo de posse. Serviço por ciclo mede ciclos sem ruptura; <abbr title="fração de unidades demandadas atendidas imediatamente">fill rate</abbr> mede unidades atendidas imediatamente: uma pequena falta pode afetar pouco a segunda medida e já comprometer a primeira.

**Lote econômico de compra** (<abbr title="lote econômico de compra">LEC</abbr>) equilibra custo de pedir e de manter, no modelo clássico: $Q^*=\sqrt{2DS/H}$, em que $D$ é demanda por período, $S$ custo por pedido e $H$ manutenção de uma unidade **no mesmo período**. Lote maior reduz pedidos e aumenta estoque médio; o ótimo pressupõe demanda estável, custos constantes, entrega integral e ausência de ruptura. Embalagem, validade, espaço, desconto e orçamento exigem escolha entre alternativas viáveis. É apoio gerencial, não autorização de compra.

## 4. Que item merece proteção?

<abbr title="classificação por valor anual de consumo">ABC</abbr> ordena pelo valor anual de consumo (quantidade × custo unitário): A concentra valor, B é intermediária, C menor impacto. Percentuais de classe são convenções, não lei. <abbr title="classificação por criticidade do item nesta aula">XYZ</abbr> nesta aula mede consequência da falta (X baixa, Y intermediária, Z alta); outras fontes usam as letras para previsibilidade. Um item barato C pode ser Z se interromper serviço essencial.

Giro = consumo no período ÷ estoque médio, em bases homogêneas; cobertura = utilizável ÷ demanda média por período. Acurácia de estoque confronta registro e físico; acurácia de previsão confronta realizado e previsto. Declare período, unidade e denominador da ruptura/atendimento; giro alto com falta frequente pode indicar proteção insuficiente.

## 5. Rotação física não determina valoração

| Comando da questão | Recuperação correta |
| --- | --- |
| Qual material fornecer primeiro? | A <abbr title="Instrução Normativa">IN</abbr> nº 205/1988, item 4.1, recomenda <abbr title="primeiro a entrar, primeiro a sair">PEPS</abbr> **físico** para evitar envelhecimento. Validade exige cuidado de rotação, sem confundir com camada de custo. |
| Como avaliar **bens de almoxarifado**? | Lei nº 4.320/1964, art. 106, III: **preço médio ponderado das compras**; o <abbr title="Manual de Contabilidade Aplicada ao Setor Público">MCASP</abbr>, 11ª edição, preserva essa regra. |
| Como atribuir custo a outros estoques? | Identificação específica para itens individualizados ou segregados; quando não possível, <abbr title="primeiro a entrar, primeiro a sair">PEPS</abbr> contábil atribui primeiro os custos mais antigos, ou média ponderada divide custo disponível pela quantidade. <abbr title="último a entrar, primeiro a sair">UEPS</abbr> atribuiria custos recentes primeiro, mas não é critério admitido na norma indicada. |

A <abbr title="Norma Brasileira de Contabilidade Técnica do Setor Público 04, revisão 1">NBC TSP 04 (R1)</abbr> foi publicada em **17/3/2026** e entrou em vigor na publicação; sua cláusula manda **aplicá-la aos exercícios iniciados a partir de 1º/1/2027**, salvo prazo nacional específico. Não antecipar sua aplicação ao exercício de 2026. Nela, regra geral é menor entre custo e valor realizável líquido (preço estimado de saída menos gastos para concluir e vender/trocar/distribuir); distribuição gratuita ou irrisória compara custo e custo corrente de reposição; recebimento sem contraprestação usa valor justo na data. Custo inclui obtenção, transformação e gastos para levar ao local/condição atuais; desperdício anormal e armazenagem não necessária são despesa. Ao responder, leia **fonte, objeto e exercício** antes de escolher o método.
