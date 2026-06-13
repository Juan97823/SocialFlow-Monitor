"use client"

import { 
  Users, 
  Cpu, 
  Globe, 
  Activity, 
  ChevronUp, 
  ArrowUpRight,
  TrendingUp,
  Clock
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from "recharts"
import { systemMetrics } from "@/app/lib/mock-data"

const stats = [
  { label: "Active Nodes", value: "342", trend: "+12.5%", icon: Cpu, color: "text-primary" },
  { label: "Live Users", value: "12.8k", trend: "+4.2%", icon: Users, color: "text-accent" },
  { label: "Global Traffic", value: "2.4 GB/s", trend: "+1.8%", icon: Globe, color: "text-primary" },
  { label: "Latency", value: "14ms", trend: "-2.1%", icon: Activity, color: "text-accent" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-headline font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className={stat.trend.startsWith('+') ? "text-accent" : "text-primary"}>{stat.trend}</span> 
                vs last hour
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-headline text-xl">System Performance</CardTitle>
                <CardDescription>Real-time resource allocation and load</CardDescription>
              </div>
              <TrendingUp className="text-primary w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={systemMetrics}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                   stroke="rgba(255,255,255,0.3)" 
                   fontSize={12}
                   tickLine={false}
                   axisLine={false}
                   tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="load" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorLoad)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
             <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-headline text-xl">User Saturation</CardTitle>
                <CardDescription>Concurrent connections across global clusters</CardDescription>
              </div>
              <Users className="text-accent w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={systemMetrics}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                   stroke="rgba(255,255,255,0.3)" 
                   fontSize={12}
                   tickLine={false}
                   axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: 'hsl(var(--accent))', strokeWidth: 2, stroke: 'hsl(var(--background))' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Queue Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Batch Processing #{880 + item}</h4>
                      <p className="text-xs text-muted-foreground">Orchestrated 4m ago • Node DC-0{item}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-accent">SUCCESS</p>
                      <p className="text-[10px] text-muted-foreground font-code">2ms delay</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Cluster Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { label: "Storage Capacity", val: 82, color: "bg-primary" },
              { label: "Memory Buffer", val: 45, color: "bg-accent" },
              { label: "CPU Threading", val: 68, color: "bg-primary" },
            ].map((node, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">{node.label}</span>
                  <span>{node.val}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${node.color} transition-all duration-1000`} 
                    style={{ width: `${node.val}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="pt-4 mt-4 border-t border-white/5">
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent pulse-glow" />
                  <span className="text-xs font-bold text-accent uppercase">Optimized Engine</span>
                </div>
                <ChevronUp className="w-4 h-4 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
