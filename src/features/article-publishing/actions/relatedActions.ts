'use server';

import { ArticleRepository } from '../repository/articleRepository';

export async function getAllArticlesAction() {
    return ArticleRepository.getAllArticles();
}