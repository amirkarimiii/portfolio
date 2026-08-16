'use client';

import React from 'react';
import {Editor} from '@tiptap/react';
import {FilePlus, FileText, Layers} from 'lucide-react';
import {Button} from '@/shared/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {Tooltip, TooltipContent, TooltipTrigger} from "@/shared/components/ui/tooltip";
import {cn} from "@/shared/utils/shadcnUtils";

interface ReferenceButtonProps {
    editor: Editor;
}

export const ReferenceButton: React.FC<ReferenceButtonProps> = ({editor}) => {
    const handleInsertArticleReference = () => {
        editor
            .chain()
            .focus()
            .setContentReference({type: 'article', id: null})
            .run();
    };

    const handleInsertSeriesReference = () => {
        editor
            .chain()
            .focus()
            .setContentReference({type: 'series', id: null})
            .run();
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-max px-1.5",
                            )}
                        >
                            <div className="w-4 aspect-square">
                                <FilePlus/>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-40">
                        <DropdownMenuItem onClick={handleInsertArticleReference} className="cursor-pointer">
                            <div className="w-4 aspect-square">
                                <FileText/>
                            </div>
                            <span>Article Reference</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleInsertSeriesReference} className="cursor-pointer">
                            <div className="w-4 aspect-square">
                                <Layers/>
                            </div>
                            <span>Series Reference</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>Add Reference</TooltipContent>
        </Tooltip>
    );
};

export default ReferenceButton;