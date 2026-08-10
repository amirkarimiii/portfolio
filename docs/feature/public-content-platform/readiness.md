# Public Content Platform (Core V2)

## Production Readiness & Architecture Compliance

## Purpose
Verify that the Public Content Platform (Core V2) feature is production-ready and complies with the approved architecture.

## Scope
Backend, Frontend, Security, Public Listing Infrastructure, Integration, and Architecture Compliance for Article and Series authoring, lifecycle, and public discovery in Portfolio V2.

# Foundation

* [ ] Feature architecture documented
* [ ] Feature boundaries documented (Included/Excluded, Specification Section 2)
* [ ] Responsibilities isolated (owner-only authoring vs. public read surfaces)
* [ ] Required ADRs approved and referenced (ADR-0001, ADR-0002, ADR-0004)
* [ ] Environment requirements documented (CDN/media, rate limiter configuration)
* [ ] Public interfaces documented (Specification Sections 9–10)
* [ ] External dependencies documented (owner authentication, TipTap editor, rate limiter reused from Private Publishing Infrastructure)

---

# Backend

## API Layer

* [ ] Create Article Draft API implemented
* [ ] Retrieve Article (edit) API implemented
* [ ] Update / auto-save Article Draft API implemented
* [ ] Publish Article API implemented
* [ ] Archive Article API implemented
* [ ] Delete Article API implemented (with Section 5.3 verification gate)
* [ ] Preview retrieval API implemented
* [ ] Inbound-references query API implemented
* [ ] Tag search API implemented
* [ ] Tag creation API implemented
* [ ] Article search API (references/related content) implemented
* [ ] Create Series API implemented (`POST /api/series`)
* [ ] Recent Series (top-20) API implemented (`GET /api/series/recent`)
* [ ] Reserved-slug list API implemented (`GET /api/reserved-slugs`)
* [ ] Blog listing API implemented (`/api/blog`, paginated)
* [ ] Series listing API implemented (`/api/series`, paginated)
* [ ] Request validation implemented
* [ ] Standardized error handling implemented

## Application Layer

* [ ] Application service implemented
* [ ] Business rules isolated (lifecycle transitions, slug locking, classification immutability)
* [ ] Repository layer implemented
* [ ] Infrastructure dependencies isolated

## Content Domain

* [ ] Article lifecycle state machine implemented (Draft / Published / Archived, Section 5)
* [ ] Lifecycle and audit timestamps implemented (`created_at`, `updated_at`, `first_published_at`, `published_at`, `archived_at`)
* [ ] Slug uniqueness and reserved-name validation implemented (reserved-name list sourced from database, not hardcoded)
* [ ] Slug locking (72-hour rule) implemented
* [ ] Owner emergency slug-lock bypass implemented
* [ ] Series domain implemented (Title ≤ 36 chars, Slug, Description, media, Alt Text, SEO Title/Description/Canonical URL, `created_at`/`updated_at`)
* [ ] Series creation scoped as a narrower content type than Article — Metadata-only tab; no Content/body tab; no Related Series suggestion mechanism
* [ ] Standalone/Series-Member classification immutability enforced post-publish
* [ ] Content Reference embedding and resolution implemented
* [ ] Inbound-reference tracking (`inbound_referencing_slugs`) implemented
* [ ] Fallback Card State resolution implemented for unavailable references
* [ ] Related Articles association implemented
* [ ] Tag creation/suggestion with duplicate-prevention implemented
* [ ] Optimistic-locking concurrency control implemented
* [ ] Draft auto-save persistence implemented

## Public Listing Infrastructure

* [ ] Blog listing pagination implemented (20 Articles/page, fixed)
* [ ] Series listing pagination implemented (20 Series/page, fixed)
* [ ] Blog ordering by `first_published_at` implemented (Newest First default / Oldest First)
* [ ] Series ordering by `updated_at` implemented (Newest First default / Oldest First)
* [ ] Next-two-page prefetch implemented for `/blog`
* [ ] Next-two-page prefetch implemented for `/series`
* [ ] First-two-Article content prefetch implemented on `/blog` page load
* [ ] First-two-Series nested Article Card lazy load implemented on `/series` page load
* [ ] Prefetch failure retry (exponential backoff, silent — no toast) implemented

---

# Frontend

## User Interface

* [ ] Add/Edit Article form implemented (Metadata, Content, Related Articles tabs)
* [ ] Series field implemented within Article Metadata tab (existing-Series picker: top-20 recent by `created_at`, single-select, no search/pagination)
* [ ] Add Series form implemented (single Metadata tab: Identity, Media, SEO fields)
* [ ] Cross-tab Series-created sync implemented (`BroadcastChannel` with `localStorage`-event fallback)
* [ ] TipTap editor integration implemented (H1 excluded from editor options)
* [ ] Cover Image management UI implemented
* [ ] Thumbnail management UI implemented (auto-derived Alt Text)
* [ ] Tag suggestion and creation UI implemented
* [ ] Content Reference insertion UI implemented
* [ ] Related Articles management UI implemented
* [ ] Preview UI implemented (standalone and Series-context)
* [ ] Publish / Archive / Restore / Delete UI implemented
* [ ] Deletion confirmation flows implemented (simple for Draft; password + typed-title for Published/Archived)
* [ ] Slug lock override UI implemented (with SEO/404-risk warning)
* [ ] Blog listing UI implemented
* [ ] Series listing UI implemented
* [ ] Content Card component implemented (Article, Series, Fallback state, Series badge)

## State Management

* [ ] Autosave timer and retry/backoff state implemented
* [ ] Save status indicator implemented (`Saving` / `Saved` / `Save Failed`)
* [ ] LocalStorage fallback cache implemented
* [ ] Draft recovery implemented (refresh, tab loss, network failure, session expiry)
* [ ] Blog/Series pagination and prefetch cache state implemented
* [ ] Cross-tab `series-created` event listener state implemented

## Authorization UX

* [ ] Admin authoring routes gated behind existing owner authentication
* [ ] Preview routes gated behind existing owner authentication
* [ ] Administrative UI hidden for unauthenticated users

---

# Security

## Validation & Content Safety

* [ ] Server-side validation implemented independently of client-side validation
* [ ] Publish-time validation implemented (metadata, media, slug, Series, Tags, References, body structure)
* [ ] Rich content sanitization implemented before public rendering

## Authorization

* [ ] Protected routes enforced (Specification Section 9)
* [ ] Sensitive deletion re-authentication flow implemented (Section 5.3)

## Abuse Protection

* [ ] Reused rate limiter applied to protected/administrative routes
* [ ] Reused rate limiter applied to public `/api/blog` and `/api/series` routes
* [ ] Rate-limiting behavior verified under repeated/abusive requests

---

# Capability Integration

* [ ] Application Logging integrated
* [ ] Publishing/lifecycle events logged
* [ ] Deletion events logged
* [ ] No direct console logging remains
* [ ] API Error Handling capability consumed
* [ ] Request Validation capability consumed
* [ ] Owner Authentication capability consumed
* [ ] Rate Limiter capability consumed (reused, not reimplemented)

---

# Architecture Compliance

* [ ] Implementation complies with ADR-0001 (EditorJS to Tiptap)
* [ ] Implementation complies with ADR-0002 (Article Authoring Guidelines)
* [ ] Implementation complies with ADR-0004 (Cherry-Pick Extraction Policy)
* [ ] Reference implementation structure aligned with Specification Section 14

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

* [ ] Media/CDN and rate-limiter configuration loaded exclusively from environment configuration
* [ ] Sensitive values never exposed in API responses
* [ ] Sensitive values never emitted through logs
* [ ] Rate limiter configuration verified across supported environments

---

# Integration

## Frontend / Backend Integration

* [ ] Article authoring workflow connected to backend APIs
* [ ] Autosave/draft-recovery workflow connected to backend APIs
* [ ] Preview workflow connected to backend APIs
* [ ] Publish/Archive/Restore/Delete workflows connected to backend APIs
* [ ] Blog listing connected to backend pagination API
* [ ] Series listing connected to backend pagination API

## Runtime Integration

* [ ] Environment configuration verified
* [ ] Database connectivity verified
* [ ] CDN/media runtime verified
* [ ] Rate limiter runtime verified
* [ ] Runtime logging verified

---

# Testing Readiness

## General Feature Verification

### Unit Verification

* [ ] Unit verification implemented
* [ ] Unit verification passing

### Failure Verification

* [ ] Failure scenarios implemented (Verification Section 10)
* [ ] Failure verification passing

### Security Verification

* [ ] Security verification implemented (Verification Section 8)
* [ ] Security verification passing

### Integration Verification

* [ ] Integration verification implemented (Verification Section 9)
* [ ] Integration verification passing

### Regression Verification

* [ ] Regression verification implemented (Verification Section 11)
* [ ] Regression verification passing

## Feature-specific Verification

### Backend Verification

* [ ] Route handler verification completed
* [ ] Application service verification completed
* [ ] Repository verification completed
* [ ] Slug-locking and classification-immutability verification completed
* [ ] Series creation, Series-picker, and reserved-slug endpoint verification completed

### Frontend Verification

* [ ] Article editor verification completed
* [ ] Autosave/retry/LocalStorage verification completed
* [ ] Content Card (incl. Fallback state) verification completed
* [ ] Series selection & cross-tab creation interface verification completed
* [ ] Blog/Series listing verification completed

### Lifecycle & Domain Verification

* [ ] Lifecycle transition verification completed (Verification Section 4)
* [ ] Deletion policy verification completed
* [ ] Content Reference / inbound-tracking verification completed
* [ ] Series domain rules verification completed

### Public Listing Verification

* [ ] Blog ordering and pagination verification completed
* [ ] Series ordering and pagination verification completed
* [ ] Next-page prefetch verification completed
* [ ] Article-content and nested-card lazy-load verification completed
* [ ] Silent prefetch-failure behavior verified (no toast)

---

# Documentation

* [ ] Specification completed
* [ ] Verification completed
* [ ] ADR references verified
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
