export interface ArticleCardData {
    uniqueId: string;
    slug: string;
    title: string;
    summary?: string;
    lifecycle: string;
    seriesId?: string | null;
    seriesSlug?: string | null;
    seriesTitle?: string | null;
    tags: string[];
    thumbnailImage: string;
    thumbnailAltText?: string;
    firstPublishedAt?: string | null;
    publishedAt?: string | null;
    archivedAt?: string | null;
    inboundReferencingIds?: string[];
}

export interface SeriesCardData {
    uniqueId: string;
    slug: string;
    title: string;
    description: string;
    defaultTags: string[];
    thumbnailImage: string;
    thumbnailAltText?: string;
    inboundReferencingIds?: string[];
}