# Noções de sistemas operacionais — recuperação

**Tarefa do usuário → aplicativo. Recursos e serviços comuns → sistema operacional. Operação física → hardware.**

## Execução e recursos

| Conceito | Recuperação |
|---|---|
| Sistema operacional | Coordena programas, processador, memória, arquivos, dispositivos e acessos |
| <abbr title="Núcleo que executa funções centrais do sistema operacional">Kernel</abbr> | Parte central; não equivale à interface inteira |
| Driver de dispositivo | Software que participa da comunicação sistema–dispositivo |
| <abbr title="Software incorporado ao equipamento para controlar funções próprias">Firmware</abbr> | Software no equipamento, não peça física |
| Programa × processo | Instruções/recursos × instância em execução |
| <abbr title="Linhas de execução dentro de um processo">Threads</abbr> | Compartilham recursos do processo; recebem tempo de execução |
| Multitarefa | Distribui recursos entre tarefas; não exige um processador físico para cada programa |

**Minimizar** muda apresentação. **Fechar janela** pode não encerrar todos os processos. **Encerrar** pode perder alterações não salvas; não desinstala. **Bloquear** mantém a sessão; não equivale a sair da conta.

## Memória × armazenamento

- <abbr title="Random Access Memory, memória de acesso aleatório usada no trabalho corrente">RAM</abbr>: memória principal volátil; código e dados em uso.
- Armazenamento: arquivos além da execução corrente; **salvar ≠ minimizar**.
- Memória virtual: endereços dos processos relacionados à memória física; proteção e compartilhamento controlado.
- Paginação: trabalha com páginas; pode usar armazenamento. No Linux, <abbr title="Área de armazenamento usada para transferir temporariamente páginas de memória">swap</abbr> apoia a troca.
- **Paginações/trocas não são salvamento do documento**, nem instalação de memória física.

## Arquivos e caminhos

| Ideia | Efeito ou cuidado |
|---|---|
| Pasta/diretório | Organiza arquivos e subdiretórios |
| Sistema de arquivos | Organiza dados e informações no armazenamento |
| Caminho absoluto | Parte da raiz pertinente |
| Caminho relativo | Depende do diretório de partida |
| `C:\Users\Ana\relatorio.txt` | Windows: volume `C:`, raiz `C:\`, separador `\` |
| `/home/ana/relatorio.txt` | Linux: raiz `/`, separador `/`; dispositivos podem integrar a árvore por montagem |
| Copiar × mover | Preserva origem e cria outro arquivo × muda localização |
| Atalho do Windows | Referência; apagar só o atalho não apaga o alvo |
| Área de transferência | Prepara dados/referências; colagem concretiza operação no destino |
| Extensão × formato | Parte do nome × estrutura dos dados; renomear não converte |
| Aplicativo padrão | Escolha de abertura; mudar associação não muda formato |

Arrastar à área de trabalho **não garante criar atalho**. No gerenciador Arquivos do <abbr title="Projeto de ambiente gráfico e aplicativos">GNOME</abbr>, ponto inicial oculta na visualização comum; **oculto ≠ excluído ≠ criptografado**.

## Acesso

**Autenticação → quem é. Autorização → o que pode fazer.** Conta válida não dá acesso universal; leitura não implica escrita.

- Windows: regras por identidades; <abbr title="New Technology File System, sistema de arquivos com controle de acesso">NTFS</abbr> admite permissões. Herança transmite regras conforme configuração.
- Linux básico: proprietário / grupo / outros; `r` leitura, `w` escrita, `x` execução, `-` ausência.
- `rw-r-----`: proprietário lê/grava; grupo lê; outros sem essas permissões. Aplicar a classe correspondente; não somar todas.
- Diretório: leitura lista nomes; execução atravessa; escrita participa de criar/remover entradas. Acesso ao arquivo também depende de suas próprias regras.
- **Linha de comando não concede autorização administrativa.**

## Interface e prova

Gráfica e textual coexistem em Windows e Linux. Explorador gerencia arquivos; Gerenciador de Tarefas examina atividades/recursos; Prompt interpreta comandos. Terminal apresenta um <abbr title="Programa que interpreta comandos textuais">shell</abbr>; não é o núcleo. Distribuição Linux reúne núcleo e outros componentes.

Windows: `Win + E` → Explorador; `Ctrl + Shift + Esc` → Gerenciador de Tarefas; `Alt + Tab` → alternar; `Win + L` → bloquear. `Win` indica a tecla com logotipo do Windows.

**Objeto → operação → recurso/acesso → condições → consequência.** O edital não escolhe plataforma ou versão; vale o ambiente indicado na questão.
