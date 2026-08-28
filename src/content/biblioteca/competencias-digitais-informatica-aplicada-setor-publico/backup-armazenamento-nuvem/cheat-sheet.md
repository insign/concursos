# Backup e armazenamento em nuvem

## Roteiro

**Objetivo → escopo → ponto no tempo → tipo → localização → cadeia → teste → permissão/retenção.**

## Mecanismos

| Mecanismo | Finalidade | Limite |
|---|---|---|
| backup | cópia recuperável | exige restauração testada |
| snapshot | estado pontual | pode depender do mesmo storage |
| sincronização | manter alterações coerentes | propaga exclusão/corrupção |
| replicação | manter instância atualizada | replica estado incorreto |
| versionamento | estados anteriores | retenção limitada |
| <abbr title="Redundant Array of Independent Disks">RAID</abbr> | tolerância a falha de disco | não cria histórico |
| imagem | reconstrução ampla | exige compatibilidade |

## Escopo

| Escopo | Recupera |
|---|---|
| arquivo | item individual |
| pasta | conjunto de arquivos |
| aplicação | dados + configuração + dependências |
| volume | unidade lógica |
| imagem | sistema + aplicações |
| ambiente | serviços coordenados |

## Objetivos

| Termo | Pergunta |
|---|---|
| frequência | de quanto em quanto tempo copiar? |
| retenção | por quanto tempo guardar? |
| <abbr title="Recovery Point Objective">RPO</abbr> | quanto dado posso perder? |
| <abbr title="Recovery Time Objective">RTO</abbr> | quanto tempo posso ficar parado? |

## Tipos

| Tipo | Copia | Restauração |
|---|---|---|
| completo | tudo | completo |
| incremental | desde o backup anterior | completo + todos os incrementais |
| diferencial | desde o último completo | completo + último diferencial |

### Cadeias

```text
F0 + I1 + I2 + I3
F0 + D3
```

Perder `I2` pode invalidar a recuperação de `I3`.

## Classificação clássica

| Tipo | Seleção | Limpa atributo? |
|---|---|---|
| Normal | todos | sim |
| Cópia | todos | não |
| Diário | alterados no dia | não |
| Incremental | marcados | sim |
| Diferencial | marcados | não |

## Localização e proteção

| Propriedade | Significado |
|---|---|
| offline | desconectado |
| off-site | fora do local |
| imutável | não alterável no período |
| criptografado | ilegível sem chave |
| testado | recuperação comprovada |

Offline ≠ off-site. Criptografado ≠ íntegro. Imutável ≠ restaurável.

## Regra 3-2-1

1. três cópias;
2. dois tipos de mídia;
3. uma fora do local.

Não define frequência, retenção, RPO, RTO, credenciais ou testes.

## Ransomware

- cópia offline;
- cópia off-site;
- imutabilidade;
- credenciais separadas;
- menor privilégio;
- catálogo protegido;
- imagem confiável;
- restauração em ambiente limpo;
- ponto anterior ao comprometimento.

## Teste de restauração

Verifique:

- legibilidade;
- completude;
- cadeia;
- permissões;
- consistência;
- funcionamento;
- tempo;
- documentação.

Checksum detecta alteração; não prova recuperação funcional.

## Nuvem

- nuvem ≠ público;
- link ≠ permissão;
- sincronização ≠ backup;
- versões/lixeira ≠ retenção eterna;
- conta pessoal ≠ ambiente institucional.

## Permissões

| Papel | Regra |
|---|---|
| leitura | consultar |
| comentário | comentar |
| edição | alterar |
| proprietário/administrador | controlar acesso |

Permissão de pasta pode alcançar arquivos.

## OneDrive

| Estado | Regra |
|---|---|
| somente online | economiza disco; exige conexão |
| disponível localmente | baixado; abre offline |
| sempre manter | permanece baixado |

- Liberar espaço ≠ excluir.
- Excluir pode sincronizar.
- Histórico = arquivo individual.
- Lixeira = itens excluídos.
- Restaurar OneDrive = desfazer mudanças em massa, quando disponível.

## Google Drive

| Modo | Regra |
|---|---|
| streaming | conteúdo principal na nuvem |
| espelhamento | nuvem + cópia completa local |

Ambos sincronizam alterações.

### Meu Drive

- Leitor;
- Comentador;
- Editor;
- Proprietário.

### Drive compartilhado

- Leitor;
- Comentador;
- Colaborador;
- Administrador de conteúdo;
- Administrador.

Favorece continuidade institucional.

## Casos rápidos

| Sintoma | Interpretação |
|---|---|
| snapshot perdido com o storage | mesmo domínio de falha |
| ransomware propagado à nuvem | sincronização funcionou |
| RPO atendido, serviço demorou | possível falha no RTO |
| link recebido, acesso negado | falta permissão |
| exclusão no espelhamento | pode propagar |
| servidor saiu e levou Meu Drive | problema de governança |

## Pegadinhas

- snapshot ≠ backup independente;
- RAID ≠ backup;
- incremental ≠ diferencial;
- rotação ≠ tipo;
- RPO ≠ RTO;
- mesma pasta/disco ≠ cópia independente;
- cópia mais recente ≠ ponto correto;
- backup de cópia não limpa atributo;
- incremental limpa atributo;
- diferencial não limpa;
- espelhamento ≠ proteção contra exclusão;
- lixeira ≠ backup;
- OneDrive/Drive podem ser destino de backup, mas não toda sincronização é backup.
