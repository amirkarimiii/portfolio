# Article Transition Redirect

* **owner:** Amir Karimi
* **category:** Known Imperfection
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** 2.0.1
* **last update:** TBD
* **related:**

    * `docs/feature/public-content-platform/`

## Context

An article can be transitioned directly between `published` and `archived` states while the administrator is viewing the article itself.

For a published article, the administrator may perform the transition from the article page at `example.com/blog/<slug>` or its equivalent URL for an article within a series. For an archived article, the corresponding page is `archive/[id]`.

After a successful direct transition, the current page should reflect the article's new lifecycle state.

## Decision

The post-transition navigation behavior is intentionally incomplete in 2.0 and deferred to 2.0.1.

After a successful direct transition:

* `published → archived` should redirect from the current published article URL to `archive/[id]`.
* `archived → published` should redirect from `archive/[id]` to the article's published URL, using the standard URL structure for either a standalone article or an article belonging to a series.

This deviation applies only to transitions performed from the article view itself. Transitions initiated from the article list are outside the scope of this entry.

The behavior should be briefly documented in the specification as part of the 2.0.1 resolution. The technical implementation approach is intentionally left unspecified.

## Trade-offs

* After a successful direct transition in 2.0, the administrator may remain on a URL that no longer represents the article's current lifecycle state.
* The underlying transition remains functional; the incompleteness concerns only the subsequent navigation.
* Deferring the navigation behavior avoids expanding the 2.0 scope for a case that was not explicitly covered by the specification.

## Risk

The primary risk is navigation inconsistency after a successful lifecycle transition. The administrator may need to navigate manually to the article's new location.

No data or lifecycle-state integrity issue is introduced by this deviation.

## Resolution

Implement the appropriate post-transition navigation behavior in 2.0.1 and update the specification to document the expected destination after direct `published ↔ archived` transitions.

The specific technical implementation of the navigation is left to the implementation phase.
