"use server";

import { InboundReferenceService, TargetType } from "@/features/article-publishing/services/inboundReferenceService";

export async function addInboundReferenceAction(payload: {
    sourceArticleId: string;
    targetId: string;
    targetType: TargetType;
}) {
    await InboundReferenceService.addReference(payload);
}

export async function removeInboundReferenceAction(
    payload: {
        sourceArticleId: string;
        targetId: string;
        targetType: TargetType;
    },
    remainingReferencesInDoc: { id: string; type: TargetType }[]
) {
    await InboundReferenceService.removeReference(payload, remainingReferencesInDoc);
}

export async function changeInboundReferenceAction(
    sourceArticleId: string,
    oldTarget: { id: string; type: TargetType },
    newTarget: { id: string; type: TargetType },
    remainingReferencesInDoc: { id: string; type: TargetType }[]
) {
    await InboundReferenceService.changeReference(
        sourceArticleId,
        oldTarget,
        newTarget,
        remainingReferencesInDoc
    );
}