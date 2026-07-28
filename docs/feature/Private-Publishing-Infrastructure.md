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
| YYYY-MM-DD | Authentication infrastructure implemented independently from publishing features.           |
| YYYY-MM-DD | Add Article visibility depends on authentication state rather than a dedicated admin panel. |

---

# 14. Implementation Checklist

## Preparation

* [ ]

## Backend

* [ ]

## Frontend

* [ ]

## Integration

* [ ]

## Cleanup

* [ ]

---

# 15. Testing

## Manual Testing

* [ ]

## Edge Cases

* [ ]

## Regression Testing

* [ ]

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