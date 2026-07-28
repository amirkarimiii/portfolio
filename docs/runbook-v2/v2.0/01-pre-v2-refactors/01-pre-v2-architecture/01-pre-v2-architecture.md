> Some of the texts below may not have the correct meaning in the new system, but since they came from the previous runbook, we didn’t touch them; only the references that were previously specified with **div id="something"** have been changed.

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
  jump to [line 74 todo] and delete naming request fot D1 branch
  delete 02-D1-auth-model.md
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
  jump to [line 74 todo] and delete naming request fot D2 branch
  delete 03-D2-state-split.md
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
  jump to [line 74 todo] and delete naming request fot D3 branch
  delete 04-D3-feature-structure.md
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
  jump to [line 74 todo] and delete naming request fot D4 branch
  delete 05-D4-application-service.md
```

---

After our investigation, if everything checks out (which is very likely).

```todo
✅ upload git-observatory to claude
```

```todo
✅ ask for four branch names related to
D1 — Auth model: session-based vs JWT
D2 — Server state vs UI state split
D3 — Feature-based directory structure
D4 — Application service architectur
```

```todo
✅ update git-observatory
```

```todo
✅ commit git observatory
```

```todo
✅ upload git-observatory to claude
```