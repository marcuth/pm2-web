"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle, Folder, Settings, ArrowLeft } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { z } from "zod"

const projectSchema = z.object({
    name: z.string().min(1, "Project name is required"),
    cwd: z.string().min(1, "Working directory is required"),
    mainFile: z.string().optional(),
})

type ProjectFormValues = z.infer<typeof projectSchema>

const NewProjectPage = () => {
    const router = useRouter()
    
    const {
        control,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            cwd: "",
            mainFile: "",
        }
    })

    useEffect(() => {
        document.title = "Register New Project | PM2 Web"
    }, [])

    const onSubmit = async (data: ProjectFormValues) => {
        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (res.ok) {
                router.push("/")
                // Force a full refresh to update sidebar/lists
                window.location.href = "/"
            } else {
                const errData = await res.json()
                alert(errData.error || "Failed to create project")
            }
        } catch (error) {
            console.error("Failed to create project", error)
            alert("Network error")
        }
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-xl space-y-6">
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-medium text-sm group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1" />
                    Back to Overview
                </Link>

                <Card className="shadow-xl">
                    <CardHeader className="pb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <PlusCircle className="text-primary w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black">Register New Project</CardTitle>
                                <p className="text-muted-foreground text-sm mt-0.5">Configure an app directory to start monitoring processes.</p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form id="project-form" onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                            <Field>
                                <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Project Name</FieldLabel>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <Input 
                                            {...field}
                                            placeholder="e.g. My Awesome API"
                                            className={errors.name ? "border-destructive" : ""}
                                        />
                                    )}
                                />
                                <FieldError errors={[errors.name]} />
                            </Field>

                            <Field>
                                <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Working Directory (CWD)</FieldLabel>
                                <div className="relative">
                                    <Folder className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                                    <Controller
                                        name="cwd"
                                        control={control}
                                        render={({ field }) => (
                                            <Input 
                                                {...field}
                                                className={`pl-9 ${errors.cwd ? "border-destructive" : ""}`}
                                                placeholder="D:\Projects\my-api"
                                            />
                                        )}
                                    />
                                </div>
                                <p className="text-[10px] text-muted-foreground/60 px-1">Full path where the PM2 processes will run from.</p>
                                <FieldError errors={[errors.cwd]} />
                            </Field>

                            <Field>
                                <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Main Script / Ecosystem (Optional)</FieldLabel>
                                <div className="relative">
                                    <Settings className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                                    <Controller
                                        name="mainFile"
                                        control={control}
                                        render={({ field }) => (
                                            <Input 
                                                {...field}
                                                className="pl-9"
                                                placeholder="index.js or ecosystem.config.js"
                                            />
                                        )}
                                    />
                                </div>
                            </Field>
                        </form>
                    </CardContent>

                    <CardFooter className="pt-2">
                        <Button 
                            form="project-form" 
                            disabled={isSubmitting}
                            className="w-full font-black rounded-lg py-6"
                        >
                            {isSubmitting ? <Spinner className="w-5 h-5 mx-auto" /> : "REGISTER PROJECT"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default NewProjectPage
