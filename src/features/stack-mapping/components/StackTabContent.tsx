"use client";

import { useState } from "react";
import { Category } from "../types/category.type";
import { Subcategory } from "../types/subcategory.type";
import { StackEntry } from "../types/stack-entry.type";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "@/shared/components/ui/drawer";

interface StackTabContentProps {
    category: Category;
    subcategories: Subcategory[];
    stackEntries: StackEntry[];
}

export function StackTabContent({ category, subcategories, stackEntries }: StackTabContentProps) {
    const [selectedEntry, setSelectedEntry] = useState<StackEntry | null>(null);

    const categorySubcategories = subcategories.filter(
        (sub) => sub.categoryId === category.uniqueId
    );

    const standaloneEntries = stackEntries.filter(
        (entry) => entry.categoryId === category.uniqueId && entry.subcategoryId === null
    );

    return (
        <div className="space-y-6">
            {category.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                    {category.description}
                </p>
            )}

            <p className="text-xs text-muted-foreground/80 italic pt-1">
                💡 Click on any technology badge to view detailed insights.
            </p>

            <div className="space-y-8 pt-2">
                {categorySubcategories.length > 0 && (
                    <div className="space-y-6">
                        {categorySubcategories.map((sub) => {
                            const subCategoryEntries = stackEntries.filter(
                                (entry) =>
                                    entry.categoryId === category.uniqueId &&
                                    entry.subcategoryId === sub.uniqueId
                            );

                            return (
                                <div key={sub.uniqueId} className="space-y-3 border-l-2 border-muted pl-4">
                                    <h4 className="text-base font-semibold text-foreground">
                                        {sub.name}
                                    </h4>

                                    {sub.description && (
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {sub.description}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {subCategoryEntries.length > 0 ? (
                                            subCategoryEntries.map((entry) => (
                                                <Badge
                                                    key={entry.uniqueId}
                                                    variant="secondary"
                                                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors py-1 px-3"
                                                    onClick={() => setSelectedEntry(entry)}
                                                >
                                                    {entry.name}
                                                </Badge>
                                            ))
                                        ) : (
                                            <p className="text-xs text-muted-foreground/60 italic">
                                                No technologies listed in this subcategory.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                <div className="space-y-3 pt-2">
                    <h4 className="text-sm font-semibold text-foreground">
                        Cross-category Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {standaloneEntries.length > 0 ? (
                            standaloneEntries.map((entry) => (
                                <Badge
                                    key={entry.uniqueId}
                                    variant="outline"
                                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors py-1 px-3"
                                    onClick={() => setSelectedEntry(entry)}
                                >
                                    {entry.name}
                                </Badge>
                            ))
                        ) : (
                            <p className="text-xs text-muted-foreground/60 italic">
                                No cross-category technologies found.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Drawer open={!!selectedEntry} onOpenChange={(open) => !open && setSelectedEntry(null)}>
                <DrawerContent className="max-w-2xl mx-auto">
                    {selectedEntry && (
                        <>
                            <DrawerHeader>
                                <DrawerTitle className="text-xl font-bold flex items-center gap-2">
                                    {selectedEntry.name}
                                </DrawerTitle>
                                {selectedEntry.shortDescription && (
                                    <DrawerDescription className="text-sm text-muted-foreground mt-1">
                                        {selectedEntry.shortDescription}
                                    </DrawerDescription>
                                )}
                            </DrawerHeader>

                            <div className="p-4 overflow-y-auto max-h-[60vh]">
                                {Array.isArray(selectedEntry.content) && selectedEntry.content.length === 0 ? (
                                    <p className="text-sm text-muted-foreground italic text-center py-6">
                                        No detailed content available yet for this entry.
                                    </p>
                                ) : (
                                    <div className="prose dark:prose-invert text-sm">
                                        <p>Content goes here...</p>
                                    </div>
                                )}
                            </div>

                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="w-full">
                                        Close
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    );
}