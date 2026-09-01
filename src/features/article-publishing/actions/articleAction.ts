'use server'

import {ArticleCardData} from "@/features/article-publishing/types/reference-card.type";
import {ArticleService} from "@/features/article-publishing/services/articleService";
import type {ArticleItem} from "@/features/article-publishing/types/article-item.type";
import {ArticleRepository} from "@/features/article-publishing/repository/articleRepository";
import {articleFormSchema, ArticleFormValues} from "@/features/article-publishing/schemas/articleFormSchema";
import {isReservedSlug} from "@/features/article-publishing/utils/slugValidation";

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

export async function archiveDraftArticleAction({ uniqueId }: ArchiveDraftArticleInput) {
    try {
        if (!uniqueId) {
            return {
                success: false,
                error: 'Article ID is required for archiving',
            };
        }

        const draftArticle = await ArticleRepository.getDraftArticleById(uniqueId);
        if (!draftArticle) {
            return {
                success: false,
                error: 'Draft article not found or already processed.',
            };
        }

        const formDataToValidate: ArticleFormValues = {
            title: draftArticle.title,
            slug: draftArticle.slug,
            summary: draftArticle.summary || '',
            content: draftArticle.content as ArticleFormValues['content'],
            coverImage: draftArticle.coverImage,
            coverAltText: draftArticle.coverAltText,
            thumbnailImage: draftArticle.thumbnailImage,
            thumbnailAltText: draftArticle.thumbnailAltText,
            seoTitle: draftArticle.seoTitle,
            seoDescription: draftArticle.seoDescription || '',
            canonicalUrl: draftArticle.canonicalUrl || '',
            seriesId: draftArticle.seriesId,
            tags: draftArticle.tags,
            relatedArticleIds: draftArticle.relatedArticleIds,
            lifecycle: draftArticle.lifecycle
        };

        const validationResult = articleFormSchema.safeParse(formDataToValidate);
        if (!validationResult.success) {
            const firstIssue = validationResult.error.issues[0];
            return {
                success: false,
                error: firstIssue.message,
                field: firstIssue.path.join('.'),
            };
        }

        const validFormData = validationResult.data;

        const slugExists = await ArticleRepository.isSlugExists(validFormData.slug, uniqueId);
        if (slugExists) {
            return {
                success: false,
                error: 'This slug already exists',
                field: 'slug',
            };
        }

        if (validFormData.slug && isReservedSlug(validFormData.slug)) {
            return {
                success: false,
                field: 'slug',
                error: 'This slug is reserved and cannot be used.',
            };
        }

        const archivedArticle = await ArticleRepository.archiveDraftArticle(uniqueId, validFormData);
        return { success: true, data: archivedArticle };
    } catch (error) {
        console.error('Failed to archive draft article:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Something went wrong during archiving',
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

export async function saveDraftAction({ uniqueId, formData }: SaveDraftInput) {
    try {
        if (!uniqueId) {
            return {
                success: false,
                error: 'Article ID is required for saving draft',
            };
        }

        if (formData.slug && formData.slug.trim() !== '') {
            const slugExists = await ArticleRepository.isSlugExists(formData.slug, uniqueId);
            if (slugExists) {
                return {
                    success: false,
                    error: 'This slug already exists',
                    field: 'slug',
                };
            }

            if (isReservedSlug(formData.slug)) {
                return {
                    success: false,
                    field: 'slug',
                    error: 'This slug is reserved and cannot be used.',
                };
            }
        }

        const draftArticle = await ArticleRepository.saveDraftArticle(uniqueId, formData);
        return { success: true, data: draftArticle };
    } catch (error) {
        console.error('Failed to save draft:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Something went wrong while saving draft',
        };
    }
}