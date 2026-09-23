# Inteligência artificial e automação de serviços públicos

## Primeiro: tarefa, tecnologia, efeito

**Problema público → processo → dados necessários → mecanismo → efeito → controle.** Automatizar requisito inútil só acelera retrabalho. Separe a unidade executada da decisão que produz efeito: triagem de pedidos não decide o mérito; minuta gerada não é ato do agente competente.

| Mecanismo | Reconheça pelo funcionamento | Limite decisivo |
|---|---|---|
| Regra determinística | Condição expressa aciona passo previsto. | Automação não implica <abbr title="Inteligência Artificial">IA</abbr>. Algoritmo é sequência de instruções, não sinônimo de modelo. |
| <abbr title="Automação Robótica de Processos">RPA</abbr> | Software reproduz cliques, consultas e preenchimentos em interfaces. | Pode dispensar <abbr title="Inteligência Artificial">IA</abbr>; exige credencial restrita, exceções e monitoramento. Robô assistido é iniciado pelo usuário; isso difere da execução autônoma não assistida. |
| <abbr title="Gestão de Processos de Negócio">BPM</abbr> | Modela, analisa e melhora o fluxo de ponta a ponta. | Pode incluir <abbr title="Automação Robótica de Processos">RPA</abbr> em tarefas discretas; melhora do processo e automação da tarefa não se excluem. |
| <abbr title="Aprendizado de Máquina">ML</abbr> | Modelo ajusta padrões com dados para classificar ou prever. | Não é regra escrita individualmente para cada situação; erro e viés dependem dos dados. |
| <abbr title="Inteligência Artificial">IA</abbr> generativa | Modelo produz texto, imagem, áudio, vídeo ou código a partir de padrões. | Saída plausível é insumo; requer fonte, revisão e responsável pelo efeito. |

**Camadas:** modelo treinado produz saída; sistema reúne modelo, dados, interface, integrações, regras e controles; serviço acrescenta competência, procedimento, atendimento e revisão. Chamar uma recomendação de “apoio” não reduz o risco se ela for automaticamente seguida. O controle cresce com o efeito em benefício, sanção, prioridade ou serviço essencial.

## Gerar não é verificar

**Treinamento** ajusta parâmetros do modelo; **inferência** usa o modelo para nova entrada; **ajuste fino** adapta parâmetros depois do treinamento inicial. Um <abbr title="Grande Modelo de Linguagem">LLM</abbr> processa *tokens* (unidades de texto ou símbolo), usa janela de contexto limitada e pode gerar conteúdo fluente sem verdade ou atualidade. **Temperatura** regula variabilidade da geração; reduzi-la não valida fatos. Fornecer documento na interação não retreina necessariamente o modelo; retenção e reúso de entradas dependem do ambiente e contrato.

| Gatilho | Decisão de revisão |
|---|---|
| *Prompt* (instrução e contexto) pede uma minuta | Exigir fonte e escopo; conferir norma, fatos e versão final. Mesmo modelo revendo a própria saída não faz verificação independente. |
| *Alucinação* (afirmação ou citação sem suporte) | Fluência e citação aparente não provam correção: confrontar trecho, fundamento e vigência em fonte oficial. |
| <abbr title="Geração Aumentada por Recuperação">RAG</abbr> busca no acervo | Trecho recuperado entra no contexto sem alterar parâmetros. Conferir documento correto, atualização do índice, vigência, correspondência da citação e acesso permitido. Fonte autêntica revogada ou instrução maliciosa no documento continua inadequada. |
| *zero-shot* / *few-shot* / *chain-of-thought* | Respectivamente sem exemplos, com poucos exemplos, e pedido de decomposição em etapas no *prompt*. *Zero-shot chain-of-thought* combina ausência de exemplos e decomposição; nenhuma técnica garante verdade. |

## Atendimento, decisão e direitos

**Chatbot é interface**, por menus e regras, respostas cadastradas, recuperação ou geração; não designa por si <abbr title="Grande Modelo de Linguagem">LLM</abbr>. Informação geral pede fonte vigente; acesso pessoal pede autenticação **e** autorização; protocolo pede confirmação; alteração cadastral pede autorização, confirmação e registro; recomendação/decisão pedem critério, competência e contestação. Informar automação, finalidade, limites, responsável e canal humano. *Fallback* é rota alternativa quando falta compreensão, fonte ou segurança: reconhecer limite e encaminhar sem inventar.

**Transparência** mostra finalidade, uso e responsável; **explicabilidade** apresenta fatores, fontes ou critérios pertinentes; **rastreabilidade** permite reconstruir entradas, versão, saída, intervenção e decisão. Não são sinônimos de abrir todo código. Supervisão efetiva exige tempo, acesso às fontes, capacitação e poder de corrigir ou interromper; confirmação formal em massa pode ser viés de automação. *Human-in-the-loop* revisa antes do efeito; *human-on-the-loop* monitora e intervém; *human-out-of-the-loop* opera sem intervenção individual.

Na <abbr title="Lei Geral de Proteção de Dados Pessoais">LGPD</abbr>, finalidade, necessidade, transparência, segurança, prevenção, não discriminação e prestação de contas se aplicam ao tratamento: dado publicado na web continua podendo ser pessoal. **Art. 20:** titular pode pedir revisão de decisão tomada **unicamente** com base em tratamento automatizado de dados pessoais que afete seus interesses; informações claras sobre critérios e procedimentos, resguardados segredos comercial e industrial. O texto vigente não exige expressamente revisor pessoa natural; revisão humana pode ser salvaguarda conforme risco. Alta acurácia média pode ocultar falsos positivos/negativos por grupo, representatividade ruim e variável substituta de atributo protegido.

Órgão e agentes continuam responsáveis por finalidade, fundamento, checagem e ato final, mesmo com fornecedor ou modelo. Para dados pessoais, sensíveis ou sigilosos em ferramenta externa, avaliar regime, mínimo necessário, política, retenção e ambiente autorizado; acesso gratuito não comprova confidencialidade. Credenciais não são contexto comum.

## Segurança e governança: onde o controle falha?

**Injeção de instruções** (*prompt injection*) pode vir do usuário ou de documento/página recuperada: tratar texto externo como dado, sem lhe delegar autoridade. Em assistente com ferramentas ou agente que planeja ações, limitar privilégios, operações e parâmetros; confirmar ação sensível, registrar, permitir interrupção e reversão. Gerar comando não autoriza executá-lo.

**Inventariar → avaliar impacto → testar → operar → monitorar → corrigir/suspender.** Inventário aponta finalidade, responsável, versão, dados, integrações, efeitos e controles; avaliação algorítmica examina erros, direitos e risco residual sem substituir o <abbr title="Relatório de Impacto à Proteção de Dados Pessoais">RIPD</abbr>. Teste casos raros, grupos, acesso, fonte desatualizada e rota humana; acompanhe erro, abandono, retrabalho e equidade do serviço real. *Deriva* é perda de desempenho quando dados, norma ou ambiente mudam.

**Corte e âmbito:** edital nº 1 datado de 6/7/2026, publicado segundo o Tribunal em **7/7/2026**; legislação cuja vigência começou até a publicação, ressalvada inclusão expressa de não vigente no objeto. Portaria <abbr title="Ministério da Gestão e da Inovação em Serviços Públicos">MGI</abbr> nº 3.485/2026 disciplina o próprio ministério, não todo tribunal. <abbr title="Projeto de Lei">PL</abbr> nº 2.338/2023 ainda tramita, sem força de lei. Portaria <abbr title="Secretaria de Governo Digital">SGD</abbr>/<abbr title="Ministério da Gestão e da Inovação em Serviços Públicos">MGI</abbr> nº 5.921/2026 foi publicada depois do edital e teve vigência em 1º/9/2026 no recorte contratual federal; não retroage ao corte.
