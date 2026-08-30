'use server';

import { ArticleRepository } from '../repository/articleRepository';

interface EditArticleInput {
    uniqueId: string;
}

export async function editArticleAction({ uniqueId }: EditArticleInput) {
    try {
        if (!uniqueId) {
            return {
                success: false,
                error: 'Article ID is required to start editing.',
            };
        }

        const draftArticle = await ArticleRepository.createEditDraft(uniqueId);
        return { success: true, data: draftArticle };
    } catch (error) {
        console.error('Failed to prepare draft for editing:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to prepare draft for editing.',
        };
    }
}