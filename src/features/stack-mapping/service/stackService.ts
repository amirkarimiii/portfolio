import { StackRepository } from "../repository/stackRepository";
import { Category } from "../types/category.type";
import { Subcategory } from "../types/subcategory.type";
import { StackEntry } from "../types/stack-entry.type";
import { logger } from "@/shared/logger/logger";

export class StackService {
    public static async getCategories(): Promise<Category[]> {
        try {
            return await StackRepository.getCategories();
        } catch (error) {
            logger.error(
                error as Error,
                "Service failed to get categories",
                { context: "StackService.getCategories" }
            );
            return [];
        }
    }

    public static async getSubcategories(): Promise<Subcategory[]> {
        try {
            return await StackRepository.getSubcategories();
        } catch (error) {
            logger.error(
                error as Error,
                "Service failed to get subcategories",
                { context: "StackService.getSubcategories" }
            );
            return [];
        }
    }

    public static async getStackEntries(): Promise<StackEntry[]> {
        try {
            return await StackRepository.getStackEntries();
        } catch (error) {
            logger.error(
                error as Error,
                "Service failed to get stack entries",
                { context: "StackService.getStackEntries" }
            );
            return [];
        }
    }

    public static async getStackSectionData(): Promise<{
        categories: Category[];
        subcategories: Subcategory[];
        stackEntries: StackEntry[];
    }> {
        try {
            return await StackRepository.getStackSectionData();
        } catch (error) {
            logger.error(
                error as Error,
                "Service failed to get stack section data",
                { context: "StackService.getStackSectionData" }
            );
            return {
                categories: [],
                subcategories: [],
                stackEntries: [],
            };
        }
    }
}