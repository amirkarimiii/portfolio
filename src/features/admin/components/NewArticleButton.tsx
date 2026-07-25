"use client"

import {Pencil} from "lucide-react";
import {Button} from "@/components/ui/shadcn/button";
import {useAdminSession} from "@/hooks/useAdminAuth";

export function NewArticleButton() {

    const { data: session } = useAdminSession();
    if (!session?.authenticated) return null;

    return (
        <Button
            variant="outline"
            className="w-max h-max rounded-md p-1 cursor-pointer"
        >
            <div className="w-5 h-5 rounded-md select-none">
                <Pencil/>
            </div>
        </Button>
    );
}