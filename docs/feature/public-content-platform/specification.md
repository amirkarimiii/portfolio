# Public Content Platform (Core V2)

**Version:** 1.4
**Last Updated:** 2026-08-15
**Owner:** Amir Karimi

---

# 1. Purpose

The Public Content Platform (Core V2) feature provides the owner-only workflow for creating, editing, previewing, publishing, archiving, restoring, and deleting technical articles within Portfolio V2.

The feature establishes a controlled publishing workflow between private editorial content and publicly accessible published content.

It also provides the content authoring capabilities required by the Portfolio V2 content model, including:

* Article metadata management
* Rich article body editing
* Article and Series references, with inbound-reference tracking and graceful fallback rendering
* Tag selection and creation
* Related Article management
* Resilient draft persistence — auto-save with exponential-backoff retries, LocalStorage fallback caching, and recovery
* Preview
* Publishing, archiving, and restoration workflows
* Multifactor verification for sensitive deletion workflows
* SEO-oriented metadata
* Media management

The feature is designed for a single site owner and does not introduce public users, contributors, editors, or multi-user publishing.

---

# 2. Scope

## Included

* Owner-only article creation, editing, archiving, restoration, and deletion
* Article metadata management
* Article body editing through the existing TipTap editor
* Article validation (client and server)
* Draft persistence with exponential-backoff auto-save retries and LocalStorage caching
* Draft recovery across page refresh, tab loss, network failure, and authentication expiry
* Article preview, for both standalone and Series-context Articles
* Article publishing
* Article archiving and restoration (republish from Archived)
* Concurrency control (optimistic locking) for editing sessions
* Article slug management, slug locking, and an owner emergency bypass for the lock
* Article Tags (creation and suggestion, duplicate-prevention)
* Related Articles management
* Content References (Article-to-Article and Article-to-Series), including inbound-reference tracking and unavailable/fallback rendering
* Strict routing segregation between Standalone and Series-bound Articles
* Cover image management
* Thumbnail management, with auto-derived Alt Text
* Article SEO metadata
* Reuse of Content Cards for article and series references
* Integration with the existing owner authentication system

## Excluded

* Public article creation and editing
* Public article authentication
* Multiple authors or administrator roles
* Contributor workflows
* Comments
* Likes
* Bookmarks
* Autonomous recommendation engines
* Automatic editorial content generation
* Automatic Series creation
* Automatic article redirection after slug changes (deferred to a future version)
* SVG and Lottie media support
* Social publishing
* Public draft access

Future capabilities may be introduced by later Portfolio versions without changing the current feature contract.

---

# 3. Related Documents
| Document                                | Project Path                                                      | Purpose                                                            |
|-----------------------------------------|-------------------------------------------------------------------|--------------------------------------------------------------------|
| Portfolio V2 Specification              | `docs/portfolio-v2-spec.md`                                       | Defines project-level scope and architectural intent               |
| Article Rendering Guidelines            | `docs/guidelines/article-rendering-guideline.md`                  | Defines supported article body elements and rendering rules        |
| Media Guidelines                        | `docs/guidelines/media.md`                                        | Defines shared media handling and rendering rules                  |
| SEO Guidelines                          | `docs/guidelines/seo.md`                                          | Defines shared SEO and metadata conventions                        |
| ADR-0001: EditorJS to Tiptap            | `docs/adr/ADR-0001-EditorJS-to-Tiptap.md`                         | Architecture Decision Record for migrating from EditorJS to Tiptap |
| ADR-0002: Article Authoring Guidelines  | `docs/adr/ADR-0002-Article-Authoring-Guidelines.md`               | Architecture Decision Record for article authoring guidelines      |
| ADR-0004: Cherry-Pick Extraction Policy | `docs/adr/ADR-0004-Cherry-Pick-Extraction-Policy.md`              | Architecture Decision Record for cherry-pick extraction policy     |
| Private Publishing – Specification      | `docs/feature/private-publishing-infrastructure/specification.md` | Defines owner authentication and protected access                  |
| Public Content Platform – Readiness     | `docs/feature/public-content-platform/readiness.md`               | Readiness checklist for the public content platform                |
| Public Content Platform – Verification  | `docs/feature/public-content-platform/verification.md`            | Verification criteria for the public content platform              |
| Git Observatory                         | `docs/git-observatory.md`                                         | Documentation for git observatory tooling/process                  |

---

# 4. Domain Model

## 4.1 Article

An Article is an independently identifiable piece of technical content, published or unpublished.

An Article is strictly classified as either:

* **Standalone Article** — accessible via the public route `/blog/:articleSlug`.
* **Series Member Article** — accessible exclusively via the public route `/series/:seriesSlug/:articleSlug`.

Attempting to access a Series Member Article via `/blog/:articleSlug` shall result in a `404 Not Found` response. (Series Member Articles may still appear as cards within the `/blog` listing UI — see Section 6.14 — but their card destination resolves to the Series route, not the standalone route.)

An Article entity contains:

* Identity & Slug — includes a stable, slug-independent **Unique ID** assigned at creation, existing solely as forward groundwork for future redirect support (Section 16); no route or lookup behavior is built on it in this version.
* Metadata & SEO
* Content Body (TipTap/ProseMirror structure)
* Media references (Cover Image, Thumbnail)
* Tags
* Lifecycle State (`Draft`, `Published`, `Archived`)
* Lifecycle Timestamps: `created_at`, `updated_at`, `first_published_at`, `published_at`, `archived_at`
* Inbound References Tracking (`inbound_referencing_slugs: string[]`)
* Optional Series membership
* Optional Related Articles references
* Content References embedded in the body

---

## 4.2 Series

A Series is a first-class content entity representing a structured collection of semantically related Articles.

A Series has its own:

* Title — limited to a maximum of **36 characters**, enforced client- and server-side.
* Slug
* Unique ID — a stable, slug-independent identifier assigned at creation (Section 16 — forward groundwork only, no redirect behavior this version)
* Description
* Default Tags — a set of Tags defined at Series creation, automatically applied to every Article assigned to this Series (Section 6.12.3). Fixed at creation, since Series editing is out of scope for this version (Section 6.13.1).
* Header/Cover Image
* Thumbnail
* Alt Text metadata
* SEO Title, SEO Description, Canonical URL (when applicable) — mirroring the SEO metadata an Article carries (Section 6.2), since a Series has its own indexable public landing page (`/series/:seriesSlug`)
* Lifecycle Timestamps: `created_at`, `updated_at`

A Series is published as a standalone landing page at `/series/:seriesSlug`, which displays its associated Articles.

A Series shall contain one or more Articles when published.

`updated_at` reflects the last modification to the Series entity itself (e.g., Title, Description, media, or membership changes) and is the ordering key for the `/series` index listing (Section 6.23) — it is distinct from any Article's own publish date.

A Series may represent a thematic collection, a technical sequence, a book-related collection, or another intentionally grouped set of Articles. Example:

```text
Series
└── React Query
    ├── Introduction
    ├── Caching
    ├── Mutations
    └── Infinite Queries
```

---

## 4.3 Tag

Tags are reusable content classification entities stored in the database.

During Article creation, existing Tags shall be suggested while the owner types. If no suitable Tag exists, the owner may create a new Tag through the publishing interface. The Tag creation flow shall prevent duplicate Tags according to the project's Tag identity rules.

Tags may be used for:

* Article classification
* Related Article suggestions
* Content discovery
* SEO-oriented semantic relationships
* *(Future Consideration: grouping Tags into categories is planned for a later version and is not part of this version's scope.)*

---

## 4.4 Content Reference & Inbound Tracking

A Content Reference is a structured, inline reference from an Article body to another public content entity (Article or Series), rendered as a **Content Card**.

A Content Reference is not stored as a snapshot of the target's presentation metadata — it references the target entity so that its current title, description, thumbnail, and destination can be resolved by the renderer at read time.

To optimize deletion and archiving workflows, each Article document maintains an index of incoming references, `inbound_referencing_slugs`. When an Article is targeted for archiving or deletion, the system queries this array so the owner can be notified of impacted Articles.

### Fallback Behavior for Missing/Archived References

If an Article references Entity B, and Entity B subsequently becomes `Archived`, reverts to `Draft`, or is deleted:

* The renderer shall not break or omit the block.
* The Content Card shall render a graceful **Fallback Card State**, including:
  * **Header Badge:** "This article is currently unavailable"
  * **Body Description:** a standardized message explaining the content is unavailable
  * **Thumbnail:** a system-default neutral placeholder image

---

## 4.5 Content Card

The Content Card is a reusable presentation component for public content entities.

The same component may be used in:

* Article body references
* `/blog` article listings
* `/series` listings
* Series-related content displays

The card may represent either an Article or a Series, and may contain a Thumbnail, Title, Description, and a Series indicator/badge where applicable. The card destination shall resolve to the public route of the referenced entity (or to the Fallback Card State per Section 4.4). A Series Card, as shown on the `/series` index, may itself contain nested Article Content Cards for that Series' member Articles; the lazy-loading rules for those nested cards are defined in Section 6.23.

---

# 5. Article Lifecycle

## 5.1 Lifecycle States

```text
       ┌────────────────────────┐
       │         Draft          │◄────────────────┐
       └──────┬──────────┬──────┘                 │
              │          │                        │
      Publish │          │ Archive                │ Edit
              ▼          ▼                        │
       ┌──────────┐   ┌──────────┐                │
       │Published │──►│ Archived │────────────────┘
       └──────────┘   └──────────┘
              ▲______________│
                Republish (direct)
```

1. **Draft** — the initial state for all newly created Articles. A Draft may satisfy all metadata and content validation rules and still remain a Draft; passing validation does not automatically change Article state. Drafts are auto-saved continuously and are private, accessible only through protected administrative routes.
2. **Published** — publicly accessible. May appear in `/blog` (Standalone) or `/series/:seriesSlug` (Series Member), in recent Article listings, and in public Content Cards / References.
3. **Archived** — removed from the public publishing flow and public listings/APIs, but retained in the database for administrative review, editing, or restoration. Archiving does not delete the Article or its content.

## 5.2 Transition Rules

* **Draft → Published:** triggered manually via the "Publish" action after all required publication validation rules pass.
* **Draft → Archived:** optional direct administrative transition.
* **Published → Archived:** removes the Article from public access and public APIs; preserves content and metadata.
* **Published / Archived → Draft (editing):** clicking "Edit" moves the Article into working Draft state without deleting it from its current public/archived record until changes are explicitly saved or republished.
* **Archived → Published:** an Archived Article can be republished directly, without requiring an intermediate manual Draft step.

## 5.3 Deletion Policy

Article deletion is permanent and destructive. The system enforces two security levels depending on lifecycle state:

* **From Draft state:** a simple confirmation modal ("Are you sure you want to delete this draft?").
* **From Published or Archived state:** a high-security confirmation flow:
  1. The system prompts for Owner password re-authentication.
  2. The owner must manually type the exact Article Title into a confirmation field.
  3. Upon verification, the Article and its associated draft records are permanently purged.

## 5.4 Lifecycle & Audit Timestamps

Every Article record persists:

* `created_at`
* `updated_at` — also used for optimistic-locking concurrency control (Section 6.3)
* `first_published_at` — null until first publication; set once, immutable thereafter
* `published_at` — updated on each publish event (including republish from Archived)
* `archived_at` — set when the Article moves to Archived

---

# 6. Functional Requirements

## 6.1 Article Creation

The system shall allow the authenticated owner to create a new Article through the protected Add Article workflow, and shall reject unauthenticated access to Article creation.

The Article creation interface shall provide the following tabs:

```text
Metadata
Content
Related Articles
```

---

## 6.2 Article Metadata

The Metadata tab shall provide the following fields.

**Identity:** Title · Slug · Summary / Excerpt
**Classification:** Optional Series · Tags
**Media:** Cover Image · Thumbnail
**SEO:** SEO Title · SEO Description · Canonical URL, when applicable
**Publication:** Current lifecycle state

---

## 6.3 Article Title

The Article Title shall be rendered as the Article's only H1. The H1 is managed outside the TipTap editor, and the editor shall not offer an H1 heading option. Body headings are limited to H2, H3, and H4. Detailed body rendering behavior is defined by the Article Rendering Guidelines.

---

## 6.4 Slug Management & Locking

* Each Article shall have a unique slug within the applicable public routing namespace.
* The system shall reject reserved system names. The reserved-name list is stored in the database (not hardcoded in application code); for this version it has no admin management UI and is populated directly via seed data — an admin UI for managing this list is deferred to a future version. Initial seed values, at minimum: `archive`, `drafts`, `admin`, `api`, `preview`. Reserved-name validation applies wherever these names could conflict with system routes or content namespaces.
* **Client-side validation:** since the list is no longer bundled in front-end code, the Admin UI shall fetch it via `GET /api/reserved-slugs` (Section 10) to provide real-time inline feedback as the owner types a slug, rather than only surfacing the conflict at save/publish time.
* **Server-side validation remains authoritative:** regardless of the client-side check above, the server independently re-validates the slug against the database at save/publish time (Section 12) and does not trust the client's copy of the list.
* **Slug Locking Rule:** an Article slug remains editable until three days (72 hours) have elapsed from `first_published_at`. After that period, `Slug = Immutable`.
* **Owner Emergency Bypass:** the administrative UI provides an "Override Slug Lock" switch for emergency fixes (e.g., typos). Activating it displays a warning about SEO/404 risk before allowing modification.
* The current version does not provide automatic redirects when a slug changes; redirect mapping is deferred to a future version.

---

## 6.5 Summary / Excerpt

Each Article shall provide a Summary / Excerpt, suitable for Article listings, Content Cards, search/discovery interfaces, and SEO metadata where applicable. Exact character-length constraints shall be defined by the shared SEO/content guidelines before implementation.

---

## 6.6 Cover Image

Every Article shall have a Cover Image before it can be published. Cover Images shall:

* Be stored through the project's supported CDN/media infrastructure.
* Store their resolved URL/reference in the Article data.
* Have manually defined Alt Text, or an approved filename-derived fallback.
* Conform to the project's defined image dimensions and format requirements which is defined by the Media Guidelines.

---

## 6.7 Thumbnail

Every Article shall have a Thumbnail before it can be published, used for Article listings, Content Cards, and SEO/social metadata where applicable.

Thumbnail Alt Text shall be auto-generated from the Cover Image Alt Text using the pattern `<cover-alt>_thmb`, and is not independently editable through the Article form.

---

## 6.8 Tags

The system shall suggest Tags while the owner types, allow selecting existing Tags, and allow creating a new Tag when no appropriate one exists. The Tag creation flow shall prevent duplicates per the project's Tag identity rules.

---

## 6.9 Article Body

The Article body shall be edited using the existing TipTap editor, and the editor/renderer shall conform to the Article Rendering Guidelines. The body shall support the currently defined content elements, including:

* Paragraphs
* H2, H3, H4
* Blockquotes
* Code Blocks
* Ordered Lists, Unordered Lists
* Links
* Images
* Bold, Italic, Underline, Strike-through, Inline Code, Highlight

The Article body shall not contain an H1.

---

## 6.10 Content References

The Article body shall support structured references to Articles and Series. The owner shall be able to search for an existing public content entity and insert it into the body; the reference is represented as a Content Card, insertable at any valid block position supported by the editor.

Each referenced Article/Series records the referencing Article in its `inbound_referencing_slugs` index (Section 4.4). If the referenced entity later becomes unavailable (Archived, reverted to Draft, or deleted), the Content Card renders the Fallback Card State rather than breaking (Section 4.4).

The system shall not require a separate Previous Article / Next Article navigation model.

---

## 6.11 Related Articles

The Related Articles tab shall allow the owner to associate related Articles with the current Article.

**Suggestion list:** the tab shall present **all existing Articles** (no fixed cap), ordered by Tag overlap with the current Article's currently selected Tags (Section 6.8) — highest similarity first. The list is rendered eagerly, without pagination. Given the expected Article volume through the next planned upgrade cycle, an uncapped eager list is considered sufficient for this version; this should be revisited if that assumption changes. If the current Article has no Tags selected yet, the suggestion list is empty until Tags are chosen. Articles that belong to the same Series as the current Article are excluded from this list — Series co-membership already establishes that relationship (Section 6.12), and the Series landing page (Section 6.13.2) already surfaces it, so repeating it here would be redundant.

The owner shall be able to:

The owner shall be able to:

* Add a suggested Article from the list above
* Remove a previously added Article
* Reorder selected Articles

*(Deferred: a separate, manual out-of-list search action for Related Articles — for cases where the desired Article isn't surfaced by Tag overlap — is deferred to a future version, mirroring the same deferral already applied to Series search, Section 6.12.1.)*

Related Article selection is editorial metadata and shall not automatically publish or modify the referenced Articles. This is distinct from the automatic `inbound_referencing_slugs` tracking in Section 4.4, which tracks in-body Content References rather than curated editorial relationships. The system shall not implement an autonomous recommendation engine as part of this feature.

---

## 6.12 Series Membership

The owner may assign an Article to a Series; an Article may belong to zero or one Series.

Series membership does not exclude an Article from appearing as a card in the `/blog` listing, and Published Articles belonging to a Series remain part of the recent Article listing. However, per Section 4.1, a Series Member Article's direct route is `/series/:seriesSlug/:articleSlug` only — `/blog/:articleSlug` returns `404` for it, and its Content Card destination resolves to the Series route. The associated Series may be displayed as a visual badge on the Article's Content Card.

**Classification Immutability:** because this version has no automatic slug/route redirect mechanism (Section 2, Excluded; Section 6.4), an Article's classification as Standalone or Series Member is locked as soon as the Article is first published (`first_published_at` is set). Once locked, the owner cannot convert a Standalone Article into a Series Member, remove a Published Article from its Series to make it Standalone, or move it to a different Series — any of these would silently change the Article's public route with no redirect in place. This is a stricter, immediate lock than the 72-hour slug-editing grace window in Section 6.4, since it changes the route pattern itself rather than a slug value within the same pattern. While the Article remains in Draft (never published), Series assignment may be changed freely.

### 6.12.1 Series Selection Interface (Existing Series)

The Metadata tab's Series field shall present the owner with two options: **select an existing Series** or **create a new Series** (Section 6.12.2).

The existing-Series option shall present a flat, single-select list of the **20 most recently created Series**, ordered by `created_at` descending. *(Note: this ordering key is deliberately distinct from the `updated_at` ordering used by the public `/series` index, Section 4.2/6.23 — the Article form always surfaces the newest Series, regardless of which existing Series were most recently edited.)*

* The list is rendered eagerly, without lazy loading.
* Selection behaves as a single-select control (radio-style): selecting one Series visually indicates the choice and disables the remaining options, enforcing the zero-or-one Series constraint (Section 6.12).
* Search and pagination over the Series list are explicitly **out of scope for this version**. The 20-item cap is considered sufficient given the expected Series volume during this phase of the project; search/pagination for this picker is deferred to a future version, by which point later Portfolio versions are expected to have already introduced search/pagination for Series more broadly (Section 6.23 groundwork).

### 6.12.2 New Series Creation (Cross-Tab, Event-Driven)

Selecting "Create New Series" opens the Add Series interface (`/admin/add-series`, Section 9; field-level requirements in Section 6.13) in a **new browser tab**, rather than navigating away from the current Article form. The Add Series interface is also reachable directly from the admin dashboard, independent of the Article form. This preserves the in-progress Article Draft — including unsaved TipTap content and metadata state (Sections 6.15–6.16) — without risk of loss through navigation or refresh.

Upon successful creation of the Series in the new tab, the system shall broadcast a cross-tab event (e.g. `series-created`) using the browser's `BroadcastChannel` API, with a `localStorage`-event-based fallback for environments without `BroadcastChannel` support. The originating Article-form tab listens for this event and, upon receipt, shall:

* Update its Series selection list in place, prepending the newly created Series to the top of the 20-item list (Section 6.12.1).
* Perform this update without a full page reload and without requiring the owner to manually refresh.
* Leave the Article form's own unsaved state untouched.

This introduces event-driven, cross-tab client communication to the project for the first time. It is a browser-native mechanism — it does not require WebSocket support or additional backend/server infrastructure, and the server remains unaware of the cross-tab sync. As this is a pre-implementation design decision rather than a course-correction away from an already-underway approach, it is captured directly in this specification rather than as an ADR (Section 8's ADR requirement applies to decisions that change course after a direction was already substantially pursued); should this pattern later be revised after implementation, that revision would be the trigger for an ADR.

### 6.12.3 Series Default Tags & Inheritance

A Series may define a set of **Default Tags** (Section 4.2). When an Article is assigned to a Series (Section 6.12.1), those Default Tags become **inherited Tags** for that Article.

The Article's manually selected Tags and its inherited Tags are maintained as **logically independent sets**:

* **A — Manual Tags:** Tags explicitly selected by the owner for the Article.
* **B — Inherited Tags:** Default Tags provided by the Article's currently assigned Series.

The effective Tag set displayed in the UI (`out`) is derived from these two sets and must not be treated as the source of truth for either set.

The effective Tag set is:

```text
out = B + (A - B)
```

In other words, all inherited Tags are included, followed by those manually selected Tags that are not already present in the inherited set. A Tag that exists in both sets appears only once in `out`.

For example:

```text
A = [react, frontend, next.js, vercel]
B = [frontend, ux, fetch]

out = [frontend, ux, fetch, react, next.js, vercel]
```

The presence of an inherited Tag in `B` must **never mutate or remove the corresponding manually selected Tag in `A`**. The two sources remain independent even when they contain the same Tag.

Consequently, changes to the inherited set must not modify the manually selected set. If the Article's Series is unassigned, `B` becomes empty while `A` remains unchanged:

```text
B = []

out = [react, frontend, next.js, vercel]
```

In particular, a Tag such as `frontend` that was present in both `A` and `B` remains in `out` after the Series is unassigned because it continues to exist in `A`.

Similarly, when an Article is assigned to a different Series, the inherited set `B` is replaced by the Default Tags of the newly assigned Series. Inherited Tags from the previously assigned Series must not accumulate, and this replacement must not modify `A`.

Manually selected Tags remain independently removable by the owner at any time. Inherited Tags are not independently removable, editable, or exempt on a per-Article basis while the Article remains assigned to the Series that provides them. There is no mechanism to override or opt an individual Article out of one of its Series' Default Tags.

This is a deliberate editorial constraint, not a technical limitation: a Series' Default Tags are intended to describe every Article in that Series equally. If a specific Article does not fit one of its Series' Default Tags, this is treated as a signal that the Article's membership in that Series should be reconsidered at the editorial level, rather than as a case requiring a per-Article Tag exception.

Because Series editing is out of scope for this version (Section 6.13.1), a Series' Default Tags are fixed at Series creation for the duration of this version. No mechanism is provided to modify a Series' Default Tags or to propagate such a modification to Articles already assigned to the Series.

---

## 6.13 Series Creation & Metadata

The system shall allow the authenticated owner to create a Series through the protected Add Series workflow (`/admin/add-series`, Section 9), reachable either directly from the Article form's Series field (Section 6.12.2), and shall reject unauthenticated access.

**Relationship to Article Creation:** a Series is a lighter-weight content entity than an Article. Its creation form is deliberately narrower in scope than the Article form (Section 6.1):

* It has **no Content/body tab** — a Series has no rich-text body of its own; it is a container for Articles, not an authored document.
* It has **no "Related Series" tab or suggestion mechanism** analogous to Related Articles (Section 6.11). Cross-Series discovery is out of scope for this version.

Aside from those two omissions, a Series requires the same category of care as an Article regarding identity, media, and SEO metadata, since it has its own indexable, publicly linked landing page (`/series/:seriesSlug`).

### 6.13.1 Series Fields

The Add Series form shall provide a single **Metadata** tab (no additional tabs), with the following fields:

* **Identity:** Title (max 36 characters, Section 4.2) · Slug · Description · Default Tags (Section 6.12.3)
* **Media:** Header/Cover Image · Thumbnail
* **SEO:** SEO Title · SEO Description · Canonical URL, when applicable

A Series intended for publication shall contain, at minimum: Title, Slug, Description, Header/Cover Image, Thumbnail, and appropriate Alt Text metadata for both images. Header/Cover Alt Text shall be manually editable, consistent with the Article Cover Image treatment (Section 6.6); Thumbnail Alt Text follows the same auto-derivation pattern as Articles (`<cover-alt>_thmb`, Section 6.7) rather than being independently editable. *(Assumption carried over from the existing Alt Text field in Section 4.2, which did not previously distinguish Header vs. Thumbnail Alt Text — flag for confirmation if a different treatment was intended.)*

Series slugs follow the same reserved-name and uniqueness rules as Article slugs within their own namespace (Section 6.4). Editing or deleting a Series after creation is out of scope for this version — a Series' fields, including its Default Tags (Section 6.12.3), are fixed once created. A dedicated Series edit/delete workflow, along with Series slug-editability, is deferred to a future version, alongside automatic Article slug/route redirect support (Section 16).

### 6.13.2 Series Landing Page & Article Ordering

A Series shall have a public landing route `/series/:seriesSlug`, displaying its associated Articles. Articles within the Series shall be sortable according to the visitor's selected ordering preference:

* Newest first (default)
* Oldest first

An Article belonging to a Series uses `/series/:seriesSlug/:articleSlug` as its public route.

---

## 6.14 Blog Listing

Published Standalone Articles are available at `/blog/:articleSlug`; the `/blog` index displays recent Published Articles and may include Series Member Articles as cards (linking to their Series route) per Section 6.12. Article cards may display a Series badge when applicable; the badge label is the Series Title, subject to the 36-character limit in Section 4.2.

**Ordering:** Articles in the `/blog` listing — regardless of Standalone or Series-Member classification — are ordered by `first_published_at`. The visitor may choose Newest First (default) or Oldest First. `first_published_at` is used rather than `published_at` so that editing and republishing an Article does not reorder it within the listing.

**Pagination & Lazy Loading:** the `/blog` index is paginated; see Section 6.22 for pagination size, prefetch, and failure-handling rules.

The Blog and Series listing interfaces may reuse the same Content Card presentation primitive used by Article body references.

---

## 6.15 Draft Auto-Save, Retry, & LocalStorage Fallback

Auto-save triggers automatically after approximately **5 seconds of inactivity** following any relevant change, restarting the inactivity timer on each new change. Relevant changes include metadata, content, tag, Series, Related Article, media, and SEO metadata changes.

The interface communicates save state to the owner; at minimum: `Saving`, `Saved`, `Save Failed`.

**Network failure & exponential backoff:** if an auto-save request fails due to network or server error, the system executes an automatic retry sequence:

* Retry 1: +0.5s
* Retry 2: +1.0s
* Retry 3: +2.0s
* Retry 4: +4.0s
* Retry 5: +8.0s

If all retries fail, a persistent toast notification appears: "Network connection issue. Auto-save failed."

**LocalStorage caching:** before the initial network request (or upon the first failed attempt), the client immediately caches the full unsaved document state to browser LocalStorage. This cache is cleared immediately upon a successful server auto-save response.

---

## 6.16 Draft Recovery

The system shall preserve the latest successfully saved Draft state and shall not silently discard successfully autosaved Article content.

If the owner refreshes the page, closes and reopens the editor, loses the browser tab, experiences a temporary network failure, or experiences token/session expiration mid-edit, the latest recoverable Draft state shall be restored — from the server-persisted Draft where available, or from the LocalStorage cache per Section 6.15 when the server save had not yet succeeded.

---

## 6.17 Concurrency Control (Optimistic Locking)

To prevent lost updates when the owner edits the same Article in multiple browser tabs or sessions:

* Every update request includes the Article's last known `updated_at` timestamp.
* The server rejects updates where the incoming `updated_at` is older than the current database record.
* On conflict, the client prompts the owner to reload the latest version before continuing.

---

## 6.18 Preview

The owner shall be able to preview an Article without publishing it. Preview renders the Article using the same public presentation rules as the Published Article wherever technically applicable, and supports Articles belonging to a Series.

Route patterns:

```text
/preview/:articleSlug
/preview/:seriesSlug/:articleSlug
```

These routes are treated as the working protected routes for this spec.

Preview content shall remain inaccessible to unauthenticated public users.

---

## 6.19 Publishing

The owner shall be able to publish a Draft after all required publication validation rules pass. Publishing shall verify at minimum:

* Required metadata
* Required media
* Slug uniqueness
* Reserved slug restrictions
* Valid Series membership, when present
* Valid Tags
* Valid Content References
* Valid Article body structure

A successful publish operation shall:

1. Persist the final Article state.
2. Set `published_at`, and set `first_published_at` only if this is the first publication (immutable thereafter).
3. Change the Article lifecycle state to Published.
4. Make the Article publicly accessible.
5. Make the Article eligible for Blog and Series listings.

---

## 6.20 Archiving & Restoration

The owner shall be able to archive a Published Article through protected administrative functionality. Archiving shall:

* Preserve Article content and metadata.
* Set `archived_at`.
* Remove the Article from public Published listings and public APIs.
* Keep the Article available through protected administrative functionality.

Archiving shall not delete the Article. An Archived Article may be restored — republished directly without an intermediate Draft step (Section 5.2) — or edited (which moves it to Draft, per Section 5.2) before republishing.

---

## 6.21 Deletion

The owner shall be able to permanently delete an Article through protected administrative functionality, subject to the security levels defined in Section 5.3:

* Draft: simple confirmation modal.
* Published or Archived: password re-authentication plus typed title confirmation, per Section 5.3.

Deletion is permanent; the Article and its associated draft records are purged. Before deleting a Published or Archived Article, the owner should be able to consult its `inbound_referencing_slugs` (Section 4.4) to understand which other Articles reference it and will fall back to the unavailable-content Card state.

---

## 6.22 Blog Listing Pagination & Lazy Loading

**Page size:** the `/blog` index returns Articles **20 per page**, fixed. The system shall not offer the visitor a choice of page size (no "show more/fewer per page" control).

**Ordering:** per Section 6.14 — `first_published_at`, Newest First by default, Oldest First as the alternative — applied consistently across all pages.

**Next-page prefetch:** when a page finishes loading successfully, the client shall proactively fetch and cache the next **two** pages (if they exist), so they are ready to render instantly without a loading state when the visitor navigates to them.

**Article content prefetch:** when a page finishes loading successfully, the client shall also proactively fetch the full content of the **first two Articles** shown on that page, so that navigating into either is instant.

**Prefetch failure handling:** a failed next-page or article-content prefetch is independent of the primary page load having already succeeded. The client retries the failed prefetch using the same exponential-backoff sequence defined in Section 6.15 (0.5s → 1.0s → 2.0s → 4.0s → 8.0s across 5 attempts). If all retries fail, **no toast or error notification is shown to the visitor** — this differs from the auto-save failure behavior in Section 6.15, where a toast is shown. Content that failed to prefetch is instead fetched normally (with a standard loading state) if and when the visitor actually navigates to it.

---

## 6.23 Series Listing Pagination & Lazy Loading

**Page size:** the `/series` index returns Series **20 per page**, fixed, mirroring Section 6.22. The system shall not offer the visitor a choice of page size.

**Ordering:** Series are ordered by `updated_at` (Section 4.2) — the Series' own last-modified timestamp, not any member Article's publish date. Newest First is the default; the visitor may switch to Oldest First.

**Next-page prefetch:** identical to Section 6.22 — on successful load of a page, the next two pages of Series (if they exist) are proactively fetched and cached.

**Card-level lazy loading:** when a page of the `/series` index finishes loading, the client shall lazy-load the Article Content Cards nested within the **first two Series** shown on that page (e.g., if `series/xyz` and `series/abc` are the first and second Series on the loaded page, their nested Article Cards are lazy-loaded). This is scoped to exactly one level: it fetches only the nested Article Card components belonging to those two Series — it does **not** further prefetch the full content of the Articles those nested cards represent (that only happens per the ordinary Section 6.22 rules if the visitor navigates into `/blog` or the Series page itself).

**Prefetch failure handling:** identical to Section 6.22 — exponential backoff per Section 6.15, and no toast shown after final failure.

---

## 6.24 Rate Limiting

All API routes introduced by this feature (Section 10) — both the protected/administrative Article-management routes and the public Blog/Series listing and pagination routes — are governed by the same rate limiter introduced for the Private Publishing Infrastructure feature (`docs/feature/private-publishing-infrastructure/specification.md`). This feature does not introduce a separate or modified rate-limiting policy; the existing rules are reused as-is.

---

# 7. User Flows

## 7.1 Article Creation & Lifecycle

```text
Authenticated Owner
       │
       ▼
Admin Dashboard ──► Add / Edit Article
       │
       ▼
┌─────────────────────────────┐
│ Metadata                    │
│ Content                     │
│ Related Articles            │
└─────────────────────────────┘
       │
       ├── Autosave ────────► Draft
       │
       ▼
     Preview
       │
       ▼
 Validation
       │
       ▼
    Publish ──► Published ──► Archive ──► Archived
                                             │
                                    Republish (direct) or Edit → Draft
```

## 7.2 Draft Auto-Save, Retry & Recovery

```text
Editor
  │
  ▼
User Typing ─► Cache to LocalStorage (instant)
  │
  ▼
5s Inactivity
  │
  ▼
API Auto-Save Call
  │
  ├──────────────┬───────────────────┐
Success                          Failure
  │                                  │
Clear LocalStorage           Exponential Backoff
Status: "Saved"                (0.5s → 8s)
                                     │
                              All Retries Failed?
                                     │
                          Show "Save Failed" Toast
                        (data preserved in LocalStorage)
                                     │
                          Session Recovery on next load
                          (refresh / reopen / reconnect)
                                     │
                              Restore Draft
```

---

# 8. Technical Design

The feature shall integrate with the existing owner authentication infrastructure.

The Article editor shall use the existing TipTap-based editor, extended only where required to support the Portfolio V2 content model.

The implementation shall separate:

* Article domain data
* Editorial state
* Rich content representation
* Media references
* Public rendering
* Administrative operations

The Article body shall be stored in a structured representation compatible with TipTap/ProseMirror rather than as presentation-specific HTML. Content Reference nodes shall identify their target entity rather than duplicating its display metadata; public rendering resolves referenced entities according to their current public state (including the Fallback Card State, Section 4.4).

Architectural decisions that affect the broader platform shall be documented through ADRs rather than duplicated in this specification.

---

# 9. Routes

## Public

```text
/blog
/blog/:articleSlug            (Standalone Articles only — 404 for Series Member slugs)

/series
/series/:seriesSlug
/series/:seriesSlug/:articleSlug
```

## Protected

```text
/admin/add-article
/admin/add-series
/admin/articles/drafts
/admin/articles/archive
/admin/articles/:id/edit

/preview/:articleSlug
/preview/:seriesSlug/:articleSlug
```

The final route structure shall be aligned with the existing Admin and authentication conventions.

---

# 10. API

Exact endpoint naming shall follow existing API conventions. Public read APIs shall expose only Published content; Draft and Archived content shall not be exposed through public APIs.

| Method | Endpoint                         | Description                                                                               | Auth Required |
|--------|----------------------------------|-------------------------------------------------------------------------------------------|---------------|
| POST   | `/api/articles`                  | Create Article Draft                                                                      | Yes           |
| GET    | `/api/articles/:id`              | Retrieve Article for editing                                                              | Yes           |
| PATCH  | `/api/articles/:id`              | Update / auto-save Article Draft                                                          | Yes           |
| POST   | `/api/articles/:id/publish`      | Publish Article                                                                           | Yes           |
| POST   | `/api/articles/:id/archive`      | Archive Article                                                                           | Yes           |
| DELETE | `/api/articles/:id`              | Permanently delete Article (requires auth verification per Section 5.3)                   | Yes           |
| GET    | `/api/articles/:id/preview`      | Retrieve protected preview data                                                           | Yes           |
| GET    | `/api/articles/:id/inbound-refs` | Query Articles referencing this slug                                                      | Yes           |
| GET    | `/api/tags`                      | Search existing Tags                                                                      | Yes           |
| POST   | `/api/tags`                      | Create Tag                                                                                | Yes           |
| GET    | `/api/articles/search`           | Search Articles for references/related content                                            | Yes           |
| POST   | `/api/series`                    | Create Series (Section 6.12.2)                                                            | Yes           |
| GET    | `/api/series/recent`             | Top 20 most recently created Series, for Article-form picker (6.12.1)                     | Yes           |
| GET    | `/api/reserved-slugs`            | Fetch current reserved-name list, for real-time client-side slug validation (Section 6.4) | Yes           |
| GET    | `/api/blog`                      | Paginated list of Published Articles for `/blog` (Section 6.22)                           | No            |
| GET    | `/api/series`                    | Paginated list of Series for `/series` (Section 6.23)                                     | No            |

Individual public Article/Series content prefetch (Sections 6.22–6.23) reuses the existing public rendering/data-fetching mechanism for those routes (Section 9) rather than introducing dedicated prefetch endpoints.

---

# 11. State Management

## Server State

* Article metadata, body, and lifecycle state
* Tags
* Series membership
* Related Articles
* Media references
* Lifecycle timestamps (`created_at`, `updated_at`, `first_published_at`, `published_at`, `archived_at`)
* `inbound_referencing_slugs`
* Slug locking state

The server is the source of truth for persisted Article state.

## Client State

* Active editor tab
* Current TipTap document state
* Unsaved changes / LocalStorage cache of unsaved state
* Autosave timer and retry/backoff state
* Save status
* Preview state
* Temporary form state
* Tag search input
* Related Article selection UI
* Content Reference selection UI
* Series selection list (top 20 recent) and its cross-tab `series-created` event listener state (Section 6.12.2)
* Blog/Series pagination state and prefetch cache (next pages, prefetched Article content, prefetched Series Article Cards — Sections 6.22–6.23)

The client shall not treat unsaved editor state as successfully persisted until the server confirms the save.

---

# 12. Content and Media Rules

**Article Body:** shall comply with the Article Rendering Guidelines and shall contain no H1.

**Cover Image / Thumbnail:** both required for publication. Thumbnail Alt Text is derived from Cover Alt Text via `<cover-alt>_thmb` and is not independently editable.

**Supported Image Formats:** JPEG, JPG, PNG, GIF. SVG and Lottie are deferred to a future version.

**CDN:** media assets use the project's supported CDN infrastructure; the database stores the resulting media reference/URL rather than the binary asset.

---

# 13. Security Considerations

**Authentication:** all write operations require successful owner authentication.

**Authorization:** only the site owner may create, edit, publish, archive, restore, or delete Articles; manage Drafts; manage protected previews; or create Tags through the administrative interface. No public user has write access.

**Sensitive Deletion Security:** deleting a Published or Archived Article requires password re-authentication and typed title confirmation (Section 5.3); Draft deletion requires only a simple confirmation.

**Validation:** validation occurs server-side regardless of client-side validation. The server shall not trust client lifecycle state, client authorization state, client slug validation, client content validation, or client media metadata.

**Potential Risks:**

* Unauthorized write access
* Draft/preview data exposure
* Slug conflicts
* Invalid or broken Content References
* Malicious rich-content payloads
* Invalid media references
* Autosave race conditions / lost updates (mitigated by optimistic locking, Section 6.17)
* Expired authentication during editing (mitigated by LocalStorage fallback, Section 6.15–6.16)
* Accidental or unauthorized permanent deletion (mitigated by Section 5.3's re-authentication flow)
* Abuse of public Blog/Series listing and pagination endpoints (mitigated by the reused rate limiter, Section 6.24)

Rich content shall be sanitized and validated according to the application's security model before public rendering.

---

# 14. Reference Implementation Structure

```text
src/
├── features/
│   └── article-publishing/
│       ├── components/
│       │   ├── article-form/
│       │   ├── article-metadata/
│       │   ├── article-editor/
│       │   ├── related-articles/
│       │   ├── content-reference/
│       │   ├── preview/
│       │   └── content-card/
│       │
│       ├── hooks/
│       │   ├── use-article-autosave
│       │   ├── use-article-preview
│       │   └── use-article-validation
│       │
│       ├── services/
│       ├── schemas/
│       ├── types/
│       └── utils/
│
├── app/
│   ├── admin/
│   │   ├── add-article/
│   │   └── articles/
│   │
│   ├── blog/
│   ├── series/
│   └── preview/
│
└── ...
```

This structure is illustrative and shall follow the existing project architecture.

---

# 15. Dependencies

## Requires

* Owner authentication
* Protected route infrastructure
* Existing TipTap editor
* Existing design system
* Database
* Media/CDN infrastructure
* Existing API infrastructure
* Rate limiter from the Private Publishing Infrastructure feature (Section 6.24)

## Enables

* Public Blog
* Public Series
* Article discovery
* Content References
* Related Article discovery
* SEO metadata generation
* JSON-LD generation
* Future article search
* Future Engineering Experience integrations

---

# 16. Notes

**Public Article Discovery:** a Published Article remains discoverable through `/blog` regardless of Series membership; Series membership is an additional semantic relationship and does not replace Blog discovery, though direct-route access differs by type (Section 4.1).

**Series Navigation:** Series navigation does not use Previous Article / Next Article controls as part of this feature; Series pages provide sorted Article listings instead.

**Content Card Reuse:** the Content Card is a shared content presentation primitive, reusable across Blog listings, Series listings, and Article body references — including its Fallback Card State for unavailable references.

**Future Redirect Support:** automatic redirect handling for changed Article slugs is intentionally deferred. The current implementation relies on slug locking (three days from `first_published_at`, with an owner emergency bypass) as the primary mechanism for preserving stable public URLs. As forward groundwork only, both Article and Series entities now carry a stable, slug-independent Unique ID (Sections 4.1, 4.2); this version does not expose any route, lookup, or redirect behavior based on that ID — it exists solely to simplify a future redirect implementation.

---

# 17. Changelog

| Version | Date       | Changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|---------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.0     | 2026-08-08 | Initial specification                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1.1     | 2026-08-09 | Added Series Selection Interface (6.12.1) and event-driven, cross-tab New Series Creation flow (6.12.2); added `/admin/add-series` route and related API endpoints; updated Client State list                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.2     | 2026-08-09 | Removed the ADR-open-question note from 6.12.2 in favor of folding the decision directly into this spec, per project ADR philosophy (ADRs mark course-corrections, not pre-build decisions); added SEO metadata fields to the Series domain model (4.2); expanded 6.13 into full Series Creation & Metadata requirements (fields, tabs, explicit scope difference from Article creation); clarified the Related Articles suggestion mechanism (6.11) as a top-20 Tag-similarity list, distinct from the separate manual search action                                                                                                                                                                                                                             |
| 1.3     | 2026-08-10 | Section 6.4: reserved slug names are now DB-sourced and validated dynamically, rather than hardcoded — no admin management UI this version (deferred); listed names are the initial seed data                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.4     | 2026-08-15 | Related Articles suggestion list (6.11) changed from a capped top-20 to an uncapped, eagerly-rendered full list; manual out-of-list search action removed/deferred to a future version; same-Series Articles now excluded from the suggestion list. Added Series Default Tags & Inheritance (6.12.3) and a corresponding Default Tags field (4.2, 6.13.1). Clarified Series is not editable or deletable in this version (6.13.1), superseding the prior "assumed unlocked/always-editable" slug note. Added a stable, slug-independent Unique ID to Article (4.1) and Series (4.2) as forward groundwork for future redirect support (Section 16); no redirect behavior implemented this version. Added a Future Consideration note on Tag categorization (4.3). |