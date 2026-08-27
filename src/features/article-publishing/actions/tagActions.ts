'use server';

import { tagRepository } from '../repository/tagRepository';

export async function getTagsAction(): Promise<string[]> {
    try {
        return await tagRepository.getAllTags();
    } catch (error) {
        console.error('Failed to fetch tags:', error);
        return [];
    }
}

export async function createTagAction(newTag: string): Promise<{ success: boolean; tags: string[] }> {
    try {
        const updatedTags = await tagRepository.createTag(newTag);
        return { success: true, tags: updatedTags };
    } catch (error) {
        console.error('Failed to create tag:', error);
        return { success: false, tags: [] };
    }
}