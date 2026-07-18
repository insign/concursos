# Microsoft Excel: planilhas, fórmulas, funções e gráficos

## Recorte

- Referência: Excel desktop atual para Windows, especialmente Microsoft 365 e Excel 2024.
- Conceitos estáveis também se aplicam ao Excel 2021.
- Excel para a Web não possui paridade integral com o desktop.
- Nomes de função, separadores e datas dependem do idioma e da região.
- Aqui: planilhas, fórmulas, funções e gráficos; Word e PowerPoint ficam fora do recorte.

## Estrutura

| Elemento | Regra curta |
|---|---|
| Excel | aplicativo |
| pasta de trabalho | arquivo com uma ou mais planilhas |
| planilha | folha em grade |
| linha | horizontal, identificada por número |
| coluna | vertical, identificada por letra |
| célula | interseção de linha e coluna |
| intervalo | conjunto de células |

- `B4`: coluna B, linha 4.
- `B4:D10`: intervalo contíguo, inclusive.
- Célula ativa: recebe entrada ou edição.
- Caixa de nome: referência/navegação.
- Barra de fórmulas: conteúdo e edição.
- Guia de planilha: alterna e organiza folhas.
- Alça de preenchimento: copia ou estende valores, fórmulas e séries.

## Operações

| Operação | Efeito |
|---|---|
| editar | altera conteúdo existente |
| limpar conteúdo | remove valor/fórmula; célula permanece |
| limpar formatação | preserva conteúdo; remove aparência |
| excluir célula/linha/coluna | altera a estrutura e pode deslocar dados |
| copiar fórmula | referências relativas se ajustam |
| mover fórmula | procura preservar as referências apontadas |

- Uma célula inicial com `1` pode ser copiada pela alça.
- A seleção inicial `1, 2` informa um padrão que pode continuar como `3, 4...`.

## Arquivos

| Formato | Uso/cuidado |
|---|---|
| XLSX | padrão moderno; não armazena VBA |
| XLSM | habilitado para macros/VBA |
| XLS | legado 97–2003; Modo de Compatibilidade |
| CSV | texto/valores da planilha ativa; perde estrutura e recursos |
| ODS | interoperável; sem paridade integral com XLSX |

- **Salvar:** atualiza o arquivo atual.
- **Salvar como:** muda nome, local ou formato e pode criar outra cópia.
- Abrir com sucesso não garante preservação integral.
- Excel para a Web não executa macros VBA de XLSM.
- XLS e CSV podem ser convertidos para XLSX ao abrir na Web.
- CSV não preserva várias planilhas, fórmulas editáveis, gráficos e formatação como XLSX.

## Valores e formatos

- Formato muda a exibição, não necessariamente o valor armazenado.
- `0,25` em porcentagem → `25%`.
- `25` em porcentagem → tende a `2500%`.
- Duas casas exibidas não significam valor armazenado arredondado.
- Datas/horas válidas são números; texto com aparência de data não é equivalente.
- Configuração regional afeta decimal, data e separador de argumentos.

| Recurso | Efeito |
|---|---|
| moeda/contábil | apresenta valor monetário |
| porcentagem | multiplica a exibição por 100 e acrescenta `%` |
| quebra automática | distribui texto em linhas na célula |
| mesclar células | combina área visual; evitar em bases tabulares |
| formatação condicional | muda aparência conforme regra; não muda valor |

## Fórmulas

- Começam com `=`.
- A célula mostra normalmente o resultado; a barra de fórmulas mostra a expressão.
- Componentes: constantes, referências, operadores, funções e parênteses.

```text
=SOMA(C2:C10)*(1-D1)
```

### Operadores

| Tipo | Operadores |
|---|---|
| aritmético | `+ - * / ^ %` |
| comparação | `= > < >= <= <>` |
| concatenação | `&` |
| intervalo | `:` |

- `=2+3*4` → `14`.
- `=(2+3)*4` → `20`.
- Parênteses tornam a intenção explícita.

## Referências

| Tipo | Exemplo | Ao copiar |
|---|---|---|
| relativa | `A1` | linha e coluna mudam |
| absoluta | `$A$1` | nada muda |
| coluna absoluta | `$A1` | coluna fixa; linha muda |
| linha absoluta | `A$1` | linha fixa; coluna muda |

```text
=C2*D2*(1+$H$1)
```

- Copiar para baixo: `C2/D2` viram `C3/D3`; `$H$1` permanece.
- `F4` durante a edição alterna os tipos no desktop Windows, conforme teclado/contexto.
- Outra planilha: `='Parâmetros 2026'!B2`.
- Nome de planilha com espaço usa apóstrofos.

## Cálculo e erros

| Modo | Regra |
|---|---|
| Automático | recalcula quando precedentes mudam |
| Automático exceto Tabelas de Dados | exclui esse recurso do recálculo automático |
| Manual | resultados podem ficar antigos até recalcular |

| Comando desktop Windows | Efeito |
|---|---|
| `F9` | recalcula alteradas e dependentes |
| `Shift + F9` | recalcula planilha ativa |
| `Ctrl + Alt + F9` | força recálculo nas pastas abertas |

- Precedente alimenta uma fórmula; dependente usa outro resultado.
- Referência circular: fórmula depende de si, direta ou indiretamente.

| Resultado | Causa típica |
|---|---|
| `#DIV/0!` | divisão por zero |
| `#N/D` | valor não encontrado/disponível |
| `#NOME?` | função, nome ou texto não reconhecido |
| `#REF!` | referência inválida |
| `#VALOR!` | tipo incompatível |
| `#NÚM!` | operação numérica inválida |
| `#####` | largura insuficiente ou data/hora negativa; não é erro de fórmula em regra |

- Tratar erro sem investigar pode esconder dados ausentes ou referências quebradas.

## Funções

- Em pt-BR, o separador comum de argumentos é `;`.
- Idioma inglês: `SUM`, `IF`; pt-BR: `SOMA`, `SE`.

### Agregação

| Função | Resultado |
|---|---|
| `SOMA(intervalo)` | soma |
| `MÉDIA(intervalo)` | média aritmética |
| `MÍNIMO(intervalo)` | menor número |
| `MÁXIMO(intervalo)` | maior número |

- `MÉDIA` em referências ignora vazias e texto, mas inclui zero.

### Contagem

| Função | Conta |
|---|---|
| `CONT.NÚM` | números, inclusive datas/horas válidas |
| `CONT.VALORES` | não vazias, inclusive texto, erros e `""` de fórmula |
| `CONT.SE` | células que atendem a um critério |

```text
=CONT.NÚM(C2:C100)
=CONT.VALORES(A2:A100)
=CONT.SE(F2:F100;"Pendente")
=CONT.SE(E2:E100;">="&H1)
```

- Em critérios textuais: `*` = sequência; `?` = um caractere; `~` escapa curinga.
- `CONT.SE` usa um critério; vários critérios exigem outra função da família.

### Lógica

```text
=SE(E2<=50000;"Dentro do limite";"Revisar")
=SE(E(C2>=10;D2="Ativo");"Aprovar";"Revisar")
=SE(OU(F2="Urgente";E2>100000);"Priorizar";"Fluxo normal")
```

- `SE`: escolhe entre resultado verdadeiro e falso.
- `E`: todas as condições devem ser verdadeiras.
- `OU`: pelo menos uma condição deve ser verdadeira.

### Soma condicional

```text
=SOMASE(B2:B100;"Saúde";E2:E100)
```

- Testa `B2:B100`.
- Soma os valores correspondentes de `E2:E100`.
- `SOMASE` usa um critério.

### PROCV

```text
=PROCV(A2;Cadastro!$A$2:$D$500;4;FALSO)
```

- Procura na primeira coluna da matriz.
- Retorna da primeira coluna ou de coluna à direita; nunca de coluna à esquerda da busca.
- `FALSO`/`0`: exata.
- `VERDADEIRO`/`1`/omitido: aproximada.
- Aproximada exige primeira coluna ordenada para resultado confiável.
- Índice numérico pode ficar incorreto se a estrutura da matriz mudar.

### PROCX

```text
=PROCX(A2;Cadastro!A2:A500;Cadastro!D2:D500;"Não encontrado")
```

- Correspondência exata é padrão.
- Matriz de pesquisa e retorno são separadas.
- Retorna à esquerda ou à direita.
- Permite valor explícito para “não encontrado”.
- Não existe em todas as versões perpétuas antigas.

## Base de dados

- Uma linha de cabeçalho.
- Uma linha por registro.
- Uma coluna por atributo.
- Tipo consistente em cada coluna.
- Sem linhas/colunas vazias no meio.
- Sem mesclas na área de dados.

## Tabela do Excel

Tabela ≠ qualquer intervalo.

| Recurso | Regra |
|---|---|
| cabeçalhos/filtros | integrados |
| expansão | acompanha novas linhas/colunas conforme entrada |
| coluna calculada | propaga a fórmula |
| linha de totais | costuma usar `SUBTOTAL` |
| referência estruturada | usa nome da tabela/coluna |

```text
=SOMA(Despesas[Valor])
```

- `SUBTOTAL` pode ignorar linhas filtradas.
- Tabela facilita análise; não corrige dados ruins.

## Classificação, filtro e validação

### Classificação

- Reordena registros.
- Pode usar texto, número, data, lista, cor ou ícone.
- Pode ter vários níveis.
- Classifique toda a base; uma coluna isolada pode romper os registros.

### Filtro

- Exibe linhas que atendem aos critérios.
- Oculta temporariamente as demais.
- Não exclui registros.
- Limpar filtro volta a exibir.
- Fórmula comum pode continuar calculando linhas ocultas.

### Validação

- Restringe inteiro, decimal, data, hora, texto, lista ou fórmula.
- Pode exibir mensagem de entrada e alerta de erro.
- Melhora a qualidade do cadastro.
- Não é mecanismo de segurança.
- Importações, colagens ou alterações podem deixar dados inválidos; audite.

## Gráficos

| Tipo | Uso principal |
|---|---|
| colunas | comparar categorias |
| barras | comparar categorias com rótulos longos |
| linhas | tendência em sequência ordenada/tempo |
| pizza/rosca | partes de um total; uma série e poucos itens |
| dispersão XY | relação entre pares numéricos |
| área | tendência e magnitude acumulada |
| combinação | séries de natureza/escala distinta |

- XY usa dois eixos numéricos; linhas usa eixo de categorias.
- Gráfico permanece vinculado à fonte e tende a atualizar quando ela muda.
- Tabela como fonte facilita incorporar novas linhas.
- Verifique séries, categorias, cabeçalhos, unidades e intervalos.
- Evite 3D, excesso de cores, eixo enganoso e elementos decorativos.
- Excel para a Web pode limitar fontes externas, agrupamentos e efeitos avançados.

## Impressão

Pode imprimir:

- planilha ativa;
- pasta inteira;
- seleção;
- tabela selecionada.

Configurações:

- orientação e papel;
- margens;
- escala;
- cabeçalho/rodapé;
- títulos repetidos;
- linhas de grade e cabeçalhos;
- centralização.

### Área e quebras

- Área de impressão: intervalos persistentes salvos na pasta no desktop.
- Áreas não adjacentes: áreas distintas, geralmente em páginas separadas.
- Definir área não exclui dados externos.
- Quebra automática: calculada por papel, margem, escala e conteúdo.
- Quebra manual: inserida/movida pelo usuário no desktop.
- Redefinir todas: remove quebras manuais.
- Web imprime planilha ou seleção, mas não equivale a definir área persistente.

## Pegadinhas

- Pasta contém planilhas; não são sinônimos.
- Formato visual ≠ valor armazenado.
- Copiar fórmula ≠ mover fórmula.
- `$A$1` fixa linha e coluna.
- `CONT.NÚM` ≠ `CONT.VALORES`.
- `E` exige todas; `OU` exige pelo menos uma.
- PROCV omitido usa aproximada, não exata.
- Filtro oculta; não exclui.
- Formatação condicional muda aparência; não valor.
- CSV não é pasta de trabalho completa.
- Gráfico de linhas ≠ dispersão XY.
- Área de impressão não apaga dados.
- `#####` não é, em regra, erro de fórmula.
- XLSM na Web não executa VBA.

Antes de responder, identifique: **versão, plataforma, idioma, formato, tipo de referência, modo de cálculo e operação exata**.
