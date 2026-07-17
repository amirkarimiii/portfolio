import { useMemo } from "react";
import { Editor, useEditorState } from "@tiptap/react";
import { Button } from "@/components/ui/shadcn/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip";
import { headingButtonInitializer } from "./headingsButtonInitializer";

interface HeadingsButtonProps {
    type: "h2" | "h3" | "h4";
    editor: Editor | null;
}

export function HeadingsButton({ type, editor }: HeadingsButtonProps) {
    const BUTTONS = useMemo(() => headingButtonInitializer(editor), [editor]);
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