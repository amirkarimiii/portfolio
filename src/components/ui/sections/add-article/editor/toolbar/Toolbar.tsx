import {Editor} from "@tiptap/react";
import {ButtonGroup, ButtonGroupSeparator} from "@/components/ui/shadcn/button-group";
import {Button} from "@/components/ui/shadcn/button";

import {
    BoldIcon,
    CodeIcon, Eraser, FileCodeCorner, Heading2Icon, Heading3Icon,
    Heading4Icon, HighlighterIcon, ImagePlus, ItalicIcon,
    LinkIcon, List, ListOrdered, QuoteIcon, RedoIcon,
    StrikethroughIcon, UnderlineIcon, UndoIcon
} from "lucide-react";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/shadcn/popover";
import {Textarea} from "@/components/ui/shadcn/textarea";
import {useState} from "react";
import {toast} from "sonner";
import {XCorpIcon, YouTubeIcon} from "@/components/ui/sections/add-article/editor/toolbar/icons";
import {HistoryButton} from "@/components/ui/sections/add-article/editor/toolbar/HistoryButton/HistoryButton";

function Toolbar({editor}: { editor: Editor | null }) {

    const [open, setOpen] = useState(false);
    const [link, setLink] = useState("");

    if (!editor) return null

    const handleDone = () => {
        let value = link.trim();

        if (value.startsWith("http://")) {
            toast.warning("This link is not secure (http). Please use https", {position: "top-center"})
            return;
        }

        if (!/^https?:\/\//i.test(value)) {
            value = "https://" + value;
        }

        const isValidUrl = (() => {
            try {
                const url = new URL(value);
                const domainPattern = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
                return domainPattern.test(url.hostname);
            } catch {
                return false;
            }
        })();

        if (!isValidUrl) {
            toast.error("The input must be a valid URL", {position: "top-center"});
            return;
        }
        editor?.chain().focus().toggleLink({
            href: value,
        }).run();
        setLink("");
        setOpen(false);
    };

    return (
        <ButtonGroup>
            <ButtonGroup>
                <HistoryButton type={"undo"} editor={editor}/>
                <HistoryButton type={"redo"} editor={editor}/>
            </ButtonGroup>
            <ButtonGroupSeparator/>
            <ButtonGroup>
                <ButtonGroup>
                    <Button variant="ghost" className="w-max px-1.5">
                        <div className="w-4 aspect-square">
                            <Heading2Icon/>
                        </div>
                    </Button>
                    <Button variant="ghost" className="w-max px-1.5">
                        <div className="w-4 aspect-square">
                            <Heading3Icon/>
                        </div>
                    </Button>
                    <Button variant="ghost" className="w-max px-1.5">
                        <div className="w-4 aspect-square">
                            <Heading4Icon/>
                        </div>
                    </Button>
                </ButtonGroup>
                <ButtonGroupSeparator/>
                <ButtonGroup>
                    <Button variant="ghost" className="w-max px-1.5">
                        <div className="w-4 aspect-square">
                            <QuoteIcon/>
                        </div>
                    </Button>
                    <Button variant="ghost" className="w-max px-1.5">
                        <div className="w-4 aspect-square">
                            <FileCodeCorner/>
                        </div>
                    </Button>
                </ButtonGroup>
            </ButtonGroup>
            <ButtonGroupSeparator/>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-1.5">
                    <div className="w-4 aspect-square">
                        <List/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1.5">
                    <div className="w-4 aspect-square">
                        <ListOrdered/>
                    </div>
                </Button>
            </ButtonGroup>
            <ButtonGroupSeparator/>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-1.5"
                        onClick={() => editor?.chain().focus().toggleBold().run()}>
                    <div className="w-4 aspect-square">
                        <BoldIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1.5"
                        onClick={() => editor?.chain().focus().toggleItalic().run()}>
                    <div className="w-4 aspect-square">
                        <ItalicIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1.5"
                        onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                    <div className="w-4 aspect-square">
                        <UnderlineIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1.5"
                        onClick={() => editor?.chain().focus().toggleStrike().run()}>
                    <div className="w-4 aspect-square">
                        <StrikethroughIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1.5"
                        onClick={() => editor?.chain().focus().toggleCode().run()}>
                    <div className="w-4 aspect-square">
                        <CodeIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1.5">
                    <div className="w-4 aspect-square">
                        <HighlighterIcon/>
                    </div>
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-2"
                        onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                    <div className="w-4 aspect-square">
                        <Eraser/>
                    </div>
                </Button>
            </ButtonGroup>
            <ButtonGroupSeparator/>
            <Popover open={open} onOpenChange={setOpen}>
                <ButtonGroup>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-max px-2">
                            <div className="w-4 aspect-square">
                                <LinkIcon/>
                            </div>
                        </Button>
                    </PopoverTrigger>
                </ButtonGroup>
                <PopoverContent className="flex flex-col items-center gap-3 w-72">
                    <Textarea
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="example.com"
                        className="max-h-24 overflow-hidden resize-none"
                    />
                    <Button onClick={handleDone} className="w-full">
                        Done
                    </Button>
                </PopoverContent>
            </Popover>
            <ButtonGroupSeparator/>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-1.5">
                    <div className="w-4 aspect-square">
                        <ImagePlus />
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1.5" disabled>
                    <div className="w-4 aspect-square">
                        <YouTubeIcon />
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1.5" disabled>
                    <div className="w-4 aspect-square">
                        <XCorpIcon />
                    </div>
                </Button>
            </ButtonGroup>
        </ButtonGroup>
    )
}

export default Toolbar;