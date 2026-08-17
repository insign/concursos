let mermaidModule: Promise<typeof import('mermaid')> | null = null;
let mermaidSequence = 0;

function addMermaidFallback(diagram: HTMLElement, source: string): void {
  if (diagram.nextElementSibling?.matches('[data-mermaid-fallback]')) return;
  const fallback = document.createElement('details');
  const summary = document.createElement('summary');
  const code = document.createElement('pre');
  fallback.dataset.mermaidFallback = '';
  summary.textContent = 'Ver descrição textual do diagrama';
  code.textContent = source;
  fallback.append(summary, code);
  diagram.after(fallback);
}

export async function renderResolutionMermaid(root: HTMLElement): Promise<void> {
  const diagrams = [...root.querySelectorAll<HTMLElement>('pre.mermaid')];
  if (diagrams.length === 0) return;

  mermaidModule ??= import('mermaid');
  const { default: mermaid } = await mermaidModule;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    suppressErrorRendering: true,
    theme: 'neutral',
  });

  for (const diagram of diagrams) {
    const source = diagram.textContent?.trim() || diagram.dataset.diagram || '';
    const id = `question-resolution-mermaid-${mermaidSequence++}`;
    try {
      const rendered = await mermaid.render(id, source);
      const svgDocument = new DOMParser().parseFromString(rendered.svg, 'image/svg+xml');
      if (svgDocument.documentElement.nodeName.toLowerCase() !== 'svg') throw new Error('SVG inválido');
      diagram.replaceChildren(document.importNode(svgDocument.documentElement, true));
      rendered.bindFunctions?.(diagram);
      diagram.dataset.processed = 'true';
      diagram.dataset.renderStatus = 'success';
    } catch {
      diagram.dataset.processed = 'true';
      diagram.dataset.renderStatus = 'error';
      addMermaidFallback(diagram, source);
    }
  }
}
