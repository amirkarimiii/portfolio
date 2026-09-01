```todo:subbranches
✅ step: make branch feature/pcp-api-integration
```

```
✅ loop: Check the current infrastructure
```

```
✅ loop: Public Read
```

```
✅ commit changes
```

```
✅ loop: private getter routes
```

```
✅ commit changes
```

```
✅ loop: private setter routes
```

```
✅ commit changes
```

doing some cleanups,

in flow:

```
✅ loop: Transfer the article management logic (Article Mutation/Use Cases) to ArticleService
  The goal of this phase is the complete cleanup of the articleAction.ts file and transferring its heavy responsibilities to the service
  Sub-stage 1.1: Transfer the saveDraft method
    What happens? The logic of checking the existence of slug, checking reserved slug, checking the existence of ID and finally calling the repository is removed from the saveDraftAction action and we create the new ArticleService.saveDraft method
  Sub-stage 1.2: Transfer the archiveDraftArticle method
    What happens? The logic of receiving the draft, validating the form with Zod, checking the slug and reserved slug and calling the repository is transferred to the new ArticleService.archiveDraft method
  Sub-stage 1.3: Transfer the simpler methods (getDraft and editArticle)
    What happens? The getDraftArticleAction and editArticleAction methods instead of calling ArticleRepository directly, call the related methods in ArticleService
  Sub-stage 1.4: Final thinning of articleAction.ts
    What happens? The action file is cleaned so that its functions merely take the input, call the corresponding service and map the errors for the UI
```

```
✅ commit changes
```

```
✅ commit runbook
```

```
✅ loop: Transfer the article publishing logic (Publish Article Use Case)
  This phase is the most complex Use Case of the project because it is involved with several Repositories (both article and series)
  Sub-stage 2.1: Design the ArticleService.publishArticle method
    What happens? All stages of receiving the draft, validating the form, checking the slug, checking the reserved slug, extracting seriesSlug from SeriesRepository and finally storing the article are aggregated in ArticleService
  Sub-stage 2.2: Simplification of publishArticleAction.ts
    What happens? All complex lines of the action are removed and converted to 1 or 2 simple call lines from ArticleService
```

```
✅ commit changes
```

```
✅ commit runbook
```

```
✅ loop: Unification of the series section (Series Management)
  The series actions currently bypass the service layer and talk directly with the Repository
  Sub-stage 3.1: Implementation of SeriesService.publishSeries
    What happens? Zod validation, checking the uniqueness of the slug and checking the reserved slug is transferred from publishSeriesAction to SeriesService
  Sub-stage 3.2: Update of publishSeriesAction.ts
    What happens? The action will merely play the role of receiving the UI input and sending it to SeriesService
```

```
✅ commit changes
```

```
✅ commit runbook
```

```
✅ loop: Final audit of the data flow (Architecture Boundaries Verification)
  Sub-stage 4.1: Check the absence of unauthorized Imports
    What happens? We ensure that none of the Action files in the actions/ folder have imported ArticleRepository or SeriesRepository at all
  Sub-stage 4.2: Examination of the pattern reference (InboundReference)
    What happens? Final confirmation of the InboundReference logic that was implemented from the beginning according to this correct pattern (Action → Service → Repositories)
```

```
✅ commit changes
```

```
✅ commit runbook
```

```
✅ loop: proper integration with notification system and logger
```

```
✅ commit changes
```

```
✅ commit runbook
```

```
✅ loop: last checkup
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
✅ step: Merge the branch feature/pcp-api-integration into feature/pcp-wiring-beneath
```

```todo:subbranches
✅ step: Delete the branch feature/pcp-api-integration
```

```todo:subbranches
✅ step: go to article-creation-and-edit-runbook line 76
```