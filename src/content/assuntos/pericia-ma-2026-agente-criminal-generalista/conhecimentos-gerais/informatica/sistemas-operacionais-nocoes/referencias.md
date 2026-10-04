# Referências — noções de sistemas operacionais

Consulta técnica em **4 de outubro de 2026**. As páginas de Windows e Ubuntu sustentam exemplos identificados, sem acrescentar uma plataforma ou versão obrigatória ao edital. Foram consultados os trechos indicados abaixo; a relação não declara leitura integral de toda a documentação dos produtos.

## Programa e recorte

- **Secretaria de Estado da Administração do Maranhão — edital de abertura da Perícia Oficial, de 17 de julho de 2026, consolidado em 29 de setembro de 2026.** [Documento oficial](https://cdn.cebraspe.org.br/concursos/PERICIA_OFICIAL_MA_26/arquivos/4D20E2DA7DBC1641876662EB9AA0D7675004148D54B063FCBFE7EFC58355E6C2.pdf), item 21.2.2, programa de Informática, página 60: “1 Noções de sistemas operacionais.” O recorte desta unidade é esse item; redes, Internet, nuvem, segurança e algoritmos têm unidades próprias.

## Funções, componentes e execução

- **National Institute of Standards and Technology — [Operating system](https://csrc.nist.gov/glossary/term/operating_system).** Definições sobre gestão de recursos e serviços para programas. Fundamenta a distinção entre sistema operacional e aplicativo; não se adotou a simplificação de que seria necessariamente o primeiro programa carregado.
- **National Institute of Standards and Technology — [Firmware](https://csrc.nist.gov/glossary/term/firmware).** Definições de software incorporado ao equipamento. Fundamenta sua distinção de componente físico e de aplicativo de uso geral.
- **Microsoft — [About Processes and Threads](https://learn.microsoft.com/en-us/windows/win32/procthread/about-processes-and-threads).** Atualização indicada: 14 de julho de 2025. Consultados a definição de processo, seus recursos e as linhas de execução. Apoia a distinção programa/processo e a possibilidade de várias atividades no mesmo processo.
- **Microsoft — [Multitasking](https://learn.microsoft.com/en-us/windows/win32/procthread/multitasking).** Atualização indicada: 14 de julho de 2025. Consultados o compartilhamento de tempo e a diferença entre alternância e execução paralela. Não se transportou uma duração fixa de fatia de tempo.
- **Microsoft — [What is a driver?](https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/what-is-a-driver-).** Atualização indicada: 31 de outubro de 2025. Consultados a definição, a participação de vários drivers e os casos que não se comunicam diretamente com hardware.
- **Microsoft — [User mode and kernel mode](https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/user-mode-and-kernel-mode).** Consultada a introdução sobre aplicações, funções centrais e modos de execução. Apoia a distinção do núcleo; a unidade não ensina desenvolvimento de drivers.
- **Ubuntu — [Project glossary](https://ubuntu.com/project/docs/how-ubuntu-is-made/concepts/glossary/).** Consultadas somente as entradas “Distribution” e “Linux”. Sustentam a diferença entre núcleo e distribuição, com conjuntos de componentes e ferramentas.

## Memória

- **Microsoft — [Virtual Address Spaces](https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/virtual-address-spaces).** Atualização indicada: 28 de junho de 2024. Consultados espaços de endereços, mapeamento, proteção, compartilhamento e transferência para armazenamento. Não foram incorporados limites numéricos de arquiteturas.
- **Documentação do núcleo Linux — [Concepts overview](https://docs.kernel.org/admin-guide/mm/concepts.html).** Consultadas especialmente “Virtual Memory Primer”, “Page Cache”, “Anonymous Memory” e “Reclaim”. Sustenta endereços virtuais, memória volátil, troca de páginas e custo sob pressão de memória. Apoio à execução não equivale ao salvamento do documento pelo aplicativo.

## Arquivos, caminhos e interfaces

- **Microsoft — [File Explorer in Windows](https://support.microsoft.com/en-us/windows/experience/fileexplorer/file-explorer-in-windows).** Página para Windows 10 e 11; consultadas apresentação, navegação e operações sobre arquivos.
- **Microsoft — [Naming Files, Paths, and Namespaces](https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file).** Consultados nomes, hierarquia, identificadores de volume e caminhos completos e relativos. Sustenta os exemplos de caminho, sem incluir catálogo de restrições de nomes.
- **Microsoft — [Overview of Disk Management](https://learn.microsoft.com/en-us/windows-server/storage/disk-management/overview-of-disk-management).** Atualização indicada: 26 de junho de 2025. Consultadas a distinção entre disco e suas partições e a atribuição de letras. Apoia a separação entre unidade lógica e disco físico, sem ensinar procedimentos de alteração de partições.
- **Microsoft — [Shell Links](https://learn.microsoft.com/en-us/windows/win32/shell/links).** Consultadas a referência ao alvo, criação, movimentação e exclusão. Sustenta a diferença entre atalho e cópia; não foram incorporados exemplos de código de desenvolvimento.
- **Microsoft — [Common file name extensions in Windows](https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/common-file-name-extensions-in-windows).** Consultada a introdução: associação a aplicativos e diferença entre renomear extensão e converter conteúdo.
- **Microsoft — [Keyboard shortcuts in Windows](https://support.microsoft.com/en-us/accessibility/windows/keyboard-shortcuts-in-windows).** Consultadas as entradas de abrir Explorador, abrir Gerenciador de Tarefas, alternar janelas, bloquear e copiar/recortar/colar. Os exemplos permanecem no contexto do Windows.
- **Microsoft — [cmd](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd).** Atualização indicada: 23 de maio de 2025. Consultada a definição de interpretador de comandos; não se ensinaram parâmetros avançados.
- **Ubuntu Desktop — [The Linux command line for beginners](https://ubuntu.com/desktop/docs/en/latest/tutorial/the-linux-command-line-for-beginners/).** Consultados terminal e interpretador, diretório corrente, raiz, montagem e caminhos relativos/absolutos. Utilizada a documentação atual, que substitui o tutorial antigo; os exemplos não tornam Ubuntu uma versão exigida.
- **Projeto <abbr title="Projeto de ambiente gráfico e aplicativos">GNOME</abbr> — [Copy or move files and folders](https://help.gnome.org/gnome-help/files-copy.html).** Consultados copiar, recortar, colar e condições de arrasto. Fundamenta os resultados das operações concluídas.
- **Projeto <abbr title="Projeto de ambiente gráfico e aplicativos">GNOME</abbr> — [Hide a file](https://help.gnome.org/gnome-help/files-hidden.html).** Consultados nomes iniciados por ponto e permanência dos arquivos ocultos. A regra é apresentada no gerenciador Arquivos desse ambiente.

## Identidade e permissões

- **Microsoft — [Windows authentication overview](https://learn.microsoft.com/en-us/windows-server/security/windows-authentication/windows-authentication-overview).** Atualização indicada: 29 de julho de 2025. Consultada a definição de autenticação. Protocolos e configuração de domínio não integram a unidade.
- **Microsoft — [Visão geral do sistema de arquivos](https://learn.microsoft.com/en-us/windows-server/storage/file-server/ntfs-overview).** Atualização indicada: 18 de junho de 2025. Consultados os recursos do <abbr title="New Technology File System">NTFS</abbr>, incluindo controle de acesso a arquivos e pastas.
- **Microsoft — [File Security and Access Rights](https://learn.microsoft.com/en-us/windows/win32/fileio/file-security-and-access-rights).** Consultadas regras de acesso e herança. Fundamenta a distinção entre leitura, alteração e acesso efetivo.
- **Projeto <abbr title="Projeto de ambiente gráfico e aplicativos">GNOME</abbr> — [Set file permissions](https://help.gnome.org/gnome-help/nautilus-file-properties-permissions.html).** Consultadas permissões por proprietário, grupo e outros, com a diferença entre arquivo e diretório.
- **Ubuntu Desktop Guide — [Preferências das colunas de lista de arquivos](https://help.ubuntu.com/stable/ubuntu-help/nautilus-list.html).** Consultada a representação de leitura, escrita e execução por classes.
- **Ubuntu Manpages — [path_resolution(7)](https://manpages.ubuntu.com/manpages/noble/man7/path_resolution.7.html).** Página do pacote de documentação 6.7-2. Consultadas resolução de caminhos, travessia, montagem e seleção da classe de permissões aplicável. O modelo básico não soma proprietário, grupo e outros.
- **Ubuntu Manpages — [unlink(2)](https://manpages.ubuntu.com/manpages/noble/man2/unlink.2.html).** Consultadas as condições de acesso ao diretório para remover uma entrada. Não se ensinou implementação interna do armazenamento.

## Questões anteriores confrontadas em fontes oficiais

As adaptações abaixo preservam a identidade histórica no banco, mas apresentam redação não literal e, quando indicado, alternativas novas. Caderno e gabarito foram confrontados nos itens identificados.

| Identidade mantida | Fonte, item e resultado oficial | Tratamento nesta unidade |
|---|---|---|
| `u023-p01` | Fundação Universidade de Brasília, 2025, conhecimentos básicos para cargos 16, 17 e 19, caderno 2, item 31: errado | Adaptação em múltipla escolha; renomear extensão não converte formato |
| `u023-p02` | Fundação Universidade de Brasília, 2025, conhecimentos básicos para cargo 18, caderno 4, item 24: errado | Adaptação em múltipla escolha; mover não deixa automaticamente cópia na origem |
| `u023-p03` | Mesma prova, caderno 4, item 23: errado | Adaptação em múltipla escolha; arrastar à área de trabalho não garante criar atalho |
| `q4425` | Polícia Militar do Amazonas, aluno oficial, 2022, tipo 3, questão 33: alternativa E | Enunciado abreviado e não literal; cinco ferramentas preservadas como alternativas |

- Fundação Universidade de Brasília, aplicação em 29 de junho de 2025: [caderno 2](https://cdn.cebraspe.org.br/concursos/fub_25/arquivos/088_FUB_CB2_01.pdf), [gabarito definitivo do caderno 2](https://cdn.cebraspe.org.br/concursos/fub_25/arquivos/Gab_Definitivo_088_FUB_CB2_01.pdf), [caderno 4](https://cdn.cebraspe.org.br/concursos/fub_25/arquivos/088_FUB_CB4_01.pdf) e [gabarito definitivo do caderno 4](https://cdn.cebraspe.org.br/concursos/fub_25/arquivos/Gab_Definitivo_088_FUB_CB4_01.pdf).
- Fundação Getulio Vargas, Polícia Militar do Amazonas, aplicação em 6 de fevereiro de 2022: [caderno de aluno oficial, tipo 3](https://conhecimento.fgv.br/sites/default/files/concursos/aluno_oficial_da_pmns101_tipo_3.pdf) e [gabarito definitivo retificado](https://conhecimento.fgv.br/sites/default/files/concursos/pmam2021_gabarito_definitivo_retificado_26.04.2022.pdf).

## Proveniência do material interno

Leitura integral dos quatro arquivos de “Sistemas operacionais: Windows e Linux”, da Polícia Civil do Maranhão; de “Sistema operacional e software”, da Secretaria de Administração Penitenciária do Maranhão; e de “Windows: arquivos e pastas”, da biblioteca de competências digitais. Os conjuntos tinham 20, 17 e 103 questões, respectivamente. A seleção preserva 16 identidades desses materiais e acrescenta nove questões autorais. Aulas e resumos foram reorganizados para este recorte; não há vínculo canônico novo. O registro de evidências discrimina arquivos, consumidores, revisões, exclusões e limites das consultas.
