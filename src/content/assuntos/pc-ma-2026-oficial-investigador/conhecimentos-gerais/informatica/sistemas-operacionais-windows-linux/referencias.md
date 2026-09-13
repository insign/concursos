# Referências

Fontes revalidadas para o item 20.2.2, Informática, item 2, da <abbr title="Polícia Civil do Maranhão">PC-MA</abbr>: sistema operacional; noções de ambiente Windows e Linux; pastas, diretórios, arquivos, atalhos, área de trabalho e área de transferência.

## Programa

- **<abbr title="Centro Brasileiro de Pesquisa em Avaliação e Seleção e de Promoção de Eventos">Cebraspe</abbr>.** [Edital nº 1 — PCMA — Investigador, de 13 de julho de 2026](https://cdn.cebraspe.org.br/concursos/PC_MA_26_INVESTIGADOR/arquivos/9EE70E72CE79EB274C5319BEEB5B9B7D8519FF48DA21986A0830B5DB02C4F8B0.pdf). Item 20.2.2, Informática, item 2. O edital cita Windows e Linux e delimita o foco em pastas, diretórios, arquivos, atalhos, área de trabalho e área de transferência; não fixa uma distribuição Linux nem uma versão específica do Windows.

## Windows

- **Microsoft.** [File Explorer in Windows](https://support.microsoft.com/en-us/windows/experience/fileexplorer/file-explorer-in-windows). Navegação e gerenciamento de arquivos e pastas no Explorador.
- **Microsoft.** [Keyboard shortcuts in Windows](https://support.microsoft.com/en-us/accessibility/windows/keyboard-shortcuts-in-windows). Atalhos de janelas, área de trabalho, Explorador e operações de seleção/cópia.
- **Microsoft.** [Naming Files, Paths, and Namespaces](https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file). Estrutura de caminhos, unidades, separadores, nomes e caracteres reservados.
- **Microsoft.** [Common file name extensions in Windows](https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/common-file-name-extensions-in-windows). Extensões de arquivos e associação com aplicativos.

## Linux e ambiente gráfico

- **The Linux Foundation.** [Filesystem Hierarchy Standard 3.0](https://refspecs.linuxfoundation.org/FHS_3.0/fhs-3.0.pdf). Sustenta a árvore enraizada em `/` e as funções de diretórios como `/home`, `/etc`, `/media`, `/mnt` e `/tmp`.
- **<abbr title="GNU's Not Unix">GNU</abbr>.** [Coreutils 9.11 — `ln`: Make links between files](https://www.gnu.org/software/coreutils/manual/html_node/ln-invocation.html). Distingue hard links e links simbólicos, documenta `ln -s` e o caso de link simbólico pendente.
- **<abbr title="GNU's Not Unix">GNU</abbr>.** [Coreutils 9.11 — Which files are listed](https://www.gnu.org/software/coreutils/manual/html_node/Which-files-are-listed.html). Documenta que `ls` normalmente ignora nomes iniciados por `.` e que `-a` os inclui.
- **GNOME Project.** [Hide a file](https://help.gnome.org/gnome-help/files-hidden.html). Arquivos e pastas ocultos por ponto inicial e `Ctrl + H` no GNOME Files.
- **Ubuntu Documentation.** [Copy or move files and folders](https://help.ubuntu.com/stable/ubuntu-help/files-copy.html.en). Cópia e movimentação por `Ctrl + C`, `Ctrl + X`, `Ctrl + V` e arrasto entre mesmo/dispositivo diferente.
- **freedesktop.org.** [Desktop Entry Specification 1.5](https://specifications.freedesktop.org/desktop-entry/latest-single/). Arquivos `.desktop` como entradas que descrevem lançamento e apresentação de aplicações no ambiente gráfico; empregados aqui para não confundi-los com links simbólicos.

## Questões anteriores adaptadas

As três adaptações são breves e não literais. O caderno e o gabarito definitivo foram conferidos em fontes primárias do <abbr title="Centro Brasileiro de Pesquisa em Avaliação e Seleção e de Promoção de Eventos">Cebraspe</abbr>.

- **`u023-p01` — <abbr title="Fundação Universidade de Brasília">FUB</abbr>, 2025, conhecimentos básicos para os cargos 16, 17 e 19, caderno `088_FUB_CB2_01`, item 31.** [Caderno oficial](https://cdn.cebraspe.org.br/concursos/fub_25/arquivos/088_FUB_CB2_01.pdf) e [gabarito definitivo](https://cdn.cebraspe.org.br/concursos/fub_25/arquivos/Gab_Definitivo_088_FUB_CB2_01.pdf). O item foi julgado **E** e cobra o efeito de renomear a extensão de um arquivo no Windows 11.
- **`u023-p02` e `u023-p03` — <abbr title="Fundação Universidade de Brasília">FUB</abbr>, 2025, conhecimento básico para o cargo 18, caderno `088_FUB_CB4_01`, itens 24 e 23.** [Caderno oficial](https://cdn.cebraspe.org.br/concursos/fub_25/arquivos/088_FUB_CB4_01.pdf) e [gabarito definitivo](https://cdn.cebraspe.org.br/concursos/fub_25/arquivos/Gab_Definitivo_088_FUB_CB4_01.pdf). Ambos foram julgados **E**; cobram movimentação dentro do mesmo disco e a inferência indevida de que arrastar para a área de trabalho sempre cria um atalho.

## Proveniência e recorte do reaproveitamento

- Origem Windows auditada integralmente: `src/content/biblioteca/competencias-digitais-informatica-aplicada-setor-publico/windows-arquivos-pastas/`.
- Blobs da origem na base auditada: `conteudo.md` `d31f9842ddcbea17f66b661d224e2bfa4ac60b59`; `cheat-sheet.md` `d814596810eac059a06af0156c01865983e9ba9e`; `questoes.json` `e2d717e0c76d0c03015a1c9add420b412e4413f0`; `referencias.md` `e2a887e3c79453a88f9f905daf57b7fefff68b90`.
- Consumidores da origem resolvidos por `vinculo.json`: `tce-ma-2026-analista-administracao` e `tce-ma-2026-tecnico-administrativa`, ambos apontando explicitamente para o canônico; blob atual do vínculo `27e53aa50f6dcc7404a869a9525850a280472677`.
- Classificação para a <abbr title="Polícia Civil do Maranhão">PC-MA</abbr>: **parcial**. Foram aproveitados do doador os mecanismos de arquivos, pastas, caminhos, atalhos, área de trabalho, área de transferência e operações de cópia/movimentação. A lacuna Linux foi produzida localmente com fontes próprias.
- Foram deliberadamente excluídos aprofundamentos do canônico que excedem o item 2 da <abbr title="Polícia Civil do Maranhão">PC-MA</abbr>, como permissões <abbr title="New Technology File System">NTFS</abbr>/<abbr title="Encrypting File System">EFS</abbr>, compactação, instalação/desinstalação de programas, indexação detalhada e cadência de versões do Windows. Esses temas não são necessários para fechar esta unidade e alguns possuem tratamento próprio em outros itens de Informática.
- Nenhum arquivo da biblioteca nem dos consumidores do Tribunal de Contas do Estado do Maranhão foi alterado.
