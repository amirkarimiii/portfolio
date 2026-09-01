'use server';

import { TagService } from '../services/tagService';
import { logger } from "@/shared/logger/logger";

export async function getTagsAction(): Promise<string[]> {
    try {
        return await TagService.getAllTags();
    } catch (error) {
        logger.error(
            error as Error,
            'Failed to fetch tags',
            { context: 'getTagsAction' }
        );
        return [];
    }
}

export async function createTagAction(newTag: string): Promise<{ success: boolean; tags: string[] }> {
    if (!newTag || !newTag.trim()) {
        logger.warn('createTagAction called with empty tag input', {
            context: 'createTagAction',
            newTag,
        });
        const currentTags = await TagService.getAllTags();
        return { success: false, tags: currentTags };
    }

    try {
        const updatedTags = await TagService.createTag(newTag);
        return { success: true, tags: updatedTags };
    } catch (error) {
        logger.error(
            error as Error,
            'Failed to create tag',
            { context: 'createTagAction', newTag }
        );
        return { success: false, tags: [] };
    }
}