"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Trash2, Folder, Clock, Package, GitPullRequest } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"
import ProcessList from "./components/process-list"
import EnvEditor from "./components/env-editor"
import TerminalViewer from "./components/terminal-viewer"
import { Button } from "@/components/ui/button"
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

const ProjectDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params)
    const router = useRouter()
    const [project, setProject] = useState<any>(null)
    const [showEnv, setShowEnv] = useState(false)
    const [loading, setLoading] = useState(true)
    const [pulling, setPulling] = useState(false)

    const fetchProject = async () => {
        try {
            const res = await fetch(`/api/projects/${id}`)
            if (res.ok) {
                const data = await res.json()
                setProject(data)
                document.title = `${data.name} | PM2 Web`
            } else {
                router.push("/")
            }
        } catch (error) {
            console.error("Failed to fetch project", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProject()
    }, [id])

    const handleDelete = async () => {
        try {
            await fetch(`/api/projects/${id}`, { method: "DELETE" })
            router.push("/")
            router.refresh()
        } catch (error) {
            console.error("Failed to delete project", error)
        }
    }

    const handleGitPull = async () => {
        setPulling(true)
        try {
            const res = await fetch(`/api/projects/${id}/git/pull`, { method: "POST" })
            const data = await res.json()
            if (!res.ok) {
                alert(data.error || "Git pull failed")
            } else {
                console.log("Git Pull Output:", data.stdout)
            }
        } catch (error) {
            console.error("Git pull failed", error)
        } finally {
            setPulling(false)
        }
    }

    if (loading) return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="space-y-4">
                <Skeleton className="h-4 w-32" />
                <div className="flex items-center gap-5">
                    <Skeleton className="w-14 h-14 rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-96" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-3 space-y-6">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-48" />
                        <div className="flex gap-2">
                            <Skeleton className="h-9 w-32" />
                            <Skeleton className="h-9 w-32" />
                        </div>
                    </div>
                    {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="h-24 w-full rounded-xl" />
                    ))}
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <Skeleton className="h-64 w-full rounded-xl" />
                </div>
            </div>
        </div>
    )

    if (!project) return null

    return (
        <div className="flex-1 overflow-y-auto space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-medium text-sm group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1" />
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                            <Package className="text-primary w-7 h-7" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-black tracking-tight">{project.name}</h1>
                                <Badge variant="outline" className="border-primary/20 text-primary font-bold tracking-widest uppercase text-[10px] px-3">Ecosystem</Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-muted-foreground font-mono text-xs">
                                <span className="flex items-center gap-2"><Folder className="w-3 h-3" /> {project.cwd}</span>
                                <span className="flex items-center gap-2 text-muted-foreground/30">•</span>
                                <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {new Date(project.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    {project.isGit && (
                        <Button 
                            variant="secondary" 
                            className="h-10 px-4 rounded-lg font-bold gap-2 text-primary"
                            onClick={handleGitPull}
                            disabled={pulling}
                        >
                            {pulling ? <Spinner className="w-4 h-4" /> : <GitPullRequest className="w-4 h-4" />}
                            GIT PULL
                        </Button>
                    )}

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button 
                                variant="destructive" 
                                size="icon"
                                className="h-10 w-10 rounded-lg"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Project metadata?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will remove the project from this dashboard. No active PM2 processes will be stopped, but you will lose the configuration links.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="font-bold">CANCEL</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90 font-black">
                                    DELETE PROJECT
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-3">
                    <ProcessList projectId={id} onEnvEdit={() => setShowEnv(true)} />
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground px-1">Infrastructure</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-1">
                                <span className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest">Metadata Path</span>
                                <div className="text-xs font-mono bg-muted/50 p-2 rounded border border-border truncate">{project.envPath || ".env"}</div>
                            </div>
                            <div className="grid gap-1">
                                <span className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest">Active Threads</span>
                                <div className="text-2xl font-black">{project.processes?.length || 0} Instances</div>
                            </div>
                        </CardContent>
                    </Card>

                    <TerminalViewer processes={project.processes || []} />
                </div>
            </div>

            {showEnv && <EnvEditor projectId={id} onClose={() => setShowEnv(false)} />}
        </div>
    )
}

export default ProjectDetailsPage
