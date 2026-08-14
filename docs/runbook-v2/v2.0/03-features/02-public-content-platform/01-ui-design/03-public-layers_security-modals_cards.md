Section 4: Public layer and cards (Public UI & Components)

Section 4 includes 3 parts:

Public pages (Blog & Series Index):
* /blog page (article list, 20-item pagination, newest/oldest filter based on first_published_at).
* /series page (series list, 20-item pagination, sorted by updated_at).
* /series/:seriesSlug page (landing page for a series including its article list).

```todo
loop: design Public pages (Blog & Series Index)
```


Public pages (Blog & Series Index) </br>
Content Card component </br>
Preview flows and security modals (Preview & Modals)

Content Card component:
* Normal state: displays Thumbnail, Title, Description, and Series Badge.
* Fallback state (missing/archived content): displays badge "This article is currently unavailable", standard replacement text and neutral Placeholder for the image.

```backlog
 + طراحی کارت کامپوننت که باید article / series refrenceها رو نمایندگی کنه؛

ما ابتدا بریم سراغ طراحی card بهتره؛ و بعد تکمیل جاهایی که کارت در اونجاها کاربرد داره:

- اولین قدم از تکمیل، داخل MetadataTab: انتخاب سری در classificationCard
- دومین قدم، داخل ContentTab: رفرنس به یک 
- سومین قدم، داخل RelatedTab
- چهارمین قدم، داخل /blog
- پنجمین قدم، داخل /assets

```

```todo
loop: design Content Card component
```

Preview flows and security modals (Preview & Modals)

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