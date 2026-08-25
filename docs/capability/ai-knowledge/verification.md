# AI Knowledge & Discovery Verification

# 1. Purpose

Define the verification strategy for the AI Knowledge & Discovery capability.

This document specifies how compliance with `docs/capability/ai-knowledge/specifications.md` is evaluated.

Verification activities must validate canonical mapping correctness, boundary enforcement, representation validity, discovery reachability, consistency/regeneration behavior, consumer integration, failure behavior, and security requirements.

---

# 2. Verification Scope

The following specification sections must be verified:

- Canonical Knowledge Model (Spec §5)
- Public/Private Data Boundary (Spec §6)
- Representation Contracts (Spec §7)
- Discovery Rules (Spec §8)
- Generation & Consistency Rules (Spec §9)
- Consumer Contract (Spec §10)
- Versioning & Invalidation (Spec §11)
- Failure Modes (Spec §12)
- Security Considerations (Spec §13)

---

# 3. Canonical Knowledge & Boundary Verification

The following behaviors must be verified through automated unit tests.

## Entity Mapping

Verify, for each canonical entity type (Person, Project, Article, Technology, Book):

- Canonical fields map correctly to each representation format
- No field is introduced into a representation that does not exist on the canonical source
- Entities outside the five listed types produce no representation output

## Public/Private Boundary Enforcement

Verify:

- Draft entities are excluded from every representation format
- Archived entities are excluded from every representation format
- An entity with an undeterminable public/private status is excluded (fail-closed behavior)
- Administrative/internal fields never appear in any generated representation

---

# 4. Representation Verification

The following representation formats must be verified individually.

## HTML Metadata

Verify:

- Title, description, canonical URL, and Open Graph tags on public pages match canonical entity data
- No divergence between rendered page content and canonical source

## JSON-LD

Verify:

- `Person` schema validates against schema.org and reflects canonical owner data
- `BlogPosting` schema validates against schema.org for every publicly published Article
- `TechArticle` schema validates for Articles classified as technical/engineering content
- JSON-LD is present in server-rendered HTML (not injected client-side only)

## `llms.txt`

Verify:

- File is reachable at `/llms.txt` without authentication
- File is valid Markdown following the required structure (title, summary, required sections per Spec §7.3)
- All currently publicly published entities across the five canonical types are represented
- No Draft/Archived entity appears in the file

---

# 5. Discovery Verification

Verify:

- `robots.txt` does not block known AI-agent user agents from public surfaces covered by this capability
- Canonical URLs are identical across HTML, JSON-LD, and `llms.txt` for the same entity
- Structured data is retrievable without requiring JavaScript execution

---

# 6. Consistency & Regeneration Verification

Verify:

- Editing a canonical entity (e.g. updating an Article) results in all its representations reflecting the change without manual intervention
- Publishing a new entity results in its appearance across all applicable representation formats
- Unpublishing or archiving an entity results in its removal from all representation formats
- No representation format can be manually edited to diverge from canonical source (verified by code/process review, not runtime test)

---

# 7. Consumer Contract Verification

Verify, for each consuming feature (Public Content Platform, Interactive Stack Mapping, Analytical Bookshelf, Person/owner profile):

- The feature expresses its discoverability requirement as an outcome ("must become discoverable through the AI Knowledge & Discovery capability"), not as a direct call to generate a specific representation format
- No consuming feature bypasses this capability to expose entity data directly to AI/search surfaces

---

# 8. Failure Verification

The following failure scenarios must be verified.

## Generation Failure

Verify a generation failure for one entity does not block the underlying publish/update action, and does not affect other entities' representations.

## Stale Representation

Verify a representation reflects a canonical change within the expected regeneration window; a representation that does not catch up is flagged as a defect.

## Boundary Violation

Verify any detected instance of Draft/Archived/private data in a public representation is treated and escalated as a security-severity defect, not a routine content bug.

---

# 9. Security Verification

Verify the capability does not intentionally expose, through any representation format:

- Draft or Archived content
- Administrative, authentication, or internal system data
- Any field not already exposed through the entity's own public-facing page or API
- Secrets, tokens, or internal identifiers placed in canonical fields

---

# 10. Explicit Non-Goals

The following items are outside verification scope for this version:

- LLM Runtime & Integration behavior (out of capability scope entirely)
- `llm.json` correctness (representation not implemented in this version)
- Entity relationship / knowledge graph correctness (not implemented in this version)
- Third-party AI/search engine citation, ranking, or retrieval outcomes — these are external consumer behaviors and are not verifiable properties of this capability

---

# 11. Verification Evidence

Verification evidence may include:

- Unit test results (entity mapping, boundary enforcement)
- Schema validation results (JSON-LD, `llms.txt` structure)
- Integration test results (consumer feature contract compliance)
- Manual/CI crawl checks (`robots.txt`, `llms.txt` reachability, server-rendered structured data)
- CI pipeline results
