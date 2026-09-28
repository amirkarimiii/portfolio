# Portfolio CV Access

* **owner:** Amir Karimi
* **category:** Known Imperfection
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** 2.0.1
* **last update:** TBD
* **related:**

    * `docs/feature/portfolio-main-body/`

## Context

The Portfolio Main Body feature does not currently specify how the CV should be made available to users.

The specification contains no explicit requirements for CV access, including the security and abuse-prevention considerations that should govern how the CV is exposed.

The current implementation is therefore incomplete and does not adequately address this aspect of the feature.

## Decision

The CV access behavior is recognized as a known imperfection in 2.0 and deferred to 2.0.1.

The specification must explicitly define how the CV is made available to users and must establish the required security and abuse-prevention considerations from the outset.

The detailed technical and UX requirements are the responsibility of the specification and should be defined there before the current implementation is further developed.

## Trade-offs

* The 2.0 implementation does not have a sufficiently defined specification for CV access.
* The current CV access behavior may not adequately address security or abuse-prevention concerns.
* Deferring the work allows the specification to establish the intended behavior before the implementation is revised.

## Risk

The absence of defined security and abuse-prevention requirements creates a risk that the CV access mechanism could be misused or exposed in an unintended manner.

The risk is particularly relevant because the current implementation exists without the corresponding requirements being explicitly defined in the specification.

## Resolution

In 2.0.1:

1. Define the CV access behavior in the Portfolio Main Body specification.
2. Explicitly include the required security and abuse-prevention considerations in the specification.
3. Review and improve the existing implementation according to the resulting specification.

The specific technical implementation and abuse-prevention mechanisms are intentionally left to the specification and subsequent implementation work.
