"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {ArticleCardData} from "../../types/reference-card.type";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {cn} from "@/shared/utils/shadcnUtils";
import {Badge} from "@/shared/components/ui/badge";

interface ArticleCardProps {
    data: ArticleCardData;
    className?: string;
    selective?: boolean;
    target?: "_self" | "_blank"
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
                                                            data,
                                                            className,
                                                            selective = true,
                                                            target
                                                        }) => {
    const destinationRoute =
        data.seriesId && data.seriesSlug
            ? `/series/${data.seriesSlug}/${data.slug}`
            : `/blog/${data.slug}`;

    const rawDate = data.firstPublishedAt || data.publishedAt;

    const style = `overflow-hidden transition-all duration-200 ${selective && "hover:shadow-md hover:border-primary/50"} flex flex-row p-0 w-xl`

    const formattedDate = rawDate
        ? new Date(rawDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
        : null;

    return (
        <Link
            href={destinationRoute}
            className="block group"
            aria-disabled={!selective}
            tabIndex={selective ? 0 : -1}
            onClick={(e) => {
                if (!selective) {
                    e.preventDefault();
                }
            }}
            target={target}
        >
            <Card
                className={cn(
                    style,
                    className
                )}
            >
                <div className="relative h-36 w-36 shrink-0 bg-muted aspect-square overflow-hidden">
                    <Image
                        src={data.thumbnailImage}
                        alt={data.thumbnailAltText || data.title}
                        fill
                        className={`object-cover transition-transform duration-300 ${selective && "group-hover:scale-105"} `}
                    />
                </div>

                <div className="flex flex-col justify-between p-4 flex-1 min-w-0">
                    <div>
                        <CardHeader className="p-0 mb-1.5 space-y-1">
                            {data.seriesId && data.seriesTitle && (
                                <Badge
                                    variant="outline"
                                    className="text-[10px] px-1.5 py-0 font-medium border-primary/30 text-primary"
                                >
                                    {data.seriesTitle}
                                </Badge>
                            )}

                            <CardTitle className={`text-base ${selective && "group-hover:text-primary"} transition-colors line-clamp-1`}>
                                {data.title}
                            </CardTitle>
                        </CardHeader>

                        {data.summary && (
                            <CardContent className="p-0">
                                <CardDescription className="line-clamp-2 text-xs">
                                    {data.summary}
                                </CardDescription>
                            </CardContent>
                        )}
                    </div>

                    <CardFooter className="p-0 mt-3 flex flex-col items-start gap-1.5">
                        <div className="flex flex-wrap gap-1 w-full">
                            {data.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="outline"
                                    className="flex items-center select-none gap-1.5 px-2.5 py-0.5 text-[10px]"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {formattedDate && (
                            <span className="text-[10px] text-muted-foreground">
                                {formattedDate}
                            </span>
                        )}
                    </CardFooter>
                </div>
            </Card>
        </Link>
    );
};