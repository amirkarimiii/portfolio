# ADR-0002 — Establish Article Authoring Guidelines Prior to Editor Development

* **Status:** Accepted
* **Date:** 2026-07-15

## Context

The project required a lightweight blog editor built with Tiptap for
authoring articles.

Editor development initially focused on implementing toolbar features
without first defining how blog articles should be structured,
formatted, or rendered.

This introduced two major issues:

* There was no clear specification for the final appearance and
  structure of published articles.
* Toolbar development lacked a clear Definition of Done, making it
  difficult to determine which features were essential and which were
  unnecessary.

As development progressed, approximately 70% of the initial toolbar was
implemented. During the design phase for more advanced capabilities, the
requirements were re-evaluated.

The review showed that defining content standards was a prerequisite for
continuing editor development.

## Decision

Pause editor feature development and establish content authoring
standards before implementing additional editor functionality.

The project adopts the following approach:

* Define the required authoring capabilities in a dedicated
  Editor Definition of Done.
* Define article structure and presentation through an
  Article Guidelines document.
* Implement editor features only when they support the documented
  content standards.
* Determine visual styling for each supported element incrementally
  during implementation while keeping the resulting conventions
  documented in the Article Guidelines.

## Consequences

Pros:

* Clear scope for editor development.
* Reduced feature creep.
* Consistent article structure.
* Predictable rendering across the blog.
* Easier long-term maintenance.

Cons:

* Temporary pause in editor implementation.
* Additional upfront documentation effort.
* Visual design decisions require separate documentation as new
  components are introduced.

## Lessons Learned

* Define content requirements before implementing editing tools.
* An editor should be driven by publishing requirements rather than
  feature availability.
* Documentation should separate architectural decisions from
  implementation requirements and content guidelines.
