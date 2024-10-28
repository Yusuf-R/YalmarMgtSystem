// siteStore.js
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const useSiteStore = create(
    persist(
        (set) => ({
            encryptedSiteData: null,
            encryptedSiteID: null,
            setEncryptedSiteData: (data, id) => set({
                encryptedSiteData: data,
                encryptedSiteID: id
            }),
            clearSiteData: () => set({
                encryptedSiteData: null,
                encryptedSiteID: null
            }),
        }),
        {
            name: 'site-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                encryptedSiteData: state.encryptedSiteData,
                encryptedSiteID: state.encryptedSiteID,
            }),
        }
    )
);

export default useSiteStore;