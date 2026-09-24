# Delete Operations Deferred

* **owner:** Amir Karimi
* **category:** Scope Cut
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** 2.0.1
* **last update:** TBD
* **related:**

    * `docs/feature/public-content-platform/`

## Context

Article deletion can occur at different stages of the article lifecycle.

Deleting content from the draft collection does not require additional authentication and was intended to use a simple confirmation alert. Deleting an article from the main article collection, however, requires secure deletion with re-authentication by repeating the user's password.

Because the 2.0 scope prioritizes the user-facing experience and the core functionality required for the site, the administrative delete flow is intentionally deferred along with the rest of the administrative functionality.

## Decision

The complete article deletion flow is excluded from the 2.0 scope and deferred to 2.0.1.

This scope cut covers both deletion modes:

* **Secure delete:** deletion of articles from the main article collection, including password re-authentication.
* **Unsecure delete:** deletion of content from the draft collection using a simple confirmation flow.

The scope cut covers the complete application-level delete flow, including its UI, application logic, and API flow.

Until this functionality is implemented, any operational need to delete content will be handled directly at the database level rather than through the application.

The relevant specification should be reviewed as part of the 2.0.1 work and updated to reflect the intended delete behavior and its associated flows.

## Trade-offs

* 2.0 does not provide an application-level mechanism for deleting articles or drafts.
* Administrative implementation effort remains focused on functionality required for the current delivery.
* Database-level deletion is available as an operational fallback when deletion is required before the application flow is implemented.
* The secure and unsecure deletion flows remain available for future implementation without being partially implemented in 2.0.

## Risk

Direct database deletion is an operational process rather than a user-facing application flow and therefore requires appropriate care when used.

Deferring the application-level delete flow also means that the intended confirmation and re-authentication safeguards are not available through the application in 2.0.

## Resolution

Deferred to 2.0.1.

The complete delete flow should be implemented as part of the administrative experience, covering secure deletion of articles, unsecure deletion of draft content, and the corresponding UI, application logic, and API flows.
