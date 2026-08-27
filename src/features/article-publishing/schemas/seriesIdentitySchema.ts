import { z } from 'zod';
import { CLIENT_RESERVED_SLUGS } from '../utils/slugValidation';

export const seriesIdentitySchema = z.object({
    title: z
        .string()
        .min(1, 'Series title is required')
        .max(36, 'Series title cannot exceed 36 characters'),

    slug: z
        .string()
        .min(3, 'Slug must be at least 3 characters')
        .max(75, 'Slug cannot exceed 75 characters')
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            'Slug can only contain lowercase letters, numbers, and single hyphens'
        )
        .refine(
            (slug) => !CLIENT_RESERVED_SLUGS.includes(slug.toLowerCase()),
            { message: 'This slug is reserved and cannot be used' }
        ),

    description: z
        .string()
        .min(1, 'Series description is required'),
});