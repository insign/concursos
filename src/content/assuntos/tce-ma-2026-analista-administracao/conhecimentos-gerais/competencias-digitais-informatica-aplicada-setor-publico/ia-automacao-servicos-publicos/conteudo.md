---
schemaVersion: 1
title: "Inteligência artificial e automação de serviços públicos"
description: Fundamentos, aplicações, riscos e governança de IA generativa, chatbots e atendimento automatizado no setor público.
order: 33
storageId: ia-automacao-servicos-publicos
---

## 1. Recorte do assunto e corte temporal

Este assunto cobre o item 4.5 do edital no recorte de:

- inteligência artificial aplicada a serviços públicos;
- inteligência artificial generativa;
- chatbots;
- atendimento automatizado;
- automação de processos relacionados à prestação de serviços.

O corte normativo e institucional é **18 de julho de 2026**.

Big data, análise de dados para políticas públicas, Internet das Coisas e cidades inteligentes pertencem ao assunto seguinte. Aqui, dados são abordados apenas quando necessários para entender o funcionamento, a qualidade, a privacidade ou a segurança de uma solução de IA.

No corte adotado:

- o Brasil **não possuía uma lei geral de inteligência artificial em vigor**;
- o Projeto de Lei nº 2.338/2023, aprovado pelo Senado e remetido à Câmara dos Deputados, ainda aguardava parecer do relator;
- normas vigentes, como a Constituição, a LGPD e as leis de defesa do usuário e de governo digital, já incidiam sobre usos concretos de IA;
- guias técnicos e políticas institucionais orientavam boas práticas, mas não tinham todos o mesmo alcance jurídico.

> **Regra de prova:** uma obrigação legal vigente, uma política interna de determinado órgão e uma recomendação técnica não são equivalentes.

---

## 2. Automação, algoritmos e inteligência artificial

### 2.1 Automação

**Automação** é o uso de tecnologia para executar tarefas com pouca ou nenhuma intervenção humana em cada ocorrência. Ela pode existir sem inteligência artificial.

Exemplos:

- preencher campos a partir de cadastro já validado;
- enviar uma notificação quando o processo muda de etapa;
- conferir se todos os documentos obrigatórios foram anexados;
- copiar informações entre sistemas por uma sequência fixa;
- encaminhar protocolo conforme regras previamente definidas.

Uma regra determinística do tipo `se condição X, então ação Y` produz a mesma saída diante das mesmas entradas. Isso favorece previsibilidade e teste, embora a regra ainda possa estar errada, incompleta ou gerar impacto injusto.

### 2.2 Automação de processos e RPA

A automação pode redesenhar um fluxo completo ou apenas repetir ações numa interface.

| Abordagem | Ideia central | Exemplo |
|---|---|---|
| **workflow/BPM** | coordena etapas, regras, responsáveis e exceções de um processo | encaminhar requerimento e controlar prazo |
| **script ou macro** | executa comandos definidos em sistema ou arquivo | gerar relatório padronizado |
| **RPA** | robô de software imita ações humanas em interfaces | transcrever dados de sistema legado para outro |

**RPA**, ou automação robótica de processos, não é necessariamente IA. Um robô pode seguir passos fixos sem aprender, inferir ou gerar conteúdo.

Automatizar um processo ruim apenas acelera seus defeitos. Antes da tecnologia, convém:

1. mapear a jornada;
2. eliminar exigências desnecessárias;
3. definir entradas, responsáveis e exceções;
4. verificar a base legal;
5. só então escolher o grau de automação.

### 2.3 Algoritmo

Um **algoritmo** é uma sequência finita de instruções para resolver um problema ou executar uma tarefa. Todo sistema de IA usa algoritmos, mas nem todo algoritmo é IA.

Uma calculadora de prazo baseada em regras legais é algorítmica e automatizada. Ela não se torna inteligente apenas por estar num sistema eletrônico.

### 2.4 Inteligência artificial

Na definição atualizada da OCDE, um sistema de IA é um sistema baseado em máquina que, para objetivos explícitos ou implícitos, infere a partir das entradas recebidas como gerar saídas, como:

- previsões;
- conteúdo;
- recomendações;
- decisões.

Essas saídas podem influenciar ambientes físicos ou virtuais. Sistemas variam em autonomia e adaptabilidade após a implantação.

A distinção prática está na **inferência**: em vez de apenas executar uma regra escrita para cada caso, o sistema identifica padrões ou relações para produzir uma saída.

### 2.5 Aprendizado de máquina

**Aprendizado de máquina** (*machine learning*) é uma área da IA em que modelos extraem padrões de dados para executar tarefas sem que cada regra seja programada individualmente.

Exemplos:

- classificar assunto de uma solicitação;
- detectar documentos aparentemente duplicados;
- estimar demanda de atendimento;
- reconhecer texto em imagem;
- identificar mensagens possivelmente maliciosas.

O modelo não “compreende” necessariamente a realidade como uma pessoa. Ele relaciona entradas e saídas segundo padrões aprendidos, objetivos e parâmetros.

---

## 3. Tipos de uso: predição, geração e decisão

### 3.1 IA preditiva ou classificatória

Produz uma categoria, probabilidade, estimativa ou recomendação.

Exemplos:

- classificar uma manifestação por assunto;
- estimar tempo de espera;
- indicar prioridade para análise humana;
- detectar anomalias para investigação.

A probabilidade é uma estimativa, não uma certeza. Um limiar de classificação envolve escolhas sobre falsos positivos e falsos negativos.

### 3.2 IA generativa

**IA generativa** cria conteúdo novo a partir de padrões aprendidos. Pode gerar:

- texto;
- imagem;
- áudio;
- vídeo;
- código;
- dados sintéticos.

No setor público, pode apoiar:

- rascunhos de texto em linguagem simples;
- resumos para posterior conferência;
- sugestões de resposta;
- tradução inicial;
- criação de perguntas frequentes;
- apoio à busca em acervo institucional;
- protótipos e código sujeitos a revisão.

Gerar conteúdo não equivale a recuperar um registro verdadeiro. Uma saída pode ser convincente e ainda estar incorreta.

### 3.3 Apoio versus decisão

O papel da solução pode ser:

| Papel | Exemplo | Controle esperado |
|---|---|---|
| **apoio** | sugerir resumo para o servidor revisar | conferência antes do uso |
| **triagem** | ordenar casos para análise | critérios, auditoria e canal para exceções |
| **recomendação** | indicar possível encaminhamento | decisão fundamentada pelo agente competente |
| **decisão automatizada** | produzir efeito sem avaliação humana do caso | salvaguardas reforçadas e aderência jurídica |

Chamar uma saída de “sugestão” não basta se, na prática, os agentes a confirmam mecanicamente. Esse comportamento é **viés de automação**: confiar excessivamente no sistema e reduzir a revisão crítica.

Quanto maior o potencial de afetar direitos, benefícios, sanções, fiscalização ou acesso a serviços essenciais, maior deve ser o rigor de governança e supervisão.

---

## 4. Como funciona a IA generativa de texto

### 4.1 Modelos de linguagem

Um **grande modelo de linguagem**, ou LLM, aprende relações estatísticas em grandes conjuntos de texto e usa parâmetros para produzir sequências plausíveis.

O processamento costuma dividir o texto em **tokens**, unidades que podem corresponder a palavras, partes de palavras, pontuação ou outros símbolos.

Durante a **inferência**, o modelo recebe uma entrada e calcula probabilidades para gerar a continuação. Temperatura e outros parâmetros podem alterar a variabilidade da saída, mas não transformam probabilidade em verdade.

### 4.2 Treinamento e inferência

| Fase | O que ocorre |
|---|---|
| **treinamento** | parâmetros do modelo são ajustados com base em dados e objetivo de aprendizagem |
| **ajuste fino** | o modelo recebe treinamento adicional para domínio ou comportamento mais específico |
| **inferência** | o modelo já treinado gera saída para uma nova entrada |

Inserir informação no prompt durante o uso não significa, por si só, treinar ou ajustar o modelo. Entretanto, o provedor pode registrar ou reutilizar entradas conforme contrato e configuração. Por isso, a governança deve verificar retenção e uso dos dados, e não presumir confidencialidade.

### 4.3 Prompt

**Prompt** é a instrução e o contexto fornecidos ao modelo. Um bom prompt pode explicitar:

1. **tarefa**: o que deve ser feito;
2. **contexto**: para qual serviço e público;
3. **dados**: material autorizado para a resposta;
4. **restrições**: o que não inferir ou divulgar;
5. **formato**: tabela, lista, linguagem simples;
6. **critérios**: precisão, fontes, pontos de incerteza.

Exemplo:

> Resuma o texto fornecido em até cinco tópicos, sem criar requisitos ausentes. Diferencie prazo, documento e canal de atendimento. Indique “não consta do texto” quando faltar informação.

Refinar o prompt pode melhorar o resultado, mas **não substitui verificação**. A qualidade também depende do modelo, do contexto, dos dados e da natureza da tarefa.

### 4.4 Janela de contexto

A **janela de contexto** limita a quantidade de informação considerada numa interação. Conteúdo muito extenso pode ser omitido, truncado ou perder relevância. Conversas anteriores também podem influenciar respostas enquanto permanecerem no contexto.

Por isso:

- forneça somente informação necessária e autorizada;
- delimite qual fonte deve prevalecer;
- divida tarefas extensas quando adequado;
- não confie na “memória” do chatbot como registro oficial.

---

## 5. Alucinação, fundamentação e RAG

### 5.1 Alucinação

**Alucinação** é uma saída plausível, mas falsa, não sustentada ou incoerente com a fonte. O modelo pode:

- inventar norma, número de processo ou citação;
- atribuir conteúdo inexistente a documento real;
- misturar regras de regimes diferentes;
- preencher lacuna com suposição;
- apresentar informação desatualizada como vigente.

Fluência e segurança na linguagem não são evidência de correção.

### 5.2 Como reduzir o risco

Medidas úteis:

- limitar a resposta a fontes institucionais selecionadas;
- exigir indicação do trecho que sustenta cada afirmação relevante;
- instruir o sistema a declarar insuficiência de informação;
- conferir links e citações no documento original;
- testar perguntas adversariais e casos sem resposta;
- submeter conteúdo de impacto a revisão humana competente;
- monitorar respostas reais e atualizar o acervo.

Pedir ao próprio modelo que “confira” sua resposta pode ajudar na redação, mas não constitui validação independente.

### 5.3 Geração aumentada por recuperação

**RAG** (*retrieval-augmented generation*) combina recuperação de documentos com geração:

1. a pergunta é usada para buscar trechos relevantes em acervo autorizado;
2. os trechos recuperados entram no contexto;
3. o modelo formula a resposta com base nesse material;
4. a aplicação pode apresentar fontes ao usuário.

RAG é diferente de treinamento: ele fornece contexto no momento da resposta, sem necessariamente alterar os parâmetros do modelo.

Benefícios possíveis:

- apoiar respostas em conteúdo institucional atualizado;
- restringir o domínio;
- permitir citações;
- atualizar o acervo sem retreinar todo o modelo.

Limites:

- a busca pode recuperar trecho irrelevante;
- o acervo pode estar desatualizado ou incompleto;
- a geração pode interpretar mal a fonte;
- uma referência exibida pode não sustentar a frase;
- documentos maliciosos podem tentar manipular instruções.

> **Pegadinha:** RAG reduz alguns riscos, mas não garante veracidade nem elimina alucinações.

---

## 6. Chatbots e atendimento automatizado

### 6.1 Chatbot não é sinônimo de IA generativa

Um **chatbot** é uma interface conversacional. Ele pode funcionar por:

| Tipo | Funcionamento |
|---|---|
| **regras ou árvore de decisão** | oferece opções e respostas previamente cadastradas |
| **recuperação** | localiza resposta pronta em base de conhecimento |
| **processamento de linguagem** | identifica intenção e entidades para acionar fluxo |
| **IA generativa** | compõe resposta em linguagem natural |
| **híbrido** | combina fluxos determinísticos, busca e geração |

Logo, há chatbots sem IA generativa e há aplicações de IA generativa que não são chatbots.

### 6.2 Usos adequados

Um assistente pode:

- explicar requisitos publicados;
- localizar serviço e canal;
- responder perguntas frequentes;
- orientar preenchimento;
- informar andamento obtido de sistema autorizado;
- classificar a demanda;
- transferir o usuário ao canal competente.

É mais seguro separar:

- **informação geral**, que pode vir de base institucional controlada;
- **informação pessoal**, que exige autenticação e autorização adequadas;
- **ato ou decisão administrativa**, que depende de competência, procedimento e fundamentação.

### 6.3 Projeto centrado no usuário

O usuário deve saber:

- que interage com sistema automatizado;
- qual é a finalidade do canal;
- quais são seus limites;
- quando não deve inserir dados sensíveis ou sigilosos;
- como alcançar atendimento humano ou outro canal;
- como contestar erro ou registrar manifestação.

Um chatbot não deve fingir ser pessoa. Também não deve bloquear o acesso ao serviço quando falha ou não compreende a demanda.

### 6.4 Atendimento humano e multicanal

Automação não implica canal exclusivamente digital. A Lei nº 14.129/2021 preserva atendimento presencial conforme a natureza, a relevância e o público do serviço. A Lei nº 13.460/2017 protege a adequada prestação e a avaliação dos serviços.

Um **fallback humano** ou canal alternativo é especialmente importante quando:

- a intenção não é reconhecida;
- a resposta pode afetar prazo ou direito;
- há pessoa em situação de vulnerabilidade;
- o usuário contesta a orientação;
- o sistema está indisponível;
- a acessibilidade não pode ser assegurada naquele canal.

### 6.5 Linguagem simples e acessibilidade

A Lei nº 15.263/2025 instituiu a Política Nacional de Linguagem Simples. No atendimento automatizado, isso favorece:

- frases diretas;
- termos conhecidos ou explicados;
- organização da informação mais importante;
- instruções em etapas;
- ausência de jargão desnecessário;
- teste da comunicação com o público.

Acessibilidade deve alcançar tanto a interface quanto o conteúdo e o caminho de transferência. Compatibilidade com teclado e tecnologia assistiva, rótulos compreensíveis, contraste e alternativas não textuais continuam necessários.

> Responder em linguagem simples não autoriza simplificar a ponto de alterar uma regra jurídica.

---

## 7. Casos de uso no serviço público

### 7.1 Automação administrativa

Pode reduzir trabalho repetitivo em:

- protocolo e distribuição;
- extração de campos de documentos;
- verificação formal de anexos;
- geração de avisos;
- conciliação de registros;
- produção de minutas padronizadas.

Controles:

- validar entradas;
- registrar exceções;
- impedir que erro em escala passe despercebido;
- preservar trilha de auditoria;
- permitir correção e reprocessamento.

### 7.2 Triagem e classificação

Classificar manifestações, processos ou solicitações pode acelerar encaminhamento. O desenho deve medir erros por categoria e grupo afetado. Um bom desempenho médio pode esconder falha sistemática em linguagem regional, pessoas com deficiência ou tema menos frequente.

Triagem não deve virar indeferimento oculto. Casos incertos precisam de rota de revisão.

### 7.3 Assistência à redação

IA generativa pode elaborar rascunho, resumo ou versão em linguagem simples. O responsável deve:

- conferir fatos, nomes, datas, cálculos e referências;
- preservar o sentido do documento original;
- remover conteúdo indevido;
- identificar a versão oficial;
- assumir responsabilidade pelo texto aprovado.

A ferramenta não adquire competência para praticar o ato administrativo.

### 7.4 Busca e gestão do conhecimento

Um assistente conectado a normas, manuais e perguntas frequentes pode apoiar servidor e cidadão. A solução precisa:

- definir acervo autorizado;
- registrar origem e vigência;
- retirar versão revogada;
- citar a fonte relevante;
- informar quando não encontra base suficiente.

### 7.5 Atendimento personalizado

Personalização pode antecipar orientação ou adequar linguagem, mas deve evitar:

- coleta excessiva;
- inferência sem necessidade;
- perfil discriminatório;
- recomendação que esconda opções legítimas;
- uso secundário incompatível.

O princípio é oferecer ajuda proporcional à finalidade, não acumular o máximo de dados possível.

---

## 8. Benefícios e limites

### 8.1 Benefícios potenciais

- atendimento contínuo para dúvidas comuns;
- redução de tarefas repetitivas;
- respostas e encaminhamentos mais rápidos;
- maior consistência em tarefas padronizadas;
- apoio à linguagem simples;
- liberação de pessoas para casos complexos;
- melhoria da capacidade de busca em acervos extensos.

São **benefícios potenciais**, dependentes de desenho, dados, testes, integração e governança.

### 8.2 Limites técnicos e organizacionais

- erro e alucinação;
- viés nos dados ou na formulação do problema;
- falta de contexto jurídico e institucional;
- dificuldade de explicar resultados complexos;
- dependência de fornecedor;
- custo de operação e revisão;
- mudança de comportamento do modelo;
- ataque e vazamento de informação;
- degradação quando processo ou população mudam;
- exclusão de quem não acessa o canal.

Automação aumenta escala. Isso significa que pode ampliar tanto eficiência quanto dano.

---

## 9. Princípios para uso responsável

### 9.1 Finalidade e valor público

A pergunta inicial não deve ser “onde colocar IA?”, mas:

1. qual problema público existe;
2. para quem;
3. qual resultado deve melhorar;
4. se uma regra simples ou mudança de processo resolve melhor;
5. quais riscos a solução cria.

IA não é finalidade administrativa. A solução deve ser necessária, adequada e proporcional ao problema.

### 9.2 Legalidade e competência

A tecnologia não cria competência, base legal, requisito ou restrição. O órgão continua responsável por:

- finalidade do tratamento;
- fundamento jurídico;
- procedimento;
- motivação;
- prestação do serviço;
- atos de agentes e contratados.

### 9.3 Equidade e não discriminação

O sistema pode reproduzir ou ampliar desigualdades por:

- dados históricos enviesados;
- grupos pouco representados;
- variável que funciona como substituta de atributo protegido;
- objetivo de otimização inadequado;
- erro maior para determinado grupo;
- barreira de idioma, acesso ou acessibilidade.

Tratar todos de forma idêntica não basta se a taxa de erro ou o efeito é desproporcional. Avaliações devem procurar impacto indireto e oferecer correção.

### 9.4 Transparência

Transparência pode incluir, conforme o risco:

- aviso de uso de automação ou IA;
- finalidade;
- responsável;
- dados e fontes relevantes;
- função da ferramenta na decisão;
- limitações conhecidas;
- critérios gerais;
- forma de pedir explicação, revisão ou atendimento;
- indicadores e avaliações publicáveis.

Transparência não exige necessariamente publicar código-fonte, segredo comercial, dado pessoal ou detalhe que facilite ataque. Exige informação útil e proporcional para compreensão e controle.

### 9.5 Explicabilidade

**Explicabilidade** é a capacidade de fornecer razões compreensíveis sobre uma saída e seu papel no processo.

Uma explicação útil responde, por exemplo:

- qual regra ou fator foi relevante;
- qual fonte sustentou a orientação;
- qual etapa foi automática;
- quem decidiu;
- como corrigir dado incorreto;
- como contestar o resultado.

Explicabilidade não é sinônimo de revelar todo o código ou apenas afirmar que “o algoritmo decidiu”.

### 9.6 Rastreabilidade e prestação de contas

Rastreabilidade registra o que ocorreu. Pode abranger:

- versão do modelo e da aplicação;
- configuração e instruções relevantes;
- fonte consultada;
- data e contexto da execução;
- saída gerada;
- revisão humana e decisão final;
- incidente e correção.

Os registros devem respeitar minimização, segurança, retenção e controle de acesso. Registrar tudo indefinidamente também cria risco.

**Prestação de contas** significa demonstrar medidas eficazes e assumir responsabilidade; não transferi-la ao fornecedor ou ao “algoritmo”.

### 9.7 Supervisão humana

Supervisão humana efetiva exige:

- pessoa capacitada;
- acesso à informação necessária;
- tempo e autoridade para discordar;
- possibilidade de interromper ou corrigir;
- proteção contra confirmação automática em massa;
- registro das intervenções relevantes.

Um clique obrigatório em “aprovar” não garante controle substantivo.

---

## 10. Proteção de dados pessoais

### 10.1 LGPD aplicada à IA

IA não forma zona livre da LGPD. Quando há dados pessoais, incidem princípios como:

- finalidade;
- adequação;
- necessidade;
- livre acesso;
- qualidade dos dados;
- transparência;
- segurança;
- prevenção;
- não discriminação;
- responsabilização e prestação de contas.

No Poder Público, o tratamento deve atender finalidade pública e perseguir o interesse público para executar competências ou atribuições legais. Consentimento não é a única base, nem um passe para qualquer uso.

### 10.2 Minimização e ferramentas externas

Antes de inserir conteúdo em ferramenta generativa, verifique:

- há dado pessoal, sensível, sigiloso ou protegido?
- o envio é necessário para a tarefa?
- existe ambiente institucional aprovado?
- o provedor retém entradas e saídas?
- usa esse material para treinar modelos?
- onde processa e armazena os dados?
- quem pode acessar registros?
- como ocorre exclusão e término contratual?

Anonimizar não é apenas retirar o nome. Combinações de contexto podem permitir reidentificação.

### 10.3 Decisões automatizadas e art. 20

O art. 20 da LGPD assegura ao titular o direito de solicitar revisão de decisões tomadas **unicamente com base em tratamento automatizado de dados pessoais** que afetem seus interesses, incluídas decisões destinadas a definir perfil pessoal, profissional, de consumo e de crédito ou aspectos de personalidade.

Pontos de prova:

- é necessário tratamento automatizado de **dados pessoais**;
- a decisão deve ser tomada **unicamente** com base nesse tratamento;
- deve afetar interesses do titular;
- o controlador deve fornecer informações claras e adequadas sobre critérios e procedimentos, observados segredos comercial e industrial;
- se não fornecer informações sob alegação de segredo, a ANPD pode auditar aspectos discriminatórios.

A redação vigente não afirma expressamente que a revisão será feita por pessoa natural. Boas práticas ou políticas específicas podem recomendar ou exigir intervenção humana em certos contextos, mas isso não deve ser atribuído como texto atual do caput do art. 20.

### 10.4 Relatório de impacto

O relatório de impacto à proteção de dados pessoais documenta processos que podem gerar riscos às liberdades civis e aos direitos fundamentais, incluindo medidas de salvaguarda e mitigação.

Ele não é mero formulário posterior. Pode apoiar a análise antes da implantação e ao longo de mudanças relevantes, conforme o risco e as orientações aplicáveis.

---

## 11. Segurança da IA generativa

### 11.1 Prompt injection

**Prompt injection** é a tentativa de manipular o modelo por instruções maliciosas na entrada. Pode ser:

- **direta**: o usuário ordena ignorar regras e revelar informação;
- **indireta**: a instrução está escondida em documento, página ou mensagem recuperada pelo sistema.

Um documento consultado deve ser tratado como **dado**, não como instrução confiável. Separar conteúdo de comandos, restringir ferramentas, validar saídas e limitar privilégios reduz risco.

### 11.2 Vazamento de informação

Entradas, arquivos, históricos, saídas, logs e bases de recuperação podem expor informação. Medidas incluem:

- classificação da informação;
- ambientes aprovados;
- mínimo privilégio;
- segregação entre usuários;
- criptografia e controle de acesso;
- retenção limitada;
- prevenção contra extração em massa;
- testes de acesso indevido.

### 11.3 Saída insegura

Texto ou código gerado é conteúdo não confiável até ser validado. Uma aplicação não deve executar automaticamente comando, consulta ou link produzido pelo modelo sem controle.

É necessário prevenir:

- injeção em banco ou sistema;
- código vulnerável;
- ação fora da autorização do usuário;
- exposição de segredo;
- link malicioso;
- instrução perigosa apresentada como oficial.

### 11.4 Ataques e testes

**Red teaming** testa de forma adversarial como a solução falha ou pode ser abusada. Os testes devem considerar:

- fuga de instruções;
- perguntas fora do escopo;
- tentativas de obter dados de outra pessoa;
- linguagem ofensiva ou discriminatória;
- fontes maliciosas;
- sobrecarga e indisponibilidade;
- formas variadas de expressar a mesma ameaça.

Teste antes do lançamento não basta; ameaças e modelos mudam.

---

## 12. Direitos autorais, conteúdo de terceiros e integridade

IA generativa não elimina direitos de terceiros. Antes de usar entrada ou publicar saída, o órgão deve verificar:

- autorização para usar o material;
- risco de reprodução indevida;
- necessidade de atribuição;
- autenticidade de imagem, áudio ou documento;
- licenças de código e componentes;
- responsabilidade editorial.

Uma citação inventada não se torna verdadeira por parecer acadêmica. Uma imagem sintética não deve ser apresentada como registro real. Conteúdo oficial requer identificação, revisão e controle de versão.

---

## 13. Governança e ciclo de vida

### 13.1 Etapas

| Etapa | Perguntas centrais |
|---|---|
| **problema** | qual necessidade pública e qual público? |
| **alternativas** | IA é melhor do que simplificar ou usar regra fixa? |
| **risco** | quais direitos, grupos e serviços podem ser afetados? |
| **dados e fontes** | são adequados, legítimos, atuais e representativos? |
| **aquisição/desenvolvimento** | responsabilidades, segurança e saída do fornecedor estão definidas? |
| **teste** | precisão, equidade, acessibilidade, segurança e casos extremos foram avaliados? |
| **piloto** | há escopo limitado, canal alternativo e observação? |
| **implantação** | usuários são informados e responsáveis estão preparados? |
| **monitoramento** | desempenho, incidentes, reclamações e mudanças são acompanhados? |
| **desativação** | dados, integrações, registros e comunicação são tratados? |

Governança cobre o ciclo inteiro, não apenas autorização inicial.

### 13.2 Inventário e classificação de risco

O órgão deve saber quais sistemas de IA usa, inclusive recursos incorporados a produtos contratados. Um inventário pode registrar:

- finalidade e responsável;
- fornecedor e versão;
- população afetada;
- dados e integrações;
- grau de autonomia;
- impacto potencial;
- testes e avaliações;
- canal de incidente e revisão.

Classificação de risco orienta intensidade dos controles. Não significa que aplicação de baixo risco esteja dispensada de segurança ou legalidade.

### 13.3 Avaliação de impacto algorítmico

Uma avaliação de impacto pode documentar:

1. contexto e finalidade;
2. pessoas e direitos afetados;
3. alternativas menos arriscadas;
4. fontes de erro e discriminação;
5. supervisão e contestação;
6. controles de privacidade e segurança;
7. métricas e limites de aceitação;
8. consulta a interessados;
9. decisão de implantar, restringir ou não usar.

Ela se relaciona, mas não se confunde necessariamente, com o relatório de impacto da LGPD.

### 13.4 Contratação

Contrato de solução de IA deve evitar uma “caixa-preta contratual”. Pontos relevantes:

- descrição do serviço e níveis de desempenho;
- responsabilidades entre órgão e fornecedor;
- origem e uso autorizado de dados;
- retenção, localização e subcontratados;
- segurança, incidente e auditoria;
- mudanças de modelo e aviso prévio;
- documentação e explicabilidade necessárias;
- portabilidade e reversibilidade;
- continuidade e término;
- direitos sobre entradas e saídas;
- proibição de uso incompatível.

Terceirizar a tecnologia não terceiriza a responsabilidade pública.

### 13.5 Documentação

Documentação deve permitir operação, auditoria e continuidade. Pode incluir:

- ficha do sistema e do modelo;
- instruções e limitações;
- versão e histórico de mudanças;
- conjunto e resultado de testes;
- critérios de aceitação;
- procedimento de supervisão;
- plano de incidente;
- registro de fontes e atualizações.

---

## 14. Testes, métricas e monitoramento

### 14.1 Antes da implantação

O teste deve representar o uso real e incluir:

- casos comuns;
- casos raros e fronteiriços;
- pergunta sem resposta no acervo;
- erros de digitação e variação linguística;
- diferentes grupos e necessidades de acessibilidade;
- tentativa de manipulação;
- resposta desatualizada;
- falha de integração;
- transferência ao canal humano.

Não se deve testar apenas exemplos preparados para funcionar.

### 14.2 Métricas

| Dimensão | Exemplos |
|---|---|
| **efetividade** | resolução correta, conclusão do serviço, retrabalho |
| **qualidade** | precisão, fundamentação, taxa de resposta inadequada |
| **equidade** | diferenças de erro e abandono entre grupos |
| **experiência** | satisfação, compreensão, esforço, transferência bem-sucedida |
| **eficiência** | tempo, custo e produtividade com revisão incluída |
| **segurança** | incidentes, bloqueios, acessos indevidos |
| **continuidade** | disponibilidade, latência e recuperação |

Velocidade e quantidade de atendimentos não bastam. Um chatbot pode encerrar conversas rapidamente porque não resolve a demanda.

### 14.3 Falsos positivos e falsos negativos

Em classificação:

- **falso positivo**: o sistema marca como pertencente a uma classe quando não pertence;
- **falso negativo**: o sistema deixa de identificar caso que pertence à classe.

O custo depende do contexto. Sinalizar indevidamente fraude e deixar de encaminhar pedido urgente são erros diferentes. O limiar deve refletir risco e possibilidade de revisão.

### 14.4 Deriva e mudança

**Deriva** ocorre quando dados, população, linguagem, processo ou relação entre variáveis muda, reduzindo o desempenho. Também pode haver troca silenciosa de modelo pelo fornecedor.

Monitoramento deve acionar:

- atualização de fonte;
- novo teste;
- ajuste de limiar;
- restrição temporária;
- retorno a canal alternativo;
- suspensão quando o risco exceder o aceitável.

### 14.5 Incidentes e aprendizagem

Usuários e servidores precisam de canal para relatar erro. O processo deve:

1. conter o dano;
2. preservar evidência necessária;
3. corrigir caso afetado;
4. comunicar responsáveis e pessoas quando aplicável;
5. investigar causa;
6. atualizar controles e testes;
7. verificar recorrência.

---

## 15. Padrões de qualidade do serviço digital

Os Padrões de Qualidade para Serviços Públicos Digitais da Secretaria de Governo Digital organizam sete eixos:

1. **facilidade**;
2. **comunicação**;
3. **atendimento**;
4. **experiência unificada**;
5. **acessibilidade**;
6. **privacidade e segurança**;
7. **escuta ativa**.

Aplicados a IA e automação, esses eixos significam que a solução deve ser avaliada como parte de uma jornada de serviço, e não como demonstração isolada de tecnologia.

Exemplos:

- facilidade: não exigir que o usuário aprenda comandos especiais;
- comunicação: declarar que o atendimento é automatizado;
- atendimento: oferecer encaminhamento útil;
- experiência unificada: não obrigar repetição desnecessária de dados;
- acessibilidade: permitir operação por diferentes usuários e tecnologias;
- privacidade e segurança: proteger dados em todas as integrações;
- escuta ativa: coletar e tratar reclamações e sugestões.

---

## 16. Quadro normativo e institucional no corte

### 16.1 Normas vigentes relevantes

| Instrumento | Relevância para IA e automação |
|---|---|
| **Constituição Federal** | legalidade, igualdade, devido processo, publicidade, eficiência, privacidade e proteção de dados |
| **Lei nº 13.460/2017** | direitos do usuário, Carta de Serviços e avaliação da prestação |
| **Lei nº 13.709/2018 (LGPD)** | tratamento de dados, direitos, segurança, não discriminação e decisão automatizada |
| **Lei nº 14.129/2021** | princípios e instrumentos de Governo Digital e prestação multicanal |
| **Lei nº 15.263/2025** | Política Nacional de Linguagem Simples |

Essas normas incidem conforme seu âmbito e a situação concreta. Elas não são uma lei geral de IA.

### 16.2 Portaria MGI nº 3.485/2026

A Portaria MGI nº 3.485/2026 instituiu política de governança, responsabilidade e uso ético e seguro de IA no **âmbito do Ministério da Gestão e da Inovação em Serviços Públicos e nas iniciativas do ColaboraGov.br abrangidas por seu texto**.

Ela é referência institucional recente para temas como governança, transparência, avaliação, supervisão e segurança, mas não deve ser generalizada como obrigação nacional aplicável automaticamente a todos os entes, Poderes e órgãos.

### 16.3 PL nº 2.338/2023

O projeto propõe marco regulatório baseado em direitos e risco. No corte de 18/07/2026, permanecia **projeto de lei**, em tramitação na Câmara dos Deputados e aguardando parecer do relator.

Em prova, uma regra do projeto só pode ser tratada como proposta, salvo se o enunciado fornecer texto específico para análise. Não se deve atribuí-la ao direito vigente.

### 16.4 Guias e padrões técnicos

Guias da Secretaria de Governo Digital, princípios da OCDE, recomendação da UNESCO e estruturas do NIST ajudam a organizar boas práticas. Eles:

- apoiam decisões e controles;
- podem ser incorporados por política ou contratação;
- não substituem lei, competência ou análise do caso;
- não possuem todos a mesma natureza jurídica.

---

## 17. Situação integrada

Um órgão pretende usar chatbot generativo para orientar pedidos de licença.

Uma implantação responsável inclui:

1. mapear dúvidas e simplificar o serviço antes de automatizar;
2. limitar respostas a normas e páginas institucionais vigentes;
3. informar que se trata de assistente automatizado;
4. impedir que a conversa seja confundida com protocolo ou decisão;
5. não solicitar dado pessoal sem necessidade e canal protegido;
6. testar alucinação, linguagem, acessibilidade e manipulação;
7. citar a fonte e declarar quando não há resposta segura;
8. oferecer transferência para canal humano;
9. registrar versão, incidentes e reclamações de forma proporcional;
10. medir resolução correta, não apenas quantidade de conversas;
11. revisar o sistema quando norma, serviço ou modelo mudar;
12. suspender o uso se o risco superar os controles.

O chatbot pode orientar. A competência para receber, instruir e decidir o pedido continua definida pela norma e pelo processo administrativo.

---

## 18. Pegadinhas recorrentes

1. **Automação não é sinônimo de IA.**
2. **RPA pode executar regras fixas sem IA.**
3. **Todo sistema de IA usa algoritmos; nem todo algoritmo é IA.**
4. **Chatbot não é necessariamente generativo.**
5. **IA generativa produz conteúdo plausível, não verdade garantida.**
6. **Prompt melhor não elimina necessidade de revisão.**
7. **RAG fornece contexto e não equivale necessariamente a treinamento.**
8. **RAG não elimina alucinação.**
9. **Triagem não deve se converter em indeferimento oculto.**
10. **Sugestão aceita mecanicamente pode virar decisão de fato.**
11. **Supervisão humana exige capacidade real de discordar.**
12. **Transparência útil não significa divulgar segredo ou código integral.**
13. **Explicação não é dizer apenas que “o algoritmo decidiu”.**
14. **Terceirização não transfere a responsabilidade pública.**
15. **Consentimento não é a única base jurídica do Poder Público.**
16. **Art. 20 da LGPD exige decisão unicamente automatizada que afete interesses.**
17. **O texto vigente do art. 20 não exige expressamente revisão por pessoa natural.**
18. **Prompt injection também pode vir de documento recuperado.**
19. **Saída gerada deve ser tratada como conteúdo não confiável até validação.**
20. **Acurácia média pode esconder erro desigual entre grupos.**
21. **Atendimento rápido não significa problema resolvido.**
22. **Canal digital não elimina automaticamente atendimento humano ou presencial.**
23. **Portaria MGI nº 3.485/2026 tem âmbito institucional delimitado.**
24. **PL nº 2.338/2023 não era lei vigente no corte.**

---

## 19. Mapa de revisão

| Se a questão mencionar... | Pense primeiro em... |
|---|---|
| regra fixa e repetível | automação determinística |
| robô imitando cliques | RPA |
| padrões extraídos de dados | aprendizado de máquina |
| texto ou imagem novos | IA generativa |
| interface de conversa | chatbot, com ou sem IA generativa |
| unidade processada pelo LLM | token |
| instrução dada ao modelo | prompt |
| saída falsa e convincente | alucinação |
| busca de trechos antes de gerar | RAG |
| instrução maliciosa em página | prompt injection indireta |
| confiança excessiva na recomendação | viés de automação |
| motivo compreensível da saída | explicabilidade |
| versão, fonte e intervenção | rastreabilidade |
| capacidade de discordar e parar | supervisão humana efetiva |
| decisão unicamente automatizada | art. 20 da LGPD |
| mudança de população ou padrão | deriva |
| erros comparados entre grupos | equidade |
| facilidade a escuta ativa | padrões de qualidade digital |
| política interna do MGI | Portaria MGI nº 3.485/2026 |
| proposta geral baseada em risco | PL nº 2.338/2023, não vigente no corte |

---

## Referências

- [Constituição da República Federativa do Brasil de 1988](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) — Presidência da República; texto constitucional compilado, inclusive arts. 5º e 37; acesso em 18 jul. 2026.
- [Lei nº 13.460/2017](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13460.htm) — Presidência da República; participação, proteção e defesa dos direitos do usuário dos serviços públicos, texto compilado; acesso em 18 jul. 2026.
- [Lei nº 13.709/2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) — Presidência da República; Lei Geral de Proteção de Dados Pessoais, texto compilado, especialmente arts. 6º, 20 e 23; acesso em 18 jul. 2026.
- [Lei nº 14.129/2021](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14129.htm) — Presidência da República; Lei do Governo Digital, texto compilado; acesso em 18 jul. 2026.
- [Lei nº 15.263/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15263.htm) — Presidência da República; Política Nacional de Linguagem Simples; acesso em 18 jul. 2026.
- [Portaria MGI nº 3.485, de 24 de abril de 2026](https://www.in.gov.br/en/web/dou/-/portaria-mgi-n-3.485-de-24-de-abril-de-2026-702070785) — Ministério da Gestão e da Inovação em Serviços Públicos; política institucional de governança, responsabilidade e uso ético e seguro de IA, publicada no DOU de 27 abr. 2026; acesso em 18 jul. 2026.
- [Tramitação do PL nº 2.338/2023](https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262) — Câmara dos Deputados; ficha de tramitação do projeto de marco regulatório da IA; acesso em 18 jul. 2026.
- [Guia de IA Generativa](https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/inteligencia-artificial-1/publicacoes/guia-ia-generativa) — Secretaria de Governo Digital; fundamentos, oportunidades, riscos e recomendações para o setor público; acesso em 18 jul. 2026.
- [Guia prático de prompt e pesquisa com IA para servidores públicos](https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/inteligencia-artificial-1/publicacoes/guia-pratico-de-prompt-e-pesquisa-com-ia-para-servidores-publicos) — Secretaria de Governo Digital; formulação de instruções e verificação de resultados; acesso em 18 jul. 2026.
- [Guia de Design de Transparência](https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/inteligencia-artificial-1/publicacoes/guia-de-design-de-transparencia) — Secretaria de Governo Digital; transparência centrada nas necessidades dos afetados por sistemas de IA; acesso em 18 jul. 2026.
- [Padrões de Qualidade para Serviços Públicos Digitais](https://www.gov.br/governodigital/pt-br/estrategias-e-governanca-digital/transformacao-digital/central-de-qualidade/padroes-de-qualidade/padroes-de-qualidade-para-servicos-publicos-digitais/) — Secretaria de Governo Digital; facilidade, comunicação, atendimento, experiência unificada, acessibilidade, privacidade e segurança e escuta ativa; acesso em 18 jul. 2026.
- [Recomendação sobre a Ética da Inteligência Artificial](https://unesdoc.unesco.org/ark:/48223/pf0000381137_por) — UNESCO; princípios e ações para governança ética da IA, adotada em 2021; acesso em 18 jul. 2026.
- [Recommendation of the Council on Artificial Intelligence](https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449) — OCDE; definição e princípios de IA, adotada em 2019 e atualizada em 2024; acesso em 18 jul. 2026.
- [Artificial Intelligence Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) — National Institute of Standards and Technology; AI RMF 1.0, publicado em jan. 2023; acesso em 18 jul. 2026.
- [Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) — National Institute of Standards and Technology; perfil de riscos da IA generativa, publicado em jul. 2024; acesso em 18 jul. 2026.
