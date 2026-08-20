'use server';

import type { ArticleFormValues } from '../schemas/articleFormSchema';
import {ArticleRepository} from "@/features/article-publishing/repository/articleRepository";

export async function publishArticleAction(formData: ArticleFormValues) {
    try {
        const slugExists = await ArticleRepository.isSlugExists(formData.slug);
        if (slugExists) {
            return {
                success: false,
                error: 'this slug already exists',
                field: 'slug',
            };
        }
        const newArticle = await ArticleRepository.savePublishedArticle(formData);
        return { success: true, data: newArticle };
    } catch (error) {
        console.error('Failed to publish article:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'something went wrong',
        };
    }
}