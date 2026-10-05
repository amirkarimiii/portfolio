import React from 'react';
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/shadcnUtils";
import { Badge } from "@/shared/components/ui/badge";
import { CardLayout } from "./base/CardLayout";
import { CardThumbnail } from "./base/CardThumbnail";

interface UnavailableContentCardProps {
    className?: string;
}

export const UnavailableContentCard: React.FC<UnavailableContentCardProps> = ({
                                                                                  className,
                                                                              }) => {
    return (
        <CardLayout
            selective={false}
            className={cn("opacity-75 select-none pointer-events-none border-dashed", className)}
        >
            <CardThumbnail
                src="/thmb_fallback.png"
                alt="Content unavailable"
                selective={false}
                grayscale
            />

            <div className="flex flex-col justify-between p-3.5 sm:p-4 flex-1 min-w-0">
                <CardHeader className="p-0 gap-1.5">
                    <Badge variant="destructive" className="text-[10px] sm:text-xs w-fit">
                        This article is currently unavailable
                    </Badge>

                    <CardTitle className="text-sm sm:text-base text-muted-foreground font-semibold">
                        Unavailable Content
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-0 mt-2">
                    <CardDescription className="text-xs sm:text-sm line-clamp-2">
                        The content referenced here has been archived or removed by the author.
                    </CardDescription>
                </CardContent>
            </div>
        </CardLayout>
    );
};