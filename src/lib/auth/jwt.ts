import { JWTPayload } from 'jose';
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