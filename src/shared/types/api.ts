export const ErrorCode = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    SERVER_CONFIG_MISSING: 'SERVER_CONFIG_MISSING',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    SESSION_EXPIRED: 'SESSION_EXPIRED',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS'
} as const;

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];

export interface ApiSuccessResponse<T> {
    success: true;
    data: T;
}

export interface ApiErrorDetail {
    code: ErrorCodeType;
    message: string;
    field?: string;
    details?: unknown;
}

export interface ApiErrorResponse {
    success: false;
    error: ApiErrorDetail;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: ErrorCodeType;
    public readonly details?: unknown;

    constructor(
        message: string,
        statusCode: number = 400,
        code: ErrorCodeType = ErrorCode.VALIDATION_ERROR,
        details?: unknown
    ) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    }
}