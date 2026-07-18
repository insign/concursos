# Redes, TCP/IP e interoperabilidade

## Recorte

- Aqui: LAN, WAN, Internet, TCP/IP, HTTP, SMTP, FTP e interoperabilidade pública.
- Próximo assunto: clientes de e-mail, webmail, Teams, Meet e trabalho remoto.
- Segurança, backup, nuvem e malware pertencem a assuntos próprios.

## Tipos de rede

| Termo | Regra curta |
|---|---|
| LAN | área local, administração normalmente concentrada |
| MAN | abrangência metropolitana |
| WAN | grande área e interligação de redes distantes |
| Internet | rede mundial de redes TCP/IP |
| Web | recursos e aplicações via HTTP/HTTPS |
| intranet | ambiente organizacional restrito com tecnologias da Internet |
| extranet | acesso controlado a recursos por público externo autorizado |

- Internet ≠ Web.
- WAN pode ser privada.
- Intranet não precisa estar fisicamente isolada da Internet.

## Topologias

| Topologia | Ideia |
|---|---|
| estrela | nós ligados a ponto central |
| barramento | meio principal compartilhado |
| anel | circuito lógico/físico |
| malha | múltiplos caminhos e redundância |
| árvore/híbrida | combinação hierárquica ou mista |

- Topologia física ≠ topologia lógica.

## Equipamentos

| Equipamento | Função |
|---|---|
| NIC | conecta host ao meio |
| hub | repete para as demais portas |
| switch | encaminha quadros por MAC na LAN |
| roteador | encaminha pacotes entre redes IP |
| ponto de acesso | liga clientes Wi-Fi à LAN |
| modem | adapta sinal ao meio de acesso |

- Switch: enlace; roteador: rede.
- Gateway é papel lógico; costuma ser exercido pelo roteador.

## OSI e TCP/IP

| OSI | TCP/IP usual | Exemplos |
|---|---|---|
| Aplicação + Apresentação + Sessão | Aplicação | HTTP, DNS, SMTP, FTP, DHCP |
| Transporte | Transporte | TCP, UDP, portas |
| Rede | Internet | IPv4, IPv6, roteamento |
| Enlace + Física | Acesso à rede | Ethernet, Wi-Fi, MAC, bits |

- OSI tem 7 camadas: Aplicação, Apresentação, Sessão, Transporte, Rede, Enlace e Física.
- TCP/IP pode aparecer com 4 ou 5 camadas.
- OSI é modelo conceitual; TCP/IP é a suíte usada pela Internet.

## Encapsulamento

`dados → segmento TCP/datagrama UDP → pacote IP → quadro → bits`

- Destino faz desencapsulamento em ordem inversa.
- Quadro: enlace; pacote: IP; segmento: TCP; datagrama: UDP.

## Identificadores

| Identificador | Função |
|---|---|
| MAC | interface no enlace local |
| IP | endereço lógico entre redes |
| porta | serviço/processo no host |
| nome de domínio | nome resolvido pelo DNS |

- Socket: IP + protocolo de transporte + porta, em visão introdutória.
- Fluxo TCP: IP/porta de origem + IP/porta de destino + protocolo.

## IPv4 e IPv6

| IPv4 | IPv6 |
|---|---|
| 32 bits | 128 bits |
| decimal pontuado | hexadecimal com dois-pontos |
| usa broadcast | não usa broadcast da mesma forma; usa multicast |

- `/24` no IPv4 = máscara `255.255.255.0`.
- Prefixo separa rede/host; não é gateway.
- Privados: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`.
- IPv6 loopback: `::1`.
- IPv6 link-local: `fe80::/10`.
- IPv6 ≠ segurança automática.

## DNS, DHCP, ARP e gateway

| Serviço | Função |
|---|---|
| DNS | resolve nomes e outros registros |
| DHCP | entrega IP, prefixo/máscara, gateway e DNS |
| ARP | associa IPv4 local a MAC |
| gateway padrão | próximo salto para destinos externos à sub-rede |

- DHCPv4 DORA: Discover, Offer, Request, Acknowledgment.
- DNS usa convencionalmente UDP e TCP 53.
- DHCPv4 usa UDP 67 servidor / 68 cliente.
- DNS resolve; DHCP configura; ARP atua no enlace IPv4 local.

## TCP × UDP

| TCP | UDP |
|---|---|
| orientado à conexão | não orientado à conexão |
| fluxo de bytes | datagramas |
| entrega confiável e ordenada | sem garantia intrínseca de entrega/ordem |
| retransmissão, fluxo e congestionamento | estrutura mais simples |

- Handshake TCP: SYN → SYN-ACK → ACK.
- TCP confiável ≠ infalível.
- UDP pode receber confiabilidade na aplicação.
- TCP não é sempre lento; UDP não é sempre rápido.

## Portas convencionais

| Serviço | Porta |
|---|---:|
| HTTP | 80 |
| HTTPS | 443 |
| DNS | 53 |
| DHCPv4 | 67/68 |
| SMTP | 25; submissão costuma usar 587 |
| FTP | controle 21; dados 20 no ativo clássico |
| SSH/SFTP moderno | 22 |

- Porta é convenção; pode ser reconfigurada.
- Porta identifica serviço/processo, não o host inteiro.

## HTTP

- Protocolo de aplicação, requisição-resposta e sem estado.
- Serve à Web e a APIs.
- Stateless não impede cookies, tokens e sessões da aplicação.

### Métodos

| Método | Função | Seguro | Idempotente |
|---|---|:---:|:---:|
| GET | obter representação | sim | sim |
| HEAD | cabeçalhos/metadados sem conteúdo | sim | sim |
| POST | submeter para processamento | não | não necessariamente |
| PUT | criar/substituir recurso-alvo | não | sim |
| DELETE | remover associação | não | sim |
| OPTIONS | consultar opções | sim | sim |

- Seguro = semântica essencialmente de leitura; não significa criptografado.
- Idempotente = repetir mantém o mesmo efeito pretendido.

### Status

| Código | Significado |
|---:|---|
| 200 | sucesso |
| 201 | criado |
| 202 | aceito, não necessariamente concluído |
| 204 | sucesso sem conteúdo |
| 304 | não modificado; validação de cache |
| 400 | requisição inválida |
| 401 | credenciais válidas ausentes para autenticação exigida |
| 403 | entendido, mas recusado |
| 404 | não encontrado ou não revelado |
| 405 | método não permitido |
| 409 | conflito |
| 415 | tipo de mídia não suportado |
| 500 | erro interno |
| 502 | resposta inválida do servidor a montante |
| 503 | serviço indisponível |
| 504 | timeout do intermediário/gateway |

## HTTPS e HTTP/3

- HTTPS = HTTP sobre TLS.
- TLS protege transporte; não muda métodos/status.
- HTTP/1.1 e HTTP/2 usam normalmente TCP.
- HTTP/3 usa QUIC sobre UDP.
- “HTTP sempre usa TCP” é falso.

## SMTP

- SMTP submete e transfere mensagens.
- Não é protocolo de leitura da caixa postal.
- TCP 25: transferência entre servidores.
- TCP 587: submissão autenticada usual.

## FTP, FTPS e SFTP

| Protocolo | Regra |
|---|---|
| FTP | controle e dados em conexões TCP separadas |
| FTPS | FTP protegido por TLS |
| SFTP moderno | SSH File Transfer Protocol, subsistema do SSH |

- FTP controle: TCP 21.
- FTP ativo: servidor inicia conexão de dados, classicamente da porta 20.
- FTP passivo: cliente inicia também a conexão de dados.
- FTP comum não criptografa credenciais/dados.
- FTPS ≠ SFTP.
- SFTP não é “FTP com SSH”.
- SFTP moderno costuma usar a porta do SSH, normalmente 22.
- RFC 913/TCP 115 define Simple File Transfer Protocol histórico, não SFTP moderno.
- Não há RFC final do protocolo SFTP moderno; há Internet-Draft arquivado e RFCs do canal SSH.

## Interoperabilidade

| Dimensão | Foco |
|---|---|
| técnica | protocolos, APIs, formatos, conectividade |
| semântica | significado comum dos dados |
| organizacional | processos, papéis, governança e acordos |
| jurídica | competência, finalidade, sigilo e proteção de dados |

- e-PING enumera oficialmente técnica, semântica e organizacional.
- Jurídica é lente complementar; não atribuir como quarta dimensão oficial da e-PING.
- Conexão técnica ≠ interoperabilidade completa.
- Interoperar não exige fornecedor único, base central única nem abertura irrestrita.

## API e padrões

- API = interface/contrato entre softwares.
- API ≠ REST ≠ HTTP ≠ JSON/XML.
- REST: estilo arquitetural.
- HTTP: protocolo.
- JSON/XML: formatos.
- Formato aberto: não proprietário, especificação pública, livre implementação e sem restrição legal de uso.
- Gratuito ≠ necessariamente aberto.
- Dados abertos ≠ todo dado estatal.

## e-PING

- Define premissas, políticas e especificações mínimas de interoperabilidade.
- Integrantes do SISP devem observá-la no planejamento de contratação, aquisição e atualização de sistemas/equipamentos.
- Demais Poderes da União e entes federativos: adoção facultativa.
- Não vincula automaticamente um TCE estadual.
- Prefere padrões abertos.
- Proprietários: possíveis transitoriamente no legado ou sem padrão aberto disponível.

| Nível | Sentido |
|---|---|
| A | Adotado e obrigatório no escopo indicado |
| R | Recomendado, ainda não obrigatório |
| T | Em Transição; evitar em novos serviços |
| E | Em Estudo |

## Lei nº 14.129/2021

- Aplicação direta: âmbito federal do art. 2º.
- Estados, DF e municípios: adoção por atos próprios.
- Art. 3º, XIV: interoperabilidade e dados abertos.
- Art. 3º, XXV: preferência por tecnologias, padrões e formatos abertos/livres.
- Art. 20, § 2º: plataformas observam interoperabilidade e integração.
- Art. 24, IV: eliminar exigências desnecessárias inclusive por interoperabilidade.
- Art. 24, V: evitar replicação, salvo desempenho ou segurança.
- Art. 24, VI: dados interoperáveis para indicadores.
- Art. 29: formato aberto, legível por máquina e semântica descrita.
- Art. 38: limites legais, segurança, tecnologia, custo-benefício e proteção de dados.
- Arts. 39–41: mecanismo, registros de referência, reaproveitamento e custos de adaptação.
- Interoperabilidade ≠ compartilhamento indiscriminado.

## Pegadinhas finais

- LAN ≠ sinônimo de rede sem fio.
- Internet ≠ Web.
- Switch ≠ roteador.
- MAC ≠ IP ≠ porta.
- DNS ≠ DHCP ≠ ARP.
- IPv6 = 128 bits.
- UDP não garante entrega nem ordem.
- HTTP/3 usa UDP.
- 401 ≠ 403.
- 304 ≠ redirecionamento comum.
- FTP usa controle e dados separados.
- FTPS ≠ SFTP.
- API não resolve semântica, organização e direito.
- e-PING não obriga automaticamente todo órgão brasileiro.
- Padrão aberto ≠ apenas gratuito.
