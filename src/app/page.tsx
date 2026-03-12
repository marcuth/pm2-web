"use client"

import { FC, useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Activity, LayoutDashboard, Cpu, MemoryStick, Zap, Server, AlertCircle } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"

const DashboardPage: FC = () => {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [activeProcesses, setActiveProcesses] = useState<any[]>([])

    const fetchData = async () => {
        try {
            const [projectsRes, processesRes] = await Promise.all([
                fetch("/api/projects"),
                fetch("/api/processes")
            ])
            
            const projectsData = await projectsRes.json()
            const pm2Processes = await processesRes.json()

            const online = Array.isArray(pm2Processes) ? pm2Processes.filter((p: any) => p.status === "online") : []
            const totalCpu = online.reduce((acc, p) => acc + (p.live?.monit?.cpu || 0), 0)
            const totalMemory = online.reduce((acc, p) => acc + (p.live?.monit?.memory || 0), 0)

            setStats({
                totalProjects: Array.isArray(projectsData) ? projectsData.length : 0,
                totalProcesses: Array.isArray(pm2Processes) ? pm2Processes.length : 0,
                onlineProcesses: online.length,
                stoppedProcesses: Array.isArray(pm2Processes) ? pm2Processes.length - online.length : 0,
                totalCpu,
                totalMemory,
                avgCpu: online.length > 0 ? totalCpu / online.length : 0,
            })

            // Get top 5 active processes by CPU
            const topActive = [...online]
                .sort((a, b) => (b.live?.monit?.cpu || 0) - (a.live?.monit?.cpu || 0))
                .slice(0, 5)
            
            setActiveProcesses(topActive)

        } catch (error) {
            console.error("Failed to fetch dashboard data", error)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        document.title = "Dashboard | PM2 Web"
        fetchData()
        const interval = setInterval(() => {
            setRefreshing(true)
            fetchData()
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    if (loading) return (
        <div className="flex-1 space-y-10 p-8 pt-6">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
            </div>
            <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
    )

    return (
        <div className="flex-1 space-y-10 p-8 pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                         <LayoutDashboard className="size-8 text-primary" />
                         Ecosystem Dashboard
                    </h2>
                    <p className="text-muted-foreground mt-1 font-medium">
                        Real-time overview of your server's health and process activity.
                    </p>
                </div>
                {refreshing && <Spinner className="size-4 text-primary" />}
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-none bg-primary/5 shadow-none ring-1 ring-primary/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">System Online</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-primary flex items-center gap-2">
                            {stats.onlineProcesses} <span className="text-muted-foreground/30 text-xl font-medium">/ {stats.totalProcesses}</span>
                        </div>
                        <p className="text-[10px] font-bold text-primary/60 mt-1 uppercase">Active Runtimes</p>
                    </CardContent>
                </Card>

                <Card className="border-none bg-muted/30 shadow-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">CPU Usage</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="text-3xl font-black flex items-baseline gap-1">
                            {stats.totalCpu.toFixed(1)} <span className="text-sm text-muted-foreground font-bold">%</span>
                        </div>
                        <Progress value={Math.min(stats.totalCpu, 100)} className="h-1" />
                    </CardContent>
                </Card>

                <Card className="border-none bg-muted/30 shadow-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">RAM Consumption</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black flex items-baseline gap-1">
                            {(stats.totalMemory / 1024 / 1024).toFixed(0)} <span className="text-sm text-muted-foreground font-bold">MB</span>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground/60 mt-1 uppercase">Total Process footprint</p>
                    </CardContent>
                </Card>

                <Card className="border-none bg-muted/30 shadow-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Deployment Scale</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black">{stats.totalProjects}</div>
                        <p className="text-[10px] font-bold text-muted-foreground/60 mt-1 uppercase">Workspaces Connected</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Active Runtimes Summary */}
                <Card className="border-none bg-muted/20 shadow-none">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Activity className="size-5 text-primary" />
                            <CardTitle className="text-lg font-black">Top Active Instances</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {activeProcesses.length > 0 ? (
                                activeProcesses.map((proc, i) => (
                                    <div key={proc.name} className="flex items-center justify-between p-3 bg-background rounded-xl border border-border/50">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                                <Zap className="size-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black truncate max-w-[150px]">{proc.name}</p>
                                                <p className="text-[10px] font-mono text-muted-foreground">PID: {proc.live?.pid}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="flex items-center gap-1.5 text-xs font-bold">
                                                    <Cpu className="size-3 text-primary/50" />
                                                    {proc.live?.monit?.cpu}%
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                                                    <MemoryStick className="size-3 text-primary/50" />
                                                    {(proc.live?.monit?.memory / 1024 / 1024).toFixed(1)}MB
                                                </div>
                                            </div>
                                            <Badge variant="success" className="h-5 text-[9px] font-black px-2">ONLINE</Badge>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10">
                                    <AlertCircle className="size-8 text-muted-foreground/30 mx-auto mb-3" />
                                    <p className="text-sm font-bold text-muted-foreground/50 uppercase tracking-widest">No Active Runtimes</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Efficiency vs Capacity or other metric */}
                <Card className="border-none bg-muted/20 shadow-none">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Server className="size-5 text-primary" />
                            <CardTitle className="text-lg font-black">System Resources</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-8 py-6">
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest">Active Thread Load</span>
                                <span className="text-sm font-black">{stats.avgCpu.toFixed(1)}%</span>
                            </div>
                            <Progress value={stats.avgCpu} className="h-2 rounded-full" />
                            <p className="text-[10px] text-muted-foreground/60 italic font-medium text-right">Average per process</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-background rounded-2xl border border-border/50">
                                <p className="text-[10px] font-black uppercase text-muted-foreground/40 mb-1">Status</p>
                                <p className="text-xl font-black text-primary">Stable</p>
                            </div>
                            <div className="p-4 bg-background rounded-2xl border border-border/50">
                                <p className="text-[10px] font-black uppercase text-muted-foreground/40 mb-1">Queue</p>
                                <p className="text-xl font-black">0 Items</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashboardPage
