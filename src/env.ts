import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        MONGODB_URI: z.string("MONGODB_URI is not a valid string"),
        NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    },
    client: {},
    runtimeEnv: {
        MONGODB_URI: process.env.MONGODB_URI,
        NODE_ENV: process.env.NODE_ENV
    },
    onValidationError: (error) => {
        console.error("invalid environment variables");
        console.error(error[0].message);
        throw new Error("Invalid environment variables");
    },
});