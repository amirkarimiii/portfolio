import { useMemo } from "react";
import { Editor, useEditorState } from "@tiptap/react";
import { Button } from "@/components/ui/shadcn/button";
import { historyButtonInitializer } from "./historyButtonInitializer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip";

interface HistoryButtonProps {
    type: "undo" | "redo";
    editor: Editor | null;
}

export function HistoryButton({ type, editor }: HistoryButtonProps) {
    const BUTTONS = useMemo(() => historyButtonInitializer(editor), [editor]);
    const { icon: Icon, command, hint, canExecute } = BUTTONS[type];

    const isEnabled = useEditorState({
        editor,
        selector: (ctx) => canExecute(ctx),
    });

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-max px-1.5"
                    disabled={!isEnabled}
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