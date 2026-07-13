import {Editor} from "@tiptap/react";
import {ButtonGroup} from "@/components/ui/shadcn/button-group";
import {Button} from "@/components/ui/shadcn/button";
import {RedoIcon, UndoIcon} from "lucide-react";

function Toolbar({editor}: { editor: Editor | null }) {
    if (!editor) return null

    return (
        <ButtonGroup>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-2">
                    <div className="w-4 aspect-square">
                        <UndoIcon />
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-2">
                    <div className="w-4 aspect-square">
                        <RedoIcon />
                    </div>
                </Button>
            </ButtonGroup>
        </ButtonGroup>
    )
}

export default Toolbar;