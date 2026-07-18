---
schemaVersion: 1
title: "Microsoft Excel: planilhas, fórmulas, funções e gráficos"
description: Estrutura de planilhas, entrada e formatação de dados, fórmulas, referências, funções, tabelas, classificação, filtros, validação, gráficos, impressão e compatibilidade no Microsoft Excel.
order: 22
storageId: microsoft-excel-planilhas
---

## 1. Recorte do assunto e referência de versão

O edital reúne editores de texto, planilhas e apresentações no Microsoft Office. Este assunto cobre o **Microsoft Excel**, com ênfase em planilhas, fórmulas, funções e gráficos. A edição de documentos no Word pertence ao assunto anterior; a criação de apresentações no PowerPoint pertence ao assunto seguinte.

Como o edital não indica uma versão, a referência principal é o **Excel desktop atual para Windows**, especialmente o Excel para Microsoft 365 e o Excel 2024. Conceitos estáveis também se aplicam ao Excel 2021. Quando um comportamento depende do Excel para a Web, do idioma, dos separadores regionais, do formato do arquivo ou da versão que introduziu uma função, essa condição é indicada.

Quatro cuidados evitam generalizações comuns em prova:

- a pasta de trabalho é o arquivo; a planilha é uma folha contida nesse arquivo;
- o formato visual de uma célula não necessariamente altera o valor armazenado;
- nomes de funções e separadores podem variar com o idioma e a configuração regional;
- Excel desktop e Excel para a Web não oferecem todos os recursos com a mesma extensão.

---

## 2. Pasta de trabalho, planilha e células

### 2.1 Hierarquia básica

| Elemento | Conceito |
|---|---|
| **Excel** | aplicativo de planilha eletrônica |
| **pasta de trabalho** | arquivo que reúne uma ou mais planilhas |
| **planilha** | folha em grade formada por linhas e colunas |
| **linha** | conjunto horizontal identificado por número |
| **coluna** | conjunto vertical identificado por letra |
| **célula** | interseção entre uma linha e uma coluna |
| **intervalo** | conjunto de células, contíguas ou não |

A referência `B4` identifica a célula situada na coluna B e na linha 4. Um intervalo contíguo é escrito com dois-pontos: `B4:D10` abrange todas as células entre B4 e D10, inclusive.

A **célula ativa** é aquela selecionada para receber entrada ou edição. A caixa de nome pode mostrar sua referência, enquanto a barra de fórmulas exibe e permite editar o conteúdo da célula.

### 2.2 Interface essencial

| Elemento | Uso principal |
|---|---|
| **Faixa de Opções** | organiza comandos em guias e grupos |
| **caixa de nome** | mostra a referência da célula ativa e permite navegar para células ou intervalos |
| **barra de fórmulas** | mostra e edita valores e fórmulas |
| **cabeçalhos de linha e coluna** | identificam e permitem selecionar linhas e colunas inteiras |
| **guias de planilha** | alternam, inserem e organizam planilhas da pasta |
| **barra de status** | mostra estados e cálculos rápidos da seleção, conforme configuração |
| **alça de preenchimento** | copia ou estende valores, fórmulas e séries |

A interface pode mudar entre versões, plataformas e personalizações. O conceito do comando é mais estável que sua posição exata.

### 2.3 Conteúdo de uma célula

Uma célula pode conter, entre outros dados:

- texto;
- número;
- data ou hora;
- valor lógico, como `VERDADEIRO` ou `FALSO`;
- fórmula;
- erro resultante de fórmula.

Por padrão, uma fórmula começa com `=`. Ao digitar `=C2*D2`, a célula normalmente exibe o resultado, enquanto a barra de fórmulas mantém a expressão. Um texto que apenas parece uma fórmula, mas foi armazenado como texto, não é calculado.

### 2.4 Inserir, editar, limpar e excluir

- **Editar** altera o conteúdo existente da célula.
- **Limpar conteúdo** remove valor ou fórmula sem necessariamente remover a célula, o formato ou os comentários.
- **Excluir células, linhas ou colunas** desloca a estrutura restante conforme a opção escolhida.
- **Limpar formatação** remove a aparência, mas preserva o conteúdo.

Essas operações não são equivalentes. Apagar o conteúdo de `B3` deixa a célula na grade; excluir a célula pode deslocar outras células.

### 2.5 Preenchimento e séries

A alça de preenchimento pode:

- copiar um valor;
- copiar uma fórmula, ajustando referências relativas;
- continuar séries reconhecidas, como meses ou sequências numéricas;
- repetir padrões selecionados.

O resultado depende da seleção inicial e da opção de preenchimento. Arrastar uma única célula com o número `1` pode copiar o número; selecionar `1` e `2` antes de arrastar fornece ao Excel um padrão para continuar a sequência.

---

## 3. Criar, salvar e escolher o formato

### 3.1 Salvar e Salvar como

No primeiro salvamento, são definidos nome, local e formato. Depois:

- **Salvar** atualiza o arquivo atual;
- **Salvar como** permite mudar nome, local ou formato e pode criar outro arquivo;
- salvar em outro formato pode causar perda de recursos, ainda que o arquivo continue abrindo.

### 3.2 Formatos principais

| Extensão | Característica e cautela |
|---|---|
| `.xlsx` | formato padrão moderno; preserva dados, fórmulas, formatação e gráficos, mas não armazena macros VBA |
| `.xlsm` | pasta habilitada para macros; pode armazenar VBA |
| `.xls` | formato binário legado do Excel 97–2003; pode abrir em Modo de Compatibilidade e limitar recursos atuais |
| `.csv` | texto delimitado; representa somente a planilha ativa como texto e valores, sem a estrutura e os recursos completos da pasta |
| `.ods` | OpenDocument Spreadsheet; interoperável, mas sem equivalência integral com XLSX |

Salvar como CSV não preserva múltiplas planilhas, fórmulas editáveis, gráficos, objetos e formatação como uma pasta XLSX. O delimitador efetivamente usado pode depender da configuração regional e do processo de importação ou exportação, apesar do nome *comma-separated values*.

O formato ODS pode sofrer diferenças em tabelas, filtros, validação, gráficos, fórmulas e formatação. **Conseguir abrir** um arquivo não significa **preservar todos os recursos**.

### 3.3 Macros e navegador

Uma pasta `.xlsm` pode ser aberta no Excel para a Web, mas macros VBA não são executadas no navegador. O formato `.xlsx` não guarda VBA; salvar uma pasta com macros nesse formato exige atenção ao aviso de perda.

Arquivos `.xls` e `.csv` podem ser convertidos para `.xlsx` quando abertos no Excel para a Web. A conversão cria uma pasta editável no formato atual, mas não inventa recursos que o formato de origem não armazenava.

---

## 4. Formatação e apresentação dos dados

### 4.1 Valor armazenado e formato exibido

O formato numérico controla **como o valor aparece**, sem necessariamente alterar o valor usado nos cálculos.

Exemplos:

| Valor armazenado | Formato | Exibição possível |
|---:|---|---:|
| `1250` | moeda | `R$ 1.250,00` |
| `0,25` | porcentagem | `25%` |
| `0,375` | fração | `3/8` |
| número serial válido | data | `18/07/2026` |

Se a célula já contém `25` e apenas recebe o formato de porcentagem, a exibição tende a ser `2500%`, pois 25 equivale a 2.500 centésimos. Para representar 25%, o valor numérico é `0,25` ou a entrada direta é `25%`.

Exibir duas casas decimais não é o mesmo que substituir o valor armazenado por um número arredondado. Cálculos posteriores normalmente continuam usando a precisão armazenada.

### 4.2 Datas e horas

O Excel representa datas e horas válidas numericamente. A parte inteira corresponde ao dia no sistema de datas; a parte fracionária representa uma fração de 24 horas. Por isso, datas podem ser ordenadas, comparadas e usadas em cálculos quando são datas reais, não textos que apenas se parecem com datas.

A interpretação da entrada depende da localidade. `07/08/2026` pode ser interpretado de forma diferente em configurações que usam dia/mês ou mês/dia.

### 4.3 Formatação de célula

Recursos comuns incluem:

- fonte, tamanho, cor e efeitos;
- preenchimento e bordas;
- alinhamento horizontal e vertical;
- orientação e quebra automática de texto;
- formato de número;
- proteção associada à proteção da planilha.

**Mesclar células** combina a área visual selecionada e pode ser útil em títulos, mas dificulta classificação, filtragem, seleção e manipulação de dados tabulares. Para bases de dados, prefira uma linha por registro e uma coluna por campo, sem mesclas internas.

### 4.4 Formatação condicional

A formatação condicional aplica aparência quando uma regra é satisfeita. Pode destacar:

- valores maiores, menores, duplicados ou dentro de um intervalo;
- texto ou datas que atendam a um critério;
- barras de dados;
- escalas de cores;
- conjuntos de ícones;
- resultados de uma fórmula lógica.

Ela **não muda o valor da célula**. Uma despesa destacada em vermelho continua com o mesmo número. Regras sobrepostas obedecem à prioridade e às opções configuradas; por isso, o gerenciador de regras é relevante quando o resultado visual parece inesperado.

---

## 5. Fórmulas, operadores e referências

### 5.1 Estrutura de uma fórmula

Uma fórmula pode reunir:

- constantes, como `10`;
- referências, como `B2` ou `B2:B10`;
- operadores, como `+`, `-`, `*`, `/` e `^`;
- funções, como `SOMA`;
- parênteses para controlar a avaliação.

Exemplo:

```text
=SOMA(C2:C10)*(1-D1)
```

A fórmula soma `C2:C10` e multiplica o resultado por `1-D1`.

### 5.2 Operadores

| Categoria | Operadores | Exemplo |
|---|---|---|
| aritméticos | `+`, `-`, `*`, `/`, `^`, `%` | `=A2*B2` |
| comparação | `=`, `>`, `<`, `>=`, `<=`, `<>` | `=C2>=70` |
| concatenação | `&` | `=A2&" - "&B2` |
| referência | `:` e outros conforme contexto | `=SOMA(A2:A10)` |

O sinal `=` no início introduz a fórmula; dentro de uma expressão lógica, ele também compara igualdade.

### 5.3 Ordem de cálculo

Parênteses têm prioridade explícita. Sem parênteses, o Excel aplica sua precedência: operadores de referência, negação, porcentagem, exponenciação, multiplicação e divisão, adição e subtração, concatenação e comparações, dentro das regras de cada grupo.

Assim:

- `=2+3*4` resulta em `14`;
- `=(2+3)*4` resulta em `20`.

Quando a intenção puder ser ambígua, use parênteses. Eles tornam a fórmula mais segura e legível.

### 5.4 Referências relativas, absolutas e mistas

| Tipo | Exemplo | Comportamento ao copiar |
|---|---|---|
| relativa | `A1` | linha e coluna podem se ajustar |
| absoluta | `$A$1` | linha e coluna permanecem fixas |
| mista, coluna fixa | `$A1` | coluna A fixa; linha pode mudar |
| mista, linha fixa | `A$1` | linha 1 fixa; coluna pode mudar |

Considere quantidade em `C2`, preço unitário em `D2` e taxa em `H1`:

```text
=C2*D2*(1+$H$1)
```

Ao copiar a fórmula para a linha seguinte, `C2` e `D2` tornam-se `C3` e `D3`, enquanto `$H$1` permanece fixo.

No Excel desktop para Windows, `F4`, durante a edição de uma referência, alterna normalmente entre relativa, absoluta e as duas formas mistas. A tecla pode ter comportamento diferente conforme teclado, plataforma e estado da edição.

### 5.5 Referências a outras planilhas

Uma referência pode incluir o nome da planilha:

```text
='Parâmetros 2026'!B2
```

Nomes com espaços são delimitados por apóstrofos. Renomear, mover ou excluir planilhas e células pode afetar referências; o Excel atualiza muitas operações internas, mas referências excluídas podem gerar `#REF!`.

### 5.6 Copiar não é mover

Ao **copiar** uma fórmula, referências relativas se ajustam para a nova posição. Ao **mover** uma fórmula por recorte e colagem, o Excel procura preservar as referências apontadas pela fórmula. Questões de prova devem distinguir a operação realizada.

---

## 6. Cálculo, auditoria e erros

### 6.1 Cálculo automático e manual

No modo **Automático**, padrão usual, alterações em células precedentes provocam recálculo das fórmulas dependentes. O desktop também oferece:

- Automático, exceto para Tabelas de Dados;
- Manual.

No modo manual, resultados podem permanecer antigos até um recálculo. No Excel desktop para Windows:

- `F9` recalcula fórmulas alteradas e dependentes;
- `Shift + F9` recalcula a planilha ativa;
- `Ctrl + Alt + F9` força o recálculo das fórmulas nas pastas abertas.

No desktop, a opção de cálculo pode afetar as pastas abertas na mesma sessão. No Excel para a Web, a alteração se aplica à pasta aberta no navegador.

### 6.2 Dependentes, precedentes e referência circular

Uma célula **precedente** fornece dado para uma fórmula; uma célula **dependente** usa o resultado de outra. Ferramentas de auditoria ajudam a rastrear essas relações.

Há **referência circular** quando uma fórmula depende de si mesma, direta ou indiretamente, como `A1` contendo `=A1+1`. Sem uma intenção de cálculo iterativo devidamente configurada, isso é um problema de modelagem a corrigir, não uma forma comum de acumular valores.

### 6.3 Erros frequentes

| Resultado | Significado típico | Ação de diagnóstico |
|---|---|---|
| `#DIV/0!` | divisão por zero ou por célula vazia tratada como zero | verificar denominador e dados ausentes |
| `#N/D` | valor não encontrado ou indisponível | conferir chave, correspondência e fonte dos dados |
| `#NOME?` | nome de função, intervalo ou texto não reconhecido | conferir idioma, grafia e aspas |
| `#REF!` | referência inválida, frequentemente após exclusão | revisar células, linhas, colunas ou planilhas removidas |
| `#VALOR!` | tipo de argumento incompatível com a operação | identificar texto, espaços ou tipos inesperados |
| `#NÚM!` | número ou operação numérica inválida | conferir limites e argumentos |

Uma sequência de `#####` **não é, em regra, um erro de fórmula**. Pode indicar coluna estreita demais para exibir o valor formatado ou uma data/hora negativa. Aumentar a largura resolve o primeiro caso, mas não o segundo.

### 6.4 Tratamento não deve ocultar a causa

Substituir todo erro por zero pode esconder cadastro incompleto ou chave inexistente. Antes de tratar a apresentação, identifique se o erro representa:

- entrada ausente;
- referência quebrada;
- função ou separador incompatível;
- tipo de dado incorreto;
- valor legitimamente não encontrado.

---

## 7. Funções fundamentais

### 7.1 Idioma, argumentos e separadores

No Excel em português brasileiro, nomes como `SUM` e `IF` aparecem normalmente como `SOMA` e `SE`. O separador de argumentos mais comum em pt-BR é ponto e vírgula (`;`), pois a vírgula é usada como separador decimal. Essas escolhas podem mudar conforme idioma e configuração regional.

Uma função tem nome, parênteses e argumentos:

```text
=SOMA(B2:B10)
```

O assistente de funções e as dicas de tela mostram os argumentos esperados. Parênteses devem estar balanceados.

### 7.2 Agregação e estatística básica

| Função | Finalidade | Exemplo |
|---|---|---|
| `SOMA` | soma números e intervalos | `=SOMA(E2:E20)` |
| `MÉDIA` | calcula a média aritmética | `=MÉDIA(E2:E20)` |
| `MÍNIMO` | retorna o menor número | `=MÍNIMO(E2:E20)` |
| `MÁXIMO` | retorna o maior número | `=MÁXIMO(E2:E20)` |

Em referências, `MÉDIA` ignora células vazias e texto, mas inclui zeros. Portanto, uma célula vazia e uma célula com `0` não têm o mesmo efeito sobre a média.

### 7.3 Contagens

| Função | O que conta |
|---|---|
| `CONT.NÚM` | células com números, incluindo datas e horas válidas |
| `CONT.VALORES` | células não vazias, inclusive texto, erros e fórmulas que retornam `""` |
| `CONT.SE` | células que atendem a um critério |

Exemplos:

```text
=CONT.NÚM(C2:C100)
=CONT.VALORES(A2:A100)
=CONT.SE(F2:F100;"Pendente")
```

`CONT.SE` trabalha com um critério. Os curingas `*` e `?` podem representar, respectivamente, qualquer sequência e um caractere em critérios textuais. Para procurar os próprios caracteres curinga, usa-se o escape apropriado (`~`).

### 7.4 Decisão lógica com SE, E e OU

A função `SE` escolhe entre dois resultados:

```text
=SE(E2<=50000;"Dentro do limite";"Revisar")
```

Estrutura:

```text
=SE(teste_lógico;valor_se_verdadeiro;valor_se_falso)
```

`E` exige que todas as condições sejam verdadeiras:

```text
=SE(E(C2>=10;D2="Ativo");"Aprovar";"Revisar")
```

`OU` exige pelo menos uma condição verdadeira:

```text
=SE(OU(F2="Urgente";E2>100000);"Priorizar";"Fluxo normal")
```

Não confunda:

- `E(condição1;condição2)` só é verdadeiro quando todas são verdadeiras;
- `OU(condição1;condição2)` é verdadeiro quando pelo menos uma é verdadeira.

### 7.5 Soma e contagem condicionais

`SOMASE` soma valores associados a um critério:

```text
=SOMASE(B2:B100;"Saúde";E2:E100)
```

Ela testa `B2:B100` e soma os valores correspondentes de `E2:E100` quando o setor é Saúde.

`CONT.SE` conta ocorrências:

```text
=CONT.SE(E2:E100;">=50000")
```

Critérios com operadores são escritos como texto. Quando o limite está em outra célula, concatena-se o operador:

```text
=CONT.SE(E2:E100;">="&H1)
```

`SOMASE` e `CONT.SE` tratam um critério. Para vários critérios, existem funções específicas da família, mas elas não devem ser confundidas com a sintaxe das versões de um único critério.

### 7.6 PROCV

Sintaxe:

```text
=PROCV(valor_procurado;matriz_tabela;núm_índice_coluna;[procurar_intervalo])
```

Exemplo de correspondência exata:

```text
=PROCV(A2;Cadastro!$A$2:$D$500;4;FALSO)
```

Regras essenciais:

- procura o valor na **primeira coluna** da matriz;
- retorna um valor da própria primeira coluna ou de uma coluna à direita, indicada por número;
- `FALSO` ou `0` solicita correspondência exata;
- `VERDADEIRO`, `1` ou argumento omitido usa correspondência aproximada;
- na correspondência aproximada, a primeira coluna deve estar ordenada para resultado confiável;
- inserir ou remover colunas na matriz pode tornar o índice numérico inadequado.

`PROCV` não busca naturalmente à esquerda. Essa limitação é estrutural.

### 7.7 PROCX

`PROCX` separa a matriz pesquisada da matriz retornada:

```text
=PROCX(A2;Cadastro!A2:A500;Cadastro!D2:D500;"Não encontrado")
```

Vantagens principais:

- correspondência exata é o padrão;
- pode retornar valores à esquerda ou à direita;
- aceita resultado explícito quando não encontra a chave;
- não depende de um índice numérico de coluna dentro de uma matriz única.

Apesar dessas vantagens, `PROCX` não está disponível em todas as versões perpétuas antigas. Uma questão deve informar ou permitir inferir a versão. Em ambiente que exige compatibilidade com versões sem `PROCX`, `PROCV` continua relevante.

---

## 8. Organização e análise dos dados

### 8.1 Base tabular correta

Uma base de dados consistente costuma obedecer a estas regras:

- uma linha de cabeçalho;
- uma linha por registro;
- uma coluna por atributo;
- tipos de dados consistentes em cada coluna;
- ausência de linhas e colunas vazias no meio da base;
- ausência de células mescladas na área de dados;
- identificadores estáveis quando necessários.

Essas práticas facilitam fórmulas, classificação, filtros, tabelas e gráficos.

### 8.2 Intervalo e Tabela do Excel

Qualquer conjunto de células pode formar um intervalo. Uma **Tabela do Excel** é uma estrutura criada explicitamente, com recursos próprios:

- cabeçalhos e filtros integrados;
- estilo com linhas ou colunas em faixas;
- expansão ao receber linhas e colunas adjacentes, conforme o modo de entrada;
- colunas calculadas que propagam a fórmula;
- linha de totais;
- referências estruturadas.

Exemplo de referência estruturada:

```text
=SOMA(Despesas[Valor])
```

Uma tabela facilita crescimento e leitura, mas não substitui a qualidade dos dados.

Na linha de totais, o Excel usa normalmente `SUBTOTAL`, cuja operação pode ignorar linhas filtradas. Por isso, o total visível de uma tabela filtrada pode diferir de `SOMA` aplicada diretamente ao intervalo completo.

### 8.3 Classificação

Classificar reorganiza a ordem das linhas conforme chaves, como:

- texto em ordem alfabética;
- números do menor para o maior;
- datas da mais antiga para a mais recente;
- cor, ícone ou lista personalizada;
- vários níveis, por exemplo setor e depois valor.

Ao classificar uma base, toda a área relacionada deve participar da operação. Classificar apenas uma coluna isolada pode separar valores do restante do registro e corromper a relação entre os dados.

### 8.4 Filtros

Filtrar mostra somente as linhas que atendem aos critérios e oculta temporariamente as demais. O filtro:

- não exclui os registros ocultos;
- pode combinar critérios em colunas diferentes;
- pode filtrar por texto, número, data, cor ou seleção de valores;
- altera o conjunto visível, não necessariamente as fórmulas comuns que usam o intervalo inteiro.

Limpar um filtro volta a exibir os registros; excluir as linhas filtradas é outra operação.

### 8.5 Validação de dados

A validação restringe entradas e pode oferecer:

- número inteiro ou decimal dentro de limites;
- data ou hora válida;
- comprimento de texto;
- lista suspensa;
- regra baseada em fórmula;
- mensagem de entrada e alerta de erro.

Ela melhora a qualidade do cadastro, mas não é mecanismo de autenticação ou segurança. Dados inválidos ainda podem existir por importações, colagens ou alterações nas regras, conforme o fluxo usado. Auditar valores inválidos continua necessário.

---

## 9. Gráficos

### 9.1 Finalidade e componentes

Um gráfico representa visualmente dados de uma planilha. Ele permanece associado à fonte; alterações na fonte normalmente atualizam o gráfico. Seus componentes podem incluir:

- área do gráfico e área de plotagem;
- séries de dados;
- eixos e títulos dos eixos;
- título do gráfico;
- legenda;
- rótulos de dados;
- linhas de grade;
- filtros do gráfico.

O gráfico não corrige dados ruins. Categorias inconsistentes, números armazenados como texto e intervalos incompletos produzem visualizações enganosas.

### 9.2 Escolha do tipo

| Tipo | Uso adequado | Cuidado |
|---|---|---|
| **colunas** | comparar valores entre categorias | excesso de categorias reduz legibilidade |
| **barras** | comparar categorias, especialmente com rótulos longos | ordenar pode facilitar a leitura |
| **linhas** | mostrar tendência em períodos ou intervalos ordenados | pressupõe sequência significativa |
| **pizza/rosca** | mostrar partes de um total, com uma série e poucos itens | muitas fatias e valores negativos prejudicam a interpretação |
| **dispersão (XY)** | analisar relação entre pares numéricos | ambos os eixos são escalas numéricas |
| **área** | destacar tendência e magnitude acumulada | sobreposição pode esconder séries |
| **combinação** | reunir séries de natureza ou escala diferente | eixo secundário exige interpretação cuidadosa |

Colunas e barras tratam o eixo de categorias de forma diferente do gráfico de dispersão. Em XY, cada ponto resulta de um par numérico `(x,y)`, adequado para correlação e espaçamentos irregulares.

### 9.3 Criação e manutenção

Fluxo básico:

1. organizar e selecionar os dados, incluindo cabeçalhos relevantes;
2. usar **Inserir > Gráficos Recomendados** ou escolher um tipo;
3. verificar séries, categorias e orientação linha/coluna;
4. inserir título, eixos, legenda e rótulos somente quando ajudarem a interpretação;
5. conferir se a fonte inclui novas linhas adicionadas.

Se a fonte for uma Tabela do Excel, sua expansão tende a ser incorporada ao gráfico associado. Em um intervalo fixo, pode ser necessário ampliar manualmente a origem dos dados.

### 9.4 Clareza e fidelidade

Boas práticas:

- usar título que diga o que está sendo comparado;
- manter unidades explícitas;
- evitar efeitos 3D que distorçam proporções;
- não cortar eixos de modo a exagerar diferenças sem justificativa clara;
- evitar cores sem contraste ou usadas como único meio de distinção;
- limitar elementos decorativos.

No Excel para a Web, gráficos comuns são suportados, mas referências externas, alguns agrupamentos, fontes de dados e efeitos avançados podem apresentar diferenças. A aparência simples tende a ter melhor compatibilidade.

---

## 10. Impressão e configuração de página

### 10.1 O que imprimir

O Excel desktop permite imprimir, conforme a seleção e as configurações:

- planilha ativa;
- pasta de trabalho inteira;
- seleção;
- tabela selecionada.

A visualização de impressão deve ser conferida antes da saída, pois a grade em tela não corresponde automaticamente à divisão física das páginas.

### 10.2 Configurações de página

As principais decisões incluem:

- orientação retrato ou paisagem;
- tamanho do papel;
- margens;
- escala ou ajuste a um número de páginas;
- cabeçalho e rodapé;
- repetição de linhas ou colunas de títulos;
- exibição de linhas de grade e cabeçalhos;
- centralização na página.

Reduzir toda uma base extensa para caber em uma única página pode tornar o texto ilegível. Ajustar largura e permitir várias páginas na altura costuma ser mais útil.

### 10.3 Área de impressão

A **área de impressão** é um ou mais intervalos definidos para impressão. No desktop, ela fica salva na pasta de trabalho. Áreas não adjacentes formam áreas distintas e normalmente são impressas em páginas separadas.

Definir uma área de impressão não apaga dados externos a ela. Limpar a área restaura a possibilidade de imprimir a planilha conforme as demais configurações.

### 10.4 Quebras de página

Quebras de página dividem a planilha em páginas impressas:

- **automáticas** são calculadas pelo Excel conforme papel, margens, escala e conteúdo;
- **manuais** são inseridas ou movidas pelo usuário no desktop.

Uma quebra automática não é excluída diretamente como uma quebra manual; ela muda quando se alteram as condições de paginação. A opção **Redefinir Todas as Quebras de Página** remove as quebras manuais.

### 10.5 Excel para a Web

No navegador, é possível imprimir a planilha inteira ou a seleção atual. Isso não equivale a definir uma área de impressão persistente. A criação de áreas de impressão, a inserção de quebras manuais e certos recursos de paginação exigem o aplicativo desktop.

---

## 11. Exemplo integrado

Considere uma base de despesas:

| Coluna | Campo | Exemplo |
|---|---|---|
| A | código | `D-001` |
| B | unidade | `Saúde` |
| C | quantidade | `10` |
| D | preço unitário | `125,50` |
| E | total | fórmula |
| F | situação | fórmula |

Na linha 2:

```text
=C2*D2
```

Para classificar o gasto com limite absoluto armazenado em `H1`:

```text
=SE(E2<=$H$1;"Dentro do limite";"Revisar")
```

Indicadores:

```text
=SOMA(E2:E100)
=MÉDIA(E2:E100)
=CONT.NÚM(E2:E100)
=CONT.SE(F2:F100;"Revisar")
=SOMASE(B2:B100;"Saúde";E2:E100)
```

Fluxo seguro:

1. validar códigos, unidades, quantidades e preços;
2. transformar a base em tabela;
3. inserir fórmulas nas colunas calculadas;
4. conferir erros e tipos de dados;
5. classificar ou filtrar sem separar registros;
6. criar o gráfico apropriado;
7. revisar a área e a escala de impressão;
8. salvar em formato que preserve os recursos necessários.

---

## 12. Pegadinhas recorrentes de prova

| Afirmação | Avaliação correta |
|---|---|
| “Pasta de trabalho e planilha são sinônimos.” | falso: a pasta contém planilhas |
| “Formatar 25 como porcentagem produz 25%.” | falso em geral: o valor 25 tende a ser exibido como 2500% |
| “`$A$1` muda ao copiar a fórmula.” | falso: linha e coluna estão fixas |
| “`CONT.NÚM` conta qualquer célula preenchida.” | falso: conta números; `CONT.VALORES` conta não vazias |
| “`E` aceita uma única condição verdadeira.” | falso: todas devem ser verdadeiras |
| “`OU` exige todas as condições verdadeiras.” | falso: basta pelo menos uma |
| “PROCV com argumento omitido faz busca exata.” | falso: a correspondência padrão é aproximada |
| “Filtro exclui as linhas que não atendem ao critério.” | falso: ele as oculta temporariamente |
| “Formatação condicional muda o valor da célula.” | falso: muda a aparência |
| “CSV preserva todas as planilhas e fórmulas.” | falso: é formato textual limitado |
| “Gráfico de linhas e dispersão tratam o eixo X do mesmo modo.” | falso: XY usa escala numérica |
| “Definir área de impressão apaga o restante da planilha.” | falso: apenas delimita a saída |
| “`#####` sempre significa fórmula inválida.” | falso: pode ser falta de largura ou data/hora negativa |
| “Macros de XLSM executam no Excel para a Web.” | falso: o navegador não executa VBA |

Para resolver questões, identifique primeiro **versão, plataforma, idioma, formato, tipo de referência, modo de cálculo e operação exata**. A resposta muda quando o enunciado troca copiar por mover, intervalo por tabela, correspondência exata por aproximada ou desktop por Web.

---

## 13. Referências

Fontes oficiais consultadas em 18 de julho de 2026:

- [Edital do concurso TCE/MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/286F92FD1323AD1603BB4FECDE9E40CCC27E6A3E8278DE6C9967CA14B2E4B84F.html) — Centro Brasileiro de Pesquisa em Avaliação e Seleção e de Promoção de Eventos (Cebraspe); conteúdo programático do recorte.
- [Tarefas básicas no Excel](https://support.microsoft.com/pt-br/office/tarefas-b%C3%A1sicas-no-excel-dc775dd1-fa52-430f-9c3c-d998d1735fca) — Microsoft Support; estrutura, entrada, formatação, tabelas e operações básicas.
- [Visão geral de fórmulas no Excel](https://support.microsoft.com/pt-br/office/vis%C3%A3o-geral-de-f%C3%B3rmulas-no-excel-ecfdc708-9162-49e8-b993-c311f47ca173) — Microsoft Support; fórmulas, operadores, precedência e referências.
- [Alternar entre referências relativas, absolutas e mistas](https://support.microsoft.com/pt-br/office/alternar-entre-refer%C3%AAncias-relativas-absolutas-e-mistas-dfec08cd-ae65-4f56-839e-5f0d8d0baca9) — Microsoft Support; referências e cópia de fórmulas.
- [Funções do Excel por categoria](https://support.microsoft.com/pt-br/office/fun%C3%A7%C3%B5es-do-excel-por-categoria-5f91f4e9-7b42-46d2-9bd1-63f26a86c0eb) — Microsoft Support; catálogo e finalidade das funções.
- [Função PROCV](https://support.microsoft.com/pt-br/excel/functions/vlookup-function) — Microsoft Support; sintaxe, busca exata e aproximada e limitações.
- [Função PROCX](https://support.microsoft.com/pt-br/excel/functions/xlookup-function) — Microsoft Support; sintaxe, correspondência e disponibilidade.
- [Como evitar fórmulas quebradas](https://support.microsoft.com/pt-br/office/como-evitar-f%C3%B3rmulas-quebradas-no-excel-8309381d-33e8-42f6-b889-84ef6df1d586) — Microsoft Support; diagnóstico de fórmulas e erros.
- [Alterar recálculo, iteração ou precisão](https://support.microsoft.com/pt-br/office/alterar-o-rec%C3%A1lculo-itera%C3%A7%C3%A3o-ou-precis%C3%A3o-da-f%C3%B3rmula-no-excel-73fc7dac-91cf-4d36-86e8-67124f6bcce4) — Microsoft Support; modos e comandos de cálculo.
- [Visão geral de tabelas do Excel](https://support.microsoft.com/pt-br/office/vis%C3%A3o-geral-de-tabelas-do-excel-7ab0bb7d-3a9e-4b56-a3c9-6c94334e492c) — Microsoft Support; tabelas, colunas calculadas, totais e referências estruturadas.
- [Classificar dados em um intervalo ou tabela](https://support.microsoft.com/pt-br/office/classificar-dados-em-um-intervalo-ou-tabela-62d0b95d-2a90-4610-a6ae-2e545c4a4654) — Microsoft Support; classificação simples e multinível.
- [Aplicar validação de dados a células](https://support.microsoft.com/pt-br/office/aplicar-valida%C3%A7%C3%A3o-de-dados-a-c%C3%A9lulas-29fecbcc-d1b9-42c1-9d76-eff3ce5f7249) — Microsoft Support; critérios, listas e alertas.
- [Usar formatação condicional](https://support.microsoft.com/pt-br/office/usar-a-formata%C3%A7%C3%A3o-condicional-para-real%C3%A7ar-informa%C3%A7%C3%B5es-no-excel-fed60dfa-1d3f-4e13-9ecb-f1951ff89d7f) — Microsoft Support; regras e efeitos visuais.
- [Criar um gráfico com Gráficos Recomendados](https://support.microsoft.com/pt-br/office/criar-um-gr%C3%A1fico-com-gr%C3%A1ficos-recomendados-cd131b77-79c7-4537-a438-8db20cea84c0) — Microsoft Support; criação e ajuste de gráficos.
- [Tipos de gráfico disponíveis no Office](https://support.microsoft.com/pt-br/office/tipos-de-gr%C3%A1fico-dispon%C3%ADveis-no-office-a6187218-807e-4103-9e0a-27cdb19afb90) — Microsoft Support; seleção e características de gráficos.
- [Imprimir uma planilha ou pasta de trabalho](https://support.microsoft.com/pt-br/office/imprimir-uma-planilha-ou-pasta-de-trabalho-f4ad7962-b1d5-4eb9-a24f-0907f36c4b94) — Microsoft Support; escopo e opções de impressão.
- [Definir ou limpar a área de impressão](https://support.microsoft.com/pt-br/office/definir-ou-limpar-a-%C3%A1rea-de-impress%C3%A3o-em-uma-planilha-27048af8-a321-416d-ba1b-e99ae2182a7e) — Microsoft Support; persistência e múltiplas áreas.
- [Inserir, mover ou excluir quebras de página](https://support.microsoft.com/pt-br/office/inserir-mover-ou-excluir-quebras-de-p%C3%A1gina-em-uma-planilha-ad3dc726-beec-4a4c-861f-ed640612bdc2) — Microsoft Support; quebras automáticas e manuais.
- [Formatos de arquivo com suporte no Excel](https://support.microsoft.com/pt-br/office/formatos-de-arquivos-com-suporte-no-excel-0943ff2c-6014-4e8d-aaea-b83d51d46247) — Microsoft Support; XLSX, XLSM, XLS, CSV e ODS.
- [Diferenças entre ODS e XLSX](https://support.microsoft.com/pt-br/office/diferen%C3%A7as-entre-o-formato-da-planilha-opendocument-ods-e-o-formato-do-excel-para-windows-xlsx-3db958c8-e0ac-49a5-9965-2c8f8afbd960) — Microsoft Support; interoperabilidade e perdas possíveis.
- [Diferenças entre uma pasta no navegador e no Excel](https://support.microsoft.com/pt-br/office/diferen%C3%A7as-entre-o-uso-de-uma-pasta-de-trabalho-no-navegador-e-no-excel-f0dc28ed-b85d-4e1d-be6d-5878005db3b6) — Microsoft Support; limitações e recursos do Excel para a Web.
