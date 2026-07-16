# Previsão e controle de estoque

> Política de estoque equilibra **continuidade + nível de serviço + custo de falta + custo de excesso**.

## Escopo e fontes

| Fonte | Regra-chave |
| --- | --- |
| Lei nº 4.320/1964, art. 106, III | bens de almoxarifado: preço médio ponderado das compras |
| NBC TSP 04 (R1) | tratamento contábil; aplicação indicada para exercícios iniciados em 01/01/2027 |
| MCASP 11ª edição | procedimentos contábeis patrimoniais do setor público |
| IN SEDAP nº 205/1988 | referência operacional do SISG federal; não é regra automática do TCE-MA |

## Política de estoque

Definir por item ou classe:

- demanda, horizonte e unidade;
- criticidade e consequência da falta;
- nível de serviço;
- sistema de revisão;
- lead time e variabilidade;
- segurança, ponto de pedido, lote e máximo;
- validade, espaço, orçamento e responsáveis;
- indicadores e frequência de revisão.

### Custos

- **Aquisição:** preço e custos diretamente atribuíveis.
- **Pedido:** processar, contratar, emitir e acompanhar.
- **Posse:** capital, espaço, seguro, controle, perda e obsolescência.
- **Falta:** interrupção, urgência, atraso e risco.

# Demanda e previsão

## Classificação

- **Independente:** não deriva diretamente de outro item; costuma exigir previsão.
- **Dependente:** calculada pelo item-pai ou pela programação.
- **Estável:** nível aproximadamente constante.
- **Tendência:** crescimento ou queda persistente.
- **Sazonal:** padrão periódico repetido.
- **Intermitente/errática:** zeros e picos; média pode enganar.

## Fórmulas

Média simples:

$$F_{t+1}=\frac{\sum A_i}{n}$$

Média móvel:

$$F_{t+1}=\frac{A_t+\cdots+A_{t-n+1}}{n}$$

Média ponderada:

$$F_{t+1}=\sum w_iA_{t-i};\quad \sum w_i=1$$

Suavização exponencial:

$$F_{t+1}=\alpha A_t+(1-\alpha)F_t$$

- $\alpha$ alto: mais resposta e menos suavização.
- Forma simples: sem tendência/sazonalidade material.

Tendência linear:

$$\widehat{D_t}=a+bt$$

## Erro

Convenção: $e_t=A_t-F_t$.

| Medida | Cuidado |
| --- | --- |
| MFE | sinais se anulam; mede viés |
| MAD | erro absoluto na unidade original |
| MSE/RMSE | penalizam erros grandes |
| MAPE | inadequado com demanda zero ou muito baixa |
| WAPE | razão agregada; exige soma da demanda significativa |

Não há erro aceitável universal.

# Níveis e ressuprimento

## Não confundir

- **Segurança:** buffer de incerteza.
- **Mínimo:** piso da política; o nome varia.
- **Ponto de pedido:** gatilho de reposição.
- **Máximo:** teto ou nível-alvo.
- **Cíclico:** parcela gerada pelo lote.
- **Médio:** média durante o ciclo.
- **Em trânsito:** pedido ainda indisponível.

Posição:

$$IP=disponível+em\ trânsito-faltas\ pendentes$$

## Lead time

Definir marco inicial e final. Pode incluir aprovação, contratação, ordem, produção, transporte, recebimento, inspeção e liberação.

> Se $d$ está em unidades/dia, $L$ deve estar em dias.

## Revisão contínua

$$PP=dL+SS$$

$$E_{máx}\approx Q+SS$$

$$E_{médio}\approx\frac{Q}{2}+SS$$

- $PP$ responde **quando**.
- $Q$ responde **quanto**.

## Revisão periódica

$$Q_{pedido}=S-IP$$

Período protegido: **$R+L$**.

## Duas gavetas

Esvaziar a primeira dispara reposição; a segunda cobre lead time + segurança. Método visual não elimina cálculo.

## IN SEDAP nº 205/1988

Convenção federal, com $c$ em unidades/mês e tempos em meses:

$$Em=cf$$

$$EM=Em+cI$$

$$Pp=Em+cT$$

$$Q=cI$$

- $T$: tempo de aquisição.
- $I$: intervalo entre aquisições.
- $f$: parcela temporal de segurança, em princípio $0{,}25T$ a $0{,}50T$ na IN.
- Recalibrar parâmetros conforme resultados.

# Estoque de segurança

Determinístico: $SS=0$ e $PP=dL$.

Demanda variável e prazo fixo:

$$SS=z\sigma_d\sqrt{L}$$

Demanda constante e prazo variável:

$$SS=zd\sigma_L$$

Demanda e prazo variáveis independentes:

$$SS=z\sqrt{\bar L\sigma_d^2+d^2\sigma_L^2}$$

Revisão periódica: incerteza sobre $R+L$.

Heurística de máximos:

$$SS=(d_{máx}L_{máx})-(\bar d\bar L)$$

Hipóteses, distribuição, independência e unidades precisam ser explícitas.

# Lote econômico

$$Q^*=\sqrt{\frac{2DS}{H}}$$

- $D$: unidades/ano.
- $S$: R$/pedido.
- $H$: R$/unidade-ano.

Se $H=iC$:

$$Q^*=\sqrt{\frac{2DS}{iC}}$$

$$C_{pedidos}=\frac{D}{Q}S$$

$$C_{manutenção}=\frac{Q}{2}H$$

No ótimo básico, pedido = manutenção.

Hipóteses: demanda e prazo constantes, entrega instantânea, sem ruptura, sem desconto, custos constantes e item isolado.

LEC é apoio gerencial, não obrigação legal.

# ABC e XYZ

## ABC

$$VAC=D_{anual}\times C_{unitário}$$

- A: maior impacto financeiro.
- B: intermediário.
- C: menor impacto financeiro.
- Não há percentuais universais.

## XYZ neste material

- X: baixa criticidade.
- Y: média.
- Z: alta; falta ameaça continuidade ou segurança.

Outra literatura usa XYZ para variabilidade: declarar a convenção.

> ABC mede valor; XYZ mede criticidade. Item de baixo valor anual de consumo pode ser CZ.

# Indicadores

$$Giro=\frac{consumo\ anual\ a\ custo}{estoque\ médio\ a\ custo}$$

$$Cobertura=\frac{estoque\ disponível}{demanda\ média\ por\ período}$$

- **Cycle service level:** probabilidade de ciclo sem ruptura.
- **Fill rate:** fração da demanda atendida imediatamente.
- **Ruptura:** informar se mede ocorrência, dia, unidade ou requisição.
- **Acurácia de estoque:** físico × registro.
- **Acurácia de previsão:** realizado × previsto.

Giro alto pode significar eficiência ou falta; indicador isolado não explica causa.

# Avaliação contábil

## NBC TSP 04 (R1)

- Regra geral: menor entre custo e VRL.
- Distribuição gratuita/valor irrisório: menor entre custo e custo corrente de reposição.
- Sem contraprestação: valor justo no recebimento.
- Custo: aquisição + transformação + outros para condição/local atuais.
- Descontos e abatimentos reduzem custo.
- Desperdício anormal, armazenagem desnecessária, administração sem contribuição e comercialização: despesa.
- Perda/redução: resultado; reversão limitada à redução original.

## Métodos

| Método | Regra |
| --- | --- |
| identificação específica | item não intercambiável/projeto específico |
| PEPS | custos mais antigos saem primeiro |
| média periódica | média no período |
| média móvel | recalcula em cada recebimento |
| UEPS | não permitido pela NBC TSP 04 (R1) |

## Pegadinhas

- preço médio ponderado ≠ última compra;
- PEPS físico da IN ≠ PEPS contábil da NBC;
- VRL ≠ valor justo líquido;
- segurança ≠ ponto de pedido;
- saldo físico ≠ posição de estoque;
- giro alto ≠ resultado sempre bom;
- MAPE ≠ adequado com zero;
- IN SEDAP nº 205/1988 ≠ norma automática do TCE-MA.
