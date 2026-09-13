# Criptografia e certificação digital

## Primeiro: qual problema?

| Objetivo | Mecanismo principal |
|---|---|
| confidencialidade | cifragem |
| integridade | hash/controles de integridade |
| autoria + integridade | assinatura digital |
| ligar identidade à chave pública | certificado digital |

## Simétrica × assimétrica

| Modelo | Chaves | Ponto forte |
|---|---|---|
| simétrica | segredo compartilhado | eficiência para grande volume |
| assimétrica | par pública/privada | distribuição de confiança, assinatura e estabelecimento de segredo |

Em sistemas híbridos: **assimétrica estabelece/autentica → simétrica protege o volume de dados**.

## Hash

- resumo do conteúdo;
- alteração do dado tende a alterar o resumo;
- não é cifra reversível;
- não garante autoria sozinho;
- não dá confidencialidade.

## Assinatura digital

- privada do signatário → participa da assinatura;
- pública correspondente → verifica;
- protege integridade e fornece evidência de autoria;
- assinatura ≠ cifragem do conteúdo;
- não repúdio ≠ impossibilidade absoluta de fraude.

**Digitalizada = imagem. Digital = mecanismo criptográfico.**

## Certificado

Certificado digital:

- associa identidade e chave pública;
- não é a assinatura de cada arquivo;
- exige validação da cadeia;
- nome/selo visual isolado não prova confiança.

<abbr title="Padrão técnico de certificados digitais">X.509</abbr>: campo de nome correto, sozinho, não basta.

## Cadeia de confiança

**titular → autoridade emissora → autoridades superiores → raiz confiável**

Verifique:

- assinatura da autoridade;
- validade;
- revogação;
- cadeia;
- proteção da chave privada.

## <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>

| Integrante | Função |
|---|---|
| <abbr title="Instituto Nacional de Tecnologia da Informação">ITI</abbr> | raiz da infraestrutura |
| <abbr title="Autoridade Certificadora">AC</abbr> | emite/gerencia certificados |
| <abbr title="Autoridade de Registro">AR</abbr> | identifica/cadastra solicitante |

**<abbr title="Autoridade de Registro">AR</abbr> identifica; <abbr title="Autoridade Certificadora">AC</abbr> emite.**

## Ciclo do certificado

- validade = período previsto;
- expiração = fim normal;
- revogação = retirada antecipada da confiança;
- chave privada exposta → motivo para revogar;
- <abbr title="Lista de Certificados Revogados">LCR</abbr> divulga certificados revogados.

## Pegadinhas

- hash ≠ criptografia reversível;
- assinatura ≠ confidencialidade;
- certificado ≠ assinatura;
- pública ≠ privada;
- imagem de assinatura ≠ assinatura digital;
- selo visual ≠ validação;
- nome correto ≠ certificado confiável;
- chave privada comprometida ≠ esperar tranquilamente a expiração.