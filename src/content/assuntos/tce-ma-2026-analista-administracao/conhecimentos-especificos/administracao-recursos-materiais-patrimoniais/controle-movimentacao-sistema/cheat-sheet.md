# Controle, movimentação e sistema patrimonial

> Controle efetivo liga **bem + documento + localização + responsável + estado + valor + histórico**.

## Base essencial

| Fonte | Regra-chave |
| --- | --- |
| CF, art. 70 | fiscalização patrimonial: legalidade, legitimidade e economicidade; prestação de contas |
| Lei nº 4.320/1964, art. 94 | registro analítico dos bens permanentes, perfeita caracterização e responsáveis |
| Lei nº 4.320/1964, art. 95 | registros sintéticos dos bens móveis e imóveis |
| Lei nº 4.320/1964, art. 96 | inventário analítico + escrituração sintética fundamentam o levantamento geral |
| IN SEDAP nº 205/1988 | referência operacional do SISG federal, não regra automática do TCE-MA |

## Objetivos

- **Legalidade:** competência, procedimento e documento.
- **Economicidade:** evitar perda, ociosidade e compra desnecessária.
- **Eficiência:** bem adequado disponível no local necessário.
- **Salvaguarda:** prevenir dano, extravio, furto e uso indevido.
- **Fidedignidade:** alinhar físico, cadastro e contabilidade.
- **Rastreabilidade:** reconstruir origem, evento, aprovação e responsável.

## Dados mínimos do bem

- número patrimonial e série;
- descrição padronizada e classe;
- origem, documento e incorporação;
- titularidade ou fundamento da posse;
- valor e conta, quando aplicáveis;
- unidade, localização e responsável;
- estado, garantia e manutenção;
- histórico de movimentos, inventários e regularizações.

## Controles

| Tipo | Exemplos |
| --- | --- |
| preventivo | identificação, autorização prévia, perfil, campo obrigatório, termo |
| detectivo | inventário, conciliação, alerta, relatório de pendência, auditoria de log |
| corretivo | ajuste rastreável, termo atualizado, manutenção, apuração |

### Segregação

Separar, conforme risco:

- solicitar × autorizar;
- receber × aceitar;
- incorporar × atribuir carga;
- movimentar × aprovar;
- custodiar × inventariar;
- corrigir × aprovar correção;
- administrar sistema × auditar log.

Estrutura pequena: usar dupla conferência, aprovação superior e revisão independente.

# Movimentação patrimonial

## Quatro dimensões

| Dimensão | Mudança |
| --- | --- |
| física | lugar do objeto |
| administrativa | autorização, documento, localização ou situação cadastral |
| responsabilidade | consignatário ou unidade de guarda |
| contábil | conta, valor, unidade contábil ou reconhecimento |

Nem toda dimensão muda ao mesmo tempo.

- Mesma pessoa, nova sala: movimento físico e cadastral.
- Novo responsável, mesma sala: troca de carga sem deslocamento.
- Manutenção externa: saída temporária sem transferência automática da propriedade.
- Transferência definitiva: pode ter efeitos jurídicos e contábeis.

## Perguntas antes de nomear o evento

1. Origem e destino pertencem a quem?
2. O objeto muda fisicamente de local?
3. Muda o responsável?
4. É temporário ou definitivo?
5. A propriedade muda?
6. Há prazo de devolução?
7. Existe efeito contábil?

## Fluxo mínimo

1. identificar bem, origem, destino e motivo;
2. conferir situação, carga e competência;
3. obter autorização e documento;
4. registrar estado e localização de saída;
5. executar transporte com controles necessários;
6. conferir no destino e registrar ressalvas;
7. obter aceite e atualizar responsabilidade;
8. processar integração ou reflexo contábil;
9. encerrar pendência preservando histórico.

## IN SEDAP nº 205/1988

- **Carga:** efetiva responsabilidade pela guarda e uso pelo consignatário.
- **Descarga:** transferência dessa responsabilidade; não é sinônimo necessário de baixa.
- Entrada e saída de carga exigem registro e documento.
- Material permanente não deve ser distribuído sem Termo de Responsabilidade.
- Redistribuição: atualizar localização, estado e novo consignatário.
- Mesmo consignatário: movimento exige ciência prévia da unidade competente.
- Entre unidades: tramitação pela unidade administrativa competente.
- Registro deve acompanhar o fato no menor tempo possível.

## Decreto nº 12.785/2025: exemplo federal atual

Âmbito: administração pública federal direta, autárquica e fundacional.

| Evento | Efeito federal |
| --- | --- |
| cessão | precária, prazo determinado, transmite posse, guarda, conservação e manutenção de bem inservível ocioso ou recuperável |
| transferência | permanente, transmite posse, propriedade, guarda, conservação, manutenção e destinação final |
| transferência interna | entre unidades do mesmo órgão ou entidade |
| transferência externa | entre órgãos da União |

- Interna prefere à externa.
- Bem em uso regular: cessão ou transferência é excepcional e exige justificativa.
- Revogou os Decretos nº 9.373/2018 e nº 10.340/2020.
- Não aplicar automaticamente ao TCE-MA.

## Não confundir

- movimentação física ≠ mudança de propriedade;
- cessão federal ≠ transferência federal;
- descarga ≠ baixa;
- manutenção externa ≠ alienação;
- divergência física ≠ autorização para apagar o cadastro.

# Sistema patrimonial

## Não é só software

Sistema = dados + regras + papéis + fluxos + integrações + relatórios + tecnologia.

### Funções essenciais

- cadastro mestre e identificador estável;
- ciclo de vida e documentos;
- perfis e menor privilégio;
- solicitação, aprovação, execução e aceite;
- trilha de auditoria com estado anterior e novo;
- alertas e pendências;
- inventário e conciliação;
- relatórios e indicadores;
- integração validada.

### Integrações

| Área | Dados |
| --- | --- |
| compras/contratos | pedido, fornecedor, nota, garantia |
| almoxarifado | recebimento, aceite, distribuição |
| contabilidade | conta, valor, depreciação, perda, baixa |
| manutenção | ordem, custo, condição, indisponibilidade |
| organização | unidade, local, lotação, responsável |
| auditoria | log, documento, exceção, evidência |

Integração exige chave comum, fonte mestre, tratamento de erro e conciliação.

## SIADS × SIAFI

- **SIADS:** gestão de bens permanentes, consumo, intangíveis e frota na administração pública federal direta, autárquica e fundacional e em empresas públicas dependentes do Poder Executivo federal.
- **SIAFI:** registros financeiro-contábeis federais.
- SIADS pode registrar atos e fatos no SIAFI on-line.
- Integração reduz redigitação, mas não elimina inventário.
- Não há base para afirmar que o TCE-MA use SIADS.

## Segurança e dados

- menor privilégio;
- usuário individual, nunca genérico;
- integridade e logs protegidos;
- backups e recuperação testada;
- correções autorizadas e rastreáveis;
- migração com contagem, amostragem e conciliação;
- planilha auxiliar não substitui cadastro mestre.

# Inventário e conciliação

## Tipos da IN nº 205/1988

| Tipo | Finalidade |
| --- | --- |
| anual | quantidade e valor em 31 de dezembro |
| inicial | criação de unidade gestora |
| transferência de responsabilidade | mudança do dirigente |
| extinção ou transformação | mudança estrutural da unidade |
| eventual | iniciativa do dirigente ou órgão fiscalizador |

Instrumentos gerenciais: rotativo e por amostragem, conforme norma e finalidade.

## Inventário analítico

- descrição padronizada;
- número de registro;
- valor;
- estado;
- outros elementos necessários.

## Sequência segura

1. planejar escopo e data-base;
2. controlar movimentos durante a contagem;
3. registrar a versão da listagem;
4. verificar identidade, existência, local, estado e custódia;
5. reconferir exceções;
6. obter documentos e justificativas;
7. aprovar ajustes rastreáveis;
8. conciliar patrimônio e contabilidade;
9. relatar causas, providências e pendências.

## Divergência

Primeiro: preservar evidência e investigar.

Possíveis causas:

- movimento pendente;
- localização desatualizada;
- duplicidade;
- etiqueta ou identificação errada;
- manutenção externa;
- falha de integração;
- bem de terceiro;
- dano ou desaparecimento.

Possíveis tratamentos:

- concluir movimento;
- atualizar carga/localização;
- corrigir cadastro com aprovação;
- registrar evento contábil;
- abrir manutenção;
- iniciar apuração.

Baixa e responsabilização exigem pressupostos próprios.

# Indicadores

- bens sem responsável/localização;
- movimentos pendentes por idade;
- tempo movimento → registro;
- termos atualizados;
- inventário concluído no prazo;
- divergência em quantidade e valor;
- tempo de regularização;
- eventos sem documento/aceite;
- bens ociosos;
- perdas, danos e reincidência.

> Não existe meta universal: porte, risco, dispersão e materialidade definem os parâmetros.

# Pegadinhas finais

- Analítico individualiza; sintético totaliza.
- Inventário não é impressão do sistema.
- Carga não transfere propriedade.
- Descarga pode apenas trocar o responsável.
- Movimento físico pode não gerar lançamento contábil.
- Troca de responsável pode ocorrer sem movimento físico.
- Sistema não substitui verificação física.
- Ajuste sem histórico destrói rastreabilidade.
- SIADS não é SIAFI.
- Norma federal operacional não vira regra estadual automaticamente.
