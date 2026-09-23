# Big data, análise de dados, <abbr title="Internet das Coisas">IoT</abbr> e cidades inteligentes

## Da medição à política

**Medir → contextualizar → analisar → decidir → avaliar.** Um sensor mede nível do rio; unidade, local, horário e fonte tornam o número interpretável; análise permite alerta; resultado da política depende também de comunicação, resposta e avaliação. Mais registros ou dispositivos não garantem melhor decisão.

| Organização | Gatilho | Cuidado |
|---|---|---|
| Dado estruturado | Campos e esquema previsíveis: tabela, cadastro. | Estrutura não prova correção. |
| Semiestruturado | Chaves ou marcações flexíveis, como <abbr title="JavaScript Object Notation">JSON</abbr>, <abbr title="Extensible Markup Language">XML</abbr> e *logs* (registros de eventos). | Pode exigir transformação para análise tabular. |
| Não estruturado | Texto livre, imagem, áudio ou vídeo sem esquema tabular de origem. | Conteúdo numérico ou textual em escala também pode resistir à organização em tabela. |
| Metadado | Descreve significado, unidade, fonte, período, método e atualização. | Sem ele, unir bases com campos parecidos pode alterar o sentido. |

**Qualidade é adequação ao uso:** acurácia = medição correta; completude = campos necessários presentes; consistência = regras/fontes compatíveis; atualidade = valor ainda útil; validade = formato/domínio esperado. **Cobertura** pergunta quem ficou de fora: uma amostra grande de usuários de aplicativo pode não representar a população. Medição ausente, campo desconhecido e valor **zero** são situações diferentes.

## Big data e análise: pergunta antes de ferramenta

*Big data* descreve escala, ritmo, diversidade ou complexidade que demandam técnicas adequadas; não tem limite universal em bytes. Os **5 Vs** são heurística, não lista legal fechada:

| Volume | Velocidade | Variedade | Veracidade | Valor |
|---|---|---|---|---|
| Quantidade | Ritmo de chegada e processamento | Fontes e formatos | Confiabilidade | Utilidade legítima da análise |

<abbr title="Internet das Coisas">IoT</abbr> pode aumentar **volume, velocidade e variedade** por novas fontes e fluxos. Alto volume com baixa veracidade produz erro em escala.

| Análise | Pergunta e alcance |
|---|---|
| Descritiva | **O que ocorreu?** Conta e compara eventos observados. |
| Diagnóstica | **Por que ocorreu ou com que fatores se relaciona?** Investiga hipóteses, sem provar automaticamente causa. |
| Preditiva | **O que pode ocorrer?** Estima sob dados e premissas, sem garantir o futuro. |
| Prescritiva | **Que ação recomendar sob metas e restrições?** Não cria orçamento ou competência. |

**Associação ≠ causa:** correlação mostra variação conjunta; atribuição causal exige enfrentar explicações alternativas. *Contrafactual* é o que provavelmente ocorreria sem a intervenção. Mesmo uma previsão correta não demonstra que a política produziu o resultado. Compare indicadores com definição, fonte, período, unidade, população, território e **denominador**: totais e taxas respondem perguntas diferentes.

| Etapa da política | Exemplo de alerta de enchente | O que ainda falta provar? |
|---|---|---|
| Insumo | Equipe e sensores. | Mobilização não é entrega. |
| Produto | Pontos monitorados e alertas emitidos. | Entrega não é efeito. |
| Resultado | Antecedência maior do aviso. | Mudança observada não atribui todo efeito à ação. |
| Impacto | Perdas reduzidas de forma sustentada e atribuível. | Exige avaliação e explicações alternativas. |

A <abbr title="Infraestrutura Nacional de Dados">IND</abbr> é contexto de integração no Executivo federal: metadados, significado comum, responsabilidades, segurança e acesso tornam intercâmbio útil. **Interoperabilidade** é a capacidade de trocar e utilizar informações; conexão técnica isolada não corrige qualidade nem autoriza todo uso de dados.

## <abbr title="Internet das Coisas">IoT</abbr>: identificar cada componente

O Decreto nº 9.854/2019 institui o Plano Nacional de Internet das Coisas: infraestrutura de serviços de valor adicionado com conexão física ou virtual de **coisas** (objetos físicos ou digitais identificáveis) a **dispositivos**, baseada em tecnologias de informação e comunicação e interoperabilidade. Dispositivo tem comunicação obrigatória; sensoriamento, atuação, coleta, armazenamento e processamento são capacidades opcionais. Aderir ao plano e aplicar sua disciplina federal não decorrem automaticamente da existência de um projeto estadual.

| Ponto do fluxo | Função e contraste |
|---|---|
| Sensor | Observa ou mede; não age fisicamente pela medição. |
| Atuador | Converte comando em ação física; um equipamento pode reunir sensor e atuador. |
| Conectividade | Transporta observação e comando; alcance, banda, latência (atraso), energia, custo e disponibilidade definem a escolha. |
| <abbr title="Equipamento intermediário que agrega dispositivos ou converte protocolos">Gateway</abbr> | Agrega ou converte comunicação; pode ser dispensado conforme a arquitetura. |
| <abbr title="Processamento próximo à fonte dos dados">Edge</abbr> | Trata dados perto do dispositivo; pode coexistir com nuvem/plataforma remota. |
| Plataforma | Integra, armazena, monitora ou analisa; não substitui decisão do serviço. |

**Telemetria** é medição enviada remotamente ao sistema; **comando** volta para ordenar ação. Sensor de rio que só grava localmente, sem comunicação em rede, não caracteriza sozinho uma solução conectada. <abbr title="Internet das Coisas">IoT</abbr> pode operar por regra fixa sem <abbr title="Inteligência Artificial">IA</abbr>. Em serviço físico, prever dispositivo identificado, acesso controlado, atualização, falha de rede/energia, leitura ausente e estado seguro.

## Cidade inteligente: resultado, inclusão e continuidade

A Carta Brasileira para Cidades Inteligentes é **orientação estratégica**, sem criar lei ou certificação: transformação digital junto ao desenvolvimento urbano sustentável, participação, inclusão, resiliência e uso responsável de dados. Sensores em mobilidade, saneamento ou defesa civil são meios. Verificar problema concreto, público alcançado, manutenção, sustentabilidade, resposta operacional e efeito avaliado; muitos sensores sem serviço acessível ou ação pública não bastam.

**Decisão de prova:** identifique a pergunta da análise, confirme qualidade/cobertura e o tipo de inferência; na <abbr title="Internet das Coisas">IoT</abbr>, encontre quem mede, quem comunica e quem atua; na cidade inteligente, procure benefício público demonstrável e público incluído.
