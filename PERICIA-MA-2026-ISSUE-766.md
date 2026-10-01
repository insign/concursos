# Perícia Oficial/MA 2026 — Agente de Perícia Criminal — Generalista — campanha #766

Painel: [issue #766](https://github.com/insign/concursos/issues/766).

## 1. Autoridade, escopo e decisões

Este é o arquivo-mestre da implantação do **Cargo 1 — Agente de Perícia Criminal — Especialidade: Generalista**. O pedido de 30/09/2026 autorizou adaptar o prompt da #765 para a #766, criar este documento na raiz, ajustar o painel e preservar a qualidade do material criado, copiado ou revisado. Pedidos explícitos prevalecem.

**D766-01 — divisão de responsabilidades.** Este mestre mantém programa, matriz, decisões, dependências, estados C/H/Q, origens, evidências e totais detalhados. A #766 mantém somente roadmap breve, reservas, bloqueios, próxima ação, totais-resumo e link/commit. Esta divisão substitui, apenas nesta campanha, a exclusividade anterior do corpo da issue. Comentários, históricos de edição, ROADMAP.md e memória não definem estado. A main, seus schemas, catálogos, grupos, resolvedor, vínculos e ADRs definem os contratos vigentes.

**D766-02 — qualidade antes de volume.** Pesquisar, reaproveitar e publicar inclui revisão pedagógica integral: adequação temática e correção factual não bastam quando o iniciante não consegue aprender. A seção 6 aplica-se à criação, aos doadores, às cópias, às revisões e à inspeção de fechamento. Presença de arquivos, contagem de questões, marcação de siglas ou atualização de referências não substituem revisão semântica.

**D766-03 — comunicação.** Registrar entregas, commits confirmados e limites no GitHub e na conversa. Nenhum envio de e-mail integra a execução ou o aceite desta campanha.

**D766-04 — estado verificável na data.** Não manter tarefa em analyzing somente à espera de edital ou jurisprudência ainda inexistentes. Reconsultar e incorporar o que estiver oficialmente publicado, pertinente e admissível pelo corte aplicável; registrar separadamente consulta, julgamento, publicação, vigência e cortes. Um marco futuro não pode ser certificado antecipadamente nem emprestado de outro concurso. Atos posteriores relevantes exigem manutenção quando efetivamente publicados, sem invalidar automaticamente um aceite anterior. Bloqueio estrutural próprio e comprovado continua exigindo registro e intervenção, não um aceite fictício.

**Limite do cargo.** Cobrir todo o programa do Generalista, não apenas os acréscimos do roteiro incremental `Rota_de_estudos_concursos_MA_regras_da_prova-1.pdf` citado na issue. Não confundir com Agente de Perícia Médico-Legal, Médico Legista ou Perito Criminal. Excluir outros cargos/especialidades, novas funcionalidades, migrações gerais, mega revisões e execução de etapas médicas/administrativas do concurso. O acervo do TCE pode ser consultado, mas sua implantação e a #755 não são reabertas. Preservar também #764, #765 e campanhas consumidoras.

**Proveniência administrativa.** O planejamento foi transferido do corpo da #766, cuja versão anterior à reserva tinha `updated_at: 2026-09-11T00:05:17Z`. Os 51 IDs, títulos, descrições e estados de tarefas foram preservados no roadmap da seção 7. Nenhuma macro é aceita pela criação deste arquivo. O guia da seção 6 do mestre SEAP e AGENTS.md foram usados como orientação editorial, sem importar recortes, datas de corte, totais, unidades ou aceites daquela campanha.

## 2. Estado corrente e próxima ação

| Dimensão | Total | pending | analyzing | done |
|---|---:|---:|---:|---:|
| Implantação e fontes | 5 | 4 | 0 | 1 |
| Inventário e reaproveitamento | 5 | 5 | 0 | 0 |
| Macros editoriais C/H/Q | 36 | 36 | 0 | 0 |
| Fechamento | 5 | 5 | 0 | 0 |
| Total de macros individualizadas | 51 | 50 | 0 | 1 |

Os 12 blocos editoriais são agregadores das 36 macros C/H/Q: 11 blocos de conhecimentos e um bloco auxiliar de preparação discursiva. Não são mais 12 tarefas e o bloco auxiliar não é uma nova disciplina do edital.

Unidades reais, origens canônicas, pacotes locais, visões e entregáveis unitários ainda dependem do inventário e do desdobramento em PER-P03/PER-R01. Não há total unitário aceito nem cobertura percentual certificada. Não converter quantidade de macros em quantidade de assuntos, nem importar os totais de outras metas.

**PER-P01 done. Próxima ação: PER-P02.** A consolidação da seção 3 está publicada e confirmada na main, com evidência na seção 8.3. Definir título, slug, identidade, ordem e caminhos conforme os contratos correntes. Não há bloqueio estrutural próprio; “eclética” é incerteza localizada. Reservas operacionais vigentes devem ser lidas na #766.

## 3. Fontes recebidas e consolidação do edital

### 3.1 Documentos oficiais e alcance da consulta

**Consulta de PER-P01: 01/10/2026.** Foram consultados a [página oficial](https://www.cebraspe.org.br/concursos/PERICIA_OFICIAL_MA_26), a [listagem pública utilizada por essa página](https://apis.cebraspe.org.br/cebraspe/eventos/PERICIA_OFICIAL_MA_26) e os cinco documentos nela relacionados, distinguindo os atos das versões consolidadas. As 10 entradas de documentos correspondem a cinco pares de documento e versão acessível; não são dez atos. A consulta certifica o que estava publicado nessa data, sem antecipar atos futuros. A data do ato abaixo não é confundida com a disponibilização informada pelo portal; o Diário Oficial não foi consultado separadamente nesta etapa.

| Fonte | Data do ato / disponibilização no portal | Efeito para o Cargo 1 |
|---|---|---|
| [S01 — Edital nº 1, abertura original](https://cdn.cebraspe.org.br/concursos/PERICIA_OFICIAL_MA_26/arquivos/9763A298F0FB6A7D7912CD5C740F8EB3E197F20D6619699F990759ECAAA7CC94.pdf), 88 páginas | 17/07/2026 / 17/07/2026, 22:00 na listagem | Define o cargo, programa, regras e cortes. |
| [S02 — Edital nº 2](https://cdn.cebraspe.org.br/concursos/PERICIA_OFICIAL_MA_26/arquivos/74E03858B03ED6DADB2853B8FE9146D865348D136214591DA8357B850D550190.pdf), 2 páginas | 29/07/2026 / 29/07/2026, 14:30 na listagem | Altera denominação/requisitos dos Cargos 12 e 16 e as ocorrências do Cargo 12. Não altera o Generalista do Cargo 1. |
| [S03 — Comunicado de pagamento](https://cdn.cebraspe.org.br/concursos/PERICIA_OFICIAL_MA_26/arquivos/D612631D3212A03F60539F116E56673413523739D59D3844D1AB1F0DF782ACF8.pdf), 1 página | 05/08/2026 / 05/08/2026, 16:10 na listagem | Informa indisponibilidade então existente do documento de arrecadação e o canal oficial para pagamento. Não altera programa, prova ou cortes. Não se presume que aquela indisponibilidade persista na data da consulta. |
| [S04 — Edital nº 3](https://cdn.cebraspe.org.br/concursos/PERICIA_OFICIAL_MA_26/arquivos/75253C10CF6828584854CFE681CC805779A2522A11D1752E43974C9994167E9C.pdf), 1 página | **29/09/2026 / 01/10/2026, 10:00 na listagem** | Retifica somente os subtópicos 2.6, 8.4 e 9.4 de conhecimentos específicos do Cargo 8, Arquiteto. Não altera o Cargo 1, nem esclarece “eclética”. |
| [S05 — Edital nº 1 consolidado até o Edital nº 3](https://cdn.cebraspe.org.br/concursos/PERICIA_OFICIAL_MA_26/arquivos/4D20E2DA7DBC1641876662EB9AA0D7675004148D54B063FCBFE7EFC58355E6C2.pdf), 89 páginas | A capa identifica atualização até 29/09/2026; a entrada conserva a data da abertura, 17/07/2026 | **Base corrente de leitura e paginação deste mestre.** Consolidar não cria novo corte legislativo nem nova data do edital de abertura. |

Os horários acima reproduzem metadados do portal, sem atribuir fuso que o campo não informa. A listagem contém abertura, duas retificações, comunicado e consolidação; não apresentou outro ato que alterasse o Cargo 1 no snapshot consultado. S02, S03 e S04 foram lidos integralmente. De S01/S05 foram lidos integralmente o programa aplicável, as regras objetiva/discursiva, os cortes e o cronograma; programas e etapas exclusivas de outros cargos não integram a certificação.

O [documento inicialmente recebido, consolidado até o Edital nº 2](https://cdn.cebraspe.org.br/concursos/PERICIA_OFICIAL_MA_26/arquivos/5198B81A53AA5DA4F4880048963024CAAEEB5A6F2DCF43E43CD915A6E5A5A69F.pdf) foi reconsultado e comparado com S01/S05. A transcrição de 21.2.2 e do Cargo 1 em 21.2.3 coincide nas três versões após normalização de espaços de extração. A paginação usada abaixo é a de S05, contada a partir da capa. As páginas 59–61 do programa também foram renderizadas e inspecionadas visualmente.

O roteiro incremental `Rota_de_estudos_concursos_MA_regras_da_prova-1.pdf` continua sendo orientação anterior, não fonte substitutiva do programa. A base técnica histórica `6f9c945821bf14568c51801f26c82295df43de46` e a consulta inicial de 10/09/2026 são proveniência recebida, não estado corrente.

### 3.2 Cargo, provas, critérios e cortes consolidados

**Cargo 1 — Agente de Perícia Criminal — Especialidade: Generalista**, item 2.1, página 2. Requer graduação em qualquer área reconhecida pelo Ministério da Educação. Atribuições: apoio técnico-operacional e administrativo, sob coordenação e supervisão do Perito Oficial, aos exames periciais e aos serviços de identificação civil e criminal. Esses limites não autorizam incorporar o programa do Agente de Perícia Médico-Legal ou de Perito Criminal.

#### 3.2.1 Prova objetiva e habilitação à discursiva

Fonte: S05, itens 7.1–7.2, 8.1–8.3, 8.11.1–8.11.6 e 8.12, páginas 25–29.

| Aspecto | Regra para o Cargo 1 |
|---|---|
| Quantidade e distribuição | **80 questões**: 30 de conhecimentos gerais, Grupo I; 50 de conhecimentos específicos, Grupo II. Não há distribuição oficial por disciplina no quadro. |
| Formato | Múltipla escolha, cinco opções, uma resposta correta. Marcar um único campo por questão. |
| Pontuação | Máximo de **80 pontos**. Acerto: 1; erro, branco ou múltipla marcação: 0. A regra não prevê desconto por erro. A nota da objetiva é a soma das questões. |
| Mínimo eliminatório | Nota inferior a **40 pontos** elimina. Os itens citados não estabelecem mínimo separado por grupo. Atingir 40 não garante habilitação: também se aplica o limite classificatório. |
| Limite classificatório do Cargo 1 | **112** na ampla concorrência; **16** entre pessoas com deficiência; **32** entre candidatos negros, respeitados os empates na última posição. São quantitativos de aprovação nesta fase, não vagas do cargo. |
| Ajuste do limite | Se os aprovados nas reservas forem menos que os respectivos quantitativos, podem ser aprovados candidatos da ampla concorrência até o limite total, respeitados os empates, conforme 8.11.5.1. Não somar listas como se fossem pessoas necessariamente distintas. |
| Correção da discursiva | Somente para os aprovados nos termos de 8.11.5/8.11.5.1. Quem não tiver a discursiva corrigida será eliminado, conforme 9.7.1–9.7.3. |
| Tempo e turno | Objetiva e discursiva compartilham **5 horas**, no turno da tarde. |
| Recursos | Anulação atribui o ponto a todos; mudança de gabarito vale para todos, independentemente de recurso individual, conforme 8.12.6.1–8.12.6.2. |

Os itens 21.1.1–21.1.2, página 59, admitem compreensão, aplicação, análise, síntese e avaliação, além de memorização, e mais de um objeto de avaliação na mesma questão. Essa regra orienta Q, sem impor quotas ou inventar questões anteriores.

#### 3.2.2 Discursiva e critérios de correção

Fonte: S05, item 9 completo, páginas 29–31. Uma **redação dissertativa de até 30 linhas**, valendo **20 pontos**, sobre tema relacionado aos objetos de avaliação de **conhecimentos gerais, Grupo I**. Avalia domínio do tema, expressão escrita, registro formal da Língua Portuguesa, coerência e coesão, de acordo com o comando da banca. Não há disciplina autônoma de Atualidades neste programa.

A apresentação, a estrutura textual e o desenvolvimento do tema compõem a nota de conteúdo, de até 20 pontos. A modalidade escrita recebe contagem de erros gramaticais, incluindo grafia, morfossintaxe e propriedade vocabular. A fórmula do item 9.7.5 é:

$$\mathrm{NPD}=\mathrm{NC}-4\times\frac{\mathrm{NE}}{\mathrm{TL}}.$$

Na fórmula, <abbr title="Nota na Prova Discursiva">NPD</abbr> é a nota da redação; <abbr title="Nota relativa ao domínio do Conteúdo">NC</abbr>, a nota de conteúdo; <abbr title="Número de Erros">NE</abbr>, a quantidade de erros; e <abbr title="Total de Linhas efetivamente escritas">TL</abbr>, as linhas efetivamente escritas. Os símbolos da fórmula preservam o formato do edital. Resultado negativo recebe zero. Fuga ao tema e ausência de texto recebem zero, sem aplicar divisão a um texto inexistente. **Aprovação: nota da discursiva igual ou superior a 10 pontos.**

A avaliação de conteúdo usa ao menos dois examinadores e a média de duas notas convergentes. São convergentes se a diferença não ultrapassar 25% da nota máxima de conteúdo; divergência maior exige terceira correção e média das duas notas mais próximas, desde que convergentes, conforme 9.7.4.1.1–9.7.4.1.3.

Somente o documento definitivo é avaliado; rascunho não vale e não há substituição por erro do candidato. Texto manuscrito, legível, com caneta preta de material transparente; as exceções de auxílio e computador dependem do atendimento especializado deferido nos termos de 9.3–9.3.1. Fragmentos fora do espaço próprio ou além do limite de linhas são desconsiderados. Assinatura, rubrica ou marca identificadora em local impróprio anulam a prova; não devolver o documento definitivo também a anula.

O recurso ao padrão preliminar pode modificar o padrão para todos. Depois de definido o padrão definitivo, o recurso ao resultado provisório fica limitado à correção da resposta por esse padrão, sem voltar a impugná-lo em tese, conforme 9.8.1–9.8.6. PER-E12 reutilizará as bases do Grupo I, mantendo propostas abertas e modelos no material didático, fora do conjunto de questões objetivas.

#### 3.2.3 Datas e dois cortes diferentes

Fonte: S05, itens 20.32–20.34, página 59, e Anexo I, páginas 79–80.

| Marco | Registro aplicável |
|---|---|
| Edital de abertura | Datado de **17/07/2026**, disponibilizado no portal nessa mesma data. |
| Corte legislativo, 20.32 | Alterações com entrada em vigor até a data de publicação do edital de abertura: **17/07/2026** no registro oficial consultado. A atualização do documento consolidado não muda esse marco. |
| Norma sem vigência, 20.33 | Pode ser cobrada se expressamente indicada nos objetos de avaliação. Manter referência literal e informar sua situação normativa. |
| Provas | Data **provável: 10/01/2027**, tarde; concurso identificado como 2026. A consolidação vigente conserva essa previsão. |
| Corte jurisprudencial, 20.33.1 | Publicação de jurisprudência de tribunais superiores até **30 dias antes das provas**. Se mantida 10/01/2027, o marco calculado é **11/12/2026**. Data de julgamento não substitui publicação. |
| Situação da consulta | **01/10/2026** antecede o marco jurisprudencial. Certifica-se o publicado e admissível até a consulta; não se certificam julgados futuros nem se mantém analyzing apenas à espera deles. Reavaliar quando houver publicação pertinente. |

O corte legislativo e o jurisprudencial são independentes. Não excluir entendimento judicial apenas por sua publicação posterior a 17/07/2026. Alteração normativa posterior ao corte deve ser registrada como posterior, sem substituir silenciosamente a versão examinável. Mudança de data das provas exige recalcular o marco jurisprudencial; alteração das regras depende de outro edital, conforme 20.34.

Marcos de prova no Anexo I: consulta aos locais prevista para 23/12/2026; consulta individual aos gabaritos preliminares de 12 a 14/01/2027; padrão preliminar da discursiva em 12/01/2027; recursos contra questões/gabaritos/padrão em 13 e 14/01/2027; divulgação dos gabaritos preliminares em 15/01/2027; resultado final da objetiva e provisório da discursiva em 16/02/2027. A diferença entre consulta individual e divulgação dos gabaritos é mantida literalmente, sem ajustar o calendário por suposição. Datas são previstas e passíveis de alteração oficial.

### 3.3 Fronteiras, inconsistências e tratamento editorial

**“Fundamentos de eclética”.** A expressão consta literalmente do item 6 de Raciocínio Lógico e Científico na abertura original e nas consolidações até os Editais nº 2 e nº 3; foi conferida também na imagem da página 60 de S05. As duas retificações foram lidas e não mudam esse item. Não há esclarecimento dele nos atos relacionados na listagem consultada. Portanto, não foi adotada equivalência com outra palavra, escola ou método nem foi inventado um conceito. PER-P03 deve conservar o item literal e individualizar sua incerteza; a produção específica depende de esclarecimento oficial ou de evidência primária suficiente para justificar uma interpretação, expressamente registrada. Os demais itens de raciocínio e as demais disciplinas permanecem habilitáveis. PER-P01 consolida a dúvida verificável, sem declarar resolvido seu significado.

**Lei nº 7.116/1983 repetida.** Legislação Especial, itens **2 e 5**, referem-se ao mesmo diploma. A matriz deverá registrar ambos como consumidores programáticos da mesma cobertura da lei, sem duplicar unidade ou conjunto de questões. O item 2 também abrange o Decreto nº 89.250/1983 e a Lei nº 5.553/1968: conciliá-lo com o item 5 não permite apagar essas normas.

**Diplomas citados e situação normativa.** Consulta primária inicial de 01/10/2026, limitada à identificação das normas e dos riscos de corte; não constitui auditoria artigo por artigo ou aceite C/H/Q.

| Diploma e ocorrência literal | Situação confirmada / consequência para a produção |
|---|---|
| [Lei nº 12.037/2009](https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12037.htm), Legislação Especial 1 | Lei vigente com alterações. A [Lei nº 15.295/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15295.htm) alterou seus arts. 3º e 5º; publicada em 22/12/2025, com entrada em vigor após 30 dias, portanto anterior ao corte desta campanha. Conferir a redação aplicável, em vez de copiar automaticamente capítulo antigo de identificação criminal. |
| [Lei nº 7.116/1983](https://www.planalto.gov.br/ccivil_03/leis/1980-1988/l7116.htm), Legislação Especial 2 e 5 | Lei vigente com alterações, inclusive as de 2021 e 2023 identificadas no texto oficial. Expedição/validade nacional e o recorte do item 2 devem ser cobertos sem duplicação. |
| [Decreto nº 89.250/1983](https://www.planalto.gov.br/ccivil_03/decreto/d89250.htm), Legislação Especial 2 | **Revogado** pelo art. 23, I, do [Decreto nº 9.278/2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/decreto/d9278.htm). A revogação não apaga sua citação expressa no edital, diante de 20.33. |
| [Decreto nº 10.977/2022](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/decreto/d10977.htm), contexto normativo, não novo item literal | Regulamentação posterior da carteira de identidade; seu art. 27 revogou o Decreto nº 9.278/2018. Separar contexto vigente de texto do Decreto nº 89.250 expressamente cobrável; não trocar um pelo outro silenciosamente. |
| [Lei nº 5.553/1968](https://www.planalto.gov.br/ccivil_03/leis/l5553.htm), Legislação Especial 2 | Diploma vigente sobre apresentação e uso de documentos de identificação pessoal, com alterações identificadas no texto oficial. Seu recorte não se confunde com expedição da carteira. |
| [Lei nº 9.454/1997](https://www.planalto.gov.br/ccivil_03/leis/l9454.htm), Legislação Especial 3 | Diploma vigente com alterações, incluindo a Lei nº 14.534/2023. Diferenciar redações substituídas/revogadas e registro de identidade civil. |
| [Lei nº 8.429/1992](https://www.planalto.gov.br/ccivil_03/leis/l8429.htm), Legislação Especial 4 | Diploma vigente, profundamente alterado pela Lei nº 14.230/2021. A consulta de identificação não certifica entendimentos judiciais; a unidade correspondente deverá pesquisar sua jurisprudência pelo corte próprio. |
| [Decreto-Lei nº 3.689/1941](https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm), Direito Aplicado 1 e remissão em Criminalística 5.3 | Código de Processo Penal vigente com alterações. O recorte é prova, disposições gerais, corpo de delito, cadeia de custódia e perícias, não o processo penal inteiro. |

**Noções de Direito:** o programa explicita organização da União e temas de agentes públicos, sem indicar uma lei de regime jurídico único. A matriz deverá distinguir conceitos gerais, organização federal e legislação usada para explicar o regime; não presumir incidência automática de estatuto federal no Estado nem importar disciplinas jurídicas inteiras de outro cargo.

**Direito Aplicado e Criminalística:** os itens de prova, perícia, corpo de delito e cadeia de custódia aparecem em ambos. A matriz precisa decidir unidades comuns ou complementares segundo os recortes efetivos, mantendo a associação a cada ocorrência. O programa, sozinho, não prova vínculo canônico.

**Criminalística e Medicina Legal:** locais de morte e interpretação de vestígios exigem pontes com instrumentos, lesões, asfixias e morte. Ensinar a relação mínima em cada unidade, coordenando o aprofundamento; não ampliar para programas médico-legais de outros cargos. Em Medicina Legal, as lesões do item 1.2 e as ações mecânicas do item 4 devem ser conciliadas na matriz, preservando as duas ocorrências.

**Arquivologia:** preservação e conservação reaparecem nos itens 4 e 5. Conciliar a cobertura de tipologias/suportes e processos de conservação/restauração sem publicar capítulos redundantes. Essa fronteira não substitui a posterior leitura dos doadores.

**Discursiva:** PER-E12 é apoio de redação sobre o Grupo I, não uma décima segunda disciplina objetiva nem importação automática de Atualidades. Reutilizar bases e questões pertinentes sem duplicar identidades; propostas abertas e respostas-modelo ficam no material didático.

### 3.4 Programa integral numerado do Generalista

Transcrição de S05, itens **21.2.2** e **21.2.3, Cargo 1**, páginas 59–61, conferida com a abertura original. Mantidos números, redação, repetições e expressões ambíguas; foram normalizados somente espaços e quebras de linha da extração e acrescentada organização de listas. As transcrições abaixo preservam a literalidade e não recebem intervenções de microglossário. São referências de cobertura, não unidades editoriais já desdobradas ou aceitas.

#### 3.4.1 Conhecimentos gerais — Grupo I, item 21.2.2

##### LÍNGUA PORTUGUESA

Fonte: S05, página 59–60.

> - **1** Compreensão e interpretação de textos de gêneros variados.
> - **2** Reconhecimento de tipos e gêneros textuais.
> - **3** Domínio da ortografia oficial.
> - **4** Domínio dos mecanismos de coesão textual.
> - **4.1** Emprego de elementos de referenciação, substituição e repetição, de conectores e de outros elementos de sequenciação textual.
> - **4.2** Emprego de tempos e modos verbais.
> - **5** Domínio da estrutura morfossintática do período.
> - **5.1** Emprego das classes de palavras.
> - **5.2** Relações de coordenação entre orações e entre termos da oração.
> - **5.3** Relações de subordinação entre orações e entre termos da oração.
> - **5.4** Emprego dos sinais de pontuação.
> - **5.5** Concordância verbal e nominal.
> - **5.6** Regência verbal e nominal.
> - **5.7** Emprego do sinal indicativo de crase.
> - **5.8** Colocação dos pronomes átonos.
> - **6** Reescrita de frases e parágrafos do texto.
> - **6.1** Significação das palavras.
> - **6.2** Substituição de palavras ou de trechos de texto.
> - **6.3** Reorganização da estrutura de orações e de períodos do texto.
> - **6.4** Reescrita de textos de diferentes gêneros e níveis de formalidade.
> - **7** Correspondência oficial (conforme Manual de Redação da Presidência da República).
> - **7.1** Aspectos gerais da redação oficial.
> - **7.2** Finalidade dos expedientes oficiais.
> - **7.3** Adequação da linguagem ao tipo de documento.
> - **7.4** Adequação do formato do texto ao gênero.

##### RACIOCÍNIO LÓGICO E CIENTÍFICO

Fonte: S05, página 60.

> - **1** Estruturas lógicas.
> - **2** Lógica de argumentação.
> - **3** Lógica sentencial (ou proposicional).
> - **4** princípios de contagem e probabilidade.
> - **5** Método científico.
> - **6** Fundamentos de eclética.
> - **7** Pensamento lateral e vertical.
> - **8** Hipóteses e teorias.
> - **9** Viés de pesquisa.

##### INFORMÁTICA

Fonte: S05, página 60.

> - **1** Noções de sistemas operacionais.
> - **2** Noções de redes de computadores.
> - **3** Navegação e busca na Internet.
> - **4** Correio eletrônico.
> - **5** Redes neurais e inteligência artificial.
> - **6** Noções de computação na nuvem.
> - **7** Segurança da informação.
> - **8** Noções de algoritmos.

##### NOÇÕES DE DIREITO

Fonte: S05, página 60.

> - **1** Direito administrativo.
> - **1.1** Estado, governo e administração pública: conceitos, elementos, poderes e organização.
> - **1.2** Natureza, fins e princípios.
> - **1.3** Organização administrativa da União: administração direta e indireta.
> - **2** Agentes públicos.
> - **2.1** Espécies e classificação.
> - **2.2** Poderes, deveres e prerrogativas.
> - **2.3** Cargo, emprego e função públicos.
> - **2.4** Regime jurídico único: provimento, vacância, remoção, redistribuição e substituição.
> - **2.5** Direitos e vantagens.
> - **2.6** Regime disciplinar.
> - **2.7** Responsabilidade civil, criminal e administrativa.

##### DIREITO APLICADO

Fonte: S05, página 60.

> - **1** Código de Processo Penal (Decreto-Lei nº 3.689/1941 e suas alterações).
> - **1.1** Prova.
> - **1.1.1** Disposições gerais.
> - **1.1.2** Exame de corpo de delito, cadeia de custódia e perícias em geral.

##### HISTÓRIA DO MARANHÃO

Fonte: S05, página 60.

> - **1** França equinocial: expedição de Daniel de La Touche.
> - **2** Fundação de São Luís.
> - **3** Batalha de Guaxenduba.
> - **4** Capitães‐mores do Maranhão.
> - **5** Invasão holandesa.
> - **6** Expulsão dos holandeses.
> - **7** Estado do Maranhão e Grão‐Pará: Revolta de Bequimão (causas e objetivos da revolta); Companhia de Comércio do Maranhão e Grão‐Pará.
> - **8** Período do Império: adesão do Maranhão.
> - **9** Independência do Brasil.
> - **10** Causas da não adesão: Batalha do Jenipapo.
> - **11** Balaiada: caracterização e causas do movimento.
> - **12** Período republicano: adesão do Maranhão à República.
> - **13** Revolução de 1930 no Maranhão.
> - **14** Principais fatos políticos, econômicos e sociais ocorridos no Maranhão na segunda metade do século XX.

##### GEOGRAFIA DO MARANHÃO

Fonte: S05, página 60.

> - **1** Localização do estado do Maranhão: superfície; limites; linhas de fronteira; pontos extremos; áreas de proteção ambiental (APA).
> - **2** Parques nacionais.
> - **3** Climas do Maranhão: pluviosidade e temperatura.
> - **4** Geomorfologia.
> - **4.1** Classificação do relevo maranhense: planaltos, planícies e baixadas.
> - **5** Características dos rios maranhenses: bacias dos rios limítrofes (Parnaíba, Gurupi e Tocantins‐Araguaia).
> - **6** Bacias dos rios genuinamente maranhenses.
> - **7** Principais formações vegetais: floresta, cerrado e cocais.
> - **8** Geografia da população: população absoluta; densidade demográfica; povoamento; movimentos populacionais.
> - **9** Agricultura maranhense: caracterização e principais produtos agrícolas; caracterização da pecuária.
> - **10** Extrativismo: vegetal, animal e mineral.
> - **11** Parque industrial: indústrias de base e indústrias de transformação.
> - **12** Setor terciário: comércio, telecomunicações, transportes.
> - **13** Malha viária.
> - **14** Portos e aeroportos.
> - **15** Cultura maranhense.

#### 3.4.2 Conhecimentos específicos — Grupo II, item 21.2.3, Cargo 1

##### NOÇÕES DE CRIMINALÍSTICA

Fonte: S05, página 60–61.

> - **1** Definição, histórico e doutrina da criminalística.
> - **2** Locais de crime: conceituação, classificação, isolamento e preservação de local de crime.
> - **3** Cadeia de custódia: conceitos, etapas e fases.
> - **4** Prova.
> - **4.1** Conceito e objeto da prova.
> - **4.2** Tipos de prova: confessional, testemunhal, documental e pericial.
> - **4.3** Formas da prova: direta e indireta.
> - **5** Perícia.
> - **5.1** Definição e prazos.
> - **5.2** Requisição de perícia.
> - **5.3** Principais perícias elencadas no Código de Processo Penal.
> - **6** Corpo de delito: conceito.
> - **7** Finalidades dos levantamentos dos locais de crime contra a pessoa e contra o patrimônio.
> - **8** Vestígios de interesse forense e suas classificações.
> - **9** Locais de morte.
> - **9.1** Morte violenta.
> - **9.2** Local de morte por arma de fogo.
> - **9.3** Local de morte por instrumentos contundentes, cortantes, perfurantes ou mistos.
> - **9.4** Local de morte provocada por asfixia.

##### NOÇÕES DE MEDICINA LEGAL

Fonte: S05, página 61.

> - **1** Traumatologia forense.
> - **1.1** Conceitos.
> - **1.2** Estudo das lesões causadas por instrumentos perfurantes, cortantes, contundentes, cortocontundentes, perfurocontundentes, perfurocortantes.
> - **2** Asfixiologia.
> - **2.1** Enforcamento, estrangulamento, esganadura, sufocação, soterramento, afogamento, confinamento e gases inertes.
> - **3** Tanatologia forense.
> - **3.1** Cronotanatognose; morte suspeita; morte súbita; morte agonizante.
> - **4** Noções de instrumentos de ação mecânica: ação cortante, perfurante, contundente e mista.
> - **5** Noções de agentes químicos.
> - **6** Noções de agentes térmicos.
> - **7** Noções de sexologia forense.

##### ARQUIVOLOGIA

Fonte: S05, página 61.

> - **1** Arquivística: princípios e conceitos.
> - **2** Gestão da informação e de documentos.
> - **2.1** Protocolo: recebimento, registro, distribuição, tramitação e expedição de documentos.
> - **2.2** Classificação de documentos de arquivo.
> - **2.3** Arquivamento e ordenação de documentos de arquivo.
> - **2.4** Tabela de temporalidade de documentos de arquivo.
> - **3** Acondicionamento e armazenamento de documentos de arquivo.
> - **4** Preservação e conservação de documentos de arquivo.
> - **5** Tipologias documentais e suportes físicos: microfilmagem; automação; preservação, conservação e restauração de documentos.

##### LEGISLAÇÃO ESPECIAL

Fonte: S05, página 61.

> - **1** Identificação criminal (Lei nº 12.037/2009 e suas alterações).
> - **2** Carteira de identidade (Lei nº 7.116/1983 e suas alterações, Decreto nº 89.250/1983 e suas alterações, Lei nº 5.553/1968 e suas alterações).
> - **3** Registro de identidade civil (Lei nº 9.454/1997 e suas alterações).
> - **4** Improbidade administrativa (Lei nº 8.429/1992 e suas alterações).
> - **5** Lei nº 7.116/1983 (expedição e validade nacional das carteiras de identidade).

### 3.5 Referências programáticas e dependências seguintes

| Bloco literal | Itens/subitens numerados, incluindo pais | Macro editorial |
|---|---:|---|
| Língua Portuguesa | 25 | PER-E01 |
| Raciocínio Lógico e Científico | 9 | PER-E02 |
| Informática | 8 | PER-E03 |
| Noções de Direito | 12 | PER-E04 |
| Direito Aplicado | 4 | PER-E05 |
| História do Maranhão | 14 | PER-E06 |
| Geografia do Maranhão | 16 | PER-E07 |
| Total do Grupo I | 88 | Agregado programático |
| Noções de Criminalística | 19 | PER-E08 |
| Noções de Medicina Legal | 11 | PER-E09 |
| Arquivologia | 9 | PER-E10 |
| Legislação Especial | 5 | PER-E11 |
| Total do Grupo II, Cargo 1 | 44 | Agregado programático |
| Total literal da objetiva | **132** | **11 disciplinas** |

Os 132 números contam referências literais, inclusive pais e filhos, e **não** 132 unidades reais. Há temas repetidos e itens com múltiplos recortes. As 80 questões e os 132 itens são dimensões diferentes. A discursiva é regida pelo item 9 e apoiada em PER-E12; não aumenta a quantidade de disciplinas objetivas ou de itens em 21.2.2/21.2.3.

**PER-P02 habilitada pelo aceite confirmado de PER-P01:** definir título, slug, identidade, ordem e caminhos segundo os contratos correntes, sem materializar catálogo/grupos vazios. **PER-P03:** converter esta cobertura integral em matriz por assunto, conciliando repetições e fronteiras, com origens/cortes/consumidores comprovados e estados C/H/Q inicialmente pending. O significado de “eclética” permanece uma incerteza localizada, sem bloquear a definição da identidade ou os assuntos independentes. Não foram reconstruídos aceites ou importados totais de outras campanhas.

## 4. Contratos, seleção e concorrência

Releia AGENTS.md integralmente e confira os contratos na main antes de cada ciclo. As regras abaixo complementam, não substituem, o arquivo de agentes.

- [Schemas de conteúdo](https://github.com/insign/concursos/blob/main/src/lib/content-schema.ts), [coleções](https://github.com/insign/concursos/blob/main/src/content.config.ts), [resolvedor](https://github.com/insign/concursos/blob/main/src/lib/catalog-core.ts), [caminhos](https://github.com/insign/concursos/blob/main/src/lib/content-paths.ts) e [ADRs](https://github.com/insign/concursos/blob/main/ADR.md) são contratos, não sugestões.
- Concursos usam catálogo em `src/content/concursos/`; níveis de grupo exigem `grupo.json`. Identidades persistidas, slugs finais, ordens e rotas já publicados não são renomeados sem autorização.
- O resolvedor atual exige slug consumidor igual ao slug canônico e herda a identidade do conteúdo canônico, preservando a ordem da visão. A definição em PER-P02/PER-P03 deve respeitar isso antes da primeira publicação; não resolver colisões com alterações de infraestrutura.
- Não misturar conteúdo físico e `vinculo.json`. Companheiros C/H/Q/R devem existir e pertencer à origem resolvida. Resoluções opcionais devem corresponder à revisão da questão, conforme ADR-004. Mega revisões, disciplinadas por ADR-005/007, continuam fora do escopo.

**Seleção.** “Ok”, “vai”, “avance”, “prossiga” ou “continue” exige concluir nesta resposta um assunto ou preparação/fechamento habilitado, publicando sua evidência e sincronizando o painel. Retomar analyzing só se comprovadamente próprio; senão seguir a ordem habilitada. Pular done, reservas alheias e dependências pendentes. Macros agregam seus assuntos, não bloqueiam disciplinas inteiras por estarem pendentes.

**Reserva.** Antes de editar, registrar na #766 conversa/token único, unidade/tarefa, C/H/Q, origem/destino, consumidores, arquivos, seções/estrutura compartilhadas e SHA-base; reler para confirmar. Uma origem tem um executor. Consultar #764/#765 e as metas dos consumidores identificados, sem tratar semelhança como vínculo. Reserva de pendência significa analyzing, mesmo que o mestre ainda reflita a consolidação anterior; nunca rebaixar done.

C/H/Q podem ter estados diferentes. Se visões do mesmo entregável divergem, informar e pular o conflito, sem normalizar trabalho de terceiros. Registro superado não é reserva ativa. Sem paralelismo, reduzir consultas redundantes, preservando releitura antes da gravação e confirmação posterior.

Completar leituras truncadas. Busca vazia não prova ausência. Sem unidade elegível, informar e parar. Bloqueio estrutural próprio permanece analyzing com evidência, intervenção necessária neste mestre e resumo na issue; não contornar contratos. Antecipar pré-requisitos: a falta de planejamento de uma estrutura necessária não basta, sozinha, para declarar bloqueio. Fatos futuros obedecem D766-04.

## 5. Matriz e reaproveitamento

PER-P03 deve desdobrar os blocos em assuntos com IDs administrativos estáveis e C/H/Q inicialmente pending. Preservar os IDs PER existentes, usar números livres, justificar desdobramentos autorizados e recalcular os agregados sem alterar identidades publicadas. Disciplina não é capítulo. Não reconstruir decisões ou aceites perdidos por suposição.

Cada linha da matriz deve registrar:

**item/subitem literal → ID/título/recorte → origem/SHA → slug/destino/identidade/ordem → integral/parcial/nova → aproveitamento/lacunas/fronteiras → consumidores/corte/dependências → estado/evidência.**

A matriz ainda não foi produzida nesta preparação. Não publicar linhas fictícias, destinos supostos, unidades vazias ou aceites apenas para preencher uma tabela.

**Unidade não é aparição.** Resolver o pacote local em `src/content/assuntos/` ou a origem canônica em `src/content/biblioteca/` pelo vínculo explícito. Confirmar consumidores, arquivos e cortes antes da edição; slug/título semelhantes não provam identidade. Consultar biblioteca, TCE Analista/Técnico e o material efetivamente publicado de PC-MA, SEAP e Perícia.

**Integral:** comparar recorte, profundidade, corte e todos os artefatos. Usar vínculo canônico compatível ou cópia local controlada com proveniência, identidade e metadados do novo consumidor; não mover automaticamente a origem. Compatibilidade temática não dispensa auditoria pedagógica.

**Parcial:** copiar apenas trechos e exercícios pertinentes, documentar diferenças e completar lacunas locais. Não vincular capítulo incompatível nem criar overlays. Publicar somente o pacote editorial completo.

**Nova:** produzir a partir de fontes verificáveis. Referências incidentais em outro assunto não equivalem a um capítulo adequado ao recorte.

Editar uma origem canônica uma única vez e somente com mudanças válidas para todos os seus consumidores. Não inserir nela recorte exclusivo da Perícia. Manter origens, catálogos e campanhas alheias fora das mudanças necessárias à unidade própria.

PER-P04/P05 são materializadas com o primeiro assunto completo. Novos ramos só recebem grupos quando houver pacote real, sem antecipar catálogo vazio, arquivos incompletos ou placeholders. Não alterar schemas, infraestrutura, funcionalidades ou gerados para viabilizar a publicação.

## 6. Guia obrigatório de qualidade pedagógica

### 6.1 Leitor, alcance e evidência

O leitor é iniciante inteligente, com pouco tempo. Otimize **compreensão, retenção e acerto por minuto de estudo**, não quantidade de arquivos, volume de questões, rapidez do executor ou tamanho do texto. Conteúdo factual correto pode continuar editorialmente inadequado se não permitir aprender com autonomia.

A revisão alcança o material criado, o doador antes da cópia/vínculo, a cópia local antes do aceite, o conteúdo já produzido e os pacotes done na inspeção de fechamento. Ler C/H/Q, referências, resoluções e vizinhos pertinentes integralmente. Examinar pré-requisitos, termos, ordem cognitiva, lacunas, redundância, exemplos, remissões, vigência e aplicabilidade.

Não reduzir a revisão a uma introdução nova, ajuste de referências, aplicação de abbr, contagem de questões ou conferência de arquivos. Registrar problema observado, intervenção e ganho concreto: distinção esclarecida, pré-requisito ensinado, redundância retirada, correção factual ou remissão reparada. Não inventar tempo poupado, leitura integral ou inspeção visual. Catálogo bibliográfico, resumo e trecho parcial não equivalem à consulta integral da obra.

### 6.2 C — aprender com autonomia

`conteudo.md` é aula, não cheat sheet expandido. Reorganizar a unidade inteira quando necessário, não apenas a abertura. Começar por pergunta, contraste, mecanismo, processo ou pequeno cenário; construir significado antes de exigir terminologia, classificações e exceções. A ordem do edital ou da lei não é automaticamente a melhor ordem cognitiva, embora a cobertura integral deva ser preservada.

Contexto histórico, institucional ou funcional só entra quando explica o conceito, distingue alternativas ou melhora aplicação. Usar poucos exemplos decisivos, preferindo um cenário que permita comparar mecanismos; identificar os hipotéticos e verificar os factuais. Explicitar limites de analogias e ensinar antes de propor mnemônico. Tabelas normalmente sintetizam relações já explicadas, não substituem raciocínio.

Preservar definições, literalidade relevante, fórmulas com variáveis/unidades/condições, requisitos, exceções, prazos, jurisprudência e pegadinhas. Cortar redundância, não substância. Ensinar pontes mínimas para que a unidade seja compreensível fora de uma leitura em ordem perfeita; remissões limitam aprofundamento, não terceirizam entendimento.

Revalidar fontes primárias e cortes; distinguir alteração posterior, norma enumerada e norma efetivamente aplicável. Não assumir incidência automática de norma federal infralegal ao Estado. Não inventar dados científicos, normas, entendimentos, atribuições, questões, citações ou URLs. Em matéria pericial, explicar mecanismos, inferências e limites da conclusão sustentados pelas fontes, sem ampliar o recorte do Generalista.

`referencias.md` sustenta as afirmações, sem fontes órfãs ou meramente decorativas. Registrar título/órgão/autor, identificação suficiente, data/edição pertinente e endereço verificável. Ao retirar afirmação, retirar fonte tornada órfã; ao acrescentá-la, acrescentar suporte. Diferenciar data de acesso de publicação e vigência.

### 6.3 H — recuperar, não reaprender

`cheat-sheet.md` pressupõe estudo da aula. Deve ser curto, preciso e utilizável isoladamente para recuperar contrastes, mecanismos, requisitos, exceções, prazos, fórmulas e erros prováveis. Não copiar a aula, reensinar tudo nem introduzir fundamentos ausentes em C. Linguagem telegráfica que apaga condições não é concisão útil.

Revisar H mesmo quando C permanecer inalterado. Preservar número de linhas ou palavras não é critério de qualidade; a utilidade para recuperação prevalece. Mega revisões continuam fora desta campanha.

### 6.4 Q — compreensão, discriminação e aplicação

Buscar provas anteriores verificáveis e pertinentes, respeitando direitos de uso, sem quotas. Revisar cada questão copiada e complementar lacunas com autorais identificadas. Não atribuir banca, ano, prova, gabarito ou condição de original/adaptada sem evidência.

Ler cada enunciado, todas as alternativas, a resposta e a explicação. Conferir resposta única, distratores plausíveis, ausência de ambiguidade involuntária e correspondência com o que foi ensinado. Testar discriminação, aplicação e transferência, não somente reconhecimento de palavras. A explicação deve mostrar por que a resposta vale e enfrentar a confusão relevante, não repetir a letra do gabarito.

Em adaptações, preservar os dados indispensáveis e indicar o caráter não literal; não copiar mecanicamente a letra do original. Preservar IDs/origin e seguir os schemas atuais. Atualizar revision/questionSetRevision conforme a mudança; resolução derivada usa questionRevision compatível. Não inventar campos de banca, dificuldade, questão aberta ou revisão que o contrato não suporte. Resoluções separadas são opcionais quando necessárias à complexidade, sem criar nova identidade para a questão.

### 6.5 Discursiva e fronteiras do Generalista

PER-E12 serve à redação sobre conhecimentos gerais do item 9.1 indicado na fonte inicial. A reconsulta do edital define os critérios, temas admitidos e formato, sem importar Atualidades da SEAP ou o programa de outro cargo.

Reutilizar capítulos e questões pertinentes do Grupo I, sem duplicar conjuntos ou identidades. Propostas abertas, planejamento argumentativo, respostas-modelo e comentários ficam no material didático, não em questoes.json como se fossem questões objetivas. A escolha de um artefato auxiliar deve respeitar o catálogo existente e não produzir pacote incompleto para cumprir uma macro artificialmente.

Coordenar as fronteiras de Direito Aplicado, Criminalística e Medicina Legal pela função do conhecimento na prova do Generalista. Não repetir capítulos inteiros de prova penal, cadeia de custódia ou medicina de outra especialidade. Construir a explicação local indispensável e explicitar onde termina o aprofundamento.

### 6.6 Microglossário no ponto de uso

Toda ocorrência renderizada de sigla ou abreviatura técnica/institucional, inclusive listas/tabelas e após uma expansão anterior, recebe a expansão contextual:

```html
<abbr title="expansão contextual">SIGLA</abbr>
```

Termos técnicos, jargões e estrangeirismos usados antes de serem ensinados recebem microdescrição a cada uso nessa condição; depois, retomar a ajuda em trechos distantes/autônomos quando útil. Não marcar palavras comuns indiscriminadamente. Descrições breves, corretas e claras, sem exigir outro jargão desconhecido, adequadas ao sentido, número e consumidores.

Conceitos e pré-requisitos ficam no corpo, não escondidos no title. Regras, condições e exceções não podem depender da interação para serem compreendidas. Atributo simples, não vazio, sem HTML/Markdown/URL/fórmula; escapar aspas quando necessário, fechar tags e não aninhar. Excluir links, controles, frontmatter, IDs, código, fórmulas e campos de texto puro. Preservar transcrições/formato e não revelar respostas de questões. A marcação não amplia o escopo nem autoriza mudar a infraestrutura.

### 6.7 Tamanho e fechamento pedagógico

Reordenar, substituir e cortar antes de ampliar. Crescimento líquido exige dívida pedagógica real e ganho proporcional; separar texto visível, HTML e microdescrições. Poupar tempo não significa sacrificar compreensão. Não preservar totais contra aprendizagem nem usar o tamanho de outra aula como justificativa automática para crescer.

Antes do aceite, responder pela leitura: o núcleo aparece cedo? Um iniciante entende os termos antes de depender deles? Consegue explicar o mecanismo e aplicar condições? H recupera o que C ensinou? Cada questão tem resposta única e explicação útil? As fontes sustentam as afirmações? Há corte possível sem perder cobertura? O texto continua válido para todos os consumidores?

Em PER-F02, registrar individualmente unidades/artefatos inspecionados, problemas, intervenções e o que falta. Manter esse registro distinto do aceite C/H/Q. **Amostra, triagem estrutural, contagem, comparação de SHA ou revisão de uma referência não certificam semanticamente todo o pacote, banco ou disciplina.** Não finalizar por extrapolação. Não rebaixar done apenas por abbr nem reescrever material adequado por ritual; corrigir defeito próprio comprovado no escopo autorizado e preservar os aceites anteriores.

## 7. Roadmap detalhado preservado

As tarefas abaixo mantêm IDs, títulos, descrições e caixas do planejamento recebido da #766. Novas unidades só serão individualizadas em PER-P03, com estados pending. Cada macro C/H/Q só fica done quando todas as unidades correspondentes estiverem publicadas ou aceitas por leitura integral e evidência na main.

### 7.1 Fontes e criação do concurso

- [x] PER-P01 — `done` — Consolidar edital e retificações oficiais; transcrever o programa integral do Cargo 1 com numeração, separar objetiva/discursiva e registrar inconsistências sem correção silenciosa.
- [ ] PER-P02 — `pending` — Definir título, slug, `storageId`, ordem e caminhos do novo concurso conforme os contratos vigentes, sem colisões nem alteração de identidades existentes.
- [ ] PER-P03 — `pending` — Montar a matriz edital → unidades reais → arquivos; desdobrar os blocos em tarefas C/H/Q por assunto e calcular a cobertura real.
- [ ] PER-P04 — `pending` — Criar o catálogo em `src/content/concursos/` com metadados válidos e identificação inequívoca do Cargo 1 e da especialidade.
- [ ] PER-P05 — `pending` — Criar a hierarquia consumidora e seus `grupo.json`, respeitando os blocos e as ordens oficiais, sem confundir a preparação discursiva auxiliar com disciplina da objetiva.

Publicar P04/P05 junto ao primeiro pacote completo de assuntos compatíveis. Não publicar concurso/grupos vazios, arquivos inválidos, TODO, placeholders ou material fictício para antecipar a estrutura.

### 7.2 Inventário e reaproveitamento

- [ ] PER-R01 — `pending` — Inventariar o acervo existente e resolver os vínculos; ler conteúdo, cheat sheet, questões, resoluções e referências candidatos ao reaproveitamento.
- [ ] PER-R02 — `pending` — Classificar cada unidade como integral, parcial ou nova, registrando diferenças de recorte, profundidade, corte e consumidores.
- [ ] PER-R03 — `pending` — Implantar reaproveitamentos integrais por vínculo canônico válido ou cópia local controlada, preservando proveniência e identidades.
- [ ] PER-R04 — `pending` — Preparar as cópias parciais nos novos destinos locais, documentando trechos aproveitados, cortes e complementos; publicar após concluir o pacote editorial correspondente.
- [ ] PER-R05 — `pending` — Consolidar lacunas, unidades novas e dependências entre metas; manter em `pending` todas as tarefas desdobradas ainda não executadas.

### 7.3 Produção editorial por bloco

C corresponde a conteúdo e fontes; H, a recuperação por cheat sheet; Q, a questões e resoluções pertinentes. Aplicar integralmente a seção 6 aos três entregáveis, inclusive aos copiados. No auxiliar discursivo, reutilizar questões do Grupo I sem duplicação; propostas abertas e respostas-modelo ficam no material didático conforme o contrato vigente.

#### Conhecimentos gerais — item 21.2.2

##### PER-E01 — Língua Portuguesa
- [ ] PER-E01-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências.
- [ ] PER-E01-H — `pending` — Produzir e salvar cheat sheets.
- [ ] PER-E01-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### PER-E02 — Raciocínio Lógico e Científico
- [ ] PER-E02-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências, cobrindo também o recorte científico e registrando a apuração dos termos ambíguos do edital.
- [ ] PER-E02-H — `pending` — Produzir e salvar cheat sheets.
- [ ] PER-E02-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### PER-E03 — Informática
- [ ] PER-E03-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências.
- [ ] PER-E03-H — `pending` — Produzir e salvar cheat sheets.
- [ ] PER-E03-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### PER-E04 — Noções de Direito

Respeitar o recorte de direito administrativo e agentes públicos deste bloco, sem importar integralmente disciplinas jurídicas de outros cargos.

- [ ] PER-E04-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências.
- [ ] PER-E04-H — `pending` — Produzir e salvar cheat sheets.
- [ ] PER-E04-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### PER-E05 — Direito Aplicado
- [ ] PER-E05-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências do recorte processual probatório previsto no edital.
- [ ] PER-E05-H — `pending` — Produzir e salvar cheat sheets.
- [ ] PER-E05-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### PER-E06 — História do Maranhão
- [ ] PER-E06-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências.
- [ ] PER-E06-H — `pending` — Produzir e salvar cheat sheets.
- [ ] PER-E06-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### PER-E07 — Geografia do Maranhão
- [ ] PER-E07-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências.
- [ ] PER-E07-H — `pending` — Produzir e salvar cheat sheets.
- [ ] PER-E07-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

#### Conhecimentos específicos — item 21.2.3, Cargo 1

##### PER-E08 — Noções de Criminalística
- [ ] PER-E08-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências, coordenando as fronteiras com Direito Aplicado e Medicina Legal.
- [ ] PER-E08-H — `pending` — Produzir e salvar cheat sheets.
- [ ] PER-E08-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### PER-E09 — Noções de Medicina Legal
- [ ] PER-E09-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências, completando o recorte do Generalista sem importar o programa de cargos médico-legais.
- [ ] PER-E09-H — `pending` — Produzir e salvar cheat sheets.
- [ ] PER-E09-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### PER-E10 — Arquivologia
- [ ] PER-E10-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências.
- [ ] PER-E10-H — `pending` — Produzir e salvar cheat sheets.
- [ ] PER-E10-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

##### PER-E11 — Legislação Especial
- [ ] PER-E11-C — `pending` — Pesquisar, revisar e salvar conteúdo e referências de todas as normas enumeradas, conciliando cobertura das ocorrências repetidas e controle do corte sem correção silenciosa do edital.
- [ ] PER-E11-H — `pending` — Produzir e salvar cheat sheets.
- [ ] PER-E11-Q — `pending` — Buscar, revisar e salvar questões e resoluções pertinentes.

#### Preparação discursiva — bloco editorial auxiliar, item 9

##### PER-E12 — Redação sobre conhecimentos gerais
- [ ] PER-E12-C — `pending` — Pesquisar e salvar orientação de escrita, critérios oficiais e propostas comentadas apoiadas no Grupo I, reutilizando os capítulos de base sem reescrevê-los.
- [ ] PER-E12-H — `pending` — Produzir e salvar revisão de estrutura, planejamento e critérios da redação, em artefato editorial compatível com o catálogo.
- [ ] PER-E12-Q — `pending` — Selecionar e salvar exercícios e propostas comentadas de treino nos formatos existentes, reutilizando as questões do Grupo I sem duplicação e distinguindo questões objetivas de propostas abertas.

### 7.4 Fechamento e aceite

- [ ] PER-F01 — `pending` — Conferir a matriz contra todos os itens/subitens do edital consolidado, eliminando lacunas, duplicações indevidas e material exclusivo de outras especialidades.
- [ ] PER-F02 — `pending` — Inspecionar manualmente schemas, frontmatter, Markdown, `abbr`, links, referências, questões, revisões, resoluções, identidades, rotas, vínculos e consumidores, sem executar testes/builds/checks.
- [ ] PER-F03 — `pending` — Reconsultar publicações oficiais e fontes materiais; distinguir alterações posteriores do corte e resolver ou explicitar divergências, inclusive termos ambíguos e diplomas repetidos.
- [ ] PER-F04 — `pending` — Confirmar na `main` os commits e todos os arquivos resolvidos, consolidando evidência por unidade e validade para consumidores compartilhados.
- [ ] PER-F05 — `pending` — Recalcular tarefas, unidades reais, canônicas, locais e visões; fechar a meta somente com cobertura integral, todas as tarefas `done` e nenhuma reserva ativa.

## 8. Publicação, evidência e encerramento

### 8.1 Protocolo de publicação

Antes de gravar, reler issue/mestre/reservas/main e confirmar propriedade, origem e SHA; inspecionar manualmente conforme AGENTS.md. Em corrida, reaplicar somente a própria mudança sobre a versão corrente; nunca apagar, finalizar ou liberar tarefa alheia. Não criar branches/PRs nem executar testes, builds, CI ou checks sem pedido explícito. Tentar o conector antes de alegar indisponibilidade e não inventar resultados.

Publicar os artefatos na main pelo conector; reler commit e arquivos antes do aceite. Depois publicar neste mestre estado, evidência, decisões autorizadas e agregados; confirmar e sincronizar a issue. Não antecipar SHA futuro. Unidade done exige C/H/Q completos; macro exige todas as subtarefas done. Planejamento também exige publicação.

Quando não houver mudança necessária, registrar aderência integral, leitura e caminhos/SHAs, sem commit vazio. Se faltar confirmação, só o próprio trabalho não publicado volta a pending, salvo bloqueio estrutural comprovado. Falha no painel não desfaz publicação confirmada: informar e reconciliar sem refazer os artefatos.

Preservar títulos, marcas, matriz, decisões e evidências. Nas tarefas existentes, alterar somente caixa/estado; novas tarefas começam pending e a caixa só é marcada em done. Substituir registros da unidade pelo estado corrente, sem acumular diários, reservas encerradas ou totais repetidos. Recontar macros, C/H/Q, unidades reais, origens canônicas/locais e visões separadamente, sem somar pais/filhos ou importar totais. Distinguir previsto de verificável. Registrar defeitos externos sem reabrir campanhas alheias nem bloquear assuntos independentes.

### 8.2 Evidência da preparação documental de 30/09/2026

Origem administrativa: corpo da #766, versão anterior à reserva de `2026-09-11T00:05:17Z`. Base da main reconfirmada antes da criação: `86bfb8658662ecd8c520b169fc1fc14bca70dccd`. A listagem não truncada da raiz não continha este mestre. A listagem corrente de `src/content/concursos/` contém exemplo, PC-MA, SEAP-MA e os dois cargos do TCE-MA, sem catálogo da Perícia; PER-P02 ainda deve definir identidade e ordem a partir da main do seu próprio ciclo.

AGENTS.md foi relido integralmente no blob `1735e5035e3824be202be5c014f18d6445e235bb`; schemas `7d8dbc8e3bab4bc5c9b2758b07ce271b7ade636d`; coleções `48394b960e1b0dbd18857a1139092f1755f64cac`; regras de resolução física/canônica em catalog-core.ts `40af91c4af877ba368416376757e52ea61792493`; ADRs editoriais pertinentes no arquivo `6d94fe8802ac79e254e623823884c27b39d1d98d`. O guia pedagógico de origem está na seção 6 do mestre SEAP, blob `ebc8149174a58ac8033e33100f9e880f5ffe6ea8`; foram aproveitadas regras de qualidade, não estados ou aceites.

A preparação modifica somente este novo documento e o painel #766. Não criou catálogo, grupo, vínculo, assunto, questão ou resolução; não executou PER-P01 e não atribuiu cobertura integral ao programa. Os 51 IDs e estados pending foram preservados. A evidência da publicação é o commit de criação deste arquivo, a reler na main e referenciar no painel; nenhum identificador futuro é presumido aqui.

Observação externa, sem intervenção: a #764 está fechada no GitHub, mas seu corpo ainda menciona PC-F05 pending. Nenhuma reserva ativa foi apresentada por #764/#765. A divergência alheia não foi normalizada nem convertida em bloqueio da preparação; o reaproveitamento futuro continua dependente dos arquivos resolvidos e de evidência própria.

### 8.3 Evidência corrente de PER-P01 — 01/10/2026

**Estado: done.** Consolidação publicada no commit [`c7d9a1a`](https://github.com/insign/concursos/commit/c7d9a1a45cb356075bf0ac281f53a6d82a91d983), SHA completo `c7d9a1a45cb356075bf0ac281f53a6d82a91d983`; blob `703665879f7eb090ff6917cadcc7a07a41235a95`. Commit e conteúdo integral relidos na main antes deste aceite. Entrega exclusiva de preparação; nenhum conteúdo, cheat sheet ou conjunto de questões recebeu aceite. Origem: S01–S05 e consolidação anterior, com fontes normativas primárias identificadas na seção 3. Destino: este mestre; consumidor: Cargo 1 — Generalista da #766. Não houve edição de conteúdo canônico/local, catálogo, grupo, vínculo, infraestrutura ou outra campanha.

Base de publicação: main `ee3d6e0f382e3bffce63ea69dea07e918ada2057`; blob anterior deste mestre `5a997574717e046373ac1ea0d790e3e7528b4be8`. AGENTS.md integralmente relido no blob `1735e5035e3824be202be5c014f18d6445e235bb`. Conferidos contratos atuais: schemas `7d8dbc8e3bab4bc5c9b2758b07ce271b7ade636d`; coleções `48394b960e1b0dbd18857a1139092f1755f64cac`; resolvedor `40af91c4af877ba368416376757e52ea61792493`; caminhos `ca1acfe24337c01925ddfba39559323a59a27eb2`; ADRs `6d94fe8802ac79e254e623823884c27b39d1d98d`. A árvore recursiva recebida não estava truncada: 3.228 entradas; os cinco catálogos vigentes foram lidos, com exemplos de grupo e vínculo. Não existe catálogo da Perícia nessa base, e esta etapa não o cria. No resolvedor, confirmado vínculo explícito, origem canônica existente, slug final igual, ordem do consumidor e ausência de mistura com pacote físico.

Os painéis #764/#765 foram consultados somente para concorrência/proveniência: sem reservas ativas nos painéis. A divergência externa entre estado fechado da #764 e seu PC-F05 pending continua registrada, sem normalização ou bloqueio desta tarefa documental. Nenhum aceite de outra campanha foi usado como evidência de qualidade desta campanha.

**Leitura e ganho documental:** transcrito e conferido todo o recorte 21.2.2/21.2.3 do Cargo 1, com 132 itens/subitens; lidos os três atos complementares inteiros e as regras de prova/cortes/cronograma aplicáveis; inspecionadas as imagens das páginas 59–61. Substituída a orientação inicial não revalidada pela consolidação até o Edital nº 3; diferenciados data do ato e disponibilização, concurso 2026 e prova provável em 2027, corte legislativo e jurisprudencial, diploma vigente e expressamente citado sem vigência. Repetições da Lei nº 7.116/1983 e fronteiras programáticas ficaram explícitas para a matriz. A dúvida “eclética” não recebeu solução presumida. O crescimento é documental: programa integral, regras e evidências; não corresponde a expansão de aula ou revisão ampliada. Transcrições preservadas; microglossário aplicado às siglas da explicação da fórmula, fora dos símbolos matemáticos. Nenhum tempo poupado foi estimado.

Identificadores dos documentos consultados, calculados sobre os bytes recebidos, para nova auditoria:

| Documento | `SHA-256` |
|---|---|
| S01, abertura original | `19992b963c4d9cecfdbfe3a131387947cf1c7b24bd47d87d09bb6d23b811a3ad` |
| S02, Edital nº 2 | `6a369661c63e1776c3e58f387c538a467ac7a5e3715701cb4e869d60d99c74e4` |
| S03, comunicado | `eee38500638c2dcd470a631690d98601bb98d4b843d24b858a94cad0e9c49222` |
| S04, Edital nº 3 | `cee62b84b9e5bc4bb998fadf726a4161d0f84821fce1bee128a10911850e9c91` |
| S05, consolidado até Edital nº 3 | `99f6a6dd86dd9121976454633a5f752a6af0778d3b4f77f8e234020a2b0d9654` |
| Consolidado inicial até Edital nº 2 | `13a1fc6a6035ddb340da920e8ec0a8525ea36b6fb7d5eae77368117ca2366d6e` |
| Listagem pública consultada | `78d6efb3f76f6af4dfb5f65ec8ced7109c28d5a9532ef5c821c2b161828d4cf0` |

A inspeção manual abrange redação, numeração, referências, fórmulas, marcação e limites de escopo do documento. Testes, builds, CI e checks não foram executados. PER-P02 permanece pending; não há alegação de inventário ou revisão integral dos doadores. Unidades reais e C/H/Q unitários ainda serão individualizados. A publicação documental e seu conteúdo foram confirmados antes do aceite; a consolidação de estado é registrada em commit separado e será reconfirmada no painel.

### 8.4 Condições finais

Fechar #766 somente com edital consolidado integralmente coberto, qualidade inspecionada individualmente, todos os entregáveis e macros done, nenhum analyzing ou reserva ativa e evidência confirmada na main. Consolidar aqui rotas, cobertura, origens, consumidores, repetições e totais finais; resumir o resultado no painel. Atualizações futuras seguem D766-04, sem certificar fatos ainda inexistentes.

A resposta de cada ciclo deve informar tarefa/unidade e C/H/Q; origem/consumidores; arquivos/commit/evidência; melhorias, cortes, microglossário e crescimento; fontes/cortes; problemas/totais; intervenção necessária e próxima etapa. Não enviar e-mail.

