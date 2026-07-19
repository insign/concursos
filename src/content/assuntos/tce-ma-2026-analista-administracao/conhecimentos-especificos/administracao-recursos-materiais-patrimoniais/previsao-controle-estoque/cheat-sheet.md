# Previsão e controle de estoque — revisão rápida

> Política de estoque equilibra **continuidade, nível de serviço, custo, risco, validade, espaço e orçamento**.

## 1. Dados antes do modelo

| Grandeza | Significado |
| --- | --- |
| solicitada | quanto o usuário pediu |
| atendida | quanto foi entregue |
| pendente | quanto permanece devido |
| perdida | quanto foi cancelado, substituído ou não registrado |
| saída | quanto saiu fisicamente |

**Ruptura censura a demanda.** Saída baixa durante falta não prova necessidade baixa.

Verificar:

- código e unidade de medida;
- devoluções e estornos;
- substituições;
- pedidos represados;
- campanhas e eventos extraordinários;
- períodos de ruptura;
- alteração normativa ou de serviço;
- justificativa de outliers.

## 2. Padrão da demanda

- **independente:** exige previsão ou observação do consumo;
- **dependente:** calculada pelo item-pai;
- **estável:** nível aproximadamente constante;
- **tendência:** crescimento ou queda;
- **sazonal:** ciclo repetido;
- **intermitente:** muitos zeros e eventos positivos;
- **errática:** picos sem padrão claro.

Métodos para intermitência:

- Croston;
- SBA;
- TSB;
- quantil empírico;
- cenários técnicos.

## 3. Previsão

Média simples:

$$F_{t+1}=\frac{\sum A_i}{n}$$

Média móvel:

$$F_{t+1}=\frac{A_t+\cdots+A_{t-n+1}}{n}$$

Média ponderada:

$$F_{t+1}=\sum w_iA_{t-i};\quad \sum w_i=1$$

Suavização exponencial:

$$F_{t+1}=\alpha A_t+(1-\alpha)F_t$$

- $\alpha$ alto: reage mais e suaviza menos;
- forma simples: sem tendência ou sazonalidade material.

Tendência linear:

$$\widehat D_t=a+bt$$

## 4. Validação

1. separar treino e validação;
2. manter ordem temporal;
3. comparar com benchmark;
4. usar origem móvel quando possível;
5. medir erro fora da amostra;
6. monitorar após implantação.

Benchmarks:

- último valor;
- média;
- mesmo período anterior;
- previsão vigente.

Convenção:

$$e_t=A_t-F_t$$

| Métrica | Cuidado |
| --- | --- |
| MFE | mede viés; sinais se anulam |
| MAD | erro absoluto na unidade |
| MSE/RMSE | penalizam erros grandes |
| MAPE | falha com zero ou valor muito baixo |
| WAPE | exige soma da demanda significativa |
| MASE | compara com previsão ingênua |
| tracking signal | erro acumulado ÷ MAD; declarar sinal |

## 5. Saldo e posição

$$
utilizável=físico-vencido-bloqueado-reservado-avariado
$$

$$
IP=utilizável+trânsito\ válido-faltas-compromissos
$$

Pedido cancelado, vencido ou contestado não é disponibilidade certa.

## 6. Lead time

Componentes possíveis:

- aprovação;
- contratação;
- emissão da ordem;
- fornecedor;
- transporte;
- recebimento;
- inspeção;
- liberação.

Definir início e fim. Se $d$ está em unidades/dia, $L$ deve estar em dias.

## 7. Políticas de reposição

| Política | Regra |
| --- | --- |
| $(Q,r)$ | atingiu $r$, pedir $Q$ |
| $(R,S)$ | a cada $R$, elevar a $S$ |
| $(s,S)$ | abaixo de $s$, elevar a $S$ |
| base-stock | recompor nível-base |
| duas gavetas | segunda protege prazo + segurança |

Revisão contínua:

$$PP=dL+SS$$

$$E_{máx}\approx Q+SS$$

$$E_{médio}\approx Q/2+SS$$

Revisão periódica:

$$Q_{pedido}=S-IP$$

Período protegido: **$R+L$**.

## 8. IN SEDAP nº 205/1988

Convenção federal, com consumo mensal:

$$Em=cf$$

$$EM=Em+cI$$

$$Pp=Em+cT$$

$$Q=cI$$

Não é norma automática do TCE-MA.

## 9. Estoque de segurança

Determinístico:

$$SS=0;\quad PP=dL$$

Demanda variável, prazo fixo:

$$SS=z\sigma_d\sqrt L$$

Demanda constante, prazo variável:

$$SS=zd\sigma_L$$

Demanda e prazo variáveis independentes:

$$SS=z\sqrt{\bar L\sigma_d^2+d^2\sigma_L^2}$$

Heurística:

$$SS=(d_{máx}L_{máx})-(\bar d\bar L)$$

Alternativas:

- quantil empírico;
- bootstrap;
- simulação;
- cenários.

**$z$ não determina automaticamente o fill rate.**

## 10. Nível de serviço

| Métrica | Pergunta |
| --- | --- |
| serviço por ciclo | houve ruptura no ciclo? |
| fill rate | qual fração das unidades foi atendida? |
| requisição completa | qual fração foi atendida integralmente? |
| tempo de falta | por quanto tempo faltou? |

## 11. Lote econômico

$$Q^*=\sqrt{\frac{2DS}{H}}$$

Se $H=iC$:

$$Q^*=\sqrt{\frac{2DS}{iC}}$$

$$C_{pedidos}=\frac{D}{Q}S$$

$$C_{manutenção}=\frac{Q}{2}H$$

$$N=\frac{D}{Q}$$

$$T=\frac{Q}{D}$$

No ótimo básico, pedido = manutenção.

Hipóteses:

- demanda constante;
- prazo conhecido;
- entrega integral e instantânea;
- sem ruptura;
- sem desconto;
- custos constantes;
- item isolado.

Com desconto: comparar custo total das faixas viáveis.

LEC é apoio gerencial, não autorização legal.

## 12. Segmentação

ABC:

$$VAC=D_{anual}\times C_{unitário}$$

- A: maior impacto financeiro;
- B: intermediário;
- C: menor impacto financeiro;
- sem percentuais universais.

XYZ, nesta página:

- X: baixa criticidade;
- Y: média;
- Z: alta criticidade.

Outras fontes usam XYZ para variabilidade. Declarar a convenção.

Avaliar também:

- variabilidade;
- lead time;
- substituibilidade;
- escassez;
- validade;
- portabilidade.

Item barato pode ser crítico.

## 13. Validade

$$
utilizável=físico-vencido-bloqueado-reservado-avariado
$$

**FEFO:** sai primeiro o que vence primeiro.

FEFO físico não é automaticamente PEPS contábil.

## 14. Indicadores

$$Giro=\frac{consumo\ anual\ a\ custo}{estoque\ médio\ a\ custo}$$

$$Cobertura=\frac{estoque\ utilizável}{demanda\ média\ por\ período}$$

$$Fill\ rate=\frac{unidades\ atendidas\ imediatamente}{unidades\ demandadas}$$

Informar numerador, denominador, período e unidade.

Giro alto pode significar eficiência ou ruptura.

## 15. Avaliação contábil

Lei nº 4.320/1964, art. 106, III:

- bens de almoxarifado: preço médio ponderado das compras.

NBC TSP 04 (R1):

- regra geral: menor entre custo e VRL;
- distribuição gratuita ou irrisória: menor entre custo e custo corrente de reposição;
- recebido sem contraprestação: valor justo no recebimento;
- custo: aquisição + transformação + outros para condição e local;
- desperdício anormal e armazenamento desnecessário: despesa;
- métodos: identificação específica, PEPS e média ponderada;
- UEPS não admitido.

IN nº 205/1988:

- material mais antigo sai primeiro como rotação física.

## 16. Pegadinhas

- saída histórica ≠ demanda real;
- melhor ajuste passado ≠ melhor previsão;
- MAPE ≠ adequado com zeros;
- saldo físico ≠ utilizável;
- pedido emitido ≠ recebimento certo;
- segurança ≠ ponto de pedido;
- $PP$ responde quando; $Q$ responde quanto;
- revisão periódica protege $R+L$;
- $z$ ≠ fill rate automático;
- FEFO ≠ PEPS contábil;
- ABC ≠ criticidade;
- LEC ≠ obrigação legal;
- preço médio ponderado ≠ última compra;
- PEPS físico ≠ PEPS contábil;
- IN nº 205/1988 ≠ norma automática do TCE-MA.
