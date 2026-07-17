import {Editor} from "@tiptap/react";
import {Button} from "@/components/ui/shadcn/button";
import {HISTORY} from "./history";

interface HistoryButtonProps {
    type: "undo" | "redo";
    editor: Editor | null
}

export function HistoryButton({type, editor}: HistoryButtonProps) {

    const { icon: Icon, command } = HISTORY[type];

    return (
        <Button
            variant="ghost"
            className="w-max px-1.5"
            onClick={() => command(editor)}
        >
            <div className="w-4 aspect-square">
                <Icon />
            </div>
        </Button>
    );
}