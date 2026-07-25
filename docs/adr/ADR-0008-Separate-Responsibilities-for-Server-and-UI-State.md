# ADR-0008 — Establish Separate Responsibilities for Server and UI State

**Status**

Accepted

**Date**

2026-07-25

## Context

The current implementation performs server requests directly inside Zustand stores (e.g. `adminAuthStore`).

As the application grows, additional authenticated resources such as articles, books, technologies, and other administrative data will be introduced. These resources represent server state with an external source of truth.

Using Zustand for both server state and UI state mixes responsibilities and requires manually implementing concerns such as loading states, caching, background refetching, error handling, retries, and cache invalidation.

The project requires a clear architectural boundary between client-owned state and server-owned state to ensure consistency and maintainability.

## Decision

The application will separate server state from client/UI state.

### Server State

Server state will be managed exclusively through **TanStack Query**.

This includes authenticated resources such as:

- Authentication session
- Articles
- Books
- Technology stack
- Future API-backed resources

Server state will be accessed through custom hooks backed by TanStack Query.

Examples:

- `useSession()`
- `useArticles()`
- `useBooks()`
- `useStack()`

Query functions should be implemented in a dedicated API/service layer.

### UI State

Zustand will be used exclusively for client-owned UI state.

Examples include:

- Dialog visibility
- Drawer state
- Active tabs
- Temporary filters
- Wizard progress
- Other transient UI interactions

## Architectural Rules

- Server state MUST NOT be stored or duplicated inside Zustand.
- Zustand stores MUST NOT perform HTTP requests.
- Components SHOULD access server data through TanStack Query hooks.
- API communication SHOULD be implemented through a dedicated service layer.

## Consequences

### Positive

- Establishes a clear separation of responsibilities.
- Eliminates duplicated implementations of loading, caching, retries, and error handling.
- Enables consistent cache invalidation and background synchronization.
- Reduces the likelihood of inconsistent application state.
- Simplifies future feature development by providing a predictable data access pattern.

### Negative

- Introduces an additional dependency.
- Requires migration of existing fetch logic from Zustand.
- Adds an initial learning curve for contributors unfamiliar with TanStack Query.

### Trade-offs

The application adopts two specialized libraries instead of a single state management solution. This slightly increases architectural complexity while providing a much clearer separation between server-managed data and client-owned UI state.

## Alternatives Considered

### Option 1 — Continue Using Zustand for Everything

**Rejected**

Advantages

- Fewer dependencies
- Simpler initial implementation

Disadvantages

- Mixes unrelated responsibilities.
- Requires manual handling of caching, synchronization, retries, and stale data.
- Becomes increasingly difficult to maintain as server resources grow.

### Option 2 — TanStack Query for Server State + Zustand for UI State

**Accepted**

Uses each library for the problem it is designed to solve.

Chosen because it creates a clear architectural boundary, reduces maintenance overhead, and provides a consistent pattern for future features.