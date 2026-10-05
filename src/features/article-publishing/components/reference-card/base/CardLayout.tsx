'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/shadcnUtils";

interface CardLayoutProps {
    children: React.ReactNode;
    href?: string;
    selective?: boolean;
    target?: "_self" | "_blank";
    className?: string;
}

export const CardLayout: React.FC<CardLayoutProps> = ({
                                                          children,
                                                          href,
                                                          selective = true,
                                                          target,
                                                          className,
                                                      }) => {
    const cardStyle = cn(
        "overflow-hidden w-full transition-all duration-200 flex flex-col sm:flex-row p-0 h-full border",
        selective && "hover:shadow-md hover:border-primary/50 cursor-pointer",
        className
    );

    const cardContent = <Card className={cardStyle}>{children}</Card>;

    if (href && selective) {
        return (
            <Link
                href={href}
                target={target}
                className="block group h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
            >
                {cardContent}
            </Link>
        );
    }

    return <div className="block group h-full">{cardContent}</div>;
};