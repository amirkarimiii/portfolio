# Public Content Platform (Core V2) Verification

# 1. Purpose

Define the verification strategy for the Public Content Platform (Core V2) feature.

This document specifies how compliance with `docs/feature/public-content-platform/specification.md` is evaluated and verified.

Verification activities must validate functional behavior, lifecycle correctness, authorization enforcement, security requirements, public-listing behavior, and integration behavior.

---

# 2. Verification Scope

The following feature requirements must be verified:

* Article creation, metadata, and body editing
* Article lifecycle transitions (Draft, Published, Archived)
* Slug management and locking
* Series domain rules and Standalone/Series-Member classification immutability
* Tags (suggestion, creation, duplicate prevention)
* Content References and inbound-reference tracking
* Related Articles management
* Cover Image / Thumbnail requirements
* Draft auto-save, retry, and LocalStorage fallback
* Draft recovery
* Concurrency control (optimistic locking)
* Preview
* Publishing, archiving, and restoration workflows
* Deletion policy and its two security levels
* Blog and Series public listings, ordering, pagination, and lazy loading
* Reuse of the shared rate limiter
* SEO metadata generation

---

# 3. Functional Verification

## Article Creation

Verify:

* An authenticated owner can create a new Article Draft through the protected Add Article workflow.
* Unauthenticated access to Article creation is rejected.
* The creation interface exposes the Metadata, Content, and Related Articles tabs.
* A Draft may pass all validation rules and still remain a Draft (validation success does not auto-publish).

## Article Metadata

Verify:

* Title, Slug, Summary/Excerpt, Series, Tags, Cover Image, Thumbnail, SEO Title, SEO Description, and Canonical URL fields are present and editable.
* The Article Title renders as the Article's only H1, and the body editor offers no H1 option.
* Body headings are limited to H2–H4.

## Slug Management & Locking

Verify:

* Slugs are unique within their applicable public routing namespace.
* Reserved names (`archive`, `drafts`, `admin`, `api`, `preview`, at minimum) are rejected.
* A slug remains editable until 72 hours have elapsed from `first_published_at`, then becomes immutable.
* The "Override Slug Lock" bypass allows emergency edits after displaying an SEO/404-risk warning.
* No automatic redirect is created when a slug changes.

## Series Domain Rules

Verify:

* A Series Title is rejected beyond 36 characters (client and server).
* A Series requires Title, Slug, Description, Header/Cover Image, Thumbnail, and Alt Text before publication.
* A Series persists `created_at` and `updated_at`, and `updated_at` changes when the Series entity itself is modified.
* An Article may belong to zero or one Series.
* A Standalone/Series-Member classification cannot be changed once the Article is first published; it can still be changed freely while the Article is in Draft.
* Attempting to change a Published Article's classification (Standalone ↔ Series Member, or to a different Series) is rejected.

## Tags

Verify:

* Existing Tags are suggested as the owner types.
* A new Tag can be created when no suitable Tag exists.
* Duplicate Tag creation is prevented per the project's Tag identity rules.

## Article Body

Verify:

* The TipTap editor supports paragraphs, H2–H4, blockquotes, code blocks, ordered/unordered lists, links, images, and inline formatting (bold, italic, underline, strike-through, inline code, highlight).
* The body cannot contain an H1.
* The body conforms to the Article Rendering Guidelines.

## Content References & Inbound Tracking

Verify:

* The owner can search for and insert an Article or Series reference as a Content Card at any valid block position.
* Inserting a reference adds the referencing Article's slug to the target's `inbound_referencing_slugs`.
* When a referenced entity becomes Archived, reverts to Draft, or is deleted, the Content Card renders the Fallback Card State (header badge, body description, neutral placeholder thumbnail) instead of breaking.

## Related Articles

Verify:

* The owner can add, remove, search for, and reorder Related Articles.
* Related Article suggestions are influenced by shared Tags.
* Selecting a Related Article does not publish or otherwise modify the referenced Article.
* Related Article associations remain distinct from `inbound_referencing_slugs`.

## Cover Image, Thumbnail & Media

Verify:

* Publication is blocked when Cover Image or Thumbnail is missing.
* Cover Image Alt Text can be manually set or falls back to an approved filename-derived value.
* Thumbnail Alt Text is auto-derived as `<cover-alt>_thmb` and is not independently editable.
* Only JPEG, JPG, PNG, and GIF are accepted; SVG and Lottie are rejected.
* Media is stored via the project's CDN, with only the resolved reference/URL persisted on the Article.

---

# 4. Lifecycle Verification

## Transitions

Verify:

* Draft → Published occurs only via the Publish action after all required validation passes.
* Draft → Archived is available as a direct administrative transition.
* Published → Archived removes the Article from public access/APIs while preserving content and metadata.
* Published/Archived → Draft ("Edit") does not delete the current public/archived record until changes are explicitly saved or republished.
* Archived → Published (republish) does not require an intermediate manual Draft step.

## Timestamps

Verify:

* `first_published_at` is null until first publication, then set once and never changes thereafter.
* `published_at` updates on every publish event, including republish from Archived.
* `archived_at` is set on transition to Archive.
* `updated_at` changes on every Article update and is used for optimistic-locking checks (Section 6.17).

## Deletion Policy

Verify:

* Deleting a Draft requires only a simple confirmation modal.
* Deleting a Published or Archived Article requires password re-authentication followed by typed-title confirmation before the record is purged.
* A successful deletion permanently removes the Article and its associated draft records.
* Before deletion of a Published/Archived Article, the owner can view its `inbound_referencing_slugs` to identify Articles that will fall back to the unavailable-content Card state.

---

# 5. Public Listing Verification

## Blog Listing (`/blog`)

Verify:

* The index lists Published Articles ordered by `first_published_at`, Newest First by default, with the Oldest First option.
* Editing/republishing an Article does not change its position in the listing (i.e., ordering is not driven by `published_at`).
* Series Member Articles appear as cards linking to their Series route, not to `/blog/:articleSlug`.
* `/blog/:articleSlug` returns `404` for a Series Member Article's slug.
* A Series badge appears on cards for Series Member Articles, displaying the Series Title (≤ 36 characters).

## Series Listing (`/series` and `/series/:seriesSlug`)

Verify:

* The `/series` index lists Series ordered by `updated_at`, Newest First by default, with the Oldest First option — not by any member Article's publish date.
* `/series/:seriesSlug` displays the Series' Articles, sortable Newest First (default) / Oldest First.
* `/series/:seriesSlug/:articleSlug` resolves the correct Article; no Previous/Next Article navigation is present.

## Blog Pagination & Lazy Loading

Verify:

* `/blog` returns exactly 20 Articles per page, with no visitor-facing page-size control.
* On successful load of page N, pages N+1 and N+2 are prefetched and cached (when they exist) and render instantly on navigation.
* On successful load of a page, the full content of the first two Articles on that page is prefetched.
* A failed next-page or article-content prefetch retries on the same exponential-backoff schedule as auto-save (0.5s/1.0s/2.0s/4.0s/8.0s).
* No toast or error notification appears after all prefetch retries fail.
* Content that failed to prefetch loads normally (with a loading state) when the visitor actually navigates to it.

## Series Pagination & Lazy Loading

Verify:

* `/series` returns exactly 20 Series per page, with no visitor-facing page-size control.
* On successful load of page N, pages N+1 and N+2 of Series are prefetched and cached.
* On successful load of a page, the nested Article Content Cards belonging to the first two Series on that page are lazy-loaded.
* Lazy loading does not recurse into the full content of the Articles represented by those nested cards.
* Prefetch failures follow the same silent exponential-backoff/no-toast behavior as Section 6.22.

---

# 6. Resilience Verification

## Draft Auto-Save, Retry & LocalStorage Fallback

Verify:

* Auto-save fires after ~5 seconds of inactivity following a relevant change, and the inactivity timer restarts on each new change.
* Save status is communicated as at minimum `Saving`, `Saved`, `Save Failed`.
* A failed auto-save retries at +0.5s, +1.0s, +2.0s, +4.0s, +8.0s.
* A persistent "Network connection issue. Auto-save failed." toast appears only after all auto-save retries are exhausted.
* Unsaved document state is cached to LocalStorage before the first network attempt (or on first failure), and cleared immediately on successful server save.

## Draft Recovery

Verify:

* The latest server-persisted Draft is restored after a page refresh, tab loss, temporary network failure, or session/token expiry.
* When the server save had not yet succeeded, the LocalStorage cache is used for recovery instead.
* Successfully autosaved content is never silently discarded.

## Concurrency Control (Optimistic Locking)

Verify:

* Every update request includes the Article's last known `updated_at`.
* The server rejects an update whose `updated_at` is older than the current database record.
* On conflict, the client prompts the owner to reload the latest version before continuing.

## Preview

Verify:

* The owner can preview an unpublished Article at `/preview/:articleSlug` or `/preview/:seriesSlug/:articleSlug`.
* Preview rendering matches public presentation rules wherever technically applicable, including for Series-context Articles.
* Preview content is inaccessible to unauthenticated users.

---

# 7. Authorization Verification

## Administrative Access

Verify:

* Only the authenticated owner can create, edit, publish, archive, restore, or delete Articles, and can create Tags through the administrative interface.
* No public user has write access to any Article, Series, or Tag data.
* Protected API routes (Section 10) reject unauthenticated requests.

## Sensitive Operations

Verify:

* Draft deletion requires only simple confirmation; Published/Archived deletion requires password re-authentication plus typed-title confirmation.
* Slug lock bypass requires the explicit "Override Slug Lock" action and displays its warning before allowing the edit.

---

# 8. Security Verification

## Validation

Verify:

* Server-side validation is enforced independently of client-side validation for lifecycle state, authorization state, slug rules, content structure, and media metadata.
* Publishing is blocked unless required metadata, required media, slug uniqueness, reserved-slug restrictions, valid Series membership, valid Tags, valid Content References, and valid body structure all pass.

## Content Safety

Verify:

* Rich content is sanitized before public rendering.
* Malicious or malformed rich-content payloads are rejected or neutralized server-side.
* Invalid or broken Content References do not break page rendering (Fallback Card State, Section 4.4).

## Abuse Protection

Verify:

* The rate limiter reused from the Private Publishing Infrastructure feature is enforced on this feature's protected/administrative routes.
* The same rate limiter is enforced on the public `/api/blog` and `/api/series` listing/pagination routes.
* Repeated abusive requests to public listing/pagination endpoints trigger the expected rate-limiting behavior.

---

# 9. Integration Verification

## Frontend Integration

Verify:

* The Article editor integrates correctly with the existing TipTap editor and design system.
* Tag search, Related Article selection, and Content Reference selection UI integrate correctly with their respective search/suggestion APIs.
* Blog/Series listing pages integrate correctly with pagination and prefetch/lazy-load state.

## Backend Integration

Verify:

* Article, Series, and Tag APIs integrate correctly with their underlying repositories and application services.
* Request validation is applied consistently across all endpoints in Section 10.
* Public read APIs (`/api/blog`, `/api/series`, and existing public routes) expose only Published content; Draft and Archived content is never exposed.

## Runtime Integration

Verify:

* Media/CDN integration correctly stores and resolves Cover Image and Thumbnail references.
* Database connectivity supports Article, Series, and Tag persistence and the optimistic-locking check.
* The existing owner authentication system correctly gates all write operations of this feature.

---

# 10. Failure Verification

The following failure scenarios must be verified:

## Editing & Persistence Failures

* Network failure during auto-save (all retries exhausted)
* Session/token expiry mid-edit
* Concurrent edit conflict (stale `updated_at`)
* Browser tab loss / crash mid-edit

## Publishing & Lifecycle Failures

* Publish attempted with missing required metadata or media
* Publish attempted with a slug conflict or reserved slug
* Publish attempted with an invalid Content Reference
* Attempted classification change (Standalone ↔ Series Member) on a Published Article
* Attempted slug edit after the 72-hour lock without the emergency bypass

## Public Listing Failures

* Next-page prefetch failure on `/blog` or `/series`
* Article-content prefetch failure on `/blog`
* Nested Article Card prefetch failure on `/series`
* Request to a Series Member Article's slug via `/blog/:articleSlug`
* Reference to an Article/Series that becomes unavailable after being referenced

## Deletion Failures

* Deletion attempted with incorrect password re-authentication
* Deletion attempted with a mismatched typed title

Verification must confirm that all of the above are handled safely, produce predictable behavior, and — for public prefetch failures specifically — remain silent (no toast) per Sections 6.22–6.23.

---

# 11. Regression Verification

Verify that introduction of this feature does not negatively affect:

* Owner authentication and session behavior (Private Publishing Infrastructure feature)
* Existing public routes and navigation outside `/blog` and `/series`
* Existing API response standards
* Main portfolio functionality

---

# 12. Explicit Non-Goals

The following items are outside verification scope:

* Public article creation, editing, or authentication
* Multi-author or administrator-role workflows
* Comments, Likes, Bookmarks
* Autonomous recommendation engines
* Automatic editorial content generation
* Automatic Series creation
* Automatic redirect handling after slug changes
* SVG and Lottie media support
* Social publishing
* Public draft access

---

# 13. Verification Evidence

Verification evidence may include:

* Automated test results
* Manual verification records
* API validation results
* Publishing/lifecycle workflow validation
* Pagination and lazy-load behavior recordings
* CI pipeline results
* Runtime execution logs
