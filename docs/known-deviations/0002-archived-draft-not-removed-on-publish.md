# Archived Draft Not Removed on Publish

* **owner:** Amir Karimi
* **category:** Known Imperfection
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** 2.0.1
* **last update:** TBD
* **related:**

    * `docs/feature/public-content-platform/`

## Context

Articles can exist with a `lifecycle` of `null`, `published`, or `archived`.

Published and archived articles are stored in the main article collection, while articles being edited are copied into the draft collection. The draft document is used throughout the editing process and, when editing is completed, replaces the corresponding document in the main article collection. The draft document should then be removed from the draft collection.

This flow works as expected for the relevant lifecycle transitions except when an archived article is edited and subsequently published.

In that case, the edited draft document successfully replaces the article in the main collection and its lifecycle changes from `archived` to `published`, but the corresponding document remains in the draft collection.

## Decision

The issue is acknowledged as a known imperfection and its resolution is deferred to 2.0.1.

No immediate fix is required for the 2.0 delivery because the remaining draft document does not currently cause a harmful workflow consequence.

If the published article is later edited again, the normal draft-copy operation overwrites the existing draft document. Therefore, the stale draft document does not result in duplicate draft documents or prevent the editing workflow from functioning correctly.

## Trade-offs

* The current 2.0 implementation retains an obsolete draft document after the `archived → draft → published` transition.
* The workflow remains operational despite the stale document.
* The existing overwrite behavior prevents the stale document from creating a duplicate when the article is subsequently edited again.
* Deferring the fix avoids treating a non-critical inconsistency as a release-blocking issue.

## Risk

The issue does not currently present a significant functional risk to the workflow.

The remaining draft document is nevertheless an incorrect state and should eventually be removed so that the draft collection accurately represents documents that are actually undergoing editing.

## Resolution

Targeted for 2.0.1.

The resolution should ensure that, after an archived article is successfully edited and published, its corresponding document is removed from the draft collection in the same way as the other supported lifecycle transitions.
