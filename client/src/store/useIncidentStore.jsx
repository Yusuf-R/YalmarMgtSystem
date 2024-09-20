import {create} from 'zustand';

const useIncidentStore = create((set) => ({
    allIncidentData: null,
    staffIncidentData: null,
    siteIncidentData: null,
    fuelIncidentData: null,
    serviceIncidentData: null,
    othersIncidentData: null,

    viewSiteIncidentReport: null,
    viewStaffIncidentReport: null,
    viewFuelIncidentReport: null,
    viewServiceIncidentReport: null,
    viewOthersIncidentReport: null,

    // Action to set all incidents
    setAllIncidentData: (data) => set({allIncidentData: data}),

    // Actions to set individual categories
    setStaffIncidentData: (data) => set({staffIncidentData: data}),
    setSiteIncidentData: (data) => set({siteIncidentData: data}),
    setFuelIncidentData: (data) => set({fuelIncidentData: data}),
    setServiceIncidentData: (data) => set({serviceIncidentData: data}),
    setOthersIncidentData: (data) => set({othersIncidentData: data}),

    // Actions to set view incident reports
    setViewSiteIncidentReport: (data) => set({viewSiteIncidentReport: data}),
    setViewStaffIncidentReport: (data) => set({viewStaffIncidentReport: data}),
    setViewFuelIncidentReport: (data) => set({viewFuelIncidentReport: data}),
    setViewServiceIncidentReport: (data) => set({viewServiceIncidentReport: data}),
    setViewOthersIncidentReport: (data) => set({viewOthersIncidentReport: data}),

    // Clear store (optional if you want to clear data between routes)
    clearAllIncidentData: () => set({allIncidentData: null}),
    clearStaffIncidentData: () => set({staffIncidentData: null}),
    clearSiteIncidentData: () => set({siteIncidentData: null}),
    clearFuelIncidentData: () => set({fuelIncidentData: null}),
    clearServiceIncidentData: () => set({serviceIncidentData: null}),
    clearOthersIncidentData: () => set({othersIncidentData: null}),

    // Clear all view incident reports
    clearViewSiteIncidentReport: () => set({viewSiteIncidentReport: null}),
    clearViewStaffIncidentReport: () => set({viewStaffIncidentReport: null}),
    clearViewFuelIncidentReport: () => set({viewFuelIncidentReport: null}),
    clearViewServiceIncidentReport: () => set({viewServiceIncidentReport: null}),
    clearViewOthersIncidentReport: () => set({viewOthersIncidentReport: null}),
}));

export default useIncidentStore;
