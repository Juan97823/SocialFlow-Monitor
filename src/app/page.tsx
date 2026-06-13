import Link from "next/link"
import { Zap, Shield, BarChart2, Activity, Cpu, ArrowRight, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(51,153,255,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

      <header className="container mx-auto px-6 h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center glow-primary">
            <Zap className="text-primary-foreground w-5 h-5 fill-current" />
          </div>
          <span className="font-headline font-bold text-2xl tracking-tight text-white">
            SocialFlow<span className="text-primary">.</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</Link>
          <Link href="#tech" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Stack</Link>
          <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">System</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:bg-white/5">Login</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="glow-primary">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <section className="container mx-auto px-6 pt-24 pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-in fade-in zoom-in duration-500">
            <span className="w-2 h-2 rounded-full bg-primary pulse-glow" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">v4.0 Distributed Engine Live</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
            Orchestrate Your <span className="text-primary">Digital pulse</span> With AI Intelligence
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Next-generation SaaS for real-time interaction analysis, distributed task management, and system-wide observability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-8 text-lg font-bold glow-primary">
                Launch Dashboard <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-white/10 bg-white/5 hover:bg-white/10 text-white">
              View Documentation
            </Button>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-3xl font-headline font-bold text-white">99.9%</p>
              <p className="text-sm text-muted-foreground">Uptime SLA</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-headline font-bold text-accent">14ms</p>
              <p className="text-sm text-muted-foreground">Avg Latency</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-headline font-bold text-white">1.2M+</p>
              <p className="text-sm text-muted-foreground">Tasks/Hour</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-headline font-bold text-accent">24/7</p>
              <p className="text-sm text-muted-foreground">Monitoring</p>
            </div>
          </div>
        </section>

        <section id="features" className="container mx-auto px-6 py-24 border-t border-white/5">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6 group-hover:glow-primary transition-all">
                <BarChart2 className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-headline font-bold text-white mb-3">Predictive Analytics</h3>
              <p className="text-muted-foreground">Advanced ML models to forecast system load and user behavior patterns before they happen.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-6 group-hover:glow-accent transition-all">
                <Layers className="text-accent w-6 h-6" />
              </div>
              <h3 className="text-xl font-headline font-bold text-white mb-3">Task Orchestration</h3>
              <p className="text-muted-foreground">Automated workflow management with dynamic resource scaling across global server clusters.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6 group-hover:glow-primary transition-all">
                <Activity className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-headline font-bold text-white mb-3">Live Observability</h3>
              <p className="text-muted-foreground">End-to-end tracing and real-time log streaming for comprehensive system health monitoring.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-12 border-t border-white/5 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Zap className="text-primary w-5 h-5 fill-current" />
            <span className="font-headline font-bold text-white">SocialFlow.</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 SocialFlow Monitor Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Shield className="w-5 h-5 text-muted-foreground hover:text-white transition-colors cursor-pointer" />
            <Cpu className="w-5 h-5 text-muted-foreground hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  )
}
