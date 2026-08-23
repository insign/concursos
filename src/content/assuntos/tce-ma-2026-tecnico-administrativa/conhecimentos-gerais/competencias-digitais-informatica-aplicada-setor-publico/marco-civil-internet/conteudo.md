---
schemaVersion: 1
title: Marco Civil da Internet
description: Fundamentos, direitos dos usuários, neutralidade, registros, responsabilidade de provedores, atuação pública e atualizações regulamentares do Marco Civil da Internet.
order: 29
storageId: tec-marco-civil-internet
---

## 1. Recorte do assunto e três cortes temporais

A Lei nº 12.965/2014, conhecida como **Marco Civil da Internet (MCI)**, estabelece princípios, garantias, direitos e deveres para o uso da internet no Brasil e diretrizes para a atuação da União, dos Estados, do Distrito Federal e dos Municípios.

O edital do TCE-MA foi publicado em **6 de julho de 2026** e prevê:

- cobrança de alterações legislativas em vigor até a data de publicação do edital;
- consideração de jurisprudência dos tribunais superiores publicada até 30 dias antes da prova;
- cobrança de norma ainda não vigente apenas quando ela estiver explicitada nos objetos de avaliação.

Por isso, o estudo precisa separar três planos:

| Plano | Corte relevante |
|---|---|
| núcleo legislativo garantido pelo edital | legislação em vigor em 6/7/2026 |
| jurisprudência | decisões publicadas até 30 dias antes da prova |
| legislação atualmente vigente | situação jurídica depois de 20/7/2026 |

### 1.1 Núcleo diretamente alinhado ao edital

- Lei nº 12.965/2014;
- Decreto nº 8.771/2016 na redação vigente em 6/7/2026;
- interpretação vinculante do <abbr title="Supremo Tribunal Federal">STF</abbr> sobre o art. 19, observada a regra temporal de jurisprudência;
- neutralidade, direitos, registros, responsabilidade e atuação do poder público.

### 1.2 Atualização posterior ao edital

Os Decretos nº 12.975/2026 e nº 12.976/2026 foram publicados em 21/5/2026 e entraram em vigor **60 dias depois, em 20/7/2026**. Eles estão vigentes hoje, mas não integravam automaticamente o núcleo legislativo cobrável pela regra geral do edital em 6/7/2026.

> **Regra de prova:** identifique se o enunciado pede o texto do edital, a legislação atualmente vigente ou a jurisprudência aplicável.

O STF interpretou constitucionalmente o art. 19. O Decreto nº 12.975 regulamentou novos deveres e procedimentos. Nenhum deles reescreveu formalmente o texto literal da Lei nº 12.965/2014.

---

## 2. Fundamentos, princípios e objetivos

### 2.1 Fundamentos do art. 2º

A disciplina do uso da internet tem como fundamento central o **respeito à liberdade de expressão**. A lei acrescenta:

1. reconhecimento da escala mundial da rede;
2. direitos humanos, desenvolvimento da personalidade e exercício da cidadania em meios digitais;
3. pluralidade e diversidade;
4. abertura e colaboração;
5. livre iniciativa, livre concorrência e defesa do consumidor;
6. finalidade social da rede.

Liberdade de expressão não exclui privacidade, proteção de dados, responsabilidade ou direitos de terceiros.

### 2.2 Princípios do art. 3º

| Princípio | Sentido essencial |
|---|---|
| liberdade de expressão, comunicação e manifestação | proteção nos termos da Constituição |
| privacidade | tutela da intimidade e da vida privada |
| proteção de dados pessoais | observância da legislação de proteção de dados |
| neutralidade de rede | tratamento isonômico dos pacotes, com exceções estritas |
| estabilidade, segurança e funcionalidade | técnicas compatíveis com boas práticas |
| responsabilização conforme a atividade | regime ligado ao papel efetivamente desempenhado |
| natureza participativa | preservação da participação plural |
| liberdade dos modelos de negócio | admitida se compatível com os demais princípios |

O rol não é fechado: o MCI preserva outros princípios do ordenamento e de tratados internacionais aplicáveis.

### 2.3 Objetivos do art. 4º

- direito de acesso à internet a todos;
- acesso à informação, conhecimento, cultura e assuntos públicos;
- inovação e difusão de tecnologias e modelos;
- padrões tecnológicos abertos que favoreçam comunicação, acessibilidade e interoperabilidade.

---

## 3. Conceitos legais

| Conceito | Definição essencial |
|---|---|
| internet | sistema mundial de protocolos lógicos, público e irrestrito, que comunica dados entre terminais por diferentes redes |
| terminal | computador ou qualquer dispositivo conectado |
| endereço <abbr title="Internet Protocol">IP</abbr> | código atribuído ao terminal para identificação na rede |
| administrador de sistema autônomo | pessoa que administra blocos de IP e sistema autônomo de roteamento |
| conexão à internet | habilitação do terminal para enviar e receber pacotes |
| registro de conexão | início, término, duração e IP usado |
| aplicação de internet | funcionalidade acessível por terminal conectado |
| registro de acesso a aplicação | data e hora de uso da aplicação a partir de determinado IP |

### 3.1 Distinções

- conexão habilita o terminal; aplicação oferece funcionalidade;
- registro é metadado, não conteúdo da comunicação;
- registro de conexão não é registro de aplicação;
- terminal inclui celular, tablet, computador, equipamento conectado e outros dispositivos.

### 3.2 Porta lógica de origem — atualização vigente desde 20/7/2026

O art. 15-A do Decreto nº 8.771/2016, incluído pelo Decreto nº 12.975/2026, determina que a guarda de IP abranja a **porta lógica de origem** sempre que ela for necessária à identificação inequívoca do terminal de origem ou do próximo enlace.

- o dever independe de requisição prévia;
- recai autonomamente sobre cada provedor;
- o fornecimento continua submetido aos arts. 10 e 22 do MCI;
- guardar não significa poder entregar sem ordem judicial.

Exemplo em rede com <abbr title="Carrier-Grade NAT">CGNAT</abbr>:

```text
IP público: 203.0.113.20
Usuário A: porta 41001
Usuário B: porta 41002
Usuário C: porta 41003
```

IP e horário podem ser insuficientes; a porta pode distinguir conexões simultâneas.

---

## 4. Direitos e garantias dos usuários

O art. 7º afirma que o acesso à internet é **essencial ao exercício da cidadania**. Isso não equivale a direito irrestrito a qualquer plano gratuito.

O usuário tem direito, entre outros, a:

1. inviolabilidade da intimidade e vida privada, com indenização por violação;
2. sigilo do fluxo das comunicações, salvo ordem judicial na forma da lei;
3. sigilo das comunicações privadas armazenadas, salvo ordem judicial;
4. não suspensão da conexão, salvo débito da própria utilização;
5. manutenção da qualidade contratada;
6. contratos claros sobre proteção de registros e gerenciamento da rede;
7. não fornecimento de dados e registros, salvo consentimento qualificado ou hipótese legal;
8. informação clara sobre coleta, uso, armazenamento, tratamento e proteção;
9. consentimento expresso e destacado quando ele for exigido;
10. exclusão dos dados fornecidos ao término da relação, ressalvadas guardas legais;
11. políticas de uso claras;
12. acessibilidade;
13. aplicação do <abbr title="Código de Defesa do Consumidor">CDC</abbr> nas relações de consumo.

### 4.1 Privacidade, foro e normas complementares

São nulas cláusulas que violem a privacidade e a liberdade de expressão, inclusive, em contrato de adesão para serviço prestado no Brasil, cláusula que não ofereça alternativa de foro brasileiro.

O MCI, a <abbr title="Lei Geral de Proteção de Dados Pessoais">LGPD</abbr> e o CDC são complementares:

- MCI: internet, registros, comunicações e provedores;
- LGPD: regime geral de tratamento de dados;
- CDC: relações de consumo.

Consentimento não é a única hipótese que permite tratamento de dados.

---

## 5. Neutralidade de rede

### 5.1 Regra geral

Quem transmite, comuta ou roteia deve tratar isonomicamente os pacotes, sem distinção por:

- conteúdo;
- origem ou destino;
- serviço;
- terminal;
- aplicação.

### 5.2 Exceções

Discriminação ou degradação somente pode decorrer de:

1. requisito técnico indispensável à prestação adequada;
2. priorização de serviço de emergência.

Ao aplicar a exceção, o responsável deve:

- abster-se de causar dano;
- agir com proporcionalidade, transparência e isonomia;
- informar previamente as práticas;
- oferecer condições comerciais não discriminatórias;
- evitar conduta anticoncorrencial.

### 5.3 Exemplos regulamentares

Requisitos técnicos podem envolver:

- restrição a spam;
- controle de ataque de negação de serviço;
- congestionamento excepcional;
- rota alternativa após interrupção.

Serviço de emergência pode abranger comunicação entre prestadores ou alertas à população em desastre, emergência ou calamidade. A transmissão desses dados é gratuita.

São vedados:

- priorização por acordo comercial;
- favorecimento de aplicação própria ou do grupo;
- comprometimento da internet pública e irrestrita.

---

## 6. Registros, dados e comunicações privadas

| Informação | Via de disponibilização |
|---|---|
| registros de conexão e de aplicação | ordem judicial, na forma do MCI |
| conteúdo de comunicação privada | ordem judicial, conforme a legislação |
| qualificação pessoal, filiação e endereço | autoridade administrativa com competência legal, na forma da lei |

### 6.1 Pedido administrativo de dados cadastrais

O pedido deve:

- indicar competência legal expressa;
- ser motivado;
- individualizar as pessoas;
- especificar os dados pretendidos.

Pedido coletivo genérico é vedado. Qualificação pessoal compreende nome, prenome, estado civil e profissão. Se o provedor não coleta o dado, informa essa circunstância.

### 6.2 Aplicação territorial

A legislação brasileira deve ser observada quando ao menos uma operação de coleta, armazenamento, guarda ou tratamento ocorrer no Brasil.

Também alcança, nas condições legais:

- dado coletado no Brasil;
- comunicação com ao menos um terminal no país;
- empresa estrangeira que ofereça serviço ao público brasileiro;
- grupo econômico com estabelecimento no Brasil.

### 6.3 Sanções dos arts. 10 e 11

Podem ser aplicadas, isolada ou cumulativamente:

- advertência;
- multa de até 10% do faturamento do grupo econômico no Brasil, excluídos tributos;
- suspensão temporária das atividades relacionadas;
- proibição dessas atividades.

---

## 7. Guarda de registros e preservação

### 7.1 Prazos

| Situação | Regra |
|---|---|
| administrador de sistema autônomo: registro de conexão | guarda por 1 ano |
| provedor de conexão: registro de acesso a aplicação | guarda vedada |
| provedor de aplicação organizado, profissional e econômico: próprios registros | guarda por 6 meses |
| outro provedor de aplicação | ordem judicial pode impor guarda específica por tempo certo |

A responsabilidade pela guarda de registros de conexão não pode ser transferida a terceiros.

### 7.2 Preservação cautelar não é acesso

```text
Pedido cautelar de preservação
          ↓
Provedor impede o descarte
          ↓
Autoridade judicializa em até 60 dias
          ↓
Juiz analisa indícios, utilidade e período
          ↓
Somente com ordem ocorre a disponibilização
```

Autoridade policial ou administrativa ou Ministério Público pode pedir preservação. A medida:

- não entrega os dados;
- permanece sigilosa;
- perde eficácia sem pedido judicial no prazo ou diante de indeferimento.

### 7.3 Limites e segurança

Na provisão de aplicações, é vedado guardar:

- acesso a outras aplicações sem consentimento, respeitada a legislação;
- dados excessivos em relação à finalidade.

Medidas de segurança incluem:

- controle estrito de acesso;
- autenticação;
- inventário de acessos;
- identificação do responsável;
- criptografia ou proteção equivalente;
- formato estruturado e interoperável;
- retenção da menor quantidade possível.

---

## 8. Responsabilidade por conteúdo de terceiros — texto da lei

Esta matéria exige separar **texto literal**, **exceção legal**, **tese do STF** e **regulamentação atual**.

### 8.1 Art. 18 — provedor de conexão

O provedor de conexão não responde civilmente por dano decorrente de conteúdo gerado por terceiro.

### 8.2 Art. 19 — literalidade

O texto prevê responsabilidade do provedor de aplicações se, após **ordem judicial específica**, ele não tornar indisponível o conteúdo indicado, nos limites técnicos e no prazo assinalado.

A ordem deve identificar o conteúdo clara e especificamente, sob pena de nulidade.

### 8.3 Art. 20 — comunicação ao autor

Se possuir contato do responsável, o provedor comunica os motivos e informações sobre a indisponibilização, salvo exceção legal ou decisão judicial fundamentada.

### 8.4 Art. 21 — nudez ou ato sexual privado

Na divulgação não autorizada de imagens, vídeos ou materiais com nudez ou atos sexuais privados, o provedor que hospeda conteúdo de terceiros responde subsidiariamente se, após notificação específica do participante ou representante, deixar de agir diligentemente.

A notificação deve identificar o material e demonstrar legitimidade. A literalidade não exige ordem judicial prévia para esse dever.

---

## 9. Tese vinculante do STF sobre o art. 19

O STF reconheceu inconstitucionalidade parcial e progressiva do art. 19 e fixou interpretação aplicável até nova lei. A tese não apagou o texto legal nem criou responsabilidade objetiva.

### 9.1 Regime geral

Fora das exceções, o provedor de aplicações pode responder quando:

- recebe notificação clara e individualizada;
- realiza ou deveria realizar análise com diligência qualificada;
- mantém conteúdo ilícito sem justificativa adequada.

Dúvida razoável sobre a ilicitude, após análise diligente, pode afastar responsabilidade.

### 9.2 Casos que permanecem no art. 19

- crimes e ilícitos civis contra a honra;
- e-mail interpessoal;
- reunião fechada por vídeo ou voz;
- mensageria privada interpessoal;
- outros provedores sem interferência no fluxo informacional.

A plataforma pode remover voluntariamente após notificação, mas a responsabilização por honra permanece ligada à ordem judicial específica.

### 9.3 Réplicas idênticas

Depois de decisão judicial reconhecer o fato ofensivo, cópias idênticas devem ser removidas após notificação judicial ou extrajudicial, sem nova decisão para cada réplica.

### 9.4 Anúncio pago e disseminação artificial

Há presunção relativa de culpa quando conteúdo ilícito envolve:

- anúncio ou impulsionamento pago;
- disseminação artificial inorgânica.

O provedor pode afastá-la demonstrando diligência e retirada em tempo razoável.

### 9.5 Falha sistêmica

O provedor responde quando não adota medidas adequadas diante da circulação massiva de categorias graves, como:

- atos antidemocráticos;
- terrorismo;
- induzimento a suicídio ou automutilação;
- discriminação;
- crimes contra mulheres;
- crimes sexuais e graves contra crianças e adolescentes;
- tráfico de pessoas.

Conteúdo isolado não prova, sozinho, falha sistêmica. O caso individual continua sujeito ao regime correspondente.

### 9.6 Outros pontos

- marketplace responde conforme o CDC;
- provedores devem manter autorregulação, canais e transparência;
- deve haver sede e representante no Brasil;
- os efeitos da tese são, em regra, desde 5/8/2025;
- decisões transitadas em julgado foram preservadas.

### 9.7 Matriz

| Situação | Regime central |
|---|---|
| conexão transportou conteúdo | art. 18 |
| ilícito geral em aplicação | notificação + análise diligente |
| ilícito contra a honra | art. 19 |
| nudez/ato sexual privado | art. 21 |
| réplica idêntica de ofensa reconhecida | notificação, sem nova ordem para cada cópia |
| anúncio pago/artificial | presunção relativa |
| circulação massiva do rol grave | falha sistêmica |
| ocorrência grave isolada | regime individual |
| comunicação privada | art. 19 |
| marketplace | CDC |

---

## 10. Requisição judicial de registros

O pedido judicial, em processo cível ou penal, incidental ou autônomo, deve conter:

1. fundados indícios da ocorrência do ilícito;
2. justificativa da utilidade dos registros;
3. período a que se referem.

O juiz protege sigilo, intimidade, vida privada, honra e imagem e pode decretar segredo de justiça.

O requerente não precisa conhecer previamente a identidade que procura descobrir, mas o pedido deve ser determinado, útil e temporalmente delimitado.

---

## 11. Atuação do poder público

### 11.1 Diretrizes

- governança multiparticipativa, transparente, colaborativa e democrática;
- racionalização da gestão com participação do <abbr title="Comitê Gestor da Internet no Brasil">CGI.br</abbr>;
- interoperabilidade entre Poderes, entes, sistemas e terminais;
- preferência por tecnologias, padrões e formatos abertos;
- dados públicos abertos e estruturados;
- capacitação, cultura e cidadania;
- inclusão digital;
- serviços integrados, eficientes, simples, multicanais e remotos.

Preferência por padrão aberto não proíbe absolutamente toda solução proprietária.

### 11.2 Aplicações públicas

Devem buscar:

- compatibilidade com diferentes terminais e sistemas;
- acessibilidade;
- leitura humana e tratamento automatizado;
- facilidade de uso;
- fortalecimento da participação social.

---

## 12. Decreto nº 12.975/2026 — atualização vigente desde 20/7/2026

> **Atenção:** esta seção descreve legislação atual posterior à data de publicação do edital.

### 12.1 Deveres gerais

Provedores de aplicações devem, conforme o âmbito de incidência:

- manter sede e representante legal pessoa jurídica no Brasil;
- manter canal permanente e acessível de denúncia;
- impedir redes artificiais de distribuição de conteúdo ilícito;
- adotar medidas de segurança e transparência;
- informar regras de moderação, reclamações, riscos, perfilamento, publicidade e impulsionamento.

### 12.2 Gestão de riscos e falha sistêmica

Provedores que intermedeiam conteúdo de terceiros devem monitorar, identificar, avaliar e gerir riscos sistêmicos.

Falha sistêmica pressupõe ausência de medidas adequadas de prevenção ou remoção diante da circulação massiva das categorias graves. Conteúdo isolado não basta.

### 12.3 Notificação, decisão e contestação

A notificação deve conter, sob pena de nulidade:

1. elementos da possível conduta criminosa ou ilícita;
2. identificação específica do conteúdo;
3. identificação do notificante e, quando cabível, fundamento de legitimidade.

Fluxo:

```text
Notificação válida
      ↓
Confirmação de recebimento
      ↓
Análise diligente e contextual
      ↓
Remoção ou manutenção fundamentada
      ↓
Comunicação às partes
      ↓
Contestação
      ↓
Reconsideração fundamentada
```

A análise deve considerar contexto, informação, educação, crítica, sátira, paródia e liberdade religiosa. Dúvida razoável pode justificar manutenção.

O provedor deve coibir abuso do sistema de notificações.

### 12.4 Crimes contra a honra e serviços privados

Permanecem sujeitos a ordem judicial específica:

- crimes e ilícitos contra a honra;
- serviços excluídos pelo art. 16-O.

Os deveres dos arts. 16-B a 16-J não se aplicam:

- ao e-mail interpessoal;
- à mensageria quanto a comunicações privadas entre usuários ou grupos determinados, sem difusão pública;
- a reuniões e chamadas em ambiente restrito.

Grupo ou canal aberto não deve ser equiparado automaticamente a comunicação privada.

### 12.5 Anúncios e impulsionamentos

- provedores devem impedir contratação de anúncio criminoso ou ilícito;
- conteúdo pago ou artificialmente distribuído gera presunção relativa;
- diligência e retirada tempestiva podem afastar responsabilidade;
- dados de cada anúncio, impulsionamento e anunciante devem ser guardados por **1 ano** após o fim da veiculação;
- publicidade enganosa, abusiva ou fraudulenta deve ser indisponibilizada após notificação legitimada.

### 12.6 <abbr title="Agência Nacional de Proteção de Dados">ANPD</abbr>

A ANPD regula, fiscaliza e apura infrações quanto aos direitos dos usuários e aos deveres sistêmicos.

Sua atuação é **sistêmica**:

- mecanismos;
- processos;
- governança;
- gestão de riscos;
- canais;
- transparência;
- tratamento de denúncias.

A ANPD não atua como julgadora administrativa de cada postagem isolada.

---

## 13. Decreto nº 12.976/2026 — proteção das mulheres no ambiente digital

> **Atenção:** atualização posterior ao edital, vigente desde 20/7/2026.

### 13.1 Conteúdo íntimo

Conteúdo íntimo inclui imagem, vídeo, áudio, texto ou combinação que exponha nudez, seminudez, ato sexual ou contexto sexualizante, inclusive material produzido ou manipulado por <abbr title="inteligência artificial">IA</abbr>.

### 13.2 Prazos

| Situação | Regra transitória atual |
|---|---|
| conteúdo íntimo não autorizado | indisponibilização em até 2 horas |
| conteúdo manifestamente ilegal contra mulher | remover ou comunicar fundamento da manutenção em até 6 horas |
| demais casos de violência digital contra mulher | remover ou comunicar fundamento da manutenção em até 24 horas |
| contestação | decidir e comunicar em até 24 horas |

A notificação do conteúdo íntimo deve ser feita pela vítima ou representante legitimado e identificar o material.

O conteúdo deve ser indisponibilizado em toda a aplicação e marcado digitalmente para bloquear reenvio automático, conforme regulamentação.

### 13.3 Ataques coordenados e IA

- ataques coordenados contra mulheres exigem redução tempestiva de alcance e visibilidade, inclusive de ofício;
- há prioridade em violência política e contra mulheres com exposição pública;
- é vedada a geração ou modificação de conteúdo íntimo de terceiro por IA;
- aplicações de IA devem implementar salvaguardas proporcionais para identificar e bloquear pedidos vedados.

### 13.4 Art. 21 e decreto

O Decreto nº 12.976 não substitui o art. 21. Ele cria regime específico e mais detalhado no âmbito da proteção de mulheres, com prazos, canais, reenvio e IA.

---

## 14. Competências fiscalizatórias

| Órgão | Foco |
|---|---|
| <abbr title="Agência Nacional de Telecomunicações">Anatel</abbr> | telecomunicações e requisitos técnicos de neutralidade |
| <abbr title="Secretaria Nacional do Consumidor">Senacon</abbr>/<abbr title="Sistema Nacional de Defesa do Consumidor">SNDC</abbr> | consumo e publicidade |
| <abbr title="Conselho Administrativo de Defesa Econômica">Cade</abbr>/<abbr title="Sistema Brasileiro de Defesa da Concorrência">SBDC</abbr> | concorrência |
| ANPD | direitos dos usuários e deveres sistêmicos |
| Judiciário | acesso, indisponibilização e reparação |
| autoridades investigativas | preservação, investigação e pedidos judiciais |

Não atribua todo o ecossistema a um único órgão.

---

## 15. Casos aplicados

### 15.1 Congestionamento excepcional

Operadora redireciona temporariamente pacotes por rota alternativa após rompimento, informa usuários e preserva isonomia. A medida pode ser requisito técnico. Priorizar permanentemente uma plataforma parceira por pagamento é diferente.

### 15.2 IP compartilhado

Milhares de clientes usam o mesmo <abbr title="Internet Protocol version 4">IPv4</abbr> público por CGNAT. O IP e o horário podem ser insuficientes; a porta lógica de origem pode ser necessária. O acesso aos dados continua judicial.

### 15.3 Pedido administrativo

Autoridade com competência legal pede nome, filiação e endereço de pessoa individualizada e motiva o pedido. Pode receber os dados cadastrais, não o histórico de conexões ou conteúdo por essa via.

### 15.4 Preservação

O Ministério Público pede preservação de registros sobre fato delimitado. O provedor impede descarte, mas a entrega depende de ordem judicial.

### 15.5 Denúncia genérica

“Há publicações ilegais nesta rede” não identifica conteúdo, conduta nem notificante. A notificação pode ser nula.

### 15.6 Manutenção fundamentada

A plataforma identifica dúvida razoável diante de possível sátira, fundamenta a manutenção e oferece contestação. Manter não gera automaticamente responsabilidade.

### 15.7 Postagem contra a honra

A rede recebe notificação de difamação. Pode remover voluntariamente, mas a responsabilização civil permanece no regime do art. 19.

### 15.8 Imagem íntima

Participante identifica vídeo íntimo não autorizado. O art. 21 exige atuação diligente. No âmbito atual do Decreto nº 12.976, conteúdo íntimo contra mulher possui prazo de até duas horas.

### 15.9 Anúncio fraudulento

Golpe de falso benefício público é impulsionado. Incidem dever preventivo, presunção relativa e guarda dos dados do anúncio e anunciante por um ano.

### 15.10 Portal público inacessível

Serviço público funciona em um único navegador e não pode ser usado por leitor de tela. Contraria compatibilidade, acessibilidade e facilidade de uso.

---

## 16. Pegadinhas

- fundamento, princípio e objetivo são listas diferentes;
- acesso essencial à cidadania não significa todo plano gratuito;
- neutralidade não proíbe todo gerenciamento;
- acordo comercial não autoriza prioridade;
- conexão não é aplicação;
- registro não é conteúdo;
- porta lógica é metadado e não dispensa ordem judicial de acesso;
- dado cadastral não é registro nem conteúdo;
- pedido de preservação não entrega dados;
- conexão: 1 ano;
- aplicação obrigada: 6 meses;
- provedor de conexão não guarda acesso a aplicações;
- art. 18 protege o provedor de conexão;
- literalidade do art. 19 não é o regime completo após o STF;
- STF não criou responsabilidade objetiva;
- honra permanece no art. 19;
- art. 21 não trata de qualquer ofensa;
- conteúdo isolado não prova falha sistêmica;
- anúncio pago pode gerar presunção sem notificação;
- notificação genérica pode ser nula;
- notificação válida não impõe remoção automática quando houver dúvida razoável;
- ANPD fiscaliza sistemicamente, não cada postagem;
- comunicação privada não é canal aberto;
- padrão aberto é preferência, não exclusividade absoluta;
- Decretos nº 12.975 e nº 12.976 estão vigentes hoje, mas entraram em vigor depois do edital;
- prazo de 2 horas refere-se ao regime específico de conteúdo íntimo contra mulher.

---

## 17. Método para resolver questões

1. Identifique o corte temporal pedido.
2. Separe fundamento, princípio, objetivo e conceito.
3. Classifique conexão, aplicação, registro, cadastro e conteúdo.
4. Em neutralidade, procure isonomia e exceção estrita.
5. Diferencie guarda, preservação e disponibilização.
6. Identifique o tipo de provedor.
7. Separe literalidade da lei, tese do STF e decreto atual.
8. Classifique o conteúdo: honra, íntimo, pago, grave massivo ou ilícito geral.
9. Verifique notificação, ordem judicial, diligência e contestação.
10. Em poder público, avalie interoperabilidade, acessibilidade e padrões abertos.
11. Rejeite absolutos como “todo”, “nunca”, “automaticamente” e “sem ordem em qualquer caso”.
