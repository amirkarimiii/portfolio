import { NextResponse, NextRequest } from 'next/server';
import { AppError, ErrorCode, ApiResponse, ErrorCodeType } from '@/shared/types/api';

export type RouteContext = {
    params?: Promise<Record<string, string | string[]>>;
};

type RouteHandler<T> = (
    req: NextRequest,
    context?: RouteContext
) => Promise<NextResponse<ApiResponse<T>> | ApiResponse<T> | T | void>;


export function createSuccessResponse<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
        },
        { status }
    );
}

export function createErrorResponse(
    message: string,
    statusCode = 400,
    code: ErrorCodeType = ErrorCode.VALIDATION_ERROR,
    details?: unknown
): NextResponse<ApiResponse<never>> {
    return NextResponse.json(
        {
            success: false,
            error: {
                code,
                message,
                details,
            },
        },
        { status: statusCode }
    );
}

export function withErrorHandler<T>(handler: RouteHandler<T>) {
    return async (req: NextRequest, context?: RouteContext): Promise<NextResponse<ApiResponse<T>>> => {
        try {
            const result = await handler(req, context);

            if (result instanceof NextResponse) {
                return result as NextResponse<ApiResponse<T>>;
            }

            return createSuccessResponse(result as T);
        } catch (error: unknown) {
            if (error instanceof AppError) {
                return createErrorResponse(error.message, error.statusCode, error.code, error.details);
            }
            console.error('[API_ERROR_UNHANDLED]:', error);

            return createErrorResponse(
                'Internal Server Error',
                500,
                ErrorCode.INTERNAL_SERVER_ERROR
            );
        }
    };
}