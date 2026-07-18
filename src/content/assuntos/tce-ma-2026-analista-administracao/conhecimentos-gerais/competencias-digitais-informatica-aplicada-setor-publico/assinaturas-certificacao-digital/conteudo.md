---
schemaVersion: 1
title: "Assinaturas eletrônicas, assinatura digital e certificação digital"
description: Conceitos técnicos, validade jurídica, ICP-Brasil, níveis de assinatura e aplicação em processos administrativos e documentos oficiais.
order: 30
storageId: assinaturas-certificacao-digital
---

## 1. Recorte do assunto e corte normativo

Este assunto reúne dois pontos do edital que formam um único núcleo:

- assinatura digital em processos administrativos;
- assinatura eletrônica e certificação digital em documentos oficiais.

O corte normativo é **18 de julho de 2026**. A base principal é formada por:

- Medida Provisória nº 2.200-2/2001, que institui a ICP-Brasil;
- Lei nº 14.063/2020, que classifica as assinaturas eletrônicas e disciplina seu uso em interações com entes públicos;
- Decreto nº 10.543/2020, que define níveis mínimos para a administração pública federal direta, autárquica e fundacional;
- Decreto nº 8.539/2015 e Lei nº 14.129/2021, sobre processos administrativos eletrônicos e Governo Digital;
- Lei nº 12.682/2012 e Decreto nº 10.278/2020, sobre digitalização e efeitos dos documentos digitalizados.

Três perguntas devem orientar a solução de qualquer questão:

1. **Qual é o conceito técnico?** Assinatura, certificado, hash e criptografia não são sinônimos.
2. **Qual é o efeito jurídico?** A ICP-Brasil gera uma presunção legal específica, mas outros meios também podem ser admitidos.
3. **Qual nível a norma exige para aquele ato?** Nem toda interação pública exige assinatura qualificada.

---

## 2. Vocabulário essencial

### 2.1 Assinatura eletrônica é o gênero

A Lei nº 14.063/2020 define **assinatura eletrônica** como dados em formato eletrônico ligados ou logicamente associados a outros dados eletrônicos e utilizados pelo signatário para assinar.

Ela é o gênero que, para os fins da lei, abrange três níveis:

- simples;
- avançada;
- qualificada.

### 2.2 Assinatura digital

Em sentido técnico, **assinatura digital** é o mecanismo criptográfico baseado em um par de chaves matematicamente relacionadas e, em regra, em um resumo criptográfico do documento.

No vocabulário jurídico-administrativo brasileiro, a expressão aparece muitas vezes associada à assinatura com certificado ICP-Brasil. Nessa hipótese, ela corresponde à **assinatura eletrônica qualificada** da Lei nº 14.063/2020.

As expressões, porém, não devem ser tratadas como sinônimos absolutos em qualquer contexto:

- uma assinatura eletrônica pode não usar criptografia assimétrica;
- uma assinatura avançada pode usar certificado não ICP-Brasil ou outro mecanismo admitido;
- a categoria jurídica **qualificada** exige certificado nos termos da ICP-Brasil.

### 2.3 Certificado digital

**Certificado digital** é o atestado eletrônico que associa dados de validação da assinatura a uma pessoa natural ou jurídica. Na ICP-Brasil, ele é emitido por Autoridade Certificadora credenciada.

O certificado normalmente contém ou referencia, entre outros elementos:

- identidade do titular;
- chave pública;
- Autoridade Certificadora emissora;
- número de série;
- período de validade;
- assinatura da autoridade emissora.

O certificado **não é a assinatura**. Ele vincula identidade e chave pública dentro de uma cadeia de confiança; a assinatura é gerada para determinado documento ou conjunto de dados.

### 2.4 Autenticação não é assinatura

**Autenticação** é o processo que permite identificar eletronicamente uma pessoa natural ou jurídica. Entrar em um sistema com credenciais pode autenticar o usuário, mas isso não significa automaticamente que cada documento foi assinado com todos os requisitos do nível exigido.

### 2.5 Assinatura digitalizada não é assinatura digital

A **assinatura digitalizada** é a imagem de uma assinatura manuscrita inserida em um arquivo. Isoladamente, ela:

- pode ser copiada;
- não se vincula criptograficamente ao conteúdo;
- não detecta alteração posterior do documento;
- não oferece a mesma comprovação de autoria e integridade de uma assinatura digital.

### 2.6 Documento nato-digital e documento digitalizado

| Categoria | Origem |
|---|---|
| **nato-digital** | criado originalmente em meio eletrônico |
| **digitalizado** | representação digital obtida pela conversão de documento físico |

Assinar um documento nato-digital não o transforma em documento digitalizado. Digitalizar papel também não equivale, por si, a assinar o arquivo resultante.

---

## 3. Como funciona a assinatura digital

### 3.1 Par de chaves

A criptografia assimétrica usa duas chaves matematicamente relacionadas:

- **chave privada:** mantida sob controle exclusivo do titular e usada para produzir a assinatura;
- **chave pública:** pode ser divulgada e é usada pelo verificador para conferir a relação criptográfica da assinatura.

Não se deve dizer que a chave pública permite descobrir a chave privada. A segurança depende justamente da inviabilidade prática dessa derivação, considerados algoritmo, parâmetros e tamanho de chave adequados.

### 3.2 Resumo criptográfico ou hash

Uma função hash transforma dados de tamanho variável em um resumo de tamanho definido. Para assinatura digital, interessam propriedades como:

- a mesma entrada produz o mesmo resumo;
- pequena mudança no documento produz resumo diferente;
- deve ser computacionalmente difícil encontrar a entrada original a partir do resumo;
- deve ser difícil encontrar conteúdos distintos com o mesmo resumo.

Hash não é criptografia reversível e não serve, sozinho, para esconder o conteúdo.

### 3.3 Fluxo simplificado

1. O sistema calcula o hash do documento.
2. O algoritmo usa a chave privada do signatário para produzir a assinatura sobre o resumo ou sobre estrutura que o contém.
3. O documento, a assinatura e os elementos de validação são disponibilizados ao destinatário.
4. O verificador usa a chave pública associada ao certificado para conferir a assinatura.
5. O verificador também examina integridade, cadeia de certificação, validade, revogação, política e evidências temporais aplicáveis.

A descrição “a chave privada assina e a pública verifica” é segura para prova. A frase “a chave pública descriptografa a assinatura” não representa corretamente todos os algoritmos de assinatura e deve ser evitada.

### 3.4 Propriedades alcançadas

| Propriedade | Efeito principal |
|---|---|
| **integridade** | permite detectar alteração posterior do conteúdo assinado |
| **autenticidade/autoria** | relaciona a assinatura ao titular da chave, conforme a validação e o contexto |
| **manifestação de vontade** | registra eletronicamente o ato de assinar, conforme o mecanismo e a norma aplicável |
| **não repúdio** | fornece elementos técnicos e jurídicos que dificultam negar a autoria |

O não repúdio não elimina apuração de fraude, coação, comprometimento de credencial ou uso indevido. A guarda da chave privada e das credenciais é essencial.

### 3.5 O que a assinatura não garante sozinha

Assinar digitalmente **não cifra automaticamente o documento**. Quem obtiver acesso ao arquivo pode lê-lo, salvo se também houver mecanismo de confidencialidade.

Para sigilo, emprega-se cifragem apropriada. Em uma explicação simplificada de criptografia assimétrica, o conteúdo destinado a alguém pode ser cifrado com a chave pública do destinatário e decifrado com a chave privada correspondente.

**Resumo:** assinatura protege autoria e integridade; cifragem protege confidencialidade. Os mecanismos podem ser usados em conjunto, mas têm finalidades distintas.

---

## 4. ICP-Brasil

### 4.1 Finalidade e fundamento

A Medida Provisória nº 2.200-2/2001 instituiu a **Infraestrutura de Chaves Públicas Brasileira (ICP-Brasil)** para garantir:

- autenticidade;
- integridade;
- validade jurídica de documentos eletrônicos e das aplicações que utilizem certificados digitais;
- realização de transações eletrônicas seguras.

A confiança não depende de uma autoridade isolada. Ela decorre de políticas, credenciamento, fiscalização e uma cadeia de certificação.

### 4.2 Estrutura e papéis

| Integrante | Função essencial |
|---|---|
| **Comitê Gestor da ICP-Brasil** | exerce a função de autoridade gestora de políticas; estabelece políticas, critérios, normas e credenciamentos |
| **ITI** | autarquia federal que exerce a função de Autoridade Certificadora Raiz |
| **AC Raiz** | primeira autoridade da cadeia; certifica ACs do nível imediatamente subsequente, gerencia informações e fiscaliza/audita |
| **Autoridade Certificadora (AC)** | emite, expede, distribui, revoga e gerencia certificados, vinculando pares de chaves aos titulares |
| **Autoridade de Registro (AR)** | identifica e cadastra usuários, encaminha solicitações às ACs e mantém registros |
| **titular ou responsável de uso** | controla a chave privada e responde por sua guarda e utilização |

Pegadinhas:

- a **AR não emite** o certificado; ela identifica, cadastra e encaminha;
- a **AC Raiz não pode emitir certificado ao usuário final**;
- o **ITI é a AC Raiz**, enquanto o Comitê Gestor formula e coordena políticas;
- a identificação pela AR pode ser presencial ou ocorrer por outro meio com segurança equivalente, conforme as normas da ICP-Brasil.

### 4.3 Cadeia de confiança

Na validação, o certificado do signatário é relacionado à AC emissora, às autoridades intermediárias eventualmente existentes e à raiz confiável. Também devem ser conferidos:

- assinatura da autoridade emissora;
- finalidade e política do certificado;
- período de validade;
- situação de revogação;
- integridade do documento e da própria assinatura.

Confiar apenas na aparência de um selo no PDF é insuficiente. O arquivo deve ser validado por mecanismo apropriado.

### 4.4 Geração e controle das chaves

Segundo a MP nº 2.200-2/2001:

- o par de chaves criptográficas é gerado pelo titular;
- a chave privada de assinatura fica sob seu exclusivo controle, uso e conhecimento.

Em certificado de pessoa jurídica, a pessoa jurídica é titular e uma pessoa física é identificada como responsável pelo uso e pela guarda da chave privada, conforme as normas da ICP-Brasil.

Compartilhar chave privada, senha ou dispositivo rompe uma premissa central da confiança e pode permitir atos em nome do titular.

### 4.5 Tipos A1 e A3

Segundo orientação do ITI atualizada no corte:

| Tipo | Armazenamento usual | Validade informada pelo ITI |
|---|---|---|
| **A1** | computador ou dispositivo móvel | 1 ano |
| **A3** | cartão, token criptográfico ou nuvem em HSM remoto | de 1 a 5 anos |

A3 não significa necessariamente cartão físico. Certificado em nuvem pode manter a chave privada em módulo criptográfico remoto e permitir uso controlado em mais de um dispositivo.

Rótulos comerciais como e-CPF e e-CNPJ ajudam a identificar ofertas, mas a política do certificado e a regra do sistema devem ser examinadas. O rótulo, isoladamente, não define todos os usos jurídicos.

### 4.6 Validade, expiração e revogação

- **Validade:** intervalo durante o qual o certificado pode ser usado para novas assinaturas.
- **Revogação:** cancelamento antes do término, por comprometimento, mudança relevante ou outra causa prevista.
- **LCR:** lista de certificados revogados publicada pela autoridade competente.
- **OCSP:** protocolo de consulta do estado de um certificado.

LCR e OCSP verificam situação de revogação; não criam assinatura. Certificado vencido não autoriza nova assinatura, mas a análise de uma assinatura produzida anteriormente depende das evidências de validação e de tempo existentes, e não de uma conclusão automática baseada apenas na data atual.

### 4.7 Carimbo do tempo

O carimbo do tempo fornece evidência de que determinado dado existia em certo momento. Na ICP-Brasil, pode ser emitido por Autoridade de Carimbo do Tempo credenciada e integrar perfis de assinatura com evidências para validação de longo prazo.

Ele não é obrigatório em toda assinatura e não substitui a assinatura do titular.

---

## 5. Validade jurídica dos documentos eletrônicos

### 5.1 Regra da MP nº 2.200-2/2001

O art. 10 contém três ideias que devem ser estudadas juntas:

1. documentos eletrônicos são documentos públicos ou particulares para todos os fins legais;
2. declarações em documentos eletrônicos produzidos com certificação disponibilizada pela ICP-Brasil presumem-se verdadeiras em relação aos signatários;
3. a MP não impede outro meio de comprovação de autoria e integridade, inclusive certificado não ICP-Brasil, se admitido pelas partes como válido ou aceito pela pessoa a quem o documento for oposto.

### 5.2 Consequências para prova

É errado afirmar que:

- somente um documento ICP-Brasil pode ter validade jurídica;
- qualquer documento não ICP-Brasil é nulo;
- a presunção da ICP-Brasil é prova absoluta e nunca admite impugnação.

A formulação correta é:

- a ICP-Brasil oferece a presunção legal específica do art. 10, § 1º;
- outros meios podem comprovar autoria e integridade nas condições do § 2º;
- se lei ou regulamento exigir **assinatura qualificada**, assinatura simples ou avançada não substitui essa exigência.

---

## 6. Lei nº 14.063/2020: simples, avançada e qualificada

### 6.1 Comparação dos níveis

| Nível | Requisitos centrais | Leitura de prova |
|---|---|---|
| **simples** | identifica o signatário e associa dados dele a outros dados eletrônicos | menor nível de confiança previsto na lei |
| **avançada** | certificado não ICP-Brasil ou outro meio admitido; associação unívoca; dados sob controle exclusivo com elevado nível de confiança; alteração posterior detectável | maior garantia de autoria e integridade sem exigir certificado ICP-Brasil |
| **qualificada** | usa certificado digital nos termos do art. 10, § 1º, da MP nº 2.200-2/2001 | maior nível de confiabilidade; assinatura ICP-Brasil |

Os três tipos caracterizam níveis de confiança sobre identidade e manifestação de vontade. **Maior confiança não significa que os níveis inferiores sejam sempre inválidos**; a adequação depende do ato, do risco e da norma aplicável.

Devem existir formas de revogação ou cancelamento definitivo do meio de assinatura, sobretudo em caso de comprometimento da segurança ou vazamento de dados.

### 6.2 Âmbito de aplicação

As regras do capítulo alcançam:

- interações internas da administração direta, autárquica e fundacional dos Poderes e órgãos constitucionalmente autônomos dos entes federativos;
- interações entre particulares e esses entes;
- interações entre esses entes públicos.

Não se aplicam, entre outras hipóteses:

- a processos judiciais;
- a interações somente entre particulares;
- a situações de anonimato ou identificação dispensada;
- a sistemas de ouvidoria;
- a programas de proteção a vítimas e testemunhas;
- a casos em que a identidade do particular deva permanecer sigilosa.

### 6.3 Definição do nível mínimo

No âmbito de sua competência, ato do titular do Poder ou do órgão constitucionalmente autônomo de cada ente federativo define o nível mínimo exigido para documentos e interações.

A lei fornece os limites:

- **simples:** pode ser admitida em interações de menor impacto e sem informação protegida por grau de sigilo;
- **avançada:** pode ser admitida nas hipóteses da simples e, inclusive, no registro de atos perante juntas comerciais;
- **qualificada:** deve ser admitida em qualquer interação eletrônica com ente público, sem cadastramento prévio.

No âmbito das interações com entes públicos disciplinadas pela Lei nº 14.063/2020, se houver conflito entre normas vigentes ou entre normas editadas por entes distintos sobre o nível de assinatura, prevalece a assinatura qualificada.

### 6.4 Casos de assinatura qualificada obrigatória

A Lei nº 14.063/2020 exige assinatura qualificada:

- em atos assinados por chefes de Poder, Ministros de Estado e titulares de Poder ou órgão constitucionalmente autônomo de ente federativo;
- em emissões de notas fiscais eletrônicas, exceto as emitidas por pessoas físicas ou MEIs, para os quais o uso é facultativo;
- em atos de transferência e registro de bens imóveis, observada a ressalva legal;
- nas demais hipóteses previstas em lei.

Em saúde, a Lei nº 14.063/2020 estabelece que receituários de medicamentos sujeitos a controle especial e atestados médicos eletrônicos previstos em ato do Ministério da Saúde somente são válidos com assinatura qualificada do profissional. A regulamentação setorial detalha hipóteses e critérios de validação, sem reduzir esse mínimo legal. Essa exigência e os níveis mínimos do art. 14 não se aplicam aos atos internos do ambiente hospitalar. Outros documentos eletrônicos de profissionais de saúde podem usar assinatura avançada ou qualificada, observadas as regras específicas.

### 6.5 Atos de pessoas jurídicas privadas

Assinaturas qualificadas em atas deliberativas de assembleias, convenções e reuniões das pessoas jurídicas de direito privado indicadas pelo Código Civil devem ser aceitas pelas pessoas jurídicas de direito público e pela administração direta e indireta dos três Poderes.

A lei não obriga os órgãos a disponibilizar comunicação eletrônica para toda e qualquer interação.

### 6.6 Assinatura gov.br

A assinatura feita pelo serviço oficial com conta **gov.br prata ou ouro** é uma **assinatura eletrônica avançada**. Ela não é assinatura qualificada e não usa certificado ICP-Brasil do cidadão.

Assim:

- pode atender atos para os quais a avançada é suficiente;
- não substitui a qualificada quando a norma exigir certificado ICP-Brasil;
- deve ser validada por mecanismo compatível, como o serviço oficial VALIDAR.

---

## 7. Decreto nº 10.543/2020: níveis mínimos federais

O decreto regulamenta a Lei nº 14.063/2020 para interações com a administração pública federal **direta, autárquica e fundacional**. Seu alcance não deve ser generalizado automaticamente a empresas públicas, sociedades de economia mista, Judiciário, outros Poderes ou outros entes sem verificar a norma aplicável.

### 7.1 Assinatura simples

É admitida quando a interação:

- não envolve informação protegida por grau de sigilo;
- não oferece risco direto de dano a bens, serviços e interesses do ente público.

Exemplos do decreto:

- agendamento e solicitação de atendimento, anuência, autorização ou licença;
- autenticação ou pedido de acesso a site oficial com informação de interesse particular, coletivo ou geral;
- envio de documento digital ou digitalizado e recebimento de protocolo;
- participação em pesquisa pública;
- requerimento de benefício assistencial, trabalhista ou previdenciário pelo próprio interessado.

O decreto também admite assinatura simples de agente público em sistemas de processo administrativo ou atendimento, salvo nas hipóteses em que a qualificada é obrigatória.

### 7.2 Assinatura avançada

É admitida nos casos da simples e nas interações que exigem maior garantia de autoria. Exemplos:

- informações classificadas ou protegidas por sigilo;
- atos sobre propriedade ou posse empresarial, marcas ou patentes;
- celebração de contratos, convênios, acordos e instrumentos congêneres;
- autocadastro em sistema de processo administrativo eletrônico ou de serviços;
- decisões sobre benefícios que envolvam gasto direto ou renúncia de receita;
- declarações legais que reconheçam fatos ou assumam obrigações;
- documentos enviados em fiscalização;
- defesa e recurso administrativo.

### 7.3 Assinatura qualificada

É aceita em qualquer interação e obrigatória, no âmbito do decreto, para:

- transferência e registro de bens imóveis, ressalvados os atos perante juntas comerciais;
- atos assinados pelo Presidente da República e por Ministros de Estado;
- demais hipóteses previstas em lei.

### 7.4 Elevação do nível e procedimento presencial

A autoridade máxima do órgão ou entidade pode exigir nível superior ao mínimo quando as especificidades da interação justificarem.

Os níveis mínimos não podem ser usados como fundamento para recusar assinatura realizada presencialmente ou derivada de procedimento presencial de identificação.

### 7.5 Responsabilidade do usuário

O usuário responde pela guarda, pelo sigilo e pelo uso de:

- credenciais de acesso;
- dispositivos;
- sistemas que fornecem autenticação e assinatura.

Também deve informar possível uso ou tentativa de uso indevido. Diante de suspeita, a administração pode suspender meios de acesso possivelmente comprometidos.

---

## 8. Assinaturas em processos administrativos eletrônicos

### 8.1 Decreto nº 8.539/2015

No Executivo federal direto, autárquico e fundacional, o decreto disciplina o processo administrativo eletrônico e distingue:

- documento nato-digital;
- documento digitalizado;
- processo administrativo eletrônico.

Os sistemas devem prover mecanismos de verificação de autoria e integridade. Após a alteração de 2020, autoria, autenticidade e integridade dos documentos e assinaturas podem ser obtidas pelos padrões do Decreto nº 10.543/2020.

Não se exige, portanto, assinatura qualificada para todo ato processual. Aplica-se o nível adequado à interação.

### 8.2 Originais e cópias no processo eletrônico

- Documento nato-digital assinado eletronicamente conforme a norma é considerado original.
- Documento digitalizado enviado pelo interessado tem, em regra, valor de cópia simples no regime do Decreto nº 8.539/2015.
- O interessado responde por teor e integridade do documento que envia.
- A administração pode exigir original quando a lei determinar, houver impugnação fundamentada ou for necessária conferência.
- A digitalização administrativa deve registrar se a fonte era original, cópia autenticada ou cópia simples.

### 8.3 Lei nº 14.129/2021

A Lei de Governo Digital estabelece que:

- a administração utiliza soluções digitais no trâmite de processos;
- documentos e atos processuais são válidos em meio digital com assinatura adequada à autenticidade, integridade, segurança e risco;
- documentos nato-digitais assim assinados são originais;
- documentos comprobatórios com validade legal podem ser emitidos digitalmente e assinados segundo a Lei nº 14.063/2020;
- presume-se a autenticidade de documentos apresentados por usuários em serviços públicos digitais quando o envio é assinado eletronicamente.

Essa presunção não elimina exigência legal específica de nível, nem transforma todo arquivo anexado em original.

### 8.4 Lei nº 9.784/1999

No processo administrativo federal:

- os atos não dependem de forma determinada, salvo exigência legal;
- reconhecimento de firma só é exigido, salvo imposição legal, quando houver dúvida de autenticidade.

Isso reduz formalismo desnecessário, mas não afasta nível de assinatura imposto por regra específica.

---

## 9. Digitalização com efeitos do original

### 9.1 Lei nº 12.682/2012

Digitalização é a conversão da fiel imagem do documento para código digital. O processo deve manter:

- integridade;
- autenticidade;
- confidencialidade, quando necessária;
- proteção contra acesso, alteração, reprodução ou destruição não autorizados.

A lei exige certificação ICP-Brasil para a preservação de integridade, autenticidade e confidencialidade de documentos públicos, sem prejuízo da leitura conjunta com as regras específicas posteriores.

### 9.2 Decreto nº 10.278/2020

Para que um documento físico digitalizado produza os mesmos efeitos legais do original e seja usado perante pessoa jurídica de direito público interno, ele deve:

1. ser assinado digitalmente com certificação ICP-Brasil, garantindo autoria da digitalização e integridade do documento e dos metadados;
2. seguir os padrões técnicos mínimos do Anexo I;
3. conter os metadados mínimos do Anexo II.

Os requisitos alcançam a **equiparação da digitalização ao original**. Não significam que qualquer simples envio de cópia digitalizada a um protocolo federal exija assinatura qualificada: o Decreto nº 10.543/2020 admite assinatura simples para envio e protocolo em situação de baixo risco. São hipóteses jurídicas diferentes.

### 9.3 Relações entre particulares

Entre particulares, outro meio de comprovação de autoria, integridade e, se necessário, confidencialidade pode ser válido se escolhido de comum acordo ou aceito pela pessoa a quem o documento for oposto. Sem acordo prévio, o Decreto nº 10.278/2020 remete aos requisitos mais rigorosos aplicáveis perante pessoa jurídica pública.

### 9.4 Descarte e preservação

Depois de digitalização conforme as regras, o documento físico pode ser descartado, exceto se tiver valor histórico. O armazenamento deve permitir proteção, localização e conferência do processo, respeitando:

- prescrição e decadência;
- tabela de temporalidade e destinação;
- legislação arquivística;
- preservação de documentos de guarda permanente.

---

## 10. Formatos, padrões e validação

### 10.1 Padrão Brasileiro de Assinaturas Digitais

As normas da ICP-Brasil tratam de requisitos para geração e verificação de assinaturas, inclusive no conjunto DOC-ICP-15. Em nível introdutório:

| Formato | Associação comum |
|---|---|
| **CAdES** | estruturas CMS/PKCS#7, inclusive arquivos `.p7s` |
| **XAdES** | documentos e estruturas XML |
| **PAdES** | documentos PDF |

O formato do arquivo não prova, sozinho, que a assinatura é válida. É necessário verificar a assinatura e seus elementos.

### 10.2 Serviço VALIDAR

O **VALIDAR**, mantido pelo ITI, afere a conformidade de assinaturas eletrônicas:

- qualificadas, inclusive ICP-Brasil;
- avançadas da plataforma gov.br;
- de outras infraestruturas oficialmente reconhecidas no Brasil.

O serviço recebe, conforme o caso, arquivo, URL ou QR Code e admite formatos como `.p7s`, `.xml` e `.pdf`.

Resultado técnico de conformidade não resolve sozinho todas as questões jurídicas do documento. Ainda podem importar capacidade, poderes de representação, objeto, vício de vontade, norma aplicável e contexto do ato.

### 10.3 Roteiro de conferência

Ao receber documento assinado:

1. obtenha o arquivo original assinado, não apenas impressão ou captura de tela;
2. use verificador compatível e confiável;
3. confira o signatário e a cadeia de certificação;
4. verifique integridade e alterações posteriores;
5. examine validade e revogação do certificado no momento relevante;
6. confira política, formato e eventual carimbo do tempo;
7. verifique se o nível é suficiente para o ato;
8. confirme poderes de representação e demais requisitos jurídicos.

---

## 11. Quadro comparativo final

| Elemento | O que é | O que não é |
|---|---|---|
| autenticação | identificação eletrônica do usuário | assinatura automática de todo documento |
| assinatura eletrônica | gênero legal de dados usados para assinar | sinônimo obrigatório de ICP-Brasil |
| assinatura digital | mecanismo criptográfico de assinatura | imagem de rubrica |
| certificado digital | vínculo confiável entre identidade e dados de validação/chave pública | a assinatura de cada documento |
| hash | resumo para conferir integridade | cifra reversível ou sigilo |
| assinatura qualificada | assinatura com certificado ICP-Brasil | único meio possível de validade em toda situação |
| assinatura gov.br prata/ouro | assinatura avançada oficial | assinatura qualificada ICP-Brasil |
| documento digitalizado | representação digital de documento físico | documento originalmente eletrônico |
| carimbo do tempo | evidência temporal | substituto da assinatura |
| LCR/OCSP | meios de verificar revogação | mecanismos que assinam o documento |

---

## 12. Pegadinhas recorrentes

1. **“Toda assinatura eletrônica é digital e qualificada.”** Errado. Eletrônica é o gênero; qualificada é espécie ICP-Brasil.
2. **“Imagem da assinatura manuscrita é assinatura digital.”** Errado. É assinatura digitalizada.
3. **“A chave pública assina.”** Errado. A chave privada assina; a pública verifica.
4. **“Assinar torna o documento secreto.”** Errado. Assinatura não garante confidencialidade sozinha.
5. **“O certificado é a própria assinatura.”** Errado. O certificado vincula identidade e chave pública.
6. **“A AR emite certificados.”** Errado. A AC emite; a AR identifica, cadastra e encaminha.
7. **“A AC Raiz emite para o cidadão.”** Errado. Isso é expressamente vedado.
8. **“Somente ICP-Brasil tem validade jurídica.”** Errado. Outros meios podem ser aceitos; mas não substituem qualificada quando esta é obrigatória.
9. **“Conta gov.br prata produz assinatura qualificada.”** Errado. Prata e ouro produzem assinatura avançada.
10. **“Todo processo administrativo exige ICP-Brasil.”** Errado. O nível depende do ato e do risco.
11. **“Assinatura simples é sempre inválida no setor público.”** Errado. Ela é admitida em interações de menor impacto e sem sigilo, conforme a norma.
12. **“Enviar arquivo digitalizado e equipará-lo ao original são a mesma coisa.”** Errado. A equiparação do Decreto nº 10.278/2020 possui requisitos próprios.
13. **“Certificado vencido prova que toda assinatura antiga é inválida.”** Errado. É preciso analisar o momento e as evidências de validação.
14. **“Carimbo do tempo assina pelo titular.”** Errado. Ele fornece evidência temporal.
15. **“PAdES é o padrão típico de XML.”** Errado. PAdES associa-se a PDF; XAdES, a XML.

---

## 13. Estratégia para resolver questões

1. Identifique se a pergunta é técnica, jurídica ou administrativa.
2. Descubra se trata de simples, avançada ou qualificada.
3. Verifique o âmbito: lei geral, administração federal, outro ente, particular ou processo judicial.
4. Diferencie validade possível de nível obrigatório.
5. Separe documento nato-digital, digitalizado e cópia simples.
6. Em criptografia, lembre: privada assina; pública verifica; hash confere integridade.
7. Na ICP-Brasil, lembre: Comitê define políticas; ITI é raiz; AC emite; AR identifica.
8. Desconfie de palavras absolutas como “sempre”, “somente”, “qualquer” e “automaticamente”.

## Referências

- [Medida Provisória nº 2.200-2, de 24 de agosto de 2001](https://www.planalto.gov.br/ccivil_03/mpv/antigas_2001/2200-2.htm) — Presidência da República; texto consolidado; acesso em 18 jul. 2026.
- [Lei nº 14.063, de 23 de setembro de 2020](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l14063.htm) — Presidência da República; texto consolidado com alteração da Lei nº 14.620/2023; acesso em 18 jul. 2026.
- [Decreto nº 10.543, de 13 de novembro de 2020](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/decreto/d10543.htm) — Presidência da República; texto consolidado; acesso em 18 jul. 2026.
- [Decreto nº 8.539, de 8 de outubro de 2015](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/decreto/d8539.htm) — Presidência da República; processo administrativo eletrônico federal; acesso em 18 jul. 2026.
- [Lei nº 14.129, de 29 de março de 2021](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14129.htm) — Presidência da República; Governo Digital; acesso em 18 jul. 2026.
- [Lei nº 12.682, de 9 de julho de 2012](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12682.htm) — Presidência da República; digitalização e arquivamento; acesso em 18 jul. 2026.
- [Decreto nº 10.278, de 18 de março de 2020](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/decreto/d10278.htm) — Presidência da República; requisitos para digitalização com efeitos legais; acesso em 18 jul. 2026.
- [Lei nº 9.784, de 29 de janeiro de 1999](https://www.planalto.gov.br/ccivil_03/leis/l9784.htm) — Presidência da República; processo administrativo federal; acesso em 18 jul. 2026.
- [Certificação Digital](https://www.gov.br/iti/pt-br/acesso-a-informacao/perguntas-frequentes/certificacao-digital) — Instituto Nacional de Tecnologia da Informação; atualizado em 6 mar. 2026; acesso em 18 jul. 2026.
- [Assinatura eletrônica avançada](https://www.gov.br/iti/pt-br/assuntos/assinatura-eletronica-avancada/assinatura-eletronica-avancada) — Instituto Nacional de Tecnologia da Informação; atualizado em 23 jun. 2025; acesso em 18 jul. 2026.
- [VALIDAR — Serviço de Validação de Assinaturas Eletrônicas](https://www.gov.br/pt-br/servicos/validar-servico-de-validacao-de-assinaturas-eletronicas) — Instituto Nacional de Tecnologia da Informação; serviço oficial; acesso em 18 jul. 2026.
- [DOC-ICP-15.02 — Requisitos para geração e verificação de assinaturas digitais](https://www.gov.br/iti/pt-br/central-de-conteudo/doc-icp-15-02-versao-3-0-pdf) — Instituto Nacional de Tecnologia da Informação; versão 3.0; acesso em 18 jul. 2026.
