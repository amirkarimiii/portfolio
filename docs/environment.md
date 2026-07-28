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

## Related Files

* `env.ts`
* `.env.example`
