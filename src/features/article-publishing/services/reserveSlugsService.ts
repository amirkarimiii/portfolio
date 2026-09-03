import { ReserveSlugsRepository } from '../repository/reserveSlugsRepository';
import {logger} from "@/shared/logger/logger";

export class ReserveSlugsService {
    public static async isReservedSlug(slug: string): Promise<boolean> {
        try {
            const reservedSlugs = await ReserveSlugsRepository.getReservedSlugs();
            const normalizedSlug = slug.trim().toLowerCase();
            return reservedSlugs.map((s) => s.toLowerCase()).includes(normalizedSlug);
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to validate reserved slug in ReserveSlugsService',
                { context: 'ReserveSlugsService.isReservedSlug' }
            );
            return false;
        }
    }

    public static async getReservedSlugs(): Promise<string[]> {
        try {
            return await ReserveSlugsRepository.getReservedSlugs();
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to get reserved slugs in ReserveSlugsService',
                { context: 'ReserveSlugsService.getReservedSlugs' }
            );
            return [];
        }
    }
}