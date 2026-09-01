"use client"

import React from 'react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import {ArticleCardData, SeriesCardData} from "../../types/reference-card.type";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {cn} from "@/shared/utils/shadcnUtils";
import {Badge} from "@/shared/components/ui/badge";
import seriesData from "@/mock-files/new-series.json";
import {PublishedDropdown} from "@/features/article-publishing/components/dropdowns/PublishedDropdown";
import {ArchivedDropdown} from "@/features/article-publishing/components/dropdowns/ArchivedDropdown";
import {getEffectiveTags} from "@/features/article-publishing/utils/tagUtils";
import {DraftedDropdown} from "@/features/article-publishing/components/dropdowns/DraftedDropdown";
import {useAdminSession} from "@/features/admin/hooks/useAdminAuth";


interface ArticleCardProps {
    data: ArticleCardData;
    className?: string;
    selective?: boolean;
    origin: "publish" | "archive" | "draft" | "paper"
    target?: "_self" | "_blank"
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
                                                            data,
                                                            className,
                                                            origin,
                                                            selective = true,
                                                            target
                                                        }) => {

    const router = useRouter();

    const { data: session } = useAdminSession();

    const seriesObjects = (seriesData as { series: SeriesCardData[] })?.series || [];

    const parentSeries = seriesObjects.find((series) => series.uniqueId === data.seriesId);

    const destinationRoute = React.useMemo(() => {
        if (origin === "archive") {
            return `/admin/articles/archive/${data.uniqueId}`;
        }
        return data.seriesId && parentSeries?.slug
            ? `/series/${parentSeries.slug}/${data.slug}`
            : `/blog/${data.slug}`;
    }, [origin, data.uniqueId, data.seriesId, data.slug, parentSeries?.slug]);

    const effectiveTags = React.useMemo(
        () => getEffectiveTags(data.tags, parentSeries?.defaultTags || []),
        [data.tags, parentSeries]
    );

    const rawDate = data.firstPublishedAt || data.publishedAt;
    const parsedDate = rawDate ? new Date(rawDate) : null;

    const formattedDate = parsedDate && !isNaN(parsedDate.getTime())
        ? parsedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
        : null;

    const style = `overflow-hidden h-42 transition-all duration-200 ${selective ? "hover:shadow-md hover:border-primary/50" : ""} flex flex-row p-0 w-2xl`;

    const navigate = () => {
        if (!selective) return;
        if (target === "_blank") {
            window.open(destinationRoute, "_blank");
        } else {
            router.push(destinationRoute);
        }
    };

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('[data-no-card-navigate]')) {
            return;
        }
        navigate();
    };

    const handleCardKeyDown = (e: React.KeyboardEvent) => {
        if ((e.target as HTMLElement).closest('[data-no-card-navigate]')) {
            return;
        }
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate();
        }
    };

    const renderDropdown = (uniqueId: string) => {
        const dropdownMap: Record<string, React.ReactNode> = {
            publish: <PublishedDropdown uniqueId={uniqueId}/>,
            archive: <ArchivedDropdown uniqueId={uniqueId}/>,
            draft: <DraftedDropdown uniqueId={uniqueId}/>
        };
        if (!session?.authenticated) return null;
        return   dropdownMap[origin] || null;
    };

    return (
        <div
            className="block group"
            role={selective ? "link" : undefined}
            aria-disabled={!selective}
            tabIndex={selective ? 0 : -1}
            onClick={handleCardClick}
            onKeyDown={handleCardKeyDown}
        >
            <Card
                className={cn(
                    style,
                    selective && "cursor-pointer",
                    className
                )}
            >
                <div className="relative h-full shrink-0 bg-muted aspect-square overflow-hidden">
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
                            <div
                                className={`flex ${origin === "paper" ? "flex-row" : "flex-row-reverse"} justify-between`}>
                                {renderDropdown(data.uniqueId)}
                                {data.seriesId && parentSeries?.title && (
                                    <Badge
                                        variant="outline"
                                        className="text-[10px] px-1.5 py-0 font-medium border-primary/30 text-primary my-auto block"
                                    >
                                        {parentSeries.title}
                                    </Badge>
                                )}
                            </div>
                            <CardTitle
                                className={`text-base ${selective && "group-hover:text-primary"} transition-colors line-clamp-1`}>
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
                            {effectiveTags.map((tag) => (
                                <Badge
                                    key={tag.name}
                                    variant="outline"
                                    className="flex items-center select-none gap-1.5 px-2.5 py-0.5 text-[10px]"
                                >
                                    {tag.name}
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
        </div>
    );
};
