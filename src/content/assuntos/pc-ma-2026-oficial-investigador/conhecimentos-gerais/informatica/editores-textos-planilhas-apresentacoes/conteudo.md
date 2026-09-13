---
schemaVersion: 1
title: Editores de textos, planilhas e apresentações
description: Operações essenciais em Word, Excel, PowerPoint, LibreOffice e Apache OpenOffice, com Writer, Calc e Impress, formatos e interoperabilidade.
order: 24
storageId: pc-u024
---

# Editores de textos, planilhas e apresentações

## 1. Três tipos de arquivo, três lógicas de trabalho

O item 3 do edital reúne três famílias de aplicativos:

| Finalidade | Microsoft Office | LibreOffice | Apache OpenOffice |
| --- | --- | --- | --- |
| editar documentos de texto | Word | Writer | Writer |
| editar planilhas | Excel | Calc | Calc |
| editar apresentações | PowerPoint | Impress | Impress |

A primeira distinção evita muitas pegadinhas: **aplicativo não é arquivo**. Word, Writer, Excel, Calc, PowerPoint e Impress são programas; o documento, a planilha ou a apresentação que você salva é um arquivo.

Também não confunda **abrir um formato** com **ter compatibilidade perfeita com todos os recursos desse formato**. Há <abbr title="capacidade de trocar arquivos entre programas diferentes">interoperabilidade</abbr> entre os conjuntos de aplicativos, mas documentos complexos podem exigir conferência após a conversão.

## 2. Formatos: reconheça a família antes de pensar no comando

No Microsoft Office moderno, os formatos mais associados a edição são:

- Word: `DOCX`;
- Excel: `XLSX`;
- PowerPoint: `PPTX`.

No LibreOffice e no Apache OpenOffice, os formatos OpenDocument mais importantes são:

- Writer: `ODT`;
- Calc: `ODS`;
- Impress: `ODP`.

<abbr title="OpenDocument Format">ODF</abbr> é a família OpenDocument. O Apache OpenOffice documenta `ODT`, `ODS` e `ODP` como extensões OpenDocument, e o LibreOffice também trabalha nativamente com essa família.

Já <abbr title="Portable Document Format">PDF</abbr> é, em regra, uma **saída de distribuição**: útil para preservar a apresentação do conteúdo ao compartilhar ou imprimir. Não o trate como substituto automático do arquivo-fonte usado para continuar editando o documento, a planilha ou a apresentação.

### 2.1 Salvar, Salvar como e Exportar

O mecanismo é mais importante que o nome exato do menu:

- **Salvar**: atualiza o arquivo corrente;
- **Salvar como**: permite criar outra versão, escolhendo nome, local e, quando disponível, formato;
- **Exportar**: gera uma saída destinada a outro formato ou finalidade, como <abbr title="Portable Document Format">PDF</abbr>.

No LibreOffice, a documentação recomenda manter uma versão no formato próprio antes de salvar em formato externo, porque alguns recursos de formatação podem se perder. O Apache OpenOffice também adverte que a conversão para formatos estrangeiros pode afetar recursos ou leiaute, sobretudo em documentos complexos.

> **Regra de prova:** “o arquivo abriu” não significa “todos os efeitos, macros, fontes, leiautes e recursos avançados permanecerão idênticos”.

## 3. Operações comuns às três famílias

Antes de decorar menus, reconheça a operação pedida:

1. criar, abrir e fechar arquivo;
2. selecionar conteúdo;
3. recortar, copiar e colar;
4. desfazer e refazer;
5. salvar ou salvar como;
6. imprimir;
7. exportar;
8. localizar e substituir, quando aplicável;
9. formatar o objeto selecionado.

A interface muda entre programas, versões, sistemas operacionais e idiomas. Um atalho ou caminho de menu só deve ser tratado como universal quando o enunciado ou a documentação realmente o sustenta.

## 4. Documentos de texto: Word e Writer

O objeto central é o **texto organizado em caracteres, parágrafos, páginas e elementos inseridos**.

### 4.1 Formatação de caractere × formatação de parágrafo

Uma alteração pode atingir somente caracteres selecionados ou o parágrafo como estrutura.

**Caractere**:
- fonte;
- tamanho;
- negrito;
- itálico;
- cor;
- sobrescrito ou subscrito.

**Parágrafo**:
- alinhamento;
- recuos;
- espaçamento;
- listas;
- tabulações;
- distância entre parágrafos.

A banca pode apresentar um efeito correto no lugar errado: aumentar o recuo de um parágrafo não é o mesmo que inserir espaços; aplicar negrito a uma palavra não altera o alinhamento do parágrafo.

### 4.2 Estilos: padrão reutilizável

Se dezenas de títulos devem ter o mesmo aspecto, formatar cada um manualmente é frágil. **Estilo** é um conjunto reutilizável de propriedades.

No Word, estilos são usados para padronizar títulos e outros elementos. No Writer, há categorias de estilo de caractere, parágrafo, página, lista, tabela e quadro.

O ganho é operacional: você aplica um padrão e, quando modifica o estilo, os trechos associados podem acompanhar a mudança.

### 4.3 Página, cabeçalho, rodapé e numeração

Documentos também possuem estrutura de página. Dependendo do aplicativo, ela envolve recursos como:

- tamanho e orientação;
- margens;
- cabeçalhos e rodapés;
- numeração de páginas;
- quebras;
- seções ou estilos de página.

No Writer, **estilos de página** controlam a organização da página e podem participar da numeração e da alternância de layouts. Não confunda estilo de página com estilo de caractere.

### 4.4 Tabelas, imagens e impressão

Word e Writer permitem inserir tabelas, imagens e outros objetos. Na prova, separe:

- **conteúdo** do objeto;
- **formatação** do objeto;
- **posição** e fluxo na página;
- **saída** para impressão ou <abbr title="Portable Document Format">PDF</abbr>.

O item do edital não exige transformar esta unidade em manual de mala direta, formulários ou automações avançadas. Esses recursos aparecem em doadores Microsoft, mas foram cortados aqui por menor retorno diante do recorte literal.

## 5. Planilhas: Excel e Calc

A lógica muda: agora o arquivo organiza dados em uma grade.

### 5.1 Pasta/documento, planilha, célula e intervalo

Os conceitos básicos são:

- arquivo de planilha: contém uma ou mais planilhas;
- **planilha**: grade de linhas e colunas;
- **célula**: encontro entre coluna e linha, como `A1`;
- **intervalo**: conjunto de células, como `A1:B2`.

O nome usado pela interface para o arquivo inteiro pode variar entre suítes e traduções. Em prova, observe o objeto concreto indicado pelo enunciado em vez de forçar equivalência terminológica palavra por palavra.

### 5.2 Valor, fórmula e aparência

Uma célula pode conter texto, número, data ou fórmula. Fórmulas normalmente começam por `=`.

Exemplo:

`=A1+7`

A fórmula usa o valor referenciado em `A1` e soma `7`.

**Valor não é formatação.** Mostrar `0,25` como `25%` muda a apresentação, não necessariamente o valor usado no cálculo. Cor, borda e formato numérico também não devem ser confundidos com alteração do conteúdo.

### 5.3 Referências relativas, absolutas e mistas

Esta é uma das maiores fontes de erro.

- `A1` — referência relativa;
- `$A$1` — linha e coluna absolutas;
- `$A1` — coluna fixa, linha relativa;
- `A$1` — linha fixa, coluna relativa.

Ao **copiar** uma fórmula, referências relativas se ajustam à nova posição. Referências absolutas permanecem fixas nos eixos marcados.

Exemplo:

- `A1 = 5`;
- `A2 = A1+7`;
- copiando a fórmula de `A2` para `A3`, a referência relativa passa a apontar para `A2`.

No LibreOffice Calc, a documentação também explicita o uso de `$` e a alternância de tipos de referência com `F4` no contexto documentado.

### 5.4 Funções, separadores e contexto

Funções resumem operações como soma, média, contagem e testes lógicos. Mas nomes localizados, separadores e disponibilidade podem variar conforme aplicativo, idioma e versão.

Por isso, quando a questão fornece uma fórmula concreta, trate **a sintaxe do ambiente indicado** como parte do enunciado. Não generalize automaticamente a grafia de uma função de uma suíte ou idioma para outra.

### 5.5 Ordenar, filtrar e formatar não são sinônimos

- **Ordenar**: reorganiza a sequência dos registros;
- **Filtrar**: restringe quais registros são exibidos segundo critérios;
- **Formatar**: altera a apresentação;
- **fórmula**: calcula ou produz um resultado.

Um filtro não significa, por si, apagar as linhas que ficaram ocultas. E formatação condicional não deve ser confundida com substituição automática do valor.

### 5.6 Gráficos e saída

Planilhas podem gerar gráficos a partir dos dados. O ponto de prova é reconhecer a relação entre:

- dados de origem;
- séries/categorias;
- tipo de gráfico;
- impressão;
- exportação.

Tabelas dinâmicas e ferramentas avançadas dos doadores Excel não foram aprofundadas: o edital cobra edição de planilhas, e o ganho por minuto é maior no domínio de células, fórmulas, referências, organização e saída.

## 6. Apresentações: PowerPoint e Impress

A apresentação é organizada em **slides** com objetos.

### 6.1 Slide, layout, tema e mestre

Não trate os termos como equivalentes:

- **slide**: uma página da apresentação;
- **layout**: organização de espaços reservados para conteúdo no slide;
- **tema**: conjunto visual de cores, fontes e efeitos;
- **mestre de slides**: nível usado para controlar padrões compartilhados por slides e layouts.

O nome exato dos painéis e comandos pode variar. O mecanismo permanece: existe o conteúdo local de um slide e existem padrões reutilizáveis que afetam vários slides.

### 6.2 Objetos e organização

Um slide pode conter:

- texto;
- imagens;
- formas;
- tabelas;
- gráficos;
- áudio e vídeo, conforme o ambiente.

Objetos podem ser alinhados, redimensionados, sobrepostos ou reordenados. A banca costuma explorar **qual objeto está selecionado** e **qual efeito o comando produz**.

### 6.3 Transição × animação

A distinção é simples e decisiva:

- **transição**: efeito da passagem de um slide para outro;
- **animação**: efeito aplicado a um objeto ou elemento dentro do slide.

No LibreOffice Impress, a ajuda oficial descreve a transição como efeito executado durante a passagem/exibição do slide. PowerPoint mantém distinção equivalente entre transições e animações.

### 6.4 Apresentação, notas e impressão

Além da edição do slide, é possível trabalhar com:

- modo de apresentação;
- notas do apresentador;
- folhetos;
- impressão;
- exportação.

As notas apoiam o apresentador e não são o conteúdo principal projetado do slide.

### 6.5 Um atalho que já apareceu em prova

Em questão oficial da <abbr title="Fundação Getulio Vargas">FGV</abbr> para o <abbr title="Instituto de Previdência Social do Município de Macaé">MACAEPREV</abbr>, `Ctrl+M` foi cobrado como comando de **novo slide** tanto no PowerPoint quanto no LibreOffice Impress, no ambiente daquela prova.

Isso **não autoriza** concluir que todos os atalhos sejam iguais entre as duas suítes. Memorize o fato documentado e continue verificando o contexto das demais questões.

## 7. LibreOffice e Apache OpenOffice: parecidos, mas não idênticos

O edital escreve literalmente **LibreOffice/Apache OpenOffice — Writer, Calc e Impress**. Portanto:

- LibreOffice e Apache OpenOffice são suítes distintas;
- ambas possuem Writer, Calc e Impress;
- ambas trabalham com formatos OpenDocument;
- semelhança de nome ou finalidade não garante identidade total de interface, versão, recurso ou atalho.

A documentação do Apache OpenOffice registra que arquivos `.odt`, `.ods` e `.odp` abrem, respectivamente, nos componentes adequados; também documenta abertura de arquivos do Word, Excel e PowerPoint quando associados ao OpenOffice.

O LibreOffice documenta abertura e salvamento de formatos Microsoft Office, mas também alerta para diferenças de conversão em documentos complexos.

## 8. Interoperabilidade: o teste de retorno

Quando um arquivo atravessa suítes, use este checklist:

1. **qual é o formato de origem?**
2. **qual aplicativo está abrindo o arquivo?**
3. **o conteúdo permanece editável?**
4. **o leiaute foi preservado?**
5. **há recursos específicos, macros (rotinas automatizadas), fontes ou objetos incorporados?**
6. **a saída final precisa voltar à suíte de origem?**

Se a resposta depender de fidelidade visual ou de recurso avançado, **abra e confira o resultado**. Não transforme compatibilidade de leitura em garantia absoluta.

## 9. Método de prova

1. Identifique a família: texto, planilha ou apresentação.
2. Identifique o aplicativo e a suíte.
3. Localize o objeto: caractere, parágrafo, página; célula, intervalo; slide, layout ou objeto.
4. Pergunte qual operação ocorre: editar, formatar, copiar, calcular, ordenar, filtrar, apresentar, salvar ou exportar.
5. Confira o efeito: mudou valor, aparência, posição, referência ou formato?
6. Observe versão, plataforma e idioma quando a questão mencionar atalhos ou menus.
7. Em conversão entre suítes, separe “abre/salva” de “preserva perfeitamente todos os recursos”.

## 10. Pegadinhas de alto retorno

| Atalho mental errado | Correção |
| --- | --- |
| aplicativo = arquivo | programa e arquivo são objetos diferentes |
| `ODT`, `ODS`, `ODP` são formatos Microsoft | pertencem à família <abbr title="OpenDocument Format">ODF</abbr> |
| <abbr title="Portable Document Format">PDF</abbr> é o arquivo-fonte ideal para editar | normalmente é saída de distribuição |
| estilo = formatação direta repetida | estilo é padrão reutilizável |
| aparência da célula = valor | formatação pode mudar sem alterar o valor |
| copiar fórmula mantém toda referência igual | referência relativa se ajusta |
| `$A$1` é relativa | linha e coluna estão fixas |
| filtrar = excluir | filtro restringe exibição segundo critérios |
| transição = animação | transição liga slides; animação atua em objetos |
| abrir formato de outra suíte = fidelidade perfeita | interoperabilidade exige conferir recursos complexos |
| um atalho vale em qualquer programa/versão | o contexto da questão prevalece |

> **Síntese:** acerte primeiro **objeto → operação → efeito → formato**. Essa sequência resolve mais questões do que decorar a posição de cada botão.
