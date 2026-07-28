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

```todo
✅ go to 05-D4-application-service.md
```
