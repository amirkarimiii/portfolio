import type {TipTapDocument} from "@/features/article-publishing/types/node-renderers.type";

export interface StackEntry {
    uniqueId: string,
    name: string,
    shortDescription: string,
    content: TipTapDocument | [],
    categoryId: string,
    subcategoryId: string | null,
    createdAt: string
}