# Inteligência artificial e automação de serviços públicos

## Corte

| Item | Regra |
|---|---|
| legislação do edital | vigente em 6/7/2026 |
| Portaria MGI nº 3.485/2026 | institucional e vigente antes do edital |
| PL nº 2.338/2023 | projeto, não lei em 28/7/2026 |

## Conceitos

| Termo | Regra |
|---|---|
| automação | executa tarefa |
| algoritmo | instruções |
| IA | infere saída |
| ML | aprende padrões |
| RPA | reproduz ações em sistemas |
| generativa | cria conteúdo |
| preditiva | estima resultado |

Automação ≠ IA. Algoritmo ≠ ML.

## Modelo × sistema

| Modelo | Sistema |
|---|---|
| componente treinado | modelo + dados + interface + regras + integrações + pessoas + controles |
| produz saída | produz efeito na jornada |
| pode ser preciso | processo ainda pode ser ilegal ou inseguro |

## Função da saída

| Papel | Efeito |
|---|---|
| apoio | humano trabalha sobre saída |
| triagem | ordena ou encaminha |
| recomendação | sugere ação |
| decisão | produz efeito |

Nome dado pelo órgão ≠ efeito real.

## IA generativa

```text
Prompt → contexto → geração → verificação
```

- fluência ≠ verdade;
- temperatura baixa ≠ correção;
- fonte citada ≠ fonte vigente;
- usuário humano continua responsável.

## RAG

```text
Pergunta → busca → trechos → geração
```

| RAG | Ajuste fino |
|---|---|
| consulta fonte | altera parâmetros |
| atualização rápida da base | novo treinamento |
| pode citar | muda comportamento |

RAG ≠ ausência de alucinação.

## Chatbots

| Tipo | Regra |
|---|---|
| regras | árvore predefinida |
| recuperação | busca resposta |
| NLP | interpreta intenção |
| generativo | cria resposta |
| híbrido | combina técnicas |

## Atendimento

```text
Informação → orientação → dado pessoal →
protocolo → transação → recomendação → decisão
```

Quanto maior o efeito, maior o controle.

## Agentes

- lista fechada de ferramentas;
- menor privilégio;
- autorização por ação;
- confirmação para ato sensível;
- limites;
- logs;
- interrupção;
- reversão.

Gerar ≠ enviar. Consultar ≠ alterar.

## Supervisão humana

| Modelo | Regra |
|---|---|
| human-in-the-loop | antes do efeito |
| human-on-the-loop | monitora e intervém |
| human-out-of-the-loop | sem intervenção operacional |
| aprovação formal | não é controle efetivo |

Humano precisa poder compreender, discordar, editar e interromper.

## Governança

```text
Problema → finalidade → inventário → risco →
teste → implantação → monitoramento →
incidente → correção → desativação
```

## Equidade

- dados históricos podem reproduzir desigualdade;
- compare erros entre grupos;
- falso positivo ≠ falso negativo;
- média global pode esconder dano concentrado;
- variável substituta pode discriminar.

## Transparência

Explique:

- uso de IA;
- finalidade;
- papel da saída;
- fontes;
- limitações;
- responsável;
- contestação.

Código-fonte ≠ explicação suficiente.

## LGPD

- base;
- finalidade;
- necessidade;
- transparência;
- segurança;
- direitos;
- revisão de decisão unicamente automatizada;
- critérios e procedimentos.

## Ferramentas externas

| Informação | Conduta |
|---|---|
| pública aprovada | conforme política |
| interna | ambiente autorizado |
| pessoal | base + minimização + contrato |
| sensível | controle reforçado |
| sigilosa | não inserir em ferramenta externa não autorizada |
| senha/chave | nunca inserir |

Grátis ≠ autorizado.

## Segurança

- prompt injection direta/indireta;
- fonte recuperada pode ser hostil;
- separar instrução e dado;
- não executar código automaticamente;
- validar parâmetros;
- limitar ferramentas;
- confirmar ações;
- monitorar.

## Métricas

| Sistema | Medidas |
|---|---|
| classificador | precisão, revocação, F1, erros |
| chatbot | resolução, transferência, satisfação |
| generativo | factualidade, sustentação, toxicidade |
| RAG | recuperação, vigência, citação |
| agente | bloqueios, reversões, duplicidades |

## Contratação

- dados e titularidade;
- treinamento;
- subcontratados;
- auditoria;
- incidentes;
- continuidade;
- portabilidade;
- reversibilidade;
- exclusão;
- versão do modelo.

Fornecedor ≠ transferência total de responsabilidade.

## Casos

| Caso | Chave |
|---|---|
| RAG com norma revogada | fonte real, resposta errada |
| 800 aprovações em 3 min | supervisão aparente |
| agente altera cadastro | autorização + confirmação + log |
| chatbot não protocola | orientação, não pedido |
| dado sigiloso em IA gratuita | uso não autorizado |
| triagem elimina pedido | efeito decisório |

## Pegadinhas

- modelo ≠ sistema;
- previsão ≠ decisão;
- chatbot ≠ generativo;
- RAG ≠ treinamento;
- explicação ≠ código;
- log ≠ dado sem proteção;
- IA ≠ agente público;
- política institucional ≠ lei geral;
- PL ≠ norma vigente;
- presença humana ≠ revisão efetiva.
