---
schemaVersion: 1
title: "Microsoft Windows: conceitos, interface, arquivos, pastas e programas"
description: Fundamentos do sistema operacional Microsoft Windows, com foco na interface do Windows 11, no Explorador de Arquivos, nas operações com arquivos e pastas e no gerenciamento básico de programas.
order: 20
storageId: windows-arquivos-pastas
---

## 1. Como estudar Windows quando o edital não indica versão

O edital cobra Microsoft Windows sem indicar edição ou atualização. Este assunto usa o **Windows 11** como referência de interface e preserva os comportamentos básicos compartilhados com o Windows 10. Quando uma função depende de versão, configuração, unidade, sistema de arquivos ou política administrativa, essa condição é indicada.

Em julho de 2026, a Microsoft mantém diferentes versões do Windows 11. Para prova, não é produtivo decorar números de compilação; é importante reconhecer o alcance de cada referência:

| Referência | Como interpretar |
|---|---|
| **24H2** | versão ainda suportada e base de muitos ambientes existentes |
| **25H2** | atualização ampla para computadores elegíveis e referência corrente para dispositivos existentes |
| **26H1** | versão destinada a determinados dispositivos novos de 2026; não é oferecida como atualização local de 24H2 ou 25H2 |
| **Windows 10** | aplicar quando o enunciado o mencionar ou quando o comportamento for transversal |
| **versão expressa na questão** | sempre prevalece sobre a referência geral do material |

Essa cautela evita três falhas comuns:

- tratar aparência personalizável como regra absoluta;
- transportar para o Windows 11 elemento visual específico do Windows 10;
- presumir que toda versão mais nova é atualização geral para qualquer computador existente.

O suporte gratuito regular do Windows 10 terminou em 14 de outubro de 2025, mas isso não tornou incorretos seus conceitos fundamentais de arquivo, pasta, janela, cópia, movimentação ou atalho.

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
| **arquivo** | unidade de informação identificada por nome e caminho |
| **pasta ou diretório** | contêiner hierárquico de arquivos e subpastas |
| **atalho** | referência que aponta para outro item; não é cópia do original |

Apagar um atalho não apaga automaticamente o arquivo ou programa de destino. Fixar um aplicativo no menu Iniciar ou na barra de tarefas apenas cria um acesso conveniente: não instala nem duplica o aplicativo.

---

## 3. Interface do Windows 11

### 3.1 Área de trabalho

A **área de trabalho** é a superfície gráfica principal. Pode exibir papel de parede, arquivos, pastas, aplicativos, atalhos e ícones do sistema. Seu conteúdo varia conforme perfil, personalização e políticas do computador.

`Win + D` exibe ou oculta a área de trabalho. As janelas continuam abertas.

### 3.2 Menu Iniciar

O menu Iniciar fornece acesso a pesquisa, aplicativos, arquivos, configurações, conta e opções de energia. No Windows 11 atual, pode incluir:

- pesquisa;
- itens fixados;
- lista de todos os aplicativos;
- recomendações de itens recentes;
- controles de conta;
- comandos de bloquear, suspender, reiniciar ou desligar.

No Windows 10, o menu Iniciar tradicional possuía lista de aplicativos e blocos, inclusive blocos dinâmicos. Essa organização não deve ser atribuída automaticamente ao Windows 11.

### 3.3 Barra de tarefas e área de notificação

A **barra de tarefas** permite iniciar aplicativos, alternar entre janelas e identificar programas em execução. Um aplicativo fixado não está necessariamente aberto. Indicadores visuais distinguem execução e janela ativa.

Uma **Lista de Atalhos** (*Jump List*), quando disponível, pode aparecer no menu de contexto do ícone de um aplicativo e oferecer arquivos recentes ou ações frequentes.

A **área de notificação** contém relógio, ícones de recursos, aplicativos em segundo plano e indicadores de privacidade. No Windows 11:

- `Win + A` abre as **Configurações Rápidas**, como rede, volume, bateria e brilho;
- `Win + N` abre notificações e calendário.

### 3.4 Janelas

| Controle | Efeito |
|---|---|
| minimizar | retira a janela da área visível e a mantém aberta |
| maximizar | amplia a janela para a área disponível |
| restaurar | retorna ao tamanho anterior |
| fechar | fecha a janela ativa |

Minimizar não encerra o programa. Fechar a última janela geralmente encerra o aplicativo visível, mas alguns programas podem manter processos em segundo plano; por isso, “fechar janela” e “eliminar todo processo” não são sinônimos absolutos.

---

## 4. Multitarefa e áreas de trabalho virtuais

| Recurso | Função |
|---|---|
| `Alt + Tab` | alterna entre janelas abertas |
| `Win + Tab` | abre a Visão de Tarefas |
| `Win + ←` ou `Win + →` | encaixa a janela ativa em uma lateral |
| `Win + Z` | abre layouts de encaixe no Windows 11 |
| `Win + Ctrl + D` | cria outra área de trabalho |
| `Win + Ctrl + ←` ou `Win + Ctrl + →` | alterna entre áreas de trabalho |
| `Win + Ctrl + F4` | fecha a área de trabalho atual |

Áreas de trabalho virtuais organizam janelas dentro da mesma sessão. Fechar uma área virtual não equivale a sair da conta nem, por padrão, a encerrar todas as janelas: elas são transferidas para outra área disponível.

---

## 5. Explorador de Arquivos

O **Explorador de Arquivos** permite localizar, abrir, organizar e gerenciar arquivos e pastas no computador e, quando configurado, na nuvem. Pode ser aberto pelo menu Iniciar, pela barra de tarefas ou com `Win + E`.

### 5.1 Elementos da janela

| Elemento | Função |
|---|---|
| painel de navegação | apresenta pastas, unidades e locais hierárquicos |
| barra de endereços | mostra ou recebe o caminho do local atual |
| caixa de pesquisa | localiza itens no escopo atual |
| painel de conteúdo | lista os itens do local selecionado |
| barra de comandos e menu de contexto | oferecem operações sobre os itens |
| painel de visualização | mostra prévia compatível do item |
| painel de detalhes | exibe propriedades e metadados |
| barra de status | informa seleção e oferece controles de apresentação |

No Windows 11, o Explorador abre por padrão em **Início** (*Home*), mas pode ser configurado para abrir em **Este Computador**. Fixar uma pasta no acesso rápido cria referência de navegação; não move nem duplica a pasta.

### 5.2 Menu de contexto

O Windows 11 apresenta menu de contexto simplificado. Comandos como recortar, copiar, colar, renomear, compartilhar e excluir aparecem diretamente. **Mostrar mais opções** abre comandos do menu clássico e extensões compatíveis.

A aparência pode mudar com atualizações e aplicativos instalados. A função do comando importa mais que sua posição visual exata.

### 5.3 Abas

Uma janela do Explorador pode manter várias abas, cada uma exibindo pasta, unidade ou local diferente.

- mudar de aba altera o local apresentado, não move os arquivos;
- fechar uma aba não exclui a pasta exibida;
- `Ctrl + T` abre nova aba;
- `Ctrl + W` fecha a aba ativa e fecha a janela quando resta apenas uma aba;
- `Ctrl + Tab` avança entre abas;
- `Ctrl + Shift + Tab` retorna à aba anterior.

Não confunda aba, janela e pasta. A aba é apenas uma forma de visualizar um local.

---

## 6. Unidades, caminhos, nomes e propriedades

### 6.1 Estrutura hierárquica

Considere:

```text
C:\Users\Ana\Documents\relatorio.docx
```

- `C:` identifica unidade ou volume lógico;
- `C:\` representa a raiz dessa unidade;
- `Users`, `Ana` e `Documents` são pastas sucessivas;
- `relatorio.docx` é o arquivo;
- a barra invertida separa os níveis.

O **caminho** identifica a localização. Arquivos com o mesmo nome podem coexistir em pastas diferentes porque possuem caminhos distintos.

### 6.2 Nome e extensão

A extensão é a parte final do nome, geralmente após o último ponto, como `.pdf`, `.docx`, `.xlsx` ou `.jpg`. Ela ajuda o Windows a reconhecer o tipo e escolher aplicativo associado.

Pontos de prova:

- extensões de tipos conhecidos podem estar ocultas;
- no Windows 11, podem ser exibidas em **Exibir > Mostrar > Extensões de nome de arquivo**;
- alterar apenas `.txt` para `.pdf` não converte o conteúdo interno;
- extensão e ícone não garantem legitimidade ou segurança;
- a associação entre extensão e aplicativo padrão pode ser alterada.

### 6.3 Regras de nomenclatura

Na interface comum do Windows:

- não use `<`, `>`, `:`, `"`, `/`, barra invertida, `?`, `*` nem barra vertical (`|`) em nomes comuns;
- não use os nomes reservados `CON`, `PRN`, `AUX`, `NUL`, `COM1` a `COM9` e `LPT1` a `LPT9`;
- a extensão não neutraliza nome reservado: `CON.txt` e `NUL.pdf` continuam inválidos;
- não termine o nome por espaço ou ponto;
- o mesmo nome pode existir em pastas diferentes;
- hífen, sublinhado, parênteses, espaço interno e `@` podem ser aceitos.

### 6.4 Propriedades, metadados e atributos

As propriedades podem informar nome, tipo, caminho, tamanho, datas e outros dados. Conforme o formato, também podem existir metadados como autor, título, dimensões, duração e etiquetas.

Atributos incluem marcações como oculto e somente leitura. Compactação e criptografia podem aparecer em propriedades avançadas, dependendo do sistema de arquivos, edição e política. `Alt + Enter` abre as propriedades do item selecionado.

Item oculto não é necessariamente secreto ou protegido. **Exibir > Mostrar > Itens ocultos** controla sua visualização comum.

---

## 7. Seleção, cópia e movimentação

| Seleção | Comportamento usual |
|---|---|
| clique | seleciona um item |
| `Ctrl` + clique | alterna itens individuais e permite seleção não contígua |
| `Shift` + clique | seleciona intervalo contíguo |
| `Ctrl + A` | seleciona todos os itens da área ativa |

### 7.1 Criar e renomear

- `Ctrl + Shift + N` cria nova pasta;
- `F2` renomeia o item selecionado;
- renomear altera o nome, não o conteúdo nem a localização;
- modificar extensão visível pode mudar a associação percebida, mas não converte o formato interno.

### 7.2 Copiar, recortar e colar

| Operação | Atalho | Resultado |
|---|---|---|
| copiar | `Ctrl + C` | mantém o original e prepara cópia |
| recortar | `Ctrl + X` | prepara o item para transferência |
| colar | `Ctrl + V` | conclui cópia ou movimentação |
| desfazer | `Ctrl + Z` | tenta desfazer ação compatível |

Recortar não exclui imediatamente. A transferência ocorre quando a colagem é concluída.

### 7.3 Arrastar e soltar

| Origem e destino | Resultado padrão sem modificador |
|---|---|
| mesmo volume | mover |
| volumes diferentes | copiar |

| Tecla durante o arrasto | Resultado |
|---|---|
| `Shift` | mover |
| `Ctrl` | copiar |
| `Ctrl + Shift` | criar atalho |

A regra vale para arrasto padrão entre volumes. Não deve ser generalizada sem ressalva para resultados de pesquisa, bibliotecas, nuvem, rede, mídia removível ou políticas corporativas.

### 7.4 Aprofundamento: permissões NTFS

Em volumes NTFS, por padrão:

- mover dentro do mesmo volume preserva as permissões do item;
- copiar, ou mover para outro volume, cria o item no destino com permissões herdadas desse destino.

A regra depende de NTFS, permissões e configuração; não se transporta automaticamente para FAT, nuvem, rede ou outros sistemas de arquivos.

---

## 8. Exclusão e Lixeira

Em operação local comum:

- `Delete` ou `Ctrl + D` envia o item selecionado para a Lixeira;
- `Shift + Delete` exclui sem enviá-lo à Lixeira;
- **Restaurar** retorna o item, em regra, à localização original;
- **Esvaziar Lixeira** remove dela os itens armazenados.

A Lixeira não é garantia universal. Um item pode não passar por ela por causa do modo de exclusão, tamanho, configuração, tipo ou local da unidade, compartilhamento de rede ou mídia removível.

**Aprofundamento:** “excluir permanentemente” na interface significa não usar a Lixeira; não prova impossibilidade absoluta de recuperação forense. Para a prova básica, retenha a diferença operacional entre `Delete`, `Shift + Delete`, Restaurar e Esvaziar Lixeira.

---

## 9. Pesquisa, indexação e visualização

### 9.1 Pesquisa e escopo

A caixa de pesquisa trabalha no local ou escopo atual. Pesquisar em uma pasta, em **Este Computador**, em unidade externa ou em local de nuvem pode produzir resultados diferentes.

A indexação acelera a localização ao manter catálogo de arquivos e propriedades. Conforme o tipo de arquivo, manipulador disponível e configuração, o índice também pode incluir conteúdo interno.

| Configuração | Alcance geral |
|---|---|
| **Clássico** | indexa por padrão áreas comuns, como Documentos, Imagens, Músicas e Área de Trabalho |
| **Aprimorado** | amplia a busca indexada para o computador, com exclusões configuráveis e maior uso de recursos |
| propriedades apenas | considera nome, caminho e metadados suportados |
| propriedades e conteúdo | também indexa texto interno de tipos compatíveis |

Pontos de prova:

- a pesquisa não se limita necessariamente ao nome;
- ausência no índice não significa inexistência do arquivo;
- item pode ser encontrado por busca mais lenta ou em outro escopo;
- conteúdo interno depende de formato, configuração e suporte;
- pesquisa no Explorador não é sinônimo de pesquisa na Internet.

### 9.2 Modos de exibição

| Exibição | Característica principal |
|---|---|
| Ícones | prioriza ícone ou miniatura em diferentes tamanhos |
| Lista | apresentação compacta em sequência |
| Detalhes | linhas e colunas de propriedades |
| Conteúdo | combina nome com informações textuais |
| Blocos | mostra ícone acompanhado de propriedades selecionadas |

**Classificar** ordena; **agrupar** cria grupos visuais; **filtrar** restringe o conjunto mostrado; **alterar a exibição** muda a apresentação. Nenhuma dessas operações move fisicamente os arquivos.

Atalhos úteis:

- `Ctrl + E` ou `Ctrl + F`: caixa de pesquisa;
- `Ctrl + L` ou `Alt + D`: barra de endereços;
- `F3`: pesquisar arquivo ou pasta;
- `F5`: atualizar a janela;
- `Alt + P`: mostrar ou ocultar painel de visualização;
- `Alt + ←`, `Alt + →` e `Alt + ↑`: voltar, avançar e subir um nível.

---

## 10. Pastas compactadas

Uma pasta compactada ZIP pode reunir vários itens em um arquivo e reduzir espaço ocupado. Seus objetivos comuns são facilitar armazenamento e transferência.

Para compactar, selecione o item e use o comando correspondente no menu de contexto. Para extrair, use **Extrair Tudo** ou abra o arquivo e arraste item para outro local.

Pegadinhas:

- ZIP não é sinônimo de criptografia;
- arquivos já comprimidos, como muitas imagens JPEG, podem reduzir pouco;
- colocar arquivos criptografados em ZIP pode remover a proteção original na extração;
- Windows 11 24H2 oferece suporte nativo a RAR, 7z e TAR, mas isso depende da versão;
- suporte a formato compactado não implica suporte a arquivo compactado criptografado.

---

## 11. Programas e aplicativos

### 11.1 Instalar e executar

Aplicativo pode ser instalado por pacote autorizado, instalador, Microsoft Store ou mecanismo corporativo. Instalação não se confunde com criar atalho ou fixar ícone.

Depois de instalado, pode ser aberto pelo menu Iniciar, Pesquisa, barra de tarefas, atalho ou arquivo associado. Abrir arquivo pode iniciar seu aplicativo padrão, mas o arquivo não contém cópia do programa.

### 11.2 Alternar, fechar e encerrar tarefa

- `Alt + Tab`, barra de tarefas e Visão de Tarefas alternam o foco;
- minimizar mantém a janela aberta;
- `Alt + F4` fecha a janela ativa;
- `Ctrl + Shift + Esc` abre o Gerenciador de Tarefas;
- **Finalizar tarefa** pode causar perda de dados não salvos;
- `Win + L` bloqueia o computador sem encerrar sessão nem aplicativos.

### 11.3 Desinstalar

Caminhos usuais:

- menu Iniciar > botão direito no aplicativo > Desinstalar;
- Configurações > Aplicativos > Aplicativos instalados;
- Painel de Controle > Programas e Recursos, quando aplicável.

Apagar atalho, desafixar ícone ou simplesmente excluir uma pasta visível não equivale ao procedimento de desinstalação.

### 11.4 Aplicativos padrão

Em **Configurações > Aplicativos > Aplicativos padrão**, é possível escolher aplicativo por extensão, protocolo ou tipo de link.

Alterar aplicativo padrão muda a forma usual de abrir o tipo; não converte os arquivos existentes.

---

## 12. Atalhos prioritários

| Atalho | Ação padrão |
|---|---|
| `Win` ou `Ctrl + Esc` | abrir ou fechar menu Iniciar |
| `Win + E` | abrir Explorador de Arquivos |
| `Win + I` | abrir Configurações |
| `Win + D` | exibir ou ocultar área de trabalho |
| `Win + L` | bloquear computador |
| `Win + A` | abrir Configurações Rápidas no Windows 11 |
| `Win + N` | abrir notificações e calendário no Windows 11 |
| `Win + Tab` | abrir Visão de Tarefas |
| `Alt + Tab` | alternar entre janelas |
| `Alt + F4` | fechar janela ativa |
| `Ctrl + Shift + Esc` | abrir Gerenciador de Tarefas |
| `Ctrl + C`, `Ctrl + X`, `Ctrl + V` | copiar, recortar e colar |
| `Ctrl + Z` | desfazer ação compatível |
| `Ctrl + A` | selecionar todos os itens |
| `Ctrl + Shift + N` | criar nova pasta |
| `F2` | renomear item |
| `Alt + Enter` | abrir propriedades |
| `Delete` ou `Ctrl + D` | enviar normalmente à Lixeira |
| `Shift + Delete` | excluir sem passar pela Lixeira |

Atalhos podem ser redefinidos por aplicativos específicos. A tabela registra o comportamento padrão do Windows ou do Explorador.

---

## 13. Casos integrados

### 13.1 Arrasto para unidade externa

Ana arrasta `relatorio.docx` de `C:` para unidade USB `E:`, sem pressionar tecla. O padrão é **copiar**, pois são volumes diferentes. Com `Shift`, força movimentação; com `Ctrl`, força cópia.

### 13.2 Extensão trocada

Bruno renomeia `dados.txt` para `dados.xlsx`. O Windows pode alterar ícone ou tentar abrir com outro aplicativo, mas o conteúdo não se tornou planilha válida.

### 13.3 Ícone removido

Carla desafixa aplicativo da barra de tarefas. O programa continua instalado. Excluir somente atalho da área de trabalho também não remove o executável de destino.

### 13.4 Pesquisa indexada

Fábio procura em `C:\Processos` expressão presente no conteúdo de arquivos PDF. O resultado depende do escopo, da indexação, do tipo de arquivo e do manipulador capaz de extrair texto. Não localizar na primeira busca não prova inexistência.

### 13.5 Abas

Gabriela abre `C:\Relatórios` em uma aba e `E:\Backup` em outra. Alternar entre elas não copia nem move itens. Fechar a aba de `E:\Backup` encerra apenas aquela visualização.

---

## 14. Pegadinhas de prova

- Explorador de Arquivos **não** é o próprio sistema operacional.
- Atalho **não** é cópia do item original.
- Fixar **não** instala nem duplica programa.
- Minimizar **não** encerra janela.
- Alternar com `Alt + Tab` **não** fecha aplicativo anterior.
- Renomear extensão **não** converte formato.
- Extensão ou ícone **não** prova segurança.
- Arrastar no mesmo volume, sem modificador, **move** por padrão.
- Arrastar entre volumes, sem modificador, **copia** por padrão.
- `Shift` força mover; `Ctrl` força copiar; `Ctrl + Shift` cria atalho.
- Recortar **não** é exclusão imediata.
- Nem toda exclusão passa pela Lixeira.
- `Shift + Delete` evita a Lixeira, mas não prova irrecuperabilidade forense.
- Classificar, agrupar ou mudar exibição **não** move arquivos.
- ZIP **não** é sinônimo de criptografia.
- Desafixar ou apagar atalho **não** desinstala.
- Bloquear com `Win + L` **não** encerra sessão.
- `CON.txt` continua usando nome reservado.
- Fechar aba do Explorador **não** exclui pasta.
- Pesquisa sem resultado **não** prova que o arquivo inexiste.
- 26H1 **não** é atualização geral para computadores 24H2 ou 25H2.

---

## 15. Método rápido para questões situacionais

1. **Identifique o objeto:** sistema, aplicativo, janela, atalho, arquivo ou pasta.
2. **Localize a operação:** copiar, mover, renomear, excluir, compactar, instalar ou desinstalar.
3. **Observe origem e destino:** mesmo volume ou volumes diferentes?
4. **Procure modificadores:** `Ctrl`, `Shift`, `Ctrl + Shift` ou nenhum.
5. **Separe aparência de efeito:** fixar, ocultar, classificar e mudar exibição não movem o original.
6. **Confira a versão:** Windows 10, Windows 11, 24H2, 25H2 ou 26H1?
7. **Identifique condições:** comportamento padrão, configuração, permissão, rede ou nuvem.
8. **Rejeite absolutos indevidos:** “sempre visível”, “todo arquivo”, “nunca recuperável”.
9. **Diferencie busca de existência:** escopo, índice e suporte ao formato condicionam o resultado.

## Referências

- CEBRASPE. [Edital nº 1 do concurso TCE-MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Conteúdo programático. Acesso em 18 jul. 2026.
- MICROSOFT. [Windows 11 release information](https://learn.microsoft.com/en-us/windows/release-health/windows11-release-information). Versões 24H2, 25H2 e 26H1. Acesso em 19 jul. 2026.
- MICROSOFT. [O suporte ao Windows 10 terminou em 14 de outubro de 2025](https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025). Acesso em 18 jul. 2026.
- MICROSOFT. [File Explorer in Windows](https://support.microsoft.com/en-us/windows/file-explorer-in-windows-ef370130-1cca-9dc5-e0df-2f7416fe1cb1). Acesso em 18 jul. 2026.
- MICROSOFT. [Keyboard shortcuts in Windows](https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec). Acesso em 18 jul. 2026.
- MICROSOFT. [Naming Files, Paths, and Namespaces](https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file). Acesso em 19 jul. 2026.
- MICROSOFT. [Search indexing in Windows](https://support.microsoft.com/en-us/windows/experience/performance-optimization/search-indexing-in-windows). Acesso em 19 jul. 2026.
- MICROSOFT. [Zip and unzip files](https://support.microsoft.com/en-us/windows/zip-and-unzip-files-8d28fa72-f2f9-712f-67df-f80cf89fd4e5). Acesso em 18 jul. 2026.
- MICROSOFT. [Permissions when you copy and move files](https://learn.microsoft.com/en-us/troubleshoot/windows-client/windows-security/permissions-on-copying-moving-files). Atualização de fev. 2026. Acesso em 18 jul. 2026.
