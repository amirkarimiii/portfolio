import { z } from "zod";
import { ProjectRepository } from "../repository/projectRepository";
import { Project, projectSchema } from "../schema/projectSchema";
import { logger } from "@/shared/logger/logger";

export class ProjectService {

    public static async getProjects(): Promise<Project[]> {
        try {
            const rawData = await ProjectRepository.getProjects();

            if (!rawData || rawData.length === 0) {
                return [];
            }

            const parseResult = z.array(projectSchema).safeParse(rawData);

            if (!parseResult.success) {
                logger.error(
                    parseResult.error,
                    "Projects data failed schema validation",
                    { context: "ProjectService.getProjects" }
                );
                return [];
            }

            return parseResult.data;
        } catch (error) {
            logger.error(
                error as Error,
                "Service failed to get projects",
                { context: "ProjectService.getProjects" }
            );
            return [];
        }
    }
}