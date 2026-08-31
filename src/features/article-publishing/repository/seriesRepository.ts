import { ulid } from 'ulid';
import type { SeriesFormValues } from '../schemas/seriesFormSchema';
import { SeriesItem } from '@/features/article-publishing/types/series-item.type';
import { SeriesCardData } from '@/features/article-publishing/types/reference-card.type';
import { PaginatedSeriesResult } from '@/features/article-publishing/types/pagination.type';
import clientPromise from '@/shared/lib/mongodb';
import { OptionalId } from "mongodb";

export class SeriesRepository {
    private static async getCollection() {
        const client = await clientPromise;
        const db = client.db();
        return db.collection<OptionalId<SeriesItem>>('series');
    }

    public static async getPaginatedSeries({
                                               page = 1,
                                               pageSize = 20,
                                           }: {
        page?: number;
        pageSize?: number;
    }): Promise<PaginatedSeriesResult> {
        try {
            const collection = await this.getCollection();
            const skip = (page - 1) * pageSize;

            const [totalItems, docs] = await Promise.all([
                collection.countDocuments({}),
                collection
                    .find({})
                    .sort({ updatedAt: -1, createdAt: -1 })
                    .skip(skip)
                    .limit(pageSize)
                    .project<SeriesCardData>({
                        _id: 0,
                        uniqueId: 1,
                        slug: 1,
                        title: 1,
                        description: 1,
                        thumbnailImage: 1,
                        thumbnailAltText: 1,
                        updatedAt: 1,
                    })
                    .toArray(),
            ]);

            const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

            return {
                series: docs,
                totalItems,
                totalPages,
                currentPage: page,
                pageSize,
            };
        } catch (error) {
            console.error('[SeriesRepository.getPaginatedSeries Error]:', error);
            return {
                series: [],
                totalItems: 0,
                totalPages: 1,
                currentPage: page,
                pageSize,
            };
        }
    }

    public static async getSeriesBySlug(slug: string): Promise<SeriesItem | null> {
        try {
            const collection = await this.getCollection();
            const normalizedSlug = slug.trim().toLowerCase();
            const series = await collection.findOne(
                { slug: normalizedSlug },
                { projection: { _id: 0 } }
            );

            return series || null;
        } catch (error) {
            console.error('[SeriesRepository.getSeriesBySlug Error]:', error);
            return null;
        }
    }

    public static async getSeriesById(seriesId: string): Promise<SeriesItem | null> {
        try {
            const collection = await this.getCollection();
            const series = await collection.findOne(
                { uniqueId: seriesId },
                { projection: { _id: 0 } }
            );

            return series || null;
        } catch (error) {
            console.error('[SeriesRepository.getSeriesById Error]:', error);
            return null;
        }
    }

    public static async isSlugExists(slug: string): Promise<boolean> {
        try {
            const collection = await this.getCollection();
            const normalizedSlug = slug.trim().toLowerCase();
            const count = await collection.countDocuments({ slug: normalizedSlug }, { limit: 1 });
            return count > 0;
        } catch (error) {
            console.error('[SeriesRepository.isSlugExists Error]:', error);
            return false;
        }
    }

    public static async saveSeries(formData: SeriesFormValues): Promise<SeriesItem> {
        const collection = await this.getCollection();
        const now = new Date().toISOString();
        const uniqueId = `ser_${ulid()}`;

        const newSeries: SeriesItem = {
            uniqueId,
            slug: formData.slug.trim().toLowerCase(),
            title: formData.title.trim(),
            description: formData.description.trim(),
            defaultTags: formData.defaultTags || [],
            coverImage: formData.coverImage,
            coverAltText: formData.coverAltText,
            thumbnailImage: formData.thumbnailImage,
            thumbnailAltText: formData.thumbnailAltText || '',
            seoTitle: formData.seoTitle || formData.title,
            seoDescription: formData.seoDescription || formData.description,
            canonicalUrl: formData.canonicalUrl || null,
            inboundReferencingIds: [],
            createdAt: now,
            updatedAt: now,
        };

        await collection.insertOne(newSeries);

        return newSeries;
    }

    public static async getInboundReferences(targetSeriesId: string): Promise<string[]> {
        try {
            const series = await this.getSeriesById(targetSeriesId);
            return series?.inboundReferencingIds || [];
        } catch (error) {
            console.error('[SeriesRepository.getInboundReferences Error]:', error);
            return [];
        }
    }

    public static async addInboundReference(targetSeriesId: string, sourceArticleId: string): Promise<void> {
        try {
            const collection = await this.getCollection();
            await collection.updateOne(
                { uniqueId: targetSeriesId },
                {
                    $addToSet: { inboundReferencingIds: sourceArticleId },
                    $set: { updatedAt: new Date().toISOString() },
                }
            );
        } catch (error) {
            console.error('[SeriesRepository.addInboundReference Error]:', error);
        }
    }

    public static async removeInboundReference(targetSeriesId: string, sourceArticleId: string): Promise<void> {
        try {
            const collection = await this.getCollection();
            await collection.updateOne(
                { uniqueId: targetSeriesId },
                {
                    $pull: { inboundReferencingIds: sourceArticleId },
                    $set: { updatedAt: new Date().toISOString() },
                }
            );
        } catch (error) {
            console.error('[SeriesRepository.removeInboundReference Error]:', error);
        }
    }
}