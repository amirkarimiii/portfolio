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
loop: Focus on MetadataTab.tsx
```

```
commit changes
```

```
loop: Focus on IdentityCard.tsx
```

```
commit changes
```

```
loop: Focus on AssetsCard.tsx
```

```
commit changes
```

```
loop: Focus on ClassificationCard.tsx
```

```
commit changes
```

Media card:  Cover image (with mandatory Alt Text), Thumbnail image (shows automatic Alt Text that comes from the formula <cover-alt>_thmb and is non-editable).

```todo
loop: design Media card
```

Classification card:
* Selection from the 20 most recent series (Single-select/Radio style).
* "Create New Series" button/option (which opens a new tab for /admin/add-series and updates this list in real-time with Event-Driven actions).
* Tag management (select tags with automatic Suggestion + add new tag).

```todo
loop: design Classification card
```

SEO card: SEO title, SEO description, Canonical link.

```todo
loop: design SEO card
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