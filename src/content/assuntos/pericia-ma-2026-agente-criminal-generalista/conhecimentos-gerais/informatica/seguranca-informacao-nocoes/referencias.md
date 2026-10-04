## Princípios, identidade e risco

**National Institute of Standards and Technology — <abbr title="National Institute of Standards and Technology — instituto nacional de padrões e tecnologia dos Estados Unidos">NIST</abbr>.** Glossário institucional. Foram consultadas as definições nos verbetes abaixo e seus contextos indicados; isso não equivale à leitura integral das obras que cada verbete referencia. Consulta em 4 de outubro de 2026.

| Verbete | Suporte utilizado |
|---|---|
| [Information security](https://csrc.nist.gov/glossary/term/information_security) | Proteção contra acesso, divulgação, alteração, destruição e interrupção indevidos; confidencialidade, integridade e disponibilidade. |
| [Authentication](https://csrc.nist.gov/glossary/term/authentication) | Verificação da identidade no contexto de acesso a sistemas. |
| [Authorization](https://csrc.nist.gov/glossary/term/authorization) | Concessão de direitos e permissões de acesso. |
| [Multi-factor authentication](https://csrc.nist.gov/glossary/term/multi_factor_authentication) | Fatores de tipos distintos: conhecimento, posse e característica pessoal. |
| [Threat](https://csrc.nist.gov/glossary/term/threat) | Circunstância ou evento com potencial adverso. |
| [Vulnerability](https://csrc.nist.gov/glossary/term/vulnerability) | Fragilidade que uma fonte de ameaça pode explorar ou acionar. |
| [Risk](https://csrc.nist.gov/glossary/term/risk) | Possibilidade de evento adverso e consequências. |

**National Cybersecurity Center of Excellence.** *Data Integrity: Detecting and Responding to Ransomware and Other Destructive Events*, Special Publication 1800-26, volume A, edição final de dezembro de 2020. Consultado o resumo executivo, especialmente a seção “The Challenge”, sobre preservação dos dados, alteração indevida e danos por ações maliciosas ou erros. [Volume A](https://www.nccoe.nist.gov/publication/1800-26/VolA/index.html).

## Ameaças e medidas de proteção

**Centro de Estudos, Resposta e Tratamento de Incidentes de Segurança no Brasil — <abbr title="Centro de Estudos, Resposta e Tratamento de Incidentes de Segurança no Brasil">CERT.br</abbr>.** Fascículos da *Cartilha de Segurança para Internet*. As datas abaixo são as edições indicadas nos documentos; consulta em 4 de outubro de 2026.

- [Códigos Maliciosos](https://cartilha.cert.br/fasciculos/codigos-maliciosos/fasciculo-codigos-maliciosos.pdf), julho de 2023. Trechos sobre cuidados com programas e atualizações, coleta oculta, captura de teclas, ransomware e controle remoto de dispositivos, principalmente páginas 4–8, 14–20 e 24–27.
- [Autenticação](https://cartilha.cert.br/fasciculos/autenticacao/fasciculo-autenticacao.pdf), novembro de 2022. Trechos sobre senhas, verificações adicionais, códigos e solicitações de acesso, páginas 3–12.
- [Backup](https://cartilha.cert.br/fasciculos/backup/fasciculo-backup.pdf), maio de 2023. Trechos sobre cópias, armazenamento, proteção e verificação de recuperação, páginas 3–12.
- [Golpes: Evite Fraudes](https://cartilha.cert.br/fasciculos/golpes-evite-fraudes/fasciculo-golpes-evite-fraudes.pdf), março de 2026. Trechos sobre mensagens fraudulentas, contas comprometidas, links e confirmação por contato conhecido, páginas 4–7 e 12–13.

**National Institute of Standards and Technology.** Verbetes do glossário consultados para as distinções técnicas:

- [Virus](https://csrc.nist.gov/glossary/term/virus) e [Worm](https://csrc.nist.gov/glossary/term/worm): associação a hospedeiro e propagação autônoma. No segundo verbete, foram usadas as definições de código malicioso, não o significado homônimo de armazenamento.
- [Trojan horse](https://csrc.nist.gov/glossary/term/trojan_horse) e [Spyware](https://csrc.nist.gov/glossary/term/spyware): função maliciosa escondida sob aparência útil e coleta oculta de informação.
- [Phishing](https://csrc.nist.gov/glossary/term/phishing) e [Pharming](https://csrc.nist.gov/glossary/term/pharming): comunicação enganosa e redirecionamento por meios técnicos, inclusive na resolução de nomes.
- [Firewall](https://csrc.nist.gov/glossary/term/firewall): controle de tráfego entre redes ou no equipamento.
- [Encryption](https://csrc.nist.gov/glossary/term/encryption), [Cryptographic hash function](https://csrc.nist.gov/glossary/term/cryptographic_hash_function) e [Digital signature](https://csrc.nist.gov/glossary/term/digital_signature): cifragem, resumo dos dados e verificação de origem/integridade; assinatura digital não fornece confidencialidade por si só.

**Murugiah Souppaya e Karen Scarfone.** *Guide to Malware Incident Prevention and Handling for Desktops and Laptops*, Special Publication 800-83, revisão 1, julho de 2013. Consultadas as seções 3.3 e 3.4.1, páginas impressas 8–11, sobre correção de vulnerabilidades, menor privilégio, monitoramento, assinaturas atualizadas e quarentena. São mecanismos conceituais; configurações de produtos antigos não foram transportadas. [Documento oficial](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-83r1.pdf).

**Microsoft Learn.** Documentação do fabricante utilizada para os mecanismos e limites de detecção, sem transportar procedimentos de configuração:

- [Next-generation protection overview](https://learn.microsoft.com/en-us/defender-endpoint/next-generation-protection), atualização indicada em 15 de janeiro de 2026. Consultada a apresentação de análise de comportamento e heurísticas.
- [Corrigir falsos positivos/negativos no Microsoft Defender para Ponto de Extremidade](https://learn.microsoft.com/pt-br/defender-endpoint/defender-endpoint-false-positives-negatives). Consultadas a definição inicial dos dois erros e a necessidade de avaliar a segurança de um arquivo antes de restaurá-lo da quarentena.

**Alex Nelson, Sanjay Rekhi, Murugiah Souppaya e Karen Scarfone.** *Incident Response Recommendations and Considerations for Cybersecurity Risk Management: A <abbr title="Cybersecurity Framework — estrutura de referência para segurança cibernética">CSF</abbr> 2.0 Community Profile*, Special Publication 800-61, revisão 3, abril de 2025. Consultados os trechos sobre contenção, erradicação e recuperação, páginas impressas 32–34. Sustenta a diferença entre limitar efeitos, eliminar causas e restaurar o ambiente, conforme o plano e as circunstâncias. [Documento oficial](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf).

## Leitura do endereço em mensagens suspeitas

**Tim Berners-Lee, Roy Fielding e Larry Masinter.** *Uniform Resource Identifier (<abbr title="Uniform Resource Identifier — identificador uniforme de recursos">URI</abbr>): Generic Syntax*, <abbr title="Request for Comments — série de documentos técnicos da Internet">RFC</abbr> 3986, janeiro de 2005. Consultadas as seções 3.2 e 3.2.2, sobre autoridade e host. [Documento oficial](https://www.rfc-editor.org/rfc/rfc3986).

**Mozilla Foundation / iniciativa Public Suffix List.** *Learn more about the Public Suffix List*. Consultada a explicação inicial sobre limites de registro e separação entre domínios. O endereço com `exemplo.com` usado na aula é hipotético; não representa consulta a um serviço governamental. [Explicação institucional](https://publicsuffix.org/learn/).

## Questões anteriores utilizadas

**Fundação Getulio Vargas / Tribunal de Contas do Estado do Pará.** Concurso de 2024, Auditor de Controle Externo — Informática, Analista de Segurança, tipo 1, aplicação em 11 de agosto de 2024. As questões deste material são **adaptações temáticas em nova redação**, mantendo a identificação de questão anterior, sem atribuir a redação adaptada literalmente à banca.

- Questão 66: famílias de malware; alternativa **D**. Enunciado e opções conferidos na página 15 do caderno; chave conferida na página 15 do gabarito definitivo, quadro do cargo e tipo 1.
- Questão 67: engenharia social e phishing sem infecção obrigatória do computador; alternativa **E**. Enunciado e opções conferidos na página 16 do caderno; chave conferida no mesmo quadro do gabarito definitivo.
- [Prova oficial — tipo 1](https://conhecimento.fgv.br/sites/default/files/concursos/cns403-auditor-de-controle-externo-informatica-analista-de-segurancacns403-tipo-1.pdf).
- [Gabarito definitivo oficial](https://conhecimento.fgv.br/sites/default/files/concursos/tcepa-1108_gabaritos-para-publicacao_definitivo_20240913.pdf).

Consultas por trechos relevantes em 4 de outubro de 2026; não foi feita leitura integral dos cadernos ou dos manuais extensos.
