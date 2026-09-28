# Interactive Stack Mapping Zod Types

* **owner:** Amir Karimi
* **category:** Technical Debt
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** 2.0.1
* **last update:** TBD
* **related:**

    * `docs/feature/interactive-stack-mapping/`

## Context

The Interactive Stack Mapping feature currently defines its types without using Zod schemas.

The intended approach is to define the feature's data structures as Zod schemas so that they can be used for runtime validation, while the corresponding TypeScript types can be derived through schema inference.

## Decision

The types used throughout the Interactive Stack Mapping feature are deferred for technical improvement in 2.0.1.

The feature's types should be represented through Zod schemas, with TypeScript types derived from those schemas through inference.

The change applies to all types belonging to the Interactive Stack Mapping feature.

No specification changes are required as part of this work.

## Trade-offs

* The current implementation continues to use its existing type definitions during 2.0.
* Runtime validation and type derivation are not unified through a single schema source.
* The technical improvement is deferred without affecting the feature's intended behavior.

## Risk

The current approach provides less centralized runtime validation and type definition than the intended Zod-based approach.

No significant functional risk is currently identified.

## Resolution

Rewrite the Interactive Stack Mapping types using Zod schemas in 2.0.1.

Use the schemas for validation and derive the corresponding TypeScript types through schema inference.
