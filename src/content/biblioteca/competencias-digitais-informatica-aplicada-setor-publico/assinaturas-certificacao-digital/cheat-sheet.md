# Assinaturas eletrônicas, assinatura digital e certificação digital

## Três perguntas em cada ato

**O que foi feito tecnicamente? → Qual o nível jurídico (simples, avançado ou qualificado)? → Qual nível a norma daquele ente e ato exige?** Uma assinatura pode ser válida e ainda insuficiente para ato que exige nível superior.

| Não confunda | Recuperação |
|---|---|
| Assinatura eletrônica × assinatura digital | A primeira é o **gênero jurídico** de dados eletrônicos associados a outros dados para assinar. A segunda é o **mecanismo criptográfico** que usa par de chaves; nem toda assinatura eletrônica é qualificada. |
| Digital × digitalizada | Assinatura digital vincula criptograficamente o signatário aos dados; imagem da rubrica manuscrita, isoladamente, pode ser copiada e não cria esse vínculo. |
| Certificado × assinatura | Certificado vincula identidade e dados de validação, em especial chave pública; assinatura é produzida sobre dados específicos. Nome ou selo visual no arquivo não bastam. |
| Autenticação × assinatura | Acesso com credenciais identifica usuário; entrar no sistema não assina automaticamente cada documento. |
| Nato-digital × digitalizado | O primeiro nasce eletrônico; o segundo representa documento originalmente físico. Digitalizar não é assinar nem converte origem em original nato-digital. |

## Como conferir um arquivo

**Documento → <abbr title="Resumo criptográfico calculado a partir dos dados">hash</abbr> → assinatura com chave privada → verificação com chave pública e comparação com novo hash.** O certificado liga a chave à identidade. A assinatura busca **autoria e integridade**; cifragem ou controle de acesso busca **sigilo**. Hash não é cifra, e assinatura não torna o arquivo secreto.

Verifique **duas coisas**: a assinatura do resumo inicial e a correspondência entre esse resumo e os **dados agora recebidos/armazenados**. Uma assinatura do resumo pode continuar válida mesmo quando os dados atuais produzem hash diferente; isso exige examinar o conteúdo efetivamente calculado. <abbr title="Dificuldade de negar autoria sustentada por evidências técnicas e jurídicas">Não repúdio</abbr> não elimina fraude, chave comprometida, coação ou falta de poderes de representação.

**Certificado confiável:** identidade aparente → cadeia até raiz confiável → assinatura da emissora → validade/revogação no momento relevante → política e nível do ato. Nome correto em um campo não valida a cadeia. Expiração atual não anula automaticamente assinatura produzida quando o certificado era válido; <abbr title="Registro confiável do momento em que certa informação digital já existia">carimbo do tempo</abbr> pode oferecer evidência temporal, sem substituir assinatura.

## Quem faz o quê na <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>

| Integrante | Função |
|---|---|
| Comitê Gestor | Define políticas, critérios e normas. |
| <abbr title="Instituto Nacional de Tecnologia da Informação">ITI</abbr> / <abbr title="Autoridade Certificadora Raiz">AC Raiz</abbr> | O <abbr title="Instituto Nacional de Tecnologia da Informação">ITI</abbr> exerce a função de raiz, certifica o nível seguinte e supervisiona; a raiz não emite diretamente ao usuário final. |
| <abbr title="Autoridade Certificadora">AC</abbr> | Emite, distribui, gerencia e revoga certificados. |
| <abbr title="Autoridade de Registro">AR</abbr> | Identifica/cadastra usuários e encaminha solicitações à <abbr title="Autoridade Certificadora">AC</abbr>. |

**<abbr title="Autoridade de Registro">AR</abbr> identifica; <abbr title="Autoridade Certificadora">AC</abbr> emite; <abbr title="Instituto Nacional de Tecnologia da Informação">ITI</abbr> é a raiz.** Chave privada comprometida pede revogação, sem esperar o vencimento normal.

## Efeito jurídico e nível exigido

A <abbr title="Medida Provisória">MP</abbr> nº 2.200-2/2001 confere **presunção legal específica** às declarações de documento eletrônico produzido com certificação <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> em relação aos signatários. Outros meios de comprovar autoria e integridade podem ser admitidos pelas partes ou aceitos pelo destinatário. **Validade fora da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> ≠ substituição de qualificada quando a lei a exige.**

| Lei nº 14.063/2020 | Critério decisivo |
|---|---|
| Simples | Identifica signatário e associa seus dados ao documento; admitida em interação pública de menor impacto, sem informação protegida por sigilo, se norma competente permitir. |
| Avançada | Associação unívoca, elevado controle pelo signatário e alteração posterior detectável; pode usar certificado fora da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> ou outro meio admitido. A assinatura gov.br com conta **prata/ouro** é avançada. |
| Qualificada | Usa certificado da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>; deve ser admitida em toda interação eletrônica com ente público, sem cadastro prévio, e é **obrigatória** nas hipóteses legais, como atos assinados por chefes de Poder, Ministros de Estado e titulares de Poder ou órgão constitucionalmente autônomo. |

**Competência:** ato do titular do Poder ou órgão autônomo de cada ente define nível mínimo, observada a lei. Conflito normativo no regime do art. 5º favorece a qualificada. O Decreto nº 10.543/2020 fixa mínimos **para a administração federal direta, autárquica e fundacional**: agendamento simples em baixo risco; defesa/recurso e contratos em avançada; qualificada quando legalmente obrigatória. Não transplantar automaticamente ao <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr> nem reduzir exigência legal por avaliação de risco.

**Processo eletrônico:** sistema permite verificar autoria/integridade; nem todo ato exige <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>. Identificar o ato, o risco e a norma aplicável. Documento nato-digital assinado conforme a regra pode ser original; digitalização de papel não se torna original por si.

**Transição em 2026:** a Resolução nº 211/2024 do Comitê Gestor da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> permite coexistência de certificados legados e novos perfis (emissão dos novos desde 1º/11/2024; transição até 2/3/2029). O **Selo Eletrônico** de pessoa jurídica identifica a origem/responsabilidade em fluxos automatizados; não manifesta vontade para firmar contrato. Evite reduzir toda a infraestrutura à antiga regra “<abbr title="Tipo legado de certificado digital">A1</abbr> = software; <abbr title="Tipo legado de certificado digital">A3</abbr> = dispositivo físico”.

**Validação final:** arquivo assinado? dados íntegros? identidade e cadeia confiáveis? certificado válido e não revogado no instante relevante? nível suficiente? A validação técnica pelo serviço VALIDAR do <abbr title="Instituto Nacional de Tecnologia da Informação">ITI</abbr> não decide sozinha capacidade, representação ou vício de vontade.
