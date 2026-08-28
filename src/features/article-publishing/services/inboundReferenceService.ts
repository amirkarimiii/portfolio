import { ArticleRepository } from '../repository/articleRepository';
import { SeriesRepository } from '../repository/seriesRepository';

export type TargetType = 'article' | 'series';

export interface ReferenceSyncPayload {
    sourceArticleId: string;
    targetId: string;
    targetType: TargetType;
}

export class InboundReferenceService {

    public static async addReference(payload: ReferenceSyncPayload): Promise<void> {
        const { sourceArticleId, targetId, targetType } = payload;
        if (!sourceArticleId || !targetId) return;

        if (targetType === 'article') {
            await ArticleRepository.addInboundReference(targetId, sourceArticleId);
        } else if (targetType === 'series') {
            await SeriesRepository.addInboundReference(targetId, sourceArticleId);
        }
    }


    public static async removeReference(
        payload: ReferenceSyncPayload,
        remainingReferencesInDoc: { id: string; type: TargetType }[]
    ): Promise<void> {
        const { sourceArticleId, targetId, targetType } = payload;
        if (!sourceArticleId || !targetId) return;

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
    }

    public static async changeReference(
        sourceArticleId: string,
        oldTarget: { id: string; type: TargetType },
        newTarget: { id: string; type: TargetType },
        remainingReferencesInDoc: { id: string; type: TargetType }[]
    ): Promise<void> {
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
    }

    public static async cleanupAllReferencesFromSource(
        sourceArticleId: string,
        referencedTargets: { id: string; type: TargetType }[]
    ): Promise<void> {
        if (!sourceArticleId || !referencedTargets.length) return;

        const cleanupPromises = referencedTargets.map((target) => {
            if (target.type === 'article') {
                return ArticleRepository.removeInboundReference(target.id, sourceArticleId);
            } else {
                return SeriesRepository.removeInboundReference(target.id, sourceArticleId);
            }
        });

        await Promise.all(cleanupPromises);
    }
}