# Portfolio V2 Specification (`portfolio-v2-spec.md`)

## 1. Vision
Transform the personal portfolio from a static project showcase into a **dynamic, highly transparent engineering platform and personal brand hub (Amir Karimi)**. The goal is to clearly convey deep technical expertise, enterprise-level problem-solving abilities, architecture-first mindsets, and ongoing professional growth to both human evaluators (Engineering Managers, Recruiters) and AI agents (LLMs, GEO/AIO crawlers).

## 2. Motivation
* **Low Signal-to-Noise Ratio in V1:** The previous version (`a-karimkhani.ir`) lacked structural depth regarding engineering trade-offs, thought processes, and enterprise readiness.
* **AI & Search Engine Invisibility:** Modern hiring workflows and AI tools failed to extract a comprehensive understanding of technical depth due to a lack of structured semantic text and documented decision-making.
* **Lack of Dynamic Engagement & Continuous Learning Signals:** Absence of an integrated technical blog and reading/research analytics.
* **Personal Rebranding:** Establishing the identity of **Amir Karimi** for optimal global reach and ease of communication in international remote roles.

## 3. Goals
1. **Maximized AI & Search Discoverability (AIO/GEO):** Provide machine-readable structured data (including JSON-LD schemas and an `/llms.txt` file) to ensure LLMs accurately interpret engineering capabilities.
2. **Proof of Engineering & Thought Process:** Showcase actual mental models via a tech-stack mapping system, deep-dive book analytical reviews, an interactive architecture playground, and architectural write-ups.
3. **Production-Grade Engineering Standards:** Treat this portfolio as a serious software product with full technical documentation (`docs/`), ADRs, strict security, SEO best practices, and high performance.
4. **Personal Brand Alignment:** Establish the identity of **Amir Karimi** across the domain, visual presentation, and technical footprint.

## 4. Major Features
* **Blog Engine:** A modern blogging platform featuring an article editor, multi-language readiness (starting with English), and a direct CTA on the Hero component (`Check out my blog`).
* **Interactive Stack Mapping:** A dedicated stack section where clicking a tech stack opens a drawer (shadcn/ui) presenting:
  * Mental model & enterprise-level challenges solved.
  * Curated code snippets and repository references.
  * Associated books, articles, and RFCs.
* **Interactive Engineering Playground:** An interactive system-architecture explorer (built with React Flow or similar) allowing visitors to visually navigate project architectures node-by-node, paired with step-by-step walkthroughs of CI/CD pipelines and testing strategies for each project.
* **Analytical Bookshelf:** A curated reading list documenting *why* a book was read, its direct architectural impact on real projects, and cross-references to portfolio blog posts.
* **AI Optimization Suite (AIO/GEO):** Explicit `/llms.txt` and `/llm.json` support alongside advanced structured schemas (`Person`, `BlogPosting`, `TechArticle`, `Book`).
* **Admin Article Authoring:** A secure, JWT-based admin access flow triggered via shortcut for rapid article publication (detailed in `docs/features/admin-panel.md`).

---
## 5. Future Iterations (Backlog)
* Direct anonymous user messaging system via custom Telegram bot.
* Advanced audience tracking and telemetry tools.
* Automated social media cross-posting pipeline via n8n.

---
## 6. Definition of Done (Acceptance Criteria)

Portfolio V2 is considered complete only when the following, mapped to each Goal, pass. Numeric thresholds (scores, percentages, timeframes) will be finalized during the execution phase — this list defines *what* must be verified, not yet the exact bar.

**Goal 1 — AI & Search Discoverability**
- [ ] `/llms.txt` tested with at least one external LLM (not Claude) using a blind query (no self-introduction) to confirm technical depth and engineering identity are correctly extracted — mirroring the original test that motivated this project.
- [ ] JSON-LD schemas (`Person`, `BlogPosting`, `TechArticle`, `Book`) validated with Google's Rich Results Test, with no errors.
- [ ] SEO audit (e.g., Lighthouse SEO) passes against an agreed threshold.

**Goal 2 — Proof of Engineering & Thought Process**
- [ ] Every listed tech stack (Next.js, Nest.js, shadcn, etc.) has a fully populated drawer across all three tabs (Mental Model, Code Snippets, Readings) — no empty or placeholder tabs.
- [ ] The Engineering Playground has at least one project (Cryptology) with a complete architecture diagram and a step-by-step CI/CD walkthrough.
- [ ] The Analytical Bookshelf includes multiple books, each with a documented "why I read this / what it changed" rationale — not just a title list.

**Goal 3 — Production-Grade Standards**
- [ ] Security headers audit (e.g., Mozilla Observatory / securityheaders.com) passes against an agreed grade.
- [ ] Performance audit (e.g., Lighthouse Performance, mobile and desktop) passes against an agreed threshold.
- [ ] `docs/` directory is complete and current (`conventions.md`, `git-observatory.md`, all ADRs).
- [ ] The JWT-based admin panel is security-tested: login rate limiting, token expiration, and no unauthenticated access to write routes.

**Goal 4 — Brand Alignment**
- [ ] The identity of **Amir Karimi** is consistently presented across the domain, visual presentation, and technical footprint.