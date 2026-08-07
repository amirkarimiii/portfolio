# Software Documentation Taxonomy

**Version:** 1.0.0

**Core Philosophy:** Documentation-Driven Development (DDD) & Single Source of Truth (SSOT)

**Owner:** Amir Karimi

---

## 1. Architectural Principles

1. **Technology-Agnostic:** Concepts and patterns are defined without coupling to specific frameworks (e.g., NestJS, Next.js, React Native, Electron, Go, Rust). </br></br>
2. **Clear Governance Chain:** Every document must have an explicit upstream reference. The governance chain flows strictly downstream from specification to execution.  </br></br>
3. **Strict Separation of Concerns:** Eliminates logical leakage between domain logic, internal capabilities, and external environmental infrastructure. </br></br>
4. **Machine & AI-Readable:** Structured systematically to serve as context for LLM/AI tooling, code generators, and CI/CD validation pipelines. </br></br>

---

## 2. Document Hierarchy Flow & Diagram

The documentation architecture follows a deterministic flow from governance and domain specification down to operational verification, execution, and repository observability:

```
[ Top-Level Root / Governance ]
               │
               ▼
[ Capabilities & Infrastructure Specs ] ───► [ Domain & Feature Specs ]
               │                                   │
               └───────────────┬───────────────────┘
                               │
                               ▼
                  [ Verification & Readiness ]
                               │
                               ▼
                 [ Execution & Runbooks Layer ]
                               │
                               ▼
                 [ Git Observatory & Tracking ]
```

---

## 3. The 5-Layer Documentation Taxonomy

### Layer 1: Top-Level & Root Governance

Global documents defining system-wide architectural rules, project conventions, and immutable engineering decisions.

* **`architecture.md` / `project-spec.md`**
* **Type:** Singleton Rulebook
* **Role:** High-level system architecture, domain canvas, layer boundaries, and core communication patterns.
* **Governs:** Whole project and all downstream spec documents.


* **`conventions.md`**
* **Type:** Singleton Rulebook
* **Role:** Coding standards, folder structures, Git branching strategies, and commit naming conventions.
* **Governs:** Codebase practices and document formatting rules.


* **`adr/*.md` (Architecture Decision Records)**
* **Type:** Template-based (Immutable Records)
* **Role:** Historical log of key architectural decisions, including context, rejected alternatives, rationale, and consequences (trade-offs).
* **Governs:** Implementation constraints and architectural evolution.


* **`refactor-backlog.md`**
* **Type:** Living Backlog (Transient)
* **Role:** Tracking technical debt and deferred refactoring tasks until they are absorbed into issues or execution runbooks.
* **Governs:** Technical debt resolution path.

---

### Layer 2: Domain & Feature Specs

Documents translating product requirements into technical specifications and domain logic. Feature specs drive the need for shared capabilities and underlying infrastructure.

* **`feature-spec.md`**
* **Type:** Standard Template
* **Role:** Detailed specification covering the 9 core mandatory sections: Goal, User Stories, Domain Rules, Edge Cases, API/State Contracts, Data Structures, Error States, UX/Performance Considerations, and Test Requirements.
* **Governs:** Feature implementation, test scenarios, and readiness gates.


* **`interface-contract.md`**
* **Type:** Contract Template
* **Role:** Structural data contracts (Schemas, DTOs, Event payloads) for client-server or service-to-service communication.
* **Governs:** Network protocols, serialization, and type definitions.

---

### Layer 3: Capabilities & Infrastructure Specs

Clear boundary separation between internal software building blocks and environmental execution boundaries:

> **Capabilities:** Internal functional mechanisms directly imported/consumed by application code (e.g., Auth Engine, Caching Layer, Event Bus, State Management, Local Storage).
> 
> **Infrastructure:** Environmental setups in which the application runs or deploys (e.g., CI/CD Pipelines, Docker Containers, Kubernetes Configs, Cloud Services, Monitoring Agents, Network Routing).


* **`capability-spec.md`**
* **Type:** Template
* **Role:** Specification of shared internal modules, interfaces, lifecycle methods, and behavior requested by domain feature specs.
* **Governs:** Construction and consumption of shared functional modules.


* **`infrastructure-spec.md`**
* **Type:** Template
* **Role:** Environmental configurations, deployment pipelines, build setups, provisioning, and cloud infrastructure requirements.
* **Governs:** Deployment targets, runtime environment, and DevOps automation.


* **`usage-guide.md`**
* **Type:** Guidelines / SOP Template
* **Role:** Step-by-step developer guides on how to extract, configure, and consume a Capability within Feature specs.
* **Governs:** Developer Experience (DX) and integration patterns.

---

### Layer 4: Verification & Readiness

The quality gate bridging specifications (Domain, Capability, and Infrastructure) to execution.

* **`verification.md`**
* **Type:** Driven Rulebook
* **Role:** Test strategies (Unit, Integration, E2E, Infrastructure smoke tests), verification scenarios, and coverage criteria.
* **Derived From:** Derived directly from Layer 2 (Feature Specs) and Layer 3 (Capabilities & Infrastructure Specs).
* **Governs:** Test suites, test runners, and assertion logic.


* **`readiness.md`**
* **Type:** Living Checklist Gate
* **Role:** Pre-merge and pre-release checklist validating that verification criteria are met.
* **Governs:** Merge Gate (PR Approval) and Release Gate.

---

### Layer 5: Execution, Observability & SOPs

Operational documents guiding daily execution tasks, standard operating procedures, and repository state tracking.

* **`roadmap.md`**
* **Type:** High-Level Plan
* **Role:** Milestone vision, release scheduling, and project phase breakdowns.


* **`tracking.md`**
* **Type:** Status Tracker
* **Role:** Live tracking of task states, blockers, and dependencies per milestone.


* **`phase-runbook.md`**
* **Type:** Multi-Layer Execution Runbook
* **Role:** Step-by-step operational guide for implementing a specific feature, capability, or infrastructure setup.


* **`git-observatory.md`**
* **Type:** Living Tracking System
* **Role:** Monitoring branch status, structural changes, PR logs, and maintaining synchronized context for developers and AI assistants.

---

## 4. Governance & Derivation Matrix

| Document Type                   | Derived From (Upstream)            | Governs (Downstream)                        | Document Nature          |
|---------------------------------|------------------------------------|---------------------------------------------|--------------------------|
| **Project Spec / Architecture** | Product Requirements / PRD         | Overall Architecture & ADRs                 | Rulebook (Singleton)     |
| **ADR**                         | Architecture Trade-offs / Churns   | Implementation Strategy                     | Decision Log (Immutable) |
| **Feature Spec**                | Project Spec / Architecture        | Capabilities, Infrastructure & Verification | Specification (Template) |
| **Capability Spec**             | Feature Spec / Architecture        | Usage Guides & Verification                 | Specification (Template) |
| **Infrastructure Spec**         | Feature Spec / System Requirements | CI/CD Pipelines & Cloud Deployment          | Specification (Template) |
| **Verification**                | Feature / Capability / Infra Specs | Test Suites & Assertion Logic               | Rulebook (Driven)        |
| **Readiness**                   | Verification & Feature Specs       | Merge Gate & PR Approvals                   | Living Checklist         |
| **Runbook & SOPs**              | Readiness & Tracking               | Daily Developer Workflows                   | Executable Guide         |
| **Git Observatory**             | Git Repository State               | AI Context & Branch Alignment               | Living Monitor           |
