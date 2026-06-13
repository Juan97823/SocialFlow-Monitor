"use client"

import Link from "next/link"
import { Zap, ShieldCheck, Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(51,153,255,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute -top-48 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded bg-primary flex items-center justify-center glow-primary">
            <Zap className="text-primary-foreground w-6 h-6 fill-current" />
          </div>
          <span className="font-headline font-bold text-3xl tracking-tight text-white">
            DevStock SAS<span className="text-primary">.</span>
          </span>
        </div>

        <Card className="glass-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-headline font-bold">Iniciar Sesión</CardTitle>
            <CardDescription>Introduce tus credenciales para acceder al centro de control</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email del Clúster</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="admin@devstocksas.node" className="pl-10 bg-black/20 border-white/10 focus:border-primary/50 transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Llave de Acceso</label>
                <Link href="#" className="text-xs text-primary hover:underline">¿Olvidaste tu llave?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="password" placeholder="••••••••" className="pl-10 bg-black/20 border-white/10 focus:border-primary/50 transition-colors" />
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="remember" className="border-white/20" />
              <label htmlFor="remember" className="text-xs text-muted-foreground font-medium cursor-pointer">Recordar sesión por 30 días</label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Link href="/dashboard" className="w-full">
              <Button className="w-full h-12 text-md font-bold glow-primary">
                Verificar y Continuar <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <div className="relative w-full py-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">o conectar con</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">Enterprise SSO</Button>
              <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">GitHub</Button>
            </div>
          </CardFooter>
        </Card>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          ¿No tienes un nodo asignado? <Link href="#" className="text-primary hover:underline font-bold">Solicitar Acceso</Link>
        </p>

        <div className="mt-12 flex items-center justify-center gap-6 opacity-40">
           <div className="flex items-center gap-2">
             <ShieldCheck className="w-4 h-4" />
             <span className="text-[10px] font-bold uppercase tracking-tighter">Encriptación TLS 1.3</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-tighter">Estado Global: Listo</span>
           </div>
        </div>
      </div>
    </div>
  )
}
