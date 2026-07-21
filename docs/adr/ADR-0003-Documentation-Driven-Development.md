# ADR-0003: Adopt Documentation-Driven Development Workflow

* **Status:** Accepted
* **Date:** 2026-07-21

## Context

During the implementation of the portfolio redesign and the blog system, development initially focused on implementing the editor and its surrounding infrastructure. As the project evolved, it became clear that several product-level decisions—including the article authoring flow, feature boundaries, roadmap, and overall portfolio architecture—had never been fully documented.

Although many of these decisions already existed as personal notes or discussion outcomes, they were not consolidated into project documentation. As a result:

* The overall product vision was not represented in a single authoritative document.
* Feature scope and implementation order became increasingly difficult to reason about.
* Several implementation decisions had to be revisited because higher-level requirements were still evolving.
* Planning, architecture, and implementation gradually became intertwined instead of following a clear progression.

A full project review confirmed that the implementation had advanced faster than the product specification itself. Before continuing development, the project required a stable documentation foundation.

## Decision

The project adopts a **Documentation-Driven Development** workflow.

From this point forward, significant implementation work must be preceded by sufficient documentation describing the product, feature, or architectural decision being implemented.

The documentation structure is intentionally lightweight to remain maintainable for a single-developer project.

The project documentation consists of:

* **Portfolio Specification**

    * A single high-level specification describing the product vision, goals, major features, current roadmap, and overall direction.

* **Architectural Decision Records (ADR)**

    * Independent records for architectural and long-term technical decisions.

* **Blog Documentation**

    * Documentation dedicated to the article authoring workflow, editorial guidelines, rendering rules, and feature-specific Definition of Done.

* **Feature Documentation**

    * Created only for features whose complexity justifies dedicated documentation. Simpler features should not receive standalone documents.

* **Repository Conventions**

    * A centralized reference describing coding, documentation, naming, and repository conventions.

* **Git Observatory**

    * A project-maintenance document describing the repository's branching strategy, branch purposes, merge policy, release flow, and related Git practices. This document exists primarily as an operational reference for repository maintenance rather than product documentation.

## Alternatives Considered

### Continue implementation without changing the workflow

Rejected.

This would continue increasing product-level uncertainty and require additional redesigns as undocumented requirements surfaced during implementation.

### Create comprehensive documentation for every subsystem

Rejected.

While suitable for larger teams, this introduces unnecessary maintenance overhead for a single-developer portfolio project and increases the likelihood of documentation drift.

### Adopt a lightweight documentation strategy

Accepted.

A minimal but structured documentation set provides sufficient architectural guidance while remaining practical to maintain alongside implementation.

## Consequences

### Positive

* Product decisions become explicit before implementation.
* Feature scope is clarified earlier.
* Architectural decisions remain traceable through ADRs.
* Returning to the project after long periods becomes significantly easier.
* Documentation becomes a reliable source of truth instead of scattered personal notes or conversation history.

### Trade-offs

* Development may begin slightly later due to the documentation phase.
* Documentation itself becomes part of the project's maintenance responsibility.
* New features require an initial planning step before implementation.

## Notes

This ADR defines the project's development workflow rather than a specific technical architecture.

Future ADRs may build upon this workflow, including decisions regarding branching strategy, release management, and repository organization.
