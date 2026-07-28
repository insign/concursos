---
schemaVersion: 1
title: "Marco Civil da Internet: princípios, direitos e deveres"
description: Fundamentos, princípios, direitos dos usuários, neutralidade de rede, guarda de registros, responsabilidade de provedores e atuação do poder público segundo a Lei nº 12.965/2014.
order: 29
storageId: marco-civil-internet
---

## 1. Recorte do assunto e cortes temporais

A Lei nº 12.965/2014, conhecida como **Marco Civil da Internet (MCI)**, estabelece princípios, garantias, direitos e deveres para o uso da internet no Brasil e fixa diretrizes para a atuação da União, dos estados, do Distrito Federal e dos municípios.

O edital cobra os princípios, direitos e deveres previstos na lei. Para este concurso, é indispensável separar três planos temporais:

| Plano | Corte relevante |
|---|---|
| legislação cobrável pela regra geral do edital | normas em vigor em **6 de julho de 2026**, data da publicação do edital |
| jurisprudência | decisões de tribunais superiores publicadas até 30 dias antes da prova |
| direito atualmente vigente | legislação em vigor na data atual, inclusive alterações posteriores ao edital |

### 1.1 Núcleo alinhado diretamente ao edital

Integram o núcleo de estudo:

- Lei nº 12.965/2014;
- Decreto nº 8.771/2016 na redação vigente em 6/7/2026;
- tese vinculante do STF sobre a responsabilidade das plataformas e o art. 19, observada a regra temporal de jurisprudência;
- neutralidade, direitos, registros, responsabilidade e atuação do poder público.

### 1.2 Atualização posterior ao edital

Os Decretos nº 12.975/2026 e nº 12.976/2026 foram publicados em 21/5/2026 e entraram em vigor em **20/7/2026**, sessenta dias depois. Eles integram o direito atualmente vigente, mas **não estavam em vigor em 6/7/2026**.

Por isso, este conteúdo apresenta os decretos em bloco separado de atualização pós-edital. Eles não devem ser tratados como automaticamente incluídos pela regra do edital sobre alterações legislativas, salvo retificação, previsão expressa ou orientação posterior da banca.

> **Roteiro:** regra literal da lei → regulamento aplicável ao corte → interpretação do STF → atualização pós-edital → caso concreto.

---

## 2. Fundamentos, princípios e objetivos

### 2.1 Fundamentos do art. 2º

O respeito à liberdade de expressão é o fundamento central. A lei também reconhece:

1. escala mundial da rede;
2. direitos humanos, personalidade e cidadania em meios digitais;
3. pluralidade e diversidade;
4. abertura e colaboração;
5. livre iniciativa, livre concorrência e defesa do consumidor;
6. finalidade social da rede.

Liberdade de expressão não elimina privacidade, proteção de dados, responsabilidade ou direitos de terceiros.

### 2.2 Princípios do art. 3º

| Princípio | Sentido |
|---|---|
| liberdade de expressão, comunicação e manifestação | proteção nos termos constitucionais |
| privacidade | tutela da intimidade e da vida privada |
| proteção de dados pessoais | observância da legislação aplicável |
| neutralidade de rede | tratamento isonômico dos pacotes |
| estabilidade, segurança e funcionalidade | boas práticas e padrões técnicos |
| responsabilização conforme as atividades | responsabilidade ligada ao papel exercido |
| natureza participativa | preservação da participação plural |
| liberdade dos modelos de negócio | admitida quando compatível com os demais princípios |

O rol não é fechado.

### 2.3 Objetivos do art. 4º

A disciplina promove:

- acesso à internet a todos;
- acesso à informação, conhecimento, cultura e assuntos públicos;
- inovação e difusão tecnológica;
- padrões tecnológicos abertos que favoreçam comunicação, acessibilidade e interoperabilidade.

Fundamento, princípio e objetivo são categorias diferentes.

---

## 3. Conceitos legais

| Conceito | Definição essencial |
|---|---|
| internet | sistema mundial de protocolos lógicos, de uso público e irrestrito, que permite comunicação entre terminais por diferentes redes |
| terminal | computador ou qualquer dispositivo conectado |
| endereço IP | código atribuído a terminal para identificação conforme parâmetros internacionais |
| administrador de sistema autônomo | pessoa que administra blocos de IP e o sistema autônomo de roteamento |
| conexão à internet | habilitação de terminal para enviar e receber pacotes mediante atribuição ou autenticação de IP |
| registro de conexão | início, término, duração e IP utilizado |
| aplicação de internet | funcionalidade acessível por terminal conectado |
| registro de acesso a aplicação | data e hora de uso de determinada aplicação a partir de determinado IP |

### 3.1 Distinções

- conexão habilita o terminal; aplicação oferece uma funcionalidade;
- registro de conexão não é registro de aplicação;
- registro não é o conteúdo da comunicação;
- terminal inclui celular, tablet, computador e outros dispositivos conectados.

### 3.2 Porta lógica de origem — atualização pós-edital

Desde 20/7/2026, o Decreto nº 8.771/2016, alterado pelo Decreto nº 12.975/2026, determina que a guarda de endereço IP abranja a **porta lógica de origem** quando necessária para identificar inequivocamente o terminal ou o próximo enlace.

Isso é especialmente relevante em compartilhamento de endereço, como CGNAT:

```text
IP público: 203.0.113.20
Terminal A: porta 41001
Terminal B: porta 41002
Terminal C: porta 41003
```

Regras:

- o dever independe de requisição prévia;
- recai autonomamente sobre cada provedor;
- a porta não substitui data, hora e IP;
- guarda não significa acesso livre;
- o fornecimento continua sujeito aos arts. 10 e 22 do MCI.

---

## 4. Direitos e garantias dos usuários

O art. 7º afirma que o acesso à internet é essencial ao exercício da cidadania. Isso não significa direito irrestrito a qualquer plano gratuito.

Direitos relevantes:

1. intimidade e vida privada, com reparação por violação;
2. sigilo do fluxo das comunicações, salvo ordem judicial na forma da lei;
3. sigilo das comunicações privadas armazenadas, salvo ordem judicial;
4. não suspensão da conexão, salvo débito diretamente decorrente de sua utilização;
5. manutenção da qualidade contratada;
6. contratos claros sobre proteção de registros e gerenciamento da rede;
7. não fornecimento de dados e registros a terceiros, salvo consentimento qualificado ou hipótese legal;
8. informação clara sobre coleta, uso, armazenamento, tratamento, proteção e finalidade;
9. consentimento expresso e destacado;
10. exclusão dos dados fornecidos à aplicação ao término da relação, ressalvadas guardas obrigatórias;
11. políticas de uso claras;
12. acessibilidade;
13. aplicação do CDC nas relações de consumo.

### 4.1 Art. 8º

Privacidade e liberdade de expressão nas comunicações são condições para o pleno exercício do acesso. É nula a cláusula que:

- viole a inviolabilidade e o sigilo das comunicações privadas;
- em contrato de adesão de serviço prestado no Brasil, não ofereça alternativa de foro brasileiro.

### 4.2 MCI, LGPD e CDC

| Diploma | Foco |
|---|---|
| MCI | internet, registros, comunicações, neutralidade e provedores |
| LGPD | regime geral de tratamento de dados pessoais |
| CDC | relações de consumo |

As normas são complementares. Consentimento não é a única hipótese legal de tratamento.

---





__CONTENT_BLOCK_2__





__CONTENT_BLOCK_3__





__CONTENT_BLOCK_4__
