import { create } from 'zustand'
import { getStructuredUserData } from '../actions/user-Actions';
import { StructuredUserData } from '@/types/userTypes';

type UserStore = {
    // Existing state
    years: string[];
    program: string[];

    // New state for user data
    userData: StructuredUserData | null;
    currentUserId: string | null; // Store current user ID for refresh
    isLoading: boolean;
    error: string | null;

    // Existing actions
    setYears: (years: string[]) => void;
    setProgram: (program: string[]) => void;

    // New actions
    fetchUserData: (userId: string) => Promise<StructuredUserData | undefined>;
    clearUserData: () => void;
    setUserData: (data: StructuredUserData) => void;
    refreshUserData: () => Promise<void>;
}
const useUserStore = create<UserStore>()((set, get) => ({
    // Initial state
    years: [],
    program: [],
    userData: null,
    currentUserId: null,
    isLoading: false,
    error: null,

    // Existing actions
    setYears: (years: string[]) => set(() => ({ years })),
    setProgram: (program: string[]) => set(() => ({ program })),

    // Fixed fetchUserData function
    fetchUserData: async (userId: string) => {
        try {
            set({ isLoading: true, error: null });

            const userData = await getStructuredUserData(userId);

            set({
                userData,
                currentUserId: userId, // Store the user ID for refresh
                isLoading: false
            });

            return userData;
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch user data',
                isLoading: false
            });
            return undefined;
        }
    },

    clearUserData: () => set({ userData: null, currentUserId: null }),

    setUserData: (data: StructuredUserData) => set({ userData: data }),
    refreshUserData: async () => {
        const userId = get().currentUserId;
        if (userId) {
            await get().fetchUserData(userId);
        } else {
            set({ error: "No user ID available for refresh" });
        }
    },
}))

export default useUserStore