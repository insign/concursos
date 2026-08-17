import { describe, expect, it } from 'vitest';
import {
  resolutionCatalogSchema,
  resolutionDescriptorSchema,
} from '../../src/lib/resolution-catalog';
import { resolutionCatalogRoute, resolutionRoute } from '../../src/lib/resolution-routes';
import { hasMermaidCodeFence } from '../../src/lib/resolution-markdown';

describe('resolutions', () => {
  it('validates the auxiliary catalog without changing persisted question schemas', () => {
    const catalog = {
      schemaVersion: 1 as const,
      contestStorageId: 'exemplo',
      subjects: [
        {
          subjectStorageId: 'fundamentos',
          resolutions: [{ questionId: 'q001', questionRevision: 1 }],
        },
      ],
    };
    expect(resolutionCatalogSchema.parse(catalog)).toEqual(catalog);
    expect(() => resolutionCatalogSchema.parse({ ...catalog, unknown: true })).toThrow();
    expect(() => resolutionDescriptorSchema.parse({ questionId: 'q001', questionRevision: 0 })).toThrow();
  });

  it('uses storage identities in stable auxiliary routes', () => {
    expect(resolutionRoute('exemplo', 'fundamentos')).toBe('/resolucoes/exemplo/fundamentos/');
    expect(resolutionCatalogRoute('exemplo')).toBe('/resolucoes/exemplo/index.json');
  });

  it('detects valid Mermaid fences with Markdown fence variations', () => {
    expect(hasMermaidCodeFence('```mermaid\nflowchart LR\n```')).toBe(true);
    expect(hasMermaidCodeFence('~~~~ mermaid\nflowchart LR\n~~~~')).toBe(true);
    expect(hasMermaidCodeFence('    ``` mermaid\nflowchart LR\n    ```')).toBe(true);
    expect(hasMermaidCodeFence('```text\nmermaid\n```')).toBe(false);
    expect(hasMermaidCodeFence(undefined)).toBe(false);
  });
});
