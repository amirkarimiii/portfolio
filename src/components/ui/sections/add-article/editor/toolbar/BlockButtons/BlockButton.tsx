import { useMemo } from "react";
import { Editor, useEditorState } from "@tiptap/react";
import { Button } from "@/components/ui/shadcn/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip";
import {blockButtonInitializer} from "./blockButtonInitializer";

interface HeadingsButtonProps {
    type: "quote" | "code" | "paragraph";
    editor: Editor | null;
}

export function BlockButton({ type, editor }: HeadingsButtonProps) {
    const BUTTONS = useMemo(() => blockButtonInitializer(editor), [editor]);
    const { icon: Icon, command, hint, canExecute, paddingX } = BUTTONS[type];

    const isEnabled = useEditorState({
        editor,
        selector: (ctx) => canExecute(ctx),
    });

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    className={`w-max ${paddingX}`}
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