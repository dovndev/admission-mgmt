import { create } from 'zustand'

type AdminStore = {
    years: number[]
    selectedYear: number | null
    program: string[]
    setYears: (years: number[]) => void
    setSelectedYear: (year: number | null) => void
    setProgram: (program: string[]) => void
}

const useAdminStore = create<AdminStore>()((set) => ({
    count: 1,
    years: [],
    selectedYear: null,
    program: [],
    setYears: (years: number[]) => set(() => ({ years })),
    setSelectedYear: (year: number | null) => set(() => ({ selectedYear: year })),
    setProgram: (program: string[]) => set(() => ({ program })),
}))

export default useAdminStore