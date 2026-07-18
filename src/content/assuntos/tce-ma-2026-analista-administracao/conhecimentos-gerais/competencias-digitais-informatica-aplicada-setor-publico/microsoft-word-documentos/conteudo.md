---
schemaVersion: 1
title: "Microsoft Word: documentos e formatação de texto"
description: Criação, edição, formatação, estruturação, revisão, colaboração, acessibilidade, impressão e compatibilidade de documentos no Microsoft Word.
order: 21
storageId: microsoft-word-documentos
---

## 1. Recorte do assunto e referência de versão

O edital reúne editores de texto, planilhas e apresentações no Microsoft Office. Este assunto cobre somente o **Microsoft Word e a formatação de documentos**. Fórmulas, funções, gráficos de planilha e apresentações pertencem aos assuntos seguintes.

Como o edital não informa uma versão, a referência principal é o **Word desktop atual para Windows**, especialmente o Word para Microsoft 365 e o Word 2024. Conceitos estáveis também se aplicam ao Word 2021. Quando o comportamento depende do Word para a Web, do idioma da interface, do layout de teclado, do formato do arquivo ou de uma configuração, essa condição é indicada.

Essa delimitação evita quatro generalizações frequentes em prova:

- Word desktop e Word para a Web não possuem todos os mesmos recursos;
- um arquivo aberto pelo Word não preserva necessariamente todos os recursos ao mudar de formato;
- atalhos de letras podem variar com o idioma da interface;
- aparência e posição de comandos podem mudar entre versões e personalizações.

---

## 2. Editor de texto, documento e interface

O **Microsoft Word** é um processador de texto. Ele permite criar, editar, formatar, revisar, compartilhar, imprimir e exportar documentos. O aplicativo não deve ser confundido com o arquivo: o Word é o programa; `relatorio.docx` é um documento que pode ser aberto por ele.

### 2.1 Elementos principais

| Elemento | Função |
|---|---|
| **barra de título** | identifica o documento e a janela; pode mostrar estado de salvamento e compatibilidade |
| **Barra de Ferramentas de Acesso Rápido** | reúne comandos frequentes, como Salvar, e pode ser personalizada |
| **Faixa de Opções** | organiza comandos em guias e grupos |
| **guias contextuais** | aparecem quando um objeto, como tabela ou imagem, está selecionado |
| **área do documento** | espaço de edição e visualização do conteúdo |
| **réguas** | auxiliam recuos, margens aparentes e tabulações quando exibidas |
| **barra de status** | informa dados como página, contagem de palavras, idioma e zoom, conforme configuração |
| **painel de navegação** | pesquisa conteúdo e navega por títulos, páginas ou resultados disponíveis |

Guias comuns incluem **Arquivo, Página Inicial, Inserir, Design, Layout, Referências, Correspondências, Revisão, Exibição** e, conforme a instalação, **Ajuda**. Suplementos ou políticas podem acrescentar guias.

### 2.2 Faixa de Opções e Backstage

A **Faixa de Opções** concentra comandos de trabalho no documento. A guia **Página Inicial**, por exemplo, reúne Área de Transferência, Fonte, Parágrafo, Estilos e Edição.

A guia **Arquivo** abre o modo de exibição **Backstage**, voltado ao arquivo e ao aplicativo, com operações como:

- criar, abrir, salvar e salvar como;
- imprimir e exportar;
- compartilhar;
- consultar informações e propriedades;
- acessar opções da aplicação.

Pressionar `Alt` ou `F10` ativa as Dicas de Tecla da Faixa de Opções. As letras exibidas dependem do idioma e da versão da interface.

### 2.3 Modos de exibição e zoom

Os modos de exibição alteram a forma de trabalhar, não o conteúdo armazenado por si mesmos.

| Modo | Uso típico |
|---|---|
| **Layout de Impressão** | mostra páginas, margens, cabeçalhos e aparência próxima da impressão |
| **Modo de Leitura** | reduz distrações para leitura |
| **Layout da Web** | apresenta o documento como página contínua para tela |
| **Estrutura de Tópicos** | organiza e move níveis estruturais de títulos |
| **Rascunho** | privilegia edição de texto e pode ocultar elementos de layout |

O **zoom** apenas amplia ou reduz a visualização na tela. Ele não muda o tamanho da fonte nem o tamanho impresso.

---

## 3. Criar, abrir, salvar e converter

### 3.1 Documento em branco e modelo

Um documento pode começar em branco ou a partir de um **modelo**. O modelo oferece estrutura, estilos, temas e elementos previamente configurados. Usar um modelo não impede a edição posterior.

### 3.2 Salvar e Salvar como

No primeiro salvamento, o usuário escolhe nome, local e formato. Depois disso:

- **Salvar** atualiza o documento no arquivo e local atuais;
- **Salvar como** permite criar outro arquivo, alterar nome, local ou formato;
- **AutoSave**, quando disponível em ambiente compatível, grava alterações automaticamente, mas não substitui a compreensão de versão, local e compartilhamento.

Salvar uma cópia com outro nome não renomeia necessariamente o arquivo original: pode criar um segundo arquivo independente.

### 3.3 Formatos importantes

| Extensão/formato | Uso e cautela |
|---|---|
| `.docx` | formato padrão moderno do Word; preserva ampla variedade de recursos |
| `.doc` | formato binário legado; pode ativar Modo de Compatibilidade e limitar recursos atuais |
| `.odt` | formato OpenDocument Text; interoperável, mas sem paridade integral com DOCX |
| `.rtf` | Rich Text Format; preserva formatação básica e parte dos objetos, com menos recursos do Word |
| `.txt` | texto simples; perde formatação, objetos, estilos e estrutura avançada |
| `.pdf` | formato de layout fixo para distribuição e impressão; não é o formato editável padrão do Word |

O Word desktop oferece mais opções de formato que o Word para a Web. Na comparação atual da Microsoft, o Word para a Web salva em DOCX, PDF ou ODT; afirmações sobre RTF e TXT devem especificar o aplicativo desktop.

### 3.4 Compatibilidade não é equivalência

Abrir ou salvar em outro formato pode preservar o texto e ainda alterar recursos. Ao salvar DOCX como ODT, a documentação da Microsoft registra, entre outras limitações:

- proteção e criptografia do documento não são preservadas;
- alterações controladas podem ser aceitas ao salvar;
- temas não têm suporte integral;
- legendas podem perder numeração automática;
- quebras de seção contínuas podem perder propriedades;
- tabelas com mais de 64 colunas não têm suporte;
- alguns campos ou recursos são convertidos em texto simples.

Portanto, **abrir com sucesso** não significa **preservar integralmente** formatação, automação ou segurança.

### 3.5 Modo de Compatibilidade

Um documento criado em versão anterior pode abrir em **Modo de Compatibilidade**. O usuário pode continuar trabalhando com limitações para preservar compatibilidade ou converter o documento para usar recursos atuais. Converter deve ser uma decisão consciente, especialmente quando outras pessoas dependem do formato antigo.

---

## 4. Navegação e seleção

O ponto de inserção indica onde o próximo caractere será digitado. Navegar move esse ponto; selecionar delimita o conteúdo que receberá uma ação.

### 4.1 Seleção pelo teclado

| Ação | Atalho no Word desktop para Windows |
|---|---|
| estender por caractere | `Shift + ←/→` |
| selecionar por palavra | `Ctrl + Shift + ←/→` |
| selecionar até início/fim da linha | `Shift + Home/End` |
| selecionar até início/fim do documento | `Ctrl + Shift + Home/End` |
| selecionar tudo no Word desktop pt-BR padrão | `Ctrl + T` |

No Word desktop em interface inglesa e no Word para a Web, `Ctrl + A` costuma selecionar tudo. No Word desktop pt-BR padrão, `Ctrl + A` abre documento e `Ctrl + T` seleciona tudo. A plataforma e o idioma devem constar do enunciado.

### 4.2 Navegação

- `Ctrl + Home`: início do documento;
- `Ctrl + End`: fim do documento;
- `Ctrl + ←/→`: palavra anterior ou seguinte;
- `Ctrl + ↑/↓`: parágrafo anterior ou seguinte;
- `Ctrl + G`: caixa **Ir para**, conforme o mapeamento atual documentado;
- `Ctrl + F` ou o comando localizado disponível: painel de navegação/pesquisa, conforme plataforma e idioma.

As marcas de formatação, exibidas pelo comando **Mostrar Tudo**, ajudam a diagnosticar espaços, tabulações, marcas de parágrafo e quebras. Elas normalmente não são impressas.

---

## 5. Edição e Área de Transferência

### 5.1 Inserir, excluir e substituir

Digitar insere caracteres no ponto de inserção. `Backspace` exclui à esquerda; `Delete`, à direita. Com uma seleção ativa, digitar novo texto substitui a seleção.

`Ctrl + Backspace` e `Ctrl + Delete` excluem uma palavra à esquerda ou à direita, respectivamente, no comportamento padrão.

### 5.2 Copiar, recortar e colar

| Comando | Efeito |
|---|---|
| **Copiar** (`Ctrl + C`) | envia uma cópia da seleção à Área de Transferência e mantém o original |
| **Recortar** (`Ctrl + X`) | envia a seleção à Área de Transferência e a remove do local original |
| **Colar** (`Ctrl + V`) | insere o conteúdo da Área de Transferência no destino |

A Área de Transferência do Office pode manter vários itens quando ativada. Isso não significa que todo conteúdo copiado permanece indefinidamente após fechar aplicativos ou reiniciar o sistema.

### 5.3 Opções de colagem

Ao colar conteúdo formatado no Word desktop, o aplicativo pode oferecer:

| Opção | Resultado principal |
|---|---|
| **Manter Formatação de Origem** | preserva a formatação aplicada ao conteúdo copiado |
| **Mesclar Formatação** | adota o estilo do parágrafo de destino e conserva parte da ênfase direta |
| **Manter Somente Texto** | descarta formatação e objetos não textuais; tabelas podem virar parágrafos |
| **Imagem** | em versões compatíveis, cola uma representação não editável como texto |

O comportamento padrão do desktop pode ser configurado separadamente para colagem no mesmo documento, entre documentos, com conflito de estilos ou a partir de outros programas. No Word para a Web, as opções e o comportamento dependem também do navegador e não incluem necessariamente o conjunto completo do desktop.

### 5.4 Desfazer, refazer e repetir

- `Ctrl + Z`: desfaz a ação anterior quando ela pode ser revertida;
- `Ctrl + Y`: refaz uma ação desfeita, quando possível;
- `F4`: repete o último comando ou ação compatível.

Refazer e repetir não são conceitos idênticos. Refazer restaura uma ação desfeita; repetir executa novamente uma ação compatível.

### 5.5 Localizar, substituir e Ir para

**Localizar** procura ocorrências. **Substituir** pode trocar texto, formatação ou itens especiais. **Substituir Tudo** exige cautela: uma regra ampla pode alterar ocorrências que deveriam permanecer.

No Word desktop pt-BR tradicional, os atalhos localizados são `Ctrl + L` para Localizar e `Ctrl + U` para Substituir. Na interface inglesa e no Word para a Web, são comuns `Ctrl + F` e `Ctrl + H`. A documentação localizada da Microsoft possui inconsistências internas; em prova, a versão, a plataforma e o idioma declarados prevalecem.

---

## 6. Formatação de caracteres

A formatação de **caractere** atua sobre letras, números, símbolos e espaços selecionados. Exemplos:

- família e tamanho da fonte;
- negrito, itálico e sublinhado;
- tachado, sobrescrito e subscrito;
- cor da fonte e realce;
- efeitos e espaçamento de caracteres;
- alteração entre maiúsculas e minúsculas.

### 6.1 Formatação direta e limpeza

Aplicar negrito diretamente é **formatação direta**. Aplicar um estilo é outra estratégia: reúne propriedades nomeadas e reutilizáveis.

No Word para Windows:

- `Ctrl + Barra de espaços` remove formatação manual de caracteres;
- `Shift + F3` alterna capitalizações disponíveis;
- no desktop pt-BR padrão, `Ctrl + N`, `Ctrl + I` e `Ctrl + S` aplicam negrito, itálico e sublinhado;
- na interface inglesa, os atalhos correspondentes são `Ctrl + B`, `Ctrl + I` e `Ctrl + U`.

Limpar formatação não apaga o texto. Também não equivale a aplicar o estilo Normal em toda situação.

### 6.2 Pincel de Formatação

O **Pincel de Formatação** copia formatação, não o conteúdo. Um clique normalmente aplica a uma seleção; duplo clique mantém o pincel ativo para vários destinos até ser desativado.

---

## 7. Formatação de parágrafos

Uma marca de parágrafo delimita o parágrafo e armazena propriedades de parágrafo. Mesmo sem selecionar todo o texto, comandos de parágrafo podem afetar o parágrafo em que está o cursor.

### 7.1 Alinhamento

| Alinhamento | Efeito |
|---|---|
| **à esquerda** | alinha à margem esquerda e deixa a direita irregular |
| **centralizado** | posiciona as linhas em torno do centro horizontal |
| **à direita** | alinha à margem direita e deixa a esquerda irregular |
| **justificado** | ajusta espaçamento para alinhar as duas margens, salvo particularidades da última linha |

No Word desktop pt-BR padrão: `Ctrl + Q` alinha à esquerda, `Ctrl + E` centraliza, `Ctrl + R` alinha à direita e `Ctrl + J` justifica.

Justificar não centraliza o texto e não altera as margens da página.

### 7.2 Recuos

O recuo modifica a posição horizontal do parágrafo em relação às margens:

- **esquerdo** e **direito** deslocam o bloco;
- **primeira linha** desloca apenas a primeira linha;
- **deslocado ou pendente** mantém a primeira linha e recua as seguintes.

Recuo não deve ser produzido por uma sequência de espaços. A régua e a caixa de diálogo Parágrafo permitem configuração consistente.

### 7.3 Espaçamento

Há duas categorias distintas:

- **entre linhas:** simples, 1,5, duplo ou valores personalizados;
- **antes/depois do parágrafo:** espaço vertical entre parágrafos.

Pressionar `Enter` repetidamente para produzir distância vertical cria parágrafos vazios; o método estruturado é configurar espaçamento antes ou depois.

Atalhos comuns do Word para Windows: `Ctrl + 1` para simples, `Ctrl + 2` para duplo e `Ctrl + 5` para 1,5.

### 7.4 Bordas, sombreamento e controle de paginação

Bordas e sombreamento podem ser aplicados a texto, parágrafo ou tabela, conforme a seleção e o comando. Opções de parágrafo também podem controlar:

- manter linhas juntas;
- manter com o próximo;
- controle de linhas órfãs/viúvas;
- quebra de página antes.

Esses recursos são mais robustos que inserir quebras manuais em cada alteração de conteúdo.

---

## 8. Tabulações, listas, estilos e temas

### 8.1 Tabulações

Uma **parada de tabulação** define uma posição de alinhamento. Pode ser à esquerda, centralizada, à direita, decimal ou barra, com preenchimento opcional.

Tabulação não é sequência de espaços. Dentro de uma célula de tabela, `Tab` normalmente avança para outra célula; `Ctrl + Tab` insere o caractere de tabulação na célula.

### 8.2 Listas

O Word cria listas:

- com marcadores;
- numeradas;
- em vários níveis.

Uma lista automática mantém estrutura, recuos e sequência. Digitar manualmente números não cria necessariamente uma lista estruturada. Ao colar itens, o usuário pode continuar a lista de destino, iniciar nova lista ou preservar a origem.

### 8.3 Estilos

Um **estilo** é um conjunto nomeado de propriedades de caractere e/ou parágrafo. Ele permite:

- padronização;
- alteração centralizada;
- navegação por títulos;
- construção de sumário automático;
- estrutura acessível.

Deixar um texto grande e em negrito não o transforma automaticamente em título estrutural. Aplicar **Título 1**, **Título 2** ou outro nível apropriado cria a hierarquia usada por recursos automáticos.

### 8.4 Temas

O **tema** coordena cores, fontes e efeitos do documento. Tema e estilo não são sinônimos:

- o tema fornece um sistema visual geral;
- o estilo define a formatação reutilizável de elementos específicos.

Ao salvar em ODT, temas não são preservados integralmente.

---

## 9. Quebras, seções e layout de página

### 9.1 Tipos de quebra

| Recurso | Atalho/efeito |
|---|---|
| **quebra de linha** | `Shift + Enter`; muda de linha sem iniciar novo parágrafo |
| **quebra de página** | `Ctrl + Enter`; inicia a página seguinte sem criar nova seção |
| **quebra de coluna** | envia o conteúdo seguinte à próxima coluna |
| **quebra de seção** | cria limite estrutural para configurações diferentes |

Uma quebra de página não permite, sozinha, mudar orientação, margens ou cabeçalho apenas para uma parte. Para isso, usa-se uma **seção** adequadamente delimitada.

Tipos de quebra de seção incluem próxima página, contínua, página par e página ímpar. A seção contínua começa no mesmo fluxo de página; os demais tipos impõem condições de paginação.

### 9.2 Configuração de página

Na guia **Layout**, podem ser configurados:

- margens;
- orientação retrato ou paisagem;
- tamanho do papel;
- colunas;
- quebras;
- recuos e espaçamento de parágrafo.

Essas configurações podem valer para todo o documento, uma seção ou, conforme a seleção e o comando, deste ponto em diante. Alterar orientação de uma única página normalmente exige seções ao redor dela.

### 9.3 Colunas

Colunas de texto organizam o fluxo vertical em faixas, como em boletins. Não são tabelas. Uma quebra de coluna controla onde o texto passa à coluna seguinte.

---

## 10. Cabeçalhos, rodapés e números de página

Cabeçalhos ocupam a região superior; rodapés, a inferior. Podem conter texto, imagens, campos, data e numeração.

Opções importantes:

- primeira página diferente;
- páginas pares e ímpares diferentes;
- vínculo com a seção anterior;
- posição em relação à borda;
- formato e início da numeração.

Ao criar nova seção, o cabeçalho ou rodapé pode permanecer **Vinculado ao Anterior**. Desativar o vínculo permite conteúdo independente naquela seção. Isso não apaga necessariamente o conteúdo anterior.

Números de página são campos. Podem ser formatados em algarismos, letras ou romanos e reiniciados por seção. Digitar manualmente o mesmo número em cada página não produz paginação automática.

---

## 11. Tabelas

Tabelas organizam conteúdo em **linhas, colunas e células**. Podem ser inseridas pela grade, por caixa de diálogo ou por conversão entre texto e tabela no desktop compatível.

Operações comuns:

- inserir ou excluir linhas, colunas e células;
- mesclar e dividir células;
- ajustar largura e altura;
- distribuir linhas ou colunas;
- alinhar conteúdo dentro da célula;
- aplicar bordas, sombreamento e estilos;
- repetir linha de cabeçalho em páginas seguintes;
- classificar dados textuais ou numéricos quando suportado.

Na navegação padrão:

- `Tab` avança para a próxima célula;
- `Shift + Tab` retorna;
- `Tab` na última célula pode criar nova linha;
- `Ctrl + Tab` insere tabulação dentro da célula.

Tabela não é planilha. O Word pode realizar cálculos limitados em tabelas, mas fórmulas e funções de planilha pertencem ao recorte do Microsoft Excel e não são objeto deste assunto.

---

## 12. Imagens, formas e quebra de texto

Imagens, formas, WordArt e caixas de texto são objetos inseridos no documento. Guias contextuais oferecem formatação quando o objeto está selecionado.

### 12.1 Em linha e flutuante

- **Em linha com o texto:** o objeto comporta-se como um caractere no parágrafo;
- **com quebra de texto:** o objeto pode flutuar e o texto se ajusta ao redor conforme a opção escolhida.

Opções comuns incluem Quadrado, Próximo, Através, Superior e Inferior, Atrás do Texto e Na Frente do Texto. A disponibilidade e o nome podem variar.

A **âncora** associa um objeto flutuante a um parágrafo. Mover ou excluir o parágrafo âncora pode afetar a posição ou a existência do objeto, conforme configuração.

### 12.2 Tamanho e recorte

Redimensionar com preservação de proporção evita deformação. **Recortar** oculta partes da imagem sem ser sinônimo de redimensionar. Comprimir imagens pode reduzir o arquivo e, conforme a opção, descartar áreas cortadas ou diminuir resolução.

Para acessibilidade, imagens informativas devem possuir texto alternativo adequado; imagens puramente decorativas devem ser marcadas como decorativas quando o recurso estiver disponível.

---

## 13. Referências e elementos automáticos

### 13.1 Sumário automático

O sumário automático é construído a partir dos **estilos de título** ou de níveis configurados. Depois de alterar títulos, páginas ou estrutura, é necessário atualizar o sumário.

As opções de atualização costumam distinguir:

- somente números de página;
- tabela inteira.

Um sumário manual é apenas texto preenchido pelo usuário e não acompanha automaticamente a estrutura.

### 13.2 Notas de rodapé e notas de fim

- **nota de rodapé:** aparece no fim da página;
- **nota de fim:** aparece no fim do documento ou da seção.

O Word administra marcas e numeração. Digitar um número sobrescrito manualmente não cria uma nota vinculada.

### 13.3 Legendas, referências cruzadas e hiperlinks

**Legendas** identificam figuras, tabelas ou outros objetos com rótulo e numeração. Como campos, podem ser atualizadas após mudanças.

**Referências cruzadas** apontam para elementos como títulos, figuras ou notas. **Hiperlinks** apontam para páginas, arquivos, endereços ou locais do documento; `Ctrl + K` abre sua inserção no Word para Windows.

No comparativo atual da Microsoft, legendas são recurso do desktop, enquanto hiperlinks e sumário também estão disponíveis no Word para a Web.

### 13.4 Campos

Campos exibem resultados automáticos, como número da página, data, sumário e referências. `F9` atualiza os campos selecionados. O resultado visível e o código do campo não são a mesma coisa.

---

## 14. Revisão de texto e colaboração editorial

### 14.1 Editor, ortografia e gramática

O **Editor Microsoft** analisa ortografia, gramática e, conforme versão e licença, refinamentos de estilo. `F7` abre a verificação no Word para Windows.

O resultado depende do idioma de revisão atribuído ao texto. Um sublinhado é uma sugestão do mecanismo, não prova infalível de erro. O usuário pode aceitar, ignorar ou adicionar termo ao dicionário, conforme o caso.

Alterar o idioma de revisão não traduz o documento.

### 14.2 Comentários

Comentários registram observações e discussões sem substituir diretamente o texto. Eles possuem ciclo próprio de resposta e resolução em versões compatíveis.

Comentários não são parte do mecanismo de Controlar Alterações. Excluir um comentário não aceita nem rejeita uma alteração controlada.

### 14.3 Controlar Alterações

Com **Controlar Alterações** ativo, o Word registra inserções, exclusões, movimentações e mudanças de formatação, conforme as opções. Cada revisão pode ser aceita ou rejeitada.

Modos de exibição como Marcação Simples, Todas as Marcações, Nenhuma Marcação e Original mudam a visualização. **Ocultar marcações não as remove**. Para incorporar ou descartar definitivamente as revisões, é necessário aceitar ou rejeitar.

Desativar o controle interrompe o registro de novas alterações, mas não remove as que já existem. O controle pode ser bloqueado para impedir desativação sem senha.

Ao imprimir, a opção **Imprimir Marcação** determina se as revisões visíveis entram na saída; desmarcá-la não apaga as revisões do arquivo.

---

## 15. Compartilhamento, proteção e acessibilidade

### 15.1 Compartilhamento e coautoria

Coautoria em tempo real depende de documento salvo e compartilhado em local e formato compatíveis, como OneDrive ou SharePoint, além de versões e permissões adequadas.

Compartilhar um link não é o mesmo que anexar uma cópia:

- no link, pessoas autorizadas podem trabalhar no mesmo arquivo;
- no anexo, cada destinatário pode receber uma cópia independente.

O histórico de versões permite consultar ou restaurar estados anteriores quando o local de armazenamento oferece o recurso. Ele não deve ser presumido para qualquer arquivo local.

### 15.2 Proteção

No Word desktop, é possível criptografar documento com senha e restringir edição. São mecanismos diferentes:

- **senha para abrir** protege a leitura por criptografia;
- **restrição de edição** limita tipos de alteração permitidos;
- **marcar como final** sinaliza intenção, mas não equivale a proteção criptográfica robusta.

A Microsoft alerta que senha perdida pode não ser recuperável. O Word para a Web não cria nem edita a proteção por senha: conforme o mecanismo aplicado, o documento pode abrir somente para leitura ou pode nem abrir, exigindo o aplicativo desktop.

### 15.3 Acessibilidade

O **Verificador de Acessibilidade** identifica erros, avisos e recomendações; não substitui revisão humana. Boas práticas incluem:

- usar estilos de título em ordem lógica;
- fornecer texto alternativo significativo;
- marcar objetos decorativos adequadamente;
- usar texto de link descritivo;
- não depender apenas de cor;
- garantir ordem de leitura e contraste;
- identificar cabeçalhos de tabelas e evitar estruturas excessivamente complexas;
- definir o idioma correto do texto.

Uma aparência visual de título não oferece, sozinha, a estrutura necessária a leitores de tela e ao painel de navegação.

---

## 16. Impressão e PDF

`Ctrl + P` abre as configurações e a visualização de impressão. Antes de imprimir, convém verificar:

- impressora ou saída em PDF;
- intervalo de páginas;
- número de cópias;
- impressão em um ou dois lados, conforme dispositivo;
- orientação, papel e margens;
- páginas por folha e escala;
- presença ou ausência de marcações de revisão.

Imprimir somente a página atual é diferente de imprimir a seleção ou um intervalo. A sintaxe de intervalo pode permitir páginas isoladas e sequências, conforme a interface.

Exportar ou salvar como PDF busca preservar o layout para distribuição. O PDF resultante é outro arquivo; mudanças posteriores no DOCX não atualizam automaticamente um PDF já produzido.

No Word para a Web, a impressão gera uma visualização em PDF antes do envio à impressora.

---

## 17. Atalhos: idioma e plataforma importam

### 17.1 Word desktop para Windows em português do Brasil

Considere o mapeamento padrão, sem personalização:

| Ação | Atalho pt-BR |
|---|---|
| abrir | `Ctrl + A` |
| novo documento | `Ctrl + O` |
| salvar | `Ctrl + B` |
| selecionar tudo | `Ctrl + T` |
| copiar / recortar / colar | `Ctrl + C` / `Ctrl + X` / `Ctrl + V` |
| negrito / itálico / sublinhado | `Ctrl + N` / `Ctrl + I` / `Ctrl + S` |
| esquerda / centro / direita / justificar | `Ctrl + Q` / `Ctrl + E` / `Ctrl + R` / `Ctrl + J` |
| desfazer / refazer | `Ctrl + Z` / `Ctrl + Y` |
| imprimir | `Ctrl + P` |
| inserir hiperlink | `Ctrl + K` |
| quebra de linha / página | `Shift + Enter` / `Ctrl + Enter` |
| Editor | `F7` |
| Salvar como | `F12` |
| mostrar/ocultar marcas | `Ctrl + Shift + 8` |
| Controlar Alterações | `Ctrl + Shift + E` |

### 17.2 Por que não decorar uma tabela universal

Na interface inglesa, comandos conhecidos mudam: `Ctrl + O` abre, `Ctrl + N` cria novo, `Ctrl + S` salva, `Ctrl + A` seleciona tudo, `Ctrl + B` aplica negrito e `Ctrl + U` sublinha.

No Word para a Web, o navegador também pode interceptar atalhos. Além disso, atalhos podem ser personalizados no desktop. Questão tecnicamente adequada deve especificar **aplicativo, sistema, idioma e ausência de personalização** quando a letra for decisiva.

---

## 18. Situações práticas

### 18.1 Uma página em paisagem

Ana precisa deixar apenas uma tabela larga em paisagem. Ela insere quebras de seção antes e depois da página e aplica orientação paisagem à seção intermediária. Uma simples quebra de página não isolaria essa configuração.

### 18.2 Colagem sem poluir estilos

Bruno copia texto de uma página da Web. Para adotar a formatação do documento e eliminar objetos, usa **Manter Somente Texto**. Se precisasse conservar ênfases, poderia avaliar **Mesclar Formatação**.

### 18.3 Sumário desatualizado

Carla altera títulos e páginas, mas o sumário continua antigo. O sumário é um campo: precisa ser atualizado. Se novos títulos não aparecem, é necessário verificar os estilos e níveis aplicados.

### 18.4 Revisões apenas ocultas

Diego escolhe **Nenhuma Marcação** e acredita que limpou o documento. As alterações continuam armazenadas. Antes da versão final, ele deve aceitar ou rejeitar as revisões e tratar comentários.

### 18.5 Documento ODT

Erika salva um DOCX com alterações controladas e proteção em ODT. A abertura posterior do texto não comprova preservação: recursos sem suporte podem ser removidos ou convertidos.

### 18.6 Documento colaborativo

Fábio envia um DOCX como anexo a três pessoas. Surgem quatro cópias. Para editar um único arquivo com coautoria, ele deve usar local compatível, compartilhar o link e definir permissões.

---

## 19. Pegadinhas de prova

- Word é aplicativo; DOCX é arquivo.
- Faixa de Opções trabalha no documento; Backstage concentra operações do arquivo e da aplicação.
- Zoom não muda tamanho da fonte.
- Salvar não é sempre igual a Salvar como.
- PDF não é o formato editável padrão do Word.
- Compatível não significa idêntico.
- ODT pode perder recursos de revisão, proteção, temas e campos.
- Copiar mantém a origem; recortar a remove do local original.
- Manter Somente Texto descarta formatação e objetos não textuais.
- Refazer não é sinônimo absoluto de repetir.
- Formatação de caractere não é formatação de parágrafo.
- Justificar não é centralizar.
- Recuo não é margem nem espaçamento vertical.
- Tabulação não é sequência de espaços.
- Estilo não é tema.
- Texto grande e em negrito não é automaticamente um título estrutural.
- Quebra de linha não inicia novo parágrafo.
- Quebra de página não cria nova seção.
- Colunas de texto não são tabela.
- Cabeçalho de nova seção pode permanecer vinculado ao anterior.
- Número digitado manualmente não é campo de número de página.
- Tabela do Word não é planilha do Excel.
- Objeto em linha e objeto flutuante têm comportamentos diferentes.
- Sumário automático depende da estrutura e precisa ser atualizado.
- Nota de rodapé e nota de fim aparecem em locais diferentes.
- Comentário não é alteração controlada.
- Ocultar marcação não aceita nem rejeita revisão.
- Desativar Controlar Alterações não remove revisões existentes.
- Verificador ortográfico e de acessibilidade não substitui julgamento humano.
- Compartilhar link não é anexar cópia.
- Marcar como final não equivale a criptografar.
- Atalhos pt-BR do Word desktop não são iguais aos da interface inglesa ou da Web.

---

## 20. Método para resolver questões

1. **Identifique o ambiente:** desktop, Web, Windows, Mac ou versão indicada.
2. **Confira o idioma:** pt-BR ou inglês, especialmente em atalhos.
3. **Identifique o objeto:** caractere, parágrafo, seção, tabela, campo ou arquivo.
4. **Separe conteúdo de aparência:** zoom, modo de exibição e ocultação de marcações não removem conteúdo.
5. **Observe o formato:** DOCX, ODT, RTF, TXT ou PDF.
6. **Diferencie estrutura de improviso:** estilos, campos, listas e seções são preferíveis a formatação manual repetida.
7. **Procure dependências:** local de nuvem, permissão, idioma de revisão, vínculo entre seções ou compatibilidade.
8. **Rejeite absolutos:** “sempre preserva”, “qualquer versão”, “remove definitivamente” e “funciona igual na Web”.

## Referências

- CEBRASPE. [Edital nº 1 do concurso TCE-MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Conteúdo programático de Competências Digitais e Informática Aplicada ao Setor Público, item 2.2. Publicado em 6 jul. 2026; acesso em 18 jul. 2026.
- MICROSOFT. [Tarefas básicas no Word](https://support.microsoft.com/pt-br/office/tarefas-b%C3%A1sicas-no-word-87b3243c-b0bf-4a29-82aa-09a681999fdc). Criação, abertura, salvamento, Modo de Compatibilidade, revisão e impressão; aplica-se às versões indicadas na página. Acesso em 18 jul. 2026.
- MICROSOFT. [Atalhos de teclado do Word](https://support.microsoft.com/pt-br/office/atalhos-de-teclado-do-word-95ef89dd-7142-4b50-afb2-f762f663ceb2). Referência oficial para Word para Microsoft 365, Word 2024, Word 2021 e outras plataformas, com ressalvas de layout e inconsistências localizadas. Acesso em 18 jul. 2026.
- MICROSOFT. [Atalhos do menu Arquivo no Microsoft 365 para Windows](https://support.microsoft.com/pt-br/office/atalhos-de-teclado-para-o-menu-ficheiro-no-microsoft-365-para-windows-1c4b07af-be2e-4c19-8d33-c600a8904043). Referência oficial adicional para os comandos de arquivo e para as divergências do material localizado; acesso em 18 jul. 2026.
- MICROSOFT. [Atalhos pt-BR para selecionar tudo e aplicar negrito](https://learn.microsoft.com/pt-br/answers/questions/5579720/quais-os-atalhos-para-selecionar-todo-o-texto-e-co). Microsoft Q&A, confirmação para Word Microsoft 365 desktop em pt-BR, 9 out. 2025; acesso em 18 jul. 2026.
- MICROSOFT. [Controlar a formatação ao colar texto](https://support.microsoft.com/pt-br/office/controlar-a-formata%C3%A7%C3%A3o-ao-colar-texto-20156a41-520e-48a6-8680-fb9ce15bf3d6). Opções de colagem, conflitos de estilo e listas; acesso em 18 jul. 2026.
- MICROSOFT. [Diferenças entre o formato ODT e o formato DOCX](https://support.microsoft.com/pt-br/office/diferen%C3%A7as-entre-o-formato-de-texto-opendocument-odt-e-o-formato-do-word-docx-d9d51a92-56d1-4794-8b68-5efb57aebfdc). Matriz oficial de compatibilidade de texto, revisão, campos, tabelas, proteção e elementos gráficos; acesso em 18 jul. 2026.
- MICROSOFT. [Criar ou salvar um documento para versões anteriores do Word](https://support.microsoft.com/pt-br/office/criar-ou-salvar-um-documento-para-vers%C3%B5es-anteriores-do-word-8892a0fb-b3d3-4e0d-b5de-cb2cb730ef38). Formatos e compatibilidade; acesso em 18 jul. 2026.
- MICROSOFT. [Comparação de recursos entre Word para a Web e desktop](https://support.microsoft.com/pt-br/office/compara%C3%A7%C3%A3o-de-recursos-word-word-para-a-web-vs-desktop-3e863ce3-e82c-4211-8f97-5b33c36c55f8). Formatação, objetos, referências, colaboração, acessibilidade e segurança; acesso em 18 jul. 2026.
- MICROSOFT. [Inserir um sumário](https://support.microsoft.com/pt-br/office/inserir-um-sum%C3%A1rio-882e8564-0edb-435e-84b5-1d8552ccf0c0). Títulos, geração e atualização de sumário automático; acesso em 18 jul. 2026.
- MICROSOFT. [Inserir notas de rodapé e notas de fim](https://support.microsoft.com/pt-br/office/inserir-notas-de-rodap%C3%A9-e-notas-de-fim-no-word-61f3fb1a-4717-414c-9a8f-015a5f3ff4cb). Localização e gerenciamento das notas; acesso em 18 jul. 2026.
- MICROSOFT. [Controlar Alterações no Word](https://support.microsoft.com/pt-br/office/controlar-altera%C3%A7%C3%B5es-no-word-197ba630-0f5f-4a8e-9a77-3712475e806a). Registro, exibição, aceitação, rejeição, bloqueio e impressão de revisões; acesso em 18 jul. 2026.
- MICROSOFT. [Verificar gramática, ortografia e mais no Word](https://support.microsoft.com/pt-br/office/verificar-gram%C3%A1tica-ortografia-e-mais-no-word-0f43bf32-ccde-40c5-b16a-c6a282c0d251). Editor Microsoft e idiomas de revisão; acesso em 18 jul. 2026.
- MICROSOFT. [Coautoria em tempo real no Word](https://support.microsoft.com/pt-br/office/colaborar-em-documentos-do-word-com-a-coautoria-em-tempo-real-7dd3040c-3f30-4fdd-bab0-8586492a1f1d). Compartilhamento, locais compatíveis e colaboração; acesso em 18 jul. 2026.
- MICROSOFT. [Verificador de Acessibilidade](https://support.microsoft.com/pt-br/office/improve-accessibility-with-the-accessibility-checker-a16f6de0-2f39-4a2b-8bd8-5ad801426c7f). Erros, avisos e recomendações de acessibilidade; acesso em 18 jul. 2026.
- MICROSOFT. [Proteger um documento com senha](https://support.microsoft.com/pt-br/office/proteger-um-documento-com-uma-senha-05084cc3-300d-4c1a-8416-38d3e37d6826). Criptografia no desktop, limites no Word para a Web e cautela com perda de senha; acesso em 18 jul. 2026.
