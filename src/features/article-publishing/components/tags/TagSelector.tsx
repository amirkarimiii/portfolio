'use client';

import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ChevronsUpDown, Plus } from 'lucide-react';
import {FormField, FormItem, FormLabel} from "@/shared/components/ui/form";
import {Badge} from "@/shared/components/ui/badge";
import {Popover, PopoverContent, PopoverTrigger} from "@/shared/components/ui/popover";
import {Button} from "@/shared/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/shared/components/ui/command";



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

interface TagSelectorProps {
    fieldName: string;
    label: string;
    placeholder?: string;
}

function FormMessage() {
    return null;
}


export function TagSelector({ fieldName, label, placeholder = 'Select or type a tag...' }: TagSelectorProps) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [existingTags, setExistingTags] = useState<string[]>(INITIAL_MOCK_TAGS);

    const { control, setValue } = useFormContext();
    const currentTags: string[] = useWatch({ control, name: fieldName }) || [];

    const handleSelectTag = (tag: string) => {
        if (!currentTags.includes(tag)) {
            const updatedTags = [...currentTags, tag];
            setValue(fieldName, updatedTags, { shouldValidate: true, shouldDirty: true });
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

    const filteredSuggestions = existingTags.filter((tag) => !currentTags.includes(tag));

    return (
        <FormField
            control={control}
            name={fieldName}
            render={() => (
                <FormItem className="space-y-2 w-md">
                    <FormLabel className="sr-only">{label}</FormLabel>
                    <Badge variant="outline" className="w-fit select-none opacity-80">
                        {label}
                    </Badge>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between text-muted-foreground font-normal"
                            >
                                {placeholder}
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
                                            <CommandItem key={tag} value={tag} onSelect={() => handleSelectTag(tag)}>
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
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
