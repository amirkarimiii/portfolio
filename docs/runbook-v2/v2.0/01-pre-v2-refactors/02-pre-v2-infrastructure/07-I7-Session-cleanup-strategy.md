for I7 — Session cleanup strategy

```todo
using deepseek and grok
For each of these refactors:
    Q: Are they worth doing? Or is doing them recommended at all?
        yes? → go to next Q ⬅️
        no?
            wrap I7 in <s></s>
            commit changes
            go to 08-I8-Route-protection-for-admin-write-routes.md
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

```todo
✅ go to 08-I8-Route-protection-for-admin-write-routes.md
```