```todo
✅ step: make branch: feature/private-publishing
```

```todo
✅ step: make other featuer files in /02-features for backlog
```

```todo
✅ step: Making the conversation centered on the dimensions of this feature
make as much as questions and answers for the feature
using deepseek
```

```todo
✅ step: Create the main feature file in the feature directory using the obtained questions and answers; using chatgpt
```

```todo
✅ commit changes
```

```todo
✅ step: In V2 Feature Branch Registry, correct the branch names: feature/private-publishing-infra → feature/private-publishing; feature/aio-geo-suite → feature/ai-optimization
```

```todo
✅ commit changes
```

```todo
✅ step: In observatory for the branch refactor/pre-v2-backlog (which has been merged and deleted) add the final status sentence, similar to what was done for refactor/pre-v2-architecture
```

```todo
✅ commit changes
```

```todo
✅ step: make branch: feature/private-publishing
```

Here we do cleanups

```todo
✅ loop: feature document directory structure should be revised
```

```todo
✅ loop: verification steps here should be revised
```

```todo
✅ step: JWT configuration validated
```

```todo
✅ step: add sonner to project 
```

```todo
✅ commit changes
```

```todo
✅ step: add app level scope to conventions
```

```todo
✅ commit changes
```

```todo
✅ step: add toaster to layout
```

```todo
✅ commit changes
```

---

from readiness.md we have to check these:

Application Logging integrated
Authentication events logged
Authentication failures logged
Session lifecycle logged
No direct console logging remains

```todo
✅ step: work on src/shared/constants/admin.ts
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/shared/logger/logger.ts
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/features/admin/utils/jwt.ts
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/features/admin/services/adminAuthService.ts
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/features/admin/repositories/adminRepository.ts
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/app/api/admin/login/route.ts
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/app/api/admin/logout/route.ts
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/app/api/admin/session/route.ts
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/middleware.ts
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/features/admin/hooks/useAdminAuth.ts
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/features/admin/components/LoginDialog.tsx
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/features/admin/components/LogoutButton.tsx
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/features/admin/components/AdminLoginListener.tsx
```

```todo
✅ commit changes
```

```todo
✅ step: Full project review to ensure no direct logging remains: Global search for the word console. in the folders src/app/api/admin and src/features/admin to completely remove remaining cases
```

```todo
✅ commit changes
```

```todo
✅ step: Manual testing of Auth scenarios: Successful login (check log creation + Toast display)
```

```todo
✅ step: make logout button ui better
```

```todo
✅ commit changes
```

```todo
✅ step: Manual testing of Auth scenarios: Unsuccessful login (check Failure log + error Toast display)
```

```todo
✅ step: Manual testing of Auth scenarios: Logout (check Lifecycle log + notification Toast display)
```

```todo
✅ step: Manual testing of Auth scenarios: Unauthorized attempt in Middleware (check access error log)
```

```todo
✅ step: check Capability Integration in readiness
```

```todo
✅ commit runbook prgress
```

---

from readiness.md we have to check these:

Database connectivity verified
Authentication runtime verified
Runtime logging verified

```todo
✅ loop: make steps from above
```

---

from readiness.md we have to check these:

Unit verification implemented
Unit verification passing
Failure scenarios implemented
Failure verification passing
Security verification implemented
Security verification passing
Integration verification implemented
Integration verification passing
Regression verification implemented
Regression verification passing

```todo
✅ step: work on src/features/admin/utils/jwt.test.ts
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/features/admin/services/adminAuthService.test.ts
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/app/api/admin/login/route.test.ts
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/middleware.test.ts
```

```todo
✅ commit changes
```

```todo
✅ step: Step 4.1: Run Vitest command for admin feature: Run the command bun vitest run src/features/admin and bun vitest run src/middleware.test.ts
```

```todo
✅ step: Step 4.2: Check for no Regression: Run previous infrastructure tests (bun vitest run src/shared/logger) to ensure previous layers do not fail
```

```todo
✅ commit runbook prgress
```

---

from readiness.md we have to check these:

Route handler verification completed
Application service verification completed
Repository verification completed
JWT utility verification completed
Authentication hook verification completed
Login dialog verification completed
Authentication state verification completed
Administrative UI verification completed
Login workflow verified
Logout workflow verified
Session validation verified
Refresh token rotation verified
Cookie behavior verified
Authorization rules verified

```todo
✅ step: work on src/features/admin/repositories/adminRepository.test.ts
```

```todo
✅ commit changes
```

```todo
✅ step: Create authentication hook test (e.g. useAdminAuth.test.tsx or related hook)
```

```todo
✅ commit changes
```

```todo
✅ step: Create login dialog component test (e.g. LoginDialog.test.tsx)
```

```todo
✅ commit changes
```

```todo
✅ step: Review Administrative UI: Check that sensitive management sections are not displayed if the user is not authenticated in the UI
```

```todo
✅ commit runbook prgress
```

---

from readiness.md we have to check these:

All required tests passing
Security requirements satisfied (⚠️)
Runtime requirements satisfied
No known blocking issues remain
Ready for production use

```todo
✅ loop: make steps from above
```

```todo
✅ commit runbook prgress
```

---

```todo
✅ change status in TRACKING for this feature
```

```todo
✅ commit changes
```

```todo
✅ checkout statging
```

```todo
✅ merge feature/private-publishing into staging
```

```todo
✅ delete feature/private-publishing
```

```todo
✅ upload git observatory to claude
```

```todo
✅ change observatory based on new refactors
```

```todo
✅ commit changes
```

```todo
✅ go to staging-runbook.md, line 109
```