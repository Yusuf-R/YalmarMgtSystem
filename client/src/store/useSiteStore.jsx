import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const useSiteStore = create(persist((set) => ({
    encryptedSiteData: null,      // Store encrypted site data
    encryptedSiteID: null,        // Store encrypted site ID
    setEncryptedSiteData: (data, id) => set({encryptedSiteData: data, encryptedSiteID: id}), // Setter for encrypted data
    clearSiteData: () => set({encryptedSiteData: null, encryptedSiteID: null}), // Clear site data
}), {
    name: 'site-storage', // Key name in localStorage or sessionStorage
    getStorage: () => localStorage, // Use localStorage (or sessionStorage)
}));

export default useSiteStore;
