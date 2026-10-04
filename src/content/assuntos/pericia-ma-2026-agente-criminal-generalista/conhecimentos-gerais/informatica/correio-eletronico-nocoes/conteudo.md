---
schemaVersion: 1
title: "Correio eletrônico: mensagens, destinatários e anexos"
description: "Composição, envio, acesso à caixa postal, cópias, respostas, anexos e organização de mensagens."
order: 320
storageId: "per-u032"
---

## 1. Da mensagem escrita à mensagem recebida

Ana escreve um relatório, escolhe Bruno como destinatário e envia um arquivo junto. Bruno poderá abrir a mensagem mais tarde, mesmo que Ana já tenha fechado o computador. O correio eletrônico permite essa comunicação **assíncrona**: remetente e destinatário não precisam estar conectados ao mesmo tempo.

Há três tarefas diferentes nesse caminho: **preparar a mensagem**, **transportá-la até o serviço do destinatário** e **acessar a caixa postal para lê-la**. A tela em que Ana escreve não é o mecanismo que transporta a mensagem; a cópia guardada em “Enviados” também não comprova que Bruno a leu. Essa separação explica os campos, as pastas e os <abbr title="regras de comunicação entre sistemas">protocolos</abbr> que veremos.

## 2. Conta, endereço e interface

A **conta** permite utilizar o serviço de correio; a **caixa postal** reúne as mensagens e sua organização. Um endereço simples, como `ana@exemplo.org`, identifica uma caixa no sistema de correio: `ana` é a parte local, cujo significado é definido pelo serviço do domínio; `exemplo.org` é o domínio, que identifica o destino no sistema de correio. O endereço não é uma página de navegação nem inclui a senha da conta.

Para usar a caixa, o usuário pode abrir um **webmail**, interface de correio acessada pelo navegador, ou um **cliente de e-mail**, aplicativo como Outlook ou Thunderbird. O navegador apresenta o webmail; os serviços de correio cuidam do envio e do armazenamento. Usar um navegador não transforma os <abbr title="regras de comunicação entre sistemas">protocolos</abbr> de correio em páginas da Web.

Uma mesma conta pode ser configurada em diferentes interfaces. Isso não significa que toda pasta e toda alteração apareçam automaticamente em todos os aparelhos: o resultado depende do serviço, da forma de acesso, da configuração e da <abbr title="atualização das alterações entre a caixa no servidor e os aparelhos">sincronização</abbr>.

## 3. Compor a mensagem: conteúdo e destinatários

Uma mensagem tem informações de identificação e destino, apresentadas no **cabeçalho**, e o **corpo**, que contém o texto principal. Na composição, confira o remetente, os endereços de destino, o assunto, o texto e os arquivos que pretende incluir. **Assunto** é a identificação breve do tema; escrever nele não substitui escrever o corpo.

| Campo apresentado pela interface | Papel na mensagem |
| --- | --- |
| De / From | Identifica o remetente indicado na mensagem. |
| Para / To | Destinatários principais. |
| <abbr title="cópia carbono">Cc</abbr> | Destinatários que recebem uma cópia com endereço visível na lista da mensagem. |
| <abbr title="cópia carbono oculta">Cco</abbr> / <abbr title="blind carbon copy — cópia carbono oculta">Bcc</abbr> | Destinatários que recebem uma cópia sem ter seus endereços apresentados aos destinatários de Para e de <abbr title="cópia carbono">Cc</abbr>. |

Para e <abbr title="cópia carbono">Cc</abbr> diferem no papel comunicativo, não na capacidade de receber o conteúdo. Colocar alguém em cópia não restringe automaticamente sua leitura ou sua possibilidade de responder. Para e <abbr title="cópia carbono">Cc</abbr> compõem a lista visível: quem recebe uma cópia oculta também pode ver esses endereços.

Ana envia a Bruno em Para, a Carla em <abbr title="cópia carbono">Cc</abbr> e a Diana em <abbr title="cópia carbono oculta">Cco</abbr>. Bruno e Carla veem os endereços visíveis, mas a cópia recebida por eles não revela Diana nessa lista. Diana recebe o conteúdo e pode ver Bruno e Carla. No Gmail e no Outlook, um destinatário oculto também não vê os outros destinatários ocultos; no padrão de formato das mensagens, esse tratamento entre cópias ocultas admite variações de implementação. A regra central de <abbr title="cópia carbono oculta">Cco</abbr> é ocultar os endereços inseridos nesse campo **das pessoas listadas em Para e em <abbr title="cópia carbono">Cc</abbr>**.

Essa ocultação não <abbr title="transforma o conteúdo para impedir sua leitura por quem não possui a chave adequada">cifra</abbr> o conteúdo nem impede que alguém o encaminhe. Se Diana responder aos participantes visíveis, o endereço dela poderá aparecer como remetente da nova mensagem, revelando sua participação. Ocultar uma lista de endereços é diferente de controlar o que as pessoas farão com o conteúdo recebido.

## 4. Responder, responder a todos ou encaminhar

**Responder** normalmente dirige a nova mensagem ao remetente. Se o cabeçalho trouxer **Reply-To**, endereço indicado para as respostas, o programa pode usá-lo em lugar do endereço de De. A lista pode ser editada; por isso, confira o destino efetivo antes de enviar.

**Responder a todos** inclui, em geral, o remetente e os outros destinatários visíveis em Para e <abbr title="cópia carbono">Cc</abbr>, descontando o próprio endereço conforme o programa. Não significa enviar a todos os contatos da conta. Os endereços ocultos que a cópia recebida não revelou não passam a ser conhecidos por esse comando.

No exemplo anterior, Bruno escolhe “Responder a todos” em sua cópia, sem alterar a lista e sem um endereço especial para respostas. O programa prepara uma resposta a Ana e Carla. Diana não entra automaticamente: seu endereço não consta da lista visível recebida por Bruno. Se ele escolher apenas “Responder”, a resposta se dirige a Ana.

**Encaminhar** prepara uma mensagem para destinatários escolhidos pelo usuário, aproveitando conteúdo da mensagem recebida. Pode levar o conteúdo a uma pessoa que não estava na conversa. Confira também os trechos citados e os anexos efetivamente incluídos: os programas podem tratar esses elementos de maneiras diferentes ao responder ou encaminhar.

## 5. Anexar um arquivo ou enviar um link

Um **anexo incorporado** leva o arquivo como parte da mensagem enviada. Um **link** aponta para um recurso externo, como um documento no Google Drive ou no OneDrive. Colar o link no corpo não incorpora automaticamente uma cópia do arquivo: o destinatário precisa conseguir acessar o recurso indicado, conforme as permissões e a disponibilidade dele.

Se Ana anexa uma cópia do relatório e depois altera o arquivo em seu computador, o anexo já enviado não se atualiza por essa alteração. Se envia um link para um documento compartilhado, Bruno pode acessar a versão disponível naquele recurso, conforme as permissões. Receber o e-mail com o link não concede, por si só, autorização para ler ou editar o documento.

Antes do envio, confira se selecionou o arquivo correto, se a inclusão terminou e se o serviço aceita o tipo e o tamanho envolvidos. Limites podem considerar o conjunto dos anexos ou a mensagem completa; variam por serviço, conta e política administrativa. O serviço de destino também pode impor restrições. Um limite anunciado por um produto não vale automaticamente para todos os provedores.

Para representar texto, imagens e arquivos no corpo de uma mensagem, os padrões de correio utilizam extensões chamadas <abbr title="Multipurpose Internet Mail Extensions — extensões de correio da Internet para múltiplos tipos de conteúdo">MIME</abbr>. Elas descrevem tipos de conteúdo e permitem mensagens com várias partes. **Representar um arquivo na mensagem não é o mesmo que <abbr title="transformar o conteúdo para impedir sua leitura por quem não possui a chave adequada">cifrá-lo</abbr> ou comprovar sua <abbr title="confirmação de que o arquivo vem da origem declarada">autenticidade</abbr>.**

## 6. Enviar e acessar a caixa: funções dos protocolos

Um **protocolo** é um conjunto de regras para a comunicação entre sistemas. Depois que Ana prepara a mensagem, o serviço precisa recebê-la para envio e transportá-la. O <abbr title="Simple Mail Transfer Protocol — protocolo simples de transferência de correio">SMTP</abbr> atende ao **envio e à transferência de correio**, incluindo a comunicação entre servidores. Não é o mecanismo usado para sincronizar as pastas de leitura do usuário.

Depois da entrega à caixa de destino, um cliente precisa consultar as mensagens. O <abbr title="Internet Message Access Protocol — protocolo de acesso a mensagens da Internet">IMAP</abbr> permite **acessar e manipular a caixa mantida no servidor**. O usuário pode ler, organizar pastas e alterar marcas como “lida”. Clientes compatíveis podem sincronizar essas alterações com o servidor e com outros aparelhos conectados à mesma conta. Um aparelho desconectado pode conservar cópias locais; as mudanças precisam ser sincronizadas quando a conexão e o serviço permitirem. Portanto, acesso no servidor não exclui armazenamento local.

O <abbr title="Post Office Protocol, versão 3 — protocolo de recuperação de correio">POP3</abbr> também permite recuperar mensagens, mas é orientado a **baixar mensagens do servidor para o cliente (download)**, sem a mesma administração e sincronização de pastas e marcas do modelo anterior. A conservação ou remoção das cópias no servidor depende da configuração e da política do serviço: baixar não implica apagar sempre.

| Necessidade no fluxo | Função pertinente |
| --- | --- |
| Enviar a mensagem e transferi-la entre servidores | <abbr title="Simple Mail Transfer Protocol — protocolo simples de transferência de correio">SMTP</abbr>. |
| Acessar a caixa no servidor e sincronizar alterações compatíveis | <abbr title="Internet Message Access Protocol — protocolo de acesso a mensagens da Internet">IMAP</abbr>. |
| Recuperar mensagens por download, conforme configuração | <abbr title="Post Office Protocol, versão 3 — protocolo de recuperação de correio">POP3</abbr>. |

O **webmail** é a interface no navegador, não um quarto protocolo dessa tabela. Seu acesso pela Web e o funcionamento interno do serviço são etapas diferentes; não se deve afirmar que todo navegador se conecta diretamente à caixa por <abbr title="Internet Message Access Protocol — protocolo de acesso a mensagens da Internet">IMAP</abbr>.

## 7. Estado, organização e comprovação

**Rascunhos** guardam mensagens ainda em preparação. **Caixa de saída** normalmente reúne mensagens preparadas para envio, mas pendentes, por exemplo por falta de conexão. **Enviados** conserva a cópia que a interface registra como enviada. Esses nomes e detalhes podem variar entre produtos; é preciso observar a etapa do processo, não apenas o nome da pasta.

A **Caixa de entrada** reúne mensagens recebidas, conforme a organização do serviço. **Arquivar** geralmente retira uma mensagem da entrada e a conserva em outra localização ou no conjunto das mensagens; no Gmail, ela continua acessível em “Todos os e-mails”. **Excluir** pode movê-la para a lixeira antes da remoção definitiva, segundo a política do serviço. Retirar da entrada não significa necessariamente apagar.

A **pesquisa** localiza mensagens por critérios, como remetente, assunto ou data. Uma **regra ou filtro** associa critérios a uma ação, como classificar ou arquivar mensagens que os atendam. Pesquisar por um remetente não cria automaticamente uma regra para suas próximas mensagens.

A marca **lida/não lida** organiza o estado da mensagem e pode ser alterada pelo usuário ou pelo programa; não significa que foi respondida. Da mesma forma, existir uma cópia em Enviados não prova entrega final, leitura ou compreensão pelo destinatário. Mensagens podem atrasar ou gerar avisos de falha depois da tentativa de envio.

Ao resolver uma questão, localize primeiro **a etapa**: composição, envio, acesso ou organização. Depois verifique **quem recebe e quem vê os endereços**, **se o arquivo foi incorporado ou apenas indicado por link** e **quais condições o enunciado realmente estabeleceu**. Isso evita confundir interface com protocolo, cópia oculta com sigilo do conteúdo e registro de envio com prova de leitura.
