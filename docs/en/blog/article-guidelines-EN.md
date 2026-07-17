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

Style

> TODO

---

## Lists

Style

> TODO

---

## Blockquote

Style

> TODO

---

## Code Block

Style

> TODO

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

**v1.1**

* Added explicit Out of Scope list for Images (Resize, Drag & Drop, Float,
  Alignment, Crop).
* Moved Embeds out of v1 scope; rescheduled for v1.2 (backlog). The editor
  must expose a deactivated control as a placeholder/reminder.