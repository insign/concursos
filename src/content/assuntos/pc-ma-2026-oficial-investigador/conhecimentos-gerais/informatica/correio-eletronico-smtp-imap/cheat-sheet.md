# Revisão rápida — correio eletrônico

## Fluxo central

**preparar → anexar → enviar → transferir → acessar/sincronizar**

- <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> → envio/submissão/transferência;
- <abbr title="Internet Message Access Protocol">IMAP</abbr> → acesso e sincronização da caixa no servidor;
- <abbr title="Multipurpose Internet Mail Extensions">MIME</abbr> → representação de conteúdos e anexos.

## <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> × <abbr title="Internet Message Access Protocol">IMAP</abbr>

| Função | Protocolo | Porta convencional |
| --- | --- | ---: |
| servidor → servidor | <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> | <abbr title="Transmission Control Protocol">TCP</abbr> 25 |
| cliente → serviço de envio | submissão <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> | <abbr title="Transmission Control Protocol">TCP</abbr> 587 |
| acesso à caixa | <abbr title="Internet Message Access Protocol">IMAP</abbr> | <abbr title="Transmission Control Protocol">TCP</abbr> 143 |
| acesso protegido | <abbr title="Internet Message Access Protocol">IMAP</abbr> sobre <abbr title="Transport Layer Security">TLS</abbr> | <abbr title="Transmission Control Protocol">TCP</abbr> 993 |

**Pegadinha-mãe:** <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> não lê/sincroniza; <abbr title="Internet Message Access Protocol">IMAP</abbr> não publica/envia a mensagem.

## Destinatários

- Para → envolvidos principais;
- <abbr title="Cópia carbono">Cc</abbr> → cópia visível;
- <abbr title="Cópia carbono oculta">Cco</abbr>/<abbr title="Blind carbon copy">Bcc</abbr> → destinatário oculto aos demais.

<abbr title="Cópia carbono oculta">Cco</abbr> oculta a lista; **não** torna o conteúdo secreto.

## Estados e ações

- rascunho → ainda em preparação;
- caixa de saída → envio pendente, conforme cliente;
- enviados → registro de mensagem tratada como enviada;
- responder → volta ao remetente/endereço de resposta;
- responder a todos → inclui destinatários visíveis relacionados;
- encaminhar → novo envio para outro público;
- arquivar ≠ excluir.

**Enviado ≠ entregue ≠ lido ≠ compreendido.**

## Anexos

- anexo integra a mensagem;
- link aponta para conteúdo externo e depende de permissão;
- limite de tamanho varia por serviço;
- <abbr title="Multipurpose Internet Mail Extensions">MIME</abbr> estrutura conteúdo/anexo, mas não garante criptografia ou autenticidade.

## Contrastes de prova

- webmail ≠ protocolo;
- cliente instalado ≠ armazenamento obrigatoriamente local;
- <abbr title="Internet Message Access Protocol">IMAP</abbr> ≠ <abbr title="Post Office Protocol version 3">POP3</abbr>;
- <abbr title="Cópia carbono">Cc</abbr> ≠ <abbr title="Cópia carbono oculta">Cco</abbr>;
- anexo ≠ link;
- 25 ≠ 587;
- 143 ≠ 993;
- envio ≠ leitura.
