---
schemaVersion: 1
title: "Windows e Linux: arquivos, pastas, atalhos e área de trabalho"
description: "Noções de sistemas operacionais Windows e Linux, com foco em arquivos, pastas e diretórios, caminhos, atalhos, área de trabalho e área de transferência."
order: 23
storageId: pc-u023
---

# Windows e Linux: arquivos, pastas, atalhos e área de trabalho

Imagine a mesma tarefa em dois computadores: localizar `relatorio.pdf`, fazer uma cópia, mover outra versão para uma pasta diferente e criar um acesso rápido para abrir o arquivo depois. A lógica da tarefa é parecida no Windows e no Linux, mas **os caminhos, a organização do sistema e alguns tipos de “atalho” não são iguais**.

O erro mais comum em prova é decorar um ícone ou um comando sem identificar o objeto. Antes de responder, pergunte:

**o que é o item → onde ele está → qual operação foi feita → o que permanece na origem → o que aparece no destino.**

## 1. O modelo mental que vale nos dois ambientes

Um **sistema operacional** coordena recursos do computador e oferece serviços para que programas e usuários trabalhem com memória, dispositivos e armazenamento.

No armazenamento, separe quatro ideias:

- **arquivo:** unidade de dados identificada por nome e localização;
- **pasta ou diretório:** estrutura que organiza arquivos e outros diretórios;
- **caminho:** sequência que localiza um item na hierarquia;
- **atalho ou link:** referência para chegar a outro item; não é, por si só, uma cópia do conteúdo.

A expressão **pasta** é comum em interfaces gráficas; **diretório** é o termo estrutural usado também em linha de comando. No contexto deste edital, trate-os como formas de falar da organização hierárquica, sem concluir que todo detalhe de Windows e Linux seja idêntico.

> **Pegadinha:** apagar uma referência não significa necessariamente apagar o alvo. Primeiro descubra se a questão fala do arquivo real, de um atalho do Windows, de um <abbr title="referência do sistema de arquivos para outro caminho">link simbólico</abbr> do Linux ou de um <abbr title="entrada usada para iniciar um aplicativo no ambiente gráfico">lançador gráfico</abbr>.

## 2. Windows: unidades, pastas e Explorador de Arquivos

No Windows, o **Explorador de Arquivos** é o aplicativo usado para navegar e operar sobre arquivos e pastas. Ele não é o sistema operacional inteiro.

Um caminho típico é:

```text
C:\Users\Ana\Documents\relatorio.pdf
```

Leia da esquerda para a direita:

- `C:` identifica uma unidade de armazenamento;
- `C:\` representa a raiz dessa unidade;
- `Users`, `Ana` e `Documents` são pastas sucessivas;
- `relatorio.pdf` é o arquivo;
- a barra invertida `\` separa os níveis.

Dois arquivos podem ter o mesmo nome se estiverem em caminhos diferentes. O caminho completo, e não apenas o nome, distingue a localização.

### 2.1 Área de trabalho e janelas

A **área de trabalho** é uma superfície da interface. Ela pode exibir arquivos, pastas e atalhos, mas o ícone visível não diz sozinho o que existe por trás dele.

Alguns contrastes de alto rendimento:

- minimizar uma janela não a exclui nem apaga o arquivo aberto;
- `Win + D` mostra ou oculta a área de trabalho sem fechar os arquivos;
- `Alt + Tab` alterna entre janelas abertas;
- `Win + E` abre o Explorador de Arquivos.

Esses atalhos são próprios do ambiente Windows. Não os transporte automaticamente para qualquer interface Linux.

### 2.2 Atalho não é cópia

Um atalho do Windows aponta para um destino. Se você excluir apenas o atalho, o arquivo ou programa de destino continua existindo. Se o destino for movido, renomeado ou removido, o atalho pode deixar de encontrá-lo.

Compare:

| Ação | Origem | Destino |
| --- | --- | --- |
| copiar arquivo | permanece | surge outro arquivo |
| mover arquivo | deixa o local anterior | passa a ocupar o novo local |
| criar atalho | alvo permanece | surge uma referência ao alvo |

## 3. Copiar, recortar, colar e a área de transferência

A **área de transferência** é um mecanismo intermediário usado por operações de copiar e recortar. No gerenciador de arquivos, pressionar `Ctrl + C` não significa que já exista uma nova cópia no destino: é preciso colar.

No Windows:

- `Ctrl + C` — prepara a cópia;
- `Ctrl + X` — prepara a movimentação;
- `Ctrl + V` — cola no destino.

A diferença aparece no resultado:

- **copiar + colar:** o original permanece e surge outro item;
- **recortar + colar:** o item deixa o local anterior e passa ao destino.

Arrastar com o botão esquerdo, no comportamento usual do Explorador para arquivos e pastas comuns, **move dentro da mesma unidade de armazenamento** e **copia entre unidades de armazenamento diferentes**. Teclas modificadoras e destinos especiais podem mudar o resultado; leia as condições do enunciado.

## 4. Linux: uma árvore enraizada em `/`

Em sistemas Linux, a hierarquia de arquivos é apresentada como uma única árvore cujo ponto inicial é `/`, a **raiz**. Não há necessidade de uma letra de unidade como `C:` para construir o caminho.

Exemplo:

```text
/home/ana/documentos/relatorio.pdf
```

Nesse caminho:

- `/` é a raiz;
- `home`, `ana` e `documentos` são diretórios;
- `/` também é o separador entre os componentes do caminho;
- `relatorio.pdf` é o arquivo.

O <abbr title="Filesystem Hierarchy Standard">FHS</abbr>, padrão de organização de diretórios adotado por sistemas Linux e outros sistemas semelhantes, ajuda a entender diretórios frequentes:

| Diretório | Ideia principal |
| --- | --- |
| `/home` | diretórios pessoais de usuários |
| `/etc` | configuração específica do sistema |
| `/tmp` | arquivos temporários |
| `/media` | ponto usado para dispositivos removíveis, como pendrives |
| `/mnt` | ponto tradicional para acesso temporário a outro armazenamento |

Não decore isso como se cada ambiente Linux tivesse de apresentar a mesma interface gráfica. O quadro descreve **funções na hierarquia de arquivos**, não a aparência de um gerenciador.

## 5. Arquivos ocultos no ambiente gráfico Linux

Na interface GNOME Files, um arquivo ou diretório cujo nome começa por `.` fica oculto na visualização comum.

Exemplo:

```text
.config
```

O item continua na pasta; ele apenas não aparece na visualização normal. `Ctrl + H` alterna a exibição de arquivos ocultos nessa interface.

> **Contraste:** “oculto” não significa “apagado”, “criptografado” nem “sem permissão de acesso”.

## 6. Copiar e mover no gerenciador de arquivos do Ubuntu

Na documentação gráfica do Ubuntu, arquivos e pastas podem ser copiados ou movidos pelos mesmos atalhos familiares:

- `Ctrl + C` e `Ctrl + V` — copiar e colar;
- `Ctrl + X` e `Ctrl + V` — recortar e mover.

Ao arrastar entre duas janelas do gerenciador:

- mesmo dispositivo: o comportamento padrão é mover;
- dispositivo diferente: o comportamento padrão é copiar;
- `Ctrl` durante o arrasto força cópia;
- `Shift` durante o arrasto força movimentação.

Essa semelhança com o Windows é útil, mas não transforma as duas plataformas em um único ambiente. Caminhos, tipos de referência e interfaces continuam distintos.

## 7. “Atalho” no Linux: link simbólico e lançador não são a mesma coisa

No sistema de arquivos Linux, um **link simbólico** é um arquivo especial que referencia outro caminho. O comando `ln -s` cria esse tipo de link.

Exemplo hipotético:

```text
ln -s /home/ana/documentos/relatorio.pdf relatorio-atual
```

`relatorio-atual` passa a referenciar o arquivo indicado. Se o alvo deixar de existir no caminho esperado, o link pode ficar **pendente** — a referência existe, mas não resolve para um arquivo válido.

Há também arquivos `.desktop` usados por ambientes gráficos para descrever como um aplicativo deve ser iniciado e como aparece em menus. Um arquivo `.desktop` **não é sinônimo de link simbólico**.

Para a prova, pergunte qual objeto o enunciado está descrevendo:

- referência de sistema de arquivos → link simbólico;
- entrada de lançamento/menu gráfico → arquivo `.desktop`;
- cópia → outro arquivo com conteúdo próprio.

## 8. Windows × Linux: contraste que resolve questões

| Ponto | Windows | Linux |
| --- | --- | --- |
| início típico do caminho | unidade, como `C:\` | raiz `/` |
| separador de caminho | `\` | `/` |
| pasta pessoal típica | sob `C:\Users\<usuário>` | sob `/home/<usuário>` |
| gerenciador gráfico | Explorador de Arquivos | depende do ambiente; GNOME Files é um exemplo |
| referência para outro item | atalho | link simbólico é uma forma estrutural; `.desktop` é outra categoria |
| copiar/recortar/colar em gerenciador gráfico | `Ctrl+C`, `Ctrl+X`, `Ctrl+V` | os mesmos atalhos aparecem no Ubuntu Files |
| arquivos ocultos | atributo/opções de exibição | no GNOME Files, nome iniciado por `.` fica oculto |

## 9. O que a extensão diz — e o que ela não diz

Em `relatorio.pdf`, `.pdf` é a extensão do nome. Ela ajuda o sistema e os aplicativos a reconhecer o tipo esperado, mas **renomear uma extensão não converte o conteúdo**.

Trocar:

```text
foto.jpg
```

por:

```text
foto.png
```

altera o nome; não reescreve automaticamente os dados para o formato <abbr title="Portable Network Graphics">PNG</abbr>.

Esse contraste vale para a leitura de questões de Windows e também evita uma confusão geral: nome, extensão, formato interno e aplicativo de abertura são conceitos relacionados, mas diferentes.

## 10. Método de prova

Quando aparecer uma operação com arquivos, resolva nesta ordem:

1. **Ambiente:** Windows ou Linux? Qual interface foi explicitada?
2. **Objeto:** arquivo, diretório, atalho, link simbólico, lançador?
3. **Localização:** qual é o caminho de origem e de destino?
4. **Operação:** copiar, mover, renomear, excluir, criar referência?
5. **Intermediário:** houve área de transferência e colagem?
6. **Condição:** mesma unidade de armazenamento ou outro dispositivo? Há tecla modificadora?
7. **Resultado:** o original permanece? O alvo permanece? Surgiu cópia ou apenas referência?

> **Síntese:** em ambos os ambientes, aprenda primeiro a relação entre **objeto, caminho e operação**. Depois aplique as convenções próprias do Windows ou do Linux.
