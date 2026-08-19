---
schemaVersion: 1
title: "Big data, análise de dados, IoT e cidades inteligentes"
description: Fundamentos, arquiteturas, análises e governança de dados aplicados a políticas públicas, Internet das Coisas e cidades inteligentes.
order: 34
storageId: dados-iot-cidades-inteligentes
---

# Big data, análise de dados, IoT e cidades inteligentes

> **Corte de atualização:** 10 de agosto de 2026. O edital cobra **noções de big data e análise de dados para políticas públicas** e **Internet das Coisas (IoT) em cidades inteligentes**. O foco é conceitual e aplicado: compreender o que os dados permitem concluir, reconhecer componentes básicos de IoT e relacionar tecnologia a problemas urbanos. Engenharia de dados avançada, governança específica de <abbr title="inteligência artificial">IA</abbr> e aprofundamentos de privacidade, ética e acessibilidade pertencem a outros recortes.

## 1. Mapa do assunto

Quatro perguntas resolvem grande parte das questões:

1. **Que tipo de dado ou fenômeno está sendo observado?**
2. **Que pergunta a análise pretende responder?**
3. **Que conclusão os dados realmente sustentam?**
4. **Na IoT, quem observa, quem comunica e quem atua?**

Regras de ouro:

- **mais dados não significam automaticamente melhor decisão**;
- **correlação não implica causalidade**;
- **IoT não exige inteligência artificial**;
- **cidade inteligente não é a cidade com mais sensores**, mas a que usa tecnologia para gerar valor público de forma sustentável.

---

## 2. Dado, informação e qualidade

### 2.1 Dado e informação

**Dado** é uma representação de fato, medida, símbolo ou valor. **Informação** surge quando o dado é contextualizado ou processado de forma que possa ser interpretado para uma finalidade.

Exemplo:

- `82` isoladamente é um dado pouco informativo;
- `82 mm de chuva em seis horas no ponto X` já possui unidade, período e contexto;
- comparar a medição com histórico e limites de alerta pode apoiar uma decisão de defesa civil.

### 2.2 Formas de organização

| Tipo | Ideia central | Exemplos |
| --- | --- | --- |
| **estruturado** | campos e esquema previsíveis | tabelas, cadastros, transações |
| **semiestruturado** | possui chaves ou marcações flexíveis | <abbr title="JavaScript Object Notation">JSON</abbr>, <abbr title="Extensible Markup Language">XML</abbr>, logs |
| **não estruturado** | não nasce organizado em campos tabulares | texto livre, imagem, áudio, vídeo |

**Metadados** descrevem outros dados: significado, fonte, unidade, período, método, atualização e condições de uso.

> **Pegadinha:** dado estruturado não é sinônimo de dado correto. Estrutura facilita tratamento; não garante qualidade.

### 2.3 Qualidade e representatividade

Qualidade significa **adequação ao uso**. Dimensões úteis incluem:

- **acurácia:** o valor representa corretamente o fenômeno?
- **completude:** os campos necessários foram preenchidos?
- **consistência:** as fontes e regras não se contradizem indevidamente?
- **atualidade:** o dado ainda é válido para a decisão?
- **validade:** formato e domínio esperados foram respeitados?

Também é preciso verificar **representatividade**. Muitos registros de um aplicativo podem descrever muito bem seus usuários e, ainda assim, representar mal quem não usa o aplicativo.

Outro cuidado: **ausência de dado não é zero**. Um sensor indisponível, um campo não informado e uma medição real igual a zero são situações diferentes.

---

## 3. Noções de big data

### 3.1 Conceito

**Big data** refere-se a conjuntos e fluxos de dados cuja escala, ritmo, diversidade ou complexidade exigem técnicas e arquiteturas adequadas de armazenamento, processamento, integração e análise.

Não existe um tamanho universal a partir do qual uma base “vira” big data. A dificuldade depende do volume, da velocidade necessária, dos formatos, das fontes e do uso pretendido.

### 3.2 Os 5 Vs

Os **5 Vs** são uma heurística frequente:

| V | Pergunta | Exemplo público |
| --- | --- | --- |
| **volume** | quanto dado existe? | milhões de registros de atendimento |
| **velocidade** | em que ritmo chega e precisa ser tratado? | telemetria de rios |
| **variedade** | quantos formatos e fontes precisam ser combinados? | tabelas, textos, imagens e sensores |
| **veracidade** | quão confiável é o dado? | cadastro consistente, sensor calibrado |
| **valor** | que utilidade legítima pode ser produzida? | alerta que reduz tempo de resposta |

Os 5 Vs não são requisito jurídico fechado. Algumas referências usam mais ou menos dimensões.

> **Pegadinha:** grande **volume** com baixa **veracidade** apenas permite produzir erros em escala.

### 3.3 Uso público

Big data pode apoiar:

- integração de fontes antes isoladas;
- detecção de padrões e anomalias;
- monitoramento mais tempestivo;
- previsão de demanda ou risco;
- segmentação territorial de políticas;
- avaliação e revisão de serviços.

O ganho depende de pergunta bem formulada, qualidade, cobertura, método e capacidade de agir sobre o resultado.

---

## 4. Análise de dados para políticas públicas

### 4.1 Quatro tipos de análise

| Tipo | Pergunta principal | Exemplo |
| --- | --- | --- |
| **descritiva** | o que ocorreu? | atendimentos por mês |
| **diagnóstica** | por que ocorreu ou com que fatores se relaciona? | investigar queda de cobertura |
| **preditiva** | o que provavelmente ocorrerá? | estimar demanda futura |
| **prescritiva** | que ação é recomendável sob metas e restrições? | sugerir alocação de equipes |

As categorias não formam uma escada obrigatória. Uma boa descrição pode ser mais útil do que uma previsão ruim.

**Predição** estima; não garante. **Prescrição** recomenda; não cria competência administrativa, orçamento ou autorização jurídica.

### 4.2 Correlação e causalidade

**Correlação** indica associação entre variáveis. **Causalidade** exige sustentar que uma mudança produziu efeito em outra, considerando explicações alternativas.

Se acidentes diminuem depois de uma campanha, a sequência temporal não basta para provar que a campanha causou toda a redução. Podem existir sazonalidade, obras, fiscalização, mudança de tráfego ou tendência anterior.

A ideia de **contrafactual** ajuda: o que provavelmente teria ocorrido sem a intervenção?

### 4.3 Indicadores e interpretação

Um indicador útil precisa de contexto:

- definição;
- fonte;
- período;
- unidade;
- população ou território de referência;
- limitações.

Comparar apenas totais entre cidades muito diferentes pode enganar. Uma taxa relaciona eventos a uma população ou exposição de referência.

Também é preciso verificar:

- quem está representado e quem ficou fora;
- se houve mudança de definição ou método;
- se o instrumento de medição é confiável;
- se o período captura sazonalidade;
- se valores ausentes foram tratados corretamente.

### 4.4 Dados ao longo da política

Dados podem apoiar diagnóstico, desenho, implementação, monitoramento, avaliação e revisão.

Uma distinção útil:

| Categoria | Ideia | Exemplo de alerta de enchente |
| --- | --- | --- |
| **insumo** | recurso mobilizado | equipe e sensores |
| **produto** | entrega imediata | pontos monitorados e alertas emitidos |
| **resultado** | mudança observada no serviço ou público | aviso com maior antecedência |
| **impacto** | efeito amplo atribuível à política | redução sustentada de perdas |

Instalar sensores prova que houve **produto**, não que houve **impacto**.

---

## 5. Dados no setor público: integração e governança mínima

A administração pública depende de dados com definições claras, qualidade conhecida, responsáveis e regras de acesso. A **Infraestrutura Nacional de Dados (IND)** é um contexto institucional atual de promoção do compartilhamento e da interoperabilidade de dados governamentais, mas não substitui as competências, regras de acesso nem a avaliação de qualidade de cada base.

Para este edital, basta guardar:

- **metadados** ajudam a interpretar e localizar dados;
- **interoperabilidade** permite que sistemas e organizações troquem dados de modo útil;
- integração técnica sem significado comum pode transmitir valores que cada órgão interpreta de maneira diferente;
- governança é meio para assegurar responsabilidade, qualidade, segurança e uso adequado, não um fim tecnológico em si.

Não é necessário decorar arquiteturas como <abbr title="Extract, Transform, Load">ETL</abbr>/<abbr title="Extract, Load, Transform">ELT</abbr>, lakehouse ou modelos detalhados de compartilhamento para compreender o núcleo do item 4.5.

---

## 6. Internet das Coisas — IoT

### 6.1 Conceito

O Decreto nº 9.854/2019, que instituiu o Plano Nacional de Internet das Coisas, trata IoT como infraestrutura que integra serviços com capacidades de conexão de **coisas** e **dispositivos** baseados em tecnologias da informação e comunicação, com interoperabilidade.

Em termos práticos, IoT envolve objetos ou equipamentos capazes de **observar, comunicar e, em alguns casos, atuar** no ambiente.

### 6.2 IoT não é qualquer uso da internet

Não basta, isoladamente:

- colocar um arquivo na web;
- acessar uma página por computador;
- usar uma máquina automática sem comunicação;
- ter um sensor que só grava localmente sem integração em rede.

### 6.3 IoT não exige IA

Um sensor pode enviar temperatura e uma regra fixa pode acionar um alerta. Isso já pode compor uma solução IoT.

IA pode ser acrescentada para previsão ou reconhecimento de padrões, mas **não é requisito conceitual da IoT**.

---

## 7. Componentes básicos de IoT

| Elemento | Função |
| --- | --- |
| **sensor** | mede ou detecta fenômeno e gera dado |
| **atuador** | transforma comando em ação física |
| **conectividade** | transporta telemetria e comandos |
| **gateway** | pode concentrar dispositivos, converter protocolos e filtrar mensagens |
| **processamento local/edge** | trata dados próximo à fonte quando baixa latência é útil |
| **plataforma/nuvem** | integra, armazena, monitora e analisa dados e dispositivos |

**Sensor observa; atuador age.** Um mesmo equipamento pode reunir ambos.

### 7.1 Telemetria e comando

- **telemetria:** observação enviada pelo dispositivo ao sistema;
- **comando:** instrução enviada ao dispositivo ou atuador para produzir mudança.

Exemplo: um medidor envia pressão da rede de água (**telemetria**); o sistema envia ordem para fechar uma válvula (**comando**).

### 7.2 Conectividade

Não existe uma tecnologia de comunicação universalmente melhor. A escolha depende de:

- alcance;
- largura de banda;
- latência;
- consumo de energia;
- custo;
- disponibilidade;
- mobilidade.

Um vídeo contínuo e um sensor que envia poucos bytes por hora têm necessidades distintas.

### 7.3 Continuidade e segurança — noções

IoT urbano pode produzir efeitos físicos. Por isso, uma solução deve considerar:

- identificação e autenticação dos dispositivos;
- controle de acesso;
- atualização e manutenção;
- proteção das comunicações quando aplicável;
- perda de rede, energia ou plataforma;
- sensor defeituoso e mensagem ausente;
- procedimento seguro para falhas.

O aprofundamento de segurança, privacidade e responsabilidade digital pertence aos assuntos específicos correspondentes.

---

## 8. Cidades inteligentes

A **Carta Brasileira para Cidades Inteligentes** associa cidade inteligente à transformação digital e ao desenvolvimento urbano sustentáveis, com planejamento, inovação, inclusão, colaboração, resiliência e uso responsável de dados e tecnologias.

A Carta é uma **orientação estratégica**, não lei ou certificação obrigatória.

### 8.1 Tecnologia é meio

Uma cidade não é inteligente por instalar muitos dispositivos. A pergunta é se a solução:

- resolve problema público concreto;
- melhora serviço ou qualidade de vida;
- reduz desperdício ou tempo de resposta;
- é sustentável financeiramente e operacionalmente;
- funciona para os territórios e públicos relevantes.

### 8.2 Aplicações frequentes

| Área | Aplicações de IoT e dados |
| --- | --- |
| **mobilidade** | telemetria de frota, tempos de viagem, semáforos adaptativos |
| **iluminação** | detecção de falhas, consumo, regulação de luminosidade |
| **saneamento** | nível, pressão, vazão, detecção de perdas |
| **resíduos** | monitoramento de demanda e otimização de rotas |
| **ambiente** | qualidade do ar, ruído, calor, chuva |
| **energia** | medição e gestão de consumo |
| **defesa civil** | pluviômetros, nível de rios, sirenes e alertas |

### 8.3 Exemplo integrado

Um município instala sensores de nível de rios:

1. sensores medem o nível;
2. a conectividade envia telemetria;
3. o sistema compara a medição com regras e histórico;
4. um alerta pode ser emitido;
5. equipes e população recebem informação para agir;
6. resultados devem ser avaliados por antecedência, alcance e redução de danos — não apenas pelo número de sensores instalados.

O sensor melhora informação; não substitui plano de contingência, manutenção, decisão pública ou comunicação de emergência.

---

## 9. Pegadinhas de prova

1. **Big data ≠ apenas volume.**
2. **5 Vs = heurística, não lista legal fechada.**
3. **Dado estruturado pode estar errado.**
4. **JSON é normalmente semiestruturado.**
5. **Completude ≠ acurácia ≠ atualidade.**
6. **Amostra grande pode continuar não representativa.**
7. **Ausência de dado ≠ zero.**
8. **Descritiva descreve; diagnóstica investiga; preditiva estima; prescritiva recomenda.**
9. **Predição ≠ causalidade.**
10. **Correlação ≠ causalidade.**
11. **Produto ≠ resultado ≠ impacto.**
12. **IoT ≠ IA.**
13. **Sensor observa; atuador age.**
14. **Gateway não é obrigatório em toda arquitetura.**
15. **Edge e nuvem podem coexistir.**
16. **Telemetria ≠ comando.**
17. **Cidade inteligente ≠ cidade com mais sensores.**
18. **Carta Brasileira para Cidades Inteligentes ≠ lei.**

## 10. Estratégia de resolução

Em questão de análise de dados:

1. identifique a pergunta;
2. verifique qualidade e cobertura da base;
3. diferencie descrição, previsão e causalidade;
4. confira denominador, período e população antes de comparar;
5. não atribua à análise autoridade jurídica que ela não possui.

Em questão de IoT:

1. encontre o **sensor**;
2. identifique a **comunicação**;
3. veja se existe **atuador/comando**;
4. diferencie processamento local e plataforma;
5. conecte a tecnologia ao problema urbano e ao resultado esperado.

## Referências

- [Decreto nº 9.854, de 25 de junho de 2019](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/decreto/d9854.htm) — Plano Nacional de Internet das Coisas.
- [Infraestrutura Nacional de Dados](https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados) — Secretaria de Governo Digital; contexto atual de integração e uso de dados governamentais.
- [Glossário de Termos de Dados](https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/governancadedados/glossario-de-termos-de-dados) — Secretaria de Governo Digital.
- [Avaliação de Políticas Públicas](https://www.gov.br/casacivil/pt-br/assuntos/governanca/avaliacao-de-politicas) — Casa Civil da Presidência da República.
- [Carta Brasileira para Cidades Inteligentes](https://www.gov.br/cidades/pt-br/acesso-a-informacao/acoes-e-programas/desenvolvimento-urbano-e-metropolitano/projeto-andus/carta-brasileira-para-cidades-inteligentes) — Ministério das Cidades.
