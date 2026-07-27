import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
        NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
        JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),
        JWT_REFRESH_SECRET: z.string().min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
        JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
        JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
        MAX_LOGIN_ATTEMPTS: z.coerce.number().default(5),
        LOGIN_RATE_LIMIT_WINDOW_MS: z.coerce.number().default(15 * 60 * 1000),
    },
    client: {},
    runtimeEnv: {
        MONGODB_URI: process.env.MONGODB_URI,
        NODE_ENV: process.env.NODE_ENV,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
        JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
        MAX_LOGIN_ATTEMPTS: process.env.MAX_LOGIN_ATTEMPTS,
        LOGIN_RATE_LIMIT_WINDOW_MS: process.env.LOGIN_RATE_LIMIT_WINDOW_MS,
    },
    onValidationError: (error) => {
        console.error("Invalid environment variables:", error);
        throw new Error("Invalid environment variables");
    },
});