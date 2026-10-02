import clientPromise from "@/shared/lib/mongodb";
import {OptionalId} from "mongodb";
import {Project} from "../schema/projectSchema";
import {logger} from "@/shared/logger/logger";

export class ProjectRepository {
    private static async getCollection<T>(collectionName: string) {
        const client = await clientPromise;
        const db = client.db();
        return db.collection<OptionalId<T>>(collectionName);
    }

    public static async getProjects(): Promise<Project[]> {
        try {
            const collection = await this.getCollection<Project>("projects");
            return await collection
                .find({})
                .project<Project>({_id: 0})
                .toArray();
        } catch (error) {
            logger.error(
                error as Error,
                "Failed to fetch projects data from project repository",
                { context: "ProjectRepository.getProjects" }
            );
            return [];
        }
    }
}