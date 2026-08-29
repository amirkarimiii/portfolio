'use client';

import * as React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import {Button} from "@/shared/components/ui/button";
import {useUnsecureDeleteModal} from "@/features/article-publishing/stores/useUnsecureDelete";
import {Settings} from "lucide-react";

interface AddArticleDropdownProps {
    uniqueId: string;
    fromPage?: boolean;
}

export function DraftedDropdown({
                                    uniqueId,
                                    fromPage = false
                                }: AddArticleDropdownProps) {

    const handleOpenPreview = () => {
        if (!uniqueId) return;
        const previewUrl = `/preview/${uniqueId}`;

        window.open(previewUrl, '_blank');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className={`${!fromPage && "w-max h-max rounded-md p-1 cursor-pointer"}`}>
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
                    className="justify-center font-semibold text-primary"
                >
                    Preview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Archive")} className="justify-center">
                    Archive
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => useUnsecureDeleteModal.getState().openModal(uniqueId)}
                    variant="destructive"
                    className="justify-center"
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}