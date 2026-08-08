import { useMemo } from "react";
import {Editor, useEditorState} from "@tiptap/react";
import { Button } from "@/components/ui/shadcn/button";
import { listButtonInitializer } from "./listButtonInitializer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip";

interface ListButtonProps {
    type: "bullet" | "ordered";
    editor: Editor | null;
}

export function ListButton({ type, editor }: ListButtonProps) {
    const BUTTONS = useMemo(() => listButtonInitializer(editor), [editor]);
    const { icon: Icon, command, hint, isActive, canRun } = BUTTONS[type];

    const state = useEditorState({
        editor,
        selector: (ctx) => ({
            active: isActive(ctx),
            canRun: canRun(ctx),
        }),
    });

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={state?.active ? "default" : "ghost"}
                    disabled={!state?.canRun}
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