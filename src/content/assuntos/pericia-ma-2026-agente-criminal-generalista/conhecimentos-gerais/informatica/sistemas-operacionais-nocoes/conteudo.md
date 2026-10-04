---
schemaVersion: 1
title: "Noções de sistemas operacionais"
description: "Funções do sistema operacional, execução de programas, memória, arquivos, permissões e interfaces, com exemplos de Windows e Linux."
order: 290
storageId: per-u029
---

# Noções de sistemas operacionais

Ana abre um editor, altera um relatório e o salva em uma pasta. Enquanto isso, outro programa toca áudio. Por que os dois conseguem trabalhar? Quem decide como usar o processador e a memória? Por que um colega consegue ler o relatório, mas recebe uma negativa ao tentar alterá-lo?

O **sistema operacional** coordena os recursos do computador e oferece serviços aos programas. O editor realiza a tarefa de escrever; o sistema permite executar o editor, acessar dispositivos, usar memória e guardar arquivos, respeitando regras de acesso. Essa separação explica o núcleo do assunto.

O edital pede **noções de sistemas operacionais**, sem enumerar Windows, Linux ou versões. Aqui, essas plataformas fornecem exemplos dos conceitos. Um comportamento de menu ou teclado deve ser lido no ambiente informado pela questão.

## 1. Quem realiza a tarefa e quem administra os recursos

**Hardware** são os componentes físicos: processador, memória, unidade de armazenamento, teclado e impressora. **Software** são os programas e dados usados pelo computador. Dentro do software, distinguimos:

- **software de sistema:** sustenta o funcionamento do computador; o sistema operacional é seu exemplo central;
- **software de aplicação:** realiza tarefas do usuário, como editar textos ou navegar na Internet.

O sistema operacional administra a execução dos programas, o uso da memória, arquivos, dispositivos e acessos. Ele também fornece serviços comuns: o editor não precisa implementar sozinho todos os mecanismos de leitura de armazenamento ou comunicação com a impressora.

O **núcleo**, também chamado <abbr title="Núcleo do sistema operacional, responsável por funções centrais de gerenciamento">kernel</abbr>, é a parte central do sistema. A interface visível e os aplicativos de gerenciamento não equivalem ao núcleo nem ao sistema inteiro.

Um **driver de dispositivo** é um componente de software que participa da comunicação entre o sistema e um dispositivo. Na impressão, o aplicativo solicita o serviço, o sistema e seus componentes encaminham a operação, e o equipamento a executa. Essa sequência é simplificada: podem participar vários drivers, e nem todos se comunicam diretamente com o hardware.

Já <abbr title="Software incorporado ao equipamento para controlar funções próprias">firmware</abbr> é software incorporado ao equipamento, usado em seu funcionamento básico. Portanto, não é peça física nem sinônimo de aplicativo de escritório.

| Na tarefa de Ana | Papel principal |
|---|---|
| Editar o texto | Aplicativo editor |
| Coordenar processador, memória e dispositivos | Sistema operacional |
| Comunicar-se com um dispositivo | Sistema e driver apropriado |
| Executar operações físicas | Hardware |
| Guardar o relatório | Arquivo no armazenamento |

## 2. Abrir um programa cria uma execução

O **programa** é um conjunto de instruções e recursos. Um **processo** é uma instância desse programa em execução, com recursos administrados pelo sistema, como memória e contexto de acesso. Um programa pode originar vários processos; processo e arquivo executável não são o mesmo objeto.

No cenário inicial, instalar o editor o prepara para uso. Executá-lo inicia trabalho do programa. Desinstalá-lo remove componentes pelo mecanismo próprio. **Encerrar uma execução não significa desinstalar o programa nem apagar o relatório salvo.** Também não garante preservar alterações ainda não salvas.

Uma janela é um meio de interação. Um processo pode trabalhar **em segundo plano**, sem janela visível. Minimizar só muda a apresentação; fechar uma janela pode encerrar a execução associada, mas não garante encerrar todos os processos do aplicativo.

### 2.1 Multitarefa: compartilhar tempo não é ter recursos ilimitados

**Multitarefa** permite manter várias tarefas em andamento. O sistema distribui tempo de processamento entre as atividades que precisam dele. Em um único núcleo de processamento, a alternância rápida permite progresso de várias tarefas; em vários núcleos, também pode haver execução efetivamente paralela.

Um processo pode conter **linhas de execução**, chamadas <abbr title="Linhas de execução dentro de um processo">threads</abbr>. Elas compartilham recursos do processo. No Windows, o escalonamento — escolha de qual atividade recebe tempo de processamento — atua sobre essas linhas; dizer que o sistema administra processos não significa que cada processo execute uma única atividade indivisível.

Se um aplicativo exige muito processamento, os demais podem ficar lentos. Isso revela disputa por recursos, não ausência de multitarefa. Tampouco ter duas janelas abertas exige dois processadores físicos.

## 3. Memória de trabalho e arquivo salvo são coisas diferentes

A memória principal, usualmente <abbr title="Random Access Memory, memória de acesso aleatório usada no trabalho corrente">RAM</abbr>, mantém código e dados usados na execução. Essa memória é volátil: seu conteúdo não se conserva apenas porque o computador foi desligado.

O armazenamento conserva arquivos além da execução corrente. Durante a edição, Ana pode ter uma versão salva e alterações somente na memória do aplicativo. **Salvar registra o trabalho no armazenamento; minimizar, bloquear a sessão ou apenas trocar de janela não substitui essa operação.** Salvamento automático e recuperação dependem do aplicativo e de sua configuração.

### 3.1 O que significa memória virtual

**Memória virtual** é um mecanismo que apresenta aos processos espaços de endereços e os relaciona à memória física. Ele ajuda a proteger os dados de um processo contra acessos indevidos de outro e permite compartilhamento controlado.

Parte dos dados pode ser transferida entre memória e armazenamento conforme a necessidade. A **paginação** trabalha com blocos chamados páginas; no Windows, pode usar um arquivo de paginação. No Linux, a área de troca, ou <abbr title="Área de armazenamento usada para transferir temporariamente páginas de memória">swap</abbr>, pode apoiar esse mecanismo.

Memória virtual **não é apenas outro nome para o arquivo de paginação**, não instala memória física e não salva automaticamente o relatório como documento. Usar armazenamento para apoiar a memória não o transforma em memória principal; transferências frequentes podem reduzir o desempenho.

| Situação | Distinção necessária |
|---|---|
| Editor está instalado, mas fechado | Programa armazenado; não há obrigação de processo ativo |
| Editor está em execução | Processo usa recursos administrados pelo sistema |
| Texto foi alterado, mas não salvo | Alterações podem existir apenas no trabalho corrente |
| Dados foram transferidos para paginação/troca | Apoio à memória; não equivale a salvar o documento |

## 4. O sistema organiza arquivos e localizações

Um **arquivo** reúne dados identificados por nome e localização. Uma **pasta**, ou diretório, organiza arquivos e outros diretórios. O **sistema de arquivos** estabelece como os dados e suas informações são organizados no armazenamento; não é o aplicativo que mostra as pastas na tela.

O **caminho** identifica uma localização na hierarquia. Dois arquivos podem ter o mesmo nome em pastas diferentes. Exemplos hipotéticos:

```text
Windows: C:\Users\Ana\Documents\relatorio.txt
Linux:   /home/ana/documentos/relatorio.txt
```

No primeiro, `C:` identifica um volume, unidade lógica de armazenamento, e `C:\` é sua raiz. A barra invertida separa níveis. Letras diferentes podem representar volumes no mesmo disco físico.

No segundo, `/` inicia a hierarquia e também separa seus níveis. Dispositivos podem ser integrados a essa árvore em pontos de **montagem**, locais em que seu conteúdo se torna acessível. Não se substitui `/` por uma letra de unidade do Windows.

Um **caminho absoluto** fornece uma localização a partir da raiz pertinente, como os exemplos acima. Um **caminho relativo** depende do diretório tomado como ponto de partida. Se a pasta corrente é `/home/ana`, `documentos/relatorio.txt` aponta para o arquivo do exemplo; a mesma escrita pode apontar para outro local se mudar a pasta corrente.

### 4.1 Copiar, mover e criar referência

Depois de uma operação concluída com sucesso:

| Operação | Resultado |
|---|---|
| Copiar | O original permanece e há outro arquivo no destino |
| Mover | O item deixa o local anterior e passa ao destino |
| Criar atalho do Windows | Surge uma referência ao alvo, sem copiar integralmente seu conteúdo |

A **área de transferência** mantém dados ou referências preparados por copiar e recortar para posterior colagem. No gerenciador de arquivos, copiar ainda não cria uma cópia em uma pasta de destino; recortar prepara a movimentação, concluída pela colagem bem-sucedida. Permissões, espaço e conflitos de nome podem impedir a operação.

Excluir apenas o atalho do Windows não apaga seu alvo. Apagar o alvo pode impedir seu funcionamento. A área de trabalho pode mostrar arquivos reais e referências: **arrastar algo até ela não permite concluir, por si só, que surgiu um atalho**.

### 4.2 Nome, formato e apresentação

Em `relatorio.txt`, `.txt` é a **extensão**, parte do nome que ajuda a identificar o tipo esperado e o aplicativo associado. **Formato** é a organização interna dos dados. Renomear a extensão não reescreve os dados em outro formato; mudar o aplicativo padrão altera a escolha de abertura, não converte o arquivo.

No gerenciador Arquivos do projeto <abbr title="Projeto de ambiente gráfico e aplicativos">GNOME</abbr>, nomes iniciados por ponto, como `.config`, ficam ocultos na visualização comum. O item permanece na pasta. **Ocultar muda sua apresentação; não o apaga, criptografa nem concede ou retira permissão de acesso.**

## 5. Identidade e permissão respondem a perguntas diferentes

Uma conta identifica o usuário. **Autenticação** verifica a identidade alegada; **autorização** determina as operações permitidas. Entrar corretamente na conta não garante poder ler ou alterar qualquer arquivo.

**Permissões** são regras de acesso: ler, gravar, executar ou outras operações podem ser permitidas ou negadas conforme usuário, grupo e objeto. No cenário de Ana, o colega pode receber leitura sem escrita. Conseguir abrir um relatório, portanto, não prova poder modificá-lo no mesmo local.

No Windows, arquivos e diretórios podem ter regras de acesso associadas a identidades. O sistema de arquivos <abbr title="New Technology File System, sistema de arquivos com recursos de controle de acesso">NTFS</abbr> admite esse controle. **Herança** é a transmissão de regras da pasta aos objetos filhos conforme as configurações; não significa que todo item tenha acesso idêntico ao de qualquer outro.

### 5.1 A leitura básica das permissões Linux

No modelo básico, as permissões distinguem **proprietário, grupo e outros usuários**. Cada classe pode ter leitura, escrita e execução, representadas por `r`, `w` e `x`; `-` indica ausência daquela permissão. Os símbolos preservam sua notação técnica.

Para um arquivo regular, leitura permite ler dados, escrita permite alterá-los e execução permite executá-lo quando ele é um programa apropriado. Em diretórios, as funções diferem: leitura lista nomes; execução permite atravessar/acessar a hierarquia; escrita participa da criação e remoção de entradas, em conjunto com as demais condições necessárias.

**Exemplo hipotético, só pelo modelo básico:** `rw-r-----` atribui leitura e escrita ao proprietário, leitura ao grupo e nenhuma dessas permissões aos demais. Considere a classe aplicável à identidade, não some automaticamente as três classes. Regras adicionais e privilégios podem modificar o acesso efetivo.

Permissão do diretório e permissão do arquivo são distintas. Listar o nome não basta para concluir que o conteúdo pode ser lido. Da mesma forma, a exclusão de um arquivo não depende apenas de sua permissão de escrita: a pasta que contém a entrada também importa.

Uma conta administrativa permite operações protegidas conforme o sistema e suas regras. **Usar linha de comando não concede automaticamente esses privilégios.** Proteção contra ameaças e estratégias de segurança são aprofundadas no assunto de segurança da informação; aqui, o ponto é compreender o controle exercido pelo sistema operacional.

## 6. Interfaces: caminhos diferentes para solicitar operações

**Interface gráfica** usa janelas, ícones, menus e botões. **Linha de comando** recebe instruções textuais. Ambas podem solicitar serviços do sistema e coexistir no mesmo computador; a primeira não é exclusividade do Windows nem a segunda exclusividade do Linux.

No Windows, o **Explorador de Arquivos** navega e opera sobre pastas e arquivos. O **Gerenciador de Tarefas** permite examinar atividades e recursos; o **Prompt de Comando** interpreta instruções textuais. São ferramentas com finalidades diferentes.

Em sistemas Linux, o ambiente gráfico e o gerenciador de arquivos variam. Um **terminal** pode apresentar um <abbr title="Programa que interpreta comandos textuais e inicia as operações solicitadas">shell</abbr>, interpretador de comandos. A janela do terminal, o interpretador e o núcleo são componentes distintos.

Alguns exemplos do Windows, preservado o contexto:

| Combinação | Função |
|---|---|
| `Win + E` | Abre o Explorador de Arquivos |
| `Ctrl + Shift + Esc` | Abre o Gerenciador de Tarefas |
| `Alt + Tab` | Alterna entre janelas/aplicativos abertos |
| `Win + L` | Bloqueia o acesso à sessão; não equivale a sair da conta |

Nos códigos acima, `Win` é a tecla com o logotipo do Windows. Não transporte combinações ou menus automaticamente para outro aplicativo, idioma ou ambiente gráfico.

**Windows** é uma família de sistemas da Microsoft. **Linux**, em sentido estrito, é o núcleo; uma **distribuição**, como Ubuntu, reúne esse núcleo e outros componentes para fornecer um sistema utilizável. Por isso, dois computadores Linux podem oferecer interfaces e ferramentas diferentes sem deixar de usar o mesmo tipo de núcleo.

## 7. Reconstrua a operação antes de marcar a resposta

No caso inicial, o editor realiza a tarefa; seus processos usam recursos coordenados pelo sistema; a memória mantém trabalho corrente; salvar registra o relatório; o sistema de arquivos organiza sua localização; permissões determinam o que o colega pode fazer.

Ao resolver um caso, identifique **objeto → operação → recurso ou acesso envolvido → condições → consequência**. Em detalhes de interface, acrescente plataforma, aplicativo e versão informados. Essa sequência evita confundir minimizar com encerrar, processo com instalação, ocultação com proteção e memória virtual com documento salvo.
