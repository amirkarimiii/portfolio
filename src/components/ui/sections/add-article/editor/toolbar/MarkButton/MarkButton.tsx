import { useMemo } from "react";
import { Editor, useEditorState } from "@tiptap/react";
import { Button } from "@/components/ui/shadcn/button";
import { markButtonInitializer } from "./markButtonInitializer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip";
import {cn} from "@/lib/utils/shadcnUtils";

interface MarkButtonProps {
    type: "bold" | "italic" |
        "strikethrough" | "underline" |
        "highlight" | "inlineCode";

    editor: Editor | null;
}

export function MarkButton({ type, editor }: MarkButtonProps) {
    const BUTTONS = useMemo(() => markButtonInitializer(editor), [editor]);
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
                    variant="ghost"
                    className={cn(
                        "w-max px-1.5",
                        state?.active && "bg-accent text-accent-foreground"
                    )}
                    disabled={!state?.canRun}
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