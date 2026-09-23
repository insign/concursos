# Backup e armazenamento em nuvem

## Decisão de recuperação

**O que restaurar → ponto correto → tempo tolerável → cadeia e localização da cópia → teste → acesso e retenção.** Uma cópia que não restaura o serviço necessário no tempo previsto não atende ao objetivo.

| Medida | Pergunta | Exemplo |
|---|---|---|
| frequência | de quanto em quanto tempo há novo ponto? | cópia a cada hora |
| retenção | por quanto tempo o ponto permanece? | manter gerações anteriores |
| <abbr title="Recovery Point Objective">RPO</abbr> | perda máxima tolerável de dados, **medida no tempo** | falha às 12 h, último ponto às 11 h: perda potencial de 1 h |
| <abbr title="Recovery Time Objective">RTO</abbr> | tempo máximo para voltar a operar | falha às 12 h, serviço volta às 17 h: recuperação de 5 h |

O escopo pode ser arquivo, pasta, volume, imagem de sistema ou ambiente. Recuperar **aplicação** pode exigir dados consistentes, configuração, chaves, versão e dependências; a cópia dos arquivos isolados não basta. Recuperação de desastres organiza cópias/replicação, locais alternativos e plano de retomada após incidente grave. Rotação de gerações (por exemplo, diária/semanal/mensal) organiza mídias e retenção; não define o tipo de cópia nem o prazo exigido.

## Mecanismos: qual risco cada um cobre?

| Mecanismo | Uso | Limite decisivo |
|---|---|---|
| backup | cópia para recuperação | precisa de escopo, retenção, proteção e restauração verificada |
| *snapshot* (registro de estado pontual) | retorno rápido ao instante | pode cair com o mesmo armazenamento |
| sincronização / espelhamento / replicação | propagar alterações / manter outra instância | podem propagar exclusão, corrupção ou criptografia |
| versionamento / lixeira | estados anteriores / itens apagados | retenção e permissões próprias; não necessariamente backup independente |
| <abbr title="Redundant Array of Independent Disks">RAID</abbr> | suportar certas falhas de disco | disponibilidade sem histórico contra erro lógico |
| imagem de sistema | reconstrução ampla | requer compatibilidade e procedimento de restauração |

Uma nuvem **pode ser destino de backup** quando o mecanismo conserva cópia independente e recuperável; uma pasta simplesmente sincronizada não vira backup por estar remota. *Snapshot* guardado no mesmo equipamento compartilha o domínio de falha.

## Completo, incremental, diferencial

| Tipo | O que copia | Para restaurar o ponto 3 |
|---|---|---|
| completo | todo o escopo | `F0` |
| incremental | mudanças desde a base anterior que foi completa ou incremental | `F0 + I1 + I2 + I3` |
| diferencial | mudanças **desde o último completo** | `F0 + D3` |

Se `I2` faltar, `I3` não recompõe necessariamente suas mudanças; diferenciais intermediários não são exigidos para `D3`. Tamanhos e tempos são tendências, conforme tecnologia. **Taxonomia clássica baseada no atributo de arquivo**, somente quando adotada pela questão: Normal copia tudo e limpa marca; Cópia copia tudo sem limpar; Diário copia alterados no dia sem limpar; Incremental copia marcados e limpa; Diferencial copia marcados sem limpar. Uma cópia extraordinária não quebra a cadeia pelo simples uso desse tipo.

## Independência, proteção e restauração

**3-2-1** é heurística: três cópias (original + duas), dois tipos de mídia, uma fora do local físico (*off-site*). **Offline** significa desconectada do ambiente operacional; uma cópia fora do local pode continuar online. A regra não fixa frequência, retenção, <abbr title="Recovery Point Objective">RPO</abbr>, <abbr title="Recovery Time Objective">RTO</abbr> nem qualidade do teste.

Contra *ransomware* (programa que bloqueia ou criptografa para extorsão), reduza acesso aos backups com credenciais separadas e menor privilégio, cópia offline ou imutável, localização independente e restauração em ambiente limpo. Se o comprometimento antecede a última cópia, o ponto mais recente pode estar contaminado. Criptografia protege leitura sem chave; imutabilidade dificulta alteração pelo período; nenhuma comprova que a aplicação vai funcionar.

Teste **cadeia, legibilidade, completude, metadados/permissões, consistência da aplicação e tempo de retorno**. *Checksum* (valor calculado para detectar mudança nos dados) ajuda a detectar alteração, mas não prova que dados necessários estão presentes ou que o serviço inicia. Uma tarefa concluída sem erro não substitui ensaio representativo de restauração.

## Nuvem: acesso, estado local e continuidade

Armazenamento em nuvem não torna arquivo público. Link exige identidade/permissão compatível; acesso de leitura, comentário e edição têm alcances diferentes, e permissão de pasta pode alcançar itens contidos. Use conta e espaço institucionais para continuidade e confira retenção, cota e política.

| Serviço / ação | Distinção que decide |
|---|---|
| <abbr title="Serviço Microsoft de arquivos na nuvem associado à conta">OneDrive</abbr>, somente online | aparece no Explorador, precisa baixar para abrir; economiza disco |
| <abbr title="Serviço Microsoft de arquivos na nuvem associado à conta">OneDrive</abbr>, disponível localmente / sempre manter | já baixado e abre offline / permanece baixado |
| Liberar espaço / Excluir | remove cópia integral local / exclusão pode sincronizar |
| histórico / lixeira / Restaurar seu <abbr title="Serviço Microsoft de arquivos na nuvem associado à conta">OneDrive</abbr> | volta um arquivo / recupera excluído dentro da retenção / desfaz mudanças em massa, para assinantes Microsoft 365; documentação consultada indica até 30 dias para o último, e itens criados após o ponto escolhido vão à lixeira |
| Google Drive para computador, *streaming* / espelhamento | arquivos principalmente na nuvem e baixados conforme uso / cópia local integral; **ambos sincronizam** |
| Meu Drive / drive compartilhado | conteúdo vinculado à conta proprietária / espaço da equipe, melhor continuidade institucional |

Em Meu Drive, papéis usuais são Leitor, Comentador, Editor, Proprietário; em drive compartilhado, Leitor, Comentador, Colaborador, Administrador de conteúdo, Administrador. Drive compartilhado usa *streaming*; para Meu Drive, a configuração pode usar *streaming* ou espelhamento. Preparar arquivos para uso offline é diferente de ter backup independente. Um link sem permissão ou uma conta pessoal que sai do órgão pede correção de acesso e governança, não mais sincronização.
