# Assinaturas eletrônicas e certificação digital

## Regra de ouro

Primeiro descubra **o conceito**; depois, **o efeito jurídico**; por fim, **o nível exigido para o ato**.

## Matriz de conceitos

| Termo | Regra curta | Não confundir com |
| --- | --- | --- |
| assinatura eletrônica | gênero legal usado para assinar eletronicamente | apenas <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> |
| assinatura digital | mecanismo criptográfico com chaves assimétricas | imagem de rubrica |
| assinatura qualificada | usa certificado ICP-Brasil | qualquer assinatura eletrônica |
| certificado digital | vincula identidade e dados de validação/chave pública | assinatura de cada documento |
| autenticação | identifica o usuário | assinatura automática do ato |
| assinatura digitalizada | imagem da assinatura manuscrita | assinatura digital criptográfica |
| nato-digital | nasceu eletrônico | documento digitalizado |
| digitalizado | veio de documento físico | original nato-digital |

**Eletrônica = gênero. Digitalizada ≠ digital. Certificado ≠ assinatura.**

## Fluxo técnico mínimo

| Elemento | Função |
| --- | --- |
| chave privada | produz a assinatura |
| chave pública | verifica a assinatura |
| hash | ajuda a detectar alteração do conteúdo |
| certificado | liga identidade à chave/dados de validação |

- privada **assina**; pública **verifica**;
- hash ≠ cifra;
- assinatura ≠ confidencialidade;
- alterar o conteúdo após a assinatura deve comprometer a verificação de integridade.

## Assinatura × cifragem

| Objetivo | Mecanismo principal |
| --- | --- |
| autoria + integridade | assinatura |
| confidencialidade | cifragem/controle de acesso |

Assinar não torna o arquivo automaticamente secreto.

## ICP-Brasil

| Integrante | Função |
| --- | --- |
| Comitê Gestor | políticas, critérios e normas |
| <abbr title="Instituto Nacional de Tecnologia da Informação">ITI</abbr> | autarquia + AC Raiz |
| <abbr title="Autoridade Certificadora Raiz">AC Raiz</abbr> | topo da cadeia; não emite ao usuário final |
| <abbr title="Autoridade Certificadora">AC</abbr> | emite, distribui, revoga e gerencia certificados |
| <abbr title="Autoridade de Registro">AR</abbr> | identifica, cadastra e encaminha solicitações |

**AR identifica; AC emite; ITI = raiz.**

## Validade jurídica — <abbr title="Medida Provisória">MP</abbr> nº 2.200-2/2001

- ICP-Brasil → presunção legal específica em relação aos signatários.
- Outros meios de autoria/integridade **podem** ser válidos quando admitidos/aceitos.
- Se norma exigir **qualificada**, simples ou avançada não substituem ICP-Brasil.

**Pegadinha:** “somente ICP-Brasil tem validade jurídica” = falso.

## Lei nº 14.063/2020

| Nível | Núcleo |
| --- | --- |
| simples | identifica + associa dados do signatário |
| avançada | associação unívoca + elevado controle + alteração detectável; não exige ICP-Brasil |
| qualificada | certificado ICP-Brasil; maior confiança |

### Setor público

- titular do Poder/órgão autônomo competente define nível mínimo, dentro da lei;
- simples → menor impacto + sem sigilo;
- avançada → maior garantia de autoria/integridade;
- qualificada → admitida em qualquer interação pública, sem cadastro prévio;
- conflito normativo no regime da lei → prevalece **qualificada**;
- atos de chefes de Poder, Ministros de Estado e titulares de Poder/órgão autônomo estão entre as hipóteses de qualificada obrigatória.

## gov.br

**Conta prata ou ouro → assinatura avançada.**

Não é qualificada ICP-Brasil e não substitui qualificada quando esta for obrigatória.

## Decreto nº 10.543/2020

**Âmbito:** administração pública federal direta, autárquica e fundacional.

| Nível | Exemplos federais úteis |
| --- | --- |
| simples | agendamento, pesquisa, envio de documento + protocolo em baixo risco |
| avançada | contrato, fiscalização, defesa e recurso administrativo |
| qualificada | atos do Presidente/Ministros e hipóteses legais |

- autoridade pode **elevar** o nível se o risco justificar;
- não pode reduzir exigência legal de qualificada;
- classificação eletrônica não basta para recusar assinatura presencial.

## Processo administrativo

- sistema deve permitir verificar autoria e integridade;
- **nem todo ato exige ICP-Brasil**;
- nível depende do ato, risco e norma;
- autenticação no sistema ≠ assinatura automática do documento;
- nato-digital assinado conforme a norma pode ser original;
- digitalizar papel ≠ assinar nem tornar automaticamente original.

## Transição ICP-Brasil — regra vigente em 2026

A Resolução <abbr title="Comitê Gestor">CG</abbr> ICP-Brasil nº 211/2024 já está em vigor.

- em 2026 coexistem certificados legados e novos perfis;
- novos tipos começaram a ser emitidos em **1º/11/2024**;
- transição dos legados vai até **2/3/2029**;
- para <abbr title="pessoa jurídica">PJ</abbr>, o **Selo Eletrônico — SE** identifica origem/responsabilidade em documentos e processos automatizados;
- **Selo Eletrônico não manifesta vontade** e não substitui assinatura de pessoa física para firmar contrato/acordo.

### Evite a decoreba antiga

Não trate “A1 = software / A3 = token” como quadro eterno e completo. Esses rótulos seguem relevantes durante a transição, mas a ICP-Brasil já está migrando para novos perfis.

## Validação

Roteiro:

1. arquivo realmente assinado;
2. identidade do signatário;
3. integridade;
4. certificado/cadeia, se houver;
5. validade e revogação no momento relevante;
6. nível suficiente para o ato.

**VALIDAR/ITI** → confere conformidade técnica de assinaturas reconhecidas, inclusive avançadas gov.br e qualificadas ICP-Brasil.

Validação técnica ≠ decisão final sobre capacidade, representação ou vício de vontade.

## Pegadinhas-relâmpago

- eletrônica = gênero;
- qualificada = ICP-Brasil;
- digitalizada ≠ digital;
- privada assina; pública verifica;
- hash ≠ sigilo;
- certificado ≠ assinatura;
- autenticação ≠ assinatura automática;
- AR identifica; AC emite;
- ITI = AC Raiz;
- gov.br prata/ouro = avançada;
- processo administrativo ≠ qualificada obrigatória em tudo;
- Decreto nº 10.543/2020 ≠ regra automática para qualquer ente;
- Selo Eletrônico PJ ≠ manifestação de vontade;
- 2026 = período de transição da ICP-Brasil.
