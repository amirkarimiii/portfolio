import {SeriesRepository} from '../repository/seriesRepository';
import {PaginatedSeriesResult} from "@/features/article-publishing/types/pagination.type";
import {ArticleRepository} from "@/features/article-publishing/repository/articleRepository";
import {ArticleCardData} from "@/features/article-publishing/types/reference-card.type";
import {SeriesItem} from "@/features/article-publishing/types/series-item.type";
import {seriesFormSchema, SeriesFormValues} from "@/features/article-publishing/schemas/seriesFormSchema";
import {ApiResponse, ErrorCode} from "@/shared/types/api";
import {isReservedSlug} from "@/features/article-publishing/utils/slugValidation";
import {logger} from "@/shared/logger/logger";

export class SeriesService {

    public static async getPaginatedSeries(params: {
        page?: string;
        pageSize?: number;
    }): Promise<PaginatedSeriesResult> {
        try {
            const rawPage = parseInt(params.page || '1', 10);
            const validPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
            const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : 20;

            return await SeriesRepository.getPaginatedSeries({
                page: validPage,
                pageSize,
            });
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to fetch paginated series',
                {context: 'SeriesService.getPaginatedSeries', params}
            );
            return {
                series: [],
                totalItems: 0,
                totalPages: 1,
                currentPage: 1,
                pageSize: params.pageSize || 20,
            };
        }
    }

    public static async getSeriesWithArticles(slug: string): Promise<{
        series: SeriesItem;
        articles: ArticleCardData[];
    } | null> {
        if (!slug || !slug.trim()) {
            return null;
        }

        try {
            const series = await SeriesRepository.getSeriesBySlug(slug.trim());

            if (!series) {
                logger.warn('Series not found by slug', {
                    context: 'SeriesService.getSeriesWithArticles',
                    slug,
                });
                return null;
            }

            const articles = await ArticleRepository.getPublishedArticlesBySeriesId(series.uniqueId);

            return {
                series,
                articles,
            };
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to fetch series with articles',
                {context: 'SeriesService.getSeriesWithArticles', slug}
            );
            return null;
        }
    }

    public static async getSeriesById(seriesId: string): Promise<SeriesItem | null> {
        if (!seriesId || typeof seriesId !== 'string') {
            return null;
        }

        try {
            return await SeriesRepository.getSeriesById(seriesId.trim());
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to get series by ID',
                {context: 'SeriesService.getSeriesById', seriesId}
            );
            return null;
        }
    }

    public static async publishSeries(formData: SeriesFormValues): Promise<ApiResponse<SeriesItem>> {
        try {
            const validationResult = seriesFormSchema.safeParse(formData);
            if (!validationResult.success) {
                const issue = validationResult.error.issues[0];
                logger.warn('Publish series validation failed', {
                    context: 'SeriesService.publishSeries',
                    issue,
                });
                return {
                    success: false,
                    error: {
                        code: ErrorCode.VALIDATION_ERROR,
                        message: issue?.message || 'Invalid form data',
                        field: issue?.path[0] as string,
                    },
                };
            }

            const validData = validationResult.data;

            const slugExists = await SeriesRepository.isSlugExists(validData.slug);
            if (slugExists) {
                logger.warn('Publish series rejected: Slug already exists', {
                    context: 'SeriesService.publishSeries',
                    slug: validData.slug,
                });
                return {
                    success: false,
                    error: {
                        code: ErrorCode.VALIDATION_ERROR,
                        message: 'A series with this slug already exists.',
                        field: 'slug',
                    },
                };
            }

            if (formData.slug && isReservedSlug(formData.slug)) {
                logger.warn('Publish series rejected: Slug is reserved', {
                    context: 'SeriesService.publishSeries',
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

            const savedSeries = await SeriesRepository.saveSeries(validData);

            return {success: true, data: savedSeries};
        } catch (error) {
            logger.error(
                error as Error,
                'Unexpected error while publishing series',
                {context: 'SeriesService.publishSeries', slug: formData.slug}
            );
            return {
                success: false,
                error: {
                    code: ErrorCode.INTERNAL_SERVER_ERROR,
                    message: 'An internal server error occurred while publishing the series.',
                },
            };
        }
    }

}