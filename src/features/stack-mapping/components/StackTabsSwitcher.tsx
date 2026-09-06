"use client";

import { useState } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
} from "@/shared/components/ui/sidebar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { StackTabContent } from "./StackTabContent";
import { Category } from "@/features/stack-mapping/types/category.type";
import { Subcategory } from "@/features/stack-mapping/types/subcategory.type";
import { StackEntry } from "@/features/stack-mapping/types/stack-entry.type";

interface StackTabsSwitcherProps {
    categories: Category[];
    subcategories: Subcategory[];
    stackEntries: StackEntry[];
    defaultValue: string;
}

export function StackTabsSwitcher({
                                      categories,
                                      subcategories,
                                      stackEntries,
                                      defaultValue,
                                  }: StackTabsSwitcherProps) {
    const [selectedCategoryId, setSelectedCategoryId] = useState(defaultValue);

    const activeCategory = categories.find(
        (category) => category.uniqueId === selectedCategoryId
    );

    return (
        <SidebarProvider className="min-h-full">
            <div className="flex flex-col sm:flex-row gap-6 w-full">
                {/* Desktop Sidebar Navigation */}
                <div className="hidden sm:block w-52 shrink-0">
                    <Sidebar collapsible="none" className="w-full bg-transparent border-none">
                        <SidebarContent>
                            <SidebarGroup className="p-0">
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {categories.map((category) => {
                                            const isActive = selectedCategoryId === category.uniqueId;
                                            return (
                                                <SidebarMenuItem key={category.uniqueId}>
                                                    <SidebarMenuButton
                                                        isActive={isActive}
                                                        onClick={() => setSelectedCategoryId(category.uniqueId)}
                                                        className="w-full justify-start"
                                                    >
                                                        {category.icon && <span>{category.icon}</span>}
                                                        <span>{category.name}</span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            );
                                        })}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                </div>

                <div className="sm:hidden w-full">
                    <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category.uniqueId} value={category.uniqueId}>
                  <span className="flex items-center gap-2">
                    {category.icon && <span>{category.icon}</span>}
                      {category.name}
                  </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <main className="flex-1 min-w-0">
                    {activeCategory && (
                        <StackTabContent
                            category={activeCategory}
                            subcategories={subcategories}
                            stackEntries={stackEntries}
                        />
                    )}
                </main>
            </div>
        </SidebarProvider>
    );
}