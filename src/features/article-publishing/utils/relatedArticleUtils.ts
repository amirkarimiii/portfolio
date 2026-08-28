import { ArticleCardData } from '../types/reference-card.type';

export interface FilterAndSortSuggestedArticlesParams {
    allArticles: ArticleCardData[];
    currentArticleId?: string;
    currentTags: string[];
    currentSeriesId?: string | null;
    selectedRelatedIds: string[];
}

export function calculateTagOverlap(articleTags: string[], currentTags: string[]): number {
    if (!currentTags.length || !articleTags.length) return 0;

    const currentTagSet = new Set(currentTags.map((t) => t.toLowerCase()));
    let overlapCount = 0;

    for (const tag of articleTags) {
        if (currentTagSet.has(tag.toLowerCase())) {
            overlapCount++;
        }
    }

    return overlapCount;
}


export function getSuggestedArticles({
                                         allArticles,
                                         currentArticleId,
                                         currentTags,
                                         currentSeriesId,
                                         selectedRelatedIds,
                                     }: FilterAndSortSuggestedArticlesParams): ArticleCardData[] {
    if (!currentTags || currentTags.length === 0) {
        return [];
    }

    const selectedSet = new Set(selectedRelatedIds);

    const candidates = allArticles.filter((article) => {
        if (currentArticleId && article.uniqueId === currentArticleId) {
            return false;
        }

        if (selectedSet.has(article.uniqueId)) {
            return false;
        }

        return !(currentSeriesId && article.seriesId === currentSeriesId);

    });

    const scoredCandidates = candidates.map((article) => ({
        article,
        overlap: calculateTagOverlap(article.tags || [], currentTags),
    }));

    scoredCandidates.sort((a, b) => {
        if (b.overlap !== a.overlap) {
            return b.overlap - a.overlap;
        }
        return a.article.uniqueId.localeCompare(b.article.uniqueId);
    });

    return scoredCandidates.map((sc) => sc.article);
}