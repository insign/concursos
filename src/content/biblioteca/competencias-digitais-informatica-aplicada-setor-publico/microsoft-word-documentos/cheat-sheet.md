# Microsoft Word: documentos e formatação

**Roteiro:** ambiente → objeto → alcance → efeito → formato. O edital inclui Microsoft Office sem fixar edição. Referência: Word instalado no Windows (Microsoft 365/Word 2024); versão, idioma e plataforma expressos na questão prevalecem. Word para a Web pode diferir.

## Objeto e comando

| Objeto | Propriedade/ação | Guia principal |
|---|---|---|
| caractere | fonte, tamanho, cor, negrito, sobrescrito, efeitos | Página Inicial |
| parágrafo | alinhamento, recuo, espaçamento, tabulação, borda, paginação | Página Inicial; Layout |
| lista | marcador/número, nível, recuo, continuidade | Página Inicial |
| seção | margens, orientação, papel, colunas, cabeçalho, borda da página | Layout; Design para borda |
| tabela | células, dimensões, união de células, estilo, bordas | Inserir; Layout da Tabela/Design da Tabela |
| imagem | disposição, tamanho, recorte, texto alternativo | Inserir; guia contextual |
| campo (instrução atualizável) | número de página, sumário, legenda, referência cruzada | Inserir; Referências |
| arquivo | abrir, salvar, imprimir, exportar, proteger | Arquivo (<abbr title="Tela de operações de arquivo e opções do Word">Backstage</abbr>) |

Selecionar uma palavra e centralizar atinge o **parágrafo**; negrito atinge **caracteres**. Uma linha visual pode pertencer ao mesmo parágrafo; uma página, à mesma seção que outras. **Zoom/Exibição** mudam a tela, não o tamanho impresso. Mostrar Tudo (`¶`) revela marcas de parágrafo, espaços, tabulações e quebras sem imprimi-las. Guias contextuais aparecem ao selecionar o objeto. Referências reúne sumário e notas; Correspondências, mala direta; Revisão, Editor e alterações.

## Editar e formatar

| Ao colar | Resultado |
|---|---|
| Manter Formatação de Origem | conserva aparência copiada |
| Mesclar Formatação | adapta ao destino; pode conservar ênfases |
| Manter Somente Texto | descarta aparência/objetos; tabela pode virar parágrafos; texto assume formatação do destino |
| Imagem | representação visual, sem caracteres editáveis |

Copiar conserva a origem; recortar remove a seleção e a envia à Área de Transferência; colar insere no destino. **Desfazer** (`Ctrl + Z`) reverte; **Refazer** restaura ação desfeita; **Repetir** reaplica ação compatível. `Ctrl + Y` pode refazer ou repetir conforme o estado; `F4` repete quando possível. Em **Substituir Tudo**, confira alcance, palavras inteiras e maiúsculas. **Autocorreção** substitui/formata ao digitar (Arquivo → Opções → Revisão de Texto → Opções de Autocorreção); **Editor** sugere ajustes de linguagem conforme o idioma de revisão, sem traduzir.

- **Caractere × parágrafo:** sombra/contorno e sobrescrito pertencem ao texto; alinhamento, recuo e espaços antes/depois, ao parágrafo. `Ctrl + Barra de espaços` limpa formatação manual de caractere sem apagar texto. O **Pincel de Formatação** copia propriedades, não conteúdo; inclua a marca final do parágrafo na seleção para copiar também sua formatação.
- **Margem × recuo:** margem delimita área da seção; recuo desloca o parágrafo nessa área. Primeira linha desloca só seu início; recuo deslocado deixa as demais linhas mais à direita. Entrelinhas age dentro do parágrafo; antes/depois separa parágrafos sem `Enter` vazios. **Manter com o próximo** une título e texto seguinte; **Manter linhas juntas** evita dividir o próprio parágrafo; controle de órfãs/viúvas evita linhas isoladas.
- **Tabulação × espaços:** parada esquerda/central/direita ou decimal alinha em posição definida; a de barra desenha linha vertical sem posicionar o texto. Lista numerada administra sequência; multinível, hierarquia. Digitar números à mão não assegura uma lista estruturada; ao colar, confira continuidade ou reinício.

**Estilo** é regra nomeada de formatação reutilizável: padroniza títulos e sustenta navegação, acessibilidade e sumário. Fonte grande/negrito isolados não criam título estrutural. Para atualizar estilo a partir de texto que já o usa: aplicar atributos → Página Inicial → Estilos → Atualizar para Corresponder à Seleção. **Tema** coordena cores, fontes e efeitos gerais; **modelo** fornece base com estrutura e estilos. Pincel só transfere aparência local.

## Quebras, seções e referências

| Ação | Alcance |
|---|---|
| `Enter` / `Shift + Enter` | novo parágrafo / só nova linha |
| `Ctrl + Enter` | nova página, mesma seção |
| quebra de coluna | próxima coluna de texto, que não é tabela |
| quebra de seção | novas configurações: Próxima Página, Contínua (mesma página), Página Par/Ímpar |

**Uma página intermediária em paisagem ou com borda própria:** seções antes e depois; confira *Aplicar a*. Quebra de página não isola orientação ou borda; excluir quebra de seção une trechos e pode aplicar a formatação da seção posterior. Borda de parágrafo: Página Inicial; de tabela: Design da Tabela; de página: Design → Bordas da Página (por seção). Marca-d'água: Design → Plano de Fundo da Página; sinaliza condição, sem proteger o arquivo.

**Cabeçalho/rodapé:** seção nova pode estar **Vinculada ao Anterior**; desvincule cada parte que precisa de conteúdo próprio. Primeira página e pares/ímpares são variantes independentes. Desvincular não reinicia por si a numeração: confira Formatar Números de Página. Número automático é **campo** (instrução que produz resultado), não número digitado em cada página.

**Campos e sumário:** estilos Título 1, Título 2 etc. definem hierarquia. Mudou só paginação? Atualize números. Mudou título, texto ou nível? Atualize o sumário inteiro. `F9` atualiza campos selecionados. Nota de rodapé fica no fim da página; nota de fim, do documento ou seção; número sobrescrito digitado não vincula nota. Legendas e referências cruzadas a elementos do documento usam campos atualizáveis.

## Tabela, imagem e acesso

- **Tabela:** Layout da Tabela altera estrutura, largura/altura e une/divide células; Design da Tabela muda estilo, borda e sombreamento. É editável após inserção. `Tab` vai à célula seguinte e na última pode criar linha; `Shift + Tab` volta; `Ctrl + Tab` insere tabulação na célula. Tabela do Word não é planilha Excel.
- **Imagem:** Em linha acompanha texto como caractere; flutuante tem disposição e **âncora**, vínculo a um parágrafo. Recortar oculta parte visível; redimensionar altera dimensões; comprimir pode reduzir resolução/tamanho do arquivo. Zoom só muda visualização.
- **Acessibilidade:** imagem informativa pede texto alternativo com seu sentido; a puramente decorativa pode ser marcada como tal. Use títulos hierárquicos, tabelas simples com cabeçalhos, idioma correto, links descritivos e informação que não dependa só da cor. Verificador de Acessibilidade ajuda, mas requer avaliação humana.

## Automatizar, revisar e proteger

- **Mala direta:** documento principal (texto comum) + fonte de dados (registros variáveis) → campos de mesclagem → seleção de destinatários → visualizar → concluir e mesclar. Visualização não gera a saída final.
- **Formulário:** Desenvolvedor → controles de texto, lista, seleção ou data → Restringir Edição para preenchimento → iniciar proteção (senha se necessário impedir a retirada). Limitar edição não criptografa para abertura; Word para a Web tem recursos distintos.
- **Comentário** registra discussão; **Controlar Alterações** registra propostas de edição, aceitas ou rejeitadas separadamente. Ocultar marcas, desligar o controle ou desmarcar Imprimir Marcação não elimina revisões existentes. Resolver comentário também não aceita revisão.
- **Coautoria** edita o mesmo arquivo com armazenamento, formato e permissões compatíveis (como nos serviços OneDrive/SharePoint); anexo cria cópias. Histórico de versões depende do serviço e difere das alterações controladas. **Senha para abrir** pode criptografar no desktop compatível; **Restringir Edição** limita mudanças; **Marcar como Final** só sinaliza conclusão.

## Salvar, converter e imprimir

| Formato | Lembrete |
|---|---|
| `.docx` | documento moderno editável do Word |
| `.doc` | binário antigo; pode ativar Modo de Compatibilidade, limitando recursos |
| `.odt` / `.rtf` | texto OpenDocument / enriquecido; confira conversões e perdas de recursos |
| `.txt` | texto simples, sem estilos, objetos ou campos como estruturas editáveis |
| `.pdf` | apresentação de páginas em outro arquivo, sem atualização automática pelo original |

**Salvar** atualiza o arquivo já definido; no primeiro uso, escolha nome, local e formato. **Salvar como/Salvar uma Cópia** pode preservar original e mudar esses dados. **Salvamento Automático** do Microsoft 365 requer local e formato compatíveis, como OneDrive/SharePoint Online; faça a cópia antes de editar o original quando ativo. **AutoRecuperação** guarda dados para uma falha, sem substituir salvar. Abrir um formato não garante conservação integral ao converter.

`Ctrl + P`: confira página atual, seleção ou intervalo, papel, margens, orientação, escala e marcações. Com numeração simples, Impressão Personalizada `3-9` seleciona páginas 3 a 9; numeração reiniciada por seção exige conferir a visualização. Exportar para <abbr title="Portable Document Format">PDF</abbr> cria outro arquivo, que precisa ser gerado de novo após alterações.

**Atalhos recorrentes no Word para Windows:** `Ctrl + C/X/V`, `Ctrl + Z`, `Ctrl + P`, `Ctrl + Enter`, `Shift + Enter`, `F7` (Editor), `F9` (campos). Letras de abrir, salvar, selecionar tudo, localizar e negrito variam por idioma, plataforma e personalização; use o ambiente especificado na questão.
