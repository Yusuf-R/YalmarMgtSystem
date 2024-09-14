// store/useIncidentStore.js
import {create} from 'zustand';

const useIncidentStore = create((set) => ({
    allIncidentData: null,
    staffIncidentData: null,
    siteIncidentData: null,
    fuelIncidentData: null,
    serviceIncidentData: null,
    othersIncidentData: null,
    
    // Action to set all incidents
    setAllIncidentData: (data) => set({allIncidentData: data}),
    
    // Actions to set individual categories
    setStaffIncidentData: (data) => set({staffIncidentData: data}),
    setSiteIncidentData: (data) => set({siteIncidentData: data}),
    setFuelIncidentData: (data) => set({fuelIncidentData: data}),
    setServiceIncidentData: (data) => set({serviceIncidentData: data}),
    setOthersIncidentData: (data) => set({othersIncidentData: data}),
    
    // Clear store (optional if you want to clear data between routes)
    clearIncidentData: () => set({
        allIncidentData: null,
        staffIncidentData: null,
        siteIncidentData: null,
        fuelIncidentData: null,
        serviceIncidentData: null,
        othersIncidentData: null,
    }),
}));

export default useIncidentStore;
