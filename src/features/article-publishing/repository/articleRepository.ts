import fs from 'fs/promises';
import path from 'path';
import { ulid } from 'ulid';
import type { ArticleFormValues } from '../schemas/articleFormSchema';

const JSON_FILE_PATH = path.join(
    process.cwd(),
    'src/mock-files/new-published-articles.json'
);

export interface PublishedArticle {
    uniqueId: string;
    slug: string;
    title: string;
    summary: string | undefined;
    lifecycle: 'Published';
    seriesId: string | null;
    tags: string[];
    coverImage: string;
    coverAltText: string;
    thumbnailImage: string;
    thumbnailAltText: string;
    seoTitle: string;
    seoDescription: string | undefined;
    canonicalUrl: string | null;
    relatedArticleIds: string[];
    inboundReferencingIds: string[];
    createdAt: string;
    updatedAt: string | null;
    firstPublishedAt: string;
    publishedAt: string;
    archivedAt: string | null;
}

interface ArticlesJsonStructure {
    articles: PublishedArticle[];
}

export class ArticleRepository {
    /**
     * خواندن تمام مقالات موجود از فایل JSON
     */
    private static async readArticlesFile(): Promise<ArticlesJsonStructure> {
        try {
            const data = await fs.readFile(JSON_FILE_PATH, 'utf-8');
            return JSON.parse(data) as ArticlesJsonStructure;
        } catch {
            return { articles: [] };
        }
    }

    /**
     * ذخیره مقاله جدید در فایل JSON
     */
    public static async savePublishedArticle(
        formData: ArticleFormValues
    ): Promise<PublishedArticle> {
        const now = new Date().toISOString();

        const uniqueId = `art_${ulid()}`;

        const newArticle: PublishedArticle = {
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
            relatedArticleIds: [],
            inboundReferencingIds: [],
            createdAt: now,
            updatedAt: null,
            firstPublishedAt: now,
            publishedAt: now,
            archivedAt: null,
        };

        const fileContent = await this.readArticlesFile();

        fileContent.articles.unshift(newArticle);

        await fs.writeFile(
            JSON_FILE_PATH,
            JSON.stringify(fileContent, null, 2),
            'utf-8'
        );

        return newArticle;
    }
}