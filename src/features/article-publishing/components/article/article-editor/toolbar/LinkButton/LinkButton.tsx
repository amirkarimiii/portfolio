"use client"

import { useMemo, useState } from "react";
import { Editor, useEditorState } from "@tiptap/react";
import { toast } from "sonner";
import { linkButtonInitializer } from "./linkButtonInitializer";
import {Trash} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/shared/components/ui/popover";
import {Button} from "@/shared/components/ui/button";
import {cn} from "@/shared/utils/shadcnUtils";
import {Input} from "@/shared/components/ui/input";

interface LinkButtonProps {
    editor: Editor | null;
}

export function LinkButton({ editor }: LinkButtonProps) {
    const { icon: Icon, isActive, canRun, getHref, setLink, unsetLink } =
        useMemo(() => linkButtonInitializer(editor).link, [editor]);

    const state = useEditorState({
        editor,
        selector: (ctx) => ({
            active: isActive(ctx),
            canRun: canRun(ctx),
            currentHref: getHref(ctx),
        }),
    });

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen);

        if (nextOpen) {
            setValue(state?.currentHref ?? "");
        }
    };

    const handleDone = () => {
        const trimmed = value.trim();

        if (!trimmed) {
            unsetLink();
            setOpen(false);
            return;
        }

        if (trimmed.startsWith("http://")) {
            toast.warning("This link is not secure (http). Please use https", { position: "top-center" });
            return;
        }

        const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

        const isValidUrl = (() => {
            try {
                const url = new URL(withProtocol);
                return /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(url.hostname);
            } catch {
                return false;
            }
        })();

        if (!isValidUrl) {
            toast.error("The input must be a valid URL", { position: "top-center" });
            return;
        }

        setLink(withProtocol);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn("w-max px-2", state?.active && "bg-accent text-accent-foreground")}
                    disabled={!state?.canRun}
                >
                    <div className="w-4 aspect-square">
                        <Icon />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-center gap-3 w-72">
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleDone();
                        }
                    }}
                    placeholder="example.com"
                    autoFocus
                />
                <div className="flex flex-row gap-1 w-full">
                    <Button onClick={handleDone} className="flex-4">
                        {state?.currentHref ? "Update" : "Add"}
                    </Button>
                    <Button onClick={() => {
                        unsetLink();
                    }} className={cn("w-full flex-1", !state?.currentHref && "hidden")}>
                        <div className="w-4 aspect-square">
                            <Trash/>
                        </div>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}