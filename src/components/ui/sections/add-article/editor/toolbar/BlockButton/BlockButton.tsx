import { useMemo } from "react";
import { Editor, useEditorState } from "@tiptap/react";
import { Button } from "@/components/ui/shadcn/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip";
import {blockButtonInitializer} from "./blockButtonInitializer";

interface HeadingsButtonProps {
    type: "quote" | "code";
    editor: Editor | null;
}

export function BlockButton({ type, editor }: HeadingsButtonProps) {
    const BUTTONS = useMemo(() => blockButtonInitializer(editor), [editor]);
    const { icon: Icon, command, hint, notActive } = BUTTONS[type];

    const notActiveButton = useEditorState({
        editor,
        selector: (ctx) => notActive(ctx),
    });

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={notActiveButton ? "ghost" : "default"}
                    className="w-max p-1.5"
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