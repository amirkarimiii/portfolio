import { ArticleRepository } from '../repository/articleRepository';
import type { ArticleItem } from '../types/article-item.type';
import { PaginatedArticlesResult } from "@/features/article-publishing/types/pagination.type";
import { SeriesRepository } from "@/features/article-publishing/repository/seriesRepository";
import { SeriesArticleData } from "@/features/article-publishing/types/series-article.type";
import { ArticleCardData } from "@/features/article-publishing/types/reference-card.type";
import { articleFormSchema, ArticleFormValues } from "@/features/article-publishing/schemas/articleFormSchema";
import { ApiResponse, ErrorCode } from "@/shared/types/api";
import { isReservedSlug } from "@/features/article-publishing/utils/slugValidation";
import { logger } from "@/shared/logger/logger";

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

        try {
            return await ArticleRepository.getPublishedStandaloneArticleBySlug(normalizedSlug);
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to fetch published standalone article',
                { context: 'ArticleService.getPublishedStandaloneArticle', slug: normalizedSlug }
            );
            return null;
        }
    }

    public static async getSeriesArticleDetails(
        seriesSlug: string,
        articleSlug: string
    ): Promise<SeriesArticleData | null> {
        try {
            const series = await SeriesRepository.getSeriesBySlug(seriesSlug);
            if (!series) {
                logger.warn('Series not found for series article details', {
                    context: 'ArticleService.getSeriesArticleDetails',
                    seriesSlug,
                    articleSlug,
                });
                return null;
            }

            const article = await ArticleRepository.getPublishedSeriesArticleBySlug(
                articleSlug,
                series.uniqueId
            );

            if (!article) {
                logger.warn('Published series article not found', {
                    context: 'ArticleService.getSeriesArticleDetails',
                    seriesSlug,
                    articleSlug,
                    seriesId: series.uniqueId,
                });
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
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to get series article details',
                { context: 'ArticleService.getSeriesArticleDetails', seriesSlug, articleSlug }
            );
            return null;
        }
    }

    public static async getPublishedStandaloneArticles(params: {
        page?: string;
        sort?: string;
        pageSize?: number;
    }): Promise<PaginatedArticlesResult> {
        try {
            const rawPage = parseInt(params.page || '1', 10);
            const validPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

            const validSort: 'newest' | 'oldest' = params.sort === 'oldest' ? 'oldest' : 'newest';
            const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : 20;

            return await ArticleRepository.getPublishedStandaloneArticles({
                page: validPage,
                sort: validSort,
                pageSize,
            });
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to fetch published standalone articles',
                { context: 'ArticleService.getPublishedStandaloneArticles', params }
            );
            return {
                articles: [],
                totalItems: 0,
                totalPages: 1,
                currentPage: 1,
                pageSize: params.pageSize || 20,
            };
        }
    }

    public static async getArchivedArticles(params: {
        page?: string;
        sort?: string;
        pageSize?: number;
    }): Promise<PaginatedArticlesResult> {
        try {
            const rawPage = parseInt(params.page || '1', 10);
            const validPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

            const validSort: 'newest' | 'oldest' = params.sort === 'oldest' ? 'oldest' : 'newest';
            const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : 20;

            return await ArticleRepository.getArchivedArticles({
                page: validPage,
                sort: validSort,
                pageSize,
            });
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to fetch archived articles',
                { context: 'ArticleService.getArchivedArticles', params }
            );
            return {
                articles: [],
                totalItems: 0,
                totalPages: 1,
                currentPage: 1,
                pageSize: params.pageSize || 20,
            };
        }
    }

    public static async getArchivedArticleById(articleId: string): Promise<ArticleItem | null> {
        if (!articleId || typeof articleId !== 'string') {
            return null;
        }

        try {
            return await ArticleRepository.getArchivedArticleById(articleId.trim());
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to get archived article by ID',
                { context: 'ArticleService.getArchivedArticleById', articleId }
            );
            return null;
        }
    }

    public static async getDraftArticleById(articleId: string): Promise<ArticleItem | null> {
        if (!articleId || typeof articleId !== 'string') {
            return null;
        }

        try {
            return await ArticleRepository.getDraftArticleById(articleId.trim());
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to get draft article by ID',
                { context: 'ArticleService.getDraftArticleById', articleId }
            );
            return null;
        }
    }

    public static async getDraftArticles(params: {
        page?: string;
        sort?: string;
        pageSize?: number;
    }): Promise<PaginatedArticlesResult> {
        try {
            const rawPage = parseInt(params.page || '1', 10);
            const validPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

            const validSort: 'newest' | 'oldest' = params.sort === 'oldest' ? 'oldest' : 'newest';
            const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : 20;

            return await ArticleRepository.getDraftArticles({
                page: validPage,
                sort: validSort,
                pageSize,
            });
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to fetch draft articles',
                { context: 'ArticleService.getDraftArticles', params }
            );
            return {
                articles: [],
                totalItems: 0,
                totalPages: 1,
                currentPage: 1,
                pageSize: params.pageSize || 20,
            };
        }
    }

    public static async getAllArticles(): Promise<ArticleCardData[]> {
        try {
            return await ArticleRepository.getAllArticles();
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to fetch all articles in ArticleService',
                { context: 'ArticleService.getAllArticles' }
            );
            return [];
        }
    }

    public static async saveDraft(
        uniqueId: string,
        formData: Partial<ArticleFormValues>
    ): Promise<ApiResponse<ArticleItem>> {
        if (!uniqueId) {
            logger.warn('Validation error: Article ID missing for draft saving', {
                context: 'ArticleService.saveDraft',
            });
            return {
                success: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Article ID is required for saving draft',
                },
            };
        }

        try {
            if (formData.slug && formData.slug.trim() !== '') {
                const slugExists = await ArticleRepository.isSlugExists(formData.slug, uniqueId);
                if (slugExists) {
                    logger.warn('Draft save rejected: Slug already exists', {
                        context: 'ArticleService.saveDraft',
                        uniqueId,
                        slug: formData.slug,
                    });
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
                    logger.warn('Draft save rejected: Slug is reserved', {
                        context: 'ArticleService.saveDraft',
                        uniqueId,
                        slug: formData.slug,
                    });
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
        } catch (error) {
            logger.error(
                error as Error,
                'Unexpected error while saving draft article',
                { context: 'ArticleService.saveDraft', uniqueId }
            );
            return {
                success: false,
                error: {
                    code: ErrorCode.INTERNAL_SERVER_ERROR,
                    message: 'An internal server error occurred while saving the draft.',
                },
            };
        }
    }

    public static async archiveDraft(uniqueId: string): Promise<ApiResponse<ArticleItem>> {
        if (!uniqueId) {
            logger.warn('Validation error: Article ID missing for archiving', {
                context: 'ArticleService.archiveDraft',
            });
            return {
                success: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Article ID is required for archiving',
                },
            };
        }

        try {
            const draftArticle = await ArticleRepository.getDraftArticleById(uniqueId);
            if (!draftArticle) {
                logger.warn('Archive draft failed: Draft article not found', {
                    context: 'ArticleService.archiveDraft',
                    uniqueId,
                });
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
                logger.warn('Archive draft validation failed', {
                    context: 'ArticleService.archiveDraft',
                    uniqueId,
                    issue: firstIssue,
                });
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
                logger.warn('Archive draft rejected: Slug already exists', {
                    context: 'ArticleService.archiveDraft',
                    uniqueId,
                    slug: validFormData.slug,
                });
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
                logger.warn('Archive draft rejected: Slug is reserved', {
                    context: 'ArticleService.archiveDraft',
                    uniqueId,
                    slug: validFormData.slug,
                });
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
        } catch (error) {
            logger.error(
                error as Error,
                'Unexpected error while archiving draft article',
                { context: 'ArticleService.archiveDraft', uniqueId }
            );
            return {
                success: false,
                error: {
                    code: ErrorCode.INTERNAL_SERVER_ERROR,
                    message: 'An internal server error occurred while archiving the draft.',
                },
            };
        }
    }

    public static async editArticle(uniqueId: string): Promise<ApiResponse<ArticleItem>> {
        if (!uniqueId) {
            logger.warn('Validation error: Article ID missing to start editing', {
                context: 'ArticleService.editArticle',
            });
            return {
                success: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Article ID is required to start editing.',
                },
            };
        }

        try {
            const draftArticle = await ArticleRepository.createEditDraft(uniqueId);
            return { success: true, data: draftArticle };
        } catch (error) {
            logger.error(
                error as Error,
                'Unexpected error while creating edit draft',
                { context: 'ArticleService.editArticle', uniqueId }
            );
            return {
                success: false,
                error: {
                    code: ErrorCode.INTERNAL_SERVER_ERROR,
                    message: 'An internal server error occurred while preparing edit draft.',
                },
            };
        }
    }

    public static async publishArticle(uniqueId: string): Promise<ApiResponse<PublishedArticleData>> {
        if (!uniqueId) {
            logger.warn('Validation error: Article ID missing for publishing', {
                context: 'ArticleService.publishArticle',
            });
            return {
                success: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Article ID is required for publishing',
                },
            };
        }

        try {
            const draftArticle = await ArticleRepository.getDraftArticleById(uniqueId);
            if (!draftArticle) {
                logger.warn('Publish article failed: Draft not found', {
                    context: 'ArticleService.publishArticle',
                    uniqueId,
                });
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
                logger.warn('Publish article validation failed', {
                    context: 'ArticleService.publishArticle',
                    uniqueId,
                    issue: firstIssue,
                });
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
                logger.warn('Publish article rejected: Slug already exists', {
                    context: 'ArticleService.publishArticle',
                    uniqueId,
                    slug: validFormData.slug,
                });
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
                logger.warn('Publish article rejected: Slug is reserved', {
                    context: 'ArticleService.publishArticle',
                    uniqueId,
                    slug: validFormData.slug,
                });
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
        } catch (error) {
            logger.error(
                error as Error,
                'Unexpected error while publishing article',
                { context: 'ArticleService.publishArticle', uniqueId }
            );
            return {
                success: false,
                error: {
                    code: ErrorCode.INTERNAL_SERVER_ERROR,
                    message: 'An internal server error occurred while publishing the article.',
                },
            };
        }
    }

}