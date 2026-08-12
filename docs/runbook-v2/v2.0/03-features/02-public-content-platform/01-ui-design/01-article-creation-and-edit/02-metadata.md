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

Media card:  Cover image (with mandatory Alt Text), Thumbnail image (shows automatic Alt Text that comes from the formula <cover-alt>_thumb and is non-editable).

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
✅ commit runbook
```

Classification card:
* Selection from the 20 most recent series (Single-select/Radio style).
* "Create New Series" button/option (which opens a new tab for /admin/add-series and updates this list in real-time with Event-Driven actions).
* Tag management (select tags with automatic Suggestion + add new tag).

```
✅ step: Prepare Data Model, Mock Data and Schema for tags
  Define data structure and mock array:
    Create a Constant of initial tags with unique keys: const MOCK_EXISTING_TAGS = [ "React", "React Native", "TypeScript", "Next.js", "Architecture", "Tailwind CSS", "Zustand", "Node.js" ]
  Set Zod Schema:
    Add tags field as an array of strings (z.array(z.string()))
    Implement uniqueness condition (Disallow duplicates) and initial validation for tag lengths
```

```
✅ commit changes
```

```
✅ step: Implement UI for Tags section (top part of the card)
  Selected Badges section:
    Create a flexible layout Container (flex flex-wrap gap-2)
    Render tags existing in the form state as Badge from Shadcn
    Add a small X icon on each Badge to remove the tag from the list with onClick event
```

```
✅ commit changes
```

```
✅ step: Implement Autocomplete with Shadcn Combobox / Command
  Use combination of Popover + Command (CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem)
  Live filter logic:
    By typing a phrase (for example rea), the Command component automatically filters the mock array and presents similar items (React and React Native)
  New tag addition logic:
    If the typed phrase does not exist in MOCK_EXISTING_TAGS, the CommandEmpty section becomes an interactive option: "Create tag {input}" which by clicking, adds the new tag both to the selected state and to the local mock array
  Prevent repetition:
    Hide or disable tags that have already been selected from the suggestions list
```

```
✅ commit changes
```

```
✅ step: Implement UI for Series Membership section (bottom part of the card)
  Main action button (Create New Series):
    Place a <Button> with medium width (w-full max-w-md mx-auto block) in the center of the card
    Add Plus or ExternalLink icon from Lucide next to the button text
    Set click action to open the path /admin/add-series in a new browser tab (window.open('/admin/add-series', '_blank'))
  Separator and guide text:
    Render guide text under the button with neutral style (Muted text): "or choose from existing series below"
  Alternative box (Placeholder):
    Design a box with dashed border (border-2 border-dashed border-muted rounded-lg p-6 text-center)
    Place explanatory text inside it to specify the next phases: "Series Picker Placeholder (Top 20 Recent Series)"
```

```
✅ commit changes
```

```
✅ commit runbook
```

SEO card: SEO title, SEO description, Canonical link.

```
✅ step: Set Zod Schema and local Types for the SEO section
  Define Schema:
    seoTitle:
      optional (Optional), without Hard Limit, with length guide 30 to 60 characters
    seoDescription:
      optional (Optional), without Hard Limit, with length guide 120 to 160 characters
    canonicalUrl:
      canonicalUrl: optional (Optional), but if text is entered it must have valid Absolute URL format (starting with https://)
  Define Helper Texts for displaying Fallback status: 
    Build extension/guide text for displaying live Fallback value to the user
```

```
✅ commit changes
```

```
✅ step: Build form with Shadcn components (UI structure of the card)
  Use Card structure:
    Render Card, CardHeader, CardTitle, CardDescription, CardContent
  Card title:
    SEO Metadata
  Card description:
    "Configure title, description, and canonical URL for search engines and social sharing."
```

```
✅ step: Implement SEO Title field + Counter + Fallback Alert
  Input field:
    a standard <Input> from Shadcn
  Character Counter:
    Display the number of typed characters (for example 42 / 60 chars)
    Change the color of characters or guide Badge if outside the range of 30 to 60 characters (only as a guide warning, not blocking)
  Live display of Fallback State:
    Use useWatch on the title field (article title in IdentityCard)
    If the SEO Title field is empty, a box or guide text with style text-muted-foreground is displayed: "Fallback Active: Using Article Title ("{title || 'Untitled Article'}")"
```

```
✅ commit changes
```

```
✅ step: Implement SEO Description field + Counter + Fallback Alert
  Input field:
    a standard <Textarea> from Shadcn (with initial height of 3 or 4 lines)
  Character Counter:
    Display the number of typed characters with guide 120 to 160 characters
  Live display of Fallback State:
    Use useWatch on the summary field (article summary in IdentityCard)
    If the SEO Description field is empty, the guide text is displayed: "Fallback Active: Using Article Summary ("{summary || 'No summary provided'}")"
```

```
✅ commit changes
```

```
✅ step: Implement Canonical URL field + Validation Messaging
  Input field:
    an <Input> with type="url" and placeholder like https://example.com/blog/my-article
  URL validation:
    Display form error message if relative URL (for example /blog/article) or invalid address is entered
  Live display of Fallback State:
    Live display of Fallback State: If the field is empty, the guide text under the field displays: "Fallback Active: Will resolve to the current published article URL at runtime."
```

```
✅ commit changes
```

Final revising style in MetadataTab and Cards

```
✅ step: revising style in MetadataTab
```

```
✅ commit changes
```

```
✅ step: revising style in cards
```

```
✅ commit changes
```

```
✅ commit runbook
```

```todo:subbranches
✅ step: Checkout the branch feature/pcp-ui-article-crud
```

```todo:subbranches
✅ step: Merge the branch feature/pcp-article-metadata into feature/pcp-ui-article-crud
```

```todo:subbranches
✅ step: Delete the branch feature/pcp-article-metadata
```

```todo:subbranches
✅ step: go to article-creation-and-edit-runbook line 43
```