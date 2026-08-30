import type { ArticleFormValues } from '../schemas/articleFormSchema';
import type { TiptapDocument } from '../schemas/tiptapDocumentSchema';
import { emptyTiptapDocument } from '../components/article/article-editor/ContentTab';
import {ArticleItem} from "@/features/article-publishing/types/article-item.type";


export function mapDraftArticleToFormValues(article: ArticleItem): ArticleFormValues {
    return {
        lifecycle: article.lifecycle,
        title: article.title || '',
        slug: article.slug || '',
        summary: article.summary || '',
        coverImage: article.coverImage || '',
        coverAltText: article.coverAltText || '',
        thumbnailImage: article.thumbnailImage || '',
        thumbnailAltText: article.thumbnailAltText || '',
        tags: Array.isArray(article.tags) ? article.tags : [],
        seoTitle: article.seoTitle || '',
        seoDescription: article.seoDescription || '',
        canonicalUrl: article.canonicalUrl || '',
        content: (article.content as TiptapDocument) || emptyTiptapDocument,
        relatedArticleIds: Array.isArray(article.relatedArticleIds) ? article.relatedArticleIds : [],
        seriesId: article.seriesId ?? null
    };
}