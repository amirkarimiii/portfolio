import {Editor} from "@tiptap/react";
import {ButtonGroup, ButtonGroupSeparator} from "@/components/ui/shadcn/button-group";
import {Button} from "@/components/ui/shadcn/button";
import {ChevronDownIcon, RedoIcon, UndoIcon} from "lucide-react";

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
            <ButtonGroupSeparator/>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-2">
                    Paragraph
                </Button>
                <Button variant="ghost" className="w-max px-2">
                    <div className="w-3 aspect-square">
                        <ChevronDownIcon/>
                    </div>
                </Button>
            </ButtonGroup>
        </ButtonGroup>
    )
}

export default Toolbar;