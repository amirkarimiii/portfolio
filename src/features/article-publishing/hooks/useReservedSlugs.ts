'use client';

import { useQuery } from '@tanstack/react-query';
import { getReservedSlugsAction } from '../actions/reserveSlugsAction';

export function useReservedSlugs() {
    return useQuery<string[]>({
        queryKey: ['reservedSlugs'],
        queryFn: async () => await getReservedSlugsAction(),
        staleTime: 1000 * 60 * 60, // 1 hour caching
    });
}