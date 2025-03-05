import { create } from 'zustand'

type AdminStore = {
    years: string[]
    program: string[]
    setYears: (years: string[]) => void
}

const useAdminStore = create<AdminStore>()((set) => ({
    count: 1,
    years: [],
    program: [],
    setYears: (years: string[]) => set(() => ({ years })),
    setProgram: (program: string[]) => set(() => ({ program })),
}))

export default useAdminStore