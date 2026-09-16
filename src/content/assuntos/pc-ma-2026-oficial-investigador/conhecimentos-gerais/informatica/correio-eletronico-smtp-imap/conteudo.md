---
schemaVersion: 1
title: "Correio eletrônico: SMTP, IMAP, mensagens e anexos"
description: "Uso de correio eletrônico, funções de SMTP e IMAP, preparo e envio de mensagens, campos de destinatários e anexação de arquivos."
order: 25
storageId: pc-u025
---

# Correio eletrônico: envio, acesso e anexos

Imagine a sequência: você redige uma mensagem, anexa um relatório, clica em **Enviar** e depois abre a mesma caixa em outro dispositivo. Para a prova, não trate tudo isso como “o e-mail”. Há **funções diferentes** no caminho:

1. a interface — webmail ou cliente — permite preparar a mensagem;
2. a mensagem organiza remetente, destinatários, assunto, corpo e anexos;
3. o **<abbr title="Simple Mail Transfer Protocol">SMTP</abbr>** cuida da submissão e da transferência para envio;
4. o **<abbr title="Internet Message Access Protocol">IMAP</abbr>** permite acessar, manipular e ressincronizar a caixa mantida no servidor.

O núcleo do assunto é simples: **<abbr title="Simple Mail Transfer Protocol">SMTP</abbr> envia; <abbr title="Internet Message Access Protocol">IMAP</abbr> acessa e sincroniza.** A banca costuma inverter exatamente essas funções.

## 1. Interface, conta e protocolo não são a mesma coisa

Uma conta de correio reúne identidade e credenciais. O endereço identifica a caixa para troca de mensagens. A **caixa postal** guarda mensagens e estados no serviço. Já a interface pode ser:

- **webmail:** acesso pelo navegador;
- **cliente de e-mail:** aplicativo dedicado ou integrado ao sistema.

A interface não é o protocolo. Um webmail não “é <abbr title="Simple Mail Transfer Protocol">SMTP</abbr>” nem “é <abbr title="Internet Message Access Protocol">IMAP</abbr>”. O serviço pode usar protocolos e mecanismos de rede nos bastidores enquanto o usuário opera por uma tela gráfica.

Da mesma forma, um cliente instalado não implica que toda a caixa exista apenas no computador. Quando configurado com <abbr title="Internet Message Access Protocol">IMAP</abbr>, o cliente trabalha com a caixa mantida no servidor e pode ressincronizar estados entre dispositivos.

## 2. O fluxo completo: preparar → enviar → entregar → acessar

Considere uma mensagem hipotética de Ana para Bruno.

### Etapa 1 — preparar

Ana escolhe destinatários, escreve o assunto e o corpo e, se necessário, anexa arquivos. Enquanto a mensagem ainda não foi enviada, ela pode permanecer como **rascunho**.

### Etapa 2 — submeter para envio

Ao clicar em Enviar, o cliente entrega a mensagem ao serviço de submissão. A função é da família do **<abbr title="Simple Mail Transfer Protocol">SMTP</abbr>**. A porta convencional para submissão é <abbr title="Transmission Control Protocol">TCP</abbr> 587.

### Etapa 3 — transferir entre servidores

Os servidores de correio transferem a mensagem até o domínio responsável pela caixa de Bruno. A porta convencional associada à transferência <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> entre servidores é <abbr title="Transmission Control Protocol">TCP</abbr> 25.

### Etapa 4 — acessar a caixa

Bruno abre sua caixa no celular e depois no computador. Com **<abbr title="Internet Message Access Protocol">IMAP</abbr>**, o cliente pode acessar mensagens no servidor, consultar pastas, alterar estados e ressincronizar a caixa. As portas convencionais são <abbr title="Transmission Control Protocol">TCP</abbr> 143 e, para <abbr title="Internet Message Access Protocol">IMAP</abbr> sobre <abbr title="Transport Layer Security">TLS</abbr> implícito, <abbr title="Transmission Control Protocol">TCP</abbr> 993.

O ponto de prova não é decorar o percurso físico de cada provedor. É reconhecer a separação funcional:

| Pergunta | Mecanismo principal |
| --- | --- |
| Como a mensagem sai do cliente e é transferida para entrega? | <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> |
| Como o usuário consulta e sincroniza a caixa no servidor? | <abbr title="Internet Message Access Protocol">IMAP</abbr> |
| Como anexos e diferentes tipos de conteúdo são representados na mensagem? | <abbr title="Multipurpose Internet Mail Extensions">MIME</abbr> |

## 3. <abbr title="Simple Mail Transfer Protocol">SMTP</abbr>: envio, não leitura da caixa

O **<abbr title="Simple Mail Transfer Protocol">SMTP</abbr>** é o protocolo básico de transporte de correio eletrônico na Internet. Ele aparece em duas situações que a prova pode aproximar:

- **submissão da mensagem:** cliente → serviço de envio; porta convencional <abbr title="Transmission Control Protocol">TCP</abbr> 587;
- **transferência da mensagem:** servidor → servidor; porta convencional <abbr title="Transmission Control Protocol">TCP</abbr> 25.

Porta é convenção de serviço, não propriedade imutável de qualquer instalação. Ainda assim, 25 e 587 são associações clássicas de prova.

> **Pegadinha:** <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> não é o protocolo usado para manter a caixa sincronizada entre celular e computador. Essa função é do <abbr title="Internet Message Access Protocol">IMAP</abbr>.

Também não conclua que uma mensagem vista em “Enviados” já foi lida pelo destinatário. O ato de submeter uma mensagem, a aceitação por um servidor, a entrega à caixa e a leitura pelo destinatário são eventos diferentes.

## 4. <abbr title="Internet Message Access Protocol">IMAP</abbr>: a caixa permanece no servidor

O **<abbr title="Internet Message Access Protocol">IMAP</abbr>** foi projetado para o cliente acessar e manipular mensagens mantidas no servidor. Ele permite, entre outras operações, consultar caixas/pastas, pesquisar mensagens, obter partes do conteúdo e alterar marcadores de estado.

Isso favorece o uso da mesma caixa em vários dispositivos: uma alteração feita em um cliente pode ser ressincronizada com o servidor e refletida nos demais clientes, conforme implementação e configuração.

A diferença mais útil para prova é:

- **<abbr title="Internet Message Access Protocol">IMAP</abbr>:** acesso e sincronização da caixa no servidor;
- **<abbr title="Post Office Protocol version 3">POP3</abbr>:** recuperação orientada a download, usada aqui apenas como contraste.

Não memorize a frase errada “<abbr title="Post Office Protocol version 3">POP3</abbr> sempre apaga do servidor”. O comportamento de remoção pode depender de configuração e implementação. Para U025, basta usar esse contraste para não confundir <abbr title="Internet Message Access Protocol">IMAP</abbr> com um protocolo de envio.

## 5. Preparar a mensagem: quem vê quem?

Os campos de destinatários têm funções distintas:

| Campo | Papel |
| --- | --- |
| Para | destinatários diretamente envolvidos |
| <abbr title="Cópia carbono">Cc</abbr> | destinatários em cópia, visíveis aos demais |
| <abbr title="Cópia carbono oculta">Cco</abbr> / <abbr title="Blind carbon copy">Bcc</abbr> | destinatários ocultos dos demais destinatários |
| Assunto | síntese do tema |

A armadilha clássica troca <abbr title="Cópia carbono">Cc</abbr> e <abbr title="Cópia carbono oculta">Cco</abbr>:

- em **<abbr title="Cópia carbono">Cc</abbr>**, os endereços da cópia ficam visíveis;
- em **<abbr title="Cópia carbono oculta">Cco</abbr>**, os demais destinatários não veem quem foi incluído nesse campo.

**<abbr title="Cópia carbono oculta">Cco</abbr> não torna o conteúdo secreto.** Quem recebeu a mensagem ainda pode encaminhá-la, copiá-la ou divulgá-la. O recurso apenas oculta a lista de destinatários inseridos naquele campo dentro da mensagem distribuída.

### Responder, responder a todos e encaminhar

- **Responder:** cria resposta dirigida ao remetente ou ao endereço preferencial de resposta, quando informado;
- **Responder a todos:** inclui o remetente e os destinatários visíveis relacionados, conforme o cliente;
- **Encaminhar:** cria novo envio para destinatários escolhidos pelo usuário.

Revise os destinatários antes de enviar. Uma mensagem correta para a pessoa errada continua sendo um erro de comunicação.

## 6. Anexos: arquivo anexado não é link

Quando um arquivo é anexado, ele passa a integrar a estrutura da mensagem. O padrão **<abbr title="Multipurpose Internet Mail Extensions">MIME</abbr>** permite representar diferentes tipos de conteúdo e mensagens com múltiplas partes, inclusive anexos.

Isso não significa que <abbr title="Multipurpose Internet Mail Extensions">MIME</abbr> criptografe o arquivo ou prove sua autenticidade. Ele trata da **representação do conteúdo**.

Antes do envio, verifique:

- se o arquivo correto foi anexado;
- nome e formato do arquivo;
- se o serviço aceita aquele tipo e tamanho;
- se há mais de uma versão do documento;
- se o anexo realmente deve ser enviado àquele público.

Os limites de tamanho **variam por serviço**. Não existe um único tamanho máximo universal definido por <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> para toda conta de e-mail.

### Anexo × link para arquivo

Um anexo viaja como parte da mensagem. Um **link** aponta para um recurso armazenado em outro serviço. Copiar o link para um e-mail **não concede automaticamente permissão** ao destinatário para abrir o arquivo.

Essa distinção também aparece em prova:

- **anexo:** conteúdo incorporado à mensagem;
- **link:** referência a conteúdo externo, sujeito às permissões do serviço de armazenamento.

## 7. Rascunho, caixa de saída e enviados

Esses estados não significam a mesma coisa:

- **Rascunho:** mensagem ainda em preparação;
- **Caixa de saída:** envio pendente ou em processamento, conforme o cliente;
- **Enviados:** cópia/registro da mensagem que o cliente ou serviço tratou como enviada.

Nenhum desses nomes, isoladamente, prova que o destinatário leu ou compreendeu a mensagem.

Também diferencie:

- **arquivar:** normalmente retira da Entrada sem excluir;
- **excluir:** move para Lixeira ou remove conforme política;
- **marcar como lida:** altera um estado da mensagem; não é o mesmo que responder.

## 8. Portas: associe função antes do número

| Serviço | Porta convencional | Ideia de prova |
| --- | ---: | --- |
| transferência <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> | <abbr title="Transmission Control Protocol">TCP</abbr> 25 | servidor → servidor |
| submissão de e-mail | <abbr title="Transmission Control Protocol">TCP</abbr> 587 | cliente → serviço de envio |
| <abbr title="Internet Message Access Protocol">IMAP</abbr> | <abbr title="Transmission Control Protocol">TCP</abbr> 143 | acesso à caixa |
| <abbr title="Internet Message Access Protocol">IMAP</abbr> sobre <abbr title="Transport Layer Security">TLS</abbr> implícito | <abbr title="Transmission Control Protocol">TCP</abbr> 993 | acesso protegido |

A sequência mental é **função → protocolo → porta**, e não o contrário. Se você entende que <abbr title="Internet Message Access Protocol">IMAP</abbr> acessa a caixa, 143/993 passam a ter um lugar no mapa em vez de serem números soltos.

## 9. As trocas que mais derrubam

| Afirmação | Diagnóstico |
| --- | --- |
| “<abbr title="Simple Mail Transfer Protocol">SMTP</abbr> sincroniza a caixa.” | Errada: <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> envia/transfere. |
| “<abbr title="Internet Message Access Protocol">IMAP</abbr> publica a mensagem para o destinatário.” | Errada: <abbr title="Internet Message Access Protocol">IMAP</abbr> acessa/manipula a caixa. |
| “Webmail é um protocolo.” | Errada: é interface de acesso pelo navegador. |
| “<abbr title="Cópia carbono">Cc</abbr> oculta destinatários.” | Errada: <abbr title="Cópia carbono">Cc</abbr> é visível; <abbr title="Cópia carbono oculta">Cco</abbr> oculta. |
| “Anexo e link são equivalentes.” | Errada: anexo integra a mensagem; link referencia conteúdo externo. |
| “<abbr title="Multipurpose Internet Mail Extensions">MIME</abbr> garante criptografia.” | Errada: <abbr title="Multipurpose Internet Mail Extensions">MIME</abbr> representa tipos/partes de conteúdo. |
| “Enviado significa lido.” | Errada: envio, entrega e leitura são etapas diferentes. |

## 10. Método de ataque em quatro perguntas

Ao resolver uma questão, pergunte:

1. **A banca está falando de preparar, enviar ou acessar a caixa?**
2. **O verbo combina com o protocolo?** Enviar → <abbr title="Simple Mail Transfer Protocol">SMTP</abbr>; acessar/sincronizar → <abbr title="Internet Message Access Protocol">IMAP</abbr>.
3. **O problema é destinatário ou conteúdo?** Para/<abbr title="Cópia carbono">Cc</abbr>/<abbr title="Cópia carbono oculta">Cco</abbr> tratam do público; <abbr title="Multipurpose Internet Mail Extensions">MIME</abbr> ajuda a estruturar conteúdo/anexo.
4. **A alternativa exagerou o efeito?** “Enviado” não prova “lido”; “link enviado” não prova “acesso concedido”; “<abbr title="Cópia carbono oculta">Cco</abbr>” não torna a mensagem confidencial.

Se essas quatro fronteiras estiverem claras, o item 4 de Informática deixa de ser uma lista de siglas e vira um fluxo único e previsível.
