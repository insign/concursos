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
| Duração por arquivo (áudio) | ~90 min com MP3 mono 32 kbps | 32 kbps ≈ 14,4 MB por hora. Passando disso, use R2 (já é o caso) ou reencode. |
| ITP do iOS Safari | 7 dias sem interação | Fora da Tela de Início, o Safari apaga todo o armazenamento do site. A posição volta do KV; o cache local não. |

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
| Erro 500 nas Functions | Binding `MIDIA` ausente no projeto Pages. | Criar o binding R2 no projeto Pages ou em `wrangler.toml`. |
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
- Mídia no pacote offline do concurso e no precache do service worker.
- Streaming adaptativo (HLS/DASH), DRM e playlists.
- Reprodutor de terceiros: o player usa `<audio>`/`<video>` nativos.
