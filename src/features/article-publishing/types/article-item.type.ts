import {TipTapDocument} from "@/features/article-publishing/types/node-renderers.type";

export interface ArticleItem {
    uniqueId: string;
    slug: string;
    title: string;
    summary?: string;
    lifecycle: 'Published' | 'Archived' | null;
    seriesId: string | null;
    tags: string[];
    coverImage: string;
    coverAltText: string;
    thumbnailImage: string;
    thumbnailAltText: string;
    seoTitle: string;
    seoDescription?: string;
    canonicalUrl: string | null;
    relatedArticleIds: string[];
    inboundReferencingIds: string[];
    createdAt: string;
    updatedAt: string | null;
    firstPublishedAt: string | null;
    publishedAt: string | null;
    archivedAt: string | null;
    content: TipTapDocument | Record<string, unknown>;
}