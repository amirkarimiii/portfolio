Tab 2 includes editor works:
* TipTap-based editor (limited to H2, H3, H4 without H1).
* Ability to insert inline media and Content Cards (Article/Series Reference).

```todo:subbranches
✅ step: make branch feature/pcp-article-content
```

```
✅ step: Remove out of scope buttons and icons from Toolbar and standardize ButtonGroups
  Target file: src/features/article-publishing/article-editor/toolbar/Toolbar.tsx
  Actions:
    Remove inactive buttons related to YouTube and XCorp (Twitter) from the end of the toolbar
    Remove Imports and icons YouTubeIcon and XCorpIcon from icons.tsx or do not call them in Toolbar.tsx
    Keep the ImagePlus button as the only media action in the toolbar so that in the next step we build its own special component (ImageButton) for it
```

```
✅ commit changes
```

```
✅ step: Remove out of scope buttons and icons from Toolbar and standardize ButtonGroups
  Target file: src/features/article-publishing/article-editor/toolbar/Toolbar.tsx
  Standardize and rearrange ButtonGroups in Toolbar
    Fix the structure of repetitive and nested ButtonGroups in Toolbar.tsx
    Logical arrangement of groups with separators (ButtonGroupSeparator):
      1. Group 1 (History): Undo / Redo
      2. Group 2 (Headings): H2 / H3 / H4
      3. Group 3 (Text Marks): Bold / Italic / Underline / Strikethrough / InlineCode / Highlight
      4. Group 4 (Lists & Blocks): Bullet List / Ordered List / Blockquote / Code Block
      5. Group 5 (Links & Embeds): Link / Image
```

```
✅ commit changes
```

```
✅ step: Remove temporary test elements from ContentTab.tsx
  Target file: src/features/article-publishing/article-editor/ContentTab.tsx
  Actions:
    Remove the temporary Button related to handleLogContent and console.log from the top of the editor
    Adjust the style and classes of the main layer of the ContentTab component for preparation to receive specialized rendering CSS of .ProseMirror
```

```
✅ commit changes
```

```
✅ commit runbook
```

```
✅ step: Update and fix documents (Documentation Updates)
  Target file: docs/guidelines/article-rendering-guideline.md
  Actions:
    Add explicit reference in the Images section: "Image dimension, size, and format validation standards are defined centrally in media.md."
    Record the new interactive standard: "Image insertion uses an in-place block-level form within the editor canvas (not a modal/popover)."
    Mention the capability of removing the image from the document with the X icon (without instantaneous cleanup from CDN in the editor layer)
```

```
✅ commit changes
```

```
✅ step: Build Custom Tiptap Node / NodeView for the image form
  Target file: src/features/article-publishing/article-editor/extensions/embed-extensions.ts (or build a separate extension like image-block-extension.ts)
  Actions:
    Develop a Custom Node with ReactNodeView that has two states (State):
      1. Edit / Placeholder state: Render file selection form (Base Attachment) + Alt Text field (with capability of suggesting file name and displaying Fallback) + optional Caption field
      2. Rendered Image state: Display the final image centered, rounded corners (rounded-lg), display Caption under the photo (if exists) and a floating X button (Close/Remove) for complete removal of the Node from the document
```

```
✅ commit changes
```

```
✅ step: Create ImageButton component and connect to Toolbar
  Target file: src/features/article-publishing/article-editor/toolbar/ImageButton/ImageButton.tsx (and related initializer file)
  Actions:
    Build the ImageButton component to replace the current simple button in Toolbar.tsx
    Execute the command to insert Custom Image Block Node at the current cursor position by clicking the button
```

```
✅ commit changes
```

```
✅ commit runbook
```

```
step: Configure the main editor Container and .ProseMirror class
  Target file: src/features/article-publishing/article-editor/ContentTab.tsx (or CSS module / related style file)
  Actions:
    Set the standard content width (max-w-[728px] or the value specified in the guideline) and place it in the center of the page (mx-auto)
    Apply paddings, base font, main text color (text-foreground) and editor background for both Light and Dark themes
    Set minimum height (min-h-[500px]) and Focus state on the editor (outline-none)
```

```
commit changes
```

```
step: Precise styling of typography (Headings, Paragraphs & Lists)
  Target file: editor CSS file (for example editor.css or classes targeted on .ProseMirror)
  Actions:
    Headings (H2, H3, H4): Apply sizes (text-2xl, text-xl, text-lg), font-weight (Bold/Semibold), and vertical spacing (Margin Top/Bottom) precisely according to the guideline
    Paragraphs: Set line heights (leading-relaxed or line-height) and spaces between paragraphs (mb-4)
    Lists (Bullet & Ordered): Style <ul> and <ol> for correct display of Bullets, numbers, Indentation and item spacing
```

```
commit changes
```

```
step: Styling of Inline Marks and Block Quotes / Highlights
  Target file: .ProseMirror styles
  Actions:
    Links: Style links (Accent color, having underline or hover effect)
    Inline Code: Mild background, rounded corners (rounded), Monospace font (font-mono) and small horizontal padding
    Highlight: Set highlight background color based on the theme (Light/Dark Mode)
    Blockquote: Apply left Border (with Accent color), left/right padding, Italic font and grayish text color (text-muted-foreground)
```

```
commit changes
```

```
step: Styling of Code Block
  Target file: .ProseMirror pre and .ProseMirror code styles
  Actions:
    Set dark/special codeblock background, rounded corners (rounded-lg), and appropriate padding
    Set code font to JetBrains Mono (or the project's mono vector font)
    Support horizontal Overflow (overflow-x-auto) for scrolling long codes without disrupting the editor layout
```

```
commit changes
```

```
commit runbook
```

```
step: Connect Tiptap to React Hook Form / main form State
  Target files: src/features/article-publishing/article-editor/ContentTab.tsx and src/features/article-publishing/components/tabs/ContentTab.tsx
  Actions:
    Create EditorSkeleton.tsx component using Shadcn Skeleton
    Place the condition if (!editor) return <EditorSkeleton/> to prevent rendering and Hydration errors
    Completely remove hardcoded or local Data/States in ContentTab.tsx
    Define Controller or communication Prop (value, onChange) between Tiptap ContentTab and React Hook Form so that the HTML or JSON content of the editor is directly updated in the article Form State
    Synchronize Initial Value (initial content of the article when editing or re-drafting)
```

```
commit changes
```

```
step: Integrate with Debounce & Autosave mechanism
  Target file: src/features/article-publishing/components/tabs/ContentTab.tsx
  Actions:
    Connect the onUpdate event of Tiptap to the automatic storage system (Autosave)
    Apply Debounce mechanism (for example 500 to 1000 milliseconds) on the editor content changes to prevent unnecessary Triggering of Autosave during the user's fast typing
    Display Autosave status (such as "Draft saved" or "Saving...") in the overall form status
```

```
commit changes
```

```
step: Implement Validation method for the Content field
  Target file: Validation schemas related to the article (such as React Hook Form / Zod Schema)
  Actions:
    Validate that the article content is not empty (Empty Document Validation)
    Check for empty tags (for example <p></p>) and map it to the error "Article content cannot be empty"
    Connect form Validation errors to the editor UI layer (display red Border or error message under the editor in case of Submit without content)
```

```
commit changes
```

```
step: Final cleanup, Integration test and preparation of ContentTab
  Target file: src/features/article-publishing/components/tabs/ContentTab.tsx
  Actions:
    Place the editor component in the final layout of ContentTab (according to the designed UI/UX standards and Spacing) along with skeleton
```

```
commit changes
```

```todo:subbranches
step: Checkout the branch feature/pcp-ui-article-crud
```

```todo:subbranches
step: Merge the branch feature/pcp-article-content into feature/pcp-ui-article-crud
```

```todo:subbranches
step: Delete the branch feature/pcp-article-content
```

```todo:subbranches
step: go to article-creation-and-edit-runbook line 73
```