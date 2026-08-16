import { X } from 'lucide-react';
import {Badge} from "@/shared/components/ui/badge";
import React from "react";

interface SelectedTagsDisplayProps {
    tags: string[];
    onRemoveTag: (tag: string) => void;
}

export function SeriesCreationTagsDisplay({ tags, onRemoveTag }: SelectedTagsDisplayProps) {
    if (tags.length === 0) {
        return <div className="text-xs text-muted-foreground italic py-2">No tags selected yet.</div>;
    }

    return (
        <div className="flex flex-wrap gap-2 items-center">
            {tags.map((tag) => (
                <Badge
                    key={tag}
                    variant="outline"
                    className="flex items-center select-none gap-1.5 px-2.5 py-0.5 text-xs"
                >
                    <span>{tag}</span>
                    <button
                        type="button"
                        onClick={() => onRemoveTag(tag)}
                        className="w-4 aspect-square rounded-full text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
                        aria-label={`Remove ${tag} tag`}
                    >
                        <div className="w-3 aspect-square mx-auto">
                            <X />
                        </div>
                    </button>
                </Badge>
            ))}
        </div>
    );
}