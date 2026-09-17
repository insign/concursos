---
schemaVersion: 1
title: "Criptomoedas: noções gerais"
description: Conceitos essenciais de criptomoedas, blockchain, chaves, carteiras, transações, consenso, mineração e riscos, com o recorte jurídico básico brasileiro.
order: 34
storageId: pc-u034
---

# Criptomoedas: noções gerais

Imagine duas pessoas que querem transferir valor pela Internet sem depender de um banco para registrar cada movimentação. Três problemas aparecem imediatamente: **quem pode autorizar a transferência, como impedir que o mesmo valor seja gasto duas vezes e como todos os participantes chegam a uma história comum das transações?**

Criptomoedas são uma das respostas tecnológicas a esse conjunto de problemas. Em vez de começar decorando nomes de moedas, organize o assunto pelo mecanismo:

> **chaves autorizam → transações circulam pela rede → participantes validam → um mecanismo de consenso organiza o registro → o histórico compartilhado permite verificar o estado dos ativos.**

O Bitcoin é o exemplo clássico e será usado para construir a intuição. Ele não é sinônimo de toda criptomoeda, e **blockchain também não é sinônimo de Bitcoin**.

## 1. Criptomoeda, ativo virtual e token não são palavras perfeitamente intercambiáveis

No uso técnico geral, **criptomoeda** é um ativo digital cujo funcionamento emprega mecanismos criptográficos e uma rede para registrar e validar transferências. Muitas criptomoedas utilizam blockchain, mas o conceito de blockchain é mais amplo que o de criptomoeda.

No direito brasileiro, a Lei nº 14.478/2022 usa a categoria **ativo virtual**: representação digital de valor que pode ser negociada ou transferida por meios eletrônicos e utilizada para pagamentos ou investimento, ressalvadas as exclusões previstas na própria lei.

A lei exclui dessa definição, entre outros:

- moeda nacional e moeda estrangeira;
- moeda eletrônica disciplinada pela Lei nº 12.865/2013;
- pontos e recompensas de fidelidade destinados a produtos, serviços ou benefícios específicos;
- representações de ativos cuja emissão, escrituração, negociação ou liquidação já esteja prevista em lei ou regulamento, como valores mobiliários e ativos financeiros.

Portanto, para prova:

> **“criptomoeda” é um conceito tecnológico/econômico; “ativo virtual” é a categoria jurídica definida pela Lei nº 14.478/2022. Eles se sobrepõem em muitos casos, mas não são expressões juridicamente idênticas.**

Um **token** é, em sentido amplo, uma unidade digital representada em determinado sistema. Ele pode desempenhar funções muito diferentes: representar utilidade em uma aplicação, direito de acesso, ativo negociável ou outro interesse. Não conclua que “todo token é moeda” nem que “todo ativo virtual é valor mobiliário”.

## 2. Blockchain: um livro de registros distribuído, não uma moeda

O National Institute of Standards and Technology descreve blockchain como um **livro digital distribuído**, resistente e evidente a adulterações, mantido por participantes de uma rede. Em uma blockchain típica, transações são agrupadas em blocos, e os blocos são ligados de modo que alterações no histórico se tornem detectáveis e, conforme o sistema, extremamente custosas de consolidar.

A intuição é esta:

1. novas transações são propostas;
2. a rede verifica se atendem às regras do protocolo;
3. transações válidas são organizadas em um novo registro/bloco;
4. o mecanismo de consenso define qual histórico é aceito;
5. os participantes atualizam sua visão do estado da rede.

**Blockchain não é banco de dados centralizado tradicional.** O registro é replicado ou compartilhado entre participantes e segue regras de consenso. Isso não significa, porém, que toda blockchain seja pública, que qualquer pessoa possa escrever nela ou que não exista governança.

Também não é correto tratar “imutabilidade” como magia. O melhor raciocínio é **resistência à adulteração**: os mecanismos criptográficos e de consenso tornam modificações retroativas detectáveis e, em redes robustas, difíceis de consolidar.

## 3. Hash: a ligação entre dados e integridade

Um <abbr title="Resumo criptográfico de uma sequência de dados">hash</abbr> criptográfico transforma dados em um resumo de tamanho fixo. Pequenas mudanças na entrada tendem a produzir um resumo diferente.

Em blockchains, valores de <abbr title="Resumo criptográfico de uma sequência de dados">hash</abbr> são usados para ligar estruturas e verificar integridade. No Bitcoin, cada bloco referencia criptograficamente informação do bloco anterior. Alterar um bloco antigo modifica o encadeamento esperado e exige refazer o trabalho necessário para que a alteração seja aceita pela rede.

Pegadinha importante:

> **hash não cifra o conteúdo e não prova, sozinho, que uma informação é verdadeira.**

Ele é um mecanismo de integridade: ajuda a detectar mudança dos dados comparados.

## 4. Chave privada autoriza; chave pública permite verificar

Criptomoedas como o Bitcoin usam criptografia assimétrica. Cada participante pode trabalhar com um par relacionado:

- **chave privada:** segredo usado para produzir assinaturas digitais e autorizar o gasto de ativos sob seu controle;
- **chave pública:** informação derivada da chave privada, usada no mecanismo de verificação e na formação de identificadores de recebimento.

Uma transação de Bitcoin não precisa enviar a chave privada pela rede. O titular assina a transação com a chave privada; outros participantes verificam a assinatura usando as informações públicas correspondentes.

Por isso:

> **quem obtém a chave privada apropriada pode conseguir autorizar gastos; conhecer um endereço público não fornece, por si só, a chave privada.**

Uma **assinatura digital** não é uma imagem de assinatura manuscrita. É um resultado criptográfico que permite verificar que determinada chave privada autorizou dados específicos e que esses dados não foram alterados sem invalidar a verificação.

## 5. Endereço não é a mesma coisa que identidade civil

Em redes como Bitcoin, um endereço é um identificador técnico usado para receber ou referenciar valores. Ele não contém necessariamente nome, número de documento ou outra identificação civil visível.

Isso conduz a uma distinção importante:

- **pseudonimato:** a atividade aparece associada a identificadores técnicos, como endereços;
- **anonimato:** a identidade não pode ser relacionada à atividade.

Uma blockchain pública pode tornar transações amplamente observáveis. Se um endereço for associado a uma pessoa por dados de uma corretora, investigação, divulgação voluntária ou outros elementos, parte do histórico pode ser correlacionada.

Logo, **Bitcoin não deve ser descrito como “totalmente anônimo”**. Transparência do registro e identificação civil são dimensões diferentes.

## 6. Carteira não é um cofre contendo moedas digitais

Uma **carteira de criptomoedas** é software, dispositivo ou conjunto de dados usado principalmente para administrar chaves e criar/assinar transações. No caso do Bitcoin, o saldo é inferido do estado registrado na rede; a carteira mantém os meios criptográficos necessários para controlar os valores associados às chaves.

A ideia de prova é:

> **a blockchain registra o estado/transações; a carteira administra credenciais criptográficas para interagir com esse estado.**

### 6.1 Custódia por terceiro × autocustódia

Há dois modelos gerais:

- **custódia por terceiro:** uma prestadora controla, total ou parcialmente, os instrumentos que permitem movimentar os ativos em nome do usuário;
- **autocustódia:** o próprio usuário controla as chaves ou instrumentos necessários para autorizar transações.

Na custódia por terceiro, o usuário assume risco operacional e de contraparte relacionado ao custodiante. Na autocustódia, aumenta a responsabilidade pela proteção e recuperação das chaves.

Não existe conclusão universal de que um modelo seja “sempre seguro”. São estruturas de risco diferentes.

### 6.2 Carteira conectada × carteira de assinatura isolada

Uma carteira conectada à Internet facilita o uso cotidiano, mas expõe as chaves a um ambiente com maior superfície de ataque. Carteiras que mantêm o segredo em dispositivo isolado ou dedicado reduzem certos vetores de ataque, embora não eliminem erro humano, fraude ou perda do mecanismo de recuperação.

A classificação comum “quente” e “fria” descreve principalmente essa relação com conectividade e exposição, não a existência de moedas fisicamente dentro do dispositivo.

## 7. Da intenção de pagar à transação confirmada

Uma transferência em uma criptomoeda descentralizada pode ser pensada como um fluxo:

> **criar → assinar → transmitir → validar → incluir no histórico → acumular confirmações/finalidade conforme as regras da rede.**

No Bitcoin, em termos simplificados:

1. a carteira monta uma transação indicando quais valores existentes serão utilizados e quais novos destinos receberão valores;
2. o titular assina a autorização com a chave privada apropriada;
3. a transação é transmitida para participantes da rede;
4. nós verificam regras como assinaturas e inexistência de gasto incompatível do mesmo valor;
5. mineradores selecionam transações válidas para formar blocos candidatos;
6. o mecanismo de prova de trabalho e a regra de consenso determinam qual cadeia passa a representar o histórico aceito.

**Transmitir não é o mesmo que confirmar.** Uma transação pode circular antes de entrar em um bloco. A inclusão e o acúmulo de blocos posteriores aumentam a confiança de que aquele registro permanecerá no histórico aceito.

## 8. Consenso resolve o problema de chegar a um histórico comum

Em uma rede descentralizada, diferentes computadores podem receber mensagens em ordens distintas. O **mecanismo de consenso** define como a rede converge para um estado compartilhado.

### 8.1 Prova de trabalho no Bitcoin

No Bitcoin, o mecanismo é a <abbr title="Proof of Work, prova de trabalho">PoW</abbr>. Mineradores competem para produzir um bloco que satisfaça uma condição computacional definida pelo protocolo. Encontrar uma solução demanda trabalho; verificar a solução é relativamente simples.

A mineração cumpre funções relacionadas:

- organiza transações válidas em blocos;
- participa da disputa para estender o histórico aceito;
- dificulta a alteração retroativa do registro;
- distribui recompensa conforme as regras do protocolo, incluindo a criação programada de novas unidades e taxas de transação.

**Minerador não é sinônimo de usuário, corretora ou carteira.** E mineração não deve ser generalizada para toda criptomoeda.

Mineradores podem reunir capacidade computacional em **pools de mineração**, compartilhando trabalho e repartindo recompensas segundo regras do grupo. Um pool não muda o fato de que a rede continua aplicando as regras do protocolo aos blocos propostos.

### 8.2 Prova de participação em outras redes

Outras redes usam modelos diferentes, entre eles a <abbr title="Proof of Stake, prova de participação">PoS</abbr>. Em vez de competir pelo mesmo tipo de trabalho computacional do Bitcoin, participantes são selecionados ou ponderados com base em ativos colocados em participação e em regras específicas do protocolo.

O ponto de prova é o contraste:

| Mecanismo | Recurso central no processo | Cuidado |
|---|---|---|
| <abbr title="Proof of Work, prova de trabalho">PoW</abbr> | trabalho computacional | é o modelo do Bitcoin; envolve mineração |
| <abbr title="Proof of Stake, prova de participação">PoS</abbr> | participação econômica segundo regras da rede | não é “mineração de Bitcoin” |

Não conclua que uma dessas famílias funciona exatamente igual em todas as redes. Os detalhes variam por protocolo.

## 9. Bitcoin e blockchain: relação, não identidade

O Bitcoin combina várias peças:

- rede distribuída de participantes;
- transações assinadas digitalmente;
- blockchain para organizar o histórico;
- <abbr title="Proof of Work, prova de trabalho">PoW</abbr> para consenso e segurança econômica;
- regras de emissão e validação definidas pelo protocolo.

A blockchain é, portanto, **uma tecnologia utilizada pelo Bitcoin para registrar e organizar transações**, mas pode ser empregada em outros sistemas. Bitcoin é uma aplicação específica, com regras monetárias e de consenso próprias.

Evite as inversões clássicas:

- “Bitcoin é a tecnologia que implementa blockchain” → **inversão**;
- “blockchain é uma criptomoeda” → **erro de categoria**;
- “toda blockchain depende de Bitcoin” → **falso**;
- “toda criptomoeda usa exatamente a blockchain e a mineração do Bitcoin” → **generalização indevida**.

## 10. Descentralização não significa ausência de regras

Uma rede descentralizada não é uma rede sem regras. O protocolo especifica formatos de transação, condições de validade, mecanismo de consenso e outras restrições.

Também há camadas distintas:

- **protocolo/rede:** valida transações segundo regras técnicas;
- **carteira:** administra chaves e constrói transações;
- **corretora ou prestadora:** pode intermediar compra, venda, troca ou custódia;
- **usuário:** toma decisões sobre aquisição, transferência e guarda.

Uma corretora pode ser centralizada mesmo negociando ativos de uma rede descentralizada. Da mesma forma, usar blockchain não torna automaticamente uma organização “sem intermediários” em todas as suas relações.

## 11. Riscos: segurança do protocolo não elimina risco do usuário

A existência de criptografia e consenso não transforma criptomoedas em ativos sem risco.

Riscos frequentes incluem:

- **volatilidade:** preço pode variar intensamente;
- **perda ou comprometimento de chaves:** pode impedir ou permitir movimentações indevidas;
- **fraude e engenharia social:** o usuário pode ser induzido a autorizar operação ou revelar segredo;
- **risco de custodiante:** uma prestadora pode sofrer falha, fraude, bloqueio ou insolvência;
- **erro de endereço/rede:** uma transferência incorreta pode ser difícil ou impossível de recuperar;
- **risco técnico:** falhas de software, protocolos, contratos programáveis ou infraestrutura podem produzir perdas;
- **risco regulatório e operacional:** regras e obrigações dependem da atividade e da jurisdição.

O Banco Central do Brasil esclarece que ativos virtuais populares como criptomoedas **não são emitidos nem garantidos pelo Banco Central**. Logo, não trate a autoridade monetária como emissora ou garantidora do Bitcoin.

## 12. Marco jurídico brasileiro mínimo para este item

A Lei nº 14.478/2022 estabeleceu diretrizes para serviços de ativos virtuais e definiu as atividades de prestadoras, incluindo troca, transferência e custódia/administração em nome de terceiros.

O Decreto nº 11.563/2023 atribuiu ao <abbr title="Banco Central do Brasil">BCB</abbr> competência para regular a prestação de serviços de ativos virtuais e regular, autorizar e supervisionar prestadoras. O decreto preservou as competências da <abbr title="Comissão de Valores Mobiliários">CVM</abbr> sobre ativos que sejam valores mobiliários.

Duas conclusões de prova:

1. **“criptomoeda não é emitida pelo Banco Central” não significa “o mercado não possui regulação”.** O <abbr title="Banco Central do Brasil">BCB</abbr> recebeu competência regulatória sobre prestadoras de serviços de ativos virtuais.
2. **ativo virtual não substitui automaticamente as categorias de valor mobiliário ou ativo financeiro.** A própria Lei nº 14.478/2022 faz exclusões e preserva competências específicas.

Este capítulo usa o quadro vigente no corte programático da prova, **13 de julho de 2026**. Alterações posteriores não são projetadas para trás.

## 13. Método de prova

Ao encontrar uma alternativa sobre criptomoedas, pergunte primeiro **qual camada está sendo descrita**:

1. **registro compartilhado?** → blockchain/livro distribuído;
2. **autorização de gasto?** → chave privada e assinatura;
3. **recebimento/identificação técnica?** → endereço/chave pública derivada;
4. **administração das chaves?** → carteira;
5. **histórico comum da rede?** → consenso;
6. **competição computacional do Bitcoin?** → <abbr title="Proof of Work, prova de trabalho">PoW</abbr> e mineração;
7. **intermediação de compra, venda ou custódia?** → prestadora/corretora, não o protocolo em si.

Depois elimine absolutos perigosos:

- “blockchain é Bitcoin” → falso;
- “carteira guarda moedas como arquivos dentro do aparelho” → simplificação enganosa;
- “endereço público revela necessariamente a identidade civil” → falso;
- “chave pública autoriza gasto” → falso;
- “toda criptomoeda é minerada” → falso;
- “cripto é totalmente anônima” → falso;
- “ativo virtual é emitido ou garantido pelo <abbr title="Banco Central do Brasil">BCB</abbr>” → falso.

O mapa final é:

> **criptografia autoriza e verifica; blockchain organiza registros; consenso coordena a rede; carteira administra chaves; mineração é o mecanismo de participação da prova de trabalho do Bitcoin — não uma propriedade universal de toda criptomoeda.**
