# Microsoft Excel: planilhas, fórmulas, funções e gráficos

## Ordem de leitura na prova

**Ambiente e versão → tipo da célula → precedência → referências ao copiar → critérios → resultado → apresentação.**

## Estrutura, valor e aparência

| Elemento | Recuperação |
|---|---|
| pasta de trabalho | arquivo que contém planilhas |
| planilha | aba com linhas e colunas; `D7` é coluna D, linha 7 |
| intervalo | células entre extremos inclusive: `B2:E5` tem 4 × 4 células |
| Caixa de Nome | endereço ou nome da seleção |
| Barra de Fórmulas | conteúdo ou fórmula da célula ativa |

- **Número × texto:** armazene `00123` como texto para conservar zeros; formato `00000` apenas exibe zeros no número 123. Texto numérico pode ordenar por caracteres e ser ignorado por `SOMA` em intervalos.
- **Data/hora:** valores válidos são números seriais; dias inteiros e frações de dia representam data e hora. Texto que parece data pode não servir ao cálculo.
- **Valor × formato:** `0,25` em porcentagem aparece como `25%`; formatar o número 25 como porcentagem pode exibir `2500%`. Reduzir casas decimais arredonda a exibição, enquanto `ARRED` altera o resultado do cálculo.
- **Pincel de Formatação:** copia aparência, inclusive orientação, sem valor/fórmula; duplo clique permite vários destinos, conforme permissões de proteção.
- **Limpar conteúdo / limpar formato / excluir / ocultar:** os dois primeiros removem respectivamente dado ou aparência; excluir altera a estrutura e pode afetar referências; ocultar conserva dados.

## Fórmulas e referências

Uma fórmula normalmente começa com `=`. Em português do Brasil, são comuns `,` decimal e `;` entre argumentos; **a configuração regional da questão prevalece**.

| Ordem de precedência, da maior à menor | Operadores |
|---|---|
| referência | `:` intervalo; espaço, células comuns a dois intervalos (interseção); união conforme configuração |
| sinal e porcentagem | negação `-` antes de `%` |
| potência; produto; soma | `^` → `*` e `/` → `+` e `-` |
| texto; comparação | `&` concatena → `=`, `<>`, `<`, `>`, `<=`, `>=` |

Mesma prioridade: da esquerda para a direita. Parênteses antecipam o cálculo: `=2+3*4` dá 14, `=(2+3)*4` dá 20. **No Excel, a negação precede a potência:** `=-2^2` dá 4; `=-(2^2)` dá -4.

| Referência em fórmula copiada uma coluna à direita e uma linha abaixo | Resultado | Fixo |
|---|---|---|
| `A1` | `B2` | nada |
| `$A$1` | `$A$1` | coluna e linha |
| `$A1` | `$A2` | coluna |
| `A$1` | `B$1` | linha |

`=$A2*B$1` torna-se `=$A3*C$1`. `=MÉDIA(E$2:E2)` copiada para baixo mantém o início e expande o fim. **Mover** por recorte difere de copiar; excluir células referidas pode invalidá-las, mesmo com `$`. Dependência da própria célula, direta ou indireta, é **referência circular**. `Cadastro!A2` indica outra aba; referência externa depende do arquivo/caminho.

## Resumos e contagens

| Pergunta | Função e atenção |
|---|---|
| total / média / extremos | `SOMA`, `MÉDIA`, `MÁXIMO`, `MÍNIMO` |
| posição na ordem | `MAIOR(intervalo;k)` / `MENOR(intervalo;k)`; repetidos ocupam posições, `k=1` dá o extremo |
| quantos números | `CONT.NÚM`, incluindo datas numéricas |
| quantas células com conteúdo | `CONT.VALORES`, incluindo texto, erro e fórmula que retorna `""` |
| quantas parecem vazias | `CONTAR.VAZIO`, incluindo célula vazia e fórmula que retorna `""` |

Em **intervalo referenciado**, `SOMA` e `MÉDIA` ignoram texto e vazios; erros podem propagar-se, e zero participa da média. `=A1+"texto"` pode dar `#VALOR!`. Uma fórmula `=""` pode ser contada **tanto** por `CONT.VALORES` quanto por `CONTAR.VAZIO`; as contagens não formam necessariamente uma partição.

## Critérios: testar uma linha, somar ou contar outra

| Objetivo | Sintaxe e decisão |
|---|---|
| somar com um critério | `SOMASE(intervalo;critério;[intervalo_soma])`: testa o primeiro; sem terceiro, soma nele próprio |
| somar com vários | `SOMASES(intervalo_soma;intervalo_critérios1;critério1;...)`: soma primeiro, testa pares simultâneos |
| contar com um / vários | `CONT.SE(intervalo;critério)` / `CONT.SES(intervalo1;critério1;...)`: devolvem quantidade, não total |

`=SOMASE(B2:B100;"Saúde";E2:E100)` testa B e soma E na mesma linha; `=SOMASE(E2:E100;">70")` testa e soma E, excluindo 70. Alinhe os intervalos em `SOMASE`; em `SOMASES` e `CONT.SES`, mantenha **mesmas dimensões e registros correspondentes**. Todos os critérios são simultâneos.

- Comparação com célula: `">"&H1`; `">H1"` não lê H1. Em texto, `*` corresponde a qualquer sequência, `?` a um caractere e `~` permite procurar o símbolo literalmente.
- Período com hora: `=CONT.SES(G2:G100;">="&H1;G2:G100;"<"&(H2+1))`, com H1/H2 como datas válidas e H2 sem horário, inclui o último dia inteiro. `"<="&H2` exclui horários após a meia-noite de H2.

## Decisão, busca e erros

- `SE(teste;se_verdadeiro;se_falso)` escolhe um ramo; `E(...)` exige todos os testes, `OU(...)` ao menos um. Em `SE` dentro de `SE`, leia primeiro o teste externo.
- `PROCV(valor;tabela;índice_coluna;FALSO)` procura na **primeira coluna** do intervalo e retorna dela própria ou de outra à direita, pelo índice contado dentro do intervalo. `FALSO`/`0` busca exata; `VERDADEIRO`/`1` ou **argumento omitido** faz busca aproximada, com primeira coluna ordenada crescentemente (maior limite menor ou igual ao procurado). Abaixo do primeiro limite: `#N/D`.
- `CORRESP(valor;intervalo;0)` dá posição relativa da primeira correspondência exata; omitir o modo usa `1`, busca aproximada em ordem crescente. `ÍNDICE(intervalo;posição)` devolve o item. Combiná-los permite devolver coluna à esquerda; empate com `CORRESP(...;0)` usa a primeira ocorrência.
- `PROCX(valor;matriz_busca;matriz_retorno;[se_não_encontrado])` separa busca e retorno, inclusive para a esquerda, e é exata por padrão. Disponível no Microsoft 365 e Excel 2021/2024, **não** no Excel 2016/2019; a saída opcional trata ausência de correspondência, não qualquer erro.
- `HOJE()` devolve data e `AGORA()` data/hora no recálculo; `TEXTO(data;"dd/mm/aaaa")` devolve **texto**. `&` concatena. `ESQUERDA`, `DIREITA`, `EXT.TEXTO` extraem caracteres, `NÚM.CARACT` conta e `ARRUMAR` elimina espaços comuns excedentes (não todos os espaços importados da Web).

| Mensagem | Investigar primeiro |
|---|---|
| `#DIV/0!` | divisor zero ou vazio |
| `#VALOR!` | tipo incompatível |
| `#NOME?` | nome, função ou aspas |
| `#REF!` | referência invalidada |
| `#N/D` | busca sem correspondência |
| `#NÚM!` | argumento numérico impossível |
| `#DESPEJAR!` | área ocupada onde uma fórmula de matriz dinâmica tentaria preencher várias células |

`#####` pode indicar coluna estreita, sem erro na fórmula. Examine tipos, referências, precedentes (células usadas) e dependentes (que usam o resultado); Avaliar Fórmula percorre etapas. `SEERRO(valor;alternativa)` troca a saída, **sem corrigir a causa**; zero pode mascarar falha.

## Base, registros e relatório

| Ação | Efeito decisivo |
|---|---|
| Tabela do Excel | estrutura registros, filtros, expansão e referências por nome de coluna: `=SOMA(TabelaDespesas[Valor])` |
| classificar | muda ordem; expanda a seleção para manter campos na mesma linha |
| filtrar | oculta linhas, sem excluí-las; `SOMA` ainda as inclui; `SUBTOTAL(9;intervalo)` ignora filtradas e `SUBTOTAL(109;intervalo)` também ignora ocultadas manualmente |
| Remover Duplicatas | colunas escolhidas formam chave; conserva primeira ocorrência e exclui a linha duplicada **dentro da tabela/seleção**; compara resultados exibidos, até formatos de data podem afetar a comparação |
| filtrar exclusivos / `ÚNICO` | mostra ou produz lista sem apagar registros; `ÚNICO` preenche células vizinhas com os resultados em Microsoft 365 e Excel 2021/2024 |
| Validação de Dados | restringe digitação conforme regra e alerta, mas colagem pode contorná-la |
| Formatação Condicional | altera aparência por regra, sem mudar valor |
| Proteger Planilha / Proteger Estrutura da Pasta | restringem, respectivamente, edição de células e operações com abas; bloqueio de célula depende de ativar a proteção e permissões |

**Tabela Dinâmica resume, Tabela do Excel organiza.** Fonte: cabeçalhos únicos, registro por linha, tipos coerentes, sem subtotais manuais. Categorias em Linhas/Colunas, medida em Valores, filtro geral em Filtros; segmentação oferece botões. Campo numérico tende a Soma, texto/tipos mistos podem resultar em Contagem. Após mudar dados, **Atualizar** o relatório; intervalo fixo ainda pode excluir novas linhas.

## Visualizar, imprimir e salvar

| Pergunta visual | Escolha |
|---|---|
| comparar categorias / acompanhar tempo | barras ou colunas / linhas |
| partes de um todo | pizza ou rosca, poucas partes de uma mesma série |
| dois valores numéricos / distribuição em faixas | dispersão / histograma |
| mediana, quartis e pontos afastados | caixa e bigodes; quartis dividem valores ordenados em quatro partes; ponto atípico não é erro comprovado |
| séries com escalas diferentes | gráfico combinado; identifique a escala de cada eixo |

Confira título, unidade e escala: eixo truncado distorce comparação; variação conjunta não prova causalidade. Gráfico Dinâmico acompanha a Tabela Dinâmica, inclusive quando ela requer atualização.

**Impressão:** defina seleção/área, orientação, margens, quebras e escala. Títulos repetem linhas ou colunas nas páginas; cabeçalho/rodapé é outro recurso. Grade na tela não garante impressão. Ajustar tudo em uma página pode prejudicar leitura.

| Formato | Preserva ou perde |
|---|---|
| <abbr title="Pasta de trabalho do Excel em Office Open XML">XLSX</abbr> | padrão sem macros em <abbr title="Visual Basic for Applications">VBA</abbr> |
| <abbr title="Pasta de trabalho do Excel habilitada para macros">XLSM</abbr> / <abbr title="Pasta de trabalho binária do Excel">XLSB</abbr> | comportam macros; segundo é binário |
| <abbr title="Formato legado de pasta de trabalho do Excel">XLS</abbr> | formato legado, com limites de compatibilidade |
| <abbr title="Comma-Separated Values — valores separados por vírgulas">CSV</abbr> | texto da planilha ativa; não preserva abas, estilos, gráficos e estrutura de fórmulas; conferir separador, datas e zeros à esquerda |
| <abbr title="OpenDocument Spreadsheet">ODS</abbr> / <abbr title="Portable Document Format">PDF</abbr> | interoperabilidade com possíveis perdas / apresentação fixa |

Macro é uma rotina de automação que pode executar código. Excel para a Web pode abrir e preservar uma pasta com macros em <abbr title="Visual Basic for Applications">VBA</abbr>, mas não cria, executa ou edita essas macros. Recurso e sintaxe dependem da versão e do ambiente informados na questão.
