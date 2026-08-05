import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { AdminAuthService } from './adminAuthService';
import { AdminRepository, AdminConfigDocument } from '../repositories/adminRepository';
import { signAccessToken, signRefreshToken } from '../utils/jwt';

vi.mock('../repositories/adminRepository', () => ({
    AdminRepository: {
        getAdminConfig: vi.fn(),
        createRefreshToken: vi.fn(),
        findRefreshToken: vi.fn(),
        deleteRefreshToken: vi.fn(),
    },
}));

vi.mock('bcryptjs', () => ({
    default: {
        compare: vi.fn(),
    },
}));

vi.mock('@/shared/logger/logger', () => ({
    logger: {
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn(),
        debug: vi.fn(),
    },
}));

describe('AdminAuthService', () => {
    const mockAdminObjectId = new ObjectId();
    const mockAdminId = mockAdminObjectId.toString();
    const mockPassword = 'correct_password';

    const mockAdminConfig: AdminConfigDocument = {
        key: mockAdminId,
        passwordHash: '$2a$10$hashedpassword',
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('login', () => {
        it('should login successfully and return access and refresh tokens', async () => {
            vi.mocked(AdminRepository.getAdminConfig).mockResolvedValue(mockAdminConfig);
            vi.mocked(bcrypt.compare).mockResolvedValue(true as unknown as never);
            vi.mocked(AdminRepository.createRefreshToken).mockResolvedValue();

            const result = await AdminAuthService.login(mockPassword);

            expect(result.accessToken).toBeDefined();
            expect(result.refreshToken).toBeDefined();
            expect(AdminRepository.createRefreshToken).toHaveBeenCalledTimes(1);
        });

        it('should throw SERVER_CONFIG_MISSING when admin config does not exist', async () => {
            vi.mocked(AdminRepository.getAdminConfig).mockResolvedValue(null);

            await expect(AdminAuthService.login(mockPassword)).rejects.toThrow('SERVER_CONFIG_MISSING');
        });

        it('should throw INVALID_CREDENTIALS when password is wrong', async () => {
            vi.mocked(AdminRepository.getAdminConfig).mockResolvedValue(mockAdminConfig);
            vi.mocked(bcrypt.compare).mockResolvedValue(false as unknown as never);

            await expect(AdminAuthService.login('wrong_password')).rejects.toThrow('INVALID_CREDENTIALS');
        });
    });

    describe('logout', () => {
        it('should revoke session when a valid refresh token is provided', async () => {
            const tokenId = 'valid_token_id';
            const refreshToken = await signRefreshToken(mockAdminId, tokenId);
            vi.mocked(AdminRepository.deleteRefreshToken).mockResolvedValue();

            await AdminAuthService.logout(refreshToken);

            expect(AdminRepository.deleteRefreshToken).toHaveBeenCalledWith(tokenId);
        });

        it('should do nothing and resolve safely when no refresh token is provided', async () => {
            await expect(AdminAuthService.logout(undefined)).resolves.not.toThrow();
            expect(AdminRepository.deleteRefreshToken).not.toHaveBeenCalled();
        });

        it('should not call deleteRefreshToken if refresh token is invalid', async () => {
            await AdminAuthService.logout('invalid_token');

            expect(AdminRepository.deleteRefreshToken).not.toHaveBeenCalled();
        });
    });

    describe('validateOrRefreshSession', () => {
        it('should return authenticated: true without refreshing if access token is valid and fresh', async () => {
            const accessToken = await signAccessToken(mockAdminId);

            const result = await AdminAuthService.validateOrRefreshSession(accessToken);

            expect(result.authenticated).toBe(true);
            expect(result.refreshed).toBeUndefined();
            expect(result.expiresAt).toBeDefined();
        });

        it('should return authenticated: false when no tokens are provided', async () => {
            const result = await AdminAuthService.validateOrRefreshSession();

            expect(result.authenticated).toBe(false);
        });

        it('should refresh session successfully when access token is missing/expired but refresh token is valid in DB', async () => {
            const oldTokenId = 'old_token_id';
            const refreshToken = await signRefreshToken(mockAdminId, oldTokenId);

            vi.mocked(AdminRepository.findRefreshToken).mockResolvedValue({
                tokenId: oldTokenId,
                adminId: mockAdminId,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 100000),
            });

            vi.mocked(AdminRepository.deleteRefreshToken).mockResolvedValue();
            vi.mocked(AdminRepository.createRefreshToken).mockResolvedValue();

            const result = await AdminAuthService.validateOrRefreshSession(undefined, refreshToken);

            expect(result.authenticated).toBe(true);
            expect(result.refreshed).toBe(true);
            expect(result.accessToken).toBeDefined();
            expect(result.refreshToken).toBeDefined();
            expect(AdminRepository.deleteRefreshToken).toHaveBeenCalledWith(oldTokenId);
            expect(AdminRepository.createRefreshToken).toHaveBeenCalledTimes(1);
        });

        it('should delete expired refresh token and return authenticated: false if token expired in DB', async () => {
            const expiredTokenId = 'expired_token_id';
            const refreshToken = await signRefreshToken(mockAdminId, expiredTokenId);

            vi.mocked(AdminRepository.findRefreshToken).mockResolvedValue({
                tokenId: expiredTokenId,
                adminId: mockAdminId,
                createdAt: new Date(Date.now() - 200000),
                expiresAt: new Date(Date.now() - 100000),
            });

            vi.mocked(AdminRepository.deleteRefreshToken).mockResolvedValue();

            const result = await AdminAuthService.validateOrRefreshSession(undefined, refreshToken);

            expect(result.authenticated).toBe(false);
            expect(AdminRepository.deleteRefreshToken).toHaveBeenCalledWith(expiredTokenId);
        });
    });
});