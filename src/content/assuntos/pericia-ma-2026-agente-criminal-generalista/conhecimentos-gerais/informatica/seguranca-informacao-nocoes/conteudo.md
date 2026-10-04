---
schemaVersion: 1
title: Segurança da informação
description: Princípios de proteção da informação, identidade e acesso, ameaças comuns, limites dos controles e recuperação após incidentes.
order: 350
storageId: per-u035
---

## 1. O que precisamos proteger?

Considere um relatório restrito, em uma situação hipotética. Uma pessoa sem permissão lê seu conteúdo; outra altera uma conclusão sem autorização; depois, uma falha impede a consulta durante o atendimento. São três problemas diferentes: **exposição, alteração indevida e indisponibilidade**. A segurança da informação procura evitar e tratar essas perdas, envolvendo pessoas, procedimentos, ambientes físicos e tecnologia. Um documento impresso deixado sobre a mesa também pode expor informação.

As três propriedades clássicas formam a **tríade** de segurança:

| Propriedade | Pergunta para analisar o caso | Falha correspondente |
|---|---|---|
| **Confidencialidade** | Quem pode conhecer a informação? | Acesso ou divulgação a quem não está autorizado. |
| **Integridade** | O conteúdo foi preservado contra alteração ou destruição indevida? | Adulteração, corrupção ou apagamento indevido. |
| **Disponibilidade** | Quem está autorizado consegue usar o recurso quando necessário? | Acesso interrompido ou insuficiente diante do requisito do serviço. |

Disponibilidade considera acesso **oportuno e confiável**. Um serviço cuja necessidade é contínua pode exigir operação ininterrupta; outro pode ter horário definido e manutenção prevista. A definição não impõe o mesmo funcionamento durante todas as horas do dia a qualquer sistema. Tornar um arquivo público também não é requisito de disponibilidade: o acesso pode continuar restrito a pessoas autorizadas.

Na integridade, observe o alcance da verificação. Comparar um arquivo com uma versão de referência pode indicar que seus **dados não mudaram**; isso não comprova que um nome ou uma medição já registrados correspondiam à realidade. Um erro de coleta ou digitação exige validação do conteúdo. Não se deve transformar uma verificação de preservação dos dados em prova automática de verdade factual.

Um incidente pode afetar várias propriedades. Se alguém copia dados restritos e altera registros, há exposição e adulteração. Se um programa malicioso bloqueia os arquivos, prejudica o acesso; se também os rouba, acrescenta exposição. Identifique os **efeitos descritos**, em vez de associar cada incidente a uma única propriedade obrigatória.

## 2. Identidade, permissões e confiança na origem

Uma pessoa apresenta credenciais, como uma senha, e o sistema verifica sua identidade: essa operação é **autenticação**. Em seguida, o sistema permite consultar certos relatórios, mas impede alterá-los: essa decisão envolve **autorização**, isto é, permissões para ações e recursos. Uma identidade autenticada não recebe automaticamente todos os acessos.

O **menor privilégio** concede apenas as permissões necessárias à função ou tarefa. Uma conta de consulta não precisa receber poderes de administração. Contas individuais e registros de atividade também ajudam a atribuir ações, sem garantir, por si sós, que toda ação seja legítima.

**Autenticidade** diz respeito à confiança na identidade ou origem declarada. É uma pergunta diferente de “o conteúdo está secreto?” ou “o serviço está acessível?”. Alguns referenciais a apresentam separadamente; outros relacionam autenticidade à integridade. Esses enquadramentos não tornam os conceitos sinônimos. Um documento pode ter origem identificada e ser público.

Senhas devem ser longas, difíceis de adivinhar e diferentes entre serviços. A **autenticação multifator** exige fatores de tipos distintos: algo que a pessoa **sabe**, como uma senha; algo que **possui**, como um dispositivo autenticador; ou algo que **é**, como uma característica biométrica. Duas senhas continuam sendo dois elementos do mesmo tipo. A existência de duas etapas não basta, isoladamente, para provar o uso de fatores distintos.

Mesmo com proteção adicional, não se deve fornecer códigos a um solicitante desconhecido nem aprovar uma solicitação de acesso que não se iniciou. A proteção depende do mecanismo e de seu uso; não torna qualquer conta imune a fraude.

## 3. Ameaça, vulnerabilidade e risco

Uma falha de energia, um erro humano ou uma tentativa de ataque pode causar dano: são exemplos de **ameaças**, circunstâncias ou eventos com potencial adverso. Uma senha previsível, um programa com falha não corrigida ou uma cópia sem proteção são **vulnerabilidades**, fragilidades que podem ser exploradas ou acionadas.

O **risco** relaciona a possibilidade de ocorrer um evento adverso às suas consequências. Não é o próprio ataque, nem apenas o número de falhas encontradas. A mesma fragilidade pode ter efeitos diferentes em um computador de treinamento e em um serviço essencial. Avaliar o contexto permite escolher controles proporcionais; não significa afirmar que toda ameaça se concretizará.

Um **controle** é uma medida usada para reduzir riscos ou seus efeitos. Restringir a entrada em uma sala é um controle físico; definir regras e treinar pessoas são controles administrativos; limitar permissões e filtrar conexões são controles técnicos. As categorias podem atuar juntas. A propriedade é o objetivo protegido; o controle é um meio de proteção.

## 4. Programas maliciosos: reconhecer o mecanismo

Um programa pode executar ações prejudiciais sem consentimento, como roubar informação, adulterar dados ou impedir seu uso. **Malware** é o termo para software ou código malicioso. “Vírus” designa uma família, não todo programa malicioso.

| Família ou função | Mecanismo que ajuda a identificá-la |
|---|---|
| **Vírus** | Insere-se em um programa ou arquivo hospedeiro; sua ativação depende da execução desse hospedeiro. |
| **Worm** | Programa autônomo capaz de se replicar e propagar entre sistemas, por exemplo pela rede, sem precisar infectar um arquivo hospedeiro para cada cópia. |
| **Trojan**, ou cavalo de Troia | Apresenta uma função útil ou aparentemente legítima, mas executa uma função maliciosa escondida. O disfarce não implica autorreplicação. |
| **Spyware** | Coleta informação sobre pessoas ou organizações de maneira oculta. Um **keylogger** malicioso registra teclas para capturar dados, como credenciais. |
| **Ransomware** | Bloqueia o acesso aos dados ou ao sistema, frequentemente por <abbr title="Transformação criptográfica que impede a leitura dos dados sem a chave adequada">cifragem</abbr>, e exige resgate. |
| **Bot e botnet** | Um bot malicioso permite controle remoto de um dispositivo; uma botnet reúne dispositivos comprometidos sob esse controle. Nem toda automação chamada “bot” é maliciosa. |

As descrições observam aspectos diferentes. Um aplicativo disfarçado pode ser um trojan e conter um keylogger. Uma mensagem enganosa pode convencer a pessoa a instalá-lo. A forma de convencer, o disfarce do programa e a função de captura podem coexistir.

Em ataques de ransomware com **dupla extorsão**, o atacante combina bloqueio dos dados com ameaça de divulgar informações roubadas. Recuperar arquivos não elimina automaticamente a exposição. O nome do malware tampouco permite concluir todos os efeitos do incidente: é preciso verificar o que aconteceu.

## 5. Fraude pode explorar a confiança sem instalar malware

Imagine uma mensagem que se passa pelo suporte e ameaça bloquear a conta. Ela conduz a uma página falsa na qual a pessoa entrega a senha. O mecanismo explora urgência, autoridade aparente e confiança: **engenharia social** é a manipulação de pessoas para obter informação ou induzir ações. **Phishing** é uma forma de fraude por comunicação eletrônica enganosa, frequentemente com falsa identidade e pedido de dados ou ação. A captura de credenciais pode ocorrer sem infecção do computador.

Antes de seguir um link, examine o endereço real, não apenas o texto exibido. No endereço hipotético `https://login.gov.br.exemplo.com/validar`, o **esquema** `https` indica a forma de acesso; o **host**, nome do serviço procurado, é `login.gov.br.exemplo.com`; e `/validar` é o caminho do recurso. O **domínio registrável** é a porção do nome que pode ser registrada sob as regras do registro correspondente: nesse exemplo, `exemplo.com`. Os **subdomínios** ficam subordinados a ele: `login.gov.br` à esquerda não o transforma em um domínio governamental. Palavras familiares podem ser usadas nessa posição para enganar.

**Pharming** envolve desvio técnico para um destino falso. Por exemplo, uma manipulação do <abbr title="Domain Name System — sistema de nomes de domínio">DNS</abbr>, que resolve nomes para endereços, pode levar um nome esperado a outro destino. O contraste é o mecanismo: no phishing, destaca-se o engano pela comunicação; no pharming, o redirecionamento técnico. Eles podem combinar-se em um ataque.

Pedidos sensíveis devem ser confirmados por um canal conhecido e independente da mensagem suspeita. Um telefone fornecido pelo próprio solicitante não é uma confirmação independente. Até uma conta verdadeira de fornecedor pode ter sido comprometida; a ausência de link ou anexo não demonstra legitimidade de um pedido de mudança bancária.

## 6. Combinar controles e conhecer seus limites

### 6.1. Atualização, antimalware e firewall

Atualizações de segurança corrigem vulnerabilidades conhecidas. Devem vir das fontes legítimas e seguir a política de manutenção; uma mensagem urgente que oferece uma “correção” não comprova sua autenticidade. Corrigir uma falha reduz uma via de ataque, sem garantir risco zero.

**Antimalware**, incluindo produtos chamados antivírus, procura detectar, bloquear ou tratar código malicioso. A detecção por **assinatura** compara padrões de ameaças conhecidas; depende de uma base atualizada. A **heurística** procura características suspeitas; a análise **comportamental** observa ações, como tentativas anormais de alterar arquivos. Essas técnicas podem se complementar e podem errar:

- **Falso positivo:** um item legítimo é marcado como ameaça.
- **Falso negativo:** uma ameaça passa sem ser detectada.

A **quarentena** restringe o uso normal de um objeto suspeito enquanto ele é avaliado ou tratado. Não equivale a apagá-lo definitivamente, nem demonstra que o computador inteiro está livre de infecção. Recuperar um arquivo da quarentena exige avaliação, não apenas necessidade de usá-lo.

Um **firewall** controla tráfego entre redes ou no próprio equipamento conforme regras. Pode impedir conexões não autorizadas; não se confunde com antimalware. Permitir uma conexão não certifica que a mensagem seja honesta, que o arquivo seja seguro ou que uma falha no programa tenha sido corrigida.

### 6.2. Criptografia, resumo e assinatura

**Cifrar** transforma dados em uma forma ininteligível sem a chave adequada. Quando o objetivo é impedir leitura indevida, a criptografia apoia a confidencialidade. Quem obtém o conteúdo após ele ser decifrado pode lê-lo; cifragem não resolve sozinha permissões excessivas, perda das chaves ou indisponibilidade.

Um **hash criptográfico** calcula um resumo de tamanho fixo a partir dos dados. Compará-lo com um resumo de referência confiável ajuda a detectar mudanças no conteúdo. O resumo não é uma cópia recuperável do arquivo e, sozinho, não identifica o autor. Se um atacante puder substituir tanto o arquivo quanto a referência, a comparação com essa referência adulterada não comprova preservação da versão original.

Uma **assinatura digital** usa técnicas criptográficas para permitir a verificação da origem associada ao signatário e da integridade dos dados assinados. É diferente de uma imagem de assinatura manuscrita. Não torna o conteúdo secreto por si só; sigilo requer proteção própria. A conclusão sobre autoria depende também da confiança nas chaves e no processo de uso, sem transformar o mecanismo em prova automática de verdade do conteúdo.

### 6.3. Recuperação e resposta

Uma **cópia de segurança**, ou backup, mantém dados para recuperação. Precisa ter conteúdo útil, proteção contra acessos e alterações indevidos e possibilidade de restauração verificada. Cópias segregadas do ambiente que pode ser comprometido reduzem a chance de uma única ocorrência atingir tudo. Uma cópia permanentemente acessível para escrita por uma conta comprometida pode ser alterada junto com os dados principais.

Sincronizar arquivos replica mudanças entre locais. Se exclusões ou arquivos cifrados forem propagados e não houver versões recuperáveis, essa réplica não oferece a recuperação necessária. Sincronização e redundância podem apoiar um serviço, mas é preciso avaliar a existência de um ponto de recuperação preservado. A mera indicação de que “há uma cópia” não garante restauração.

Diante de uma suspeita, comunicar o responsável e seguir o plano da instituição permite coordenar proteção, investigação e retorno do serviço. **Conter** o incidente procura limitar seus efeitos; **remover sua causa** e **recuperar** o ambiente são objetivos diferentes. Isolar um computador pode limitar propagação ou comunicação maliciosa, mas não elimina sozinho o programa instalado nem restaura a confiança nos dados.

As ações dependem do incidente, da continuidade necessária e da preservação de registros; não há uma ordem universal para o usuário executar por conta própria. Na análise de uma questão, pergunte: **qual efeito ocorreu, qual controle atua sobre ele e o que esse controle ainda não permite concluir?**
