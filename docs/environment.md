# Environment Variables

Portfolio V2 centralizes all environment variable management through `env.ts` using `@t3-oss/env-nextjs` and Zod.

All server-side environment variables must be declared in `env.ts`, validated with appropriate Zod schemas, and accessed exclusively through the exported `env` object. Direct access to `process.env` elsewhere in the codebase is not permitted.

## Adding a New Environment Variable

Whenever a new environment variable is introduced:

1. Add it to the `server` schema in `env.ts`.
2. Define its runtime mapping inside `runtimeEnv`.
3. Update `.env.example` with a representative placeholder or default value.
4. Use `env.<VARIABLE_NAME>` throughout the application.

This ensures runtime validation, type safety, and a single source of truth for configuration.

---

## MongoDB Connection String

The preferred MongoDB Atlas connection format is the standard seed-list connection string:

```text
mongodb://<user>:<password>@host1:27017,host2:27017,host3:27017/database?ssl=true&replicaSet=<replica-set>&authSource=admin
```

Although `mongodb+srv://` is officially supported by MongoDB Atlas, some environments may experience DNS resolution issues due to Node.js runtime or network configuration.

If such issues occur, use the standard seed-list connection string instead.

This is a runtime compatibility recommendation rather than a project requirement.

---

## JWT Secrets

`JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` must each be at least **32 characters** long.

A secure secret can be generated using:

```bash
openssl rand -base64 32
```

---

## Logging Configuration

`LOG_LEVEL` controls the minimum severity level of logs emitted by the application logger layer.

Supported values (ordered by priority):
* `trace`
* `debug`
* `info`
* `warn`
* `error`
* `fatal`

If omitted, it defaults to `debug` in development and `info` in production.

---

## Vercel OIDC Token

`VERCEL_OIDC_TOKEN` is a system environment variable automatically provided by Vercel when **OIDC Federation** is enabled for the project.

### Purpose
- Enables secure, short-lived authentication with cloud providers (AWS, Azure, etc.) without storing long-lived credentials.
- Used by official Vercel packages such as `@vercel/oidc`, Vercel Blob, AI Gateway, and others.

### Availability

| Environment                | How it is provided                                       |
|----------------------------|----------------------------------------------------------|
| Build time                 | Injected as the `VERCEL_OIDC_TOKEN` environment variable |
| Runtime (Vercel Functions) | Available via the `x-vercel-oidc-token` request header   |
| Local development          | Downloaded with `vercel env pull` into `.env.local`      |

### Important notes
- The token is short-lived (typically 1–2 hours in production, ~12 hours in development).
- It is **not** present in pure local environments or non-Vercel runtimes unless you run `vercel env pull`.
- Therefore, it is declared as **optional** in `env.ts`.
- Never commit a real token value. Keep the placeholder empty in `.env.example`.

To obtain the token locally:

```bash
vercel link
vercel env pull
```

## Related Files

- [Vercel OIDC Documentation](https://vercel.com/docs/oidc)
- `@vercel/oidc` package
* `env.ts`
* `.env.example`
* `src/shared/logger/`