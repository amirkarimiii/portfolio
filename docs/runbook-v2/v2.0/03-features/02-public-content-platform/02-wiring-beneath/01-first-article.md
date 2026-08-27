```todo:subbranches
✅ step: make branch feature/pcp-first-article
```

We go for building the first article (this article will probably remain untouched as we wrote it and only its photo will be standardized later)

```
✅ step: Change the form label of each section in add-article
```

```
✅ commit changes
```

```
✅ step: Convert the preview performance to publish (temporary)
```

```
✅ commit changes
```

```
✅ step: change content saving format
```

```
✅ commit changes
```

```
✅ step: chack for prevent slug duplications
```

```
✅ commit changes
```

```
✅ step: fix styles in assests form and content validation message
```

```
✅ commit changes
```

```
✅ step: integration to a real cdn for image upload
```

```
✅ commit changes
```

```
✅ step: Deal with the problem of photos inside the article body (apparently this node only exists now and does not have insert and is not connected to an action)
```

```
✅ commit changes
```

```
✅ step: if we already had image, don't upload again, but use the previous on
```

```
✅ commit changes
```

```
✅ step: Check if reference article and reference series are in json
  If not it must be checked
```

```
✅ step: Check if the tags are inherited and injected correctly
```

```
✅ commit changes
```

```
✅ step: The address of the photo must be placed in next.config through the correct and safe way
```

```
✅ commit changes
```

```
✅ step: fix absence of attr in imageBlock
```

```
✅ commit changes
```

```
✅ loop: Fill the article identity section
  Build raw mock files
  Build helper method for finding all the slugs
```

```
✅ step: Define types and interfaces related to Strategy and build an initial Mapper/Registry
```

```
✅ commit changes
```

```
✅ step: Build Renderer for simple text and title Nodes (paragraph, heading, blockquote, codeBlock, lists)
```

```
✅ commit changes
```

```
✅ step: Build Renderer for image block (imageBlock) with strict adherence to Alt Text and Fallback rules
```

```
✅ commit changes
```

```
✅ step: Build Renderer for content references (contentReference) with handling of 404/archived and Fallback cards
```

```
✅ commit changes
```

```
✅ step: Combine all strategies in ContentRenderer.tsx
```

```
✅ commit changes
```

```
✅ step: Implement the page.tsx routes (standalone article and series member article)
```

```
✅ commit changes
```

```
✅ step: Fill the classification section
  Merely test tag selection for the first article
  ‼️ For the first article we do not have membership and as a result building series and all the work that must be done for building series
```

```
✅ commit changes
```

```
✅ step: Fill the seo section
  Merely test this section
```

```
✅ commit changes
```

```
✅ step: Fill the body
  ‼️ Currently we do not have reference to article and series for the first article
```

```
✅ commit changes
```

```
✅ step: Check the mock file to see whether all the information that must be is there or not
```

```
✅ commit changes
```

```
✅ commit runbook
```

After that we go for building the first series


```
✅ step: Change the form label of each section in add-series
```

```
✅ commit changes
```

```
✅ step: Fill the article identity section
  Build raw mock files
  Build helper method for finding all the slugs
```

```
✅ commit changes
```

```
✅ step: Fill the assets section
  Provide photo upload to cdn in a basic way
  Test upload
  Free the vercel cdn domain in next config
```

```
✅ step: Fill the assets section with the same previous photos (test duplication in cdn)
```

```
✅ commit changes
```

```
✅ commit changes
```

```
✅ step: Fill the classification section
  Merely test tag selection for the first article
```

```
✅ commit changes
```

```
✅ step: Fill the seo section
  Merely test this section
```

```
✅ commit changes
```

```
✅ step: Check the mock file to see whether all the information that must be is there or not
```

```
✅ commit changes
```

```
✅ step: Add connection between SeriesPickerPopover and SeriesCreationSection with broadcast channel
```

```
✅ commit changes
```

```
✅ commit runbook
```

```todo:subbranches
✅ step: Checkout the branch feature/pcp-wiring-beneath
```

```todo:subbranches
✅ step: Merge the branch feature/pcp-first-article into feature/pcp-wiring-beneath
```

```todo:subbranches
✅ step: Delete the branch feature/pcp-first-article
```

```todo:subbranches
✅ step: go to article-creation-and-edit-runbook line 15
```