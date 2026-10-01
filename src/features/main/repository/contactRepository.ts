import clientPromise from "@/shared/lib/mongodb";
import { OptionalId } from "mongodb";
import { Contact } from "../schema/contactSchema";
import { logger } from "@/shared/logger/logger";

export class ContactRepository {
    private static async getCollection<T>(collectionName: string) {
        const client = await clientPromise;
        const db = client.db();
        return db.collection<OptionalId<T>>(collectionName);
    }

    public static async getContactInfo(): Promise<Contact | null> {
        try {
            const collection = await this.getCollection<Contact>("contact");
            const contactInfo = await collection.findOne<Contact>({}, { projection: { _id: 0 } });

            return contactInfo || null;
        } catch (error) {
            logger.error(
                error as Error,
                "Failed to fetch contact data from contact repository",
                { context: "ContactRepository.getContactInfo" }
            );
            return null;
        }
    }
}