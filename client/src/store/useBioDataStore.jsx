import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const useBioDataStore = create(
    persist(
        (set) => ({
            encryptedStaffData: null,
            encryptedStaffID: null,
            setEncryptedStaffData: (data, id) => set({
                encryptedStaffData: data,
                encryptedStaffID: id
            }),
            clearStaffData: () => set({
                encryptedStaffData: null,
                encryptedStaffID: null
            }),
        }),
        {
            name: 'bioData-storage',
            storage: createJSONStorage(() => localStorage),
            // Optional: You can add these if you need custom serialization
            partialize: (state) => ({
                encryptedStaffData: state.encryptedStaffData,
                encryptedStaffID: state.encryptedStaffID,
            }),
        }
    )
);

export default useBioDataStore;