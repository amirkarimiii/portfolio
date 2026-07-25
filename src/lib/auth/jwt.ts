import {JWTPayload, SignJWT} from 'jose';
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

