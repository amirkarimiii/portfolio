import { z } from 'zod';

export const employmentTypeEnum = z.enum([
    'full-time',
    'part-time',
]);

export const workModeEnum = z.enum([
    'remote',
    'hybrid',
    'on-site',
]);

export const engagementTypeEnum = z.enum([
    'employment',
    'contract',
    'freelance',
    'project-based',
]);

export const externalProfileSchema = z.object({
    platform: z.string().min(1),
    url: z.url(),
});

export const assetTypeEnum = z.enum([
    'photo',
    'document',
]);

export const assetSchema = z.object({
    type: assetTypeEnum,
    url: z.url(),
});

export const personSchema = z.object({
    professionalName: z.string().min(1),
    fullName: z.string().min(1),

    profession: z.string().min(1),
    focus: z.string().optional(),

    shortIntroduction: z.string().min(1),
    professionalNarrative: z.string().min(1),

    workAvailability: z.object({
        status: z.boolean(),
        employmentType: employmentTypeEnum,
        workMode: workModeEnum,
        engagementType: engagementTypeEnum.optional(),
        explanation: z.string().optional(),
    }),

    counselingAvailability: z.object({
        status: z.boolean(),
    }),

    professionalImage: z.url(),

    assets: z.array(assetSchema),

    externalProfiles: z.array(externalProfileSchema),
});

export type Person = z.infer<typeof personSchema>;
export type Asset = z.infer<typeof assetSchema>;