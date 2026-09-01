import { SeriesRepository } from '../repository/seriesRepository';
import {PaginatedSeriesResult} from "@/features/article-publishing/types/pagination.type";
import {ArticleRepository} from "@/features/article-publishing/repository/articleRepository";
import {ArticleCardData} from "@/features/article-publishing/types/reference-card.type";
import {SeriesItem} from "@/features/article-publishing/types/series-item.type";
import {seriesFormSchema, SeriesFormValues} from "@/features/article-publishing/schemas/seriesFormSchema";
import {ApiResponse, ErrorCode} from "@/shared/types/api";
import {isReservedSlug} from "@/features/article-publishing/utils/slugValidation";

export class SeriesService {

    public static async getPaginatedSeries(params: {
        page?: string;
        pageSize?: number;
    }): Promise<PaginatedSeriesResult> {
        const rawPage = parseInt(params.page || '1', 10);
        const validPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
        const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : 20;

        return SeriesRepository.getPaginatedSeries({
            page: validPage,
            pageSize,
        });
    }

    public static async getSeriesWithArticles(slug: string): Promise<{
        series: SeriesItem;
        articles: ArticleCardData[];
    } | null> {
        if (!slug || !slug.trim()) {
            return null;
        }

        const series = await SeriesRepository.getSeriesBySlug(slug);

        if (!series) {
            return null;
        }

        const articles = await ArticleRepository.getPublishedArticlesBySeriesId(series.uniqueId);

        return {
            series,
            articles,
        };
    }

    public static async getSeriesById(seriesId: string): Promise<SeriesItem | null> {
        if (!seriesId || typeof seriesId !== 'string') {
            return null;
        }

        return SeriesRepository.getSeriesById(seriesId.trim());
    }

    public static async publishSeries(formData: SeriesFormValues): Promise<ApiResponse<SeriesItem>> {
        const validationResult = seriesFormSchema.safeParse(formData);
        if (!validationResult.success) {
            const issue = validationResult.error.issues[0];
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

        return { success: true, data: savedSeries };
    }

}