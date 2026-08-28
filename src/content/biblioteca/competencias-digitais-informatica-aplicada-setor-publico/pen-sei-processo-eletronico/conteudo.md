---
schemaVersion: 1
title: "Processo Eletrônico Nacional e Sistema Eletrônico de Informações"
description: Infraestrutura do PEN, ecossistema de serviços, fundamentos e operações do SEI, interoperabilidade, protocolo e gestão documental.
order: 31
storageId: pen-sei-processo-eletronico
---

# Processo Eletrônico Nacional e Sistema Eletrônico de Informações

> **Corte de atualização:** 10 de agosto de 2026. O edital cobra **Processo Eletrônico Nacional (PEN)** e **Sistema Eletrônico de Informações (SEI)**. O foco é distinguir infraestrutura, sistema e serviços associados e compreender as operações essenciais do processo administrativo eletrônico, sem transformar o tópico em curso de administração do SEI ou de gestão arquivística.

## 1. Mapa do assunto

A distinção central é:

- **PEN:** infraestrutura pública que integra soluções, padrões e serviços de processo administrativo eletrônico;
- **SEI:** sistema de processo administrativo eletrônico, criado pelo TRF4 e integrante do ecossistema PEN.

> **PEN não é um software único e PEN não é sinônimo de SEI.**

No âmbito federal, a gestão do PEN compete à Secretaria de Gestão e Inovação do Ministério da Gestão e da Inovação em Serviços Públicos (MGI), por meio da **Diretoria de Transformação Digital em Processo Eletrônico e Sistemas de Gestão (DTGES)**, conforme a estrutura vigente em 2026.

O PEN foi formalizado em 2013. O Decreto nº 8.539/2015 é marco normativo posterior do processo administrativo eletrônico federal e **não criou o PEN**.

## 2. Ecossistema PEN: quem faz o quê

| Elemento | Função essencial |
| --- | --- |
| **PEN** | integra soluções e serviços de processo administrativo eletrônico |
| **SEI** | produz, instrui, assina, tramita e acompanha processos e documentos |
| **<abbr title="Programa Nacional de Processo Eletrônico">ProPEN</abbr>** | amplia a adoção das soluções do PEN por entes e instituições elegíveis |
| **Tramita GOV.BR** | realiza expedição de processos e documentos avulsos entre diferentes sistemas de processo eletrônico |
| **Protocolo GOV.BR** | recebe documentos, solicitações e requerimentos de pessoas físicas e jurídicas |
| **Protocolo Integrado** | permite consultar dados e histórico de tramitação informados pelos participantes |
| **<abbr title="Número Único de Protocolo">NUP</abbr>** | identifica processos e documentos avulsos por numeração padronizada |

Regra de prova:

- **entrada externa** → Protocolo GOV.BR;
- **gestão do processo** → SEI;
- **expedição entre sistemas** → Tramita GOV.BR;
- **consulta de tramitação** → Protocolo Integrado;
- **identificação padronizada** → NUP.

O **Tramita GOV.BR não exige que todos usem SEI**. Ele conecta diferentes sistemas de processo administrativo eletrônico (SPEs), desde que atendam à integração aplicável.

## 3. Decreto nº 8.539/2015: base federal

O Decreto nº 8.539/2015 disciplina o uso do meio eletrônico no processo administrativo da administração pública federal:

- direta;
- autárquica;
- fundacional.

Não generalize automaticamente esse decreto a todos os Poderes, Estados, Municípios, empresas estatais ou Tribunais de Contas.

### 3.1 Conceitos essenciais

| Conceito | Regra curta |
| --- | --- |
| **documento** | unidade de registro de informações, independentemente de formato ou suporte |
| **documento digital** | informação codificada e interpretável por sistema computacional |
| **nato-digital** | criado originariamente em meio eletrônico |
| **digitalizado** | representação digital obtida da conversão de documento não digital |
| **processo administrativo eletrônico** | processo cujos atos são registrados e disponibilizados eletronicamente |

### 3.2 Regra do meio eletrônico

Os atos processuais devem ser realizados eletronicamente, salvo quando:

- o procedimento eletrônico for inviável; ou
- a indisponibilidade do meio puder causar dano relevante à celeridade.

Nessas hipóteses, pode haver uso do meio não eletrônico, com posterior incorporação adequada ao processo.

### 3.3 Data, recibo e prazo

O ato eletrônico considera-se realizado no **dia e na hora do recebimento pelo sistema**, que deve fornecer recibo eletrônico de protocolo.

Sem regra especial em sentido diverso:

- é tempestivo o ato recebido até **23h59 do último dia**, no horário oficial de Brasília;
- indisponibilidade técnica do sistema pode provocar a prorrogação prevista no decreto.

Esses detalhes são apoio ao funcionamento do processo eletrônico, não o centro do assunto PEN/SEI.

### 3.4 Valor documental

- documento **nato-digital** corretamente assinado segundo a norma aplicável pode ser original;
- documento **digitalizado** enviado pelo interessado não se transforma automaticamente em original;
- autoria, integridade, acesso e proteção da informação continuam sujeitos às normas aplicáveis.

## 4. SEI: conceito e versão

O **Sistema Eletrônico de Informações (SEI)** foi desenvolvido pelo Tribunal Regional Federal da 4ª Região (TRF4). Ele permite, entre outras funções:

- iniciar processos;
- produzir ou incluir documentos;
- assinar documentos;
- tramitar processos entre unidades;
- controlar acesso;
- acompanhar, pesquisar e consultar histórico.

Em 2026, a linha **SEI 5** já integra o ambiente oficial do PEN; a versão 5.0.4 estava disponível desde 29 de abril de 2026. A versão concreta importa menos que a regra seguinte:

> **configuração local não é regra universal.**

Instalações podem variar quanto a módulos, perfis, permissões, tipos de processo, unidades e normas internas.

## 5. Processo e documentos no SEI

### 5.1 Processo

O processo reúne documentos e atos referentes a determinada matéria. O tipo de processo orienta metadados, classificação, acesso e controles associados.

### 5.2 Documento interno e externo

| Tipo | Origem |
| --- | --- |
| **interno** | produzido no editor do SEI |
| **externo** | produzido ou recebido fora do editor e incluído nos autos |

Documento externo pode ser nato-digital ou digitalizado. A inclusão deve registrar os metadados e o nível de acesso adequados.

Assinatura eletrônica é operação distinta da classificação do documento e **não corrige** incompetência, ilegalidade ou acesso inadequado.

### 5.3 Usuários

- **usuário interno:** atua conforme unidade, perfil e permissões;
- **usuário externo:** recebe funções delimitadas, como consulta de conteúdo liberado ou assinatura disponibilizada.

Usuário externo não se torna usuário interno pelo simples cadastro.

## 6. Operações essenciais do SEI

### 6.1 Iniciar e receber

Ao iniciar um processo, seleciona-se o tipo e registram-se os metadados aplicáveis, inclusive interessados e nível de acesso.

O recebimento em uma unidade registra a movimentação e permite rastrear quando e por quem o processo foi recebido.

### 6.2 Atribuir

**Atribuir** distribui o trabalho a determinado usuário da unidade.

Não significa:

- propriedade exclusiva do processo;
- transferência de competência jurídica;
- bloqueio automático dos demais usuários autorizados.

### 6.3 Enviar

**Enviar processo** tramita os autos para uma ou mais unidades.

O envio pode manter o processo aberto na origem, conforme opção e fluxo aplicável. Sem essa manutenção, o envio normalmente encerra o trabalho local da origem, mas não conclui o processo nas unidades destinatárias.

### 6.4 Concluir e reabrir

**Concluir na unidade** significa que não há providência local pendente.

Não significa:

- eliminar os autos;
- arquivar definitivamente;
- concluir automaticamente em todas as unidades;
- impedir pesquisa futura.

Se surgir nova providência, a unidade pode **reabrir** o processo quando a operação for necessária. Simples consulta não exige reabertura.

## 7. Níveis de acesso

| Nível | Efeito operacional geral |
| --- | --- |
| **público** | não possui restrição jurídica cadastrada no sistema |
| **restrito** | limita o acesso conforme unidades e hipótese legal indicada |
| **sigiloso** | depende de credencial específica e configuração compatível |

Pontos de prova:

- “público no SEI” **não significa** publicação irrestrita na internet;
- o SEI controla acesso, mas **não cria fundamento jurídico de sigilo**;
- restrição deve apoiar-se em hipótese legal;
- nível sigiloso do SEI não se confunde automaticamente com os graus reservado, secreto e ultrassecreto da <abbr title="Lei de Acesso à Informação">LAI</abbr>;
- a orientação federal vigente registra que documentos formalmente classificados nesses graus da LAI não devem tramitar pelo SEI.

### 7.1 Acesso externo

Acesso externo pode liberar conteúdo delimitado por prazo e condições definidas. Ele não:

- converte usuário externo em interno;
- libera automaticamente todo o processo;
- altera o fundamento jurídico do nível de acesso.

## 8. Recursos auxiliares: efeitos que a banca pode inverter

| Recurso | Efeito essencial |
| --- | --- |
| **acompanhamento especial** | facilita monitoramento; não tramita o processo |
| **anotação** | observação operacional da unidade; não acompanha a tramitação |
| **comentário** | observação auxiliar; não substitui documento formal necessário |
| **ciência** | registra conhecimento; não é decisão nem assinatura |
| **retorno programado** | monitora expectativa de devolução; não devolve automaticamente |
| **bloco de assinatura** | disponibiliza minutas para assinatura; não envia o processo inteiro |
| **bloco interno/reunião** | organiza processos; não altera, sozinho, tramitação ou acesso |

Esses recursos aparecem em prova principalmente pela confusão entre **organizar/monitorar** e **praticar ato processual**.

## 9. Relacionar, anexar e sobrestar

| Operação | Regra |
| --- | --- |
| **relacionar** | cria vínculo referencial, preservando processos autônomos |
| **anexar** | estabelece integração processual mais forte |
| **sobrestar** | suspende o andamento por motivo e determinação formal |

Não confunda relacionamento com anexação. Sobrestamento não elimina, conclui ou arquiva os autos.

## 10. Tramita GOV.BR e interoperabilidade

O **Tramita GOV.BR** é plataforma integrante do PEN destinada à tramitação externa, por expedição, de processos administrativos eletrônicos e documentos avulsos entre <abbr title="sistemas de processo eletrônico">SPEs</abbr>.

“Barramento de Serviços do PEN” é denominação histórica da solução.

No âmbito indicado pela Portaria SEGES/MGI nº 1.363/2025, seu uso é obrigatório para a administração pública federal direta, autárquica e fundacional. Outras instituições podem aderir conforme as regras aplicáveis.

A ideia central é:

> **interoperabilidade não exige sistema idêntico; exige integração compatível.**

## 11. Protocolo e NUP

### Protocolo GOV.BR

Canal de entrada para documentos, solicitações e requerimentos de pessoas físicas e jurídicas. Não é a plataforma usada para expedição entre dois SPEs.

### Protocolo Integrado

Permite consultar dados e histórico de tramitação fornecidos pelos sistemas participantes. Não equivale ao acesso automático à íntegra dos autos.

### NUP

É o padrão de identificação de processos e documentos avulsos. Para este edital, o essencial é saber que o NUP:

- identifica;
- não assina;
- não tramita;
- não define nível de acesso.

A memorização da composição exata dos blocos numéricos é detalhe secundário para este recorte.

## 12. Gestão documental: limite necessário

Processo eletrônico não elimina gestão documental. Documentos digitais continuam sujeitos, conforme o regime aplicável, a:

- classificação;
- temporalidade;
- destinação;
- preservação.

O SEI apoia gestão processual, mas sua adoção **não resolve automaticamente toda a preservação arquivística de longo prazo**.

Para este assunto, basta compreender essa ressalva. Requisitos detalhados de SIGAD, e-ARQ Brasil e repositórios arquivísticos pertencem a aprofundamento específico.

## 13. Quadro final de julgamento

| Afirmação | Juízo |
| --- | --- |
| PEN e SEI são sinônimos | errado |
| SEI integra o ecossistema PEN | correto |
| Tramita GOV.BR conecta SPEs diferentes | correto |
| Protocolo GOV.BR recebe demandas externas | correto |
| Protocolo Integrado dá acesso automático à íntegra | errado |
| NUP é sistema de tramitação | errado |
| atribuição cria propriedade exclusiva do processo | errado |
| concluir na unidade encerra o processo em todas | errado |
| público no SEI significa publicação irrestrita | errado |
| nível restrito exige fundamento jurídico | correto |
| acompanhamento especial tramita o processo | errado |
| bloco de assinatura envia o processo inteiro | errado |
| relacionar e anexar têm o mesmo efeito | errado |
| SEI dispensa gestão documental | errado |

## 14. Estratégia de resolução

1. Descubra se a questão trata de **PEN**, **SEI** ou serviço associado.
2. Classifique a função: **entrada**, **gestão**, **expedição**, **consulta** ou **identificação**.
3. Se for operação do SEI, pergunte o efeito real: tramita? altera acesso? apenas organiza? apenas registra?
4. Separe conclusão **na unidade** de encerramento global.
5. Em acesso, procure fundamento jurídico e permissões.
6. Não transforme uma configuração local ou detalhe de versão em regra universal.
