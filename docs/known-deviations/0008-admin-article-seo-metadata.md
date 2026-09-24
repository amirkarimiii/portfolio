# Admin Article Metadata

* **owner:** Amir Karimi
* **category:** Scope Cut
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** 2.0.1
* **last update:** TBD
* **related:**

    * `docs/feature/public-content-platform/`

## Context

The current article view does not provide administrators with additional article metadata beyond what is available to an unauthorized guest user.

Administrators need to be able to inspect article metadata while viewing an article without entering edit mode. This includes SEO-related metadata as well as other metadata associated with the article.

This requirement is independent of the article lifecycle state and should apply to both published and archived articles.

## Decision

Displaying article metadata in the administrative article view is excluded from the 2.0 scope and deferred to 2.0.1.

Administrators should be able to view the relevant article metadata without entering edit mode, regardless of whether the article is published or archived.

The specific presentation, placement, and interaction model are intentionally not prescribed by this deviation and should be determined by the developer and product designer during implementation.

## Trade-offs

* Administrators cannot inspect the complete relevant article metadata from the article view in 2.0.
* Administrators may need to enter edit mode when metadata inspection is required.
* The existing metadata visibility within edit mode remains available.
* Deferring this capability keeps the 2.0 administrative scope focused while preserving the requirement for a dedicated administrative viewing experience.

## Risk

The primary impact is reduced visibility for administrators when reviewing articles without editing them.

Metadata that is already available within edit mode remains accessible there, so the limitation is specific to the administrative article viewing experience.

## Resolution

Deferred to 2.0.1.

Provide administrators with access to the relevant article metadata from the article view without requiring entry into edit mode.

The relevant specification should be reviewed and updated if this requirement is not already explicitly documented.
