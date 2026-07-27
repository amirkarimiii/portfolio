# Tech Stack

**Status:** Active

**Version:** 1.0

**Owner:** Amir Karimi

---

# 1. Philosophy

This document describes the technologies used throughout the project and the reasoning behind each selection.

Rather than pursuing the newest or most popular libraries, the project prioritizes technologies that are mature, maintainable, well-documented, and appropriate for the project's scope.

Every major technology has been selected to support long-term maintainability, predictable development workflows, and production-quality engineering practices.

---

# 2. Selection Criteria

Technologies are evaluated using the following criteria:

* Stability and long-term maintenance
* Community adoption
* Documentation quality
* TypeScript support
* Integration with the existing architecture
* Performance
* Learning curve
* Future maintainability

Preference is given to solutions that reduce architectural complexity rather than simply minimizing code.

---

# 3. High-Level Stack Overview

| Area                   | Technology              |
|------------------------|-------------------------|
| Framework              | Next.js 16 (App Router) |
| UI                     | React 19                |
| Language               | TypeScript              |
| Styling                | Tailwind CSS v4         |
| UI Components          | Radix UI                |
| Icons                  | Lucide React            |
| Client State           | Zustand                 |
| Server State           | TanStack Query          |
| Validation             | Zod                     |
| Environment Validation | @t3-oss/env-nextjs      |
| Authentication         | JWT + jose              |
| Password Hashing       | bcryptjs                |
| Database               | MongoDB                 |
| Identifier Generation  | UUID                    |
| Theme Management       | next-themes             |

```
                  Tech Stack

        ┌─────────────────────────────┐
        │        Presentation         │
        │ React • Next.js • Radix UI  │
        └─────────────────────────────┘
                     │
        ┌─────────────────────────────┐
        │      Styling & UX           │
        │ Tailwind • CVA • clsx       │
        └─────────────────────────────┘
                     │
        ┌─────────────────────────────┐
        │      State Management       │
        │ Zustand • TanStack Query    │
        └─────────────────────────────┘
                     │
        ┌─────────────────────────────┐
        │ Security & Validation       │
        │ jose • bcryptjs • Zod       │
        └─────────────────────────────┘
                     │
        ┌─────────────────────────────┐
        │      Infrastructure         │
        │ MongoDB • Env Validation    │
        └─────────────────────────────┘
```

---

# 4. Frontend

## Next.js

Why

* App Router
* Server Components support
* Route Handlers
* Production-ready architecture
* Excellent TypeScript integration

---

## React

Why

* Component-based architecture
* Strong ecosystem
* Modern concurrent rendering
* Excellent compatibility with Next.js

---

## TypeScript

Why

* Strong type safety
* Better refactoring support
* Improved maintainability
* Reduced runtime errors

---

# 5. Styling & UI

## Tailwind CSS

Used for utility-first styling.

Reasons:

* Consistent design language
* Small amount of custom CSS
* Excellent developer experience
* Easy maintenance

---

## Radix UI

Used as the accessibility foundation for reusable UI components.

Reasons:

* Accessible by default
* Headless architecture
* Easy customization
* Excellent React integration

---

## Lucide

Used for the project's icon system.

Reasons:

* Lightweight
* Tree-shakable
* Consistent icon design

---

# 6. State Management

The project intentionally separates client state from server state.

## Zustand

Responsible for:

* UI state
* Drawer state
* Modal state
* Theme-related local state
* Other client-only interactions

---

## TanStack Query

Responsible for:

* Server state
* Data fetching
* Request caching
* Background refetching
* Request lifecycle management

This separation follows the project's architectural guidelines and prevents unnecessary coupling between local UI state and remote application state.

---

# 7. Backend & Security

## MongoDB

Primary database for application data.

Reasons:

* Flexible document model
* Excellent Node.js support
* Good fit for the project's content structure

---

## Authentication

Authentication is based on JWT using the **jose** library.

Passwords are hashed using **bcryptjs** before storage.

Implementation details are documented separately in the Authentication ADR.

---

## UUID

Used for generating globally unique identifiers where sequential IDs are not appropriate.

---

# 8. Validation

## Zod

Used for runtime validation.

Responsibilities include:

* Request validation
* Configuration validation
* Schema definition
* Type inference

---

## Environment Validation

Environment variables are validated using:

* @t3-oss/env-nextjs
* Zod

The application fails fast when required configuration is missing or invalid.

### MongoDB Connection

When using MongoDB Atlas, the standard seed-list connection string is preferred over SRV connections in environments where Node.js DNS resolution may produce unreliable results.

---

# 9. Project Architecture

The project follows several architectural principles documented separately.

These include:

* Feature-based project structure
* Documentation-driven development
* Specification-first development
* Server/UI state separation
* Application service boundaries

Architecture decisions are intentionally documented in ADRs instead of being duplicated in this document.

---

# 10. Development Tooling

## ESLint

Used to enforce consistent coding standards.

---

## TypeScript Strict Mode

Strict mode is enabled throughout the project to improve correctness and reduce runtime defects.

---

## Path Aliases

Common aliases are used to improve readability and reduce deep relative imports.

Examples:

* `@/`
* `@/features`
* `@/shared`

---

# 11. Future Evolution

The technology stack is intentionally conservative.

New libraries are introduced only when they provide a clear architectural or maintainability benefit.

Avoid replacing stable technologies solely because newer alternatives become available.

Major technology changes should be documented through an ADR before adoption.

---

# Related Documents

* Portfolio Specification
* Architecture Decision Records (ADR)
* Engineering Runbook
* Conventions