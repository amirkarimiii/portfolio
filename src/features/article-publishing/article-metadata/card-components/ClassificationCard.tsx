'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, ChevronsUpDown, Plus, ExternalLink, Layers } from 'lucide-react';
import {
    classificationSchema,
    type ClassificationFormValues,
} from '@/features/article-publishing/schemas/classificationSchema';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/shared/components/ui/command';

export const INITIAL_MOCK_TAGS = [
    'React',
    'React Native',
    'TypeScript',
    'Next.js',
    'Architecture',
    'Tailwind CSS',
    'Zustand',
    'Node.js',
];

const defaultValues: ClassificationFormValues = {
    tags: ['React', 'TypeScript', 'Next.js'],
};

export function ClassificationCard() {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [existingTags, setExistingTags] = useState<string[]>(INITIAL_MOCK_TAGS);

    const form = useForm<ClassificationFormValues>({
        resolver: zodResolver(classificationSchema),
        defaultValues,
        mode: 'onChange',
    });

    const currentTags = useWatch({
        control: form.control,
        name: 'tags',
    }) || [];

    const handleRemoveTag = (tagToRemove: string) => {
        const updatedTags = currentTags.filter((tag) => tag !== tagToRemove);
        form.setValue('tags', updatedTags, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    const handleSelectTag = (tag: string) => {
        if (!currentTags.includes(tag)) {
            const updatedTags = [...currentTags, tag];
            form.setValue('tags', updatedTags, {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
        setInputValue('');
        setOpen(false);
    };

    const handleCreateTag = (newTag: string) => {
        const trimmedTag = newTag.trim();
        if (!trimmedTag) return;

        if (!existingTags.some((t) => t.toLowerCase() === trimmedTag.toLowerCase())) {
            setExistingTags((prev) => [...prev, trimmedTag]);
        }

        handleSelectTag(trimmedTag);
    };

    const handleCreateNewSeries = () => {
        window.open('/admin/add-series', '_blank');
    };

    function onSubmit(data: ClassificationFormValues) {
        console.log('Classification Form Data:', data);
    }

    const filteredSuggestions = existingTags.filter(
        (tag) => !currentTags.includes(tag)
    );

    return (
        <div className="py-3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="tags"
                        render={() => (
                            <FormItem className="space-y-3">
                                <FormLabel className="sr-only">
                                    Selected Tags
                                </FormLabel>
                                <Badge variant="outline" className="w-fit select-none opacity-80">
                                    Selected Tags
                                </Badge>
                                <div className="flex flex-wrap gap-2 min-h-9.5 p-2">
                                    {currentTags.length > 0 ? (
                                        currentTags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="flex items-center select-none gap-1.5 px-2.5 py-0.5 text-xs"
                                            >
                                                <span>{tag}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="w-4 aspect-square rounded-full text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
                                                    aria-label={`Remove ${tag} tag`}
                                                >
                                                    <div className="w-3 aspect-square mx-auto">
                                                        <X />
                                                    </div>
                                                </button>
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-xs text-muted-foreground self-center px-1">
                                            No tags selected yet.
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2 w-md">
                                    <Badge variant="outline" className="w-fit select-none opacity-80">
                                        Add Tags
                                    </Badge>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-full justify-between text-muted-foreground font-normal"
                                            >
                                                Select or type a tag...
                                                <div className="ml-2 w-4 aspect-square opacity-50">
                                                    <ChevronsUpDown />
                                                </div>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search or create tag..."
                                                    value={inputValue}
                                                    onValueChange={setInputValue}
                                                />
                                                <CommandList>
                                                    <CommandEmpty className="p-1">
                                                        {inputValue.trim() ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleCreateTag(inputValue)}
                                                                className="flex items-center gap-2 w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                                            >
                                                                <div className="w-4 aspect-square">
                                                                    <Plus />
                                                                </div>
                                                                <span>Create tag <strong>&quot;{inputValue}&quot;</strong></span>
                                                            </button>
                                                        ) : (
                                                            <p className="p-2 text-xs text-muted-foreground text-center">
                                                                No tags found.
                                                            </p>
                                                        )}
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {filteredSuggestions.map((tag) => (
                                                            <CommandItem
                                                                key={tag}
                                                                value={tag}
                                                                onSelect={() => handleSelectTag(tag)}
                                                            >
                                                                <Badge
                                                                    variant="outline"
                                                                    className="flex items-center select-none gap-1.5 px-2.5 py-0.5 text-xs"
                                                                >
                                                                    <span>{tag}</span>
                                                                </Badge>
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
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
                </form>
            </Form>
        </div>
    );
}