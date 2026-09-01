'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { useUnsecureDeleteModal } from "@/features/article-publishing/stores/useUnsecureDelete";
import { Settings } from "lucide-react";
import {archiveDraftArticleAction} from "@/features/article-publishing/actions/articleAction";
import {notify} from "@/shared/notification/notification.service";

interface AddArticleDropdownProps {
    uniqueId: string;
    fromPage?: boolean;
}

export function DraftedDropdown({
                                    uniqueId,
                                    fromPage = false
                                }: AddArticleDropdownProps) {
    const [isArchiving, startTransition] = React.useTransition();
    const router = useRouter();

    const handleOpenPreview = () => {
        if (!uniqueId) return;
        const previewUrl = `/preview/${uniqueId}`;

        window.open(previewUrl, '_blank');
    };

    const handleArchive = () => {
        if (!uniqueId || isArchiving) return;

        startTransition(async () => {
            try {
                const result = await archiveDraftArticleAction({ uniqueId });

                if (result.success) {
                    notify.success("ARTICLE_ARCHIVED");
                    router.refresh();
                } else {
                    notify.error(result.error.message || "ARTICLE_ARCHIVE_FAILED");
                }
            } catch {
                notify.error("ARTICLE_ARCHIVE_FAILED");
            }
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    disabled={isArchiving}
                    className={`${!fromPage && "w-max h-max rounded-md p-1 cursor-pointer"}`}
                >
                    {fromPage ?
                        "Action" :
                        <div className="w-4 aspect-square">
                            <Settings/>
                        </div>
                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-0.5">
                <DropdownMenuItem
                    onClick={handleOpenPreview}
                    className="justify-center font-semibold text-primary cursor-pointer"
                >
                    Preview
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleArchive}
                    disabled={isArchiving}
                    className="justify-center cursor-pointer"
                >
                    {isArchiving ? 'Archiving...' : 'Archive'}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => useUnsecureDeleteModal.getState().openModal(uniqueId)}
                    variant="destructive"
                    className="justify-center cursor-pointer"
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}