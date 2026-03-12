"use client"

import { FC, useEffect, useState, useRef } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Terminal, RefreshCw, AlertCircle, ChevronDown } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Props = {
    processes: any[]
}

const TerminalViewer: FC<Props> = ({ processes = [] }) => {
    const [selectedProcess, setSelectedProcess] = useState<string | null>(null)
    const [logs, setLogs] = useState<{ out: string; err: string }>({ out: "", err: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!selectedProcess && processes.length > 0) {
            setSelectedProcess(processes[0].name)
        }
    }, [processes])

    const fetchLogs = async () => {
        if (!selectedProcess) return
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`/api/processes/${selectedProcess}/logs?lines=100`)
            if (!res.ok) throw new Error("Log fetch failed")
            const data = await res.json()
            setLogs(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLogs()
        const interval = setInterval(fetchLogs, 5000)
        return () => clearInterval(interval)
    }, [selectedProcess])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [logs])

    return (
        <div className="flex flex-col bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ring-1 ring-white/10 group">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a]/80 backdrop-blur-md border-b border-white/5 select-none">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5 px-0.5">
                        <div className="size-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="size-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="size-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="h-4 w-px bg-white/10 mx-2" />
                    <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] font-bold uppercase tracking-widest">
                        <Terminal className="size-3" />
                        <span>stdout — bash</span>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <div className="flex bg-black/40 p-1 rounded-lg border border-white/5 overflow-hidden">
                        {processes.map((p) => (
                            <button
                                key={p.name}
                                onClick={() => setSelectedProcess(p.name)}
                                className={cn(
                                    "px-3 py-1 rounded-md text-[10px] font-black transition-all",
                                    selectedProcess === p.name 
                                        ? "bg-primary text-primary-foreground" 
                                        : "text-white/30 hover:text-white/60 hover:bg-white/5"
                                )}
                            >
                                {p.name.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <button 
                        onClick={fetchLogs}
                        disabled={loading}
                        className="size-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/20 hover:text-primary transition-colors disabled:opacity-50"
                    >
                        {loading ? <Spinner className="size-3" /> : <RefreshCw className="size-3" />}
                    </button>
                </div>
            </div>

            {/* Terminal Body */}
            <div 
                ref={scrollRef}
                className="h-[300px] overflow-y-auto p-5 font-mono text-[11px] leading-relaxed selection:bg-primary/40 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            >
                {selectedProcess ? (
                    <div className="space-y-1.5 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2 text-primary/60 mb-4 opacity-50">
                            <span className="shrink-0">$</span>
                            <span className="font-bold">tail -n 100 {selectedProcess}.log</span>
                        </div>
                        
                        {error ? (
                            <div className="flex items-center gap-2 text-red-500/80 italic py-4">
                                <AlertCircle className="size-3.5" />
                                <span>{error}</span>
                            </div>
                        ) : logs.out || logs.err ? (
                            <>
                                {logs.out && (
                                    <pre className="text-zinc-400 whitespace-pre-wrap break-all [text-shadow:0_0_10px_rgba(255,255,255,0.05)]">
                                        {logs.out}
                                    </pre>
                                )}
                                {logs.err && (
                                    <div className="bg-red-500/5 border border-red-500/10 p-3 rounded-lg my-2">
                                        <div className="flex items-center gap-2 text-red-400 font-bold mb-1">
                                            <AlertCircle className="size-3" />
                                            <span>STDERR</span>
                                        </div>
                                        <pre className="text-red-400/80 whitespace-pre-wrap break-all italic">
                                            {logs.err}
                                        </pre>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 mt-4 opacity-40 animate-pulse">
                                    <div className="w-1.5 h-3 bg-primary" />
                                    <span className="text-[10px] text-zinc-500">_</span>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-48 text-white/10 gap-3">
                                <Terminal className="size-8" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">No output streaming</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-white/10 gap-2">
                         <Terminal className="size-6" />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Select a process to view logs</span>
                    </div>
                )}
            </div>

            {/* Terminal Footer */}
            <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">Connection Stable</span>
                    </div>
                </div>
                <div className="text-[9px] font-mono text-white/10 font-bold">
                    {new Date().toLocaleTimeString('en-US', { hour12: false })}
                </div>
            </div>
        </div>
    )
}

export default TerminalViewer
