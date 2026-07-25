Right now, as this file is being written as a draft, we are inside the `refactor/pre-v2-architecture` branch.

Here we need to investigate whether it wouldn't be better to check out staging and then rebase the refactor/pre-v2-backlog branch afterwards.

```todo
ask for decision in rebasing in chatgpt.

if ok: continue ✅
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
- [ ] **D4 — Service layer boundaries**
  `service/` directory exists but is empty and undefined. Needs a decision on route → service → data-access responsibility split.

```todo
for D1: research for why we have to do this
with grok
if ok: continue
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
if ok: continue
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
if ok: continue
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
if ok: continue
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
upload git-observatory to claude
```

<div id="refactor/pre-v2-architecture-subbranch-naming">

```todo
ask for four branch names related to
D1 — Auth model: session-based vs JWT
D2 — Server state vs UI state split
D3 — Feature-based directory structure
D4 — Service layer boundaries
```
</div>

```todo
update git-observatory
```

```todo
commit git observatory
```

```todo
upload git-observatory to claude
```

---

<div id="refactor/pre-v2-architecture-D1-works">

```todo
make branch for D1 — Auth model: session-based vs JWT
```

Here we switch to the branch related to D1.

```todo
make adr for D1 — Auth model: session-based vs JWT
with chatgpt
```

```todo
commit adr for D1 — Auth model: session-based vs JWT
```

```todo
start D1: research for how we have to do this
in deepseek
```

```todo
loop: do each step and  commit
with gemini
```

```todo
tick D1 in refactor-backlog
```

```todo
commit refactor-backlog
```

```todo
checkout refactor/pre-v2-architecture
```

```todo
merge D1 branch into refactor/pre-v2-architecture
```

```todo
delete D1 branch
```
</div>

---

<div id="refactor/pre-v2-architecture-D2-works">

```todo
make branch for D2 — Server state vs UI state split
```

Here we switch to the branch related to D2.

```todo
make adr for D2 — Server state vs UI state split
with chatgpt
```

```todo
commit adr for D2 — Server state vs UI state split
```

```todo
start D2: research for how we have to do this
in deepseek
```

```todo
loop: do each step and  commit
with gemini
```

```todo
tick D2 in refactor-backlog
```

```todo
commit refactor-backlog
```

```todo
checkout refactor/pre-v2-architecture
```

```todo
merge D2 branch into refactor/pre-v2-architecture
```

```todo
delete D2 branch
```

</div>

---

<div id="refactor/pre-v2-architecture-D3-works">

```todo
make branch for D3 — Feature-based directory structure
```

Here we switch to the branch related to D3.


```todo
make adr for D3 — Feature-based directory structure
with chatgpt
```

```todo
commit adr for D3 — Feature-based directory structure
```

```todo
start D3: research for how we have to do this
in deepseek
```

```todo
loop: do each step and  commit
with gemini
```

```todo
tick D3 in refactor-backlog
```

```todo
commit refactor-backlog
```

```todo
checkout refactor/pre-v2-architecture
```

```todo
merge D3 branch into refactor/pre-v2-architecture
```

```todo
delete D3 branch
```

</div>

---

<div id="refactor/pre-v2-architecture-D4-works">

```todo
make branch for D4 — Service layer boundaries
```

Here we switch to the branch related to D4.


```todo
make adr for D4 — Service layer boundaries
with chatgpt
```

```todo
commit adr for D4 — Service layer boundaries
```

```todo
start D4: research for how we have to do this
in deepseek
```

```todo
loop: do each step and  commit
with gemini
```

```todo
tick D4 in refactor-backlog
```

```todo
commit refactor-backlog
```

```todo
checkout refactor/pre-v2-architecture
```

```todo
merge D4 branch into refactor/pre-v2-architecture
```

```todo
delete D4 branch
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

<i><b>🏁 7/25/2026 milestone</b></i>

---

Here we implement the features one by one according to the spec file.