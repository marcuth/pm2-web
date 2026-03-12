"use client"

import { FC, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { X, Play, Terminal, Zap, Save } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { createProcessSchema, CreateProcessValues } from "@/schemas/processes/process.schema"

type Props = {
    projectId: string
    onClose: () => void
    initialData?: any
}

const ProcessForm: FC<Props> = ({ projectId, onClose, initialData }) => {
    const isEdit = !!initialData

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { isSubmitting, errors },
    } = useForm<CreateProcessValues>({
        resolver: zodResolver(createProcessSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            script: initialData.config ? JSON.parse(initialData.config).script : "",
            isCommand: initialData.config ? !!JSON.parse(initialData.config).isCommand : false,
            args: initialData.config ? JSON.parse(initialData.config).args || "" : "",
        } : {
            name: "",
            script: "",
            isCommand: false,
            args: "",
        }
    })

    const isCommand = watch("isCommand")
    const script = watch("script")

    useEffect(() => {
        if (!initialData) {
            fetch(`/api/projects/${projectId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.mainFile && !script) {
                        setValue("script", data.mainFile)
                    }
                })
        }
    }, [projectId, initialData, setValue, script])

    const onSubmit = async (data: CreateProcessValues) => {
        try {
            const url = isEdit ? `/api/processes/${initialData.name}` : "/api/processes"
            const method = isEdit ? "PATCH" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, projectId }),
            })

            if (res.ok) {
                onClose()
            } else {
                const errData = await res.json()
                alert(errData.error || "Failed to save process")
            }
        } catch (error) {
            console.error("Failed to save process", error)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-6 overflow-y-auto">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Zap className="text-primary w-5 h-5" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-black">
                                {isEdit ? "Update Runtime" : "Spawn Runtime"}
                            </CardTitle>
                            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-0.5">
                                {isEdit ? "Modify configuration" : "Start a new PM2 managed instance"}
                            </p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-lg">
                        <X className="w-4 h-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <form id="proc-form" onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                        <Field>
                            <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Instance Name</FieldLabel>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input 
                                        {...field}
                                        placeholder="e.g. main-server"
                                        disabled={isEdit}
                                    />
                                )}
                            />
                            <FieldError errors={[errors.name]} />
                        </Field>

                        <Field>
                            <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">
                                Entry Script Path
                            </FieldLabel>
                            <Controller
                                name="script"
                                control={control}
                                render={({ field }) => (
                                    <Input 
                                        {...field}
                                        placeholder="index.js, app.ts ..."
                                    />
                                )}
                            />
                            <FieldError errors={[errors.script]} />
                        </Field>

                        <Field>
                             <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Arguments (Optional)</FieldLabel>
                             <Controller
                                name="args"
                                control={control}
                                render={({ field }) => (
                                    <Input 
                                        {...field}
                                        placeholder="--port 3000"
                                    />
                                )}
                             />
                        </Field>
                    </form>
                </CardContent>
                <CardFooter className="pt-2">
                    <Button 
                        form="proc-form" 
                        disabled={isSubmitting}
                        className="w-full font-black rounded-lg py-6 gap-2"
                    >
                        {isSubmitting ? (
                            <Spinner className="w-4 h-4" />
                        ) : isEdit ? (
                            <Save className="w-4 h-4" />
                        ) : (
                            <Play className="w-4 h-4 fill-current" />
                        )}
                        {isEdit ? "SAVE CHANGES" : "EXECUTE PM2 START"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ProcessForm
