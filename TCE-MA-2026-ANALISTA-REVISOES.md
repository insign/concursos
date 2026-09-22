# TCE/MA 2026 — Analista Administração — regras da revisão de H/M

Issue operacional: <https://github.com/insign/concursos/issues/784>  
Concurso: `tce-ma-2026-analista-administracao` / `tcema-2026-adm`.

## 1. Finalidade e autoridade

Esta campanha revisa **cheat sheets (H)** e, ao fim de cada grupo direto, sua **mega revisão (M)**. O objetivo é recuperação rápida, precisão e acerto por minuto de estudo. `conteudo.md` é base comparativa já submetida à campanha pedagógica #755; não é alvo desta campanha.

A **issue undefined** é a única fonte de verdade para `pending/analyzing/done`, reserva, próxima ação e totais. Este arquivo não duplica o checklist e não mantém diário.

A `main`, `AGENTS.md`, schemas, catálogos, `grupo.json`, resolvedor, vínculos e ADRs definem estrutura, identidades e origens. Pedidos explícitos do usuário prevalecem.

## 2. Regra de trabalho

Cada ciclo conclui exatamente uma tarefa habilitada:
1. H do assunto, na ordem 1–153;
2. depois de todos os H de um grupo direto, M desse grupo;
3. só então o grupo seguinte.

Todos os H/M começaram `pending`; nenhum aceite da #755 foi herdado.

Antes de editar:
- releia a issue, este arquivo e `AGENTS.md`;
- resolva a origem física ou canônica e todos os consumidores atuais;
- leia aula, H, referências, questões e resoluções pertinentes;
- leia vizinhos apenas na extensão necessária a fronteiras;
- revalide na web pontos materiais em fontes primárias, respeitando corte e vigência;
- reserve a tarefa na issue com token, origem, consumidores, arquivos e SHA-base.

## 3. Critério de aceite de H

H pressupõe estudo anterior e deve ser curto, escaneável e autônomo como revisão. Deve recuperar o que a aula ensina sem virar uma segunda apostila nem introduzir fundamento indispensável inexistente em `conteudo.md`.

Preserve o que decide prova: mecanismos, contrastes, requisitos, exceções, prazos, fórmulas/condições, literalidade e jurisprudência pertinentes. Reordene e corte antes de ampliar.

Questões anteriores verificáveis e ainda pertinentes funcionam como **contraprova pedagógica**: o H deve permitir recuperar o conceito e compreender o raciocínio necessário, sem conter respostas prontas. Não há quota. Nova questão é secundária e só entra com fonte, pertinência e ganho real.

## 4. Critério de aceite de M

M integra o grupo: relações, contrastes confundíveis, mecanismos de decisão e pontos de alta recuperação. Não concatena H, não reensina as aulas e não é aceita automaticamente porque os H ficaram `done`.

Mega revisão canônica segue ADR-007: editar a origem uma vez para todos os consumidores, somente se o escopo resolvido continuar compatível. Mega revisão física permanece local.

## 5. Microglossário, fontes e tamanho

Aplicar integralmente as regras de `abbr` de `AGENTS.md`. Não marcar campos de texto puro, IDs, código, fórmulas, frontmatter ou transcrições de modo que revele resposta.

Fonte material nova exige suporte em `referencias.md`; fonte retirada e órfã deve sair. Diferencie publicação, consulta, vigência e corte. Não invente banca, questão, gabarito, norma, entendimento ou URL.

Redução é resultado válido. Crescimento líquido relevante exige dívida real e ganho proporcional. Não reporte métricas de tamanho como ritual.

## 6. Publicação

Sem branch/PR, testes, builds, CI ou checks salvo pedido explícito. Publique diretamente na `main` pelo conector GitHub em commit coerente; releia o commit e os arquivos antes de marcar `done`.

Se nenhuma mudança editorial for necessária, não crie commit vazio: registre o SHA vigente e o aceite na issue.

## 7. Registro mínimo e poda obrigatória

**Este arquivo é operacional e descartável; não é diário.**

Não adicionar:
- relato por execução;
- diffs;
- listas de páginas consultadas;
- inventários de blobs por tarefa;
- reservas encerradas;
- tabelas questão → trecho;
- métricas repetidas;
- narrativa de “o que foi feito” que não afete tarefas futuras.

Só conservar aqui:
- regras que valem para várias tarefas;
- decisões estruturais ainda necessárias;
- dependências/bloqueios ainda abertos;
- notas necessárias à futura M do grupo atual.

Ao trocar de assunto, **apague notas transitórias resolvidas do assunto anterior**. Ao concluir M, apague notas daquele grupo que já foram consumidas. O histórico detalhado fica no Git.

## 8. Mapa estável dos grupos

| M | Bloco | Grupo | H |
|---|---|---|---|
| M01 | Conhecimentos gerais | Língua Portuguesa | H001–H018 |
| M02 | Conhecimentos gerais | Competências Digitais e Informática Aplicada ao Setor Público | H019–H035 |
| M03 | Conhecimentos gerais | Raciocínio Lógico | H036–H045 |
| M04 | Conhecimentos gerais | Controle Externo | H046–H054 |
| M05 | Conhecimentos gerais | Legislação Específica | H055–H072 |
| M06 | Conhecimentos gerais | História e Geografia do Estado do Maranhão | H073–H094 |
| M07 | Conhecimentos gerais | Noções de Direitos Humanos | H095–H102 |
| M08 | Conhecimentos específicos | Administração Pública | H103–H114 |
| M09 | Conhecimentos específicos | Administração de Recursos Materiais e Patrimoniais | H115–H123 |
| M10 | Conhecimentos específicos | Gestão de Contratos | H124–H137 |
| M11 | Conhecimentos específicos | Governo Eletrônico, Transparência e Controle Social | H138–H141 |
| M12 | Conhecimentos específicos | Gestão de Pessoas | H142–H153 |

A ordem H coincide com `order: 1–153` do concurso na `main`. Caminhos, `storageId`, origem e consumidores **não são congelados neste arquivo**: re-resolva-os da `main` ao selecionar a tarefa. Isso evita deriva e mantém este arquivo pequeno.

## 9. Situação inicial

Inicialização em 22/09/2026: 153 H + 12 M, todos `pending`. Próxima tarefa: H001. Sem reserva ativa registrada neste arquivo; reservas existem somente na issue.
