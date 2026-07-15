# Editor Definition of Done (v1.1)

## Purpose

This document defines the completion criteria for the blog editor.

The editor is intentionally designed for authoring articles for this
project and is not intended to be a general-purpose rich text editor.

Supported editing capabilities are determined by the Article Guidelines.

---

# 1. Supported Features

The editor provides editing support only for content elements defined in
the Article Guidelines.

Unsupported features must not appear in the toolbar or command palette.

---

# 2. Toolbar Requirements

Every toolbar action must:

* Display the correct active state.
* Display an appropriate tooltip.
* Execute the expected editor command.
* Be disabled when unavailable.

Only supported features are exposed.

---

# 3. Editing Behavior

Every supported feature must work correctly with:

* Cursor position
* Text selection
* Empty paragraphs
* Existing formatted content

---

# 4. History

The following operations must preserve editor consistency:

* Undo
* Redo
* Copy
* Cut
* Paste

Toolbar active states must remain correct after each operation.

---

# 5. Images

Image insertion must support:

* Upload or insertion workflow
* Optional Alt Text
* Optional Caption

The produced output must conform to the Article Guidelines.

### Out of Scope (v1)

The following image capabilities are intentionally excluded from this
version:

* Resize
* Drag & Drop
* Float
* Alignment
* Crop

---

# 6. Embeds — Backlog (Planned for v1.2)

Embeds are **out of scope for v1**, not for the product as a whole, and are
planned for version 1.2.

* No embed insertion, validation, or rendering logic is required in v1.
* The Embed toolbar control must remain present but **deactivated**
  (disabled state), so it acts as a visible reminder to developers that the
  feature exists on the roadmap rather than being silently missing.
* Validation of supported providers, document output, and renderer
  compatibility will be defined as part of the v1.2 scope.

---

# 7. HTML Output

Generated HTML must:

* Be semantic.
* Be valid.
* Match the rendering expectations defined in the Article Guidelines.

---

# 8. Quality Checklist

The task is considered complete when:

* All supported features behave correctly.
* No runtime errors occur.
* No console errors occur.
* Toolbar state always reflects editor state.
* Generated output matches the Article Guidelines.
* Chrome has been tested.
* Firefox has been tested.
* The editor and rendered output are Responsive across supported viewport
  sizes.
* Loading states are handled correctly (no layout shift, no broken/partial
  UI while content or assets are loading).
* Output is compatible with SSR (Server-Side Rendering) — no
  hydration mismatches or client-only assumptions.
* Dark Mode is fully supported and visually correct across all supported
  elements.

---

# Out of Scope

The following capabilities are intentionally excluded from this version:

* Text Color
* Font Size
* Font Family
* Text Alignment
* Tables
* Multi-column Layout
* Collaborative Editing
* Comments
* Track Changes
* AI-assisted Writing
* Embeds (deferred to v1.2 — toolbar control present but deactivated)
* Image Resize
* Image Drag & Drop
* Image Float
* Image Alignment
* Image Crop

Future versions may revisit these decisions.

---

## Changelog

**v1.1**

* Added Responsive, Loading, SSR, and Dark Mode checks to the Quality
  Checklist.
* Embeds rescheduled to v1.2 (backlog); editor must show a deactivated
  toolbar control as a reminder rather than hiding the feature entirely.
* Added explicit Out of Scope list for Images (Resize, Drag & Drop, Float,
  Alignment, Crop).