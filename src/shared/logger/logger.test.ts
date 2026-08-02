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

});