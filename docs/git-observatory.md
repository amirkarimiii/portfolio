# Git Observatory

## 1. Purpose
The Git Observatory tracks the living state, evolution history, branch topology, and structural migrations of the Portfolio repository. Unlike `docs/conventions.md` (which defines rules), this document records **what exists in the repository and why**.

---

## 2. Repository Timeline
A high-level timeline of major repository milestones:

```
v1.0.0 (Initial Release)
  │
  ├── v1.1.0 (Refinements & CV Integration)
  │
  ├── Blog Integration & Route Exploration (feat/new-article-route)
  │     │
  │     ├── EditorJS Implementation (Superseded)
  │     │
  │     └── Tiptap Engine Migration & Feature Toolbar Development
  │
  └── c8d9e58 (Staging Recovery Point)
        │
        └── develop/v2 (Documentation-Driven Development Restart — temporary, fast-forwards onto staging, then deleted)

```

---

## 3. Main Branches

### `main`

* **Purpose:** Production-ready releases only. Reflects live deployments.
* **Upstream Origin:** Repository root.
* **Merge Trigger:** Direct tag releases from stable integration milestones.

### `staging`

* **Purpose:** The single active base for all ongoing development. Contains validated features, UI enhancements, and admin capabilities up to commit `c8d9e58`, and is the branch **all new feature/documentation branches must be created from**.
* **Upstream Origin:** Forked from `main` at release `v1.1.0`.
* **Merge Trigger:** Merged via pull requests after feature validation.
* **Branching Policy:** All new branches (features, docs, specs, ADRs, historical extractions) are created from `staging`. See `ADR-0004`.
---

## 4. Branch Registry & Lineage Table

| Branch                                                  | Parent Reference         | Purpose / Context                                              | Current Status                                                                       |
|---------------------------------------------------------|--------------------------|----------------------------------------------------------------|--------------------------------------------------------------------------------------|
| `main`                                                  | —                        | Live production branch                                         | Active                                                                               |
| `staging`                                               | `main` (`v1.1.0`)        | Active development base — all new branches fork here           | **HEAD / Active**                                                                    |
| `develop/v2`                                            | `staging` (`c8d9e58`)    | DDD restart — hosts remaining `portfolio-v2-spec` feature docs | **Active**; fast-forwards onto `staging` and is deleted once the last spec doc lands |
| `feat/new-article-route`                                | `staging`                | Initial blog route exploration & EditorJS setup                | Archived (Unmerged / Historical Reference)                                           |
| `feat/new-article-route-b/tiptap`                       | `feat/new-article-route` | Core Tiptap setup & custom extensions                          | Archived / Pending Extraction                                                        |
| `feat/new-article-route-b/tiptap-b/toolbar`             | `.../tiptap`             | Rich-text toolbar initial controls                             | Archived / Pending Extraction                                                        |
| `feat/new-article-route-b/tiptap-b/toolbar-b/add-image` | `.../toolbar`            | Image extension & magic byte validation                        | Archived / Pending Extraction                                                        |

---

## 5. Branch Lineage Graph

The visual parent-child tree representing historical feature iteration before the branch naming convention reset:

```
staging (c8d9e58)  ── base for all active and future work
  │
  ├── develop/v2 (fast-forward only — documentation & V2 specs)
  │
  └── [Historical Exploration Chain — preserved as reference, not a fork base]
        └── feat/new-article-route
              └── feat/new-article-route-b/tiptap
                    └── feat/new-article-route-b/tiptap-b/toolbar
                          └── feat/new-article-route-b/tiptap-b/toolbar-b/add-image

```

---

## 6. Historical & Deep Nested Branches (Context)

During the initial phase of the blog feature development, deep nested branch names were utilized to indicate parent hierarchy (e.g., `feat/new-article-route-b/tiptap-b/toolbar-b/add-image`).

* **Why Created:** To build a robust, custom Tiptap rich-text editor engine complete with custom toolbar initializers, custom mark/block extensions, Sonner toasts, image magic-byte security validations, and link handling.
* **Current State:** Preserved as **Historical References**, unmerged, only until extraction is complete. The work is not migrated by merging these branches directly; it is migrated commit-by-commit via the Cherry-Pick Extraction Policy (`ADR-0005`) into new flat branches created from `staging`. Once the last commit has been cherry-picked from the last remaining historical branch (i.e., the Pending Integration Queue in Section 9 is fully drained), these branches are deleted — they are not kept indefinitely.

---

## 7. Migration Log

Major repository shifts and architectural transitions:

1. **EditorJS to Tiptap Engine Migration:**
    * *Context:* EditorJS was initially integrated on `feat/new-article-route`. Due to extensibility limits and UI control flexibility needed for blog authoring, it was purged and replaced with `@tiptap/core` (see `ADR-0001`).

2. **Shift to Documentation-Driven Development (DDD):**
    * *Context:* Direct feature coding was paused after commit `7588113` to prioritize architectural clarity, specifications, and proper guidelines.
    * *Action:* `develop/v2` was fast-forwarded from `c8d9e58` to host all `docs/` specifications before continuing code implementation (see `ADR-0003`).

3. **Flat Branching Strategy Transition:**
    * *Context:* Abandoned deep branch chaining (`...-b/...-b/...`) in favor of flat branch names (`feature/<scope>`) tracked directly within this Observatory file.

4. **Cherry-Pick Extraction Policy adopted (replacing generic "Porting"); historical branches deleted once extraction completes.** See `ADR-0004`.

---

## 8. Recovery Points & Critical Commits

Key immutable points in the repository history for rollbacks or historical audits:

* `c93b2ff` -> Tag `v1.0.0`: Initial production launch.
* `fbe8780` -> Tag `v1.1.0`: Stable release base containing primary showcase features.
* `c8d9e58` -> **Staging Baseline / Recovery Anchor:** The last verified stable commit on `staging` containing admin authentication routes, Zustand stores, and MongoDB/Bcrypt infrastructure. The branch point `develop/v2` fast-forwards from.
* `57362e9` -> **ADR-0003 Anchor:** Official adoption of Documentation-Driven Development workflow.

---

## 9. Pending Integration Queue

Code modules developed in historical branches waiting for clean extraction via cherry-pick into new flat branches created from `staging`:

| Component / Feature             | Source Branch   | Destination Target                      | Status                          |
|---------------------------------|-----------------|-----------------------------------------|---------------------------------|
| **Tiptap Core & Extensions**    | `.../tiptap`    | `feature/blog-editor` (from `staging`)  | Awaiting cherry-pick extraction |
| **Toolbar Initializers & UI**   | `.../toolbar`   | `feature/blog-editor` (from `staging`)  | Awaiting cherry-pick extraction |
| **Magic-Byte Image Validation** | `.../add-image` | `feature/image-upload` (from `staging`) | Awaiting cherry-pick extraction |

---

## 10. Repository Policies & Governance

For rules regarding Branch Naming, Commit Formats, Merge Policies, Rebase Rules, and AI Engagement, refer strictly to:
👉 `docs/conventions.md`