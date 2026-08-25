# Production Readiness & Architecture Compliance

## AI Knowledge & Discovery

## Purpose

Verify that the AI Knowledge & Discovery capability is production-ready and complies with the approved specification.

## Scope

Canonical knowledge modeling, representation generation, discovery reachability, consumer integration, security boundary enforcement, and operational readiness.

---

# Foundation

* [ ] Capability specification documented and approved
* [ ] Canonical entity model agreed (Person, Project, Article, Technology, Book)
* [ ] Representation contracts approved (HTML metadata, JSON-LD, `llms.txt`)
* [ ] Public/Private Data Boundary invariant reconfirmed against project-level Core Invariants

---

# Capability Implementation

## Canonical Knowledge Model

* [ ] Person entity mapping implemented
* [ ] Project entity mapping implemented
* [ ] Article entity mapping implemented
* [ ] Technology entity mapping implemented
* [ ] Book entity mapping implemented

## Representation Generation

* [ ] HTML metadata sourced from canonical data on all applicable public pages
* [ ] JSON-LD (`Person`) implemented and schema-valid
* [ ] JSON-LD (`BlogPosting`) implemented and schema-valid
* [ ] JSON-LD (`TechArticle`) implemented and schema-valid
* [ ] `llms.txt` generated and served at site root

## Discovery

* [ ] `robots.txt` does not block known AI-agent user agents from public surfaces
* [ ] JSON-LD present in server-rendered HTML (no JS-only injection)
* [ ] Canonical URLs consistent across all representation formats

---

# Capability Adoption

## Feature Integration

* [ ] Public Content Platform (Article/Project) integrated via Consumer Contract
* [ ] Interactive Stack Mapping (Technology) integrated via Consumer Contract
* [ ] Analytical Bookshelf (Book) integrated via Consumer Contract
* [ ] Person/owner profile integrated via Consumer Contract

## Contract Enforcement

* [ ] No feature manually authors `llms.txt`/JSON-LD content independent of canonical data
* [ ] No feature bypasses the AI Knowledge & Discovery capability to expose entities directly

---

# Security Hygiene

* [ ] Draft entities never appear in any representation
* [ ] Archived entities never appear in any representation
* [ ] No administrative/internal fields present in any representation
* [ ] Generation fails closed when public/private status cannot be determined

---

# Architecture Compliance

* [ ] Canonical Knowledge & Representation principle (Portfolio V2 Spec §5.6) upheld — no representation is treated as an independent authority
* [ ] LLM Runtime & Integration boundary respected — no runtime model dependency introduced anywhere in the implementation
* [ ] `llm.json` remains excluded per current specification scope

---

# Operational Readiness

## Reliability

* [ ] Generation failure for one entity does not affect other entities' representations
* [ ] Generation failure does not block the underlying publish/update action
* [ ] Stale representations self-correct on next regeneration cycle

## Consistency

* [ ] Editing a canonical entity updates all its representations without manual steps
* [ ] Unpublishing/archiving an entity removes it from all representations

---

# Verification Readiness

* [ ] Canonical/boundary verification completed
* [ ] Representation format verification completed
* [ ] Discovery verification completed
* [ ] Consistency/regeneration verification completed
* [ ] Consumer contract verification completed
* [ ] Failure verification completed
* [ ] Security verification completed

---

# Documentation

* [ ] Specification completed
* [ ] Verification document completed
* [ ] Readiness document completed
* [ ] Related project-spec cross-references verified (Portfolio V2 Spec §4, §5.6, §9)

---

# Production Readiness

* [ ] Capability requirements satisfied
* [ ] Verification activities completed
* [ ] Documentation completed
* [ ] No known blocking issues remain
* [ ] Ready for production use
