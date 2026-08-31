import { ArticleItem } from './article-item.type';

export interface SeriesArticleData {
    article: ArticleItem;
    seriesTitle: string;
    mergedTags: string[];
}