---
schemaVersion: 1
title: "Backup e armazenamento em nuvem"
description: Procedimentos de cópia de segurança, recuperação e uso funcional de armazenamento em nuvem com OneDrive e Google Drive.
order: 26
storageId: backup-armazenamento-nuvem
---

## 1. Um arquivo sumiu: qual cópia realmente salva?

Imagine um cenário hipotético: às 12 h, uma pasta de trabalho é atingida por <abbr title="Programa malicioso que bloqueia ou criptografa dados para extorsão">ransomware</abbr>. A pasta estava sincronizada com a nuvem, então os arquivos criptografados também chegaram ao serviço remoto. Há ainda uma cópia feita às 11 h em outro local.

A pergunta útil não é “há uma cópia?”, mas **“consigo voltar ao estado correto, dentro do tempo necessário?”**. É esse problema que organiza o assunto.

**Backup** é uma cópia criada para permitir recuperação de dados, configurações, aplicações ou sistemas. **Restauração** é o uso dessa cópia para recuperar o que foi perdido ou danificado. Fazer o backup e conseguir restaurá-lo são etapas diferentes.

O armazenamento em nuvem pode participar dessa estratégia, mas **sincronização não é automaticamente backup**: se uma exclusão, corrupção ou criptografia for sincronizada, o erro pode se propagar.

Ao analisar uma questão, pense nesta sequência:

> o que recuperar → até qual momento → em quanto tempo → de qual cópia → com quais dependências → como comprovar que funciona.

---

## 2. Mecanismos parecidos, finalidades diferentes

Antes dos tipos de backup, separe mecanismos que costumam ser confundidos.

| Mecanismo | Para que serve | Limite principal |
|---|---|---|
| backup | manter cópia recuperável | depende de retenção, proteção e teste |
| <abbr title="Registro do estado de dados ou sistema em determinado instante">snapshot</abbr> | voltar a um estado pontual | pode depender do mesmo armazenamento |
| sincronização | manter alterações coerentes entre locais | pode propagar exclusão, corrupção e criptografia |
| replicação | manter outra instância atualizada | pode copiar também o estado incorreto |
| versionamento | conservar estados anteriores de um item | pode ter limites de prazo ou quantidade |
| arquivamento | preservar informação por longo prazo | não substitui recuperação operacional frequente |
| redundância | tolerar falha de componente | não cria necessariamente histórico independente |
| imagem de sistema | permitir reconstrução ampla | exige compatibilidade e procedimento de recuperação |

### 2.1 <abbr title="Registro do estado de dados ou sistema em determinado instante">Snapshot</abbr> e domínio de falha

Um <abbr title="Registro do estado de dados ou sistema em determinado instante">snapshot</abbr> pode ser rápido e útil. O problema é a **independência**. Se o <abbr title="Registro do estado de dados ou sistema em determinado instante">snapshot</abbr> e o volume original dependem do mesmo equipamento ou repositório, uma única falha pode atingir ambos.

Por isso, <abbr title="Registro do estado de dados ou sistema em determinado instante">snapshot</abbr> no mesmo <abbr title="Infraestrutura usada para armazenar dados">storage</abbr> não é, por si só, backup independente. Ele pode integrar uma estratégia de backup quando é preservado em domínio de falha separado.

### 2.2 <abbr title="Redundant Array of Independent Disks">RAID</abbr>, espelhamento e replicação

<abbr title="Redundant Array of Independent Disks">RAID</abbr> e espelhamento podem manter o serviço diante de certas falhas físicas. Isso é **disponibilidade**, não histórico de recuperação. Eles não impedem, por si sós, exclusão lógica, corrupção, alteração indevida ou <abbr title="Programa malicioso que bloqueia ou criptografa dados para extorsão">ransomware</abbr>.

### 2.3 Sincronização

Na sincronização, editar, renomear, mover ou excluir um arquivo em um local pode produzir a mesma mudança nos demais. Histórico de versões e lixeira podem ajudar, mas têm regras próprias de retenção. Portanto, “está na nuvem” e “está protegido por backup” não são afirmações equivalentes.

---

## 3. O objetivo de recuperação vem antes da tecnologia

Uma política de backup precisa responder pelo menos a quatro perguntas:

1. **o que** precisa ser recuperado;
2. **até que ponto no tempo** a perda é aceitável;
3. **em quanto tempo** o serviço precisa voltar;
4. **como** será comprovado que a recuperação funciona.

O escopo pode ser pequeno, como um arquivo, ou amplo, como um ambiente inteiro:

| Escopo | Exemplo de recuperação |
|---|---|
| arquivo | restaurar um documento excluído |
| pasta | recuperar um diretório completo |
| aplicação | recuperar dados, banco, configuração, chaves e dependências |
| volume | reconstruir uma unidade lógica |
| imagem de sistema | recuperar sistema operacional, aplicações e configurações |
| ambiente | reconstruir serviços, identidades, rede e dependências coordenadas |

Copiar apenas arquivos de dados pode não bastar para recuperar uma aplicação. Banco consistente, certificados, configurações, metadados, versões de software e procedimento de reinstalação também podem ser necessários.

### 3.1 Frequência, retenção e rotação

- **frequência**: intervalo entre execuções;
- **retenção**: tempo durante o qual cópias ou versões são preservadas;
- **rotação**: substituição planejada entre mídias ou gerações.

Não existe frequência universal. Quanto maior a criticidade e a taxa de alteração dos dados, menor tende a ser o intervalo aceitável entre pontos de recuperação.

Um modelo clássico de rotação é **avô–pai–filho**: cópias diárias, semanais e mensais ocupam gerações diferentes. Essa rotação não define, sozinha, tipo de backup, mídia, prazo legal nem objetivo de recuperação.

### 3.2 <abbr title="Recovery Point Objective">RPO</abbr>: quanto dado posso perder?

O <abbr title="Recovery Point Objective">RPO</abbr> é o objetivo de ponto de recuperação: indica a **perda máxima tolerável de dados medida no tempo**.

Exemplo hipotético: a falha ocorre às 12 h e o último ponto recuperável é das 11 h. A perda potencial é de uma hora. Se o <abbr title="Recovery Point Objective">RPO</abbr> era de duas horas, esse objetivo pode ter sido atendido.

### 3.3 <abbr title="Recovery Time Objective">RTO</abbr>: quanto tempo posso ficar parado?

O <abbr title="Recovery Time Objective">RTO</abbr> é o objetivo de tempo de recuperação: indica o tempo máximo previsto para restabelecer o serviço.

Se a falha das 12 h só é recuperada às 17 h, a recuperação levou cinco horas. Um <abbr title="Recovery Time Objective">RTO</abbr> de duas horas foi descumprido, ainda que o <abbr title="Recovery Point Objective">RPO</abbr> tenha sido atendido.

**Pegadinha central:** <abbr title="Recovery Point Objective">RPO</abbr> mede o ponto de dados aceitável; <abbr title="Recovery Time Objective">RTO</abbr> mede o tempo para voltar a operar.

---

## 4. Tipos de backup e cadeia de restauração

### 4.1 Completo

O **backup completo** copia todo o conjunto selecionado para aquela execução. Em regra, simplifica a restauração, mas exige mais tempo e espaço de cópia.

### 4.2 Incremental

O **incremental** copia as mudanças desde o backup anterior, seja ele completo ou incremental.

```text
Domingo: F0
Segunda: I1
Terça:   I2
Quarta:  I3
```

Para reconstruir o estado de quarta-feira, a cadeia é:

```text
F0 + I1 + I2 + I3
```

Se `I2` for perdido, `I3` não contém necessariamente as mudanças que estavam apenas em `I2`. A cadeia pode ficar incompleta.

### 4.3 Diferencial

O **diferencial** copia as mudanças desde o último backup completo.

```text
Domingo: F0
Segunda: D1
Terça:   D2
Quarta:  D3
```

Para reconstruir quarta-feira:

```text
F0 + D3
```

`D1` e `D2` não são necessários para esse estado, porque `D3` acumula as mudanças desde `F0`.

### 4.4 Comparação que vale memorizar depois de entender

| Critério | Completo | Incremental | Diferencial |
|---|---|---|---|
| copia | todo o escopo | desde o backup anterior | desde o último completo |
| execução | tende a ser maior | tende a ser menor | tende a crescer no ciclo |
| restauração | completo escolhido | completo + todos os incrementais necessários | completo + último diferencial |
| dependência de cadeia | menor | maior | intermediária |

“Mais rápido” e “menor” são tendências, não garantias absolutas: o resultado depende do volume de dados, tecnologia e implementação.

---

## 5. Classificação clássica do Windows e atributo de arquivo

Algumas questões adotam uma classificação clássica em que o **atributo de arquivo** indica que o item mudou desde determinado backup.

| Tipo | O que seleciona | Limpa o atributo após copiar? |
|---|---|---|
| Normal/Completo | todos | sim |
| Cópia | todos | não |
| Diário | alterados no dia | não |
| Incremental | itens marcados | sim |
| Diferencial | itens marcados | não |

Daí surgem três consequências frequentes em prova:

- o backup de **cópia** pode ser feito extraordinariamente sem alterar a sequência incremental/diferencial;
- depois de um incremental, o atributo tende a ser limpo;
- depois de um diferencial, ele permanece marcado.

Nem toda solução moderna usa esse mecanismo. Só aplique essa lógica quando a questão adotar a taxonomia clássica.

---

## 6. Onde guardar: independência, regra 3-2-1 e <abbr title="Programa malicioso que bloqueia ou criptografa dados para extorsão">ransomware</abbr>

Uma cópia em outra pasta do **mesmo disco** pode ajudar contra exclusão pontual, mas continua exposta à falha desse disco. A localização precisa reduzir o risco de uma única falha atingir original e cópia.

Quatro propriedades aparecem muito:

| Propriedade | Significado |
|---|---|
| <abbr title="Desconectado ou inacessível ao ambiente operacional normal">offline</abbr> | não permanece acessível ao ambiente operacional normal |
| <abbr title="Mantido fora do local físico principal">off-site</abbr> | fica fora do local físico principal |
| imutável | não pode ser alterado durante o período definido |
| criptografado | não pode ser lido sem a chave adequada |

<abbr title="Desconectado ou inacessível ao ambiente operacional normal">Offline</abbr> e <abbr title="Mantido fora do local físico principal">off-site</abbr> não são sinônimos. Uma cópia remota pode estar <abbr title="Mantido fora do local físico principal">off-site</abbr> e continuar conectada à rede.

### 6.1 Regra 3-2-1

Como heurística de separação, a regra 3-2-1 recomenda:

1. **3 cópias** dos dados — uma primária e dois backups;
2. **2 tipos de mídia**;
3. **1 cópia fora do local**.

Ela não define sozinha frequência, retenção, <abbr title="Recovery Point Objective">RPO</abbr>, <abbr title="Recovery Time Objective">RTO</abbr>, credenciais, imutabilidade nem teste de restauração.

### 6.2 Resiliência a <abbr title="Programa malicioso que bloqueia ou criptografa dados para extorsão">ransomware</abbr>

Uma estratégia resiliente pode combinar cópia <abbr title="Desconectado ou inacessível ao ambiente operacional normal">offline</abbr>, cópia <abbr title="Mantido fora do local físico principal">off-site</abbr>, armazenamento imutável, credenciais separadas, menor privilégio e testes regulares.

A cópia mais recente nem sempre é a correta: se o comprometimento começou antes do último backup, esse backup pode conter dados já afetados. A recuperação deve escolher um ponto confiável anterior ao incidente e evitar reintroduzir o problema no ambiente restaurado.

---

## 7. Um backup só vale o que consegue restaurar

A execução sem erro é evidência útil, mas insuficiente. O ciclo operacional inclui preparação, acompanhamento e validação.

Antes da cópia, defina escopo, dependências, destino, retenção, credenciais e consistência da aplicação. Depois, verifique falhas, itens ignorados, proteção contra alteração e integridade do conjunto.

### 7.1 <abbr title="Valor calculado para detectar alteração no conteúdo de dados">Checksum</abbr>

Um <abbr title="Valor calculado para detectar alteração no conteúdo de dados">checksum</abbr> pode indicar que os bytes mudaram. Ele não prova, sozinho, que:

- todos os arquivos necessários estão presentes;
- permissões e metadados foram preservados;
- a aplicação inicia corretamente;
- a cadeia incremental está completa;
- a versão é compatível;
- o <abbr title="Recovery Time Objective">RTO</abbr> será atendido.

### 7.2 Teste de restauração

Um teste útil verifica legibilidade, completude, cadeia de dependências, permissões, consistência, funcionamento e tempo. Restaurar um único arquivo pequeno não valida necessariamente a recuperação de uma aplicação ou ambiente complexo.

O ponto de restauração também depende do incidente:

| Incidente | Ponto mais adequado |
|---|---|
| exclusão recente | versão ou backup anterior à exclusão |
| corrupção antiga | ponto anterior ao início da corrupção |
| <abbr title="Programa malicioso que bloqueia ou criptografa dados para extorsão">ransomware</abbr> | cópia confiável anterior ao comprometimento |
| configuração incorreta | configuração e dados compatíveis |
| perda do equipamento | reconstrução do sistema + dados recuperáveis |

---

## 8. Armazenamento em nuvem: disponibilidade não é publicidade

**Armazenamento em nuvem** mantém dados em infraestrutura operada por um provedor, acessível por aplicações web, móveis ou clientes de sincronização. Pode oferecer acesso multidispositivo, compartilhamento, colaboração, versões e lixeira.

Isso não torna o conteúdo público. Acesso depende de identidade, permissões, política da organização e tipo de link.

Também existem dependências: conexão, cota, conta, licença, política administrativa, retenção do serviço e continuidade do provedor.

### 8.1 Permissões

| Escopo/papel | Efeito geral |
|---|---|
| pessoa específica | acesso associado a uma identidade ou grupo |
| organização | acesso limitado ao ambiente institucional |
| qualquer pessoa com o link | acesso amplo, quando a política permite |
| leitura | consultar |
| comentário | comentar sem edição plena |
| edição | alterar conforme permissões do serviço |

A regra de segurança é conceder apenas o acesso necessário e revogá-lo quando a finalidade terminar. Em ambientes institucionais, prefira conta e serviço autorizados, com classificação da informação, retenção e responsabilidade pela recuperação definidas.

Permissões de pasta podem alcançar itens contidos. Portanto, tentar restringir um arquivo isolado pode não superar uma permissão mais ampla herdada, conforme o modelo do serviço.

---

## 9. OneDrive: estado local, sincronização e recuperação

### 9.1 Arquivos Sob Demanda

No OneDrive, **Arquivos Sob Demanda** permite enxergar arquivos no Explorador de Arquivos sem manter todos integralmente no disco.

| Estado | Consequência |
|---|---|
| somente online | aparece no Explorador; economiza espaço local; precisa de rede para abrir |
| disponível localmente | já foi baixado e pode abrir sem conexão |
| sempre manter neste dispositivo | permanece baixado e ocupa espaço local |

**Liberar espaço** remove a cópia integral local, mantendo o item no OneDrive. **Excluir** é outra ação: a exclusão pode ser sincronizada para os demais locais.

### 9.2 Histórico, lixeira e restauração integral

Há três mecanismos diferentes:

- **histórico de versões**: volta um arquivo a versão anterior;
- **lixeira**: recupera itens excluídos enquanto ainda retidos;
- **Restaurar seu OneDrive**: desfaz em massa ações ocorridas nos arquivos e pastas.

Na documentação da Microsoft consultada em 2026, **Restaurar seu OneDrive** está disponível para assinantes Microsoft 365 e permite desfazer ações dos últimos **30 dias**. Arquivos criados depois do ponto escolhido são enviados à lixeira durante a restauração. Esses recursos ajudam na recuperação, mas não substituem automaticamente uma política independente de backup.

---

## 10. Google Drive: <abbr title="Acesso a arquivos mantidos principalmente na nuvem, baixados conforme necessário">streaming</abbr>, espelhamento e continuidade institucional

### 10.1 <abbr title="Acesso a arquivos mantidos principalmente na nuvem, baixados conforme necessário">Streaming</abbr> e espelhamento

O Google Drive para computador oferece dois modelos principais para **Meu Drive**:

| Pergunta | <abbr title="Acesso a arquivos mantidos principalmente na nuvem, baixados conforme necessário">Streaming</abbr> | Espelhamento |
|---|---|---|
| onde ficam principalmente | nuvem | nuvem e disco local |
| uso de espaço local | reduzido | cópia local completa |
| acesso sem conexão | itens preparados para uso <abbr title="Sem conexão de rede">offline</abbr> | arquivos locais disponíveis |
| mudanças sincronizadas | sim | sim |
| backup independente | não automaticamente | não automaticamente |

O espelhamento melhora disponibilidade local, mas continua sincronizando mudanças. Se um arquivo for excluído e a exclusão for sincronizada, a cópia local não funciona como histórico independente.

A documentação atual também distingue o suporte por origem: **Meu Drive** pode usar <abbr title="Acesso a arquivos mantidos principalmente na nuvem, baixados conforme necessário">streaming</abbr> ou espelhamento; drives compartilhados usam <abbr title="Acesso a arquivos mantidos principalmente na nuvem, baixados conforme necessário">streaming</abbr>.

### 10.2 Meu Drive e drives compartilhados

Em **Meu Drive**, papéis comuns incluem Leitor, Comentador, Editor e Proprietário. O conteúdo está ligado à conta proprietária e às regras do serviço.

Em **drives compartilhados**, os arquivos pertencem ao espaço da equipe, não a uma pessoa específica. Isso favorece continuidade institucional quando alguém deixa a organização.

Papéis usuais incluem:

- Leitor;
- Comentador;
- Colaborador;
- Administrador de conteúdo;
- Administrador.

Os poderes concretos dependem da edição e da política administrativa.

---

## 11. A nuvem pode ser destino de backup — mas não por mágica

Não há contradição entre dizer “sincronização não é backup” e “a nuvem pode receber backups”. A classificação depende do **mecanismo**.

| Situação | Como interpretar |
|---|---|
| arquivo enviado deliberadamente como cópia recuperável | pode ser backup |
| pasta de trabalho sincronizada | sincronização |
| serviço especializado com agenda, retenção e restauração próprias | pode implementar backup |
| espelhamento local/nuvem | disponibilidade e sincronização, sem independência automática |

Para decidir se há proteção de backup, verifique independência, retenção, versionamento, imutabilidade, credenciais, propagação de exclusões e teste de restauração.

---

## 12. Casos que organizam as pegadinhas

### Caso 1 — <abbr title="Registro do estado de dados ou sistema em determinado instante">snapshot</abbr> perdido junto com o servidor

Uma máquina virtual tinha <abbr title="Registros do estado de dados ou sistema em determinados instantes">snapshots</abbr> no mesmo equipamento que falhou.

**Leitura:** havia pontos de retorno, mas não independência de falha. O problema não é o nome do recurso; é onde ele estava preservado.

### Caso 2 — <abbr title="Programa malicioso que bloqueia ou criptografa dados para extorsão">ransomware</abbr> em pasta sincronizada

Arquivos locais foram criptografados e a alteração chegou à nuvem.

**Leitura:** a sincronização funcionou como projetado. A recuperação depende de versão anterior, restauração integral ou backup separado confiável.

### Caso 3 — cadeia incremental incompleta

```text
F0 + I1 + I2 + I3
```

Sem `I2`, `I3` não recompõe necessariamente as mudanças ausentes. Em uma cadeia diferencial, `F0 + D3` basta para o estado representado por `D3`.

### Caso 4 — <abbr title="Recovery Point Objective">RPO</abbr> atendido, <abbr title="Recovery Time Objective">RTO</abbr> descumprido

Foram perdidos apenas 30 minutos de dados, mas o serviço levou oito horas para voltar.

**Leitura:** a perda de dados pode estar dentro do <abbr title="Recovery Point Objective">RPO</abbr>, enquanto o tempo de indisponibilidade ultrapassa o <abbr title="Recovery Time Objective">RTO</abbr>.

### Caso 5 — continuidade no Google Drive

Documentos críticos estavam no Meu Drive de uma pessoa que deixou o órgão.

**Leitura:** o problema é de governança e continuidade. Um drive compartilhado, quando disponível e administrado institucionalmente, reduz a dependência de uma conta individual.

---

## 13. Como resolver questões deste assunto

1. Descubra **o que** precisa ser recuperado.
2. Identifique o ponto de dados exigido e o tempo de retorno: <abbr title="Recovery Point Objective">RPO</abbr> versus <abbr title="Recovery Time Objective">RTO</abbr>.
3. Diferencie completo, incremental e diferencial e monte a cadeia de restauração.
4. Se aparecer a taxonomia clássica do Windows, observe o atributo de arquivo.
5. Pergunte se a cópia compartilha o mesmo domínio de falha do original.
6. Separe backup, <abbr title="Registro do estado de dados ou sistema em determinado instante">snapshot</abbr>, sincronização, replicação e <abbr title="Redundant Array of Independent Disks">RAID</abbr>.
7. Em nuvem, confira estado local, permissão, retenção, versionamento e propagação de alterações.
8. Desconfie de absolutos como “sempre”, “ilimitado”, “qualquer link” e “sincronização já é backup”.

O mapa mental é simples: **recuperação exige uma cópia adequada, no ponto correto, independente o suficiente e comprovadamente restaurável**.
