# Sincronização de navegação e posição de leitura

## Documentos remotos

Cada alias possui um documento de navegação **por concurso**:

```text
concursos--<alias>--navegacao--<concurso>
```

O JSON usa `schemaVersion: 2` e contém o `contestStorageId`, um cursor (última
navegação naquele concurso, qualquer aba), um ponto retomável por assunto em
`points` e invalidações explícitas em `cleared` (assunto estudado). Não há
limite de quantidade nem poda: cada assunto guarda seu ponto mais avançado. A
`version` que decide conflitos pertence ao envelope retornado pelo KV;
`updatedAt` não é relógio de concorrência.

## Regra de conflito

Cada documento de concurso usa last-write-wins no envelope, com **mesclagem
por assunto** no conteúdo:

1. a versão remota maior é adotada como base;
2. pontos de assuntos distintos coexistem (união);
3. no mesmo assunto vale o avanço máximo (`maxReadingPosition`);
4. invalidação mais recente vence ponto mais antigo e vice-versa; a lápide é monotônica (nunca regride carimbo existente, `updatedAt` do ponto nem `updatedAt` do cursor do próprio assunto);
5. em versões iguais, uma outbox local pendente é publicada;
6. em versões iguais sem pendência, não há operação;
7. mudança de `created_at` ou regressão de versão identifica uma nova criação remota; com registro local limpo, o documento remoto é adotado **sem mesclar** a linhagem antiga (recriação deliberada);
8. a ausência remota não ressuscita cópia local limpa, mas alteração pendente pode recriar o documento;
9. uma escrita local feita durante um PUT permanece pendente para a próxima rodada;
10. saltos de versão são registrados como aviso porque a API não oferece CAS nem histórico.

A aplicação de uma resposta remota ao IndexedDB compara também a versão e a
data de criação que existiam quando a requisição começou. Uma resposta
atrasada não pode regredir um snapshot remoto mais novo. Conflitos entre
concursos distintos não existem por construção (documentos separados).

## Persistência local

A navegação usa o IndexedDB `concursos-navigation`, store `navigationContests`
(chave `perfil::concurso`, índice por perfil), separado do banco editorial
`concursos-offline`. A separação permite evoluir o estado transitório sem bloquear a migração do banco que armazena respostas, progresso, preferências, downloads e simulados.

Cada registro guarda `current`, `base`, `remoteVersion`, `remoteCreatedAt`, `outboxState`, erros, próxima tentativa, versão remota rejeitada, aviso de conflito e revisão local. Falhas repetidas recebem backoff exponencial limitado a 60 segundos, respeitado por shard no bootstrap, no preflight e na aplicação; uma mesma versão remota inválida é quarentenada somente uma vez por documento de concurso.

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

O controle **Voltar ao topo** mantém o ponto anterior: o runtime descarta os eventos do salto nativo para `#study-top` e permanece estacionado no destino, impedindo que `pagehide`, flushers ou capturas periódicas salvem o início. A primeira rolagem posterior encerra essa proteção e volta ao debounce normal; se o usuário interromper a animação antes do topo, a posição final manual é capturada. Hash, foco e histórico continuam sob o comportamento nativo do navegador.

Na aba de questões, o contexto visível é a âncora principal. O runtime aguarda o questionário concluir a montagem, materializa páginas ou blocos adicionais conforme o layout e não aplica depois um segundo scroll genérico de leitura.

## Retomada entre aparelhos

Na primeira entrada da sessão pela rota raiz `/`, a raiz permanece carregada e o runtime exibe a oferta explícita quando o ponto mais recente entre concursos aponta para outra rota. **Retomar ponto mais recente** sai da raiz e carrega o destino salvo; **Continuar aqui** mantém `/` carregada sem publicar nada (rotas fora de concurso não persistem). Deep links e toda navegação explícita prevalecem e não são substituídos. Quando o destino exige navegação, uma autorização de rota pendente é consumida uma única vez no destino para restaurar o contexto e a rolagem.

A retomada explícita empilha o destino no histórico em vez de substituir a entrada da raiz. Voltar depois da retomada devolve o usuário ao catálogo, e não para fora do site nem para uma pilha vazia na PWA; depois da escolha, `/` permanece carregado sem reaplicar a oferta.

Recarregar `/` antes da escolha reexibe a oferta em vez de publicar a raiz sobre o ponto salvo. Reload, voltar/avançar, Service Worker, reconexão, foco e visibilidade não reaplicam a oferta inicial. Depois que a sessão está ativa, uma versão remota mais nova nunca sequestra a navegação: aparece um aviso com **Retomar ponto mais recente** e **Continuar aqui**. O botão **Retomar ponto mais recente** continua sendo a ação explícita para adotar um ponto remoto; **Continuar aqui** força a persistência do ponto local antes da sincronização.

Na página principal de um concurso, **Resumir leitura** fica disponível quando aquele concurso tem ponto retomável (o mais recente primeiro), seguida da lista dos demais assuntos em andamento com percentual. A captura automática do catálogo daquele concurso atualiza apenas o cursor, sem tocar nos pontos; abrir a raiz, outro concurso ou outra aba continua atualizando a última navegação normalmente. O CTA aguarda o bootstrap remoto do perfil inicializado pelo runtime, grava a mesma autorização de rota pendente e força `#focus`, mesmo que `readingMode` estivesse falso. O destino consome a autorização e aplica a restauração semântica existente. Sem alias ou sem ponto naquele concurso, o controle permanece oculto. Nos cartões do catálogo, o link de leitura de um assunto com ponto vira **Retomar leitura (N%)** e também grava a autorização pendente.

Marcar um assunto como concluído invalida somente o ponto daquele concurso e assunto (lápide sincronizada), preservando os demais. Enquanto a marca permanecer, capturas automáticas não recriam o ponto, inclusive após `pagehide` e em outras abas; desfazer a conclusão não recupera o ponto destruído, mas libera novas capturas. A limpeza é uma pendência própria da navegação, sincronizada separadamente do documento de estudados. Mensagens entre abas e snapshots remotos são revalidados contra o estado atual de estudados antes de limpar ou oferecer retomada.

## Eventos e frequência

A captura é debounced após rolagem, resize, controles relevantes e mudanças semânticas do modo de leitura. Também ocorre em `pagehide` e ao ocultar a página. A sincronização é solicitada ao reconectar, focar, tornar a página visível, receber mudança local e a cada 30 segundos enquanto visível.

## Durabilidade local

`src/lib/local-durability.ts` é o registro compartilhado de flushers e da revisão monotônica de atividade local. O debounce das preferências de leitura e as capturas semânticas de navegação registram seus flushers nesse registro.

Antes da ativação ou do reload automático da PWA, `src/lib/pwa-update.ts` executa duas rodadas de todos os flushers, cada uma seguida pelas duas barreiras de transações IndexedDB (`concursos-offline` e `concursos-navigation`), e repete o ciclo até a revisão global permanecer estável. Qualquer falha de persistência aborta a operação como erro de durabilidade recuperável.

A navegação aguarda a inicialização limitada, a restauração em andamento e capturas anteriores. A busca de `/navigation-catalog.json` tem timeout de 8 segundos; se falhar, a página continua com o contexto semântico local, mas não faz redirecionamentos remotos. Depois dessa espera, uma captura final local é gravada sem exigir sincronização com o KV. Um redirecionamento entre rotas em andamento também aborta um reload PWA concorrente.

## Rotas válidas

`/navigation-catalog.json` é pré-renderizado no build e lista rotas canônicas para catálogo, concurso, conteúdo, cheat sheet, questões, leitura, configurações e simulados. Rotas externas, protocol-relative, com segmentos `.`/`..`, hashes ou formas não canônicas são rejeitadas.

O catálogo de navegação entra no precache versionado do PWA e também nos pacotes offline dos concursos.
