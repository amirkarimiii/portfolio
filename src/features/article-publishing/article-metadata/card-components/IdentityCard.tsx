'use client';

import { BaseIdentityForm } from '@/features/article-publishing/components/article-form/BaseIdentityForm';

export function IdentityCard() {
    return (
        <BaseIdentityForm
            titleFieldName="title"
            slugFieldName="slug"
            descriptionFieldName="summary"
            descriptionPlaceholder="Click to add article summary..."
        />
    );
}