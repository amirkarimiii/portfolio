import { useMemo } from "react";
import { Editor, useEditorState } from "@tiptap/react";
import { headingButtonInitializer } from "./headingsButtonInitializer";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/shared/components/ui/tooltip";
import {Button} from "@/shared/components/ui/button";
import {cn} from "@/shared/utils/shadcnUtils";

interface HeadingsButtonProps {
    type: "h2" | "h3" | "h4";
    editor: Editor | null;
}

export function HeadingsButton({ type, editor }: HeadingsButtonProps) {
    const BUTTONS = useMemo(() => headingButtonInitializer(editor), [editor]);
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
                        "w-max p-1.5",
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