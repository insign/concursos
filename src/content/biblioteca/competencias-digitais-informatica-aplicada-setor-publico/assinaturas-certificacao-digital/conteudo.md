---
schemaVersion: 1
title: "Assinaturas eletrônicas, assinatura digital e certificação digital"
description: Conceitos técnicos, validade jurídica, ICP-Brasil, níveis de assinatura e aplicação em processos administrativos e documentos oficiais.
order: 30
storageId: assinaturas-certificacao-digital
---

# Assinaturas eletrônicas, assinatura digital e certificação digital

Considere uma situação hipotética: dois documentos eletrônicos chegam a um órgão público. Um foi assinado pela plataforma gov.br; o outro, com certificado da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>. Ambos podem ter autoria e integridade verificáveis, mas a norma do ato exige **assinatura qualificada**. Qual deles atende à exigência?

Para responder sem decorar tecnologias isoladas, separe três perguntas:

1. **como o documento foi assinado?** — plano técnico;
2. **qual é o nível jurídico da assinatura?** — simples, avançada ou qualificada;
3. **qual nível a norma exige para aquele ato?** — plano administrativo.

Esse é o mapa do capítulo. Um mecanismo tecnicamente confiável não se torna, só por isso, assinatura qualificada; e uma assinatura válida em certa situação pode ser insuficiente quando a norma exige nível superior.

> **Corte de atualização:** 7 de setembro de 2026. O edital cobra **noções** de assinatura digital em processos administrativos e de assinatura eletrônica e certificação digital em documentos oficiais. O foco é compreender o mecanismo, distinguir os níveis jurídicos e aplicar as regras ao setor público, sem aprofundamento criptográfico desnecessário.

## 1. Primeiro contraste: assinatura, certificado, autenticação e digitalização

### 1.1 Assinatura eletrônica é o gênero jurídico

A Lei nº 14.063/2020 define **assinatura eletrônica** como dados em formato eletrônico ligados ou logicamente associados a outros dados eletrônicos e usados pelo signatário para assinar. A lei organiza as assinaturas eletrônicas em três níveis:

- **simples**;
- **avançada**;
- **qualificada**.

Portanto, “assinatura eletrônica” não significa apenas <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>.

### 1.2 Assinatura digital é um mecanismo técnico

Em sentido técnico, **assinatura digital** é um mecanismo criptográfico baseado em <abbr title="Uso de um par de chaves matematicamente relacionadas, uma privada e outra pública">criptografia assimétrica</abbr>. Ele permite relacionar o signatário aos dados assinados e verificar se esses dados foram alterados depois da assinatura.

Quando uma assinatura digital usa certificado da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>, ela atende ao conceito legal de **assinatura eletrônica qualificada**. Mas as expressões não são sinônimas em qualquer contexto:

- toda assinatura qualificada é assinatura eletrônica;
- nem toda assinatura eletrônica é qualificada;
- uma assinatura avançada pode usar certificado não <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> ou outro meio admitido;
- imagem de assinatura manuscrita não é assinatura digital criptográfica.

### 1.3 Assinatura digitalizada

**Assinatura digitalizada** é a imagem da assinatura manuscrita inserida em arquivo eletrônico. Isoladamente, ela pode ser copiada e não cria vínculo criptográfico com o conteúdo.

A distinção de prova é curta: **digitalizada ≠ digital**.

### 1.4 Certificado digital

O **certificado digital** é um documento eletrônico que vincula uma identidade a dados de validação, especialmente a chave pública, dentro de uma <abbr title="Sequência de certificados que liga o signatário a uma raiz confiável">cadeia de confiança</abbr>.

Ele **não é a assinatura de cada documento**. A assinatura é produzida sobre dados específicos; o certificado ajuda o verificador a relacionar a chave usada à identidade indicada.

### 1.5 Autenticação

**Autenticação** é o processo de identificar eletronicamente o usuário. Entrar em um sistema com credenciais pode autenticar a pessoa sem significar que cada documento consultado, criado ou enviado foi automaticamente assinado.

### 1.6 Nato-digital e digitalizado

| Categoria | Origem |
| --- | --- |
| **nato-digital** | criado originalmente em meio eletrônico |
| **digitalizado** | representação digital de documento originalmente físico |

Digitalizar não equivale a assinar. Assinar um arquivo também não altera sua origem.

## 2. O mecanismo técnico mínimo

Imagine que Ana assine um documento e Bruno precise conferir a assinatura. Em vez de decorar “privada assina; pública verifica”, acompanhe o fluxo:

1. o sistema calcula um <abbr title="Resumo criptográfico do conteúdo, usado para detectar alterações">hash</abbr> do documento, isto é, um resumo criptográfico do conteúdo;
2. a chave privada de Ana participa da criação da assinatura digital vinculada àquele conteúdo;
3. o certificado ajuda Bruno a relacionar a identidade de Ana à chave pública correspondente;
4. na verificação, o sistema usa a chave pública e recalcula o hash do documento recebido. Se o conteúdo tiver mudado, o hash recalculado deixa de coincidir com o valor protegido pela assinatura.

Esse fluxo separa funções que a prova costuma misturar: **o hash representa o conteúdo; a chave privada participa da assinatura; a chave pública participa da verificação; o certificado liga a chave à identidade.**

### 2.1 Chave privada e chave pública

- **chave privada:** deve permanecer sob controle do titular e é usada para produzir a assinatura;
- **chave pública:** pode ser divulgada e é usada na verificação correspondente.

A segurança depende de não ser viável obter, na prática, a chave privada a partir da pública.

### 2.2 Hash e integridade

Se o conteúdo muda, seu hash tende a mudar também. Por isso, o hash ajuda a detectar alteração posterior.

O hash:

- ajuda a verificar **integridade**;
- não é uma cifra reversível;
- não torna o documento secreto;
- não prova, sozinho, quem produziu os dados.

### 2.3 Assinatura não é confidencialidade

A assinatura digital busca principalmente **autenticidade/autoria e integridade**. Ela não cifra automaticamente o conteúdo.

**Assinatura** → autoria + integridade.  
**Cifragem** → confidencialidade.

Em um modelo simplificado de cifragem assimétrica para sigilo, usa-se a **chave pública do destinatário** para cifrar e a chave privada correspondente para decifrar. Essa operação é diferente de assinar.

### 2.4 Não repúdio

A assinatura pode fornecer elementos técnicos e jurídicos que dificultam a negativa de autoria. Isso não significa impossibilidade absoluta de fraude nem elimina a análise de coação, comprometimento da chave privada, uso indevido de credenciais ou poderes de representação.

## 3. A infraestrutura de confiança: <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>

Em sentido geral, uma <abbr title="Infraestrutura de Chaves Públicas">ICP</abbr> combina tecnologia, pessoas, políticas e procedimentos para administrar certificados digitais e sua confiança ao longo do ciclo de vida. No Brasil, a <abbr title="Medida Provisória">MP</abbr> nº 2.200-2/2001 instituiu a <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> para sustentar autenticidade, integridade e validade jurídica de documentos eletrônicos e transações eletrônicas seguras.

### 3.1 Quem faz o quê

| Integrante | Função essencial |
| --- | --- |
| Comitê Gestor da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> | define políticas, critérios e normas da infraestrutura |
| <abbr title="Instituto Nacional de Tecnologia da Informação">ITI</abbr> | autarquia federal que exerce a função de <abbr title="Autoridade Certificadora Raiz">AC Raiz</abbr> |
| <abbr title="Autoridade Certificadora Raiz">AC Raiz</abbr> | certifica autoridades do nível seguinte e supervisiona a cadeia; não emite certificado diretamente ao usuário final |
| <abbr title="Autoridade Certificadora">AC</abbr> | emite, expede, distribui, revoga e gerencia certificados |
| <abbr title="Autoridade de Registro">AR</abbr> | identifica e cadastra usuários e encaminha solicitações à <abbr title="Autoridade Certificadora">AC</abbr> |
| titular ou responsável | controla o meio de assinatura e a chave privada aplicável |

A sequência mais cobrada é: **<abbr title="Autoridade de Registro">AR</abbr> identifica; <abbr title="Autoridade Certificadora">AC</abbr> emite; <abbr title="Instituto Nacional de Tecnologia da Informação">ITI</abbr> exerce a função de <abbr title="Autoridade Certificadora Raiz">AC Raiz</abbr>.**

### 3.2 Cadeia de confiança

Ver um nome ou um selo visual em um arquivo <abbr title="Portable Document Format">PDF</abbr> não basta. A validação deve relacionar o certificado do signatário à autoridade emissora e, sucessivamente, à raiz confiável, além de verificar os elementos pertinentes ao caso.

O mesmo raciocínio vale para certificados no padrão <abbr title="Padrão técnico amplamente usado para representar certificados digitais">X.509</abbr>: um campo <abbr title="Common Name, campo de nome comum do certificado">CN</abbr> com nome aparentemente correto **não prova sozinho** que o certificado é autêntico ou confiável. A confiança depende da cadeia, da assinatura das autoridades, da validade, do estado de revogação e das políticas aplicáveis.

### 3.3 Ciclo de vida: validade, expiração e revogação

Um certificado tem período de validade. **Expiração** é o término desse período. **Revogação** é o encerramento antecipado da confiança, por exemplo quando há comprometimento ou risco de comprometimento do meio de assinatura.

Na <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>, a <abbr title="Autoridade Certificadora">AC</abbr> disponibiliza informações sobre certificados revogados. Uma forma tradicional é a <abbr title="Lista de Certificados Revogados">LCR</abbr>, lista assinada pela autoridade e publicada periodicamente. Em materiais técnicos em inglês, a mesma lista aparece como <abbr title="Certificate Revocation List">CRL</abbr>.

Duas consequências evitam erros de prova:

- chave privada exposta exige reação sobre o certificado; continuar confiando nele até a data normal de expiração contraria a lógica da infraestrutura;
- um certificado estar vencido **hoje** não torna automaticamente inválida toda assinatura produzida no passado. É preciso verificar o momento relevante e as evidências disponíveis sobre validade e revogação.

### 3.4 Carimbo do tempo

O **carimbo do tempo** fornece evidência de que determinada informação digital existia em certa data e hora. Na <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>, ele pode servir como âncora temporal para a validação, inclusive na análise do período de validade e do estado de revogação do certificado.

Ele **não substitui a assinatura** e não informa necessariamente quando o documento foi criado: registra o momento em que a informação correspondente chegou à entidade emissora do carimbo.

## 4. Efeitos jurídicos da <abbr title="Medida Provisória">MP</abbr> nº 2.200-2/2001

O <abbr title="artigo">art.</abbr> 10 traz duas ideias que precisam ser lidas juntas.

### 4.1 Certificação <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>

Declarações constantes de documentos eletrônicos produzidos com certificação disponibilizada pela <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> possuem a presunção legal prevista em relação aos signatários.

Essa presunção não transforma o documento em verdade absoluta nem impede impugnação fundamentada.

### 4.2 Outros meios também podem produzir efeitos jurídicos

A <abbr title="Medida Provisória">MP</abbr> nº 2.200-2/2001 não impede outro meio de comprovação de autoria e integridade, inclusive certificado não <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>, quando admitido pelas partes ou aceito pela pessoa a quem o documento for oposto.

Assim, duas generalizações estão erradas:

- “somente <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> produz documento eletrônico juridicamente válido”;
- “qualquer meio sempre substitui a <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>”.

A segunda falha quando norma específica exige **assinatura qualificada**.

## 5. Lei nº 14.063/2020: simples, avançada e qualificada

Depois de entender o mecanismo técnico, a classificação legal fica mais clara.

| Nível | Núcleo legal | Consequência prática |
| --- | --- | --- |
| **simples** | identifica o signatário e associa seus dados a outros dados eletrônicos | menor nível de confiança entre os três |
| **avançada** | associação unívoca ao signatário, controle com elevada confiança e possibilidade de detectar alterações; pode usar certificado não <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> ou outro meio admitido | maior garantia sem exigir <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> |
| **qualificada** | utiliza certificado digital nos termos da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> | maior nível de confiabilidade |

Nível mais alto não significa que os anteriores sejam inválidos em todas as situações. A pergunta correta é: **qual nível a norma exige para este ato?**

A lei também exige que meios de assinatura permitam revogação ou cancelamento definitivo em caso de comprometimento, especialmente quando houver vazamento ou risco à segurança.

### 5.1 Quem define o nível no setor público

No regime da Lei nº 14.063/2020, o titular do Poder ou do órgão constitucionalmente autônomo competente define o nível mínimo exigido para documentos e interações, respeitados os limites legais.

Em síntese:

- **simples:** pode ser admitida em interações de menor impacto e que não envolvam informação protegida por sigilo;
- **avançada:** atende situações que exigem maior garantia de autoria e integridade;
- **qualificada:** deve ser admitida em qualquer interação eletrônica com ente público, sem cadastramento prévio, e é obrigatória nas hipóteses definidas em lei.

Entre as hipóteses legais de assinatura qualificada obrigatória estão atos assinados por chefes de Poder, Ministros de Estado e titulares de Poder ou órgão constitucionalmente autônomo, além de outras hipóteses legais.

Se houver conflito entre normas sobre o nível de assinatura no regime disciplinado pela Lei nº 14.063/2020, prevalece a assinatura qualificada.

## 6. Assinatura gov.br: avançada, não qualificada

A assinatura eletrônica disponibilizada pelo serviço oficial para contas **gov.br prata ou ouro** é **assinatura avançada**.

Retome a situação inicial: se um ato exige assinatura qualificada, uma assinatura gov.br prata ou ouro não atende à exigência só por ser oficial ou possuir alto nível de conta. Para assinatura qualificada, é necessário certificado da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>.

Portanto, gov.br prata/ouro:

- não é mera assinatura simples;
- não é assinatura qualificada;
- pode atender atos para os quais a avançada seja suficiente.

## 7. Decreto nº 10.543/2020: não generalize o âmbito

O Decreto nº 10.543/2020 regulamenta os níveis mínimos para a **administração pública federal direta, autárquica e fundacional**. Ele não deve ser aplicado automaticamente a Tribunais de Contas, Judiciário, Estados, Municípios, empresas públicas ou sociedades de economia mista sem verificar a norma competente.

### 7.1 Exemplos federais úteis

| Nível | Exemplos no decreto |
| --- | --- |
| **simples** | agendamento, pesquisa pública, envio de documento e recebimento de protocolo em contexto de baixo risco |
| **avançada** | contratos e instrumentos congêneres, defesa e recurso administrativo, fiscalização e declarações com maior impacto |
| **qualificada** | atos do Presidente da República e de Ministros de Estado e demais hipóteses legais |

A autoridade competente pode exigir nível superior ao mínimo quando a natureza do ato justificar, mas não pode reduzir requisito que a lei já tornou qualificado.

A classificação eletrônica também não serve, por si só, para recusar assinatura presencial ou derivada de procedimento presencial de identificação.

## 8. Assinaturas em processos administrativos

A Lei nº 14.129/2021 fornece uma regra de raciocínio útil: documentos e atos processuais em meio digital são válidos com assinatura eletrônica quando respeitam parâmetros de **autenticidade, integridade e segurança adequados ao risco e à criticidade** da decisão, informação ou serviço.

No processo administrativo eletrônico federal, o sistema deve permitir verificar autoria e integridade segundo os padrões normativos aplicáveis. Isso **não** significa certificado <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> obrigatório para todo ato.

Pontos essenciais:

- o nível deve ser adequado ao ato, ao risco e à norma aplicável;
- documento nato-digital assinado na forma da Lei nº 14.129/2021 é considerado original para todos os efeitos legais;
- autenticação do usuário e assinatura de um ato são operações distintas;
- documento digitalizado não se torna nato-digital nem original apenas porque foi convertido para arquivo eletrônico.

A estrutura do <abbr title="Processo Eletrônico Nacional">PEN</abbr>, o funcionamento do <abbr title="Sistema Eletrônico de Informações">SEI</abbr>, protocolo, tramitação e gestão documental pertencem ao assunto seguinte. Aqui basta guardar a ponte: **o processo eletrônico precisa de mecanismos de autoria e integridade, mas o nível de assinatura depende da regra aplicável ao ato**.

## 9. Modernização dos certificados da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>

A Resolução <abbr title="Comitê Gestor">CG</abbr> <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> nº 211/2024 modernizou os tipos de certificados e continua em vigor em 2026.

Para a prova de noções, o quadro relevante é:

- em 2026 há **coexistência** entre certificados legados e novos perfis durante a transição;
- desde 1º de novembro de 2024 foram introduzidos novos tipos, inclusive certificados de assinatura para pessoa física e o **Selo Eletrônico — <abbr title="Selo Eletrônico">SE</abbr>** para pessoa jurídica;
- os tipos existentes podem continuar em uso durante a transição até **2 de março de 2029**, observadas as regras aplicáveis a cada perfil;
- o <abbr title="Selo Eletrônico">SE</abbr> identifica a pessoa jurídica como origem ou responsável por documentos e processos automatizados e **não serve para manifestação de vontade**, como firmar contrato ou acordo.

Por isso, não trate a associação antiga “<abbr title="Tipo legado de certificado digital">A1</abbr> = software / <abbr title="Tipo legado de certificado digital">A3</abbr> = token” como descrição completa e permanente da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>. Esses tipos ainda são relevantes durante a transição, mas o modelo normativo está sendo modernizado.

Para a prova de 2026, importa reconhecer a coexistência dos perfis; a mudança final prevista para 2029 é regra futura já publicada.

## 10. Como validar sem confiar na aparência

O serviço oficial **VALIDAR**, mantido pelo <abbr title="Instituto Nacional de Tecnologia da Informação">ITI</abbr>, permite verificar a conformidade de assinaturas eletrônicas reconhecidas pelo serviço, inclusive assinaturas avançadas da plataforma gov.br e qualificadas da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>.

Ao conferir um documento, pense nesta sequência:

1. o arquivo apresentado é realmente o arquivo assinado?
2. quem é o signatário indicado?
3. a integridade está preservada?
4. existe certificado e, se houver, a cadeia é confiável?
5. o certificado estava válido e não revogado no momento relevante?
6. existe evidência temporal pertinente, como carimbo do tempo?
7. o nível da assinatura é suficiente para o ato?

A validação técnica não resolve sozinha questões jurídicas como capacidade, poderes de representação ou vício de vontade.

## 11. Roteiro de resolução

Quando aparecer uma questão, percorra a sequência:

1. ela cobra **mecanismo técnico**, **efeito jurídico** ou **nível exigido**?
2. é assinatura, autenticação, certificado ou mera digitalização?
3. a assinatura é simples, avançada ou qualificada?
4. há certificado da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> e ele é necessário?
5. o certificado e sua cadeia estão válidos para o momento relevante, sem revogação impeditiva?
6. a norma exige nível específico ou permite escolher conforme risco?
7. o ente está realmente submetido ao Decreto nº 10.543/2020?
8. há regra de transição da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> relevante ao caso?
