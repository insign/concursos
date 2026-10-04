# Noções de redes de computadores

**Caminho:** conexão → configuração → localização pelo nome → encaminhamento → serviço. Impressão local funcionando não prova caminho externo nem serviço disponível.

| Elemento | Recuperação |
|---|---|
| <abbr title="Comutador que encaminha quadros no enlace local">Switch</abbr> de enlace | quadros e endereços <abbr title="Media Access Control — controle de acesso ao meio">MAC</abbr> na rede local |
| roteador | pacotes entre redes <abbr title="Internet Protocol — protocolo da Internet">IP</abbr> |
| ponto de acesso | clientes sem fio na rede local |
| <abbr title="Dynamic Host Configuration Protocol — protocolo de configuração dinâmica de hosts">DHCP</abbr> | configuração automática no exemplo <abbr title="Internet Protocol version 4 — protocolo da Internet versão 4">IPv4</abbr> |
| <abbr title="Domain Name System — sistema de nomes de domínio">DNS</abbr> | informações associadas a nomes; não distribui o endereço do cliente |
| <abbr title="Transmission Control Protocol — protocolo de controle de transmissão">TCP</abbr> | conexão lógica, fluxo confiável/ordenado, recuperação de perdas |
| <abbr title="User Datagram Protocol — protocolo de datagramas do usuário">UDP</abbr> | mensagens independentes, sem garantias próprias de entrega/ordem |

**Alcance:** <abbr title="Local Area Network — rede de área local">LAN</abbr> local; <abbr title="Metropolitan Area Network — rede de área metropolitana">MAN</abbr> metropolitano; <abbr title="Wide Area Network — rede de longa distância">WAN</abbr> amplo. Alcance não determina tecnologia nem acesso público. Estrela: conexões no centro; sem alternativa, falha central pode afetar vários participantes.

**Endereço:** <abbr title="Internet Protocol version 4 — protocolo da Internet versão 4">IPv4</abbr> = 32 <abbr title="Dígitos binários, com valor zero ou um">bits</abbr>, quatro <abbr title="Grupos de oito bits">octetos</abbr> de `0` a `255`; <abbr title="Internet Protocol version 6 — protocolo da Internet versão 6">IPv6</abbr> = 128 bits. `/24` = 24 bits de prefixo, não 24 computadores. Privadas: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`; privado ≠ criptografado.

**Próximo trecho:** quadro para o participante local; pacote para o destino. <abbr title="Roteador usado quando não há rota mais específica para o destino">Gateway</abbr> padrão é saída para destinos sem rota mais específica. Porta distingue serviço/processo; não é endereço de rede.

**Limites:** nome resolvido ≠ serviço disponível; transporte confiável ≠ infalível ou conteúdo protegido. Uma aplicação pode acrescentar confiabilidade sobre <abbr title="User Datagram Protocol — protocolo de datagramas do usuário">UDP</abbr>.

**Sem fio:** <abbr title="Service Set Identifier — identificador da rede sem fio">SSID</abbr> = identificador, não senha. <abbr title="Tecnologia de rede local sem fio">Wi-Fi</abbr> = acesso à rede local, sem garantia de Internet. Funções diferentes podem coexistir no mesmo aparelho; cliente e servidor são papéis.
