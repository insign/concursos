# Microsoft Windows: revisão rápida

## 1. Identifique o objeto antes do comando

| Objeto | O que muda quando se age sobre ele |
|---|---|
| Windows | sistema operacional: coordena recursos, dispositivos, usuários e execução dos aplicativos |
| Aplicativo | programa que trabalha com arquivos; abrir ou fechar sua janela não cria, salva ou exclui automaticamente o documento |
| Arquivo | dados armazenados sob nome e caminho; salvar grava alterações, fechar não garante gravação |
| Pasta (diretório) | contém arquivos e subpastas; mover a pasta conserva sua hierarquia interna |
| Atalho | referência a um arquivo, pasta ou programa; remover o atalho não apaga o destino |
| Ícone fixado | acesso na barra de tarefas ou no Iniciar; fixar não instala, e desafixar não desinstala |
| Janela, aba e processo | janela/aba mostram conteúdo; um processo pode continuar em segundo plano após fechar a janela |

**Recorte:** o edital não escolhe uma versão. Vale a versão indicada no enunciado; menus e suporte a formatos variam. No Windows 11, `24H2` e `25H2` atendem equipamentos existentes, enquanto `26H1` se destina a certos dispositivos novos e não é atualização local geral. Não projete a interface atual sobre uma questão de Windows 10.

## 2. Localize o comando e o lugar

| Na interface | Para que serve / cuidado |
|---|---|
| Área de trabalho e Iniciar | acesso a janelas, aplicativos, pesquisa, conta, configurações e energia |
| Barra de tarefas | abre ou alterna janelas; ícone fixado não indica que o programa esteja em execução |
| Explorador de Arquivos | gerencia locais e itens; Início/Acesso Rápido contém referências e itens recentes, sem mover a pasta fixada |
| Barra de endereços | mostra ou recebe **caminho**; voltar no histórico difere de subir à pasta que contém a atual |
| Painel de navegação / conteúdo | árvore de locais / itens do local selecionado |
| Caixa de pesquisa | busca no escopo escolhido; não substitui o endereço |
| Painel de visualização / detalhes | prévia compatível / propriedades; não modifica o conteúdo |

**Atalhos que decidem:** `Win + E` abre o Explorador; `Win + D` mostra/oculta a área de trabalho; `Alt + Tab` alterna janelas; `Win + Tab` mostra a Visão de Tarefas; `Win + L` bloqueia sem encerrar a sessão. No Windows 11, `Win + A` abre Configurações Rápidas e `Win + N`, notificações. No Explorador, `Ctrl + T` abre aba, `Ctrl + W` fecha a aba ativa (ou a janela, se única), `Ctrl + Tab` alterna abas e `Ctrl + N` abre outra janela. Fechar aba não exclui a pasta.

## 3. Leia o caminho e o nome

Em `C:\Users\Ana\Documents\relatorio.docx`, `C:` identifica um **volume** (unidade lógica), `C:\` é sua raiz, `\` separa níveis e `Ana` é a pasta do perfil no exemplo. Letras diferentes indicam volumes distintos, não necessariamente discos físicos. O mesmo nome pode existir em pastas diferentes.

| Decisão | Regra curta |
|---|---|
| Nome comum | não aceita `< > : " / \ ? *` nem a barra vertical (&#124;); nomes de dispositivo como `CON`, `PRN`, `AUX`, `NUL`, `COM1`–`COM9` e `LPT1`–`LPT9` permanecem reservados mesmo com extensão; a interface não aceita terminar com espaço ou ponto |
| Extensão | sufixo do nome, como `.docx`; ajuda a associar aplicativo, mas pode estar oculto, não comprova segurança nem transforma o formato real ao ser renomeado |
| Aplicativo padrão | define com que programa um tipo abre; mudar a associação não converte o arquivo |
| Exibição | Ícones/miniaturas, Lista, Detalhes e Conteúdo mudam a apresentação; ordenar, agrupar e filtrar não mudam o caminho nem criam pastas |
| Pesquisa | depende de local, permissões, formato e índice (catálogo que acelera a busca); nome do arquivo e palavras em seu conteúdo são buscas distintas |

O índice Clássico cobre por padrão pastas usuais do perfil e área de trabalho; o Avançado amplia locais, sujeito a exclusões. **Sem resultado não prova ausência do arquivo.** `Ctrl + E`/`Ctrl + F` põem foco na pesquisa; `Ctrl + L`/`Alt + D`, no endereço.

## 4. Preveja o resultado da operação

Seleção: clique escolhe um item; `Ctrl` + clique, itens separados; `Shift` + clique, intervalo; `Ctrl + A`, todos os itens da área ativa. `Ctrl + C` copia para a área de transferência (prepara a colagem sem tirar a origem), `Ctrl + X` recorta para mover, `Ctrl + V` cola no destino. `Ctrl + Z` pode desfazer uma ação recente compatível, não recupera toda exclusão. `F2` renomeia; `Ctrl + Shift + N` cria pasta; `Alt + Enter` abre propriedades.

| Arrastar entre pastas comuns | Sem tecla | Com `Shift` | Com `Ctrl` | Com `Ctrl + Shift` |
|---|---|---|---|---|
| Mesmo volume | move | move | copia | cria atalho |
| Volumes diferentes | copia | move | copia | cria atalho |

Confira o sinal junto ao ponteiro: destinos especiais, permissões e conflitos de nome podem alterar o resultado. Ao mover uma pasta para dentro de outra, a primeira permanece **subpasta** com seus arquivos; eles não são despejados diretamente na pasta de destino. **Enviar para > unidade removível** ao selecionar um arquivo normalmente o copia para a raiz dessa unidade e preserva o original, sem recriar todo o caminho de origem.

Em volumes <abbr title="New Technology File System">NTFS</abbr> (sistema de arquivos que admite permissões), **herança** significa receber as regras de acesso da pasta de destino: copiar herda; mover dentro do mesmo volume preserva, em regra, as permissões originais; mover entre volumes herda. Ferramentas e configurações particulares podem mudar isso. Oculto afeta a apresentação; somente leitura afeta edição quando respeitado; permissão controla acesso; criptografia protege dados com chave. O <abbr title="Encrypting File System">EFS</abbr> (criptografia de arquivo por sistema de arquivos) exige edição e condições compatíveis; não está disponível no Windows Home.

## 5. Excluir, compactar e administrar programas

| Situação | Decisão |
|---|---|
| `Delete` ou `Ctrl + D` no Explorador | item local elegível vai normalmente à Lixeira e sai da pasta original; Restaurar costuma devolvê-lo ao local de origem |
| `Shift + Delete`, unidade removível ou compartilhamento de rede | não presuma passagem pela Lixeira local; tamanho do item e configuração para exclusão direta também importam |
| Prazo e recuperação | Lixeira tem capacidade configurável; não há prazo universal de 30 dias. Sensor de Armazenamento pode limpar itens conforme sua configuração. Lixeira não é cópia de segurança |
| Arquivo `.zip` | reúne e pode comprimir; extrair grava itens fora do pacote. Imagens já comprimidas podem quase não diminuir; compactar não criptografa |
| Windows 11 `24H2` | suporte nativo a `.zip`, `.rar`, `.7z` e `.tar`, com limitações para arquivos compactados criptografados |

**Programas:** instalar pode exigir autorização administrativa (Controle de Conta de Usuário), conforme instalador e configuração; fixar ícone ou criar atalho não instala. Desinstalar remove o aplicativo pelo mecanismo próprio; apagar atalho não o faz. `Ctrl + Shift + Esc` abre o Gerenciador de Tarefas para examinar aplicativos, processos em segundo plano e processos do Windows; finalizar processo pode perder dados não salvos. Bloquear a sessão não encerra aplicativos.

**Pergunta de prova:** qual objeto, em qual versão e volume, recebe qual comando/modificador, sob quais configurações, com que efeito na origem e no destino?
