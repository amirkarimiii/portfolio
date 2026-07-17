# Article Guidelines (v1.1.2)

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

### Out of Scope (v1)

The following image capabilities are intentionally excluded from this
version:

* Resize
* Drag & Drop
* Float
* Alignment
* Crop

---

# 7. Embeds — Backlog (Planned for v1.2)

Embeds (YouTube, Twitter/X) are **out of scope for v1** and are planned for
version 1.2.

* No embed rendering is required in v1.
* The corresponding editor control must remain visible but **deactivated**,
  serving as a reminder that this feature is planned rather than omitted.
* Rendering requirements (responsive layout, Light/Dark Mode compatibility)
  will be defined when the feature is scheduled for implementation.

---

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

Style

> TODO

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

Style

> TODO

---

## Highlight

Style

> TODO

---

## Images

Style

> TODO

---

## Embeds

Style

> TODO — deferred to v1.2

---

# Revision Policy

This document is a living document.

New content elements may be introduced only after evaluating whether they
align with the blog's publishing requirements.

## Changelog

**v1.1.2**
* **Documentation Fix:** Added missing guidelines for **Editor History (Undo / Redo)**. This capability has been supported in the editor since v1.0 but was previously omitted from the documentation.
* **Specification Update:** Documented explicit typography and spacing tokens for **Headings (H2, H3, H4)** under Rendering Guidelines, matching the newly added styles in `globals.css`.
* **Specification Update:** Documented baseline rendering rules and structural constraints for **Paragraph**, formalizing the reliance on default editor and global layout typography.
* **Specification Update:** Documented design tokens, border, background, and theme requirements for **Blockquote** under Rendering Guidelines, aligned with the CSS implementation.
* **Specification Update:** Documented container geometry, typography stacks, overflow behaviors, and theme-specific contrasts for **Code Block** under Rendering Guidelines.

**v1.1**

* Added explicit Out of Scope list for Images (Resize, Drag & Drop, Float,
  Alignment, Crop).
* Moved Embeds out of v1 scope; rescheduled for v1.2 (backlog). The editor
  must expose a deactivated control as a placeholder/reminder.