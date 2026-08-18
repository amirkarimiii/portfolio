import React from 'react';
import Image from 'next/image';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {cn} from "@/shared/utils/shadcnUtils";
import {Badge} from "@/shared/components/ui/badge";

interface UnavailableContentCardProps {
    className?: string;
}

export const UnavailableContentCard: React.FC<
    UnavailableContentCardProps
> = ({ className }) => {
    return (
        <Card
            className={cn(
                'relative overflow-hidden opacity-75 select-none pointer-events-none border-dashed flex flex-row p-0 max-w-2xl',
                className
            )}
        >
            <div className="relative h-36 w-36 shrink-0 bg-muted aspect-square overflow-hidden">
                <Image
                    src="/thmb_fallback.png"
                    alt="Content unavailable"
                    fill
                    className="object-cover grayscale"
                />
            </div>

            <div className="flex flex-col justify-between p-4 flex-1">
                <CardHeader className="p-0 gap-1.5">
                    <Badge variant="destructive" className="text-xs">
                        This article is currently unavailable
                    </Badge>

                    <CardTitle className="text-base text-muted-foreground">
                        Unavailable Content
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-0 mt-2">
                    <CardDescription className="text-xs line-clamp-2">
                        The content referenced here has been archived or
                        removed by the author.
                    </CardDescription>
                </CardContent>
            </div>
        </Card>
    );
};