import clientPromise from "@/shared/lib/mongodb";
import {ObjectId} from "mongodb";

export interface AdminConfigDocument {
    _id: ObjectId;
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
            _id: new ObjectId('6a4012498a8251c60725be91')
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