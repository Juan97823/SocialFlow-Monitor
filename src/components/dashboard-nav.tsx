"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  ListTodo, 
  Activity, 
  BarChart3, 
  Settings, 
  LogOut,
  ShieldCheck,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Panel de Control", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Orquestador", icon: ListTodo, href: "/dashboard/tasks" },
  { label: "Observabilidad", icon: Activity, href: "/dashboard/observability" },
  { label: "Analítica IA", icon: BarChart3, href: "/dashboard/analytics" },
  { label: "Administración", icon: ShieldCheck, href: "/dashboard/admin" },
  { label: "Configuración", icon: Settings, href: "/dashboard/settings" },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center glow-primary">
            <Zap className="text-primary-foreground w-5 h-5 fill-current" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-foreground">
            DevStock SAS<span className="text-primary">.</span>
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-all group",
              pathname === item.href 
                ? "bg-primary/10 text-primary border-r-2 border-primary" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-transform group-hover:scale-110",
              pathname === item.href ? "text-primary" : "text-muted-foreground"
            )} />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  )
}
