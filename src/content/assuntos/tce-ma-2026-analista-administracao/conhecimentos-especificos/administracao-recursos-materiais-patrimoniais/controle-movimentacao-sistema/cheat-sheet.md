# Controle, movimentação e sistema patrimonial

> Controle efetivo liga **bem + documento + localização + responsável + estado + valor + histórico**.

## Fundamentos

| Fonte | Regra central |
| --- | --- |
| CF, art. 70 | legalidade, legitimidade, economicidade e prestação de contas |
| Lei nº 4.320/1964, art. 94 | registro analítico, perfeita caracterização e responsáveis |
| art. 95 | registros sintéticos de móveis e imóveis |
| art. 96 | inventário analítico + escrituração sintética |
| IN nº 205/1988 | referência operacional federal; não se aplica automaticamente ao TCE-MA |
| Decreto nº 12.785/2025 | circularidade federal de bens móveis |
| Portaria nº 232/2020 | SIADS no âmbito federal indicado |

## Objetivos

- legalidade;
- economicidade;
- disponibilidade do bem adequado;
- salvaguarda;
- fidedignidade;
- rastreabilidade;
- prestação de contas.

## Papéis

| Papel | Núcleo |
| --- | --- |
| requisitante | justificar necessidade ou movimento |
| usuário | usar corretamente e comunicar ocorrência |
| responsável pela carga | guardar e apresentar |
| patrimônio | cadastrar, formalizar e conciliar |
| logística | preservar cadeia de custódia |
| contabilidade | reconhecer e conciliar valores |
| TI | acessos, integração, logs e continuidade |
| comissão | verificar com independência |
| auditoria | avaliar controles e evidências |
| autoridade | autorizar eventos sensíveis |

## Qualidade dos dados

- completude;
- exatidão;
- consistência;
- tempestividade;
- unicidade;
- validade;
- rastreabilidade.

### Alertas

- bem ativo sem responsável;
- responsável desligado;
- local inválido;
- série duplicada;
- movimento vencido;
- item disponível e em manutenção;
- baixa sem contabilidade;
- contabilidade sem suporte patrimonial.

# Arquitetura de controles

| Tipo | Exemplos |
| --- | --- |
| preventivo | autorização, identificação, perfil, campo obrigatório |
| detectivo | inventário, conciliação, alerta, log |
| corretivo | ajuste rastreável, termo atualizado, manutenção, apuração |

Segregar:

- solicitar × autorizar;
- receber × aceitar;
- incorporar × atribuir carga;
- movimentar × aprovar;
- custodiar × inventariar;
- corrigir × aprovar;
- administrar sistema × auditar.

Estrutura pequena: dupla conferência, aprovação superior e revisão independente.

# Movimentação

## Cinco dimensões

| Dimensão | Pergunta |
| --- | --- |
| física | onde está o objeto? |
| administrativa | qual autorização, documento e situação cadastral? |
| responsabilidade | quem guarda ou utiliza? |
| contábil | qual conta, valor e entidade reconhecem? |
| jurídica | quem possui propriedade, posse ou dever de devolver? |

Nem todas mudam juntas.

- mesma pessoa, nova sala: físico + cadastro;
- nova pessoa, mesma sala: carga;
- manutenção externa: localização/detenção temporária;
- transferência definitiva: pode afetar direito e contabilidade.

## Perguntas antes de classificar

1. origem e destino pertencem a quem?
2. há deslocamento?
3. muda o responsável?
4. é temporário?
5. muda a propriedade?
6. há prazo e devolução?
7. existe reflexo contábil?

## Estados

```text
rascunho → solicitado → autorizado → preparado → em trânsito
→ recebido → aceito/rejeitado → encerrado
```

Alternativos: cancelado, expirado, devolvido, contestado e bloqueado.

## Datas

- data da saída;
- data do recebimento;
- data do lançamento;
- data da correção.

Não apagar atraso por registro retroativo.

## Fluxo mínimo

1. identificar bem, origem, destino e motivo;
2. validar situação, carga e competência;
3. autorizar e documentar;
4. registrar estado de saída;
5. transportar;
6. conferir no destino;
7. registrar ressalvas;
8. aceitar ou rejeitar;
9. atualizar carga e integração;
10. encerrar preservando histórico.

# Carga, descarga e eventos

## IN nº 205/1988

- **carga:** responsabilidade pela guarda e uso;
- **descarga:** transferência da responsabilidade;
- descarga ≠ baixa;
- entrada e saída exigem documento;
- redistribuição atualiza local, estado e consignatário;
- mesmo consignatário: movimento exige ciência prévia;
- entre unidades: tramitação pela área competente.

## Decreto nº 12.785/2025 — âmbito federal

| Evento | Efeito |
| --- | --- |
| cessão | temporária, precária; transfere posse e responsabilidade |
| transferência | permanente; transfere posse e propriedade |
| transferência interna | entre unidades do mesmo órgão ou entidade |
| transferência externa | entre órgãos da União |

- bem em uso regular: evento excepcional e justificado;
- âmbito federal direto, autárquico e fundacional;
- não aplicar automaticamente ao TCE-MA.

## Não confundir

- movimento físico ≠ propriedade;
- cessão ≠ transferência;
- descarga ≠ baixa;
- manutenção ≠ alienação;
- divergência ≠ autorização para excluir.

# Sistema patrimonial

Sistema = **dados + regras + papéis + fluxos + integrações + relatórios + tecnologia**.

## Funções

- cadastro mestre;
- identificador estável;
- ciclo de vida;
- documentos;
- perfis;
- aprovações;
- aceite;
- logs;
- alertas;
- inventário;
- conciliação;
- relatórios;
- integrações.

## Identificador

- número patrimonial não deve ser reutilizado;
- plaqueta, RFID e código de barras são meios de vínculo;
- marcação não prova propriedade nem localização atual;
- número de série não substitui cadastro e carga.

## Controles gerais de TI

- acessos individuais;
- revisão de perfis;
- mudança controlada;
- backup;
- recuperação testada;
- continuidade;
- incidentes;
- proteção de logs.

## Controles da aplicação

- estado válido;
- campos obrigatórios;
- alçada;
- bloqueio de incompatibilidades;
- aceite;
- cálculo;
- interface;
- histórico anterior e posterior.

## Integração

1. definir sistema de origem;
2. usar chave estável;
3. validar transformação;
4. controlar totais;
5. tratar rejeição/duplicidade;
6. corrigir na origem;
7. conciliar.

## SIADS × SIAFI

- SIADS: estoques, permanentes, consumo, intangíveis e frota no âmbito federal indicado;
- SIAFI: registros financeiro-contábeis federais;
- algumas operações do SIADS refletem automaticamente no SIAFI;
- integração não elimina inventário;
- SIADS não é automaticamente o sistema do TCE-MA.

# Inventário

## Tipos da IN nº 205/1988

| Tipo | Finalidade |
| --- | --- |
| anual | posição de 31 de dezembro |
| inicial | criação de unidade gestora |
| transferência de responsabilidade | mudança do dirigente |
| extinção/transformação | mudança estrutural |
| eventual | iniciativa do dirigente ou fiscalização |
| rotativo | ciclo contínuo e seletivo |
| amostragem | inferência em acervo grande |

## Técnicas

- cutoff;
- contagem cega;
- cadastro → físico;
- físico → cadastro;
- recontagem independente;
- estratificação por risco;
- versão controlada das listas;
- independência;
- causa-raiz.

Aplicativo de inventário = ferramenta de coleta; não substitui procedimento ou SIADS.

## Conciliação em quatro camadas

| Camada | Comparação |
| --- | --- |
| física | encontrado × esperado |
| administrativa | físico × cadastro/carga/documento |
| contábil | patrimônio × razão/contas |
| tecnológica | origem × interface × destino |

Primeiro: preservar evidência e investigar.

Causas possíveis:

- movimento pendente;
- local desatualizado;
- duplicidade;
- identificação errada;
- manutenção;
- falha de interface;
- bem de terceiro;
- dano;
- desaparecimento.

Tratamentos possíveis:

- concluir movimento;
- atualizar carga/local;
- corrigir cadastro com aprovação;
- processar contabilidade;
- abrir manutenção;
- iniciar apuração.

Baixa e responsabilização exigem pressupostos próprios.

# Indicadores

| Indicador | Fórmula |
| --- | --- |
| acurácia quantitativa | itens corretos ÷ verificados |
| acurácia por valor | valor conciliado ÷ verificado |
| sem carga válida | bens sem responsável ÷ ativos |
| pendências vencidas | vencidas ÷ abertas |
| regularização | resolvidas ÷ confirmadas |
| cobertura rotativa | inventariados ÷ universo |
| reincidência | causas repetidas ÷ ocorrências |
| tempestividade | mediana evento → lançamento |

Definir numerador, denominador, período e universo.

Zero divergência pode refletir bom controle ou inventário superficial.

# Auditoria

| Elemento | Exemplo |
| --- | --- |
| critério | termo deve ser atualizado |
| condição | bens mudaram sem registro |
| causa | usuários deslocam diretamente |
| efeito | cadastro inexato e risco de perda |
| evidência | inspeção, logs e termos |
| ação | fluxo, validação e monitoramento |

Recomendação deve atacar a causa, não só corrigir o cadastro.

# Pegadinhas

- analítico individualiza; sintético totaliza;
- inventário não é impressão do sistema;
- carga não transfere propriedade;
- descarga pode apenas trocar responsável;
- movimento físico pode não gerar lançamento;
- troca de responsável pode ocorrer sem deslocamento;
- usuário desligado exige nova carga e conferência;
- item em trânsito não é automaticamente desaparecido;
- ajuste sem histórico destrói rastreabilidade;
- integração bem-sucedida ainda exige conciliação;
- aplicativo móvel não substitui inventário;
- número patrimonial não deve ser reutilizado;
- SIADS não é SIAFI;
- norma federal não vira regra estadual automaticamente.
