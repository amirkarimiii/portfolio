'use client';

import React from 'react';
import { Layers } from 'lucide-react';
import { SeriesCardData } from "@/features/article-publishing/types/reference-card.type";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/shadcnUtils";
import { Badge } from "@/shared/components/ui/badge";
import { CardLayout } from "./base/CardLayout";
import { CardThumbnail } from "./base/CardThumbnail";

interface SeriesCardProps {
    data: SeriesCardData;
    className?: string;
    selective?: boolean;
    target?: "_self" | "_blank";
}

export const SeriesCard: React.FC<SeriesCardProps> = ({
                                                          data,
                                                          className,
                                                          selective = true,
                                                          target,
                                                      }) => {
    return (
        <CardLayout
            href={`/series/${data.slug}`}
            selective={selective}
            target={target}
            className={className}
        >
            <CardThumbnail
                src={data.thumbnailImage}
                alt={data.thumbnailAltText || data.title}
                selective={selective}
            >
                <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm p-1.5 rounded-md shadow-sm border">
                    <Layers className="w-3.5 h-3.5 text-primary" />
                </div>
            </CardThumbnail>

            <div className="flex flex-col justify-between p-3.5 sm:p-4 flex-1 min-w-0">
                <div>
                    <CardHeader className="p-0 mb-1.5">
                        <CardTitle
                            className={cn(
                                "text-sm sm:text-base md:text-lg font-semibold line-clamp-2 transition-colors",
                                selective && "group-hover:text-primary"
                            )}
                        >
                            {data.title}
                        </CardTitle>
                    </CardHeader>

                    {data.description && (
                        <CardContent className="p-0">
                            <CardDescription className="line-clamp-2 text-xs sm:text-sm text-muted-foreground">
                                {data.description}
                            </CardDescription>
                        </CardContent>
                    )}
                </div>

                {data.defaultTags && data.defaultTags.length > 0 && (
                    <CardFooter className="p-0 mt-3 flex flex-wrap gap-1">
                        {data.defaultTags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="outline"
                                className="flex items-center select-none gap-1 px-2 py-0.5 text-[10px] font-normal"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </CardFooter>
                )}
            </div>
        </CardLayout>
    );
};