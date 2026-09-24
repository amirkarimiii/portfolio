# Direct Publish-Archive Transition

* **owner:** Amir Karimi
* **category:** Scope Cut
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** 2.0.1
* **last update:** TBD
* **related:**

    * `docs/feature/public-content-platform/`

## Context

Article lifecycle transitions currently support flows involving drafts, including transitions between published and archived states through the draft stage.

The article lifecycle can also support direct transitions between published and archived states:

* `published → archived`
* `archived → published`

These direct transitions are not currently available through the application. When such a transition is required, it can only be performed by modifying the relevant state directly in the database.

## Decision

Direct transitions between published and archived states are excluded from the 2.0 scope and deferred to 2.0.1.

Both `published → archived` and `archived → published` should eventually be supported through the application/UI.

This deviation concerns only the direct lifecycle transitions. Existing lifecycle flows involving drafts are outside the scope of this entry.

The specific UI design and interaction model are intentionally not defined here and should be addressed by the relevant specification and implementation work.

## Trade-offs

* Administrators cannot directly transition an article between published and archived states through the application in 2.0.
* The existing lifecycle flows involving drafts remain available.
* Direct published/archive transitions can still be performed operationally through the database when required.
* Deferring these transitions avoids expanding the 2.0 administrative scope.

## Risk

Direct database modification is an operational workaround rather than a user-facing application flow and therefore requires appropriate care.

The absence of direct application-level transitions also means that administrators must use the draft-based lifecycle or database-level intervention when a direct published/archive transition is required.

## Resolution

Deferred to 2.0.1.

Provide application-level support for direct `published → archived` and `archived → published` transitions as part of the administrative experience.
