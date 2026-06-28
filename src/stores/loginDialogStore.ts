import { create } from "zustand";

type LoginDialogStore = {
    open: boolean;
    openDialog: () => void;
    closeDialog: () => void;
};

export const useLoginDialog = create<LoginDialogStore>((set) => ({
    open: false,
    openDialog: () => set({ open: true }),
    closeDialog: () => set({ open: false }),
}));