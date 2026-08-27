import fs from 'fs/promises';
import path from 'path';
import type { ArticleFormValues } from '../schemas/articleFormSchema';
import type { TiptapDocument } from "@/features/article-publishing/schemas/tiptapDocumentSchema";

const NEW_PUBLISHED_PATH = path.join(
    process.cwd(),
    'src/mock-files/new-published-articles.json'
);

const NEW_DRAFT_PATH = path.join(
    process.cwd(),
    'src/mock-files/new-draft-articles.json'
);

const LEGACY_PUBLISHED_PATH = path.join(process.cwd(), 'src/mock-files/published-articles.json');
const LEGACY_ARCHIVED_PATH = path.join(process.cwd(), 'src/mock-files/archived-articles.json');

export interface ArticleRecord {
    uniqueId: string;
    slug: string;
    title: string;
    summary?: string;
    lifecycle: 'Draft' | 'Published' | 'Archived';
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
    content: TiptapDocument | Record<string, unknown>;
}

interface ArticlesJsonStructure {
    articles: ArticleRecord[];
}

export class ArticleRepository {

    private static async readJsonFile(filePath: string): Promise<ArticlesJsonStructure> {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data) as ArticlesJsonStructure;
        } catch {
            return { articles: [] };
        }
    }

    private static async writeJsonFile(filePath: string, data: ArticlesJsonStructure): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }

    public static async isSlugExists(slug: string, currentUniqueId?: string): Promise<boolean> {
        const paths = [NEW_PUBLISHED_PATH, LEGACY_PUBLISHED_PATH, LEGACY_ARCHIVED_PATH];
        const normalizedTargetSlug = slug.trim().toLowerCase();

        for (const filePath of paths) {
            const fileContent = await this.readJsonFile(filePath);
            const exists = fileContent.articles.some(
                (article) =>
                    article.slug.trim().toLowerCase() === normalizedTargetSlug &&
                    article.uniqueId !== currentUniqueId
            );

            if (exists) return true;
        }

        return false;
    }

    public static async saveDraftArticle(
        uniqueId: string,
        formData: Partial<ArticleFormValues>
    ): Promise<ArticleRecord> {
        const now = new Date().toISOString();
        const fileContent = await this.readJsonFile(NEW_DRAFT_PATH);

        const existingIndex = fileContent.articles.findIndex(a => a.uniqueId === uniqueId);
        const existingArticle = existingIndex !== -1 ? fileContent.articles[existingIndex] : null;

        const draftArticle: ArticleRecord = {
            uniqueId,
            slug: formData.slug || existingArticle?.slug || '',
            title: formData.title || existingArticle?.title || 'Untitled Draft',
            summary: formData.summary || existingArticle?.summary || '',
            lifecycle: 'Draft',
            seriesId: formData.seriesId || existingArticle?.seriesId || null,
            tags: formData.tags || existingArticle?.tags || [],
            coverImage: formData.coverImage || existingArticle?.coverImage || '',
            coverAltText: formData.coverAltText || existingArticle?.coverAltText || '',
            thumbnailImage: formData.thumbnailImage || existingArticle?.thumbnailImage || '',
            thumbnailAltText: formData.thumbnailAltText || existingArticle?.thumbnailAltText || '',
            seoTitle: formData.seoTitle || existingArticle?.seoTitle || formData.title || '',
            seoDescription: formData.seoDescription || existingArticle?.seoDescription || formData.summary || '',
            canonicalUrl: formData.canonicalUrl || existingArticle?.canonicalUrl || null,
            relatedArticleIds: existingArticle?.relatedArticleIds || [],
            inboundReferencingIds: existingArticle?.inboundReferencingIds || [],
            createdAt: existingArticle?.createdAt || now,
            updatedAt: existingArticle ? now : null,
            firstPublishedAt: existingArticle?.firstPublishedAt || null,
            publishedAt: null,
            archivedAt: null,
            content: formData.content || existingArticle?.content || { type: 'doc', content: [] }
        };

        if (existingIndex !== -1) {
            fileContent.articles[existingIndex] = draftArticle;
        } else {
            fileContent.articles.unshift(draftArticle);
        }

        await this.writeJsonFile(NEW_DRAFT_PATH, fileContent);
        return draftArticle;
    }


    public static async deleteDraftArticle(uniqueId: string): Promise<void> {
        const draftContent = await this.readJsonFile(NEW_DRAFT_PATH);
        const updatedArticles = draftContent.articles.filter(a => a.uniqueId !== uniqueId);

        if (updatedArticles.length !== draftContent.articles.length) {
            await this.writeJsonFile(NEW_DRAFT_PATH, { articles: updatedArticles });
        }
    }


    public static async savePublishedArticle(
        uniqueId: string,
        formData: ArticleFormValues
    ): Promise<ArticleRecord> {
        const now = new Date().toISOString();

        await this.deleteDraftArticle(uniqueId);

        const publishedContent = await this.readJsonFile(NEW_PUBLISHED_PATH);
        const existingIndex = publishedContent.articles.findIndex(a => a.uniqueId === uniqueId);
        const existingArticle = existingIndex !== -1 ? publishedContent.articles[existingIndex] : null;

        const publishedArticle: ArticleRecord = {
            uniqueId,
            slug: formData.slug,
            title: formData.title,
            summary: formData.summary,
            lifecycle: 'Published',
            seriesId: formData.seriesId || null,
            tags: formData.tags || [],
            coverImage: formData.coverImage || 'https://cdn.example.com/articles/covers/retry-policies.webp',
            coverAltText: formData.coverAltText || 'Diagram illustrating retry policies',
            thumbnailImage: formData.thumbnailImage || 'https://cdn.example.com/articles/thumbnails/retry-policies.webp',
            thumbnailAltText: formData.thumbnailAltText || 'Diagram illustrating retry policies_thmb',
            seoTitle: formData.seoTitle || formData.title,
            seoDescription: formData.seoDescription || formData.summary,
            canonicalUrl: formData.canonicalUrl || null,
            relatedArticleIds: existingArticle?.relatedArticleIds || [],
            inboundReferencingIds: existingArticle?.inboundReferencingIds || [],
            createdAt: existingArticle?.createdAt || now,
            updatedAt: existingArticle ? now : null,
            firstPublishedAt: existingArticle?.firstPublishedAt || now,
            publishedAt: now,
            archivedAt: null,
            content: formData.content
        };

        if (existingIndex !== -1) {
            publishedContent.articles[existingIndex] = publishedArticle;
        } else {
            publishedContent.articles.unshift(publishedArticle);
        }

        await this.writeJsonFile(NEW_PUBLISHED_PATH, publishedContent);
        return publishedArticle;
    }
}