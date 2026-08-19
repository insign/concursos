# SIAFI e CPR — revisão rápida

## Mapa-mãe

```text
SIAFI
 └─ CPR — Contas a Pagar e a Receber
       ↓
 DOCUMENTO HÁBIL
 (Pagamento | Recebimento)
       ↓
 registro/contabilização
       ↓
 COMPROMISSOS
 (Líquido | Dedução | Encargo)
       ↓
 pré-doc, quando exigido
       ↓
   REALIZÁVEL
       ↓
 documento de realização
       ↓
   REALIZADO
```

## SIAFI × CPR

| Elemento | Associação |
|---|---|
| **SIAFI** | sistema integrado de registro, acompanhamento e controle da execução orçamentária, financeira e patrimonial federal |
| **CPR** | Contas a Pagar e a Receber; integra a estrutura do SIAFI |
| **Erro clássico** | tratar CPR como sistema autônomo ou apenas como contas a pagar |

**Memória:** **SIAFI é o ambiente; CPR é o fluxo especializado dentro dele.**

## Documento Hábil

| Natureza do DH | Polo |
|---|---|
| **Pagamento** | credor/favorecido |
| **Recebimento** | devedor/recolhedor |

O **Tipo de Documento** determina:

- natureza do DH;
- conjunto de abas/informações aplicáveis;
- exigências do registro.

**Pegadinha:** todo DH ≠ pagamento.

## Abas: função, não tela

| Bloco | Ideia-chave |
|---|---|
| **Principal com Orçamento** | despesa com previsão orçamentária ou empenho |
| **Principal sem Orçamento** | registro aplicável sem apropriação orçamentária pelo mesmo fluxo |
| **Crédito** | valores de crédito conforme situação/tipo do DH |
| **Dedução** | valor destacado que pode gerar compromisso próprio |
| **Encargo** | categoria própria que pode gerar compromisso |
| **Dados de Pagamento / pré-doc** | prepara informações para realização |

**Não decorar posição de botão. Entender o que cada informação faz.**

## DH × compromisso × realização

| Etapa | O que acontece |
|---|---|
| **DH** | registra obrigação/direito e seus dados |
| **Registrar DH** | valida, contabiliza e pode gerar compromissos |
| **Compromisso** | valor a realizar; pode ainda estar pendente |
| **Pré-doc** | contém dados para futura realização |
| **Realização** | efetiva o compromisso por documento adequado |

## Tipos de compromisso

**Líquido · Dedução · Encargo**

```text
VALOR DO DH
   ↓
deduções cabíveis
   ↓
LÍQUIDO ao favorecido
+
DEDUÇÕES/ENCARGOS com tratamento próprio
```

Nem toda operação possui os três.

## Status: raciocínio

```text
PENDÊNCIA
(pré-doc / orçamento / homologação...)
       ↓
   REALIZÁVEL
       ↓
    REALIZADO
```

**Compromisso registrado ≠ compromisso realizável.**  
**Compromisso realizável ≠ compromisso já realizado.**

## Pagamento × recebimento

| Pagamento | Recebimento |
|---|---|
| DH natureza Pagamento | DH natureza Recebimento |
| credor/favorecido | devedor/recolhedor |
| data de pagamento | data de recebimento |
| saída/obrigação a realizar | entrada/direito a realizar |

CPR cobre **os dois lados**.

## Pré-doc × documento de realização

**Pré-doc:** prepara dados.  
**Documento de realização:** efetiva.

O demonstrativo do CPR admite, conforme o caso, documentos como **OB, GRU, DARF e outros previstos no sistema**.

**Pegadinha:** nem todo compromisso usa OB; GRU não é documento universal de pagamento.

## CPR × execução legal da despesa

CPR **não substitui**:

1. empenho;
2. liquidação;
3. pagamento.

O assunto 149 explica os estágios legais. O 151 explica como o SIAFI/CPR organiza registros e compromissos.

## Caso-relâmpago: retenção

Obrigação de R$ 100.000 com retenção cabível de R$ 5.000:

- líquido: R$ 95.000;
- dedução: R$ 5.000, com compromisso/recolhimento próprio conforme configuração.

**Qual tributo reter?** → assunto 150.  
**Como o valor aparece no fluxo do CPR?** → assunto 151.

## Matriz de pegadinhas

| Afirmação errada | Correção |
|---|---|
| “CPR é outro sistema, separado do SIAFI” | CPR integra o SIAFI |
| “CPR só paga contas” | também trata recebimentos |
| “todo DH é de pagamento” | há Pagamento e Recebimento |
| “registrou DH = pagou” | registro pode apenas gerar compromisso |
| “compromisso = realizado” | pode estar pendente ou realizável |
| “dedução = encargo” | tipos distintos |
| “pré-doc = pagamento” | pré-doc prepara a realização |
| “todo compromisso é OB” | documento depende da operação |
| “CPR substitui empenho” | não substitui a execução orçamentária |
| “correção apaga o histórico” | o fluxo preserva rastreabilidade |

## Método de 15 segundos

1. **Sistema?** SIAFI.
2. **Subsistema?** CPR.
3. **DH?** Pagamento ou Recebimento.
4. **Polo?** Credor ou devedor.
5. **Valores?** Líquido/dedução/encargo.
6. **Pendente?** Pré-doc/orçamento/homologação.
7. **Realizável?** Pode efetivar.
8. **Realizado?** Documento já efetivou o compromisso.
