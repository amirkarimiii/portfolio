# ADR-0004: Adopt Cherry-Pick Extraction Policy for Historical Branches

* **Status:** Accepted
* **Date:** 2026-07-22

## Context

The historical nested branch chain (`feat/new-article-route` → `.../tiptap` → `.../toolbar` → `.../toolbar-b/add-image`) contains working Tiptap editor, toolbar, and image-validation code that predates both the current commit-message convention and the flat branch-naming convention. The file content already conforms to `conventions.md`, since those conventions were derived from the same prior work — only the branch structure and commit metadata are non-conforming.

A generic "porting" of this code (rewriting it as fresh commits) would work, but discards each commit's original author date, which is also how contribution history for those days is preserved. A full merge of the nested branches was already rejected (see `git-observatory.md`, Section 6) because it would import the tangled branch structure itself.

## Decision

Historical code is extracted using `git cherry-pick`, applied commit-by-commit (never squashed), into new flat branches created from `staging` (per ADR-0004). This:

* Preserves each commit's original **Author Date**, so contribution-graph credit for the original work days is retained once the commit lands on the default branch. Only the Committer Date changes.
* Allows commit messages to be brought in line with the current convention via `git commit --amend` **without** `--reset-author`, where needed. Messages that predate the convention and cannot be cleanly amended are grandfathered as-is.
* Requires no rework of file content, since it already conforms to `conventions.md`.

Once the last commit has been cherry-picked from the last remaining historical branch (i.e., the Pending Integration Queue is fully drained), the historical branches are deleted. They are not retained indefinitely as a "living reference" — once their content is fully extracted, they serve no further purpose and are removed like any other completed branch.

## Alternatives Considered

### Manual porting (rewrite commits from scratch)

Rejected. Loses original author dates for no benefit, since the underlying code already matches convention.

### Merge historical branches directly into `staging`

Rejected. Imports the tangled nested-branch structure and non-conforming history directly into the active base.

### Keep historical branches permanently as read-only reference

Rejected. Once cherry-pick extraction is complete, the branches add no further value and only clutter the repository.

## Consequences

### Positive
* Destination branches (e.g. `feature/blog-editor`, `feature/image-upload`) get a clean, flat history.
* Contribution-graph history for the original work days is preserved.
* The repository returns to a minimal branch set once extraction is complete.

### Trade-offs
* Extraction must be done commit-by-commit rather than as a single squash merge, which is slower.
* Historical branches must be tracked until the Pending Integration Queue is fully drained before they can be deleted.