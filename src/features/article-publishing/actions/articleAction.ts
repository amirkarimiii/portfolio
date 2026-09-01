'use server'

import { ArticleCardData } from "@/features/article-publishing/types/reference-card.type";
import { ArticleService } from "@/features/article-publishing/services/articleService";
import type { ArticleItem } from "@/features/article-publishing/types/article-item.type";
import { ArticleFormValues } from "@/features/article-publishing/schemas/articleFormSchema";
import { ApiResponse, ErrorCode } from "@/shared/types/api";
import { logger } from "@/shared/logger/logger";

interface ArchiveDraftArticleInput {
    uniqueId: string;
}

interface EditArticleInput {
    uniqueId: string;
}

interface SaveDraftInput {
    uniqueId: string;
    formData: Partial<ArticleFormValues>;
}

export async function getArticlesAction(): Promise<ArticleCardData[]> {
    try {
        return await ArticleService.getAllArticles();
    } catch (error) {
        logger.error(
            error as Error,
            'Failed to fetch articles',
            { context: 'getArticlesAction' }
        );
        return [];
    }
}

export async function getDraftArticleAction(uniqueId: string): Promise<ArticleItem | null> {
    if (!uniqueId) {
        logger.warn('getDraftArticleAction called with empty uniqueId', {
            context: 'getDraftArticleAction',
        });
        return null;
    }

    try {
        return await ArticleService.getDraftArticleById(uniqueId);
    } catch (error) {
        logger.error(
            error as Error,
            'Failed to fetch draft article',
            { context: 'getDraftArticleAction', uniqueId }
        );
        return null;
    }
}

export async function archiveDraftArticleAction({ uniqueId }: ArchiveDraftArticleInput): Promise<ApiResponse<ArticleItem>> {
    if (!uniqueId) {
        logger.warn('archiveDraftArticleAction called with empty uniqueId', {
            context: 'archiveDraftArticleAction',
        });
        return {
            success: false,
            error: {
                code: ErrorCode.VALIDATION_ERROR,
                message: 'Unique ID is required for archiving.',
            },
        };
    }

    try {
        return await ArticleService.archiveDraft(uniqueId);
    } catch (error) {
        logger.error(
            error as Error,
            'Failed to archive draft article',
            { context: 'archiveDraftArticleAction', uniqueId }
        );
        return {
            success: false,
            error: {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: error instanceof Error ? error.message : 'Something went wrong during archiving',
            },
        };
    }
}

export async function saveDraftAction({ uniqueId, formData }: SaveDraftInput): Promise<ApiResponse<ArticleItem>> {
    try {
        return await ArticleService.saveDraft(uniqueId, formData);
    } catch (error) {
        logger.error(
            error as Error,
            'Failed to save draft',
            { context: 'saveDraftAction', uniqueId }
        );
        return {
            success: false,
            error: {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: error instanceof Error ? error.message : 'Something went wrong while saving draft',
            },
        };
    }
}

export async function editArticleAction({ uniqueId }: EditArticleInput): Promise<ApiResponse<ArticleItem>> {
    if (!uniqueId) {
        logger.warn('editArticleAction called with empty uniqueId', {
            context: 'editArticleAction',
        });
        return {
            success: false,
            error: {
                code: ErrorCode.VALIDATION_ERROR,
                message: 'Unique ID is required to edit article.',
            },
        };
    }

    try {
        return await ArticleService.editArticle(uniqueId);
    } catch (error) {
        logger.error(
            error as Error,
            'Failed to prepare draft for editing',
            { context: 'editArticleAction', uniqueId }
        );
        return {
            success: false,
            error: {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: error instanceof Error ? error.message : 'Failed to prepare draft for editing.',
            },
        };
    }
}