import { describe, expect, it } from 'vitest';
import { hasMarkdownH1 } from '../../src/lib/markdown-headings';

describe('markdown headings', () => {
  it('finds an H1 outside fenced code', () => {
    expect(hasMarkdownH1('Texto primeiro.\n\n# Título')).toBe(true);
    expect(hasMarkdownH1('```md\n# Exemplo\n```')).toBe(false);
    expect(hasMarkdownH1('```md\n```not-a-closing-fence\n# Exemplo\n')).toBe(false);
    expect(hasMarkdownH1('    # Código indentado')).toBe(false);
    expect(hasMarkdownH1('    ```\n# Título real')).toBe(true);
  });
});
