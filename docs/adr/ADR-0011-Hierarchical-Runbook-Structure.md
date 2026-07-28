# ADR-0011: Evolve Engineering Runbook into a Hierarchical Runbook Structure

* **Status:** Accepted
* **Date:** 2026-07-28

---

## Context

ADR-0006 introduced `engineering-runbook.md` as the project's operational workflow document.

Its purpose was to capture recurring engineering procedures such as research, ADR creation, implementation, commit strategy, branch management, backlog updates, and other project-specific engineering routines.

As development progressed, the runbook successfully evolved into a living document that guided day-to-day engineering work.

Over time, however, the document accumulated multiple independent execution flows covering different phases of the project, including pre-v2 refactors, feature implementation, polishing, testing, deployment preparation, and various engineering side jobs.

Although these workflows belong to the same project, they have different scopes, different lifecycles, and different completion criteria.

The problem is therefore not merely document size.

The original runbook has gradually become responsible for several independent operational workflows that happen to be stored in chronological order rather than organized by engineering context.

This introduces several problems:

* unrelated workflows become coupled inside a single document;
* navigation becomes increasingly difficult as completed work accumulates;
* recurring execution patterns become harder to maintain;
* phase-specific tracking becomes mixed with project-wide planning.

At the same time, the project has grown to include additional documentation responsibilities beyond those defined when ADR-0006 was written.

A higher-level planning document is now needed to track project phases, milestones, scheduling changes, and overall execution progress independently of the detailed engineering procedures.

---

## Decision

Replace the single engineering runbook with a hierarchical structure.

The documentation is now organized into two complementary layers.

### Layer 1 — Roadmap

`ROADMAP.md` becomes the project's high-level execution plan.

Its responsibilities include:

* defining the execution order of project versions;
* recording version status;
* tracking milestones;
* recording start and finish dates;
* documenting scheduling changes and priority adjustments;
* linking to the appropriate version document for each version.

The roadmap intentionally avoids implementation details.

---

### Layer 2 — Version Documents

Each project version owns a single living document. Before execution, it serves as the planning document for that version. During implementation, it becomes the engineering runbook. After completion, it becomes the historical record of that version.

The structure is:

```
ROADMAP.md

01-pre-v2/
README.md

02-v2.0/
README.md

03-v2.1/
README.md

04-v2.2/
README.md
```

When appropriate, a version may be further decomposed into smaller execution scopes.

For example:

* Architecture decisions (D1–D4)
* Infrastructure improvements (I1–I8)
* Individual feature implementations

If multiple execution scopes follow the same procedural pattern, that pattern is documented once and reused instead of being duplicated throughout the document.

This preserves consistency while reducing maintenance overhead.

---

## Migration Strategy

The existing `engineering-runbook.md` is reorganized into the new hierarchy rather than rewritten from scratch.

Most operational content is preserved.

Only small contextual adjustments are made where necessary so that each extracted version document is understandable within its new scope.

Some earlier engineering work predates the introduction of engineering runbooks.

Examples include early project fixes that were documented only through Git history and Git Observatory.

These historical activities are **not reconstructed retroactively**.

Instead, they remain documented in their original sources.

The new hierarchy applies to engineering work going forward.

---

## Alternatives Considered

### Option A — Keep a single growing runbook

Continue maintaining one living document containing every engineering workflow.

Rejected because independent workflows naturally accumulate over time, increasing maintenance cost and reducing navigability.

The issue is organizational rather than simply document length.

---

### Option B — Archive completed sections

Move completed sections into historical archives while keeping a single active runbook.

Rejected because this reduces document size but does not address the underlying architectural problem.

Independent engineering workflows would still share a single operational document.

---

### Option C — Hierarchical Runbook Structure (Chosen)

Separate project-level planning from version-level operational workflows.

Organize engineering procedures according to engineering context rather than chronology.

Allow each version to evolve independently while preserving consistent execution patterns.

---

## Consequences

### Positive

* Separates strategic planning from operational execution.
* Allows engineering workflows to evolve independently.
* Reduces maintenance cost of large living documents.
* Keeps each version document focused on a single engineering context.
* Makes recurring execution patterns easier to maintain.
* Improves navigation for both humans and AI assistants.
* Preserves the living-document philosophy while making it scalable.
* Enables future project versions to be introduced without expanding a single document indefinitely.

### Negative

* Introduces additional documentation files.
* Requires occasional synchronization between the roadmap and individual version documents.
* Requires a one-time migration from the original runbook structure.

---

## Documentation Responsibilities

Following this decision, project documentation is organized as follows:

| Document                  | Responsibility                                             |
|---------------------------|------------------------------------------------------------|
| Specification             | What should be built                                       |
| ADRs                      | Why architectural decisions were made                      |
| Git Observatory / Backlog | Current project state                                      |
| Roadmap                   | Tracks project versions and overall progress               |
| Version Documents         | Planning, execution, and historical record of each version |

---

## Future Reconsideration

If future project growth introduces multiple concurrent development streams or multiple contributors working on different versions simultaneously, this hierarchical model may evolve further.

Possible future directions include:

* dependency graphs between version documents;
* automated roadmap generation;
* workflow templates shared across versions;
* stronger integration with project management tooling.

At the current project size, the hierarchical structure provides an appropriate balance between maintainability, flexibility, and engineering discipline.