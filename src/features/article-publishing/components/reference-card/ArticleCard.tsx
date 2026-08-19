"use client"

import React from 'react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import {ArticleCardData, SeriesCardData} from "../../types/reference-card.type";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {cn} from "@/shared/utils/shadcnUtils";
import {Badge} from "@/shared/components/ui/badge";
import seriesData from "@/mock-files/series.json";
import {Settings} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import {Button} from "@/shared/components/ui/button";

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

    const seriesObjects = (seriesData as { series: SeriesCardData[] })?.series || [];

    const parentSeries = seriesObjects.find((series) => series.uniqueId === data.seriesId);

    const destinationRoute =
        data.seriesId && parentSeries?.slug
            ? `/series/${parentSeries.slug}/${data.slug}`
            : `/blog/${data.slug}`;

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
                            <div className="flex flex-row  justify-between">
                                {(data.seriesId && parentSeries?.title) ? (
                                    <>
                                        <Badge
                                            variant="outline"
                                            className="text-[10px] px-1.5 py-0 font-medium border-primary/30 text-primary my-auto block"
                                        >
                                            {parentSeries.title}
                                        </Badge>
                                    </>
                                ) : (
                                    <div></div>
                                )}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-max h-max rounded-md p-1 cursor-pointer self-end"
                                            data-no-card-navigate
                                        >
                                            <div className="w-4 aspect-square">
                                                <Settings/>
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="flex flex-col gap-0.5">
                                        <DropdownMenuItem onClick={() => {
                                            console.log("edit action")
                                        }} className="justify-center">
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => {
                                            console.log("archive action")
                                        }} className="justify-center">
                                            Archive
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => {
                                            console.log("safe delete action")
                                        }} variant="destructive" className="justify-center">
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
        </div>
    );
};
