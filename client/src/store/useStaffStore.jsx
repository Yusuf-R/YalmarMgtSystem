// staffStore.js
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const useStaffStore = create(
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
            name: 'staff-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                encryptedStaffData: state.encryptedStaffData,
                encryptedStaffID: state.encryptedStaffID,
            }),
        }
    )
);

export default useStaffStore;