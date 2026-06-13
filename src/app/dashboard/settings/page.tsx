"use client"

import { useState } from "react"
import { 
  Settings2, 
  User, 
  Brain, 
  Globe, 
  Bell, 
  Shield, 
  Save,
  Cpu,
  Zap,
  HardDrive,
  Monitor
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Configuración actualizada",
        description: "Los parámetros del clúster han sido sincronizados globalmente.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-headline font-bold text-foreground flex items-center gap-3">
            <Settings2 className="w-8 h-8 text-primary" /> 
            Configuración del Sistema
          </h2>
          <p className="text-muted-foreground">Personaliza el comportamiento del núcleo de DevStock SAS y tus preferencias de operador.</p>
        </div>
        <Button onClick={handleSave} disabled={loading} className="glow-primary">
          <Save className="w-4 h-4 mr-2" /> 
          {loading ? "Sincronizando..." : "Guardar Cambios"}
        </Button>
      </div>

      <Tabs defaultValue="perfil" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1 h-12">
          <TabsTrigger value="perfil" className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <User className="w-4 h-4" /> Perfil
          </TabsTrigger>
          <TabsTrigger value="motor" className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Brain className="w-4 h-4" /> Motor IA
          </TabsTrigger>
          <TabsTrigger value="red" className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Globe className="w-4 h-4" /> Clúster & Red
          </TabsTrigger>
          <TabsTrigger value="preferencias" className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Monitor className="w-4 h-4" /> Interfaz
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Datos del Operador</CardTitle>
              <CardDescription>Información de identidad dentro de la red DevStock SAS.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 border-2 border-primary/30">
                  <AvatarImage src="https://picsum.photos/seed/operator/200" />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">AD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="bg-white/5 border-white/10">Cambiar Avatar</Button>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">UID: SF-NODE-ALPHA-99</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nombre de Usuario</Label>
                  <Input defaultValue="Admin_Principal" className="bg-black/20 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Email del Clúster</Label>
                  <Input defaultValue="admin@devstocksas.node" className="bg-black/20 border-white/10" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="motor" className="space-y-6">
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg font-headline flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> Parámetros de Inferencia
              </CardTitle>
              <CardDescription>Ajusta el rendimiento del motor Genkit y los modelos de lenguaje.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-bold">Temperatura del Modelo</Label>
                  <span className="text-xs font-code text-primary">0.7</span>
                </div>
                <Slider defaultValue={[70]} max={100} step={1} />
                <p className="text-[11px] text-muted-foreground">Valores altos aumentan la creatividad pero pueden reducir la precisión técnica.</p>
              </div>

              <Separator className="bg-white/5" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Versión del Modelo</Label>
                  <Select defaultValue="gemini-flash">
                    <SelectTrigger className="bg-black/20 border-white/10">
                      <SelectValue placeholder="Seleccionar modelo" />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="gemini-flash">Gemini 2.5 Flash (Optimizado)</SelectItem>
                      <SelectItem value="gemini-pro">Gemini Pro (Razonamiento Completo)</SelectItem>
                      <SelectItem value="custom-flow">Custom Flow Engine v4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Frecuencia de Muestreo</Label>
                  <Select defaultValue="realtime">
                    <SelectTrigger className="bg-black/20 border-white/10">
                      <SelectValue placeholder="Frecuencia" />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="realtime">Tiempo Real (Streaming)</SelectItem>
                      <SelectItem value="burst">Por Lotes (Batch)</SelectItem>
                      <SelectItem value="eco">Modo Ahorro (Eco)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="red" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-headline flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-accent" /> Almacenamiento de Datos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold">Retención de Logs</p>
                    <p className="text-[11px] text-muted-foreground">Elimina automáticamente logs tras 30 días.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="bg-white/5" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold">Encriptación en Reposo</p>
                    <p className="text-[11px] text-muted-foreground">Usa AES-256 para todos los datos guardados.</p>
                  </div>
                  <Switch defaultChecked disabled />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-headline flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" /> Seguridad del Nodo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold">Bloqueo Geográfico</p>
                    <p className="text-[11px] text-muted-foreground">Restringe accesos fuera de la región actual.</p>
                  </div>
                  <Switch />
                </div>
                <Separator className="bg-white/5" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold">Alertas de Intrusión</p>
                    <p className="text-[11px] text-muted-foreground">Notifica al móvil sobre intentos fallidos.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferencias" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Preferencias Visuales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Animaciones del Sistema</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Modo de Alto Contraste</Label>
                    <Switch />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Idioma de Interfaz</Label>
                    <Select defaultValue="es">
                      <SelectTrigger className="bg-black/20 border-white/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="es">Español (Castellano)</SelectItem>
                        <SelectItem value="en">English (US)</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
