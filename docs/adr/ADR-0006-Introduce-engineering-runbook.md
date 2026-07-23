# ADR-0006: Introduce `engineering-runbook.md`

- **Status:** Accepted
- **Date:** 2026-07-23

---

## Context

The project already maintains several types of documentation, each serving a distinct purpose:

- **Specification** defines what the system should become.
- **Architecture Decision Records (ADRs)** explain why architectural decisions were made.
- **Git Observatory / Backlog** records the current state and progress of the project.

However, none of these documents describe **how engineering work should be executed**.

As the project grew, development tasks started following recurring procedural patterns. Typical activities such as researching a topic, creating an ADR, implementing changes, committing work, updating the backlog, merging branches, and cleaning up branches occur repeatedly and in a consistent order.

While each individual step is simple, remembering the correct sequence introduces unnecessary cognitive overhead and increases the chance of skipping steps.

The project therefore requires a document that captures the operational workflow itself.

---

## Decision

Introduce a new document named `engineering-runbook.md`.

This document defines the standard engineering workflow for recurring development activities.

It serves as an operational checklist rather than a design document.

Typical contents include:

- research steps
- ADR creation
- implementation workflow
- commit strategy
- backlog updates
- merge workflow
- documentation updates
- project-specific engineering routines

The runbook is expected to evolve alongside the project as the workflow improves.

---

## Alternatives Considered

### Option A — No runbook

Rely entirely on memory and existing documentation.

Rejected because procedural knowledge is different from architectural knowledge. Existing documentation explains *what* and *why*, but not *how* engineering work should be executed.

---

### Option B — Decision-tree / Stage-gate workflow

Adopt a more formal engineering process using concepts such as:

- Stage Gates
- Decision Trees
- Approval Gates
- Exit Criteria
- Workflow State Machines

This style is commonly used in larger engineering organizations where multiple contributors, approvals, and parallel workstreams exist.

Rejected for this project because it introduces process complexity that is disproportionate to the project's current size.

The project is maintained by a single developer and does not currently benefit enough from the additional structure to justify its maintenance cost.

This alternative may be reconsidered if the project grows significantly.

---

### Option C — Task-based engineering runbook (Chosen)

Maintain a simple sequential workflow describing the standard execution order of engineering tasks.

The runbook remains intentionally lightweight while eliminating cognitive overhead and reducing the likelihood of skipped procedural steps.

---

## Consequences

### Positive

- Reduces cognitive load during development.
- Makes recurring workflows repeatable.
- Prevents procedural steps from being forgotten.
- Separates operational knowledge from architectural documentation.
- Complements existing project documentation without overlapping responsibilities.
- Can evolve incrementally as the engineering workflow improves.

### Negative

- Requires occasional maintenance as the workflow changes.
- Represents the current workflow rather than enforcing every possible engineering scenario.

---

## Documentation Responsibilities

After this decision, project documentation is divided into four complementary categories:

| Document                  | Responsibility                   |
|---------------------------|----------------------------------|
| Specification             | What should be built             |
| ADRs                      | Why decisions were made          |
| Git Observatory / Backlog | Current project state            |
| Engineering Runbook       | How engineering work is executed |

---

## Future Reconsideration

If the project evolves into a multi-developer codebase or engineering processes become significantly more complex, this decision should be revisited.

At that point, the engineering runbook may evolve toward a more formal workflow model incorporating decision gates, approval checkpoints, or state-based engineering processes.