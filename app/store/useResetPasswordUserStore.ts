import { create } from 'zustand';

type AuthTempStore = {
  email: string;
  token: string;
  setField: (field: 'email' | 'token', value: string) => void;
  reset: () => void;
};

export const useAuthTempStore = create<AuthTempStore>((set) => ({
  email: '',
  token: '',
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () => set({ email: '', token: '' }),
}));