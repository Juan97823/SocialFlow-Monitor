import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="hidden md:flex md:w-64 md:flex-col">
        <DashboardNav />
      </div>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-card/30 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <h1 className="font-headline text-lg font-semibold uppercase tracking-widest text-muted-foreground">Motor del Sistema</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent pulse-glow"></span>
              <span className="text-xs font-code text-accent uppercase font-bold tracking-tighter">Estado: Estable</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-medium">Clúster de Sesión</p>
              <p className="text-sm font-code text-primary">Región-ES-Sur-1</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center">
              <span className="text-xs font-bold">AD</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(51,153,255,0.05),transparent)] p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
