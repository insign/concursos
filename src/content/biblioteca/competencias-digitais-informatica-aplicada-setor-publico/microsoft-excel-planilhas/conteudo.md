---
schemaVersion: 1
title: "Microsoft Excel: planilhas, fórmulas, funções e gráficos"
description: Estrutura de pastas e planilhas, tipos de dados, fórmulas, referências, funções, tabelas, filtros, Tabelas Dinâmicas, gráficos, impressão, compatibilidade e uso responsável do Microsoft Excel.
order: 22
storageId: microsoft-excel-planilhas
---

## 1. Recorte do assunto e ambiente de referência

O edital reúne editores de texto, planilhas e apresentações no Microsoft Office. Este assunto cobre somente o **Microsoft Excel**, com foco em planilhas, fórmulas, funções e criação de gráficos. Formatação de documentos pertence ao assunto de Word; criação de apresentações pertence ao assunto de PowerPoint.

Como o edital não fixa uma edição, a referência principal é o **Excel desktop atual para Windows**, especialmente Microsoft 365 e Excel 2024. Conceitos estáveis também se aplicam ao Excel 2021 e ao Excel 2019. Quando um recurso depende de versão, idioma, plataforma, licença, formato do arquivo ou configuração regional, essa condição é indicada.

Quatro cautelas evitam generalizações frequentes:

- Excel desktop, Excel para a Web e Excel para macOS não possuem paridade total;
- o nome localizado de uma função pode variar, mas sua lógica permanece;
- separador de argumentos, separador decimal e formato de datas dependem da configuração regional;
- valor armazenado, fórmula, formato exibido e resultado visual são camadas diferentes.

---

## 2. Mapa mental de resolução

Antes de calcular, identifique:

1. **Ambiente:** desktop, Web, versão e idioma.
2. **Estrutura:** pasta, planilha, linha, coluna, célula, intervalo ou tabela.
3. **Valor armazenado:** número, texto, data, hora, lógico, vazio ou erro.
4. **Fórmula:** operadores, precedência, referências e funções.
5. **Alcance:** célula, intervalo, coluna, tabela, planilha ou pasta.
6. **Resultado:** valor, posição, contagem, matriz, erro ou visualização.
7. **Apresentação:** formato numérico, ordenação, filtro, gráfico ou impressão.

> **Sequência de decisão:** ambiente → valor armazenado → fórmula → referências → função → critérios → resultado → apresentação.

---

## 3. Pasta de trabalho, planilha, célula e intervalo

Uma **pasta de trabalho** é o arquivo do Excel. Ela pode conter uma ou mais **planilhas**. Cada planilha é uma grade de linhas e colunas.

| Elemento | Exemplo | Significado |
|---|---|---|
| coluna | `B` | eixo vertical identificado por letras |
| linha | `7` | eixo horizontal identificado por números |
| célula | `B7` | interseção entre coluna B e linha 7 |
| intervalo contínuo | `B2:E20` | retângulo de células |
| intervalos não contíguos | `A1:A5;C1:C5` | áreas separadas, conforme o contexto |
| planilha + célula | `Cadastro!A2` | referência a outra planilha |
| pasta externa | `[Base.xlsx]Dados!A2` | referência a outra pasta, sujeita a vínculo |

O endereço da célula ativa aparece na **Caixa de Nome**. A **Barra de Fórmulas** mostra ou edita o conteúdo da célula. A célula pode exibir um resultado enquanto a barra de fórmulas contém a expressão que o produziu.

### 3.1 Inserir e excluir não são apenas limpar

- **Limpar conteúdo** remove valores ou fórmulas, preservando a estrutura.
- **Limpar formatos** remove aparência, preservando conteúdo.
- **Excluir células, linhas ou colunas** desloca a estrutura.
- **Ocultar** mantém o elemento e apenas o retira da visualização normal.

Em prova, “apagar”, “limpar”, “excluir” e “ocultar” não devem ser tratados como sinônimos automáticos.

---

## 4. Tipos de dados e formato exibido

O Excel trabalha com números, texto, datas, horas, valores lógicos, células vazias e erros.

### 4.1 Número, texto e data

Datas e horas são normalmente armazenadas como números seriais. O formato controla a aparência:

- o número `0,25` pode aparecer como `25%`;
- o número serial de uma data pode aparecer como `15/08/2026`;
- o mesmo valor pode aparecer como moeda, contábil, porcentagem ou número comum.

Alterar o formato **não muda necessariamente o valor armazenado**. Digitar `15%`, porém, normalmente armazena `0,15`.

### 4.2 Texto que parece número

Um código como `00123` pode precisar ser armazenado como texto para preservar zeros à esquerda. Isso é comum em códigos administrativos, CEPs e matrículas.

Sinais de possível número armazenado como texto:

- alinhamento diferente do esperado;
- aviso de verificação;
- funções de soma ignorando o conteúdo;
- ordenação lexicográfica, como `1`, `10`, `2`.

Converter indiscriminadamente pode destruir zeros à esquerda. Primeiro identifique se o dado representa quantidade ou identificador.

### 4.3 Formatos frequentes

| Formato | Cuidado |
|---|---|
| número | controla casas decimais e separadores |
| moeda | exibe símbolo junto ao valor |
| contábil | alinha símbolos e casas decimais |
| porcentagem | exibe o valor multiplicado visualmente por 100 |
| data/hora | apresenta números seriais como datas ou horas |
| texto | preserva caracteres sem cálculo numérico normal |
| personalizado | modifica a exibição sem necessariamente alterar o valor |

Aumentar casas decimais pode revelar precisão já armazenada; diminuir pode apenas arredondar a **exibição**.

---

## 5. Fórmulas, operadores e precedência

Uma fórmula começa, em regra, por `=`.

```text
=B2*C2
=SOMA(E2:E20)
=SE(F2="Pago";E2;0)
```

### 5.1 Operadores

| Categoria | Operadores |
|---|---|
| referência | `:` intervalo, espaço interseção, `;` ou `,` união conforme o contexto |
| aritméticos | `-` negação, `%`, `^`, `*`, `/`, `+`, `-` |
| texto | `&` concatenação |
| comparação | `=`, `<>`, `>`, `<`, `>=`, `<=` |

A ordem de precedência relevante é:

1. operadores de referência;
2. negação;
3. porcentagem;
4. exponenciação;
5. multiplicação e divisão;
6. adição e subtração;
7. concatenação;
8. comparação.

Parênteses alteram a ordem:

```text
=2+3*4
```

Resultado: `14`.

```text
=(2+3)*4
```

Resultado: `20`.

### 5.2 Separadores regionais

Em uma configuração pt-BR típica:

- decimal: vírgula;
- argumentos: ponto e vírgula.

Assim:

```text
=SE(B2>0,5;"Alto";"Baixo")
```

Em outra localidade, podem aparecer ponto decimal e vírgula entre argumentos. O enunciado deve delimitar o ambiente quando a pontuação for decisiva.

---

## 6. Referências relativas, absolutas e mistas

| Referência | Comportamento ao copiar |
|---|---|
| `A1` | linha e coluna variam |
| `$A$1` | linha e coluna permanecem fixas |
| `$A1` | coluna fixa; linha varia |
| `A$1` | coluna varia; linha fixa |

### 6.1 Exemplo de cálculo com taxa fixa

Se `B2` contém quantidade, `C2` contém preço e `H1` contém uma taxa:

```text
=B2*C2*(1+$H$1)
```

Ao copiar para baixo, `B2` e `C2` mudam de linha, mas `$H$1` permanece.

### 6.2 Cópia para a direita

Em:

```text
=$A2*B$1
```

ao copiar uma coluna à direita e uma linha abaixo, a fórmula se torna:

```text
=$A3*C$1
```

A coluna A continua fixa; a linha 1 continua fixa.

### 6.3 Referência circular

Uma fórmula que depende direta ou indiretamente de si mesma cria referência circular. Cálculo iterativo pode ser habilitado em cenários específicos, mas não deve ser presumido. Em prova básica, a referência circular é normalmente um problema de modelagem.

---

## 7. Funções básicas de agregação

| Função | Resultado |
|---|---|
| `SOMA(intervalo)` | total |
| `MÉDIA(intervalo)` | média aritmética |
| `MÁXIMO(intervalo)` | maior valor |
| `MÍNIMO(intervalo)` | menor valor |
| `MAIOR(intervalo;k)` | k-ésimo maior |
| `MENOR(intervalo;k)` | k-ésimo menor |

Exemplos:

```text
=SOMA(E2:E100)
=MÉDIA(E2:E100)
=MAIOR(E2:E100;3)
=MENOR(E2:E100;2)
```

`MÁXIMO(E2:E100)` equivale a `MAIOR(E2:E100;1)`, mas `MAIOR(...;3)` retorna o terceiro maior valor. O mesmo raciocínio vale para `MÍNIMO` e `MENOR`.

Se `k` for zero, negativo ou maior que a quantidade de valores utilizáveis, `MAIOR` ou `MENOR` pode retornar `#NÚM!`.

---

## 8. Funções de contagem

| Função | Conta |
|---|---|
| `CONT.NÚM` | células com números, incluindo datas armazenadas como número |
| `CONT.VALORES` | células não vazias |
| `CONTAR.VAZIO` | células vazias |
| `CONT.SE` | células que atendem a um critério |
| `CONT.SES` | linhas/células que atendem a vários critérios simultâneos |

Exemplos:

```text
=CONT.NÚM(E2:E100)
=CONT.VALORES(A2:A100)
=CONT.SE(F2:F100;"Pendente")
=CONT.SES(B2:B100;"Educação";F2:F100;"Pendente")
```

`CONT.VALORES` pode contar texto vazio produzido por fórmula (`""`) como conteúdo, conforme o comportamento da função e do intervalo. “Visualmente vazio” não é sempre igual a “célula realmente vazia”.

---

## 9. Critérios em SOMASE, SOMASES, CONT.SE e CONT.SES

### 9.1 SOMASE

```text
=SOMASE(intervalo;critério;[intervalo_soma])
```

Com três argumentos:

```text
=SOMASE(B2:B100;"Saúde";E2:E100)
```

Soma os valores de E quando B é “Saúde”.

Com dois argumentos:

```text
=SOMASE(E2:E100;">70000")
```

O próprio intervalo testado também é somado.

Critério combinado com célula:

```text
=SOMASE(E2:E100;">"&H1)
```

O operador fica entre aspas e é concatenado ao valor de H1.

### 9.2 SOMASES

```text
=SOMASES(intervalo_soma;intervalo_critérios1;critério1;[intervalo_critérios2;critério2]...)
```

Exemplo:

```text
=SOMASES(E2:E500;B2:B500;"Saúde";F2:F500;"Pago")
```

Soma E quando **todos** os critérios são atendidos.

Datas:

```text
=SOMASES(E2:E500;A2:A500;">="&H1;A2:A500;"<="&H2)
```

Diferença importante:

- `SOMASE`: intervalo a somar aparece como terceiro argumento opcional;
- `SOMASES`: intervalo a somar aparece primeiro.

### 9.3 CONT.SES

```text
=CONT.SES(A2:A500;">="&H1;A2:A500;"<="&H2;F2:F500;"Pago")
```

Conta registros dentro do período e com situação “Pago”. A função não soma valores.

### 9.4 Curingas

Em critérios de texto:

- `*` representa qualquer sequência de caracteres;
- `?` representa um caractere;
- `~` pode escapar um curinga literal.

Exemplo:

```text
=CONT.SE(B2:B100;"*saúde*")
```

---

## 10. Funções lógicas

### 10.1 SE

```text
=SE(teste_lógico;valor_se_verdadeiro;valor_se_falso)
```

Exemplo:

```text
=SE(E2>100000;"Revisar";"Regular")
```

### 10.2 E e OU

```text
=SE(E(B2="Saúde";E2>100000);"Prioritário";"Normal")
```

`E` exige que todas as condições sejam verdadeiras.

```text
=SE(OU(F2="Pendente";F2="Bloqueado");"Acompanhar";"Sem alerta")
```

`OU` exige ao menos uma condição verdadeira.

### 10.3 SE aninhado

```text
=SE(A2="valor padrão";0;SE(B2>0,5;B2;-1))
```

O primeiro teste tem prioridade. Se for falso, o segundo `SE` é avaliado.

### 10.4 SEERRO

```text
=SEERRO(valor;valor_se_erro)
```

Exemplo:

```text
=SEERRO(PROCV(A2;Cadastro!A:D;4;FALSO);"Cadastro não localizado")
```

`SEERRO` melhora a apresentação, mas não corrige a causa. Devolver `0` para qualquer erro pode confundir ausência de cadastro com valor realmente igual a zero.

---

## 11. Pesquisa e referência

### 11.1 PROCV

```text
=PROCV(valor_procurado;tabela;índice_coluna;[procurar_intervalo])
```

Exemplo exato:

```text
=PROCV(A2;Cadastro!A:D;4;FALSO)
```

Cuidados:

- procura na primeira coluna da tabela;
- retorna uma coluna à direita;
- o índice da coluna é relativo ao intervalo;
- `FALSO` ou `0` exige correspondência exata;
- aproximação exige ordenação adequada e conhecimento do comportamento.

### 11.2 CORRESP

```text
=CORRESP(valor_procurado;matriz_procurada;0)
```

Retorna a **posição relativa**, não o valor correspondente.

### 11.3 ÍNDICE

```text
=ÍNDICE(matriz;núm_linha;[núm_coluna])
```

Retorna o valor ou a referência na posição informada.

### 11.4 ÍNDICE + CORRESP

```text
=ÍNDICE(A2:A100;CORRESP(MÁXIMO(D2:D100);D2:D100;0))
```

1. `MÁXIMO` encontra a maior média;
2. `CORRESP(...;0)` encontra a posição exata;
3. `ÍNDICE` retorna o nome na mesma posição.

A combinação pesquisa para qualquer direção e funciona em versões anteriores ao `PROCX`.

### 11.5 PROCX

```text
=PROCX(valor_procurado;matriz_procurada;matriz_retorno;[se_não_encontrado])
```

Exemplo:

```text
=PROCX(A2;Cadastro!A:A;Cadastro!D:D;"Não encontrado")
```

Vantagens:

- correspondência exata por padrão;
- matriz de busca e matriz de retorno são independentes;
- pesquisa para esquerda ou direita;
- permite resultado alternativo quando não encontra.

Disponibilidade depende da versão. Não presuma `PROCX` em Excel 2016.

---

## 12. Datas, horas e texto

### 12.1 HOJE e AGORA

```text
=HOJE()
=AGORA()
```

`HOJE` retorna data atual; `AGORA` retorna data e hora atuais. São funções voláteis: recalculam conforme o Excel atualiza a pasta.

### 12.2 TEXTO

```text
=TEXTO(HOJE();"dd/mm/aaaa")
```

Retorna **texto** formatado. O resultado não é necessariamente intercambiável com uma data numérica em todos os cálculos.

### 12.3 Concatenação

```text
=A2&" - "&B2
```

O operador `&` une textos. Isso não soma números.

### 12.4 Funções de texto úteis

| Função | Uso |
|---|---|
| `ESQUERDA` | caracteres iniciais |
| `DIREITA` | caracteres finais |
| `EXT.TEXTO` | trecho interno |
| `NÚM.CARACT` | quantidade de caracteres |
| `ARRUMAR` | remove espaços excedentes, preservando separação simples |
| `MAIÚSCULA` / `MINÚSCULA` | altera capitalização textual |

Funções de texto podem transformar números em texto. Verifique o tipo resultante antes de calcular.

---

## 13. Erros de fórmula

| Erro | Significado comum |
|---|---|
| `#DIV/0!` | divisão por zero ou célula vazia tratada como zero |
| `#N/D` | valor não encontrado ou indisponível |
| `#NOME?` | nome de função, intervalo ou texto incorreto |
| `#REF!` | referência inválida, muitas vezes após exclusão |
| `#VALOR!` | tipo de dado ou argumento incompatível |
| `#NÚM!` | argumento numérico inválido |
| `#DESPEJAR!` | matriz dinâmica não consegue ocupar a área necessária |

Diagnóstico seguro:

1. leia a fórmula na Barra de Fórmulas;
2. avalie referências e tipos de dados;
3. use **Avaliar Fórmula**, quando disponível;
4. verifique células precedentes e dependentes;
5. só depois trate a apresentação com `SEERRO`.

---

## 14. Tabela do Excel

Transformar um intervalo em **Tabela do Excel** cria uma estrutura com cabeçalhos, filtros e expansão automática.

Vantagens:

- filtros integrados;
- estilos de tabela;
- linha de totais;
- expansão ao adicionar linhas;
- referências estruturadas;
- melhor fonte para gráficos e Tabelas Dinâmicas.

Exemplo de referência estruturada:

```text
=SOMA(TabelaDespesas[Valor])
```

Tabela do Excel não é Tabela Dinâmica. A primeira estrutura a base; a segunda resume e reorganiza a base.

---

## 15. Classificação, filtro e duplicatas

### 15.1 Classificação

Classificar muda a ordem das linhas. Para preservar a relação entre colunas, selecione a tabela completa ou aceite expandir a seleção.

- classificação crescente ou decrescente;
- vários níveis;
- texto, números, datas, cor e listas personalizadas.

Classificar apenas uma coluna de uma base pode separar chaves dos respectivos registros.

### 15.2 Filtro

Filtrar oculta temporariamente linhas que não atendem ao critério. Os registros continuam na base.

Filtros podem usar:

- texto;
- números;
- datas;
- cor;
- múltiplos critérios;
- pesquisa.

### 15.3 Valores exclusivos versus Remover Duplicatas

| Operação | Efeito |
|---|---|
| filtrar valores exclusivos | oculta ou copia uma lista exclusiva sem excluir permanentemente a base original |
| Remover Duplicatas | elimina linhas duplicadas segundo as colunas selecionadas |
| realçar duplicatas | altera aparência, não remove |
| `ÚNICO`, quando disponível | devolve matriz dinâmica de valores exclusivos |

Ao remover duplicatas:

- a primeira ocorrência é mantida;
- as colunas escolhidas formam a chave de comparação;
- a linha inteira é removida quando a chave é duplicada;
- valores iguais produzidos por fórmulas diferentes continuam iguais para comparação;
- preserve uma cópia ou confirme o escopo antes da exclusão.

---

## 16. Validação de dados e formatação condicional

### 16.1 Validação de dados

A validação restringe ou orienta entradas:

- número inteiro;
- decimal;
- lista;
- data;
- hora;
- comprimento de texto;
- fórmula personalizada.

Ela pode exibir mensagem de entrada e alerta de erro. Copiar e colar pode contornar determinadas validações; auditoria ainda é necessária.

### 16.2 Formatação condicional

Formatação condicional altera a aparência com base em regras:

- valores maiores, menores ou entre limites;
- duplicatas;
- texto específico;
- datas;
- barras de dados;
- escalas de cor;
- conjuntos de ícones;
- fórmulas.

Ela não altera o valor armazenado. Uma célula vermelha não se torna negativa apenas pela cor.

---

## 17. Tabela Dinâmica

A **Tabela Dinâmica** calcula, resume e analisa muitos registros de forma interativa.

### 17.1 Fonte adequada

A base deve ter:

- uma linha de cabeçalho;
- nomes de campos únicos;
- uma linha por registro;
- ausência de subtotais manuais no meio;
- tipos coerentes por coluna;
- preferência por Tabela do Excel como fonte expansível.

### 17.2 Áreas de campos

| Área | Função |
|---|---|
| **Linhas** | categorias exibidas verticalmente |
| **Colunas** | categorias exibidas horizontalmente |
| **Valores** | soma, contagem, média, máximo e outras agregações |
| **Filtros** | restringe o relatório inteiro |

Campos podem ser movidos entre áreas para produzir outro resumo sem alterar os registros da base.

### 17.3 Agregação e tipo de dado

Campos numéricos costumam usar **Soma** por padrão. Se a coluna contém texto, vazios problemáticos ou tipos mistos, a Tabela Dinâmica pode usar **Contagem**.

Sempre verifique a função de resumo.

### 17.4 Recursos

Uma Tabela Dinâmica pode:

- subtotalizar e agregar;
- resumir por categorias e subcategorias;
- mover linhas para colunas;
- filtrar, classificar e agrupar;
- aplicar formatação condicional;
- expandir e recolher níveis;
- mostrar detalhes subjacentes;
- agrupar datas por mês, trimestre ou ano;
- usar segmentação de dados;
- alimentar um Gráfico Dinâmico.

### 17.5 Atualização

Alterar a fonte não garante atualização imediata do relatório. Use **Atualizar**. Se a fonte é um intervalo fixo e novas linhas ficam fora dele, pode ser necessário alterar a origem; usar uma Tabela do Excel reduz esse risco.

---

## 18. Gráficos

Um gráfico representa dados, mas não corrige uma base mal estruturada.

### 18.1 Escolha do tipo

| Objetivo | Tipo adequado |
|---|---|
| comparar categorias | colunas ou barras |
| mostrar tendência temporal | linhas |
| mostrar parte de um todo com poucas categorias | pizza ou rosca, com cautela |
| relacionar duas variáveis numéricas | dispersão |
| mostrar distribuição | histograma |
| identificar mediana, quartis e valores atípicos | caixa e bigodes |
| combinar séries com escalas diferentes | gráfico combinado e eixo secundário, com cautela |

### 18.2 Elementos

- título;
- eixos;
- legenda;
- rótulos de dados;
- linhas de grade;
- série;
- categoria;
- área do gráfico e área de plotagem.

### 18.3 Boas práticas

- escolher o tipo pelo objetivo analítico;
- evitar 3D decorativo;
- não truncar eixo sem justificar;
- usar títulos e unidades;
- limitar pizza a poucas categorias;
- verificar filtros e linhas ocultas;
- não confundir correlação visual com causalidade.

Um Gráfico Dinâmico está ligado a uma Tabela Dinâmica e acompanha sua filtragem e reorganização.

---

## 19. Impressão

Antes de imprimir, verifique:

- área de impressão;
- orientação;
- margens;
- tamanho do papel;
- escala;
- largura e altura em páginas;
- repetição de títulos;
- quebras de página;
- cabeçalhos e rodapés;
- linhas de grade;
- seleção ou planilhas ativas.

“Ajustar todas as colunas em uma página” pode tornar o texto ilegível. Escala é compromisso entre legibilidade e quantidade de páginas.

---

## 20. Formatos de arquivo, CSV e macros

| Formato | Característica |
|---|---|
| `.xlsx` | pasta padrão sem macros VBA |
| `.xlsm` | pasta habilitada para macros |
| `.xlsb` | pasta binária |
| `.xls` | formato legado |
| `.csv` | texto delimitado; uma planilha por arquivo e sem fórmulas, estilos ou múltiplas abas |
| `.ods` | formato OpenDocument com possíveis diferenças de compatibilidade |
| `.pdf` | saída fixa para distribuição |

CSV não é uma pasta completa do Excel. Ao salvar como CSV:

- fórmulas viram resultados textuais/numerais na saída;
- estilos, gráficos e múltiplas planilhas não são preservados;
- delimitador e codificação dependem do processo;
- zeros à esquerda e datas podem ser reinterpretados na reabertura.

### 20.1 Macros

Macros automatizam tarefas, geralmente com VBA no Excel desktop. Arquivos com macros usam tipicamente `.xlsm` ou `.xlsb`.

Cuidados:

- macro pode executar código;
- não habilite conteúdo de origem desconhecida;
- assinatura e local confiável não substituem análise de segurança;
- Excel para a Web não executa todas as funcionalidades VBA do desktop.

---

## 21. Casos resolvidos

### 21.1 Total pago por área e período

```text
=SOMASES(E2:E500;B2:B500;"Saúde";F2:F500;"Pago";A2:A500;">="&H1;A2:A500;"<="&H2)
```

`E2:E500` é o intervalo somado. Os demais pares são filtros simultâneos.

### 21.2 Quantidade de pendências críticas

```text
=CONT.SES(F2:F500;"Pendente";E2:E500;">100000")
```

A função conta registros; não soma os valores.

### 21.3 Unidade com maior despesa

```text
=ÍNDICE(B2:B100;CORRESP(MÁXIMO(E2:E100);E2:E100;0))
```

A posição do maior valor em E é usada para devolver o nome correspondente em B.

### 21.4 Busca com mensagem útil

```text
=SEERRO(PROCV(A2;Cadastro!A:D;4;FALSO);"Cadastro ausente")
```

A mensagem distingue ausência de cadastro de um valor real igual a zero. Ainda é necessário investigar a origem do erro.

### 21.5 Painel com Tabela Dinâmica

Base:

- unidade;
- mês;
- natureza da despesa;
- situação;
- valor.

Configuração:

- Linhas: Unidade;
- Colunas: Mês;
- Valores: Soma de Valor;
- Filtro: Situação.

Depois, crie gráfico de linhas para tendência mensal ou colunas para comparar unidades. Atualize após alterar a fonte.

### 21.6 Duplicatas

Uma base contém duas linhas com o mesmo número de processo e unidade, mas observações diferentes. Se Remover Duplicatas usar apenas Processo e Unidade como chave, uma linha inteira será excluída, inclusive sua observação. Por isso, as colunas selecionadas definem o risco.

---

## 22. Pegadinhas de prova

- pasta de trabalho não é planilha;
- célula exibida não é necessariamente valor armazenado;
- porcentagem não é apenas símbolo;
- formato não é valor;
- limpar não é excluir;
- ocultar não é remover;
- `A1`, `$A$1`, `$A1` e `A$1` copiam de formas diferentes;
- parênteses alteram precedência;
- `CONT.NÚM` não conta todo conteúdo;
- `CONT.VALORES` não significa “números”;
- `MÁXIMO` não é segundo maior;
- `SOMASE` e `SOMASES` têm ordem de argumentos diferente;
- `CONT.SES` conta; `SOMASES` soma;
- critérios com operadores costumam exigir aspas e concatenação;
- `CORRESP` retorna posição;
- `ÍNDICE` retorna o item na posição;
- `PROCV` procura na primeira coluna do intervalo;
- `PROCX` pode não existir em versão antiga;
- `SEERRO` não corrige a causa;
- texto formatado como data não é necessariamente data numérica;
- filtro oculta; Remover Duplicatas exclui;
- Tabela do Excel não é Tabela Dinâmica;
- Tabela Dinâmica pode usar Contagem quando se esperava Soma;
- alterar a fonte pode exigir Atualizar;
- gráfico não corrige dados ruins;
- correlação visual não prova causalidade;
- CSV não preserva uma pasta completa;
- `.xlsx` não preserva macros VBA;
- Excel para a Web não possui paridade total com o desktop.

---

## 23. Método de resolução

1. Identifique ambiente, versão e localidade.
2. Leia a estrutura da base e os endereços.
3. Diferencie valor, fórmula e formato.
4. Resolva precedência e referências antes das funções.
5. Identifique se a operação soma, conta, busca posição, retorna valor ou apenas altera visualização.
6. Nos critérios, confira operadores, aspas, curingas e concatenação.
7. Nas buscas, confira coluna de procura, direção e correspondência exata/aproximada.
8. Em Tabela Dinâmica, confira fonte, área dos campos, agregação e atualização.
9. Em gráficos, identifique o objetivo analítico.
10. Rejeite absolutos como “sempre preserva”, “qualquer versão” e “filtrar exclui”.
