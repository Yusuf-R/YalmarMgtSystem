// serviceReportStore.js
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const useServiceReportStore = create(
    persist(
        (set) => ({
            selectedReport: null,
            setSelectedReport: (report) => set({selectedReport: report}),
            clearSelectedReport: () => set({selectedReport: null}),
        }),
        {
            name: 'service-report-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                selectedReport: state.selectedReport,
            }),
        }
    )
);

export default useServiceReportStore;