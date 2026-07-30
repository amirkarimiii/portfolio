import { LogLevel } from './types';

export const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
};

export const LOG_LEVELS: LogLevel[] = [
    'trace',
    'debug',
    'info',
    'warn',
    'error',
    'fatal',
];

export function shouldLog(targetLevel: LogLevel, currentLevel: LogLevel): boolean {
    return LOG_LEVEL_PRIORITY[targetLevel] >= LOG_LEVEL_PRIORITY[currentLevel];
}