---
schemaVersion: 1
title: "Computação em nuvem, armazenamento e colaboração"
description: Conceitos básicos de computação em nuvem e uso de serviços de armazenamento, sincronização, compartilhamento e colaboração.
order: 27
storageId: pc-u027
---

# Computação em nuvem, armazenamento e colaboração

Você abre um documento no notebook, continua no celular e depois convida outra pessoa para editá-lo. **Onde está o arquivo, quem executa o serviço e quem pode alterá-lo?** Essas três perguntas organizam o item do edital.

<abbr title="Computação sob demanda por recursos remotos compartilhados">Cloud computing</abbr>, ou **computação em nuvem**, é um modelo em que recursos de computação são oferecidos pela rede e podem ser provisionados conforme a necessidade. Para prova, não basta decorar “arquivo na Internet”: a nuvem pode oferecer armazenamento, aplicações, capacidade de processamento e plataformas inteiras.

O raciocínio central é:

> **recurso → serviço → identidade/permissão → sincronização → colaboração → recuperação**.

## 1. O que torna um serviço “em nuvem”

A definição de referência do National Institute of Standards and Technology descreve cinco características que ajudam a reconhecer o modelo:

1. **autosserviço sob demanda:** o usuário ou sistema obtém recursos sem depender de atendimento manual a cada solicitação;
2. **amplo acesso pela rede:** o serviço é acessível por mecanismos padronizados a diferentes tipos de cliente;
3. **compartilhamento de recursos:** a infraestrutura do provedor atende múltiplos consumidores com alocação dinâmica;
4. **elasticidade rápida:** capacidade pode crescer ou diminuir conforme a demanda;
5. **serviço mensurado:** o uso pode ser monitorado e medido.

Essas características explicam por que “usar um servidor remoto” não é, isoladamente, definição suficiente de nuvem.

### 1.1 Três modelos de serviço

A diferença está em **quanto o provedor entrega pronto** e quanto permanece sob responsabilidade do consumidor.

| Modelo | O consumidor recebe | Exemplo conceitual |
|---|---|---|
| <abbr title="Software as a Service">SaaS</abbr> | aplicação pronta para uso | editor, correio ou armazenamento acessado como serviço |
| <abbr title="Platform as a Service">PaaS</abbr> | plataforma para desenvolver e executar aplicações | ambiente gerenciado de desenvolvimento/execução |
| <abbr title="Infrastructure as a Service">IaaS</abbr> | processamento, rede e armazenamento básicos | máquinas virtuais e recursos de infraestrutura |

No <abbr title="Software as a Service">SaaS</abbr>, o usuário normalmente não administra sistema operacional ou servidor. No <abbr title="Infrastructure as a Service">IaaS</abbr>, há mais controle sobre sistemas e aplicações, embora a infraestrutura física permaneça com o provedor. O <abbr title="Platform as a Service">PaaS</abbr> fica entre esses extremos.

## 2. Armazenar, sincronizar, compartilhar e fazer backup são ações diferentes

Imagine uma pasta sincronizada com a nuvem. Um arquivo é apagado no computador e a exclusão aparece também no serviço remoto. Isso não significa que a nuvem falhou: **a sincronização fez exatamente o que deveria fazer**.

- **armazenamento em nuvem:** mantém dados em infraestrutura do provedor;
- **sincronização:** mantém alterações coerentes entre locais ou dispositivos;
- **compartilhamento:** concede acesso a outras identidades segundo permissões;
- **versionamento:** preserva estados anteriores de um item, dentro das regras do serviço;
- **backup:** mantém cópia recuperável com estratégia própria de retenção e restauração.

**Sincronização não é automaticamente backup.** Exclusão, corrupção ou criptografia indesejada pode ser propagada. Histórico de versões e lixeira ajudam, mas têm limites de retenção e política.

## 3. Arquivo na nuvem não significa arquivo público

A localização do dado e a autorização de acesso são critérios diferentes. Um documento pode estar em infraestrutura de nuvem e continuar restrito a uma única pessoa ou a um grupo institucional.

Os papéis concretos variam entre serviços, mas a lógica costuma ser:

| Papel | Capacidade típica |
|---|---|
| leitor | consultar |
| comentador | consultar e comentar |
| editor | alterar conteúdo |
| proprietário/administrador | controlar conteúdo e/ou acesso, conforme o serviço |

Aplique o **menor privilégio**: conceda apenas a capacidade necessária à tarefa.

### Link não é permissão

Receber o endereço de um arquivo não garante acesso. O serviço ainda verifica se aquela identidade está autorizada, salvo quando o compartilhamento foi configurado para um público mais amplo.

Por isso:

> **link recebido + permissão ausente = acesso negado**.

## 4. OneDrive: disponibilidade local e nuvem são estados diferentes

No OneDrive, **Arquivos Sob Demanda** permite visualizar itens no explorador sem manter todos integralmente no disco.

| Estado | Consequência prática |
|---|---|
| somente online | aparece no dispositivo, mas o conteúdo é obtido pela rede quando necessário |
| disponível localmente | já foi baixado e pode ser aberto sem conexão |
| sempre manter neste dispositivo | permanece baixado e ocupa espaço local |

**Liberar espaço** remove a cópia integral local e mantém o item na nuvem. **Excluir** é outra ação e pode ser sincronizada para os demais dispositivos.

Compartilhar arquivo ou pasta cria acesso conforme as permissões definidas. O mesmo conteúdo pode ser acessado em dispositivos diferentes porque o serviço remoto mantém a versão sincronizada e verifica a identidade de quem tenta abri-lo.

## 5. Google Drive: streaming, espelhamento e colaboração

No Google Drive para computador, dois modelos ajudam a entender a relação entre nuvem e disco local:

| Modelo | Onde o conteúdo fica principalmente | Uso de espaço local |
|---|---|---|
| <abbr title="Acesso a arquivos mantidos principalmente na nuvem, baixados conforme necessário">streaming</abbr> | nuvem | menor; itens são obtidos conforme a necessidade |
| espelhamento | nuvem e cópia local | maior; há cópia local sincronizada |

Espelhamento **não cria, por si só, backup independente**. Uma exclusão sincronizada pode alcançar os dois lados.

### 5.1 Meu Drive × drive compartilhado

Em **Meu Drive**, o conteúdo normalmente está associado à conta proprietária. Em um **drive compartilhado**, o conteúdo pertence ao espaço da equipe/organização, o que favorece continuidade institucional quando uma pessoa deixa o grupo.

A distinção é de governança, não apenas de interface: pergunte **quem controla o conteúdo depois que o usuário original sai**.

### 5.2 Colaboração em tempo real

Documentos, planilhas e apresentações em serviços colaborativos podem permitir que várias pessoas trabalhem sobre um mesmo item, com alterações, comentários e histórico conforme permissões e recursos disponíveis.

Isso reduz o problema de circular várias cópias divergentes por e-mail. Ainda assim, colaboração simultânea não dispensa definição de versão válida, responsável e público autorizado.

## 6. Colaboração síncrona e assíncrona

**Síncrona** é a interação no mesmo período: reunião, chamada ou conversa em tempo real. **Assíncrona** permite que cada participante responda em momento diferente: comentário em documento, postagem em canal ou atualização registrada.

Nenhuma é “melhor” em absoluto:

- use sincronia quando a interação simultânea reduz ciclos de decisão;
- use assincronia quando é importante preservar foco, permitir horários diferentes e manter registro consultável.

**Assíncrono não significa sem prazo. Síncrono não significa sem registro.**

## 7. Microsoft Teams e Google Meet no recorte de colaboração

O Microsoft Teams combina comunicação, reuniões e espaços persistentes de equipe. Para o item do edital, guarde a diferença entre **conversar** e **colaborar sobre conteúdo compartilhado**: arquivos exibidos no Teams continuam sujeitos ao armazenamento e às permissões do serviço associado.

O Google Meet oferece reuniões e apresentação de conteúdo. Ele pode ser usado em conjunto com Google Agenda e Google Drive, mas reunião, calendário e armazenamento são funções distintas.

Nos dois ambientes:

- um link de reunião pode estar sujeito a autenticação ou admissão;
- compartilhar tela não concede automaticamente permissão para editar o arquivo original;
- gravar ou transcrever, quando disponível, é diferente de registrar formalmente a decisão;
- recursos podem variar conforme conta, licença e política administrativa.

## 8. Disponibilidade local, continuidade e dependências

Serviço em nuvem não elimina dependências. Podem existir:

- conexão com a rede;
- autenticação na conta;
- cota de armazenamento;
- política institucional;
- licença do serviço;
- retenção e versionamento definidos pelo provedor ou administrador.

Quando a pessoa sabe que ficará sem conexão, deve preparar previamente os itens necessários para uso offline. “Está na nuvem” não significa “estará acessível sem rede”.

Para continuidade institucional, prefira espaços administrados pela organização a arquivos críticos presos apenas à conta pessoal de um colaborador.

## 9. Método de prova

Ao ler uma alternativa, faça cinco perguntas:

1. Ela fala de **armazenamento**, **sincronização**, **compartilhamento**, **colaboração** ou **backup**?
2. O arquivo está na nuvem, mas **quem tem permissão**?
3. A cópia local é apenas uma versão sincronizada ou é proteção independente?
4. O recurso é síncrono ou assíncrono, e isso realmente muda a conclusão?
5. A frase usa absolutos como “sempre público”, “qualquer link dá acesso” ou “sincronização é backup”? Esses absolutos costumam esconder a pegadinha.

O mapa final é: **nuvem entrega recursos pela rede; armazenamento guarda; sincronização propaga estados; permissão controla acesso; colaboração organiza trabalho sobre recursos compartilhados**.