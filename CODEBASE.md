# Code map of concursos

## Folder Structure

```text
.
├── astro.config.mjs                 # Astro 7 static build, Markdown pipeline, CSP and PWA integration
├── package.json                      # npm scripts and runtime/development dependencies
├── tsconfig.json                     # Astro strict TypeScript configuration
├── vitest.config.ts                  # Unit-test discovery
├── playwright.config.ts              # Chromium E2E project and built-site server
├── .build-metrics.json               # Generated build metrics (schemaVersion 1, phases, output stats)
├── scripts/
│   ├── build.mjs                     # Orchestrates Astro → CSP → (inventories ‖ SW), metrics + concurrency
│   ├── build-budget.json             # Build-time budget thresholds (totalMs, astroMs, files, bytes)
│   ├── check-build-budget.mjs        # Validates .build-metrics.json against build-budget.json
│   ├── estimate-scale.mjs            # Estimates current/target study HTML scale for sharding planning
│   ├── finalize-security.mjs         # Thin wrapper over scripts/lib/finalize-security.mjs
│   ├── generate-offline-inventories.mjs # Wrapper over scripts/lib/offline-inventory-builder.mjs
│   ├── build-service-worker.mjs      # Bundles and injects the Workbox precache manifest
│   ├── migrate-references.mjs        # One-off references migration script (provenance)
│   ├── generate-icons.mjs            # Generates PWA and favicon assets
│   └── lib/
│       ├── build-budget.mjs          # Pure evaluateBuildBudget(metrics, budget) helper
│       ├── concurrency.mjs           # resolveConcurrency() + mapConcurrent() pool
│       ├── finalize-security.mjs     # CSP hash finalization extracted for unit testing
│       ├── offline-inventory-builder.mjs # Inventory builder: hash cache, chunked hashing, transitive deps
│       └── precache-dependencies.mjs # Transitive precache dependency discovery for SW
├── public/
│   ├── _headers                       # Pages security and cache headers
│   ├── _redirects                     # Legacy redirects
│   ├── robots.txt                     # Crawler policy
│   └── icons/                         # PWA, Apple touch and theme icons
├── src/
│   ├── content.config.ts              # Eight Astro Content Collections and loaders
│   ├── content/
│   │   ├── concursos/*.json           # Contest metadata
│   │   └── assuntos/<concurso>/
│   │       ├── <grupo>[/<subgrupo>]/grupo.json # Required group descriptors
│   │       ├── <grupo>[/<subgrupo>]/mega-revisao/index.md # Optional group mega review
│   │       ├── <grupo>[/<subgrupo>]/mega-revisao/referencias.md # Required when the mega review exists
│   │       └── <grupo>[/<subgrupo>]/<assunto>/
│   │           ├── conteudo.md         # Complete subject content
│   │           ├── cheat-sheet.md      # Printable quick reference
│   │           ├── questoes.json       # Editorial question set
│   │           ├── referencias.md      # Required subject references
│   │           └── resolucoes/*.md     # Optional question resolutions plus aggregated referencias.md
│   ├── pages/                         # Static UI pages and JSON endpoints
│   ├── components/                    # Astro UI components and browser runtimes
│   ├── layouts/                       # BaseLayout and StudyLayout composition
│   ├── lib/                           # Catalog, editorial, questionnaire, PWA and persistence logic
│   ├── scripts/                       # Small browser scripts, including abbreviation popovers
│   ├── service-worker.ts              # Inject-Manifest Service Worker source
│   └── styles/
│       ├── fonts/                     # Locally packaged editorial fonts
│       ├── global.css                 # Global responsive design tokens and layout
│       ├── print.css                  # Print-only rules
│       ├── simulados.css              # Simulados page styles
│       └── fonts.css                  # Local font declarations
├── tests/
│   ├── unit/                          # Vitest tests for pure logic and persistence
│   └── e2e/                           # Playwright Chromium tests against dist
├── docs/                              # Supporting project documentation
└── dist/                              # Generated static output and offline manifests
```

## Entry Points

- `astro.config.mjs`: configures `output: 'static'`, site metadata, Unified Markdown with GFM/math/KaTeX, Shiki, strict Mermaid, CSP and `vite-plugin-pwa`.
- `src/pages/index.astro`: root catalog; calls `getCatalog()` and links contests and `/simulados/`.
- `src/pages/concursos/[concurso]/index.astro`: statically generates contest catalog pages.
- `src/pages/concursos/[concurso]/[assunto]/index.astro`: content route; renders the Markdown collection entry.
- `src/pages/concursos/[concurso]/[assunto]/cheat-sheet.astro`: cheat-sheet route with print controls.
- `src/pages/concursos/[concurso]/[assunto]/questoes.astro`: questionnaire route; passes the question set and resolution descriptors to `Questionnaire.astro`.
- `src/pages/revisoes/[concurso]/[revisao].astro`: statically generates group mega-review pages and renders their rich Markdown scope.
- `src/pages/simulados/index.astro`: static simulados shell; imports `simulados-controller` and the result breakdown runtime.
- `src/pages/sync-catalog.json.ts`: legacy global sync catalog (subjects across all contests).
- `src/pages/sync-catalog/[concurso].json.ts` + `src/pages/sync-catalog-index.json.ts`: per-contest sync-catalog shards + lightweight index (contestStorageId, manifests).
- `src/pages/navigation-catalog.json.ts` + `src/pages/navigation-catalog/[concurso].json.ts` + `src/pages/navigation-catalog-index.json.ts`: global navigation catalog + per-contest shards + lightweight index.
- `src/pages/subject-suggestions/[concurso].json.ts`: per-contest lightweight payload `schemaVersion: 1` (`contestSlug`, `contestStorageId`, `model`) derived from `getSubjectSuggestionModel()`; same-origin validation.
- `src/pages/offline-inventories/[concurso].json.ts`: exposes each catalog-derived contest inventory, including generated mega-review routes.
- `src/service-worker.ts`: Workbox runtime, precache (transitive via `precache-dependencies`), offline navigation, `matchOfflineAsset`/`matchActiveContestCaches`/`matchRuntimePage`, NetworkOnly `https://kv.helio.me`, navigation-triggered auto-update, Periodic Background Sync.
- `scripts/build.mjs`: canonical build orchestrator — `astro build` → `finalize-security.mjs` → `inventories ‖ serviceWorker` in parallel (sequential when `BUILD_SEQUENTIAL=1`); concurrency via `scripts/lib/concurrency.mjs`, metrics to `.build-metrics.json` (`BUILD_METRICS_PATH` override).
- `tests/unit/**/*.test.ts`: Vitest entrypoint selected by `vitest.config.ts`.
- `tests/e2e/**/*.spec.ts`: Playwright Chromium entrypoint; its web server builds `dist` and serves it with Wrangler Pages Dev.

## Content Model, Identity and Routes

### Collections

`src/content.config.ts` declares the following eight strict collections:

- `concursos`: `src/content/concursos/**/*.json`, IDs from `contestIdFromEntry`, validated by `contestSchema`.
- `grupos`: `src/content/assuntos/**/grupo.json`, IDs from `groupIdFromEntry`, validated by `groupSchema`.
- `megaRevisoes`: `src/content/assuntos/**/mega-revisao/index.md`, IDs from `megaReviewIdFromEntry`, validated by `megaReviewSchema`.
- `conteudos`: `src/content/assuntos/**/conteudo.md`, IDs from `subjectIdFromEntry`, validated by `subjectSchema`.
- `cheatSheets`: `src/content/assuntos/**/cheat-sheet.md`, IDs from `subjectIdFromEntry`, validated by `cheatSheetSchema`.
- `questoes`: `src/content/assuntos/**/questoes.json`, IDs from `subjectIdFromEntry`, validated by `questionSetSchema`.
- `resolucoes`: `src/content/assuntos/**/resolucoes/*.md` (excluding `**/resolucoes/referencias.md`), IDs from `resolutionIdFromEntry`, validated by `resolutionSchema`.
- `referencias`: glob `**/referencias.md`, subject, mega-review and aggregated resolution references.

`src/lib/content-paths.ts` defines the canonical editorial identity:

- Contest: the root contest JSON filename without `.json`.
- Group: `<concurso>/<grupo>[/<grupo>...]`; every ancestor must have `grupo.json`.
- Subject: `<concurso>/<grupo>[/<grupo>...]/<assunto>`; direct subjects under a contest are invalid.
- Mega review: `src/content/assuntos/<concurso>/<grupo>[/<grupo>...]/mega-revisao/index.md`; its canonical ID is the containing group path.
- Resolution: `<subject-id>/resolucoes/<question-id>`; the question ID uses the stable editorial ID alphabet, and `referencias` is rejected as a question ID.
- Reference: `referenceIdFromEntry`/`parseReferenceId` derive reference IDs from subject, mega-review and resolution-aggregate paths.
- `storageId` belongs to contests and subjects and is used for persistence and auxiliary routes; groups do not have storage identity.
- Public subject URLs remain short: `/concursos/<concurso-slug>/<assunto-slug>/`, independent of nested group depth.

### Main static routes and auxiliary data

- `/`: contest catalog.
- `/concursos/<concurso>/`: contest tree and subject navigation.
- `/concursos/<concurso>/<assunto>/`: content; `/cheat-sheet/` and `/questoes/` are the other study tabs.
- `/revisoes/<contestSlug>/<reviewSlug>/`: statically rendered mega review for a group, including its derived descendant scope.
- `/resolucoes/<contestStorageId>/<subjectStorageId>/`: pre-rendered resolution document containing all resolutions for a subject.
- `/resolucoes/<contestStorageId>/index.json`: versioned resolution catalog for a contest.
- `/sync-catalog.json`: legacy global answerable question schemas for synchronization; `origin` is intentionally omitted.
- `/sync-catalog/<contestStorageId>.json`: per-contest sync-catalog shard (from `src/lib/static-catalogs.ts`).
- `/sync-catalog-index.json`: lightweight index over sync-catalog shards.
- `/navigation-catalog.json`: legacy global route/context catalog for navigation synchronization.
- `/navigation-catalog/<contestStorageId>.json`: per-contest navigation shard.
- `/navigation-catalog-index.json`: lightweight index over navigation shards.
- `/subject-suggestions/<contestStorageId>.json`: per-contest subject-suggestion payload (`schemaVersion: 1`).
- `/simulados/catalog.json`: contest/subject metadata and counts by question origin.
- `/simulados/pool/<contestStorageId>.json`: full question pool for a contest, loaded when a simulado is generated.
- `/offline-inventories/<contestStorageId>.json`: generated package manifest for a contest.
- `/simulados/`, `/configuracoes/`, `/offline/` and `/404`: auxiliary UI routes.

## Core Modules

### Build orchestration and budget

- `scripts/build.mjs`: runs `astro build`, then `scripts/finalize-security.mjs`, then `generate-offline-inventories.mjs ‖ build-service-worker.mjs` in parallel; records `startedAt`, `mode` (`parallel`/`sequential`), `concurrency`, per-phase `durationMs` and output stats (`files`, `htmlFiles`, `bytes`) to `.build-metrics.json`.
- `scripts/lib/concurrency.mjs`: `resolveConcurrency()` (env `BUILD_CONCURRENCY` → `availableParallelism()` clamped 2–16, max 64) and `mapConcurrent(items, concurrency, worker)` pool used by build orchestration, metrics collection and inventory building.
- `scripts/lib/build-budget.mjs` + `scripts/build-budget.json` + `scripts/check-build-budget.mjs`: pure `evaluateBuildBudget(metrics, budget)` checks `totalMs`, `astroMs`, `files`, `bytes`; `check-build-budget.mjs` reads `.build-metrics.json` vs `build-budget.json`.
- `scripts/estimate-scale.mjs`: scans `src/content/concursos` and `src/content/assuntos` to estimate current vs target (`TARGET_CONTESTS=30`, `TARGET_SUBJECTS_PER_CONTEST=300`) study HTML scale; used to size sharding.

### Extracted testable build helpers

- `scripts/lib/finalize-security.mjs`: CSP hash finalization logic extracted from the former monolithic wrapper; re-exported by `scripts/finalize-security.mjs` for backward compatibility and tested in `tests/unit/build-scripts.test.ts`.
- `scripts/lib/offline-inventory-builder.mjs`: `buildOfflineManifest()` / `runOfflineInventoryBuild()` with resource-reader hash cache (retains only `icons`/`favicon`/`_astro/*.css|js|fonts`), `isInventoryAsset`/`isSharedAsset` separation, transitive `collectAssets` over HTML→CSS/JS→assets, and `hashInChunks` (chunk size = `concurrency`) producing `manifestHash`/`sharedHash`/`resourceHashes` (`schemaVersion: 3`).
- `scripts/lib/precache-dependencies.mjs`: discovers transitive precache dependencies for the Service Worker manifest (same `/_astro/` + shared-asset classification used by the inventory builder).

### Catalog and editorial validation

- `src/lib/catalog.ts`: `getCatalog()` loads all eight collections, calls `buildCatalogIndex()` with `REQUIRE_REFERENCES = true`, checks non-empty reference bodies, hydrates collection entries including optional group mega reviews and their `referencesEntry`/`resolutionReferencesEntry`/`megaReviewReferencesEntry`, indexes resolutions by subject, creates offline inventory metadata and supplies `getSubjectStaticPaths()`. Phase 0–3 memoizes by build: module-scoped `catalogPromise` ensures a single `loadCatalog()` per build/SSR instance.
- `src/lib/catalog-core.ts`: `buildCatalogIndex()` validates canonical IDs, optional mega-review ownership, contest-local review slugs alongside contest/subject storage IDs, companion files, group ancestry, non-empty groups, contest references, public subject slug uniqueness, orphan resolutions, question existence and exact question revisions; its validation matrix takes a `requireReferences` option (subject references always required; a mega review requires references iff it exists; resolutions require the aggregate iff any resolution exists; orphaned/duplicated/empty-body references fail); it sorts the group tree and flat subject projection, assigns previous/next subject IDs and adds mega-review routes to `createOfflineInventory()`.
- `src/lib/content-schema.ts`: strict Zod schemas for contests, groups, mega reviews, subjects, resolutions, question sets and synchronization question sets.
- `src/lib/content-paths.ts`: path normalization, route-segment checks and parsers for contest, group, mega-review, subject and resolution IDs; also `referenceIdFromEntry`/`parseReferenceId` for reference entries.
- `src/lib/catalog-groups.ts`: versioned local persistence of collapsed catalog groups.
- `src/lib/mega-review-routes.ts`: builds encoded public routes in `/revisoes/<contestSlug>/<reviewSlug>/`.
- `src/lib/mega-review-scope.ts`: traverses a group tree in editorial order, listing subjects and delegating nested groups that have their own review.
- `src/lib/markdown-headings.ts`: detects a real Markdown H1 outside fenced code blocks for review title fallback behavior.
- `src/lib/static-catalogs.ts`: pure, catalog-free builders `buildSyncCatalogSubjects(contests)` (strips `origin` via `syncQuestionSet`) and `buildNavigationCatalogRoutes(contests, includeGlobalRoutes)` used by both global and per-contest endpoints; covered by `tests/unit/static-catalogs.test.ts`.

### Study layouts and shared runtimes

- `src/layouts/BaseLayout.astro`: document metadata, noindex policy, local KaTeX/fonts, global styles and shared navigation, simulado-sync and PWA runtimes.
- `src/layouts/StudyLayout.astro`: breadcrumbs, group path, study tabs, subject navigation/pagination, focus mode and action bar.
- `src/components/SubjectCatalogTree.astro`, `SubjectNavigation.astro`, `SubjectPagination.astro`, `NextSubjectSuggestion.astro`: catalog tree, optional group mega-review links and deterministic study navigation.
- `src/components/ReadingFocusRuntime.astro`, `ReadingCustomizer.astro`, `SubjectActionBar.astro`: canonical `#focus` reading mode and reading preferences.
- `src/components/MermaidRuntime.astro`, `AbbreviationRuntime.astro`, `PrintButton.astro`: conditional Markdown/browser enhancements.
- `src/lib/navigation*.ts`, `subject-suggestion.ts`, `studied.ts`, `reading-preferences.ts`: navigation documents, reading-position persistence, study marks, suggestion selection and reading customization.
- `src/components/DocumentReferences.astro`: collapsed inline `<details>` references block at the end of articles; expanded on print (idempotent beforeprint/afterprint) and hidden in `#focus`.
- `src/lib/reading-progress.ts`: pure `readingProgressFraction` used by `ReadingFocusRuntime.astro`; ends the fraction at the top of `[data-reading-progress-ignore]`.

### Questionnaire and question resolutions

- `src/components/Questionnaire.astro`: serializes the current `QuestionSet`, contest/subject storage IDs and optional resolution descriptors; exposes native layout, correction, origin-filter and submission controls.
- `src/lib/questionnaire-controller.ts`: `mountQuestionnaire()` owns browser state, single/ten/all presentations, ephemeral origin filtering, deterministic or explicit random question order, answer snapshots, finalization, local progress and profile synchronization.
- `src/lib/questionnaire.ts`: answer documents, revision-aware scoring, deterministic answer hashing, submission signatures and reconciliation.
- `src/lib/questionnaire-resolutions.ts`: observes rendered question cards and adds a resolution trigger only after correction is revealed and the descriptor revision matches the question revision.
- `src/lib/resolutions.ts`: fetches and caches the static subject resolution document, extracts one article per question, verifies `questionRevision`, lazily imports a same-origin Mermaid runtime and controls the accessible dialog/fallback behavior.
- `src/lib/resolution-catalog.ts`: strict Zod schemas and cached loader for `/resolucoes/<contestStorageId>/index.json`.
- `src/lib/resolution-routes.ts`: stable storage-ID route builders and resolution request/catalog types.
- `src/lib/resolution-markdown.ts`: detects Mermaid code fences in resolution Markdown.
- `src/lib/resolution-mermaid.ts`: lazy Mermaid rendering with `securityLevel: 'strict'`, render status and textual fallback.
- `src/components/QuestionResolutionDialog.astro`: native `<dialog>` shell used by questionnaires and simulados.
- `src/components/ResolutionMermaidRuntime.astro`: same-origin runtime marker and browser registration for `renderResolutionMermaid()`.
- `src/pages/resolucoes/[concurso]/[assunto].astro`: statically renders all resolution articles for a subject and conditionally includes the Mermaid runtime.
- `src/pages/revisoes/[concurso]/[revisao].astro`: renders a mega-review collection entry with breadcrumbs, derived subject/review links, print controls and conditional Markdown runtimes.

### Simulados and immutable snapshots

- `src/pages/simulados/index.astro`: configuration, recent attempts, resolver, result sections and dialog host.
- `src/lib/simulados-catalog.ts`: schemas for the metadata catalog and full contest pool.
- `src/lib/simulados.ts`: strict schemas and operations for configuration, balanced no-repeat draws, frozen question snapshots, answers, results, summaries and the 20-item profile index. Each snapshot preserves question text, options, gabarito, explanation, origin and revision.
- `src/lib/simulados-validation.ts`: semantic validation of documents and indexes, including question/configuration consistency, answer keys, temporal order, completion state and calculated results.
- `src/lib/simulados-controller.ts`: loads static catalogs/pools, creates a new UUID attempt, persists detailed documents, serializes answer writes, finalizes attempts idempotently, renders history and opens matching resolutions only for completed attempts.
- `src/lib/simulados-result-breakdown.ts`: reads a completed immutable document and renders per-subject results.
- `src/lib/simulados-runtime.ts`: detects pending detailed or index documents.
- `src/lib/simulados-sync.ts`: validates remote detail/index documents, applies version arbitration, synchronizes details before the index and repairs missing or stale index references.
- `src/lib/simulados-profile-sync.ts`: coordinates simulado and navigation synchronization under the shared `answer-sync` lease and request rate gate.
- `src/components/SimuladosSyncRuntime.astro`: wakes simulado synchronization on the route, focus, visibility, online and application events.

### Offline persistence, synchronization and PWA

- `src/lib/offline-db.ts`: IndexedDB version 5 (`responses`, `preferences`, `progress`, `estudados`, `leitura`, `simulados`, `simuladosIndex`, `downloads`, `downloadJobs`, `leases` and `quarantine`); stores durable snapshots, outboxes, download records, persisted background-fetch jobs, leases and invalid remote documents; the upgrade is additive and idempotent.
- `src/lib/offline-packages.ts`: validates contest manifests, downloads same-origin routes/assets, coordinates operations with Web Locks, stages temporary caches, atomically promotes packages via the exported `activateStagedPackage()` (best-effort post-activation cleanup), exposes `adoptStagedPackageUnderLock()` and `assertStorageCapacity()`, preserves the previous package on failure and removes orphan caches.
- `src/lib/offline-download-events.ts`: singleton `publishDownloadEvent()` and per-subscriber `subscribeDownloadEvents()` over the `concursos-offline-downloads` BroadcastChannel, with payload validation and close-on-unsubscribe.
- `src/lib/offline-auto-update.ts`: `maybeUpdateOfflinePackages('navigation' | 'periodic')` auto-update engine with in-memory throttling (30 min navigation / 60 min periodic), `navigator.onLine` guard, manifest-hash comparison per download record and delta downloads with `phase: 'update'`; failures are swallowed.
- `src/lib/offline-background-fetch.ts`: Chromium Background Fetch integration — `startBackgroundPackageDownload()` persists the job in IndexedDB `downloadJobs` and hands the batch to the browser; success/failure finalizers adopt records under Web Lock (`adoptStagedPackageUnderLock`: package resources to staging, shared assets to the global cache).
- `src/lib/pwa-cache.ts`: names `shared-assets-v1`, `runtime-pages-v1`, `runtime-media-v1` and `contest--<storageId>--<manifestHash>` caches and normalizes navigation paths.
- `src/service-worker.ts`: precaches generated assets (transitive deps via `precache-dependencies`), uses `matchPrecache` + `matchOfflineAsset` (precache → `SHARED_ASSET_CACHE` → contest caches) and `matchRuntimePage` fallback on navigation failure, NetworkFirst navigation with `/offline/` fallback, CacheFirst shared/media/downloaded resources, keeps `https://kv.helio.me` NetworkOnly, handles `/_astro/` + `image` via `matchOfflineAsset`, and `subject-suggestions`/`navigation-catalog` shards via contest-cache-first; forwards Background Sync, triggers `maybeUpdateOfflinePackages('navigation')` on navigations (`waitUntil`, non-blocking), handles `periodicsync` `concursos-offline-updates`.
- `src/components/OfflineContestButton.astro` and `src/pages/offline.astro`: download/remove controls and the offline-availability page; the button cascades from Background Fetch to the in-page flow when supported, mirrors update-phase download events and renews availability after completions/failures.
- `src/components/PwaRuntime.astro` and `src/lib/pwa-update.ts`: register the Service Worker, register Periodic Background Sync (`concursos-offline-updates`) in standalone mode when supported, wait for local durability before activation/reload and clean inactive package caches.
- `src/lib/sync.ts`: serial KV synchronization for answers and global preferences/progress/studied/reading documents, with schema validation, revision checks, leases, retries, quarantine and last-write-wins arbitration.
- `src/lib/kv-client.ts`: sole KV client; validates envelopes, applies timeout/429 retry/body limits and sends complete JSON documents without authorization headers.
- `src/lib/identity.ts`: validates aliases/storage IDs and builds stable local/remote document IDs.
- `src/lib/profile-backup.ts`, `preferences.ts`, `progress.ts`, `navigation-db.ts`, `navigation-sync.ts` and `local-durability.ts`: profile backup, materialized progress, navigation persistence/synchronization and durability barriers.
- `src/pages/offline-inventories/[concurso].json.ts`: exposes each catalog-derived contest inventory, including generated mega-review routes.
- `scripts/generate-offline-inventories.mjs`: scans generated HTML and transitive CSS/JavaScript references, separates shared assets from contest assets and writes manifest hashes/byte estimates for the derived inventories (delegates to `scripts/lib/offline-inventory-builder.mjs`).
- `scripts/build-service-worker.mjs`: bundles `src/service-worker.ts` and injects the final Workbox precache list after Astro and inventory generation.

## Data Flow

1. Astro loaders validate editorial files through `src/content.config.ts` and `content-schema.ts`.
2. Page entrypoints call `getCatalog()` (memoized per build via module-scoped `catalogPromise`), which builds and validates the tree/flat projections, attaches optional mega reviews to groups and creates static paths and endpoint payloads. `src/lib/static-catalogs.ts` provides pure builders for sync/navigation shards.
3. Study pages render content or pass question data to browser controllers; local answer/progress state is stored in IndexedDB and optionally synchronized through `sync.ts` and `kv-client.ts`.
4. Resolution descriptors are indexed at build time. A corrected question opens the static subject resolution document, checks the requested revision and lazily renders Mermaid in the dialog.
5. Simulado generation fetches a static contest pool, draws questions into immutable snapshots, stores the detailed attempt locally, then updates the profile index; synchronization publishes details before the index.
6. The build post-processes generated HTML via `scripts/build.mjs` (Astro → security → inventories ‖ SW), derives offline inventories containing the catalog's mega-review routes with transitive asset hashing, produces the Service Worker with transitive precache deps, shards sync/navigation/subject-suggestions endpoints per contest, and writes `.build-metrics.json` for budget enforcement. Contest downloads stage routes/assets in Cache Storage while IndexedDB records the active package; updates run as hash-based delta downloads triggered by navigation, Periodic Background Sync or the button.

## Main Commands

```bash
npm install
npm run dev
npm run check
npm run test
npm run test:unit
npm run test:e2e
npm run build
npm run preview
npm run icons
```

- `npm run dev`: Astro development server.
- `npm run check`: Astro type/template checks.
- `npm run test`: complete Vitest suite.
- `npm run test:unit`: unit tests under `tests/unit`.
- `npm run test:e2e`: Playwright Chromium against a built `dist` served by `wrangler pages dev`.
- `npm run build`: static production build orchestrated by `scripts/build.mjs` (Astro → `finalize-security` → `generate-offline-inventories ‖ build-service-worker` with `BUILD_SEQUENTIAL`/`BUILD_CONCURRENCY`/`BUILD_METRICS_PATH` env overrides); publish directory is `dist`.
- `npm run preview`: Astro preview server.
- `npm run icons`: regenerates icons from the icon source/generator.
- `node scripts/check-build-budget.mjs`: validates `.build-metrics.json` against `scripts/build-budget.json`.
- `node scripts/estimate-scale.mjs`: estimates current vs target study-HTML scale (env `TARGET_CONTESTS`/`TARGET_SUBJECTS_PER_CONTEST`).
- Deployment has no npm deploy script: the existing Cloudflare Pages Git integration builds `main` with `npm run build` and publishes `dist`; Wrangler Pages Dev is used locally by E2E.

## Testing

- Unit coverage includes `catalog.test.ts`, `catalog-groups.test.ts`, `content-paths.test.ts`, `content-schema.test.ts`, `mega-review-routes.test.ts`, `mega-review-scope.test.ts`, `markdown-headings.test.ts`, `reading-progress.test.ts`, `resolutions.test.ts`, `markdown-features.test.ts`, `questionnaire.test.ts`, `question-order.test.ts`, `simulados.test.ts`, `simulados-validation.test.ts`, `simulados-sync.test.ts`, `offline-db.test.ts`, `offline-packages.test.ts`, `offline-download-events.test.ts`, `offline-auto-update.test.ts`, `offline-background-fetch.test.ts`, `pwa-update.test.ts`, `identity.test.ts`, `sync.test.ts`, `navigation*.test.ts`, `build-scripts.test.ts` (lib/build-budget, lib/concurrency, lib/finalize-security, lib/offline-inventory-builder chunked hashing/cache), `static-catalogs.test.ts` (buildSyncCatalogSubjects, buildNavigationCatalogRoutes), profile backup, progress, preferences, theme and runtime tests. Mega-review coverage includes canonical IDs, strict metadata, catalog validation, offline routes, scope delegation and H1 detection.
- E2E coverage includes `mega-review.spec.ts` for rich Markdown, catalog links, print behavior and no-JavaScript readability; `catalog-shards.spec.ts` for global vs per-contest sync/navigation/subject-suggestions shards and indices (schemaVersion, same-origin, storageId routing); `pwa.spec.ts` also verifies the mega-review route in the offline inventory and cached navigation. The suite also includes `questionnaire.spec.ts`, `resolutions.spec.ts`, `simulados.spec.ts`, `simulados-result-breakdown.spec.ts`, navigation/offline, background fetch (`offline-background.spec.ts`), catalog groups, subject suggestion/navigation/pagination, reading mode/customizer/resume, identity, sync, profile backup, studied, preferences/progress, security, header, theme, abbreviation and final validation specs.
- `playwright.config.ts` blocks Service Workers by default; `tests/e2e/pwa.spec.ts` enables them explicitly. E2E runs against the Pages-compatible Wrangler server so `_headers` behavior is exercised.

## Configuration and External Dependencies

- Runtime baseline: Node.js `>=22.12.0`, npm and TypeScript strict mode.
- Core: Astro 7, `@astrojs/markdown-remark`, Unified plugins (`remark-gfm`, `remark-math`, `rehype-katex`), Shiki and `astro-mermaid`.
- Browser state/PWA: `idb`, Mermaid, `vite-plugin-pwa`, Workbox packages and local fonts/assets.
- Validation: Zod schemas are used for editorial data, static auxiliary payloads, IndexedDB documents and KV envelopes.
- Tooling: Vitest, Playwright, Sharp, TypeScript, Vite, Workbox Build and Wrangler.
- `astro.config.mjs` keeps the site static, uses local KaTeX/font assets, restricts Mermaid to strict security and permits KV only in `connect-src`.

## Points of Attention

- The project is fully static: there is no Astro adapter, server-side backend, authentication layer or CMS.
- Group depth is editorial only; public routes, persistence IDs, offline routes and KV identities use contest/subject storage identities instead.
- Mega reviews are optional group documents; their canonical ID is the group path, their public slug is unique within a contest, and a parent review delegates nested groups with their own review.
- Mega-review public routes are derived into each contest offline inventory; they do not alter the flat `contest.subjects` projection.
- Resolution files are optional, but every indexed resolution must reference an existing question at the exact `questionRevision`; otherwise the catalog/build fails.
- References are validated by the catalog matrix: every subject needs `referencias.md`; a group with a mega review needs mega-review references, subjects with resolutions need the aggregated `resolucoes/referencias.md`, and orphaned, duplicated or empty reference bodies fail the build.
- Questionnaire origin filtering is display-only and is never persisted; submission, progress and synchronization remain scoped to the full question set.
- Simulado snapshots are historical documents and must not be rebuilt from the current catalog when reviewed.
- KV traffic is never cached by the Service Worker; remote JSON is validated before adoption and invalid data is quarantined.
- Mermaid resolution rendering is lazy, same-origin and strict, with readable source fallback when the runtime or diagram rendering fails.
- `getCatalog()` is memoized per build process; repeated calls reuse the same promise. Sharded catalogs (`/sync-catalog/<id>.json`, `/navigation-catalog/<id>.json`, `/subject-suggestions/<id>.json`) are the scale path for 30×300 subjects; global endpoints remain for backward compatibility. Service Worker `matchOfflineAsset` and runtime-page fallback preserve offline navigation for sharded routes.
