export interface SeriesItem {
    uniqueId: string;
    slug: string;
    title: string;
    description: string;
    defaultTags: string[];
    coverImage: string;
    coverAltText: string;
    thumbnailImage: string;
    thumbnailAltText: string;
    seoTitle: string;
    seoDescription: string;
    canonicalUrl: string | null;
    inboundReferencingIds: string[];
    createdAt: string;
    updatedAt: string;
}