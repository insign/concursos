# Architecture Decision Records

## ADR-001: Agrupamentos editoriais desacoplados de rotas e persistência (2026-07-15)

**Status**: Accepted

**Context**: The catalog needs a recursive editorial hierarchy, while published subject routes and stable persisted subject identities already exist and must remain compatible.

**Decision**:
- Every group level must contain a mandatory, strictly validated `grupo.json` descriptor.
- Internal collection IDs use the complete nested path.
- `contest.children` represents the recursive presentation tree.
- `contest.subjects` remains the flat projection used by routes, navigation, synchronization, offline packages, and catalog-wide subject lookup.
- Public URLs remain `/concursos/<concurso>/<assunto>/`.
- `contestStorageId` and `subjectStorageId` remain the only persisted contest and subject identities.
- Groups have no `storageId`, public route, or identity in KV, IndexedDB, backups, progress, synchronization, or offline storage.

**Rationale**:
- This separates editorial organization from public addressing and persisted data, allowing the hierarchy to evolve without breaking URLs or user state.
- Short routes and stable subject identities preserve existing navigation, synchronization, and offline contracts.
- Explicit strict descriptors make the hierarchy deterministic and build-time validated.
- Rejected alternatives: group slugs in public URLs, duplicated group metadata in every subject, implicit unschematized directories, and group `storageId` values.

**Consequences**:
- ✅ Editorial groups may be nested recursively without changing public routes or persisted subject identities.
- ✅ Presentation can use the recursive tree while route, navigation, sync, and offline consumers keep a simple flat subject projection.
- ⚠️ Final subject slugs must be unique within each contest because group paths do not disambiguate public URLs.
- ⚠️ The build fails for missing parent descriptors, implicit groups, empty groups, or duplicate public subject slugs.
- ❌ Groups cannot have independent routes, persisted state, progress, synchronization, backups, or offline identity.

## ADR-002: Ativação de alias com preflight integral e arbitragem por documento (2026-07-23)

**Status**: Accepted

**Context**: Alias activation and linking can expose remote preferences, answers, and progress created by another browser or installation. The public KV API provides last-write-wins complete-document storage without CAS, ETag, or `If-Match`, while local IndexedDB writes may occur concurrently across tabs. Activation must therefore protect the current alias, inspect the complete target profile, and distinguish local multi-tab reconciliation from remote document arbitration without claiming perfect synchronization.

Related: GitHub issue #108.

**Decision**:
- Alias activation or linking requires an online, catalog-wide preflight before any PUT for the target alias or any active-alias `localStorage` commit. Offline linking is refused.
- The preflight reads and validates target preferences, every answer document enumerated by `/sync-catalog.json`, and target progress. Malformed remote JSON is quarantined and cannot replace valid local state. When any target remote document exists, activation requires explicit confirmation.
- Each complete remote document is resolved independently against its local counterpart using the observed version, with `remoteVersion ?? 0`: the higher version wins; equal versions with a pending outbox publish the complete local document; equal clean versions are a no-op. Remote answers are not merged by question, preferences are not merged by field, and progress is not merged by subject.
- Local concurrent writes remain a separate concern: multi-tab updates merge only dirty question IDs, preference fields, or progress subjects into the latest IndexedDB record.
- Target preparation follows dependency order: preferences, answers, then rematerialized progress. Successful PUT metadata is preserved if a later operation fails, and the next attempt repeats the full preflight; no rollback is claimed.
- The current active alias is preserved and revalidated after failures, around asynchronous work, and immediately before the `localStorage` commit. Pending work for the current alias is synchronized when possible. Explicitly authorized discard occurs only after the target profile is prepared.
- The KV service remains public last-write-wins storage without CAS, ETag, or `If-Match`; the system does not guarantee perfect synchronization.
- This decision adds no IndexedDB store or version, no `localStorage` linking marker, no backend or authentication, and no automatic alias migration.

**Rationale**:
- A complete online preflight prevents partial discovery of the target profile and avoids mutating target or active-alias state before the user can review existing remote data.
- Complete-document arbitration matches the KV API contract and avoids unsupported field-level conflict semantics, while dirty-part merging remains appropriate for coordinated local IndexedDB writes.
- Dependency ordering ensures progress is derived from the resolved preferences and answers rather than accepted as an independent source of truth.
- Preserving successful PUT metadata and retrying preflight reflects observable last-write-wins behavior more accurately than attempting a rollback that the API cannot guarantee.
- Rejected alternatives: remote field-level merge, because it conflicts with complete-document arbitration; a linking marker or dedicated IndexedDB store, because it adds persistent state without removing the need for preflight; a `/version` probe before GET, because the complete document must still be fetched and validated; offline linking, because the target profile cannot be safely inspected; and CAS-based arbitration, because the KV API does not provide CAS, ETag, or `If-Match`.

**Consequences**:
- ✅ Existing target data is discovered and validated before activation, with explicit user control when remote documents exist.
- ✅ Local multi-tab edits retain precise dirty-part merging without weakening remote complete-document arbitration.
- ✅ Progress is consistently rematerialized from resolved preferences and answers.
- ⚠️ Activation requires network access and a catalog-wide set of reads, and partial failure requires another complete preflight.
- ⚠️ Some PUTs may succeed before a later failure; their metadata is retained, but activation offers no transactional rollback.
- ⚠️ Last-write-wins storage without conditional writes can still lose races, so synchronization is best-effort rather than perfect.
- ❌ Users cannot link an alias offline or rely on automatic alias migration.
