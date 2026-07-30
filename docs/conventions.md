# Repository Conventions

## 1. Purpose
This document defines the core repository standards, Git workflows, naming strategies, and development conventions for Portfolio V2 (Next.js). Its purpose is to ensure long-term code maintainability, clear project history, and seamless collaboration between human developers and AI assistants.

---

## 2. Repository Principles
- **One Logical Change per Commit:** Every commit must represent a single, atomic, and independent change.
- **One Purpose per Branch:** A branch exists to solve one specific problem or deliver one clear feature.
- **Documentation Precedes Major Implementation:** Specifications, guidelines, or ADRs must be drafted before starting heavy implementation.
- **Preserve Clean & Linear History:** Favor predictable branch progression and avoid messy multi-subject commits.
- **Tool-Agnostic Workflow:** AI assistants, automation, or human developers must all strictly adhere to the same project conventions.

---

## 3. Commit Convention

### Commit Format
Every commit message must follow this structure:
`<emoji> <type>(<scope>): <short description>`

### Commit Rules
- **No Multi-subject Commits:** Do NOT combine multiple features or fixes into a single commit (e.g., `➕ feat(editor), 🐞 fix(blog)` is prohibited).
- **Single Subject Only:** If multiple scope changes are necessary, break them into separate commits.
- **AI Commitment:** AI-generated commit messages must strictly conform to these rules.

### Commit Types & Emojis
| Emoji | Type       | Purpose                                                   |
|:------|:-----------|:----------------------------------------------------------|
| ➕     | `feat`     | Adding a new feature                                      |
| 🐞    | `fix`      | Fixing a bug                                              |
| 📖    | `docs`     | Documentation changes only                                |
| 🎨    | `style`    | Code formatting, UI styling tweaks without logic changes  |
| ♻️    | `refactor` | Code restructuring without fixing bugs or adding features |
| ⚡️    | `perf`     | Performance improvements                                  |
| 🧪    | `test`     | Adding or updating tests                                  |
| 🔧    | `chore`    | Build tasks, package updates, configuration changes       |

### Commit Scope & Examples

Scopes represent stable repository responsibilities, not temporary implementation details or raw directory names.

When a commit primarily affects a known subsystem, feature, or documentation artifact, a scope **should** be provided.

The scope registry must be reviewed whenever a significant repository restructure introduces new long-lived responsibilities or removes existing ones.

#### Product / Code Scopes
(based on current `src` structure)

| Scope        | Responsibility                                                                                                              |
|--------------|-----------------------------------------------------------------------------------------------------------------------------|
| `admin`      | Admin authentication, login/logout/session APIs, admin feature components, hooks, services, stores, JWT utils               |
| `blog`       | Public blog surface — article listing, previews, banner, navbar actions, search                                             |
| `main`       | Main portfolio surface — banner, contact, projects, info sections, main navbar actions                                      |
| `shared`     | Cross-cutting UI primitives, layout (Navbar, listeners), constants, lib (API helpers, MongoDB), providers, types, utils     |
| `env`        | Environment configuration (`src/env.ts`, `.env*` files, validation)                                                         |
| `ui`         | Shared UI components under `shared/components/ui` (shadcn primitives)                                                       |
| `seo`        | Metadata, Open Graph, icons, manifest, robots/sitemap related changes                                                       |
| `middleware` | Next.js middleware (`src/middleware.ts`) — route protection, auth guards, etc.                                              |
| `deps`       | Dependency management (`package.json`, `bun.lock`, package upgrades/removals)                                               |
| `config`     | Framework configuration (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `vercel.json`, `postcss.config.mjs`, etc.) |
| `repo`       | Repository (`.gitignore`, `README.md`, `.github/*`, `.gitattributes`, etc.)                                                 |



> `ui` should be used only when the change is limited to shared UI primitives. Broader cross-cutting changes should use `shared`.

#### Documentation Scopes
(based on root `docs/` artifacts)

| Scope         | Responsibility                                                                |
|---------------|-------------------------------------------------------------------------------|
| `adr`         | Architecture Decision Records (`docs/adr/`)                                   |
| `spec`        | Product / technical specifications (`portfolio-v2-spec.md`, feature specs, …) |
| `runbook`     | Engineering runbooks (`docs/runbook-v2/`)                                     |
| `tracking`    | Tracking files (`TRACKING.md` and related progress trackers)                  |
| `roadmap`     | Roadmap documents (`ROADMAP.md`)                                              |
| `observatory` | Git / process observatory (`docs/git-observatory.md`)                         |
| `conventions` | Coding & process conventions (`docs/conventions.md`)                          |
| `ai-wf`       | AI / engineering workflow docs (`docs/ai-engineering-workflow.md`)            |
| `environment` | Environment documentation (`docs/environment.md`)                             |
| `tech-stack`  | Tech stack documentation (`docs/tech-stack.md`)                               |

> spec includes `portfolio-v2-spec.md` and all documents under `docs/feature/` and `docs/capablity/`

#### Examples

```
➕ feat(admin): add hybrid JWT session endpoint
🐞 fix(blog): resolve hydration mismatch on article date
📖 docs(adr): record decision for server/UI state split
⚡️ perf(shared): dynamic import for heavy dialog components
🔧 chore(env): complete Zod validation for all required vars
```

---

## 4. Branch Naming Convention

### Branch Name Format

Branches must be flat and self-contained. Do **NOT** construct deep nested paths (e.g., avoid `feature/blog/editor/image/upload`). Parent relationships are recorded in project tracking/git observatory, not in branch names.

`<type>/<feature-name>`

### Branch Types & Examples

* `feature/` → `feature/blog-engine`, `feature/editor-tiptap`, `feature/stack-drawer`
* `fix/` → `fix/dark-mode-toggle`, `fix/seo-schema-rendering`
* `docs/` → `docs/article-flow`, `docs/git-observatory`
* `refactor/` → `refactor/editor-toolbar`, `refactor/next-auth`

---

## 5. Branch Workflow & Policies

### Merge Policy

All feature branches merge into `main` (or active development branch) via pull requests / reviews following this strategy:

```
Feature Branch  --->  Review / Validation  --->  Fast-Forward Merge  --->  Delete Branch
```

* **Squash Merge:** Allowed only when a feature branch contains multiple small, uncleaned exploration commits.
* **Fast-Forward / Linear Merge:** Preferred for keeping a clean, linear history.
* **Merge Commits:** Reserved for significant release merges where maintaining branch topology is helpful.

### Rebase Policy

* **Never rebase shared/published branches.**
* Interactive rebase (`git rebase -i`) is encouraged on private feature branches before opening a PR to clean up commit history.
* Published history must remain immutable.

### Cherry-pick Policy

Cherry-picking is **not** part of the daily development workflow. It is restricted to:

* Critical production hotfixes needing immediate deployment.
* Selective documentation or feature migration between isolated environments.

### Tag Convention

Git tags follow Semantic Versioning (SemVer):

* `v2.0.0` (Major release)
* `v2.1.0` (Minor feature addition)
* `v2.1.1` (Patch fix)

---

## 6. Naming Conventions (Next.js & Codebase)

### Components (React / Next.js)

* **PascalCase** for component files and export names.
* Location: `components/blog/ArticleCard.tsx`, `components/ui/Drawer.tsx`

### Pages & Routes (Next.js App Router)

* Next.js reserved files in **lowercase**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`
* Route directories in **kebab-case**: `app/blog/[article-slug]/page.tsx`, `app/admin/add-article/page.tsx`

### TypeScript Files & Utilities

* **kebab-case** for helper files, hooks, and utility modules.
* Examples: `lib/format-date.ts`, `hooks/use-tiptap-editor.ts`, `types/blog-types.ts`

### Variables, Functions & Classes

* **camelCase** for variables, state, and functions: `const articleList = []`, `function getPostBySlug()`
* **PascalCase** for Types, Interfaces, Enums, and Classes: `interface ArticleProps`, `enum UserRole`
* **UPPER_SNAKE_CASE** for global constants: `const MAX_IMAGE_SIZE_MB = 5`

### Assets & Public Files

* **kebab-case** for all images, icons, and static assets in `/public`.
* Example: `public/images/hero-banner.webp`, `public/llms.txt`

---

## 7. Documentation Convention

All documentation inside `docs/` falls into one of four distinct categories:

1. **Root Specifications:** High-level project specifications (`portfolio-v2-spec.md`, `conventions.md`).
2. **ADR (Architecture Decision Records):** Immutable record of major technical decisions (`docs/adr/ADR-XXXX-title.md`).
3. **Feature Specs:** Technical requirements for specific features (`docs/features/blog-engine.md`).
4. **Living Guides & Guidelines:** Evolving workflows and processes (`docs/blog/article-flow.md`, `git-observatory.md`).

---

## 8. AI Assistance Rules

* AI tools (Claude, ChatGPT, Copilot, Cursor, etc.) must generate code, file names, branch names, and commits that comply 100% with these conventions.
* AI-generated PRs or commits must be vetted to prevent multi-subject commits or violation of naming conventions.

---

## Changelog

### 2026-07-30

#### Commit Scope Guidance Expanded

Commit scopes are maintained explicitly as part of repository governance.

Scopes should represent stable repository responsibilities rather than
temporary implementation details or directory names.

When a commit primarily affects a known subsystem, feature, documentation
artifact, or repository infrastructure, a scope should be provided.

Documentation commits should prefer artifact-oriented scopes such as:

- adr
- spec
- runbook
- tracking
- roadmap
- observatory
- conventions

Repository-wide changes should use dedicated infrastructure scopes where
applicable (e.g. `deps`, `config`, `repo`).

The scope registry is reviewed whenever significant repository structure
changes occur.