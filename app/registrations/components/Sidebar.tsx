"use client"
import type React from "react"
import Link from "next/link"
import { Home, Users, Globe, Award, BarChart, Building2, Settings, ChevronRight } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-60 bg-slate-800 text-white flex flex-col h-full">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-blue-500 flex items-center justify-center">
            <span className="font-bold text-white">SR</span>
          </div>
          <div className="font-semibold text-lg">Student Registry</div>
        </div>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          <SidebarItem href="/" icon={<Home size={18} />} label="Home" active />
          <SidebarItem href="/coadmin" icon={<Users size={18} />} label="Coadmin" />
          <SidebarItem href="/nri" icon={<Globe size={18} />} label="NRI" />
          <SidebarItem href="/supernumerary" icon={<Award size={18} />} label="Supernumerary" />
          <SidebarItem href="/management" icon={<BarChart size={18} />} label="Management" />
          <SidebarItem href="/government" icon={<Building2 size={18} />} label="Government" />
          <SidebarItem href="/settings" icon={<Settings size={18} />} label="Settings" />
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-700 rounded-md p-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="font-medium text-white">AD</span>
            </div>
            <div>
              <div className="font-medium text-sm">Admin User</div>
              <div className="text-xs text-slate-400">admin@example.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SidebarItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
}

function SidebarItem({ href, icon, label, active }: SidebarItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
          active ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
        }`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </div>
        {active && <ChevronRight size={16} />}
      </Link>
    </li>
  )
}

