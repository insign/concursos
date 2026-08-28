# Big data, análise de dados, <abbr title="Internet das Coisas">IoT</abbr> e cidades inteligentes

Corte: **10/08/2026**.

## Mapa de 30 segundos

| Conceito | Regra curta |
| --- | --- |
| dado | representação de fato, medida ou valor |
| informação | dado contextualizado/processado |
| big data | escala, ritmo, variedade ou complexidade que exige tratamento adequado |
| IoT | coisas/dispositivos conectados e interoperáveis |
| cidade inteligente | tecnologia aplicada a problemas urbanos e valor público |

**Mais dados ≠ melhor decisão. IoT ≠ <abbr title="inteligência artificial">IA</abbr>. Mais sensores ≠ cidade mais inteligente.**

## Organização dos dados

| Tipo | Exemplo |
| --- | --- |
| estruturado | tabela, cadastro, transação |
| semiestruturado | <abbr title="JavaScript Object Notation">JSON</abbr>, <abbr title="Extensible Markup Language">XML</abbr>, log |
| não estruturado | texto livre, imagem, áudio, vídeo |

- Metadado = significado, fonte, unidade, período, método.
- Estruturado ≠ correto.
- JSON é normalmente semiestruturado.

## 5 Vs

| V | Pense em... |
| --- | --- |
| volume | quantidade |
| velocidade | ritmo de chegada/processamento |
| variedade | fontes e formatos |
| veracidade | confiança/qualidade |
| valor | utilidade legítima |

**Volume sem veracidade = erro em escala.**

## Qualidade e cobertura

| Dimensão | Pergunta |
| --- | --- |
| acurácia | representa corretamente o fenômeno? |
| completude | campos necessários estão preenchidos? |
| consistência | fontes/regras são compatíveis? |
| atualidade | ainda serve à decisão? |
| validade | formato/domínio estão corretos? |

Pegadinhas:

- completo pode estar errado;
- dado antigo pode estar completo e desatualizado;
- amostra grande pode continuar enviesada;
- ausência de dado ≠ zero.

## Tipos de análise

| Tipo | Pergunta |
| --- | --- |
| descritiva | o que ocorreu? |
| diagnóstica | por que/com que fatores ocorreu? |
| preditiva | o que provavelmente ocorrerá? |
| prescritiva | que ação é recomendável sob restrições? |

- Preditiva **estima**; não prova causa.
- Prescritiva **recomenda**; não cria competência ou orçamento.
- As quatro categorias não formam escada obrigatória.

## Correlação × causalidade

| Termo | Regra |
| --- | --- |
| correlação | associação entre variáveis |
| causalidade | efeito atribuído após considerar explicações alternativas |
| contrafactual | o que provavelmente ocorreria sem a intervenção |

**Depois de X ≠ por causa de X.**

## Políticas públicas

| Categoria | Exemplo em alerta de enchente |
| --- | --- |
| insumo | equipe + sensores |
| produto | pontos monitorados + alertas emitidos |
| resultado | aviso com maior antecedência |
| impacto | redução sustentável de perdas atribuível à política |

**Sensor instalado = produto, não impacto.**

Antes de comparar indicadores, confira:

- definição;
- fonte;
- período;
- unidade;
- população/território;
- denominador;
- limitações.

## Dados no setor público

- Metadados ajudam a interpretar e descobrir dados.
- Interoperabilidade = troca útil entre sistemas/organizações.
- Integração técnica sem significado comum pode gerar interpretação errada.
- <abbr title="Infraestrutura Nacional de Dados">IND</abbr> = contexto atual de integração e compartilhamento governamental; não substitui qualidade, competência ou regras de acesso.

## IoT

Decreto nº 9.854/2019:

- institui o Plano Nacional de IoT;
- envolve coisas/dispositivos, conectividade, serviços e interoperabilidade;
- IoT não é qualquer acesso à internet;
- IoT pode operar sem IA.

## Sensor × atuador

| Elemento | Função |
| --- | --- |
| sensor | observa/mede e gera dado |
| atuador | executa ação física |
| conectividade | transporta dados/comandos |
| gateway | pode concentrar e converter protocolos |
| edge | processa perto da fonte |
| plataforma/nuvem | integra, armazena, monitora e analisa |

**Sensor observa; atuador age.**

## Telemetria × comando

| Fluxo | Exemplo |
| --- | --- |
| telemetria | sensor envia nível do rio |
| comando | sistema manda fechar válvula |

- Gateway não é obrigatório em toda solução.
- Edge e nuvem podem coexistir.
- Comunicação escolhida depende de alcance, banda, latência, energia, custo e disponibilidade.

## IoT: noções de continuidade

Uma solução urbana deve prever:

- dispositivo identificado/autenticado;
- acesso controlado;
- atualização e manutenção;
- falha de rede/energia/plataforma;
- sensor defeituoso ou dado ausente;
- estado seguro quando a automação falha.

## Cidades inteligentes

Carta Brasileira:

- transformação digital + desenvolvimento urbano sustentável;
- tecnologia para problemas concretos;
- valor público, inclusão, colaboração e resiliência;
- uso responsável de dados e <abbr title="tecnologias da informação e comunicação">TIC</abbr>;
- **é orientação estratégica, não lei**.

## Aplicações urbanas

| Área | Aplicação |
| --- | --- |
| mobilidade | frota, chegada, semáforos |
| iluminação | falhas, consumo, regulação |
| saneamento | pressão, vazão, perdas |
| resíduos | demanda e rotas |
| ambiente | ar, ruído, chuva, calor |
| energia | medição e gestão |
| defesa civil | rios, pluviômetros, sirenes |

## Decisão rápida

| Se a questão disser... | Pense primeiro em... |
| --- | --- |
| quantidade/ritmo/formatos/confiança/utilidade | 5 Vs |
| o que ocorreu | descritiva |
| fatores relacionados | diagnóstica |
| futuro provável | preditiva |
| ação recomendada | prescritiva |
| associação | correlação |
| efeito atribuído | causalidade |
| recurso mobilizado | insumo |
| entrega imediata | produto |
| mudança no serviço | resultado |
| efeito amplo atribuído | impacto |
| fenômeno medido | sensor |
| ação física | atuador |
| observação enviada | telemetria |
| instrução para agir | comando |
| tecnologia urbana orientada a problema | cidade inteligente |

## Pegadinhas-relâmpago

1. Big data ≠ apenas volume.
2. 5 Vs ≠ regra legal fechada.
3. Estrutura ≠ qualidade.
4. Completo ≠ atual.
5. Amostra grande ≠ representativa.
6. Ausência ≠ zero.
7. Preditiva ≠ causal.
8. Prescritiva ≠ decisão competente.
9. Correlação ≠ causalidade.
10. Produto ≠ impacto.
11. IoT ≠ IA.
12. Sensor ≠ atuador.
13. Gateway pode ser dispensado.
14. Edge pode coexistir com nuvem.
15. Telemetria ≠ comando.
16. Carta Brasileira ≠ lei.
17. Mais sensores ≠ mais inteligência urbana.
