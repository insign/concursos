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
| M02 | `G/competencias-digitais-informatica-aplicada-setor-publico` | H019–H035 | V: `competencias-digitais-informatica-aplicada-setor-publico` | [`dbaeec3a29`](https://github.com/insign/concursos/commit/dbaeec3a29140ab8e1480e3dcea0701f9b5d04d9) |
| M03 | `G/raciocinio-logico` | H036–H045 | V: `raciocinio-logico` | `ff6dd84d7a3693950b36f6b28ba6ae825a1bbd4a` |
| M04 | `G/controle-externo` | H046–H054 | V: `controle-externo` | [`cfb3291`](https://github.com/insign/concursos/commit/cfb329124273c1cda28254fadf1363c5dae031d7) |
| M05 | `G/legislacao-especifica` | H055–H072 | V: `legislacao-especifica` | [`37edcc7`](https://github.com/insign/concursos/commit/37edcc716d1ce4411c5cb43c5b50ebf8c183fea0) |
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
| H024 | `redes-tcp-ip-interoperabilidade` | = | V | `df3ed5db1aae462c5b8ec6e26d099ebc8e1b4d79` |
| H025 | `comunicacao-colaboracao-remota` | = | V | `df3ed5db1aae462c5b8ec6e26d099ebc8e1b4d79` |
| H026 | `backup-armazenamento-nuvem` | = | V | `a78c7cb619b099047fe38bb04cdc37a460d8859b` |
| H027 | `malware-protecao-ameacas` | = | V | `bab566c28b2c0ad2961731355929d3f664fc6fae` |
| H028 | `lgpd-conceitos-direitos-setor-publico` | `lgpd-direitos-setor-publico` | V | [`adb3511`](https://github.com/insign/concursos/commit/adb3511fbb577d4147944a170cb6eab9f5c54ab8) |
| H029 | `marco-civil-internet` | = | V | [`96dd723`](https://github.com/insign/concursos/commit/96dd723063911fffaad475caf971def6464ac567) |
| H030 | `assinaturas-certificacao-digital` | = | V | [`8103750`](https://github.com/insign/concursos/commit/8103750e324f9ab6c779be18e0853d0853aa8974) |
| H031 | `pen-sei-processo-eletronico` | = | V | [`905499a`](https://github.com/insign/concursos/commit/905499ac1cc964609a660512b1bfd3438e31895f) |
| H032 | `governo-digital-dados-abertos` | = | V | [`2543211a7e`](https://github.com/insign/concursos/commit/2543211a7ee7fa6a8e58eb93ec4d4e131eafe47d) |
| H033 | `ia-automacao-servicos-publicos` | = | V | [`5b1e7b80bf`](https://github.com/insign/concursos/commit/5b1e7b80bf9cbba66ee16125df88e72026756a33) |
| H034 | `dados-iot-cidades-inteligentes` | = | V | [`91c987e50f`](https://github.com/insign/concursos/commit/91c987e50f19564b5e9ddc178e1d095bb8048851) |
| H035 | `etica-responsabilidade-digital` | = | V | [`62f440ce89`](https://github.com/insign/concursos/commit/62f440ce89f94618a72084e65df93c57b474e0cf) |

### M03 — Raciocínio Lógico

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H036 | `estruturas-logicas` | = | V | [`0bcebdb`](https://github.com/insign/concursos/commit/0bcebdb9b19aa382d22a106a0635806d6e849d4e) |
| H037 | `logica-argumentacao-inferencias` | = | V | [`513842cdc`](https://github.com/insign/concursos/commit/513842cdc31f896b25e22cd6535901b06fcbb575) |
| H038 | `proposicoes-tabelas-verdade` | = | V | [`86678854e`](https://github.com/insign/concursos/commit/86678854e48b4abf088a97eea2db9ec1db86916d) |
| H039 | `equivalencias-de-morgan-diagramas-logicos` | `equivalencias-de-morgan` | V | [`f3664ba48`](https://github.com/insign/concursos/commit/f3664ba488d3b8e9437cbc8ffef150e3770f62a4) |
| H040 | `logica-primeira-ordem` | = | V | [`94ad6d303`](https://github.com/insign/concursos/commit/94ad6d30358fbc523f58978f868cc4c7287337ff) |
| H041 | `principios-contagem-probabilidade` | `contagem-probabilidade` | V | [`898222dfa`](https://github.com/insign/concursos/commit/898222dfa5a88c3aeaf6b1349ed34193f09ff228) |
| H042 | `operacoes-conjuntos` | = | V | [`b9cddaf`](https://github.com/insign/concursos/commit/b9cddaf33e8c8039687abb6ffe8d779baab5c800) |
| H043 | `problemas-aritmeticos` | = | V | [`aa7ceb5`](https://github.com/insign/concursos/commit/aa7ceb525818800babae5a51d7429100e246d40b) |
| H044 | `problemas-geometricos` | = | V | [`d7c9ae4`](https://github.com/insign/concursos/commit/d7c9ae4f3f166a20ede2a73cb73d0bfab70f2401) |
| H045 | `problemas-matriciais` | = | V | [`331f025`](https://github.com/insign/concursos/commit/331f0254a6e945db2b8fc564fdba1edd59a63f0d) |

### M04 — Controle Externo

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H046 | `controle-interno-externo` | = | V | `657fb8995f03a3b4aeeb1ef3cefc737a02ecb06c` |
| H047 | `controle-parlamentar` | = | V | `5f64a1db84e8b1567c2bc003e31b4da548196e05` |
| H048 | `controle-tribunais-contas` | = | V | `6f791f04166d72c75ee25f31dd29f6cf76251d8d` |
| H049 | `controle-administrativo` | = | V | `52abdeeab24668b02f358234a5b012369ea8ff7e` |
| H050 | `improbidade-sujeitos-atos` | = | V | [`fc19014`](https://github.com/insign/concursos/commit/fc19014071fa530c46ba9a8ec879995105c4bc89) |
| H051 | `improbidade-sancoes-procedimento` | = | V | [`504a87d`](https://github.com/insign/concursos/commit/504a87d311e91c39431c78da8d13c4be00b89e56) |
| H052 | `contencioso-controle-judicial` | = | V | [`5a45c3e`](https://github.com/insign/concursos/commit/5a45c3ef9f5dda03fe390ec3ab0e7029939aed7a) |
| H053 | `controle-atividade-financeira` | = | V | [`4d1d704`](https://github.com/insign/concursos/commit/4d1d70493beb78e69246bea799fa8b86d462b7b1) |
| H054 | `tcu-tces-tcema-constituicao` | = | V | [`0312361`](https://github.com/insign/concursos/commit/031236123330a7c48aa1697bfbbf4dfd1465d3b0) |

### M05 — Legislação Específica

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H055 | `regimento-instituicao-competencia` | `regimento-instituicao-tcema` | V | `fd2f9933d5442a79f62feec73d463a77bed56558` |
| H056 | `regimento-orgaos-organizacao` | `regimento-orgaos-tcema` | V | `2b13650a3e7bb4ef85dd10781f8ca7a0b33d3cee` |
| H057 | `regimento-sessoes-distribuicao` | `regimento-sessoes-tcema` | V | `361a29efcdab7f8a634a2458d9933f0bbae97db4` |
| H058 | `regimento-processos-controle` | = | V | `6a016ed0a34e3554a4e35772ad4b35cdb89ac2d7` |
| H059 | `regimento-denuncias-consultas` | = | V | `868bb4b3c855af58ceb45015270d4483525bee5e` |
| H060 | `regimento-garantias-prazos` | = | V | `7cf990eda26f1a048d2263d5e20bb67e5b506c6b` |
| H061 | `regimento-decisoes-execucao` | = | V | `4a2c2b133894cdf3aeb7166842c9a119d9a4e66d` |
| H062 | `regimento-recursos-revisao` | = | V | `260dc9f5ffc1915e9a3a3c4ae24dd23d73e2a595` |
| H063 | `regimento-atos-etica-finais` | = | V | `83f679ae924ea92d5c2c164d9bcc9e5a9a9c54b1` |
| H064 | `lei-organica-jurisdicao` | = | V | `8f93eddb369bb04f4ab20e96b4265d3cae1f0064` |
| H065 | `lei-organica-organizacao-mpc` | = | V | `d2b78d0bfe8914e9d9b093a289e51a89f3f278c1` |
| H066 | `lei-organica-contas-controle` | = | V | `2c43e2f2d994cdc66865540feb8016364c04a89f` |
| H067 | `lei-organica-processos` | = | V | `8e9f507ea35b61206afc716f210a0734a0be6867` |
| H068 | `lei-organica-decisoes-recursos` | = | V | `eb0f0f2020d6347c79c0d9c0ff4a86c40db6acee` |
| H069 | `organizacao-controle-externo` | = | V | `4899bb2bc92c1f845ab246044bd479a027f8966a` |
| H070 | `unidades-administrativas-cargos-funcoes` | `unidades-cargos-funcoes` | V | [302d4a1](https://github.com/insign/concursos/commit/302d4a1e1968625e45049b2be28682bb2cc7c4e9) |
| H071 | `tomada-contas-especial-in-50` | `tce-in-50-2017` | V | [525e7a2](https://github.com/insign/concursos/commit/525e7a24d8526772a911b7f92a0977c6132490ed) |
| H072 | `emendas-parlamentares-in-82` | `tce-in-82-2025` | V | [6e86e1d](https://github.com/insign/concursos/commit/6e86e1d749f9cb0225b5579aa49f3440182957c7) |

### M06 — História e Geografia do Estado do Maranhão

| H | Segmento da pasta consumidora | storageId | Origem | Evidência |
|---|---|---|---|---|
| H073 | `franca-equinocial-guaxenduba` | = | V | [`2e47bd8`](https://github.com/insign/concursos/commit/2e47bd8fbe2a7fa71784b598b1ea80bb974081eb) |
| H074 | `invasao-expulsao-holandeses` | = | V | [`4274555`](https://github.com/insign/concursos/commit/427455538aecf242a6b3e79e7414a2806fc4d1eb) |
| H075 | `revolta-bequimao-companhias` | = | V | [`c9c2923`](https://github.com/insign/concursos/commit/c9c2923875b5f760aa476d9d0885af0c5b48171c) |
| H076 | `adesao-independencia-jenipapo` | = | V | [`d4c7fde`](https://github.com/insign/concursos/commit/d4c7fde14a9c34f9171a7b48a6f54ad65deaeff6) |
| H077 | `balaiada-caracterizacao-causas` | = | V | [`2f12260`](https://github.com/insign/concursos/commit/2f1226034bdc3842b48d65e2aee8f6f0d75ce922) |
| H078 | `adesao-republica-revolucao-1930` | = | V | [`4a5303e`](https://github.com/insign/concursos/commit/4a5303eb454926a5f23d54d1d83c12e86a28c0bd) |
| H079 | `vitorinismo-greve-1951` | = | V | [`508ddeb`](https://github.com/insign/concursos/commit/508ddeb5732c84fe27d46dba020fae57d70d2e99) |
| H080 | `fatos-politicos-maranhao-sec-xx` | = | V | [`2bb4c76`](https://github.com/insign/concursos/commit/2bb4c765ee268573a315f00c1d22bcd0538404e3) |
| H081 | `fatos-economicos-maranhao-sec-xx` | = | V | [`8e35bd1`](https://github.com/insign/concursos/commit/8e35bd140cdb35a6950e1d68d1b1238cbd335ce7) |
| H082 | `fatos-sociais-maranhao-sec-xx` | = | V | [`b7008f7`](https://github.com/insign/concursos/commit/b7008f75ec33747c431e3daabad02455bb65d583) |
| H083 | `localizacao-limites-extremos` | = | V | [`d052be8`](https://github.com/insign/concursos/commit/d052be8ffe6ae0359f08fe8169e9a804033f5360) |
| H084 | `geomorfologia-geologia-relevo` | = | V | [`df250c2`](https://github.com/insign/concursos/commit/df250c2f884ab1f8799044edbbf90959b1f43041) |
| H085 | `areas-protecao-parques-nacionais` | = | V | [`f6c4b0f`](https://github.com/insign/concursos/commit/f6c4b0fb42af1a9992e8afa6e4eaf4e8c2b03775) |
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

## 9. Pendências abertas em aulas e banco

- H055–H072: as 18 aulas tratam 6/7, data do Edital nº 1, como publicação e corte legislativo; o Tribunal informa publicação em 7/7. Corrigir nas aulas em escopo próprio.
- H059: a aula atribui pertinência temática a prefeito/presidente de Câmara em vez dos incisos IV–V do art. 269 e atribui ao Regimento o “sempre que possível” da Lei Orgânica sobre o parecer da consulta. Corrigir na aula.
- H062–H063: a aula H062 omite Governador da vedação à revisão do art. 139, § 7º. A H063 ensina oito dias no art. 312, cujo texto compilado fixa sete; art. 26 reformado e seus parágrafos antigos exigem conciliação de vigência, inclusive no banco q6513–17. Corrigir em escopo próprio.
- H061 e H065: q6359 exige CEI/DDNT e q6627 cobra remissão literal do art. 109 aos arts. 96, VIII, e 99, sem ensino correspondente nas aulas. Reavaliar pertinência/ensino em escopo próprio.
- H069–H071: a compilação oficial da Lei nº 9.936/2013 omite o inciso XII de 2026, apesar da republicação da Lei nº 12.822/2026 referida em H070. A íntegra da Decisão Normativa nº 28/2017, da Instrução Normativa nº 56/2018 e da Decisão Normativa nº 38/2020 não abriu diretamente; cotejar em revisão própria se a aula exigir conclusão adicional.
- H064, H066 e H068: os inteiros teores da Arguição 982, da Resolução nº 324/2020 e dos Temas 1287, 642 e 899 não abriram na consulta anterior; as aulas usaram notícias oficiais e textos normativos correlatos. Revalidar texto primário em revisão própria se a conclusão depender dele.

- H054: a aula usa 6/7 (data do ato E1) como publicação/corte, mas o Tribunal registra 7/7. q99255–59 cobram regimes especiais de contas anuais de gestão do prefeito, convênio, falta de candidatos técnicos e autonomia/princípios do Ministério Público de Contas não ensinados integralmente; revisar ensino/banco no escopo próprio, sem ampliar H/M por essas peculiaridades.
- H053: a aula trata 6/7, data do ato E1, como corte legislativo; publicação registrada pelo Tribunal foi 7/7. Corrigir a aula em revisão própria.
- H052: q99252 cobra tese específica do Tema 485 sobre compatibilidade da prova com edital, ausente da aula; avaliar ensino ou pertinência do item em revisão própria, sem incorporar precedente isolado ao H/M.
- H051: q52205101 exige regime de parcelamento/juros e cláusula de contratação em acordo não desenvolvido na aula; verificar pertinência e ensino em revisão própria, sem converter detalhe isolado em regra do H/M.
- H050: q52205001 envolve incidência sobre partido político e fundos partidários, relação não ensinada na aula; verificar ensino/banco em escopo próprio, sem importar conclusão isolada para H/M.
- H049: q99050 e q52204901–08 cobram espécies e procedimento detalhado de recurso/revisão/delegação não ensinados integralmente na aula; reavaliar ensino e pertinência no escopo próprio. A questão adaptada q5624 da CAGEPA segue sem confronto independente do gabarito definitivo.
- H048: a aula informa publicação de E1 em 6/7, mas o Tribunal a registra em 7/7; corrigir em revisão própria. Temas do STF citados na aula não tiveram inteiro teor aberto pelo portal nesta consulta; revalidar os precedentes em revisão própria da aula.
- H047: a aula fixa jurisprudência em 6/7/2026, embora E1, item 13.33.1, use publicação até 30 dias antes da prova; q52204706–07 exigem prioridade da Lei nº 10.001/2000 e limite federativo/competência do objeto de CPI não desenvolvidos na aula. Reavaliar aula/banco no escopo próprio. A notícia do STF sobre MS 40.799 foi identificada, mas seu texto e o inteiro teor não abriram nesta consulta.
- H046: q52204604 exige contraste controle de legalidade × mérito ausente da aula; item e gabarito definitivos conferidos. Reavaliar aula/banco no escopo próprio, sem ampliar H por esse item.
- H037: q52203702 e q52203705 exigem distinguir abdução, ausente da aula; H040: q5108 e q5138 exigem fórmula de existência única, que a aula só menciona sem ensinar. Reavaliar aula/banco em escopo próprio, sem ampliar H/M por esses itens.
- H039: `conteudo.md`, seção 14, restringe “possível” a verdadeiro em algum diagrama “mas não em todos”, confundindo possibilidade com contingência. Corrigir a aula em revisão própria; considerar possível o que vale em ao menos uma configuração admissível.
- H029, H032, H033 e H035: `conteudo.md` confunde a data do ato E1 (6/7) com a publicação informada pelo Tribunal (7/7), marco do corte legislativo. Corrigir as aulas em revisão própria.
- H029: aula descreve como atual em 6/9 o andamento do Tema 533, com sessão encerrada em 14/9 e sem inteiro teor confirmado no portal do STF; q522043 requer fundamento processual fora da aula. Revalidar publicação do julgado e banco na revisão própria.
- H032: aula trata a Portaria SGD/MGI nº 11.229/2025 como vigente apesar de adiamento a 30/11/2026 e e-SIC como canal paralelo ao Fala.BR após integração em 2020; q522326 exige inciso de custo/risco ausente. Revisar aula/banco em escopo próprio.
- H035: q5220352 cobra inciso literal sobre flexão gramatical e q522351 detalhe de imagens complexas da norma técnica, não ensinados na aula. Reavaliar adequação e ensino em revisão própria.
- H034: q52203402–q52203403 apontam gabarito da FUB 2015 cuja cópia oficial não foi localizada; confirmar fonte primária antes de usar como evidência.
- H028 e H027: banco do primeiro cobra detalhes de conciliação por vazamento individual, conteúdo mínimo literal do RIPD e destino de multa ausentes da aula; banco do segundo cobra SPF/DKIM/DMARC, OAuth e adware/stalkerware também ausentes. Reavaliar pertinência, realocação ou ensino nas revisões próprias, sem inflar H/M.
