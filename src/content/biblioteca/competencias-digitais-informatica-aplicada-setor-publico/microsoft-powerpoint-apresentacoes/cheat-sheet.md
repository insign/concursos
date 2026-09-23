# Microsoft PowerPoint: criação e apresentação de slides

## Mapa de decisão

**Ambiente → slide ou objeto → alcance da mudança → sequência e tempo → dependências → saída.** A edição instalada no Windows é a referência da aula; versão, idioma e plataforma informados na questão prevalecem.

## Estrutura e alcance

| Elemento | O que controla |
|---|---|
| apresentação / slide / seção | arquivo / tela individual / grupo de slides dentro do mesmo arquivo |
| tema / variante | cores, fontes e efeitos gerais / alternativa visual do tema |
| layout / espaço reservado | arranjo / área estruturada para receber título, texto ou outro conteúdo |
| Slide Mestre | padrões herdados pelos layouts e slides que os usam |
| modelo | base reutilizável com tema, layouts e eventual conteúdo |
| plano de fundo | preenchimento dos slides selecionados; **Aplicar a Todos** amplia o alcance |

- **Página Inicial:** Novo Slide (`Ctrl + M` no Windows), Layout, Redefinir, seções e organização. **Inserir:** objetos, imagens, SmartArt, links, ações, Zoom e mídia. **Design:** tema e fundo. **Transições:** passagem entre slides. **Animações:** efeitos em objetos. **Apresentação de Slides:** execução, ensaio e gravação. **Exibir:** modos e mestres. **Arquivo:** salvar, imprimir, exportar e inspecionar.
- **Redefinir** reaplica posição/formatação dos espaços reservados do layout sem apagar seu conteúdo. Caixa de texto avulsa é objeto local; mudar o mestre não elimina objetos colocados diretamente no slide. Pode ser preciso reaplicar layout para refletir mudanças herdadas.
- **Ocultar** mantém o slide no arquivo e o pula na sequência usual; **excluir** o remove. Uma seção organiza, sem gerar arquivo novo. Classificação de Slides ajuda a reordenar; a Estrutura de Tópicos mostra títulos e textos estruturados, não todas as imagens.
- **Reutilizar Slides** cria cópia independente. Usar Tema de Destino adapta aparência; Manter Formatação de Origem conserva a do arquivo importado. Alterações posteriores na origem não atualizam a cópia.

## Objetos: aparência, posição e significado

| Ação ou objeto | Gatilho de prova |
|---|---|
| alinhar / distribuir | alinhar bordas ou centros / igualar **espaços**, não tamanhos |
| agrupar / mesclar formas | tratar objetos como conjunto / alterar sua geometria |
| camadas / Painel de Seleção | sobreposição e visibilidade; não determinam sequência de animação nem ordem de leitura |
| SmartArt / gráfico de dados | diagramas de relações, como organogramas / representação de valores |
| tabela do PowerPoint / planilha do Excel | organizar dados no slide / armazenar dados e fórmulas para cálculo |
| recortar / redimensionar / compactar imagem | mudar área visível / dimensões / tamanho do arquivo, possivelmente com perda de qualidade |

Imagens podem vir do dispositivo, da biblioteca de estoque ou da internet, conforme edição e licença. Conservar proporções evita deformação; recorte simples pode deixar partes ocultas no arquivo. Em gráficos, escolha barras para categorias, linhas para tempo, pizza/rosca para poucas partes de um total, dispersão para dois valores numéricos; identifique escalas de eixos secundários.

## Sequência: transição, estado inicial, animações e avanço

| Controle | Efeito e condição |
|---|---|
| Transição | passagem **para** o slide; uma por slide; Aplicar a Todos replica |
| Transformar (Morph) | transição de continuidade entre objetos correspondentes em slides consecutivos, quando disponível |
| Animação | atua **em objeto**: Entrada faz aparecer, Ênfase destaca, Saída faz desaparecer, Trajetória desloca |
| Ao Clicar / Com o Anterior / Após o Anterior | espera comando / começa junto / começa após terminar o efeito anterior |
| Duração / Atraso | tempo do efeito / espera adicional antes de iniciá-lo |

**Adicionar Animação** acumula efeitos no mesmo objeto; selecionar outro efeito diretamente na galeria pode substituí-lo. O Painel de Animação mostra ordem e tempo; Pincel de Animação copia efeitos, enquanto Pincel de Formatação copia aparência. Gatilho inicia um efeito por evento específico, como clicar em outro objeto. Objeto apenas com Saída começa visível; com Entrada ao clique, aguarda o clique.

**Duração da transição não é permanência no slide.** Em Avançar Slide, Ao Clicar e Após podem coexistir; o clique pode antecipar o avanço automático. A contagem de **Após** começa quando termina a última animação ou outro efeito do slide. Um clique pode executar uma animação pendente antes de avançar.

## Apresentar e navegar

| Recurso | Recuperação |
|---|---|
| `F5` / `Shift + F5` / `Esc` | iniciar do começo / do slide atual / encerrar, no PowerPoint para Windows |
| Modo do Apresentador | notas, próximo slide e ferramentas na tela do apresentador; conferir configuração dos monitores para não expor notas |
| apresentação personalizada | subconjunto e ordem alternativos sem duplicar o arquivo |
| Zoom de Resumo / Seção / Slide | navegação visual; resumo e seção retornam por padrão, slide avança por padrão; opção de retorno pode mudar |
| hiperlink / ação | destino clicável / comportamento configurado como navegar ou tocar som, sujeito a permissões |

**Quiosque** exibe em tela inteira, restringe navegação e repete até `Esc`; para execução autônoma, configure intervalos e efeitos sem cliques obrigatórios. Ensaiar Intervalos registra tempos; Gravar pode capturar narração, tempo, tinta e câmera. **Exportar vídeo** produz arquivo distinto. Intervalos gravados só comandam a exibição quando o modo está configurado para usá-los.

## Excel no slide e outras dependências

| Inserção | O que ocorre se a origem mudar |
|---|---|
| tabela do PowerPoint | objeto próprio, sem vínculo com a planilha |
| objeto incorporado | cópia de dados editáveis dentro da apresentação; a origem não a atualiza |
| objeto vinculado | atualização depende do arquivo externo, caminho e acesso |
| colar como imagem | aparência independente, sem células/fórmulas editáveis; ainda permite cortar/redimensionar a imagem |
| usar estilos do destino / manter formatação original | muda aparência da tabela copiada, sem criar vínculo por si |

Áudio e vídeo podem depender de arquivo externo, internet, formato, <abbr title="Componente que codifica ou decodifica áudio e vídeo">codec</abbr>, versão e equipamento. Teste a reprodução no destino; início automático ou ao clique, volume, aparar, repetição e legenda são ajustes distintos. Ícone oculto não configura automaticamente o início do áudio.

Coautoria depende de arquivo comum, armazenamento, formato, versão e permissão. Um link para esse arquivo mantém colaboração; anexos distribuídos viram cópias independentes. Comentários de revisão diferem das anotações para apresentar; histórico de versões depende do armazenamento.

## Acessibilidade, distribuição e impressão

- Título **estrutural e exclusivo** por slide, texto alternativo para imagem informativa, elementos decorativos marcados, ordem de leitura lógica, contraste e informação além da cor. Painel de Ordem de Leitura organiza o anúncio por leitor de tela; Painel de Seleção controla camadas. Verificador de Acessibilidade ajuda, mas requer revisão humana.
- Inspecionar Documento em uma **cópia** pode localizar comentários, notas, propriedades e conteúdo oculto; verifique também slides ocultos, objetos incorporados e vínculos antes de distribuir. Fontes ausentes alteram layout; incorporação depende de licença e suporte.
- Imprimir slides, páginas de anotações, estrutura de tópicos ou **folhetos** (várias miniaturas por página). Nas opções tradicionais do PowerPoint para Windows, o folheto vai até nove slides por página; três traz linhas para notas. Slides ocultos na exibição têm opção de impressão separada.

| Formato | Uso e limite |
|---|---|
| <abbr title="PowerPoint Presentation">PPTX</abbr> / <abbr title="PowerPoint Macro-Enabled Presentation">PPTM</abbr> | apresentação editável sem / com macros em <abbr title="Visual Basic for Applications">VBA</abbr> |
| <abbr title="PowerPoint Show">PPSX</abbr> / <abbr title="PowerPoint Macro-Enabled Show">PPSM</abbr> | abre diretamente em modo de apresentação, sem / com macros; não configura quiosque |
| <abbr title="PowerPoint Design Template">POTX</abbr> / <abbr title="PowerPoint Macro-Enabled Design Template">POTM</abbr> | modelos sem / com macros |
| <abbr title="Formato legado de apresentação do PowerPoint">PPT</abbr> / <abbr title="Formato legado de exibição do PowerPoint">PPS</abbr> | formatos legados de edição / exibição |
| <abbr title="OpenDocument Presentation">ODP</abbr> | intercâmbio com possíveis diferenças de compatibilidade |
| <abbr title="Portable Document Format">PDF</abbr> / <abbr title="MPEG-4 Video">MP4</abbr> | páginas fixas / vídeo; não conservam objetos e interações editáveis do original |

Macros são rotinas que podem executar código; origem desconhecida exige cautela. Uma saída exportada não se atualiza automaticamente com a apresentação editável. A versão para a Web pode ter recursos diferentes do programa instalado.
