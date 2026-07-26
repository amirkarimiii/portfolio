"use client"

import {Pencil} from "lucide-react";
import {useAdminSession} from "@/features/admin/hooks/useAdminAuth";
import {Button} from "@/shared/components/ui/button";


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