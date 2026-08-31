import type {ArticleCardData, SeriesCardData} from './reference-card.type';

export interface PaginatedArticlesResult {
    articles: ArticleCardData[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}

export interface PaginatedSeriesResult {
    series: SeriesCardData[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}