import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';
import { AdminAuthService } from '@/features/admin/services/adminAuthService';
import { checkRateLimit } from '@/shared/lib/api/rateLimiter';

vi.mock('@/features/admin/services/adminAuthService', () => ({
    AdminAuthService: {
        login: vi.fn(),
    },
}));

vi.mock('@/shared/lib/api/rateLimiter', () => ({
    checkRateLimit: vi.fn(),
}));

vi.mock('@/shared/logger/logger', () => ({
    logger: {
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn(),
        debug: vi.fn(),
    },
}));

describe('POST /api/admin/login', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(checkRateLimit).mockReturnValue({
            success: true,
            remaining: 4,
            resetTime: Date.now() + 60000,
        });
    });

    it('should login successfully and set httpOnly cookies', async () => {
        vi.mocked(AdminAuthService.login).mockResolvedValue({
            accessToken: 'mock_access_token',
            refreshToken: 'mock_refresh_token',
        });

        const req = new NextRequest('http://localhost:3000/api/admin/login', {
            method: 'POST',
            body: JSON.stringify({ password: 'valid_password_123' }),
            headers: { 'content-type': 'application/json' },
        });

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.success).toBe(true);

        const accessTokenCookie = res.cookies.get('admin_access_token');
        const refreshTokenCookie = res.cookies.get('admin_refresh_token');

        expect(accessTokenCookie?.value).toBe('mock_access_token');
        expect(accessTokenCookie?.httpOnly).toBe(true);

        expect(refreshTokenCookie?.value).toBe('mock_refresh_token');
        expect(refreshTokenCookie?.httpOnly).toBe(true);
    });

    it('should return 401 when invalid credentials are provided', async () => {
        vi.mocked(AdminAuthService.login).mockRejectedValue(new Error('INVALID_CREDENTIALS'));

        const req = new NextRequest('http://localhost:3000/api/admin/login', {
            method: 'POST',
            body: JSON.stringify({ password: 'wrong_password_123' }),
            headers: { 'content-type': 'application/json' },
        });

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(401);
        expect(data.success).toBe(false);
        expect(data.error.code).toBe('INVALID_CREDENTIALS');
    });

    it('should return 500 when server config is missing', async () => {
        vi.mocked(AdminAuthService.login).mockRejectedValue(new Error('SERVER_CONFIG_MISSING'));

        const req = new NextRequest('http://localhost:3000/api/admin/login', {
            method: 'POST',
            body: JSON.stringify({ password: 'any_password_123' }),
            headers: { 'content-type': 'application/json' },
        });

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(500);
        expect(data.success).toBe(false);
        expect(data.error.code).toBe('SERVER_CONFIG_MISSING');
    });

    it('should return 429 when rate limit is exceeded', async () => {
        vi.mocked(checkRateLimit).mockReturnValue({
            success: false,
            remaining: 0,
            resetTime: Date.now() + 60000,
        });

        const req = new NextRequest('http://localhost:3000/api/admin/login', {
            method: 'POST',
            body: JSON.stringify({ password: 'any_password_123' }),
            headers: { 'content-type': 'application/json' },
        });

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(429);
        expect(data.success).toBe(false);
        expect(data.error.code).toBe('TOO_MANY_REQUESTS');
    });
});