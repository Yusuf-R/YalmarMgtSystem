import {create} from 'zustand'

const useServiceReportStore = create((set) => ({
    selectedReport: null,
    setSelectedReport: (report) => set({selectedReport: report}),
    clearSelectedReport: () => set({selectedReport: null}),
}));

export default useServiceReportStore;