Right now, as this file is being written as a draft, we are inside the `refactor/pre-v2-architecture` branch.

Here we need to investigate whether it wouldn't be better to check out staging and then rebase the refactor/pre-v2-backlog branch afterwards.

```todo
ask for decision in rebasing in chatgpt.

if ok: continue ⬅️
in not ok:
  plan again for revising spec and other related docs at the end of this doc right now
  jump to id="pre-v2-architecture"
```

```todo
✅ make adr-0005 for this decision
```

```todo
✅ upload git observatory to claude
```

```todo
✅ explain for change in git observatory based on recent adr
```

```todo
✅ checkout staging
```

```todo
✅ commit adr-0005
```

```todo
✅ implement changes in git observatory
```

```todo
✅ commit git observatory
```

---

We need to review the spec, with the goal of showing that:
1. Adding these features follows a proper order/sequence.
2. The admin panel and blog features are only for me, and we don't have any registration for other users at all.

```todo
✅ research in chatgpt
```

```todo
✅ correct the portfolio-v2-spec base on new revises
```

```todo
✅ commit changes
```


---

Here, the ToDo file we're currently in needs to become a bit more overarching.

```todo
✅ loop: adding what chatGPT said in this chat:
https://chatgpt.com/c/****
```

```todo
✅ adding adr for why we need engineering-runbook.md
```

```todo
✅ make engineering-runbook.md in /doc in and copy this to that file
```

```todo
✅ translate every persian instruction to english
```

```todo
✅ commit engineering-runbook.md
```

---

<i><b>🏁 7/25/2026 start </b></i>

<div id="pre-v2-architecture">
We're switching back to `refactor/pre-v2-backlog`.
</div>

```todo
✅ upload git-observatory to claude
```

```todo
✅ check operation using claude
```

```todo
✅ rebase refactor/pre-v2-backlog on latest commit
```

```todo
✅ checkout refactor/pre-v2-architecture
```

---

These are the four main tasks that need to be done in `refactor/pre-v2-architecture`.

- [ ] **D1 — Auth model: session-based vs JWT**
  Spec (`portfolio-v2-spec.md`) explicitly calls for JWT-based admin access; current implementation is a stateful session stored in MongoDB (`adminSessions`). Needs a decision: keep session-based and update the spec wording, or migrate to JWT. Blocks: admin panel security testing (Definition of Done, Goal 3), rate limiting design, middleware design.
- [ ] **D2 — Server state vs UI state split**
  Current: manual `fetch` inside Zustand (`adminAuthStore`). Decision: adopt TanStack Query for all server state (session check, and later articles/books/stack data); restrict Zustand to pure UI state (e.g. dialog open/close). Blocks: how future feature stores are written.
- [ ] **D3 — Feature-based directory structure**
  Current structure is type-based (`components/ui`, `components/layout`, `stores`), not domain-based. Needs a decision on target layout (`features/`, `shared/`) and migration approach (big-bang vs incremental, per-feature). Blocks: where all new feature code (blog, stack-mapping, playground, bookshelf) gets placed.
- [ ] **D4 — Application service architecture**
  Backend responsibility boundaries are not yet formally defined. Decide the architectural split between Route Handlers (HTTP), feature-owned Application Services (business workflows), and Repository (data access), and establish conventions that all future backend features must follow.

```todo
for D1: research for why we have to do this
with grok
if ok: continue ⬅️
in not ok:
  make an adr for why we refused to do that
  commit adr
  edit refactor backlog - cancel D1 base on what we decided in adr
  commit refactor-backlog
  jump to id="refactor/pre-v2-architecture-subbranch-naming" and delete naming request fot D1 branch
  delete id="refactor/pre-v2-architecture-D1-works"
```

```todo
for D2: research for why we have to do this
with grok
if ok: continue ⬅️
in not ok:
  make an adr for why we refused to do that
  commit adr
  edit refactor backlog - cancel D2 base on what we decided in adr
  commit refactor-backlog
  jump to id="refactor/pre-v2-architecture-subbranch-naming" and delete naming request fot D2 branch
  delete id="refactor/pre-v2-architecture-D2-works"
```

```todo
for D3: research for why we have to do this
with grok
if ok: continue ⬅️
in not ok:
  make an adr for why we refused to do that
  commit adr
  edit refactor backlog - cancel D3 base on what we decided in adr
  commit refactor-backlog
  jump to id="refactor/pre-v2-architecture-subbranch-naming" and delete naming request fot D3 branch
  delete id="refactor/pre-v2-architecture-D3-works"
```

```todo
for D4: research for why we have to do this
with grok
if ok: continue ⬅️
in not ok:
  make an adr for why we refused to do that
  commit adr
  edit refactor backlog - cancel D4 base on what we decided in adr
  commit refactor-backlog
  jump to id="refactor/pre-v2-architecture-subbranch-naming" and delete naming request fot D4 branch
  delete id="refactor/pre-v2-architecture-D4-works"
```

---

After our investigation, if everything checks out (which is very likely).

```todo
✅ upload git-observatory to claude
```

<div id="refactor/pre-v2-architecture-subbranch-naming">

```todo
✅ ask for four branch names related to
D1 — Auth model: session-based vs JWT
D2 — Server state vs UI state split
D3 — Feature-based directory structure
D4 — Application service architectur
```
</div>

```todo
✅ update git-observatory
```

```todo
✅ commit git observatory
```

```todo
✅ upload git-observatory to claude
```

---

<div id="refactor/pre-v2-architecture-D1-works">

```todo
✅ make branch for D1 — Auth model: session-based vs JWT
```

Here we switch to the branch related to D1.

```todo
✅ make adr for D1 — Auth model: session-based vs JWT
with chatgpt
```

```todo
✅ commit adr for D1 — Auth model: session-based vs JWT
```

```todo
✅ step: Analyze the current login and session verification flow
```

```todo
✅ step: Design the token structure — define Access Token and Refresh Token patterns (expiration times, Payload structure, and how they are set in cookies)
```

```todo
✅ add environment variables
```

```todo
✅ validate new environment variables in env.ts
```

```todo
✅ commit changes
```

```todo
✅ installing jons
```

```todo
✅ commit changes
```

```todo
✅ loop: 
  write jwt.ts parts
  commit
```

```todo
✅ step: refactor app/api/admin/login/route.ts
```

```todo
✅ commit changes
```

```todo
✅ step: refactor src/app/api/admin/session/route.ts
```

```todo
✅ commit changes
```

```todo
✅ step: add src/app/api/admin/logout/route.ts
```

```todo
✅ commit changes
```

```todo
✅ tick D1 in refactor-backlog
```

```todo
✅ commit refactor-backlog
```

```todo
✅ checkout refactor/pre-v2-architecture
```

```todo
✅ merge refactor/auth-model into refactor/pre-v2-architecture
```

```todo
✅ delete refactor/auth-model
```
</div>

---

<div id="refactor/pre-v2-architecture-D2-works">

```todo
✅ make branch for D2 — Server state vs UI state split
branch name: refactor/state-split
```

Here we switch to the branch related to D2.

```todo
✅ make adr for D2 — Server state vs UI state split
with chatgpt
```

```todo
✅ commit adr for D2 — Server state vs UI state split
```

```todo
✅ step: install @tanstack/react-query
```

```todo
✅ commit changes
```

```todo
✅ step: create QueryProvider and wire it into root layout
```

```todo
✅ commit changes
```

```todo
✅ step: create service/adminAuth.ts with getAdminSession, loginAdmin, logoutAdmin
```

```todo
✅ commit changes
```

```todo
✅ step: create hooks/useAdminAuth.ts (useAdminSession, useAdminLogin, useAdminLogout)
```

```todo
✅ commit changes
```

```todo
✅ step: remove stores/adminAuthStore.ts completely
```

```todo
✅ commit changes
```

```todo
✅ step: refactor LoginDialog to use useAdminLogin (remove manual loading/error/auth state)
```

```todo
✅ commit changes
```

```todo
✅ step: refactor LogoutButton and other admin-aware components to use useAdminSession / useAdminLogout
```

```todo
✅ commit changes
```

```todo
✅ tick D2 in refactor-backlog
```

```todo
✅ commit refactor-backlog
```

```todo
✅ checkout refactor/pre-v2-architecture
```

```todo
✅ merge refactor/state-split into refactor/pre-v2-architecture
```

```todo
✅ delete refactor/state-split
```

</div>

---

<div id="refactor/pre-v2-architecture-D3-works">

```todo
✅ make branch for D3 — Feature-based directory structure
branch name: refactor/feature-structure
```

Here we switch to the branch related to D3.


```todo
✅ make adr for D3 — Feature-based directory structure
with chatgpt
```

```todo
✅ commit adr for D3 — Feature-based directory structure
```

```todo
✅ step: create src/features/ and src/shared/ base directories
```

```todo
✅ step: move admin auth service → features/admin/api/adminAuth.ts
```

```todo
✅ step: move admin hooks → features/admin/hooks/useAdminAuth.ts
```

```todo
✅ step: move loginDialogStore + LoginDialog → features/admin/
```

```todo
✅ step: move LogoutButton + AdminLoginListener → features/admin/components/
```

```todo
✅ step: move jwt auth logic → features/admin/lib/ (or utils/)
```

```todo
✅ commit changes
```

<i><b>🏁 7/25/2026 finish here</b></i>
<i><b>🏁 7/26/2026 start here</b></i>

```todo
✅ step: move blog sections/components → features/blog/components/
```

```todo
✅ step: move BlogNavSearchbar + BlogNavbarActions → features/blog/components/
```

```todo
✅ commit changes
```

```todo
✅ step: move main/portfolio sections (Banner, Contact, Info, Projects) → features/main/components/
```

```todo
✅ commit changes
```

```todo
✅ step: move shadcn UI primitives → shared/components/ui/
```

```todo
✅ step: move shared buttons (ThemeButton, CVButton) → shared/components/buttons/
```

```todo
✅ step: move Navbar and layout components → shared/components/layout/
```

```todo
✅ step: move QueryProvider → shared/providers/
```

```todo
✅ step: move constants, mongodb, utils → shared/
```

```todo
✅ commit changes
```

```todo
✅ step: update tsconfig path aliases for @/features/* and @/shared/*
```

```todo
✅ commit changes
```

```todo
✅ step: delete empty old directories (components, hooks, stores, service, common, ...)
```

```todo
✅ loop:
  update imports in src/app/ and remaining files to new paths
  commit changes
```

```todo
✅ tick D3 in refactor-backlog
```

```todo
✅ commit refactor-backlog
```

```todo
✅ checkout refactor/pre-v2-architecture
```

```todo
✅ merge refactor/feature-structure into refactor/pre-v2-architecture
```

```todo
✅ delete refactor/feature-structure
```

</div>

---

<div id="refactor/pre-v2-architecture-D4-works">

```todo
✅ make branch for D4 — Application service architectur
branch name: refactor/application-service
```

Here we switch to the branch related to D4.


```todo
✅ make adr for D4 — Application service architectur
with chatgpt
```

```todo
✅ commit adr for D4 — Application service architectur
```

```todo
✅ step: create src/features/admin/repositories/ directory
```

```todo
✅ working on file features/admin/repositories/adminRepository.ts
```

```todo
✅ commit changes
```

```todo
✅ step: create src/features/admin/services/ directory
```

```todo
✅ working on file features/admin/services/adminAuthService.ts
```

```todo
✅ commit changes
```

```todo
✅ working on file app/api/admin/login/route.ts
```

```todo
✅ commit changes
```

```todo
✅ working on file app/api/admin/logout/route.ts
```

```todo
✅ commit changes
```

```todo
✅ working on file app/api/admin/session/route.ts
```

```todo
✅ commit changes
```

```todo
✅ step: manual test – admin login flow
```

```todo
✅ step: manual test – automatic token refresh
```

```todo
✅ step: manual test – logout and cookie cleanup
```

```todo
✅ commit changes
```

```todo
✅ tick D4 in refactor-backlog
```

```todo
✅ commit refactor-backlog
```

```todo
✅ checkout refactor/pre-v2-architecture
```

```todo
✅ merge refactor/application-service into refactor/pre-v2-architecture
```

```todo
✅ delete refactor/application-service
```

</div>

---

Here, the work related to the `refactor/pre-v2-architecture` branch is finished.

```todo
checkout refactor/pre-v2-backlog
```


```todo
merge branch refactor/pre-v2-architecture into refactor/pre-v2-backlog
```

```todo
delete refactor/pre-v2-architecture
```

```todo
update git observatory
```

```todo
commit changes
```

```todo
upload git observatory to claude
```

---

Here, the work related to the `refactor/pre-v2-infrastructure` branch begins.

```todo
make branch refactor/pre-v2-infrastructure

git checkout -b refactor/pre-v2-infrastructure
```

We are currently inside the refactor/pre-v2-infrastructure branch;

These seven tasks need to be done, but they don't require separate branches or ADRs.

- [ ] **I1 — Global API error handling**
  No shared error shape or handler; each route currently does its own try/catch with inconsistent response shapes (`{success:true}`, `{authenticated:false}`, `{error:"..."}`). Needs a standardized `ApiResponse<T>` type and a shared handler/wrapper for route handlers.
- [ ] **I2 — Request validation with Zod**
  No schema validation on API input (e.g. `login` only checks `if (!password)`). Needs shared `schemas/` (or `types/`) with Zod schemas per endpoint, reused client + server side.
- [ ] **I4 — `env.ts` completeness**
  Currently only validates `MONGODB_URI` and `NODE_ENV`. Missing keys likely needed soon (`JWT_SECRET` if D1 goes JWT-based, `ADMIN_PASSWORD_HASH`, etc.). Also: codebase should consistently import from `env.ts` rather than reading `process.env` directly (currently done in `login/route.ts`).
- [ ] **I5 — Hardcoded ObjectId**
  `ObjectId('6a4012498a8251c60725be91')` is hardcoded in `login/route.ts` to look up admin config. Fragile against DB reseeding/migration; needs to move to a constant or config lookup by a stable key.
- [ ] **I6 — Rate limiting on `/api/admin/login`**
  No protection against brute-force attempts. Required by Definition of Done (Goal 3: "login rate limiting").
- [ ] **I7 — Session cleanup strategy**
  Expired sessions in `adminSessions` are only cleaned up lazily (on next lookup). Consider a MongoDB TTL index on `expiresAt` for automatic cleanup.
- [ ] **I8 — Route protection for admin write routes**
  No middleware currently protects admin-only routes; needed before article authoring API exists (Definition of Done, Goal 3).

---

for I1 — Global API error handling

```todo
research for it in deepseek
```

```todo
loop: do it with gemini and commit
```

```todo
tick I1 in refactor-backlog
```

```todo
commit refactor-backlog
```

for I2 — Request validation with Zod

```todo
research for it in deepseek
```

```todo
loop: do it with gemini and commit
```

```todo
tick I2 in refactor-backlog
```

```todo
commit refactor-backlog
```

for I4 — `env.ts` completeness

```todo
research for it in deepseek
```

```todo
loop: do it with gemini and commit
```

```todo
tick I4 in refactor-backlog
```

```todo
commit refactor-backlog
```

for I5 — Hardcoded ObjectId

```todo
research for it in deepseek
```

```todo
loop: do it with gemini and commit
```

```todo
tick I5 in refactor-backlog
```

```todo
commit refactor-backlog
```

for I6 — Rate limiting on `/api/admin/login`

```todo
research for it in deepseek
```

```todo
loop: do it with gemini and commit
```

```todo
tick I6 in refactor-backlog
```

```todo
commit refactor-backlog
```

for I7 — Session cleanup strategy

```todo
research for it in deepseek
```

```todo
loop: do it with gemini and commit
```

```todo
tick I7 in refactor-backlog
```

```todo
commit refactor-backlog
```

for I8 — Route protection for admin write routes

```todo
research for it in deepseek
```

```todo
loop: do it with gemini and commit
```

```todo
tick I8 in refactor-backlog
```

```todo
commit refactor-backlog
```

---

Here, the work related to the `refactor/pre-v2-infrastructure` branch is finished.

```todo
checkout refactor/pre-v2-backlog
```

```todo
merge branch refactor/pre-v2-infrastructure into refactor/pre-v2-backlog
```

```todo
delete refactor/pre-v2-infrastructure
```

---

Here, the work related to the `refactor/pre-v2-backlog` branch is finished.

```todo
git observatory update
with claude
```

```todo
commmit git observatory
```

```todo
uploade git observatory to claude
```

```todo
checkout staging
```

```todo
merge branch refactor/pre-v2-backlog into staging
```

```todo
delete refactor/pre-v2-backlog
```

---

Here we need to investigate what the issue with staging and Vercel is; after we've looked into it and applied a potential fix, we'll push to staging.

```todo
research in deepseek and grok
```

<s><i><b>🏁 7/25/2026 milestone</b></i></s><br/>
<i><b>🏁 7/26/2026 milestone</b></i>

---

Here we implement the features one by one according to the spec file.