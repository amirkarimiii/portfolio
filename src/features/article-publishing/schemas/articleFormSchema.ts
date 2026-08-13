import { z } from 'zod';
import { identitySchema } from './identitySchema';
import { assetsSchema } from './assetsSchema';
import { classificationSchema } from './classificationSchema';
import { seoSchema } from './seoSchema';

export const articleFormSchema = z.object({
    ...identitySchema.shape,
    ...assetsSchema.shape,
    ...classificationSchema.shape,
    ...seoSchema.shape,
    content: z
        .string()
        .refine(
            (html) => {
                const strippedContent = html
                    .replace(/<[^>]*>/g, '')
                    .replace(/&nbsp;/g, ' ')
                    .trim();

                return strippedContent.length > 0;
            },
            {
                message: 'Article content cannot be empty',
            }
        ),
});

export type ArticleFormValues = z.infer<typeof articleFormSchema>;