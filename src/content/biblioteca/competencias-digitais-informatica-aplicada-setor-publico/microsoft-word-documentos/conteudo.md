---
schemaVersion: 1
title: "Microsoft Word: documentos e formatação de texto"
description: Criação, edição, formatação, estruturação, revisão, colaboração, acessibilidade, impressão e compatibilidade de documentos no Microsoft Word.
order: 21
storageId: microsoft-word-documentos
---

## 1. O documento não é uma folha de papel

Por que selecionar uma palavra e clicar em **Centralizar** pode deslocar a linha inteira, enquanto clicar em **Negrito** altera apenas a palavra? Porque os comandos atuam sobre objetos diferentes: negrito é propriedade de caracteres; centralização é propriedade do parágrafo. **Antes de escolher o comando, identifique o que ele modifica e até onde a mudança deve valer.**

O Word é um **processador de texto**: cria, organiza, formata e revisa documentos. Não se confunde com o arquivo `relatorio.docx`, que guarda texto, estruturas e configurações. Fechar o programa não apaga o arquivo salvo.

**Caractere** é cada letra, número, símbolo ou espaço. **Parágrafo** é o trecho encerrado por uma marca de parágrafo, criada com `Enter`; pode ocupar várias linhas. **Seção** é uma parte do documento com configurações próprias de página, como margens e orientação. Um documento começa com uma seção, que pode atravessar muitas páginas. Linha não é parágrafo; página não é seção.

**Exemplo hipotético:** um relatório tem títulos padronizados, texto corrido e uma tabela larga no anexo. As palavras recebem formatação; os parágrafos, alinhamento e espaçamento; o anexo pode exigir outra seção. Retomaremos esse relatório para distinguir as operações.

### Ambiente e alcance

O item 2.2 do edital inclui Microsoft Office sem fixar edição. A referência aqui é o **Word instalado no Windows, nas versões Microsoft 365 e Word 2024**, com conceitos também presentes no Word 2021. Word para a Web funciona no navegador; Word para <abbr title="Sistema operacional dos computadores Mac">macOS</abbr>, nos computadores Mac. Recursos e atalhos podem diferir. **A versão especificada na questão prevalece.** O foco é documento: planilhas e seus cálculos são aprofundados no Excel; apresentações, no PowerPoint.

## 2. Encontrar o comando e delimitar sua ação

A **Faixa de Opções** reúne comandos em guias divididas em grupos. **Arquivo** abre o **Backstage**, área para criar, abrir, salvar, imprimir, exportar, compartilhar e acessar propriedades e opções. <abbr title="Desenho dos caracteres">Fonte</abbr> e parágrafo ficam principalmente em **Página Inicial**, não em Arquivo.

A **Barra de Ferramentas de Acesso Rápido** reúne comandos personalizáveis. As **guias contextuais** aparecem conforme a seleção: clicar em uma tabela revela suas ferramentas. Uma guia ausente pode apenas depender da seleção do objeto. `Alt` ou `F10` exibe as **Dicas de Tecla**, indicações para acessar a faixa pelo teclado.

O **ponto de inserção** indica onde será digitado o próximo caractere. Movê-lo é navegar; destacar um trecho é selecionar. A seleção delimita muitas operações, mas não muda sua natureza: alinhamento continua afetando os parágrafos atingidos.

| Movimento no texto, no Word para Windows | Atalho |
|---|---|
| início ou fim do documento | `Ctrl + Home` / `Ctrl + End` |
| palavra anterior ou seguinte | `Ctrl + ←` / `Ctrl + →` |
| parágrafo anterior ou seguinte | `Ctrl + ↑` / `Ctrl + ↓` |
| ampliar a seleção por caractere | `Shift + ←` / `Shift + →` |
| ampliar a seleção por palavra | `Ctrl + Shift + ←` / `Ctrl + Shift + →` |
| selecionar até o início ou fim do documento | `Ctrl + Shift + Home` / `Ctrl + Shift + End` |

O **Painel de Navegação** percorre títulos, páginas e resultados de pesquisa. A barra de status pode mostrar página, contagem de palavras, idioma e ampliação. As réguas ajudam a configurar <abbr title="Deslocamentos do parágrafo em relação aos limites da área de texto">recuos</abbr> e <abbr title="Posições de referência horizontal para distribuir o texto">tabulações</abbr>.

### Enxergar a estrutura e mudar apenas a visualização

**Mostrar Tudo** (`¶`) revela marcas não imprimíveis de parágrafo, espaço, <abbr title="Posição de referência horizontal para distribuir o texto">tabulação</abbr> e quebra. No relatório, isso permite distinguir um vazio causado por parágrafos vazios de outro causado por uma quebra: aparências semelhantes podem esconder estruturas diferentes.

O **zoom** amplia a visualização: passar de 100% para 200% não duplica fonte nem tamanho impresso. Na guia **Exibição**, **Layout de Impressão** mostra a organização em páginas; **Modo de Leitura** favorece ler; **Layout da Web** mostra um fluxo voltado à tela; **Rascunho** privilegia editar; **Estrutura de Tópicos**, trabalhar com a hierarquia dos títulos. Mudar o modo não reescreve o conteúdo.

### Atalhos exigem contexto

Os atalhos deste capítulo se referem ao Word para Windows, no contexto indicado. Letras de abrir, salvar, selecionar tudo e negrito podem variar por idioma, versão e personalização; na Web, o navegador pode interceptar teclas. Não generalize uma tabela inglesa para a interface em português. A atribuição pode ser consultada em **Arquivo → Opções → Personalizar Faixa de Opções → Atalhos de teclado**.

## 3. Editar sem perder o controle do texto

### Movimentação, exclusão e colagem

A **Área de Transferência** mantém conteúdo temporário para colagem. **Copiar** (`Ctrl + C`) conserva a origem; **Recortar** (`Ctrl + X`) retira a seleção e a coloca nessa área; **Colar** (`Ctrl + V`) insere no destino. A Área de Transferência do Office pode reunir vários itens, mas não é arquivo permanente.

Sem seleção ativa, `Backspace` exclui à esquerda do ponto de inserção, e `Delete`, à direita; com `Ctrl`, essas teclas normalmente excluem uma palavra na respectiva direção. Com uma seleção ativa, a exclusão atinge o trecho selecionado.

Colar também exige decidir sobre a aparência. Um trecho de um site pode trazer cores inadequadas ao relatório. **Manter Somente Texto** descarta formatação e objetos não textuais da origem; o texto usa a formatação do destino, e uma tabela pode virar parágrafos. Não significa deixar o texto sem <abbr title="Desenho dos caracteres">fonte</abbr> ou sem qualquer formatação.

**Manter Formatação de Origem** conserva a aparência trazida; **Mesclar Formatação** integra o texto ao destino e pode preservar negrito e itálico. Colar como **Imagem** produz representação visual, não caracteres editáveis. Disponibilidade e opção padrão dependem de origem, destino, plataforma e configuração.

### Desfazer, refazer, repetir e substituir

`Ctrl + Z` desfaz uma ação reversível. **Refazer** recupera uma ação desfeita, quando possível; **Repetir** executa novamente a última ação compatível. `Ctrl + Y` pode refazer ou repetir conforme o estado do aplicativo, e `F4` repete uma ação compatível. São conceitos distintos, mesmo quando compartilham uma tecla.

**Localizar** encontra ocorrências; **Substituir**, em Página Inicial, pode trocar texto, formatação e itens especiais, como marcas de parágrafo. **Substituir Tudo** exige conferir alcance, distinção entre maiúsculas/minúsculas e palavras inteiras: procurar uma parte de palavra pode alterar também palavras que deveriam permanecer intactas.

### Autocorreção não é revisão gramatical

A **Autocorreção** pode substituir automaticamente entradas durante a digitação. Suas opções ficam em **Arquivo → Opções → Revisão de Texto → Opções de Autocorreção**. Na guia **Formatação Automática ao Digitar**, configuram-se automatismos como reconhecer marcadores e listas numeradas. Digitar `1.` pode iniciar uma lista se esse reconhecimento estiver habilitado; digitar números por conta própria, sem o recurso de lista, não garante uma sequência administrada pelo Word.

A Autocorreção age durante a digitação; o **Editor** analisa possíveis problemas de linguagem. Configurar a primeira não equivale a aceitar sugestões do segundo.

## 4. Formatar caracteres e organizar parágrafos

### Aparência dos caracteres

**Fonte** é o desenho dos caracteres, como Arial; seu tamanho é medido em pontos. Negrito, itálico, sublinhado, <abbr title="Traço que atravessa o caractere">tachado</abbr>, sombra, contorno e espaçamento entre caracteres formatam o texto. **Sobrescrito** eleva o caractere, como o 2 em m²; **subscrito** o rebaixa, como em H₂O. Cor da fonte muda o caractere; realce destaca seu fundo. Mudar maiúsculas/minúsculas não é mudar o tamanho da fonte.

Aplicar propriedades diretamente a uma seleção é **formatação direta**. `Ctrl + Barra de espaços` remove formatação manual de caracteres sem apagar o texto. O **Pincel de Formatação** transfere formatação da origem para o destino, não o conteúdo; um duplo clique o mantém disponível para vários destinos. Ao copiar também propriedades de parágrafo, inclua a marca final do parágrafo na seleção da origem.

### Alinhamento, recuo e espaçamento

O texto passa automaticamente à linha seguinte conforme a largura disponível, sem criar outro parágrafo. Sua marca final guarda propriedades do conjunto; basta posicionar o cursor nele para executar muitos comandos de parágrafo.

**Alinhar** é distribuir as linhas no espaço horizontal disponível. À esquerda ou à direita, as linhas se ajustam ao respectivo limite; centralizado, ficam em torno do centro. **Justificado** distribui o espaçamento para alcançar ambos os limites, normalmente deixando a última linha sem essa expansão. Os limites consideram os recuos: justificar não altera as margens da página.

A **margem** delimita a área de texto da seção; o **recuo** desloca o parágrafo em relação a ela. Recuos esquerdo e direito afetam o bloco. O recuo **de primeira linha** desloca apenas seu início; o recuo **deslocado ou pendente** deixa a primeira linha mais à esquerda que as seguintes. Este último é útil quando um número ou rótulo deve sobressair à esquerda do texto que continua abaixo.

**Espaçamento entre linhas** regula a distância dentro do parágrafo. **Antes/depois** regula o espaço que o separa dos parágrafos vizinhos. No relatório, aumentar o espaço depois de um título mantém uma regra de formatação; pressionar `Enter` várias vezes acrescenta parágrafos vazios que podem migrar para outra página quando o texto mudar.

### Manter juntos os trechos que precisam ser lidos juntos

O Word distribui o texto entre páginas, mas permite impor condições ao parágrafo. **Manter com o próximo** evita separar um título do parágrafo seguinte. **Manter linhas juntas** evita dividir o próprio parágrafo entre páginas. **Controle de linhas órfãs e viúvas** evita deixar apenas a primeira linha no fim de uma página ou apenas a última no início da seguinte. **Quebra de página antes** faz aquele parágrafo começar em outra página. São regras de paginação, não inserções de linhas vazias.

### Tabulações e listas

Uma **parada de tabulação** marca uma posição de referência horizontal. Ao pressionar `Tab` no texto, o conteúdo avança para a próxima parada; isso não equivale a digitar um número fixo de espaços. As paradas esquerda, central e direita alinham o texto em relação ao ponto escolhido; a decimal alinha os separadores decimais dos números. Pode haver preenchimento entre posições, como pontos pontilhados.

**A tabulação de barra é diferente:** desenha uma linha vertical na posição definida, mas não posiciona o texto; essa linha pode ser impressa. Não a confunda com as marcas não imprimíveis exibidas por Mostrar Tudo.

Uma lista com **marcadores** identifica itens sem impor sequência numérica. Uma lista **numerada** administra a sequência; a **multinível** representa hierarquia, como item e subitem. O Word controla nível, recuo e continuidade da numeração, que pode ser retomada ou reiniciada. Ao colar itens, verifique se devem continuar a lista existente ou iniciar outra.

## 5. Padronizar uma vez: estilos, temas e modelos

Os títulos do relatório precisam da mesma fonte, negrito e espaço posterior. Em vez de repetir operações manuais, aplique um **estilo**: conjunto nomeado e reutilizável de propriedades de caractere e/ou parágrafo. Modificar o estilo atualiza os trechos associados a ele, observadas eventuais formatações diretas sobrepostas.

Os estilos **Título 1**, **Título 2** e seguintes também expressam hierarquia: título principal, subdivisão e níveis inferiores. Isso permite navegar pela estrutura, produzir sumário automático e orientar programas que leem o conteúdo em voz alta. **Fonte grande e negrito, sozinhos, não transformam um parágrafo em título estrutural.**

Para atualizar um estilo a partir de um exemplo já formatado, selecione um trecho que o utiliza, aplique os novos atributos e, em **Página Inicial → Estilos**, escolha **Atualizar para Corresponder à Seleção** no estilo adequado. O grupo não fica em Arquivo. O Pincel de Formatação é útil para copiar aparência; o estilo mantém uma regra reutilizável de padronização.

**Tema** coordena cores, fontes e efeitos gerais, na guia Design. **Modelo** fornece uma base com estrutura, estilos, tema e elementos prontos, como capa e títulos; o documento criado continua editável. Tema organiza o conjunto visual; estilo formata tipos de conteúdo; modelo dá o ponto de partida. **Arquivo → Novo** permite começar por modelo ou documento em branco.

## 6. Distribuir o documento em páginas e seções

### Quando é preciso apenas avançar, e quando é preciso separar configurações

**Layout** é a organização dos elementos na página. Sua guia reúne margens, orientação, tamanho do papel, colunas, recuos e quebras. **Retrato** usa a página vertical; **paisagem**, horizontal. Colunas de texto criam faixas de fluxo sucessivo, como num boletim; não são células de tabela.

As quebras controlam esse fluxo, mas não têm todas o mesmo alcance:

| Recurso | O que começa depois dele |
|---|---|
| `Enter` | outro parágrafo |
| quebra de linha, `Shift + Enter` | outra linha, no mesmo parágrafo |
| quebra de página, `Ctrl + Enter` | outra página, sem criar seção |
| quebra de coluna | próxima coluna do fluxo |
| quebra de seção | trecho com configurações de página independentes |

No anexo largo do relatório, uma simples quebra de página não basta para reservar a orientação horizontal ao anexo. A solução usual é inserir **quebras de seção antes e depois**, aplicar paisagem à seção intermediária e manter as demais em retrato. Confira a opção **Aplicar a**: conforme a operação, a alteração pode alcançar a seção, o documento inteiro ou o texto a partir daquele ponto.

Em **Layout → Quebras**, a quebra de seção **Próxima Página** inicia a seção na página seguinte; **Contínua**, na mesma página, sendo útil para mudar a quantidade de colunas. **Página Par** e **Página Ímpar** começam na próxima página da paridade escolhida e podem deixar uma página em branco no percurso. Não exclua quebras apenas para eliminar um vazio: remover uma quebra de seção une os trechos e faz a seção resultante usar a formatação da seção que vinha depois.

### Cabeçalhos, rodapés, numeração e bordas

**Cabeçalho** é a área superior recorrente da página; **rodapé**, a inferior. Em **Inserir**, podem receber texto, imagens, datas e números de página. A distância à borda, **Primeira Página Diferente** e **Páginas Pares e Ímpares Diferentes** controlam sua apresentação.

Uma nova seção pode continuar com **Vincular ao Anterior** ativado. Para dar ao anexo um cabeçalho próprio, abra o cabeçalho da nova seção, desative esse vínculo e só então altere o texto. Cabeçalho e rodapé são vinculados separadamente; variantes de primeira página e pares/ímpares também se vinculam ao mesmo tipo da seção anterior. Criar a seção não elimina automaticamente todos esses vínculos.

O número automático da página é um **campo**: uma instrução armazenada cujo resultado visível é calculado pelo Word. Inserir esse campo é diferente de digitar um número fixo em cada página. Sua apresentação pode usar algarismos, romanos ou letras, e a numeração pode continuar ou reiniciar por seção. **Desvincular o cabeçalho não é, por si só, reiniciar a numeração**; confira **Formatar Números de Página**.

Bordas exigem identificar o alvo. **Página Inicial → Parágrafo → Bordas** trata de texto/parágrafo; **Design da Tabela**, de células/tabela; **Design → Bordas da Página**, da moldura da página. **Borda da Página atua por seção.** Para uma única página intermediária com borda própria, isole-a em uma seção e escolha o alcance em **Bordas e Sombreamento**. Sombreamento preenche o fundo do elemento, não seu contorno.

Em **Design → Plano de Fundo da Página**, **Marca-d'água** insere texto ou imagem ao fundo, como a indicação hipotética “MINUTA”, diagonal e semitransparente. Sinaliza uma condição, mas não protege contra leitura ou edição. Cor da página e borda são outros recursos.

## 7. Tabelas, imagens e leitura acessível

### Estruturar dados em células

Uma **tabela** relaciona dados em linhas e colunas; sua interseção é a **célula**. Em **Inserir**, crie a tabela onde ela for necessária. Depois, ainda é possível inserir/excluir linhas e colunas, mudar dimensões e alinhar o conteúdo nas células.

**Mesclar células** reúne duas ou mais em uma só; **dividir células** faz a operação estrutural inversa. **Layout da Tabela** concentra esses comandos, largura, altura e distribuição uniforme das linhas ou colunas. **Design da Tabela** concentra estilos, bordas e sombreamento. A guia Layout do documento, por sua vez, controla a página: nomes parecidos não significam o mesmo objeto.

`Tab` vai à próxima célula e, na última célula da tabela, normalmente acrescenta uma linha. `Shift + Tab` retorna à anterior; **`Ctrl + Tab` insere uma tabulação dentro da célula**, sem sair dela. Uma linha definida como cabeçalho pode se repetir quando a tabela continua em outras páginas. Converter texto em tabela usa separadores para identificar células; a conversão inversa transforma a estrutura em texto separado. O Word admite cálculos limitados em tabelas, mas isso não as transforma em planilhas do Excel.

### Posicionar imagens e preservar seu significado

Imagens e formas podem ser acrescentadas pela guia **Inserir**. A disposição **Em linha com o texto** faz o objeto acompanhar o parágrafo como um caractere. O objeto **flutuante** usa disposições como **Quadrado**, **Próximo**, **Superior e Inferior**, **Atrás** ou **Na Frente do Texto**. Sua **âncora** o liga a um parágrafo, cujas alterações podem afetar a posição conforme as opções de movimentação. Flutuar não significa ausência de vínculo.

**Redimensionar** altera largura e altura. **Recortar** modifica a área visível da imagem, ocultando partes. **Comprimir** pode reduzir resolução e tamanho do arquivo. Nenhuma dessas operações deve ser confundida com o zoom, que só amplia a visualização do documento.

Um documento acessível precisa transmitir sentido além da aparência. **Texto alternativo** é uma descrição que comunica a informação ou finalidade de uma imagem a quem não a vê, inclusive por meio de um leitor de tela, programa que anuncia o conteúdo. Imagens informativas precisam dessa descrição; as puramente decorativas devem ser identificadas como decorativas quando o recurso estiver disponível. Uma legenda visível não substitui automaticamente uma descrição adequada.

Use títulos em ordem lógica, idioma correto, tabelas simples com cabeçalhos identificáveis e textos de ligação descritivos. Não dependa só da cor para distinguir informações. O **Verificador de Acessibilidade**, acessível pela guia Revisão, ajuda a localizar problemas, mas não garante sozinho que uma descrição explique bem a imagem ou que a ordem de leitura faça sentido.

## 8. Deixar o Word administrar referências e atualizações

O campo de página já mostrou a diferença entre **instrução armazenada e resultado exibido**. Outros campos produzem datas, numeração de <abbr title="Identificações de figuras ou tabelas por rótulo e número">legendas</abbr>, sumários e <abbr title="Remissões a elementos do próprio documento">referências cruzadas</abbr>. Nem todos se atualizam imediatamente após qualquer edição; `F9` atualiza os campos selecionados.

### Dos títulos ao sumário

O **sumário automático** relaciona títulos e páginas a partir dos estilos de título ou níveis estruturais configurados. No relatório, primeiro marque a hierarquia com Título 1, Título 2 e assim por diante; depois insira o sumário pela guia **Referências**. Se um título não aparece, confira a estrutura, não apenas a aparência dele.

Após editar o documento, **Atualizar apenas os números de página** serve quando os títulos permaneceram iguais e só a paginação mudou. **Atualizar a tabela inteira** incorpora títulos incluídos, excluídos ou renomeados. Escrever títulos, pontilhados e números manualmente cria um sumário manual, não uma relação que o Word recalcula.

### Notas, legendas e ligações

Uma **nota de rodapé** associa uma marca no texto a uma explicação, normalmente no fim da página; uma **nota de fim** reúne explicações no fim do documento ou da seção. O Word administra a ligação e a numeração. Digitar um número sobrescrito não cria essa estrutura, e uma nota de rodapé não é o rodapé recorrente da página.

Uma **legenda** identifica uma tabela, figura ou outro objeto com rótulo e numeração. A **referência cruzada** remete a um elemento do próprio documento, como “ver Tabela 2”, mediante um campo atualizável. Se outra tabela for inserida antes, atualizar os campos evita conservar uma remissão manual para o número errado. Uma **citação bibliográfica** identifica a fonte consultada; a guia Referências também oferece seu gerenciamento e a produção de bibliografia.

**Hiperlink**, disponível em **Inserir**, é uma ligação acionável para página, arquivo, endereço ou posição no documento. Pode facilitar o acesso a um destino, inclusive em uma referência cruzada configurada como ligação, mas não se confunde com qualquer texto de remissão. Seu texto visível deve explicar o destino, em vez de apenas dizer “clique aqui”.

## 9. Personalizar documentos: mala direta e formulários

### Um texto comum, vários destinatários

**Mala direta** combina um **documento principal**, com conteúdo comum, e uma **fonte de dados**, com informações variáveis. Numa comunicação hipotética para várias unidades, cada destinatário ocupa uma linha da lista, o **registro**; Nome e Endereço são **campos de dados**. No texto comum, o **campo de mesclagem** indica onde inserir cada valor. Portanto, a lista não é o documento principal, e a marca de mesclagem não é texto fixo.

Na guia **Correspondências**, escolha o tipo de saída — cartas, envelopes, etiquetas ou mensagens —, selecione/crie a lista e insira os campos no texto comum. Depois filtre, ordene e selecione destinatários, **visualize os resultados** para conferir cada combinação e use **Concluir e Mesclar** para gerar documentos, imprimir ou enviar, conforme o tipo e os recursos disponíveis. Visualizar um destinatário não gera, por si só, todas as saídas finais. O envio de mensagens ainda depende de configuração de correio compatível.

### Um documento com áreas próprias para preenchimento

O formulário recebe informações em espaços próprios. Na guia **Desenvolvedor**, os **controles de conteúdo** oferecem caixa de texto, lista suspensa, caixa de seleção e seletor de data. A guia pode ser habilitada na personalização da Faixa de Opções.

Para restringir o documento ao preenchimento, configure **Restringir Edição → Preenchimento de formulários**, aplique a proteção e, quando necessário, defina senha para impedir sua retirada pelo procedimento normal. Proteções e propriedades dos controles precisam corresponder ao formulário utilizado. **Essa restrição não equivale a criptografar o arquivo para impedir sua leitura.** A criação de formulários preenchíveis não tem o mesmo suporte no Word para a Web; considere a plataforma indicada.

## 10. Revisar, colaborar e proteger são decisões diferentes

### Conferir a linguagem e decidir sobre propostas de edição

Na guia **Revisão**, o **Editor** verifica ortografia, gramática e, conforme a versão/licença, refinamentos de estilo. `F7` inicia a verificação no Word para Windows. O **idioma de revisão** atribuído ao texto determina as regras linguísticas utilizadas: alterá-lo não traduz o conteúdo. Um alerta é uma sugestão a avaliar, não prova infalível de erro. Para rever ocorrências antes ignoradas, há **Arquivo → Opções → Revisão de Texto → Verificar Documento Novamente**, conforme a versão.

**Comentário** registra observação ou discussão sem substituir diretamente o texto; pode receber respostas e ser resolvido. **Controlar Alterações** registra propostas de inserção, exclusão, movimentação e formatação, conforme suas opções. **Aceitar** incorpora uma proposta; **Rejeitar** a descarta. Resolver um comentário não aceita automaticamente uma alteração.

Considere a revisão hipotética de um prazo de “dez” para “quinze” dias. Com o controle ativo, há uma proposta de exclusão e inserção. Escolher **Nenhuma Marcação** pode mostrar a versão com “quinze”, mas as revisões continuam armazenadas. Desativar o controle interrompe o registro de novas edições, sem decidir sobre as anteriores. E desmarcar **Imprimir Marcação** apenas impede a saída das marcações naquela impressão: não limpa o arquivo. **Visualizar, registrar e resolver alterações são três ações diferentes.**

### Compartilhar o mesmo arquivo ou enviar cópias

**Coautoria** é a edição do mesmo documento por várias pessoas. Exige armazenamento, formato, versão e permissões compatíveis, como em um arquivo compartilhado por OneDrive ou SharePoint, serviços da Microsoft para armazenar e compartilhar documentos pela rede. Um link com permissão de edição dá acesso ao arquivo comum; enviar um anexo normalmente distribui cópias independentes, que passam a divergir.

O **histórico de versões** consulta ou restaura estados anteriores nos serviços compatíveis; não é garantido para qualquer arquivo apenas local. Também não equivale a Controlar Alterações: versão é estado do arquivo; revisão controlada é proposta dentro dele.

### Proteger leitura, edição ou apenas sinalizar conclusão

**Criptografar** é transformar o conteúdo de modo que sua leitura dependa da chave adequada, associada aqui à senha. No Word para Windows, **Arquivo → Informações → Proteger Documento → Criptografar com Senha** protege a abertura; a alteração precisa ser salva. Uma senha esquecida pode impedir o acesso, pois o Word não oferece recuperação simples dessa senha.

**Restringir Edição** limita as alterações permitidas, como no formulário; não é a mesma proteção da senha para abrir. **Marcar como Final** sinaliza que o documento está concluído, mas não é uma barreira de segurança equivalente à criptografia. O Word para a Web não oferece a mesma capacidade de criar e editar documentos criptografados por senha que a versão instalada.

## 11. Salvar o trabalho e entregar a versão correta

### Nome, local e formato fazem parte da decisão

**Salvar** atualiza o arquivo, mantendo nome, local e formato já definidos. No primeiro salvamento, ainda é preciso escolhê-los. **Salvar como** pode criar arquivo independente com outro nome, local ou formato; certos fluxos do Microsoft 365 usam **Salvar uma Cópia**. Para preservar o original, copie antes de editar.

O **Salvamento Automático** do Microsoft 365 grava alterações enquanto se trabalha, quando o arquivo está em local e formato compatíveis, como OneDrive ou SharePoint Online. Não se aplica indistintamente a qualquer arquivo local ou formato antigo. A **AutoRecuperação** guarda informações que podem ajudar após uma falha; não substitui o salvamento consciente nem garante recuperar todas as mudanças. Com salvamento automático ativo, editar o original e só depois pedir uma cópia pode já ter modificado o original.

O formato determina quais estruturas o arquivo consegue conservar. **Abrir um arquivo não garante preservar integralmente seus recursos ao salvá-lo em outro formato.**

| Formato | O que considerar |
|---|---|
| `.docx` | formato moderno padrão de documento editável do Word; conserva texto, estilos, campos e objetos |
| `.doc` | formato binário antigo; pode exigir Modo de Compatibilidade |
| `.odt` — <abbr title="OpenDocument Text">ODT</abbr> | formato de texto OpenDocument; troca documentos entre aplicativos, mas pode perder ou converter recursos do Word |
| `.rtf` — <abbr title="Rich Text Format">RTF</abbr> | formato de texto enriquecido; conserva formatação e parte dos objetos, sem todos os recursos específicos do Word |
| `.txt` | texto simples; não conserva como tais estilos, imagens, tabelas ou campos atualizáveis |
| `.pdf` — <abbr title="Portable Document Format">PDF</abbr> | formato de apresentação de página para distribuição e impressão; não é o formato editável padrão do Word |

O **Modo de Compatibilidade** limita funcionalidades atuais para trabalhar com formatos ou versões anteriores; converter o documento é outra decisão. Na passagem para `.odt`, podem mudar revisões, proteção, temas, campos, legendas, tabelas e seções. Confira o resultado antes de descartar a origem.

### Impressão e exportação

`Ctrl + P` abre a visualização e as configurações de impressão. Confira a impressora ou saída escolhida, quantidade de cópias, papel, orientação, margens, frente e verso quando suportado, escala, páginas por folha e inclusão de marcações de revisão. Reduzir o zoom na tela não serve para colocar mais páginas numa folha: isso depende das opções de impressão.

**Página atual**, **seleção** e **intervalo** têm alcances distintos. Para imprimir somente as páginas 3 a 9 de um documento com numeração contínua simples, use **Impressão Personalizada** e o intervalo `3-9`. Documentos com seções e numeração reiniciada exigem atenção à identificação das páginas pretendidas e à pré-visualização.

Salvar como ou exportar para <abbr title="Portable Document Format">PDF</abbr> produz outro arquivo. Se o `.docx` for alterado depois, o <abbr title="Portable Document Format">PDF</abbr> anterior não acompanha automaticamente a mudança: é preciso gerá-lo novamente. A distribuição final deve considerar tanto o que aparece nas páginas quanto revisões, comentários e permissões que ainda existam no arquivo entregue.

## 12. Aplicar o mapa, não decorar botões isolados

O anexo com orientação e cabeçalho próprios exige seção, alcance da orientação e desvinculação do cabeçalho. Títulos uniformes e sumário exigem estilos e estrutura. Uma entrega sem revisões pendentes exige aceitar ou rejeitar, não apenas ocultar. A sequência que une essas decisões é **ambiente → objeto → alcance → efeito → comando**.
