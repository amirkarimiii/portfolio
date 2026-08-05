import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdminRepository, AdminConfigDocument, RefreshTokenDocument } from './adminRepository';
import clientPromise from '@/shared/lib/mongodb';
import { ADMIN_CONFIG_KEY } from '@/shared/constants/admin';

vi.mock('@/shared/lib/mongodb', () => ({
    default: Promise.resolve({
        db: vi.fn(),
    }),
}));

describe('AdminRepository', () => {
    const mockFindOne = vi.fn();
    const mockInsertOne = vi.fn();
    const mockDeleteOne = vi.fn();

    const mockCollection = vi.fn().mockImplementation(() => ({
        findOne: mockFindOne,
        insertOne: mockInsertOne,
        deleteOne: mockDeleteOne,
    }));

    const mockDb = {
        collection: mockCollection,
    };

    beforeEach(async () => {
        vi.clearAllMocks();
        const client = await clientPromise;
        vi.mocked(client.db).mockReturnValue(mockDb as unknown as ReturnType<typeof client.db>);
    });

    describe('getAdminConfig', () => {
        it('should return admin config document when present', async () => {
            const mockConfig: AdminConfigDocument = {
                key: ADMIN_CONFIG_KEY,
                passwordHash: '$2a$10$mockpasswordhash',
            };
            mockFindOne.mockResolvedValue(mockConfig);

            const result = await AdminRepository.getAdminConfig();

            expect(mockCollection).toHaveBeenCalledWith('adminConfig');
            expect(mockFindOne).toHaveBeenCalledWith({ key: ADMIN_CONFIG_KEY });
            expect(result).toEqual(mockConfig);
        });

        it('should return null when admin config is missing', async () => {
            mockFindOne.mockResolvedValue(null);

            const result = await AdminRepository.getAdminConfig();

            expect(mockCollection).toHaveBeenCalledWith('adminConfig');
            expect(mockFindOne).toHaveBeenCalledWith({ key: ADMIN_CONFIG_KEY });
            expect(result).toBeNull();
        });
    });

    describe('createRefreshToken', () => {
        it('should insert a new refresh token document into adminRefreshTokens collection', async () => {
            const tokenData: RefreshTokenDocument = {
                tokenId: 'token_123',
                adminId: 'admin_456',
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 1000000),
            };
            mockInsertOne.mockResolvedValue({ acknowledged: true });

            await AdminRepository.createRefreshToken(tokenData);

            expect(mockCollection).toHaveBeenCalledWith('adminRefreshTokens');
            expect(mockInsertOne).toHaveBeenCalledWith(tokenData);
        });
    });

    describe('findRefreshToken', () => {
        it('should find and return a refresh token by tokenId', async () => {
            const tokenData: RefreshTokenDocument = {
                tokenId: 'token_123',
                adminId: 'admin_456',
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 1000000),
            };
            mockFindOne.mockResolvedValue(tokenData);

            const result = await AdminRepository.findRefreshToken('token_123');

            expect(mockCollection).toHaveBeenCalledWith('adminRefreshTokens');
            expect(mockFindOne).toHaveBeenCalledWith({ tokenId: 'token_123' });
            expect(result).toEqual(tokenData);
        });

        it('should return null if refresh token is not found', async () => {
            mockFindOne.mockResolvedValue(null);

            const result = await AdminRepository.findRefreshToken('non_existing_token');

            expect(mockCollection).toHaveBeenCalledWith('adminRefreshTokens');
            expect(mockFindOne).toHaveBeenCalledWith({ tokenId: 'non_existing_token' });
            expect(result).toBeNull();
        });
    });

    describe('deleteRefreshToken', () => {
        it('should delete a refresh token by tokenId', async () => {
            mockDeleteOne.mockResolvedValue({ acknowledged: true, deletedCount: 1 });

            await AdminRepository.deleteRefreshToken('token_123');

            expect(mockCollection).toHaveBeenCalledWith('adminRefreshTokens');
            expect(mockDeleteOne).toHaveBeenCalledWith({ tokenId: 'token_123' });
        });
    });
});