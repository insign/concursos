---
schemaVersion: 1
title: Microsoft Word e editores de texto
description: Criação, edição, formatação, estruturação, revisão, colaboração, acessibilidade, impressão e compatibilidade de documentos no Microsoft Word.
order: 21
storageId: tec-microsoft-word-documentos
---

## 1. Recorte do assunto e ambiente de referência

O edital inclui editores de texto, planilhas e apresentações no Microsoft Office. Este assunto cobre somente o **Microsoft Word e a formatação de documentos**. Fórmulas, funções, gráficos de planilha e criação de apresentações pertencem aos assuntos de Excel e PowerPoint.

A referência principal é o **Word desktop atual para Windows**, especialmente o Word para Microsoft 365 e o Word 2024. Conceitos estáveis também se aplicam ao Word 2021. Quando uma operação depende de Word para a Web, macOS, idioma da interface, formato do arquivo, licença ou personalização, essa condição precisa ser considerada.

Em prova, evite quatro generalizações:

- Word desktop e Word para a Web não oferecem necessariamente os mesmos recursos;
- abrir um formato não garante preservar integralmente todos os recursos;
- atalhos por letras podem variar conforme plataforma, idioma, layout de teclado e personalização;
- a posição visual de um comando pode mudar entre versões, mas seu **objeto** e seu **efeito** permanecem o melhor critério de resolução.

---

## 2. O mapa mental que resolve a maior parte das questões

Antes de procurar um botão, identifique **qual objeto será alterado**.

| Objeto | Exemplos de propriedades |
|---|---|
| **caractere** | fonte, tamanho, negrito, itálico, cor, sobrescrito, subscrito |
| **parágrafo** | alinhamento, recuos, espaçamento, tabulações, bordas do parágrafo |
| **lista** | marcador, numeração, nível, sequência e recuo |
| **seção** | margens, orientação, colunas, cabeçalhos, rodapés, paginação e borda da página |
| **tabela** | linhas, colunas, células, dimensões, bordas, sombreamento e alinhamento |
| **objeto gráfico** | tamanho, recorte, disposição, posição, âncora e texto alternativo |
| **campo** | número de página, sumário, data, legenda e referência cruzada |
| **arquivo/documento** | nome, local, formato, propriedades, proteção, compartilhamento, impressão e exportação |

Esse mapa evita confusões como **recuo versus margem**, **borda de parágrafo versus borda da página** e **quebra de página versus quebra de seção**.

---

## 3. Interface e localização dos comandos

O Word organiza comandos na **Faixa de Opções**, composta por guias e grupos. A guia **Arquivo** abre o modo de exibição **Backstage**, voltado ao arquivo e ao aplicativo: criar, abrir, salvar, exportar, imprimir, compartilhar, consultar propriedades e acessar opções.

Outros elementos recorrentes:

| Elemento | Função principal |
|---|---|
| **Barra de Ferramentas de Acesso Rápido** | reúne comandos frequentes e pode ser personalizada |
| **guias contextuais** | aparecem quando um objeto, como tabela ou imagem, é selecionado |
| **réguas** | auxiliam recuos e tabulações quando exibidas |
| **barra de status** | pode mostrar página, palavras, idioma, modo de exibição e zoom |
| **painel de navegação** | pesquisa conteúdo e navega por títulos, páginas ou resultados |
| **Dicas de Tecla** | aparecem com `Alt` ou `F10` no desktop compatível |

### 3.1 Comando, objeto e guia principal

| Tarefa | Guia ou contexto mais comum |
|---|---|
| fonte, parágrafo, estilos, localizar e substituir | **Página Inicial** |
| tabelas, imagens, formas, hiperlinks, cabeçalhos e números de página | **Inserir** |
| temas, cores, marca d'água, cor e borda da página | **Design** |
| margens, orientação, tamanho, colunas, recuos e quebras | **Layout** |
| sumário, notas, citações, legendas e referências cruzadas | **Referências** |
| cartas, etiquetas, destinatários e campos de mesclagem | **Correspondências** |
| Editor, idioma, comentários, Controlar Alterações e acessibilidade | **Revisão** |
| modos de exibição, painel de navegação e zoom | **Exibição** |
| largura, altura, mesclar e dividir células | guia contextual **Layout da Tabela** |
| estilos, bordas e sombreamento de tabela | guia contextual **Design da Tabela** |

Uma guia contextual não permanece obrigatoriamente visível: ela depende do objeto selecionado.

### 3.2 Modos de exibição e zoom

Modos de exibição alteram a maneira de trabalhar, não o conteúdo armazenado por si mesmos.

- **Layout de Impressão:** aproxima a tela da aparência impressa;
- **Modo de Leitura:** reduz distrações;
- **Layout da Web:** apresenta fluxo contínuo voltado à tela;
- **Estrutura de Tópicos:** facilita reorganizar níveis de títulos;
- **Rascunho:** privilegia a edição do texto.

O **zoom** amplia ou reduz a visualização. Ele não muda a fonte, as margens nem o tamanho impresso.

---

## 4. Criar, abrir, salvar e escolher formatos

### 4.1 Documento em branco e modelo

Um documento pode começar em branco ou a partir de um **modelo**. O modelo fornece estrutura, estilos, tema e elementos previamente configurados, mas o documento criado continua editável.

### 4.2 Salvar e Salvar como

- **Salvar** atualiza o arquivo atual no nome, local e formato já definidos;
- **Salvar como** permite escolher outro nome, local ou formato e pode criar um arquivo independente;
- no primeiro salvamento, nome, local e formato ainda precisam ser definidos;
- **AutoSave**, quando disponível em ambiente compatível, grava alterações automaticamente, mas não substitui o entendimento de local, permissões, versão e compartilhamento.

### 4.3 Formatos importantes

| Formato | Uso e cautela |
|---|---|
| `.docx` | formato moderno padrão do Word; preserva ampla variedade de recursos |
| `.doc` | formato binário legado; pode acionar Modo de Compatibilidade |
| `.odt` | formato OpenDocument; interoperável, mas sem paridade integral com DOCX |
| `.rtf` | preserva texto formatado e parte dos objetos, com menos recursos específicos do Word |
| `.txt` | texto simples; perde estilos, imagens, tabelas e formatação rica |
| `.pdf` | layout fixo para distribuição e impressão; não é o formato editável padrão do Word |

**Compatibilidade não é equivalência.** Um documento pode abrir e manter o texto, mas perder ou converter proteção, alterações controladas, temas, campos, legendas, propriedades de seção ou estruturas de tabela. O Modo de Compatibilidade limita recursos atuais para preservar trabalho com formatos antigos; converter o arquivo é uma decisão diferente.

---

## 5. Navegação, seleção e marcas de formatação

O ponto de inserção indica onde o próximo caractere será digitado. Navegar move esse ponto; selecionar delimita o conteúdo que receberá uma ação.

Atalhos de navegação recorrentes no Word para Windows incluem:

| Ação | Atalho comum |
|---|---|
| início ou fim do documento | `Ctrl + Home` / `Ctrl + End` |
| palavra anterior ou seguinte | `Ctrl + ←` / `Ctrl + →` |
| parágrafo anterior ou seguinte | `Ctrl + ↑` / `Ctrl + ↓` |
| estender por caractere | `Shift + ←` / `Shift + →` |
| estender por palavra | `Ctrl + Shift + ←` / `Ctrl + Shift + →` |
| estender até início ou fim do documento | `Ctrl + Shift + Home` / `Ctrl + Shift + End` |

O comando **Mostrar Tudo** exibe espaços, tabulações, marcas de parágrafo e quebras. Essas marcas ajudam a diagnosticar o documento e normalmente não são impressas.

---

## 6. Edição e Área de Transferência

### 6.1 Inserir, excluir, copiar, recortar e colar

| Comando | Efeito |
|---|---|
| **Copiar** | mantém a origem e envia uma cópia à Área de Transferência |
| **Recortar** | remove a seleção da origem e a envia à Área de Transferência |
| **Colar** | insere o conteúdo da Área de Transferência no destino |
| `Backspace` / `Delete` | exclui à esquerda / à direita do ponto de inserção |
| `Ctrl + Backspace` / `Ctrl + Delete` | normalmente exclui uma palavra à esquerda / à direita |

A Área de Transferência do Office pode manter vários itens quando ativada. Isso não significa armazenamento permanente após fechar aplicativos ou reiniciar o sistema.

### 6.2 Opções de colagem

| Opção | Resultado principal no desktop |
|---|---|
| **Manter Formatação de Origem** | conserva a formatação aplicada na origem |
| **Mesclar Formatação** | integra o texto ao estilo do destino e pode preservar ênfases diretas |
| **Manter Somente Texto** | remove formatação e objetos não textuais; uma tabela pode virar parágrafos |
| **Imagem** | cola uma representação não editável como texto |

O padrão de colagem pode ser configurado e variar conforme a origem, o destino e a plataforma.

### 6.3 Desfazer, refazer, repetir, localizar e substituir

- `Ctrl + Z` desfaz uma ação reversível;
- `Ctrl + Y` pode refazer uma ação desfeita;
- `F4` repete a última ação compatível;
- **Refazer** e **Repetir** não são sinônimos absolutos;
- **Localizar** procura ocorrências;
- **Substituir** troca texto, formatação ou itens especiais;
- **Substituir Tudo** exige cautela, pois uma regra ampla pode atingir ocorrências indevidas.

---

## 7. Formatação de caracteres e de parágrafos

### 7.1 Caractere

Formatação de caractere atua sobre letras, números, símbolos e espaços selecionados:

- família e tamanho da fonte;
- negrito, itálico, sublinhado e tachado;
- sobrescrito e subscrito;
- cor da fonte e realce;
- capitalização, efeitos e espaçamento de caracteres.

Aplicar propriedades diretamente é **formatação direta**. `Ctrl + Barra de espaços`, no Word para Windows, remove formatação manual de caracteres sem apagar o texto. O **Pincel de Formatação** copia formatação, não o conteúdo; um duplo clique normalmente o mantém ativo para vários destinos.

### 7.2 Parágrafo

Uma marca de parágrafo armazena propriedades do parágrafo. Por isso, um comando pode afetar todo o parágrafo mesmo sem selecionar todas as palavras.

| Recurso | Efeito |
|---|---|
| **alinhamento** | posição horizontal das linhas: esquerda, centro, direita ou justificado |
| **recuo esquerdo/direito** | desloca o bloco em relação às margens |
| **primeira linha** | desloca apenas a primeira linha |
| **deslocado ou pendente** | mantém a primeira linha e recua as seguintes |
| **entre linhas** | distância vertical dentro do parágrafo |
| **antes/depois** | distância vertical entre parágrafos |
| **bordas e sombreamento** | acabamento aplicado ao texto, ao parágrafo ou à tabela, conforme o contexto |

Recuo não é margem; alinhamento justificado não é centralizado; espaçamento antes/depois é mais estruturado que inserir vários parágrafos vazios.

### 7.3 Controle de paginação do parágrafo

Opções como **manter linhas juntas**, **manter com o próximo**, **controle de linhas órfãs e viúvas** e **quebra de página antes** reduzem quebras manuais frágeis quando o conteúdo muda.

---

## 8. Tabulações, listas, estilos, temas e modelos

### 8.1 Tabulações

Uma parada de tabulação define uma posição de alinhamento: esquerda, central, direita, decimal ou barra, com preenchimento opcional. Tabulação não é sequência de espaços. Dentro de uma célula de tabela, `Tab` costuma avançar; `Ctrl + Tab` insere uma tabulação na célula.

### 8.2 Listas

O Word cria listas com marcadores, numeração e vários níveis. Uma lista estruturada mantém sequência, nível e recuo. Digitar números manualmente não garante essa estrutura. Ao colar, pode ser necessário continuar a lista de destino, iniciar nova sequência ou preservar a origem.

### 8.3 Estilos

Um **estilo** é um conjunto nomeado e reutilizável de propriedades de caractere e/ou parágrafo. Ele favorece:

- padronização;
- alteração centralizada;
- navegação por títulos;
- geração de sumário automático;
- acessibilidade estrutural.

Texto grande e em negrito não se torna automaticamente um título estrutural. Ao aplicar **Título 1**, **Título 2** e outros níveis, o Word reconhece hierarquia. Para atualizar um estilo com base em uma seleção formatada, o grupo **Estilos** está na guia **Página Inicial**, não na guia Arquivo.

### 8.4 Tema e modelo

- **tema:** coordena cores, fontes e efeitos gerais do documento;
- **estilo:** formata tipos específicos de conteúdo;
- **modelo:** fornece uma base reutilizável de estrutura, estilos, tema e elementos.

Tema, estilo e modelo não são sinônimos.

---

## 9. Layout, bordas, quebras e seções

### 9.1 Margens, orientação, papel e colunas

Na guia **Layout**, o usuário encontra margens, orientação, tamanho do papel, colunas e quebras. Configurações podem valer para todo o documento, uma seção ou deste ponto em diante, conforme o comando e a seleção.

Colunas de texto organizam o fluxo em faixas, como em boletins. Elas não são células de tabela.

### 9.2 Tipos de quebra

| Recurso | Efeito |
|---|---|
| **quebra de linha** (`Shift + Enter`) | muda de linha sem iniciar novo parágrafo |
| **quebra de página** (`Ctrl + Enter`) | inicia a página seguinte na mesma seção |
| **quebra de coluna** | envia o conteúdo seguinte à próxima coluna |
| **quebra de seção** | cria um limite para configurações independentes |

Tipos de quebra de seção incluem **Próxima Página**, **Contínua**, **Página Par** e **Página Ímpar**.

Para deixar somente uma página intermediária em paisagem, a solução usual é isolá-la com quebras de seção antes e depois e aplicar a orientação à seção intermediária. Uma simples quebra de página não cria independência de layout.

### 9.3 Borda de página não é qualquer borda

| Recurso | Objeto atingido | Local típico |
|---|---|---|
| borda de texto ou parágrafo | seleção ou parágrafo | Página Inicial → Parágrafo → Bordas |
| borda de célula ou tabela | células ou tabela | Design da Tabela |
| **Borda da Página** | documento ou seção | Design → Plano de Fundo da Página → Bordas da Página |

A **Borda da Página** é aplicada por seção. Para colocar borda em uma única página intermediária, isole essa página em sua própria seção e escolha o alcance adequado na caixa **Bordas e Sombreamento**.

---

## 10. Cabeçalhos, rodapés e números de página

Cabeçalhos ocupam a região superior; rodapés, a inferior. Podem conter texto, imagens, campos, data e numeração.

Opções importantes:

- primeira página diferente;
- páginas pares e ímpares diferentes;
- posição em relação à borda;
- vínculo com a seção anterior;
- formato e início da numeração.

Ao criar uma nova seção, o cabeçalho ou rodapé pode permanecer **Vinculado ao Anterior**. Desativar o vínculo permite conteúdo independente naquela seção. Isso não apaga o cabeçalho da seção anterior.

Número de página é normalmente um **campo**. Pode usar algarismos, romanos ou letras e pode continuar ou reiniciar por seção. Digitar números manualmente não cria paginação automática.

---

## 11. Tabelas

Tabelas organizam conteúdo em linhas, colunas e células. Depois de inserida, a estrutura pode ser alterada.

Operações comuns:

- inserir ou excluir linhas, colunas e células;
- mesclar ou dividir células;
- ajustar largura e altura;
- distribuir linhas ou colunas;
- alinhar o conteúdo na célula;
- aplicar bordas, sombreamento e estilos;
- repetir a linha de cabeçalho em páginas seguintes;
- converter texto em tabela ou tabela em texto, quando o recurso estiver disponível.

Na navegação padrão:

- `Tab` avança para a próxima célula;
- `Shift + Tab` retorna;
- `Tab` na última célula pode criar uma nova linha;
- `Ctrl + Tab` insere tabulação dentro da célula.

**Layout da Tabela** concentra tamanho e estrutura; **Design da Tabela** concentra aparência. Tabela do Word não é planilha do Excel: cálculos são limitados e não substituem fórmulas e funções de planilha.

---

## 12. Imagens, formas e acessibilidade dos objetos

Objetos podem ficar:

- **Em linha com o texto:** comportam-se como caracteres dentro do parágrafo;
- **flutuantes:** usam opções de disposição, como Quadrado, Próximo, Superior e Inferior, Atrás ou Na Frente do Texto.

A **âncora** associa um objeto flutuante a um parágrafo. Mover ou excluir o parágrafo pode afetar a posição do objeto, conforme a configuração.

**Redimensionar** muda largura e altura; **recortar** oculta partes da imagem; **comprimir** pode reduzir resolução e tamanho do arquivo. Para acessibilidade:

- imagens informativas precisam de texto alternativo significativo;
- objetos puramente decorativos devem ser marcados como decorativos quando possível;
- tabelas devem ter cabeçalhos identificáveis e estrutura simples;
- links precisam de texto descritivo;
- informação não deve depender apenas de cor.

O Verificador de Acessibilidade ajuda, mas não substitui revisão humana.

---

## 13. Campos, sumário e referências

### 13.1 Campos

Campos exibem resultados automáticos, como número de página, data, legenda, sumário e referência cruzada. O resultado visível e o código do campo são coisas diferentes. `F9`, no Word para Windows, atualiza os campos selecionados.

### 13.2 Sumário automático

O sumário automático é construído a partir de estilos de título ou níveis estruturais configurados. Depois de alterar títulos, páginas ou estrutura, atualize:

- somente os números de página, quando a hierarquia não mudou;
- a tabela inteira, quando títulos foram adicionados, removidos ou renomeados.

Sumário manual é texto comum e não acompanha a estrutura automaticamente.

### 13.3 Notas, legendas, referências cruzadas e hiperlinks

- **nota de rodapé:** aparece no fim da página;
- **nota de fim:** aparece no fim do documento ou da seção;
- **legenda:** identifica figura, tabela ou outro objeto com rótulo e numeração;
- **referência cruzada:** aponta para um elemento do próprio documento;
- **hiperlink:** aponta para página, arquivo, endereço ou local do documento.

Digitar um número sobrescrito não cria uma nota vinculada; digitar “Figura 1” manualmente não produz uma legenda automática.

---

## 14. Mala direta

A **Mala Direta** gera vários documentos personalizados a partir de um modelo comum e de uma fonte de dados.

### 14.1 Componentes

| Componente | Função |
|---|---|
| **documento principal** | contém texto, layout e elementos comuns |
| **fonte de dados** | contém registros e campos, como nome, cargo e endereço |
| **campos de mesclagem** | marcam onde os dados variáveis serão inseridos |
| **filtro e seleção de destinatários** | define quais registros participarão |
| **visualização de resultados** | permite conferir a mesclagem antes da saída |
| **Concluir e Mesclar** | gera documentos, imprime ou envia, conforme o tipo escolhido |

### 14.2 Fluxo seguro

1. escolher o tipo, como cartas, envelopes, etiquetas ou mensagens;
2. selecionar ou criar a lista de destinatários;
3. inserir campos de mesclagem;
4. filtrar, ordenar e visualizar resultados;
5. concluir a mesclagem somente após conferir registros e layout.

Visualizar resultados não gera, por si só, todos os documentos finais. A fonte de dados não é o documento principal, e um campo de mesclagem não é texto fixo.

---

## 15. Revisão, comentários e alterações controladas

### 15.1 Editor e idioma de revisão

O Editor analisa ortografia, gramática e, conforme versão e licença, refinamentos de estilo. `F7` inicia a verificação no Word para Windows. O resultado depende do idioma atribuído ao texto. Um sublinhado é uma sugestão, não prova infalível de erro. Alterar o idioma de revisão não traduz o documento.

Se o usuário mandou o Word ignorar ocorrências e deseja reavaliá-las, pode usar **Arquivo → Opções → Revisão de Texto → Verificar Documento Novamente**, conforme a versão.

### 15.2 Comentários versus Controlar Alterações

| Comentários | Controlar Alterações |
|---|---|
| registram observações e discussões | registra inserções, exclusões, movimentações e formatação |
| podem ser respondidos ou resolvidos | revisões precisam ser aceitas ou rejeitadas |
| não substituem diretamente o texto | representam propostas de edição |

Ocultar marcações não remove revisões. Desativar o controle impede novas marcações, mas não resolve as já existentes. **Aceitar** incorpora a alteração; **Rejeitar** descarta a proposta. A opção **Imprimir Marcação** afeta a saída, não limpa o arquivo.

---

## 16. Compartilhamento, coautoria e proteção

Coautoria depende de local, formato, versão e permissões compatíveis. Compartilhar um link para um arquivo em ambiente compatível permite trabalhar no mesmo documento; enviar um anexo normalmente cria cópias independentes.

O histórico de versões depende do serviço de armazenamento e não deve ser presumido para qualquer arquivo local.

Mecanismos de proteção não são equivalentes:

| Recurso | Efeito principal |
|---|---|
| senha para abrir | criptografa o documento no desktop compatível |
| restringir edição | limita tipos de alteração permitidos |
| marcar como final | sinaliza intenção; não é criptografia robusta |

Senha perdida pode não ser recuperável. O Word para a Web tem limitações para criar ou editar certas proteções.

---

## 17. Impressão e PDF

`Ctrl + P` abre a visualização e as configurações de impressão no Word para Windows. Verifique:

- impressora ou saída em PDF;
- página atual, seleção, intervalo ou impressão personalizada;
- número de cópias;
- frente e verso, quando suportado;
- papel, orientação, margens, escala e páginas por folha;
- inclusão ou não de marcações de revisão.

Para imprimir, por exemplo, somente as páginas 3 a 9 de um documento, use o intervalo em **Impressão Personalizada**. Página atual, seleção e intervalo são opções distintas.

Exportar ou salvar como PDF cria outro arquivo. Alterações posteriores no DOCX não atualizam automaticamente o PDF já gerado.

---

## 18. Atalhos: memorize com contexto

Combinações como `Ctrl + C`, `Ctrl + X`, `Ctrl + V`, `Ctrl + Z`, `Ctrl + P`, `Ctrl + Enter`, `Shift + Enter`, `F7` e `F9` são recorrentes. Já atalhos formados por letras localizadas — abrir, salvar, selecionar tudo, negrito e sublinhado — podem divergir entre interface pt-BR, interface inglesa, Word para a Web, macOS, layout de teclado e personalização.

Quando a letra for decisiva, uma questão tecnicamente segura deve indicar **aplicativo, plataforma, idioma e ausência de personalização**. Sem essa delimitação, prefira identificar o comando pela guia, pelo objeto e pelo efeito.

---

## 19. Casos resolvidos

### 19.1 Uma única página em paisagem

Uma tabela larga precisa ficar em paisagem, mas as páginas anterior e posterior devem permanecer em retrato. Insira uma quebra de seção antes e outra depois da página e aplique paisagem somente à seção intermediária.

### 19.2 Borda em uma página intermediária

Borda da Página atua por seção. Isole a página com quebras de seção, abra **Design → Bordas da Página** e defina o alcance na caixa Bordas e Sombreamento.

### 19.3 Cabeçalho diferente em um anexo

Crie uma seção para o anexo, abra o cabeçalho e desative **Vincular ao Anterior** antes de substituir o conteúdo.

### 19.4 Texto copiado da Web sem poluir estilos

Use **Manter Somente Texto** para descartar formatação e objetos. Se for necessário conservar parte da ênfase direta, avalie **Mesclar Formatação**.

### 19.5 Sumário desatualizado

Se apenas as páginas mudaram, atualize números. Se títulos foram incluídos ou renomeados, atualize a tabela inteira e confirme se os estilos de título estão aplicados.

### 19.6 Documento final ainda contém revisões

Escolher **Nenhuma Marcação** apenas altera a visualização. Antes da publicação, aceite ou rejeite revisões, trate comentários e confira se **Imprimir Marcação** está desativado quando a saída não deve exibi-las.

### 19.7 Cartas personalizadas

Prepare o documento principal, conecte a lista, insira campos, filtre destinatários, visualize cada registro e só então conclua a mesclagem.

---

## 20. Pegadinhas de prova

- Word é aplicativo; DOCX é arquivo.
- Backstage trata do arquivo e da aplicação; não é grupo de formatação cotidiana.
- Zoom não muda fonte nem impressão.
- Salvar não é sempre Salvar como.
- Compatível não significa preservação integral.
- Copiar mantém a origem; recortar a remove do local.
- Manter Somente Texto não preserva objetos e estilos da origem.
- Formatação de caractere não é formatação de parágrafo.
- Recuo não é margem.
- Espaçamento entre linhas não é espaçamento antes/depois.
- Tabulação não é sequência de espaços.
- Estilo não é tema nem modelo.
- Texto grande e negrito não é automaticamente título estrutural.
- Quebra de linha não inicia novo parágrafo.
- Quebra de página não cria nova seção.
- Borda de parágrafo não é Borda da Página.
- Borda da Página atua por seção.
- Colunas de texto não são tabela.
- Design da Tabela não é Layout da Tabela.
- Número digitado não é campo de número de página.
- Tabela do Word não é planilha do Excel.
- Recortar imagem não é redimensionar.
- Comentário não é alteração controlada.
- Ocultar marcação não aceita nem rejeita revisão.
- Desativar o controle não remove revisões existentes.
- Visualizar mala direta não conclui a mesclagem.
- Compartilhar link não é anexar cópia.
- Marcar como final não equivale a criptografar.
- PDF gerado não se atualiza quando o DOCX muda.
- Atalho pt-BR não deve ser tratado como universal.

---

## 21. Método para resolver questões

1. **Ambiente:** desktop, Web, Windows, macOS, versão e idioma.
2. **Objeto:** caractere, parágrafo, lista, seção, tabela, objeto, campo ou arquivo.
3. **Guia:** localize a família de comandos adequada.
4. **Alcance:** seleção, parágrafo, seção ou documento inteiro.
5. **Efeito real:** diferencie visualização, estrutura, conteúdo e saída.
6. **Formato:** DOCX, DOC, ODT, RTF, TXT ou PDF.
7. **Dependências:** permissões, armazenamento, idioma de revisão, vínculo entre seções e compatibilidade.
8. **Absolutos:** desconfie de “sempre”, “qualquer versão”, “remove definitivamente” e “funciona igual na Web”.

## Referências

- CEBRASPE. [Edital nº 1 do concurso TCE-MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Conteúdo programático de Competências Digitais e Informática Aplicada ao Setor Público, item 2.2. Publicado em 6 jul. 2026; acesso em 27 jul. 2026.
- MICROSOFT. [Tarefas básicas no Word](https://support.microsoft.com/pt-br/office/tarefas-b%C3%A1sicas-no-word-87b3243c-b0bf-4a29-82aa-09a681999fdc). Criação, edição, salvamento, revisão e impressão; acesso em 27 jul. 2026.
- MICROSOFT. [Atalhos de teclado do Word](https://support.microsoft.com/pt-br/office/atalhos-de-teclado-do-word-95ef89dd-7142-4b50-afb2-f762f663ceb2). Plataformas, comandos e ressalvas de teclado; acesso em 27 jul. 2026.
- MICROSOFT. [Controlar a formatação ao colar texto](https://support.microsoft.com/pt-br/office/controlar-a-formata%C3%A7%C3%A3o-ao-colar-texto-20156a41-520e-48a6-8680-fb9ce15bf3d6). Opções de colagem e conflitos de estilo; acesso em 27 jul. 2026.
- MICROSOFT. [Diferenças entre ODT e DOCX](https://support.microsoft.com/pt-br/office/diferen%C3%A7as-entre-o-formato-de-texto-opendocument-odt-e-o-formato-do-word-docx-d9d51a92-56d1-4794-8b68-5efb57aebfdc). Compatibilidade de revisão, campos, tabelas e proteção; acesso em 27 jul. 2026.
- MICROSOFT. [Comparação entre Word para a Web e desktop](https://support.microsoft.com/pt-br/office/compara%C3%A7%C3%A3o-de-recursos-word-word-para-a-web-vs-desktop-3e863ce3-e82c-4211-8f97-5b33c36c55f8). Diferenças de recursos; acesso em 27 jul. 2026.
- MICROSOFT. [Adicionar uma borda a uma página](https://support.microsoft.com/pt-br/word/training/add-a-border-to-a-page). Borda por seção e alcance; acesso em 27 jul. 2026.
- MICROSOFT. [Inserir um sumário](https://support.microsoft.com/pt-br/office/inserir-um-sum%C3%A1rio-882e8564-0edb-435e-84b5-1d8552ccf0c0). Estilos de título e atualização; acesso em 27 jul. 2026.
- MICROSOFT. [Usar mala direta para personalizar cartas](https://support.microsoft.com/pt-br/office/usar-mala-direta-para-personalizar-cartas-d7686bb1-3077-4af3-926b-8c825e9505a3). Documento principal, fonte de dados e mesclagem; acesso em 27 jul. 2026.
- MICROSOFT. [Controlar Alterações no Word](https://support.microsoft.com/pt-br/office/controlar-altera%C3%A7%C3%B5es-no-word-197ba630-0f5f-4a8e-9a77-3712475e806a). Registro, exibição, aceitação, rejeição e impressão de revisões; acesso em 27 jul. 2026.
- MICROSOFT. [Verificador de Acessibilidade](https://support.microsoft.com/pt-br/office/improve-accessibility-with-the-accessibility-checker-a16f6de0-2f39-4a2b-8bd8-5ad801426c7f). Erros, avisos e revisão humana; acesso em 27 jul. 2026.
- FGV CONHECIMENTO. [Prova e gabaritos do concurso TJ-AP 2024](https://conhecimento.fgv.br/concursos/tjap23). Questões sobre borda da página, Pincel de Formatação e colagem; acesso em 27 jul. 2026.
- FGV CONHECIMENTO. [Concurso do Ministério Público do Estado do Rio de Janeiro 2025](https://conhecimento.fgv.br/concursos/mprj2025). Provas e gabaritos definitivos de Técnico e Analista da área administrativa; acesso em 27 jul. 2026.
- FGV CONHECIMENTO. [Concurso da Assembleia Legislativa do Tocantins 2024](https://conhecimento.fgv.br/concursos/aleto/1). Prova e gabarito definitivo de Técnico Legislativo — Assistência Administrativa; acesso em 27 jul. 2026.
