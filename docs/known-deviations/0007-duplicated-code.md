# Duplicated Code

* **owner:** Amir Karimi
* **category:** Technical Debt
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** 2.0.1
* **last update:** TBD
* **related:**

    * `docs/feature/public-content-platform/`

## Context

Code inspection identified several duplicated code fragments in the public content platform implementation.

The identified duplication includes:

* `ArchivedDropdown.tsx`

    * Duplicate code: lines 22–52
* `articleRepository.ts`

    * Duplicate code: lines 57–92
    * Duplicate code: lines 195–230
* `articleService.ts`

    * Duplicate code: lines 100–104
    * Duplicate code: lines 133–137
    * Duplicate code: lines 217–221
    * Duplicate code: lines 371–391
    * Duplicate code: lines 525–545
* `PublishedDropdown.tsx`

    * Duplicate code: lines 22–52

These duplications are known and have been intentionally left in the 2.0 implementation.

## Decision

The identified duplicated code should be addressed as part of the 2.0.1 work.

An appropriate refactoring or other suitable technical action should be taken for each identified duplication. The specific implementation approach is left to the developer based on the surrounding code and the appropriate design at the time of resolution.

No specific abstraction, utility, or shared implementation is prescribed by this deviation.

## Trade-offs

* The 2.0 implementation retains duplicated code in the identified locations.
* The current implementation avoids spending additional development effort on refactoring during the 2.0 delivery.
* The duplication remains a maintenance concern until the appropriate action is taken.

## Risk

Duplicated logic can increase maintenance overhead and create a risk of inconsistent changes when similar behavior needs to be modified in multiple locations.

The identified duplication is known and traceable, so it is treated as deliberate technical debt rather than an unrecognized implementation issue.

## Resolution

Deferred to 2.0.1.

Review the identified duplicated code and take the appropriate technical action to remove or otherwise properly address the duplication.
