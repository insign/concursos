---
schemaVersion: 1
title: Editores de textos, planilhas e apresentações — revisão rápida
description: Mapa de Word, Excel, PowerPoint, Writer, Calc e Impress, com formatos, operações e pegadinhas de interoperabilidade.
order: 24
storageId: pc-u024
---

# Editores de textos, planilhas e apresentações — revisão rápida

## Mapa da suíte

| Finalidade | Microsoft | LibreOffice | Apache OpenOffice |
| --- | --- | --- | --- |
| texto | Word | Writer | Writer |
| planilha | Excel | Calc | Calc |
| apresentação | PowerPoint | Impress | Impress |

**Aplicativo ≠ arquivo.**

## Formatos

- Word: `DOCX`
- Excel: `XLSX`
- PowerPoint: `PPTX`
- Writer: `ODT`
- Calc: `ODS`
- Impress: `ODP`

`ODT`/`ODS`/`ODP` pertencem ao <abbr title="OpenDocument Format">ODF</abbr>.

<abbr title="Portable Document Format">PDF</abbr> = saída de distribuição/exportação; não confunda com o arquivo-fonte normal de edição.

## Salvar × Salvar como × Exportar

- **Salvar** → atualiza o arquivo corrente.
- **Salvar como** → outro nome/local/formato.
- **Exportar** → gera saída para outro formato/finalidade.
- Abrir/salvar formato de outra suíte **não garante fidelidade perfeita** de recursos complexos.

## Texto — Word/Writer

- caractere: fonte, tamanho, negrito, cor;
- parágrafo: alinhamento, recuo, espaçamento, listas;
- **estilo** = padrão reutilizável;
- Writer: estilos de página controlam estrutura de página;
- tabelas/imagens/cabeçalho/rodapé/numeração entram no objeto “documento”.

## Planilha — Excel/Calc

- célula: `A1`
- intervalo: `A1:B2`
- fórmula: começa por `=`
- relativa: `A1`
- absoluta: `$A$1`
- mistas: `$A1` e `A$1`

**Copiar fórmula:** referências relativas se ajustam.

- ordenar ≠ filtrar;
- formatar ≠ alterar valor;
- função, separador e menu podem variar por ambiente.

## Apresentação — PowerPoint/Impress

- slide = página;
- layout = organização;
- tema = padrão visual;
- mestre = padrões compartilhados;
- transição = passagem entre slides;
- animação = efeito em objeto;
- notas = apoio ao apresentador.

Fato já cobrado: `Ctrl+M` → novo slide em PowerPoint e LibreOffice Impress no contexto da prova <abbr title="Fundação Getulio Vargas">FGV</abbr>/<abbr title="Instituto de Previdência Social do Município de Macaé">MACAEPREV</abbr>.

## LibreOffice × Apache OpenOffice

São **suítes distintas**, embora ambas tenham Writer, Calc e Impress e trabalhem com formatos OpenDocument.

## Método

**objeto → operação → efeito → formato**

Pergunte:
1. Qual aplicativo?
2. Qual objeto?
3. O comando muda valor, aparência, posição ou referência?
4. Qual formato de entrada/saída?
5. A questão fixou versão, plataforma ou atalho?
6. Há conversão entre suítes?

## Pegadinhas

- programa ≠ arquivo;
- `ODT`/`ODS`/`ODP` ≠ formatos nativos Microsoft;
- <abbr title="Portable Document Format">PDF</abbr> ≠ fonte ideal de edição;
- estilo ≠ formatação manual repetida;
- `$A$1` fixa coluna e linha;
- filtro ≠ exclusão;
- transição ≠ animação;
- compatibilidade ≠ identidade total de recursos;
- atalho documentado em um ambiente ≠ universalidade.
