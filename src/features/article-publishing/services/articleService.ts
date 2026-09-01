import { ArticleRepository } from '../repository/articleRepository';
import type { ArticleItem } from '../types/article-item.type';
import {PaginatedArticlesResult} from "@/features/article-publishing/types/pagination.type";
import {SeriesRepository} from "@/features/article-publishing/repository/seriesRepository";
import {SeriesArticleData} from "@/features/article-publishing/types/series-article.type";
import {ArticleCardData} from "@/features/article-publishing/types/reference-card.type";
import {articleFormSchema, ArticleFormValues} from "@/features/article-publishing/schemas/articleFormSchema";
import {ApiResponse, ErrorCode} from "@/shared/types/api";
import {isReservedSlug} from "@/features/article-publishing/utils/slugValidation";

export type PublishedArticleData = ArticleItem & {
    seriesSlug: string | null;
};

export class ArticleService {

    public static async getPublishedStandaloneArticle(slug: string): Promise<ArticleItem | null> {
        if (!slug || typeof slug !== 'string') {
            return null;
        }

        const normalizedSlug = slug.trim().toLowerCase();

        if (!normalizedSlug) {
            return null;
        }

        return ArticleRepository.getPublishedStandaloneArticleBySlug(normalizedSlug);
    }

    public static async getSeriesArticleDetails(
        seriesSlug: string,
        articleSlug: string
    ): Promise<SeriesArticleData | null> {
        const series = await SeriesRepository.getSeriesBySlug(seriesSlug);
        if (!series) {
            return null;
        }

        const article = await ArticleRepository.getPublishedSeriesArticleBySlug(
            articleSlug,
            series.uniqueId
        );

        if (!article) {
            return null;
        }

        const seriesTags = series.defaultTags || [];
        const articleManualTags = article.tags || [];
        const uniqueArticleTags = articleManualTags.filter((tag) => !seriesTags.includes(tag));
        const mergedTags = [...seriesTags, ...uniqueArticleTags];

        return {
            article,
            seriesTitle: series.title,
            mergedTags,
        };
    }

    public static async getPublishedStandaloneArticles(params: {
        page?: string;
        sort?: string;
        pageSize?: number;
    }): Promise<PaginatedArticlesResult> {
        const rawPage = parseInt(params.page || '1', 10);
        const validPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

        const validSort: 'newest' | 'oldest' = params.sort === 'oldest' ? 'oldest' : 'newest';
        const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : 20;

        return ArticleRepository.getPublishedStandaloneArticles({
            page: validPage,
            sort: validSort,
            pageSize,
        });
    }

    public static async getArchivedArticles(params: {
        page?: string;
        sort?: string;
        pageSize?: number;
    }): Promise<PaginatedArticlesResult> {
        const rawPage = parseInt(params.page || '1', 10);
        const validPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

        const validSort: 'newest' | 'oldest' = params.sort === 'oldest' ? 'oldest' : 'newest';
        const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : 20;

        return ArticleRepository.getArchivedArticles({
            page: validPage,
            sort: validSort,
            pageSize,
        });
    }

    public static async getArchivedArticleById(articleId: string): Promise<ArticleItem | null> {
        if (!articleId || typeof articleId !== 'string') {
            return null;
        }

        return ArticleRepository.getArchivedArticleById(articleId.trim());
    }

    public static async getDraftArticleById(articleId: string): Promise<ArticleItem | null> {
        if (!articleId || typeof articleId !== 'string') {
            return null;
        }

        return ArticleRepository.getDraftArticleById(articleId.trim());
    }

    public static async getDraftArticles(params: {
        page?: string;
        sort?: string;
        pageSize?: number;
    }): Promise<PaginatedArticlesResult> {
        const rawPage = parseInt(params.page || '1', 10);
        const validPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

        const validSort: 'newest' | 'oldest' = params.sort === 'oldest' ? 'oldest' : 'newest';
        const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : 20;

        return ArticleRepository.getDraftArticles({
            page: validPage,
            sort: validSort,
            pageSize,
        });
    }

    public static async getAllArticles(): Promise<ArticleCardData[]> {
        return await ArticleRepository.getAllArticles();
    }

    public static async saveDraft(
        uniqueId: string,
        formData: Partial<ArticleFormValues>
    ): Promise<ApiResponse<ArticleItem>> {
        if (!uniqueId) {
            return {
                success: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Article ID is required for saving draft',
                },
            };
        }

        if (formData.slug && formData.slug.trim() !== '') {
            const slugExists = await ArticleRepository.isSlugExists(formData.slug, uniqueId);
            if (slugExists) {
                return {
                    success: false,
                    error: {
                        code: ErrorCode.VALIDATION_ERROR,
                        message: 'This slug already exists',
                        field: 'slug',
                    },
                };
            }

            if (isReservedSlug(formData.slug)) {
                return {
                    success: false,
                    error: {
                        code: ErrorCode.VALIDATION_ERROR,
                        message: 'This slug is reserved and cannot be used.',
                        field: 'slug',
                    },
                };
            }
        }

        const draftArticle = await ArticleRepository.saveDraftArticle(uniqueId, formData);
        return { success: true, data: draftArticle };
    }

    public static async archiveDraft(uniqueId: string): Promise<ApiResponse<ArticleItem>> {
        if (!uniqueId) {
            return {
                success: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Article ID is required for archiving',
                },
            };
        }

        const draftArticle = await ArticleRepository.getDraftArticleById(uniqueId);
        if (!draftArticle) {
            return {
                success: false,
                error: {
                    code: ErrorCode.NOT_FOUND,
                    message: 'Draft article not found or already processed.',
                },
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
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: firstIssue.message,
                    field: firstIssue.path.join('.'),
                },
            };
        }

        const validFormData = validationResult.data;

        const slugExists = await ArticleRepository.isSlugExists(validFormData.slug, uniqueId);
        if (slugExists) {
            return {
                success: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'This slug already exists',
                    field: 'slug',
                },
            };
        }

        if (validFormData.slug && isReservedSlug(validFormData.slug)) {
            return {
                success: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'This slug is reserved and cannot be used.',
                    field: 'slug',
                },
            };
        }

        const archivedArticle = await ArticleRepository.archiveDraftArticle(uniqueId, validFormData);
        return { success: true, data: archivedArticle };
    }

    public static async editArticle(uniqueId: string): Promise<ApiResponse<ArticleItem>> {
        if (!uniqueId) {
            return {
                success: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Article ID is required to start editing.',
                },
            };
        }

        const draftArticle = await ArticleRepository.createEditDraft(uniqueId);
        return { success: true, data: draftArticle };
    }

    public static async publishArticle(uniqueId: string): Promise<ApiResponse<PublishedArticleData>> {
        if (!uniqueId) {
            return {
                success: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Article ID is required for publishing',
                },
            };
        }

        const draftArticle = await ArticleRepository.getDraftArticleById(uniqueId);
        if (!draftArticle) {
            return {
                success: false,
                error: {
                    code: ErrorCode.NOT_FOUND,
                    message: 'Draft article not found or already published.',
                },
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
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: firstIssue.message,
                    field: firstIssue.path.join('.'),
                },
            };
        }

        const validFormData = validationResult.data;

        const slugExists = await ArticleRepository.isSlugExists(validFormData.slug, uniqueId);
        if (slugExists) {
            return {
                success: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'This slug already exists.',
                    field: 'slug',
                },
            };
        }

        if (validFormData.slug && isReservedSlug(validFormData.slug)) {
            return {
                success: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'This slug is reserved and cannot be used.',
                    field: 'slug',
                },
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
            },
        };
    }

}