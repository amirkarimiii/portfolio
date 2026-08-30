'use server';

import {ArticleRepository} from '../repository/articleRepository';
import type {ArticleItem} from '../types/article-item.type';

export async function getDraftArticleAction(uniqueId: string): Promise<ArticleItem | null> {
    return await ArticleRepository.getDraftArticle(uniqueId);
}