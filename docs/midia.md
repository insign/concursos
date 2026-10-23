# Mídia dos assuntos

Cada assunto pode ter áudio ou vídeo próprio. A mídia é descoberta por
convenção de pasta, publicada no Cloudflare R2 e entregue na própria origem do
site. Não há tela de administração: o que existe na pasta do assunto é o que
aparece no player.

## Convenção

A pasta `midia/` fica ao lado do `conteudo.md`, na **origem resolvida** do
assunto:

```
src/content/assuntos/<concurso>/<grupo...>/<assunto>/midia/   # assunto físico
src/content/biblioteca/<grupo...>/<assunto>/midia/             # origem canônica
```

Um assunto com `vinculo.json` **não** pode ter `midia/` própria: a mídia pertence
à origem canônica e é compartilhada por todos os consumidores. O build falha
com mensagem explícita se as duas coisas existirem.

Dentro de `midia/`:

| Arquivo | Vai para o Git? | Função |
| --- | --- | --- |
| `nome-do-assunto.mp3` | Não | O binário, fonte editorial. Vive na pasta e no MEGA. |
| `catalogo.json` | Sim | O contrato versionado que o site consome. |

O nome do arquivo precisa casar `^[a-z0-9]+(?:-[a-z0-9]+)*\.(mp3\|m4a\|ogg\|opus\|mp4\|webm)$`.
Ele não precisa ser igual ao slug do assunto: o slug muda entre consumidores e
um assunto pode ter mais de uma mídia. Prefixos numéricos (`01-`, `02-`) controlam
a ordem do seletor.

`catalogo.json` é **gerado**, nunca escrito à mão:

```json
{
  "schemaVersion": 1,
  "items": [
    { "file": "aula-principal.mp3", "sha256": "<64 hex>", "bytes": 14400000 }
  ]
}
```

O MIME e a URL não ficam no catálogo: `/media/<sha256>.<ext>` é derivado pelo
código, e o SHA-256 é a identidade imutável do conteúdo. Trocar o arquivo gera
outro hash, outra URL e outro cache.

## Publicação

```bash
npm run midia:publicar -- --dry-run   # mostra o que seria enviado
npm run midia:publicar                # envia ao R2 e reescreve os catálogos
```

O publicador envia cada arquivo para `media/<sha256>.<ext>` no bucket
`concursos-midia` e reescreve o `catalogo.json` da origem. É idempotente:
arquivos cujo conteúdo já está no bucket não são reenviados, e um catálogo
igual ao anterior não é reescrito.

Se o `catalogo.json` referencia um arquivo que não está mais na pasta, o
publicador **recusa** o assunto: restaure o binário ou use `--force` para
remover a entrada. Sem essa trava, um clone sem os binários apagaria o
catálogo versionado.

O binário **não** entra no Git (`.gitignore`), e sim no R2. Ele continua no
MEGA, que é a fonte editorial de trabalho. A única exceção é o concurso
fictício `concurso-exemplo`, cujo áudio de teste é minúsculo e fica versionado
para que a suíte end-to-end exercite o player sem depender da nuvem.

## Limites

Estes números são o que faz o recurso falhar. Todos são externos ao projeto e
mudam devagar, mas mudam.

| Limite | Valor | Consequência |
| --- | --- | --- |
| Arquivo estático no Pages | 25 MiB (26.214.400 bytes) | Acima disso o **deploy é rejeitado**. Não se aplica à mídia, que não é asset estático, mas se aplica a qualquer mídia que acabe em `dist/`. |
| Arquivos por site no Pages | 20.000 (Free) / 100.000 (pagos) | A contagem inclui as páginas do site. |
| Timeout de build no Pages | 20 minutos | Build acima disso falha. |
| Invocações das Functions | 100.000/dia (Free) | Cada reprodução de mídia consome invocações. |
| CPU por invocação | 10 ms (Free) | A Function só lê o intervalo pedido; não decodifica mídia. |
| Memória por isolate | 128 MB | A Function transmitve o objeto, sem carregar o arquivo inteiro. |
| Armazenamento no R2 | 10 GB-mês grátis | Depois disso, US$ 0,015/GB-mês. |
| Operações no R2 | 1 M Class A + 10 M Class B grátis/mês | `head` e `get` são Class B: cada reprodução de mídia gasta duas. |
| Egress do R2 | Grátis | Não há custo de saída. |
| Objeto no R2 | 5 TiB | Sem risco no uso editorial. |
| Cache API do Workers | 512 MB por objeto | Não é usado: a mídia é servida direto do R2. |
| Documento no KV | 1.850.000 bytes | O documento de mídia de um assunto é pequeno (dezenas de KB). |
| ID remoto no KV | 100 caracteres | A posição de mídia usa `concursos--<alias>--midia--<16 hex>`. |
| Build local | 18.000 arquivos e 524.288.000 bytes (`scripts/build-budget.json`) | `npm run build:budget` falha acima disso. A mídia não entra em `dist/`, então não consome esse orçamento. |
| Duração por arquivo (áudio) | ~90 min no perfil adotado (MP3 mono 64 kb/s ABR) | O perfil gasta ≈ 30 MB por hora; a 90 min, ≈ 45 MB. Acima disso, use R2 (já é o caso) ou reencode. |
| ITP do iOS Safari | 7 dias sem interação | Fora da Tela de Início, o Safari apaga todo o armazenamento do site. A posição volta do KV; o cache local não. |

## Perfil de codificação

O áudio publicado usa MP3 (`libmp3lame`) a 64 kb/s ABR, mono, 44,1 kHz, com
ID3v2.3. O `title` segue `G<código> — <assunto>`, o `artist` traz a disciplina e
o `album` o concurso e o cargo. O perfil gasta ≈ 30 MB por hora; o maior arquivo
publicado em `tce-ma-2026-analista-administracao` tem 15,4 MB.

```bash
ffmpeg -i fonte.m4a -map 0:a:0 -vn -ac 1 -ar 44100 \
  -c:a libmp3lame -b:a 64k -abr 1 \
  -metadata title="G8-05 — Gestão de processos" \
  -metadata artist="Administração Pública" \
  -metadata album="TCE/MA 2026 — Analista de Administração" \
  -id3v2_version 3 midia/gestao-processos.mp3
```

## Verificação de entrega

O Cloudflare Pages responde **200** para HTTP Range em assets estáticos, e o iOS
Safari exige **206** para reproduzir áudio e vídeo. Por isso a mídia não é
servida como asset estático: a rota `/media/*` é uma Pages Function que lê o
objeto no R2 por intervalo e devolve 206.

Antes de publicar a primeira mídia real, confirme a entrega:

```bash
curl -sS -D - -o /dev/null \
  -H 'Accept-Encoding: identity' \
  -H 'Range: bytes=0-1' \
  https://concursos.helio.me/media/<sha256>.mp3
```

Esperado: `HTTP/2 206`, `content-range: bytes 0-1/<total>`,
`content-length: 2`, `accept-ranges: bytes` e exatamente dois bytes no corpo.
Um `200` reprova o caminho.

## Download offline da mídia

A mídia do concurso pode ser baixada junto com o curso offline. A opção é
explícita: ao lado do botão **Baixar concurso** há um `select` com *Somente o
curso* (padrão) e *Curso + mídias*. O `select` não guarda preferência: o que
fica registrado é a intenção daquele download, gravada no registro do
concurso antes da primeira transferência. Por isso uma recarga no meio do
processo mantém a opção marcada e oferece a retomada.

- **Inventário próprio.** A lista de arquivos do concurso mora em
  `/offline-media/<concurso>.json` (schema v1, estrito). O manifesto do
  pacote offline (ADR-008) não muda, e os clientes já instalados continuam
  valendo.
- **Uma operação, um lock.** O conteúdo vem primeiro, com a promoção
  atômica; a mídia vem depois, sob a mesma aquisição do lock global. A
  intenção é revalidada contra o lease e o registro imediatamente antes de
  ser gravada.
- **Progresso por byte.** A barra avança com os bytes recebidos, não apenas
  com arquivos concluídos: o primeiro áudio grande já move o indicador. O
  anúncio em `aria-live` muda ao concluir um arquivo ou a cada dois
  segundos, para não inundar o leitor de tela.
- **Paralelismo.** A mesma política adaptativa já usada no conteúdo (2 a 15
  transferências), limitada a 6 pela memória: cada arquivo é conferido por
  SHA-256 em memória antes de ser gravado.
- **Cache próprio.** `offline-media-v1`, com a URL imutável
  `/media/<sha256>.<ext>` como chave. O arquivo canônico compartilhado entre
  concursos é baixado uma vez só e sobrevive à remoção de qualquer um
  deles, por referência.
- **Offline com busca.** O service worker serve a cópia local e sintetiza
  `206 Partial Content` a partir do `Range` pedido pelo player; sem cópia
  local, a requisição segue para a rota `/media/*`.
- **Falha parcial.** Um arquivo que falha não derruba os outros: o que foi
  conferido fica guardado e referenciado, e o botão **Baixar mídias** retoma
  só o que falta. O conteúdo do curso permanece disponível.
- **Conexão travada.** Um silêncio de 45 segundos — antes ou depois dos
  cabeçalhos — aborta a requisição com erro explícito. Sem isso, a troca de
  rede, a tela bloqueada ou um portal cativo deixariam a fase de mídia
  pendente, sem erro e sem retomada.
- **O que sai.** Ao trocar o inventário, os arquivos que saíram do conjunto
  são apagados do aparelho, junto com a mídia que sobrou sem referência
  depois da limpeza de um pacote.

Diagnóstico: a mensagem "As mídias não foram concluídas" indica arquivo
indisponível no servidor ou conexão travada; o conteúdo do curso segue
offline e a ação é repetir o download das mídias.

## Player persistente e navegação

O assunto oferece uma ação compacta com aparência de link, **Ouvir áudio do
assunto**, ao lado de **Ler sem distrações** e, quando há várias faixas, um
seletor. A ação e o seletor continuam acessíveis no modo de leitura. O texto
da ação se adapta a vídeo ou a um catálogo com tipos de mídia diferentes.
Os elementos nativos de áudio e vídeo ficam no player global, persistido entre
as navegações internas pelo `ClientRouter` (ADR-011). Visitar outro assunto
não troca a faixa: a troca exige usar o botão de reprodução ou o seletor desse
assunto. A sessão mantém o consumidor e o perfil de origem para salvar a
posição e marcar a conclusão corretamente.

A barra inferior oferece reprodução/pausa, avanço e recuo de 15 segundos,
velocidade e busca na faixa. Depois de pausar, permanece disponível por cinco
minutos; fechar a barra pausa a reprodução. Rolar para baixo recolhe a barra
sem interromper a mídia; rolar para cima ou tocar em uma área vazia a revela.
Controles com foco permanecem visíveis. O modo de leitura e a tela cheia
incluem o player, e os controles flutuantes se deslocam pela altura visível
da barra.

Downloads e sincronização continuam durante as navegações internas. A
atualização do aplicativo aguarda um momento sem atividade e a gravação local
pendente antes de ativar ou recarregar, para preservar a sessão em andamento.
Uma recarga completa ou o fechamento da aba encerra a reprodução; a posição
salva continua disponível para retomada.
O aviso com a posição retomada desaparece após dez segundos, sem apagar um
aviso de erro mais recente.

## Posição de reprodução

A posição fica em um documento do KV **por assunto consumidor**, no namespace
`concursos--<alias>--midia--<chave>`. Ele é lido sob demanda, quando o assunto
é aberto, e **não** entra no preflight de ativação de alias: entrar em um
aparelho novo custa o mesmo que antes desta funcionalidade.

Consequências práticas:

- a posição é um documento só (last-write-wins por versão, como os demais);
- sem alias ativo o player funciona, mas nada é salvo;
- o documento é arbitrado por versão; uma edição local ainda pendente não é
  sobrescrita por um remoto mais antigo.

## Conclusão do assunto

Ao percorrer 90% da duração (95% para mídia com menos de 2 minutos), ou ao
terminar, o assunto é marcado como estudado automaticamente e aparece um aviso
discreto com **Desfazer**. O estado continua sendo o documento `estudados` de
sempre: nenhuma semântica nova foi criada. Com mais de uma mídia no assunto, a
marcação só acontece quando todas forem concluídas.

## Diagnóstico

| Sintoma | Causa | O que fazer |
| --- | --- | --- |
| "Mídia indisponível" no player | O objeto não está no R2, ou a rota `/media/*` não está publicada. | Rode `npm run midia:publicar` e o gate de 206. |
| 404 em `/media/<sha256>.mp3` | O catálogo referencia um objeto que não foi enviado. | Republicar o assunto. |
| 416 na requisição | Intervalo pedido além do tamanho do arquivo. | Recarregar a página; o player refaz a requisição. |
| O iPhone não toca | A rota está respondendo 200 em vez de 206. | Rodar o gate de 206 e conferir se `functions/` foi publicado no deploy. |
| Erro 500 nas Functions | Binding `MIDIA` ausente no deployment. | No Cloudflare Pages, o binding precisa estar na configuração do projeto (Settings → Bindings → R2, nome da variável `MIDIA`) **e** no `wrangler.toml`, que o build do Git lê. O `wrangler.toml` sozinho não basta: sem a configuração do projeto, o `env.MIDIA` chega `undefined` e a rota `/media/*` responde 500. |
| O build do Pages falha com "does not support account_id" | O `wrangler.toml` tem `account_id`. | Remover a linha: arquivos de configuração de Pages não aceitam `account_id`. |
| Build falha com "file too large" | Um asset acima de 25 MiB foi parar em `dist/`. | A mídia não deve estar no build; se estiver, removê-la do `public/`. |
| Build falha no orçamento | `dist/` acima de 18.000 arquivos ou 524 MB. | Rodar `npm run build:budget` e conferir o relatório. |
| "possui vínculo canônico e catálogo de mídia próprio" | Um consumidor tem `vinculo.json` e `midia/` ao mesmo tempo. | Apagar a pasta `midia/` do consumidor; a mídia fica só na origem canônica. |
| "Catálogo de mídia órfão" | Há `midia/catalogo.json` em uma pasta que não é assunto. | Apagar a pasta. |
| O publicador recusa o assunto | O `catalogo.json` referencia um arquivo que não está na pasta. | Restaurar o binário ou rodar com `--force` para remover a entrada. |
| A posição não passa para outro aparelho | O KV é last-write-wins e sem compare-and-set. | Abrir o assunto no outro aparelho: o documento é buscado sob demanda. |
| A mídia some no iPhone depois de uns dias | Regra de 7 dias do Safari para sites não instalados. | Instalar o PWA na Tela de Início; o armazenamento deixa de ser descartado. |

## Fora de escopo

- Tela de administração, upload pelo site e edição de metadados pela interface.
- Transcrição, legendas, capítulos e busca dentro da mídia.
- Mídia no cheat sheet, na página de questões e na mega revisão.
- Mídia no precache do service worker e download automático sem escolha do
  usuário.
- Streaming adaptativo (HLS/DASH), DRM e playlists.
- Reprodutor de terceiros: o player usa `<audio>`/`<video>` nativos.
