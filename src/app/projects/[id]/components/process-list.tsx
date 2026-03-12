"use client"

import { FC, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Activity, PlusCircle, AlertCircle } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import ProcessForm from "./process-form"
import ProcessItem from "./process-item"

type Props = {
    projectId: string
    onEnvEdit: () => void
}

const ProcessList: FC<Props> = ({ projectId, onEnvEdit }) => {
    const [processes, setProcesses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState<string | null>(null)
    const [showSpawn, setShowSpawn] = useState(false)
    const [editingProcess, setEditingProcess] = useState<any | null>(null)

    const fetchProcesses = async () => {
        try {
            const res = await fetch(`/api/processes?projectId=${projectId}`)
            const data = await res.json()
            setProcesses(data)
        } catch (error) {
            console.error("Failed to fetch processes", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProcesses()
        const interval = setInterval(fetchProcesses, 5000)
        return () => clearInterval(interval)
    }, [projectId])

    const handleAction = async (name: string, action: string) => {
        setActionLoading(name + action)
        try {
            const res = await fetch(`/api/processes/${name}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action }),
            })
            if (res.ok) {
                await fetchProcesses()
            }
        } catch (error) {
            console.error("Action failed", error)
        } finally {
            setActionLoading(null)
        }
    }

    const openEdit = (proc: any) => {
        setEditingProcess(proc)
        setShowSpawn(true)
    }

    const closeForm = () => {
        setShowSpawn(false)
        setEditingProcess(null)
        fetchProcesses()
    }

    if (loading && processes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border border-dashed text-muted-foreground gap-4">
                <Spinner className="w-8 h-8 text-primary" />
                <p className="font-bold text-sm tracking-widest uppercase">Initializing Runtimes...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Activity className="size-5 text-primary" />
                    <h3 className="text-xl font-black tracking-tight">Runtime Instances</h3>
                    <div className="h-5 w-px bg-border mx-2" />
                    <span className="text-[10px] font-black text-muted-foreground uppercase opacity-50 tracking-widest">{processes.length} Registered</span>
                </div>
                <div className="flex gap-2">
                    <Button 
                        variant="secondary" 
                        size="sm" 
                        className="font-bold gap-2 text-xs"
                        onClick={onEnvEdit}
                    >
                        EDIT .ENV
                    </Button>
                    <Button 
                        size="sm" 
                        className="font-black gap-2 text-xs shadow-lg shadow-primary/20"
                        onClick={() => setShowSpawn(true)}
                    >
                        <PlusCircle className="w-4 h-4" />
                        SPAWN NEW
                    </Button>
                </div>
            </div>

            <div className="grid gap-3">
                {processes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-muted/10 rounded-2xl border border-dashed border-primary/20">
                        <div className="p-4 bg-primary/5 rounded-full mb-4">
                            <AlertCircle className="w-8 h-8 text-primary/40" />
                        </div>
                        <p className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-widest">No processes found</p>
                        <p className="text-xs text-muted-foreground/60 max-w-[200px] text-center">Spawn your first runtime instance to start monitoring.</p>
                    </div>
                ) : (
                    processes.map((proc) => (
                        <ProcessItem 
                            key={proc.name} 
                            proc={proc} 
                            loading={actionLoading} 
                            handleAction={handleAction} 
                            onEdit={openEdit}
                        />
                    ))
                )}
            </div>

            {showSpawn && (
                <ProcessForm 
                    projectId={projectId} 
                    onClose={closeForm} 
                    initialData={editingProcess}
                />
            )}
        </div>
    )
}

export default ProcessList
