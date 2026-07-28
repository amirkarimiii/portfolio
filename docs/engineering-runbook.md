for I7 — Session cleanup strategy

```todo
using deepseek and grok
For each of these refactors:
    Q: Are they worth doing? Or is doing them recommended at all?
        yes? → go to next Q ⬅️
        no?
            wrap I7 in <s></s>
            commit changes
            go to I8
    Q: Is doing them recommended, but not in the way the refactor backlog suggested?
        yes? → go to next Q ⬅️
        no?
            change I7 description
            commit changes
            go to next Q
    Q: If they should be done, what is the best practice for doing them?
        change the loop below into clearer steps
```

```todo
✅ step: create TTL index on adminRefreshTokens collection
```

```todo
✅ step: verify TTL index auto-deletes expired documents
```

```todo
✅ tick I7 in refactor-backlog
```

```todo
✅ commit refactor-backlog
```

for I8 — Route protection for admin write routes

```todo
using deepseek and grok
For each of these refactors:
    Q: Are they worth doing? Or is doing them recommended at all?
        yes? → go to next Q ⬅️
        no?
            wrap I8 in <s></s>
            commit changes
    Q: Is doing them recommended, but not in the way the refactor backlog suggested?
        yes? → go to next Q ⬅️
        no?
            change I8 description
            commit changes
            go to next Q
    Q: If they should be done, what is the best practice for doing them?
        change the loop below into clearer steps
```

```todo
✅ step: new not-found page design
```

```todo
✅ commit changes
```

```todo
✅ step: work on src/middleware.ts
```

```todo
✅ commit changes
```

```todo
✅ step: verify protected routes with valid, expired, and missing token
```

```todo
✅ tick I8 in refactor-backlog
```

```todo
✅ commit refactor-backlog
```

---

Here, the work related to the `refactor/pre-v2-infrastructure` branch is finished.

```todo
✅ checkout refactor/pre-v2-backlog
```

```todo
✅ merge branch refactor/pre-v2-infrastructure into refactor/pre-v2-backlog
```

```todo
✅ delete refactor/pre-v2-infrastructure
```

---

Here, the work related to the `refactor/pre-v2-backlog` branch is finished.

```todo
✅ checkout staging
```

```todo
✅ merge branch refactor/pre-v2-backlog into staging
```

```todo
✅ delete refactor/pre-v2-backlog
```

```todo
✅ git observatory update
with claude
```

```todo
✅ commmit git observatory
```

```todo
✅ uploade git observatory to claude
```

---

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
✅ step: create documentation file for teckstack
explicitly add this:
## Environment Variables Setup

All environment variables are validated at runtime using `@t3-oss/env-nextjs` and Zod (`env.ts`).

### MongoDB Connection (`MONGODB_URI`)

> ⚠️ **Important Note on MongoDB Atlas Connection Strings:**
> Avoid using the SRV connection string style (`mongodb+srv://...`) if your network environment or node runtime exhibits DNS lookup issues with Node's native `dns` module.
> 
> **Recommended Format (Standard Seed List):**
> Use the legacy/standard multi-node connection string with explicit port numbers and query parameters:
> `` `text
> mongodb://<user>:<password>@node1.example.net:27017,node2.example.net:27017/portfolio?ssl=true&replicaSet=atlas-xxx&authSource=admin
> `` `
```

```todo
✅ commit changes
```

<s><i><b>🏁 7/25/2026 milestone</b></i></s><br/>
<s><i><b>🏁 7/26/2026 milestone</b></i></s><br/>
<i><b>🏁 7/27/2026 milestone - finished</b></i>

---
<i><b>🏁 7/28/2026 start </b></i>

```todo
step: research for a better documenting approach
```

Here we implement the features one by one according to the spec file.
we can use TEMPLATE.md to make steps for each feature

```todo
loop: make Admin feature implementation steps here
```

<i><b>🏁 7/28/2026 milestone</b></i>

---

---

Here we perform pre-production cleanups

```todo
‼️IMPORTANT: change mongo atlas password
```

```todo
working on file next.config.ts (production-ready configuration)
```

```todo
commit changes
```

```todo
cleanup code from every production-unfriendly lines (logs, ets.)
```

```todo
commit changes
```

```todo
research for the proper license on github
```

```todo
commit changes
```
