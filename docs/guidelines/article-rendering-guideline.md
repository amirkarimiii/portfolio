# Article Guidelines

## Purpose

This document defines the content standards for articles published on the
portfolio blog.

Its purpose is to establish a single source of truth for:

* Supported content elements
* Rendering expectations
* Content consistency across the project

The editor, renderer, and future tooling should follow these guidelines.

---

# 1. Document Structure

## Article Title

* The article title (H1) is managed outside the editor.
* Each article must contain exactly one H1.

## Headings

Supported:

* H2
* H3
* H4

Additional heading levels are intentionally unsupported.

## Paragraph

Paragraph is the default content block.

## Blockquote

Supported for quotations and highlighted references.

## Code Block

Supported for multi-line source code.

---

# 2. Text Formatting

Supported:

* Bold
* Italic
* Underline
* Strike-through
* Inline Code
* Highlight

Not supported:

* Text Color
* Font Family
* Font Size
* Text Alignment

---

# 3. Lists

Supported:

* Bullet List
* Ordered List

Nested lists are supported where appropriate.

---

# 4. Links

Supported:

* Create Link
* Edit Link

Rendering requirements:

* Blog-specific styling
* Accessible focus state
* Light Mode support
* Dark Mode support

---

# 5. Highlight

Supported:

* Single highlight style

Rendering must use colors defined by the Design System.

---

# 6. Images

Supported:

* Image
* Optional Alt Text
* Optional Caption

Rendering requirements:

* Center aligned
* Rounded corners
* Responsive sizing

If Alt Text is empty, the article title should be used as the fallback.

Captions are rendered only when provided.

### Out of Scope

The following image capabilities are intentionally excluded from this
version:

* Resize
* Drag & Drop
* Float
* Alignment
* Crop

---

# 8. Editor History (Hotfix Documentation)

Supported commands to manage the editor's state and history during the writing session. *Note: This feature has been present since v1.0; its inclusion here corrects a previous documentation omission.*

## Undo
* Reverts the last unsaved change in the editor.
* The control must be disabled when there are no actions left to undo.

## Redo
* Reapplies the last action that was undone.
* The control must be disabled when there are no undone actions left to restore.

### Scope Control
* Editor state history is temporary and lives in-memory during the editing session.
* These controls are purely operational within the editor UI and do not affect the final rendered article content.

# 9. Rendering Guidelines

The visual appearance of each supported content element is documented
incrementally during development.

The following sections are intentionally left as placeholders.

## Headings

The following typography tokens apply specifically to headings rendered within the `.ProseMirror` editor container.

### H1

* **Font Size:** `2rem` (32px)
* **Weight:** `700` (Bold)
* **Line Height:** `1.2`
* **Spacing:** Top margin `2rem`, Bottom margin `1rem`

### H2

* **Font Size:** `1.5rem` (24px)
* **Weight:** `700` (Bold)
* **Line Height:** `1.3`
* **Spacing:** Top margin `1.75rem`, Bottom margin `0.75rem`

### H3

* **Font Size:** `1.25rem` (20px)
* **Weight:** `600` (Semi-Bold)
* **Line Height:** `1.4`
* **Spacing:** Top margin `1.5rem`, Bottom margin `0.5rem`

### H4

* **Font Size:** `1.125rem` (18px)
* **Weight:** `600` (Semi-Bold)
* **Line Height:** `1.5`
* **Spacing:** Top margin `1.25rem`, Bottom margin `0.5rem`

---

## Paragraph

Paragraphs serve as the default block-level structural element for body text, inheriting core typography tokens from the global design system.

* **Typography:** Inherits the global body font-family, base font-weight, and base font-size from the global styles.
* **Line Height:** Inherits the project's standard readability-optimized line-height (e.g., `1.5` or `1.6`).
* **Spacing:** Accommodates default vertical block margins (`margin-top: 0`, `margin-bottom: 1rem` or user-agent defaults) to ensure consistent content pacing between text blocks.
* **Context Constraints:** When nested inside structured containers like `blockquote`, default vertical margins are discarded (`margin: 0`) to maintain container alignment.

---

## Lists

Supports both bulleted and ordered structures with strict nesting indentation rules and multi-level indicator variations.

* **Containers (`ul`, `ol`):**
    * **Margins:** Top/Bottom `1rem`, Left/Right `0` (for root level)
    * **Indentation:** Controlled via `padding-inline-start: 1.5rem` to support both LTR and RTL directions natively.
* **List Items (`li`):**
    * **Spacing:** Vertical margin `0.25rem`, Horizontal `0`
    * **Child Elements:** Any inner paragraph (`li > p`) must have its vertical margins removed (`margin: 0`) to preserve tight list item spacing.
* **List Markers (Bulleted - `ul`):**
    * **Level 1 (Root):** `disc`
    * **Level 2 (Nested):** `circle`
    * **Level 3+ (Deep Nested):** `square`
* **List Markers (Ordered - `ol`):**
    * Standard sequential numbering using `decimal`.
* **Nesting Behavior:**
    * When any list type is nested inside another list item, root vertical margins are discarded and replaced with a compact vertical margin (`margin: 0.25rem 0`).

---

## Blockquote

Rendered with a subtle background and a distinct left border using the core Design System tokens.

* **Margins:** Vertical margin `1rem`, Horizontal margin `0`
* **Padding:** Top/Bottom `0.25rem`, Left padding `1rem` (Right padding `1rem` for RTL layout if applicable)
* **Border:** Left border of `0.125rem` (2px) solid `var(--primary)`
* **Background:** `color-mix(in srgb, var(--primary), transparent 95%)` (Creates a 5% opacity tint of the primary color)
* **Typography:** Inherits default text sizes but enforces `font-style: italic`
* **Child Elements:** Inner paragraphs (`p`) must have their default vertical margins removed (`margin: 0`) to prevent padding distortion.
* **Theme Support:**
    * **Light Mode:** Uses the light-theme primary accent for the left border.
    * **Dark Mode:** Inherits the dark-theme primary accent via `.dark` container context.

---

## Code Block

Designed for multi-line source code rendering with built-in dark mode adaptations and horizontal overflow handling.

* **Container (`pre`):**
    * **Margins:** Vertical margin `1rem`, Horizontal margin `0`
    * **Padding:** Top/Bottom `0.875rem`, Left/Right `1rem`
    * **Border:** `0.125rem` (2px) solid `var(--border)`
    * **Border Radius:** `0.5rem` (8px)
    * **Overflow:** `overflow-x: auto` (Prevents horizontal clipping by enabling custom container scrolling)
* **Typography (`code`):**
    * **Font Family:** `"JetBrains Mono"`, `"Fira Code"`, `"Cascadia Code"`, `Consolas`, `monospace` (Cascading monospace stack)
    * **Font Size:** `0.9rem`
    * **Line Height:** `1.7` (Optimized for technical readability)
* **Theme Support:**
    * **Light Mode:** Background uses `color-mix(in srgb, var(--primary), transparent 95%)` (5% primary tint) with default inherited text color.
    * **Dark Mode:** Background switches to `var(--muted)` and text color is explicitly set to `var(--foreground)` for accessible code contrast.

---

## Links

Rendered as inline component-like elements with enhanced background contrast, cross-line wrapping support, and interactive states.

* **Geometry & Styling:**
    * **Border & Radius:** `1px solid` with a `0.45rem` border-radius.
    * **Padding:** Compact vertical-horizontal alignment (`0` top, `0.2rem` right/left, `0.1rem` bottom).
    * **Decorations:** `text-decoration: none` (relies on background/border instead of underlines).
* **Behavior Constraints:**
    * **Cursor:** Explicitly set to `cursor: text` inside the editor container to allow seamless text selection and editing without triggering accidental navigation.
    * **Wrapping:** Uses `overflow-wrap: anywhere` and `box-decoration-break: clone` to ensure clean padding and border rendering when a link spans across multiple lines.
* **Theme Support:**
    * **Light Mode:** Light blue background (`rgb(239 246 255)`), soft blue border, and rich blue text (`rgb(37 99 235)`).
    * **Dark Mode:** Deep slate background (`rgb(30 41 59)`), semi-transparent blue border (`rgb(59 130 246 / 0.4)`), and light blue text (`rgb(147 197 253)`).
    * **Hover State:** Applies a global `filter: brightness(0.95)` for subtle visual feedback.

---

## Text Marks (Highlight & Default Formatting)

Inline text marks modify inline text appearance. Custom overrides apply to Highlight and Inline Code, while core typographic elements inherit native editor behaviors.

### Highlight (`mark`)
* **Styling:** Enforced `border-radius: 0.25rem` and exact padding (`0.05em 0.18em`) for blocky inline indicators. Text color explicitly inherits the surrounding block's color context.
* **Theme Support:**
    * **Light Mode:** Warm amber background (`#fde68a`) with inherited text color.
    * **Dark Mode:** Deep dark-gold background (`#a16207`) paired with high-contrast `white` text.

### Inline Code (`:not(pre) > code`)
* **Typography:** `font-family: var(--font-geist-mono)` with a `0.85em` size and medium weight (`500`).
* **Geometry:** `1px solid var(--border)` with `0.45rem` rounded corners and tight padding (`0.12rem 0.38rem`).
* **Coloring:** Utilizes advanced color blending via `color-mix(in oklab, var(--muted) 90%, transparent)` to secure a dynamic adaptive backdrop regardless of layout background depth.

### Default Marks (Bold, Italic, Underline, Strike-through)
* Reflect baseline browser and native Tiptap behavior with zero custom style overrides, ensuring total compatibility with standard content structure formats.