import { create } from "zustand";

type LoginDialogStore = {
    open: boolean;
    openDialog: () => void;
    closeDialog: () => void;
    setOpen: (open: boolean) => void;
};

export const useLoginDialog = create<LoginDialogStore>((set) => ({
    open: false,
    openDialog: () => set({ open: true }),
    closeDialog: () => set({ open: false }),
    setOpen: (open: boolean) => set({ open: open }),
}));