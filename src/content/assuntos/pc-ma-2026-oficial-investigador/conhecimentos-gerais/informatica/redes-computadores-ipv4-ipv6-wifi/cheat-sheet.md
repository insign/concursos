# Redes de computadores, IPv4, IPv6 e Wi‑Fi — revisão rápida

## Alcance

| Tipo | Ideia |
| --- | --- |
| <abbr title="Local Area Network — rede de área local">LAN</abbr> | área local |
| <abbr title="Metropolitan Area Network — rede de área metropolitana">MAN</abbr> | escala metropolitana |
| <abbr title="Wide Area Network — rede de longa distância">WAN</abbr> | longa distância |

## Dispositivos

- **switch** → encaminha quadros na rede local;
- **roteador** → encaminha pacotes entre redes IP;
- **ponto de acesso** → conecta clientes Wi‑Fi à rede local;
- funções podem coexistir no mesmo equipamento físico.

## IPv4

<abbr title="Internet Protocol version 4">IPv4</abbr> = **32 bits = 4 octetos**.

Pesos de um octeto:

`128 64 32 16 8 4 2 1`

`50 = 32 + 16 + 2` → `00110010`.

Notação <abbr title="Classless Inter-Domain Routing — roteamento sem classes">CIDR</abbr>:

- `/24` → 24 bits de prefixo;
- prefixo maior → menos bits de host.

Faixas úteis:

- privadas: `10/8`, `172.16/12`, `192.168/16`;
- loopback: `127/8`;
- link-local: `169.254/16`.

## IPv6

<abbr title="Internet Protocol version 6">IPv6</abbr> = **128 bits**, oito grupos hexadecimais.

- zeros à esquerda podem ser omitidos;
- `::` comprime uma sequência de grupos zero e só pode aparecer uma vez;
- `::1` = loopback;
- `fe80::/10` = link-local;
- não usa broadcast.

## Wi‑Fi

- família <abbr title="Institute of Electrical and Electronics Engineers">IEEE</abbr> 802.11;
- <abbr title="Service Set Identifier — nome lógico da rede Wi‑Fi">SSID</abbr> = nome lógico da rede, não senha;
- <abbr title="Wi‑Fi Protected Access 2 — proteção de acesso sem fio">WPA2</abbr>/<abbr title="Wi‑Fi Protected Access 3 — proteção de acesso sem fio">WPA3</abbr> protegem o acesso sem fio;
- Wi‑Fi ≠ Internet.

## Método

**alcance → meio → equipamento → versão IP → prefixo/endereço → efeito**

## Pegadinhas

- switch ≠ roteador;
- <abbr title="Internet Protocol version 4">IPv4</abbr> = 32 bits;
- <abbr title="Internet Protocol version 6">IPv6</abbr> = 128 bits;
- octeto = 8 bits;
- `/24` ≠ 24 hosts;
- privado ≠ inválido;
- representação <abbr title="Internet Protocol version 6">IPv6</abbr> não comprimida pode ser válida;
- <abbr title="Service Set Identifier — nome lógico da rede Wi‑Fi">SSID</abbr> ≠ senha.