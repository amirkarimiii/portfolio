'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { useUnsecureDeleteModal } from "@/features/article-publishing/stores/useUnsecureDelete";
import { useArticleFormStore } from '@/features/article-publishing/stores/useArticleFormStore';
import type { ArticleFormValues } from '@/features/article-publishing/schemas/articleFormSchema';

export function AddArticleDropdown() {
    const { getValues } = useFormContext<ArticleFormValues>();
    const articleId = useArticleFormStore((state) => state.articleId);

    const handleOpenPreview = () => {
        if (!articleId) return;
        const seriesId = getValues('seriesId');

        const previewUrl = seriesId
            ? `/preview/series/${seriesId}/${articleId}`
            : `/preview/${articleId}`;

        window.open(previewUrl, '_blank');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    Action
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-0.5">
                <DropdownMenuItem
                    onClick={handleOpenPreview}
                    className="justify-center font-semibold text-primary"
                >
                    Preview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Archive")} className="justify-center">
                    Archive
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => useUnsecureDeleteModal.getState().openModal(articleId)}
                    variant="destructive"
                    className="justify-center"
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}