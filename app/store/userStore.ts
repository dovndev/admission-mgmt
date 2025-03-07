import { create } from 'zustand'

type UserStore = {
    years: string[]
    program: string[]
    setYears: (years: string[]) => void
}

const useUserStore = create<UserStore>()((set) => ({
    count: 1,
    years: [],
    program: [],
    setYears: (years: string[]) => set(() => ({ years })),
    setProgram: (program: string[]) => set(() => ({ program })),
}))

export default useUserStore