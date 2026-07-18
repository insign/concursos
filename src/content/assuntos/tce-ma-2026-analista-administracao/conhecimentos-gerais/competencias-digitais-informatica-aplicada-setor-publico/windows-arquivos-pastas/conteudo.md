---
schemaVersion: 1
title: "Microsoft Windows: conceitos, interface, arquivos, pastas e programas"
description: Fundamentos do sistema operacional Microsoft Windows, com foco na interface do Windows 11, no Explorador de Arquivos, nas operações com arquivos e pastas e no gerenciamento básico de programas.
order: 20
storageId: windows-arquivos-pastas
---

## 1. Como estudar Windows quando o edital não indica versão

O edital cobra Microsoft Windows sem indicar uma edição específica. Este assunto adota o **Windows 11 atual** como referência de interface e preserva os comportamentos básicos compartilhados com o Windows 10. Quando uma função depende da versão, da configuração, do tipo de unidade ou de políticas administrativas, essa condição é indicada expressamente.

Essa cautela evita duas falhas comuns:

- tratar uma aparência personalizável como regra absoluta;
- transportar para o Windows 11 um comando ou elemento visual específico do Windows 10.

O suporte gratuito regular do Windows 10 terminou em 14 de outubro de 2025, mas isso não tornou incorretos seus conceitos fundamentais de arquivo, pasta, janela, cópia, movimentação ou atalho. Em prova, a versão mencionada no enunciado prevalece.

---

## 2. Sistema operacional: conceito e funções

O **sistema operacional** é o software básico que coordena o uso do computador e oferece serviços aos aplicativos e ao usuário. Ele faz a mediação entre programas, dados e recursos físicos.

Entre suas funções estão:

- oferecer interface gráfica e mecanismos de interação;
- executar e coordenar programas e processos;
- administrar processador, memória e dispositivos;
- organizar unidades, pastas e arquivos;
- controlar contas, permissões e recursos de segurança;
- fornecer serviços comuns para que cada aplicativo não precise controlar diretamente o hardware.

Não confunda:

| Elemento | Papel |
|---|---|
| **Microsoft Windows** | sistema operacional |
| **Explorador de Arquivos** | aplicativo do Windows para navegar e gerenciar arquivos e pastas |
| **aplicativo ou programa** | software executado para realizar uma tarefa |
| **arquivo** | unidade de informação identificada por nome e, em geral, extensão |
| **pasta ou diretório** | contêiner hierárquico de arquivos e subpastas |
| **atalho** | referência que aponta para outro item; não é cópia do original |

Apagar um atalho não apaga automaticamente o arquivo ou programa de destino. Da mesma forma, fixar um aplicativo no menu Iniciar ou na barra de tarefas apenas cria um acesso conveniente: não instala nem duplica o aplicativo.

---

## 3. Interface do Windows 11

### 3.1 Área de trabalho

A **área de trabalho** é a superfície gráfica principal. Pode exibir papel de parede, arquivos, pastas, aplicativos, atalhos e ícones do sistema. Seu conteúdo varia conforme o perfil, a personalização e as políticas do computador.

O atalho `Win + D` exibe ou oculta a área de trabalho. Isso não encerra as janelas abertas.

### 3.2 Menu Iniciar

O menu Iniciar fornece acesso a pesquisa, aplicativos, arquivos, configurações, conta e opções de energia. No Windows 11 atual, sua organização pode incluir:

- pesquisa;
- itens fixados;
- lista de todos os aplicativos;
- recomendações de itens recentes;
- controles de conta;
- comandos de bloquear, suspender, reiniciar ou desligar.

Por padrão, os ícones da barra de tarefas do Windows 11 ficam centralizados, mas podem ser alinhados à esquerda. Logo, a posição não é uma característica imutável. No Windows 10, o menu Iniciar tradicional possuía lista de aplicativos e blocos, inclusive blocos dinâmicos; não se deve atribuir essa estrutura ao Windows 11 atual.

### 3.3 Barra de tarefas e bandeja do sistema

A **barra de tarefas** permite iniciar aplicativos, alternar entre janelas e identificar programas em execução. Um aplicativo fixado não está necessariamente aberto; no Windows 11, uma linha sob seu ícone indica execução, e o aplicativo ativo recebe destaque.

Uma **Lista de Atalhos** (*Jump List*), quando disponível, pode aparecer ao clicar com o botão direito no ícone de um aplicativo e oferecer arquivos recentes ou ações frequentes.

A **bandeja do sistema** ou área de notificação contém relógio, ícones de recursos e aplicativos em segundo plano, indicadores de privacidade e uma área de ícones ocultos. No Windows 11:

- `Win + A` abre as **Configurações Rápidas**, como rede, volume, bateria e brilho;
- `Win + N` abre a **Central de Notificações e o calendário**.

Esses atalhos não devem ser generalizados para versões que organizam os painéis de outra forma.

### 3.4 Janelas e seus controles

Uma janela costuma apresentar barra de título, área de conteúdo e controles para:

- **minimizar:** retira a janela da área visível e a mantém disponível na barra de tarefas;
- **maximizar:** amplia a janela para ocupar a área de trabalho disponível;
- **restaurar:** retorna a janela ao tamanho anterior;
- **fechar:** fecha a janela ativa.

Minimizar não encerra o programa. Fechar a última janela geralmente encerra o aplicativo visível, mas alguns programas podem manter processos em segundo plano; portanto, “fechar janela” e “eliminar todo processo” não são sinônimos absolutos.

---

## 4. Multitarefa e áreas de trabalho virtuais

O Windows permite manter várias janelas e alternar o foco entre elas:

| Recurso | Função |
|---|---|
| `Alt + Tab` | alterna entre janelas abertas |
| `Win + Tab` | abre a Visão de Tarefas |
| `Win + ←` ou `Win + →` | encaixa a janela ativa em uma lateral |
| `Win + Z` | abre layouts de encaixe no Windows 11 |
| `Win + Ctrl + D` | cria outra área de trabalho |
| `Win + Ctrl + ←` ou `Win + Ctrl + →` | alterna entre áreas de trabalho |
| `Win + Ctrl + F4` | fecha a área de trabalho atual |

Áreas de trabalho virtuais ajudam a separar contextos, mas usam a mesma sessão do usuário. Fechar uma área virtual não equivale a sair da conta nem, por padrão, a encerrar todas as suas janelas: elas são transferidas para outra área disponível.

---

## 5. Explorador de Arquivos

O **Explorador de Arquivos** permite localizar, abrir, organizar e gerenciar arquivos e pastas no computador e, quando configurado, na nuvem. Ele pode ser aberto pelo menu Iniciar, pela barra de tarefas ou com `Win + E`.

### 5.1 Elementos de navegação

Os elementos mais relevantes são:

- **painel de navegação:** mostra locais e estrutura hierárquica;
- **barra de endereços:** indica o caminho e permite navegar por ele;
- **caixa de pesquisa:** pesquisa no local ou escopo atual;
- **área de conteúdo:** mostra os itens da pasta;
- **barra de comandos e menu de contexto:** oferecem operações sobre os itens;
- **painéis de visualização ou detalhes:** mostram prévia e propriedades, quando habilitados.

No Windows 11, o Explorador abre por padrão em **Início** (*Home*), anteriormente chamado Acesso Rápido, mas pode ser configurado para abrir em **Este Computador**. Desde o Windows 11 22H2, pastas conhecidas como Área de Trabalho, Documentos, Downloads, Imagens, Músicas e Vídeos aparecem fixadas no acesso rápido por padrão.

Fixar uma pasta no acesso rápido cria uma referência de navegação. A pasta não é movida nem duplicada.

### 5.2 Menu de contexto

O Windows 11 apresenta menu de contexto simplificado. Comandos comuns como recortar, copiar, colar, renomear, compartilhar e excluir aparecem diretamente. **Mostrar mais opções** abre comandos do menu clássico e extensões compatíveis.

A aparência pode mudar com atualizações e aplicativos instalados; a função do comando importa mais que a posição visual exata.

---

## 6. Unidades, caminhos, pastas e arquivos

### 6.1 Estrutura hierárquica e caminho

O sistema de arquivos organiza itens em uma hierarquia. Considere:

```text
C:\Users\Ana\Documents\relatorio.docx
```

- `C:` identifica uma unidade ou volume lógico;
- `C:\` representa a raiz dessa unidade;
- `Users`, `Ana` e `Documents` são pastas sucessivas;
- `relatorio.docx` é o arquivo;
- a barra invertida `\` separa os níveis.

O **caminho** identifica a localização do item. Arquivos com o mesmo nome podem coexistir em pastas diferentes, pois possuem caminhos distintos.

### 6.2 Nome e extensão

A **extensão** é a parte final do nome, geralmente após o último ponto, como `.pdf`, `.docx`, `.xlsx` ou `.jpg`. Ela ajuda o Windows a reconhecer o tipo e a escolher um aplicativo associado.

Pontos de prova:

- extensões de tipos conhecidos podem estar ocultas;
- no Windows 11, podem ser exibidas em **Exibir > Mostrar > Extensões de nome de arquivo**;
- alterar apenas `.txt` para `.pdf` não converte o conteúdo interno em PDF;
- a extensão e o ícone não garantem que um arquivo seja legítimo ou seguro;
- a associação entre extensão e aplicativo padrão pode ser alterada.

### 6.3 Propriedades, metadados e atributos

As **propriedades** podem informar nome, tipo, caminho, tamanho, datas e outros dados. Conforme o formato, também podem existir metadados como autor, título, dimensões, duração e etiquetas.

Os **atributos** são marcações do sistema de arquivos, como oculto e somente leitura. Compactação e criptografia também podem aparecer em propriedades avançadas, dependendo do sistema de arquivos, da edição e da política. O atalho `Alt + Enter` abre as propriedades do item selecionado.

Um item oculto não é necessariamente secreto ou protegido: sua exibição apenas depende de configuração. No Windows 11, **Exibir > Mostrar > Itens ocultos** controla a visualização comum desses itens.

---

## 7. Seleção e operações fundamentais

Antes de copiar, mover, renomear ou excluir, é necessário selecionar o item correto.

| Seleção | Comportamento usual |
|---|---|
| clique | seleciona um item |
| `Ctrl` + clique | alterna itens individuais, permitindo seleção não contígua |
| `Shift` + clique | seleciona um intervalo contíguo |
| `Ctrl + A` | seleciona todos os itens da área ativa |

### 7.1 Criar e renomear

- `Ctrl + Shift + N` cria nova pasta no Explorador.
- `F2` permite renomear o item selecionado.
- Renomear altera o nome, não o conteúdo nem, por si só, a localização.
- Se a extensão estiver visível e for modificada, a associação percebida pode mudar, mas o formato interno não é convertido.

### 7.2 Copiar, recortar e colar

| Operação | Atalho | Resultado |
|---|---|---|
| copiar | `Ctrl + C` | mantém o original e prepara uma cópia |
| recortar | `Ctrl + X` | prepara o item para transferência |
| colar | `Ctrl + V` | conclui a cópia ou movimentação no destino |
| desfazer | `Ctrl + Z` | tenta desfazer a operação anterior compatível |

**Recortar não exclui imediatamente.** O item é transferido quando a colagem é concluída. Se o usuário recortar e não colar, não se deve tratar a ação como exclusão consumada.

Copiar e mover também não são sinônimos:

- **copiar:** origem e destino passam a ter itens independentes;
- **mover:** o item muda de localização, sem permanecer na origem após a conclusão.

### 7.3 Arrastar e soltar

No comportamento padrão do Explorador, sem teclas modificadoras, a regra considera o **volume** de origem e o de destino. Em situações comuns, cada letra de unidade identifica um volume:

| Origem e destino | Resultado padrão |
|---|---|
| mesmo volume | mover |
| volumes diferentes | copiar |

Teclas modificadoras tornam a intenção explícita:

| Durante o arrasto | Resultado |
|---|---|
| `Shift` | mover |
| `Ctrl` | copiar |
| `Ctrl + Shift` | criar atalho |

A regra se refere ao arrastar e soltar padrão entre volumes. Ela não substitui os comandos explícitos Copiar/Colar e Recortar/Colar e não deve ser generalizada sem ressalva para resultados de pesquisa, bibliotecas, nuvem, rede, mídia removível ou políticas corporativas.

### 7.4 Efeito básico sobre permissões NTFS

Em volumes NTFS, por padrão:

- mover dentro do mesmo volume preserva as permissões do item;
- copiar, ou mover para outro volume, cria o item no destino com permissões herdadas desse destino.

Essa regra depende de NTFS, permissões e configuração; não deve ser transportada automaticamente para FAT, nuvem, rede ou outros sistemas de arquivos.

---

## 8. Exclusão e Lixeira

Em operação local comum:

- `Delete` ou `Ctrl + D` envia o item selecionado para a Lixeira;
- `Shift + Delete` exclui sem enviá-lo à Lixeira;
- **Restaurar** na Lixeira retorna o item, em regra, à localização original;
- **Esvaziar Lixeira** remove dela os itens armazenados.

A Lixeira não é garantia universal. Um item pode não passar por ela por causa do modo de exclusão, tamanho, configuração, tipo ou local da unidade, compartilhamento de rede ou mídia removível.

“Excluir permanentemente” na interface significa não usar a Lixeira; não é afirmação de impossibilidade absoluta de recuperação forense. Também não se deve confundir restaurar da Lixeira com desfazer uma cópia ou uma movimentação.

---

## 9. Pesquisa, classificação, agrupamento e visualização

O Explorador oferece maneiras diferentes de encontrar e organizar a apresentação dos itens:

- **pesquisar:** localiza arquivos e pastas no escopo indicado;
- **classificar:** ordena por propriedade, como nome, data, tipo ou tamanho;
- **agrupar:** reúne visualmente itens que compartilham uma propriedade;
- **visualizar:** altera a forma de exibição, como ícones, lista, detalhes ou conteúdo;
- **filtrar:** quando disponível, restringe o conjunto mostrado por critérios.

Classificar ou agrupar não muda a pasta física dos arquivos. Mudar para a exibição Detalhes também não altera o conteúdo: apenas apresenta colunas de propriedades. A disponibilidade de metadados e colunas varia conforme o tipo de arquivo.

Atalhos úteis:

- `Ctrl + E` ou `Ctrl + F`: caixa de pesquisa;
- `Ctrl + L` ou `Alt + D`: barra de endereços;
- `F3`: pesquisar arquivo ou pasta;
- `F5`: atualizar a janela;
- `Alt + ←`, `Alt + →` e `Alt + ↑`: voltar, avançar e subir um nível.

---

## 10. Pastas compactadas e arquivos ZIP

Uma pasta compactada ZIP pode reunir vários itens em um arquivo e reduzir o espaço ocupado. Seus objetivos comuns são facilitar armazenamento e transferência.

### 10.1 Compactar e extrair

No fluxo documentado do Windows 11:

1. selecione o arquivo ou a pasta;
2. abra o menu de contexto;
3. escolha **Mostrar mais opções > Enviar para > Pasta compactada (zipada)**.

O ZIP é criado no mesmo local e pode ser renomeado. Para extrair:

- use **Extrair Tudo** para todo o conteúdo;
- abra o ZIP e arraste um item para outro local para extrair apenas esse item.

### 10.2 Limites e pegadinhas

- ZIP não é sinônimo de criptografia.
- Arquivos já comprimidos, como muitas imagens JPEG, podem reduzir muito pouco.
- Colocar arquivos criptografados em pasta ZIP pode fazer com que sejam extraídos sem a criptografia original, segundo o alerta da Microsoft.
- O Windows 11 24H2 também oferece suporte nativo a RAR, 7z e TAR, mas isso é específico de versão; ZIP permanece o comportamento transversal cobrado.
- Suporte a um formato compactado não implica suporte a arquivos compactados criptografados.

---

## 11. Programas e aplicativos

### 11.1 Instalar e executar

Um aplicativo pode ser instalado por pacote autorizado, instalador, Microsoft Store ou mecanismo corporativo. A instalação integra os componentes necessários ao sistema; ela não se confunde com criar atalho ou fixar ícone.

Depois de instalado, o aplicativo pode ser aberto pelo menu Iniciar, Pesquisa, barra de tarefas, atalho ou arquivo associado. Abrir um arquivo pode iniciar seu aplicativo padrão, mas o arquivo não contém uma cópia desse programa.

### 11.2 Alternar, minimizar, fechar e encerrar tarefa

- `Alt + Tab`, a barra de tarefas e a Visão de Tarefas alternam o foco.
- Minimizar mantém a janela aberta.
- `Alt + F4` fecha a janela ativa; sem janelas abertas, pode apresentar a interface de desligamento.
- `Ctrl + Shift + Esc` abre o Gerenciador de Tarefas.
- **Finalizar tarefa** é recurso para processo sem resposta e pode causar perda de dados não salvos.
- `Win + L` bloqueia o computador sem encerrar a sessão nem os aplicativos.

### 11.3 Desinstalar

Os caminhos documentados incluem:

- **Iniciar > Todos > botão direito no aplicativo > Desinstalar**;
- **Configurações > Aplicativos > Aplicativos instalados > Mais > Desinstalar**;
- **Painel de Controle > Programas > Programas e Recursos**, quando aplicável.

Alguns aplicativos integrados não podem ser desinstalados, e certos programas exigem o Painel de Controle ou seu próprio desinstalador. Apagar um atalho, desafixar um ícone ou simplesmente excluir uma pasta visível não equivale ao procedimento de desinstalação.

### 11.4 Aplicativos padrão e associações

Em **Configurações > Aplicativos > Aplicativos padrão**, é possível escolher:

- o aplicativo que abre uma extensão, como `.txt` ou `.pdf`;
- o aplicativo que atende a um protocolo ou tipo de link;
- os tipos de arquivo e links associados a determinado aplicativo.

Logo, uma extensão não fica vinculada de forma imutável a um único programa. Alterar o aplicativo padrão muda a forma usual de abrir aquele tipo, não converte os arquivos existentes.

### 11.5 Conta, elevação e permissões no limite do item

A conta define o contexto de arquivos, preferências e autorizações. Certas instalações ou alterações exigem confirmação ou credenciais administrativas. Isso não significa que todo aplicativo precise ser executado como administrador.

Permissões de câmera, microfone, localização e outros recursos podem ser gerenciadas nas configurações de privacidade e segurança, mas aplicativos tradicionais de área de trabalho podem ter comportamento diferente dos aplicativos controlados integralmente por essas páginas.

---

## 12. Atalhos prioritários

| Atalho | Ação padrão |
|---|---|
| `Win` ou `Ctrl + Esc` | abrir ou fechar o menu Iniciar |
| `Win + E` | abrir o Explorador de Arquivos |
| `Win + I` | abrir Configurações |
| `Win + D` | exibir ou ocultar a área de trabalho |
| `Win + L` | bloquear o computador |
| `Win + A` | abrir Configurações Rápidas no Windows 11 |
| `Win + N` | abrir notificações e calendário no Windows 11 |
| `Win + Tab` | abrir a Visão de Tarefas |
| `Alt + Tab` | alternar entre janelas abertas |
| `Alt + F4` | fechar a janela ativa |
| `Ctrl + Shift + Esc` | abrir o Gerenciador de Tarefas |
| `Ctrl + C`, `Ctrl + X`, `Ctrl + V` | copiar, recortar e colar |
| `Ctrl + Z` | desfazer ação compatível |
| `Ctrl + A` | selecionar todos os itens |
| `Ctrl + Shift + N` | criar nova pasta |
| `F2` | renomear item selecionado |
| `Alt + Enter` | abrir propriedades do item |
| `Delete` ou `Ctrl + D` | enviar o item selecionado à Lixeira |
| `Shift + Delete` | excluir sem passar pela Lixeira |

Atalhos podem ser redefinidos por aplicativos específicos. A tabela registra o comportamento padrão do Windows ou do Explorador.

---

## 13. Casos integrados

### 13.1 Relatório em unidade externa

Ana arrasta `relatorio.docx` do volume `C:` para uma unidade USB identificada como `E:`, sem pressionar teclas. O comportamento padrão é **copiar**, pois são volumes diferentes. Se ela mantiver `Shift`, força a movimentação. Se usar `Ctrl`, força a cópia.

### 13.2 Extensão trocada

Bruno renomeia `dados.txt` para `dados.xlsx`. O Windows pode alterar o ícone ou tentar abrir o arquivo com outro aplicativo, mas o conteúdo não se tornou uma planilha válida. Conversão exige que um programa interprete e grave o formato de destino.

### 13.3 Ícone removido

Carla desafixa um aplicativo da barra de tarefas. O programa continua instalado. Se ela excluir somente o atalho da área de trabalho, o executável de destino também permanece, salvo alguma operação distinta sobre o original.

### 13.4 Pasta fixada

Diego fixa `Projetos` no acesso rápido. A pasta continua em seu caminho original; o item fixado é uma referência para navegação.

### 13.5 Aplicativo sem resposta

Erika tenta primeiro fechar normalmente o programa, preservando a chance de salvar. Se ele permanecer travado, pode usar o Gerenciador de Tarefas, sabendo que finalizar o processo pode perder alterações não salvas.

---

## 14. Pegadinhas de prova

- Explorador de Arquivos **não** é o próprio sistema operacional.
- Atalho **não** é cópia do item original.
- Fixar **não** instala nem duplica um programa.
- Minimizar **não** encerra a janela.
- Alternar com `Alt + Tab` **não** fecha o aplicativo anterior.
- Renomear extensão **não** converte o formato.
- Extensões e itens ocultos **não** ficam necessariamente visíveis.
- Associação de arquivo **não** é imutável.
- Arrastar no mesmo volume, sem modificadores, **move** por padrão.
- Arrastar entre volumes, sem modificadores, **copia** por padrão.
- `Shift` força mover; `Ctrl` força copiar; `Ctrl + Shift` cria atalho.
- Recortar **não** é exclusão imediata.
- Nem toda exclusão passa pela Lixeira.
- `Shift + Delete` evita a Lixeira, mas não prova irrecuperabilidade forense.
- Classificar ou agrupar **não** muda a localização dos arquivos.
- ZIP **não** é sinônimo de criptografia.
- JPEG compactado em ZIP pode quase não reduzir de tamanho.
- Desafixar ou apagar atalho **não** desinstala.
- Bloquear com `Win + L` **não** encerra a sessão.
- A interface do Windows é personalizável; posição e visibilidade de elementos podem variar.

---

## 15. Método rápido para questões situacionais

1. **Identifique o objeto:** sistema, aplicativo, janela, atalho, arquivo ou pasta.
2. **Localize a operação:** copiar, mover, renomear, excluir, compactar, instalar ou desinstalar.
3. **Observe origem e destino:** mesmo volume ou volumes diferentes?
4. **Procure modificadores:** `Ctrl`, `Shift`, `Ctrl + Shift` ou nenhum.
5. **Separe aparência de efeito:** fixar, ocultar e classificar não movem o original.
6. **Confira a versão:** o enunciado cita Windows 10, Windows 11 ou nenhum?
7. **Identifique condições:** comportamento padrão, configuração, permissão, rede ou nuvem.
8. **Rejeite absolutos indevidos:** “sempre visível”, “todo arquivo”, “nunca recuperável” e “necessariamente encerra”.

## Referências

- CEBRASPE. [Edital nº 1 do concurso TCE-MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Conteúdo programático de Competências Digitais e Informática Aplicada ao Setor Público. Acesso em 18 jul. 2026.
- MICROSOFT. [O suporte ao Windows 10 terminou em 14 de outubro de 2025](https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025). Encerramento do suporte técnico e das atualizações gratuitas regulares do Windows 10. Acesso em 18 jul. 2026.
- MICROSOFT. [File Explorer in Windows](https://support.microsoft.com/en-us/windows/file-explorer-in-windows-ef370130-1cca-9dc5-e0df-2f7416fe1cb1). Documentação oficial para Windows 11 e Windows 10. Acesso em 18 jul. 2026.
- MICROSOFT. [Customize the Windows Start Menu](https://support.microsoft.com/en-us/windows/customize-the-windows-start-menu-fde6f576-0fc0-0813-6b0d-d3ec1d244c50). Documentação oficial da estrutura e personalização do menu Iniciar. Acesso em 18 jul. 2026.
- MICROSOFT. [Customize the Taskbar in Windows](https://support.microsoft.com/en-us/windows/customize-the-taskbar-notification-area-e159e8d2-9ac5-b2bd-61c5-bb63c1d437c3). Documentação oficial da barra de tarefas e da bandeja do sistema. Acesso em 18 jul. 2026.
- MICROSOFT. [How to Multitask in Windows](https://support.microsoft.com/en-us/windows/how-to-multitask-in-windows-b4fa0333-98f8-ef43-e25c-06d4fb1d6960). Documentação oficial de encaixe, Visão de Tarefas e áreas de trabalho. Acesso em 18 jul. 2026.
- MICROSOFT. [Keyboard shortcuts in Windows](https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec). Lista oficial de atalhos do Windows e do Explorador. Acesso em 18 jul. 2026.
- MICROSOFT. [Zip and unzip files](https://support.microsoft.com/en-us/windows/zip-and-unzip-files-8d28fa72-f2f9-712f-67df-f80cf89fd4e5). Documentação oficial de compactação e extração. Acesso em 18 jul. 2026.
- MICROSOFT. [Uninstall or remove apps and programs in Windows](https://support.microsoft.com/en-us/windows/uninstall-or-remove-apps-and-programs-in-windows-4b55f974-2cc6-2d2b-d092-5905080eaf98). Procedimentos oficiais de desinstalação. Acesso em 18 jul. 2026.
- MICROSOFT. [Alterar os aplicativos padrão no Windows](https://support.microsoft.com/pt-br/windows/alterar-aplica%C3%A7%C3%B5es-predefinidas-no-windows-e5d82cad-17d1-c53b-3505-f10a32e1894d). Documentação oficial de associações por extensão, protocolo e aplicativo. Acesso em 18 jul. 2026.
- MICROSOFT. Raymond Chen. [Will dragging a file result in a move or a copy?](https://devblogs.microsoft.com/oldnewthing/20041112-00/?p=37323). Regra oficial de arrastar e soltar com unidades e teclas modificadoras, 12 nov. 2004. Acesso em 18 jul. 2026.
- MICROSOFT. [Permissions when you copy and move files](https://learn.microsoft.com/en-us/troubleshoot/windows-client/windows-security/permissions-on-copying-moving-files). Comportamento de permissões NTFS em cópia e movimentação, atualização de fev. 2026. Acesso em 18 jul. 2026.
