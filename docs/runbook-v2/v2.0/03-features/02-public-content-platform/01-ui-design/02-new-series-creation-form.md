Section 2: New series create form (/admin/add-series - newly added feature)

This form is lighter than the article form and is designed as single-tab (Metadata only):

```
✅ step: Create new directory structure for Reusable forms
  Goal: Create the destination folder according to the project architecture structure
  Creation path: src/features/article-publishing/components/article-form/
```

```
✅ step: Extract and separate the TagPicker component
  Reason: The tags management section in ClassificationCard was a combination of tag management and Series selection button/card. The tag selection section must become independent so that it can be used both in Article and in Series (under the title Default Tags)
  Actions:
    Build the file src/features/article-publishing/components/article-form/TagPicker.tsx
    Transfer the logic of Popover, Command, Search, Create Tag, and Remove Tag from ClassificationCard.tsx to TagPicker.tsx
    Accept clear Props:
      fieldName: field name in the form (for example "tags" for article and "defaultTags" for series)
      label: card title (for example "Selected Tags" or "Default Series Tags")
      placeholder: search/add guide text
```

```
✅ commit changes
```

```
✅ step: Generalize BaseIdentityForm (identity and titles)
  Reason: Article and series both have title, slug, and explanatory text (Summary/Description) but with two differences: title length limitation (Max Chars) and the name of the explanatory text field (Summary in article vs Description in series)
  Actions:
    Build the file src/features/article-publishing/components/article-form/BaseIdentityForm.tsx
    Transfer the logic of Auto-slugify, autoresize of Textareas and Edit States from IdentityCard.tsx to this file
    Add flexible Props:
      titleFieldName: usually "title"
      slugFieldName: usually "slug"
      descriptionFieldName: "summary" for article or "description" for series
      maxTitleLength: optional (undefined for article and 36 for series)
      descriptionPlaceholder: custom placeholder text for the summary/description section
```

```
✅ commit changes
```

```
✅ step: Generalize BaseAssetsForm (cover and thumbnail)
  Reason: The structure of uploading cover, thumbnail, Alt texts and the Auto-derive formula for building thumbnail Alt is 100% identical in both article and series forms
  Actions:
    Build the file src/features/article-publishing/components/article-form/BaseAssetsForm.tsx
    Transfer all JSX and the hook related to useEffect for automatic generation of thumbnailAltText based on coverAltText to the new file
    Ensure complete Reusability without the need for complex Props (because the fields coverImage, coverAltText, thumbnailImage, thumbnailAltText will be identical in both schemas)
```

```
✅ commit changes
```

```
✅ step: Generalize BaseSEOForm (SEO settings)
  Reason: The SEO fields are identical but the Fallback texts that are shown to the admin under the inputs depend on the form type (article or series)
  Actions:
    Build the file src/features/article-publishing/components/article-form/BaseSEOForm.tsx
    Accept Prop with the title entityType: of type 'article' | 'series'
    Customize Fallback texts:
      For example if SEO Title is empty: Using Article Title in article and Using Series Title in series
      If SEO Description is empty: Using Article Summary in article and Using Series Description in series
```

```
✅ commit changes
```

```
✅ step: Update the current article cards (MetadataTab.tsx and subsets)
  Goal: Guarantee 100% health of ArticleCreationSection performance without any change in the current UI output
  Actions:
    Rewrite IdentityCard.tsx to call BaseIdentityForm (without maxTitleLength limitation)
    Rewrite AssetsCard.tsx to call BaseAssetsForm
    Rewrite SEOCard.tsx to call BaseSEOForm with entityType="article"
    Update ClassificationCard.tsx to use the new TagPicker component next to the Create Series/Series Picker button
```

```
✅ commit changes
```

```
commit runbook
```

```
step: Build the main file and chassis of the series section
  Goal: Create the main chassis of the series registration page
  File path: src/features/article-publishing/components/SeriesCreationSection.tsx
  Actions:
    1. Define the SeriesCreationSection component as Client Component ('use client')
    2. Initialize the form using useForm and connect it to seriesFormSchema (with zodResolver)
    3. Wrap the component in FormProvider so that all sub-components have access to the form state
    4. Set the main layout: container with standard maximum width (max-w-4xl mx-auto) proportional to the article layout
```

```
commit changes
```

```
step: Build the top bar of the form (Header & Action Bar)
  Goal: Display the local storage status and dedicated series action buttons
  Actions:
    1. Status Indicator: Display the current form status (Pending / Draft Saved / Failed)
    2. Action Dropdown / Buttons:
      Button Publish (final registration of the series)
      Button Draft (save as draft)
      (Note: Delete/Archive actions remain simple/stub in this stage)
```

```
commit changes
```

```
step: Place the series Identity card (BaseIdentityForm)
  Goal: Get the title, slug and description of the series
  Actions:
    1. Call the BaseIdentityForm component inside the series chassis
    2. Pass the dedicated series configs:
      titleFieldName="title"
      slugFieldName="slug"
      descriptionFieldName="description"
      maxTitleLength={36} (apply strict character count UI limitation on the title Header)
      descriptionPlaceholder="Enter series description..."
```

```
commit changes
```

```
step: Place the series Assets card (BaseAssetsForm)
  Goal: Receive cover, thumbnail and Alt texts
  Actions:
    1. Call the BaseAssetsForm component
    2. No need for special settings (the fields coverImage, coverAltText, thumbnailImage, thumbnailAltText are automatically Bound with the form)
    3. Ensure the correct performance of auto-derive of the thumbnail alt text from the cover
```

```
commit changes
```

```
step: Place the series default tags card (TagPicker)
  Goal: Determine the default tags (Default Tags) that the member articles of this series inherit from them
  Actions:
    1. Use the extracted Reusable TagPicker component
    2. Pass the dedicated configs:
      fieldName="defaultTags"
      label="Series Default Tags"
      placeholder="Search or add default tags for this series..."
```

```
commit changes
```

```
step: Place the series SEO card (BaseSEOForm)
  Goal: Receive SEO metadata for the series landing page (/series/:seriesSlug)
  Actions:
    1. Call the BaseSEOForm component
    2. Pass the dedicated Prop: entityType="series"
    3. Ensure that the Fallback guide texts under the inputs display Series Title and Series Description instead of Article Title/Summary
```

```
commit changes
```

```
step: Build the main file and chassis of the series section
  Goal: Create the main chassis of the series registration page
  File path: src/features/article-publishing/components/SeriesCreationSection.tsx
  Actions:
    1. Define the SeriesCreationSection component as Client Component ('use client')
    2. Initialize the form using useForm and connect it to seriesFormSchema (with zodResolver)
    3. Wrap the component in FormProvider so that all sub-components have access to the form state
    4. Set the main layout: container with standard maximum width (max-w-4xl mx-auto) proportional to the article layout
```

```
commit changes
```

```
step: Build the top bar of the form (Header & Action Bar)
  Goal: Display the local storage status and dedicated series action buttons
  Actions:
    1. Status Indicator: Display the current form status (Pending / Draft Saved / Failed)
    2. Action Dropdown / Buttons:
      Button Publish (final registration of the series)
      Button Draft (save as draft)
      (Note: Delete/Archive actions remain simple/stub in this stage)
```

```
commit changes
```

```
step: Place the series Identity card (BaseIdentityForm)
  Goal: Get the title, slug and description of the series
  Actions:
    1. Call the BaseIdentityForm component inside the series chassis
    2. Pass the dedicated series configs:
      titleFieldName="title"
      slugFieldName="slug"
      descriptionFieldName="description"
      maxTitleLength={36} (apply strict character count UI limitation on the title Header)
      descriptionPlaceholder="Enter series description..."
```

```
commit changes
```

```
step: Place the series Assets card (BaseAssetsForm)
  Goal: Receive cover, thumbnail and Alt texts
  Actions:
    1. Call the BaseAssetsForm component
    2. No need for special settings (the fields coverImage, coverAltText, thumbnailImage, thumbnailAltText are automatically Bound with the form)
    3. Ensure the correct performance of auto-derive of the thumbnail alt text from the cover
```

```
commit changes
```

```
commit runbook
```

```
step: Place the series default tags card (TagPicker)
  Goal: Determine the default tags (Default Tags) that the member articles of this series inherit from them
  Actions:
    1. Use the extracted Reusable TagPicker component
    2. Pass the dedicated configs:
      fieldName="defaultTags"
      label="Series Default Tags"
      placeholder="Search or add default tags for this series..."
```

```
commit changes
```

```
step: Place the series SEO card (BaseSEOForm)
  Goal: Receive SEO metadata for the series landing page (/series/:seriesSlug)
  Actions:
    1. Call the BaseSEOForm component
    2. Pass the dedicated Prop: entityType="series"
    3. Ensure that the Fallback guide texts under the inputs display Series Title and Series Description instead of Article Title/Summary
```

```
commit changes
```

```
step: Create the schema file in the specified path
  Goal: Create an independent schema file for the series form
  File path: src/features/article-publishing/schemas/seriesFormSchema.ts
```

```
commit changes
```

```
step: Define seriesIdentitySchema (series identity rules)
  Goal: Validate Title, Slug and Description with dedicated Series limitations
  Actions:
    1. Title:
      min(1, 'Series title is required')
      max(36, 'Series title cannot exceed 36 characters') (apply the key condition of the spec)
    2. Slug:
      min(3), max(75), standard Regex pattern ^[a-z0-9]+(?:-[a-z0-9]+)*$ and check absence in RESERVED_SLUGS
    3. Description:
      min(1, 'Series description is required') (or optional depending on form strictness, but at least 1 character is recommended)
```

```
commit changes
```

```
step: Define seriesClassificationSchema (default tags)
  Goal: Validate the array of series default tags
  Actions:
    1. Define the defaultTags field:
      Validate array of strings (length of each tag between 2 to 30 characters)
      Absence of duplicate tags with the condition .refine((items) => new Set(items).size === items.length)
```

```
commit changes
```

```
step: Combine schemas in seriesFormSchema
  Goal: Build a comprehensive z.object that covers all sections of the series form
  Actions:
    1. Combine the following schemas:
      seriesIdentitySchema (including title, slug, description)
      assetsSchema (cover, thumbnail and alts - completely identical to article)
      seriesClassificationSchema (including defaultTags)
      seoSchema (including seoTitle, seoDescription, canonicalUrl)
```

```
commit changes
```

```
step: Extract TypeScript type and initial values (defaultValues)
  Goal: Provide complete Type-safety for React Hook Form
  Actions:
    1. Extract type: export type SeriesFormValues = z.infer<typeof seriesFormSchema>;
    2. Define the defaultSeriesValues object for use in SeriesCreationSection:
      title: ''
      slug: ''
      description: ''
      coverImage: '', coverAltText: '', thumbnailImage: '', thumbnailAltText: ''
      defaultTags: []
      seoTitle: '', seoDescription: '', canonicalUrl: ''
```

```
commit changes
```

```todo:subbranches
step: Checkout the branch feature/pcp-ui-design
```

```todo:subbranches
step: Merge the branch feature/pcp-ui-series-form into feature/pcp-ui-design
```

```todo:subbranches
step: Delete the branch feature/pcp-ui-series-form
```

```todo:subbranches
step: go to ui-design-runbook.md line 21
`````