import {JWTPayload, jwtVerify, SignJWT} from 'jose';
import { env } from '@/env';

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
        .setExpirationTime('15m')
        .sign(ACCESS_SECRET);
}


export async function signRefreshToken(adminId: string, tokenId: string): Promise<string> {
    return new SignJWT({ tokenId, type: 'refresh' })
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject(adminId)
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(REFRESH_SECRET);
}

export async function verifyAccessToken(token: string): Promise<AccessTokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, ACCESS_SECRET);
        if (payload.type !== 'access') return null;
        return payload as AccessTokenPayload;
    } catch {
        return null;
    }
}


export async function verifyRefreshToken(token: string): Promise<RefreshTokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, REFRESH_SECRET);
        if (payload.type !== 'refresh') return null;
        return payload as RefreshTokenPayload;
    } catch {
        return null;
    }
}

export function getAccessTokenRemainingSeconds(payload: AccessTokenPayload): number {
    if (!payload.exp) return 0;
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return payload.exp - nowInSeconds;
}