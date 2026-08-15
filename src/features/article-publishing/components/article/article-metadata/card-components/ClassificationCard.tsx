'use client';

import { Plus, ExternalLink, Layers } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {TagPicker} from "@/features/article-publishing/components/article/article-form/TagPicker";

export function ClassificationCard() {
    const handleCreateNewSeries = () => {
        window.open('/admin/add-series', '_blank');
    };

    return (
        <div className="py-3 space-y-8">
            <TagPicker
                fieldName="tags"
                label="Selected Tags"
                placeholder="Select or type a tag..."
            />

            <div className="space-y-4 pt-4 border-t">
                <Badge variant="outline" className="w-fit select-none opacity-80">
                    Series Membership
                </Badge>
                <div className="space-y-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCreateNewSeries}
                        className="w-full max-w-md mx-auto flex items-center justify-center gap-2"
                    >
                        <div className="w-4 aspect-square">
                            <Plus />
                        </div>
                        <span>Create New Series</span>
                        <div className="w-3.5 aspect-square text-muted-foreground ml-1">
                            <ExternalLink />
                        </div>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                        or choose from existing series below
                    </p>
                </div>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center space-y-2 bg-muted/20">
                    <div className="w-8 aspect-square mx-auto text-muted-foreground/60">
                        <Layers />
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">
                        Series Picker Placeholder (Top 20 Recent Series)
                    </p>
                </div>
            </div>
        </div>
    );
}