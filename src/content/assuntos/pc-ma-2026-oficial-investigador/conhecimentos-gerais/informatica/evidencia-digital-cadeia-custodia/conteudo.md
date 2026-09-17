---
schemaVersion: 1
title: "Evidência digital e cadeia de custódia de provas eletrônicas"
description: Noções de evidência digital, preservação, aquisição, integridade, rastreabilidade e cadeia de custódia aplicadas a provas eletrônicas.
order: 31
storageId: pc-u031
---

# Evidência digital e cadeia de custódia de provas eletrônicas

Um arquivo pode ser copiado sem perder nenhum dado relevante e, ao mesmo tempo, pode ser alterado sem deixar marcas visíveis para quem apenas o abre na tela. Esse contraste explica por que a prova eletrônica exige método.

Imagine um celular apreendido em uma investigação. Há pelo menos três perguntas diferentes:

1. **o que foi encontrado?** — mensagens, fotos, registros de acesso, arquivos, dados de aplicativos;
2. **os dados examinados permanecem os mesmos que foram obtidos da fonte?** — problema de integridade e mesmidade;
3. **é possível reconstruir quem coletou, transferiu, armazenou e examinou o material?** — problema de rastreabilidade e cadeia de custódia.

O mapa da unidade é:

> **identificar → preservar → adquirir/coletar → verificar integridade → documentar → analisar → armazenar e rastrear**.

A cadeia de custódia não é um “arquivo de <abbr title="Resumo criptográfico calculado sobre uma sequência de dados">hash</abbr>”. O <abbr title="Resumo criptográfico calculado sobre uma sequência de dados">hash</abbr> pode ajudar a demonstrar que duas sequências de dados permanecem iguais; a cadeia é o conjunto mais amplo de procedimentos e registros que acompanha o vestígio ao longo de sua trajetória.

## 1. Evidência digital não é sinônimo do aparelho que a contém

**Evidência digital** é informação em forma digital que pode ter relevância probatória. Ela pode aparecer, por exemplo, em:

- arquivos e documentos;
- mensagens e registros de comunicação;
- fotos, vídeos e áudios;
- registros de eventos de sistemas;
- dados de aplicativos;
- informações de localização;
- dados armazenados em computador, celular, mídia removível, servidor ou serviço remoto.

O **suporte físico** e o **dado** não são a mesma coisa. Um disco, um celular ou um cartão de memória pode conter muitos dados; a investigação pode precisar preservar tanto o objeto físico quanto determinados conteúdos digitais extraídos dele.

Essa distinção evita uma pegadinha importante:

> **a apreensão do dispositivo não substitui, por si só, a aquisição e a documentação dos dados que serão analisados.**

Também vale o inverso: uma cópia digital corretamente produzida não é automaticamente “inferior” só porque não é o dispositivo físico. Dados digitais podem ser copiados de forma a preservar a mesma sequência de bits acessível na fonte, desde que o procedimento seja adequado e verificável.

## 2. Por que a evidência digital exige cuidados próprios

Dados digitais têm características que tornam a preservação especialmente importante:

- podem ser copiados com grande fidelidade;
- podem ser alterados rapidamente e sem mudança visual óbvia;
- alguns desaparecem quando o equipamento é desligado ou o estado do sistema muda;
- ações normais do próprio sistema podem atualizar horários, registros e arquivos;
- a interpretação depende muitas vezes de contexto, como origem, caminho, data, aplicativo e dispositivo.

Por isso, “abrir para olhar” pode não ser uma ação neutra. Dependendo do sistema, a simples interação pode modificar metadados ou gerar novos registros.

**Metadados** são dados que descrevem outros dados: nome, tamanho, caminho, horários, formato, identificadores e outras propriedades. Eles podem ajudar a contextualizar uma evidência, mas também podem sofrer alterações; não devem ser tratados como verdade absoluta sem análise do contexto.

## 3. Cadeia de custódia no Código de Processo Penal

O <abbr title="Código de Processo Penal">CPP</abbr>, nos arts. 158-A a 158-F, disciplina a cadeia de custódia dos vestígios.

O art. 158-A a define, em essência, como o conjunto de procedimentos empregados para manter e documentar a história cronológica do vestígio, permitindo rastrear sua posse e seu manuseio desde o reconhecimento até o descarte.

A ideia central é **rastreabilidade**:

> **quem teve contato? quando? onde? para fazer o quê? em que condições o material foi recebido e entregue?**

### 3.1 Quando começa

O <abbr title="Código de Processo Penal">CPP</abbr> determina que a cadeia de custódia se inicia com a **preservação do local de crime** ou com procedimentos policiais ou periciais em que seja detectada a existência de vestígio.

Logo, está errada a afirmação de que ela começa somente quando o perito efetivamente coleta o objeto.

O agente público que reconhece um elemento com potencial interesse para a produção da prova passa a ter responsabilidade por sua preservação, segundo o art. 158-A, § 2º.

### 3.2 Vestígio e evidência digital

O <abbr title="Código de Processo Penal">CPP</abbr> conceitua vestígio como objeto ou material, visível ou latente, relacionado à infração penal. No ambiente digital, a aplicação prática exige ligar o dado à sua fonte, ao procedimento de aquisição e ao histórico de tratamento.

Não reduza, portanto, a cadeia ao “local físico do crime”. Um dado relevante pode ser detectado e tratado em procedimento policial ou pericial fora daquele local.

## 4. As dez etapas do art. 158-B

A ordem legal merece ser compreendida, não apenas decorada.

| Etapa | Função no <abbr title="Código de Processo Penal">CPP</abbr> | Leitura prática no contexto digital |
|---|---|---|
| **reconhecimento** | distinguir o elemento como de potencial interesse probatório | perceber que dispositivo, conta, arquivo ou dado pode conter informação relevante |
| **isolamento** | evitar alteração do estado das coisas | impedir interferência indevida na fonte ou no ambiente relevante |
| **fixação** | registrar detalhadamente o vestígio e sua posição/situação | documentar estado, localização, conexões, tela ou configuração pertinente antes de mudanças necessárias |
| **coleta** | recolher o vestígio para exame | apreender a mídia/dispositivo ou obter os dados segundo procedimento adequado |
| **acondicionamento** | embalar individualmente conforme características | proteger e identificar suportes físicos e materiais associados |
| **transporte** | transferir preservando características e controle | mover dispositivo, mídia ou cópia sob registro e proteção apropriados |
| **recebimento** | formalizar a transferência da posse | registrar origem, destinatário, data, hora e identificação pertinente |
| **processamento** | realizar exame e manipulação técnica controlada | extrair, decodificar, indexar, filtrar ou analisar dados com método documentado |
| **armazenamento** | guardar o material para processamento, contraperícia, devolução ou descarte | manter original e cópias protegidos, identificados e rastreáveis |
| **descarte** | liberar o vestígio conforme legislação e autorização | dar destinação final documentada quando juridicamente cabível |

A sequência mostra um mecanismo: **primeiro reconhecer e preservar; depois registrar e coletar; em seguida transferir, examinar, guardar e, ao final, destinar**.

## 5. Coleta física e aquisição digital são operações relacionadas, mas diferentes

Em um caso com computador ou celular, pode haver duas camadas:

- **coleta/apreensão do suporte:** o dispositivo físico entra sob controle da investigação;
- **aquisição dos dados:** conteúdo digital é copiado ou extraído para exame.

Na aquisição, o objetivo não é “mexer até achar algo”. É obter dados por procedimento controlado, registrando ferramenta, versão, configuração relevante, operador, data e resultado.

### 5.1 Aquisição lógica e aquisição de baixo nível

Sem transformar esta unidade em manual de ferramenta, duas ideias são úteis:

- **aquisição lógica:** obtém objetos apresentados pelo sistema ou aplicativo, como arquivos, pastas, mensagens ou dados exportáveis;
- **aquisição de baixo nível:** busca copiar uma representação mais próxima da organização bruta dos dados acessíveis no suporte, podendo alcançar informação que não aparece em uma simples navegação por arquivos, conforme a tecnologia e as limitações do dispositivo.

Não existe regra de que uma técnica seja sempre superior. A escolha depende da fonte, do objetivo, das condições técnicas e do que é possível preservar.

## 6. Preserve a fonte e examine uma cópia quando for tecnicamente viável

Guias de computação forense do <abbr title="National Institute of Standards and Technology">NIST</abbr> recomendam preservar os dados originais e, quando viável, realizar o exame sobre uma cópia de trabalho, verificando a integridade entre fonte e cópia.

A razão é simples: análise costuma envolver leitura intensiva, indexação, conversão, extração e outras operações. Separar **fonte preservada** de **cópia de exame** reduz o risco de alterações acidentais no material de referência.

Isso não significa que todo dispositivo permita uma cópia integral antes de qualquer interação. Sistemas ligados, dispositivos bloqueados, dados remotos e informações voláteis podem exigir decisões técnicas específicas. A regra de prova é evitar absolutos como “sempre desligar”, “nunca desligar” ou “sempre retirar o disco antes de qualquer coleta”.

## 7. O que o hash demonstra — e o que ele não demonstra

Um <abbr title="Resumo criptográfico calculado sobre uma sequência de dados">hash</abbr> criptográfico transforma uma sequência de dados em um resumo de tamanho fixo. Em um algoritmo apropriado, se a sequência de entrada mudar, espera-se que o resumo também mude.

Na perícia digital, uma prática comum é:

1. calcular o <abbr title="Resumo criptográfico calculado sobre uma sequência de dados">hash</abbr> da fonte ou do conjunto adquirido;
2. produzir ou transferir a cópia;
3. calcular novamente o <abbr title="Resumo criptográfico calculado sobre uma sequência de dados">hash</abbr> sobre a sequência comparável;
4. confrontar os resultados.

Se os resumos coincidem, há forte suporte técnico para concluir que os dados comparados permanecem iguais em nível de conteúdo binário. Isso ajuda a demonstrar **integridade** e **mesmidade** — a ideia de que aquilo que está sendo examinado corresponde ao material originalmente obtido.

Mas atenção:

> **hash igual não prova, sozinho, que o conteúdo é verdadeiro, autêntico, completo, lícito ou produzido por determinada pessoa.**

O <abbr title="Resumo criptográfico calculado sobre uma sequência de dados">hash</abbr> responde principalmente à pergunta “os bytes comparados permaneceram os mesmos?”. Ele não substitui a documentação de origem, posse, transferências, ferramentas e procedimentos.

### 7.1 Hash não é cadeia de custódia

Uma cadeia bem documentada pode registrar diversos valores de <abbr title="Resumo criptográfico calculado sobre uma sequência de dados">hash</abbr>, mas também registra:

- responsável pela coleta;
- fonte e identificação do material;
- método e ferramentas;
- datas e horários;
- transferências e recebimentos;
- local de armazenamento;
- acessos e intervenções;
- ocorrências, falhas e exceções.

Portanto:

> **hash é um verificador técnico dentro de um processo; cadeia de custódia é o histórico controlado do vestígio.**

## 8. Dados voláteis: preservar pode exigir agir antes que desapareçam

Nem toda evidência digital está gravada de forma estável em uma mídia. Há **dados voláteis**, cujo conteúdo pode desaparecer ou mudar rapidamente, como informações existentes apenas na memória de trabalho do sistema, conexões ativas e alguns estados de processos.

A memória <abbr title="Random Access Memory, memória de acesso aleatório">RAM</abbr> é o exemplo clássico: desligar o equipamento normalmente elimina seu conteúdo. Por outro lado, manter um sistema em funcionamento também permite mudanças contínuas.

O <abbr title="Request for Comments">RFC</abbr> 3227 recomenda considerar a **ordem de volatilidade**: coletar primeiro aquilo que tende a desaparecer mais rapidamente, documentando cada passo.

A lição não é “sempre manter ligado”. É:

> **a decisão de coleta deve considerar o que pode ser perdido ou alterado e registrar o raciocínio e as ações executadas.**

## 9. Captura de tela não é sinônimo de aquisição forense completa

Uma captura de tela registra uma representação visual de determinado estado. Ela pode ser útil, mas pode omitir:

- metadados;
- conteúdo fora da área visível;
- estrutura interna do aplicativo;
- dados apagados ou não renderizados;
- registros que permitam verificar origem e sequência temporal;
- elementos necessários à reprodução independente do exame.

Por isso, “há um print” e “há uma aquisição tecnicamente auditável” são afirmações diferentes.

O <abbr title="Superior Tribunal de Justiça">STJ</abbr>, em precedentes consolidados na edição 281 de Jurisprudência em Teses, destacou que a integridade e a auditabilidade da prova digital dependem da preservação da cadeia de custódia e da possibilidade de exame técnico independente. Quando existe dúvida razoável sobre integridade e autenticidade, a análise pericial pode ser necessária para aferir a confiabilidade.

Isso **não** significa que toda captura de tela seja automaticamente inválida. A conclusão jurídica depende do caso, do método de obtenção, da possibilidade de verificação e dos demais elementos disponíveis. A pegadinha é transformar cautela metodológica em regra absoluta.

## 10. Documentar é tornar o procedimento auditável

Uma boa documentação permite que outra pessoa tecnicamente habilitada compreenda o caminho percorrido pelo material.

Registre, conforme o caso:

- **quem** executou cada etapa;
- **o quê** foi identificado, coletado ou adquirido;
- **onde** estava a fonte e para onde o material foi transferido;
- **quando** cada ação ocorreu;
- **como** a ação foi realizada;
- ferramenta, versão e parâmetros relevantes;
- valores de <abbr title="Resumo criptográfico calculado sobre uma sequência de dados">hash</abbr> quando aplicáveis;
- identificação das mídias e cópias;
- acessos, transferências, recebimentos e armazenamento;
- falhas, interrupções e desvios do procedimento planejado;
- referência de tempo usada quando horários forem relevantes.

O <abbr title="Request for Comments">RFC</abbr> 3227 também recomenda anotações detalhadas e registro de discrepâncias do relógio do sistema quando isso puder afetar a interpretação temporal.

## 11. Lacres, central de custódia e registros de movimentação

Nos vestígios materiais, o <abbr title="Código de Processo Penal">CPP</abbr> determina acondicionamento conforme a natureza do material, uso de lacres individualizados e registro de rompimentos e relacrações. A abertura do recipiente deve seguir as hipóteses legais e deixar rastreabilidade.

O art. 158-E exige central de custódia para guarda e controle dos vestígios. A entrada e a saída devem ser protocoladas, pessoas que tenham acesso ao material armazenado devem ser identificadas, e toda movimentação precisa ser registrada.

Em prova de informática, traduza esse mecanismo para a pergunta central: **é possível reconstruir a posse, o acesso e as intervenções sobre a evidência?**

Não confunda a proteção física do recipiente com a verificação lógica do conteúdo digital. Lacre físico e <abbr title="Resumo criptográfico calculado sobre uma sequência de dados">hash</abbr> cumprem funções diferentes e podem se complementar.

## 12. “Preferencialmente” não significa “exclusivamente”

O art. 158-C do <abbr title="Código de Processo Penal">CPP</abbr> dispõe que a coleta dos vestígios deve ser realizada **preferencialmente por perito oficial**.

Em prova, preserve a palavra:

- “preferencialmente por perito oficial” → corresponde ao texto legal;
- “exclusivamente por perito oficial em qualquer situação” → acrescenta uma exclusividade que a norma não estabeleceu nessa formulação.

O mesmo cuidado vale para a cadeia inteira: profissionais diferentes podem participar de reconhecimento, preservação, transporte, recebimento, armazenamento e exame. O ponto é que as passagens precisam permanecer controladas e documentadas.

## 13. Mesmidade, integridade e autenticidade não são sinônimos

Três perguntas ajudam a separar conceitos próximos:

- **mesmidade:** os dados examinados correspondem aos dados obtidos originalmente?
- **integridade:** houve alteração indevida ou não documentada no material?
- **autenticidade:** há suporte suficiente para confiar na origem ou identidade atribuída ao conteúdo?

Um valor de <abbr title="Resumo criptográfico calculado sobre uma sequência de dados">hash</abbr> pode sustentar mesmidade e integridade entre duas sequências comparadas, mas não resolve sozinho autenticidade.

**Situação hipotética:** um arquivo falso já estava no dispositivo no momento da coleta. Uma cópia perfeita preserva exatamente aquele arquivo, e os valores de <abbr title="Resumo criptográfico calculado sobre uma sequência de dados">hash</abbr> coincidem. A integridade da cópia pode estar preservada, mas isso não transforma o conteúdo falso em verdadeiro nem prova quem o criou.

## 14. Método de prova

Ao enfrentar uma alternativa, faça estas perguntas em ordem:

1. **A questão está tratando do dado ou do suporte físico?**
2. **O problema é preservação, coleta, aquisição, análise ou armazenamento?**
3. **Há registro de quem recebeu, transferiu ou manipulou o material?**
4. **O <abbr title="Resumo criptográfico calculado sobre uma sequência de dados">hash</abbr> está sendo usado apenas para integridade/mesmidade ou a alternativa lhe atribui poderes maiores?**
5. **Existe dado volátil que pode desaparecer com mudança de estado?**
6. **A ordem legal da cadeia foi preservada?**

Pegadinhas recorrentes:

- “a cadeia começa na coleta” → **falso**; pode começar antes, com preservação do local ou detecção em procedimento policial/pericial;
- “todo dado digital está gravado de modo permanente” → **falso**;
- “cópia é sempre imprestável porque não é o original físico” → **falso**;
- “<abbr title="Resumo criptográfico calculado sobre uma sequência de dados">hash</abbr> igual prova autoria e veracidade” → **falso**;
- “captura de tela equivale automaticamente a aquisição forense completa” → **falso**;
- “o <abbr title="Código de Processo Penal">CPP</abbr> exige coleta exclusivamente por perito oficial” → **falso**; o texto usa “preferencialmente”.

O mapa final é:

> **preserve a fonte → documente a trajetória → adquira com método → verifique a integridade → analise de modo auditável → mantenha posse, acessos e transferências rastreáveis.**
