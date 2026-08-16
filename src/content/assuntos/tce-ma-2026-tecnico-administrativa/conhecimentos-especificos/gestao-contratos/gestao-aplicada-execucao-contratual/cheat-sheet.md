# Gestão aplicada da execução contratual — resumo de prova

## Mapa do assunto

```text
CLÁUSULA
→ INDICADOR
→ EVIDÊNCIA
→ MEDIÇÃO
→ REGISTRO
→ CORREÇÃO / ENCAMINHAMENTO
→ VERIFICAÇÃO
```

## Base legal essencial

| Lei nº 14.133/2021 | Núcleo |
|---|---|
| art. 6º, XXIII | modelo de execução, modelo de gestão, medição e pagamento |
| art. 92 | cláusulas necessárias; critérios e periodicidade da medição |
| art. 115 | execução fiel ao contrato e à lei |
| art. 117 | fiscalização, registros, correção e escalonamento |
| art. 118 | preposto da contratada |
| art. 119 | correção de vícios, defeitos e incorreções |
| art. 123 | decisão sobre solicitações e reclamações |

**Corte de prova:** 6/7/2026.

## Cláusula controlável

| Deve responder | Exemplo |
|---|---|
| o quê? | obrigação/resultado |
| quanto? | quantidade ou nível |
| quando? | prazo/janela |
| como medir? | fórmula ou critério |
| com qual fonte? | log, protocolo, teste etc. |
| qual meta? | desempenho esperado |
| qual tratamento? | consequência prevista |

**Regra:** fiscal aplica o contrato; não cria obrigação nova para corrigir falha de planejamento.

## Indicador de nível de serviço

Bom indicador = **relevante + objetivo + mensurável + reproduzível + auditável + proporcional**.

### Ficha mínima

- finalidade;
- fórmula/critério;
- unidade;
- população;
- exclusões;
- fonte;
- periodicidade;
- meta;
- tolerância, se houver;
- evidência;
- responsáveis;
- consequência prevista.

### Conceitos que a banca pode trocar

| Conceito | Função |
|---|---|
| indicador | mede |
| meta | define o resultado esperado |
| tolerância | admite variação previamente definida |
| SLA | compromisso contratual de nível de serviço |
| evidência | prova o fato |
| consequência | trata o resultado |

**Indicador ≠ obrigação. Meta ≠ tolerância. Medição ≠ sanção.**

## Fórmulas

```text
disponibilidade =
(tempo previsto − indisponibilidade computável)
÷ tempo previsto × 100
```

Ex.: (1.000 − 8) ÷ 1.000 × 100 = **99,2%**.

```text
índice de prazo =
demandas concluídas no prazo
÷ demandas concluídas computáveis × 100
```

Ex.: 90 ÷ 100 × 100 = **90%**.

```text
conformidade =
entregas aceitas sem correção
÷ entregas avaliadas × 100
```

## Evidência x objeto da prova

| Evidência | Prova típica |
|---|---|
| protocolo | comunicação e data |
| log íntegro | evento e horário |
| teste reproduzível | funcionamento |
| documento assinado | declaração/autoria |
| foto/vídeo | condição visual no instante |
| inspeção | estado verificado |
| relatório derivado | síntese a validar na fonte |

**Pegadinha:** foto isolada normalmente não prova disponibilidade durante um mês inteiro.

## Fiscalizador — art. 117

### Faz

1. conhece cláusulas e critérios;
2. observa a execução;
3. compara fato x obrigação;
4. valida evidências;
5. registra ocorrências;
6. determina regularização dentro da competência;
7. verifica a correção;
8. informa ao superior o que ultrapassa sua competência.

### Não faz

- não cria obrigação nova;
- não altera preço/objeto informalmente;
- não apaga ocorrência;
- não aceita relatório sem validação;
- não transfere sua função exclusiva a terceiro;
- não retém matéria fora da alçada.

### Terceiro de apoio

```text
terceiro → assiste / subsidia
fiscal → continua responsável por sua atribuição
```

O terceiro não exerce atribuição própria e exclusiva do fiscal.

## Preposto — art. 118

| Fiscalizador | Preposto |
|---|---|
| representa a Administração | representa a contratada |
| fiscaliza | organiza a resposta empresarial |
| registra ocorrências | recebe e responde comunicações |
| exige correção prevista | mobiliza a empresa |
| escala decisão superior | leva demanda à estrutura interna |
| não dirige a empresa | não decide pela Administração |

**Preposto ≠ fiscal ≠ gestor ≠ autoridade.**

## Acompanhamento por risco

Controle mais intenso quando houver:

- criticidade elevada;
- dano difícil de reverter;
- etapa que ficará oculta;
- reincidência;
- dados frágeis;
- grande impacto ao usuário.

Ferramentas: inspeção, checklist, teste, logs, documentos, amostragem, foto e reunião.

## Fluxo do desvio

```text
preservar evidência
→ ligar fato à cláusula/indicador
→ avaliar urgência
→ comunicar preposto
→ exigir correção cabível
→ registrar manifestação
→ verificar correção
→ atualizar medição/histórico
→ escalar o excedente
```

**Correção rápida não apaga a ocorrência.**

## Comunicação rastreável

Registre:

- contrato;
- fato;
- cláusula/indicador;
- evidência;
- providência esperada;
- prazo aplicável;
- responsável;
- resultado.

Contato urgente pode ser informal no primeiro momento, mas providência relevante deve ser formalizada.

## Art. 123 — prazo

| Regra | Conteúdo |
|---|---|
| dever | decisão explícita sobre solicitações e reclamações da execução |
| exceções | pedido manifestamente impertinente, meramente protelatório ou sem interesse para boa execução |
| prazo geral | **1 mês** |
| termo inicial legal | **conclusão da instrução** |
| prorrogação | **1 vez por igual período**, motivadamente |
| ressalva | prazo legal ou contratual específico prevalece |

## Transição

Troca de fiscal/preposto **não zera**:

- pendências;
- prazos;
- medições;
- ocorrências;
- evidências;
- comunicações;
- riscos.

## Pegadinhas rápidas

| Afirmação | Julgamento |
|---|---|
| SLA pode nascer por e-mail durante a execução. | ❌ |
| Indicador deve estar ligado a obrigação válida. | ✅ |
| Todo indicador deve ser percentual. | ❌ |
| Contratada pode fornecer dados da medição. | ✅ |
| Dados fornecidos dispensam validação. | ❌ |
| Fiscal pode exigir correção já prevista. | ✅ |
| Fiscal pode inovar o contrato. | ❌ |
| Terceiro pode auxiliar o fiscal. | ✅ |
| Terceiro substitui a competência exclusiva do fiscal. | ❌ |
| Preposto representa a contratada. | ✅ |
| Preposto decide pela Administração. | ❌ |
| Ata de reunião pode alterar meta material sem instrumento competente. | ❌ |
| Periodicidade mensal impede reação imediata. | ❌ |
| Correção elimina o registro do desvio. | ❌ |
| Troca do fiscal reinicia o histórico. | ❌ |

## Sequência mental para questões

1. **obrigação**;
2. **indicador/critério**;
3. **fonte/evidência**;
4. **medição**;
5. **competência do fiscal**;
6. **preposto**;
7. **correção**;
8. **escalonamento**;
9. **verificação**;
10. **histórico**.