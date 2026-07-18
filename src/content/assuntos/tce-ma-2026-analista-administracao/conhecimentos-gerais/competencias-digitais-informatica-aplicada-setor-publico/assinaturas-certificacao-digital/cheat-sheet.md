# Assinaturas eletrônicas e certificação digital

## Mapa normativo

| Norma | Núcleo |
|---|---|
| MP nº 2.200-2/2001 | ICP-Brasil + validade jurídica |
| Lei nº 14.063/2020 | simples, avançada e qualificada |
| Decreto nº 10.543/2020 | níveis mínimos na administração federal |
| Decreto nº 8.539/2015 | processo administrativo eletrônico federal |
| Lei nº 14.129/2021 | Governo Digital + atos processuais digitais |
| Lei nº 12.682/2012 | digitalização e armazenamento |
| Decreto nº 10.278/2020 | equiparação do digitalizado ao original |

Corte: **18/07/2026**.

## Conceitos

| Termo | Regra curta |
|---|---|
| assinatura eletrônica | gênero legal de dados usados para assinar |
| assinatura digital | mecanismo criptográfico com chaves assimétricas |
| assinatura qualificada | usa certificado ICP-Brasil |
| certificado digital | associa identidade e dados de validação/chave pública |
| autenticação | identifica eletronicamente o usuário |
| assinatura digitalizada | imagem de rubrica; não é assinatura digital |
| nato-digital | criado originalmente em meio eletrônico |
| digitalizado | conversão de documento físico |

- Certificado não é assinatura.
- Autenticação não assina automaticamente cada documento.
- Digitalizar não é assinar.

## Fluxo técnico

1. Calcula-se o hash do documento.
2. A chave privada produz a assinatura.
3. A chave pública permite verificar.
4. Conferem-se certificado, cadeia, validade, revogação e política.

| Elemento | Função |
|---|---|
| chave privada | assina; controle exclusivo do titular |
| chave pública | verifica a relação criptográfica |
| hash | detecta alteração do conteúdo |
| certificado | vincula identidade e chave pública |

- Hash não é reversível nem cifra o documento.
- Alterar o documento depois de assinado invalida a verificação.
- A chave pública não revela a privada.

## Propriedades

- integridade;
- autenticidade/autoria;
- manifestação de vontade;
- elementos de não repúdio.

**Não garante sozinha:** confidencialidade.

- Assinatura: autoria + integridade.
- Cifragem: sigilo/confidencialidade.
- Não repúdio não impede apuração de fraude, coação ou chave comprometida.

## ICP-Brasil

Finalidade da MP nº 2.200-2/2001:

- autenticidade;
- integridade;
- validade jurídica;
- transações eletrônicas seguras.

| Integrante | Função |
|---|---|
| Comitê Gestor | políticas, critérios, normas e credenciamento |
| ITI | autarquia + AC Raiz |
| AC Raiz | certifica AC subsequente; fiscaliza e audita |
| AC | emite, distribui, revoga e gerencia certificados |
| AR | identifica, cadastra e encaminha solicitações |
| titular/responsável | guarda e controla a chave privada |

Pegadinhas:

- AR **não emite** certificado.
- AC Raiz **não emite** para usuário final.
- ITI é AC Raiz; Comitê Gestor formula políticas.
- AR pode identificar presencialmente ou por meio de segurança equivalente.

## Certificados A1 e A3

| Tipo | Armazenamento usual | Validade informada pelo ITI |
|---|---|---|
| A1 | computador/dispositivo móvel | 1 ano |
| A3 | cartão, token ou nuvem/HSM | 1 a 5 anos |

- A3 não é necessariamente físico.
- e-CPF/e-CNPJ são rótulos usuais; política e sistema definem o uso.
- Em PJ, a PJ é titular e uma pessoa física responde pelo uso da chave.

## Estado e tempo

| Elemento | Função |
|---|---|
| validade | período de uso do certificado para novas assinaturas |
| revogação | cancelamento antes do término |
| LCR | lista de certificados revogados |
| OCSP | consulta de estado do certificado |
| carimbo do tempo | prova de existência de dado em certo momento |

- LCR/OCSP não assinam.
- Carimbo do tempo não substitui o signatário.
- Vencimento atual não torna automaticamente inválida toda assinatura passada.

## Validade jurídica

MP nº 2.200-2/2001, art. 10:

1. documento eletrônico pode ser público ou particular;
2. declaração com certificação ICP-Brasil presume-se verdadeira perante o signatário;
3. outro meio de autoria/integridade pode ser aceito pelas partes ou destinatário.

**Não diga:** somente ICP-Brasil tem validade.

**Diga:** ICP-Brasil gera presunção legal específica e é obrigatória quando a norma exige qualificada.

## Níveis da Lei nº 14.063/2020

| Nível | Requisitos |
|---|---|
| simples | identifica + associa dados do signatário |
| avançada | associação unívoca + controle com elevada confiança + alteração detectável; certificado não ICP ou outro meio admitido |
| qualificada | certificado ICP-Brasil; maior confiabilidade |

- Simples e avançada podem ser válidas conforme ato e norma.
- Deve existir revogação/cancelamento do meio de assinatura.
- Nas interações públicas regidas pela lei, conflito normativo sobre o nível é resolvido pela qualificada.

## Uso com entes públicos

- Ato do titular do Poder/órgão autônomo define nível mínimo.
- Simples: menor impacto + sem informação sigilosa.
- Avançada: inclui casos da simples + maior garantia de autoria.
- Qualificada: admitida em qualquer interação, sem cadastro prévio.

Qualificada obrigatória na Lei nº 14.063/2020:

- atos de chefes de Poder, Ministros de Estado e titulares de Poder/órgão autônomo;
- NF-e, salvo PF e MEI;
- transferência e registro de imóveis, com ressalva legal;
- demais hipóteses legais;
- receituário controlado e atestado médico eletrônico previstos em ato do Ministério da Saúde: qualificada por determinação legal;
- exceção: o mínimo dos arts. 13 e 14 não se aplica a atos internos do ambiente hospitalar.

Atas deliberativas privadas com assinatura qualificada devem ser aceitas pelo poder público.

## Assinatura gov.br

- Conta prata ou ouro.
- Assinatura **avançada**.
- Não é qualificada ICP-Brasil.
- Não supre exigência de qualificada.
- Pode ser conferida no VALIDAR.

## Decreto nº 10.543/2020

Âmbito: administração pública federal direta, autárquica e fundacional.

### Simples

- sem sigilo;
- sem risco direto;
- agendamento;
- acesso a site oficial;
- envio de documento + protocolo;
- pesquisa pública;
- requerimento de benefício pelo interessado.

### Avançada

- informação sigilosa;
- propriedade/posse empresarial, marca ou patente;
- contrato, convênio, acordo;
- autocadastro em sistema de processo eletrônico;
- decisão de benefício com gasto/renúncia;
- declaração legal de fatos/obrigações;
- fiscalização;
- defesa e recurso administrativo.

### Qualificada

- aceita sempre;
- imóvel;
- ato do Presidente e de Ministro;
- outra hipótese legal.

- Autoridade máxima pode elevar o nível.
- Nível mínimo não autoriza recusar assinatura presencial.
- Agente público pode usar simples no processo, salvo hipótese de qualificada.

## Processo administrativo eletrônico

- Sistema deve verificar autoria e integridade.
- Padrões seguem o Decreto nº 10.543/2020.
- Nem todo ato exige ICP-Brasil.
- Nato-digital corretamente assinado é original.
- Digitalizado enviado pelo interessado: em regra, cópia simples no Decreto nº 8.539/2015.
- Administração pode pedir original em hipótese legal ou de dúvida fundamentada.
- Lei nº 14.129/2021 vincula nível à autenticidade, integridade, segurança e risco.
- Reconhecimento de firma: salvo lei, apenas se houver dúvida de autenticidade.

## Equiparação do digitalizado ao original

Decreto nº 10.278/2020, perante pessoa jurídica pública:

1. assinatura digital ICP-Brasil;
2. padrões técnicos do Anexo I;
3. metadados do Anexo II.

Não confunda:

- simples envio e protocolo de cópia digitalizada;
- equiparação jurídica da digitalização ao original.

Entre particulares:

- meio acordado/aceito pode comprovar autoria e integridade;
- sem acordo prévio, aplica-se a regra mais rigorosa do decreto.

Documento histórico não deve ser descartado.

## Formatos

| Formato | Uso típico |
|---|---|
| CAdES | CMS/PKCS#7; `.p7s` |
| XAdES | XML |
| PAdES | PDF |

- Extensão não prova validade.
- VALIDAR afere conformidade de assinaturas avançadas e qualificadas.
- Validação técnica não decide sozinho capacidade, representação e validade do negócio.

## Roteiro de validação

1. Arquivo original assinado.
2. Verificador confiável.
3. Identidade e cadeia.
4. Integridade.
5. Validade e revogação.
6. Política/formato/carimbo.
7. Nível suficiente para o ato.
8. Poderes de representação.

## Pegadinhas-relâmpago

- Eletrônica = gênero.
- Qualificada = ICP-Brasil.
- Digitalizada ≠ digital.
- Privada assina; pública verifica.
- Hash ≠ sigilo.
- Certificado ≠ assinatura.
- AR identifica; AC emite.
- ITI = AC Raiz.
- gov.br prata/ouro = avançada.
- Processo administrativo ≠ qualificada obrigatória em tudo.
- Envio de cópia ≠ equiparação ao original.
- PAdES = PDF; XAdES = XML.
