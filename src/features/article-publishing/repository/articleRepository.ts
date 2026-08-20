import fs from 'fs/promises';
import path from 'path';
import { ulid } from 'ulid';
import type { ArticleFormValues } from '../schemas/articleFormSchema';
import {TiptapDocument} from "@/features/article-publishing/schemas/tiptapDocumentSchema";

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
    content: TiptapDocument
}

interface ArticlesJsonStructure {
    articles: PublishedArticle[];
}

const PUBLISHED_ARTICLES_PATH = path.join(process.cwd(), 'src/mock-files/published-articles.json');
const ARCHIVED_ARTICLES_PATH = path.join(process.cwd(), 'src/mock-files/archived-articles.json');

export class ArticleRepository {

    public static async isSlugExists(slug: string): Promise<boolean> {
        const paths = [JSON_FILE_PATH, PUBLISHED_ARTICLES_PATH, ARCHIVED_ARTICLES_PATH];
        const normalizedTargetSlug = slug.trim().toLowerCase();

        for (const filePath of paths) {
            try {
                const content = await fs.readFile(filePath, 'utf-8');
                const parsed = JSON.parse(content);
                const articles: Array<{ slug: string }> = parsed.articles || [];

                const exists = articles.some(
                    (article) => article.slug.trim().toLowerCase() === normalizedTargetSlug
                );

                if (exists) return true;
            } catch {

            }
        }

        return false;
    }

    private static async readArticlesFile(): Promise<ArticlesJsonStructure> {
        try {
            const data = await fs.readFile(JSON_FILE_PATH, 'utf-8');
            return JSON.parse(data) as ArticlesJsonStructure;
        } catch {
            return { articles: [] };
        }
    }


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
            content: formData.content
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