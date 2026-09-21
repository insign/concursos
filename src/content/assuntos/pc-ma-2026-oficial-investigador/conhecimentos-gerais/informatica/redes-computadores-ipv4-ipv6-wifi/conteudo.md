---
schemaVersion: 1
title: Redes de computadores, IPv4, IPv6 e Wi‑Fi
description: Conceitos básicos de redes, alcance, dispositivos, endereçamento IPv4 e IPv6 e redes sem fio.
order: 26
storageId: pc-u026
---

# Redes de computadores, <abbr title="Internet Protocol version 4">IPv4</abbr>, <abbr title="Internet Protocol version 6">IPv6</abbr> e <abbr title="Tecnologia de rede local sem fio">Wi‑Fi</abbr>

## 1. Antes do endereço, entenda o caminho

**Cenário hipotético:** um computador envia dados a uma impressora da mesma rede e depois acessa um sistema em outra rede. Na primeira comunicação, basta alcançar o destino local; na segunda, é necessário encaminhar os dados entre redes. Conectar equipamentos e escolher caminhos entre redes são funções diferentes.

Uma **interface de rede** é a conexão pela qual um dispositivo participa da comunicação, como a conexão cabeada ou a sem fio. O <abbr title="Internet Protocol — protocolo da Internet">IP</abbr> estabelece regras de endereçamento e encaminhamento de dados entre redes. Seu endereço identifica uma interface nesse contexto; não é o mesmo que o endereço usado na comunicação local.

Os dados circulam em unidades organizadas. **Pacote** é a unidade encaminhada pelo <abbr title="Internet Protocol — protocolo da Internet">IP</abbr>. Para atravessar uma rede local, ele é transportado em uma unidade dessa tecnologia, chamada **quadro**. A camada de **enlace** cuida dessa comunicação local; o encaminhamento entre redes é outra função. Não é preciso decorar todas as camadas para entender a diferença.

Ao resolver a questão, separe **alcance → equipamento → endereço → meio de acesso**. Um nome de rede, um endereço e uma senha respondem a perguntas distintas.

## 2. Alcance: local, metropolitano ou amplo

A classificação pelo alcance descreve a escala da rede, não um equipamento ou uma tecnologia obrigatória.

| Tipo | Ideia central | Exemplo hipotético |
| --- | --- | --- |
| <abbr title="Local Area Network — rede de área local">LAN</abbr> | área local, como sala, prédio ou campus | computadores de uma delegacia |
| <abbr title="Metropolitan Area Network — rede de área metropolitana">MAN</abbr> | interliga pontos em escala metropolitana | unidades espalhadas por uma cidade |
| <abbr title="Wide Area Network — rede de longa distância">WAN</abbr> | cobre áreas geográficas amplas | ligação entre unidades em cidades diferentes |

Uma <abbr title="Wide Area Network — rede de longa distância">WAN</abbr> pode usar diferentes meios e serviços de telecomunicações. A Internet é uma rede mundial de redes; uma <abbr title="Wide Area Network — rede de longa distância">WAN</abbr> privada não se confunde, por isso, com a Internet pública.

## 3. Meio e equipamentos: quem faz o quê?

Em redes locais cabeadas, **Ethernet** é uma família de tecnologias padronizada pelo <abbr title="Institute of Electrical and Electronics Engineers">IEEE</abbr> 802.3. Nas redes locais sem fio, a família <abbr title="Institute of Electrical and Electronics Engineers">IEEE</abbr> 802.11 sustenta tecnologias conhecidas como <abbr title="Tecnologia de rede local sem fio">Wi‑Fi</abbr>.

### 3.1 Comutador: comunicação na rede local

O **<abbr title="Comutador que encaminha dados na rede local">switch</abbr>**, ou comutador, conecta dispositivos e, na função de enlace, encaminha quadros principalmente com base nos endereços locais aprendidos. Essa função não equivale a escolher rotas entre redes <abbr title="Internet Protocol — protocolo da Internet">IP</abbr> diferentes.

### 3.2 Roteador: comunicação entre redes

O **roteador** interliga redes e decide para onde encaminhar pacotes <abbr title="Internet Protocol — protocolo da Internet">IP</abbr> segundo sua tabela de rotas. No cenário inicial, sair da rede do computador e alcançar outra rede exige essa função de roteamento.

### 3.3 Ponto de acesso: entrada sem fio

Um **ponto de acesso sem fio** conecta clientes <abbr title="Tecnologia de rede local sem fio">Wi‑Fi</abbr> à rede local. Roteador, <abbr title="Comutador que encaminha dados na rede local">switch</abbr> e ponto de acesso podem estar reunidos no mesmo aparelho; suas funções continuam diferentes. Existem também comutadores com capacidade de roteamento: a distinção de prova é funcional, não uma proibição de reunir recursos.

## 4. Topologia: forma de interligação

**Topologia** descreve a organização das conexões. Os pontos participantes da rede são chamados **nós**. Na topologia em **estrela**, eles se ligam a um ponto central. Em uma rede Ethernet com comutador central, a falha do cabo de uma estação tende a afetar aquela estação; a falha do equipamento central pode afetar vários ou todos os nós ligados a ele.

Em **barramento**, os nós compartilham um meio principal; em **anel**, as conexões formam um circuito fechado. Não confunda esses desenhos com o alcance da rede: uma rede local pode ter diferentes formas de interligação.

## 5. <abbr title="Internet Protocol version 4">IPv4</abbr>: 32 <abbr title="Dígitos binários, que valem zero ou um">bits</abbr> organizados em quatro <abbr title="Grupos de oito bits">octetos</abbr>

Um **bit** é um dígito binário: vale `0` ou `1`. O <abbr title="Internet Protocol version 4">IPv4</abbr> usa endereços de **32 bits**, normalmente escritos como quatro números decimais separados por pontos, por exemplo `192.168.10.50`.

Cada parte é um **octeto**, isto é, oito bits. São 256 combinações possíveis, correspondentes aos valores decimais de `0` a `255`. Os pontos apenas separam os octetos.

### 5.1 Decimal para binário sem decorar números inteiros

Da esquerda para a direita, os oito bits têm os pesos:

`128 64 32 16 8 4 2 1`

Para representar `50`, use $32 + 16 + 2$: essas posições recebem `1` e as demais, `0`. O resultado é `00110010`. Aplicando o procedimento aos quatro octetos:

`192.168.10.50` → `11000000.10101000.00001010.00110010`

A representação mudou de decimal para binária; o endereço permaneceu o mesmo.

### 5.2 Prefixo e identificação dentro da rede

**Host** é um dispositivo que origina ou recebe uma comunicação na rede. Na notação <abbr title="Classless Inter-Domain Routing — roteamento sem classes">CIDR</abbr>, o sufixo `/n` informa quantos bits iniciais pertencem ao **prefixo da rede**. Os demais compõem a parte usada para identificar a interface dentro daquela rede, frequentemente chamada parte de host.

Em `/24`, são 24 bits de prefixo e oito restantes. Em `/26`, restam seis, pois $32 - 26 = 6$. Logo, **`/24` não significa 24 hosts**. Aumentar o comprimento do prefixo deixa menos bits para essa parte do endereço.

### 5.3 Faixas especiais

- `10.0.0.0/8`, `172.16.0.0/12` e `192.168.0.0/16`: faixas privadas definidas na <abbr title="Request for Comments — documento técnico da Internet">RFC</abbr> 1918;
- `127.0.0.0/8`: **loopback**, comunicação do dispositivo consigo mesmo;
- `169.254.0.0/16`: faixa **link-local**, de autoconfiguração para comunicação no mesmo enlace, sem encaminhamento por roteadores para outros enlaces.

Endereço privado é válido em seu contexto, mas não se destina ao roteamento público global. **Privado, loopback e link-local não são sinônimos:** indicam finalidades e limites diferentes.

## 6. <abbr title="Internet Protocol version 6">IPv6</abbr>: 128 bits e representação <abbr title="Escrita numérica de base dezesseis">hexadecimal</abbr>

O <abbr title="Internet Protocol version 6">IPv6</abbr> usa endereços de **128 bits**. A forma hexadecimal completa tem oito grupos de quatro dígitos separados por dois-pontos. **Hexadecimal** é a base 16: usa `0` a `9` e `a` a `f`; cada dígito representa quatro bits. Assim, oito grupos de quatro dígitos totalizam $8 \times 4 \times 4 = 128$ bits.

Exemplo hipotético de representação completa:

`2001:0db8:0000:0000:0000:0000:0000:0001`

Zeros à esquerda de um grupo podem ser omitidos. Uma sequência contínua de grupos zero pode ser substituída por `::`, **uma única vez** no endereço. No exemplo, resulta `2001:db8::1`.

Duas compressões `::` deixariam indeterminada a distribuição dos grupos omitidos. Já a forma completa não se torna inválida só porque existe uma escrita mais curta. A representação **canônica**, isto é, a forma padronizada preferida para escrita, acrescenta critérios como comprimir a maior sequência de grupos zero; não se deve confundir preferência de escrita com validade de toda forma aceita.

### 6.1 Endereços e formas de entrega

O endereço `::1` é de <abbr title="Comunicação do dispositivo consigo mesmo">loopback</abbr>. A faixa `fe80::/10` é <abbr title="Endereçamento para comunicação no mesmo enlace">link-local</abbr>.

Para entender a entrega dos pacotes, pense no destinatário: pode ser uma interface específica, todos os membros de um grupo ou apenas um dos membros. São, respectivamente, **unicast**, **multicast** e **anycast**. Neste último, a escolha recai sobre o membro considerado mais próximo pelas métricas de roteamento, não necessariamente pela distância geográfica.

| Forma | Destino da entrega |
| --- | --- |
| <abbr title="Entrega a uma interface específica">unicast</abbr> | uma interface identificada |
| <abbr title="Entrega a todas as interfaces do grupo identificado">multicast</abbr> | todos os membros do grupo |
| <abbr title="Entrega a um membro do grupo, escolhido pelo roteamento">anycast</abbr> | um dos membros do grupo |

**Broadcast** é a difusão para todos no domínio correspondente. O <abbr title="Internet Protocol version 6">IPv6</abbr> **não possui endereços de broadcast**: essa função é suprida por <abbr title="Entrega a todas as interfaces do grupo identificado">multicast</abbr>. <abbr title="Entrega a um membro do grupo, escolhido pelo roteamento">Anycast</abbr> não significa entregar a todos e não é substituto equivalente dessa difusão.

## 7. <abbr title="Tecnologia de rede local sem fio">Wi‑Fi</abbr>: nome, frequência e proteção

O ponto de acesso utiliza um identificador chamado <abbr title="Service Set Identifier — identificador da rede sem fio">SSID</abbr>. Ele identifica logicamente a rede; **não é a senha** nem substitui a autenticação, que verifica se o acesso é permitido.

Equipamentos podem operar em faixas como 2,4 <abbr title="Gigahertz — bilhões de ciclos por segundo">GHz</abbr> e 5 <abbr title="Gigahertz — bilhões de ciclos por segundo">GHz</abbr>; gerações e equipamentos compatíveis podem também usar 6 <abbr title="Gigahertz — bilhões de ciclos por segundo">GHz</abbr>, conforme a regulamentação. Frequência, taxa de transmissão e alcance não são a mesma grandeza: seus valores dependem da tecnologia e do ambiente. Não memorize um único alcance ou velocidade como universal.

<abbr title="Wi-Fi Protected Access 2 — proteção de acesso sem fio">WPA2</abbr> e <abbr title="Wi-Fi Protected Access 3 — proteção de acesso sem fio">WPA3</abbr> tratam da autenticação e proteção da comunicação sem fio. Não garantem, por si sós, criptografia de ponta a ponta de qualquer aplicativo, isto é, proteção do conteúdo durante todo o percurso entre os participantes da aplicação.

## 8. Recuperação e pegadinhas

Ao ler uma alternativa, identifique **alcance → meio → equipamento → versão <abbr title="Internet Protocol — protocolo da Internet">IP</abbr> → prefixo/endereço → efeito**. Depois procure a troca de funções:

- <abbr title="Local Area Network — rede de área local">LAN</abbr> não determina uma tecnologia única; <abbr title="Comutador que encaminha dados na rede local">switch</abbr>, roteador e ponto de acesso não são funções idênticas;
- <abbr title="Internet Protocol version 4">IPv4</abbr> tem 32 bits; <abbr title="Internet Protocol version 6">IPv6</abbr>, 128; um octeto tem oito;
- `/24` mede bits de prefixo, não número de <abbr title="Dispositivos que originam ou recebem comunicação na rede">hosts</abbr>;
- endereço privado não é inválido; forma completa não é inválida por não estar comprimida;
- `::` só pode aparecer uma vez; <abbr title="Internet Protocol version 6">IPv6</abbr> não usa <abbr title="Difusão para todos no domínio correspondente">broadcast</abbr>;
- <abbr title="Entrega a todas as interfaces do grupo identificado">multicast</abbr> entrega ao grupo inteiro; <abbr title="Entrega a um membro do grupo, escolhido pelo roteamento">anycast</abbr>, a um membro;
- <abbr title="Service Set Identifier — identificador da rede sem fio">SSID</abbr> não é senha; <abbr title="Tecnologia de rede local sem fio">Wi‑Fi</abbr> não é Internet.

**Pergunta de recuperação:** no cenário inicial, o que muda quando o destino deixa de estar na rede local? A comunicação passa a exigir encaminhamento entre redes; isso não muda automaticamente a versão do endereço nem o meio de acesso do computador.
