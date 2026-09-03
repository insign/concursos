#!/usr/bin/env node
/**
 * report-mega-review-equivalences.mjs — #717-mínimo (#715)
 *
 * Relatório somente-leitura (dry-run) que identifica grupos de concursos
 * distintos com o mesmo escopo canônico de assuntos, ou seja, candidatos a
 * compartilhar uma mega revisão canônica via `mega-revisao/vinculo.json`.
 *
 * - Não cria, move ou altera nenhum arquivo; apenas lê o conteúdo editorial.
 * - Equivalência = mesmo conjunto ordenado de IDs canônicos resolvidos pelos
 *   `vinculo.json` de assunto. Grupos com assuntos físicos (sem vínculo) são
 *   reportados como inelegíveis, nunca como equivalentes.
 * - O resultado é candidato a migração editorial, não prova de equivalência
 *   semântica: corpo, referências, corte temporal e aplicabilidade exigem
 *   comparação editorial antes de qualquer vínculo.
 *
 * Uso:
 *   node scripts/report-mega-review-equivalences.mjs [--json]
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const ASSUNTOS = join(ROOT, 'src', 'content', 'assuntos');
const BIBLIOTECA = join(ROOT, 'src', 'content', 'biblioteca');

const toId = (dir) => relative(ASSUNTOS, dir).split(sep).join('/');
const toBibId = (dir) => relative(BIBLIOTECA, dir).split(sep).join('/');

function listDirs(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .map((entry) => join(dir, entry))
    .filter((path) => {
      try {
        return statSync(path).isDirectory();
      } catch {
        return false;
      }
    });
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
}

function collectSubjectDirs(dir, subjects = []) {
  for (const child of listDirs(dir)) {
    // Um subgrupo legítimo (com grupo.json) nunca é um artefato, mesmo que
    // use um segmento reservado como `mega-revisao`.
    if (existsSync(join(child, 'grupo.json'))) {
      collectSubjectDirs(child, subjects);
      continue;
    }
    const base = child.split(sep).at(-1);
    if (base === 'mega-revisao' || base === 'resolucoes') continue;
    if (existsSync(join(child, 'vinculo.json')) || existsSync(join(child, 'conteudo.md'))) {
      subjects.push(child);
    }
  }
  return subjects;
}

function collectGroups(dir, groups = []) {
  for (const child of listDirs(dir)) {
    if (existsSync(join(child, 'grupo.json'))) {
      groups.push(child);
      collectGroups(child, groups);
    }
  }
  return groups;
}

function describeGroup(groupDir) {
  const groupId = toId(groupDir);
  const contestSlug = groupId.split('/')[0];
  const megaDir = join(groupDir, 'mega-revisao');
  let reviewMode = 'none';
  let linkedCanonical = null;
  if (existsSync(join(megaDir, 'vinculo.json'))) {
    reviewMode = 'canonical';
    linkedCanonical = readJson(join(megaDir, 'vinculo.json'))?.canonical ?? null;
  } else if (existsSync(join(megaDir, 'index.md'))) {
    reviewMode = 'local';
  }

  const canonicalSubjectIds = [];
  const unresolvedSubjectIds = [];
  for (const subjectDir of collectSubjectDirs(groupDir)) {
    const vinculo = existsSync(join(subjectDir, 'vinculo.json'))
      ? readJson(join(subjectDir, 'vinculo.json'))
      : null;
    if (typeof vinculo?.canonical === 'string' && vinculo.canonical.length > 0) {
      canonicalSubjectIds.push(vinculo.canonical);
    } else {
      unresolvedSubjectIds.push(toId(subjectDir));
    }
  }
  canonicalSubjectIds.sort();
  unresolvedSubjectIds.sort();

  return {
    groupId,
    contestSlug,
    reviewMode,
    linkedCanonical,
    canonicalSubjectIds,
    unresolvedSubjectIds,
    eligibleForCanonicalSharing: unresolvedSubjectIds.length === 0 && canonicalSubjectIds.length > 0,
    scopeKey: canonicalSubjectIds.join('\n'),
  };
}

function main() {
  const contests = listDirs(ASSUNTOS);
  const groups = contests.flatMap((contest) => collectGroups(contest).map(describeGroup));

  const byScope = new Map();
  for (const group of groups) {
    if (!group.eligibleForCanonicalSharing) continue;
    const list = byScope.get(group.scopeKey) ?? [];
    list.push(group);
    byScope.set(group.scopeKey, list);
  }

  const equivalences = [];
  for (const [scopeKey, members] of byScope) {
    const contestsInvolved = new Set(members.map((member) => member.contestSlug));
    if (members.length >= 2 && contestsInvolved.size >= 2) {
      equivalences.push({
        canonicalSubjectIds: members[0].canonicalSubjectIds,
        groupIds: members.map((member) => member.groupId).sort(),
        scopeKey,
      });
    }
  }
  equivalences.sort((a, b) => (a.groupIds[0] < b.groupIds[0] ? -1 : 1));

  // Prefixos de biblioteca que poderiam hospedar cada escopo equivalente.
  // Um grupo só é sugerido quando o escopo derivado da biblioteca sob o
  // prefixo comum mais longo é exatamente igual ao conjunto (mesma regra
  // de compatibilidade do catálogo).
  const bibliotecaSubjects = [];
  const walkBib = (dir) => {
    for (const child of listDirs(dir)) {
      if (existsSync(join(child, 'conteudo.md'))) bibliotecaSubjects.push(toBibId(child));
      else walkBib(child);
    }
  };
  if (existsSync(BIBLIOTECA)) walkBib(BIBLIOTECA);

  const longestCommonPrefix = (ids) => {
    const split = ids.map((id) => id.split('/'));
    const prefix = [];
    for (let i = 0; i < split[0].length - 1; i += 1) {
      const segment = split[0][i];
      if (split.every((parts) => parts[i] === segment)) prefix.push(segment);
      else break;
    }
    return prefix.join('/');
  };

  for (const equivalence of equivalences) {
    const prefix = longestCommonPrefix(equivalence.canonicalSubjectIds);
    const underPrefix = bibliotecaSubjects.filter((id) => id.startsWith(`${prefix}/`)).sort();
    const exact =
      prefix.length > 0 &&
      underPrefix.length === equivalence.canonicalSubjectIds.length &&
      underPrefix.every((id, index) => id === equivalence.canonicalSubjectIds[index]);
    equivalence.suggestedCanonicalGroup = exact ? prefix : null;
  }

  const report = {
    schemaVersion: 1,
    groups,
    equivalences,
    totals: {
      groups: groups.length,
      eligible: groups.filter((group) => group.eligibleForCanonicalSharing).length,
      equivalences: equivalences.length,
    },
  };

  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log(`Grupos: ${report.totals.groups} | elegíveis: ${report.totals.eligible} | equivalências: ${report.totals.equivalences}\n`);
  for (const group of groups) {
    const status = group.eligibleForCanonicalSharing ? 'elegível' : 'inelegível';
    console.log(
      `${group.groupId} [${group.reviewMode}] ${status} ` +
        `(${group.canonicalSubjectIds.length} canônicos, ${group.unresolvedSubjectIds.length} locais)`,
    );
  }
  if (equivalences.length > 0) {
    console.log('\nEquivalências entre concursos (candidatas a vínculo canônico):');
    for (const equivalence of equivalences) {
      console.log(`- ${equivalence.groupIds.join('  ==  ')}`);
      console.log(
        `  escopo: ${equivalence.canonicalSubjectIds.length} assuntos` +
          (equivalence.suggestedCanonicalGroup
            ? ` | grupo canônico sugerido: ${equivalence.suggestedCanonicalGroup}`
            : ' | sem prefixo de biblioteca diretamente representável'),
      );
    }
  }
}

main();
