---
schemaVersion: 1
title: "Noções de computação na nuvem"
description: "Como a nuvem entrega recursos, seus modelos de serviço e implantação e a divisão de responsabilidades."
order: 340
storageId: "per-u034"
---

## 1. O recurso continua em algum computador

Imagine, em um cenário hipotético, um órgão que recebe inscrições pela rede. A demanda aumenta perto do encerramento. Em vez de comprar computadores para o pico inteiro, a equipe solicita capacidade a um serviço e depois libera parte dela. Os candidatos usam a aplicação; não precisam saber em qual servidor cada solicitação foi processada.

**Computação em nuvem é uma forma de obter, pela rede, recursos computacionais de um conjunto compartilhado e configurável, com provisionamento e liberação rápidos.** Provisionar significa disponibilizar a capacidade solicitada, como processamento ou armazenamento. Os recursos continuam apoiados em equipamentos físicos; o consumidor acessa o serviço sem administrar necessariamente esses equipamentos.

O mecanismo é: o dispositivo envia uma solicitação pela rede; o serviço verifica as condições de acesso; o provedor atribui recursos para atendê-la; a resposta volta ao dispositivo. A distribuição do trabalho e a capacidade atribuída podem mudar sem que cada consumidor escolha um servidor físico. O provedor pode ser uma empresa externa ou uma estrutura da própria organização.

Para compreender uma oferta, separe três perguntas: **como os recursos são obtidos e ajustados; qual capacidade é entregue; quem pode usar aquela infraestrutura.** Elas conduzem, respectivamente, às características essenciais, aos modelos de serviço e aos modelos de implantação.

## 2. O que caracteriza a nuvem

O Instituto Nacional de Padrões e Tecnologia dos Estados Unidos, conhecido como <abbr title="National Institute of Standards and Technology — Instituto Nacional de Padrões e Tecnologia dos Estados Unidos">NIST</abbr>, reúne cinco características essenciais em sua definição de referência. No cenário das inscrições, elas funcionam assim:

- **Autosserviço sob demanda:** a equipe solicita recursos e o sistema os disponibiliza sem depender de atendimento humano do provedor a cada pedido. Isso não significa ausência de contrato ou de limites autorizados.
- **Amplo acesso pela rede:** o serviço oferece acesso por mecanismos padronizados, adequados a diferentes tipos de dispositivo. Não exige que todos usem a mesma máquina física; tampouco dispensa conexão e autorização.
- **Agrupamento de recursos:** o provedor reúne capacidade para atender vários consumidores e redistribui recursos conforme a demanda. Compartilhar infraestrutura não significa compartilhar livremente os dados: o serviço precisa separar os acessos de cada consumidor.
- **Elasticidade rápida:** a capacidade pode aumentar e diminuir acompanhando a necessidade. No pico das inscrições, recebe mais recursos; depois, libera o excedente. A aparência de grande capacidade disponível não significa recursos fisicamente infinitos.
- **Serviço mensurado:** o uso é medido, monitorado e controlado, permitindo transparência sobre o consumo. A medição pode apoiar cobrança e otimização; não obriga todo serviço a ser pago nem todo contrato a cobrar por unidade utilizada.

Um site acessível pela Internet, isoladamente, não demonstra essas cinco características. Da mesma forma, **guardar um arquivo em um computador remoto é uma utilização possível da nuvem, não a definição inteira**: ela também pode entregar processamento, plataformas e aplicações.

## 3. Modelos de serviço: até onde o consumidor administra?

No mesmo cenário hipotético, o órgão pode escolher diferentes níveis de serviço. A diferença está na capacidade entregue e nas camadas que ficam sob seu controle.

Se usar uma aplicação de inscrições pronta, o provedor opera a aplicação e a infraestrutura que a sustenta. O órgão usa suas funções, insere dados e ajusta as configurações permitidas, sem administrar o sistema operacional do servidor. É **software como serviço**, <abbr title="Software as a Service — software como serviço">SaaS</abbr>. Aplicações de correio e de armazenamento de arquivos também podem ser oferecidas nesse modelo.

Se desenvolver sua própria aplicação e a publicar em um ambiente fornecido pelo provedor, administra a aplicação, enquanto o provedor mantém a plataforma de execução e a infraestrutura subjacente. É **plataforma como serviço**, <abbr title="Platform as a Service — plataforma como serviço">PaaS</abbr>. A possibilidade de configurar o ambiente varia, mas o consumidor não passa a administrar o sistema operacional subjacente só porque escreveu o programa.

Se contratar processamento, armazenamento e rede para instalar seu sistema operacional e suas aplicações, recebe **infraestrutura como serviço**, <abbr title="Infrastructure as a Service — infraestrutura como serviço">IaaS</abbr>. Uma máquina virtual é um ambiente computacional implementado por software sobre equipamentos físicos. Nesse modelo, o consumidor pode administrar o sistema operacional desse ambiente; o provedor continua responsável pela infraestrutura física subjacente.

**Mais controle implica mais tarefas de administração.** Em <abbr title="Software as a Service — software como serviço">SaaS</abbr>, o consumidor usa a aplicação; em <abbr title="Platform as a Service — plataforma como serviço">PaaS</abbr>, controla a aplicação que publica; em <abbr title="Infrastructure as a Service — infraestrutura como serviço">IaaS</abbr>, controla também o sistema operacional que instala. Essas diferenças não transferem automaticamente todas as responsabilidades ao provedor.

## 4. Modelos de implantação: quem pode usar a infraestrutura?

Aqui, o critério é a destinação da infraestrutura, e não a camada entregue. Uma mesma aplicação pode operar sob diferentes modelos de implantação.

**Nuvem privada:** destinada exclusivamente a uma organização, que pode incluir várias unidades internas. Pode ser operada pela própria organização, por terceiros ou por uma combinação deles; pode estar dentro ou fora de suas instalações. Portanto, contratar um operador externo não torna a nuvem automaticamente pública.

**Nuvem comunitária:** destinada exclusivamente a uma comunidade de organizações com preocupações compartilhadas, como missão, requisitos de segurança ou políticas. O ponto decisivo é essa destinação comum. Duas organizações comprarem serviços do mesmo fornecedor, por si só, não constitui nuvem comunitária.

**Nuvem pública:** oferecida para uso do público em geral. “Pública” qualifica a oferta da infraestrutura; **não torna públicos os arquivos armazenados nela**. Uma organização pode contratar recursos de uma nuvem pública e restringir seus dados a contas autorizadas.

**Nuvem híbrida:** combina duas ou mais infraestruturas de nuvem distintas, que mantêm sua identidade e são conectadas por tecnologia que permite a portabilidade de dados e aplicações. No cenário hipotético, uma nuvem privada pode integrar-se a uma pública para deslocar parte da carga. Usar dois fornecedores sem essa integração não basta; um computador local que apenas abre uma aplicação remota também não demonstra uma nuvem híbrida.

Os critérios se cruzam: uma plataforma para publicar aplicações pode ser oferecida em uma nuvem privada. **<abbr title="Platform as a Service — plataforma como serviço">PaaS</abbr> e privada são classificações compatíveis**, porque respondem a perguntas diferentes.

## 5. Responsabilidade compartilhada

O modelo de serviço ajuda a identificar quem administra cada camada; o contrato e as configurações definem os detalhes. Em infraestrutura como serviço, por exemplo, o provedor cuida dos equipamentos físicos, enquanto o consumidor normalmente deve manter o sistema operacional e suas aplicações. Em software como serviço, a administração da aplicação passa ao provedor, mas o consumidor ainda precisa cuidar do uso que faz dela.

**Autenticação verifica a identidade; autorização determina o que essa identidade pode fazer.** Receber o endereço de um arquivo não equivale a obter permissão. Em um compartilhamento restrito a contas específicas, o destinatário precisa estar autorizado; acesso para leitura não implica acesso para edição.

O consumidor deve administrar as contas e permissões que estiverem sob seu controle, proteger suas credenciais e planejar como recuperar os dados. O **princípio do menor privilégio** recomenda conceder somente a capacidade necessária à tarefa: quem apenas consulta um documento não precisa poder alterá-lo ou administrar outras contas. Recursos de segurança e recuperação oferecidos pelo provedor precisam ser configurados e usados conforme as condições do serviço.

## 6. Arquivo remoto, sincronização e recuperação

Armazenamento remoto mantém o arquivo no serviço. **Sincronização procura refletir alterações entre locais.** Se o serviço reproduz exclusões, apagar o arquivo em uma pasta sincronizada pode apagá-lo também no destino remoto. Duas localizações atualizadas pela mesma exclusão não asseguram uma cópia recuperável.

**Backup é uma cópia de segurança destinada à recuperação.** A nuvem pode ser um destino de backup, mas a palavra “nuvem” não informa quais estados foram preservados nem como restaurá-los. Histórico de versões e lixeira, quando oferecidos, podem ajudar; sua utilidade depende da política de retenção, que estabelece por quanto tempo o conteúdo será conservado, e das condições de recuperação. É preciso verificar as cópias e a possibilidade de restauração.

Também não há acesso sem conexão garantido pelo simples fato de o arquivo estar na nuvem. Para trabalhar desconectado, é necessário ter o conteúdo disponível localmente e uma aplicação que permita esse uso. Ao reconectar, eventuais alterações precisam ser reconciliadas conforme o funcionamento do serviço. Uma referência ao arquivo remoto, sem o conteúdo local, não basta.

## 7. Reconhecer vantagens e condições

A nuvem pode permitir ajustar capacidade à demanda e reduzir tarefas de manutenção local. Esses ganhos dependem da oferta e do uso: não garantem menor custo total, disponibilidade contínua ou ausência de incidentes. Conectividade, desempenho, permissões, condições de saída do serviço e recuperação dos dados continuam relevantes.

Ao resolver uma questão, determine se ela pergunta pelas características, pela capacidade entregue ou pela destinação da infraestrutura. Depois examine quem controla a camada citada e quais condições de acesso e recuperação foram informadas.
