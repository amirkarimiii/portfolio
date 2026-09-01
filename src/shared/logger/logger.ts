import { shouldLog, isLogLevel } from './levels';
import {
    LogArgs,
    Logger,
    LogLevel,
    LogMetadata,
    LogMethod,
    LogPayload,
} from './types';

const DEFAULT_LOG_LEVEL: LogLevel = 'debug';

const SENSITIVE_KEYS = [
    'password',
    'secret',
    'token',
    'authorization',
    'cookie',
    'jwt',
    'credential',
    'db_url',
];

class ApplicationLogger implements Logger {
    private readonly minLevel: LogLevel;

    constructor() {
        const configuredLevel = process.env.NEXT_PUBLIC_LOG_LEVEL;

        this.minLevel = isLogLevel(configuredLevel)
            ? configuredLevel
            : DEFAULT_LOG_LEVEL;
    }

    private sanitizeMetadata(
        metadata?: LogMetadata
    ): LogMetadata | undefined {
        if (!metadata) return undefined;

        try {
            const sanitized: LogMetadata = {};

            for (const [key, value] of Object.entries(metadata)) {
                if (
                    SENSITIVE_KEYS.some((sensitive) =>
                        key.toLowerCase().includes(sensitive)
                    )
                ) {
                    sanitized[key] = '[REDACTED]';
                } else if (
                    typeof value === 'object' &&
                    value !== null &&
                    !Array.isArray(value)
                ) {
                    sanitized[key] = this.sanitizeMetadata(
                        value as LogMetadata
                    );
                } else {
                    sanitized[key] = value;
                }
            }

            return sanitized;
        } catch {
            return {
                _sanitizationError:
                    'Failed to sanitize metadata safely',
            };
        }
    }

    private emit(level: LogLevel, args: LogArgs): void {
        try {
            if (!shouldLog(level, this.minLevel)) return;

            let message: string;
            let errorObj: Error | undefined;
            let rawMetadata: LogMetadata | undefined;

            if (args[0] instanceof Error) {
                errorObj = args[0];
                message = (args[1] as string) || errorObj.message;
                rawMetadata = args[2] as LogMetadata;
            } else {
                message = args[0] as string;
                rawMetadata = args[1] as LogMetadata;
            }

            const payload: LogPayload = {
                timestamp: new Date().toISOString(),
                level,
                message,
                metadata: this.sanitizeMetadata(rawMetadata),
            };

            if (errorObj) {
                payload.error = {
                    name: errorObj.name,
                    message: errorObj.message,
                    stack: errorObj.stack,
                };
            }

            const formattedOutput = JSON.stringify(payload);

            if (level === 'error' || level === 'fatal') {
                console.error(formattedOutput);
            } else if (level === 'warn') {
                console.warn(formattedOutput);
            } else {
                console.log(formattedOutput);
            }
        } catch (err) {
            try {
                console.error('Logger internal error failure:', err);
            } catch {
                // Ignore logger failures.
            }
        }
    }

    trace: LogMethod = (...args: LogArgs) =>
        this.emit('trace', args);

    debug: LogMethod = (...args: LogArgs) =>
        this.emit('debug', args);

    info: LogMethod = (...args: LogArgs) =>
        this.emit('info', args);

    warn: LogMethod = (...args: LogArgs) =>
        this.emit('warn', args);

    error: LogMethod = (...args: LogArgs) =>
        this.emit('error', args);

    fatal: LogMethod = (...args: LogArgs) =>
        this.emit('fatal', args);
}

export const logger: Logger = new ApplicationLogger();

