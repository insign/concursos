# Microsoft Excel: planilhas, fórmulas, funções e gráficos

## Roteiro de prova

**Ambiente → valor armazenado → fórmula → referências → função → critérios → resultado → apresentação.**

- Desktop, Web, versão, idioma e localidade podem mudar recursos e sintaxe.
- Valor, fórmula e formato exibido são camadas diferentes.
- Primeiro descubra o que a fórmula faz; depois calcule.

## Estrutura

| Elemento | Regra |
|---|---|
| pasta de trabalho | arquivo do Excel |
| planilha | aba dentro da pasta |
| célula | interseção de linha e coluna |
| intervalo | conjunto de células |
| Caixa de Nome | endereço/nome da seleção |
| Barra de Fórmulas | conteúdo ou fórmula da célula |

- Limpar conteúdo ≠ excluir célula.
- Ocultar ≠ remover.
- Excluir linha/coluna desloca a estrutura.

## Tipos e formatos

- números, texto, datas, horas, lógicos, vazios e erros;
- data/hora costuma ser número serial;
- `0,25` formatado como porcentagem aparece como `25%`;
- formato não altera necessariamente o valor;
- `00123` pode precisar ser texto;
- reduzir casas decimais pode arredondar só a exibição.

## Operadores e precedência

1. referência;
2. negação;
3. `%`;
4. `^`;
5. `*` e `/`;
6. `+` e `-`;
7. `&`;
8. comparações.

```text
=2+3*4       → 14
=(2+3)*4     → 20
```

- pt-BR típico: decimal `,` e argumentos `;`.
- A configuração regional prevalece.

## Referências

| Referência | Coluna | Linha |
|---|---|---|
| `A1` | varia | varia |
| `$A$1` | fixa | fixa |
| `$A1` | fixa | varia |
| `A$1` | varia | fixa |

```text
=$A2*B$1
```

Copiada uma coluna à direita e uma linha abaixo:

```text
=$A3*C$1
```

## Funções básicas

| Necessidade | Função |
|---|---|
| total | `SOMA` |
| média | `MÉDIA` |
| maior/menor | `MÁXIMO` / `MÍNIMO` |
| k-ésimo maior/menor | `MAIOR` / `MENOR` |
| contar números | `CONT.NÚM` |
| contar não vazias | `CONT.VALORES` |
| contar vazias | `CONTAR.VAZIO` |

```text
=MAIOR(E2:E100;3)
=MENOR(E2:E100;2)
```

- `MÁXIMO` = `MAIOR(...;1)`.
- `CONT.VALORES` ≠ contar números.

## Critérios

| Objetivo | Função |
|---|---|
| somar com um critério | `SOMASE` |
| somar com vários critérios | `SOMASES` |
| contar com um critério | `CONT.SE` |
| contar com vários critérios | `CONT.SES` |

### SOMASE

```text
=SOMASE(intervalo;critério;[intervalo_soma])
=SOMASE(E2:E100;">70000")
=SOMASE(B2:B100;"Saúde";E2:E100)
```

- terceiro argumento é opcional;
- sem ele, soma o próprio intervalo testado.

### SOMASES

```text
=SOMASES(intervalo_soma;intervalo_critérios1;critério1;...)
=SOMASES(E2:E500;B2:B500;"Saúde";F2:F500;"Pago")
```

- intervalo somado vem primeiro;
- todos os critérios devem ser satisfeitos.

### CONT.SES

```text
=CONT.SES(F2:F500;"Pendente";E2:E500;">100000")
```

- conta registros; não soma.

### Operador + célula

```text
=SOMASE(E2:E100;">"&H1)
```

### Curingas

- `*`: qualquer sequência;
- `?`: um caractere;
- `~`: escapa curinga literal.

## Lógica

```text
=SE(teste;verdadeiro;falso)
=SE(E(B2="Saúde";E2>100000);"Prioritário";"Normal")
=SE(OU(F2="Pendente";F2="Bloqueado");"Acompanhar";"Sem alerta")
```

- `E`: todas verdadeiras.
- `OU`: ao menos uma verdadeira.

### SE aninhado

```text
=SE(A2="valor padrão";0;SE(B2>0,5;B2;-1))
```

### SEERRO

```text
=SEERRO(PROCV(A2;Cadastro!A:D;4;FALSO);"Cadastro não localizado")
```

- melhora a saída;
- não corrige cadastro ou referência;
- devolver `0` para todo erro pode mascarar problema.

## Pesquisa e referência

### PROCV

```text
=PROCV(valor;tabela;índice_coluna;FALSO)
```

- procura na primeira coluna;
- retorna à direita;
- `FALSO`/`0`: exata;
- aproximação exige base apropriada.

### CORRESP

```text
=CORRESP(valor;intervalo;0)
```

Retorna **posição**.

### ÍNDICE

```text
=ÍNDICE(intervalo;posição)
```

Retorna o item.

### ÍNDICE + CORRESP

```text
=ÍNDICE(A2:A100;CORRESP(MÁXIMO(D2:D100);D2:D100;0))
```

- flexível;
- funciona em versões antigas;
- busca para qualquer direção.

### PROCX

```text
=PROCX(A2;Cadastro!A:A;Cadastro!D:D;"Não encontrado")
```

- exata por padrão;
- busca e retorno independentes;
- pode não existir em versão antiga.

## Datas e texto

```text
=HOJE()
=AGORA()
=TEXTO(HOJE();"dd/mm/aaaa")
=A2&" - "&B2
```

- `TEXTO` devolve texto;
- data visual ≠ necessariamente data numérica;
- `&` concatena, não soma.

## Erros

| Erro | Causa comum |
|---|---|
| `#DIV/0!` | divisão por zero |
| `#N/D` | não encontrado |
| `#NOME?` | nome inválido |
| `#REF!` | referência quebrada |
| `#VALOR!` | tipo incompatível |
| `#NÚM!` | argumento numérico inválido |
| `#DESPEJAR!` | área de matriz bloqueada |

Diagnóstico:

1. Barra de Fórmulas;
2. referências;
3. tipos;
4. Avaliar Fórmula;
5. precedentes/dependentes;
6. só então `SEERRO`.

## Tabela do Excel

- estrutura a base;
- filtros integrados;
- expansão automática;
- referências estruturadas;
- boa fonte para gráfico e Tabela Dinâmica.

```text
=SOMA(TabelaDespesas[Valor])
```

**Tabela do Excel ≠ Tabela Dinâmica.**

## Classificação e filtro

- classificar muda ordem;
- expandir seleção preserva registros;
- filtrar oculta temporariamente;
- filtro não exclui;
- ordenar só uma coluna pode corromper a relação entre campos.

## Duplicatas

| Recurso | Efeito |
|---|---|
| filtro de exclusivos | oculta/copia exclusivos |
| Remover Duplicatas | exclui linhas |
| realçar duplicatas | só formata |
| `ÚNICO` | gera matriz dinâmica, quando disponível |

- colunas selecionadas formam a chave;
- primeira ocorrência fica;
- linha inteira duplicada é removida;
- fórmulas diferentes com resultado igual podem ser duplicatas.

## Validação e formatação condicional

- validação limita entrada e pode mostrar alerta;
- colagem pode contornar certas validações;
- formatação condicional muda aparência, não valor;
- cor vermelha ≠ valor negativo.

## Tabela Dinâmica

### Fonte

- uma linha de cabeçalho;
- uma linha por registro;
- tipos coerentes;
- sem subtotais manuais;
- prefira Tabela do Excel.

### Áreas

| Área | Papel |
|---|---|
| Linhas | categorias verticais |
| Colunas | categorias horizontais |
| Valores | soma, contagem, média etc. |
| Filtros | restringe relatório inteiro |

- campos podem ser movidos;
- verifique Soma versus Contagem;
- pode filtrar, classificar, agrupar, expandir e recolher;
- datas podem ser agrupadas;
- segmentação filtra visualmente;
- alteração na fonte pode exigir **Atualizar**;
- intervalo fixo pode não incluir novas linhas.

## Gráficos

| Objetivo | Gráfico |
|---|---|
| comparar categorias | colunas/barras |
| tendência temporal | linhas |
| parte do todo | pizza/rosca, poucas categorias |
| relação de variáveis | dispersão |
| distribuição | histograma |
| quartis e atípicos | caixa e bigodes |

- evite 3D decorativo;
- título e unidade;
- eixo truncado exige cautela;
- correlação ≠ causalidade;
- Gráfico Dinâmico acompanha Tabela Dinâmica.

## Impressão

- área de impressão;
- orientação e papel;
- margens;
- escala;
- largura/altura em páginas;
- títulos repetidos;
- quebras;
- cabeçalho/rodapé;
- linhas de grade.

“Ajustar tudo em uma página” pode tornar ilegível.

## Formatos

| Formato | Regra |
|---|---|
| XLSX | padrão sem macros |
| XLSM | habilitado para macros |
| XLSB | binário |
| XLS | legado |
| CSV | uma planilha textual, sem estilos/fórmulas/gráficos |
| ODS | compatibilidade parcial |
| PDF | saída fixa |

- CSV ≠ pasta completa;
- XLSX não preserva VBA;
- macros podem executar código;
- Excel Web ≠ desktop.

## Pegadinhas finais

- pasta ≠ planilha;
- formato ≠ valor;
- limpar ≠ excluir;
- ocultar ≠ remover;
- `A1` ≠ `$A$1`;
- `CONT.NÚM` ≠ `CONT.VALORES`;
- `MÁXIMO` ≠ segundo maior;
- `SOMASE` ≠ `SOMASES`;
- `CONT.SES` conta;
- `CORRESP` retorna posição;
- `ÍNDICE` retorna item;
- `PROCV` procura na primeira coluna;
- `PROCX` depende da versão;
- `SEERRO` não corrige a causa;
- filtro ≠ Remover Duplicatas;
- Tabela ≠ Tabela Dinâmica;
- Contagem em Tabela Dinâmica pode indicar tipo misto;
- atualizar fonte ≠ atualizar relatório;
- gráfico não corrige base;
- CSV ≠ XLSX;
- Web ≠ desktop.
