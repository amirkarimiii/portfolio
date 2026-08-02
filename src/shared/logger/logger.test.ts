import { describe, it, expect, beforeEach, vi } from 'vitest';
import { logger } from './logger';
import { LOG_LEVELS } from './levels';

describe('Logger Capability - Contract & Level Mapping', () => {

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('should implement the complete Logger public API contract', () => {
        expect(logger).toBeDefined();

        LOG_LEVELS.forEach((level) => {
            expect(logger[level]).toBeDefined();
            expect(typeof logger[level]).toBe('function');
        });
    });

    it('should correctly map log level priorities', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        logger.info('Info level log test');
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        const output = JSON.parse(consoleSpy.mock.calls[0][0]);
        expect(output.level).toBe('info');
        expect(output.message).toBe('Info level log test');
    });

    it('should generate a valid structured payload with ISO timestamp', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        const logMessage = 'System initialization started';

        logger.info(logMessage);

        expect(consoleSpy).toHaveBeenCalledTimes(1);

        const rawOutput = consoleSpy.mock.calls[0][0];
        const parsedPayload = JSON.parse(rawOutput);

        expect(parsedPayload).toHaveProperty('timestamp');
        expect(parsedPayload).toHaveProperty('level', 'info');
        expect(parsedPayload).toHaveProperty('message', logMessage);

        const timestampDate = new Date(parsedPayload.timestamp);
        expect(timestampDate.getTime()).not.toBeNaN();
        expect(parsedPayload.timestamp).toBe(timestampDate.toISOString());
    });

    it('should attach metadata and sanitize sensitive keys', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        const inputMetadata = {
            userId: 'user_123',
            role: 'admin',
            password: 'super_secret_password',
            authToken: 'bearer_token_xyz',
            nested: {
                secretKey: 'top_secret',
                allowedField: 'safe_value',
            },
        };

        logger.info('User authentication event', inputMetadata);

        expect(consoleSpy).toHaveBeenCalledTimes(1);

        const rawOutput = consoleSpy.mock.calls[0][0];
        const parsedPayload = JSON.parse(rawOutput);

        expect(parsedPayload).toHaveProperty('metadata');

        expect(parsedPayload.metadata.userId).toBe('user_123');
        expect(parsedPayload.metadata.role).toBe('admin');
        expect(parsedPayload.metadata.nested.allowedField).toBe('safe_value');

        expect(parsedPayload.metadata.password).toBe('[REDACTED]');
        expect(parsedPayload.metadata.authToken).toBe('[REDACTED]');
        expect(parsedPayload.metadata.nested.secretKey).toBe('[REDACTED]');
    });

});