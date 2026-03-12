"use client"

import { FC, useEffect } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save, Plus, X, Trash2, FileCode, Code2, Eye, EyeOff } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Field } from "@/components/ui/field"

type EnvFormValues = {
    entries: {
        key: string
        value: string
        showValue: boolean
    }[]
}

const EnvEditor: FC<{ projectId: string; onClose: () => void }> = ({ projectId, onClose }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<EnvFormValues>({
        defaultValues: {
            entries: []
        }
    })

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "entries"
    })

    useEffect(() => {
        fetch(`/api/projects/${projectId}/env`)
            .then(res => res.json())
            .then(data => {
                const initialEntries = Object.entries(data as Record<string, string>).map(([key, value]) => ({
                    key,
                    value,
                    showValue: false
                }))
                reset({ entries: initialEntries })
            })
    }, [projectId, reset])

    const onSubmit = async (data: EnvFormValues) => {
        try {
            const envObject = data.entries.reduce((acc, entry) => {
                if (entry.key.trim()) {
                    acc[entry.key.trim()] = entry.value
                }
                return acc
            }, {} as Record<string, string>)

            await fetch(`/api/projects/${projectId}/env`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(envObject),
            })
            onClose()
        } catch (error) {
            console.error("Failed to save .env", error)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-6 overflow-y-auto">
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <FileCode className="w-5 h-5" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-black">
                                Environment Variables
                            </CardTitle>
                            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-0.5">Securely edit the ecosystem .env file</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-lg">
                        <X className="w-4 h-4" />
                    </Button>
                </CardHeader>
                <CardContent className="max-h-[50vh] overflow-y-auto pr-2">
                    <form id="env-form" onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 group items-start">
                                <Field className="flex-1">
                                    <div className="relative">
                                        <Code2 className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground/40" />
                                        <Controller
                                            name={`entries.${index}.key`}
                                            control={control}
                                            render={({ field: inputField }) => (
                                                <Input
                                                    {...inputField}
                                                    className="font-mono text-xs pl-8 bg-muted/30 h-9 rounded-lg"
                                                    placeholder="VARIABLE_NAME"
                                                />
                                            )}
                                        />
                                    </div>
                                </Field>
                                <Field className="flex-2">
                                    <div className="relative">
                                        <Controller
                                            name={`entries.${index}.value`}
                                            control={control}
                                            render={({ field: inputField }) => (
                                                <Input
                                                    {...inputField}
                                                    className="font-mono text-xs pr-9 bg-muted/10 h-9 rounded-lg"
                                                    placeholder="value"
                                                    type={fields[index].showValue ? "text" : "password"}
                                                />
                                            )}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground p-0 bg-transparent hover:bg-transparent"
                                            onClick={() => update(index, { ...fields[index], showValue: !fields[index].showValue })}
                                        >
                                            {fields[index].showValue ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                        </Button>
                                    </div>
                                </Field>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    className="h-9 w-9 shrink-0 rounded-lg"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        ))}

                        {fields.length === 0 && (
                            <p className="text-muted-foreground/60 text-center py-10 font-medium text-xs">No variables found in this .env file.</p>
                        )}
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between pt-4 border-t mt-2">
                    <Button variant="outline" size="sm" onClick={() => append({ key: "", value: "", showValue: true })} className="gap-2 px-4 rounded-lg font-bold">
                        <Plus className="w-4 h-4" />
                        ADD VARIABLE
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="ghost" type="button" size="sm" onClick={onClose} className="rounded-lg font-bold">CANCEL</Button>
                        <Button form="env-form" size="sm" disabled={isSubmitting} className="gap-2 px-6 rounded-lg font-black">
                            {isSubmitting ? <Spinner className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                            SAVE CHANGES
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default EnvEditor
