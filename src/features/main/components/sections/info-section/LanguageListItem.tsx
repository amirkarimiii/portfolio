import {BookOpenText, NotebookPen, Ear, Speech} from "lucide-react";

type LanguageListItemProps = {
    kind: 'reading' | 'writing' | 'listening' | 'speaking';
    level: string
    evidence?: string | string[];
    note?: string;
};

const SKILL_CONFIG = {
    reading: {
        icon: BookOpenText,
        label: "Reading",
    },
    writing: {
        icon: NotebookPen,
        label: "Writing",
    },
    listening: {
        icon: Ear,
        label: "Listening",
    },
    speaking: {
        icon: Speech,
        label: "Speaking",
    },
} as const;

export function LanguageListItem({kind, level, evidence, note}: LanguageListItemProps) {
    const config = SKILL_CONFIG[kind];
    const Icon = config.icon;

    const evidenceList = Array.isArray(evidence)
        ? evidence
        : evidence
            ? [evidence]
            : [];

    return (
        <div className="flex flex-col items-start gap-3 py-2">
            <div className="flex flex-row gap-1 py-1 px-2 rounded-lg bg-muted text-muted-foreground shrink-0">
                <div className="w-4 aspect-square">
                    <Icon/>
                </div>
                <span className="font-medium text-sm capitalize mb-0.5">{config.label}: {level}</span>
            </div>
            <div className="flex flex-col gap-1">
                {note && (
                    <p className="text-sm text-foreground">
                        {note}
                    </p>
                )}
                {evidenceList.length > 0 && (
                    <div className="flex flex-col gap-1 mt-0.5">
                        {evidenceList.map((item, index) => (
                            <p key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                                <span className="shrink-0">💡</span>
                                <span>{item}</span>
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}