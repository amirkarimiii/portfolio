'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { useUnsecureDeleteModal } from "@/features/article-publishing/stores/useUnsecureDelete";
import { useArticleFormStore } from '@/features/article-publishing/stores/useArticleFormStore';
import { publishArticleAction } from '@/features/article-publishing/actions/publishArticleAction';
import type { ArticleFormValues } from '@/features/article-publishing/schemas/articleFormSchema';

export function AddArticleDropdown() {
    const { handleSubmit, setError } = useFormContext<ArticleFormValues>();
    const [isPublishing, setIsPublishing] = React.useState(false);

    const articleId = useArticleFormStore((state) => state.articleId);
    const resetArticleId = useArticleFormStore((state) => state.resetArticleId);

    const onPublish = async (data: ArticleFormValues) => {
        setIsPublishing(true);
        try {
            const payload: ArticleFormValues = JSON.parse(JSON.stringify(data));

            const result = await publishArticleAction({
                uniqueId: articleId,
                formData: payload,
            });

            if (result.success) {
                toast.success('Article has been published successfully!');
                resetArticleId();
            } else {
                if (result.field === 'slug') {
                    setError('slug', { type: 'manual', message: result.error });
                }
                toast.error(result.error);
            }
        } catch {
            toast.error('Something unexpectedly went wrong!');
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={isPublishing}>
                    {isPublishing ? 'Publishing...' : 'Action'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-0.5">
                <DropdownMenuItem
                    onClick={handleSubmit(onPublish)}
                    className="justify-center font-semibold text-primary"
                >
                    Publish Article
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Archive")} className="justify-center">
                    Archive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Preview")} className="justify-center">
                    Preview
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