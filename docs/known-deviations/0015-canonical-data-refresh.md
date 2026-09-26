# Canonical Data Refresh

* **owner:** Amir Karimi
* **category:** Deferred Work
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** 2.0.1
* **last update:** TBD
* **related:**

    * `docs/guidelines/canonical-data-guidelines.md`

## Context

The project maintains canonical information that may evolve over time. There is currently no defined mechanism for refreshing canonical information and determining or viewing the latest available version.

This capability is not currently defined in the specification.

## Decision

A mechanism for refreshing canonical information and accessing its latest version is deferred from 2.0 to 2.0.1.

The capability should be addressed as part of the 2.0.1 work, with the appropriate behavior documented in the specification.

The specific technical or interface implementation is intentionally left unspecified.

## Trade-offs

* Canonical information may not be refreshable through a defined mechanism during 2.0.
* Users or processes relying on canonical information may not have a direct way to obtain or identify its latest version.
* The capability can be designed alongside the relevant specification work in 2.0.1.

## Risk

The primary risk is that canonical information may become stale without a defined mechanism for obtaining or identifying a newer version.

## Resolution

Provide an appropriate mechanism for refreshing canonical information and accessing its latest version in 2.0.1.

Update the specification to define the expected behavior.
