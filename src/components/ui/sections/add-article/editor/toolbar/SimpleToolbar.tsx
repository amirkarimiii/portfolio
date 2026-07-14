import {Editor} from "@tiptap/react";
import {ButtonGroup, ButtonGroupSeparator} from "@/components/ui/shadcn/button-group";
import {Button} from "@/components/ui/shadcn/button";
import {
    BoldIcon,
    ChevronDownIcon, CodeIcon, HighlighterIcon, ImageIcon,
    ItalicIcon, LinkIcon, List, QuoteIcon,
    RedoIcon,
    StrikethroughIcon, TextAlignStart, TypeOutline,
    UnderlineIcon,
    UndoIcon
} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/shadcn/popover";
import {Textarea} from "@/components/ui/shadcn/textarea";
import {useState} from "react";
import {toast} from "sonner";

function SimpleToolbar({editor}: { editor: Editor | null }) {

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
                <Button variant="ghost" className="w-max px-2" onClick={() => editor?.chain().focus().undo().run()}>
                    <div className="w-4 aspect-square">
                        <UndoIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-2" onClick={() => editor?.chain().focus().redo().run()}>
                    <div className="w-4 aspect-square">
                        <RedoIcon/>
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
                <Button variant="ghost" className="w-max px-1">
                    <div className="w-5 aspect-square">
                        <TextAlignStart/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1">
                    <div className="w-3 aspect-square">
                        <ChevronDownIcon/>
                    </div>
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-1">
                    <div className="w-5 aspect-square">
                        <List/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1">
                    <div className="w-3 aspect-square">
                        <ChevronDownIcon/>
                    </div>
                </Button>
            </ButtonGroup>
            <ButtonGroupSeparator/>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-2"
                        onClick={() => editor?.chain().focus().toggleBold().run()}>
                    <div className="w-5 aspect-square">
                        <BoldIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-2"
                        onClick={() => editor?.chain().focus().toggleItalic().run()}>
                    <div className="w-5 aspect-square">
                        <ItalicIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-2"
                        onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                    <div className="w-5 aspect-square">
                        <UnderlineIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-2"
                        onClick={() => editor?.chain().focus().toggleStrike().run()}>
                    <div className="w-5 aspect-square">
                        <StrikethroughIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-2">
                    <div className="w-5 aspect-square">
                        <QuoteIcon/>
                    </div>
                </Button>
            </ButtonGroup>
            <ButtonGroupSeparator/>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-1">
                    <div className="w-5 p-0.5 aspect-square flex flex-col gap-1 items-center">
                        <div className="w-3 aspect-square">
                            <HighlighterIcon/>
                        </div>
                        <div className="w-full h-1 bg-amber-300"/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1">
                    <div className="w-3 aspect-square">
                        <ChevronDownIcon/>
                    </div>
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-1">
                    <div className="w-5 p-0.5 aspect-square flex flex-col gap-1 items-center">
                        <div className="w-3 aspect-square">
                            <TypeOutline/>
                        </div>
                        <div className="w-full h-1 bg-amber-300"/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1">
                    <div className="w-3 aspect-square">
                        <ChevronDownIcon/>
                    </div>
                </Button>
            </ButtonGroup>
            <ButtonGroupSeparator/>
            <Popover open={open} onOpenChange={setOpen}>
                <ButtonGroup>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-max px-2">
                            <div className="w-5 aspect-square">
                                <LinkIcon/>
                            </div>
                        </Button>
                    </PopoverTrigger>
                </ButtonGroup>
                <PopoverContent className="flex flex-col items-center gap-3 w-72">
                    <p className="text-sm text-center font-semibold">insert link below 👇🏻</p>
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
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-2"
                        onClick={() => editor?.chain().focus().toggleCode().run()}>
                    <div className="w-5 aspect-square">
                        <CodeIcon/>
                    </div>
                </Button>
            </ButtonGroup>
            <ButtonGroupSeparator/>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-2">
                    <div className="w-5 aspect-square">
                        <ImageIcon/>
                    </div>
                </Button>
            </ButtonGroup>
        </ButtonGroup>
    )
}

export default SimpleToolbar;