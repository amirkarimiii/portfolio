# Preview Validation

* **owner:** Amir Karimi
* **category:** Known Imperfection
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** 2.0.1
* **last update:** TBD
* **related:**

    * `docs/feature/public-content-platform/`

## Context

The article editor includes a Preview capability that should only be available when the current article content satisfies the validation requirements defined in the specification.

In the current 2.0 implementation, Preview can be activated without first ensuring that the content in the Article Editor has successfully passed the required validation.

The validation rules themselves are already defined as part of the specification; the deviation concerns the missing enforcement of those rules as a prerequisite for Preview.

## Decision

Preview validation is intentionally left imperfect in 2.0 and deferred to 2.0.1.

Preview should only be activated when the current Article Editor content has successfully passed the validation requirements defined in the specification.

The validation mechanism and its underlying rules are outside the scope of this deviation. This entry concerns only enforcing validation as a prerequisite for activating Preview.

## Trade-offs

* Editors may currently access Preview with content that has not passed the required validation.
* The existing Preview functionality remains available while the validation gate is deferred.
* Deferring the enforcement avoids additional implementation work during the 2.0 delivery.

## Risk

Preview may currently present content that would not satisfy the validation requirements for the article.

This creates a discrepancy between the state accepted by the Preview flow and the validation standards defined for the article.

## Resolution

Deferred to 2.0.1.

Enforce the existing article validation requirements as a prerequisite for activating Preview.
