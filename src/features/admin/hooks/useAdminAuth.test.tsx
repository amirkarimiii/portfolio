// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import {
    useAdminSession,
    useAdminLogin,
    useAdminLogout,
    ADMIN_SESSION_QUERY_KEY,
} from './useAdminAuth';
import { getAdminSession, loginAdmin, logoutAdmin } from '@/features/admin/api/adminAuth';

vi.mock('@/features/admin/api/adminAuth', () => ({
    getAdminSession: vi.fn(),
    loginAdmin: vi.fn(),
    logoutAdmin: vi.fn(),
}));

describe('Admin Auth Hooks', () => {
    let queryClient: QueryClient;

    function Wrapper({ children }: { children: ReactNode }) {
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }
    Wrapper.displayName = 'QueryClientWrapper';

    const createWrapper = () => Wrapper;

    beforeEach(() => {
        vi.clearAllMocks();
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false },
            },
        });
    });

    afterEach(() => {
        queryClient.clear();
    });

    describe('useAdminSession', () => {
        it('should have a pending state before the request resolves', () => {
            vi.mocked(getAdminSession).mockReturnValue(new Promise(() => {}));

            const { result } = renderHook(() => useAdminSession(), {
                wrapper: createWrapper(),
            });

            expect(result.current.isPending).toBe(true);
        });

        it('should fetch and return admin session data successfully', async () => {
            const mockSession = { authenticated: true, expiresAt: 1798761599000 };
            vi.mocked(getAdminSession).mockResolvedValue(mockSession as never);

            const { result } = renderHook(() => useAdminSession(), {
                wrapper: createWrapper(),
            });

            await waitFor(() => expect(result.current.isSuccess).toBe(true));

            expect(result.current.data).toEqual(mockSession);
            expect(getAdminSession).toHaveBeenCalledTimes(1);
        });

        it('should expose isError when the session request fails', async () => {
            vi.mocked(getAdminSession).mockRejectedValue(new Error('unauthorized'));

            const { result } = renderHook(() => useAdminSession(), {
                wrapper: createWrapper(),
            });

            await waitFor(() => expect(result.current.isError).toBe(true));

            expect(result.current.data).toBeUndefined();
        });
    });

    describe('useAdminLogin', () => {
        it('should call loginAdmin and invalidate admin-session query on success', async () => {
            vi.mocked(loginAdmin).mockResolvedValue({ success: true } as never);
            const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

            const { result } = renderHook(() => useAdminLogin(), {
                wrapper: createWrapper(),
            });

            result.current.mutate('correct_password');

            await waitFor(() => expect(result.current.isSuccess).toBe(true));

            expect(loginAdmin).toHaveBeenCalledWith('correct_password');
            expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ADMIN_SESSION_QUERY_KEY });
        });

        it('should not invalidate the session query if login fails', async () => {
            vi.mocked(loginAdmin).mockRejectedValue(new Error('wrong password'));
            const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

            const { result } = renderHook(() => useAdminLogin(), {
                wrapper: createWrapper(),
            });

            result.current.mutate('wrong_password');

            await waitFor(() => expect(result.current.isError).toBe(true));

            expect(invalidateSpy).not.toHaveBeenCalled();
        });
    });

    describe('useAdminLogout', () => {
        it('should call logoutAdmin and invalidate admin-session query on success', async () => {
            vi.mocked(logoutAdmin).mockResolvedValue({ success: true } as never);
            const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

            const { result } = renderHook(() => useAdminLogout(), {
                wrapper: createWrapper(),
            });

            result.current.mutate();

            await waitFor(() => expect(result.current.isSuccess).toBe(true));

            expect(logoutAdmin).toHaveBeenCalledTimes(1);
            expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ADMIN_SESSION_QUERY_KEY });
        });

        it('should not invalidate the session query if logout fails', async () => {
            vi.mocked(logoutAdmin).mockRejectedValue(new Error('network error'));
            const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

            const { result } = renderHook(() => useAdminLogout(), {
                wrapper: createWrapper(),
            });

            result.current.mutate();

            await waitFor(() => expect(result.current.isError).toBe(true));

            expect(invalidateSpy).not.toHaveBeenCalled();
        });
    });
});