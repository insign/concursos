---
schemaVersion: 1
title: Backup e armazenamento em nuvem
description: Procedimentos de cópia de segurança, recuperação e uso funcional de armazenamento em nuvem com OneDrive e Google Drive.
order: 26
storageId: tec-backup-armazenamento-nuvem
---

## 1. Recorte do assunto

Este assunto reúne dois pontos relacionados do edital:

- **procedimentos de cópia de segurança (backup)**;
- **armazenamento em nuvem**, com conceitos e aplicações do Microsoft OneDrive e do Google Drive.

O vínculo entre eles é a preservação e a disponibilidade de dados. Entretanto, sincronizar ou armazenar um arquivo na nuvem não cria automaticamente uma política completa de backup.

Recursos, nomes de comandos, prazos e limites comerciais podem variar conforme conta, licença, sistema operacional, versão do aplicativo e política administrativa. Em prova, prefira afirmações condicionadas ao ambiente.

> **Roteiro de resolução:** objetivo de recuperação → escopo → ponto no tempo → tipo de cópia → localização/proteção → cadeia de restauração → teste → permissão e retenção.

---

## 2. Backup, restauração e objetivo de recuperação

**Backup** é uma cópia destinada à recuperação de dados, aplicações, configurações ou sistemas. Seu valor não está apenas em existir, mas em poder ser lida e restaurada no prazo necessário.

**Restauração** é o processo de recuperar o conteúdo a partir da cópia. Criar o backup e conseguir restaurá-lo são etapas diferentes.

Uma política útil responde a quatro perguntas:

1. o que precisa ser recuperado;
2. até que ponto no tempo;
3. em quanto tempo;
4. como se comprova que a recuperação funciona.

### 2.1 Escopos de recuperação

| Escopo | Exemplo |
|---|---|
| arquivo | restaurar um documento excluído |
| pasta | recuperar um diretório completo |
| aplicação | recuperar dados, banco, configuração, chaves e dependências |
| volume | reconstruir uma unidade lógica |
| imagem de sistema | recuperar sistema operacional, aplicações e configurações |
| ambiente | reconstruir serviços, identidades, rede e dependências coordenadas |

Copiar somente os arquivos de dados pode ser insuficiente para recuperar uma aplicação. Banco consistente, certificados, configurações, metadados, versões de software e procedimento de reinstalação também podem ser necessários.

---

## 3. Conceitos que não são sinônimos

| Mecanismo | Finalidade | Limitação |
|---|---|---|
| backup | preservar cópia recuperável | exige retenção, proteção e teste |
| snapshot | registrar estado de volume ou sistema em um instante | pode depender do mesmo armazenamento |
| sincronização | manter alterações coerentes entre locais | pode propagar exclusão e corrupção |
| replicação | manter outra instância atualizada | pode replicar o estado incorreto |
| versionamento | manter estados anteriores de um item | quantidade e prazo podem ser limitados |
| arquivamento | preservar informação por longo prazo | não substitui recuperação operacional frequente |
| redundância | tolerar falha de componente | não cria necessariamente histórico independente |
| imagem de sistema | permitir reconstrução ampla | requer compatibilidade e procedimento de recuperação |

### 3.1 Snapshot

Snapshot pode ser rápido e útil para retorno a um estado anterior. Porém, se ficar no mesmo equipamento ou armazenamento do volume original, pode compartilhar o mesmo domínio de falha.

> Snapshot no mesmo storage não é automaticamente backup independente.

Ele pode integrar uma estratégia de backup quando é exportado, replicado ou preservado em domínio de falha separado.

### 3.2 RAID, espelhamento e replicação

RAID e espelhamento aumentam disponibilidade diante de determinadas falhas físicas. Não protegem, por si sós, contra:

- exclusão;
- corrupção;
- alteração indevida;
- ransomware;
- falha lógica da aplicação;
- perda do equipamento inteiro.

### 3.3 Sincronização

A sincronização pode refletir em todos os locais:

- edição;
- renomeação;
- movimentação;
- exclusão;
- criptografia maliciosa.

Lixeira e versões ajudam, mas possuem condições e retenção próprias.

---

## 4. Planejamento: frequência, retenção, RPO e RTO

### 4.1 Política de backup

A política deve definir:

- dados, aplicações e configurações abrangidos;
- responsáveis pela execução, guarda e restauração;
- frequência e horários;
- tipos de backup;
- destinos, mídias e localização;
- retenção e rotação;
- credenciais e controles de acesso;
- proteção contra alteração;
- monitoramento e tratamento de falhas;
- testes de restauração;
- descarte ou arquivamento final.

### 4.2 Frequência, retenção e rotação

| Termo | Significado |
|---|---|
| frequência | intervalo entre execuções |
| retenção | tempo de conservação de cópias ou versões |
| rotação | substituição planejada entre mídias ou gerações |

Não existe frequência universal. Dados críticos e muito alterados tendem a exigir pontos mais frequentes.

Um exemplo clássico de rotação é **avô–pai–filho**:

| Geração | Exemplo |
|---|---|
| filho | diário |
| pai | semanal |
| avô | mensal |

O modelo não define sozinho tipo de backup, RPO, RTO, mídia ou prazo legal.

### 4.3 RPO e RTO

| Objetivo | Pergunta | Mede |
|---|---|---|
| RPO | até que ponto no tempo recuperar? | perda máxima tolerável de dados |
| RTO | em quanto tempo retomar? | duração máxima da recuperação |

Exemplo:

- falha às 12 h;
- último ponto recuperável às 11 h;
- serviço restabelecido às 17 h.

A perda potencial é de uma hora; a recuperação levou cinco horas. Um RPO de duas horas pode ter sido atendido, enquanto um RTO de duas horas foi descumprido.

---

## 5. Tipos de backup

### 5.1 Completo

O **completo** copia todo o conjunto selecionado. Em regra, é simples de restaurar, mas exige mais espaço e tempo de execução.

### 5.2 Incremental

O **incremental** copia mudanças desde o backup anterior, completo ou incremental.

```text
Domingo: F0
Segunda: I1
Terça:   I2
Quarta:  I3
```

Para restaurar quarta-feira:

```text
F0 + I1 + I2 + I3
```

A perda de `I2` pode impedir a reconstrução do estado de `I3`.

### 5.3 Diferencial

O **diferencial** copia mudanças desde o último completo.

```text
Domingo: F0
Segunda: D1
Terça:   D2
Quarta:  D3
```

Para restaurar quarta-feira:

```text
F0 + D3
```

O diferencial tende a crescer até o próximo completo.

### 5.4 Comparação

| Critério | Completo | Incremental | Diferencial |
|---|---|---|---|
| copia | todo o escopo | desde o backup anterior | desde o último completo |
| execução | tende a ser maior | tende a ser menor | cresce ao longo do ciclo |
| restauração | completo escolhido | completo + todos os incrementais | completo + último diferencial |
| dependência de cadeia | menor | maior | intermediária |

“Mais rápido” e “menor” são tendências, não garantias absolutas.

---

## 6. Classificação clássica do Windows e atributo de arquivo

Em classificações clássicas ou legadas, o atributo de arquivo indica que o item mudou desde determinado backup.

| Tipo | Seleção | Atributo após copiar |
|---|---|---|
| Normal/Completo | todos | limpa |
| Cópia | todos | não limpa |
| Diário | alterados no dia | não limpa |
| Incremental | atributo marcado | limpa |
| Diferencial | atributo marcado | não limpa |

Consequências:

- o backup de **cópia** pode ser feito extraordinariamente sem interromper a sequência incremental/diferencial;
- logo depois de um completo, incremental e diferencial podem selecionar itens semelhantes;
- depois do incremental, o atributo costuma ser limpo;
- depois do diferencial, permanece marcado.

Nem toda solução moderna usa esse mecanismo. Em prova, observe se a questão adota a taxonomia clássica.

---

## 7. Destinos, separação e regra 3-2-1

Backups podem ser mantidos em:

- mídia removível;
- servidor de arquivos;
- equipamento de armazenamento em rede;
- fita;
- segundo equipamento;
- local físico separado;
- serviço de backup ou armazenamento em nuvem.

### 7.1 Mesma unidade não basta

Outra pasta no mesmo disco pode ajudar contra exclusão pontual, mas continua exposta à falha da unidade.

### 7.2 Offline e off-site

| Propriedade | Significado |
|---|---|
| offline | desconectado ou inacessível ao ambiente operacional normal |
| off-site | fora do local físico principal |
| imutável | não alterável durante o período definido |
| criptografado | protegido contra leitura sem a chave |

Offline e off-site não são sinônimos. Uma cópia pode ser off-site e continuar online.

### 7.3 Regra 3-2-1

A referência recomenda:

1. **3 cópias**: uma primária e dois backups;
2. **2 tipos de mídia**;
3. **1 cópia fora do local**.

Ela não define sozinha frequência, retenção, RPO, RTO, credenciais, imutabilidade ou testes.

---

## 8. Proteção contra ransomware

Uma estratégia resiliente pode combinar:

- cópia offline;
- cópia off-site;
- armazenamento imutável;
- credenciais separadas do ambiente produtivo;
- menor privilégio;
- inventário e catálogo protegidos;
- monitoramento de exclusões;
- imagens confiáveis de sistemas críticos;
- testes regulares;
- restauração em ambiente controlado;
- escolha de ponto anterior ao comprometimento.

Pegadinhas:

- backup conectado permanentemente pode ser atingido;
- criptografia protege confidencialidade, mas não comprova integridade;
- imutabilidade não comprova que a cópia é restaurável;
- a cópia mais recente pode conter malware;
- restaurar sem validar o ambiente pode reintroduzir o problema.

---

## 9. Ciclo operacional

### 9.1 Antes

- selecione escopo e dependências;
- confirme espaço e mídia;
- confira credenciais;
- defina tipo e destino;
- registre origem, data, retenção e responsável;
- garanta consistência da aplicação quando necessário.

### 9.2 Durante e depois

- monitore a tarefa;
- investigue arquivos ignorados e falhas;
- verifique integridade;
- proteja contra alteração e acesso indevido;
- mantenha inventário;
- confirme retenção.

### 9.3 Checksum

Checksum pode detectar alteração de bytes. Não prova, sozinho:

- funcionamento da aplicação;
- completude;
- permissões corretas;
- compatibilidade;
- presença de todos os elos;
- atendimento ao RTO.

### 9.4 Teste de restauração

O teste deve confirmar:

- leitura do conjunto;
- itens esperados;
- cadeia completa;
- permissões e metadados;
- consistência;
- funcionamento;
- tempo;
- procedimento documentado.

Teste apenas de um arquivo pequeno não valida necessariamente um sistema complexo.

### 9.5 Escolha do ponto

| Incidente | Ponto adequado |
|---|---|
| exclusão recente | versão ou backup anterior |
| corrupção antiga | ponto anterior ao início |
| ransomware | cópia confiável anterior ao comprometimento |
| configuração incorreta | configuração e dados compatíveis |
| perda do equipamento | imagem/reconstrução + dados |

---

## 10. Armazenamento em nuvem

Cloud storage mantém dados em infraestrutura operada por provedor e permite acesso por aplicações Web, móveis e de sincronização.

Benefícios possíveis:

- acesso multidispositivo;
- compartilhamento;
- colaboração;
- versões;
- lixeira;
- disponibilidade sob demanda.

Dependências e riscos:

- conexão;
- cota;
- conta;
- licença;
- política;
- retenção;
- continuidade do provedor;
- permissões;
- propagação de alterações.

Nuvem não significa conteúdo público. Link não substitui permissão.

---

## 11. Permissões e uso institucional

| Escopo de acesso | Regra |
|---|---|
| pessoa específica | associado a identidade ou grupo |
| organização | limitado ao ambiente institucional |
| qualquer pessoa com o link | acesso amplo, quando permitido |
| leitura | consulta |
| comentário | interação sem edição plena |
| edição | alteração e ações permitidas |

Princípios:

- menor privilégio;
- revisão periódica;
- revogação ao fim da finalidade;
- serviço autorizado;
- conta institucional;
- classificação da informação;
- retenção e descarte;
- responsabilidade pela recuperação.

Permissões de pasta podem alcançar os itens contidos. Uma permissão mais ampla na pasta pode prevalecer sobre tentativa de restrição isolada do arquivo, conforme o modelo do serviço.

---

## 12. OneDrive

### 12.1 Arquivos Sob Demanda

| Estado | Regra |
|---|---|
| somente online | aparece no Explorador, economiza disco e exige rede para abrir |
| disponível localmente | foi baixado e pode abrir offline |
| sempre manter neste dispositivo | permanece baixado e ocupa espaço |

**Liberar espaço** remove a cópia integral local e mantém o item na nuvem. **Excluir** é outra ação e pode ser sincronizada para os demais locais.

### 12.2 Compartilhamento

Arquivos são privados até o compartilhamento. Papéis, tipos de link e compartilhamento externo dependem da conta e da política.

### 12.3 Versões, lixeira e restauração integral

| Recurso | Escopo |
|---|---|
| histórico de versões | um arquivo |
| lixeira | itens excluídos |
| Restaurar seu OneDrive | desfazer ações em massa até ponto anterior, quando disponível |

Na restauração integral, arquivos criados depois do ponto escolhido podem ir para a lixeira. O recurso possui janela e condições próprias e não substitui política independente de backup.

### 12.4 Prazos condicionados

A documentação comercial costuma distinguir retenção de lixeira por tipo de conta. Trate prazos como dados condicionados à conta, política e versão, nunca como retenção universal ou eterna.

---

## 13. Google Drive

### 13.1 Streaming e espelhamento

| Pergunta | Streaming | Espelhamento |
|---|---|---|
| conteúdo principal | nuvem | nuvem e disco local |
| espaço local | reduzido | cópia completa |
| offline | preparar itens | disponível |
| mudanças sincronizadas | sim | sim |
| backup independente | não automaticamente | não automaticamente |

Espelhamento não protege contra exclusão sincronizada.

### 13.2 Meu Drive

Papéis comuns:

- Leitor;
- Comentador;
- Editor;
- Proprietário.

Meu Drive está vinculado à conta proprietária e às regras do serviço.

### 13.3 Drives compartilhados

Em contas organizacionais compatíveis, o conteúdo pertence ao contexto do Drive compartilhado, favorecendo continuidade institucional.

Papéis usuais:

| Papel | Capacidade geral |
|---|---|
| Leitor | visualizar |
| Comentador | visualizar e comentar |
| Colaborador | adicionar e editar conteúdo |
| Administrador de conteúdo | administrar conteúdo de forma ampliada |
| Administrador | gerenciar conteúdo, membros e acesso |

Os nomes e poderes podem variar por edição e política.

### 13.4 Versões e lixeira

Arquivos nativos Google possuem histórico próprio. Arquivos não nativos podem ter versões sujeitas a limites de prazo ou quantidade. Itens na lixeira possuem retenção limitada.

---

## 14. Nuvem como destino de backup

| Situação | Avaliação |
|---|---|
| arquivo enviado deliberadamente como cópia | pode ser backup |
| pasta de trabalho sincronizada | sincronização |
| serviço especializado de backup | pode oferecer agenda, retenção e restauração próprias |
| espelhamento local/nuvem | disponibilidade, não independência automática |

É falso que OneDrive e Google Drive nunca possam receber backups. Também é falso que qualquer pasta sincronizada seja política completa de backup.

Avalie:

- independência;
- retenção;
- versões;
- imutabilidade;
- credenciais;
- restauração;
- propagação de exclusões;
- teste.

---

## 15. Casos resolvidos

### 15.1 Snapshot no mesmo storage

Uma máquina virtual possui snapshots no mesmo equipamento que falhou.

**Conclusão:** os snapshots compartilhavam o domínio de falha e não eram cópia independente.

### 15.2 Ransomware em pasta sincronizada

Arquivos locais são criptografados e a alteração chega à nuvem.

**Conclusão:** a sincronização funcionou como projetado. A recuperação depende de versões, restauração integral ou backup separado confiável.

### 15.3 Cadeia incremental

```text
F0 + I1 + I2 + I3
```

Sem `I2`, `I3` não recompõe necessariamente as mudanças ausentes.

### 15.4 Diferencial

```text
F0 + D3
```

`D1` e `D2` não são necessários para o estado de `D3`.

### 15.5 RPO atendido e RTO descumprido

Perdeu-se apenas 30 minutos de dados, mas a recuperação levou oito horas.

**Resultado:** RPO pode ter sido atendido; RTO pode ter sido descumprido.

### 15.6 Restauração integral do OneDrive

Centenas de arquivos foram excluídos e alterados.

**Decisão:** avaliar a restauração integral a ponto anterior, considerando o impacto sobre arquivos criados depois.

### 15.7 Continuidade institucional no Google Drive

Documentos críticos estavam no Meu Drive pessoal de um servidor que deixou o órgão.

**Melhoria:** usar ambiente institucional e Drive compartilhado com papéis administrados pela unidade.

---

## 16. Pegadinhas de prova

- backup não é restauração;
- snapshot não é backup independente;
- RAID não é backup;
- sincronização não é backup;
- imagem de sistema não é simples cópia de arquivos;
- incremental: desde o backup anterior;
- diferencial: desde o último completo;
- completo + último diferencial;
- completo + todos os incrementais;
- backup de cópia não limpa o atributo clássico;
- incremental limpa o atributo clássico;
- diferencial não limpa o atributo clássico;
- RPO não é RTO;
- frequência não é retenção;
- rotação não é tipo de backup;
- offline não é off-site;
- criptografado não significa íntegro;
- imutável não significa testado;
- checksum não comprova restauração funcional;
- cópia mais recente nem sempre é a correta;
- lixeira não é retenção eterna;
- somente online não significa excluído;
- Liberar espaço não é Excluir;
- streaming não é cópia completa local;
- espelhamento não é proteção independente;
- link não é permissão;
- Meu Drive não é Drive compartilhado;
- conta pessoal não é ambiente institucional.

---

## 17. Método para resolver questões

1. Identifique o objetivo de recuperação.
2. Defina o escopo: arquivo, aplicação, volume ou sistema.
3. Determine RPO e RTO.
4. Diferencie completo, incremental e diferencial.
5. Monte a cadeia de restauração.
6. Observe atributo de arquivo se a taxonomia clássica for usada.
7. Verifique localização: mesmo disco, offline, off-site ou imutável.
8. Separe backup, snapshot, sincronização, replicação e RAID.
9. Em nuvem, confira estado local, permissão, retenção e propagação.
10. Rejeite absolutos como “sempre”, “ilimitado”, “qualquer link” e “sincronização já é backup”.
