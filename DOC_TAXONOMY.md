# Software Documentation Taxonomy

**Core Philosophy:** Documentation-Driven Development (DDD) & Single Source of Truth (SSOT)

**Owner:** Amir Karimi

---

## 1. Architectural Principles

1. **Technology-Agnostic:** Concepts and patterns are defined without coupling to specific frameworks (e.g., NestJS, Next.js, React Native, Electron, Go, Rust).
2. **Clear Governance Chain:** Every document must have an explicit upstream reference. The governance chain flows strictly downstream from specification to execution.
3. **Strict Separation of Concerns:** Eliminates logical leakage between domain logic, internal capabilities, and external environmental infrastructure.
4. **Machine & AI-Readable:** Structured systematically to serve as context for LLM/AI tooling, code generators, and CI/CD validation pipelines.
5. **Course-Changing Decisions Require ADRs:** ADRs record architectural or engineering decisions that materially change the course of the system. An ADR is warranted when a decision has substantial expected change scope, introduces a clearly observable structural impact, or is materially difficult to reverse. Routine corrections, omissions resolved through specification, obvious technical/scientific corrections, and ordinary implementation fixes do not require ADRs.
6. **Non-Trivial Debugging Experience Is Captured, Not Lost:** Any debugging effort that consumed significant time or surfaced a non-obvious insight is recorded as durable, append-only knowledge rather than left to fade from memory or buried in chat/PR history.

---

## 2. Document Hierarchy Flow & Diagram

The documentation architecture follows a deterministic flow from governance and domain specification down to operational verification, execution, and repository observability:

```text
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

> **Note:** `debugging-log.md` (Layer 1) is a cross-cutting knowledge artifact. It is not produced *by* this flow but *from* friction encountered anywhere along it (implementation, verification, infrastructure, etc.), and it feeds back into AI/developer context alongside `git-observatory.md`.

---

## 3. The 5-Layer Documentation Taxonomy

### Layer 1: Top-Level & Root Governance

Global documents defining system-wide architectural rules, project conventions, and immutable engineering decisions.

* **`architecture.md`** / **`project-spec.md`**
* **Type:** Singleton Rulebook
* **Role:** High-level system architecture, domain canvas, layer boundaries, and core communication patterns.
* **Governs:** Whole project and all downstream spec documents.

* **`conventions.md`**
* **Type:** Singleton Rulebook
* **Role:** Coding standards, folder structures, Git branching strategies, and commit naming conventions.
* **Governs:** Codebase practices and document formatting rules.

* **`adr/*.md`** **(Architecture Decision Records)**
* **Type:** Template-based (Immutable Records)
* **Role:** Historical log of course-changing architectural or engineering decisions, including context, rejected alternatives, rationale, and consequences (trade-offs).
* **Qualification:** An ADR is appropriate when a decision has substantial expected change scope, a clearly observable structural impact, or significant reversal cost. Routine implementation corrections, specification omissions, and obvious technical/scientific corrections are not ADRs.
* **Governs:** Implementation constraints and architectural evolution.

* **`refactor-backlog.md`**
* **Type:** Living Backlog (Transient)
* **Role:** Tracking technical debt and deferred refactoring tasks until they are absorbed into issues or execution runbooks.
* **Governs:** Technical debt resolution path.

* **`debugging-log.md`**
* **Type:** Living Knowledge Log (Append-Only, Singleton)
* **Role:** Durable record of non-trivial debugging experiences — the root causes, rejected hypotheses, and discovery methods behind hard-to-find bugs — captured so the reasoning is not lost once the bug is fixed.
* **Qualification:** An entry is warranted when a debugging effort either (a) consumed more than ~2 hours of continuous or non-continuous effort, or (b) surfaced an important, non-obvious insight — particularly one *not* caused by a trivial oversight, typo, or clear lapse of attention. Debugging that resolves quickly through an obvious cause does not qualify.
* **Structure:** The file has a single shared header (`Author`, `Project`) followed by an ordered, append-only sequence of debug entries. Each entry is a `##`-level heading (a short description of the bug) followed by a metadata block and a fixed set of subsections:
  * **Metadata block:** `Date`, `Branch path` (full branch lineage, using `→` for stacked/nested branches), `Tags` (freeform `#hashtags` for searchability), `Time spent` (duration + whether the effort was individual or team-based).
  * **Symptoms:** Observable behavior that indicated something was wrong.
  * **Rejected Hypotheses:** Each candidate cause considered, paired with the specific check that ruled it out. This is the core value of the log — it prevents re-investigating the same dead ends in the future.
  * **Root Cause:** The actual underlying mechanism.
  * **Discovery Method:** The investigative technique that led to the root cause (e.g., binary search along a data path, bisecting commits, instrumentation), described generally enough to be reusable in future debugging.
  * **Solution:** The concrete fix applied.
  * **Files Involved:** Paths touched by the fix.
  * **Lesson Learned:** The generalized, reusable takeaway — framed as a rule of thumb applicable beyond this one occurrence, not just a recap of the fix.
* **Governs:** Nothing downstream in the specification chain (it is not a rulebook); instead, it *informs* — future debugging heuristics, onboarding context, and AI/assistant context when investigating similar symptoms.
* **Relationship to ADRs:** A debugging log entry is not an ADR. It records a diagnostic/engineering *investigation* and its resulting lesson, not a course-changing *decision*. If a debugging investigation reveals that an architectural decision must change as a consequence, that change is recorded separately as an ADR, which may then cite the corresponding debugging-log entry as supporting context.

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

All Layer 2 and Layer 3 specification units follow a common documentation family pattern:

```text
<unit>/
├── specification.md
├── verification.md
└── readiness.md
```

The three artifacts have distinct responsibilities:

* **`specification.md`** defines what the unit is required to do and the constraints it must satisfy.
* **`verification.md`** defines how those requirements are verified.
* **`readiness.md`** defines the conditions required for the unit to be considered ready for integration, merge, or release.

This family pattern applies consistently to Features, Capabilities, and Infrastructure. Additional artifacts may be introduced only when the unit has a distinct responsibility that cannot be expressed by these core artifacts.

* **`capability-spec.md`**
* **Type:** Template
* **Role:** Specification of shared internal modules, interfaces, lifecycle methods, and behavior requested by domain feature specs.
* **Governs:** Construction and consumption of shared functional modules.

* **`infrastructure-spec.md`**
* **Type:** Template
* **Role:** Environmental configurations, deployment pipelines, build setups, provisioning, and cloud infrastructure requirements.
* **Governs:** Deployment targets, runtime environment, and DevOps automation.

* **`usage-guide.md`**
* **Type:** Optional Usage Guide
* **Role:** Step-by-step developer guidance for configuring, integrating, or consuming a documented unit when such guidance is required.
* **Governs:** Developer Experience (DX) and integration patterns.

> Usage guidance is an optional artifact of the documentation family, not a structural property exclusive to Capabilities.

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

| Document Type                   | Derived From (Upstream)                             | Governs (Downstream)                        | Document Nature             |
|---------------------------------|-----------------------------------------------------|---------------------------------------------|-----------------------------|
| **Project Spec / Architecture** | Product Requirements / PRD                          | Overall Architecture & ADRs                 | Rulebook (Singleton)        |
| **ADR**                         | Architecture Trade-offs / Course-Changing Decisions | Implementation Strategy                     | Decision Log (Immutable)    |
| **Debugging Log**               | Real-World Debugging Effort / Execution Friction    | Future Debugging Heuristics & AI Context    | Knowledge Log (Append-Only) |
| **Feature Spec**                | Project Spec / Architecture                         | Capabilities, Infrastructure & Verification | Specification (Template)    |
| **Capability Spec**             | Feature Spec / Architecture                         | Usage Guides & Verification                 | Specification (Template)    |
| **Infrastructure Spec**         | Feature Spec / System Requirements                  | CI/CD Pipelines & Cloud Deployment          | Specification (Template)    |
| **Verification**                | Feature / Capability / Infrastructure Specs         | Test Suites & Assertion Logic               | Rulebook (Driven)           |
| **Readiness**                   | Verification & Feature Specs                        | Merge Gate & PR Approvals                   | Living Checklist            |
| **Usage Guide**                 | Specification / Unit Context                        | Developer Integration Workflows             | Guide (Optional)            |
| **Runbook & SOPs**              | Readiness & Tracking                                | Daily Developer Workflows                   | Executable Guide            |
| **Git Observatory**             | Git Repository State                                | AI Context & Branch Alignment               | Living Monitor              |

### Documentation Family Rule

Features, Capabilities, and Infrastructure are governed as members of the same documentation family. Each unit has the same mandatory core lifecycle:

```text
Specification
      ↓
Verification
      ↓
Readiness
      ↓
Execution
```

The distinction between these units is **what they specify**, not the structure of their documentation lifecycle:

* **Feature:** product/domain behavior.
* **Capability:** reusable internal software capability.
* **Infrastructure:** environmental/runtime/deployment capability.

Additional documents such as usage guides are introduced only when their responsibility is independently useful; they do not alter the core family structure.

### Knowledge-Log Family Rule

`debugging-log.md` and `refactor-backlog.md` both live in Layer 1 as project-wide, cross-cutting artifacts rather than per-unit documents — but they differ in nature:

* **`refactor-backlog.md`** is **transient**: items are removed once resolved (absorbed into issues/runbooks).
* **`debugging-log.md`** is **permanent and append-only**: entries are never removed or overwritten; the file only grows, since its value is the accumulated diagnostic history itself.