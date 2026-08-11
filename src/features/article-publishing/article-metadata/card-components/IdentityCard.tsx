'use client';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    identitySchema,
    type IdentityFormValues,
} from '@/features/article-publishing/schemas/identitySchema';
import {Form} from "@/shared/components/ui/form";

const defaultValues: IdentityFormValues = {
    title: '',
    slug: '',
    summary: ''
};

export function IdentityCard() {
    const form = useForm<IdentityFormValues>({
        resolver: zodResolver(identitySchema),
        defaultValues,
        mode: 'onChange',
    });

    function onSubmit(data: IdentityFormValues) {
        console.log('Identity Form Data:', data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            </form>
        </Form>
    );
}