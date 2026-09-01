"use server";

import { InboundReferenceService, TargetType } from "@/features/article-publishing/services/inboundReferenceService";
import { logger } from "@/shared/logger/logger";

export async function addInboundReferenceAction(payload: {
    sourceArticleId: string;
    targetId: string;
    targetType: TargetType;
}) {
    if (!payload?.sourceArticleId || !payload?.targetId) {
        logger.warn('addInboundReferenceAction called with missing parameters', {
            context: 'addInboundReferenceAction',
            payload,
        });
        return;
    }

    try {
        await InboundReferenceService.addReference(payload);
    } catch (error) {
        logger.error(
            error as Error,
            'Failed to execute addInboundReferenceAction',
            { context: 'addInboundReferenceAction', payload }
        );
    }
}

export async function removeInboundReferenceAction(
    payload: {
        sourceArticleId: string;
        targetId: string;
        targetType: TargetType;
    },
    remainingReferencesInDoc: { id: string; type: TargetType }[]
) {
    if (!payload?.sourceArticleId || !payload?.targetId) {
        logger.warn('removeInboundReferenceAction called with missing parameters', {
            context: 'removeInboundReferenceAction',
            payload,
        });
        return;
    }

    try {
        await InboundReferenceService.removeReference(payload, remainingReferencesInDoc);
    } catch (error) {
        logger.error(
            error as Error,
            'Failed to execute removeInboundReferenceAction',
            { context: 'removeInboundReferenceAction', payload }
        );
    }
}

export async function changeInboundReferenceAction(
    sourceArticleId: string,
    oldTarget: { id: string; type: TargetType },
    newTarget: { id: string; type: TargetType },
    remainingReferencesInDoc: { id: string; type: TargetType }[]
) {
    if (!sourceArticleId || !oldTarget?.id || !newTarget?.id) {
        logger.warn('changeInboundReferenceAction called with missing parameters', {
            context: 'changeInboundReferenceAction',
            sourceArticleId,
            oldTarget,
            newTarget,
        });
        return;
    }

    try {
        await InboundReferenceService.changeReference(
            sourceArticleId,
            oldTarget,
            newTarget,
            remainingReferencesInDoc
        );
    } catch (error) {
        logger.error(
            error as Error,
            'Failed to execute changeInboundReferenceAction',
            { context: 'changeInboundReferenceAction', sourceArticleId, oldTarget, newTarget }
        );
    }
}