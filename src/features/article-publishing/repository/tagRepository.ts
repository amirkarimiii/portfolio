import fs from 'fs/promises';
import path from 'path';

const TAGS_FILE_PATH = path.join(process.cwd(), 'src/mock-files/tags.json');

interface TagsData {
    tags: string[];
}

export const tagRepository = {
    async getAllTags(): Promise<string[]> {
        const fileData = await fs.readFile(TAGS_FILE_PATH, 'utf-8');
        const parsed: TagsData = JSON.parse(fileData);
        return parsed.tags;
    },

    async createTag(newTag: string): Promise<string[]> {
        const trimmed = newTag.trim();
        const currentTags = await this.getAllTags();

        const exists = currentTags.some((t) => t.toLowerCase() === trimmed.toLowerCase());
        if (exists) {
            return currentTags;
        }

        const updatedTags = [...currentTags, trimmed];
        await fs.writeFile(TAGS_FILE_PATH, JSON.stringify({ tags: updatedTags }, null, 2), 'utf-8');
        return updatedTags;
    }
};