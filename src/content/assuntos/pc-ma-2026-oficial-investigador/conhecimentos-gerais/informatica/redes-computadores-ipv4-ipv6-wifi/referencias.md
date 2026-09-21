# Referências

## Escopo e reaproveitamento

- <abbr title="Centro Brasileiro de Pesquisa em Avaliação e Seleção e de Promoção de Eventos">Cebraspe</abbr>. [Edital nº 1 — PC-MA 2026 — Oficial Investigador de Polícia](https://cdn.cebraspe.org.br/concursos/PC_MA_26_INVESTIGADOR/arquivos/9EE70E72CE79EB274C5319BEEB5B9B7D8519FF48DA21986A0830B5DB02C4F8B0.pdf). Item 20.2.2, Informática, item 6. Publicado em 13 jul. 2026.
- Reaproveitamento parcial de `src/content/biblioteca/competencias-digitais-informatica-aplicada-setor-publico/redes-tcp-ip-interoperabilidade/`: `conteudo.md` `819a2ba0355f8db797caf3c13d4f37834b876b70`; `cheat-sheet.md` `e9429dc03a05e016097cfabb1ec685324f9a12c1`; `questoes.json` `5c61956e0a200fd8e7f3208b797d7411deb15e8a`; `referencias.md` `2300a433fea94a823bbfd5fbbdcf95ad712a9cbd`. O recorte local conserva conceitos básicos de redes, alcance, endereçamento e rede sem fio; protocolos de aplicação, diagnóstico e interoperabilidade ficam fora, salvo pontes indispensáveis. Os identificadores acima preservam a proveniência da cópia, não são afirmação de que o doador permaneceu inalterado.

## Redes, equipamentos e endereçamento

- CISCO. [What is computer networking?](https://www.cisco.com/site/us/en/learn/topics/networking/what-is-computer-networking.html). Seções sobre funcionamento e tipos de redes: funções de comutador, roteador e ponto de acesso; alcance local e amplo. Consulta em 21 set. 2026.
- POSTEL, Jon, editor. [RFC 791 — Internet Protocol](https://www.rfc-editor.org/rfc/rfc791.html). Setembro de 1981. Endereçamento, pacotes e encaminhamento entre redes. Consulta em 21 set. 2026.
- REKHTER, Yakov et al. [RFC 1918 — Address Allocation for Private Internets](https://www.rfc-editor.org/rfc/rfc1918.html). Fevereiro de 1996, seção 3. Três faixas privadas de <abbr title="Internet Protocol version 4">IPv4</abbr>. Consulta em 21 set. 2026.
- BRADEN, Robert, editor. [RFC 1122 — Requirements for Internet Hosts — Communication Layers](https://www.rfc-editor.org/rfc/rfc1122.html). Outubro de 1989, seção 3.2.1.3. Endereços de <abbr title="Comunicação do dispositivo consigo mesmo">loopback</abbr> na faixa `127.0.0.0/8`. Consulta em 21 set. 2026.
- CHESHIRE, Stuart; ABOBA, Bernard; GUTTMAN, Erik. [RFC 3927 — Dynamic Configuration of IPv4 Link-Local Addresses](https://www.rfc-editor.org/rfc/rfc3927.html). Maio de 2005, seções 1 e 2. Faixa `169.254.0.0/16`, autoconfiguração e restrição ao enlace local. Consulta em 21 set. 2026.
- HINDEN, R.; DEERING, S. [RFC 4291 — IP Version 6 Addressing Architecture](https://www.rfc-editor.org/rfc/rfc4291.html). Fevereiro de 2006, seções 2, 2.2, 2.5.3, 2.5.6 e 2.6. Endereços de 128 bits, representação, <abbr title="Comunicação do dispositivo consigo mesmo">loopback</abbr>, <abbr title="Endereçamento para comunicação no mesmo enlace">link-local</abbr> e distinção entre <abbr title="Entrega a uma interface específica">unicast</abbr>, <abbr title="Entrega a todas as interfaces do grupo identificado">multicast</abbr> e <abbr title="Entrega a um membro do grupo, escolhido pelo roteamento">anycast</abbr>. Consulta em 21 set. 2026.
- KAWAMURA, Seiichi; KAWASHIMA, Masanobu. [RFC 5952 — A Recommendation for IPv6 Address Text Representation](https://www.rfc-editor.org/rfc/rfc5952.html). Agosto de 2010, seções 4 e 4.2. Forma de escrita preferida e critérios de compressão, distintos da validade das formas aceitas. Consulta em 21 set. 2026.

## Rede sem fio e proteção

- INSTITUTE OF ELECTRICAL AND ELECTRONICS ENGINEERS. [IEEE 802.3 Ethernet](https://www.ieee802.org/3/). Família de padrões Ethernet. Consulta em 21 set. 2026.
- INSTITUTE OF ELECTRICAL AND ELECTRONICS ENGINEERS. [IEEE 802.11 Wireless Local Area Networks](https://www.ieee802.org/11/). Família de padrões de redes locais sem fio. Consulta em 21 set. 2026.
- APPLE. [Recursos de segurança em conexões a redes sem fio](https://support.apple.com/pt-br/guide/security/sec8a67fa93d/web). Guia de segurança da plataforma: autenticação e confidencialidade da conexão sem fio com <abbr title="Wi-Fi Protected Access 2 — proteção de acesso sem fio">WPA2</abbr> e <abbr title="Wi-Fi Protected Access 3 — proteção de acesso sem fio">WPA3</abbr>. Usado para o mecanismo de proteção, não para importar a lista comercial de dispositivos compatíveis. Consulta em 21 set. 2026.

## Questões anteriores verificadas

- FUNDAÇÃO GETULIO VARGAS. [ALEMA 2023 — Técnico de Gestão Administrativa — Analista de Suporte de Rede — Tipo 1](https://conhecimento.fgv.br/sites/default/files/concursos/cns106-tecnico-de-gestao-administrativa-analista-de-suporte-de-redecns106-tipo-1.pdf). Questões 31 e 43: conversão de endereço <abbr title="Internet Protocol version 4">IPv4</abbr> para binário e quantidade de bits do <abbr title="Internet Protocol version 6">IPv6</abbr>. Adaptações locais não literais, com identificadores preservados `u026-p01` e `u026-p02`.
- FUNDAÇÃO GETULIO VARGAS. [ALEMA 2023 — gabarito definitivo retificado](https://conhecimento.fgv.br/sites/default/files/concursos/alema-2023-gabarito-final-para-publicacao-retificado-04.10.2023.pdf). Página 9, cargo Analista de Suporte de Rede, Tipo 1: questão 31 = D; questão 43 = A. Questões e gabaritos reconferidos em 21 set. 2026.

O corte do concurso permanece **13 jul. 2026**. A consulta de 21 set. 2026 revalida fundamentos técnicos anteriores ao corte e as duas questões já aproveitadas; não amplia o programa nem incorpora alteração legislativa posterior.
