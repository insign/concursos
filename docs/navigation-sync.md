# Sincronização de navegação e posição de leitura

## Documento remoto

Cada alias possui no máximo um documento de navegação:

```text
concursos--<alias>--navegacao
```

O JSON usa `schemaVersion: 1` e contém rota interna, contexto estável, data informativa e uma âncora semântica opcional. A `version` que decide conflitos pertence ao envelope retornado pelo KV; `updatedAt` não é relógio de concorrência.

## Regra de conflito

O estado é transitório e usa last-write-wins pelo documento inteiro:

1. a versão remota maior é adotada;
2. em versões iguais, uma outbox local pendente é publicada;
3. em versões iguais sem pendência, não há operação;
4. mudança de `created_at` ou regressão de versão identifica uma nova criação remota;
5. numa nova criação, o remoto é adotado quando o registro local está limpo e a pendência local explícita é publicada quando existe;
6. a ausência remota não ressuscita uma cópia local limpa, mas uma alteração local pendente pode recriar o documento;
7. uma escrita local feita durante um PUT permanece pendente para a próxima rodada;
8. saltos de versão são registrados como aviso porque a API não oferece CAS nem histórico.

A aplicação de uma resposta remota ao IndexedDB compara também a versão e a data de criação que existiam quando a requisição começou. Uma resposta atrasada não pode regredir um snapshot remoto mais novo.

## Persistência local

A navegação usa o IndexedDB `concursos-navigation`, store `navigation`, separado do banco editorial `concursos-offline`. A separação permite evoluir o estado transitório sem bloquear a migração do banco que armazena respostas, progresso, preferências, downloads e simulados.

Cada registro guarda `current`, `base`, `remoteVersion`, `remoteCreatedAt`, `outboxState`, erros, próxima tentativa, versão remota rejeitada, aviso de conflito e revisão local. Falhas repetidas recebem backoff exponencial limitado a 60 segundos; uma mesma versão remota inválida é quarentenada somente uma vez por estado local.

## Captura semântica

O runtime considera headings, parágrafos, itens de lista, blocos de código, citações, tabelas e figuras. A posição salva contém:

- versão/identificador do conteúdo;
- seção mais próxima;
- bloco estável derivado;
- índice do bloco;
- deslocamento relativo dentro do bloco;
- pequeno trecho normalizado;
- percentual geral como último fallback.

A restauração procura bloco, trecho, seção, índice e percentual, nesta ordem. Fontes e imagens recebem uma janela para estabilização, e o ajuste é repetido depois do primeiro scroll.

Na aba de questões, o contexto visível é a âncora principal. O runtime aguarda o questionário concluir a montagem, materializa páginas ou blocos adicionais conforme o layout e não aplica depois um segundo scroll genérico de leitura.

## Retomada entre aparelhos

Na primeira abertura da aba, o estado sincronizado pode redirecionar uma única vez para a rota válida salva. Depois que a sessão está ativa, uma versão remota mais nova nunca sequestra a navegação: aparece um aviso com **Retomar ponto mais recente** e **Continuar aqui**. A segunda opção força a persistência do ponto local antes da sincronização.

## Eventos e frequência

A captura é debounced após rolagem, resize e controles relevantes. Também ocorre em `pagehide` e ao ocultar a página. A sincronização é solicitada ao reconectar, focar, tornar a página visível, receber mudança local e a cada 30 segundos enquanto visível.

## Rotas válidas

`/navigation-catalog.json` é pré-renderizado no build e lista rotas canônicas para catálogo, concurso, conteúdo, cheat sheet, questões, leitura, configurações e simulados. Rotas externas, protocol-relative, com segmentos `.`/`..`, hashes ou formas não canônicas são rejeitadas.

O catálogo de navegação entra no precache versionado do PWA e também nos pacotes offline dos concursos. Quando o catálogo não está disponível, páginas de assunto ainda conseguem capturar o contexto indicado pelos atributos semânticos do layout, mas redirecionamentos remotos permanecem desabilitados.
