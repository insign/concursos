# Roadmap editorial

Este arquivo é o backlog editorial autoritativo e define o escopo programático dos conteúdos, resumos e questões do projeto. O `final_plan.md` permanece como autoridade arquitetural. Os cabeçalhos de matéria são apenas agrupadores; cada assunto forma uma unidade de estudo coesa e pode abranger um item principal, itens intrinsecamente relacionados ou uma parte delimitada de um item excessivamente amplo. Cada assunto deve ter seu próprio `conteudo.md`, `cheat-sheet.md` e conjunto de 50 ou mais questões. O trabalho deve ser realizado em um assunto por vez, salvo solicitação explícita para processar um lote. Os números e recortes do edital indicados em cada assunto são escopo obrigatório de aceitação, sem omissão ou duplicação.

## Legenda

`[ ] Pendente`, `[>] Em progresso`, `[R] Em revisão`, `[x] Concluído`, `[!] Bloqueado`, `[-] Cancelado`.

O ciclo de produção tem duas fases. Primeiro, ao iniciar o trabalho, o item deve ser marcado como `[>]` e essa reserva compartilhada deve ser registrada em commit e push antes da pesquisa. Depois de concluídos `conteudo.md`, `cheat-sheet.md`, pelo menos 50 questões, os checks e a revisão independente, o item deve permanecer `[R]` durante a publicação do conteúdo, a CI e o deployment. Somente após deployment bem-sucedido o estado `[x]` deve ser registrado em um commit posterior de status do roadmap e enviado ao remoto. Se a publicação falhar, o item permanece `[R]` para correção ou passa a `[!]` com motivo objetivo.

A sequência global fixa de Assuntos 001 a 084 define o `order` inteiro do frontmatter de cada futuro `conteudo.md`; não pode haver lacunas ou duplicidades, nem renumeração silenciosa depois da publicação. A rastreabilidade ao edital é preservada nos itens, subitens e recortes descritos em cada assunto, mesmo quando a numeração reinicia dentro de cada matéria.

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

##### [>] Assunto 001 - Itens 1 e 2: Leitura, compreensão, interpretação, tipos e gêneros textuais.

- Item 1. Compreensão e interpretação de textos de gêneros variados.
- Item 2. Reconhecimento de tipos e gêneros textuais.

##### [ ] Assunto 002 - Item 3: Domínio da ortografia oficial.

##### [ ] Assunto 003 - Item 4: Domínio dos mecanismos de coesão textual.

- 4.1. Emprego de elementos de referenciação, substituição e repetição, de conectores e de outros elementos de sequenciação textual.
- 4.2. Emprego de tempos e modos verbais.

##### [ ] Assunto 004 - Item 5, subitens 5.1 a 5.3: Classes de palavras e relações entre termos e orações.

- 5.1. Emprego das classes de palavras.
- 5.2. Relações de coordenação entre orações e entre termos da oração.
- 5.3. Relações de subordinação entre orações e entre termos da oração.

##### [ ] Assunto 005 - Item 5, subitens 5.4 a 5.8: Pontuação, concordância, regência, crase e colocação pronominal.

- 5.4. Emprego dos sinais de pontuação.
- 5.5. Concordância verbal e nominal.
- 5.6. Regência verbal e nominal.
- 5.7. Emprego do sinal indicativo de crase.
- 5.8. Colocação dos pronomes átonos.

##### [ ] Assunto 006 - Item 6: Reescrita de frases e parágrafos do texto.

- 6.1. Significação das palavras.
- 6.2. Substituição de palavras ou de trechos de texto.
- 6.3. Reorganização da estrutura de orações e de períodos do texto.
- 6.4. Reescrita de textos de diferentes gêneros e níveis de formalidade.

#### Competências Digitais e Informática Aplicada ao Setor Público

##### [ ] Assunto 007 - Item 1: Competências digitais no setor público.

- 1.1. Conceitos fundamentais: cultura digital, cidadania digital, letramento digital e midiático (BNCC e Política Nacional de Educação Digital - Lei nº 14.533/2023).
- 1.2. Pensamento computacional aplicado ao serviço público: análise crítica de informações, ética no uso de dados e combate à desinformação.

##### [ ] Assunto 008 - Item 2.1: Microsoft Windows, arquivos, pastas e programas.

- 2.1. Sistemas operacionais: Microsoft Windows (conceitos, interface, gerenciamento de arquivos, pastas e programas).

##### [ ] Assunto 009 - Item 2.2: Microsoft Office, documentos, planilhas e apresentações.

- 2.2. Editores de texto, planilhas e apresentações: Microsoft Office (formatação de documentos, uso de fórmulas e funções, criação de gráficos e apresentações).

##### [ ] Assunto 010 - Item 2, subitens 2.3 e 2.4: Redes, Internet, comunicação e colaboração remota.

- 2.3. Redes de computadores: conceitos básicos (LAN, WAN, Internet), protocolos (TCP/IP, HTTP, SMTP, FTP) e noções de interoperabilidade de sistemas no setor público.
- 2.4. Ferramentas de comunicação e colaboração: correio eletrônico (webmail, cliente de e-mail), aplicativos de comunicação (Microsoft Teams, Google Meet) e noções de trabalho remoto.

##### [ ] Assunto 011 - Item 3, subitens 3.1 e 3.3: Segurança da informação, backup, ameaças e armazenamento em nuvem.

- 3.1. Segurança da informação: procedimentos de cópia de segurança (backup), noções de vírus, worms e pragas virtuais; programas de proteção (antivírus, firewall, anti-spyware); ameaças digitais (phishing, pharming).
- 3.3. Armazenamento em nuvem (cloud storage): conceitos e aplicações (OneDrive, Google Drive).

##### [ ] Assunto 012 - Item 3, subitens 3.2 e 3.5: Proteção de dados e direitos no ambiente digital.

- 3.2. Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018): conceitos fundamentais, direitos dos titulares e aplicação no setor público.
- 3.5. Marco Civil da Internet (Lei nº 12.965/2014): princípios, direitos e deveres para o uso da Internet no Brasil.

##### [ ] Assunto 013 - Itens 3.4 e 4.4: Assinaturas digitais e processo eletrônico administrativo.

- 3.4. Noções de assinatura digital em processos administrativos.
- 4.4. Sistemas e ferramentas do setor público.
  - 4.4.1. Processo Eletrônico Nacional (PEN).
  - 4.4.2. Sistema Eletrônico de Informações (SEI).
  - 4.4.3. Noções de assinatura eletrônica e certificação digital em documentos oficiais.

##### [ ] Assunto 014 - Item 4, subitens 4.1 a 4.3: Governo digital, dados abertos, transparência e acesso à informação.

- 4.1. Governo digital e serviços ao cidadão: plataforma Gov.br (login único, carteira digital, serviços integrados).
- 4.2. Portal Nacional de Dados Abertos.
- 4.3. Noções de transparência e acesso à informação pública (Lei nº 12.527/2011 - Lei de Acesso à Informação).

O subitem 4.3 deve ser estudado aqui como aplicação introdutória da transparência e do acesso à informação no contexto digital. O regime jurídico completo da Lei nº 12.527/2011 pertence ao Assunto 076.

##### [ ] Assunto 015 - Item 4.5: Tecnologias emergentes no setor público.

- 4.5. Tecnologias emergentes no setor público: noções de inteligência artificial aplicada a serviços públicos (IA generativa, chatbots, atendimento automatizado); noções de big data e análise de dados para políticas públicas; Internet das coisas (IoT) em cidades inteligentes.

##### [ ] Assunto 016 - Item 4.6: Ética, responsabilidade, inclusão e acessibilidade digital no setor público.

- 4.6. Ética e responsabilidade digital no serviço público: uso ético de tecnologias; combate a fake news e desinformação; inclusão digital e acessibilidade em serviços públicos.

#### Raciocínio Lógico

##### [ ] Assunto 017 - Itens 1 e 2: Estruturas lógicas e lógica de argumentação.

- Item 1. Estruturas lógicas.
- Item 2. Lógica de argumentação.
- 2.1. Analogias, inferências, deduções e conclusões.

##### [ ] Assunto 018 - Item 3: Lógica sentencial (ou proposicional).

- 3.1. Proposições simples e compostas.
- 3.2. Tabelas-verdade.
- 3.3. Equivalências.
- 3.4. Leis de De Morgan.
- 3.5. Diagramas lógicos.

##### [ ] Assunto 019 - Item 4: Lógica de primeira ordem.

##### [ ] Assunto 020 - Item 5: Princípios de contagem e probabilidade.

##### [ ] Assunto 021 - Item 6: Operações com conjuntos.

##### [ ] Assunto 022 - Item 7: Raciocínio lógico envolvendo problemas aritméticos, geométricos e matriciais.

#### Controle Externo

##### [ ] Assunto 023 - Itens 1 e 2: Fundamentos, tipos e formas de controle interno e externo.

- Item 1. Conceito, tipos e formas de controle.
- Item 2. Controle interno e externo.

##### [ ] Assunto 024 - Itens 3 e 4: Controle parlamentar e controle pelos tribunais de contas.

- Item 3. Controle parlamentar.
- Item 4. Controle pelos tribunais de contas.

##### [ ] Assunto 025 - Item 5: Controle administrativo.

##### [ ] Assunto 026 - Item 6: Lei nº 8.429/1992 (Lei de Improbidade Administrativa).

##### [ ] Assunto 027 - Itens 7 e 8: Sistemas de controle jurisdicional e controle jurisdicional no direito brasileiro.

- 7.1. Contencioso administrativo e sistema da jurisdição una.
- Item 8. Controle jurisdicional da administração pública no direito brasileiro.

##### [ ] Assunto 028 - Item 9: Controle da atividade financeira do Estado: espécies e sistemas.

##### [ ] Assunto 029 - Itens 10 e 11: TCU, tribunais de contas estaduais e do Distrito Federal e TCE/MA na Constituição estadual.

- Item 10. Tribunal de Contas da União (TCU), tribunais de contas dos estados e do Distrito Federal.
- Item 11. Tribunal de Contas do Estado do Maranhão na Constituição do Estado do Maranhão.

#### Legislação Específica

##### [ ] Assunto 030 - Item 1: Regimento Interno do Tribunal de Contas do Estado do Maranhão (TCE/MA).

##### [ ] Assunto 031 - Item 2: Lei nº 8.258/2005 (Lei Orgânica).

##### [ ] Assunto 032 - Item 3: Lei nº 9.936/2013 (Organização administrativa).

##### [ ] Assunto 033 - Item 4: IN nº 50/2017 e suas alterações.

##### [ ] Assunto 034 - Item 5: IN nº 82/2025.

#### História e Geografia do Estado do Maranhão

I - História do Estado do Maranhão

##### [ ] Assunto 035 - Itens 1 a 5: Formação colonial de São Luís, França Equinocial, Guaxenduba e ocupação holandesa.

- Item 1. História do Maranhão: França equinocial: expedição de Daniel de La Touche.
- Item 2. Fundação de São Luís.
- Item 3. Batalha de Guaxenduba.
- Item 4. A invasão holandesa.
- Item 5. A expulsão dos holandeses.

##### [ ] Assunto 036 - Item 6: Estado do Maranhão e Grão-Pará e Revolta de Bequimão.

- 6.1. A Revolta de Bequimão.
  - 6.1.1. Causas.
- 6.2. Companhias de Comércio do Maranhão e Grão-Pará.
- 6.3. Os objetivos da Revolta.

##### [ ] Assunto 037 - Itens 7 a 9: Independência do Brasil e adesão do Maranhão ao Império.

- Item 7. Período do Império: adesão do Maranhão.
- Item 8. A Independência do Brasil.
- Item 9. Causas da não adesão: a Batalha do Jenipapo.

##### [ ] Assunto 038 - Item 10: A Balaiada: caracterização e causas do movimento.

##### [ ] Assunto 039 - Itens 11 a 13: Maranhão republicano, Revolução de 1930, Vitorinismo e Greve de 1951.

- Item 11. Período Republicano: adesão do Maranhão à República.
- Item 12. A Revolução de 1930 no Maranhão.
- Item 13. O Vitorinismo e a Greve de 1951.

##### [ ] Assunto 040 - Item 14: Fatos políticos, econômicos e sociais do Maranhão na segunda metade do século XX.

II - Geografia do Estado do Maranhão

##### [ ] Assunto 041 - Itens 1, 3 (geomorfologia, geologia e recursos minerais) e 4: Caracterização físico-territorial e relevo do Maranhão.

- Item 1. Localização do Estado do Maranhão: superfície; limites; linhas de fronteira; pontos extremos.
- Item 3, recorte: Geomorfologia. Geologia e recursos minerais no Maranhão.
- Item 4. Classificação do relevo maranhense: planaltos, planícies e baixadas.

##### [ ] Assunto 042 - Itens 2 e 3 (parques nacionais): Áreas de proteção ambiental e parques nacionais.

- Item 2. Áreas de Proteção Ambiental (APA).
- Item 3, recorte: Parques nacionais.

##### [ ] Assunto 043 - Itens 3 (clima) e 7: Clima e formações vegetais do Maranhão.

- Item 3, recorte: Climas do Maranhão: pluviosidade e temperatura.
- Item 7. Principais formações vegetais: floresta, cerrado e cocais.

##### [ ] Assunto 044 - Itens 5 e 6: Hidrografia e bacias dos rios maranhenses.

- Item 5. Características dos rios maranhenses: bacias dos rios limítrofes: bacia do Parnaíba, do Gurupi e do Tocantins-Araguaia.
- Item 6. Bacias dos rios genuinamente maranhenses.

##### [ ] Assunto 045 - Item 8: Geografia da população: população absoluta, povoamento, urbanização, densidade e movimentos populacionais.

##### [ ] Assunto 046 - Itens 9 e 10: Agricultura, pecuária e extrativismo no Maranhão.

- Item 9. A agricultura maranhense: caracterização e principais produtos agrícolas; caracterização da pecuária.
- Item 10. Extrativismo: vegetal, animal e mineral.

##### [ ] Assunto 047 - Itens 11 e 12: Indústria e setor terciário no Maranhão.

- Item 11. Parque industrial: indústrias de base e indústrias de transformação.
- Item 12. Setor terciário: comércio, telecomunicações, transportes.

##### [ ] Assunto 048 - Itens 13 e 14: Infraestrutura logística: malha viária, portos e aeroportos.

- Item 13. Malha viária.
- Item 14. Portos e aeroportos.

##### [ ] Assunto 049 - Item 15: A cultura maranhense.

#### Noções de Direitos Humanos

##### [ ] Assunto 050 - Itens 1 e 2: Fundamentos dos direitos humanos e dos direitos fundamentais.

- Item 1. Teoria geral dos direitos fundamentais.
- Item 2. Direitos humanos e direitos fundamentais.

##### [ ] Assunto 051 - Item 3: Declaração Universal dos Direitos Humanos.

##### [ ] Assunto 052 - Item 4: Agenda 2030 da ONU.

##### [ ] Assunto 053 - Item 5: Estatuto da Pessoa com Deficiência (Lei nº 13.146/2015 e suas alterações).

##### [ ] Assunto 054 - Itens 6 e 7: Acessibilidade e prioridade de atendimento às pessoas com deficiência ou mobilidade reduzida.

- Item 6. Normas gerais e critérios básicos para promoção da acessibilidade às pessoas com deficiência ou com mobilidade reduzida (Lei nº 10.098/2000).
- Item 7. Prioridade de atendimento às pessoas com deficiência (Lei nº 10.048/2000).

##### [ ] Assunto 055 - Item 8: Lei nº 12.288/2010 (Estatuto da Igualdade Racial).

### Conhecimentos específicos

Referência: item 14.2.4, Cargo 1, páginas físicas 32 e 33 do PDF (páginas 238 e 239 do Diário Oficial).

#### Administração Pública

##### [ ] Assunto 056 - Item 1: Estruturas e desenho das organizações formais modernas.

- Características básicas, tipos de estrutura organizacional, natureza, finalidades e critérios de departamentalização.

##### [ ] Assunto 057 - Item 2: Processo organizacional: planejamento, direção, comunicação, controle e avaliação.

##### [ ] Assunto 058 - Item 3: Gestão de processos.

##### [ ] Assunto 059 - Itens 4 e 7: Gestão da qualidade e excelência nos serviços públicos.

- Item 4. Gestão da qualidade.
- Item 7. Excelência nos serviços públicos.

##### [ ] Assunto 060 - Item 5: Gestão de projetos.

##### [ ] Assunto 061 - Item 6: Planejamento estratégico.

##### [ ] Assunto 062 - Item 8: Empreendedorismo governamental e novas lideranças no setor público.

##### [ ] Assunto 063 - Itens 9 a 11: Gestão pública orientada a resultados e ao cidadão.

- Item 9. Gestão de resultados na produção de serviços públicos.
- Item 10. Convergências e diferenças entre a gestão pública e a gestão privada.
- Item 11. O paradigma do cliente na gestão pública.

##### [ ] Assunto 064 - Item 12: Sustentabilidade pública e acessibilidade.

#### Administração de Recursos Materiais e Patrimoniais

##### [ ] Assunto 065 - Itens 1, 2 e 6: Fundamentos e atividades da administração de material e patrimônio.

- Item 1. Introdução à Administração de Material e Patrimônio.
  - 1.1. Conceituação de Material e Patrimônio.
- Item 2. O Patrimônio das empresas e órgãos públicos.
- Item 6. Atividades básicas da Administração de Material e Patrimônio.

##### [ ] Assunto 066 - Itens 3, 4 e 15: Patrimônio imobiliário público, SPIU, gestão, manutenção e conservação.

- Item 3. O Patrimônio Imobiliário.
- Item 4. Cadastro e registro de bens imóveis (SPIU).
- Item 15. Gestão, manutenção e conservação dos bens patrimoniais imóveis públicos.

##### [ ] Assunto 067 - Itens 5 e 7 a 10: Patrimônio mobiliário e ciclo da administração patrimonial.

- Item 5. O Patrimônio Mobiliário.
- Item 7. Administração Patrimonial: noções sobre responsabilidade civil e administrativa.
- Item 8. O controle dos materiais e do patrimônio.
- Item 9. A movimentação do patrimônio.
- Item 10. Sistema Patrimonial.

##### [ ] Assunto 068 - Item 11: Previsão e controle de estoque.

- Planejamento, processos e políticas de administração de estoques; determinação de níveis de estoque; tempo de ressuprimento e estoques de segurança; avaliação de estoques - métodos.

##### [ ] Assunto 069 - Item 12: Almoxarifado e armazenamento.

- Funções, princípios e objetivos; controle, registro, conservação e recuperação de material; técnicas de armazenamento; utilização de espaço; segurança.

##### [ ] Assunto 070 - Item 13 (compras e classificação): Aquisição, classificação, padronização e codificação de materiais e patrimônio.

##### [ ] Assunto 071 - Itens 13 (demais processos) e 14: Recebimento, guarda, distribuição, inventário, análise do valor e alienação.

- Item 13, recorte: arquivamento, recebimento, proteção, conservação, distribuição e inventário.
- Item 14. Análise do valor e Alienação.

#### Gestão de Contratos

##### [ ] Assunto 072 - Item 1.1: Lei nº 14.133/2021 aplicada à contratação de bens e serviços.

##### [ ] Assunto 073 - Item 1.2: Instrução Normativa nº 5/2017 da Secretaria de Gestão do Ministério do Planejamento, Desenvolvimento e Gestão.

##### [ ] Assunto 074 - Item 2: Elaboração, execução e fiscalização de contratos.

- 2.1. Cláusulas e indicadores de nível de serviço.
- 2.2. Papel do fiscalizador do contrato.
- 2.3. Papel do preposto da contratada.
- 2.4. Acompanhamento da execução contratual.
- 2.5. Registro e notificação de irregularidades.
- 2.6. Definição e aplicação de penalidades e sanções administrativas.

#### Governo Eletrônico, Transparência e Controle Social

##### [ ] Assunto 075 - Item 1 (governo eletrônico): Governo eletrônico na administração pública.

##### [ ] Assunto 076 - Itens 1 (demais tópicos) e 2: Transparência, controle social, cidadania, accountability e Lei de Acesso à Informação.

- Item 1, recorte: transparência da administração pública; controle social e cidadania; accountability.
- Item 2. Lei nº 12.527/2011 (Lei de Acesso à Informação).

#### Gestão de Pessoas

##### [ ] Assunto 077 - Itens 1 a 3: Fundamentos, evolução, função e sistemas de gestão de pessoas.

- Item 1. Conceitos, importância, relação com os outros sistemas de organização.
- Item 2. Fundamentos, teorias e escolas da administração e o seu impacto na gestão de pessoas.
- Item 3. Função do órgão de recursos humanos.

- 3.1. Atribuições básicas e objetivos.
- 3.2. Políticas e sistemas de informações gerenciais.

##### [ ] Assunto 078 - Item 4: Comportamento organizacional.

- 4.1. Relações indivíduo/organização.
- 4.2. Liderança, motivação e desempenho.
- 4.3. Qualidade de vida.

##### [ ] Assunto 079 - Itens 5 a 7: Competência interpessoal, gerenciamento de conflitos e gestão da mudança.

- Item 5. Competência interpessoal.
- Item 6. Gerenciamento de conflitos.
- Item 7. Gestão da mudança.

##### [ ] Assunto 080 - Itens 8 e 9: Recrutamento, seleção, análise e descrição de cargos.

- 8.1. Tipos de recrutamento: vantagens e desvantagens.
- 8.2. Técnicas de seleção: vantagens, desvantagens e processo decisório.
- Item 9. Análise e descrição de cargos: objetivos, métodos, vantagens e desvantagens.

##### [ ] Assunto 081 - Item 10: Gestão de desempenho.

- 10.1. Objetivos.
- 10.2. Métodos de avaliação de desempenho: características, vantagens e desvantagens.

##### [ ] Assunto 082 - Item 11: Desenvolvimento e capacitação de pessoal.

- 11.1. Levantamento de necessidades.
- 11.2. Programação, execução e avaliação.

##### [ ] Assunto 083 - Item 12: Administração de cargos, carreiras e salários.

##### [ ] Assunto 084 - Itens 13 e 14: Gestão por competências e tendências em gestão de pessoas no setor público.

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
