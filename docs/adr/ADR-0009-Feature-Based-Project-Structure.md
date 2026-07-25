# ADR-0009 — Adopt a Feature-Based Project Structure

**Status**

Accepted

**Date**

2026-07-25

## Context

The current project structure is organized primarily by technical type (e.g. `components/`, `stores/`, `hooks/`).

While suitable for small applications, this organization causes code related to the same business capability to become scattered across multiple directories.

The project roadmap includes several independent functional areas, including administration, blog management, bookshelf, technology stack management, and engineering playgrounds. These features are expected to evolve independently and should remain self-contained.

A clear ownership model is needed before additional features are implemented.

## Decision

The project will adopt a feature-based directory structure.

Business capabilities will be organized under `features/`.

Reusable code that is not owned by a single feature will be placed under `shared/`.

Example:

```text
src/

    app/

    features/

        admin/

        blog/

        bookshelf/

        stack/

        playground/

    shared/

        components/

        hooks/

        lib/

        types/

        utils/

        constants/
```

Each feature owns its own implementation, including components, hooks, API clients, validation, types, tests, and feature-specific utilities.

## Migration Strategy

A one-time migration will be performed before major feature development begins.

The current codebase is still sufficiently small that restructuring it now is less costly than maintaining a mixed organizational model during future development.

New features will be implemented directly within the feature-based structure.

## Architectural Rules

- Feature code MUST remain colocated.
- Features MUST own their internal implementation.
- Shared code MUST be genuinely reusable.
- Features MUST NOT depend on the internal implementation of other features.
- Cross-feature reuse SHOULD occur only through `shared/` or explicitly exposed public APIs.
- New feature development MUST follow the feature-based structure.

## Consequences

### Positive

- Improves discoverability and code ownership.
- Reduces cognitive overhead when working within a feature.
- Simplifies feature extraction or removal.
- Encourages modular development.
- Establishes a consistent project organization before significant growth.

### Negative

- Requires an initial restructuring effort.
- May require updating import paths.
- Introduces a different organizational model for contributors familiar with type-based layouts.

### Trade-offs

The project accepts a short-term migration cost in exchange for a clearer long-term architecture centered around business capabilities rather than technical artifact types.

## Alternatives Considered

### Option 1 — Continue Using a Type-Based Structure

**Rejected**

Advantages

- No migration effort.
- Familiar organization.

Disadvantages

- Related code becomes scattered.
- Feature ownership is unclear.
- Maintenance cost grows as features expand.

### Option 2 — Incremental Migration

**Rejected**

Advantages

- Lower immediate migration effort.
- Reduced short-term disruption.

Disadvantages

- Produces a mixed project structure for an extended period.
- Increases architectural inconsistency during development.

### Option 3 — Feature-Based Structure with One-Time Migration

**Accepted**

Chosen because the project is still relatively small, making a one-time migration inexpensive while establishing a consistent architectural foundation before major feature development begins.