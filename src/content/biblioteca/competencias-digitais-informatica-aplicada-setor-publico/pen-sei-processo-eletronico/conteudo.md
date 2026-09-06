---
schemaVersion: 1
title: "Processo Eletrônico Nacional e Sistema Eletrônico de Informações"
description: Infraestrutura do PEN, ecossistema de serviços, fundamentos e operações do SEI, interoperabilidade, protocolo e gestão documental.
order: 31
storageId: pen-sei-processo-eletronico
---

# Processo Eletrônico Nacional e Sistema Eletrônico de Informações

Imagine um requerimento que nasce fora de um órgão, entra pela internet, vira processo administrativo, passa por várias unidades e depois precisa seguir para outra instituição que usa um sistema diferente. **Uma única ferramenta não precisa fazer tudo isso.** Esse é o ponto de partida para entender o assunto.

O <abbr title="Processo Eletrônico Nacional">PEN</abbr> organiza um **ecossistema de soluções** para o processo administrativo eletrônico. O <abbr title="Sistema Eletrônico de Informações">SEI</abbr> é uma dessas soluções: é o sistema usado para produzir, organizar, assinar, tramitar e acompanhar documentos e processos. Outras soluções cuidam de entrada externa, comunicação entre sistemas, consulta de tramitação e identificação padronizada.

> **Ideia central:** <abbr title="Processo Eletrônico Nacional">PEN</abbr> é a infraestrutura/ecossistema; <abbr title="Sistema Eletrônico de Informações">SEI</abbr> é um sistema integrante desse ecossistema. Eles não são sinônimos.

> **Corte de atualização:** 10 de agosto de 2026. O foco deste capítulo é compreender o mecanismo do processo eletrônico e distinguir as funções das soluções cobradas, sem transformar o assunto em curso de administração do <abbr title="Sistema Eletrônico de Informações">SEI</abbr> ou de gestão arquivística.

## 1. Primeiro, acompanhe o fluxo

Considere este cenário hipotético: uma pessoa envia um requerimento a um órgão federal; o órgão forma um processo, instrui-o internamente e depois precisa remetê-lo a outra instituição.

O fluxo mental é:

1. **entrada externa** → Protocolo GOV.BR;
2. **gestão do processo dentro da instituição** → <abbr title="Sistema Eletrônico de Informações">SEI</abbr>;
3. **expedição para outro sistema de processo eletrônico** → Tramita GOV.BR;
4. **consulta de dados de tramitação** → Protocolo Integrado;
5. **identificação padronizada do processo ou documento avulso** → <abbr title="Número Único de Protocolo">NUP</abbr>.

Essa sequência resolve a maior parte das confusões de prova porque separa **função** de **nome da ferramenta**.

### 1.1 Onde entra o <abbr title="Processo Eletrônico Nacional">PEN</abbr>?

O <abbr title="Processo Eletrônico Nacional">PEN</abbr> é uma infraestrutura pública de processo administrativo eletrônico. Em vez de ser um software único, reúne soluções, padrões e serviços capazes de apoiar etapas diferentes do ciclo documental e processual.

No âmbito federal, sua gestão compete à Secretaria de Gestão e Inovação do <abbr title="Ministério da Gestão e da Inovação em Serviços Públicos">MGI</abbr>, por meio da <abbr title="Diretoria de Transformação Digital em Processo Eletrônico e Sistemas de Gestão">DTGES</abbr>, conforme a estrutura vigente em 2026.

O <abbr title="Processo Eletrônico Nacional">PEN</abbr> foi formalizado em 2013. O Decreto nº 8.539/2015 veio depois e disciplina o uso do meio eletrônico no processo administrativo federal por ele abrangido; portanto, **o decreto não criou o <abbr title="Processo Eletrônico Nacional">PEN</abbr>**.

### 1.2 E o <abbr title="Programa Nacional de Processo Eletrônico">ProPEN</abbr>?

O <abbr title="Programa Nacional de Processo Eletrônico">ProPEN</abbr>, instituído pelo Decreto nº 11.946/2024, promove a adoção do processo administrativo eletrônico por Estados, Distrito Federal e Municípios e apoia a expansão das soluções do ecossistema para instituições elegíveis.

Assim, não confunda:

- <abbr title="Processo Eletrônico Nacional">PEN</abbr> → infraestrutura e conjunto de soluções;
- <abbr title="Programa Nacional de Processo Eletrônico">ProPEN</abbr> → programa de expansão e apoio à adoção dessas soluções;
- <abbr title="Sistema Eletrônico de Informações">SEI</abbr> → sistema para produzir e gerir processos e documentos eletrônicos.

## 2. O que cada solução faz

Depois de compreender o fluxo, vale sintetizar as funções:

| Solução | Pergunta que ela responde |
| --- | --- |
| <abbr title="Processo Eletrônico Nacional">PEN</abbr> | qual infraestrutura integra as soluções de processo eletrônico? |
| <abbr title="Sistema Eletrônico de Informações">SEI</abbr> | onde o órgão produz, organiza e tramita seus processos e documentos? |
| <abbr title="Programa Nacional de Processo Eletrônico">ProPEN</abbr> | como ampliar a adoção das soluções do ecossistema por entes e instituições elegíveis? |
| Tramita GOV.BR | como expedir processo ou documento avulso entre sistemas diferentes? |
| Protocolo GOV.BR | como receber eletronicamente documentos, solicitações e requerimentos externos? |
| Protocolo Integrado | como consultar dados e histórico de tramitação informados pelos participantes? |
| <abbr title="Número Único de Protocolo">NUP</abbr> | como identificar processos e documentos avulsos por numeração padronizada? |

Uma banca pode tentar inverter essas funções. O antídoto é perguntar: **a questão fala de entrada, gestão interna, expedição, consulta ou identificação?**

## 3. A base federal: Decreto nº 8.539/2015

O Decreto nº 8.539/2015 dispõe sobre o uso do meio eletrônico para a realização do processo administrativo no âmbito dos órgãos e entidades da administração pública federal **direta, autárquica e fundacional**.

Esse recorte importa. Não transforme a regra federal do decreto em norma automaticamente aplicável a todos os Poderes, Estados, Municípios, empresas estatais ou Tribunais de Contas.

### 3.1 O que muda quando o processo é eletrônico?

O suporte muda; as exigências jurídicas não desaparecem. O processo continua precisando registrar atos, preservar autoria e integridade, controlar acesso quando necessário e manter rastreabilidade.

O decreto trabalha com alguns conceitos básicos:

- **documento:** unidade de registro de informações, independentemente de formato ou suporte;
- **documento digital:** informação registrada em forma interpretável por sistema computacional;
- <abbr title="Documento criado originariamente em meio eletrônico">documento nato-digital</abbr>: nasce em meio eletrônico;
- <abbr title="Representação digital obtida da conversão de documento não digital">documento digitalizado</abbr>: resulta da conversão de um documento não digital;
- **processo administrativo eletrônico:** processo em que os atos processuais são registrados e disponibilizados em meio eletrônico.

A diferença entre <abbr title="Documento criado originariamente em meio eletrônico">nato-digital</abbr> e <abbr title="Representação digital obtida da conversão de documento não digital">digitalizado</abbr> é de **origem**, não de aparência na tela.

### 3.2 Meio eletrônico como regra, com exceções

Nos processos abrangidos, os atos devem ser praticados eletronicamente. O meio não eletrônico pode ser utilizado quando o procedimento eletrônico for inviável ou quando a indisponibilidade do meio eletrônico puder causar dano relevante à celeridade do processo. Depois, o conteúdo precisa ser incorporado adequadamente ao processo eletrônico.

Portanto, “processo eletrônico” não significa que uma pane paralisa necessariamente qualquer ato possível; o próprio regime prevê solução excepcional para preservar o andamento.

### 3.3 Recebimento, recibo e tempestividade

O ato eletrônico considera-se realizado no **dia e na hora do recebimento pelo sistema**, que deve fornecer recibo eletrônico de protocolo.

Sem regra especial em sentido diverso, é tempestivo o ato recebido até **23h59 do último dia do prazo**, considerado o horário oficial de Brasília. A indisponibilidade técnica pode produzir a prorrogação prevista no decreto.

Note a lógica: o marco relevante é o **recebimento pelo sistema**, não o momento em que um servidor abre ou lê o documento.

### 3.4 Original, cópia e digitalização

Um <abbr title="Documento criado originariamente em meio eletrônico">documento nato-digital</abbr>, quando assinado conforme a norma aplicável, pode ter valor de original. Já o simples envio eletrônico de um <abbr title="Representação digital obtida da conversão de documento não digital">documento digitalizado</abbr> pelo interessado **não o transforma automaticamente em original**.

Digitalizar é converter suporte; não é, por si só, autenticar, assinar ou sanar defeito jurídico.

## 4. O <abbr title="Sistema Eletrônico de Informações">SEI</abbr>: o sistema dentro do ecossistema

O <abbr title="Sistema Eletrônico de Informações">SEI</abbr> foi desenvolvido pelo <abbr title="Tribunal Regional Federal da 4ª Região">TRF4</abbr> e é solução oficial do Governo Federal para produção e gestão de documentos e processos administrativos eletrônicos.

Ele permite, entre outras funções:

- iniciar processos;
- produzir documentos internos;
- incluir documentos externos;
- assinar documentos;
- tramitar processos entre unidades;
- controlar acesso;
- acompanhar, pesquisar e consultar o histórico das movimentações.

Em 2026, a linha <abbr title="Sistema Eletrônico de Informações">SEI</abbr> 5 já integrava o ambiente oficial do <abbr title="Processo Eletrônico Nacional">PEN</abbr>, e a versão 5.0.4 estava disponível desde 29 de abril de 2026. Esse dado temporal é menos importante que a regra seguinte:

> **Versão e configuração local não viram regra universal.**

Órgãos podem diferir em módulos, perfis, permissões, tipos de processo, unidades e normas internas. Em prova, desconfie de afirmações que transformem uma configuração local em característica necessária de todo <abbr title="Sistema Eletrônico de Informações">SEI</abbr>.

## 5. Como um processo funciona dentro do <abbr title="Sistema Eletrônico de Informações">SEI</abbr>

### 5.1 Processo, documentos e metadados

O processo reúne documentos e atos relacionados a determinada matéria. Ao iniciá-lo, seleciona-se o tipo de processo e registram-se <abbr title="Dados usados para identificar, descrever e organizar outro dado ou documento">metadados</abbr> aplicáveis, como interessados e nível de acesso.

No <abbr title="Sistema Eletrônico de Informações">SEI</abbr>, a distinção entre documento **interno** e **externo** depende de onde ele foi produzido:

| Tipo | Origem |
| --- | --- |
| interno | produzido no editor do <abbr title="Sistema Eletrônico de Informações">SEI</abbr> |
| externo | produzido ou recebido fora do editor e depois incluído nos autos |

Um documento externo pode ser <abbr title="Documento criado originariamente em meio eletrônico">nato-digital</abbr> ou <abbr title="Representação digital obtida da conversão de documento não digital">digitalizado</abbr>. Ao incluí-lo, registram-se os dados e o nível de acesso adequados.

Assinar eletronicamente é uma operação diferente de classificar acesso. Uma assinatura não corrige incompetência, ilegalidade, falta de fundamento para restrição ou outro defeito do ato.

### 5.2 Usuário interno e usuário externo

O **usuário interno** atua de acordo com a unidade, o perfil e as permissões que recebeu. O **usuário externo** recebe funções delimitadas, como consultar conteúdo liberado ou assinar documento disponibilizado.

O cadastro como usuário externo não converte a pessoa em usuário interno e não lhe dá acesso irrestrito ao sistema.

## 6. Tramitar não é atribuir; concluir não é arquivar

Aqui está um dos pontos mais importantes do capítulo: operações parecidas na tela podem produzir efeitos completamente diferentes.

### 6.1 Atribuir

**Atribuir** distribui o trabalho a determinado usuário da unidade. É uma ferramenta de organização interna.

A atribuição não:

- cria propriedade exclusiva sobre o processo;
- transfere competência jurídica;
- impede automaticamente outros usuários autorizados da unidade de atuar.

### 6.2 Enviar

**Enviar processo** efetivamente tramita os autos para uma ou mais unidades.

Se o fluxo permitir, o processo pode permanecer aberto na origem. Sem essa manutenção, o envio normalmente encerra a atuação local da unidade de origem, mas **não conclui o processo nas unidades destinatárias**.

Esse contraste é decisivo:

> **atribuir = distribuir trabalho dentro da unidade; enviar = movimentar o processo entre unidades.**

### 6.3 Concluir e reabrir

**Concluir na unidade** significa que não existe providência local pendente naquele momento.

Concluir não significa:

- eliminar documentos;
- arquivar definitivamente;
- encerrar automaticamente o processo em todas as unidades;
- impedir pesquisa futura.

Se surgir nova providência, a unidade pode **reabrir** o processo. Se a necessidade for apenas consultar os autos, a reabertura não é necessária.

## 7. Acesso: o sistema aplica a restrição, mas não cria a lei

O <abbr title="Sistema Eletrônico de Informações">SEI</abbr> possui níveis operacionais de acesso. Eles organizam quem pode ver determinado conteúdo, mas não inventam o fundamento jurídico da proteção.

| Nível | Efeito operacional geral |
| --- | --- |
| público | não há restrição jurídica cadastrada no sistema |
| restrito | o acesso é limitado conforme unidades e hipótese jurídica indicada |
| sigiloso | o acesso depende de credencial específica e configuração compatível |

Duas distinções evitam erros frequentes.

Primeiro: **público no <abbr title="Sistema Eletrônico de Informações">SEI</abbr> não significa automaticamente publicado na internet**. O nível trata do controle de acesso no sistema.

Segundo: o nível sigiloso do <abbr title="Sistema Eletrônico de Informações">SEI</abbr> não se confunde automaticamente com os graus reservado, secreto e ultrassecreto da <abbr title="Lei de Acesso à Informação">LAI</abbr>. Segundo a orientação federal vigente, documentos formalmente classificados nesses graus da <abbr title="Lei de Acesso à Informação">LAI</abbr> não devem tramitar pelo <abbr title="Sistema Eletrônico de Informações">SEI</abbr>.

### 7.1 Acesso externo

O acesso externo pode liberar conteúdo delimitado por prazo e condições definidos. Essa liberação não:

- transforma usuário externo em interno;
- libera automaticamente todo o processo;
- elimina a base jurídica de eventual restrição.

## 8. Recursos que organizam o trabalho sem tramitar o processo

A banca costuma confundir recursos de **organização e monitoramento** com atos que realmente movimentam ou decidem o processo.

- **acompanhamento especial:** facilita monitorar processos; não os tramita;
- **anotação:** registra observação operacional da unidade; não acompanha automaticamente o processo após a tramitação;
- **comentário:** serve de apoio; não substitui documento formal exigido;
- **ciência:** registra conhecimento; não é decisão nem assinatura;
- **retorno programado:** controla expectativa de devolução; não devolve o processo sozinho;
- **bloco de assinatura:** disponibiliza documentos para assinatura; não envia o processo inteiro;
- **bloco interno ou de reunião:** organiza processos; não altera, por si só, tramitação ou nível de acesso.

A pergunta de controle é simples: **o recurso apenas organiza/monitora ou pratica um ato processual?**

## 9. Relacionar, anexar e sobrestar

Essas três operações mexem com a situação do processo, mas de modos distintos:

- **relacionar:** cria vínculo referencial e preserva a autonomia dos processos;
- **anexar:** estabelece integração processual mais forte entre processos;
- **sobrestar:** suspende o andamento por motivo e determinação formal.

Logo, relacionar não equivale a anexar, e sobrestar não equivale a concluir, eliminar ou arquivar.

## 10. Tramita GOV.BR: comunicação entre sistemas diferentes

O Tramita GOV.BR integra o <abbr title="Processo Eletrônico Nacional">PEN</abbr> e realiza a tramitação externa, por expedição, de processos administrativos eletrônicos e documentos avulsos entre <abbr title="Sistemas de Processo Eletrônico">SPEs</abbr>.

O ponto conceitual é a <abbr title="Capacidade de sistemas diferentes trocarem e utilizarem informações de forma compatível">interoperabilidade</abbr>: instituições não precisam usar o mesmo software; seus sistemas precisam conseguir comunicar-se segundo o padrão exigido pela plataforma.

Por isso, o Tramita GOV.BR **não exige que todos usem o <abbr title="Sistema Eletrônico de Informações">SEI</abbr>**. A própria solução conecta diferentes <abbr title="Sistemas de Processo Eletrônico">SPEs</abbr>.

“Barramento de Serviços do <abbr title="Processo Eletrônico Nacional">PEN</abbr>” é denominação histórica da solução.

No âmbito federal disciplinado pela Portaria <abbr title="Secretaria de Gestão e Inovação">SEGES</abbr>/<abbr title="Ministério da Gestão e da Inovação em Serviços Públicos">MGI</abbr> nº 1.363/2025, o Tramita GOV.BR é o instrumento de comunicação externa entre sistemas de processo eletrônico da administração pública federal direta, autárquica e fundacional, sem impedir adesões de outras instituições conforme as regras aplicáveis.

## 11. Protocolo GOV.BR, Protocolo Integrado e <abbr title="Número Único de Protocolo">NUP</abbr>

Esses três elementos podem aparecer juntos, mas respondem a perguntas diferentes.

### 11.1 Protocolo GOV.BR: entrada

É um canal de atendimento para envio eletrônico de documentos, solicitações e requerimentos a órgãos e entidades públicos participantes. Pense nele como a **porta de entrada externa**.

Ele não é a plataforma usada para expedição de processos entre dois <abbr title="Sistemas de Processo Eletrônico">SPEs</abbr>; essa função é do Tramita GOV.BR.

### 11.2 Protocolo Integrado: consulta

O Protocolo Integrado reúne e apresenta dados e histórico de tramitação informados pelos sistemas participantes. Isso permite acompanhar o andamento, mas **não significa acesso automático à íntegra de qualquer processo**.

### 11.3 <abbr title="Número Único de Protocolo">NUP</abbr>: identificação

O <abbr title="Número Único de Protocolo">NUP</abbr> é a numeração padronizada atribuída a processo ou documento avulso no contexto previsto pelas normas aplicáveis.

Sua função é identificar. O <abbr title="Número Único de Protocolo">NUP</abbr> não:

- assina documentos;
- tramita processos;
- define nível de acesso;
- substitui classificação documental.

Para este recorte, compreender a função do <abbr title="Número Único de Protocolo">NUP</abbr> é mais importante que decorar a composição de seus blocos numéricos.

## 12. Processo eletrônico continua sendo documento público sujeito à gestão

Digitalizar o fluxo não elimina a gestão documental. Documentos e processos digitais continuam sujeitos, conforme o regime aplicável, a classificação, temporalidade, destinação e preservação.

O <abbr title="Sistema Eletrônico de Informações">SEI</abbr> apoia a gestão processual, mas sua simples adoção **não resolve automaticamente toda a preservação arquivística de longo prazo**.

Esse limite evita uma conclusão errada frequente: informatizar o processo não significa que todos os problemas de arquivo, conservação e destinação desapareceram.

Requisitos detalhados de <abbr title="Sistema Informatizado de Gestão Arquivística de Documentos">SIGAD</abbr>, <abbr title="Modelo de Requisitos para Sistemas Informatizados de Gestão Arquivística de Documentos">e-ARQ Brasil</abbr> e repositórios arquivísticos pertencem a aprofundamento específico; aqui basta compreender a necessidade de gestão documental contínua.

## 13. Como resolver questões sem decorar telas

Diante de uma questão, siga esta ordem mental:

1. identifique se ela trata do <abbr title="Processo Eletrônico Nacional">PEN</abbr>, do <abbr title="Sistema Eletrônico de Informações">SEI</abbr> ou de outra solução do ecossistema;
2. determine a função envolvida: **entrada, gestão, expedição, consulta ou identificação**;
3. em operação do <abbr title="Sistema Eletrônico de Informações">SEI</abbr>, pergunte qual efeito jurídico-operacional realmente ocorre: distribuir trabalho, tramitar, controlar acesso, registrar conhecimento ou apenas organizar;
4. diferencie conclusão **na unidade** de encerramento global do processo;
5. em tema de acesso, separe a configuração do sistema do fundamento jurídico da restrição;
6. rejeite alternativas que transformem uma versão, um módulo ou uma configuração local em regra universal.

Se você consegue explicar por que **atribuir não é enviar**, por que **concluir não é arquivar**, por que **público não é internet** e por que **Tramita GOV.BR não exige <abbr title="Sistema Eletrônico de Informações">SEI</abbr> nas duas pontas**, já domina as distinções que sustentam o restante do assunto.
