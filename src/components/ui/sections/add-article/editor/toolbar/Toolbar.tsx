import {Editor} from "@tiptap/react";
import {ButtonGroup, ButtonGroupSeparator} from "@/components/ui/shadcn/button-group";
import {Button} from "@/components/ui/shadcn/button";
import {
    BoldIcon,
    ChevronDownIcon,
    ItalicIcon,
    RedoIcon,
    StrikethroughIcon,
    UnderlineIcon,
    UndoIcon
} from "lucide-react";

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
            <ButtonGroupSeparator/>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-2">
                    <div className="w-5 aspect-square">
                        <BoldIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-2">
                    <div className="w-5 aspect-square">
                        <ItalicIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-2">
                    <div className="w-5 aspect-square">
                        <UnderlineIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-2">
                    <div className="w-5 aspect-square">
                        <StrikethroughIcon/>
                    </div>
                </Button>
            </ButtonGroup>
        </ButtonGroup>
    )
}

export default Toolbar;