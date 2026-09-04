import {TiptapDocument} from "@/features/article-publishing/schemas/tiptapDocumentSchema";

export interface StackEntry {
    _id: string,
    name: string,
    shortDescription: string,
    content: TiptapDocument,
    categoryId: string,
    subcategoryId: string | null,
    createdAt: Date
}