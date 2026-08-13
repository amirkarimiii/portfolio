import { Editor } from "@tiptap/react";
import { ImagePlus } from "lucide-react";

import { BlockButton } from "./BlockButton/BlockButton";
import { Button } from "@/shared/components/ui/button";
import { HistoryButton } from "@/features/article-publishing/article-editor/toolbar/HistoryButton/HistoryButton";
import { HeadingsButton } from "@/features/article-publishing/article-editor/toolbar/HeadingsButton/HeadingsButton";
import { LinkButton } from "@/features/article-publishing/article-editor/toolbar/LinkButton/LinkButton";
import { ListButton } from "@/features/article-publishing/article-editor/toolbar/ListButton/ListButton";
import { MarkButton } from "./MarkButton/MarkButton";
import { ButtonGroup, ButtonGroupSeparator } from "@/shared/components/ui/button-group";
import {ImageButton} from "@/features/article-publishing/article-editor/toolbar/ImageButton/ImageButton";

function Toolbar({ editor }: { editor: Editor | null }) {
    if (!editor) return null;

    return (
        <ButtonGroup>
            <ButtonGroup>
                <HistoryButton type="undo" editor={editor} />
                <HistoryButton type="redo" editor={editor} />
            </ButtonGroup>
            <ButtonGroupSeparator />
            <ButtonGroup>
                <HeadingsButton type="h2" editor={editor} />
                <HeadingsButton type="h3" editor={editor} />
                <HeadingsButton type="h4" editor={editor} />
            </ButtonGroup>
            <ButtonGroupSeparator />
            <ButtonGroup>
                <MarkButton type="bold" editor={editor} />
                <MarkButton type="italic" editor={editor} />
                <MarkButton type="underline" editor={editor} />
                <MarkButton type="strikethrough" editor={editor} />
                <MarkButton type="inlineCode" editor={editor} />
                <MarkButton type="highlight" editor={editor} />
            </ButtonGroup>
            <ButtonGroupSeparator />
            <ButtonGroup>
                <ListButton type="bullet" editor={editor} />
                <ListButton type="ordered" editor={editor} />
                <BlockButton type="quote" editor={editor} />
                <BlockButton type="code" editor={editor} />
            </ButtonGroup>
            <ButtonGroupSeparator />
            <ButtonGroup>
                <LinkButton editor={editor} />
                <ImageButton editor={editor} />
            </ButtonGroup>
        </ButtonGroup>
    );
}

export default Toolbar;