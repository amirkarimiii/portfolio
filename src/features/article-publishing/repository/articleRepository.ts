import fs from 'fs/promises';
import path from 'path';
import type {ArticleFormValues} from '../schemas/articleFormSchema';
import type {ArticleCardData} from '../types/reference-card.type';
import {ArticleItem} from "@/features/article-publishing/types/article-item.type";
import clientPromise from "@/shared/lib/mongodb";
import {PaginatedArticlesResult} from "@/features/article-publishing/types/pagination.type";

const NEW_PUBLISHED_PATH = path.join(
    process.cwd(),
    'src/mock-files/new-published-articles.json'
);

const NEW_ARCHIVE_PATH = path.join(
    process.cwd(),
    'src/mock-files/new-archived-articles.json'
);

const NEW_DRAFT_PATH = path.join(
    process.cwd(),
    'src/mock-files/new-draft-articles.json'
);

interface ArticlesJsonStructure {
    articles: ArticleItem[];
}

export class ArticleRepository {

    public static async getPublishedStandaloneArticleBySlug(slug: string): Promise<ArticleItem | null> {
        try {
            const client = await clientPromise;
            const db = client.db();
            const collection = db.collection<ArticleItem>('articles');

            const article = await collection.findOne(
                {
                    slug: slug,
                    seriesId: null
                },
                {
                    projection: { _id: 0 }
                }
            );

            return article || null;
        } catch (error) {
            console.error('[ArticleRepository.getPublishedStandaloneArticleBySlug Error]:', error);
            return null;
        }
    }

    public static async getPublishedStandaloneArticles({
                                                           page = 1,
                                                           pageSize = 20,
                                                           sort = 'newest',
                                                       }: {
        page?: number;
        pageSize?: number;
        sort?: 'newest' | 'oldest';
    }): Promise<PaginatedArticlesResult> {
        try {
            const client = await clientPromise;
            const db = client.db();
            const collection = db.collection<ArticleItem>('articles');

            const query = {
                lifecycle: 'Published' as const,
                seriesId: null,
            };

            const sortOrder = sort === 'oldest' ? 1 : -1;
            const skip = (page - 1) * pageSize;

            const [totalItems, docs] = await Promise.all([
                collection.countDocuments(query),
                collection
                    .find(query)
                    .sort({ publishedAt: sortOrder, firstPublishedAt: sortOrder, createdAt: sortOrder })
                    .skip(skip)
                    .limit(pageSize)
                    .project<ArticleCardData>({
                        _id: 0,
                        uniqueId: 1,
                        slug: 1,
                        title: 1,
                        summary: 1,
                        seriesId: 1,
                        tags: 1,
                        thumbnailImage: 1,
                        thumbnailAltText: 1,
                        firstPublishedAt: 1,
                        publishedAt: 1,
                        lifecycle: 1,
                    })
                    .toArray(),
            ]);

            const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

            return {
                articles: docs,
                totalItems,
                totalPages,
                currentPage: page,
                pageSize,
            };
        } catch (error) {
            console.error('[ArticleRepository.getPublishedStandaloneArticles Error]:', error);
            return {
                articles: [],
                totalItems: 0,
                totalPages: 1,
                currentPage: page,
                pageSize,
            };
        }
    }

    // #################### Mock legacy functions

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

    public static async getAllArticles(): Promise<ArticleCardData[]> {
        const paths = [NEW_PUBLISHED_PATH];
        const articleMap = new Map<string, ArticleCardData>();

        for (const filePath of paths) {
            const fileContent = await this.readJsonFile(filePath);
            for (const item of fileContent.articles) {
                if (!articleMap.has(item.uniqueId)) {
                    articleMap.set(item.uniqueId, {
                        lifecycle: "",
                        uniqueId: item.uniqueId,
                        slug: item.slug,
                        title: item.title,
                        summary: item.summary,
                        seriesId: item.seriesId,
                        tags: item.tags || [],
                        thumbnailImage: item.thumbnailImage,
                        thumbnailAltText: item.thumbnailAltText,
                        firstPublishedAt: item.firstPublishedAt || undefined,
                        publishedAt: item.publishedAt || undefined
                    });
                }
            }
        }

        return Array.from(articleMap.values());
    }

    public static async getDraftArticle(uniqueId: string): Promise<ArticleItem | null> {
        const fileContent = await this.readJsonFile(NEW_DRAFT_PATH);
        return fileContent.articles.find(a => a.uniqueId === uniqueId) || null
    }

    public static async isSlugExists(slug: string, currentUniqueId?: string): Promise<boolean> {
        const paths = [NEW_PUBLISHED_PATH, NEW_ARCHIVE_PATH, NEW_DRAFT_PATH];
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
    ): Promise<ArticleItem> {
        const now = new Date().toISOString();
        const fileContent = await this.readJsonFile(NEW_DRAFT_PATH);

        const existingIndex = fileContent.articles.findIndex(a => a.uniqueId === uniqueId);
        const existingArticle = existingIndex !== -1 ? fileContent.articles[existingIndex] : null;

        const draftArticle: ArticleItem = {
            uniqueId,
            slug: formData.slug !== undefined ? formData.slug : (existingArticle?.slug || ''),
            title: formData.title !== undefined ? formData.title : (existingArticle?.title || 'Untitled Draft'),
            summary: formData.summary !== undefined ? formData.summary : (existingArticle?.summary || ''),
            lifecycle: formData.lifecycle !== undefined ? formData.lifecycle : (existingArticle?.lifecycle || null),
            seriesId: formData.seriesId !== undefined ? formData.seriesId : (existingArticle?.seriesId || null),
            tags: formData.tags !== undefined ? formData.tags : (existingArticle?.tags || []),
            coverImage: formData.coverImage !== undefined ? formData.coverImage : (existingArticle?.coverImage || ''),
            coverAltText: formData.coverAltText !== undefined ? formData.coverAltText : (existingArticle?.coverAltText || ''),
            thumbnailImage: formData.thumbnailImage !== undefined ? formData.thumbnailImage : (existingArticle?.thumbnailImage || ''),
            thumbnailAltText: formData.thumbnailAltText !== undefined ? formData.thumbnailAltText : (existingArticle?.thumbnailAltText || ''),
            seoTitle: formData.seoTitle !== undefined ? formData.seoTitle : (existingArticle?.seoTitle || formData.title || ''),
            seoDescription: formData.seoDescription !== undefined ? formData.seoDescription : (existingArticle?.seoDescription || formData.summary || ''),
            canonicalUrl: formData.canonicalUrl !== undefined ? formData.canonicalUrl : (existingArticle?.canonicalUrl || null),
            relatedArticleIds: formData.relatedArticleIds !== undefined ? formData.relatedArticleIds : (existingArticle?.relatedArticleIds || []),
            inboundReferencingIds: existingArticle?.inboundReferencingIds || [],
            createdAt: existingArticle?.createdAt || now,
            updatedAt: existingArticle ? now : null,
            firstPublishedAt: existingArticle?.firstPublishedAt || null,
            publishedAt: null,
            archivedAt: null,
            content: formData.content !== undefined ? formData.content : (existingArticle?.content || { type: 'doc', content: [] })
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

    public static async deletePublishedArticle(uniqueId: string): Promise<void> {
        const publishedContent = await this.readJsonFile(NEW_PUBLISHED_PATH);
        const updatedArticles = publishedContent.articles.filter(a => a.uniqueId !== uniqueId);

        if (updatedArticles.length !== publishedContent.articles.length) {
            await this.writeJsonFile(NEW_PUBLISHED_PATH, { articles: updatedArticles });
        }
    }

    public static async savePublishedArticle(
        uniqueId: string,
        formData: ArticleFormValues
    ): Promise<ArticleItem> {
        const now = new Date().toISOString();

        const publishedContent = await this.readJsonFile(NEW_PUBLISHED_PATH);
        const existingIndex = publishedContent.articles.findIndex(a => a.uniqueId === uniqueId);
        const existingArticle = existingIndex !== -1 ? publishedContent.articles[existingIndex] : null;

        const publishedArticle: ArticleItem = {
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
            relatedArticleIds: formData.relatedArticleIds || existingArticle?.relatedArticleIds || [],
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
        await this.deleteDraftArticle(uniqueId);

        return publishedArticle;
    }

    public static async archiveDraftArticle(
        uniqueId: string,
        formData: ArticleFormValues
    ): Promise<ArticleItem> {
        const now = new Date().toISOString();
        const draftArticle = await this.getDraftArticle(uniqueId);

        if (!draftArticle) {
            throw new Error('Draft article not found');
        }

        const archivedContent = await this.readJsonFile(NEW_ARCHIVE_PATH);
        const existingIndex = archivedContent.articles.findIndex(a => a.uniqueId === uniqueId);

        const archivedArticle: ArticleItem = {
            uniqueId,
            slug: formData.slug,
            title: formData.title,
            summary: formData.summary,
            lifecycle: 'Archived',
            seriesId: formData.seriesId || null,
            tags: formData.tags || [],
            coverImage: formData.coverImage,
            coverAltText: formData.coverAltText,
            thumbnailImage: formData.thumbnailImage,
            thumbnailAltText: formData.thumbnailAltText,
            seoTitle: formData.seoTitle || formData.title,
            seoDescription: formData.seoDescription || formData.summary,
            canonicalUrl: formData.canonicalUrl || null,
            relatedArticleIds: formData.relatedArticleIds,
            inboundReferencingIds: draftArticle.inboundReferencingIds || [],
            createdAt: draftArticle.createdAt || now,
            updatedAt: now,
            firstPublishedAt: draftArticle.firstPublishedAt,
            publishedAt: draftArticle.publishedAt,
            archivedAt: now,
            content: formData.content
        };

        if (existingIndex !== -1) {
            archivedContent.articles[existingIndex] = archivedArticle;
        } else {
            archivedContent.articles.unshift(archivedArticle);
        }

        await this.writeJsonFile(NEW_ARCHIVE_PATH, archivedContent);

        if (draftArticle.lifecycle === 'Published') {
            await this.deletePublishedArticle(uniqueId);
        }

        await this.deleteDraftArticle(uniqueId);

        return archivedArticle;
    }

    public static async getInboundReferences(targetArticleId: string): Promise<string[]> {
        const paths = [NEW_PUBLISHED_PATH];
        for (const filePath of paths) {
            const data = await this.readJsonFile(filePath);
            const found = data.articles.find((a) => a.uniqueId === targetArticleId);
            if (found) {
                return found.inboundReferencingIds || [];
            }
        }
        return [];
    }

    public static async createEditDraft(uniqueId: string): Promise<ArticleItem> {
        const draftContent = await this.readJsonFile(NEW_DRAFT_PATH);
        const existingDraft = draftContent.articles.find(a => a.uniqueId === uniqueId);

        if (existingDraft) {
            return existingDraft;
        }

        const publishedContent = await this.readJsonFile(NEW_PUBLISHED_PATH);
        const archivedContent = await this.readJsonFile(NEW_ARCHIVE_PATH);

        const sourceArticle =
            publishedContent.articles.find(a => a.uniqueId === uniqueId) ||
            archivedContent.articles.find(a => a.uniqueId === uniqueId);

        if (!sourceArticle) {
            throw new Error(`Article with ID ${uniqueId} not found in Published or Archived source.`);
        }

        const draftCopy: ArticleItem = {
            ...sourceArticle,
            updatedAt: new Date().toISOString(),
        };

        draftContent.articles.unshift(draftCopy);
        await this.writeJsonFile(NEW_DRAFT_PATH, draftContent);

        return draftCopy;
    }

    public static async addInboundReference(targetArticleId: string, sourceArticleId: string): Promise<void> {
        const paths = [NEW_PUBLISHED_PATH];
        for (const filePath of paths) {
            const data = await this.readJsonFile(filePath);
            const index = data.articles.findIndex((a) => a.uniqueId === targetArticleId);
            if (index !== -1) {
                const article = data.articles[index];
                const currentRefs = article.inboundReferencingIds || [];
                if (!currentRefs.includes(sourceArticleId)) {
                    article.inboundReferencingIds = [...currentRefs, sourceArticleId];
                    article.updatedAt = new Date().toISOString();
                    await this.writeJsonFile(filePath, data);
                }
                return;
            }
        }
    }

    public static async removeInboundReference(targetArticleId: string, sourceArticleId: string): Promise<void> {
        const paths = [NEW_PUBLISHED_PATH];
        for (const filePath of paths) {
            const data = await this.readJsonFile(filePath);
            const index = data.articles.findIndex((a) => a.uniqueId === targetArticleId);
            if (index !== -1) {
                const article = data.articles[index];
                const currentRefs = article.inboundReferencingIds || [];
                if (currentRefs.includes(sourceArticleId)) {
                    article.inboundReferencingIds = currentRefs.filter((id) => id !== sourceArticleId);
                    article.updatedAt = new Date().toISOString();
                    await this.writeJsonFile(filePath, data);
                }
                return;
            }
        }
    }
}