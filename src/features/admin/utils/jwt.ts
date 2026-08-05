import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { env } from '@/env';
import { logger } from '@/shared/logger/logger';

const ACCESS_SECRET = new TextEncoder().encode(env.JWT_ACCESS_SECRET);
const REFRESH_SECRET = new TextEncoder().encode(env.JWT_REFRESH_SECRET);

export interface AccessTokenPayload extends JWTPayload {
    sub: string;
    role: string;
    type: 'access';
}

export interface RefreshTokenPayload extends JWTPayload {
    sub: string;
    tokenId: string;
    type: 'refresh';
}

export async function signAccessToken(adminId: string): Promise<string> {
    return new SignJWT({ role: 'admin', type: 'access' })
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject(adminId)
        .setIssuedAt()
        .setExpirationTime(env.JWT_ACCESS_EXPIRES_IN)
        .sign(ACCESS_SECRET);
}

export async function signRefreshToken(adminId: string, tokenId: string): Promise<string> {
    return new SignJWT({ tokenId, type: 'refresh' })
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject(adminId)
        .setIssuedAt()
        .setExpirationTime(env.JWT_REFRESH_EXPIRES_IN)
        .sign(REFRESH_SECRET);
}

export async function verifyAccessToken(token: string): Promise<AccessTokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, ACCESS_SECRET);
        if (payload.type !== 'access') {
            logger.warn('JWT verification failed: Token type is not access');
            return null;
        }
        return payload as AccessTokenPayload;
    } catch (err) {
        logger.debug('Access token verification failed or expired', {
            error: err instanceof Error ? err.message : String(err),
        });
        return null;
    }
}

export async function verifyRefreshToken(token: string): Promise<RefreshTokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, REFRESH_SECRET);
        if (payload.type !== 'refresh') {
            logger.warn('JWT verification failed: Token type is not refresh');
            return null;
        }
        return payload as RefreshTokenPayload;
    } catch (err) {
        logger.debug('Refresh token verification failed or expired', {
            error: err instanceof Error ? err.message : String(err),
        });
        return null;
    }
}

export function getAccessTokenRemainingSeconds(payload: AccessTokenPayload): number {
    if (!payload.exp) return 0;
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return payload.exp - nowInSeconds;
}