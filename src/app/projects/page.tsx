"use client"

import { FC, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, PlusCircle, Package } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ProjectCard from "../components/project-card"

const ProjectsPage: FC = () => {
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [search, setSearch] = useState("")

    const fetchProjects = async () => {
        try {
            const projectsRes = await fetch("/api/projects")
            const projectsData = await projectsRes.json()
            setProjects(Array.isArray(projectsData) ? projectsData : [])
        } catch (error) {
            console.error("Failed to fetch projects", error)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        document.title = "Projects | PM2 Web"
        fetchProjects()
        const interval = setInterval(() => {
            setRefreshing(true)
            fetchProjects()
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    const filteredProjects = projects.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.cwd.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="flex-1 space-y-10 p-8 pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8">
                <div>
                    <h2 className="text-3xl font-black tracking-tight">
                         Projects
                    </h2>
                    <p className="text-muted-foreground mt-1 font-medium">
                        Your workspace ecosystem and active deployments.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {refreshing && <Spinner className="size-4 text-primary" />}
                    <Link href="/projects/new">
                        <Button className="font-black px-6 gap-2 h-11 rounded-button">
                            <PlusCircle className="size-4" />
                            NEW PROJECT
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input 
                            placeholder="Filter projects..."
                            className="pl-10 h-10 bg-muted/50 border-none rounded-xl"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map(i => (
                            <Skeleton key={i} className="h-48 rounded-2xl" />
                        ))}
                    </div>
                ) : filteredProjects.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-muted/10 rounded-3xl border border-dashed border-primary/20">
                        <Package className="size-16 text-muted-foreground/20 mb-6" />
                        <h4 className="text-lg font-bold text-muted-foreground uppercase tracking-widest">No Projects Found</h4>
                        <p className="text-sm text-muted-foreground/60 mt-2 mb-8">You haven't registered any projects yet.</p>
                        <Link href="/projects/new">
                            <Button variant="secondary" className="font-black px-8 rounded-xl">CREATE PROJECT</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProjectsPage
