import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from './middleware';
import { signAccessToken } from '@/features/admin/utils/jwt';

vi.mock('@/shared/logger/logger', () => ({
    logger: {
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn(),
        debug: vi.fn(),
    },
}));

describe('Admin Middleware', () => {
    const mockAdminId = 'admin_sub_id_777';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should bypass middleware for public admin routes', async () => {
        const loginReq = new NextRequest('http://localhost:3000/api/admin/login');
        const sessionReq = new NextRequest('http://localhost:3000/api/admin/session');

        const loginRes = await middleware(loginReq);
        const sessionRes = await middleware(sessionReq);

        expect(loginRes.status).toBe(200);
        expect(sessionRes.status).toBe(200);
    });

    it('should return 401 status when access token cookie is missing', async () => {
        const req = new NextRequest('http://localhost:3000/api/admin/dashboard');

        const res = await middleware(req);
        const data = await res.json();

        expect(res.status).toBe(401);
        expect(data.success).toBe(false);
        expect(data.error.code).toBe('UNAUTHORIZED');
    });

    it('should return 401 status when access token is invalid or tampered', async () => {
        const req = new NextRequest('http://localhost:3000/api/admin/dashboard');
        req.cookies.set('admin_access_token', 'invalid_tampered_token');

        const res = await middleware(req);
        const data = await res.json();

        expect(res.status).toBe(401);
        expect(data.success).toBe(false);
        expect(data.error.message).toBe('Invalid or expired access token');
    });

    it('should allow request and inject x-admin-id header when access token is valid', async () => {
        const validAccessToken = await signAccessToken(mockAdminId);

        const req = new NextRequest('http://localhost:3000/api/admin/dashboard');
        req.cookies.set('admin_access_token', validAccessToken);

        const res = await middleware(req);

        expect(res.status).toBe(200);
        const adminIdHeader = res.headers.get('x-middleware-request-x-admin-id');
        expect(adminIdHeader).toBe(mockAdminId);
    });
});