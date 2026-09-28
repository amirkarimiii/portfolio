"use client"

import Link from "next/link";
import {Button} from "@/shared/components/ui/button";

interface CVButtonProps {
    url?: string;
}

export function CvButton({ url }: CVButtonProps) {
    return (
        <Button
            variant="outline"
            className="w-25 h-max rounded-md p-1 cursor-pointer"
        >
            <Link
                href={url ? url : ""}
                target="_blank"
                className="flex"
                rel="noopener noreferrer"
            >
                Get My CV
            </Link>
        </Button>
    );
}

