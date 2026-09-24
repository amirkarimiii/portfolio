# Add Article Navigation

* **owner:** Amir Karimi
* **category:** Known Imperfection
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** 2.0.1
* **last update:** TBD
* **related:**

    * `docs/feature/public-content-platform/`

## Context

The `add-article` and `edit-article` experiences share the same basic article authoring structure.

`add-article` creates a new article with `lifecycle = null` in the draft collection. Once the administrator completes the article and chooses to publish or archive it, the authoring flow is complete.

`edit-article` follows a similar flow, but starts by copying the existing article into the draft collection and loading its current data into the shared authoring interface.

After the lifecycle action is completed, the authoring interface should no longer remain the active destination. The administrator should be navigated to the appropriate destination corresponding to the resulting lifecycle state.

## Decision

The post-completion navigation behavior of `add-article` is intentionally imperfect in 2.0 and deferred to 2.0.1.

After a successful lifecycle action:

* when the article is archived, the administrator should be navigated to the appropriate archive route;
* when the article is published, the administrator should be navigated to the appropriate published-articles route.

The current `add-article` behavior performs a hard reset after the lifecycle action, which clears the form rather than navigating the administrator to the resulting article collection. This is considered incorrect from a UX perspective.

The expected behavior is navigation to the appropriate destination after the operation completes successfully, rather than resetting the authoring form.

The corresponding behavior in `edit-article` should be used to verify the intended behavior. The deviation specifically concerns the incorrect behavior in `add-article`.

The appropriate navigation behavior should be documented in the specification as part of the 2.0.1 resolution. The technical implementation approach is intentionally left unspecified.

## Trade-offs

* In 2.0, completing an `add-article` lifecycle action can leave the administrator with a reset form instead of taking them to the resulting article collection.
* The article lifecycle operation itself remains functional.
* Deferring the navigation correction avoids expanding the 2.0 scope for a UX behavior that can be corrected in 2.0.1.

## Risk

The primary risk is a poor and potentially confusing user experience after completing an article.

The hard reset can make the authoring interface appear empty immediately after the operation, rather than clearly communicating that the article has been successfully moved to its resulting lifecycle state.

## Resolution

Correct the `add-article` post-completion behavior in 2.0.1 so that, after a successful publish or archive operation, the administrator is navigated to the appropriate destination for the resulting lifecycle state.

Update the specification to document the expected navigation behavior.

The specific technical implementation of the navigation is left to the implementation phase.
