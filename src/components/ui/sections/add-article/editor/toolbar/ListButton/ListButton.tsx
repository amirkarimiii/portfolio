import { useMemo } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/shadcn/button";
import { listButtonInitializer } from "./listButtonInitializer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip";

interface HistoryButtonProps {
    type: "bullet" | "ordered";
    editor: Editor | null;
}

export function ListButton({ type, editor }: HistoryButtonProps) {
    const BUTTONS = useMemo(() => listButtonInitializer(editor), [editor]);
    const { icon: Icon, command, hint } = BUTTONS[type];

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-max px-1.5"
                    onClick={command}
                >
                    <div className="w-4 aspect-square">
                        <Icon />
                    </div>
                </Button>
            </TooltipTrigger>
            <TooltipContent>{hint}</TooltipContent>
        </Tooltip>
    );
}