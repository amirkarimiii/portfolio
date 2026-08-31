import { ArticleRepository } from '../repository/articleRepository';
import type { ArticleItem } from '../types/article-item.type';
import {PaginatedArticlesResult} from "@/features/article-publishing/types/pagination.type";
import {SeriesRepository} from "@/features/article-publishing/repository/seriesRepository";
import {SeriesArticleData} from "@/features/article-publishing/types/series-article.type";

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

}