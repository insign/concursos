import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const ASSUNTOS = path.join(ROOT, 'src', 'content', 'assuntos');
const HEADING = /^(#{1,6})\s+(.*?)\s*$/;
const FENCE = /^\s*(```|~~~)/;
const REFERENCE_HEADING = /(refer[êe]nc|i[êe]ncia\s*(?:consultada|utilizada))|^fontes?\b/i;
const GENERIC_REFERENCE = /^(?:\d+(?:\.\d+)*[.)]?\s*)?refer[êe]ncias?$/i;

function stripFrontmatter(text) {
  if (!text.startsWith('---')) return { frontmatter: '', body: text };
  const end = text.indexOf('\n---', 3);
  if (end === -1) return { frontmatter: '', body: text };
  const newlineAfter = text.indexOf('\n', end + 1);
  return {
    frontmatter: text.slice(0, newlineAfter === -1 ? undefined : newlineAfter + 1),
    body: text.slice(newlineAfter === -1 ? text.length : newlineAfter + 1),
  };
}

function scanHeadings(lines) {
  const headings = [];
  let fence = null;
  lines.forEach((line, index) => {
    if (fence) {
      if (line.trimStart().startsWith(fence)) fence = null;
      return;
    }
    const marker = FENCE.exec(line);
    if (marker) {
      fence = marker[1];
      return;
    }
    const match = HEADING.exec(line);
    if (match) headings.push({ index, level: match[1].length, text: match[2] });
  });
  return headings;
}

function isReferenceHeading(text) {
  const stripped = text.replace(/^\d+(?:\.\d+)*[.)]?\s*/, '');
  return REFERENCE_HEADING.test(stripped);
}

function analyze(content) {
  const { frontmatter, body } = stripFrontmatter(content);
  const lines = body.split('\n');
  const headings = scanHeadings(lines);
  const candidates = headings.filter((heading) => isReferenceHeading(heading.text));
  if (candidates.length === 0) {
    return { status: 'sem-secao', frontmatter, lines, headings };
  }

  const last = candidates.at(-1);
  const blocking = headings.filter(
    (heading) => heading.index > last.index && heading.level <= last.level,
  );
  if (blocking.length > 0) {
    return { status: 'nao-final', frontmatter, lines, headings, candidate: last };
  }

  let start = last;
  for (let i = candidates.length - 2; i >= 0; i -= 1) {
    const previous = candidates[i];
    if (previous.level !== start.level) break;
    const between = headings.filter(
      (heading) => heading.index > previous.index && heading.index < start.index,
    );
    if (between.some((heading) => heading.level <= previous.level)) break;
    start = previous;
  }

  // Absorve seções de referência imediatamente anteriores de nível igual ou
  // mais profundo (ex.: "### Referências complementares" antes de "## Referências").
  for (let guard = 0; guard < 25; guard += 1) {
    const earlier = headings.filter((heading) => heading.index < start.index);
    const nearest = earlier.at(-1);
    if (!nearest || !isReferenceHeading(nearest.text) || nearest.level < start.level) break;
    const between = headings.filter(
      (heading) => heading.index > nearest.index && heading.index < start.index,
    );
    if (between.some((heading) => heading.level <= nearest.level)) break;
    start = nearest;
  }

  return { status: 'ok', frontmatter, lines, headings, start };
}

function buildReferencesBlock(lines, start) {
  const segment = lines.slice(start);
  const output = [];
  segment.forEach((line, offset) => {
    const match = offset === 0 || HEADING.test(line) ? HEADING.exec(line) : null;
    if (match && GENERIC_REFERENCE.test(match[2].replace(/^\d+(?:\.\d+)*[.)]?\s*/, ''))) {
      return;
    }
    if (match && offset !== 0) {
      output.push(`${'#'.repeat(match[1].length + 1)} ${match[2]}`);
      return;
    }
    if (match) {
      output.push(`${'#'.repeat(Math.min(6, match[1].length + 1))} ${match[2]}`);
      return;
    }
    output.push(line);
  });
  return `${output.join('\n').trim()}\n`;
}

function normalize(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function linesOf(content) {
  return stripFrontmatter(content).body.split('\n');
}

async function collectConteudos(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collectConteudos(full)));
    else if (entry.name === 'conteudo.md') files.push(full);
  }
  return files;
}

const checkOnly = process.argv.includes('--check');

if (process.env.DEBUG_REFERENCES_FILE) {
  const target = process.env.DEBUG_REFERENCES_FILE;
  const original = await readFile(target, 'utf8');
  const analysis = analyze(original);
  console.log(
    JSON.stringify(
      {
        status: analysis.status,
        start: analysis.start?.index ?? null,
        startHeading: analysis.start ? analysis.lines[analysis.start.index] : null,
        totalHeadings: analysis.headings.length,
        candidatos: analysis.headings
          .filter((heading) => isReferenceHeading(heading.text))
          .map((heading) => ({ index: heading.index, level: heading.level, text: heading.text })),
      },
      null,
      1,
    ),
  );
  process.exit(0);
}
const contents = await collectConteudos(ASSUNTOS);
const report = [];

for (const file of contents.sort()) {
  const relative = path.relative(ROOT, file);
  const original = await readFile(file, 'utf8');
  const analysis = analyze(original);

  if (process.env.DEBUG_REFERENCES_FILE && relative.includes(process.env.DEBUG_REFERENCES_FILE)) {
    console.error(
      JSON.stringify(
        {
          relative,
          status: analysis.status,
          start: analysis.start?.index,
          startHeading: analysis.start ? linesOf(original)[analysis.start.index] : null,
          candidatos: analysis.headings?.filter((heading) => isReferenceHeading(heading.text)).length,
        },
        null,
        1,
      ),
    );
  }

  if (analysis.status !== 'ok') {
    report.push({ file: relative, status: analysis.status });
    continue;
  }

  const { frontmatter, lines } = analysis;
  const startIndex = analysis.start.index;
  const rawSegment = lines.slice(startIndex).join('\n');
  const referencesMarkdown = buildReferencesBlock(lines, startIndex);
  const remainingBody = `${lines.slice(0, startIndex).join('\n').trimEnd()}\n`;
  const updatedContent = `${frontmatter}${remainingBody}`;
  const referencesPath = path.join(path.dirname(file), 'referencias.md');

  // Guarda proporcional: seção final de referências é uma fração do documento.
  const bodyLines = lines.length;
  const segmentLines = lines.length - startIndex;
  if (segmentLines > bodyLines * 0.5 || startIndex < 5) {
    report.push({ file: relative, status: 'suspeito', heading: lines[startIndex] });
    continue;
  }

  const intact =
    normalize(stripFrontmatter(original).body) ===
    normalize(`${remainingBody}\n${rawSegment}`);

  report.push({
    file: relative,
    status: intact ? 'ok' : 'violacao',
    heading: lines[startIndex],
    sha256: createHash('sha256').update(original).digest('hex').slice(0, 16),
    urls: (rawSegment.match(/https?:\/\/[^\s)]+/g) ?? []).length,
  });

  if (!checkOnly && intact) {
    if (process.env.DEBUG_REFERENCES_MATCH && relative.includes(process.env.DEBUG_REFERENCES_MATCH)) {
      console.error(
        JSON.stringify(
          {
            relative,
            start,
            totalLines: lines.length,
            segmentLines,
            frontmatterPreview: frontmatter.slice(0, 80),
            remainingPreview: remainingBody.slice(0, 80),
          },
          null,
          1,
        ),
      );
    }
    await writeFile(file, updatedContent);
    await writeFile(referencesPath, referencesMarkdown);
  }
}

const failures = report.filter((entry) => entry.status === 'violacao');
const suspicious = report.filter((entry) => entry.status === 'suspeito');
const pending = report.filter(
  (entry) => entry.status !== 'ok' && entry.status !== 'violacao' && entry.status !== 'suspeito',
);
for (const entry of failures) console.error(`VIOLAÇÃO: ${entry.file}`);
for (const entry of suspicious) console.error(`SUSPEITO: ${entry.file} — corte em "${entry.heading}"`);
for (const entry of pending) console.log(`${entry.status.toUpperCase()}: ${entry.file}`);
console.log(
  JSON.stringify(
    {
      total: report.length,
      ok: report.filter((entry) => entry.status === 'ok').length,
      pendentes: pending.map((entry) => ({ file: entry.file, status: entry.status })),
      suspeitos: suspicious.map((entry) => entry.file),
      violacoes: failures.length,
      modo: checkOnly ? 'check' : 'aplicar',
    },
    null,
    2,
  ),
);
if (failures.length > 0 || suspicious.length > 0) process.exitCode = 1;
