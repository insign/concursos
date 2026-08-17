const MERMAID_FENCE = /^\s*(?:`{3,}|~{3,})\s*mermaid\b/m;

export function hasMermaidCodeFence(body: string | undefined): boolean {
  return body ? MERMAID_FENCE.test(body) : false;
}
