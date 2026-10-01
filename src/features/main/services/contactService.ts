import { ContactRepository } from "../repository/contactRepository";
import { Contact, contactSchema } from "../schema/contactSchema";
import { logger } from "@/shared/logger/logger";

export class ContactService {

    public static async getContactInfo(): Promise<Contact | null> {
        try {
            const rawData = await ContactRepository.getContactInfo();

            if (!rawData) {
                return null;
            }

            const parseResult = contactSchema.safeParse(rawData);

            if (!parseResult.success) {
                logger.error(
                    parseResult.error,
                    "Contact data failed schema validation",
                    { context: "ContactService.getContactInfo" }
                );
                return null;
            }

            return parseResult.data;
        } catch (error) {
            logger.error(
                error as Error,
                "Service failed to get contact info",
                { context: "ContactService.getContactInfo" }
            );
            return null;
        }
    }
}