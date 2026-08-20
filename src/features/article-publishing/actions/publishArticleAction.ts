'use server';

import type { ArticleFormValues } from '../schemas/articleFormSchema';
import {ArticleRepository} from "@/features/article-publishing/repository/articleRepository";

export async function publishArticleAction(formData: ArticleFormValues) {
    try {
        const newArticle = await ArticleRepository.savePublishedArticle(formData);
        return { success: true, data: newArticle };
    } catch (error) {
        console.error('Failed to publish article:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}