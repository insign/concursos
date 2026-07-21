# PEN e SEI

## Mapa essencial

| Elemento | Natureza | Função |
|---|---|---|
| PEN | infraestrutura pública | integrar soluções de processo administrativo eletrônico |
| SEI | sistema criado pelo TRF4 | produzir, instruir, assinar, tramitar e acompanhar processos |
| ProPEN | programa nacional | expandir soluções do PEN para instituições elegíveis |
| Tramita GOV.BR | interoperabilidade | expedir processos e documentos avulsos entre SPEs |
| Protocolo GOV.BR | porta de entrada | receber documentos e requerimentos de pessoas físicas e jurídicas |
| Protocolo Integrado | consulta integrada | reunir dados e históricos de tramitação |
| NUP | padrão de identificação | numerar processos e documentos avulsos |

Corte: **18/07/2026**.

- PEN não é software único.
- PEN não é sinônimo de SEI.
- Tramita GOV.BR não é protocolo do cidadão.
- NUP identifica; não tramita.

## Marcos

| Ano | Marco |
|---|---|
| 2013 | ACT nº 02/2013 formaliza o PEN |
| 2015 | Decreto nº 8.539 disciplina processo eletrônico federal abrangido |
| 2023 | ACT MGI/TRF4 reforça desenvolvimento colaborativo e governança do SEI |
| 2024 | Decreto nº 11.946 institui o ProPEN |
| 2025 | Portaria SEGES/MGI nº 1.363 institui o Tramita GOV.BR atual |

O Decreto nº 8.539/2015 **não criou** o PEN.

ProPEN:

- Estados e Distrito Federal aderem por acordo dos Governadores com o MGI.
- Estados distribuem as soluções aos Municípios de seu território.
- Adesão direta de Município ou consórcio intermunicipal é excepcional e depende de avaliação do MGI.
- A lista mais ampla de aderentes do Tramita GOV.BR não deve ser atribuída ao ProPEN.

## Decreto nº 8.539/2015

Âmbito:

- administração pública federal direta;
- autarquias federais;
- fundações públicas federais.

Não se aplica automaticamente a todos os Poderes, entes, estatais ou Tribunais de Contas.

### Conceitos

| Termo | Regra curta |
|---|---|
| documento | unidade de registro, qualquer que seja suporte, formato ou natureza |
| documento digital | informação binária interpretável por sistema computacional |
| nato-digital | criado originalmente em meio eletrônico |
| digitalizado | conversão digital de documento não digital |
| processo eletrônico | atos registrados e disponibilizados eletronicamente |

### Objetivos

- eficiência, eficácia e efetividade;
- segurança e transparência;
- economicidade;
- sustentabilidade ambiental;
- acesso do cidadão.

Programas com código aberto são **preferenciais**, não obrigatórios em caráter absoluto.

### Meio eletrônico e exceções

Regra: atos processuais eletrônicos.

Exceções:

1. inviabilidade do procedimento eletrônico;
2. indisponibilidade prolongada capaz de prejudicar a celeridade.

O documento-base produzido nessas situações deve ser depois digitalizado.

### Data e prazo

- Ato ocorre no dia e hora do **recebimento pelo sistema**.
- Sistema fornece recibo eletrônico de protocolo.
- Sem regra especial: tempestivo até **23h59 do último dia**, horário de Brasília.
- Indisponibilidade técnica: prorrogação automática até 23h59 do primeiro dia útil após a solução.

### Valor documental

- Nato-digital corretamente assinado: original.
- Digitalizado enviado pelo interessado: em regra, cópia simples.
- Acesso e sigilo obedecem à LAI e às demais normas aplicáveis.

## SEI

- Criado pelo **TRF4**.
- Solução central do PEN, mas não esgota o ecossistema.
- Instalações variam por versão, módulos, perfis, permissões, tipos, unidades e normas internas.
- Configuração local não deve ser tratada como regra universal.

### Estrutura

| Elemento | Função |
|---|---|
| processo | reúne documentos e atos sobre uma matéria |
| árvore | exibe documentos e elementos relacionados |
| tipo de processo | orienta classificação, metadados, acesso e controles |
| unidade | estrutura organizacional que pratica operações |
| usuário interno | agente autorizado em uma ou mais unidades |
| usuário externo | pessoa com funções delimitadas, como consulta ou assinatura liberada |

Classificação por assuntos deve seguir a orientação da gestão documental.

### Documentos

| Tipo | Origem |
|---|---|
| interno | produzido no editor do SEI |
| externo | produzido ou recebido fora do editor e incluído nos autos |

- Externo pode ser nato-digital ou digitalizado.
- Inclusão exige metadados e acesso corretos.
- Assinatura não corrige incompetência, ilegalidade ou acesso indevido.

## Início e distribuição

### Iniciar

- selecionar tipo;
- informar especificação e interessados;
- registrar observações;
- indicar prioridade, quando cabível;
- definir nível de acesso.

### Receber

Registra:

- data e hora;
- unidade;
- usuário que recebeu.

Cores da tela não substituem o histórico.

### Atribuir

- distribui trabalho a usuário da unidade;
- não transfere propriedade exclusiva;
- não bloqueia automaticamente os demais usuários autorizados da unidade.

## Acesso

| Nível | Efeito operacional geral |
|---|---|
| público | sem restrição jurídica cadastrada |
| restrito | acesso às unidades de tramitação + hipótese legal obrigatória |
| sigiloso | credencial específica + tipo habilitado |

- Público no SEI não significa publicação irrestrita na internet.
- O sistema controla acesso; não cria fundamento jurídico de sigilo.
- Sigiloso no SEI não equivale automaticamente aos graus da LAI.
- O manual federal orienta que informação classificada nos graus da LAI não tramite no SEI.

Acesso externo:

- libera conteúdo delimitado e por prazo;
- não transforma usuário externo em interno;
- não libera automaticamente todo o processo;
- não altera o nível jurídico de acesso.

## Tramitação

### Enviar

- tramita para uma ou mais unidades;
- pode manter aberto na origem;
- pode notificar destinatário;
- pode definir retorno programado.

Envio simultâneo e adequado quando as atividades são independentes.

Sem “manter aberto”, o envio normalmente conclui na origem, mas não nas destinatárias.

### Concluir

- retira da tela de trabalho da unidade sem providência pendente;
- não conclui nas demais unidades;
- não elimina nem arquiva definitivamente;
- continua pesquisável.

### Reabrir

- unidade pela qual o processo tramitou pode reabrir para nova ação;
- simples consulta não exige reabertura;
- no fluxo do manual, atribui ao usuário que reabriu.

## Organização e acompanhamento

| Recurso | Efeito |
|---|---|
| acompanhamento especial | grupo de monitoramento sem tramitar |
| anotação | observação visível apenas na unidade |
| comentário | observação fora da instrução, visível conforme acesso |
| ciência | registra conhecimento sem criar documento |
| marcador | etiqueta interna da unidade |
| ponto de controle | indica fase ou situação para gestão |
| base de conhecimento | reúne orientações ligadas ao tipo de processo |

- Ciência não é decisão nem assinatura.
- Marcador não muda acesso, tramitação ou conteúdo formal.
- Base de conhecimento não prevalece sobre norma superior.

### Prazos

| Recurso | Âmbito |
|---|---|
| retorno programado | envio para outra unidade e expectativa de devolução |
| controle de prazos | organização interna de vencimentos |

Retorno programado:

- não retira acesso no vencimento;
- não devolve automaticamente;
- não termina por mera conclusão na destinatária;
- exige envio de volta para caracterizar retorno.

## Blocos

| Bloco | Função |
|---|---|
| assinatura | disponibiliza minutas para assinatura; não tramita o processo |
| interno | organiza processos na unidade |
| reunião | reúne processos para apreciação |

Inserção em bloco não muda, sozinha, tramitação, acesso ou competência.

## Relações entre processos

| Operação | Regra |
|---|---|
| relacionar | cria referência; processos continuam autônomos |
| anexar | incorpora com vínculo processual mais forte |
| sobrestar | suspende andamento por determinação formal registrada em processo |

- Desanexação depende de permissão, justificativa e regra institucional.
- Determinação em outro processo exige sobrestamento vinculado e indicação desse processo.
- Sobrestamento não conclui, elimina ou apaga prazo legal.

## Pesquisa, histórico e publicação

- Pesquisa respeita as permissões do usuário.
- Ausência no resultado não prova inexistência de conteúdo protegido.
- Histórico registra operações, unidades, usuários e momentos.
- Publicação em veículo oficial não se confunde com acesso público, acesso externo ou envio.

## Tramita GOV.BR

- Nome histórico: Barramento de Serviços do PEN.
- Expede processos e documentos avulsos entre SPEs.
- Cria padrão de interoperabilidade externa.
- Preserva integridade, autenticidade, segurança, confiabilidade e confidencialidade.
- Uso obrigatório na administração federal direta, autárquica e fundacional.
- Outros participantes podem aderir conforme Portaria e ProPEN.
- Conecta sistemas diferentes; não exige que todos usem SEI.

## Protocolo e NUP

### Protocolo GOV.BR

- entrada de documentos, solicitações e requerimentos externos;
- atende pessoas físicas e jurídicas;
- não é expedição entre dois SPEs.

### Protocolo Integrado

- consulta número, metadados, situação, unidade e histórico;
- não fornece automaticamente a íntegra;
- recebe dados padronizados dos participantes, inclusive XML, em intervalos de até 48 horas.

### NUP

Estrutura federal:

- 5 dígitos: unidade protocolizadora;
- 6 dígitos: sequencial anual;
- 4 dígitos: ano;
- 2 dígitos: verificadores.

Modelo: `00000.000000/2026-00`.

NUP não é assinatura, acesso, tramitação nem classificação arquivística.

## Gestão documental

Processo eletrônico continua sujeito a:

- classificação;
- avaliação;
- temporalidade;
- destinação;
- eliminação autorizada;
- guarda permanente;
- preservação.

- Metadados apoiam identificação, autenticidade, interoperabilidade e preservação.
- Sistemas devem observar a ePING.
- Fora de padrão específico, preferem-se formatos abertos, interoperáveis e independentes de plataforma.
- Adotar SEI não resolve automaticamente toda a gestão e preservação arquivística.
- No Poder Executivo federal, a orientação arquivística exige requisitos de SIGAD/e-ARQ Brasil e estratégia de repositório arquivístico confiável quando aplicável.

## Decisão rápida

| Se a questão disser... | Resposta-chave |
|---|---|
| infraestrutura nacional | PEN |
| sistema do TRF4 | SEI |
| expansão das soluções | ProPEN |
| expedição entre SPEs | Tramita GOV.BR |
| demanda externa do cidadão | Protocolo GOV.BR |
| consulta de tramitação | Protocolo Integrado |
| identificação padronizada | NUP |
| minutas para assinatura | bloco de assinatura |
| nota apenas da unidade | anotação |
| conhecimento sem documento | ciência |
| monitoramento sem tramitação | acompanhamento especial |
| vínculo com autonomia | relacionamento |
| integração processual forte | anexação |
| pausa justificada | sobrestamento |
| fim do trabalho local | conclusão na unidade |

## Pegadinhas-relâmpago

- PEN ≠ SEI.
- Tramita ≠ Protocolo GOV.BR.
- Protocolo Integrado ≠ íntegra automática.
- NUP ≠ tramitação.
- Público no SEI ≠ internet.
- Restrito exige fundamento legal.
- Atribuição ≠ exclusividade.
- Conclusão local ≠ encerramento global.
- Acompanhamento ≠ envio.
- Anotação não acompanha tramitação.
- Ciência ≠ decisão.
- Retorno programado ≠ devolução automática.
- Relacionar ≠ anexar.
- Bloco de assinatura ≠ envio do processo.
- SEI ≠ preservação arquivística completa.
