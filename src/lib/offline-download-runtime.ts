import { downloadContestPackage, offlinePackageManifestSchema } from './offline-packages';
import { setRuntimeActivity } from './runtime-activity';

const jobs = new Map<string, ReturnType<typeof downloadContestPackage>>();

export function hasActiveDownloads(): boolean {
  return jobs.size > 0;
}

export function startContestDownload(
  ...args: Parameters<typeof downloadContestPackage>
): ReturnType<typeof downloadContestPackage> {
  const id = offlinePackageManifestSchema.parse(args[0]).contestStorageId;
  const existing = jobs.get(id);
  if (existing) return existing;
  const job = downloadContestPackage(...args);
  jobs.set(id, job);
  void job.finally(() => {
    if (jobs.get(id) === job) jobs.delete(id);
    setRuntimeActivity(`download:${id}`, jobs.has(id));
  }).catch(() => undefined);
  setRuntimeActivity(`download:${id}`, true);
  return job;
}
