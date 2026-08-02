import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        env: {
            NODE_ENV: 'test',
            MONGODB_URI: 'mongodb://localhost:27017/test_db',
            JWT_ACCESS_SECRET: 'test_access_secret_at_least_32_chars_long!!',
            JWT_REFRESH_SECRET: 'test_refresh_secret_at_least_32_chars_long!!',
            LOG_LEVEL: 'debug',
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(process.cwd(), './src'),
        },
    },
});