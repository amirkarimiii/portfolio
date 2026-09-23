# Analytical Bookshelf deferred from 2.0

* **owner:** Amir Karimi
* **category:** Scope Cut
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** When the feature has a demonstrated need
* **last update:** TBD
* **related:**

    * `docs/feature/analytical-bookshelf/`
    * `docs/runbook-v2/v2.0/03-features/04-analytical-bookshelf-(deferred)/`

## Context

The Analytical Bookshelf feature was originally considered as part of the 2.0 scope.

At the point where development of this feature was about to begin, the scope was reconsidered based not only on delivery considerations, but also on whether the feature was philosophically and practically necessary at this stage of the project.

The feature would not provide meaningful value in the 2.0 delivery context, as there would not yet be a demonstrated need for an Analytical Bookshelf. The feature is expected to become relevant later, when the project's planned usage creates a real need for it.

## Decision

The entire Analytical Bookshelf feature is deferred from the 2.0 implementation scope.

No feature-specific implementation is required in `src/`. Existing documentation describing the feature remains in `docs/` and is intentionally preserved as context for its eventual implementation.

The feature is not assigned to a fixed future release. Its implementation should resume when there is a demonstrated need for it, rather than being treated as a commitment to a specific version.

## Trade-offs

* 2.0 avoids implementing and maintaining functionality that does not currently provide meaningful value.
* The project avoids spending development effort on a feature whose immediate practical use is limited.
* The feature's existing documentation remains available, preserving the work already done around its design and intended behavior.
* The exact future release in which the feature is implemented remains intentionally open.

## Risk

No material implementation risk is identified from deferring the feature.

Conversely, implementing the feature prematurely could introduce an unnecessary presentation risk: delivering an Analytical Bookshelf without meaningful content could make the portfolio/blog experience feel incomplete or give an unfavorable impression during its presentation.

## Resolution

Not yet resolved.

The deviation is resolved when the Analytical Bookshelf becomes necessary enough to justify implementation. At that point, the actual implementation release and resolution details should be recorded here.
