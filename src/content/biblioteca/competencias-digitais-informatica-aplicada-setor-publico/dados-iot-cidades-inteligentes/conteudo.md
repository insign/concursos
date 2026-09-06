---
schemaVersion: 1
title: "Big data, análise de dados, IoT e cidades inteligentes"
description: Fundamentos, arquiteturas, análises e governança de dados aplicados a políticas públicas, Internet das Coisas e cidades inteligentes.
order: 34
storageId: dados-iot-cidades-inteligentes
---

# Big data, análise de dados, <abbr title="Internet das Coisas">IoT</abbr> e cidades inteligentes

Imagine uma prefeitura que acompanha o nível de rios para emitir alertas. **O sensor produz dados; o contexto transforma esses dados em informação; a análise tenta responder uma pergunta; e a decisão pública transforma a conclusão em ação.** Quando dispositivos conectados passam a observar o ambiente e trocar dados, entra a <abbr title="Internet das Coisas">IoT</abbr>. Quando esse uso tecnológico é orientado a problemas urbanos e resultados para as pessoas, entra a ideia de cidade inteligente.

Esse encadeamento evita quatro confusões frequentes: **mais dados não significam automaticamente melhor decisão; correlação não prova causalidade; <abbr title="Internet das Coisas">IoT</abbr> não exige <abbr title="inteligência artificial">IA</abbr>; e cidade inteligente não é a cidade com mais sensores.**

> **Corte de atualização:** 10 de agosto de 2026. O edital cobra **noções de big data e análise de dados para políticas públicas** e **Internet das Coisas (<abbr title="Internet das Coisas">IoT</abbr>) em cidades inteligentes**. O foco é conceitual e aplicado. Engenharia de dados avançada, governança específica de <abbr title="inteligência artificial">IA</abbr> e aprofundamentos de privacidade, ética e acessibilidade pertencem a outros recortes.

## 1. O fluxo que organiza o assunto

Quatro perguntas resolvem grande parte das questões:

1. **Que dado ou fenômeno está sendo observado?**
2. **Que pergunta a análise pretende responder?**
3. **Que conclusão os dados realmente sustentam?**
4. **Na <abbr title="Internet das Coisas">IoT</abbr>, quem observa, quem comunica e quem atua?**

A sequência mental é: **medir → contextualizar → analisar → decidir → avaliar o resultado**. Em soluções de <abbr title="Internet das Coisas">IoT</abbr>, acrescente ao fluxo os dispositivos e a comunicação que levam observações ao sistema e, quando houver, comandos de volta ao ambiente.

---

## 2. Dado, informação e qualidade

### 2.1 Dado e informação

**Dado** é uma representação de fato, medida, símbolo ou valor. **Informação** surge quando o dado é contextualizado ou processado de forma que possa ser interpretado para uma finalidade.

Exemplo hipotético:

- `82` isoladamente é um dado pouco informativo;
- `82 mm de chuva em seis horas no ponto X` já possui unidade, período e contexto;
- comparar a medição com histórico e limites de alerta pode apoiar uma decisão de defesa civil.

O processamento não torna uma conclusão automaticamente correta. Se o dado de origem estiver errado ou representar mal o fenômeno, a informação resultante também pode induzir a erro.

### 2.2 Formas de organização

| Tipo | Ideia central | Exemplos |
| --- | --- | --- |
| **estruturado** | campos e esquema previsíveis | tabelas, cadastros, transações |
| **semiestruturado** | possui chaves ou marcações flexíveis | <abbr title="JavaScript Object Notation">JSON</abbr>, <abbr title="Extensible Markup Language">XML</abbr>, logs |
| **não estruturado** | não nasce organizado em campos tabulares | texto livre, imagem, áudio, vídeo |

**Metadados** são dados que descrevem outros dados: significado, fonte, unidade, período, método, atualização e condições de uso. Eles ajudam alguém a descobrir uma base e a entender o que seus campos realmente significam.

> **Pegadinha:** dado estruturado não é sinônimo de dado correto. Estrutura facilita tratamento; não garante qualidade.

### 2.3 Qualidade e representatividade

Qualidade significa **adequação ao uso**. Dimensões úteis incluem:

- **acurácia:** o valor representa corretamente o fenômeno?
- **completude:** os campos necessários foram preenchidos?
- **consistência:** as fontes e regras não se contradizem indevidamente?
- **atualidade:** o dado ainda é válido para a decisão?
- **validade:** formato e domínio esperados foram respeitados?

Também é preciso verificar **representatividade**: a base cobre adequadamente a população ou o fenômeno sobre o qual se quer concluir? Muitos registros de um aplicativo podem descrever muito bem seus usuários e, ainda assim, representar mal quem não usa o aplicativo.

Outro cuidado: **ausência de dado não é zero**. Um sensor indisponível, um campo não informado e uma medição real igual a zero são situações diferentes. O tratamento incorreto de valores ausentes pode distorcer taxas, médias e alertas.

---

## 3. Noções de big data

### 3.1 Conceito

**Big data** refere-se a conjuntos e fluxos de dados cuja escala, ritmo, diversidade ou complexidade exigem técnicas e arquiteturas adequadas de armazenamento, processamento, integração e análise.

Não existe um tamanho universal a partir do qual uma base “vira” big data. A dificuldade depende do volume, da velocidade necessária, dos formatos, das fontes e do uso pretendido.

### 3.2 Os 5 Vs

Os **5 Vs** são uma heurística frequente para enxergar dimensões do problema:

| V | Pergunta | Exemplo público |
| --- | --- | --- |
| **volume** | quanto dado existe? | milhões de registros de atendimento |
| **velocidade** | em que ritmo chega e precisa ser tratado? | <abbr title="Medições enviadas remotamente por dispositivos">telemetria</abbr> de rios |
| **variedade** | quantos formatos e fontes precisam ser combinados? | tabelas, textos, imagens e sensores |
| **veracidade** | quão confiável é o dado? | cadastro consistente, sensor calibrado |
| **valor** | que utilidade legítima pode ser produzida? | alerta que reduz tempo de resposta |

Os 5 Vs não são requisito jurídico fechado. Algumas referências usam mais ou menos dimensões. Em prova, o importante é reconhecer o critério descrito no enunciado.

> **Pegadinha:** grande **volume** com baixa **veracidade** apenas permite produzir erros em escala.

### 3.3 Uso público

Big data pode apoiar:

- integração de fontes antes isoladas;
- detecção de padrões e anomalias;
- monitoramento mais tempestivo;
- previsão de demanda ou risco;
- segmentação territorial de políticas;
- avaliação e revisão de serviços.

O ganho depende de pergunta bem formulada, qualidade, cobertura, método e capacidade de agir sobre o resultado. **A tecnologia aumenta a capacidade de observar e processar; não elimina a necessidade de interpretar.**

---

## 4. Análise de dados para políticas públicas

Antes de escolher técnica, identifique a pergunta. A mesma base pode servir a análises diferentes conforme o que se deseja descobrir.

### 4.1 Quatro tipos de análise

| Tipo | Pergunta principal | Exemplo |
| --- | --- | --- |
| **descritiva** | o que ocorreu? | atendimentos por mês |
| **diagnóstica** | por que ocorreu ou com que fatores se relaciona? | investigar queda de cobertura |
| **preditiva** | o que provavelmente ocorrerá? | estimar demanda futura |
| **prescritiva** | que ação é recomendável sob metas e restrições? | sugerir alocação de equipes |

As categorias não formam uma escada obrigatória. Uma boa descrição pode ser mais útil do que uma previsão ruim.

**Predição** estima; não garante. **Prescrição** recomenda; não cria competência administrativa, orçamento ou autorização jurídica. A decisão continua sujeita ao contexto, às regras aplicáveis e à responsabilidade do agente competente.

### 4.2 Correlação e causalidade

**Correlação** indica associação entre variáveis. **Causalidade** exige sustentar que uma mudança produziu efeito em outra, considerando explicações alternativas.

Se acidentes diminuem depois de uma campanha, a sequência temporal não basta para provar que a campanha causou toda a redução. Podem existir sazonalidade, obras, fiscalização, mudança de tráfego ou tendência anterior.

A ideia de **contrafactual** organiza a pergunta causal: o que provavelmente teria ocorrido sem a intervenção? Quanto mais difícil responder a isso, mais cautela é necessária para atribuir efeito à política.

### 4.3 Indicadores e interpretação

Um indicador útil precisa de contexto:

- definição;
- fonte;
- período;
- unidade;
- população ou território de referência;
- limitações.

Comparar apenas totais entre cidades muito diferentes pode enganar. Uma taxa relaciona eventos a uma população ou exposição de referência. Por isso, o **denominador** pode mudar completamente a interpretação.

Também é preciso verificar:

- quem está representado e quem ficou fora;
- se houve mudança de definição ou método;
- se o instrumento de medição é confiável;
- se o período captura sazonalidade;
- se valores ausentes foram tratados corretamente.

### 4.4 Dados ao longo da política

Dados podem apoiar diagnóstico, desenho, implementação, monitoramento, avaliação e revisão. Para não confundir entrega com efeito, separe quatro níveis:

| Categoria | Ideia | Exemplo de alerta de enchente |
| --- | --- | --- |
| **insumo** | recurso mobilizado | equipe e sensores |
| **produto** | entrega imediata | pontos monitorados e alertas emitidos |
| **resultado** | mudança observada no serviço ou público | aviso com maior antecedência |
| **impacto** | efeito amplo atribuível à política | redução sustentada de perdas |

Instalar sensores prova que houve **produto**, não que houve **impacto**. Para falar em impacto, é preciso avaliar efeitos e sustentar a atribuição, e não apenas contar equipamentos ou atividades.

---

## 5. Dados no setor público: integração e governança mínima

Uma política baseada em dados depende de definições claras, qualidade conhecida, responsáveis e regras de acesso. A <abbr title="Infraestrutura Nacional de Dados">IND</abbr> é, no âmbito do Poder Executivo federal, um conjunto de normas, políticas, arquiteturas, padrões, ferramentas tecnológicas e ativos de informação voltado ao uso estratégico de dados. Seu contexto ajuda a entender por que descoberta, interoperabilidade, segurança, proteção e governança precisam caminhar juntas.

Para este edital, guarde o mecanismo:

- **metadados** ajudam a localizar e interpretar dados;
- **interoperabilidade** permite que sistemas e organizações troquem dados de modo útil;
- troca técnica sem significado comum pode transmitir valores que cada órgão interpreta de maneira diferente;
- governança define responsabilidades e condições para qualidade, segurança, acesso e uso adequado;
- integrar bases não torna automaticamente legítimo todo uso nem corrige problemas de qualidade.

Não é necessário decorar arquiteturas como <abbr title="Extract, Transform, Load">ETL</abbr>/<abbr title="Extract, Load, Transform">ELT</abbr>, lakehouse ou modelos detalhados de compartilhamento para compreender o núcleo deste item.

---

## 6. Internet das Coisas — <abbr title="Internet das Coisas">IoT</abbr>

### 6.1 Conceito

O Decreto nº 9.854/2019, que instituiu o Plano Nacional de Internet das Coisas, define <abbr title="Internet das Coisas">IoT</abbr> como infraestrutura que integra serviços com capacidades de conexão física ou virtual de coisas com dispositivos baseados em tecnologias da informação e comunicação, com interoperabilidade.

O mesmo decreto ajuda a separar os elementos: **coisas** são objetos físicos ou digitais capazes de ser identificados e integrados às redes de comunicação; **dispositivos** têm capacidade obrigatória de comunicação e podem também sensoriar, atuar, coletar, armazenar ou processar dados.

Em termos práticos, uma solução de <abbr title="Internet das Coisas">IoT</abbr> conecta coisas e dispositivos para **observar, comunicar e, em alguns casos, atuar** no ambiente.

### 6.2 <abbr title="Internet das Coisas">IoT</abbr> não é qualquer uso da internet

Não basta, isoladamente:

- colocar um arquivo na web;
- acessar uma página por computador;
- usar uma máquina automática sem comunicação;
- ter um sensor que só grava localmente sem integração em rede.

O ponto central é a integração de coisas/dispositivos por comunicação em rede dentro de uma solução.

### 6.3 <abbr title="Internet das Coisas">IoT</abbr> não exige <abbr title="inteligência artificial">IA</abbr>

Um sensor pode enviar temperatura e uma regra fixa pode acionar um alerta. Isso já pode compor uma solução de <abbr title="Internet das Coisas">IoT</abbr>.

<abbr title="inteligência artificial">IA</abbr> pode ser acrescentada para previsão ou reconhecimento de padrões, mas **não é requisito conceitual da <abbr title="Internet das Coisas">IoT</abbr>**.

---

## 7. Componentes básicos de <abbr title="Internet das Coisas">IoT</abbr>

Pense no caminho **ambiente → dispositivo → comunicação → processamento → resposta**. Os componentes abaixo ocupam posições diferentes nesse fluxo:

| Elemento | Função |
| --- | --- |
| **sensor** | mede ou detecta fenômeno e gera dado |
| **atuador** | transforma comando em ação física |
| **conectividade** | transporta telemetria e comandos |
| <abbr title="Equipamento intermediário que agrega dispositivos ou converte protocolos">gateway</abbr> | pode concentrar dispositivos, converter protocolos e filtrar mensagens |
| <abbr title="Processamento realizado próximo à fonte dos dados">processamento local/edge</abbr> | trata dados próximo à fonte quando baixa latência é útil |
| **plataforma/nuvem** | integra, armazena, monitora e analisa dados e dispositivos |

**Sensor observa; atuador age.** Um mesmo equipamento pode reunir ambos.

### 7.1 Telemetria e comando

- **telemetria:** observação ou medição enviada remotamente pelo dispositivo ao sistema;
- **comando:** instrução enviada ao dispositivo ou atuador para produzir mudança.

Exemplo hipotético: um medidor envia pressão da rede de água (**telemetria**); o sistema envia ordem para fechar uma válvula (**comando**).

### 7.2 Conectividade

Não existe uma tecnologia de comunicação universalmente melhor. A escolha depende de:

- alcance;
- largura de banda;
- latência;
- consumo de energia;
- custo;
- disponibilidade;
- mobilidade.

Um vídeo contínuo e um sensor que envia poucos bytes por hora têm necessidades distintas. A tecnologia adequada é a que atende aos requisitos da aplicação, e não a que parece mais sofisticada.

### 7.3 Continuidade e segurança — noções

<abbr title="Internet das Coisas">IoT</abbr> urbano pode produzir efeitos físicos. Por isso, uma solução deve considerar:

- identificação e autenticação dos dispositivos;
- controle de acesso;
- atualização e manutenção;
- proteção das comunicações quando aplicável;
- perda de rede, energia ou plataforma;
- sensor defeituoso e mensagem ausente;
- procedimento seguro para falhas.

O aprofundamento de segurança, privacidade e responsabilidade digital pertence aos assuntos específicos correspondentes. Aqui, o ponto é perceber que **falha tecnológica também é risco operacional**.

---

## 8. Cidades inteligentes

A **Carta Brasileira para Cidades Inteligentes** associa cidade inteligente à transformação digital e ao desenvolvimento urbano sustentáveis, com atuação planejada, inovadora, inclusiva e em rede, uso responsável de dados e tecnologias, redução de desigualdades, resiliência e melhoria da qualidade de vida.

A Carta é uma **orientação estratégica**, não lei nem certificação obrigatória.

### 8.1 Tecnologia é meio

Uma cidade não é inteligente por instalar muitos dispositivos. A pergunta é se a solução:

- resolve problema público concreto;
- melhora serviço ou qualidade de vida;
- reduz desperdício ou tempo de resposta;
- é sustentável financeiramente e operacionalmente;
- funciona para os territórios e públicos relevantes;
- pode ser mantida, avaliada e corrigida ao longo do tempo.

### 8.2 Aplicações frequentes

| Área | Aplicações de <abbr title="Internet das Coisas">IoT</abbr> e dados |
| --- | --- |
| **mobilidade** | telemetria de frota, tempos de viagem, semáforos adaptativos |
| **iluminação** | detecção de falhas, consumo, regulação de luminosidade |
| **saneamento** | nível, pressão, vazão, detecção de perdas |
| **resíduos** | monitoramento de demanda e otimização de rotas |
| **ambiente** | qualidade do ar, ruído, calor, chuva |
| **energia** | medição e gestão de consumo |
| **defesa civil** | pluviômetros, nível de rios, sirenes e alertas |

### 8.3 O exemplo integrado, do sensor ao impacto

Retome o município que instala sensores de nível de rios:

1. **sensor:** mede o nível;
2. **conectividade:** envia a telemetria;
3. **processamento:** compara a medição com regras e histórico;
4. **informação:** transforma a medição em condição interpretável de risco;
5. **ação:** um alerta pode ser emitido e equipes podem ser mobilizadas;
6. **avaliação:** mede antecedência, alcance, resposta e danos evitados.

Agora aparecem juntos os conceitos do capítulo. Os sensores são **insumos**; os pontos monitorados e alertas são **produtos**; aviso mais rápido pode ser **resultado**; redução de perdas pode ser **impacto**, se a avaliação sustentar essa atribuição.

O sensor melhora a observação; não substitui plano de contingência, manutenção, decisão pública ou comunicação de emergência. Essa é a diferença entre **instalar tecnologia** e **produzir valor público**.

---

## 9. Como reconhecer as pegadinhas

1. **Big data ≠ apenas volume.** Pergunte qual dimensão do problema está descrita.
2. **5 Vs = heurística, não lista legal fechada.**
3. **Dado estruturado pode estar errado.** Estrutura e qualidade são dimensões diferentes.
4. **<abbr title="JavaScript Object Notation">JSON</abbr> é normalmente semiestruturado.**
5. **Completude ≠ acurácia ≠ atualidade.**
6. **Amostra grande pode continuar não representativa.**
7. **Ausência de dado ≠ zero.**
8. **Descritiva descreve; diagnóstica investiga; preditiva estima; prescritiva recomenda.**
9. **Predição ≠ causalidade.** Prever corretamente não prova o mecanismo causal.
10. **Correlação ≠ causalidade.** Associação não basta para atribuir efeito.
11. **Produto ≠ resultado ≠ impacto.** Entrega não prova efeito amplo.
12. **<abbr title="Internet das Coisas">IoT</abbr> ≠ <abbr title="inteligência artificial">IA</abbr>.** Uma solução conectada pode operar por regras fixas.
13. **Sensor observa; atuador age.**
14. **<abbr title="Equipamento intermediário que agrega dispositivos ou converte protocolos">Gateway</abbr> não é obrigatório em toda arquitetura.**
15. **<abbr title="Processamento realizado próximo à fonte dos dados">Edge</abbr> e nuvem podem coexistir.**
16. **Telemetria ≠ comando.** Um fluxo relata o ambiente; o outro manda agir.
17. **Cidade inteligente ≠ cidade com mais sensores.** O critério é o problema e o resultado público.
18. **Carta Brasileira para Cidades Inteligentes ≠ lei.**

## 10. Estratégia de resolução

Em questão de análise de dados:

1. identifique **qual pergunta** está sendo feita;
2. verifique **qualidade, cobertura e contexto** da base;
3. diferencie **descrição, previsão e causalidade**;
4. confira **denominador, período e população** antes de comparar;
5. não atribua à análise autoridade jurídica que ela não possui.

Em questão de <abbr title="Internet das Coisas">IoT</abbr>:

1. encontre o **dispositivo/sensor**;
2. identifique a **comunicação**;
3. veja se existe **atuador/comando**;
4. diferencie processamento próximo à fonte e plataforma remota;
5. conecte a tecnologia ao **problema urbano** e ao **resultado esperado**.

Se a alternativa transformar **meio em fim** — mais dados, mais sensores, mais automação — sem demonstrar qualidade, interpretação ou resultado, desconfie.