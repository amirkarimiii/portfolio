import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
        NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
        JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),
        JWT_REFRESH_SECRET: z.string().min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
    },
    client: {},
    runtimeEnv: {
        MONGODB_URI: process.env.MONGODB_URI,
        NODE_ENV: process.env.NODE_ENV,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    },
    onValidationError: (error) => {
        console.error("Invalid environment variables:", error);
        throw new Error("Invalid environment variables");
    },
});