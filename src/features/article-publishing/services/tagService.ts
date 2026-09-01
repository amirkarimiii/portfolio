import { TagRepository } from '../repository/tagRepository';
import { logger } from '@/shared/logger/logger';

export class TagService {
    public static async getAllTags(): Promise<string[]> {
        try {
            return await TagRepository.getAllTags();
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to fetch all tags in TagService',
                { context: 'TagService.getAllTags' }
            );
            return [];
        }
    }

    public static async createTag(newTag: string): Promise<string[]> {
        if (!newTag || !newTag.trim()) {
            logger.warn('Skipping tag creation due to empty input', {
                context: 'TagService.createTag',
                newTag,
            });
            return TagRepository.getAllTags();
        }

        try {
            return await TagRepository.createTag(newTag.trim());
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to create tag in TagService',
                { context: 'TagService.createTag', newTag }
            );
            return await TagRepository.getAllTags();
        }
    }
}