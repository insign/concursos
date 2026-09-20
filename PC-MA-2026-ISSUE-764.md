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
7. Enviar resumo ao próprio usuário por e-mail e informar sucesso ou falha, sem desfazer a publicação por falha de e-mail.

Não acumular novamente seções de totais a cada transição, reservas encerradas como se ativas fossem, nem versões repetidas de uma mesma evidência. Manter o estado corrente navegável e preservar decisões e evidências únicas suficientes para auditoria.

## 2. Estado corrente consolidado

Estado editorial após o aceite confirmado de U123; PC-E13 — Direito Constitucional está concluído e PC-E14 — Legislação Especial está em andamento; a migração documental anterior permanece apenas como origem deste registro.

| Dimensão | Total | pending | analyzing | done |
|---|---:|---:|---:|---:|
| Unidades reais previstas | 158 | 35 | 0 | 123 |
| Entregáveis de unidade C/H/Q | 474 | 105 | 0 | 369 |
| Tarefas macro individualizadas | 62 | 23 | 0 | 39 |

O planejamento original previa **66 macros**: 5 de implantação/fontes, 5 de reaproveitamento, 51 editoriais e 5 de fechamento. O corpo recebido individualiza apenas **62**: PC-P01, PC-R01–PC-R05, PC-E01–PC-E17 em C/H/Q e PC-F01–PC-F05. **PC-P02–PC-P05 não possuem linhas individuais recuperáveis nesse corpo; seus quatro estados não foram inferidos.**

Recontagem dos aceites registrados, sem somar macros ou visões: `U001–U074`, `U076–U123` e `U144` = **123 unidades**. Pendentes: `U075`, `U124–U143`, `U145–U158` = **35 unidades**. Cada conjunto possui o mesmo estado em C/H/Q nesta consolidação; isso não obriga igualdade de estados em ciclos futuros.

Visões consumidoras registradas: **125 = 108 físicas locais + 17 vínculos canônicos**. U123 acrescentou uma visão física local; o `grupo.json` de Legislação Especial é estrutural e não é visão nem unidade. Não confundir 125 visões materializadas com 123 unidades aceitas. O total de unidades canônicas únicas não deve ser deduzido automaticamente da quantidade de vínculos sem resolver suas origens.

Reservas ativas após o aceite de U123: **nenhuma**. PC-R04 permanece `pending`, com **40/42** parciais aceitas. U075 permanece divergente e U142 permanece `pending`.

**Próxima ação editorial: U124 — Abuso de autoridade — Lei 13.869/2019**, C/H/Q `pending`, conforme o planejamento individual de PC-E14. U123 está C/H/Q `done`; PC-E14-C/H/Q permanece `pending` enquanto U124–U141 não forem concluídas.

### Pendências e divergências herdadas

| Registro | Situação recebida | Tratamento |
|---|---|---|
| U075 | Visão física publicada, sem aceite operacional; divergência já registrada | Preservar e pular; não transformar publicação física em aceite nem reabrir outras unidades |
| U142 | `teoria-geral-direitos-humanos`, C/H/Q `pending`; reserva antiga explicitamente liberada | Não considerar a reserva antiga ativa; auditar quando selecionada |
| PC-P02–PC-P05 | Referências genéricas à implantação, mas ausência das quatro linhas próprias | Distinguir 66 previstas de 62 verificáveis; não inventar restauração, estado ou aceite |
| Programa e matriz antigos | O corpo recebido remete parte das definições e da transcrição integral a registros anteriores que já não estavam nele | Preservar o que está materializado abaixo; ausência de título, recorte, origem ou SHA é lacuna documental herdada, não licença para adivinhá-los |
| U081–U087 | Checklists e evidências de aceite `done`, mas linhas da matriz de planejamento ainda `pending` | Os dois registros são explicitados na matriz abaixo; nenhuma normalização silenciosa nesta migração |
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
- [ ] PC-R04 — `pending` — Preparar/publicar cópias parciais locais após completar suas lacunas, preservando proveniência e identidades. 40/42 aceitas; U075 divergente e U142 pendente.
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
| PC-E08 | Geografia do Maranhão — U069–U077 | pending | pending | pending |
| PC-E09 | Atualidades — U078–U080 — somente discursiva | done | done | done |
| PC-E10 | Direito Penal — U081–U090 | done | done | done |
| PC-E11 | Direito Processual Penal — U091–U097 | done | done | done |
| PC-E12 | Direito Administrativo — U098–U111 | done | done | done |
| PC-E13 | Direito Constitucional — U112–U122 | done | done | done |
| PC-E14 | Legislação Especial — U123–U141 | pending | pending | pending |
| PC-E15 | Direitos Humanos — U142–U148 | pending | pending | pending |
| PC-E16 | Medicina Legal — U149–U155 | pending | pending | pending |
| PC-E17 | Criminologia — U156–U158 | pending | pending | pending |

PC-E09-C inclui orientação de redação; PC-E09-H recupera repertório/estrutura; PC-E09-Q reúne fixação e propostas abertas no material didático, sem atribuí-las à objetiva do cargo. PC-E14-C inclui auditoria normativa das literalidades defeituosas, sem correção silenciosa.

### Fechamento e aceite

- [ ] PC-F01 — `pending` — Conferir a matriz contra todos os itens/subitens do edital consolidado, sem lacunas, dupla contagem ou redistribuição inferida de pesos.
- [ ] PC-F02 — `pending` — Inspecionar manualmente schemas, frontmatter, Markdown, `abbr`, links, referências, questões, revisões, resoluções, identidades, rotas, vínculos e consumidores.
- [ ] PC-F03 — `pending` — Reconsultar publicações oficiais e fontes materiais, distinguindo alterações posteriores do corte e resolvendo/explicitando literalidades defeituosas.
- [ ] PC-F04 — `pending` — Confirmar na `main` commits e arquivos resolvidos; consolidar origens, consumidores, cobertura e duplicações por unidade.
- [ ] PC-F05 — `pending` — Recalcular macros, unidades reais, canônicas/locais e visões; fechar #764 somente com cobertura integral, tudo `done` e nenhuma reserva ativa.

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
| U001–U005; U007–U019 | Língua Portuguesa; parciais | C/H/Q done; títulos, mapeamento integral e proveniência individual não estavam materializados |
| U006 | Língua Portuguesa, item 5; `estrutura-morfossintatica-periodo` | C/H/Q done, aceite sem mudança; token PC-E01-U006-20260916-01; caminho/SHA completos não individualizados no registro recebido |
| U020 | Língua Portuguesa, itens 7/7.1/7.3; `redacao-oficial-linguagem` | C/H/Q done, aceite sem mudança; token PC-E01-U020-20260916-01; sem restauração de campos ausentes |
| U021 | Língua Portuguesa, itens 7.2/7.4; `expedientes-oficiais-formatos` | C/H/Q done, aceite sem mudança; token PC-E01-U021-20260916-01 |
| U023–U024; U026–U027; U030; U032–U033 | Informática; parciais | C/H/Q done; detalhes individuais antigos não materializados |
| U029 | Informática; integral | C/H/Q done; resolver vínculo publicado antes de qualquer edição |
| U035–U041 | Raciocínio Lógico; integrais | C/H/Q done; resolver vínculos, não deduzir origens por título |
| U042 | Raciocínio Lógico; parcial | C/H/Q done; detalhes antigos não individualizados |
| U056; U059–U061 | Administração; parciais | C/H/Q done; U059 trata SIDOR/SIAFI, U060 receita e U061 despesa/execução conforme fronteiras registradas |
| U062; U068 | História do Maranhão; parciais | C/H/Q done; detalhes individuais antigos não materializados |
| U063–U067 | História do Maranhão; integrais | C/H/Q done; resolver vínculos publicados |
| U069–U071; U073 | Geografia do Maranhão; integrais | C/H/Q done; resolver vínculos publicados |
| U072; U074; U076–U077 | Geografia do Maranhão; parciais | C/H/Q done; preservar origens/identidades da main, não recriá-las |
| U075 | Geografia do Maranhão; parcial | C/H/Q pending no consolidado; divergência física sem aceite preservada |
| U098–U100; U102–U111 | Direito Administrativo; novas | C/H/Q pending; recortes individuais ausentes no corpo recebido |
| U101 | Direito Administrativo; parcial | C/H/Q done; aceite recebido sem detalhamento antigo suficiente neste corpo |
| U112–U122 | Direito Constitucional; novas | C/H/Q done; planejamento individual materializado em 20/09/2026 sob `PC-E13-PLANEJAMENTO-20260920T0843-01`; evidências individuais na seção 8 |
| U123–U141 | Legislação Especial; novas | C/H/Q pending; planejamento individual materializado em 20/09/2026 sob `PC-E14-PLANEJAMENTO-20260920T1155-01`; ver seção 7 |
| U142 | Direitos Humanos; parcial; `teoria-geral-direitos-humanos` | C/H/Q pending; reserva PC-R04-U142-20260915-01 explicitamente liberada |
| U143; U145–U148 | Direitos Humanos; novas | C/H/Q pending; detalhes individuais ausentes |
| U144 | Direitos Humanos; parcial | C/H/Q done; não importar novo aceite nem inventar origem ausente |
| U149–U155 | Medicina Legal; novas | C/H/Q pending; detalhes individuais ausentes |
| U156–U158 | Criminologia; novas | C/H/Q pending; detalhes individuais ausentes |

Esses registros são lacunas de documentação, não placeholders de aulas. Os assuntos publicados permanecem na `main`; uma futura reconstrução documental deve verificar arquivos/identidades, programa e evidências, distinguindo informação encontrada de decisão editorial nova. Não reabrir `done` apenas por ausência de `abbr` ou por esta reorganização.

## 6. Matriz dos recortes explicitamente disponíveis

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
| 2 | U124 — Abuso de autoridade — Lei 13.869/2019 — `abuso-autoridade-lei-13869` | Lei nº 13.869/2019 integral: sujeitos, elemento subjetivo, crimes, efeitos, penas restritivas e procedimento/remissões indispensáveis | nova/local; apoio apenas incidental de U090/U096 | Não duplicar crimes funcionais gerais de U090 nem prisão temporária de U096; ensinar as fronteiras necessárias | pending | pending | pending |
| 3 | U125 — Crimes de tortura — Lei 9.455/1997 — `crimes-tortura-lei-9455` | Lei nº 9.455/1997 integral. O ano **1965** é erro literal do edital, preservado acima | nova/local; fontes primárias | Lei nº 15.410/2026 acrescentou modalidade de tortura antes do corte; revalidar texto compilado em 13/7/2026 | pending | pending | pending |
| 4 | U126 — Estatuto da Criança e do Adolescente — Lei 8.069/1990 — `estatuto-crianca-adolescente-lei-8069` | Lei nº 8.069/1990 integral. O ano **1970** é erro literal do edital, preservado acima | nova/local; fontes primárias | Conectar à U122 apenas como base constitucional. Reconstruir o texto no corte: alterações posteriores a 13/7/2026 não entram | pending | pending | pending |
| 5 | U127 — Estatuto do Desarmamento — Lei 10.826/2003 — `estatuto-desarmamento-lei-10826` | Lei nº 10.826/2003 integral, incluindo registros, porte, crimes e disposições correlatas exigidas pelo diploma | nova/local; fontes primárias | Lei nº 15.358/2026 alterou a Lei nº 10.826/2003 antes do corte; não usar redação histórica | pending | pending | pending |
| 6 | U128 — Crimes ambientais — Lei 9.605/1998 — `crimes-ambientais-lei-9605` | Lei nº 9.605/1998 no recorte integral do diploma citado, com ênfase penal sem apagar disposições gerais, processuais e administrativas necessárias à compreensão da lei | nova/local; fontes primárias | U122 fornece apenas a base do art. 225; não substituir a lei penal ambiental por Direito Constitucional | pending | pending | pending |
| 7 | U129 — Lei Maria da Penha — Lei 11.340/2006 — `lei-maria-penha-lei-11340` | Lei nº 11.340/2006 integral: conceitos, formas de violência, assistência, medidas protetivas, atuação policial/judicial e disposições penais/processuais pertinentes | nova/local; apoio incidental U086, sem origem compartilhada | Lei nº 15.455/2026 alterou o diploma antes do corte; U086 é ponte penal, não substituto | pending | pending | pending |
| 8; 13 | U130 — Investigação criminal conduzida pelo delegado de polícia — Lei 12.830/2013 — `investigacao-criminal-delegado-lei-12830` | Lei nº 12.830/2013 integral. Esta unidade absorve as duas ocorrências do edital sem duplicação física | nova/local; apoio parcial U092, conteúdo `7afe860d0f6dd474774dc8c5cade2eb8cdb642c8` | U092 ensina inquérito policial; U130 ensina a lei especial e suas prerrogativas/garantias, evitando repetição do procedimento geral | pending | pending | pending |
| 9 | U131 — Lavagem de dinheiro — Lei 9.613/1998 — `lavagem-dinheiro-lei-9613` | Lei nº 9.613/1998 integral: tipos, medidas, deveres preventivos, comunicação/controle e procedimento aplicável | nova/local; fontes primárias | Lei nº 15.358/2026 alterou o diploma antes do corte; distinguir crime antecedente, ocultação/dissimulação e deveres administrativos | pending | pending | pending |
| 10 | U132 — Crimes hediondos — Lei 8.072/1990 — `crimes-hediondos-lei-8072` | Lei nº 8.072/1990 integral no corte, com rol, consequências e regras especiais vigentes | nova/local; apoio incidental U096 | Lei nº 15.358/2026 integra o corte; alterações posteriores a 13/7/2026 devem ser excluídas. Não fundir com prisão temporária | pending | pending | pending |
| 11 | U133 — Crimes resultantes de preconceito de raça ou cor — Lei 7.716/1989 — `crimes-preconceito-raca-cor-lei-7716` | Lei nº 7.716/1989 integral no corte, preservando tipos, causas e disposições gerais atuais | nova/local; biblioteca de igualdade racial é somente apoio conceitual parcial, blob `8eb5f97caddf3274a2215fe6883939edfaf5bac7` | Não confundir o Estatuto da Igualdade Racial com a lei penal especial; verificar alterações legislativas até o corte | pending | pending | pending |
| 12 | U134 — Identificação criminal do civilmente identificado — Lei 12.037/2009 — `identificacao-criminal-lei-12037` | Lei nº 12.037/2009 integral, incluindo hipóteses, procedimentos e tratamento dos dados nos limites do diploma | nova/local; fontes primárias | Ponte mínima com U092 e garantias de U114; não transformar em capítulo geral de identificação civil | pending | pending | pending |
| 14 | U135 — Juizados Especiais Criminais — Lei 9.099/1995 — `juizados-especiais-criminais-lei-9099` | Recorte **criminal** da Lei nº 9.099/1995, com disposições comuns indispensáveis, competência, composição civil, transação penal, procedimento e suspensão condicional do processo; não cobrir Juizado Especial Cível como assunto autônomo | nova/local; fontes primárias | Conectar a U091–U097 apenas quando necessário ao rito/cautela; preservar leis especiais que afastem a Lei nº 9.099/1995 | pending | pending | pending |
| 15 | U136 — Estatuto da Pessoa Idosa — Lei 10.741/2003 — `estatuto-pessoa-idosa-lei-10741` | Lei nº 10.741/2003 integral. O edital usa “Estatuto do Idoso”; a denominação oficial vigente é “Estatuto da Pessoa Idosa” | nova/local; biblioteca `acessibilidade-prioridade-atendimento` é apoio parcial, blob `f0d4cfd100e4608d44920012f23e6d821ba8bc11` | U122 fornece base constitucional do art. 230; não duplicar a lei inteira lá | pending | pending | pending |
| 16 | U137 — Crimes de trânsito — Lei 9.503/1997 — `crimes-transito-lei-9503` | Recorte dos crimes de trânsito do Código de Trânsito Brasileiro e disposições gerais/processuais diretamente necessárias a eles; não transformar U137 em curso integral de trânsito administrativo | nova/local; fontes primárias | Reconstruir texto até 13/7/2026; alterações posteriores ao corte do Código de Trânsito Brasileiro não entram | pending | pending | pending |
| 17 | U138 — Crimes eleitorais — Lei 4.737/1965 — `crimes-eleitorais-codigo-eleitoral-lei-4737` | Recorte penal do Código Eleitoral: crimes, sanções e disposições processuais diretamente ligadas; não cobrir Direito Eleitoral integral | nova/local; fontes primárias | Lei nº 15.358/2026 alterou o Código Eleitoral antes do corte; preservar o recorte criminal do item | pending | pending | pending |
| 18 | U139 — Organização criminosa — Lei 12.850/2013 — `organizacao-criminosa-lei-12850` | Lei nº 12.850/2013 integral: conceito, crimes, investigação, meios de obtenção da prova, colaboração, infiltração, ação controlada e procedimento | nova/local; referências incidentais em PC-E10/E11, sem doador integral | Distinguir a Lei nº 12.850/2013 do novo marco da U140; alterações posteriores a 13/7/2026 devem ser excluídas | pending | pending | pending |
| 19 | U140 — Marco Legal do Combate ao Crime Organizado — Lei 15.358/2026 — `marco-combate-crime-organizado-lei-15358` | Lei nº 15.358/2026 integral — Marco Legal do Combate ao Crime Organizado no Brasil (Lei Raul Jungmann), crimes próprios, normas processuais/operacionais e alterações legislativas promovidas | nova/local; fragmentos das alterações aparecem em PC-E10/E11, sem pacote integral | Em vigor desde a publicação em março de 2026. É dependência transversal de U123, U127, U131, U132 e U138; essas unidades devem aplicar suas alterações antes de U140 ser estudada | pending | pending | pending |
| 20 | U141 — Interceptação telefônica — Lei 9.296/1996 — `interceptacao-telefonica-lei-9296` | Lei nº 9.296/1996 integral + ponte mínima indispensável para **conceito** e **provas ilícitas**, termos expressamente usados no edital | nova/local; fontes primárias | U093 cobre teoria geral da prova; U141 não deve duplicá-la, apenas explicar a conexão necessária com interceptação e ilicitude | pending | pending | pending |

#### Controle de corte e dependências legislativas

Toda unidade de PC-E14 deve ser produzida com a redação aplicável em **13/7/2026**, e não com o texto compilado atual sem reconstrução temporal. A Lei nº 15.358/2026, de 24/3/2026, entrou em vigor na data de publicação e alterou, entre outros diplomas do próprio bloco, as Leis nº 11.343/2006, nº 10.826/2003, nº 9.613/1998, nº 8.072/1990 e o Código Eleitoral; essas alterações são dependências de produção, não motivo para esperar U140. Também há alterações de 2026 anteriores ao corte que deverão ser absorvidas no respectivo diploma, como a Lei nº 15.410/2026 na Lei de Tortura e a Lei nº 15.455/2026 na Lei Maria da Penha.

A produção deve rejeitar contaminação pós-corte. Exemplo já identificado: a Lei nº 15.487/2026, publicada em agosto, alterou ECA, Crimes Hediondos e Lei nº 12.850/2013 depois de 13/7/2026; essas mudanças não pertencem à objetiva deste edital. O mesmo cuidado vale para alterações posteriores do Código de Trânsito Brasileiro. PC-F03 fará a revalidação final, mas cada U123–U141 precisa nascer com o corte correto.

**Ordem habilitada:** U124 é a primeira unidade pendente de PC-E14. U123 está C/H/Q `done`; U124–U141 permanecem C/H/Q `pending`. PC-E14-C/H/Q continua `pending` até a conclusão de todas as unidades do bloco.




## 8. Evidências de publicação e aceite

Esta seção substitui relatos repetidos de reserva, publicação e totais. As linhas anteriores a U123 preservam evidências transferidas da campanha; a partir de U123, os aceites são registrados após publicação e releitura direta na `main`. Os commits identificam as versões publicadas e permitem auditar o conjunto completo de fontes e decisões editoriais; não dependem de comentários ou de versões anteriores da issue.

Para cada unidade, o destino completo é resolvido pelas seções 5–7. Os quatro blobs estão na ordem **C (`conteudo.md`) / H (`cheat-sheet.md`) / R (`referencias.md`) / Q (`questoes.json`)**. Pacotes abaixo foram registrados sem `vinculo.json` ou resoluções separadas; não generalizar isso a unidades não individualizadas.

### Commits, quantidades e origem das questões

| Unidade | Commit final de publicação ou main no aceite sem mudança | Questões autorais + anteriores | Referência das anteriores registrada no corpo recebido |
|---|---|---|---|
| U022 | `22b32a62d1723303a83977de1875ad1de9d72822` | 17 + 3 | Telebras/CESPE 2015, itens 102 C, 106 C, 108 E; o relato também menciona PCDF em outra linha de fontes, divergência de atribuição a conferir no pacote |
| U025 | `a8e5a26179da711ee98087622ef2e916059cae3f` | 16 + 4 | FGV Câmara do Recife 2014, ALEMA 2023, PM-SP 2024; Cebraspe MP-TO 2024 |
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

C/E nas referências acima significam Certo/Errado no gabarito original; letras A/B/C de múltipla escolha pertencem às provas originais, não obrigatoriamente à alternativa remapeada. Todos os conjuntos individualizados foram registrados com `questionSetRevision: 1`; preservar IDs/origin e rever revisões quando houver alteração lógica.

### Blobs dos quatro artefatos

| Unidade | C | H | R | Q |
|---|---|---|---|---|
| U022 | `318358e2fd8ff603c4b81c123ab33991cca1edab` | `4fe0f52cdf32f6c9f5e45de8343327c9dbd265b1` | `4af751fbb8922a85d0672425201072f378857872` | `2a0263eddfcfed3da7598c9e8827827bfa653303` |
| U025 | `d347cc042833ace0ad886288ea96d665004e6ce7` | `d931fc35d95d69e1fa83ab6453a437e3b2db8a14` | `cef414bb0353969fb9bce35d4045abfed35a0433` | `edab46630128b63802815817181c9c568ed8a51c` |
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

Blobs estruturais associados aos primeiros pacotes completos: Contabilidade `c1868c624b0a92639db8b5f7dfcbc9913e7440df`; Estatística `957be6167d93ef27ef77978c0baf849a249397a6`; Atualidades `a3ac4c576674a8f56ae65208a978e1e9ad2c0dff`; Direito Penal `bda9a32fc55a9ccce2711acb12584fe2c5fd11ad`; Direito Processual Penal `3376f123e7d8a5e9f04b14bdab4834cf62b83c63`; Direito Constitucional `72f92c43fbfd3c52571cb480fab5856f6918f6ff`; Legislação Especial `46e77cc0f43cf786a09a8bbb477fa71a7091d0a0`.

### Último aceite — U123

Pacote de **Lei de Drogas — Lei nº 11.343/2006**: C/H/Q `done`, nova/local, consumidor PC-MA, `storageId: pc-u123`, `order: 123`. Snapshot editorial final `7e25095085350dd42b32651d0f1bb05c0e4ca343`; base reservada `5571cff5030d4c975cb135ed0558579d23040a23`. A comparação base→snapshot confirma **exatamente cinco caminhos reservados**: o novo `legislacao-especial/grupo.json` e os quatro artefatos da U123, sem alteração lateral. O grupo **Legislação Especial**, ordem 5, foi publicado com blob `46e77cc0f43cf786a09a8bbb477fa71a7091d0a0`.

A unidade permanece **nova/local**, sem `vinculo.json` e sem doador integral. A produção foi feita a partir do texto compilado da Lei nº 11.343/2006 e das fontes primárias alteradoras. Foram incorporadas a Lei nº 15.281/2025, no art. 23, e a Lei nº 15.358/2026, especialmente o novo art. 40-A, ambas vigentes antes do corte de **13/7/2026**. A referência registra, sem correção silenciosa, a inconsistência numérica observada na anotação do texto compilado do art. 23 e mantém como fonte primária a Lei nº 15.281/2025.

Jurisprudência oficial revalidada em 20/9/2026: Tema 506 e Súmulas Vinculantes 59 e 63 do Supremo Tribunal Federal, Tema 959 sobre liberdade provisória e Súmulas 607 e 347 do Superior Tribunal de Justiça. O arquivo preserva a diferença entre corte legislativo e a regra editalícia de jurisprudência publicada até 30 dias antes da prova; PC-F03 continua responsável pela revalidação final dessa janela.

Foram publicadas **37 questões autorais e nenhuma questão anterior**. Não houve atribuição fictícia a banca, ano ou prova e não foi criada quota artificial. As explicações bastam para o nível das questões; nenhuma resolução separada foi necessária.

Cobertura: Sistema Nacional de Políticas Públicas sobre Drogas; prevenção, atenção, tratamento e reinserção; internação voluntária/involuntária e plano individual; uso pessoal e Tema 506; arts. 33–47; investigação e procedimento dos arts. 48–59; apreensão, alienação e perda de bens dos arts. 60–63-F; cooperação e disposições finais. A aula ensina as pontes necessárias com U092/U093/U132/U140 sem transferir esses assuntos para U123.

Densidade: `conteudo.md` tem 31.718 caracteres incluindo marcação e microdescrições; `cheat-sheet.md`, 8.393. O crescimento é próprio de uma unidade nova que cobre o diploma integral, alteração de 2026 e jurisprudência indispensável, sem doador integral. Microglossário pós-inspeção: **26 pares `abbr` no conteúdo e 10 no cheat sheet, todos balanceados**; as siglas restantes detectáveis nas referências são IDs internos excluídos da marcação. O JSON permanece texto puro, `questionSetRevision: 1`, 37 IDs únicos e gabaritos referenciando alternativas existentes.

**PC-E14 permanece em andamento:** U123 está C/H/Q `done`; U124–U141 seguem `pending`. A próxima intervenção habilitada é U124 — Abuso de autoridade — Lei nº 13.869/2019.

### Registros operacionais superados

As reservas antigas U057, U058 e U142 foram explicitamente limpas; U057 foi retomada sob `PC-R04-U057-20260917-02` e aceita, U058 sob `PC-E06-U058-20260917-01` e aceita, U142 permaneceu pendente. O bloqueio U078 de 17/09 foi resolvido pela decisão nova de 18/09 e pelo posterior pacote aceito. Todas as reservas de produção dos pacotes aceitos acima estão encerradas; não ressuscitá-las por encontrar `analyzing` em relato anterior.

A fonte também registrava criações acidentais de sentinelas, commits sem mudança e issues #776–#779, removidas ou encerradas como `not_planned`. Não são entregas, não criam reserva e não autorizam recriar sentinelas ou executar ações diferentes da solicitada. A consolidação retira o diário repetido dessas ocorrências, preservando os commits finais e os limites de atuação. O commit alheio de navegação `cb43d6810fa0c7454f02b308f925cd5a6092de52` foi preservado na base de publicação de U092.

## 9. Critérios de produção e encerramento

Seguir integralmente `AGENTS.md`: iniciante inteligente com pouco tempo; compreensão, retenção e acerto por minuto. Ler existentes/doados inteiros e vizinhos, auditar ordem cognitiva, pré-requisitos, lacunas, redundâncias, remissões, exemplos e aplicabilidade. Revalidar fontes primárias, sem inventar norma, dado, entendimento, questão, atribuição ou URL.

C ensina: problema/contraste/mecanismo antes de termos, contexto funcional, poucos exemplos decisivos e hipotéticos identificados, tabelas como síntese. Preservar literalidade, definições, fórmulas, requisitos, exceções, prazos, jurisprudência e pegadinhas. H recupera somente o estudado. Q testa com gabarito único, distratores plausíveis, explicações e origens verdadeiras; revisões de questão/conjunto seguem o schema. Referências completas e sem órfãs; resoluções complexas apenas quando necessárias.

Aplicar `abbr` a cada sigla/abreviatura técnica ou institucional no material didático renderizado, inclusive tabelas e após definição. Termos não ensinados recebem microdescrição contextual; conceitos indispensáveis permanecem no corpo. Não esconder regras em atributos, aninhar tags, inserir HTML no `title`, marcar campos puros ou revelar respostas. Este registro administrativo não substitui a auditoria das marcações nos artefatos didáticos.

Reordenar e cortar antes de ampliar. Crescimento exige ganho pedagógico proporcional; separar texto visível, marcação e microdescrições. Não converter aula em revisão ampliada, remissão em terceirização da compreensão ou pacote parcial em unidade concluída.

Um assunto só está `done` com C/H/Q completos e evidência na `main`; uma macro, apenas com todas as subtarefas. Não somar pais/filhos, visões e unidades como entregas equivalentes. Preservar títulos, marcas, IDs, rotas, ordens, organização e estados alheios; novas tarefas começam `pending`, caixa marcada só em `done`.

Fechar #764 somente quando o edital consolidado estiver integralmente coberto, os registros e divergências necessários ao aceite estiverem resolvidos, todas as tarefas estiverem `done`, não existir `analyzing` e houver evidência confirmada na `main`. Consolidar rotas, consumidores, cobertura, duplicações, fontes/corte e totais. O e-mail de encerramento não substitui o registro publicado.
