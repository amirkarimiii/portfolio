import categoriesMock from "@/mock-files/categories.json";
import { Category } from "../types/category.type";

export async function getCategories(): Promise<Category[]> {

    return categoriesMock as Category[];
}