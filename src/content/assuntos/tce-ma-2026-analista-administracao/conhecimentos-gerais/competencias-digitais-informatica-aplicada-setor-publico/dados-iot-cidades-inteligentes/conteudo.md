---
schemaVersion: 1
title: "Big data, análise de dados, IoT e cidades inteligentes"
description: Fundamentos, arquiteturas, análises e governança de dados aplicados a políticas públicas, Internet das Coisas e cidades inteligentes.
order: 34
storageId: dados-iot-cidades-inteligentes
---

## 1. Recorte do assunto e corte temporal

Este assunto cobre o item 4.5 do edital no recorte de:

- noções de big data;
- análise de dados para políticas públicas;
- Internet das Coisas (IoT);
- aplicações de IoT em cidades inteligentes.

O corte normativo e institucional é **18 de julho de 2026**.

O assunto anterior trata de inteligência artificial, IA generativa, chatbots e automação. Aqui, modelos preditivos aparecem apenas como uma categoria de análise. Não se retomam funcionamento de LLMs, RAG, prompts ou governança específica de IA.

Três ideias orientam todo o estudo:

1. dados em grande quantidade não produzem, sozinhos, conhecimento ou boa política;
2. uma análise informa a decisão pública, mas não substitui competência, contexto, participação ou demonstração de causalidade;
3. uma cidade não se torna inteligente pela quantidade de sensores, e sim pelo valor público, pela inclusão e pela sustentabilidade das soluções.

---

## 2. Dado, informação e formas de organização

### 2.1 Dado e informação

**Dado** é uma representação de fato, medida, símbolo ou valor, ainda que não tenha sido interpretada para uma finalidade concreta.

**Informação** é o dado processado ou contextualizado de modo que possa produzir e transmitir conhecimento.

Exemplo:

- `82` é apenas um valor sem contexto;
- `82 mm de chuva acumulados em seis horas no ponto X` é informação interpretável;
- comparar esse valor com limiares, histórico e vulnerabilidade territorial pode apoiar um alerta.

Processar não significa necessariamente executar cálculo complexo. Acrescentar unidade, origem, instante, método e significado já muda a possibilidade de interpretação.

> **Pegadinha:** dado e informação não se distinguem apenas pelo formato do arquivo. O contexto e o uso importam.

### 2.2 Dados estruturados

Dados **estruturados** seguem esquema definido, com campos, tipos e relações previsíveis.

Exemplos:

- tabela de arrecadação por município e mês;
- cadastro com identificador, data e situação;
- transações em banco relacional;
- série de medições com instante, sensor e valor.

Eles favorecem validações e consultas padronizadas, mas um esquema bem definido não garante que o conteúdo esteja correto ou atualizado.

### 2.3 Dados semiestruturados

Dados **semiestruturados** possuem marcas, chaves ou hierarquias que organizam o conteúdo, embora não dependam de uma tabela rígida única.

Exemplos:

- JSON;
- XML;
- eventos de log;
- mensagens com cabeçalho e corpo;
- documentos com metadados.

JSON não é automaticamente não estruturado: suas chaves e relações fornecem estrutura flexível.

### 2.4 Dados não estruturados

Dados **não estruturados** não se ajustam originalmente a campos tabulares predefinidos.

Exemplos:

- texto livre;
- imagem;
- áudio;
- vídeo;
- documento digitalizado.

Isso não significa ausência total de organização. Uma fotografia pode ter data e localização estruturadas, enquanto seus pixels continuam exigindo processamento próprio.

### 2.5 Metadados

**Metadados** são dados que descrevem outros dados. Podem indicar:

- significado de cada campo;
- fonte e responsável;
- formato e unidade;
- período de referência;
- periodicidade de atualização;
- método de coleta;
- sensibilidade e restrições;
- transformações realizadas;
- condições de uso.

Sem metadados, o valor `0` pode significar ausência do fenômeno, falha do sensor, dado não coletado ou campo não aplicável.

---

## 3. Big data

### 3.1 Conceito operacional

**Big data** descreve conjuntos e fluxos de dados cuja escala, diversidade, velocidade ou complexidade desafia métodos convencionais e exige arquiteturas e práticas adequadas de armazenamento, processamento, integração, análise e governança.

Não há um número universal a partir do qual uma base “vira” big data. O que é grande ou rápido depende:

- da capacidade tecnológica disponível;
- do prazo em que a resposta é necessária;
- dos formatos e fontes;
- das consultas e decisões pretendidas;
- dos controles de qualidade e segurança.

Uma base volumosa, estática e homogênea pode ser mais simples do que um fluxo menor, contínuo e heterogêneo de sensores.

### 3.2 Os 5 Vs

Os **5 Vs** são uma heurística frequente:

| V | Pergunta central | Exemplo público |
|---|---|---|
| **volume** | quanto dado existe? | histórico de milhões de registros de atendimento |
| **velocidade** | em que ritmo chega e precisa ser processado? | telemetria de rios em tempo quase real |
| **variedade** | quantos formatos e fontes precisam ser combinados? | tabelas, imagens, textos e sensores |
| **veracidade** | quão confiável, preciso e consistente é o dado? | sensor calibrado e cadastro sem duplicidade |
| **valor** | que benefício útil e legítimo pode ser produzido? | alerta que reduz tempo de resposta |

Algumas referências acrescentam outros Vs. Isso não torna a heurística clássica falsa; mostra que ela não é norma jurídica nem taxonomia universal fechada.

> **Pegadinha:** volume sem veracidade pode apenas ampliar erro; volume sem valor pode ampliar custo e risco.

### 3.3 Benefícios potenciais

Big data pode apoiar:

- integração de fontes antes isoladas;
- detecção de padrões e anomalias;
- monitoramento mais tempestivo;
- segmentação territorial de políticas;
- previsão de demanda e risco;
- avaliação de resultados;
- transparência e controle, quando juridicamente cabíveis.

Esses benefícios são potenciais. Dependem de pergunta bem definida, dados adequados, método, governança e capacidade de agir sobre o resultado.

### 3.4 Limites

Mais dados não corrigem automaticamente:

- viés de seleção;
- erro de medição;
- ausência de grupo vulnerável;
- definição inadequada do problema;
- indicador mal construído;
- associação sem causalidade;
- desvio de finalidade;
- decisão sem recursos para execução.

---

## 4. Arquitetura e fluxo de dados

### 4.1 Camadas conceituais

Uma plataforma de dados pode ser compreendida por camadas:

1. **fontes**: sistemas administrativos, formulários, APIs, sensores, arquivos e bases externas;
2. **ingestão**: entrada em lote ou por eventos;
3. **armazenamento**: bases operacionais, warehouse, lake ou lakehouse;
4. **processamento**: limpeza, integração, agregação e transformação;
5. **serviço e análise**: consultas, APIs, painéis, relatórios e modelos;
6. **governança transversal**: catálogo, qualidade, segurança, privacidade, linhagem e responsabilidades.

Não existe arquitetura única para todos os casos. A escolha depende de latência, volume, custo, risco, equipe, integração e necessidade de auditoria.

### 4.2 Lote e fluxo

**Processamento em lote** (*batch*) trabalha com dados acumulados em intervalos.

Exemplos:

- consolidar despesas ao fim do dia;
- recalcular mensalmente indicador de cobertura;
- importar arquivo periódico de outro órgão.

Vantagens possíveis: reprocessamento controlado, previsibilidade e simplicidade. Limite principal: latência entre o fato e o resultado.

**Processamento em fluxo** (*streaming*) trata eventos continuamente ou quase em tempo real.

Exemplos:

- receber telemetria de chuva;
- acompanhar posição de frota;
- detectar falha de iluminação;
- emitir alarme de pressão em rede de água.

Streaming não significa ausência de armazenamento nem resultado instantâneo perfeito. Eventos podem atrasar, duplicar, chegar fora de ordem ou faltar.

As abordagens podem coexistir: o fluxo gera alerta imediato, enquanto o lote consolida o histórico para auditoria e planejamento.

### 4.3 ETL e ELT

| Processo | Ordem | Ideia central |
|---|---|---|
| **ETL** | extrair, transformar, carregar | preparar e conformar antes de gravar no destino analítico |
| **ELT** | extrair, carregar, transformar | gravar primeiro no ambiente de destino e transformar nele |

ETL é comum quando um warehouse deve receber dados já padronizados. ELT é frequente em lakes e lakehouses com capacidade de processamento no destino.

Nenhuma abordagem dispensa:

- validação;
- controle de acesso;
- documentação;
- rastreabilidade;
- regras de retenção;
- tratamento de erro.

### 4.4 Data warehouse

Um **data warehouse** é um repositório analítico integrado, historizado e preparado para consultas, relatórios e inteligência de negócios.

Características frequentes:

- dados conformados e estruturados;
- esquema definido antes da gravação analítica, ou *schema-on-write*;
- consistência de dimensões e métricas;
- consultas repetíveis para gestão.

Ele não substitui os sistemas transacionais que registram operações diárias.

### 4.5 Data lake

Um **data lake** armazena, em escala, dados brutos ou pouco transformados de formatos diversos.

Características frequentes:

- estruturados, semiestruturados e não estruturados;
- flexibilidade para usos futuros;
- esquema aplicado na leitura, ou *schema-on-read*, em muitos casos;
- separação entre armazenamento e diferentes mecanismos de processamento.

Sem catálogo, metadados, qualidade, segurança e responsáveis, o lake pode virar um **pântano de dados**: há muitos arquivos, mas pouca confiança e capacidade de encontrá-los ou usá-los.

### 4.6 Data lakehouse

Um **data lakehouse** procura combinar:

- flexibilidade e escala do lake;
- gestão de esquema, transações, desempenho e governança associadas ao warehouse.

É uma abordagem arquitetural, não uma garantia automática de simplicidade, interoperabilidade ou baixo custo. Formatos, ferramentas, competências e contrato do fornecedor continuam relevantes.

### 4.7 Comparação

| Aspecto | Warehouse | Lake | Lakehouse |
|---|---|---|---|
| foco típico | BI e relatórios consistentes | dados diversos e exploração | análise sobre dados diversos com controles integrados |
| preparação | maior antes da carga analítica | pode ocorrer na leitura | combina camadas brutas e tratadas |
| formatos | principalmente estruturados | variados | variados |
| risco sem governança | métrica rígida ou silo | pântano de dados | complexidade e dependência da plataforma |

---

## 5. Governança, qualidade e interoperabilidade

### 5.1 Governança de dados

Governança de dados é o conjunto de políticas, normas, padrões, papéis e práticas que orienta, monitora e avalia a gestão e o uso dos dados.

Ela responde:

- quem decide sobre o dado;
- quem o mantém e usa;
- qual é a definição oficial;
- como a qualidade é medida;
- quem pode acessar;
- por quanto tempo é mantido;
- como alterações e incidentes são tratados;
- como o uso demonstra valor e conformidade.

Governança não é apenas instalar ferramenta ou criar comitê. Decisões e controles precisam operar no cotidiano.

### 5.2 Qualidade

Qualidade é **adequação ao uso**. Dimensões comuns incluem:

| Dimensão | Pergunta |
|---|---|
| completude | os campos necessários estão preenchidos? |
| acurácia | o valor representa corretamente o fenômeno? |
| consistência | fontes e regras não se contradizem indevidamente? |
| atualidade | o dado está vigente para a decisão? |
| unicidade | duplicidades indevidas foram tratadas? |
| validade | formato, domínio e regra foram respeitados? |
| disponibilidade | usuários autorizados obtêm o dado quando necessário? |

Um dado pode ser completo e errado; preciso quando coletado e desatualizado hoje; consistente entre tabelas e ainda não representar a população.

### 5.3 Catálogo e glossário

Um **catálogo de dados** é inventário pesquisável de conjuntos e metadados. Ajuda a localizar:

- base existente;
- responsável;
- definição;
- classificação;
- atualização;
- qualidade conhecida;
- forma autorizada de acesso.

Um **glossário de negócio** harmoniza o significado de termos. Por exemplo, “atendimento concluído” deve ter definição comum antes de comparar órgãos ou períodos.

Catálogo desatualizado não comprova governança efetiva.

### 5.4 Linhagem

**Linhagem de dados** registra o caminho do dado:

1. origem;
2. extração;
3. transformações e regras;
4. combinações com outras fontes;
5. destinos e produtos que o utilizam.

Ela apoia:

- auditoria;
- reprodutibilidade;
- correção de erro;
- análise de impacto de mudança;
- explicação de indicador.

Sem linhagem, pode ser impossível saber por que dois painéis exibem resultados diferentes.

### 5.5 API

Uma **API** define um contrato para sistemas trocarem dados ou acionarem funcionalidades.

Uma API pode melhorar integração e automação, mas não assegura, sozinha:

- significado comum;
- qualidade;
- autorização jurídica;
- compatibilidade entre versões;
- disponibilidade;
- interoperabilidade organizacional.

Ela precisa de documentação, autenticação e autorização conforme risco, versionamento, limites, monitoramento e tratamento de falhas.

### 5.6 Interoperabilidade

**Interoperabilidade** é a capacidade de sistemas e organizações trabalharem em conjunto para trocar dados.

Ela possui dimensões:

- **técnica**: protocolos, formatos e interfaces compatíveis;
- **semântica**: mesmo entendimento dos campos e conceitos;
- **organizacional**: papéis, processos e níveis de serviço alinhados;
- **jurídica**: finalidade, competência, sigilo e proteção compatíveis.

Conectividade sem semântica pode transportar valores que cada sistema interpreta de modo diferente.

### 5.7 Decreto nº 10.046/2019

O Decreto nº 10.046/2019 disciplina o compartilhamento de dados entre órgãos e entidades da **administração pública federal direta, autárquica e fundacional e os demais Poderes da União**, nos termos de seu art. 1º.

Não se deve apresentá-lo como obrigação direta e automática de todos os Estados, Municípios e tribunais de contas estaduais.

Entre suas finalidades estão:

- simplificar serviços;
- orientar formulação, implementação, avaliação e monitoramento de políticas;
- melhorar qualidade e fidedignidade;
- aumentar eficiência interna.

O decreto define governança de dados, interoperabilidade, gestor, custodiante e mecanismos de compartilhamento. Também classifica o compartilhamento em:

| Nível | Característica essencial |
|---|---|
| **amplo** | dados públicos sem restrição de acesso |
| **restrito** | dados protegidos por sigilo, acessíveis no âmbito definido para execução de políticas, segundo regras do Comitê |
| **específico** | dados protegidos por sigilo, com acesso a órgãos específicos e regras do gestor |

Serviço web, cópia de dados, lago compartilhado e plataforma de interoperabilidade podem ser mecanismos. O meio técnico não elimina finalidade, mínimo necessário, segurança, auditabilidade ou LGPD.

---

## 6. Tipos de análise de dados

### 6.1 Análise descritiva

Responde principalmente: **o que ocorreu?**

Exemplos:

- quantidade de atendimentos por mês;
- distribuição de falhas de iluminação por bairro;
- tempo mediano de espera;
- mapa de medições de qualidade do ar.

Descrever corretamente já exige denominador, período, cobertura e definição.

### 6.2 Análise diagnóstica

Investiga: **por que ocorreu ou com quais fatores o evento se relaciona?**

Pode comparar segmentos, decompor processos e formular hipóteses sobre:

- queda de cobertura;
- aumento de perdas;
- concentração de incidentes;
- diferença entre unidades.

Encontrar um fator associado não prova, por si só, causa.

### 6.3 Análise preditiva

Estima: **o que provavelmente ocorrerá?**

Exemplos:

- demanda futura por atendimento;
- probabilidade de falha de ativo;
- risco de alagamento;
- volume esperado de resíduos.

Predição depende de dados e condições. Mudanças na população, no processo ou no ambiente podem degradar o desempenho.

### 6.4 Análise prescritiva

Propõe: **que ação pode ser adotada diante de metas, restrições e cenários?**

Exemplos:

- rota de coleta que reduz tempo e combustível;
- alocação de equipes entre áreas de risco;
- plano de manutenção compatível com orçamento e criticidade.

Uma prescrição é recomendação analítica. Ela não cria competência, orçamento, prioridade política ou autorização para agir.

### 6.5 Relação entre as categorias

As categorias não formam escada obrigatória nem hierarquia de qualidade. Uma boa descrição pode ser mais útil do que previsão inadequada. Um mesmo projeto pode combinar as quatro.

---

## 7. Dados no ciclo de políticas públicas

### 7.1 Usos ao longo do ciclo

| Etapa | Contribuição possível dos dados |
|---|---|
| diagnóstico | dimensionar problema, território e população |
| agenda e desenho | comparar alternativas e estimar recursos |
| implementação | acompanhar atividades, cobertura e gargalos |
| monitoramento | observar indicadores e desvios |
| avaliação | analisar resultados, impactos e eficiência |
| revisão | ajustar, expandir, restringir ou encerrar ações |

O ciclo não é perfeitamente linear. Novos dados podem reformular o diagnóstico durante a implementação.

### 7.2 Cadeia de resultados

| Categoria | O que representa | Exemplo de política de alertas |
|---|---|---|
| **insumo** | recurso mobilizado | orçamento, equipe e sensores |
| **processo** | atividade realizada | instalação, calibração e manutenção |
| **produto** | entrega imediata | pontos monitorados e alertas emitidos |
| **resultado** | mudança de curto ou médio prazo | população avisada com antecedência |
| **impacto** | efeito amplo e duradouro | redução sustentável de perdas e mortes atribuível à política |

Número de sensores instalados é produto, não prova de redução de risco. Impacto exige comparação e desenho avaliativo mais forte.

### 7.3 Construção de indicadores

Um indicador útil registra:

- nome e objetivo;
- definição e fórmula;
- numerador e denominador;
- unidade;
- fonte;
- periodicidade;
- população e território;
- linha de base e meta;
- responsável;
- limitações.

Para uma taxa:

$$
\text{taxa} = \frac{\text{número de eventos}}{\text{população ou exposição de referência}} \times k
$$

O fator $k$ pode ser 100, 1.000 ou 100.000, conforme o fenômeno. Comparar somente totais pode confundir tamanho da população com risco.

### 7.4 Média, mediana e distribuição

**Média** soma os valores e divide pela quantidade. É sensível a extremos.

**Mediana** é o valor central após ordenar os dados. Pode representar melhor um tempo de atendimento com poucos casos extremamente longos.

Nenhuma medida isolada descreve toda a distribuição. Convém observar dispersão, percentis, grupos e casos extremos.

---

## 8. Interpretação, causalidade e vieses

### 8.1 Correlação e causalidade

**Correlação** é associação entre variáveis. **Causalidade** sustenta que uma mudança em uma variável produziu efeito em outra, consideradas explicações alternativas.

Se fiscalização e redução de acidentes ocorrem ao mesmo tempo, outras causas podem existir:

- mudança climática;
- obra viária;
- redução de tráfego;
- campanha educativa;
- tendência anterior.

Avaliação causal procura um **contrafactual**: o que provavelmente teria ocorrido sem a intervenção.

Comparar apenas “antes e depois” ou “participantes e não participantes” pode misturar efeito da política com diferenças preexistentes.

### 8.2 Representatividade

Dados de quem usa um aplicativo não representam automaticamente toda a população.

Perguntas essenciais:

- quem consegue gerar o dado?
- quem ficou fora?
- sensores cobrem todas as áreas relevantes?
- o período captura sazonalidade?
- houve mudança de procedimento?

Mais observações de uma amostra enviesada podem aumentar precisão sobre o grupo observado sem corrigir sua falta de representatividade.

### 8.3 Viés de seleção e medição

**Viés de seleção** ocorre quando a forma de inclusão produz amostra sistematicamente diferente da população de interesse.

**Viés de medição** decorre de instrumento, regra ou procedimento que distorce o fenômeno.

Exemplos:

- sensor mal calibrado;
- formulário que força categoria inadequada;
- denúncias concentradas onde o canal é conhecido;
- mudança de definição no meio da série.

### 8.4 Dados ausentes

Ausência não é zero. É preciso diferenciar:

- não coletado;
- não informado;
- inaplicável;
- falha de transmissão;
- sensor indisponível;
- valor real igual a zero.

Substituir todos os ausentes por zero pode criar falsa queda. Excluir todos os registros incompletos pode retirar justamente grupos com maior dificuldade de acesso.

### 8.5 Recortes e falácia ecológica

Resultado agregado pode ocultar desigualdade entre bairros, faixas ou grupos. Por outro lado, inferir comportamento individual a partir de média do território é **falácia ecológica**.

Exemplo: bairro com renda média alta não permite concluir que cada morador possui renda alta.

Desagregar ajuda a encontrar diferenças, mas granularidade excessiva pode aumentar instabilidade estatística e risco de reidentificação.

### 8.6 Visualização responsável

Uma visualização pode enganar por:

- eixo truncado que exagera variação;
- escalas diferentes sem aviso;
- total sem denominador;
- mapa de contagens sem ajustar população ou área;
- período escolhido para favorecer conclusão;
- omissão de incerteza e dado ausente;
- cores que sugerem ordem inexistente.

O gráfico deve informar fonte, período, unidade, recorte e limitações. Beleza visual não substitui integridade analítica.

---

## 9. Proteção de dados, segurança e ética

### 9.1 Dados pessoais no contexto urbano

Telemetria e bases urbanas podem envolver dados pessoais quando identificam ou tornam identificável uma pessoa.

Exemplos conforme o contexto:

- localização associada a dispositivo;
- placa e trajeto;
- imagem e biometria;
- consumo individual;
- dado de saúde;
- padrão comportamental.

O Poder Público deve observar, entre outros, finalidade pública, competência, necessidade, qualidade, transparência, segurança, prevenção, não discriminação e prestação de contas.

### 9.2 Minimização e uso secundário

Coletar “porque pode ser útil no futuro” não substitui finalidade.

Antes da coleta, devem ser definidos:

- problema e finalidade;
- dado estritamente necessário;
- base jurídica e competência;
- quem acessa;
- prazo de retenção;
- compartilhamentos;
- descarte;
- controles e transparência.

Reutilizar dado de mobilidade para vigilância ou perfilamento é nova finalidade e não se legitima apenas pela possibilidade técnica.

### 9.3 Anonimização e pseudonimização

**Anonimização** busca retirar a possibilidade de associação direta ou indireta a uma pessoa por meios técnicos razoáveis e disponíveis.

Remover nome ou CPF pode ser insuficiente. Localização, horários e cruzamento com outras bases podem permitir reidentificação.

**Pseudonimização** substitui identificadores e mantém informação adicional separada para eventual associação. Ela reduz alguns riscos, mas o dado continua pessoal quando a reidentificação permanece possível.

### 9.4 Segurança

Controles proporcionais incluem:

- classificação e inventário;
- autenticação e autorização;
- menor privilégio;
- criptografia quando aplicável;
- registro e monitoramento;
- gestão de vulnerabilidades;
- cópia, recuperação e continuidade;
- retenção e descarte;
- resposta a incidentes;
- avaliação de fornecedores.

Disponibilizar painel agregado não autoriza expor a base individual que o alimenta.

### 9.5 Ética e participação

Além da conformidade mínima, uma política orientada por dados deve perguntar:

- quem recebe benefício e quem assume risco;
- quem foi ouvido no desenho;
- se há alternativa menos invasiva;
- se o indicador muda comportamentos de modo indesejado;
- se existe contestação e correção;
- se o custo de oportunidade é justificável.

---

## 10. Internet das Coisas

### 10.1 Definição normativa brasileira

O Decreto nº 9.854/2019 instituiu o Plano Nacional de Internet das Coisas.

Para o decreto, IoT é a infraestrutura que integra serviços de valor adicionado com capacidades de conexão física ou virtual de coisas com dispositivos baseados em tecnologias da informação e comunicação, com interoperabilidade.

O texto também define:

- **coisas**: objetos físicos ou digitais identificáveis e integráveis por redes de comunicação;
- **dispositivos**: equipamentos ou subconjuntos com comunicação obrigatória e capacidades opcionais de sensoriamento, atuação, coleta, armazenamento e processamento.

O plano observa segurança da informação e proteção de dados pessoais. Saúde, cidades, indústrias e meio rural devem estar entre os ambientes priorizados por ato ministerial.

O decreto é norma federal e estratégia de fomento. Ele não é protocolo técnico nem certificado de segurança de dispositivo.

### 10.2 IoT não é sinônimo de internet comum

IoT envolve coisas e dispositivos conectados ao ambiente físico ou digital para observar, comunicar ou atuar.

Não são suficientes, isoladamente:

- um arquivo disponível na web;
- um computador navegando em página;
- uma máquina automática sem comunicação;
- um sensor que apenas grava localmente sem integração em rede.

### 10.3 IoT não exige IA

Um sensor pode enviar temperatura e uma regra fixa pode acionar alarme. Isso é IoT sem aprendizado de máquina.

IA pode ser adicionada para prever falhas ou reconhecer padrões, mas é camada possível, não requisito conceitual da IoT.

---

## 11. Arquitetura de IoT

### 11.1 Sensores e atuadores

**Sensor** converte fenômeno em dado:

- temperatura;
- luminosidade;
- pressão;
- vazão;
- presença;
- localização;
- qualidade do ar.

**Atuador** transforma comando em ação física:

- regular luminária;
- mudar fase semafórica;
- abrir válvula;
- acionar bomba;
- ligar sirene.

Sensor observa; atuador age. Um dispositivo pode reunir os dois.

### 11.2 Conectividade

A conectividade transporta telemetria e comandos por tecnologias como:

- rede cabeada;
- Wi-Fi;
- rede celular;
- rádio de curto ou longo alcance;
- redes de baixa potência e grande cobertura.

A escolha equilibra:

- alcance;
- largura de banda;
- latência;
- consumo de energia;
- custo;
- disponibilidade;
- mobilidade;
- segurança.

Vídeo exige perfil diferente de um medidor que envia poucos bytes a cada hora.

### 11.3 Gateway

Um **gateway** pode:

- concentrar dispositivos;
- converter protocolos;
- autenticar e filtrar mensagens;
- executar regras locais;
- encaminhar dados à plataforma;
- manter operação limitada durante falha externa.

Nem toda solução possui gateway separado. O dispositivo pode comunicar-se diretamente com a plataforma.

### 11.4 Edge, fog e cloud

**Edge computing** processa próximo à fonte, no dispositivo ou em equipamento local.

Benefícios possíveis:

- menor latência;
- menor tráfego;
- decisão local durante perda de conectividade;
- filtragem antes do envio;
- redução de exposição de dados, conforme o desenho.

**Fog computing** distribui processamento em camada intermediária entre borda e nuvem, por exemplo em gateways regionais.

**Cloud computing** pode oferecer escala para armazenamento histórico, integração, análise, painéis e gestão remota.

São complementares. Processar na borda não elimina a nuvem; usar nuvem não impede controle local seguro.

### 11.5 Plataforma, telemetria e comandos

Uma plataforma de IoT pode gerir:

- cadastro e identidade de dispositivos;
- configuração;
- recepção de telemetria;
- regras e alertas;
- armazenamento;
- integração por API;
- atualizações;
- estado de segurança;
- dashboards e análise.

**Telemetria** leva observações do dispositivo para sistemas de monitoramento. **Comando** segue no sentido de controle para produzir mudança.

Comando com efeito físico exige autenticação, autorização, integridade, confirmação e condição segura em caso de falha.

---

## 12. Segurança e ciclo de vida da IoT

### 12.1 Superfície de ataque

IoT amplia a superfície porque combina:

- hardware distribuído e por vezes acessível fisicamente;
- firmware e software embarcado;
- interfaces locais e de rede;
- gateway;
- aplicativo;
- plataforma e nuvem;
- cadeia de fornecedores;
- ação sobre o ambiente físico.

Senha padrão, serviço desnecessário, atualização insegura e inventário incompleto são riscos frequentes.

### 12.2 Capacidades técnicas do NIST

O catálogo técnico do NIST, referência de boas práticas e não norma brasileira por si só, apresenta sete capacidades:

| Capacidade | Resultado esperado |
|---|---|
| **identificação do dispositivo** | identificar lógica e fisicamente cada dispositivo |
| **configuração do dispositivo** | permitir alteração por entidade autorizada |
| **proteção de dados** | proteger dados armazenados e transmitidos |
| **acesso lógico a interfaces** | restringir interfaces, protocolos e serviços a entidades autorizadas |
| **atualização de software** | atualizar por mecanismo seguro, configurável e autorizado |
| **consciência do estado de cibersegurança** | informar estado a entidades autorizadas |
| **segurança do dispositivo** | proteger integridade de hardware e software e usar recursos, comunicação e execução de modo seguro |

A lista é uma baseline para seleção conforme o caso. Nem toda habilidade detalhada se aplica de modo idêntico a todo dispositivo.

### 12.3 Identidade, configuração e acesso

Cada ativo precisa de identificação única e inventário. Credenciais compartilhadas dificultam revogação e auditoria.

Configuração deve ser alterada somente por entidade autorizada. Serviços e portas desnecessários devem ser desabilitados. O menor privilégio reduz o alcance de comprometimento.

### 12.4 Atualização segura

Atualizar exige:

- verificar autenticidade e integridade do pacote;
- autorizar a operação;
- proteger contra versão maliciosa;
- tratar falha de instalação;
- conhecer prazo de suporte;
- testar impacto operacional.

Dispositivo sem mecanismo de correção ou sem suporte do fabricante pode virar passivo antes do fim de sua vida física.

### 12.5 Estado e monitoramento

Consciência do estado inclui informações para saber:

- versão instalada;
- configuração relevante;
- falha de autenticação;
- indisponibilidade;
- comportamento anômalo;
- necessidade de atualização;
- evento útil à investigação.

Logs precisam de proteção, sincronização temporal, retenção proporcional e acesso controlado.

### 12.6 Ciclo de vida

Segurança começa antes da compra:

1. definir finalidade, risco e requisitos;
2. avaliar fornecedor, suporte, atualizações e dependências;
3. instalar com configuração segura;
4. inventariar dispositivo, versão e responsável;
5. segmentar e monitorar;
6. corrigir vulnerabilidades;
7. responder a incidentes;
8. substituir ao fim do suporte;
9. apagar dados e credenciais no descarte.

Preço de aquisição não é custo total. Conectividade, licenças, manutenção, bateria, calibração, equipe, reposição e saída do fornecedor também contam.

### 12.7 Continuidade e falha segura

Uma solução crítica deve prever:

- perda de rede;
- indisponibilidade da nuvem;
- sensor defeituoso;
- mensagem atrasada ou duplicada;
- comando sem confirmação;
- falta de energia;
- comprometimento de componente.

**Falha segura** significa que o sistema assume estado que reduz dano, não que sempre continua operando normalmente.

---

## 13. Cidades inteligentes

### 13.1 Conceito brasileiro

A Carta Brasileira para Cidades Inteligentes descreve cidades comprometidas com desenvolvimento urbano e transformação digital sustentáveis. Elas atuam de forma planejada, inovadora, inclusiva e em rede e usam tecnologia para:

- solucionar problemas concretos;
- criar oportunidades;
- oferecer serviços com eficiência;
- reduzir desigualdades;
- aumentar resiliência;
- melhorar a qualidade de vida;
- assegurar uso seguro e responsável de dados e TIC.

A Carta também destaca letramento digital, governança e gestão colaborativas.

Ela é documento estratégico construído colaborativamente, não lei nem regulamento técnico obrigatório.

### 13.2 Oito objetivos estratégicos da Carta

Em síntese, os objetivos são:

1. integrar transformação digital e desenvolvimento urbano sustentável;
2. prover acesso equitativo à internet de qualidade;
3. estabelecer governança de dados e tecnologia com transparência, segurança e privacidade;
4. adotar governança urbana inovadora e inclusiva;
5. fomentar desenvolvimento econômico local;
6. estimular financiamento do desenvolvimento urbano sustentável;
7. promover educação, comunicação pública e engajamento social;
8. avaliar continuamente os impactos da transformação digital.

### 13.3 Cidade inteligente não é cidade hipervigiada

Tecnologia deve servir à política urbana. Uma solução sofisticada pode ser inadequada se:

- não atende problema prioritário;
- exclui quem não usa aplicativo;
- concentra investimento em área já favorecida;
- coleta dados excessivos;
- não possui manutenção;
- impede participação e controle;
- cria dependência difícil de reverter.

### 13.4 Valor público

Avaliar valor público exige combinar:

- eficácia;
- eficiência;
- equidade;
- inclusão;
- sustentabilidade ambiental e financeira;
- resiliência;
- segurança e privacidade;
- participação e confiança.

Contar dispositivos instalados mede produto. É necessário verificar se o serviço e a vida das pessoas melhoraram.

---

## 14. Aplicações urbanas

### 14.1 Mobilidade

Possibilidades:

- telemetria de frota;
- informação de chegada;
- análise de tempos de viagem;
- semáforos com regras adaptativas;
- monitoramento de vagas e ativos;
- planejamento de linhas.

Riscos: rastreamento individual, priorização injusta de territórios, comando inseguro e exclusão de quem depende de informação não digital.

### 14.2 Iluminação pública

Sensores e controladores podem:

- detectar falha;
- medir consumo;
- regular luminosidade;
- apoiar manutenção preventiva.

Reduzir intensidade sem considerar segurança, circulação e acessibilidade pode produzir efeito indesejado. A métrica não deve ser somente economia de energia.

### 14.3 Saneamento e água

Medições de nível, pressão, vazão e qualidade podem apoiar:

- detecção de perdas;
- operação de bombas;
- manutenção;
- alerta de contaminação;
- planejamento de capacidade.

Sensor não substitui inspeção, calibração, amostragem adequada ou plano de contingência.

### 14.4 Resíduos

Dados podem otimizar rotas e identificar demanda. Sensor em recipiente é útil somente quando o custo de instalação, manutenção e conectividade compensa o benefício em relação a rotas e dados já disponíveis.

### 14.5 Energia e ambiente

Aplicações incluem:

- medição de consumo;
- qualidade do ar;
- ruído;
- ilhas de calor;
- arborização;
- uso de equipamentos;
- microgeração.

Localização dos sensores deve representar os territórios de interesse. Um mapa detalhado do centro não descreve toda a cidade.

### 14.6 Saúde

Indicadores agregados, capacidade assistencial e alertas podem apoiar planejamento e vigilância. Dados de saúde são sensíveis e exigem proteção reforçada, finalidade e controle de acesso.

### 14.7 Defesa civil

Pluviômetros, nível de rios, estações, sirenes e alertas podem reduzir tempo de resposta.

Uma cadeia de alerta precisa integrar:

1. medição;
2. validação;
3. limiar ou análise;
4. decisão e responsabilidade;
5. comunicação acessível;
6. rota e resposta operacional;
7. teste e manutenção.

Sensor sem comunicação confiável, protocolo de ação ou canal acessível não constitui sistema completo de proteção.

---

## 15. Riscos e governança de cidades inteligentes

### 15.1 Vigilância excessiva

Câmeras, localização e biometria podem transformar infraestrutura de serviço em monitoramento permanente.

Controles:

- finalidade explícita;
- necessidade e proporcionalidade;
- minimização;
- acesso restrito;
- retenção limitada;
- transparência;
- avaliação de impacto;
- auditoria e contestação.

### 15.2 Exclusão digital

Aplicativo exclusivo, conectividade desigual e interface inacessível podem impedir acesso.

Respostas:

- canais alternativos;
- acessibilidade;
- desenho multicanal;
- conectividade e letramento;
- participação de grupos afetados.

### 15.3 Viés territorial

Se áreas centrais recebem mais sensores, geram mais registros. Usar somente esses registros para alocar recursos pode reforçar o investimento no mesmo território.

É necessário mapear cobertura e ausência, combinar fontes e usar critérios públicos de prioridade.

### 15.4 Dependência de fornecedor

**Lock-in** ocorre quando custo ou dificuldade de trocar fornecedor se torna excessivo por:

- formato fechado;
- API insuficiente;
- falta de documentação;
- licença proprietária indispensável;
- conhecimento concentrado;
- ausência de exportação;
- hardware incompatível.

Mitigações contratuais e técnicas:

- padrões e formatos abertos quando adequados;
- APIs documentadas;
- portabilidade de dados e configuração;
- transferência de conhecimento;
- propriedade e acesso aos metadados;
- plano de transição;
- interoperabilidade testada.

### 15.5 Obsolescência

Dispositivo pode permanecer fisicamente funcional e ficar inseguro por falta de atualização. Planejamento deve prever suporte, peças, bateria, conectividade, calibração, substituição e descarte.

### 15.6 Cibersegurança e efeito físico

Ataque a sistema urbano pode:

- apagar ou falsificar telemetria;
- impedir alerta;
- acionar atuador;
- interromper serviço;
- expor dados;
- servir de entrada para outras redes.

Segmentação, identidade, menor privilégio, atualização, monitoramento, continuidade e resposta a incidentes limitam o risco.

### 15.7 Sustentabilidade

Sustentabilidade inclui:

- energia consumida;
- bateria e lixo eletrônico;
- durabilidade;
- manutenção local;
- custo total;
- benefício comprovado;
- capacidade institucional de operar.

Projeto-piloto bem-sucedido pode fracassar em escala se depender de equipe ou subsídio não disponíveis na operação permanente.

---

## 16. Ciclo responsável de um projeto

1. **Problema:** definir necessidade urbana e público afetado.
2. **Alternativas:** comparar solução digital, mudança de processo e opção não tecnológica.
3. **Participação:** ouvir usuários, territórios, operadores e controle.
4. **Dados:** definir finalidade, qualidade, cobertura e proteção.
5. **Arquitetura:** escolher latência, conectividade, edge/cloud e integração.
6. **Aquisição:** exigir segurança, suporte, interoperabilidade e saída.
7. **Piloto:** testar em contexto representativo, não apenas no mais favorável.
8. **Indicadores:** medir produto, resultado, equidade, custo e risco.
9. **Operação:** inventariar, atualizar, calibrar e responder a falhas.
10. **Avaliação:** comparar resultado com linha de base e alternativas.
11. **Escala ou correção:** expandir somente com evidência e capacidade.
12. **Desativação:** migrar dados, apagar credenciais e descartar com segurança.

---

## 17. Situação integrada

Um município pretende instalar sensores de nível de rios e emitir alertas.

Um desenho responsável inclui:

1. mapear áreas de risco e pessoas sem acesso digital;
2. definir precisão, frequência, cobertura e manutenção dos sensores;
3. atribuir identidade única e configuração autorizada;
4. processar localmente limiar crítico quando a perda de rede for provável;
5. transmitir telemetria protegida e registrar qualidade;
6. distinguir ausência de medição de nível igual a zero;
7. combinar alertas automáticos com validação e protocolo de defesa civil;
8. usar sirenes, mensagens e canais acessíveis;
9. testar energia, conectividade, nuvem e operação degradada;
10. medir antecedência, alcance, resposta e redução de dano, não apenas sensores instalados;
11. revisar falsos alarmes, áreas sem cobertura e reclamações;
12. prever atualização, peças, portabilidade e fim de vida.

O sistema melhora informação e coordenação. Ele não elimina incerteza hidrológica, responsabilidade pública ou necessidade de evacuação planejada.

---

## 18. Natureza dos instrumentos

| Instrumento | Natureza no recorte |
|---|---|
| **LGPD** | lei federal vigente sobre proteção de dados pessoais |
| **Decreto nº 10.046/2019** | norma federal sobre governança no compartilhamento no âmbito definido em seu art. 1º |
| **Decreto nº 9.854/2019** | norma que institui o Plano Nacional de IoT e define conceitos e objetivos |
| **Carta Brasileira para Cidades Inteligentes** | agenda estratégica e orientação colaborativa, não lei |
| **NISTIR 8259 e catálogo NIST** | referência técnica de cibersegurança, não norma brasileira obrigatória por si |
| **5 Vs** | heurística didática, não requisito legal fechado |

Uma recomendação pode ser incorporada em contrato, política ou regulação e então tornar-se exigível naquele contexto. Sua origem técnica, isoladamente, não equivale a lei nacional.

---

## 19. Pegadinhas recorrentes

1. **Big data não é apenas grande volume.**
2. **Os 5 Vs são heurística, não lei ou lista universal fechada.**
3. **Dado estruturado pode estar errado; estrutura não garante qualidade.**
4. **JSON é normalmente semiestruturado.**
5. **Streaming não elimina armazenamento, atraso ou duplicidade.**
6. **ETL transforma antes de carregar; ELT carrega antes de transformar.**
7. **Warehouse não é sistema transacional.**
8. **Lake sem governança pode virar pântano de dados.**
9. **Lakehouse não garante interoperabilidade nem baixo custo.**
10. **API é mecanismo; interoperabilidade também exige semântica, organização e base jurídica.**
11. **Metadados descrevem; catálogo permite descobrir; linhagem registra o caminho.**
12. **Completude não é acurácia nem atualidade.**
13. **Análise preditiva estima; não prova causalidade.**
14. **Análise prescritiva recomenda; não substitui decisão competente.**
15. **Produto não é resultado; resultado não é impacto.**
16. **Correlação não implica causalidade.**
17. **Ausência de dado não equivale a zero.**
18. **Amostra grande pode continuar enviesada.**
19. **Total sem denominador pode induzir comparação errada.**
20. **Remover nome não garante anonimização.**
21. **Pseudonimização não torna automaticamente o dado anônimo.**
22. **IoT não exige IA.**
23. **Sensor observa; atuador age.**
24. **Edge e cloud podem coexistir.**
25. **Gateway não é obrigatório em toda arquitetura.**
26. **NIST é referência técnica, não lei brasileira.**
27. **Cidade inteligente não se mede pela quantidade de sensores.**
28. **Carta Brasileira é estratégia, não regulamento obrigatório.**
29. **Mais sensores em um território podem ampliar viés territorial.**
30. **Preço de compra não é custo total do ciclo de vida.**

---

## 20. Mapa de revisão

| Se a questão mencionar... | Pense primeiro em... |
|---|---|
| quantidade, ritmo, formatos, confiança e utilidade | 5 Vs |
| eventos acumulados periodicamente | lote |
| eventos contínuos e baixa latência | streaming |
| transformar antes de carregar | ETL |
| carregar antes de transformar | ELT |
| BI com dados conformados | warehouse |
| dados brutos e variados | lake |
| flexibilidade do lake com controles analíticos | lakehouse |
| significado, fonte e unidade | metadados |
| inventário pesquisável | catálogo |
| origem, transformação e destino | linhagem |
| sistemas trocando com significado comum | interoperabilidade |
| o que ocorreu | análise descritiva |
| fatores relacionados ao ocorrido | análise diagnóstica |
| o que provavelmente ocorrerá | análise preditiva |
| ação recomendada sob restrições | análise prescritiva |
| recursos mobilizados | insumo |
| entrega imediata | produto |
| mudança no serviço ou público | resultado |
| efeito amplo atribuível | impacto |
| cenário sem a intervenção | contrafactual |
| fenômeno captado | sensor |
| ação física | atuador |
| conversão e concentração local | gateway |
| processamento próximo à fonte | edge |
| observação enviada pelo dispositivo | telemetria |
| instrução enviada ao atuador | comando |
| troca difícil de fornecedor | lock-in |
| tecnologia com inclusão e desenvolvimento sustentável | Carta Brasileira |

---

## Referências

- [Decreto nº 9.854, de 25 de junho de 2019](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/decreto/d9854.htm) — Presidência da República; institui o Plano Nacional de Internet das Coisas, publicado no DOU de 26 jun. 2019; acesso em 18 jul. 2026.
- [Decreto nº 10.046, de 9 de outubro de 2019](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/decreto/d10046.htm) — Presidência da República; governança no compartilhamento de dados no âmbito federal definido pelo texto, versão consolidada; acesso em 18 jul. 2026.
- [Lei nº 13.709, de 14 de agosto de 2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm) — Presidência da República; Lei Geral de Proteção de Dados Pessoais, texto compilado; acesso em 18 jul. 2026.
- [Glossário de Termos de Dados](https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/governancadedados/glossario-de-termos-de-dados) — Secretaria de Governo Digital; conceitos de dados e governança, atualizado em 3 jul. 2026; acesso em 18 jul. 2026.
- [Governança de Dados](https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/governancadedados) — Secretaria de Governo Digital; políticas, práticas, benefícios e referências para a administração pública federal; acesso em 18 jul. 2026.
- [Catálogo de Bases de Dados](https://www.gov.br/governodigital/pt-br/governanca-de-dados/sobre_catalogo-de-bases-de-dados) — Secretaria de Governo Digital; descoberta, metadados e governança de bases federais, atualizado em 19 jun. 2026; acesso em 18 jul. 2026.
- [Avaliação de Políticas Públicas](https://www.gov.br/casacivil/pt-br/assuntos/governanca/avaliacao-de-politicas) — Casa Civil da Presidência da República; avaliação ex ante e ex post e uso dos resultados, atualizado em 16 abr. 2025; acesso em 18 jul. 2026.
- [Inferência causal e avaliação de políticas públicas](https://repositorio.ipea.gov.br/entities/publication/a231b1da-9ca1-4791-b912-9eeca1dfa608) — Instituto de Pesquisa Econômica Aplicada; fundamentos de contrafactual e inferência causal, publicado em 2024; acesso em 18 jul. 2026.
- [Boas práticas em anonimização de dados](https://www.gov.br/gestao/pt-br/acesso-a-informacao/privacidade-e-protecao-de-dados/lgpd-no-mgi-1/anonimizacao/boas-praticas-em-anonimizacao-de-dados) — Ministério da Gestão e da Inovação em Serviços Públicos; anonimização, acesso parcial e risco de reidentificação, publicado em 19 maio 2026; acesso em 18 jul. 2026.
- [Estudo técnico sobre anonimização de dados na LGPD](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/estudo_tecnico_sobre_anonimizacao_de_dados_na_lgpd___analise_juridica.pdf/@@display-file/file) — Autoridade Nacional de Proteção de Dados; análise jurídica de anonimização e reidentificação; acesso em 18 jul. 2026.
- [Carta Brasileira para Cidades Inteligentes](https://www.gov.br/cidades/pt-br/acesso-a-informacao/acoes-e-programas/desenvolvimento-urbano-e-metropolitano/projeto-andus/carta-brasileira-para-cidades-inteligentes) — Ministério das Cidades; conceito brasileiro e oito objetivos estratégicos para transformação digital urbana sustentável; acesso em 18 jul. 2026.
- [NISTIR 8259 Series](https://www.nist.gov/itl/applied-cybersecurity/nist-cybersecurity-iot-program/nistir-8259-series) — National Institute of Standards and Technology; série de referência sobre capacidades e atividades de cibersegurança de IoT, página atualizada em 14 maio 2026; acesso em 18 jul. 2026.
- [Technical Device Cybersecurity Capabilities Catalog](https://pages.nist.gov/IoT-Device-Cybersecurity-Requirement-Catalogs/technical/) — National Institute of Standards and Technology; sete capacidades técnicas de cibersegurança de dispositivos IoT; acesso em 18 jul. 2026.
- [Data warehouses versus data lakes versus data lakehouses](https://www.ibm.com/br-pt/think/topics/data-warehouse-vs-data-lake-vs-data-lakehouse) — IBM Think; comparação conceitual entre arquiteturas de dados; acesso em 18 jul. 2026.
