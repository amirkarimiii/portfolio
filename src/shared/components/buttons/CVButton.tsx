"use client"

import Link from "next/link";
import {Button} from "@/shared/components/ui/button";

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
                rel="noopener noreferrer"
            >
                Get My CV
            </Link>
        </Button>
    );
}

