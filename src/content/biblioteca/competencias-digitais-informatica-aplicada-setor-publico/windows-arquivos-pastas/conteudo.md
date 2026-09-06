---
schemaVersion: 1
title: "Microsoft Windows: conceitos, interface, arquivos, pastas e programas"
description: Fundamentos do sistema operacional Microsoft Windows, com foco na interface do Windows 11, no Explorador de Arquivos, nas operações com arquivos e pastas e no gerenciamento básico de programas.
order: 20
storageId: windows-arquivos-pastas
---

## 1. O documento, o programa e o sistema

Fechar o Word apaga o relatório? Excluir seu ícone desinstala o programa? Para responder, separe **o que contém os dados, o que trabalha com eles e o que coordena o computador**.

Um **arquivo** é um conjunto de dados armazenado e identificado por um nome. O relatório é um arquivo; o Word é um **aplicativo**, programa que cria e edita documentos. O **Windows é o sistema operacional**: administra processador, memória, armazenamento, dispositivos e acesso dos usuários, permitindo que os programas funcionem. Programas também são armazenados em arquivos, mas não se confundem com os documentos produzidos.

Durante a edição, o aplicativo mantém dados de trabalho na memória. **Salvar** registra alterações no armazenamento; fechar uma janela não significa salvar nem excluir o arquivo. Conforme seus recursos e configurações, o programa pode perguntar o que fazer com alterações não salvas.

Uma **pasta**, também chamada diretório, organiza arquivos e outras pastas. Já um **atalho** é uma referência para chegar a um destino: não contém uma cópia integral do documento ou do aplicativo apontado. Excluir o atalho não exclui esse destino.

**Cenário hipotético:** Ana organiza um relatório, guarda uma versão em outra pasta e leva uma cópia em um dispositivo removível. Acompanhe o que muda em cada operação.

## 2. A tela organiza janelas, não o conteúdo dos arquivos

A **interface** reúne os elementos de interação com o sistema: janelas, menus, botões e ícones. A **área de trabalho** é sua superfície principal e pode exibir arquivos, pastas e atalhos. Nem todo ícone representa um atalho.

O **menu Iniciar** dá acesso a aplicativos, pesquisa, conta e opções de energia. Abre pela tecla com o logotipo do Windows, indicada aqui por `Win`, ou por `Ctrl + Esc`. Sua organização varia: o modelo de blocos dinâmicos do Windows 10 não deve ser atribuído ao Windows 11.

A **barra de tarefas** abre aplicativos fixados e alterna entre janelas, que podem aparecer agrupadas por aplicativo. **Fixado não significa em execução:** significa acesso mantido na barra. `Win + 1` abre ou alterna para o aplicativo na primeira posição correspondente. O botão direito pode mostrar documentos recentes e tarefas frequentes: são as **listas de atalhos**, ou <abbr title="Listas de documentos recentes e tarefas de um aplicativo">jump lists</abbr>.

Na região de notificações ficam indicadores como rede, som e relógio. No Windows 11, `Win + A` abre Configurações Rápidas; `Win + N`, notificações e calendário. `Win + I` abre o aplicativo Configurações, usado para ajustar o sistema, não para organizar diretamente as pastas.

### 2.1 Janela visível não é sinônimo de programa em execução

Um **processo** é uma execução de um programa, mantida pelo sistema. Pode consumir recursos sem janela visível, trabalhando em segundo plano. Por isso, minimizar não encerra o programa, e fechar uma janela nem sempre encerra todos os processos associados a ele.

| Ação sobre a janela | Efeito |
|---|---|
| Minimizar | Retira a janela da área visível sem encerrar sua execução. |
| Maximizar | Amplia a janela para a área de trabalho disponível. |
| Restaurar | Retorna do estado maximizado ao tamanho anterior. |
| Fechar | Fecha aquela janela; pode haver aviso sobre alterações não salvas. |

`Alt + F4` fecha a janela ativa. Quando a área de trabalho está ativa, pode abrir a caixa de desligamento. `Win + D` mostra ou oculta a área de trabalho, sem encerrar as janelas. **Restaurar uma janela**, portanto, não é recuperar um arquivo apagado.

### 2.2 Trabalhar com várias janelas

Ana pode comparar o relatório com uma planilha sem fechar nenhum dos dois. `Alt + Tab` alterna entre janelas; `Win + Tab` abre a Visão de Tarefas. O **encaixe de janelas** distribui janelas pela tela: `Win + ←/→` permite posicioná-las lateralmente, e `Win + ↑/↓` atua sobre maximização, restauração ou minimização conforme o estado atual. No Windows 11, `Win + Z` mostra os arranjos de encaixe, chamados <abbr title="Arranjos predefinidos para distribuir janelas pela tela">Snap Layouts</abbr>.

As **áreas de trabalho virtuais** separam conjuntos de janelas dentro da mesma sessão de usuário; não criam computadores, contas ou cópias de arquivos. `Win + Ctrl + D` cria outra área, `Win + Ctrl + ←/→` alterna entre elas e `Win + Ctrl + F4` fecha a atual. Ao fechá-la, suas janelas são transferidas para outra área disponível, não apagadas.

## 3. O Explorador mostra onde os arquivos estão

O **Explorador de Arquivos**, aberto por `Win + E`, navega por locais de armazenamento e opera sobre arquivos e pastas. Não é o sistema operacional inteiro nem o aplicativo usado para editar o relatório.

O painel de navegação dá acesso aos locais disponíveis; a área principal mostra o conteúdo do local aberto. A **barra de endereços** mostra ou recebe seu caminho; a **caixa de pesquisa** procura itens no local selecionado. Digitar um caminho não é pesquisar um nome.

A página inicial pode ser **Início** ou **Este Computador**, conforme a configuração. **Início** reúne acessos e itens recentes; sua apresentação varia com uso, conta e privacidade. Fixar uma pasta no **Acesso Rápido** mantém uma referência: não a move nem a duplica. Desafixar não a apaga.

No Windows 11, o menu aberto com o botão direito apresenta comandos frequentes; **Mostrar mais opções** dá acesso ao menu clássico quando necessário. Nomes, ícones e posição dos comandos podem variar entre atualizações.

### 3.1 Janela, aba e pasta são objetos diferentes

Uma janela mostra uma pasta, mas não a contém no armazenamento. Nas versões do Windows 11 com abas, cada aba pode mostrar um local diferente. Fechar a visualização não exclui os itens.

| Ação no Explorador | Atalho |
|---|---|
| Abrir outra janela | `Ctrl + N` |
| Abrir nova aba, quando disponível | `Ctrl + T` |
| Alternar para a aba seguinte ou anterior | `Ctrl + Tab` / `Ctrl + Shift + Tab` |
| Fechar a aba ativa; se for a única, fechar a janela | `Ctrl + W` |
| Selecionar a barra de endereços | `Alt + D` ou `Ctrl + L` |
| Voltar ou avançar no histórico de navegação | `Alt + ←` / `Alt + →` |
| Subir para a pasta que contém a atual | `Alt + ↑` |
| Atualizar a exibição | `F5` |

Voltar acompanha o histórico; subir acompanha a hierarquia. Podem levar a locais diferentes.

## 4. Endereço, nome e formato do arquivo

### 4.1 Leia o caminho como uma sequência de locais

Um **volume** é uma unidade lógica de armazenamento: o sistema pode tratar partes de um mesmo disco como unidades separadas. Pode receber uma letra, como `C:` ou `E:`; letras diferentes não significam necessariamente discos físicos diferentes. A **raiz** é o primeiro nível dessa hierarquia. O **sistema de arquivos** organiza os dados e os recursos disponíveis no volume.

No exemplo hipotético, o relatório de Ana está em:

```text
C:\Users\Ana\Documents\relatorio.docx
```

`C:\` é a raiz do volume; `Users`, `Ana` e `Documents` são pastas; `relatorio.docx`, o arquivo. A barra invertida separa os níveis. Na organização usual, `C:\Users` reúne pastas de **perfis**, que guardam configurações e pastas pessoais: `Ana` identifica o perfil, não a última subpasta. Nomes traduzidos e <abbr title="Pastas cujo local de armazenamento foi alterado">pastas redirecionadas</abbr> podem diferir desse caminho.

Dois arquivos `relatorio.docx` podem existir em pastas diferentes: **o caminho completo distingue os locais**. Na mesma pasta, o Windows normalmente não diferencia nomes apenas por maiúsculas e minúsculas: `Relatorio.docx` e `relatorio.docx` entram em conflito. Configurações especiais podem mudar essa regra.

### 4.2 A extensão orienta a abertura; não transforma os dados

Em `relatorio.docx`, a parte final `.docx` é a **extensão**. Ela ajuda o sistema a associar o tipo de arquivo a um aplicativo e a um ícone. O **formato**, por sua vez, é a organização interna dos dados. Um mesmo formato pode ser aberto por mais de um programa compatível.

| Extensão comum | Conteúdo normalmente associado |
|---|---|
| `.txt` | Texto simples. |
| `.docx`, `.xlsx`, `.pptx` | Documento de texto, planilha e apresentação, respectivamente. |
| `.pdf` | Documento em <abbr title="Portable Document Format">PDF</abbr>, voltado à preservação da apresentação. |
| `.png`, `.jpg` | Imagens. |
| `.csv` | Dados em texto organizados em linhas, com valores separados por vírgulas ou outro separador. |
| `.exe` | Programa executável, não documento de texto. |
| `.zip`, `.rar`, `.7z`, `.tar` | Arquivos que reúnem outros itens; a redução de tamanho depende do formato e do conteúdo. |

Se Ana apenas renomear `relatorio.txt` para `relatorio.pdf`, o conteúdo continuará sendo texto simples. Para converter, um programa precisa ler os dados e gravá-los no formato de destino. **Trocar a extensão ou o aplicativo associado não é converter.**

No Explorador do Windows 11, **Exibir > Mostrar > Extensões de nomes de arquivos** permite ver extensões antes ocultas. No Windows 10, a opção fica na guia Exibir. Ocultar a extensão não a remove. Verifique o nome completo: o ícone ou uma aparência de documento não garantem que o arquivo seja seguro.

### 4.3 Nem todo nome é permitido

Na interface comum, os seguintes caracteres não podem integrar nomes de arquivos ou pastas:

```text
< > : " / \ | ? *
```

Assim, `Relatórios_2026` e `Contratos@2026` são nomes possíveis; `Relatórios>2026` não é. Espaços internos, acentos e parênteses são aceitos. Não termine o nome com espaço ou ponto.

Também são reservados nomes de dispositivos como `CON`, `PRN`, `AUX`, `NUL`, `COM1` a `COM9` e `LPT1` a `LPT9`, inclusive seguidos de extensão: `NUL.txt` não contorna a restrição. A reserva inclui `COM` e `LPT` seguidos de `¹`, `²` ou `³`.

**Nome e caminho têm limites diferentes.** O comprimento aceito depende do sistema de arquivos, do programa e da configuração. Não há um máximo universal de 256 caracteres para qualquer caminho no Windows moderno, nem aceitação de caminhos ilimitados.

## 5. Copiar, mover e criar atalho produzem resultados diferentes

Antes de executar uma operação, defina **qual item está selecionado**. Um clique seleciona; `Ctrl + clique` permite acrescentar ou retirar itens separados; `Shift + clique` seleciona um intervalo; `Ctrl + A` seleciona todos os itens do contexto ativo. O mesmo atalho, com o foco em uma caixa de texto, pode selecionar o texto em vez dos arquivos.

No local atual, `Ctrl + Shift + N` cria uma pasta e `F2` renomeia o item selecionado. Renomear altera a identificação, não o conteúdo. Se a extensão estiver visível, ela também pode ser modificada no nome, com o risco de prejudicar a abertura.

### 5.1 A área de transferência prepara a operação

A **área de transferência** mantém dados ou referências preparados por copiar e recortar. No Explorador, guarda as informações necessárias à transferência; apertar Copiar ainda não cria o arquivo no destino.

**Copiar**, `Ctrl + C`, prepara outro exemplar; **Recortar**, `Ctrl + X`, prepara uma movimentação. Ana abre o destino e usa **Colar**, `Ctrl + V`, para realizá-la. Só recortar não apaga o arquivo da origem: a movimentação depende de uma colagem bem-sucedida.

| Operação concluída | Situação da origem | Resultado no destino |
|---|---|---|
| Copiar | O original permanece. | Há outro arquivo, inicialmente com o mesmo conteúdo. |
| Mover | O item deixa o local anterior. | O item passa a ocupar o novo local. |
| Criar atalho | O alvo permanece. | Há uma referência para alcançá-lo, não uma cópia integral. |

A cópia comum pode ser editada independentemente do original. O atalho continua dependendo do alvo: excluir o atalho não o apaga, mas alterar ou remover o alvo pode impedir que a referência funcione.

### 5.2 Arrastar depende da origem, do destino e das teclas

Para arquivos e pastas comuns no Explorador, sem personalizações e com a operação permitida, arrastar com o botão esquerdo **move dentro do mesmo volume** e **copia entre volumes diferentes**. No mesmo volume, muda a localização na hierarquia; entre volumes, transfere dados para outro armazenamento lógico.

Ana arrasta `C:\Trabalho\relatorio.docx` para `C:\Concluidos`: por padrão, move. Ao arrastá-lo de `C:\Concluidos` para `E:\`, copia e preserva o original. Isso não equivale a arrastar para um aplicativo, para a Lixeira ou para outro destino especial.

| Modificador mantido ao soltar o item | Resultado solicitado |
|---|---|
| `Ctrl` | Copiar. |
| `Shift` | Mover. |
| `Ctrl + Shift` ou `Alt` | Criar atalho. |

A indicação junto ao ponteiro ajuda a conferir o resultado. Arrastar com o botão direito permite escolher uma ação no menu exibido ao soltar. Nenhum modificador dispensa permissão, espaço ou compatibilidade do destino.

**Mover uma pasta preserva sua estrutura.** Ao mover `Trabalho`, com o relatório dentro, para `Concluidos`, o arquivo passa a `C:\Concluidos\Trabalho\relatorio.docx`, não diretamente a `Concluidos`. Já **Enviar para > unidade removível**, selecionando apenas o arquivo, normalmente o copia para a raiz da unidade, sem reproduzir as pastas anteriores do caminho.

Se houver outro item com o mesmo nome no destino, leia a decisão solicitada pelo sistema: substituir, ignorar ou manter exemplares não são o mesmo resultado. `Ctrl + Z` pode desfazer uma operação recente compatível, como uma movimentação acidental; não é garantia universal de recuperação de tudo que foi excluído.

## 6. Propriedades, acesso e exclusão

### 6.1 Mostrar, permitir e criptografar são coisas distintas

As **propriedades** descrevem nome, localização, tamanho, datas e informações específicas do formato. Dados sobre o arquivo, como autor e data de modificação, são **metadados**, distintos do texto do relatório. `Alt + Enter` abre as propriedades do item.

O atributo **oculto** controla sua apresentação em determinadas listagens. No Windows 11, **Exibir > Mostrar > Itens ocultos** torna visíveis os itens com esse atributo; arquivos protegidos do sistema podem exigir outra opção. **Somente leitura**, quando respeitado pelo aplicativo, restringe alterações no arquivo, mas não equivale a senha nem define sozinho quem pode lê-lo ou apagá-lo.

As **permissões** estabelecem quais usuários podem ler, modificar ou excluir um item. O <abbr title="New Technology File System">NTFS</abbr> é um sistema de arquivos usual na unidade do Windows e permite atribuir permissões a arquivos e pastas. **Herança de permissões** é receber as regras da pasta que contém o item.

Nas operações comuns do Explorador em <abbr title="New Technology File System">NTFS</abbr>, **copiar herda permissões do destino; mover no mesmo volume preserva as originais; mover para outro volume herda as do destino**. Ferramentas e configurações específicas podem mudar esse comportamento. Existir no novo local não basta para concluir quem poderá acessar o arquivo.

**Criptografar** transforma dados para que sua leitura dependa de uma chave apropriada. O <abbr title="Encrypting File System">EFS</abbr> criptografa arquivos em volumes <abbr title="New Technology File System">NTFS</abbr>, conforme edição e configuração; não está disponível na edição Home. Ocultar ou mudar a extensão não ativa essa proteção: permissão controla acesso; criptografia protege o conteúdo; ocultação muda a visibilidade.

Compartilhar pastas ou unidades pela rede disponibiliza acesso sujeito às permissões; não entrega necessariamente controle total nem cria cópias independentes para cada usuário.

### 6.2 A Lixeira é uma possibilidade de retorno, não uma cópia de segurança

No Explorador, **Excluir**, `Delete` ou `Ctrl + D`, normalmente envia um item local elegível à **Lixeira**. Ele sai da pasta original, mas pode ser restaurado enquanto permanecer nela. Restaurar costuma devolvê-lo à localização original; esvaziar a Lixeira remove essa possibilidade de recuperação por ela.

`Shift + Delete` solicita exclusão **sem passagem pela Lixeira**. O mesmo cuidado vale para exclusões em unidades removíveis usuais, como <abbr title="Dispositivos removíveis de armazenamento">pen drives</abbr>, e em compartilhamentos de rede: não se deve presumir que a Lixeira local guardará os itens. Configuração para exclusão direta e arquivo maior que a capacidade reservada também alteram o resultado. A capacidade é limitada e pode ser ajustada nas propriedades da Lixeira.

Não existe uma regra incondicional segundo a qual todo arquivo fica nela exatamente 30 dias. O **Sensor de Armazenamento** pode automatizar a limpeza de acordo com suas configurações e condições de execução. Serviços de armazenamento remoto, ou **nuvem**, podem ter mecanismos e prazos de recuperação próprios.

“Exclusão permanente” significa, aqui, não poder restaurar pela Lixeira; não garante destruição irrecuperável por qualquer técnica. **Cópia de segurança**, ou <abbr title="Cópia preservada para permitir a recuperação de dados">backup</abbr>, é uma cópia destinada à recuperação. A Lixeira não a substitui: pode ser esvaziada, ignorada ou perdida com o dispositivo. As estratégias são aprofundadas no assunto de backup e armazenamento em nuvem.

## 7. Pesquisar e mudar a apresentação não muda o lugar do arquivo

Se Ana não encontra o relatório, deve perguntar **onde está procurando**. Buscar em uma pasta difere de buscar em Este Computador; subpastas e opções também importam. `Ctrl + E`, `Ctrl + F` ou `F3` iniciam a pesquisa no Explorador.

A **indexação** prepara um catálogo para acelerar buscas. Pode incluir nomes, propriedades e conteúdo de tipos compatíveis, conforme a configuração. Procurar uma palavra dentro do relatório não é procurar seu nome.

No modo **Clássico**, a indexação normalmente abrange pastas usuais do perfil, como Documentos, Imagens e Músicas, e a área de trabalho, com possibilidade de personalização. O modo **Avançado** amplia o alcance pelo computador, respeitando exclusões. Isso não transforma qualquer arquivo em pesquisável por qualquer palavra: formato, permissões, disponibilidade e atualização do índice continuam relevantes. **Nenhum resultado não prova que o arquivo inexista.**

Ana pode mudar como vê os itens. Ícones grandes ou extragrandes facilitam reconhecer **miniaturas**, prévias reduzidas das imagens; **Detalhes** exibe colunas como nome, tipo, tamanho e data. Lista, blocos e conteúdo são outras apresentações. Ampliar a miniatura não altera o tamanho do arquivo nem a <abbr title="Quantidade de pontos que compõem a imagem">resolução</abbr> da imagem original. `Alt + P` alterna o painel de visualização de itens compatíveis.

**Ordenar** coloca itens em sequência; **agrupar** cria conjuntos visuais por uma propriedade; **filtrar** restringe o que aparece. Essas ações não criam pastas físicas nem alteram caminhos. Agrupar por nome não redistribui arquivos em novas pastas alfabéticas.

## 8. Reunir arquivos não é proteger um segredo

Ana pode reunir relatório e anexos em um arquivo <abbr title="Formato que reúne arquivos e pastas e permite comprimir seus dados">ZIP</abbr>. A **compactação** pode reduzir o espaço ocupado; o empacotamento reúne itens para transporte. A redução depende do conteúdo: imagens `.jpg`, já comprimidas, tendem a diminuir pouco. Um arquivo compactado também pode preservar subpastas.

Para compactar, selecione os itens e escolha a opção disponível no Explorador. **Extrair** grava itens fora do pacote: **Extrair Tudo** faz isso com o conjunto; arrastar um item de dentro do pacote para outra pasta o extrai individualmente. Apenas abrir o pacote não extrai tudo.

**Compactar não criptografa automaticamente.** A proteção de um arquivo criptografado não deve ser presumida depois de incluí-lo em um pacote e extraí-lo; a Microsoft alerta para a possibilidade de exposição dos dados nesse fluxo.

No Windows 11 24H2, a documentação registra suporte incorporado ao sistema para formatos como `.zip`, `.rar`, `.7z` e `.tar`, mas não a operações com arquivos compactados criptografados. Suporte a um formato não permite concluir que seja possível **criar, extrair e proteger por senha todos os formatos da mesma maneira**. Considere a operação e a versão indicadas.

## 9. Instalar, executar, configurar e remover programas

**Instalar** coloca e configura componentes para uso; **executar** inicia o aplicativo; **fixar** mantém um acesso na interface. Apagar o atalho, desafixar ou fechar uma janela não desinstala o programa.

A **conta de usuário** identifica quem utiliza o sistema e suas autorizações. Contas padrão realizam tarefas comuns; mudanças protegidas podem exigir autorização administrativa. **Elevação** é executar com permissões administrativas, como em certas instalações. O Controle de Conta de Usuário, <abbr title="User Account Control">UAC</abbr>, solicita confirmação ou dados de identificação de administrador conforme a conta e a configuração. Nem toda instalação ou execução exige elevação.

Para desinstalar, use o mecanismo próprio: no Windows 11, **Configurações > Aplicativos > Aplicativos instalados**; em programas compatíveis, **Painel de Controle > Programas > Programas e Recursos** ou a opção Desinstalar no Iniciar. Nem todo aplicativo integrado pode ser removido, e a disponibilidade do comando varia.

### 9.1 Escolher o aplicativo não altera o formato

Ao abrir `relatorio.docx`, o Windows pode iniciar o aplicativo associado à extensão. **Configurações > Aplicativos > Aplicativos padrão** permite escolher associações por aplicativo, tipo de arquivo ou de endereço eletrônico (link). Assim se define, por exemplo, qual navegador abre páginas. Muda a escolha de abertura, não os dados do documento.

### 9.2 Diagnosticar a execução e proteger a sessão

O **Gerenciador de Tarefas**, aberto por `Ctrl + Shift + Esc`, mostra processos e consumo de recursos, como processador e memória. Na guia Processos do Windows 10, há os grupos Aplicativos, Processos em segundo plano e Processos do Windows. **Finalizar tarefa** força o encerramento e pode perder trabalho não salvo; não equivale a desinstalar.

**Bloquear**, com `Win + L`, protege o acesso mantendo a sessão e seus aplicativos. **Sair da conta** encerra a sessão e seus programas. Não confunda essas ações com trocar de janela ou de área de trabalho virtual.

O **Prompt de Comando** permite digitar instruções textuais para operar o sistema. Não é a caixa de pesquisa do Explorador. Seus comandos continuam sujeitos a permissões; muitas tarefas também podem ser feitas por menus.

## 10. Versão e condições fazem parte da resposta

O edital do <abbr title="Tribunal de Contas do Estado do Maranhão">TCE/MA</abbr> de 6 de julho de 2026 pede conceitos, interface e gerenciamento de arquivos, pastas e programas do Microsoft Windows **sem fixar uma versão**. Este capítulo usa o Windows 11 como referência de interface e identifica diferenças relevantes do Windows 10; em uma questão, prevalecem a versão e as condições expressamente informadas.

Na documentação consultada em 5 de setembro de 2026, o Windows 11 tem versões 24H2, 25H2 e 26H1. A 26H1 atende determinados dispositivos novos e não é oferecida como atualização de recursos dos computadores existentes com 24H2 ou 25H2. O suporte geral do Windows 10 terminou em 14 de outubro de 2025; isso não significa que o sistema parou de funcionar nem invalida questões que descrevem seu comportamento.

Em uma situação de prova, reconstrua **objeto → operação → origem e destino → condições → efeito real**, em vez de concluir apenas pelo ícone ou nome do comando.
