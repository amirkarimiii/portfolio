# Git Observatory

> **Repository Historical Observatory**
>
> This document records the structural evolution of the repository, the rationale behind its branching topology, and the historical lineage of long-lived development efforts. Unlike `docs/conventions.md`, which defines repository policies, this document explains **how the repository reached its current state**.

---

# 1. Purpose

The Git Observatory documents the repository's living history.

It exists to answer questions such as:

* Why does a branch exist?
* Where did it originate?
* Why was a historical branch preserved?
* Why does a commit predate current repository conventions?
* How were historical development efforts integrated into the modern repository structure?

Unlike an ADR, this document is descriptive rather than prescriptive. It records repository history rather than establishing repository policy.

---

# 2. Repository Timeline

```
v1.0.0 (Initial Release)
│
├── v1.1.0 (Refinements & CV Integration)
│
├── Blog Exploration
│   │
│   ├── Route Prototype
│   │
│   ├── EditorJS Experiment
│   │
│   └── Tiptap Research & Editor Development
│
├── c8d9e58
│   │
│   ├── Documentation-Driven Development
│   │
│   ├── Architectural Refactoring
│   │
│   ├── New Repository Standards
│   │
│   └── Historical Branch Rebase
│
└── Current Development
```

This timeline intentionally distinguishes **historical implementation work** from **later architectural work**. Although the implementation of the editor predates much of the repository architecture, the repository history is reorganized through historical rebasing so that the evolution appears in its logical architectural order.

---

# 3. Primary Branches

## `main`

**Purpose**

Production releases only.

Only tagged, production-ready milestones are merged here.

---

## `staging`

**Purpose**

Primary integration branch.

Every active feature branch originates from `staging`.

Repository-wide architectural work, specifications, infrastructure, and feature integration all converge here before production.

---

## `develop/v2`

**Purpose**

Documentation-Driven Development workspace.

This temporary branch hosts specifications, ADRs and architectural documentation until the documentation phase is complete.

This branch was merged and deleted after the documentation phase was completed in `staging`.

## `refactor/pre-v2-backlog`

**Purpose**

Technical Debt & Pre-V2 Refactor Backlog coordination branch.

Serves as the base for all pre-V2 cleanup work, organized into three sequential sub-branches:

- `fix/pre-v2-bugs` — Bug fixes independent of refactor strategy. Active first.
- `refactor/pre-v2-architecture` — Foundational architecture decisions that block other work. Active after bugs branch is merged and deleted.
- `refactor/pre-v2-infrastructure` — Infrastructure and cross-cutting concerns. Active after architecture branch is merged and deleted.

Each sub-branch originates from this branch, is worked independently, merged back, and deleted before the next one begins.

## `refactor/pre-v2-architecture`

**Purpose**

Foundational architecture decisions that block other work.

This branch hosts a sequence of four focused sub-branches, each merged via fast-forward
into this branch before the next one begins:

- `refactor/auth-model` — D1: Resolve session-based vs JWT auth model decision.
- `refactor/state-split` — D2: Define server state vs UI state boundaries.
- `refactor/feature-structure` — D3: Establish feature-based directory structure.
- `refactor/service-layer` — D4: Define service layer boundaries.

This branch was merged via fast-forward into `refactor/pre-v2-backlog` after all four decisions were completed, and subsequently deleted.

---

# 4. Historical Development

Before the repository adopted its current architectural conventions, the editor subsystem was developed through a chain of nested feature branches.

Those branches represent genuine development history rather than abandoned experiments.

Examples include:

```
feat/new-article-route

└── feat/new-article-route-b/tiptap

    └── feat/new-article-route-b/toolbar

        └── feat/new-article-route-b/add-image
```

These branches contain the original implementation history of:

* Tiptap integration
* Custom extensions
* Toolbar implementation
* Image validation
* Link handling
* Editor UX improvements

They are preserved only until their history has been successfully relocated into the modern repository structure.

---

# 5. Historical Rebase Policy

Historical branches are **not merged** into the active development history.

Instead, they are **rebased onto the new architectural foundation** once the required infrastructure becomes available.

This policy preserves:

* the original development sequence
* the original author dates
* the logical progression of implementation
* the narrative of repository evolution

while allowing the repository to present a clean architectural history.

This repository deliberately treats those historical branches as legitimate development history rather than code requiring reimplementation.

---

# 6. Commit History Philosophy

Repository conventions evolved over time.

Consequently, historical commits are expected to differ from current repository standards.

This is intentional.

Historical commit messages are preserved as historical artifacts.

They are **not rewritten solely to satisfy modern commit-message conventions**.

Only commits created after the adoption of the current conventions are expected to fully comply with `docs/conventions.md`.

This approach prioritizes historical authenticity over cosmetic consistency.

---

# 7. Repository Evolution

Major repository milestones include:

## EditorJS → Tiptap

The initial editor implementation used EditorJS.

As requirements matured, the project transitioned to Tiptap to provide greater extensibility and complete control over editor behavior.

---

## Documentation-Driven Development

Feature implementation paused temporarily in order to establish:

* architectural specifications
* ADRs
* coding conventions
* repository governance
* implementation guidelines

This documentation now serves as the architectural foundation for subsequent development.

---

## Branch Strategy Simplification

Early development relied upon nested branch names to represent parent-child relationships.

Examples:

```
feature-a
feature-a-b
feature-a-b-c
```

This strategy was later abandoned in favor of flat branch names.

Modern branches describe responsibility rather than ancestry.

---

## Historical Rebase

Once the architectural foundation was completed, historical implementation branches were repositioned through rebasing.

This does **not** represent new implementation work.

Rather, it restores the repository timeline so that infrastructure appears before the features that depend upon it.

---

## Parallel Documentation Work on Staging

During active development on `refactor/pre-v2-architecture`, a documentation and
specification review was performed directly on `staging`. Once those commits landed
on `staging`, `refactor/pre-v2-architecture` was rebased onto the new `staging` HEAD
to preserve a clean, linear history — consistent with `ADR-0005`.

---

# 8. Recovery Anchors

Important historical checkpoints include:

| Commit    | Purpose                                   |
|-----------|-------------------------------------------|
| `c93b2ff` | v1.0.0                                    |
| `fbe8780` | v1.1.0                                    |
| `c8d9e58` | Staging recovery anchor                   |
| `57362e9` | Documentation-Driven Development adoption |

These commits represent stable recovery points rather than ordinary development milestones.

---

# 9. Historical Integration Status

Historical feature branches remain temporarily available until their complete development history has been relocated through the historical rebase process.

After successful relocation they are removed.

They are **not** maintained as permanent branches.

The repository intentionally maintains a minimal active branch set while preserving the authentic evolution of the project through commit history.

---

# 10. Repository Governance

Repository rules are defined separately.

For:

* branch naming
* commit conventions
* merge strategy
* rebase policy
* release workflow
* AI collaboration guidelines

refer exclusively to:

```
docs/conventions.md
```

This Observatory should be considered the historical companion to those conventions.

While the conventions define **how development proceeds**, this document explains **how the repository arrived at its present form**.
