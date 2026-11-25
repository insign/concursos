# Roadmap — áudios dos assuntos para o site

Documento de execução da campanha de mídia por assunto (ADR-009, ADR-010, ADR-011).
Sem Telegram: a entrega é o player do próprio site, servido por `/media/<sha256>.<ext>`.

## Objetivo

Gerar e publicar os **373 áudios faltantes** como `midia/<slug>.mp3` na origem
resolvida de cada assunto, com `midia/catalogo.json` versionado, binário no R2
(`concursos-midia`) e entrega verificada por HTTP `206`.

Critérios de conclusão:

1. `373` pastas de assunto com `midia/catalogo.json` de um item e o MP3 ao lado.
2. `npm run midia:publicar -- --dry-run` sem envios pendentes e sem catálogo órfão.
3. `npm run check`, `npm run build` e `npm run build:budget` verdes.
4. `/media/<sha256>.mp3` respondendo `206` com `content-range` em amostra por concurso.
5. Nenhum dos 153 áudios existentes regerado; nenhum arquivo editorial alterado.

## Estado verificado (2026-11-17)

- 526 assuntos resolvidos nos 5 concursos; **153 já têm áudio** (TCE/MA Analista completo:
  42 físicos + 111 canônicos da biblioteca).
- **373 faltantes**, todos físicos e sem compartilhamento entre concursos.
- Nenhum assunto canônico sem mídia: toda lacuna é assunto físico do próprio concurso.
- Perfil do site: MP3 `libmp3lame` 64 kb/s ABR, mono, 44,1 kHz, ID3v2.3
  (`docs/midia.md`). O default de 32 kb/s do skill `audios-lm` vale só para o Telegram.

| Concurso | Prova | Faltam |
| --- | --- | --- |
| TCE/MA 2026 — Técnico-Administrativa | 29/11/2026 | 42 |
| PC/MA 2026 — Oficial Investigador | 06/12/2026 | 141 |
| SEAP/MA 2026 — Inspetor de Polícia Penal | 13/12/2026 | 98 |
| Perícia/MA 2026 — Agente Criminal Generalista | 10/01/2027 | 92 |

## Status da execucao (2026-11-25 15:10 BRT)

- **Campanha concluida: 373/373 audios publicados e commitados.**
- Por concurso: TCE/MA Tecnico 42/42; PC/MA Oficial Investigador 141/141;
  SEAP/MA Inspetor 98/98; Pericia/MA Agente Criminal 92/92.
- **Ultimo commit:** `46946452`, com os catalogos de G11-06 e G12-01 da
  Pericia/MA. Arvore limpa e sincronizada com `origin/main`.
- **Validacao final:** 373 MP3 locais aprovados por `ffprobe` (MP3, mono,
  44,1 kHz, duracao positiva); 373/373 URLs responderam HTTP `206` em
  verificacao sequencial; `midia:publicar -- --dry-run` com 0 catalogos
  orfaos; `npm run check`, `npm run build` e `npm run build:budget` verdes.
- **Integridade:** nenhum dos 153 audios preexistentes foi regerado e nenhum
  arquivo editorial foi alterado. Os IDs preservados foram reconciliados sem
  reenvio; timeout, ambiguidade e recusa de cota nunca autorizaram repeticao.
- **Persistencia pos-reboot:** scripts e filas vivem em
  `~/.local/share/filas-audio/`; `/tmp/opencode` permanece apenas como area
  efemera de trabalho.
- **Proximo passo:** nenhum. A campanha foi encerrada apos a confirmacao dos
  373 catalogos, MP3 e URLs.

## Regras de operação

- **Uma geração por assunto**; nunca regenerar após timeout, falha de conexão ou
  download ambiguo. Somente um artefato explicitamente `failed` permite uma
  unica reconciliacao com novo envio, com o ID falho preservado no historico.
- **No máximo 2 gerações pendentes** no NotebookLM; reconciliar a cada 30–60 s;
  teto de 20 min por áudio (timeout não libera vaga nem autoriza nova geração).
- **Cota esgotada** (`RESOURCE_EXHAUSTED` / RPC 8): parar a fila inteira, preservar
  artefatos prontos e retomar no próximo dia reconciliando o Studio. Não trocar conta,
  formato ou autenticação.
- **Perfil ocupado** (`exit 75` do `flock`): não abrir segundo runtime; esperar e
  retomar. Container de autenticação usa nome próprio (`notebooklm-mercury-auth`).
- **Um único runtime**: o perfil Chrome é exclusivo. `opencode run`/helpers também
  sobem o MCP e podem tomar o lock.
- **Commit**: só `midia/catalogo.json` e este documento. MP3 nunca entra no Git.

## Fases

| Fase | Janela | Conteúdo | Fecha antes de |
| --- | --- | --- | --- |
| P0 | 17–18/11 | Normalizar índice do Git, piloto de 1 áudio ponta a ponta | — |
| P1 | 18–24/11 | TCE/MA Técnico — 42 | 29/11/2026 |
| P2 | 24/11–03/12 | PC/MA — 141 | 06/12/2026 |
| P3 | 03–10/12 | SEAP/MA — 98 | 13/12/2026 |
| P4 | 10/12–05/01 | Perícia/MA — 92 | 10/01/2027 |
| P5 | 05–08/01 | Fechamento: build, dry-run zero, gate 206 por concurso | — |

A ordem segue a data da prova. A fase seguinte pode começar enquanto a anterior
termina, mas nunca antes de a anterior estar publicada e commitada.

## Cadência

- Ritmo-alvo **16 áudios/dia** (piso 12, teto 24), em ondas de 2 gerações.
- Pico necessário: ~17/dia até 13/12 para cobrir Técnico + PC + SEAP.
- Cada onda: submeter 2 (atual + sucessor), acompanhar, baixar/Converter/Publicar os
  prontos, então liberar as vagas.
- Fim de cada dia: publicar o lote, validar e commitar os catálogos.
- Se dois dias seguidos ficarem abaixo de 12, avisar o usuário com a projeção contra
  a próxima prova antes de continuar.

## Pipeline por áudio

1. **Reconciliar**: `notebooklm_content_list` no notebook do concurso; se já houver
   `audio_overview` `ready` para o foco, pular a geração e ir ao download.
2. **Selecionar fonte**: `notebooklm_source_list` e escolher exatamente a fonte
   `G<grupo>-<ordem> - <assunto>` correspondente à linha da fila.
3. **Gerar**: `notebooklm_content_generate` com `content_type: "audio_overview"`,
   `language: "pt_BR"`, `source_ids` da disciplina, `audio_length: "long"`,
   `audio_format: "deep_dive"` e o prompt didático do skill `audios-lm`.
   Registrar o `content_id` na linha antes de submeter o próximo.
4. **Confirmar**: artefato `ready` com ID ausente do inventário anterior e foco
   compatível; nunca associar por ordem de conclusão.
5. **Baixar**: `notebooklm_content_download` com `content_id` em
   `/data/audio-<content_id>.media` e `docker cp` para `/tmp/opencode/<job>/`.
6. **Converter**:

   ```sh
   ffmpeg -hide_banner -loglevel error -nostdin -n -i "$origem" -map 0:a:0 -vn \
     -ac 1 -ar 44100 -c:a libmp3lame -b:a 64k -abr 1 -id3v2_version 3 \
     -metadata title="G<código> — <assunto>" -metadata artist="<disciplina>" \
     -metadata album="<concurso> — <cargo>" "<assunto>/midia/<slug>.mp3"
   ```

7. **Colocar** na `midia/` da origem resolvida (nesta campanha: sempre física).
8. **Publicar**: `npm run midia:publicar -- --dry-run` e depois
   `npm run midia:publicar` (envia `media/<sha256>.mp3` e reescreve o catálogo).
9. **Validar** (seção abaixo) e **commitar** apenas catálogos + este documento.
10. **Marcar** a linha como `publicado`, com `sha256` e data.

## Validação

```sh
ffprobe -v error -show_entries stream=codec_name,channels,sample_rate \
  -show_entries format=duration,size -of default=nw=1 "<arquivo>.mp3"
# esperado: codec_name=mp3, channels=1, sample_rate=44100, duração > 0

ffmpeg -v error -nostdin -i "<arquivo>.mp3" -f null -   # decodifica sem erro

npm run midia:publicar -- --dry-run   # 0 catálogo(s) a remover
npm run midia:publicar                # X enviado(s), Y reaproveitado(s)
npm run check && npm run build && npm run build:budget

curl -sS -D - -o /dev/null -H 'Accept-Encoding: identity' -H 'Range: bytes=0-1' \
  https://concursos.helio.me/media/<sha256>.mp3
# esperado: HTTP/2 206, content-range: bytes 0-1/<total>, content-length: 2
```

Commit: `git status --short` só pode mostrar `catalogo.json` novos/alterados e este
documento; nenhum `.mp3`.

## Rastreamento e retomada

A tabela da fila abaixo é o cursor. Uma sessão nova:

1. lê este documento e recalcula o pendente pelo sistema de arquivos
   (`[ -f <path>/midia/catalogo.json ]`);
2. reconcilia o Studio do notebook do concurso corrente;
3. baixa/converte qualquer `content_id` já registrado antes de gerar novo;
4. segue a primeira linha `pendente` na ordem das fases;
5. só marca `publicado` depois do commit com o `catalogo.json` na `main`.

## Riscos

1. **Índice do Git corrompido** (186 deleções + 110 modificações staged): qualquer
   commit em massa apagaria a feature de mídia. Mitigação: normalizar o índice antes
   do P0 e estagiar caminhos explícitos sempre.
2. **Cota do NotebookLM**: pausa a fila e pode atrasar a prova do Técnico (29/11).
   Mitigação: P1 primeiro, teto de 2 pendentes, pausa disciplinada.
3. **Perfil exclusivo / exit 75**: qualquer `opencode run` pode tomar o lock.
   Mitigação: um runtime, espera e retomada, nunca segundo Chrome.
4. **Assunto sem fonte no notebook**: resolvido em 18/11 — as fontes `G12 - Preparação
   discursiva` e `G12-01 - Redação` foram enviadas ao notebook da Perícia, e o
   `build-queue.py` passou a ler blocos na raiz (Perícia = 92 itens).
5. **Catálogo órfão**: publicador recusa sem `--force`. Mitigação: manter o binário até
   publicar; nunca usar `--force` às cegas.
6. **Perfil de áudio divergente**: o default do skill é Telegram (32 kb/s). Mitigação:
   fixar 64 kb/s/44,1 kHz e conferir por `ffprobe` em todo item.

## Decisões pendentes

1. Normalizar o índice do Git (`git restore --staged .`) antes de qualquer commit.
2. Cadência de push: por fase (recomendado, falha cedo no gate 206) ou só no fim.
3. `artist` da tag ID3: usar o título da disciplina (como em `docs/midia.md`) ou o slug
   sem acento usado nos 153 áudios existentes.

## Supervisao automatica

- **Execucao:** `/tmp/opencode/supervisor3.sh` (destacado com `setsid`) encadeia os
  concursos, prepara `sources.json` e a fila, roda `run-fila2.sh`, commita/pusha os
  catalogos e avisa por `hey` no fim. A versao corrigida nao avanca de concurso
  enquanto a fila corrente estiver pendente. Backoff: cota 6h, lock 30min e erro
  generico 10min.
- **Runner:** `/tmp/opencode/run-fila2.sh` retoma por `content_id` salvo antes de
  qualquer nova submissao, consulta o status exato do artefato, baixa com no
  maximo 20 reconciliacoes espacadas por 60 s, codifica em temporario fora da
  `midia/`, valida decodificacao, publica a cada 5 itens e tambem publica o lote
  pendente antes de pausar com `exit 9` em `QUOTA_EXHAUSTED`. Para item
  `scheduled`, tenta a coleta uma vez e segue se o Google ainda nao o concluiu.
  `failed` e terminal: o ID falho e arquivado e a fila para sem reenvio automatico
  indefinido; uma segunda falha terminal exige reconciliacao manual.
- **Persistencia da imagem:** imagem ativa validada em
  `notebooklm-mcp:3.2.0-mercury` (`6c54ab15bbd6`), com copia compactada em
  `~/.local/share/notebooklm-mcp/images/notebooklm-mcp-3.2.0-mercury-6c54ab15bbd6.tar.gz`
  e checksum proprio. A suite offline passou 49/49 testes. O container parado
  `notebooklm-mercury-image-anchor` mantem a referencia; `ensure-mcp-image.js`
  recarrega o tarball automaticamente se uma limpeza do daemon remover as tags.
- **Supervisao com julgamento:** exatamente um subagente nativo do OpenCode
  (`general`) por batida, visivel na interface, dorme ate 40 minutos e devolve um
  retrato factual (PIDs, ultima linha do log e minutos decorridos, item atual,
  contagens, commit, erros e sinal `STALL` acima de 35 min). A batida deve usar
  caminhos absolutos e executar o `sleep` de forma sincrona, com timeout maior
  que 2400 s; nao substitua o subagente por shell/`nohup` e nao aceite contagem
  feita antes do fim do sleep. O orquestrador julga e reenvia na mesma sessao.
  Vale apenas com a sessao aberta; o bash sobrevive ao fim da conversa, nao a
  reboot.
- **Retomada sem conversa:** conferir `pgrep -af "run-fila2.sh|supervisor3.sh"`,
  `tail ~/.local/share/filas-audio/<concurso>/run.log` e reiniciar o que faltar.
  Desde 24/11 o estado persistente mora em `~/.local/share/filas-audio/`
  (ver `README.md` lá): `/tmp` é `tmpfs` e o reboot de 24/11 às 00:54:48 UTC
  apagou scripts, fila, IDs e logs. A retomada pós-reboot reconstruiu a fila
  do SEAP/MA a partir da tabela abaixo + H1 dos `conteudo.md` (91/98,
  pendentes G10-10, G10-11, G11-01..G11-05); o volume Docker
  `notebooklm-mercury-data` preservou auth de 23/11 e `audio-*.media`.
- **Perfil exclusivo:** o MCP `notebooklm` do OpenCode fica **desligado** durante a
  campanha (`disabled: true` em `opencode.json`), porque ele segura o perfil do Chrome
  mesmo ocioso e bloqueia os drivers. Para usar as ferramentas do MCP, reative e rode
  `opencode reload`; a campanha nao depende dele.
- **Cadencia da batida:** uma unica batida pendente por vez, com intervalo maximo
  de 40 min; durante pausa por cota, pode permanecer no limite maximo.

## Submissao sem espera e agendamento

- **`submit_only` (na imagem do MCP):** `content_generate` com `submit_only: true`
  cria o audio e devolve o `contentId` na hora, sem polling e sem repetir o
  CREATE_STUDIO. E o motor da janela imediata de dois pedidos.
- **Agendamento:** o MCP ativo aceita `schedule: true` para audio e devolve o
  `contentId` com status `scheduled`, sem repetir o CREATE_STUDIO. A campanha
  tambem usa `notebooklm-py==0.8.6` (`generate audio --later`) para lotes
  diferidos, mantendo o orcamento do Google (6 agendamentos por conta). Guias:
  `audios-lm/references/agendamento.md` e `downloadfix/README.md`.
- **Achado de 19/11:** lote de 6 agendados nao executou em duas janelas; lotes
  anteriores rodaram 10-30 min apos a janela. Agendado e reserva: nao ocupa vaga
  imediata, e pulado ate o Google executar e e baixado em passagem posterior pelo
  ID. Nunca reenviar.
- **Estado:** os lotes `G12-13..G12-18`, `G12-07..G12-12` e `G12-01..G12-06`
  do SEAP/MA foram executados, publicados e verificados com HTTP `206`.
  `G05-01`, `G05-03..G05-05`, `G07-01..G07-02` e `G09-01..G09-05` tambem foram
  publicados e verificados. Os IDs diferidos `G05-02`, `G05-06` e
  `G07-03..G07-06` foram colhidos e publicados no commit `06f74518`, sem novo
  envio. Restam somente os IDs imediatos `G09-06` e `G09-07`; a ultima medicao
  do orcamento diferido, as 18:54 UTC, indicava 6 vagas.

## Fila

Ordem de execução: Técnico → PC/MA → SEAP/MA → Perícia/MA. Dentro de cada concurso,
disciplinas na ordem do edital e assuntos pela ordem do catálogo.

### TCE/MA 2026 — Técnico-Administrativa

Prova em **29/11/2026** · notebook `a4dcde31-1fc3-49f7-964b-01adc2ccf1a8` · **42 áudios**

| Código | Assunto | Origem | Status |
| --- | --- | --- | --- |
| G08-01 | Organização administrativa | física | publicado (33d35f05…, 206 ok) |
| G08-02 | Ato administrativo | física | publicado (7b370772…, 206 ok, 19min42) |
| G08-03 | Agentes públicos | física | publicado (13min23) |
| G08-04 | Poderes administrativos | física | pendente |
| G08-05 | Licitações: Lei nº 14.133/2021 e sistema de registro de preços | física | pendente |
| G08-06 | Controle da Administração Pública | física | pendente |
| G08-07 | Responsabilidade civil do Estado | física | pendente |
| G08-08 | Contratos administrativos, consórcios públicos e convênios | física | pendente |
| G08-09 | Desapropriação | física | pendente |
| G08-10 | Súmulas e jurisprudência vinculante do STF e do STJ | física | pendente |
| G08-11 | Acesso à informação: LAI e LGPD | física | pendente |
| G09-01 | Constituição Federal de 1988 e princípios fundamentais | física | pendente |
| G09-02 | Aplicabilidade das normas constitucionais: eficácia plena, contida e limitada; normas programáticas | física | pendente |
| G09-03 | Direitos e garantias fundamentais: individuais e coletivos, sociais, nacionalidade, direitos políticos e partidos políticos | física | pendente |
| G09-04 | Organização político-administrativa do Estado: federação, União, estados, Distrito Federal, municípios e territórios | física | pendente |
| G09-05 | Administração pública na Constituição: disposições gerais e servidores públicos | física | pendente |
| G09-06 | Poder Executivo: atribuições e responsabilidades do presidente da República | física | pendente |
| G09-07 | Poder Legislativo: estrutura, funcionamento, atribuições, processo legislativo, fiscalização contábil, financeira e orçamentária e CPIs | física | pendente |
| G09-08 | Poder Judiciário: disposições gerais, órgãos, organização, competências e CNJ | física | pendente |
| G09-09 | Funções essenciais à justiça: Ministério Público, Advocacia Pública e Defensoria Pública | física | pendente |
| G09-10 | Constituição do Estado do Maranhão | física | pendente |
| G11-01 | Constituição Federal de 1988: conceito, classificações, princípios fundamentais e emendas constitucionais | física | pendente |
| G11-02 | Direitos e garantias fundamentais: direitos individuais e coletivos, sociais, nacionalidade, cidadania, direitos políticos e partidos políticos | física | pendente |
| G11-03 | Organização político-administrativa: União, estados, Distrito Federal e municípios | física | pendente |
| G11-04 | Administração pública: disposições gerais e servidores públicos | física | pendente |
| G11-05 | Poder Legislativo: Congresso Nacional, Câmara dos Deputados, Senado Federal, deputados e senadores | física | pendente |
| G11-06 | Poder Executivo: atribuições do presidente da República e dos ministros de Estado | física | pendente |
| G11-07 | Poder Judiciário e CNJ: disposições gerais, órgãos e competências | física | pendente |
| G11-08 | Funções essenciais à Justiça: Ministério Público, advocacia pública e defensoria pública | física | pendente |
| G11-09 | Constituição Federal: arts. 23, 170, 225 e 231 | física | pendente |
| G12-01 | Organização administrativa | física | pendente |
| G12-02 | Ato administrativo | física | pendente |
| G12-03 | Agentes públicos | física | pendente |
| G12-04 | Poderes administrativos | física | pendente |
| G12-05 | Licitação: princípios, contratação direta, modalidades, tipos e procedimento | física | pendente |
| G12-06 | Controle da Administração Pública | física | pendente |
| G12-07 | Responsabilidade civil do Estado | física | pendente |
| G13-01 | Programação, execução e controle de recursos orçamentários e financeiros | física | pendente |
| G13-02 | Retenção e recolhimento de tributos incidentes sobre bens e serviços | física | pendente |
| G13-03 | Noções de SIAFI e CPR — contas a pagar e a receber | física | pendente |
| G13-04 | MCASP — 11ª edição | física | pendente |
| G13-05 | Lei de Responsabilidade Fiscal — LC nº 101/2000 e alterações | física | pendente |

### PC/MA 2026 — Oficial Investigador

Prova em **06/12/2026** · notebook `d5775379-3dde-4214-be41-9001c97b70ba` · **141 áudios**

| Código | Assunto | Origem | Status |
| --- | --- | --- | --- |
| G01-01 | leitura-interpretacao-tipos-generos | física | pendente |
| G01-02 | tipos-generos-textuais | física | pendente |
| G01-03 | ortografia-oficial | física | pendente |
| G01-04 | coesao-textual | física | pendente |
| G01-05 | Emprego de tempos e modos verbais | física | pendente |
| G01-06 | classes-nominais-de-palavras | física | pendente |
| G01-07 | Verbo como classe de palavras | física | pendente |
| G01-08 | Classes invariáveis de palavras | física | pendente |
| G01-09 | Estrutura morfossintática do período | física | pendente |
| G01-10 | Coordenação entre orações e termos da oração | física | pendente |
| G01-11 | Subordinação entre orações e termos da oração | física | pendente |
| G01-12 | Pontuação | física | pendente |
| G01-13 | Concordância verbal e nominal | física | pendente |
| G01-14 | Regência verbal e nominal | física | pendente |
| G01-15 | Crase | física | pendente |
| G01-16 | Colocação pronominal | física | pendente |
| G01-17 | Significação e substituição lexical | física | pendente |
| G01-18 | Reorganização da estrutura de orações e períodos | física | pendente |
| G01-19 | Reescrita de textos de diferentes gêneros e níveis de formalidade | física | pendente |
| G01-20 | Redação oficial: linguagem | física | pendente |
| G01-21 | Expedientes oficiais: finalidades e formatos | física | pendente |
| G02-01 | Internet, intranet, navegação, busca e redes sociais | física | pendente |
| G02-02 | Windows e Linux: arquivos, pastas, atalhos e área de trabalho | física | pendente |
| G02-03 | Editores de textos, planilhas e apresentações | física | pendente |
| G02-04 | Correio eletrônico: envio, acesso e anexos | física | pendente |
| G02-05 | Redes de computadores, IPv4, IPv6 e Wi‑Fi | física | pendente |
| G02-06 | Computação em nuvem, armazenamento e colaboração | física | pendente |
| G02-07 | Segurança da informação: confidencialidade, integridade e disponibilidade | física | pendente |
| G02-08 | Criptografia e certificação digital | física | pendente |
| G02-09 | Evidência digital e cadeia de custódia de provas eletrônicas | física | pendente |
| G02-10 | LGPD: noções gerais | física | pendente |
| G02-11 | Inteligência artificial e aprendizado de máquina | física | pendente |
| G02-12 | Criptomoedas: noções gerais | física | pendente |
| G03-01 | Problemas aritméticos, geométricos e matriciais | física | pendente |
| G04-01 | Fundamentos de contabilidade e patrimônio | física | pendente |
| G04-02 | Atos e fatos administrativos | física | pendente |
| G04-03 | Contas: débitos, créditos e saldos | física | pendente |
| G04-04 | Plano de contas: elenco, função e funcionamento | física | pendente |
| G04-05 | Escrituração: lançamentos, livros e regimes | física | pendente |
| G04-06 | Contabilização de operações diversas | física | pendente |
| G04-07 | Balancete, demonstrações e normas contábeis | física | pendente |
| G05-01 | Estatística descritiva e análise exploratória de dados | física | pendente |
| G05-02 | Probabilidade: axiomas, condicionamento e independência | física | pendente |
| G05-03 | Variáveis aleatórias, distribuições, momentos e transformações | física | pendente |
| G05-04 | Leis dos grandes números, teorema central do limite e distribuições amostrais | física | pendente |
| G05-05 | Inferência estatística: estimação e testes | física | pendente |
| G05-06 | Regressão linear e técnicas de amostragem | física | pendente |
| G06-01 | Administração gerencial e comportamento organizacional | física | pendente |
| G06-02 | Princípios e sistemas da administração federal | física | pendente |
| G06-03 | Orçamento público, princípios e diretrizes orçamentárias | física | pendente |
| G06-04 | SIDOR e SIAFI: não confunda preparar o orçamento com executar o orçamento | física | pendente |
| G06-05 | Receita pública: quatro perguntas que a prova mistura | física | pendente |
| G06-06 | Despesa pública: siga o dinheiro e o estado da obrigação | física | pendente |
| G07-01 | França Equinocial, São Luís, Guaxenduba e capitães-mores do Maranhão | física | pendente |
| G07-02 | Fatos políticos, econômicos e sociais do Maranhão na segunda metade do século XX | física | pendente |
| G08-01 | Geomorfologia e classificação do relevo maranhense | física | pendente |
| G08-02 | População, povoamento e movimentos populacionais | física | pendente |
| G08-03 | Agricultura, pecuária e extrativismo no Maranhão | física | pendente |
| G08-04 | Produzir não é o mesmo que circular | física | pendente |
| G08-05 | Infraestrutura e cultura: primeiro identifique o tipo de referência | física | pendente |
| G09-01 | Atualidades na discursiva: do fato ao argumento | física | pendente |
| G09-02 | Atualidades econômicas e tecnológicas: enxergue o sistema, não a manchete | física | pendente |
| G09-03 | Do problema global ao resultado local | física | pendente |
| G10-01 | Aplicação da lei penal: quatro perguntas antes de discutir o crime | física | pendente |
| G10-02 | Teoria geral do crime: um mapa antes dos detalhes | física | pendente |
| G10-03 | Fato típico: do comportamento ao número de crimes | física | pendente |
| G10-04 | Depois do fato típico: quatro perguntas diferentes | física | pendente |
| G10-05 | Imputabilidade e concurso de pessoas: duas perguntas antes da responsabilidade final | física | pendente |
| G10-06 | Crimes contra a pessoa: leia pelo bem jurídico antes de decorar artigos | física | pendente |
| G10-07 | Crimes contra o patrimônio: identifique primeiro como o bem sai da esfera da vítima | física | pendente |
| G10-08 | Crimes contra a dignidade sexual: identifique primeiro por que a liberdade sexual foi atingida | física | pendente |
| G10-09 | Três títulos, três perguntas diferentes | física | pendente |
| G10-10 | Crimes contra a administração pública: comece pelo vínculo com a função | física | pendente |
| G11-01 | Princípios e sistemas: quem acusa, quem defende e quem julga? | física | pendente |
| G11-02 | Inquérito policial: apurar antes de acusar não é julgar | física | pendente |
| G11-03 | Prova no processo penal: obter, preservar, confrontar | física | pendente |
| G11-04 | Prisão em flagrante: captura agora, controle judicial logo depois | física | pendente |
| G11-05 | Prisão preventiva: não basta suspeita, é preciso necessidade cautelar concreta | física | pendente |
| G11-06 | Prisão temporária: prender por prazo certo para proteger uma investigação necessária | física | pendente |
| G11-07 | Outras medidas cautelares: controlar o risco sem prender quando isso basta | física | pendente |
| G12-01 | Estado, Governo e Administração pública: quem existe, quem decide e quem executa | física | pendente |
| G12-02 | Organização administrativa da União: dentro da pessoa política ou em outra pessoa jurídica? | física | pendente |
| G12-03 | Lei 8.112/1990: o ciclo funcional do servidor federal | física | pendente |
| G12-04 | Licitações: modalidades, dispensa e inexigibilidade | física | pendente |
| G12-05 | Atos administrativos: da formação ao desfazimento | física | pendente |
| G12-06 | Lei 4.878/1965: leia o estatuto em camadas, não como se 1965 ainda fosse hoje | física | pendente |
| G12-07 | Improbidade administrativa: ilegalidade não basta | física | pendente |
| G12-08 | Poderes administrativos: quatro instrumentos, um mesmo limite | física | pendente |
| G12-09 | Controle da Administração pública: quem controla, por qual parâmetro e com qual efeito | física | pendente |
| G12-10 | Responsabilidade civil do Estado: objetiva não significa automática | física | pendente |
| G12-11 | Estatuto da Polícia Civil do Maranhão: leia a lei junto com suas alterações | física | pendente |
| G12-12 | Regime jurídico dos servidores civis do Maranhão: a lei geral e seus limites atuais | física | pendente |
| G12-13 | Organização administrativa da Polícia Civil do Maranhão: aprenda a ler a estrutura antes de decorar nomes | física | pendente |
| G12-14 | Lei Orgânica Nacional das Polícias Civis: a norma geral que organiza o sistema | física | pendente |
| G13-01 | Estado e Constituição: primeiro entenda a relação, depois classifique | física | pendente |
| G13-02 | Preâmbulo e princípios fundamentais: o mapa de identidade da Constituição de 1988 | física | pendente |
| G13-03 | Direitos e garantias fundamentais e remédios constitucionais | física | pendente |
| G13-04 | Organização político-administrativa do Estado: quem é autônomo, quem é soberano e quem faz o quê | física | pendente |
| G13-05 | Administração pública e servidores públicos na Constituição | física | pendente |
| G13-06 | Poder Executivo — atribuições e responsabilidades do Presidente da República | física | pendente |
| G13-07 | Poder Legislativo — estrutura, funcionamento e atribuições | física | pendente |
| G13-08 | Poder Judiciário — disposições gerais | física | pendente |
| G13-09 | Funções essenciais à Justiça — Advocacia, Ministério Público, Advocacia Pública e Defensoria Pública | física | pendente |
| G13-10 | Defesa do Estado e das instituições democráticas — segurança pública | física | pendente |
| G13-11 | Ordem social — seguridade social, meio ambiente, família e grupos protegidos | física | pendente |
| G14-01 | Lei de Drogas — tráfico ilícito e uso indevido de substâncias entorpecentes — Lei 11.343/2006 | física | pendente |
| G14-02 | Abuso de autoridade — Lei 13.869/2019 | física | pendente |
| G14-03 | Crimes de tortura — Lei 9.455/1997 | física | pendente |
| G14-04 | Estatuto da Criança e do Adolescente — Lei 8.069/1990 | física | pendente |
| G14-05 | Estatuto do Desarmamento — Lei 10.826/2003 | física | pendente |
| G14-06 | Crimes ambientais — Lei 9.605/1998 | física | pendente |
| G14-07 | Lei Maria da Penha — Lei 11.340/2006 | física | pendente |
| G14-08 | Investigação criminal conduzida pelo delegado de polícia — Lei 12.830/2013 | física | pendente |
| G14-09 | Lavagem de dinheiro — Lei 9.613/1998 | física | pendente |
| G14-10 | Crimes hediondos — Lei 8.072/1990 | física | pendente |
| G14-11 | Crimes resultantes de preconceito de raça ou cor — Lei 7.716/1989 | física | pendente |
| G14-12 | Identificação criminal do civilmente identificado — Lei 12.037/2009 | física | pendente |
| G14-13 | Juizados Especiais Criminais — Lei 9.099/1995 | física | pendente |
| G14-14 | Estatuto da Pessoa Idosa — Lei 10.741/2003 | física | pendente |
| G14-15 | Crimes de trânsito — Lei 9.503/1997 | física | pendente |
| G14-16 | Crimes eleitorais — Código Eleitoral — Lei 4.737/1965 | física | pendente |
| G14-17 | Organização criminosa — Lei 12.850/2013 | física | pendente |
| G14-18 | Marco Legal do Combate ao Crime Organizado — Lei 15.358/2026 | física | pendente |
| G14-19 | Interceptação telefônica — Lei 9.296/1996 | física | pendente |
| G15-01 | Teoria geral dos direitos humanos | física | pendente |
| G15-02 | Direito internacional dos direitos humanos e direito brasileiro | física | pendente |
| G15-03 | Sistema global de proteção dos direitos humanos: ONU e DUDH | física | pendente |
| G15-04 | Pactos Internacionais de 1966 | física | pendente |
| G15-05 | Sistema Interamericano de Direitos Humanos | física | pendente |
| G15-06 | Controle de convencionalidade e direitos humanos na Constituição de 1988 | física | pendente |
| G15-07 | Proteção de grupos vulneráveis e direitos humanos na atividade policial | física | pendente |
| G16-01 | Fundamentos da Medicina Legal — conceitos, importância e divisões | física | pendente |
| G16-02 | Corpo de delito, perícia e peritos em Medicina Legal | física | pendente |
| G16-03 | Documentos médico-legais e identificação — identidade, reconhecimento e métodos | física | pendente |
| G16-04 | Traumatologia médico-legal — lesões por ação contundente, armas brancas e projéteis | física | pendente |
| G16-05 | Tanatologia forense — morte, fenômenos cadavéricos e cronologia médico-legal | física | pendente |
| G16-06 | Exame médico-legal de locais de crime | física | pendente |
| G16-07 | Psiquiatria forense — imputabilidade penal e capacidade civil | física | pendente |
| G17-01 | Fundamentos da Criminologia — conceito, métodos e objetos | física | pendente |
| G17-02 | Funções da Criminologia e política criminal | física | pendente |
| G17-03 | Modelos teóricos da Criminologia — teorias sociológicas e prevenção da infração penal | física | pendente |

### SEAP/MA 2026 — Inspetor de Polícia Penal

Prova em **13/12/2026** · notebook `bd6a8093-1946-46fe-9feb-a3bf7967ae09` · **98 áudios**

| Código | Assunto | Origem | Status |
| --- | --- | --- | --- |
| G01-01 | leitura-interpretacao-tipos-generos | física | pendente |
| G01-02 | tipos-generos-textuais | física | pendente |
| G01-03 | ortografia-oficial | física | pendente |
| G01-04 | coesao-textual | física | pendente |
| G01-05 | Emprego de tempos e modos verbais | física | pendente |
| G01-06 | classes-nominais-de-palavras | física | pendente |
| G01-07 | Verbo como classe de palavras | física | pendente |
| G01-08 | Classes invariáveis de palavras | física | pendente |
| G01-09 | Estrutura morfossintática do período | física | pendente |
| G01-10 | Coordenação entre orações e termos da oração | física | pendente |
| G01-11 | Subordinação entre orações e termos da oração | física | pendente |
| G01-12 | Pontuação | física | pendente |
| G01-13 | Concordância verbal e nominal | física | pendente |
| G01-14 | Regência verbal e nominal | física | pendente |
| G01-15 | Crase | física | pendente |
| G01-16 | Colocação pronominal | física | pendente |
| G01-17 | Significação e substituição lexical | física | pendente |
| G01-18 | Reorganização da estrutura de orações e períodos | física | pendente |
| G01-19 | Reescrita de textos de diferentes gêneros e níveis de formalidade | física | pendente |
| G02-01 | Raciocínio verbal, matemático, sequencial, espacial e temporal | física | pendente |
| G02-02 | Problemas aritméticos, geométricos e matriciais | física | pendente |
| G03-01 | França Equinocial, São Luís, Guaxenduba e capitães-mores do Maranhão | física | pendente |
| G03-02 | Fatos políticos, econômicos e sociais do Maranhão na segunda metade do século XX | física | pendente |
| G04-01 | Geomorfologia e classificação do relevo maranhense | física | pendente |
| G04-02 | População, povoamento e movimentos populacionais | física | pendente |
| G04-03 | Agricultura, pecuária e extrativismo no Maranhão | física | pendente |
| G04-04 | Produzir não é o mesmo que circular | física | pendente |
| G04-05 | Infraestrutura e cultura: primeiro identifique o tipo de referência | física | pendente |
| G05-01 | Sistema operacional e software: quem coordena, quem executa e onde os dados ficam | física | pendente |
| G05-02 | Internet: navegação, endereço, links, busca e impressão | física | pendente |
| G05-03 | Microsoft Word: formatação e estrutura de documentos | física | pendente |
| G05-04 | Microsoft Excel: valor, cálculo e aparência | física | pendente |
| G05-05 | Antivírus e firewall: duas camadas, dois problemas | física | pendente |
| G05-06 | Teclas de atalho: contexto antes da combinação | física | pendente |
| G05-07 | Configuração de impressoras: dispositivo, driver e fila | física | pendente |
| G06-01 | Atualidades na discursiva: do fato ao argumento | física | pendente |
| G06-02 | Atualidades econômicas e tecnológicas: enxergue o sistema, não a manchete | física | pendente |
| G06-03 | Do problema global ao resultado local | física | pendente |
| G07-01 | Princípios da Administração Pública — artigo 37 da Constituição | física | pendente |
| G07-02 | Poderes administrativos: quatro instrumentos, um mesmo limite | física | pendente |
| G07-03 | Atos administrativos: da formação ao desfazimento | física | pendente |
| G07-04 | Servidores públicos: primeiro descubra qual regra alcança o vínculo | física | pendente |
| G07-05 | Lei 9.784/1999: do pedido à decisão e ao reexame | física | pendente |
| G07-06 | Responsabilidade civil do Estado: objetiva não significa automática | física | pendente |
| G07-07 | Improbidade administrativa: ilegalidade não basta | física | pendente |
| G08-01 | Estado e Constituição: primeiro entenda a relação, depois classifique | física | pendente |
| G08-02 | Preâmbulo e princípios fundamentais: o mapa de identidade da Constituição de 1988 | física | pendente |
| G08-03 | Direitos e garantias fundamentais e remédios constitucionais | física | pendente |
| G08-04 | Organização político-administrativa do Estado: quem é autônomo, quem é soberano e quem faz o quê | física | pendente |
| G08-05 | Administração pública e servidores públicos na Constituição | física | pendente |
| G08-06 | Funções essenciais à Justiça — Advocacia, Ministério Público, Advocacia Pública e Defensoria Pública | física | pendente |
| G08-07 | Defesa do Estado e das instituições democráticas — segurança pública | física | pendente |
| G08-08 | Ordem social — seguridade social, meio ambiente, família e grupos protegidos | física | pendente |
| G08-09 | Segurança pública na Constituição do Maranhão: quem integra, quem coordena e quem faz o quê | física | pendente |
| G09-01 | Aplicação da lei penal: quatro perguntas antes de discutir o crime | física | pendente |
| G09-02 | Teoria geral do crime: um mapa antes dos detalhes | física | pendente |
| G09-03 | Fato típico: do comportamento ao número de crimes | física | pendente |
| G09-04 | Depois do fato típico: quatro perguntas diferentes | física | pendente |
| G09-05 | Imputabilidade e concurso de pessoas: duas perguntas antes da responsabilidade final | física | pendente |
| G09-06 | Crimes contra a pessoa: leia pelo bem jurídico antes de decorar artigos | física | pendente |
| G09-07 | Crimes contra o patrimônio: identifique primeiro como o bem sai da esfera da vítima | física | pendente |
| G09-08 | Crimes contra a dignidade sexual: identifique primeiro por que a liberdade sexual foi atingida | física | pendente |
| G09-09 | Três títulos, três perguntas diferentes | física | pendente |
| G09-10 | Crimes contra a administração pública: comece pelo vínculo com a função | física | pendente |
| G10-01 | Princípios do processo penal: limites ao poder de acusar e julgar | física | pendente |
| G10-02 | Inquérito policial: apurar antes de acusar não é julgar | física | pendente |
| G10-03 | Ação penal: quem pode acusar, quando pode acusar e o que precisa existir antes da acusação | física | pendente |
| G10-04 | Jurisdição e competência: quem pode julgar este caso? | física | pendente |
| G10-05 | Prisão em flagrante: captura agora, controle judicial logo depois | física | pendente |
| G10-06 | Prisão preventiva: não basta suspeita, é preciso necessidade cautelar concreta | física | pendente |
| G10-07 | Prisão temporária: prender por prazo certo para proteger uma investigação necessária | física | pendente |
| G10-08 | Outras medidas cautelares: controlar o risco sem prender quando isso basta | física | pendente |
| G10-09 | Provas no processo penal: obter, preservar, admitir e confrontar | física | pendente |
| G10-10 | Recursos no processo penal: primeiro identifique a decisão, depois o instrumento e o prazo | física | pendente |
| G10-11 | Procedimentos e nulidades: o caminho do processo e o custo de fazer um ato errado | física | pendente |
| G11-01 | Direitos humanos e direitos fundamentais: da proteção da pessoa à participação política | física | pendente |
| G11-02 | PNDH-3: um programa estruturado em eixos, diretrizes, objetivos e ações | física | pendente |
| G11-03 | Regras de Nelson Mandela: padrão mínimo de tratamento e administração prisional | física | pendente |
| G11-04 | Convenção Americana: direitos essenciais + mecanismos regionais de proteção | física | pendente |
| G11-05 | Regras de Bangkok: necessidades específicas sem abandonar igualdade e dignidade | física | pendente |
| G12-01 | Crimes de tortura — Lei 9.455/1997 | física | pendente |
| G12-02 | Estatuto do Desarmamento — Lei 10.826/2003 | física | pendente |
| G12-03 | Lei Anticorrupção: responsabilizar a pessoa jurídica sem apagar a responsabilidade individual | física | pendente |
| G12-04 | Organização criminosa — Lei 12.850/2013 | física | pendente |
| G12-05 | Pacote Anticrime: uma lei que altera muitos diplomas | física | pendente |
| G12-06 | Lei de Execução Penal: fazer cumprir a decisão sem abandonar direitos e reintegração | física | pendente |
| G12-07 | Abuso de autoridade — Lei 13.869/2019 | física | pendente |
| G12-08 | Crimes hediondos — Lei 8.072/1990 | física | pendente |
| G12-09 | Lei de Drogas — tráfico ilícito e uso indevido de substâncias entorpecentes — Lei 11.343/2006 | física | pendente |
| G12-10 | Susp e PNSPDS: política, sistema e plano não são a mesma coisa | física | pendente |
| G12-11 | PNAISP: saúde prisional como cuidado em rede | física | pendente |
| G12-12 | Resolução nº 3/2009 do CNPCP: educação como parte da execução penal | física | pendente |
| G12-13 | Resolução nº 1/2014 do CNPCP: medida de segurança com cuidado em rede | física | pendente |
| G12-14 | Resolução nº 4/2014 do CNPCP: atenção integral à saúde no sistema prisional | física | pendente |
| G12-15 | Resolução nº 4/2017 do CNPCP: assistência material mínima e dignidade cotidiana | física | pendente |
| G12-16 | Resolução nº 31/2022 do CNPCP: monitoração eletrônica como medida judicial acompanhada | física | pendente |
| G12-17 | PNAMPE: política penitenciária com perspectiva de gênero | física | pendente |
| G12-18 | Lei nº 11.342/2020: Polícia Penal do Maranhão e o cargo de Inspetor | física | pendente |

### Perícia/MA 2026 — Agente Criminal Generalista

Prova em **10/01/2027** · notebook `7b112fbd-8767-4d26-aca0-a9b801e725e0` · **92 áudios**

| Código | Assunto | Origem | Status |
| --- | --- | --- | --- |
| G01-01 | Leitura, interpretação, tipos e gêneros textuais | física | pendente |
| G01-02 | Domínio da ortografia oficial | física | pendente |
| G01-03 | Coesão textual: referenciação, conectores e sequenciação | física | pendente |
| G01-04 | Emprego de tempos e modos verbais | física | pendente |
| G01-05 | Classes nominais de palavras | física | pendente |
| G01-06 | Verbo como classe de palavras | física | pendente |
| G01-07 | Classes invariáveis de palavras | física | pendente |
| G01-08 | Estrutura morfossintática do período | física | pendente |
| G01-09 | Coordenação entre orações e termos da oração | física | pendente |
| G01-10 | Subordinação entre orações e termos da oração | física | pendente |
| G01-11 | Pontuação | física | pendente |
| G01-12 | Concordância verbal e nominal | física | pendente |
| G01-13 | Regência verbal e nominal | física | pendente |
| G01-14 | Crase | física | pendente |
| G01-15 | Colocação pronominal | física | pendente |
| G01-16 | Significação e substituição lexical | física | pendente |
| G01-17 | Reorganização da estrutura de orações e períodos | física | pendente |
| G01-18 | Reescrita, gêneros e formalidade | física | pendente |
| G01-19 | Redação e correspondência oficial: linguagem e expedientes | física | pendente |
| G02-01 | estruturas-logicas | física | pendente |
| G02-02 | proposicoes-tabelas-verdade | física | pendente |
| G02-03 | equivalencias-de-morgan-diagramas-logicos | física | pendente |
| G02-04 | logica-argumentacao-inferencias | física | pendente |
| G02-05 | Princípios de contagem e probabilidade | física | pendente |
| G02-06 | metodo-cientifico-hipoteses-teorias | física | pendente |
| G02-07 | vies-pesquisa | física | pendente |
| G02-08 | pensamento-lateral-vertical | física | pendente |
| G03-01 | Noções de sistemas operacionais | física | pendente |
| G03-02 | redes-computadores-nocoes | física | pendente |
| G03-03 | navegacao-busca-internet | física | pendente |
| G03-04 | correio-eletronico-nocoes | física | pendente |
| G03-05 | redes-neurais-inteligencia-artificial | física | pendente |
| G03-06 | computacao-nuvem-nocoes | física | pendente |
| G03-07 | seguranca-informacao-nocoes | física | pendente |
| G03-08 | Noções de algoritmos | física | pendente |
| G04-01 | Estado, governo e administração: direção, execução e limites | física | pendente |
| G04-02 | Organização administrativa da União | física | pendente |
| G04-03 | Agentes públicos: espécies, cargo, emprego e função | física | pendente |
| G04-04 | agentes-poderes-deveres-prerrogativas | física | pendente |
| G04-05 | Regime jurídico, provimento, vacância e movimentação | física | pendente |
| G04-06 | agentes-direitos-vantagens | física | pendente |
| G04-07 | agentes-regime-disciplinar | física | pendente |
| G04-08 | Responsabilidades dos agentes: três perguntas sobre a mesma conduta | física | pendente |
| G05-01 | Prova: transformar alegações em base racional para decidir | física | pendente |
| G05-02 | Corpo de delito e perícia: do vestígio à resposta técnica | física | pendente |
| G05-03 | Cadeia de custódia: provar também exige provar o percurso do vestígio | física | pendente |
| G06-01 | Capitães-mores do Maranhão: da conquista ao governo | física | pendente |
| G06-02 | Estado do Maranhão e Grão-Pará, Bequimão e Companhia de Comércio | física | pendente |
| G06-03 | Fatos políticos do Maranhão na segunda metade do século XX | física | pendente |
| G06-04 | Fatos econômicos do Maranhão na segunda metade do século XX | física | pendente |
| G06-05 | Fatos sociais do Maranhão na segunda metade do século XX | física | pendente |
| G07-01 | Localização, superfície, limites, fronteiras e pontos extremos | física | pendente |
| G07-02 | Áreas de Proteção Ambiental e Parques Nacionais | física | pendente |
| G07-03 | Climas do Maranhão: pluviosidade e temperatura | física | pendente |
| G07-04 | Geomorfologia e classificação do relevo maranhense | física | pendente |
| G07-05 | Rios limítrofes, suas bacias e bacias genuinamente maranhenses | física | pendente |
| G07-06 | Formações vegetais do Maranhão: floresta, Cerrado e cocais | física | pendente |
| G07-07 | População, povoamento e movimentos populacionais | física | pendente |
| G07-08 | Agricultura e pecuária maranhenses | física | pendente |
| G07-09 | Extrativismo vegetal, animal e mineral | física | pendente |
| G07-10 | Parque industrial: indústrias de base e indústrias de transformação | física | pendente |
| G07-11 | Setor terciário: comércio, telecomunicações e transportes | física | pendente |
| G07-12 | Malha viária, portos e aeroportos | física | pendente |
| G08-01 | Criminalística: definição, histórico e doutrina | física | pendente |
| G08-02 | Locais de crime: classificação, isolamento e preservação | física | pendente |
| G08-03 | Levantamentos de locais contra a pessoa e o patrimônio | física | pendente |
| G08-04 | Vestígios de interesse forense e classificações | física | pendente |
| G08-05 | Locais de morte e morte violenta | física | pendente |
| G08-06 | Local de morte por arma de fogo | física | pendente |
| G08-07 | Local de morte por instrumentos mecânicos | física | pendente |
| G08-08 | Local de morte por asfixia | física | pendente |
| G09-01 | Traumatologia e instrumentos de ação mecânica | física | pendente |
| G09-02 | Asfixiologia: mecanismos e modalidades | física | pendente |
| G09-03 | Tanatologia forense: cronotanatognose e modalidades de morte | física | pendente |
| G09-04 | Noções de agentes químicos em Medicina Legal | física | pendente |
| G09-05 | Noções de agentes térmicos em Medicina Legal | física | pendente |
| G09-06 | Noções de sexologia forense | física | pendente |
| G10-01 | Arquivística: princípios e conceitos | física | pendente |
| G10-02 | Gestão documental e protocolo | física | pendente |
| G10-03 | Classificação de documentos de arquivo | física | pendente |
| G10-04 | Arquivamento e ordenação de documentos de arquivo | física | pendente |
| G10-05 | Tabela de temporalidade de documentos de arquivo | física | pendente |
| G10-06 | Acondicionamento e armazenamento de documentos de arquivo | física | pendente |
| G10-07 | Preservação, conservação e restauração de documentos de arquivo | física | pendente |
| G10-08 | Tipologias documentais, suportes, microfilmagem e automação | física | pendente |
| G11-01 | Identificação criminal — Lei nº 12.037/2009 | física | pendente |
| G11-02 | Carteira de identidade: a lei vigente e o regulamento histórico | física | pendente |
| G11-03 | Documentos pessoais: conferir não é ficar com o documento | física | pendente |
| G11-04 | Registro de Identidade Civil: um cidadão, uma chave nacional | física | pendente |
| G11-05 | Improbidade administrativa — sujeitos e atos | física | pendente |
| G11-06 | Improbidade administrativa — sanções e procedimento | física | pendente |
| G12-01 | Redação: planejamento, critérios e treino comentado | física | pendente |
