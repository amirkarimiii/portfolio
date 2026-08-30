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

This branch was merged via fast-forward into `staging` after all three works were completed, and subsequently deleted.

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

## `feature/logging`

**Purpose**

Application Logging Layer foundation capability.

Establishes shared logging infrastructure before product features are implemented.
This branch was merged via fast-forward into `staging` upon completion of the Application Logging Layer, and subsequently deleted.
This branch precedes all V2 product feature branches.

## V2 Feature Branch Registry

The following branch names are reserved for V2 roadmap features.
Branches are created only when the preceding feature is complete.

| Branch Name                       | Feature                           | Diverged / Merged to | Status  |
|-----------------------------------|-----------------------------------|:--------------------:|---------|
| `feature/private-publishing`      | Private Publishing Infrastructure |       staging        | Merged  |
| `feature/public-content-platform` | Public Content Platform (Core V2) |       staging        | Active  |
| `feature/stack-map`               | Interactive Stack Mapping         |       staging        | Pending |
| `feature/bookshelf`               | Analytical Bookshelf              |       staging        | Pending |
| `feature/ai-optimization`         | AI Optimization Suite (AIO/GEO)   |       staging        | Pending |

### `feature/public-content-platform`

This feature is organized into sequential stages.
Sub-branches are fast-forward merged back into `feature/public-content-platform` upon completion.

| Branch Name                   | Stages                  |      Diverged / Merged to       | Status  |
|-------------------------------|-------------------------|:-------------------------------:|---------|
| `feature/pcp-ui-design`       | UI Design               | feature/public-content-platform | Merged  |
| `feature/pcp-wiring-beneath`  | Wiring Beneath          | feature/public-content-platform | Active  |
| `feature/pcp-readiness-check` | Checking with Readiness | feature/public-content-platform | Pending |

UI Design and Wiring Beneath stages contain organized sub-tasks tracked as sequential sub-branches. Checking with Readiness is a single-phase stage with no sub-branches.

#### Stage 1: UI Design

This stage is organized into sequential sections.
Sub-branches are fast-forward merged back into `feature/pcp-ui-design` upon completion.

| Branch Name                   | Sections                                 | Diverged / Merged to  | Status |
|-------------------------------|------------------------------------------|:---------------------:|--------|
| `feature/pcp-ui-article-crud` | Article Creation and Edit                | feature/pcp-ui-design | Merged |
| `feature/pcp-ui-series-form`  | New Series Creation Form                 | feature/pcp-ui-design | Merged |
| `feature/pcp-ui-cards`        | Public Layers, Security Modals and Cards | feature/pcp-ui-design | Merged |
| `feature/pcp-lifecycle`       | Lifecycle                                | feature/pcp-ui-design | Merged |

Article Creation and Edit section contains organized sub-tasks tracked as sequential sub-branches. Other sections are single-phase with no sub-branches.

##### Section 1: Article Creation and Edit

| Branch Name                      | Steps                       | Diverged / Merged to        | Status  |
|----------------------------------|-----------------------------|-----------------------------|:-------:|
| `feature/pcp-article-foundation` | Article Creation Foundation | feature/pcp-ui-article-crud | Merged  |
| `feature/pcp-article-metadata`   | Tab Metadata                | feature/pcp-ui-article-crud | Merged  |
| `feature/pcp-article-content`    | Tab Content                 | feature/pcp-ui-article-crud | Merged  |

#### Stage 2: Wiring Beneath

This stage is organized into three sequential sub-branches.
Sub-branches are fast-forward merged back into `feature/pcp-wiring-beneath` upon completion.

| Branch Name                   | Sub-branches      |    Diverged / Merged to    | Status |
|-------------------------------|-------------------|:--------------------------:|--------|
| `feature/pcp-first-article`   | First Article     | feature/pcp-wiring-beneath | Merged |
| `feature/pcp-lifecycle`       | Article Lifecycle | feature/pcp-wiring-beneath | Merged |
| `feature/pcp-api-integration` | API Integration   | feature/pcp-wiring-beneath | Active |

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

## Historical Rebase Execution

When historical branches are ready to be integrated, the following procedure is followed:

1. Fast-forward merge up through the historical branch chain to the divergence point.
2. Commit a clearly marked `─────── HISTORICAL REBASE: BEGIN ───────` marker immediately before the rebase.
3. Rebase the historical chain onto the current `staging` HEAD.
4. Commit a clearly marked `─────── HISTORICAL REBASE: END ───────` marker immediately after.
5. Delete historical branches after successful relocation.

The two marker commits intentionally fall outside repository commit conventions.
Their sole purpose is to make the rebase boundary unambiguous in the commit log.

Author dates and the original development sequence are preserved throughout this process.

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
| `caf539d` | Historical rebase begin                   |
| `c037d8b` | Historical rebase end                     |

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
