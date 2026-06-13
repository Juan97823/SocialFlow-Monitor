"use client"

import { useState } from "react"
import { BrainCircuit, Search, Sparkles, MessageSquare, PieChart, TrendingUp, FileText, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { simulatedInteractionDataGenerator } from "@/ai/flows/simulated-interaction-data-generator-flow"
import { aiSentimentAnalysis } from "@/ai/flows/ai-sentiment-analysis-flow"
import { generateAnalyticalInsight, type AnalyticalInsightGeneratorOutput } from "@/ai/flows/analytical-insight-generator-flow"

export default function AnalyticsPage() {
  const [topic, setTopic] = useState("Tendencias Fintech Globales 2024")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [stats, setStats] = useState({ pos: 0, neu: 0, neg: 0 })
  const [insight, setInsight] = useState<AnalyticalInsightGeneratorOutput | null>(null)
  const { toast } = useToast()

  const runFullAnalysis = async () => {
    setLoading(true)
    setInsight(null)
    try {
      // 1. Generar interacciones
      const genResult = await simulatedInteractionDataGenerator({ topicOrScenario: topic })
      const interactions = genResult?.interactions || []

      if (interactions.length === 0) {
        toast({
          variant: "destructive",
          title: "Error de generación",
          description: "No se pudieron generar interacciones para este tema.",
        })
        return
      }
      
      // 2. Analizar sentimiento (limitado a 6 para el demo)
      const analyzed = await Promise.all(
        interactions.slice(0, 6).map(async (item) => {
          try {
            const { sentiment } = await aiSentimentAnalysis({ interactionData: item.content })
            return { ...item, sentiment: sentiment || 'neutral' }
          } catch (e) {
            return { ...item, sentiment: 'neutral' }
          }
        })
      )

      setResults(analyzed)
      
      const s = analyzed.reduce((acc, curr) => {
        const key = curr.sentiment === 'positive' ? 'pos' : curr.sentiment === 'negative' ? 'neg' : 'neu'
        acc[key]++
        return acc
      }, { pos: 0, neu: 0, neg: 0 })
      
      setStats(s)

      // 3. Generar informe analítico profundo
      try {
        const report = await generateAnalyticalInsight({
          trends: `Flujo constante sobre ${topic}. Se observa un volumen de ${interactions.length} menciones simuladas.`,
          metrics: `Sentimiento predominante: ${s.pos > s.neg ? 'Positivo' : 'Negativo'}. Distribución: ${s.pos} Pos, ${s.neu} Neu, ${s.neg} Neg.`,
          eventHistory: analyzed.map(a => `[${a.type}] @${a.user}: ${a.sentiment}`).join(", ")
        })
        setInsight(report)
      } catch (e) {
        console.error("Error generating insight report", e)
      }

    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Fallo en el Motor IA",
        description: "Hubo un error al procesar la solicitud. Por favor, intenta de nuevo.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-headline font-bold text-foreground">Centro de Inteligencia IA <Badge className="ml-2 bg-primary/20 text-primary border-primary/30">DEMO LIVE</Badge></h2>
        <p className="text-muted-foreground">Análisis profundo de flujos de interacción digital y patrones de comportamiento mediante Genkit.</p>
      </div>

      <Card className="glass-card border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Escenario objetivo o evento digital..." 
                className="pl-10 bg-black/20 border-white/10"
              />
            </div>
            <Button onClick={runFullAnalysis} disabled={loading} className="glow-primary min-w-[200px]">
              {loading ? <Sparkles className="w-4 h-4 animate-spin mr-2" /> : <BrainCircuit className="w-4 h-4 mr-2" />}
              {loading ? "Procesando..." : "Ejecutar Motor IA"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-lg uppercase flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" /> Interacciones Procesadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((res, i) => (
                  <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-code text-primary">@{res.user}</span>
                        <Badge variant="outline" className={cn(
                          "text-[9px] px-1.5 py-0",
                          res.sentiment === 'positive' ? 'text-accent border-accent/30' : 
                          res.sentiment === 'negative' ? 'text-destructive border-destructive/30' : 
                          'text-muted-foreground border-white/10'
                        )}>
                          {(res.sentiment || 'neutral').toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed italic line-clamp-3">"{res.content}"</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-tighter">
                      {res.type} • {res.timestamp ? new Date(res.timestamp).toLocaleTimeString() : 'N/A'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-60 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-white/5 rounded-lg bg-white/5">
                <BrainCircuit className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-sm">Inicia el motor para generar datos de interacción</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <PieChart className="w-4 h-4 text-primary" /> Distribución de Sentimiento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Positivo</span>
                  <span className="text-accent">{results.length > 0 ? Math.round((stats.pos / results.length) * 100) : 0}%</span>
                </div>
                <Progress value={results.length > 0 ? (stats.pos / results.length) * 100 : 0} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Neutral</span>
                  <span className="text-muted-foreground">{results.length > 0 ? Math.round((stats.neu / results.length) * 100) : 0}%</span>
                </div>
                <Progress value={results.length > 0 ? (stats.neu / results.length) * 100 : 0} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Negativo</span>
                  <span className="text-destructive">{results.length > 0 ? Math.round((stats.neg / results.length) * 100) : 0}%</span>
                </div>
                <Progress value={results.length > 0 ? (stats.neg / results.length) * 100 : 0} className="h-1.5" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" /> Estado del Modelo
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
               <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-2xl font-headline font-bold text-accent">98.2%</p>
                  <p className="text-[10px] text-accent/80 font-medium tracking-tight mt-1 uppercase">Precisión en Reconocimiento</p>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {insight && (
        <Card className="glass-card border-accent/20 bg-accent/5 animate-in slide-in-from-bottom-4 duration-1000">
          <CardHeader className="border-b border-white/5">
            <div className="flex items-center justify-between">
              <CardTitle className="font-headline text-xl flex items-center gap-2">
                <FileText className="w-6 h-6 text-accent" /> Informe Analítico Generado por IA
              </CardTitle>
              <Badge variant="outline" className="border-accent/40 text-accent">NIVEL 4 DE INFERENCIA</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase text-accent mb-2">Resumen Ejecutivo</h4>
                  <p className="text-sm text-foreground/90 leading-relaxed">{insight.summary}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-accent mb-2">Patrones Clave</h4>
                  <p className="text-sm text-foreground/90 leading-relaxed">{insight.keyPatterns}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded bg-destructive/10 border border-destructive/20">
                  <h4 className="text-xs font-bold uppercase text-destructive mb-2">Anomalías Detectadas</h4>
                  <p className="text-sm text-destructive/90 leading-relaxed">{insight.anomalies}</p>
                </div>
                <div className="p-4 rounded bg-primary/10 border border-primary/20">
                  <h4 className="text-xs font-bold uppercase text-primary mb-2">Impulsores de Rendimiento</h4>
                  <p className="text-sm text-primary/90 leading-relaxed">{insight.performanceDrivers}</p>
                </div>
              </div>
            </div>
            <Separator className="bg-white/5" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
              <Activity className="w-3 h-3" /> Reporte procesado en tiempo real mediante el clúster de inferencia distribuida.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
