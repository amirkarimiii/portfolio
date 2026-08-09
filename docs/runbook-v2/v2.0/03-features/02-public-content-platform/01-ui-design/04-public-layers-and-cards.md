Section 4: Public layer and cards (Public UI & Components)

Section 4 includes 2 parts:

Content Card component (with 2 states) </br>
Public pages (Blog & Series Index)

Content Card component (with 2 states):
* Normal state: displays Thumbnail, Title, Description, and Series Badge.
* Fallback state (missing/archived content): displays badge "This article is currently unavailable", standard replacement text and neutral Placeholder for the image.

```todo
loop: design Content Card component
```

Public pages (Blog & Series Index):
* /blog page (article list, 20-item pagination, newest/oldest filter based on first_published_at).
* /series page (series list, 20-item pagination, sorted by updated_at).
* /series/:seriesSlug page (landing page for a series including its article list).

```todo
loop: design Public pages (Blog & Series Index)
```