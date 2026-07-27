# Technical Debt & Pre-V2 Refactor Backlog

**Status:** Draft — scaffolding phase (not yet branched for execution)

**Purpose:** Index of known technical debt and foundational gaps that should be resolved before starting Portfolio V2 major features (Blog Engine, Stack Mapping, Playground, Bookshelf, Admin Panel).

## How this file is used

This is **not** a decision record. It's a backlog/index. The actual architecture decisions (options considered, trade-offs, final choice) will be written as individual ADRs (`docs/adr/adr-000X-*.md`) at execution time — one branch per item, one ADR per branch. This file only tracks *what* needs attention and *why it matters*, so nothing gets forgotten during the scaffolding phase.

Each item below will eventually map to: `branch` → `adr-000X` → implementation → merge.

---

## Bugs (fix independent of refactor strategy)

- [x] **B1 — `session/route.ts` uses `export default` instead of named export**
  Next.js App Router route handlers must be named exports (`export async function GET`). As written, this route does not register as a GET handler at all.
- [x] **B2 — Dead `.catch()` call in `login/route.ts`**
  `clientPromise.catch()` is called with no handler; it silently does nothing and should be removed or implemented properly.

---

## Architecture decisions needed (foundational, blocks other work)

- [x] **D1 — Auth model: session-based vs JWT**
  Spec (`portfolio-v2-spec.md`) explicitly calls for JWT-based admin access; current implementation is a stateful session stored in MongoDB (`adminSessions`). Needs a decision: keep session-based and update the spec wording, or migrate to JWT. Blocks: admin panel security testing (Definition of Done, Goal 3), rate limiting design, middleware design.
- [x] **D2 — Server state vs UI state split**
  Current: manual `fetch` inside Zustand (`adminAuthStore`). Decision: adopt TanStack Query for all server state (session check, and later articles/books/stack data); restrict Zustand to pure UI state (e.g. dialog open/close). Blocks: how future feature stores are written.
- [x] **D3 — Feature-based directory structure**
  Current structure is type-based (`components/ui`, `components/layout`, `stores`), not domain-based. Needs a decision on target layout (`features/`, `shared/`) and migration approach (big-bang vs incremental, per-feature). Blocks: where all new feature code (blog, stack-mapping, playground, bookshelf) gets placed.
- [x] **D4 — Application service architecture**
  Backend responsibility boundaries are not yet formally defined. Decide the architectural split between Route Handlers (HTTP), feature-owned Application Services (business workflows), and Repository (data access), and establish conventions that all future backend features must follow.
---

## Infrastructure / cross-cutting concerns

- [x] **I1 — Global API error handling**
  No shared error shape or handler; each route currently does its own try/catch with inconsistent response shapes (`{success:true}`, `{authenticated:false}`, `{error:"..."}`). Needs a standardized `ApiResponse<T>` type and a shared handler/wrapper for route handlers.
- [x] **I2 — Request validation with Zod**
  No schema validation on API input (e.g. `login` only checks `if (!password)`). Needs shared `schemas/` (or `types/`) with Zod schemas per endpoint, reused client + server side.
- [ ] **I3 — Domain types / DTOs**
  No shared type definitions yet for entities the V2 features depend on: Article, Book, TechStack, Project. Needs a home (`types/` or `shared/types/`) before feature work starts.
- [x] **I4 — `env.ts` completeness**
  Currently only validates `MONGODB_URI` and `NODE_ENV`. Missing keys likely needed soon (`JWT_SECRET` if D1 goes JWT-based, `ADMIN_PASSWORD_HASH`, etc.). Also: codebase should consistently import from `env.ts` rather than reading `process.env` directly (currently done in `login/route.ts`).
- [x] **I5 — Hardcoded ObjectId**
  `ObjectId('6a4012498a8251c60725be91')` is hardcoded in `login/route.ts` to look up admin config. Fragile against DB reseeding/migration; needs to move to a constant or config lookup by a stable key.
- [x] **I6 — Rate limiting on `/api/admin/login`**
  No protection against brute-force attempts. Required by Definition of Done (Goal 3: "login rate limiting").
- [x] **I7 — Session cleanup strategy**
  Expired sessions in `adminSessions` are only cleaned up lazily (on next lookup). Consider a MongoDB TTL index on `expiresAt` for automatic cleanup.
- [x] **I8 — Route protection for admin write routes**
  No middleware currently protects admin-only routes; needed before article authoring API exists (Definition of Done, Goal 3).
- [ ] **I9 — Constants expansion**
  `common/constants/` currently has only `ids.ts` and `paths.ts`. Will likely need `routes.ts`, `metadata.ts`, `nav.ts`, `admin.ts` as features grow — centralize magic strings as they appear rather than after the fact.
- [ ] **I10 — Static asset organization**
  Several icons live loose in `app/` root (`icon0.svg`, `icon1.png`, `apple-icon.png`, `opengraph-image.png`). Review against Next.js Metadata API conventions and `public/` placement.

---

## Deferred to later (post-scaffolding, not blocking V2 kickoff)

- [ ] **P1 — SEO / structured data layer** (JSON-LD, `/llms.txt` scaffold) — closely tied to Goal 1 of the spec, but can be built alongside the Blog feature rather than as a pre-feature refactor.
- [ ] **P2 — Testing setup** (Vitest + React Testing Library) — worth having, but not strictly blocking the first features.
- [ ] **P3 — Security headers / CSP** — relevant to Goal 3's security audits, but not urgent until closer to launch.

---

## Next step

Once the current scaffolding branch (docs, living documents) is complete, branch off for refactor execution. For each checked-off area above: create a branch, write the corresponding `adr-000X-*.md` documenting the actual decision made, then implement.