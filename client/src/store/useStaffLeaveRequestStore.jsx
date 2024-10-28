// fuelReportStore.js
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const useStaffLeaveRequestStore = create(
    persist(
        (set) => ({
            encryptedStaffLeaveRequestData: null,
            encryptedStaffLeaveRequestId: null,
            setEncryptedStaffLeaveRequestData: (data, id) => set({
                encryptedStaffLeaveRequestData: data,
                encryptedStaffLeaveRequestId: id
            }),
            clearStaffLeaveRequestData: () => set({
                encryptedFuelData: null,
                encryptedFuelID: null
            }),
        }),
        {
            name: 'staff-leave-request-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                encryptedStaffLeaveRequestData: state.encryptedStaffLeaveRequestData,
                encryptedStaffLeaveRequestId: state.encryptedStaffLeaveRequestId,
            }),
        }
    )
);

export default useStaffLeaveRequestStore;