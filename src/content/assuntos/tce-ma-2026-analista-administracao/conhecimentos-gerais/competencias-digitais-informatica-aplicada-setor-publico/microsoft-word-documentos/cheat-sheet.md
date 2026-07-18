# Microsoft Word: documentos e formatação

## Recorte

- Referência: Word desktop atual para Windows, especialmente Microsoft 365 e Word 2024.
- Word para a Web tem conjunto de recursos diferente.
- Atalhos dependem de plataforma, idioma da interface e personalização.
- Aqui: documentos e texto; planilhas e apresentações ficam fora do recorte.

## Interface

| Elemento | Regra curta |
|---|---|
| Faixa de Opções | guias e grupos de comandos |
| Arquivo/Backstage | criar, abrir, salvar, imprimir, exportar, compartilhar e opções |
| guia contextual | aparece conforme o objeto selecionado |
| Acesso Rápido | comandos frequentes, personalizável |
| régua | recuos e tabulações |
| barra de status | página, palavras, idioma, zoom e outros estados |
| painel de navegação | pesquisa e navegação estrutural |

- `Alt` ou `F10`: Dicas de Tecla.
- Zoom muda a visualização, não a fonte nem a impressão.
- Modo de exibição muda a forma de trabalhar, não o conteúdo por si só.

## Arquivos

| Formato | Uso/cuidado |
|---|---|
| DOCX | padrão moderno do Word |
| DOC | legado; pode usar Modo de Compatibilidade |
| ODT | interoperável; pode perder recursos do Word |
| RTF | texto formatado com menos recursos |
| TXT | texto simples; perde formatação e objetos |
| PDF | layout fixo para distribuição; não é padrão editável |

- **Salvar:** atualiza arquivo/local atuais.
- **Salvar como:** muda nome, local ou formato e pode criar outra cópia.
- Primeiro salvamento define nome, local e formato.
- Modelo fornece estrutura, estilos e tema predefinidos.
- Abrir com sucesso não garante preservação integral.

### ODT

Pode perder ou alterar:

- proteção e criptografia;
- Controlar Alterações;
- temas;
- legendas automáticas;
- propriedades de seção contínua;
- campos não suportados;
- tabelas com mais de 64 colunas.

Compatibilidade ≠ equivalência.

## Navegação e seleção

| Ação | Atalho Windows |
|---|---|
| início/fim do documento | `Ctrl + Home/End` |
| palavra anterior/seguinte | `Ctrl + ←/→` |
| parágrafo anterior/seguinte | `Ctrl + ↑/↓` |
| selecionar por caractere | `Shift + ←/→` |
| selecionar por palavra | `Ctrl + Shift + ←/→` |
| selecionar até início/fim | `Ctrl + Shift + Home/End` |
| selecionar tudo no desktop pt-BR | `Ctrl + T` |

- Word desktop pt-BR: `Ctrl + A` abre documento.
- Interface inglesa/Web: `Ctrl + A` costuma selecionar tudo.
- Marcas de formatação ajudam a diagnosticar espaços, tabs, parágrafos e quebras.
- Marcas não imprimíveis normalmente não saem na impressão.

## Edição e colagem

| Comando | Efeito |
|---|---|
| copiar `Ctrl + C` | mantém original e envia cópia à Área de Transferência |
| recortar `Ctrl + X` | remove da origem e envia à Área de Transferência |
| colar `Ctrl + V` | insere no destino |
| desfazer `Ctrl + Z` | reverte ação compatível |
| refazer `Ctrl + Y` | restaura ação desfeita, se possível |
| repetir `F4` | repete última ação compatível |

### Opções de colagem

| Opção | Resultado |
|---|---|
| Manter Formatação de Origem | preserva formatação copiada |
| Mesclar Formatação | no desktop, adota estilo do destino e preserva parte da ênfase |
| Manter Somente Texto | no desktop, remove formatação e objetos; tabela pode virar parágrafos |
| Imagem | cola representação não editável como texto |

- Padrões podem variar: mesmo documento, entre documentos, conflito de estilos e outros programas.
- Word para a Web e navegadores podem oferecer um conjunto diferente de opções de colagem.
- Refazer ≠ repetir.
- Localizar procura; Substituir troca conteúdo/formatação/itens especiais.
- Substituir Tudo pode alterar ocorrências indevidas.

## Caracteres

Formatação de caractere:

- fonte e tamanho;
- negrito, itálico e sublinhado;
- tachado, sobrescrito e subscrito;
- cor e realce;
- maiúsculas/minúsculas;
- espaçamento e efeitos.

| Ação no desktop pt-BR | Atalho |
|---|---|
| negrito | `Ctrl + N` |
| itálico | `Ctrl + I` |
| sublinhado | `Ctrl + S` |
| remover formatação manual de caractere | `Ctrl + Espaço` |
| alternar capitalização | `Shift + F3` |

- Interface inglesa: negrito `Ctrl + B`; sublinhado `Ctrl + U`.
- Pincel de Formatação copia formatação, não conteúdo.
- Limpar formatação não exclui texto.

## Parágrafos

| Recurso | Efeito |
|---|---|
| alinhamento | posição horizontal das linhas |
| recuo | distância horizontal do parágrafo às margens |
| espaçamento entre linhas | distância vertical dentro do parágrafo |
| antes/depois | distância vertical entre parágrafos |
| borda/sombreamento | acabamento do texto/parágrafo conforme seleção |

### Alinhamento pt-BR

| Ação | Atalho |
|---|---|
| esquerda | `Ctrl + Q` |
| centralizar | `Ctrl + E` |
| direita | `Ctrl + R` |
| justificar | `Ctrl + J` |

- Justificar ≠ centralizar.
- Recuo ≠ margem.
- Recuo ≠ espaçamento vertical.
- Primeira linha ≠ recuo deslocado/pendente.
- `Ctrl + 1`: simples; `Ctrl + 2`: duplo; `Ctrl + 5`: 1,5.
- Espaçamento antes/depois é melhor que vários `Enter` vazios.

## Tabulações, listas e estilos

- Tabulação define posição de alinhamento; não é sequência de espaços.
- Tipos: esquerda, central, direita, decimal e barra.
- Em tabela, `Ctrl + Tab` insere tabulação na célula.
- Listas: marcadores, numeração e vários níveis.
- Digitar números manualmente não garante lista estruturada.

### Estilos e temas

- **Estilo:** conjunto nomeado e reutilizável de formatação.
- **Tema:** sistema geral de cores, fontes e efeitos.
- Estilo ≠ tema.
- Título grande/negrito ≠ título estrutural.
- Títulos estruturais alimentam navegação, acessibilidade e sumário.

## Quebras e seções

| Recurso | Efeito |
|---|---|
| `Shift + Enter` | quebra de linha; mesmo parágrafo |
| `Ctrl + Enter` | quebra de página; mesma seção |
| quebra de coluna | próxima coluna |
| quebra de seção | novo conjunto de configurações |

- Quebra de página ≠ seção.
- Seção permite variar orientação, margens, colunas, cabeçalhos e numeração.
- Tipos: próxima página, contínua, página par e página ímpar.
- Uma página isolada em paisagem costuma exigir seções antes e depois.

## Layout

- margens;
- orientação retrato/paisagem;
- tamanho do papel;
- colunas;
- quebras;
- recuos e espaçamentos.

Colunas de texto ≠ tabela.

## Cabeçalhos e paginação

- Cabeçalho: região superior.
- Rodapé: região inferior.
- Opções: primeira página diferente; pares/ímpares diferentes.
- Nova seção pode continuar **Vinculada ao Anterior**.
- Desvincular permite conteúdo independente.
- Número de página é campo, não número digitado manualmente.
- Numeração pode mudar de formato ou reiniciar por seção.

## Tabelas

- Estrutura: linhas, colunas e células.
- Operações: inserir/excluir, mesclar/dividir, distribuir, alinhar, bordas, repetir cabeçalho.
- `Tab`: próxima célula; na última, pode criar linha.
- `Shift + Tab`: célula anterior.
- `Ctrl + Tab`: tabulação dentro da célula.
- Tabela do Word ≠ planilha do Excel.

## Imagens e formas

| Disposição | Comportamento |
|---|---|
| Em linha com o texto | objeto atua como caractere |
| Flutuante | texto contorna conforme quebra escolhida |

- Âncora vincula objeto flutuante a parágrafo.
- Recortar imagem ≠ redimensionar.
- Comprimir pode reduzir resolução/tamanho do arquivo.
- Imagem informativa: texto alternativo.
- Imagem decorativa: marcar como decorativa quando disponível.

## Referências

### Sumário

- Automático: baseado em estilos de título.
- Atualizar números de página ou tabela inteira.
- Manual: não acompanha estrutura automaticamente.

### Notas e campos

- Nota de rodapé: fim da página.
- Nota de fim: fim do documento ou seção.
- Número sobrescrito digitado ≠ nota vinculada.
- Legendas identificam objetos e usam campos.
- `Ctrl + K`: hiperlink.
- `F9`: atualizar campos selecionados.

## Revisão

### Editor

- `F7`: ortografia, gramática e sugestões disponíveis.
- Depende do idioma de revisão.
- Sublinhado é sugestão, não prova infalível.
- Trocar idioma de revisão não traduz.

### Comentários x alterações

| Comentário | Controlar Alterações |
|---|---|
| observação/discussão | registra edições |
| pode ser respondido/resolvido | revisão deve ser aceita/rejeitada |
| não substitui texto diretamente | marca inserção, exclusão e formatação |

- Ocultar marcações não remove revisões.
- Desativar controle não remove revisões existentes.
- Aceitar incorpora; rejeitar descarta a alteração proposta.
- Imprimir Marcação controla a saída, não limpa o arquivo.

## Colaboração e proteção

- Coautoria exige local, formato, versão e permissão compatíveis.
- Link compartilhado: um arquivo comum.
- Anexo: cópias independentes.
- Histórico de versões depende do armazenamento compatível.

| Recurso | Regra |
|---|---|
| senha para abrir | criptografa no desktop |
| restringir edição | limita alterações |
| marcar como final | sinaliza intenção; não é criptografia robusta |

- Senha perdida pode não ser recuperável.
- Word Web não cria nem edita proteção por senha; conforme o mecanismo, o arquivo fica somente leitura ou nem abre, exigindo desktop.

## Acessibilidade

- estilos de título em ordem lógica;
- texto alternativo em imagens informativas;
- links descritivos;
- não depender apenas de cor;
- idioma correto;
- cabeçalhos de tabela;
- contraste e ordem de leitura;
- Verificador de Acessibilidade + revisão humana.

## Impressão e PDF

- `Ctrl + P`: visualização e configurações.
- Conferir impressora, intervalo, cópias, frente/verso, papel, margens e marcações.
- Página atual ≠ seleção ≠ intervalo.
- PDF gerado é outro arquivo; DOCX alterado não atualiza PDF anterior.
- Word Web usa visualização em PDF para imprimir.

## Atalhos essenciais pt-BR

Word desktop para Windows, interface pt-BR, sem personalização:

| Atalho | Ação |
|---|---|
| `Ctrl + A` | abrir |
| `Ctrl + O` | novo documento |
| `Ctrl + B` | salvar |
| `F12` | Salvar como |
| `Ctrl + T` | selecionar tudo |
| `Ctrl + C/X/V` | copiar/recortar/colar |
| `Ctrl + N/I/S` | negrito/itálico/sublinhado |
| `Ctrl + Q/E/R/J` | esquerda/centro/direita/justificar |
| `Ctrl + Z/Y` | desfazer/refazer |
| `Ctrl + P` | imprimir |
| `Ctrl + K` | hiperlink |
| `Ctrl + Shift + 8` | marcas de formatação |
| `Ctrl + Shift + E` | Controlar Alterações |

Interface inglesa e Word Web podem usar outro mapa. Sempre leia o ambiente do enunciado.

## Pegadinhas

- Word ≠ documento.
- Backstage ≠ guia comum de formatação.
- zoom ≠ tamanho da fonte;
- Salvar ≠ sempre Salvar como;
- PDF ≠ DOCX editável;
- compatível ≠ preservação integral;
- copiar ≠ recortar;
- Manter Somente Texto ≠ preservar objetos;
- caractere ≠ parágrafo;
- justificar ≠ centralizar;
- recuo ≠ margem;
- tabulação ≠ espaços;
- estilo ≠ tema;
- quebra de linha ≠ parágrafo;
- quebra de página ≠ seção;
- coluna ≠ tabela;
- número digitado ≠ campo;
- tabela Word ≠ planilha;
- comentário ≠ alteração controlada;
- ocultar ≠ remover revisão;
- desativar controle ≠ aceitar alterações;
- anexo ≠ coautoria;
- marcar como final ≠ criptografar;
- atalho pt-BR ≠ atalho inglês/Web.

## Sequência de decisão

**Ambiente → idioma → objeto → comando → formato → estrutura → dependências → efeito real.**
