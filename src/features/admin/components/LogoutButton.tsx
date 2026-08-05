"use client";

import {LogOut} from "lucide-react";
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
            variant="outline"
            className="w-max h-max rounded-md p-1 cursor-pointer"
            size="icon"
            onClick={handleLogout}
            disabled={isPending}
            title="Logout"
        >
            <div className="w-5 h-5 rounded-md select-none">
                <LogOut/>
            </div>
        </Button>
    );
}