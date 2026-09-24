# Preview UI Styling

* **owner:** Amir Karimi
* **category:** Known Imperfection
* **status:** deferred
* **issued in:** 2.0
* **target resolution:** 2.0.1
* **last update:** TBD
* **related:**

    * `docs/feature/public-content-platform/`

## Context

The article editor includes a Preview capability that provides a live representation of how the article will appear to an unauthorized user after publication.

The Preview functionality and its underlying behavior are already implemented and operational. However, the current Preview UI is primarily structural and its visual styling does not sufficiently match the corresponding unauthorized user-facing article view.

The identified issue is limited to the visual presentation of the Preview.

## Decision

The visual styling of the Preview is intentionally left imperfect in 2.0 and deferred to 2.0.1.

The Preview should be visually aligned with the corresponding unauthorized user-facing article view so that the live preview more accurately represents the final published presentation.

No changes to the existing Preview functionality, live-update behavior, or underlying logic are implied by this deviation.

The specific implementation and styling approach are left to the developer and product designer.

## Trade-offs

* The Preview is functional and provides the intended live representation, but its current visual appearance does not accurately match the final user-facing presentation.
* Editors may see visual differences between the Preview and the actual unauthorized user view.
* Deferring the styling work avoids spending additional effort on visual refinement during the 2.0 delivery.

## Risk

The primary risk is reduced visual fidelity between the Preview and the final article presentation.

The underlying Preview functionality remains operational, so the limitation is confined to UI presentation and styling.

## Resolution

Deferred to 2.0.1.

Update the Preview styling so that its visual presentation appropriately reflects the corresponding unauthorized user-facing article view.
