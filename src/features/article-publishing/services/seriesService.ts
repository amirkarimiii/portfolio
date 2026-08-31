import { SeriesRepository } from '../repository/seriesRepository';
import {PaginatedSeriesResult} from "@/features/article-publishing/types/pagination.type";
import {ArticleRepository} from "@/features/article-publishing/repository/articleRepository";
import {ArticleCardData} from "@/features/article-publishing/types/reference-card.type";
import {SeriesItem} from "@/features/article-publishing/types/series-item.type";

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

}