# Interactive Stack Mapping

**Version:** 1.1  
**Last Updated:** 2026-08-24  
**Owner:** Amir Karimi  

---

## 1. Purpose

The Interactive Stack Mapping feature provides the owner-only workflow for curating, and the public-facing workflow for exploring, a structured map of the portfolio owner's technical domains — technologies, engineering practices, and architectural concepts the owner has meaningful, documented experience with.

Unlike a conventional skills list, each explorable unit ("Stack Entry") carries its own article-like content body, giving evidence-backed depth to what would otherwise be a flat claim. The feature deliberately reuses the content body model, Content Reference mechanism, and security-delete mechanism established by the Public Content Platform (Core V2) feature, rather than introducing a second, parallel content system.

The feature establishes:

* A two-level taxonomy consisting of Categories and optional Subcategories
* A content-bearing Stack Entry entity, which belongs to exactly one Category and optionally one Subcategory within that Category
* A content-bearing Stack Entry rendered to visitors inside a Drawer on interaction
* An owner-only management workflow for the taxonomy and its content, independent of the Article/Series lifecycle

The domain model intentionally does not encode presentation-specific taxonomy modes. A Category may have Subcategories, directly attached Stack Entries, or both. The existence of Subcategories is represented by Subcategory records rather than by a dedicated Category flag.

---

## 2. Scope

### Included

* Public, read-only exploration of the Stack taxonomy (Category → optional Subcategory → Stack Entry) and Stack Entry content, on the homepage (`/`)
* Owner-only creation, editing, and deletion of Categories, Subcategories, and Stack Entries
* Reuse of the existing Article content-body model (TipTap/ProseMirror) for Stack Entry content, including Content Reference nodes (Article/Series) and any future embed node types added to that model
* A single, cascading security-delete confirmation mechanism (reused from Public Content Platform) covering deletion of a Stack Entry, a Subcategory, or a Category
* A per-Category description, rendered as part of the public page body (not inside the Drawer)
* Informal, in-content references from a Stack Entry to a Project

### Excluded

* Any Draft/Published/Archived lifecycle for Stack Entries, Categories, or Subcategories
* Reordering of Categories, Subcategories, or Stack Entries (fixed creation order in this version)
* Moving a Stack Entry between Categories/Subcategories after creation
* Search/filter functionality for Stack Mapping (if introduced in a future version, it is governed by the existing blog search mechanism, not by this feature)
* Reverse references from Article/Series content to a Stack Entry
* A formal Project entity relationship (Project references inside Stack Entry content are informal and non-relational)
* Taxonomy depth beyond two organizational levels below Category
* Any dedicated route outside the homepage (`/`)

Future capabilities may be introduced by later Portfolio versions without changing the current feature contract.

---

## 3. Related Documents

| Document                              | Project Path                                            | Purpose                                                                                                                                                          |
|---------------------------------------|---------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Portfolio V2 Specification            | `docs/portfolio-v2-spec.md`                             | Defines project-level scope and architectural intent                                                                                                             |
| Public Content Platform Specification | `docs/feature/public-content-platform/specification.md` | Defines the Article content-body model, Content Reference mechanism, security-delete mechanism, and fallback/unavailable-content handling reused by this feature |
| Article Rendering Guidelines          | `docs/guidelines/article-rendering-guideline.md`        | Defines supported content body elements and rendering rules, reused for Stack Entry content                                                                      |
| Media Guidelines                      | `docs/guidelines/media.md`                              | Defines shared media handling and rendering rules, reused for Stack Entry content                                                                                |

---

## 4. Domain Model

### 4.1 Category

A Category is a top-level, purely organizational taxonomy node. It never carries Stack Entry content of its own.

A Category contains:

* Identity — `id`, `name` (required)
* `icon` — optional emoji/icon
* `description` — optional; rendered as part of the public page body when the Category is selected, not inside a Stack Entry Drawer

A Category may have zero or more Subcategories and zero or more directly attached Stack Entries.

The existence of Subcategories is represented by the presence of Subcategory records. No dedicated `hasSubcategories` field is part of the Category domain model.

### 4.2 Subcategory

A Subcategory is a second-level, purely organizational taxonomy node. It never carries content of its own.

A Subcategory contains:

* Identity — `id`, `name` (required)
* `categoryId` — the parent Category (required)

A Subcategory always belongs to exactly one Category.

A Category may have zero or more Subcategories.

### 4.3 Stack Entry

A Stack Entry is the only taxonomy node that carries content. It represents a technical area, technology, engineering practice, or specialized capability the owner considers part of their professional stack and has meaningful knowledge or experience to document.

A Stack Entry contains:

* Identity — `id`, `name` (required), `shortDescription` (required)
* `content` — the Stack Entry's content body, using the same content representation as Article Content Body (Section 4, Public Content Platform Specification): paragraphs, headings, images, links, Content Reference nodes (Article/Series), and any future embed node types added to that shared model
* `categoryId` — the parent Category (required)
* `subcategoryId` — the parent Subcategory, when the Stack Entry belongs to a Subcategory; otherwise `null`

Every Stack Entry belongs to exactly one Category.

A Stack Entry may additionally belong to one Subcategory. If `subcategoryId` is non-null, the referenced Subcategory MUST belong to the same Category identified by `categoryId`.

A Stack Entry with a `null` `subcategoryId` is directly attached to its Category.

### 4.4 Taxonomy Constraints

* Taxonomy depth is fixed at a maximum of two organizational levels below Category: Category → Subcategory → Stack Entry.
* Every Subcategory belongs to exactly one Category.
* Every Stack Entry belongs to exactly one Category.
* A Stack Entry may belong to zero or one Subcategory.
* If a Stack Entry has a non-null `subcategoryId`, that Subcategory MUST belong to the Stack Entry's `categoryId`.
* A Category may have zero or more Subcategories.
* A Category may have zero or more directly attached Stack Entries.
* A Subcategory may have zero or more Stack Entries.
* A Category is not required to have Subcategories in order for Stack Entries to exist.
* A Stack Entry is not required to belong to a Subcategory.
* No Stack Entry may exist without a Category parent.
* No taxonomy node may exist below a Subcategory.

### 4.5 Relationships

```text
Category
   ├── has 0..n Subcategories
   │      └── has 0..n Stack Entries
   │
   └── has 0..n directly attached Stack Entries

Subcategory
   ├── belongs to exactly 1 Category
   └── has 0..n Stack Entries

Stack Entry
   ├── belongs to exactly 1 Category
   └── belongs to 0..1 Subcategory
```

The Category relationship is authoritative for every Stack Entry. A Subcategory, when present, provides an additional level of organization within that Category rather than replacing the Category relationship.

### 4.6 Cross-Feature References

* A Stack Entry's content may include Content Reference nodes pointing to an Article or a Series, using the same Content Reference mechanism defined in the Public Content Platform Specification.
* A Stack Entry's content may include informal, non-relational mentions of a Project (e.g., text or a link). No formal Project entity or Project↔Stack relationship exists; Project remains architecturally decoupled from Stack Mapping.
* No reverse relationship exists: Article and Series content never reference a Stack Entry.

---

## 5. Entity Lifecycle & State

Stack Mapping entities (Category, Subcategory, Stack Entry) do not use the Draft/Published/Archived lifecycle defined for Articles. Their state model is intentionally simpler.

### 5.1 Existence & Visibility

* A Stack Entry is publicly visible as soon as it exists and its content passes technical (schema-level) validation — the same structural validation applied to Article content. There is no separate publish step, and no system-enforced check on the semantic richness of the content (Section 6.3).
* **Admin view:** Categories and Subcategories are always shown, including when they currently have zero children. A Category may have zero Subcategories, zero direct Stack Entries, or both. Reflecting a newly-empty or newly-populated state in this view is achieved on page refresh in this version; real-time reactivity is optional.
* **Public view:** A Category or Subcategory with no visible descendant Stack Entries is excluded entirely from rendering.

### 5.2 Editing

* Opening Edit on a Category, Subcategory, or Stack Entry loads its current state into an editable form; nothing is persisted until Save is explicitly triggered.
* Closing or discarding an edit without Save leaves the persisted entity completely unchanged.
* Unlike Article editing, no separate Draft Copy document is created — an edit is a direct, transactional in-place update of the existing entity, committed only on Save.
* The Category/Subcategory relationship and Stack Entry parent relationships are not changed by ordinary edit operations in this version.

### 5.3 Deletion

* Deleting a Stack Entry, a Subcategory, or a Category all use the same security-delete confirmation mechanism defined in the Public Content Platform Specification.
* Deleting a Category cascades to all of its descendant Subcategories and all Stack Entries belonging to those Subcategories or directly belonging to the Category.
* Deleting a Subcategory cascades to all Stack Entries belonging to that Subcategory.
* Exactly one security-delete confirmation is required per delete operation, regardless of how many descendant entities are removed as part of a cascade.

### 5.4 Ordering & Repositioning

* Categories, Subcategories, and Stack Entries are rendered in creation order. No manual reordering mechanism exists in this version.
* A Stack Entry cannot be moved to a different Category or Subcategory after creation. Achieving a different placement requires deleting the entry and recreating it under the desired parent.

---

## 6. Functional Requirements

### 6.1 Category Management

The system shall allow the authenticated owner to create a Category with a `name`, an optional `icon`, and an optional `description`, and shall reject unauthenticated access to Category creation.

The system shall allow the authenticated owner to edit a Category's `name`, `icon`, and `description`.

The system shall allow the authenticated owner to delete a Category, cascading to all descendant Subcategories and all Stack Entries belonging to those Subcategories or directly to the Category, subject to Section 5.3.

### 6.2 Subcategory Management

The system shall allow the authenticated owner to create a Subcategory with a `name` under a Category, and shall reject unauthenticated access to Subcategory creation.

The system shall allow the authenticated owner to edit a Subcategory's `name`.

The system shall allow the authenticated owner to delete a Subcategory, cascading to all descendant Stack Entries, subject to Section 5.3.

### 6.3 Stack Entry Management

The system shall allow the authenticated owner to create a Stack Entry with a `name`, a `shortDescription`, a `content` body, a required `categoryId`, and an optional `subcategoryId`.

If a `subcategoryId` is supplied, the system shall validate that the referenced Subcategory belongs to the supplied `categoryId`. A Stack Entry shall not be created or updated with a Subcategory belonging to a different Category.

A Stack Entry with a `null` `subcategoryId` shall be treated as directly attached to its Category.

Before a Stack Entry is saved (on both creation and edit), the system shall present the owner with a non-blocking reminder that meaningful Stack Entry content should include, at minimum, either a substantive description of the subject or the owner's documented personal experience with it, and that all other content (context/why, practical experience, architectural considerations, trade-offs, related Projects, related Articles/Series, external references, media) is recommended but not required. This reminder is advisory only; the system shall not block Save on the basis of content richness.

The system shall allow the authenticated owner to edit a Stack Entry's `name`, `shortDescription`, and `content`, per the transactional edit model in Section 5.2.

The system shall not provide a repositioning operation for changing a Stack Entry's Category or Subcategory after creation in this version.

The system shall allow the authenticated owner to delete a Stack Entry, subject to Section 5.3.

### 6.4 Public Taxonomy Browsing

The system shall allow visitors to browse Categories and, where present, their Subcategories, without authentication.

For a selected Category, the system shall render that Category's `description` as part of the page content, distinct from any Stack Entry's Drawer content.

The system shall exclude from public rendering any Category or Subcategory with no visible descendant Stack Entries, and any Stack Entry that has not passed technical content validation (Section 5.1).

A Category's public rendering shall support directly attached Stack Entries and Stack Entries organized through Subcategories.

### 6.5 Stack Entry Content Viewing

The system shall open a Stack Entry's content in a Drawer when a visitor or the authenticated owner interacts with (clicks) that Stack Entry.

The Drawer's content shall support the same node types supported by Article content (Section 4.3), rendered with the same rendering rules defined in the Article Rendering Guidelines.

Any interactive content element within the Drawer that navigates to other content (e.g., an Article or Series Content Reference) shall open in a new browser tab.

### 6.6 Content Reference Fallback

If an Article or Series referenced within a Stack Entry's content is later Archived or Deleted, the reference shall degrade using the same fallback/unavailable-content handling defined in the Public Content Platform Specification for inbound content references.

### 6.7 Project References

Stack Entry content may include informal references to a Project (e.g., text or a link) as ordinary content within the content body. The system shall not maintain a formal Project entity or a Project↔Stack relationship.

### 6.8 Placement

The system shall render the Interactive Stack Mapping feature exclusively on the public homepage (`/`), within a dedicated section. No other public route hosts this feature.

Management of Categories, Subcategories, and Stack Entries shall be available to the authenticated owner directly on the same homepage view — consistent with the existing convention (Public Content Platform Specification, Section 6.25) of exposing owner-only lifecycle controls on public-facing views when accessed by the authenticated owner — rather than through a separate `/admin/...` route.

### 6.9 Ordering & Repositioning

As defined in Section 5.4: creation-order rendering, no manual reordering, and no repositioning of a Stack Entry between parents.

### 6.10 Deletion

As defined in Section 5.3.

---

## 7. User Flows

### 7.1 Owner: Taxonomy & Content Management

```text
Authenticated Owner
       │
       ▼
Stack Mapping Section (on "/")
       │
       ├── Create Category
       │      └── name, icon?, description?
       │              │
       │              ▼
       │          Category exists
       │
       ├── Create Subcategory
       │      └── select Category → name
       │              │
       │              ▼
       │          Subcategory exists
       │
       ├── Create Stack Entry
       │      └── select Category
       │             │
       │             ├── optionally select Subcategory
       │             │
       │             ▼
       │        name, shortDescription, content
       │             │
       │             ▼
       │      Semantic Minimum reminder (advisory, non-blocking)
       │             │
       │             ▼
       │           Save
       │             │
       │             ▼
       │      Stack Entry exists,
       │      publicly visible if technically valid
       │
       ├── Edit (Category / Subcategory / Stack Entry)
       │      ├── Save → entity updated
       │      └── Close/Discard → entity unchanged
       │
       └── Delete (Category / Subcategory / Stack Entry)
              │
              ▼
       Single security-delete confirmation
              │
              ▼
       Entity (and, if applicable, all descendants) removed
```

### 7.2 Visitor: Exploration

```text
Visitor
   │
   ▼
Stack Mapping Section (on "/")
   │
   ▼
Select Category
   │
   ├── Category description shown on page
   │
   ├── Direct Stack Entries
   │       └── Select Stack Entry
   │
   └── Select Subcategory
           └── Select Stack Entry
                   │
                   ▼
              Drawer opens
                   │
                   ▼
          Stack Entry content
                   │
                   ▼
      Click in-content reference
          (Article/Series)
                   │
                   ▼
           Opens in a new tab
```

---

## 8. Routes

### Public

```text
/
```

The feature has no dedicated public route; it is a section within the homepage.

### Protected

Owner-only management occurs on the same `/` route, exposed only to the authenticated owner (Section 6.8). No dedicated `/admin/...` route is introduced by this feature.

---

## 9. API

Exact endpoint naming shall follow existing API conventions. Public read APIs shall expose only technically-valid Stack Entries and non-empty Categories/Subcategories (Section 6.4); the full taxonomy, including empty nodes and any content that failed technical validation, is exposed only through authenticated endpoints.

| Method | Endpoint                                                              | Description                                                                | Auth Required |
|--------|-----------------------------------------------------------------------|----------------------------------------------------------------------------|---------------|
| GET    | `/api/stack-mapping`                                                  | Retrieve public taxonomy (Categories, Subcategories, Stack Entries)        | No            |
| GET    | `/api/stack-mapping?admin=true` (or equivalent authenticated variant) | Retrieve full taxonomy including empty nodes, for the owner view           | Yes           |
| POST   | `/api/stack-mapping/categories`                                       | Create Category                                                            | Yes           |
| PATCH  | `/api/stack-mapping/categories/:id`                                   | Update Category (`name`/`icon`/`description`)                              | Yes           |
| DELETE | `/api/stack-mapping/categories/:id`                                   | Delete Category (cascading, security-delete)                               | Yes           |
| POST   | `/api/stack-mapping/subcategories`                                    | Create Subcategory under a Category                                        | Yes           |
| PATCH  | `/api/stack-mapping/subcategories/:id`                                | Update Subcategory `name`                                                  | Yes           |
| DELETE | `/api/stack-mapping/subcategories/:id`                                | Delete Subcategory (cascading, security-delete)                            | Yes           |
| POST   | `/api/stack-mapping/entries`                                          | Create Stack Entry with required `categoryId` and optional `subcategoryId` | Yes           |
| PATCH  | `/api/stack-mapping/entries/:id`                                      | Update Stack Entry                                                         | Yes           |
| DELETE | `/api/stack-mapping/entries/:id`                                      | Delete Stack Entry (security-delete)                                       | Yes           |

The API shall reject a Stack Entry whose `subcategoryId` does not reference a Subcategory belonging to its `categoryId`.

---

## 10. State Management

### Server State

The server is the source of truth for the taxonomy structure and all Stack Entry content.

The server is also the authority for validating the consistency between a Stack Entry's `categoryId` and optional `subcategoryId`.

### Client State

The client shall not treat unsaved edits to a Category, Subcategory, or Stack Entry as persisted until the server confirms the save (Section 5.2). Discarding an edit shall leave server-side state unchanged.

---

## 11. Content and Media Rules

Stack Entry content shall follow the same Article Rendering Guidelines and Media Guidelines used by the Public Content Platform, since it reuses the identical content body representation (Section 4.3).

---

## 12. Security Considerations

**Authentication:** Identical to the existing admin authentication mechanism (Private Publishing Infrastructure).

**Authorization:** Create, edit, and delete operations on Categories, Subcategories, and Stack Entries are restricted to the authenticated owner. Public routes and read APIs remain read-only and unauthenticated.

**Sensitive Deletion Security:** All delete operations — a single Stack Entry, or a cascading Category/Subcategory deletion — require the same security-delete confirmation mechanism defined in the Public Content Platform Specification. Exactly one confirmation is required per operation, regardless of cascade size.

**Validation:** Stack Entry content shall be validated and sanitized according to the same rules applied to Article content before public rendering. Stack Entry taxonomy relationships shall also be validated so that any non-null `subcategoryId` belongs to the Stack Entry's `categoryId`.

**Potential Risks:** Cascading deletion means a single confirmed Category deletion can remove the Category, all of its Subcategories, directly attached Stack Entries, and Stack Entries beneath its Subcategories. The confirmation step is the only safeguard against unintended data loss at scale.

---

## 13. Reference Implementation Structure

```text
src/
├── features/
│   └── stack-mapping/
│       ├── components/
│       │   ├── category/
│       │   ├── subcategory/
│       │   ├── stack-entry/
│       │   ├── stack-entry-drawer/
│       │   └── semantic-minimum-reminder/
│       │
│       ├── hooks/
│       │   └── use-stack-entry-edit
│       │
│       ├── repository/
│       ├── schemas/
│       ├── types/
│       └── utils/
│
├── app/
│   └── (main)/
│       └── page.tsx
│
└── ...
```

This structure is illustrative and shall follow the existing project architecture.

---

## 14. Dependencies

### Requires

* Private Publishing Infrastructure — owner authentication for all management operations
* Public Content Platform — content body model, Content Reference mechanism, security-delete mechanism, and fallback/unavailable-content handling for referenced Articles/Series

### Enables

* Future AI/SEO structured data layers (Section 4, Portfolio V2 Specification) may draw on Stack Entry content as a data source

---

## 15. Notes

* The final public-facing name of the homepage section hosting this feature (e.g., "Technical Background") has not been decided; it is a UI/naming decision and does not affect this specification.
* **Data model:** `categoryId` is required for every Stack Entry. `subcategoryId` is nullable. When non-null, `subcategoryId` must reference a Subcategory belonging to `categoryId`.
* **Taxonomy flexibility:** The data model permits a Category to have direct Stack Entries, Subcategories containing Stack Entries, or both. Any current presentation or interaction constraints are not encoded as structural restrictions in the domain model.
* **Assumption:** Stack Entry `name` uniqueness is not enforced by the system in this version. This was not explicitly specified during scoping; duplicate names are permitted unless stated otherwise in a future revision.
* All UI presentation details (component choice, layout, modal structure, tab placement, etc.) are intentionally outside this specification's scope and are left to UI design.

---

## 16. Changelog

| Version | Date       | Changes                                                                                                                                                                                                                                                                                                      |
|---------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.1     | 2026-08-24 | Removed `hasSubcategories` from the domain model. Made `categoryId` a required Stack Entry parent relationship and `subcategoryId` an optional relationship. Updated taxonomy constraints, relationships, lifecycle, functional requirements, user flows, API behavior, and security validation accordingly. |
| 1.0     | 2026-08-23 | Initial specification                                                                                                                                                                                                                                                                                        |
