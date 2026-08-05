import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    getAccessTokenRemainingSeconds,
    AccessTokenPayload,
} from './jwt';

vi.mock('@/shared/logger/logger', () => ({
    logger: {
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn(),
        debug: vi.fn(),
    },
}));

describe('JWT Utilities', () => {
    const mockAdminId = 'admin_12345';
    const mockTokenId = 'refresh_token_id_999';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('signAccessToken & verifyAccessToken', () => {
        it('should sign a valid access token and verify it correctly', async () => {
            const token = await signAccessToken(mockAdminId);
            expect(typeof token).toBe('string');
            expect(token.length).toBeGreaterThan(0);

            const payload = await verifyAccessToken(token);
            expect(payload).not.toBeNull();
            expect(payload?.sub).toBe(mockAdminId);
            expect(payload?.role).toBe('admin');
            expect(payload?.type).toBe('access');
            expect(payload?.exp).toBeDefined();
        });

        it('should return null for an invalid or tampered access token', async () => {
            const invalidToken = 'invalid.jwt.token';
            const payload = await verifyAccessToken(invalidToken);
            expect(payload).toBeNull();
        });

        it('should return null when trying to verify a refresh token with access secret', async () => {
            const refreshToken = await signRefreshToken(mockAdminId, mockTokenId);
            const payload = await verifyAccessToken(refreshToken);
            expect(payload).toBeNull();
        });
    });

    describe('signRefreshToken & verifyRefreshToken', () => {
        it('should sign a valid refresh token and verify it correctly', async () => {
            const token = await signRefreshToken(mockAdminId, mockTokenId);
            expect(typeof token).toBe('string');
            expect(token.length).toBeGreaterThan(0);

            const payload = await verifyRefreshToken(token);
            expect(payload).not.toBeNull();
            expect(payload?.sub).toBe(mockAdminId);
            expect(payload?.tokenId).toBe(mockTokenId);
            expect(payload?.type).toBe('refresh');
            expect(payload?.exp).toBeDefined();
        });

        it('should return null for an invalid or tampered refresh token', async () => {
            const invalidToken = 'tampered.refresh.token';
            const payload = await verifyRefreshToken(invalidToken);
            expect(payload).toBeNull();
        });

        it('should return null when trying to verify an access token with refresh secret', async () => {
            const accessToken = await signAccessToken(mockAdminId);
            const payload = await verifyRefreshToken(accessToken);

            expect(payload).toBeNull();
        });
    });

    describe('getAccessTokenRemainingSeconds', () => {
        it('should return remaining seconds correctly when exp is in the future', () => {
            const nowInSeconds = Math.floor(Date.now() / 1000);
            const mockPayload: AccessTokenPayload = {
                sub: mockAdminId,
                role: 'admin',
                type: 'access',
                exp: nowInSeconds + 60,
            };

            const remaining = getAccessTokenRemainingSeconds(mockPayload);
            expect(remaining).toBeGreaterThanOrEqual(59);
            expect(remaining).toBeLessThanOrEqual(60);
        });

        it('should return 0 or negative value when exp is in the past', () => {
            const nowInSeconds = Math.floor(Date.now() / 1000);
            const mockPayload: AccessTokenPayload = {
                sub: mockAdminId,
                role: 'admin',
                type: 'access',
                exp: nowInSeconds - 10,
            };

            const remaining = getAccessTokenRemainingSeconds(mockPayload);
            expect(remaining).toBeLessThanOrEqual(0);
        });

        it('should return 0 when exp field is missing', () => {
            const mockPayload: AccessTokenPayload = {
                sub: mockAdminId,
                role: 'admin',
                type: 'access',
            };

            const remaining = getAccessTokenRemainingSeconds(mockPayload);
            expect(remaining).toBe(0);
        });
    });
});