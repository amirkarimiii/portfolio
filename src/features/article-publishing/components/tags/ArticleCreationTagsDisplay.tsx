import React from 'react';
import { X, Lock } from 'lucide-react';
import {cn} from "@/shared/utils/shadcnUtils";
import {EffectiveTag} from "@/features/article-publishing/utils/tagUtils";
import {Badge} from "@/shared/components/ui/badge";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/shared/components/ui/tooltip";
import {Button} from "@/shared/components/ui/button";


interface EffectiveTagsDisplayProps {
    effectiveTags: EffectiveTag[];
    onRemoveManualTag: (tagName: string) => void;
    className?: string;
}


export const ArticleCreationTagsDisplay: React.FC<EffectiveTagsDisplayProps> = ({
                                                                              effectiveTags,
                                                                              onRemoveManualTag,
                                                                              className,
                                                                          }) => {
    if (effectiveTags.length === 0) {
        return (
            <div className="text-xs text-muted-foreground italic py-2">
                No tags assigned yet.
            </div>
        );
    }

    return (
        <div className={cn('flex flex-wrap gap-2 items-center', className)}>
            {effectiveTags.map((tag) =>
                tag.isInherited ? (
                    <InheritedTagChip key={`inherited-${tag.name}`} name={tag.name} />
                ) : (
                    <ManualTagChip
                        key={`manual-${tag.name}`}
                        name={tag.name}
                        onRemove={onRemoveManualTag}
                    />
                )
            )}
        </div>
    );
};

function InheritedTagChip({ name }: { name: string }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Badge
                    variant="secondary"
                    className="flex items-center select-none gap-1.5 px-2.5 py-0.5 text-xs"
                >
                    <span>{name}</span>
                </Badge>
            </TooltipTrigger>
            <TooltipContent>{"Inherited from selected series (non-removable)"}</TooltipContent>
        </Tooltip>

    );
}

function ManualTagChip({ name, onRemove }: { name: string; onRemove: (name: string) => void }) {
    return (
        <Badge
            variant="outline"
            className="flex items-center select-none gap-1.5 px-2.5 py-0.5 text-xs"
        >
            <span>{name}</span>
            <button
                type="button"
                onClick={() => onRemove(name)}
                className="w-4 aspect-square rounded-full text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
                aria-label={`Remove ${name} tag`}
            >
                <div className="w-3 aspect-square mx-auto">
                    <X />
                </div>
            </button>
        </Badge>
    );
}
