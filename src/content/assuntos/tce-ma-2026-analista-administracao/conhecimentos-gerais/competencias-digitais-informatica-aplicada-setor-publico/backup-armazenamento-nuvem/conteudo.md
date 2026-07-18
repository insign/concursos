---
schemaVersion: 1
title: "Backup e armazenamento em nuvem"
description: Procedimentos de cópia de segurança, recuperação e uso funcional de armazenamento em nuvem com OneDrive e Google Drive.
order: 26
storageId: backup-armazenamento-nuvem
---

## 1. Recorte do assunto

Este assunto reúne dois pontos relacionados do edital:

- **procedimentos de cópia de segurança (backup)**;
- **armazenamento em nuvem**, com conceitos e aplicações do Microsoft OneDrive e do Google Drive.

O vínculo entre eles é a preservação e a disponibilidade de dados. Entretanto, armazenar ou sincronizar um arquivo na nuvem não cria automaticamente uma política completa de backup. A prova costuma explorar justamente a diferença entre manter o arquivo de trabalho acessível e preservar cópias recuperáveis, separadas e testadas.

Vírus, worms, outras pragas virtuais, antivírus, firewall, anti-spyware, phishing e pharming pertencem ao assunto seguinte. Aqui, controles de acesso, cópia offline e proteção da mídia aparecem somente no que é necessário para garantir confidencialidade, integridade, disponibilidade e restauração das cópias.

Recursos, nomes de comandos, prazos e limites comerciais do OneDrive e do Google Drive podem variar conforme conta, assinatura, sistema operacional, versão do aplicativo e política administrativa. Afirmações absolutas sobre disponibilidade devem ser evitadas.

---

## 2. Conceitos fundamentais

### 2.1 Backup e restauração

**Backup** é uma cópia de dados ou programas feita para permitir sua recuperação quando necessário. O valor da cópia está na possibilidade de **restaurar** informação íntegra após exclusão, alteração indevida, corrupção, falha do equipamento ou indisponibilidade do original.

**Restauração** é o processo de recuperar dados, configurações ou sistemas a partir de uma cópia. Criar o backup e restaurá-lo são etapas diferentes: um arquivo copiado pode estar incompleto, corrompido, inacessível ou incompatível com o procedimento de recuperação.

Uma política útil responde a duas perguntas:

1. **o que precisa ser recuperado?**
2. **como se comprova que a recuperação funciona no prazo necessário?**

### 2.2 Conceitos que não são sinônimos

| Mecanismo | Finalidade principal | Limitação relevante |
|---|---|---|
| **backup** | preservar cópias para recuperação | precisa de retenção, proteção e teste |
| **sincronização** | manter arquivos e alterações coerentes entre locais | pode propagar exclusões e alterações indesejadas |
| **replicação** | manter outra instância atualizada para disponibilidade | o estado incorreto também pode ser replicado |
| **versionamento** | manter estados anteriores de um item | quantidade e prazo podem ser limitados |
| **arquivamento** | preservar informação por longo prazo ou por obrigação administrativa, histórica ou legal | não substitui a recuperação operacional frequente |
| **redundância** | tolerar falha de componente, como disco ou equipamento | não cria necessariamente cópias históricas independentes |

Sincronização, versionamento e lixeira ajudam na recuperação, mas não devem ser confundidos com uma estratégia independente de backup. Por exemplo, a exclusão de um item em uma pasta sincronizada pode ser refletida na nuvem e nos demais dispositivos.

Da mesma forma, **RAID, espelhamento de disco e replicação não são backup por si sós**. Eles podem manter o serviço disponível após uma falha física, mas não garantem um ponto anterior à exclusão, à corrupção ou a outra alteração lógica.

---

## 3. Planejamento da cópia de segurança

### 3.1 O que uma política deve definir

Não existe frequência universal adequada a todos os dados. A política deve considerar criticidade, volume, taxa de alteração, requisitos administrativos e capacidade de recuperação. Entre seus elementos estão:

- dados, aplicações e configurações abrangidos;
- responsáveis pela execução, guarda e restauração;
- frequência e horários das cópias;
- tipos de backup utilizados;
- destinos, mídias e localização das cópias;
- retenção e rotação dos conjuntos;
- controles de acesso e proteção durante armazenamento e transferência;
- verificação de execução e tratamento de falhas;
- testes de restauração;
- descarte ou arquivamento ao fim da retenção.

Uma mensagem de sucesso do programa não basta. A execução deve ser monitorada, falhas precisam gerar ação e os conjuntos devem ser conferidos por restaurações representativas.

### 3.2 Frequência, retenção e rotação

**Frequência** é o intervalo entre backups. Dados que mudam rapidamente e admitem pouca perda exigem pontos de recuperação mais frequentes.

**Retenção** é o tempo pelo qual cada cópia ou versão permanece disponível. Guardar somente o estado mais recente pode impedir a recuperação de uma alteração indevida percebida dias depois.

**Rotação** é a substituição planejada de mídias ou conjuntos entre gerações. Ela permite manter pontos diários, semanais ou mensais, por exemplo. Rotação não é sinônimo de backup incremental nem diferencial.

Uma política precisa equilibrar:

- espaço e custo;
- tempo para executar a cópia;
- quantidade de pontos históricos;
- tempo para localizar e restaurar o conjunto correto;
- obrigações de retenção e descarte.

### 3.3 RPO e RTO

Dois objetivos orientam a continuidade:

| Objetivo | Pergunta | Interpretação |
|---|---|---|
| **RPO — Recovery Point Objective** | até que ponto no tempo os dados precisam ser recuperados? | perda máxima de dados tolerável, medida em tempo |
| **RTO — Recovery Time Objective** | em quanto tempo o serviço ou processo precisa voltar? | duração máxima admitida para a recuperação |

Se um sistema falha às 12 h e seu RPO é de 4 horas, o ponto recuperado deve ser, em termos simplificados, de 8 h ou mais recente. Um RPO menor tende a exigir cópias ou pontos de recuperação mais frequentes.

Se o RTO é de 2 horas, o procedimento, os recursos e a equipe devem permitir a retomada dentro desse intervalo. RPO e RTO não são a mesma medida: é possível preservar dados recentes e ainda demorar demais para restaurá-los.

---

## 4. Tipos de backup

### 4.1 Backup completo

O **backup completo (full)** copia todo o conjunto selecionado. Ele costuma exigir mais tempo e espaço para ser criado, mas oferece uma base simples para restauração.

Para restaurar o estado contido naquele conjunto, o backup completo correspondente é suficiente. Isso não significa que um único completo satisfaça toda política: ainda são necessários retenção, separação, proteção e testes.

### 4.2 Backup incremental

O **backup incremental** copia o que mudou desde o backup anterior, seja ele completo ou incremental.

Exemplo:

- domingo: completo `F0`;
- segunda: incremental `I1`, com mudanças desde `F0`;
- terça: incremental `I2`, com mudanças desde `I1`;
- quarta: incremental `I3`, com mudanças desde `I2`.

Para recuperar o estado de quarta-feira, são necessários `F0 + I1 + I2 + I3`, aplicados na sequência correta. Em geral, incrementais reduzem o volume e a janela de cada execução, mas aumentam a dependência da cadeia de restauração. A perda de um elo pode impedir a aplicação dos incrementais seguintes.

### 4.3 Backup diferencial

O **backup diferencial** copia o que mudou desde o último backup completo.

Exemplo:

- domingo: completo `F0`;
- segunda: diferencial `D1`, com mudanças desde `F0`;
- terça: diferencial `D2`, novamente com todas as mudanças desde `F0`;
- quarta: diferencial `D3`, com todas as mudanças desde `F0`.

Para recuperar o estado de quarta-feira, bastam `F0 + D3`. O diferencial tende a crescer até o próximo completo, pois acumula mudanças desde a mesma base. Em compensação, a restauração requer menos conjuntos que a cadeia incremental equivalente.

### 4.4 Comparação

| Critério | Completo | Incremental | Diferencial |
|---|---|---|---|
| dados copiados | todo o conjunto | mudanças desde o backup anterior | mudanças desde o último completo |
| volume por execução | normalmente maior | normalmente menor | cresce até o próximo completo |
| restauração típica | completo escolhido | completo + todos os incrementais posteriores | completo + último diferencial |
| dependência de cadeia | baixa para o conjunto | alta | intermediária |

"Mais rápido" ou "menor" não é garantia absoluta, pois desempenho depende de volume, quantidade de alterações, mídia, rede, compressão e ferramenta. A tabela expressa o comportamento conceitual usual.

---

## 5. Destinos, mídias e localização

Backups podem ser mantidos em:

- disco externo ou outra mídia removível;
- servidor de arquivos ou equipamento de armazenamento em rede;
- fita ou mídia destinada à retenção;
- segundo equipamento ou local físico;
- serviço remoto ou armazenamento em nuvem.

### 5.1 Mesma unidade não basta

Uma segunda pasta no mesmo disco pode ajudar contra uma exclusão pontual, mas permanece exposta à falha, perda ou dano da própria unidade. Cópias no mesmo equipamento compartilham riscos físicos e lógicos.

### 5.2 Offline e off-site

Uma cópia **offline** fica desconectada ou inacessível ao ambiente operacional normal quando não está sendo usada. Desconectar a mídia removível depois do backup é um exemplo simples.

Uma cópia **off-site** fica fora do local principal. Ela reduz a exposição conjunta a incêndio, alagamento, furto ou outra indisponibilidade física. Armazenamento em nuvem pode cumprir o papel de localização externa, desde que a solução realmente preserve cópias recuperáveis e tenha política adequada.

Offline e off-site descrevem propriedades diferentes. Uma cópia pode ser externa ao prédio e continuar online; outra pode estar offline no mesmo prédio.

### 5.3 Regra 3-2-1

A referência **3-2-1** recomenda:

1. manter **3 cópias** dos arquivos importantes: 1 primária e 2 backups;
2. usar **2 tipos de mídia**;
3. guardar **1 cópia fora do local** principal.

Ela reduz riscos comuns, mas não define sozinha frequência, retenção, RPO, RTO, permissões ou procedimento de restauração. Três cópias desatualizadas ou não testadas continuam inadequadas.

---

## 6. Ciclo operacional do backup

### 6.1 Selecionar e preparar

Antes da execução:

- identifique dados, configurações e dependências necessárias;
- exclua arquivos temporários apenas quando a política permitir;
- confirme espaço no destino e disponibilidade da mídia;
- verifique credenciais e permissões da conta de backup;
- registre o conjunto, a data, o tipo e a origem.

Copiar somente arquivos de dados pode não ser suficiente para recuperar uma aplicação. Dependendo do objetivo, também são necessários configurações, banco de dados consistente, chaves, metadados ou procedimento de reinstalação.

### 6.2 Executar e verificar

Durante e depois da cópia:

- acompanhe o resultado da tarefa;
- investigue arquivos ignorados, falhas de leitura e falta de espaço;
- verifique integridade conforme os mecanismos da solução;
- proteja o conjunto contra alteração e acesso não autorizados;
- mantenha inventário de localização e retenção.

Uma verificação de integridade, como comparação ou checksum, ajuda a detectar alteração, mas não demonstra sozinha que a aplicação ou o processo completo pode ser recuperado.

### 6.3 Testar a restauração

O teste deve confirmar:

- que o conjunto pode ser lido;
- que os itens esperados foram incluídos;
- que a cadeia necessária está completa;
- que permissões e dependências relevantes são recuperadas;
- que o resultado abre ou funciona corretamente;
- que o tempo de recuperação é compatível com o RTO.

O teste deve ser regular e representativo. Restaurar sempre um arquivo pequeno não comprova a recuperação de um sistema complexo. Quando possível, teste em ambiente controlado para não sobrescrever dados de produção.

### 6.4 Restaurar com segurança

Em uma ocorrência real:

1. identifique o ponto de recuperação adequado;
2. preserve evidências e dados atuais quando necessário;
3. selecione o completo e os conjuntos complementares corretos;
4. restaure em destino controlado;
5. valide integridade, consistência e permissões;
6. libere o uso conforme o procedimento aprovado;
7. registre resultado, tempo e eventuais lacunas.

Restaurar automaticamente a cópia mais recente pode reintroduzir um erro já presente nela. O ponto deve ser escolhido de acordo com o momento do problema e a retenção disponível.

---

## 7. Armazenamento em nuvem

**Armazenamento em nuvem (cloud storage)** oferece capacidade de guardar e acessar dados em infraestrutura operada por um provedor, normalmente por meio da Internet e de aplicações Web, móveis ou de sincronização.

Entre suas possibilidades estão:

- acesso por diferentes dispositivos;
- sincronização de arquivos;
- compartilhamento por link ou por identidade;
- colaboração sobre documentos;
- histórico de versões e lixeira;
- expansão de capacidade conforme conta ou plano;
- cópia remota de determinados dados.

Também existem dependências e riscos operacionais:

- conexão para itens não disponíveis localmente;
- limite de armazenamento e de tamanho de arquivo;
- continuidade e regras do provedor;
- conta, licença e política da organização;
- permissões e links de compartilhamento;
- retenção limitada de lixeira e versões;
- sincronização de exclusões ou alterações.

**Nuvem não é sinônimo de Internet pública.** Um item pode estar em infraestrutura remota e continuar restrito a identidades autorizadas. Da mesma forma, enviar um link não garante acesso: o destinatário precisa possuir a permissão exigida.

---

## 8. Compartilhamento, permissões e colaboração

Ao compartilhar um item, diferencie:

- **destinatário específico**: acesso associado a pessoa ou grupo definido;
- **pessoas da organização**: acesso delimitado pelo ambiente institucional;
- **qualquer pessoa com o link**: o link funciona como meio amplo de acesso, quando permitido;
- **leitura/visualização**: consulta sem edição;
- **comentário/revisão**: interação sem alteração direta plena;
- **edição**: possibilidade de modificar e, conforme a plataforma, compartilhar ou excluir.

As opções efetivas dependem da plataforma e da política administrativa. Um administrador pode bloquear compartilhamento externo ou links públicos. Permissão de pasta também pode alcançar itens nela contidos.

Boas decisões funcionais incluem:

- conceder somente o acesso necessário;
- conferir o público antes de copiar o link;
- revisar permissões quando pessoas mudam de função;
- remover links que perderam finalidade;
- não presumir que "estar na nuvem" torna o item público;
- não usar conta pessoal para dados institucionais quando o órgão exige ambiente administrado.

---

## 9. Microsoft OneDrive

O **OneDrive** é o serviço de armazenamento e sincronização de arquivos da Microsoft. Pode ser usado com conta pessoal ou com conta corporativa/escolar e integra-se ao Microsoft 365. Recursos variam conforme conta, assinatura, sistema e administração.

### 9.1 Sincronização e Arquivos Sob Demanda

No Windows, **Arquivos Sob Demanda** permite exibir itens no Explorador de Arquivos sem manter todo o conteúdo baixado.

| Estado | Comportamento |
|---|---|
| **somente online** | aparece no dispositivo, não ocupa o espaço integral local e precisa de conexão para abrir |
| **disponível localmente** | foi baixado e pode ser aberto offline; pode voltar a somente online ao liberar espaço |
| **sempre manter neste dispositivo** | permanece baixado, disponível offline e ocupa espaço local |

Transformar um item em **somente online** libera a cópia local, mas não o exclui do OneDrive. Em sentido diferente, excluir um arquivo somente online pelo dispositivo também o exclui do OneDrive e dos dispositivos sincronizados, sujeito à recuperação pela lixeira durante a retenção aplicável.

### 9.2 Compartilhamento

Os arquivos são privados até o compartilhamento. O proprietário pode:

- copiar um link;
- conceder acesso a pessoas específicas;
- permitir visualização ou edição;
- gerenciar e remover acessos.

Opções como "qualquer pessoa", bloqueio de download, senha e data de expiração dependem de assinatura, tipo de conta e política. Em pasta compartilhada com edição, o usuário autorizado pode realizar operações amplas sobre o conteúdo; por isso, editar não equivale a apenas ler.

### 9.3 Histórico e lixeira

O histórico de versões permite consultar e restaurar versões anteriores de tipos de arquivo compatíveis. O administrador de conta corporativa ou escolar pode controlar o recurso e a política aplicável.

Na documentação atual consultada, a lixeira mantém automaticamente itens por até:

- **30 dias** em conta pessoal;
- **93 dias** em conta escolar ou profissional, salvo alteração administrativa.

Esses prazos não devem ser tratados como retenção eterna nem como política universal de backup.

---

## 10. Google Drive

O **Google Drive** oferece armazenamento, sincronização, compartilhamento e colaboração, integrado ao Google Workspace. Pode ser acessado pelo navegador, por aplicativo móvel e pelo Drive para computador.

### 10.1 Streaming e espelhamento

| Modo | Armazenamento | Uso offline |
|---|---|---|
| **streaming** | arquivos ficam principalmente na nuvem, com baixo uso local | itens precisam ser disponibilizados offline; o aplicativo deve estar em execução para acesso normal |
| **espelhamento** | mantém arquivos na nuvem e cópia completa no disco local | arquivos permanecem disponíveis offline e ocupam espaço local |

Mudanças em arquivos transmitidos por streaming ou espelhados refletem-se nas cópias sincronizadas. **Meu Drive** pode usar streaming ou espelhamento; drives compartilhados aceitam streaming na documentação atual consultada.

No Drive para computador, colocar na lixeira um item de local sincronizado faz com que ele apareça nas lixeiras dos demais locais. Portanto, espelhamento não cria, por si só, uma cópia independente contra exclusão.

### 10.2 Compartilhamento e papéis

No Meu Drive, os papéis principais são:

| Papel | Ler | Comentar | Editar |
|---|---:|---:|---:|
| **Leitor** | sim | não | não |
| **Comentador** | sim | sim | não |
| **Editor** | sim | sim | sim |
| **Proprietário** | sim | sim | sim, com controle de propriedade e permissões |

O acesso pode ser restrito, concedido a pessoas específicas ou aberto a quem possui o link, conforme a conta e a política. Em contas de trabalho ou escola, o administrador pode impedir compartilhamento externo. Permissões da pasta são herdadas pelos itens segundo o modelo atual do Drive.

### 10.3 Versões e lixeira

O histórico de versões dos arquivos nativos do Documentos, Planilhas e Apresentações Google é diferente do gerenciamento de versões de PDFs, imagens e outros arquivos armazenados no Drive.

Para esses outros arquivos, uma versão pode ser removida após **30 dias** ou quando existirem **100 versões mais recentes**, a menos que seja marcada para manutenção indefinida. Esses critérios não devem ser generalizados para todos os documentos Google.

Arquivos na lixeira são excluídos permanentemente após **30 dias**. Até a exclusão definitiva, continuam ocupando armazenamento. O proprietário e o estado de compartilhamento influenciam o que cada usuário pode excluir ou apenas remover de sua própria visualização.

---

## 11. Comparação funcional

| Necessidade | OneDrive | Google Drive |
|---|---|---|
| integração principal | Microsoft 365 e Windows | Google Workspace |
| acesso sem baixar tudo | Arquivos Sob Demanda | streaming |
| manter cópia offline | Sempre manter neste dispositivo | espelhamento ou disponibilização offline |
| compartilhar | links ou pessoas específicas, com permissões condicionadas | pessoas, grupos ou link, com papéis |
| recuperar versão | histórico de versões | histórico dos arquivos Google ou gerenciamento de versões de outros arquivos |
| recuperar exclusão | lixeira com prazo conforme tipo de conta/política | lixeira, normalmente 30 dias |

Ambos permitem armazenar arquivos na nuvem, compartilhar, colaborar, sincronizar, usar versões e recuperar itens da lixeira. Os comandos e as regras não são idênticos.

Uma questão deve ser lida pelo nível pedido:

- se pergunta a **finalidade geral**, ambos armazenam e compartilham arquivos;
- se pergunta o **nome do modo**, OneDrive usa Arquivos Sob Demanda, enquanto o Drive para computador distingue streaming e espelhamento;
- se pergunta uma **permissão ou prazo**, observe conta, papel, política e produto indicados.

---

## 12. Nuvem como destino de backup

É possível fazer cópia de segurança de arquivos usando armazenamento em nuvem. Isso ocorre quando os dados são copiados para um destino remoto com procedimento e retenção que permitam recuperação.

Entretanto, há três situações diferentes:

1. **arquivo enviado deliberadamente como cópia**: a nuvem pode ser destino de backup;
2. **pasta sincronizada**: mantém o estado de trabalho coerente, inclusive exclusões;
3. **serviço especializado de backup em nuvem**: pode oferecer agenda, retenção, conjuntos e restauração próprios.

Logo, são incorretas as duas generalizações:

- "Google Drive ou OneDrive nunca podem ser usados para backup";
- "qualquer arquivo sincronizado no Drive ou OneDrive já está protegido por uma política completa de backup".

Para avaliar a solução, confira independência da cópia, histórico, retenção, capacidade de restauração, permissões, localização e propagação de alterações.

---

## 13. Cenários de prova

### 13.1 Cadeia incremental

Há um completo no domingo e incrementais de segunda a quinta. Para restaurar quinta, são necessários o completo e todos os incrementais posteriores, em ordem. Usar apenas o incremental de quinta não recompõe os dados anteriores.

### 13.2 Cadeia diferencial

Há um completo no domingo e diferenciais diários. Para restaurar quinta, usam-se o completo e o diferencial de quinta. Os diferenciais anteriores não são necessários para esse ponto.

### 13.3 Exclusão sincronizada

Um arquivo do OneDrive é excluído em um computador sincronizado e desaparece dos demais. Isso é comportamento de sincronização, não prova de falha. A lixeira pode ajudar dentro da retenção, mas uma política robusta deve prever cópia independente.

### 13.4 Trabalho offline

No OneDrive, um arquivo somente online não abre sem conexão; marque-o para permanecer no dispositivo antes da viagem. No Google Drive, o espelhamento mantém cópia local; no streaming, disponibilize previamente o item offline.

### 13.5 Compartilhamento restrito

Enviar o link de um arquivo restrito não concede automaticamente acesso. Primeiro atribua a permissão adequada. Para apenas consulta, Leitor/visualização é preferível a Editor.

### 13.6 RPO e agenda

Um backup diário pode admitir perda próxima de 24 horas. Se o negócio tolera apenas 2 horas, a agenda diária não atende ao RPO, mesmo que o backup seja restaurado rapidamente.

---

## 14. Uso institucional

No setor público, a conveniência do serviço não afasta regras do órgão. Antes de armazenar ou compartilhar dados:

- use serviço e conta autorizados;
- classifique a informação e identifique restrições de acesso;
- aplique permissões compatíveis com a função;
- observe retenção, descarte e obrigação de preservação;
- documente responsáveis e procedimento de recuperação;
- não presuma que conta pessoal equivale ao ambiente institucional;
- teste a restauração dos dados críticos.

O usuário não deve criar política paralela apenas porque a ferramenta permite copiar ou compartilhar. Licença, contrato, localização, continuidade, privacidade e administração devem ser tratados pela governança competente.

---

## 15. Pegadinhas recorrentes

| Afirmação | Avaliação correta |
|---|---|
| "Sincronização é sempre backup" | falso: pode propagar exclusões e alterações |
| "RAID substitui cópia de segurança" | falso: redundância não preserva necessariamente pontos históricos |
| "Incremental copia desde o último completo" | falso: copia desde o backup anterior |
| "Diferencial copia desde o backup anterior" | falso: copia desde o último completo |
| "Para restaurar incremental basta o último arquivo" | falso: é necessária a cadeia desde o completo |
| "Para restaurar diferencial são necessários todos os diferenciais" | falso: completo mais o diferencial escolhido |
| "RPO mede o tempo para o serviço voltar" | falso: isso se relaciona ao RTO |
| "RTO mede a idade máxima dos dados" | falso: isso se relaciona ao RPO |
| "Off-site e offline são sinônimos" | falso |
| "3-2-1 dispensa teste de restauração" | falso |
| "Mensagem de sucesso comprova recuperação" | falso |
| "Arquivo somente online ocupa todo o espaço local" | falso |
| "Liberar espaço no OneDrive exclui o arquivo da nuvem" | falso |
| "Espelhamento do Google Drive não usa disco local" | falso |
| "Excluir em pasta sincronizada afeta apenas um dispositivo" | falso em regra |
| "Todo link concede acesso a qualquer pessoa" | falso: depende da permissão |
| "Editor e Leitor têm o mesmo poder" | falso |
| "Lixeira possui retenção ilimitada" | falso |
| "Nuvem nunca pode ser destino de backup" | falso |
| "Estar na nuvem torna o arquivo público" | falso |

---

## 16. Síntese para revisão

1. Backup é cópia voltada à recuperação; restauração comprova sua utilidade.
2. Sincronização, replicação, versionamento, arquivo e redundância não são sinônimos de backup.
3. A política define escopo, frequência, retenção, rotação, destinos, responsabilidades e testes.
4. RPO limita a perda de dados no tempo; RTO limita o tempo de recuperação.
5. Completo copia todo o conjunto selecionado.
6. Incremental copia desde o backup anterior e restaura a cadeia completa.
7. Diferencial copia desde o último completo e restaura com completo + último diferencial.
8. Cópia no mesmo disco compartilha o risco da unidade.
9. Offline significa desconectado; off-site significa fora do local principal.
10. A regra 3-2-1 recomenda original + 2 backups, 2 mídias e 1 cópia externa.
11. Teste de restauração deve verificar conteúdo, cadeia, funcionamento e tempo.
12. Cloud storage oferece acesso remoto, sincronização, compartilhamento e colaboração.
13. Exclusões podem se propagar entre locais sincronizados.
14. No OneDrive, Arquivos Sob Demanda distingue somente online, local e sempre disponível.
15. No Google Drive, streaming economiza disco; espelhamento mantém cópia local.
16. Links e papéis controlam quem pode ler, comentar ou editar.
17. Histórico e lixeira têm condições e retenção limitada.
18. OneDrive e Google Drive podem receber cópias, mas sincronização isolada não é política completa de backup.
19. Recursos variam por conta, plano, sistema e administração.
20. No setor público, use contas, serviços, permissões e retenções autorizados.

## Referências

- National Institute of Standards and Technology. [Backup — Glossary](https://csrc.nist.gov/glossary/term/backup). Definição vigente; acesso em 18 jul. 2026.
- National Institute of Standards and Technology. [Recovery Point Objective — Glossary](https://csrc.nist.gov/glossary/term/recovery_point_objective). Definição vigente; acesso em 18 jul. 2026.
- National Institute of Standards and Technology. [Recovery Time Objective — Glossary](https://csrc.nist.gov/glossary/term/Recovery_Time_Objective). Definição vigente; acesso em 18 jul. 2026.
- National Institute of Standards and Technology. [NIST SP 800-123: Guide to General Server Security](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-123.pdf). Jul. 2008, seções 6.2 a 6.2.2; acesso em 18 jul. 2026.
- Cybersecurity and Infrastructure Security Agency. [Data Backup Options](https://www.cisa.gov/sites/default/files/publications/data_backup_options.pdf). Documento US-CERT/CISA sobre mídias e regra 3-2-1; acesso em 18 jul. 2026.
- CERT.br/NIC.br. [Ransomware: Como se Proteger](https://www.cert.br/docs/ransomware/proteger/). Versão 1.1, 5 out. 2025, seção sobre backups; acesso em 18 jul. 2026.
- Microsoft. [Sincronizar arquivos e pastas com o OneDrive](https://support.microsoft.com/pt-BR/onedrive/sync-your-computer-s-files-and-folders-with-onedrive). Documentação atual; acesso em 18 jul. 2026.
- Microsoft. [Arquivos do OneDrive Sob Demanda](https://support.microsoft.com/pt-BR/onedrive/save-disk-space-with-onedrive-files-on-demand-for-windows). Documentação atual; acesso em 18 jul. 2026.
- Microsoft. [Compartilhar arquivos e pastas no OneDrive](https://support.microsoft.com/pt-BR/onedrive/share-files-and-folders-in-microsoft-onedrive). Documentação atual; acesso em 18 jul. 2026.
- Microsoft. [Restaurar uma versão anterior no OneDrive](https://support.microsoft.com/pt-br/onedrive/restore-a-previous-version-of-a-file-stored-in-onedrive). Documentação atual; acesso em 18 jul. 2026.
- Microsoft. [Restaurar itens excluídos no OneDrive](https://support.microsoft.com/pt-br/onedrive/restore-deleted-files-or-folders-in-onedrive). Documentação atual; acesso em 18 jul. 2026.
- Google. [Streaming e espelhamento com o Drive para computador](https://support.google.com/drive/answer/13401938?hl=pt-BR). Documentação atual; acesso em 18 jul. 2026.
- Google. [Compartilhar arquivos do Google Drive](https://support.google.com/drive/answer/2494822?hl=pt-BR). Documentação atual; acesso em 18 jul. 2026.
- Google. [Verificar atividades e versões de arquivos](https://support.google.com/drive/answer/2409045?hl=pt-BR). Documentação atual; acesso em 18 jul. 2026.
- Google. [Excluir arquivos no Google Drive](https://support.google.com/drive/answer/2375102?hl=pt-BR). Documentação atual; acesso em 18 jul. 2026.
- Cebraspe. [Caderno SEDUC/Recife — Professor — Conhecimentos Básicos](https://cdn.cebraspe.org.br/concursos/seduc_recife_23_professor/arquivos/829_SEDUC_RECIFE_23_CB1_01.PDF). Aplicação em 11 jun. 2023; acesso em 18 jul. 2026.
- Cebraspe. [Gabarito definitivo SEDUC/Recife — Professor](https://cdn.cebraspe.org.br/concursos/seduc_recife_23_professor/arquivos/GAB_DEFINITIVO_829_SEDUC_RECIFE_23_CB1_01.PDF). Item 45; acesso em 18 jul. 2026.
- Cebraspe. [Caderno PC/RO — Datiloscopista Policial](https://cdn.cebraspe.org.br/concursos/pc_ro_22/arquivos/732_PCRO_001_01.PDF). Aplicação em 25 set. 2022; acesso em 18 jul. 2026.
- Cebraspe. [Gabarito definitivo PC/RO — Datiloscopista Policial](https://cdn.cebraspe.org.br/concursos/pc_ro_22/arquivos/GAB_DEFINITIVO_732_PCRO_001_01.PDF). Questão 40; acesso em 18 jul. 2026.
