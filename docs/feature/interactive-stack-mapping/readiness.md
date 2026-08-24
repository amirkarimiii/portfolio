# Interactive Stack Mapping

## Production Readiness & Architecture Compliance

## Purpose

Verify that the Interactive Stack Mapping feature is production-ready and complies with the approved architecture.

## Scope

Backend, Frontend, Security, Integration, and Architecture Compliance for Category, Subcategory, and Stack Entry management and public exploration within the Interactive Stack Mapping feature.

---

# Foundation

* [ ] Feature architecture documented
* [ ] Feature boundaries documented
* [ ] Responsibilities isolated (Category / Subcategory / Stack Entry)
* [ ] Required ADRs approved and referenced (if any course-changing decisions were made)
* [ ] Environment requirements documented
* [ ] Public interfaces documented
* [ ] External dependencies documented (Public Content Platform, Private Publishing Infrastructure)

---

# Backend

## API Layer

* [ ] Category create/update/delete API implemented
* [ ] Subcategory create/update/delete API implemented
* [ ] Stack Entry create/update/delete API implemented
* [ ] Public taxonomy read API implemented
* [ ] Authenticated (admin) taxonomy read API implemented
* [ ] Request validation implemented across all endpoints
* [ ] Standardized error handling implemented

## Application Layer

* [ ] Application service implemented for Category, Subcategory, and Stack Entry
* [ ] Business rules isolated (taxonomy constraints, cascade logic)
* [ ] Repository layer implemented
* [ ] Infrastructure dependencies isolated

## Taxonomy Integrity

* [ ] `categoryId` required on Stack Entry enforced
* [ ] `subcategoryId` optional-and-constrained validation implemented
* [ ] Cascading delete logic implemented for Category → Subcategory → Stack Entry
* [ ] No taxonomy depth beyond Category → Subcategory → Stack Entry enforced

---

# Frontend

## User Interface

* [ ] Category management UI implemented
* [ ] Subcategory management UI implemented
* [ ] Stack Entry management UI implemented
* [ ] Stack Entry Drawer implemented
* [ ] Semantic Minimum reminder implemented (advisory, non-blocking)
* [ ] Admin loading states implemented
* [ ] Admin error states implemented

## State Management

* [ ] Client state does not treat unsaved edits as persisted
* [ ] Discard/close leaves persisted entity unchanged
* [ ] Taxonomy state synchronized with server on refresh

## Authorization UX

* [ ] Owner-only controls visible only to authenticated owner
* [ ] Owner-only controls hidden for guests
* [ ] Controls removed after logout

---

# Security

## Authorization

* [ ] Create/edit/delete operations restricted to authenticated owner
* [ ] Public read routes remain unauthenticated and read-only
* [ ] Authenticated admin read endpoint enforces authentication

## Validation

* [ ] Stack Entry content validated/sanitized per Article content rules
* [ ] Taxonomy relationship validation implemented (`subcategoryId` belongs to `categoryId`)

## Sensitive Deletion Security

* [ ] Security-delete confirmation reused (not reimplemented) for Category/Subcategory/Stack Entry deletion
* [ ] Exactly one confirmation required per delete operation regardless of cascade size

---

# Capability Integration

* [ ] Article content-body model (TipTap/ProseMirror) reused for Stack Entry content
* [ ] Content Reference mechanism (Article/Series) reused for Stack Entry content
* [ ] Content Reference fallback/unavailable-content handling reused
* [ ] Security-delete mechanism reused from Public Content Platform
* [ ] Existing admin authentication mechanism reused (Private Publishing Infrastructure)
* [ ] No direct console logging remains

---

# Architecture Compliance

* [ ] Domain model complies with specification (no `hasSubcategories` flag; Subcategory existence represented by records)
* [ ] Feature structure complies with existing reference architecture
* [ ] Service/repository boundaries comply with existing conventions
* [ ] No parallel/duplicate content system introduced alongside Public Content Platform

---

# Code Quality

* [ ] No temporary debugging code remains
* [ ] No commented production code remains
* [ ] No hardcoded secrets remain
* [ ] No development bypass remains
* [ ] No blocking TODOs remain
* [ ] Public interfaces remain stable

---

# Security Hygiene

* [ ] Sensitive values never exposed in public API responses
* [ ] Sensitive values never emitted through logs
* [ ] Authenticated-only fields excluded from public taxonomy responses

---

# Integration

## Frontend / Backend Integration

* [ ] Category/Subcategory/Stack Entry management workflows connected to backend APIs
* [ ] Public browsing and Drawer connected to public read API
* [ ] Admin taxonomy view connected to authenticated read API

## Runtime Integration

* [ ] Database connectivity verified for taxonomy operations
* [ ] Existing authentication runtime reused and verified
* [ ] Runtime logging verified

---

# Testing Readiness

## General Feature Verification

### Unit Verification

* [ ] Unit verification implemented
* [ ] Unit verification passing

### Failure Verification

* [ ] Failure scenarios implemented
* [ ] Failure verification passing

### Security Verification

* [ ] Security verification implemented
* [ ] Security verification passing

### Integration Verification

* [ ] Integration verification implemented
* [ ] Integration verification passing

### Regression Verification

* [ ] Regression verification implemented
* [ ] Regression verification passing

## Feature-specific Verification

### Backend Verification

* [ ] Category route/service/repository verification completed
* [ ] Subcategory route/service/repository verification completed
* [ ] Stack Entry route/service/repository verification completed
* [ ] Taxonomy relationship validation verification completed

### Frontend Verification

* [ ] Category management UI verification completed
* [ ] Subcategory management UI verification completed
* [ ] Stack Entry management UI verification completed
* [ ] Stack Entry Drawer verification completed
* [ ] Semantic Minimum reminder verification completed

### Taxonomy & Content Verification

* [ ] Public browsing verification completed
* [ ] Cascading deletion verification completed
* [ ] Content Reference fallback verification completed
* [ ] Content technical validation verification completed

---

# Documentation

* [ ] Specification completed
* [ ] Verification completed
* [ ] ADR references verified (if applicable)
* [ ] Runbook references verified

---

# Production Readiness

* [ ] Functional requirements satisfied
* [ ] All required tests passing
* [ ] Security requirements satisfied
* [ ] Runtime requirements satisfied
* [ ] Documentation completed
* [ ] No known blocking issues remain
* [ ] Ready for production use
