"use client";

import { Button } from "@/components/ui/shadcn/button";
import { useAdminLogout, useAdminSession } from "@/hooks/useAdminAuth";
import { LogOut } from "lucide-react";

export function LogoutButton() {
    const { data: session } = useAdminSession();
    const { mutate: logout, isPending } = useAdminLogout();

    if (!session?.authenticated) return null;

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => logout()}
            disabled={isPending}
            title="Logout"
        >
            <LogOut className="w-4 h-4" />
        </Button>
    );
}