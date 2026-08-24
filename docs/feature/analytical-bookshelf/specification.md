# Analytical Bookshelf

**Version:** 1.0  
**Last Updated:** 2026-08-23  
**Owner:** Amir Karimi  

---

## 1. Purpose

The Analytical Bookshelf provides a curated public reading library within Portfolio V2.

Its purpose is to communicate the owner's engineering learning process rather than merely listing books that have been read.

Each Book consists of a title, cover image, and analytical rich-text content describing the reading experience, such as why the book was selected, how it was studied, what was learned, and how the learning relates to engineering practice.

The feature provides owner-only Book management and a public read-only presentation built on the existing content infrastructure.

---

## 2. Scope

### Included

* Book creation, editing, and deletion by the authenticated owner.
* Book title, cover, and rich-text content.
* Public Bookshelf section on the main portfolio page.
* Public Book content presentation through a Drawer.
* Empty-state presentation.
* Newest-first ordering.
* Reuse of existing rich-content, media, rendering, and content-reference infrastructure.
* Required-field validation for title, cover, and content.

### Excluded

* Categories, tags, search, and filtering.
* Manual reordering or alternate sorting.
* Draft, Published, or Archived states.
* Separate publishing workflow.
* Dedicated public Book routes.
* Book-specific relationship graphs.
* Structured analytical fields such as reading status, progress, learning outcomes, or engineering applications.
* Public interactions such as comments, likes, bookmarks, or ratings.
* Multi-user authoring.

Future versions may introduce these capabilities based on demonstrated need.

---

## 3. Related Documents

| Document                     | Project Path                                            | Purpose                                                 |
|------------------------------|---------------------------------------------------------|---------------------------------------------------------|
| Portfolio V2 Specification   | `docs/portfolio-v2-spec.md`                             | Project-level scope and architectural intent            |
| Public Content Platform      | `docs/feature/public-content-platform/specification.md` | Existing content-authoring and rendering infrastructure |
| Article Rendering Guidelines | `docs/guidelines/article-rendering-guideline.md`        | Shared rich-content rendering rules                     |
| Media Guidelines             | `docs/guidelines/media.md`                              | Shared media handling rules                             |
| Capability Usage Guideline   | `docs/guidelines/capability-usage-guideline.md`         | Shared capability usage conventions                     |

---

## 4. Domain Model

### 4.1 Book

A Book is an independently identifiable analytical reading entry within the Portfolio.

A Book contains:

* **Title** — the display title of the book.
* **Cover** — the book's cover image.
* **Content** — the analytical rich-text body describing the owner's reading and learning experience.

Analytical information such as the reason for selection, study approach, learning outcomes, or engineering applications is part of the rich-text Content rather than separate domain fields.

Book Content may use the capabilities already supported by the existing content infrastructure, including media and content references.

---

## 5. Book Lifecycle

The feature does not introduce a publishing lifecycle.

A Book either exists or does not exist:

```text id="7q0k7w"
Does Not Exist
      │
    Create
      ▼
    Exists
      │
   ┌──┴───┐
 Edit   Delete
   │       │
   ▼       ▼
 Exists  Does Not Exist
```

There are no Draft, Published, Archived, Preview, or Restore states.

A successfully created Book becomes publicly available immediately.

---

## 6. Functional Requirements

### 6.1 Bookshelf

The Bookshelf section shall always be present on the main portfolio page.

When Books exist, they shall be rendered in reverse creation order, with the newest Book first.

When no Books exist, the section shall render an intentional empty state rather than disappearing or appearing visually broken. The exact presentation is a UI concern and may use messaging such as "Coming Soon".

No category, filtering, search, sorting, or manual reordering controls shall be provided.

---

### 6.2 Book Presentation

Each Book shall be represented by a public Book Card containing at minimum:

* Title.
* Cover.

Selecting a Book shall present its analytical Content through the existing Drawer component pattern without requiring navigation to a dedicated Book page.

Content shall be rendered using the existing rich-content rendering infrastructure.

---

### 6.3 Content References

Book Content may reference existing Portfolio content through the existing content-reference mechanism.

The feature shall not introduce a Book-specific relationship graph or relationship-management UI.

---

### 6.4 Book Creation

The authenticated owner shall be able to create a Book through an administrative workflow containing:

* Title.
* Cover.
* Content.

Content shall be authored using the existing rich-content editor.

A content-oriented reminder shall be shown during authoring to reinforce the analytical purpose of the Book content. This reminder is editorial guidance and is not a validation rule.

---

### 6.5 Validation

A Book shall not be persisted unless:

* Title is non-empty.
* Cover is present and valid.
* Content is non-empty.

No semantic or qualitative validation shall be imposed on Content.

The system shall not require specific headings, paragraph counts, references, images, or other content structures.

---

### 6.6 Book Editing

The authenticated owner shall be able to edit an existing Book's Title, Cover, and Content.

Editing shall not create a separate Draft entity.

Changes shall remain unsaved until explicitly persisted.

If editing is cancelled or saving fails, the previously persisted Book shall remain unchanged.

A successful save shall replace the previously persisted values.

---

### 6.7 Book Deletion

The authenticated owner shall be able to permanently delete an existing Book.

Deletion shall remove the Book from the public Bookshelf.

No Archive or Restore mechanism is provided.

---

### 6.8 Administrative Access

Creation, editing, and deletion shall be restricted to the authenticated portfolio owner.

Public visitors have read-only access to persisted Books.

The feature shall not introduce additional administrators, contributors, public registration, or role-based access control.

---

## 7. User Flows

### 7.1 Public Flow

```text id="1x4f0g"
Visitor
  │
  ▼
Main Portfolio
  │
  ▼
Bookshelf
  │
  ├── No Books ──► Empty State
  │
  └── Book Card
          │
        Click
          ▼
        Drawer
          │
          ▼
   Analytical Content
```

### 7.2 Creation Flow

```text id="6yn0fs"
Authenticated Owner
        │
        ▼
     Add Book
        │
        ▼
 Title · Cover · Content
        │
        ▼
     Validation
      │       │
   Invalid   Valid
      │       │
    Errors   Save
              │
              ▼
        Book Exists
```

### 7.3 Editing Flow

```text id="g4c6d5"
Authenticated Owner
        │
        ▼
       Edit
        │
        ▼
   Local Changes
      │       │
   Cancel    Save
      │       │
   Discard   Validate
              │
              ▼
            Persist
```

Cancelling or failing to save shall leave the previously persisted Book unchanged.

---

## 8. Technical Design

### 8.1 Existing Infrastructure

The feature shall reuse the existing infrastructure for:

* Rich-text editing and document structure.
* Rich-content rendering.
* Media handling.
* Content references.
* Shared validation and UI primitives where applicable.

No parallel Book-specific editor, renderer, or content format shall be introduced.

### 8.2 Content Model

Book Content shall use the existing supported rich-content document model.

New Tiptap nodes or extensions are not required for V2.0. They may be introduced in later versions if actual Bookshelf usage demonstrates a need.

### 8.3 Persistence

The server is the source of truth for persisted Books.

Unsaved creation or editing state exists only during the active client workflow and shall not be treated as persisted until the server confirms success.

---

## 9. Routes

### Public

Books are presented within the main portfolio page.

No dedicated public Book route is required for V2.0.

### Protected

Administrative routes shall follow the existing Admin conventions and provide access to Book creation, editing, and deletion.

---

## 10. API

Exact endpoint names and paths shall follow existing API conventions.

The feature requires operations equivalent to:

| Method          | Operation      | Auth              |
|-----------------|----------------|-------------------|
| `POST`          | Create Book    | Yes               |
| `GET`           | Retrieve Books | Context-dependent |
| `PATCH` / `PUT` | Update Book    | Yes               |
| `DELETE`        | Delete Book    | Yes               |

Public access shall expose only persisted Books intended for public presentation.

---

## 11. State Management

The server is the source of truth for persisted Books.

The client may hold unsaved creation or editing state.

Unsaved state shall not be considered persisted until server confirmation.

Cancelling creation creates no Book. Cancelling or failing an edit leaves the persisted Book unchanged.

---

## 12. Content and Media Rules

Book Content shall follow the existing shared content-rendering rules.

Book Cover handling shall follow the existing shared media rules.

The feature shall not redefine shared content or media behavior.

---

## 13. Security Considerations

* Creation, editing, and deletion require owner authentication and authorization.
* Public visitors have read-only access.
* Title, Cover, and Content are validated before persistence.
* Rich Content shall follow the existing sanitization and security model.
* No separate security model shall be introduced for Books.

---

## 14. Reference Implementation Structure

The feature shall follow the existing feature-based project structure.

An illustrative structure is:

```text id="3j5x7b"
src/
├── features/
│   └── analytical-bookshelf/
│       ├── components/
│       │   ├── bookshelf/
│       │   ├── book-card/
│       │   ├── book-content/
│       │   └── book-form/
│       ├── repository/
│       ├── schemas/
│       ├── types/
│       ├── services/
│       └── utils/
│
└── ...
```

The structure is illustrative and shall follow the actual project architecture. Shared content infrastructure remains owned by the existing content feature/capability.

---

## 15. Dependencies

### Requires

* Owner authentication and authorization.
* Existing persistence infrastructure.
* Existing rich-content editor and schema.
* Existing rich-content renderer.
* Existing media handling.
* Existing content-reference mechanism.
* Existing shared UI primitives.

### Enables

The feature enables the Portfolio to communicate the owner's reading activity, technical reflection, engineering learning, and relationship between learning and existing Portfolio content.

---

## 16. Notes

The Analytical Bookshelf is intentionally a lightweight feature built on top of existing Portfolio capabilities.

The Book domain remains limited to:

**Title + Cover + Content**

Metadata about the reading experience is intentionally kept inside Content so that the analytical structure can evolve without requiring domain-schema changes.

The feature is not intended to become a general-purpose book-management or social-reading system.

---

## 17. Changelog

| Version | Date       | Changes                                    |
|---------|------------|--------------------------------------------|
| 1.0     | 2026-08-23 | Initial Analytical Bookshelf specification |
