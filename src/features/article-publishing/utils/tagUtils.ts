export interface EffectiveTag {
    name: string;
    isInherited: boolean;
}

/**
 * Calculates the combined effective tags for an article considering its series membership.
 *
 * @param articleTags Array of manual tags assigned to the article (Array A)
 * @param seriesTags Array of default tags inherited from the selected series (Array B)
 * @returns Array of EffectiveTag objects containing tag name and inheritance status
 */
export function getEffectiveTags(
    articleTags: string[] = [],
    seriesTags: string[] = []
): EffectiveTag[] {
    const inheritedSet = new Set(seriesTags.map((t) => t.trim().toLowerCase()));
    const result: EffectiveTag[] = [];

    for (const tag of seriesTags) {
        const trimmed = tag.trim();
        if (trimmed) {
            result.push({
                name: trimmed,
                isInherited: true,
            });
        }
    }

    for (const tag of articleTags) {
        const trimmed = tag.trim();
        if (trimmed && !inheritedSet.has(trimmed.toLowerCase())) {
            result.push({
                name: trimmed,
                isInherited: false,
            });
        }
    }

    return result;
}