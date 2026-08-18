Section 4: Public layer and cards (Public UI & Components)

Content Card component </br>
Public pages (Blog & Series Index) </br>
Preview flows and security modals (Preview & Modals)

```todo:subbranches
✅ step: make branch feature/pcp-ui-cards
```

```
✅ step: Create DUMMY / Mock Data (outside of git)
  Goal: Build a comprehensive data source including 40 articles and 10 series for testing UI, pagination, Lazy-loading and Fallbacks
  Creation path: src/features/article-publishing/constants/mockContentData.ts
  Actions:
    1. Define data structure including 40 article Objects (with fields slug, title, summary, coverImage, thumbnailImage, tags, series, lifecycle, first_published_at) without the need for Body
    2. Define 10 series Objects (with title up to 36 characters, description, defaultTags, coverImage, thumbnailImage)
    3. Add the path of this file to .gitignore (or the folder src/shared/constants/mocks/) so that it remains completely isolated
```

Content Card component:
* Normal state: displays Thumbnail, Title, Description, and Series Badge.
* Fallback state (missing/archived content): displays badge "This article is currently unavailable", standard replacement text and neutral Placeholder for the image.

```
✅ step: Design the base ContentCard component
  The ContentCard component is a pure presentation component that based on the passed data renders one of the following 3 states:
  state article: Article Normal Card (article card)
    Input: an article object (with status lifecycle: 'Published')
    Visual elements:
      Thumbnail & Alt Text: thumbnailImage image along with thumbnailAltText
      Title: article title (title)
      Summary: article text summary (summary)
      Series Badge (if exists): if seriesId !== null, a Badge containing the related series title is rendered on the card
      Tags: direct render of the tags array existing on the article object (without any calculations)
      Publish Date: display of first_published_at date in formatted form
    Routing behavior (Destination Route):
      Standalone article (seriesId === null): link to /blog/:articleSlug
      Series Member article (seriesId !== null): link to /series/:seriesSlug/:articleSlug (through series slug lookup)
  state series: Series Normal Card (series card)
    Input: a series object
    Visual elements:
      Thumbnail & Alt Text: series thumbnailImage image along with thumbnailAltText
      Title: series title (title - maximum 36 characters)
      Description: series description (description)
      Series Indicator: icon/visual indicator to distinguish series card from article
      Tags: direct render of the defaultTags array existing on the series object (without any calculations)
    Routing behavior: direct link to /series/:seriesSlug
  state fallback: Fallback Card State (unavailable content)
    Activation condition: passing isUnavailable={true} or absence/Archived of the referenced data
    Visual elements:
      Header Badge: prominent tag with the text "This article is currently unavailable"
      Body Description: standard text "The content referenced here has been archived or removed by the author."
      Thumbnail: fixed image /thmb_fallback.png
    Routing behavior: disabled (Non-interactive / without Pointer hover)
```

```
✅ commit changes
```

```
✅ step: Implement the series selection component (SeriesPickerPopover / Command)
  Goal: Provide UI for searching and selecting the first 20 series with the capability of hiding after selection
  Actions:
    1. Unselected state (seriesId === null):
      Render the Popover component including Command (including CommandInput for search and CommandList for displaying the first 20 series from dummy data)
      By clicking on each series, seriesId is set in the form and the Command component is completely hidden (Unmount/Hide)
    2. Selected state (seriesId !== null):
      Completely hide Command
      Render the selected series inside a dedicated Wrapper:
        Placement of ContentCard (Series / Compact state)
        Adding the X action button (Unselect) in the top corner of the Wrapper to clear the selection (seriesId = null)
```

```
✅ commit changes
```

```
✅ step: Implement the computational function getEffectiveTags
  Goal: Calculate the output array $out$ for display in the tags management section (TagsCard)
  Actions:
    1. Receive the array of inherited series tags (array $B = \text{series.defaultTags}$ or [] if no series is selected)
    2. Receive the array of manual article tags (array $A = \text{article.tags}$)
    3. Execute the combination algorithm:
      Build the array $out$: first add all elements of $B$ (with inherited mark/Flag for being non-removable in UI)
      Add elements of $A$ that do not exist in $B$ ($A \setminus B$)
    4. The final output is an array of Objects of tags: Array<{ name: string, isInherited: boolean }>
```

```
✅ commit changes
```

```
✅ step: Render the output $out$ in TagsCard and react to changes
  Goal: Interactive render of tags using out.map()
  Actions:
    1. Render the output tags in the tags component (TagsCard):
      If tag.isInherited === true: render with inherited style (for example different color/Read-only without delete button)
      If tag.isInherited === false: render with dedicated delete button (to remove from the manual article array $A$)
    2. Synchronize the Unselect action (click on X in the series Wrapper):
      By pressing the X button on the series Wrapper, seriesId becomes null
      The array $B$ becomes empty and the computational function is executed immediately; the inherited series tags disappear and only the manual article tags ($A$) remain
```

```
✅ commit changes
```

```
✅ step: Define the dedicated Node structure (ContentReferenceNode)
  Goal: Create a Custom Block Node in the TipTap structure with support for identifier and type Attributes
  Actions:
    1. Build the extension file in the path src/features/article-publishing/components/editor/extensions/ContentReferenceNode.ts
    2. Define the Node properties:
      name: 'contentReference'
      group: 'block' (placement as a separate block between paragraphs)
      atom: true (unified behavior; impossibility of typing inside it)
      selectable: true and draggable: true
```

```
✅ commit changes
```

```
✅ step: Add Insert options to the editor Toolbar
  Goal: Add the Content Reference insertion menu in the main editor toolbar
  Actions:
    1. Add a button/Dropdown with the title "Insert Reference" in the editor Toolbar
    2. Place two items in the Dropdown menu:
      "Article Reference": insert new Node with referenceType: 'article' and referenceId: null
      "Series Reference": insert new Node with referenceType: 'series' and referenceId: null
    3. By clicking on each option, an empty Node is inserted at the current position of the cursor in the editor
```

```
✅ commit changes
```

```
✅ step: Implement interactive NodeView (selection / Command state)
  Goal: Render the Command component in the editor environment when referenceId is empty
  Actions:
    1. Implement ReactNodeViewRenderer for the custom Node
    2. First state (referenceId === null):
      Render an interactive Command component directly in the body of the editor
      Load 40 articles or 20 series (based on referenceType) from the dummy data file (dummy-content.json)
      Possibility of searching and selecting an item by the author
      By selecting the item, its referenceId and slug are set on the attributes of this Node and the local array of article references (inboundReferencingSlugs) is updated
```

```
✅ commit changes
```

```
✅ step: Render dedicated Wrapper and manage Fallback state
  Goal: Display the content card after selection and possibility of managing it in the editor environment
  Actions:
    1. Second state (referenceId !== null):
      Receive the corresponding article/series data based on referenceId
      Check access status (Fallback Check): if the item was not found in the dummy data or its status was inactive, render ContentCard with isUnavailable={true} and image /thmb_fallback.png
      Render in healthy state: render the real data of the article or series inside ContentCard
    2. Place the card inside a dedicated edit Wrapper:
      Add the X button at the top of the Wrapper that provides two actions:
        Reset Selection: clear referenceId to return to the Command state and reselect
        Delete Node: complete removal of this block from the TipTap document (by pressing the Delete/Backspace button or clicking on the delete option)
```

```
✅ commit changes
```

Section 4 includes 3 parts:

Public pages (Blog & Series Index):
* /blog page (article list, 20-item pagination, newest/oldest filter based on first_published_at).
* /series page (series list, 20-item pagination, sorted by updated_at).
* /series/:seriesSlug page (landing page for a series including its article list).

```
✅ step: Implement the main blog page (/blog)
  Goal: Render the list of published articles archive with the possibility of sorting and 20-item pagination
  Actions:
    1. Build the path: create the file src/app/(blog)/blog/page.tsx
    2. Filter the data: receive articles from dummy-content.json and apply the conditional filter lifecycle === 'Published'
    3. Sort Controls:
      Implement the sorting selection UI (based on firstPublishedAt) with two states Newest (default) and Oldest
    4. Render Grid and cards:
      Calculate the current page slice (slice((page - 1) * 20, page * 20))
      Render articles in a responsive grid with the ContentCard component
      Set the card link: if the article is a member of a series (seriesId !== null), render Series Badge and set the link to /series/:seriesSlug/:articleSlug; otherwise set the link to /blog/:articleSlug
    5. Pagination:
      Render the Pagination component based on total articles divided by 20 (Math.ceil)
      Synchronize the page number with the URL Query Parameter (/blog?page=X)
      Enable prefetch={true} on the pagination buttons for default loading of the next page
```

```
✅ commit changes
```

```
✅ step: Implement the series archive page (/series)
  Goal: Display all active series of the system with their subset articles
  Actions:
    1. Build the path: create the file src/app/(blog)/series/page.tsx
    2. Receive the data: read the list of series from dummy-content.json and sort based on updated_at (descending)
    3. Render Series Cards:
      Iterate over the first 20 series of the current page
      Render the card of each series including the series header (title, cover, description and defaultTags)
      Render Nested Articles: display the child cards (member articles of that series) under the series header using ContentCard in compact/series member state
    4. Linking: clicking on the series header directs the user to the dedicated landing of that series (/series/:seriesSlug)
    5. Pagination: implement 20-item pagination corresponding to the URL Query (/series?page=X)
```

```
✅ commit changes
```

```
✅ step: Implement the dedicated landing of a series (/series/:seriesSlug)
  Goal: Display the full header of the metadata of a series and all articles connected to it
  Actions:
    1. Build the path: create the Dynamic Route file in src/app/(blog)/series/[seriesSlug]/page.tsx
    2. Match and receive data: find the series data based on seriesSlug from the dummy file (in case of absence, render 404/NotFound page)
    3. Render Series Banner/Header:
      Display Cover Image, series title, full description and defaultTags Badges
    4. Render dependent articles:
      Receive all published articles whose seriesId is equal to this series
      Sort the articles based on priority/date and render them with ContentCard
      Set the link of each article to the path /series/:seriesSlug/:articleSlug
```

```
✅ commit changes
```

```
✅ step: Implement the dedicated page for adding article (/admin/add-article)
```

```
✅ commit changes
```

```
✅ step: Implement the dedicated page for adding series (/admin/add-series)
```

```
✅ commit changes
```

```
✅ step:  Implement the dedicated landing of a drafted articles (/admin/articles/drafts)
```

```
✅ commit changes
```

```
✅ step:  Implement the dedicated landing of a drafted archive (/admin/articles/archive)
```

```
✅ commit changes
```

```
✅ loop:  fix all bugs and stuff based on new changes
```

```
✅ commit changes
```

```todo:subbranches
step: Checkout the branch feature/pcp-ui-design
```

```todo:subbranches
step: Merge the branch feature/pcp-ui-cards into feature/pcp-ui-design
```

```todo:subbranches
step: Delete the branch feature/pcp-ui-cards
```

```todo:subbranches
step: go to article-creation-and-edit-runbook line 59
```