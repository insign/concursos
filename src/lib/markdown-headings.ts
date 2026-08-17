export function hasMarkdownH1(markdown: string): boolean {
  let fence: string | null = null;

  for (const line of markdown.split(/\r?\n/)) {
    const fenceMatch = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
    if (fence) {
      const marker = fenceMatch?.[1];
      const remainder = fenceMatch?.[2] ?? '';
      if (
        marker?.[0] === fence[0] &&
        marker.length >= fence.length &&
        /^\s*$/.test(remainder)
      ) fence = null;
      continue;
    }
    if (fenceMatch?.[1]) {
      fence = fenceMatch[1];
      continue;
    }
    if (/^ {0,3}#\s/.test(line)) return true;
  }

  return false;
}
