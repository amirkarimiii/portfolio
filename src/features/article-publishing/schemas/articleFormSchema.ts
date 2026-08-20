import { z } from 'zod';
import { identitySchema } from './identitySchema';
import { assetsSchema } from './assetsSchema';
import { classificationSchema } from './classificationSchema';
import { seoSchema } from './seoSchema';
import {TiptapDocumentSchema} from "@/features/article-publishing/schemas/tiptapDocumentSchema";

export const articleFormSchema = z.object({
    ...identitySchema.shape,
    ...assetsSchema.shape,
    ...classificationSchema.shape,
    ...seoSchema.shape,
    content: TiptapDocumentSchema
});

export type ArticleFormValues = z.infer<typeof articleFormSchema>;