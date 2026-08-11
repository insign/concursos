const TITLE_ATTRIBUTE = /(?:^|\s)title\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/i;

export function hasTitledAbbreviationTag(markup) {
  const visibleMarkup = markup.replace(/<!--[^]*?-->/g, '');
  const lower = visibleMarkup.toLowerCase();
  let searchFrom = 0;

  while (searchFrom < visibleMarkup.length) {
    const start = lower.indexOf('<abbr', searchFrom);
    if (start < 0) return false;
    const boundary = visibleMarkup[start + 5];
    if (boundary !== '>' && !/\s/.test(boundary ?? '')) {
      searchFrom = start + 5;
      continue;
    }

    let quote = '';
    let end = start + 5;
    for (; end < visibleMarkup.length; end += 1) {
      const character = visibleMarkup[end];
      if (quote) {
        if (character === quote) quote = '';
      } else if (character === '"' || character === "'") {
        quote = character;
      } else if (character === '>') {
        break;
      }
    }
    if (end >= visibleMarkup.length) return false;

    const title = TITLE_ATTRIBUTE.exec(visibleMarkup.slice(start, end + 1));
    if ((title?.[1] ?? title?.[2] ?? title?.[3] ?? '').trim()) return true;
    searchFrom = end + 1;
  }
  return false;
}

export function remarkMarkdownFeatures() {
  return (tree, file) => {
    let hasTitledAbbreviation = false;
    const inspect = (node) => {
      if (hasTitledAbbreviation) return;
      if (node?.type === 'html' && hasTitledAbbreviationTag(String(node.value ?? ''))) {
        hasTitledAbbreviation = true;
        return;
      }
      if (Array.isArray(node?.children)) node.children.forEach(inspect);
    };
    inspect(tree);
    if (!hasTitledAbbreviation) return;

    file.data.astro ??= {};
    file.data.astro.frontmatter ??= {};
    file.data.astro.frontmatter.hasTitledAbbreviation = true;
  };
}
