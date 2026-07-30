---
schemaVersion: 1
title: "Redes de computadores, protocolos TCP/IP e interoperabilidade"
description: Conceitos de redes, modelos OSI e TCP/IP, endereçamento IPv4 e IPv6, protocolos, diagnóstico e interoperabilidade de sistemas no setor público.
order: 24
storageId: redes-tcp-ip-interoperabilidade
---

## 1. Recorte do assunto

O edital cobra conceitos básicos de redes de computadores — LAN, WAN e Internet —, protocolos da suíte TCP/IP, HTTP, SMTP, FTP e noções de interoperabilidade de sistemas no setor público. O foco é reconhecer **função, camada, alcance, endereço, protocolo e efeito operacional**.

A referência prática principal para comandos é o Windows atual. Quando um comportamento depender de sistema operacional, versão, política de segurança, configuração regional ou implementação, essa condição deve ser considerada.

> **Roteiro de resolução:** alcance da rede → equipamento → camada → identificador → protocolo → porta/serviço → diagnóstico → interoperabilidade.

---

## 2. Rede, protocolo e arquitetura

Uma **rede de computadores** interliga dispositivos para troca de dados e compartilhamento de recursos. Um **protocolo** define regras de comunicação: formato, sequência, endereçamento, tratamento de erros e comportamento das partes.

### 2.1 Cliente-servidor e ponto a ponto

| Modelo | Característica |
|---|---|
| cliente-servidor | clientes solicitam serviços a servidores especializados |
| ponto a ponto (P2P) | participantes podem atuar como clientes e servidores |

Cliente-servidor não significa que exista apenas um servidor físico. P2P não significa ausência de protocolo ou segurança.

### 2.2 Alcance geográfico

| Tipo | Alcance típico |
|---|---|
| PAN | área pessoal, muito curta |
| LAN | sala, prédio ou campus |
| MAN | área metropolitana |
| WAN | regiões, países ou continentes |

- **Internet:** rede pública mundial formada por redes interconectadas.
- **Web:** serviço de documentos e aplicações acessados principalmente por HTTP/HTTPS; é parte da Internet.
- **intranet:** uso de tecnologias de Internet em ambiente restrito à organização.
- **extranet:** parte controlada da intranet disponibilizada a usuários externos autorizados.

Internet não é sinônimo de Web; uma rede pode usar TCP/IP sem estar conectada à Internet.

---

## 3. Topologias, meios e equipamentos

### 3.1 Topologias

- **estrela:** dispositivos ligados a um ponto central; comum em Ethernet com switches;
- **barramento:** meio compartilhado linear;
- **anel:** cada nó se liga aos vizinhos em circuito;
- **malha:** múltiplos caminhos entre nós;
- **híbrida:** combinação de topologias.

Topologia física descreve conexões materiais; topologia lógica descreve o fluxo de comunicação.

### 3.2 Meios

- par trançado;
- fibra óptica;
- rádio, como Wi‑Fi;
- enlaces de operadora, micro-ondas ou satélite, conforme a rede.

Ethernet não significa apenas um tipo de cabo. Wi‑Fi não é sinônimo de Internet.

### 3.3 Equipamentos

| Equipamento | Função típica |
|---|---|
| hub | repete sinais para todas as portas; camada física |
| switch | encaminha quadros com base em endereços MAC; enlace |
| roteador | encaminha pacotes entre redes IP; camada de rede |
| ponto de acesso | conecta clientes sem fio à rede local |
| modem/ONT | adapta o acesso ao meio da operadora |
| firewall | aplica política de filtragem e controle de tráfego |

Um equipamento moderno pode acumular funções. Ainda assim, em prova, identifique a **função cobrada**, não apenas o nome comercial do aparelho.

### 3.4 Ethernet e Wi‑Fi

| Tecnologia | Associação | Taxa clássica |
|---|---|---:|
| Ethernet | IEEE 802.3 | 10 Mb/s |
| Fast Ethernet | IEEE 802.3 | 100 Mb/s |
| Gigabit Ethernet | IEEE 802.3 | 1 Gb/s |
| Wi‑Fi | família IEEE 802.11 | depende do padrão e condições |

Taxa nominal não garante taxa útil integral: cabeçalhos, interferência, distância, retransmissões e compartilhamento do meio afetam o desempenho.

---

## 4. Modelos OSI e TCP/IP

### 4.1 OSI

| Camada | Função resumida | Exemplos |
|---:|---|---|
| 7 Aplicação | serviços às aplicações | HTTP, DNS, SMTP, FTP |
| 6 Apresentação | representação, codificação e transformação | formatos, compressão, criptografia como função conceitual |
| 5 Sessão | controle de diálogos e sessões | estabelecimento e sincronização conceituais |
| 4 Transporte | comunicação fim a fim | TCP, UDP, portas |
| 3 Rede | endereçamento e roteamento | IP, roteador |
| 2 Enlace | quadros e acesso ao meio | Ethernet, MAC, switch |
| 1 Física | bits e sinais | cabos, rádio, hub |

### 4.2 TCP/IP

| TCP/IP | Aproximação com OSI |
|---|---|
| Aplicação | aplicação, apresentação e sessão |
| Transporte | transporte |
| Internet | rede |
| Acesso à Rede | enlace e física |

O modelo é uma abstração. Implementações reais não precisam expor limites perfeitos entre camadas.

### 4.3 Encapsulamento

No envio, cada camada acrescenta informações de controle:

```text
Dados da aplicação → segmento/datagrama → pacote IP → quadro → bits
```

No recebimento, ocorre o processo inverso. O nome da unidade varia conforme a camada e a convenção: **segmento** para TCP, **datagrama** para UDP/IP e **quadro** no enlace.

---

## 5. MAC, IP, porta, domínio e socket

| Identificador | O que identifica |
|---|---|
| MAC | interface no enlace local |
| IP | interface/host de forma lógica na rede |
| porta | serviço ou processo de transporte |
| domínio | nome resolvido por DNS |
| socket | ponto de comunicação composto por endereço, transporte e porta |

Um mesmo serviço pode usar diferentes endereços IP. Uma mesma máquina pode oferecer vários serviços em portas distintas. Porta não é endereço físico.

---

## 6. IPv4 e sub-redes

IPv4 usa 32 bits, normalmente escritos em quatro octetos decimais.

### 6.1 Faixas especiais

| Faixa/endereço | Uso |
|---|---|
| `10.0.0.0/8` | privado |
| `172.16.0.0/12` | privado |
| `192.168.0.0/16` | privado |
| `127.0.0.0/8` | loopback; exemplo usual `127.0.0.1` |
| `169.254.0.0/16` | IPv4 link-local/APIPA |
| `0.0.0.0` | endereço não especificado em contextos próprios |

Endereço privado é válido dentro da rede privada, mas não é roteado diretamente na Internet pública.

### 6.2 Prefixo e máscara

O prefixo `/24` indica 24 bits de rede:

```text
Rede:       192.168.10.0/24
Máscara:    255.255.255.0
Broadcast:  192.168.10.255
Hosts:      192.168.10.1 a 192.168.10.254
```

No IPv4 tradicional, o primeiro endereço do bloco identifica a rede e o último é o broadcast. A faixa utilizável fica entre eles, salvo casos especiais.

### 6.3 Tamanhos de blocos

| Prefixo | Endereços por bloco | Hosts usuais |
|---:|---:|---:|
| `/25` | 128 | 126 |
| `/26` | 64 | 62 |
| `/27` | 32 | 30 |
| `/28` | 16 | 14 |
| `/29` | 8 | 6 |

Exemplo `220.42.17.0/29`:

```text
Rede:       220.42.17.0
Hosts:      220.42.17.1 a 220.42.17.6
Broadcast:  220.42.17.7
```

Logo, `220.42.17.7` não pode ser gateway de hosts desse bloco: é broadcast.

### 6.4 Destino local e remoto

A máscara determina se o destino pertence à mesma sub-rede:

- destino local: o host tenta resolver o MAC do destino;
- destino remoto: o host envia o quadro ao MAC do gateway padrão.

O gateway deve ser alcançável pela interface, normalmente na mesma sub-rede local.

### 6.5 APIPA

Um endereço `169.254.x.x` em Windows pode indicar autoconfiguração IPv4 link-local quando não foi obtida uma concessão DHCP válida. Ele pode permitir comunicação limitada no enlace, mas normalmente não fornece gateway e DNS adequados para acesso externo.

---

## 7. NAT, NAPT/PAT e firewall

| Técnica | Tradução |
|---|---|
| NAT básico | endereço interno ↔ endereço externo |
| NAPT/PAT | endereço e porta; vários hosts compartilham um IPv4 público |

Pegadinhas:

- NAT não distribui endereços; DHCP faz isso;
- NAT não é sinônimo de firewall;
- NAT não fornece criptografia;
- o compartilhamento de um único IPv4 público por muitos dispositivos normalmente envolve tradução de portas.

Firewall aplica política de tráfego. Ele pode bloquear ou permitir por endereço, porta, protocolo, estado e outras características, conforme o produto.

---

## 8. IPv6

IPv6 usa 128 bits, escritos em oito grupos hexadecimais. Zeros à esquerda podem ser omitidos e uma sequência contínua de grupos zero pode ser comprimida uma vez com `::`.

| Endereço/faixa | Uso |
|---|---|
| `::1` | loopback |
| `::` | não especificado |
| `fe80::/10` | link-local |

IPv6 não possui broadcast. Usa multicast e outros mecanismos.

### 8.1 NDP

O Neighbor Discovery Protocol, baseado em ICMPv6, é usado para:

- descobrir vizinhos e seus endereços de enlace;
- encontrar roteadores;
- receber informações de prefixo;
- verificar alcançabilidade;
- detectar endereços duplicados.

No IPv6, não se usa ARP; funções equivalentes e ampliadas ficam no NDP.

### 8.2 SLAAC e DHCPv6

- **SLAAC:** autoconfiguração baseada em anúncios de roteadores;
- **DHCPv6:** fornece parâmetros e pode atribuir endereços ou prefixos;
- podem operar isoladamente ou em conjunto.

Não presuma que DHCPv6 repete exatamente o processo DORA do DHCPv4.

---

## 9. TCP, UDP e ICMP

### 9.1 TCP

TCP é orientado à conexão e oferece, entre outros recursos:

- numeração de sequência;
- confirmações;
- retransmissão;
- entrega ordenada ao fluxo da aplicação;
- controle de fluxo;
- controle de congestionamento.

A abertura clássica usa três etapas: `SYN`, `SYN-ACK`, `ACK`.

Confiabilidade do transporte não garante que aplicação, servidor, rede ou armazenamento nunca falhem.

### 9.2 UDP

UDP é orientado a datagramas e não oferece intrinsecamente:

- conexão;
- confirmação;
- retransmissão;
- ordenação.

Isso reduz sobrecarga. A aplicação pode implementar mecanismos próprios de confiabilidade. DNS, voz, vídeo e QUIC podem usar UDP conforme o cenário.

### 9.3 ICMP

ICMP transporta mensagens de controle, erro e diagnóstico.

- `ping` usa Echo Request e Echo Reply;
- respostas de tempo excedido ajudam `tracert` a identificar saltos;
- ICMP não usa porta TCP ou UDP;
- ausência de resposta ICMP não prova, sozinha, que um serviço está inativo.

---

## 10. DNS, DHCP, ARP e gateway

### 10.1 DNS

DNS resolve nomes e publica registros.

| Registro | Uso comum |
|---|---|
| A | nome → IPv4 |
| AAAA | nome → IPv6 |
| CNAME | alias |
| MX | servidores de correio do domínio |
| NS | servidores autoritativos |
| PTR | resolução reversa |
| TXT | texto e políticas diversas |

DNS não distribui endereço IP aos clientes; DHCP faz isso.

### 10.2 DHCPv4

O processo básico é frequentemente resumido por **DORA**:

1. Discover;
2. Offer;
3. Request;
4. Acknowledgment.

O servidor pode fornecer endereço, máscara, gateway, DNS e tempo de concessão. Uma reserva associa configuração estável a um cliente sem abandonar a administração DHCP.

### 10.3 ARP

ARP associa endereço IPv4 local a endereço MAC. Atua no enlace local. Para destino remoto, o host resolve o MAC do gateway, não o MAC do servidor remoto.

### 10.4 Gateway padrão

É o roteador usado para destinos fora da sub-rede local. Gateway incorreto, máscara incorreta ou ausência de rota podem permitir comunicação local e impedir acesso remoto.

---

## 11. Roteamento

| Tipo | Característica |
|---|---|
| estático | rotas configuradas manualmente |
| dinâmico | rotas aprendidas e ajustadas por protocolos de roteamento |

Roteamento estático é simples e previsível, mas não se adapta sozinho. Roteamento dinâmico troca informações e reage a mudanças, com maior complexidade.

A rota padrão é usada quando nenhuma rota mais específica corresponde ao destino.

---

## 12. Protocolos de aplicação

### 12.1 HTTP e HTTPS

HTTP segue o modelo requisição-resposta. HTTPS é HTTP protegido por TLS.

| Método | Finalidade principal |
|---|---|
| GET | obter representação |
| HEAD | obter metadados sem corpo da resposta |
| POST | submeter conteúdo para processamento |
| PUT | criar ou substituir o recurso-alvo |
| DELETE | solicitar remoção |

| Código | Ideia |
|---:|---|
| 200 | sucesso |
| 201 | criado |
| 204 | sucesso sem conteúdo |
| 301/302 | redirecionamento |
| 304 | validação de cache |
| 400 | requisição inválida |
| 401 | autenticação exigida/credenciais válidas ausentes |
| 403 | acesso recusado |
| 404 | não encontrado |
| 405 | método não permitido |
| 500 | erro interno |
| 502 | resposta inválida a montante |
| 503 | indisponibilidade |
| 504 | tempo excedido no gateway |

Método HTTP “seguro” significa que a semântica não pretende alterar o estado do servidor; não significa criptografia. HTTPS fornece proteção em trânsito, mas não corrige autorização incorreta ou conteúdo malicioso.

HTTP/1.1 e HTTP/2 normalmente usam TCP. HTTP/3 usa QUIC sobre UDP.

### 12.2 Correio eletrônico

| Protocolo | Função |
|---|---|
| SMTP | envio e transferência entre servidores |
| IMAP | acesso e sincronização mantendo mensagens no servidor |
| POP3 | obtenção de mensagens, historicamente com fluxo orientado a download |

SMTP não é o protocolo principal para ler a caixa postal do usuário.

### 12.3 FTP, FTPS e SFTP

| Protocolo | Característica |
|---|---|
| FTP | transferência clássica, sem criptografia intrínseca |
| FTPS | FTP protegido por TLS |
| SFTP | transferência sobre SSH, normalmente TCP 22 |

FTPS e SFTP não são sinônimos. SFTP não é “FTP com S” nem usa obrigatoriamente a arquitetura de canais do FTP.

---

## 13. Comandos de diagnóstico no Windows

| Comando | Uso principal |
|---|---|
| `ipconfig` | configuração básica dos adaptadores |
| `ipconfig /all` | endereço, máscara, gateway, DHCP, DNS e MAC |
| `ipconfig /release` | libera concessão DHCPv4 |
| `ipconfig /renew` | solicita renovação DHCPv4 |
| `ipconfig /flushdns` | limpa cache do resolvedor DNS |
| `ping` | testa resposta ICMP e tempo de ida e volta |
| `tracert` | mostra saltos até o destino |
| `nslookup` | consulta e diagnostica DNS |
| `arp -a` | exibe cache IPv4–MAC |
| `netstat -ano` | conexões, portas em escuta e PID |
| `netstat -r` | tabela de roteamento |

### 13.1 Fluxo de diagnóstico

1. `ipconfig /all`: há endereço, máscara, gateway e DNS coerentes?
2. `ping 127.0.0.1`: a pilha local responde?
3. `ping <gateway>`: o host alcança o roteador local?
4. `ping <IP-remoto>`: existe conectividade IP externa?
5. `nslookup <nome>`: a resolução DNS funciona?
6. `tracert <destino>`: onde o caminho deixa de responder?
7. `netstat -ano`: a aplicação está em escuta ou conectada?
8. `arp -a`: existe associação local IPv4–MAC?

### 13.2 Interpretação de sintomas

| Sintoma | Hipótese inicial |
|---|---|
| `169.254.x.x` | DHCP indisponível ou configuração automática link-local |
| IP remoto responde, nome não | DNS |
| LAN funciona, Internet não | gateway, máscara, rota ou acesso externo |
| ping responde, aplicação não | serviço, porta, firewall ou aplicação |
| tracert mostra `*` | ausência de resposta naquele salto; não prova necessariamente interrupção total |

---

## 14. Interoperabilidade de sistemas

Interoperabilidade é a capacidade de sistemas e organizações trabalharem em conjunto e trocarem informações de forma eficaz e utilizável.

### 14.1 Dimensões

| Dimensão | Pergunta central |
|---|---|
| técnica | os sistemas conseguem conectar, transportar e processar a troca? |
| semântica | os dados possuem o mesmo significado? |
| organizacional | processos, responsabilidades e governança estão alinhados? |
| jurídica, como lente complementar | a troca respeita competência, finalidade, sigilo, proteção de dados e base normativa? |

A e-PING enumera oficialmente as dimensões técnica, semântica e organizacional. A análise jurídica é indispensável na prática, mas não deve ser apresentada automaticamente como uma quarta dimensão oficial da e-PING.

### 14.2 API, REST, HTTP, JSON e XML

| Termo | Papel |
|---|---|
| API | interface/contrato para interação entre sistemas |
| REST | estilo arquitetural |
| HTTP | protocolo de aplicação |
| JSON/XML | formatos de representação de dados |
| OpenAPI | descrição de interfaces HTTP |

Uma API pode usar HTTP e JSON sem ser REST. JSON não é protocolo de transporte. REST não é sinônimo de API.

### 14.3 Exemplo semântico

Sistema A envia:

```json
{"situacao": 1}
```

Se o Sistema B interpreta `1` com significado diferente, existe troca técnica, mas falta interoperabilidade semântica. Se não houver responsáveis, acordos e processo de correção, também há problema organizacional.

### 14.4 e-PING

A e-PING define premissas, políticas e especificações para interoperabilidade no Poder Executivo federal e interação com outros Poderes, entes e sociedade.

Pontos de prova:

- prioriza padrões abertos;
- considera segurança e integridade;
- orienta novas soluções e evolução do legado;
- não obriga automaticamente todos os Poderes e todos os entes federativos;
- interoperabilidade não significa compartilhamento irrestrito.

### 14.5 Lei nº 14.129/2021

A Lei do Governo Digital inclui interoperabilidade, desburocratização e transformação digital entre seus eixos. Sua aplicação deve respeitar LAI, LGPD, sigilos e competências. Para Estados, Distrito Federal e Municípios, observe o regime de adoção previsto na própria lei.

---

## 15. Casos resolvidos

### 15.1 Endereço APIPA

```text
IPv4:    169.254.18.40
Máscara: 255.255.0.0
Gateway: ausente
```

**Diagnóstico provável:** não foi obtida configuração DHCP válida. Verifique enlace, servidor DHCP, concessão e adaptador.

### 15.2 IP funciona, nome não

```text
ping 203.0.113.10   → responde
ping sistema.gov    → falha
```

**Próximo passo:** `nslookup sistema.gov`, servidor DNS, cache e sufixo de pesquisa.

### 15.3 Comunicação local funciona, remota não

Verifique máscara, gateway, rota padrão, conectividade do roteador e se o gateway não é endereço de rede ou broadcast.

### 15.4 Ping funciona, sistema não abre

Conectividade IP não prova disponibilidade da aplicação. Verifique porta, processo, protocolo, certificado, firewall e serviço.

### 15.5 Sistemas conectados, significados divergentes

A conexão técnica funciona, mas o código de situação possui sentidos diferentes. O problema é semântico; governança e responsáveis também podem revelar lacuna organizacional.

---

## 16. Pegadinhas de prova

- Internet não é Web;
- LAN/WAN indicam alcance, não propriedade pública ou privada;
- switch não é roteador;
- hub não aprende MAC;
- MAC não é IP nem porta;
- DNS não é DHCP nem ARP;
- NAT não é DHCP nem firewall;
- PAT/NAPT traduz também portas;
- IPv4 privado não é inválido na rede interna;
- `127.0.0.1` é loopback;
- `169.254.0.0/16` é link-local/APIPA;
- broadcast não pode ser gateway;
- IPv6 não usa ARP; usa NDP;
- IPv6 não possui broadcast;
- TCP confiável não é infalível;
- UDP sem garantia intrínseca não impede confiabilidade na aplicação;
- ICMP não usa porta TCP/UDP;
- ping sem resposta não prova serviço inativo;
- HTTP seguro não significa criptografado;
- HTTPS é HTTP sobre TLS;
- HTTP/3 usa QUIC sobre UDP;
- SMTP envia; IMAP/POP3 acessam mensagens;
- FTP não é SFTP;
- FTPS não é SFTP;
- API não é REST, HTTP, JSON nem banco de dados;
- conexão técnica não garante semântica comum;
- e-PING não obriga automaticamente todo órgão brasileiro;
- interoperabilidade não autoriza acesso irrestrito a dados.

---

## 17. Método para resolver questões

1. Identifique o alcance: PAN, LAN, MAN ou WAN.
2. Localize o equipamento e a camada.
3. Separe MAC, IP, porta, domínio e socket.
4. Calcule rede, broadcast e hosts quando houver prefixo.
5. Decida se o destino é local ou remoto.
6. Diferencie DNS, DHCP, ARP, NDP e gateway.
7. Escolha TCP, UDP ou ICMP pela função.
8. Associe protocolo de aplicação e finalidade.
9. Em diagnóstico, compare IP, nome, rota e porta.
10. Em interoperabilidade, confira técnica, semântica, organização e limites jurídicos.
11. Rejeite absolutos como “sempre TCP”, “NAT é firewall” e “qualquer órgão é obrigado pela e-PING”.

## Referências

- CEBRASPE. [Edital nº 1 do concurso TCE-MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Item 2.3 do conteúdo programático; publicado em 6 jul. 2026; acesso em 27 jul. 2026.
- MICROSOFT. [ipconfig](https://learn.microsoft.com/pt-br/windows-server/administration/windows-commands/ipconfig). Configuração TCP/IP, DHCP e cache DNS; acesso em 27 jul. 2026.
- MICROSOFT. [ping](https://learn.microsoft.com/pt-br/windows-server/administration/windows-commands/ping). Eco ICMP e diagnóstico de conectividade; acesso em 27 jul. 2026.
- MICROSOFT. [tracert](https://learn.microsoft.com/pt-br/windows-server/administration/windows-commands/tracert). Rastreamento de saltos; acesso em 27 jul. 2026.
- MICROSOFT. [nslookup](https://learn.microsoft.com/pt-br/windows-server/administration/windows-commands/nslookup). Diagnóstico de DNS; acesso em 27 jul. 2026.
- MICROSOFT. [arp](https://learn.microsoft.com/pt-br/windows-server/administration/windows-commands/arp). Cache ARP; acesso em 27 jul. 2026.
- MICROSOFT. [netstat](https://learn.microsoft.com/pt-br/windows-server/administration/windows-commands/netstat). Conexões, portas, estatísticas e rotas; acesso em 27 jul. 2026.
- IETF. [RFC 2663 — IP Network Address Translator Terminology and Considerations](https://www.rfc-editor.org/info/rfc2663/). NAT e NAPT; acesso em 27 jul. 2026.
- IETF. [RFC 3927 — Dynamic Configuration of IPv4 Link-Local Addresses](https://www.rfc-editor.org/info/rfc3927/). IPv4 link-local; acesso em 27 jul. 2026.
- IETF. [RFC 4861 — Neighbor Discovery for IPv6](https://www.rfc-editor.org/info/rfc4861/). NDP; acesso em 27 jul. 2026.
- IETF. [RFC 9915 — Dynamic Host Configuration Protocol for IPv6](https://www.rfc-editor.org/info/rfc9915/). DHCPv6 e SLAAC; publicado em jan. 2026; acesso em 27 jul. 2026.
- IETF. [HTTP Semantics — RFC 9110](https://www.rfc-editor.org/info/rfc9110/). Métodos e semântica HTTP; acesso em 27 jul. 2026.
- IETF. [HTTP/3 — RFC 9114](https://www.rfc-editor.org/info/rfc9114/). HTTP/3 sobre QUIC; acesso em 27 jul. 2026.
- GOVERNO DIGITAL. [Padrões de Interoperabilidade — e-PING](https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/interoperabilidade/padroes-de-interoperabilidade). Escopo, padrões e premissas; atualizado em 19 jun. 2026; acesso em 27 jul. 2026.
- BRASIL. [Lei nº 14.129, de 29 de março de 2021](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14129.htm). Governo Digital; acesso em 27 jul. 2026.
- FGV. [Prova ALEMA — Analista de Suporte de Rede — Tipo 1](https://conhecimento.fgv.br/sites/default/files/concursos/cns106-tecnico-de-gestao-administrativa-analista-de-suporte-de-redecns106-tipo-1.pdf). Questões oficiais de redes; aplicada em 21 ago. 2023; acesso em 27 jul. 2026.
- FGV. [Gabarito definitivo retificado — ALEMA 2023](https://conhecimento.fgv.br/sites/default/files/concursos/alema-2023-gabarito-final-para-publicacao-retificado-04.10.2023.pdf). Gabaritos oficiais; acesso em 27 jul. 2026.
