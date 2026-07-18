# Microsoft Windows: arquivos, pastas e programas

## Recorte de versão

- Referência atual: Windows 11.
- Conceitos básicos também valem para Windows 10.
- Se o enunciado indicar versão, ela prevalece.
- Aparência, posição e visibilidade de elementos podem ser personalizadas.
- Suporte gratuito regular do Windows 10: encerrado em 14/10/2025.

## Sistema operacional

O Windows:

- oferece interface;
- executa e coordena programas;
- gerencia memória, processamento e dispositivos;
- organiza unidades, pastas e arquivos;
- controla contas, permissões e segurança;
- fornece serviços aos aplicativos.

| Elemento | Regra curta |
|---|---|
| Windows | sistema operacional |
| Explorador de Arquivos | aplicativo de navegação e gerenciamento |
| arquivo | unidade de informação |
| pasta/diretório | contêiner hierárquico |
| atalho | referência ao original, não cópia |

Fixar ou criar atalho **não instala, move nem duplica** o item de destino.

## Interface

### Área de trabalho

- Superfície gráfica principal.
- Pode exibir ícones, arquivos, pastas e atalhos.
- `Win + D`: exibir/ocultar; não fecha janelas.

### Menu Iniciar

- Acesso a pesquisa, aplicativos, arquivos, configurações, conta e energia.
- Windows 11: itens fixados, Todos, recomendações, conta e energia.
- Ícones ficam centralizados por padrão, mas podem ser alinhados à esquerda.
- Blocos dinâmicos são característica histórica do Windows 10, não do Windows 11 atual.

### Barra de tarefas

- Inicia aplicativos e alterna janelas.
- Ícone fixado ≠ aplicativo aberto.
- Linha sob o ícone: aplicativo em execução no Windows 11.
- Aplicativo ativo recebe destaque.
- Botão direito pode abrir Lista de Atalhos (*Jump List*).

### Bandeja do sistema

- Ícones de recursos, apps em segundo plano, relógio e indicadores.
- `Win + A`: Configurações Rápidas no Windows 11.
- `Win + N`: notificações e calendário no Windows 11.

### Janelas

| Controle | Efeito |
|---|---|
| minimizar | oculta a janela sem encerrá-la |
| maximizar | ocupa a área disponível |
| restaurar | volta ao tamanho anterior |
| fechar | fecha a janela ativa |

Fechar janela não garante eliminação de todo processo em segundo plano.

## Multitarefa

| Atalho | Ação |
|---|---|
| `Alt + Tab` | alternar janelas abertas |
| `Win + Tab` | Visão de Tarefas |
| `Win + ←/→` | encaixar à esquerda/direita |
| `Win + Z` | layouts de encaixe no Windows 11 |
| `Win + Ctrl + D` | criar área de trabalho |
| `Win + Ctrl + ←/→` | alternar áreas de trabalho |
| `Win + Ctrl + F4` | fechar área de trabalho atual |

Fechar área virtual transfere suas janelas para outra área; não encerra a sessão.

## Explorador de Arquivos

- Abre com `Win + E`.
- Gerencia arquivos/pastas locais e, se configurado, na nuvem.
- Elementos: navegação, endereço, pesquisa, conteúdo, comandos e painéis.
- Windows 11: abre por padrão em Início (*Home*), configurável para Este Computador.
- Fixar no acesso rápido cria referência; não move nem copia.
- Menu simplificado: **Mostrar mais opções** abre comandos clássicos.

### Caminho

`C:\Users\Ana\Documents\relatorio.docx`

- `C:` = unidade;
- `C:\` = raiz;
- `\` = separador;
- pastas = níveis;
- `relatorio.docx` = arquivo.

Mesmo nome pode existir em pastas diferentes.

### Extensão

- Parte final: `.pdf`, `.docx`, `.jpg`.
- Ajuda na associação com aplicativo.
- Pode estar oculta.
- Exibir: **Exibir > Mostrar > Extensões de nome de arquivo**.
- Renomear `.txt` para `.pdf` **não converte** o conteúdo.
- Extensão/ícone não garantem segurança.

### Propriedades e atributos

- `Alt + Enter`: propriedades.
- Propriedades: localização, tamanho, tipo, datas e metadados disponíveis.
- Atributos: oculto, somente leitura e, conforme sistema, compactado/criptografado.
- Oculto ≠ protegido.
- Itens ocultos: **Exibir > Mostrar > Itens ocultos**.

## Seleção

| Ação | Resultado |
|---|---|
| clique | um item |
| `Ctrl` + clique | itens não contíguos |
| `Shift` + clique | intervalo contíguo |
| `Ctrl + A` | todos os itens |

## Operações

| Operação | Atalho | Efeito |
|---|---|---|
| copiar | `Ctrl + C` | original permanece |
| recortar | `Ctrl + X` | prepara transferência |
| colar | `Ctrl + V` | conclui cópia/movimento |
| desfazer | `Ctrl + Z` | desfaz ação compatível |
| nova pasta | `Ctrl + Shift + N` | cria pasta |
| renomear | `F2` | muda nome |

Recortar **não é exclusão imediata**.

### Arrastar sem modificadores

A regra considera volumes; em situações comuns, cada letra de unidade identifica um volume.

| Situação | Padrão |
|---|---|
| mesmo volume | mover |
| volumes diferentes | copiar |

### Modificadores no arrasto

| Tecla | Força |
|---|---|
| `Shift` | mover |
| `Ctrl` | copiar |
| `Ctrl + Shift` | criar atalho |

A regra é do arrastar padrão. Rede, nuvem, biblioteca, pesquisa e políticas podem exigir ressalva.

### Permissões NTFS

- mover no mesmo volume: preserva permissões por padrão;
- copiar ou mover a outro volume: herda permissões do destino por padrão;
- não generalizar para FAT, rede ou nuvem.

## Exclusão e Lixeira

| Ação | Efeito padrão |
|---|---|
| `Delete` ou `Ctrl + D` | envia à Lixeira |
| `Shift + Delete` | exclui sem Lixeira |
| Restaurar | retorna ao local original, em regra |
| Esvaziar | remove os itens da Lixeira |

- Nem toda exclusão usa a Lixeira.
- Rede, mídia removível, tamanho e configuração podem alterar o comportamento.
- Sem Lixeira ≠ irrecuperável por qualquer técnica.

## Organização visual

| Recurso | Efeito |
|---|---|
| pesquisar | localizar no escopo |
| classificar | ordenar por propriedade |
| agrupar | reunir visualmente por propriedade |
| visualizar | mudar a apresentação |

Classificar, agrupar e visualizar **não movem** arquivos.

| Atalho | Ação no Explorador |
|---|---|
| `Ctrl + E/F` | pesquisa |
| `Ctrl + L` ou `Alt + D` | barra de endereços |
| `F3` | pesquisar arquivo/pasta |
| `F5` | atualizar |
| `Alt + ←/→/↑` | voltar/avançar/subir |

## ZIP

- Agrupa itens e pode reduzir espaço.
- Compactar: **Mostrar mais opções > Enviar para > Pasta compactada (zipada)**.
- Todo o conteúdo: **Extrair Tudo**.
- Um item: abrir e arrastar para fora.
- ZIP ≠ criptografia.
- JPEG pode quase não reduzir.
- Windows 11 24H2 suporta também RAR, 7z e TAR: especificidade de versão.
- Formato suportado ≠ arquivo compactado criptografado suportado.

## Programas e aplicativos

### Instalar e abrir

- Instalação integra componentes ao sistema.
- Pode ocorrer por instalador, Store ou mecanismo corporativo.
- Abrir: Iniciar, Pesquisa, barra, atalho ou arquivo associado.
- Fixar/desafixar ≠ instalar/desinstalar.

### Controle

| Atalho/ação | Efeito |
|---|---|
| `Alt + F4` | fechar janela ativa |
| `Ctrl + Shift + Esc` | Gerenciador de Tarefas |
| Finalizar tarefa | forçar encerramento; pode perder dados |
| `Win + L` | bloquear sem encerrar sessão/apps |

### Desinstalar

- Iniciar > Todos > app > Desinstalar.
- Configurações > Aplicativos > Aplicativos instalados.
- Painel de Controle > Programas e Recursos, quando aplicável.
- Alguns apps integrados não podem ser desinstalados.
- Apagar pasta, atalho ou ícone **não é** desinstalação adequada.

### Aplicativos padrão

- Configurações > Aplicativos > Aplicativos padrão.
- Associação pode ser por extensão, protocolo ou aplicativo.
- Alterar associação muda como o tipo abre; não converte o arquivo.

## Atalhos essenciais

| Atalho | Ação |
|---|---|
| `Win` / `Ctrl + Esc` | menu Iniciar |
| `Win + E` | Explorador |
| `Win + I` | Configurações |
| `Win + D` | área de trabalho |
| `Win + L` | bloquear |
| `Win + Tab` | Visão de Tarefas |
| `Alt + Tab` | alternar janelas |
| `Alt + F4` | fechar janela ativa |
| `Ctrl + Shift + Esc` | Gerenciador de Tarefas |
| `F2` | renomear |
| `Alt + Enter` | propriedades |

## Pegadinhas

- Explorador ≠ sistema operacional.
- atalho ≠ cópia;
- fixar ≠ instalar;
- minimizar ≠ encerrar;
- `Alt + Tab` ≠ fechar;
- extensão renomeada ≠ formato convertido;
- arquivo oculto ≠ arquivo protegido;
- associação ≠ vínculo imutável;
- mesmo volume + arrastar ≠ copiar por padrão;
- volumes diferentes + arrastar ≠ mover por padrão;
- recortar ≠ excluir imediatamente;
- `Shift + Delete` ≠ impossibilidade forense de recuperação;
- classificar/agrupar ≠ mover;
- ZIP ≠ criptografia;
- desafixar/excluir atalho ≠ desinstalar;
- `Win + L` ≠ sair da conta.

## Sequência de decisão

**Objeto → operação → origem/destino → modificadores → versão → condições → efeito real.**
