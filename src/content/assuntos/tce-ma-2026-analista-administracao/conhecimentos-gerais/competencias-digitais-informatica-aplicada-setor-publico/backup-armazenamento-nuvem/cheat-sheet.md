# Backup e armazenamento em nuvem

## Recorte

- Aqui: procedimentos de backup, restauração e armazenamento em nuvem com OneDrive e Google Drive.
- Malware, antivírus, firewall, anti-spyware, phishing e pharming pertencem ao assunto seguinte.
- Recursos e prazos dos serviços variam conforme conta, plano, sistema e política administrativa.

## Conceitos essenciais

| Conceito | Finalidade | Pegadinha |
|---|---|---|
| backup | preservar cópia recuperável | exige retenção, proteção e teste |
| restauração | recuperar dados ou sistemas da cópia | criar a cópia não comprova que ela funciona |
| sincronização | manter alterações coerentes entre locais | pode propagar exclusão ou corrupção |
| replicação | manter outra instância atualizada | também pode replicar estado incorreto |
| versionamento | manter estados anteriores de um item | prazo e quantidade podem ser limitados |
| arquivamento | preservar por longo prazo | não substitui recuperação operacional |
| redundância | tolerar falha de componente | não cria necessariamente histórico independente |

- RAID, espelhamento e replicação não são backup por si sós.
- Lixeira e histórico de versões ajudam, mas não formam sozinhos uma política completa.
- A utilidade do backup é demonstrada pela restauração bem-sucedida.

## Política de backup

Defina:

- dados, aplicações, configurações e dependências abrangidos;
- responsáveis por execução, guarda e restauração;
- frequência e horários;
- tipo de backup;
- destinos, mídias e localização;
- retenção e rotação;
- controles de acesso e proteção;
- monitoramento e tratamento de falhas;
- testes de restauração;
- descarte ou arquivamento final.

| Termo | Regra curta |
|---|---|
| frequência | intervalo entre execuções |
| retenção | tempo de conservação da cópia ou versão |
| rotação | substituição planejada entre mídias ou gerações |

- Frequência maior tende a reduzir a perda potencial de dados.
- Guardar apenas o estado mais recente pode impedir recuperação de erro antigo.
- Rotação não é sinônimo de incremental ou diferencial.
- Mensagem de sucesso não substitui conferência nem teste.

## RPO e RTO

| Objetivo | Pergunta | Mede |
|---|---|---|
| RPO | até que ponto no tempo recuperar? | perda máxima tolerável de dados |
| RTO | em quanto tempo retomar? | duração máxima da recuperação |

- RPO menor exige pontos de recuperação mais frequentes.
- RTO menor exige restauração, recursos e equipe mais rápidos.
- Dados recentes com restauração demorada podem atender ao RPO e falhar no RTO.
- Recuperação rápida de dados antigos pode atender ao RTO e falhar no RPO.

## Tipos de backup

| Tipo | O que copia | Restauração típica |
|---|---|---|
| completo | todo o conjunto selecionado | o completo escolhido |
| incremental | mudanças desde o backup anterior | completo + todos os incrementais posteriores |
| diferencial | mudanças desde o último completo | completo + último diferencial escolhido |

Exemplo com completo no domingo:

- incremental de terça contém mudanças desde o incremental de segunda;
- diferencial de terça contém todas as mudanças desde o completo de domingo;
- a cadeia incremental depende de cada elo e da ordem correta;
- o diferencial cresce até o próximo completo, mas simplifica a restauração.

"Mais rápido" e "menor" descrevem tendências, não garantias absolutas.

## Destinos e localização

- Segunda pasta no mesmo disco compartilha o risco da unidade.
- Offline: cópia desconectada ou inacessível ao ambiente operacional normal.
- Off-site: cópia fora do local físico principal.
- Offline e off-site não são sinônimos.
- Nuvem pode servir como localização externa se preservar cópias recuperáveis.

### Regra 3-2-1

1. **3 cópias**: 1 primária + 2 backups.
2. **2 tipos de mídia**.
3. **1 cópia fora do local** principal.

- A regra reduz risco, mas não define frequência, retenção, RPO, RTO ou permissões.
- Três cópias desatualizadas, acessíveis ao mesmo risco ou não testadas continuam inadequadas.

## Ciclo operacional

### Antes

- selecione dados e dependências;
- confira espaço, mídia, credenciais e permissões;
- registre origem, destino, data e tipo.

### Depois

- investigue falhas, arquivos ignorados e falta de espaço;
- verifique integridade;
- proteja contra alteração e acesso indevido;
- mantenha inventário e retenção.

### Teste de restauração

- leia o conjunto;
- confirme itens esperados;
- confira a cadeia completa;
- recupere permissões e dependências relevantes;
- abra ou execute o resultado;
- meça compatibilidade com o RTO.

- Checksum detecta alteração, mas não prova recuperação funcional completa.
- Teste apenas de arquivo pequeno não valida necessariamente sistema complexo.
- Restaure em ambiente controlado para não sobrescrever produção.
- A cópia mais recente pode já conter o erro; escolha o ponto adequado.

## Armazenamento em nuvem

- Dados ficam em infraestrutura operada por provedor e são acessados por aplicações Web, móveis ou de sincronização.
- Possibilidades: acesso multidispositivo, sincronização, compartilhamento, colaboração, versões e lixeira.
- Dependências: conexão, cota, tamanho de arquivo, conta, licença, política, retenção e continuidade do provedor.
- Nuvem não significa conteúdo público.
- Link não substitui permissão.
- Alterações em pasta sincronizada podem alcançar todos os locais.

## Permissões

| Acesso | Regra curta |
|---|---|
| pessoa específica | associado a identidade ou grupo definido |
| organização | delimitado ao ambiente institucional |
| qualquer pessoa com o link | acesso amplo, quando permitido |
| leitura | consulta sem edição |
| comentário | interação sem edição plena |
| edição | alteração do conteúdo e outras ações permitidas |

- Conceda somente o acesso necessário.
- Confira o público antes de distribuir um link.
- Revogue acessos sem finalidade.
- Permissões de pasta podem alcançar itens nela contidos.
- Administradores podem bloquear compartilhamento externo.

## OneDrive

| Estado no Windows | Regra |
|---|---|
| somente online | aparece localmente, economiza disco e exige conexão para abrir |
| disponível localmente | foi baixado e abre offline; pode voltar a somente online |
| sempre manter neste dispositivo | permanece baixado e ocupa espaço local |

- Arquivos Sob Demanda exibe itens sem baixar todo o conteúdo.
- Liberar espaço torna o item somente online; não o exclui da nuvem.
- Excluir pelo dispositivo sincronizado também exclui do OneDrive e dos demais dispositivos.
- Arquivos são privados até o compartilhamento.
- Visualização, edição e opções de link dependem da conta e da política.
- Histórico de versões recupera estados anteriores compatíveis.
- Lixeira documentada: até 30 dias em conta pessoal e 93 dias em conta escolar/profissional, salvo política administrativa.
- Lixeira não é retenção ilimitada nem política universal de backup.

## Google Drive

| Modo no Drive para computador | Regra |
|---|---|
| streaming | arquivos principalmente na nuvem; baixo uso local |
| espelhamento | nuvem + cópia completa no disco local |

- No streaming, disponibilize previamente os itens necessários offline.
- No espelhamento, os arquivos permanecem offline e ocupam espaço local.
- Mudanças e exclusões sincronizadas podem refletir-se nos demais locais.
- Meu Drive pode usar streaming ou espelhamento.
- Drives compartilhados usam streaming na documentação consultada.

Papéis no Meu Drive:

| Papel | Capacidade principal |
|---|---|
| Leitor | ler |
| Comentador | ler e comentar |
| Editor | ler, comentar e editar |
| Proprietário | controlar item, propriedade e permissões |

- Arquivos nativos Google possuem histórico próprio.
- Para PDFs, imagens e outros arquivos, versões podem ser removidas após 30 dias ou 100 versões mais recentes, salvo manutenção indefinida.
- Itens na lixeira são excluídos permanentemente após 30 dias.

## Nuvem como backup

| Situação | Avaliação |
|---|---|
| arquivo enviado deliberadamente como cópia | a nuvem pode ser destino de backup |
| pasta sincronizada de trabalho | sincronização; exclusões também podem propagar |
| serviço especializado de backup em nuvem | pode oferecer agenda, retenção e restauração próprias |

- É falso que OneDrive e Google Drive nunca possam receber backups.
- É falso que todo arquivo sincronizado já possua política completa de backup.
- Verifique independência, retenção, histórico, restauração, permissões e propagação de alterações.

## Uso institucional

- Use conta e serviço autorizados pelo órgão.
- Classifique a informação e restrinja o acesso.
- Observe retenção, descarte e preservação obrigatória.
- Documente responsáveis e procedimento de recuperação.
- Conta pessoal não equivale a ambiente institucional administrado.
- Teste a restauração dos dados críticos.

## Pegadinhas-relâmpago

- Backup ≠ sincronização.
- RAID ≠ backup.
- Incremental: desde o backup anterior.
- Diferencial: desde o último completo.
- RPO: perda de dados no tempo.
- RTO: tempo para recuperar.
- Offline ≠ off-site.
- Regra 3-2-1 ≠ dispensa de teste.
- Checksum ≠ restauração funcional comprovada.
- Somente online ≠ apagado da nuvem.
- Liberar espaço no OneDrive ≠ excluir.
- Streaming ≠ cópia completa local.
- Espelhamento ≠ cópia independente contra exclusão.
- Link ≠ acesso garantido.
- Nuvem ≠ conteúdo público.
- Lixeira e versões ≠ retenção eterna.
