---
schemaVersion: 1
title: Assinatura digital, assinatura eletrônica e certificação
description: Conceitos técnicos, validade jurídica, ICP-Brasil, níveis de assinatura e aplicação em processos administrativos e documentos oficiais.
order: 30
storageId: tec-assinaturas-certificacao
---

# Assinaturas eletrônicas, assinatura digital e certificação digital

> **Corte de atualização:** 10 de agosto de 2026. O edital cobra **noções** de assinatura digital em processos administrativos e de assinatura eletrônica e certificação digital em documentos oficiais. O foco é distinguir conceitos, compreender os efeitos jurídicos essenciais, reconhecer os níveis de assinatura e aplicar as regras ao setor público sem aprofundamento criptográfico desnecessário.

## 1. Mapa do assunto

A prova pode misturar três planos diferentes:

1. **técnico:** assinatura, certificado, chaves e hash;
2. **jurídico:** validade, presunção da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> e níveis simples, avançado e qualificado;
3. **administrativo:** qual nível de assinatura é suficiente ou obrigatório para determinado ato.

A questão deve ser resolvida nessa ordem. Um mecanismo tecnicamente seguro pode não ser o nível jurídico exigido; uma assinatura válida em certa situação pode não servir quando a norma exigir assinatura qualificada.

### Base normativa essencial

| Norma | Núcleo para este assunto |
| --- | --- |
| <abbr title="Medida Provisória">MP</abbr> nº 2.200-2/2001 | ICP-Brasil e efeitos jurídicos dos documentos eletrônicos |
| Lei nº 14.063/2020 | assinaturas simples, avançadas e qualificadas |
| Decreto nº 10.543/2020 | níveis mínimos na administração pública federal direta, autárquica e fundacional |
| Decreto nº 8.539/2015 | autoria e integridade no processo administrativo eletrônico federal |
| Lei nº 14.129/2021 | adequação da assinatura ao risco em serviços e processos digitais |
| Resolução <abbr title="Comitê Gestor">CG</abbr> ICP-Brasil nº 211/2024 | modernização dos tipos de certificados e transição da ICP-Brasil |

## 2. Conceitos que não podem ser confundidos

### 2.1 Assinatura eletrônica

A Lei nº 14.063/2020 trata **assinatura eletrônica** como o gênero: dados em formato eletrônico ligados ou logicamente associados a outros dados eletrônicos e utilizados pelo signatário para assinar.

Para a lei, há três níveis:

- **simples**;
- **avançada**;
- **qualificada**.

### 2.2 Assinatura digital

Em sentido técnico, **assinatura digital** é um mecanismo criptográfico que usa criptografia assimétrica e permite verificar a relação entre o signatário e os dados assinados.

Em linguagem administrativa brasileira, a expressão aparece frequentemente associada a certificados digitais e, quando baseada em certificado ICP-Brasil, corresponde à **assinatura eletrônica qualificada**.

Não trate, porém, todas as expressões como sinônimos:

- toda assinatura qualificada é assinatura eletrônica;
- nem toda assinatura eletrônica é qualificada;
- uma assinatura avançada pode usar certificado não ICP-Brasil ou outro meio admitido;
- imagem de assinatura manuscrita não é assinatura digital criptográfica.

### 2.3 Assinatura digitalizada

É a imagem da assinatura manuscrita inserida em arquivo eletrônico. Isoladamente, ela pode ser copiada e não cria vínculo criptográfico com o conteúdo.

**Pegadinha:** digitalizada ≠ digital.

### 2.4 Certificado digital

O **certificado digital** vincula uma identidade a dados usados para validar a assinatura, especialmente a chave pública, dentro de uma cadeia de confiança.

Ele **não é a assinatura de cada documento**. A assinatura é produzida para os dados assinados; o certificado ajuda a verificar a identidade e a chave correspondente.

### 2.5 Autenticação

**Autenticar** é identificar eletronicamente o usuário. Entrar em sistema com credenciais pode autenticar a pessoa sem significar que todo documento acessado ou produzido foi automaticamente assinado.

### 2.6 Nato-digital e digitalizado

| Categoria | Origem |
| --- | --- |
| **nato-digital** | criado originalmente em meio eletrônico |
| **digitalizado** | representação digital de documento originalmente físico |

Digitalizar não equivale a assinar. Assinar um arquivo também não altera sua origem.

## 3. Noções técnicas de assinatura digital

### 3.1 Chaves assimétricas

Em uma explicação segura para prova:

- **chave privada:** fica sob controle do titular e é usada para produzir a assinatura;
- **chave pública:** pode ser divulgada e é usada para verificar a assinatura.

A chave pública não deve permitir obter, na prática, a chave privada.

### 3.2 Hash

Uma função **hash** produz um resumo criptográfico do conteúdo. Pequena alteração no arquivo tende a gerar resumo diferente, permitindo detectar modificação posterior.

Hash:

- ajuda a verificar integridade;
- não é cifra reversível;
- não torna o documento secreto.

### 3.3 Assinatura não é confidencialidade

A assinatura digital busca principalmente **autoria/autenticidade e integridade**. Ela não cifra automaticamente o conteúdo.

**Assinatura** → autoria + integridade.  
**Cifragem** → confidencialidade.

As duas técnicas podem ser combinadas, mas resolvem problemas diferentes.

### 3.4 Não repúdio

A assinatura pode fornecer elementos técnicos e jurídicos que dificultam a negativa de autoria. Isso não impede apuração de fraude, coação, comprometimento de credenciais ou uso indevido da chave privada.

## 4. ICP-Brasil

### 4.1 Finalidade

A MP nº 2.200-2/2001 instituiu a **Infraestrutura de Chaves Públicas Brasileira — ICP-Brasil** para sustentar autenticidade, integridade e validade jurídica de documentos eletrônicos e transações eletrônicas seguras.

### 4.2 Estrutura essencial

| Integrante | Função de prova |
| --- | --- |
| **Comitê Gestor da ICP-Brasil** | define políticas, critérios e normas da infraestrutura |
| **<abbr title="Instituto Nacional de Tecnologia da Informação">ITI</abbr>** | autarquia federal que exerce a função de Autoridade Certificadora Raiz |
| **AC Raiz** | certifica autoridades do nível seguinte e supervisiona a cadeia; não emite certificado ao usuário final |
| **Autoridade Certificadora — AC** | emite, distribui, revoga e gerencia certificados |
| **Autoridade de Registro — AR** | identifica e cadastra usuários e encaminha solicitações à AC |
| **titular/responsável** | controla o meio de assinatura e a chave privada aplicável |

Pegadinhas clássicas:

- **AR identifica; AC emite.**
- **ITI = AC Raiz.**
- **AC Raiz não emite certificado diretamente ao usuário final.**
- chave privada não deve ser compartilhada.

### 4.3 Cadeia de confiança

A validação não se resume a visualizar um selo em PDF. O verificador relaciona o certificado do signatário à autoridade emissora e à raiz confiável e verifica, conforme o caso:

- integridade da assinatura;
- identidade indicada;
- validade do certificado;
- situação de revogação;
- política e finalidade aplicáveis.

## 5. Efeitos jurídicos da MP nº 2.200-2/2001

O art. 10 deve ser lembrado por duas ideias complementares.

### 5.1 ICP-Brasil

Declarações constantes de documentos eletrônicos produzidos com certificação disponibilizada pela ICP-Brasil possuem a presunção legal prevista em relação aos signatários.

Essa presunção não deve ser convertida em verdade absoluta e imune a impugnação.

### 5.2 Outros meios também podem ser válidos

A MP não impede outro meio de comprovação de autoria e integridade, inclusive certificado não ICP-Brasil, quando admitido pelas partes ou aceito pela pessoa a quem o documento for oposto.

Portanto:

- é errado dizer que **somente** ICP-Brasil pode produzir documento eletrônico válido;
- é igualmente errado concluir que qualquer meio substitui a ICP-Brasil quando uma norma específica exigir **assinatura qualificada**.

## 6. Lei nº 14.063/2020: três níveis

| Nível | Núcleo | Leitura de prova |
| --- | --- | --- |
| **simples** | identifica o signatário e associa seus dados a outros dados eletrônicos | menor nível de confiança legal |
| **avançada** | associação unívoca ao signatário, controle com elevada confiança e possibilidade de detectar alterações; pode usar certificado não ICP-Brasil ou outro meio admitido | maior garantia sem exigir ICP-Brasil |
| **qualificada** | utiliza certificado digital nos termos da ICP-Brasil | maior nível de confiabilidade |

Nível mais alto não significa que os anteriores sejam inválidos em todas as situações. A regra é verificar o ato e a norma aplicável.

### 6.1 Definição do nível no setor público

No âmbito da Lei nº 14.063/2020, o titular do Poder ou do órgão constitucionalmente autônomo competente define o nível mínimo exigido para documentos e interações, respeitados os limites legais.

Em síntese:

- **simples:** pode ser admitida em interações de menor impacto e sem informação protegida por sigilo;
- **avançada:** atende situações que exigem maior garantia de autoria e integridade;
- **qualificada:** deve ser admitida em qualquer interação eletrônica com ente público, sem cadastramento prévio, e é obrigatória nas hipóteses definidas em lei.

Entre as hipóteses legais de assinatura qualificada obrigatória estão atos assinados por chefes de Poder, Ministros de Estado e titulares de Poder ou órgão constitucionalmente autônomo, além de outras situações previstas em lei.

Se houver conflito normativo sobre o nível no regime de interações públicas disciplinado pela Lei nº 14.063/2020, prevalece a assinatura qualificada.

## 7. Assinatura gov.br

A assinatura eletrônica disponibilizada pelo serviço oficial para contas **gov.br prata ou ouro** é **assinatura avançada**.

Logo:

- não é mera assinatura simples;
- não é assinatura qualificada ICP-Brasil;
- pode atender atos para os quais a avançada seja suficiente;
- não substitui certificado ICP-Brasil quando a qualificada for obrigatória.

## 8. Decreto nº 10.543/2020: cuidado com o âmbito

O decreto regulamenta os níveis mínimos para a **administração pública federal direta, autárquica e fundacional**. Não deve ser generalizado automaticamente a TCEs, Judiciário, estados, municípios, empresas públicas ou sociedades de economia mista sem verificar a norma competente.

### 8.1 Exemplos úteis

| Nível | Exemplos no decreto federal |
| --- | --- |
| **simples** | agendamento, pesquisa pública, envio de documento e recebimento de protocolo em contexto de baixo risco |
| **avançada** | contratos e instrumentos congêneres, defesa e recurso administrativo, fiscalização, declarações com maior impacto |
| **qualificada** | atos do Presidente da República e de Ministros de Estado e demais hipóteses legais |

A autoridade competente pode exigir nível superior ao mínimo quando a natureza do ato justificar. Não pode reduzir requisito que a lei já tornou qualificado.

O decreto também impede usar a classificação eletrônica como fundamento, por si só, para recusar assinatura presencial ou derivada de procedimento presencial de identificação.

## 9. Assinaturas em processos administrativos

No processo administrativo eletrônico federal, o sistema deve permitir verificar autoria e integridade segundo os padrões normativos aplicáveis. Isso **não** significa certificado ICP-Brasil obrigatório para todo ato.

Pontos de prova:

- o nível deve ser adequado ao ato e ao risco;
- documento nato-digital corretamente assinado pode ser considerado original;
- autenticação do usuário e assinatura de um ato são operações distintas;
- documento digitalizado não se torna original apenas por existir em PDF;
- regras completas de processo eletrônico, <abbr title="Processo Eletrônico Nacional">PEN</abbr> e <abbr title="Sistema Eletrônico de Informações">SEI</abbr> pertencem ao assunto seguinte.

A Lei nº 14.129/2021 reforça a escolha de soluções de assinatura compatíveis com autenticidade, integridade, segurança e risco.

## 10. Transição dos certificados ICP-Brasil

A **Resolução CG ICP-Brasil nº 211/2024** modernizou os tipos de certificados. Essa mudança **já estava em vigor na publicação do edital de 2026**.

Para fins de prova de noções, memorize o quadro:

- em 2026 há **coexistência** entre certificados legados e novos perfis durante período de transição;
- desde 1º/11/2024 foram introduzidos novos tipos, entre eles certificados de assinatura para pessoa física e o **Selo Eletrônico — SE** para pessoa jurídica;
- a transição dos certificados legados se estende até **2/3/2029**;
- o **Selo Eletrônico** identifica a pessoa jurídica como origem ou responsável por documentos e processos automatizados e **não serve para manifestação de vontade**, como firmar contrato ou acordo.

Não trate, portanto, uma tabela antiga de “A1 = software / A3 = token” como descrição completa e permanente da ICP-Brasil. Esses rótulos continuam relevantes no período de transição, mas o modelo normativo já está sendo modernizado.

> **Norma futura expressamente indicada:** a etapa final da transição está prevista para 2029. Para a prova de 2026, importa reconhecer que a mudança já existe, mas ainda há coexistência de perfis.

## 11. Validação prática

O serviço oficial **VALIDAR**, mantido pelo ITI, permite conferir a conformidade de assinaturas eletrônicas reconhecidas, inclusive assinaturas avançadas da plataforma gov.br e qualificadas ICP-Brasil.

Na conferência de um documento, pense em:

1. arquivo efetivamente assinado;
2. identidade do signatário;
3. integridade;
4. certificado e cadeia, quando existentes;
5. validade e revogação no momento relevante;
6. nível de assinatura exigido para o ato.

A validação técnica não resolve sozinha questões jurídicas como capacidade, poderes de representação ou vício de vontade.

## 12. Pegadinhas de prova

1. **Eletrônica = gênero; qualificada = ICP-Brasil.**
2. **Digitalizada ≠ digital.**
3. **Certificado ≠ assinatura.**
4. **Autenticação ≠ assinatura automática de cada ato.**
5. **Privada assina; pública verifica.**
6. **Hash ajuda na integridade; não cria sigilo.**
7. **Assinatura não cifra automaticamente o documento.**
8. **AR identifica; AC emite.**
9. **ITI é AC Raiz.**
10. **ICP-Brasil gera presunção legal específica, mas não é o único meio possível de validade.**
11. **gov.br prata/ouro = avançada, não qualificada.**
12. **Nem todo ato administrativo exige assinatura qualificada.**
13. **Decreto nº 10.543/2020 tem âmbito federal específico.**
14. **Selo Eletrônico de PJ identifica origem/responsabilidade; não expressa vontade.**
15. **Em 2026 a ICP-Brasil está em transição normativa; não memorize A1/A3 como quadro eterno.**

## 13. Roteiro de resolução

1. A questão fala de **conceito**, **efeito jurídico** ou **nível exigido**?
2. O meio é simples, avançado ou qualificado?
3. Há certificado ICP-Brasil?
4. A norma exige qualificada ou apenas admite outro nível?
5. O ente está realmente submetido ao Decreto nº 10.543/2020?
6. A situação envolve assinatura ou apenas autenticação/digitalização?
7. Se houver certificado, a cadeia e a integridade foram verificadas?
8. Há regra de transição da ICP-Brasil relevante ao caso?
