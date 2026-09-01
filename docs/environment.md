# Environment Variables

Portfolio V2 centralizes all environment variable management through `env.ts` using `@t3-oss/env-nextjs` and Zod.

All server-side environment variables must be declared in `env.ts`, validated with appropriate Zod schemas, and accessed exclusively through the exported `env` object. Direct access to `process.env` elsewhere in the codebase is not permitted **unless explicitly documented as a client-compatible `NEXT_PUBLIC_*` variable used by shared client/server code**.

## Adding a New Environment Variable

Whenever a new environment variable is introduced:

1. Add it to the appropriate schema in `env.ts`.
2. Define its runtime mapping inside `runtimeEnv`.
3. Update `.env.example` with a representative placeholder or default value.
4. Use `env.<VARIABLE_NAME>` throughout the application for server-side variables.

This ensures runtime validation, type safety, and a single source of truth for configuration.

### Client-Accessible Environment Variables

Environment variables that need to be available in client-side code must use the `NEXT_PUBLIC_` prefix.

These variables are embedded into the client bundle and **must never contain secrets, credentials, tokens, or other sensitive values**.

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

`NEXT_PUBLIC_LOG_LEVEL` controls the minimum severity level of logs emitted by the application logger layer.

Supported values (ordered by priority):

* `trace`
* `debug`
* `info`
* `warn`
* `error`
* `fatal`

The logger currently uses **one shared configuration for both server and client logs**.

Therefore, the logging level is intentionally exposed through the `NEXT_PUBLIC_` prefix so that the same configuration is available in both environments.

### Current Behavior

`NEXT_PUBLIC_LOG_LEVEL` is the single source of truth for the logger's minimum log level.

The logger **does not use `NODE_ENV` to determine the log level**.

If `NEXT_PUBLIC_LOG_LEVEL` is omitted or contains an invalid value, the logger defaults to:

```text
debug
```

### Future Logging Architecture

This shared configuration is temporary.

In a future version, server-side and client-side logging will be separated, allowing each environment to have its own logging configuration and potentially different environment-variable requirements.

Until that separation is implemented, **do not introduce a separate server-only `LOG_LEVEL` variable**. Use `NEXT_PUBLIC_LOG_LEVEL` for the shared logger.

> `NEXT_PUBLIC_LOG_LEVEL` is intentionally client-accessible and therefore must only contain a non-sensitive log-level value.

---

## Vercel OIDC Token

`VERCEL_OIDC_TOKEN` is a system environment variable automatically provided by Vercel when **OIDC Federation** is enabled for the project.

### Purpose

* Enables secure, short-lived authentication with cloud providers (AWS, Azure, etc.) without storing long-lived credentials.
* Used by official Vercel packages such as `@vercel/oidc`, Vercel Blob, AI Gateway, and others.

### Availability

| Environment                | How it is provided                                       |
|----------------------------|----------------------------------------------------------|
| Build time                 | Injected as the `VERCEL_OIDC_TOKEN` environment variable |
| Runtime (Vercel Functions) | Available via the `x-vercel-oidc-token` request header   |
| Local development          | Downloaded with `vercel env pull` into `.env.local`      |

### Important notes

* The token is short-lived (typically 1–2 hours in production, ~12 hours in development).
* It is **not** present in pure local environments or non-Vercel runtimes unless you run `vercel env pull`.
* Therefore, it is declared as **optional** in `env.ts`.
* Never commit a real token value. Keep the placeholder empty in `.env.example`.

To obtain the token locally:

```bash
vercel link
vercel env pull
```

---

## Vercel Blob

The following variables are used when integrating with **Vercel Blob**:

| Variable                  | Description                                                               | Required |
|---------------------------|---------------------------------------------------------------------------|----------|
| `BLOB_STORE_ID`           | Unique identifier of the Vercel Blob store                                | Optional |
| `BLOB_WEBHOOK_PUBLIC_KEY` | Public key used to verify the signature of incoming Blob webhook requests | Optional |

### Notes

* Both variables are typically injected by Vercel when Blob is configured for the project.
* They are declared as **optional** in `env.ts` so the application can still run in environments where Blob is not used.
* Never commit real values. Keep the placeholders empty in `.env.example`.
* In local development you can obtain them with:

```bash
vercel link
vercel env pull
```

### Related Documentation

* [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
* [Blob Webhooks](https://vercel.com/docs/storage/vercel-blob/using-blob-sdk#webhooks)

## Related Files

* [Vercel OIDC Documentation](https://vercel.com/docs/oidc)
* `@vercel/oidc` package
* `env.ts`
* `.env.example`
* `src/shared/logger/`
