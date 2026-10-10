'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from "@/shared/utils/shadcnUtils";

interface CardThumbnailProps {
    src: string;
    alt: string;
    selective?: boolean;
    grayscale?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export const CardThumbnail: React.FC<CardThumbnailProps> = ({
                                                                src,
                                                                alt,
                                                                selective = true,
                                                                grayscale = false,
                                                                children,
                                                                className,
                                                            }) => {
    return (
        <div
            className={cn(
                "relative w-full aspect-5/2 sm:w-48 md:w-56 sm:aspect-3/2 shrink-0 bg-muted overflow-hidden",
                className
            )}
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 192px, 224px"
                className={cn(
                    "object-cover transition-transform duration-300",
                    selective && "group-hover:scale-105",
                    grayscale && "grayscale"
                )}
            />
            {children}
        </div>
    );
};