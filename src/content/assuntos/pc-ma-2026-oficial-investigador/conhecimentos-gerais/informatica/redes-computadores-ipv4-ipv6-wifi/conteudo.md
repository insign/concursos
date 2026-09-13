---
schemaVersion: 1
title: Redes de computadores, IPv4, IPv6 e Wi‑Fi
description: Conceitos básicos de redes, alcance, dispositivos, endereçamento IPv4 e IPv6 e redes sem fio.
order: 26
storageId: pc-u026
---

# Redes de computadores, IPv4, IPv6 e Wi‑Fi

## 1. Antes do endereço, entenda o caminho

Uma rede existe para permitir que dispositivos troquem dados por algum meio de comunicação. Para resolver questões de prova, separe quatro perguntas:

1. **qual é o alcance da rede?**
2. **qual equipamento encaminha o tráfego?**
3. **qual versão do endereço IP está sendo usada?**
4. **o acesso é cabeado ou sem fio?**

Essa ordem evita misturar conceitos de camadas diferentes. Um endereço IP identifica uma interface no contexto de uma rede; ele não é o mesmo que o endereço físico usado no enlace, nem substitui o papel de um roteador.

## 2. Alcance: local, metropolitano ou amplo

| Tipo | Ideia central | Exemplo hipotético |
| --- | --- | --- |
| <abbr title="Local Area Network — rede de área local">LAN</abbr> | área local, como sala, prédio ou campus | computadores de uma delegacia |
| <abbr title="Metropolitan Area Network — rede de área metropolitana">MAN</abbr> | interliga pontos em escala metropolitana | unidades espalhadas por uma cidade |
| <abbr title="Wide Area Network — rede de longa distância">WAN</abbr> | cobre áreas geográficas amplas | ligação entre unidades em cidades diferentes |

Esses nomes descrevem **escala e finalidade**, não uma tecnologia única. Uma <abbr title="Wide Area Network — rede de longa distância">WAN</abbr> pode usar diferentes meios e serviços de telecomunicações. A Internet, por sua vez, é uma rede mundial de redes; não é sinônimo obrigatório de qualquer <abbr title="Wide Area Network — rede de longa distância">WAN</abbr> privada.

## 3. Meio e equipamentos: quem faz o quê?

Em uma rede local cabeada, a família Ethernet é padronizada pelo <abbr title="Institute of Electrical and Electronics Engineers">IEEE</abbr> 802.3. Em redes locais sem fio, a família <abbr title="Institute of Electrical and Electronics Engineers">IEEE</abbr> 802.11 sustenta tecnologias conhecidas como Wi‑Fi.

### 3.1 Switch

O **switch** conecta dispositivos em uma mesma rede de enlace e encaminha quadros com base, principalmente, em endereços físicos aprendidos. Ele não substitui o roteador quando é necessário encaminhar pacotes entre redes IP diferentes.

### 3.2 Roteador

O **roteador** interliga redes e decide para onde encaminhar pacotes IP segundo sua tabela de rotas. A pergunta de prova costuma ser simples: se o tráfego precisa sair de uma rede IP e chegar a outra, o papel central é de roteamento.

### 3.3 Ponto de acesso

Um **ponto de acesso sem fio** conecta clientes Wi‑Fi à rede local. Em equipamentos domésticos, roteador, switch e ponto de acesso podem estar reunidos na mesma caixa física; isso não torna suas funções conceitualmente idênticas.

## 4. Topologia: forma de interligação

Na topologia em **estrela**, os nós se conectam a um ponto central. É comum em redes Ethernet atuais com switch central. A falha de um cabo de uma estação tende a afetar aquela estação; a falha do equipamento central pode afetar grande parte ou toda a rede ligada a ele.

Topologias em barramento e anel existem como conceitos clássicos, mas o item do edital não exige transformar este capítulo em história detalhada de arquiteturas. Para prova, reconheça principalmente que **topologia descreve a organização das conexões**.

## 5. IPv4: 32 bits organizados em quatro octetos

<abbr title="Internet Protocol version 4">IPv4</abbr> usa endereços de **32 bits**. A forma textual mais comum separa quatro números decimais por pontos, por exemplo:

`192.168.10.50`

Cada parte representa um **octeto**, isto é, 8 bits, com valor decimal de `0` a `255`.

### 5.1 Decimal para binário sem decorar números inteiros

Para converter um octeto, use os pesos:

`128 64 32 16 8 4 2 1`

Exemplo com `50`:

- `50 = 32 + 16 + 2`;
- portanto, os pesos 32, 16 e 2 recebem `1`;
- os demais recebem `0`;
- resultado: `00110010`.

Assim, `192.168.10.50` vira:

`11000000.10101000.00001010.00110010`

O ponto separa octetos; não altera os bits.

### 5.2 Prefixo e parte de host

Na notação <abbr title="Classless Inter-Domain Routing — roteamento sem classes">CIDR</abbr>, o sufixo `/n` informa quantos bits iniciais pertencem ao **prefixo da rede**.

Exemplo: em `/24`, os primeiros 24 bits formam o prefixo e restam 8 bits para a parte de interface/host.

Não confunda `/24` com “24 hosts”. Em uma sub-rede convencional, aumentar o comprimento do prefixo deixa menos bits para endereços de host.

### 5.3 Faixas especiais de alto rendimento

- `10.0.0.0/8`, `172.16.0.0/12` e `192.168.0.0/16`: faixas privadas previstas pela RFC 1918;
- `127.0.0.0/8`: faixa de loopback, usada para referência ao próprio host;
- `169.254.0.0/16`: faixa link-local de autoconfiguração <abbr title="Internet Protocol version 4">IPv4</abbr>.

Endereço privado não é sinônimo de endereço inválido: ele é válido no contexto privado, embora não seja destinado ao roteamento público global como um endereço público comum.

## 6. IPv6: 128 bits e representação hexadecimal

<abbr title="Internet Protocol version 6">IPv6</abbr> usa endereços de **128 bits**, normalmente escritos em oito grupos hexadecimais separados por dois-pontos.

Exemplo:

`2001:0db8:0000:0000:0000:0000:0000:0001`

A representação pode ser comprimida:

- zeros à esquerda de um grupo podem ser omitidos;
- uma sequência contínua de grupos zero pode ser substituída por `::` **uma única vez** no endereço.

Assim, o exemplo pode aparecer como `2001:db8::1`.

### 6.1 Alguns endereços úteis

- `::1`: loopback;
- `fe80::/10`: faixa link-local.

<abbr title="Internet Protocol version 6">IPv6</abbr> **não usa broadcast** como o <abbr title="Internet Protocol version 4">IPv4</abbr>. Funções equivalentes de distribuição usam mecanismos como multicast e, em certos cenários, anycast.

Uma questão que mostre forma não comprimida de endereço <abbr title="Internet Protocol version 6">IPv6</abbr> não a torna inválida só porque existe uma forma textual mais curta. Validade e representação canônica são perguntas diferentes.

## 7. Wi‑Fi: rede local sem fio

Wi‑Fi é uma tecnologia de rede local sem fio associada à família <abbr title="Institute of Electrical and Electronics Engineers">IEEE</abbr> 802.11.

O ponto de acesso anuncia ou utiliza um identificador de rede chamado <abbr title="Service Set Identifier — nome lógico da rede Wi‑Fi">SSID</abbr>. Esse identificador **não é a senha** e não substitui mecanismos de autenticação e proteção.

Padrões e equipamentos podem operar em diferentes faixas de frequência, como 2,4 GHz e 5 GHz, e versões mais recentes podem também utilizar 6 GHz conforme padrão, equipamento e regulamentação. Para o recorte do edital, o essencial é entender que frequência, taxa e alcance dependem do ambiente e da geração da tecnologia; não memorize um único valor como regra universal.

Mecanismos como <abbr title="Wi‑Fi Protected Access 2 — proteção de acesso sem fio">WPA2</abbr> e <abbr title="Wi‑Fi Protected Access 3 — proteção de acesso sem fio">WPA3</abbr> tratam da proteção do acesso à rede sem fio. Eles não transformam, por si sós, toda a comunicação de qualquer aplicativo em conteúdo cifrado ponta a ponta.

## 8. Método de prova

Use a sequência:

**alcance → meio → equipamento → versão IP → prefixo/endereço → efeito**.

Pergunte:

1. é rede local, metropolitana ou de longa distância?
2. o equipamento conecta dispositivos na mesma rede ou roteia entre redes?
3. o endereço tem 32 ou 128 bits?
4. o prefixo está sendo confundido com número de hosts?
5. a representação foi apenas comprimida ou o endereço mudou?
6. Wi‑Fi está sendo confundido com Internet, senha ou segurança de aplicação?

## 9. Pegadinhas de alto retorno

- <abbr title="Local Area Network — rede de área local">LAN</abbr> ≠ tecnologia específica;
- switch ≠ roteador;
- ponto de acesso ≠ roteador, embora possam coexistir no mesmo equipamento;
- <abbr title="Internet Protocol version 4">IPv4</abbr> = 32 bits;
- <abbr title="Internet Protocol version 6">IPv6</abbr> = 128 bits;
- octeto = 8 bits;
- `/24` ≠ 24 hosts;
- endereço privado ≠ endereço inválido;
- `::` não pode ser usado duas vezes para comprimir duas sequências diferentes no mesmo endereço <abbr title="Internet Protocol version 6">IPv6</abbr>;
- <abbr title="Internet Protocol version 6">IPv6</abbr> não usa broadcast;
- <abbr title="Service Set Identifier — nome lógico da rede Wi‑Fi">SSID</abbr> ≠ senha;
- Wi‑Fi ≠ Internet.