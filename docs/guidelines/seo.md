# SEO Standards

## 1. SEO Title

### Purpose

The title used for display in the Search Engine Results Page (SERP) and Browser Tab.

### Requirements

* **Required:** No
* **Fallback:** `Article Title`
* Must be descriptive, readable, and relevant to the article content.
* Avoid keyword stuffing.
* The title must be understandable for the user and not written solely for search engines.

### Recommended Length

* **Recommended:** 30–60 characters
* Exact length should be determined based on the actual content and the need to convey meaning.
* A strict character limit should not be enforced as a publishing rule to prevent title truncation in SERP.

---

## 2. SEO Description

### Purpose

The text used as the page’s Meta Description.

### Requirements

* **Required:** No
* **Fallback:** `Summary / Excerpt`
* Must be an accurate and relevant summary of the article content.
* Should encourage the user to view the content without using irrelevant clickbait.
* Avoid keyword stuffing.

### Recommended Length

* **Recommended:** 120–160 characters
* This is a recommended range and should not be treated as a hard publishing limit.

---

## 3. Slug

### Purpose

The unique part of the URL used to identify and access the article.

### Uniqueness

* The Slug must be unique across the entire database.
* Two articles cannot have the same Slug.
* Uniqueness checks must also be performed in the Backend / Database and must not rely solely on client-side validation.

### Length

* **Minimum:** 3 characters
* **Maximum:** 75 characters
* **Recommended:** 20–60 characters

### Character Rules

The Slug must:

* Be written in lowercase letters.
* Contain only letters, numbers, and `-`.
* Not use spaces.
* Not use `_`.
* Not start or end with `-`.
* Not contain consecutive `-` characters.
* Not use Query String or Fragment.

### Recommended Pattern

```text
^[a-z0-9]+(?:-[a-z0-9]+)*$
```

### Reserved Slugs

System-reserved Slugs are not usable.

Examples:

* `admin`
* `api`
* `drafts`
* `archive`
* `preview`

The complete list of Reserved Slugs must be maintained centrally at the system level.

### Slug Generation

When automatically generating aSlug from the Article Title:

1. Convert letters to standard format.
2. Convert spaces to `-`.
3. Remove or normalize disallowed characters.
4. Convert consecutive `-` characters to a single `-`.
5. Remove leading and trailing `-` from the Slug.
6. Check uniqueness.

---

## 4. Slug Locking

### Initial Editing Period

The Slug is editable from the time of the article’s first publication for **72 hours**.

Reference:

`first_published_at`

### Lock Rule

After 72 hours from `first_published_at`:

* The Slug becomes **Immutable**.
* The field becomes non-editable in the UI.
* The Backend must also block any Slug changes.
* Lock status must not be controlled solely by UI state.

### Emergency Override

The site owner can Override theSlug Lock in emergency cases.

Example use cases:

* Correcting a spelling error
* Fixing an obvious error in the URL
* Correcting a technical error

Activating Override must display a UX warning that changing the URL may cause:

* Broken Link
* 404
* 504
* SEO drop or disruption
* Loss of previous links

If the Slug is changed after Lock, the system should, where the necessary infrastructure exists, create an appropriate Redirect from the previous URL to the new URL.

---

## 5. Canonical URL

### Purpose

The Canonical URL is used to specify the primary URL of a piece of content when the same content is also published at another URL or on another platform.

### Requirements

* **Required:** No
* The value must be a valid Absolute URL.
* If empty, the default Canonical will be the current page.
* Canonical must not resolve to an invalid URL or a Relative URL.

### Example

```text
https://example.com/blog/example-article
```

---

## 6. Fallback Rules

| Field           | User Value | Fallback            |
|-----------------|------------|---------------------|
| SEO Title       | Empty      | Article Title       |
| SEO Description | Empty      | Summary / Excerpt   |
| Canonical URL   | Empty      | Current Article URL |

Fallback must be applied at the time of final page render so that the output Metadata always has a valid value.

---

## 7. Validation Summary

| Field           | Required | Recommended   | Hard Limit |
|-----------------|----------|---------------|------------|
| SEO Title       | No       | 30–60 chars   | No         |
| SEO Description | No       | 120–160 chars | No         |
| Slug            | Yes      | 20–60 chars   | 3–75 chars |
| Canonical URL   | No       | Absolute URL  | Valid URL  |

---

## 8. Publishing Requirements

For publishing an article:

* Article Title must exist.
  *Slug must exist and be unique.
  *Slug must not be Reserved.
* Cover Image must exist.
* Cover Alt Text must exist.
* Thumbnail must exist.
* Other SEO Metadata, if empty, must be generated according to the Fallback Rules.