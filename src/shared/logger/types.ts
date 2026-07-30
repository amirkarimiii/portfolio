export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export type LogMetadata = Record<string, unknown>;

export interface LogMethod {
    (message: string, metadata?: LogMetadata): void;
    (error: Error, message?: string, metadata?: LogMetadata): void;
}

export type LogArgs =
    | [message: string, metadata?: LogMetadata]
    | [error: Error, message?: string, metadata?: LogMetadata];

export interface Logger {
    trace: LogMethod;
    debug: LogMethod;
    info: LogMethod;
    warn: LogMethod;
    error: LogMethod;
    fatal: LogMethod;
}

export interface LogPayload {
    timestamp: string;
    level: LogLevel;
    message: string;
    metadata?: LogMetadata;
    error?: {
        name: string;
        message: string;
        stack?: string;
    };
}