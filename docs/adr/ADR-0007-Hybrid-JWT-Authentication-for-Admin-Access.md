# ADR-0007: Adopt Hybrid JWT Authentication for Admin Access

- **Status:** Accepted
- **Date:** 2026-07-25

---

## Context

The project specification (`portfolio-v2-spec.md`) explicitly requires JWT-based authentication with token expiration for administrator access.

The current implementation uses a traditional stateful session stored in MongoDB (`adminSessions`), which differs from the specification.

This decision blocks several architectural tasks:

- Admin security testing
- Authentication middleware design
- Rate limiting strategy
- Final Definition of Done validation

Although the application currently has a single administrator, the authentication mechanism should efficiently support authenticated requests without requiring a database lookup for every request. A database-backed session introduces unnecessary overhead for routine authentication checks and tightly couples authentication to persistent storage.

The chosen solution should also remain compatible with modern Next.js deployment models, where relying on server memory for session state is not always practical.

## Decision

The project will migrate from stateful server-side sessions to a hybrid JWT authentication model.

Authentication will use two tokens:

### Access Token

- JWT
  Short-lived (configured by application policy).
- Stored in an `HttpOnly`, `Secure`, `SameSite=Strict` cookie
- Cryptographically verified on every request
- Not persisted in the database

### Refresh Token

- Long-lived
- Stored securely in MongoDB
- Rotated after each successful refresh
- Invalidated on logout

Authorization remains middleware-based using the authenticated administrator identity and role.

Access tokens will not be blacklisted. Immediate session revocation is achieved by invalidating the corresponding refresh token, while short-lived access tokens naturally expire.

## Consequences

### Positive

- Aligns the implementation with the project specification.
- Supports token expiration required by the Definition of Done.
- Eliminates database lookups during routine authentication checks.
- Reduces unnecessary database load for authenticated endpoints.
- Simplifies authentication middleware by relying on cryptographic token verification.
- Provides secure logout through refresh token invalidation.
- Remains compatible with modern Next.js deployment environments.

### Negative

- Requires migration from the existing session implementation.
- Introduces refresh token rotation logic.
- Slightly increases implementation complexity compared to stateful sessions.

### Trade-offs

Compared with server-side sessions stored in MongoDB, the hybrid JWT approach introduces additional implementation complexity in exchange for lower authentication overhead, better alignment with the project specification, and reduced dependency on persistent storage during request authentication.

## Alternatives Considered

### Option 1 — Keep Stateful Sessions

**Rejected**

Advantages

- Simple implementation
- Straightforward logout and session invalidation

Disadvantages

- Does not comply with the project specification
- Requires a database lookup for every authenticated request
- Depends on persistent session storage

### Option 2 — Pure Stateless JWT

**Rejected**

Advantages

- Simplest runtime architecture
- No server-side token storage

Disadvantages

- Difficult logout and token revocation
- Poor session lifecycle management

### Option 3 — Hybrid JWT (Selected)

Uses short-lived JWT access tokens together with persistent refresh tokens.

Chosen because it provides a balance between security, implementation complexity, operational performance, and compliance with the project specification while avoiding unnecessary authentication-related database reads.