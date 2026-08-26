# Debugging Log

**Author:** Amir Karimi  
**Project:** Portfolio (v2)  

---

## imageBlock (attrs) content was lost during transfer from client to Server Action

>**Date:** 2026-08-26
>**Branch path:** feature/public-content-platform → feature/pcp-wiring-beneath → feature/pcp-first-article
>**Tags:** #nextjs #server-action #serialization #tiptap #react-hook-form  
>**Time spent:** ~3.5 hours (non-continuous – individual)

### Symptoms
The published article’s JSON output for an `imageBlock` node contained only `{"type": "imageBlock"}`. The `attrs` key (containing `src`, `alt`, `caption`, `isEditing`) was completely missing — not empty, but absent entirely. Renaming the extension from `imageBlock` to `hi` had no effect on the behavior.

### Rejected Hypotheses
1. **Duplicate/override extension definition** → Rejected by checking `editor.extensionManager.extensions.filter(e => e.name === 'imageBlock')`, which returned only a single result.
2. **`addAttributes()` in ImageBlockExtension not working** → Rejected by checking `editor.schema.nodes.imageBlock.spec.attrs`, which correctly showed all 4 attributes with their default values.
3. **TiptapDocumentSchema (zod) stripping attrs** → Rejected because it uses `z.record(z.string(), z.unknown())`, which removes no keys.
4. **articleFormSchema causing the strip** → Rejected, since the same unchanged TiptapDocumentSchema is used inside it.
5. **Issue when writing to the filesystem (articleRepository.ts)** → Rejected, because it only performs a simple `JSON.stringify`, and server-side logs showed the data was already incomplete upon entering `publishArticleAction`.

### Root Cause
The value that react-hook-form (with `zodResolver`) passes to the `onPublish` function is not necessarily a plain object. When this value is passed directly to a Server Action (`'use server'`), the argument serialization mechanism between client and server (React Flight) silently drops certain keys (here: `attrs`) without throwing an error.

### Discovery Method
By placing `console.log` statements at two consecutive points in the pipeline (immediately before calling the server action on the client, and immediately at the start of the same function on the server) and comparing the results — a binary-search pattern along the data path. Since all layers before these two points (schema, extension, editor `onUpdate`) had already been confirmed healthy via logging, the only remaining gap was the client→server boundary.

### Solution
Pass a clean plain object instead of the raw RHF object, using a manual round-trip:

```ts
const payload = JSON.parse(JSON.stringify(data));
await publishArticleAction(payload);
```

### Files Involved
- `src/features/article-publishing/components/dropdowns/AddArticleDropdown.tsx`
- `src/features/article-publishing/actions/publishArticleAction.ts`

### Lesson Learned
Any argument that comes directly from react-hook-form (or any other state library that may return a non-plain object) must be converted to a plain object with `JSON.parse(JSON.stringify(...))` before being passed to a Server Action. This is a general rule for all Server Action calls that receive form input, not just this specific case.
