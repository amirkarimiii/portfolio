'use server';

import { ArticleRepository } from "@/features/article-publishing/repository/articleRepository";
import { isReservedSlug } from "@/features/article-publishing/utils/slugValidation";
import { articleFormSchema, type ArticleFormValues } from '../schemas/articleFormSchema';
import { SeriesRepository } from "@/features/article-publishing/repository/seriesRepository";

interface PublishArticleInput {
    uniqueId: string;
}

export async function publishArticleAction({ uniqueId }: PublishArticleInput) {
    try {
        if (!uniqueId) {
            return {
                success: false,
                error: 'Article ID is required for publishing',
            };
        }

        const draftArticle = await ArticleRepository.getDraftArticleById(uniqueId);
        if (!draftArticle) {
            return {
                success: false,
                error: 'Draft article not found or already published.',
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
            lifecycle: draftArticle.lifecycle,
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
                error: 'This slug already exists.',
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

        let seriesSlug: string | null = null;
        if (validFormData.seriesId) {
            const series = await SeriesRepository.getSeriesById(validFormData.seriesId);
            seriesSlug = series?.slug || null;
        }

        const publishedArticle = await ArticleRepository.savePublishedArticle(uniqueId, validFormData);

        return {
            success: true,
            data: {
                ...publishedArticle,
                seriesSlug,
            }
        };
    } catch (error) {
        console.error('Failed to publish article:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Something went wrong',
        };
    }
}