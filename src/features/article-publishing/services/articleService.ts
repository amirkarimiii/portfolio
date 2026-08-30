import { ArticleRepository } from '../repository/articleRepository';
import type { ArticleItem } from '../types/article-item.type';
import {PaginatedArticlesResult} from "@/features/article-publishing/types/pagination.type";

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

}