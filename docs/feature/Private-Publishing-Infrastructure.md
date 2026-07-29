# Private Publishing Infrastructure

**Status:** In Progress

**Owner:** Amir Karimi

---

# 1. Goal

Establish a secure authentication and authorization foundation for all future private publishing capabilities.

This feature introduces a private admin access layer that enables authenticated administrative operations without exposing publishing functionality to public users. It provides the infrastructure required for future content management features while keeping authentication concerns isolated from blog authoring logic.

---

# 2. Scope

## Included

* Password-based administrator authentication
* JWT-based authentication model
* Refresh token rotation
* Secure session validation
* Login and logout APIs
* Authentication state management
* Protected admin access infrastructure
* Login dialog and authentication entry point
* Add Article entry point visibility for authenticated administrators
* Login rate limiting
* Authentication-related security hardening

## Excluded

* Article creation
* Article editing
* Draft / Publish workflow
* Rich text editor
* Blog management features
* Article storage
* Content moderation
* Publishing workflow

---

# 3. Related Documents

### Specification

* portfolio-v2-spec.md

### ADRs

* ADR-0007 — Hybrid JWT Authentication for Admin Access
* ADR-0008 — Separate Responsibilities for Server and UI State
* ADR-0009 — Feature-Based Project Structure
* ADR-0010 — Application Service Boundaries

### Engineering Runbook

* runbook-v2/v2.0/02-features/02-private-publishing-infrastructure.md
* runbook-v2/v2.0/01-pre-v2-refactors/

### Conventions

* conventions.md
* environment.md

---

# 4. Functional Requirements

The system shall provide a private authentication mechanism for administrators.

Authenticated administrators shall receive secure access and refresh tokens through HTTP-only cookies.

The system shall automatically validate existing sessions and transparently refresh tokens when appropriate.

Unauthenticated users shall never gain access to administrator-only functionality.

Administrative UI elements shall only become available after successful authentication.

Logout shall invalidate the active refresh token and terminate the authenticated session.

Authentication failures and validation errors shall return standardized API responses.

---

# 5. User Flow

```text
Visitor
   │
   ▼
Hidden Login Shortcut
   │
   ▼
Login Dialog
   │
   ▼
Submit Password
   │
   ▼
Credentials Valid?
   │
 ┌─┴───────────────┐
 │                 │
No                Yes
 │                 │
 ▼                 ▼
Error         Issue JWT Tokens
                   │
                   ▼
          Session Validation
                   │
                   ▼
        Admin Features Available
                   │
                   ▼
           Logout / Session Expired
                   │
                   ▼
        Remove Authentication State
```

---

# 6. Technical Design

Authentication responsibilities are isolated inside the `admin` feature.

Business rules are implemented through an application service layer while data persistence remains inside repositories.

Authentication state is separated between server-side session validation and client-side UI state.

JWT lifecycle management follows the project's authentication ADR and remains independent of future publishing features.

The feature exposes reusable authentication infrastructure that future admin capabilities can consume without introducing authentication logic into feature implementations.

---

# 7. Routes

## Public

* /blog
* POST /api/admin/login
* POST /api/admin/logout
* GET /api/admin/session

## Protected

* Future administrator write endpoints
* Future article management endpoints

---

# 8. API

| Method | Endpoint           | Description                         | Auth Required |
|--------|--------------------|-------------------------------------|---------------|
| POST   | /api/admin/login   | Authenticate administrator          | No            |
| POST   | /api/admin/logout  | End authenticated session           | Yes           |
| GET    | /api/admin/session | Validate or refresh current session | No            |

---

# 9. State Management

## Server State

* Authentication session
* JWT validation
* Refresh token lifecycle
* Session expiration
* Authentication APIs

## Client State

* Login dialog visibility
* Authentication status
* Session query cache
* Authentication loading states
* Authentication error states

---

# 10. Security Considerations

## Authentication

* Password verification using bcrypt
* JWT access tokens
* Refresh token rotation
* HTTP-only cookies
* Secure cookie configuration
* Automatic session validation

## Authorization

* Administrative functionality is only exposed to authenticated users.
* Future write operations are expected to reuse the same authentication infrastructure.

## Validation

* Request validation using Zod
* Standardized API error handling
* Invalid credential handling
* Session verification before privileged operations

## Potential Risks

* Brute-force login attempts
* Expired or revoked refresh tokens
* Invalid environment configuration
* Cookie misconfiguration across environments
* Future protected routes bypassing authentication middleware

---

# 11. Planned File Structure

```text
src/
├── app/
│   └── api/
│       └── admin/
├── features/
│   └── admin/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── repositories/
│       ├── schemas/
│       ├── services/
│       ├── stores/
│       └── utils/
└── shared/
    ├── lib/
    ├── providers/
    └── constants/
```

---

# 12. Dependencies

## Requires

* MongoDB
* JWT secrets
* Environment configuration
* React Query
* Zod
* bcrypt
* jose

## Blocked By

* Environment configuration
* Database connectivity

## Affects

* Future article management
* Future publishing workflow
* Protected API routes
* Administrative UI

---

# 13. Decision Log

Document important implementation decisions that are too small for an ADR.

| Date       | Decision                                                                                    |
|------------|---------------------------------------------------------------------------------------------|
| 2026-06-20 | Authentication infrastructure implemented independently from publishing features.           |
| 2026-06-21 | Add Article visibility depends on authentication state rather than a dedicated admin panel. |

---

# 14. Implementation Checklist

## Preparation

- [x] Finalize authentication architecture (Hybrid JWT model)
- [x] Define feature boundaries and application service architecture
- [x] Introduce feature-based project structure
- [x] Prepare environment configuration and required dependencies
- [x] Document implementation strategy and supporting ADRs

## Backend

- [x] Configure environment validation
- [x] Add MongoDB connection
- [x] Implement administrator login API
- [x] Implement session validation API
- [x] Implement logout API
- [x] Implement JWT access and refresh token lifecycle
- [x] Introduce admin repository layer
- [x] Introduce admin application service layer
- [x] Standardize API error handling
- [x] Add request validation with Zod
- [x] Replace hardcoded configuration values
- [x] Add login rate limiting
- [x] Protect administrator routes with authentication middleware

## Frontend

- [x] Implement Login dialog
- [x] Add login dialog state management
- [x] Connect login form to authentication APIs
- [x] Improve authentication error handling and UX
- [x] Introduce React Query authentication state
- [x] Replace store-based authentication with service architecture
- [x] Show administrator UI only after authentication
- [x] Add logout support
- [x] Update Add Article visibility based on authentication status

## Integration

- [x] Connect frontend authentication flow to backend APIs
- [x] Enable automatic session validation
- [x] Enable refresh token rotation
- [x] Verify authenticated administrator workflow
- [x] Update documentation and engineering runbooks

## Cleanup

- [ ] Remove temporary debugging logs
- [ ] Remove commented-out code
- [ ] Remove unused imports
- [ ] Remove unused utilities
- [ ] Remove obsolete TODO comments
- [ ] Verify consistent naming across files
- [ ] Verify API responses are standardized
- [ ] Verify environment configuration
- [ ] Verify route protection coverage
- [ ] Run lint and resolve warnings
- [ ] Run TypeScript type checking
- [ ] Review code for dead code and redundant logic
- [ ] Review documentation for consistency
- [ ] Final implementation review before merge

---

# 15. Testing

## Manual Testing

- [ ] Verify successful administrator login
- [ ] Verify invalid password displays appropriate error
- [ ] Verify authenticated session persists after page refresh
- [ ] Verify automatic session validation on application load
- [ ] Verify automatic access token refresh
- [ ] Verify logout clears authentication state
- [ ] Verify administrator UI is hidden before authentication
- [ ] Verify administrator UI becomes visible after login
- [ ] Verify protected administrator APIs require authentication
- [ ] Verify login dialog opens using the hidden shortcut
- [ ] Verify rate limiting is applied after repeated failed login attempts

## Edge Cases

- [ ] Empty password submission
- [ ] Invalid request payload
- [ ] Expired access token with valid refresh token
- [ ] Expired refresh token
- [ ] Invalid or tampered JWT
- [ ] Missing authentication cookies
- [ ] Direct access to protected endpoints without authentication
- [ ] Refresh token reuse after logout
- [ ] Missing or invalid environment configuration
- [ ] Database unavailable during authentication

## Regression Testing

- [ ] Verify public blog remains accessible without authentication
- [ ] Verify main website remains unaffected
- [ ] Verify existing navigation behavior
- [ ] Verify Login dialog behavior across page navigation
- [ ] Verify authentication state survives route changes
- [ ] Verify logout removes administrator access everywhere
- [ ] Verify middleware does not affect public routes
- [ ] Verify API response format remains standardized
- [ ] Verify TypeScript builds successfully
- [ ] Verify ESLint passes without new warnings

---

# 16. Future Improvements

* Middleware-based authorization for all write routes
* Persistent distributed rate limiting
* Role-based authorization
* Multi-admin support
* Audit logging
* Session management dashboard
* Configurable session lifetime

---

# 17. Notes

This feature intentionally focuses on authentication infrastructure only.

Publishing, article authoring, editing, and content management are documented and implemented as separate features that build upon this authentication layer.