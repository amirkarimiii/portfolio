import {z} from 'zod';

export const languageLevelEnum = z.enum([
    'limited',
    'conversational',
    'professional',
    'strong',
    'fluent',
]);

export const languageCapabilitySchema = z.object({
    level: languageLevelEnum,
    evidence: z.array(z.string().min(1)).optional(),
    note: z.string().optional(),
});

export const nativeLanguageSchema = z.object({
    nationality: z.string().min(1),
    language: z.string().min(1),
});

export const languageSchema = z.object({
    name: z.string().min(1),

    native: nativeLanguageSchema.nullable(),

    reading: languageCapabilitySchema,
    writing: languageCapabilitySchema,
    listening: languageCapabilitySchema,
    speaking: languageCapabilitySchema,
});

export type Language = z.infer<typeof languageSchema>;
export type LanguageLevel = z.infer<typeof languageLevelEnum>;
export type LanguageCapability = z.infer<typeof languageCapabilitySchema>;