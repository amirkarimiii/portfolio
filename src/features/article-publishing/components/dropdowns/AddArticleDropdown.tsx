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
import { publishArticleAction } from '@/features/article-publishing/actions/publishArticleAction';
import type { ArticleFormValues } from '@/features/article-publishing/schemas/articleFormSchema';

export function AddArticleDropdown() {
    const { handleSubmit } = useFormContext<ArticleFormValues>();
    const [isPublishing, setIsPublishing] = React.useState(false);

    const onPublish = async (data: ArticleFormValues) => {
        setIsPublishing(true);
        try {
            const result = await publishArticleAction(data);
            if (result.success) {
                toast.success('article has been successfully published!');
            } else {
                toast.error(`error in publish: ${result.error}`);
            }
        } catch {
            toast.error('something went wrong');
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
                    onClick={() => useUnsecureDeleteModal.getState().openModal("uniqueId")}
                    variant="destructive"
                    className="justify-center"
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}