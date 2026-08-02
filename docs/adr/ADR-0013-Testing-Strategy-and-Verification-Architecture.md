# ADR-0013: Testing Strategy and Verification Architecture


-   **Status:** Accepted
-   **Date:** 2026-08-02

---

## Context

As Portfolio V2 progresses through Foundations, Features, Polishings, and pre-deployment phases, the project requires a consistent and scalable testing strategy aligned with the existing architectural principles.

Previous ADRs established:

* Documentation-Driven Development
* Feature-Based Project Structure
* Application Service Boundaries
* Hierarchical Runbook Structure

Testing must integrate with these principles rather than introduce a parallel organizational model.

The project also distinguishes between:

* Architectural decisions
* Capability definitions
* Feature specifications
* Execution roadmaps

Testing documentation and implementation must follow the same hierarchy.

## Problem

Without an explicit testing strategy, the project risks:

* Inconsistent test placement
* Mixed unit and integration concerns
* Duplicate documentation
* Poor traceability between architecture and verification
* Difficulty scaling verification as new capabilities and features are introduced

The project also requires a clear distinction between:

* Tests written during development
* System-level verification performed before release

## Decision

### 1. Test Placement Strategy

Unit and integration tests SHALL be colocated with the source code they verify.

Examples:

```text
src/shared/logger/
├── logger.ts
├── logger.unit.test.ts
└── logger.integration.test.ts
```

```text
src/features/admin/services/
├── adminAuthService.ts
├── adminAuthService.unit.test.ts
└── adminAuthService.integration.test.ts
```

A centralized test directory SHALL NOT be used for unit or integration tests.

### 2. Test Naming Convention

The following naming conventions SHALL be used:

```text
*.unit.test.ts
*.integration.test.ts
```

Additional specialized suites MAY use:

```text
*.contract.test.ts
```

when the test protects a formal application contract.

### 3. System-Level Test Directory

Tests that verify the behavior of multiple modules or the entire application SHALL be stored in a dedicated root-level test directory.

Recommended structure:

```text
tests/
├── e2e/
├── acceptance/
├── fixtures/
├── mocks/
└── helpers/
```

Examples include:

* Playwright suites
* Acceptance scenarios
* End-to-end workflows
* Shared fixtures and mocks

### 4. Verification Documentation Strategy

The project SHALL NOT create Markdown files for individual test suites.

The test implementation itself is considered executable documentation.

Instead, verification intent SHALL be documented at the Capability and Feature levels.

Each Capability or Feature document MAY contain a section named:

```md
## Verification Plan
```

This section may define:

* Unit test scope
* Integration test scope
* Acceptance test scope
* Explicit non-goals
* Verification assumptions

Example:

```md
## Verification Plan

### Unit Tests

- Payload formatting
- Metadata sanitization

### Integration Tests

- Transport invocation
- Failure handling

### Non-Goals

- External aggregation systems
```

### 5. Architectural Rationale Location

Architectural reasoning behind testing decisions SHALL reside in:

* ADRs
* Capability documents
* Feature documents

Individual test suites SHOULD NOT require dedicated Markdown documentation unless they implement unusually complex architectural or business rules.

### 6. Incremental Testing Policy

Testing SHALL be introduced incrementally during implementation.

Examples:

* Foundation capabilities receive unit and integration tests during Foundations.
* Feature implementations receive unit and integration tests during Feature development.

Testing is not deferred until the final verification phase.

### 7. Runbook Verification Phase

The current Testing phase represents a system-level verification stage rather than the beginning of testing activities.

Future runbooks SHOULD prefer terminology such as:

```text
Verification
```

or

```text
System Verification
```

instead of:

```text
Testings
```

to better reflect the responsibilities of that phase.

The verification phase focuses on:

* End-to-end testing
* Acceptance testing
* Coverage hardening
* Regression validation
* CI verification
* Release readiness assessment

### 8. Learning and Documentation Separation

Personal learning activities, tutorials, notes, and educational references SHALL NOT be tracked as project artifacts.

Project documentation records:

* Decisions
* Specifications
* Verification plans
* Implementation rationale

Personal learning remains outside the project documentation hierarchy.

## Consequences

### Positive

* Strong alignment with Feature-Based Architecture
* Clear ownership of tests
* Reduced documentation duplication
* Better architectural traceability
* Scalable verification strategy
* Easier refactoring and maintenance

### Negative

* Developers must maintain verification plans within Capability and Feature documents.
* Colocated tests increase the number of files within implementation directories.

### Accepted Tradeoff

The project prioritizes architectural traceability and documentation clarity over minimizing file count.

Verification intent is documented at the Capability and Feature levels while executable verification remains close to the code being tested.

### Verification Plans

Capability and Feature documents may define a
"Verification Plan" section.

Verification Plans describe:

- Unit test scope
- Integration test scope
- Acceptance test scope
- Explicit non-goals

Verification Plans are the authoritative source of testing intent.

Test suites themselves are considered executable documentation and do not require dedicated Markdown documentation.