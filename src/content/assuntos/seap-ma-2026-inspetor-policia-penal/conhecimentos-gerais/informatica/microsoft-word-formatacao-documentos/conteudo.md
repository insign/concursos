---
schemaVersion: 1
title: "Microsoft Word: formatação e estrutura de documentos"
description: "Formatação de fonte e parágrafo, bordas e sombreamento, listas e tabulações, cabeçalhos e rodapés, paginação, configuração de página, imagens, formas e tabelas no Microsoft Word."
order: 42
storageId: "seap-u042"
---

# Microsoft Word: formatação e estrutura de documentos

Um documento pode parecer simples na tela e ainda conter objetos com regras diferentes. A pergunta que mais economiza erros é: **o comando atua no caractere, no parágrafo, na página/seção ou em um objeto inserido?**

Considere um relatório hipotético: o título precisa de fonte própria; o corpo, de recuo e espaçamento; uma página do anexo deve ficar em paisagem; uma imagem precisa contornar o texto; e uma tabela deve distribuir dados em linhas e colunas. Cada tarefa exige identificar primeiro o objeto e o alcance da mudança.

| Alvo | Exemplos de propriedades |
|---|---|
| caractere | fonte, tamanho, cor, negrito, itálico, sublinhado, efeitos |
| parágrafo | alinhamento, recuos, espaçamentos, bordas, sombreamento, listas, tabulações |
| seção/página | margens, orientação, tamanho do papel, cabeçalho, rodapé, numeração, borda de página |
| imagem ou forma | tamanho, posição, disposição do texto, alinhamento, ordem e agrupamento |
| tabela | linhas, colunas, células, dimensões, bordas, sombreamento e mesclagem |

O edital exige o **Word do Microsoft Office** sem indicar uma edição específica. Os nomes e a posição exata de comandos podem variar entre Word para Microsoft 365, Word 2024, versões anteriores e Word para a Web. Em prova, **a versão e o ambiente informados no enunciado prevalecem**.

## 1. Fonte e parágrafo: a diferença que organiza a formatação

**Fonte** é a aparência dos caracteres. Família tipográfica, tamanho, cor, negrito, itálico, sublinhado, tachado, sobrescrito, subscrito, contorno e sombra pertencem à formatação do texto. Alterar uma dessas propriedades não muda, por si, a margem da página nem o alinhamento do parágrafo.

O **parágrafo** é o bloco encerrado por uma marca de parágrafo. Mesmo que ocupe várias linhas na tela, continua sendo um único parágrafo. Suas propriedades mais cobradas são:

- **alinhamento:** esquerda, centro, direita ou justificado;
- **recuo esquerdo/direito:** desloca o bloco em relação à área de texto;
- **primeira linha:** desloca apenas o início do parágrafo;
- **recuo deslocado ou pendente:** deixa a primeira linha mais à esquerda que as seguintes;
- **espaçamento entre linhas:** regula a distância entre linhas do mesmo parágrafo;
- **espaçamento antes/depois:** separa parágrafos sem criar linhas vazias artificiais.

**Margem não é recuo.** A margem delimita a área de texto da página ou seção; o recuo move o parágrafo dentro dessa área. Da mesma forma, justificar distribui as linhas entre os limites disponíveis, mas não altera as margens.

O **Pincel de Formatação** copia propriedades de formatação para outro trecho. Ele não copia o conteúdo. Se a intenção incluir propriedades de parágrafo, a seleção de origem precisa abranger o parágrafo de modo adequado, inclusive sua marca final quando necessário.

## 2. Bordas e sombreamento: contorno e preenchimento

Uma **borda** cria linhas ao redor ou em lados do alvo; **sombreamento** preenche seu fundo. Antes de escolher o comando, identifique o alcance.

Em **Página Inicial → Parágrafo**, o menu de bordas atende texto e parágrafos. A caixa **Bordas e Sombreamento** permite definir estilo, cor, largura e o alvo da aplicação. O sombreamento de palavra ou parágrafo funciona como preenchimento de fundo; não deve ser confundido com uma borda.

A **borda de página** é outro recurso, em **Design → Bordas da Página**. Ela é aplicada por seção. Se apenas uma página intermediária precisar de moldura própria, normalmente é necessário isolá-la em uma seção. Já bordas e sombreamento de células pertencem às ferramentas da tabela.

> **Pegadinha:** borda de parágrafo, borda de tabela e borda de página podem ter aparência parecida, mas atingem objetos diferentes.

## 3. Marcadores, numeração e tabulações

Uma lista com **marcadores** organiza itens sem impor sequência numérica. A lista **numerada** administra uma sequência; a lista **multinível** acrescenta hierarquia entre níveis. O Word pode continuar ou reiniciar a numeração e controlar recuos dos níveis. Digitar números manualmente não equivale, por si só, a criar uma lista estruturada.

Uma **parada de tabulação** é uma posição de alinhamento horizontal. Pressionar a tecla Tab avança o conteúdo até a próxima parada configurada; não significa inserir uma quantidade fixa de espaços.

As paradas mais comuns são:

- **esquerda:** o texto cresce para a direita;
- **central:** o texto se distribui em torno da posição;
- **direita:** o texto cresce para a esquerda;
- **decimal:** alinha números pelo separador decimal;
- **barra:** desenha uma linha vertical na posição, sem posicionar o texto.

A régua pode ser usada para visualizar e ajustar recuos e tabulações. Em prova, não confunda **tabulação**, que alinha conteúdo dentro da área de texto, com **margem**, que delimita a área da página.

## 4. Configuração de página, seções, cabeçalhos e paginação

A guia **Layout** reúne propriedades como margens, orientação, tamanho do papel, colunas e quebras. **Retrato** usa a página vertical; **paisagem**, horizontal.

Uma **quebra de página** apenas força o conteúdo seguinte a começar em outra página. Uma **quebra de seção** cria uma fronteira que permite configurações diferentes em partes do mesmo documento. Isso é decisivo quando, por exemplo, somente uma página do anexo deve ficar em paisagem.

As quebras de seção mais conhecidas são:

- **Próxima Página:** inicia a nova seção na página seguinte;
- **Contínua:** inicia outra seção sem necessariamente mudar de página;
- **Página Par/Ímpar:** começa na próxima página da paridade escolhida.

Ao mudar orientação, margens ou outras propriedades, confira o **alcance da aplicação**: documento inteiro, seção ou trecho a partir de determinado ponto.

**Cabeçalho** é a área recorrente superior; **rodapé**, a inferior. Podem conter texto, imagens e número de página. Uma nova seção pode manter **Vincular ao Anterior** ativo, reutilizando o cabeçalho ou rodapé da seção precedente. Para torná-lo independente, desative o vínculo correspondente antes de editar.

O número automático de página é um **campo**, isto é, uma instrução cujo resultado é calculado pelo Word. A numeração pode continuar ou reiniciar conforme a seção. **Desvincular o cabeçalho ou rodapé não reinicia automaticamente a numeração**: são controles diferentes.

## 5. Imagens e formas: inserir, dimensionar e organizar

Imagens e formas são objetos inseridos no documento. Depois da inserção, a prova costuma explorar três decisões: **tamanho**, **relação com o texto** e **posição em relação a outros objetos**.

Uma imagem **Em linha com o texto** participa do fluxo do parágrafo como se fosse um caractere. Nas disposições flutuantes, o texto pode contornar o objeto, ficar apenas acima e abaixo, ou o objeto pode aparecer atrás ou na frente do texto. O objeto flutuante possui uma **âncora**, vínculo estrutural com um parágrafo.

Não confunda operações:

- **redimensionar:** muda largura e altura exibidas;
- **recortar:** muda a área visível da imagem;
- **girar:** altera a orientação do objeto;
- **alinhar/distribuir:** posiciona objetos em relação à página, margens ou outros objetos;
- **trazer para frente/enviar para trás:** altera a ordem de sobreposição.

As **formas** também podem receber preenchimento, contorno e efeitos. Duas ou mais formas/imagens compatíveis podem ser **agrupadas** para mover, girar ou redimensionar o conjunto como uma unidade; isso não funde seus conteúdos em um novo objeto.

## 6. Tabelas: estrutura e aparência não são a mesma coisa

Uma tabela é formada por **linhas**, **colunas** e **células**. Depois de inserida, sua estrutura continua editável: é possível acrescentar ou remover linhas/colunas, alterar dimensões e reorganizar células.

As ferramentas contextuais separam duas ideias:

- **Layout da Tabela:** estrutura — inserir/excluir, largura, altura, distribuição, AutoAjuste, mesclar e dividir células;
- **Design da Tabela:** aparência — estilos, bordas e sombreamento.

**Mesclar células** combina células selecionadas em uma só. **Dividir células** cria subdivisões dentro da seleção. Ajustar largura de coluna e altura de linha não transforma a tabela em planilha; ela continua sendo uma estrutura do Word.

O **AutoAjuste** pode adequar a largura ao conteúdo ou à janela. Distribuir linhas ou colunas uniformemente é diferente de mesclá-las: distribuição altera dimensões; mesclagem altera a estrutura.

## 7. Como eliminar alternativas em prova

Quando o enunciado descreve uma ação, percorra este roteiro:

1. **Qual é o objeto?** caractere, parágrafo, seção/página, imagem/forma ou tabela.
2. **Qual propriedade mudou?** aparência, posição, alcance, estrutura ou preenchimento.
3. **Até onde a mudança deve valer?** seleção, parágrafo, seção ou documento.
4. **O comando proposto atua nesse mesmo objeto?**

Exemplos de eliminações rápidas:

- “recuo altera margem da página” → falso: são níveis diferentes;
- “quebra de página cria configuração independente” → falso: quem separa configurações é a seção;
- “Design da Tabela altera quantidade de linhas” → em regra, falso: estrutura fica em Layout da Tabela;
- “recortar imagem é redimensionar” → falso: um muda a área visível; o outro, as dimensões;
- “desvincular cabeçalho reinicia paginação” → falso: vínculo e formato da numeração são controles distintos.

A lógica central é sempre a mesma: **objeto → propriedade → alcance → efeito**.