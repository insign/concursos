# Big data, análise de dados, IoT e cidades inteligentes

Corte: **18/07/2026**.

## Mapa essencial

| Conceito | Regra curta |
|---|---|
| dado | representação de fato, medida, símbolo ou valor |
| informação | dado contextualizado ou processado para transmitir conhecimento |
| big data | escala, ritmo, diversidade ou complexidade que exige arquitetura adequada |
| IoT | coisas e dispositivos conectados, interoperáveis e integrados a serviços |
| cidade inteligente | tecnologia a serviço de desenvolvimento sustentável, inclusão e valor público |

- Big data não é apenas volume.
- Análise informa decisão; não substitui competência, contexto ou participação.
- IoT não exige IA.
- Cidade inteligente não se mede pela quantidade de sensores.

## Organização dos dados

| Tipo | Exemplo |
|---|---|
| estruturado | tabela relacional, transação, série com campos fixos |
| semiestruturado | JSON, XML, log com chaves |
| não estruturado | texto livre, imagem, áudio, vídeo |

- Estrutura não garante qualidade.
- JSON é normalmente semiestruturado.
- Imagem pode ter metadados estruturados e conteúdo não estruturado.
- Metadado descreve significado, origem, unidade, atualização, método e restrição.

## 5 Vs

| V | Ideia |
|---|---|
| volume | quantidade |
| velocidade | ritmo de chegada e resposta |
| variedade | fontes e formatos |
| veracidade | confiança e qualidade |
| valor | utilidade legítima produzida |

- 5 Vs = heurística, não lista legal fechada.
- Mais volume pode ampliar erro, custo e risco.
- O que é “big” depende da capacidade e da necessidade de uso.

## Fluxo e processamento

| Abordagem | Regra |
|---|---|
| lote | processa eventos acumulados em intervalos |
| streaming | processa fluxo contínuo ou quase em tempo real |
| ETL | extrair → transformar → carregar |
| ELT | extrair → carregar → transformar |

- Streaming não elimina armazenamento.
- Evento pode atrasar, duplicar, faltar ou chegar fora de ordem.
- Lote e streaming podem coexistir.
- ETL e ELT exigem validação, segurança, linhagem e tratamento de erro.

## Plataformas

| Plataforma | Foco típico | Atenção |
|---|---|---|
| warehouse | BI e relatórios com dados conformados | não é sistema transacional |
| lake | dados brutos e variados em escala | sem governança vira pântano |
| lakehouse | flexibilidade do lake + controles analíticos | não garante baixo custo ou interoperabilidade |

- *Schema-on-write*: esquema aplicado antes da gravação analítica.
- *Schema-on-read*: esquema aplicado ao ler os dados.
- Warehouse privilegia consistência analítica.
- Lake privilegia diversidade e flexibilidade.
- Lakehouse combina camadas, mas continua exigindo governança.

## Governança

Governança define:

- responsável e custodiante;
- definição oficial;
- qualidade;
- acesso e finalidade;
- retenção e descarte;
- mudança e incidente;
- valor e prestação de contas.

| Elemento | Função |
|---|---|
| metadados | descrevem dados |
| catálogo | permite descobrir conjuntos e responsáveis |
| glossário | harmoniza significados de negócio |
| linhagem | registra origem, transformação e destino |
| API | contrato de integração entre sistemas |
| interoperabilidade | sistemas e organizações trocam dados com entendimento e regras compatíveis |

- Catálogo desatualizado não comprova governança.
- API não garante semântica, qualidade ou autorização.
- Interoperabilidade é técnica, semântica, organizacional e jurídica.

## Qualidade

| Dimensão | Pergunta |
|---|---|
| completude | campos necessários existem? |
| acurácia | valor representa o fenômeno? |
| consistência | fontes e regras são compatíveis? |
| atualidade | dado ainda serve à decisão? |
| unicidade | duplicidades indevidas foram tratadas? |
| validade | formato e domínio foram respeitados? |
| disponibilidade | autorizado obtém quando precisa? |

- Qualidade = adequação ao uso.
- Completo pode estar errado.
- Preciso na coleta pode estar desatualizado hoje.
- Consistente pode não ser representativo.

## Decreto nº 10.046/2019

- Norma sobre compartilhamento entre APF direta, autárquica e fundacional e demais Poderes da União.
- Não se aplica automaticamente a todo ente estadual ou municipal.
- Finalidades: serviços, políticas, qualidade, fidedignidade e eficiência.

| Nível | Regra essencial |
|---|---|
| amplo | dado público sem restrição |
| restrito | dado sigiloso no âmbito definido, segundo regras do Comitê |
| específico | dado sigiloso para órgãos específicos, segundo gestor |

- Serviço web, cópia, lake compartilhado e plataforma podem ser mecanismos.
- Meio técnico não elimina finalidade, mínimo necessário, segurança, auditabilidade ou LGPD.

## Tipos de análise

| Tipo | Pergunta |
|---|---|
| descritiva | o que ocorreu? |
| diagnóstica | por que ou com quais fatores ocorreu? |
| preditiva | o que provavelmente ocorrerá? |
| prescritiva | que ação é recomendada sob metas e restrições? |

- Predição não é certeza nem causalidade.
- Prescrição analítica não cria competência ou orçamento.
- As categorias não são escada obrigatória.

## Políticas públicas

| Categoria | Significado | Exemplo de alertas |
|---|---|---|
| insumo | recurso | orçamento, equipe e sensores |
| processo | atividade | instalar, calibrar, manter |
| produto | entrega imediata | pontos monitorados, alertas emitidos |
| resultado | mudança no serviço/público | aviso com antecedência |
| impacto | efeito amplo atribuível | redução sustentável de perdas |

- Sensor instalado = produto, não prova de impacto.
- Indicador precisa de fórmula, fonte, periodicidade, recorte, linha de base e meta.

$$
\text{taxa} = \frac{\text{eventos}}{\text{população ou exposição}} \times k
$$

- Total sem denominador pode refletir apenas população maior.
- Média é sensível a extremos; mediana é o valor central ordenado.
- Distribuição, percentis e grupos complementam medidas centrais.

## Correlação e causalidade

- Correlação = associação.
- Causalidade = efeito atribuível, consideradas explicações alternativas.
- Contrafactual = o que provavelmente ocorreria sem a intervenção.
- “Antes/depois” pode capturar tendência, sazonalidade ou outra mudança.
- “Participantes/não participantes” pode capturar diferenças preexistentes.

## Vieses e interpretação

Pergunte:

- quem está representado?
- quem ficou fora?
- qual território foi medido?
- houve mudança de definição?
- o instrumento está calibrado?
- o período captura sazonalidade?

- Amostra grande pode continuar enviesada.
- Viés de seleção distorce quem entra.
- Viés de medição distorce como o fenômeno é captado.
- Dado de aplicativo representa usuários do aplicativo, não automaticamente toda a população.
- Média territorial não permite inferir cada indivíduo: falácia ecológica.

## Dados ausentes

Não confundir:

- não coletado;
- não informado;
- inaplicável;
- falha de transmissão;
- sensor indisponível;
- zero verdadeiro.

- Ausência não é zero.
- Excluir incompletos pode excluir grupos com maior dificuldade de acesso.

## Visualização

Alertas:

- eixo truncado;
- escalas diferentes;
- total sem denominador;
- mapa sem normalização;
- período seletivo;
- ausência de incerteza;
- cores com ordem falsa.

Gráfico deve mostrar fonte, período, unidade, recorte e limitações.

## LGPD e dados urbanos

Podem ser pessoais conforme o contexto:

- localização;
- placa e trajeto;
- imagem e biometria;
- consumo individual;
- saúde;
- comportamento.

- Definir finalidade pública e competência.
- Coletar somente o necessário.
- Controlar acesso, retenção, compartilhamento e descarte.
- Uso secundário não se legitima pela possibilidade técnica.
- Publicar agregado não autoriza expor base individual.

### Anonimização

- Remover nome ou CPF pode não impedir reidentificação.
- Cruzamento de localização, horário e outras bases amplia risco.
- Anonimização busca impedir associação por meios razoáveis e disponíveis.
- Pseudonimização mantém informação adicional para associação.
- Pseudonimizado não é automaticamente anônimo.

## IoT

Decreto nº 9.854/2019:

- institui Plano Nacional de IoT;
- define IoT com conexão de coisas e dispositivos, serviços e interoperabilidade;
- coisa = objeto físico ou digital identificável e integrável por rede;
- dispositivo = comunicação obrigatória; sensoriamento, atuação, coleta, armazenamento e processamento são opcionais;
- observa segurança e proteção de dados;
- inclui saúde, cidades, indústrias e meio rural entre ambientes mínimos priorizados.

- Decreto = norma/estratégia de fomento, não protocolo ou certificado.
- IoT não exige IA.
- Automação isolada sem comunicação não basta.

## Arquitetura IoT

| Camada | Função |
|---|---|
| sensor | converte fenômeno em dado |
| atuador | converte comando em ação física |
| conectividade | transporta telemetria e comandos |
| gateway | concentra, converte, filtra e executa regra local |
| edge | processa próximo à fonte |
| fog | camada intermediária distribuída |
| cloud | escala, histórico, integração e gestão |
| plataforma | identidade, configuração, mensagens, regras e APIs |

- Gateway não é obrigatório em toda solução.
- Edge reduz latência/tráfego e pode sustentar operação local.
- Edge e cloud são complementares.
- Telemetria sobe como observação; comando desce como controle.
- Comando físico exige autenticação, autorização, integridade e confirmação.

## Conectividade

Escolha equilibra:

- alcance;
- largura de banda;
- latência;
- energia;
- custo;
- disponibilidade;
- mobilidade;
- segurança.

Vídeo e medidor periódico possuem necessidades diferentes.

## Segurança IoT

Catálogo técnico NIST:

1. identificação do dispositivo;
2. configuração autorizada;
3. proteção de dados;
4. acesso lógico restrito a interfaces;
5. atualização segura de software;
6. consciência do estado de cibersegurança;
7. segurança do dispositivo, hardware, software e recursos.

- NIST = referência técnica, não lei brasileira por si.
- Identidade única favorece revogação e auditoria.
- Desabilitar serviço desnecessário reduz superfície.
- Pacote de atualização deve ter autenticidade e integridade.
- Dispositivo funcional sem suporte pode estar inseguro.
- Logs exigem proteção, tempo confiável e retenção proporcional.

## Ciclo de vida IoT

1. requisitos e risco;
2. fornecedor, suporte e atualização;
3. instalação segura;
4. inventário e responsável;
5. segmentação e monitoramento;
6. correção;
7. incidente;
8. substituição;
9. descarte de dados e credenciais.

Preço de compra ≠ custo total. Incluir conectividade, licença, bateria, calibração, manutenção, equipe, reposição e saída.

Falhas a planejar:

- rede;
- nuvem;
- energia;
- sensor;
- evento atrasado/duplicado;
- comando não confirmado;
- componente comprometido.

Falha segura reduz dano; não significa operação normal garantida.

## Cidades inteligentes

Carta Brasileira:

- desenvolvimento urbano + transformação digital sustentáveis;
- planejamento, inovação, inclusão e atuação em rede;
- letramento digital;
- governança e gestão colaborativas;
- problemas concretos e valor público;
- redução de desigualdades;
- resiliência e qualidade de vida;
- uso seguro e responsável de dados e TIC.

Oito objetivos:

1. integrar digital e urbano sustentável;
2. acesso equitativo à internet;
3. governança com transparência, segurança e privacidade;
4. governança urbana inclusiva;
5. desenvolvimento econômico local;
6. financiamento sustentável;
7. educação, comunicação e engajamento;
8. avaliação contínua de impactos.

- Carta = agenda estratégica, não lei.
- Cidade inteligente não é cidade hipervigiada.
- Dispositivos instalados medem produto, não valor público.

## Aplicações

| Área | Uso possível | Cuidado |
|---|---|---|
| mobilidade | frota, chegada, semáforo | rastreamento e equidade territorial |
| iluminação | falha, consumo, regulação | segurança, acesso e custo total |
| saneamento | nível, vazão, pressão | calibração e contingência |
| resíduos | ocupação e rota | custo-benefício |
| ambiente | ar, ruído, calor | cobertura representativa |
| saúde | capacidade e alerta | dado pessoal sensível |
| defesa civil | chuva, rios, sirene | continuidade e protocolo de ação |

## Riscos urbanos

| Risco | Resposta |
|---|---|
| vigilância | finalidade, necessidade, retenção, auditoria |
| exclusão | multicanal, acessibilidade, conectividade e letramento |
| viés territorial | mapa de cobertura, fontes complementares e critérios públicos |
| lock-in | formatos, APIs, portabilidade, documentação e saída |
| obsolescência | suporte, atualização, peças e substituição |
| ataque | segmentação, identidade, menor privilégio e resposta |
| indisponibilidade | operação degradada, redundância e procedimento manual |
| uso secundário | finalidade, base jurídica e transparência |

## Natureza dos instrumentos

| Instrumento | Natureza |
|---|---|
| LGPD | lei vigente |
| Decreto nº 10.046/2019 | norma federal no âmbito definido |
| Decreto nº 9.854/2019 | norma instituidora do Plano de IoT |
| Carta Brasileira | estratégia e orientação |
| NISTIR 8259/catálogo | referência técnica |
| 5 Vs | heurística |

## Pegadinhas-relâmpago

1. Mais dados não significam melhor decisão.
2. Catálogo não é linhagem.
3. API não é interoperabilidade plena.
4. Preditiva não é causal.
5. Prescritiva não é competência.
6. Produto não é impacto.
7. Ausência não é zero.
8. Amostra grande pode ser enviesada.
9. Nome removido não garante anonimização.
10. IoT pode operar por regra fixa sem IA.
11. Sensor observa; atuador age.
12. Edge não elimina cloud.
13. Gateway pode ser dispensado.
14. NIST não é lei brasileira.
15. Carta não é regulamento.
16. Mais sensores podem reforçar desigualdade territorial.
17. Dispositivo sem suporte pode estar inseguro.
18. Piloto favorável não garante escala sustentável.
