"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Card } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Badge } from "@/shared/components/ui/badge";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shared/components/ui/carousel";
import { ProjectMedia } from "@/features/main/schema/projectSchema";

type ProjectPhotoProps = {
    images: ProjectMedia[];
};

function useMounted() {
    return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );
}

export default function ProjectPhoto({ images }: ProjectPhotoProps) {
    const { resolvedTheme } = useTheme();
    const [theme, setTheme] = useState(resolvedTheme);
    const mounted = useMounted();

    if (!mounted) {
        return (
            <Card className="p-5">
                <Skeleton className="w-full aspect-[1.62]" />
                <Badge className="block mx-auto mt-5 text-center">{`tap to see dark/light mode 👆🏻`}</Badge>
            </Card>
        );
    }

    if (!images || images.length === 0) {
        return null;
    }

    const currentTheme = theme || resolvedTheme || "dark";
    const targetThemeText = currentTheme === "light" ? "dark" : "light";

    const toggleTheme = () => {
        setTheme(currentTheme === "light" ? "dark" : "light");
    };

    return (
        <Card className="p-5">
            <Carousel className="w-full max-w-full">
                <CarouselContent>
                    {images.map((item, index) => {
                        const activeSrc = currentTheme === "light" ? item.lightmode : item.darkmode;

                        return (
                            <CarouselItem key={index}>
                                <div className="flex flex-col gap-2">
                                    <div
                                        onClick={toggleTheme}
                                        className="relative w-full aspect-[1.62] mx-auto select-none cursor-pointer overflow-hidden rounded-md"
                                    >
                                        <Image
                                            src={activeSrc}
                                            alt={item.description || `Project preview ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            priority={index === 0}
                                        />
                                    </div>

                                    {item.description && (
                                        <p className="text-xs text-muted-foreground text-center mt-1">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                {images.length > 1 && (
                    <>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                    </>
                )}
            </Carousel>

            <Badge
                onClick={toggleTheme}
                className="block w-max mx-auto mt-4 cursor-pointer select-none"
            >
                {`tap to see ${targetThemeText} mode 👆🏻`}
            </Badge>
        </Card>
    );
}