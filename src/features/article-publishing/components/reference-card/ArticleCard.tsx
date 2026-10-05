'use client';

import React from 'react';
import { ArticleCardData } from "../../types/reference-card.type";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/shadcnUtils";
import { Badge } from "@/shared/components/ui/badge";
import { PublishedDropdown } from "@/features/article-publishing/components/dropdowns/PublishedDropdown";
import { ArchivedDropdown } from "@/features/article-publishing/components/dropdowns/ArchivedDropdown";
import { DraftedDropdown } from "@/features/article-publishing/components/dropdowns/DraftedDropdown";
import { CardLayout } from "./base/CardLayout";
import { CardThumbnail } from "./base/CardThumbnail";
import { useArticleCard } from "./hooks/useArticleCard";

interface ArticleCardProps {
    data: ArticleCardData;
    className?: string;
    selective?: boolean;
    origin: "publish" | "archive" | "draft" | "paper";
    target?: "_self" | "_blank";
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
                                                            data,
                                                            className,
                                                            origin,
                                                            selective = true,
                                                            target,
                                                        }) => {
    const {
        isAuthenticated,
        destinationRoute,
        effectiveTags,
        formattedDate,
        parentSeriesTitle,
    } = useArticleCard({ data, origin });

    const renderDropdown = (uniqueId: string) => {
        if (!isAuthenticated) return null;
        const dropdownMap: Record<string, React.ReactNode> = {
            publish: <PublishedDropdown uniqueId={uniqueId} />,
            archive: <ArchivedDropdown uniqueId={uniqueId} />,
            draft: <DraftedDropdown uniqueId={uniqueId} />,
        };
        return dropdownMap[origin] || null;
    };

    return (
        <CardLayout
            href={destinationRoute}
            selective={selective}
            target={target}
            className={className}
        >
            <CardThumbnail
                src={data.thumbnailImage}
                alt={data.thumbnailAltText || data.title}
                selective={selective}
            />

            <div className="flex flex-col justify-between p-3.5 sm:p-4 flex-1 min-w-0">
                <div>
                    <CardHeader className="p-0 mb-1.5 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex flex-col gap-1 min-w-0">
                                {data.seriesId && parentSeriesTitle && (
                                    <Badge
                                        variant="outline"
                                        className="text-[10px] px-1.5 py-0 font-medium border-primary/30 text-primary w-fit truncate"
                                    >
                                        {parentSeriesTitle}
                                    </Badge>
                                )}
                                <CardTitle
                                    className={cn(
                                        "text-sm sm:text-base md:text-lg font-semibold line-clamp-2 transition-colors",
                                        selective && "group-hover:text-primary"
                                    )}
                                >
                                    {data.title}
                                </CardTitle>
                            </div>

                            <div
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                                className="shrink-0"
                            >
                                {renderDropdown(data.uniqueId)}
                            </div>
                        </div>
                    </CardHeader>

                    {data.summary && (
                        <CardContent className="p-0 mt-1">
                            <CardDescription className="line-clamp-2 text-xs sm:text-sm text-muted-foreground">
                                {data.summary}
                            </CardDescription>
                        </CardContent>
                    )}
                </div>

                <CardFooter className="p-0 mt-3 flex flex-col items-start gap-2">
                    {effectiveTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 w-full">
                            {effectiveTags.map((tag) => (
                                <Badge
                                    key={tag.name}
                                    variant="outline"
                                    className="flex items-center select-none gap-1 px-2 py-0.5 text-[10px] font-normal"
                                >
                                    {tag.name}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {formattedDate && (
                        <span className="text-[10px] text-muted-foreground">
              {formattedDate}
            </span>
                    )}
                </CardFooter>
            </div>
        </CardLayout>
    );
};