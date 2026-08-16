# Microsoft Word: documentos e formatação

## Recorte e regra de ouro

- Referência principal: Word desktop atual para Windows, especialmente Microsoft 365 e Word 2024.
- Word para a Web, macOS, idioma e personalização podem mudar recursos e atalhos.
- Resolva por **ambiente → objeto → guia → alcance → efeito real**.

## Objeto → propriedade

| Objeto | Propriedades principais |
|---|---|
| caractere | fonte, tamanho, negrito, cor, sobrescrito |
| parágrafo | alinhamento, recuo, espaçamento, tabulação |
| lista | marcador, numeração, nível, sequência |
| seção | margens, orientação, colunas, cabeçalho, paginação, borda da página |
| tabela | linhas, colunas, células, tamanho, bordas, alinhamento |
| objeto gráfico | tamanho, recorte, disposição, âncora, texto alternativo |
| campo | número de página, sumário, legenda, referência |
| arquivo | nome, local, formato, proteção, impressão, exportação |

## Comando → guia

| Tarefa | Guia/contexto |
|---|---|
| fonte, parágrafo, estilos, localizar | Página Inicial |
| tabelas, imagens, hiperlinks, cabeçalho, número de página | Inserir |
| temas, marca d'água, cor e borda da página | Design |
| margens, orientação, papel, colunas e quebras | Layout |
| sumário, notas, legendas, referências cruzadas | Referências |
| destinatários e campos de mala direta | Correspondências |
| Editor, comentários, alterações, acessibilidade | Revisão |
| modos, navegação e zoom | Exibição |
| largura, altura, mesclar/dividir células | Layout da Tabela |
| estilos e bordas da tabela | Design da Tabela |

## Arquivos

| Formato | Regra curta |
|---|---|
| DOCX | padrão moderno editável |
| DOC | legado; pode acionar compatibilidade |
| ODT | interoperável; pode perder recursos |
| RTF | formatação intermediária |
| TXT | texto simples; perde objetos e estilos |
| PDF | layout fixo; outro arquivo |

- Salvar: atualiza arquivo/local atuais.
- Salvar como: muda nome, local ou formato e pode criar cópia.
- Compatibilidade ≠ preservação integral.
- PDF já gerado não acompanha mudanças posteriores no DOCX.

## Edição e colagem

| Comando | Efeito |
|---|---|
| copiar | mantém origem |
| recortar | remove da origem e envia à Área de Transferência |
| colar | insere no destino |
| Manter Formatação de Origem | preserva formatação copiada |
| Mesclar Formatação | integra ao destino e pode manter ênfases |
| Manter Somente Texto | descarta formatação e objetos |
| Imagem | cola representação não editável como texto |

- `Ctrl + Z`: desfazer.
- `Ctrl + Y`: refazer quando possível.
- `F4`: repetir ação compatível.
- Refazer ≠ repetir.
- Substituir Tudo pode alcançar ocorrências indevidas.

## Caractere e parágrafo

| Caractere | Parágrafo |
|---|---|
| fonte, tamanho, negrito, cor | alinhamento, recuo, espaçamento |
| sobrescrito, subscrito, tachado | tabulação, bordas, paginação |

- Pincel de Formatação copia formatação, não conteúdo.
- `Ctrl + Barra de espaços`: remove formatação manual de caractere no Word para Windows.
- Recuo ≠ margem.
- Primeira linha ≠ recuo deslocado.
- Entre linhas ≠ antes/depois do parágrafo.
- Espaçamento é melhor que vários `Enter` vazios.

## Tabulações, listas, estilos e temas

- Tabulação define posição de alinhamento; não é sequência de espaços.
- Lista estruturada mantém marcador/número, nível, recuo e sequência.
- Estilo = conjunto nomeado e reutilizável.
- Tema = sistema geral de cores, fontes e efeitos.
- Modelo = base reutilizável de estrutura, estilos e tema.
- Texto grande/negrito ≠ título estrutural.
- Estilos de título alimentam navegação, acessibilidade e sumário.
- Grupo Estilos fica em **Página Inicial**.

## Quebras, seções e bordas

| Recurso | Efeito |
|---|---|
| `Shift + Enter` | nova linha, mesmo parágrafo |
| `Ctrl + Enter` | nova página, mesma seção |
| quebra de coluna | próxima coluna |
| quebra de seção | novas configurações de layout |

- Uma página isolada em paisagem costuma exigir seções antes e depois.
- Quebra de página ≠ seção.
- Colunas de texto ≠ tabela.

| Borda | Objeto | Local |
|---|---|---|
| texto/parágrafo | seleção ou parágrafo | Página Inicial |
| tabela | células/tabela | Design da Tabela |
| página | seção/documento | Design → Bordas da Página |

- Borda da Página atua por seção.
- Uma página intermediária com borda própria deve ficar em seção própria.

## Cabeçalhos e paginação

- Cabeçalho: região superior; rodapé: inferior.
- Nova seção pode permanecer **Vinculada ao Anterior**.
- Desvincular permite conteúdo independente.
- Primeira página diferente e pares/ímpares diferentes são opções próprias.
- Número de página é campo; número digitado manualmente não é paginação automática.
- Formato e início podem mudar por seção.

## Tabelas

- Linhas + colunas + células.
- Estrutura pode ser alterada depois da inserção.
- Layout da Tabela: tamanho, estrutura, mesclar e dividir.
- Design da Tabela: estilos, bordas e sombreamento.
- `Tab`: próxima célula; na última, pode criar linha.
- `Shift + Tab`: célula anterior.
- `Ctrl + Tab`: tabulação dentro da célula.
- Tabela Word ≠ planilha Excel.

## Imagens e acessibilidade

| Disposição | Comportamento |
|---|---|
| Em linha | objeto atua como caractere |
| Flutuante | texto contorna conforme a disposição |

- Âncora liga objeto flutuante a parágrafo.
- Recortar ≠ redimensionar.
- Comprimir pode reduzir resolução e tamanho do arquivo.
- Imagem informativa: texto alternativo.
- Imagem decorativa: marcar como decorativa.
- Tabela acessível: cabeçalhos e estrutura simples.
- Verificador de Acessibilidade não substitui revisão humana.

## Campos e referências

- Sumário automático depende de estilos de título.
- Mudou só paginação: atualizar números.
- Mudou título/hierarquia: atualizar tabela inteira.
- Nota de rodapé: fim da página.
- Nota de fim: fim do documento ou seção.
- Legenda e referência cruzada usam campos.
- `F9`: atualizar campos selecionados.
- Número sobrescrito digitado ≠ nota vinculada.

## Mala direta

**Documento principal + fonte de dados + campos + destinatários + visualização + concluir e mesclar.**

1. escolher cartas, etiquetas, envelopes ou mensagens;
2. selecionar a lista;
3. inserir campos;
4. filtrar e visualizar;
5. concluir após conferir.

- Fonte de dados ≠ documento principal.
- Campo de mesclagem ≠ texto fixo.
- Visualizar resultados ≠ concluir a mesclagem.

## Revisão e colaboração

| Comentário | Controlar Alterações |
|---|---|
| observação/discussão | registra edições |
| responder/resolver | aceitar/rejeitar |
| não substitui texto | marca inserção, exclusão e formatação |

- Ocultar marcações não remove revisões.
- Desativar controle não resolve revisões existentes.
- Imprimir Marcação afeta saída, não o arquivo.
- Idioma de revisão não traduz.
- Link compartilhado: mesmo arquivo.
- Anexo: cópias independentes.
- Histórico de versões depende do armazenamento.

## Proteção

| Recurso | Regra |
|---|---|
| senha para abrir | criptografia no desktop compatível |
| restringir edição | limita alterações |
| marcar como final | sinaliza intenção; não criptografa |

## Impressão

- `Ctrl + P`: visualização e configurações.
- Página atual ≠ seleção ≠ intervalo.
- Páginas 3 a 9: Impressão Personalizada, intervalo `3-9`.
- Conferir papel, orientação, margens, escala e marcações.
- Exportar PDF cria outro arquivo.

## Atalhos

- Recorrentes no Word para Windows: `Ctrl + C/X/V`, `Ctrl + Z`, `Ctrl + P`, `Ctrl + Enter`, `Shift + Enter`, `F7`, `F9`.
- Letras de abrir, salvar, selecionar tudo, negrito e sublinhado podem variar por idioma, plataforma e personalização.
- Sem ambiente delimitado, resolva pelo comando, guia e efeito.

## Pegadinhas finais

- Word ≠ DOCX.
- Backstage ≠ formatação cotidiana.
- zoom ≠ fonte;
- Salvar ≠ sempre Salvar como;
- compatível ≠ idêntico;
- copiar ≠ recortar;
- caractere ≠ parágrafo;
- recuo ≠ margem;
- tabulação ≠ espaços;
- estilo ≠ tema ≠ modelo;
- linha ≠ parágrafo;
- página ≠ seção;
- borda de parágrafo ≠ borda da página;
- coluna ≠ tabela;
- Design da Tabela ≠ Layout da Tabela;
- comentário ≠ alteração;
- ocultar ≠ remover;
- visualizar mala direta ≠ concluir;
- anexo ≠ coautoria;
- marcar como final ≠ criptografar;
- atalho localizado ≠ atalho universal.
