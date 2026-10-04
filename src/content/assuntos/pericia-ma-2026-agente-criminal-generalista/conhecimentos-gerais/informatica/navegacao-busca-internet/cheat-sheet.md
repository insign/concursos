# Navegação e busca na Internet

## Funções que não se confundem

| Elemento | Núcleo |
|---|---|
| Internet / Web | Infraestrutura de redes / recursos interligados de um serviço sobre ela. |
| Navegador / busca | Programa que obtém e apresenta / serviço que recupera resultados para consultas. |
| Página / site | Recurso individual / conjunto organizado de recursos. |
| Endereço / link | Localiza recurso / aponta para um destino, que pode diferir do rótulo. |

Uma barra pode aceitar endereço e pesquisa sem tornar as operações iguais.

## <abbr title="Uniform Resource Locator — localizador uniforme de recursos">URL</abbr>

`https://portal.exemplo.gov.br/servicos/boletim?ano=2026#anexos`

- `https`: esquema; `portal.exemplo.gov.br`: <abbr title="Nome do serviço ou servidor procurado">host</abbr>.
- `/servicos/boletim`: caminho; `?ano=2026`: consulta; `#anexos`: fragmento.
- Porta explícita, como `:8443`, é número de acesso lógico ao serviço.
- Fragmento não segue na requisição web ao servidor.
- Referência absoluta dispensa a base do documento; relativa depende dela.
- `/documentos/edital.pdf` parte da raiz, preservando esquema e <abbr title="Nome do serviço ou servidor procurado">host</abbr> da base.

<abbr title="Hypertext Transfer Protocol Secure — protocolo de transferência de hipertexto protegido">HTTPS</abbr> protege a comunicação e autentica o servidor conforme certificado aceito; **não certifica conteúdo verdadeiro ou boa-fé**.

## Navegação e dados

- Voltar/avançar: posições da navegação; recarregar: recurso atual.
- Abas: recursos separados na janela.
- Histórico: registro de navegações; favorito: referência salva; download: conteúdo transferido para armazenamento.
- <abbr title="Respostas e recursos armazenados temporariamente para reutilização permitida">Cache</abbr> ≠ <abbr title="Pequenos dados associados a sites, como preferências e estado de sessão">cookies</abbr> ≠ histórico.
- Modo privativo reduz registros locais; não garante anonimato. Favoritos e downloads podem permanecer.
- Localizar na página procura no documento aberto; não pesquisa a Web.

## Busca e refinamento

**Descobrir/rastrear → indexar → recuperar/ordenar.** Índice não contém toda a Web nem todas as alterações em tempo real.

Exemplos da Pesquisa Google, consultados em 4/10/2026:

| Recurso | Uso |
|---|---|
| `"expressão exata"` | Correspondência da expressão. |
| `site:gov.br` | Site/domínio indicado. |
| `-rascunho` | Excluir a palavra. |
| `filetype:pdf` | Tipo de arquivo; <abbr title="Portable Document Format — formato portátil de documento">PDF</abbr> no exemplo. |

Sem espaço entre operador e valor. Sintaxe/filtros dependem do serviço; filtros de período podem existir.

**Não encontrado ≠ inexistente. Primeiro resultado ≠ verdade comprovada.** Abra e examine autoria, data, finalidade e correspondência com a pergunta. Trecho de resultado não substitui o documento completo.

## Saída

Favorito ≠ cópia completa sem rede. Impressão ≠ download do original.

No Edge para Windows, `Ctrl+P` abre impressão; confira pré-visualização, páginas, orientação e escala. Saída em impressora ou <abbr title="Portable Document Format — formato portátil de documento">PDF</abbr>, conforme ambiente; tela e impressão podem diferir.
