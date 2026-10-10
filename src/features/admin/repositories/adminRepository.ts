import clientPromise from "@/shared/lib/mongodb";
import { ADMIN_CONFIG_KEY } from "@/shared/constants/admin";
import { logger } from "@/shared/logger/logger";

export interface AdminConfigDocument {
    key: string;
    passwordHash: string;
}

export interface RefreshTokenDocument {
    tokenId: string;
    adminId: string;
    createdAt: Date;
    expiresAt: Date;
}

export class AdminRepository {
    private static async getDb() {
        try {
            const client = await clientPromise;
            return client.db();
        } catch (error) {
            logger.error(error as Error, "Failed to connect to database in AdminRepository", {
                context: "AdminRepository.getDb",
            });
            throw error;
        }
    }

    static async getAdminConfig(): Promise<AdminConfigDocument | null> {
        try {
            const db = await this.getDb();
            return await db.collection<AdminConfigDocument>('adminConfig').findOne({
                key: ADMIN_CONFIG_KEY,
            });
        } catch (error) {
            logger.error(error as Error, "Failed to fetch admin config", {
                context: "AdminRepository.getAdminConfig",
            });
            throw error;
        }
    }

    static async createRefreshToken(tokenData: RefreshTokenDocument): Promise<void> {
        try {
            const db = await this.getDb();
            await db.collection<RefreshTokenDocument>('adminRefreshTokens').insertOne(tokenData);
        } catch (error) {
            logger.error(error as Error, "Failed to create refresh token", {
                context: "AdminRepository.createRefreshToken",
                tokenId: tokenData.tokenId,
            });
            throw error;
        }
    }

    static async findRefreshToken(tokenId: string): Promise<RefreshTokenDocument | null> {
        try {
            const db = await this.getDb();
            return db.collection<RefreshTokenDocument>('adminRefreshTokens').findOne({ tokenId });
        } catch (error) {
            logger.error(error as Error, "Failed to find refresh token", {
                context: "AdminRepository.findRefreshToken",
                tokenId,
            });
            throw error;
        }
    }

    static async deleteRefreshToken(tokenId: string): Promise<void> {
        try {
            const db = await this.getDb();
            await db.collection('adminRefreshTokens').deleteOne({ tokenId });
        } catch (error) {
            logger.error(error as Error, "Failed to delete refresh token", {
                context: "AdminRepository.deleteRefreshToken",
                tokenId,
            });
            throw error;
        }
    }

    static async consumeRefreshToken(tokenId: string): Promise<RefreshTokenDocument | null> {
        try {
            const db = await this.getDb();
            const result = await db.collection<RefreshTokenDocument>('adminRefreshTokens').findOneAndDelete({ tokenId });
            return result as unknown as RefreshTokenDocument | null;
        } catch (error) {
            logger.error(error as Error, "Failed to consume refresh token atomically", {
                context: "AdminRepository.consumeRefreshToken",
                tokenId,
            });
            throw error;
        }
    }
}