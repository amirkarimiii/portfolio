import { z } from 'zod';

export const TiptapDocumentSchema = z.object({
    type: z.literal('doc'),
    content: z.array(z.record(z.string(), z.unknown())).min(1, 'article content can not be empty!'),
});

export type TiptapDocument = z.infer<typeof TiptapDocumentSchema>;