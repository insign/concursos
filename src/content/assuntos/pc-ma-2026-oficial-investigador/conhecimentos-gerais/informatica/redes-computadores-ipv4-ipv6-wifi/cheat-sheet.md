# Redes de computadores, <abbr title="Internet Protocol version 4">IPv4</abbr>, <abbr title="Internet Protocol version 6">IPv6</abbr> e <abbr title="Tecnologia de rede local sem fio">Wi‑Fi</abbr> — revisão rápida

## Alcance e funções

| Elemento | Recuperação |
| --- | --- |
| <abbr title="Local Area Network — rede de área local">LAN</abbr> | alcance local |
| <abbr title="Metropolitan Area Network — rede de área metropolitana">MAN</abbr> | alcance metropolitano |
| <abbr title="Wide Area Network — rede de longa distância">WAN</abbr> | alcance geográfico amplo |
| <abbr title="Comutador que encaminha dados na rede local">switch</abbr> de enlace | encaminha quadros na rede local |
| roteador | encaminha pacotes entre redes <abbr title="Internet Protocol — protocolo da Internet">IP</abbr> |
| ponto de acesso | conecta clientes sem fio à rede local |

Funções distintas podem coexistir no mesmo aparelho. Em **estrela**, a falha central pode afetar vários nós; a falha de um cabo de estação tende a afetar aquela estação.

## <abbr title="Internet Protocol version 4">IPv4</abbr>

**32 bits = quatro octetos**; cada octeto decimal vai de `0` a `255`.

Pesos: `128 64 32 16 8 4 2 1`.

`50 = 32 + 16 + 2` → `00110010`.

<abbr title="Classless Inter-Domain Routing — roteamento sem classes">CIDR</abbr>: `/24` = 24 bits de prefixo, oito restantes; `/26` deixa seis. Prefixo maior → menos bits para a parte de <abbr title="Dispositivo que origina ou recebe comunicação na rede">host</abbr>.

| Finalidade | Faixa |
| --- | --- |
| privadas | `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` |
| <abbr title="Comunicação do dispositivo consigo mesmo">loopback</abbr> | `127.0.0.0/8` |
| <abbr title="Endereçamento para comunicação no mesmo enlace">link-local</abbr> | `169.254.0.0/16` |

## <abbr title="Internet Protocol version 6">IPv6</abbr>

**128 bits** = oito grupos de quatro dígitos hexadecimais na forma completa.

- Zeros à esquerda podem ser omitidos; `::` comprime grupos zero **uma única vez**.
- `::1` = <abbr title="Comunicação do dispositivo consigo mesmo">loopback</abbr>; `fe80::/10` = <abbr title="Endereçamento para comunicação no mesmo enlace">link-local</abbr>.
- Forma completa pode ser válida mesmo sem compressão.
- Não possui <abbr title="Difusão para todos no domínio correspondente">broadcast</abbr>; essa função é suprida por <abbr title="Entrega a todas as interfaces do grupo identificado">multicast</abbr>.

**Entrega:** <abbr title="Entrega a uma interface específica">unicast</abbr> → uma interface; <abbr title="Entrega a todas as interfaces do grupo identificado">multicast</abbr> → todos do grupo; <abbr title="Entrega a um membro do grupo, escolhido pelo roteamento">anycast</abbr> → um do grupo.

## <abbr title="Tecnologia de rede local sem fio">Wi‑Fi</abbr>

- Família <abbr title="Institute of Electrical and Electronics Engineers">IEEE</abbr> 802.11; Ethernet → <abbr title="Institute of Electrical and Electronics Engineers">IEEE</abbr> 802.3.
- <abbr title="Service Set Identifier — identificador da rede sem fio">SSID</abbr> = identificador da rede, **não senha**.
- <abbr title="Wi-Fi Protected Access 2 — proteção de acesso sem fio">WPA2</abbr>/<abbr title="Wi-Fi Protected Access 3 — proteção de acesso sem fio">WPA3</abbr> protegem a comunicação sem fio; não garantem proteção de ponta a ponta de todo aplicativo.
- Frequência não é velocidade nem alcance; <abbr title="Tecnologia de rede local sem fio">Wi‑Fi</abbr> não é Internet.

**Método:** alcance → meio → equipamento → versão <abbr title="Internet Protocol — protocolo da Internet">IP</abbr> → prefixo/endereço → efeito.
