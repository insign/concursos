---
schemaVersion: 1
title: Inteligência artificial e automação de serviços públicos
description: Fundamentos, aplicações, riscos e governança de IA generativa, chatbots e atendimento automatizado no setor público.
order: 33
storageId: tec-ia-automacao-servicos
---

## 1. Recorte do assunto e corte temporal

O edital exige **noções de inteligência artificial aplicada a serviços públicos**, com destaque para:

- IA generativa;
- chatbots;
- atendimento automatizado.

Big data, análise de dados e Internet das Coisas pertencem ao assunto seguinte.

O edital foi publicado em **6 de julho de 2026**. Para estudar corretamente, diferencie:

| Plano | Corte |
|---|---|
| normas garantidas pela regra geral do edital | vigentes em 6/7/2026 |
| políticas institucionais já vigentes | observar o âmbito do ato |
| situação legislativa atual | verificada em 28/7/2026 |
| norma publicada, mas ainda não vigente | não tratar como regra vigente |

### 1.1 Situação normativa

- Constituição, LGPD, Lei nº 13.460/2017 e Lei nº 14.129/2021 já fornecem regras relevantes.
- A Portaria MGI nº 3.485/2026 instituiu política de governança de IA no âmbito do MGI e das iniciativas do ColaboraGov por ela abrangidas; entrou em vigor em **23/6/2026**.
- O PL nº 2.338/2023 continua sendo **projeto de lei**, em análise na Câmara dos Deputados.
- A Portaria SGD/MGI nº 5.921/2026 foi publicada depois do edital e só entra em vigor em **1º/9/2026**; não é regra vigente em 28/7/2026.

> **Roteiro:** problema público → processo → dados → modelo → sistema → efeito → risco → controle → supervisão → monitoramento.

---

## 2. Automação, algoritmo, IA e aprendizado de máquina

| Conceito | Núcleo |
|---|---|
| automação | execução tecnológica de tarefa |
| automação determinística | mesma condição produz a ação prevista |
| algoritmo | sequência de instruções para resolver tarefa |
| IA | sistema que infere saídas a partir de entradas |
| aprendizado de máquina | modelo aprende padrões a partir de dados |
| RPA | software imita ações em interfaces |
| workflow | organiza etapas, regras, responsáveis e exceções |

Nem toda automação usa IA. Um fluxo “se o assunto for tributo, encaminhar à unidade fiscal” pode ser inteiramente determinístico.

### 2.1 RPA

A automação robótica de processos pode:

- clicar em botões;
- copiar dados;
- preencher campos;
- consultar sistemas;
- gerar arquivos;
- movimentar itens entre filas.

RPA não é robô físico e não exige aprendizado de máquina. Continua necessitando:

- tratamento de exceções;
- validação;
- credenciais restritas;
- monitoramento;
- manutenção quando a interface muda.

### 2.2 Antes de automatizar

Automatizar processo ruim amplia o problema. Antes de escolher ferramenta:

1. mapear a jornada;
2. eliminar exigências desnecessárias;
3. identificar base legal e competência;
4. definir exceções;
5. prever atendimento acessível;
6. estabelecer responsabilidade e recurso;
7. medir o resultado público esperado.

---

## 3. Tipos de IA e seus efeitos

| Tipo | Saída típica |
|---|---|
| preditiva | probabilidade, demanda ou risco |
| classificadora | categoria ou fila |
| recomendadora | ação sugerida |
| generativa | texto, imagem, áudio, vídeo ou código |
| visão computacional | informação extraída de imagem ou vídeo |
| processamento de linguagem | análise ou produção de linguagem |

### 3.1 Apoio, triagem, recomendação e decisão

| Papel | Efeito |
|---|---|
| apoio | humano usa a saída como insumo |
| triagem | ordena ou encaminha casos |
| recomendação | sugere ação |
| decisão | produz ou determina efeito jurídico/administrativo |

Chamar a saída de “sugestão” não reduz seu risco se, na prática, ela for seguida automaticamente.

Quanto maior o impacto sobre benefício, sanção, prioridade, fiscalização ou serviço essencial, maiores devem ser:

- qualidade dos dados;
- testes;
- explicação;
- supervisão;
- contestação;
- segurança;
- documentação.

---

## 4. Modelo de IA e sistema de IA

| Elemento | Conteúdo |
|---|---|
| modelo | componente treinado que produz previsão, classificação ou geração |
| sistema de IA | modelo + dados + interface + prompts + regras + integrações + usuários + controles |
| serviço público | sistema inserido em competência, processo, prazo, recurso e atendimento |
| ato administrativo | resultado assumido pelo agente ou órgão competente |

### Exemplo

Um LLM é apenas um componente. O chatbot institucional pode incluir:

- fonte normativa;
- mecanismo de busca;
- prompt institucional;
- filtro de segurança;
- autenticação;
- integração a protocolo;
- canal humano;
- registros;
- revisão;
- mecanismo de contestação.

> Avalie o risco do sistema e da jornada real, não apenas do modelo isolado.

Um modelo tecnicamente preciso pode gerar serviço inadequado se consulta norma revogada, usa permissões excessivas ou executa ações sem confirmação.

---

## 5. IA generativa e modelos de linguagem

IA generativa produz conteúdo novo a partir de padrões aprendidos.

### 5.1 LLM

Um grande modelo de linguagem:

- processa sequências de tokens;
- aprende relações estatísticas;
- gera saídas durante a inferência;
- não é repositório oficial por natureza;
- não possui competência administrativa;
- não garante verdade, atualidade ou completude.

### 5.2 Conceitos operacionais

| Termo | Regra |
|---|---|
| token | unidade processada, não necessariamente palavra inteira |
| treinamento | ajuste de parâmetros com dados e objetivo |
| ajuste fino | treinamento adicional para tarefa ou domínio |
| inferência | uso do modelo já treinado para produzir saída |
| janela de contexto | quantidade limitada de informação considerada |
| temperatura | parâmetro que influencia variabilidade |

Temperatura menor pode reduzir variabilidade, mas não transforma plausibilidade em verdade.

### 5.3 Contexto não é necessariamente treinamento

Colar texto em uma conversa não significa, por si só, retreinar os parâmetros. Porém, retenção e eventual reúso dependem:

- do contrato;
- da configuração;
- da política do fornecedor;
- do ambiente institucional.

Nunca suponha que ferramenta gratuita ou pública garante confidencialidade.

---

## 6. Prompt, saída e verificação

Prompt é a instrução e o contexto fornecidos ao sistema.

Um prompt útil define:

- tarefa;
- público;
- fonte permitida;
- dados necessários;
- limites;
- formato;
- tratamento da incerteza.

### Exemplo

```text
Resuma o procedimento em linguagem simples.
Use somente a norma e a Carta de Serviços fornecidas.
Não invente requisito.
Se faltar fundamento, responda: “não encontrei base suficiente”.
Indique a fonte de cada orientação.
```

Prompt melhor reduz ambiguidade, mas não garante correção.

### 6.1 Alucinação

Alucinação é saída plausível, porém:

- falsa;
- sem suporte;
- incoerente com a fonte;
- acompanhada de citação inventada;
- baseada em lacuna preenchida indevidamente.

Fluência, detalhe e tom confiante não comprovam verdade.

### 6.2 Verificação independente

Pedir ao mesmo modelo “confirme se está certo” pode melhorar redação, mas não é auditoria independente.

Verifique em:

- norma original;
- processo;
- sistema oficial;
- base institucional;
- revisão humana competente.

---

## 7. Geração aumentada por recuperação — RAG

RAG combina:

1. recuperação de trechos em acervo;
2. inclusão dos trechos no contexto;
3. geração da resposta.

RAG não exige alterar os parâmetros do modelo a cada pergunta.

### 7.1 Benefícios

- acesso a conteúdo institucional;
- atualização mais simples;
- possibilidade de citar fonte;
- redução de parte das alucinações;
- delimitação do domínio.

### 7.2 Limites

RAG não garante:

- recuperação do documento correto;
- vigência da fonte;
- correspondência entre citação e frase;
- ausência de instrução maliciosa;
- interpretação jurídica correta;
- resposta quando não há base.

### 7.3 Governança da fonte

Antes de usar a resposta, confira:

1. órgão responsável;
2. versão;
3. vigência;
4. revogação;
5. pertinência do trecho;
6. correspondência da citação;
7. prioridade entre lei, regulamento, manual e FAQ;
8. atualização do índice;
9. existência de conteúdo malicioso;
10. capacidade de responder “não encontrei fundamento”.

Fonte verdadeira e revogada ainda produz orientação errada.

---

## 8. Chatbots e atendimento automatizado

Chatbot descreve a interface de conversa, não uma tecnologia única.

| Tipo | Funcionamento |
|---|---|
| regras | menus e condições fixas |
| recuperação | retorna resposta cadastrada |
| linguagem | interpreta intenção e extrai informação |
| generativo | produz resposta nova |
| híbrido | combina regras, busca, geração e encaminhamento |

### 8.1 Classificação pelo efeito

| Função | Exemplo | Controle principal |
|---|---|---|
| informação geral | documento exigido | fonte oficial vigente |
| orientação personalizada | indicar serviço | finalidade e equidade |
| informação pessoal | andamento | autenticação e autorização |
| protocolo | registrar manifestação | confirmação e integridade |
| transação | alterar cadastro | autorização e evidência |
| recomendação | sugerir prioridade | critérios e revisão |
| decisão | produzir efeito | competência e salvaguardas reforçadas |

A interface pode ser semelhante, mas o risco muda conforme o efeito.

### 8.2 Transparência ao usuário

O cidadão deve saber:

- que interage com automação;
- finalidade e limites;
- se a mensagem foi protocolada;
- se a resposta é orientação ou decisão;
- quem é responsável;
- como falar com pessoa;
- como corrigir ou contestar.

---

## 9. Acessibilidade, linguagem simples e canal humano

Atendimento automatizado deve considerar:

- leitor de tela;
- teclado;
- contraste;
- voz e texto;
- dispositivo móvel;
- conexão limitada;
- linguagem simples;
- pessoas com deficiência;
- pessoas com baixo letramento digital;
- exceções e atendimento humano.

### 9.1 Linguagem simples

Prefira:

- frases curtas;
- ordem direta;
- termos conhecidos;
- explicação de siglas;
- instruções em etapas;
- informação principal no início.

Simplificar a comunicação não autoriza alterar o conteúdo jurídico.

### 9.2 Fallback

Quando o sistema não compreende, não encontra fonte ou identifica risco, deve:

- informar a limitação;
- não inventar;
- encaminhar ao canal adequado;
- preservar contexto necessário com segurança;
- permitir continuidade do atendimento.

---

## 10. Finalidade pública, legalidade e responsabilidade

A solução precisa estar vinculada a:

- problema real;
- finalidade pública;
- competência;
- base normativa;
- processo definido;
- responsável identificável;
- resultado mensurável.

A ferramenta não adquire competência. O agente e o órgão continuam responsáveis por:

- fatos;
- normas;
- motivação;
- versão final;
- efeitos;
- correções.

Contrato não transfere dever estatal ao fornecedor.

---

## 11. Transparência, explicabilidade e rastreabilidade

### 11.1 Transparência

Informar, de forma útil:

- finalidade;
- papel da IA;
- dados usados;
- limites;
- responsável;
- canal de atendimento;
- possibilidade de revisão.

### 11.2 Explicabilidade

Explicação adequada pode incluir:

- fatores relevantes;
- fonte;
- etapa automatizada;
- limiar;
- responsável;
- forma de correção.

Explicabilidade não exige sempre divulgar código-fonte, segredo comercial ou detalhe que crie risco.

### 11.3 Rastreabilidade

Registros proporcionais podem conter:

- versão do modelo;
- prompt ou regra;
- fontes;
- entrada relevante;
- saída;
- intervenção humana;
- data;
- resultado;
- decisão final.

Retenção deve observar necessidade, segurança e prazos.

---

## 12. Supervisão humana

| Modelo | Participação |
|---|---|
| human-in-the-loop | pessoa intervém antes do efeito |
| human-on-the-loop | sistema atua, mas pessoa monitora e pode intervir |
| human-out-of-the-loop | não há intervenção operacional no caso |
| aprovação formal | pessoa confirma sem análise efetiva |

Supervisão efetiva exige:

- capacitação;
- informação;
- tempo;
- acesso à fonte;
- poder de discordar;
- autoridade para interromper;
- possibilidade de corrigir;
- registro da intervenção.

Aprovar 800 recomendações em poucos minutos pode ser supervisão apenas aparente.

### 12.1 Viés de automação

É a confiança excessiva na saída da tecnologia. Combata com:

- treinamento;
- apresentação de incerteza;
- fonte acessível;
- amostragem de revisão;
- métricas sobre divergência;
- autoridade para rejeitar.

---

## 13. Equidade e não discriminação

Riscos podem surgir de:

- dados históricos discriminatórios;
- grupos sub-representados;
- rótulos incorretos;
- variável proxy;
- limiar único inadequado;
- exclusão digital;
- feedback que reforça o padrão.

Acurácia média alta pode esconder erro elevado para determinado grupo.

Avalie, quando legítimo e necessário:

- falso positivo;
- falso negativo;
- taxa de encaminhamento;
- tempo de resposta;
- abandono;
- impacto desagregado;
- possibilidade de correção.

Uso de atributos sensíveis para auditoria deve possuir base, necessidade e proteção.

---

## 14. LGPD e decisões automatizadas

Princípios relevantes:

- finalidade;
- adequação;
- necessidade;
- transparência;
- segurança;
- prevenção;
- não discriminação;
- prestação de contas.

No poder público, o tratamento deve estar ligado a finalidade pública, interesse público e competência ou atribuição legal.

### 14.1 Art. 20

O titular pode solicitar revisão de decisão:

- tomada unicamente com base em tratamento automatizado de dados pessoais;
- que afete seus interesses.

Também pode solicitar informações sobre critérios e procedimentos, preservados segredos protegidos.

A literalidade vigente não exige expressamente que a revisão seja realizada por pessoa natural, embora riscos elevados possam justificar revisão humana efetiva como salvaguarda.

---

## 15. Classificação da informação e ferramentas externas

| Informação | Conduta |
|---|---|
| pública e aprovada | uso conforme política institucional |
| interna não pública | somente em ambiente institucional autorizado |
| pessoal | base, finalidade, minimização, contrato e segurança |
| sensível | controles reforçados e avaliação de risco |
| sigilosa | não inserir em ferramenta externa não autorizada |
| senha, chave ou segredo | nunca usar como contexto comum |

No âmbito da Portaria MGI nº 3.485/2026, informações estritamente públicas podem ser usadas em ferramentas externas. Dados pessoais, sensíveis ou sigilosos não devem ser enviados, em regra, sem avaliação prévia e garantias técnicas e contratuais.

Essa política possui âmbito institucional delimitado; não deve ser apresentada como lei geral nacional.

---

## 16. Segurança e prompt injection

### 16.1 Ameaças

- vazamento de dados;
- acesso indevido;
- credencial exposta;
- resposta maliciosa;
- manipulação do prompt;
- documento contaminado;
- execução de comando inseguro;
- dependência do fornecedor.

### 16.2 Prompt injection

Ataque tenta induzir o sistema a ignorar instruções ou revelar informação.

- **direta:** texto do usuário contém a instrução maliciosa;
- **indireta:** documento, site ou mensagem recuperada contém instrução oculta.

Controles:

- separar instrução e conteúdo;
- tratar fonte externa como dado, não comando;
- menor privilégio;
- ferramenta permitida em lista fechada;
- validação de parâmetros;
- confirmação antes de ação;
- limite de quantidade e valor;
- sandbox quando cabível;
- registro e interrupção.

Nunca execute automaticamente código, consulta ou link apenas porque foi gerado por IA.

---

## 17. Agentes de IA e ferramentas

| Arquitetura | Capacidade |
|---|---|
| chatbot informativo | gera texto |
| assistente com RAG | busca e responde |
| assistente com ferramentas | consulta sistemas autorizados |
| agente | planeja etapas e aciona ferramentas |
| multiagente | distribui tarefas entre componentes |

Quanto maior a autonomia, maior o controle.

### Exemplo

Um assistente pode consultar andamento dentro da autorização do usuário. Alterar cadastro, emitir pagamento ou indeferir pedido exige controles adicionais:

- autenticação;
- autorização por operação;
- confirmação;
- validação;
- limite;
- registro;
- reversão;
- supervisão.

---

## 18. Governança do ciclo de vida

```text
Problema → finalidade → inventário → impacto →
aquisição/desenvolvimento → testes → implantação →
monitoramento → incidente → mudança/desativação
```

### 18.1 Inventário

Registre:

- finalidade;
- área responsável;
- fornecedor;
- modelo e versão;
- dados;
- integrações;
- usuários;
- efeitos;
- nível de risco;
- controles;
- revisão;
- data de reavaliação.

### 18.2 Avaliação de impacto algorítmico

Pode analisar:

- direitos afetados;
- grupos expostos;
- dados e base legal;
- erros previsíveis;
- explicabilidade;
- contestação;
- segurança;
- dependências;
- risco residual.

Não substitui RIPD, segurança, auditoria ou decisão competente.

### 18.3 Contratação

O contrato deve prever, conforme o caso:

- objeto e limites;
- dados e finalidade;
- retenção;
- localização;
- subcontratados;
- segurança;
- logs;
- testes;
- métricas;
- incidentes;
- auditoria;
- portabilidade;
- reversibilidade;
- exclusão ao término;
- mudança de modelo.

“IA” não pode ser caixa-preta contratual sem responsabilidades.

---

## 19. Testes, métricas e operação

### 19.1 Antes da produção

Teste:

- casos normais;
- casos raros;
- grupos diferentes;
- dados ausentes;
- entradas hostis;
- acessibilidade;
- fontes revogadas;
- fallback;
- permissões;
- carga;
- recuperação;
- intervenção humana.

### 19.2 Métricas

| Contexto | Exemplos |
|---|---|
| classificação | precisão, revocação, falsos positivos e negativos |
| chatbot | resolução, encaminhamento, abandono e correção |
| generativa | fundamentação, citação, factualidade e revisão |
| serviço | prazo, retrabalho, satisfação e equidade |

Métrica offline não basta. Monitore o serviço real.

### 19.3 Deriva

Deriva ocorre quando dados, comportamento ou ambiente mudam e o desempenho se degrada.

Sinais:

- aumento de erro;
- mudança da população;
- norma nova;
- vocabulário diferente;
- base desatualizada;
- nova forma de fraude.

Resposta:

- investigar;
- reavaliar;
- atualizar;
- ajustar;
- restringir;
- suspender;
- comunicar quando necessário.

---

## 20. Incidentes e desativação

Incidentes podem envolver:

- decisão indevida;
- vazamento;
- acesso não autorizado;
- discriminação;
- execução errada;
- citação falsa;
- indisponibilidade;
- comprometimento de fornecedor.

Plano:

1. detectar;
2. conter;
3. preservar evidência;
4. avaliar impacto;
5. corrigir;
6. comunicar conforme o regime aplicável;
7. recuperar;
8. revisar controles;
9. acompanhar pessoas afetadas.

A solução deve poder ser interrompida ou desativada com continuidade do serviço.

---

## 21. Casos resolvidos

### 21.1 FAQ institucional

Chatbot responde apenas com Carta de Serviços vigente e indica a fonte.

**Controle:** RAG governado, resposta de insuficiência e canal humano.

### 21.2 Triagem

Modelo classifica requerimentos em filas.

**Controle:** limiar, fila de incerteza, correção de encaminhamento e auditoria.

### 21.3 Minuta oficial

IA redige minuta.

**Controle:** processo original, norma vigente, revisão e responsabilidade do signatário.

### 21.4 Ferramenta externa

Servidor cola CPF, laudo e informação sigilosa em serviço gratuito.

**Conclusão:** gratuidade não comprova autorização nem confidencialidade.

### 21.5 Agente com ferramenta

Assistente consulta e altera cadastro.

**Controle:** consulta pode ser autorizada; alteração sensível exige confirmação, limite e registro.

### 21.6 Fonte revogada

RAG cita norma autêntica, porém revogada.

**Conclusão:** citação verdadeira não garante vigência.

### 21.7 Supervisão aparente

Pessoa recebe centenas de recomendações e não possui tempo para revisar.

**Conclusão:** presença humana formal sem controle substantivo.

---

## 22. Situação institucional e legislativa

### 22.1 Portaria MGI nº 3.485/2026

Vigente antes do edital, institui política de governança de IA no âmbito delimitado do MGI e de iniciativas abrangidas do ColaboraGov.

Pontos:

- governança;
- segurança;
- gestão de riscos;
- transparência;
- privacidade;
- capacitação;
- supervisão humana;
- responsabilidade pelo conteúdo final.

Não é lei geral nacional para todos os órgãos e Poderes.

### 22.2 PL nº 2.338/2023

Em 28/7/2026:

- permanece projeto de lei;
- aguarda parecer na comissão especial da Câmara;
- não deve ser citado como lei vigente.

### 22.3 Portaria SGD/MGI nº 5.921/2026

- publicada depois do edital;
- entra em vigor em 1º/9/2026;
- trata de governança de IA em modelo específico de contratação de operação de infraestrutura do SISP;
- não integra o núcleo vigente em 28/7/2026.

---

## 23. Pegadinhas

- automação não é necessariamente IA;
- RPA não exige IA;
- algoritmo não é sinônimo de aprendizado;
- generativa não garante verdade;
- chatbot não é sinônimo de LLM;
- modelo não é sistema;
- prompt não é prova;
- contexto não é necessariamente treinamento;
- temperatura baixa não elimina alucinação;
- RAG não é ajuste fino;
- fonte verdadeira pode estar revogada;
- triagem pode causar dano mesmo sem decidir mérito;
- “sugestão” seguida automaticamente funciona como decisão;
- presença humana não garante supervisão efetiva;
- acurácia média pode esconder desigualdade;
- fornecedor não recebe competência administrativa;
- contrato não transfere responsabilidade pública;
- decisão unicamente automatizada tem regime específico na LGPD;
- ferramenta gratuita não é ambiente autorizado;
- dado público não significa todo dado do processo;
- instrução em documento recuperado pode ser prompt injection;
- agente com ferramenta exige autorização por ação;
- métrica de laboratório não substitui operação real;
- Portaria MGI nº 3.485 não é lei nacional geral;
- PL nº 2.338 não é lei;
- Portaria SGD/MGI nº 5.921 ainda não está vigente em 28/7/2026.

---

## 24. Método de resolução

1. Identifique se é automação determinística, ML ou IA generativa.
2. Separe modelo, sistema e serviço público.
3. Classifique a saída: apoio, triagem, recomendação ou decisão.
4. Verifique finalidade, competência, dados e efeito.
5. Em generativa, procure fonte, alucinação e revisão.
6. Em RAG, verifique recuperação, vigência e correspondência da citação.
7. Em chatbot, identifique autenticação, protocolo, transação e fallback.
8. Em supervisão, verifique tempo, informação e poder de intervenção.
9. Em segurança, limite ferramentas, permissões e ações.
10. Em norma, confirme âmbito, vigência e corte do edital.
