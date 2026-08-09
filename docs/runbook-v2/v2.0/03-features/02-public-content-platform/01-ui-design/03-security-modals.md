Section 3: Preview flows and security modals (Preview & Modals)

Preview page (/preview/:articleSlug and /preview/:seriesSlug/:articleSlug):

Renders the article exactly like the public site appearance, but with a floating Header/Banner that shows "Draft / Preview Mode" status.

Deletion confirmation modals:
* Delete Draft: a simple Confirmation modal.
* Delete Published / Archived (high security): a modal that includes:
    * Display of warning and list of later articles that have linked to this article (inbound_referencing_slugs).
    * Re-entry of the user's Password.
    * Exact typing of the article Title to confirm permanent deletion.


```todo
loop: design modal
```