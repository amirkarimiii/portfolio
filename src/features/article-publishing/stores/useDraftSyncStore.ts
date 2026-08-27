import { create } from 'zustand';

export type DraftSyncStatus = 'idle' | 'pending' | 'success' | 'failed';

interface DraftSyncState {
    status: DraftSyncStatus;
    setStatus: (status: DraftSyncStatus) => void;
    resetStatus: () => void;
}

export const useDraftSyncStore = create<DraftSyncState>((set) => ({
    status: 'idle',
    setStatus: (status) => set({ status }),
    resetStatus: () => set({ status: 'idle' }),
}));