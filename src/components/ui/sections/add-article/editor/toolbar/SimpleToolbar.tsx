import {Editor} from "@tiptap/react";
import {ButtonGroup, ButtonGroupSeparator} from "@/components/ui/shadcn/button-group";
import {Button} from "@/components/ui/shadcn/button";
import {
    BoldIcon,
    ChevronDownIcon, CodeIcon, Eraser, FileCodeCorner, Heading2Icon, Heading3Icon,
    Heading4Icon, HighlighterIcon, ImageIcon,
    ItalicIcon, LinkIcon, List, ListOrdered, QuoteIcon,
    RedoIcon, RotateCcwIcon,
    StrikethroughIcon, TypeOutline,
    UnderlineIcon,
    UndoIcon
} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/shadcn/popover";
import {Textarea} from "@/components/ui/shadcn/textarea";
import {useState} from "react";
import {toast} from "sonner";
import {cn} from "@/lib/utils/shadcnUtils";
import {Separator} from "@/components/ui/shadcn/separator";
import {HexColorPicker} from "react-colorful";

const PALETTE_SIZE = 12;
const DEFAULT_DRAFT_COLOR = "#FEE685";

function SimpleToolbar({editor}: { editor: Editor | null }) {

    const [open, setOpen] = useState(false);
    const [link, setLink] = useState("");

    const [palette, setPalette] = useState(Array(PALETTE_SIZE).fill(null));
    const [highlightColor, setHighlightColor] = useState(DEFAULT_DRAFT_COLOR);
    const [highlightPopoverOpen, setHighlightPopoverOpen] = useState(false);
    const [editingTarget, setEditingTarget] = useState<string | number | null>(null);
    const [draftColor, setDraftColor] = useState<string>(DEFAULT_DRAFT_COLOR);
    const isColorPickerOpen = editingTarget !== null;

    if (!editor) return null

    const openColorPickerFor = (target: string | number | null, initialColor: string) => {
        setDraftColor(initialColor || DEFAULT_DRAFT_COLOR);
        setEditingTarget(target);
    };

    const closeColorPicker = () => {
        setEditingTarget(null);
    };

    const handleChooseColorClick = () => {
        openColorPickerFor("choose", highlightColor);
    };

    const handleConfirmColorHighlight = () => {
        if (editingTarget === "choose") {
            setHighlightColor(draftColor);
            closeColorPicker();
            setHighlightPopoverOpen(false);
        } else if (typeof editingTarget === "number") {
            setPalette((prev) => {
                const next = [...prev];
                next[editingTarget] = draftColor;
                return next;
            });
            closeColorPicker();
        }
    };

    const handleResetPalette = () => {
        setPalette(Array(PALETTE_SIZE).fill(null));
    };


    const handleSlotClick = (index: number) => {
        const existingColor = palette[index];
        if (existingColor) {
            setHighlightColor(existingColor);
            setHighlightPopoverOpen(false);
        } else {
            openColorPickerFor(index, DEFAULT_DRAFT_COLOR);
        }
    };

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
                <Button variant="ghost" className="w-max px-1.5" onClick={() => editor?.chain().focus().undo().run()}>
                    <div className="w-3.5 aspect-square">
                        <UndoIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1.5" onClick={() => editor?.chain().focus().redo().run()}>
                    <div className="w-3.5 aspect-square">
                        <RedoIcon/>
                    </div>
                </Button>
            </ButtonGroup>
            <ButtonGroupSeparator/>
            <ButtonGroup>
                <ButtonGroup>
                    <Button variant="ghost" className="w-max px-1.5">
                        <div className="w-3.5 aspect-square">
                            <Heading2Icon/>
                        </div>
                    </Button>
                    <Button variant="ghost" className="w-max px-1.5">
                        <div className="w-3.5 aspect-square">
                            <Heading3Icon/>
                        </div>
                    </Button>
                    <Button variant="ghost" className="w-max px-1.5">
                        <div className="w-3.5 aspect-square">
                            <Heading4Icon/>
                        </div>
                    </Button>
                </ButtonGroup>
                <ButtonGroupSeparator/>
                <ButtonGroup>
                    <Button variant="ghost" className="w-max px-1.5">
                        <div className="w-3.5 aspect-square">
                            <QuoteIcon/>
                        </div>
                    </Button>
                    <Button variant="ghost" className="w-max px-1.5">
                        <div className="w-3.5 aspect-square">
                            <FileCodeCorner/>
                        </div>
                    </Button>
                </ButtonGroup>
            </ButtonGroup>
            <ButtonGroupSeparator/>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-1.5">
                    <div className="w-3.5 aspect-square">
                        <List/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1.5">
                    <div className="w-3.5 aspect-square">
                        <ListOrdered/>
                    </div>
                </Button>
            </ButtonGroup>
            <ButtonGroupSeparator/>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-1.5"
                        onClick={() => editor?.chain().focus().toggleBold().run()}>
                    <div className="w-3.5 aspect-square">
                        <BoldIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1.5"
                        onClick={() => editor?.chain().focus().toggleItalic().run()}>
                    <div className="w-3.5 aspect-square">
                        <ItalicIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1.5"
                        onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                    <div className="w-3.5 aspect-square">
                        <UnderlineIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1.5"
                        onClick={() => editor?.chain().focus().toggleStrike().run()}>
                    <div className="w-3.5 aspect-square">
                        <StrikethroughIcon/>
                    </div>
                </Button>
                <Button variant="ghost" className="w-max px-1.5">
                    <div className="w-3.5 aspect-square">
                        <HighlighterIcon/>
                    </div>
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-2"
                        onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                    <div className="w-3.5 aspect-square">
                        <Eraser/>
                    </div>
                </Button>
            </ButtonGroup>
            <ButtonGroupSeparator/>
            <ButtonGroup>
                <Button variant="ghost" className="w-max px-1" onClick={() => editor.chain().focus().toggleHighlight({ color: highlightColor }).run()}>
                    <div className="w-5 p-0.5 aspect-square flex flex-col gap-1 items-center">
                        <div className="w-3 aspect-square">
                            <HighlighterIcon/>
                        </div>
                        <div className="w-full h-1" style={{backgroundColor: highlightColor}}/>
                    </div>
                </Button>
                <Popover
                    open={highlightPopoverOpen}
                    onOpenChange={(open) => {
                        setHighlightPopoverOpen(open);
                    }}
                >
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-max px-1">
                            <div className="w-3 aspect-square">
                                <ChevronDownIcon/>
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-3" align="center">
                        {
                            isColorPickerOpen ? (
                                <div className="space-y-3">
                                    <HexColorPicker
                                        color={draftColor}
                                        onChange={setDraftColor}
                                        style={{ width: "100%" }}
                                    />
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-6 h-6 rounded-full border shrink-0"
                                            style={{ backgroundColor: draftColor }}
                                        />
                                        <input
                                            value={draftColor}
                                            onChange={(e) => setDraftColor(e.target.value)}
                                            className="flex-1 h-8 text-xs border rounded px-2 font-mono"
                                            spellCheck={false}
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={closeColorPicker}
                                        >
                                            Cancel
                                        </Button>
                                        <Button size="sm" className="flex-1 gap-1" onClick={handleConfirmColorHighlight}>
                                            Confirm
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <Button variant="outline" size="sm" className="w-full justify-center gap-2" onClick={handleChooseColorClick}>
                                        <div className="w-max flex flex-row gap-2">
                                    <span className="w-3.5 h-3.5 block mt-1 rounded-full border shrink-0"
                                          style={{backgroundColor: highlightColor}}/>
                                            Choose Color
                                        </div>
                                    </Button>
                                    <div className="grid grid-cols-4 gap-2 justify-items-center">
                                        {palette.map((color, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                title={color ? color : "add color"}
                                                onClick={() => handleSlotClick(index)}
                                                className={cn(
                                                    "w-6 h-6 rounded-full transition",
                                                    color
                                                        ? "border border-black/10 hover:scale-110"
                                                        : "border border-dashed border-muted-foreground/40 hover:border-muted-foreground"
                                                )}
                                                style={color ? {backgroundColor: color} : undefined}
                                            />
                                        ))}
                                    </div>
                                    <Separator/>
                                    <Button variant="ghost" size="sm" className="w-full justify-center gap-2 text-muted-foreground" onClick={handleResetPalette}>
                                        <div className="w-max flex flex-row gap-2">
                                            <div className="w-3.5 aspect-square">
                                                <RotateCcwIcon/>
                                            </div>
                                            Reset palette
                                        </div>
                                    </Button>
                                </div>
                            )
                        }
                    </PopoverContent>
                </Popover>
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