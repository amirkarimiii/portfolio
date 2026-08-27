'use server';

import type { ArticleFormValues } from '../schemas/articleFormSchema';
import { ArticleRepository } from "@/features/article-publishing/repository/articleRepository";
import {isReservedSlug} from "@/features/article-publishing/utils/slugValidation";

interface PublishArticleInput {
    uniqueId: string;
    formData: ArticleFormValues;
}

export async function publishArticleAction({ uniqueId, formData }: PublishArticleInput) {
    try {
        if (!uniqueId) {
            return {
                success: false,
                error: 'Article ID is required for publishing',
            };
        }

        const slugExists = await ArticleRepository.isSlugExists(formData.slug, uniqueId);
        if (slugExists) {
            return {
                success: false,
                error: 'this slug already exists',
                field: 'slug',
            };
        }

        if (formData.slug && isReservedSlug(formData.slug)) {
            return {
                success: false,
                field: 'slug',
                error: 'This slug is reserved and cannot be used.',
            };
        }

        const newArticle = await ArticleRepository.savePublishedArticle(uniqueId, formData);
        return { success: true, data: newArticle };
    } catch (error) {
        console.error('Failed to publish article:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'something went wrong',
        };
    }
}