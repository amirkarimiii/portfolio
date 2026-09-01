import clientPromise from '@/shared/lib/mongodb';
import { logger } from '@/shared/logger/logger';

export interface TagDocument {
    name: string;
    createdAt?: string;
}

export class TagRepository {
    private static async getCollection() {
        const client = await clientPromise;
        const db = client.db();
        return db.collection<TagDocument>('tags');
    }

    public static async getAllTags(): Promise<string[]> {
        try {
            const collection = await this.getCollection();
            const docs = await collection.find({}, { projection: { _id: 0, name: 1 } }).toArray();
            return docs.map((doc) => doc.name);
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to fetch all tags',
                { context: 'TagRepository.getAllTags' }
            );
            return [];
        }
    }

    public static async createTag(newTag: string): Promise<string[]> {
        try {
            const collection = await this.getCollection();
            const trimmed = newTag.trim();
            const normalizedTag = trimmed.toLowerCase();

            const existing = await collection.findOne({
                name: { $regex: new RegExp(`^${normalizedTag}$`, 'i') },
            });

            if (!existing) {
                await collection.insertOne({
                    name: trimmed,
                    createdAt: new Date().toISOString(),
                });
            }

            return await this.getAllTags();
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to create tag',
                { context: 'TagRepository.createTag', newTag }
            );
            return await this.getAllTags();
        }
    }
}