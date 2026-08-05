import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { AdminRepository } from "../repositories/adminRepository";
import {
    getAccessTokenRemainingSeconds,
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
} from "../utils/jwt";
import { logger } from "@/shared/logger/logger";

export interface LoginResult {
    accessToken: string;
    refreshToken: string;
}

export interface SessionResult {
    authenticated: boolean;
    refreshed?: boolean;
    expiresAt?: string;
    accessToken?: string;
    refreshToken?: string;
}

export class AdminAuthService {

    static async login(password: string): Promise<LoginResult> {
        const config = await AdminRepository.getAdminConfig();

        if (!config || !config.passwordHash) {
            throw new Error("SERVER_CONFIG_MISSING");
        }

        const isPasswordValid = await bcrypt.compare(password, config.passwordHash);
        if (!isPasswordValid) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const adminId = config.key.toString();
        const tokenId = uuidv4();
        const createdAt = new Date();
        const expiresAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);

        await AdminRepository.createRefreshToken({
            tokenId,
            adminId,
            createdAt,
            expiresAt,
        });

        const accessToken = await signAccessToken(adminId);
        const refreshToken = await signRefreshToken(adminId, tokenId);

        return { accessToken, refreshToken };
    }

    static async logout(refreshTokenStr?: string): Promise<void> {
        if (!refreshTokenStr) {
            logger.debug('Logout initiated without refresh token');
            return;
        }

        const refreshPayload = await verifyRefreshToken(refreshTokenStr);
        if (refreshPayload?.tokenId) {
            await AdminRepository.deleteRefreshToken(refreshPayload.tokenId);
            logger.info('Admin session revoked on logout', { tokenId: refreshPayload.tokenId });
        } else {
            logger.warn('Logout attempted with invalid or expired refresh token');
        }
    }

    static async validateOrRefreshSession(
        accessTokenStr?: string,
        refreshTokenStr?: string
    ): Promise<SessionResult> {
        if (accessTokenStr) {
            const payload = await verifyAccessToken(accessTokenStr);
            if (payload) {
                const remainingSeconds = getAccessTokenRemainingSeconds(payload);

                if (remainingSeconds > 180) {
                    return {
                        authenticated: true,
                        expiresAt: new Date(payload.exp! * 1000).toISOString(),
                    };
                }
            }
        }

        if (!refreshTokenStr) {
            return { authenticated: false };
        }

        const refreshPayload = await verifyRefreshToken(refreshTokenStr);
        if (!refreshPayload || !refreshPayload.tokenId) {
            return { authenticated: false };
        }

        const storedToken = await AdminRepository.findRefreshToken(refreshPayload.tokenId);

        if (!storedToken || new Date() > new Date(storedToken.expiresAt)) {
            if (storedToken) {
                await AdminRepository.deleteRefreshToken(refreshPayload.tokenId);
                logger.info('Expired refresh token cleaned up during session validation', {
                    tokenId: refreshPayload.tokenId,
                });
            }
            return { authenticated: false };
        }

        await AdminRepository.deleteRefreshToken(refreshPayload.tokenId);

        const adminId = refreshPayload.sub!;
        const newTokenId = uuidv4();
        const createdAt = new Date();
        const expiresAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);

        await AdminRepository.createRefreshToken({
            tokenId: newTokenId,
            adminId,
            createdAt,
            expiresAt,
        });

        const newAccessToken = await signAccessToken(adminId);
        const newRefreshToken = await signRefreshToken(adminId, newTokenId);

        logger.info('Admin session refreshed successfully', { adminId, oldTokenId: refreshPayload.tokenId, newTokenId });

        return {
            authenticated: true,
            refreshed: true,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
}