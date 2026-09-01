import type {ArticleFormValues} from '../schemas/articleFormSchema';
import type {ArticleCardData} from '../types/reference-card.type';
import {ArticleItem} from "@/features/article-publishing/types/article-item.type";
import clientPromise from "@/shared/lib/mongodb";
import {PaginatedArticlesResult} from "@/features/article-publishing/types/pagination.type";
import {Filter} from "mongodb";

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


    public static async getPublishedArticlesBySeriesId(seriesId: string): Promise<ArticleCardData[]> {
        try {
            const client = await clientPromise;
            const db = client.db();
            const collection = db.collection<ArticleItem>('articles');

            return await collection
                .find({
                    lifecycle: 'Published',
                    seriesId: seriesId,
                })
                .sort({firstPublishedAt: 1, publishedAt: 1, createdAt: 1})
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
                .toArray();
        } catch (error) {
            console.error('[ArticleRepository.getPublishedArticlesBySeriesId Error]:', error);
            return [];
        }
    }

    public static async getPublishedSeriesArticleBySlug(
        articleSlug: string,
        seriesId: string
    ): Promise<ArticleItem | null> {
        try {
            const client = await clientPromise;
            const db = client.db();
            const collection = db.collection<ArticleItem>('articles');

            const article = await collection.findOne(
                {
                    slug: articleSlug,
                    seriesId: seriesId,
                    lifecycle: 'Published',
                },
                {
                    projection: { _id: 0 },
                }
            );

            return article || null;
        } catch (error) {
            console.error('[ArticleRepository.getPublishedSeriesArticleBySlug Error]:', error);
            return null;
        }
    }

    public static async getArchivedArticles({
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
                lifecycle: 'Archived' as const,
            };

            const sortOrder = sort === 'oldest' ? 1 : -1;
            const skip = (page - 1) * pageSize;

            const [totalItems, docs] = await Promise.all([
                collection.countDocuments(query),
                collection
                    .find(query)
                    .sort({ archivedAt: sortOrder, updatedAt: sortOrder, createdAt: sortOrder })
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
            console.error('[ArticleRepository.getArchivedArticles Error]:', error);
            return {
                articles: [],
                totalItems: 0,
                totalPages: 1,
                currentPage: page,
                pageSize,
            };
        }
    }

    public static async getPublishedArticleById(uniqueId: string): Promise<ArticleItem | null> {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection<ArticleItem>('articles');

        const article = await collection.findOne({
            uniqueId,
            lifecycle: 'Published'
        });

        return article || null;
    }

    public static async getArchivedArticleById(articleId: string): Promise<ArticleItem | null> {
        try {
            const client = await clientPromise;
            const db = client.db();
            const collection = db.collection<ArticleItem>('articles');

            const article = await collection.findOne(
                {
                    uniqueId: articleId,
                    lifecycle: 'Archived',
                },
                {
                    projection: { _id: 0 },
                }
            );

            return article || null;
        } catch (error) {
            console.error('[ArticleRepository.getArchivedArticleById Error]:', error);
            return null;
        }
    }

    public static async getDraftArticleById(articleId: string): Promise<ArticleItem | null> {
        try {
            const client = await clientPromise;
            const db = client.db();
            const collection = db.collection<ArticleItem>('drafts');

            const article = await collection.findOne(
                { uniqueId: articleId },
                { projection: { _id: 0 } }
            );

            return article || null;
        } catch (error) {
            console.error('[ArticleRepository.getDraftArticleById Error]:', error);
            return null;
        }
    }

    public static async getDraftArticles({
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
            const collection = db.collection<ArticleItem>('drafts');

            const sortOrder = sort === 'oldest' ? 1 : -1;
            const skip = (page - 1) * pageSize;

            const [totalItems, docs] = await Promise.all([
                collection.countDocuments({}),
                collection
                    .find({})
                    .sort({ updatedAt: sortOrder, createdAt: sortOrder })
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
            console.error('[ArticleRepository.getDraftArticles Error]:', error);
            return {
                articles: [],
                totalItems: 0,
                totalPages: 1,
                currentPage: page,
                pageSize,
            };
        }
    }

    public static async saveDraftArticle(
        uniqueId: string,
        formData: Partial<ArticleFormValues>
    ): Promise<ArticleItem> {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection<ArticleItem>('drafts');
        const now = new Date().toISOString();

        const existingDraft = await collection.findOne({ uniqueId });

        const draftArticle: ArticleItem = {
            uniqueId,
            slug: formData.slug !== undefined ? formData.slug : (existingDraft?.slug || ''),
            title: formData.title !== undefined ? formData.title : (existingDraft?.title || 'Untitled Draft'),
            summary: formData.summary !== undefined ? formData.summary : (existingDraft?.summary || ''),
            lifecycle: formData.lifecycle !== undefined ? formData.lifecycle : (existingDraft?.lifecycle || null),
            seriesId: formData.seriesId !== undefined ? formData.seriesId : (existingDraft?.seriesId || null),
            tags: formData.tags !== undefined ? formData.tags : (existingDraft?.tags || []),
            coverImage: formData.coverImage !== undefined ? formData.coverImage : (existingDraft?.coverImage || ''),
            coverAltText: formData.coverAltText !== undefined ? formData.coverAltText : (existingDraft?.coverAltText || ''),
            thumbnailImage: formData.thumbnailImage !== undefined ? formData.thumbnailImage : (existingDraft?.thumbnailImage || ''),
            thumbnailAltText: formData.thumbnailAltText !== undefined ? formData.thumbnailAltText : (existingDraft?.thumbnailAltText || ''),
            seoTitle: formData.seoTitle !== undefined ? formData.seoTitle : (existingDraft?.seoTitle || formData.title || ''),
            seoDescription: formData.seoDescription !== undefined ? formData.seoDescription : (existingDraft?.seoDescription || formData.summary || ''),
            canonicalUrl: formData.canonicalUrl !== undefined ? formData.canonicalUrl : (existingDraft?.canonicalUrl || null),
            relatedArticleIds: formData.relatedArticleIds !== undefined ? formData.relatedArticleIds : (existingDraft?.relatedArticleIds || []),
            inboundReferencingIds: existingDraft?.inboundReferencingIds || [],
            createdAt: existingDraft?.createdAt || now,
            updatedAt: existingDraft ? now : null,
            firstPublishedAt: existingDraft?.firstPublishedAt || null,
            publishedAt: null,
            archivedAt: null,
            content: formData.content !== undefined ? formData.content : (existingDraft?.content || { type: 'doc', content: [] })
        };

        await collection.updateOne(
            { uniqueId },
            { $set: draftArticle },
            { upsert: true }
        );

        return draftArticle;
    }

    public static async savePublishedArticle(
        uniqueId: string,
        formData: ArticleFormValues
    ): Promise<ArticleItem> {
        const client = await clientPromise;
        const db = client.db();
        const publishedCollection = db.collection<ArticleItem>('articles');
        const draftsCollection = db.collection<ArticleItem>('drafts');
        const now = new Date().toISOString();

        const existingPublished = await publishedCollection.findOne({ uniqueId });

        const publishedArticle: ArticleItem = {
            uniqueId,
            slug: formData.slug,
            title: formData.title,
            summary: formData.summary,
            lifecycle: 'Published',
            seriesId: formData.seriesId || null,
            tags: formData.tags || [],
            coverImage: formData.coverImage,
            coverAltText: formData.coverAltText,
            thumbnailImage: formData.thumbnailImage,
            thumbnailAltText: formData.thumbnailAltText,
            seoTitle: formData.seoTitle || formData.title,
            seoDescription: formData.seoDescription || formData.summary,
            canonicalUrl: formData.canonicalUrl || null,
            relatedArticleIds: formData.relatedArticleIds || existingPublished?.relatedArticleIds || [],
            inboundReferencingIds: existingPublished?.inboundReferencingIds || [],
            createdAt: existingPublished?.createdAt || now,
            updatedAt: existingPublished ? now : null,
            firstPublishedAt: existingPublished?.firstPublishedAt || now,
            publishedAt: now,
            archivedAt: null,
            content: formData.content
        };

        await publishedCollection.updateOne(
            { uniqueId },
            { $set: publishedArticle },
            { upsert: true }
        );

        await draftsCollection.deleteOne({ uniqueId });

        return publishedArticle;
    }

    public static async archiveDraftArticle(
        uniqueId: string,
        formData: ArticleFormValues
    ): Promise<ArticleItem> {
        const client = await clientPromise;
        const db = client.db();
        const archivedCollection = db.collection<ArticleItem>('articles');
        const draftsCollection = db.collection<ArticleItem>('drafts');
        const publishedCollection = db.collection<ArticleItem>('articles');
        const now = new Date().toISOString();

        const draftArticle = await draftsCollection.findOne({ uniqueId });
        if (!draftArticle) {
            throw new Error('Draft article not found');
        }

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

        await archivedCollection.updateOne(
            { uniqueId },
            { $set: archivedArticle },
            { upsert: true }
        );

        if (draftArticle.lifecycle === 'Published') {
            await publishedCollection.deleteOne({ uniqueId });
        }

        await draftsCollection.deleteOne({ uniqueId });

        return archivedArticle;
    }

    public static async createEditDraft(uniqueId: string): Promise<ArticleItem> {
        const client = await clientPromise;
        const db = client.db();
        const draftsCollection = db.collection<ArticleItem>('drafts');
        const articlesCollection = db.collection<ArticleItem>('articles');

        const existingDraft = await draftsCollection.findOne({ uniqueId });
        if (existingDraft) {
            return existingDraft;
        }

        const sourceArticle = await articlesCollection.findOne({ uniqueId });
        if (!sourceArticle) {
            throw new Error(`Article with ID ${uniqueId} not found.`);
        }

        const draftCopy: ArticleItem = {
            ...sourceArticle,
            lifecycle: sourceArticle.lifecycle,
            updatedAt: new Date().toISOString(),
        };

        await draftsCollection.updateOne(
            { uniqueId },
            { $set: draftCopy },
            { upsert: true }
        );

        return draftCopy;
    }

    public static async getDraftArticle(uniqueId: string): Promise<ArticleItem | null> {
        try {
            const client = await clientPromise;
            const db = client.db();
            const collection = db.collection<ArticleItem>('drafts');

            const article = await collection.findOne(
                { uniqueId },
                { projection: { _id: 0 } }
            );

            return article || null;
        } catch (error) {
            console.error('[ArticleRepository.getDraftArticle Error]:', error);
            return null;
        }
    }

    public static async getAllArticles(): Promise<ArticleCardData[]> {
        try {
            const client = await clientPromise;
            const db = client.db();
            const collection = db.collection<ArticleItem>('articles');

            return await collection
                .find({})
                .sort({ publishedAt: -1, createdAt: -1 })
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
                .toArray();
        } catch (error) {
            console.error('[ArticleRepository.getAllArticles Error]:', error);
            return [];
        }
    }

    public static async addInboundReference(targetArticleId: string, sourceArticleId: string): Promise<void> {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection<ArticleItem>('articles');

        await collection.updateOne(
            { uniqueId: targetArticleId },
            {
                $addToSet: { inboundReferencingIds: sourceArticleId },
                $set: { updatedAt: new Date().toISOString() }
            }
        );
    }

    public static async removeInboundReference(targetArticleId: string, sourceArticleId: string): Promise<void> {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection<ArticleItem>('articles');

        await collection.updateOne(
            { uniqueId: targetArticleId },
            {
                $pull: { inboundReferencingIds: sourceArticleId },
                $set: { updatedAt: new Date().toISOString() }
            }
        );
    }

    public static async isSlugExists(slug: string, currentUniqueId?: string): Promise<boolean> {
        try {
            const client = await clientPromise;
            const db = client.db();

            const articlesCollection = db.collection<ArticleItem>('articles');
            const draftsCollection = db.collection<ArticleItem>('drafts');

            const normalizedSlug = slug.trim().toLowerCase();

            const query: Filter<ArticleItem> = {
                slug: { $regex: new RegExp(`^${normalizedSlug}$`, 'i') }
            };

            if (currentUniqueId) {
                query.uniqueId = { $ne: currentUniqueId };
            }

            const [existsInArticles, existsInDrafts] = await Promise.all([
                articlesCollection.findOne(query, { projection: { _id: 1 } }),
                draftsCollection.findOne(query, { projection: { _id: 1 } })
            ]);

            return Boolean(existsInArticles || existsInDrafts);
        } catch (error) {
            console.error('[ArticleRepository.isSlugExists Error]:', error);
            return false;
        }
    }

}