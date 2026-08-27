import { create } from 'zustand';
import { ulid } from 'ulid';

interface ArticleFormState {
    articleId: string;
    resetArticleId: () => string;
    setArticleId: (id: string) => void;
}

const generateArticleId = () => `art_${ulid()}`;

export const useArticleFormStore = create<ArticleFormState>((set) => ({
    articleId: generateArticleId(),

    resetArticleId: () => {
        const newId = generateArticleId();
        set({ articleId: newId });
        return newId;
    },

    setArticleId: (id: string) => set({ articleId: id }),
}));