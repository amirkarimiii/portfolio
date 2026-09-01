'use server';

import { ArticleService, PublishedArticleData } from "@/features/article-publishing/services/articleService";
import { ApiResponse, ErrorCode } from "@/shared/types/api";
import { logger } from "@/shared/logger/logger";

interface PublishArticleInput {
    uniqueId: string;
}

export async function publishArticleAction({ uniqueId }: PublishArticleInput): Promise<ApiResponse<PublishedArticleData>> {
    if (!uniqueId) {
        logger.warn('publishArticleAction called with empty uniqueId', {
            context: 'publishArticleAction',
        });
        return {
            success: false,
            error: {
                code: ErrorCode.VALIDATION_ERROR,
                message: 'Unique ID is required to publish the article.',
            },
        };
    }

    try {
        return await ArticleService.publishArticle(uniqueId);
    } catch (error) {
        logger.error(
            error as Error,
            'Failed to publish article',
            { context: 'publishArticleAction', uniqueId }
        );
        return {
            success: false,
            error: {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: error instanceof Error ? error.message : 'Something went wrong',
            },
        };
    }
}