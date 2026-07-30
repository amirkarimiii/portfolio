> Here we do the side-job work that doesn’t belong to any specific branch and gets committed directly onto `staging`.

Here we need to investigate what the issue with staging and Vercel is; after we've looked into it and applied a potential fix, we'll push to staging.

```todo
✅ research in deepseek and grok
```

```todo
✅ push staging
```

---

Here we do some Side jobs

```todo
✅ step: research – decide whether to add search feature in this version or next
with chatgpt
```

```todo
✅ step: update ADR-0005 (add date + content updates)
```

```todo
✅ commit changes
```

```todo
✅ step: fix headers of ADR-0006 to ADR-0010 to match the style of the early ADRs
```

```todo
✅ commit changes
```

```todo
✅ step: create documentation file explaining how AI is used in the project
```

```todo
✅ commit changes
```

```todo
✅ step: create documentation file for teck-stack
```

```todo
✅ commit changes
```

---

```todo
✅ step: research for a better documenting approach
```

---

```todo
step: Research on whether it is good to merge and delete a branch and later recreate that branch from scratch

if ok: ⬅️
✅  upload git observatory to claude
✅   report problem and ask for proper changes
✅   merge feature/private-publishing to staging
✅   delete feature/private-publishing
if not ok:
  upload git observatory to claude
  report problem and ask for proper changes and new branch name in observatory
  merge feature/private-publishing to staging
  delete feature/private-publishing
  change observatory based in reviewed suggestions
  commit observatory
```

```todo
For commit messages related to runbook, research define a new mark or keep the same doc mark?
if ok:
  add new mark to conventions
  add to conventions changelog
  commit changes
  upload conventions to claude
if not ok:
  continue

result: not ok but changed the way we were scoping
✅ commit changes 
✅ upload conventions to claude
```

```todo
✅ step: add a new instruction to grok in firefox in order to fix unnecessary "commit changes" messages
```