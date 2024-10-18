import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const useStaffStore = create(persist((set) => ({
        encryptedStaffData: null,      // Store encrypted data
        encryptedStaffID: null,        // Store encrypted ID
        setEncryptedStaffData: (data, id) => set({encryptedStaffData: data, encryptedStaffID: id}), // Setter for encrypted data
        clearStaffData: () => set({encryptedStaffData: null, encryptedStaffID: null}), // Clear store
    }),
    {
        name: 'staff-storage', // Key name in localStorage or sessionStorage
        getStorage: () => localStorage, // Use localStorage (you could switch this to sessionStorage)
    }
));

export default useStaffStore;