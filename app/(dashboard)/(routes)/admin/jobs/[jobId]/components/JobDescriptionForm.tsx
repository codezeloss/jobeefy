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
import {Copy, Lightbulb, Loader2, Pencil} from "lucide-react";
import {Input} from "@/components/ui/input";
import ReactQuillEditor from "@/components/ReactQuillEditor";
import getGenerativeAIResponse from "@/utils/aistudio";
import ReactQuillPreview from "@/components/ReactQuillPreview";

interface Props {
    initialData: Job,
    jobId: string
}

const formSchema = z.object({
    description: z.string(),
})

export default function JobDescriptionForm({initialData, jobId}: Props) {
    const router = useRouter()
    const {toast} = useToast()
    const [isEditing, setIsEditing] = useState(false)
    const [roleName, setRoleName] = useState("")
    const [skills, setSkills] = useState("")
    const [AIValue, setAIValue] = useState("")
    const [isPrompting, setIsPrompting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
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
            const customPrompt = `Could you please draft a job requirements document for the position pf ${roleName}? 
            The job description should include roles & responsibilities, key features, and details about the role. 
            The required skills should include proficiency in ${skills}. 
            Additionally, you can list any optional skill related to job. Thanks!`
            await getGenerativeAIResponse(customPrompt).then((data) => {
                data = data.replace(/^'|'$/g, "")
                let cleanedData = data.replace(/[\*\#]/g, "")
                // form.setValue("description", cleanedData)
                setAIValue(cleanedData)
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

    const onCopyAIValue = () => {
        navigator.clipboard.writeText(AIValue)
        toast({
            variant: "default",
            title: "✅ Text Copied to Clipboard"
        })
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="bg-slate-100/20 rounded p-4 border border-slate-200">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <FormLabel>Job Description</FormLabel>
                                        {!isEditing &&
                                            <Button type="button" size="icon" variant="secondary"
                                                    onClick={toggleEditing}>
                                                <Pencil className="size-3.5"/>
                                            </Button>
                                        }
                                    </div>
                                    {isEditing &&
                                        <div className="my-4">
                                            <div className="flex items-center gap-x-2">
                                                <div className="w-full flex items-center gap-x-2">
                                                    <Input
                                                        className="w-full"
                                                        type="text"
                                                        placeholder="Jobe role name"
                                                        value={roleName}
                                                        onChange={(e) => setRoleName(e.target.value)}
                                                    />
                                                    <Input
                                                        className="w-full"
                                                        type="text"
                                                        placeholder="Required Skills (e.g.: skill, skill, ...)"
                                                        value={skills}
                                                        onChange={(e) => setSkills(e.target.value)}
                                                    />
                                                </div>
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
                                                *NOTE: Profession Name & Required skills delimetted by comma
                                            </p>
                                        </div>
                                    }
                                </div>

                                {AIValue && isEditing &&
                                    <div
                                        className="relative w-full h-96 max-h-96 text-sm rounded bg-white overflow-y-scroll p-3 relative mt-4 text-muted-foreground">
                                        <p>{AIValue}</p>
                                        <Button type="button" variant="outline" size="icon"
                                                className="absolute top-3 right-3 z-10"
                                                onClick={onCopyAIValue}
                                        >
                                            <Copy className="size-4"/>
                                        </Button>
                                    </div>
                                }

                                <FormControl>
                                    {isEditing ?
                                        <div>
                                            <ReactQuillEditor {...field}/>
                                        </div> :
                                        form.getValues().description !== "" ?
                                            <div>
                                                <ReactQuillPreview {...field}/>
                                            </div> :
                                            <p className="italic font-medium text-xs text-neutral-400">
                                                No description added
                                            </p>
                                    }
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />


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



