"use client"

import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Pencil} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";
import axios from "axios";

interface Props {
    initialData: {
        title: string
    },
    jobId: string
}

const formSchema = z.object({
    title: z.string().min(2, {message: "Title is required"}).max(50),
})


export default function TitleForm({initialData, jobId}: Props) {
    const router = useRouter()
    const { toast } = useToast()
    const [isEditing, setIsEditing] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData.title
        },
    })

    const {isValid, isSubmitting} = form.formState

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.patch(`/api/jobs/${jobId}`, values)
            toast({
                variant: "default",
                title: "Job updated successfully"
            })
            toggleEditing()
            router.refresh()
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Something went wrong!"
            })
        }
    }

    const toggleEditing = () => setIsEditing((current) => !current)

    return (
        <div>
            <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-slate-100/20 rounded p-4 border border-slate-200">
                    <FormField
                     control={form.control}
                     name="title"
                     render={({ field }) => (
                          <FormItem>
                               <div className="flex items-center justify-between mb-2">
                                  <FormLabel>Job Title</FormLabel>
                                   {!isEditing &&
                                       <Button type="button" size="sm" variant="ghost" onClick={toggleEditing}>
                                            <Pencil className="size-4"/>
                                        </Button>
                                    }
                                </div>
                                <FormControl>
                                 <Input disabled={!isEditing || isSubmitting} placeholder="Content creator" {...field} />
                                </FormControl>
                               <FormMessage />
                          </FormItem>
                    )}
                />

                    {isEditing &&
                          <div className="flex items-center gap-x-2">
                              <Button type="submit" disabled={!isValid || isSubmitting}>Save</Button>
                              <Button type="button" variant="outline" onClick={toggleEditing}>Cancel</Button>
                          </div>
                    }
                </form>
            </Form>
        </div>
    );
}
