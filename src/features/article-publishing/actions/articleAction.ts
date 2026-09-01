'use server'

import {ArticleCardData} from "@/features/article-publishing/types/reference-card.type";
import {ArticleService} from "@/features/article-publishing/services/articleService";
import type {ArticleItem} from "@/features/article-publishing/types/article-item.type";
import {ArticleRepository} from "@/features/article-publishing/repository/articleRepository";
import {ArticleFormValues} from "@/features/article-publishing/schemas/articleFormSchema";
import {ApiResponse, ErrorCode} from "@/shared/types/api";

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
        console.error('Failed to fetch articles:', error);
        return [];
    }
}

export async function getDraftArticleAction(uniqueId: string): Promise<ArticleItem | null> {
    return await ArticleRepository.getDraftArticle(uniqueId);
}

export async function archiveDraftArticleAction({ uniqueId }: ArchiveDraftArticleInput): Promise<ApiResponse<ArticleItem>> {
    try {
        return await ArticleService.archiveDraft(uniqueId);
    } catch (error) {
        console.error('Failed to archive draft article:', error);
        return {
            success: false,
            error: {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: error instanceof Error ? error.message : 'Something went wrong during archiving',
            },
        };
    }
}

export async function editArticleAction({ uniqueId }: EditArticleInput) {
    try {
        if (!uniqueId) {
            return {
                success: false,
                error: 'Article ID is required to start editing.',
            };
        }

        const draftArticle = await ArticleRepository.createEditDraft(uniqueId);
        return { success: true, data: draftArticle };
    } catch (error) {
        console.error('Failed to prepare draft for editing:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to prepare draft for editing.',
        };
    }
}

export async function saveDraftAction({ uniqueId, formData }: SaveDraftInput): Promise<ApiResponse<ArticleItem>> {
    try {
        return await ArticleService.saveDraft(uniqueId, formData);
    } catch (error) {
        console.error('Failed to save draft:', error);
        return {
            success: false,
            error: {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: error instanceof Error ? error.message : 'Something went wrong while saving draft',
            },
        };
    }
}