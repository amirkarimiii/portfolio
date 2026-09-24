# Draft Opens in Edit

* **owner:** Amir Karimi
* **category:** Scope Cut
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** 2.0
* **last update:** TBD
* **related:**

    * `docs/feature/public-content-platform/`

## Context

Draft articles are part of the administrative authoring experience and are not intended to be exposed as a public-facing article surface.

The intended interaction for a draft is to open it directly in the editing interface rather than providing a separate read-only article view.

This behavior was originally expected to be addressed as part of the deferred administrative experience in 2.0.1. During development, however, the relevant implementation was completed earlier than planned and became part of the 2.0 delivery.

## Decision

When an administrator selects a draft article, the draft should open directly in the article editing interface.

This deviation concerns the navigation behavior only. It does not define the broader design or implementation of the administrative draft surface.

The implementation was completed as part of 2.0, superseding the original expectation that this behavior would be addressed in 2.0.1.

The relevant specification should reflect this behavior; if necessary, it should be reviewed and updated to ensure that selecting a draft is explicitly understood as an entry into the editing flow.

## Trade-offs

* Drafts do not require a separate read-only viewing flow.
* The interaction remains aligned with the purpose of a draft: continuing or resuming editing.
* The behavior was implemented earlier than originally planned, reducing the amount of administrative functionality remaining for the later delivery.

## Risk

No material risk is identified with the implemented navigation behavior.

As with the rest of the draft lifecycle, relevant edge cases should be considered and verified when the surrounding administrative experience is developed or revised.

## Resolution

Resolved in 2.0.

The draft navigation behavior is implemented so that selecting a draft opens the corresponding article in the editing interface.
