"use client"

import { useState } from "react"
import { 
  ShieldCheck, 
  Users, 
  Key, 
  Lock, 
  Server, 
  ShieldAlert, 
  MoreVertical,
  UserPlus,
  Fingerprint,
  GlobeLock
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const adminNodes = [
  { id: "N-102", user: "Admin Principal", role: "Superuser", status: "Activo", lastAccess: "Hace 2m", ip: "192.168.1.10" },
  { id: "N-205", user: "Analista de Datos", role: "Editor", status: "Activo", lastAccess: "Hace 45m", ip: "10.0.4.155" },
  { id: "N-088", user: "Soporte Técnico", role: "Visualizador", status: "Inactivo", lastAccess: "Ayer", ip: "172.16.0.44" },
]

export default function AdminPage() {
  const [mfaEnabled, setMfaEnabled] = useState(true)

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-headline font-bold text-foreground flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" /> 
            Panel de Administración
          </h2>
          <p className="text-muted-foreground">Gestión de privilegios, seguridad de nodos y políticas de acceso al clúster.</p>
        </div>
        <Button className="glow-primary">
          <UserPlus className="w-4 h-4 mr-2" /> Autorizar Nuevo Nodo
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card md:col-span-2">
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="font-headline text-lg uppercase tracking-wider flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Nodos Autorizados
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[10px] text-muted-foreground uppercase border-b border-white/5 bg-white/5 font-bold">
                  <tr>
                    <th className="px-6 py-4">Identificador</th>
                    <th className="px-6 py-4">Usuario</th>
                    <th className="px-6 py-4">Privilegios</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {adminNodes.map((node) => (
                    <tr key={node.id} className="hover:bg-white/5 transition-colors group text-sm">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-code text-primary font-bold">{node.id}</span>
                          <span className="text-[10px] text-muted-foreground">{node.ip}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">{node.user}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="border-white/10 text-[10px] bg-white/5">
                          {node.role.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            node.status === 'Activo' ? 'bg-accent animate-pulse' : 'bg-muted-foreground'
                          )} />
                          <span className={node.status === 'Activo' ? 'text-accent' : 'text-muted-foreground'}>
                            {node.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="glass-card">
                            <DropdownMenuItem>Editar Permisos</DropdownMenuItem>
                            <DropdownMenuItem>Ver Logs de Acceso</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Revocar Acceso</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" /> Configuración de Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Autenticación MFA</p>
                  <p className="text-[11px] text-muted-foreground">Requiere token de seguridad para acceso.</p>
                </div>
                <Switch checked={mfaEnabled} onCheckedChange={setMfaEnabled} />
              </div>
              <Separator className="bg-white/5" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Restricción de IP</p>
                  <p className="text-[11px] text-muted-foreground">Solo permite IPs de la red corporativa.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-white/5" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Modo de Auditoría</p>
                  <p className="text-[11px] text-muted-foreground">Registra cada interacción del sistema.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-destructive" /> Estado de Amenazas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-destructive">INTENTOS FALLIDOS</p>
                  <span className="text-xl font-headline font-bold text-destructive">04</span>
                </div>
                <p className="text-[10px] text-destructive/70 italic">Última detección: Hace 12h (Nodo Externo)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-headline text-lg flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-accent" /> Firma Digital del Clúster
            </CardTitle>
            <CardDescription>Clave pública activa para encriptación de extremo a extremo.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-black/40 border border-white/5 font-code text-xs text-primary/80 break-all leading-relaxed">
              SHA256: 4f:8a:c2:d9:11:e3:bb:77:90:cc:01:23:f4:99:aa:88:bb:cc:dd:ee:ff:00:11:22:33:44:55:66:77:88:99
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-headline text-lg flex items-center gap-2">
              <GlobeLock className="w-5 h-5 text-primary" /> Cortafuegos Geo-Distribuido
            </CardTitle>
            <CardDescription>Estado de las puertas de enlace regionales.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Región-ES (Sur)</span>
                  <span className="text-accent">ESTABLE</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '100%' }} />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Región-US (East)</span>
                  <span className="text-accent">ESTABLE</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
