"use client"

import { useState } from "react"
import { BrainCircuit, Search, Sparkles, MessageSquare, PieChart, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { simulatedInteractionDataGenerator } from "@/ai/flows/simulated-interaction-data-generator-flow"
import { aiSentimentAnalysis } from "@/ai/flows/ai-sentiment-analysis-flow"
import { Progress } from "@/components/ui/progress"

export default function AnalyticsPage() {
  const [topic, setTopic] = useState("Global Fintech Trends")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [stats, setStats] = useState({ pos: 0, neu: 0, neg: 0 })

  const runAnalysis = async () => {
    setLoading(true)
    try {
      const { interactions } = await simulatedInteractionDataGenerator({ topicOrScenario: topic })
      
      const analyzed = await Promise.all(
        interactions.slice(0, 5).map(async (item) => {
          const { sentiment } = await aiSentimentAnalysis({ interactionData: item.content })
          return { ...item, sentiment }
        })
      )

      setResults(analyzed)
      
      const s = analyzed.reduce((acc, curr) => {
        acc[curr.sentiment === 'positive' ? 'pos' : curr.sentiment === 'negative' ? 'neg' : 'neu']++
        return acc
      }, { pos: 0, neu: 0, neg: 0 })
      
      setStats(s)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-headline font-bold text-foreground">AI Intelligence Hub</h2>
        <p className="text-muted-foreground">Deep analysis of digital interaction streams and behavioral patterns.</p>
      </div>

      <Card className="glass-card border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Target scenario or digital event..." 
                className="pl-10 bg-black/20 border-white/10"
              />
            </div>
            <Button onClick={runAnalysis} disabled={loading} className="glow-primary">
              {loading ? <Sparkles className="w-4 h-4 animate-spin mr-2" /> : <BrainCircuit className="w-4 h-4 mr-2" />}
              Generate Insight
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-lg uppercase flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" /> Simulated Interactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((res, i) => (
                  <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-code text-primary">@{res.user}</span>
                      <Badge className={cn(
                        "text-[10px]",
                        res.sentiment === 'positive' ? 'bg-accent/20 text-accent border-accent/30' : 
                        res.sentiment === 'negative' ? 'bg-destructive/20 text-destructive border-destructive/30' : 
                        'bg-muted text-muted-foreground'
                      )}>
                        {res.sentiment.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed italic">"{res.content}"</p>
                    <p className="text-[10px] text-muted-foreground mt-2">{new Date(res.timestamp).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-white/5 rounded-lg">
                <BrainCircuit className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-sm">Initiate engine to populate interaction data</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <PieChart className="w-4 h-4 text-primary" /> Sentiment Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Positive</span>
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
                  <span>Negative</span>
                  <span className="text-destructive">{results.length > 0 ? Math.round((stats.neg / results.length) * 100) : 0}%</span>
                </div>
                <Progress value={results.length > 0 ? (stats.neg / results.length) * 100 : 0} className="h-1.5" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" /> Analysis KPI
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
               <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-2xl font-headline font-bold text-accent">98.2%</p>
                  <p className="text-[10px] text-accent/80 font-medium tracking-tight mt-1 uppercase">Pattern Recognition Accuracy</p>
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
