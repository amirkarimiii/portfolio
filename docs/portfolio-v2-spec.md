# Portfolio V2 Specification (`portfolio-v2-spec.md`)

**Version:** 2.0

**Last Updated:** 2026-07-23

**Owner:** Amir Karimi

## 1. Vision

Transform the personal portfolio from a static project showcase into a **dynamic, highly transparent engineering platform and personal brand hub (Amir Karimi)**. The goal is to clearly convey deep technical expertise, enterprise-level problem-solving abilities, architecture-first thinking, and continuous professional growth to both human evaluators (Engineering Managers, Recruiters) and AI agents (LLMs, GEO/AIO crawlers).

Portfolio V2 is designed as a **public, read-only engineering platform** rather than a community product or SaaS application.

---

## 2. Motivation

* **Low Signal-to-Noise Ratio in V1:** The previous version (`a-karimkhani.ir`) lacked sufficient engineering depth, architectural reasoning, and documented technical decisions.
* **AI & Search Engine Invisibility:** Modern AI systems and search engines could not accurately understand the portfolio due to insufficient semantic content and structured technical documentation.
* **Lack of Continuous Learning Signals:** There was no structured way to demonstrate long-term learning, research, and architectural evolution.
* **Personal Rebranding:** Establish the identity of **Amir Karimi** for international visibility and remote engineering opportunities.

---

## 3. Goals

1. **Maximized AI & Search Discoverability (AIO/GEO)**

   Enable AI systems and search engines to understand engineering capabilities through structured metadata (`JSON-LD`, `llms.txt`, semantic content).

2. **Proof of Engineering & Thought Process**

   Demonstrate architectural thinking through technical write-ups, stack mapping, engineering playgrounds, and analytical reading notes.

3. **Production-Grade Engineering Standards**

   Treat the portfolio as a real software product with documentation, ADRs, security, maintainability, testing, and high performance.

4. **Personal Brand Alignment**

   Build a consistent technical identity around **Amir Karimi** across every public touchpoint.

---

# 4. Access Model

Portfolio V2 is a **public read-only platform**.

Visitors can freely browse projects, articles, and technical content without authentication.

The platform intentionally **does not include**:

* User registration
* User accounts
* Public authentication
* User profiles
* Multi-user CMS
* Role management

Administrative functionality exists **only** for the site owner (Amir Karimi) to publish and manage technical articles.

There is no concept of editors, contributors, or multiple administrators.

---

# 5. Delivery Roadmap

The implementation order is intentional. Each phase depends on the successful completion of the previous one.

## Phase 1 — Private Publishing Infrastructure

This phase establishes the technical foundation required before introducing any public blogging functionality.

Features:

* Owner-only authentication flow
* Private Admin Panel
* Secure article management
* Draft / Publish workflow
* JWT authentication
* Protected write APIs
* Security hardening
* Rate limiting
* Token expiration
* Documentation for the publishing workflow

**Rationale**

The blog cannot exist before a secure publishing workflow exists. Therefore, the Admin Panel is implemented first.

---

## Phase 2 — Public Content Platform (Core V2)

After the publishing infrastructure is complete, public-facing features are implemented.

Features:

* Portfolio pages
* Project showcase
* Owner-only Blog
* Interactive Stack Mapping
* Analytical Bookshelf
* AI Optimization Suite
* SEO foundations
* Performance optimization
* Production documentation

This phase represents the **first production release (Portfolio V2.0).**

---

## Phase 3 — Engineering Experience

After the portfolio is production-ready, engineering-focused interactive experiences are added.

Features:

* Interactive Engineering Playground
* Architecture explorer
* CI/CD walkthroughs
* Interactive system diagrams
* Global article search
* Full-text search with tag filtering

This phase represents **Portfolio V2.1**.

---

## Phase 4 — Future Enhancements

These features are intentionally postponed.

They are currently planned for **Portfolio V2.2** (tentatively scheduled to begin around **mid-November**).

Possible features include:

* Anonymous messaging through a Telegram bot
* Advanced audience analytics and telemetry
* Automated social media cross-posting

These items are explicitly **out of scope** for Portfolio V2.0 and V2.1.

---

# 6. Major Features

## Owner-only Blog Publishing

A private publishing workflow for Amir Karimi to create, edit, publish, and manage technical articles.

* Articles are publicly readable.
* Content creation is restricted to the site owner.
* No public author accounts exist.
* No contributor workflow exists.
* Multi-language readiness starts with English.

---

## Interactive Stack Mapping

A dedicated stack section where selecting a technology opens a drawer containing:

* Mental model
* Enterprise challenges solved
* Curated code snippets
* Repository references
* Books
* Articles
* RFC references

---

## Analytical Bookshelf

A curated reading library documenting:

* Why each book was read
* What architectural thinking changed
* Which projects benefited
* Related blog articles

---

## AI Optimization Suite (AIO/GEO)

Support for:

* `llms.txt`
* `llm.json`
* JSON-LD schemas

  * Person
  * BlogPosting
  * TechArticle
  * Book

---

## Interactive Engineering Playground

An architecture exploration experience allowing visitors to navigate engineering systems visually.

Includes:

* React Flow diagrams
* Architecture walkthroughs
* Infrastructure explanations
* CI/CD pipeline visualization
* Testing strategy walkthroughs

---

# 7. Definition of Done (Acceptance Criteria)

Portfolio V2 is considered complete only when the following conditions are satisfied.

---

## Goal 1 — AI & Search Discoverability

* [ ] `llms.txt` successfully tested with at least one external LLM using blind prompting.
* [ ] JSON-LD schemas validate successfully.
* [ ] SEO audit passes the agreed quality threshold.

---

## Goal 2 — Proof of Engineering

* [ ] Every technology drawer contains complete content.
* [ ] Engineering Playground contains at least one complete architecture.
* [ ] Analytical Bookshelf contains multiple documented learning analyses.
* [ ] Full-text article search returns relevant results.
* [ ] Search supports tag-based filtering.

---

## Goal 3 — Production-Grade Standards

* [ ] Security headers audit passes the agreed threshold.
* [ ] Performance audit passes the agreed threshold.
* [ ] `docs/` documentation is complete and current.
* [ ] Owner-only authentication flow is security-tested.
* [ ] Login rate limiting is verified.
* [ ] Token expiration is verified.
* [ ] No unauthenticated write access exists.
* [ ] No public Sign-Up flow exists.
* [ ] No public Login flow exists.
* [ ] All public pages are accessible without authentication.
* [ ] Admin routes are accessible only to the site owner.

---

## Goal 4 — Brand Alignment

* [ ] Amir Karimi is consistently represented across branding, documentation, metadata, and public content.

---

# 8. Non-Goals

The following capabilities are intentionally excluded from Portfolio V2:

* Public user registration
* Public authentication
* User accounts
* User dashboards
* Multi-user CMS
* Multiple administrators or contributors
* Role-based access control
* Community or social networking features

The following capabilities are **deferred for future research** rather than permanently rejected:

* Comments
* Likes
* Bookmarks
* Other forms of visitor interaction

Their inclusion will be evaluated in a future version once suitable technical and moderation approaches have been researched.

---

# 9. Version Planning

| Version  | Scope                                                                                                                   |
|----------|-------------------------------------------------------------------------------------------------------------------------|
| **V2.0** | Private publishing infrastructure + public portfolio + owner-only blog + AI/SEO foundations + Stack Mapping + Bookshelf |
| **V2.1** | Interactive Engineering Playground, architecture exploration, and global article search<br/>                            |
| **V2.2** | Optional enhancements (Telegram messaging, telemetry, automation, and results of future interaction-feature research)   |

---

# Appendix A — Change Log

## Specification Revision 2

This revision refines the original specification by improving project scope, implementation clarity, and long-term maintainability.

### Major Improvements

#### Delivery Roadmap introduced

The specification now explicitly defines the implementation sequence instead of presenting all features at the same priority level.

Implementation order is now:

1. Private Publishing Infrastructure
2. Public Content Platform (Portfolio V2.0)
3. Engineering Experience (Portfolio V2.1)
4. Future Enhancements (Portfolio V2.2)

This makes project planning, milestone tracking, and incremental delivery significantly clearer.

---

#### Explicit Access Model

The access model is now clearly documented.

The portfolio is intentionally designed as a public read-only platform.

Administrative capabilities exist exclusively for Amir Karimi to publish technical content.

This removes any ambiguity regarding public authentication, user accounts, or multi-user administration.

---

#### Better Feature Scope

Blogging is now described as an owner-only publishing workflow instead of a generic blogging platform, accurately reflecting the intended architecture.

---

#### Future Work Separated

Features planned for Portfolio V2.2 are explicitly separated from the core scope.

This prevents optional ideas from being interpreted as requirements for the initial release.

---

#### Non-Goals Clarified

Capabilities intentionally excluded from Portfolio V2 are now documented.

Interaction features (such as comments or likes) are marked as future research topics rather than permanently rejected functionality.

---

#### Stronger Acceptance Criteria

Production-grade requirements now include verification of:

- Owner-only administration
- No public authentication
- No public registration
- Protected write operations
- Secure administrative access

This makes the Definition of Done more objective and testable.

---

Overall, this revision transforms the specification from a feature list into a phased engineering roadmap with explicit scope boundaries, implementation priorities, and architectural intent.