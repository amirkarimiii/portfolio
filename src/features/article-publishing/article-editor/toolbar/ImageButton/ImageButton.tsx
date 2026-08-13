'use client';

import { Editor } from "@tiptap/react";
import { ImagePlus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useImageButton } from "./useImageButton";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/shared/components/ui/tooltip";

interface ImageButtonProps {
    editor: Editor | null;
}

export function ImageButton({ editor }: ImageButtonProps) {
    const { addImageBlock, canRun } = useImageButton(editor);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-max px-1.5"
                    onClick={addImageBlock}
                    disabled={!canRun}
                >
                    <div className="w-4 aspect-square">
                        <ImagePlus/>
                    </div>
                </Button>
            </TooltipTrigger>
            <TooltipContent>add image</TooltipContent>
        </Tooltip>
    )
}