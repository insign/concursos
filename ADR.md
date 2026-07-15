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
