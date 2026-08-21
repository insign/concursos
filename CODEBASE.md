# Code map of concursos

## Folder Structure

```text
.
├── astro.config.mjs                 # Astro 7 static build, Markdown pipeline, CSP and PWA integration
├── package.json                      # npm scripts and runtime/development dependencies
├── tsconfig.json                     # Astro strict TypeScript configuration
├── vitest.config.ts                  # Unit-test discovery
├── playwright.config.ts              # Chromium E2E project and built-site server
├── scripts/
│   ├── finalize-security.mjs         # Validates and finalizes generated CSP metadata
│   ├── generate-offline-inventories.mjs # Discovers published package assets and hashes
│   ├── build-service-worker.mjs      # Bundles and injects the Workbox precache manifest
│   ├── migrate-references.mjs        # One-off references migration script (provenance)
│   └── generate-icons.mjs            # Generates PWA and favicon assets
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
- `src/service-worker.ts`: Workbox runtime, precache, offline navigation, package-cache fallback, background-sync bridge, navigation-triggered package auto-update, Periodic Background Sync and Background Fetch adoption.
- `npm run build`: Astro build followed by `finalize-security.mjs`, `generate-offline-inventories.mjs` and `build-service-worker.mjs`.
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
- `/sync-catalog.json`: current answerable question schemas for synchronization; `origin` is intentionally omitted.
- `/simulados/catalog.json`: contest/subject metadata and counts by question origin.
- `/simulados/pool/<contestStorageId>.json`: full question pool for a contest, loaded when a simulado is generated.
- `/offline-inventories/<contestStorageId>.json`: generated package manifest for a contest.
- `/navigation-catalog.json`: static route/context catalog for navigation synchronization.
- `/simulados/`, `/configuracoes/`, `/offline/` and `/404`: auxiliary UI routes.

## Core Modules

### Catalog and editorial validation

- `src/lib/catalog.ts`: `getCatalog()` loads all eight collections, calls `buildCatalogIndex()` with `REQUIRE_REFERENCES = true`, checks non-empty reference bodies, hydrates collection entries including optional group mega reviews and their `referencesEntry`/`resolutionReferencesEntry`/`megaReviewReferencesEntry`, indexes resolutions by subject, creates offline inventory metadata and supplies `getSubjectStaticPaths()`.
- `src/lib/catalog-core.ts`: `buildCatalogIndex()` validates canonical IDs, optional mega-review ownership, contest-local review slugs alongside contest/subject storage IDs, companion files, group ancestry, non-empty groups, contest references, public subject slug uniqueness, orphan resolutions, question existence and exact question revisions; its validation matrix takes a `requireReferences` option (subject references always required; a mega review requires references iff it exists; resolutions require the aggregate iff any resolution exists; orphaned/duplicated/empty-body references fail); it sorts the group tree and flat subject projection, assigns previous/next subject IDs and adds mega-review routes to `createOfflineInventory()`.
- `src/lib/content-schema.ts`: strict Zod schemas for contests, groups, mega reviews, subjects, resolutions, question sets and synchronization question sets.
- `src/lib/content-paths.ts`: path normalization, route-segment checks and parsers for contest, group, mega-review, subject and resolution IDs; also `referenceIdFromEntry`/`parseReferenceId` for reference entries.
- `src/lib/catalog-groups.ts`: versioned local persistence of collapsed catalog groups.
- `src/lib/mega-review-routes.ts`: builds encoded public routes in `/revisoes/<contestSlug>/<reviewSlug>/`.
- `src/lib/mega-review-scope.ts`: traverses a group tree in editorial order, listing subjects and delegating nested groups that have their own review.
- `src/lib/markdown-headings.ts`: detects a real Markdown H1 outside fenced code blocks for review title fallback behavior.

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
- `src/service-worker.ts`: precaches generated assets, uses NetworkFirst navigation with `/offline/` fallback, CacheFirst shared/media/downloaded resources, keeps `https://kv.helio.me` NetworkOnly, includes resolution/simulado auxiliary routes, forwards Background Sync messages to the page, triggers `maybeUpdateOfflinePackages('navigation')` on navigations (`waitUntil`, non-blocking), handles `periodicsync` tag `concursos-offline-updates` and adopts Background Fetch records on `backgroundfetchsuccess/fail`.
- `src/components/OfflineContestButton.astro` and `src/pages/offline.astro`: download/remove controls and the offline-availability page; the button cascades from Background Fetch to the in-page flow when supported, mirrors update-phase download events and renews availability after completions/failures.
- `src/components/PwaRuntime.astro` and `src/lib/pwa-update.ts`: register the Service Worker, register Periodic Background Sync (`concursos-offline-updates`) in standalone mode when supported, wait for local durability before activation/reload and clean inactive package caches.
- `src/lib/sync.ts`: serial KV synchronization for answers and global preferences/progress/studied/reading documents, with schema validation, revision checks, leases, retries, quarantine and last-write-wins arbitration.
- `src/lib/kv-client.ts`: sole KV client; validates envelopes, applies timeout/429 retry/body limits and sends complete JSON documents without authorization headers.
- `src/lib/identity.ts`: validates aliases/storage IDs and builds stable local/remote document IDs.
- `src/lib/profile-backup.ts`, `preferences.ts`, `progress.ts`, `navigation-db.ts`, `navigation-sync.ts` and `local-durability.ts`: profile backup, materialized progress, navigation persistence/synchronization and durability barriers.
- `src/pages/offline-inventories/[concurso].json.ts`: exposes each catalog-derived contest inventory, including generated mega-review routes.
- `scripts/generate-offline-inventories.mjs`: scans generated HTML and transitive CSS/JavaScript references, separates shared assets from contest assets and writes manifest hashes/byte estimates for the derived inventories.
- `scripts/build-service-worker.mjs`: bundles `src/service-worker.ts` and injects the final Workbox precache list after Astro and inventory generation.

## Data Flow

1. Astro loaders validate editorial files through `src/content.config.ts` and `content-schema.ts`.
2. Page entrypoints call `getCatalog()`, which builds and validates the tree/flat projections, attaches optional mega reviews to groups and creates static paths and endpoint payloads.
3. Study pages render content or pass question data to browser controllers; local answer/progress state is stored in IndexedDB and optionally synchronized through `sync.ts` and `kv-client.ts`.
4. Resolution descriptors are indexed at build time. A corrected question opens the static subject resolution document, checks the requested revision and lazily renders Mermaid in the dialog.
5. Simulado generation fetches a static contest pool, draws questions into immutable snapshots, stores the detailed attempt locally, then updates the profile index; synchronization publishes details before the index.
6. The build post-processes generated HTML, derives offline inventories containing the catalog's mega-review routes and produces the Service Worker. Contest downloads stage routes/assets in Cache Storage while IndexedDB records the active package; updates run as hash-based delta downloads triggered by navigation, Periodic Background Sync or the button, with Chromium Background Fetch handing batches to the browser for adoption by the Service Worker.

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
- `npm run build`: static production build plus security, offline-inventory and Service Worker post-processing; publish directory is `dist`.
- `npm run preview`: Astro preview server.
- `npm run icons`: regenerates icons from the icon source/generator.
- Deployment has no npm deploy script: the existing Cloudflare Pages Git integration builds `main` with `npm run build` and publishes `dist`; Wrangler Pages Dev is used locally by E2E.

## Testing

- Unit coverage includes `catalog.test.ts`, `catalog-groups.test.ts`, `content-paths.test.ts`, `content-schema.test.ts`, `mega-review-routes.test.ts`, `mega-review-scope.test.ts`, `markdown-headings.test.ts`, `reading-progress.test.ts`, `resolutions.test.ts`, `markdown-features.test.ts`, `questionnaire.test.ts`, `question-order.test.ts`, `simulados.test.ts`, `simulados-validation.test.ts`, `simulados-sync.test.ts`, `offline-db.test.ts`, `offline-packages.test.ts`, `offline-download-events.test.ts`, `offline-auto-update.test.ts`, `offline-background-fetch.test.ts`, `pwa-update.test.ts`, `identity.test.ts`, `sync.test.ts`, `navigation*.test.ts`, profile backup, progress, preferences, theme and runtime tests. Mega-review coverage includes canonical IDs, strict metadata, catalog validation, offline routes, scope delegation and H1 detection.
- E2E coverage includes `mega-review.spec.ts` for rich Markdown, catalog links, print behavior and no-JavaScript readability; `pwa.spec.ts` also verifies the mega-review route in the offline inventory and cached navigation. The suite also includes `questionnaire.spec.ts`, `resolutions.spec.ts`, `simulados.spec.ts`, `simulados-result-breakdown.spec.ts`, navigation/offline, background fetch (`offline-background.spec.ts`), catalog groups, subject suggestion/navigation/pagination, reading mode/customizer/resume, identity, sync, profile backup, studied, preferences/progress, security, header, theme, abbreviation and final validation specs.
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
