# Portfolio V2 Specification (`portfolio-v2-spec.md`)

**Version:** 3.0

**Status:** Approved

**Last Updated:** 2026-08-08

**Owner:** Amir Karimi

---

# 1. Purpose & Vision

Portfolio V2 transforms the personal portfolio from a static project showcase into a dynamic, transparent engineering platform and personal brand hub (**Amir Karimi**).

The platform is designed to convey:

* Deep technical expertise and enterprise-level problem-solving
* Architecture-first thinking and documented engineering decision-making
* Continuous professional growth and active research

Portfolio V2 is built for both **human evaluators** (Engineering Managers, Recruiters) and **AI/Search systems** (LLMs, GEO/AIO crawlers). The portfolio is treated as a production software product with rigorous standards around documentation, security, testing, maintainability, and performance.

---

# 2. System Model

Portfolio V2 consists of three distinct conceptual surfaces:

1. **Public Platform:** A public, read-only platform providing access to technical articles, project breakdowns, stack mappings, bookshelf analyses, and engineering experiences. No authentication is required for public access.
2. **Owner Administration:** Protected administrative functionality reserved exclusively for the site owner to manage and publish content. It does not introduce a multi-user CMS.
3. **Engineering Documentation System:** The structured documentation base (Specifications, ADRs, Guidelines, Verification artifacts, and Runbooks) that governs and reflects the implemented software product.

---

# 3. System Boundaries

## 3.1 Public Access

Portfolio V2 is fundamentally a public read-only platform. Visitors can access published content without logging in.

## 3.2 Administrative Access

Administrative capabilities are restricted strictly to the site owner (Amir Karimi). There are no secondary administrators, contributors, or editors.

## 3.3 Core Invariants

The system explicitly maintains the following boundary constraints:

* No public registration, login, or user profiles
* No multi-user role management or contributor workflows
* Content creation, editing, and deletion operations are strictly protected
* Unpublished (Draft/Archived) content is never exposed via public APIs or routes

---

# 4. Core Capabilities

Portfolio V2 is composed of major capabilities delivered across planned versions. Detailed behavior, domain models, APIs, and functional requirements live within each capability's dedicated specification document.

* **Private Publishing Infrastructure:** Owner authentication, protected admin workflows, secure write APIs, rate limiting, and token security.
* **Public Content Platform:** Public article/series rendering, owner authoring workflows, draft autosave/recovery, lifecycle transitions, and SEO metadata.
* **Interactive Stack Mapping:** Interactive technology index linking tools to mental models, enterprise challenges, code references, and RFCs.
* **Analytical Bookshelf:** Curated reading library documenting architectural shifts, practical project applications, and learning outcomes.
* **AI & Search Optimization (AIO/GEO):** Structured semantic data layers (`llms.txt`, `llm.json`, JSON-LD schemas) optimized for AI agent parsing.
* **Engineering Experience:** Interactive architecture visualizers, React Flow diagrams, system walkthroughs, and global article search with tag filtering.

---

# 5. Architecture Principles

1. **Explicit Boundaries:** Clear separation between public presentation, owner administration, domain features, and shared infrastructure.
2. **Specification-First Development:** Features and capabilities must have explicit specifications defining required behavior prior to production release.
3. **ADRs for Architectural Decisions:** Platform-wide architectural choices, trade-offs, and design rationale are recorded in Architecture Decision Records (`docs/adr/`) rather than duplicated in feature specs.
4. **Shared Rules in Shared Docs:** Cross-cutting guidelines (rendering, SEO, media, security) live in `docs/guidelines/` or `docs/conventions.md`.
5. **Separation of Documentation Concerns:**
* **Specification:** *What* the system/feature must do.
* **Readiness:** *Are* prerequisites available to begin?
* **Verification:** *How* do we prove the contract is satisfied?
* **ADR:** *Why* was an architectural decision made?
* **Runbook:** *How* to execute operational workflows.

---

# 6. Delivery & Version Plan

Portfolio V2 is delivered incrementally across clear version milestones:

| Version  | Milestone Name             | Included Capabilities / Scope                                                                                                        | Status      |
|----------|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------|-------------|
| **V2.0** | **Production Foundation**  | Private Publishing Infrastructure, Public Content Platform (Blog & Series), Stack Mapping, Analytical Bookshelf, AI/SEO foundations. | In Progress |
| **V2.1** | **Engineering Experience** | Interactive Engineering Playground, Architecture Explorer, CI/CD walkthroughs, Global Article Search.                                | Planned     |
| **V2.2** | **Future Enhancements**    | Deferred research items: Telegram bot messaging, telemetry analytics, social cross-posting.                                          | Deferred    |

---

# 7. Non-Goals & Deferred Work

The following capabilities are **permanently excluded** from Portfolio V2:

* Public user registration or authentication
* User accounts, profiles, or user dashboards
* Multi-user CMS, role-based access control (RBAC), or contributor roles
* Community/social networking features (public comments, likes, user bookmarks)

The following items are **deferred for future research** (tentatively V2.2) and are not part of the core platform contract:

* Anonymous messaging via Telegram bot
* Advanced audience telemetry
* Automated social media cross-posting

---

# 8. Project-Level Acceptance Criteria

Portfolio V2.0 is considered complete when the following project-level conditions are verified:

## Goal 1 — AI & Search Discoverability

* [ ] `llms.txt` and `llm.json` successfully tested and validated with external LLMs via blind prompting.
* [ ] Structured JSON-LD schemas (Person, BlogPosting, TechArticle) validate without errors.
* [ ] SEO and metadata audit passes agreed quality thresholds.

## Goal 2 — Proof of Engineering & Brand Alignment

* [ ] Interactive Stack Mapping and Analytical Bookshelf contain fully populated, verified entries.
* [ ] Amir Karimi is consistently represented across branding, metadata, public content, and documentation.

## Goal 3 — Production-Grade Standards

* [ ] All public pages and APIs are accessible read-only without authentication.
* [ ] Protected administrative routes and write APIs reject unauthenticated or unauthorized requests.
* [ ] Rate limiting, token expiration, and security headers pass verification audits.
* [ ] Production documentation (`docs/`) is complete, current, and reflects actual implementation.

---

# 9. Related Documents

This specification serves as the entry point to the Portfolio V2 documentation system.


| Category                         | Location Pattern                                              | Purpose                                                                                                       |
|----------------------------------|---------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| Architecture Decisions           | `docs/adr/ADR-XXXX-*.md`                                      | Individually numbered ADRs recording architectural decisions affecting the project                            |
| Feature Specs                    | `docs/feature/<feature-name>/specification.md`                | One folder per delivery-roadmap feature; owns that feature's own scope, requirements, and API — see Section 5 |
| Capability Specs                 | `docs/capability/<capability-name>/specifications.md`         | One folder per cross-cutting capability (e.g. logging), same readiness/verification/usage split as features   |
| Guidelines                       | `docs/guidelines/*.md`                                        | Shared cross-cutting conventions (rendering, media, SEO, etc.) referenced by multiple feature specs           |
| Reference Notes                  | `docs/tech-stack.md`, `docs/environment.md`                   | Standalone taxonomy entries outside the feature/capability structure                                          |


*Note: Pending capability specifications (Stack Mapping, Analytical Bookshelf, AIO Suite, Engineering Playground) will be added to this table as their respective specification files are created.*

---

# 10. Changelog

| Version | Date       | Summary of Changes                                                                                                                                                                                                                                                                                                                             |
|---------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **1.0** | —          | Initial specification: feature list without explicit execution ordering or architectural boundaries.                                                                                                                                                                                                                                           |
| **2.0** | 2026-07-23 | Introduced delivery roadmap phases, access model, non-goals, and definition of done criteria.                                                                                                                                                                                                                                                  |
| **3.0** | 2026-08-08 | Restructured into a Project-Level System Charter: removed duplicated feature scopes, unified Access Model & Non-Goals, consolidated Version/Roadmap planning, established explicit System Model & Architecture Principles, and aligned with the 3-file feature documentation standard (`specification.md`, `readiness.md`, `verification.md`). |