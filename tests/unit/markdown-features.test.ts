import { describe, expect, it } from 'vitest';
import {
  hasTitledAbbreviationTag,
  remarkMarkdownFeatures,
} from '../../src/lib/remark-markdown-features.mjs';

function detects(children: Array<Record<string, unknown>>): boolean {
  const frontmatter: Record<string, unknown> = {};
  const transform = remarkMarkdownFeatures();
  transform({ type: 'root', children }, { data: { astro: { frontmatter } } });
  return frontmatter.hasTitledAbbreviation === true;
}

describe('Markdown feature detection', () => {
  it('detects titled abbreviation tags across supported HTML forms', () => {
    expect(hasTitledAbbreviationTag('<abbr title="Tribunal de Contas">')).toBe(true);
    expect(hasTitledAbbreviationTag("<ABBR class='term' TITLE='Lei de Responsabilidade Fiscal'>")).toBe(true);
    expect(hasTitledAbbreviationTag('<abbr\nlang="pt-BR"\ntitle="Conselho Nacional de Justiça">')).toBe(true);
    expect(hasTitledAbbreviationTag('<abbr title=Administração>')).toBe(true);
    expect(hasTitledAbbreviationTag('<abbr title="Maior que > e menor que <">')).toBe(true);
  });

  it('ignores unrelated, absent, and empty title attributes', () => {
    expect(hasTitledAbbreviationTag('Texto sem abreviação.')).toBe(false);
    expect(hasTitledAbbreviationTag('<abbr>')).toBe(false);
    expect(hasTitledAbbreviationTag('<abbr data-title="Tribunal de Contas">')).toBe(false);
    expect(hasTitledAbbreviationTag('<abbr title="   ">')).toBe(false);
    expect(hasTitledAbbreviationTag('<abbr-widget title="Componente">')).toBe(false);
  });

  it('marks only real HTML nodes from the Markdown AST', () => {
    expect(detects([{ type: 'html', value: '<abbr title="Tribunal de Contas">' }])).toBe(true);
    expect(detects([{ type: 'inlineCode', value: '<abbr title="Inline">' }])).toBe(false);
    expect(detects([{ type: 'code', value: '<abbr title="Cercado ou indentado">' }])).toBe(false);
    expect(detects([{ type: 'html', value: '<!-- <abbr title="Comentário"> -->' }])).toBe(false);
  });
});
