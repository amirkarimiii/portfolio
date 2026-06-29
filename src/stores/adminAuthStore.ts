import {create} from "zustand";


interface AdminAuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    checkSession: () => Promise<void>;
    setAuthenticated: (status: boolean) => void;
}

export const useAdminAuthState = create<AdminAuthState>(
    (set) => ({
        isAuthenticated: false,
        isLoading: false,
        setAuthenticated: (status) => set({isAuthenticated: status}),
        checkSession: async () => {
            set({isLoading: true});
            try {
                const res = await fetch("/api/admin/session");
                if (res.ok) {
                    const data = await res.json();
                    set({ isAuthenticated: !!data.authenticated });
                } else {
                    set({ isAuthenticated: false });
                }
            } catch {
                set({ isAuthenticated: false });
            } finally {
                set({ isLoading: false });
            }
        }
    })
);