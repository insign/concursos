---
schemaVersion: 1
title: "Correio eletrônico, colaboração e trabalho remoto"
description: Uso funcional de webmail e clientes de e-mail, Microsoft Teams, Google Meet, calendários e práticas de comunicação e colaboração no trabalho remoto.
order: 25
storageId: comunicacao-colaboracao-remota
---

## 1. Recorte do assunto e ambiente de referência

O edital inclui correio eletrônico, webmail, cliente de e-mail, Microsoft Teams, Google Meet e noções de trabalho remoto. O foco é reconhecer **canal, destinatário, visibilidade, papel, permissão, armazenamento, temporização e registro**.

Este assunto não substitui:

- redes e protocolos em profundidade;
- segurança da informação, phishing e malware;
- armazenamento em nuvem como assunto próprio;
- assinatura digital e certificação;
- LGPD e Marco Civil.

A referência funcional é a experiência atual das versões Web e desktop. Recursos do Teams e do Meet podem depender de licença, conta, navegador, sistema operacional, política administrativa, tipo de reunião e papel do usuário.

> **Roteiro de decisão:** objetivo → urgência → público → canal → visibilidade → papel/permissão → registro → próxima ação.

---

## 2. Comunicação síncrona e assíncrona

| Modalidade | Característica | Exemplos |
|---|---|---|
| síncrona | participantes interagem no mesmo período | reunião, chamada, chat em tempo real |
| assíncrona | cada pessoa responde no momento adequado | e-mail, postagem em canal, documento compartilhado |

Assíncrono não significa “sem prazo”. Síncrono não significa “sem registro”.

### 2.1 Escolha do canal

| Necessidade | Canal adequado, em regra |
|---|---|
| decisão urgente com dependências | reunião ou chamada curta |
| comunicado formal ou externo | e-mail |
| atualização recorrente de equipe | canal ou documento compartilhado |
| dúvida rápida entre poucas pessoas | chat |
| construção conjunta | arquivo compartilhado com comentários |
| decisão que precisa permanecer recuperável | registro no canal, ata, e-mail ou sistema oficial |

Antes de convocar reunião, pergunte se o objetivo pode ser atendido por uma mensagem estruturada. Depois de uma reunião, registre decisão, responsável e prazo.

---

## 3. Correio eletrônico: conta, caixa, webmail e cliente

| Termo | Significado |
|---|---|
| conta | identidade e credenciais de acesso ao serviço |
| endereço | identificador, como `nome@orgao.gov.br` |
| caixa postal | mensagens, pastas/rótulos e estados mantidos pelo serviço |
| webmail | interface Web acessada no navegador |
| cliente de e-mail | aplicativo instalado ou integrado ao sistema |

Webmail não é protocolo. Cliente instalado não significa armazenamento exclusivamente local. A mesma caixa pode ser acessada por várias interfaces, conforme a configuração.

### 3.1 Pastas, rótulos e estados

Recursos comuns:

- Entrada;
- Enviados;
- Rascunhos;
- Caixa de saída;
- Spam/Lixo eletrônico;
- Lixeira;
- Arquivo;
- pastas ou rótulos personalizados;
- lida/não lida;
- sinalizador, estrela ou prioridade.

**Arquivar** normalmente retira da Entrada sem excluir. **Excluir** move para a Lixeira ou remove conforme a política. Rótulos podem permitir várias classificações para a mesma mensagem; pastas tradicionais tendem a representar uma localização principal.

---

## 4. Composição da mensagem

### 4.1 Campos

| Campo | Função |
|---|---|
| `De` / From | remetente apresentado |
| `Para` / To | destinatários diretamente envolvidos |
| `Cc` | ciência visível |
| `Cco` / Bcc | cópia oculta aos demais destinatários |
| `Assunto` | síntese do tema |
| `Reply-To` | endereço preferencial para respostas, quando usado |

`Cco` protege a lista dos demais destinatários, mas não impede encaminhamento, captura de tela ou divulgação posterior do conteúdo.

### 4.2 Para, Cc e Cco

- use `Para` para quem deve agir ou responder;
- use `Cc` para ciência legítima;
- use `Cco` em envio coletivo quando os endereços não devem ser expostos;
- evite colocar grande público em `Para` ou `Cc` sem necessidade;
- revise destinatários antes de enviar informação sensível.

### 4.3 Responder, responder a todos e encaminhar

| Ação | Resultado |
|---|---|
| Responder | dirige a resposta ao remetente ou ao `Reply-To` |
| Responder a todos | inclui remetente e destinatários visíveis de `Para`/`Cc`, conforme o cliente |
| Encaminhar | cria envio para novos destinatários escolhidos |

Destinatários originalmente em `Cco` não devem ser revelados automaticamente. Quem recebeu por `Cco` pode se revelar ao responder ao grupo; por isso, deve revisar o campo de destinatários.

### 4.4 Anexos e links

Antes de enviar:

1. confira se o arquivo correto foi anexado;
2. verifique versão e nome do arquivo;
3. avalie tamanho e formato;
4. remova metadados ou conteúdo desnecessário;
5. confirme permissões quando usar link;
6. prefira sistema oficial para documentos que exigem tramitação ou controle.

Um link não concede acesso por si só. O destinatário precisa ter permissão no serviço correspondente.

### 4.5 MIME

MIME permite representar tipos de conteúdo, codificações e mensagens com múltiplas partes, inclusive anexos. MIME não garante criptografia, autenticidade ou confidencialidade.

---

## 5. Organização, busca e automação no e-mail

### 5.1 Busca

Critérios comuns:

- remetente;
- destinatário;
- assunto;
- palavras;
- data;
- existência de anexo;
- pasta/rótulo;
- estado lida/não lida.

Busca localiza mensagens; não altera necessariamente o conteúdo.

### 5.2 Filtros e regras

Regras podem:

- mover ou rotular;
- marcar prioridade;
- encaminhar, quando permitido;
- arquivar;
- sinalizar;
- notificar.

Regra mal configurada pode ocultar mensagens importantes ou encaminhar informação indevida. Revise critérios e exceções.

### 5.3 Conversas

A visualização por conversa agrupa mensagens relacionadas. O agrupamento pode variar entre provedores e não prova que todas as mensagens possuem exatamente o mesmo público.

---

## 6. Protocolos de correio eletrônico

| Protocolo | Função principal |
|---|---|
| SMTP | submissão e transferência de mensagens |
| IMAP | acesso e sincronização da caixa mantida no servidor |
| POP3 | recuperação por download, com comportamento remoto configurável |

Portas convencionais:

- SMTP entre servidores: TCP 25;
- submissão autenticada: TCP 587, frequentemente;
- IMAP: TCP 143; IMAPS: TCP 993;
- POP3: TCP 110; POP3S: TCP 995.

Porta convencional pode ser alterada. SMTP não é protocolo de leitura da caixa. POP3 não deve ser descrito como “sempre apaga do servidor”: isso depende do cliente e da configuração.

---

## 7. Entrega, leitura e resposta

| Evidência | O que pode indicar |
|---|---|
| confirmação de entrega | aceitação ou processamento em determinado estágio do sistema |
| confirmação de leitura | abertura sinalizada pelo cliente/usuário, se houver suporte e consentimento |
| resposta | produção efetiva de nova mensagem pelo destinatário |

Nenhuma dessas evidências prova, sozinha:

- compreensão;
- concordância;
- execução da tarefa;
- autenticidade absoluta do remetente;
- ausência de encaminhamento posterior.

---

## 8. Calendários, convites e recorrência

| Ação | Significado |
|---|---|
| aceitar | confirma intenção de participação |
| talvez/provisório | registra incerteza |
| recusar | informa indisponibilidade |
| propor novo horário | sugere alteração, quando disponível |
| encaminhar convite | envia a outra pessoa, sujeito a política |
| atualizar evento | comunica mudanças aos convidados |
| recorrência | cria série de eventos |

Aceitar convite não entra automaticamente na reunião. Receber o link não significa ter sido formalmente convidado. Uma ocorrência de série recorrente pode ser alterada sem modificar toda a série.

Boas práticas:

- informe objetivo e pauta;
- inclua documentos prévios;
- indique fuso horário quando necessário;
- convide somente quem contribui;
- registre decisões ao final.

---

## 9. Microsoft Teams: equipes, canais e chats

### 9.1 Estrutura

| Elemento | Uso |
|---|---|
| equipe | conjunto de pessoas, conteúdo e ferramentas |
| canal | espaço temático da equipe |
| postagem | conversa estruturada no canal |
| chat | conversa direta, em grupo ou de reunião |

Uma equipe pode ser privada ou detectável/aberta dentro da organização, conforme política. “Pública” nesse contexto não significa pública na Internet.

### 9.2 Tipos de canal

| Canal | Público principal |
|---|---|
| padrão | membros da equipe |
| privado | subconjunto de membros |
| compartilhado | pessoas selecionadas, inclusive externas à equipe/organização, conforme configuração |

Canal compartilhado não é acesso anônimo. Canal privado não é automaticamente invisível aos administradores do serviço.

### 9.3 Postagem e resposta

Responder no tópico preserva o contexto. Nova postagem deve ser usada para novo assunto. Uma resposta inserida como nova postagem fragmenta o histórico.

### 9.4 Papéis da equipe

- proprietário;
- membro;
- convidado.

Esses papéis não são os mesmos da reunião. Proprietário de equipe não se torna organizador de todas as reuniões da organização.

### 9.5 Menções, presença e notificações

- `@menção` chama atenção conforme permissões e configurações;
- presença é indicação operacional, não prova de produtividade ou localização;
- notificações alteram como o usuário é avisado, não apagam a mensagem;
- excesso de menções reduz relevância e pode interromper trabalho profundo.

---

## 10. Arquivos no Teams: OneDrive e SharePoint

| Situação | Local típico |
|---|---|
| arquivo enviado em chat | OneDrive do remetente, compartilhado com participantes |
| arquivo publicado em canal | biblioteca do SharePoint associada à equipe |
| gravação de reunião comum | OneDrive do responsável, conforme política |
| gravação de reunião de canal | SharePoint do canal |

Consequências:

- copiar link não elimina verificação de permissão;
- OneDrive não significa necessariamente “somente privado”;
- SharePoint não significa “público na Internet”;
- mover, excluir ou restringir o arquivo pode afetar o acesso no Teams;
- o chat pode mostrar o link de uma gravação, mas o vídeo fica no armazenamento associado.

---

## 11. Reuniões no Teams

### 11.1 Papéis

| Papel | Capacidades típicas |
|---|---|
| organizador | cria e administra a reunião |
| coorganizador | auxilia na administração, conforme recurso |
| apresentador | compartilha conteúdo e possui controles ampliados |
| participante | interage com controles mais restritos |

Política e tipo de reunião podem reduzir capacidades.

### 11.2 Controles básicos

| Controle | Efeito |
|---|---|
| microfone/câmera | ativa ou desativa o próprio áudio/vídeo |
| levantar a mão | sinaliza intenção de falar |
| reação | manifestação visual temporária |
| chat | abre mensagens da reunião |
| participantes | mostra pessoas e controles disponíveis |
| sair | encerra a participação individual |
| encerrar reunião | termina o encontro para todos, quando autorizado |
| silenciar participante | interrompe o áudio, sem remover a pessoa |
| remover participante | retira da reunião, conforme papel/política |
| conceder controle | permite interação com conteúdo compartilhado |

Levantar a mão não ativa o microfone. Reação não é voto formal. Conceder controle não torna a pessoa coorganizadora.

### 11.3 Compartilhamento

| Opção | Cuidado |
|---|---|
| tela inteira | pode expor notificações e outros aplicativos |
| janela | limita o conteúdo ao aplicativo escolhido |
| guia/aplicativo compatível | pode otimizar mídia e áudio |
| PowerPoint Live | oferece navegação e recursos próprios, conforme disponibilidade |

Antes de compartilhar, feche conteúdo sensível e desative notificações.

### 11.4 Chat da reunião

O acesso ao chat pode variar conforme:

- convite direto ou link encaminhado;
- pessoa interna, externa, convidada ou anônima;
- reunião comum, recorrente ou de canal;
- política administrativa;
- momento de ingresso e saída.

Alguns participantes acessam o chat antes e depois; outros apenas durante a reunião. Ter o link não cria automaticamente acesso permanente ao histórico.

### 11.5 Gravação, transcrição e resumo

| Recurso | Resultado |
|---|---|
| gravação | arquivo audiovisual |
| transcrição | representação textual das falas |
| legenda | texto exibido durante a fala |
| resumo/recap | artefatos posteriores, conforme licença |
| ata/síntese | registro organizacional de decisões, responsáveis e prazos |

Gravação não é transcrição. Legenda não é ata. Transcrição automática pode conter erros. Disponibilidade e acesso dependem de licença, política, papel e armazenamento.

---

## 12. Google Meet

### 12.1 Criar e ingressar

Uma reunião pode ser:

- iniciada imediatamente;
- criada com link para uso posterior;
- agendada pelo Google Agenda.

O ingresso pode depender de convite, conta, domínio, política, sala de espera e admissão. Link válido não garante entrada automática.

### 12.2 Apresentar conteúdo

| Opção | Característica |
|---|---|
| guia do navegador | adequada para conteúdo de uma guia e áudio compatível |
| janela | limita a exposição à janela selecionada |
| tela inteira | mostra área ampla e aumenta risco de exposição |

Feche notificações e documentos sensíveis. Compartilhar a janela errada pode revelar informação não destinada à reunião.

### 12.3 Controles e moderação

- microfone e câmera;
- chat;
- participantes;
- levantar a mão;
- reações;
- controles do organizador;
- remover ou silenciar, conforme papel;
- fixar participante ou apresentação na própria visualização;
- sair ou encerrar, conforme permissão.

Mão levantada sinaliza intenção de falar e não ativa o microfone. Reações não substituem chat ou registro de decisão.

### 12.4 Fundos e efeitos

É possível, conforme dispositivo e política:

- desfocar o fundo;
- substituir o fundo;
- usar efeitos visuais;
- ajustar antes ou durante a reunião.

Efeitos podem aumentar uso de processamento. Fundo virtual não elimina riscos de privacidade: áudio, reflexos, notificações ou pessoas ainda podem expor informação.

### 12.5 Legendas, tradução, gravação e salas temáticas

- legendas instantâneas podem ser ativadas pelo usuário;
- legenda não é gravação nem transcrição persistente;
- tradução depende de edição elegível;
- gravação depende de conta, papel e política;
- salas temáticas dependem de edição e moderação;
- artefatos devem ser revisados antes de uso oficial.

---

## 13. Teams e Meet: comparação funcional

| Necessidade | Teams | Meet |
|---|---|---|
| equipe e canais persistentes | recurso central | não é o foco principal |
| chat e reunião | sim | sim |
| arquivos de canal | SharePoint | normalmente Drive/Workspace |
| calendário | Teams/Outlook | Google Agenda |
| gravação | licença, papel e política | licença, papel e política |
| mão levantada e reações | sim, conforme configuração | sim, conforme configuração |
| salas temáticas | conforme licença/papel | conforme licença/papel |

Não escolha pela marca isoladamente. Considere identidade institucional, armazenamento, permissões, integração, suporte, acessibilidade e política.

---

## 14. Trabalho remoto e híbrido

### 14.1 Organização por entregas

Uma entrega bem definida contém:

- resultado esperado;
- responsável;
- prazo;
- critério de aceite;
- dependências;
- local do arquivo ou processo;
- forma de comunicar impedimentos.

Presença online não substitui gestão de resultados.

### 14.2 Continuidade entre turnos

Um bom repasse informa:

1. o que foi concluído;
2. o que permanece pendente;
3. onde está o material;
4. qual é o impedimento;
5. quem deve agir;
6. qual é o próximo prazo.

### 14.3 Rotinas

- pauta antes da reunião;
- horário de foco sem interrupções;
- atualização assíncrona periódica;
- registro de decisão;
- canal definido para urgências;
- documentos em local institucional;
- permissões revisadas;
- cuidado com ambiente, áudio e tela compartilhada.

### 14.4 PGD federal: nota de contexto

O Programa de Gestão e Desempenho federal enfatiza entregas e resultados e admite teletrabalho integral ou parcial conforme regras próprias. O Decreto nº 11.072/2022 não vincula automaticamente o TCE-MA. Em prova, diferencie noção geral de trabalho remoto de regime jurídico específico.

---

## 15. Casos resolvidos

### 15.1 Envio externo em massa

O órgão precisa enviar comunicado a cidadãos que não devem ver os endereços uns dos outros.

**Solução:** usar `Cco`, revisar o conteúdo e evitar lista em `Para`/`Cc`.

### 15.2 Link sem permissão

O participante recebeu o link do arquivo no Teams, mas vê “acesso negado”.

**Diagnóstico:** o link chegou, porém a permissão do OneDrive ou SharePoint não inclui aquela identidade.

### 15.3 Gravação de reunião de canal

A equipe procura a gravação no OneDrive do organizador.

**Diagnóstico:** verificar o SharePoint associado ao canal.

### 15.4 Chat após a reunião

Uma pessoa anônima entrou por link e perdeu o chat ao sair.

**Conclusão:** acesso depende da forma de ingresso, identidade, reunião e política; não é universal.

### 15.5 Sair versus encerrar

O organizador deseja deixar a reunião em andamento para os demais.

**Solução:** usar **Sair**, não **Encerrar reunião**.

### 15.6 Vídeo com áudio no Meet

O vídeo está em uma guia compatível do navegador.

**Solução:** apresentar a guia e confirmar a opção de áudio. Tela inteira aumenta exposição de notificações.

### 15.7 Continuidade assíncrona

Ao fim do turno, registrar entrega, pendência, arquivo, impedimento, responsável e prazo. Assim, outra pessoa retoma sem reunião imediata.

---

## 16. Pegadinhas de prova

- webmail não é protocolo;
- conta não é caixa nem interface;
- `Cc` não oculta destinatários;
- `Cco` não impede encaminhamento;
- Responder a todos não deve revelar destinatários ocultos;
- arquivar não é excluir;
- caixa de saída não é rascunho;
- assinatura textual não é assinatura digital;
- MIME não é criptografia;
- SMTP envia; IMAP e POP3 acessam;
- POP3 não apaga sempre do servidor;
- confirmação de leitura não prova compreensão;
- aceitar convite não entra na reunião;
- equipe não é canal;
- chat não é postagem de canal;
- equipe pública não é pública na Internet;
- canal compartilhado não é anônimo;
- papel de equipe não é papel de reunião;
- notificação não é mensagem;
- presença não prova disponibilidade real;
- arquivo de chat e arquivo de canal podem ter armazenamentos diferentes;
- link não é permissão;
- sair não é encerrar;
- silenciar não é remover;
- levantar a mão não ativa microfone;
- reação não é voto formal;
- conceder controle não torna coorganizador;
- gravação não é transcrição;
- legenda não é ata;
- guia, janela e tela inteira expõem áreas diferentes;
- assíncrono não significa sem prazo;
- PGD federal não se aplica automaticamente ao TCE-MA.

---

## 17. Método para resolver questões

1. Identifique o objetivo: informar, decidir, produzir, registrar ou atender.
2. Determine urgência e necessidade de simultaneidade.
3. Localize público e visibilidade: `Para`, `Cc`, `Cco`, equipe, canal ou chat.
4. Diferencie papel permanente de papel da reunião.
5. Confirme armazenamento e permissão do arquivo.
6. Separe link de autorização.
7. Em reunião, diferencie sair, encerrar, silenciar, remover e conceder controle.
8. Em conteúdo, diferencie gravação, transcrição, legenda e ata.
9. Em calendário, diferencie convite, resposta e ingresso.
10. Rejeite absolutos como “qualquer conta grava”, “link garante acesso” e “presença prova produtividade”.

## Referências

- CEBRASPE. [Edital nº 1 do concurso TCE-MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Item 2.4; publicado em 6 jul. 2026; acesso em 27 jul. 2026.
- MICROSOFT. [Visão geral de equipes e canais](https://support.microsoft.com/pt-br/office/vis%C3%A3o-geral-de-equipes-e-canais-c3d63c10-77d5-4204-a566-53ddcf723b46). Estrutura do Teams; acesso em 27 jul. 2026.
- MICROSOFT. [Papéis em uma reunião do Microsoft Teams](https://support.microsoft.com/pt-br/office/pap%C3%A9is-em-uma-reuni%C3%A3o-do-microsoft-teams-c16fa7d0-1666-4dde-8686-0a0bfe16e019). Organizador, coorganizador, apresentador e participante; acesso em 27 jul. 2026.
- MICROSOFT. [Levantar a mão em reuniões do Teams](https://support.microsoft.com/pt-br/office/levantar-a-m%C3%A3o-em-reuni%C3%B5es-do-microsoft-teams-bb2dd8e1-e6bd-43a6-85cf-30822667b372). Mão levantada e reações; acesso em 27 jul. 2026.
- MICROSOFT. [Acessar o chat de uma reunião](https://support.microsoft.com/pt-br/office/acessar-o-chat-de-reuni%C3%A3o-no-microsoft-teams-e2d47815-6918-4b79-9301-454d60a1e774). Ciclo de acesso; acesso em 27 jul. 2026.
- MICROSOFT. [Gravar uma reunião no Microsoft Teams](https://support.microsoft.com/pt-br/office/gravar-uma-reuni%C3%A3o-no-microsoft-teams-34dfbe7f-b07d-4a27-b4c6-de62f1348c24). Gravação e armazenamento; acesso em 27 jul. 2026.
- MICROSOFT. [Compartilhar arquivos no Microsoft Teams](https://support.microsoft.com/pt-br/office/compartilhar-arquivos-no-microsoft-teams-0c4d34ee-5dd8-46d5-ab35-0d227b5e6eb5). OneDrive, SharePoint e permissões; acesso em 27 jul. 2026.
- GOOGLE. [Controles de uma videochamada do Google Meet](https://support.google.com/meet/answer/10058482?hl=pt-BR). Apresentação, mão levantada, reações e efeitos; acesso em 27 jul. 2026.
- GOOGLE. [Apresentar durante uma videochamada](https://support.google.com/meet/answer/9302870?hl=pt-BR). Guia, janela, tela e áudio; acesso em 27 jul. 2026.
- GOOGLE. [Usar legendas em uma videochamada](https://support.google.com/meet/answer/9300310?hl=pt-BR). Legendas e disponibilidade; acesso em 27 jul. 2026.
- BRASIL. [Decreto nº 11.072, de 17 de maio de 2022](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/decreto/d11072.htm). Programa de Gestão e Desempenho federal; acesso em 27 jul. 2026.
- FGV. [Prova Câmara Municipal do Recife — Analista de Sistemas — Tipo 1](https://conhecimento.fgv.br/sites/default/files/concursos/recife_analista_de_sistemas_ansis_tipo_1.pdf). Questão 50 sobre SMTP; aplicada em 28 set. 2014; acesso em 27 jul. 2026.
- FGV. [Gabarito definitivo — Câmara Municipal do Recife 2014](https://conhecimento.fgv.br/sites/default/files/concursos/camararecife/recife_c_gabarito_definitivo.pdf). Gabarito da questão 50; acesso em 27 jul. 2026.
