---
schemaVersion: 1
title: "Redes de computadores, protocolos TCP/IP e interoperabilidade"
description: Conceitos de LAN, WAN e Internet, modelos de camadas, endereçamento e serviços TCP/IP, HTTP, SMTP, FTP e interoperabilidade de sistemas no setor público.
order: 24
storageId: redes-tcp-ip-interoperabilidade
---

## 1. Recorte do assunto

Este assunto reúne os fundamentos necessários para compreender como dispositivos e sistemas públicos trocam dados: **LAN, WAN, Internet, suíte TCP/IP, HTTP, SMTP, FTP e interoperabilidade**.

O foco está na função de cada conceito, nas relações entre as camadas e nas distinções mais cobradas. Correio eletrônico como ferramenta, webmail, clientes de e-mail, Teams, Meet e trabalho remoto pertencem ao assunto seguinte. Backup, armazenamento em nuvem, malware, proteção e ameaças digitais pertencem a assuntos próprios. Segurança aparece aqui somente quando é indispensável para distinguir, por exemplo, HTTP de HTTPS ou FTP de FTPS e SFTP.

---

## 2. Rede, protocolo e arquitetura

Uma **rede de computadores** conecta dispositivos para transmitir dados e compartilhar recursos, como sistemas, arquivos, impressoras e acesso a serviços. Os participantes podem incluir computadores, celulares, servidores, equipamentos de rede, sensores e sistemas embarcados.

Um **protocolo** é um conjunto de regras para comunicação. Ele define aspectos como formato das mensagens, ordem das operações, endereçamento e tratamento de situações esperadas. Equipamentos fisicamente conectados não conseguem interoperar apenas por estarem ligados: precisam adotar regras compatíveis.

### 2.1 Cliente, servidor e pares

- no modelo **cliente-servidor**, o cliente solicita e o servidor oferece um serviço;
- no modelo **ponto a ponto** (*peer-to-peer* ou P2P), participantes podem exercer papéis equivalentes e compartilhar recursos diretamente;
- um mesmo computador pode ser cliente em uma comunicação e servidor em outra;
- “servidor” pode designar o software que presta o serviço ou a máquina que o executa, conforme o contexto.

### 2.2 Classificação pela abrangência

| Rede | Ideia central | Exemplo |
|---|---|---|
| **LAN** (*Local Area Network*) | área local, normalmente sob administração concentrada | setor, prédio ou campus |
| **MAN** (*Metropolitan Area Network*) | abrangência metropolitana | interligação de unidades em uma cidade |
| **WAN** (*Wide Area Network*) | grande área geográfica e interligação de redes distantes | unidades em estados diferentes |

LAN e WAN não são definidas apenas pela velocidade. Uma WAN pode interligar várias LANs e usar infraestrutura de operadoras. A **Internet** é o exemplo mais amplo de interconexão mundial de redes, mas uma WAN privada não se torna Internet apenas por cobrir longa distância.

### 2.3 Internet, Web, intranet e extranet

| Termo | Conceito |
|---|---|
| **Internet** | rede mundial de redes que utiliza a suíte TCP/IP |
| **Web/WWW** | sistema de recursos e aplicações acessados principalmente por HTTP/HTTPS |
| **intranet** | ambiente restrito a uma organização que usa tecnologias típicas da Internet |
| **extranet** | acesso controlado a recursos organizacionais por parceiros ou públicos externos autorizados |

A **Web é um serviço que opera sobre redes**, não sinônimo de Internet. E-mail, transferência de arquivos e resolução de nomes também usam a Internet sem serem Web. Uma intranet pode usar navegador, HTTP, DNS e TCP/IP, e ainda assim permanecer restrita. Ela também não precisa estar fisicamente isolada da Internet: o que a caracteriza é o acesso organizacional controlado.

---

## 3. Meios, topologias e equipamentos

Dados podem trafegar por cobre, fibra óptica ou radiofrequência, como no Wi-Fi. O meio influencia alcance, capacidade, interferência e custo, mas não altera sozinho a finalidade lógica da rede.

### 3.1 Topologias conceituais

| Topologia | Organização | Consequência típica |
|---|---|---|
| **estrela** | dispositivos ligados a um ponto central | falha de um enlace afeta um nó; falha central pode afetar o conjunto |
| **barramento** | dispositivos compartilham um meio principal | colisões e falha do meio comum foram limitações históricas |
| **anel** | nós formam um circuito | tráfego segue a lógica do anel |
| **malha** | há múltiplos caminhos entre nós | maior redundância, com maior complexidade e custo |
| **árvore/híbrida** | combinação hierárquica ou mista | comum em redes estruturadas maiores |

Topologia **física** descreve a disposição real; topologia **lógica** descreve como a comunicação se organiza. Elas podem não coincidir.

### 3.2 Equipamentos

| Equipamento | Função básica |
|---|---|
| **placa de rede/NIC** | conecta o dispositivo ao meio de rede |
| **repetidor** | regenera ou repete sinais para ampliar alcance |
| **hub** | repete o tráfego recebido para as demais portas |
| **bridge/ponte** | conecta segmentos e filtra quadros pelo endereço de enlace |
| **switch** | encaminha quadros localmente, em regra com base em endereços MAC |
| **roteador** | interliga redes IP e escolhe o próximo salto para os pacotes |
| **ponto de acesso** | conecta clientes sem fio à rede local |
| **modem** | adapta sinais ao meio usado pelo acesso de telecomunicações |

O **switch** é associado conceitualmente à camada de enlace, enquanto o **roteador** atua na camada de rede. Há equipamentos multicamada, mas isso não elimina a distinção funcional. O roteador da rede local costuma ser também o **gateway padrão**, porém gateway é um papel lógico e não sinônimo absoluto de roteador.

---

## 4. Modelos em camadas

Dividir a comunicação em camadas separa responsabilidades. Cada camada oferece serviços à superior e utiliza serviços da inferior. Isso favorece modularidade e substituição de tecnologias sem redesenhar toda a comunicação.

### 4.1 Modelo OSI

O modelo de referência OSI possui sete camadas:

| Nº | Camada | Função resumida |
|---:|---|---|
| 7 | Aplicação | serviços de rede percebidos pelos aplicativos |
| 6 | Apresentação | representação, codificação e transformação de dados |
| 5 | Sessão | estabelecimento e controle de sessões |
| 4 | Transporte | comunicação fim a fim entre processos |
| 3 | Rede | endereçamento lógico e roteamento |
| 2 | Enlace de Dados | quadros e entrega no enlace local |
| 1 | Física | transmissão de bits pelo meio |

O OSI é um **modelo conceitual**, não uma suíte obrigatória de protocolos da Internet.

### 4.2 Modelo TCP/IP

A Internet usa a suíte TCP/IP, frequentemente apresentada em quatro camadas:

| TCP/IP | Correspondência aproximada no OSI | Exemplos |
|---|---|---|
| **Aplicação** | Aplicação + Apresentação + Sessão | HTTP, DNS, SMTP, FTP, DHCP |
| **Transporte** | Transporte | TCP, UDP e portas |
| **Internet** | Rede | IPv4, IPv6 e roteamento |
| **Acesso à rede** | Enlace + Física | Ethernet, Wi-Fi, MAC, quadros e bits |

Alguns materiais usam cinco camadas e separam Enlace de Física. É uma convenção didática, não uma mudança no funcionamento da Internet.

### 4.3 Encapsulamento

Ao enviar dados, cada camada acrescenta informações de controle. Uma sequência didática comum é:

`dados da aplicação → segmento TCP ou datagrama UDP → pacote IP → quadro de enlace → bits`

No destino, ocorre a **desencapsulação** em sentido inverso. Em prova, “pacote” pode aparecer informalmente como termo genérico, mas a nomenclatura mais precisa distingue segmento TCP, datagrama UDP, pacote IP e quadro de enlace.

---

## 5. Identidades na comunicação

Endereço MAC, endereço IP e porta não identificam a mesma coisa.

| Identificador | Camada/função |
|---|---|
| **MAC** | identifica uma interface no enlace local para entrega de quadros |
| **IP** | endereço lógico usado para encaminhar pacotes entre redes |
| **porta** | número de transporte que identifica um serviço ou processo no host |
| **nome de domínio** | nome legível resolvido por serviços como DNS |

Um **socket** é um ponto de comunicação. Em uma explicação introdutória, associa-se a endereço IP, protocolo de transporte e porta. Um fluxo TCP é distinguido com precisão pelo protocolo e pelos pares de IP e porta de origem e de destino.

### 5.1 ARP não é DNS

Em redes IPv4 locais, o **ARP** descobre o endereço MAC associado a um endereço IPv4 no enlace. O **DNS** resolve nomes e registros de domínio. Portanto:

- DNS: nome → registros, frequentemente endereço IP;
- ARP: IPv4 local → endereço MAC;
- DHCP: fornece parâmetros de configuração ao host.

---

## 6. IPv4, IPv6 e prefixos

### 6.1 IPv4

O IPv4 usa endereços de **32 bits**, normalmente escritos em quatro números decimais separados por pontos, como `192.0.2.10`. Um prefixo informa quantos bits identificam a rede.

Exemplo: `/24` indica 24 bits de prefixo e, no IPv4, corresponde à máscara `255.255.255.0`. A máscara não é o endereço do gateway e não mede velocidade: ela separa a parte de rede da parte de host.

As faixas privadas definidas para uso interno incluem:

- `10.0.0.0/8`;
- `172.16.0.0/12`;
- `192.168.0.0/16`.

Endereços privados não são roteados diretamente na Internet pública. A tradução de endereços, como NAT, pode permitir que vários hosts privados compartilhem conectividade externa, mas NAT não substitui uma política de segurança.

### 6.2 IPv6

O IPv6 usa **128 bits**, geralmente representados em grupos hexadecimais separados por dois-pontos. Zeros à esquerda em um grupo podem ser omitidos, e uma sequência contínua de grupos zero pode ser comprimida uma única vez com `::`.

Exemplos importantes:

- `::1`: endereço de *loopback*;
- `fe80::/10`: prefixo de endereços *link-local*;
- notação `/n`: quantidade de bits do prefixo, assim como no CIDR.

O grande espaço de endereçamento é uma motivação central do IPv6. Ele não torna uma comunicação automaticamente segura e não usa *broadcast* da mesma forma que o IPv4; emprega, entre outros mecanismos, *multicast*.

### 6.3 Gateway padrão

Se o destino pertence à mesma sub-rede, o host pode realizar a entrega pelo enlace local. Se está fora dela, o host normalmente envia o pacote ao **gateway padrão**, que o encaminhará para outra rede. O gateway não é “a Internet”: é o próximo salto configurado para destinos sem rota local mais específica.

---

## 7. Serviços básicos da suíte TCP/IP

### 7.1 DNS

O **Domain Name System (DNS)** é um sistema distribuído e hierárquico de nomes e registros. A formulação “traduz nome para IP” ajuda a iniciar o estudo, mas é incompleta: DNS também mantém outros tipos de registro, como os relacionados a servidores de correio, aliases e autoridades da zona.

O serviço usa convencionalmente a porta `53`, tanto UDP quanto TCP conforme a operação. DNS não fornece automaticamente um endereço IP ao dispositivo e não deve ser confundido com DHCP.

### 7.2 DHCP

O **Dynamic Host Configuration Protocol (DHCP)** entrega dinamicamente parâmetros como endereço IP, máscara/prefixo, gateway e servidores DNS. No DHCPv4, uma sequência didática comum é **DORA**:

1. `Discover`: cliente procura servidores;
2. `Offer`: servidor oferece configuração;
3. `Request`: cliente solicita a oferta escolhida;
4. `Acknowledgment`: servidor confirma a concessão.

No DHCPv4, servidor e cliente usam convencionalmente UDP `67` e `68`, respectivamente. DHCP configura; DNS resolve nomes.

### 7.3 Portas conhecidas

| Serviço | Porta convencional | Observação |
|---|---:|---|
| HTTP | 80 | HTTP/1.1 e HTTP/2 usam normalmente TCP |
| HTTPS | 443 | HTTP/1.1 e HTTP/2 sobre TLS/TCP; HTTP/3 usa QUIC/UDP |
| DNS | 53 | UDP e TCP |
| DHCPv4 | 67/68 | servidor/cliente sobre UDP |
| SMTP | 25 | transferência entre servidores; submissão costuma usar 587 |
| FTP | 21 | conexão de controle; porta 20 participa do modo ativo clássico |
| SSH/SFTP moderno | 22 | porta convencional do serviço SSH |

Portas são **convenções registradas**. Um serviço pode ser configurado em outra porta. A porta identifica o serviço/processo no host, não o computador inteiro.

---

## 8. TCP e UDP

TCP e UDP pertencem à camada de transporte e operam sobre IP.

| Característica | TCP | UDP |
|---|---|---|
| conexão lógica | orientado à conexão | não orientado à conexão |
| unidade oferecida | fluxo de bytes | datagramas |
| entrega e ordem | oferece entrega confiável e ordenada ao aplicativo | não garante entrega nem ordem por si só |
| retransmissão | possui mecanismos próprios | não possui retransmissão intrínseca |
| controles | fluxo e congestionamento | estrutura de transporte mais simples |

O estabelecimento TCP é apresentado pelo **three-way handshake**:

1. cliente envia `SYN`;
2. servidor responde `SYN-ACK`;
3. cliente confirma com `ACK`.

“Confiável” não significa infalível: significa que o TCP detecta perdas e organiza retransmissão, ordem e controle conforme seu protocolo. Também é incorreto afirmar que UDP é sempre mais rápido ou que uma aplicação UDP nunca pode ser confiável. A própria aplicação pode implementar confirmações e retransmissões; o HTTP/3 usa QUIC sobre UDP para oferecer recursos próprios de transporte.

---

## 9. HTTP e HTTPS

O **HTTP** é um protocolo de aplicação de requisição e resposta. Ele transfere representações e metadados e sustenta páginas Web e APIs. Sua semântica é **sem estado** (*stateless*): cada requisição pode ser compreendida por suas próprias informações, embora aplicações mantenham estado por cookies, tokens, sessões ou outros mecanismos.

Uma requisição contém método, alvo e campos de cabeçalho e pode conter conteúdo. A resposta contém código de status, campos e, quando aplicável, conteúdo.

### 9.1 Métodos principais

| Método | Semântica central | Seguro? | Idempotente? |
|---|---|:---:|:---:|
| `GET` | obter representação do recurso | sim | sim |
| `HEAD` | obter metadados equivalentes aos de GET, sem conteúdo da resposta | sim | sim |
| `POST` | submeter conteúdo para processamento definido pelo recurso | não | não necessariamente |
| `PUT` | criar ou substituir o estado do recurso-alvo com a representação enviada | não | sim |
| `DELETE` | solicitar remoção da associação ao recurso | não | sim |
| `OPTIONS` | consultar opções de comunicação | sim | sim |

Método **seguro** é aquele cuja semântica solicitada é essencialmente leitura, não aquele que usa criptografia. Método **idempotente** produz o mesmo efeito pretendido quando uma requisição idêntica é repetida uma ou várias vezes; a resposta concreta ainda pode variar.

### 9.2 Classes de status

| Classe | Significado geral | Exemplos |
|---|---|---|
| `1xx` | informação/progresso | `100 Continue` |
| `2xx` | sucesso | `200 OK`, `201 Created`, `202 Accepted`, `204 No Content` |
| `3xx` | redirecionamento ou ação adicional | `301`, `304`, `307`, `308` |
| `4xx` | erro associado à requisição do cliente | `400`, `401`, `403`, `404`, `405`, `409`, `415` |
| `5xx` | falha do servidor ou intermediário | `500`, `502`, `503`, `504` |

Distinções frequentes:

- `201 Created`: o recurso foi criado;
- `202 Accepted`: a solicitação foi aceita para processamento, não necessariamente concluída;
- `204 No Content`: houve sucesso sem conteúdo na resposta;
- `304 Not Modified`: validação de cache; não é um redirecionamento comum para outra página;
- `401 Unauthorized`: apesar do nome histórico, indica falta de credenciais válidas para autenticação exigida;
- `403 Forbidden`: o servidor entendeu e recusou atender;
- `404 Not Found`: recurso não encontrado ou deliberadamente não revelado;
- `405 Method Not Allowed`: o recurso existe, mas não aceita aquele método;
- `502 Bad Gateway`: intermediário recebeu resposta inválida do servidor a montante;
- `503 Service Unavailable`: indisponibilidade temporária;
- `504 Gateway Timeout`: intermediário não recebeu resposta a tempo.

### 9.3 HTTPS e versões do HTTP

**HTTPS é HTTP protegido por TLS**. A semântica de métodos e status permanece HTTP; TLS acrescenta proteção criptográfica ao transporte. HTTPS não torna verdadeiro todo conteúdo recebido nem elimina riscos da aplicação.

HTTP/1.1 e HTTP/2 usam normalmente TCP. **HTTP/3 usa QUIC sobre UDP**, portanto a frase “HTTP sempre usa TCP” é falsa. A porta convencional de HTTPS continua sendo `443` nos usos atuais.

---

## 10. SMTP e transferência de arquivos

### 10.1 SMTP

O **Simple Mail Transfer Protocol (SMTP)** serve à submissão e à transferência de mensagens, inclusive entre servidores de correio. Ele não é, por si só, o protocolo de leitura da caixa postal.

A porta TCP `25` é convencional para transferência entre servidores. A submissão autenticada por clientes costuma usar `587`. O funcionamento de clientes, webmail e leitura de mensagens pertence ao assunto de correio eletrônico; aqui importa reconhecer a finalidade de transporte do SMTP.

### 10.2 FTP

O **File Transfer Protocol (FTP)** é um protocolo de aplicação para transferência e operações com arquivos. Ele usa conexões TCP separadas:

- **controle**, normalmente na porta `21`, para comandos e respostas;
- **dados**, para listagens e conteúdo transferido.

No modo **ativo**, o servidor inicia a conexão de dados em direção ao cliente, classicamente a partir da porta `20`. No modo **passivo**, o cliente também inicia a conexão de dados para uma porta indicada pelo servidor. O modo passivo tende a atravessar NAT e filtros com maior facilidade, pois evita a conexão de dados iniciada pelo servidor contra o cliente.

FTP convencional não protege credenciais e dados por criptografia. Essa constatação serve para distinguir protocolos, sem substituir o estudo específico de segurança.

### 10.3 FTP, FTPS e SFTP não são sinônimos

| Protocolo | Relação | Canal convencional |
|---|---|---|
| **FTP** | protocolo clássico de transferência | TCP, controle em 21 |
| **FTPS** | FTP protegido por TLS | mantém a arquitetura do FTP |
| **SFTP moderno** | SSH File Transfer Protocol, subsistema do SSH | normalmente serviço SSH em TCP 22 |

SFTP não é “FTP com SSH”, e FTPS não é SFTP. Há ainda um protocolo histórico chamado **Simple File Transfer Protocol**, definido na RFC 913 e registrado em TCP `115`; ele não é o SFTP moderno sobre SSH.

Outra cautela: não existe RFC IETF final que padronize o SSH File Transfer Protocol moderno. Sua especificação técnica de facto permaneceu em um Internet-Draft arquivado, enquanto as RFCs da arquitetura SSH definem o canal e o mecanismo de subsistemas.

---

## 11. Interoperabilidade de sistemas

**Interoperabilidade** é a capacidade de sistemas e organizações trabalharem em conjunto, trocando e usando informações de modo eficaz e eficiente. Não basta estabelecer uma conexão: a informação precisa preservar significado, integrar processos e respeitar competências e limites legais.

### 11.1 Dimensões

| Dimensão | Pergunta central | Instrumentos e exemplos |
|---|---|---|
| **técnica** | os sistemas conseguem se conectar e trocar dados? | redes, protocolos, APIs, formatos e interfaces |
| **semântica** | ambos entendem os dados com o mesmo significado? | dicionários, metadados, taxonomias, ontologias e códigos comuns |
| **organizacional** | processos, papéis e responsabilidades estão coordenados? | governança, acordos, fluxos e níveis de serviço |
| **jurídica** | a troca possui competência, finalidade e limites legítimos? | base legal, sigilo, proteção de dados e responsabilidade |

O documento de referência da **e-PING** enumera expressamente as dimensões técnica, semântica e organizacional. A dimensão jurídica é uma lente analítica complementar e indispensável na Administração Pública, mas não deve ser atribuída indevidamente à lista oficial de três dimensões da e-PING.

Exemplo: duas APIs podem trocar um campo `situacao = 1`. Há conexão técnica, mas falta interoperabilidade semântica se um sistema interpretar `1` como “ativo” e outro como “encerrado”. Também faltará interoperabilidade organizacional se não houver responsável pelo dado, e jurídica se a troca não tiver finalidade ou competência legítima.

### 11.2 Integração e interoperabilidade

Integração costuma enfatizar a conexão e coordenação entre componentes. Interoperabilidade enfatiza a capacidade de sistemas e organizações distintos cooperarem sem perder significado e legitimidade. Os conceitos se relacionam, mas não são idênticos.

Interoperar não exige necessariamente:

- usar o mesmo fornecedor ou software;
- centralizar todas as bases;
- tornar todos os dados públicos;
- substituir toda solução legada de uma só vez;
- expor acesso irrestrito pela Internet.

### 11.3 APIs, protocolos e formatos

Uma **API** é uma interface ou contrato para que software use dados ou funcionalidades de outro software. Ela não é sinônimo de:

- **HTTP**, que é um protocolo frequentemente usado por APIs;
- **REST**, que é um estilo arquitetural;
- **JSON ou XML**, que são formatos de representação;
- interoperabilidade completa, pois a API não resolve sozinha significado, processos e direito.

Padrões e formatos abertos reduzem dependência de fornecedor e facilitam implementações compatíveis. “Aberto” não significa apenas gratuito. A Lei nº 14.129/2021 define **formato aberto** como formato não proprietário, com especificação pública, de livre conhecimento e implementação e sem patentes ou outras restrições legais de uso.

**Dados abertos** também não são sinônimo de qualquer dado estatal: devem ser acessíveis ao público, processáveis por máquina, estruturados em formato aberto e submetidos a licença aberta, preservados os sigilos e a proteção de dados.

---

## 12. e-PING e o setor público

A **Arquitetura de Padrões de Interoperabilidade de Governo Eletrônico (e-PING)** define um conjunto mínimo de premissas, políticas e especificações técnicas para a interoperabilidade no Poder Executivo federal e para sua interação com outros Poderes, esferas e a sociedade.

### 12.1 Âmbito de observância

Segundo a página oficial atualizada em 19 de junho de 2026:

- órgãos e entidades integrantes do **SISP** devem observar a e-PING no planejamento da contratação, aquisição e atualização de sistemas e equipamentos de tecnologia;
- a adoção pelos demais Poderes da União e demais entes federativos é **facultativa**;
- portanto, a e-PING não vincula automaticamente todo órgão público brasileiro nem um tribunal de contas estadual.

### 12.2 Políticas gerais

A e-PING estabelece, entre outras diretrizes:

- adoção preferencial de padrões abertos;
- uso prioritário de software público e/ou livre, conforme normas do SISP;
- transparência;
- tratamento da segurança conforme o serviço;
- existência de suporte de mercado;
- escalabilidade e ampliação do acesso;
- organização semântica e modelagem de dados;
- simplificação e colaboração entre organizações.

Padrões proprietários podem ser aceitos transitoriamente em legado ou quando não houver padrão aberto disponível. “Preferencial” não significa proibição absoluta e imediata de qualquer padrão proprietário.

### 12.3 Classificação das especificações

O Documento de Referência e-PING 2018 classifica especificações em:

| Nível | Sentido |
|---|---|
| **Adotado (A)** | padrão homologado e obrigatório nos novos produtos/projetos no escopo indicado |
| **Recomendado (R)** | atende às políticas e é sugerido, mas ainda não obrigatório |
| **Em Transição (T)** | uso significativo legado, porém deve ser evitado em novos serviços e substituído gradualmente |
| **Em Estudo (E)** | está em avaliação e pode vir a ser adotado |

O documento disponível continua identificado como versão 2018; suas tabelas devem ser lidas com atenção à data e às especificações posteriores. Para este assunto, interessam sobretudo os conceitos, políticas e a classificação, não decorar tecnologias obsoletas de cada tabela.

---

## 13. Lei nº 14.129/2021 e interoperabilidade

A Lei do Governo Digital tem âmbito próprio. Ela se aplica diretamente à Administração Pública federal indicada no art. 2º; Estados, Distrito Federal e Municípios podem adotar seus comandos por atos normativos próprios. Assim, não se deve afirmar aplicação automática integral ao TCE-MA.

Dispositivos centrais para este recorte:

- **art. 3º, IX:** atuação integrada e compartilhamento de dados pessoais em ambiente seguro quando indispensável, observadas a LGPD e regras de sigilo;
- **art. 3º, XIV:** interoperabilidade de sistemas e promoção de dados abertos;
- **art. 3º, XXV:** adoção preferencial de tecnologias, padrões e formatos abertos e livres;
- **art. 4º, IV e VI:** conceitos de dados abertos e formato aberto;
- **art. 20, § 2º:** plataformas de Governo Digital devem observar padrões de interoperabilidade e integração de dados;
- **art. 24, IV:** eliminar exigências desnecessárias ao usuário, inclusive por interoperabilidade;
- **art. 24, V:** evitar replicação de registros, salvo razões de desempenho ou segurança;
- **art. 24, VI:** tornar interoperáveis dados de serviços para indicadores do painel de desempenho;
- **art. 29:** dados de transparência ativa devem ser legíveis por máquina, em formato aberto e acompanhados de descrição de estrutura e semântica, respeitados limites legais;
- **art. 38:** considerar interoperabilidade, restrições legais, segurança, limitações tecnológicas, custo-benefício e proteção de dados;
- **arts. 39 a 41:** mecanismo de interoperabilidade, confiabilidade de cadastros, identificação unificada, publicidade e correção de registros de referência, reaproveitamento antes de criar nova base e custos de adaptação.

Interoperabilidade não autoriza circulação indiscriminada de dados. Da mesma forma, proteção de dados e sigilo não proíbem toda troca: eles definem requisitos, finalidades e limites.

---

## 14. Diagnóstico de situações de prova

### Situação 1: nome funciona, IP não foi configurado

Se o usuário acessa um serviço pelo IP, mas não pelo nome, deve-se investigar DNS. Se o dispositivo não recebeu IP, prefixo e gateway, o foco pode estar no DHCP ou na configuração local. DNS e DHCP resolvem problemas diferentes.

### Situação 2: destino local funciona, Internet não

Se hosts da mesma sub-rede se comunicam, mas destinos externos não, o gateway padrão, as rotas ou a conectividade a montante devem ser verificados. A máscara também pode ter classificado incorretamente o destino como local ou remoto.

### Situação 3: sistemas trocam JSON, mas discordam

O formato comum e a API podem resolver parte técnica. Se os campos têm significados divergentes, falta semântica. Se os processos e responsáveis não estão alinhados, falta dimensão organizacional. Se não há competência ou finalidade legítima, há problema jurídico.

### Situação 4: repetição de requisição HTTP

Repetir um `PUT` idêntico deve produzir o mesmo efeito pretendido, por isso ele é idempotente. Repetir `POST` pode criar novos efeitos e não é necessariamente idempotente. Método seguro e idempotente são classificações diferentes.

### Situação 5: protocolo “seguro” pelo nome

HTTPS é HTTP sobre TLS; FTPS é FTP com TLS; SFTP moderno opera como subsistema do SSH. Nomes parecidos não tornam os protocolos equivalentes.

---

## 15. Pegadinhas recorrentes

| Afirmação | Avaliação correta |
|---|---|
| “Internet e Web são sinônimos” | falso: a Web é uma aplicação sobre redes TCP/IP |
| “WAN é sempre pública” | falso: pode ser privada |
| “switch e roteador têm a mesma função” | falso: comutação local e roteamento entre redes são funções distintas |
| “MAC, IP e porta identificam a mesma entidade” | falso |
| “DNS fornece IP ao host” | falso: essa configuração é função típica do DHCP |
| “IPv6 tem 64 bits” | falso: tem 128 bits |
| “UDP garante entrega desordenada” | falso: ele não garante entrega nem ordem |
| “TCP sempre é lento e UDP sempre é rápido” | falso |
| “HTTP sempre usa TCP” | falso: HTTP/3 usa QUIC sobre UDP |
| “401 significa apenas proibição definitiva” | falso: relaciona-se à autenticação exigida |
| “FTP usa uma única conexão” | falso: separa controle e dados |
| “FTPS e SFTP são o mesmo protocolo” | falso |
| “API garante interoperabilidade integral” | falso |
| “formato gratuito é necessariamente aberto” | falso |
| “e-PING obriga todo órgão brasileiro” | falso |
| “a e-PING enumera oficialmente quatro dimensões” | falso: enumera técnica, semântica e organizacional |
| “interoperabilidade exige abrir todos os dados” | falso: sigilo e proteção continuam aplicáveis |

---

## 16. Síntese para revisão

1. LAN é local; WAN interliga áreas amplas; Internet é rede mundial de redes.
2. Web, intranet e extranet usam tecnologias de rede, mas têm escopos diferentes.
3. Switch encaminha quadros localmente; roteador encaminha pacotes entre redes.
4. OSI tem sete camadas; TCP/IP costuma ser representado com quatro ou cinco.
5. MAC atua no enlace, IP na rede e porta no transporte.
6. IPv4 tem 32 bits; IPv6, 128 bits; prefixo não é gateway.
7. DNS resolve nomes; DHCP fornece configuração; ARP associa IPv4 local a MAC.
8. TCP é orientado à conexão e confiável; UDP não oferece essas garantias por si só.
9. HTTP é requisição-resposta; método seguro não significa criptografado.
10. HTTPS preserva a semântica HTTP e usa TLS; HTTP/3 opera sobre QUIC/UDP.
11. SMTP transfere mensagens; FTP transfere arquivos com controle e dados separados.
12. FTPS é FTP com TLS; SFTP moderno usa SSH; nenhum deles é sinônimo do outro.
13. Interoperabilidade envolve técnica, semântica, organização e legitimidade jurídica.
14. API, HTTP, REST e JSON não são sinônimos.
15. A e-PING é obrigatória no escopo indicado para integrantes do SISP e facultativa para os demais entes e Poderes.
16. A Lei nº 14.129/2021 promove interoperabilidade e formatos abertos, sem eliminar sigilo, proteção de dados ou limites de competência.

## Referências

- BRASIL. Presidência da República. [Lei nº 14.129, de 29 de março de 2021](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14129.htm). Texto vigente; acesso em 18 jul. 2026.
- BRASIL. Ministério da Gestão e da Inovação em Serviços Públicos. [Padrões de Interoperabilidade e-PING](https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/interoperabilidade/padroes-de-interoperabilidade). Atualizado em 19 jun. 2026; acesso em 18 jul. 2026.
- BRASIL. Ministério do Planejamento, Desenvolvimento e Gestão. [Documento de Referência e-PING, versão 2018](https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/ePING_v2018_20171205.pdf). Publicado em dez. 2017; acesso em 18 jul. 2026.
- IETF. [RFC 8200: Internet Protocol, Version 6](https://www.rfc-editor.org/rfc/rfc8200.html). Jul. 2017; acesso em 18 jul. 2026.
- IETF. [RFC 9293: Transmission Control Protocol](https://www.rfc-editor.org/rfc/rfc9293.html). Ago. 2022; acesso em 18 jul. 2026.
- IETF. [RFC 768: User Datagram Protocol](https://www.rfc-editor.org/rfc/rfc768.html). Ago. 1980; acesso em 18 jul. 2026.
- IETF. [RFC 1918: Address Allocation for Private Internets](https://www.rfc-editor.org/rfc/rfc1918.html). Fev. 1996; acesso em 18 jul. 2026.
- IETF. [RFC 1034: Domain Names — Concepts and Facilities](https://www.rfc-editor.org/rfc/rfc1034.html) e [RFC 1035: Domain Names — Implementation and Specification](https://www.rfc-editor.org/rfc/rfc1035.html). Nov. 1987; acesso em 18 jul. 2026.
- IETF. [RFC 2131: Dynamic Host Configuration Protocol](https://www.rfc-editor.org/rfc/rfc2131.html). Mar. 1997; acesso em 18 jul. 2026.
- IETF. [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html). Jun. 2022; acesso em 18 jul. 2026.
- IETF. [RFC 5321: Simple Mail Transfer Protocol](https://www.rfc-editor.org/rfc/rfc5321.html). Out. 2008; acesso em 18 jul. 2026.
- IETF. [RFC 959: File Transfer Protocol](https://www.rfc-editor.org/rfc/rfc959.html). Out. 1985; acesso em 18 jul. 2026.
- IETF. [RFC 4217: Securing FTP with TLS](https://www.rfc-editor.org/rfc/rfc4217.html). Out. 2005; acesso em 18 jul. 2026.
- IETF. [RFC 4254: The Secure Shell Connection Protocol](https://www.rfc-editor.org/rfc/rfc4254.html). Jan. 2006; acesso em 18 jul. 2026.
- IETF. [SSH File Transfer Protocol, Internet-Draft arquivado](https://datatracker.ietf.org/doc/html/draft-ietf-secsh-filexfer-13). Jul. 2006; acesso em 18 jul. 2026.
- IANA. [Registro de nomes de serviços e números de portas](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml). Acesso em 18 jul. 2026.
