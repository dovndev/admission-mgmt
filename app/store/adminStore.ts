import { create } from 'zustand'

type AdminStore = {
    years: number[]
    selectedYear: number
    program: string[]
    setYears: (years: number[]) => void
    setSelectedYear: (year: number) => void
    setProgram: (program: string[]) => void
}

const useAdminStore = create<AdminStore>()((set) => ({
    count: 1,
    years: [],
    selectedYear: 2025,
    program: [],
    setYears: (years: number[]) => set(() => ({ years })),
    setSelectedYear: (year: number) => set(() => ({ selectedYear: year })),
    setProgram: (program: string[]) => set(() => ({ program })),
}))

export default useAdminStore