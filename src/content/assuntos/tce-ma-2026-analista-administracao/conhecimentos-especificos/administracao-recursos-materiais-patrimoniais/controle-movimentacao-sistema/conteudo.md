---
schemaVersion: 1
title: Controle, movimentação e sistema patrimonial
description: Controle patrimonial, movimentação física, administrativa, jurídica e contábil, sistemas, inventário, conciliação, indicadores e auditoria.
order: 118
storageId: controle-movimentacao-sistema
---

# Controle, movimentação e sistema patrimonial

Controlar patrimônio não é apenas manter uma lista de bens. É construir uma cadeia de evidências que permita responder, a qualquer momento: **o que existe, de onde veio, onde está, em que condição se encontra, quem o utiliza ou guarda, quais eventos ocorreram e como o registro administrativo se concilia com a contabilidade**.

A movimentação é um ponto crítico dessa cadeia. Um equipamento pode mudar de sala sem mudar de responsável, mudar de responsável sem sair da unidade, ser cedido temporariamente ou transferido em caráter permanente. Cada situação produz efeitos próprios e exige documentação coerente.

O sistema patrimonial organiza dados e fluxos, mas não substitui a realidade física. Um cadastro sem inventário pode descrever perfeitamente um bem que já não está no local indicado. Da mesma forma, encontrar fisicamente um objeto não comprova sozinho sua propriedade, seu valor contábil ou a regularidade de sua movimentação.

> **Ideia central:** controle efetivo liga bem, documento, localização, responsável, estado, valor e histórico; movimentação sem registro quebra essa ligação, e registro sem verificação física não a restabelece.

Este material considera as normas vigentes até **15 de julho de 2026**. A Constituição e a Lei nº 4.320/1964 oferecem fundamentos gerais. A Instrução Normativa SEDAP nº 205/1988, o Decreto nº 12.785/2025 e o SIADS são referências operacionais **federais** e não se aplicam automaticamente ao Estado do Maranhão ou ao TCE-MA.

## 1. Fundamentos do controle patrimonial

### 1.1 Fiscalização e prestação de contas

O art. 70 da Constituição submete a gestão patrimonial à fiscalização quanto a:

- legalidade;
- legitimidade;
- economicidade;
- aplicação de subvenções;
- renúncia de receitas.

O parágrafo único alcança qualquer pessoa que utilize, arrecade, guarde, gerencie ou administre bens e valores públicos ou pelos quais a União responda. A norma constitucional não cria um formulário específico, mas exige que a gestão possa ser demonstrada e controlada.

A Lei nº 4.320/1964 concretiza essa exigência em diferentes níveis:

- **art. 75, II:** o controle da execução orçamentária compreende a fidelidade funcional dos agentes responsáveis por bens e valores públicos;
- **art. 78:** levantamento, prestação ou tomada de contas podem ocorrer a qualquer tempo;
- **art. 94:** deve haver registro analítico de todos os bens de caráter permanente, com elementos para perfeita caracterização e indicação dos agentes responsáveis por sua guarda e administração;
- **art. 95:** devem existir registros sintéticos dos bens móveis e imóveis;
- **art. 96:** o levantamento geral deve basear-se no inventário analítico de cada unidade administrativa e nos elementos da escrituração sintética da contabilidade.

Esses dispositivos formam uma sequência lógica:

1. cada bem permanente precisa ser caracterizado individualmente;
2. sua guarda e administração precisam ser atribuídas;
3. os registros individuais precisam alimentar totalizações;
4. o inventário físico precisa ser confrontado com os registros patrimoniais e contábeis;
5. diferenças precisam ser explicadas e tratadas.

### 1.2 O que o controle procura assegurar

| Objetivo | Pergunta de controle |
| --- | --- |
| legalidade | o evento foi autorizado e documentado segundo a norma competente? |
| economicidade | o acervo evita compra desnecessária, perda, ociosidade e custo desproporcional? |
| eficiência | o bem adequado está disponível onde o serviço necessita? |
| salvaguarda | há proteção contra extravio, dano, furto e uso indevido? |
| fidedignidade | cadastro, existência física e contabilidade representam a mesma realidade? |
| rastreabilidade | é possível reconstruir origem, aprovações, movimentações e responsáveis? |
| prestação de contas | a entidade consegue demonstrar quem administrou, guardou e decidiu? |

Controle não significa burocracia idêntica para todos os objetos. A IN SEDAP nº 205/1988 reconhece, no âmbito federal, que o grau de controle deve considerar importância, valor relativo e dificuldade de ressuprimento. Um item crítico, portátil ou de alto valor demanda acompanhamento mais rigoroso que um conjunto de baixo valor e risco, sem que isso autorize abandonar o registro necessário.

<!-- REVISAO-CONTROLE-MOVIMENTACAO-2026 -->

## 1.3 Governança, papéis e qualidade da informação

O controle patrimonial não pertence exclusivamente ao setor de patrimônio. Ele depende de papéis coordenados e de dados com qualidade suficiente para sustentar decisão, custódia, contabilidade e prestação de contas.

### Matriz de responsabilidades

| Papel | Responsabilidade central |
| --- | --- |
| área requisitante | justificar necessidade, uso, mudança ou devolução |
| responsável pela carga | guardar, apresentar o bem e comunicar ocorrências |
| usuário | utilizar corretamente e informar mudança, dano ou indisponibilidade |
| patrimônio | cadastrar, identificar, validar, formalizar, movimentar e conciliar |
| logística/transporte | preservar identidade, integridade e cadeia de custódia |
| contabilidade | reconhecer, mensurar e conciliar contas e valores |
| tecnologia da informação | acessos, disponibilidade, integrações, logs e recuperação |
| comissão de inventário | verificar com independência existência, estado e custódia |
| controle interno/auditoria | avaliar desenho, funcionamento e evidência dos controles |
| autoridade competente | autorizar eventos sensíveis e regularizações |

A matriz precisa ser adaptada à estrutura local. Em unidade pequena, a impossibilidade de separar plenamente funções incompatíveis exige controles compensatórios, como dupla conferência, aprovação superior, revisão independente e inventário mais frequente.

### Critérios de qualidade dos dados

| Critério | Pergunta de verificação |
| --- | --- |
| completude | os campos, documentos e vínculos obrigatórios existem? |
| exatidão | o cadastro corresponde ao objeto, à fonte e ao evento real? |
| consistência | localização, carga, documento, série e contabilidade concordam? |
| tempestividade | o fato foi registrado sem atraso material? |
| unicidade | existe apenas um cadastro válido para cada identidade patrimonial? |
| validade | os valores obedecem ao formato, domínio e regra aplicáveis? |
| rastreabilidade | é possível reconstruir autor, data, motivo, aprovação e valores anteriores? |

Relatórios de exceção devem destacar, entre outros casos, bem ativo sem responsável, responsável desligado, local inexistente, série duplicada, movimentação vencida, item simultaneamente disponível e em manutenção, baixa sem reflexo contábil e lançamento contábil sem suporte patrimonial.

## 2. Arquitetura de controles

### 2.1 Cadastro, identificação e custódia

O controle começa por dados confiáveis. Conforme a natureza do objeto, o cadastro deve conter:

- número patrimonial estável e número de série;
- descrição padronizada, classe, marca, modelo e características relevantes;
- origem, fornecedor ou cedente, documento e data de incorporação;
- titularidade ou fundamento da posse, inclusive para bens de terceiros;
- valor, conta contábil, vida útil e depreciação, quando aplicáveis;
- unidade, localização detalhada, responsável e usuário;
- estado de conservação, garantia e manutenção;
- histórico de movimentações, inventários, divergências e regularizações;
- situação atual, sem apagar os eventos anteriores.

O número patrimonial individualiza o registro. Plaqueta, etiqueta, gravação, código de barras ou RFID são meios de associar esse número ao objeto. Se a marcação direta for inviável ou antieconômica, a entidade deve adotar controle alternativo coerente com risco e norma local, como relação-carga, número de série, fotografia ou agrupamento controlado.

Custódia não se confunde com propriedade. O responsável pela carga guarda ou controla o uso; o usuário pode ser outra pessoa; a unidade administrativa coordena o acervo; a pessoa jurídica permanece titular, salvo evento jurídico válido. Essas posições devem aparecer de forma clara no sistema.

### 2.2 Segregação de funções

Concentrar todas as etapas em uma só pessoa facilita erro e fraude. Conforme porte e risco, convém separar:

- solicitação e autorização;
- recebimento e aceitação técnica;
- incorporação e atribuição de carga;
- solicitação, aprovação e execução da movimentação;
- registro patrimonial e lançamento contábil;
- custódia e inventário;
- correção de divergência e aprovação da regularização;
- administração do sistema e auditoria de logs.

A Lei nº 14.133/2021 explicita a segregação de funções no processo de contratação. No restante do controle patrimonial, a separação também constitui técnica de controle interno, mas não se deve atribuir à lei de licitações uma disciplina completa da movimentação cotidiana.

Em estruturas pequenas, nem toda separação ideal é possível. A resposta não é eliminar o controle, e sim adotar compensações: dupla conferência, aprovação superior, relatórios de exceção, revisão independente e inventários mais frequentes.

### 2.3 Controles preventivos, detectivos e corretivos

| Tipo | Atua quando | Exemplos |
| --- | --- | --- |
| preventivo | antes ou durante o evento | identificação única, campo obrigatório, autorização prévia, perfil de acesso, termo de responsabilidade |
| detectivo | depois do evento ou em conferência | inventário, conciliação, relatório de pendências, alerta, auditoria de logs |
| corretivo | após a divergência confirmada | ajuste rastreável, atualização de carga, manutenção, apuração e encaminhamento regular |

Os três tipos se complementam. Bloquear movimentação sem destino reduz erros, mas não detecta bem retirado sem autorização. Inventário encontra a divergência, mas não evita sua ocorrência. A correção regulariza o dado, mas deve preservar a causa e a evidência para impedir repetição.

## 2.4 Risco, materialidade e controles proporcionais

O grau de controle deve combinar pelo menos:

- valor monetário;
- portabilidade e facilidade de subtração;
- criticidade para a continuidade do serviço;
- sensibilidade da informação armazenada;
- dificuldade e tempo de reposição;
- dispersão geográfica;
- histórico de perdas e divergências;
- custo do próprio controle.

Materialidade não se limita ao valor. Um token criptográfico de baixo custo pode ser crítico; um conjunto volumoso e pouco móvel pode exigir controle menos granular. Simplificar o controle não significa dispensar identificação, responsabilidade ou evidência quando necessárias.

## 3. O que é movimentação patrimonial

Movimentação patrimonial é gênero operacional. Para analisar um caso, separe quatro dimensões:

| Dimensão | O que muda | Exemplo |
| --- | --- | --- |
| física | posição material do objeto | notebook passa da sala A para a sala B |
| administrativa | autorização, documento, localização ou situação cadastral | guia aprovada registra a nova sala |
| responsabilidade | agente ou unidade que responde pela guarda | novo consignatário assina o termo |
| contábil | conta, unidade contábil, valor ou reconhecimento | transferência entre entidades exige análise do reflexo contábil |

Essa matriz é analítica, não uma taxonomia legal universal. As dimensões podem ocorrer juntas ou separadas:

- a troca de sala com o mesmo responsável gera movimento físico e atualização de localização, mas não necessariamente troca de carga ou lançamento contábil;
- a mudança do responsável por bens que permanecem na mesma sala altera a carga sem deslocamento físico;
- o envio temporário para manutenção externa altera posse imediata e localização, mas não transfere automaticamente propriedade;
- a transferência definitiva para outra entidade pode produzir efeitos jurídicos, administrativos e contábeis além da retirada física.

### 3.1 Movimento interno e externo; temporário e definitivo

Antes de nomear o evento, responda:

1. origem e destino pertencem à mesma unidade, ao mesmo órgão ou a pessoas jurídicas diferentes?
2. há deslocamento físico?
3. muda o responsável pela guarda?
4. a posse é temporária ou definitiva?
5. a propriedade muda?
6. há prazo e obrigação de devolução?
7. existe efeito contábil?

Termos como remanejamento, empréstimo, transferência e cessão podem receber definições próprias em regulamentos locais. Por isso, não devem ser tratados como sinônimos universais.

No âmbito da administração pública federal direta, autárquica e fundacional, o Decreto nº 12.785/2025 disciplina mecanismos de circularidade de bens móveis:

- **cessão:** movimentação precária e por prazo determinado de bem inservível ocioso ou recuperável, com transmissão da posse e da responsabilidade pela guarda, conservação e manutenção;
- **transferência:** movimentação permanente de bem inservível ocioso ou recuperável, com transmissão da posse, da propriedade e das responsabilidades pela guarda, conservação, manutenção e destinação ao final da vida útil;
- **transferência interna:** ocorre entre unidades organizacionais do mesmo órgão ou entidade;
- **transferência externa:** ocorre entre órgãos da União;
- a transferência interna tem preferência sobre a externa;
- a cessão ou transferência de bem em uso regular é excepcional e exige justificativa da autoridade competente.

O decreto entrou em vigor em 22 de dezembro de 2025 e revogou os Decretos nº 9.373/2018 e nº 10.340/2020. Suas definições atualizam o regime federal de circularidade, mas não criam automaticamente as categorias operacionais do TCE-MA.

### 3.2 Movimentação não é alienação nem baixa

Não se deve presumir que toda saída física retire o bem do patrimônio:

- manutenção externa muda localização e custódia imediata, mas normalmente conserva a titularidade;
- cessão federal é temporária e não transfere propriedade;
- transferência, conforme o regime aplicável, pode ser definitiva;
- alienação transfere propriedade por negócio jurídico;
- baixa encerra o registro patrimonial segundo causa e procedimento válidos;
- descarte é destinação física e ambiental, não simples exclusão cadastral.

Avaliação, alienação, baixa e desfazimento serão aprofundados no Assunto 123. Aqui, a regra de controle é: **não remover o registro como atalho para resolver uma divergência física**.

### 3.3 Quinta dimensão: efeito jurídico

Além das dimensões física, administrativa, de responsabilidade e contábil, questões complexas exigem identificar a dimensão jurídica:

| Pergunta jurídica | Exemplos |
| --- | --- |
| quem é o proprietário? | órgão, outra entidade ou terceiro |
| quem possui ou detém o bem? | servidor, contratado, oficina ou cessionário |
| existe direito de uso? | licença, comodato, arrendamento ou cessão |
| há dever de devolver? | cautela, manutenção, empréstimo ou cessão temporária |
| a propriedade mudou? | transferência definitiva ou alienação regular |

Uma saída para manutenção pode alterar localização e detenção sem modificar propriedade, reconhecimento contábil ou carga definitiva. Já uma transferência entre pessoas jurídicas pode exigir instrumento, aceite, baixa na origem, incorporação no destino e conciliação contábil.

### 3.4 Estados da movimentação

Um fluxo eletrônico pode usar estados como:

```text
rascunho → solicitado → autorizado → preparado → em trânsito
→ recebido com ou sem ressalva → aceito ou rejeitado → encerrado
```

Estados alternativos incluem `cancelado`, `expirado`, `devolvido`, `contestado` e `bloqueado para apuração`.

Cada transição deve registrar:

- agente competente;
- data e hora;
- documento e justificativa;
- condição do bem;
- origem e destino;
- responsável anterior e futuro;
- prazo de devolução, se houver;
- reflexo administrativo e contábil;
- pendências e ressalvas.

O sistema não deve mostrar o evento como encerrado na origem e inexistente no destino. Durante o transporte, o estado `em trânsito` preserva a cadeia de custódia.

### 3.5 Data efetiva e data de lançamento

A data do fato não é necessariamente a data do registro.

> Um notebook saiu em 10 de julho, foi recebido em 11 de julho e lançado no sistema em 15 de julho.

Nesse caso, há pelo menos três marcos: saída, recebimento e lançamento. Corrigir o cadastro retroativamente não deve apagar o atraso. A trilha precisa preservar a data real do evento e a data em que a informação foi incluída ou corrigida, permitindo medir tempestividade e exposição.

## 4. Fluxo seguro de movimentação

### 4.1 Antes do deslocamento

Uma solicitação deve identificar, conforme o caso:

- bem e número patrimonial;
- origem e destino;
- localização atual e futura;
- responsável anterior e futuro;
- motivo, tipo e duração do evento;
- estado de conservação;
- prazo e devolução, se temporário;
- transporte, embalagem e seguro, se necessários;
- autorização competente;
- processo, guia ou termo de suporte.

O sistema deve validar existência, situação, carga e competência. Bem já baixado, bloqueado, desaparecido, em inventário restritivo ou vinculado a outro evento pendente não deve circular como se estivesse regular.

### 4.2 Durante a movimentação

O executor deve conferir identidade e condição do objeto. Para remessas, a IN SEDAP nº 205/1988 exige, no contexto federal, guia de remessa ou nota de transferência com descrição padronizada, quantidade, unidade, preços, volumes, peso, acondicionamento e grau de fragilidade ou perecibilidade, além de comunicação pelo remetente e acusação de recebimento pelo destinatário.

Para material permanente, os itens 7.13.3 a 7.13.5 da instrução orientam que:

- a redistribuição atualize o termo de responsabilidade com nova localização, estado de conservação e assinatura do novo consignatário;
- mesmo sob o mesmo consignatário, o bem não seja movimentado sem ciência prévia da unidade administrativa competente;
- a passagem entre unidades organizacionais ocorra por intermédio dessa unidade competente.

O objetivo não é fazer o papel seguir o bem dias depois. O registro deve acompanhar o evento com o menor intervalo possível, evitando períodos em que cadastro e realidade física indiquem locais diferentes.

### 4.3 Recebimento no destino e encerramento

O destinatário deve:

1. conferir número patrimonial, quantidade e descrição;
2. examinar o estado de conservação e registrar ressalvas;
3. confirmar data e localização de entrada;
4. aceitar a custódia quando competente;
5. assinar ou aprovar eletronicamente o termo;
6. devolver ou contestar o evento se houver divergência;
7. acionar eventual lançamento contábil ou integração;
8. encerrar a pendência sem apagar o histórico.

Receber fisicamente não significa aceitar silenciosamente dano ou divergência. O aceite deve registrar a condição real. Em movimentação temporária, o sistema também precisa controlar vencimento, prorrogação e devolução.

### 4.4 Carga e descarga na IN SEDAP nº 205/1988

Na terminologia da instrução federal:

- **carga** é a efetiva responsabilidade pela guarda e uso do material pelo consignatário;
- **descarga** é a transferência dessa responsabilidade;
- toda entrada ou saída de carga depende de registro e documento justificativo;
- equipamento ou material permanente não deve ser distribuído sem carga formalizada em Termo de Responsabilidade;
- a passagem de responsabilidade deve ser apoiada em verificação física e novo termo.

Portanto, descarga não significa necessariamente baixa. Ela pode ocorrer porque a responsabilidade passou a outro consignatário. Confundir os conceitos pode eliminar indevidamente um bem que continua pertencendo à entidade.

### 4.5 Casos de movimentação que exigem desenho próprio

- **teletrabalho:** registrar cautela, endereço ou local autorizado, acessórios, condição, prazo e devolução;
- **manutenção externa:** relacionar ordem de serviço, prestador, acessórios, condição de saída e retorno;
- **bem de terceiro:** controlar posse e custódia sem tratá-lo como propriedade da entidade;
- **bem sob contratado:** definir obrigação de guarda, inventário, comunicação e devolução;
- **evento temporário:** estabelecer responsável, prazo e retorno;
- **transferência em lote:** preservar identidade individual e totais de controle;
- **item em trânsito no inventário:** classificar a situação e confirmar origem, destino e documentação;
- **devolução com dano:** registrar ressalva, evidência, aceite condicionado e apuração cabível;
- **movimento cadastrado sem deslocamento:** cancelar ou regularizar com trilha, sem simular o fato.

## 5. Sistema patrimonial

Sistema patrimonial é o conjunto de dados, regras, perfis, fluxos e relatórios que sustenta o controle do acervo. O software é apenas sua implementação tecnológica. Um programa sem processo definido, responsáveis capacitados e dados confiáveis não forma um bom sistema de controle.

### 5.1 Cadastro mestre e ciclo de vida

Deve existir uma fonte mestre para a identidade e a situação do bem. Planilhas auxiliares podem apoiar trabalhos temporários, como coleta de inventário, mas não devem competir como cadastros oficiais.

O histórico do ciclo de vida pode incluir:

1. recebimento e aceitação;
2. classificação e incorporação;
3. identificação e tombamento;
4. distribuição e carga;
5. uso e manutenção;
6. movimentações internas e externas;
7. inventários e conciliações;
8. ocorrências e regularizações;
9. destinação e baixa, quando autorizadas.

Cada evento deve registrar autor, data e hora, documento, aprovação, estado anterior e novo estado. Corrigir dado não significa apagar o valor anterior: a trilha de auditoria precisa permitir reconstruir o ocorrido.

### 5.2 Perfis, fluxos e validações

Um sistema confiável deve:

- aplicar menor privilégio e perfis por função;
- separar solicitação, aprovação, execução e conciliação;
- impedir eventos incompatíveis ou simultâneos;
- exigir campos e anexos conforme o tipo de operação;
- registrar aceite do destino e pendências;
- conservar logs de criação, alteração, aprovação e cancelamento;
- alertar para prazos, ausência de responsável, localização inválida e movimento não concluído;
- exigir justificativa e aprovação para correções sensíveis;
- gerar relatórios reproduzíveis para inventário e prestação de contas.

O item 7.2.1 da IN SEDAP nº 205/1988 já exigia registro de fácil acesso e dispositivos de alerta para situações indesejadas. O item 7.3 também destaca atualização no menor tempo possível entre fato e registro. Tecnologia moderna amplia essas possibilidades, mas não muda o fundamento.

### 5.3 Integrações

O sistema patrimonial pode trocar dados com:

| Área ou sistema | Informação relacionada |
| --- | --- |
| compras e contratos | pedido, fornecedor, nota, garantia e instrumento |
| almoxarifado | recebimento, aceitação, distribuição e saldo de materiais |
| orçamento e finanças | empenho, liquidação, pagamento e fonte |
| contabilidade | reconhecimento, conta, valor, depreciação, perda e baixa |
| manutenção | ordem de serviço, custo, indisponibilidade e condição |
| gestão organizacional | unidades, locais, responsáveis e lotação |
| auditoria | logs, documentos, exceções e evidências |

Integração não é cópia indiscriminada. Deve haver chave estável, origem definida para cada dado, validação da interface, tratamento de falhas e conciliação. Se compras chama o item de uma forma, patrimônio de outra e contabilidade totaliza uma terceira classificação, relatórios podem parecer consistentes internamente e ainda assim não se relacionar.

### 5.4 SIADS e SIAFI como exemplos federais

A Portaria nº 232/2020 instituiu o **Sistema Integrado de Gestão Patrimonial (SIADS)** na administração pública federal direta, autárquica e fundacional e nas empresas públicas dependentes do Poder Executivo federal. O sistema gerencia bens móveis permanentes e de consumo, intangíveis e frota.

Entre seus objetivos estão:

- sistematizar registros conforme o Plano de Contas Aplicado ao Setor Público;
- reconhecer periodicamente depreciação e amortização;
- automatizar o registro contábil de atos e fatos no **SIAFI**, de forma on-line;
- sistematizar procedimentos do SISG;
- apoiar custos, alocação de recursos e qualidade do gasto.

O exemplo mostra papéis complementares: o SIADS trata gestão patrimonial operacional; o SIAFI recebe registros financeiro-contábeis federais. A integração reduz redigitação, mas exige conciliação e não substitui inventário. Não há base oficial suficiente, nas fontes consultadas, para afirmar que SIADS ou outro produto específico seja o sistema usado pelo TCE-MA.

### 5.5 Segurança, continuidade e qualidade de dados

Como o sistema sustenta prestação de contas, deve-se proteger:

- **confidencialidade compatível:** acesso apenas a quem necessita, sem ocultar informação pública legítima;
- **integridade:** prevenção e detecção de alteração indevida;
- **disponibilidade:** continuidade, cópias de segurança e recuperação;
- **autenticidade:** identificação de quem executou cada ato;
- **rastreabilidade:** histórico verificável e exportável.

Cadastros duplicados, usuários genéricos, exclusão de logs, perfis excessivos e correções diretas no banco reduzem a força da evidência. Migrações também exigem contagem, totalização, amostragem e conciliação antes e depois da carga de dados.

### 5.6 Controles gerais de tecnologia e controles da aplicação

#### Controles gerais de tecnologia

- acesso individual e revisão periódica de perfis;
- segregação entre desenvolvimento, homologação e produção;
- gestão de mudanças;
- backup e recuperação testada;
- continuidade e tratamento de incidentes;
- monitoramento de disponibilidade;
- proteção e retenção de logs.

#### Controles da aplicação patrimonial

- identificador estável e não reutilizável;
- validação da situação do bem;
- campos e documentos obrigatórios;
- alçadas de aprovação;
- bloqueio de eventos incompatíveis;
- aceite do destino;
- totalizações e cálculos validados;
- tratamento de rejeições de interface;
- histórico do estado anterior e do novo estado.

O número patrimonial não deve ser reutilizado depois da baixa. A reutilização mistura aquisições, cargas, manutenção, depreciação, ocorrências e responsabilização de objetos diferentes.

Código de barras, RFID, plaqueta e número de série vinculam o objeto ao cadastro, mas não comprovam isoladamente propriedade, localização atual, condição ou regularidade da carga.

### 5.7 Integração: origem, interface e destino

Toda integração deve definir:

1. sistema de origem de cada dado;
2. chave estável de relacionamento;
3. regra de transformação;
4. total de controle;
5. tratamento de rejeição e duplicidade;
6. responsável pela correção;
7. reconciliação periódica.

Quando a interface falha, a correção deve ocorrer preferencialmente no sistema que originou o erro. Ajustar apenas o destino pode fazer os sistemas voltarem a divergir na próxima transmissão.

## 6. Inventário e conciliação

### 6.1 Inventário físico

A IN SEDAP nº 205/1988 define inventário físico como instrumento para verificar saldos de estoque, equipamentos e materiais permanentes. Ele permite ajustar dados escriturais ao saldo físico, avaliar materiais, identificar manutenção e constatar bens desnecessários à unidade.

No âmbito da instrução federal, os tipos são:

- **anual:** comprova quantidade e valor existentes em 31 de dezembro;
- **inicial:** identifica e registra bens na criação de unidade gestora;
- **de transferência de responsabilidade:** acompanha mudança do dirigente da unidade gestora;
- **de extinção ou transformação:** ocorre quando a unidade é extinta ou transformada;
- **eventual:** pode ser realizado em qualquer época por iniciativa do dirigente ou órgão fiscalizador.

A instrução também admite, como instrumentos gerenciais, inventário rotativo e inventário por amostragem. A modalidade deve respeitar a finalidade e as normas do ente; amostragem gerencial não substitui automaticamente inventário integral exigido para prestação de contas.

O inventário analítico deve identificar ao menos descrição padronizada, número de registro, valor e estado, além dos elementos necessários à perfeita caracterização.

### 6.2 Inventariar não é confirmar a listagem

Uma contagem independente não deve apenas pedir ao responsável que confirme o relatório do sistema. O trabalho precisa verificar identidade, existência, localização, estado e custódia, registrar bens encontrados sem cadastro e procurar bens cadastrados não encontrados.

Um fluxo possível é:

1. planejar escopo, data-base, equipe e critérios;
2. congelar ou controlar movimentos durante a contagem;
3. extrair listagem e registrar sua versão;
4. identificar fisicamente os bens;
5. realizar reconferência independente de exceções;
6. classificar diferenças;
7. obter documentos e justificativas;
8. autorizar ajustes rastreáveis;
9. conciliar totais patrimoniais e contábeis;
10. emitir relatório com causas, providências e pendências.

### 6.3 Conciliação físico-patrimonial-contábil

| Comparação | Divergência possível |
| --- | --- |
| físico × cadastro | bem não localizado, bem sem registro, etiqueta divergente |
| cadastro × carga | responsável ou localização desatualizados |
| cadastro × documento | origem, valor ou situação sem suporte |
| patrimônio × contabilidade | quantidade, conta ou valor total divergente |
| sistema × integração | evento rejeitado, duplicado ou processado parcialmente |

Encontrar diferença não autoriza ajustar de imediato para “fechar” o relatório. Primeiro se preservam evidências e se investiga a causa: atraso de registro, movimento pendente, erro de identificação, duplicidade, bem em manutenção, bem de terceiro, falha de integração, dano ou desaparecimento.

Depois da análise, a solução pode ser concluir movimentação, atualizar localização ou termo, corrigir cadastro com aprovação, registrar evento contábil, abrir manutenção ou iniciar apuração. Baixa e responsabilização dependem de pressupostos próprios.

### 6.4 Técnicas para inventário confiável

- **cutoff:** controlar movimentos próximos à data-base;
- **contagem cega:** evitar que o saldo esperado induza a equipe;
- **cadastro → físico:** localizar todos os itens registrados;
- **físico → cadastro:** identificar objetos sem registro;
- **recontagem independente:** confirmar exceções;
- **estratificação por risco:** aumentar rigor para itens portáteis, críticos ou valiosos;
- **cadeia de custódia das listas:** preservar versão, autoria e alterações;
- **independência:** evitar que o único custodiante seja o único conferente;
- **causa-raiz:** distinguir atraso, falha de interface, erro de identidade, movimento clandestino, dano e desaparecimento.

O aplicativo de inventário eletrônico pode acelerar a coleta por código de barras, mas não substitui o procedimento, a análise de exceções, a conciliação nem a plataforma patrimonial.

### 6.5 Conciliação em quatro camadas

| Camada | Comparação |
| --- | --- |
| física | objeto encontrado × item esperado |
| administrativa | físico × cadastro, carga, localização e documento |
| contábil | cadastro patrimonial × razão, conta e valor |
| tecnológica | sistema de origem × interface × sistema de destino |

A solução depende da causa. Divergência causada por movimento pendente não recebe o mesmo tratamento de duplicidade, dano, desaparecimento ou erro de conta.

## 7. Riscos, controles e indicadores

### 7.1 Riscos frequentes

- bem sem identificação, localização ou responsável;
- deslocamento físico antes da autorização ou sem aceite do destino;
- termo assinado que não corresponde ao acervo real;
- bem em manutenção externa registrado como desaparecido ou ainda disponível;
- movimentação pendente indefinidamente;
- inventário feito apenas por confirmação do sistema;
- planilhas paralelas com versões conflitantes;
- mesma pessoa solicitando, aprovando, registrando e conciliando;
- integração que duplica ou perde eventos;
- ajuste que apaga o histórico;
- baixa usada para ocultar divergência;
- cadastro correto em quantidade, mas errado em valor ou conta.

### 7.2 Indicadores úteis

| Indicador | Leitura |
| --- | --- |
| bens sem responsável ou localização válida | falha de cadastro e custódia |
| movimentos pendentes por idade | risco de realidade física superar o registro |
| tempo entre movimento e atualização | tempestividade do controle |
| termos atualizados | aderência entre carga e situação real |
| inventário concluído no prazo | execução do plano de verificação |
| divergências em quantidade e valor | diferença físico-patrimonial-contábil |
| tempo de regularização | capacidade de tratar exceções |
| eventos sem documento ou aceite | fragilidade da trilha de auditoria |
| bens ociosos ou sem uso previsto | oportunidade de realocação |
| perdas, danos e reincidência | exposição e eficácia dos controles |

Não há meta universal para esses indicadores. A entidade deve definir critérios segundo porte, dispersão, criticidade, materialidade, capacidade operacional e apetite a risco. “Zero divergência” pode significar excelente controle, mas também inventário superficial; o indicador precisa ser acompanhado da qualidade do procedimento.

### 7.3 Indicadores com fórmula

| Indicador | Fórmula básica |
| --- | --- |
| acurácia por quantidade | itens corretos ÷ itens verificados |
| acurácia por valor | valor conciliado ÷ valor verificado |
| bens sem carga válida | bens sem responsável válido ÷ bens ativos |
| pendências vencidas | movimentos vencidos ÷ movimentos abertos |
| regularização | divergências resolvidas ÷ divergências confirmadas |
| cobertura do inventário rotativo | itens inventariados no ciclo ÷ universo previsto |
| reincidência | ocorrências com causa repetida ÷ ocorrências totais |
| tempestividade | mediana entre data efetiva e data do lançamento |

A taxa precisa definir numerador, denominador, período e universo. Acurácia por quantidade e por valor podem produzir leituras diferentes: poucos itens caros podem concentrar a maior exposição.

### 7.4 Perspectiva de auditoria

| Elemento | Aplicação |
| --- | --- |
| critério | norma exige autorização e termo atualizado |
| condição | parte dos notebooks mudou de local sem registro |
| causa | usuários deslocam bens diretamente |
| efeito | cadastro inexato e risco de perda ou responsabilização equivocada |
| evidência | inspeção, logs, termos, lotação e entrevistas |
| encaminhamento | fluxo eletrônico, validação, comunicação e monitoramento |

A recomendação deve atacar a causa. Apenas atualizar o cadastro corrige a condição encontrada, mas não impede novas movimentações irregulares.

## 8. Casos integrados

### Caso 1: mudança de sala com o mesmo usuário

Um notebook passa da sala 201 para a 305 e permanece com o mesmo servidor. Não há troca necessária de propriedade nem de responsável, mas existe mudança física e cadastral. A ciência ou autorização competente, a nova localização e a data devem ser registradas. A IN SEDAP nº 205/1988, como referência federal, exige ciência prévia mesmo sob o mesmo consignatário.

### Caso 2: troca de responsável sem deslocamento

O dirigente deixa a unidade, e o mobiliário permanece no local. Deve-se verificar fisicamente o acervo, resolver pendências e formalizar a nova responsabilidade. Copiar a carga antiga para o sucessor sem conferência transfere erro, não controle.

### Caso 3: equipamento enviado para manutenção

O bem sai temporariamente para empresa contratada. O sistema deve registrar ordem, prestador, data, estado, acessórios, previsão de retorno e responsável pelo acompanhamento. A propriedade não muda. Na devolução, condição e funcionamento precisam ser conferidos antes do encerramento.

### Caso 4: cadastro e contabilidade discordam

O sistema patrimonial totaliza 100 equipamentos, e a contabilidade registra valor correspondente a 102. A diferença pode decorrer de integração pendente, duplicidade, baixa não contabilizada ou critério de reconhecimento. Não se escolhe arbitrariamente um total: patrimônio e contabilidade investigam documentos e eventos até explicar e regularizar a diferença.

### Caso 5: bem não encontrado no inventário

A comissão preserva a listagem, reconfere localizações, consulta movimentos e manutenção, ouve responsáveis e registra a exceção. Somente depois se decide por correção cadastral, localização, apuração ou outro procedimento. Excluir o registro antes da investigação destrói evidência e pode mascarar dano.

### Caso 6: usuário desligado

O sistema mantém a carga em nome de servidor que deixou a unidade. A existência física dos bens não elimina a divergência. É necessário inventariar, verificar a passagem de responsabilidade, formalizar o novo responsável e preservar o período em que a carga ficou desatualizada.

### Caso 7: item em trânsito durante o inventário

O bem não está na origem nem chegou ao destino. A comissão verifica guia, autorização, transportador, prazo, estado do fluxo e confirmação posterior. Classificá-lo imediatamente como desaparecido ou simplesmente ignorá-lo seriam respostas inadequadas.

### Caso 8: integração rejeitada

A baixa foi aprovada no patrimônio, mas a interface contábil rejeitou a conta. O evento deve permanecer pendente, ser corrigido na origem ou na regra de integração e depois conciliado. Alterar manualmente apenas a contabilidade enfraquece a trilha e pode gerar nova divergência.

### Caso 9: identificador reutilizado

Após a baixa de uma impressora, o número patrimonial foi atribuído a um notebook. O histórico tornou-se ambíguo. O identificador antigo deveria permanecer encerrado e o novo bem receber número próprio.

### Caso 10: inventário sem independência

O responsável pela carga apenas assina a listagem que ele próprio mantém. O procedimento não produz evidência independente suficiente. É preciso verificar fisicamente, testar nos dois sentidos e reconferir exceções.

## 9. Pegadinhas de prova

1. **Registro analítico não é registro sintético.** O primeiro caracteriza individualmente; o segundo totaliza classes patrimoniais.
2. **Inventário não é mera impressão do sistema.** Ele confronta informação com existência e condição físicas.
3. **Carga não é propriedade.** Indica responsabilidade por guarda e uso.
4. **Descarga não é necessariamente baixa.** Na IN SEDAP nº 205/1988, é transferência da responsabilidade.
5. **Movimento físico não implica sempre movimento contábil.** Cada dimensão deve ser analisada.
6. **Troca de responsável pode ocorrer sem deslocamento.** Exige conferência e formalização.
7. **Sistema não corrige processo ruim sozinho.** Dados, papéis, validações e inventário continuam necessários.
8. **SIADS e SIAFI não são sinônimos.** Um gerencia patrimônio federal; o outro concentra registros financeiro-contábeis federais.
9. **SIADS não é automaticamente o sistema do TCE-MA.** A Portaria nº 232/2020 possui escopo federal específico.
10. **O Decreto nº 9.373/2018 foi revogado.** No recorte federal atual, vale o Decreto nº 12.785/2025.
11. **Cessão federal atual é precária e temporária; transferência é permanente.** A segunda transmite também propriedade.
12. **Alienação e baixa não são simples movimentações internas.** Exigem causas, competências e procedimentos próprios.
13. **Correção sem histórico enfraquece a evidência.** Ajuste deve ser autorizado e rastreável.
14. **Indicador não tem meta universal.** O contexto da entidade define tolerância e prioridade.

## Referências

- BRASIL. [Constituição da República Federativa do Brasil de 1988](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm). Art. 70.
- BRASIL. [Lei nº 4.320, de 17 de março de 1964](https://www.planalto.gov.br/ccivil_03/leis/l4320compilado.htm). Arts. 75, 78 e 94 a 96.
- BRASIL. [Decreto nº 12.785, de 19 de dezembro de 2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12785.htm). Circularidade de bens móveis no âmbito federal.
- BRASIL. [Portaria nº 232, de 2 de junho de 2020, atualizada](https://www.gov.br/compras/pt-br/acesso-a-informacao/legislacao/portarias/portaria-no-232-de-2-de-junho-de-2020). Institui o SIADS e disciplina seu âmbito.
- BRASIL. [Instrução Normativa SEDAP nº 205, de 8 de abril de 1988](https://www.gov.br/patrimonio/pt-br/central-de-conteudo/legislacao/instrucoes-normativas/instrucao-normativa-no-205-de-08-de-abril-de-1988). Carga, descarga, movimentação, inventário e controles.
- BRASIL. [Portal do SIADS](https://www.gov.br/patrimonio/pt-br/siads). Funções, público obrigatório e integração.
- BRASIL. [Aplicativo Inventário Eletrônico SIADS](https://www.gov.br/patrimonio/pt-br/siads/app-inventario-eletronico-siads). Ferramenta auxiliar de coleta.
- CONSELHO FEDERAL DE CONTABILIDADE. [NBC TSP 37 — Ativo Imobilizado e NBC TSP 38 — Mensuração](https://cfc.org.br/tecnica/normas-brasileiras-de-contabilidade/nbc-tsp-do-setor-publico/).
- BRASIL. [Constituição da República Federativa do Brasil de 1988](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm). Art. 70. Texto vigente até 15 jul. 2026. Acesso em 16 jul. 2026.
- BRASIL. [Lei nº 4.320, de 17 de março de 1964](https://www.planalto.gov.br/ccivil_03/leis/l4320.htm). Arts. 75, 78 e 94 a 96. Texto vigente até 15 jul. 2026. Acesso em 16 jul. 2026.
- BRASIL. [Lei nº 14.133, de 1º de abril de 2021](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm). Arts. 5º e 7º. Texto vigente até 15 jul. 2026. Acesso em 16 jul. 2026.
- BRASIL. Secretaria de Administração Pública da Presidência da República. [Instrução Normativa nº 205, de 8 de abril de 1988](https://www.gov.br/compras/pt-br/acesso-a-informacao/legislacao/instrucoes-normativas/instrucao-normativa-no-205-de-08-de-abril-de-1988). Texto integral no Portal de Compras do Governo Federal; referência do SISG federal. Acesso em 16 jul. 2026.
- BRASIL. [Decreto nº 12.785, de 19 de dezembro de 2025](https://www2.camara.leg.br/legin/fed/decret/2025/decreto-12785-19-dezembro-2025-798522-publicacaooriginal-177487-pe.html). Publicação original reproduzida pela Câmara dos Deputados; DOU, Seção 1, 22 dez. 2025, p. 9. Vigente desde 22 dez. 2025. Acesso em 16 jul. 2026.
- BRASIL. Ministério da Economia. [Portaria nº 232, de 2 de junho de 2020, atualizada](https://www.gov.br/patrimonio/pt-br/central-de-conteudo/legislacao/portarias/portaria-no-232-de-2-de-junho-de-2020-atualizada). Institui o SIADS no âmbito federal indicado no art. 1º; página modificada em 1º nov. 2024. Acesso em 16 jul. 2026.
- BRASIL. Secretaria do Tesouro Nacional. [Manual de Contabilidade Aplicada ao Setor Público, 11ª edição](https://www.gov.br/tesouronacional/pt-br/contabilidade-e-custos/manuais/manual-de-contabilidade-aplicada-ao-setor-publico-mcasp-1). Edição vigente em 2026. Acesso em 16 jul. 2026.
- TRIBUNAL DE CONTAS DA UNIÃO. [Acórdão nº 2.366/2007 — Segunda Câmara](https://pesquisa.apps.tcu.gov.br/doc/acordao-completo/2366/2007/Segunda%20C%C3%A2mara). Recomendações federais sobre inventário, conciliação, termos de responsabilidade e apuração. Acesso em 16 jul. 2026.
