---
schemaVersion: 1
title: "Configuração de impressoras"
description: "Instalação e remoção de impressoras, driver, impressora padrão, fila e trabalhos de impressão, spooler, conexões e diagnóstico básico no Windows."
order: 46
storageId: "seap-u046"
---

# Configuração de impressoras: dispositivo, driver e fila

Quando uma impressão falha, três coisas diferentes podem estar envolvidas:

**impressora instalada → driver compatível → trabalho na fila**

A impressora é o dispositivo; o **driver** é o software que permite ao sistema operacional controlá-la; a **fila de impressão** contém os trabalhos enviados e ainda não concluídos. Misturar essas camadas gera muitas alternativas erradas.

## 1. Adicionar e remover uma impressora

No Windows atual, impressoras diretamente conectadas podem ser detectadas e instaladas automaticamente. Em **Configurações → Bluetooth e dispositivos → Impressoras e scanners**, é possível procurar e adicionar dispositivos. Se a detecção automática falhar, há fluxo de adição manual.

A conexão pode ser direta, como por cabo <abbr title="Universal Serial Bus">USB</abbr>, ou usar rede ou Bluetooth, conforme o equipamento.

**Adicionar** uma impressora registra o dispositivo e os componentes necessários no sistema. **Remover** retira aquela impressora da lista de dispositivos configurados. Nenhuma dessas ações é a mesma coisa que cancelar um trabalho já enviado a outra impressora.

## 2. Driver: tradução entre sistema e equipamento

Todo dispositivo precisa de software compatível para ser controlado pelo sistema. O driver da impressora traduz as solicitações do Windows para as capacidades do equipamento.

Na maioria dos casos, o Windows instala um driver adequado automaticamente. A Microsoft recomenda o Windows Update como caminho preferencial para obter ou atualizar drivers de impressora; quando necessário, também pode ser usado o driver disponibilizado pelo fabricante para o modelo correto.

Um driver incompatível ou desatualizado pode causar:

- impressora não reconhecida;
- recursos indisponíveis;
- falhas ao enviar trabalhos;
- travamentos ou problemas do serviço de impressão.

**Driver não é fila.** Atualizar driver não apaga, por definição, a lista de trabalhos; cancelar trabalhos não instala um driver novo.

## 3. Impressora padrão

A **impressora padrão** é a selecionada automaticamente quando um programa não recebe escolha diferente.

O Windows permite duas lógicas:

- escolher manualmente uma impressora específica como padrão;
- permitir que o Windows gerencie a padrão, podendo selecionar a última impressora usada conforme a configuração.

Definir uma impressora como padrão **não a torna fisicamente disponível** nem corrige cabo, rede, papel ou driver. É apenas uma preferência de seleção.

## 4. Preferências e propriedades

Configurações de impressão podem envolver opções como:

- orientação retrato/paisagem;
- tamanho do papel;
- qualidade;
- cores ou escala de cinza;
- impressão frente e verso, quando o hardware suporta;
- bandeja de papel.

A disponibilidade varia conforme impressora e driver.

As **preferências de impressão** tratam principalmente de como o trabalho será produzido. **Propriedades da impressora** podem expor elementos do dispositivo e do driver, como recursos, compartilhamento ou portas, conforme versão e modelo. Não memorize uma guia específica sem o ambiente da questão.

## 5. Fila e trabalho de impressão

Ao mandar imprimir, o documento gera um **trabalho de impressão**. Os trabalhos aguardam processamento na **fila**.

Na fila, conforme o contexto e a permissão, pode ser possível:

- acompanhar estado;
- pausar ou retomar;
- cancelar um trabalho;
- verificar qual documento está bloqueando os seguintes.

Cancelar um trabalho interrompe aquele envio; **não remove a impressora instalada**.

Se um trabalho travado permanece na fila, a própria fila deve ser examinada antes de concluir que o dispositivo está quebrado.

## 6. Spooler de impressão

O **Spooler de Impressão** é o serviço do Windows que gerencia trabalhos de impressão e sua fila.

Quando o serviço falha, sintomas possíveis incluem:

- trabalhos presos;
- fila que não avança;
- aplicativos aguardando a impressão;
- impressora configurada que não recebe novos trabalhos.

A documentação da Microsoft orienta, em problemas compatíveis, limpar trabalhos travados e reiniciar o serviço. Reiniciar o spooler pode resolver falhas temporárias, mas **não corrige automaticamente um driver incompatível nem um problema físico da impressora**.

## 7. Roteiro de diagnóstico

Em questão prática, siga a ordem:

1. **dispositivo:** está ligado e disponível?
2. **conexão:** cabo, Bluetooth ou rede está funcional?
3. **seleção:** o trabalho foi enviado à impressora correta?
4. **fila:** existe trabalho pausado ou travado?
5. **serviço:** o spooler está funcionando?
6. **driver:** é compatível e está atualizado?
7. **configuração:** papel, orientação e recursos estão coerentes?

O erro mais comum é aplicar a solução à camada errada. **Padrão escolhe; driver controla; fila organiza; spooler gerencia os trabalhos.**