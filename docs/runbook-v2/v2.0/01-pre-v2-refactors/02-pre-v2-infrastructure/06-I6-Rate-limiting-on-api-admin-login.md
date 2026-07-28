for I6 — Rate limiting on `/api/admin/login`

```todo
using deepseek and grok
For each of these refactors:
    Q: Are they worth doing? Or is doing them recommended at all?
        yes? → go to next Q ⬅️
        no?
            wrap I6 in <s></s>
            commit changes
            go to I7
    Q: Is doing them recommended, but not in the way the refactor backlog suggested?
        yes? → go to next Q ⬅️
        no?
            change I6 description
            commit changes
            go to next Q
    Q: If they should be done, what is the best practice for doing them?
        change the loop below into clearer steps
```

```todo
✅ step: work on env.ts
```

```todo
✅ commit changes
```

```todo
✅ step: work on shared/lib/api/rateLimiter.ts
```

```todo
✅ commit changes
```

```todo
✅ step: work on app/api/admin/login/route.ts
```

```todo
✅ commit changes
```

```todo
✅ step: verify consecutive requests get blocked with 429 after reaching the limit
```

```todo
✅ tick I6 in refactor-backlog
```

```todo
✅ commit refactor-backlog
```