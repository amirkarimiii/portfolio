import { create } from "zustand";

interface UnsecureDeleteModalState {
    isOpen: boolean;
    uniqueId: string | null;
    openModal: (uniqueId: string) => void;
    closeModal: () => void;
}

export const useUnsecureDeleteModal = create<UnsecureDeleteModalState>((set) => ({
    isOpen: false,
    uniqueId: null,
    openModal: (uniqueId: string) => set({ isOpen: true, uniqueId }),
    closeModal: () => set({ isOpen: false, uniqueId: null }),
}));