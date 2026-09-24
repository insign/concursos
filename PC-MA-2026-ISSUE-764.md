# PC-MA 2026 — Oficial Investigador — registro da campanha #764

Issue de acompanhamento: <https://github.com/insign/concursos/issues/764>.

## 1. Autoridade e manutenção

Este arquivo é o registro detalhado da campanha na `main`. Sua criação e a redução da issue a um painel breve foram autorizadas expressamente pelo usuário em 19/09/2026. Essa decisão substitui, somente nesta campanha, a antiga exigência de manter todo o planejamento e estado exclusivamente no corpo da issue. As demais regras de `AGENTS.md` permanecem aplicáveis.

A migração consolida o corpo da #764 lido com `updated_at: 2026-09-19T14:53:28Z`, sobre a base `main` `20ff4172c93b0ca6f04edf5f55c5604e027d881f`. Token desta intervenção: `PC-DOC-764-20260919-MIGRACAO-01`. Não é nova unidade editorial, não altera aceites e não acrescenta tarefas aos totais do edital. É uma consolidação administrativa, não uma nova auditoria jurídica ou pedagógica dos materiais já aceitos.

### Divisão de responsabilidades

| Local | Conteúdo autoritativo | O que atualizar |
|---|---|---|
| Este arquivo, na `main` | Escopo, programa disponível, decisões aprovadas, matriz de unidades, origens e consumidores, dependências, estados detalhados C/H/Q, evidências, pendências e totais consolidados | Somente registros da tarefa própria, decisões autorizadas e agregados efetivamente afetados; substituir o registro corrente em vez de acumular relatos repetidos |
| Corpo da #764 | Painel breve, reservas ativas, impedimentos imediatos, próxima ação e referência da última consolidação confirmada | Reserva própria, situação corrente, resumo dos totais e último commit; não reproduzir matriz, bibliografia, inventários de blobs ou diário de execução |
| `AGENTS.md`, catálogos, schemas, grupos, resolvedor, vínculos e ADRs na `main` | Contratos pedagógicos, estrutura, identidades, rotas e resolução física/canônica | Não alterar para contornar problemas de conteúdo; mudanças dependem do escopo autorizado |
| Artefatos de cada assunto | Aula, recuperação, exercícios, resoluções e fontes efetivamente publicados | Apenas a unidade própria e a estrutura estritamente necessária |

Comentários, histórico de edições da issue, memória de conversas e o antigo `ROADMAP.md` não substituem essas fontes atuais. O histórico Git é evidência de publicação, não uma fila operacional alternativa.

### Reserva e estado efetivo

A reserva ativa é registrada **uma única vez, na issue**, com conversa/token, tarefa ou unidade, entregáveis, origem/destino, consumidores, arquivos compartilhados e SHA-base. Ela deve ser confirmada por releitura antes da edição.

Enquanto houver reserva válida, os entregáveis ainda pendentes abrangidos por ela têm estado operacional `analyzing`, mesmo que este arquivo ainda mostre a última consolidação `pending`. Essa diferença transitória, expressamente identificada pelo token, não é divergência de aceite. A reserva nunca rebaixa um entregável `done`. C, H e Q podem ter estados distintos.

No encerramento, registrar aqui o resultado detalhado e a evidência confirmada, publicar e reler este arquivo; depois sincronizar o resumo da issue e encerrar somente a reserva própria. Se a atualização da issue falhar, informar a dessincronização e reconciliar o próprio registro na retomada, sem refazer material já publicado nem apagar reservas alheias.

Bloqueio estrutural próprio não resolvido mantém a reserva `analyzing`: detalhar aqui evidência/intervenção, resumir na issue e parar. Trabalho próprio sem publicação confirmada volta a `pending`, salvo esse bloqueio. Um arquivo apenas local não constitui publicação.

### Fluxo de cada ciclo

1. Reler issue, este arquivo e contratos pertinentes na `main`; completar trechos truncados. Selecionar a primeira tarefa habilitada, salvo pedido explícito, preservando `done`, dependências e reservas alheias.
2. Resolver a unidade real e os consumidores. Consultar conflitos nas #765/#766 e demais metas consumidoras. Uma origem tem um executor. Reservar também arquivos estruturais e a seção deste registro que será alterada; gravações deste arquivo compartilhado devem ser serializadas pelo SHA atual.
3. Confirmar a reserva na issue. Ler artefatos inteiros e vizinhos; auditar e produzir apenas o pacote próprio. Paralelismo desativado reduz consultas intermediárias, não as leituras pré-escrita nem as confirmações posteriores.
4. Antes de publicar, reler issue, arquivo e `main`; reaplicar somente a mudança própria se a base avançar. Publicar diretamente na `main`, pelo conector, sem branch, PR, testes, builds, CI ou checks, salvo pedido explícito.
5. Confirmar commit e reler os arquivos publicados. Só então registrar aceite C/H/Q e evidências neste documento; confirmar sua publicação e atualizar o painel da issue. Não inventar o SHA de um commit que ainda não existe.
6. Sem alteração editorial necessária, registrar aderência integral, caminho e SHA já existente; não criar commit editorial vazio. Uma atualização documental material continua sendo uma entrega de documentação.
7. O e-mail ao próprio usuário é **opcional**, por solicitação expressa do usuário em 23/09/2026. Quando enviado, informar sucesso ou falha sem desfazer a publicação; a ausência de e-mail não bloqueia aceite, sincronização nem encerramento.

Não acumular novamente seções de totais a cada transição, reservas encerradas como se ativas fossem, nem versões repetidas de uma mesma evidência. Manter o estado corrente navegável e preservar decisões e evidências únicas suficientes para auditoria.

## 2. Estado corrente consolidado

Estado após as inspeções contextuais de **U001–U005, U007, U008, U010–U021 e U026 em PC-F02**, com U021 concluída em 24/09/2026: U001–U158 permanecem C/H/Q `done`. PC-F01 continua concluída; esses vinte pacotes locais foram inspecionados contextualmente e a correção de referências de U035 está documentada na seção 4, mas **não constituem aceite editorial global de PC-F02**. O restante de PC-F02 e PC-F03–PC-F05 permanece `pending`; PC-P02–PC-P05 continuam sem linhas próprias recuperáveis e não têm estado inferido.

| Dimensão | Total | pending | analyzing | done |
|---|---:|---:|---:|---:|
| Unidades reais previstas | 158 | 0 | 0 | 158 |
| Entregáveis de unidade C/H/Q | 474 | 0 | 0 | 474 |
| Tarefas macro individualizadas | 62 | 4 | 0 | 58 |

O planejamento original previa **66 macros**: 5 de implantação/fontes, 5 de reaproveitamento, 51 editoriais e 5 de fechamento. O corpo recebido individualiza apenas **62**: PC-P01, PC-R01–PC-R05, PC-E01–PC-E17 em C/H/Q e PC-F01–PC-F05. **PC-P02–PC-P05 não possuem linhas individuais recuperáveis nesse corpo; seus quatro estados não foram inferidos.**

Recontagem dos aceites registrados, sem somar macros ou visões: `U001–U158` = **158 unidades aceitas**. C/H/Q estão `done` em todas as unidades.

Visões consumidoras registradas: **158 = 141 físicas locais + 17 vínculos canônicos**. A aceitação de U075 não criou nova visão: sua visão física já existia desde `c1e00edc44afebf5cf73c783ace20fd7a69e1b75`. Neste ponto, 158 visões e 158 unidades aceitas coincidem numericamente, mas continuam sendo dimensões distintas.

As inspeções pontuais de PC-F02 não criam unidade ou tarefa macro adicional e não reabrem aceites. O restante não concluído de PC-F02 fica `pending` ao encerrar este ciclo; reservas ativas são controladas exclusivamente no painel da #764. PC-R04 permanece `done`, com **42/42** unidades parciais aceitas.

**Próxima ação habilitada: PC-F02 — seguir para U022 — primeiro pacote local de Informática.** U006 continua pulada pela divergência de identidade já registrada. A identidade de U009 foi conferida na `main` como `pc-u009`, ordem 9, em `estrutura-morfossintatica-periodo`, mas a própria unidade apresenta **divergência de classificação**: PC-R02 herdado a inclui entre as parciais, enquanto `referencias.md` afirma que nenhum doador equivalente foi localizado e a trata como assunto novo/local. U009 deve ser pulada, sem normalização por inferência, até reconciliação autorizada. U008 e U010–U021 já foram inspecionadas e permanecem C/H/Q `done`. Não repetir publicações confirmadas nem converter contagens, presença de arquivos ou buscas sem resultado em prova de conformidade pedagógica integral. PC-F01 está `done` com auditoria registrada abaixo.

### Pendências e divergências herdadas

| Registro | Situação recebida | Tratamento |
|---|---|---|
| U142 | `teoria-geral-direitos-humanos`, C/H/Q `done`; visão física publicada anteriormente e reaproveitamento parcial auditado nesta intervenção | Origem canônica `nocoes-direitos-humanos/teoria-geral-direitos-fundamentais`; proveniência, lacunas, cortes e evidência materializados abaixo |
| PC-P02–PC-P05 | Referências genéricas à implantação, mas ausência das quatro linhas próprias | Distinguir 66 previstas de 62 verificáveis; não inventar restauração, estado ou aceite |
| Programa e matriz antigos | O corpo recebido remete parte das definições e da transcrição integral a registros anteriores que já não estavam nele | Preservar o que está materializado abaixo; ausência de título, recorte, origem ou SHA é lacuna documental herdada, não licença para adivinhá-los |
| U081–U087 | Checklists e evidências de aceite `done`, mas linhas da matriz de planejamento ainda `pending` | Os dois registros são explicitados na matriz abaixo; nenhuma normalização silenciosa nesta migração |
| U006 — identidade divergente | O registro herdado associa U006 ao item 5 e ao slug `estrutura-morfossintatica-periodo`; a `main` atual resolve `storageId: pc-u006`, `order: 6`, para `classes-nominais-de-palavras` | Não normalizar nem reatribuir por inferência em PC-F02. Pular U006 enquanto a divergência persistir |
| U009 — classificação divergente | A `main` resolve `estrutura-morfossintatica-periodo` como `pc-u009`, ordem 9. PC-R02 herdado inclui U009 entre as **parciais**, mas o `referencias.md` local registra busca sem unidade física/canônica equivalente e declara o pacote **novo/local** | Identidade atual confirmada; não transformar busca negativa em prova de origem nem escolher uma classe por inferência. Pular U009 em PC-F02 até reconciliação autorizada; U010 é o próximo recorte habilitado |
| Corte jurisprudencial | PC-P01 distingue corte legislativo e regra de 30 dias antes das provas; registros recentes usaram também 13/7/2026 para limitar jurisprudência | Preservar ambos como registros; revalidar a aplicabilidade temporal no ciclo pertinente e em PC-F03, sem converter o corte legislativo em regra jurisprudencial por inferência |

As lacunas não bloqueiam automaticamente disciplinas independentes ou a U094, cujo recorte está materializado. Não afirmar que a matriz individual integral ou a transcrição literal completa do edital foi restaurada por este arquivo. O registro de aceites recebidos não equivale a nova certificação de cobertura material.

## 3. Objetivo, fontes e prova

Implantar **PC-MA 2026 — Oficial Investigador de Polícia**, reaproveitar assuntos iguais ou parcialmente iguais e completar `conteudo.md`, `referencias.md`, `cheat-sheet.md`, `questoes.json` e `resolucoes/*.md` quando necessárias.

Cobrir o programa integral do cargo, não apenas os acréscimos do roteiro incremental fornecido pelo usuário. TCE-MA é acervo candidato a reaproveitamento, não objeto de implantação desta campanha. Não reabrir nem alterar #755. Outros cargos, funcionalidades, infraestrutura, migrações gerais e mega revisões não integram este escopo.

### Fontes documentais recebidas

- [Página oficial do concurso](https://www.cebraspe.org.br/concursos/PC_MA_26_INVESTIGADOR).
- [Edital nº 1 — PCMA — Investigador, de 13 de julho de 2026](https://cdn.cebraspe.org.br/concursos/PC_MA_26_INVESTIGADOR/arquivos/9EE70E72CE79EB274C5319BEEB5B9B7D8519FF48DA21986A0830B5DB02C4F8B0.pdf): programa nos itens 20.2.2 e 20.2.3, discursiva no item 9 e corte nos itens 19.32–19.33.1.
- PC-P01 foi consolidada em 12/09/2026, token `PC-P01-20260912T1442-03`, com `main` `a5a4b7be8b7a035208aeeeb6afa3e20d002bd335`; não exigiu commit de conteúdo. A consulta então registrada não localizou publicação posterior aplicável. Isso é evidência datada, não declaração permanente de inexistência de retificações.
- As informações de prova e de legislação nesta seção foram transferidas do corpo recebido. Esta migração não declara nova consulta externa ou consolidação de retificações.

Catálogo atual conferido: `src/content/concursos/pc-ma-2026-oficial-investigador.json`, blob `99240fd6f378ca44560e7b9a7a7490d39be15eb2`; título `PC/MA 2026 - Oficial Investigador de Polícia`, `storageId: pcma-2026-invest`, `order: 4`.

Contratos relidos nesta intervenção: `AGENTS.md` (blob `1735e5035e3824be202be5c014f18d6445e235bb`), `src/lib/content-schema.ts` (`cdc04725dd01df2fdf5dd8aa0ab1beb874e69a20`) e disposições de organização/rotas de `ADR.md` (`6d94fe8802ac79e254e623823884c27b39d1d98d`). Revalidar os contratos efetivos antes de trabalho editorial; estes identificadores não congelam a arquitetura futura.

### Objetiva — estrutura e corte registrados

Prova P1 eliminatória e classificatória, **100 questões de múltipla escolha**, cinco opções e uma correta, valendo 100,00 pontos. Quadro do item 7.1 recebido:

| Grupo | Disciplina/linha do quadro | Questões |
|---|---|---:|
| I | Língua Portuguesa | 10 |
| I | Informática | 12 |
| I | Raciocínio Lógico | 6 |
| I | Contabilidade | 6 |
| I | Estatística | 4 |
| I | Administração | 4 |
| I | Legislação e Conhecimentos Regionais Históricos e Geográficos | 3 |
| II | Direito Penal | 10 |
| II | Direito Processual Penal | 8 |
| II | Direito Administrativo | 8 |
| II | Direito Constitucional | 8 |
| II | Legislação Especial | 8 |
| II | Direitos Humanos | 5 |
| II | Medicina Legal | 5 |
| II | Criminologia | 3 |

Grupo I = 45; Grupo II = 55. Acerto vale 1,00; erro, ausência de marcação ou marcação múltipla vale 0,00. O subitem 8.11.4 elimina nota inferior a 50,00. O subitem 8.11.5 limita os aprovados não eliminados a 1.499 da ampla concorrência, 215 pessoas com deficiência e 428 candidatos negros, respeitados empates na última posição; recomposição da ampla concorrência no subitem 8.11.5.1. Não redistribuir editorialmente o peso da linha regional entre disciplinas.

### Discursiva e Atualidades

P2 eliminatória e classificatória, 20,00 pontos, **uma redação de até 30 linhas** sobre tema relevante da atualidade pertinente à realidade do cargo. Pelo subitem 9.7.1, corrigem-se as discursivas dos aprovados na objetiva conforme 8.11.5/8.11.5.1. Texto dissertativo, conteúdo, expressão e modalidade escrita formal. A fonte recebida remete a fórmula ao item 9.7.5, sem a transcrever; não inventar seus termos. O subitem 9.7.6 exige nota na discursiva de pelo menos 10,00.

Atualidades está expressamente marcada **SOMENTE PARA A PROVA DISCURSIVA**. Campos exemplificativos: segurança, transportes, política, economia, sociedade, educação, saúde, cultura, tecnologia, energia, relações internacionais, desenvolvimento sustentável e ecologia. O termo “tais como” não torna essa enumeração exaustiva. Questões objetivas produzidas nesse bloco são apenas fixação; propostas abertas pertencem ao material didático, nunca ao schema objetivo.

### Corte temporal registrado em PC-P01

- 19.32: alterações legislativas com entrada em vigor até a publicação do edital podem ser avaliadas, ainda que não estejam no item 20.
- 19.33: legislação não vigente pode ser cobrada se explicitada nos objetos de avaliação.
- 19.33.1: jurisprudência de tribunais superiores pode ser considerada se publicada até 30 dias antes das provas.
- Provas inicialmente previstas para **6/12/2026**, sujeitas a alteração oficial.

O corte legislativo adotado é **13/7/2026**. Não aplicá-lo automaticamente a acontecimentos de Atualidades. Separar data do fato, publicação, consulta, vigência e corte aplicável. A divergência de tratamento jurisprudencial dos aceites recentes permanece identificada na seção 2.

## 4. Roadmap detalhado e tarefas macro

### Fontes, implantação e reaproveitamento

- [x] PC-P01 — `done` — Consolidar edital e retificações oficiais; transcrever o programa integral com sua numeração, separar objetiva/discursiva e registrar inconsistências documentais sem correção silenciosa.
- PC-P02–PC-P05 — previstas no desenho original, mas sem linhas individuais e estados verificáveis no corpo recebido. Não foram criadas como novas tarefas nem marcadas por inferência nesta migração.
- [x] PC-R01 — `done` — Inventário integral do acervo candidato, consumidores e artefatos concluído conforme evidência registrada na campanha; detalhamento antigo parcialmente ausente no corpo recebido.
- [x] PC-R02 — `done` — Classificação das 158 unidades: 17 integrais, 42 parciais e 99 novas, conforme seção 5.
- [x] PC-R03 — `done` — 17/17 unidades integrais implantadas por vínculo canônico conforme aceite recebido; revalidar origens antes de editar.
- [x] PC-R04 — `done` — **42/42** unidades parciais aceitas; U075 reconciliada explicitamente em 21/09/2026 com os dois canônicos doadores e corte PC-MA documentados.
- [x] PC-R05 — `done` — Lacunas, unidades novas e dependências consolidadas conforme aceite recebido, sem inventar o detalhamento antigo ausente.

### Produção por bloco

Cada célula C/H/Q representa a tarefa de sufixo correspondente, por exemplo PC-E01-C, PC-E01-H e PC-E01-Q. C = Conteúdo e referências; H = Cheat sheets; Q = Questões e resoluções. A tabela preserva as 51 tarefas, não cria tarefas adicionais para os blocos agregadores.

| Macro | Bloco / unidades | C | H | Q |
|---|---|---|---|---|
| PC-E01 | Língua Portuguesa — U001–U021 | done | done | done |
| PC-E02 | Informática — U022–U034 | done | done | done |
| PC-E03 | Raciocínio Lógico — U035–U042 | done | done | done |
| PC-E04 | Contabilidade — U043–U049 | done | done | done |
| PC-E05 | Estatística — U050–U055 | done | done | done |
| PC-E06 | Administração — U056–U061 | done | done | done |
| PC-E07 | História do Maranhão — U062–U068 | done | done | done |
| PC-E08 | Geografia do Maranhão — U069–U077 | done | done | done |
| PC-E09 | Atualidades — U078–U080 — somente discursiva | done | done | done |
| PC-E10 | Direito Penal — U081–U090 | done | done | done |
| PC-E11 | Direito Processual Penal — U091–U097 | done | done | done |
| PC-E12 | Direito Administrativo — U098–U111 | done | done | done |
| PC-E13 | Direito Constitucional — U112–U122 | done | done | done |
| PC-E14 | Legislação Especial — U123–U141 | done | done | done |
| PC-E15 | Direitos Humanos — U142–U148 | done | done | done |
| PC-E16 | Medicina Legal — U149–U155 | done | done | done |
| PC-E17 | Criminologia — U156–U158 | done | done | done |

PC-E09-C inclui orientação de redação; PC-E09-H recupera repertório/estrutura; PC-E09-Q reúne fixação e propostas abertas no material didático, sem atribuí-las à objetiva do cargo. PC-E14-C inclui auditoria normativa das literalidades defeituosas, sem correção silenciosa.

### Fechamento e aceite

- [x] PC-F01 — `done` — Matriz conferida em 21/09/2026 contra o Edital nº 1, itens 7, 8, 9, 19.32–19.33.1 e 20.2.2–20.2.3; sem lacuna programática identificada, sem dupla contagem de unidade e sem redistribuição de pesos; auditoria detalhada abaixo.
- [ ] PC-F02 — `pending` — Inspecionar manualmente schemas, frontmatter, Markdown, `abbr`, links, referências, questões, revisões, resoluções, identidades, rotas, vínculos e consumidores.
- [ ] PC-F03 — `pending` — Reconsultar publicações oficiais e fontes materiais, distinguindo alterações posteriores do corte e resolvendo/explicitando literalidades defeituosas.
- [ ] PC-F04 — `pending` — Confirmar na `main` commits e arquivos resolvidos; consolidar origens, consumidores, cobertura e duplicações por unidade.
- [ ] PC-F05 — `pending` — Recalcular macros, unidades reais, canônicas/locais e visões; fechar #764 somente com cobertura integral, tudo `done` e nenhuma reserva ativa.

### PC-F01 — conferência final da matriz contra o edital

**Fonte oficial revalidada em 21/09/2026:** Edital nº 1 — PCMA — Oficial Investigador, de 13/07/2026, PDF oficial do Cebraspe:  
https://cdn.cebraspe.org.br/concursos/PC_MA_26_INVESTIGADOR/arquivos/9EE70E72CE79EB274C5319BEEB5B9B7D8519FF48DA21986A0830B5DB02C4F8B0.pdf

A conferência cobriu a tabela de provas do item 7, os critérios objetivos/discursivos dos itens 8–9, o corte legislativo/jurisprudencial dos itens 19.32–19.33.1 e todo o programa dos itens 20.2.2–20.2.3.

#### Estrutura de prova preservada, sem redistribuir pesos

| Bloco oficial | Distribuição oficial | Cobertura editorial |
|---|---|---|
| Grupo I — conhecimentos gerais | Língua Portuguesa 10; Informática 12; Raciocínio Lógico 6; Contabilidade 6; Estatística 4; Administração 4; **Legislação e Conhecimentos Regionais Históricos e Geográficos 3** = **45 questões** | U001–U077; História U062–U068 e Geografia U069–U077 compartilham o único peso oficial de 3 questões; **não** foi criado peso separado por disciplina ou por unidade |
| Grupo II — conhecimentos específicos | Direito Penal 10; Processual Penal 8; Administrativo 8; Constitucional 8; Legislação Especial 8; Direitos Humanos 5; Medicina Legal 5; Criminologia 3 = **55 questões** | U081–U158; pesos permanecem no nível das disciplinas, sem rateio por unidade |
| Prova discursiva | 1 redação, até 30 linhas, 20 pontos, tema relevante da atualidade pertinente ao cargo; aprovação com NPD ≥ 10 | U078–U080; Atualidades permanece **somente discursiva** e suas questões objetivas didáticas são fixação, não peso da P1 |
| Prova objetiva | 100 questões de múltipla escolha, cinco opções e uma resposta correta; eliminação abaixo de 50 pontos | 45 + 55 = 100; nenhuma quota editorial de Q foi tratada como peso oficial |

#### Cobertura do programa por disciplina

| Programa oficial | Unidades | Visões publicadas | Resultado da conferência |
|---|---:|---:|---|
| Língua Portuguesa 1–7.4 | U001–U021 | 21 locais | leitura/interpretação, gêneros, ortografia, coesão, morfossintaxe, reescrita e correspondência oficial cobertos |
| Informática 1–10, inclusive 8.1–8.6 | U022–U034 | 12 locais + 1 vínculo | internet/intranet, sistemas, suítes, e-mail, navegação, redes, nuvem, segurança/investigação digital, IA e criptomoedas cobertos |
| Raciocínio Lógico 1–7 | U035–U042 | 1 local + 7 vínculos | estruturas, argumentação, proposicional, primeira ordem, contagem/probabilidade, conjuntos e problemas cobertos; preservada a grafia editalícia **“3,4 Leis De Morgan”** sem correção silenciosa |
| Contabilidade 1–12 | U043–U049 | 7 locais | fundamentos/patrimônio, fatos, contas, plano, escrituração, operações, balancete/demonstrações/normas cobertos |
| Estatística 1–5.2 | U050–U055 | 6 locais | descritiva, probabilidade/distribuições, limites/amostras, inferência, regressão e amostragem cobertos |
| Administração 1–2.10 | U056–U061 | 6 locais | administração gerencial/comportamento, sistemas federais, orçamento, SIDOR/SIAFI, receita, despesa e execução cobertos |
| História do Maranhão 1–14 | U062–U068 | 2 locais + 5 vínculos | França Equinocial até fatos políticos/econômicos/sociais da segunda metade do século XX cobertos |
| Geografia do Maranhão 1–15 | U069–U077 | 5 locais + 4 vínculos | localização/áreas protegidas, clima/relevo/hidrografia/vegetação/população, itens 9–10 em U075, indústria, setor terciário, malha/portos/aeroportos/cultura cobertos |
| Atualidades — somente P2 | U078–U080 | 3 locais | segurança, transportes, política, economia, sociedade, educação, saúde, cultura, tecnologia, energia, relações internacionais, desenvolvimento sustentável e ecologia distribuídos sem peso objetivo |
| Direito Penal 1–12 | U081–U090 | 10 locais | parte geral, imputabilidade/concurso e crimes dos títulos exigidos cobertos |
| Direito Processual Penal 1–6 | U091–U097 | 7 locais | princípios/sistemas, inquérito, prova, flagrante, preventiva, temporária e cautelares cobertos; as **duas ocorrências do item 4** foram preservadas em U094 e U095 |
| Direito Administrativo 1–13 | U098–U111 | 14 locais | todos os itens cobertos; item 9 foi desdobrado em U106 (controle) + U107 (responsabilidade civil) sem criar peso próprio |
| Direito Constitucional 1–12.4 | U112–U122 | 11 locais | todo o programa coberto; itens 3+4 foram reunidos em U114 como direitos/garantias + remédios constitucionais, sem perda de subitem |
| Legislação Especial 1–20 | U123–U141 | 19 locais | vinte ocorrências do edital cobertas por dezenove unidades porque a Lei 12.830/2013 aparece nos itens **8 e 13** e é tratada uma única vez em U130, com ambas as ocorrências registradas |
| Direitos Humanos 1–8.3 | U142–U148 | 7 locais | teoria geral, DIDH/interno, sistema global, pactos, sistema interamericano, convencionalidade/Constituição e grupos vulneráveis/atividade policial cobertos; preservada a literalidade peculiar do item 2.3 |
| Medicina Legal 1–8.1 | U149–U155 | 7 locais | fundamentos, perícia/peritos, documentos/identificação, traumatologia, tanatologia, local de crime e psiquiatria forense cobertos |
| Criminologia 1–3.5 | U156–U158 | 3 locais | conceito/métodos/objetos, funções/política criminal, modelos sociológicos e prevenção primária/secundária/terciária cobertos; não foram importados os antigos itens “modelos de reação ao crime” ou “Criminologia Ambiental” |

#### Fecho da auditoria

- **Cobertura programática:** nenhum item/subitem do programa oficial de 13/07/2026 ficou sem responsável na matriz aceita.
- **Inventário materializado na `main`: 158 visões = 141 pacotes físicos locais + 17 `vinculo.json` canônicos**, exatamente o total de 158 unidades previstas.
- **Dupla contagem evitada:** a repetição da Lei nº 12.830/2013 nos itens 8 e 13 de Legislação Especial não cria duas unidades; os dois “4” de Processo Penal são conteúdos diferentes e permanecem separados; junções e desdobramentos pedagógicos registrados não alteram pesos.
- **Pesos:** permanecem exclusivamente os do item 7.1 do edital. A quantidade de unidades, questões didáticas ou subtarefas C/H/Q não foi convertida em peso de prova.
- **Discursiva:** Atualidades continua fora da objetiva e ligada à redação de até 30 linhas; não há importação de suas questões de fixação para a distribuição de 100 pontos da P1.
- **Cortes:** legislação com entrada em vigor até 13/07/2026 integra o recorte conforme item 19.32; jurisprudência de tribunais superiores segue a regra própria de publicação até 30 dias antes da prova, sem ser reduzida ao corte legislativo.
- **Resultado PC-F01:** `done`. A próxima etapa é PC-F02; esta auditoria não substitui a inspeção de schemas, links, `abbr`, referências, questões, vínculos e consumidores prevista nela.

### PC-F02 — triagem documentada e correções pontuais

**Resultado consolidado até 24/09/2026: parcial; PC-F02 permanece `pending`.** A triagem anterior partiu de `ae9d40e369724a3d33e1749bdbe701bd672ee749`. As intervenções confirmadas são: referências de U035 em `2bb073899bfa28b00ef6b77e0211e1e8e674a810`, correção editorial de U026 em `3327d909417c04134b52ff3317fb35a80299734a`, inspeção contextual de U001 em `e86513514022eef8e8733a567d25174b1f0dc370`, U002 em `589ee4028f351f628ddcaf41b82a1d3d97e0a583`, U003 em `576474ec0376a455bf17f630d8b6af75799f8097`, U004 em `9c2ee25645fd0ca94d510352117530b83429344b`, U005 em `bc72f3cbb85a40a617fe81e2d01d6d4898022aeb`, U007 em `25e29b293c90796034578cbafcdbc1b23c53b22b`, U008 em `1c8d9d6cb172e0e2687c3f04777fe1b0012fedcc`, U010 em `f7d7671610e57bb984d0cca4bff27ca81e4f287b` + `aa84886b359a8c957b6f30b03b6a7d6823509f5a`, U011 em `6017fe32124653bd1d1ce2983344cce9d8e31ea8`, U012 em `ec70b9856a1bffa760ef8c2293a61cca4a08ab5c` + `ac9254a011e61bb48c2d7fdde1ba8c26e6b2734a` + `6b331bb0e5c3ceb314663800e1eb65c3be9713ca`, U013 em `9e9ff3bba1d5567042dd82b46c4977ce5571f09e` + `44c4ad90412268e9f643292401ebc8185907ca06` + `cd99fe4bbea0f48d2a50f2f4ae5e45c64f96bc0d`, U014 em `a2ca7a2a94a1986982bb0d0b6f44f8c340f825ad` + `05dfd78676a5d0d72d78e382ebe8ba90294f4b11` + `88246305b1dc48c1dc427859c933b22cfe650eef`, U015 em `39737c4cd0e39a7aa9401c8b14414725d60809dd` + `edaeb7444724604c0a977b378aef76b1ad76ccfb` + `9e002427d103864047df5169b4b1266fcdde6e98`, U016 em `3e364ed6823b719c9e07b44e515aecf63adcd8f8` + `a0d34f4c134de6389474633ea5c95fb491a3a92a` + `a2f0ccb77c043ad108a4a347828beaa6567fc36b` e U017 em `d06ef75d651e895cd2c5c328b90a9dc574318e3d` + `7a6eaf7d839911859aac9e6b02421587077dc3fd` + `031dd4c52189f09882e5a570242536ca137f2f56` e U018 em `c5cd738286eca67483667c481e9ad449c9775310` + `d33111335e512406a3a2c510e78a63e33c8ba64e` e U019 em `e2acc605d0440f7723012f6c19363803a89fed20` + `926c2758096d27b5ce7a519d6204cf0ba4ecb05d` e U020 em `b40db0bce04738102ea623ba53a579534ee8707c` + `b10b0a900709cc44603eb3ad79cd448210454fcf` + `5ab2bc0f7728c66e9fd01ca8ab4236e8505e9754` e U021 em `9e3746e8f40518ce129db3018aa266f14ef22e52` + `816f506514d877dcd41a16be6e751e6514c8b3a8`. Nenhuma delas autoriza marcar a macro inteira como concluída.

| Dimensão da triagem | Evidência e alcance | Limite do resultado |
|---|---|---|
| Inventário físico e vínculos | 600 arquivos na árvore consumidora: 141 pacotes com quatro artefatos, 17 vínculos e 19 descritores de grupo; quatro artefatos presentes em cada origem canônica resolvida | Presença não certifica suficiência pedagógica ou validade de todas as fontes |
| Organização e identidade | Descritores e vínculos conferidos; 158 slugs finais distintos; ordens consumidoras 1–158 sem lacunas; 141 identidades locais `pc-uNNN` e 17 identidades canônicas distintas; sem mistura de arquivos físicos com vínculo | Não altera identidades, ordens, rotas ou classificação de reaproveitamento |
| Consumidores canônicos | Os 17 canônicos possuem vínculos explícitos da PC-MA e dos dois cargos do TCE-MA | São 17 visões da PC-MA, não 51 unidades desta campanha; nenhum pacote da SEAP/Perícia foi presumido consumidor |
| Questões | 158 conjuntos, **3.369 questões locais + 965 canônicas = 4.334**; estrutura, campos, IDs, revisões positivas, alternativas e referência do gabarito examinados | Não equivale a auditoria semântica de 4.334 gabaritos, distratores, atribuições e explicações |
| Formatos de questões | 22 questões em oito conjuntos têm número de alternativas diferente de cinco; o schema aceita ao menos duas | Não converter automaticamente questões anteriores nem confundir formato didático com a prova oficial |
| Resoluções e blobs | Não há `resolucoes/*.md` nas 158 origens inspecionadas; 100 linhas de quatro blobs já individualizadas no arquivo foram confrontadas com a árvore-base sem divergência | Ausência de resolução não prova que todas as explicações dispensam aprofundamento |

Os oito conjuntos com alternativas em quantidade diferente de cinco são U035, U036, U037, U038, U039, U041, U062 e U101. Suas contagens e formatos não foram modificados. Buscas por marcação defeituosa e leitura estrutural de arquivos não demonstram que toda sigla está marcada nem que toda microdescrição está correta; a formulação anterior de conformidade geral fica expressamente limitada por este registro.

**U035 — referências:** `src/content/biblioteca/raciocinio-logico/estruturas-logicas/referencias.md`, blob final `6a702f5320cbe93d95ccf07bb9fdae31bbd59a67`. Foram acrescentados os endereços das três fontes já indicadas e sua identificação; C/H/Q e vínculos permaneceram intactos. A origem é compartilhada por PC-MA, TCE-MA Analista Administração e TCE-MA Técnico Administrativo. Trata-se de correção de referências, não de nova certificação integral desses três consumidores.

**U026 — correção concluída:** os quatro artefatos locais foram lidos integralmente, assim como os conteúdos vizinhos U025 e U027. A aula agora constrói interface, enlace, quadro, pacote, bits, prefixo e representação hexadecimal antes de exigir esses conceitos; distingue entrega a uma interface, a todo o grupo e a um membro escolhido pelo roteamento. Corrigiu-se a aproximação indevida de anycast à entrega múltipla: a função de broadcast é suprida por multicast no IPv6, conforme a RFC 4291, seção 2. A revisão rápida recupera apenas o que a aula ensina. As siglas renderizadas receberam expansão contextual; os campos de texto puro das questões foram preservados.

Em Q, a única alteração material é a explicação de `u026-a13`; o restante do diff é remoção de espaços finais e término de arquivo. Permanecem **18 questões, 16 autorais + 2 anteriores**, os mesmos IDs, `origin`, enunciados, alternativas e gabaritos. `revision` e `questionSetRevision` permanecem 1, pois não houve mudança de enunciado, opções, resposta correta ou composição do conjunto. As adaptações FGV/ALEMA 2023, questões 31 e 43, foram reconferidas na prova e no gabarito definitivo; não foram acrescentadas questões apenas para cumprir quota.

Referências de U026 foram completadas com fontes primárias técnicas e identificação precisa; a consulta de 21/09/2026 não muda o corte de 13/07/2026. A página de segurança da Wi-Fi Alliance retornou erro de acesso nesta consulta, sem prova de indisponibilidade permanente; foi substituída, para o mecanismo de proteção da conexão sem fio, por documentação oficial acessível da Apple. Não foram importadas listas comerciais de dispositivos. Fontes, proveniência, fronteiras e blobs finais estão nas seções 6 e 8 e no `referencias.md` da unidade.

**Tamanho e intervenção de U026:** C passou de 8.853 para 13.064 bytes; H, de 2.384 para 3.743 bytes. Esses números incluem marcação e não medem diretamente tempo de leitura. O texto visível ganhou as pontes conceituais e a distinção de entrega que faltavam; blocos repetidos de método e pegadinhas foram reunidos. HTML e microdescrições acrescentam ajuda no ponto de uso, separada da explicação central. Não foi feita contagem independente de palavras visíveis e de atributos, portanto não se afirma redução quantitativa de tempo ou de texto. Não houve mudança de infraestrutura, schema, grupo, identidade, rota, corte ou quantidade de unidades.

**U001 — inspeção contextual concluída:** conteúdo, revisão rápida, referências e as 36 questões foram lidos integralmente. U002 foi lida como vizinha para preservar a fronteira entre interpretar textos de gêneros variados (item 1) e classificar tipos/gêneros (item 2), sem estender o aceite da inspeção a U002. A aula já organiza o raciocínio por evidência, limites da inferência, implícitos, sentido global, vozes e integração de recursos; os conceitos são ensinados antes de cobrados. H recupera esse conteúdo sem introduzir fundamento novo. Frontmatter, Markdown, microdescrições, exemplos hipotéticos e remissões foram examinados. **C e H foram aceitos sem alteração**, nos blobs registrados na seção 8; crescimento de texto visível, marcação e microdescrições desses dois arquivos: zero.

As 32 questões autorais de U001 tiveram comandos, cinco alternativas, gabarito único e explicações examinados em relação aos textos hipotéticos. As quatro adaptações anteriores foram confrontadas com os cadernos oficiais e gabaritos definitivos: Agência Espacial Brasileira 2025, questões 1 D e 2 A; Aracaju Auditor 2021, questões 1 D e 2 B. A única correção de Q é `q109`: o resumo omitira a referência à época de Bentham exigida por “contemporâneo a ele”. O texto original sustenta a pista temporal e o papel de Caenegem como historiador citado, agora explicitados no resumo e na explicação. **`q109.revision`: 2 → 3**; alternativas, gabarito, ID e `origin` preservados. As outras 35 questões não mudaram. `questionSetRevision` permanece **6**, pois a composição do conjunto não mudou. Não foi necessária resolução separada nem acréscimo de questões.

O commit `e86513514022eef8e8733a567d25174b1f0dc370` altera somente Q e referências locais de U001 e foi relido na `main`. As referências ganharam suporte primário direto para intertextualidade e multimodalidade, identificação da revisão de `q109` e limites de consulta. Os quatro verbetes do glossário universitário foram lidos; identificação/resumos dos dois artigos acadêmicos foram revalidados, sem afirmar nova leitura integral destes. O acesso direto ao artigo de D'Ávila falhou, mas seu registro oficial indexado foi consultado; o gabarito da Agência Espacial Brasileira teve confirmação textual, sem renderização bem-sucedida. Isso não foi ocultado como sucesso visual. As duas provas, o gabarito de Aracaju e o trecho do programa foram conferidos também visualmente. Corte programático mantido em **13/07/2026**; a página dinâmica do concurso não permitiu concluir inexistência de retificações, cuja consolidação final permanece em PC-F03. Não houve nova cópia do doador histórico nem edição canônica/TCE; o crescimento ficou restrito à pista de leitura, sua explicação e à documentação de suporte.

**U002 — inspeção contextual concluída:** os quatro artefatos locais foram lidos integralmente; U001 e U003 foram relidas como vizinhas para preservar as fronteiras entre interpretação, classificação de tipos/gêneros e ortografia. Frontmatter, Markdown, microdescrições e remissões não exigiram alteração. C/H já distinguem gênero, tipo/sequência, domínio e suporte antes das aplicações, ensinam predominância sem pressupor pureza textual e separam heterogeneidade tipológica de intergenericidade. O único uso de siglas/estrangeirismos técnicos que requer ajuda no material renderizado — <abbr title="Frequently Asked Questions, perguntas frequentes">FAQ</abbr> e <abbr title="Sequência encadeada de postagens">thread</abbr> — já estava marcado; campos JSON permanecem texto puro. **C, H e Q foram aceitos sem alteração**, com 18 autorais + 3 adaptações, cinco alternativas e gabarito único em todas as 21 questões; `questionSetRevision: 5` e revisões individuais foram preservados.

As três adaptações anteriores foram reconferidas nas fontes primárias: Cebraspe SEPLAD/DF 2022, questão 4 = C, classificação dissertativo-argumentativa; FGV ALE-AM 2025, Redator Tipo 1, questão 52 = D, segmento narrativo das vacas; FGV TCE-PE, Analista de Gestão — Administração Tipo 1, questão 7 = A, argumento de autoridade. Provas e gabaritos foram examinados textual e visualmente. A fundamentação também foi revalidada nos três verbetes do Glossário Ceale, na publicação institucional Inep/Cebraspe de 2017 e no registro da dissertação de Vera Maria Ramos Pinto, defendida em 2011. A única edição foi em `referencias.md`: data de revalidação, explicitação do suporte às distinções e identificação bibliográfica da dissertação. O commit `589ee4028f351f628ddcaf41b82a1d3d97e0a583` foi relido na `main`; C/H/Q permaneceram nos blobs registrados na seção 8. O canônico histórico e seus dois consumidores TCE ficaram somente leitura.

**Tamanho e intervenção de U002:** C, H e Q tiveram crescimento zero; apenas R cresceu pela documentação de revalidação. Não houve alteração de texto didático, microdescrições, questões, identidade, rota, ordem, corte, schema ou composição do conjunto. O corte do programa continua 13/07/2026; a revalidação de 21/09/2026 não projeta conteúdo posterior ao edital.

**U003 — inspeção contextual concluída:** o pacote físico local foi lido integralmente, com U002 e U004 como vizinhas. A origem histórica foi resolvida no canônico `src/content/biblioteca/lingua-portuguesa/ortografia-oficial/`, commit `ad852a4507777fbd76d15919808ad7660b05b23a`, e os dois consumidores TCE atuais foram confirmados por vínculos explícitos, sem edição canônica. Frontmatter, Markdown, código inline e microglossário não exigiram alteração: as ocorrências de `CNPq`, `UnB`, `PMs` e símbolos aparecem como exemplos em código/texto puro e não receberam HTML; as ocorrências renderizadas de <abbr title="Vocabulário Ortográfico da Língua Portuguesa">VOLP</abbr> já estavam marcadas.

C/H foram confrontados com o Acordo Ortográfico promulgado pelo Decreto nº 6.583/2008, o Decreto nº 7.875/2012, o <abbr title="Vocabulário Ortográfico da Língua Portuguesa">Volp</abbr> digital 2025–2026, material da Academia Brasileira de Letras sobre hífen/reduções e fontes oficiais de redação/metrologia. Não foi identificada divergência normativa que justificasse reescrita. Foram preservados os mecanismos de acentuação, hífen, emprego de letras, maiúsculas/minúsculas, reduções, variantes e uso de símbolos.

As **24 questões** foram examinadas: 20 autorais + 4 adaptações, todas com cinco alternativas, gabarito único e explicação suficiente; `questionSetRevision: 6` foi preservado. As quatro anteriores foram reconferidas textual e visualmente nas fontes primárias: PC-GO 2016 q4 = B; AL-CE 2021 q27 = D; SEMEC/Teresina 2009 q46 = C; Serviço Geológico do Brasil/FGV 2025, Geologia/Levantamento Geológico e de Recursos Minerais Tipo 2, q4 = E. Nenhuma questão ou revisão foi alterada e não se mostrou necessária resolução separada.

A única edição foi em `referencias.md`: revalidação datada, explicitação do suporte normativo/lexical, substituição do link do Manual por cópia acessível em portal oficial do Governo Federal e identificação mais precisa das provas. O commit `576474ec0376a455bf17f630d8b6af75799f8097` foi relido na `main`. **Tamanho:** C/H/Q tiveram crescimento zero; somente R cresceu pela documentação de auditoria. Não houve mudança de identidade, rota, ordem, schema, corte ou composição do banco.

**U004 — inspeção contextual concluída:** o pacote físico local foi lido integralmente, com U003 e U005 como vizinhas. A classificação **parcial/local** de PC-R02 foi preservada, mas o registro autoritativo atual não individualiza o doador histórico; esta inspeção não o reconstruiu por slug, título ou semelhança. O canônico `src/content/biblioteca/lingua-portuguesa/coesao-textual/` já existia no pai `09063bc6184c5f04f1989bd53bd9a0d079d72916` anterior à primeira publicação local e possui dois consumidores TCE comprovados por vínculos explícitos, porém foi tratado somente como **candidato comparativo**. Seus quatro blobs permanecem iguais na `main`, e nenhum arquivo canônico/TCE foi editado.

C/H cobrem o recorte dos itens 4 e 4.1: coesão versus coerência; referente/antecedente; anáfora direta e indireta; catáfora e exófora; coesão lexical, hiperônimo/hipônimo; encapsulamento e nominalização; referência/substituição/elipse; conectores e valores contextuais; alcance, sequenciação, paralelismo e progressão temática. O recorte local é mais estreito do que o candidato canônico e deixa o aprofundamento de pronomes relativos e sintaxe para unidades próprias. Frontmatter, Markdown e microglossário passaram na inspeção manual; **C/H foram aceitos sem alteração**.

As **18 questões** foram examinadas: 15 autorais + 3 adaptações, todas com cinco alternativas, gabarito único e explicação suficiente; `questionSetRevision: 5` e revisões individuais foram preservados. As três anteriores foram reconferidas nas fontes FGV: DPE-RO 2025, Analista em Redação, q47 = **A**, verbo `fazer` substituindo o predicado; TJSC 2024, Analista Jurídico Tipo 2, q3 = **E**, `dado que` como razão; TJDFT 2022, Analista Judiciário — Administração Tipo 1, q4 = **C**, `mesmo assim` como opção não aditiva. Os três cadernos foram conferidos textual e visualmente; DPE-RO e TJSC tiveram gabaritos também conferidos visualmente. O gabarito TJDFT foi confirmado por extração textual; a renderização da página do gabarito falhou por cache. Nenhuma revisão de Q ou resolução separada foi necessária.

A fundamentação foi revalidada em registros bibliográficos de Koch/Koch-Travaglia, no artigo de Marcuschi sobre referenciação e progressão tópica, no artigo de Marcuschi sobre anáfora indireta, no registro institucional de Cavalcante e na consulta técnica sobre `pois` conclusivo. A única edição foi em `referencias.md`: URLs acadêmicas ausentes, DOI/identificação, evidência das provas, data de revalidação e a lacuna explícita de proveniência histórica. O commit `9c2ee25645fd0ca94d510352117530b83429344b` foi relido na `main`. **Tamanho:** C/H/Q tiveram crescimento zero; somente R cresceu pela documentação de auditoria. Não houve mudança de identidade, rota, ordem, schema, corte ou composição do banco. O commit alheio `82c4543f5cdddac09fedbe20ed72c41f57caadc3`, de impressão de `abbr`, foi preservado sem sobreposição.

**U005 — inspeção contextual concluída:** o pacote físico local e o doador histórico foram lidos integralmente, com U004, U006 e U007 consultadas nas fronteiras necessárias. A proveniência está explicitamente preservada no próprio pacote: canônico `src/content/biblioteca/lingua-portuguesa/emprego-tempos-modos-verbais/`, blobs C `578fe599a64b3c39f8ff8de7bd7a530e777343c6`, H `06cf8e8a7dd16df9aef3b777bf5a571cdc0213ab`, R `db6e07d3b2303c8b80f06322d33140797dd5c791` e Q `df3d4c2d327cf04062c6c6edcd2fda4f59d6fb59`. Esses quatro blobs permanecem iguais na `main`; TCE-MA Analista Administração e TCE-MA Técnico Administrativo consomem o canônico por vínculos explícitos de ordem 5. A inspeção editou apenas o pacote físico PC-MA.

C/H separam tempo cronológico, tempo verbal, aspecto e modalidade; tratam perfeito/imperfeito, futuros, subjuntivo, correlação, imperativo, locuções e discurso relatado sem exigir leitura perfeita das unidades vizinhas. A fronteira com U007 foi preservada: estrutura da classe verbal, formas nominais, vozes e impessoalidade aparecem em U005 somente quando necessárias ao item 4.2. **C/H foram aceitos sem alteração**; não havia sigla renderizada sem expansão nem dívida de microglossário que justificasse crescimento.

As **20 questões** foram examinadas: 17 autorais locais + 3 adaptações herdadas, todas com cinco alternativas, gabarito único e explicação suficiente; `questionSetRevision: 5` foi preservado. O canônico tem 98 questões, mas os únicos IDs em comum são `q276`, `q277` e `q278`. No doador eles estão em revisão 1; no pacote local, revisão 2 porque enunciados e alternativas foram reescritos. As três provas e gabaritos FGV foram reconferidos textual e visualmente em 22/09/2026: Professor de Língua Portuguesa Tipo 4 q63 = **A**; TJSC Técnico Judiciário Auxiliar Tipo 1 q16 = **A**; Câmara dos Deputados Analista Legislativo — Contador Tipo 1 q4 = **C**. Nenhuma nova revisão ou resolução separada foi necessária.

A nomenclatura foi reconferida na Nomenclatura Gramatical Brasileira; os estudos dirigidos sobre perfeito, modos/conjunções, `ver` × `vir` e imperativo foram reconsultados. A única edição foi em `referencias.md`: data de revalidação, catálogos oficiais/edições das gramáticas de base, confirmação das provas e explicitação das fronteiras da cópia parcial. O commit `bc72f3cbb85a40a617fe81e2d01d6d4898022aeb` foi relido na `main`. **Tamanho:** C/H/Q tiveram crescimento zero; somente R cresceu pela documentação de auditoria. Identidade `pc-u005`, ordem 5, rota, schema, corte e composição do banco permaneceram iguais.

**U007 — inspeção contextual concluída:** o pacote físico local `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/verbo-como-classe-de-palavras/` e o doador canônico `src/content/biblioteca/lingua-portuguesa/verbo-como-classe-de-palavras/` foram lidos integralmente, com U005, U006 e U008 consultadas nas fronteiras. A proveniência registrada no pacote foi reconferida nos blobs doadores C `5ff3dd51b082d9ef3103e8506125ac97047bd058`, H `d9634f5e29ad0b8733e91bfb2ee60cf2188d28bf`, R `ed20f751913dff8ccfa9a2352bc216adf78d37d6` e Q `3031c7db63b2393658b47ffed2d60f974a397af2`, todos ainda idênticos na `main`. TCE-MA Analista Administração e TCE-MA Técnico Administrativo continuam consumidores explícitos do canônico por `vinculo.json`, ambos na ordem 7; o pacote PC-MA permanece físico/local e não mistura vínculo.

C ensina reconhecimento da classe verbal, estrutura da forma, formas nominais, regularidade, auxiliaridade, predicação mínima, vozes, valores de `se` e impessoalidade; H recupera o mesmo recorte sem introduzir fundamento novo. U005 conserva o aprofundamento de tempos e modos; U006, na identidade atual da `main`, cobre classes nominais; U008 cobre as invariáveis. **C/H foram aceitos sem alteração**, sem dívida de sigla renderizada ou microglossário que justificasse crescimento.

Q mantém **20 questões — 17 autorais locais + 3 adaptações herdadas**, cinco alternativas, IDs únicos, gabarito único e explicações suficientes; `questionSetRevision: 6` foi preservado. O canônico atual possui 119 questões — 71 autorais e 48 de provas anteriores/adaptações — e os únicos IDs compartilhados são `q384`, `q388` e `q399`. No doador, esses três estão em revisão 1; localmente permanecem em revisão 2 pela reescrita. As fontes primárias foram reconferidas em 22/09/2026: FGV Professor de Língua Portuguesa Tipo 1 q49 = **A**; Câmara dos Deputados Analista Legislativo — Técnica Legislativa Tipo 3 q13 = **B**; Polícia Civil do Piauí Oficial Investigador Tipo 2 q1 = **C**. Nenhuma nova revisão, questão ou resolução separada foi necessária.

A nomenclatura e as regras de apoio foram revalidadas na Nomenclatura Gramatical Brasileira, Michaelis, Priberam e Manual de Comunicação do Senado. A única edição foi `referencias.md`, em `25e29b293c90796034578cbafcdbc1b23c53b22b`, para registrar data, fontes primárias, contagens, revisões, proveniência e fronteiras. **Tamanho:** C/H/Q tiveram crescimento zero; somente R cresceu pela documentação. Identidade `pc-u007`, ordem 7, rota, schema, corte e composição do banco permaneceram iguais.

**U008 — inspeção contextual concluída:** o pacote físico local `classes-invariaveis-de-palavras` e o doador `src/content/biblioteca/lingua-portuguesa/classes-invariaveis-de-palavras/` foram relidos, preservando a classe **parcial/local**, identidade `pc-u008`, ordem 8, rota e consumidor PC-MA. C foi reorganizado por função e alcance da palavra/expressão; recuperou grau dos advérbios, palavras denotativas, comparação/proporção e a distinção entre `a fim de` + infinitivo e `a fim de que`, sem substituir as unidades de sintaxe. H recupera somente o ensinado. O doador e os dois consumidores TCE permaneceram somente leitura. C/H/R e dois autorais foram publicados e relidos na `main` em `1c8d9d6cb172e0e2687c3f04777fe1b0012fedcc`.

Q conserva **24 questões — 20 autorais + 4 adaptações**. `u008-a01` e `u008-a07` passaram à revisão 2 por delimitação do alvo; IDs, `origin`, gabaritos e composição foram preservados, com `questionSetRevision: 6`. As quatro fontes FGV foram reconferidas e as limitações de captura visual foram registradas no próprio `referencias.md`. Corte 13/07/2026 preservado; nenhuma inexistência de retificação foi inferida.

**U010 — inspeção contextual concluída:** pacote físico local `coordenacao-oracoes-termos`, identidade `pc-u010`, ordem 10, consumidor único PC-MA. A origem parcial foi resolvida em `src/content/biblioteca/lingua-portuguesa/coordenacao-oracoes-termos/`, blobs C `feab108b3f8b3f8b8fd25d71159bec2403a0771e`, H `ad2f18abaf3c6eb9b5970e091c6fe5b1c61df305`, R `a37fd26812a6167d71add71aad3680a0563b812e` e Q `deffc17e56e62be818cef3d50034f72b94ef1b2c`; TCE-MA Analista Administração e TCE-MA Técnico Administrativo continuam consumidores canônicos explícitos, ambos ordem 9, e permaneceram somente leitura.

C recebeu somente três pontes de compreensão: substituição do jargão “locução preposicionada” por explicação direta, definição de **correlação** antes de cobrá-la e identificação de `revisar o laudo` / `conferir os anexos` como orações reduzidas de infinitivo coordenadas, sem tratá-las como uma única locução verbal. A fronteira foi preservada: elipse/zeugma, anacoluto e pontuação aprofundada do doador ficam em U012/U018. C foi publicado em `f7d7671610e57bb984d0cca4bff27ca81e4f287b`; R, em `aa84886b359a8c957b6f30b03b6a7d6823509f5a`, com proveniência, consumidores, seleção do doador e revalidação das fontes em 23/09/2026.

H e Q foram aceitos **sem alteração**. Q mantém **24 questões — 20 autorais + 4 adaptações**, cinco alternativas, IDs únicos, gabarito único e `questionSetRevision: 5`; os quatro IDs herdados `q3350`, `q3355`, `q3356` e `q3358` permanecem em revisão 2 contra revisão 1 no canônico por serem adaptações não literais. Foram reconferidos os gabaritos originais: Assembleia Legislativa do Maranhão 2023 q2 = E; TCE-BA 2013 q3 = D; Companhia de Pesquisa de Recursos Minerais 2025 q47 = D; TCE-GO 2024 q13 = E. Capturas visuais do caderno ALEMA, dos documentos TCE-BA e do caderno TCE-GO falharam por cache; a extração textual confirmou os itens, e os gabaritos ALEMA/TCE-GO e o conjunto CPRM tiveram conferência visual. Não foi necessária resolução separada.

**Tamanho de U010:** C passou de 14.587 para 14.867 caracteres e de **2.004 para 2.046 palavras visíveis** na contagem lexical do corpo sem frontmatter/HTML; `abbr` permaneceu em 3 ocorrências. O ganho líquido de 42 palavras é de definição e fronteira, sem importar os aprofundamentos do canônico. H/Q cresceram zero.

**U011 — inspeção contextual concluída:** o pacote físico local `subordinacao-oracoes-termos` e o doador `src/content/biblioteca/lingua-portuguesa/subordinacao-oracoes-termos/` foram lidos integralmente. C passou a construir oração, período, núcleo/regente e matriz antes das classificações e tornou explícitas as diferenças entre oração desenvolvida/reduzida, infinitivo pessoal e leituras de `ao + infinitivo`; H foi condensado para recuperação. Identidade `pc-u011`, ordem 11, rota e consumidor físico foram preservados. C/H/R foram publicados e relidos na `main` em `6017fe32124653bd1d1ce2983344cce9d8e31ea8`; biblioteca e consumidores TCE não foram editados.

Q de U011 foi aceito **sem alteração**, com 24 questões (21 autorais + 3 adaptações), cinco alternativas por item, gabarito único, `questionSetRevision: 5`, autorais em revisão 3 e adaptações em revisão 2. As fontes FGV de Vitória 2024, Serviço Geológico do Brasil 2025 e Assembleia Legislativa do Maranhão 2023 foram revalidadas; no Serviço Geológico, a conferência foi textual e a tentativa de captura visual falhou, limitação registrada em `referencias.md`. Não foi necessária resolução separada.

**U012 — inspeção contextual concluída:** pacote físico local `pontuacao`, identidade `pc-u012`, ordem 12 e consumidor único PC-MA. A origem parcial foi resolvida no canônico `src/content/biblioteca/lingua-portuguesa/pontuacao/`, blobs atuais C `935085006f35448ed85b24c58cbc83359ea2b891`, H `6eae0abeefe155637b6c65451771612f749a941d`, R `ff3d841ffe1be16a75ac36e25bec11c694d2db8b` e Q `a2b053a3a158587dcfc6438f43c18db095079c69`; TCE-MA Analista Administração e TCE-MA Técnico Administrativo continuam consumidores canônicos explícitos, ambos ordem 11, e permaneceram somente leitura. O `referencias.md` local trazia hashes antigos de H/R do doador; a proveniência foi corrigida sem alterar a origem canônica.

C recuperou três armadilhas curtas do doador sem importar seu aprofundamento em bloco: ponto de abreviatura e variação editorial da vírgula antes de `etc.`; travessão no discurso direto; e pergunta indireta inserida em pergunta direta maior. H recebeu apenas as duas recuperações de revisão sobre `etc.` e pergunta maior. C foi publicado em `ec70b9856a1bffa760ef8c2293a61cca4a08ab5c`; H chegou ao blob final em `ac9254a011e61bb48c2d7fdde1ba8c26e6b2734a`; R foi revalidado em `6b331bb0e5c3ceb314663800e1eb65c3be9713ca`.

Q foi aceito **sem alteração**: 24 questões, **21 autorais + 3 adaptações**, cinco alternativas, IDs únicos, gabarito único e `questionSetRevision: 5`; as 21 autorais permanecem na revisão 3 e as adaptações `q3476`, `q3484` e `q3485` na revisão 2. As três fontes primárias foram reconferidas em 23/09/2026: Ministério da Cultura/FGV 2024, Tipo 2, q1 = C; TCE-SP 2023, Agente da Fiscalização TI Tipo 1, q10 = D; TJAP 2024, Técnico Judiciário Área Judiciária/Administrativa Tipo 4, q9 = E. Houve conferência textual de todos; o caderno TCE-SP e os gabaritos TCE-SP/TJAP tiveram captura visual bem-sucedida, enquanto as capturas dos cadernos MinC/TJAP falharam por cache, limitação registrada em R. Não foi necessária resolução separada.

**Tamanho de U012:** C passou de 13.489 para 14.398 caracteres e de **1.844 para 1.962 palavras visíveis** (+118); H passou de 4.106 para 4.389 caracteres e de **488 para 519 palavras visíveis** (+31). C ganhou duas ocorrências renderizadas de `abbr` para `etc.`; H, uma. O crescimento ficou restrito às três lacunas de alta incidência e à recuperação curta correspondente, sem incorporar tabelas ou banco doador.

**U013 — inspeção contextual concluída:** pacote físico local `concordancia-verbal-nominal`, identidade `pc-u013`, ordem 13 e consumidor único PC-MA. A origem parcial foi resolvida no canônico `src/content/biblioteca/lingua-portuguesa/concordancia-verbal-nominal/`, blobs atuais C `9a522e0f4de63fdb5aa4842b0fc8795a7674f99a`, H `453fb4eb9df3a6717a4f4b6adb3b2b0dfa6b9848`, R `d9f96b27da0a6d9cfa8d5ccb152e19f2e5924a4b` e Q `25c832848d44c7f90d9e0ea7b38db04bcf1fa32f`. TCE-MA Analista Administração e TCE-MA Técnico Administrativo continuam consumidores canônicos explícitos, ambos ordem 12, e permaneceram somente leitura. O `referencias.md` local trazia hashes antigos de H/R do doador; a proveniência foi corrigida.

C recuperou somente três variantes de alta incidência que evitavam regras rígidas: com `quem` e antecedente pessoal expresso, a terceira pessoa do singular e a concordância com o antecedente são admitidas; em `um dos que`, o plural é a solução preferencial em redação formal; e percentuais com especificador/determinante exigem leitura da estrutura, com a preferência editorial do Senado explicitada sem transformá-la em regra universal. H recebeu a recuperação correspondente. C foi publicado em `9e9ff3bba1d5567042dd82b46c4977ce5571f09e`; H, em `44c4ad90412268e9f643292401ebc8185907ca06`; R chegou ao blob final em `cd99fe4bbea0f48d2a50f2f4ae5e45c64f96bc0d`.

Q foi aceito **sem alteração**: 24 questões, **21 autorais + 3 adaptações**, cinco alternativas, IDs únicos, gabarito único e `questionSetRevision: 6`; as autorais permanecem em revisão 1 e as adaptações `q3539`, `q3540` e `q3543` em revisões 2, 3 e 2. As três fontes primárias foram reconferidas em 23/09/2026: EBSERH/FGV 2025, Técnico em Radiologia/Radioterapia Tipo 1, q7 = C; SEEC/RN 2025, Professor de Língua Portuguesa Tipo 1, q8 = B; Câmara dos Deputados 2023, Técnico em Material e Patrimônio Tipo 1, q2 = A. EBSERH e SEEC/RN tiveram caderno e gabarito conferidos textual e visualmente; na Câmara, a extração textual confirmou o item e o gabarito teve conferência visual, mas a captura visual da página do caderno falhou por cache. Não foi necessária resolução separada.

**Tamanho de U013:** C passou de 12.369 para 13.504 caracteres e de **1.658 para 1.823 palavras visíveis** (+165); H passou de 3.292 para 3.627 caracteres e de **383 para 426 palavras visíveis** (+43). C/H não ganharam novas ocorrências de `abbr`; R passou a marcar as siglas institucionais alteradas. O crescimento ficou restrito às três nuances recuperadas e às pontes necessárias para não induzir regra absoluta.

**U014 — inspeção contextual concluída:** pacote físico local `regencia-verbal-nominal`, identidade `pc-u014`, ordem 14 e consumidor único PC-MA. A origem parcial foi resolvida no canônico `src/content/biblioteca/lingua-portuguesa/regencia-verbal-nominal/`, blobs atuais C `a5efc67070fd7767f67cd900742ca9c280038dc1`, H `5e0d4dc9eda4a734cd51d3bd71364a2eb0202f14`, R `5fb9ad508b2253aad89cb436b83f4dbccff06c9a` e Q `65d9b5e5194f0d2fdd6d01029f5727965902af7a`. TCE-MA Analista Administração e TCE-MA Técnico Administrativo continuam consumidores canônicos explícitos, ambos ordem 13, e permaneceram somente leitura.

C recuperou somente duas lacunas com ganho proporcional: `chamar` no contraste entre convocar e atribuir nome/qualidade e o padrão conservador de destino/origem em `ir a/para`, `chegar a` e `voltar a/para/de`, antes do uso de `onde/aonde`. H recebeu a recuperação correspondente. C foi publicado em `a2ca7a2a94a1986982bb0d0b6f44f8c340f825ad`; H, em `05dfd78676a5d0d72d78e382ebe8ba90294f4b11`; R foi revalidado em `88246305b1dc48c1dc427859c933b22cfe650eef`, com proveniência atual e seleção do banco.

Q foi aceito **sem alteração**: 24 questões, **21 autorais + 3 adaptações**, cinco alternativas, IDs únicos, gabarito único e `questionSetRevision: 5`. Apenas `q3519`, `q3520` e `q3523` compartilham ID com o canônico; no doador estão em revisão 1 e localmente em revisão 2 pelas adaptações já publicadas. As fontes oficiais foram reconferidas em 23/09/2026: ALEGO/FGV 2026, Analista Administrativo Tipo 1, q4 = E; Canaã dos Carajás/FGV 2025, Professor de Língua Portuguesa Tipo 1, q44 = A; TCE-SP/FGV 2023, Auxiliar Técnico da Fiscalização TI Tipo 2, q8 = A. ALEGO e Canaã tiveram caderno/gabarito conferidos textual e visualmente; TCE-SP teve caderno conferido textual e visualmente e gabarito confirmado por extração textual, com falha de cache na captura visual. Não foi necessária resolução separada.

**Tamanho de U014:** C passou de 10.537 para 11.074 caracteres e de **1.365 para 1.444 palavras visíveis** (+79); H passou de 2.861 para 3.104 caracteres e de **358 para 392 palavras visíveis** (+34). C/H não ganharam novas ocorrências de `abbr`; R passou a registrar consumidores, blobs canônicos e microglossário institucional. O crescimento ficou restrito às duas pontes recuperadas.

**U015 — inspeção contextual concluída:** pacote físico local `crase`, identidade `pc-u015`, ordem 15 e consumidor único PC-MA. A origem parcial foi resolvida no canônico `src/content/biblioteca/lingua-portuguesa/crase/`, blobs atuais C `01474678465e8139d2984c130e8af23285f7c93f`, H `d0d7508f8af94e2cd58632f4f6de9ceaf5fc4ba2`, R `c66889720990314b590d7f9f930dc2b5211ab02d` e Q `49ab162c4f281d73380d003b079421d872398701`. TCE-MA Analista Administração e TCE-MA Técnico Administrativo continuam consumidores canônicos explícitos, ambos ordem 14, e permaneceram somente leitura.

C recuperou somente duas lacunas curtas do canônico: a diferença entre `a qual` como relativo composto e `a qual` interrogativo — sem artigo e, portanto, sem crase automática — e o contraste entre hora marcada e `a uma hora qualquer`, em que `uma` é artigo indefinido. H recebeu a recuperação correspondente. C foi publicado em `39737c4cd0e39a7aa9401c8b14414725d60809dd`; H, em `edaeb7444724604c0a977b378aef76b1ad76ccfb`; R foi revalidado em `9e002427d103864047df5169b4b1266fcdde6e98`, com proveniência atual, consumidores e seleção do banco.

Q foi aceito **sem alteração**: 24 questões, **21 autorais + 3 adaptações**, cinco alternativas, IDs únicos, gabarito único e `questionSetRevision: 5`. Apenas `q3659`, `q3660` e `q3667` compartilham ID com o canônico; localmente permanecem em revisão 2, enquanto no doador estão em revisões 1, 1 e 2. As fontes oficiais foram reconferidas em 24/09/2026: Canaã dos Carajás/FGV 2025, Professor de Língua Portuguesa Tipo 1, q51 = C; ALEGO/FGV 2026, Analista Administrativo Tipo 1, q7 = A; ALEMA/FGV 2013, Técnico Revisor Tipo 1, q48 = C. Canaã e ALEGO tiveram caderno e gabarito conferidos textual e visualmente; ALEMA teve caderno conferido textual e visualmente e gabarito confirmado por extração textual, com falha de cache na captura visual. A numeração local q48 preserva a correção já documentada contra a antiga indicação canônica q47. Não foi necessária resolução separada.

**Tamanho de U015:** C passou de 11.167 para 11.634 caracteres e de **1.577 para 1.654 palavras visíveis** (+77); H passou de 2.862 para 3.016 caracteres e de **400 para 421 palavras visíveis** (+21). C/H não ganharam novas ocorrências de `abbr`; R passou a registrar proveniência, consumidores, seleção 24 locais × 151 canônicas e a revalidação atual. O crescimento ficou restrito às duas lacunas recuperadas.

**U016 — inspeção contextual concluída:** item 20.2.2, Língua Portuguesa 5.8; pacote físico/local `colocacao-pronominal`, `pc-u016`, ordem 16, consumidor PC-MA. Os quatro arquivos e o conteúdo vizinho de crase, significação/substituição e reorganização foram conferidos. O doador parcial canônico `src/content/biblioteca/lingua-portuguesa/colocacao-pronominal/` tem dois consumidores explícitos do TCE-MA, ambos ordem 15; foi somente leitura. A aula constrói agora a diferença tônico/átono antes de exigir a terminologia e completa os casos de indefinidos, demonstrativos, pares alternativos, pronome pessoal sujeito com futuro, variação do infinitivo sob negativa e `-mos + nos`. H recupera essas distinções sem criar fundamento independente; o recorte permanece separado de regência, funções de `se` e reescrita sistemática. C foi confirmado em `3e364ed6823b719c9e07b44e515aecf63adcd8f8`; H, em `a0d34f4c134de6389474633ea5c95fb491a3a92a`; R/proveniência, em `a2f0ccb77c043ad108a4a347828beaa6567fc36b`. Cada arquivo foi relido na `main` após publicação.

Q permaneceu **sem alteração**: 24 questões, 21 autorais + 3 adaptações, todas com cinco alternativas, IDs únicos, gabarito único e explicações confrontadas com o recorte; `questionSetRevision: 5`. As três fontes anteriores foram reconferidas em 24/09/2026 nos cadernos e gabaritos definitivos oficiais: FGV/EBSERH Técnico em Farmácia Tipo 1, q8 = B; FGV/Nova Iguaçu Auditor Fiscal Tipo 1, q2 = D; Cebraspe/TCE-MS Auditor Tecnologia da Informação CG4, q12 = C. Não se exigiu resolução separada. Fontes materiais oficiais e primárias (edital, FUNAG, justificativa de Escrivão da Polícia Federal, Acordo Ortográfico) foram reconsultadas sem alterar o corte do edital. C cresceu de 1.787 para 1.982 palavras visíveis (+195) e de 12.242 para 13.486 caracteres; H de 415 para 467 palavras visíveis (+52) e de 3.200 para 3.564 caracteres. Cada um ganhou uma ocorrência de `abbr` institucional, com expansão contextual; as demais pontes são texto visível. O ganho cobre pré-requisito e exceções efetivamente cobradas, sem importar o banco de 151 questões ou o aprofundamento alheio.

**U017 — inspeção contextual concluída:** item 20.2.2, Língua Portuguesa 6.1/6.2; pacote físico/local `significacao-substituicao-lexical`, `pc-u017`, ordem 17, consumidor PC-MA. C, H, R e as 24 questões foram lidos; os conteúdos de U016 e U018 delimitaram as fronteiras. O canônico doador `src/content/biblioteca/lingua-portuguesa/significacao-substituicao-lexical/`, compartilhado explicitamente pelos dois cargos do TCE-MA, ambos ordem 16, permaneceu somente leitura. C recuperou contrastes de denotação/figura, posição do adjetivo, parte/todo, `nem todos` versus `nenhum`, limites numéricos, expressões inteiras e relação de conectores; o exemplo do art. 53 foi delimitado como federal, sem imputar sua aplicação ao Maranhão. H recupera apenas o ensinado. C foi confirmado em `d06ef75d651e895cd2c5c328b90a9dc574318e3d`; H em `7a6eaf7d839911859aac9e6b02421587077dc3fd`; R/proveniência em `031dd4c52189f09882e5a570242536ca137f2f56`.

Q ficou **sem alteração**: 24 questões (21 autorais + 3 adaptações), IDs únicos, cinco alternativas, gabarito único, explicações pertinentes e `questionSetRevision: 5`. Cadernos/gabaritos definitivos oficiais reconferidos em 24/09/2026: FGV/Canaã dos Carajás, Agente de Serviços de Culinária Tipo 1, q8 = C e q9 = A; FGV/PC-RJ, Investigador Tipo 1, q23 = C. Os 24 IDs locais remontam ao banco canônico de 179 questões com versões locais próprias; não se alteraram enunciados, opções ou revisões. Fontes acadêmicas primárias e a Lei federal nº 9.784/1999 foram reconsultadas; nenhuma resolução separada foi necessária. C passou de 1.769 para 1.967 palavras visíveis (+198) e de 13.494 para 14.758 caracteres; H passou de 290 para 350 palavras visíveis (+60) e de 3.040 para 3.438 caracteres. Cada um ganhou uma ocorrência de `abbr` para `art.`; as adições visíveis completam os contrastes do item 6.2 sem absorver U018/U019.

**U018 — inspeção contextual concluída:** item 20.2.2, Língua Portuguesa 6/6.3; pacote físico/local `reorganizacao-oracoes-periodos`, `pc-u018`, ordem 18, consumidor PC-MA. C, H, R e 24 questões foram examinados com U017/U019 como fronteiras. O canônico doador `src/content/biblioteca/lingua-portuguesa/reorganizacao-oracoes-periodos/`, consumido por vínculos explícitos dos cargos TCE-MA Analista Administração e Técnico Administrativa, ambos ordem 17, permaneceu somente leitura. A seleção local conserva deslocamento/escopo, união/divisão, reduzidas/desenvolvidas, vozes, `se`, nominalização, elipse e referência; os tópicos autônomos de pontuação, regência e formalidade permanecem nas unidades próprias. C e H bastaram sem alteração; suas palavras visíveis, marcação e microdescrições tiveram crescimento zero. R trocou o endereço do Manual de Redação que redirecionava à autenticação por PDF no domínio oficial da Presidência, em `d33111335e512406a3a2c510e78a63e33c8ba64e`. Q local contém 24 IDs do banco de 87 questões do doador, 21 autorais e 3 adaptações; `q3709` tinha distratores condicionados a um contexto que o próprio enunciado excluía. Os distratores agora só coordenam os dois fatos; a única alternativa que acrescenta causa continua D. Revisão individual 3 → 4; `questionSetRevision: 5`, composição, ID e gabarito preservados, em `c5cd738286eca67483667c481e9ad449c9775310`. Provas/gabaritos definitivos oficiais da FGV reconferidos em 24/09/2026: TCE-GO Controle Externo Tipo 1 q2 B e q5 E, Receita Federal Auditor-Fiscal Tipo 4 q9 D. Não foi necessária resolução separada. Blobs locais finais C `350331463f0b2aeba7201162abe7e721cef0e498`, H `b958d73877c1dee214136340fdccfbca2ecd66d1`, R `fe2604615de2fe934bd3ace934344bc29355c2c6`, Q `e54e5bfb97e79bb090f1cb151485cbe894f06af7`.

**U019 — inspeção contextual concluída:** item 20.2.2, Língua Portuguesa 6.4; pacote físico/local `reescrita-generos-formalidade`, `pc-u019`, ordem 19, consumidor PC-MA. C, H, R e 24 questões foram examinados; U018 e U020 delimitam a fronteira entre transformação estrutural, adequação de gênero/registro e redação oficial. O canônico doador `src/content/biblioteca/lingua-portuguesa/reescrita-generos-formalidade/`, consumido por vínculos explícitos dos dois cargos TCE-MA, ambos ordem 18, permaneceu somente leitura. C foi ajustado em `e2acc605d0440f7723012f6c19363803a89fed20`: a instrução derivada de 'depende de identificação' deixou de exigir documento que não constava do texto-base, e o pedido formal continuou pergunta, sem virar ordem. H recupera os mesmos critérios sem alteração. R substituiu o endereço do Manual federal que redirecionava à autenticação por PDF no domínio oficial da Presidência, em `926c2758096d27b5ce7a519d6204cf0ba4ecb05d`. Q ficou sem alteração: 24 questões, 21 autorais + 3 adaptações, IDs únicos, cinco alternativas, gabarito único, `questionSetRevision: 5`; os 24 IDs integram banco canônico de 90 questões, com versões próprias no pacote local. Provas/gabaritos oficiais FGV reconferidos em 24/09/2026: SME-SP Professor de Educação Infantil e Ensino Fundamental I Tipo 1 q4 E/q5 A; SEMSA Manaus AS Programador de Computador Tipo 1 q7 B. Fontes Ceale/UFMG sobre gênero, retextualização e variação reconsultadas; nenhuma resolução separada necessária. Blobs locais finais C `e9b6354ab413886e69c88f82cd82c1e2afc72f6c`, H `ee6f0dd3390f00710faaef9d92f8471013e6bf6d`, R `ab679a0850e686375f822ff8f1f78f99fdd98b80`, Q `ee12c77cc01463dcf8be6d403bd4bbb7a3491040`. C cresceu 106 caracteres no arquivo (incluindo marcação); H teve crescimento zero, sem confundir caracteres com palavras visíveis.

**U020 — inspeção contextual concluída:** item 20.2.2, Língua Portuguesa 7/7.1/7.3; pacote físico novo/local `redacao-oficial-linguagem`, `pc-u020`, ordem 20, consumidor PC-MA, sem `vinculo.json`. C, H, R e 18 questões foram lidos; U019/U021 delimitam adaptação geral de gênero, atributos da linguagem oficial e formatos de expedientes. A classificação nova da PC-R02 foi conservada; a busca registrada em R e a pesquisa de `redacao-oficial-linguagem` na `main` não localizaram doador canônico ou outro consumidor físico equivalente, sem transformar ausência de resultado em prova universal. C corrigiu dois exemplos em `b40db0bce04738102ea623ba53a579534ee8707c`: data precisa só pode substituir 'em breve' se já houver dado disponível, e a versão concisa deve manter o estado 'ainda não solucionadas' das pendências. H permaneceu intacta. R trocou cópia do Manual em sistema externo inacessível para endereço no domínio oficial da Presidência em `b10b0a900709cc44603eb3ad79cd448210454fcf`; serviço federal e Portaria nº 1.369/2018 confirmam a edição, sem extensão automática do âmbito federal ao estado. Q conservou 18 IDs, 15 autorais + 3 adaptações, cinco alternativas e gabaritos. `u020-a06` substituiu 'setor' por 'unidade' para eliminar concorrência de antecedente masculino com 'relatório'; revisão individual 1 → 2 e explicação ajustada em `5ab2bc0f7728c66e9fd01ca8ab4236e8505e9754`; `questionSetRevision: 1`, composição e gabarito preservados. Caderno/gabarito oficial Cebraspe PF 2025 item 12 E; FGV ALE-RO Relações Públicas Tipo 1 2026 q69 E; matriz oficial Cebraspe PC-PE 2023 q32 B reconferidos em 24/09/2026. Nenhuma resolução separada foi necessária. Blobs locais C `c86c397ec9076151434e73c3bf4fd0f08dc937ee`, H `828eb6aee56a5a0957a77b6354b612a30752bb1b`, R `ba11bba35b8af4e8df4f85b2b58958d50eac740e`, Q `d2776288d62dadcf7912f0d4f89d1fbade9bb095`.

**U021 — inspeção contextual concluída:** item 20.2.2, Língua Portuguesa 7/7.2/7.4; pacote físico novo/local `expedientes-oficiais-formatos`, `pc-u021`, ordem 21, consumidor PC-MA, sem `vinculo.json`. C, H, R e 18 questões foram lidos com U020 como pré-requisito/fronteira. A classificação nova da PC-R02 foi conservada; a busca e a proveniência registrada em R não localizam doador canônico ou consumidor equivalente, sem tratar busca negativa como certificação universal. C/H permaneceram intactos: finalidade, padrão ofício, Exposição de Motivos, Mensagem, e-mail e diferença entre Manual de 2018 e Decreto federal nº 9.758/2019 são ensinados e recuperados. R trocou URL de cópia em AVA externo indisponível pelo PDF no domínio da Presidência em `9e3746e8f40518ce129db3018aa266f14ef22e52`; Portaria nº 1.369/2018, Decreto atual e matrizes oficiais foram reconsultados. Q conservou 18 IDs, 15 autorais + 3 adaptações, cinco alternativas, gabaritos e `questionSetRevision: 1`. Os prompts de `u021-p01`/`p02`/`p03` agora perguntam diretamente pelo conteúdo estudado, sem aludir à própria adaptação nem pedir resposta 'segundo o gabarito de origem'; revisões individuais 1 → 2 em `816f506514d877dcd41a16be6e751e6514c8b3a8`. Matriz Cebraspe PC-PE 2023 q30 E/q31 E e matriz CAESB 2024 q70 C reconferidas em 24/09/2026. Nenhuma resolução separada necessária. Blobs locais finais C `097e1f26691d217df865da7c66ebd8e5af4c85eb`, H `d40300370d36237fab442b414b6e7e382ab9644e`, R `86be09a763d00ce8c8c9091b8ed8c92622f8ea7f`, Q `ff57aa50869c8c6122d8d86d71c3d4f222c3f76c`; crescimento de C/H e microdescrições: zero.

**Divergências preservadas:** (1) a linha herdada deste arquivo associa U006 a `estrutura-morfossintatica-periodo`, enquanto a `main` atual resolve `pc-u006`/ordem 6 para `classes-nominais-de-palavras`; U006 segue pulada. (2) A `main` resolve `estrutura-morfossintatica-periodo` como `pc-u009`, ordem 9, mas PC-R02 herdado a classifica como parcial e o `referencias.md` local a declara nova/local, sem doador equivalente localizado. A identidade atual de U009 está confirmada, mas a classificação não foi normalizada por inferência; U009 segue pulada até reconciliação autorizada.

**Restante de PC-F02:** U001–U005, U007, U008, U010–U021 e U026 somam **vinte pacotes locais** com inspeções contextuais documentadas; permanecem **121 pacotes locais e 17 origens canônicas** sem essa certificação final registrada. A referência corrigida de U035 não constitui inspeção integral do canônico. A triagem não permite aceite por lote de referências, Markdown, microglossário, atribuições, gabaritos ou suficiência das explicações. **Próximo recorte elegível: U022 — primeiro pacote local de Informática.** Preservar as intervenções publicadas e só encerrar PC-F02 após inspecionar seu escopo completo. A reserva de U021 pode ser encerrada após a sincronização do painel; o e-mail é opcional.

## 5. Reaproveitamento e indexação das 158 unidades

Classificação PC-R02 preservada, sem nova auditoria de compatibilidade por esta migração:

| Classe | Quantidade | Unidades |
|---|---:|---|
| Integral | 17 | U029; U035–U041; U063–U067; U069–U071; U073 |
| Parcial | 42 | U001–U005; U007–U019; U023–U024; U026–U027; U030; U032–U033; U042; U056–U062; U068; U072; U074–U077; U101; U142; U144 |
| Nova | 99 | U006; U020–U022; U025; U028; U031; U034; U043–U055; U078–U100; U102–U141; U143; U145–U158 |

Os conjuntos acima, os blocos da seção 4 e os conjuntos de estado da seção 2 identificam **todas as 158 unidades**. Não equivalem, porém, à matriz individual completa de programa/título/origem/SHA: o detalhamento ausente é explicitado, não restaurado por suposição.

Integral: vincular canônico compatível, ou copiar origem física local com proveniência, identidade e metadados. Parcial: copiar somente trechos/exercícios pertinentes, completar lacunas localmente e registrar diferenças. Nova: produzir com fontes verificáveis. Antes de copiar, consultar biblioteca e acervos publicados de TCE/SEAP/Perícia, lendo integralmente o material doador e resolvendo consumidores.

Unidade real não é aparição: resolver `vinculo.json` até `src/content/biblioteca/`, nunca inferir compartilhamento por título/slug. Editar o canônico uma vez para todos os consumidores compatíveis. Não misturar arquivos físicos e vínculo, criar overlays, vínculos incompatíveis ou migrar trabalho alheio.

### Convenções da matriz

Prefixo físico PC-MA: `src/content/assuntos/pc-ma-2026-oficial-investigador/`.

Para as unidades com identidade explicitamente registrada nas tabelas seguintes, `pc-uNNN` é o `storageId`, NNN sem zeros iniciais é a ordem, e o slug é o segmento final do destino. Não estender essa convenção a registros antigos sem verificar a identidade publicada. A rota de assunto é `/concursos/pc-ma-2026-oficial-investigador/<slug>/`; os grupos não fazem parte dela.

Consumidor comum dos registros físicos abaixo: `pc-ma-2026-oficial-investigador`, identidade de concurso `pcma-2026-invest`. Corte programático/legislativo registrado: 13/7/2026, ressalvado o tratamento próprio de Atualidades e de jurisprudência.

O formato completo a manter quando cada linha for trabalhada é: **item/subitem → ID/título/recorte → origem/SHA → slug/destino/identidade/ordem → classe → aproveitamento/lacunas/fronteiras → consumidores/corte/dependências → estado/evidência**. Não substituir informação faltante por frase que remeta a uma versão passada da issue.

### Registros anteriores sem detalhamento integral no corpo recebido

| Unidades | Informação disponível | Estado recebido / limite da migração |
|---|---|---|
| U001 | Língua Portuguesa; parcial/local; `leitura-interpretacao-tipos-generos` | C/H/Q done; matriz, origem histórica e evidência individual materializadas na inspeção de PC-F02; ver seções 6 e 8 |
| U002 | Língua Portuguesa; parcial/local; `tipos-generos-textuais` | C/H/Q done; matriz, origem histórica e evidência individual materializadas na inspeção de PC-F02; ver seções 6 e 8 |
| U003 | Língua Portuguesa; parcial/local; `ortografia-oficial` | C/H/Q done; matriz, origem histórica e evidência individual materializadas na inspeção de PC-F02; ver seções 6 e 8 |
| U004 | Língua Portuguesa; parcial/local; `coesao-textual` | C/H/Q done; matriz e evidência individual materializadas na inspeção de PC-F02; doador histórico específico não recuperado, candidato canônico comparativo explicitado; ver seções 6 e 8 |
| U005 | Língua Portuguesa; parcial/local; `emprego-tempos-modos-verbais` | C/H/Q done; proveniência histórica, matriz e evidência individual materializadas na inspeção de PC-F02; ver seções 6 e 8 |
| U007 | Língua Portuguesa; parcial/local; `verbo-como-classe-de-palavras` | C/H/Q done; proveniência histórica, matriz e evidência individual materializadas na inspeção de PC-F02; ver seções 6 e 8 |
| U008 | Língua Portuguesa; parcial/local; `classes-invariaveis-de-palavras` | C/H/Q done; identidade, proveniência e inspeção contextual materializadas; publicação `1c8d9d6cb172e0e2687c3f04777fe1b0012fedcc`; ver seções 4, 6 e 8 |
| U009 | Língua Portuguesa; `estrutura-morfossintatica-periodo`; identidade `pc-u009`, ordem 9 | C/H/Q done; **classe divergente**: PC-R02 herdado = parcial, `referencias.md` local = nova/local sem doador equivalente localizado. Pular em PC-F02 até reconciliação, sem inferir classe |
| U010 | Língua Portuguesa; parcial/local; `coordenacao-oracoes-termos`; identidade `pc-u010`, ordem 10 | C/H/Q done; proveniência parcial, consumidores, seleção do doador e inspeção contextual materializados; C `f7d7671610e57bb984d0cca4bff27ca81e4f287b`, R `aa84886b359a8c957b6f30b03b6a7d6823509f5a`; H/Q sem mudança; ver seções 4, 6 e 8 |
| U011 | Língua Portuguesa; parcial/local; `subordinacao-oracoes-termos` | C/H/Q done; identidade, proveniência, recorte 5.3 e inspeção contextual materializados; publicação `6017fe32124653bd1d1ce2983344cce9d8e31ea8`; ver seções 4, 6 e 8 |
| U012 | Língua Portuguesa; parcial/local; `pontuacao`; identidade `pc-u012`, ordem 12 | C/H/Q done; proveniência parcial, consumidores, correção dos blobs doadores e inspeção contextual materializados; C `ec70b9856a1bffa760ef8c2293a61cca4a08ab5c`, H final `ac9254a011e61bb48c2d7fdde1ba8c26e6b2734a`, R `6b331bb0e5c3ceb314663800e1eb65c3be9713ca`; Q sem mudança; ver seções 4, 6 e 8 |
| U013 | Língua Portuguesa; parcial/local; `concordancia-verbal-nominal`; identidade `pc-u013`, ordem 13 | C/H/Q done; proveniência parcial, consumidores, correção dos blobs doadores e inspeção contextual materializados; C `9e9ff3bba1d5567042dd82b46c4977ce5571f09e`, H `44c4ad90412268e9f643292401ebc8185907ca06`, R final `cd99fe4bbea0f48d2a50f2f4ae5e45c64f96bc0d`; Q sem mudança; ver seções 4, 6 e 8 |
| U014 | Língua Portuguesa; parcial/local; `regencia-verbal-nominal`; identidade `pc-u014`, ordem 14 | C/H/Q done; proveniência parcial, consumidores e inspeção contextual materializados; C `a2ca7a2a94a1986982bb0d0b6f44f8c340f825ad`, H `05dfd78676a5d0d72d78e382ebe8ba90294f4b11`, R `88246305b1dc48c1dc427859c933b22cfe650eef`; Q sem mudança; ver seções 4, 6 e 8 |
| U015 | Língua Portuguesa; parcial/local; `crase`; identidade `pc-u015`, ordem 15 | C/H/Q done; proveniência parcial, consumidores e inspeção contextual materializados; C `39737c4cd0e39a7aa9401c8b14414725d60809dd`, H `edaeb7444724604c0a977b378aef76b1ad76ccfb`, R `9e002427d103864047df5169b4b1266fcdde6e98`; Q sem mudança; ver seções 4, 6 e 8 |
| U016 | Língua Portuguesa, 5.8; `colocacao-pronominal`; parcial/local; `pc-u016`, ordem 16 | C/H/Q done; proveniência e inspeção contextual materializadas; ver seções 4, 6 e 8 |
| U017 | Língua Portuguesa, 6.1/6.2; `significacao-substituicao-lexical`; parcial/local; `pc-u017`, ordem 17 | C/H/Q done; proveniência e inspeção contextual materializadas; ver seções 4, 6 e 8 |
| U018 | Língua Portuguesa, 6/6.3; `reorganizacao-oracoes-periodos`; parcial/local; `pc-u018`, ordem 18 | C/H/Q done; proveniência e inspeção contextual materializadas; ver seções 4, 6 e 8 |
| U019 | Língua Portuguesa, 6/6.4; `reescrita-generos-formalidade`; parcial/local; `pc-u019`, ordem 19 | C/H/Q done; proveniência e inspeção contextual materializadas; ver seções 4, 6 e 8 |
| U006 | Língua Portuguesa, item 5; `estrutura-morfossintatica-periodo` | C/H/Q done, aceite sem mudança; token PC-E01-U006-20260916-01; caminho/SHA completos não individualizados no registro recebido |
| U020 | Língua Portuguesa, itens 7/7.1/7.3; `redacao-oficial-linguagem`; nova/local; `pc-u020`, ordem 20 | C/H/Q done; inspeção contextual materializada; correções C/R/Q em PC-F02 sem reabrir aceite PC-E01; ver seções 4, 6 e 8 |
| U021 | Língua Portuguesa, itens 7.2/7.4; `expedientes-oficiais-formatos`; nova/local; `pc-u021`, ordem 21 | C/H/Q done; inspeção contextual materializada; R/Q ajustados em PC-F02 sem reabrir PC-E01; ver seções 4, 6 e 8 |
| U023–U024; U026–U027; U030; U032–U033 | Informática; parciais | C/H/Q done; detalhes individuais antigos não materializados |
| U029 | Informática; integral | C/H/Q done; resolver vínculo publicado antes de qualquer edição |
| U035–U041 | Raciocínio Lógico; integrais | C/H/Q done; resolver vínculos, não deduzir origens por título |
| U042 | Raciocínio Lógico; parcial | C/H/Q done; detalhes antigos não individualizados |
| U056; U059–U061 | Administração; parciais | C/H/Q done; U059 trata SIDOR/SIAFI, U060 receita e U061 despesa/execução conforme fronteiras registradas |
| U062; U068 | História do Maranhão; parciais | C/H/Q done; detalhes individuais antigos não materializados |
| U063–U067 | História do Maranhão; integrais | C/H/Q done; resolver vínculos publicados |
| U069–U071; U073 | Geografia do Maranhão; integrais | C/H/Q done; resolver vínculos publicados |
| U072; U074; U076–U077 | Geografia do Maranhão; parciais | C/H/Q done; preservar origens/identidades da main, não recriá-las |
| U075 | Geografia do Maranhão; parcial; `agricultura-pecuaria-extrativismo` | C/H/Q done; publicação original `c1e00edc44afebf5cf73c783ace20fd7a69e1b75`; proveniência reconciliada em `d54f46305e09214e67a46ac4ff4e76ec18b7b278` |
| U098–U100; U102–U111 | Direito Administrativo; novas | C/H/Q pending; recortes individuais ausentes no corpo recebido |
| U101 | Direito Administrativo; parcial | C/H/Q done; aceite recebido sem detalhamento antigo suficiente neste corpo |
| U112–U122 | Direito Constitucional; novas | C/H/Q done; planejamento individual materializado em 20/09/2026 sob `PC-E13-PLANEJAMENTO-20260920T0843-01`; evidências individuais na seção 8 |
| U123–U141 | Legislação Especial; novas | C/H/Q done; planejamento individual materializado em 20/09/2026 sob `PC-E14-PLANEJAMENTO-20260920T1155-01`; ver seção 7 |
| U142 | Direitos Humanos; parcial; `teoria-geral-direitos-humanos` | C/H/Q done; origem canônica `nocoes-direitos-humanos/teoria-geral-direitos-fundamentais` auditada integralmente; publicação física original `6284f683b02d1365ee665cc5f84c61dfc344ac8c`; referências/proveniência corrigidas em `996d97373c59761d0b31e70b95183cf4192646a1`; detalhamento abaixo |
| U143 | Direitos Humanos; nova; `direito-internacional-direitos-humanos-brasil` | C/H/Q done; planejamento individual de PC-E15; snapshot `718e9a5d27f145f521b91b5db93bafb3bb635128`; ver matriz/evidência abaixo |
| U145 | Direitos Humanos; nova; `pactos-internacionais-direitos-humanos-1966` | C/H/Q done; snapshot `00ee81d6fcf57d5c3184ebd1e661598fefa01f61`; ver matriz/evidência abaixo |
| U146 | Direitos Humanos; nova; `sistema-interamericano-direitos-humanos` | C/H/Q done; snapshot `2e9169e20c1f149679192572fe5c6f7e00bf712e`; ver matriz/evidência abaixo |
| U147 | Direitos Humanos; nova; `controle-convencionalidade-direitos-humanos-constituicao` | C/H/Q done; snapshot `017f1aadec3af39d105dbfc125f97c89827c94cf`; ver matriz/evidência abaixo |
| U148 | Direitos Humanos; nova; `grupos-vulneraveis-atividade-policial-direitos-humanos` | C/H/Q done; snapshot `f6d10d28d9c6ffd9bb4f372ddc993c7929591f48`; ver matriz/evidência abaixo |
| U144 | Direitos Humanos; parcial; `sistema-global-onu-dudh` | C/H/Q done; visão física resolvida na `main`, commit de publicação `a1049c04dcec9558e6588b2953a82b17ba41eb94`; doador histórico não inferido; ver matriz de PC-E15 abaixo |
| U149–U155 | Medicina Legal; novas | C/H/Q done; U155 snapshot final `e32e4fbec514febb820401e89a53c0be26a40345`; PC-E16 concluído; ver matriz de PC-E16 abaixo |
| U156–U158 | Criminologia; novas | C/H/Q done; U158 snapshot `dbb19b0a3a39f5b1a3a41043005fe6e342582767`; PC-E17 concluído; grupo Criminologia criado com U156 |

Esses registros são lacunas de documentação, não placeholders de aulas. Os assuntos publicados permanecem na `main`; uma futura reconstrução documental deve verificar arquivos/identidades, programa e evidências, distinguindo informação encontrada de decisão editorial nova. Não reabrir `done` apenas por ausência de `abbr` ou por esta reorganização.

## 6. Matriz dos recortes explicitamente disponíveis

### Língua Portuguesa — inspeção contextual U001

O item 20.2.2 do Edital nº 1, página 62, exige literalmente: **1 Compreensão e interpretação de textos de gêneros variados.** O item 2, reconhecimento de tipos e gêneros, permanece em U002; a semelhança do slug histórico não funde os recortes.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 1 | U001 — **Leitura, compreensão e interpretação de textos** — informação explícita, inferências e seus limites, implícitos, sentido global, argumentação, vozes, efeitos de linguagem e integração verbal/visual/numérica | **parcial/local**. Doador histórico `src/content/biblioteca/lingua-portuguesa/leitura-interpretacao-tipos-generos/`, commit `6f9c945821bf14568c51801f26c82295df43de46`; C `85dbe7c90266f5adf3044a9bcca06e2564cece49`; H `ad466b8c7fd43232b66a491fe34eebd14783e3ba`; R `ab4d4a48d0dc935b8c1b059ea4000830ba4420fa`; Q `4ed13fafbf53a8821215e297457923b23b3d4240` | `leitura-interpretacao-tipos-generos`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/leitura-interpretacao-tipos-generos/`; `pc-u001`; 1 | Seleção local de 32 autorais + 4 adaptações; 53 questões do doador não importadas, sem excluir nada da biblioteca. C/H preservados após leitura integral; pista temporal de q109 restaurada e referências complementadas. U002 mantém a classificação dos tipos/gêneros. Sem pré-requisito editorial pendente | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção de 21/9/2026; Q/R corrigidos em `e86513514022eef8e8733a567d25174b1f0dc370`; C/H sem mudança, blobs na seção 8 | done | done | done |

Os quatro blobs doadores foram conferidos no commit histórico; não houve nova cópia nem reauditoria integral de seu banco de 89 questões. Os vínculos atuais dos dois cargos TCE, ambos blob `7d2d43adfb11db91d5fc9c62b9c16a7205b948b8`, apontam para esse canônico com ordem 1. O pacote PC-MA é físico e independente, sem `vinculo.json`; seus consumidores não são inferidos dos consumidores do doador. Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/leitura-interpretacao-tipos-generos/`.

### Língua Portuguesa — inspeção contextual U002

O item 20.2.2 do Edital nº 1 exige literalmente **2 Tipos e gêneros textuais**. U001 permanece responsável pela compreensão/interpretação do item 1; U003 abre o recorte de ortografia oficial.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 2 | U002 — **Tipos e gêneros textuais** — gênero, tipo/sequência, domínio/esfera, suporte, predominância, gêneros de alta frequência, heterogeneidade tipológica e intergenericidade | **parcial/local**. Doador histórico `src/content/biblioteca/lingua-portuguesa/tipos-generos-textuais/`, commit `3aabf0e5cc3fdf336f7b9dcb1cf58b864ad0ec61`; C `d8e190ab478c1a69d8105f4f565c5e041263a128`; H `10a6ee8a3d18bf5edf45f6f5c80eaf40a5cd1823`; R `1743065d88592b8a5d63992d21860560b0429550`; Q `fc7f614dbd23b53d63794c830162f143cd28f375` | `tipos-generos-textuais`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/tipos-generos-textuais/`; `pc-u002`; 2 | Aula condensada/reorganizada para o recorte PC-MA; 18 autorais + 3 adaptações; conteúdo e H aceitos sem mudança na inspeção. U001 mantém interpretação; U003 mantém ortografia. O doador canônico e os consumidores TCE não foram editados | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 21/9/2026; R revalidado em `589ee4028f351f628ddcaf41b82a1d3d97e0a583`; blobs finais na seção 8 | done | done | done |

Os vínculos atuais de TCE-MA Analista Administração e TCE-MA Técnico Administrativo apontam explicitamente para o canônico `lingua-portuguesa/tipos-generos-textuais`, ambos com ordem 2 e blob `55019b1e8231e8fc4d7263e603d6175104aff64f`. Isso comprova os consumidores do canônico, não transforma o pacote PC-MA em vínculo. A rota local permanece `/concursos/pc-ma-2026-oficial-investigador/tipos-generos-textuais/`.

### Língua Portuguesa — inspeção contextual U003

O item 20.2.2 do Edital nº 1 exige literalmente **3 Domínio da ortografia oficial**. U002 permanece responsável por tipos/gêneros; U004 inicia os mecanismos de coesão.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 3 | U003 — **Domínio da ortografia oficial** — acentuação, hífen, emprego de letras, maiúsculas/minúsculas, apóstrofo, abreviaturas/siglas/símbolos e variantes | **parcial/local**. Doador histórico `src/content/biblioteca/lingua-portuguesa/ortografia-oficial/`, commit `ad852a4507777fbd76d15919808ad7660b05b23a`; C `c2bbe265e428a30a7cbd5b48f7eadffa7895cfd1`; H `389b29e75ed3506280c894f09b5b50a17b27de24`; R `5addf34831d3bb8bea4cb6d868f046667fab1054`; Q `858f900b9b6e5dfa48b008231e6584a9c4993e87` | `ortografia-oficial`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/ortografia-oficial/`; `pc-u003`; 3 | Aula local condensa listas e prioriza decisões de prova; 20 autorais + 4 adaptações. C/H/Q aceitos sem mudança; R revalidado. U002 mantém tipos/gêneros e U004 coesão | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 21/9/2026; R revalidado em `576474ec0376a455bf17f630d8b6af75799f8097`; blobs finais na seção 8 | done | done | done |

Os vínculos atuais de TCE-MA Analista Administração e TCE-MA Técnico Administrativo apontam explicitamente para `lingua-portuguesa/ortografia-oficial`, ambos com ordem 3 e blob `83853125df013023639f46c1f176719a5b45b1eb`. O pacote PC-MA permanece físico/local e independente. Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/ortografia-oficial/`.

### Língua Portuguesa — inspeção contextual U004

O item 20.2.2 do Edital nº 1 exige **4 Domínio dos mecanismos de coesão textual** e **4.1 Emprego de elementos de referenciação, substituição e repetição, de conectores e de outros elementos de sequenciação textual**. O item 4.2 fica em U005.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 4–4.1 | U004 — **Coesão textual: mecanismos e sequenciação** — referenciação, substituição, repetição, conectores, alcance e progressão | **parcial/local**; doador histórico específico **não individualizado no registro autoritativo**. Candidato comparativo: canônico `lingua-portuguesa/coesao-textual` existente no pai `09063bc6184c5f04f1989bd53bd9a0d079d72916`, blobs C `078c25924938907899c2a78d0cda6c29ea9f0a89`, H `d7acd4f17b972c6e3fdd72f2326189b0f5a631b0`, R `8a56265ec8f2f23535723ce8f5d7db75dcb9de8a`, Q `59d80ee8e7b3e87a7fb037814f36ba265fd21709`; candidato não promovido a doador por inferência | `coesao-textual`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/coesao-textual/`; `pc-u004`; 4 | C/H/Q locais aceitos sem mudança; 15 autorais + 3 adaptações; recorte mantém 4/4.1 e deixa tempos/modos a U005 e aprofundamentos sintáticos às unidades próprias. Candidato canônico tem 65 Q e nenhum ID em comum com as 18 locais | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 22/9/2026; R revalidado em `9c2ee25645fd0ca94d510352117530b83429344b`; blobs finais na seção 8 | done | done | done |

O canônico comparativo é consumido atualmente por TCE-MA Analista Administração e TCE-MA Técnico Administrativo por vínculos explícitos, ambos ordem 4 e blob de vínculo `c29684b53d82e0d6007e251ce805be53498c5a37`. Isso comprova seus consumidores, não a origem histórica de U004. Os arquivos locais surgiram nos commits `02464fcb9db123e0e6dab82cff2b49b9f60b8550` (C), `c035b014fb3cb03040c9c29a107293b6335d34cd` (H), `8d3e51c481d989d026b44109e7c939e92bb46ede` (R) e `75b26654a245c5ed9d3506a9497d3e828ff9d7d3` (Q). Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/coesao-textual/`.

### Língua Portuguesa — inspeção contextual U005

O item 20.2.2 do Edital nº 1 exige literalmente **4.2 Emprego de tempos e modos verbais**. U004 mantém os mecanismos de coesão; U007 aprofunda o verbo como classe, sem terceirizar os pré-requisitos necessários a U005.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 4.2 | U005 — **Emprego de tempos e modos verbais** — referência temporal, aspecto, modalidade, valores de indicativo/subjuntivo/imperativo, correlação, locuções e discurso relatado | **parcial/local**. Doador histórico explicitamente registrado: `src/content/biblioteca/lingua-portuguesa/emprego-tempos-modos-verbais/`, blobs C `578fe599a64b3c39f8ff8de7bd7a530e777343c6`, H `06cf8e8a7dd16df9aef3b777bf5a571cdc0213ab`, R `db6e07d3b2303c8b80f06322d33140797dd5c791`, Q `df3d4c2d327cf04062c6c6edcd2fda4f59d6fb59` | `emprego-tempos-modos-verbais`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/emprego-tempos-modos-verbais/`; `pc-u005`; 5 | C/H locais condensam o doador para o item 4.2; 17 autorais locais + 3 adaptações herdadas. U007 mantém estrutura da classe verbal/formas nominais/vozes/impessoalidade; U005 traz as pontes mínimas de que precisa. C/H/Q aceitos sem mudança | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 22/9/2026; R revalidado em `bc72f3cbb85a40a617fe81e2d01d6d4898022aeb`; blobs finais na seção 8 | done | done | done |

Os dois vínculos TCE do canônico têm ordem 5 e blob `c0720a1108a40882d31431014b9988c00e29872d`. Os quatro blobs doadores registrados no pacote permanecem idênticos aos atuais. O conjunto canônico tem 98 questões; somente `q276`, `q277` e `q278` foram preservadas por ID na versão local, com revisão incrementada pela reescrita. Rota local: `/concursos/pc-ma-2026-oficial-investigador/emprego-tempos-modos-verbais/`.

### Língua Portuguesa — inspeção contextual U007

O item 20.2.2 do Edital nº 1 exige **5.1 Emprego das classes de palavras**. Nesta divisão, U007 cobre o verbo como classe; U005 mantém tempos e modos, U006 na identidade atual da `main` cobre as classes nominais e U008 as classes invariáveis.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 5.1 | U007 — **Verbo como classe de palavras** — reconhecimento, estrutura flexional, formas nominais, regularidade, auxiliaridade, predicação mínima, vozes, `se` e impessoalidade | **parcial/local**. Doador histórico explicitamente registrado: `src/content/biblioteca/lingua-portuguesa/verbo-como-classe-de-palavras/`, blobs C `5ff3dd51b082d9ef3103e8506125ac97047bd058`, H `d9634f5e29ad0b8733e91bfb2ee60cf2188d28bf`, R `ed20f751913dff8ccfa9a2352bc216adf78d37d6`, Q `3031c7db63b2393658b47ffed2d60f974a397af2` | `verbo-como-classe-de-palavras`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/verbo-como-classe-de-palavras/`; `pc-u007`; 7 | C/H locais condensam o doador para o emprego da classe verbal; 17 autorais locais + 3 adaptações herdadas. U005 aprofunda tempo/modo, U006 nominal e U008 invariáveis. C/H/Q aceitos sem mudança | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 22/9/2026; R revalidado em `25e29b293c90796034578cbafcdbc1b23c53b22b`; blobs finais na seção 8 | done | done | done |

Os quatro blobs doadores permanecem idênticos aos atuais e os consumidores TCE-MA Analista Administração e TCE-MA Técnico Administrativo continuam vinculados ao canônico na ordem 7. O canônico tem 119 questões; somente `q384`, `q388` e `q399` foram preservadas por ID na versão local, com revisão 2 contra revisão 1 no doador por causa da reescrita. Rota local: `/concursos/pc-ma-2026-oficial-investigador/verbo-como-classe-de-palavras/`.

### Língua Portuguesa — inspeção contextual U008

O item 20.2.2 do Edital nº 1 exige **5.1 Emprego das classes de palavras**. U008 cobre advérbio, preposição, conjunção e interjeição; estrutura do período, coordenação, subordinação, regência e crase permanecem nas unidades próprias.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 5.1 | U008 — **Classes invariáveis de palavras** — advérbio, preposição, conjunção, interjeição, locuções, grau, palavras denotativas e classificação contextual | **parcial/local**. Doador histórico `src/content/biblioteca/lingua-portuguesa/classes-invariaveis-de-palavras/`, commit `ba14d184f60a766693898e5ab1dcfd99566b008a`; C `53bb6ac546d019fa79755be10a307b35dd813c94`; H `91e1844af2c5287688a85e42e7bd8a0d86557052`; R `3a02f744ec4a14014214eed4c3b93ad3ecca6cfc`; Q `6933d03ed9188f7eb27399866f36ae823ab7d42a` | `classes-invariaveis-de-palavras`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/classes-invariaveis-de-palavras/`; `pc-u008`; 8 | Reorganização por função/alcance e recuperação seletiva de grau, denotativas, comparação/proporção e locuções; 20 autorais + 4 adaptações; sem importação integral do banco doador. U009–U011 preservam sintaxe | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 23/9/2026; C/H/R e dois autorais em `1c8d9d6cb172e0e2687c3f04777fe1b0012fedcc`; blobs finais na seção 8 | done | done | done |

Os dois cargos TCE consomem o canônico por vínculos explícitos; o pacote PC-MA permanece físico/local, sem `vinculo.json`. O conjunto local tem 24 questões e mantém `questionSetRevision: 6`; `u008-a01` e `u008-a07` passaram à revisão 2, sem mudança de composição. Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/classes-invariaveis-de-palavras/`.

### Língua Portuguesa — inspeção contextual U010

O item 20.2.2 do Edital nº 1 exige **5.2 Relações de coordenação entre orações e entre termos da oração**. O recorte foi conferido textual e visualmente na página 62 do arquivo oficial em 23/09/2026.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 5.2 | U010 — **Coordenação entre orações e termos da oração** — coordenação de termos/orações, sindéticas/assindéticas, cinco relações tradicionais, conectores polifuncionais, escopo e paralelismo | **parcial/local**. Canônico atual `src/content/biblioteca/lingua-portuguesa/coordenacao-oracoes-termos/`: C `feab108b3f8b3f8b8fd25d71159bec2403a0771e`; H `ad2f18abaf3c6eb9b5970e091c6fe5b1c61df305`; R `a37fd26812a6167d71add71aad3680a0563b812e`; Q `deffc17e56e62be818cef3d50034f72b94ef1b2c` | `coordenacao-oracoes-termos`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/coordenacao-oracoes-termos/`; `pc-u010`; 10 | Local preserva o núcleo de coordenação e corta aprofundamentos do canônico já pertencentes a U012/U018; C explicita correlação, expressão preposicionada e orações reduzidas; banco local 20 autorais + 4 adaptações, sem importar as 140 questões canônicas | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 23/9/2026; C `f7d7671610e57bb984d0cca4bff27ca81e4f287b`, R `aa84886b359a8c957b6f30b03b6a7d6823509f5a`; H/Q sem mudança; blobs finais na seção 8 | done | done | done |

Os dois cargos TCE consomem o canônico por `vinculo.json` explícito, ambos com ordem 9; o pacote PC-MA permanece físico/local e não mistura vínculo. Os únicos IDs compartilhados entre os bancos são `q3350`, `q3355`, `q3356` e `q3358`; localmente estão em revisão 2 pela reescrita não literal. Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/coordenacao-oracoes-termos/`.

### Língua Portuguesa — inspeção contextual U011

O item 20.2.2 do Edital nº 1 exige **5.3 Relações de subordinação entre orações e entre termos da oração**. A identidade foi resolvida pelo frontmatter atual: `pc-u011`, ordem 11.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 5.3 | U011 — **Subordinação entre orações e termos da oração** — dependência entre termos, substantivas, adjetivas, adverbiais, reduzidas, encaixamento e escopo | **parcial/local**. Doador `src/content/biblioteca/lingua-portuguesa/subordinacao-oracoes-termos/`; blobs históricos C `62d47a110b3dc5f1d4bdaf83fb0c230e6494f745`, H `9331375faa4307683778e27dfa09a9bfb950534f`, R `e1b81ecf08994cdfa42ada286286bda3f8a13c8d`, Q `4fb85a6542430e90da09bdd2e69e91bca98a0c7c` | `subordinacao-oracoes-termos`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/subordinacao-oracoes-termos/`; `pc-u011`; 11 | C recupera pré-requisitos e contrastes de formas reduzidas; H condensado; 21 autorais + 3 adaptações preservadas. Coordenação, pontuação e regência ficam nas unidades próprias | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 23/9/2026; C/H/R em `6017fe32124653bd1d1ce2983344cce9d8e31ea8`; Q sem mudança; blobs finais na seção 8 | done | done | done |

Os dois cargos TCE consomem o canônico por vínculos explícitos. O pacote PC-MA permanece físico/local. Q mantém 24 questões, `questionSetRevision: 5`, sem nova resolução. Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/subordinacao-oracoes-termos/`.

### Língua Portuguesa — inspeção contextual U012

O item 20.2.2 do Edital nº 1 exige **5.4 Pontuação**. A identidade foi resolvida pelo frontmatter atual: `pc-u012`, ordem 12.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 5.4 | U012 — **Pontuação** — vírgula e ligações integradas; incisos; adverbiais; restritivas/explicativas; coordenação; ponto e vírgula; dois-pontos; ponto; sinais em par; aspas/colchetes; interrogação/exclamação/reticências | **parcial/local**. Canônico atual `src/content/biblioteca/lingua-portuguesa/pontuacao/`: C `935085006f35448ed85b24c58cbc83359ea2b891`; H `6eae0abeefe155637b6c65451771612f749a941d`; R `ff3d841ffe1be16a75ac36e25bec11c694d2db8b`; Q `a2b053a3a158587dcfc6438f43c18db095079c69` | `pontuacao`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/pontuacao/`; `pc-u012`; 12 | Local mantém mecanismo estrutura→sinal→sentido e recupera seletivamente `etc.`, travessão de fala e pergunta indireta dentro de pergunta maior; não importa banco/tabelas do canônico. U011 mantém subordinação, U013 concordância e U018 reorganização | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 23/9/2026; C `ec70b9856a1bffa760ef8c2293a61cca4a08ab5c`, H final `ac9254a011e61bb48c2d7fdde1ba8c26e6b2734a`, R `6b331bb0e5c3ceb314663800e1eb65c3be9713ca`; Q sem mudança; blobs finais na seção 8 | done | done | done |

Os dois cargos TCE consomem o canônico por vínculos explícitos, ambos ordem 11; o pacote PC-MA permanece físico/local e não contém `vinculo.json`. O banco local preserva 24 questões contra 147 no canônico, sem importação adicional nem alteração de composição. Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/pontuacao/`.

### Língua Portuguesa — inspeção contextual U013

O item 20.2.2 do Edital nº 1 exige **5.5 Concordância verbal e nominal**. A identidade foi resolvida pelo frontmatter atual: `pc-u013`, ordem 13.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 5.5 | U013 — **Concordância verbal e nominal** — núcleo e controlador; sujeitos simples/compostos/oracionais; relativos; quantidades; impessoais; `se`; infinitivo; particípios; formas variáveis/invariáveis e reescrita | **parcial/local**. Canônico atual `src/content/biblioteca/lingua-portuguesa/concordancia-verbal-nominal/`: C `9a522e0f4de63fdb5aa4842b0fc8795a7674f99a`; H `453fb4eb9df3a6717a4f4b6adb3b2b0dfa6b9848`; R `d9f96b27da0a6d9cfa8d5ccb152e19f2e5924a4b`; Q `25c832848d44c7f90d9e0ea7b38db04bcf1fa32f` | `concordancia-verbal-nominal`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/concordancia-verbal-nominal/`; `pc-u013`; 13 | Local mantém a trilha controlador→núcleo→construção especial e recupera seletivamente variantes de `quem`, `um dos que` e percentuais; não importa as 152 questões nem o aprofundamento integral do canônico. U012 mantém pontuação e U014 regência | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 23/9/2026; C `9e9ff3bba1d5567042dd82b46c4977ce5571f09e`, H `44c4ad90412268e9f643292401ebc8185907ca06`, R final `cd99fe4bbea0f48d2a50f2f4ae5e45c64f96bc0d`; Q sem mudança; blobs finais na seção 8 | done | done | done |

Os dois cargos TCE consomem o canônico por vínculos explícitos, ambos ordem 12; o pacote PC-MA permanece físico/local e não contém `vinculo.json`. O banco local preserva 24 questões contra 152 no canônico; somente `q3539`, `q3540` e `q3543` compartilham ID com o doador, com revisões locais superiores pelas adaptações já publicadas. Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/concordancia-verbal-nominal/`.

### Língua Portuguesa — inspeção contextual U014

O item 20.2.2 do Edital nº 1 exige **5.6 Regência verbal e nominal**. A identidade foi resolvida pelo frontmatter atual: `pc-u014`, ordem 14.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 5.6 | U014 — **Regência verbal e nominal** — regente/regido, transitividade contextual, complementos, pronomes, verbos de regência variável, regência nominal, queísmo/dequeísmo, relativos, onde/aonde, crase/passiva e reescrita | **parcial/local**. Canônico atual `src/content/biblioteca/lingua-portuguesa/regencia-verbal-nominal/`: C `a5efc67070fd7767f67cd900742ca9c280038dc1`; H `5e0d4dc9eda4a734cd51d3bd71364a2eb0202f14`; R `5fb9ad508b2253aad89cb436b83f4dbccff06c9a`; Q `65d9b5e5194f0d2fdd6d01029f5727965902af7a` | `regencia-verbal-nominal`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/regencia-verbal-nominal/`; `pc-u014`; 14 | Local preserva o método regente→acepção→complemento→preposição e recupera seletivamente `chamar` e regências de destino/origem; não importa as 70 questões nem o aprofundamento integral do canônico. U013 mantém concordância, U015 crase e U018 reorganização | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 23/9/2026; C `a2ca7a2a94a1986982bb0d0b6f44f8c340f825ad`, H `05dfd78676a5d0d72d78e382ebe8ba90294f4b11`, R `88246305b1dc48c1dc427859c933b22cfe650eef`; Q sem mudança; blobs finais na seção 8 | done | done | done |

Os dois cargos TCE consomem o canônico por vínculos explícitos, ambos ordem 13; o pacote PC-MA permanece físico/local e não contém `vinculo.json`. O banco local preserva 24 questões contra 70 no canônico; somente `q3519`, `q3520` e `q3523` compartilham ID com o doador, com revisão local 2 contra revisão 1 canônica. Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/regencia-verbal-nominal/`.

### Língua Portuguesa — inspeção contextual U015

O item 20.2.2 do Edital nº 1 exige **5.7 Emprego do sinal indicativo de crase**. A identidade foi resolvida pelo frontmatter atual: `pc-u015`, ordem 15.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 5.7 | U015 — **Crase** — preposição + artigo/demonstrativo, teste masculino, bloqueios, facultatividade, relativos, topônimos, locuções, horas e reescrita | **parcial/local**. Canônico atual `src/content/biblioteca/lingua-portuguesa/crase/`: C `01474678465e8139d2984c130e8af23285f7c93f`; H `d0d7508f8af94e2cd58632f4f6de9ceaf5fc4ba2`; R `c66889720990314b590d7f9f930dc2b5211ab02d`; Q `49ab162c4f281d73380d003b079421d872398701` | `crase`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/crase/`; `pc-u015`; 15 | Local preserva o mecanismo preposição→artigo/demonstrativo→fusão e recupera seletivamente `a qual` interrogativo e `a uma hora qualquer`; não importa as 151 questões nem o aprofundamento integral do canônico. U014 mantém regência, U016 colocação pronominal e U018 reorganização | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 24/9/2026; C `39737c4cd0e39a7aa9401c8b14414725d60809dd`, H `edaeb7444724604c0a977b378aef76b1ad76ccfb`, R `9e002427d103864047df5169b4b1266fcdde6e98`; Q sem mudança; blobs finais na seção 8 | done | done | done |

Os dois cargos TCE consomem o canônico por vínculos explícitos, ambos ordem 14; o pacote PC-MA permanece físico/local e não contém `vinculo.json`. O banco local preserva 24 questões contra 151 no canônico; somente `q3659`, `q3660` e `q3667` compartilham ID com o doador. Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/crase/`.

### Língua Portuguesa — inspeção contextual U016

O item 20.2.2, Língua Portuguesa, 5.8 do Edital nº 1 exige **colocação dos pronomes átonos**. O frontmatter atual confirma `pc-u016`, ordem 16, no pacote físico local.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 5.8 | U016 — **Colocação pronominal** — pronome tônico/átono, próclise/ênclise/mesóclise, fatores e alcance oracional, futuros, imperativo, formas nominais, locuções e grafia | **parcial/local**. Doador canônico `src/content/biblioteca/lingua-portuguesa/colocacao-pronominal/`, blobs C `b0898bb7f9aa7d7b8e59bdc871d01a0eec921ba0`, H `6a983f557b61cb4cfc654d2a511f99fb74d05f2b`, R `94138447136e3eac5c6f517e50ca0cfffff0ccb2`, Q `14a409d2025a1e5a6305b3bf68b29d282f32e551` | `colocacao-pronominal`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/colocacao-pronominal/`; `pc-u016`; 16 | Pacote local seleciona 24 questões de IDs herdados frente a 151 do canônico, com redação/revisões independentes; mantém mecanismo e variação pertinentes, corta funções de `se`, regência e reescrita sistemática para U007/U014/U018. Lacunas de tônico/átono, fatores adicionais, futuro, infinitivo e `-mos + nos` completadas | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 24/9/2026; blobs finais na seção 8. Os dois cargos TCE-MA consomem somente o canônico por vínculos explícitos, ordem 15 | done | done | done |

Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/colocacao-pronominal/`. O destino PC-MA não contém vínculo nem compartilha arquivos físicos com os consumidores TCE-MA.

### Língua Portuguesa — inspeção contextual U017

O item 20.2.2 do Edital nº 1 exige **6.1 Significação das palavras** e **6.2 Substituição de palavras ou de trechos de texto**. O frontmatter confirma `pc-u017`, ordem 17, na origem física local.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 6.1/6.2 | U017 — **Significação e substituição lexical** — acepção contextual, relações lexicais, referência, inferências, modalidade, quantidade, escopo e compatibilidade da troca | **parcial/local**. Doador `src/content/biblioteca/lingua-portuguesa/significacao-substituicao-lexical/`, blobs C `95a8667d6d56701a388ee3b348471551be89082e`, H `c767365e312ab73eefd6afd6ff2387dead1b17ea`, R `0a283078e164547418e0539dc7f195ece1ed690f`, Q `28a49db192b63bbfdece72bcb9ef602a4dbce8a0` | `significacao-substituicao-lexical`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/significacao-substituicao-lexical/`; `pc-u017`; 17 | Pacote local de 24 questões diante de 179 do canônico, IDs herdados e versões próprias; recupera posição do adjetivo, parte/todo, limites quantitativos e conectores; transformação sintática/voz e adequação de gênero/registro pertencem a U018/U019 | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 24/9/2026; blobs finais na seção 8. Ambos os cargos TCE-MA consomem somente o canônico, ordem 16 | done | done | done |

Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/significacao-substituicao-lexical/`; a unidade local não contém `vinculo.json`.

### Língua Portuguesa — inspeção contextual U018

O item 20.2.2 do Edital nº 1 exige **6 Reescrita de frases e parágrafos do texto** e **6.3 Reorganização da estrutura de orações e de períodos do texto**. O frontmatter confirma `pc-u018`, ordem 18, em pacote físico local. U017 responde pela substituição lexical; U019, por gêneros e formalidade.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 6/6.3 | U018 — **Reorganização da estrutura de orações e períodos** — deslocamento e escopo, união/divisão, orações reduzidas/desenvolvidas, voz ativa/passiva, nominalização, elipse, paralelismo e referência | **parcial/local**. Doador `src/content/biblioteca/lingua-portuguesa/reorganizacao-oracoes-periodos/`, blobs C `1cadb8d05edd0ba2179c0245622dacab3a97363f`, H `17c4e756b7af1efb9ee824dbd7a73c3e5e0ce110`, R `3cefb1337b7ec88fe2701e0dd582a2c353e85dab`, Q `7f65949eca2e9a52bede5bdfa8a8cc462c7b46c4` | `reorganizacao-oracoes-periodos`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/reorganizacao-oracoes-periodos/`; `pc-u018`; 18 | Pacote local de 24 questões diante de 87 do canônico, IDs compartilhados com versões próprias; C/H mantidos. Q `q3709` tornou explícita a causa como única relação não autorizada; R substituiu URL de manual que redirecionava para login. Pontuação, concordância, regência, crase, colocação e significação têm unidades próprias; adequação de gênero/formalidade pertence a U019 | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 24/9/2026; Q/R corrigidos nos commits da seção 4. Ambos os cargos TCE-MA consomem somente o canônico, ordem 17 | done | done | done |

Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/reorganizacao-oracoes-periodos/`; pacote local sem `vinculo.json`. Vínculos explícitos em `src/content/assuntos/tce-ma-2026-analista-administracao/conhecimentos-gerais/lingua-portuguesa/reorganizacao-oracoes-periodos/vinculo.json` e `src/content/assuntos/tce-ma-2026-tecnico-administrativa/conhecimentos-gerais/lingua-portuguesa/reorganizacao-oracoes-periodos/vinculo.json`, ambos blob `fc8f822678b6c3ef7c7b2bae22171dde58222d85`.

### Língua Portuguesa — inspeção contextual U019

O item 20.2.2 do Edital nº 1 exige **6.4 Reescrita de textos de diferentes gêneros e níveis de formalidade**. O frontmatter confirma `pc-u019`, ordem 19, em pacote físico local. U017/U018 respondem pela substituição lexical e reorganização de períodos; U020/U021 tratam de correspondência oficial.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 6.4 | U019 — **Reescrita de textos de diferentes gêneros e níveis de formalidade** — finalidade, interlocutores, gênero, suporte, registro, retextualização, manutenção de fatos, fonte e modalidade | **parcial/local**. Doador `src/content/biblioteca/lingua-portuguesa/reescrita-generos-formalidade/`, blobs C `0d68ee225f5b9fd873514e20c0ba583c2bbe9a04`, H `d168fc7ba7cc1805863f9ba2f63de0139382eeac`, R `db94243aea520975fa972b7df87a3385cdfc721e`, Q `0e574c88fe4379e5e3d5f19ed94cf8c44949282a` | `reescrita-generos-formalidade`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/reescrita-generos-formalidade/`; `pc-u019`; 19 | Pacote local de 24 questões diante de 90 do canônico, IDs compartilhados com versões próprias; C evita inventar documento para identificação e mantém o pedido como pergunta, R usa endereço oficial do Manual, H/Q preservados. Limite: transformação estrutural U018, regras de correspondência oficial U020/U021 | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 24/9/2026; C/R corrigidos nos commits da seção 4. Ambos os cargos TCE-MA consomem somente o canônico, ordem 18 | done | done | done |

Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/reescrita-generos-formalidade/`; pacote local sem `vinculo.json`. Vínculos explícitos em `src/content/assuntos/tce-ma-2026-analista-administracao/conhecimentos-gerais/lingua-portuguesa/reescrita-generos-formalidade/vinculo.json` e `src/content/assuntos/tce-ma-2026-tecnico-administrativa/conhecimentos-gerais/lingua-portuguesa/reescrita-generos-formalidade/vinculo.json`, ambos blob `e24d7aea014e54f133cbd1160cc7a2419b1d9d7e`.

### Língua Portuguesa — inspeção contextual U020

O item 20.2.2 do Edital nº 1 exige **7 Correspondência oficial (conforme Manual de Redação da Presidência da República)**, **7.1 Aspectos gerais da redação oficial** e **7.3 Adequação da linguagem ao tipo de documento**. O frontmatter confirma `pc-u020`, ordem 20, pacote físico local; o recorte 7.2/7.4 permanece em U021.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 7/7.1/7.3 | U020 — **Redação oficial: linguagem** — clareza, precisão, objetividade, concisão, coesão, coerência, impessoalidade, formalidade, padronização, norma padrão, destinatário e finalidade | **nova/local**, sem canônico equivalente materializado no registro recebido. Origem física própria `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/redacao-oficial-linguagem/` | `redacao-oficial-linguagem`; `pc-u020`; ordem 20 | C preserva dado temporal e estado das pendências na reescrita; H intacta; Q afasta antecedente ambíguo em `u020-a06`; R usa endereço oficial do Manual. Modelos/finalidades de expedientes pertencem a U021 | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 24/9/2026; commits C/R/Q da seção 4; blobs finais seção 8 | done | done | done |

Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/redacao-oficial-linguagem/`; quatro arquivos locais sem vínculo canônico. A ausência de outra origem com o mesmo slug na pesquisa não dispensa auditoria futura de similaridade temática.

### Língua Portuguesa — inspeção contextual U021

O item 20.2.2 do Edital nº 1 exige **7 Correspondência oficial (conforme Manual de Redação da Presidência da República)**, **7.2 Finalidade dos expedientes oficiais** e **7.4 Adequação do formato do texto ao gênero**. O frontmatter confirma `pc-u021`, ordem 21, em pacote físico local. A linguagem geral é U020; modelos e finalidades são U021.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Língua Portuguesa, 7/7.2/7.4 | U021 — **Expedientes oficiais: finalidades e formatos** — ofício unificado e suas variações, partes do padrão, Exposição de Motivos, Mensagem, e-mail, tratamento e endereçamento no âmbito federal posterior | **nova/local**, sem canônico equivalente materializado no registro recebido. Origem física própria `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/expedientes-oficiais-formatos/` | `expedientes-oficiais-formatos`; `pc-u021`; ordem 21 | C/H preservados; R substitui cópia externa inacessível pelo endereço da Presidência; Q reformula diretamente três prompts de adaptações sem alterar as respostas. Exclui atributos gerais já ensinados em U020, exceto pontes mínimas | PC-MA, `pcma-2026-invest`; corte 13/7/2026; inspeção 24/9/2026; commits R/Q da seção 4; blobs finais seção 8 | done | done | done |

Rota preservada: `/concursos/pc-ma-2026-oficial-investigador/expedientes-oficiais-formatos/`; quatro arquivos locais sem vínculo canônico. Decreto federal nº 9.758/2019 tem âmbito e exceções próprios, sem aplicação presumida à Administração maranhense.

### Geografia do Maranhão — reconciliação U075

O Edital nº 1 da PCMA, de 13/07/2026, exige literalmente no item 20.2.2: **9 A agricultura maranhense: caracterização e principais produtos agrícolas; caracterização da pecuária. 10 Extrativismo: vegetal, animal e mineral.**

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 9–10 | U075 — **Agricultura, pecuária e extrativismo** | **parcial/local**; canônico `historia-geografia-estado-maranhao/agricultura-pecuaria-maranhenses/`: C `cc64362b737d12ae128eead942872c97476d008a`, H `51506cc651a8f26b7c4e8a8e67c7a16af74063ce`, R `a9e69e67f5c7c1c50d4aad3f58f14de9a77fb434`, Q `356f5d085f7553a2e3db93d7d5768acbf0cfcc9e`; canônico `historia-geografia-estado-maranhao/extrativismo-vegetal-animal-mineral/`: C `bbc84eba4f587bcb6973efc1fc226632d9d1a979`, H `465633cb61540f53d655190f9498611ef7b1bd4a`, R `e20aa333ed98fe0bca664fefee34e7d1f5948d27`, Q `2392bd71b6228a6f30b351b36be1799a9ce2322b` | `agricultura-pecuaria-extrativismo`; físico PC-MA + grupo Geografia do Maranhão; `pc-u075`; 75 | Fusão local dos dois canônicos: agropecuária + extrativismo. Não usa `vinculo.json` porque um único vínculo perderia metade do programa. Condensa detalhes dos canônicos e adapta o corte TCE 04/08/2026 ao corte PC-MA 13/07/2026 | PC-MA; corte 13/7/2026; pacote físico `c1e00edc44afebf5cf73c783ace20fd7a69e1b75`; reconciliação `d54f46305e09214e67a46ac4ff4e76ec18b7b278` | done | done | done |

Os dois canônicos têm consumidores comprovados por `vinculo.json` em TCE-MA 2026 Analista Administração e Técnico Administrativo. A auditoria confirmou que C/H/Q da U075 permaneceram materialmente idênticos desde a publicação original; apenas `referencias.md` recebeu a proveniência explícita.

### Informática

Grupo `conhecimentos-gerais/informatica/`; origem nova/local, sem doador integral compatível nos aceites transferidos. Todas as cinco unidades abaixo estão C/H/Q `done`; blobs/commits na seção 8.

| Edital | Unidade / slug / identidade e ordem | Recorte e fronteiras |
|---|---|---|
| 1 + 5 | U022 — `internet-intranet-navegacao-redes-sociais`; pc-u022 / 22 | Internet, Web, intranet, navegador/buscador, URL, busca, favoritos, downloads, cache/cookies, navegação privativa, impressão e redes sociais; redes, correio e segurança têm unidades próprias |
| 4 | U025 — `correio-eletronico-smtp-imap`; pc-u025 / 25 | Preparar, submeter/enviar, transferir e sincronizar correio; SMTP, IMAP, destinatários, cópias, anexos, MIME e pastas; redes/criptografia apenas como ponte |
| 8; 8.1 | U028 — `seguranca-informacao-confidencialidade-integridade-disponibilidade`; pc-u028 / 28 | Confidencialidade, integridade, disponibilidade; autenticação/autorização e controles; malware/ameaças em U029, criptografia/certificação em U030 |
| 8.5 | U031 — `evidencia-digital-cadeia-custodia`; pc-u031 / 31 | Evidência digital, suporte/dado, aquisição, preservação, rastreabilidade, hash, volatilidade, documentação e cadeia de custódia; a perspectiva processual ampla pertence a U093 |
| 10 | U034 — `criptomoedas-nocoes-gerais`; pc-u034 / 34 | Chaves, transações, validação, consenso, blockchain, carteiras, custódia, mineração e serviços; não recomenda investimento nem transforma hash em prova de veracidade/autoria |

Canônicos de competências digitais `redes-tcp-ip-interoperabilidade` e `comunicacao-colaboracao-remota` foram referências de fronteira ou de questões verificadas, não origens integrais dessas unidades. Continuam fora do escopo de edição.

#### U026 — parcial/local, inspeção corretiva em PC-F02

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / evidência | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 20.2.2, Informática, 6 | U026 — **Redes de computadores, IPv4, IPv6 e Wi‑Fi** — alcance, meios, equipamentos, topologias, endereçamento e acesso sem fio | **parcial/local**. Proveniência da cópia previamente registrada: `src/content/biblioteca/competencias-digitais-informatica-aplicada-setor-publico/redes-tcp-ip-interoperabilidade/`; C `819a2ba0355f8db797caf3c13d4f37834b876b70`; H `e9429dc03a05e016097cfabb1ec685324f9a12c1`; R `2300a433fea94a823bbfd5fbbdcf95ad712a9cbd`; Q `5c61956e0a200fd8e7f3208b797d7411deb15e8a` | `redes-computadores-ipv4-ipv6-wifi`; `src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-gerais/informatica/redes-computadores-ipv4-ipv6-wifi/`; `pc-u026`; 26 | Preservado o núcleo local de redes; completadas pontes e corrigida a distinção multicast/anycast. U025 mantém correio/protocolos de aplicação; U027 mantém nuvem e colaboração. Não houve nova cópia do doador, alteração canônica, vínculo ou ampliação para diagnóstico/interoperabilidade | PC-MA, `pcma-2026-invest`; corte 13/7/2026; correção dos quatro artefatos confirmada em `3327d909417c04134b52ff3317fb35a80299734a`; blobs finais na seção 8 | done | done | done |

Os quatro SHA doadores acima documentam a proveniência histórica conservada no pacote, não uma declaração de que o canônico permaneceu inalterado. A intervenção trabalhou exclusivamente a origem física já publicada. A rota permanece `/concursos/pc-ma-2026-oficial-investigador/redes-computadores-ipv4-ipv6-wifi/`.

### Contabilidade

Grupo `conhecimentos-gerais/contabilidade/`; origem nova/local. Unidades C/H/Q `done`, identidades pc-u043–pc-u049 e ordens 43–49. A progressão abaixo limita sobreposição, sem exigir leitura perfeita de todos os pré-requisitos.

| Edital | Unidade / slug | Recorte e fronteira |
|---|---|---|
| 1–2 | U043 — `fundamentos-contabilidade-patrimonio` | Objeto/finalidade, patrimônio, ativo, passivo, patrimônio líquido, equação e situações líquidas; contas e escrituração apenas ponte |
| 3 | U044 — `atos-fatos-administrativos` | Conceitos, fatos permutativos, modificativos e mistos; separar composição patrimonial de alteração do patrimônio líquido |
| 4 | U045 — `contas-debitos-creditos-saldos` | Contas, débitos, créditos, natureza e saldos; plano em U046 e registro formal em U047 |
| 5 | U046 — `plano-contas-elenco-funcao-funcionamento` | Conceitos, elenco, função, funcionamento, hierarquia, contas sintéticas/analíticas e flexibilidade sem arbitrariedade |
| 6 | U047 — `escrituracao-lancamentos-livros-regimes` | Conceitos, elementos essenciais e fórmulas de lançamentos, livros, métodos/processos, competência e caixa; operações específicas em U048 |
| 7 | U048 — `contabilizacao-operacoes-diversas` | Juros, descontos, tributos, aluguéis, variação monetária/cambial, folha, compras, vendas, provisões, depreciações e baixas; demonstrações em U049 |
| 8–12 | U049 — `balancete-demonstracoes-normas-contabeis` | Balancete: conceitos/modelos/técnicas; balanço e demonstração do resultado: conceito/objetivo/composição; Lei 6.404/1976 e alterações, complementos e pronunciamentos CPC; NBC TSP Estrutura Conceitual (R1) |

Manter a inconsistência da fonte e-Tec registrada em U045: exemplo da página impressa 220 chamou redução de Caixa de débito, em conflito com o quadro da própria fonte e com a questão FUB 2018 nº 66. O erro não foi ensinado como regra. U049 documentou a distinção temporal CPC 26/CPC 51 e a obrigatoriedade regulatória futura, sem projetá-la sobre o corte. As fontes e condições completas estão nos artefatos referenciados na seção 8.

### Estatística

Grupo `conhecimentos-gerais/estatistica/`; origem nova/local. Unidades C/H/Q `done`, identidades pc-u050–pc-u055 e ordens 50–55.

| Edital | Unidade / slug | Recorte e fronteira |
|---|---|---|
| 1 | U050 — `estatistica-descritiva-analise-exploratoria` | Gráficos, diagramas, tabelas; medidas de posição, dispersão, assimetria e curtose; não antecipar inferência |
| 2; 2.1–2.2 | U051 — `probabilidade-axiomas-condicional-independencia` | Definições/axiomas, eventos, probabilidade condicional e independência; variáveis e distribuições em U052 |
| 2.3–2.10 | U052 — `variaveis-aleatorias-distribuicoes-momentos-transformacoes` | Variáveis discretas/contínuas, distribuição, função de probabilidade/densidade, esperança/momentos, distribuições especiais, condicionais/independência e transformações |
| 2.11–2.14 | U053 — `leis-grandes-numeros-limite-amostras-distribuicoes-amostrais` | Leis dos grandes números, teorema central do limite, amostras aleatórias e distribuições amostrais; inferência em U054 e planos em U055 |
| 3; 3.1–3.3 | U054 — `inferencia-estatistica-estimacao-testes` | Estimação pontual, métodos/propriedades/suficiência; intervalos de confiança/credibilidade; hipóteses simples/compostas, significância/potência, teste t e qui-quadrado |
| 4–5.2 | U055 — `regressao-linear-amostragem` | Mínimos quadrados/máxima verossimilhança; modelos lineares, inferência, análise de variância e resíduos; amostragem simples, estratificada, sistemática, conglomerados e tamanho amostral |

O canônico `src/content/biblioteca/raciocinio-logico/principios-contagem-probabilidade/` foi relido apenas para fronteira de U051; mistura contagem e probabilidade em recorte distinto, não foi vinculado nem editado. U052–U055 preservam fórmulas, condições e diferenças entre distribuição exata e aproximação, não apenas listas de métodos.

### Administração — parciais com origem resolvida

Grupo `conhecimentos-gerais/administracao/`. Ambos os pacotes foram aceitos sem edição adicional em 17/09/2026; não houve commit editorial vazio.

| Edital | Unidade / destino | Origem e aproveitamento | Lacunas completadas / fronteira | Estado |
|---|---|---|---|---|
| 1.2 | U057 — `principios-sistemas-administracao-federal`; pc-u057 / 57 | Doador físico TCE Analista: `conhecimentos-especificos/administracao-publica/controle-avaliacao-processo-organizacional/`; só controle, coordenação e racionalização pertinentes | Planejamento, descentralização, delegação e organização sistêmica foram completados; exemplos SIORG/SIPEC/SISP/Lei 10.180 sem absorver orçamento, receita ou despesa | C/H/Q done; parcial |
| 2.1–2.3 | U058 — `orcamento-principios-diretrizes`; pc-u058 / 58 | Doador físico TCE Técnico: `conhecimentos-especificos/execucao-orcamentaria-financeira/mcasp-11-edicao/`; fundamentos compatíveis de orçamento/princípios | PPA/LDO/LOA, exclusividade, não vinculação, regra de ouro, AMF/ARF completados localmente; SIDOR/SIAFI em U059, receita em U060, despesa/execução em U061 | C/H/Q done; parcial |

Origens físicas completas e blobs recebidos, na ordem C / H / referências / Q:

- U057: `src/content/assuntos/tce-ma-2026-analista-administracao/conhecimentos-especificos/administracao-publica/controle-avaliacao-processo-organizacional/` — `daa22d0f117aba21a3b2b8b07b3d558661d8ea55` / `950c12e2c7056efc51d20d4fe73a2066f2e1c3d4` / `3ccae45ff5931d0892810cb910a7e6ac7f4a3600` / `2bef334fdd0b7dc27bfab59bb6684c82a783a68d`.
- U058: `src/content/assuntos/tce-ma-2026-tecnico-administrativa/conhecimentos-especificos/execucao-orcamentaria-financeira/mcasp-11-edicao/` — `f80bf7a553df93824b148eed803ab11b339619ce` / `567c9757805765bb9b1e545c0befe8f2803df8c6` / `235624641569279e82a1b592ccef119d351b343e` / `f3ba4f87bb98900f9cf776881fccde0f464887b1`.

## 7. Matrizes e decisões dos blocos recentes

### Atualidades — PC-E09 / U078–U080

Organização autorizada em **18/09/2026**, token `PC-E09-PLANEJAMENTO-20260918-01`, base `37404cca5f53142390e9a57b8a40f6a9a7de4fa2`. É decisão editorial nova, não reconstrução comprovada da divisão original. Resolveu o bloqueio antigo de falta de recortes de U078–U080. As três unidades foram depois publicadas e aceitas.

Grupo `conhecimentos-gerais/atualidades/`, título `Atualidades`, ordem 9. Descrição: `Preparação para a prova discursiva; questões objetivas usadas apenas para fixação.` Publicado com o primeiro pacote completo, não como grupo vazio.

| ID / título | Slug / identidade / ordem | Cobertura principal | Origem / estado |
|---|---|---|---|
| U078 — Segurança pública, política e sociedade | seguranca-publica-politica-sociedade / pc-u078 / 78 | segurança; política; sociedade; educação; saúde; cultura | nova/local; C/H/Q done |
| U079 — Economia, infraestrutura e transformação tecnológica | economia-infraestrutura-transformacao-tecnologica / pc-u079 / 79 | economia; transportes; tecnologia; energia | nova/local; C/H/Q done |
| U080 — Relações internacionais, sustentabilidade e meio ambiente | relacoes-internacionais-sustentabilidade-meio-ambiente / pc-u080 / 80 | relações internacionais; desenvolvimento sustentável; ecologia | nova/local; C/H/Q done |

Cada destino é o prefixo físico PC-MA + `conhecimentos-gerais/atualidades/` + slug. Os treze campos abaixo possuem desenvolvimento principal uma única vez; pontes transversais não autorizam duas aulas iguais.

| Campo | Responsável | Desenvolvimento e fronteira |
|---|---|---|
| Segurança | U078 | segurança pública, prevenção, investigação, vítimas e limites institucionais; mecanismos tecnológicos em U079 e cooperação internacional em U080 |
| Transportes | U079 | mobilidade, logística, acesso a serviços e infraestrutura; impactos sociais fazem ponte curta com U078 |
| Política | U078 | instituições, participação, decisões públicas, governança e debate público; relações entre Estados e organismos em U080 |
| Economia | U079 | atividade, trabalho, renda, desigualdades econômicas e financiamento de políticas; impactos sociais conectam U078 |
| Sociedade | U078 | desigualdades sociais, cidadania, demografia, proteção e convivência; não substituir por resumo de legislação |
| Educação | U078 | acesso, permanência, qualidade, desigualdades, cidadania e prevenção; tecnologia só quando necessária ao problema |
| Saúde | U078 | acesso, prevenção, saúde coletiva e efeitos sociais; não transformar em manual clínico |
| Cultura | U078 | diversidade, patrimônio, direitos culturais, acesso e participação; não reduzir a entretenimento ou curiosidades |
| Tecnologia | U079 | transformação digital, oportunidades, riscos e impactos econômicos/institucionais; não duplicar Informática |
| Energia | U079 | matriz, abastecimento, infraestrutura e transição; impactos ambientais e compromissos conectam U080 |
| Relações internacionais | U080 | cooperação, conflitos, organismos e interdependência; segurança transnacional faz ponte com U078 |
| Desenvolvimento sustentável | U080 | dimensões social/econômica/ambiental, escolhas e limites de políticas; infraestrutura e energia operacionais em U079 |
| Ecologia | U080 | relações ambientais, biodiversidade, conservação e mudanças ambientais; sem aprofundamento científico estranho ao recorte |

Os três assuntos são autonomamente compreensíveis e não dependem da conclusão editorial uns dos outros. A criação do descritor compartilhado exigia reserva do arquivo, já encerrada com sua publicação. Problema → conceitos → evidências → causas/consequências → respostas e limites → aplicação em redação é orientação de aprendizagem, não template obrigatório.

Os aceites registram quatro propostas abertas por unidade, no `conteudo.md`. U078 tem 18 questões autorais; U079 e U080 têm, cada uma, 19 autorais e uma adaptação anterior. Não há quota obrigatória de questões ou de anteriores. Repertório dessas unidades foi atualizado em 18/09/2026; fatos posteriores ao edital foram identificados como Atualidades, não como legislação retroativa.

Desdobramentos pedagógicos estão autorizados se houver necessidade concreta: documentar a dificuldade, recorte que permanece no ID, novos assuntos/IDs livres, origem/destino/consumidores, dependências e ausência de sobreposição; criar C/H/Q `pending` e recalcular. Preservar U081–U158, identidades publicadas e rotas. Não contar pai agregador junto dos filhos nem dividir apenas por número de linhas. **Nenhum desdobramento adicional foi criado; permanecem 158 unidades.**

### Direito Penal — PC-E10 / U081–U090

Planejamento autorizado/materializado em 18/09/2026, token `PC-E10-PLANEJAMENTO-20260918-01`, base `ae8c6d3295427fda9ea8bd0fccf98990f1979df6`. A decisão distribuiu os dez IDs já previstos; não restaurou uma divisão histórica perdida. Grupo `conhecimentos-especificos/direito-penal/`, ordem 1, publicado com U081.

Origem de todas as unidades: nova/local, sem canônico ou doador integral compatível nos registros de aceite. Consumidor e corte comuns indicados na seção 5. Identidades pc-u081–pc-u090; ordens 81–90. Destinos: prefixo PC-MA + grupo + slug.

| Edital | ID / título / slug | Recorte e dependências | Estado recebido |
|---|---|---|---|
| 1; 1.1–1.9 | U081 — Aplicação da lei penal — `aplicacao-lei-penal` | Legalidade/anterioridade; lei no tempo/espaço; tempo/lugar do crime; leis excepcional, especial e temporária; territorialidade/extraterritorialidade; prazo; interpretação/analogia/irretroatividade. Abre o bloco | Checklist/aceite C/H/Q done; matriz recebida pending |
| 2; 2.1–2.2 | U082 — Teoria geral do crime e infração penal — `teoria-geral-crime-infracao-penal` | Conceitos, evolução histórico-doutrinária, elementos/espécies de infração, sujeitos ativo/passivo. U081 como moldura; vocabulário para as unidades seguintes | Checklist/aceite C/H/Q done; matriz recebida pending |
| 3; 3.1–3.2 | U083 — Fato típico, consumação, tentativa e concurso de crimes — `fato-tipico-consumacao-tentativa-concurso-crimes` | Fato típico/elementos, consumação/tentativa e concurso de crimes; depende de U082. Concurso de pessoas fica em U085 | Checklist/aceite C/H/Q done; matriz recebida pending |
| 3.3–3.6 | U084 — Ilicitude, punibilidade, excesso punível e culpabilidade — `ilicitude-punibilidade-excesso-culpabilidade` | Exclusão da ilicitude, punibilidade, excesso, culpabilidade/elementos/exclusões; U082–U083 como ponte. Imputabilidade aprofundada em U085 | Checklist/aceite C/H/Q done; matriz recebida pending |
| 4–5 | U085 — Imputabilidade penal e concurso de pessoas — `imputabilidade-penal-concurso-pessoas` | Pressupõe mapa de U082 e culpabilidade de U084; fecha parte geral, sem duplicar concurso de crimes | Checklist/aceite C/H/Q done; matriz recebida pending |
| 6 | U086 — Crimes contra a pessoa — `crimes-contra-pessoa` | Aplica U081–U085; Título I e seus seis capítulos; não absorver crimes especiais | Checklist/aceite C/H/Q done; matriz recebida pending |
| 7 | U087 — Crimes contra o patrimônio — `crimes-contra-patrimonio` | Aplica parte geral; Título II; lavagem/organização criminosa e leis especiais permanecem em PC-E14 | Checklist/aceite C/H/Q done; matriz recebida pending |
| 8 | U088 — Crimes contra a dignidade sexual — `crimes-contra-dignidade-sexual` | Título VI; proteção especial só quando indispensável ao tipo; preservar posição do artigo 232-A sem atribuir finalidade sexual | C/H/Q done |
| 9–11 | U089 — Crimes contra a incolumidade, a paz e a fé públicas — `crimes-incolumidade-paz-fe-publicas` | Três títulos autônomos, sem fundir bens jurídicos; não absorver organização criminosa da legislação especial | C/H/Q done |
| 12 | U090 — Crimes contra a administração pública — `crimes-contra-administracao-publica` | Tipicidade penal do Título XI, não regime administrativo geral; fronteira com PC-E12 | C/H/Q done |

A explicitação das divergências U081–U087 **não reabre aceites nem corrige registros alheios**. Os totais da seção 2 usam o conjunto de aceites expressamente registrado no corpo recebido. Antes de eventual edição dessas unidades, tratar a divergência conforme a regra de seleção, sem normalização automática.

Os artefatos e referências dos commits da seção 8 retêm o suporte normativo completo. Entre as particularidades documentadas nos aceites estão: exceção legal específica ao concurso formal na U083; remissão pendente do artigo 147-A na U086; mudanças patrimoniais de 2026 e revogação do antigo artigo 171, § 5º, na U087; atualizações de penas e vulnerabilidade, artigo 232-A e consulta pública/segredo na U088; atualização dos artigos 266, 282, 288 e 311 na U089; artigos 338-A, 337-A e 337-E–P e distinção entre continuidade típica e antiga irregularidade formal na U090. Estas são indicações do conteúdo recebido, não revalidação de vigência nesta intervenção.

### Direito Processual Penal — PC-E11 / U091–U097

Planejamento de 19/09/2026, token `PC-E11-PLANEJAMENTO-20260919-01`, base `283462304790bc5d2e5e95f09d6d1f0d8717de1e`. Grupo `conhecimentos-especificos/direito-processual-penal/`, ordem 2, publicado com U091. Origem nova/local, sem doador integral compatível nos registros disponíveis. Identidades pc-u091–pc-u097; ordens 91–97; destinos prefixo PC-MA + grupo + slug.

**Preservar as duas ocorrências do item “4” no programa.** A primeira é prisão em flagrante e a segunda prisão preventiva. Não corrigir para “4.1”.

| Edital | ID / título / slug | Recorte / dependências / fronteiras | C | H | Q |
|---|---|---|---|---|---|
| 1; 1.2 | U091 — Princípios gerais e sistemas de processo penal — `principios-gerais-sistemas-processo-penal` | Princípios, conceito, finalidade, características e sistemas; abre o bloco; garantias constitucionais como ponte | done | done | done |
| 2 | U092 — Inquérito policial — `inquerito-policial` | Depende da moldura U091; Lei 12.830/2013 fica em PC-E14 além da ponte indispensável | done | done | done |
| 3 | U093 — Prova no processo penal — `prova-processo-penal` | Artigos 158–250 do Código de Processo Penal; depende de U091; artigos 155–157 apenas como ponte, técnicas digitais na U031 e leis especiais fora do núcleo | done | done | done |
| 4, primeira ocorrência | U094 — Prisão em flagrante — `prisao-flagrante` | Depende de U091; separar captura em flagrante de fundamento autônomo de preventiva | done | done | done |
| 4, segunda ocorrência | U095 — Prisão preventiva — `prisao-preventiva` | Fronteiras com U094, U096 e cautelares diversas U097; preservar a duplicação de numeração | done | done | done |
| 5 | U096 — Prisão temporária — `prisao-temporaria` | Lei 7.960/1989 e alterações; não fundir requisitos e prazos com preventiva | done | done | done |
| 6 | U097 — Outras medidas cautelares — `outras-medidas-cautelares` | Cautelares diversas; fecha o bloco sem duplicar flagrante, preventiva ou temporária | done | done | done |

Cada célula representa a tarefa U091-C/H/Q até U097-C/H/Q. As 21 tarefas pertencem às 474 já contabilizadas. PC-E11-C/H/Q estão `done`: U091–U097 possuem C/H/Q completos e evidência na `main`.

### Direito Administrativo — PC-E12 / U098–U111

Planejamento materializado em 19/09/2026, token `PC-E12-PLANEJAMENTO-20260919-01`, base `5de063419c301922bf94607915af69df1dc9d889`. Fonte: Edital nº 1 — PCMA — Investigador, de 13/07/2026, item 20.2.3, seção **DIREITO ADMINISTRATIVO**. Esta organização é decisão editorial nova para tornar executáveis os 14 IDs U098–U111 já previstos; **não restaura uma divisão histórica perdida**.

Grupo já publicado: `conhecimentos-especificos/direito-administrativo/`, título `Direito Administrativo`, ordem 3, blob `f5227b3a62d3c822fc56c1323d4194f2c13dd93e`. Consumidor comum: `pc-ma-2026-oficial-investigador` / `pcma-2026-invest`. Identidades `pc-u098`–`pc-u111`, ordens 98–111. Destinos: prefixo físico PC-MA + grupo + slug.

A distribuição preserva literalmente os **13 itens** do edital. Para compatibilizá-los com os **14 IDs** já reservados no planejamento, somente o item **9** é desdobrado: U106 cobre controle administrativo/judicial/legislativo e U107 cobre responsabilidade civil do Estado. São regimes independentes, com objetivos, fontes e jurisprudência próprios; o desdobramento evita uma aula excessivamente heterogênea sem duplicar cobertura. Nenhum ID novo foi criado e U101 foi preservada exatamente como publicada.

Classificação PC-R02 recebida: **U101 parcial**; **U098–U100 e U102–U111 novas**. Para as unidades novas, não há SHA doadora. Para U101, a classificação parcial é preservada, mas o doador/SHA antigo não é recuperável no estado autoritativo atual e **não foi inventado**; o pacote físico já aceito na `main` é a evidência corrente.

| Edital | ID / título / slug | Recorte, dependências e fronteiras | Origem / evidência | C | H | Q |
|---|---|---|---|---|---|---|
| 1 | U098 — Estado, Governo e Administração pública — `estado-governo-administracao-publica` | Conceitos de Estado, Governo e Administração pública; elementos, poderes e organização; natureza, fins e princípios. Abre o bloco e fornece vocabulário para U099, U102, U105–U107 | nova/local; sem doador integral | done | done | done |
| 2 | U099 — Organização administrativa da União — `organizacao-administrativa-uniao` | Administração direta e indireta da União. Depende da moldura U098; não absorver os regimes estaduais e policiais de U108–U111 | nova/local; sem doador integral | done | done | done |
| 3 | U100 — Regime dos servidores públicos civis federais — Lei 8.112/1990 — `servidores-publicos-federais-lei-8112` | Lei nº 8.112/1990 e alterações no recorte integral do edital. Regime federal; não fundir com a Lei estadual 6.107/1994 (U109) nem com estatutos policiais | nova/local; sem doador integral | done | done | done |
| 4 | U101 — Licitações: modalidades, dispensa e inexigibilidade — `licitacoes-modalidades-dispensa-inexigibilidade` | Lei nº 14.133/2021 e alterações: modalidades, dispensa e inexigibilidade. Preservar escopo e identidade já publicados; não ampliar para contratos administrativos sem item próprio no edital | parcial/local já aceita; C `837374eb88b0919369d8bcda66be71def6958c0f`; H `cb2afe7cdd060531319c3ee846be248c05d2329c`; R `4f90cd51576e4ba1531f5326f1123c5632b6d41e`; Q `fbea66d7513b5d28e40f505a039afa0d494cf402` | done | done | done |
| 5; 5.1–5.7 | U102 — Atos administrativos — `atos-administrativos` | Conceito, requisitos, elementos, pressupostos, classificação; fato e ato; espécies; cassação; revogação/anulação; processo administrativo; validade, eficácia e autoexecutoriedade. Depende de U098 | nova/local; sem doador integral; snapshot `8b6a244ba94b2712e62037940bd192de9cb868ce` | done | done | done |
| 6 | U103 — Regime dos funcionários policiais civis da União e do Distrito Federal — Lei 4.878/1965 — `regime-policiais-civis-uniao-df-lei-4878` | Lei nº 4.878/1965 e alterações, **como literalmente exigida pelo edital**. Auditar vigência e aplicabilidade no corte durante a produção; não substituir silenciosamente pelo regime da PC-MA | nova/local; sem doador integral; snapshot `3c1f3e9d881eec312b322993a78d44e099bc3397` | done | done | done |
| 7 | U104 — Improbidade administrativa — Lei 8.429/1992 — `improbidade-administrativa-lei-8429` | Sanções aos agentes públicos nos casos descritos pelo item 7 e Lei nº 8.429/1992 com alterações. Preservar a formulação literal do edital e revalidar a redação legal vigente no corte | nova/local; apoio parcial dos canônicos de improbidade; snapshot `e9c1fc36912ea873b59839f3d1ff156497029cdd` | done | done | done |
| 8 | U105 — Poderes administrativos — `poderes-administrativos` | Poder hierárquico, disciplinar, regulamentar, poder de polícia, uso e abuso do poder. Depende do mapa institucional de U098; não duplicar controle de U106 | nova/local; apoio parcial de duas aparições físicas TCE; snapshot `99a34a6044c291dde3723dada96ef50d9240106e` | done | done | done |
| 9 — controle | U106 — Controle da Administração pública — `controle-administracao-publica` | Controle administrativo, judicial e legislativo. Desdobramento editorial do primeiro núcleo do item 9; dialoga com U105, mas não absorve responsabilidade civil | nova/local; apoio parcial de duas aparições físicas TCE e dois canônicos especializados; snapshot `41e19b326d8f6b8b9728868afda1823796ae7905` | done | done | done |
| 9 — responsabilização | U107 — Responsabilidade civil do Estado — `responsabilidade-civil-estado` | Responsabilidade civil do Estado. Desdobramento editorial do segundo núcleo do item 9; regime material próprio, sem repetir modalidades de controle de U106 | nova/local; apoio parcial de duas aparições físicas TCE; snapshot `6be4cab5ee0dfcfeec1895e24502aa68a7b9e0cf` | done | done | done |
| 10 | U108 — Estatuto da Polícia Civil do Estado do Maranhão — Lei Estadual 8.508/2006 — `estatuto-policia-civil-maranhao-lei-8508` | Lei Estadual nº 8.508/2006 e alterações. Regime policial estadual; fronteira com U109, U110 e U111 deve ser explicitada por assunto | nova/local; sem doador integral; snapshot `93d0f6f0bfbe127f057867e52eee285743fd8d5c` | done | done | done |
| 11 | U109 — Regime jurídico único dos servidores públicos civis do Maranhão — Lei Estadual 6.107/1994 — `regime-juridico-servidores-maranhao-lei-6107` | Lei Estadual nº 6.107/1994 e alterações. Regime geral estadual; não duplicar o estatuto policial específico de U108 | nova/local; apoio parcial TCE em deveres/proibições/responsabilidade; snapshot `0f63eb3e076913951efaa98f8d5aa36549a0baa7` | done | done | done |
| 12 | U110 — Organização administrativa da Polícia Civil do Maranhão — Lei Estadual 10.238/2015 — `organizacao-policia-civil-maranhao-lei-10238` | Lei Estadual nº 10.238/2015 e alterações. Organização administrativa da PC-MA; ponte com U099 apenas para conceitos gerais, sem substituir a lei estadual | nova/local; sem doador integral; snapshot `b5f2cdaeba834e7a432caa38db9b0a4d678983a2` | done | done | done |
| 13 | U111 — Lei Orgânica Nacional das Polícias Civis — Lei 14.735/2023 — `lei-organica-nacional-policias-civis-lei-14735` | Lei nº 14.735/2023 no recorte integral exigido. Norma nacional; explicar articulação com U108–U110 sem fundir os diplomas | nova/local; sem doador integral; snapshot `5c7516e3ca5eaacbfc092eaf6482ec35f12279e4` | done | done | done |

**PC-E12 concluído:** U098–U111 possuem C/H/Q `done` e evidência na `main`. A ordem global segue para PC-E13 — Direito Constitucional, conforme o planejamento materializado na seção seguinte.

**Controle de corte:** todas as unidades usam corte legislativo de **13/7/2026** e a regra jurisprudencial registrada na seção 3. As leis estaduais/federais citadas devem ser revalidadas na produção; eventual revogação, alteração, conflito aparente ou problema de aplicabilidade será explicitado sem corrigir o edital silenciosamente.


### Direito Constitucional — PC-E13 / U112–U122

Planejamento materializado em 20/09/2026, token `PC-E13-PLANEJAMENTO-20260920T0843-01`, base `ef86b24476ed5c6bd9e94397841ba2e5ada6b216`. Fonte: [Edital nº 1 — PCMA — Oficial Investigador, de 13/07/2026](https://cdn.cebraspe.org.br/concursos/PC_MA_26_INVESTIGADOR/arquivos/9EE70E72CE79EB274C5319BEEB5B9B7D8519FF48DA21986A0830B5DB02C4F8B0.pdf), item 20.2.3, seção **DIREITO CONSTITUCIONAL**. Esta organização é uma **decisão editorial nova** para tornar executáveis os 11 IDs U112–U122 já reservados; não restaura uma divisão histórica perdida.

O edital contém **12 itens principais** (1–12) para apenas **11 IDs** preservados. Para compatibilizá-los sem criar ou deslocar identidades, somente os itens **3 e 4** são reunidos em U114: direitos e garantias fundamentais + remédios constitucionais. A junção é funcional porque habeas corpus, habeas data, mandado de segurança, mandado de injunção e ação popular operam como instrumentos constitucionais de tutela dentro do mesmo núcleo de direitos e garantias. Os demais itens permanecem individualizados. Nenhum ID novo foi criado.

Grupo publicado com o primeiro pacote completo de U112: `conhecimentos-especificos/direito-constitucional/`, título `Direito Constitucional`, ordem 4, blob `72f92c43fbfd3c52571cb480fab5856f6918f6ff`. Consumidor comum: `pc-ma-2026-oficial-investigador` / `pcma-2026-invest`. Identidades `pc-u112`–`pc-u122`, ordens 112–122. Destinos: prefixo físico PC-MA + grupo + slug.

A classificação PC-R02 permanece autoritativa: **U112–U122 são novas/locais**. Não existe grupo canônico de Direito Constitucional em `src/content/biblioteca/` e não foi encontrado vínculo compatível. O acervo do TCE contém pacotes físicos úteis como **apoio parcial**, mas isso não altera a classificação nem autoriza `vinculo.json`, cópia cega ou aceite sem auditoria. As #765/#766 não possuem reserva concorrente nem implantação publicada desses destinos nesta consolidação.
| Edital | ID / título / slug | Recorte, dependências e fronteiras | Apoio físico observado / SHA de árvore | C | H | Q |
|---|---|---|---|---|---|---|
| 1; 1.1 | U112 — Estado e Constituição — conceito, conteúdo, objeto e classificação — `estado-e-constituicao` | Estado e Constituição; conceito, conteúdo, objeto e classificação da Constituição. Abre o bloco; não antecipar emendas, princípios ou aplicabilidade além da ponte mínima | nova/local; TCE Noções `cf88-conceito-classificacoes-emendas/`, árvore `3ce14775185bf4a2a6f4b882e54d930666456cac`, usado seletivamente; snapshot `016c3b2c0a460ba9ee7036d587dbd237d375a6c6` | done | done | done |
| 2; 2.1–2.2 | U113 — Constituição Federal de 1988 — preâmbulo, princípios fundamentais, dignidade da pessoa humana e direitos humanos — `cf88-preambulo-principios-fundamentais` | Constituição de 1988; preâmbulo; arts. 1º–4º; dignidade da pessoa humana e direitos humanos no recorte constitucional. Não absorver a teoria ampla de direitos humanos de PC-E15 | nova/local; apoio parcial TCE Geral `constituicao-1988-principios-fundamentais/`; snapshot `1e7a5014641826a8afa9edc4faa9c6484eda48fa` | done | done | done |
| 3; 3.1; 4 | U114 — Direitos e garantias fundamentais e remédios constitucionais — `direitos-garantias-remedios-constitucionais` | Direitos/deveres individuais e coletivos; direitos sociais; nacionalidade; direitos políticos; partidos; habeas data, habeas corpus, mandado de segurança, ação popular e mandado de injunção. Única junção do bloco; U113 fornece apenas a ponte de dignidade/fundamentos | nova/local; apoio físico TCE auditado, com adaptação de corte e Tema 280; snapshot `a70d4f12220240498d09d30449d6ad88cda94d21` | done | done | done |
| 5; 5.1 | U115 — Organização político-administrativa do Estado — `organizacao-politico-administrativa-estado` | Estado federal brasileiro, União, Estados, Distrito Federal, Municípios e Territórios. Repartição de competências somente na medida necessária ao item; não importar automaticamente todo o pacote mais amplo do TCE | nova/local; apoio parcial TCE Geral `organizacao-politico-administrativa-estado/`; snapshot `97982b8e8582ef134792f20dae9c283a93066e89` | done | done | done |
| 6; 6.1 | U116 — Administração pública e servidores públicos na Constituição — `administracao-publica-servidores-publicos` | Disposições gerais e servidores públicos, com foco no recorte constitucional. Dialoga com Direito Administrativo, mas não repete Lei 8.112/1990 nem estatutos estaduais/policiais | nova/local; apoio físico TCE auditado; EC 135/2024, EC 138/2025 e ADI 2.135 revalidados; snapshot `9e45c836d08eac0783ccabfae275d3b6c76f1e54` | done | done | done |
| 7; 7.1 | U117 — Poder Executivo — atribuições e responsabilidades do Presidente da República — `poder-executivo-presidente-republica` | Poder Executivo federal, atribuições e responsabilidades presidenciais. Não ampliar para organização administrativa de U099 nem para detalhamento ministerial sem necessidade do recorte | nova/local; apoio físico TCE Geral `poder-executivo-presidente-republica/` auditado, árvore `935af0aaeb5a68875f60dcdce6525be90573c975`; Constituição, Lei 1.079/1950 e interpretação do art. 86 revalidadas; snapshot `46bf56a9b877bb68483ea41d6b180b55a04fc9cf` | done | done | done |
| 8; 8.1–8.2 | U118 — Poder Legislativo — estrutura, funcionamento e atribuições — `poder-legislativo` | Estrutura, funcionamento e atribuições. Processo legislativo, fiscalização contábil/financeira/orçamentária e comissões parlamentares de inquérito não são importados automaticamente do doador quando excederem o item PC | nova/local; apoio físico TCE Geral `poder-legislativo/` auditado, árvore `8b358ec43917b9f6781025fc8d989aa570bbfc1a`; recorte concentrado nos arts. 44–58, com CPI apenas no núcleo literal; snapshot `1f81b6c035c1f6d7bd175fd2c33dd9a9fcc57d6b` | done | done | done |
| 9; 9.1 | U119 — Poder Judiciário — disposições gerais — `poder-judiciario` | Somente disposições gerais necessárias ao item 9.1. Órgãos, competências específicas e Conselho Nacional de Justiça do pacote TCE são fronteira, não cobertura automática | nova/local; apoio físico TCE Geral `poder-judiciario/` auditado, árvore `7610d95da2f769f40db18019a6b08df97491df8d`; recorte concentrado nos arts. 92–100, com EC 130/2023, EC 134/2024 e EC 136/2025 revalidadas; snapshot `401c841cbfdc2e14a4ad5c31a0ec38e4f7e93fda` | done | done | done |
| 10 | U120 — Funções essenciais à Justiça — Advocacia, Ministério Público, Advocacia Pública e Defensoria Pública — `funcoes-essenciais-justica` | Preservar **Advocacia** como item literal além de Ministério Público, Advocacia Pública e Defensoria Pública. Não tratar essas funções como integrantes do Poder Judiciário | nova/local; apoio físico TCE Geral `funcoes-essenciais-justica/` auditado, árvore `15b3fdda3f3a7a8c60c3e18743f26aee1920dd44`; arts. 127–135 revalidados, Advocacia do art. 133 incorporada como núcleo próprio; snapshot `feecaac55f1e9ab1bb94fdb4aedca87f0238c98c` | done | done | done |
| 11; 11.1–11.2 | U121 — Defesa do Estado e das instituições democráticas — segurança pública — `defesa-estado-seguranca-publica` | Defesa do Estado e das instituições democráticas; segurança pública e sua organização. Fazer ponte com U111 somente para a Polícia Civil, sem transformar a Lei 14.735/2023 em substituto do art. 144 e dos demais órgãos constitucionais | nova/local; sem doador integral; Constituição arts. 136–144 e fontes primárias revalidadas; ponte seletiva U111 somente para Polícia Civil; STF ADI 6.457, Tema 656 e ADPF 1.214 auditados; snapshot `8424c7feca7d7a23fb86510d5d10b9f143fe812a` | done | done | done |
| 12; 12.1–12.4 | U122 — Ordem social — seguridade social, meio ambiente, família e grupos protegidos — `ordem-social-seguridade-meio-ambiente-familia` | Base e objetivos da ordem social; seguridade social; meio ambiente; família, criança, adolescente, idoso e indígena. Não antecipar legislação infraconstitucional específica sem necessidade | nova/local; apoio seletivo TCE Noções `constituicao-federal-artigos-23-170-225-231/`, árvore `ccac1f14f63196bea99f23270328fe12e9462d5a`, apenas arts. 225/231; demais núcleos produzidos de fontes primárias; snapshot `87653efc1e5c9c94ba81d3e724524c1adae1cdb0` | done | done | done |

**PC-E13 concluído:** U112–U122 estão publicadas e C/H/Q `done`. Antes de iniciar PC-E14, materializar a divisão individual U123–U141 a partir do edital oficial, porque o agregado recebido não preserva títulos/recortes/diplomas suficientes para selecionar U123 sem inferência.

**Controle de corte e fontes primárias:** a produção usará a [Constituição Federal compilada](https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm) no estado aplicável ao corte legislativo de **13/7/2026**. A consulta de planejamento em 20/09/2026 confirmou a [Emenda Constitucional nº 139, de 5/5/2026](https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc139.htm), publicada em 6/5/2026, como alteração constitucional anterior ao corte a ser considerada quando material ao recorte; ela alterou o § 1º do art. 31 e o art. 75. Em U115, a [Lei Complementar nº 230, de 15/4/2026](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp230.htm), publicada em 16/4/2026, deve ser auditada na aplicação do art. 18, § 4º, sem expandir o capítulo além do edital. Jurisprudência seguirá a regra temporal registrada na seção 3, sem converter o corte legislativo em corte jurisprudencial por inferência.

### Legislação Especial — PC-E14 / U123–U141

Planejamento materializado em 20/09/2026, token `PC-E14-PLANEJAMENTO-20260920T1155-01`, base `56f1fb1b337bfb02b54461e02c3cbd82c2da3a16`. Fonte programática: [Edital nº 1 — PCMA — Oficial Investigador, de 13/07/2026](https://cdn.cebraspe.org.br/concursos/PC_MA_26_INVESTIGADOR/arquivos/9EE70E72CE79EB274C5319BEEB5B9B7D8519FF48DA21986A0830B5DB02C4F8B0.pdf), item 20.2.3, seção **LEGISLAÇÃO ESPECIAL**. A conferência visual das páginas do programa confirma **20 itens numerados** para os **19 IDs U123–U141** já preservados.

A compatibilização usa uma única junção: os itens **8 e 13** remetem à mesma Lei nº 12.830/2013 e ao mesmo núcleo — investigação criminal conduzida pelo delegado de polícia — e, por isso, são reunidos em U130. Nenhum ID foi criado, removido ou deslocado. Os demais itens permanecem individualizados e na ordem do edital.

#### Literalidades defeituosas ou historicamente desatualizadas preservadas

- O item 3 escreve **“Lei nº 9.455/1965”**. A fonte primária oficial confirma **Lei nº 9.455, de 7/4/1997**. U125 usa 1997, sem apagar o erro literal do edital.
- O item 4 escreve **“Lei nº 8.069/1970”**. A fonte primária oficial confirma **Lei nº 8.069, de 13/7/1990**. U126 usa 1990, preservando esta divergência documental.
- O item 15 usa a denominação **“Estatuto do Idoso”**. A Lei nº 14.423/2022 atualizou a denominação oficial da Lei nº 10.741/2003 para **Estatuto da Pessoa Idosa**. U136 usa a nomenclatura jurídica vigente e registra a forma literal do edital.
- Os itens 8 e 13 são duplicação material da Lei nº 12.830/2013; a duplicação é preservada na coluna “Edital” e não gera aula duplicada.

#### Estrutura e identidade

Grupo publicado com o primeiro pacote completo de U123: `conhecimentos-especificos/legislacao-especial/`, título **Legislação Especial**, ordem **5**, blob `46e77cc0f43cf786a09a8bbb477fa71a7091d0a0`. Consumidor comum: `pc-ma-2026-oficial-investigador` / `pcma-2026-invest`. Identidades preservadas `pc-u123`–`pc-u141`, ordens 123–141. Destinos: prefixo físico PC-MA + grupo + slug da tabela abaixo.

A classificação PC-R02 permanece autoritativa: **U123–U141 são novas/locais**. A auditoria do inventário na `main` `56f1fb1b337bfb02b54461e02c3cbd82c2da3a16`, da biblioteca e dos acervos TCE/SEAP/Perícia não identificou pacote físico/canônico integral compatível com nenhuma das 19 unidades. Há apenas apoios parciais ou incidentais, que não mudam a classe nem autorizam `vinculo.json`: U092 — inquérito policial (`conteudo.md` `7afe860d0f6dd474774dc8c5cade2eb8cdb642c8`) para U130; U086 — crimes contra a pessoa (`4066794885c6b2f7b54dfce896ef565a3365e490`) para U129; U096 — prisão temporária (`0c327148769f1fe20616e91a8dd030bb2d9a902a`) para U124/U132; biblioteca `estatuto-igualdade-racial-fundamentos-direitos` (`8eb5f97caddf3274a2215fe6883939edfaf5bac7`) para U133; e biblioteca `acessibilidade-prioridade-atendimento` (`f0d4cfd100e4608d44920012f23e6d821ba8bc11`) para U136. Cada apoio deverá ser lido integralmente e auditado antes de qualquer cópia.

| Edital | ID / título / slug | Recorte e literalidade | Origem / reaproveitamento | Dependências e fronteiras | C | H | Q |
|---|---|---|---|---|---|---|---|
| 1 | U123 — Lei de Drogas — tráfico ilícito e uso indevido de substâncias entorpecentes — `lei-drogas-lei-11343` | Lei nº 11.343/2006 integral no estado aplicável ao corte; preservar Sistema Nacional de Políticas Públicas sobre Drogas, prevenção/tratamento, crimes, investigação e procedimento, sem reduzir o item apenas ao tráfico | nova/local; fontes primárias; sem doador integral; snapshot `7e25095085350dd42b32651d0f1bb05c0e4ca343` | Lei nº 15.281/2025 e Lei nº 15.358/2026 incorporadas no que alteram o diploma antes do corte; Tema 506 e jurisprudência oficial revalidados em 20/9/2026 | done | done | done |
| 2 | U124 — Abuso de autoridade — Lei 13.869/2019 — `abuso-autoridade-lei-13869` | Lei nº 13.869/2019 integral: sujeitos, finalidade específica, crimes, efeitos, penas restritivas, procedimento e alterações legislativas | nova/local; apoios U090/U096 apenas incidentais; snapshot `530e79176b3c8bf39d39e3924c791eb02dbcfc1c` | Lei nº 14.321/2022 incorporada no art. 15-A; art. 7º-B atualizado pela Lei nº 14.365/2022; ADI 7.201 ainda sem decisão colegiada final na revalidação; busca domiciliar 5–21 h conforme STJ | done | done | done |
| 3 | U125 — Crimes de tortura — Lei 9.455/1997 — `crimes-tortura-lei-9455` | Lei nº 9.455/1997 integral. O ano **1965** é erro literal do edital, preservado acima | nova/local; fontes primárias; snapshot `74e0556a36812b92b336ed4d760db513208f02f7` | Lei nº 15.410/2026 incorporada no inciso III; regime inicial fechado não tratado como automático; perda do cargo, posição de garante e extraterritorialidade revalidados em jurisprudência oficial | done | done | done |
| 4 | U126 — Estatuto da Criança e do Adolescente — Lei 8.069/1990 — `estatuto-crianca-adolescente-lei-8069` | Lei nº 8.069/1990 integral. O ano **1970** é erro literal do edital, preservado acima | nova/local; fontes primárias; U122 apenas apoio constitucional; snapshot `8860a3e26163a442b86791622ea90d4ba1eff8e4` | Corte reconstruído: Leis 15.413/2026 e 15.426/2026 incorporadas; Lei 15.450/2026 excluída por vacatio; Lei 15.487/2026 excluída por ser pós-corte; crimes digitais retrocedidos à redação vigente em 13/7/2026 | done | done | done |
| 5 | U127 — Estatuto do Desarmamento — Lei 10.826/2003 — `estatuto-desarmamento-lei-10826` | Lei nº 10.826/2003 integral, incluindo registros, porte, crimes e disposições correlatas exigidas pelo diploma | nova/local; fontes primárias; snapshot `264bd0ee22fe42d16e760823d93f72b471426840` | Lei nº 15.358/2026 incorporada no art. 21-A; Leis nº 14.967/2024 e 15.306/2025 incorporadas; ADI 3.112, guardas municipais, registro vencido, ineficácia absoluta e referendo revalidados em fontes oficiais | done | done | done |
| 6 | U128 — Crimes ambientais — Lei 9.605/1998 — `crimes-ambientais-lei-9605` | Lei nº 9.605/1998 no recorte integral do diploma citado, com ênfase penal sem apagar disposições gerais, processuais e administrativas necessárias à compreensão da lei | nova/local; fontes primárias; U122 apenas apoio constitucional; snapshot `c4ab59d6f8befcf5854e4a5c47c0cdb51df04250` | Leis nº 14.944/2024, 15.150/2025, 15.190/2025, 15.299/2025 e 15.355/2026 incorporadas; pessoa jurídica sem dupla imputação obrigatória, Tema 1.377, art. 48 permanente e ADPF 640 revalidados | done | done | done |
| 7 | U129 — Lei Maria da Penha — Lei 11.340/2006 — `lei-maria-penha-lei-11340` | Lei nº 11.340/2006 integral: conceitos, formas de violência, assistência, medidas protetivas, atuação policial/judicial e disposições penais/processuais pertinentes | nova/local; apoio incidental U086; snapshot `a0345091a78b118d6fdaf99d623f3c5fe23a6c54` | Leis nº 15.380, 15.383, 15.384, 15.411, 15.412, 15.438 e 15.455/2026 incorporadas; Tema 1.249 e súmulas revalidados; tensão jurisprudencial do art. 20 registrada sem falsa uniformização | done | done | done |
| 8; 13 | U130 — Investigação criminal conduzida pelo delegado de polícia — Lei 12.830/2013 — `investigacao-criminal-delegado-lei-12830` | Lei nº 12.830/2013 integral. Esta unidade absorve as duas ocorrências do edital sem duplicação física | nova/local; apoio parcial U092, conteúdo `7afe860d0f6dd474774dc8c5cade2eb8cdb642c8`; snapshot `deab3c171c5472c55f1688cf4aaf38c78e37449a` | ADI 5.043 incorporada: investigação não é monopólio do delegado; ADIs 5.059/5.073 pendentes em 20/9/2026; requisição, avocação, remoção e indiciamento revalidados | done | done | done |
| 9 | U131 — Lavagem de dinheiro — Lei 9.613/1998 — `lavagem-dinheiro-lei-9613` | Lei nº 9.613/1998 integral: tipos, medidas, deveres preventivos, comunicação/controle e procedimento aplicável | nova/local; fontes primárias; snapshot `d4863b22519c95a8efa310f4918c1e5a709fd109` | Lei nº 15.358/2026 incorporada nos arts. 4º-A e 7º; ativos virtuais/CNPEP e estrutura atual do Coaf incorporados; art. 17-D inconstitucional; Tema 990 e autolavagem revalidados | done | done | done |
| 10 | U132 — Crimes hediondos — Lei 8.072/1990 — `crimes-hediondos-lei-8072` | Lei nº 8.072/1990 integral no corte, com rol, consequências e regras especiais vigentes | nova/local; apoio incidental U096; snapshot `35dbc23a0d4539cc479566fb393661a903259060` | Lei nº 15.358/2026 incorporada; Lei nº 15.487/2026 pós-corte excluída; Tema 972, SV 63, Súmula 668/STJ e Tema 1.355/STJ revalidados | done | done | done |
| 11 | U133 — Crimes resultantes de preconceito de raça ou cor — Lei 7.716/1989 — `crimes-preconceito-raca-cor-lei-7716` | Lei nº 7.716/1989 integral no corte, preservando tipos, causas e disposições gerais atuais | nova/local; apoio conceitual canônico `estatuto-igualdade-racial-fundamentos-direitos`, blob `8eb5f97caddf3274a2215fe6883939edfaf5bac7`; snapshot `d733eecd1168de9e747744be4847f1ff0b09dace` | Lei nº 14.532/2023 incorporada; injúria racial, ADO 26/MI 4.733, HC 154.248, continuidade normativo-típica, racismo recreativo e efeitos não automáticos revalidados | done | done | done |
| 12 | U134 — Identificação criminal do civilmente identificado — Lei 12.037/2009 — `identificacao-criminal-lei-12037` | Lei nº 12.037/2009 integral, incluindo hipóteses, procedimentos e tratamento dos dados nos limites do diploma | nova/local; fontes primárias; snapshot `6396c10c3ca81cdb2fa42c191f387d5a10e273df` | Lei nº 15.295/2025 incorporada nos arts. 3º, VII, e 5º, §§ 1º–2º; Leis nº 12.654/2012 e 13.964/2019 absorvidas; RHC 162.703/STJ registrado com corte temporal e Tema 905/STF ainda sem tese final em 20/9/2026 | done | done | done |
| 14 | U135 — Juizados Especiais Criminais — Lei 9.099/1995 — `juizados-especiais-criminais-lei-9099` | Recorte **criminal** da Lei nº 9.099/1995, com disposições comuns indispensáveis, competência, composição civil, transação penal, procedimento e suspensão condicional do processo; não cobrir Juizado Especial Cível como assunto autônomo | nova/local; fontes primárias; snapshot `817e4071156a64fcdeb9cff397b3b21db966ac01` | Lei nº 11.313/2006, Lei nº 13.603/2018 e Lei nº 14.245/2021 incorporadas; art. 85 reconciliado com Lei nº 9.268/1996 e HC 79.474/STF; SV 35, Súmulas 203/243/337/536, Súmula 696/STF, ADI 1.719 e Tema 920/STJ revalidados | done | done | done |
| 15 | U136 — Estatuto da Pessoa Idosa — Lei 10.741/2003 — `estatuto-pessoa-idosa-lei-10741` | Lei nº 10.741/2003 integral. O edital usa “Estatuto do Idoso”; a denominação oficial vigente é “Estatuto da Pessoa Idosa” | nova/local; apoio parcial canônico `acessibilidade-prioridade-atendimento`, blob `f0d4cfd100e4608d44920012f23e6d821ba8bc11`; snapshot `e8e2b49dd97f881084a97e168db912e9418bc7a0` | Lei nº 14.423/2022 incorporada; Lei nº 15.163/2025 incorporada nos arts. 94/99; U122 apenas ponte do art. 230; ADI 3.768, Tema 952/STJ e art. 102/STJ revalidados | done | done | done |
| 16 | U137 — Crimes de trânsito — Lei 9.503/1997 — `crimes-transito-lei-9503` | Recorte dos crimes de trânsito do Código de Trânsito Brasileiro e disposições gerais/processuais diretamente necessárias a eles; não transformar U137 em curso integral de trânsito administrativo | nova/local; fontes primárias; snapshot `0ddbfa13780ee040563048fdc716998c39856b1f` | Capítulo XIX revalidado no corte; Lei 14.599/2023 incorporada na terminologia e redações pertinentes; mudanças de 2025/2026 fora do capítulo auditadas; Tema 907/STF, Súmulas 575/664/STJ e Informativo 893/STJ revalidados | done | done | done |
| 17 | U138 — Crimes eleitorais — Lei 4.737/1965 — `crimes-eleitorais-codigo-eleitoral-lei-4737` | Recorte penal do Código Eleitoral: crimes, sanções e disposições processuais diretamente ligadas; não cobrir Direito Eleitoral integral | nova/local; fontes primárias; snapshot `7391fe95fbad81d80fc251e3f1d259c97f8bb8fb` | Lei nº 15.358/2026 auditada: alterações nos arts. 5º/71, sem mudança do Título IV; anualidade 2026 registrada pelo TSE; Inq 4.435/STF, Tema 1.260/STF, art. 337 não recepcionado, execução e rito penal revalidados | done | done | done |
| 18 | U139 — Organização criminosa — Lei 12.850/2013 — `organizacao-criminosa-lei-12850` | Lei nº 12.850/2013 integral: conceito, crimes, investigação, meios de obtenção da prova, colaboração, infiltração, ação controlada e procedimento | nova/local; referências incidentais em PC-E10/E11, sem doador integral; snapshot `516f2b70ee03625901405465906d66c74adbd173` | Lei nº 15.245/2025 incorporada no art. 2º, § 1º, e nos arts. 21-A/21-B; Lei nº 15.487/2026 pós-corte excluída; Lei nº 15.358/2026 preservada como U140 sem falsa alteração da Lei nº 12.850; ADIs 5.508/5.567, Tema 1.441 e corroboração revalidados | done | done | done |
| 19 | U140 — Marco Legal do Combate ao Crime Organizado — Lei 15.358/2026 — `marco-combate-crime-organizado-lei-15358` | Lei nº 15.358/2026 integral — Marco Legal do Combate ao Crime Organizado no Brasil (Lei Raul Jungmann), crimes próprios, normas processuais/operacionais, desarticulação patrimonial, perda civil, bancos de dados e alterações legislativas promovidas | nova/local; fragmentos das alterações aparecem em PC-E10/E11, sem pacote integral; snapshot `3c5715315b12f7115f63cd9cf92c6fab9e4c548c` | Veto nº 14/2026 preservado no corte; sobreposição temporal da Lei nº 15.402/2026 no art. 112 da LEP e da Lei nº 15.397/2026 nos crimes patrimoniais revalidada; 44 questões autorais; cobrança FGV/MPRJ 2026 verificada sem reprodução integral | done | done | done |
| 20 | U141 — Interceptação telefônica — Lei 9.296/1996 — `interceptacao-telefonica-lei-9296` | Lei nº 9.296/1996 integral + ponte mínima indispensável para **conceito** e **provas ilícitas**, termos expressamente usados no edital | nova/local; U093 como fronteira de prova ilícita; U124/U139 como incidências; snapshot `bb478c51c0f3b841f95fba5363378b71463bd593` | Corte 13/7/2026; Leis nº 13.869/2019 e 13.964/2019 incorporadas; Temas 661 e 977/STF, serendipidade e competência aparente revalidados; ADIs 3.450/4.112 registradas como controvérsia em tramitação; 38 questões autorais + 2 anteriores verificadas | done | done | done |

#### Controle de corte e dependências legislativas

Toda unidade de PC-E14 deve ser produzida com a redação aplicável em **13/7/2026**, e não com o texto compilado atual sem reconstrução temporal. A Lei nº 15.358/2026, de 24/3/2026, entrou em vigor na data de publicação e alterou, entre outros diplomas do próprio bloco, as Leis nº 11.343/2006, nº 10.826/2003, nº 9.613/1998, nº 8.072/1990 e o Código Eleitoral; essas alterações são dependências de produção, não motivo para esperar U140. Também há alterações de 2026 anteriores ao corte que deverão ser absorvidas no respectivo diploma, como a Lei nº 15.410/2026 na Lei de Tortura e a Lei nº 15.455/2026 na Lei Maria da Penha.

A produção deve rejeitar contaminação pós-corte. Exemplo já identificado: a Lei nº 15.487/2026, publicada em agosto, alterou ECA, Crimes Hediondos e Lei nº 12.850/2013 depois de 13/7/2026; essas mudanças não pertencem à objetiva deste edital. O mesmo cuidado vale para alterações posteriores do Código de Trânsito Brasileiro. PC-F03 fará a revalidação final, mas cada U123–U141 precisa nascer com o corte correto.

**PC-E14 concluído:** U123–U141 estão C/H/Q `done`; PC-E14-C/H/Q passa a `done`.

### Direitos Humanos — PC-E15 / U142–U148

Planejamento individual materializado em **20/09/2026**, token `PC-E15-PLANEJAMENTO-20260920-01`, base `6d4169eae57d50b59d010f28f0cc2f9bc479b18b`. Fonte programática: [Edital nº 1 — PCMA — Oficial Investigador, de 13/07/2026](https://cdn.cebraspe.org.br/concursos/PC_MA_26_INVESTIGADOR/arquivos/9EE70E72CE79EB274C5319BEEB5B9B7D8519FF48DA21986A0830B5DB02C4F8B0.pdf), item 20.2.3, seção **DIREITOS HUMANOS**. A conferência textual e visual da página do programa confirma oito itens principais, 1–8, para sete IDs U142–U148 já preservados.

#### Programa literal preservado

1. Conceito, evolução e características dos direitos humanos.  
   1.1 Dimensões/gerações de direitos humanos.  
   1.2 Características e fundamentação.  
2. Direito internacional dos direitos humanos e o direito brasileiro.  
   2.1 Relação entre o direito internacional dos direitos humanos e o direito interno.  
   2.2 Procedimento de incorporação dos tratados de direitos humanos na perspectiva da Constituição Federal.  
   2.3 **Hierarquia dos tratados de direitos fundamentais na ordem jurídica interna brasileira.**  
   2.4 Princípios que regem as relações internacionais do Brasil.  
3. Sistema global de proteção dos direitos humanos.  
   3.1 Organização das Nações Unidas (ONU).  
   3.2 Declaração Universal dos Direitos Humanos (1948).  
   3.3 Pacto Internacional de Direitos Civis e Políticos (1966).  
   3.4 Pacto Internacional de Direitos Econômicos, Sociais e Culturais (1966).  
4. Sistema Regional Interamericano de Proteção dos Direitos Humanos.  
   4.1 Organização dos Estados Americanos (OEA).  
   4.2 Convenção Americana sobre Direitos Humanos (Pacto de San José da Costa Rica).  
   4.3 Comissão Interamericana de Direitos Humanos e Corte Interamericana de Direitos Humanos.  
5. Controle de convencionalidade.  
   5.1 Conceito, fundamentos e modalidades.  
6. Direitos humanos na Constituição Federal de 1988.  
   6.1 Dignidade da pessoa humana como fundamento da República.  
7. Direitos e proteção de grupos vulneráveis.  
8. Direitos humanos e atividade policial.  
   8.1 Papel das forças de segurança na promoção e proteção dos direitos humanos.  
   8.2 Prevenção e combate à tortura e aos maus-tratos.  
   8.3 Regras de uso da força e de armas de fogo pela ONU.

O item **2.3** é mantido exatamente como publicado — “tratados de direitos fundamentais” —, sem correção silenciosa. Na produção, a expressão deve ser explicada no contexto dos itens 2.1–2.2 e das fontes constitucionais/internacionais, sem reescrever o edital.

#### Decisão de divisão dos sete IDs

U142 e U144 já possuem identidades e material publicado. A U144 cobre 3/3.1/3.2 e seu próprio conteúdo e cheat sheet remetem expressamente os Pactos de 1966 a **U145**; essa fronteira é preservada. Restam quatro blocos consecutivos para apenas dois IDs finais: por isso, **U147 reúne 5+6** e **U148 reúne 7+8**. Não há criação, renumeração ou deslocamento de IDs.

- **U147 = controle de convencionalidade + proteção constitucional:** a junção é funcional porque o controle exige compreender o parâmetro internacional e sua articulação com a ordem interna; o art. 1º, III, funciona como âncora constitucional, sem repetir U113/U114.
- **U148 = grupos vulneráveis + atividade policial:** a junção conecta proteção reforçada de pessoas/grupos em situação de vulnerabilidade aos deveres operacionais de segurança pública, prevenção de tortura e uso da força; estatutos e leis especiais já estudados entram apenas como pontes, não como repetição integral.

Grupo existente: `conhecimentos-especificos/direitos-humanos/`, título **Direitos Humanos**, ordem **6**, blob `dcdda844f95a0f401cdb1e943b02c1c8e68972c1`. Consumidor comum: `pc-ma-2026-oficial-investigador` / `pcma-2026-invest`. Identidades preservadas `pc-u142`–`pc-u148`, ordens 142–148. Os cinco slugs novos foram pesquisados na `main` sem colisão; U144 conserva o slug publicado.

A classificação PC-R02 permanece autoritativa: **U142 e U144 são parciais; U143 e U145–U148 são novas/locais**. Apoio temático não muda a classe nem autoriza `vinculo.json`. #765 e #766 não registram reserva concorrente desta origem nesta preparação.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / dependências | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 1; 1.1; 1.2 | U142 — **Teoria geral dos direitos humanos** — conceito, evolução, características, dimensões/gerações e fundamentação | **parcial/local**; canônico auditado `nocoes-direitos-humanos/teoria-geral-direitos-fundamentais/`: C `10d5a904fd6faba4861d57d26cfce7ff5eed3929`, H `28b18575106d22fae5fa9a42e95da26ec35b2ba4`, R `eefc2f1e7f696b52511add3830bdac33742496a9`, Q `96306012ef1081a4bbb67dc062dfc3eb557c3609` | `teoria-geral-direitos-humanos`; físico PC-MA + grupo; `pc-u142`; 142 | Reaproveita distinções humanos/fundamentais/do homem, características e dimensões; completa evolução/fundamentação; U113/U114 são fronteiras | PC-MA; corte 13/7/2026; publicação `6284f683b02d1365ee665cc5f84c61dfc344ac8c`, referências finais `996d97373c59761d0b31e70b95183cf4192646a1` | done | done | done |
| 2; 2.1–2.4 | U143 — **Direito internacional dos direitos humanos e direito brasileiro — incorporação, hierarquia e relações internacionais** | **nova/local**; fontes primárias; apoios parciais auditados: canônico de teoria geral C `10d5a904fd6faba4861d57d26cfce7ff5eed3929`; U113 C `adf00fef2be25c59c6335db4f6dde1fc104fd3cc`; U114 C `da4cbe643726d9a0cb9d2d9887ade6a8f31b8ab1`; snapshot `718e9a5d27f145f521b91b5db93bafb3bb635128` | `direito-internacional-direitos-humanos-brasil`; físico PC-MA + grupo; `pc-u143`; 143 | Relação internacional/interna; incorporação como ato complexo; ratificação × promulgação; duplo estatuto (§ 3º = equivalente a emenda; sem § 3º = supralegal conforme STF); depositário infiel; artigo 4º comprimido. Literalidade peculiar do item 2.3 preservada. U145/U146/U147 mantidas como fronteiras | PC-MA; corte legislativo 13/7/2026; U142 como vocabulário; U113/U114 como fronteiras; fontes oficiais revalidadas em 20/9/2026 | done | done | done |
| 3; 3.1–3.2 | U144 — **Sistema global de proteção dos direitos humanos: Nações Unidas e Declaração Universal** | **parcial/local, done**; origem física atual `sistema-global-onu-dudh/`, publicação `a1049c04dcec9558e6588b2953a82b17ba41eb94`; blobs atuais C `2f98183d0de073ccddd9c416aa9a3801696fae0d`, H `5cbfbbcf9a754c042b0ad561834decb2188eb8f4`, R `6e0b74bc45b5513d11aeb632e9c9fe0dbf18f7a1`, Q `cde2bf84c2f54868d26f156027954624cd3aa7d0`. Doador histórico da classificação parcial não é inferido | `sistema-global-onu-dudh`; físico PC-MA + grupo; `pc-u144`; 144 | Sistema ONU, mecanismos básicos e DUDH. O canônico `nocoes-direitos-humanos/declaracao-universal-direitos-humanos/` é apoio compatível atual, não origem histórica presumida. A própria U144 fixa U145 para os Pactos | PC-MA; corte 13/7/2026; U142 como base conceitual; U145 recebe 3.3–3.4 | done | done | done |
| 3.3–3.4 | U145 — **Pactos Internacionais de 1966 — direitos civis e políticos; direitos econômicos, sociais e culturais** | **nova/local**; fontes primárias dos dois Pactos e atos brasileiros de promulgação; sem doador integral; snapshot `00ee81d6fcf57d5c3184ebd1e661598fefa01f61` | `pactos-internacionais-direitos-humanos-1966`; físico PC-MA + grupo; `pc-u145`; 145 | Obrigações-base: respeitar/garantir/recurso efetivo no PIDCP × medidas/máximo de recursos/realização progressiva no PIDESC; direitos civis, políticos, econômicos, sociais e culturais; derrogação e núcleo não derrogável; Comitê de Direitos Humanos criado pelo PIDCP; relatórios do PIDESC ao ECOSOC e Comitê criado em 1985; protocolos facultativos apenas como ponte. U143/U144 preservadas como fronteiras | PC-MA; corte 13/7/2026; Decretos 591/592 e fontes ONU revalidados em 20/9/2026; U143 fornece incorporação/hierarquia e U144 sistema global/DUDH | done | done | done |
| 4; 4.1–4.3 | U146 — **Sistema Interamericano de Direitos Humanos — OEA, Convenção Americana, Comissão e Corte** | **nova/local**; fontes primárias OEA/CADH, Decreto nº 678/1992, Decreto nº 4.463/2002 e Regulamento da Comissão; sem doador integral; snapshot `2e9169e20c1f149679192572fe5c6f7e00bf712e` | `sistema-interamericano-direitos-humanos`; físico PC-MA + grupo; `pc-u146`; 146 | Arquitetura OEA/CADH; obrigações e mapa de direitos; suspensão; emendas/protocolos; composição e competências da Comissão e da Corte; petições, admissibilidade/exceções, solução amistosa, medidas urgentes e fluxo pessoa→Comissão→eventual Corte. U143 preserva incorporação/hierarquia; U147 recebe controle de convencionalidade | PC-MA; corte 13/7/2026; fontes oficiais revalidadas em 21/9/2026; U143 como fronteira e U147 como dependente | done | done | done |
| 5; 5.1; 6; 6.1 | U147 — **Controle de convencionalidade e direitos humanos na Constituição Federal de 1988** | **nova/local**; fontes primárias CADH/Convenção de Viena/Constituição e jurisprudência oficial Corte IDH/STF; apoios U113/U114 e fronteiras U143/U146; snapshot `017f1aadec3af39d105dbfc125f97c89827c94cf` | `controle-convencionalidade-direitos-humanos-constituicao`; físico PC-MA + grupo; `pc-u147`; 147 | Conceito e fundamentos; atos comissivos/omissivos e parâmetro; matrizes nacional e internacional; evolução Almonacid e exercício ex officio dentro da competência; constitucionalidade × convencionalidade; efeito interno conforme duplo estatuto; distinção entre hierarquia nacional e responsabilidade internacional; dignidade, prevalência dos direitos humanos, art. 5º §§ 1º–4º e cláusula pétrea no limite do item 6. Não duplicar U113/U114/U143/U146 | PC-MA; corte legislativo 13/7/2026; fontes oficiais revalidadas em 21/9/2026; depende de U143/U146 e fornece base a U148 | done | done | done |
| 7; 8; 8.1–8.3 | U148 — **Proteção de grupos vulneráveis e direitos humanos na atividade policial** | **nova/local**; fontes oficiais ONU/OHCHR, Convenção contra a Tortura e normas nacionais; apoios incidentais auditados U121, U122, U125, U126, U129, U133, U136 e canônico LBI; snapshot `f6d10d28d9c6ffd9bb4f372ddc993c7929591f48` | `grupos-vulneraveis-atividade-policial-direitos-humanos`; físico PC-MA + grupo; `pc-u148`; 148 | Vulnerabilidade contextual sem presumir incapacidade; categorias de proteção especial do manual ONU sem rol fechado; pontes brasileiras seletivas; papel policial na promoção/proteção; proibição e prevenção de tortura/maus-tratos; Código de Conduta; Princípios Básicos 4–10, 13–16 e 22–26 sobre meios não violentos, necessidade/proporcionalidade, armas de fogo, uso letal, assembleias, custódia, reporte e responsabilidade. Não reensinar estatutos/leis especiais | PC-MA; corte legislativo 13/7/2026; fontes oficiais revalidadas em 21/9/2026; U142/U147 fornecem fundamentos e U121 moldura constitucional | done | done | done |

#### Ordem e critérios de produção

**PC-E15 concluído após o aceite de U148.** U142–U148 estão C/H/Q `done`; a sequência preservou sistema global, tratados, sistema interamericano e convencionalidade antes da aplicação policial.

Para U143 e U145–U148, PC-R02 determina **nova/local**. Apoios acima são somente materiais de fronteira/reaproveitamento seletivo e devem ser lidos integralmente antes de qualquer cópia; nenhum autoriza vínculo ou importação automática de questões. Na produção, pesquisar fontes primárias e questões anteriores verificáveis sem quota, reconstruir o corte legislativo de 13/7/2026 e aplicar a regra jurisprudencial do edital. Não ampliar “grupos vulneráveis” por enumeração arbitrária: partir de categorias/proteções sustentadas pelas fontes oficiais pertinentes e ensinar as pontes com os diplomas já estudados.

**Próxima unidade habilitada:** U149 — Fundamentos da Medicina Legal — conceitos, importância e divisões, C/H/Q `pending`. A preparação individual de U149–U155 foi materializada em 21/09/2026; o grupo `medicina-legal` permanece ausente e deve ser criado somente junto do primeiro pacote completo.



### Medicina Legal — PC-E16 / U149–U155

Planejamento individual materializado em **21/09/2026**, token `PC-E16-PLANEJAMENTO-20260921T0532-01`, base `f59ad79d1dfe4cb33264ebcc3be76e3dc24533eb`. Fonte programática: [Edital nº 1 — PCMA — Oficial Investigador, de 13/07/2026](https://cdn.cebraspe.org.br/concursos/PC_MA_26_INVESTIGADOR/arquivos/9EE70E72CE79EB274C5319BEEB5B9B7D8519FF48DA21986A0830B5DB02C4F8B0.pdf), item 20.2.3, seção **MEDICINA LEGAL**. A página do programa foi reconferida textual e visualmente nesta preparação. PC-F03 permanece responsável pela reconsulta final de publicações oficiais e pela distinção de qualquer alteração posterior aplicável.

#### Programa literal preservado

1. Conceitos, importância e divisões da medicina legal.  
2. Corpo de delito, perícia e peritos em medicina legal.  
3. Documentos médico-legais.  
   3.1 Conceitos de identidade, identificação e reconhecimento.  
4. Principais métodos de identificação.  
5. Lesões e mortes por ação contundente, por armas brancas e por projéteis de arma de fogo comuns e de alta energia.  
6. Conceito e diagnóstico da morte.  
   6.1 Fenômenos cadavéricos.  
   6.2 Cronotanatognose, comoriência e primoriência.  
   6.3 Exumação.  
   6.4 Causa jurídica da morte.  
   6.5 Morte súbita e morte suspeita.  
7. Exame de locais de crime.  
8. Modificadores e avaliação pericial da imputabilidade penal e da capacidade civil.  
   8.1 Doença mental, desenvolvimento mental incompleto ou retardado, perturbação mental.

A transcrição acima preserva a terminologia do edital, inclusive **“causa jurídica da morte”**, **“desenvolvimento mental incompleto ou retardado”** e **“perturbação mental”**. A produção pode explicar a terminologia técnica e seu contexto jurídico, mas não reescrever silenciosamente o programa.

#### Decisão de divisão dos sete IDs

O programa possui **oito itens principais para sete IDs preservados U149–U155**. Há uma única junção editorial:

- **U151 reúne os itens 3 + 4.** O próprio subitem 3.1 introduz identidade, identificação e reconhecimento, e o item 4 imediatamente cobra os principais métodos de identificação. Separar conceitos de métodos criaria dependência artificial e repetição. A unidade permanece internamente navegável entre documentos médico-legais e identificação.
- Itens 1, 2, 5, 6, 7 e 8 permanecem um a um em U149, U150 e U152–U155.

Não há criação ou renumeração de ID. Identidades planejadas e preservadas: `pc-u149`–`pc-u155`; ordens 149–155.

#### Estrutura consumidora

O grupo físico planejado é:

`src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-especificos/medicina-legal/`

Descriptor publicado **junto do primeiro pacote completo U149**:

- `schemaVersion: 1`
- título: **Medicina Legal**
- `order: 7`
- blob confirmado: `a76f7f63dd98bfa62fed7c8672f05197a604b949`

O grupo anterior publicado, Direitos Humanos, possui ordem 6; os sete slugs abaixo foram pesquisados na `main` em 21/09/2026 e não apresentaram colisão. Grupos não entram na rota pública e não recebem identidade persistida própria.

A classificação PC-R02 permanece autoritativa: **U149–U155 são novas/locais**. A busca no repositório e a auditoria dos apoios disponíveis não localizaram pacote integral médico-legal compatível; menções institucionais ou conteúdos jurídico-processuais não autorizam `vinculo.json`. #765 e #766 não registravam reserva concorrente desta origem nesta preparação; PER-E09 de #766 permanece futura e `pending`, sem material publicado que possa ser tratado como doador ou consumidor comprovado.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / dependências | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 1 | U149 — **Fundamentos da Medicina Legal — conceitos, importância e divisões** | **nova/local**; fontes oficiais CFM/CNRM e prova oficial Cebraspe; U110 apenas como contexto institucional; snapshot `2e5a7ef47149cde3c78e7455d897a86708251c8c` | `fundamentos-medicina-legal`; físico PC-MA + grupo Medicina Legal; `pc-u149`; 149 | Campo médico aplicado a questões jurídicas; paciente × periciado; importância investigativa/judicial; Medicina Legal × perícia × Criminalística; parte geral × especial; deontologia/diceologia; mapa de antropologia, traumatologia, asfixiologia, toxicologia, sexologia, tanatologia e psiquiatria forense sem antecipar U150–U155 | PC-MA; corte 13/7/2026; fontes oficiais revalidadas em 21/9/2026; fornece vocabulário e mapa ao bloco | done | done | done |
| 2 | U150 — **Corpo de delito, perícia e peritos em Medicina Legal** | **nova/local**; fontes normativas CPP/Leis nº 12.030/2009 e 12.842/2013/Resolução CFM nº 2.430/2025; U093 C `514a163e1778a22bd15e846339cede3cdef7d4ec` como fronteira processual; snapshot `171d2a25da31d093ebf3e1e59f2e81a56fe19566` | `corpo-delito-pericia-peritos-medicina-legal`; físico PC-MA + grupo; `pc-u150`; 150 | Corpo de delito × vestígio × exame; materialidade × autoria; perícia, objeto, quesitos, fluxo dado→achado→inferência→conclusão; autonomia/responsabilidade do perito; perito oficial criminal × médico-perito; assistente técnico; laudo e divergência. U093 mantém cadeia de custódia e rito processual detalhado | PC-MA; corte 13/7/2026; U149 como base; fontes oficiais revalidadas em 21/9/2026 | done | done | done |
| 3; 3.1; 4 | U151 — **Documentos médico-legais e identificação — identidade, reconhecimento e métodos** | **nova/local**; Resoluções CFM nº 2.381/2024, nº 2.418/2024 e nº 2.430/2025; AGU; ESPC/GO; INTERPOL; Polícia Científica/SC; U134 C `7ce73aa206eb1f3672c7f1804b0488391cfafb0d` e U093 C `514a163e1778a22bd15e846339cede3cdef7d4ec` como fronteiras; snapshot final `98e9cb4ba7f113dd3fab1498d31eb183ea1b7bf1` | `documentos-medico-legais-identificacao`; físico PC-MA + grupo; `pc-u151`; 151 | Nomenclatura profissional atual × taxonomia médico-legal clássica; atestado, relatórios, parecer, laudo/auto e estrutura do laudo; identidade × identificação × reconhecimento; requisitos de método; papiloscopia, odontologia, genética e antropologia; identificadores primários e comparação antes/depois da morte. U134 mantém o regime legal da identificação criminal; U093 mantém o rito de reconhecimento | PC-MA; corte 13/7/2026; fontes revalidadas em 21/9/2026; U149/U150 como base; U093/U134 como fronteiras | done | done | done |
| 5 | U152 — **Traumatologia médico-legal — lesões por ação contundente, armas brancas e projéteis** | **nova/local**; fontes médico-legais e científicas Eze/Ojifinni, Schmidt, Gill/Ely, Große Perdekamp/Pollak, Baum et al., Grossman et al. e estudo local de São Luís; Cebraspe PC-RO 2022; snapshot final `7bfb11cc0b2467d992507aebf3f39e173834dd79` | `traumatologia-medico-legal-lesoes-armas-projeteis`; físico PC-MA + grupo; `pc-u152`; 152 | Mecanismo→tecido→morfologia→limite; escoriação/equimose/hematoma/ferida contusa; ações cortante, perfurante, perfurocortante e cortocontundente; lesões de defesa com cautela; projétil perfurocontundente, energia/cavitação, entrada/resíduos/distância, Benassi/Hoffmann, saída, trajeto/trajetória, sedenho e alta energia sem limiar universal inventado. U153 mantém morte/tanatologia e U154 o local de crime | PC-MA; corte 13/7/2026; fontes revalidadas em 21/9/2026; U149–U151 como base; U153/U154 como fronteiras | done | done | done |
| 6; 6.1–6.5 | U153 — **Tanatologia forense — morte, fenômenos cadavéricos e cronologia médico-legal** | **nova/local**; Resolução CFM nº 2.173/2017, Lei nº 9.434/1997, Código Civil art. 8º, CPP art. 163, Ministério da Saúde, revisões de intervalo pós-morte e Cebraspe PC-RO 2022; U110 apenas como contexto institucional; snapshot `3fd6efac49a21362486b004f50195fc2e124734d` | `tanatologia-forense-morte-fenomenos-cadavericos`; físico PC-MA + grupo; `pc-u153`; 153 | Diagnóstico da morte e morte encefálica; algor, livor, rigor e desidratação; autólise, putrefação, maceração, mumificação e adipocera; cronotanatognose como estimativa integrada; comoriência e divergência terminológica primoriência/premoriência; exumação; causa médica × mecanismo × causa/maneira médico-legal; morte súbita × suspeita; SVO × IML. U154 mantém o exame de local | PC-MA; corte 13/7/2026; fontes revalidadas em 21/9/2026; U149–U152 como base; U154 como fronteira | done | done | done |
| 7 | U154 — **Exame médico-legal de locais de crime** | **nova/local**; CPP arts. 6º, 158-A/B, 164, 165 e 169; NIJ 2024 como apoio metodológico não normativo; U093/U152/U153 como fronteiras; provas oficiais Cebraspe PF 2025 e PC-RJ 2022; snapshot `337acf29a10f04e3398939152ef1604d63ab5274` | `exame-medico-legal-locais-crime`; físico PC-MA + grupo; `pc-u154`; 154 | Perinecroscopia e seu limite; preservação × início do exame; documentação antes de mover; posição e relação corpo/ambiente; local de encontro × lesão × morte; fenômenos pós-morte como teste de compatibilidade; lesões/roupas/sangue/intervenção médica; local alterado; relação espacial/defenestração; perinecroscopia × necropsia; Medicina Legal × Criminalística sem organograma nacional inventado | PC-MA; corte 13/7/2026; fontes revalidadas em 21/9/2026; U093 mantém cadeia de custódia, U152 lesões e U153 Tanatologia | done | done | done |
| 8; 8.1 | U155 — **Psiquiatria forense — imputabilidade penal e capacidade civil** | **nova/local**; Código Penal art. 26; CPP arts. 149–154; Código Civil arts. 1º, 3º, 4º e 1.783-A; Lei nº 13.146/2015; Resolução CFM nº 2.430/2025; literatura de Psiquiatria Forense; U085 C `3ddca37ced16bec08dc177bc95cbd571c35e43ec` como fronteira jurídico-penal; snapshot `e32e4fbec514febb820401e89a53c0be26a40345` | `psiquiatria-forense-imputabilidade-capacidade-civil`; físico PC-MA + grupo; `pc-u155`; 155 | Diagnóstico ≠ incapacidade; entendimento × autodeterminação; avaliação retrospectiva no fato; estado mental atual e fontes colaterais; terminologia legal × clínica; doença mental, desenvolvimento mental incompleto/retardado e perturbação mental/saúde mental; psicose, humor, neurocognição, deficiência intelectual e outros diagnósticos somente pelo efeito funcional; simulação/dissimulação; capacidade civil após LBI; curatela excepcional e limitada; tomada de decisão apoiada; penal × civil por objeto/tempo; laudos restritos ao quesito. U085 mantém efeitos dogmáticos e consequências penais | PC-MA; corte 13/7/2026; fontes revalidadas em 21/9/2026; U149/U150 como base; U085 como fronteira | done | done | done |

#### Ordem e critérios de produção

**Ordem habilitada:** U149 → U150 → U151 → U152 → U153 → U154 → U155.

A sequência ensina primeiro o objeto da disciplina, depois como a perícia médico-legal produz conhecimento e documentos; em seguida identificação, lesões, morte, integração no local e, por fim, avaliação psiquiátrico-forense. U154 pode usar U152/U153 como apoio, mas não depende de leitura perfeita a ponto de bloquear sua produção se esses capítulos já tiverem suas pontes mínimas.

Para todas as sete unidades, PC-R02 determina **nova/local**. U093, U085, U110 e U134 são apoios/fronteiras, não doadores integrais e não autorizam cópia automática de questões. Na produção, revalidar fontes médico-legais/institucionais e provas anteriores verificáveis sem quota; preservar a literalidade do programa e separar conceito médico-legal de consequência jurídica já ensinada em outras disciplinas.

**PC-E16 concluído:** U149–U155 estão publicados e aceitos com C/H/Q `done`. **Próxima preparação habilitada: PC-E17 — Criminologia — U156–U158**, cujos recortes individuais ainda precisam ser materializados a partir do programa literal antes da produção.


### Criminologia — preparação PC-E17

Preparação concluída sob `PC-E17-PLANEJAMENTO-20260921-01`, com base `3a6bcdb2f529fa93fa9197c499abbd983a32a9e1` e snapshot publicado `a0ee549ae9d135babfe4cd19041585fb14a5547c`. A comparação base→snapshot altera **somente este arquivo-mestre**, materializando planejamento sem criar grupo vazio, assuntos parciais ou alterar totais. U156–U158 permanecem C/H/Q `pending`.

Programa oficial revalidado no Edital nº 1 — PCMA — Investigador, de 13/07/2026, item 20.2.3. O edital atribui **3 questões objetivas** a Criminologia e traz literalmente:

1. Criminologia.  
   1.1 Conceito.  
   1.2 Métodos: empirismo e interdisciplinaridade.  
   1.3 Objetos da criminologia: delito, delinquente, vítima, controle social.  
2. Funções da criminologia.  
   2.1 Criminologia e política criminal.  
3. Modelos teóricos da criminologia.  
   3.1 Teorias sociológicas.  
   3.2 Prevenção da infração penal no Estado democrático de direito.  
   3.3 Prevenção primária.  
   3.4 Prevenção secundária.  
   3.5 Prevenção terciária.

A transcrição acima foi conferida diretamente na página 65 do PDF oficial em 21/09/2026. **Não importar do edital PC-MA 2017** os antigos itens “3.6 Modelos de reação ao crime” ou “4 Criminologia Ambiental”: eles não constam do programa 2026. Esta diferença é uma exclusão programática explícita, não correção silenciosa.

O grupo físico planejado é:

`src/content/assuntos/pc-ma-2026-oficial-investigador/conhecimentos-especificos/criminologia/`

Descriptor a publicar **somente junto do primeiro pacote completo U156**:

- `schemaVersion: 1`
- título: **Criminologia**
- `order: 8`
- descrição planejada: **Fundamentos, funções, teorias e prevenção criminológica aplicados à compreensão do crime e do controle social.**

O grupo Medicina Legal publicado possui ordem 7; o caminho `criminologia/grupo.json` está ausente na `main`, como esperado antes do primeiro pacote. Os três slugs e os `storageId` abaixo foram pesquisados na `main` em 21/09/2026 e não apresentaram colisão. Não criar grupo vazio nem arquivos parciais na etapa de planejamento.

A classificação PC-R02 permanece autoritativa: **U156–U158 são novas/locais**. Buscas no repositório por Criminologia, objetos da criminologia, política criminal, prevenção criminológica, teorias sociológicas e IDs `pc-u156`–`pc-u158` não localizaram origem física ou canônica integral compatível. #765 e #766 continuam sem reserva concorrente e sem pacote publicado que possa ser tratado como doador comprovado. Os anexos disponíveis no projeto são materiais do Tribunal de Contas do Estado do Maranhão e não oferecem recorte aderente.

| Edital | ID / título / recorte | Origem / SHA e classe | Slug / destino / identidade / ordem | Aproveitamento, lacunas e fronteiras | Consumidor / corte / dependências | C | H | Q |
|---|---|---|---|---|---|---|---|---|
| 1; 1.1–1.3 | U156 — **Fundamentos da Criminologia — conceito, métodos e objetos** | **nova/local**; Braga 2014 sobre empirismo/interdisciplinaridade; Revista da AGU sobre controle social; padrões/provas oficiais Cebraspe PC-MA Delegado 2025, PC-CE Delegado 2025, DEPEN e DPDF; snapshot `21147435173e18446521cdc1553c547c68a01a01` | `fundamentos-criminologia-conceito-metodos-objetos`; físico PC-MA + grupo Criminologia; `pc-u156`; 156 | Conceito e diferença funcional perante Direito Penal; empirismo com métodos quantitativos/qualitativos e limites dos dados; interdisciplinaridade como integração; delito como problema social além da fórmula normativa; delinquente sem essencialismo; vítima/vitimologia e vitimização secundária; controle social formal × informal; correlação × causalidade; limite perante Criminalística. U157 mantém funções/política criminal e U158 modelos/teorias/prevenção | PC-MA; corte 13/7/2026; fontes revalidadas em 21/9/2026; unidade-base do bloco | done | done | done |
| 2; 2.1 | U157 — **Funções da Criminologia e política criminal** | **nova/local**; Universidade de São Paulo DPM0116; Souza/Ifanger 2023; Resolução ECOSOC 2002/13; Declaração de Kyoto 2021; estratégia UNODC; provas oficiais Cebraspe PC-MA 2018 e CEV/UECE PC-CE 2025; snapshot `472b3dc39cd0faa71da14d42aacc92ee9066cc11` | `funcoes-criminologia-politica-criminal`; físico PC-MA + grupo; `pc-u157`; 157 | Produção de conhecimento confiável; descrição × explicação; prevenção/intervenção geral sem antecipar U158; avaliação de respostas; Criminologia × política criminal × Direito Penal; política criminal como escolha estratégica e política pública mais ampla que pena; evidência, direitos, implementação, produto × resultado, avaliação de processo/efeitos e função crítica. U158 mantém modelos, teorias sociológicas e prevenção primária/secundária/terciária | PC-MA; corte 13/7/2026; fontes revalidadas em 21/9/2026; U156 como base | done | done | done |
| 3; 3.1–3.5 | U158 — **Modelos teóricos da Criminologia — teorias sociológicas e prevenção da infração penal** | **nova/local**; Merton 1938; Sage/Matsueda sobre Sutherland; Open University sobre Becker; Office of Justice Programs sobre oportunidade/subculturas; materiais do Escritório das Nações Unidas sobre Drogas e Crime e do Conselho Econômico e Social; provas oficiais Cebraspe PC-CE 2025, DPE-PA 2022 e PC-GO 2017; snapshot `dbb19b0a3a39f5b1a3a41043005fe6e342582767` | `modelos-teoricos-criminologia-prevencao`; físico PC-MA + grupo; `pc-u158`; 158 | Ponte clássica × positivista; desorganização social; anomia/strain de Merton; associação diferencial; subculturas e oportunidades; labelling; vínculo social; criminologia crítica e janelas quebradas; prevenção no Estado democrático de direito; prevenção primária, secundária e terciária por alvo/momento. Não foram importados modelos de reação ao crime nem Criminologia Ambiental | PC-MA; corte 13/7/2026; fontes revalidadas em 21/9/2026; U156/U157 como base | done | done | done |

#### Ordem e critérios de produção

**Ordem habilitada:** U156 → U157 → U158.

A divisão mantém IDs U156–U158 já previstos e acompanha três problemas cognitivos diferentes: primeiro **o que a Criminologia é, como conhece e o que observa**; depois **para que esse conhecimento serve e como se relaciona à política criminal**; por fim **como os modelos sociológicos explicam o fenômeno e como a prevenção é classificada**. Não há necessidade concreta de novo desdobramento nesta preparação; permanecem **158 unidades**.

Para as três unidades, preservar a diferença entre Criminologia empírica/interdisciplinar, política criminal como campo de escolhas e Direito Penal como sistema normativo. Teorias sociológicas não devem virar simples lista de autores: na produção, organizar por problema explicativo → mecanismo → implicação → limite/contraste, com fonte verificável. Prevenção primária/secundária/terciária deve ser ensinada por alvo, momento e exemplos institucionais seguros, sem inventar eficácia causal.

**PC-E17 concluído:** U156–U158 estão publicados e aceitos com C/H/Q `done`. Com a reconciliação posterior de U075, **U001–U158 estão aceitas** e a próxima frente habilitada é PC-F01 — conferência final da matriz contra o edital consolidado.

## 8. Evidências de publicação e aceite

Esta seção substitui relatos repetidos de reserva, publicação e totais. As linhas anteriores a U123 preservam evidências transferidas da campanha; a partir de U123, os aceites são registrados após publicação e releitura direta na `main`. Os commits identificam as versões publicadas e permitem auditar o conjunto completo de fontes e decisões editoriais; não dependem de comentários ou de versões anteriores da issue.

Para cada unidade, o destino completo é resolvido pelas seções 5–7. Os quatro blobs estão na ordem **C (`conteudo.md`) / H (`cheat-sheet.md`) / R (`referencias.md`) / Q (`questoes.json`)**. Pacotes abaixo foram registrados sem `vinculo.json` ou resoluções separadas; não generalizar isso a unidades não individualizadas.

### Commits, quantidades e origem das questões

| Unidade | Commit final de publicação ou main no aceite sem mudança | Questões autorais + anteriores | Referência das anteriores registrada no corpo recebido |
|---|---|---|---|
| U001 | `e86513514022eef8e8733a567d25174b1f0dc370` — inspeção contextual de PC-F02 concluída; Q/R ajustados, C/H sem alteração | 32 + 4 | Cebraspe Agência Espacial Brasileira 2025, questões 1 D e 2 A; Aracaju Auditor 2021, questões 1 D e 2 B; quatro adaptações não literais reconferidas em 21/09/2026; q109 passa à revisão 3, conjunto permanece na revisão 6 |
| U002 | `589ee4028f351f628ddcaf41b82a1d3d97e0a583` — inspeção contextual de PC-F02 concluída; somente referências atualizadas | 18 + 3 | Cebraspe SEPLAD/DF 2022, questão 4 C; FGV ALE-AM 2025 Redator Tipo 1, questão 52 D; FGV TCE-PE Analista de Gestão — Administração Tipo 1, questão 7 A; provas/gabaritos reconferidos em 21/09/2026; conjunto preservado na revisão 5 |
| U003 | `576474ec0376a455bf17f630d8b6af75799f8097` — inspeção contextual de PC-F02 concluída; somente referências atualizadas | 20 + 4 | Cebraspe PC-GO 2016 q4 B; Cebraspe AL-CE 2021 q27 D; Cebraspe SEMEC/Teresina 2009 q46 C; FGV Serviço Geológico do Brasil 2025 q4 E; provas/gabaritos reconferidos em 21/09/2026; conjunto preservado na revisão 6 |
| U004 | `9c2ee25645fd0ca94d510352117530b83429344b` — inspeção contextual de PC-F02 concluída; somente referências atualizadas | 15 + 3 | FGV DPE-RO 2025 q47 A; FGV TJSC 2024 Analista Jurídico Tipo 2 q3 E; FGV TJDFT 2022 Analista Judiciário — Administração Tipo 1 q4 C; provas/gabaritos reconferidos em 22/09/2026; conjunto preservado na revisão 5 |
| U005 | `bc72f3cbb85a40a617fe81e2d01d6d4898022aeb` — inspeção contextual de PC-F02 concluída; somente referências atualizadas | 17 + 3 | FGV Professor de Língua Portuguesa Tipo 4 q63 A; FGV TJSC Técnico Judiciário Auxiliar Tipo 1 q16 A; FGV Câmara dos Deputados Analista Legislativo — Contador Tipo 1 q4 C; provas/gabaritos reconferidos em 22/09/2026; conjunto preservado na revisão 5 |
| U007 | `25e29b293c90796034578cbafcdbc1b23c53b22b` — inspeção contextual de PC-F02 concluída; somente referências atualizadas | 17 + 3 | FGV Professor de Língua Portuguesa Tipo 1 q49 A; FGV Câmara dos Deputados Analista Legislativo — Técnica Legislativa Tipo 3 q13 B; FGV PC-PI Oficial Investigador Tipo 2 q1 C; provas/gabaritos reconferidos em 22/09/2026; conjunto preservado na revisão 6 |
| U008 | `1c8d9d6cb172e0e2687c3f04777fe1b0012fedcc` — inspeção contextual concluída; C/H/R e dois autorais ajustados | 20 + 4 | FGV Professor de Língua Portuguesa Tipo 1 q54 B e q57 A; TJMS Analista Judiciário — Área Fim Tipo 2 q2 C; Agesan Agente de Controle Financeiro - Contábil Tipo 1 q10 B; fontes reconferidas em 23/09/2026; `u008-a01`/`u008-a07` revisão 2, conjunto revisão 6 |
| U010 | `aa84886b359a8c957b6f30b03b6a7d6823509f5a` — inspeção contextual concluída; C em `f7d7671`, R revalidado; H/Q sem mudança | 20 + 4 | FGV ALEMA 2023 q2 E; TCE-BA 2013 Agente Público Tipo 3 q3 D; CPRM 2025 Letras Tipo 1 q47 D; TCE-GO 2024 Controle Externo Tipo 2 q13 E; fontes revalidadas em 23/09/2026; quatro adaptações revisão 2, conjunto revisão 5 |
| U011 | `6017fe32124653bd1d1ce2983344cce9d8e31ea8` — inspeção contextual concluída; C/H/R ajustados e Q sem mudança | 21 + 3 | FGV Vitória 2024 Guarda Municipal Tipo 1 q3 E; Serviço Geológico do Brasil 2025 Administração Tipo 3 q10 C; Assembleia Legislativa do Maranhão 2023 Web Tipo 2 q14 D (local C); fontes revalidadas em 23/09/2026; conjunto revisão 5 |
| U012 | `6b331bb0e5c3ceb314663800e1eb65c3be9713ca` — inspeção contextual concluída; C/H/R ajustados e Q sem mudança | 21 + 3 | FGV MinC 2024 Técnicas de Complexidade Intelectual Tipo 2 q1 C; TCE-SP 2023 Agente da Fiscalização TI Tipo 1 q10 D; TJAP 2024 Técnico Judiciário Área Judiciária/Administrativa Tipo 4 q9 E; fontes revalidadas em 23/09/2026; adaptações revisão 2, conjunto revisão 5 |
| U013 | `cd99fe4bbea0f48d2a50f2f4ae5e45c64f96bc0d` — inspeção contextual concluída; C/H/R ajustados e Q sem mudança | 21 + 3 | FGV EBSERH 2025 Técnico em Radiologia/Radioterapia Tipo 1 q7 C; SEEC/RN 2025 Professor de Língua Portuguesa Tipo 1 q8 B; Câmara dos Deputados 2023 Técnico em Material e Patrimônio Tipo 1 q2 A; fontes revalidadas em 23/09/2026; adaptações revisões 2/3/2, conjunto revisão 6 |
| U014 | `88246305b1dc48c1dc427859c933b22cfe650eef` — inspeção contextual concluída; C/H/R ajustados e Q sem mudança | 21 + 3 | FGV ALEGO 2026 Analista Administrativo Tipo 1 q4 E; Canaã dos Carajás 2025 Professor de Língua Portuguesa Tipo 1 q44 A; TCE-SP 2023 Auxiliar Técnico da Fiscalização TI Tipo 2 q8 A; fontes revalidadas em 23/09/2026; adaptações revisão 2, conjunto revisão 5 |
| U015 | `9e002427d103864047df5169b4b1266fcdde6e98` — inspeção contextual concluída; C/H/R ajustados e Q sem mudança | 21 + 3 | FGV Canaã dos Carajás 2025 Professor de Língua Portuguesa Tipo 1 q51 C; ALEGO 2026 Analista Administrativo Tipo 1 q7 A; ALEMA 2013 Técnico Revisor Tipo 1 q48 C; fontes revalidadas em 24/09/2026; adaptações revisão 2, conjunto revisão 5 |
| U016 | `a2f0ccb77c043ad108a4a347828beaa6567fc36b` — inspeção contextual concluída; C/H/R ajustados, Q sem alteração | 21 + 3 | FGV EBSERH Técnico em Farmácia Tipo 1 q8 B; Nova Iguaçu Auditor Fiscal Tipo 1 q2 D; Cebraspe TCE-MS Auditor Tecnologia da Informação CG4 q12 C; fontes oficiais reconferidas em 24/09/2026; adaptações revisão 2, conjunto revisão 5 |
| U017 | `031dd4c52189f09882e5a570242536ca137f2f56` — inspeção contextual concluída; C/H/R ajustados, Q sem alteração | 21 + 3 | FGV Canaã dos Carajás 2025 Agente de Serviços de Culinária Tipo 1 q8 C e q9 A; PC-RJ 2022 Investigador Tipo 1 q23 C; fontes oficiais reconferidas em 24/09/2026; adaptações revisão 2, conjunto revisão 5 |
| U018 | `c5cd738286eca67483667c481e9ad449c9775310` + `d33111335e512406a3a2c510e78a63e33c8ba64e` — inspeção contextual concluída; C/H preservados, R/Q ajustados | 21 + 3 | FGV TCE-GO 2024 Controle Externo Tipo 1 q2 B/q5 E; Receita Federal 2023 Auditor-Fiscal Tipo 4 q9 D; provas/gabaritos oficiais reconferidos em 24/09/2026; `q3709` revisão 4, conjunto revisão 5 |
| U019 | `e2acc605d0440f7723012f6c19363803a89fed20` + `926c2758096d27b5ce7a519d6204cf0ba4ecb05d` — inspeção contextual concluída; C/R ajustados, H/Q preservados | 21 + 3 | FGV SME-SP Professor EI/EF I Tipo 1 q4 E/q5 A; SEMSA Manaus AS Programador de Computador Tipo 1 q7 B; provas/gabaritos oficiais reconferidos em 24/09/2026; conjunto revisão 5 |
| U020 | `b40db0bce04738102ea623ba53a579534ee8707c` + `b10b0a900709cc44603eb3ad79cd448210454fcf` + `5ab2bc0f7728c66e9fd01ca8ab4236e8505e9754` — inspeção contextual concluída; C/R e `u020-a06` ajustados, H preservada | 15 + 3 | Cebraspe PF 2025 item 12 E; FGV ALE-RO 2026 Relações Públicas Tipo 1 q69 E; Cebraspe PC-PE 2023 q32 B; fontes oficiais reconferidas em 24/09/2026; conjunto revisão 1 |
| U021 | `9e3746e8f40518ce129db3018aa266f14ef22e52` + `816f506514d877dcd41a16be6e751e6514c8b3a8` — inspeção contextual concluída; C/H preservados, R e três prompts Q ajustados | 15 + 3 | Cebraspe PC-PE 2023 q30 E/q31 E; CAESB 2024 q70 C; matrizes oficiais reconferidas em 24/09/2026; três adaptações revisão 2, conjunto revisão 1 |
| U022 | `22b32a62d1723303a83977de1875ad1de9d72822` | 17 + 3 | Telebras/CESPE 2015, itens 102 C, 106 C, 108 E; o relato também menciona PCDF em outra linha de fontes, divergência de atribuição a conferir no pacote |
| U025 | `a8e5a26179da711ee98087622ef2e916059cae3f` | 16 + 4 | FGV Câmara do Recife 2014, ALEMA 2023, PM-SP 2024; Cebraspe MP-TO 2024 |
| U026 | `3327d909417c04134b52ff3317fb35a80299734a` — correção pontual de PC-F02; aceites preservados | 16 + 2 | FGV ALEMA 2023, Analista de Suporte de Rede, Tipo 1, questões 31 D e 43 A; prova e gabarito definitivo reconferidos em 21/09/2026; IDs `u026-p01` e `u026-p02` preservados |
| U028 | `706d590f022b309ab360ecb95df88f697efb83ad` | 17 + 3 | Cebraspe PCDF administrativa 2024, itens 118–120 com justificativas |
| U031 | `6adf643a07273a512bdac30696f158dad8de1913` | 17 + 3 | Cebraspe POLC-AL 2023; item 35 anulado do CB3 excluído |
| U034 | `029063007bf2c31f0480e2236b21d610334b8bfb` | 17 + 3 | Cesgranrio Banco do Brasil 2021, A25/B23; 2023, A24; questão Cebraspe anulada descartada |
| U043 | `ba15dd92f41993e8e381be78b658daa0073e3473` | 17 + 3 | Cebraspe PCDF administrativa 2024, itens 51, 54, 55 |
| U044 | `5d2969c847af948898586414a0446d4f55b6c234` | 17 + 3 | Cebraspe FUB 2025, Técnico em Contabilidade, 65 E, 66 C, 67 C |
| U045 | `6d7cdcf00cc060b3a68332d597ee36b8d4005142` | 17 + 3 | Cebraspe FUB 2018, Técnico em Contabilidade, 63 C, 65 E, 66 E |
| U046 | `9a6a13a9bd78c885fb7c014143b4865d2ee76acd` | 17 + 3 | Cebraspe FUB 2022, 61 C/62 C; ApexBrasil 2024, questão 45 C |
| U047 | `057002252a8cbaa61586e7e3773149a9379a9c94` | 17 + 3 | Cebraspe PF 2025, Cargo 16, 103 C, 104 C, 105 E |
| U048 | `49fa22c8886df05e326bc1ace65a2b11a1776458` | 17 + 3 | Cebraspe PF 2025, 114 C, 115 E, 116 E; 117 anulado excluído |
| U049 | `a9b0bfc6d946adc9e8091b59455f3175f84e9857` | 17 + 3 | PC-PB 2021/2022, 76 A; PF 2025, 108 C/113 C; 111/112 anulados excluídos |
| U050 | `2835569cab98b288150216d5267e8347227e687c` | 17 + 3 | Telebras 2025/2026, 53 C, 58 C, 60 C |
| U051 | `3776e924ab97c448d2ab0b70116d49baef2fa565` | 17 + 3 | Telebras, aplicação 8/2/2026, 68 E, 70 C, 71 E; 69 não utilizado |
| U052 | `fbb23169451be167a6f5a3d0289d069a14d40c28` | 17 + 3 | Telebras, aplicação 8/2/2026, 72 C, 73 E, 75 C |
| U053 | `a3b75597246544ddeef11b371bf5cfc29a7f8c22` | 17 + 3 | Telebras, aplicação 8/2/2026, 81 E, 82 C, 84 E |
| U054 | `73ec192e5822716e26b09399410d4fe8562b0933` | 17 + 3 | Telebras, aplicação 8/2/2026, 88 E, 93 E, 102 C |
| U055 | `37404cca5f53142390e9a57b8a40f6a9a7de4fa2` | 17 + 3 | Telebras, aplicação 8/2/2026, 108 C, 109 E, 111 C |
| U057 | `ba15dd92f41993e8e381be78b658daa0073e3473` — aceite sem mudança | 17 + 3 | FGV TJMS 2024, questão 51 E, remapeada para C; FUB 2013, 110 E/113 C |
| U058 | `37404cca5f53142390e9a57b8a40f6a9a7de4fa2` — aceite sem mudança | 17 + 3 | FGV PGM-Rio 2025, 59 A/64 B; TCE-PA 2024, 77 A |
| U075 | `d54f46305e09214e67a46ac4ff4e76ec18b7b278` — reconciliação de proveniência; pacote original `c1e00edc44afebf5cf73c783ace20fd7a69e1b75` | 8 + 2 | Cebraspe CBM-TO 2021, questão 23 sobre MATOPIBA; FGV PM-MA 2012, questão 50 sobre babaçu/Frexal; adaptações não literais |
| U078 | `721e63e781b1b174ff2e359b021556a4f4fa1ca1` | 18 + 0 | Anteriores incompatíveis descartadas; quatro propostas abertas autorais no conteúdo |
| U079 | `f95163ece27b1456240fb50ec76138b4930a1cbf` | 19 + 1 | Padrão definitivo Cebraspe TCE-MS 2025, discursiva sobre inteligência artificial; quatro propostas abertas |
| U080 | `ae8c6d3295427fda9ea8bd0fccf98990f1979df6` | 19 + 1 | Cebraspe STJ 2024, item 40 C; quatro propostas abertas |
| U081 | `cf1c51ed1c001e785e16ffca3ed31aea969959f9` | 18 + 3 | Câmara dos Deputados, Policial Legislativo 2026, aplicação 26/4, 99 E/100 C/101 E |
| U082 | `58397a66baae4865a185709d9f9853392ace9398` | 18 + 3 | PF Delegado 2021 discursiva; DPU 2018 oral; PC-RO 2022 oral |
| U083 | `ff75f6ba319b6471ff779dfbf8574f00a875462c` | 18 + 3 | Câmara 2026, item 98 C; PC-MA Delegado 2025, padrão preliminar; PC-RO 2022 oral |
| U084 | `bcd57cb3966bd4a49506ba3311a09da9056ce9de` | 18 + 3 | PC-CE Delegado 2025, padrão definitivo; IBAMA 2022, itens 95 C/96 C |
| U085 | `d332813451db039dc0ffaefae5265c79f7d8bca2` | 19 + 2 | TCE-MS 2025, questão 35 C; PC-PB Delegado 2009, questão 78 E |
| U086 | `e10b585bb6f9a58cebebfb52c8199e0b6f093b28` | 19 + 3 | PC-CE Delegado 2025, peça e perseguição reiterada; PC-MA Delegado 2018, lesão doméstica |
| U087 | `6fd95b4565b35d14607b329d146204a090b4f2ed` | 21 + 0 | Nenhuma anterior forçada para o recorte atualizado |
| U088 | `a67cc3a7d5cc39ffbbd63a0f663affe7c25314d8` | 18 + 2 | PC-CE Delegado 2025, questão 24 C; PC-PE 2023, questão 13 |
| U089 | `f634944207e3837ea782df1c76f4eb2f53caad34` | 21 + 1 | PF 2025, detalhamento no pacote |
| U090 | `283462304790bc5d2e5e95f09d6d1f0d8717de1e` | 20 + 2 | Duas adaptações verificadas segundo o aceite; identificação completa nos artefatos, não inventada aqui |
| U091 | `49572ad54a12412cbef91f5bb15768137140666c` | 18 + 3 | Três adaptações verificadas segundo o aceite; identificação completa nos artefatos |
| U092 | `948e60afc095cc9fa964d2e2358af2a21eb728b7` | 19 + 3 | PC-PE 2023, questão 17; PM-RO 2022, questões 21–22 |
| U093 | `20ff4172c93b0ca6f04edf5f55c5604e027d881f` | 20 + 2 | PF Delegado 2025, oral questão 4; PC-MA Delegado, discursiva questão 7, aplicação registrada em 22/6/2025 |
| U094 | `be07f3244da716a2bbfdade3b43e2b826f4c46ae` | 18 + 2 | PC-RO 2022, prova oral de Direito Penal e Direito Processual Penal, questão 7; PF Delegado 2025, peça profissional, aplicação 27/7/2025 |
| U095 | `680ccfb3e6c995b918565c5729d8cfe61b84aa07` | 19 + 1 | Cebraspe MPCE 2025, Cargo 11 Técnico Ministerial, item 114 E |
| U096 | `4ac2386f44e1bff76fb15922617ce2c3bd2f5930` | 18 + 2 | Cebraspe PC-RO 2022, prova oral Direito Penal/Processual Penal, questão 3; prova oral Legislação Penal/Processual Penal Extravagante, questão 21 |
| U097 | `410c1788e80911c78f9782f06b7c829f1c7f1bb0` | 19 + 1 | Cebraspe PC-ES 2022, Delegado de Polícia, questão 32 D |
| U098 | `da9620d0db63aa21bcb093fd2aa88b1833386113` | 19 + 1 | Cebraspe DPE-PA 2021, Defensor Público, prova discursiva P3, questão 1, com padrão definitivo |
| U099 | `88ba74a0d4c74f895567fa573e1441aeeeaae186` | 19 + 1 | Cebraspe TCE-MS 2025, conhecimentos gerais para cargos 2 e 4, questão 19; gabarito definitivo C |
| U100 | `b5d0fa3cd5d85610e01dd8c7c6526f5daaed4f5d` | 18 + 2 | Cespe/Cebraspe TRE-TO 2017, Analista Judiciário, questão 23 A; Cebraspe STM 2025, Cargo 1, item 14 C |
| U102 | `8b6a244ba94b2712e62037940bd192de9cb868ce` | 18 + 2 | Cebraspe PC-MA Investigador 2017/2018, questão 22, gabarito definitivo C; Cebraspe PC-RO 2022, Delegado, prova oral de Direito Administrativo/Constitucional, questão 9 |
| U103 | `3c1f3e9d881eec312b322993a78d44e099bc3397` | 18 + 2 | Cebraspe PCDF área administrativa 2024, item 35; Cebraspe PCDF Escrivão 2021, item 40 |
| U104 | `e9c1fc36912ea873b59839f3d1ff156497029cdd` | 18 + 2 | FGV TCE-SC 2026, Auditor Fiscal de Controle Externo — Direito, questão 28; Cebraspe STJ 2024, Analista Judiciário, item 53 |
| U105 | `99a34a6044c291dde3723dada96ef50d9240106e` | 18 + 2 | Cebraspe SEFA-PR 2026, Agente Fazendário, questão 17, gabarito C; Cebraspe TCE-RS 2025, Auditor de Controle Externo, item 79, gabarito C |
| U106 | `41e19b326d8f6b8b9728868afda1823796ae7905` | 18 + 2 | Cebraspe TCE-MG 2026, conhecimentos gerais, questões 22 e 24, gabaritos C e A |
| U107 | `6be4cab5ee0dfcfeec1895e24502aa68a7b9e0cf` | 18 + 2 | FGV ALE-AM 2025, Procurador, questão 29, gabarito definitivo C; Cebraspe PC-RJ 2022, Delegado, questão 46, gabarito oficial publicado D |
| U108 | `93d0f6f0bfbe127f057867e52eee285743fd8d5c` | 18 + 2 | Cebraspe PC-MA 2018, Investigador, questões 27 e 23, gabaritos definitivos C e B |
| U109 | `0f63eb3e076913951efaa98f8d5aa36549a0baa7` | 18 + 2 | Cebraspe PC-MA 2018, Investigador, questões 28 e 29, gabaritos definitivos D e E |
| U110 | `b5f2cdaeba834e7a432caa38db9b0a4d678983a2` | 22 + 0 | Prova oficial Cebraspe PC-MA 2018 auditada no bloco; nenhum item específico da Lei 10.238/2015 foi atribuído como anterior |
| U111 | `5c7516e3ca5eaacbfc092eaf6482ec35f12279e4` | 19 + 1 | Cebraspe PC-CE 2025, Delegado, questão 20, gabarito definitivo A |
| U112 | `016c3b2c0a460ba9ee7036d587dbd237d375a6c6` | 18 + 2 | Cebraspe PGE-PR 2024, questão 1, gabarito definitivo D; Cebraspe TCE-RS 2025, itens 61–63, gabaritos definitivos E/E/C |
| U113 | `1e7a5014641826a8afa9edc4faa9c6484eda48fa` | 19 + 1 | Cebraspe DPE-SE 2022, Defensor Público Substituto, questão 78, gabarito definitivo B |
| U114 | `a70d4f12220240498d09d30449d6ad88cda94d21` | 20 + 3 | Cebraspe DPE-AC 2024, questão 32, gabarito D; PGE-MS 2021, questão 6, gabarito D; TJ-RR 2025, questão 27, gabarito B |
| U115 | `97982b8e8582ef134792f20dae9c283a93066e89` | 19 + 1 | Cebraspe MPE-RO 2023, Analista Contábil, questão 66, gabarito definitivo E |
| U116 | `9e45c836d08eac0783ccabfae275d3b6c76f1e54` | 20 + 2 | Cebraspe SEFA-PR 2026, questão 15, gabarito definitivo E; FGV TCE-SC 2026, questão 76, gabarito definitivo A |
| U117 | `46bf56a9b877bb68483ea41d6b180b55a04fc9cf` | 21 + 1 | Cebraspe TCE-MS 2025, conhecimentos gerais para os cargos 2 e 4, questão 27, gabarito definitivo D |
| U118 | `1f81b6c035c1f6d7bd175fd2c33dd9a9fcc57d6b` | 21 + 1 | Cebraspe Câmara dos Deputados 2026, Analista Legislativo — Processo Legislativo e Gestão, item 103, gabarito definitivo E |
| U119 | `401c841cbfdc2e14a4ad5c31a0ec38e4f7e93fda` | 24 + 0 | Nenhuma anterior forçada; doador só trazia autorais no recorte e candidatos externos inadequados/anulados foram descartados |
| U120 | `feecaac55f1e9ab1bb94fdb4aedca87f0238c98c` | 24 + 1 | CESPE/UnB TRT 8ª Região 2013, Cargo 11, questão 9, gabarito definitivo D; adaptação não literal do núcleo do art. 133 |
| U121 | `8424c7feca7d7a23fb86510d5d10b9f143fe812a` | 24 + 2 | Cebraspe PC-ES Delegado 2022, questão 47, gabarito definitivo A; Cebraspe PC-AL Escrivão 2021, item 74, gabarito definitivo C; item 75 anulado e excluído |
| U122 | `87653efc1e5c9c94ba81d3e724524c1adae1cdb0` | 28 + 0 | Nenhuma anterior forçada; questões externas localizadas foram descartadas quando dependiam de recorte previdenciário específico, redação histórica ou nuance fora do núcleo constitucional da unidade |
| U123 | `7e25095085350dd42b32651d0f1bb05c0e4ca343` | 37 + 0 | Nenhuma anterior atribuída sem verificação; conjunto autoral cobre o diploma no corte de 13/7/2026 e a jurisprudência oficial revalidada, sem quota artificial |
| U124 | `530e79176b3c8bf39d39e3924c791eb02dbcfc1c` | 30 + 1 | Cebraspe TJ-SC 2022, prova oral de Direito Penal, questão 7 sobre violência institucional, adaptada não literalmente com padrão oficial |
| U125 | `74e0556a36812b92b336ed4d760db513208f02f7` | 30 + 3 | MP-SE 2022 questão 22, gabarito E; PC-RO 2022 oral questão 15; MPE-TO 2022 discursiva questão 2, todas adaptadas não literalmente e com gabarito/padrão oficial |
| U126 | `8860a3e26163a442b86791622ea90d4ba1eff8e4` | 45 + 1 | Cebraspe Polícia Civil de Rondônia 2022, prova oral de Legislação Penal e Processual Penal Extravagante, questão 16 sobre aplicação excepcional do Estatuto após os 18 anos, adaptada não literalmente com padrão oficial |
| U127 | `264bd0ee22fe42d16e760823d93f72b471426840` | 36 + 1 | Cebraspe Polícia Federal, Delegado, prova oral aplicada em 2020, Malote 1, Direito Penal, questão 3 sobre numeração suprimida e art. 16 §1º IV, adaptada não literalmente com padrão oficial |
| U128 | `c4ab59d6f8befcf5854e4a5c47c0cdb51df04250` | 38 + 1 | Cebraspe PGE-RN 2023, prova objetiva aplicada em 25/2/2024, questão 49 sobre art. 29; adaptação não literal com itens II e IV corretos |
| U129 | `a0345091a78b118d6fdaf99d623f3c5fe23a6c54` | 36 + 2 | Cebraspe CAESB 2024, matriz oficial com justificativas, questões 28 e 29 sobre descumprimento de medida protetiva e incidência do sistema protetivo; adaptações não literais revalidadas no corte |
| U130 | `deab3c171c5472c55f1688cf4aaf38c78e37449a` | 25 + 3 | Cebraspe PC-RO 2022, prova oral, questão 47; PC-ES Delegado 2022, discursiva, questão 3; PC-SE Delegado 2018, discursiva, questão 2; adaptações não literais com padrões oficiais |
| U131 | `d4863b22519c95a8efa310f4918c1e5a709fd109` | 38 + 1 | Cebraspe PGE-CE 2021, questão 38, gabarito definitivo C, adaptada não literalmente; padrão oral PF 2025 tinha inconsistência interna documentada e não foi importado como questão |
| U132 | `35dbc23a0d4539cc479566fb393661a903259060` | 37 + 1 | Cebraspe PC-RO 2022, prova oral de Legislação Penal e Processual Penal Extravagante, questão 13 sobre modalidades de roubo hediondo; adaptação não literal com padrão oficial |
| U133 | `d733eecd1168de9e747744be4847f1ff0b09dace` | 31 + 2 | Cebraspe TJ-SC notarial 2022, prova oral questão 7 sobre efeitos extrapenais; PC-RO 2022, prova oral questão 9 sobre distinção histórica da injúria/racismo, atualizada expressamente ao regime pós-Lei 14.532/2023 |
| U134 | `6396c10c3ca81cdb2fa42c191f387d5a10e273df` | 29 + 0 | Prova oficial Cebraspe PC-MA 2017/2018, Cargo 2 Investigador, auditada junto ao gabarito definitivo; nenhum item direto da Lei nº 12.037/2009 foi atribuído como anterior |
| U135 | `817e4071156a64fcdeb9cff397b3b21db966ac01` | 35 + 1 | Cebraspe PC-CE Delegado 2025, prova oral, questão 3: perseguição simples fora da Lei Maria da Penha, menor potencial ofensivo, termo circunstanciado e regra do art. 69; adaptação não literal com padrão oficial |
| U136 | `e8e2b49dd97f881084a97e168db912e9418bc7a0` | 47 + 2 | Cebraspe TRT-8 2022, Analista/Serviço Social, questão 35 sobre prioridade na restituição do imposto de renda; DPE-SE 2021/2022, Defensor, questão 69 sobre prioridade especial 80+ no acesso à justiça; adaptações não literais |
| U137 | `0ddbfa13780ee040563048fdc716998c39856b1f` | 40 + 2 | Cebraspe DPE-AC 2017, questão 31, gabarito C, sobre perigo abstrato do art. 310; PC-PE 2023, prova oral questão 4, padrão oficial sobre autonomia dos arts. 306/309 e Súmula 664/STJ; adaptações não literais |
| U138 | `7391fe95fbad81d80fc251e3f1d259c97f8bb8fb` | 44 + 2 | Cebraspe TJ-MA 2022, questão 69, alternativa C, sobre ação privada subsidiária em crime eleitoral; PC-RJ Delegado 2022, prova discursiva Grupo 1/Ponto 1, sobre art. 350 e competência por conexão; adaptações não literais e atualizadas |
| U139 | `516f2b70ee03625901405465906d66c74adbd173` | 44 + 2 | Cebraspe PC-RO 2022, questão 55, gabarito C, sobre ausência do juiz nas negociações de colaboração; PF Delegado oral 2019, questão 4, padrão oficial sobre legitimidade do delegado e ADI 5.508; adaptações não literais atualizadas |
| U142 | `6284f683b02d1365ee665cc5f84c61dfc344ac8c` — C/H/Q aceitos sem regravação; referências finais em `996d97373c59761d0b31e70b95183cf4192646a1` | 18 + 2 | Cebraspe TRF6 2025, item 32, gabarito definitivo Certo, sobre liberdade de expressão/1ª dimensão; Cebraspe TCE-MG 2026, questão 29, gabarito definitivo E, sobre universalidade e indivisibilidade; adaptações não literais |
| U143 | `718e9a5d27f145f521b91b5db93bafb3bb635128` | 24 + 2 | Cebraspe PC-RO 2022, Médico-Legista, questão 86, gabarito definitivo A, sobre o rito do art. 5º, § 3º; Cebraspe ANATEL 2024, item 45, gabarito definitivo Errado, sobre a falsa fórmula unicameral/2/3; adaptações não literais |
| U145 | `00ee81d6fcf57d5c3184ebd1e661598fefa01f61` | 24 + 2 | Cebraspe PGE-PA 2023, questão 96, gabarito definitivo B, sobre realização progressiva no PIDESC; Cespe/UnB DPE-RO 2012, questão 13, gabarito definitivo E, sobre restrições à reunião no PIDCP; adaptações não literais |
| U146 | `2e9169e20c1f149679192572fe5c6f7e00bf712e` | 24 + 1 | Cebraspe PC-ES 2022, Delegado, questão 55, gabarito definitivo D, sobre emendas/protocolos adicionais da Convenção Americana; adaptação não literal |
| U147 | `017f1aadec3af39d105dbfc125f97c89827c94cf` | 24 + 2 | Cebraspe DPE-AC 2024, prova oral de Direitos Humanos, Ponto 1, padrão oficial sobre matrizes nacional/internacional; Cebraspe TRF6 2025, Agente da Polícia Judicial, item 86, gabarito definitivo Errado, sobre tratado de direitos humanos e norma constitucional originária; adaptações não literais |
| U148 | `f6d10d28d9c6ffd9bb4f372ddc993c7929591f48` | 24 + 2 | Cespe/PRF Curso de Formação, 3ª turma, 2ª prova, 1/7/2005: item 72, gabarito definitivo Certo, sobre proteção especial de grupos vulneráveis; item 79, gabarito definitivo Certo, sobre necessidade e meios menos agressivos no uso da força; adaptações não literais |
| U149 | `2e5a7ef47149cde3c78e7455d897a86708251c8c` | 20 + 2 | Cebraspe/POLC-AL 2023, conhecimentos básicos de nível médio, itens 36 E e 37 C: classificação geral/especial e conceito interdisciplinar da Medicina Legal; adaptações não literais |
| U150 | `171d2a25da31d093ebf3e1e59f2e81a56fe19566` | 24 + 2 | Cebraspe PC-MA 2018, Médico Legista, questão 29, gabarito definitivo A, sobre perícia contraditória; Cebraspe PC-ES 2022, Delegado, questão 64, gabarito definitivo E, sobre necessidade de perícia e conhecimento técnico; questão PC-MA 28 anulada foi auditada e descartada |
| U151 | `98e9cb4ba7f113dd3fab1498d31eb183ea1b7bf1` | 24 + 4 | Cebraspe PC-RO 2022, Médico-Legista, questões 25 B, 27 C, 31 C e 32 E, sobre relatório médico-legal, identificação odontológica, parecer e requisitos de identificação; adaptações não literais |
| U152 | `7bfb11cc0b2467d992507aebf3f39e173834dd79` | 24 + 5 | Cebraspe PC-RO 2022, Médico-Legista: objetivas 24 D, 35 B, 37 A e 38 C sobre tiro encostado/Benassi, víbices, Benassi e sedenho; prova oral questão 31 sobre cone de explosão; adaptações não literais |
| U153 | `3fd6efac49a21362486b004f50195fc2e124734d` | 26 + 5 | Cebraspe PC-RO 2022, Médico-Legista: prova oral questões 2, 6 e 13 sobre morte encefálica, fenômenos cadavéricos e cronotanatognose/comoriência; objetivas 43 B e 41 C sobre rigidez e maceração; adaptações não literais |
| U154 | `337acf29a10f04e3398939152ef1604d63ab5274` | 24 + 2 | Cebraspe PF 2025, Perito Criminal Federal — Medicina Legal, item 85 C, sobre início do exame/perinecroscopia com a chegada do perito; Cebraspe PC-RJ 2022, Delegado, questão 92 B, sobre integração de perícias, local e relações espaciais; adaptações não literais |
| U155 | `e32e4fbec514febb820401e89a53c0be26a40345` | 26 + 2 | Cebraspe PC-RO 2022, Médico-Legista, prova oral: questões 24 e 32, padrões oficiais sobre imputabilidade × responsabilidade × capacidade civil e limites/modificadores da imputabilidade; adaptações não literais |
| U156 | `21147435173e18446521cdc1553c547c68a01a01` | 24 + 3 | Cebraspe PC-CE 2025, Delegado: questões 61 C, 64 A e 65 D sobre controle social, perspectiva criminológica do delito e método empírico-indutivo; adaptações não literais; item DEPEN com gabarito apenas preliminar foi auditado e não usado como questão anterior |
| U157 | `472b3dc39cd0faa71da14d42aacc92ee9066cc11` | 24 + 2 | Cebraspe PC-MA 2018, Delegado, questão 94 D sobre política criminal e redução de condições facilitadoras; CEV/UECE PC-CE 2025, Oficial Investigador, questão 86 — resposta definitiva Política Criminal; adaptações não literais |
| U158 | `dbb19b0a3a39f5b1a3a41043005fe6e342582767` | 24 + 5 | Cebraspe PC-CE 2025, Delegado, questões 59 C e 66 D sobre teorias sociológicas e escola clássica; Cebraspe DPE-PA 2022, questões 40 E e 37 C sobre labelling e prevenção secundária; Cebraspe PC-GO 2017, questão 18 E sobre prevenção terciária; adaptações não literais |

C/E nas referências acima significam Certo/Errado no gabarito original; letras A/B/C de múltipla escolha pertencem às provas originais, não obrigatoriamente à alternativa remapeada. O registro recebido atribuía `questionSetRevision: 1` aos conjuntos então individualizados. U001, agora documentada individualmente, mantém `questionSetRevision: 6`, com `q005` em revisão 2, `q109` em revisão 3, `q110`–`q112` em revisão 2 e as demais em revisão 1. Preservar IDs/origin e observar as revisões efetivas de cada artefato quando houver alteração lógica.

### Blobs dos quatro artefatos

| Unidade | C | H | R | Q |
|---|---|---|---|---|
| U001 | `07473a916ab5e2b299d62cce98feb6fac45f36ac` | `c75427b21479f88af6b57cbda04ff34f70b25fef` | `a95361908d3993c0fb7a834dfc5b8d06d70aa95c` | `dcb939bc7f75fcbc483cc5590eabd1bd69d3d5a6` |
| U002 | `330dc4a33540ce03c8de090094def8793cd83b98` | `75706c5da69996bb479ea57555a8041d0da8ffc0` | `75fa2b1b1ad633f0948f1bb305374909e2f2ccfc` | `575a35441989f0df1ef6fb692eff8e91d8bfbdb8` |
| U003 | `fe4ec6b3081a6b3677ca1c91363dddd854e71936` | `5f9b05382810230e611f550baace15a35950bc79` | `417bf039f6af4c84b0ccd4679ff61bd18b1cfdc9` | `f08deaca845b2fecba04dd2b1918fa2b2e340ac0` |
| U004 | `7f48115ac58ccf16e1f193e259879a31aef276bb` | `e58c3b07b17695b58426b9403d51984abf723637` | `b9757850e7ab2cd209280d4ffa014a848e95f42f` | `a462883a72d23e5d76e72ae8182ad49cdc6cc07b` |
| U005 | `f8e79ff2945fec047cd0f06c645bbd7d2a3a8974` | `a86d1677fd7742c5a0cd5976cd5d2cb316dd40a9` | `e6758c3eb6efa24598c64ff3b980120a24e5d033` | `d4bad8ab1ca8895a4f385f6381257a1d0f441d8d` |
| U008 | `490b6c8cc8a6ef4718518bdd1d1195978ec33f89` | `681c5bab1929cd7f751a8e96683f7d0052fa291a` | `a113a216fef0449dc981c58ea07287a88ca7f2a2` | `4bb1e6df97cf46999f415f64de9d0e761ecd548d` |
| U010 | `2495eedf9a02b97f34e5501d7a804317f3abb840` | `083ec123af6eb6ed50febb5ba1dea5e1b016e9c7` | `7559102b1da8ea3b51418b707598cbafa0bf354f` | `e7dd3567b433c2002742436e232c5741ee0a7277` |
| U011 | `df7ba479215f6b3c2c086f91ad84da9226dffc69` | `3a233f67adda3fcff866d9ceabc227cb1b4aa480` | `f2d84722453cd0b2f37e059b936385ed420ebcfa` | `9212605ec3c9a433258a917003d28e35f69c21e4` |
| U012 | `7ae01dc410f7c160391fc2d679d60c3060644785` | `4b3555a9e777a3daefa721b67d56eb37c90840af` | `26e626a3d3c9090c49b54e5db18dd0706a5589bb` | `8c624ae8b28355ba2a338f99c34eba4a17adfff6` |
| U013 | `2755e9d8af94197d3921b91a785a0f47244b7db2` | `c16b9d072320d5ee7518712072dd272a3ed504ee` | `3e3fbd60a500f413c84ead24ccebf72a977a3190` | `647ad7fdd4cfa4ee1e87afe9b70bccd000fb15ca` |
| U014 | `8ee905b4052ed82dec6bfd8a5019b14bd44c750b` | `a54d2e847d7e11c41bd6be9e96408b664d1007e5` | `139992e94a5473f06985bafc4bb5891335fbb758` | `7643eae3206061f836700a3b4fd94e429f77c557` |
| U015 | `14b5a823fffb352700485ca0c2d240871ec76a6b` | `674439ecfc0799cfd6c46a602e653781bf24f212` | `81899a40c6977266fba7e5d355e13d7d6e1b5d20` | `7db470871ff99e02e341a6e7669a17f9ef8db699` |
| U016 (PC-F02) | `931f2108b0737543816b92b5a4adca4e55a1919d` | `35c0158b29ee53bd581471dbff399ff7255405f1` | `5a169eaa9c1ff6ddf8eb1f64eb79e0ab55216b5a` | `099ed06c2040b30da076e382edde2e431577ddfb` |
| U017 (PC-F02) | `cd99a3f4deea450040bf00d84cc64d0180a21969` | `c3c37a2ba3875dc04146f76c796a0ad2571c2fd5` | `09b7e2f539b5dfe0f40e418257aa7895fa66de33` | `ba524c28e0949c0f9bf0d2978ffba2ffce960dca` |
| U018 (PC-F02) | `350331463f0b2aeba7201162abe7e721cef0e498` | `b958d73877c1dee214136340fdccfbca2ecd66d1` | `fe2604615de2fe934bd3ace934344bc29355c2c6` | `e54e5bfb97e79bb090f1cb151485cbe894f06af7` |
| U019 (PC-F02) | `e9b6354ab413886e69c88f82cd82c1e2afc72f6c` | `ee6f0dd3390f00710faaef9d92f8471013e6bf6d` | `ab679a0850e686375f822ff8f1f78f99fdd98b80` | `ee12c77cc01463dcf8be6d403bd4bbb7a3491040` |
| U020 (PC-F02) | `c86c397ec9076151434e73c3bf4fd0f08dc937ee` | `828eb6aee56a5a0957a77b6354b612a30752bb1b` | `ba11bba35b8af4e8df4f85b2b58958d50eac740e` | `d2776288d62dadcf7912f0d4f89d1fbade9bb095` |
| U021 (PC-F02) | `097e1f26691d217df865da7c66ebd8e5af4c85eb` | `d40300370d36237fab442b414b6e7e382ab9644e` | `86be09a763d00ce8c8c9091b8ed8c92622f8ea7f` | `ff57aa50869c8c6122d8d86d71c3d4f222c3f76c` |
| U022 | `318358e2fd8ff603c4b81c123ab33991cca1edab` | `4fe0f52cdf32f6c9f5e45de8343327c9dbd265b1` | `4af751fbb8922a85d0672425201072f378857872` | `2a0263eddfcfed3da7598c9e8827827bfa653303` |
| U025 | `d347cc042833ace0ad886288ea96d665004e6ce7` | `d931fc35d95d69e1fa83ab6453a437e3b2db8a14` | `cef414bb0353969fb9bce35d4045abfed35a0433` | `edab46630128b63802815817181c9c568ed8a51c` |
| U026 | `4eadb1ca2eef7636e943b3e23b87f97f2256fec7` | `2fab30d6c9a637c10bd3241351911496690da8db` | `857c47e1128fd19235c8598ee333c25d189c076a` | `11775933e7a5d56dce7f935bab692f925b9c2069` |
| U028 | `c5a0b35a5c9fe78ebc6358356cbc8b24f4e0778b` | `8ab68af41233d024925f11d3a498ce2b127ca45f` | `f8a1a62d95f26266fcd2b8638c77447a07c41dd1` | `ca24db77bc4e87113cb78122bfb6f06ec27cf8cb` |
| U031 | `af5a2a1b48163d64e6da2427fe1ca5dc7101b799` | `e4d20fc31105d355c82e2130da8826e7017322ae` | `579e407b2c7eb8f90ec8c877c07962868ad84eeb` | `6cc4d154de6e74d0ea577eeff336d72bcbcc312b` |
| U034 | `a9557be4fc2ac89f63db020671ec72a39e983abd` | `5c86dff693fdbe018bee8b01b2d154c557b235a1` | `30a406ec9423c879dfec7732337a8b46075c981f` | `6908d3904dabd83809747defea6e8ba8a4ab94e7` |
| U043 | `47791ef28e3464002565905b644f5adf772b0771` | `cfa6e30682a0b6273e8e33099c7ab96516299554` | `9f7a37c0bf596982b6915da37bde4b74be038996` | `e8981279d783301746e4e0152cac13601262579a` |
| U044 | `907c68f29372e293afda1c40b3c46c3977e093dc` | `5e1e1e727843f58e300e001d5aa5fbf8d24a7dec` | `23ef64d373954cd94ef7f7acebfd253151c3d2e2` | `028bb9c037d3339d48845e67767457abfa07eb8c` |
| U045 | `9816839758b38e92a330b8a0756fad60a8dcc2a0` | `d5018927a9897d0f25c8eab32ac89ddb098e3c77` | `6f364489801378de50e8b6691ffc23db49ac17e7` | `2af5cc02d7d6326c140ad32f14e98228c86bda62` |
| U046 | `a2d929d59ef814d6c242f06cb8305f3de963bb3d` | `c6735ed14eb2d9b2ec8674fb59cebfc57f29b131` | `044fcb717a9a791cb5c959126a63e32ab7331edd` | `c40fabf2cb0df9ae9817103ca9473f867d4917f8` |
| U047 | `350e50e46128f9b9e1a365e26be1dac47bdc86c4` | `f3c447fa1002ca1f8f7e851b36f83823a00ed407` | `5e4c6e4b7a0c26715b5ada40e83b9337a0c03453` | `2e392ccdd4d33af73b9620859765d942c1a1c56c` |
| U048 | `6d6fc47e20a9400fa3d0e081eb396fe52319502d` | `287ba1a95d6df794d21429ad03a7932c62d8e367` | `faad533864238837f15864e9a755c747dc43fc34` | `aae5c8bf1904bbba602134751d52d4452cd12c40` |
| U049 | `0f0d2b6e3b390177b2c7860f30b74cd7ea7f3751` | `e5e3e6482a9c9755e28fb922b7fe39d092be94e2` | `b292c2d9523325d121f660e4e0832320362650b4` | `463a6c15cf2ea77030e1a2452fcc8064c6f3922d` |
| U050 | `6cdb174122b8efe658344abc4443cf1f8e5db935` | `a62745d4ca88493bd09280cac2f766fd27a6c66c` | `87c63c44005ce6c2bf36e20fd7eb39478079df37` | `6bbee51ba5ad7c6259a91b8ea3994e35955bc435` |
| U051 | `9c7f00cc20c5bae840978ef61f341c0565476632` | `1062bb30d9f7e6bc03bb3563ead407377727c7c9` | `91e39a88e10ed075431d7f41049cbf6aaec4c0cd` | `b2797de7c0191d98188343c5e4a571200f698a6a` |
| U052 | `3c808464c78d24614cf4cf9c594bfec0861fbc9d` | `059ac68659178d52d4726bc7ce03a283bd346ca7` | `55f7951a9e788fd333464af9ffc9a6a4c772cf36` | `f4a4c96b2ba808f9d48b28ba3d0a435bc2672d0e` |
| U053 | `19e8ceaef9f392a75a950f5fa7a235fb260b606e` | `c4612284c384b82767af376978a63ca1a99b6b56` | `933a6367b07a47f8e6e0dce3e05d2d4ad8cc732a` | `7db11b25ad10638227395be2051660084979fb10` |
| U054 | `9d647cb9d3a82ce7a17fa41f4c304fad19457caf` | `7f3a747454a76199e1239a34a6a831a3e1acc960` | `990753d840a04a427b01e2aed0ff9696b75ddd6d` | `3a668d24a1f0d2802c7cfef56a97f9a790f10f74` |
| U055 | `d71e06ff4229ec6f9b6527ad1401cc0a23cfb44b` | `419a9e0417efd1d8656ece04cfc4d9ed1d3cbab1` | `758acb453c09e4d1db1c150cb940acca6112eb0a` | `0de83d36453d9e9c160c3b406bed821fc9f1108a` |
| U057 | `d1c846c69e1423d0b21f83369612037ef1a1ac2a` | `964deafe01841fad9bad4f0109f10568e3abed81` | `2a66d0cc5d0c872782cd7ccb1d145b3e5c75fbc4` | `8c7d27741eabe99ad5e136bc343564268112c4cd` |
| U058 | `4f33221bd5e4f45c3b15d4bae49bcc76bd9fe3da` | `cbc22818c4f3c192f6a750258773c461f5eeefcc` | `d335440b9a48944e3781ccdaba6d6cc8728bc579` | `5e89a83f317d3964200c8debe40bcd24d0367d40` |
| U075 | `667b534e1ec5720636cd1488b9887fdd3c0e500b` | `3b53e51436e1aaaeef5f301a82f5192d42755361` | `416537459ddce6eb2c8e89689141798ca0a71549` | `61ac2de7af522616a833e940f1243ec8a9e8023d` |
| U078 | `21d5d08da2f16b00f342671e43e84608eb0c53ac` | `75e3bae6cd90db0ae3caa6d0c0b1e4f7e93e44b8` | `498ff346e8023081bcecc0e1cc74e0dd756e94e2` | `72f245b56989a621735969f37da1eae320753506` |
| U079 | `39780b372cce0a05ea1a14c351df184f02a75458` | `10658951392e269e07f4e1f5d0d5b2f2459927e2` | `c8d54f3e9d8e1ff6f94fa04030fc61083dbd4c40` | `4d862650a504ba96640b08bc4174b5f52aff791d` |
| U080 | `b15badc440ca953ce467c3e857046bf63d357b4b` | `ccce97317bd8c4a96f636a3c63a910f15ba756b2` | `3ee58eb313d113f82746158f5bb9dfe86afd5d6c` | `847c81fcf32ae945519ce8da568cb30a796976cf` |
| U081 | `dbd0d41689f40d6f891be7c0b2a720f86c1150c0` | `a3469e86d8b2a4257e7611ab9c78e2a7ab509bbc` | `97fe054a436e35ca2af70d636871ad4f62341280` | `34355dee82e197ed52355dc167f755053f5bcecd` |
| U082 | `ba59ebe3e09787b687841970ba1f15beaa6d9d9e` | `53cf3525a8f44efc6d2fa62141821d366162b20d` | `dd1aa3ebd80a1a3e61005cb1adbc9af840e14750` | `e76e8143eba2c3e8afb92481f6f7df3407dfcd48` |
| U083 | `4f18aec9ad175c7d073f86c513fd48febf1b171f` | `922fa897074726b4fe19547ee7cc489302ee569a` | `4177b217ddf2f164e3c467a8e01b6f9b856f083d` | `d173dd36ff8645efc7c2da04aac177bb8ca74644` |
| U084 | `8f6a29295bb62ccfe0e234c08ba8d35e7012b4f7` | `44b94d147e1efb757cd160f88929899611c643ee` | `d1b58ae837dbd1f936b1b7cd3e5ee97373fafd41` | `4e0bb3bb730ee5679ab47bee7163766514168bfa` |
| U085 | `3ddca37ced16bec08dc177bc95cbd571c35e43ec` | `4761039c14768ebc288b60224b1b12d8eac92527` | `5fb41452e69caac46783a84847431ffee075a61c` | `60bf8e681634939c5d27bd5989f82826bd21841c` |
| U086 | `4066794885c6b2f7b54dfce896ef565a3365e490` | `4b3dcd05de4c4315756f0c3de8ddfa09733d894d` | `4cc30a6f91d5d9927d51c7a431ec4c7f6a2b8774` | `e914b3116c0d6740d6ab7f5e7d75872f9cbe3945` |
| U087 | `dd5e9a8b9ca49271d012a25f2608fe854cee742b` | `af414018f8141c383538f05e0b80e72a3d19ac3e` | `aa325d4ff96792596a9c3a322b76bf1c82ccd033` | `471652d3267299fbf0148480846c0d18f4b7aa82` |
| U088 | `269cdf169c358796432ce6702ace7904d28148aa` | `609566dabd4acc213a513c787171724e9b7fd0ee` | `2b7912880e653a665cc6fb942dcc5a97db9b9b84` | `19d9a3f612de5ff0eb89b4c5841eddf7e775e2b6` |
| U089 | `155c617e2f197ea743db26749f2f2411adfe1ea1` | `b3d595881ab0b36134a0672ce7da552289d2e627` | `e7df4d41e45a877ac519cb763a606bf5ad4b1d10` | `4172c2ab715f5cf8dfc08b985e4ffe91a7b393ea` |
| U090 | `84e893ca9d62b9f94ca3165582c16db7d93b8637` | `b96c6ca159198ac6579f5ae3ad415b9a03ad8670` | `79cd719da7d6d02058394c8552fab9023431b0d5` | `8fd9559c9242c20cda2ba5ad4906788e0921d6cb` |
| U091 | `35f8c6c782f2f9f4bfefbd338ac54990b0757678` | `7e93798c97be0c5d3dcd6c815e2d48dec0eb1655` | `9c5f2d8504c50755ca81881c153695977049ece4` | `5cfed6eca8bbc2f7f9175870ee90c4f08f81bc66` |
| U092 | `7afe860d0f6dd474774dc8c5cade2eb8cdb642c8` | `2a6f90b4dbccde7993709de27808df7e924c7bcf` | `48808df01fb4f3c9c2478165e0a989f764d94f8f` | `d6c802eef975e8ccdf23c62be7f2d0a57de198fa` |
| U093 | `514a163e1778a22bd15e846339cede3cdef7d4ec` | `183e5583c18c7094a042ad3765f7ae0288a32cff` | `2d633a49fdca6464aaae08e6a1d067d96b2c92c9` | `12a33d33ab5ee62b866c7f9d4a774f26534fe87e` |
| U094 | `b947c309b5b5b2a3b5b7cf057ea8259d2cda040a` | `db418ce459684418de4ec3e0732d74f679cfb811` | `b59a006b45110defa32c77056b51caaad1402c7c` | `ba00fc909e9740d96cf7b3b30b3926e1ea7d22e0` |
| U095 | `c10cded5430f4b52a5d262abcc8cd293c8a9939b` | `48a74b559f154a1f3b6502f952eb6bb4242a76cf` | `7396164763cb6a1bc4e311b1211f37b5890de675` | `90735c2fdacd49170588ea8996ff80b4b2e7ccdc` |
| U096 | `0c327148769f1fe20616e91a8dd030bb2d9a902a` | `df7f14bc957d8fa0d6483bd6cfc53258949305db` | `ed54aca7ea3d0cb86c404a11b2d384977b15c7d8` | `d4c0a39b2cc18182990fe1e65cc8092906bb7997` |
| U097 | `cafb301bd4879b455ea50922f344362678edc5a9` | `36cd2f24c01c91bbe0a19c1b60f34b7b77255a25` | `d2d64f346ed8c770a3057d34ebc5a27bbc1ce59c` | `6762da7d94ee931488c1c5a37645f6bdaa02a092` |
| U098 | `563269a10a754b2561d5e996a0d5b51c53435ade` | `4a2999a123db1b89afb11759d9cd9042a7306d60` | `e5fa6b2d85d98a18d9cdd2cf6f1b5565e8f2b844` | `2a8e891d2349593cc043839ec4700c13981b5ed0` |
| U099 | `e4b663696a645d5d684a6fd46d3e52891c361c10` | `75fb1ac5bff646b98efacc55638fe58568905039` | `7b306d88657c40d25f895e25846bd269abe27e10` | `cd480ee2abe5f96fbe8fed9b389bc6a79d62090c` |
| U100 | `7416931cd231da2d0d0c3c32966950652235a763` | `8bee0ff17d860999cb9b5bf229c3076a22eb52af` | `c41d6aa5957e09edc3fd6a9c8b098302b8c5f5c5` | `4e3114d7cf58258a47470eff4936b88d607536f4` |
| U102 | `33df4abd213d21c1007cf0811bf9522a43c670d0` | `56075069caecfa02c82445ccb4e49f0bc329b746` | `24cc2b0145fc6c69d1be907ddf89c3a148e1086e` | `16d4620df135693ba3202b88760b1147d5e1b865` |
| U103 | `6f57c8c69216505ad99d21fa7d26b8cc8023fee7` | `ce0adf77b6d0a4f35e9680d3e42dadea696b4907` | `b26470f53e6352b9872cb69f034d50d7d29faf2b` | `35efece7f26d58ff482077ca5b6cdc364895d826` |
| U104 | `bd3311e39bde2f4600869bc27d493d384716ae1a` | `ef055dcf31500e9985266712c14f67d161386e4a` | `5b97d0a6d15712cca8f048ad59b936800c24a5ac` | `83b5b2391f2694dcf00952814682ff366c1b2c6b` |
| U105 | `b28f4dbce4b2da5d13743855be8e89df0850a070` | `9d64f30a119c76915fae88032ac4a8cf8e712803` | `28917777bfa86e65f8290f6d9c45e1291eec7c15` | `c6af4a423a763015ab00767e5828e89c497f501f` |
| U106 | `bbfaca2c3d1b8a81cf7df5f770ec8805f67ea204` | `b75811d15560f88d4c948ddb5b72ea03ecd4fc72` | `eadc50d319a3e14ecfe55ae738ffccae1b8797c8` | `d5e54642f42c0865484f92da8ae4cc00dffb4bc1` |
| U107 | `62b2d9d2bad2ab8f4cfce27abb941b14b7360f90` | `8369cc1819e4d3569cd13ded987f85bcef021b67` | `f49282e6231901515e6831e747e93b045f83419a` | `a96882894f85eac0a42355affe88ecb180d50648` |
| U108 | `6ba372f271d05dc29b23c486b6e5e6500b436f0c` | `989d419aef1fcf1f6c6b17c30d0a251e3abf0354` | `877ad22879de884fc68742ae5466f7ed7ffe655b` | `b6c3bdd24a1f0151459a1cae8ab7925489fabf84` |
| U109 | `5d1c9776571a26eb5a249c8fa72bd96fa86dc848` | `b68cc066c9003c2f42382b20cbbf5a456e923be2` | `7ea04378e6f64a7912598f987535a09d652b9a01` | `fe196f0c8ce1321df61985428d83254ad2fc4484` |
| U110 | `964c165875d61266f3f7df2b0d43e961ee7f0bc2` | `c888aae3ef02991d110cbd3bc5bedd0ce6f8d401` | `497b6c948ff5960308625a9352b89103fab48311` | `d0214a0d4330fd0c8f59b9c6bd7d1ba3c202a75e` |
| U111 | `fa434516ea2a7c3d3a629a55583bcb11a825c7a7` | `b6133549540651c89d2c10d2f21f2ed209584e7d` | `7d615dd04a3fa77d40e4a21399c3f320370c29c3` | `c87ceaabbf52cfd9a0325c53b893c5757a5215ba` |
| U112 | `948995603d7d3192c000ce588c44a6ca9a4824d8` | `86418f376cd64cba3d41f5f2f9c77057e5cf57f4` | `c05b3e7eae39f8439b160d65a951245c02190d0c` | `3f7c801b4a402d7386d333e13db1684f66b8d2eb` |
| U113 | `adf00fef2be25c59c6335db4f6dde1fc104fd3cc` | `f831d7b31ae014a4fb2e07a58b7e00c07c660206` | `12dff69a43787ad075ee1d50a1defea5e5733697` | `24ab8853ef6d008d3a482cf7908133eca5af0d86` |
| U114 | `da4cbe643726d9a0cb9d2d9887ade6a8f31b8ab1` | `ba7600b05535c578d1850538268e8b4c7451c06d` | `008f2bdcf4a8c1e86b470486eeb0fa196606c2da` | `3f0423c7bbd53c0a0ada6634830629c7c773a777` |
| U115 | `70b313e361bb279b55c4f5a66e4ec2aa409036ec` | `408a921f8a76360b54d3022145eadecf2dbac202` | `fdf4b2e488bf4de6b197552ad667227e3f53c624` | `c64f5c530429437c6be7bf99e56c66f897c29cdd` |
| U116 | `4b949b1e049d3d7f225e543ffef21069e17c2f5d` | `6340dcf6fecf7f5804378962d599dd90c7d4e25a` | `861ffd689d41d3a7e410391b329d155a7159eef5` | `f6fd6e108a3d81a088e2f95ada2490d69e477163` |
| U117 | `64a63105fc0b23a0727c3830f60d5c0629f1f00d` | `5c026e2131083682888e8d9d641f660fd8017430` | `643e7288ce17c3820a6f64f9fc472c1a21d2051f` | `4651d84405d3538c2f3b01cbf7121225baf8aec0` |
| U118 | `397289a603b56705664660fd5a508a9adf60dd12` | `040464040aefa6b21156176db044c03eefa3cc05` | `1fad5a4795da333d2b137cac848ba295d72495e7` | `589c3db9d0bb76d4f64441d48304dd9b04df1f8a` |
| U119 | `574ea42a9f759fdf8973d96218c7bc80656f60d0` | `8c552ee8e607b52efab4f60ded4ce93ef6bb843a` | `9462c47e3ca0a819880b1d77c13146ba46656e3e` | `82884da01c91e33091c600fada7924606e6ff7be` |
| U120 | `9e18a57b6002ec1c83a64e76c036c0b5b3de269b` | `3ad993c85f534f8dfa939b820bbb3dc3c7261d4b` | `b1eb9f095341b6a68a50b37c08ae99a648e26001` | `3c6160f3a892a916cd3098e22c585144acfb7bd7` |
| U121 | `4695e1c104a6a83315627085cd3ddae31a5435bf` | `dd33e3da676c663c258cc1707a02c53766510fbe` | `7e37028f0d0cf28ef6b9195688308281a8be7598` | `f3eff3d142c146b096be0e3009d4b255aa63e36c` |
| U122 | `75a17df6ef8e7869147f51d989e18f8a2be09f52` | `7a74dceb2f9ac14476c0270c2c6604b755ef881b` | `9c5d9190f73334c5dd9a43257d1d51a2bd65fe12` | `f368b5e0225b311c8ad6e227e5cec2defd9bd991` |
| U123 | `3948fac71ce38a2e7e215493ff285fa3fd2c0f4a` | `815988ac9e92910b9da1ae5c29eba9c76078c642` | `9f75fe89f129b0c8a0cbd61cd79b71c5b0a43b3d` | `4db67ee276cfed96c088b86d9f8b908ee9f8044e` |
| U124 | `536034442f3a382498abb7079574ac48e2e9fccf` | `3c25e1b61ca2ea2d32a22bc595330594a221be2d` | `0c4bff568bc675d70ab04248b8f8db99cf925eb1` | `e47bd5b29a32f72e7c84423945f15924df6bcf46` |
| U125 | `e4c91fbf6a78a35b631345a862c5a41233ca7b84` | `9fbbaee78447abaddfd3784286989e7e24c2cb86` | `d1a54ef20e59ec7dda0b4bb88b6fa638d9f2ce9a` | `ac00b9b20e7d2a76704a59cfe5959f644a94ddab` |
| U126 | `764107eb9fe23ed1311620f320c0501934338f8e` | `f3f507ab20703852a0806bdc111308126d7d4189` | `f2e9aa814b2814ea9d50783311bacd02ea890f2d` | `d7f92bb637be70cf8bab2f4a54d2b3d5447201a6` |
| U127 | `58733d32469c50062dba35638e14f0ae7b67e039` | `54d049ff475d83c6ab5966befcc8687f4ca72e57` | `6c29d3b839eec925370a5e98bced071d447edd2f` | `55611f74ab40df30b1e11bfaa2e07aab20fb2bcd` |
| U128 | `e7120b0ee22fc2140c7cd47758d7f08370322dc5` | `04a48d7fdea3fb5c7a6a720063176dda80dc55df` | `7078d689f16045da4982bda9a630e01fa6b1dfb2` | `ab44e2d771ca35ecf2bd493a595a8117c8ea549d` |
| U129 | `2b3d303fcbe987f22a8755d4f64f5d69e9b34ff3` | `ba514e2b9b08706f95ac3e525b7ae395e2d69d54` | `4687825cfeda016574f174e61a0f975706b9c1c9` | `62b10575c957fe2ec687df57e7acaf2f2569b04b` |
| U130 | `cf0ac868ad0cb159beb12c4922f20b6773813aad` | `b2016ce011121331c49411c6469febd9e3aaf055` | `8c67c0196b7841bbd22d7fb7253ebaae0b628d23` | `62bcb85b8dc1cbd2182c1b723455bc2caacb636e` |
| U131 | `bb1d18003fd4cc2b8f00c692a7b44bdbd8795f14` | `befbcacbad496086b268779281e4a2897769a244` | `7ad0effe394a137b1cba77349aa462e5c49af052` | `4022ffb022c65aeb610ba2d83a08b9e028c15b2f` |
| U132 | `808a03ed90479c9c5cc87a79be8760ce5f524442` | `004683b37e88e48df8bc334cef04de9a35c627dd` | `2ec4cbe89474032a5b6a7208ab8ae237160e4ae8` | `cf7d2c251e5a1140fe80832bae52ade796b39018` |
| U133 | `7a77f5e9cf314272185555db430de47f524fe5b4` | `9ca34049a8c3dc8ec5e03dd18b0449512aa02d5a` | `06bfcd39be1a4adb47c4b4c8fd7b57c427e427c3` | `6f1d4fe75135b8a5d7ba9005418b6f46a65e2a44` |
| U134 | `7ce73aa206eb1f3672c7f1804b0488391cfafb0d` | `7e233923e8794819917e1cc4517311cb0ed71ff6` | `4fcf235faeaeb5e99938298224b4bf95f57b9267` | `8fe3e60d425621050c281d1240d65933d1dc4249` |
| U135 | `06eb4d39a0b434dc6c4a044bb527066d0cbbd9a9` | `4937bb509056a0654798008c1d217d262a0c72a8` | `804e27d1b9af1e9625c646f6fc7e0f47d044e9f4` | `4279ac9eaa26d61efc25ec79a1b209860f012a08` |
| U136 | `65d1cdd00ff84cc73a70893c0a5ce493beddb78f` | `92492171f8907e675db8d8965c74122ff9deba89` | `bfb6b8b533c7250bf827979cbe93633b406e4d74` | `92c1711a4225d7f032d0720d385a3bc98e6d0a93` |
| U137 | `62c100222f3862182f2b5cad119f591598f7874f` | `4fd25d10ac922a3c16028659e120cbfbf0c26eac` | `8d27cce8fc6f83ddf915744c5d81bf24df772ae2` | `5906acfbff3ffca525a31f833891254fcc5e9208` |
| U138 | `e32008929e304291993994075c0d43043a8f9253` | `d5f7567dafb92a138a650373119db95552030d7e` | `e1d21b32275288bda3c7b7cd6648b72a43e32816` | `faf62d5f4f16f54fc44c5c2f6fa29b6215c28cf3` |
| U139 | `8579bed20b7a1095189b19ee1906ba89de4bce6a` | `ecffb8ca25256b85bb2ad0ef11b8aa571dbd482e` | `c09f9e704af0b0ed4d36a183caa3e8d69d4fb19e` | `6db4d2f061870894b6aecfb5fe31ae6b379876a2` |
| U140 | `fee3c34f654c78e4ae297f3b45aba86c78f6707e` | `edcef283410a47219f0e2accd1c33acf7dcc8080` | `87bf3b961c725940bf8ab164a8c57d3449c00933` | `1854575e70621bde7eaec7d0124626f00fa4fedf` |
| U141 | `d1177739c3d547bfd2280df3b74315d4812e4ea7` | `3d5da38701831594758d3162d6f69abe6e34a101` | `482324052ee4e96e52a8f35a1a18aae4fbaac80b` | `dfda2b6fdc1fd1cb388d34a11c7e90e760397188` |
| U142 | `0d8f5960f4e2cc3b1d73d922c6eaa5f92fdba366` | `8d1e6cb5d767fed153fc3c087b8bf9f4e2fd4b71` | `56be3927280a0f76da8c6ca5334dc7ddce6507d9` | `45693b52bc4d7cf7f603c3b9b50d154266e43e72` |
| U143 | `6b338488ea8ee3d5ce917b0ee80419141004fcae` | `0150bb55ef818c1581b51f42bfe1b5d4681aa4f4` | `97029862f812d77655c8ee0d0f000e0d0814c132` | `e9f1bb2153ba87d1e339abd43b07099f24c17a08` |
| U145 | `d4d5be050aedd5c4f191584b4dcc47ec474efe6a` | `cae98cb47de610ea52a06276ab119aba45ade343` | `903319bcec7502460d89230b5607fac756a0638f` | `15ec18c8f5a5e9d58bd3a07cc1c0d4f9692ad17a` |
| U146 | `cc742daededdd5e0982c4dbfd02c86984fbed4a7` | `780870c402502b42fafab28a7357abac0b690fbc` | `8e7a1065f7b30803ddecd60c55e50cb3777c97a3` | `0ae65edad98fe20eead711e11213a9e9767914aa` |
| U147 | `4cfcfc711700858206a64a3ecf608270e1346611` | `656f829d4e8f406fdab76487c4affcedf67841d4` | `6db2b39f331614903a84be2cf6bf7e8b1e7e94ef` | `a939e70fc033964e78c887f048ea3ea993b9addf` |
| U148 | `f2b31c160639e015a60f6d0c9be4659dc4ee4f21` | `541e9ddcff14fc3b1ccb6212770f5d34df9bcd19` | `2dc942229508bcf785aff895707ceb0c50f3bfdd` | `9e82493b38b15586e16eb13e7fa735f3b49647e5` |
| U149 | `466ad8c691dc2663ea4c469adafd88919897f3dc` | `618a18ca7287d1bca06ba291d2058b73a97d29f9` | `ffda98c815e608702dabc8769ec07935999874a0` | `b0d340ed1cfd1e67445380a0fa3fecb347fe93a0` |
| U150 | `133bb568efd3982448c4d22eb6b52aa29116229b` | `d59468a73b384c14926ef9fbe9adfa626e2d5310` | `dfe8262863e7b248d0b637c137e1b761225f890c` | `aa6b18b1f86a454e0648f820ff23642101c512ee` |
| U151 | `42af4b557c14099b212c95276b32a402785317bf` | `0480825f2461919f4811606f5cdca4a792250df4` | `d5fee9f18cb1d1e53f56deb34f78ba9999352d5e` | `f847a79d6aa92d523eeb8cb4580c172796fa18d2` |
| U152 | `a040f7896c5f953fd1b016e5b8c09a2ca8343aa2` | `8b064630c927aac8ad9c1078771a88e67103d9ed` | `1a3eba1514876c74a9f8838ae53259ffd6fe60f8` | `a0a146a92ab9308a876e7c75749cb1e8bf8c8993` |
| U153 | `86e896e991cb5e7e53eabd22ae51ad82cc1ce90e` | `2ca49ff5f2a8e3fd8c16f894367e04b57e599da2` | `95ba6d1b27084dea9fa7ac223e56683a5a5fd221` | `d1ed520ad7318b3c844c24c0a0e0d70f83419134` |
| U154 | `995521dc432975b1ab97895c6aea20b0453c66fe` | `981ccc8dba235345a8be40b50352cbbf310fa9b9` | `e58cdd90ec8085737f4115d96a87fd866258b99d` | `06b8bd67789ab7b826d3213456ca02c3db2e5289` |
| U155 | `08cc87f0631d2b040dfb6d1702c6b82478e0a5e6` | `5bd1cd25019f299af6fdd3dfc6e96be589006fef` | `b6aedf72ddc2557c50b1d89219c1bad714b4cb48` | `8070da81949d8db0728fc3b17feff203027c3bd9` |
| U156 | `4eede47209a8691222ba456698c8e3a1a802c282` | `c19f9a7187c53d46c303d4bf90ce05d3119c7dc5` | `7d2a874bbf0cfd9d6d64295db00ad6fd3ca5f1d1` | `63d530c1c59bbde858dd5af852f7d01547597ebb` |
| U157 | `ab612c02d300b0a98dd853b01e3a9e31dd24a7ae` | `743c8a8bd6543f826125ea66f33a23d3b27fe1b2` | `29b283af2d8950007db248cc33316a3a619cd9ab` | `615b12ddb99dcaefd598022948b10fb9e8ae7222` |
| U158 | `6da937183c6dbed61fb5f55aeec28ced8f02de0a` | `d55cf52d03940fcbdc062dfd9b806508a614efbf` | `9d80c072cde031fd0080cef060cbde04dbf95738` | `a82d9feec060b6b73e8bf967bf262a83e926aec8` |

Blobs estruturais associados aos primeiros pacotes completos: Contabilidade `c1868c624b0a92639db8b5f7dfcbc9913e7440df`; Estatística `957be6167d93ef27ef77978c0baf849a249397a6`; Atualidades `a3ac4c576674a8f56ae65208a978e1e9ad2c0dff`; Direito Penal `bda9a32fc55a9ccce2711acb12584fe2c5fd11ad`; Direito Processual Penal `3376f123e7d8a5e9f04b14bdab4834cf62b83c63`; Direito Constitucional `72f92c43fbfd3c52571cb480fab5856f6918f6ff`; Legislação Especial `46e77cc0f43cf786a09a8bbb477fa71a7091d0a0`; Criminologia `01f15802bf7114e3f55e57fe91efd16df3f9fb8e`.

### Último aceite — U075

U075 — **Agricultura, pecuária e extrativismo** foi reconciliada por solicitação explícita do usuário e aceita C/H/Q `done`, **parcial/local**, consumidor PC-MA, `storageId: pc-u075`, `order: 75`.

A visão física havia sido publicada em `c1e00edc44afebf5cf73c783ace20fd7a69e1b75` e permaneceu materialmente estável. A intervenção `d54f46305e09214e67a46ac4ff4e76ec18b7b278` alterou somente `referencias.md` para registrar a proveniência que faltava; C/H/Q não foram reescritos.

A origem parcial foi resolvida em dois canônicos da biblioteca: `agricultura-pecuaria-maranhenses` e `extrativismo-vegetal-animal-mineral`, ambos com consumidores TCE Analista/Técnico comprovados por vínculos. A unidade permanece física/local porque funde dois canônicos e adapta o corte 04/08/2026 dos doadores ao corte PC-MA 13/07/2026; não há mistura físico+`vinculo.json`.

Blobs finais: C `667b534e1ec5720636cd1488b9887fdd3c0e500b`; H `3b53e51436e1aaaeef5f301a82f5192d42755361`; R `416537459ddce6eb2c8e89689141798ca0a71549`; Q `61ac2de7af522616a833e940f1243ec8a9e8023d`. Q mantém `schemaVersion: 1`, `questionSetRevision: 1`, 10 IDs únicos, 8 autorais + 2 anteriores verificadas, cinco alternativas e gabaritos válidos.

O programa literal foi reconferido no PDF oficial: item 9 cobre agricultura maranhense, principais produtos e pecuária; item 10, extrativismo vegetal, animal e mineral. Fontes centrais foram revalidadas em 21/09/2026.

**Efeito:** U001–U158 passam a C/H/Q `done`; PC-R04 passa a `done` (42/42 parciais); PC-E08-C/H/Q passam a `done`. Próxima ação habilitada: PC-F01.

### Registros operacionais superados

As reservas antigas U057, U058 e U142 foram explicitamente limpas; U057 foi retomada sob `PC-R04-U057-20260917-02` e aceita, U058 sob `PC-E06-U058-20260917-01` e aceita, U142 permaneceu pendente. O bloqueio U078 de 17/09 foi resolvido pela decisão nova de 18/09 e pelo posterior pacote aceito. Todas as reservas de produção dos pacotes aceitos acima estão encerradas; não ressuscitá-las por encontrar `analyzing` em relato anterior.

A fonte também registrava criações acidentais de sentinelas, commits sem mudança e issues #776–#779, removidas ou encerradas como `not_planned`. Não são entregas, não criam reserva e não autorizam recriar sentinelas ou executar ações diferentes da solicitada. A consolidação retira o diário repetido dessas ocorrências, preservando os commits finais e os limites de atuação. O commit alheio de navegação `cb43d6810fa0c7454f02b308f925cd5a6092de52` foi preservado na base de publicação de U092.

## 9. Critérios de produção e encerramento

Seguir integralmente `AGENTS.md`: iniciante inteligente com pouco tempo; compreensão, retenção e acerto por minuto. Ler existentes/doados inteiros e vizinhos, auditar ordem cognitiva, pré-requisitos, lacunas, redundâncias, remissões, exemplos e aplicabilidade. Revalidar fontes primárias, sem inventar norma, dado, entendimento, questão, atribuição ou URL.

C ensina: problema/contraste/mecanismo antes de termos, contexto funcional, poucos exemplos decisivos e hipotéticos identificados, tabelas como síntese. Preservar literalidade, definições, fórmulas, requisitos, exceções, prazos, jurisprudência e pegadinhas. H recupera somente o estudado. Q testa com gabarito único, distratores plausíveis e explicações, com origens verdadeiras; revisões de questão/conjunto seguem o schema. Referências completas e sem órfãs; resoluções complexas apenas quando necessárias.

Aplicar `abbr` a cada sigla/abreviatura técnica ou institucional no material didático renderizado, inclusive tabelas e após definição. Termos não ensinados recebem microdescrição contextual; conceitos indispensáveis permanecem no corpo. Não esconder regras em atributos, aninhar tags, inserir HTML no `title`, marcar campos puros ou revelar respostas. Este registro administrativo não substitui a auditoria das marcações nos artefatos didáticos.

Reordenar e cortar antes de ampliar. Crescimento exige ganho pedagógico proporcional; separar texto visível, marcação e microdescrições. Não converter aula em revisão ampliada, remissão em terceirização da compreensão ou pacote parcial em unidade concluída.

Um assunto só está `done` com C/H/Q completos e evidência na `main`; uma macro, apenas com todas as subtarefas. Não somar pais/filhos, visões e unidades como entregas equivalentes. Preservar títulos, marcas, IDs, rotas, ordens, organização e estados alheios; novas tarefas começam `pending`, caixa marcada só em `done`.

Fechar #764 somente quando o edital consolidado estiver integralmente coberto, os registros e divergências necessários ao aceite estiverem resolvidos, todas as tarefas estiverem `done`, não existir `analyzing` e houver evidência confirmada na `main`. Consolidar rotas, consumidores, cobertura, duplicações, fontes/corte e totais. O e-mail de encerramento é opcional e, quando enviado, não substitui o registro publicado.
