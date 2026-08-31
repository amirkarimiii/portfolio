import { TagRepository } from '../repository/tagRepository';

export class TagService {
    public static async getAllTags(): Promise<string[]> {
        return TagRepository.getAllTags();
    }

    public static async createTag(newTag: string): Promise<string[]> {
        if (!newTag || !newTag.trim()) {
            return TagRepository.getAllTags();
        }
        return TagRepository.createTag(newTag.trim());
    }
}