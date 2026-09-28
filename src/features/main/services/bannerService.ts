import { BannerRepository } from "../repository/bannerRepository";
import { Person, personSchema } from "../schema/personSchema";
import { logger } from "@/shared/logger/logger";

export class BannerService {
    public static async getPerson(): Promise<Person | null> {
        try {
            const rawData = await BannerRepository.getPerson();

            if (!rawData) {
                return null;
            }

            const parseResult = personSchema.safeParse(rawData);

            if (!parseResult.success) {
                logger.error(
                    parseResult.error,
                    "Person data failed schema validation",
                    { context: "BannerService.getPerson" }
                );
                return null;
            }

            return parseResult.data;
        } catch (error) {
            logger.error(
                error as Error,
                "Service failed to get person data",
                { context: "BannerService.getPerson" }
            );
            return null;
        }
    }
}