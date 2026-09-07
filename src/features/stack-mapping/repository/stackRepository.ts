import clientPromise from "@/shared/lib/mongodb";
import { OptionalId } from "mongodb";
import { Category } from "../types/category.type";
import { Subcategory } from "../types/subcategory.type";
import { StackEntry } from "../types/stack-entry.type";
import { logger } from "@/shared/logger/logger";

export class StackRepository {
    private static async getCollection<T>(collectionName: string) {
        const client = await clientPromise;
        const db = client.db();
        return db.collection<OptionalId<T>>(collectionName);
    }

    public static async getCategories(): Promise<Category[]> {
        try {
            const collection = await this.getCollection<Category>("techStackCategories");
            return await collection.find({}).project<Category>({ _id: 0 }).toArray();
        } catch (error) {
            logger.error(
                error as Error,
                "Failed to fetch stack categories",
                { context: "StackRepository.getCategories" }
            );
            return [];
        }
    }

    public static async getSubcategories(): Promise<Subcategory[]> {
        try {
            const collection = await this.getCollection<Subcategory>("teckStackSubCategories");
            return await collection.find({}).project<Subcategory>({ _id: 0 }).toArray();
        } catch (error) {
            logger.error(
                error as Error,
                "Failed to fetch stack subcategories",
                { context: "StackRepository.getSubcategories" }
            );
            return [];
        }
    }

    public static async getStackEntries(): Promise<StackEntry[]> {
        try {
            const collection = await this.getCollection<StackEntry>("teckStackEntry");
            return await collection.find({}).project<StackEntry>({ _id: 0 }).toArray();
        } catch (error) {
            logger.error(
                error as Error,
                "Failed to fetch stack entries",
                { context: "StackRepository.getStackEntries" }
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
            const [categories, subcategories, stackEntries] = await Promise.all([
                this.getCategories(),
                this.getSubcategories(),
                this.getStackEntries(),
            ]);

            return {
                categories,
                subcategories,
                stackEntries,
            };
        } catch (error) {
            logger.error(
                error as Error,
                "Failed to fetch full stack section data",
                { context: "StackRepository.getStackSectionData" }
            );
            return {
                categories: [],
                subcategories: [],
                stackEntries: [],
            };
        }
    }
}