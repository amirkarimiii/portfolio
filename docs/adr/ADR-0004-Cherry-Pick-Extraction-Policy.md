# ADR-0004: Adopt Historical Rebase Preservation Policy

* **Status:** Accepted
* **Date:** 2026-07-22

---

## Context

During the initial implementation of the blog subsystem, development occurred before the repository adopted its current architectural standards, branch strategy, documentation process, and commit conventions.

The historical branch chain:

```text
feat/new-article-route
└── feat/new-article-route-b/tiptap
    └── feat/new-article-route-b/toolbar
        └── feat/new-article-route-b/add-image
```

contains the authentic implementation history of the editor subsystem, including the migration toward Tiptap, editor extensions, toolbar behavior, image validation, and related functionality.

At the time those commits were created:

* Documentation-Driven Development had not yet been adopted.
* The current branch naming strategy did not exist.
* The repository commit-message convention had not yet been defined.
* The architectural infrastructure that now supports the editor had not yet been implemented.

As the project matured, the architectural foundation was intentionally developed before continuing feature work. This resulted in the repository's logical architecture diverging from the chronological order in which some implementation work originally occurred.

The repository therefore requires a mechanism that preserves the genuine development history while presenting the repository in its intended architectural sequence.

---

## Decision

Historical implementation branches SHALL be integrated through **Git Rebase** rather than Cherry-Pick or manual reimplementation.

The purpose of this policy is not to recreate historical work but to **relocate existing development history onto the repository's architectural foundation**.

Rebasing historical branches is considered a structural reorganization of repository history rather than a modification of the work itself.

---

## Rationale

Historical rebasing provides several advantages.

### Preserve Authentic Development History

The original sequence of implementation is retained.

Each commit continues to represent a genuine development step rather than a newly recreated change.

---

### Preserve Author Dates

The original Author Date of every historical commit remains intact.

This accurately reflects when the implementation work was performed and preserves contribution history associated with those development periods.

---

### Align Repository History with Architecture

Although portions of the editor were implemented before the surrounding infrastructure existed, the repository's long-term history should present architectural foundations before dependent features.

Rebasing allows the repository history to reflect that logical evolution without rewriting the implementation itself.

---

### Avoid Artificial Recreation

Manual porting or commit-by-commit Cherry-Pick would create entirely new commits whose primary purpose is reproducing work that already exists.

The repository instead recognizes those historical commits as the canonical implementation history.

---

## Commit Message Policy

The repository's current commit-message convention applies **only to commits created after the convention was adopted**.

Historical commits are intentionally preserved with their original commit messages.

These messages constitute part of the historical record of the repository and are **not rewritten solely for stylistic conformity**.

Commit messages may be rewritten only when necessary to correct factual inaccuracies or resolve technical issues affecting repository integrity.

Repository conventions are therefore **not retroactive**.

---

## Historical Branch Lifecycle

Historical branches serve as temporary carriers of repository history during migration.

Their lifecycle is:

1. Original implementation.
2. Architectural foundation established.
3. Historical branch rebased onto the new foundation.
4. Verification of repository integrity.
5. Historical branch removed.

Deletion of the original branch does **not** represent deletion of its history.

Its history has already become part of the modern repository through rebasing.

---

## Alternatives Considered

### Cherry-Pick Extraction

Rejected.

Although Cherry-Pick preserves Author Dates, it recreates commits instead of preserving their original historical continuity.

For this repository, the objective is historical preservation rather than historical reconstruction.

---

### Manual Porting

Rejected.

Reimplementing existing work discards authentic development history, increases maintenance effort, and introduces unnecessary opportunities for regression.

---

### Direct Merge

Rejected.

Merging historical branch chains would import obsolete branch topology and reduce the clarity of the repository's architectural evolution.

---

### Permanent Historical Branches

Rejected.

Historical branches provide value only until their history has been successfully incorporated into the active repository.

Keeping them indefinitely would increase repository complexity without preserving additional information.

---

## Consequences

### Positive

* Preserves authentic implementation history.
* Preserves original Author Dates.
* Presents repository history in logical architectural order.
* Eliminates the need for artificial commit recreation.
* Maintains a clean, flat active branch structure.
* Allows historical commits to remain historically authentic even when they predate modern repository conventions.

---

### Trade-offs

* Rebasing rewrites commit hashes because commit ancestry changes.
* Historical branches must not be considered immutable until migration has completed.
* Repository maintainers should understand that historical commit messages intentionally reflect the standards that existed when those commits were originally authored.

---

## Repository Philosophy

This repository treats its Git history as part of the project's engineering documentation.

Historical commits are considered engineering artifacts rather than implementation noise.

Accordingly, repository history should preserve **what actually happened**, while presenting that history within the architectural narrative ultimately adopted by the project.

Authenticity of development history takes precedence over cosmetic uniformity.
