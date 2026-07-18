---
schemaVersion: 1
title: "Microsoft PowerPoint: criação e apresentação de slides"
description: Criação, estruturação, formatação, animação, apresentação, colaboração, impressão, exportação, compatibilidade e acessibilidade no Microsoft PowerPoint.
order: 23
storageId: powerpoint-apresentacoes
---

## 1. Recorte do assunto e referência de versão

O item do edital reúne editores de texto, planilhas e apresentações no Microsoft Office. Este assunto cobre somente o **Microsoft PowerPoint e a criação de apresentações**. Documentos do Word e planilhas, fórmulas, funções e gráficos no Excel pertencem aos assuntos anteriores. Gráficos aparecem aqui apenas como objetos inseridos em slides.

Como o edital não indica versão, a referência principal é o **PowerPoint desktop atual para Windows**, especialmente o PowerPoint para Microsoft 365 e o PowerPoint 2024. Conceitos estáveis também se aplicam ao PowerPoint 2021. Recursos podem variar conforme versão, canal de atualização, licença, plataforma, idioma da interface e uso no navegador.

Quatro distinções evitam erros recorrentes:

- a **apresentação** é o arquivo; o **slide** é uma página visual dentro dela;
- **tema**, **layout**, **modelo** e **Slide Mestre** não são sinônimos;
- **transição** atua na passagem entre slides; **animação** atua em objetos;
- PowerPoint desktop e PowerPoint para a Web não possuem paridade integral.

---

## 2. Apresentação, slide, objeto e interface

O PowerPoint é um aplicativo de apresentações. Uma apresentação pode reunir slides, e cada slide pode conter objetos como texto, imagens, formas, tabelas, gráficos, SmartArt, áudio, vídeo, links e controles de ação.

### 2.1 Hierarquia básica

| Elemento | Conceito |
|---|---|
| **PowerPoint** | aplicativo usado para criar, editar e apresentar |
| **apresentação** | arquivo que reúne slides e configurações |
| **slide** | unidade visual da apresentação |
| **objeto** | elemento selecionável e formatável dentro do slide |
| **espaço reservado** | área predefinida por um layout para título, texto ou outro conteúdo |
| **seção** | agrupamento organizacional de slides dentro da apresentação |

Uma seção facilita organizar, recolher, expandir e mover conjuntos de slides. Ela não cria outro arquivo e não é exibida como slide para a audiência.

### 2.2 Elementos da interface

| Elemento | Função principal |
|---|---|
| **barra de título** | identifica arquivo e janela e pode mostrar estado de salvamento |
| **Barra de Ferramentas de Acesso Rápido** | concentra comandos frequentes e personalizáveis |
| **Faixa de Opções** | organiza comandos em guias e grupos |
| **guias contextuais** | aparecem conforme o objeto selecionado |
| **painel de miniaturas** | seleciona, duplica, move, oculta e organiza slides |
| **painel do slide** | área principal de edição do slide ativo |
| **painel de anotações** | registra notas do apresentador vinculadas ao slide |
| **barra de status** | informa slide atual, idioma, comentários, modos e zoom, conforme configuração |

A guia **Arquivo** abre o modo Backstage, dedicado a criar, abrir, salvar, imprimir, compartilhar, exportar, consultar informações e configurar opções. Guias comuns incluem Página Inicial, Inserir, Design, Transições, Animações, Apresentação de Slides, Gravar, Revisão e Exibir; o conjunto exato varia.

O controle de **zoom** altera apenas a ampliação visual da área de trabalho; ele não modifica o conteúdo nem o layout real dos slides.

### 2.3 Operações com slides

- `Ctrl + M`: insere novo slide no desktop para Windows;
- `Ctrl + D`: duplica o slide ou objeto selecionado;
- arrastar miniaturas muda a ordem dos slides;
- **Ocultar Slide** mantém o slide no arquivo, mas o exclui do fluxo normal da apresentação;
- excluir remove o slide da apresentação;
- **Redefinir** restaura posições e formatações dos espaços reservados conforme o layout, sem significar exclusão de todo conteúdo.

Ocultar e excluir são operações diferentes. Um slide oculto ainda pode ser acessado por link, ação ou navegação deliberada.

---

## 3. Criar, abrir, salvar e escolher o formato

Uma apresentação pode começar em branco ou a partir de um **modelo**. O modelo fornece estrutura e recursos reutilizáveis para futuras apresentações. No primeiro salvamento, são definidos nome, local e formato; depois, **Salvar** atualiza o arquivo atual e **Salvar como** permite mudar nome, local ou tipo.

### 3.1 Formatos principais

| Extensão | Uso e cautela |
|---|---|
| `.pptx` | apresentação editável moderna; formato padrão sem VBA |
| `.pptm` | apresentação editável habilitada para macros VBA |
| `.potx` | modelo de apresentação sem macros |
| `.potm` | modelo habilitado para macros |
| `.ppsx` | abre diretamente no modo Apresentação de Slides; não contém VBA |
| `.ppsm` | apresentação de slides habilitada para macros |
| `.ppt` | formato binário legado do PowerPoint 97–2003 |
| `.odp` | OpenDocument Presentation; interoperável, sem garantia de paridade integral |
| `.pdf` e `.xps` | distribuição em layout fixo/final |
| `.mp4` e `.wmv` | exportação da apresentação como vídeo no desktop Windows |
| `.png`, `.jpg`, `.gif`, `.tif`, `.bmp` | exportação de slides como imagens |
| `.rtf` | estrutura textual; não preserva o conteúdo do painel de anotações |

O arquivo `.ppsx` não é necessariamente somente leitura nem deixa de ser editável: sua característica é abrir por padrão em Apresentação de Slides. O `.pptm` é adequado quando o arquivo precisa **armazenar** VBA; executar macros ainda depende de aplicativo, política e segurança.

### 3.2 Compatibilidade não significa equivalência

Salvar uma apresentação moderna como `.ppt` ou `.odp` pode alterar ou perder recursos. SmartArt, formas, animações, efeitos, mídia e outros objetos podem ser convertidos ou ter editabilidade reduzida. O **Modo de Compatibilidade** limita recursos atuais para preservar o formato antigo.

O **Verificador de Compatibilidade** identifica possíveis perdas antes de salvar em formato anterior. Apenas trocar a extensão do nome do arquivo não realiza uma conversão válida.

### 3.3 Modelos e temas salvos

Um modelo `.potx` é usado como base para novas apresentações. Um tema `.thmx` registra definições de cores, fontes e efeitos. O modelo pode incluir muito mais que o tema, como layouts, mestres, espaços reservados e conteúdo inicial.

---

## 4. Tema, variante, layout e Slide Mestre

### 4.1 Conceitos que não devem ser confundidos

| Recurso | Função |
|---|---|
| **tema** | conjunto coordenado de cores, fontes e efeitos |
| **variante** | alternativa visual de um tema, como outra combinação de cores ou fontes |
| **layout** | arranjo de espaços reservados aplicado a um slide |
| **modelo** | arquivo-base reutilizável para criar apresentações |
| **Slide Mestre** | matriz global que controla padrões de slides e seus layouts |

Aplicar outro **layout** pode reorganizar os espaços reservados do slide. Aplicar outro **tema** altera o sistema visual. Editar o **Slide Mestre** altera padrões compartilhados. Uma formatação local feita diretamente em um slide pode prevalecer sobre parte do padrão herdado.

### 4.2 Slide Mestre e layouts associados

No modo Slide Mestre, o usuário pode padronizar:

- fontes, cores, fundo e efeitos;
- logotipos e elementos repetidos;
- posição e formatação de títulos e outros espaços reservados;
- layouts disponíveis;
- rodapés e numeração;
- tamanho e orientação dos slides.

Cada Slide Mestre possui layouts associados. Uma apresentação pode conter mais de um mestre, por exemplo, quando reúne identidades visuais diferentes. Excluir um layout em uso ou modificar um mestre pode afetar vários slides.

### 4.3 Tamanho e orientação

O tamanho do slide, como widescreen `16:9` ou padrão `4:3`, pertence à apresentação. Alterá-lo pode exigir redimensionar ou reposicionar conteúdo. Não se deve presumir que o PowerPoint desktop mantém orientações diferentes para slides individuais dentro da mesma apresentação: a configuração de tamanho/orientação é geral.

---

## 5. Texto e objetos visuais

### 5.1 Texto, espaços reservados e caixas de texto

Texto pode ser digitado em um espaço reservado do layout ou em uma caixa de texto independente. O espaço reservado participa da estrutura do layout; a caixa de texto é um objeto inserido livremente.

Formatação inclui fonte, tamanho, cor, negrito, itálico, alinhamento, espaçamento, marcadores e numeração. Reduzir excessivamente a fonte para acomodar muito texto prejudica leitura e acessibilidade. A apresentação deve apoiar a exposição, e não reproduzir um documento inteiro em cada slide.

### 5.2 Tipos de objeto

| Objeto | Uso principal |
|---|---|
| **imagem** | fotografia, ilustração ou captura visual |
| **forma** | elemento geométrico, seta, chamada ou contêiner |
| **ícone** | símbolo vetorial disponível no Office compatível |
| **tabela** | dados organizados em linhas e colunas |
| **gráfico** | representação visual de dados numéricos |
| **SmartArt** | representação de processo, relação, ciclo ou hierarquia |
| **WordArt** | texto com efeitos decorativos |
| **áudio/vídeo** | mídia temporal incorporada ou vinculada |

SmartArt não é sinônimo de gráfico: o primeiro comunica relações conceituais; o segundo representa dados. Uma tabela também não se torna gráfico apenas por estar formatada.

### 5.3 Imagens e formas

Recortar altera a área visível da imagem; redimensionar altera suas dimensões exibidas; girar muda a orientação. Remover plano de fundo, correções, cor e efeitos dependem do tipo de objeto e da versão.

Em formas, **preenchimento** atua na área interna, **contorno** na borda e **efeitos** podem incluir sombra, brilho ou rotação tridimensional. Agrupar formas não as transforma em uma única imagem permanente: o grupo pode ser desfeito.

---

## 6. Posicionamento, alinhamento e camadas

### 6.1 Alinhar e distribuir

**Alinhar** coloca bordas ou centros dos objetos na mesma linha: esquerda, centro, direita, superior, meio ou inferior. **Distribuir** iguala o espaçamento horizontal ou vertical entre três ou mais objetos.

A referência pode ser:

- **Alinhar ao Slide**: usa os limites do slide;
- **Alinhar Objetos Selecionados**: usa o conjunto selecionado.

Alinhar não é distribuir. Dois objetos podem estar alinhados e ainda ter distâncias irregulares em relação aos demais.

### 6.2 Guias, grade e guias inteligentes

- **linhas de grade** formam uma malha de apoio;
- **guias estáticas** são linhas posicionadas pelo usuário;
- **guias inteligentes** aparecem dinamicamente ao mover objetos para indicar alinhamento e espaçamento.

Esses recursos ajudam no posicionamento e não são impressos como conteúdo do slide.

### 6.3 Ordem e Painel de Seleção

Objetos sobrepostos possuem ordem de empilhamento. **Trazer para Frente** e **Enviar para Trás** movem aos extremos; **Avançar** e **Recuar** alteram uma camada.

O **Painel de Seleção** auxilia a selecionar, nomear, ocultar e reorganizar objetos, especialmente quando estão sobrepostos. A ordem visual e a ordem de leitura acessível precisam ser conferidas; uma não deve ser presumida a partir da outra.

### 6.4 Agrupar

No Windows, `Ctrl + G` agrupa objetos compatíveis e `Ctrl + Shift + G` desagrupa. O agrupamento facilita mover, redimensionar e formatar um conjunto. Ele não equivale a empacotar a apresentação com arquivos externos.

---

## 7. Áudio, vídeo e compatibilidade de mídia

Mídia pode ser incorporada ao arquivo ou vinculada externamente, conforme recurso e formato. Um vínculo depende de o arquivo externo continuar acessível no caminho esperado; por isso, apresentações transportadas devem ser testadas no equipamento de destino.

Para versões atuais no Windows, a Microsoft recomenda, em regra:

- vídeo `.mp4` com codificação H.264 e áudio AAC;
- áudio `.m4a` com codificação AAC.

Extensão e codec não são a mesma coisa. Dois arquivos `.mp4` podem usar codificações diferentes e ter comportamentos distintos.

Opções de reprodução podem incluir iniciar ao clicar, automaticamente ou em sequência, repetir, ocultar sem reprodução e executar em tela inteira, conforme mídia e versão. Cortar mídia altera o trecho usado na apresentação; compactar pode reduzir tamanho e qualidade.

O comando **Otimizar Compatibilidade de Mídia**, quando disponível, tenta melhorar a reprodução em outros dispositivos. Essa operação pode remover legendas incorporadas ou faixas alternativas de áudio; acessibilidade deve ser revalidada depois dela.

---

## 8. Hiperlinks, ações e navegação não linear

Um hiperlink pode apontar para:

- página da Web;
- endereço de e-mail;
- arquivo;
- slide da mesma apresentação;
- outra apresentação.

`Ctrl + K` insere hiperlink no contexto compatível. Um texto de link deve descrever o destino; “clique aqui” isolado é pouco informativo e prejudica acessibilidade.

Um **botão de ação** é uma forma ou objeto com ação associada. A ação pode ocorrer por clique ou passagem do ponteiro e navegar para outro slide, URL ou apresentação, tocar som ou, em ambientes compatíveis, executar macro/programa. Executar código tem implicações de segurança e não equivale a seguir um link comum.

Links internos e botões de ação permitem apresentações não lineares, menus e quiosques. A navegação deve ser testada, inclusive para garantir um caminho de retorno.

---

## 9. Transições e animações

### 9.1 Diferença central

| Recurso | Atua sobre | Exemplo |
|---|---|---|
| **transição** | passagem do slide atual para o seguinte | Esmaecer, Empurrar, Transformar |
| **animação** | objeto dentro do slide | entrada, ênfase, saída, trajetória |

Um slide recebe uma transição por vez. Ele pode conter várias animações em objetos diferentes. **Transformar (Morph)** é uma transição, embora produza sensação de movimento de objetos.

### 9.2 Configuração de transições

É possível definir efeito, opções do efeito, duração, som e forma de avanço:

- ao clicar;
- automaticamente após um intervalo;
- combinação dos dois, conforme configuração.

**Aplicar a Todos** copia a configuração de transição para todos os slides; não significa aplicar animações a todos os objetos.

### 9.3 Tipos e sequência de animações

Tipos usuais:

- **entrada**: objeto passa a aparecer;
- **ênfase**: objeto já visível recebe destaque;
- **saída**: objeto deixa de aparecer;
- **trajetória de movimento**: objeto percorre um caminho.

O início pode ser **Ao Clicar**, **Com o Anterior** ou **Após o Anterior**. Duração controla quanto o efeito leva; atraso define quanto se espera antes de começar. O **Painel de Animação** mostra e permite reorganizar efeitos. Um **gatilho** associa o início a uma ação específica, como clicar em determinado objeto.

Excesso de efeitos, sons e movimentos prejudica clareza e pode causar barreiras. Efeito visual deve ter finalidade comunicativa.

---

## 10. Modos de exibição e apresentação

### 10.1 Modos de criação e organização

| Modo | Finalidade |
|---|---|
| **Normal** | edição cotidiana com miniaturas, slide ativo e anotações |
| **Classificação de Slides** | reorganizar miniaturas e seções em visão global |
| **Estrutura de Tópicos** | trabalhar principalmente com títulos e texto, sem representar imagens e objetos gráficos |
| **Página de Anotações** | editar e revisar a página de notas de cada slide |
| **Slide Mestre** | alterar padrões universais de slides e layouts |
| **Mestre de Folheto** | padronizar folhetos impressos |
| **Mestre de Anotações** | padronizar páginas de anotações |

### 10.2 Modos de apresentação

- **Apresentação de Slides**: ocupa a tela para exibição à audiência;
- **Modo de Leitura**: reproduz com controles simples em uma janela;
- **Modo do Apresentador**: mostra ao apresentador slide atual, próximo slide, notas, tempo e ferramentas, enquanto a audiência vê a apresentação.

No Windows:

| Ação | Atalho |
|---|---|
| iniciar do primeiro slide | `F5` |
| iniciar do slide atual | `Shift + F5` |
| iniciar no Modo do Apresentador | `Alt + F5` |
| encerrar | `Esc` |
| avançar | `N`, `Enter`, `Espaço`, `→` ou `↓` |
| voltar | `P`, `Backspace`, `←` ou `↑` |
| ir a slide específico | número do slide e `Enter` |
| tela preta | `B` ou `.` |
| tela branca | `W` ou `,` |

Atalhos com letras ou sinais podem variar com idioma e layout de teclado. O Modo do Apresentador depende da configuração de monitores; as notas não devem aparecer para a audiência quando as telas estão corretamente configuradas.

---

## 11. Anotações, folhetos, rodapés e impressão

**Anotações do apresentador** são vinculadas ao slide e podem aparecer na Página de Anotações e no Modo do Apresentador. Elas não são objetos visíveis no slide para a audiência por padrão.

**Folhetos** destinam-se à audiência e podem imprimir várias miniaturas por página, com ou sem espaço para anotações. Folheto não é sinônimo de Página de Anotações.

Em slides, os campos usuais são data/hora, número do slide e texto de rodapé. Cabeçalhos são especialmente associados a folhetos e páginas de anotações. **Não mostrar no slide de título** suprime os campos configurados naquele layout de título, sem apagar os dados da apresentação.

No desktop, a impressão pode abranger:

- apresentação inteira, intervalo ou seleção;
- slides de página inteira;
- páginas de anotações;
- estrutura de tópicos;
- folhetos com diferentes quantidades de slides por página;
- cor, tons de cinza ou preto e branco.

O Mestre de Folheto e o Mestre de Anotações controlam padrões das respectivas saídas; o Slide Mestre não substitui esses dois.

---

## 12. Ensaio, gravação e apresentação personalizada

### 12.1 Ensaiar intervalos

**Ensaiar Intervalos** mede o tempo gasto em cada slide e pode salvar temporizações para avanço automático. O ensaio não grava necessariamente narração ou câmera.

### 12.2 Gravar apresentação

O recurso de gravação pode registrar, conforme versão:

- narração;
- câmera;
- tinta digital e ponteiro;
- animações;
- tempos de slides.

A gravação fica incorporada à apresentação. **Exportar para vídeo** é uma etapa diferente que produz um arquivo de vídeo. Regravar um slide pode substituir a gravação daquele slide.

### 12.3 Apresentação personalizada

Uma apresentação personalizada define uma sequência ou subconjunto de slides para determinado público. Ela não exige excluir os demais slides do arquivo.

- **básica**: lista slides escolhidos em determinada ordem;
- **hiperlinkada**: usa links e ações para navegar entre seções ou subconjuntos.

Esse recurso permite reutilizar a mesma apresentação para públicos diferentes. O PowerPoint para a Web não oferece o conjunto completo de criação e configuração disponível no desktop.

---

## 13. Colaboração e PowerPoint para a Web

Ao armazenar uma apresentação em OneDrive ou SharePoint compatível, é possível compartilhar um link com permissão de visualização ou edição. A coautoria permite que várias pessoas editem o mesmo arquivo; comentários registram observações e conversas, não substituem alterações no conteúdo.

### 13.1 Desktop e navegador

| Recurso | Desktop Windows | PowerPoint para a Web |
|---|---|---|
| salvamento | amplo controle de Salvar, Salvar como e formatos | salvamento automático; download de cópias em formatos suportados |
| arquivos antigos `.ppt/.pps` | abre e edita em compatibilidade | visualiza e converte cópia moderna para editar |
| macros | pode armazenar e executar conforme segurança | arquivos podem ser visualizados, mas macros não executam |
| mestres e Estrutura de Tópicos | disponíveis | modos Mestres e Estrutura exigem desktop na comparação oficial |
| Modo do Apresentador | disponível | exige desktop na comparação oficial |
| gráficos e equações | inserção e edição | não são inseridos na Web segundo a comparação oficial consultada |
| mídia local | inserção ampla | para inserir áudio/vídeo do computador, usa-se o desktop |
| temas, animações e transições | conjunto completo da versão | galerias e edição mais limitadas; recursos desktop podem ser preservados |
| coautoria e comentários | disponíveis com armazenamento compatível | disponíveis |

O PowerPoint para a Web edita `.pptx`, `.ppsx`, `.potx` e `.odp` conforme a tabela oficial atual. Arquivos habilitados para macro podem ser visualizados, mas o navegador não executa macros. Recursos ausentes no navegador podem permanecer preservados no arquivo sem serem editáveis ali.

---

## 14. Exportação, portabilidade e fontes

### 14.1 PDF, vídeo e imagens

- **PDF/XPS** preserva layout para distribuição, mas perde a experiência interativa completa da apresentação;
- **vídeo** reproduz tempos, narrações e efeitos incluídos conforme opções de exportação, sem exigir PowerPoint para assistir;
- exportar como **imagem** cria uma imagem de cada slide ou somente do slide escolhido.

Um PDF não é o formato editável padrão e não mantém, como experiência de apresentação, animações, transições e links complexos da mesma forma que o arquivo original.

### 14.2 Empacotar para CD ou unidade USB

No desktop Windows, **Empacotar Apresentação para CD** pode copiar a apresentação para uma pasta ou unidade USB e incluir arquivos vinculados e fontes TrueType permitidas. Isso é diferente de agrupar objetos e de apenas copiar o `.pptx` sem suas dependências.

### 14.3 Incorporar fontes

Em **Arquivo > Opções > Salvar**, versões compatíveis permitem incorporar fontes ao arquivo:

- incorporar somente caracteres usados reduz o arquivo, mas limita edição com novos caracteres;
- incorporar todos os caracteres aumenta o arquivo e favorece edição por terceiros;
- nem toda fonte permite incorporação por licença ou tecnologia.

Se uma fonte não estiver disponível nem incorporada, pode haver substituição e alteração de quebras, alinhamentos e aparência.

---

## 15. Acessibilidade

O **Verificador de Acessibilidade**, aberto por Revisão > Verificar Acessibilidade, identifica problemas e sugere correções. Ele auxilia, mas não substitui revisão humana e teste com tecnologia assistiva.

### 15.1 Checklist essencial

- atribuir título único e descritivo a cada slide;
- usar layouts internos e conferir a ordem lógica de leitura;
- fornecer texto alternativo conciso e útil a imagens, gráficos, SmartArt, formas, grupos, objetos e vídeos informativos;
- marcar como decorativo o que não transmite informação, quando o recurso estiver disponível;
- usar texto de hiperlink que identifique o destino;
- não depender apenas de cor para transmitir significado;
- manter contraste suficiente, fontes legíveis e espaço em branco;
- preferir tabelas simples, com cabeçalhos e sem células mescladas ou aninhadas desnecessariamente;
- incluir legendas, subtítulos e descrição de vídeo quando necessários;
- verificar acessibilidade antes de exportar PDF.

A ordem visual aparente pode não ser a ordem lida por um leitor de tela. O Painel de Ordem de Leitura ou os recursos equivalentes devem ser revisados. Texto alternativo gerado automaticamente precisa ser conferido: geração automática não garante descrição correta.

Otimizar ou compactar mídia e exportar vídeo podem não preservar legendas separadas, faixas alternativas e outros recursos de acessibilidade. O produto final precisa ser testado.

---

## 16. Fluxo de criação e pegadinhas de prova

### 16.1 Fluxo seguro

1. definir objetivo, público e duração;
2. estruturar a sequência e as seções;
3. escolher tema, tamanho e layouts;
4. configurar o mestre antes de repetir formatação manual;
5. inserir conteúdo e objetos com hierarquia visual clara;
6. alinhar, distribuir e revisar camadas;
7. aplicar transições e animações somente com finalidade;
8. preparar notas, links, ações, tempos e mídia;
9. executar Verificador de Compatibilidade e de Acessibilidade;
10. testar em modo de apresentação e no equipamento de destino;
11. salvar o arquivo editável e exportar a saída adequada.

### 16.2 Pegadinhas recorrentes

| Afirmação | Avaliação correta |
|---|---|
| “A apresentação e o slide são sinônimos.” | falso: o arquivo contém slides |
| “Tema, layout e mestre são o mesmo recurso.” | falso: possuem funções distintas |
| “Transição anima um objeto dentro do slide.” | falso: atua na passagem entre slides |
| “Transformar é uma animação de objeto.” | falso: é transição |
| “`.ppsx` é necessariamente somente leitura.” | falso: ele abre por padrão em Apresentação de Slides |
| “`.pptx` armazena VBA.” | falso: use formato habilitado como `.pptm` |
| “PowerPoint para a Web executa macros.” | falso |
| “Ocultar slide equivale a excluir.” | falso |
| “SmartArt é um gráfico de dados.” | falso |
| “Distribuir e alinhar são sinônimos.” | falso |
| “Notas sempre aparecem para a audiência.” | falso no Modo do Apresentador corretamente configurado |
| “Folheto é o mesmo que Página de Anotações.” | falso |
| “PDF preserva toda interatividade.” | falso |
| “Salvar como `.ppt` mantém todos os recursos modernos.” | falso |
| “Texto alternativo automático dispensa revisão.” | falso |

Antes de responder a uma questão, identifique **versão, plataforma, formato, objeto selecionado, modo de exibição, comando e destino da saída**.

---

## 17. Referências

Fontes consultadas em 18 de julho de 2026:

- [Edital do concurso TCE/MA 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/286F92FD1323AD1603BB4FECDE9E40CCC27E6A3E8278DE6C9967CA14B2E4B84F.html) — Centro Brasileiro de Pesquisa em Avaliação e Seleção e de Promoção de Eventos (Cebraspe); conteúdo programático do recorte.
- [Modos de exibição no PowerPoint](https://support.microsoft.com/pt-br/office/escolher-o-modo-de-exibi%C3%A7%C3%A3o-certo-para-a-tarefa-no-powerpoint-21332d8d-adbc-4717-a2c6-e25a697b40e9) — Microsoft Support; modos de criação, mestres, apresentação e Modo do Apresentador.
- [Personalizar um Slide Mestre](https://support.microsoft.com/pt-br/office/personalizar-um-slide-mestre-036d317b-3251-4237-8ddc-22f4668e2b56) — Microsoft Support; mestre, layouts e padronização.
- [Animações e transições](https://support.microsoft.com/pt-br/office/anima%C3%A7%C3%B5es-versus-transi%C3%A7%C3%B5es-em-uma-apresenta%C3%A7%C3%A3o-de-slides-bae174a4-dad3-4268-bf9c-c201a70995f1) — Microsoft Support; distinção e aplicação dos efeitos.
- [Formatos aceitos pelo PowerPoint](https://support.microsoft.com/en-us/office/file-formats-that-are-supported-in-powerpoint-252c6fa0-a4bc-41be-ac82-b77c9773f9dc) — Microsoft Support; formatos editáveis, modelos, apresentações de slides e exportações.
- [Exportar uma apresentação](https://support.microsoft.com/en-us/office/export-a-presentation-6ee4272e-8f64-47f6-bd32-12fe50eef477) — Microsoft Support; PDF, vídeo, imagens e outras saídas.
- [Recursos do PowerPoint para a Web](https://support.microsoft.com/en-us/office/how-certain-features-behave-in-web-based-powerpoint-a931f0c8-1305-4428-8f7c-9cfa00ef28c5) — Microsoft Support; formatos e diferenças entre navegador e desktop.
- [Atalhos para criar apresentações](https://support.microsoft.com/en-us/office/use-keyboard-shortcuts-to-create-powerpoint-presentations-ebb3d20e-dcd4-444f-a38e-bb5c5ed180f4) — Microsoft Support; atalhos de edição no Windows.
- [Atalhos para apresentar slides](https://support.microsoft.com/en-us/office/use-keyboard-shortcuts-to-deliver-powerpoint-presentations-1524ffce-bd2a-45f4-9a7f-f18b992b93a0) — Microsoft Support; navegação e recursos durante a apresentação.
- [Guias para organizar elementos](https://support.microsoft.com/en-us/office/guides-for-arranging-things-on-a-slide-33854dfa-e0d1-43ff-8971-667b19512de3) — Microsoft Support; grade, guias e guias inteligentes.
- [Botões de ação](https://support.microsoft.com/en-us/office/add-commands-to-your-presentation-with-action-buttons-7db2c0f8-5424-4780-93cb-8ac2b6b5f6ce) — Microsoft Support; ações por clique ou passagem do ponteiro.
- [Apresentação personalizada](https://support.microsoft.com/en-us/office/create-and-present-a-custom-show-09d4d340-3c47-4125-b177-0de3be462c5d) — Microsoft Support; subconjuntos e navegação hiperlinkada.
- [Gravar apresentação com narração e intervalos](https://support.microsoft.com/en-us/office/record-a-slide-show-with-narration-and-slide-timings-0b9502c6-5f6c-40ae-b1e7-e47d8741161c) — Microsoft Support; gravação, tempos e narração.
- [Imprimir slides, folhetos ou anotações](https://support.microsoft.com/en-us/office/print-your-powerpoint-slides-handouts-or-notes-194d4320-aa03-478b-9300-df25f0d15dc4) — Microsoft Support; opções de impressão.
- [Formatos de áudio e vídeo](https://support.microsoft.com/en-us/office/video-and-audio-file-formats-supported-in-powerpoint-d8b12450-26db-4c7b-a5c1-593d3418fb59) — Microsoft Support; formatos e codificações recomendados.
- [Empacotar apresentação para CD ou unidade USB](https://support.microsoft.com/en-us/office/package-a-presentation-for-cd-or-usb-flash-drive-ac1ae03e-c5f2-4a0d-8bcb-3c48741117c9) — Microsoft Support; portabilidade de arquivos e fontes.
- [Incorporar fontes personalizadas](https://support.microsoft.com/en-us/office/benefits-of-embedding-custom-fonts-cb3982aa-ea76-4323-b008-86670f222dbc) — Microsoft Support; fidelidade e editabilidade tipográfica.
- [Modo de Compatibilidade](https://support.microsoft.com/en-us/office/about-compatibility-mode-in-powerpoint-aa6983bb-7858-40c5-bcc8-756faa7d29b0) — Microsoft Support; limitações do formato legado e verificação.
- [Apresentações acessíveis](https://support.microsoft.com/en-us/office/make-your-powerpoint-presentations-accessible-to-people-with-disabilities-6f7772b2-2f33-4bd2-8ca7-dae3b2b3ef25) — Microsoft Support; títulos, ordem de leitura, texto alternativo, contraste, tabelas e mídia.
