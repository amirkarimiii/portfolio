import { z } from 'zod';

export const projectStatusTypeEnum = z.enum([
    'planned',
    'in-development',
    'completed',
    'paused',
    'legacy',
]);

export const projectStatusSchema = z.object({
    type: projectStatusTypeEnum,
    description: z.string().min(1),
});

export const projectMediaSchema = z.object({
    darkmode: z.url(),
    lightmode: z.url(),
    description: z.string().max(50).optional(),
});

export const projectSchema = z.object({
    name: z.string().min(1),
    version: z.string().min(1),
    description: z.string().min(1),
    repository: z.url(),
    authorship: z.string().min(1),
    icon: z.url(),

    status: projectStatusSchema,

    media: z.array(projectMediaSchema),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectStatusType = z.infer<typeof projectStatusTypeEnum>;
export type ProjectStatus = z.infer<typeof projectStatusSchema>;
export type ProjectMedia = z.infer<typeof projectMediaSchema>;