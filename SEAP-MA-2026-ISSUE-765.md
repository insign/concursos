# SEAP-MA 2026 — Inspetor de Polícia Penal — campanha #765

Painel: [issue #765](https://github.com/insign/concursos/issues/765).

## 1. Autoridade, finalidade e limite desta consolidação

Este é o arquivo-mestre da campanha para o **Cargo 1 — Inspetor de Polícia Penal**. Em 25/09/2026, o usuário autorizou adaptar o prompt da campanha #764 para a #765, criar este arquivo e reforçar a revisão da qualidade do material, com texto pedagógico que poupe tempo do aluno. Pedidos explícitos prevalecem.

**Decisão D765-01 — divisão de responsabilidades:** este arquivo passa a manter programa, matriz, decisões, dependências, estados C/H/Q, evidências e totais detalhados. A #765 mantém somente roadmap breve, reservas ativas, bloqueios, próxima ação, totais-resumo e link/commit da consolidação. Esta divisão substitui, somente nesta campanha, a antiga exclusividade do corpo da issue. As demais regras de `AGENTS.md` permanecem aplicáveis.

**Decisão D765-02 — qualidade e economia de estudo:** a implantação abrange pesquisar, produzir, reaproveitar e revisar pedagogicamente o material existente. Adequação ao edital e qualidade para aprender são verificações distintas e obrigatórias. A seção 6 explicita como avaliar o já produzido, sem presumir qualidade por estar publicado ou aceito em outra meta.

O planejamento foi transferido do corpo da #765, cuja versão anterior à reserva tinha `updated_at: 2026-09-11T00:04:15Z`. A preparação documental partiu da `main` `de6662afbf66e952a6823990be940a3985ccdd11`. Foram preservados os IDs, títulos, recortes, restrições e estados das 51 tarefas individualizadas; nenhuma foi marcada como concluída por esta migração.

Comentários, histórico de edições, `ROADMAP.md` e memória de conversas não definem estado. O histórico Git pode comprovar publicação/proveniência, mas não substituir a fila autoritativa atual. Não reconstruir decisões ou aceites perdidos por suposição.

Este documento é guia e registro administrativo, não uma aula, uma nova unidade C/H/Q ou prova de implantação. Sua criação não consolida o edital, não certifica material doador e não executa SEAP-P01. A transcrição posteriormente consultada em SEAP-P01 está na seção 3, com limites de verificação explícitos; a matriz individual ainda deve ser publicada na tarefa própria, sem tabelas fictícias ou IDs inventados.

## 2. Estado corrente, totais e próxima ação

Recontagem das linhas preservadas: cinco tarefas de implantação/fontes, cinco de reaproveitamento, 36 editoriais e cinco de fechamento.

| Dimensão | Total | pending | analyzing | done |
|---|---:|---:|---:|---:|
| Macros de implantação/fontes | 5 | 2 | 0 | 3 |
| Macros de reaproveitamento | 5 | 5 | 0 | 0 |
| Macros editoriais C/H/Q | 36 | 36 | 0 | 0 |
| Macros de fechamento | 5 | 5 | 0 | 0 |
| Total de macros individualizadas | 51 | 48 | 0 | 3 |
| Unidades editoriais planejadas | 110 | 110 | 0 | 0 |
| Entregáveis unitários C/H/Q | 330 | 330 | 0 | 0 |

Os 12 blocos editoriais agregam as 36 macros C/H/Q e não são tarefas adicionais. P03 agora identifica **110 unidades editoriais planejadas e 330 entregáveis unitários C/H/Q**, todos ainda `pending`. Origem física/canônica, quantidade final de visões locais/canônicas e classificação de reaproveitamento permanecem a resolver em R01/R02; não reportar esses valores como zero nem copiar totais de outra meta.

A listagem de `src/content/concursos/` relida em SEAP-P02 contém quatro catálogos, com ordens 1 a 4: concurso de exemplo, TCE/MA Analista, TCE/MA Técnico e PC-MA Oficial Investigador. SEAP-P02 reservou a próxima ordem disponível, **5**, sem alterar qualquer catálogo existente. O slug e o `storageId` definidos abaixo não aparecem na `main` e respeitam os contratos vigentes.

**SEAP-P01 concluída em 25/09/2026:** o programa integral do Inspetor no Edital nº 1, as regras objetiva/discursiva, os cortes e as inconsistências permanecem materializados na seção 3; a publicação do Edital nº 1 foi localizada na edição nº 130 do Diário Oficial do Maranhão, de 21/07/2026, e o Edital nº 2 – SEAP/MA – Inspetor e Monitor, publicado em 24/09/2026, foi incorporado quanto aos efeitos de cronograma identificados. A retificação não alterou o programa do Inspetor nem o formato das provas nos elementos localizados.

**SEAP-P02 concluída em 25/09/2026:** título, slug, `storageId`, ordem e caminhos foram definidos e verificados contra o catálogo, os schemas, o resolvedor de caminhos e o catálogo efetivo, sem colisões. Nenhum catálogo ou grupo foi criado nesta etapa.

**SEAP-P03 concluída em 25/09/2026:** 110 unidades editoriais planejadas, 330 C/H/Q `pending`, ordens 1–110, destinos e dependências estão materializados na matriz; todas as ocorrências do programa consolidado foram mapeadas sem dupla contagem das repetições documentadas.

**Próxima ação habilitada: SEAP-R01 — inventariar o acervo existente e resolver origens/vínculos dos 110 assuntos planejados.** R01 deve ler C/H/Q/referências/resoluções candidatos e registrar origem/SHA/consumidores; R02 fará a classificação integral/parcial/nova. P04/P05 seguem condicionadas ao primeiro assunto completo, portanto não são executadas isoladamente agora.

Reservas ativas são mantidas exclusivamente no painel da #765; este arquivo conserva o último estado consolidado. P01–P03 estão `done`; P04/P05 e todos os 330 C/H/Q unitários permanecem `pending`. Não importar progresso da PC-MA, TCE ou Perícia, mesmo quando compartilharem assuntos.

## 3. Escopo, fontes e programa consultado

Implantar no site somente o **Cargo 1 — Inspetor de Polícia Penal**, reaproveitar assuntos iguais ou parcialmente iguais e completar `conteudo.md`, `cheat-sheet.md`, `questoes.json`, `referencias.md` e, quando necessárias, `resolucoes/*.md`.

Cobrir o programa integral do cargo, não apenas os acréscimos do roteiro incremental `Rota_de_estudos_concursos_MA_regras_da_prova-1.pdf`. **Monitor de Ressocialização fica fora desta meta.** Os cargos do TCE não serão recriados; a #755 e seus registros não serão reabertos ou alterados por esta campanha. #764 e #766 são fontes de coordenação e acervo publicado, não filas a executar em nome da #765.

### Identidade e caminhos definidos em SEAP-P02

SEAP-P02 fixa somente a identidade planejada e os caminhos que P04/P05 e as unidades desdobradas deverão usar. Não cria catálogo, grupos, assunto vazio ou identidade persistida antes do primeiro pacote completo.

| Campo | Definição |
|---|---|
| Título do concurso | `SEAP/MA 2026 - Inspetor de Polícia Penal` |
| Slug / ID do concurso | `seap-ma-2026-inspetor-policia-penal` |
| `storageId` do concurso | `seapma-2026-inspetor` |
| `order` | `5` |
| Futuro catálogo | `src/content/concursos/seap-ma-2026-inspetor-policia-penal.json` |
| Raiz consumidora | `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/` |
| Rota pública do concurso | `/concursos/seap-ma-2026-inspetor-policia-penal/` |
| IDs de grupos | `seap-ma-2026-inspetor-policia-penal/<grupo>[/<grupo>...]` |
| IDs de assuntos locais/vínculos | `seap-ma-2026-inspetor-policia-penal/<grupo>[/<grupo>...]/<assunto>` |

**Justificativa e verificação:** `contestIdFromEntry` deriva o slug do nome do JSON e exige um único segmento de rota em minúsculas com hífens; o `contestSchema` exige `storageId` no mesmo formato com até 20 caracteres e `order` inteiro não negativo. `seapma-2026-inspetor` tem exatamente 20 caracteres. O catálogo atual usa ordens 1–4 e `buildCatalogIndex` ordena concursos por `order`, depois título e ID; a ordem 5 é a próxima disponível. Busca na `main` não encontrou o slug nem o `storageId` propostos, e o catálogo valida unicidade de ID e de `storageId` de concurso.

A data de prova atualmente consolidada em P01 continua **13/12/2026** e deverá alimentar `examDate` em P04 se não houver ato posterior; isso é metadado do catálogo futuro, não nova identidade criada em P02. Descrição e hierarquia de grupos serão materializadas nas tarefas próprias. Nenhuma pasta ou arquivo SEAP foi criado aqui para evitar concurso ou grupo vazio.

### 3.1 Fontes, consulta e limite de consolidação

| Fonte | Identificação e evidência de consulta em 25/09/2026 |
|---|---|
| [Página oficial do concurso](https://www.cebraspe.org.br/concursos/SEAP_MA_26_INSPETOR_MONITOR) | O acesso direto disponível continuou exigindo JavaScript e não expôs a listagem; por isso a verificação de publicações foi complementada por busca indexada e pela reprodução do Diário Oficial |
| [Edital nº 1 — SEAP/MA — Inspetor e Monitor, de 21 de julho de 2026](https://cdn.cebraspe.org.br/concursos/SEAP_MA_26_INSPETOR_MONITOR/arquivos/C71C65D760BE4B840499E08A82681558C961C7A4B0CA9946B042E45A98C59CA9.pdf) | Documento oficial de 84 páginas acessível. Conferidos identificação, recorte do cargo, itens 7 a 9, 21.32 a 21.34, objetos de avaliação do Inspetor e Anexo I. Programa completo do Cargo 1 extraído e comparado às páginas correspondentes |
| [Notícia institucional do Cebraspe, publicada em 30/07/2026](https://www.cebraspe.org.br/seap-ma-divulga-concurso-publico-para-inspetor-de-policia-penal-e-monitor-de-ressocializacao/) | Confirma o concurso, inscrições, requisitos e a aplicação das provas objetiva e discursiva em 13/12/2026 |
| [Reprodução indexada do Diário Oficial do Maranhão — Edital nº 1](https://muralpublico.com.br/ma/atos/94-27/edital-1-seap-ma-inspetor-e-monitor-de) | Identifica a publicação do Edital nº 1 na edição nº 130 (Executivo), em 21/07/2026. Usada para fixar documentalmente a data de publicação exigida pelo item 21.32; não substitui o PDF oficial do Cebraspe para o conteúdo do edital |
| [Edição indexada do Diário Oficial do Maranhão de 24/09/2026](https://muralpublico.com.br/ma/edicoes/2026-09-24) | Identifica o Edital nº 2 – SEAP/MA – Inspetor e Monitor e a retificação de datas do cronograma. Foram localizados: pagamento até 29/09/2026; relação provisória PcD em 14/10/2026; relação final PcD e consulta final do atendimento especializado em 30/10/2026. Não foi localizada alteração do programa do Inspetor ou da data de prova nos elementos indexados |
| Consulta inicial recebida | Registro de 10/09/2026, base de implementação `6f9c945821bf14568c51801f26c82295df43de46`; preservado como evidência histórica |

A consulta atual compreendeu o texto dos trechos pertinentes e a conferência visual das tabelas de provas/classificação, dos cortes, do programa e do cronograma nas páginas 23, 26, 68 a 71 e 73 do PDF. **Não se declara leitura manual integral das 84 páginas**, nem auditoria das etapas médicas, físicas ou administrativas excluídas da campanha. A paginação abaixo é a posição da página no PDF, iniciada em 1.

A publicação do Edital nº 1 foi localizada na **edição nº 130 (Executivo) do Diário Oficial do Maranhão, em 21/07/2026**, por reprodução indexada do diário. Esse é o marco documental adotado para o item 21.32. Em 24/09/2026 foi localizado o **Edital nº 2 – SEAP/MA – Inspetor e Monitor**, com alteração de datas do cronograma. A fonte indexada não substitui o documento primário quando este estiver acessível, mas fornece identificação verificável de edição/data e do ato; nenhuma alteração programática foi atribuída além do que foi efetivamente localizado.

### 3.2 Provas objetiva e discursiva do Inspetor

Fontes: edital consultado, [itens 7 e 8, páginas 23 a 27](https://cdn.cebraspe.org.br/concursos/SEAP_MA_26_INSPETOR_MONITOR/arquivos/C71C65D760BE4B840499E08A82681558C961C7A4B0CA9946B042E45A98C59CA9.pdf#page=23), e [item 9, páginas 27 a 29](https://cdn.cebraspe.org.br/concursos/SEAP_MA_26_INSPETOR_MONITOR/arquivos/C71C65D760BE4B840499E08A82681558C961C7A4B0CA9946B042E45A98C59CA9.pdf#page=27).

| Prova | Recorte do Cargo 1 | Quantidade / pontuação |
|---|---|---|
| P1 — objetiva | Conhecimentos gerais | 30 questões / 30 pontos |
| P2 — objetiva | Conhecimentos específicos | 50 questões / 50 pontos |
| P3 — discursiva | Texto dissertativo sobre Atualidades | Até 30 linhas / 10 pontos |

As três provas têm caráter eliminatório e classificatório. As objetivas somam **80 questões e 80 pontos**, não 100 questões. Cada questão tem cinco opções, A a E, e uma única correta. A resposta correta vale 1 ponto; resposta incorreta, sem marcação ou com mais de uma marcação vale zero, sem desconto negativo por erro (itens 8.2 e 8.11.2).

A nota final nas provas objetivas é a soma de P1 e P2. Nota inferior a **40 pontos** elimina o candidato ao Inspetor; esse é o limite do item 8.11.5, não o do Monitor. Atingir 40 pontos não assegura aprovação: também é necessário ficar no quantitativo de classificação dos itens 8.11.8 e 8.11.8.1, respeitados os empates na última posição. O quadro próprio do Inspetor é:

| Sexo indicado no edital | Ampla concorrência | Pessoas com deficiência | Candidatos negros |
|---|---:|---:|---:|
| Masculino | 680 | 100 | 196 |
| Feminino | 168 | 28 | 48 |

Se os aprovados das listas reservadas forem inferiores aos quantitativos previstos, o item 8.11.8.1 admite os candidatos da ampla concorrência mais bem classificados até o limite total por cargo/sexo, respeitados os empates. A discursiva é corrigida apenas para os aprovados nas objetivas segundo esses critérios; quem não tiver a discursiva corrigida é eliminado (itens 9.7.1 e 9.7.2). Esses quantitativos são limites de classificação para essa fase, não número de vagas ou distribuição de questões por disciplina.

A discursiva avalia conhecimento do tema, expressão escrita e registro formal padrão, com coerência e coesão. O item 9.7.5 define:

$$
\mathrm{NPD}=\mathrm{NC}-\frac{2\times\mathrm{NE}}{\mathrm{TL}}
$$

`NPD` é a nota da prova discursiva; `NC` é a nota de conteúdo, apresentação, estrutura textual e desenvolvimento do tema, limitada a 10 pontos; `NE` é o número de erros de grafia, morfossintaxe e propriedade vocabular; `TL` é o número de linhas efetivamente escritas. Fragmentos fora do local apropriado ou além do limite de linhas são desconsiderados. Resultado negativo recebe zero; fuga ao tema ou ausência de texto também recebe zero. A aprovação exige **NPD ≥ 5 pontos** (item 9.7.6).

Somente o texto definitivo é avaliado, não o rascunho. Marca identificadora no espaço do texto definitivo provoca anulação; o documento não é substituído por erro de preenchimento. O item 9.3 exige manuscrito legível com caneta preta de material transparente, ressalvados os atendimentos especializados expressamente deferidos nos itens 9.3 e 9.3.1. A não devolução do texto definitivo também anula a discursiva. Esses requisitos orientam a preparação de escrita, sem ampliar a campanha para procedimentos de inscrição ou atendimento.

O item 7.2 prevê **cinco horas, no turno da manhã**, para as provas objetivas e discursiva. O [Anexo I, página 73](https://cdn.cebraspe.org.br/concursos/SEAP_MA_26_INSPETOR_MONITOR/arquivos/C71C65D760BE4B840499E08A82681558C961C7A4B0CA9946B042E45A98C59CA9.pdf#page=73), indica **13/12/2026** como data provável; a notícia institucional do Cebraspe publicada em 30/07/2026 também informa essa data para as provas. O Edital nº 2 identificado em 24/09 alterou datas do cronograma administrativo, sem mudança da data de prova nos elementos localizados. SEAP-F03 deverá reconsultar atos posteriores antes do fechamento.

### 3.3 Cortes de legislação e jurisprudência

Fonte: [itens 21.32 a 21.34, página 68 do edital consultado](https://cdn.cebraspe.org.br/concursos/SEAP_MA_26_INSPETOR_MONITOR/arquivos/C71C65D760BE4B840499E08A82681558C961C7A4B0CA9946B042E45A98C59CA9.pdf#page=68).

| Regra | Consequência para o material |
|---|---|
| Item 21.32 — alterações de legislação com entrada em vigor até a data de publicação do edital podem ser avaliadas, ainda que não mencionadas nos objetos | Corte legislativo documental: **21/07/2026**, data de publicação do Edital nº 1 localizada na edição nº 130 do Diário Oficial do Maranhão. Separar publicação, vigência da norma e data de consulta |
| Item 21.33 — legislação sem vigência pode ser avaliada quando explicitamente citada nos objetos | A menção literal deve ser mantida na matriz; não excluir diploma automaticamente por revogação. A situação e a forma de cobrança precisam ser explicadas na pesquisa material de cada unidade |
| Item 21.33.1 — jurisprudência dos tribunais superiores pode ser considerada quando publicada até 30 dias antes da prova | Controlar a data de publicação da jurisprudência, não somente o julgamento. O marco não é o mesmo do corte legislativo |
| Item 21.34 — alterações nas regras do edital dependem de outro edital | Ler e identificar os atos posteriores antes de certificar consolidação ou substituir programa, formato, cortes ou data da prova |

**Cálculo condicionado:** se a prova permanecer em **13/12/2026**, o marco de 30 dias anteriores corresponde a **13/11/2026**. É uma data derivada do cronograma consultado, não confirmação de cronograma definitivo ou de janela já encerrada. Não importar os marcos da PC-MA nem encerrar antecipadamente a verificação jurisprudencial futura. Este registro não cria lembrete, automação ou atividade de fundo.

### 3.4 Inconsistências e fronteiras confirmadas no documento

| Ocorrência | Registro e tratamento para a matriz |
|---|---|
| Gerais em `22.2.3`, específicos em `20.2.4` | A divergência numérica está no documento consultado. A transcrição preserva ambos; não substituir silenciosamente `20.2.4` por `22.2.4` |
| Lei nº 9.455/1997 nos itens 1 e 7 de Legislação Extravagante | Preservar as duas ocorrências literais e mapear sua cobertura para a mesma norma, sem contar artificialmente dois assuntos apenas pela repetição |
| Lei nº 8.429/1992 em Direito Administrativo, item 7, e Legislação Extravagante, item 12 | Registrar as duas exigências. A matriz posterior decidirá a unidade real e suas fronteiras; repetição programática não comprova vínculo ou doação histórica |
| Prisão temporária em Direito Processual Penal, item 5, e Lei nº 7.960/1989 em Legislação Extravagante, item 10 | Coordenar a cobertura e os aprofundamentos, sem eliminar qualquer ocorrência do programa |
| Constituição do Maranhão | O recorte expresso é segurança pública, **arts. 112 a 121**, em Direito Constitucional, item 10 |
| Processo Penal, Direitos Humanos e Legislação Extravagante | Preservar recursos, procedimentos e nulidades; instrumentos penitenciários; execução penal; políticas penitenciárias; normas estaduais e todos os atos enumerados para o Inspetor |
| Legislação Extravagante, itens 13 e 15 | O item 13 contém lei e decreto; o item 15 contém cinco resoluções. Número de itens não equivale a número de diplomas nem a número de assuntos reais |
| Atualidades | Está expressamente restrita à discursiva. O bloco de fixação não receberá peso fictício na objetiva |

A transcrição seguinte preserva a terminologia e a numeração do documento, inclusive repetições e expressões que podem exigir apuração editorial posterior. Apenas espaços, quebras de página/linha e hifenização tipográfica foram normalizados para leitura. Não foram corrigidas silenciosamente expressões como “Revolta de Bequimão”, “Causas da não adesão: batalha do Jenipapo” ou “idoso e índio”; essa preservação documental não substitui a verificação factual/normativa do futuro material. Não há certificação, nesta etapa, de vigência individual de todos os diplomas enumerados.

### 3.5 Programa integral do Inspetor no edital consultado

Fonte: [objetos de avaliação, páginas 68 a 71](https://cdn.cebraspe.org.br/concursos/SEAP_MA_26_INSPETOR_MONITOR/arquivos/C71C65D760BE4B840499E08A82681558C961C7A4B0CA9946B042E45A98C59CA9.pdf#page=68). As diretrizes do item 22 preveem avaliação de habilidades além da memorização e admitem que uma questão abranja mais de um objeto; o desdobramento editorial não deve reduzir o programa a listas de definições. A transcrição termina no fim do Cargo 1, antes do programa do Monitor. Os números abaixo são os itens literais de cada disciplina, não novos IDs de unidades.

#### 22.2.3 CONHECIMENTOS GERAIS PARA TODOS OS CARGOS

##### LÍNGUA PORTUGUESA

- 1 Compreensão e interpretação de textos de gêneros variados.
- 2 Reconhecimento de tipos e gêneros textuais.
- 3 Domínio da ortografia oficial.
- 4 Domínio dos mecanismos de coesão textual.
- 4.1 Emprego de elementos de referenciação, substituição e repetição, de conectores e de outros elementos de sequenciação textual.
- 4.2 Emprego de tempos e modos verbais.
- 5 Domínio da estrutura morfossintática do período.
- 5.1 Emprego das classes de palavras.
- 5.2 Relações de coordenação entre orações e entre termos da oração.
- 5.3 Relações de subordinação entre orações e entre termos da oração.
- 5.4 Emprego dos sinais de pontuação.
- 5.5 Concordância verbal e nominal.
- 5.6 Regência verbal e nominal.
- 5.7 Emprego do sinal indicativo de crase.
- 5.8 Colocação dos pronomes átonos.
- 6 Reescrita de frases e parágrafos do texto.
- 6.1 Significação das palavras.
- 6.2 Substituição de palavras ou de trechos de texto.
- 6.3 Reorganização da estrutura de orações e de períodos do texto.
- 6.4 Reescrita de textos de diferentes gêneros e níveis de formalidade.

##### RACIOCÍNIO LÓGICO

- 1 Estrutura lógica de relações arbitrárias entre pessoas, lugares, objetos ou eventos fictícios; dedução de novas informações das relações fornecidas e avaliação das condições usadas para estabelecer a estrutura daquelas relações.
- 2 Compreensão e análise da lógica de uma situação, utilizando as funções intelectuais: raciocínio verbal, raciocínio matemático, raciocínio sequencial, orientação espacial e temporal, formação de conceitos, discriminação de elementos.
- 3 Operações com conjuntos.
- 4 Raciocínio lógico envolvendo problemas aritméticos, geométricos e matriciais.

##### NOÇÕES DE HISTÓRIA DO MARANHÃO

- 1 França equinocial: expedição de Daniel de La Touche.
- 2 Fundação de São Luís.
- 3 Batalha de Guaxenduba.
- 4 Capitães-mores do Maranhão.
- 5 Invasão holandesa.
- 6 Expulsão dos holandeses.
- 7 Estado do Maranhão e Grão-Pará: Revolta de Bequimão (causas e objetivos da revolta); Companhia de Comércio do Maranhão e Grão-Pará.
- 8 Período do Império: adesão do Maranhão.
- 9 Independência do Brasil.
- 10 Causas da não adesão: batalha do Jenipapo.
- 11 Balaiada: caracterização e causas do movimento.
- 12 Período Republicano: adesão do Maranhão à República.
- 13 A Revolução de 1930 no Maranhão.
- 14 Principais fatos políticos, econômicos e sociais ocorridos no Maranhão na segunda metade do século XX.

##### NOÇÕES DE GEOGRAFIA DO MARANHÃO

- 1 Localização do estado do Maranhão: superfície; limites; linhas de fronteira; pontos extremos; áreas de proteção ambiental (APA).
- 2 Parques nacionais.
- 3 Climas do Maranhão: pluviosidade e temperatura.
- 4 Geomorfologia.
- 4.1 Classificação do relevo maranhense: planaltos, planícies e baixadas.
- 5 Características dos rios maranhenses: bacias dos rios limítrofes (Parnaíba, Gurupi e Tocantins-Araguaia).
- 6 Bacias dos rios genuinamente maranhenses.
- 7 Principais formações vegetais: floresta, cerrado e cocais.
- 8 Geografia da população: população absoluta; densidade demográfica; povoamento; movimentos populacionais.
- 9 Agricultura maranhense: caracterização e principais produtos agrícolas; caracterização da pecuária.
- 10 Extrativismo: vegetal, animal e mineral.
- 11 Parque industrial: indústrias de base e indústrias de transformação.
- 12 Setor terciário: comércio, telecomunicações, transportes.
- 13 Malha viária.
- 14 Portos e aeroportos.
- 15 Cultura maranhense.

##### NOÇÕES DE INFORMÁTICA

- 1 Sistema operacional e software.
- 2 Internet: navegação na Internet; conceitos de URL, links, sites, busca e impressão de páginas.
- 3 Editor de texto – Word (Microsoft Office): formatação de fonte e parágrafo; bordas e sombreamento; marcadores, numeração e tabulação; cabeçalho, rodapé e número de página; manipulação de imagens e formas; configuração de página; tabelas.
- 4 Planilha eletrônica – Excel (Microsoft Office): formatação da planilha e de células; cálculos utilizando as quatro operações básicas; formatação de dados por meio da formatação condicional; representação de dados por meio de gráficos.
- 5 Programas antivírus e firewall.
- 6 Teclas de atalho.
- 7 Configuração de impressoras.

##### ATUALIDADES (SOMENTE PARA A PROVA DISCURSIVA)

- 1 Tópicos relevantes e atuais de diversas áreas, tais como segurança, transportes, política, economia, sociedade, educação, saúde, cultura, tecnologia, energia, relações internacionais, desenvolvimento sustentável e ecologia.

#### 20.2.4 CONHECIMENTOS ESPECÍFICOS

##### CARGO 1: INSPETOR DE POLÍCIA PENAL

**DIREITO ADMINISTRATIVO**

- 1 Administração pública: princípios expressos e implícitos (art. 37 da Constituição Federal de 1988).
- 2 Poderes da administração: hierárquico, disciplinar, regulamentar e de polícia.
- 3 Atos administrativos: conceito, requisitos, atributos, classificação e invalidação.
- 4 Servidores públicos: regime jurídico, direitos, deveres, proibições e responsabilidades.
- 5 Processo administrativo: princípios e regras gerais (Lei nº 9.784/1999 e suas alterações).
- 6 Responsabilidade civil do Estado.
- 7 Lei de Improbidade Administrativa (Lei nº 8.429/1992 e suas alterações).

**DIREITO CONSTITUCIONAL**

- 1 Estado e Constituição.
- 1.1 Constituição: conceito, conteúdo, objeto e classificação.
- 2 Constituição da República Federativa do Brasil de 1988.
- 2.1 Preâmbulo e princípios fundamentais.
- 2.2 Dignidade da pessoa humana e direitos humanos.
- 2.3 Dimensões dos direitos humanos no Brasil.
- 3 Direitos e garantias fundamentais.
- 3.1 Direitos e deveres individuais e coletivos, direitos sociais, direitos de nacionalidade, direitos políticos, partidos políticos.
- 4 Remédios constitucionais: habeas data, habeas corpus, mandado de segurança, ação popular e mandado de injunção.
- 5 Organização político-administrativa do Estado.
- 5.1 Estado federal brasileiro, União, estados, Distrito Federal, municípios e territórios.
- 6 Administração pública.
- 6.1 Disposições gerais, servidores públicos.
- 7 Funções essenciais à justiça: advocacia, Ministério Público, advocacia pública e Defensoria Pública.
- 8 Defesa do Estado e das instituições democráticas.
- 8.1 Segurança pública.
- 8.2 Organização da segurança pública.
- 9 Ordem social.
- 9.1 Base e objetivos da ordem social.
- 9.2 Seguridade social.
- 9.3 Meio ambiente.
- 9.4 Família, criança, adolescente, idoso e índio.
- 10 Constituição do Estado do Maranhão: segurança pública (arts. 112 a 121).

**DIREITO PENAL**

- 1 Aplicação da lei penal.
- 1.1 Princípios da legalidade e da anterioridade.
- 1.2 Lei penal no tempo e no espaço.
- 1.3 Tempo e lugar do crime.
- 1.4 Lei penal excepcional, especial e temporária.
- 1.5 Territorialidade e extraterritorialidade da lei penal.
- 1.6 Contagem de prazo.
- 1.7 Interpretação da lei penal.
- 1.8 Analogia.
- 1.9 Irretroatividade da lei penal.
- 2 Teoria geral do crime.
- 2.1 Conceitos e evolução histórico-doutrinária.
- 2.2 Infração penal: elementos, espécies, sujeito ativo e sujeito passivo.
- 3 Fato típico e seus elementos.
- 3.1 Crime consumado e tentado.
- 3.2 Concurso de crimes.
- 3.3 Ilicitude e causas de exclusão.
- 3.4 Punibilidade.
- 3.5 Excesso punível.
- 3.6 Culpabilidade (elementos e causas de exclusão).
- 4 Imputabilidade penal.
- 5 Concurso de pessoas.
- 6 Crimes contra a pessoa.
- 7 Crimes contra o patrimônio.
- 8 Crimes contra a dignidade sexual.
- 9 Crimes contra a incolumidade pública.
- 10 Crimes contra a paz pública.
- 11 Crimes contra a fé pública.
- 12 Crimes contra a administração pública.

**DIREITO PROCESSUAL PENAL**

- 1 Princípios do processo penal.
- 2 Inquérito policial: conceito, finalidade e características.
- 3 Ação penal: espécies e condições.
- 4 Jurisdição e competência.
- 5 Prisões (prisão em flagrante, preventiva e temporária); liberdade provisória.
- 6 Provas: espécies e admissibilidade.
- 7 Recursos: espécies e prazos.
- 8 Procedimentos e nulidades processuais.

**DIREITOS HUMANOS**

- 1 Direitos humanos e direitos fundamentais na Constituição Federal de 1988 (arts. 5º ao 15).
- 2 Decreto nº 7.037/2009 e suas alterações (Programa Nacional de Direitos Humanos).
- 3 Declaração Universal dos Direitos Humanos — Resolução 217-A (III) da Assembleia Geral das Nações Unidas, 1948.
- 4 Regras Mínimas das Nações Unidas para o Tratamento de Reclusos (Regras de Nelson Mandela).
- 5 Convenção Americana de Direitos Humanos (Pacto de San José da Costa Rica).
- 6 Regras das Nações Unidas para o Tratamento de Mulheres Presas e Medidas Não Privativas de Liberdade Para Mulheres Infratoras (Regras de Bangkok).

**LEGISLAÇÃO EXTRAVAGANTE**

- 1 Lei nº 9.455/1997 e suas alterações (antitortura).
- 2 Lei nº 10.826/2003 e suas alterações (Estatuto do Desarmamento).
- 3 Lei nº 12.846/2013 e suas alterações (anticorrupção).
- 4 Lei nº 12.850/2013 e suas alterações (organizações criminosas).
- 5 Lei nº 13.964/2019 (Pacote Anticrime).
- 6 Lei nº 7.210/1984 e suas alterações (Lei de Execução Penal).
- 7 Lei nº 9.455/1997 e suas alterações (crimes de tortura).
- 8 Lei nº 13.869/2019 e suas alterações (abuso de autoridade).
- 9 Lei nº 8.072/1990 e suas alterações (crimes hediondos).
- 10 Lei nº 7.960/1989 e suas alterações (prisão temporária).
- 11 Lei nº 11.343/2006 e suas alterações (repressão ao tráfico ilícito de drogas).
- 12 Lei nº 8.429/1992 e suas alterações (Lei de Improbidade Administrativa).
- 13 Lei nº 13.675/2018 e suas alterações (disciplina a organização e o funcionamento dos órgãos responsáveis pela segurança pública; cria a Política Nacional de Segurança Pública e Defesa Social; institui o Sistema Único de Segurança Pública) e Decreto de Regulamentação nº 9.489/2018 e suas alterações.
- 14 Portaria Interministerial MS/MJ nº 1/2014 (Política Nacional de Atenção Integral à Saúde das Pessoas Privadas de Liberdade no Sistema Prisional).
- 15 Resoluções do Conselho Nacional de Política Criminal e Penitenciária: Resolução nº 3/2009 (diretrizes de educação); Resolução nº 1/2014 (atenção em saúde mental); Resolução nº 4/2014 (assistência à saúde); Resolução 4/2017 (padrões mínimos para a assistência material do Estado à pessoa privada de liberdade); Resolução nº 31/2022 (medidas de monitoração eletrônica decorrentes de ordens judiciais).
- 16 Portaria Interministerial MJ/SPM nº 210/2014 (Política Nacional de Atenção às Mulheres em Situação de Privação de Liberdade e Egressas do Sistema Prisional).
- 17 Lei estadual nº 11.342/2020 e suas alterações (institui a Polícia Penal do Maranhão).

Ficam fora da execução desta meta outros cargos, novas funcionalidades, infraestrutura, alteração de schemas, migrações gerais, mega revisões, gerados e etapas médicas, físicas ou administrativas do concurso, salvo novo pedido explícito pertinente.

## 4. Contratos, seleção, reservas e publicação

Leia `AGENTS.md` integralmente a cada retomada pertinente; confira a `main`, schemas, catálogos, grupos, resolvedor, vínculos e registros de decisões arquiteturais. Leituras desta preparação: `AGENTS.md` (`1735e5035e3824be202be5c014f18d6445e235bb`); `src/lib/content-schema.ts` (`7d8dbc8e3bab4bc5c9b2758b07ce271b7ade636d`); `src/content.config.ts` (`48394b960e1b0dbd18857a1139092f1755f64cac`); disposições editoriais de `ADR.md` (`6d94fe8802ac79e254e623823884c27b39d1d98d`); entrada do catálogo em `src/lib/catalog.ts`, que usa `buildCatalogIndex` de `catalog-core`. Isso orienta a próxima leitura, não dispensa resolver a unidade real e seus consumidores antes de editá-la.

### Seleção e responsabilidade

Estados: `pending` → `analyzing` → `done`; caixa marcada somente em `done`. Cada assunto terá IDs estáveis e C/H/Q inicialmente `pending`. C, H e Q podem ter estados diferentes. Macros agregam subtarefas e não bloqueiam por si só uma disciplina independente.

“Ok”, “vai”, “avance”, “prossiga” e “continue” pedem concluir nesta resposta um assunto ou uma preparação/etapa de fechamento habilitada, publicar seu registro e sincronizar #765. Não são autorização para assumir trabalho de outra conversa ou começar atividade de fundo.

Retome somente `analyzing` comprovadamente seu; caso contrário, siga a ordem habilitada. Pule tarefas `done`, reservas alheias e dependências pendentes. Revisar um pacote já publicado no fechamento é uma inspeção própria, não reabrir automaticamente seu aceite editorial. Registro superado não constitui reserva ativa.

Antes de alegar lacuna, complete leituras truncadas e confira decisões; busca vazia não prova ausência. Havendo divergência entre registros ou visões do mesmo entregável, explicite e pule o recorte afetado, sem normalizar trabalho alheio. Sem tarefa elegível, informe e pare. Defeitos externos não bloqueiam unidades independentes.

Cumpra decisões e desbloqueios aprovados sem perguntar novamente. Desdobramentos autorizados exigem justificativa, IDs livres, preservação dos publicados e recontagem. Antecipe pré-requisitos: estrutura ainda não planejada não é, sozinha, bloqueio estrutural. Edite apenas a unidade própria e a documentação/estrutura necessária, preservando identidades, rotas, ordens e organização, salvo autorização.

### Reserva única no painel

Reserve conversa/token único, unidade/tarefa, C/H/Q, origem/destino, consumidores, todos os arquivos envolvidos, seções compartilhadas deste mestre e SHA-base. Confirme por releitura. Uma origem compartilhada tem apenas um executor; consulte #764, #766 e todas as metas consumidoras efetivamente identificadas. Paralelismo só é permitido sem sobreposição de origem, destino, artefatos ou gravações do mestre.

A reserva torna operacionalmente `analyzing` as pendências abrangidas; o `pending` no mestre pode representar a última consolidação. Nunca rebaixe um `done`. Serialize gravações deste arquivo pelo SHA corrente. Sem paralelismo, reduza consultas intermediárias, mas preserve releitura pré-escrita e confirmação posterior.

Bloqueio estrutural próprio, verificável e não resolvido mantém `analyzing`: publique aqui evidência e intervenção necessária, resuma na issue e pare. Não contorne contratos, crie placeholders ou altere infraestrutura para fazer conteúdo passar.

### Publicação e falhas

1. Antes de gravar, releia a issue, este arquivo, as reservas e a `main`; confirme propriedade, origem e SHA. Em corrida, reaplique somente sua mudança às versões novas; não apague, finalize ou libere trabalho alheio.
2. Inspecione manualmente os artefatos conforme `AGENTS.md`, inclusive escopo, frontmatter, Markdown, microglossário, links, cortes, questões, revisões, resoluções, identidades, rotas e vínculos. Não execute testes, builds, CI ou checks, nem crie branch/PR, salvo pedido explícito. Descubra e tente ações disponíveis antes de alegar indisponibilidade.
3. Publique os artefatos diretamente na `main` pelo conector GitHub, em commit coerente. Releia commit e arquivos antes de declarar aceite. Unidade `done` exige C/H/Q completos; macro `done` exige todas as subtarefas correspondentes concluídas.
4. Só então publique aqui estado, evidência, decisões autorizadas e agregados afetados. Confirme o arquivo e sincronize o painel, encerrando apenas a reserva própria. Não invente SHA futuro.
5. Sem mudança necessária, registre leitura integral, aderência ao recorte, caminho e SHA existente; não produza commit editorial vazio. Planejamento exige publicação, não apenas cópia local.
6. Sem publicação confirmada, somente trabalho próprio não publicado volta a `pending`, salvo bloqueio estrutural. Se falhar o painel, informe e reconcilie sem refazer publicação já confirmada. Falha no e-mail tampouco desfaz publicação.

Preserve títulos/marcas; nas linhas de tarefas existentes, altere apenas caixa/estado. Novas tarefas começam `pending`, com caixa marcada só em `done`. Preserve matriz, decisões e evidências únicas; substitua registros correntes, sem acumular diários, reservas encerradas ou totais repetidos.

Reconte macros, entregáveis C/H/Q, assuntos reais, canônicos, locais e visões separadamente; não some pais/filhos nem importe totais alheios. Distinga quantidade prevista, inventariada e aceita. Não reabra `done` apenas por ausência de `abbr`, nem confunda essa preservação de estado com dispensa da inspeção de qualidade habilitada.

## 5. Reaproveitamento e matriz

Resolva primeiro a origem física/local em `src/content/assuntos/` ou a origem canônica em `src/content/biblioteca/`, consumida por `vinculo.json` explícito. Unidade real não é aparição. Slug, título, semelhança e proximidade programática não provam compartilhamento ou doação histórica.

Consulte biblioteca e materiais publicados de TCE Analista/Técnico, PC-MA, SEAP e Perícia. Leia os candidatos inteiros e compare recorte, profundidade, corte, fontes, conteúdo, revisão, questões e resoluções. Só considerar entregue o que estiver efetivamente publicado e adequado; o aceite em outra campanha não certifica automaticamente a SEAP.

**Integral:** vincular canônico comprovadamente compatível ou copiar origem ainda local de modo controlado, com proveniência, identidade e metadados. Não mover ou canonicalizar a origem por conveniência.

**Parcial:** copiar somente trechos/exercícios pertinentes para a nova unidade local, documentar diferenças e completar as lacunas antes de publicar o pacote. Não vincular capítulo incompatível, misturar físico/vínculo ou criar overlays.

**Nova:** pesquisar e produzir com fontes verificáveis. Um candidato não vira doador por inferência; ausência de proveniência deve ser explicitada. Não reconstruir aceite perdido nem criar atribuição histórica para justificar cópia.

Edite canônico uma vez, considerando todos os consumidores e suas ordens, e somente com texto válido para todos. Recorte exclusivo de um consumidor deve permanecer na unidade local apropriada. Não renomear identidades, reorganizar cargos do TCE ou migrar origens alheias como efeito colateral.

### Contrato da matriz individual

Cada linha deve ser autossuficiente e manter:

**item/subitem literal → ID/título/recorte → origem/SHA → slug/destino/identidade/ordem → integral/parcial/nova → aproveitamento/lacunas/fronteiras → consumidores/corte/dependências → estado/evidência C/H/Q.**

Não remeter a definições perdidas. Registrar as repetições e inconsistências do edital sem apagá-las, mas sem somar duas vezes uma mesma unidade. Caminhos aparentes não substituem resolução; ordens pertencem às visões consumidoras. P04/P05 serão publicados com o primeiro assunto completo, sem catálogo ou grupo vazio.

A matriz foi individualizada em SEAP-P03 abaixo. R01/R02 completarão origem/SHA e classificação integral/parcial/nova após leitura e resolução física/canônica; isso não autoriza alterar os IDs estáveis ou criar vínculos por semelhança.

### Matriz individual P03 — programa → unidades planejadas

P03 individualiza **110 unidades editoriais planejadas**, com identidades `SEAP-U001`–`SEAP-U110`, ordens 1–110 e **330 entregáveis C/H/Q** inicialmente `pending`. Todos os itens e subitens transcritos do programa do Inspetor na seção 3.5 estão associados a pelo menos uma unidade. Isso é **cobertura programática planejada**, não aceite de conteúdo nem prova de origem física/canônica.

P03 não atribui origem por semelhança. Em cada linha, “origem não resolvida” significa que R01 ainda deve ler candidatos, resolver `vinculo.json` e consumidores e registrar o SHA real; R02 decide integral/parcial/nova. Os candidatos citados abaixo orientam a busca sem constituir doação, vínculo ou aceite. Uma visão SEAP ainda não publicada não possui SHA. As duas repetições interblocos reconciliadas — prisão temporária e improbidade — apontam para unidades já existentes em Processo Penal e Direito Administrativo; a dupla menção da Lei de Tortura permanece em uma única unidade.

#### SEAP-E01 — Língua Portuguesa — 19 unidades próprias

| Item/subitem | ID / título / recorte | Origem / SHA | Slug / destino / identidade / ordem | Classe R02 | Aproveitamento, lacunas e fronteiras | Consumidor, corte e dependências | C/H/Q / evidência |
|---|---|---|---|---|---|---|---|
| 22.2.3 Português 1 | **SEAP-U001 — Leitura, compreensão e interpretação de textos** | origem não resolvida em P03; visão SEAP ainda sem SHA | `leitura-interpretacao-tipos-generos`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/leitura-interpretacao-tipos-generos/`; `seap-u001`; ordem 1 | não classificada — R02 | Candidato(s) para R01: PC U001. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 2 | **SEAP-U002 — Tipos e gêneros textuais** | origem não resolvida em P03; visão SEAP ainda sem SHA | `tipos-generos-textuais`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/tipos-generos-textuais/`; `seap-u002`; ordem 2 | não classificada — R02 | Candidato(s) para R01: PC U002. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U001 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 3 | **SEAP-U003 — Domínio da ortografia oficial** | origem não resolvida em P03; visão SEAP ainda sem SHA | `ortografia-oficial`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/ortografia-oficial/`; `seap-u003`; ordem 3 | não classificada — R02 | Candidato(s) para R01: PC U003. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 4–4.1 | **SEAP-U004 — Coesão textual: mecanismos e sequenciação** | origem não resolvida em P03; visão SEAP ainda sem SHA | `coesao-textual`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/coesao-textual/`; `seap-u004`; ordem 4 | não classificada — R02 | Candidato(s) para R01: PC U004. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U001 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 4.2 | **SEAP-U005 — Emprego de tempos e modos verbais** | origem não resolvida em P03; visão SEAP ainda sem SHA | `emprego-tempos-modos-verbais`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/emprego-tempos-modos-verbais/`; `seap-u005`; ordem 5 | não classificada — R02 | Candidato(s) para R01: PC U005. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 5.1 | **SEAP-U006 — Classes nominais de palavras** | origem não resolvida em P03; visão SEAP ainda sem SHA | `classes-nominais-de-palavras`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/classes-nominais-de-palavras/`; `seap-u006`; ordem 6 | não classificada — R02 | Candidato(s) para R01: PC U006. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 5.1 | **SEAP-U007 — Verbo como classe de palavras** | origem não resolvida em P03; visão SEAP ainda sem SHA | `verbo-como-classe-de-palavras`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/verbo-como-classe-de-palavras/`; `seap-u007`; ordem 7 | não classificada — R02 | Candidato(s) para R01: PC U007. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U005 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 5.1 | **SEAP-U008 — Classes invariáveis de palavras** | origem não resolvida em P03; visão SEAP ainda sem SHA | `classes-invariaveis-de-palavras`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/classes-invariaveis-de-palavras/`; `seap-u008`; ordem 8 | não classificada — R02 | Candidato(s) para R01: PC U008. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 5 | **SEAP-U009 — Estrutura morfossintática do período** | origem não resolvida em P03; visão SEAP ainda sem SHA | `estrutura-morfossintatica-periodo`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/estrutura-morfossintatica-periodo/`; `seap-u009`; ordem 9 | não classificada — R02 | Candidato(s) para R01: PC U009. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U006–SEAP-U008 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 5.2 | **SEAP-U010 — Coordenação entre orações e termos da oração** | origem não resolvida em P03; visão SEAP ainda sem SHA | `coordenacao-oracoes-termos`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/coordenacao-oracoes-termos/`; `seap-u010`; ordem 10 | não classificada — R02 | Candidato(s) para R01: PC U010. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U009 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 5.3 | **SEAP-U011 — Subordinação entre orações e termos da oração** | origem não resolvida em P03; visão SEAP ainda sem SHA | `subordinacao-oracoes-termos`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/subordinacao-oracoes-termos/`; `seap-u011`; ordem 11 | não classificada — R02 | Candidato(s) para R01: PC U011. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U009 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 5.4 | **SEAP-U012 — Pontuação** | origem não resolvida em P03; visão SEAP ainda sem SHA | `pontuacao`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/pontuacao/`; `seap-u012`; ordem 12 | não classificada — R02 | Candidato(s) para R01: PC U012. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U009–SEAP-U011 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 5.5 | **SEAP-U013 — Concordância verbal e nominal** | origem não resolvida em P03; visão SEAP ainda sem SHA | `concordancia-verbal-nominal`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/concordancia-verbal-nominal/`; `seap-u013`; ordem 13 | não classificada — R02 | Candidato(s) para R01: PC U013. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U009 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 5.6 | **SEAP-U014 — Regência verbal e nominal** | origem não resolvida em P03; visão SEAP ainda sem SHA | `regencia-verbal-nominal`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/regencia-verbal-nominal/`; `seap-u014`; ordem 14 | não classificada — R02 | Candidato(s) para R01: PC U014. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U009 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 5.7 | **SEAP-U015 — Crase** | origem não resolvida em P03; visão SEAP ainda sem SHA | `crase`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/crase/`; `seap-u015`; ordem 15 | não classificada — R02 | Candidato(s) para R01: PC U015. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U014 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 5.8 | **SEAP-U016 — Colocação pronominal** | origem não resolvida em P03; visão SEAP ainda sem SHA | `colocacao-pronominal`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/colocacao-pronominal/`; `seap-u016`; ordem 16 | não classificada — R02 | Candidato(s) para R01: PC U016. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U006–SEAP-U009 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 6.1–6.2 | **SEAP-U017 — Significação e substituição lexical** | origem não resolvida em P03; visão SEAP ainda sem SHA | `significacao-substituicao-lexical`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/significacao-substituicao-lexical/`; `seap-u017`; ordem 17 | não classificada — R02 | Candidato(s) para R01: PC U017. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U001 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 6 e 6.3 | **SEAP-U018 — Reorganização da estrutura de orações e períodos** | origem não resolvida em P03; visão SEAP ainda sem SHA | `reorganizacao-oracoes-periodos`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/reorganizacao-oracoes-periodos/`; `seap-u018`; ordem 18 | não classificada — R02 | Candidato(s) para R01: PC U018. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U009–SEAP-U016 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Português 6.4 | **SEAP-U019 — Reescrita de textos de diferentes gêneros e níveis de formalidade** | origem não resolvida em P03; visão SEAP ainda sem SHA | `reescrita-generos-formalidade`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/lingua-portuguesa/reescrita-generos-formalidade/`; `seap-u019`; ordem 19 | não classificada — R02 | Candidato(s) para R01: PC U019. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U001–SEAP-U018 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |

#### SEAP-E02 — Raciocínio Lógico — 4 unidades próprias

| Item/subitem | ID / título / recorte | Origem / SHA | Slug / destino / identidade / ordem | Classe R02 | Aproveitamento, lacunas e fronteiras | Consumidor, corte e dependências | C/H/Q / evidência |
|---|---|---|---|---|---|---|---|
| 22.2.3 Raciocínio Lógico 1 | **SEAP-U020 — Relações lógicas arbitrárias e dedução de informações** | origem não resolvida em P03; visão SEAP ainda sem SHA | `relacoes-logicas-deducao-informacoes`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/raciocinio-logico/relacoes-logicas-deducao-informacoes/`; `seap-u020`; ordem 20 | não classificada — R02 | Candidato(s) para R01: PC U035 / biblioteca lógica. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Raciocínio Lógico 2 | **SEAP-U021 — Raciocínio verbal, matemático, sequencial, espacial e temporal** | origem não resolvida em P03; visão SEAP ainda sem SHA | `raciocinio-verbal-matematico-sequencial-espacial-temporal`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/raciocinio-logico/raciocinio-verbal-matematico-sequencial-espacial-temporal/`; `seap-u021`; ordem 21 | não classificada — R02 | Candidato(s) para R01: acervo lógico a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Raciocínio Lógico 3 | **SEAP-U022 — Operações com conjuntos** | origem não resolvida em P03; visão SEAP ainda sem SHA | `operacoes-conjuntos`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/raciocinio-logico/operacoes-conjuntos/`; `seap-u022`; ordem 22 | não classificada — R02 | Candidato(s) para R01: PC U041 / canônico. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Raciocínio Lógico 4 | **SEAP-U023 — Problemas aritméticos, geométricos e matriciais** | origem não resolvida em P03; visão SEAP ainda sem SHA | `problemas-aritmeticos-geometricos-matriciais`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/raciocinio-logico/problemas-aritmeticos-geometricos-matriciais/`; `seap-u023`; ordem 23 | não classificada — R02 | Candidato(s) para R01: PC U042. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |

#### SEAP-E03 — Noções de História do Maranhão — 7 unidades próprias

| Item/subitem | ID / título / recorte | Origem / SHA | Slug / destino / identidade / ordem | Classe R02 | Aproveitamento, lacunas e fronteiras | Consumidor, corte e dependências | C/H/Q / evidência |
|---|---|---|---|---|---|---|---|
| 22.2.3 História MA 1–4 | **SEAP-U024 — França Equinocial, fundação de São Luís, Guaxenduba e capitães-mores** | origem não resolvida em P03; visão SEAP ainda sem SHA | `franca-equinocial-fundacao-sao-luis-guaxenduba-capitaes-mores`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/historia-maranhao/franca-equinocial-fundacao-sao-luis-guaxenduba-capitaes-mores/`; `seap-u024`; ordem 24 | não classificada — R02 | Candidato(s) para R01: PC U062. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 História MA 5–6 | **SEAP-U025 — Invasão e expulsão holandesa** | origem não resolvida em P03; visão SEAP ainda sem SHA | `invasao-expulsao-holandesa`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/historia-maranhao/invasao-expulsao-holandesa/`; `seap-u025`; ordem 25 | não classificada — R02 | Candidato(s) para R01: PC U063. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U024 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 História MA 7 | **SEAP-U026 — Revolta de Bequimão e Companhia de Comércio** | origem não resolvida em P03; visão SEAP ainda sem SHA | `revolta-bequimao-companhia-comercio`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/historia-maranhao/revolta-bequimao-companhia-comercio/`; `seap-u026`; ordem 26 | não classificada — R02 | Candidato(s) para R01: PC U064. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U024 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 História MA 8–10 | **SEAP-U027 — Império, Independência e batalha do Jenipapo** | origem não resolvida em P03; visão SEAP ainda sem SHA | `imperio-independencia-jenipapo`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/historia-maranhao/imperio-independencia-jenipapo/`; `seap-u027`; ordem 27 | não classificada — R02 | Candidato(s) para R01: PC U065. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 História MA 11 | **SEAP-U028 — Balaiada** | origem não resolvida em P03; visão SEAP ainda sem SHA | `balaiada`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/historia-maranhao/balaiada/`; `seap-u028`; ordem 28 | não classificada — R02 | Candidato(s) para R01: PC U066. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U027 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 História MA 12–13 | **SEAP-U029 — Adesão à República e Revolução de 1930 no Maranhão** | origem não resolvida em P03; visão SEAP ainda sem SHA | `republica-revolucao-1930-maranhao`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/historia-maranhao/republica-revolucao-1930-maranhao/`; `seap-u029`; ordem 29 | não classificada — R02 | Candidato(s) para R01: PC U067. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 História MA 14 | **SEAP-U030 — Maranhão na segunda metade do século XX** | origem não resolvida em P03; visão SEAP ainda sem SHA | `maranhao-segunda-metade-seculo-xx`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/historia-maranhao/maranhao-segunda-metade-seculo-xx/`; `seap-u030`; ordem 30 | não classificada — R02 | Candidato(s) para R01: PC U068. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U029 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |

#### SEAP-E04 — Noções de Geografia do Maranhão — 9 unidades próprias

| Item/subitem | ID / título / recorte | Origem / SHA | Slug / destino / identidade / ordem | Classe R02 | Aproveitamento, lacunas e fronteiras | Consumidor, corte e dependências | C/H/Q / evidência |
|---|---|---|---|---|---|---|---|
| 22.2.3 Geografia MA 1 | **SEAP-U031 — Localização, superfície, limites, fronteiras e pontos extremos** | origem não resolvida em P03; visão SEAP ainda sem SHA | `localizacao-superficie-limites-fronteiras-extremos`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/geografia-maranhao/localizacao-superficie-limites-fronteiras-extremos/`; `seap-u031`; ordem 31 | não classificada — R02 | Candidato(s) para R01: PC U069. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Geografia MA 1 e 2 | **SEAP-U032 — Áreas de proteção ambiental e parques nacionais** | origem não resolvida em P03; visão SEAP ainda sem SHA | `areas-protecao-ambiental-parques-nacionais`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/geografia-maranhao/areas-protecao-ambiental-parques-nacionais/`; `seap-u032`; ordem 32 | não classificada — R02 | Candidato(s) para R01: PC U070. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U031 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Geografia MA 3 e 7 | **SEAP-U033 — Climas e formações vegetais do Maranhão** | origem não resolvida em P03; visão SEAP ainda sem SHA | `climas-formacoes-vegetais-maranhao`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/geografia-maranhao/climas-formacoes-vegetais-maranhao/`; `seap-u033`; ordem 33 | não classificada — R02 | Candidato(s) para R01: PC U071. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Geografia MA 4–4.1 | **SEAP-U034 — Geomorfologia e classificação do relevo maranhense** | origem não resolvida em P03; visão SEAP ainda sem SHA | `geomorfologia-relevo-maranhense`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/geografia-maranhao/geomorfologia-relevo-maranhense/`; `seap-u034`; ordem 34 | não classificada — R02 | Candidato(s) para R01: PC U072. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Geografia MA 5–6 | **SEAP-U035 — Rios limítrofes e bacias genuinamente maranhenses** | origem não resolvida em P03; visão SEAP ainda sem SHA | `rios-bacias-maranhao`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/geografia-maranhao/rios-bacias-maranhao/`; `seap-u035`; ordem 35 | não classificada — R02 | Candidato(s) para R01: PC U073. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Geografia MA 8 | **SEAP-U036 — População, povoamento e movimentos populacionais** | origem não resolvida em P03; visão SEAP ainda sem SHA | `populacao-povoamento-movimentos-maranhao`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/geografia-maranhao/populacao-povoamento-movimentos-maranhao/`; `seap-u036`; ordem 36 | não classificada — R02 | Candidato(s) para R01: PC U074. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Geografia MA 9–10 | **SEAP-U037 — Agricultura, pecuária e extrativismo** | origem não resolvida em P03; visão SEAP ainda sem SHA | `agricultura-pecuaria-extrativismo-maranhao`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/geografia-maranhao/agricultura-pecuaria-extrativismo-maranhao/`; `seap-u037`; ordem 37 | não classificada — R02 | Candidato(s) para R01: PC U075. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Geografia MA 11–12 | **SEAP-U038 — Indústria e setor terciário** | origem não resolvida em P03; visão SEAP ainda sem SHA | `industria-setor-terciario-maranhao`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/geografia-maranhao/industria-setor-terciario-maranhao/`; `seap-u038`; ordem 38 | não classificada — R02 | Candidato(s) para R01: PC U076. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Geografia MA 13–15 | **SEAP-U039 — Malha viária, portos, aeroportos e cultura maranhense** | origem não resolvida em P03; visão SEAP ainda sem SHA | `malha-portos-aeroportos-cultura-maranhao`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/geografia-maranhao/malha-portos-aeroportos-cultura-maranhao/`; `seap-u039`; ordem 39 | não classificada — R02 | Candidato(s) para R01: PC U077. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |

#### SEAP-E05 — Noções de Informática — 7 unidades próprias

| Item/subitem | ID / título / recorte | Origem / SHA | Slug / destino / identidade / ordem | Classe R02 | Aproveitamento, lacunas e fronteiras | Consumidor, corte e dependências | C/H/Q / evidência |
|---|---|---|---|---|---|---|---|
| 22.2.3 Informática 1 | **SEAP-U040 — Sistema operacional e software** | origem não resolvida em P03; visão SEAP ainda sem SHA | `sistema-operacional-software`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/informatica/sistema-operacional-software/`; `seap-u040`; ordem 40 | não classificada — R02 | Candidato(s) para R01: PC U023 é candidato parcial. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Informática 2 | **SEAP-U041 — Internet: navegação, URL, links, sites, busca e impressão** | origem não resolvida em P03; visão SEAP ainda sem SHA | `internet-navegacao-url-links-busca-impressao`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/informatica/internet-navegacao-url-links-busca-impressao/`; `seap-u041`; ordem 41 | não classificada — R02 | Candidato(s) para R01: PC U022 é candidato parcial. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Informática 3 | **SEAP-U042 — Microsoft Word: formatação e estrutura de documentos** | origem não resolvida em P03; visão SEAP ainda sem SHA | `microsoft-word-formatacao-documentos`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/informatica/microsoft-word-formatacao-documentos/`; `seap-u042`; ordem 42 | não classificada — R02 | Candidato(s) para R01: PC U024 / canônico Word, recorte a conferir. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Informática 4 | **SEAP-U043 — Microsoft Excel: formatação, cálculos, condicional e gráficos** | origem não resolvida em P03; visão SEAP ainda sem SHA | `microsoft-excel-planilhas-calculos-graficos`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/informatica/microsoft-excel-planilhas-calculos-graficos/`; `seap-u043`; ordem 43 | não classificada — R02 | Candidato(s) para R01: PC U024 / canônico Excel, recorte a conferir. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Informática 5 | **SEAP-U044 — Antivírus e firewall** | origem não resolvida em P03; visão SEAP ainda sem SHA | `antivirus-firewall`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/informatica/antivirus-firewall/`; `seap-u044`; ordem 44 | não classificada — R02 | Candidato(s) para R01: PC U029 cobre malware/proteção parcialmente. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Informática 6 | **SEAP-U045 — Teclas de atalho** | origem não resolvida em P03; visão SEAP ainda sem SHA | `teclas-atalho`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/informatica/teclas-atalho/`; `seap-u045`; ordem 45 | não classificada — R02 | Candidato(s) para R01: acervo Office/SO a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U040–SEAP-U043 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Informática 7 | **SEAP-U046 — Configuração de impressoras** | origem não resolvida em P03; visão SEAP ainda sem SHA | `configuracao-impressoras`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/informatica/configuracao-impressoras/`; `seap-u046`; ordem 46 | não classificada — R02 | Candidato(s) para R01: sem candidato atribuído em P03. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; prova 13/12/2026; deps: SEAP-U040 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |

#### SEAP-E06 — Atualidades — somente discursiva — 3 unidades próprias

| Item/subitem | ID / título / recorte | Origem / SHA | Slug / destino / identidade / ordem | Classe R02 | Aproveitamento, lacunas e fronteiras | Consumidor, corte e dependências | C/H/Q / evidência |
|---|---|---|---|---|---|---|---|
| 22.2.3 Atualidades 1 — segurança, política, sociedade, educação, saúde, cultura | **SEAP-U047 — Segurança pública, política e sociedade** | origem não resolvida em P03; visão SEAP ainda sem SHA | `seguranca-publica-politica-sociedade`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/atualidades-discursiva/seguranca-publica-politica-sociedade/`; `seap-u047`; ordem 47 | não classificada — R02 | Candidato(s) para R01: PC U078. Somente discursiva | SEAP Inspetor; somente discursiva; prova 13/12/2026; F03 revalida atos posteriores | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Atualidades 1 — economia, transportes, tecnologia, energia | **SEAP-U048 — Economia, infraestrutura e transformação tecnológica** | origem não resolvida em P03; visão SEAP ainda sem SHA | `economia-infraestrutura-transformacao-tecnologica`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/atualidades-discursiva/economia-infraestrutura-transformacao-tecnologica/`; `seap-u048`; ordem 48 | não classificada — R02 | Candidato(s) para R01: PC U079. Somente discursiva | SEAP Inspetor; somente discursiva; prova 13/12/2026; F03 revalida atos posteriores | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 22.2.3 Atualidades 1 — relações internacionais, desenvolvimento sustentável, ecologia | **SEAP-U049 — Relações internacionais, sustentabilidade e meio ambiente** | origem não resolvida em P03; visão SEAP ainda sem SHA | `relacoes-internacionais-sustentabilidade-meio-ambiente`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-gerais/atualidades-discursiva/relacoes-internacionais-sustentabilidade-meio-ambiente/`; `seap-u049`; ordem 49 | não classificada — R02 | Candidato(s) para R01: PC U080. Somente discursiva | SEAP Inspetor; somente discursiva; prova 13/12/2026; F03 revalida atos posteriores | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |

#### SEAP-E07 — Direito Administrativo — 7 unidades próprias

| Item/subitem | ID / título / recorte | Origem / SHA | Slug / destino / identidade / ordem | Classe R02 | Aproveitamento, lacunas e fronteiras | Consumidor, corte e dependências | C/H/Q / evidência |
|---|---|---|---|---|---|---|---|
| 20.2.4 Administrativo 1 | **SEAP-U050 — Princípios da Administração Pública — art. 37 da CF/1988** | origem não resolvida em P03; visão SEAP ainda sem SHA | `principios-administracao-publica-art-37`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-administrativo/principios-administracao-publica-art-37/`; `seap-u050`; ordem 50 | não classificada — R02 | Candidato(s) para R01: PC U098/U116 e biblioteca; aderência a conferir. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Administrativo 2 | **SEAP-U051 — Poderes administrativos** | origem não resolvida em P03; visão SEAP ainda sem SHA | `poderes-administrativos`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-administrativo/poderes-administrativos/`; `seap-u051`; ordem 51 | não classificada — R02 | Candidato(s) para R01: PC U105. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U050 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Administrativo 3 | **SEAP-U052 — Atos administrativos** | origem não resolvida em P03; visão SEAP ainda sem SHA | `atos-administrativos`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-administrativo/atos-administrativos/`; `seap-u052`; ordem 52 | não classificada — R02 | Candidato(s) para R01: PC U102. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U050 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Administrativo 4 | **SEAP-U053 — Servidores públicos: regime, direitos, deveres, proibições e responsabilidades** | origem não resolvida em P03; visão SEAP ainda sem SHA | `servidores-publicos-regime-direitos-deveres-responsabilidades`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-administrativo/servidores-publicos-regime-direitos-deveres-responsabilidades/`; `seap-u053`; ordem 53 | não classificada — R02 | Candidato(s) para R01: PC U100/U109 candidatos parciais. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U050 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Administrativo 5 | **SEAP-U054 — Processo administrativo — Lei 9.784/1999** | origem não resolvida em P03; visão SEAP ainda sem SHA | `processo-administrativo-lei-9784`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-administrativo/processo-administrativo-lei-9784/`; `seap-u054`; ordem 54 | não classificada — R02 | Candidato(s) para R01: acervo administrativo a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U050 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Administrativo 6 | **SEAP-U055 — Responsabilidade civil do Estado** | origem não resolvida em P03; visão SEAP ainda sem SHA | `responsabilidade-civil-estado`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-administrativo/responsabilidade-civil-estado/`; `seap-u055`; ordem 55 | não classificada — R02 | Candidato(s) para R01: PC U107. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U050 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Administrativo 7 | **SEAP-U056 — Improbidade administrativa — Lei 8.429/1992** | origem não resolvida em P03; visão SEAP ainda sem SHA | `improbidade-administrativa-lei-8429`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-administrativo/improbidade-administrativa-lei-8429/`; `seap-u056`; ordem 56 | não classificada — R02 | Candidato(s) para R01: PC U104. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U050 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |

#### SEAP-E08 — Direito Constitucional — 9 unidades próprias

| Item/subitem | ID / título / recorte | Origem / SHA | Slug / destino / identidade / ordem | Classe R02 | Aproveitamento, lacunas e fronteiras | Consumidor, corte e dependências | C/H/Q / evidência |
|---|---|---|---|---|---|---|---|
| 20.2.4 Constitucional 1–1.1 | **SEAP-U057 — Estado e Constituição: conceito, conteúdo, objeto e classificação** | origem não resolvida em P03; visão SEAP ainda sem SHA | `estado-e-constituicao`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-constitucional/estado-e-constituicao/`; `seap-u057`; ordem 57 | não classificada — R02 | Candidato(s) para R01: PC U112. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Constitucional 2–2.3 | **SEAP-U058 — CF/1988: preâmbulo, princípios fundamentais, dignidade e dimensões dos direitos humanos** | origem não resolvida em P03; visão SEAP ainda sem SHA | `cf88-preambulo-principios-fundamentais`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-constitucional/cf88-preambulo-principios-fundamentais/`; `seap-u058`; ordem 58 | não classificada — R02 | Candidato(s) para R01: PC U113. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U057 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Constitucional 3–4 | **SEAP-U059 — Direitos e garantias fundamentais e remédios constitucionais** | origem não resolvida em P03; visão SEAP ainda sem SHA | `direitos-garantias-remedios-constitucionais`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-constitucional/direitos-garantias-remedios-constitucionais/`; `seap-u059`; ordem 59 | não classificada — R02 | Candidato(s) para R01: PC U114. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U058 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Constitucional 5–5.1 | **SEAP-U060 — Organização político-administrativa do Estado** | origem não resolvida em P03; visão SEAP ainda sem SHA | `organizacao-politico-administrativa-estado`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-constitucional/organizacao-politico-administrativa-estado/`; `seap-u060`; ordem 60 | não classificada — R02 | Candidato(s) para R01: PC U115. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Constitucional 6–6.1 | **SEAP-U061 — Administração pública e servidores públicos na Constituição** | origem não resolvida em P03; visão SEAP ainda sem SHA | `administracao-publica-servidores-publicos`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-constitucional/administracao-publica-servidores-publicos/`; `seap-u061`; ordem 61 | não classificada — R02 | Candidato(s) para R01: PC U116. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U050 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Constitucional 7 | **SEAP-U062 — Funções essenciais à Justiça** | origem não resolvida em P03; visão SEAP ainda sem SHA | `funcoes-essenciais-justica`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-constitucional/funcoes-essenciais-justica/`; `seap-u062`; ordem 62 | não classificada — R02 | Candidato(s) para R01: PC U120. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Constitucional 8–8.2 | **SEAP-U063 — Defesa do Estado, instituições democráticas e segurança pública** | origem não resolvida em P03; visão SEAP ainda sem SHA | `defesa-estado-seguranca-publica`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-constitucional/defesa-estado-seguranca-publica/`; `seap-u063`; ordem 63 | não classificada — R02 | Candidato(s) para R01: PC U121. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Constitucional 9–9.4 | **SEAP-U064 — Ordem social: seguridade, meio ambiente, família e grupos protegidos** | origem não resolvida em P03; visão SEAP ainda sem SHA | `ordem-social-seguridade-meio-ambiente-familia`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-constitucional/ordem-social-seguridade-meio-ambiente-familia/`; `seap-u064`; ordem 64 | não classificada — R02 | Candidato(s) para R01: PC U122. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U059 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Constitucional 10 | **SEAP-U065 — Constituição do Maranhão: segurança pública, arts. 112 a 121** | origem não resolvida em P03; visão SEAP ainda sem SHA | `constituicao-maranhao-seguranca-publica-arts-112-121`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-constitucional/constituicao-maranhao-seguranca-publica-arts-112-121/`; `seap-u065`; ordem 65 | não classificada — R02 | Candidato(s) para R01: acervo estadual a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U063 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |

#### SEAP-E09 — Direito Penal — 10 unidades próprias

| Item/subitem | ID / título / recorte | Origem / SHA | Slug / destino / identidade / ordem | Classe R02 | Aproveitamento, lacunas e fronteiras | Consumidor, corte e dependências | C/H/Q / evidência |
|---|---|---|---|---|---|---|---|
| 20.2.4 Penal 1–1.9 | **SEAP-U066 — Aplicação da lei penal** | origem não resolvida em P03; visão SEAP ainda sem SHA | `aplicacao-lei-penal`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-penal/aplicacao-lei-penal/`; `seap-u066`; ordem 66 | não classificada — R02 | Candidato(s) para R01: PC U081. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Penal 2–2.2 | **SEAP-U067 — Teoria geral do crime e infração penal** | origem não resolvida em P03; visão SEAP ainda sem SHA | `teoria-geral-crime-infracao-penal`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-penal/teoria-geral-crime-infracao-penal/`; `seap-u067`; ordem 67 | não classificada — R02 | Candidato(s) para R01: PC U082. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U066 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Penal 3–3.2 | **SEAP-U068 — Fato típico, consumação, tentativa e concurso de crimes** | origem não resolvida em P03; visão SEAP ainda sem SHA | `fato-tipico-consumacao-tentativa-concurso-crimes`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-penal/fato-tipico-consumacao-tentativa-concurso-crimes/`; `seap-u068`; ordem 68 | não classificada — R02 | Candidato(s) para R01: PC U083. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U067 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Penal 3.3–3.6 | **SEAP-U069 — Ilicitude, punibilidade, excesso punível e culpabilidade** | origem não resolvida em P03; visão SEAP ainda sem SHA | `ilicitude-punibilidade-excesso-culpabilidade`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-penal/ilicitude-punibilidade-excesso-culpabilidade/`; `seap-u069`; ordem 69 | não classificada — R02 | Candidato(s) para R01: PC U084. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U067–SEAP-U068 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Penal 4–5 | **SEAP-U070 — Imputabilidade penal e concurso de pessoas** | origem não resolvida em P03; visão SEAP ainda sem SHA | `imputabilidade-penal-concurso-pessoas`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-penal/imputabilidade-penal-concurso-pessoas/`; `seap-u070`; ordem 70 | não classificada — R02 | Candidato(s) para R01: PC U085. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U067–SEAP-U069 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Penal 6 | **SEAP-U071 — Crimes contra a pessoa** | origem não resolvida em P03; visão SEAP ainda sem SHA | `crimes-contra-pessoa`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-penal/crimes-contra-pessoa/`; `seap-u071`; ordem 71 | não classificada — R02 | Candidato(s) para R01: PC U086. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U066–SEAP-U070 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Penal 7 | **SEAP-U072 — Crimes contra o patrimônio** | origem não resolvida em P03; visão SEAP ainda sem SHA | `crimes-contra-patrimonio`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-penal/crimes-contra-patrimonio/`; `seap-u072`; ordem 72 | não classificada — R02 | Candidato(s) para R01: PC U087. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U066–SEAP-U070 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Penal 8 | **SEAP-U073 — Crimes contra a dignidade sexual** | origem não resolvida em P03; visão SEAP ainda sem SHA | `crimes-contra-dignidade-sexual`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-penal/crimes-contra-dignidade-sexual/`; `seap-u073`; ordem 73 | não classificada — R02 | Candidato(s) para R01: PC U088. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U066–SEAP-U070 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Penal 9–11 | **SEAP-U074 — Crimes contra a incolumidade, a paz e a fé públicas** | origem não resolvida em P03; visão SEAP ainda sem SHA | `crimes-incolumidade-paz-fe-publicas`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-penal/crimes-incolumidade-paz-fe-publicas/`; `seap-u074`; ordem 74 | não classificada — R02 | Candidato(s) para R01: PC U089. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U066–SEAP-U070 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Penal 12 | **SEAP-U075 — Crimes contra a administração pública** | origem não resolvida em P03; visão SEAP ainda sem SHA | `crimes-contra-administracao-publica`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-penal/crimes-contra-administracao-publica/`; `seap-u075`; ordem 75 | não classificada — R02 | Candidato(s) para R01: PC U090. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U066–SEAP-U070 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |

#### SEAP-E10 — Direito Processual Penal — 11 unidades próprias

| Item/subitem | ID / título / recorte | Origem / SHA | Slug / destino / identidade / ordem | Classe R02 | Aproveitamento, lacunas e fronteiras | Consumidor, corte e dependências | C/H/Q / evidência |
|---|---|---|---|---|---|---|---|
| 20.2.4 Processo Penal 1 | **SEAP-U076 — Princípios do processo penal** | origem não resolvida em P03; visão SEAP ainda sem SHA | `principios-processo-penal`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-processual-penal/principios-processo-penal/`; `seap-u076`; ordem 76 | não classificada — R02 | Candidato(s) para R01: PC U091. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Processo Penal 2 | **SEAP-U077 — Inquérito policial** | origem não resolvida em P03; visão SEAP ainda sem SHA | `inquerito-policial`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-processual-penal/inquerito-policial/`; `seap-u077`; ordem 77 | não classificada — R02 | Candidato(s) para R01: PC U092. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U076 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Processo Penal 3 | **SEAP-U078 — Ação penal: espécies e condições** | origem não resolvida em P03; visão SEAP ainda sem SHA | `acao-penal-especies-condicoes`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-processual-penal/acao-penal-especies-condicoes/`; `seap-u078`; ordem 78 | não classificada — R02 | Candidato(s) para R01: acervo processual a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U076 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Processo Penal 4 | **SEAP-U079 — Jurisdição e competência** | origem não resolvida em P03; visão SEAP ainda sem SHA | `jurisdicao-competencia-processo-penal`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-processual-penal/jurisdicao-competencia-processo-penal/`; `seap-u079`; ordem 79 | não classificada — R02 | Candidato(s) para R01: acervo processual a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U076 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Processo Penal 5 | **SEAP-U080 — Prisão em flagrante** | origem não resolvida em P03; visão SEAP ainda sem SHA | `prisao-flagrante`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-processual-penal/prisao-flagrante/`; `seap-u080`; ordem 80 | não classificada — R02 | Candidato(s) para R01: PC U094. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U076 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Processo Penal 5 | **SEAP-U081 — Prisão preventiva** | origem não resolvida em P03; visão SEAP ainda sem SHA | `prisao-preventiva`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-processual-penal/prisao-preventiva/`; `seap-u081`; ordem 81 | não classificada — R02 | Candidato(s) para R01: PC U095. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U076 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Processo Penal 5 | **SEAP-U082 — Prisão temporária — Lei 7.960/1989** | origem não resolvida em P03; visão SEAP ainda sem SHA | `prisao-temporaria`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-processual-penal/prisao-temporaria/`; `seap-u082`; ordem 82 | não classificada — R02 | Candidato(s) para R01: PC U096; também atende Legislação Extravagante 10. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U076 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Processo Penal 5 | **SEAP-U083 — Liberdade provisória e medidas cautelares diversas** | origem não resolvida em P03; visão SEAP ainda sem SHA | `liberdade-provisoria-medidas-cautelares`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-processual-penal/liberdade-provisoria-medidas-cautelares/`; `seap-u083`; ordem 83 | não classificada — R02 | Candidato(s) para R01: PC U097 é candidato parcial. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U080–SEAP-U082 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Processo Penal 6 | **SEAP-U084 — Provas: espécies e admissibilidade** | origem não resolvida em P03; visão SEAP ainda sem SHA | `provas-processo-penal`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-processual-penal/provas-processo-penal/`; `seap-u084`; ordem 84 | não classificada — R02 | Candidato(s) para R01: PC U093. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U076 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Processo Penal 7 | **SEAP-U085 — Recursos: espécies e prazos** | origem não resolvida em P03; visão SEAP ainda sem SHA | `recursos-processo-penal`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-processual-penal/recursos-processo-penal/`; `seap-u085`; ordem 85 | não classificada — R02 | Candidato(s) para R01: acervo processual a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U076 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Processo Penal 8 | **SEAP-U086 — Procedimentos e nulidades processuais** | origem não resolvida em P03; visão SEAP ainda sem SHA | `procedimentos-nulidades-processuais`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direito-processual-penal/procedimentos-nulidades-processuais/`; `seap-u086`; ordem 86 | não classificada — R02 | Candidato(s) para R01: acervo processual a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U076 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |

#### SEAP-E11 — Direitos Humanos — 6 unidades próprias

| Item/subitem | ID / título / recorte | Origem / SHA | Slug / destino / identidade / ordem | Classe R02 | Aproveitamento, lacunas e fronteiras | Consumidor, corte e dependências | C/H/Q / evidência |
|---|---|---|---|---|---|---|---|
| 20.2.4 Direitos Humanos 1 | **SEAP-U087 — Direitos humanos e direitos fundamentais na CF/1988 — arts. 5º a 15** | origem não resolvida em P03; visão SEAP ainda sem SHA | `direitos-humanos-fundamentais-cf88-arts-5-15`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direitos-humanos/direitos-humanos-fundamentais-cf88-arts-5-15/`; `seap-u087`; ordem 87 | não classificada — R02 | Candidato(s) para R01: PC U142/U147 e U114 são candidatos; recorte próprio. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U059 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Direitos Humanos 2 | **SEAP-U088 — Programa Nacional de Direitos Humanos — Decreto 7.037/2009** | origem não resolvida em P03; visão SEAP ainda sem SHA | `programa-nacional-direitos-humanos-decreto-7037`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direitos-humanos/programa-nacional-direitos-humanos-decreto-7037/`; `seap-u088`; ordem 88 | não classificada — R02 | Candidato(s) para R01: acervo DH a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Direitos Humanos 3 | **SEAP-U089 — Declaração Universal dos Direitos Humanos** | origem não resolvida em P03; visão SEAP ainda sem SHA | `declaracao-universal-direitos-humanos`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direitos-humanos/declaracao-universal-direitos-humanos/`; `seap-u089`; ordem 89 | não classificada — R02 | Candidato(s) para R01: PC U144 / biblioteca DH. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Direitos Humanos 4 | **SEAP-U090 — Regras de Nelson Mandela** | origem não resolvida em P03; visão SEAP ainda sem SHA | `regras-nelson-mandela`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direitos-humanos/regras-nelson-mandela/`; `seap-u090`; ordem 90 | não classificada — R02 | Candidato(s) para R01: acervo penitenciário a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U089 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Direitos Humanos 5 | **SEAP-U091 — Convenção Americana de Direitos Humanos** | origem não resolvida em P03; visão SEAP ainda sem SHA | `convencao-americana-direitos-humanos`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direitos-humanos/convencao-americana-direitos-humanos/`; `seap-u091`; ordem 91 | não classificada — R02 | Candidato(s) para R01: PC U146 / biblioteca DH. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: nenhuma específica | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Direitos Humanos 6 | **SEAP-U092 — Regras de Bangkok** | origem não resolvida em P03; visão SEAP ainda sem SHA | `regras-bangkok`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/direitos-humanos/regras-bangkok/`; `seap-u092`; ordem 92 | não classificada — R02 | Candidato(s) para R01: acervo penitenciário a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U089 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |

#### SEAP-E12 — Legislação Extravagante — 18 unidades próprias + 2 unidades compartilhadas

| Item/subitem | ID / título / recorte | Origem / SHA | Slug / destino / identidade / ordem | Classe R02 | Aproveitamento, lacunas e fronteiras | Consumidor, corte e dependências | C/H/Q / evidência |
|---|---|---|---|---|---|---|---|
| 20.2.4 Legislação Extravagante 1 e 7 | **SEAP-U093 — Crimes de tortura — Lei 9.455/1997** | origem não resolvida em P03; visão SEAP ainda sem SHA | `crimes-tortura-lei-9455`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/crimes-tortura-lei-9455/`; `seap-u093`; ordem 93 | não classificada — R02 | Candidato(s) para R01: PC U125. Uma unidade cobre as duas ocorrências literais do edital | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U066–SEAP-U075 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 2 | **SEAP-U094 — Estatuto do Desarmamento — Lei 10.826/2003** | origem não resolvida em P03; visão SEAP ainda sem SHA | `estatuto-desarmamento-lei-10826`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/estatuto-desarmamento-lei-10826/`; `seap-u094`; ordem 94 | não classificada — R02 | Candidato(s) para R01: PC U127. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U066–SEAP-U075 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 3 | **SEAP-U095 — Lei Anticorrupção — Lei 12.846/2013** | origem não resolvida em P03; visão SEAP ainda sem SHA | `lei-anticorrupcao-lei-12846`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/lei-anticorrupcao-lei-12846/`; `seap-u095`; ordem 95 | não classificada — R02 | Candidato(s) para R01: biblioteca/TCE a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U050 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 4 | **SEAP-U096 — Organizações criminosas — Lei 12.850/2013** | origem não resolvida em P03; visão SEAP ainda sem SHA | `organizacao-criminosa-lei-12850`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/organizacao-criminosa-lei-12850/`; `seap-u096`; ordem 96 | não classificada — R02 | Candidato(s) para R01: PC U139. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U076–SEAP-U086 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 5 | **SEAP-U097 — Pacote Anticrime — Lei 13.964/2019** | origem não resolvida em P03; visão SEAP ainda sem SHA | `pacote-anticrime-lei-13964`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/pacote-anticrime-lei-13964/`; `seap-u097`; ordem 97 | não classificada — R02 | Candidato(s) para R01: acervo penal/processual a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U066–SEAP-U086 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 6 | **SEAP-U098 — Lei de Execução Penal — Lei 7.210/1984** | origem não resolvida em P03; visão SEAP ainda sem SHA | `lei-execucao-penal-lei-7210`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/lei-execucao-penal-lei-7210/`; `seap-u098`; ordem 98 | não classificada — R02 | Candidato(s) para R01: acervo penitenciário a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U087–SEAP-U092 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 8 | **SEAP-U099 — Abuso de autoridade — Lei 13.869/2019** | origem não resolvida em P03; visão SEAP ainda sem SHA | `abuso-autoridade-lei-13869`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/abuso-autoridade-lei-13869/`; `seap-u099`; ordem 99 | não classificada — R02 | Candidato(s) para R01: PC U124. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U050–SEAP-U086 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 9 | **SEAP-U100 — Crimes hediondos — Lei 8.072/1990** | origem não resolvida em P03; visão SEAP ainda sem SHA | `crimes-hediondos-lei-8072`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/crimes-hediondos-lei-8072/`; `seap-u100`; ordem 100 | não classificada — R02 | Candidato(s) para R01: PC U132. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U066–SEAP-U075 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 11 | **SEAP-U101 — Lei de Drogas — Lei 11.343/2006** | origem não resolvida em P03; visão SEAP ainda sem SHA | `lei-drogas-lei-11343`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/lei-drogas-lei-11343/`; `seap-u101`; ordem 101 | não classificada — R02 | Candidato(s) para R01: PC U123. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U066–SEAP-U075 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 13 | **SEAP-U102 — SUSP e PNSPDS — Lei 13.675/2018 e Decreto 9.489/2018** | origem não resolvida em P03; visão SEAP ainda sem SHA | `susp-pnspds-lei-13675-decreto-9489`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/susp-pnspds-lei-13675-decreto-9489/`; `seap-u102`; ordem 102 | não classificada — R02 | Candidato(s) para R01: acervo segurança pública a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U063 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 14 | **SEAP-U103 — PNAISP — Portaria Interministerial MS/MJ 1/2014** | origem não resolvida em P03; visão SEAP ainda sem SHA | `pnaisp-portaria-interministerial-1-2014`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/pnaisp-portaria-interministerial-1-2014/`; `seap-u103`; ordem 103 | não classificada — R02 | Candidato(s) para R01: acervo penitenciário a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U098 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 15 | **SEAP-U104 — CNPCP Resolução 3/2009 — diretrizes de educação** | origem não resolvida em P03; visão SEAP ainda sem SHA | `cnpcp-resolucao-3-2009-educacao`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/cnpcp-resolucao-3-2009-educacao/`; `seap-u104`; ordem 104 | não classificada — R02 | Candidato(s) para R01: acervo penitenciário a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U098 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 15 | **SEAP-U105 — CNPCP Resolução 1/2014 — atenção em saúde mental** | origem não resolvida em P03; visão SEAP ainda sem SHA | `cnpcp-resolucao-1-2014-saude-mental`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/cnpcp-resolucao-1-2014-saude-mental/`; `seap-u105`; ordem 105 | não classificada — R02 | Candidato(s) para R01: acervo penitenciário a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U098 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 15 | **SEAP-U106 — CNPCP Resolução 4/2014 — assistência à saúde** | origem não resolvida em P03; visão SEAP ainda sem SHA | `cnpcp-resolucao-4-2014-assistencia-saude`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/cnpcp-resolucao-4-2014-assistencia-saude/`; `seap-u106`; ordem 106 | não classificada — R02 | Candidato(s) para R01: acervo penitenciário a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U098 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 15 | **SEAP-U107 — CNPCP Resolução 4/2017 — assistência material** | origem não resolvida em P03; visão SEAP ainda sem SHA | `cnpcp-resolucao-4-2017-assistencia-material`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/cnpcp-resolucao-4-2017-assistencia-material/`; `seap-u107`; ordem 107 | não classificada — R02 | Candidato(s) para R01: acervo penitenciário a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U098 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 15 | **SEAP-U108 — CNPCP Resolução 31/2022 — monitoração eletrônica** | origem não resolvida em P03; visão SEAP ainda sem SHA | `cnpcp-resolucao-31-2022-monitoracao-eletronica`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/cnpcp-resolucao-31-2022-monitoracao-eletronica/`; `seap-u108`; ordem 108 | não classificada — R02 | Candidato(s) para R01: acervo penitenciário a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U098 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 16 | **SEAP-U109 — PNAMPE — Portaria Interministerial MJ/SPM 210/2014** | origem não resolvida em P03; visão SEAP ainda sem SHA | `pnampe-portaria-interministerial-210-2014`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/pnampe-portaria-interministerial-210-2014/`; `seap-u109`; ordem 109 | não classificada — R02 | Candidato(s) para R01: acervo penitenciário a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U092/SEAP-U098 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 17 | **SEAP-U110 — Polícia Penal do Maranhão — Lei estadual 11.342/2020** | origem não resolvida em P03; visão SEAP ainda sem SHA | `policia-penal-maranhao-lei-11342`; `src/content/assuntos/seap-ma-2026-inspetor-policia-penal/conhecimentos-especificos/legislacao-extravagante/policia-penal-maranhao-lei-11342/`; `seap-u110`; ordem 110 | não classificada — R02 | Candidato(s) para R01: acervo estadual a inventariar. R01 compara recorte, profundidade, fontes, Q e consumidores antes de atribuir origem. | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026; deps: SEAP-U063 | C `pending`; H `pending`; Q `pending`; evidência: planejamento P03 |
| 20.2.4 Legislação Extravagante 10 | **SEAP-U082 — Prisão temporária — Lei 7.960/1989** (remissão, sem nova unidade) | herda a origem a resolver da unidade | `prisao-temporaria`; destino planejado já registrado em SEAP-E10; `seap-u082`; ordem 82 | não classificada — R02 | mesma unidade real planejada em Processo Penal; não duplicar por aparição no edital; R01/R02 verificam aderência da lei às duas ocorrências | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026 | C/H/Q são os mesmos da unidade; `pending` |
| 20.2.4 Legislação Extravagante 12 | **SEAP-U056 — Improbidade administrativa — Lei 8.429/1992** (remissão, sem nova unidade) | herda a origem a resolver da unidade | `improbidade-administrativa-lei-8429`; destino planejado já registrado em SEAP-E07; `seap-u056`; ordem 56 | não classificada — R02 | mesma unidade real planejada em Direito Administrativo; não duplicar por aparição no edital; R01/R02 verificam aderência da lei às duas ocorrências | SEAP Inspetor; corte legislativo 21/07/2026; jurisprudência 13/11/2026 se prova permanecer 13/12/2026 | C/H/Q são os mesmos da unidade; `pending` |

#### Totais e cobertura da P03

| Dimensão | Quantidade | Estado após a publicação da matriz |
|---|---:|---|
| Unidades editoriais planejadas | 110 | todas com identidade, slug, destino, ordem e C/H/Q definidos; origem ainda a resolver em R01 |
| Entregáveis unitários C/H/Q | 330 | 330 `pending` |
| Macros editoriais agregadoras | 36 | preservadas `pending`; não somar às 330 subtarefas |
| Ocorrências repetidas sem nova unidade | 3 | Lei 9.455/1997 item 1/7 → SEAP-U093; Lei 7.960/1989 item 10 → SEAP-U082; Lei 8.429/1992 item 12 → SEAP-U056 |
| Intervalo de ordens | 1–110 | sem lacuna e sem slug duplicado no planejamento |

A fronteira disciplinar é organizacional, não duplicação de identidade: uma mesma unidade pode satisfazer mais de uma ocorrência literal do edital. A lista não afirma **110 origens físicas distintas**; R01 poderá resolver uma parte como canônica, outra como cópia/local e outra como nova, sem alterar os IDs estáveis da campanha salvo desdobramento autorizado e justificado.


### Inventário R01 — candidatos físicos/canônicos, vínculos e consumidores

A árvore recursiva da `main` em `cb227a068654412637b78e56bb546763452e8d62` foi lida com `truncated: false`: 2.680 entradas totais, 2.368 sob `src/content/assuntos/` ou `src/content/biblioteca/`. Para as 110 unidades de P03, R01 encontrou **114 pacotes candidatos completos** (C/H/Q/referências) associados a **92 unidades**: **36 canônicos**, **72 físicos PC-MA** e **6 físicos TCE-T**. Os canônicos possuem **84 visões consumidoras** nos vínculos relevantes; os conteúdos de **49 blobs de `vinculo.json` distintos** foram conferidos e apontam explicitamente para os canônicos registrados abaixo.

Os 114 pacotes somam 456 artefatos-base (114 `conteudo.md`, 114 `cheat-sheet.md`, 114 `questoes.json`, 114 `referencias.md`). A árvore não contém `resolucoes/*.md` dentro desses 114 pacotes candidatos, portanto não havia resolução adicional a ler nesse conjunto. **84 candidatos** (72 físicos PC-MA + 12 canônicos consumidos pela PC-MA) têm leitura integral C/H/Q/R documentada em PC-F02/F04; a comparação `de6662a..cb227a0` mostra que, após o fechamento PC, somente `SEAP-MA-2026-ISSUE-765.md` mudou. Os **30 candidatos restantes** (24 canônicos sem consumidor PC + 6 físicos TCE-T) tiveram C/H/Q/R lidos diretamente nesta R01. Isso comprova leitura do acervo candidato sem importar o aceite pedagógico de outra campanha.

**Limite:** esta tabela é inventário, não classificação. “Candidato” não significa doador aceito nem compatibilidade integral. R02 ainda deve comparar recorte, profundidade, corte, fontes, questões e fronteiras e então escolher integral/parcial/nova. Para as 18 unidades sem pacote direto, a ausência foi apurada na árvore recursiva completa e por busca textual por título/norma; ela não é convertida em `nova` antes de R02.

| Unidade | Candidato(s) material(is) e fingerprint atual | Estado de inventário |
|---|---|---|
| SEAP-U001 — Leitura, compreensão e interpretação de textos | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/leitura-interpretacao-tipos-generos` (C 07473a9 / H c75427b / Q dcb939b / R a953619; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/leitura-interpretacao-tipos-generos` (C 85dbe7c / H bcfbeb7 / Q 4ed13fa / R ab4d4a4; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U002 — Tipos e gêneros textuais | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/tipos-generos-textuais` (C 330dc4a / H 75706c5 / Q 575a354 / R 75fa2b1; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/tipos-generos-textuais` (C d8e190a / H dd5af18 / Q fc7f614 / R 4930ba9; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U003 — Domínio da ortografia oficial | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/ortografia-oficial` (C fe4ec6b / H 5f9b053 / Q f08deac / R 417bf03; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/ortografia-oficial` (C c2bbe26 / H f2231e6 / Q 858f900 / R 8956dbf; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U004 — Coesão textual: mecanismos e sequenciação | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/coesao-textual` (C 7f48115 / H e58c3b0 / Q a462883 / R b975785; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/coesao-textual` (C 078c259 / H d4a6d88 / Q 59d80ee / R 228703b; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U005 — Emprego de tempos e modos verbais | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/emprego-tempos-modos-verbais` (C f8e79ff / H a86d167 / Q d4bad8a / R e6758c3; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/emprego-tempos-modos-verbais` (C 578fe59 / H 57f31c5 / Q df3d4c2 / R 84e846e; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U006 — Classes nominais de palavras | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/classes-nominais-de-palavras` (C d0daac2 / H 17f8109 / Q ad4727c / R bd350e0; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/classes-nominais-de-palavras` (C b9de21f / H fc2bcca / Q 2d2c0b4 / R f99a02d; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U007 — Verbo como classe de palavras | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/verbo-como-classe-de-palavras` (C 4561f7b / H 0d3d3a4 / Q d51caca / R 1e7ba8a; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/verbo-como-classe-de-palavras` (C 5ff3dd5 / H 24e5ac6 / Q 3031c7d / R 6349a4c; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U008 — Classes invariáveis de palavras | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/classes-invariaveis-de-palavras` (C 490b6c8 / H 681c5ba / Q 4bb1e6d / R a113a21; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/classes-invariaveis-de-palavras` (C 53bb6ac / H ffb6699 / Q 6933d03 / R 0963e74; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U009 — Estrutura morfossintática do período | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/estrutura-morfossintatica-periodo` (C e38f535 / H dbe77eb / Q 8e218aa / R 85227c1; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U010 — Coordenação entre orações e termos da oração | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/coordenacao-oracoes-termos` (C 2495eed / H 083ec12 / Q e7dd356 / R 7559102; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/coordenacao-oracoes-termos` (C feab108 / H ad2f18a / Q deffc17 / R a37fd26; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U011 — Subordinação entre orações e termos da oração | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/subordinacao-oracoes-termos` (C df7ba47 / H 3a233f6 / Q 9212605 / R f2d8472; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/subordinacao-oracoes-termos` (C 62d47a1 / H 746e398 / Q 4fb85a6 / R 34233d8; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U012 — Pontuação | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/pontuacao` (C 7ae01dc / H 4b3555a / Q 8c624ae / R 26e626a; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/pontuacao` (C 9350850 / H 6eae0ab / Q a2b053a / R ff3d841; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U013 — Concordância verbal e nominal | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/concordancia-verbal-nominal` (C 2755e9d / H c16b9d0 / Q 647ad7f / R 3e3fbd6; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/concordancia-verbal-nominal` (C 9a522e0 / H 453fb4e / Q 25c8328 / R d9f96b2; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U014 — Regência verbal e nominal | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/regencia-verbal-nominal` (C 8ee905b / H a54d2e8 / Q 7643eae / R 139992e; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/regencia-verbal-nominal` (C a5efc67 / H 5e0d4dc / Q 65d9b5e / R 5fb9ad5; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U015 — Crase | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/crase` (C 14b5a82 / H 674439e / Q 7db4708 / R 81899a4; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/crase` (C 0147467 / H d0d7508 / Q 49ab162 / R c668897; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U016 — Colocação pronominal | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/colocacao-pronominal` (C 931f210 / H 35c0158 / Q 099ed06 / R 5a169ea; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/colocacao-pronominal` (C b0898bb / H 6a983f5 / Q 14a409d / R 9413844; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U017 — Significação e substituição lexical | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/significacao-substituicao-lexical` (C cd99a3f / H c3c37a2 / Q ba524c2 / R 09b7e2f; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/significacao-substituicao-lexical` (C 95a8667 / H c767365 / Q 28a49db / R 0a28307; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U018 — Reorganização da estrutura de orações e períodos | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/reorganizacao-oracoes-periodos` (C 3503314 / H b958d73 / Q e54e5bf / R fe26046; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/reorganizacao-oracoes-periodos` (C 1cadb8d / H 17c4e75 / Q 7f65949 / R 3cefb13; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U019 — Reescrita de textos de diferentes gêneros e níveis de formalidade | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/lingua-portuguesa/reescrita-generos-formalidade` (C e9b6354 / H ee6f0dd / Q ee12c77 / R ab679a0; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/lingua-portuguesa/reescrita-generos-formalidade` (C 0d68ee2 / H d168fc7 / Q 0e574c8 / R db94243; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U020 — Relações lógicas arbitrárias e dedução de informações | **canônico** `B/raciocinio-logico/estruturas-logicas` (C 26936c9 / H 30e5f70 / Q ecb43e2 / R 3b1d9e1; vínculos explícitos: PC-MA, TCE-A, TCE-T; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U021 — Raciocínio verbal, matemático, sequencial, espacial e temporal | **canônico** `B/raciocinio-logico/estruturas-logicas` (C 26936c9 / H 30e5f70 / Q ecb43e2 / R 3b1d9e1; vínculos explícitos: PC-MA, TCE-A, TCE-T; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U022 — Operações com conjuntos | **canônico** `B/raciocinio-logico/operacoes-conjuntos` (C 0f070a1 / H f271f24 / Q 9d2e9b6 / R 1ba5cdc; vínculos explícitos: PC-MA, TCE-A, TCE-T; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U023 — Problemas aritméticos, geométricos e matriciais | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/raciocinio-logico/problemas-aritmeticos-geometricos-matriciais` (C 33ec715 / H 69c60bc / Q 72c7d68 / R eeab912; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U024 — França Equinocial, fundação de São Luís, Guaxenduba e capitães-mores | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/historia-maranhao/franca-equinocial-fundacao-guaxenduba-capitaes-mores` (C ad1781c / H 7ea3abc / Q 18ea9bb / R ec59aa8; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U025 — Invasão e expulsão holandesa | **canônico** `B/historia-geografia-estado-maranhao/invasao-expulsao-holandeses` (C fb17d4d / H 832f043 / Q 7edea32 / R 381b085; vínculos explícitos: PC-MA, TCE-A, TCE-T; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U026 — Revolta de Bequimão e Companhia de Comércio | **canônico** `B/historia-geografia-estado-maranhao/revolta-bequimao-companhias` (C a661333 / H 284cf04 / Q 0a80829 / R e59651c; vínculos explícitos: PC-MA, TCE-A, TCE-T; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U027 — Império, Independência e batalha do Jenipapo | **canônico** `B/historia-geografia-estado-maranhao/adesao-independencia-jenipapo` (C ad6e405 / H a7ef9f6 / Q 87628e4 / R 026cd1f; vínculos explícitos: PC-MA, TCE-A, TCE-T; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U028 — Balaiada | **canônico** `B/historia-geografia-estado-maranhao/balaiada-caracterizacao-causas` (C f3d912b / H f305dec / Q d0b24c8 / R 5569fd2; vínculos explícitos: PC-MA, TCE-A, TCE-T; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U029 — Adesão à República e Revolução de 1930 no Maranhão | **canônico** `B/historia-geografia-estado-maranhao/adesao-republica-revolucao-1930` (C 0175393 / H e8c4b44 / Q efe73ab / R fc6f792; vínculos explícitos: PC-MA, TCE-A, TCE-T; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U030 — Maranhão na segunda metade do século XX | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/historia-maranhao/fatos-maranhao-segunda-metade-sec-xx` (C c45845b / H 2afb55e / Q 213aebb / R da588b7; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U031 — Localização, superfície, limites, fronteiras e pontos extremos | **canônico** `B/historia-geografia-estado-maranhao/localizacao-limites-extremos` (C 77c0b48 / H 35a986d / Q 61737af / R 444cd6c; vínculos explícitos: PC-MA, TCE-A, TCE-T; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U032 — Áreas de proteção ambiental e parques nacionais | **canônico** `B/historia-geografia-estado-maranhao/areas-protecao-parques-nacionais` (C 0998e8b / H cc30f3a / Q 41f200c / R 794a534; vínculos explícitos: PC-MA, TCE-A, TCE-T; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U033 — Climas e formações vegetais do Maranhão | **canônico** `B/historia-geografia-estado-maranhao/climas-formacoes-vegetais` (C d44db7f / H 0abefbe / Q 9ef0837 / R 4366c13; vínculos explícitos: PC-MA, TCE-A, TCE-T; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U034 — Geomorfologia e classificação do relevo maranhense | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/geografia-maranhao/geomorfologia-relevo` (C 43168b3 / H c56de77 / Q 91970dc / R 9bf7677; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U035 — Rios limítrofes e bacias genuinamente maranhenses | **canônico** `B/historia-geografia-estado-maranhao/rios-bacias-maranhenses` (C ccdca43 / H f149968 / Q 5b7da9e / R 759f2c3; vínculos explícitos: PC-MA, TCE-A, TCE-T; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U036 — População, povoamento e movimentos populacionais | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/geografia-maranhao/populacao-movimentos` (C f5e606c / H d2dd14c / Q c1f81eb / R 1fba795; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U037 — Agricultura, pecuária e extrativismo | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/geografia-maranhao/agricultura-pecuaria-extrativismo` (C 667b534 / H 3b53e51 / Q 61ac2de / R 4165374; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U038 — Indústria e setor terciário | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/geografia-maranhao/industria-comercio-telecom-transportes` (C 6f72a47 / H 42d7119 / Q 5abd32c / R 2fe9bad; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U039 — Malha viária, portos, aeroportos e cultura maranhense | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/geografia-maranhao/malha-portos-aeroportos-cultura` (C e576dda / H cd24cb1 / Q 2c5ae24 / R b51f429; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U040 — Sistema operacional e software | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/informatica/sistemas-operacionais-windows-linux` (C 9e7dad2 / H 900982e / Q dd11f9f / R bfe65cf; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/competencias-digitais-informatica-aplicada-setor-publico/windows-arquivos-pastas` (C d31f984 / H c682918 / Q e2d717e / R 53a0baf; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U041 — Internet: navegação, URL, links, sites, busca e impressão | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/informatica/internet-intranet-navegacao-redes-sociais` (C 318358e / H 4fe0f52 / Q 2a0263e / R 4af751f; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U042 — Microsoft Word: formatação e estrutura de documentos | **canônico** `B/competencias-digitais-informatica-aplicada-setor-publico/microsoft-word-documentos` (C f80b295 / H 8f93071 / Q 5d34ae5 / R 25a7ec2; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U043 — Microsoft Excel: formatação, cálculos, condicional e gráficos | **canônico** `B/competencias-digitais-informatica-aplicada-setor-publico/microsoft-excel-planilhas` (C d2c838c / H de283d7 / Q 8924e64 / R fafdfb8; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U044 — Antivírus e firewall | **canônico** `B/competencias-digitais-informatica-aplicada-setor-publico/malware-protecao-ameacas` (C 14bfa69 / H e7e6d31 / Q 1f3dc38 / R fa55998; vínculos explícitos: PC-MA, TCE-A, TCE-T; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U045 — Teclas de atalho | **canônico** `B/competencias-digitais-informatica-aplicada-setor-publico/microsoft-word-documentos` (C f80b295 / H 8f93071 / Q 5d34ae5 / R 25a7ec2; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R)<br>**canônico** `B/competencias-digitais-informatica-aplicada-setor-publico/windows-arquivos-pastas` (C d31f984 / H c682918 / Q e2d717e / R 53a0baf; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U046 — Configuração de impressoras | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U047 — Segurança pública, política e sociedade | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/atualidades/seguranca-publica-politica-sociedade` (C 21d5d08 / H 75e3bae / Q 773b9f0 / R 498ff34; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U048 — Economia, infraestrutura e transformação tecnológica | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/atualidades/economia-infraestrutura-transformacao-tecnologica` (C 39780b3 / H 1065895 / Q 3a1c743 / R c8d54f3; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U049 — Relações internacionais, sustentabilidade e meio ambiente | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-gerais/atualidades/relacoes-internacionais-sustentabilidade-meio-ambiente` (C b15badc / H ccce973 / Q 3bdaac6 / R 3ee58eb; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U050 — Princípios da Administração Pública — art. 37 da CF/1988 | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-administrativo/estado-governo-administracao-publica` (C 563269a / H 4a2999a / Q 93b7208 / R e5fa6b2; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U051 — Poderes administrativos | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-administrativo/poderes-administrativos` (C b28f4db / H 9d64f30 / Q b7ee1dd / R 2891777; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**físico TCE-T** `A/tce-ma-2026-tecnico-administrativa/conhecimentos-gerais/direito-administrativo/poderes-administrativos` (C 10f2ae7 / H 20a0f0d / Q 35ab13d / R f4acd40; consumidor atual: TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U052 — Atos administrativos | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-administrativo/atos-administrativos` (C 33df4ab / H 5607506 / Q 06bf13f / R 24cc2b0; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U053 — Servidores públicos: regime, direitos, deveres, proibições e responsabilidades | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-administrativo/servidores-publicos-federais-lei-8112` (C 7416931 / H 8bee0ff / Q 1bcf4bc / R c41d6aa; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U054 — Processo administrativo — Lei 9.784/1999 | **canônico** `B/controle-externo/controle-administrativo` (C f728ead / H de1067c / Q 7398e0f / R ebf7a6e; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U055 — Responsabilidade civil do Estado | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-administrativo/responsabilidade-civil-estado` (C 62b2d9d / H 8369cc1 / Q ad6af61 / R f49282e; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**físico TCE-T** `A/tce-ma-2026-tecnico-administrativa/conhecimentos-gerais/direito-administrativo/responsabilidade-civil-estado` (C 61f94cc / H 1d50fae / Q b3fecb4 / R 4518d28; consumidor atual: TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U056 — Improbidade administrativa — Lei 8.429/1992 | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-administrativo/improbidade-administrativa-lei-8429` (C bd3311e / H ef055dc / Q ecabb58 / R 5b97d0a; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U057 — Estado e Constituição: conceito, conteúdo, objeto e classificação | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-constitucional/estado-e-constituicao` (C 9489956 / H 86418f3 / Q 1d4c1e6 / R c05b3e7; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U058 — CF/1988: preâmbulo, princípios fundamentais, dignidade e dimensões dos direitos humanos | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-constitucional/cf88-preambulo-principios-fundamentais` (C adf00fe / H f831d7b / Q 3c250bd / R 12dff69; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U059 — Direitos e garantias fundamentais e remédios constitucionais | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-constitucional/direitos-garantias-remedios-constitucionais` (C da4cbe6 / H ba7600b / Q c3c72ac / R 008f2bd; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U060 — Organização político-administrativa do Estado | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-constitucional/organizacao-politico-administrativa-estado` (C 70b313e / H 408a921 / Q 84e8693 / R fdf4b2e; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**físico TCE-T** `A/tce-ma-2026-tecnico-administrativa/conhecimentos-gerais/direito-constitucional/organizacao-politico-administrativa-estado` (C 568bc25 / H a0809b2 / Q b2ee70d / R 4325951; consumidor atual: TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U061 — Administração pública e servidores públicos na Constituição | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-constitucional/administracao-publica-servidores-publicos` (C 4b949b1 / H 6340dcf / Q 6221743 / R 861ffd6; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**físico TCE-T** `A/tce-ma-2026-tecnico-administrativa/conhecimentos-gerais/direito-constitucional/administracao-publica-servidores-publicos` (C bef6aa5 / H a1a99c1 / Q 2f7d18b / R f141cde; consumidor atual: TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U062 — Funções essenciais à Justiça | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-constitucional/funcoes-essenciais-justica` (C 9e18a57 / H 3ad993c / Q 951a29f / R b1eb9f0; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**físico TCE-T** `A/tce-ma-2026-tecnico-administrativa/conhecimentos-gerais/direito-constitucional/funcoes-essenciais-justica` (C 557e463 / H 6996198 / Q 3340f4b / R 983e6d7; consumidor atual: TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U063 — Defesa do Estado, instituições democráticas e segurança pública | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-constitucional/defesa-estado-seguranca-publica` (C 4695e1c / H dd33e3d / Q 8f11c0b / R 7e37028; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U064 — Ordem social: seguridade, meio ambiente, família e grupos protegidos | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-constitucional/ordem-social-seguridade-meio-ambiente-familia` (C 75a17df / H 7a74dce / Q d0eeaf0 / R 9c5d919; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U065 — Constituição do Maranhão: segurança pública, arts. 112 a 121 | **físico TCE-T** `A/tce-ma-2026-tecnico-administrativa/conhecimentos-gerais/direito-constitucional/constituicao-estado-maranhao` (C d5c4d45 / H 41ebe49 / Q d6e8095 / R a9d5421; consumidor atual: TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U066 — Aplicação da lei penal | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-penal/aplicacao-lei-penal` (C dbd0d41 / H a3469e8 / Q 60e373f / R 97fe054; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U067 — Teoria geral do crime e infração penal | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-penal/teoria-geral-crime-infracao-penal` (C ba59ebe / H 53cf352 / Q 0f202f1 / R dd1aa3e; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U068 — Fato típico, consumação, tentativa e concurso de crimes | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-penal/fato-tipico-consumacao-tentativa-concurso-crimes` (C 4f18aec / H 922fa89 / Q 5d8a741 / R 4177b21; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U069 — Ilicitude, punibilidade, excesso punível e culpabilidade | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-penal/ilicitude-punibilidade-excesso-culpabilidade` (C 8f6a292 / H 44b94d1 / Q 858ae06 / R d1b58ae; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U070 — Imputabilidade penal e concurso de pessoas | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-penal/imputabilidade-penal-concurso-pessoas` (C 3ddca37 / H 4761039 / Q 3f69de6 / R 5fb4145; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U071 — Crimes contra a pessoa | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-penal/crimes-contra-pessoa` (C 4066794 / H 4b3dcd0 / Q 75292ad / R 4cc30a6; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U072 — Crimes contra o patrimônio | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-penal/crimes-contra-patrimonio` (C dd5e9a8 / H af41401 / Q b4059d0 / R aa325d4; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U073 — Crimes contra a dignidade sexual | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-penal/crimes-contra-dignidade-sexual` (C 269cdf1 / H 609566d / Q 1af9fa0 / R 2b79128; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U074 — Crimes contra a incolumidade, a paz e a fé públicas | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-penal/crimes-incolumidade-paz-fe-publicas` (C 155c617 / H b3d5958 / Q b8eb482 / R e7df4d4; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U075 — Crimes contra a administração pública | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-penal/crimes-contra-administracao-publica` (C 84e893c / H b96c6ca / Q e682c14 / R 79cd719; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U076 — Princípios do processo penal | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-processual-penal/principios-gerais-sistemas-processo-penal` (C 35f8c6c / H 7e93798 / Q 0deed46 / R 368ca28; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U077 — Inquérito policial | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-processual-penal/inquerito-policial` (C 7afe860 / H 2a6f90b / Q 413e87e / R 48808df; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U078 — Ação penal: espécies e condições | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U079 — Jurisdição e competência | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-processual-penal/principios-gerais-sistemas-processo-penal` (C 35f8c6c / H 7e93798 / Q 0deed46 / R 368ca28; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U080 — Prisão em flagrante | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-processual-penal/prisao-flagrante` (C b947c30 / H db418ce / Q 952f2ef / R b59a006; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U081 — Prisão preventiva | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-processual-penal/prisao-preventiva` (C c10cded / H 48a74b5 / Q b8eeec9 / R 7396164; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U082 — Prisão temporária — Lei 7.960/1989 | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-processual-penal/prisao-temporaria` (C 0c32714 / H df7f14b / Q 87a3160 / R ed54aca; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U083 — Liberdade provisória e medidas cautelares diversas | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-processual-penal/outras-medidas-cautelares` (C cafb301 / H 36cd2f2 / Q fcaa2e1 / R d2d64f3; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U084 — Provas: espécies e admissibilidade | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-processual-penal/prova-processo-penal` (C 6a9fe61 / H 183e558 / Q 34c4ae5 / R e48827e; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U085 — Recursos: espécies e prazos | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U086 — Procedimentos e nulidades processuais | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U087 — Direitos humanos e direitos fundamentais na CF/1988 — arts. 5º a 15 | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direitos-humanos/teoria-geral-direitos-humanos` (C 0d8f596 / H 8d1e6cb / Q 45693b5 / R 56be392; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U088 — Programa Nacional de Direitos Humanos — Decreto 7.037/2009 | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U089 — Declaração Universal dos Direitos Humanos | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direitos-humanos/sistema-global-onu-dudh` (C 2f98183 / H 5cbfbbc / Q 247281d / R 30eddf0; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/nocoes-direitos-humanos/declaracao-universal-direitos-humanos` (C d936d44 / H d2646bb / Q b4347cd / R 9e1fcfe; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U090 — Regras de Nelson Mandela | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U091 — Convenção Americana de Direitos Humanos | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direitos-humanos/sistema-interamericano-direitos-humanos` (C cc742da / H 780870c / Q 15cac95 / R 8e7a106; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U092 — Regras de Bangkok | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U093 — Crimes de tortura — Lei 9.455/1997 | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/legislacao-especial/crimes-tortura-lei-9455` (C e4c91fb / H 9fbbaee / Q 4ae87da / R d1a54ef; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U094 — Estatuto do Desarmamento — Lei 10.826/2003 | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/legislacao-especial/estatuto-desarmamento-lei-10826` (C 58733d3 / H 54d049f / Q 09f26f3 / R 6c29d3b; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U095 — Lei Anticorrupção — Lei 12.846/2013 | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/direito-administrativo/improbidade-administrativa-lei-8429` (C bd3311e / H ef055dc / Q ecabb58 / R 5b97d0a; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a)<br>**canônico** `B/gestao-contratos/sancoes-controle-pncp` (C dfae690 / H d22998c / Q 4e8a774 / R d21ff99; vínculos explícitos: TCE-A, TCE-T; leitura direta R01 C/H/Q/R) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U096 — Organizações criminosas — Lei 12.850/2013 | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/legislacao-especial/organizacao-criminosa-lei-12850` (C 8579bed / H ecffb8c / Q 6db4d2f / R c09f9e7; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U097 — Pacote Anticrime — Lei 13.964/2019 | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U098 — Lei de Execução Penal — Lei 7.210/1984 | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U099 — Abuso de autoridade — Lei 13.869/2019 | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/legislacao-especial/abuso-autoridade-lei-13869` (C 5360344 / H 3c25e1b / Q d75f686 / R 0c4bff5; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U100 — Crimes hediondos — Lei 8.072/1990 | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/legislacao-especial/crimes-hediondos-lei-8072` (C 808a03e / H 004683b / Q 07cce68 / R 2ec4cbe; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U101 — Lei de Drogas — Lei 11.343/2006 | **físico PC-MA** `A/pc-ma-2026-oficial-investigador/conhecimentos-especificos/legislacao-especial/lei-drogas-lei-11343` (C 3948fac / H 815988a / Q de3c207 / R 9f75fe8; consumidor atual: PC-MA; leitura integral PC-F02/F04; árvore atual inalterada desde de6662a) | candidato(s) resolvido(s); R02 pendente |
| SEAP-U102 — SUSP e PNSPDS — Lei 13.675/2018 e Decreto 9.489/2018 | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U103 — PNAISP — Portaria Interministerial MS/MJ 1/2014 | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U104 — CNPCP Resolução 3/2009 — diretrizes de educação | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U105 — CNPCP Resolução 1/2014 — atenção em saúde mental | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U106 — CNPCP Resolução 4/2014 — assistência à saúde | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U107 — CNPCP Resolução 4/2017 — assistência material | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U108 — CNPCP Resolução 31/2022 — monitoração eletrônica | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U109 — PNAMPE — Portaria Interministerial MJ/SPM 210/2014 | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |
| SEAP-U110 — Polícia Penal do Maranhão — Lei estadual 11.342/2020 | **nenhum pacote-doador direto materializado** na árvore atual; busca textual por título/norma não encontrou unidade C/H/Q/R equivalente | sem candidato direto; R02 decide `nova`/produção própria ou nova busca material |

#### Recontagem R01

| Dimensão | Quantidade | Observação |
|---|---:|---|
| Unidades planejadas | 110 | identidades P03 preservadas |
| Unidades com ≥1 candidato material | 92 | não implica integral/parcial |
| Unidades sem pacote-doador direto | 18 | não implica `nova` antes de R02 |
| Pacotes candidatos únicos | 114 | 36 canônicos + 72 PC-MA físicos + 6 TCE-T físicos |
| Artefatos-base candidatos | 456 | C/H/Q/R, quatro por pacote |
| Resoluções nos pacotes candidatos | 0 | árvore completa do conjunto candidato |
| Visões consumidoras dos 36 canônicos | 84 | vínculos explícitos conferidos |
| Blobs distintos de vínculo conferidos | 49 | diferenças de `order` preservadas por consumidor |

## 6. Guia obrigatório de qualidade pedagógica e economia de estudo

### O que revisar, inclusive no já produzido

O leitor é iniciante inteligente, com pouco tempo. Otimize **compreensão, retenção e acerto por minuto**, não número de arquivos, tamanho de banco, volume de texto ou rapidez do executor. Conteúdo correto, mas difícil de aprender no tempo disponível, exige intervenção editorial.

A revisão alcança o material existente/doador antes do reaproveitamento, o pacote local antes do aceite e os pacotes já `done` na inspeção de fechamento habilitada. Registre o estado dessa inspeção separadamente do aceite C/H/Q, sem apagar trabalho anterior. A revisão não se limita a acrescentar introdução, trocar links, atualizar bibliografia, contar questões, marcar siglas ou conferir presença de arquivos.

Leia C/H/Q, referências, resoluções existentes e vizinhos relevantes integralmente. Compare cobertura, pré-requisitos, ordem cognitiva, termos, lacunas, redundâncias, exemplos, remissões, vigência e aplicabilidade. Não declare leitura ou conferência visual que não ocorreu. Quando uma fonte for apenas catálogo/resumo, registre esse limite; identificação bibliográfica não equivale a consulta integral da obra.

### C — aprender com autonomia

Em `conteudo.md`, reorganize a aula inteira quando necessário, não apenas seu início. Abra com pergunta, contraste, mecanismo, processo ou pequeno cenário que permita compreender o núcleo. Construa significado antes de nomes técnicos, classificações e exceções. Contexto histórico/institucional só entra quando explica o conceito, distingue alternativas ou melhora aplicação.

Use poucos exemplos decisivos; identifique os hipotéticos e verifique os factuais. Prefira um exemplo que revele o mecanismo a listas de exemplos equivalentes. Explique limites de analogias e use mnemônicos apenas depois de ensinar o que representam. Tabelas sintetizam relações já explicadas, não substituem raciocínio.

Preserve definições, literalidade relevante, fórmulas e suas variáveis/unidades/condições, requisitos, exceções, prazos, jurisprudência e pegadinhas. Corte redundância, não substância necessária. Uma ponte mínima deve permitir entender o assunto mesmo sem leitura em ordem perfeita; remissão a outro capítulo limita aprofundamento, não terceiriza compreensão.

Revalide fontes primárias e o corte, distinguindo alterações posteriores. Norma federal infralegal não é automaticamente aplicável ao Estado ou à administração penitenciária. Nunca invente norma, dado, entendimento, citação, questão, atribuição, URL ou resultado. Em `referencias.md`, mantenha suporte completo e pertinente, sem referências órfãs; use títulos, órgão/autor, identificação e data/edição suficientes para auditoria.

### H — recuperar, não reaprender

`cheat-sheet.md` pressupõe o estudo da aula. Deve ser curto, preciso, consultável isoladamente e centrado em decisões de prova: contrastes, mecanismos, requisitos, exceções, fórmulas e erros prováveis. Não copiar a aula, reensiná-la inteira ou introduzir fundamentos ausentes em C. Texto telegráfico que elimina condição essencial não é concisão útil.

Revise a qualidade de H mesmo quando C permanecer inalterado. Preservar o mesmo número de linhas ou palavras não constitui critério de aceite. Mega revisões continuam fora deste escopo.

### Q — testar compreensão, discriminação e aplicação

Busque provas anteriores pertinentes e verificáveis, sem quotas; revise as reaproveitadas e complemente lacunas com autorais identificadas. Respeite direitos de uso. Não invente banca, ano, prova, gabarito ou condição de questão original/adaptada.

Examine cada enunciado, todas as alternativas, a resposta e a explicação. Verifique gabarito único, distratores plausíveis, ausência de ambiguidade involuntária e correspondência com o que foi ensinado. Uma adaptação deve preservar informações indispensáveis à resposta e explicitar seu caráter; não basta repetir a letra do gabarito do original.

Preserve IDs e `origin`; siga os schemas atuais. Alterações de enunciado, opções ou gabarito exigem a revisão individual prevista; inclusão/remoção exige revisão do conjunto conforme o contrato. Resoluções separadas só quando necessárias, correspondentes à revisão da questão e sem identidade nova. Explicação deve ensinar por que a resposta vale e enfrentar a confusão relevante, sem apenas repetir o gabarito.

Atualidades segue os recortes aprovados para discursiva: problemas, evidências, argumentos e limites. Propostas abertas e respostas comentadas ficam no material didático, não no schema objetivo; objetivas desse bloco servem à fixação. Diferencie fato/publicação/consulta e cortes legislativo/jurisprudencial.

### Microglossário no ponto de uso

Toda ocorrência renderizada de sigla ou abreviatura técnica/institucional, inclusive em listas/tabelas e após definição, recebe expansão contextual:

```html
<abbr title="expansão contextual">SIGLA</abbr>
```

Termos técnicos, jargões e estrangeirismos usados antes de explicados recebem microdescrição em cada uso nessa condição; depois, recupere a ajuda em trechos distantes ou autônomos quando útil. Não marque palavras comuns indiscriminadamente. A descrição deve ser breve, correta, compreensível sem jargão desconhecido e adequada ao sentido, número e consumidores.

Conceitos e pré-requisitos indispensáveis ficam no corpo. Não esconda regra ou exceção no `title`; a compreensão deve sobreviver à leitura sem interação. Atributo simples, não vazio, sem HTML/Markdown/URL/fórmula; feche tags, escape aspas quando necessário e não aninhe. Exclua links/controles, frontmatter, IDs, código, fórmulas e campos de texto puro. Preserve transcrições e não revele respostas de exercícios. A marcação não autoriza expansão de escopo nem mudança de infraestrutura.

### Tamanho e evidência de revisão

Reordene, substitua e corte antes de ampliar. Crescimento só se paga por ganho pedagógico proporcional; separe texto visível, marcação e microdescrições. Aula não é cheat sheet expandido, e economia de tempo não é superficialidade. Não preserve totais contra aprendizagem nem aumente automaticamente um capítulo porque outro cresceu.

No registro de cada inspeção, informe o problema observado, a intervenção e o ganho concreto: pré-requisito recuperado, distinção esclarecida, redundância retirada, erro corrigido ou remissão reparada. Registre cortes, crescimento e alterações de microglossário sem inventar minutos poupados. Para manter C/H/Q sem mudança, documente a aderência efetiva do recorte, leitura integral e caminhos/SHAs, não uma aprovação genérica.

Antes do aceite, responda pela leitura: o núcleo aparece cedo? Um iniciante consegue explicar o mecanismo e aplicar as condições? H recupera o que C ensinou? Q discrimina conhecimento sem ambiguidade? As fontes sustentam as afirmações? É possível cortar sem prejudicar cobertura ou entendimento? O texto continua válido para todos os consumidores?

Em SEAP-F02, identifique individualmente o que foi inspecionado e o que falta; amostra, triagem estrutural ou revisão de uma referência não certificam semanticamente todo o pacote, banco ou disciplina. Não finalize a macro por extrapolação. Não reescreva material já adequado por ritual.

## 7. Roadmap detalhado preservado

### 7.1 Fontes e criação do concurso

- [x] SEAP-P01 — `done` — Consolidar edital e retificações oficiais; transcrever o programa integral com numeração, separar objetiva/discursiva e registrar inconsistências documentais sem correção silenciosa.
- [x] SEAP-P02 — `done` — Definir título, slug, `storageId`, ordem e caminhos do novo concurso conforme os contratos vigentes, sem colisões nem alteração de identidades existentes.
- [x] SEAP-P03 — `done` — Montar a matriz edital → unidades reais → arquivos; desdobrar os blocos em tarefas C/H/Q por assunto e calcular a cobertura real.
- [ ] SEAP-P04 — `pending` — Criar o catálogo em `src/content/concursos/` com metadados válidos e dados oficiais do cargo correto.
- [ ] SEAP-P05 — `pending` — Criar a hierarquia consumidora e seus `grupo.json`, respeitando os blocos e as ordens do edital.

Publicar P04/P05 junto ao primeiro pacote completo de assuntos compatíveis. Não publicar concurso/grupos vazios, arquivos inválidos, `TODO`, placeholders ou material fictício para antecipar a estrutura.

### 7.2 Inventário e reaproveitamento

- [ ] SEAP-R01 — `pending` — Inventariar o acervo existente e resolver vínculos; ler conteúdo, cheat sheet, questões, resoluções e referências candidatos ao reaproveitamento.
- [ ] SEAP-R02 — `pending` — Classificar cada unidade como integral, parcial ou nova, com evidência das diferenças de conteúdo, corte e consumidores.
- [ ] SEAP-R03 — `pending` — Implantar reaproveitamentos integrais por vínculo canônico válido ou cópia local controlada, preservando proveniência e identidades.
- [ ] SEAP-R04 — `pending` — Preparar as cópias parciais nos novos destinos locais, documentando trechos aproveitados, cortes e complementos; publicar após completar o pacote editorial correspondente.
- [ ] SEAP-R05 — `pending` — Consolidar lacunas, unidades novas e dependências entre metas; registrar tarefas desdobradas ainda não executadas em `pending`.

### 7.3 Produção editorial por bloco

Entregáveis obrigatórios por unidade: C — conteúdo e referências; H — recuperação do estudado; Q — questões e resoluções pertinentes. São 36 macros nos 12 blocos seguintes, não 12 capítulos prontos. Cada macro C/H/Q só fica `done` quando todas as suas unidades estiverem publicadas e aceitas ou tiverem evidência de aderência integral na `main`, segundo o guia da seção 6.

P03 desdobrou os blocos em unidades estáveis: E01 U001–U019; E02 U020–U023; E03 U024–U030; E04 U031–U039; E05 U040–U046; E06 U047–U049; E07 U050–U056; E08 U057–U065; E09 U066–U075; E10 U076–U086; E11 U087–U092; E12 U093–U110, mais as remissões compartilhadas U082 (prisão temporária) e U056 (improbidade). Os 330 C/H/Q unitários permanecem `pending`; as macros são agregadoras e não duplicam a contagem.

#### Conhecimentos gerais — item 22.2.3

##### SEAP-E01 — Língua Portuguesa
- [ ] SEAP-E01-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências.
- [ ] SEAP-E01-H — `pending` — Produzir e salvar cheat sheets.
- [ ] SEAP-E01-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### SEAP-E02 — Raciocínio Lógico
- [ ] SEAP-E02-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências.
- [ ] SEAP-E02-H — `pending` — Produzir e salvar cheat sheets.
- [ ] SEAP-E02-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### SEAP-E03 — Noções de História do Maranhão
- [ ] SEAP-E03-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências.
- [ ] SEAP-E03-H — `pending` — Produzir e salvar cheat sheets.
- [ ] SEAP-E03-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### SEAP-E04 — Noções de Geografia do Maranhão
- [ ] SEAP-E04-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências.
- [ ] SEAP-E04-H — `pending` — Produzir e salvar cheat sheets.
- [ ] SEAP-E04-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### SEAP-E05 — Noções de Informática
- [ ] SEAP-E05-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências.
- [ ] SEAP-E05-H — `pending` — Produzir e salvar cheat sheets.
- [ ] SEAP-E05-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### SEAP-E06 — Atualidades — somente para a prova discursiva
- [ ] SEAP-E06-C — `pending` — Pesquisar e salvar conteúdo, referências e orientação de discursiva conforme o edital.
- [ ] SEAP-E06-H — `pending` — Produzir e salvar revisão de repertório e critérios de escrita.
- [ ] SEAP-E06-Q — `pending` — Salvar questões de fixação no schema existente e propostas comentadas de redação no material didático, sem apresentá-las como questões da objetiva do cargo.

#### Conhecimentos específicos — Cargo 1

##### SEAP-E07 — Direito Administrativo
- [ ] SEAP-E07-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências.
- [ ] SEAP-E07-H — `pending` — Produzir e salvar cheat sheets.
- [ ] SEAP-E07-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### SEAP-E08 — Direito Constitucional
- [ ] SEAP-E08-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências, incluindo o recorte da Constituição do Maranhão exigido no edital.
- [ ] SEAP-E08-H — `pending` — Produzir e salvar cheat sheets.
- [ ] SEAP-E08-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### SEAP-E09 — Direito Penal
- [ ] SEAP-E09-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências.
- [ ] SEAP-E09-H — `pending` — Produzir e salvar cheat sheets.
- [ ] SEAP-E09-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### SEAP-E10 — Direito Processual Penal
- [ ] SEAP-E10-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências, cobrindo também as diferenças em relação ao programa da PC-MA.
- [ ] SEAP-E10-H — `pending` — Produzir e salvar cheat sheets.
- [ ] SEAP-E10-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### SEAP-E11 — Direitos Humanos
- [ ] SEAP-E11-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências, incluindo os instrumentos penitenciários enumerados no edital.
- [ ] SEAP-E11-H — `pending` — Produzir e salvar cheat sheets.
- [ ] SEAP-E11-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### SEAP-E12 — Legislação Extravagante

Desdobrar todas as leis, portarias e resoluções enumeradas para o Inspetor, incluindo execução penal, políticas penitenciárias e legislação estadual. A lista de diplomas deve vir do edital consolidado, não apenas do roteiro incremental.

- [ ] SEAP-E12-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências de todas as normas do recorte, sem omissões nem duplicação artificial.
- [ ] SEAP-E12-H — `pending` — Produzir e salvar cheat sheets.
- [ ] SEAP-E12-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

### 7.4 Fechamento e aceite

- [ ] SEAP-F01 — `pending` — Conferir a matriz contra todos os itens/subitens do edital consolidado, eliminando lacunas, duplicações indevidas e material exclusivo do Monitor ou de outro cargo.
- [ ] SEAP-F02 — `pending` — Inspecionar manualmente schemas, frontmatter, Markdown, `abbr`, links, referências, questões, revisões, resoluções, identidades, rotas, vínculos e consumidores, sem executar testes/builds/checks.
- [ ] SEAP-F03 — `pending` — Reconsultar publicações oficiais e fontes materiais, distinguir alterações posteriores do corte aplicável e resolver ou explicitar divergências documentais.
- [ ] SEAP-F04 — `pending` — Confirmar na `main` os commits e todos os arquivos resolvidos, consolidando evidência por unidade e validade para os consumidores compartilhados.
- [ ] SEAP-F05 — `pending` — Recalcular tarefas, unidades reais, canônicas, locais e visões; fechar a meta somente com cobertura integral, todas as tarefas `done` e nenhuma reserva ativa.

## 8. Evidência, manutenção e encerramento

A preparação inicial foi publicada no commit `61e13695b588615dc694726505c43929932992a8`, com blob `845f7a8359b9757e8edf21e77ea49fa6d250af52`: arquivo-mestre, planejamento preservado e guia obrigatório. Nenhum pacote editorial, catálogo, grupo, vínculo, schema, gerado, arquivo da #764/#766 ou registro da #755 foi alterado por essa preparação.

### SEAP-P01 — consolidação concluída em 25/09/2026

Base confirmada: `main` `61e13695b588615dc694726505c43929932992a8`, mestre `845f7a8359b9757e8edf21e77ea49fa6d250af52`, `AGENTS.md` `1735e5035e3824be202be5c014f18d6445e235bb`. Coordenação consultada: #764 encerrada e sem reserva; #766 sem reserva ativa indicada. Escopo desta publicação: somente este mestre e o painel da #765; origem documental Cebraspe, consumidor exclusivo Cargo 1 — Inspetor. Nenhuma origem editorial local/canônica ou entrega C/H/Q foi alterada ou aceita.

**Entregue:** transcrição do programa completo do Inspetor presente no PDF de abertura acessado; objetiva/discursiva e critérios de classificação; fórmula da discursiva; cronograma provável; distinção de cortes; registro das inconsistências, repetições e fronteiras; fontes com páginas. O ganho é retirar a dependência de um programa ainda não materializado e evitar importação das regras da PC-MA ou do Monitor. O crescimento é documental, pela transcrição solicitada; não é ampliação de aulas, cheat sheets ou bancos. Não foram acrescentadas marcações de microglossário à transcrição literal.

**Fechamento de P01:** a consulta de 25/09 localizou a publicação do Edital nº 1 na edição nº 130 do Diário Oficial do Maranhão, em 21/07/2026, e o Edital nº 2 – SEAP/MA – Inspetor e Monitor, de 24/09/2026. A retificação identificada altera datas do cronograma: pagamento até 29/09/2026, relação provisória PcD em 14/10/2026 e relação final PcD/consulta final do atendimento especializado em 30/10/2026. Não foi localizada alteração do programa do Inspetor, da estrutura objetiva/discursiva ou da data de prova nos elementos indexados. O acesso direto à listagem Cebraspe permaneceu limitado por JavaScript; essa limitação é registrada, mas não impede a consolidação documental porque o ato e a publicação foram identificados por fontes verificáveis e o conteúdo-base continua sustentado pelo PDF oficial do Cebraspe.

SEAP-P01 permanece `done`. Publicação confirmada na `main`: commit `e35a06f0f2bad3cd73a1dc32884a31f6378e70f8`, blob do mestre `7b45c93d9b513fdf806927cb2a4a4c39a6d91c89`, relidos antes da execução de P02. Isso não congela o concurso: SEAP-F03 continua responsável por reconsultar publicações posteriores e fontes materiais antes do fechamento, inclusive eventual alteração entre 25/09 e a prova.


### SEAP-P02 — identidade e caminhos concluídos em 25/09/2026

Base pré-escrita confirmada: `main` `e35a06f0f2bad3cd73a1dc32884a31f6378e70f8`, mestre `7b45c93d9b513fdf806927cb2a4a4c39a6d91c89`; reserva `SEAP-P02-20260925-IDENTIDADE-01` confirmada por releitura da #765. Contratos relidos: `AGENTS.md`, `content-schema.ts`, `content.config.ts`, `content-paths.ts`, `catalog-core.ts`, `catalog.ts` e ADRs pertinentes. Catálogos atuais relidos integralmente: exemplo, TCE/MA Analista, TCE/MA Técnico e PC-MA Oficial Investigador.

**Decisão:** título `SEAP/MA 2026 - Inspetor de Polícia Penal`; slug `seap-ma-2026-inspetor-policia-penal`; `storageId` `seapma-2026-inspetor`; ordem `5`; futuro catálogo e raiz consumidora conforme a tabela da seção 3. A decisão preserva as identidades existentes e não conflita com a #766, que ainda não possui identidade publicada. O programa do Monitor continua excluído.

**Escopo material:** somente este arquivo-mestre e o painel da #765. Não foram criados catálogo, `grupo.json`, pastas vazias, vínculos, C/H/Q, gerados ou arquivos das #764/#766/#755. A definição de caminhos não conta unidade real nem visão antes de P03/P04/P05. SEAP-P02 passa a `done`. Publicação material confirmada na `main`: commit `4d2fc407159e00ddd46dfb5c909ce23b4d9e8f7a`, blob `b8bd355db99cb45c5490ef9f894d7873935ed78b`; comparação com `e35a06f0f2bad3cd73a1dc32884a31f6378e70f8`: somente o mestre alterado, 36 linhas acrescentadas e 5 retiradas.


### SEAP-P03 — matriz e desdobramento materializados em 25/09/2026

Base pré-escrita confirmada: `main` `41505f5bd3ce970ccf4f32c5e0caa037a5f06b24`, mestre `9705efad94d755e266583f182591a3282f77b57b`; reserva `SEAP-P03-20260925-MATRIZ-01` confirmada por releitura da #765. Foram relidos `AGENTS.md`, o mestre da #764 como acervo comparativo e a árvore publicada da PC-MA. P03 usou o programa integral já consolidado em P01; não reabriu #764/#755 nem executou #766.

**Resultado planejado:** 110 unidades `SEAP-U001`–`SEAP-U110`, ordens 1–110, slugs finais distintos, `storageId` `seap-u001`–`seap-u110`, destinos sob a raiz definida em P02 e 330 C/H/Q `pending`. A matriz cobre todas as ocorrências programáticas do Inspetor, preserva a repetição literal da Lei de Tortura sem criar duas unidades e reconcilia duas aparições interblocos sem duplicação: prisão temporária → U082; improbidade → U056.

**Limite deliberado:** P03 não atribui origem nem classificação. Menções a PC/biblioteca são candidatos de busca, não doadores confirmados. R01 precisa ler e resolver origem/SHA/consumidores; R02 decide integral/parcial/nova e pode registrar lacunas. Nenhum catálogo, grupo, vínculo ou pacote C/H/Q foi publicado nesta etapa; P04/P05 continuam condicionadas ao primeiro assunto completo.

**Evidência confirmada:** matriz publicada e relida na `main` no commit `7f29e0ff428321e1cb7f220adce5d88752b20e8d`, blob `8a01134e311b2d7a78c22d8b23ea952318249f59`; comparação com `41505f5bd3ce970ccf4f32c5e0caa037a5f06b24`: somente o mestre alterado, 206 linhas acrescentadas e 2 retiradas. Foram reconferidos os registros de SEAP-U110, os totais e as remissões da Legislação Extravagante para U082 e U056 antes deste aceite.


### SEAP-R01 — inventário materializado em 25/09/2026

Base pré-escrita: `main` `cb227a068654412637b78e56bb546763452e8d62`, mestre `a1f498807eb88b46e68f768a86452389c26c82a2`, reserva `SEAP-R01-20260925-INVENTARIO-01`. A árvore recursiva completa, a #764 e a #766 foram relidas; #764 está encerrada sem reserva, #766 não possui reserva ativa nem material publicado desta campanha.

**Inventário:** 92/110 unidades com pelo menos um pacote candidato; 18 sem pacote-doador direto; 114 pacotes candidatos completos, 456 artefatos-base, nenhum arquivo de resolução nesses pacotes, 36 raízes canônicas e 84 visões consumidoras. Os vínculos relevantes foram lidos e confirmados por conteúdo, não inferidos por slug. Os candidatos com trilha PC permaneceram imutáveis após `de6662a`; os demais foram lidos diretamente nesta R01. Nenhum candidato foi aceito ou classificado por esse fato.

**Sem alteração editorial:** R01 só publica inventário/evidência neste mestre. Não cria vínculo SEAP, não copia pacote, não cria catálogo/grupo e não altera C/H/Q. R02 permanece responsável pela classificação e pelas lacunas. A evidência do commit desta materialização será registrada após a releitura na `main`.

A cada ciclo, substitua o registro da unidade/tarefa própria pela evidência corrente, conservando decisões e evidências únicas. Não acumule resumos idênticos, reservas encerradas ou novas cópias de totais. Documente limites reais de leitura e de acesso sem transformar identificação de fonte em aceite do material.

Feche #765 somente quando o edital consolidado estiver integralmente coberto, a qualidade dos pacotes estiver inspecionada, todas as tarefas estiverem `done`, não houver `analyzing` ou reserva ativa e a evidência estiver confirmada na `main`. Consolide aqui rotas, cobertura, origens, consumidores e duplicações; a issue recebe apenas o resumo.

Envie e-mail ao próprio usuário com a entrega e os commits confirmados; confirme o envio ou informe a falha sem desfazer publicação. A resposta do ciclo deve ser breve: tarefa/unidade/C/H/Q; origem/consumidores; arquivos/commit/evidência; melhorias/cortes/microglossário/crescimento; fontes/corte; problemas/totais; intervenção necessária/próxima etapa.
