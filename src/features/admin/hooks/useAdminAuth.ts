import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {getAdminSession, loginAdmin, logoutAdmin} from "@/features/admin/api/adminAuth";

export const ADMIN_SESSION_QUERY_KEY = ["admin-session"];


export function useAdminSession() {
    return useQuery({
        queryKey: ADMIN_SESSION_QUERY_KEY,
        queryFn: getAdminSession,
    });
}

export function useAdminLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (password: string) => loginAdmin(password),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ADMIN_SESSION_QUERY_KEY });
        },
    });
}

export function useAdminLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutAdmin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ADMIN_SESSION_QUERY_KEY });
        },
    });
}