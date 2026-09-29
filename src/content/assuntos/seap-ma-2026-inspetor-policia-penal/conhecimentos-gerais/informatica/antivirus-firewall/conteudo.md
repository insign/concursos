---
schemaVersion: 1
title: "Antivírus e firewall"
description: "Funções, métodos de detecção, atualização, quarentena, falsos positivos e negativos, firewall de host e de rede e limites das camadas de proteção."
order: 44
storageId: "seap-u044"
---

# Antivírus e firewall: duas camadas, dois problemas

Antivírus e firewall não são sinônimos. Uma forma rápida de separar as funções é perguntar **o que está sendo controlado**:

- **antivírus/antimalware:** arquivos, programas e comportamentos suspeitos;
- **firewall:** comunicações de rede permitidas ou bloqueadas segundo regras.

Um computador pode ter firewall ativo e ainda conter código malicioso; também pode ter antivírus e continuar exposto a conexões indevidas se a política de rede estiver inadequada.

## 1. O que o antivírus procura

Produtos atuais costumam funcionar como **antimalware**, cobrindo mais do que vírus clássicos. Entre os mecanismos de detecção estão:

| Método | Ideia central | Limite |
|---|---|---|
| assinatura | procura padrão conhecido | depende de conhecimento e atualização |
| heurística | procura indícios e estruturas suspeitas | pode gerar falso positivo |
| comportamento | observa ações executadas | pode reagir após alguma atividade |
| reputação | considera origem, prevalência e histórico | depende das informações disponíveis |

Por isso, **atualizar o produto** importa: assinaturas, mecanismos e componentes podem receber novas informações e correções. Atualização, porém, não significa detecção perfeita.

**Falso positivo** é classificar um item legítimo como ameaça. **Falso negativo** é deixar de detectar uma ameaça existente.

## 2. Verificação e quarentena

Uma solução de proteção pode examinar arquivos no acesso, em verificações agendadas ou quando o usuário inicia uma varredura, conforme produto e configuração.

Quando um objeto é colocado em **quarentena**, ele é isolado para impedir seu uso normal. Quarentena não significa:

- exclusão definitiva;
- confirmação absoluta de que o item é malicioso;
- reparo automático de qualquer alteração já feita no sistema.

Se o item for um falso positivo, a política do produto pode permitir restauração; se for confirmado como ameaça, pode haver remoção. A decisão depende do contexto e das permissões.

## 3. Firewall controla tráfego

O firewall compara comunicações com regras e decide permitir, bloquear ou registrar tráfego. O alcance pode variar:

- **firewall de host:** protege o próprio computador;
- **firewall de rede:** protege uma fronteira ou segmento de rede.

Uma regra pode considerar endereços, protocolos, portas e direção da comunicação, entre outros elementos disponíveis ao mecanismo.

### Sem estado e com estado

Um filtro **sem estado** avalia pacotes individualmente segundo os campos e as regras configuradas.

Um firewall **com estado** acompanha o contexto de conexões. Isso permite distinguir, por exemplo, uma resposta pertencente a uma conexão já estabelecida de uma nova tentativa iniciada externamente.

Há ainda mecanismos de aplicação ou <abbr title="Programa intermediário que recebe e encaminha comunicações em nome de outro">proxy</abbr>, capazes de interpretar elementos de protocolos específicos quando seu desenho e sua configuração permitem.

## 4. O que o firewall não faz

Firewall é uma camada importante, mas não é um limpador universal do computador. Ele não:

- remove automaticamente malware já armazenado;
- corrige vulnerabilidades dos programas;
- garante que todo tráfego permitido seja benigno;
- substitui antimalware, atualização ou cópia de segurança.

Da mesma forma, antivírus não substitui uma política de rede. O valor está na **complementaridade**.

## 5. Defesa em camadas

Um modelo simples de prova é:

| Risco | Controle que ajuda |
|---|---|
| código malicioso conhecido ou suspeito | antivírus/antimalware |
| comunicação indevida | firewall |
| falha conhecida de programa | atualização/correção |
| perda de dados | cópia de segurança |

Essas relações não são garantias absolutas. Cópia de segurança ajuda na recuperação, mas não impede infecção; atualização reduz exposição a falhas conhecidas, mas não substitui firewall; firewall limita tráfego, mas não apaga código do disco.

## 6. Como resolver questões

1. identifique o objeto: arquivo/comportamento ou tráfego;
2. se houver detecção de código, pense em antimalware;
3. se houver porta, conexão, entrada/saída ou regra de comunicação, pense em firewall;
4. diferencie **isolar** de **excluir**;
5. desconfie de palavras como “garante”, “sempre”, “remove tudo” e “substitui”.

A ideia central é: **antimalware detecta e reage a código/comportamento; firewall controla comunicações**.