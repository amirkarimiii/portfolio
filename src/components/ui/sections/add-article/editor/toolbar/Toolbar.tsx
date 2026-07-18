import {Editor} from "@tiptap/react";
import {ButtonGroup, ButtonGroupSeparator} from "@/components/ui/shadcn/button-group";
import {Button} from "@/components/ui/shadcn/button";

import {
    BoldIcon,
    CodeIcon, Eraser,
    HighlighterIcon, ImagePlus, ItalicIcon,
    LinkIcon, List, ListOrdered,
    StrikethroughIcon, UnderlineIcon
} from "lucide-react";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/shadcn/popover";
import {Textarea} from "@/components/ui/shadcn/textarea";
import {useState} from "react";
import {toast} from "sonner";
import {XCorpIcon, YouTubeIcon} from "@/components/ui/sections/add-article/editor/toolbar/icons";
import {HistoryButton} from "@/components/ui/sections/add-article/editor/toolbar/HistoryButton/HistoryButton";
import {HeadingsButton} from "@/components/ui/sections/add-article/editor/toolbar/HeadingsButton/HeadingsButton";
import {BlockButton} from "./BlockButton/BlockButton";
import {ListButton} from "@/components/ui/sections/add-article/editor/toolbar/ListButton/ListButton";
import {MarkButton} from "@/components/ui/sections/add-article/editor/toolbar/MarkButton/MarkButton";

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
                    <HeadingsButton type={"h2"} editor={editor} />
                    <HeadingsButton type={"h3"} editor={editor} />
                    <HeadingsButton type={"h4"} editor={editor} />
                </ButtonGroup>
                <ButtonGroupSeparator/>
                <ButtonGroup>
                    <BlockButton type={"quote"} editor={editor}/>
                    <BlockButton type={"code"} editor={editor}/>
                </ButtonGroup>
            </ButtonGroup>
            <ButtonGroupSeparator/>
            <ButtonGroup>
                <ListButton type={"bullet"} editor={editor}/>
                <ListButton type={"ordered"} editor={editor}/>
            </ButtonGroup>
            <ButtonGroupSeparator/>
            <ButtonGroup>
                <MarkButton type={"bold"} editor={editor}/>
                <MarkButton type={"italic"} editor={editor}/>
                <Button variant="ghost" className="w-max px-1.5"
                        onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                    <div className="w-4 aspect-square">
                        <UnderlineIcon/>
                    </div>
                </Button>
                <MarkButton type={"strikethrough"} editor={editor}/>
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