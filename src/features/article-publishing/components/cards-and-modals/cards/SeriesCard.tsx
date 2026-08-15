import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layers } from 'lucide-react';
import { cn } from '@/shared/utils/shadcnUtils';
import { Badge } from '@/shared/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';
import {SeriesCardData} from "@/features/article-publishing/types/reference-card.type";

interface SeriesCardProps {
    data: SeriesCardData;
    className?: string;
}

export const SeriesCard: React.FC<SeriesCardProps> = ({
                                                          data,
                                                          className,
                                                      }) => {
    const formattedTitle =
        data.title.length > 36
            ? `${data.title.slice(0, 36)}...`
            : data.title;

    return (
        <Link href={`/series/${data.slug}`} className="block group">
            <Card
                className={cn(
                    'overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/50 flex flex-row p-0 max-w-2xl',
                    className
                )}
            >
                <div className="relative h-36 w-36 shrink-0 bg-muted aspect-square overflow-hidden">
                    <Image
                        src={data.thumbnailImage}
                        alt={data.thumbnailAltText || data.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm p-1.5 rounded-md shadow-sm border">
                        <Layers className="w-3.5 h-3.5 text-primary" />
                    </div>
                </div>

                <div className="flex flex-col justify-between p-4 flex-1 min-w-0">
                    <div>
                        <CardHeader className="p-0 mb-1.5">
                            <CardTitle className="text-base group-hover:text-primary transition-colors truncate">
                                {formattedTitle}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-0">
                            <CardDescription className="line-clamp-2 text-xs">
                                {data.description}
                            </CardDescription>
                        </CardContent>
                    </div>

                    <CardFooter className="p-0 mt-3 flex flex-wrap gap-1">
                        {data.defaultTags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="outline"
                                className="flex items-center select-none gap-1.5 px-2.5 py-0.5 text-[10px]"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </CardFooter>
                </div>
            </Card>
        </Link>
    );
};