import reservedSlugsData from '@/mock-files/reserved-slugs.json';

export const CLIENT_RESERVED_SLUGS = reservedSlugsData.slugs;

export function isReservedSlug(slug: string): boolean {
    const normalizedSlug = slug.trim().toLowerCase();
    return reservedSlugsData.slugs.includes(normalizedSlug);
}