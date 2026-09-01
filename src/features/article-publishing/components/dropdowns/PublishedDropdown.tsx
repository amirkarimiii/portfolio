'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { Settings, Loader2 } from "lucide-react";
import {editArticleAction} from "@/features/article-publishing/actions/articleAction";
import {notify} from "@/shared/notification/notification.service";

type Props = {
    uniqueId: string;
};

export function PublishedDropdown({ uniqueId }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleEdit = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isLoading) return;

        setIsLoading(true);
        try {
            const result = await editArticleAction({ uniqueId });
            if (result.success) {
                router.push(`/admin/edit-article/${uniqueId}`);
            } else {
                notify.error(result.error.message || "ARTICLE_EDIT_PREPARATION_FAILED");
            }
        } catch (err) {
            console.error(err);
            notify.error("ARTICLE_EDIT_MODE_FAILED");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="w-max h-max rounded-md p-1 cursor-pointer self-end"
                    data-no-card-navigate
                    disabled={isLoading}
                >
                    <div className="w-4 aspect-square flex items-center justify-center">
                        {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Settings />}
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-0.5">
                <DropdownMenuItem onClick={handleEdit} className="justify-center cursor-pointer">
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    console.log("archive action");
                }} className="justify-center cursor-pointer">
                    Archive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    console.log("safe delete action");
                }} variant="destructive" className="justify-center cursor-pointer">
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}