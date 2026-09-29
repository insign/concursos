---
schemaVersion: 1
title: "Internet: navegação, URL, links, sites, busca e impressão"
description: "Navegação na Web: navegador, páginas e sites, estrutura de URL, hiperlinks, mecanismos de busca, recursos de navegação e impressão."
order: 41
storageId: "seap-u041"
---

# Internet: navegação, endereço, links, busca e impressão

Uma sessão de navegação mistura várias operações:

1. abrir um **navegador**;
2. acessar uma página por endereço;
3. seguir um **link**;
4. pesquisar em um mecanismo de busca;
5. abrir um resultado;
6. imprimir ou salvar a representação da página.

Para acertar as questões, separe a função de cada elemento.

> **Navegador apresenta recursos. Endereço localiza. Link aponta. Busca encontra por índice. Impressão gera uma saída.**

## 1. Internet e Web: a ponte mínima

A **Internet** é a infraestrutura global de redes interconectadas.

A **Web** é um dos serviços que funciona sobre essa infraestrutura, reunindo páginas, documentos e aplicações acessíveis por tecnologias web.

Logo:

> Internet ≠ Web.

O correio eletrônico, por exemplo, usa a Internet sem ser, por isso, uma página da Web.

## 2. Navegador

O navegador é o programa que solicita, recebe, interpreta e apresenta recursos da Web.

Exemplos de ações comuns:

- digitar um endereço;
- abrir links;
- voltar e avançar no histórico;
- recarregar a página atual;
- trabalhar com abas;
- baixar arquivos;
- imprimir.

Pegadinha:

> navegador ≠ mecanismo de busca.

Um navegador pode usar um buscador como padrão, mas são funções diferentes.

## 3. Página, site e recurso

Uma **página web** é um recurso apresentado pelo navegador.

Um **site** é um conjunto organizado de recursos associados a uma presença ou serviço na Web.

Nem todo recurso acessado é necessariamente uma página:

- pode ser imagem;
- arquivo;
- documento;
- aplicação;
- conteúdo para download.

Assim, “site”, “página”, “arquivo” e “Internet” não são sinônimos.

## 4. Anatomia de uma <abbr title="Uniform Resource Locator, localizador uniforme de recursos">URL</abbr>

Considere o endereço hipotético:

`https://portal.exemplo.gov.br/servicos/boletim?ano=2026#anexos`

Leia por partes:

| Trecho | Função |
| --- | --- |
| `https` | esquema |
| `portal.exemplo.gov.br` | host |
| `/servicos/boletim` | caminho |
| `?ano=2026` | consulta |
| `#anexos` | fragmento |

Uma <abbr title="Uniform Resource Locator, localizador uniforme de recursos">URL</abbr> pode também indicar porta explicitamente.

Nem todos os componentes precisam aparecer em todo endereço.

## 5. <abbr title="Hypertext Transfer Protocol, protocolo de transferência de hipertexto">HTTP</abbr> e <abbr title="Hypertext Transfer Protocol Secure, HTTP protegido por criptografia">HTTPS</abbr>

O esquema <abbr title="Hypertext Transfer Protocol Secure, HTTP protegido por criptografia">HTTPS</abbr> indica uso de proteção criptográfica para a comunicação entre cliente e servidor, com autenticação do servidor conforme o certificado aceito.

Isso ajuda a proteger:

- confidencialidade;
- integridade do tráfego.

Mas:

> <abbr title="Hypertext Transfer Protocol Secure, HTTP protegido por criptografia">HTTPS</abbr> não prova que todo conteúdo do site seja verdadeiro ou confiável.

Um site enganoso também pode usar conexão criptografada.

## 6. Hiperlink: rótulo e destino são coisas diferentes

Um link pode apontar para:

- outra página;
- arquivo;
- seção da mesma página;
- ação tratada pela aplicação.

O texto visível pode ser:

> “Baixe o edital”

e o destino pode ser uma <abbr title="Uniform Resource Locator, localizador uniforme de recursos">URL</abbr> completamente diferente desse rótulo.

Portanto:

> texto do link ≠ endereço do destino.

## 7. Endereço absoluto e relativo

Uma referência **absoluta** traz informação suficiente para localizar o recurso de forma independente do endereço atual.

Uma referência **relativa** depende de um endereço-base.

Exemplo conceitual:

- absoluta: endereço completo de outro site;
- relativa: `/documentos/edital.pdf`, interpretado a partir do site atual.

A referência relativa não é “incompleta por erro”; ela é resolvida no contexto correto.

## 8. Barra de endereço e busca

Navegadores modernos frequentemente usam a mesma caixa para:

- endereços;
- termos de busca.

Isso não torna as duas operações iguais.

Se a entrada é reconhecida como endereço, o navegador tenta acessar o recurso.

Se é interpretada como pesquisa, pode encaminhá-la ao mecanismo de busca configurado.

Interface única ≠ mecanismo único.

## 9. Como um mecanismo de busca funciona

Simplificando, há três etapas:

1. **descoberta/rastreamento** de recursos;
2. **indexação** das informações coletadas;
3. **recuperação e ordenação** de resultados para uma consulta.

A busca normalmente consulta seu próprio índice.

Consequência:

> resultado de busca ≠ fotografia completa e instantânea de toda a Internet.

Uma página pode:

- ainda não ter sido descoberta;
- não ter sido indexada;
- ter mudado desde o último rastreamento;
- ser filtrada conforme regras do serviço.

## 10. Filtros e operadores

Mecanismos de busca podem oferecer:

- aspas para expressão;
- filtros de data;
- filtros de domínio;
- filtros de tipo de conteúdo;
- outros operadores.

A sintaxe e a disponibilidade dependem do serviço.

Não memorize um operador de um buscador como regra universal e imutável de toda a Web.

## 11. Histórico, cache e cookies: fronteira útil

Na navegação, três conceitos aparecem juntos mas têm funções diferentes.

- **histórico:** registra navegações conforme a configuração;
- **cache:** guarda temporariamente recursos/respostas para reutilização;
- **cookies:** dados associados a sites, usados para estado, sessão ou preferências.

Apagar um deles não significa automaticamente apagar os outros.

Essa fronteira é suficiente aqui; segurança e proteção de dados têm unidades próprias.

## 12. Navegação privativa

O modo privativo reduz determinados rastros locais mantidos pelo navegador ao final da sessão, conforme o produto.

Ele não significa:

- anonimato diante do site;
- invisibilidade para a rede;
- substituição de <abbr title="Hypertext Transfer Protocol Secure, HTTP protegido por criptografia">HTTPS</abbr>;
- exclusão automática de todo arquivo baixado.

É uma funcionalidade de privacidade **local**, não uma capa de invisibilidade na Internet.

## 13. Impressão de página

A impressão trabalha com uma representação da página preparada para saída.

Em navegadores de desktop, `Ctrl+P` é um atalho comum para abrir a interface de impressão, conforme o ambiente.

O destino pode ser:

- impressora física;
- arquivo <abbr title="Portable Document Format, formato portátil de documento">PDF</abbr>, quando disponível;
- outro destino fornecido pelo sistema.

### Imprimir ≠ baixar

Imprimir uma página não significa obter o arquivo-fonte original.

Elementos interativos, menus e estilos podem aparecer de modo diferente na versão impressa.

## 14. Recarregar, voltar e avançar

- **recarregar:** solicita novamente o recurso atual;
- **voltar:** retorna a uma posição anterior do histórico;
- **avançar:** percorre novamente uma posição posterior.

Recarregar não é sinônimo de voltar.

## 15. Download

Download transfere conteúdo para armazenamento acessível ao usuário.

Abrir uma página e baixar um arquivo são operações diferentes.

Um arquivo baixado pode permanecer no dispositivo mesmo depois de encerrar uma sessão privativa.

## 16. Método de prova

1. **Qual é o objeto?** navegador, endereço, link, site, busca ou impressão?
2. **Qual é o verbo?** acessar, apontar, indexar, recarregar, baixar ou imprimir?
3. **O rótulo foi confundido com o destino?**
4. **A alternativa prometeu mais do que a tecnologia garante?**
5. **A regra depende de um serviço específico?**

## 17. Pegadinhas finais

- Internet ≠ Web;
- navegador ≠ mecanismo de busca;
- site ≠ página isolada;
- rótulo do link ≠ destino;
- <abbr title="Hypertext Transfer Protocol Secure, HTTP protegido por criptografia">HTTPS</abbr> ≠ garantia de veracidade;
- índice de busca ≠ toda a Internet em tempo real;
- histórico ≠ cache ≠ cookies;
- navegação privativa ≠ anonimato;
- impressão ≠ download.
