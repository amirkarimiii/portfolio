'use server';

import { ArticleService, PublishedArticleData } from "@/features/article-publishing/services/articleService";
import { ApiResponse, ErrorCode } from "@/shared/types/api";

interface PublishArticleInput {
    uniqueId: string;
}

export async function publishArticleAction({ uniqueId }: PublishArticleInput): Promise<ApiResponse<PublishedArticleData>> {
    try {
        return await ArticleService.publishArticle(uniqueId);
    } catch (error) {
        console.error('Failed to publish article:', error);
        return {
            success: false,
            error: {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: error instanceof Error ? error.message : 'Something went wrong',
            },
        };
    }
}