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

Scopes represent stable repository responsibilities, features, or documentation artifacts. They are not required to mirror the physical directory structure.

When a commit primarily affects a known subsystem, feature, or documentation artifact, a scope **should** be provided.

The scope registry must be reviewed whenever a significant repository restructure introduces new long-lived responsibilities or removes existing ones.

#### Product / Code Scopes

Product code scopes are organized around **feature ownership and stable application responsibilities**, rather than individual source directories.

| Scope        | Responsibility                                                                                                                                                                                    |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `admin`      | Private publishing infrastructure — admin authentication, login/logout/session APIs, admin feature components, hooks, services, stores, JWT utilities, and related private publishing flows       |
| `blog`       | Public content platform — public blog surface, article listing/previews, content presentation, banner/navbar actions, search, and related public content flows                                    |
| `main`       | Main portfolio surface — banner, contact, projects, info sections, and main navbar actions                                                                                                        |
| `shared`     | Cross-cutting application infrastructure — shared layout, constants, libraries, providers, types, utilities, HTTP/API helpers, MongoDB access, logging, and other reusable application concerns   |
| `env`        | Environment configuration (`src/env.ts`, `.env*` files, validation)                                                                                                                               |
| `ui`         | Shared UI components under `shared/components/ui` (shadcn primitives)                                                                                                                             |
| `seo`        | Metadata, Open Graph, icons, manifest, robots/sitemap related changes                                                                                                                             |
| `middleware` | Next.js middleware (`src/middleware.ts`) — route protection, auth guards, and middleware-specific behavior                                                                                        |
| `deps`       | Dependency management (`package.json`, `bun.lock`, package upgrades/removals)                                                                                                                     |
| `config`     | Framework configuration (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `vercel.json`, `postcss.config.mjs`, etc.)                                                                       |
| `repo`       | Repository-level files (`.gitignore`, `README.md`, `.github/*`, `.gitattributes`, etc.)                                                                                                           |
| `app`        | Next.js App Router application shell — root `layout.tsx`, `template.tsx`, `error.tsx`, `global-error.tsx`, `loading.tsx`, `not-found.tsx`, route groups, root pages, and global route composition |

> `admin` and `blog` are feature-owned scopes. They should be used for changes belonging to their respective product features, even when the implementation spans multiple directories under `src`.

> `ui` should be used only when the change is limited to shared UI primitives. Broader cross-cutting changes should use `shared`.

#### Feature-to-Scope Mapping

Features defined under `docs/feature/` are the canonical product-level units of work. Each feature owns a stable commit scope for its implementation.

The current mapping is:

| Feature                             | Commit Scope | Responsibility                                       |
|-------------------------------------|--------------|------------------------------------------------------|
| `private-publishing-infrastructure` | `admin`      | Private publishing and administrative infrastructure |
| `public-content-platform`           | `blog`       | Public content and blog platform                     |

Every feature follows the same documentation structure:

```text
docs/feature/<feature-name>/
├── readiness.md
├── specification.md
└── verification.md
```

The feature's commit scope is used for implementation changes that belong to that feature, regardless of which `src` directories are touched.

As new long-lived features are introduced, they should receive an explicit scope mapping in this registry. A new feature scope should be introduced only when the feature represents a stable product responsibility rather than a temporary implementation detail.

#### How Feature-Scoped Work Is Committed

Feature work should be traceable from the feature documentation to its implementation history.

The expected relationship is:

```text
Feature
  ├── readiness.md
  ├── specification.md
  ├── verification.md
  └── implementation commits
          └── <type>(<feature-scope>): ...
```

For example:

```text
docs/feature/private-publishing-infrastructure/
    ├── readiness.md
    ├── specification.md
    └── verification.md

➕ feat(admin): add private publishing authentication flow
🧪 test(admin): verify admin publishing authorization
🐞 fix(admin): reject expired publishing sessions
```

And:

```text
docs/feature/public-content-platform/
    ├── readiness.md
    ├── specification.md
    └── verification.md

➕ feat(blog): add public article listing
🎨 style(blog): refine article preview layout
🐞 fix(blog): resolve public article rendering issue
```

This makes the feature scope an explicit bridge between **feature documentation and Git history**. The scope identifies the product responsibility; the individual commit type identifies the kind of change.

A commit should still represent one logical change. If a change spans multiple independent features, it must be split into separate commits rather than using multiple scopes in one commit.

---

#### Documentation Scopes

(based on root `docs/` artifacts)

| Scope         | Responsibility                                                                                                                      |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `adr`         | Architecture Decision Records (`docs/adr/`)                                                                                         |
| `spec`        | Product / technical specifications (`portfolio-v2-spec.md`, feature specifications, capability specifications, …)                   |
| `runbook`     | Engineering runbooks (`docs/runbook-v2/`)                                                                                           |
| `tracking`    | Tracking files (`TRACKING.md` and related progress trackers)                                                                        |
| `roadmap`     | Roadmap documents (`ROADMAP.md`)                                                                                                    |
| `observatory` | Git / process observatory (`docs/git-observatory.md`)                                                                               |
| `conventions` | Coding & process conventions (`docs/conventions.md`)                                                                                |
| `ai-wf`       | AI / engineering workflow docs (`docs/ai-integration-workflow.md`)                                                                  |
| `environment` | Environment documentation (`docs/environment.md`)                                                                                   |
| `tech-stack`  | Tech stack documentation (`docs/tech-stack.md`)                                                                                     |
| `guide`       | Developer guides, usage examples, implementation guidance, and authoring guidelines                                                 |
| `debug-log`   | Debugging knowledge log — accumulated root-cause investigations, rejected hypotheses, and lessons learned (`docs/debugging-log.md`) |

> `spec` includes `portfolio-v2-spec.md` and all documents under `docs/feature/` and `docs/capability/`.

> Feature implementation commits use the feature's product scope (`admin`, `blog`, etc.). Documentation commits concerning the feature specification itself use the appropriate documentation scope, such as `spec`, `runbook`, or `tracking`.

#### Scope Selection Rule

When choosing a scope, prefer the **most specific stable responsibility** that describes the change:

1. **Feature scope** — when the change belongs to a specific product feature.
2. **Subsystem scope** — when the change belongs to a stable application subsystem but is not owned by a single feature.
3. **Cross-cutting scope** — when the change affects shared application infrastructure.
4. **Repository/configuration scope** — when the change concerns repository-wide or framework-level infrastructure.
5. **Documentation scope** — when the change is documentation-only.

The physical location of a changed file does not, by itself, determine the scope.

For example, a component physically located under `src/shared/` may still use `admin` if it is owned exclusively by the private publishing feature. Conversely, a shared primitive used by multiple features should use `shared` or `ui`, depending on the responsibility of the change.

#### Examples

```text
➕ feat(admin): add hybrid JWT session endpoint
🐞 fix(blog): resolve hydration mismatch on article date
📖 docs(adr): record decision for server/UI state split
⚡️ perf(shared): dynamic import for heavy dialog components
🔧 chore(env): complete Zod validation for all required vars
📖 docs(spec): update public content platform specification
📖 docs(runbook): document article publishing workflow
```

#### Historical rebase resolving conflicts

| Scope    | Responsibility                                                                      |
|----------|-------------------------------------------------------------------------------------|
| `rebase` | Track every commit related to resolving conflicts after merging historical branches |

> after merging our historical rebases based on what we have on `git-observatory.md`, we have dozens of conflicts to resolve, so we need to define a commit message scope for them.


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

## 7. Application Logging Conventions

### Principles
- **Centralized Usage:** Always import the logger instance from `@/shared/logger`. Direct use of `console.log`, `console.error`, or `console.warn` in application code is strictly prohibited.
- **Resilience & Non-Blocking:** Logging operations must never throw uncaught exceptions or interrupt the execution flow of requests and business logic.

### Log Levels & Guidelines
Use appropriate log levels based on severity and context:

| Level   | Purpose & Usage Guideline                                                                      |
|:--------|:-----------------------------------------------------------------------------------------------|
| `trace` | Fine-grained diagnostic details (e.g., raw payload inspection during development).             |
| `debug` | Detailed operational information for debugging (e.g., internal algorithm state, method steps). |
| `info`  | Key system events and milestones (e.g., successful user auth, cache initialization).           |
| `warn`  | Non-fatal issues or unexpected conditions (e.g., missing optional config, rate-limit hits).    |
| `error` | Operations/request level failures requiring investigation (e.g., DB error, API timeout).       |
| `fatal` | Critical system failures causing application shutdown or complete outage.                      |

### Structured Metadata & Security
- **Metadata Format:** Pass contextual details as a key-value object (`Record<string, unknown>`).
- **Automatic Sanitization:** Never log raw sensitive data. The logger automatically redacts keys matching sensitive patterns (e.g., `password`, `token`, `secret`, `authorization`), but developers must remain cautious.
- **Error Handling:** When logging exceptions, pass the `Error` instance directly to preserve stack traces.

---

## 8. Documentation Convention

All documentation inside `docs/` falls into one of four distinct categories:

1. **Root Specifications:** High-level project specifications (`portfolio-v2-spec.md`, `conventions.md`).
2. **ADR (Architecture Decision Records):** Immutable record of major technical decisions (`docs/adr/ADR-XXXX-title.md`).
3. **Feature Specs:** Technical requirements for specific features (`docs/features/blog-engine.md`).
4. **Living Guides & Guidelines:** Evolving workflows and processes (`docs/blog/article-flow.md`, `git-observatory.md`).

---

## 9. AI Assistance Rules

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

### 2026-08-02

#### Application Logging Standards Added

Defined centralized application logging rules and log level standards.

- Mandated centralized logger usage (`@/shared/logger`) and banned raw `console` calls.
- Defined 6-tier log level severity matrix (`trace`, `debug`, `info`, `warn`, `error`, `fatal`).
- Established structured metadata standards and sensitive key auto-sanitization rules.

#### Documentation Scope Expanded

Added the `guide` documentation scope to distinguish developer-facing guidance from specifications and operational documentation.

- Introduced the `guide` scope for developer guides, usage examples, implementation guidance, and authoring guidelines.
- Clarified the separation between specifications (what the system defines) and guides (how developers use or implement it).

### 2026-08-05

#### App Router Scope Added

Introduced the `app` scope to cover Next.js App Router files that belong to the application shell rather than any individual feature.

- Added the `app` scope for root App Router files such as `layout.tsx`, `template.tsx`, `loading.tsx`, `error.tsx`, `global-error.tsx`, `not-found.tsx`, and `default.tsx`.
- Clarified that application shell and route composition files are owned by the `app` scope instead of feature scopes.
- Distinguished application entrypoint from reusable infrastructure (`shared`) and feature-specific implementations (`main`, `blog`, `admin`).

### 2026-08-08

#### Historical Rebase Conflict Scope Added

Introduced the `rebase` scope for commits that resolve conflicts after merging historical branches.

- Added the `rebase` scope to track every commit related to resolving conflicts that arise from historical rebases (as referenced in `git-observatory.md`).
- Established a dedicated scope for the large volume of conflict-resolution work that occurs after historical rebase merges, keeping these commits clearly separated from feature or documentation changes.

### 2026-08-10

#### Feature-Owned Commit Scopes Introduced

Updated commit scope governance to align Git history with the repository's feature-oriented documentation workflow.

* Reframed product scopes around stable feature ownership and application responsibilities rather than physical source directories.
* Established `admin` as the implementation scope for `private-publishing-infrastructure`.
* Established `blog` as the implementation scope for `public-content-platform`.
* Defined `docs/feature/<feature-name>/` as the canonical product-level unit for feature documentation, using the standard `readiness.md`, `specification.md`, and `verification.md` structure.
* Added a feature-to-scope mapping so implementation commits can be traced directly from feature documentation to Git history.
* Clarified that future long-lived features should receive an explicit scope mapping when they become stable product responsibilities.
* Added a scope selection rule that prioritizes feature ownership over physical file location.
* Clarified that documentation changes for a feature continue to use documentation scopes such as `spec`, `runbook`, or `tracking`, while implementation changes use the feature's product scope.
