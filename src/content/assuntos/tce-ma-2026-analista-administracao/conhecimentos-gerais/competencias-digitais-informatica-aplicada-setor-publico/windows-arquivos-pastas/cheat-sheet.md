# Microsoft Windows: revisão rápida

## 1. Versão e objetos

| Item | Regra |
|---|---|
| Windows | sistema operacional |
| Explorador de Arquivos | aplicativo para navegar e gerenciar itens |
| arquivo | unidade de informação identificada por nome e caminho |
| pasta | contêiner hierárquico |
| atalho | referência; não é cópia do destino |
| ícone fixado | acesso conveniente; não instala nem duplica |

- A versão citada na questão prevalece.
- 24H2 e 25H2 atendem computadores existentes; 26H1 é voltada a certos dispositivos novos e não é atualização local geral.
- Fechar janela não garante encerrar todo processo em segundo plano.

## 2. Interface e Explorador

| Recurso | Função |
|---|---|
| Área de trabalho | superfície principal; `Win + D` mostra ou oculta |
| Menu Iniciar | pesquisa, aplicativos, arquivos, conta, configurações e energia |
| Barra de tarefas | inicia e alterna apps; fixado ≠ em execução |
| `Win + A` | Configurações Rápidas no Windows 11 |
| `Win + N` | notificações e calendário no Windows 11 |
| `Alt + Tab` | alterna janelas |
| `Win + Tab` | Visão de Tarefas |
| `Win + E` | abre o Explorador |

Partes do Explorador:

- barra de endereços = caminho;
- caixa de pesquisa = busca no escopo atual;
- painel de navegação = árvore de locais;
- painel de conteúdo = itens do local;
- painel de visualização = prévia;
- painel de detalhes = propriedades;
- barra de status = seleção e controles de apresentação.

Abas:

- `Ctrl + T`: nova aba;
- `Ctrl + W`: fecha aba ativa; fecha a janela se for a única;
- `Ctrl + Tab`: próxima aba;
- `Ctrl + Shift + Tab`: aba anterior;
- fechar aba não exclui a pasta.

## 3. Caminhos, nomes, extensões e pesquisa

Exemplo: `C:\Users\Ana\Documents
elatorio.docx`

- `C:` = unidade; `C:\` = raiz; `\` separa níveis;
- mesmo nome pode existir em caminhos diferentes;
- trocar `.txt` por `.pdf` não converte o conteúdo;
- extensão pode estar oculta e não prova segurança.

Nomes:

| Regra | Exemplos |
|---|---|
| proibidos | `< > : " / \ | ? *` |
| reservados | `CON`, `PRN`, `AUX`, `NUL`, `COM1`–`COM9`, `LPT1`–`LPT9` |
| extensão não neutraliza | `CON.txt` continua inválido |
| terminação | não encerrar por espaço ou ponto |

Pesquisa e indexação:

- o escopo atual importa;
- modo Clássico indexa áreas comuns; Aprimorado amplia o alcance;
- índice pode conter nome, caminho, propriedades e conteúdo compatível;
- ausência no índice ≠ inexistência;
- `Ctrl + E`/`Ctrl + F`: pesquisa; `Ctrl + L`/`Alt + D`: endereço.

Exibições:

- Ícones = miniatura/ícone;
- Lista = apresentação compacta;
- Detalhes = linhas e colunas;
- Conteúdo/Blocos = nome com propriedades;
- classificar, agrupar, filtrar ou mudar exibição não move arquivos.

## 4. Selecionar, copiar, mover e excluir

| Seleção | Resultado |
|---|---|
| clique | um item |
| `Ctrl` + clique | itens não contíguos |
| `Shift` + clique | intervalo contíguo |
| `Ctrl + A` | todos os itens da área ativa |

| Operação | Atalho |
|---|---|
| copiar | `Ctrl + C` |
| recortar | `Ctrl + X` |
| colar | `Ctrl + V` |
| desfazer | `Ctrl + Z` |
| nova pasta | `Ctrl + Shift + N` |
| renomear | `F2` |
| propriedades | `Alt + Enter` |

Arrastar e soltar:

| Origem/destino | Sem tecla | `Shift` | `Ctrl` | `Ctrl + Shift` |
|---|---|---|---|---|
| mesmo volume | mover | mover | copiar | criar atalho |
| volumes diferentes | copiar | mover | copiar | criar atalho |

Lixeira:

- `Delete`/`Ctrl + D`: envia normalmente à Lixeira;
- `Shift + Delete`: exclui sem Lixeira;
- Restaurar retorna, em regra, ao local original;
- rede, mídia removível, tamanho e configuração podem mudar o comportamento;
- sem Lixeira não significa irrecuperável em sentido forense.

## 5. Compactação e programas

- ZIP reúne e pode reduzir tamanho; não é sinônimo de criptografia.
- JPEG e outros formatos já comprimidos podem reduzir pouco.
- Windows 11 24H2 oferece suporte nativo a ZIP, RAR, 7z e TAR, mas não a todo arquivo criptografado.
- instalar ≠ fixar ≠ criar atalho;
- desafixar ou apagar atalho não desinstala;
- mudar aplicativo padrão não converte arquivos;
- `Ctrl + Shift + Esc` abre o Gerenciador de Tarefas;
- Finalizar tarefa pode causar perda de dados não salvos;
- `Win + L` bloqueia sem encerrar a sessão.

**Aprofundamento NTFS:** mover no mesmo volume tende a preservar permissões; copiar ou mover para outro volume tende a herdar as permissões do destino.

## 6. Pegadinhas e método

- Explorador ≠ Windows.
- Atalho ≠ cópia.
- Fixar ≠ instalar.
- Minimizar ≠ encerrar.
- Renomear extensão ≠ converter.
- Oculto ≠ criptografado.
- Pesquisa sem resultado ≠ arquivo inexistente.
- Fechar aba ≠ excluir pasta.
- Classificar/agrupar ≠ mover.
- ZIP ≠ criptografia.
- Dado em Lixeira ≠ já apagado do local original e irrecuperável.

Sequência: **objeto → operação → origem/destino → tecla → versão → configuração → efeito real**.
