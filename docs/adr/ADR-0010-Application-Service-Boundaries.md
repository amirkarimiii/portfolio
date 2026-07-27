# ADR-0010 — Establish Application Service Boundaries

- **Status:** Accepted
- **Date:** 2026-07-26

---

## Context

The application exposes its backend through Next.js Route Handlers.

As additional administrative capabilities are introduced (authentication, article management, publishing workflows, bookshelf management, and future write operations), business workflows will become increasingly complex.

Embedding business rules directly inside Route Handlers couples HTTP concerns with domain logic and persistence, making code difficult to test, maintain, and reuse.

A clear separation of responsibilities is required before implementing additional backend features.

## Decision

Business workflows will be implemented in feature-owned Application Services.

Each backend feature will follow the responsibility chain:

```

Route Handler
↓
Application Service
↓
Repository
↓
MongoDB

```

### Route Handlers

Responsible only for:

- Parsing requests
- Authentication context extraction
- Input validation
- Calling application services
- Mapping service results to HTTP responses

### Application Services

Responsible for:

- Business workflows
- Authorization rules
- Coordinating multiple repositories
- Token rotation
- Domain decisions
- Transaction orchestration

Application services MUST NOT contain HTTP-specific logic.

### Repositories

Responsible only for persistence.

Repositories may:

- Query MongoDB
- Insert documents
- Update documents
- Delete documents

Repositories MUST NOT contain business rules.

Application services own all business decisions.

## Project Organization

Application services and repositories belong to their owning feature.

Example:

```

features/

admin/

services/

repositories/

utils/

api/

blog/

services/

repositories/

```

No global `services/` directory will be introduced.

## Architectural Rules

- Route Handlers MUST remain thin.
- Business rules MUST be implemented in Application Services.
- Repositories MUST only access persistent storage.
- Services MAY coordinate multiple repositories.
- Services MUST NOT depend on HTTP request or response objects.
- Repositories MUST NOT contain business logic.

## Consequences

### Positive

- Separates HTTP concerns from business workflows.
- Improves unit testability of business logic.
- Keeps Route Handlers concise.
- Encourages feature ownership.
- Simplifies future backend development.

### Negative

- Introduces additional abstraction layers.
- Requires defining service and repository boundaries for new features.

### Trade-offs

The project accepts a small increase in structural complexity in exchange for clearer separation of responsibilities, improved maintainability, and reusable business workflows.

## Alternatives Considered

### Option 1 — Route Handlers Access MongoDB Directly

**Rejected**

Advantages

- Minimal implementation.
- Fewer files.

Disadvantages

- Business rules become coupled to HTTP.
- Difficult to test.
- Route handlers grow over time.

### Option 2 — Feature-Owned Application Services (Selected)

Business workflows are implemented in feature-local services, while persistence is isolated inside repositories.

Chosen because it provides clear ownership, thin Route Handlers, and reusable business logic without introducing unnecessary framework complexity.