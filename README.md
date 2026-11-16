# Amirhosein Karimkhani — Engineering Portfolio

**Product-Oriented Full-Stack Engineer | TypeScript · React · Next.js · NestJS**

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-0A7EA4)](https://portfolio-eta-six-12.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?logo=github)](https://github.com/amirkarimiii/portfolio)

I build software products across the stack — from understanding requirements and shaping technical specifications to designing APIs, implementing user interfaces, and improving engineering workflows.

This repository serves two purposes:

1. **A software project:** the codebase behind my personal portfolio and blog.
2. **An engineering case study:** a practical record of how I approach software design, documentation, technical decisions, and development execution.

The goal is not just to show what I can build, but also to make the engineering reasoning and working practices behind it visible.

---

## What This Repository Demonstrates

### 1. Full-Stack Product Development

I work across frontend and backend boundaries, with a focus on maintainable architecture and clear interfaces.

My primary engineering stack includes:

- **Frontend:** React, Next.js, TypeScript
- **Backend:** Node.js, NestJS, Spring Boot
- **Data:** PostgreSQL, MongoDB, Redis
- **UI & Forms:** Tailwind CSS, Material UI, React Hook Form, Zod
- **State & Data Fetching:** Zustand, TanStack Query
- **Testing:** Vitest, Playwright, Cypress
- **Tooling:** Git, Docker, Bun

The technologies listed above represent my broader engineering experience and the tools used across my projects; they are not all necessarily dependencies of this repository.

### 2. Documentation-Driven Development

One of the main engineering practices documented here is a structured approach to **Documentation-Driven Development (DDD)**.

In this context, DDD means Documentation-Driven Development — not Domain-Driven Design.

The central idea is that documentation should be part of the engineering process, not an artifact written after implementation.

Requirements are translated into structured specifications. Those specifications guide implementation, verification, readiness checks, and execution.

The documentation system is designed around a Single Source of Truth (SSOT) principle: each document has a defined responsibility and an explicit relationship with upstream and downstream documents.

See: [DOC_TAXONOMY.md](./DOC_TAXONOMY.md)

### 3. A Structured Specification Lifecycle

The core lifecycle for features, capabilities, and infrastructure is:

```text
Specification
      |
      v
Verification
      |
      v
Readiness
      |
      v
Execution
```

Each stage answers a different question:

| Stage | Purpose |
|---|---|
| Specification | What must be built, and under which constraints? |
| Verification | How do we prove that the requirements are satisfied? |
| Readiness | What must be true before integration or release? |
| Execution | How is the work carried out in a structured way? |

This separation helps keep requirements, implementation decisions, quality checks, and execution responsibilities explicit.

### 4. Requirements Refinement

A recurring part of my engineering work has been translating evolving product requirements into actionable technical specifications.

Requirements were communicated through an intermediary who primarily relayed information rather than making product decisions. The engineering team analyzed those requirements, developed initial specifications, and refined them through continuous feedback cycles.

This process helped turn incomplete or ambiguous requests into clearer implementation scope and technical direction.

The specification was treated as an evolving engineering artifact rather than a one-time handoff.

### 5. Engineering Governance and Traceability

The documentation taxonomy defines five connected layers:

| Layer | Responsibility |
|---|---|
| Root Governance | Project-wide architecture, conventions, ADRs, and engineering rules |
| Domain & Feature Specs | Product behavior, requirements, interfaces, and feature contracts |
| Capabilities & Infrastructure | Shared internal capabilities and runtime/environment specifications |
| Verification & Readiness | Test strategies, verification criteria, and merge/release gates |
| Execution & Observability | Roadmaps, tracking, runbooks, and repository-state documentation |

Additional practices include:

- **Architecture Decision Records (ADRs):** preserving significant technical decisions, alternatives, and trade-offs.
- **Debugging Logs:** retaining non-trivial debugging investigations and reusable lessons.
- **Known Deviations:** documenting intentional scope cuts, deferred work, and accepted trade-offs.
- **Execution Runbooks:** connecting specifications to practical implementation steps.
- **Git Observatory:** a manually maintained record of repository structure, branch lineage, and development context.

These practices are intended to make engineering decisions easier to understand, review, and continue over time.

---

## Engineering Principles

The approach represented in this repository is guided by a few principles:

- **Explicit over implicit:** requirements, ownership, constraints, and decisions should be visible.
- **Traceability:** implementation should be connected to the specifications and decisions that justify it.
- **Verification before confidence:** a completed implementation is not automatically a verified implementation.
- **Intentional scope:** deferred work and known limitations should be distinguishable from forgotten work.
- **Separation of concerns:** product behavior, reusable capabilities, infrastructure, and execution processes should have clear boundaries.
- **Durable engineering knowledge:** important decisions and difficult debugging experiences should remain useful beyond the immediate task.
- **AI-readable context:** structured documentation can provide more reliable context for AI-assisted development and review.

---

## Technology Stack of This Repository

The current application is built with:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- MongoDB
- Zustand
- TanStack Query
- React Hook Form
- Zod
- Vitest

Additional libraries support UI components, rich-text editing, validation, and application functionality.

The project is actively evolving. The repository should be considered a work in progress rather than a claim that every planned feature is complete or production-ready.

---

## Running Locally

### Prerequisites

- Node.js
- Bun
- Access to any external services configured through environment variables

### Installation

```bash
git clone https://github.com/amirkarimiii/portfolio.git
cd portfolio
bun install
```

### Environment Variables

Review the example environment file:

```bash
cp .env.example .env.local
```

Configure the required values for your local environment before running the application.

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

```bash
bun run dev
bun run build
bun run start
bun run lint
bun run test
bun run test:watch
```

---

## Repository Structure

```text
.
├── docs/
├── public/
├── src/
├── .env.example
├── DOC_TAXONOMY.md
├── package.json
├── bun.lock
└── README.md
```

- `src/` — application source code
- `public/` — static assets
- `docs/` — project documentation
- `DOC_TAXONOMY.md` — documentation architecture and governance rules
- `.env.example` — example environment configuration

---

## About Me

I am a product-oriented Full-Stack Engineer with 5+ years of experience building web applications using TypeScript, React, Next.js, Node.js, NestJS, Spring Boot, and relational databases.

Beyond implementation, I am interested in the systems and practices that make software development more predictable: requirement clarification, technical specifications, architecture decisions, verification, and delivery workflows.

I have also incorporated AI-assisted development tools into my daily workflow, while keeping code review, debugging, and validation as essential engineering responsibilities.

**I am particularly interested in building products where technical ownership, product thinking, and reliable execution matter.**

- **Portfolio:** https://portfolio-eta-six-12.vercel.app/
- **GitHub:** https://github.com/amirkarimiii
- **Repository:** https://github.com/amirkarimiii/portfolio

---

*This repository is an evolving engineering portfolio. Its code, documentation, and development practices may change as the project progresses.*