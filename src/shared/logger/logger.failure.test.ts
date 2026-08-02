import { describe, it, expect, beforeEach, vi } from 'vitest';
import { logger } from './logger';

describe('Logger Capability - Failure Mode & Resilience Testing', () => {

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('should safely handle circular references in metadata without throwing an error', () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        const circularObj: Record<string, unknown> = { name: 'circular_test' };
        circularObj.self = circularObj;

        expect(() => {
            logger.info('Testing circular reference', circularObj);
        }).not.toThrow();

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy.mock.calls[0][0]).toContain('Logger internal error failure');
    });

    it('should handle null or undefined metadata values gracefully', () => {
        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        expect(() => {
            logger.info('Null metadata log', null as unknown as Record<string, unknown>);
            logger.warn('Undefined metadata log', undefined);
        }).not.toThrow();

        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    });

    it('should safely extract error details when an Error instance is passed', () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const sampleError = new Error('Database connection failed');

        logger.error(sampleError, 'Operation failed during DB write');

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        const parsedPayload = JSON.parse(consoleErrorSpy.mock.calls[0][0]);

        expect(parsedPayload.level).toBe('error');
        expect(parsedPayload.message).toBe('Operation failed during DB write');
        expect(parsedPayload.error).toHaveProperty('name', 'Error');
        expect(parsedPayload.error).toHaveProperty('message', 'Database connection failed');
        expect(parsedPayload.error).toHaveProperty('stack');
    });

});