---
schemaVersion: 1
title: "Governo eletrônico: fundamentos, serviços, integração e governança"
description: "Governo eletrônico e digital, serviços, plataformas, inclusão, identidade, interoperabilidade, dados, governança e automação responsável."
order: 138
storageId: "governo-eletronico"
---

# Governo eletrônico: fundamentos, serviços, integração e governança

## 1. O que muda quando um serviço passa para o digital?

Imagine um serviço público que exigia formulário em papel, cópia de documentos e duas idas ao órgão. A administração coloca o mesmo formulário em <abbr title="Portable Document Format">PDF</abbr> na internet. Houve avanço: o documento ficou disponível a distância. Mas a pessoa ainda imprime, preenche, reúne comprovantes que o Estado talvez já possua e comparece ao balcão. **O suporte mudou; a jornada quase não mudou.**

Agora imagine outro desenho. A pessoa encontra o serviço em um ponto oficial, entende requisitos e prazo, identifica-se com segurança proporcional ao risco, envia o pedido, acompanha cada etapa, recebe notificações e pode corrigir um dado reutilizado de outro cadastro. Os órgãos trocam informações com significado comum e fundamento jurídico; o atendimento assistido permanece disponível para quem precisa. A administração mede tempo, abandono e satisfação e usa os resultados para corrigir o processo.

Esse contraste organiza todo o assunto:

```text
tecnologia isolada
      ↓
informação e interação digitais
      ↓
transação digital
      ↓
integração de dados, processos e canais
      ↓
redesenho institucional orientado a valor público
```

A sequência é **analítica**, não uma escada obrigatória. Um órgão pode ter serviços em estágios diferentes ao mesmo tempo. **Interoperabilidade** é a capacidade de sistemas e organizações trocar e interpretar informações segundo regras comuns; ela será aprofundada adiante.

### 1.1 Informatização, digitalização, governo eletrônico e transformação digital

| Conceito | Ideia central | O que não permite concluir sozinho |
| --- | --- | --- |
| **informatização** | uso de tecnologia para executar ou apoiar uma tarefa existente | que o processo foi redesenhado |
| **digitalização** | conversão de informação, documento ou etapa para meio digital | que houve integração ou simplificação |
| **governo eletrônico** | uso organizado de <abbr title="Tecnologias da Informação e Comunicação">TIC</abbr> nas atividades e relações do Estado | que todo serviço é transacional ou integrado |
| **governo digital** | uso estratégico de tecnologias, dados e capacidades digitais para transformar organizações, políticas e serviços | que tecnologia substitui governança ou direitos |
| **transformação digital** | redesenho de processo, regras, responsabilidades e experiência, apoiado por tecnologia | que basta comprar sistemas ou criar um portal |

O Decreto nº 12.069/2024 define **governo digital** como abordagem de gestão voltada à transformação das organizações públicas, apoiada em tecnologias digitais e orientada à entrega de **valor público**. Valor público é o resultado útil produzido para a sociedade com legalidade, qualidade, inclusão, confiança e uso responsável de recursos. Portanto, contar páginas, aplicativos ou serviços “digitalizados” mede atividade, não necessariamente resultado.

> **Recorte temporal do edital:** considera-se a legislação vigente em **6 de julho de 2026**. A revisão das recomendações da <abbr title="Estratégia Nacional de Governo Digital">ENGD</abbr> 2024–2027 pela Portaria <abbr title="Secretaria de Governo Digital">SGD</abbr>/<abbr title="Ministério da Gestão e da Inovação em Serviços Públicos">MGI</abbr> nº 5.395, de 1º de julho de 2026, já integrava esse corte. Alterações posteriores ao edital, quando relevantes, devem ser tratadas separadamente.

A Lei nº 14.129/2021 é a principal referência normativa deste capítulo. Seu art. 2º alcança diretamente os órgãos e entidades federais ali indicados e as administrações dos demais entes federados **desde que adotem seus comandos por atos normativos próprios**. Por isso, uma regra federal da lei ou de regulamento federal não deve ser atribuída automaticamente ao <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr>.

---

## 2. Duas classificações que a prova costuma misturar

Há duas perguntas independentes:

1. **quem se relaciona com quem?** → tipo de relação;
2. **o que o serviço consegue fazer?** → maturidade ou capacidade digital.

Um serviço pode ser, por exemplo, uma relação governo-cidadão e ainda estar em estágio apenas informativo.

### 2.1 Tipos de relação

| Relação | Participantes | Exemplo hipotético |
| --- | --- | --- |
| <abbr title="Government to Citizen — governo para cidadão">G2C</abbr> | governo ↔ cidadão | pedido de benefício por pessoa física |
| <abbr title="Government to Business — governo para empresas">G2B</abbr> | governo ↔ empresa | cumprimento digital de obrigação regulatória |
| <abbr title="Government to Government — governo para governo">G2G</abbr> | órgão público ↔ órgão público | intercâmbio legítimo de dados entre dois órgãos |
| <abbr title="Government to Employee — governo para servidor">G2E</abbr> | governo ↔ agente público | sistema interno de férias de servidores |

As siglas descrevem **participantes**, não qualidade, integração nem estágio. Uma relação <abbr title="Government to Government — governo para governo">G2G</abbr>, por exemplo, pode existir sem interoperabilidade efetiva se os sistemas não trocam dados adequadamente.

### 2.2 Presença, interação, transação, integração e transformação

Um modelo didático de evolução distingue:

- **presença:** publicação de informações e orientações;
- **interação:** formulários, consultas, mensagens e outros contatos digitais;
- **transação:** execução eletrônica de operações, protocolos, pagamentos ou solicitações;
- **integração:** dados, sistemas, processos ou canais passam a operar de forma coordenada;
- **transformação:** o serviço é redesenhado de ponta a ponta para resolver a necessidade do usuário e gerar valor público.

A armadilha é tratar qualquer transação como transformação. Um protocolo totalmente eletrônico ainda pode reproduzir etapas inúteis, exigir dados repetidos e transferir ao usuário a fragmentação interna da administração.

### 2.3 O modelo de Layne e Lee

Layne e Lee propõem quatro estágios para analisar o desenvolvimento do governo eletrônico:

1. **catalogação:** presença on-line e organização de informações;
2. **transação:** serviços e operações podem ser realizados eletronicamente;
3. **integração vertical:** integração entre níveis ou esferas governamentais relacionados a determinada função;
4. **integração horizontal:** integração entre funções, áreas ou órgãos distintos para produzir entrega coordenada.

O modelo ajuda a enxergar aumento de integração e complexidade, mas **não prova**, por si só, inclusão, segurança, conformidade jurídica ou valor público. Modelos de maturidade são lentes analíticas; não substituem a avaliação concreta de cada serviço.

### 2.4 O referencial da <abbr title="Organização para a Cooperação e Desenvolvimento Econômico">OCDE</abbr>

O <abbr title="Referencial de Política de Governo Digital">Digital Government Policy Framework</abbr> da <abbr title="Organização para a Cooperação e Desenvolvimento Econômico">OCDE</abbr> organiza a maturidade do governo digital em seis dimensões complementares:

| Dimensão | Pergunta útil |
| --- | --- |
| <abbr title="digital incorporado desde o desenho">digital by design</abbr> | o digital entra no desenho da política e do serviço desde o início ou é acrescentado ao processo antigo? |
| **setor público orientado por dados** | dados são tratados como ativo estratégico, com governança e uso responsável? |
| **governo como plataforma** | capacidades comuns podem ser reutilizadas por vários serviços? |
| <abbr title="abertura como padrão, respeitados os limites legais">open by default</abbr> | dados e processos são abertos à interação pública dentro dos limites jurídicos? |
| **orientado pelo usuário** | necessidades e barreiras reais das pessoas moldam o desenho? |
| **proatividade** | o Estado consegue antecipar necessidades de modo legítimo e responsável? |

“Digital por concepção” não significa “digital exclusivo”. Canais não digitais ou assistidos podem ser necessários para inclusão e continuidade.

### 2.5 O índice da <abbr title="Organização das Nações Unidas">ONU</abbr>

O <abbr title="E-Government Development Index — Índice de Desenvolvimento de Governo Eletrônico">EGDI</abbr>, da <abbr title="Organização das Nações Unidas">ONU</abbr>, é um índice **nacional comparativo**. Combina, em partes iguais, três componentes normalizados:

- <abbr title="Online Service Index — Índice de Serviços On-line">OSI</abbr>: escopo e qualidade dos serviços on-line;
- <abbr title="Telecommunications Infrastructure Index — Índice de Infraestrutura de Telecomunicações">TII</abbr>: desenvolvimento da infraestrutura de telecomunicações;
- <abbr title="Human Capital Index — Índice de Capital Humano">HCI</abbr>: desenvolvimento do capital humano.

Logo, posição elevada no <abbr title="E-Government Development Index — Índice de Desenvolvimento de Governo Eletrônico">EGDI</abbr> indica desempenho relativo do **país** nessas dimensões. Não certifica isoladamente a qualidade, acessibilidade ou conformidade de um serviço específico do <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr>.

---

## 3. Governo como plataforma: reutilizar capacidades sem apagar responsabilidades

Uma administração fragmentada obriga cada órgão a recriar autenticação, notificações, pagamentos, intercâmbio de dados e outros componentes comuns. O **governo como plataforma** busca o contrário: oferecer capacidades reutilizáveis para que equipes se concentrem na política e na jornada do usuário.

A Lei nº 14.129/2021 define governo como plataforma como infraestrutura tecnológica que facilite o uso de dados de acesso público e promova interação segura, eficiente e responsável entre agentes. A mesma lei chama de **plataformas de governo digital** as ferramentas digitais e serviços comuns, normalmente centralizados e compartilhados, necessários à oferta digital de serviços e políticas públicas.

Não confunda três coisas:

| Elemento | Função |
| --- | --- |
| **portal** | ponto de acesso e descoberta de informações e serviços |
| **plataforma de governo digital** | conjunto de ferramentas e serviços comuns para oferta digital |
| **governo como plataforma** | arquitetura institucional mais ampla de capacidades reutilizáveis, dados, padrões e serviços compartilhados |

Capacidades compartilhadas podem incluir identidade, notificações, assinatura, pagamento, **registros de referência** — fontes íntegras e precisas sobre dados fundamentais — e interfaces de integração. Reuso reduz duplicidade, mas **não transfere a competência material** do órgão nem elimina sua responsabilidade por autorização, segurança, continuidade e resultado.

Um componente comum também concentra risco: uma indisponibilidade pode afetar vários serviços. Por isso, plataforma exige arquitetura documentada, monitoramento, contingência e capacidade de evolução controlada.

---

## 4. A Lei nº 14.129/2021 como mecanismo de desenho do serviço

Em vez de memorizar princípios isolados, pense no fluxo que a lei procura produzir:

```text
simplificar a exigência
        ↓
oferecer acesso digital e inclusivo
        ↓
reutilizar dados e capacidades quando legítimo
        ↓
acompanhar a jornada
        ↓
medir qualidade
        ↓
proteger dados, direitos e continuidade
        ↓
melhorar com evidências
```

### 4.1 Princípios e diretrizes: o que eles mudam na prática

O art. 3º reúne diretrizes que podem ser agrupadas em cinco ideias.

**1. Simplificar sem abandonar controles necessários.** A lei prevê desburocratização, linguagem clara, presunção de boa-fé, simplificação de procedimentos e eliminação de formalidades cujo custo econômico ou social supere o risco envolvido. Controle deve ser proporcional ao risco, não inexistente.

**2. Evitar pedir de novo o que o Estado já pode usar legitimamente.** A lei determina imposição, de uma única vez, das exigências necessárias à prestação e veda exigir prova de fato já comprovado por documento ou informação válida. Essa lógica é associada ao princípio <abbr title="dados solicitados uma única vez quando possam ser reutilizados legitimamente">once only</abbr>. Reutilização não é automática: exige dado adequado, finalidade legítima, segurança, responsabilidade pela fonte e possibilidade de correção quando cabível.

**3. Integrar, mas respeitar limites.** A lei estimula atuação integrada, interoperabilidade, governo como plataforma e dados abertos. Compartilhar ou reutilizar informação continua sujeito a competência, finalidade, sigilo, segurança e proteção de dados.

**4. Desenhar para quem usa.** Há foco em universalização do acesso, <abbr title="uso do serviço digital sem mediação humana">autosserviço</abbr>, acessibilidade, atendimento a idosos, qualificação para inclusão digital, monitoramento de qualidade e pesquisa com usuários.

**5. Não confundir preferência digital com exclusividade digital.** O art. 3º prevê plataforma única de acesso sem prejuízo da prestação presencial quando indispensável; também determina permanência da possibilidade de atendimento presencial conforme características, relevância e público-alvo do serviço. O art. 14 reforça tecnologias de amplo acesso, inclusive para população de baixa renda ou residente em áreas rurais e isoladas, **sem prejuízo do direito ao atendimento presencial**.

### 4.2 Componentes essenciais e jornada ponta a ponta

O art. 18 considera componentes essenciais da prestação digital:

1. **Base Nacional de Serviços Públicos**;
2. **Cartas de Serviços ao Usuário**;
3. **Plataformas de Governo Digital**.

Pelo art. 20, as plataformas devem oferecer, no mínimo, ferramenta digital para **solicitar e acompanhar** serviços e **painel de monitoramento de desempenho**. O acesso pode ocorrer por portal, aplicativo ou outro canal digital **único e oficial**. “Único e oficial” organiza a entrada digital; não significa que todo atendimento tenha de ocorrer por um único meio nem autoriza eliminar o presencial necessário.

A jornada completa permite ao usuário:

```text
descobrir o serviço
→ compreender requisitos
→ solicitar
→ acompanhar etapas
→ receber notificações
→ concluir ou receber decisão
→ avaliar
→ corrigir/contestar quando cabível
```

O art. 21 ainda exige, conforme aplicável, identificação das etapas, agendamento, gestão de perfil, pagamento digital, nível de segurança compatível com a criticidade, acesso a informações sobre tratamento de dados pessoais e ouvidoria.

### 4.3 O que medir

O painel mínimo do art. 22 deve conter, para cada serviço:

- quantidade anual de solicitações **em andamento e concluídas**;
- **tempo médio** de atendimento;
- **grau de satisfação** dos usuários.

Esses são mínimos legais, não teto de gestão. Para descobrir barreiras reais, podem ser úteis também taxa de conclusão, abandono por etapa, retrabalho, disponibilidade, incidência de falhas de acessibilidade, custo por transação e resultados segmentados por grupos ou territórios relevantes.

Uma métrica isolada engana. Serviço rápido pode ser ilegal ou inacessível; alta adoção pode esconder exclusão; baixo custo pode coexistir com baixo índice de conclusão. Avaliar serviço digital exige combinar **acesso, qualidade, resultado, direitos e custo**.

### 4.4 Melhorar com evidências

O art. 24 exige, entre outras ações, manter informações atualizadas, melhorar serviços com base em avaliações, integrar notificações, assinaturas e pagamentos quando aplicáveis, eliminar exigências desnecessárias inclusive por interoperabilidade, reduzir replicação de registros, usar dados e evidências e realizar testes e pesquisas com usuários.

Um teste com usuários não serve apenas para “validar a aparência” da tela. Ele revela onde a pessoa não entende um requisito, não consegue prosseguir, abandona o fluxo ou encontra barreira de acessibilidade.

---

## 5. Canais: disponibilidade não é continuidade

Ter vários canais pode aumentar acesso, mas só existe experiência integrada quando a jornada continua de um canal para outro sem exigir que a pessoa recomece desnecessariamente.

| Conceito | Núcleo |
| --- | --- |
| **canal oficial** | meio reconhecido e governado pela instituição |
| **multicanalidade** | existência de vários canais, ainda que funcionem de forma isolada |
| **omnicanalidade** | coordenação e continuidade da mesma jornada entre canais |
| **atendimento digital assistido** | apoio humano para que o usuário consiga utilizar o serviço digital com autonomia e segurança |

Exemplo hipotético: a pessoa inicia o pedido pelo portal e busca orientação por telefone. Se o atendente não consegue consultar o protocolo e manda repetir tudo, há multicanalidade, mas não omnicanalidade.

Atendimento assistido não significa usar a senha do cidadão. Apoio adequado preserva privacidade, autonomia e fatores secretos de autenticação. Quando houver representação, deve-se verificar identidade do representante, poderes e pessoa representada.

---

## 6. Inclusão e acessibilidade fazem parte do serviço, não do acabamento

Exclusão digital não se reduz à ausência de internet. Pode decorrer de conexão precária, dispositivo inadequado, baixa habilidade digital, linguagem complexa, deficiência, idade, território, custo, desenho do canal ou falta de suporte.

Por isso, acessibilidade precisa atravessar o ciclo inteiro:

```text
requisitos → desenho → desenvolvimento → conteúdo → teste → publicação → manutenção
```

O <abbr title="Modelo de Acessibilidade em Governo Eletrônico">eMAG</abbr> reúne recomendações para acessibilidade de sítios e portais governamentais e se relaciona às <abbr title="Web Content Accessibility Guidelines — Diretrizes de Acessibilidade para Conteúdo Web">WCAG</abbr>. Ferramentas automáticas ajudam a localizar erros, mas não comprovam sozinhas que uma jornada é acessível. Testes de teclado, tecnologias assistivas e participação de pessoas com deficiência revelam barreiras que validadores podem não detectar.

O Diagnóstico de Acessibilidade Digital 2024–2025 do <abbr title="Tribunal de Contas da União">TCU</abbr> organiza a avaliação em sete dimensões: governança; design e desenvolvimento; testes e validação; capacitação e cultura; atendimento e retorno do usuário; manutenção e melhoria contínua; transparência e promoção da acessibilidade.

A ideia decisiva é simples: **uma página inicial acessível não salva uma jornada inacessível**. Autenticação, formulário, anexos, pagamento, acompanhamento e recurso também precisam funcionar.

---

## 7. Identidade, autorização, privacidade e confiança

Serviços digitais exigem distinguir etapas que frequentemente são tratadas como sinônimos:

| Etapa | Pergunta |
| --- | --- |
| **identificação** | quem a pessoa declara ser? |
| **autenticação** | como o sistema verifica essa identidade? |
| **autorização** | o que a identidade autenticada pode fazer? |
| **elegibilidade** | a pessoa cumpre os requisitos materiais do serviço? |
| **assinatura eletrônica** | como autoria e integridade são vinculadas ao ato ou documento? |
| **representação** | quem age em nome de quem e com quais poderes? |

Autenticação forte não cria direito material e não corrige autorização excessiva. O nível de autenticação deve ser compatível com natureza, criticidade e risco do serviço; exigir o nível máximo para uma consulta de baixo risco pode criar barreira sem benefício proporcional.

A Lei nº 14.129/2021 também conecta governo digital à <abbr title="Lei Geral de Proteção de Dados Pessoais">LGPD</abbr>. O art. 25 determina que plataformas disponham de ferramentas claras de transparência e controle do tratamento de dados pessoais. Ressalvadas hipóteses legais, elas devem informar fontes dos dados, finalidade específica e compartilhamentos e permitir requisições ao controlador.

Interoperabilidade, portanto, não elimina proteção de dados. Quanto mais sistemas se conectam, mais importante se torna registrar acessos relevantes, limitar permissões e possibilitar correção de dados inexatos.

---

## 8. Interoperabilidade: conectar é apenas a primeira camada

Dois sistemas podem trocar mensagens e ainda assim produzir erro. Imagine que ambos transmitam corretamente o campo “endereço principal”, mas um o interpreta como residência atual e outro como domicílio fiscal. A conexão técnica funciona; o significado não.

Uma análise completa separa quatro dimensões:

| Dimensão | O que precisa funcionar |
| --- | --- |
| **técnica** | protocolos, formatos, interfaces e conectividade |
| **semântica** | significado comum dos dados |
| **organizacional** | processos, papéis, responsabilidades e acordos coordenados |
| **jurídica** | competência, finalidade, bases legais, sigilos e proteção de dados compatíveis |

Uma <abbr title="Interface de Programação de Aplicações">API</abbr> operacional prova apenas que existe uma interface técnica funcionando. Não prova que os dados têm o mesmo significado, que os processos estão coordenados ou que o acesso é juridicamente legítimo.

### 8.1 O que a Lei nº 14.129/2021 exige

O art. 38 determina que a gestão das ferramentas digitais considere interoperabilidade **respeitando restrições legais, segurança, limitações tecnológicas e relação custo-benefício**, além da proteção de dados pessoais.

O art. 40 atribui responsabilidade pelos registros de referência e mecanismos de interoperabilidade e assegura às pessoas a possibilidade de verificar exatidão, correção e completude de seus dados, bem como monitorar o acesso. Nova base de dados somente pode ser criada após esgotadas as possibilidades de uso dos registros de referência existentes.

Isso mostra por que “reutilizar” exige governança. Dado errado pode se propagar rapidamente por serviços integrados; dado sem responsável ou sem atualização pode transformar eficiência aparente em erro sistêmico.

### 8.2 Padrões abertos e <abbr title="Padrões de Interoperabilidade de Governo Eletrônico">e-PING</abbr>

Formato aberto não é sinônimo de arquivo gratuito. A Lei nº 14.129/2021 define formato aberto como não proprietário, com especificação documentada publicamente e livre de restrições jurídicas à implementação e ao uso.

A arquitetura <abbr title="Padrões de Interoperabilidade de Governo Eletrônico">e-PING</abbr> estabelece premissas, políticas e especificações técnicas mínimas para interoperabilidade no âmbito definido. Órgãos e entidades integrantes do <abbr title="Sistema de Administração dos Recursos de Tecnologia da Informação">SISP</abbr> devem observá-la nas hipóteses previstas; sua adoção por outros Poderes da União e demais entes federativos é facultativa. Portanto, ela não vincula automaticamente o <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr>.

A <abbr title="Padrões de Interoperabilidade de Governo Eletrônico">e-PING</abbr> privilegia padrões abertos. Padrões proprietários podem aparecer de forma transitória em **sistemas legados**, isto é, soluções antigas ainda em uso, ou enquanto não houver padrão aberto adequado, sem afastar requisitos de segurança e integridade.

### 8.3 <abbr title="Infraestrutura Nacional de Dados">IND</abbr> e governança dos dados

O Decreto nº 12.198/2024 instituiu, no âmbito da administração pública federal direta, autárquica e fundacional, a <abbr title="Infraestrutura Nacional de Dados">IND</abbr>. Ela é formada por normas, políticas, arquiteturas, padrões, ferramentas tecnológicas e ativos de informação destinados ao uso estratégico dos dados.

A <abbr title="Infraestrutura Nacional de Dados">IND</abbr> não é “um banco central com todos os dados”. A ideia é criar condições de descoberta, governança, interoperabilidade, segurança e uso responsável. Para que isso funcione, cada conjunto de dados precisa de contexto: origem, responsável, significado, atualização, qualidade, restrições e formas legítimas de acesso.

---

## 9. Governança: decidir, supervisionar, executar, aprender

A diferença mais útil é:

- **governança** direciona, monitora e avalia;
- **gestão** planeja, executa e opera dentro dessa direção.

Governança digital não é “o setor de tecnologia mandando nos demais”. Ela conecta prioridades institucionais, benefícios públicos, riscos, arquitetura, dados, segurança, orçamento, responsabilidades e indicadores.

Um ciclo de governança pode ser visualizado assim:

```text
problema público
      ↓
direção e prioridade
      ↓
desenho do serviço e dos controles
      ↓
entrega e operação
      ↓
indicadores, riscos e auditoria
      ↓
correção e nova decisão
```

### 9.1 Governança, riscos e auditoria na Lei nº 14.129/2021

O art. 47 exige mecanismos, instâncias e práticas de governança que incluam, no mínimo:

- acompanhamento de resultados;
- soluções para melhoria do desempenho;
- instrumentos para decisão fundamentada em evidências.

O art. 48 exige sistema de gestão de riscos e controle interno integrado ao planejamento. Os controles devem ser **proporcionais aos riscos**, consideradas causas, consequências, impactos e relação custo-benefício, com proteção das liberdades civis e dos direitos fundamentais.

O art. 49 atribui à auditoria interna governamental papel de agregar valor e melhorar operações mediante avaliação independente e abordagem baseada em risco sobre governança, riscos e controles. Auditoria não substitui a gestão; avalia e aperfeiçoa o sistema.

### 9.2 <abbr title="Estratégia Nacional de Governo Digital">ENGD</abbr> e <abbr title="Estratégia Federal de Governo Digital">EFGD</abbr>

Os instrumentos têm âmbitos diferentes:

| Instrumento | Função e alcance |
| --- | --- |
| <abbr title="Estratégia Nacional de Governo Digital">ENGD</abbr> 2024–2027 | articula e direciona estratégias de transformação digital na União, Estados, Distrito Federal e Municípios, observado o regime da Lei nº 14.129/2021 |
| <abbr title="Estratégia Federal de Governo Digital">EFGD</abbr> 2024–2027 | norteia a transformação dos órgãos e entidades da administração pública federal direta, autárquica e fundacional abrangidos pelo Decreto nº 12.198/2024 |

A <abbr title="Estratégia Nacional de Governo Digital">ENGD</abbr> tem objetivo geral de buscar um Estado mais inclusivo, eficaz, proativo, participativo e sustentável. A revisão publicada em 1º de julho de 2026 atualizou suas recomendações dentro do ciclo 2024–2027.

A <abbr title="Estratégia Federal de Governo Digital">EFGD</abbr>, por sua vez, organiza a governança federal e prevê instrumentos de planejamento como Plano de Transformação Digital, Plano Diretor de Tecnologia da Informação e Comunicação e Plano de Dados Abertos. Esse desenho federal é referência útil, mas não deve ser convertido em obrigação automática para órgão estadual.

### 9.3 Tecnologia não é evidência de transformação

Ferramentas novas devem ser julgadas pelo mesmo critério do restante do capítulo. Um <abbr title="sistema de conversa automatizada">chatbot</abbr> disponível vinte e quatro horas é apenas um canal se não resolve a necessidade, não encaminha adequadamente e não respeita direitos. Inteligência artificial usada em triagem exige governança proporcional ao risco, monitoramento de erro e de <abbr title="distorção sistemática nos resultados">viés</abbr>, possibilidade de contestação e continuidade quando a automação falha.

Da mesma forma, documentos e registros produzidos pelo serviço digital continuam sujeitos às regras aplicáveis de autenticidade, <abbr title="prazos de guarda e destinação do documento">temporalidade</abbr>, retenção e preservação. “Apagar o arquivo” não é, por si só, eliminação documental regular.

Esses pontos são consequências do modelo de governança, não critérios autônomos de maturidade.

---

## 10. Caso integrado: classifique antes de decorar

Considere o seguinte cenário hipotético.

Um órgão oferece pedido digital de licença. A pessoa encontra o serviço no portal oficial, autentica-se com segurança compatível com o risco e inicia a solicitação. O sistema consulta um registro de referência de outro órgão por <abbr title="Interface de Programação de Aplicações">API</abbr>, mostra o dado ao usuário e permite correção quando necessário. Se a pessoa procurar atendimento telefônico, o atendente visualiza o mesmo protocolo sem pedir que a jornada seja reiniciada. O painel acompanha solicitações, tempo, satisfação e abandono. A alta administração monitora riscos e resultados e determina ajustes quando grupos específicos apresentam maior taxa de falha.

Como ler o caso:

1. **portal** é a porta de entrada, não a transformação inteira;
2. autenticação responde “é realmente esta pessoa?”, mas **elegibilidade** depende das regras da licença;
3. consulta por <abbr title="Interface de Programação de Aplicações">API</abbr> demonstra integração técnica, mas a interoperabilidade completa também exige semântica, coordenação organizacional e fundamento jurídico;
4. reaproveitar registro evita repetição, mas exige qualidade e possibilidade de correção;
5. telefone e portal com continuidade formam **omnicanalidade**, não mera multiplicidade de canais;
6. medir abandono por grupo ajuda a localizar barreiras de inclusão;
7. direção, monitoramento de riscos e decisão por evidências são funções de **governança**;
8. o valor público aparece quando a solução resolve a necessidade com qualidade, legalidade, inclusão, confiança e uso responsável de recursos.

Essa leitura evita a pegadinha central do tema: **tecnologia disponível não equivale a governo digital maduro**.

---

## 11. Síntese para revisão

Guarde as relações, não uma coleção de palavras:

```text
GOVERNO ELETRÔNICO
uso organizado de tecnologia nas relações e atividades estatais
                    ↓
GOVERNO DIGITAL
tecnologia + dados + capacidades + desenho institucional
                    ↓
SERVIÇO DE QUALIDADE
jornada simples + canais adequados + acessibilidade + confiança
                    ↓
INTEROPERABILIDADE
conexão + significado + processos + fundamento jurídico
                    ↓
GOVERNANÇA
prioridades + responsabilidades + riscos + indicadores + melhoria
                    ↓
VALOR PÚBLICO
resultado útil, legítimo, inclusivo e sustentável para a sociedade
```

Distinções que mais derrubam alternativas:

- <abbr title="Government to Citizen — governo para cidadão">G2C</abbr>, <abbr title="Government to Business — governo para empresas">G2B</abbr>, <abbr title="Government to Government — governo para governo">G2G</abbr> e <abbr title="Government to Employee — governo para servidor">G2E</abbr> classificam **participantes**, não maturidade;
- presença, interação, transação e integração não provam transformação por si sós;
- plataforma única de acesso não significa canal presencial proibido;
- multicanalidade é ter vários canais; omnicanalidade é dar continuidade à jornada entre eles;
- autenticação não é autorização nem elegibilidade;
- <abbr title="Interface de Programação de Aplicações">API</abbr> funcionando não prova interoperabilidade semântica, organizacional ou jurídica;
- <abbr title="Padrões de Interoperabilidade de Governo Eletrônico">e-PING</abbr> tem âmbito próprio e não vincula automaticamente o <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr>;
- <abbr title="E-Government Development Index — Índice de Desenvolvimento de Governo Eletrônico">EGDI</abbr> compara desenvolvimento nacional; não certifica serviço isolado;
- governança direciona e monitora; gestão executa;
- quantidade de serviços on-line não substitui medidas de conclusão, qualidade, inclusão e resultado.

Transparência, controle social, cidadania e <abbr title="dever de explicar e responder pelo exercício do poder">accountability</abbr> são aprofundados no Assunto 139. A Lei de Acesso à Informação é estudada sistematicamente nos Assuntos 140 e 141. Aqui, eles aparecem apenas na medida necessária para compreender limites, confiança e governança do serviço digital.
