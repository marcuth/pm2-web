"use client"

import { FC, useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
    LayoutDashboard, 
    PlusCircle, 
    Server, 
    Package,
    Circle,
    Activity
} from "lucide-react"
import { SiPm2 } from "react-icons/si"
import pkg from "../../../package.json"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"

const AppSidebar: FC = () => {
    const pathname = usePathname()
    const [projects, setProjects] = useState<any[]>([])

    useEffect(() => {
        const fetchProjects = () => {
            fetch("/api/projects")
                .then(res => res.json())
                .then(data => setProjects(Array.isArray(data) ? data : []))
        }
        
        fetchProjects()
        const interval = setInterval(fetchProjects, 10000)
        return () => clearInterval(interval)
    }, [])

    const menuItems = [
        { label: "Dashboard", icon: LayoutDashboard, href: "/" },
        { label: "Projects", icon: Package, href: "/projects" },
    ]

    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <SiPm2 className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-bold uppercase tracking-tight">PM2 WEB</span>
                                    <span className="text-[10px] opacity-70 font-bold uppercase tracking-widest">v{pkg.version}</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                        asChild 
                                        isActive={pathname === item.href}
                                        tooltip={item.label}
                                        className="rounded-lg"
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                <SidebarGroup>
                    <div className="flex items-center justify-between px-2 mb-2">
                        <SidebarGroupLabel>Projects</SidebarGroupLabel>
                        <Link 
                            href="/projects/new" 
                            className="text-primary hover:opacity-80"
                        >
                            <PlusCircle className="size-3.5" />
                        </Link>
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {projects.map((project) => (
                                <SidebarMenuItem key={project.id}>
                                    <SidebarMenuButton 
                                        asChild 
                                        isActive={pathname.includes(`/projects/${project.id}`)}
                                        tooltip={project.name}
                                        className="rounded-lg"
                                    >
                                        <Link href={`/projects/${project.id}`}>
                                            <div className="flex aspect-square size-4 items-center justify-center rounded bg-primary/10 text-primary">
                                                <Package className="size-3" />
                                            </div>
                                            <span>{project.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <div className="mt-auto px-2 py-3 bg-muted/30 rounded-lg border border-border text-center group-data-[collapsible=icon]:hidden">
                    <div className="flex items-center justify-center gap-2">
                        <Circle className="size-2 fill-primary text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">PM2 DAEMON ACTIVE</span>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar
