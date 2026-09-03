'use server';

import { ReserveSlugsService } from '../services/reserveSlugsService';

export async function isReservedSlugAction(slug: string): Promise<boolean> {
    return await ReserveSlugsService.isReservedSlug(slug);
}

export async function getReservedSlugsAction(): Promise<string[]> {
    return await ReserveSlugsService.getReservedSlugs();
}