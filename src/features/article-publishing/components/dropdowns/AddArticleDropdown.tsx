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
import { saveDraftAction } from '@/features/article-publishing/actions/saveDraftAction';
import type { ArticleFormValues } from '@/features/article-publishing/schemas/articleFormSchema';
import {useDraftSyncStore} from "@/features/article-publishing/stores/useDraftSyncStore";

export function AddArticleDropdown() {
    const { handleSubmit, setError, getValues } = useFormContext<ArticleFormValues>();
    const [isPending, setIsPending] = React.useState(false);

    const articleId = useArticleFormStore((state) => state.articleId);
    const resetArticleId = useArticleFormStore((state) => state.resetArticleId);
    const setDraftStatus = useDraftSyncStore((state) => state.setStatus);

    const onSaveDraft = async () => {
        setIsPending(true);
        setDraftStatus('pending');
        try {
            const currentData = getValues();
            const payload: Partial<ArticleFormValues> = JSON.parse(JSON.stringify(currentData));

            const result = await saveDraftAction({
                uniqueId: articleId,
                formData: payload,
            });

            if (result.success) {
                toast.success('Draft saved successfully!');
                setDraftStatus('success');
            } else {
                toast.error(result.error || 'Failed to save draft');
                setDraftStatus('failed');
            }
        } catch {
            toast.error('Something unexpectedly went wrong while saving draft!');
            setDraftStatus('failed');
        } finally {
            setIsPending(false);
        }
    };
    
    const onPublish = async (data: ArticleFormValues) => {
        setIsPending(true);
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
            setIsPending(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={isPending}>
                    {isPending ? 'Processing...' : 'Action'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-0.5">
                <DropdownMenuItem
                    onClick={handleSubmit(onPublish)}
                    className="justify-center font-semibold text-primary"
                >
                    Publish Article
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={onSaveDraft}
                    className="justify-center"
                >
                    Save Draft
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