---
schemaVersion: 1
title: "Redes de computadores, protocolos TCP/IP e interoperabilidade"
description: Conceitos de redes, modelos OSI e TCP/IP, endereçamento IPv4 e IPv6, protocolos, diagnóstico e interoperabilidade de sistemas no setor público.
order: 24
storageId: redes-tcp-ip-interoperabilidade
---

## 1. O que precisa funcionar para acessar um sistema?

**Situação hipotética:** um servidor público consegue imprimir no setor, mas não abrir um sistema na Internet. Alguma comunicação local funciona; isso não prova que o caminho externo, a localização pelo nome e o serviço estejam funcionando.

Uma **rede** interliga dispositivos para trocar dados e compartilhar recursos. **Protocolos** são as regras sobre formato, significado e sequência das mensagens. Estar conectado não basta: é preciso identificar o destino, encontrar um caminho e falar o protocolo do serviço.

No modelo **cliente-servidor**, o cliente solicita e o servidor oferece um serviço. São papéis de programas: uma máquina pode exercer ambos, e vários servidores podem atender um serviço. Em uma rede **<abbr title="Peer to Peer">P2P</abbr>**, ou ponto a ponto, os participantes oferecem e consomem recursos entre si, sem servidor central para todas as trocas.

### Alcance não é permissão de acesso

| Rede | Alcance característico |
|---|---|
| <abbr title="Personal Area Network">PAN</abbr> — rede de área pessoal | dispositivos próximos de uma pessoa |
| <abbr title="Local Area Network">LAN</abbr> — rede de área local | sala, prédio ou campus, normalmente com administração concentrada |
| <abbr title="Metropolitan Area Network">MAN</abbr> — rede de área metropolitana | cidade ou região metropolitana |
| <abbr title="Wide Area Network">WAN</abbr> — rede de longa distância | interligação de redes geograficamente distantes |

Uma <abbr title="Wide Area Network">WAN</abbr> pode ser privada; uma <abbr title="Local Area Network">LAN</abbr> pode funcionar sem Internet. A **Internet** é a interligação mundial de redes; a **Web** é um de seus serviços, baseado em <abbr title="Hypertext Transfer Protocol">HTTP</abbr> e <abbr title="Hypertext Transfer Protocol Secure">HTTPS</abbr>, protocolos de consulta a páginas e recursos explicados adiante. Correio eletrônico é outro serviço, embora possa ter interface no navegador.

**Intranet** usa tecnologias de Internet em ambiente de acesso restrito. **Extranet** oferece acesso controlado a parte desses recursos a usuários externos autorizados. Portanto, alcance geográfico, tecnologia e autorização são critérios diferentes; usar <abbr title="Transmission Control Protocol e Internet Protocol">TCP/IP</abbr> não torna uma rede pública.

## 2. Como os dispositivos se conectam

Os dados são representados por **bits**, valores 0 ou 1. Viajam por **par trançado** (pares de fios de cobre), **fibra óptica** (pulsos luminosos) ou rádio. Cada trecho de comunicação direta é um **enlace**. Ethernet é uma família de padrões de rede, usualmente cabeada, do <abbr title="Institute of Electrical and Electronics Engineers">IEEE</abbr> 802.3; <abbr title="Tecnologia de rede local sem fio">Wi-Fi</abbr> usa a família <abbr title="Institute of Electrical and Electronics Engineers">IEEE</abbr> 802.11 para comunicação sem fio. Enlaces de operadoras também podem empregar rádio, micro-ondas ou satélite.

Na nomenclatura clássica, Ethernet corresponde a 10 megabits por segundo; Fast Ethernet, a 100; Gigabit Ethernet, a 1 gigabit por segundo, ou 1.000 megabits por segundo. **Taxa nominal não é velocidade útil garantida:** controle, compartilhamento do meio, distância, interferência e retransmissões afetam o desempenho.

A **topologia física** descreve as conexões: estrela tem ponto central; barramento, cabo principal compartilhado; anel, circuito; malha, múltiplas interligações; híbrida combina formas. A **topologia lógica** descreve a circulação dos dados e pode diferir do desenho dos cabos.

Para distinguir os equipamentos, acompanhe sua decisão:

- **<abbr title="Equipamento que repete sinais para as demais portas">Hub</abbr>:** repete o sinal recebido nas demais portas; não aprende endereços nem escolhe um destinatário.
- **<abbr title="Comutador que encaminha dados entre portas da rede">Switch</abbr>:** encaminha **quadros**, unidades de dados do enlace local, usando endereços <abbr title="Media Access Control">MAC</abbr>, que identificam interfaces nesse enlace. Aprende em que porta cada endereço aparece; destinatários desconhecidos e transmissões coletivas podem exigir envio por várias portas.
- **Roteador:** encaminha **pacotes**, unidades de dados com endereços <abbr title="Internet Protocol">IP</abbr>, entre redes. Consulta rotas para escolher o próximo trecho do caminho.

O **ponto de acesso**, ou <abbr title="Access Point">AP</abbr>, conecta dispositivos <abbr title="Tecnologia de rede local sem fio">Wi-Fi</abbr> à rede local, tipicamente como ponte entre meios. Não é necessariamente um roteador. **<abbr title="Modulador-demodulador">Modem</abbr>** adapta sinais ao meio de acesso; a **<abbr title="Optical Network Terminal">ONT</abbr>** termina a conexão óptica de acesso. Um aparelho pode reunir essas funções e ainda oferecer um **<abbr title="Filtro de tráfego conforme regras de segurança">firewall</abbr>**, mecanismo que permite ou bloqueia tráfego segundo uma política. Funções reunidas no gabinete continuam sendo distintas.

## 3. Endereço, porta e sub-rede: a quem entregar?

Uma **interface** é um ponto de conexão à rede. **<abbr title="Media Access Control">MAC</abbr>** identifica a interface no enlace local; **<abbr title="Internet Protocol">IP</abbr>** identifica logicamente o destino para encaminhar pacotes entre redes. Para distinguir o programa que receberá os dados, usa-se a **porta de transporte**, número associado ao serviço ou processo.

Um **<abbr title="Ponto de comunicação identificado por endereço e porta">socket</abbr>** é um ponto de comunicação: endereço <abbr title="Internet Protocol">IP</abbr> e porta, no contexto de um protocolo de transporte. <abbr title="Transmission Control Protocol">TCP</abbr> e <abbr title="User Datagram Protocol">UDP</abbr>, estudados adiante, têm espaços de portas separados. Uma máquina pode ter várias interfaces, endereços e serviços; <abbr title="Media Access Control">MAC</abbr>, <abbr title="Internet Protocol">IP</abbr> e porta não são sinônimos nem necessariamente permanentes.

### 3.1 Ler um endereço <abbr title="Internet Protocol version 4">IPv4</abbr>

Um endereço <abbr title="Internet Protocol version 4">IPv4</abbr> tem **32 bits**, separados em quatro **octetos** de oito bits, escritos usualmente como números decimais de 0 a 255. Em cada octeto, as posições valem, da esquerda para a direita, **128, 64, 32, 16, 8, 4, 2 e 1**; somam-se as posições marcadas com 1.

Por exemplo, 192 = 128 + 64, portanto `11000000`; 50 = 32 + 16 + 2, portanto `00110010`. Aplicando o mesmo raciocínio aos quatro octetos:

```text
192.168.10.50 = 11000000.10101000.00001010.00110010
```

A **máscara** separa a parte que identifica a rede da parte disponível para endereços dentro dela. Na notação <abbr title="Classless Inter-Domain Routing">CIDR</abbr>, `/24` significa que os primeiros 24 bits são o prefixo de rede. A máscara correspondente é `255.255.255.0`: 24 bits 1 seguidos de oito bits 0.

### 3.2 Calcular o bloco, não decorar o último número

Em uma sub-rede <abbr title="Internet Protocol version 4">IPv4</abbr> convencional, os bits restantes variam. Todos em 0 identificam a **rede**; todos em 1 formam o **broadcast**, destinado coletivamente aos participantes daquela sub-rede. Os endereços intermediários são utilizáveis por **hosts**, os dispositivos finais. Assim, para um prefixo de tamanho p:

$$
\text{endereços no bloco}=2^{32-p};\qquad
\text{hosts usuais}=2^{32-p}-2.
$$

| Prefixo | Máscara | Endereços | Hosts usuais |
|---|---|---:|---:|
| `/24` | `255.255.255.0` | 256 | 254 |
| `/25` | `255.255.255.128` | 128 | 126 |
| `/26` | `255.255.255.192` | 64 | 62 |
| `/27` | `255.255.255.224` | 32 | 30 |
| `/28` | `255.255.255.240` | 16 | 14 |
| `/29` | `255.255.255.248` | 8 | 6 |

**No exemplo hipotético do setor:** em `192.168.10.0/24`, a rede é `.0`, o broadcast é `.255` e os hosts vão de `.1` a `.254`. Se esse bloco for dividido em `/26`, cada sub-rede terá 64 endereços, começando em `.0`, `.64`, `.128` e `.192`. No bloco `192.168.10.64/26`, a rede é `.64`, os hosts vão de `.65` a `.126` e o broadcast é `.127`. Logo, **broadcast não termina obrigatoriamente em 255**.

Para dimensionar uma rede, escolha o menor número de bits de host que comporte a demanda: 1.000 hosts exigem dez bits, pois 2⁹ − 2 = 510 e 2¹⁰ − 2 = 1.022. Restam 22 bits de rede: `/22`, máscara `255.255.252.0`. Havendo prefixo explícito, ele determina o bloco, não a classificação histórica em classes A, B ou C.

A subtração de dois tem exceções: `/31` pode usar os dois endereços em um enlace ponto a ponto; `/32` identifica um único endereço. Não aplique a fórmula de hosts usuais mecanicamente a esses casos.

### 3.3 Endereços com finalidade especial

| Faixa ou endereço | Significado |
|---|---|
| `10.0.0.0/8` | uso privado: `10.0.0.0` a `10.255.255.255` |
| `172.16.0.0/12` | uso privado: `172.16.0.0` a `172.31.255.255`; não todo o bloco iniciado em 172 |
| `192.168.0.0/16` | uso privado: `192.168.0.0` a `192.168.255.255` |
| `127.0.0.0/8` | <abbr title="Comunicação do dispositivo com ele próprio">loopback</abbr>: comunicação com o próprio dispositivo; exemplo usual `127.0.0.1` |
| `169.254.0.0/16` | <abbr title="Endereçamento restrito ao enlace local">link-local</abbr>: comunicação limitada ao enlace, sem roteamento para outras redes |
| `0.0.0.0` | endereço não especificado; o sentido exato depende do contexto |

Endereço privado vale internamente, mas não é roteável como tal na Internet pública. No Windows, **<abbr title="Automatic Private IP Addressing">APIPA</abbr>** é a autoconfiguração <abbr title="Internet Protocol version 4">IPv4</abbr> <abbr title="Endereçamento restrito ao enlace local">link-local</abbr>: `169.254.x.x`, em configuração automática e sem <abbr title="Roteador usado como próximo salto para outra rede">gateway</abbr>, sugere falha na obtenção de configuração <abbr title="Dynamic Host Configuration Protocol">DHCP</abbr>. Não prova defeito na placa nem se confunde com <abbr title="Comunicação do dispositivo com ele próprio">loopback</abbr>.

## 4. Configurar, localizar e alcançar são tarefas diferentes

O computador do setor precisa de configuração, do endereço correspondente ao nome do sistema e do destinatário no enlace. **<abbr title="Dynamic Host Configuration Protocol">DHCP</abbr>, <abbr title="Domain Name System">DNS</abbr> e <abbr title="Address Resolution Protocol">ARP</abbr> resolvem problemas diferentes.**

### 4.1 <abbr title="Dynamic Host Configuration Protocol">DHCP</abbr>: obter configuração

O <abbr title="Dynamic Host Configuration Protocol">DHCP</abbr> pode fornecer endereço <abbr title="Internet Protocol">IP</abbr>, máscara, <abbr title="Roteador usado como próximo salto para outra rede">gateway</abbr>, servidores <abbr title="Domain Name System">DNS</abbr> e prazo de uso do endereço, chamado **concessão**. O <abbr title="Roteador usado como próximo salto para outra rede">gateway</abbr> padrão é o roteador usado para destinos sem uma rota mais específica.

A negociação inicial típica do <abbr title="Dynamic Host Configuration Protocol for Internet Protocol version 4">DHCPv4</abbr> é resumida por **<abbr title="Discover, Offer, Request e Acknowledgment">DORA</abbr>**: o cliente procura servidores (*Discover*), recebe uma oferta (*Offer*), solicita a configuração escolhida (*Request*) e recebe a confirmação (*Acknowledgment*). Não confunda essa sequência de quatro mensagens com a abertura de uma conexão <abbr title="Transmission Control Protocol">TCP</abbr>.

Uma **reserva** associa um cliente a um endereço administrado pelo <abbr title="Dynamic Host Configuration Protocol">DHCP</abbr>, útil para uma impressora que deve manter o endereço. Uma **exclusão** retira endereços da distribuição automática, permitindo administrá-los separadamente, por exemplo com configuração manual. Reserva não é desligar o serviço; exclusão, sozinha, não configura o equipamento.

### 4.2 <abbr title="Domain Name System">DNS</abbr>: descobrir dados a partir de nomes

Um **nome de domínio** dispensa memorizar endereços numéricos. O <abbr title="Domain Name System">DNS</abbr> é um sistema distribuído de nomes e registros: um **resolvedor** busca a informação ou reaproveita uma resposta em **<abbr title="Armazenamento temporário para reutilizar informações">cache</abbr>**, armazenamento temporário. Servidores **autoritativos** mantêm as informações oficiais de uma **zona**, parcela administrada desse espaço de nomes.

| Registro | Informação associada ao nome |
|---|---|
| `A` | endereço <abbr title="Internet Protocol version 4">IPv4</abbr> |
| `AAAA` | endereço <abbr title="Internet Protocol version 6">IPv6</abbr> |
| `CNAME` | outro nome, o nome canônico, ao qual o apelido se refere |
| `MX` | servidor responsável por receber correio do domínio |
| `NS` | servidor de nomes autoritativo |
| `PTR` | nome em consulta reversa, a partir do endereço |
| `TXT` | texto, usado também em políticas publicadas no domínio |

Em `ftp IN CNAME server01`, `ftp` é apelido de `server01`, não autorização para transferir arquivos. Nome resolvido não comprova serviço disponível. <abbr title="Domain Name System">DNS</abbr> convencional usa porta 53 com <abbr title="User Datagram Protocol">UDP</abbr> ou <abbr title="Transmission Control Protocol">TCP</abbr>, não exclusivamente um transporte.

### 4.3 <abbr title="Address Resolution Protocol">ARP</abbr> e <abbr title="Roteador usado como próximo salto para outra rede">gateway</abbr>: entregar ao próximo participante

Conhecido o destino <abbr title="Internet Protocol version 4">IPv4</abbr>, o computador compara seu prefixo com o do destino usando a máscara. **Na mesma sub-rede**, entrega diretamente; **fora dela**, consulta uma rota e entrega ao próximo roteador, normalmente o <abbr title="Roteador usado como próximo salto para outra rede">gateway</abbr> padrão. No enlace Ethernet, usa o <abbr title="Address Resolution Protocol">ARP</abbr> para descobrir qual endereço <abbr title="Media Access Control">MAC</abbr> corresponde ao <abbr title="Internet Protocol version 4">IPv4</abbr> desse próximo participante.

No exemplo `192.168.10.50/24`, uma impressora `.60` é local. Já um destino fora de `192.168.10.0/24` exige roteamento. O quadro inicial será dirigido ao **<abbr title="Media Access Control">MAC</abbr> do <abbr title="Roteador usado como próximo salto para outra rede">gateway</abbr>**, mas o pacote continuará destinado ao **<abbr title="Internet Protocol">IP</abbr> remoto**, ressalvadas traduções de endereço. Não existe uma consulta <abbr title="Address Resolution Protocol">ARP</abbr> que atravesse a Internet para descobrir o <abbr title="Media Access Control">MAC</abbr> do servidor distante.

O <abbr title="Roteador usado como próximo salto para outra rede">gateway</abbr> precisa ser alcançável no enlace, normalmente um endereço de host na mesma sub-rede, nunca seu broadcast. Em um bloco `/29` iniciado em `.0`, `.1` a `.6` são hosts e `.7` é broadcast: escolher `.7` como <abbr title="Roteador usado como próximo salto para outra rede">gateway</abbr> é erro de configuração.

## 5. Rotas, tradução e filtragem

A **tabela de roteamento** associa redes de destino a saídas e próximos saltos. Prevalece a rota compatível de prefixo mais específico. A rota padrão, `0.0.0.0/0` em <abbr title="Internet Protocol version 4">IPv4</abbr>, cobre os demais destinos; não equivale a atribuir `0.0.0.0` a um servidor.

**Rotas estáticas** são configuradas administrativamente e não aprendem sozinhas novos caminhos. **Roteamento dinâmico** usa protocolos para trocar informações e ajustar rotas, ao custo de maior complexidade.

Para comunicar uma rede privada com a Internet, pode haver **<abbr title="Network Address Translation">NAT</abbr>**, tradução de endereços entre domínios de endereçamento. O <abbr title="Network Address Translation">NAT</abbr> básico traduz endereços; **<abbr title="Network Address Port Translation">NAPT</abbr>**, também chamado **<abbr title="Port Address Translation">PAT</abbr>**, traduz endereços e portas. Assim, vários computadores podem compartilhar um endereço externo: as associações de portas permitem encaminhar cada resposta à comunicação interna correta.

Tradução não é configuração automática, criptografia nem política de segurança. O **<abbr title="Filtro de tráfego conforme regras de segurança">firewall</abbr>** decide o tráfego permitido, podendo considerar endereços, portas, protocolos e estado das conexões. O mesmo aparelho pode executar <abbr title="Network Address Translation">NAT</abbr>, <abbr title="Dynamic Host Configuration Protocol">DHCP</abbr> e filtragem, mas uma função não substitui as outras.

## 6. O que muda no <abbr title="Internet Protocol version 6">IPv6</abbr>

O <abbr title="Internet Protocol version 6">IPv6</abbr> amplia o endereço para **128 bits**, escritos em oito grupos de 16 bits. Cada grupo usa até quatro dígitos **hexadecimais**: 0 a 9 e A a F, em que A vale dez e F vale quinze. Cada dígito representa quatro bits.

Podem-se omitir zeros **à esquerda** de cada grupo e substituir uma sequência de grupos nulos por `::`, **uma única vez por endereço**, para não tornar ambígua a quantidade omitida.

```text
2001:0db8:0000:0000:0000:0000:fe00:0001
2001:db8:0:0:0:0:fe00:1
2001:db8::fe00:1
```

As três escritas representam o mesmo endereço. Não se pode transformar `fe00` em `fe`: isso apagaria zeros à direita e mudaria o valor. **Validade não é o mesmo que forma canônica:** a representação padronizada pela <abbr title="Request for Comments — documento técnico da Internet">RFC</abbr> 5952 usa letras minúsculas, elimina zeros iniciais e comprime a maior sequência de grupos zero, escolhendo a primeira em caso de empate; não comprime um único grupo zero.

`::1` é <abbr title="Comunicação do dispositivo com ele próprio">loopback</abbr>; `::` é o endereço não especificado; `fe80::/10` é o prefixo <abbr title="Endereçamento restrito ao enlace local">link-local</abbr>. **<abbr title="Internet Protocol version 6">IPv6</abbr> não tem broadcast:** usa, entre outras formas de entrega, **multicast**, destinado a um grupo de interfaces.

O **<abbr title="Neighbor Discovery Protocol">NDP</abbr>**, baseado em <abbr title="Internet Control Message Protocol version 6">ICMPv6</abbr>, descobre vizinhos e roteadores, resolve endereços de enlace e verifica alcançabilidade; participa também da detecção de endereços duplicados. Substitui e amplia funções que, no <abbr title="Internet Protocol version 4">IPv4</abbr>, incluem o <abbr title="Address Resolution Protocol">ARP</abbr>. Portanto, <abbr title="Internet Protocol version 6">IPv6</abbr> não usa <abbr title="Address Resolution Protocol">ARP</abbr>.

Na **<abbr title="Stateless Address Autoconfiguration">SLAAC</abbr>**, o dispositivo pode formar endereços a partir de informações anunciadas por roteadores. O **<abbr title="Dynamic Host Configuration Protocol for Internet Protocol version 6">DHCPv6</abbr>** pode fornecer parâmetros, endereços ou prefixos; pode coexistir com a <abbr title="Stateless Address Autoconfiguration">SLAAC</abbr> e não reproduz a sequência <abbr title="Discover, Offer, Request e Acknowledgment">DORA</abbr> do <abbr title="Dynamic Host Configuration Protocol for Internet Protocol version 4">DHCPv4</abbr>. O roteador padrão é descoberto pelos anúncios de roteador, não pelo <abbr title="Dynamic Host Configuration Protocol for Internet Protocol version 6">DHCPv6</abbr>.

## 7. Transportar dados não é garantir que o serviço funcionou

O <abbr title="Internet Protocol">IP</abbr> encaminha pacotes, mas não garante, sozinho, entrega nem ordem. As aplicações escolhem como lidar com perdas e atrasos.

O **<abbr title="Transmission Control Protocol">TCP</abbr>** estabelece uma conexão e oferece à aplicação um fluxo ordenado de bytes, unidades de oito bits. Usa números de sequência, confirmações e retransmissões para recuperar perdas; o **controle de fluxo** evita exceder a capacidade do receptor e o **controle de congestionamento** ajusta o envio à situação da rede. Se a comunicação falhar definitivamente, a conexão pode terminar com erro: confiável não significa infalível.

A abertura usual, chamada **<abbr title="Abertura de conexão pela troca de três mensagens">three-way handshake</abbr>**, tem três etapas: <abbr title="Synchronize">SYN</abbr> solicita sincronização; <abbr title="Synchronize e Acknowledgment">SYN-ACK</abbr> sincroniza e confirma; <abbr title="Acknowledgment">ACK</abbr> confirma a resposta. Essa conexão lógica não cria um cabo exclusivo entre as partes.

O **<abbr title="User Datagram Protocol">UDP</abbr>** envia datagramas, mensagens independentes, sem estabelecimento prévio de conexão e sem garantias próprias de entrega, ordenação ou retransmissão. Tem menor sobrecarga de controle, mas não é “sempre mais rápido”. Voz e vídeo podem preferir receber dados recentes a esperar dados antigos; outros protocolos podem acrescentar confiabilidade sobre <abbr title="User Datagram Protocol">UDP</abbr>. É o caso do <abbr title="Protocolo de transporte seguro e confiável sobre datagramas">QUIC</abbr>, usado pelo <abbr title="Hypertext Transfer Protocol version 3">HTTP/3</abbr>.

O **<abbr title="Internet Control Message Protocol">ICMP</abbr>** transporta mensagens de controle, erro e diagnóstico associadas ao <abbr title="Internet Protocol">IP</abbr>. O comando `ping` envia solicitações de eco e observa respostas e tempo de ida e volta; **não testa uma porta <abbr title="Transmission Control Protocol">TCP</abbr> ou <abbr title="User Datagram Protocol">UDP</abbr>**. No Windows, `tracert` envia sondagens com limites de salto crescentes. No <abbr title="Internet Protocol version 4">IPv4</abbr>, cada roteador decrementa o <abbr title="Time to Live">TTL</abbr>; ao esgotá-lo, pode responder com tempo excedido. Essas respostas revelam os saltos do caminho.

## 8. Camadas: organizar as responsabilidades já vistas

A aplicação não precisa controlar diretamente os sinais no cabo. Cada camada oferece um serviço à superior e acrescenta informações para cumprir sua parte. Esse processo é o **encapsulamento**: dados da aplicação recebem informações de transporte, depois de rede e de enlace. No destino, o desencapsulamento entrega o conteúdo à camada correspondente.

**Dados → segmento <abbr title="Transmission Control Protocol">TCP</abbr> ou datagrama <abbr title="User Datagram Protocol">UDP</abbr> → pacote <abbr title="Internet Protocol">IP</abbr> → quadro de enlace → bits transmitidos.** “Datagrama” também pode designar a unidade do próprio <abbr title="Internet Protocol">IP</abbr>; observe a camada mencionada.

O **<abbr title="Open Systems Interconnection">OSI</abbr>** é um modelo de referência de sete camadas; o modelo **<abbr title="Transmission Control Protocol e Internet Protocol">TCP/IP</abbr>**, na representação de quatro camadas, agrupa algumas dessas responsabilidades:

| <abbr title="Open Systems Interconnection">OSI</abbr>, de baixo para cima | Responsabilidade | <abbr title="Transmission Control Protocol e Internet Protocol">TCP/IP</abbr> |
|---|---|---|
| 1. Física | transmitir bits como sinais; <abbr title="Equipamento que repete sinais para as demais portas">hub</abbr> | Acesso à rede |
| 2. Enlace | transportar quadros no enlace; <abbr title="Media Access Control">MAC</abbr> e <abbr title="Comutador que encaminha dados entre portas da rede">switch</abbr> típico | Acesso à rede |
| 3. Rede | endereçar e rotear pacotes; <abbr title="Internet Protocol">IP</abbr> e roteador | Internet |
| 4. Transporte | comunicação entre processos; <abbr title="Transmission Control Protocol">TCP</abbr>, <abbr title="User Datagram Protocol">UDP</abbr> e portas | Transporte |
| 5. Sessão | coordenar diálogos entre aplicações | Aplicação |
| 6. Apresentação | representar, converter, comprimir e proteger dados | Aplicação |
| 7. Aplicação | protocolos dos serviços, como <abbr title="Hypertext Transfer Protocol">HTTP</abbr> e <abbr title="Domain Name System">DNS</abbr> | Aplicação |

A correspondência é conceitual, não uma obrigação de implementar sete programas separados. Criptografia não fica exclusivamente em uma camada na prática; existem <abbr title="Comutadores que encaminham dados entre portas da rede">switches</abbr> com funções de roteamento, e a camada de atuação de um <abbr title="Filtro de tráfego conforme regras de segurança">firewall</abbr> depende de sua implementação.

## 9. Protocolos usados pelos serviços

### 9.1 <abbr title="Hypertext Transfer Protocol">HTTP</abbr> e <abbr title="Hypertext Transfer Protocol Secure">HTTPS</abbr>: pedido, resposta e proteção

No **<abbr title="Hypertext Transfer Protocol">HTTP</abbr>**, o cliente faz uma requisição sobre um **recurso**, como página, arquivo ou cadastro. A resposta traz um código de estado e, quando cabível, uma representação do recurso. O método indica a intenção:

| Método | Semântica principal |
|---|---|
| `GET` | obter a representação do recurso |
| `HEAD` | obter informações da resposta como em `GET`, mas sem seu corpo |
| `POST` | submeter conteúdo para processamento pelo recurso |
| `PUT` | criar ou substituir o estado do recurso-alvo |
| `DELETE` | solicitar a remoção do recurso-alvo; não implica apagar fisicamente todos os dados |

Um método **seguro**, como `GET` ou `HEAD`, não solicita alteração de estado como finalidade; isso não impede efeitos acessórios, como registrar o acesso. **Seguro, nessa classificação, não quer dizer criptografado.**

Os códigos agrupam resultados: 2xx indica sucesso; 3xx, redirecionamento ou ações relacionadas; 4xx, erro associado ao pedido do cliente; 5xx, falha do servidor ao atendê-lo. Os casos mais úteis são:

| Códigos | Interpretação |
|---|---|
| 200 / 201 / 204 | sucesso / recurso criado / sucesso sem conteúdo na resposta |
| 301 / 302 | redirecionamento permanente / temporário |
| 304 | em consulta condicional, a cópia armazenada pode ser reutilizada; não vem novo corpo do recurso |
| 400 / 401 / 403 | pedido inválido / faltam credenciais válidas / acesso recusado |
| 404 / 405 | recurso não encontrado / método não permitido para o recurso |
| 500 / 503 | erro interno / indisponibilidade, como sobrecarga ou manutenção |
| 502 / 504 | um intermediário recebeu resposta inválida / não recebeu resposta a tempo do servidor consultado |

O **<abbr title="Hypertext Transfer Protocol Secure">HTTPS</abbr>** protege a comunicação <abbr title="Hypertext Transfer Protocol">HTTP</abbr> por meio do **<abbr title="Transport Layer Security">TLS</abbr>**, que fornece confidencialidade, integridade e autenticação do servidor conforme a validação do certificado. Protege o canal; não garante que o conteúdo seja honesto nem corrige autorização defeituosa na aplicação.

<abbr title="Hypertext Transfer Protocol version 1.1">HTTP/1.1</abbr> e <abbr title="Hypertext Transfer Protocol version 2">HTTP/2</abbr> normalmente usam <abbr title="Transmission Control Protocol">TCP</abbr>; **<abbr title="Hypertext Transfer Protocol version 3">HTTP/3</abbr> usa <abbr title="Protocolo de transporte seguro e confiável sobre datagramas">QUIC</abbr> sobre <abbr title="User Datagram Protocol">UDP</abbr>**, mantendo as funções <abbr title="Hypertext Transfer Protocol">HTTP</abbr> de pedido e resposta. <abbr title="Protocolo de transporte seguro e confiável sobre datagramas">QUIC</abbr> acrescenta conexões seguras e transporte confiável sobre <abbr title="User Datagram Protocol">UDP</abbr>, mostrando por que ausência de garantia no protocolo inferior não impede garantia em outro nível.

### 9.2 Correio: envio não é leitura da caixa

O **<abbr title="Simple Mail Transfer Protocol">SMTP</abbr>** leva a mensagem do cliente ao serviço de envio e entre servidores de correio. Para consultar a caixa, **<abbr title="Internet Message Access Protocol">IMAP</abbr>** mantém a visão das mensagens e pastas no servidor, favorecendo sincronização entre dispositivos. **<abbr title="Post Office Protocol version 3">POP3</abbr>** permite obter mensagens para o cliente; a permanência de cópias no servidor depende da configuração, não é proibida pelo protocolo.

No **<abbr title="Correio eletrônico acessado pelo navegador">webmail</abbr>**, o navegador acessa a interface do serviço pela Web; isso não transforma <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> em protocolo de leitura. Composição de mensagens e colaboração ficam no assunto próprio de correio eletrônico.

### 9.3 <abbr title="File Transfer Protocol">FTP</abbr>, <abbr title="File Transfer Protocol Secure">FTPS</abbr> e <abbr title="Secure Shell File Transfer Protocol">SFTP</abbr>: transferir arquivos

O **<abbr title="File Transfer Protocol">FTP</abbr>** separa uma conexão de **controle**, para comandos e respostas, de conexões de **dados**, para arquivos e listagens. No modo **ativo**, o servidor inicia a conexão de dados para o cliente; no **passivo**, o cliente a inicia para uma porta indicada pelo servidor. Por isso, a autenticação pode funcionar, mas a transferência ser bloqueada por regras de rede.

<abbr title="File Transfer Protocol">FTP</abbr> não tem criptografia intrínseca. **<abbr title="File Transfer Protocol Secure">FTPS</abbr>** acrescenta proteção <abbr title="Transport Layer Security">TLS</abbr> ao <abbr title="File Transfer Protocol">FTP</abbr>. **<abbr title="Secure Shell File Transfer Protocol">SFTP</abbr>** é outro protocolo de transferência, operando sobre **<abbr title="Secure Shell">SSH</abbr>**, que oferece comunicação remota protegida. <abbr title="File Transfer Protocol Secure">FTPS</abbr> e <abbr title="Secure Shell File Transfer Protocol">SFTP</abbr> não são sinônimos, e o segundo não herda os dois canais do <abbr title="File Transfer Protocol">FTP</abbr>.

### 9.4 Portas de referência

Portas são convenções de serviço, não garantias de que um programa esteja ativo; podem existir configurações não padronizadas.

| Serviço | Porta de referência |
|---|---|
| <abbr title="Domain Name System">DNS</abbr> convencional | 53, <abbr title="User Datagram Protocol">UDP</abbr> ou <abbr title="Transmission Control Protocol">TCP</abbr> |
| <abbr title="Dynamic Host Configuration Protocol for Internet Protocol version 4">DHCPv4</abbr> | 67 no servidor e 68 no cliente, <abbr title="User Datagram Protocol">UDP</abbr> |
| <abbr title="Hypertext Transfer Protocol">HTTP</abbr> / <abbr title="Hypertext Transfer Protocol Secure">HTTPS</abbr> | 80 / 443; <abbr title="Hypertext Transfer Protocol version 3">HTTP/3</abbr> usa <abbr title="User Datagram Protocol">UDP</abbr> 443 normalmente |
| <abbr title="Simple Mail Transfer Protocol">SMTP</abbr> entre servidores | <abbr title="Transmission Control Protocol">TCP</abbr> 25; submissão pelo cliente costuma usar 587 |
| <abbr title="Internet Message Access Protocol">IMAP</abbr> / <abbr title="Post Office Protocol version 3">POP3</abbr> | <abbr title="Transmission Control Protocol">TCP</abbr> 143 / 110; com proteção implícita, 993 / 995 |
| <abbr title="File Transfer Protocol">FTP</abbr> | <abbr title="Transmission Control Protocol">TCP</abbr> 21 no controle; no modo ativo clássico, dados partem da 20; no passivo, usa-se porta negociada |
| <abbr title="Secure Shell">SSH</abbr> e <abbr title="Secure Shell File Transfer Protocol">SFTP</abbr> | <abbr title="Transmission Control Protocol">TCP</abbr> 22 normalmente |

## 10. Diagnosticar sem transformar indício em certeza

Na situação inicial, comece pela configuração e avance do caminho local ao serviço, mudando uma variável de cada vez. Os comandos abaixo são do Windows; versões e políticas podem afetar a saída e as permissões.

| Pergunta | Comando e alcance |
|---|---|
| Qual é a configuração? | `ipconfig` resume; `ipconfig /all` detalha endereços, máscara, <abbr title="Roteador usado como próximo salto para outra rede">gateway</abbr>, <abbr title="Dynamic Host Configuration Protocol">DHCP</abbr>, <abbr title="Domain Name System">DNS</abbr> e <abbr title="Media Access Control">MAC</abbr> |
| A comunicação local responde? | `ping 127.0.0.1` observa a pilha local; `ping` para o <abbr title="Roteador usado como próximo salto para outra rede">gateway</abbr> observa a resposta desse destino |
| O nome é resolvido? | `nslookup` consulta registros <abbr title="Domain Name System">DNS</abbr> |
| Quais roteadores respondem no caminho? | `tracert` mostra saltos que respondem às sondagens |
| Qual vizinho está associado ao endereço? | `arp -a` exibe o <abbr title="Armazenamento temporário para reutilizar informações">cache</abbr> <abbr title="Internet Protocol version 4">IPv4</abbr>–<abbr title="Media Access Control">MAC</abbr> |
| Há serviço em escuta ou conexão? | `netstat -ano` mostra conexões, portas, endereços numéricos e <abbr title="Process Identifier">PID</abbr>, o identificador do processo |
| Há rota para o destino? | `netstat -r` mostra a tabela de roteamento |

Se um destino responde por endereço, mas não por nome, investigue <abbr title="Domain Name System">DNS</abbr>. Se a rede local funciona e destinos externos não, confira máscara, <abbr title="Roteador usado como próximo salto para outra rede">gateway</abbr>, rotas e acesso externo. Se o `ping` responde, mas o sistema não abre, examine serviço, porta, <abbr title="Filtro de tráfego conforme regras de segurança">firewall</abbr> e validação do certificado. **Resposta de eco não é resposta da aplicação**, e silêncio no `ping` pode ser filtragem; asteriscos no `tracert` indicam sondagens sem resposta, não necessariamente interrupção do encaminhamento.

`ipconfig /flushdns` limpa apenas o <abbr title="Armazenamento temporário para reutilizar informações">cache</abbr> local do resolvedor, não corrige os registros autoritativos. `ipconfig /release` libera a concessão <abbr title="Dynamic Host Configuration Protocol for Internet Protocol version 4">DHCPv4</abbr> e pode interromper a conexão; `/renew` solicita renovação. São ações sobre a configuração, não comandos de simples observação nem soluções universais para falhas de rede.

## 11. Interoperabilidade: trocar dados que possam ser usados

**Exemplo hipotético:** um sistema envia `{"situacao":1}`. A mensagem chega intacta, mas “1” significa “ativo” no emissor e “inativo” no destinatário. A rede funcionou; a decisão poderá estar errada. **Interoperabilidade** permite a sistemas e organizações cooperar com informações utilizáveis, não apenas conectar-se.

A dimensão **técnica** cuida de protocolos, formatos e processamento da troca. A **semântica** exige significados compartilhados para campos, códigos e unidades. A **organizacional** alinha processos, responsabilidades e acordos: quem mantém os códigos e corrige divergências? As dimensões são complementares.

### 11.1 Interface, arquitetura, protocolo e formato

Uma **<abbr title="Application Programming Interface">API</abbr>** é uma interface de programação: contrato de operações expostas por um sistema, com entradas e respostas previstas, não um banco de dados. Pode usar **<abbr title="Hypertext Transfer Protocol">HTTP</abbr>** para os pedidos e **<abbr title="JavaScript Object Notation">JSON</abbr>** ou **<abbr title="Extensible Markup Language">XML</abbr>** para representar dados. <abbr title="JavaScript Object Notation">JSON</abbr> organiza valores, objetos e listas; <abbr title="Extensible Markup Language">XML</abbr> usa elementos marcados por etiquetas. Formato compatível não garante significado compartilhado.

**<abbr title="Representational State Transfer">REST</abbr>** é um estilo arquitetural: orienta a interação com recursos por uma interface uniforme, separa cliente e servidor e exige que cada requisição traga as informações necessárias ao seu entendimento, sem depender de contexto de sessão guardado pelo servidor entre pedidos. Não obriga o uso de <abbr title="JavaScript Object Notation">JSON</abbr>, e uma <abbr title="Application Programming Interface">API</abbr> que usa <abbr title="Hypertext Transfer Protocol">HTTP</abbr> e <abbr title="JavaScript Object Notation">JSON</abbr> não é automaticamente <abbr title="Representational State Transfer">REST</abbr>. **<abbr title="Especificação para descrever interfaces de serviços web">OpenAPI</abbr>** descreve interfaces <abbr title="Hypertext Transfer Protocol">HTTP</abbr>, documentando operações, parâmetros e respostas; descrevê-las também não garante interoperabilidade semântica.

### 11.2 Padrões públicos e limites jurídicos

A **<abbr title="Padrões de Interoperabilidade de Governo Eletrônico">e-PING</abbr>** estabelece premissas, políticas e especificações mínimas para interoperabilidade no Poder Executivo federal e suas interações com outros Poderes, entes e sociedade. O documento de referência de 2018 trabalha com as dimensões **técnica, semântica e organizacional**. A análise jurídica é necessária, mas não deve ser apresentada como uma quarta dimensão oficial desse documento.

A adoção deve ser observada pelos integrantes do **<abbr title="Sistema de Administração dos Recursos de Tecnologia da Informação">SISP</abbr>** no planejamento da contratação, aquisição e atualização de sistemas e equipamentos. Para outros Poderes da União e demais entes federativos, é facultativa no regime das Portarias nº 92/2014 e nº 41/2019; não vincula automaticamente todo órgão brasileiro. A preferência por padrões abertos admite padrões proprietários transitoriamente no legado ou quando não existir padrão aberto, respeitados segurança e integridade. **Legado** são as soluções já existentes: devem evoluir nas manutenções e atualizações, sem substituição imediata obrigatória de tudo.

Na **Lei nº 14.129/2021**, a interoperabilidade integra as diretrizes do Governo Digital. A lei alcança a administração federal especificada no artigo 2º; para as administrações dos demais entes federados, seus comandos dependem de adoção por atos normativos próprios. A integração deve respeitar finalidade, competência, sigilos, **<abbr title="Lei de Acesso à Informação">LAI</abbr>** e **<abbr title="Lei Geral de Proteção de Dados Pessoais">LGPD</abbr>**, entre as normas indicadas no artigo 1º. É preciso verificar quem pode receber quais dados e para qual finalidade: **capacidade técnica de compartilhar não equivale a autorização jurídica para fazê-lo**.
