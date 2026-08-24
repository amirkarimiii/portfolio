# Interactive Stack Mapping Verification

# 1. Purpose

Define the verification strategy for the Interactive Stack Mapping feature.

This document specifies how compliance with the feature specification is evaluated and verified.

Verification activities must validate the taxonomy domain model, owner-only management workflows, public exploration behavior, content reuse from the Public Content Platform, cascading deletion behavior, and integration with existing capabilities.

---

# 2. Verification Scope

The following feature requirements must be verified:

* Category, Subcategory, and Stack Entry creation, editing, and deletion
* Taxonomy relationship integrity (`categoryId` required, `subcategoryId` optional and constrained)
* Owner-only authorization on all write operations
* Public read-only taxonomy browsing and visibility rules
* Stack Entry content body reuse of the Article content model
* Content Reference (Article/Series) behavior and fallback handling inside Stack Entry content
* Drawer-based content viewing behavior
* Cascading, security-delete confirmation behavior
* Semantic Minimum reminder behavior (advisory, non-blocking)
* Homepage-only placement of the feature and its admin controls

---

# 3. Functional Verification

## Category Management

Verify:

* An authenticated owner can create a Category with `name`, optional `icon`, and optional `description`.
* Unauthenticated Category creation attempts are rejected.
* An authenticated owner can edit a Category's `name`, `icon`, and `description`.
* Category edits are not persisted until Save is triggered; discarding an edit leaves the Category unchanged.

## Subcategory Management

Verify:

* An authenticated owner can create a Subcategory with `name` under a selected Category.
* Unauthenticated Subcategory creation attempts are rejected.
* An authenticated owner can edit a Subcategory's `name`.
* A Subcategory always resolves to exactly one parent Category.

## Stack Entry Management

Verify:

* An authenticated owner can create a Stack Entry with `name`, `shortDescription`, `content`, a required `categoryId`, and an optional `subcategoryId`.
* A Stack Entry with a `null` `subcategoryId` is treated as directly attached to its Category.
* A Stack Entry cannot be created or updated with a `subcategoryId` that references a Subcategory belonging to a different Category.
* The Semantic Minimum reminder is displayed before Save on both creation and edit, and does not block Save regardless of content richness.
* An authenticated owner can edit a Stack Entry's `name`, `shortDescription`, and `content` via a direct, transactional in-place update.
* No mechanism exists to move a Stack Entry to a different Category or Subcategory after creation.

## Public Taxonomy Browsing

Verify:

* Unauthenticated visitors can browse Categories and, where present, their Subcategories.
* A selected Category's `description` renders as part of the page content, separate from any Stack Entry Drawer.
* A Category's public rendering supports both directly attached Stack Entries and Stack Entries organized through Subcategories.
* Ordering of Categories, Subcategories, and Stack Entries reflects creation order.

## Stack Entry Content Viewing

Verify:

* Clicking a Stack Entry (visitor or owner) opens its content in a Drawer.
* The Drawer renders all node types supported by Article content, per the Article Rendering Guidelines.
* Interactive elements within the Drawer that navigate to other content (Article/Series Content Reference) open in a new browser tab.

---

# 4. Authorization Verification

## Administrative Controls

Verify:

* Category, Subcategory, and Stack Entry creation, edit, and delete controls are unavailable to unauthenticated visitors.
* Administrative controls become available on the homepage after authentication, and are removed after logout, consistent with the existing admin authentication mechanism.

## Protected Operations

Verify:

* All write endpoints (`POST`/`PATCH`/`DELETE` under `/api/stack-mapping/*`) enforce authentication.
* The authenticated (`admin=true` or equivalent) read endpoint is inaccessible without authentication.
* Session validation occurs before any privileged taxonomy or Stack Entry mutation.

---

# 5. Data Integrity & Validation Verification

## Taxonomy Relationship Integrity

Verify:

* The API rejects a Stack Entry whose `subcategoryId` does not belong to its supplied `categoryId`.
* The API rejects Stack Entry creation without a `categoryId`.
* No taxonomy node can be created below a Subcategory.

## Content Validation

Verify:

* Stack Entry content is validated and sanitized using the same schema-level rules applied to Article content.
* A Stack Entry becomes publicly visible only after its content passes technical validation.
* Content that fails technical validation is excluded from public rendering but remains visible through authenticated (owner) endpoints.

---

# 6. Visibility & Lifecycle Verification

Verify:

* A newly created, technically valid Stack Entry is publicly visible without a separate publish step.
* A Category or Subcategory with no visible descendant Stack Entries is excluded from public rendering.
* The admin view always shows Categories and Subcategories, including those with zero children.
* A newly-empty or newly-populated admin state is correctly reflected on page refresh.

---

# 7. Deletion Verification

Verify:

* Deleting a Stack Entry requires exactly one security-delete confirmation, reusing the Public Content Platform mechanism.
* Deleting a Subcategory cascades to all of its Stack Entries and requires exactly one security-delete confirmation.
* Deleting a Category cascades to all descendant Subcategories and all Stack Entries (direct or via Subcategory) and requires exactly one security-delete confirmation.
* No partial cascade state is left behind after a confirmed deletion (i.e., all descendant entities are removed).

---

# 8. Integration Verification

## Content Model Reuse

Verify:

* Stack Entry content uses the same TipTap/ProseMirror representation as Article content, including Content Reference nodes.
* A Content Reference to an Article or Series inside a Stack Entry degrades using the same fallback/unavailable-content handling defined for the Public Content Platform when the referenced content is later Archived or Deleted.

## Frontend Integration

Verify:

* Owner management controls and public browsing/Drawer behavior are integrated into the same homepage (`/`) view, per the existing convention of exposing owner-only controls on public-facing views.
* Client-side state does not treat unsaved edits as persisted until the server confirms the save.

## Backend Integration

Verify:

* Stack Mapping API routes integrate correctly with the repository and application service layers.
* Request validation is applied consistently across Category, Subcategory, and Stack Entry endpoints.

## Runtime Integration

Verify:

* Existing admin authentication configuration is reused without modification for Stack Mapping authorization.
* Database connectivity supports Category, Subcategory, and Stack Entry operations.

---

# 9. Failure Verification

The following failure scenarios must be verified:

## Authorization Failures

* Unauthenticated create/edit/delete attempts on Categories, Subcategories, and Stack Entries
* Unauthenticated access to the admin taxonomy read endpoint

## Validation Failures

* Stack Entry creation/update with a `subcategoryId` not belonging to the supplied `categoryId`
* Stack Entry creation without a required `categoryId`
* Category or Subcategory creation without a required `name`

## Content Failures

* Stack Entry content failing technical (schema-level) validation
* A Content Reference pointing to an Archived or Deleted Article/Series

## Deletion Failures

* Attempted deletion without completing the security-delete confirmation

Verification must confirm that failures are handled safely and produce predictable, standardized responses.

---

# 10. Regression Verification

Verify that introduction of this feature does not negatively affect:

* Public Content Platform Article/Series lifecycle and rendering
* Existing admin authentication and session behavior
* Existing homepage sections and public navigation
* Existing API response standards
* Existing security-delete mechanism behavior for Article/Series deletion

---

# 11. Explicit Non-Goals

The following items are outside verification scope:

* Draft/Published/Archived lifecycle behavior for Stack Mapping entities (not part of this feature)
* Reordering of Categories, Subcategories, or Stack Entries
* Moving a Stack Entry between Categories/Subcategories after creation
* Search/filter functionality for Stack Mapping
* A formal Project entity or Project↔Stack relationship
* Stack Entry `name` uniqueness enforcement
* UI presentation details (component choice, layout, modal structure)

---

# 12. Verification Evidence

Verification evidence may include:

* Automated test results (unit, integration, API-level)
* Manual verification records for owner workflows (create/edit/delete)
* API validation results for taxonomy relationship constraints
* Cascading deletion validation results
* Content Reference fallback validation results
* CI pipeline results
* Runtime execution logs
