---
schemaVersion: 1
title: "Microsoft Excel: planilhas, fórmulas, funções e gráficos"
description: Estrutura de pastas e planilhas, tipos de dados, fórmulas, referências, funções, tabelas, filtros, Tabelas Dinâmicas, gráficos, impressão, compatibilidade e uso responsável do Microsoft Excel.
order: 22
storageId: microsoft-excel-planilhas
---

## 1. Uma planilha guarda dados e relações entre eles

Uma quantidade mudou de 10 para 12. É preciso refazer o total manualmente? Não, se ele foi definido como **quantidade × preço**, e não digitado como um número independente. O Excel organiza dados em células e estabelece cálculos que dependem desses dados.

A **pasta de trabalho** é o arquivo, como `despesas.xlsx`. Dentro dele, as **planilhas** são grades de linhas e colunas, acessadas pelas abas. Colunas recebem letras — A, B, …, Z, AA, AB — e linhas recebem números. A **célula** é a interseção: `D7` fica na coluna D, linha 7. Um **intervalo** reúne células: `B2:E5` abrange quatro colunas e quatro linhas, inclusive os extremos, totalizando 16 células.

**Exemplo hipotético reutilizado no capítulo:** uma planilha registra quatro processos, um por linha. As colunas contêm os campos de cada registro; os cabeçalhos ficam na linha 1.

| Linha | A — Processo | B — Unidade | C — Quantidade | D — Preço unitário | E — Valor | F — Situação |
|---|---|---|---|---|---|---|
| 2 | 001 | Saúde | 10 | 20 | 200 | Pago |
| 3 | 002 | Educação | 5 | 40 | 200 | Pendente |
| 4 | 003 | Saúde | 3 | 100 | 300 | Pago |
| 5 | 004 | Saúde | 2 | 50 | 100 | Pendente |

Em E2, digita-se `=C2*D2`: a fórmula multiplica quantidade por preço e exibe 200. A **Barra de Fórmulas** permite ler e editar a expressão; a grade normalmente mostra o resultado. A **Caixa de Nome** indica endereço ou nome; a **célula ativa** recebe a digitação. A seleção delimita o alcance de muitos comandos.

A **Faixa de Opções** organiza comandos em guias, como Página Inicial, Inserir, Fórmulas e Dados. Arquivo reúne operações como salvar e imprimir; algumas guias dependem do objeto selecionado.

### Ambiente de referência

O item 2.2 do edital inclui Microsoft Office sem fixar edição. A referência aqui é o **Excel instalado no Windows, especialmente Microsoft 365 e Excel 2024**. Excel para a Web funciona no navegador; Excel para <abbr title="Sistema operacional dos computadores Mac">macOS</abbr>, nos computadores Mac. Recursos, nomes e atalhos variam: **a versão e a configuração da questão prevalecem**. Word e PowerPoint cuidam, respectivamente, de documentos de texto e apresentações.

## 2. Conteúdo, resultado e aparência não são a mesma coisa

Em E2 há uma fórmula, seu resultado e sua apresentação. O formato Moeda mostra `R$ 200,00`, sem transformar a fórmula em texto nem substituir o resultado numérico.

O Excel distingue números, textos, valores lógicos (`VERDADEIRO` e `FALSO`), erros e células vazias. **Datas e horas válidas são numéricas**: dias são números de série; horas, frações de dia. Somar 1 a uma data avança um dia; `0,5` de dia representa 12 horas. Texto que apenas parece data pode não permitir esse cálculo.

### Número para calcular; texto para identificar

Os processos `001` a `004` são identificadores. Armazená-los como texto — formatando a coluna como Texto antes de digitar ou usando um apóstrofo inicial, como `'001` — preserva os zeros. Um formato personalizado `000` pode exibir o número 1 como `001`, mas o valor continua sendo 1: **preservar caracteres e apenas desenhar zeros são soluções diferentes**.

Texto numérico pode ser ignorado por funções de soma e ordenado por caracteres: `1`, `10`, `2`, não pela quantidade. Alinhamento é apenas indício do tipo, pois pode ser alterado. Converter texto em número faz sentido para quantidades, mas pode destruir identificadores.

### Porcentagem, arredondamento e cópia de formato

O valor `0,25`, formatado como porcentagem, aparece como `25%`. Digitar `15%` normalmente armazena `0,15`. Portanto, aplicar porcentagem ao número 25 já existente pode fazê-lo aparecer como `2500%`: o formato não se limita a acrescentar o símbolo.

Número controla casas e separadores; Moeda exibe símbolo monetário; Contábil alinha símbolos e casas decimais. Data, Hora e Personalizado também controlam a apresentação. **Reduzir casas normalmente arredonda só a exibição**, preservando a precisão usada nos cálculos. Já `=ARRED(1,236;2)` produz o resultado numérico 1,24.

O **Pincel de Formatação** copia a aparência, incluindo alinhamento e orientação do texto, não a fórmula nem seu valor. Duplo clique permite aplicá-lo em vários destinos; `Esc` encerra. Em planilhas protegidas, a possibilidade de formatar depende das permissões, e não apenas de a célula estar marcada como bloqueada.

### Limpar, excluir e ocultar

**Limpar conteúdo** remove valores e fórmulas, mas conserva células e formatação; **Limpar formatos** faz o contrário quanto à aparência. **Excluir** células, linhas ou colunas altera a estrutura e pode deslocar dados e ajustar ou invalidar referências. **Ocultar** conserva os dados e apenas os retira da visualização normal. Apagar o conteúdo de E2 não é excluir a linha do processo 001.

## 3. Ler uma fórmula antes de calcular

Uma fórmula normalmente começa por `=`. Ela pode combinar números, referências, operadores e **funções**, que são operações prontas com nome e informações de entrada, chamadas **argumentos**. Em `=SOMA(E2:E5)`, a função recebe o intervalo e devolve seu total; em `=C2*D2`, a multiplicação é escrita diretamente.

Os exemplos usam português do Brasil, vírgula decimal e ponto e vírgula entre argumentos; os separadores dependem da configuração regional. Nas sintaxes explicativas, colchetes indicam argumentos opcionais, não caracteres a digitar na chamada.

### Operadores e precedência

Multiplicação e divisão precedem adição e subtração: `=2+3*4` resulta em 14. Parênteses mudam a prioridade: `=(2+3)*4` resulta em 20. Entre operações de mesma prioridade, o Excel calcula da esquerda para a direita.

| Prioridade, da maior para a menor | Operadores e significado |
|---|---|
| Referência | `:` forma intervalo; espaço encontra interseção; união reúne referências |
| Negação | `-` troca o sinal de um número |
| Porcentagem | `%` representa divisão por cem |
| Exponenciação | `^` calcula potência |
| Multiplicação e divisão | `*` e `/` |
| Adição e subtração | `+` e `-` |
| Concatenação | `&` une conteúdos como texto |
| Comparação | `=`, `<>`, `>`, `<`, `>=`, `<=` |

No Excel, a negação precede a potência: `=-2^2` resulta em 4; `=-(2^2)` resulta em -4. Não transporte automaticamente outra convenção matemática para a fórmula.

A comparação `E2>250` devolve `FALSO` no exemplo; `<>` significa diferente de. Já `=A2&" - "&B2` devolve o texto `001 - Saúde`, não uma soma. Essa união textual chama-se **concatenação**.

O operador `:` inclui os extremos. O espaço entre `A1:C3 B2:D4` representa as células comuns, `B2:C3`. A união usa vírgula ou ponto e vírgula conforme o ambiente e o contexto; não confunda sua função com a separação dos argumentos.

### Referências além da planilha atual

`Cadastro!A2` indica A2 na planilha Cadastro da mesma pasta. Nomes com espaços exigem aspas simples, como `'Cadastro Geral'!A2`. `A:A` representa a coluna A inteira. Uma referência como `[Base.xlsx]Dados!A2` aponta para outra pasta: localização, disponibilidade do arquivo e atualização do vínculo passam a importar.

## 4. Copiar fórmulas: o que se desloca e o que fica fixo

Ao copiar E2, com `=C2*D2`, para E3, resulta `=C3*D3`. O Excel conserva a distância entre a fórmula e suas referências: essa é a **referência relativa**, que permite calcular o processo seguinte.

O cifrão fixa o componente que vem depois dele. Uma referência é **absoluta** quando fixa coluna e linha; **mista** quando fixa apenas uma delas.

| Referência original | Uma coluna à direita e uma linha abaixo | Parte fixa |
|---|---|---|
| `A1` | `B2` | nenhuma |
| `$A$1` | `$A$1` | coluna e linha |
| `$A1` | `$A2` | coluna |
| `A$1` | `B$1` | linha |

Em um cálculo separado, uma taxa comum está em H1. A fórmula `=C2*D2*(1+$H$1)` usa quantidade e preço da linha, mas mantém a taxa ao ser copiada. Com H1 igual a 10%, o fator é 1,10, não 11.

Na fórmula `=$A2*B$1`, copiar uma coluna à direita e uma linha abaixo produz `=$A3*C$1`: A e 1 continuam fixos. No Excel para Windows, `F4`, durante a edição de uma referência selecionada, alterna as combinações de cifrões.

Em um **intervalo acumulado**, a origem fica fixa e o fim avança: `=MÉDIA(E$2:E2)`, escrita em outra coluna e copiada para baixo, passa a `=MÉDIA(E$2:E3)`. Já `=A1+A2` em A3, copiada para A4, vira `=A2+A3`: cada resultado pode alimentar o seguinte.

**Mover a fórmula** por recorte e colagem não ajusta suas referências internas como a cópia. Mover ou excluir as células referenciadas é outra operação: o cifrão não impede ajustes estruturais.

Se E2 contiver `=E2+1`, o resultado depende dele próprio: há **referência circular**. O ciclo também pode passar por outras células. O cálculo iterativo repete cálculos segundo limites configurados, mas só deve ser considerado quando explicitamente habilitado; não é solução automática para uma fórmula mal construída.

## 5. Total, média, ordem dos valores e contagem

### Resumir valores numéricos

Na coluna E, 200, 200, 300 e 100 totalizam 800. A média divide o total pela quantidade de números: 800 ÷ 4 = 200. São operações de **agregação**, que resumem vários valores em um resultado.

| Fórmula aplicada à base | Resultado e interpretação |
|---|---|
| `=SOMA(E2:E5)` | 800, total |
| `=MÉDIA(E2:E5)` | 200, média aritmética |
| `=MÁXIMO(E2:E5)` / `=MÍNIMO(E2:E5)` | 300 / 100, extremos |
| `=MAIOR(E2:E5;2)` | 200, segundo maior |
| `=MENOR(E2:E5;2)` | 200, segundo menor |

Em `MAIOR(intervalo;k)` e `MENOR(intervalo;k)`, `k` é a posição desejada. Repetições ocupam posições: o segundo e o terceiro maiores da base são ambos 200. Com `k=1`, obtêm-se os extremos; posição inválida, como zero ou superior à quantidade de números, gera `#NÚM!`.

**Em intervalos referenciados**, `SOMA` e `MÉDIA` ignoram texto, valores lógicos e vazios; erros podem propagar-se. Zero participa da média: apagar E5 daria média aproximada de 233,33; substituí-la por zero daria 175. Não generalize: somar diretamente um número e texto não numérico com `+` pode gerar `#VALOR!`.

### Contar não é somar — e vazio não é sempre ausência

`CONT.NÚM` conta células numéricas do intervalo, inclusive datas numéricas. `CONT.VALORES` conta células com conteúdo, incluindo textos, valores lógicos e erros. `CONTAR.VAZIO` conta células vazias **e fórmulas que retornam texto vazio** (`""`).

Em um exemplo hipotético separado, quatro células contêm, respectivamente, o número 0, o texto `Pago`, uma célula realmente vazia e a fórmula `=""`. Nesse intervalo, `CONT.NÚM` retorna 1, `CONT.VALORES` retorna 3 e `CONTAR.VAZIO` retorna 2. A última célula é contada pelas duas últimas funções, por critérios diferentes. Logo, suas contagens não precisam somar o tamanho do intervalo.

## 6. Somar e contar apenas os registros desejados

Para saber o total da Saúde, é preciso **testar a unidade em B e somar o valor correspondente em E**, sem misturar linhas. Um **critério** é a condição que seleciona quais dados entram no cálculo.

### Um critério

```text
=SOMASE(intervalo;critério;[intervalo_soma])
=SOMASE(B2:B5;"Saúde";E2:E5)
```

A segunda fórmula soma 200 + 300 + 100 e retorna 600. O terceiro argumento informa onde estão os valores. Se ele for omitido, a função testa e soma o próprio intervalo: `=SOMASE(E2:E5;">200")` retorna 300, pois exclui os valores iguais a 200.

Para contar processos, não valores monetários, use `=CONT.SE(B2:B5;"Saúde")`: resultado 3. Texto e expressões de comparação nos critérios ficam entre aspas. Uma referência de célula não fica entre aspas: com um limite em H1, `=SOMASE(E2:E5;">"&H1)` junta o operador ao conteúdo de H1. Escrever `">H1"` não realiza essa leitura da célula.

### Vários critérios simultâneos

```text
=SOMASES(intervalo_soma;intervalo_critérios1;critério1;...)
=SOMASES(E2:E5;B2:B5;"Saúde";F2:F5;"Pago")
=CONT.SES(B2:B5;"Saúde";F2:F5;"Pago")
```

As linhas 2 e 4 atendem a **Saúde e Pago**: soma 500, contagem 2. Em `SOMASES`, o intervalo somado vem **primeiro**, diferentemente de `SOMASE`. Os intervalos devem ter o mesmo número de linhas e colunas; isso também vale entre os intervalos de `CONT.SES`. Confira ainda o alinhamento dos registros.

Todos os critérios devem ser atendidos. Para Saúde **ou** Educação, podem-se somar duas chamadas de `SOMASE`, pois as categorias não se sobrepõem. Com sobreposição, esse procedimento pode contar um registro duas vezes.

### Datas e padrões de texto

Suponha que as datas dos processos sejam acrescentadas em G e que H1 e H2 contenham as datas inicial e final. Para contar datas sem componente de horário no período, inclusive os extremos:

```text
=CONT.SES(G2:G5;">="&H1;G2:G5;"<="&H2)
```

Se G também armazenar horários, `<=H2` pode excluir registros posteriores à meia-noite do último dia. Com H2 contendo apenas a data final, o critério `"<"&(H2+1)` inclui todo esse dia. Usar células com datas válidas evita depender da interpretação regional de uma data escrita como texto no critério.

Nos critérios textuais, **curingas** representam padrões: `*` corresponde a qualquer sequência de caracteres e `?` a um caractere. `"*saúde*"` encontra textos que contêm saúde. Para procurar os símbolos literalmente, use `~*` ou `~?`; `~~` representa um til literal.

## 7. Decidir entre resultados com funções lógicas

Um teste produz verdadeiro ou falso; `SE` escolhe o resultado correspondente. Em `=SE(E2>250;"Revisar";"Regular")`, E2 vale 200, portanto a saída é `Regular`. A forma é `SE(teste_lógico;valor_se_verdadeiro;valor_se_falso)`: primeiro teste, depois as duas saídas.

Para combinar testes, `E` exige **todos verdadeiros**, enquanto `OU` exige **pelo menos um verdadeiro**:

```text
=SE(E(B2="Saúde";E2>250);"Prioritário";"Normal")
=SE(OU(F2="Pendente";F2="Bloqueado");"Acompanhar";"Sem alerta")
```

A primeira exige Saúde e valor acima do limite; a segunda aceita qualquer das duas situações.

**Aninhar** é colocar uma função dentro de outra. No exemplo hipotético `=SE(A2="valor padrão";0;SE(B2>0,5;B2;-1))`, a primeira decisão é sobre A2: se o texto corresponder, retorna 0. Só no outro ramo a regra sobre B2 decide entre B2 e -1. Ler de fora para dentro evita trocar a prioridade das condições.

## 8. Buscar um valor ou buscar sua posição

Buscar exige definir **o que procurar, onde procurar e o que devolver**. Na base, os códigos são textos: número 3 e texto `003` não são automaticamente intercambiáveis.

### `PROCV`: primeira coluna e modo de correspondência

```text
=PROCV(valor_procurado;tabela;índice_coluna;[procurar_intervalo])
=PROCV("003";$A$2:$F$5;5;FALSO)
```

A segunda fórmula procura `003` na primeira coluna do intervalo, A, e retorna 300 da quinta coluna, E. O índice é contado **dentro do intervalo**, não a partir da coluna A da planilha. O retorno pode estar na própria primeira coluna, com índice 1, ou à direita; não à esquerda da coluna de busca.

`FALSO` ou `0` exige correspondência exata e dispensa ordenação. Se não houver correspondência, retorna `#N/D`. `VERDADEIRO`, `1` **ou omissão do último argumento** usa correspondência aproximada e requer a primeira coluna ordenada crescentemente. Ela encontra o valor exato ou o maior valor inferior ao procurado — não o mais próximo por arredondamento.

Em faixas hipotéticas iniciadas em 0, 100 e 250, procurar 200 seleciona a faixa 100. Abaixo do primeiro limite, ocorre `#N/D`; sem ordenação, pode haver resposta incorreta sem aviso. Para códigos, não omita o modo exato.

### `CORRESP` e `ÍNDICE`: localizar primeiro, devolver depois

`CORRESP(valor;intervalo;0)` retorna a **posição relativa** da primeira correspondência exata. Na coluna E, `=CORRESP(300;E2:E5;0)` resulta em 3: E4 é a terceira célula desse intervalo, embora esteja na linha 4 da planilha.

`ÍNDICE(matriz;núm_linha;[núm_coluna])` devolve o item na posição indicada; também há formas que retornam referências. **Matriz** é um conjunto de valores organizado em linhas ou colunas. `=ÍNDICE(B2:B5;3)` retorna Saúde. Combinando:

```text
=ÍNDICE(B2:B5;CORRESP(MÁXIMO(E2:E5);E2:E5;0))
```

`MÁXIMO` encontra 300; `CORRESP` encontra a posição 3; `ÍNDICE` devolve a unidade nessa posição. Isso permite buscar à esquerda e funciona em versões anteriores ao `PROCX`. Havendo empate no máximo, essa combinação retorna a primeira correspondência, não uma lista de todas.

Em `CORRESP`, 0 é exato; 1 (padrão) busca o maior valor menor ou igual em ordem crescente; -1 busca o menor valor maior ou igual em ordem decrescente. Omitir o modo não equivale a usar 0.

### `PROCX`: busca e retorno separados

```text
=PROCX("003";A2:A5;E2:E5;"Não encontrado")
```

A fórmula devolve 300. As matrizes de busca e retorno são separadas, permitindo buscar à esquerda ou à direita, com correspondência **exata por padrão**. A saída opcional `Não encontrado` trata ausência de correspondência, não qualquer erro. `PROCX` está no Microsoft 365 e Excel 2021/2024, **não no 2016/2019**.

## 9. Datas, horas e tratamento de texto

`HOJE()` retorna a data atual; `AGORA()` retorna data e hora atuais. São funções **voláteis**: atualizam-se quando ocorre recálculo. Não representam um relógio que muda continuamente sem recálculo. O formato pode ocultar a hora de um valor que ainda a contém.

`=TEXTO(HOJE();"dd/mm/aaaa")` devolve uma representação **textual** da data. Para montar uma identificação, `=A2&" - "&TEXTO(G2;"dd/mm/aaaa")` combina código e data num texto. Use a data numérica original para cálculos; a conversão para texto é uma operação diferente de aplicar formato de data à célula.

Para tratar um código textual como `ADM-012`, estas funções cumprem papéis distintos:

| Fórmula | Resultado |
|---|---|
| `=ESQUERDA("ADM-012";3)` | `ADM`, três caracteres iniciais |
| `=DIREITA("ADM-012";3)` | `012`, três finais |
| `=EXT.TEXTO("ADM-012";5;3)` | `012`, três caracteres a partir da posição 5 |
| `=NÚM.CARACT("ADM-012")` | 7, incluindo o hífen |

`MAIÚSCULA` e `MINÚSCULA` alteram letras para maiúsculas e minúsculas. `ARRUMAR` retira espaços comuns excedentes e mantém um entre palavras; não remove sozinho todos os tipos de espaço trazidos de páginas da Web, como o <abbr title="Espaço que impede a quebra de linha entre os termos separados">espaço não separável</abbr>. Resultados textuais, inclusive `012`, não se tornam quantidades só por conterem algarismos.

## 10. Organizar a base sem alterar indevidamente os registros

### Tabela do Excel e referências estruturadas

A base já é um intervalo organizado, mas **Inserir → Tabela** transforma esse intervalo em um objeto com cabeçalhos, filtros, estilos, expansão ao acrescentar registros e linha de totais opcional. Uma **coluna calculada** aplica uma fórmula aos registros da tabela.

`=SOMA(TabelaDespesas[Valor])` usa os nomes da tabela e da coluna: é uma **referência estruturada**, que acompanha o crescimento da base. **Tabela organiza registros; Tabela Dinâmica resume esses registros.**

### Classificar, filtrar e retirar duplicatas

Classificar muda a ordem. Para ordenar por Valor sem separar os processos de suas despesas, mova os registros completos: selecione a base ou aceite expandir a seleção. Pode haver níveis, como Unidade e depois Valor, e critérios por texto, número, data, cor ou lista personalizada.

Filtrar por `Pago` oculta temporariamente as linhas 3 e 5; não as exclui. A soma comum `=SOMA(E2:E5)` continua incluindo os valores filtrados. Para um total que acompanhe as linhas visíveis, `=SUBTOTAL(109;E2:E5)` soma ignorando linhas filtradas e ocultadas manualmente; com código 9, ignora as filtradas, mas inclui as ocultadas manualmente.

Retirar repetições exige escolher a **chave de comparação**, isto é, quais colunas tornam dois registros iguais. Se dois processos tiverem o mesmo código e unidade, mas observações diferentes, comparar apenas código e unidade em **Remover Duplicatas** conservará a primeira ocorrência e excluirá a outra linha **dentro da tabela ou intervalo**, incluindo sua observação. Dados externos à área não são deslocados por essa operação.

**Filtro Avançado**, com registros exclusivos, pode ocultar repetições ou copiar o resultado para outra área, sem apagar a base. Realçar duplicatas apenas muda a aparência. Fórmulas diferentes podem produzir duplicatas: o comando compara resultados exibidos, não a escrita da fórmula. A documentação da Microsoft adverte que formatos diferentes de uma mesma data podem fazê-la ser considerada exclusiva. Confira a chave e a apresentação antes de excluir; preserve uma cópia da base.

Nas versões com `ÚNICO`, `=ÚNICO(B2:B5)` devolve a lista Saúde e Educação sem remover registros. Uma fórmula pode gerar vários resultados que ocupam células vizinhas: é uma **matriz dinâmica**, e essa ocupação se chama **despejo**. Deixe a área livre. Esse recurso está presente no Microsoft 365 e no Excel 2021/2024, não devendo ser presumido no 2016/2019.

### Validação, formatação condicional e proteção

A **Validação de Dados** pode oferecer uma lista de situações, evitando variações como `Pago` e `Já pago`. Admite inteiro, decimal, data, hora, comprimento ou fórmula personalizada, com mensagens e alertas. **Parar** bloqueia a digitação inválida; Aviso e Informação permitem aceitá-la. Colagem e outros caminhos podem contornar a validação.

A **Formatação Condicional** altera a aparência por regras: realça pendências, duplicatas ou limites com cores, barras e ícones. Não rejeita entradas nem muda o valor armazenado. Em regras por fórmula, confira as referências e o intervalo de aplicação.

Para permitir digitação em C e D sem alterar as fórmulas de E, desbloqueiam-se as células de entrada e ativa-se **Proteger Planilha**, escolhendo as permissões. Marcar uma célula como bloqueada, sem ativar a proteção, não basta. Já **Proteger Estrutura da Pasta de Trabalho** restringe operações com abas, como inserir, excluir e renomear planilhas. Nenhuma dessas ações equivale à proteção do arquivo por senha para abertura: **restrição de edição e proteção da confidencialidade têm finalidades diferentes**.

## 11. Tabela Dinâmica: transformar registros em um relatório

Quanto cada unidade gastou em cada situação? Repetir uma fórmula para toda combinação não é a única opção. A **Tabela Dinâmica** agrupa categorias e aplica somas, contagens ou outras agregações, permitindo reorganizar o relatório sem reescrever a base.

A fonte deve ter uma linha de cabeçalhos únicos, um registro por linha, tipos coerentes por coluna e nenhum subtotal manual no meio dos registros. Escolher uma Tabela do Excel como fonte facilita incorporar novas linhas. Em **Inserir → Tabela Dinâmica**, escolhem-se a fonte e o destino; depois, distribuem-se os campos:

| Área | Configuração do exemplo | Papel |
|---|---|---|
| Linhas | Unidade | categorias na vertical |
| Colunas | Situação | categorias na horizontal |
| Valores | Soma de Valor | medida resumida em cada cruzamento |
| Filtros | um campo a selecionar, quando necessário | restringe o relatório inteiro |

O resultado mostra Saúde com 500 pagos e 100 pendentes; Educação com 200 pendentes. **Contagem de Valor**, em vez de Soma, mostraria quantos registros há, não quanto foi gasto. Campos numéricos normalmente usam Soma por padrão; textos ou tipos mistos podem levar à Contagem. Verifique a função de resumo, mesmo quando os números parecem plausíveis.

Mover Situação para Linhas muda a organização, não os registros. É possível classificar, filtrar, agrupar datas por mês, trimestre ou ano, mostrar subtotais, aplicar formatação condicional e expandir ou recolher níveis. **Mostrar detalhes** permite examinar registros que compõem um resultado, conforme a fonte e as permissões. A **segmentação de dados** oferece botões visuais para filtrar categorias.

**Alterar a base não garante atualização imediata do relatório.** Use Atualizar ou confira a atualização automática disponível e configurada naquele ambiente. Há dois problemas distintos: atualizar o resumo e assegurar que a fonte inclua as novas linhas. Atualizar um intervalo fixo não o faz abranger automaticamente registros acrescentados fora dele.

## 12. Gráficos: escolher qual relação mostrar

Um gráfico converte números em comparação visual, mas não corrige totais errados. Primeiro escolha a pergunta: comparar unidades, acompanhar meses ou examinar a distribuição das despesas requer representações diferentes.

No gráfico de totais por unidade, Saúde e Educação são **categorias**; os respectivos totais formam uma **série de dados**. Os eixos indicam categorias ou escalas; a legenda distingue séries; rótulos mostram valores ou nomes; linhas de grade ajudam a ler a escala. A **área de plotagem** contém a representação dos dados; a área do gráfico inclui também título, legenda e outros elementos.

| Relação a mostrar | Tipo e motivo |
|---|---|
| Comparação entre unidades | Colunas ou barras permitem comparar comprimentos |
| Evolução mensal | Linhas tornam visível a sequência temporal |
| Participação em um total | Pizza ou rosca, com poucas parcelas de um mesmo todo |
| Relação entre duas variáveis numéricas | Dispersão posiciona cada par por seus valores nos dois eixos |
| Distribuição das despesas por faixas | Histograma mostra quantos valores caem em cada faixa |
| Centro, dispersão e valores atípicos | Caixa e bigodes resume a distribuição e destaca pontos afastados |
| Séries de naturezas ou escalas diferentes | Gráfico combinado; eixo secundário somente com escalas bem identificadas |

No gráfico de caixa e bigodes, a **mediana** divide os dados ordenados ao meio, e os **quartis** marcam a divisão em quatro partes: o primeiro deixa aproximadamente 25% dos valores abaixo dele; o terceiro, 75%. A caixa vai do primeiro ao terceiro quartil; pontos além dos limites usados para os bigodes indicam valores potencialmente atípicos, não erros comprovados. Um histograma agrupa valores numéricos em faixas; barras de unidades administrativas comparam categorias já definidas.

Selecione os dados com seus cabeçalhos e escolha o tipo em Inserir. Revise título, unidades, séries e eixos. Efeitos tridimensionais decorativos e escalas truncadas podem distorcer a comparação. Eixo secundário exige cuidado porque alturas semelhantes podem representar magnitudes diferentes. Confira também como o gráfico trata células vazias, filtros e linhas ocultas. Duas séries que variam juntas não demonstram, por isso, que uma cause a outra.

O **Gráfico Dinâmico** acompanha a filtragem e a reorganização da Tabela Dinâmica associada. A apresentação pode mudar corretamente e ainda estar desatualizada se o resumo não tiver incorporado a fonte recente.

## 13. Diagnosticar erros antes de esconder a mensagem

Um erro informa que alguma etapa não pôde produzir o resultado esperado. Leia a fórmula na Barra de Fórmulas, examine tipos e referências e acompanhe suas dependências: **precedentes** fornecem dados à célula; **dependentes** utilizam seu resultado. O comando Avaliar Fórmula, quando disponível, permite percorrer etapas do cálculo.

| Mensagem | Causa comum a investigar |
|---|---|
| `#DIV/0!` | divisão por zero ou por célula vazia tratada como zero |
| `#VALOR!` | argumento ou tipo incompatível, como texto não numérico em divisão |
| `#NOME?` | nome não reconhecido, função mal escrita ou texto sem aspas |
| `#REF!` | referência inválida, frequentemente após exclusão |
| `#N/D` | valor não disponível, como busca exata sem correspondência |
| `#NÚM!` | argumento numérico inválido, como posição impossível em `MAIOR` |
| `#DESPEJAR!` | matriz dinâmica sem condições de ocupar a área de saída, por exemplo por células ocupadas |

Uma sequência `#####` não é necessariamente erro da fórmula: pode indicar coluna estreita para exibir o valor ou uma data/hora negativa. Investigue a exibição antes de alterar o cálculo.

`SEERRO(valor;valor_se_erro)` devolve a saída alternativa se a expressão gerar erro. `=SEERRO(PROCV("003";A2:F5;5;FALSO);"Verificar busca")` evita expor a mensagem técnica, mas **não corrige a causa**. Escrever `Cadastro ausente` para qualquer erro pode mentir sobre uma referência quebrada; devolver zero pode confundir falha com uma despesa realmente nula. Trate a apresentação somente depois do diagnóstico.

## 14. Imprimir, compartilhar e preservar o que importa

### Impressão

Defina **área de impressão**, orientação, papel, margens e escala; confira as quebras de página na visualização. Imprimir seleção, planilhas ativas ou pasta inteira são alcances diferentes.

**Títulos de impressão** repetem linhas ou colunas de identificação nas páginas; não se confundem com cabeçalhos e rodapés, usados para informações como número de página. Linhas de grade visíveis na tela não são automaticamente bordas impressas: configure sua impressão quando necessária. Ajustar todas as colunas em uma página pode reduzir demais o texto; uma página de largura não obriga uma única página de altura.

### Formato de arquivo não é apenas o nome final

Uma **macro** automatiza tarefas por instruções. Muitas usam <abbr title="Visual Basic for Applications">VBA</abbr>, linguagem de programação integrada ao Office. O formato salvo precisa preservar os recursos desejados.

| Extensão | O que considerar |
|---|---|
| `.xlsx` | pasta padrão; não armazena macros em <abbr title="Visual Basic for Applications">VBA</abbr> |
| `.xlsm` | pasta habilitada para macros |
| `.xlsb` | pasta em formato <abbr title="Formato interno do programa, não organizado como texto legível">binário</abbr>; também armazena macros |
| `.xls` | formato antigo, com limites e compatibilidade diferentes dos modernos |
| `.csv` | <abbr title="Comma-Separated Values — valores separados por vírgulas">CSV</abbr>: intercâmbio textual de dados de uma planilha, não de toda a pasta |
| `.ods` | <abbr title="OpenDocument Spreadsheet">ODS</abbr>: formato aberto de planilha, sujeito a diferenças de compatibilidade |
| `.pdf` | <abbr title="Portable Document Format">PDF</abbr>: distribuição com apresentação fixa, não pasta de fórmulas editável |

Ao exportar para <abbr title="Comma-Separated Values — valores separados por vírgulas">CSV</abbr>, o Excel salva dados da **planilha ativa** como texto: não preserva estilos, gráficos, múltiplas abas nem a estrutura de cálculo da pasta. Normalmente saem os resultados exibidos das fórmulas; se a planilha exibir as próprias fórmulas, elas podem ser exportadas como texto. Isso não torna o arquivo equivalente a uma pasta de trabalho.

Delimitador e <abbr title="Regra usada para representar caracteres no arquivo">codificação</abbr> dependem das opções e do ambiente. Na importação, números com zeros à esquerda e datas podem ser reinterpretados. Confira separador, tipos de coluna e caracteres antes de aceitar a conversão.

Não habilite macros de origem desconhecida: assinatura ou local confiável não garante código inofensivo. **Excel para a Web não cria, executa nem edita macros em <abbr title="Visual Basic for Applications">VBA</abbr>**, mas pode abrir e editar pastas que as contenham, preservando-as para o aplicativo instalado. Abrir, preservar e executar são capacidades distintas.
