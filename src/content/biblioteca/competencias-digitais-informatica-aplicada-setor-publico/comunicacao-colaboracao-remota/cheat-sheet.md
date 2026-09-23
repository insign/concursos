# Correio eletrônico, colaboração e trabalho remoto

## Mapa de escolha

**Objetivo → urgência → público → canal → visibilidade → permissão → registro → próxima ação.**

| Necessidade | Canal e cautela |
|---|---|
| comunicado formal ou externo | e-mail: enderece e revise destinatários |
| dúvida rápida | chat: resposta curta, público limitado |
| atualização recorrente | canal ou documento comum: contexto recuperável |
| decisão urgente entre pessoas | chamada ou reunião: registre depois decisão, responsável e prazo |

**Síncrono** exige interação simultânea; **assíncrono** permite resposta posterior, com prazo explícito. Presença online e confirmação de leitura não medem produtividade nem execução da tarefa.

## E-mail: público, ação e estado

Conta identifica o usuário; endereço (`nome@dominio`) identifica o destino; caixa postal guarda mensagens e estados; *webmail* é a interface no navegador; cliente de e-mail é outro aplicativo de acesso à mesma caixa, conforme configuração. Nenhum dos dois é protocolo de envio.

| Campo ou ação | Decisão |
|---|---|
| Para | quem deve agir ou responder |
| <abbr title="Cópia carbono">Cc</abbr> | ciência visível aos destinatários |
| <abbr title="Cópia carbono oculta">Cco</abbr> | endereço oculto aos demais na mensagem; destinatário pode se revelar se responder |
| <abbr title="Endereço preferencial para respostas">Reply-To</abbr> | muda para onde a resposta é dirigida, quando configurado |
| Responder / Responder a todos | remetente ou <abbr title="Endereço preferencial para respostas">Reply-To</abbr> / também destinatários visíveis de Para e <abbr title="Cópia carbono">Cc</abbr>; revise a lista |
| Encaminhar | cria envio a novo público; <abbr title="Cópia carbono oculta">Cco</abbr> não impede repasse do conteúdo |

**Rascunho** ainda está em composição; **Caixa de saída** pode conter envio pendente. **Arquivar** tira da Entrada sem excluir; **excluir** move à Lixeira ou remove conforme política. Busca localiza; regra/filtro automatiza ação; conversa (*thread*, encadeamento de mensagens) agrupa histórico, sem garantir que todas tiveram o mesmo público. Rótulos podem classificar a mesma mensagem em vários contextos.

Confira tamanho, versão, formato e público de anexos. Um link só funciona para a identidade autorizada no arquivo; assinatura textual no rodapé não é assinatura digital criptográfica. Assunto claro, contexto, ação e prazo reduzem respostas desnecessárias.

| Indício | Limite |
|---|---|
| entrega | não demonstra leitura |
| leitura | não demonstra compreensão ou concordância |
| resposta | não demonstra execução |

## Envio, caixa e conteúdo

| Mecanismo | Função e porta convencional |
|---|---|
| <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> | submissão/transferência, <abbr title="Transmission Control Protocol">TCP</abbr> 25 entre servidores e 587 para submissão; não sincroniza leitura da caixa |
| <abbr title="Internet Message Access Protocol">IMAP</abbr> | acesso e sincronização no servidor, <abbr title="Transmission Control Protocol">TCP</abbr> 143 ou 993 com proteção implícita |
| <abbr title="Post Office Protocol version 3">POP3</abbr> | recuperação por download, <abbr title="Transmission Control Protocol">TCP</abbr> 110 ou 995 protegido; permanência no servidor depende de configuração |
| <abbr title="Multipurpose Internet Mail Extensions">MIME</abbr> | estrutura conteúdos e anexos em múltiplas partes; não fornece criptografia por si |

Porta indica convenção, não disponibilidade efetiva. Convite de calendário registra intenção (**aceitar**, **talvez**, **recusar**, propor horário conforme serviço); não abre a reunião. Um link recebido não equivale a convite formal. Recorrência cria uma série cujas ocorrências podem ter ajustes próprios.

## Teams: a quem o conteúdo aparece?

| Espaço ou identidade | Escopo |
|---|---|
| equipe / canal | conjunto de pessoas e recursos / área temática; postagem pertence a um tópico, chat é conversa direta, em grupo ou da reunião |
| canal padrão / privado / compartilhado | membros da equipe / subconjunto / pessoas selecionadas, inclusive externas quando habilitado; equipe “pública” não significa Internet pública |
| acesso externo / convidado | conversar com outra organização sem entrar na equipe / ser adicionado à equipe e a recursos autorizados |
| canal compartilhado | acesso ao canal selecionado sem abrir automaticamente toda a equipe, conforme política entre organizações |

**Papéis de equipe**: proprietário, membro, convidado. **Papéis de reunião**: organizador, coorganizador, apresentador, participante. Ser proprietário de equipe não torna alguém organizador de toda reunião; capacidade depende de papel e política. Uma `@menção` pode chamar atenção, mas notificação desativada não apaga a mensagem; estado de presença não é prova de disponibilidade.

| Arquivo / artefato | Local típico |
|---|---|
| arquivo de chat | <abbr title="Armazenamento de arquivos associado ao usuário Microsoft">OneDrive</abbr> do remetente, compartilhado com participantes |
| arquivo de canal | <abbr title="Plataforma Microsoft de bibliotecas e sites para equipes">SharePoint</abbr> da equipe |
| gravação de reunião comum | <abbr title="Armazenamento de arquivos associado ao usuário Microsoft">OneDrive</abbr> do organizador, conforme política |
| gravação de reunião de canal | <abbr title="Plataforma Microsoft de bibliotecas e sites para equipes">SharePoint</abbr> do canal |

O link não substitui permissão; acesso externo para chat não libera arquivos de equipe. <abbr title="Armazenamento de arquivos associado ao usuário Microsoft">OneDrive</abbr> pode compartilhar, e <abbr title="Plataforma Microsoft de bibliotecas e sites para equipes">SharePoint</abbr> não é automaticamente público.

## Reunião: entrada, exposição, registro

O **lobby** é a sala virtual de espera: link válido pode exigir admissão; opções da reunião e políticas determinam quem entra e quem admite. O chat antes/depois varia com convite, identidade, tipo de reunião, política e momento de ingresso. Ter link não garante histórico permanente.

| Gesto ou recurso | Efeito que importa |
|---|---|
| levantar mão / reação | sinaliza intenção / manifestação visual; não ativa microfone nem registra voto |
| silenciar / remover | corta áudio / retira pessoa, conforme permissão |
| sair / encerrar | termina sua participação / termina a reunião para todos, se autorizado |
| conceder controle | permite interação com conteúdo compartilhado; não confere papel de coorganizador |
| apresentar tela / janela / guia | exposição ampla / aplicativo selecionado / conteúdo da guia; configure áudio compatível e evite notificações |
| gravação / transcrição / legenda / ata | audiovisual / texto das falas / texto durante a fala / decisão com responsável e prazo |

Disponibilidade e acesso à gravação, transcrição, resumo, tradução e salas dependem de licença, papel, conta e política; texto automático pede revisão. Um link de gravação exibido no chat não indica que o vídeo esteja armazenado nele.

## Google Meet e continuidade

No Meet, reunião pode ser imediata, criada como link para depois ou agendada no Google Agenda; o ingresso pode pedir admissão. No conjunto de ferramentas Google, Drive guarda arquivos e Documentos, Planilhas e Apresentações permitem colaboração em tempo real, conforme permissão. Apresentar **guia** limita o conteúdo e é boa opção para áudio da guia; **janela** limita a exposição ao aplicativo; **tela inteira** pode mostrar notificações. Áudio do sistema pode estar disponível também ao apresentar janela ou tela quando habilitado, conforme plataforma/configuração. Confirme o áudio antes de iniciar.

Microfone, câmera, chat, mão levantada, reações, controles de organizador, fundos, legendas, gravação e salas variam por edição, papel e política. Legenda durante a fala não é gravação nem transcrição persistente.

Para trabalho remoto, defina **resultado, responsável, prazo, critério de aceite, dependências, localização do arquivo e canal para impedimentos**. No repasse entre turnos, deixe concluído, pendente, bloqueio, próxima ação e prazo em local institucional. O <abbr title="Programa de Gestão e Desempenho">PGD</abbr> federal é regime específico e não se aplica automaticamente ao <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr>.
