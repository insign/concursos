# TCE/MA 2026 — Analista Administração — regras da revisão de H/M

Issue operacional: <https://github.com/insign/concursos/issues/784>  
Concurso: `tce-ma-2026-analista-administracao` / `tcema-2026-adm`.

## 1. Autoridade e escopo

A #784 é a única fonte de estados, checklist, reservas, próxima ação e totais. Este arquivo contém regras, fontes comuns, identificação estável e evidência mínima; não duplica estados nem mantém diário. Comentários, histórico e memória não definem a fila. A `main`, `AGENTS.md`, schemas, catálogo, grupos, resolvedor, vínculos e ADRs definem os contratos atuais. Pedidos explícitos prevalecem.

O alvo é um `cheat-sheet.md` (H) por ciclo e, ao terminar os assuntos do grupo direto, sua mega revisão (M). `conteudo.md` é base comparativa da revisão, não alvo de reescrita. Questões/resoluções e referências podem receber ajustes pertinentes, sem converter a campanha em produção de banco. Não alterar #755, #764 ou seus arquivos de campanha, nem infraestrutura, identidades, rotas, ordens ou organização.

## 2. Fontes comuns, recorte e cortes

Base documental consultada em 22–23/09/2026; datas dos atos não são automaticamente datas de publicação:

- **E1 — abertura:** [Edital nº 1, de 6/7/2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Cargo 1, especialidade Administração; conhecimentos gerais aplicáveis em 14.2.3 e específicos do cargo em 14.2.4; cortes em 13.32–13.34.
- **E2 — retificação:** [Edital nº 2, de 29/7/2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/F58DF49F2A1491FC79CAB3CFE1E2E32FEDDD87C38FA40B3ED90C1F1AF8DEF047.pdf). Altera regras documentais e cabeçalhos de aplicação de disciplinas. [Versão de E1 consolidada após E2](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/FB3B3652560CBE6DEDD864B83A61FE5A9D2A7C935588EAB7E944F0EABD87ECFC.pdf); não tratá-la como consolidação de atos posteriores.
- **E3 — retificação:** [Edital nº 3, de 10/8/2026, na banca](https://cdn.cebraspe.org.br/concursos/tce_ma_26/arquivos/7A97EFDD5D02CE0C8BA5743DF75EA25AB2C00C35A5616E9D999111BE95629CB0.pdf), [publicado no Diário Oficial Eletrônico nº 3073/2026, de 17/8/2026, páginas 76–77](https://diario.apps.tcema.tc.br/publicacao/pdf/9558). Trata de reenvio documental, alteração de inscrição e exceções de aplicação de Direito Administrativo/Constitucional. O Cargo 1 continua excluído dessas duas disciplinas gerais; não acrescentar grupos por importar programa de outro cargo.
- **Publicação e acompanhamento:** a [notícia institucional de 8/7/2026](https://www.tcema.tc.br/index.php/noticias-concurso-tcema) informa publicação de E1 em **7/7/2026**, distinta da data do ato, 6/7. [Página oficial da banca](https://www.cebraspe.org.br/concursos/tce_ma_26) para atos posteriores.

**Legislação:** 13.32 considera alterações com entrada em vigor até a publicação de E1; a data informada pelo Tribunal é 7/7/2026. O item 13.33 admite legislação não vigente quando expressamente incluída nos objetos de avaliação. **Jurisprudência:** 13.33.1 usa publicação de entendimentos dos tribunais superiores até 30 dias antes da realização das provas; revalidar o calendário, sem transformar esse limite em corte legislativo. Retificações e consultas não reiniciam os cortes por si. Mudança de regra depende de outro edital (13.34).

A consulta ao índice dinâmico da banca não forneceu lista integral extraível: E1/E2/E3 são os atos efetivamente identificados, não uma garantia de inexistência de ato posterior. Havendo novo ato ou divergência material de publicação, conferir seu efeito e substituir este registro comum. Não reescrever material alheio nesta preparação nem bloquear assunto independente por mera limitação de acesso.

## 3. Execução e aceite

Releia a issue, este arquivo e `AGENTS.md`; confirme a tarefa, origem, consumidores e contratos na `main`. Retome somente reserva comprovadamente própria. Reserve token, H/M, arquivos, origem/consumidores e SHA-base na issue e confirme por releitura. Pendência reservada vira `analyzing`; nunca rebaixe `done`. Uma origem tem um executor. Confira campanhas com arquivos comuns sem alterar seus estados.

Leia integralmente os artefatos pertinentes e vizinhos suficientes para fronteiras. Revalide pontos materiais na web em fontes primárias, distinguindo consulta, publicação, vigência e corte. Não invente fatos, atribuições, questões, gabaritos ou URLs. Limitações de consulta devem ser explicitadas, não convertidas em verificação bem-sucedida.

**H recupera:** organize contrastes, mecanismos, fórmulas com condições, requisitos, exceções, prazos e armadilhas. Não copie a aula nem introduza fundamento indispensável que ela não ensine. Reordene e corte antes de ampliar; crescimento exige ganho proporcional, sem relatório de métricas por tarefa. Erro da aula fora do escopo deve ser confirmado e não reproduzido; registre só a dependência ainda necessária, sem iniciar outra campanha de conteúdo.

**Questões são contraprova:** confronte anteriores verificáveis, ainda pertinentes ao cargo e corte, com texto-base, comando, gabarito definitivo e fundamentação. H deve recuperar o conceito e permitir compreender o raciocínio, não guardar respostas prontas. Sem quota; falta de anterior pertinente não impede aceite fundamentado. Adições são secundárias. Corrija itens utilizados com erro comprovado; preserve IDs/origin verdadeiros, direitos, gabarito único, explicações e revisões exigidas pelo contrato. Não altere questões por ritual.

**M integra:** só fica habilitada após todos os H de sua faixa; exige inspeção própria. Confronte-a com aulas, resumos, fontes e questões pertinentes. Integre relações e distinções confundíveis, sem concatenar H nem reensinar aulas. A fila é H do grupo → M do grupo → grupo seguinte. Só impedimento real permite pular para tarefa independente; não criar mega revisões de macroblocos nem duplicar descendentes.

Cumpra o microglossário de `AGENTS.md` em H/M e referências editáveis: siglas no ponto de uso, descrições contextuais curtas, sem esconder regras em `title`, sem aninhamento ou pistas de gabarito. Preserve campos puros, código, fórmulas, frontmatter e transcrições. Bibliografia permanece nos `referencias.md` pertinentes, com fontes novas sustentadas e sem órfãs; nunca acrescentar neles diário da campanha.

## 4. Publicação e evidência mínima

Sem branch/PR, testes, builds, CI ou checks salvo pedido explícito. Antes de escrever, releia issue, arquivo e `main`; confirme reserva/origem/SHA. Inspecione manualmente fatos, corte, Markdown, abbr e contratos. Em corrida, reaplique somente sua mudança, sem apagar ou liberar trabalho alheio.

Publique o material na `main` pelo conector em commit coerente e releia commit/arquivos. Depois substitua apenas a célula **Evidência** da tarefa neste índice pelo commit confirmado e publique/confirme este registro. Só então marque `done` na issue, recalcule seus totais e libere a reserva. A issue recebe somente estado e link da última consolidação, não relatório de execução.

Sem mudança editorial necessária: registre na mesma célula `sem alteração @ SHA` com uma justificativa breve de aderência; o SHA é o commit existente que contém o material efetivamente inspecionado. Isso não dispensa a auditoria nem exige commit editorial vazio. `—` significa ausência de evidência de aceite nesta campanha, nunca revisão herdada. Não usar o commit de criação do índice como evidência de revisão de H/M.

Sem confirmação, tarefa própria não publicada volta a `pending`; bloqueio estrutural mantém `analyzing` com evidência e intervenção mínima. Falha no painel exige reconciliar, não refazer publicação confirmada. No encerramento, todos os H/M devem estar `done`, sem reservas ou impedimentos; reduza este arquivo à síntese final e links. Envie confirmação breve ao próprio usuário, sem desfazer publicação por falha de e-mail.

## 5. Poda e identidade estável

Uma linha por H/M e uma célula substituível de evidência, sem histórico acumulado. Conserve somente este índice, fontes comuns, regras reutilizáveis, decisões estruturais necessárias, dependências abertas e notas indispensáveis à M do grupo atual. Não adicionar relatos, diffs, listas de consultas, inventários de blobs, reservas encerradas, métricas repetidas ou tabelas questão → trecho.

Ao trocar de assunto, elimine notas transitórias próprias já resolvidas; após M, elimine as notas do grupo consumidas pela revisão. Preserve notas alheias e dependências ainda abertas. Não transfira o diário a comentários, referências ou e-mails. O Git conserva os detalhes; não define a fila.

**Revalidar não é reatribuir:** cada H permanece associado ao caminho e `storageId` abaixo, mesmo que a ordem publicada mude. Cada M permanece associada ao grupo identificado. Não redescubra a identidade pelo número da posição nem substitua por assunto de título parecido. Divergência deve ser explicitada; mudança de identidade exige decisão autorizada. Os títulos e estados continuam no checklist da #784, sem duplicação aqui.

## 6. Convenções de localização

Base estrutural do índice: `b66b49c5554b00064c9265719604f01ebb5b5699`. A comparação com a base do inventário `bb5679817eb422bb55c8985f4305dd7bcf0d4d34` mostrou mudança apenas neste arquivo operacional, não nos assuntos, grupos ou vínculos. Isso identifica a versão dos metadados, não certifica a revisão didática.

- `A` = `src/content/assuntos/tce-ma-2026-analista-administracao/`; `B` = `src/content/biblioteca/`.
- No caminho de grupo, `G/` = `conhecimentos-gerais/`; `E/` = `conhecimentos-especificos/`.
- Pasta consumidora de H = `A` + caminho de seu grupo na tabela M + segmento da linha H. A identidade consumidora combina `tcema-2026-adm` com o `storageId` registrado. O número de H registra sua ordem inicial, sem autorizar renumeração futura.
- **L:** origem física da pasta consumidora; editar seu `cheat-sheet.md`. **V:** referência de origem é o `vinculo.json` dessa pasta concreta; ler `canonical` e resolver `B` + valor literal + `/cheat-sheet.md`. V não presume que a origem tenha o mesmo slug ou grupo.
- Consumidor fixo de todas as linhas: Analista Administração. Em V, apure todos os demais consumidores por igualdade do valor `canonical` nos vínculos vigentes, antes de reservar/editar; registre a lista atual na reserva, não um inventário permanente duplicado. Uma origem canônica é editada uma vez, compatível com todos; sem mistura físico/vínculo, overlays ou cópias de contorno.
- Em M, `L` resolve `A` + grupo + `/mega-revisao/index.md`; `V: caminho` registra o alvo canônico do `mega-revisao/vinculo.json` do grupo e resolve `B` + caminho + `/mega-revisao/index.md`. Revalide o vínculo e a igualdade exata do escopo resolvido, conforme ADR-005/007. Identidade editorial de M = concurso + caminho completo do grupo; não inventar `storageId` de grupo.
- Na coluna `storageId`, `=` representa literalmente o segmento da mesma linha, já identificado no inventário; não é uma regra para inferir identidades de outros arquivos. Em V, a referência explícita permite resolver a origem sem perder a identificação da tarefa.

## 7. Grupos, dependências e mega revisões

| M | Caminho do grupo em A | H dependentes | Origem de M | Evidência |
|---|---|---|---|---|
| M01 | `G/lingua-portuguesa` | H001–H018 | V: `lingua-portuguesa` | [`eb9996a`](https://github.com/insign/concursos/commit/eb9996a16eb36c0d0bd14bbdc442735895cb562c) |
| M02 | `G/competencias-digitais-informatica-aplicada-setor-publico` | H019–H035 | V: `competencias-digitais-informatica-aplicada-setor-publico` | — |
| M03 | `G/raciocinio-logico` | H036–H045 | V: `raciocinio-logico` | — |
| M04 | `G/controle-externo` | H046–H054 | V: `controle-externo` | — |
| M05 | `G/legislacao-especifica` | H055–H072 | V: `legislacao-especifica` | — |
| M06 | `G/historia-geografia-estado-maranhao` | H073–H094 | L | — |
| M07 | `G/nocoes-direitos-humanos` | H095–H102 | V: `nocoes-direitos-humanos` | — |
| M08 | `E/administracao-publica` | H103–H114 | L | — |
| M09 | `E/administracao-recursos-materiais-patrimoniais` | H115–H123 | L | — |
| M10 | `E/gestao-contratos` | H124–H137 | L | — |
| M11 | `E/governo-eletronico-transparencia` | H138–H141 | L | — |
| M12 | `E/gestao-pessoas` | H142–H153 | L | — |

M06 é física embora seus assuntos sejam vinculados; M10 é física e contém assuntos locais e vinculados. Não converter por conveniência. Em M11, o slug publicado da revisão é `governo-eletronico-transparencia-controle-social`, diferente do segmento da pasta. Preserve os slugs efetivos de todas as revisões.

## 8. Índice estável dos assuntos

### M01 — Língua Portuguesa

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H001 | `leitura-interpretacao-tipos-generos` | `leitura-tipos-generos` | V | [`da65732`](https://github.com/insign/concursos/commit/da65732dc3cf2e51dec4b4a5a8f040e40c927eec) |
| H002 | `tipos-generos-textuais` | = | V | [`89d81bc`](https://github.com/insign/concursos/commit/89d81bcf5f38cb54288e4b47e29043aff2a495b9) |
| H003 | `ortografia-oficial` | = | V | [`a1a4c9b`](https://github.com/insign/concursos/commit/a1a4c9bde217afb6bb860563ab24b0c06e27ff47) |
| H004 | `coesao-textual` | = | V | [`83b5658`](https://github.com/insign/concursos/commit/83b5658c2b4ec18bd1f8773f5ecc8b6ed1bcb73f) |
| H005 | `emprego-tempos-modos-verbais` | = | V | [`399e848`](https://github.com/insign/concursos/commit/399e848e708407dca5660a411798c3a14014e6f9) |
| H006 | `classes-nominais-de-palavras` | = | V | [`8ff2ba5`](https://github.com/insign/concursos/commit/8ff2ba505f1afe39b353149b36081d589aef9f8e) |
| H007 | `verbo-como-classe-de-palavras` | = | V | [`695b0f9`](https://github.com/insign/concursos/commit/695b0f999b0f7c36b3c84b63a5c595606f13beb2) |
| H008 | `classes-invariaveis-de-palavras` | = | V | [`3850cee`](https://github.com/insign/concursos/commit/3850ceecc6e3cdee876788cb4ca30cdc5d0f17c0) |
| H009 | `coordenacao-oracoes-termos` | = | V | [`8046406`](https://github.com/insign/concursos/commit/8046406bc3c42ce3aee28b3bf4ab08ac8e6a69f3) |
| H010 | `subordinacao-oracoes-termos` | = | V | [`8d6736a`](https://github.com/insign/concursos/commit/8d6736a1f8028c3262820faab7962e2994ba024b) |
| H011 | `pontuacao` | = | V | [`ce39485`](https://github.com/insign/concursos/commit/ce39485fb8d1df2f618df939524b991e94a83be3) |
| H012 | `concordancia-verbal-nominal` | = | V | [`633d2ed`](https://github.com/insign/concursos/commit/633d2edad8488fea0f52dfec5d18ccffafa6247a) |
| H013 | `regencia-verbal-nominal` | = | V | [`54024f3`](https://github.com/insign/concursos/commit/54024f3660072e9e4fc89e78cefd8a3b7f3bde44) |
| H014 | `crase` | = | V | [`40ef056`](https://github.com/insign/concursos/commit/40ef056aea0f5e6b24547dc75012db92b30e6ca2) |
| H015 | `colocacao-pronominal` | = | V | [`74107ba`](https://github.com/insign/concursos/commit/74107baa8a4d1c5adbe22e22c698537637335ebc) |
| H016 | `significacao-substituicao-lexical` | `significacao-substituicao` | V | [`2e81e87`](https://github.com/insign/concursos/commit/2e81e87f46065c4d9b7ea30e4681751ab95cdb2e) |
| H017 | `reorganizacao-oracoes-periodos` | = | V | [`f766f8f`](https://github.com/insign/concursos/commit/f766f8fce10a26a37136467f2cb6030e95d81d12) |
| H018 | `reescrita-generos-formalidade` | = | V | [`348fb77`](https://github.com/insign/concursos/commit/348fb77c74e0c0f17ec0f18dbc7caf31ce5d4d67) |

### M02 — Competências Digitais e Informática Aplicada ao Setor Público

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H019 | `competencias-digitais-publicas` | = | V | [`fdf03c6`](https://github.com/insign/concursos/commit/fdf03c60f53d55bd189a1ea50b4070a45cb76de3) |
| H020 | `windows-arquivos-pastas` | = | V | [`82ce0e9`](https://github.com/insign/concursos/commit/82ce0e986ec20058aa1cf99a9e2e08e5fc0ac07b) |
| H021 | `microsoft-word-documentos` | = | V | [`f70c5a8`](https://github.com/insign/concursos/commit/f70c5a8139cbfe566fac195db47ed053e1e9f09d) |
| H022 | `microsoft-excel-planilhas` | = | V | [`2c2f868`](https://github.com/insign/concursos/commit/2c2f8687f06f16b9bb37dc0b78986bd7b71e76ea) |
| H023 | `microsoft-powerpoint-apresentacoes` | `powerpoint-apresentacoes` | V | `cabce0f7b167cf9b81342b62a16afa5452dbb5d6` |
| H024 | `redes-tcp-ip-interoperabilidade` | = | V | `95e036f790a006d138f419534b13f93ca188f833` |
| H025 | `comunicacao-colaboracao-remota` | = | V | `0bd6c064efce28061c34732cd061bae6c20417f3` |
| H026 | `backup-armazenamento-nuvem` | = | V | — |
| H027 | `malware-protecao-ameacas` | = | V | — |
| H028 | `lgpd-conceitos-direitos-setor-publico` | `lgpd-direitos-setor-publico` | V | — |
| H029 | `marco-civil-internet` | = | V | — |
| H030 | `assinaturas-certificacao-digital` | = | V | — |
| H031 | `pen-sei-processo-eletronico` | = | V | — |
| H032 | `governo-digital-dados-abertos` | = | V | — |
| H033 | `ia-automacao-servicos-publicos` | = | V | — |
| H034 | `dados-iot-cidades-inteligentes` | = | V | — |
| H035 | `etica-responsabilidade-digital` | = | V | — |

### M03 — Raciocínio Lógico

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H036 | `estruturas-logicas` | = | V | — |
| H037 | `logica-argumentacao-inferencias` | = | V | — |
| H038 | `proposicoes-tabelas-verdade` | = | V | — |
| H039 | `equivalencias-de-morgan-diagramas-logicos` | `equivalencias-de-morgan` | V | — |
| H040 | `logica-primeira-ordem` | = | V | — |
| H041 | `principios-contagem-probabilidade` | `contagem-probabilidade` | V | — |
| H042 | `operacoes-conjuntos` | = | V | — |
| H043 | `problemas-aritmeticos` | = | V | — |
| H044 | `problemas-geometricos` | = | V | — |
| H045 | `problemas-matriciais` | = | V | — |

### M04 — Controle Externo

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H046 | `controle-interno-externo` | = | V | — |
| H047 | `controle-parlamentar` | = | V | — |
| H048 | `controle-tribunais-contas` | = | V | — |
| H049 | `controle-administrativo` | = | V | — |
| H050 | `improbidade-sujeitos-atos` | = | V | — |
| H051 | `improbidade-sancoes-procedimento` | = | V | — |
| H052 | `contencioso-controle-judicial` | = | V | — |
| H053 | `controle-atividade-financeira` | = | V | — |
| H054 | `tcu-tces-tcema-constituicao` | = | V | — |

### M05 — Legislação Específica

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H055 | `regimento-instituicao-competencia` | `regimento-instituicao-tcema` | V | — |
| H056 | `regimento-orgaos-organizacao` | `regimento-orgaos-tcema` | V | — |
| H057 | `regimento-sessoes-distribuicao` | `regimento-sessoes-tcema` | V | — |
| H058 | `regimento-processos-controle` | = | V | — |
| H059 | `regimento-denuncias-consultas` | = | V | — |
| H060 | `regimento-garantias-prazos` | = | V | — |
| H061 | `regimento-decisoes-execucao` | = | V | — |
| H062 | `regimento-recursos-revisao` | = | V | — |
| H063 | `regimento-atos-etica-finais` | = | V | — |
| H064 | `lei-organica-jurisdicao` | = | V | — |
| H065 | `lei-organica-organizacao-mpc` | = | V | — |
| H066 | `lei-organica-contas-controle` | = | V | — |
| H067 | `lei-organica-processos` | = | V | — |
| H068 | `lei-organica-decisoes-recursos` | = | V | — |
| H069 | `organizacao-controle-externo` | = | V | — |
| H070 | `unidades-administrativas-cargos-funcoes` | `unidades-cargos-funcoes` | V | — |
| H071 | `tomada-contas-especial-in-50` | `tce-in-50-2017` | V | — |
| H072 | `emendas-parlamentares-in-82` | `tce-in-82-2025` | V | — |

### M06 — História e Geografia do Estado do Maranhão

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H073 | `franca-equinocial-guaxenduba` | = | V | — |
| H074 | `invasao-expulsao-holandeses` | = | V | — |
| H075 | `revolta-bequimao-companhias` | = | V | — |
| H076 | `adesao-independencia-jenipapo` | = | V | — |
| H077 | `balaiada-caracterizacao-causas` | = | V | — |
| H078 | `adesao-republica-revolucao-1930` | = | V | — |
| H079 | `vitorinismo-greve-1951` | = | V | — |
| H080 | `fatos-politicos-maranhao-sec-xx` | = | V | — |
| H081 | `fatos-economicos-maranhao-sec-xx` | = | V | — |
| H082 | `fatos-sociais-maranhao-sec-xx` | = | V | — |
| H083 | `localizacao-limites-extremos` | = | V | — |
| H084 | `geomorfologia-geologia-relevo` | = | V | — |
| H085 | `areas-protecao-parques-nacionais` | = | V | — |
| H086 | `climas-formacoes-vegetais` | = | V | — |
| H087 | `rios-bacias-maranhenses` | = | V | — |
| H088 | `populacao-urbanizacao-movimentos` | = | V | — |
| H089 | `agricultura-pecuaria-maranhenses` | = | V | — |
| H090 | `extrativismo-vegetal-animal-mineral` | `extrativismo-vegetal-animal-min` | V | — |
| H091 | `industrias-base-transformacao` | = | V | — |
| H092 | `comercio-telecom-transportes` | = | V | — |
| H093 | `malha-viaria-portos-aeroportos` | = | V | — |
| H094 | `cultura-maranhense` | = | V | — |

### M07 — Noções de Direitos Humanos

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H095 | `teoria-geral-direitos-fundamentais` | `teoria-direitos-fundamentais` | V | — |
| H096 | `declaracao-universal-direitos-humanos` | `declaracao-universal-dh` | V | — |
| H097 | `agenda-2030-onu` | = | V | — |
| H098 | `estatuto-pessoa-deficiencia-fundamentos-direitos-garantias` | `lbi-fund-direitos-garantias` | V | — |
| H099 | `estatuto-pessoa-deficiencia-inclusao-acessibilidade-responsabilizacao` | `lbi-inclusao-acessibilidade-resp` | V | — |
| H100 | `acessibilidade-prioridade-atendimento` | `l100-acessibilidade-prioridade` | V | — |
| H101 | `estatuto-igualdade-racial-fundamentos-direitos` | `eir-fund-direitos-igualdade` | V | — |
| H102 | `estatuto-igualdade-racial-politicas-publicas` | `eir-politicas-mecanismos` | V | — |

### M08 — Administração Pública

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H103 | `estruturas-desenho-organizacoes-formais-modernas` | `estruturas-organizacionais` | L | — |
| H104 | `planejamento-direcao-processo-organizacional` | `planejamento-direcao` | L | — |
| H105 | `comunicacao-processo-organizacional` | `comunicacao-organizacional` | L | — |
| H106 | `controle-avaliacao-processo-organizacional` | `controle-avaliacao` | L | — |
| H107 | `gestao-processos` | = | L | — |
| H108 | `gestao-qualidade-excelencia-servicos-publicos` | `gestao-qualidade-excelencia` | L | — |
| H109 | `gestao-projetos` | = | L | — |
| H110 | `planejamento-estrategico` | = | L | — |
| H111 | `empreendedorismo-liderancas` | = | L | — |
| H112 | `gestao-resultados-publica-privada-paradigma-cliente` | `gestao-resultados-cliente` | L | — |
| H113 | `sustentabilidade-publica` | = | L | — |
| H114 | `acessibilidade-na-gestao-publica` | `acessibilidade-gestao-publica` | L | — |

### M09 — Administração de Recursos Materiais e Patrimoniais

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H115 | `conceitos-material-patrimonio` | = | L | — |
| H116 | `patrimonio-imobiliario-spiu` | = | L | — |
| H117 | `patrimonio-mobiliario-responsabilidade` | `patrimonio-mobiliario-resp` | L | — |
| H118 | `controle-movimentacao-sistema` | = | L | — |
| H119 | `previsao-controle-estoque` | = | L | — |
| H120 | `almoxarifado-armazenamento` | = | L | — |
| H121 | `compras-classificacao-padronizacao-codificacao` | `compras-classificacao-materiais` | L | — |
| H122 | `arquivamento-recebimento-distribuicao-inventario` | `materiais-recebimento-inventario` | L | — |
| H123 | `analise-valor-alienacao` | = | L | — |

### M10 — Gestão de Contratos

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H124 | `fundamentos-agentes-processo-lei-14133` | `fundamentos-lei-14133` | V | — |
| H125 | `planejamento-fase-preparatoria` | = | V | — |
| H126 | `modalidades-julgamento-selecao-contratacao-direta` | `modalidades-selecao-direta` | V | — |
| H127 | `formalizacao-garantias-riscos-duracao` | `formalizacao-riscos-duracao` | V | — |
| H128 | `execucao-alteracoes-equilibrio` | = | V | — |
| H129 | `extincao-recebimento-pagamento` | = | V | — |
| H130 | `sancoes-controle-pncp` | = | V | — |
| H131 | `planejamento-in-5-2017` | = | L | — |
| H132 | `selecao-fornecedor-in-5-2017` | `selecao-fornecedor-in5` | L | — |
| H133 | `gestao-fiscalizacao-in-5-2017` | `gestao-fiscalizacao-in5` | L | — |
| H134 | `medicao-pagamento-obrigacoes-equilibrio` | `medicao-pagamento-equilibrio-in5` | L | — |
| H135 | `encerramento-regras-operacionais-in-5-2017` | `encerramento-regras-finais-in5` | L | — |
| H136 | `gestao-aplicada-execucao-contratual` | `gestao-aplicada-execucao` | V | — |
| H137 | `irregularidades-penalidades-sancoes` | `irregularidades-sancoes` | V | — |

### M11 — Governo Eletrônico, Transparência e Controle Social

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H138 | `governo-eletronico` | = | L | — |
| H139 | `transparencia-controle-social-accountability` | `transparencia-controle-social` | L | — |
| H140 | `lei-acesso-informacao-fundamentos-pedidos` | `lai-fundamentos-pedidos` | L | — |
| H141 | `lei-acesso-informacao-restricoes-recursos` | `lai-restricoes-recursos` | L | — |

### M12 — Gestão de Pessoas

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H142 | `fundamentos-evolucao-teorias` | `gp-fundamentos-teorias` | L | — |
| H143 | `funcao-politicas-sistemas-rh` | `gp-funcao-politicas-sig` | L | — |
| H144 | `relacoes-individuo-organizacao-qvt` | `gp-relacoes-qvt` | L | — |
| H145 | `lideranca-motivacao-desempenho` | `gp-lideranca-motivacao` | L | — |
| H146 | `competencia-interpessoal-conflitos` | `gp-interpessoal-conflitos` | L | — |
| H147 | `gestao-mudanca` | `gp-gestao-mudanca` | L | — |
| H148 | `recrutamento-selecao-processo-decisorio` | `gp-recrutamento-selecao` | L | — |
| H149 | `analise-descricao-cargos` | `gp-analise-descricao-cargos` | L | — |
| H150 | `avaliacao-desempenho` | `gp-avaliacao-desempenho` | L | — |
| H151 | `desenvolvimento-capacitacao` | `gp-desenvolvimento-capacitacao` | L | — |
| H152 | `cargos-carreiras-salarios` | `gp-cargos-carreiras-salarios` | L | — |
| H153 | `competencias-tendencias-setor-publico` | `gp-competencias-tendencias` | L | — |
