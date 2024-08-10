"use client"

import {z} from "zod";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {Button} from "@/components/ui/button";
import {Form, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Job} from "@prisma/client";
import {Pencil} from "lucide-react";
import ComboBox from "@/components/ComboBox";

interface Props {
    initialData: Job,
    jobId: string,
    options: { label: string, value: string }[]
}

const formSchema = z.object({
    categoryId: z.string({
        required_error: "Please select a category!",
    }).min(1),
})


export default function CategoryForm({initialData, jobId, options}: Props) {
    const router = useRouter()
    const {toast} = useToast()
    const [isEditing, setIsEditing] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || ""
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 bg-slate-100/20 rounded p-4 border border-slate-200">
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({field}) => (
                        <FormItem className="flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <FormLabel>Job Category</FormLabel>
                                {!isEditing &&
                                    <Button type="button" size="sm" variant="ghost" onClick={toggleEditing}>
                                        <Pencil className="size-4"/>
                                    </Button>
                                }
                            </div>
                            <ComboBox
                                heading="category"
                                form={form}
                                options={options}
                                disabled={!isEditing || isSubmitting}
                                value={field.value}
                            />
                            <FormMessage/>
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
    );
}

