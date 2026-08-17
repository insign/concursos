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
- Groups have no `storageId`, public group route, or identity in KV, IndexedDB, backups, progress, synchronization, or offline storage; a route owned by a separate editorial document, such as an optional mega review, is not a group route.

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

## ADR-003: Local durability barrier for automatic PWA activation (2026-07-31)

**Status**: Accepted

**Context**: Automatic PWA activation and reload can discard transient local state that is not yet durable because it remains behind a UI debounce or semantic navigation capture. The integrated review of commit `22b5325` required a shared barrier that covers these independent producers without changing the fully static architecture or the existing IndexedDB and KV contracts.

**Decision**:
- `src/lib/local-durability.ts` registers local flushers and maintains a monotonic global activity revision for durability-relevant work.
- Reading preferences mark persistent edits as activity and flush pending debounce timers, dirty fields, and in-flight writes.
- Navigation uses a local epoch, awaits bounded initialization, restoration, and older captures, creates a final local-only snapshot, and rejects the flush while a cross-route redirect is pending. Navigation catalog fetching remains bounded.
- `pwa-update.ts` performs two flush-plus-IndexedDB-settled phases and repeats the barrier until the global activity revision is stable. Any flusher, capture, or persistence failure propagates and aborts activation and reload.
- The barrier requires local durability only; remote synchronization is not required before activation. The application remains fully static, and existing IndexedDB and KV schemas, identity, arbitration, and synchronization contracts remain unchanged.

**Rationale**:
- A shared revisioned barrier detects durability work created while an earlier flush is settling, rather than assuming that one pass observes every producer.
- Producer-owned flushers preserve the semantics of debounced preferences and navigation capture while giving PWA activation one failure-aware contract.
- Requiring local IndexedDB durability protects reload safety without coupling activation to network availability or best-effort remote KV synchronization.
- Bounded navigation waits and catalog fetching prevent the activation barrier from hanging indefinitely.

**Consequences**:
- ✅ Successful automatic activation and reload occur only after relevant transient local state is durably represented in IndexedDB and no newer local activity is observed.
- ✅ Preference debounce and semantic navigation capture participate in one extensible durability protocol without introducing a backend or changing persistent schemas.
- ⚠️ New transient-state producers that must survive reload need to register a flusher and mark durability-relevant activity correctly.
- ⚠️ Activation may wait through multiple bounded phases when local activity continues during flushing.
- ❌ Any local flush, navigation capture, or IndexedDB settlement failure prevents automatic activation and reload until a later successful attempt.

## ADR-004: Optional complex resolutions as derived editorial content (2026-08-17)

**Status**: Accepted

**Context**: Some questions require an optional, detailed resolution that is too rich for the question payload and should be available without changing the question's persisted or synchronized identity. The static Astro build, existing PWA clients, simulator snapshots, and complete-document synchronization contracts must remain compatible. Issue #308 implemented and reviewed this capability, including accessible delivery and offline support.

Related: ADR-001, ADR-003, and GitHub issue #308.

**Decision**:
- Add a sixth editorial collection, `resolucoes`, with optional files at `resolucoes/<questionId>.md` inside each subject folder.
- Validate strict versioned frontmatter `{schemaVersion: 1, questionRevision, title?}`. The build fails for orphan resolution files, unknown `questionId` values, or a `questionRevision` that differs from the referenced question.
- Derive resolution availability from the editorial catalog. Do not add resolution fields to `questionSchema`, `syncQuestionSchema`, `/sync-catalog.json`, simulator pools, simulator snapshots, or any persisted document.
- Pre-render resolution Markdown at build time through the existing Unified/KaTeX pipeline. Serve it at `/resolucoes/<contestStorageId>/<subjectStorageId>/`, with the contest index at `/resolucoes/<contestStorageId>/index.json`.
- Expose resolutions from questionnaires and simulators through accessible `<dialog>` elements. Show the trigger only when correction is revealable; in a simulator, require `status` `completed` and keep the trigger outside the disabled question fieldset. A matching `questionRevision` is required before content can be shown.
- Include resolution routes in contest offline inventories and the Service Worker. Mermaid in injected resolution content uses a conditional same-origin entrypoint with `securityLevel: "strict"` and textual fallback; it must not require `unsafe-eval` or a CDN.
- Resolution updates do not change question revisions or simulator snapshots. Simulator snapshots freeze their question data, order, and configuration, but do not freeze resolution content.

**Rationale**:
- A separate editorial collection keeps optional rich content out of the stable question and synchronization contracts, preserving compatibility with already published PWA clients.
- Strict cross-validation prevents a resolution from silently explaining a missing question or an obsolete revision.
- Static pre-rendering and catalog-derived indexes fit the existing backend-free architecture and make the content available to offline packages.
- Accessible dialogs provide contextual explanations without taking the learner away from the question or simulator session, while revealability and completion rules preserve correction semantics.
- Independent resolution updates let editorial explanations improve without rewriting question revisions or historical simulator data.
- Rejected alternatives: embedding resolutions in `questionSchema` or persisted question/simulator documents, because it would expand stable payloads and couple optional content to synchronization; freezing resolutions in simulator snapshots, because editorial corrections would require new attempts or snapshot migrations; a runtime/API-backed resolution service, because it would break the static and offline model; and an unconditional or CDN-based Mermaid runtime, because it would weaken conditional loading and the existing CSP/security invariants.

**Consequences**:
- ✅ Rich optional explanations can be authored, validated, pre-rendered, indexed, and delivered independently from question payloads.
- ✅ Existing question identities, revisions, synchronization schemas, simulator pools, snapshots, and persisted documents remain unchanged.
- ✅ Orphaned, unknown, or stale resolutions fail during the build instead of reaching learners, and valid routes participate in offline packages.
- ✅ Learners receive contextual, accessible explanations in both questionnaires and completed simulators.
- ⚠️ A resolution must be updated or removed when its referenced question revision changes, and availability follows the current catalog.
- ⚠️ Resolution routes and optional Mermaid dependencies increase build and offline-inventory work, with conditional runtime loading required.
- ❌ A stale resolution is intentionally unavailable, and a simulator cannot preserve a historical copy of resolution content inside its snapshot.

## ADR-005: Optional mega reviews as derived editorial documents (2026-08-17)

**Status**: Accepted

**Context**: The editorial catalog needs an optional authorial Markdown document that consolidates the subjects of a recursive group for review, without turning groups into routable or persisted entities. The implementation must preserve subject-only projections and the existing static Markdown, runtime, security, print, and offline contracts. Its location must distinguish mega-review documents from per-question resolution files without reserving valid editorial slugs.

Related: ADR-001, ADR-003, ADR-004, and GitHub issue #309.

**Decision**:
- Store an optional authorial mega review at `src/content/assuntos/<concurso>/<grupo>[/<grupo>...]/mega-revisao/index.md`.
- Add the `megaRevisoes` collection and derive its availability from the catalog. The editorial document ID is the complete group ID; groups receive no `storageId` and no persisted state.
- Require strict versioned frontmatter `{schemaVersion: 1, slug, title?}`.
- Pre-render the document through the existing Markdown pipeline and publish it at `/revisoes/<contestSlug>/<reviewSlug>/`. The route belongs to the document, not the group, and never exposes the group path.
- Permit `contest.children` to expose a mega-review entry, but exclude mega reviews from `contest.subjects`, subject URLs, navigation, synchronization, progress, studied subjects, simulators, backups, IndexedDB, and KV.
- Preserve the existing conditional runtimes, CSP, printing behavior, and non-JavaScript fallback for the rendered page.
- Derive coverage in recursive order. When a nested subgroup has its own mega review, the parent delegates that subgroup as one link instead of expanding its descendants and duplicating coverage.
- Include mega-review routes in the offline inventory and reuse the existing asset hashing, cache promotion, and Service Worker behavior.

**Rationale**:
- A separate catalog-derived collection keeps optional aggregate content out of stable subject and persistence contracts.
- A document-owned route provides a public destination without making the editorial group itself routable, preserving ADR-001's distinction between group structure and document routes.
- Recursive delegation gives authors composable reviews with deterministic, nonduplicated coverage.
- Reusing the existing Markdown, runtime, security, print, and offline pipelines preserves the static architecture and established delivery guarantees.
- The `mega-revisao/index.md` layout separates the document structurally from `resolucoes/*.md` while leaving valid editorial slugs available.

**Consequences**:
- ✅ Authors can publish optional aggregate reviews for recursive groups with deterministic coverage and links to nested reviews.
- ✅ Subject URLs, subject identities, navigation and synchronization, user state, simulator data, backups, IndexedDB, KV, and offline subject projections remain unchanged.
- ✅ Review pages are statically rendered, security-constrained, printable, fallback-capable, and available to offline packages.
- ⚠️ Availability and coverage follow the current editorial catalog and require a new build when documents or nested-group delegation change.
- ⚠️ Conditional runtime loading and offline inventory integration add review-specific build and validation paths.
- ❌ A mega review has no independent subject progress, answers, studied state, simulator snapshot, backup record, or synchronization identity, and the group still has no public route of its own.
