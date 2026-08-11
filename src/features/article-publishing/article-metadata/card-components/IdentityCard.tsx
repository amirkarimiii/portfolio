import { z } from 'zod';

const RESERVED_SLUGS = ['admin', 'api', 'drafts', 'archive', 'preview'] as const;

export const identitySchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required'),

    slug: z
        .string()
        .min(3, 'Slug must be at least 3 characters')
        .max(75, 'Slug cannot exceed 75 characters')
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            'Slug can only contain lowercase letters, numbers, and single hyphens'
        )
        .refine(
            (slug) => !RESERVED_SLUGS.includes(slug.toLowerCase() as typeof RESERVED_SLUGS[number]),
            { message: 'This slug is reserved and cannot be used' }
        ),

    summary: z
        .string()
        .optional(),

    seoTitle: z
        .string()
        .max(60, 'SEO title should not exceed 60 characters')
        .optional(),

    seoDescription: z
        .string()
        .max(160, 'SEO description should not exceed 160 characters')
        .optional(),

    canonicalUrl: z
        .url('Invalid Canonical URL')
        .or(z.literal(''))
        .optional(),
});

export type IdentityFormValues = z.infer<typeof identitySchema>;

export function IdentityCard() {
    return (
        <>
        </>
    );
}