---
schemaVersion: 1
title: "Sistema operacional e software"
description: "Função do sistema operacional, relação com hardware e aplicativos, software de sistema e de aplicação, firmware, arquivos, processos, interfaces, instalação e associações."
order: 40
storageId: "seap-u040"
---

# Sistema operacional e software: quem coordena, quem executa e onde os dados ficam

Quando você abre um editor de texto, salva um arquivo e manda imprimi-lo, há camadas diferentes trabalhando juntas:

- o **hardware** executa fisicamente as operações;
- o **sistema operacional** administra recursos e oferece serviços comuns;
- o **aplicativo** realiza a tarefa escolhida pelo usuário;
- os **arquivos** guardam dados e configurações;
- alguns dispositivos possuem **firmware**, software armazenado no próprio equipamento para controlar funções básicas.

O erro mais comum em prova é trocar o papel dessas camadas.

> **Pergunta-guia:** quem está administrando o computador, quem está realizando a tarefa e onde a informação está armazenada?

## 1. O que é um sistema operacional

Sistema operacional é o conjunto de software que:

- gerencia recursos de hardware;
- coordena execução de programas;
- oferece serviços comuns aos aplicativos;
- administra memória, armazenamento, dispositivos e entrada/saída;
- fornece meios de interação com usuário e programas.

Windows e distribuições Linux são exemplos de ambientes baseados em sistemas operacionais.

O sistema operacional **não é**:

- o computador físico;
- um único aplicativo;
- o gerenciador de arquivos;
- um documento salvo.

O gerenciador de arquivos é um programa que usa serviços do sistema operacional para navegar e operar sobre arquivos e pastas.

## 2. Hardware, software e firmware

### Hardware

São os componentes físicos:

- processador;
- memória;
- unidade de armazenamento;
- teclado;
- tela;
- impressora;
- interfaces de rede.

### Software

São programas e dados executados ou utilizados pelo sistema computacional.

Uma classificação didática útil é:

- **software de sistema:** sustenta o funcionamento geral do computador;
- **software de aplicação:** executa tarefas voltadas ao usuário.

### Firmware

Firmware é software armazenado no próprio hardware, normalmente voltado ao controle básico do dispositivo.

Pegadinha:

> firmware é software; não é sinônimo de peça física.

## 3. Sistema operacional × aplicativo

Compare:

| Situação | Camada principal |
| --- | --- |
| distribuir tempo de processador entre programas | sistema operacional |
| controlar uso da memória | sistema operacional |
| organizar acesso a arquivos/dispositivos | sistema operacional |
| escrever um relatório | aplicativo |
| editar uma imagem | aplicativo |
| navegar na Web | aplicativo navegador |

O aplicativo depende de serviços do sistema operacional, mas isso não transforma os dois em uma única coisa.

## 4. Interface gráfica não é o sistema inteiro

Janelas, ícones, menus e área de trabalho são meios de interação.

Eles ajudam o usuário a acessar recursos, mas:

> interface gráfica ≠ totalidade do sistema operacional.

Também podem existir:

- interfaces de linha de comando;
- serviços executados em segundo plano;
- componentes sem janela visível.

Uma questão que reduz o sistema operacional apenas à “tela inicial” está errada.

## 5. Programa instalado, processo e arquivo executável

Esses conceitos também não são iguais.

### Programa

Conjunto de instruções e recursos de software armazenados.

### Processo

Instância de um programa em execução.

Um mesmo programa pode originar mais de um processo, conforme o sistema e o modo de uso.

### Arquivo executável

Arquivo que contém código ou instruções capazes de participar da execução de um programa.

Pegadinha:

> fechar uma janela pode encerrar um processo, mas não “desinstala” o programa nem apaga seus arquivos.

## 6. Multitarefa e recursos compartilhados

Sistemas operacionais modernos permitem que vários programas aparentem executar ao mesmo tempo.

O sistema coordena recursos como:

- processador;
- memória;
- armazenamento;
- dispositivos.

Quando um programa consome muita memória ou processamento, outros podem perder desempenho. Isso é disputa por recurso, não prova de que o sistema “deixou de ser multitarefa”.

## 7. Arquivos e pastas: o mínimo necessário aqui

Arquivo é uma unidade de dados identificada por nome e localização.

Pasta ou diretório organiza arquivos e outros diretórios.

O **caminho** localiza o item na hierarquia.

Dois arquivos podem ter o mesmo nome se estiverem em caminhos diferentes.

A unidade doadora aprofunda Windows e Linux; nesta unidade SEAP, o ponto é apenas entender que o sistema operacional fornece serviços de organização e acesso ao armazenamento.

## 8. Copiar, mover e criar referência

Três efeitos diferentes:

| Ação | Resultado |
| --- | --- |
| copiar | origem permanece e surge outro item |
| mover | item muda de localização |
| criar atalho/referência | surge um caminho de acesso ao alvo, sem duplicar necessariamente o conteúdo |

A área de transferência pode participar das operações de copiar e recortar.

Copiar para a área de transferência não significa que o novo arquivo já existe no destino antes da colagem.

## 9. Extensão, formato e aplicativo associado

Em um nome como:

`relatorio.pdf`

`.pdf` é a extensão.

A extensão ajuda o sistema a identificar o tipo esperado e escolher um aplicativo associado.

Mas:

> renomear uma extensão não converte o conteúdo do arquivo.

Trocar `.jpg` por `.png` no nome não reescreve automaticamente os dados no novo formato.

## 10. Instalação e desinstalação

**Instalar** um aplicativo normalmente envolve disponibilizar arquivos, configurações e registros necessários para que ele possa ser executado adequadamente.

**Desinstalar** remove o aplicativo segundo o mecanismo do sistema ou do próprio programa.

Não confunda:

- apagar um atalho;
- apagar um único arquivo;
- desinstalar o programa.

Eliminar um atalho da área de trabalho não significa remover o aplicativo.

## 11. Aplicativo padrão e associação

O sistema pode associar um tipo de arquivo a um aplicativo padrão.

Isso significa que, ao abrir aquele tipo, o sistema tenta usar o aplicativo associado.

Alterar a associação:

- muda qual programa é usado por padrão;
- não converte automaticamente o arquivo;
- não altera necessariamente seu conteúdo.

## 12. Drivers: ponte com o dispositivo

Um **driver**, software que permite ao sistema operacional controlar determinado dispositivo, fornece a interface necessária entre o sistema e o hardware.

Exemplo hipotético:

- sistema operacional solicita uma operação;
- driver traduz a operação para o dispositivo;
- hardware executa.

A configuração específica de impressoras pertence à U046. Aqui basta entender a função do driver.

## 13. Atualização não é reinstalação completa por definição

Atualizações podem:

- corrigir falhas;
- substituir componentes;
- adicionar compatibilidade ou recursos;
- alterar versões de arquivos.

Isso não significa necessariamente remover todo o sistema e instalá-lo do zero.

Em prova, desconfie de palavras como **sempre** e **obrigatoriamente** quando o comportamento depende do mecanismo de atualização.

## 14. Windows e Linux: o que importa neste recorte

O doador trabalha detalhes de caminhos e gerenciadores em Windows/Linux. Para a SEAP, retenha somente:

- ambos são ambientes em que o sistema operacional gerencia recursos e oferece serviços;
- convenções de caminhos e interfaces podem diferir;
- aplicações dependem do sistema e das bibliotecas/serviços disponíveis;
- um conceito geral de sistema operacional não deve ser confundido com a aparência específica de uma plataforma.

## 15. Método de prova

Quando aparecer um item de Informática:

1. **identifique a camada:** hardware, sistema, aplicativo, firmware ou dado;
2. **identifique a ação:** executar, armazenar, gerenciar, abrir, copiar, mover, instalar;
3. **separe objeto e referência:** arquivo real, atalho, extensão, associação;
4. **teste a consequência:** o conteúdo mudou, a localização mudou ou só o acesso mudou?;
5. **rejeite universalizações** que o enunciado não sustenta.

## 16. Pegadinhas finais

- sistema operacional ≠ gerenciador de arquivos;
- interface gráfica ≠ sistema inteiro;
- programa instalado ≠ processo em execução;
- firmware é software;
- apagar atalho ≠ desinstalar;
- mudar extensão ≠ converter formato;
- mudar aplicativo padrão ≠ mudar conteúdo;
- copiar ≠ mover;
- driver faz a ponte sistema-dispositivo, mas configuração de impressora é assunto próprio.
