"use client"

import { useState } from "react"
import { ListTodo, Plus, Calendar, Settings2, MoreHorizontal, Play, Pause, Square } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { initialTasks } from "@/app/lib/mock-data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-headline font-bold text-foreground">Task Orchestrator</h2>
          <p className="text-muted-foreground">Manage distributed work queues and recurring system processes.</p>
        </div>
        <Button className="glow-primary">
          <Plus className="w-4 h-4 mr-2" /> Create Task
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5">
             <div className="flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-primary" />
              <CardTitle className="font-headline text-lg uppercase tracking-wider">Active Queue</CardTitle>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="text-primary border-primary/20">3 RUNNING</Badge>
               <Badge variant="outline" className="text-muted-foreground border-white/10">12 TOTAL</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-xs text-muted-foreground uppercase border-b border-white/5 bg-white/5">
                  <tr>
                    <th className="px-6 py-4 font-bold">Process Name</th>
                    <th className="px-6 py-4 font-bold">Schedule</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Priority</th>
                    <th className="px-6 py-4 font-bold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-foreground">{task.name}</span>
                          <span className="text-xs text-muted-foreground font-code">ID: {task.id.padStart(4, '0')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {task.schedule}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={cn(
                          "text-[10px]",
                          task.status === 'Completed' ? 'bg-accent/20 text-accent border-accent/30' :
                          task.status === 'In Progress' ? 'bg-primary/20 text-primary border-primary/30 pulse-glow' :
                          'bg-muted text-muted-foreground border-white/10'
                        )}>
                          {task.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "text-xs font-bold",
                          task.priority === 'Critical' ? 'text-destructive' :
                          task.priority === 'High' ? 'text-primary' :
                          'text-muted-foreground'
                        )}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="group-hover:bg-white/10">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="glass-card">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2">
                              <Play className="w-3 h-3 text-accent" /> Resume
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Pause className="w-3 h-3 text-primary" /> Pause
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Square className="w-3 h-3 fill-current" /> Terminate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2">
                              <Settings2 className="w-3 h-3" /> Configure
                            </DropdownMenuItem>
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
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
