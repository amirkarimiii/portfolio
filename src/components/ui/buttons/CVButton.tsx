"use client"

import {Button} from "@/components/ui/shadcn/button";
import {ExternalLink} from "lucide-react";
import Link from "next/link";

export function CvButton() {
    return (
        <Button
            variant="outline"
            className="w-25 h-max rounded-md p-1 cursor-pointer"
        >
            <Link
                href="https://drive.google.com/file/d/1yN2KR-Lc0RoDthUUwt_tiHn-6a7A_pHA/view?usp=sharing"
                target="_blank"
                className="flex"
            >
                Get My CV
            </Link>
        </Button>
    );
}

