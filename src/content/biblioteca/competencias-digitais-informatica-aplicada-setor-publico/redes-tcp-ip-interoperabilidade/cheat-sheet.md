# Redes, <abbr title="Transmission Control Protocol e Internet Protocol">TCP/IP</abbr> e interoperabilidade

## Mapa de decisão

**Alcance e acesso → enlace (trecho de comunicação direta) → endereço e rota → transporte → serviço → significado e autorização.** Comunicação local, Internet, Web e permissão são coisas diferentes: uma <abbr title="Local Area Network">LAN</abbr> pode funcionar sem Internet; uma <abbr title="Wide Area Network">WAN</abbr> pode ser privada; intranet restringe acesso e extranet permite acesso externo autorizado a parte dela.

| Alcance | <abbr title="Personal Area Network">PAN</abbr> | <abbr title="Local Area Network">LAN</abbr> | <abbr title="Metropolitan Area Network">MAN</abbr> | <abbr title="Wide Area Network">WAN</abbr> |
|---|---|---|---|---|
| Área típica | pessoal | prédio/campus | cidade | regiões/países |

## Do sinal ao destino

| Função | Decide com base em | Unidade / camada <abbr title="Open Systems Interconnection">OSI</abbr> típica |
|---|---|---|
| hub | repete sinais, sem escolher destinatário | bits / 1 |
| switch | aprende porta e encaminha por endereço <abbr title="Media Access Control">MAC</abbr> | quadro / 2 |
| roteador | escolhe próximo salto pela rota e endereço <abbr title="Internet Protocol">IP</abbr> | pacote / 3 |
| ponto de acesso | liga dispositivos <abbr title="Tecnologia de rede local sem fio">Wi-Fi</abbr> à rede local, usualmente como ponte | enlace / 2 |
| firewall | permite ou bloqueia tráfego conforme política | depende da implementação |

O mesmo aparelho pode reunir funções distintas. Topologia **estrela** liga dispositivos a um centro; **barramento**, a um cabo principal; **anel**, a um circuito; **malha**, a múltiplas interligações. A topologia física pode diferir da circulação lógica. Ethernet clássica, Fast Ethernet e Gigabit Ethernet indicam 10, 100 e 1.000 megabits por segundo nominais, sem garantir taxa útil.

| Modelo <abbr title="Open Systems Interconnection">OSI</abbr> (7 camadas) | Modelo <abbr title="Transmission Control Protocol e Internet Protocol">TCP/IP</abbr> (4 camadas) | Papel |
|---|---|---|
| Aplicação, Apresentação, Sessão | Aplicação | serviços, representação e diálogo |
| Transporte | Transporte | processos, portas, entrega |
| Rede | Internet | endereço e rota |
| Enlace, Física | Acesso à rede | quadros e sinais no trecho |

Encapsulamento: **dados → segmento <abbr title="Transmission Control Protocol">TCP</abbr> ou datagrama <abbr title="User Datagram Protocol">UDP</abbr> → pacote <abbr title="Internet Protocol">IP</abbr> → quadro → bits.** Um <abbr title="Media Access Control">MAC</abbr> identifica interface no enlace; <abbr title="Internet Protocol">IP</abbr> identifica destino lógico; porta identifica serviço/processo no protocolo de transporte. Um *socket* é o ponto de comunicação formado por endereço <abbr title="Internet Protocol">IP</abbr> e porta no contexto desse transporte.

## Endereçar, dividir, encaminhar

<abbr title="Internet Protocol version 4">IPv4</abbr> tem **32 bits**, quatro octetos de 0 a 255. O prefixo `/p` indica os bits de rede; numa sub-rede convencional há `2^(32-p)` endereços e `2^(32-p)-2` hosts usuais, descontando rede e broadcast (endereço de envio coletivo da sub-rede). Para 1.000 hosts, dez bits de host dão 1.022 utilizáveis: **`/22`, máscara `255.255.252.0`**. Exceções: `/31` usa ambos endereços em enlace ponto a ponto; `/32` identifica um endereço.

| Prefixo | Máscara | Bloco / hosts usuais |
|---|---|---|
| `/24` | `255.255.255.0` | 256 / 254 |
| `/26` | `255.255.255.192` | 64 / 62 |
| `/27` | `255.255.255.224` | 32 / 30 |
| `/29` | `255.255.255.248` | 8 / 6 |

**Cálculo de bloco:** alinhe o endereço a um múltiplo do tamanho do bloco no octeto variável; primeiro é rede, último é broadcast, intermediários são hosts. Em `192.168.10.64/26`, rede `.64`, hosts `.65`–`.126`, broadcast `.127`. O gateway (roteador usado para sair da rede) deve ser endereço alcançável de host, jamais broadcast. Classe histórica não substitui o prefixo informado.

| Faixa <abbr title="Internet Protocol version 4">IPv4</abbr> | Uso |
|---|---|
| `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` | privado; **nem todo `172.x.x.x` é privado** |
| `127.0.0.0/8` | loopback: próprio dispositivo |
| `169.254.0.0/16` | link-local: apenas enlace; no Windows, <abbr title="Automatic Private IP Addressing">APIPA</abbr> sugere falha de configuração automática |
| `0.0.0.0` | não especificado; rota padrão `0.0.0.0/0` é outro uso |

No mesmo prefixo, o quadro vai ao destino local; fora dele, ao <abbr title="Media Access Control">MAC</abbr> do **próximo roteador** (gateway), enquanto o pacote conserva o <abbr title="Internet Protocol">IP</abbr> remoto, ressalvada tradução. <abbr title="Address Resolution Protocol">ARP</abbr> descobre <abbr title="Internet Protocol version 4">IPv4</abbr> → <abbr title="Media Access Control">MAC</abbr> no enlace, sem consultar o servidor distante. Entre rotas compatíveis prevalece o **prefixo mais específico**; rota estática é configurada, dinâmica pode ser aprendida/atualizada por protocolo. <abbr title="Network Address Translation">NAT</abbr> traduz endereço; <abbr title="Network Address Port Translation">NAPT</abbr>/<abbr title="Port Address Translation">PAT</abbr> traduz também portas para distinguir comunicações. Nenhum deles substitui filtragem, configuração automática ou criptografia.

## Configuração, nomes e versão 6

| Pergunta | Mecanismo |
|---|---|
| Como obter endereço, máscara, gateway e servidores? | <abbr title="Dynamic Host Configuration Protocol">DHCP</abbr>; negociação inicial <abbr title="Dynamic Host Configuration Protocol for Internet Protocol version 4">DHCPv4</abbr> **<abbr title="Discover, Offer, Request, Acknowledgment">DORA</abbr>**; concessão tem prazo. Reserva associa cliente a endereço estável sob administração do servidor; exclusão retira endereços da distribuição automática. |
| Que dados pertencem a um nome? | <abbr title="Domain Name System">DNS</abbr>: `A` → <abbr title="Internet Protocol version 4">IPv4</abbr>, `AAAA` → <abbr title="Internet Protocol version 6">IPv6</abbr>, `CNAME` → apelido do nome canônico, `MX` → correio, `NS` → servidor autoritativo, `PTR` → nome em consulta reversa. Usa <abbr title="User Datagram Protocol">UDP</abbr> ou <abbr title="Transmission Control Protocol">TCP</abbr> 53 convencionalmente. |
| Qual vizinho recebe o quadro? | <abbr title="Address Resolution Protocol">ARP</abbr> no <abbr title="Internet Protocol version 4">IPv4</abbr>; descoberta de vizinhos no <abbr title="Internet Protocol version 6">IPv6</abbr>. |

<abbr title="Internet Protocol version 6">IPv6</abbr> tem **128 bits**, oito grupos hexadecimais de 16 bits. Omita zeros **à esquerda** de cada grupo; `::` comprime uma sequência de grupos inteiramente nulos **uma única vez**. Validade de escrita difere da forma canônica: esta usa minúsculas, comprime a maior sequência (a primeira em empate) e não comprime um grupo zero isolado. `::1` é loopback; `::` é não especificado; `fe80::/10` é link-local. Não usa broadcast nem <abbr title="Address Resolution Protocol">ARP</abbr>; o <abbr title="Neighbor Discovery Protocol">NDP</abbr>, apoiado em <abbr title="Internet Control Message Protocol version 6">ICMPv6</abbr>, descobre vizinhos e roteadores. <abbr title="Stateless Address Autoconfiguration">SLAAC</abbr> usa anúncios de roteador; <abbr title="Dynamic Host Configuration Protocol for Internet Protocol version 6">DHCPv6</abbr> pode coexistir e não fornece o roteador padrão nem reproduz <abbr title="Discover, Offer, Request, Acknowledgment">DORA</abbr>.

## Transporte, serviços e portas

| Protocolo | Lembrete de decisão |
|---|---|
| <abbr title="Transmission Control Protocol">TCP</abbr> | conexão `SYN → SYN-ACK → ACK`; confirmações, sequência e retransmissão oferecem fluxo ordenado, sujeito a falha definitiva; controle de fluxo e congestionamento são diferentes |
| <abbr title="User Datagram Protocol">UDP</abbr> | datagramas sem garantia própria de entrega, ordem ou retransmissão; aplicações podem acrescentar confiabilidade |
| <abbr title="Internet Control Message Protocol">ICMP</abbr> | controle/diagnóstico; `ping` não testa porta <abbr title="Transmission Control Protocol">TCP</abbr>/<abbr title="User Datagram Protocol">UDP</abbr> |
| <abbr title="Hypertext Transfer Protocol">HTTP</abbr>/<abbr title="Hypertext Transfer Protocol Secure">HTTPS</abbr> | pedido/resposta; <abbr title="Hypertext Transfer Protocol Secure">HTTPS</abbr> protege canal com <abbr title="Transport Layer Security">TLS</abbr>, não garante conteúdo honesto ou autorização correta; <abbr title="Hypertext Transfer Protocol version 3">HTTP/3</abbr> usa <abbr title="Protocolo de transporte seguro e confiável sobre datagramas">QUIC</abbr> sobre <abbr title="User Datagram Protocol">UDP</abbr> |
| <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> / <abbr title="Internet Message Access Protocol">IMAP</abbr> / <abbr title="Post Office Protocol version 3">POP3</abbr> | envio e transferência / acesso sincronizado no servidor / obtenção, com permanência de cópia conforme configuração |
| <abbr title="File Transfer Protocol">FTP</abbr> / <abbr title="File Transfer Protocol Secure">FTPS</abbr> / <abbr title="Secure Shell File Transfer Protocol">SFTP</abbr> | controle e dados separados / <abbr title="File Transfer Protocol">FTP</abbr> protegido por <abbr title="Transport Layer Security">TLS</abbr> / protocolo distinto sobre <abbr title="Secure Shell">SSH</abbr> |

Portas de referência: <abbr title="Domain Name System">DNS</abbr> 53; <abbr title="Dynamic Host Configuration Protocol for Internet Protocol version 4">DHCPv4</abbr> 67 servidor/68 cliente, <abbr title="User Datagram Protocol">UDP</abbr>; <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 80; <abbr title="Hypertext Transfer Protocol Secure">HTTPS</abbr> 443; <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> 25 entre servidores e 587 para submissão; <abbr title="Internet Message Access Protocol">IMAP</abbr> 143/993 protegido; <abbr title="Post Office Protocol version 3">POP3</abbr> 110/995 protegido; <abbr title="File Transfer Protocol">FTP</abbr> 21 controle (dados no ativo clássico a partir de 20; passivo negociado); <abbr title="Secure Shell">SSH</abbr>/<abbr title="Secure Shell File Transfer Protocol">SFTP</abbr> 22. Uma porta convencional não prova serviço ativo.

Em <abbr title="Hypertext Transfer Protocol">HTTP</abbr>, `GET` obtém, `HEAD` retorna metadados sem corpo, `POST` submete para processamento, `PUT` cria/substitui recurso-alvo, `DELETE` solicita remoção. Métodos **seguros** como `GET`/`HEAD` não solicitam mudança de estado como finalidade; “seguro” aqui não significa criptografado. Códigos úteis: 200 sucesso, 201 criado, 204 sem corpo, 301/302 redirecionamento, 304 cópia temporária em cache validada, 400 pedido inválido, 401 credencial exigida, 403 recusado, 404 ausente, 405 método não permitido, 500 erro interno, 502/504 resposta inválida/tempo excedido no intermediário, 503 indisponível.

## Diagnóstico: indício não é conclusão

| Se... | Confira... |
|---|---|
| `169.254.x.x` sem gateway | concessão <abbr title="Dynamic Host Configuration Protocol">DHCP</abbr> / <abbr title="Automatic Private IP Addressing">APIPA</abbr> |
| endereço funciona, nome não | <abbr title="Domain Name System">DNS</abbr> com `nslookup`; `ipconfig /flushdns` limpa apenas cache local |
| rede local funciona, remoto não | máscara, gateway e rota com `ipconfig /all`, `netstat -r` |
| `ping` responde, aplicação não | processo/porta e firewall com `netstat -ano`; `ping` usa <abbr title="Internet Control Message Protocol">ICMP</abbr> |
| `tracert` mostra `*` | salto não respondeu à sondagem; não prova que parou de encaminhar |

`arp -a` mostra associações <abbr title="Internet Protocol version 4">IPv4</abbr>–<abbr title="Media Access Control">MAC</abbr>. `ipconfig /release` libera concessão <abbr title="Dynamic Host Configuration Protocol for Internet Protocol version 4">DHCPv4</abbr> e pode cortar a conexão; `/renew` solicita renovação. Silêncio em `ping` pode decorrer de bloqueio a eco.

## Interoperabilidade pública

| Dimensão | Pergunta |
|---|---|
| técnica | sistemas conectam e processam formatos/protocolos? |
| semântica | códigos e unidades significam a mesma coisa? |
| organizacional | processos, responsáveis e acordos se alinham? |

Uma <abbr title="Application Programming Interface">API</abbr> é contrato de operações; <abbr title="Representational State Transfer">REST</abbr> é estilo arquitetural de interação com recursos; <abbr title="Hypertext Transfer Protocol">HTTP</abbr> transporta pedidos; <abbr title="JavaScript Object Notation">JSON</abbr>/<abbr title="Extensible Markup Language">XML</abbr> representam dados; <abbr title="Especificação para descrever interfaces de serviços web">OpenAPI</abbr> descreve interface <abbr title="Hypertext Transfer Protocol">HTTP</abbr>. Um formato comum não iguala significados, e <abbr title="Hypertext Transfer Protocol">HTTP</abbr> com <abbr title="JavaScript Object Notation">JSON</abbr> não implica <abbr title="Representational State Transfer">REST</abbr>.

<abbr title="Padrões de Interoperabilidade de Governo Eletrônico">e-PING</abbr> organiza padrões no Executivo federal; sua referência de 2018 apresenta **três** dimensões acima. Integrantes do <abbr title="Sistema de Administração dos Recursos de Tecnologia da Informação">SISP</abbr> observam a adoção nas aquisições/atualizações; demais Poderes e entes podem adotá-la, sem obrigação automática. Análise jurídica é indispensável, mas não é uma quarta dimensão oficial daquela versão. A Lei nº 14.129/2021 tem âmbito federativo condicionado à adoção por ato próprio para demais entes; finalidade, competência, sigilo e proteção de dados limitam o compartilhamento mesmo quando a integração técnica funciona.
