# Inteligência artificial e automação de serviços públicos

## Corte

| Plano | Situação |
|---|---|
| edital | normas vigentes em 6/7/2026 |
| Portaria <abbr title="Ministério da Gestão e da Inovação em Serviços Públicos">MGI</abbr> nº 3.485 | vigente; âmbito institucional delimitado |
| <abbr title="Projeto de Lei">PL</abbr> nº 2.338 | projeto, não lei |
| Portaria <abbr title="Secretaria de Governo Digital">SGD</abbr>/<abbr title="Ministério da Gestão e da Inovação em Serviços Públicos">MGI</abbr> nº 5.921 | vigência em 1º/9/2026 |

## Conceitos

| Termo | Regra |
|---|---|
| automação | executa tarefa |
| determinística | mesma condição, ação prevista |
| algoritmo | instruções |
| IA | infere saídas |
| <abbr title="aprendizado de máquina">ML</abbr> | aprende padrões |
| generativa | cria conteúdo |
| <abbr title="automação robótica de processos">RPA</abbr> | imita ações em interfaces |
| chatbot | interface conversacional |

Automação ≠ IA. Chatbot ≠ <abbr title="grande modelo de linguagem">LLM</abbr>.

## Modelo × sistema

| Modelo | Sistema |
|---|---|
| componente treinado | modelo + dados + interface + regras + integrações + controles |
| produz saída | opera uma jornada |
| não possui competência | integra processo sob responsabilidade do órgão |

## Efeito

```text
Apoio → triagem → recomendação → decisão
```

Quanto maior o efeito, maior o controle.

## Generativa

```text
Prompt → contexto → geração → verificação
```

- fluência ≠ verdade;
- temperatura baixa ≠ correção;
- contexto ≠ treinamento;
- mesma IA confirmando ≠ auditoria independente.

## <abbr title="geração aumentada por recuperação">RAG</abbr>

```text
Busca → trecho → contexto → resposta
```

RAG ≠ ajuste fino.

Verifique:

- fonte;
- versão;
- vigência;
- pertinência;
- correspondência da citação;
- atualização do índice.

Fonte real pode estar revogada.

## Chatbot

| Função | Controle |
|---|---|
| informação geral | fonte vigente |
| pessoal | autenticação/autorização |
| protocolo | confirmação |
| transação | autorização e evidência |
| recomendação | critérios e revisão |
| decisão | competência e recurso |

## Transparência

Informar:

- que é automação;
- finalidade;
- limites;
- responsável;
- efeito da mensagem;
- canal humano;
- revisão/contestação.

## Supervisão humana

| Modelo | Regra |
|---|---|
| human-in-the-loop | pessoa antes do efeito |
| human-on-the-loop | monitora e intervém |
| human-out-of-the-loop | sem intervenção operacional |
| aprovação formal | não prova supervisão efetiva |

Controle real exige tempo, fonte, competência e poder de discordar.

## Equidade

- média pode esconder erro por grupo;
- proxy pode reproduzir atributo protegido;
- sub-representação aumenta erro;
- medir falso positivo/negativo e impacto;
- corrigir exclusão digital.

## <abbr title="Lei Geral de Proteção de Dados Pessoais">LGPD</abbr>

- finalidade;
- necessidade;
- transparência;
- segurança;
- prevenção;
- não discriminação;
- prestação de contas.

Art. 20: decisão **unicamente automatizada**, com dados pessoais e efeito sobre interesses.

## Informação em ferramenta externa

| Informação | Conduta |
|---|---|
| pública aprovada | conforme política |
| interna | ambiente autorizado |
| pessoal | base + mínimo + segurança |
| sensível | controle reforçado |
| sigilosa | não enviar a ferramenta não autorizada |
| senha/chave | nunca como contexto comum |

Gratuito ≠ confidencial.

## Segurança

- prompt injection direta/indireta;
- conteúdo recuperado é dado, não instrução;
- menor privilégio;
- lista fechada de ferramentas;
- validar parâmetros;
- confirmar ação sensível;
- limitar quantidade/valor;
- registrar e permitir interrupção.

## Agentes

| Arquitetura | Capacidade |
|---|---|
| chatbot | texto |
| RAG | busca + texto |
| assistente com ferramenta | consulta |
| agente | planeja e age |
| multiagente | distribui tarefas |

Autonomia maior = controle maior.

## Governança

```text
Problema → finalidade → inventário → impacto →
teste → produção → monitoramento → incidente → desativação
```

## Métricas

| Uso | Medida |
|---|---|
| classificação | falso positivo/negativo |
| chatbot | resolução, abandono, encaminhamento |
| geração | factualidade, fundamentação, revisão |
| serviço | prazo, retrabalho, satisfação, equidade |

Métrica offline ≠ desempenho real.

## Casos

| Caso | Chave |
|---|---|
| minuta | revisão e responsabilidade humana |
| fila | triagem não é mérito |
| norma revogada | citação ≠ vigência |
| 800 aprovações em minutos | supervisão aparente |
| agente altera cadastro | confirmação, limite e log |
| processo sigiloso em IA gratuita | ambiente não autorizado |

## Pegadinhas

- algoritmo ≠ IA;
- RPA ≠ robô físico;
- modelo ≠ sistema;
- prompt ≠ prova;
- RAG ≠ treinamento;
- “sugestão” seguida sempre pode funcionar como decisão;
- humano no fluxo ≠ supervisão efetiva;
- fornecedor ≠ autoridade administrativa;
- contrato ≠ transferência da responsabilidade;
- PL nº 2.338 ≠ lei;
- portaria institucional ≠ norma geral nacional;
- norma publicada ≠ norma vigente.
