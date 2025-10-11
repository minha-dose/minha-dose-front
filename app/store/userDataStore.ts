import { create } from 'zustand';

type UserData = {
    cpf: string;
    age: string;
    name: string;
    zipCode: string;
    address: string;
    city: string;
    neighborhood: string;
    district: string;
    country: string;
    houseNumber: string;
    email: string;
    phoneNumber: string;
    password: string;

    setField: (field: keyof Omit<UserData, 'setField'>, value: string) => void;
};

export const useUserDataStore = create<UserData>((set) => ({
    cpf: '',
    age: '',
    name: '',
    zipCode: '',
    address: '',
    city: '',
    neighborhood: '',
    district: '',
    country: '',
    houseNumber: '',
    email: '',
    phoneNumber: '',
    password: '',

    setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));
