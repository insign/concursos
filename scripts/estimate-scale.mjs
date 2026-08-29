import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
  }))).flat();
}

const contestFiles = (await listFiles(path.join(root, 'src/content/concursos'))).filter((file) => file.endsWith('.json'));
const subjectFiles = await listFiles(path.join(root, 'src/content/assuntos'));
const subjectDirectories = new Set(
  subjectFiles
    .filter((file) => file.endsWith('/questoes.json') || file.endsWith('/vinculo.json'))
    .map(path.dirname),
);
const resolutions = subjectFiles.filter((file) => /\/resolucoes\/(?!referencias\.md$)[^/]+\.md$/.test(file)).length;
const megaReviews = subjectFiles.filter((file) => file.endsWith('/mega-revisao/index.md')).length;
const targetContests = Number.parseInt(process.env.TARGET_CONTESTS || '30', 10);
const targetSubjectsPerContest = Number.parseInt(process.env.TARGET_SUBJECTS_PER_CONTEST || '300', 10);
const targetSubjects = targetContests * targetSubjectsPerContest;
const estimate = {
  schemaVersion: 1,
  current: {
    contests: contestFiles.length,
    subjects: subjectDirectories.size,
    resolutions,
    megaReviews,
    estimatedStudyHtml: subjectDirectories.size * 3 + resolutions + megaReviews + contestFiles.length,
  },
  target: {
    contests: targetContests,
    subjects: targetSubjects,
    estimatedStudyHtml: targetSubjects * 3 + targetContests,
  },
};
console.log(JSON.stringify(estimate, null, 2));
