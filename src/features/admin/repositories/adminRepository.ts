import clientPromise from "@/shared/lib/mongodb";
import { ADMIN_CONFIG_KEY } from "@/shared/constants/admin";

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
        const client = await clientPromise;
        return client.db();
    }

    static async getAdminConfig(): Promise<AdminConfigDocument | null> {
        const db = await this.getDb();
        return await db.collection<AdminConfigDocument>('adminConfig').findOne({
            key: ADMIN_CONFIG_KEY,
        });
    }

    static async createRefreshToken(tokenData: RefreshTokenDocument): Promise<void> {
        const db = await this.getDb();
        await db.collection<RefreshTokenDocument>('adminRefreshTokens').insertOne(tokenData);
    }

    static async findRefreshToken(tokenId: string): Promise<RefreshTokenDocument | null> {
        const db = await this.getDb();
        return db.collection<RefreshTokenDocument>('adminRefreshTokens').findOne({ tokenId });
    }

    static async deleteRefreshToken(tokenId: string): Promise<void> {
        const db = await this.getDb();
        await db.collection('adminRefreshTokens').deleteOne({ tokenId });
    }
}