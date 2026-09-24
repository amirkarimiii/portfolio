# Admin UI Access to Drafts and Archives

* **owner:** Amir Karimi
* **category:** Scope Cut
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** 2.0.1
* **last update:** TBD
* **related:**

    * `docs/feature/public-content-platform/`

## Context

Administrative pages for drafts and archived articles are currently accessible only through their direct URLs.

Although these pages are available and functional, the administrative experience does not currently provide UI-based entry points for reaching them.

The need for convenient administrative access through the UI is known, but the specific UI design is intentionally not captured in this deviation.

## Decision

UI-based access to the drafts and archived article pages is excluded from the 2.0 scope and deferred to 2.0.1.

The administrative experience should provide appropriate UI entry points for accessing these pages.

This deviation records only the absence of UI-based access and the need to provide it. The specific placement, design, and interaction model are left to the corresponding implementation and specification work.

## Trade-offs

* Draft and archive pages remain accessible to administrators through direct URLs.
* The 2.0 administrative experience does not provide convenient UI navigation to these pages.
* Deferring the UI entry points keeps the current scope focused while preserving the requirement for a later administrative experience.

## Risk

The main impact is reduced discoverability and convenience for administrators, since access depends on knowing or obtaining the relevant URLs.

No additional functional limitation to the underlying draft or archive pages is introduced by this deviation.

## Resolution

Deferred to 2.0.1.

Provide UI-based access to the drafts and archived article pages as part of the administrative experience. The specific UI design should be defined in the relevant specification and implementation work.
