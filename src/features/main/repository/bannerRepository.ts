import clientPromise from "@/shared/lib/mongodb";
import { OptionalId } from "mongodb";
import { Person } from "../schema/personSchema";
import { logger } from "@/shared/logger/logger";

export class BannerRepository {
    private static async getCollection<T>(collectionName: string) {
        const client = await clientPromise;
        const db = client.db();
        return db.collection<OptionalId<T>>(collectionName);
    }

    public static async getPerson(): Promise<Person | null> {
        try {
            const collection = await this.getCollection<Person>("person");
            const person = await collection.findOne<Person>({}, { projection: { _id: 0 } });

            return person || null;
        } catch (error) {
            logger.error(
                error as Error,
                "Failed to fetch person data from banner repository",
                { context: "BannerRepository.getPerson" }
            );
            return null;
        }
    }
}