'use server';

import { TagService } from '../services/tagService';

export async function getTagsAction(): Promise<string[]> {
    try {
        return await TagService.getAllTags();
    } catch (error) {
        console.error('Failed to fetch tags:', error);
        return [];
    }
}

export async function createTagAction(newTag: string): Promise<{ success: boolean; tags: string[] }> {
    try {
        const updatedTags = await TagService.createTag(newTag);
        return { success: true, tags: updatedTags };
    } catch (error) {
        console.error('Failed to create tag:', error);
        return { success: false, tags: [] };
    }
}