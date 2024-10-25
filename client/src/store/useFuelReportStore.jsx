import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const useFuelReportStore = create(persist((set) => ({
        encryptedFuelData: null,
        encryptedFuelID: null,
        setEncryptedFuelData: (data, id) => set({encryptedFuelData: data, encryptedFuelID: id}),
        clearFuelData: () => set({encryptedFuelData: null, encryptedFuelID: null}),
    }),
    {
        name: 'fuel-storage', // Key name in localStorage or sessionStorage
        getStorage: () => localStorage, // Use localStorage (you could switch this to sessionStorage)
    }
));

export default useFuelReportStore;