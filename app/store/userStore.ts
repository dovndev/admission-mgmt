import { create } from 'zustand'
import { getStructuredUserData } from '../actions/user-Actions';

type StructuredUserData = {
    "Student Details": Record<string, any>;
    "Contact Address": Record<string, any>;
    "Permanent Address": Record<string, any>;
    "10th Mark Details": Record<string, any>;
    "12th Mark Details": Record<string, any>;
    "Keam Details": Record<string, any>;
    "Branch Details": Record<string, any>;
    "Uploads": Record<string, string | null | undefined>;
    [key: string]: any;
}
type UserStore = {
    // Existing state
    years: string[];
    program: string[];

    // New state for user data
    userData: StructuredUserData | null;
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

    clearUserData: () => set({ userData: null }),

    setUserData: (data: StructuredUserData) => set({ userData: data }),
    refreshUserData: async () => {
        const userId = get().userData?.["Student Details"]?.userId;
        if (userId) {
            await get().fetchUserData(userId);
        } else {
            set({ error: "No user ID available for refresh" });
        }
    },
}))

export default useUserStore