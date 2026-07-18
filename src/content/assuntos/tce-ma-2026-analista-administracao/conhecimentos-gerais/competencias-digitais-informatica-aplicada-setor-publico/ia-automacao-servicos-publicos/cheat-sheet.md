# Inteligência artificial e automação de serviços públicos

Corte: **18/07/2026**.

## Mapa essencial

| Conceito | Regra curta |
|---|---|
| automação | tecnologia executa tarefa com pouca ou nenhuma intervenção em cada ocorrência |
| algoritmo | sequência finita de instruções para resolver problema |
| IA | infere, a partir de entradas, como gerar previsão, conteúdo, recomendação ou decisão |
| aprendizado de máquina | extrai padrões de dados em vez de programar cada regra individualmente |
| IA generativa | cria conteúdo novo com base em padrões aprendidos |
| chatbot | interface conversacional, com regras, recuperação, IA ou combinação |

- Automação não é sinônimo de IA.
- Todo sistema de IA usa algoritmos; nem todo algoritmo é IA.
- RPA pode apenas imitar cliques e preencher sistemas por regras fixas.
- Automatizar processo ruim acelera seus defeitos.

## Automação

| Técnica | Função |
|---|---|
| workflow/BPM | coordena etapas, regras, responsáveis e exceções |
| script ou macro | executa comandos definidos |
| RPA | imita ações humanas em interfaces |

Sequência recomendada:

1. mapear jornada;
2. eliminar exigências desnecessárias;
3. definir entradas, responsáveis e exceções;
4. verificar base legal;
5. escolher o grau de automação.

## Tipos de IA

| Tipo | Saída típica |
|---|---|
| classificatória | categoria ou intenção |
| preditiva | probabilidade ou estimativa |
| recomendação | opção sugerida para ação |
| generativa | texto, imagem, áudio, vídeo ou código novo |

- Probabilidade não é certeza.
- Geração não é recuperação de fato verdadeiro.
- Apoio ≠ triagem ≠ recomendação ≠ decisão automatizada.
- Chamar uma saída de “sugestão” não evita decisão de fato quando há confirmação mecânica.
- **Viés de automação** = confiança excessiva na saída do sistema.

## LLM e IA generativa

| Termo | Significado |
|---|---|
| LLM | grande modelo que aprende relações estatísticas em linguagem |
| token | unidade de texto processada pelo modelo |
| treinamento | ajuste dos parâmetros com base em dados e objetivo |
| ajuste fino | treinamento adicional para domínio ou comportamento específico |
| inferência | geração de saída para nova entrada |
| janela de contexto | quantidade limitada de informação considerada na interação |

- Inserir texto no prompt não equivale necessariamente a treinar o modelo.
- O provedor pode reter ou reutilizar entradas conforme contrato e configuração.
- Variação estatística não vira verdade com baixa temperatura.
- Histórico de chatbot não é registro oficial do processo.

## Prompt

Um prompt útil especifica:

1. tarefa;
2. contexto e público;
3. dados autorizados;
4. restrições;
5. formato;
6. critérios e tratamento da incerteza.

- Refinar prompt melhora a chance de boa resposta; não elimina revisão.
- Nunca inserir dado pessoal, sensível ou sigiloso sem necessidade e ambiente aprovado.
- Pedir ao mesmo modelo para conferir a própria resposta não é validação independente.

## Alucinação e RAG

**Alucinação** = saída plausível, mas falsa, não sustentada ou incoerente com a fonte.

Mitigações:

- restringir fontes;
- exigir trechos de apoio;
- permitir “não sei”;
- verificar no original;
- testar perguntas sem resposta;
- revisar conteúdo de impacto;
- atualizar acervo.

**RAG**:

1. busca trechos em acervo;
2. inclui trechos no contexto;
3. gera resposta;
4. pode exibir fontes.

- RAG fornece contexto no momento da resposta.
- RAG não equivale necessariamente a treinamento.
- RAG não garante que o trecho recuperado seja relevante ou vigente.
- Referência exibida pode não sustentar a frase.
- RAG reduz alguns riscos; não elimina alucinação.

## Chatbots

| Tipo | Operação |
|---|---|
| regras | opções e árvore predefinidas |
| recuperação | resposta pronta da base |
| linguagem | identifica intenção e entidades |
| generativo | compõe resposta em linguagem natural |
| híbrido | combina regras, busca e geração |

- Chatbot não é sinônimo de IA generativa.
- IA generativa também pode existir fora de chatbot.
- Separar informação geral, informação pessoal autenticada e ato administrativo.
- Chatbot pode orientar; competência para decidir continua humana/institucional conforme a norma.

O usuário deve saber:

- que interage com sistema automatizado;
- finalidade e limites;
- quais dados não inserir;
- como alcançar canal humano;
- como contestar erro.

- Não fingir que o bot é pessoa.
- Não bloquear o serviço quando o bot falha.
- Oferecer fallback humano ou canal alternativo.
- Digital não significa exclusivamente digital.

## Linguagem e acessibilidade

- Lei nº 15.263/2025: Política Nacional de Linguagem Simples.
- Usar frases diretas, termos explicados, informação principal primeiro e instruções em etapas.
- Linguagem simples não autoriza alterar regra jurídica.
- Acessibilidade envolve interface, conteúdo e transferência.
- Compatibilidade com teclado e tecnologia assistiva, rótulos claros, contraste e alternativas continuam necessárias.

## Casos de uso

| Uso | Controle principal |
|---|---|
| conferência formal | validar entrada e tratar exceção |
| triagem | medir erros e encaminhar incerteza |
| minuta ou resumo | revisão factual e responsabilidade do autor |
| busca institucional | fonte, vigência e resposta “não encontrada” |
| personalização | necessidade, opção e não discriminação |
| atendimento | transparência, acessibilidade e fallback |

- Triagem não deve virar indeferimento oculto.
- Ferramenta não adquire competência para praticar ato.
- Benefícios são potenciais, não automáticos.
- Automação aumenta a escala da eficiência e do dano.

## Uso responsável

### Finalidade e legalidade

- Começar pelo problema público, não pela tecnologia.
- Comparar IA com simplificação e regra fixa.
- Exigir necessidade, adequação e proporcionalidade.
- Tecnologia não cria competência, requisito ou base legal.
- Órgão responde por atos próprios e de contratados.

### Equidade

Riscos:

- histórico enviesado;
- grupo sub-representado;
- variável substituta de atributo protegido;
- objetivo inadequado;
- erro desigual;
- barreira de idioma, acesso ou acessibilidade.

- Acurácia média pode esconder dano concentrado.
- Igual tratamento aparente pode produzir impacto desproporcional.

### Transparência e explicabilidade

Transparência proporcional pode informar:

- uso de IA;
- finalidade e responsável;
- fontes e dados relevantes;
- papel na decisão;
- limites;
- critérios gerais;
- revisão e contestação.

- Transparência útil não exige expor código integral, segredo ou dado pessoal.
- Explicação útil mostra fator, fonte, etapa automática, responsável e correção possível.
- “O algoritmo decidiu” não explica.

### Rastreabilidade e accountability

Registrar proporcionalmente:

- versão e configuração;
- fonte;
- data e contexto;
- saída;
- revisão e decisão;
- incidente e correção.

- Logs também exigem minimização, segurança e retenção.
- Prestação de contas = demonstrar controles e assumir responsabilidade.
- Fornecedor não absorve a responsabilidade pública.

### Supervisão humana

Exige pessoa:

- capacitada;
- informada;
- com tempo;
- com autoridade para discordar;
- capaz de interromper e corrigir.

Clique formal em “aprovar” não garante supervisão efetiva.

## LGPD e IA

Princípios:

- finalidade;
- adequação;
- necessidade;
- livre acesso;
- qualidade;
- transparência;
- segurança;
- prevenção;
- não discriminação;
- responsabilização e prestação de contas.

No Poder Público:

- finalidade pública e interesse público;
- competências e atribuições legais;
- consentimento não é a única base;
- não há autorização para uso indiscriminado.

Antes de usar ferramenta externa, verificar:

- dado pessoal, sensível ou sigiloso;
- necessidade;
- ambiente aprovado;
- retenção;
- treino pelo provedor;
- local de processamento;
- acesso;
- exclusão e término.

### Art. 20 da LGPD

Direito de solicitar revisão quando a decisão:

1. usa dados pessoais;
2. é tomada **unicamente** por tratamento automatizado;
3. afeta interesses do titular.

- Inclui decisões para definir perfis indicados na lei.
- Controlador informa critérios e procedimentos, preservados segredos comercial e industrial.
- ANPD pode auditar aspectos discriminatórios se houver recusa por segredo.
- Texto vigente não exige expressamente revisão por pessoa natural.

## Segurança

**Prompt injection**:

- direta: usuário envia instrução maliciosa;
- indireta: instrução vem de documento ou página recuperada.

Controles:

- tratar documento como dado, não comando;
- separar instrução e conteúdo;
- mínimo privilégio;
- restringir ferramentas;
- validar saída;
- limitar acesso e retenção;
- testar abuso.

- Entrada, arquivo, histórico, saída e log podem vazar informação.
- Saída gerada é conteúdo não confiável até validação.
- Não executar automaticamente código, consulta, comando ou link gerado.
- Red teaming testa fuga de instruções, extração de dados, discriminação e abuso.
- Teste único antes do lançamento não basta.

## Conteúdo de terceiros

- Verificar autorização, licença, atribuição e risco de reprodução.
- Conferir autenticidade de imagem, áudio e documento.
- Citação plausível pode ser inventada.
- Imagem sintética não é registro real.
- Conteúdo oficial exige revisão e controle de versão.

## Ciclo de vida

| Etapa | Controle |
|---|---|
| problema | necessidade e público |
| alternativas | IA versus simplificação/regra |
| risco | direitos e grupos afetados |
| dados/fontes | legitimidade, qualidade, atualidade |
| aquisição | responsabilidades, auditoria e saída |
| teste | precisão, equidade, acessibilidade e segurança |
| piloto | escopo limitado e canal alternativo |
| implantação | informação e preparação |
| monitoramento | desempenho, reclamação, incidente e mudança |
| desativação | dados, integrações e comunicação |

Inventário registra finalidade, responsável, fornecedor, versão, população, dados, autonomia, risco, testes e canal de incidente.

Classificação de risco define intensidade de controle; baixo risco não dispensa legalidade e segurança.

Avaliação de impacto algorítmico:

- contexto e finalidade;
- pessoas e direitos;
- alternativa menos arriscada;
- erro e discriminação;
- supervisão e contestação;
- privacidade e segurança;
- métricas e limites;
- decisão de usar, restringir ou não usar.

Não se confunde necessariamente com relatório de impacto da LGPD.

## Contratação

Prever:

- escopo e nível de serviço;
- responsabilidades;
- origem e uso de dados;
- retenção, localização e subcontratados;
- segurança, incidente e auditoria;
- mudança de modelo;
- documentação e explicação;
- portabilidade e reversibilidade;
- continuidade e término;
- direitos sobre entrada e saída.

Terceirizar tecnologia não terceiriza responsabilidade pública.

## Testes e métricas

Testar:

- caso comum, raro e limítrofe;
- pergunta sem resposta;
- erro de digitação e variação linguística;
- grupos e acessibilidade;
- manipulação;
- fonte desatualizada;
- falha de integração;
- fallback humano.

| Dimensão | Indicador |
|---|---|
| efetividade | resolução, conclusão e retrabalho |
| qualidade | precisão, fonte e inadequação |
| equidade | diferenças de erro e abandono |
| experiência | satisfação, compreensão e esforço |
| eficiência | tempo e custo, incluindo revisão |
| segurança | incidentes e acessos indevidos |
| continuidade | disponibilidade e recuperação |

- Velocidade não prova resolução.
- Falso positivo = marcou classe inexistente no caso.
- Falso negativo = não identificou classe existente.
- Custo de cada erro depende do contexto.
- Deriva = mudança em dados, população, linguagem, processo ou relação que reduz desempenho.
- Mudança do modelo exige revalidação.

## Qualidade do serviço digital

Sete eixos da SGD:

1. facilidade;
2. comunicação;
3. atendimento;
4. experiência unificada;
5. acessibilidade;
6. privacidade e segurança;
7. escuta ativa.

IA deve ser avaliada dentro da jornada, não como demonstração isolada.

## Situação normativa no corte

| Fonte | Situação |
|---|---|
| Constituição, LGPD e leis de serviço/governo digital | normas vigentes aplicáveis conforme o caso |
| Portaria MGI nº 3.485/2026 | política no âmbito delimitado do MGI e ColaboraGov.br |
| PL nº 2.338/2023 | projeto em tramitação, não lei vigente |
| guias SGD, OCDE, UNESCO e NIST | orientação técnica; natureza distinta de lei |

- Não havia lei geral de IA em vigor em 18/07/2026.
- Não generalizar portaria institucional para todos os entes e Poderes.
- Regra do PL só é proposta enquanto não convertida em lei.

## Pegadinhas-relâmpago

- automação ≠ IA;
- RPA ≠ IA obrigatória;
- algoritmo ≠ IA obrigatória;
- chatbot ≠ IA generativa obrigatória;
- geração ≠ verdade;
- prompt melhor ≠ validação;
- RAG ≠ treinamento;
- RAG ≠ fim da alucinação;
- triagem ≠ indeferimento;
- sugestão formal ≠ supervisão real;
- transparência ≠ exposição irrestrita;
- explicação ≠ “o algoritmo decidiu”;
- consentimento ≠ única base pública;
- art. 20 ≠ toda automação;
- art. 20 vigente ≠ revisão expressamente humana;
- documento recuperado ≠ instrução confiável;
- acurácia média ≠ equidade;
- rapidez ≠ resolução;
- canal digital ≠ fim do presencial;
- contratação ≠ transferência de responsabilidade;
- Portaria MGI ≠ lei nacional;
- PL nº 2.338/2023 ≠ lei vigente.
