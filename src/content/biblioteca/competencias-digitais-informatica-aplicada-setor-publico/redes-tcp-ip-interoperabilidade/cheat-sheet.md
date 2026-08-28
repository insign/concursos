# Redes, TCP/IP e interoperabilidade

## Roteiro

**Alcance → equipamento → camada → identificador → protocolo → serviço → diagnóstico → interoperabilidade.**

## Alcance

| Tipo | Área típica |
|---|---|
| <abbr title="rede de área pessoal">PAN</abbr> | pessoal |
| <abbr title="rede de área local">LAN</abbr> | sala, prédio, campus |
| <abbr title="rede de área metropolitana">MAN</abbr> | cidade/região metropolitana |
| <abbr title="rede de longa distância">WAN</abbr> | regiões, países, mundo |

- Internet = redes interconectadas.
- Web = serviço sobre <abbr title="Hypertext Transfer Protocol">HTTP</abbr>/<abbr title="HTTP protegido por TLS">HTTPS</abbr>.
- Intranet = tecnologias de Internet em ambiente restrito.
- Extranet = acesso externo autorizado a parte da intranet.

## Equipamentos e camadas

| Equipamento | Função | <abbr title="Open Systems Interconnection">OSI</abbr> |
|---|---|---:|
| hub | repete sinais | 1 |
| switch | encaminha por MAC | 2 |
| roteador | encaminha por IP | 3 |
| ponto de acesso | liga Wi‑Fi à LAN | 2, tipicamente |
| firewall | aplica política | depende da implementação |

## OSI × TCP/IP

| OSI | <abbr title="Transmission Control Protocol / Internet Protocol">TCP/IP</abbr> |
|---|---|
| Aplicação + Apresentação + Sessão | Aplicação |
| Transporte | Transporte |
| Rede | Internet |
| Enlace + Física | Acesso à Rede |

**Dados → segmento/datagrama → pacote → quadro → bits.**

## Identificadores

| Item | Identifica |
|---|---|
| MAC | interface no enlace |
| IP | interface/host na rede |
| porta | serviço/processo |
| domínio | nome resolvido por <abbr title="Domain Name System">DNS</abbr> |
| socket | IP + transporte + porta |

## IPv4 especial

| Faixa | Uso |
|---|---|
| `10.0.0.0/8` | privado |
| `172.16.0.0/12` | privado |
| `192.168.0.0/16` | privado |
| `127.0.0.0/8` | loopback |
| `169.254.0.0/16` | link-local/<abbr title="Automatic Private IP Addressing">APIPA</abbr> |
| `0.0.0.0` | não especificado |

## Sub-redes

| Prefixo | Bloco | Hosts usuais |
|---:|---:|---:|
| `/24` | 256 | 254 |
| `/25` | 128 | 126 |
| `/26` | 64 | 62 |
| `/27` | 32 | 30 |
| `/28` | 16 | 14 |
| `/29` | 8 | 6 |

`220.42.17.0/29`:

- rede `.0`;
- hosts `.1` a `.6`;
- broadcast `.7`.

Broadcast não pode ser gateway.

## NAT

| Técnica | Tradução |
|---|---|
| <abbr title="Network Address Translation">NAT</abbr> | endereço |
| <abbr title="tradução de endereço e porta">NAPT/PAT</abbr> | endereço + porta |

NAT ≠ DHCP ≠ firewall ≠ criptografia.

## IPv6

- 128 bits;
- `::1` loopback;
- `::` não especificado;
- `fe80::/10` link-local;
- sem broadcast;
- <abbr title="Neighbor Discovery Protocol">NDP</abbr> substitui/amplia funções do <abbr title="Address Resolution Protocol">ARP</abbr>;
- <abbr title="Stateless Address Autoconfiguration">SLAAC</abbr> e <abbr title="Dynamic Host Configuration Protocol for IPv6">DHCPv6</abbr> podem coexistir.

## Transporte e controle

| Protocolo | Regra |
|---|---|
| <abbr title="Transmission Control Protocol">TCP</abbr> | conexão, ordem, confirmação, retransmissão |
| <abbr title="User Datagram Protocol">UDP</abbr> | datagramas, sem garantias intrínsecas |
| <abbr title="Internet Control Message Protocol">ICMP</abbr> | controle, erro e diagnóstico |

- TCP: `SYN → SYN-ACK → ACK`.
- `ping` usa ICMP, não porta TCP/UDP.
- Sem resposta a ping ≠ serviço certamente inativo.

## Serviços básicos

| Protocolo | Finalidade |
|---|---|
| DNS | nomes e registros |
| <abbr title="Dynamic Host Configuration Protocol">DHCP</abbr> | configuração automática |
| ARP | IPv4 local → MAC |
| NDP | vizinhos/roteadores no IPv6 |
| HTTP | Web/APIs |
| HTTPS | HTTP sobre TLS |
| <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> | envio/transferência de e-mail |
| <abbr title="Internet Message Access Protocol">IMAP</abbr> | acesso e sincronização no servidor |
| <abbr title="Post Office Protocol - Version 3">POP3</abbr> | obtenção de mensagens |
| <abbr title="File Transfer Protocol">FTP</abbr> | transferência clássica |
| <abbr title="FTP protegido por TLS">FTPS</abbr> | FTP + TLS |
| <abbr title="SSH File Transfer Protocol">SFTP</abbr> | transferência sobre SSH |

## DNS

| Registro | Uso |
|---|---|
| A | IPv4 |
| AAAA | IPv6 |
| CNAME | alias |
| MX | correio |
| NS | servidor autoritativo |
| PTR | reverso |

## DHCPv4

**DORA:** Discover → Offer → Request → Acknowledgment.

Pode fornecer IP, máscara, gateway, DNS e concessão. Reserva mantém administração DHCP com configuração estável.

## HTTP

| Método | Função |
|---|---|
| GET | obter |
| HEAD | metadados sem corpo |
| POST | submeter/processar |
| PUT | criar/substituir alvo |
| DELETE | remover |

| Código | Ideia |
|---:|---|
| 200 | sucesso |
| 201 | criado |
| 204 | sem conteúdo |
| 301/302 | redirecionamento |
| 304 | cache validado |
| 400 | requisição inválida |
| 401 | autenticação exigida |
| 403 | acesso recusado |
| 404 | não encontrado |
| 405 | método não permitido |
| 500 | erro interno |
| 502 | resposta inválida a montante |
| 503 | indisponível |
| 504 | tempo excedido no gateway |

- HTTP “seguro” ≠ criptografado.
- HTTP/3 usa QUIC sobre UDP.

## Comandos

| Comando | Diagnóstico |
|---|---|
| `ipconfig /all` | IP, máscara, gateway, DHCP, DNS, MAC |
| `ipconfig /release` | libera DHCPv4 |
| `ipconfig /renew` | renova DHCPv4 |
| `ipconfig /flushdns` | limpa cache DNS |
| `ping` | resposta ICMP |
| `tracert` | saltos |
| `nslookup` | DNS |
| `arp -a` | cache IPv4–MAC |
| `netstat -ano` | conexões, portas e PID |
| `netstat -r` | rotas |

## Sintoma → hipótese

| Sintoma | Investigar |
|---|---|
| `169.254.x.x` | DHCP/APIPA |
| IP funciona, nome não | DNS |
| LAN funciona, remoto não | gateway, máscara, rota |
| ping funciona, aplicação não | porta, processo, firewall |
| `tracert` com `*` | salto não respondeu; não prova queda total |

## Interoperabilidade

| Dimensão | Pergunta |
|---|---|
| técnica | conecta e transporta? |
| semântica | significa a mesma coisa? |
| organizacional | processos e responsáveis estão alinhados? |
| jurídica, complementar | finalidade, competência, sigilo e proteção estão atendidos? |

| Termo | Papel |
|---|---|
| API | contrato/interface |
| REST | estilo arquitetural |
| HTTP | protocolo |
| JSON/XML | representação |
| OpenAPI | descrição de API HTTP |

- API ≠ REST ≠ HTTP ≠ JSON.
- <abbr title="Padrões de Interoperabilidade de Governo Eletrônico">e-PING</abbr>: padrões mínimos no contexto federal definido.
- e-PING não obriga automaticamente todo órgão brasileiro.
- interoperabilidade não autoriza compartilhamento irrestrito.

## Pegadinhas

- Internet ≠ Web.
- switch ≠ roteador.
- MAC ≠ IP ≠ porta.
- DNS ≠ DHCP ≠ ARP.
- NAT ≠ firewall.
- IPv6 não usa ARP nem broadcast.
- TCP confiável ≠ infalível.
- UDP pode sustentar aplicações confiáveis.
- ICMP não usa porta.
- HTTPS não corrige autorização ruim.
- SMTP envia; IMAP/POP3 acessam.
- FTPS ≠ SFTP.
- endereço de rede/broadcast ≠ host/gateway.
- conexão técnica ≠ interoperabilidade completa.
