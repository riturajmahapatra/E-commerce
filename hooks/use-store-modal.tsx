import { create } from 'zustand';

interface useStoreModalStoreInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// This is global state management for modal component.
export const useStoreModal = create<useStoreModalStoreInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));
