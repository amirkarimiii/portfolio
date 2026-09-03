import clientPromise from '@/shared/lib/mongodb';
import { ReserveSlugsType } from '../types/reserve-slugs.type';
import {logger} from "@/shared/logger/logger";

export class ReserveSlugsRepository {
    public static async getReservedSlugs(): Promise<string[]> {
        try {
            const client = await clientPromise;
            const db = client.db();
            const collection = db.collection<ReserveSlugsType>('reserveSlugs');

            const document = await collection.findOne({});
            return document?.slugs || [];
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to fetch reserved slugs from database',
                { context: 'ReserveSlugsRepository.getReservedSlugs' }
            );
            return [];
        }
    }
}