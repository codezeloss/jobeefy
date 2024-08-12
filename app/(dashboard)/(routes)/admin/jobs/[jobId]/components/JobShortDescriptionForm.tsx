"use client"

import {z} from "zod";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Job} from "@prisma/client";
import {Lightbulb, Loader2, Pencil} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import getGenerativeAIResponse from "@/utils/aistudio";

interface Props {
    initialData: Job,
    jobId: string
}

const formSchema = z.object({
    short_description: z.string(),
})

export default function JobShortDescriptionForm({initialData, jobId}: Props) {
    const router = useRouter()
    const {toast} = useToast()
    const [isEditing, setIsEditing] = useState(false)
    const [prompt, setPrompt] = useState("")
    const [isPrompting, setIsPrompting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            short_description: initialData?.short_description || ""
        },
    })

    const {isValid, isSubmitting} = form.formState

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.patch(`/api/jobs/${jobId}`, values)
            toast({
                variant: "default",
                title: "✅ Job updated successfully"
            })
            toggleEditing()
            router.refresh()
        } catch (e) {
            toast({
                variant: "destructive",
                title: "❌ Something went wrong!"
            })
        }
    }

    const toggleEditing = () => setIsEditing((current) => !current)

    const handlePromptGeneration = async () => {
        try {
            setIsPrompting(true)
            const customPrompt = `Could you craft a concise job description for a ${prompt} position in fewer than 400 characters?`
            await getGenerativeAIResponse(customPrompt).then((data) => {
                form.setValue("short_description", data)
                setIsPrompting(false)
            })
        } catch (e) {
            console.log(e)
            toast({
                variant: "destructive",
                title: "❌ Something went wrong!"
            })
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="bg-slate-100/20 rounded p-4 border border-slate-200">
                    <FormField
                        control={form.control}
                        name="short_description"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <FormLabel>Short Description</FormLabel>
                                        {!isEditing &&
                                            <Button type="button" size="icon" variant="secondary"
                                                    onClick={toggleEditing}>
                                                <Pencil className="size-3.5"/>
                                            </Button>
                                        }
                                    </div>
                                    {isEditing &&
                                        <div className="my-2">
                                            <div className="flex items-center gap-x-2">
                                                <Input
                                                    type="text"
                                                    placeholder="e.g. Fullstack Developer"
                                                    value={prompt}
                                                    onChange={(e) => setPrompt(e.target.value)}
                                                />
                                                {isPrompting ?
                                                    <Button type="button" disabled={isSubmitting}>
                                                        <Loader2 className="size-4 animate-spin"/>
                                                    </Button> :
                                                    <Button type="button" disabled={isSubmitting}
                                                            onClick={handlePromptGeneration}>
                                                        <Lightbulb className="size-4"/>
                                                    </Button>
                                                }
                                            </div>
                                            <p className="text-xs text-right text-neutral-400 mt-1.5">
                                                *NOTE: Profession names alone are enough to generate the tags
                                            </p>
                                        </div>
                                    }
                                </div>

                                <FormControl>
                                    {isEditing ?
                                        <div>
                                            <Textarea
                                                rows={7}
                                                disabled={isSubmitting}
                                                placeholder="Short description about the job"
                                                {...field}
                                            />
                                        </div> :
                                        <p className="text-sm text-neutral-500">
                                            {form.getValues().short_description}
                                        </p>
                                    }
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {form.getValues().short_description === "" && !isEditing &&
                        <p className="italic font-medium text-xs text-neutral-400">
                            No description added
                        </p>
                    }

                    {isEditing &&
                        <div className="flex items-center gap-x-2 mt-4">
                            <Button type="submit" size="sm" disabled={!isValid || isSubmitting}>Save</Button>
                            <Button type="button" size="sm" variant="outline" onClick={toggleEditing}>Cancel</Button>
                        </div>
                    }
                </form>
            </Form>
        </div>
    );
}



