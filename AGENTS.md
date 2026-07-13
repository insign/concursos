# Project Agent Guide

Status: guia operacional inicial e documento vivo.

## Autoridade e leitura obrigatória

- Leia este arquivo antes de alterar o projeto.
- Leia `final_plan.md` integralmente antes de iniciar ou retomar uma fase de implementação.
- `final_plan.md` é a fonte autoritativa dos requisitos, contratos, riscos aceitos e definição de pronto.
- Este arquivo resume o estado real e as regras operacionais que todo agente deve observar automaticamente.
- Se o código, este arquivo e `final_plan.md` divergirem, não escolha silenciosamente. Investigue o histórico e corrija a documentação na mesma mudança ou peça decisão ao usuário.

## Estado atual

- Repositório: `https://github.com/insign/concursos`.
- Branch padrão: `main`.
- Plano âncora: `bd4e73d`.
- Projeto: Astro 7 estático, npm e TypeScript strict.
- Domínio: `https://concursos.helio.me`.
- Cloudflare Pages: projeto `concursos`, URL `https://concursos-ebs.pages.dev`.
- O Pages já possui Git integration com `insign/concursos` e faz deploy de `main`.
- Build do Pages: `npm run build`.
- Diretório publicado: `dist`.
- O scaffold, o projeto Pages, a Git integration e o custom domain já existem. Não os recrie.
- O produto funcional ainda deve ser implementado conforme as fases restantes em `final_plan.md`.

## Comandos atuais

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

- Execute `npm run check` e `npm run build` após mudanças relevantes enquanto não houver suíte mais específica.
- Quando scripts de testes forem adicionados, registre-os aqui na mesma mudança.
- Use Wrangler v4 instalado no projeto para diagnóstico do Pages.
- Não use `wrangler pages project create`: isso criaria um projeto Direct Upload separado e sem a Git integration existente.

## Restrições técnicas

- Preserve saída Astro totalmente estática.
- Use npm e mantenha `package-lock.json` sincronizado.
- Preserve TypeScript strict.
- Não adicione React, Vue, Svelte, Tailwind, Axios ou estado global sem necessidade concreta e aprovação explícita.
- Use componentes Astro e JavaScript/TypeScript nativo para interatividade.
- Não adicione adapter Cloudflare enquanto o projeto permanecer estático.
- Não introduza backend, autenticação ou CMS fora do escopo aprovado.
- Prefira a menor mudança correta e preserve a arquitetura descrita no plano.

## Conteúdo e rotas

- A hierarquia canônica é concurso -> assunto.
- Cada assunto terá conteúdo completo, cheat sheet e questões.
- Conteúdo e cheat sheet ficam em Markdown; questões ficam em JSON.
- Use Astro Content Collections e schemas para validar o catálogo no build.
- Preserve IDs e `storageId` estáveis; nunca use posição de array como identidade.
- Não duplique metadados que possam ser derivados de sua fonte canônica.
- Consulte `final_plan.md` para schemas, revisões, rotas e regras editoriais completas.

## KV, offline e sincronização

- O endpoint aprovado é `https://kv.helio.me`.
- A API é pública, sem autenticação, last-write-wins e usa PUT de documento completo.
- Nunca envie `Authorization`, credenciais ou dados sensíveis.
- Nunca faça PUT parcial nem trate CORS como autorização.
- Valide todo JSON remoto antes de usá-lo.
- Nunca coloque respostas da API KV no Cache Storage do Service Worker.
- IndexedDB é a persistência local para respostas e outbox; `localStorage` não substitui a outbox.
- Preserve o coordenador único, merge por questão e remote-wins descritos no plano.
- Não declare sincronização perfeita, pois a API não possui compare-and-set.

## PWA e Cloudflare

- Preserve a Git integration e o deploy automático existentes.
- Use previews do Pages durante a implementação.
- Mantenha `concursos.helio.me` e `concursos-ebs.pages.dev` com `noindex, nofollow`.
- `noindex` não oferece privacidade.
- O tráfego KV deve permanecer NetworkOnly no Service Worker.
- Downloads de concurso devem ser atômicos e preservar o cache anterior em caso de falha.
- Atualizações automáticas só podem recarregar depois que o estado local estiver durável.
- Valide PWA, Service Worker, CSP, caches, TLS e headers no domínio real antes de concluir.

## Segurança

- Nunca commite `.env`, tokens, credenciais ou segredos.
- Não exponha credenciais da Cloudflare ou GitHub em comandos, logs, bundle ou documentação.
- Mantenha Mermaid em `securityLevel: "strict"`.
- Preserve `X-Robots-Tag: noindex, nofollow` e a meta tag equivalente.
- CSP deve permitir apenas as origens necessárias, incluindo `https://kv.helio.me` em `connect-src`.
- Trate o alias do usuário como identificador público, não como conta ou segredo.

## Git e validação

- Trabalhe em `main`, salvo instrução explícita diferente.
- Antes de editar, leia o status, o diff, os commits recentes e o plano ativo.
- Nunca reverta ou sobrescreva mudanças do usuário ou de outros agentes.
- Faça commits e push somente quando autorizados pelas regras da sessão ou pelo usuário.
- Antes de um commit, revise o diff completo, execute os checks aplicáveis e não inclua arquivos não relacionados.
- Após push, confirme o deployment automático do Pages quando a mudança afetar produção.

## Manutenção deste arquivo

Este `AGENTS.md` é um documento vivo, não um snapshot descartável.

Atualize-o na mesma mudança quando ocorrer qualquer alteração relevante em:

- comandos ou scripts;
- dependências estruturais;
- diretórios, módulos ou entry points;
- fontes canônicas de dados;
- schemas e formatos persistidos;
- invariantes de KV, IndexedDB ou sincronização;
- estratégia PWA e caches;
- testes e gates obrigatórios;
- build, deploy, domínio ou headers;
- segurança, escopo ou restrições arquiteturais.

Não atualize este arquivo para detalhes locais que não orientem trabalho futuro.

Ao concluir cada fase de `final_plan.md`:

1. Compare a implementação real com este arquivo.
2. Atualize regras e comandos que mudaram.
3. Registre novas invariantes que futuros agentes precisam preservar.
4. Remova instruções superadas.
5. Valide que todos os caminhos e comandos citados existem.

A última fase do projeto deve fazer uma revisão integral deste arquivo contra o código, testes, deployment e documentação reais. O projeto não está concluído enquanto o `AGENTS.md` estiver desatualizado.

## Fora de escopo

- Autenticação e autorização.
- Privacidade garantida.
- Backend Astro.
- CMS visual.
- Histórico de tentativas.
- Ranking e comentários.
- Migração automática entre aliases.
- Resolução perfeita de concorrência.

Consulte `final_plan.md` para a especificação completa e para qualquer decisão não resumida aqui.
