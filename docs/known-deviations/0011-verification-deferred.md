# Verification Deferred

* **owner:** Amir Karimi
* **category:** Deferred Work
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** End of 2.0.1
* **last update:** TBD
* **related:**

    * `docs/feature/public-content-platform/`

## Context

The project verification process consists of two levels.

The first level is performed after completing individual features and generally includes unit and integration tests.

The second level is performed after completion of the overall project and includes broader integration verification, end-to-end testing, and other verification activities appropriate to the complete system.

Several known deviations from the 2.0 implementation are expected to be resolved or completed in 2.0.1. Performing comprehensive verification before those changes are incorporated would not provide meaningful verification of the intended final state of the system.

## Decision

Verification activities are deferred from 2.0 to the end of 2.0.1.

This includes both:

* feature-level verification, generally consisting of unit and integration tests; and
* project-level verification, including broader integration, end-to-end, and other appropriate verification activities.

This is a scheduling decision, not a decision to remove or reduce the need for verification.

## Trade-offs

* The 2.0 delivery does not receive the planned comprehensive verification coverage.
* Verification effort is concentrated after the relevant deferred work has been completed.
* The final verification can evaluate the system after the known deviations affecting the implementation have been addressed.

## Risk

Until the deferred verification is performed, defects or regressions that would otherwise be identified through the planned verification activities may remain undetected.

The risk is accepted as part of the decision to verify the system after completion of the relevant 2.0.1 work.

## Resolution

Deferred to the end of 2.0.1.

Complete the planned feature-level and project-level verification activities after the relevant deferred work has been implemented.
