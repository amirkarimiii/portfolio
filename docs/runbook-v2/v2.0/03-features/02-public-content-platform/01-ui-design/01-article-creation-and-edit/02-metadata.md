Tab 1 includes 4 parts:

part 1: Identity card </br>
part 2: Media card </br>
part 3: Classification card </br>
part 4: SEO card </br>

```todo:subbranches
✅ step: make branch feature/pcp-article-metadata
```

Identity card: H1 Title field, slug (with 72-hour lock indicator + Emergency Bypass switch), Summary/Excerpt.

```
✅ step: Change specification file based on new reviews
```

```
✅ commit changes
```

```
✅ step: Change verification based on specification changes
```

```
✅ commit changes
```

```
✅ step: Change readiness based on changes of the two files specification and verification
```

```
✅ commit changes
```

```
✅ step: Add media.md
```

```
✅ commit changes
```

```
✅ step: Add seo.md
```

```
✅ commit changes
```

```
✅ step: Add capability-usage-guideline and move capability\Application-Logging\Usages to it
```

```
✅ commit changes
```

```
✅ step: Add article-rendering-guideline
```

```
✅ commit changes
```

```
✅ step: Change logger specification based on new capability-usage-guideline file
```

```
✅ commit changes
```

```todo:conventions
✅ step: upload conventions to chatgpt
```

```todo:conventions
✅ step: research for changes -> Change in conventions.md: making the scopes of each feature more specific
```

```todo:conventions
✅ step: update conventions needed parts
```

```todo:conventions
✅ step: update conventions changlog
```

```todo:conventions
✅ commit changes
```

```todo:conventions
✅ step: upload conventions to claude in firefox and chrome
```

```
✅ step: Change in taxonomy: adding the philosophy of ADR and specifying which file in which type of project on GitHub should come
```

```
✅ commit changes
```

```
✅ step: Change in ai-integration-workflow: it should be added that for "editing a document and not writing it from scratch" what approach should be used
```

```
✅ commit changes
```

```
✅ step: Move capability logger usage file to capability-guidelines.md in guideline directory
```

```
✅ commit changes
```

```
✅ loop: Focus on MetadataTab.tsx
```

```
✅ commit changes
```

```
✅ step: Create Zod Schema and local Types for the Identity section
  Define a Schema limited to the fields of this card (title, slug, summary)
  Implement SEO Standards rules in Schema:
    Slug length between 3 to 75 characters
    Check Pattern of Regex for Slug (^[a-z0-9]+(?:-[a-z0-9]+)*$)
    Compare Slug with a Mock list of reserved words (such as admin, api, drafts, archive, preview)
```

```
✅ commit changes
```

```
✅ step: Set up React Hook Form
```

```
✅ commit changes
```

```
✅ step: Set up Shadcn Form
  Create a Form from Shadcn at the component level (or Mock initial values)
  Connect useForm to the zodResolver built in the first step
```

```
✅ commit changes
```

```
✅ step: Build interactive Inline Editable Header component (H1 Title field)
  Display state (inactive):
    Render as a real <h1> with SEO text style (text-[2rem] font-bold leading-[1.2])
    Display the text Untitled Header if empty
    Display an interactive Badge with the title Click to edit below or next to the title
  Edit state (active):
    By clicking on the Badge or H1 text, the component switches to an auto-growing (Autosize) <textarea> or <input> without Border/Outline
    With onBlur events or Enter key (in case of Input) the form returns to Display state
```

```
✅ commit changes
```

```
✅ step: Implement UI logic for Slug & Auto-Generation
  Automatic generation:
    Listen to changes of the title field with useWatch and simultaneously convert it to standard Slug (lowercase letters, convert space to - and remove unauthorized characters) — only if the user has not yet manually edited the Slug
  UI and Slug error Indicator:
    Design display of Slug status under H1
    Display a Warning icon with alert color (Alert) in case of violation of SEO rules or reserved Slug
    Display a Tooltip or live Message to explain the reason for the error (for example: "Slug length must be between 3 to 75 characters" or "This slug is among the reserved words of the system")
```

```
✅ commit changes
```

```
✅ step: Build Inline Editable Summary / Description component
  Implement behavior similar to H1 for the article summary field (Summary)
  Display Display state as normal text and switch to Inline Textarea state on click
```

```
✅ commit changes
```

```
✅ commit runbook
```

Media card:  Cover image (with mandatory Alt Text), Thumbnail image (shows automatic Alt Text that comes from the formula <cover-alt>_thmb and is non-editable).

```
✅ step: Update Zod Schema and local Types for the Assets section
  Define Validation rules for fields:
    coverImage: mandatory for publishing (containing Object or file URL)
    coverAltText: mandatory for publishing
    thumbnailImage: mandatory for publishing
    thumbnailAltText: not directly editable (Read-only), generated from the formula <cover-alt>_thmb        
```

```
✅ commit changes
```

```
✅ step: Build image upload component with Shadcn Base Attachment
  Use Base Attachment for the two fields Cover Image and Thumbnail Image
    Implement different UI states in the component:
      Empty state (Empty / Dropzone): display upload icon + guide (allowed formats JPG, PNG, GIF / not allowed SVG and Lottie)
      Selected state (Attachment Item View): display preview image (Preview), file name, file size and action buttons (delete / replace)
```

```
✅ commit changes
```

```
✅ step: UI logic for automatic generation of suggested Alt from file name
  When selecting/dropping the file in the Cover Image section:
    Extract the file name (for example my-cover-photo.png)
    Apply Format/Slugify function on it (convert to my cover photo)
    Set this value as the default (Default Value) of the Cover Alt Text field (if the field has been empty so far)
    
```

```
✅ commit changes
```

```
✅ step: Implement interactive Alt Text fields (Cover & Thumbnail)
  Cover Alt Text field:
    a normal <Input> from Shadcn
    possibility of manual editing by the user
    an <Input> in disabled or readOnly state
    connect to the Cover Alt Text value using useWatch in React Hook Form
    live display of the _thmb suffix (for example my cover photo_thmb)
    add a small Badge or Tooltip next to the field with the title: "Auto-generated from Cover Alt Text"
```

```
✅ commit changes
```

```
commit runbook
```

Classification card:
* Selection from the 20 most recent series (Single-select/Radio style).
* "Create New Series" button/option (which opens a new tab for /admin/add-series and updates this list in real-time with Event-Driven actions).
* Tag management (select tags with automatic Suggestion + add new tag).

```
loop: Focus on ClassificationCard.tsx
```

```
commit changes
```

SEO card: SEO title, SEO description, Canonical link.

```backlog
///
step: Build accordion / advanced section related to SEO Fields
///

///
step: Design a simple Collapsible or Accordion under the Summary field with the title "SEO Settings (Optional)"
///

///
commit changes
///

///
step: Place 3 Shadcn text fields: SEO Title: along with display of recommended length Indicator (30 to 60 characters) + display of moving Fallback text: "If empty, Article Title is used"
///

///
commit changes
///

///
step: SEO Description: along with display of recommended length Indicator (120 to 160 characters) + display of moving Fallback text: "If empty, Summary is used"
///

///
commit changes
///

///
step: Canonical URL: text field with absolute link Validation (https://...) + display of Fallback text: "If empty, the article URL is used"
///

///
commit changes
///

///
step: Step 7: Styling, Visually Disabled states and Slug Lock UI
///

///
step: Implement Visual State for Slug Lock state (72-hour lock) as Mock (for example a simple Prop isLocked={true})
///

///
commit changes
///

///
step: Disable the Slug field and display the lock icon
///

///
commit changes
///

///
step: Design UI for Emergency Override switch and warning modal/box UX (Warn 404/504) in case of activating the override switch
///

///
commit changes
///

```

```
loop: Focus on SEOCard.tsx
```

```
commit changes
```

```todo:subbranches
step: Checkout the branch feature/pcp-ui-article-crud
```

```todo:subbranches
step: Merge the branch feature/pcp-article-metadata into feature/pcp-ui-article-crud
```

```todo:subbranches
step: Delete the branch feature/pcp-article-metadata
```

```todo:subbranches
step: go to article-creation-and-edit-runbook line 43
```