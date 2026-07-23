# ADR-0005 — Specification-First Rebase Policy

## Status

Accepted

## Context

During refactoring and long-running feature development, it is common to discover that the current specification, architecture decision records, or project documentation require updates before implementation can continue.

If these documentation changes are committed only inside the feature branch, the project history no longer reflects the actual order of decisions:

```
Implementation
↓
Specification
```

This makes it difficult to understand which implementation was based on which version of the specification.

Additionally, merging documentation changes from feature branches introduces unnecessary merge commits and complicates history.

## Decision

Whenever implementation reveals that the project specification or architectural documentation must change before development continues:

1. Switch to the `staging` branch.
2. Commit the specification, ADR, or documentation changes directly on `staging`.
3. Return to the active feature branch.
4. Rebase the feature branch onto the updated `staging`.
5. Resolve conflicts during the rebase if necessary.
6. Continue implementation on the rebased branch.

Documentation that defines project intent SHALL precede implementation in Git history.

## Consequences

### Positive

* Git history remains linear.
* Specifications become the authoritative source preceding implementation.
* Feature branches always build upon the latest approved project decisions.
* Merge commits created solely for documentation synchronization are avoided.
* ADRs, specifications, and implementation evolve in a chronological and auditable order.

### Negative

* Developers must occasionally perform an interactive rebase.
* Feature branch commit hashes change after rebasing, requiring force-push when the branch has already been published.

## Notes

This policy applies only to documentation that changes project intent, architecture, or specification.

Pure implementation notes, temporary investigation documents, or work-in-progress documentation may remain within the feature branch until merged.
