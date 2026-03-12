"use client"

import { FC } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Square, RotateCcw, Trash2, Cpu, MemoryStick, Edit2 } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"

type Props = {
    proc: any
    loading: string | null
    handleAction: (name: string, action: string) => Promise<void>
    onEdit: (proc: any) => void
}

const ProcessItem: FC<Props> = ({ proc, loading, handleAction, onEdit }) => {
    return (
        <Card className="group overflow-visible">
            <CardContent className="flex flex-col md:flex-row md:items-center justify-between p-5 gap-6">
                <div className="flex items-center gap-5">
                    <div className={cn(
                        "w-3 h-3 rounded-full",
                        proc.status === "online" ? "bg-primary shadow-[0_0_12px_hsl(var(--primary))]" : "bg-muted-foreground/30"
                    )} />
                    <div>
                        <div className="flex items-center gap-3">
                            <h4 className="text-lg font-black tracking-tight">{proc.name}</h4>
                            <Badge variant={proc.status === "online" ? "success" : "destructive"} className="text-[10px] px-2 h-4 border-none font-black text-white">
                                {proc.status.toUpperCase()}
                            </Badge>
                        </div>
                        {proc.live ? (
                            <div className="flex items-center gap-4 mt-1 text-xs font-mono text-muted-foreground font-medium">
                                <span className="flex items-center gap-1.5"><Cpu className="w-3 h-3 text-primary/50" /> {proc.live.monit.cpu}% CPU</span>
                                <span className="flex items-center gap-1.5"><MemoryStick className="w-3 h-3 text-primary/50" /> {(proc.live.monit.memory / 1024 / 1024).toFixed(1)}MB RAM</span>
                                <span className="flex items-center gap-1.5 text-muted-foreground/20">PID: {proc.live.pid}</span>
                            </div>
                        ) : (
                            <p className="text-[10px] text-muted-foreground/50 mt-1 uppercase tracking-widest font-bold font-mono">Process not found in PM2 list</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => onEdit(proc)}
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10 text-muted-foreground hover:text-primary transition-colors"
                    >
                        <Edit2 className="w-4 h-4" />
                    </Button>

                    {proc.status === "online" ? (
                        <Button
                            onClick={() => handleAction(proc.name, "stop")}
                            disabled={loading === proc.name + "stop"}
                            variant="secondary"
                            size="icon"
                            className="h-10 w-10 text-destructive hover:bg-destructive/10 border-transparent"
                        >
                            <Square className="w-4 h-4 fill-current" />
                        </Button>
                    ) : (
                        <Button
                            onClick={() => handleAction(proc.name, "restart")}
                            disabled={loading === proc.name + "restart"}
                            variant="secondary"
                            size="icon"
                            className="h-10 w-10 text-primary hover:bg-primary/10 border-transparent"
                        >
                            <Play className="w-4 h-4 fill-current" />
                        </Button>
                    )}

                    <Button
                        onClick={() => handleAction(proc.name, "restart")}
                        disabled={loading === proc.name + "restart"}
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10 text-primary hover:bg-primary/10 border-transparent"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                disabled={loading === proc.name + "delete"}
                                variant="secondary"
                                size="icon"
                                className="h-10 w-10 text-destructive hover:bg-destructive hover:text-destructive-foreground border-transparent"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Kill and Delete Process?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will completely stop <span className="text-foreground font-black font-mono">"{proc.name}"</span> and remove it from the PM2 list. This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="font-bold">CANCEL</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => handleAction(proc.name, "delete")}
                                    className="bg-destructive hover:bg-destructive/90 font-black"
                                >
                                    STOP & DELETE
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProcessItem
