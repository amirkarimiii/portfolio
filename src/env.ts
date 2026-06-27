import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        MONGODB_URI: z.url("MONGODB_URI is not a valid url"),
    },
    client: {},
    runtimeEnv: {
        MONGODB_URI: process.env.MONGODB_URI,
    },
    onValidationError: (error) => {
        console.error("invalid environment variables");
        console.error(error[0].message);
        throw new Error("Invalid environment variables");
    },
});