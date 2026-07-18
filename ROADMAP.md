# Roadmap editorial

Este arquivo é o backlog editorial autoritativo e define o escopo programático dos conteúdos, resumos e questões do projeto. O `final_plan.md` permanece como autoridade arquitetural. Os cabeçalhos de matéria deixam de ser apenas agrupadores: quando o conteúdo do assunto correspondente for publicado, cada agrupamento deverá ser representado por um descritor explícito `grupo.json`, e todo assunto publicado deverá estar abaixo de um ou mais desses grupos editoriais. Cada assunto forma uma unidade de estudo coesa e pode abranger um item principal, itens intrinsecamente relacionados ou uma parte delimitada de um item excessivamente amplo. Cada assunto deve ter seu próprio `conteudo.md`, `cheat-sheet.md` e conjunto de 50 ou mais questões. O trabalho deve ser realizado em um assunto por vez, salvo solicitação explícita para processar um lote. Os números e recortes do edital indicados em cada assunto são escopo obrigatório de aceitação, sem omissão ou duplicação.

Regra editorial de dimensionamento: cada assunto deve caber em uma sessão de estudo focada, responder a uma pergunta ou mapa de estudo claro e conter material coerente suficiente para sustentar as 50 questões obrigatórias, sem enchimento. Não há limite rígido de palavras. Divisões devem seguir fronteiras funcionais, normativas, cronológicas ou de processo, e não uma contagem arbitrária de artigos ou parágrafos. Itens só devem ser agrupados quando forem pequenos demais para estudo autônomo e intrinsecamente relacionados.

## Legenda

`[ ] Pendente`, `[>] Em progresso`, `[R] Em revisão`, `[x] Concluído`, `[!] Bloqueado`, `[-] Cancelado`.

O ciclo de produção tem duas fases. Primeiro, ao iniciar o trabalho, o item deve ser marcado como `[>]` e essa reserva compartilhada deve ser registrada em commit e push antes da pesquisa. Depois de concluídos `conteudo.md`, `cheat-sheet.md`, pelo menos 50 questões, os checks e a revisão independente, o item deve permanecer `[R]` durante a publicação do conteúdo, a CI e o deployment. Somente após deployment bem-sucedido o estado `[x]` deve ser registrado em um commit posterior de status do roadmap e enviado ao remoto. Se a publicação falhar, o item permanece `[R]` para correção ou passa a `[!]` com motivo objetivo.

A sequência global fixa de Assuntos 001 a 153 define o `order` inteiro do frontmatter de cada futuro `conteudo.md`; não pode haver lacunas ou duplicidades, nem renumeração silenciosa depois da publicação. A rastreabilidade ao edital é preservada nos itens, subitens e recortes descritos em cada assunto, mesmo quando a numeração reinicia dentro de cada matéria.

## TCE/MA 2026 — Cargo 1 Analista Estadual de Apoio ao Controle Externo

Catálogo canônico já existente: `src/content/concursos/tce-ma-2026-analista-administracao.json`.

- Edital: Edital nº 1 - TCE/MA, 6 de julho de 2026.
- Cargo: Cargo 1 Analista Estadual de Apoio ao Controle Externo.
- Área: Apoio Técnico-Administrativo.
- Especialidade: Administração.
- Requisito: diploma, devidamente registrado, de conclusão de curso de graduação em Administração, fornecido por instituição de ensino superior reconhecida pelo MEC, e registro profissional.
- Remuneração: R$ 12.950,00.
- Jornada: 30 horas/semana.
- Vagas imediatas: 4 — 2 para ampla concorrência, 1 para pessoa com deficiência e 1 para pessoa negra (preta ou parda).
- Os conteúdos adicionais de Direito Administrativo e Direito Constitucional do item 14.2.3.1 aplicam-se somente ao Cargo 12 e não integram o escopo do Cargo 1.

### Conhecimentos gerais

Referência: item 14.2.3, páginas físicas 29 a 32 do PDF (páginas 235 a 238 do Diário Oficial).

#### Língua Portuguesa

##### [x] Assunto 001 - Item 1: Leitura, compreensão e interpretação de textos de gêneros variados.

- Item 1. Compreensão e interpretação de textos de gêneros variados.

##### [x] Assunto 002 - Item 2: Tipos e gêneros textuais.

- Item 2. Reconhecimento de tipos e gêneros textuais.

##### [x] Assunto 003 - Item 3: Domínio da ortografia oficial.

##### [x] Assunto 004 - Item 4, subitem 4.1: Coesão por referenciação, substituição, repetição, conectores e sequenciação textual.

- 4.1. Emprego de elementos de referenciação, substituição e repetição, de conectores e de outros elementos de sequenciação textual.

##### [x] Assunto 005 - Item 4, subitem 4.2: Emprego de tempos e modos verbais.

- 4.2. Emprego de tempos e modos verbais.

##### [x] Assunto 006 - Item 5, subitem 5.1, recorte: Classes nominais de palavras.

- 5.1. Emprego de substantivo, artigo, adjetivo, numeral e pronome.
- Redação original do subitem 5.1: Emprego das classes de palavras.
- Exclusividade: o subitem 5.1 é dividido entre os Assuntos 006 a 008 em classes nominais, verbo e classes invariáveis, sem omissão ou duplicação.

##### [x] Concluído Assunto 007 - Item 5, subitem 5.1, recorte: Verbo como classe de palavras.

- 5.1. Emprego do verbo como classe de palavras, distinguido do emprego de tempos e modos verbais do Assunto 005.

##### [x] Concluído Assunto 008 - Item 5, subitem 5.1, recorte: Classes invariáveis de palavras.

- 5.1. Emprego de advérbio, preposição, conjunção e interjeição.

##### [x] Concluído Assunto 009 - Item 5, subitem 5.2: Coordenação entre orações e termos da oração.

- 5.2. Relações de coordenação entre orações e entre termos da oração.

##### [x] Concluído Assunto 010 - Item 5, subitem 5.3: Subordinação entre orações e termos da oração.

- 5.3. Relações de subordinação entre orações e entre termos da oração.

##### [x] Concluído Assunto 011 - Item 5, subitem 5.4: Pontuação.

- 5.4. Emprego dos sinais de pontuação.

##### [x] Concluído Assunto 012 - Item 5, subitem 5.5: Concordância verbal e nominal.

- 5.5. Concordância verbal e nominal.

##### [x] Concluído Assunto 013 - Item 5, subitem 5.6: Regência verbal e nominal.

- 5.6. Regência verbal e nominal.

##### [x] Concluído Assunto 014 - Item 5, subitem 5.7: Crase.

- 5.7. Emprego do sinal indicativo de crase.

##### [x] Concluído Assunto 015 - Item 5, subitem 5.8: Colocação pronominal.

- 5.8. Colocação dos pronomes átonos.

##### [x] Concluído Assunto 016 - Item 6, subitens 6.1 e 6.2: Significação, substituição e equivalência lexical no texto.

- 6.1. Significação das palavras.
- 6.2. Substituição de palavras ou de trechos de texto.

##### [x] Concluído Assunto 017 - Item 6, subitem 6.3: Reorganização da estrutura de orações e períodos.

- 6.3. Reorganização da estrutura de orações e de períodos do texto.

##### [x] Concluído Assunto 018 - Item 6, subitem 6.4: Reescrita de textos de diferentes gêneros e níveis de formalidade.

- 6.4. Reescrita de textos de diferentes gêneros e níveis de formalidade.

#### Competências Digitais e Informática Aplicada ao Setor Público

##### [x] Concluído Assunto 019 - Item 1, subitens 1.1 e 1.2: Cultura, cidadania, letramentos digitais, pensamento computacional, ética de dados e desinformação no serviço público.

- 1.1. Conceitos fundamentais: cultura digital, cidadania digital, letramento digital e midiático (BNCC e Política Nacional de Educação Digital - Lei nº 14.533/2023).
- 1.2. Pensamento computacional aplicado ao serviço público: análise crítica de informações, ética no uso de dados e combate à desinformação.

##### [x] Concluído Assunto 020 - Item 2.1: Microsoft Windows, arquivos, pastas e programas.

- 2.1. Sistemas operacionais: Microsoft Windows (conceitos, interface, gerenciamento de arquivos, pastas e programas).

##### [x] Concluído Assunto 021 - Item 2.2, recorte: editores de texto Microsoft Office.

- 2.2. Editores de texto, planilhas e apresentações: Microsoft Office (formatação de documentos, uso de fórmulas e funções, criação de gráficos e apresentações).
- O item 2.2 é desdobrado nos Assuntos 021 a 023 por ferramenta, sem repetição do seu conteúdo: este assunto trata de documentos e formatação de texto.

##### [x] Concluído Assunto 022 - Item 2.2, recorte: planilhas, fórmulas, funções e gráficos. - Commit hash: d19fa6b

##### [x] Concluído Assunto 023 - Item 2.2, recorte: apresentações. - Commit hash: 7290b22

##### [x] Concluído Assunto 024 - Item 2.3: Redes de computadores, protocolos e interoperabilidade. - Commit hash: b33a1cd

- 2.3. Redes de computadores: conceitos básicos (LAN, WAN, Internet), protocolos (TCP/IP, HTTP, SMTP, FTP) e noções de interoperabilidade de sistemas no setor público.

##### [x] Concluído Assunto 025 - Item 2.4: Comunicação, correio eletrônico, colaboração e trabalho remoto.

- 2.4. Ferramentas de comunicação e colaboração: correio eletrônico (webmail, cliente de e-mail), aplicativos de comunicação (Microsoft Teams, Google Meet) e noções de trabalho remoto.

##### [x] Concluído Assunto 026 - Item 3, subitens 3.1 e 3.3, recorte: Cópia de segurança e armazenamento em nuvem.

- 3.1. Segurança da informação: procedimentos de cópia de segurança (backup).
- 3.3. Armazenamento em nuvem (cloud storage): conceitos e aplicações (OneDrive, Google Drive).
- Exclusividade: o subitem 3.1 é dividido entre os Assuntos 026 e 027 em backup e malware/proteção/ameaças, sem omissão ou duplicação; o subitem 3.3 (armazenamento em nuvem) permanece agrupado com backup, como já documentado.

##### [x] Concluído Assunto 027 - Item 3, subitem 3.1, recorte: Malware, programas de proteção, phishing e pharming.

- 3.1. Segurança da informação: noções de vírus, worms e pragas virtuais; programas de proteção (antivírus, firewall, anti-spyware); ameaças digitais (phishing, pharming).

##### [x] Concluído Assunto 028 - Item 3, subitem 3.2: Lei Geral de Proteção de Dados Pessoais.

- 3.2. Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018): conceitos fundamentais, direitos dos titulares e aplicação no setor público.

##### [x] Concluído Assunto 029 - Item 3, subitem 3.5: Marco Civil da Internet.

- 3.5. Marco Civil da Internet (Lei nº 12.965/2014): princípios, direitos e deveres para o uso da Internet no Brasil.

##### [x] Concluído Assunto 030 - Itens 3.4 e 4.4.3: Assinatura digital, assinatura eletrônica e certificação em documentos oficiais.

- 3.4. Noções de assinatura digital em processos administrativos.
- 4.4.3. Noções de assinatura eletrônica e certificação digital em documentos oficiais.
- Os dois recortes são tratados juntos por serem o mesmo núcleo funcional, sem duplicar assinatura e certificação nos demais assuntos.

##### [x] Concluído Assunto 031 - Item 4, subitens 4.4.1 e 4.4.2: Processo Eletrônico Nacional e Sistema Eletrônico de Informações.

- 4.4. Sistemas e ferramentas do setor público.
  - 4.4.1. Processo Eletrônico Nacional (PEN).
  - 4.4.2. Sistema Eletrônico de Informações (SEI).

##### [x] Concluído Assunto 032 - Item 4, subitens 4.1, 4.2 e 4.3: Governo digital, Gov.br, dados abertos e transparência digital.

- 4.1. Governo digital e serviços ao cidadão: plataforma Gov.br (login único, carteira digital, serviços integrados).
- 4.2. Portal Nacional de Dados Abertos.
- 4.3. Noções de transparência e acesso à informação pública (Lei nº 12.527/2011 - Lei de Acesso à Informação).
- O subitem 4.3 é estudado aqui como aplicação introdutória no contexto digital; o regime jurídico completo da Lei nº 12.527/2011 pertence aos Assuntos 140 e 141.

##### [x] Concluído Assunto 033 - Item 4.5, recorte: inteligência artificial e automação de serviços públicos.

- 4.5. Tecnologias emergentes no setor público: noções de inteligência artificial aplicada a serviços públicos (IA generativa, chatbots, atendimento automatizado).
- O item 4.5 é desdobrado nos Assuntos 033 e 034 por núcleo tecnológico, sem repetir o conteúdo: este assunto trata de IA e automação.

##### [x] Concluído Assunto 034 - Item 4.5, recorte: big data, análise de dados, Internet das coisas e cidades inteligentes.

- 4.5. Noções de big data e análise de dados para políticas públicas; Internet das coisas (IoT) em cidades inteligentes.

##### [x] Concluído Assunto 035 - Item 4.6: Ética, responsabilidade digital, desinformação, inclusão e acessibilidade.

- 4.6. Ética e responsabilidade digital no serviço público: uso ético de tecnologias; combate a fake news e desinformação; inclusão digital e acessibilidade em serviços públicos.
- Acessibilidade aqui significa inclusão e acesso digital em serviços públicos. As normas gerais de acessibilidade e mobilidade reduzida ficam no Assunto 100, e a aplicação da acessibilidade na gestão pública fica no Assunto 114; não duplicar esses recortes.

#### Raciocínio Lógico

##### [x] Concluído Assunto 036 - Item 1: Estruturas lógicas.

- Item 1. Estruturas lógicas.

##### [x] Concluído Assunto 037 - Item 2, subitem 2.1: Lógica de argumentação, analogias, inferências, deduções e conclusões.

- Item 2. Lógica de argumentação.
- 2.1. Analogias, inferências, deduções e conclusões.

##### [x] Concluído Assunto 038 - Item 3, subitens 3.1 e 3.2: Proposições simples e compostas e tabelas-verdade.

- 3.1. Proposições simples e compostas.
- 3.2. Tabelas-verdade.

##### [x] Concluído Assunto 039 - Item 3, subitens 3.3, 3.4 e 3.5: Equivalências, leis de De Morgan e diagramas lógicos.

- 3.3. Equivalências.
- 3.4. Leis de De Morgan.
- 3.5. Diagramas lógicos.

##### [x] Concluído Assunto 040 - Item 4: Lógica de primeira ordem.

##### [x] Concluído Assunto 041 - Item 5: Princípios de contagem e probabilidade.

- Item 5. Princípios de contagem e probabilidade.

##### [x] Concluído Assunto 042 - Item 6: Operações com conjuntos.

##### [x] Concluído Assunto 043 - Item 7, recorte: problemas aritméticos.

- Item 7. Raciocínio lógico envolvendo problemas aritméticos, geométricos e matriciais.
- O item 7 é desdobrado nos Assuntos 043 a 045 por domínio matemático, sem repetição do conteúdo: este assunto trata de aritmética.

##### [x] Concluído Assunto 044 - Item 7, recorte: problemas geométricos.

##### [x] Concluído Assunto 045 - Item 7, recorte: problemas matriciais.

#### Controle Externo

##### [x] Concluído Assunto 046 - Itens 1 e 2: Conceito, tipos, formas e controle interno e externo.

- Item 1. Conceito, tipos e formas de controle.
- Item 2. Controle interno e externo.

##### [>] Em progresso Assunto 047 - Item 3: Controle parlamentar.

##### [ ] Assunto 048 - Item 4: Controle pelos tribunais de contas.

##### [ ] Assunto 049 - Item 5: Controle administrativo.

##### [ ] Assunto 050 - Item 6, recorte: sujeitos, atos e regime de responsabilização da Lei nº 8.429/1992.

- Item 6. Lei nº 8.429/1992 (Lei de Improbidade Administrativa): sujeitos, atos de improbidade e regime de responsabilização.

##### [ ] Assunto 051 - Item 6, recorte: sanções, procedimento, bens e prescrição da Lei nº 8.429/1992.

- Item 6. Lei nº 8.429/1992 (Lei de Improbidade Administrativa): sanções, procedimento, indisponibilidade e perda de bens, e prescrição.

##### [ ] Assunto 052 - Itens 7 e 8: Contencioso administrativo, jurisdição una e controle jurisdicional.

- 7.1. Contencioso administrativo e sistema da jurisdição una.
- Item 8. Controle jurisdicional da administração pública no direito brasileiro.

##### [ ] Assunto 053 - Item 9: Controle da atividade financeira do Estado: espécies e sistemas.

##### [ ] Assunto 054 - Itens 10 e 11: TCU, tribunais de contas estaduais e do Distrito Federal e TCE/MA na Constituição estadual.

- Item 10. Tribunal de Contas da União (TCU), tribunais de contas dos estados e do Distrito Federal.
- Item 11. Tribunal de Contas do Estado do Maranhão na Constituição do Estado do Maranhão.

#### Legislação Específica

##### [ ] Assunto 055 - Item 1, recorte: instituição e competência do TCE/MA.

- Item 1. Regimento Interno do Tribunal de Contas do Estado do Maranhão (TCE/MA).
- O Regimento Interno é desdobrado nos Assuntos 055 a 063 por função normativa, sem inventar faixas de artigos nem repetir dispositivos.

##### [ ] Assunto 056 - Item 1, recorte: órgãos, autoridades e organização interna.

##### [ ] Assunto 057 - Item 1, recorte: sessões, distribuição e deliberação.

##### [ ] Assunto 058 - Item 1, recorte: processos de controle externo.

##### [ ] Assunto 059 - Item 1, recorte: denúncias, representações e consultas.

##### [ ] Assunto 060 - Item 1, recorte: garantias processuais, provas e prazos.

##### [ ] Assunto 061 - Item 1, recorte: decisões, sanções e execução.

##### [ ] Assunto 062 - Item 1, recorte: recursos e revisão.

##### [ ] Assunto 063 - Item 1, recorte: atos normativos, ética e regras finais.

##### [ ] Assunto 064 - Item 2, recorte: jurisdição e competência da Lei nº 8.258/2005.

- Item 2. Lei nº 8.258/2005 (Lei Orgânica): jurisdição e competência.

##### [ ] Assunto 065 - Item 2, recorte: organização, membros, Ministério Público de Contas, governança e regras finais da Lei nº 8.258/2005.

- Item 2. Lei nº 8.258/2005 (Lei Orgânica): organização, membros e Ministério Público de Contas; governança e regras finais.
- A Lei nº 8.258/2005 é desdobrada nos Assuntos 064 a 068 por função, sem inventar faixas de artigos nem repetir dispositivos.

##### [ ] Assunto 066 - Item 2, recorte: contas e instrumentos de controle.

##### [ ] Assunto 067 - Item 2, recorte: processos.

##### [ ] Assunto 068 - Item 2, recorte: decisões, débitos, sanções, execução, recursos e revisão.

##### [ ] Assunto 069 - Item 3, recorte: modelo organizacional, direção e unidades técnicas de controle externo da Lei nº 9.936/2013.

- Item 3. Lei nº 9.936/2013 (Organização administrativa): modelo organizacional e direção; unidades técnicas de controle externo.
- A Lei nº 9.936/2013 é desdobrada nos Assuntos 069 e 070 por unidade funcional, sem inventar faixas de artigos nem repetir dispositivos.

##### [ ] Assunto 070 - Item 3, recorte: unidades administrativas e de apoio, cargos, funções, anexos e reestruturação vigente.

##### [ ] Assunto 071 - Item 4: IN nº 50/2017 e suas alterações — fluxo completo do procedimento.

- Item 4. IN nº 50/2017 e suas alterações: medidas preliminares; instauração, investigação e quantificação do débito; conclusão, encaminhamento, decadência e anexos.
- A IN nº 50/2017 é tratada em um único fluxo de procedimento, sem inventar faixas de artigos nem repetir dispositivos.

##### [ ] Assunto 072 - Item 5: IN nº 82/2025.

- Item 5. IN nº 82/2025.
- Norma curta, mantida em um único assunto.

#### História e Geografia do Estado do Maranhão

I - História do Estado do Maranhão

##### [ ] Assunto 073 - Itens 1, 2 e 3: França Equinocial, fundação de São Luís e Batalha de Guaxenduba.

- Item 1. História do Maranhão: França equinocial: expedição de Daniel de La Touche.
- Item 2. Fundação de São Luís.
- Item 3. Batalha de Guaxenduba.

##### [ ] Assunto 074 - Itens 4 e 5: Invasão e expulsão dos holandeses.

- Item 4. A invasão holandesa.
- Item 5. A expulsão dos holandeses.

##### [ ] Assunto 075 - Item 6, subitens 6.1, 6.2 e 6.3: Revolta de Bequimão e Companhias de Comércio.

- 6.1. A Revolta de Bequimão.
  - 6.1.1. Causas.
- 6.2. Companhias de Comércio do Maranhão e Grão-Pará.
- 6.3. Os objetivos da Revolta.

##### [ ] Assunto 076 - Itens 7, 8 e 9: Adesão do Maranhão ao Império, Independência do Brasil e Batalha do Jenipapo.

- Item 7. Período do Império: adesão do Maranhão.
- Item 8. A Independência do Brasil.
- Item 9. Causas da não adesão: a Batalha do Jenipapo.

##### [ ] Assunto 077 - Item 10: Balaiada: caracterização e causas.

- Item 10. A Balaiada: caracterização e causas do movimento.

##### [ ] Assunto 078 - Itens 11 e 12: Adesão do Maranhão à República e Revolução de 1930.

- Item 11. Período Republicano: adesão do Maranhão à República.
- Item 12. A Revolução de 1930 no Maranhão.

##### [ ] Assunto 079 - Item 13: Vitorinismo e Greve de 1951.

- Item 13. O Vitorinismo e a Greve de 1951.
- O item 13 é tratado conjuntamente, por recorte histórico, sem repetição.

##### [ ] Assunto 080 - Item 14, recorte político: fatos políticos do Maranhão na segunda metade do século XX.

- Item 14. Fatos políticos do Maranhão na segunda metade do século XX.

##### [ ] Assunto 081 - Item 14, recorte econômico: fatos econômicos do Maranhão na segunda metade do século XX.

- Item 14. Fatos econômicos do Maranhão na segunda metade do século XX.

##### [ ] Assunto 082 - Item 14, recorte social: fatos sociais do Maranhão na segunda metade do século XX.

- Item 14. Fatos sociais do Maranhão na segunda metade do século XX.

II - Geografia do Estado do Maranhão

##### [ ] Assunto 083 - Item 1: Localização, superfície, limites, fronteiras e pontos extremos.

- Item 1. Localização do Estado do Maranhão: superfície; limites; linhas de fronteira; pontos extremos.

##### [ ] Assunto 084 - Itens 3 e 4: Geomorfologia, geologia, recursos minerais e relevo maranhense.

- Item 3. Geomorfologia. Geologia e recursos minerais no Maranhão.
- Item 4. Classificação do relevo maranhense: planaltos, planícies e baixadas.

##### [ ] Assunto 085 - Itens 2 e 3: Áreas de Proteção Ambiental e parques nacionais.

- Item 2. Áreas de Proteção Ambiental (APA).
- Item 3. Parques nacionais.

##### [ ] Assunto 086 - Itens 3 e 7: Climas e formações vegetais do Maranhão.

- Item 3. Climas do Maranhão: pluviosidade e temperatura.
- Item 7. Principais formações vegetais: floresta, cerrado e cocais.

##### [ ] Assunto 087 - Itens 5 e 6: Rios limítrofes, suas bacias e bacias genuinamente maranhenses.

- Item 5. Características dos rios maranhenses: bacias dos rios limítrofes: bacia do Parnaíba, do Gurupi e do Tocantins-Araguaia.
- Item 6. Bacias dos rios genuinamente maranhenses.

##### [ ] Assunto 088 - Item 8: População, povoamento, densidade, urbanização e movimentos populacionais.

- Item 8. Geografia da população: população absoluta, povoamento, urbanização, densidade e movimentos populacionais.

##### [ ] Assunto 089 - Item 9: Agricultura e pecuária maranhenses.

- Item 9. A agricultura maranhense: caracterização e principais produtos agrícolas; caracterização da pecuária.

##### [ ] Assunto 090 - Item 10: Extrativismo vegetal, animal e mineral.

- Item 10. Extrativismo: vegetal, animal e mineral.

##### [ ] Assunto 091 - Item 11: Indústrias de base e de transformação.

- Item 11. Parque industrial: indústrias de base e indústrias de transformação.

##### [ ] Assunto 092 - Item 12: Comércio, telecomunicações e transportes.

- Item 12. Setor terciário: comércio, telecomunicações, transportes.

##### [ ] Assunto 093 - Itens 13 e 14: Malha viária, portos e aeroportos.

- Item 13. Malha viária.
- Item 14. Portos e aeroportos.

##### [ ] Assunto 094 - Item 15: Cultura maranhense.

- Item 15. A cultura maranhense.

#### Noções de Direitos Humanos

##### [ ] Assunto 095 - Itens 1 e 2: Teoria geral dos direitos fundamentais e relação entre direitos humanos e fundamentais.

- Item 1. Teoria geral dos direitos fundamentais.
- Item 2. Direitos humanos e direitos fundamentais.

##### [ ] Assunto 096 - Item 3: Declaração Universal dos Direitos Humanos.

##### [ ] Assunto 097 - Item 4: Agenda 2030 da ONU.

##### [ ] Assunto 098 - Item 5, recorte: fundamentos, direitos e garantias do Estatuto da Pessoa com Deficiência.

- Item 5. Estatuto da Pessoa com Deficiência (Lei nº 13.146/2015 e suas alterações).
- O item 5 é desdobrado nos Assuntos 098 e 099 por função normativa, sem inventar faixas de artigos nem repetir dispositivos: este assunto trata de fundamentos, direitos e garantias.

##### [ ] Assunto 099 - Item 5, recorte: inclusão, acessibilidade e responsabilização no Estatuto da Pessoa com Deficiência.

##### [ ] Assunto 100 - Itens 6 e 7: Normas gerais de acessibilidade e prioridade de atendimento.

- Item 6. Normas gerais e critérios básicos para promoção da acessibilidade às pessoas com deficiência ou com mobilidade reduzida (Lei nº 10.098/2000).
- Item 7. Prioridade de atendimento às pessoas com deficiência (Lei nº 10.048/2000).

##### [ ] Assunto 101 - Item 8, recorte: fundamentos, direitos e igualdade material.

- Item 8. Lei nº 12.288/2010 (Estatuto da Igualdade Racial).
- O item 8 é desdobrado nos Assuntos 101 e 102 por função normativa, sem inventar faixas de artigos nem repetir dispositivos: este assunto trata de fundamentos, direitos e igualdade material.

##### [ ] Assunto 102 - Item 8, recorte: políticas públicas e mecanismos de promoção da igualdade racial.

### Conhecimentos específicos

Referência: item 14.2.4, Cargo 1, páginas físicas 32 e 33 do PDF (páginas 238 e 239 do Diário Oficial).

#### Administração Pública

##### [x] Concluído Assunto 103 - Item 1: Estruturas e desenho das organizações formais modernas.

- Características básicas, tipos de estrutura organizacional, natureza, finalidades e critérios de departamentalização.

##### [x] Concluído Assunto 104 - Item 2, recorte: planejamento e direção no processo organizacional.

- Item 2. Processo organizacional: planejamento, direção, comunicação, controle e avaliação.
- Este assunto trata de planejamento e direção.

##### [x] Concluído Assunto 105 - Item 2, recorte: comunicação no processo organizacional.

- Este assunto trata de comunicação.

##### [x] Concluído Assunto 106 - Item 2, recorte: controle e avaliação no processo organizacional.

- Este assunto trata de controle e avaliação.

##### [x] Concluído Assunto 107 - Item 3: Gestão de processos.

##### [x] Concluído Assunto 108 - Itens 4 e 7: Gestão da qualidade e excelência nos serviços públicos.

- Item 4. Gestão da qualidade.
- Item 7. Excelência nos serviços públicos.

##### [x] Concluído Assunto 109 - Item 5: Gestão de projetos.

##### [x] Concluído Assunto 110 - Item 6: Planejamento estratégico.

##### [x] Concluído Assunto 111 - Item 8: Empreendedorismo governamental e novas lideranças no setor público.

##### [x] Concluído Assunto 112 - Itens 9, 10 e 11: Gestão de resultados, gestão pública e privada e paradigma do cliente.

- Item 9. Gestão de resultados na produção de serviços públicos.
- Item 10. Convergências e diferenças entre a gestão pública e a gestão privada.
- Item 11. O paradigma do cliente na gestão pública.

##### [x] Concluído Assunto 113 - Item 12, recorte: Sustentabilidade pública.

- Item 12. Sustentabilidade pública e acessibilidade.
- O item 12 é desdobrado nos Assuntos 113 e 114 por eixo de gestão, sem repetição: este assunto trata de sustentabilidade pública.

##### [x] Concluído Assunto 114 - Item 12, recorte: Acessibilidade na gestão pública.

#### Administração de Recursos Materiais e Patrimoniais

##### [x] Concluído Assunto 115 - Itens 1, subitem 1.1, 2 e 6: Conceitos de material e patrimônio, patrimônio público e ciclo básico.

- Item 1. Introdução à Administração de Material e Patrimônio.
  - 1.1. Conceituação de Material e Patrimônio.
- Item 2. O Patrimônio das empresas e órgãos públicos.
- Item 6. Atividades básicas da Administração de Material e Patrimônio.

##### [x] Concluído Assunto 116 - Itens 3, 4 e 15: Patrimônio imobiliário, SPIU, gestão, manutenção e conservação.

- Item 3. O Patrimônio Imobiliário.
- Item 4. Cadastro e registro de bens imóveis (SPIU).
- Item 15. Gestão, manutenção e conservação dos bens patrimoniais imóveis públicos.

##### [x] Concluído Assunto 117 - Itens 5 e 7: Patrimônio mobiliário e responsabilidade civil e administrativa.

- Item 5. O Patrimônio Mobiliário.
- Item 7. Administração Patrimonial: noções sobre responsabilidade civil e administrativa.

##### [x] Concluído Assunto 118 - Itens 8, 9 e 10: Controle, movimentação e sistema patrimonial.

- Item 8. O controle dos materiais e do patrimônio.
- Item 9. A movimentação do patrimônio.
- Item 10. Sistema Patrimonial.

##### [x] Concluído Assunto 119 - Item 11: Previsão e controle de estoque.

- Planejamento, processos e políticas de administração de estoques; determinação de níveis de estoque; tempo de ressuprimento e estoques de segurança; avaliação de estoques - métodos.

##### [x] Concluído Assunto 120 - Item 12: Almoxarifado e armazenamento.

- Funções, princípios e objetivos; controle, registro, conservação e recuperação de material; técnicas de armazenamento; utilização de espaço; segurança.

##### [x] Concluído Assunto 121 - Item 13, recorte: Compras, classificação, padronização e codificação.

- Item 13 (compras e classificação): Aquisição, classificação, padronização e codificação de materiais e patrimônio.

##### [x] Concluído Assunto 122 - Item 13, recorte: Arquivamento, recebimento, proteção, conservação, distribuição e inventário.

- Item 13, recorte: arquivamento, recebimento, proteção, conservação, distribuição e inventário.

##### [x] Concluído Assunto 123 - Item 14: Análise do valor e alienação.

- Item 14. Análise do valor e Alienação.

#### Gestão de Contratos

##### [x] Concluído Assunto 124 - Item 1.1, fase 1: Fundamentos, agentes e processo da Lei nº 14.133/2021.

- Item 1.1. Lei nº 14.133/2021 aplicada à contratação de bens e serviços: fundamentos, agentes e processo.
- Os Assuntos 124 a 130 tratam do regime normativo da Lei nº 14.133/2021 aplicado a bens e serviços; não duplicar o item prático 2.

##### [x] Concluído Assunto 125 - Item 1.1, fase 2: Planejamento e fase preparatória da contratação.

##### [x] Concluído Assunto 126 - Item 1.1, fase 3: Modalidades, julgamento, seleção do fornecedor e contratação direta.

##### [x] Concluído Assunto 127 - Item 1.1, fase 4: Formalização, garantias, alocação de riscos e duração contratual.

##### [x] Concluído Assunto 128 - Item 1.1, fase 5: Execução, fiscalização, alterações e equilíbrio econômico-financeiro.

##### [x] Concluído Assunto 129 - Item 1.1, fase 6: Extinção, recebimento e pagamento.

##### [x] Concluído Assunto 130 - Item 1.1, fase 7: Infrações, sanções, controle, PNCP e regras finais.

##### [x] Concluído Assunto 131 - Item 1.2, fase 1: Planejamento da contratação segundo a IN nº 5/2017.

- Item 1.2. Instrução Normativa nº 5/2017 da Secretaria de Gestão do Ministério do Planejamento, Desenvolvimento e Gestão.
- O item 1.2 é desdobrado nos Assuntos 131 a 135 por fase operacional, sem inventar faixas de artigos nem repetir dispositivos.

##### [x] Concluído Assunto 132 - Item 1.2, fase 2: Interface com a seleção do fornecedor.

##### [x] Concluído Assunto 133 - Item 1.2, fase 3: Gestão e fiscalização contratual.

##### [x] Concluído Assunto 134 - Item 1.2, fase 4: Medição, pagamento, obrigações trabalhistas e manutenção do equilíbrio econômico.

##### [x] Concluído Assunto 135 - Item 1.2, fase 5: Encerramento e regras operacionais finais.

##### [x] Concluído Assunto 136 - Item 2, subitens 2.1 a 2.4: Gestão aplicada da execução contratual.

- 2.1. Cláusulas e indicadores de nível de serviço.
- 2.2. Papel do fiscalizador do contrato.
- 2.3. Papel do preposto da contratada.
- 2.4. Acompanhamento da execução contratual.

##### [x] Concluído Assunto 137 - Item 2, subitens 2.5 e 2.6: Irregularidades, penalidades e sanções administrativas.

- 2.5. Registro e notificação de irregularidades.
- 2.6. Definição e aplicação de penalidades e sanções administrativas.

#### Governo Eletrônico, Transparência e Controle Social

##### [x] Concluído Assunto 138 - Item 1: Fundamentos, modelos, serviços, canais, integração e governança de governo eletrônico.

- Item 1. Governo eletrônico na administração pública: fundamentos e modelos; serviços, canais, integração e governança.
- Não confundir governo eletrônico com o governo digital do item 4.1 de Competências Digitais.

##### [x] Concluído Assunto 139 - Item 1, recorte: Transparência, controle social, cidadania e accountability.

- Item 1, recorte: transparência da administração pública; controle social e cidadania; accountability.

##### [x] Concluído Assunto 140 - Item 2, recorte: Princípios, abrangência, conceitos, pedido de acesso, tramitação e prazos da Lei de Acesso à Informação.

- Item 2. Lei nº 12.527/2011 (Lei de Acesso à Informação): princípios, abrangência e conceitos; pedido de acesso, tramitação e prazos.
- A Lei de Acesso à Informação é desdobrada nos Assuntos 140 e 141 por função normativa, sem inventar faixas de artigos nem repetir dispositivos.

##### [x] Concluído Assunto 141 - Item 2, recorte: Restrições, classificação, proteção, transparência ativa, recursos e responsabilidades.

- Item 2. Lei nº 12.527/2011 (Lei de Acesso à Informação): restrições, classificação e proteção das informações; transparência ativa, recursos e responsabilidades.

#### Gestão de Pessoas

##### [x] Concluído Assunto 142 - Itens 1 e 2: Conceitos, importância, sistemas de organização, teorias e escolas da administração na gestão de pessoas.

- Item 1. Conceitos, importância, relação com os outros sistemas de organização.
- Item 2. Fundamentos, teorias e escolas da administração e o seu impacto na gestão de pessoas.

##### [x] Concluído Assunto 143 - Item 3, subitens 3.1 e 3.2: Função do órgão de recursos humanos, atribuições, objetivos, políticas e sistemas de informações gerenciais.

- Item 3. Função do órgão de recursos humanos.
- 3.1. Atribuições básicas e objetivos.
- 3.2. Políticas e sistemas de informações gerenciais.

##### [x] Concluído Assunto 144 - Item 4, subitens 4.1 e 4.3: Relações indivíduo/organização e qualidade de vida.

- 4.1. Relações indivíduo/organização.
- 4.3. Qualidade de vida.

##### [x] Concluído Assunto 145 - Item 4, subitem 4.2: Liderança, motivação e desempenho.

- 4.2. Liderança, motivação e desempenho.

##### [x] Concluído Assunto 146 - Itens 5 e 6: Competência interpessoal e gerenciamento de conflitos.

- Item 5. Competência interpessoal.
- Item 6. Gerenciamento de conflitos.

##### [x] Concluído Assunto 147 - Item 7: Gestão da mudança.

- Item 7. Gestão da mudança.

##### [x] Concluído Assunto 148 - Item 8, subitens 8.1 e 8.2: Recrutamento, seleção e processo decisório.

- 8.1. Tipos de recrutamento: vantagens e desvantagens.
- 8.2. Técnicas de seleção: vantagens, desvantagens e processo decisório.

##### [x] Concluído Assunto 149 - Item 9: Análise e descrição de cargos.

- Item 9. Análise e descrição de cargos: objetivos, métodos, vantagens e desvantagens.

##### [x] Concluído Assunto 150 - Item 10, subitens 10.1 e 10.2: Objetivos e métodos de avaliação de desempenho.

- 10.1. Objetivos.
- 10.2. Métodos de avaliação de desempenho: características, vantagens e desvantagens.

##### [x] Concluído Assunto 151 - Item 11, subitens 11.1 e 11.2: Desenvolvimento e capacitação.

- 11.1. Levantamento de necessidades.
- 11.2. Programação, execução e avaliação.

##### [x] Concluído Assunto 152 - Item 12: Administração de cargos, carreiras e salários.

##### [x] Concluído Assunto 153 - Itens 13 e 14: Gestão por competências e tendências em gestão de pessoas no setor público.

- Item 13. Gestão por competências.
- Item 14. Tendências em gestão de pessoas no setor público.

## Estrutura da prova

- Objetiva P1: 40 questões de conhecimentos gerais, 1,00 ponto cada.
- Objetiva P2: 60 questões de conhecimentos específicos, 2,00 pontos cada.
- Total da prova objetiva: 160,00 pontos.
- Prova discursiva de Analista: 40,00 pontos no total.
- Uma peça técnica de até 60 linhas, valendo 20,00 pontos.
- Duas questões de situação-problema da especialidade, de até 30 linhas cada, valendo 10,00 pontos cada.
- Habilidades avaliadas: compreensão, aplicação, análise, síntese, avaliação e também conhecimentos memorizados.
- Cada questão poderá abranger mais de um objeto de avaliação.

## Regras de atualização legislativa e jurisprudencial

- Alterações legislativas vigentes na data de publicação do edital poderão ser cobradas, ainda que não estejam expressamente no item 14.
- Legislação ainda não vigente poderá ser cobrada quando estiver explicitamente listada nos objetos de avaliação.
- Jurisprudência dos tribunais superiores poderá ser considerada se publicada até 30 dias antes da data da prova.

## Controle de fontes e páginas

- Edital utilizado: Edital nº 1 - TCE/MA, 6 de julho de 2026.
- Identificação e requisitos do cargo: PDF físico, página 1 / Diário Oficial, página 207.
- Vagas: PDF físico, página 5 / Diário Oficial, página 211.
- Estrutura da prova: PDF físico, página 19 / Diário Oficial, página 225.
- Pontuação objetiva e prova discursiva: PDF físico, páginas 21-22 / Diário Oficial, páginas 227-228.
- Programa de conhecimentos gerais: PDF físico, páginas 29-32 / Diário Oficial, páginas 235-238.
- Programa de conhecimentos específicos: PDF físico, páginas 32-33 / Diário Oficial, páginas 238-239.

Correções e retificações posteriores deverão ser incorporadas antes de este roadmap ser tratado como escopo definitivo de estudo. Todo item `[x]` afetado deverá ser reaberto, com fonte, data e impacto registrados; as revisões aplicáveis das questões deverão ser atualizadas conforme `final_plan.md`; e todos os gates deverão ser repetidos antes de o item retornar a `[x]`.
