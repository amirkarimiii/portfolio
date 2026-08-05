"use client";

import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAdminLogout, useAdminSession } from "@/features/admin/hooks/useAdminAuth";
import { Button } from "@/shared/components/ui/button";

export function LogoutButton() {
    const { data: session } = useAdminSession();
    const { mutate: logout, isPending } = useAdminLogout();

    if (!session?.authenticated) return null;

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                toast.info("LOGOUT_SUCCESS");
            },
        });
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            disabled={isPending}
            title="Logout"
        >
            <LogOut className="w-4 h-4" />
        </Button>
    );
}