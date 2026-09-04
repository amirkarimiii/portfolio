import categoriesMock from "@/mock-files/categories.json";
import subcategoriesMock from "@/mock-files/subcategories.json";
import stackEntriesMock from "@/mock-files/stack-entries.json";

import { Category } from "../types/category.type";
import { Subcategory } from "../types/subcategory.type";
import { StackEntry } from "../types/stack-entry.type";

export async function getCategories(): Promise<Category[]> {
    return categoriesMock as Category[];
}

export async function getSubcategories(): Promise<Subcategory[]> {
    return subcategoriesMock as Subcategory[];
}

export async function getStackEntries(): Promise<StackEntry[]> {
    return stackEntriesMock as StackEntry[];
}

export async function getStackSectionData() {
    return {
        categories: categoriesMock as Category[],
        subcategories: subcategoriesMock as Subcategory[],
        stackEntries: stackEntriesMock as StackEntry[],
    };
}