// fuelReportStore.js
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const useFuelReportStore = create(
    persist(
        (set) => ({
            encryptedFuelData: null,
            encryptedFuelID: null,
            setEncryptedFuelData: (data, id) => set({
                encryptedFuelData: data,
                encryptedFuelID: id
            }),
            clearFuelData: () => set({
                encryptedFuelData: null,
                encryptedFuelID: null
            }),
        }),
        {
            name: 'fuel-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                encryptedFuelData: state.encryptedFuelData,
                encryptedFuelID: state.encryptedFuelID,
            }),
        }
    )
);

export default useFuelReportStore;