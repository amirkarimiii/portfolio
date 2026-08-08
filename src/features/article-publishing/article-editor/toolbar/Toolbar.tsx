import {Editor} from "@tiptap/react";

import { ImagePlus } from "lucide-react";

import {useState} from "react";
import {toast} from "sonner";
import {BlockButton} from "./BlockButton/BlockButton";
import {Button} from "@/shared/components/ui/button";
import {HistoryButton} from "@/features/article-publishing/article-editor/toolbar/HistoryButton/HistoryButton";
import {HeadingsButton} from "@/features/article-publishing/article-editor/toolbar/HeadingsButton/HeadingsButton";

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
                <MarkButton type={"underline"} editor={editor}/>
                <MarkButton type={"strikethrough"} editor={editor}/>
                <MarkButton type={"inlineCode"} editor={editor}/>
                <MarkButton type={"highlight"} editor={editor}/>
            </ButtonGroup>
            <ButtonGroupSeparator/>
            <LinkButton editor={editor} />
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