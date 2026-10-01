import { z } from 'zod';

export const contactMethodTypeEnum = z.enum([
    'email',
    'booking',
    'telegram',
    'whatsapp',
]);

export const contactMethodSchema = z.object({
    type: contactMethodTypeEnum,
    value: z.url(),
});

export const contactSchema = z.object({
    methods: z.array(contactMethodSchema),
});

export type Contact = z.infer<typeof contactSchema>;
export type ContactMethod = z.infer<typeof contactMethodSchema>;
