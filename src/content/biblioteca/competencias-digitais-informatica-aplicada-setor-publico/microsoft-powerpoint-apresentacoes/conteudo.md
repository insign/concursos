---
schemaVersion: 1
title: "Microsoft PowerPoint: criação e apresentação de slides"
description: Criação, organização, formatação, animação, apresentação, compartilhamento, acessibilidade, impressão e exportação de apresentações no Microsoft PowerPoint.
order: 23
storageId: powerpoint-apresentacoes
---

## 1. Alterar a mensagem, a aparência ou a exibição?

**Exemplo hipotético:** uma equipe prepara uma apresentação de resultados mensais. Precisa padronizar o logotipo, mostrar uma tabela do Excel e revelar uma conclusão depois do gráfico. Essas tarefas atuam em níveis diferentes: padrão visual, conteúdo e sequência de exibição. Saber qual nível muda é mais útil do que decorar a posição de um botão.

O **PowerPoint** é o programa; a **apresentação** é o documento que ele cria e salva. Cada **slide** é uma tela desse documento. Textos, imagens, formas e gráficos são **objetos** colocados nos slides. **Seções** agrupam slides para facilitar a organização; não criam arquivos independentes.

### Ambiente de referência

O item 2.2 do edital inclui Microsoft Office sem fixar edição. A referência é o **PowerPoint instalado no Windows, especialmente Microsoft 365 e PowerPoint 2024**; conceitos estáveis também aparecem em versões anteriores. A versão para a Web funciona no navegador, e a edição para <abbr title="Sistema operacional dos computadores Mac">macOS</abbr> tem particularidades. Nomes, atalhos e recursos podem variar por versão, idioma, licença e plataforma. **Prevalece o ambiente informado na questão.**

## 2. Construir e organizar a sequência de slides

Em **Arquivo → Novo**, começa-se com uma apresentação em branco ou uma base pronta. **Página Inicial → Novo Slide** acrescenta uma tela; `Ctrl + M` é o atalho no PowerPoint para Windows. Já **Duplicar Slide** copia conteúdo e configurações do slide selecionado. Copiar e colar entre apresentações também produz cópias: editar o destino não altera automaticamente a origem.

No **modo Normal**, as miniaturas à esquerda permitem selecionar e arrastar slides; a área central edita o slide, e o painel inferior recebe anotações do apresentador. Para reorganizar uma apresentação longa, **Classificação de Slides** mostra muitas miniaturas de uma vez. Criar seções com nomes como “Resultados” e “Encaminhamentos” facilita mover blocos, mas não substitui a ordem dos slides.

**Excluir** retira o slide da apresentação. **Ocultar Slide** o mantém no arquivo e o pula na sequência normal de exibição. Ele ainda pode ser acessado deliberadamente durante a apresentação, inclusive por um <abbr title="Referência que conduz a outro slide, arquivo ou página">link</abbr>. Portanto, ocultar um anexo não protege suas informações contra quem recebe o arquivo.

### Reaproveitar um slide de outra apresentação

Ao trazer um slide de outro arquivo, escolha a aparência: **Usar Tema de Destino** adota o padrão visual da apresentação atual; **Manter Formatação Original**, também denominada **Manter Formatação de Origem**, conserva o padrão trazido. Nas versões que oferecem **Reutilizar Slides**, o caminho tradicional é **Página Inicial → Novo Slide → Reutilizar Slides**, com importação de arquivo local. Não presuma disponibilidade uniforme: a documentação informa a descontinuação da reutilização a partir de arquivos na <abbr title="Armazenamento e serviços acessados pela internet">nuvem</abbr>. Copiar e colar continua sendo uma forma de reaproveitamento.

### Encontrar a ferramenta adequada

A **Faixa de Opções** organiza comandos em guias. **Página Inicial** concentra edição, texto e slides; **Inserir**, novos objetos; **Design**, aparência geral e tamanho dos slides. **Transições** controlam a passagem entre slides; **Animações**, os efeitos nos objetos de um slide. **Apresentação de Slides** configura a execução; **Revisão** reúne recursos como ortografia e comentários; **Exibir** muda modos e acessa <abbr title="Configurações compartilhadas por slides ou páginas de saída">mestres</abbr>. Guias **contextuais**, como Formato da Imagem, aparecem conforme o objeto selecionado.

**Arquivo** abre o **Backstage**, área de operações sobre o arquivo: abrir, salvar, imprimir, exportar e consultar informações. Não é uma guia de formatação do texto selecionado.

Em **Estrutura de Tópicos**, o foco são títulos e textos estruturados, não todas as imagens e caixas avulsas. **Página de Anotações** combina slide e notas. **Modo de Leitura** reproduz a apresentação em uma janela; **Apresentação de Slides** é o modo de execução, normalmente em tela inteira. Mudar a visualização não apaga conteúdo.

## 3. Padronizar sem refazer cada slide

### Definir cores, posições e conteúdo inicial

**Tema** coordena cores, fontes — desenhos dos caracteres — e efeitos visuais. Suas **variantes** oferecem combinações alternativas. No exemplo, o tema mantém os resultados mensais com a mesma identidade visual; não decide sozinho onde ficará cada gráfico.

**Layout** define a organização dos espaços destinados ao conteúdo: título, texto, imagem ou gráfico. Essas áreas são **espaços reservados**, também chamados de <abbr title="Áreas estruturadas para receber conteúdo">placeholders</abbr>. Ao preenchê-las, o conteúdo utiliza a estrutura e a formatação previstas. Uma **caixa de texto** inserida livremente é outro objeto: não passa a ser espaço reservado de título apenas por ficar no alto do slide.

**Modelo** é uma base reutilizável que pode reunir tema, layouts e conteúdo pronto. Assim, o tema define a linguagem visual; o layout distribui os lugares; o modelo fornece um ponto de partida mais completo.

**Página Inicial → Layout** troca a organização do slide selecionado. **Redefinir** restaura posição, tamanho e formatação dos espaços reservados conforme o layout, sem apagar o conteúdo inserido. Não é um comando para excluir todos os objetos ou desfazer qualquer alteração da apresentação.

### Slide Mestre: de onde vem o padrão

O **Slide Mestre**, em **Exibir → Slide Mestre**, guarda padrões compartilhados por seus layouts e pelos slides que os utilizam. Uma apresentação pode ter mais de um mestre, cada qual com seus layouts. Alterar o mestre correto evita repetir manualmente a mesma mudança em dezenas de slides.

No exemplo hipotético, um logotipo comum pode ficar no mestre. Se apenas certos tipos de slide devem exibi-lo, pode ficar nos layouts correspondentes. Um logotipo colado manualmente em cada slide é um conjunto de objetos locais: mudar o mestre não elimina essas cópias. Formatações locais também podem se sobrepor ao padrão; reaplicar o layout ou usar Redefinir pode ser necessário.

**Mestre de Folhetos** e **Anotações Mestras** controlam outras saídas: páginas com miniaturas de slides e páginas de notas. Não substituem o Slide Mestre nem mudam automaticamente o conteúdo mostrado ao público.

### Plano de fundo e alcance da alteração

Em **Formatar Plano de Fundo**, há preenchimentos sólidos, graduais, com imagem, textura ou padrão, conforme o ambiente. Um **gradiente** faz a transição entre cores; transparência permite ver o que está atrás. Alterar o fundo dos slides selecionados não exige modificar o tema inteiro. **Aplicar a Todos** amplia o alcance para toda a apresentação.

**Ocultar Elementos Gráficos de Plano de Fundo** trata gráficos herdados; não apaga uma fotografia inserida diretamente no slide. Redefinir o fundo recupera o padrão correspondente, não remove o conteúdo local. Antes de agir, distinga fundo, elemento herdado e objeto independente.

## 4. Escolher o objeto que comunica a informação

### Texto e imagens

Textos podem ocupar espaços reservados, caixas de texto, formas ou tabelas. **WordArt** aplica efeitos decorativos ao texto, não cria um diagrama de relações. Fonte, tamanho, cor, alinhamento, marcadores, <abbr title="Deslocamentos do texto em relação aos limites de sua área">recuos</abbr> e espaçamento devem tornar a mensagem legível. Uma lista com níveis expressa hierarquia; reduzir toda a fonte para encaixar um relatório inteiro não resolve o excesso de conteúdo.

Em **Inserir → Imagens**, podem existir opções para arquivos locais ou acessíveis ao usuário, imagens de estoque da biblioteca Microsoft e imagens da internet. A disponibilidade depende do ambiente e da licença; procurar uma imagem na internet não dispensa verificar seu direito de uso.

**Redimensionar** muda largura e altura; preservar a proporção evita deformação. **Cortar** muda a área visível, podendo conservar partes ocultas no arquivo. **Remover Plano de Fundo** separa partes da imagem, não altera o fundo do slide. Correções de brilho, contraste, cor e efeitos modificam sua apresentação visual. **Compactar Imagens** reduz o tamanho do arquivo, eventualmente com perda de qualidade; pode permitir excluir áreas cortadas. Não confunda essa exclusão com apenas escondê-las pelo corte.

### Formas, diagramas e dados

**Formas** são elementos como retângulos, setas e círculos, que admitem preenchimento, contorno e texto. Um **conector** liga formas e pode acompanhar seu deslocamento. **SmartArt** monta diagramas estruturados, como <abbr title="Diagramas de órgãos ou cargos e suas relações de autoridade">organogramas</abbr>, processos, ciclos e hierarquias: serve para comunicar relações. Um **gráfico de dados**, por sua vez, representa valores numéricos; não é sinônimo de SmartArt.

Uma **tabela do PowerPoint** organiza informações em linhas e colunas para apresentação. Uma **planilha do Excel** tem células que podem armazenar valores e fórmulas para cálculo. Inserir uma tabela não transforma o slide em uma planilha. Estilos, bordas e sombreamento alteram sua aparência; mesclar reúne células, enquanto dividir cria subdivisões. Dados podem chegar como cópia editável, imagem ou <abbr title="Ligação com um arquivo externo para atualização de dados">vínculo</abbr>; a seção 6 explica essas escolhas.

Para escolher um gráfico, primeiro identifique a relação a comunicar. Categorias pedem comparação; uma sequência de meses pede evolução; partes de um total pedem composição. A tabela sintetiza essas escolhas:

| Relação desejada | Tipo e cuidado principal |
|---|---|
| comparar categorias | colunas ou barras; mantenha escala coerente |
| acompanhar evolução no tempo | linhas, como os resultados mensais do exemplo |
| mostrar partes de um total | pizza ou rosca, com poucas parcelas legíveis |
| relacionar duas medidas numéricas | dispersão, com coordenadas nos eixos horizontal e vertical |
| mostrar quantos valores caem em cada intervalo | histograma, não simples lista de categorias |
| combinar <abbr title="Conjuntos de valores representados no gráfico">séries</abbr> com comportamentos ou escalas diferentes | gráfico combinado; um <abbr title="Segunda escala de valores do gráfico">eixo secundário</abbr> exige identificação clara |

**Série** é um conjunto de valores representado no gráfico. **Eixo secundário** fornece outra escala; alturas iguais não significam valores iguais. Associação visual entre medidas não prova que uma cause a outra.

## 5. Organizar os objetos no espaço

**Alinhar** coloca bordas ou centros em uma referência comum; escolha alinhar ao slide ou aos objetos selecionados. **Distribuir** regulariza os intervalos horizontais ou verticais entre objetos — normalmente, selecione ao menos três. Não uniformiza automaticamente seus tamanhos. Grades e guias ajudam a posicionar sem integrar a apresentação projetada.

**Agrupar** permite mover, redimensionar ou animar objetos compatíveis como um conjunto, preservando seus componentes para posterior desagrupamento. Nem toda seleção permite agrupamento, especialmente quando inclui certos espaços reservados ou objetos especiais.

**Mesclar Formas** altera a geometria: **União** reúne áreas; **Interseção** conserva a área comum; **Subtração** retira de uma forma a área ocupada por outra, conforme a ordem da seleção; **Fragmentação** separa regiões; **Combinação** exclui áreas sobrepostas. Mesclar não é simplesmente agrupar.

Objetos sobrepostos formam **camadas**. **Avançar/Recuar** muda uma posição; **Trazer para Frente/Enviar para Trás** leva ao extremo da pilha. O **Painel de Seleção** ajuda a selecionar, nomear, ocultar e reorganizar objetos, inclusive os encobertos. Essa ordem visual não deve ser confundida com a ordem de <abbr title="Efeito aplicado a um objeto do slide">animação</abbr> nem com a <abbr title="Sequência em que os objetos são anunciados por um leitor de tela">ordem de leitura</abbr>.

## 6. Trazer dados do Excel: aparência, edição e atualização

A equipe do exemplo precisa decidir o que acontecerá quando a planilha mudar. **Vincular** mantém uma ligação com o arquivo de origem, permitindo atualizar a apresentação a partir dele. **Incorporar** guarda uma cópia dos dados dentro da apresentação, editável com os recursos apropriados, mas independente das alterações posteriores no arquivo original.

Uma terceira opção é **colar como imagem**: preserva a aparência capturada, mas não as células editáveis nem as fórmulas. A imagem ainda pode ser cortada ou redimensionada; “não editar como planilha” não significa “não poder modificar nada”.

| Opção | O que permanece no destino |
|---|---|
| objeto incorporado | cópia de dados editáveis; pode aumentar bastante o arquivo |
| objeto vinculado | ligação com a origem, da qual depende a atualização |
| imagem | representação visual sem edição de células |
| Usar Estilos de Destino / Manter Formatação Original | tabela editável no PowerPoint, com aparência do destino ou da origem |
| Manter Somente Texto | texto, sem preservar a estrutura de planilha |

Em **Inserir → Objeto → Criar do arquivo**, a opção **Vincular** estabelece a ligação; **Colar Especial → Colar vínculo** também pode fazê-lo, conforme a origem. Apenas manter a formatação original não cria um vínculo.

Se o arquivo de origem for movido, renomeado ou ficar sem permissão de acesso, a atualização pode falhar, embora uma representação anterior continue visível. Verifique caminho, disponibilidade e autorização antes de concluir que os dados desapareceram. Ao incorporar, examine também os dados carregados: o arquivo pode conter mais informação do que a pequena área visível no slide.

## 7. Controlar o que aparece e quando aparece

### Transição troca slides; animação atua em objetos

A **transição** é o efeito usado na passagem para um slide. Seleciona-se o slide que recebe o efeito na guia **Transições**; cada slide usa uma transição por vez. **Aplicar a Todos** repete a configuração na apresentação. As opções de direção, som e outros ajustes dependem do efeito.

**Transformar**, também chamado de **Morph**, é uma transição que cria continuidade entre objetos correspondentes em slides consecutivos. Não é uma trajetória de animação aplicada dentro de um único slide.

A **animação** atua em texto ou outros objetos do slide. **Entrada** faz aparecer; **ênfase** destaca; **saída** faz desaparecer; **trajetória de movimento** desloca por um caminho. Um objeto que só recebeu saída começa visível, até o efeito removê-lo da exibição. Um objeto com entrada ao clique espera esse evento para aparecer.

### Acumular efeitos e estabelecer dependências

Para fazer a conclusão entrar, receber destaque e sair, selecione o objeto e use **Animações → Adicionar Animação** para acrescentar os efeitos. Escolher outro efeito diretamente na galeria pode substituir o já aplicado. O **Painel de Animação** permite conferir sequência, início e duração; os números junto aos objetos indicam a sequência de execução, não o número do slide.

**Ao Clicar** exige o clique que aciona a próxima etapa. **Com o Anterior** inicia junto com o efeito anterior; **Após o Anterior**, depois que ele termina. **Duração** é quanto o efeito leva; **Atraso** é a espera adicional para começar. Repetição e outras propriedades dependem do efeito. Dizer que dois efeitos são “automáticos” não informa se são simultâneos ou sucessivos.

No exemplo hipotético, a entrada do gráfico começa ao clique e dura dois segundos. A conclusão está **Após o Anterior**, com atraso de um segundo: começa três segundos depois daquele clique. Se estivesse **Com o Anterior**, sem atraso, começaria junto com o gráfico. O exemplo supõe apenas esses efeitos, sem repetições ou outros acionamentos.

**Pincel de Animação** copia efeitos e suas características entre objetos; **Pincel de Formatação** copia aparência. Nenhum deles serve para copiar o texto da conclusão. Um **gatilho** liga a execução a um evento específico, como clicar em determinada forma. Em ambientes compatíveis, um marcador de áudio ou vídeo — ponto assinalado na reprodução — também pode disparar um efeito.

### Duração da transição não é permanência no slide

Uma transição de um segundo não manda avançar após um segundo. Em **Transições → Avançar Slide**, **Ao Clicar com o Mouse** e **Após** controlam o avanço. As duas opções podem coexistir: o avanço automático fica habilitado e o clique pode antecipá-lo. Na temporização documentada pela Microsoft, a contagem de **Após** começa quando termina a última animação ou outro efeito do slide.

Para entender a execução, separe a passagem para o slide, o estado inicial de seus objetos, as animações e o avanço seguinte. Um clique pode executar uma animação pendente em vez de mudar de slide. **Configurar animações automáticas não garante, por si só, uma apresentação inteira sem intervenção.**

## 8. Apresentar, navegar e automatizar

### O que o público vê e o que o apresentador vê

No PowerPoint instalado no Windows, `F5` inicia do começo, `Shift + F5` inicia do slide atual e `Esc` encerra. Durante a execução, número do slide seguido de `Enter` permite ir diretamente a ele. A documentação de teclado dos Estados Unidos indica `B` ou ponto para tela preta e `W` ou vírgula para tela branca; não generalize letras entre idiomas e plataformas. `F1` exibe ajuda de atalhos durante a apresentação.

O **Modo de Exibição do Apresentador** pode mostrar notas, próximo slide, tempo, caneta e apontador laser em uma tela, enquanto a outra mostra apenas os slides. Isso depende da configuração dos monitores: duplicar a tela errada pode expor as notas. **Anotações** orientam a fala; **comentários** registram discussões de revisão. Nenhum é, por natureza, texto do slide projetado.

### Mudar o percurso sem duplicar o arquivo

Um **hiperlink** leva a um destino, como outro slide, arquivo ou página. **Ações** associam respostas a clique ou passagem do mouse, conforme o ambiente: navegar, tocar som ou executar ações permitidas. **Botões de Ação** são formas com comportamento configurável. Abrir arquivos e programas envolve permissões e segurança.

**Apresentação Personalizada** seleciona slides do arquivo e define uma ordem para determinado público. Não exige criar cópias físicas. **Inserir → Zoom**, nas versões compatíveis, cria navegação visual: **Zoom de Resumo** reúne acessos, **Zoom de Slide** aponta para slides e **Zoom de Seção** para uma seção. É diferente do zoom que apenas amplia a tela de edição; o retorno ao ponto de partida depende da configuração.

### Exibição autônoma, ensaio e gravação

Em **Configurar Apresentação**, há exibição por apresentador em tela inteira, por pessoa em janela e em **quiosque**, modalidade de tela inteira com repetição até `Esc` e navegação restrita. Para funcionamento autônomo, prepare os intervalos e elimine dependências de cliques manuais; para interação, configure os caminhos necessários. Selecionar quiosque não inventa tempos de permanência.

**Testar Intervalos** ensaia e registra tempos. **Usar intervalos, se houver**, ou comando equivalente da versão, permite executá-los. **Gravar Apresentação** pode capturar narração, tempos, marcações e câmera, conforme o ambiente. Os registros ficam associados aos slides; **Exportar para Vídeo** produz outro arquivo. Capturar a apresentação e gerar o vídeo são etapas distintas, mesmo quando a interface aproxima esses comandos.

## 9. Inserir mídia sem criar dependências invisíveis

Áudio e vídeo podem estar incorporados, vinculados a arquivos externos ou, no caso de conteúdo online, depender de conexão e disponibilidade do serviço. Incorporar reduz a dependência de um caminho externo, mas aumenta o arquivo. Um **<abbr title="Codificador e decodificador de mídia">codec</abbr>** é o componente que codifica ou decodifica a mídia; a compatibilidade depende também da codificação, não só da extensão.

As ferramentas de reprodução podem definir início automático ou por clique, volume, corte de início e fim — **Aparar** — e repetição. Para vídeo, um **quadro de pôster** escolhe a imagem mostrada antes da reprodução. Para áudio, **Reproduzir em Segundo Plano** combina início automático e reprodução entre slides; não transfira essa configuração indistintamente para qualquer objeto de vídeo.

Ocultar um ícone não garante que o som tenha sido configurado para iniciar. Legendas tornam falas acessíveis. Compactar mídia pode reduzir qualidade e afetar recursos; reavalie a versão final, inclusive legendas. Antes de apresentar em outro computador, confira arquivos externos, conexão, formatos e reprodução efetiva.

## 10. Colaborar e permitir que todos compreendam

**Coautoria** é a edição compartilhada da mesma apresentação. Normalmente exige arquivo em OneDrive ou SharePoint, formato e versão compatíveis e permissão de edição. Esses serviços armazenam arquivos acessíveis pela rede. Um <abbr title="Referência que conduz a um arquivo ou outro destino">link</abbr> pode apontar para o arquivo comum; um anexo enviado a cada pessoa gera cópias independentes. Compartilhar não significa conceder automaticamente permissão para editar.

Comentários permitem discutir mudanças; o **histórico de versões** guarda estados anteriores que podem ser recuperados, conforme o armazenamento. **Comparar e Mesclar** é um recurso de versões anteriores: a Microsoft o retirou do Microsoft 365 para Windows a partir da versão **2502**. Não o trate como disponível em toda instalação atual; a documentação preserva instruções para os ambientes que ainda o oferecem.

### Acessibilidade exige estrutura, não apenas aparência

Uma pessoa que usa **leitor de tela**, programa que apresenta o conteúdo de forma falada ou acessível, precisa reconhecer títulos e percorrer objetos em ordem lógica. Use títulos descritivos, contraste, tamanho legível e informação que não dependa somente de cor. Um gráfico que distingue séries por cor deve oferecer também rótulos ou outra identificação.

**Texto alternativo** descreve o significado de um objeto visual. No gráfico hipotético, explicar a tendência e o período é mais útil do que escrever apenas “imagem de gráfico”. Elementos puramente decorativos podem ser marcados como tais. Tabelas precisam de cabeçalhos claros; vídeos com fala precisam de legendas adequadas.

**Revisão → Verificar Acessibilidade** identifica problemas, mas não certifica compreensão perfeita. No **Painel de Ordem de Leitura**, os objetos são lidos de cima para baixo; o **Painel de Seleção** representa empilhamento, e não deve ser interpretado com a mesma regra. Reordenar pode afetar sobreposições: confira tanto a leitura quanto a aparência.

## 11. Salvar, distribuir e imprimir conforme a finalidade

### Arquivo editável, apresentação imediata ou modelo?

A extensão indica o formato, não uma garantia de segurança. **Macros** são instruções programadas que automatizam ações e podem executar código. No Office, podem usar <abbr title="Visual Basic for Applications, linguagem de programação do Office">VBA</abbr>. Não habilite macros de origem desconhecida; assinatura ou aparência institucional não dispensam avaliar confiança.

| Finalidade | Sem macros desse tipo | Habilitado para macros |
|---|---|---|
| apresentação para trabalho e edição | `.pptx` | `.pptm` |
| abrir diretamente na exibição de slides | `.ppsx` | `.ppsm` |
| modelo para novas apresentações | `.potx` | `.potm` |

**`.ppsx` não é bloqueio de edição nem configuração automática de quiosque.** O arquivo pode ser aberto para edição pelo PowerPoint. `.ppt` e `.pps` são formatos antigos; `.odp` é um formato de apresentação usado também por outros programas, como LibreOffice Impress. Trocar formatos pode alterar recursos e aparência. No Impress para Windows, `Ctrl + M` também insere um slide; compartilhar um atalho não implica equivalência integral de recursos.

### Exportar muda o que o destinatário recebe

<abbr title="Portable Document Format, formato de documento portátil">PDF</abbr> preserva páginas e aparência para leitura e impressão, mas não reproduz a apresentação interativa com suas animações e temporizações. Um vídeo, como `.mp4`, registra uma sequência reproduzível, não objetos editáveis do slide. Imagens, como `.png` ou `.jpg`, representam slides visualmente. Nenhuma dessas exportações mantém, por si só, atualização automática a partir da apresentação original.

Fontes ausentes no computador de destino podem ser substituídas e mudar a distribuição do texto. Incorporá-las ao arquivo, quando permitido pela licença da fonte e pela versão, reduz esse risco; nem toda fonte permite incorporação. A exportação também pode perder legendas e recursos interativos: examine o arquivo de saída, não apenas o original.

Antes de distribuir, trabalhe sobre uma cópia e use **Arquivo → Informações → Verificar se Há Problemas → Inspecionar Documento**, conforme a versão. O **Inspetor de Documentos** procura comentários, propriedades pessoais, notas e certos conteúdos ocultos. Não remove tudo: por exemplo, não elimina imagens nas anotações. Confira ainda slides ocultos, dados incorporados, vínculos, acessibilidade e permissões. Inspeção de dados, verificação de acessibilidade e avaliação visual são tarefas diferentes.

### Escolher a saída impressa

Em **Arquivo → Imprimir**, escolha slides, intervalo ou seleção, cor, escala de cinza ou preto e branco e o formato da saída. **Slides em página inteira** mostram um por página; **Páginas de Anotações**, slide e notas; **Estrutura de Tópicos**, texto estruturado; **Folhetos**, miniaturas para o público.

Nos folhetos tradicionais do PowerPoint para Windows, há **1, 2, 3, 4, 6 ou 9 slides por página**; a opção de três inclui linhas para notas. Nove é o máximo desse conjunto de opções, não um limite universal de qualquer programa que imprima o arquivo exportado. O Mestre de Folhetos ajusta elementos como orientação, cabeçalho e rodapé dessas páginas.

**Imprimir Slides Ocultos** é uma decisão separada da ocultação na sequência de exibição. Confira a prévia: imprimir notas pode revelar informações que não seriam projetadas ao público.
