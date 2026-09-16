---
schemaVersion: 1
title: "Internet, intranet, navegação, busca e redes sociais"
description: "Conceitos de internet e intranet, navegação por navegadores, URL e links, mecanismos de busca, impressão de páginas e redes sociais."
order: 22
storageId: pc-u022
---

# Internet, intranet, navegação, busca e redes sociais

Imagine um cenário hipotético: você abre um navegador para consultar um portal público, entra depois no portal interno da instituição, clica em um resultado de pesquisa e imprime uma página. A sequência parece uma única coisa, mas envolve **camadas diferentes**:

1. a **Internet** fornece a infraestrutura de interligação entre redes;
2. a **Web** é um dos serviços que funciona sobre essa infraestrutura;
3. uma **intranet** aplica tecnologias da mesma família em um ambiente de acesso restrito;
4. o **navegador** é o programa que localiza, solicita e apresenta recursos da Web;
5. um **mecanismo de busca** mantém um índice próprio para ajudar a encontrar recursos;
6. uma **rede social** organiza perfis, relações e publicação/interação entre usuários.

A maior parte das pegadinhas do tema troca uma dessas funções por outra. O objetivo desta aula é impedir essa troca.

## 1. Internet, Web e intranet: não são sinônimos

A **Internet** é uma rede de redes: um sistema global de redes interconectadas que permite a comunicação entre equipamentos e serviços. Para esta unidade, basta guardar o mecanismo. Detalhes de tipos de rede, endereçamento e protocolos de transporte pertencem ao capítulo próprio de redes.

A **Web** é um ambiente de recursos interligados — páginas, documentos, imagens e aplicações — acessados por endereços e ligações de hipertexto. Ela utiliza a Internet, mas **não esgota a Internet**. Correio eletrônico e outros serviços também podem usar a Internet sem serem “páginas da Web”.

A **intranet** é uma rede de uso interno ou restrito de uma organização que emprega tecnologias da mesma família das usadas na Internet. Ela pode oferecer, por exemplo, um portal interno acessado no navegador e páginas servidas por <abbr title="protocolo de transferência de hipertexto">HTTP</abbr> ou <abbr title="HTTP protegido por criptografia">HTTPS</abbr>. O ponto decisivo é o **controle do acesso**, não a obrigação de usar uma tecnologia completamente diferente.

> **Pegadinha:** intranet não significa “rede sem qualquer conexão com a Internet”. Uma organização pode manter recursos internos restritos e, ao mesmo tempo, permitir que seus computadores acessem a Internet. O que torna o recurso uma intranet é o recorte organizacional e o acesso controlado.

### Síntese do contraste

| Conceito | Pergunta que resolve | Erro típico |
| --- | --- | --- |
| Internet | Qual infraestrutura interliga redes em escala global? | Tratar Internet como sinônimo de navegador ou de Web. |
| Web | Qual ambiente reúne recursos interligados acessíveis por tecnologias web? | Afirmar que tudo que existe na Internet é uma página web. |
| Intranet | Qual rede/ambiente interno reutiliza tecnologias de Internet com acesso restrito? | Imaginar que precisa de protocolos exclusivos ou isolamento físico absoluto. |

## 2. Navegador: o cliente de navegação

O **navegador** é o programa usado para solicitar, receber, interpretar e apresentar recursos da Web. Ele transforma documentos e outros recursos em uma interface utilizável: texto, imagens, controles, ligações e aplicações.

Isso explica ações comuns:

- **barra de endereços:** recebe um endereço e pode, conforme a configuração, também encaminhar termos a um mecanismo de busca;
- **voltar/avançar:** percorre posições do histórico de navegação;
- **recarregar:** solicita novamente o recurso atual, sem significar “voltar” para a página anterior;
- **abas:** mantêm diferentes páginas ou aplicações abertas na mesma janela;
- **histórico:** registra navegações conforme as configurações do programa e do usuário.

Outros conceitos de navegador que costumam ser confundidos:

- **favoritos ou marcadores:** guardam uma referência para reencontrar um recurso; isso não significa, por si só, manter uma cópia completa da página disponível sem rede;
- **download:** transfere um arquivo ou outro conteúdo para armazenamento acessível ao usuário; abrir uma página e baixar um arquivo são operações diferentes;
- **cache:** mantém temporariamente respostas e recursos já obtidos para que possam ser reutilizados quando as condições permitirem, reduzindo novas transferências;
- **cookies:** são pequenos dados que um site pode deixar por meio do navegador para manter estado, preferências ou outras informações associadas à navegação; **cookie ≠ cache**;
- **navegação privativa:** reduz o que o navegador preserva localmente ao fim da sessão, conforme o produto, mas **não torna o usuário anônimo** para sites, rede da organização ou provedor de acesso. Arquivos baixados e favoritos podem continuar existindo.

Esses recursos ajudam a interpretar o que o navegador guarda, reutiliza ou transfere. Não conclua que “limpar histórico”, “limpar cache” e “apagar cookies” sejam a mesma operação.

A distinção mais importante é:

**navegador ≠ mecanismo de busca.**

Chrome, Edge e Firefox são exemplos de navegadores. Google Search e Bing são exemplos de mecanismos de busca. Um navegador pode usar um mecanismo de busca como padrão, mas um não se transforma no outro por causa dessa integração.

Também não confunda **página inicial** com **mecanismo de busca padrão**. A página inicial é o recurso aberto por uma ação definida no navegador; o mecanismo padrão é o serviço ao qual o navegador encaminha pesquisas quando essa função é usada.

## 3. <abbr title="Uniform Resource Locator, localizador uniforme de recursos">URL</abbr>: como ler um endereço

Uma <abbr title="Uniform Resource Locator, localizador uniforme de recursos">URL</abbr> identifica a localização de um recurso e como ele deve ser acessado. Observe o exemplo hipotético:

`https://portal.exemplo.gov.br/servicos/boletim?ano=2026#anexos`

A leitura útil para prova é:

| Trecho | Função |
| --- | --- |
| `https` | **esquema**: indica o método/protocolo de acesso associado ao endereço. |
| `portal.exemplo.gov.br` | **host**: nome do servidor/serviço a ser procurado. |
| `/servicos/boletim` | **caminho**: identifica o recurso dentro daquele host. |
| `?ano=2026` | **consulta**: parâmetros enviados ao recurso. |
| `#anexos` | **fragmento**: referência a uma parte do recurso; em navegação web, normalmente orienta o cliente dentro do documento. |

Uma <abbr title="Uniform Resource Locator, localizador uniforme de recursos">URL</abbr> também pode indicar uma **porta** de forma explícita. Nem todo componente precisa aparecer em todo endereço.

### <abbr title="protocolo de transferência de hipertexto">HTTP</abbr> e <abbr title="HTTP protegido por criptografia">HTTPS</abbr>

Quando o esquema é <abbr title="HTTP protegido por criptografia">HTTPS</abbr>, a comunicação entre cliente e servidor usa uma camada de proteção criptográfica e autenticação por certificado. Isso reduz riscos de interceptação e alteração do tráfego no caminho.

Mas a consequência correta é limitada: **<abbr title="HTTP protegido por criptografia">HTTPS</abbr> não prova que o conteúdo publicado é verdadeiro, legítimo ou confiável em sentido amplo.** Um site enganoso também pode oferecer conexão criptografada. Segurança de navegação é aprofundada nas unidades próprias; aqui importa não confundir “canal protegido” com “conteúdo confiável”.

## 4. Links: a ligação pode esconder o destino

Um **link** ou hiperlink é uma ligação que aponta para outro recurso ou para outra posição de um recurso. Ele pode conduzir a:

- outra página;
- um arquivo;
- uma seção da mesma página;
- uma ação tratada pela aplicação.

O texto visível de um link não precisa ser igual ao endereço de destino. “Acesse o relatório” pode apontar para uma <abbr title="Uniform Resource Locator, localizador uniforme de recursos">URL</abbr> longa e completamente diferente do rótulo mostrado.

Também existem referências **absolutas**, que trazem informação suficiente para localizar o recurso de modo independente do documento atual, e referências **relativas**, interpretadas em relação a um endereço-base.

Para prova, a pergunta decisiva é: **o que aparece na tela é o rótulo do link ou o destino efetivo?** Não os trate como equivalentes.

## 5. Mecanismos de busca: descobrir, indexar e servir resultados

Um mecanismo de busca não percorre “toda a Internet ao vivo” cada vez que você digita uma consulta. De modo simplificado, há três movimentos:

1. **descoberta/rastreamento:** o serviço encontra páginas e ligações que pode visitar;
2. **indexação:** informações sobre os recursos encontrados são processadas e armazenadas em um índice;
3. **serviço de resultados:** diante de uma consulta, o mecanismo recupera candidatos do índice e os ordena segundo seus critérios.

Isso produz uma consequência cobrada com frequência: **índice de busca ≠ cópia completa e instantânea de todo conteúdo existente na Internet**. Uma página pode não ter sido descoberta, pode estar indisponível para indexação, pode ter mudado depois do rastreamento ou pode ser filtrada conforme regras do serviço.

Recursos de consulta — aspas para expressão exata, filtros de data, domínio ou tipo de conteúdo — **dependem do mecanismo de busca e podem mudar**. Em prova, não universalize uma sintaxe específica se o enunciado não indicar o serviço.

### Pesquisa e endereço na mesma barra

Muitos navegadores aceitam tanto uma <abbr title="Uniform Resource Locator, localizador uniforme de recursos">URL</abbr> quanto termos de busca na barra principal. O comportamento não apaga a distinção:

- ao fornecer um endereço reconhecível, o navegador tenta localizar aquele recurso;
- ao fornecer termos de pesquisa, ele pode encaminhá-los ao mecanismo configurado.

A mesma caixa de interface pode, portanto, acionar **operações diferentes**.

## 6. Impressão de páginas: saída do que o navegador apresenta

Navegadores oferecem comando de impressão com pré-visualização e opções que variam conforme o programa e o sistema operacional. Em geral, a interface permite escolher destino de impressão, páginas, orientação, escala e outras opções.

Em navegadores de desktop é comum que `Ctrl+P` abra a interface de impressão, mas a prova deve respeitar o ambiente indicado. Também pode existir a opção de gerar um arquivo <abbr title="Portable Document Format, formato portátil de documento">PDF</abbr> em vez de enviar o trabalho a uma impressora física.

**Imprimir uma página não é o mesmo que baixar o arquivo original que a gerou.** A impressão trabalha com a representação preparada para saída pelo navegador e pelo documento. Elementos interativos, menus ou estilos podem aparecer de forma diferente na versão impressa.

## 7. Redes sociais: identidade, relações, publicação e interação

No recorte deste edital, pense em **rede social online** como uma plataforma que organiza pessoas ou instituições em torno de contas/perfis e permite alguma combinação de:

- seguir, adicionar ou relacionar contas;
- publicar ou compartilhar conteúdo;
- reagir, comentar ou responder;
- trocar mensagens;
- participar de grupos, comunidades ou espaços temáticos;
- receber um fluxo de publicações selecionado pela plataforma.

As funcionalidades concretas variam entre serviços. Nem toda rede social exige reciprocidade entre conexões, nem todo conteúdo é público e nem o alcance de uma publicação é garantido.

Uma rede social pode ser acessada por navegador ou por aplicativo. Logo:

- **rede social ≠ navegador**;
- **rede social ≠ Internet**;
- **rede social ≠ mecanismo de busca**.

Privacidade, golpes, proteção de contas e tratamento de dados pertencem às unidades específicas de segurança e proteção de dados. Aqui, a ponte mínima é reconhecer que **visibilidade e público dependem das configurações, do tipo de publicação e das regras da plataforma**.

## 8. Como a banca mistura os conceitos

Antes de marcar a alternativa, identifique **qual função está sendo descrita**:

| Se o enunciado fala em... | Pense primeiro em... |
| --- | --- |
| interligação global de redes | Internet |
| recursos/páginas ligados por hipertexto | Web |
| ambiente interno restrito que reutiliza tecnologias da Internet | intranet |
| programa que solicita e apresenta páginas | navegador |
| endereço de um recurso | <abbr title="Uniform Resource Locator, localizador uniforme de recursos">URL</abbr> |
| ligação clicável entre recursos | link |
| índice para localizar recursos por consulta | mecanismo de busca |
| pré-visualização, impressora ou saída em <abbr title="Portable Document Format, formato portátil de documento">PDF</abbr> | impressão do navegador |
| perfis, conexões, publicações e interações | rede social |

### Método de ataque em cinco passos

1. **Nomeie o objeto:** infraestrutura, serviço, programa, endereço, índice ou plataforma?
2. **Ache o verbo:** interligar, navegar, localizar, indexar, imprimir, publicar?
3. **Cheque a universalização:** “sempre”, “somente”, “todo conteúdo” e “qualquer navegador” costumam exigir atenção.
4. **Separe interface de mecanismo:** uma barra pode aceitar endereço e busca sem tornar as duas operações idênticas.
5. **Teste o alcance da afirmação:** conexão protegida, conteúdo indexado e publicação visível são propriedades diferentes.

## 9. Fronteiras com os próximos assuntos

Esta unidade entrega a ponte mínima para não fragmentar o entendimento, mas não duplica capítulos vizinhos:

- **U026** aprofunda redes, tipos de rede, endereçamento <abbr title="Internet Protocol version 4, Protocolo de Internet versão 4">IPv4</abbr>/<abbr title="Internet Protocol version 6, Protocolo de Internet versão 6">IPv6</abbr> e redes sem fio;
- **U028–U032** aprofundam segurança da informação, ameaças, criptografia, evidência digital e proteção de dados;
- **U025** aprofunda correio eletrônico e seus protocolos.

Para U022, memorize sobretudo as **fronteiras funcionais**. Saber quem faz o quê evita mais erros do que decorar listas de botões de um navegador específico.
