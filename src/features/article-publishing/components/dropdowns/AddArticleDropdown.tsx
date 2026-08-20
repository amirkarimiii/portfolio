import * as React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import {Button} from "@/shared/components/ui/button";
import {useUnsecureDeleteModal} from "@/features/article-publishing/stores/useUnsecureDelete";

export function AddArticleDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Action</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-0.5">
                <DropdownMenuItem onClick={() => {
                    console.log("unique id")
                }} className="justify-center">
                    Archive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                    console.log("unique id")
                }} className="justify-center">
                    Preview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                    useUnsecureDeleteModal.getState().openModal("uniqueId");
                }} variant="destructive" className="justify-center">
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};