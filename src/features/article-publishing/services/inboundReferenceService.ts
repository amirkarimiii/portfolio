import { ArticleRepository } from '../repository/articleRepository';
import { SeriesRepository } from '../repository/seriesRepository';
import { logger } from '@/shared/logger/logger';

export type TargetType = 'article' | 'series';

export interface ReferenceSyncPayload {
    sourceArticleId: string;
    targetId: string;
    targetType: TargetType;
}

export class InboundReferenceService {

    public static async addReference(payload: ReferenceSyncPayload): Promise<void> {
        const { sourceArticleId, targetId, targetType } = payload;
        if (!sourceArticleId || !targetId) {
            logger.warn('Skipping addReference due to missing sourceArticleId or targetId', {
                context: 'InboundReferenceService.addReference',
                payload,
            });
            return;
        }

        try {
            if (targetType === 'article') {
                await ArticleRepository.addInboundReference(targetId, sourceArticleId);
            } else if (targetType === 'series') {
                await SeriesRepository.addInboundReference(targetId, sourceArticleId);
            }
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to add inbound reference',
                { context: 'InboundReferenceService.addReference', payload }
            );
        }
    }

    public static async removeReference(
        payload: ReferenceSyncPayload,
        remainingReferencesInDoc: { id: string; type: TargetType }[]
    ): Promise<void> {
        const { sourceArticleId, targetId, targetType } = payload;
        if (!sourceArticleId || !targetId) {
            logger.warn('Skipping removeReference due to missing sourceArticleId or targetId', {
                context: 'InboundReferenceService.removeReference',
                payload,
            });
            return;
        }

        try {
            const hasOtherOccurrence = remainingReferencesInDoc.some(
                (ref) => ref.id === targetId && ref.type === targetType
            );

            if (!hasOtherOccurrence) {
                if (targetType === 'article') {
                    await ArticleRepository.removeInboundReference(targetId, sourceArticleId);
                } else if (targetType === 'series') {
                    await SeriesRepository.removeInboundReference(targetId, sourceArticleId);
                }
            }
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to remove inbound reference',
                { context: 'InboundReferenceService.removeReference', payload }
            );
        }
    }

    public static async changeReference(
        sourceArticleId: string,
        oldTarget: { id: string; type: TargetType },
        newTarget: { id: string; type: TargetType },
        remainingReferencesInDoc: { id: string; type: TargetType }[]
    ): Promise<void> {
        try {
            await this.removeReference(
                {
                    sourceArticleId,
                    targetId: oldTarget.id,
                    targetType: oldTarget.type,
                },
                remainingReferencesInDoc
            );

            await this.addReference({
                sourceArticleId,
                targetId: newTarget.id,
                targetType: newTarget.type,
            });
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to change reference',
                { context: 'InboundReferenceService.changeReference', sourceArticleId, oldTarget, newTarget }
            );
        }
    }

    public static async cleanupAllReferencesFromSource(
        sourceArticleId: string,
        referencedTargets: { id: string; type: TargetType }[]
    ): Promise<void> {
        if (!sourceArticleId || !referencedTargets.length) return;

        try {
            const cleanupPromises = referencedTargets.map((target) => {
                if (target.type === 'article') {
                    return ArticleRepository.removeInboundReference(target.id, sourceArticleId);
                } else {
                    return SeriesRepository.removeInboundReference(target.id, sourceArticleId);
                }
            });

            await Promise.all(cleanupPromises);
        } catch (error) {
            logger.error(
                error as Error,
                'Failed to cleanup all references from source',
                { context: 'InboundReferenceService.cleanupAllReferencesFromSource', sourceArticleId, referencedTargetsCount: referencedTargets.length }
            );
        }
    }
}