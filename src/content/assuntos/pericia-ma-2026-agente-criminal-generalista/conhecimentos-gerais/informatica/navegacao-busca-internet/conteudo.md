---
schemaVersion: 1
title: Navegação e busca na Internet
description: Navegador, endereços e links, recursos de navegação, formulação e refinamento de buscas e limites dos resultados encontrados.
order: 310
storageId: per-u031
---

## 1. Conhecer o endereço ou procurar o recurso?

Imagine uma situação hipotética: você precisa consultar um relatório publicado na Internet. Se já conhece seu endereço, pode fornecê-lo ao navegador. Se conhece apenas o assunto, pesquisa em um mecanismo de busca e escolhe um resultado. Nos dois casos, termina diante de uma página, mas **chegar por endereço e pesquisar são operações diferentes**.

A Internet interliga redes e permite diferentes serviços. A **Web** reúne recursos ligados entre si, como páginas, documentos e aplicações, acessados por tecnologias de navegação. É um serviço sobre a Internet; correio eletrônico, por exemplo, não se reduz a páginas da Web. O funcionamento das redes é aprofundado em **Noções de redes de computadores**; aqui, precisamos distinguir as funções usadas para localizar e consultar recursos.

O **navegador** é o programa que solicita, recebe, interpreta e apresenta recursos da Web. Firefox, Chrome e Edge são exemplos. O **mecanismo de busca**, como Google Search ou Bing, é um serviço que recupera resultados para uma consulta. Ele não substitui o navegador que apresenta as páginas.

Muitos navegadores recebem endereços e termos de pesquisa na mesma barra. Conforme a entrada e a configuração, tentam abrir o endereço ou encaminham a consulta ao mecanismo escolhido. **Uma caixa de interface pode acionar funções diferentes.**

Uma **página** é um recurso individual; um **site** organiza recursos associados a uma presença ou serviço na Web. Abrir a página inicial de um site não equivale a obter todos os seus documentos, nem a consultar toda a Internet.

## 2. Ler o endereço antes de seguir o link

Uma <abbr title="Uniform Resource Locator — localizador uniforme de recursos">URL</abbr> é o endereço de um recurso. Seu formato informa como e onde tentar acessá-lo; possuir um endereço não garante que o recurso continue disponível. Observe o exemplo hipotético:

`https://portal.exemplo.gov.br/servicos/boletim?ano=2026#anexos`

Primeiro, o navegador identifica o **esquema**, aqui `https`, associado ao modo de acesso. Um **protocolo** é um conjunto de regras de comunicação. Depois, identifica o **host**, aqui `portal.exemplo.gov.br`, o nome do serviço/servidor procurado. O **caminho** `/servicos/boletim` identifica o recurso nesse serviço; não precisa corresponder a uma pasta física do servidor.

O sinal `?` inicia a **consulta**: no exemplo, o parâmetro `ano=2026` pode orientar a resposta do serviço. Seu significado depende da aplicação; escrever um parâmetro não obriga qualquer site a reconhecê-lo. O sinal `#` inicia o **fragmento**: `anexos` pode indicar uma seção do documento. Na requisição web, o fragmento não é enviado ao servidor; sua interpretação cabe ao cliente, conforme o recurso.

| Parte do exemplo | Função |
|---|---|
| `https` | Esquema associado ao modo de acesso. |
| `portal.exemplo.gov.br` | Host procurado. |
| `/servicos/boletim` | Caminho do recurso. |
| `?ano=2026` | Consulta com parâmetro para o serviço. |
| `#anexos` | Fragmento interpretado no recurso pelo cliente. |

Também pode aparecer uma **porta**, número que identifica o ponto lógico de acesso ao serviço, como `:8443` após o host. Ela não é o caminho nem uma conexão física. Consulta, fragmento e porta explícita não precisam aparecer em todo endereço.

### 2.1. Proteção do canal e conteúdo são propriedades diferentes

O <abbr title="Hypertext Transfer Protocol — protocolo de transferência de hipertexto">HTTP</abbr> estabelece regras de troca de recursos web. O esquema <abbr title="Hypertext Transfer Protocol Secure — protocolo de transferência de hipertexto protegido">HTTPS</abbr> associa essa comunicação a proteção criptográfica. Ela protege a **confidencialidade**, contra leitura não autorizada, e a **integridade**, contra alteração indevida do tráfego no caminho. Também autentica o servidor conforme o certificado aceito pelo cliente, que permite verificar a identidade apresentada nesse processo de conexão.

Isso **não atesta a veracidade do texto publicado nem a boa-fé do site**. Não confunda proteção da comunicação com qualidade da informação. Os mecanismos e ameaças são aprofundados em **Segurança da informação**; esta distinção basta para avaliar o alcance da navegação protegida.

### 2.2. Link: rótulo, destino e endereço-base

Um **hiperlink**, ou link, liga um ponto a outro recurso, a uma seção ou a uma ação tratada pela aplicação. “Baixe o relatório” é seu **rótulo** visível; o destino pode ser um endereço diferente desse texto. O que aparece no rótulo não determina sozinho onde você chegará.

Uma referência **absoluta**, como o endereço completo do exemplo, permite localizar o recurso sem depender do endereço do documento atual. Uma referência **relativa** é interpretada a partir de um endereço-base.

Por exemplo, se a base for `https://portal.exemplo.gov.br/servicos/index`, o destino `/documentos/edital.pdf` usa o mesmo esquema e host, com o caminho a partir da raiz: `https://portal.exemplo.gov.br/documentos/edital.pdf`. A barra inicial evita acrescentar `documentos` ao caminho `/servicos/`. Referência relativa não significa endereço incorreto nem garantia de maior segurança.

## 3. Navegar, reencontrar e guardar: o que muda?

Abrir várias **abas** permite manter recursos separados na mesma janela e alternar entre eles. **Voltar** e **avançar** percorrem posições da navegação naquela aba; **recarregar** atualiza o recurso atual, podendo reutilizar dados conforme as regras aplicáveis. Recarregar não é retornar à página anterior.

O **histórico** registra navegações conforme as configurações. Um **favorito** ou marcador guarda uma referência escolhida pelo usuário para reencontrar o recurso; não assegura, por si só, uma cópia completa para leitura sem conexão. Fazer um **download** transfere conteúdo para armazenamento acessível ao usuário. Abrir uma página e baixar um documento são ações distintas.

Dois mecanismos ajudam a compreender os dados mantidos pelo navegador:

- **Cache:** armazenamento temporário de respostas e recursos para reutilizá-los quando suas condições permitem; não é uma lista de páginas visitadas.
- **Cookies:** pequenos dados associados a sites, usados, por exemplo, para estado de uma sessão e preferências; não são cópias completas de páginas.

Apagar histórico não significa automaticamente apagar cache e cookies. Na **navegação privativa**, o navegador reduz determinados registros locais da sessão, conforme o produto. Isso não garante anonimato perante sites, provedor ou rede da organização. No Firefox, favoritos salvos e arquivos baixados permanecem após fechar as janelas privativas.

O comando **localizar na página** procura texto no documento aberto. Ele não consulta o índice de um buscador nem pesquisa automaticamente outros sites. No Firefox de computador, `Ctrl+F` é um atalho para essa função em ambientes compatíveis; o contexto do programa e do sistema importa.

## 4. Buscar: formular, refinar e interpretar

Quando você pesquisa por assunto, o mecanismo não visita toda a Internet naquele instante. Em um modelo simplificado, descobre e **rastreia** recursos, processa informações para um **índice** e, diante da consulta, recupera e ordena resultados. Índice é a estrutura de informações usada para localizar os recursos; não é uma cópia completa e instantânea da Web.

Uma página pode não ter sido descoberta ou indexada, depender de acesso restrito ou ter mudado desde o rastreamento. Portanto, **não encontrar um resultado não prova que o documento não exista**. Ao abrir um resultado, você acessa o recurso oferecido pelo destino, que pode diferir do que foi registrado anteriormente pelo mecanismo.

### 4.1. Transformar uma necessidade em consulta

No cenário do relatório, comece por palavras que identifiquem assunto, órgão e período. Se surgirem resultados sobre outro sentido do termo, refine a consulta. Se ela estiver estreita demais, retire uma restrição ou experimente outra formulação.

Filtros e operadores limitam ou orientam a seleção dos resultados; não alteram o conteúdo das páginas. Sua sintaxe depende do serviço. Como exemplo documentado da **Pesquisa Google**, consultado em 4 de outubro de 2026:

| Recurso | Exemplo hipotético | Intenção |
|---|---|---|
| Aspas | `"relatório anual"` | Procurar a expressão exata. |
| `site:` | `site:gov.br "relatório anual"` | Restringir resultados ao site/domínio indicado. |
| Sinal de menos | `relatório -rascunho` | Excluir a palavra indicada. |
| `filetype:` | `"relatório anual" filetype:pdf` | Procurar o tipo de arquivo indicado. |

No último exemplo, <abbr title="Portable Document Format — formato portátil de documento">PDF</abbr> identifica um formato de documento. Não coloque espaço entre o operador `site:` e o domínio, ou entre `filetype:` e o tipo. A disponibilidade de filtros, inclusive de período e tipo de conteúdo, pode variar com o serviço e a consulta. Não trate essa sintaxe como regra universal de todo buscador.

### 4.2. Resultado encontrado não é conclusão pronta

A ordenação depende dos critérios do serviço e do contexto, como idioma e localização. Um resultado em primeiro lugar não ganha, por isso, comprovação factual. Abra o recurso e confira autoria, data, finalidade e correspondência com o que procura. Um trecho apresentado no resultado ajuda a selecionar o que abrir, mas não substitui o documento completo.

Restringir a busca a um domínio ajuda a localizar material naquele conjunto; não demonstra que todos os documentos relevantes foram encontrados, estejam atualizados ou sejam adequados à sua pergunta. Compare a busca com a navegação no site quando precisar confirmar uma publicação. Essa é uma aplicação do limite do índice, não uma promessa de exaustividade por filtro.

## 5. Consultar, baixar ou imprimir?

Depois de encontrar o documento, escolha a operação de acordo com o objetivo. Um favorito facilita retornar ao endereço; um download guarda conteúdo; a **impressão** produz uma representação preparada para saída pelo navegador e pelo documento.

Pré-visualize antes de imprimir: páginas, orientação, escala e elementos de fundo podem mudar a saída. No Microsoft Edge para Windows, `Ctrl+P` abre a interface de impressão. Conforme o ambiente, pode-se escolher uma impressora física ou gerar um arquivo <abbr title="Portable Document Format — formato portátil de documento">PDF</abbr>. Isso não significa obter o arquivo-fonte original da página. Menus e elementos interativos podem não aparecer como na tela.

Para recuperar o núcleo, distinga: **endereço leva a um recurso; link aponta para um destino; navegador apresenta; busca seleciona resultados de um índice**. Depois examine o alcance: canal protegido não garante informação verdadeira, ausência de resultado não prova inexistência e impressão não equivale a download.
