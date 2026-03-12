"use client"

import { FC } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Folder, Package, Clock, GitBranch, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
    project: any
}

const ProjectCard: FC<Props> = ({ project }) => {
    const onlineCount = project.processes?.filter((p: any) => p.status === "online").length || 0
    const totalCount = project.processes?.length || 0

    return (
        <Link href={`/projects/${project.id}`}>
            <Card className="hover:border-primary/50 transition-colors group h-full">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                            <Package className="size-5 text-primary" />
                        </div>
                        <Badge variant="outline" className="text-[10px] font-bold tracking-widest uppercase border-primary/20">
                            {onlineCount}/{totalCount} Runtimes
                        </Badge>
                    </div>

                    <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors flex items-center gap-2">
                        {project.name}
                        <ExternalLink className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>

                    <div className="flex items-center gap-2 text-muted-foreground font-mono text-[10px] mt-1 truncate">
                        <Folder className="size-3 shrink-0" />
                        {project.cwd}
                    </div>

                    <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                <Terminal className="size-3 text-primary/50" />
                                <span className="font-bold">{totalCount}</span>
                            </div>
                            <div className="h-4 w-px bg-border" />
                            {project.isGit && (
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                    <GitBranch className="size-3 text-primary/50" />
                                    <span>Main</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50 uppercase font-black">
                             <Clock className="size-3" />
                             {new Date(project.updatedAt).toLocaleDateString()}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default ProjectCard
