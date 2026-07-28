Here, the work related to the `refactor/pre-v2-infrastructure` branch begins.

```todo
✅ make branch refactor/pre-v2-infrastructure

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
