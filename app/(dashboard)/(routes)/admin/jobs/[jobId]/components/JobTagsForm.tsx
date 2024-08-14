"use client"

import {z} from "zod";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {Button} from "@/components/ui/button";
import {Form, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Job} from "@prisma/client";
import {Lightbulb, Loader2, Pencil, XIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import getGenerativeAIResponse from "@/utils/aistudio";

interface Props {
    initialData: Job,
    jobId: string
}

const formSchema = z.object({
    tags: z.array(z.string().min(1)),
})

export default function JobTagsForm({initialData, jobId}: Props) {
    const router = useRouter()
    const {toast} = useToast()
    const [isEditing, setIsEditing] = useState(false)
    const [prompt, setPrompt] = useState("")
    const [isPrompting, setIsPrompting] = useState(false)
    const [jobTags, setJobTags] = useState<string[]>(initialData.tags)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tags: initialData?.tags || []
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
            const customPrompt = `Generate an array of top 10 keywords related to the job profession "${prompt}". 
            These keywords should encompass various aspects of the profession, including skills, responsibilities, tools, and technologies commonly associated with it. 
            Aim for a diverse set of keywords that accurately represent the breadth of the profession. 
            Your output should be a list/array of keywords. Just return m ethe array alone.`
            await getGenerativeAIResponse(customPrompt).then((data) => {
                if (Array.isArray(JSON.parse(data))) {
                    setJobTags((prevState) => [...prevState, ...JSON.parse(data)])

                }
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

    const handleTagRemove = (index: number) => {
        const updatedTags = [...jobTags]
        updatedTags.splice(index, 1)
        setJobTags(updatedTags)
    }

    useEffect(() => {
        if (jobTags.length > 0) form.setValue("tags", jobTags)
    }, [jobTags]);


    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="bg-slate-100/20 rounded p-4 border border-slate-200">
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <FormLabel>Create job tags using <span
                                            className="font-bold">AI</span> 🤖</FormLabel>
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
                                                *NOTE: Profession Name alone is enough to generate the tags
                                            </p>
                                        </div>
                                    }
                                </div>


                                {isEditing ?
                                    <div>
                                        {jobTags.length > 0 && (
                                            <div className="flex items-center flex-wrap gap-2.5 my-2.5">
                                                {jobTags.map((tag, index) => (
                                                    <div
                                                        className="text-xs border border-slate-300 font-medium flex items-center gap-x-1 whitespace-nowrap py-1 px-2 rounded-md bg-slate-100"
                                                        key={index}>
                                                        {tag}
                                                        {isEditing && (
                                                            <Button type="button" variant="ghost"
                                                                    className="h-auto p-0"
                                                                    onClick={() => handleTagRemove(index)}>
                                                                <XIcon className="size-3"/>
                                                            </Button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div> :
                                    <div>
                                        {form.getValues().tags.length > 0 && (
                                            <div className="flex items-center flex-wrap gap-2.5">
                                                {form.getValues().tags.map((tag, index) => (
                                                    <p
                                                        className="text-xs border border-slate-300 font-medium flex items-center py-1 px-2 rounded-md bg-slate-100"
                                                        key={index}
                                                    >
                                                        {tag}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                }

                                {form.getValues().tags.length === 0 && !isEditing &&
                                    <p className="italic font-medium text-xs text-neutral-400">
                                        No tags added
                                    </p>
                                }
                                <FormMessage/>
                            </FormItem>
                        )}
                    />


                    {isEditing &&
                        <div className="w-full flex items-center justify-between">
                            <Button type="submit" size="sm"
                                    disabled={isSubmitting}>
                                Save
                            </Button>

                            <div className="flex items-center gap-x-2 mt-4">
                                <Button type="button" size="sm" variant="outline"
                                        onClick={() => {
                                            setJobTags([])
                                            form.setValue("tags", [])
                                        }}
                                        disabled={isSubmitting || jobTags.length === 0 || form.getValues().tags.length === 0}
                                >
                                    Clear All
                                </Button>
                                <Button type="button" size="sm" variant="outline"
                                        disabled={isSubmitting}
                                        onClick={toggleEditing}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    }
                </form>
            </Form>
        </div>
    );
}



