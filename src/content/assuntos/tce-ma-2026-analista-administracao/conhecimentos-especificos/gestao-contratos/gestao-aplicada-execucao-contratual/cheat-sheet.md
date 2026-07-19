# Gestão aplicada da execução contratual

## Fontes e âmbito

| Fonte | Papel | Âmbito |
|---|---|---|
| Lei nº 14.133/2021 | Base geral | Administração abrangida pela lei |
| IN nº 5/2017 | Modelo operacional de serviços | Federal, no que couber |
| IN nº 98/2022 | Uso da IN nº 5 sob a nova lei | Federal |
| Decreto nº 11.246/2022 | Gestor, fiscais, assistência e recebimento | Federal |
| Decreto nº 13.031/2026 | Contratos.gov.br e modelo atualizado | Federal |
| Norma interna | Competência, fluxo e sistema | TCE-MA ou ente |
| Contrato | Obrigação, indicador, evidência e efeito | Caso concreto |

- Norma federal operacional não vincula automaticamente o TCE-MA.
- Corte desta revisão: **19 de julho de 2026**.

## Cadeia de controle

| Elemento | Pergunta |
|---|---|
| Obrigação | O que deve ser entregue? |
| Indicador | Como medir parte relevante? |
| Evidência | O que prova o fato? |
| Consequência | Qual tratamento foi previsto? |

## Medida, meta e compromisso

| Conceito | Função |
|---|---|
| SLI | Resultado observado |
| SLO | Meta pretendida |
| SLA | Compromisso contratual |
| IMR | Estrutura federal de aferição |
| Aceitação | Condição para receber |
| Consequência | Efeito do resultado |

- SLI e SLO são termos técnicos frequentes.
- Indicador não cria obrigação.
- IMR não é sanção.

## Ficha do indicador

- finalidade;
- fórmula;
- unidade;
- população;
- exclusões;
- início e fim do relógio;
- horário útil ou corrido;
- calendário e fuso;
- severidade;
- reabertura e duplicidade;
- arredondamento;
- período;
- fonte primária;
- versão e vigência;
- dado ausente;
- evento contestado;
- evidência;
- responsáveis;
- consequência.

## Fórmulas

```text
disponibilidade =
(tempo previsto − indisponibilidade computável)
÷ tempo previsto × 100
```

```text
prazo =
demandas computáveis concluídas no prazo
÷ demandas concluídas computáveis × 100
```

```text
conformidade =
entregas aceitas sem correção
÷ entregas avaliadas × 100
```

## Integridade do dado

- identificador único;
- relógio sincronizado;
- trilha de criação e alteração;
- segregação entre registrar e validar;
- fonte primária independente;
- relatório de mudanças;
- conciliação entre sistemas;
- memória reproduzível;
- retenção definida.

## Manipulação de métricas

| Conduta | Risco |
|---|---|
| fechar e reabrir | encurtar prazo |
| rebaixar severidade | ampliar prazo |
| excluir evento | melhorar resultado |
| iniciar registro tarde | encurtar duração |
| escolher amostra | superestimar qualidade |
| chamar falha de manutenção | retirar indisponibilidade |
| editar sem log | impedir auditoria |

## Estatística

- média pode esconder cauda;
- mediana resiste a extremo;
- percentil mostra limite de parte da distribuição;
- máximo revela pior caso;
- proporção no prazo responde cumprimento;
- segmentar por severidade evita mistura indevida.

## Piso crítico

- requisito eliminatório;
- piso mínimo;
- teto do escore global;
- indicador crítico independente;
- não compensação;
- consequência própria.

## Evidências

| Evidência | Uso |
|---|---|
| registro primário | evento na origem |
| log íntegro | autoria e horário |
| teste reproduzível | comportamento |
| documento assinado | declaração e autoria |
| foto ou vídeo | condição visual |
| relatório derivado | síntese dependente da origem |
| entrevista | contexto com corroboração |
| captura de tela | apoio limitado |

## Amostragem

| Método | Uso |
|---|---|
| aleatória | reduzir viés |
| estratificada | representar grupos |
| sistemática | intervalos definidos |
| por risco | focar criticidade |
| censitária | população pequena ou crítica |
| reexecução | repetir cálculo ou teste |

Registrar população, período, unidade, método, tamanho, exclusões, seleção, resultado e limitações.

## Papéis

| Atividade | Fiscal | Gestor | Preposto | Autoridade |
|---|---|---|---|---|
| coletar evidência | executa | acompanha | fornece | — |
| validar medição | executa | consolida | manifesta-se | — |
| exigir correção | executa | acompanha | mobiliza | — |
| alterar contrato | instrui | propõe | representa | decide |
| sancionar | registra | instrui | defende-se | decide |
| decidir pleito | instrui | encaminha | formula | decide |

## Fiscal

Pode:

- observar;
- testar;
- medir;
- registrar;
- exigir correção prevista;
- verificar correção;
- escalar matéria;
- atestar conforme atribuição.

Não pode:

- criar obrigação;
- alterar preço ou objeto;
- dirigir empregados;
- assumir a execução;
- sancionar sem competência;
- atestar sem prova;
- reter matéria fora da alçada.

## Assistência por terceiros

- terceiro pode subsidiar;
- laudo deve ser avaliado;
- terceiro responde pelo que fornece;
- responsabilidade do fiscal permanece;
- decisão é do agente competente.

## Preposto

- representa a contratada;
- recebe comunicações;
- mobiliza a empresa;
- apresenta justificativa e evidência;
- acompanha a medição;
- organiza correção;
- não substitui o fiscal;
- não substitui responsável técnico.

A recusa ou substituição deve ser motivada.

## Ordens e não ingerência

Regra: solicitações aos empregados passam pelo preposto.

Exceção: tarefa específica previamente prevista pode admitir notificação operacional direta.

Nunca autoriza:

- ordem pessoal estranha ao objeto;
- gestão de jornada ou folga;
- escolha informal de empregado;
- criação de obrigação;
- subordinação trabalhista.

## Eventos

| Evento | Pergunta |
|---|---|
| incidente | houve degradação? |
| não conformidade | requisito foi descumprido? |
| solicitação | atividade prevista foi pedida? |
| mudança | ambiente será alterado? |
| pleito | parte pede reconhecimento? |
| risco materializado | previsão ocorreu? |
| problema | qual causa recorrente? |

## Incidente

```text
detectar
→ classificar
→ preservar
→ comunicar
→ conter
→ restaurar
→ resolver
→ validar
→ analisar causa
→ corrigir
→ prevenir
→ encerrar
```

- resposta ≠ contenção;
- restauração ≠ resolução definitiva;
- resolução ≠ validação;
- correção ≠ apagamento da ocorrência.

## Governança

| Rito | Finalidade |
|---|---|
| reunião inicial | ativar papéis e canais |
| operacional | acompanhar pendências |
| mensal | fechar medição |
| incidente crítico | impacto e causa |
| riscos | atualizar controles |
| mudança | avaliar efeitos |
| transição | transferir histórico |
| encerramento | concluir pendências |

Toda ata útil contém ação, responsável, prazo, estado e evidência.

## Tratamento do desvio

1. preservar evidência;
2. ligar fato ao critério;
3. avaliar urgência e competência;
4. comunicar o preposto;
5. exigir correção prevista;
6. analisar manifestação;
7. testar eficácia;
8. atualizar medição e risco;
9. escalar o excedente.

Trilhas distintas:

- corrigir;
- medir;
- decidir valor devido;
- apurar responsabilidade.

## Decisões e requerimentos

- decisão deve ser explícita;
- requerimento manifestamente impertinente pode receber tratamento próprio;
- fonte pedida define termo inicial;
- fiscal instrui, autoridade decide quando necessário;
- silêncio não substitui decisão.

## Transição

Transferir:

- pendências;
- incidentes;
- pleitos;
- medições;
- acessos;
- ativos;
- documentos;
- dados;
- conhecimento;
- prazos;
- riscos.

Revogar credenciais antigas. Treinamento exige conteúdo, público, prova e aceite.

## Pegadinhas

| Afirmação | Julgamento |
|---|---|
| média adequada prova atendimento uniforme | errado |
| percentil revela cauda | certo |
| contratada escolhe sozinha a amostra | errado |
| sistema eletrônico garante verdade | errado |
| severidade pode ser manipulada | certo |
| falha crítica pode ter piso não compensável | certo |
| restauração sempre é resolução | errado |
| terceiro transfere responsabilidade do fiscal | errado |
| preposto assume responsabilidade da Administração | errado |
| ordem direta é sempre permitida | errado |
| reunião inicial muda fórmula | errado |
| foto prova disponibilidade mensal | errado |
| correção apaga ocorrência | errado |
| troca de fiscal reinicia histórico | errado |
| Contratos.gov.br é obrigatório ao TCE-MA | errado |

## Sequência de prova

1. identifique obrigação;
2. identifique fonte e âmbito;
3. defina evento e população;
4. valide relógio e evidência;
5. calcule resultado;
6. ouça a contratada;
7. trate correção;
8. separe pagamento e sanção;
9. escale competência;
10. preserve histórico.
