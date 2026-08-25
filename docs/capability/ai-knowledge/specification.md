# AI Knowledge & Discovery Capability Specifications

**Version:** 1.0  
**Last Updated:** 2026-08-25  
**Owner:** Amir Karimi

---

## 1. Purpose

Provide a centralized, canonical-data-driven capability for exposing public project and domain knowledge (owner identity, projects, articles, technologies, bookshelf) through machine-readable and semantically structured representations, so that AI/search consumers can discover, parse, and accurately represent this information without relying on ad-hoc or independently maintained copies of the same data.

This capability establishes a single knowledge contract across the application: representation formats consume from one canonical source rather than being authored independently, ensuring consistency between what is shown to humans and what is exposed to AI/search systems.

---

## 2. Scope

### Included

* A canonical knowledge model for public project/domain entities
* Generation of machine-readable representations from that canonical model (`llms.txt`, JSON-LD)
* Discovery surfaces required for AI/search consumers to locate public content
* Enforcement of the Public/Private Data Boundary (Draft/Archived content must never appear in any representation)
* Consistency rules ensuring representations do not diverge from the canonical source

### Excluded

* **LLM Runtime & Integration** — provider integrations, direct model execution, prompt execution infrastructure, runtime context management, embeddings, RAG pipelines, autonomous AI generation workflows, or AI assistant runtime behavior of any kind. This capability never calls, hosts, or depends on a language model at runtime.
* **`llm.json`** — deferred; not part of this version's required representation set. Its inclusion is revisited under Open Questions (Section 17) and may be reconsidered in a future revision of this specification.
* Traditional/classic SEO mechanics not specific to AI-facing representation (`sitemap.xml`, `robots.txt` entries for classic crawlers, meta tags for classic search engines) — these remain governed by existing SEO guidelines, not by this capability, except where a representation format (e.g. JSON-LD) is genuinely shared between both concerns.
* Content authoring, editing, or publishing workflows — this capability only consumes already-published canonical data; it does not produce or manage it.
* Entity relationship graphs, citation monitoring/blind-prompt testing, multilingual representations, and any other depth/automation work explicitly deferred to later versions (see Section 17).

---

## 3. Terminology

The terms **AIO** (AI Optimization / AI Overview Optimization) and **GEO** (Generative Engine Optimization) are industry terms, not formally standardized as of this writing, and are used inconsistently across sources — sometimes as umbrella terms, sometimes narrowly (e.g. AIO as Google AI Overviews specifically).

This specification does not adopt either term as the capability's name or as an internal concept. Where used elsewhere in project documentation, they refer to the general external industry context this capability operates in, not to an internal architectural boundary.

Internally, this specification distinguishes only between:

* **Canonical knowledge** — the single authoritative representation of a public entity's data within the system.
* **Representation** — a derived, format-specific output (HTML metadata, JSON-LD, `llms.txt`) generated from canonical knowledge for a specific consumer class (human browser, classic search crawler, AI agent).
* **Consumer** — any external actor (human, search engine, LLM/agent) that reads a representation. Consumers are read-only with respect to canonical knowledge; none of them can create or mutate it.

---

## 4. Related Documents

| Document                   | Project Path                                   | Purpose                                                                     |
|----------------------------|------------------------------------------------|-----------------------------------------------------------------------------|
| Portfolio V2 Specification | `docs/portfolio-v2-spec.md`                    | Defines the system-level scope boundary this capability operates within.    |
| AI Knowledge Verification  | `docs/capability/ai-knowledge/verification.md` | Defines how this specification's requirements are verified.                 |
| AI Knowledge Readiness     | `docs/capability/ai-knowledge/readiness.md`    | Defines pre-merge/pre-release readiness gates for this capability.          |
| SEO Guideline              | `docs/guidelines/seo-guideline.md`             | Governs classic SEO mechanics that sit outside this capability's scope.     |
| Project Conventions        | `docs/conventions.md`                          | Defines project-wide engineering conventions applicable to this capability. |

---

## 5. Canonical Knowledge Model

The capability operates over the following canonical entity types. These are the *only* entities in scope for V2.0; any entity not listed here has no representation contract under this specification.

| Entity             | Source Feature                          | Notes                                                                   |
|--------------------|-----------------------------------------|-------------------------------------------------------------------------|
| **Person** (owner) | Static/owner profile content            | Single instance: Amir Karimi. Includes headline, bio, expertise, links. |
| **Project**        | Public Content Platform                 | One entry per showcased project.                                        |
| **Article**        | Public Content Platform (Blog & Series) | Only entries in a publicly published lifecycle state (see Section 6).   |
| **Technology**     | Interactive Stack Mapping               | Technology/tool entries and their mapped mental models.                 |
| **Book**           | Analytical Bookshelf                    | Curated reading entries.                                                |

Each entity type has exactly one canonical source of truth within the system (owned by its respective feature). This capability does not introduce a new persistence layer or duplicate storage for these entities — it reads from the existing canonical source and produces representations from it.

Entity relationships (e.g. "Project X uses Technology Y") are **not** modeled or expressed by this capability in V2.0. Representations may reference related entities by URL/identifier where the underlying feature already exposes that relationship, but building a dedicated relationship/graph layer is out of scope (see Section 17).

---

## 6. Public/Private Data Boundary

This capability MUST NOT produce any representation containing:

* Content in a Draft or Archived lifecycle state
* Administrative, authentication, or internal system data
* Any field not already exposed through the corresponding entity's public-facing page or API

This is a hard invariant inherited from the project-level Core Invariants (Portfolio V2 Specification, Section 3.3) and applies uniformly to every representation format this capability produces, present or future.

A representation generation process MUST fail closed: if it cannot determine an entity's public/private status with certainty, it MUST exclude that entity rather than include it.

---

## 7. Representation Contracts

### 7.1 HTML Metadata

Existing public pages (About, Project pages, Article pages, Stack Mapping, Bookshelf) carry standard HTML metadata (title, description, canonical URL, Open Graph tags) sourced from the same canonical entity data. This capability does not introduce new page templates; it ensures the metadata already rendered on these pages is consistent with canonical knowledge.

### 7.2 JSON-LD

The following schema.org types are required, populated from canonical entity data:

* `Person` — for the owner profile
* `BlogPosting` — for each publicly published Article
* `TechArticle` — where an Article is technical/engineering-focused in nature (determined by the Article's existing classification, not a new field introduced by this capability)

JSON-LD blocks are embedded in the corresponding page's HTML output. Exact property-to-field mapping (e.g. which canonical field populates `author`, `dateModified`, etc.) is implementation detail owned by this capability and does not require project-spec-level documentation.

### 7.3 `llms.txt`

A single `llms.txt` file is published at the site root (`/llms.txt`), following the community convention (H1 title, one-line blockquote summary, H2-grouped Markdown link sections).

Required sections at minimum:

* Title and one-line summary
* About (link to Person/owner canonical page)
* Projects (links to publicly published Projects)
* Articles (link to the public article index)
* Engineering / Stack (link to Stack Mapping)
* Bookshelf (link to Analytical Bookshelf)
* Contact/Links

`llms.txt` is a discovery/navigation aid only. It MUST NOT be treated as a complete or authoritative export of canonical knowledge, and its absence or non-use by any given AI crawler does not constitute a defect in this capability (see Section 9 for the reasoning).

### 7.4 `llm.json`

Out of scope for this version. See Section 2 (Excluded) and Section 17 (Open Questions).

---

## 8. Discovery Rules

* `llms.txt` MUST be reachable at the domain root without authentication.
* Public pages carrying JSON-LD MUST be reachable without JavaScript execution being required to access the embedded structured data (i.e. JSON-LD is present in initial server-rendered HTML, not injected client-side only).
* `robots.txt` MUST NOT block known AI-agent user agents from the public surfaces covered by this capability. (It may continue to block administrative/protected routes, consistent with existing project invariants.)
* Canonical URLs for each entity type MUST be stable and MUST match the URL referenced in every representation format (HTML, JSON-LD, `llms.txt`) for that same entity.

---

## 9. Generation & Consistency Rules

Representations are strictly **derived**, never independently authored:

```text
                 Canonical Entity Data
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
   HTML Metadata       JSON-LD           llms.txt
```

* No representation format may be manually edited to contain information that diverges from its source entity's canonical data.
* Generation MAY happen at build time, at publish time, or on-demand at request time — the specific mechanism is an implementation choice left to the reference implementation, provided the consistency guarantee above holds.
* If canonical data changes (e.g. an Article is edited or unpublished), all affected representations MUST reflect that change without requiring manual regeneration steps by the owner.
* This capability MUST NOT act as a source of truth. If a representation and its canonical source ever disagree, the canonical source is correct by definition, and the representation is considered stale/defective.

---

## 10. Consumer Contract

Other features integrate with this capability through outcome-based statements, not implementation calls. A feature specification SHOULD express its requirement as:

> "When \[entity] becomes publicly published, it MUST become discoverable through the AI Knowledge & Discovery capability."

A feature specification MUST NOT prescribe *how* that discoverability is achieved (e.g. "generate a `llm.json` entry on publish") — that decision belongs exclusively to this specification and its reference implementation.

This capability, in turn, guarantees that any entity meeting the Public/Private Data Boundary criteria (Section 6) will be reflected in all applicable representation contracts (Section 7) without further action required from the calling feature.

---

## 11. Versioning & Invalidation

* Representation formats themselves are not currently versioned (no `llms.txt` schema version, no JSON-LD context versioning beyond schema.org's own). This is acceptable for V2.0 given the single-consumer-facing nature of the outputs; revisit if a consuming format requires explicit versioning in the future.
* Invalidation is content-driven: any create/update/publish/unpublish/archive action on a covered entity MUST trigger regeneration (or equivalent re-derivation) of every representation referencing that entity.
* There is no requirement for historical versions of representations to be retained.

---

## 12. Failure Modes

### Generation Failure

If representation generation fails for a given entity (e.g. malformed canonical data), the failure MUST NOT block the underlying publish/update action for that entity, and MUST NOT cause other entities' representations to fail. The affected entity's representation should either fall back to a last-known-good state or be omitted, never partially/incorrectly rendered.

### Stale Representation

A representation that has not yet caught up with a very recent canonical change is acceptable as a transient state. A representation that never catches up is a defect and should be caught by verification (see Section 4).

### Boundary Violation

Any detected instance of Draft/Archived or private data appearing in a public representation is treated as a security-severity defect, not a content bug, per Section 6.

---

## 13. Security Considerations

* Draft/Archived/administrative data must never be reachable through any representation produced by this capability (Section 6).
* No representation may expose data beyond what its source entity already exposes on its own public page — this capability is a re-formatter of already-public data, not a new data-exposure surface.
* `llms.txt` and JSON-LD content should be treated as public, cacheable, and crawlable by design; no secrets, tokens, or internal identifiers should ever be placed in canonical fields consumed by this capability.

---

## 14. Success Criteria

* [ ] `llms.txt` is served at the site root, valid Markdown, and lists all currently publicly published entities across Person/Project/Article/Technology/Book.
* [ ] JSON-LD (`Person`, `BlogPosting`, `TechArticle`) validates against schema.org and is present in server-rendered HTML for all applicable pages.
* [ ] No Draft or Archived entity ever appears in `llms.txt` or JSON-LD output, verified by an explicit test case per entity type.
* [ ] Updating a canonical entity (e.g. editing an Article) results in all its representations reflecting the change without manual intervention.
* [ ] `robots.txt` does not block known AI-agent user agents from public surfaces.

---

## 15. Reference Implementation Structure

```text
src/
└── capabilities/
    └── ai-knowledge/
        ├── entities/          # mappers from feature-owned canonical data to this capability's entity views
        ├── representations/
        │   ├── json-ld/
        │   └── llms-txt/
        ├── generators/        # build-time/publish-time generation logic
        └── validators/        # boundary + schema validation
```

---

## 16. Dependencies

### Requires

* Public Content Platform (Article/Project canonical data and lifecycle state)
* Interactive Stack Mapping (Technology canonical data)
* Analytical Bookshelf (Book canonical data)
* Person/owner static profile data

### Enables

* Future `llm.json` representation (if adopted)
* Future AI Knowledge Assistant / RAG-based features (would consume this capability's canonical model, per the project-level LLM Runtime exclusion boundary)
* Improved discoverability by AI/search consumers (external outcome, not a guaranteed or verifiable contract of this capability — see Section 9 of the project spec's prior discussion on this distinction)

---

## 17. Open Questions

The following are intentionally left open and do not block V2.0 delivery of the items already specified above:

* Whether `llm.json` should be adopted, and if so, its exact schema, versioning, and consumer justification.
* Whether AI Knowledge should eventually be treated as fully independent of classic SEO representation (currently: JSON-LD is treated as shared ground between the two; no other overlap exists).
* Whether entity relationships (e.g. Project → Technology) warrant a dedicated representation in a future version.
* Whether a monitoring/feedback mechanism (e.g. periodic blind-prompt testing against major AI engines) should be introduced, and if so, whether it belongs to this capability or to a separate observability effort.
* Whether a future `llm` (LLM Runtime) capability, if ever built, should consume this capability's canonical model directly or through a separate export contract.

---

## 18. Notes

This capability intentionally focuses on canonical knowledge representation and discovery only. It does not guarantee citation, ranking, or visibility outcomes on any third-party AI or search platform — those are external consumer behaviors outside this system's control. What this capability guarantees is that public knowledge is accurately, consistently, and machine-readably exposed.

LLM Runtime & Integration, `llm.json`, entity relationships, and citation monitoring are explicitly deferred and will be introduced — if ever — through future revisions of this specification or, where warranted, a separate capability.

---

## 19. Changelog

| Version | Date       | Changes                                                    |
|---------|------------|------------------------------------------------------------|
| 1.0     | 2026-08-25 | Initial AI Knowledge & Discovery capability specification. |