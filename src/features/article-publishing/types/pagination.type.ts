import type { ArticleCardData } from './reference-card.type';

export interface PaginatedArticlesResult {
    articles: ArticleCardData[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}