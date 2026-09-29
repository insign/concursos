# Configuração de impressoras — revisão rápida

## Camadas

impressora → dispositivo  
driver → permite ao Windows controlá-la  
padrão → preferência de seleção  
fila → trabalhos aguardando  
<abbr title="Serviço do Windows que gerencia trabalhos de impressão">spooler</abbr> → serviço que gerencia trabalhos/fila

## Não confunda

adicionar impressora ≠ enviar trabalho  
remover impressora ≠ cancelar trabalho  
padrão ≠ online  
cancelar fila ≠ atualizar driver  
reiniciar spooler ≠ corrigir defeito físico

## Diagnóstico

dispositivo → conexão → impressora escolhida → fila → spooler → driver → preferências

## Gatilhos

- não encontrada → instalação/conexão/driver;
- trabalho preso → fila/spooler;
- recurso ausente → capacidade/driver;
- imprime na errada → padrão/seleção;
- driver incompatível → atualizar pelo Windows Update ou fabricante adequado.

**Padrão escolhe; driver controla; fila organiza; spooler gerencia.**