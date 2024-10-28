// fuelReportStore.js
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const useAdminLeaveRequestMgtStore = create(
    persist(
        (set) => ({
            encryptedLeaveRequestData: null,
            encryptedLeaveRequestId: null,
            setEncryptedLeaveRequestData: (data, id) => set({
                encryptedLeaveRequestData: data,
                encryptedLeaveRequestId: id
            }),
            clearLeaveRequestData: () => set({
                encryptedLeaveRequestData: null,
                encryptedLeaveRequestId: null
            }),
        }),
        {
            name: 'admin-leave-request-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                encryptedLeaveRequestData: state.encryptedLeaveRequestData,
                encryptedLeaveRequestId: state.encryptedLeaveRequestId,
            }),
        }
    )
);

export default useAdminLeaveRequestMgtStore;