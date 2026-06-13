"use client"

import { useState, useEffect } from "react"
import { Terminal, ShieldAlert, Cpu, Database, Activity } from "lucide-center"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { recentLogs } from "@/app/lib/mock-data"

export default function ObservabilityPage() {
  const [logs, setLogs] = useState(recentLogs)

  // Simulación de logs entrantes
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: Math.random().toString(),
        timestamp: new Date().toISOString(),
        level: Math.random() > 0.8 ? 'WARN' : 'INFO',
        message: `Punto de control alcanzado para clúster-${Math.floor(Math.random() * 10)}`
      }
      setLogs(prev => [newLog, ...prev.slice(0, 49)])
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-headline font-bold text-foreground">Flujo de Observabilidad</h2>
        <p className="text-muted-foreground">Motor de diagnóstico en vivo y telemetría de auditoría de todo el sistema.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              <CardTitle className="font-headline text-lg uppercase tracking-wider">Logs del Núcleo</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">TRANSMISIÓN EN VIVO</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[500px] overflow-y-auto scroll-area-custom bg-black/40 p-4 font-code text-sm">
              {logs.map((log) => (
                <div key={log.id} className="mb-2 flex items-start gap-4 hover:bg-white/5 p-1 rounded transition-colors">
                  <span className="text-muted-foreground shrink-0">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  <span className={cn(
                    "font-bold shrink-0 w-16",
                    log.level === 'INFO' ? 'text-accent' : 
                    log.level === 'WARN' ? 'text-yellow-500' : 'text-destructive'
                  )}>
                    [{log.level}]
                  </span>
                  <span className="text-foreground/90">{log.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-primary" /> Alertas Activas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded bg-destructive/10 border border-destructive/20 flex flex-col gap-1">
                  <p className="text-sm font-bold text-destructive">Umbral de Memoria Excedido</p>
                  <p className="text-xs text-destructive/70 italic">Pod: flow-engine-04a</p>
                </div>
                <div className="p-3 rounded bg-yellow-500/10 border border-yellow-500/20 flex flex-col gap-1">
                  <p className="text-sm font-bold text-yellow-500">Pico de Latencia Inusual</p>
                  <p className="text-xs text-yellow-500/70 italic">Clúster ES-SUR-1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent" /> Telemetría de Nodo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Ciclo de Cómputo</span>
                </div>
                <span className="text-sm font-code text-primary">0.45ms</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">IOPS de BD</span>
                </div>
                <span className="text-sm font-code text-accent">12.5k</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
